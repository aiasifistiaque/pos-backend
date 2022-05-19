import asyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';
import addActivity from '../activity/addActivity.js';

const addNewProductController = asyncHandler(async (req, res) => {
	const {
		name,
		displayImage,
		images,
		brand,
		price,
		cost,
		description,
		note,
		stock,
		status,
		subCategory,
		size,
		totalSold,
		otherCategory,
	} = req.body;
	let category = req.body.category;
	try {
		if (category == 'other') {
			const newCategory = new Category({
				user: req.user._id,
				name: otherCategory,
				store: req.store,
			});
			const savedCategory = await newCategory.save();
			category = savedCategory;
		}
		const newItem = new Product({
			user: req.user._id,
			name,
			displayImage,
			images,
			category,
			brand,
			price,
			cost,
			description,
			note,
			stock,
			status,
			subCategory,
			size,
			totalSold,
			store: req.store,
		});
		const saved = await newItem.save();

		addActivity({
			name: 'Add Product',
			category: 'product',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new product ${name}`,
			type: 'create',
		});

		res.status(201).json({ data: newItem, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addNewProductController;
