import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import mongoose from 'mongoose';

const getAllProductsController = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	const category = mongoose.Types.ObjectId.isValid(req.query.category)
		? { category: req.query.category }
		: {};
	try {
		const data = await Product.find({ ...category, ...req.meta.query })
			.sort('-createdAt')
			.populate([
				{ path: 'category', select: 'name' },
				{ path: 'brand', select: 'name' },
				{ path: 'user', select: 'name' },
			])
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		const count = await Product.count({ ...category, ...req.meta.query });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		res
			.status(200)
			.json({ ...req.meta, count, data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllProductsController;
