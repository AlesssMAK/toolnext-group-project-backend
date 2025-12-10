import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUser,
  getUserProfile,
  getUserTools,
} from '../controllers/userController.js';

const router = Router();

router.get('/api/users/me', authenticate, getUser);

router.get('/api/users/:userId', getUserProfile);

router.get('/api/users/:userId/tools', getUserTools);

export default router;
