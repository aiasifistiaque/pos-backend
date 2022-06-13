import asyncHandler from 'express-async-handler';
import express from 'express';
import Customer from '../../models/customerModel.js';
import addActivity from '../activity/addActivity.js';

const addCustomerController = asyncHandler(async (req, res) => {
	const { name, description, phone, email, address, role } = req.body;

	try {
		const data = await Customer.findOne({
			phone: phone,
			role: req.query.role,
			store: req.store,
		});

		if (data) {
			return res
				.status(400)
				.json({ status: 'error', message: 'User already exists' });
		}

		console.log(data);

		const newItem = new Customer({
			user: req.user._id,
			name,
			description,
			phone,
			email,
			address,
			role: req.query.role,
			store: req.store,
		});
		const saved = await newItem.save();

		addActivity({
			name: 'Add Customer',
			category: 'customer',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new customer ${name}`,
			type: 'create',
		});

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addCustomerController;
