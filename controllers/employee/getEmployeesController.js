import asyncHandler from 'express-async-handler';
import express from 'express';
import Employee from '../../models/employeeModel.js';

const getEmployeesController = asyncHandler(async (req, res) => {
	try {
		const data = await Employee.find({ store: req.store }).populate({
			path: 'user',
			select: 'name email',
		});

		const mappedData = await data.map(async (item, i) => {
			if (item.email == 'notadded@ims.io') {
				item.email = item.user.email;
				await item.save();
			}
		});

		res.status(200).json({ data: data, status: 'Success' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getEmployeesController;
