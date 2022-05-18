import asyncHandler from 'express-async-handler';
import Employee from '../../models/employeeModel.js';

const getMyStoresController = asyncHandler(async (req, res) => {
	try {
		const data = await Employee.find({ user: req.user._id })
			.populate('store')
			.sort('-createdAt');

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getMyStoresController;
