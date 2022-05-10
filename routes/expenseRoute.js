import express from 'express';
import addExpenseController from '../controllers/expense/addExpenseController.js';
import getAllExpensesController from '../controllers/expense/getAllExpensesController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, addExpenseController);
router.get('/', protect, getAllExpensesController);

export default router;
