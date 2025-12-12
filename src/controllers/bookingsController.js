import createHttpError from 'http-errors';
import { Booking } from '../models/booking.js';
// import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';

export const createBooking = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(createHttpError(401, 'Not authenticated'));
    }

    const userId = user._id;

    const { toolId } = req.body;
    if (!req.body.userPhone) {
      return next(createHttpError(400, 'Phone is required'));
    }
    if (!toolId) {
      return next(createHttpError(400, 'toolId is required'));
    }
    const tool = await Tool.findById(toolId);
    if (!tool) {
      return next(createHttpError(404, 'Tool not found'));
    }

    const date = new Date().toISOString();

    const newBooking = await Booking.create({
      ...req.body,

      userId: userId,
      date,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
