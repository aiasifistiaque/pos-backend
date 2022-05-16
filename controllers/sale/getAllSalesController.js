import asyncHandler from 'express-async-handler';
import Purchase from '../../models/purchaseModel.js';
import Sale from '../../models/saleModel.js';

const getAllSalesController = asyncHandler(async (req, res) => {
	try {
		const data = await Sale.find({ user: req.user._id }).populate({
			path: 'user',
			select: 'name email',
		});

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getAllSalesController;
