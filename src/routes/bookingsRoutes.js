import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createBookingSchema } from '../validations/bookingsValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();
router.post(
  '/bookings',
  celebrate(createBookingSchema),
  ctrlWrapper(createBooking),
);
export default router;
