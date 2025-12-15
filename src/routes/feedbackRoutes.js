import { Router } from "express";
import { getFeedbacks, createFeedback } from "../controllers/feedbackController.js";
import { celebrate } from "celebrate";
import { getFeedbacksValidation, createFeedbackValidation } from "../validations/feedbacksValidation.js";

const router = Router();

router.get('/api/feedbacks', celebrate(getFeedbacksValidation), getFeedbacks);

router.post('/api/feedbacks', celebrate(createFeedbackValidation), createFeedback);

export default router;
