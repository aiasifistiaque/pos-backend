import asyncHandler from 'express-async-handler';
import Expense from '../../models/expenseModel.js';

const getAllExpensesController = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Expense.find(req.meta.query)
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		const count = await Expense.count(req.meta.query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		res.status(200).json({ ...req.meta, data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllExpensesController;
