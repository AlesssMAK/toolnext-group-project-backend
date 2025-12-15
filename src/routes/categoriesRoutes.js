import { Router } from 'express';
import {
  getAllCategories,
  // createCategory,
} from '../controllers/categoryController.js';

const router = Router();

router.get('/api/categories', getAllCategories);

// Додай POST-ендпоінт
// router.post('/', createCategory);

export default router;
