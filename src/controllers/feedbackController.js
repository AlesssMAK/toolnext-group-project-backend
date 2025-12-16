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
    } = req.query;
    const skip = (page - 1) * perPage;

    const feedbacksQuery = Feedback.find();

    const [totalFeedbacks, feedbacks] = await Promise.all([
      feedbacksQuery.clone().countDocuments(),
      feedbacksQuery
        .skip(skip)
        .limit(perPage)
        .sort({ [sortBy]: sortOrder }),
    ]);

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

    if (!toolId || !description || rate === undefined || rate === null) {
      throw createHttpError(
        400,
        'Missing required fields: toolId, description, rate',
      );
    }

    if (!mongoose.Types.ObjectId.isValid(toolId)) {
      throw createHttpError(400, 'Invalid toolId');
    }

    const tool = await Tool.findById(toolId);
    if (!tool) {
      throw createHttpError(404, 'Tool not found');
    }

    const newFeedback = await Feedback.create({
      name: req.user?.name || 'Anonymous',
      description,
      rate,
    });

    tool.feedbacks.push({ userId, comment: description, rating: rate });
    await tool.save();

    const ownerId = tool.owner;

    const agg = await Tool.aggregate([
      { $match: { owner: ownerId } },
      { $unwind: { path: '$feedbacks', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$feedbacks.rating' },
          totalFeedbacks: {
            $sum: { $cond: [{ $ifNull: ['$feedbacks.rating', false] }, 1, 0] },
          },
        },
      },
    ]);

    const avgRating = agg[0]?.avgRating
      ? Number(agg[0].avgRating.toFixed(2))
      : 0;
    const totalFeedbacks = agg[0]?.totalFeedbacks || 0;

    await User.findByIdAndUpdate(ownerId, { rating: avgRating });

    res
      .status(201)
      .json({
        data: newFeedback,
        ownerStats: { totalFeedbacks, ownerRating: avgRating },
      });
  } catch (error) {
    next(error);
  }
};
