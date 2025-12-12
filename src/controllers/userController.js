import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(createHttpError(401, 'Not authenticated'));
    }

    const userId = user._id;

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

    console.log('🔍 GET /api/users/:userId - userId param:', userId);

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
