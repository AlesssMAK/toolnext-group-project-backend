import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { Feedback } from '../models/feedback.js';

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(createHttpError(401, 'Not authenticated'));
    }

    const userId = user.id;

    const toolsCount = await Tool.countDocuments({
      owner: userId,
    });

    const ratingResult = await Tool.aggregate([
      { $match: { owner: userId } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);

    const rating = ratingResult.length > 0 ? ratingResult[0].avgRating : 0;

    res.status(200).json({
      success: true,
      data: {
        id: userId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        rating: Math.round(rating * 10) / 10,
        toolsCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return next(createHttpError(400, 'Invalid user ID format'));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    const toolsCount = await Tool.countDocuments({
      owner: userId,
    });

    const ratingResult = await Tool.aggregate([
      { $match: { owner: userId } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);

    const rating = ratingResult.length > 0 ? ratingResult[0].avgRating : 0;

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatarUrl || user.avatar || '',
        rating: Math.round(rating * 10) / 10,
        toolsCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTools = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8;

    if (!isValidObjectId(userId)) {
      return next(createHttpError(400, 'Invalid user ID format'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    const skip = (page - 1) * perPage;

    const tools = await Tool.find({ owner: userId })
      // .populate('category', 'name')
      .populate('owner', 'name')
      .populate('feedbacks')
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const totalTools = await Tool.countDocuments({ owner: userId });

    const totalPages = Math.ceil(totalTools / perPage);

    res.status(200).json({
      data: {
        tools,
        pagination: {
          currentPage: page,
          perPage,
          totalTools,
          totalPages,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    next(createHttpError(400, 'No file'));
    return;
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: result.secure_url },
    { new: true },
  );
  res.status(200).json({ url: user.avatar });
};

export const getUserFeedbacks = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    if (!isValidObjectId(userId)) {
      return next(createHttpError(400, 'Invalid user ID format'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    const userTools = await Tool.find({ owner: userId }).select('_id');
    const toolIds = userTools.map((tool) => tool._id);

    if (!toolIds.length) {
      return res.status(200).json({
        data: {
          feedbacks: [],
          pagination: {
            currentPage: page,
            perPage,
            totalFeedbacks: 0,
            totalPages: 0,
          },
        },
      });
    }

    const skip = (page - 1) * perPage;

    const feedbacks = await Feedback.find({ toolId: { $in: toolIds } })
      .populate('userId', 'name')
      .populate('toolId', 'name')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage);

    const totalFeedbacks = await Feedback.countDocuments({
      toolId: { $in: toolIds },
    });

    const totalPages = Math.ceil(totalFeedbacks / perPage);

    res.status(200).json({
      data: {
        feedbacks,
        pagination: {
          currentPage: page,
          perPage,
          totalFeedbacks,
          totalPages,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
