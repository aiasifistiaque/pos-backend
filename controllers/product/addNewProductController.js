import asyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';

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
		});
		const saved = await newItem.save();
		if (saved) {
		}
		res.status(201).json({ data: newItem, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addNewProductController;
