import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Product from '../../models/productModel.js';

const addNewProductController = asyncHandler(async (req, res) => {
	const {
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
	} = req.body;
	try {
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
