
import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser, logoutUser, refreshUserToken, registerUser } from '../controllers/authController.js';
import { loginUserSchema, registerUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/api/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/api/auth/logout', logoutUser);
router.post('/api/auth/refrech', refreshUserToken);

export default router;
