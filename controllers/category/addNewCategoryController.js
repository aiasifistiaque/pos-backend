import asyncHandler from 'express-async-handler';
import express from 'express';
import Category from '../../models/categoryModel.js';
import addActivity from '../activity/addActivity.js';

const addNewCategoryController = asyncHandler(async (req, res) => {
	const { name, image, description, note } = req.body;
	try {
		const newItem = new Category({
			user: req.user._id,
			name,
			image,
			description,
			note,
			store: req.store,
		});
		const saved = await newItem.save();

		addActivity({
			name: 'Add Category',
			category: 'category',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new category ${name}`,
			type: 'create',
		});

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addNewCategoryController;
