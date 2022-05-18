import asyncHandler from 'express-async-handler';
import Employee from '../../models/employeeModel.js';

const getStoreDataController = asyncHandler(async (req, res) => {
	try {
		const data = await Employee.findOne({
			user: req.user._id,
			store: req.params.id,
		})
			.populate('store')
			.sort('-createdAt');

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getStoreDataController;
