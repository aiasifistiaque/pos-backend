import asyncHandler from 'express-async-handler';
import express from 'express';
import Shop from '../../models/shopModel.js';
import Employee from '../../models/employeeModel.js';
import { User } from '../../models/userModel.js';

const addNewStoreController = asyncHandler(async (req, res) => {
	const { name, image, description, note, category, address, phone, email } =
		req.body;
	try {
		const newItem = new Shop({
			owner: req.user._id,
			name,
			image,
			description,
			note,
			category,
			address,
			phone,
			email,
		});
		const saved = await newItem.save();

		const user = await User.findById(req.user._id).select('email');

		const newItemTwo = new Employee({
			user: req.user._id,
			store: saved._id,
			role: 'owner',
			addedBy: req.user._id,
			email: user.email,
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
