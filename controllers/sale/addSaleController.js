import asyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../../models/productModel.js';
import Sale from '../../models/saleModel.js';
import addActivity from '../activity/addActivity.js';

const addSaleController = asyncHandler(async (req, res) => {
	const { items, shippingPrice, vat, discount } = req.body;
	try {
		let itemPrice = 0;
		let totalQuantity = 0;
		items.map(async item => {
			const priceOfThisItem = item.price * item.quantity;
			itemPrice = itemPrice + priceOfThisItem;
			const product = await Product.findById(item.product);
			const stock = product.stock - item.quantity;
			product.totalSold += item.quantity;
			product.stock = stock;
			await product.save();
			totalQuantity = totalQuantity + parseInt(item.quantity);
		});
		const initialPrice = itemPrice;
		itemPrice = itemPrice + shippingPrice + vat - discount;

		const newItem = new Sale({
			user: req.user._id,
			orderItems: items,
			itemPrice: initialPrice,
			shippingPrice,
			discount,
			vat,
			totalPrice: parseInt(itemPrice),
			quantity: totalQuantity,
			customer: req.body.customer,
			store: req.store,
		});
		const saved = await newItem.save();

		addActivity({
			name: 'Add Sale Order',
			category: 'sale',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new sale order for ${totalQuantity} items worth Tk.${itemPrice}`,
			type: 'create',
			extra: {
				price: parseInt(itemPrice),
				quanity: totalQuantity,
				shippingPrice,
				discount,
				vat,
				orderItems: items,
				customer: req.body.customer,
			},
		});

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addSaleController;
