import createHttpError from 'http-errors';
import { Booking } from '../models/booking.js';
import { User } from '../models/user.js';

export const createBooking = async (req, res, next) => {
  const { userPhone } = req.body;
  if (!req.body.userPhone) {
    return next(createHttpError(400, 'Phone is required'));
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
