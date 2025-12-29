import { Feedback } from '../models/feedback.js';
import { Tool } from '../models/tool.js';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getFeedbacks = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      toolId,
      userId,
    } = req.query;
    const skip = (page - 1) * perPage;

    const filter = {};

    if (toolId) {
      filter.toolId = toolId;
    }

    if (userId) {
      filter.userId = userId;
    }

    const feedbacksQuery = Feedback.find(filter).sort({ createdAt: -1 });

    const [totalFeedbacks, feedbacks] = await Promise.all([
      feedbacksQuery.clone().countDocuments(),
      feedbacksQuery
        .skip(skip)
        .limit(perPage)
        .sort({ [sortBy]: sortOrder }),
    ]);

    const count = await Feedback.countDocuments();
    console.log('Feedback total:', count);

    const one = await Feedback.findOne();
    console.log(one);

    const totalPages = Math.ceil(totalFeedbacks / perPage);

    res.status(200).json({
      page,
      perPage,
      totalPages,
      totalFeedbacks,
      feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const createFeedback = async (req, res, next) => {
  try {
    const { toolId, description, rate } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw createHttpError(401, 'Unauthorized');
    }

    if (!mongoose.Types.ObjectId.isValid(toolId)) {
      throw createHttpError(400, 'Invalid toolId');
    }

    const tool = await Tool.findById(toolId);
    if (!tool) {
      throw createHttpError(404, 'Tool not found');
    }

    if (
      tool.owner.toString().toLowerCase() === userId.toString().toLowerCase()
    ) {
      throw createHttpError(
        403,
        'Ви не можете залишити відгук на власний інструмент',
      );
    }

    const newFeedback = await Feedback.create({
      toolId,
      userId,
      name: req.user.name,
      description,
      rate,
    });

    tool.feedbacks.push(newFeedback._id);
    // 🔥 NEW — перерахунок рейтингу КОНКРЕТНОГО TOOL
    const toolAgg = await Feedback.aggregate([
      {
        $match: {
          toolId: new mongoose.Types.ObjectId(toolId),
        },
      },
      {
        $group: {
          _id: '$toolId',
          avgRating: { $avg: '$rate' },
          totalFeedbacks: { $sum: 1 },
        },
      },
    ]);

    const toolRating = toolAgg[0]?.avgRating
      ? Number(toolAgg[0].avgRating.toFixed(2))
      : 0;

    const toolFeedbacksCount = toolAgg[0]?.totalFeedbacks || 0;

    tool.rating = toolRating;
    tool.feedbacksCount = toolFeedbacksCount;
    await tool.save();

    // якщо рейтинг власника = середнє по всіх відгуках до всіх інструментів цього owner:
    const ownerId = tool.owner;

    const agg = await Feedback.aggregate([
      {
        $lookup: {
          from: 'tools',
          localField: 'toolId',
          foreignField: '_id',
          as: 'tool',
        },
      },
      { $unwind: '$tool' },
      { $match: { 'tool.owner': ownerId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rate' },
          totalFeedbacks: { $sum: 1 },
        },
      },
    ]);

    const avgRating = agg[0]?.avgRating
      ? Number(agg[0].avgRating.toFixed(2))
      : 0;
    const totalFeedbacks = agg[0]?.totalFeedbacks || 0;

    await User.findByIdAndUpdate(ownerId, { rating: avgRating });

    res.status(201).json({
      data: newFeedback,
      ownerStats: { totalFeedbacks, ownerRating: avgRating },
    });
  } catch (error) {
    next(error);
  }
};
