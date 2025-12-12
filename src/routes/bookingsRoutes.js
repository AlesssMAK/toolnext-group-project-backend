import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createBookingSchema } from '../validations/bookingsValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createBooking } from '../controllers/bookingsController.js';
import { authenticate } from '../middleware/authenticate.js';
const router = Router();
router.post(
  '/api/bookings',
  celebrate(createBookingSchema),
  authenticate,
  ctrlWrapper(createBooking),
);
export default router;
