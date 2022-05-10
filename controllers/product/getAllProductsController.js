import asyncHandler from 'express-async-handler';

import Product from '../../models/productModel.js';

const getAllProductsController = asyncHandler(async (req, res) => {
	try {
		const data = await Product.find({ user: req.user._id })
			.sort('-createdAt')
			.populate({ path: 'category', select: 'name' });

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllProductsController;
