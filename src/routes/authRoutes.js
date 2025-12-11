
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser, registerUser } from '../controllers/authController.js';
import { registerUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/api/auth/login', loginUser);

export default router;
