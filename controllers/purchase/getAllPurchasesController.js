import asyncHandler from 'express-async-handler';
import Purchase from '../../models/purchaseModel.js';

const getallPurchasesController = asyncHandler(async (req, res) => {
	try {
		const data = await Purchase.find({ store: req.store }).sort('-createdAt');

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getallPurchasesController;
