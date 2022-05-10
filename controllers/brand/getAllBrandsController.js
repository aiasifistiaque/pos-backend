import asyncHandler from 'express-async-handler';
import Brand from '../../models/brandModel.js';

const getAllBrandsController = asyncHandler(async (req, res) => {
	try {
		const data = await Brand.find({ user: req.user._id });

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllBrandsController;
