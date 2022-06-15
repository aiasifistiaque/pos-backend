import asyncHandler from 'express-async-handler';

import Product from '../../models/productModel.js';

const getProductById = asyncHandler(async (req, res) => {
	try {
		const data = await Product.findById(req.params.id).populate([
			{
				path: 'category',
				select: 'name code',
			},
			{
				path: 'user',
				select: 'name email',
			},
			{
				path: 'brand',
				select: 'name',
			},
			{
				path: 'store',
			},
		]);

		if (data) {
			return res.status(200).json(data);
		} else {
			return res
				.status(404)
				.json({ status: 'error', message: 'Product Not Found' });
		}
	} catch (e) {
		console.log(e);
		res
			.status(500)
			.json({ status: 'error', message: 'Server Error', error: e.message });
	}
});

export default getProductById;
