import asyncHandler from 'express-async-handler';
import moment from 'moment';
import Brand from '../../models/brandModel.js';
import Category from '../../models/categoryModel.js';
import Customer from '../../models/customerModel.js';
import Employee from '../../models/employeeModel.js';
import Expense from '../../models/expenseModel.js';

import Product from '../../models/productModel.js';
import Purchase from '../../models/purchaseModel.js';
import Sale from '../../models/saleModel.js';
import { User } from '../../models/userModel.js';

const getDashInfo = asyncHandler(async (req, res) => {
	let totalProducts = 0;
	let inventory = 0;
	let inventoryValue = 0;

	try {
		const productData = await Product.find({ store: req.store })
			.sort('-createdAt')
			.select('stock price');

		const user = await User.findById(req.user._id).select('-password');

		productData.map(item => {
			const { stock, price } = item;
			inventory += stock;
			inventoryValue += stock * price;
			totalProducts += 1;
		});

		const categories = await Category.count({ store: req.store });
		const brands = await Brand.count({ store: req.store });
		const customers = await Customer.count({
			store: req.store,
			role: 'customer',
		});
		const employees = await Employee.count({
			store: req.store,
		});
		const salesData = await Sale.find({ store: req.store });
		//const purchaseData = await Purchase.find({ store: req.store });
		//const expensesData = await Expense.find({ store: req.store });

		//const today = moment().startOf('day');

		// const purchaseToday = await Purchase.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('day').toDate(),
		// 		$lte: moment().endOf('day').toDate(),
		// 	},
		// });
		// const salesToday = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('day').toDate(),
		// 		$lte: moment().endOf('day').toDate(),
		// 	},
		// });
		// const purchaseYesterday = await Purchase.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'days').startOf('day').toDate(),
		// 		$lte: moment().subtract(1, 'days').endOf('day').toDate(),
		// 	},
		// });
		// const salesYesterday = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'days').startOf('day').toDate(),
		// 		$lte: moment().subtract(1, 'days').endOf('day').toDate(),
		// 	},
		// });
		// const purchaseThisWeek = await Purchase.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('week').toDate(),
		// 		$lte: moment().endOf('week').toDate(),
		// 	},
		// });
		// const salesThisWeek = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('week').toDate(),
		// 		$lte: moment().endOf('week').toDate(),
		// 	},
		// });
		// const purchaseLastWeek = await Purchase.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'weeks').startOf('week').toDate(),
		// 		$lte: moment().subtract(1, 'weeks').endOf('week').toDate(),
		// 	},
		// });
		// const salesLastWeek = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'weeks').startOf('week').toDate(),
		// 		$lte: moment().subtract(1, 'weeks').endOf('week').toDate(),
		// 	},
		// });
		// const purchaseThisMonth = await Purchase.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('month').toDate(),
		// 		$lte: moment().endOf('month').toDate(),
		// 	},
		// });
		// const salesThisMonth = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().startOf('month').toDate(),
		// 		$lte: moment().endOf('month').toDate(),
		// 	},
		// });
		// const purchaseLastMonth = await Purchase.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'months').startOf('month').toDate(),
		// 		$lte: moment().subtract(1, 'months').endOf('month').toDate(),
		// 	},
		// });
		// const salesLastMonth = await Sale.find({
		// 	store: req.store,
		// 	createdAt: {
		// 		$gte: moment().subtract(1, 'months').startOf('months').toDate(),
		// 		$lte: moment().subtract(1, 'months').endOf('months').toDate(),
		// 	},
		// });

		const data = {
			products: totalProducts,
			inventory: {
				count: inventory,
				value: inventoryValue,
			},
			sales: countValue(salesData),
			categories,
			brands,
			user,
			customers,
			employees,
			// purchase: countValue(purchaseData),
			// purchaseToday: countValue(purchaseToday),
			// purchaseYesterday: countValue(purchaseYesterday),
			// purchaseThisWeek: countValue(purchaseThisWeek),
			// purchaseLastWeek: countValue(purchaseLastWeek),
			// purchaseThisMonth: countValue(purchaseThisMonth),
			// purchaseLastMonth: countValue(purchaseLastMonth),

			// salesToday: countValue(salesToday),
			// salesYesterday: countValue(salesYesterday),
			// salesThisWeek: countValue(salesThisWeek),
			// salesLastWeek: countValue(salesLastWeek),
			// salesThisMonth: countValue(salesThisMonth),
			// salesLastMonth: countValue(salesLastMonth),
			// expenses: {
			// 	count: expensesData.length,
			// 	value: expensesData.reduce((sum, item) => sum + item.amount, 0),
			// },
		};

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

const countValue = data => {
	return {
		count: data.length,
		value: data.reduce((sum, item) => sum + item.totalPrice, 0),
	};
};

export default getDashInfo;
