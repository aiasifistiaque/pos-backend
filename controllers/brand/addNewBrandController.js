import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Brand from '../../models/brandModel.js';

const addNewBrandController = asyncHandler(async (req, res) => {
	const { name, image, description, note } = req.body;
	try {
		const newItem = new Brand({
			user: req.user._id,
			name,
			image,
			description,
			note,
			store: req.store,
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

export default addNewBrandController;
