import asyncHandler from 'express-async-handler';
import Purchase from '../../models/purchaseModel.js';

const getPurchaseByIdController = asyncHandler(async (req, res) => {
	try {
		const data = await Purchase.findById(req.params.id).populate([
			{
				path: 'orderItems',
				select: 'product',
				populate: { path: 'product', select: 'name' },
			},
			{ path: 'supplier', select: 'name' },
		]);
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getPurchaseByIdController;
