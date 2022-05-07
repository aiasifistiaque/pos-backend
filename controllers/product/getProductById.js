import asyncHandler from 'express-async-handler';

import Product from '../../models/productModel.js';

const getProductById = asyncHandler(async (req, res) => {
	try {
		const data = await Product.findById(req.params.id);

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getProductById;
