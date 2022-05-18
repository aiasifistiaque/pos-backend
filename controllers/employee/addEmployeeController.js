import asyncHandler from 'express-async-handler';
import express from 'express';
import { User } from '../../models/userModel.js';
import Employee from '../../models/employeeModel.js';

const addEmployeeController = asyncHandler(async (req, res) => {
	const { email, role } = req.body;
	try {
		const user = await User.findOne({ email: email });

		const found = await Employee.findOne({ email: email, store: req.store });
		if (found)
			return res
				.status(500)
				.json({ status: 'error', error: 'Employee already exists' });

		const newItem = new Employee({
			...(user && { user: user._id }),
			store: req.store,
			email: email,
			status: user ? 'added' : 'invited',
			role: role,
			addedBy: req.user._id,
		});

		const saved = await newItem.save();

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addEmployeeController;
