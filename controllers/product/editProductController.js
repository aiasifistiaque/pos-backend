import asyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../../models/productModel.js';
import addActivity from '../activity/addActivity.js';

const editProductContoller = asyncHandler(async (req, res) => {
	const { name, price, cost, description, stockAlert } = req.body;

	try {
		const item = await Product.findById(req.params.id);
		item.name = name ? name : item.name;
		item.price = price ? price : item.price;
		item.cost = cost ? cost : item.cost;
		item.stockAlert = stockAlert ? stockAlert : item.stockAlert;

		const saved = await item.save();

		addActivity({
			name: 'Update Product',
			category: 'product',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `updated a product of id ${saved._id}`,
			type: 'update',
		});

		return res.status(200).json(saved);
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			status: 'error',
			error: e.message,
			message: 'Error Updating Product, try again',
		});
	}
});

export default editProductContoller;
