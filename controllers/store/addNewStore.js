import asyncHandler from 'express-async-handler';
import express from 'express';
import Shop from '../../models/shopModel.js';
import Employee from '../../models/employeeModel.js';

const addNewStoreController = asyncHandler(async (req, res) => {
	const { name, image, description, note, category } = req.body;
	try {
		const newItem = new Shop({
			owner: req.user._id,
			name,
			image,
			description,
			note,
			category,
		});
		const saved = await newItem.save();

		const newItemTwo = new Employee({
			user: req.user._id,
			store: saved._id,
			role: 'owner',
		});
		const savedTwo = await newItemTwo.save();

		res.status(201).json({
			store: saved,
			employee: savedTwo,
			status: 'Item has been added',
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addNewStoreController;
