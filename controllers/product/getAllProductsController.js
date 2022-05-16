import asyncHandler from 'express-async-handler';

import Product from '../../models/productModel.js';

const getAllProductsController = asyncHandler(async (req, res) => {
	const category = req.query.category && { category: req.query.category };
	try {
		const query = { user: req.user._id, ...category };

		console.log(query);

		const data = await Product.find(query)
			.sort('-createdAt')
			.populate({ path: 'category', select: 'name' });
		const count = await Product.count(query);

		res.status(200).json({ count, data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllProductsController;
