import express from 'express';
import addExpenseController from '../controllers/expense/addExpenseController.js';
import getAllExpensesController from '../controllers/expense/getAllExpensesController.js';

import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';
import { store } from '../middleware/store.js';

const router = express.Router();

router.post('/', protect, store('add-expenses'), addExpenseController);
router.get(
	'/',
	protect,
	store('read-expenses'),
	sort,
	getAllExpensesController
);

export default router;
