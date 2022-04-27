import express from 'express';
import addNewCategoryController from '../controllers/category/addNewCategoryController.js';
import getAllCategoriesController from '../controllers/category/getAllCategoriesController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addNewCategoryController);
router.get('/', getAllCategoriesController);

export default router;
