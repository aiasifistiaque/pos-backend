import asyncHandler from 'express-async-handler';
import Sale from '../../models/saleModel.js';

const getSaleById = asyncHandler(async (req, res) => {
	try {
		const data = await Sale.findById(req.params.id).populate([
			{
				path: 'user',
				select: 'name email',
			},
			{
				path: 'store',
			},
			{
				path: 'orderItems.product',
				select: 'name',
			},
		]);

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getSaleById;
