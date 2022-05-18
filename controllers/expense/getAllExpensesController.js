import asyncHandler from 'express-async-handler';
import Expense from '../../models/expenseModel.js';

const getAllExpensesController = asyncHandler(async (req, res) => {
	try {
		const data = await Expense.find({ store: req.store });

		res.status(201).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllExpensesController;
