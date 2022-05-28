import asyncHandler from 'express-async-handler';

import Product from '../../models/productModel.js';

const getTopProductsController = asyncHandler(async (req, res) => {
	try {
		const data = await Product.find({ store: req.store })
			.sort('-totalSold')
			.select('name totalSold')
			.limit(5);

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getTopProductsController;
