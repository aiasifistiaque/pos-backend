import asyncHandler from 'express-async-handler';
import express from 'express';
import Employee from '../../models/employeeModel.js';

const updateEmployeeController = asyncHandler(async (req, res) => {
	try {
		const data = await Employee.findById(req.params.id).select(
			'role permissions'
		);

		if (!data) {
			return res
				.status(404)
				.json({ status: 'error', message: 'Employee Not found' });
		}

		if (req.body.role) data.role = req.body.role;
		if (req.body.permissions) data.permissions = req.body.permissions;

		const saved = await data.save();

		res.status(200).json(saved);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', message: e.message });
	}
});

export default updateEmployeeController;
