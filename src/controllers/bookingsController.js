import createHttpError from 'http-errors';
import { Booking } from '../models/booking.js';
import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';

export const createBooking = async (req, res, next) => {
  const { userPhone, toolId } = req.body;
  if (!req.body.userPhone) {
    return next(createHttpError(400, 'Phone is required'));
  }
  if (!toolId) {
    return next(createHttpError(400, 'toolsId is required'));
  }
  const tool = await Tool.findById(toolId);
  if (!tool) {
    return next(createHttpError(404, 'Tool not found'));
  }
  const existingUser = await User.findOne({ phone: userPhone });

  const date = new Date().toISOString();

  const newBooking = await Booking.create({
    ...req.body,
    // userId: req.user._id, // привязываем к авторизованному пользователю
    userId: existingUser ? existingUser._id : null,
    date,
  });

  res.status(201).json(newBooking);
};
