import asyncHandler from 'express-async-handler';
import Employee from '../models/employeeModel.js';

export const store = asyncHandler(async (req, res, next) => {
	let store;

	if (req.headers.store) {
		try {
			store = req.headers.store;
			req.store = store;

			const isEmployee = await Employee.findOne({
				user: req.user._id,
				store: store,
			});

			if (!isEmployee) {
				return res.status(401).json({ message: 'Not Authorized' });
			}

			req.employee = isEmployee.role;

			next();
		} catch (error) {
			res.status(401).json({ message: 'Error Fetching store' });
		}
	}

	if (!store) {
		console.log('Error: Store not defined');

		return res.status(401).json({ message: 'Store not defined' });
	}
});
