import asyncHandler from 'express-async-handler';
import moment from 'moment';
import { dataReport } from '../../lib/functions/dataReport.js';
import Brand from '../../models/brandModel.js';
import Category from '../../models/categoryModel.js';
import Customer from '../../models/customerModel.js';
import Employee from '../../models/employeeModel.js';
import Expense from '../../models/expenseModel.js';

import Product from '../../models/productModel.js';
import Purchase from '../../models/purchaseModel.js';
import Sale from '../../models/saleModel.js';
import { User } from '../../models/userModel.js';

const getSalesReport = asyncHandler(async (req, res) => {
	try {
		const today = moment().startOf('day');
		const select = 'totalPrice createdAt';

		const dayOne = await Sale.find({
			store: req.store,
			createdAt: {
				$gte: moment().startOf('day').toDate(),
				$lte: moment().endOf('day').toDate(),
			},
		}).select(select);

		const dayTwo = await Sale.find({
			store: req.store,
			createdAt: {
				$gte: moment().subtract(1, 'days').startOf('day').toDate(),
				$lte: moment().subtract(1, 'days').endOf('day').toDate(),
			},
		}).select(select);

		const dayThree = await Sale.find({
			store: req.store,
			createdAt: {
				$gte: moment().subtract(2, 'days').startOf('day').toDate(),
				$lte: moment().subtract(2, 'days').endOf('day').toDate(),
			},
		}).select(select);

		const dayFour = await Sale.find({
			store: req.store,
			createdAt: {
				$gte: moment().subtract(3, 'days').startOf('day').toDate(),
				$lte: moment().subtract(3, 'days').endOf('day').toDate(),
			},
		}).select(select);

		const dayFive = await Sale.find({
			store: req.store,
			createdAt: {
				$gte: moment().subtract(4, 'days').startOf('day').toDate(),
				$lte: moment().subtract(4, 'days').endOf('day').toDate(),
			},
		}).select(select);

		const daySix = await Sale.find({
			store: req.store,
			createdAt: {
				$gte: moment().subtract(5, 'days').startOf('day').toDate(),
				$lte: moment().subtract(5, 'days').endOf('day').toDate(),
			},
		}).select(select);

		const daySeven = await Sale.find({
			store: req.store,
			createdAt: {
				$gte: moment().subtract(6, 'days').startOf('day').toDate(),
				$lte: moment().subtract(6, 'days').endOf('day').toDate(),
			},
		}).select(select);

		const sales = [
			dataReport({ data: dayOne, date: moment().format('L') }),
			dataReport({
				data: dayTwo,
				date: moment().subtract(1, 'days').format('L'),
			}),
			dataReport({
				data: dayThree,
				date: moment().subtract(2, 'days').format('L'),
			}),
			dataReport({
				data: dayFour,
				date: moment().subtract(3, 'days').format('L'),
			}),
			dataReport({
				data: dayFive,
				date: moment().subtract(4, 'days').format('L'),
			}),
			dataReport({
				data: daySix,
				date: moment().subtract(5, 'days').format('L'),
			}),
			dataReport({
				data: daySeven,
				date: moment().subtract(6, 'days').format('L'),
			}),
		];

		sales.reverse();

		// const salesThisWeek = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('week').toDate(),
		// 		$lte: moment().endOf('week').toDate(),
		// 	},
		// });

		// const salesLastWeek = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'weeks').startOf('week').toDate(),
		// 		$lte: moment().subtract(1, 'weeks').endOf('week').toDate(),
		// 	},
		// });

		// const salesThisMonth = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('month').toDate(),
		// 		$lte: moment().endOf('month').toDate(),
		// 	},
		// });

		// const salesLastMonth = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'months').startOf('months').toDate(),
		// 		$lte: moment().subtract(1, 'months').endOf('months').toDate(),
		// 	},
		// });

		res.status(200).json(sales);
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getSalesReport;
