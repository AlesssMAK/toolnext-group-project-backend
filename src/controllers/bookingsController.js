import createHttpError from 'http-errors';
import { Booking } from '../models/booking.js';
// import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';
import moment from 'moment';

export const createBooking = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(createHttpError(401, 'Not authenticated'));
    }

    const userId = user.id;

    const { toolId, startDate, endDate } = req.body;
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

    const overlappingBooking = await Booking.findOne({
      toolId,
      status: { $ne: 'cancelled' },
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    if (overlappingBooking) {
      return next(
        createHttpError(409, 'Tool is already booked for these dates'),
      );
    }

    const today = moment().startOf('day');
    const start = moment(startDate, 'YYYY-MM-DD');
    const end = moment(endDate, 'YYYY-MM-DD');

    let autoStatus = 'pending';

    if (today.isBetween(start, end, null, '[]')) {
      autoStatus = 'active';
    } else if (today.isAfter(end)) {
      autoStatus = 'finished';
    }

    const newBooking = await Booking.create({
      ...req.body,

      userId: userId,
      date,
      status: autoStatus,
    });

    tool.bookedDates.push(newBooking._id);
    await tool.save();

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
