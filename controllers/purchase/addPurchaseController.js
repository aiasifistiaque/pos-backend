import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Product from '../../models/productModel.js';
import Purchase from '../../models/purchaseModel.js';
import addActivity from '../activity/addActivity.js';

const addPurchaseController = asyncHandler(async (req, res) => {
	const { items, shippingPrice, vat, discount } = req.body;
	try {
		let itemPrice = 0;
		let totalQuantity = 0;
		items.map(async item => {
			const priceOfThisItem = item.price * item.quantity;
			itemPrice = itemPrice + priceOfThisItem;
			totalQuantity = totalQuantity + parseInt(item.quantity);
			const product = await Product.findById(item.product);
			const stock = product.stock
				? product.stock + item.quantity
				: item.quantity;
			product.stock = stock;
			await product.save();
		});
		const initialPrice = itemPrice;
		itemPrice = itemPrice + shippingPrice + vat - discount;
		const newItem = new Purchase({
			user: req.user._id,
			orderItems: items,
			itemPrice: initialPrice,
			shippingPrice,
			discount,
			vat,
			totalPrice: parseInt(itemPrice),
			quantity: totalQuantity,
			store: req.store,
		});
		const saved = await newItem.save();

		addActivity({
			name: 'Add Purchase Order',
			category: 'purchase',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new purchase order for ${totalQuantity} items worth Tk.${itemPrice}`,
			type: 'create',
			extra: {
				price: parseInt(itemPrice),
				quanity: totalQuantity,
				shippingPrice,
				discount,
				vat,
				orderItems: items,
			},
		});

		console.log(saveds);

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addPurchaseController;
