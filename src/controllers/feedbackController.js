import { Feedback } from "../models/feedback.js";

export const getFeedbacks = async (req, res) => {
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
};
