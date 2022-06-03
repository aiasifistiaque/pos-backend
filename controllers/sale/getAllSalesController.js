import asyncHandler from 'express-async-handler';
import Sale from '../../models/saleModel.js';

const getAllSalesController = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	try {
		const data = await Sale.find(req.meta.query)
			.populate({
				path: 'user',
				select: 'name email',
			})
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		const count = await Sale.count(req.meta.query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		res.status(200).json({ ...req.meta, data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllSalesController;
