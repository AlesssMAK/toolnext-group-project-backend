import { Schema, model } from 'mongoose';
import { BOOKING_STATUS } from '../constants/bookingStatuses.js';
import { Counter } from './counter.js';
const bookingSchema = new Schema(
  {
    tools: [
      {
        toolId: {
          type: Schema.Types.ObjectId,
          ref: 'Tools',
          required: true,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    date: { type: String, required: true },

    bookingNum: { type: String, index: true },
    status: {
      type: String,
      enum: BOOKING_STATUS,
      default: 'not booked',
    },
    userFirstname: { type: String, required: true },
    userLastname: { type: String, required: true },
    userPhone: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    deliveryCity: { type: String, required: true },
    deliveryBranch: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

bookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'bookingNum' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    this.bookingNum = String(counter.seq).padStart(7, '0');
  }
  next();
});
export const Booking = model('Booking', bookingSchema);
