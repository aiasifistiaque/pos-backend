import asyncHandler from 'express-async-handler';
import moment from 'moment';
import Brand from '../../models/brandModel.js';
import Category from '../../models/categoryModel.js';
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
		const productData = await Product.find({ user: req.user._id })
			.sort('-createdAt')
			.populate({ path: 'category', select: 'name' });
		totalProducts = productData.length;

		const user = await User.findById(req.user._id).select('-password');

		productData.map(item => {
			const { stock, price } = item;
			inventory += stock;
			inventoryValue += stock * price;
		});

		const categories = await Category.count({ user: req.user._id });
		const brands = await Brand.count({ user: req.user._id });
		const salesData = await Sale.find({ user: req.user._id });
		const purchaseData = await Purchase.find({ user: req.user._id });
		const expensesData = await Expense.find({ user: req.user._id });

		const today = moment().startOf('day');

		const purchaseToday = await Purchase.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().startOf('day').toDate(),
				$lte: moment().endOf('day').toDate(),
			},
		});
		const salesToday = await Sale.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().startOf('day').toDate(),
				$lte: moment().endOf('day').toDate(),
			},
		});
		const purchaseYesterday = await Purchase.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().subtract(1, 'days').startOf('day').toDate(),
				$lte: moment().subtract(1, 'days').endOf('day').toDate(),
			},
		});
		const salesYesterday = await Sale.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().subtract(1, 'days').startOf('day').toDate(),
				$lte: moment().subtract(1, 'days').endOf('day').toDate(),
			},
		});
		const purchaseThisWeek = await Purchase.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().startOf('week').toDate(),
				$lte: moment().endOf('week').toDate(),
			},
		});
		const salesThisWeek = await Sale.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().startOf('week').toDate(),
				$lte: moment().endOf('week').toDate(),
			},
		});
		const purchaseLastWeek = await Purchase.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().subtract(1, 'weeks').startOf('week').toDate(),
				$lte: moment().subtract(1, 'weeks').endOf('week').toDate(),
			},
		});
		const salesLastWeek = await Sale.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().subtract(1, 'weeks').startOf('week').toDate(),
				$lte: moment().subtract(1, 'weeks').endOf('week').toDate(),
			},
		});
		const purchaseThisMonth = await Purchase.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().startOf('month').toDate(),
				$lte: moment().endOf('month').toDate(),
			},
		});
		const salesThisMonth = await Sale.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().startOf('month').toDate(),
				$lte: moment().endOf('month').toDate(),
			},
		});
		const purchaseLastMonth = await Purchase.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().subtract(1, 'months').startOf('month').toDate(),
				$lte: moment().subtract(1, 'months').endOf('month').toDate(),
			},
		});
		const salesLastMonth = await Sale.find({
			user: req.user._id,
			createdAt: {
				$gte: moment().subtract(1, 'months').startOf('months').toDate(),
				$lte: moment().subtract(1, 'months').endOf('months').toDate(),
			},
		});

		const data = {
			products: totalProducts,
			inventory: {
				count: inventory,
				value: inventoryValue,
			},
			purchase: countValue(purchaseData),
			purchaseToday: countValue(purchaseToday),
			purchaseYesterday: countValue(purchaseYesterday),
			purchaseThisWeek: countValue(purchaseThisWeek),
			purchaseLastWeek: countValue(purchaseLastWeek),
			purchaseThisMonth: countValue(purchaseThisMonth),
			purchaseLastMonth: countValue(purchaseLastMonth),
			sales: countValue(salesData),
			salesToday: countValue(salesToday),
			salesYesterday: countValue(salesYesterday),
			salesThisWeek: countValue(salesThisWeek),
			salesLastWeek: countValue(salesLastWeek),
			salesThisMonth: countValue(salesThisMonth),
			salesLastMonth: countValue(salesLastMonth),
			expenses: {
				count: expensesData.length,
				value: expensesData.reduce((sum, item) => sum + item.amount, 0),
			},
			categories,
			brands,
			user,
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
