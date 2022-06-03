import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import Sale from '../../models/saleModel.js';
import moment from 'moment';

const getKpiController = asyncHandler(async (req, res) => {
	const { field, date } = req.query;
	if (field == null || date == null) {
		return res
			.status(500)
			.json({ status: 'error', error: 'Field or Date not defuned' });
	}
	//const limit = parseInt(req.query.limit) || 10;
	try {
		if (field == 'sales') {
			const data = await Sale.find({
				store: req.store,
				...getDate(date),
			}).select('orderItems totalPrice');
			const { count, value, items } = countValue(data);
			return res.status(200).json({ count, value, items, date });
		}

		res.status(200).json(countValue(data));
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

const getDate = query => {
	if (query == 'today' || query == 'daily') {
		return {
			createdAt: {
				$gte: moment().startOf('day').toDate(),
				$lte: moment().endOf('day').toDate(),
			},
		};
	} else if (query == 'weekly') {
		return {
			createdAt: {
				$gte: moment().startOf('week').toDate(),
				$lte: moment().endOf('week').toDate(),
			},
		};
	} else if (query == 'monthly') {
		return {
			createdAt: {
				$gte: moment().startOf('month').toDate(),
				$lte: moment().endOf('month').toDate(),
			},
		};
	} else if (query == 'yearly') {
		return {
			createdAt: {
				$gte: moment().startOf('year').toDate(),
				$lte: moment().endOf('year').toDate(),
			},
		};
	}
	return {};
};

const countValue = data => {
	return {
		count: data.length,
		value: data.reduce((sum, item) => sum + item.totalPrice, 0),
		items: data.reduce(
			(sum, item) =>
				sum + item.orderItems.reduce((qty, i) => qty + i.quantity, 0),
			0
		),
	};
};

export default getKpiController;
