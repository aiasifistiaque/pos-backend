import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Brand from '../../models/brandModel.js';
import Activity from '../../models/activityModel.js';
import addActivity from '../activity/addActivity.js';

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

		addActivity({
			name: 'Add Brand',
			category: 'brand',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new brand ${name}`,
			type: 'create',
		});

		res.status(201).json({ data: newItem, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addNewBrandController;
