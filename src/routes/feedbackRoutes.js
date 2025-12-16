import { Router } from "express";
import { getFeedbacks, createFeedback } from "../controllers/feedbackController.js";
import { celebrate } from "celebrate";
import { getFeedbacksValidation, createFeedbackValidation } from "../validations/feedbacksValidation.js";
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/api/feedbacks', celebrate(getFeedbacksValidation), getFeedbacks);

router.post('/api/feedbacks', authenticate, celebrate(createFeedbackValidation), createFeedback);

export default router;
