import asyncHandler from 'express-async-handler';
import Customer from '../../models/customerModel.js';

const getAllCustomersController = asyncHandler(async (req, res) => {
	try {
		const data = await Customer.find({
			user: req.user._id,
			role: req.query.role,
		});

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllCustomersController;
