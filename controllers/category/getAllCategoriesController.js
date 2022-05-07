import asyncHandler from 'express-async-handler';

import Category from '../../models/categoryModel.js';

const getAllCategoriesController = asyncHandler(async (req, res) => {
	try {
		const data = await Category.find();

		res.status(201).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllCategoriesController;