import express from 'express';
import addNewCategoryController from '../controllers/category/addNewCategoryController.js';
import getAllCategoriesController from '../controllers/category/getAllCategoriesController.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store('add-categories'), addNewCategoryController);
router.get(
	'/',
	protect,
	store('read-categories'),
	sort,
	getAllCategoriesController
);

export default router;
