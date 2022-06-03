import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

const lowStockController = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	try {
		const data = await Product.find({
			store: req.store,
			$expr: { $lte: ['$stock', '$stockAlert'] },
		})
			.select('name stock price stockAlert')
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		const count = await Product.count({
			store: req.store,
			$expr: { $lte: ['$stock', '$stockAlert'] },
		});

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		res.status(200).json({ ...req.meta, data: data });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default lowStockController;
