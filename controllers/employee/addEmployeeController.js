import asyncHandler from 'express-async-handler';
import express from 'express';
import { User } from '../../models/userModel.js';
import Employee from '../../models/employeeModel.js';
import addActivity from '../activity/addActivity.js';

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

		addActivity({
			name: 'Add Employee',
			category: 'employees',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new employee ${email}, role: ${role}`,
			type: 'create',
			newState: role,
			extra: {
				employeeId: user ? user._id : '',
				email: email,
				role: role,
			},
		});

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addEmployeeController;
