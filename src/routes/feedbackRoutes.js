import { Router } from "express";
import { getFeedbacks } from "../controllers/feedbackController.js";
import { celebrate } from "celebrate";
import { getFeedbacksValidation } from "../validations/feedbacksValidation.js";

const router = Router();

router.get('/api/feedbacks', celebrate(getFeedbacksValidation), getFeedbacks);

export default router;
