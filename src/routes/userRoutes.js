import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUser,
  getUserProfile,
  getUserTools,
  updateUserAvatar,
  getUserFeedbacks,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const router = Router();
router.get('/api/users/me', authenticate, getUser);

router.get('/api/users/:userId', getUserProfile);

router.get('/api/users/:userId/tools', getUserTools);
router.get('/api/users/:userId/feedbacks', getUserFeedbacks);
router.patch(
  '/api/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
