import { Feedback } from "../models/feedback.js";
import createHttpError from 'http-errors';

export const getFeedbacks = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * perPage;

    const feedbacksQuery = Feedback.find();

    const [totalFeedbacks, feedbacks] = await Promise.all([
      feedbacksQuery.clone().countDocuments(),
      feedbacksQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder}),
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
    const { name, description, rate } = req.body;

    if (!name || !description || (rate === undefined || rate === null)) {
      throw createHttpError(400, 'Missing required fields: name, description, rate');
    }

    const newFeedback = await Feedback.create({ name, description, rate });

    res.status(201).json({ status: 'success', data: newFeedback });
  } catch (error) {
    next(error);
  }
};
