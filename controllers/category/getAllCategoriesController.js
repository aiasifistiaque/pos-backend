import asyncHandler from 'express-async-handler';

import Category from '../../models/categoryModel.js';

const getAllCategoriesController = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Category.find(req.meta.query)
			.sort(sort)
			.limit(perpage)
			.skip(skip);
		const count = await Category.count(req.meta.query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		res.status(201).json({ ...req.meta, data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllCategoriesController;
