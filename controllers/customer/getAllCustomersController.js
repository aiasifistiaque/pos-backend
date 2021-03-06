import asyncHandler from 'express-async-handler';
import Customer from '../../models/customerModel.js';

const getAllCustomersController = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Customer.find({
			store: req.store,
			role: req.query.role,
		})
			.sort(sort)
			.limit(perpage)
			.skip(skip);
		const count = await Customer.count({
			store: req.store,
			role: req.query.role,
		});

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		res.status(200).json({ ...req.meta, data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllCustomersController;
