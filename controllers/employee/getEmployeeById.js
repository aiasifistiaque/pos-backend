import asyncHandler from 'express-async-handler';
import express from 'express';
import Employee from '../../models/employeeModel.js';

const getEmployeeById = asyncHandler(async (req, res) => {
	try {
		const data = await Employee.findById(req.params.id).populate([
			{
				path: 'user',
				select: 'name email',
			},
			{
				path: 'addedBy',
				select: 'name email',
			},
		]);

		if (!data) {
			return res
				.status(404)
				.json({ status: 'error', message: 'Employee Not found' });
		}

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getEmployeeById;
