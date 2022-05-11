import asyncHandler from 'express-async-handler';
import express from 'express';
import Customer from '../../models/customerModel.js';

const addCustomerController = asyncHandler(async (req, res) => {
	const { name, description, phone, email, address, role } = req.body;
	try {
		const newItem = new Customer({
			user: req.user._id,
			name,
			description,
			phone,
			email,
			address,
			role,
		});
		const saved = await newItem.save();

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addCustomerController;
