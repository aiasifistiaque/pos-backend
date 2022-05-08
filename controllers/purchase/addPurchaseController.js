import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Product from '../../models/productModel.js';
import Purchase from '../../models/purchaseModel.js';

const addPurchaseController = asyncHandler(async (req, res) => {
	const { items, shippingPrice, vat, discount } = req.body;
	try {
		let itemPrice = 0;
		let totalQuantity = 0;
		items.map(async item => {
			const priceOfThisItem = item.price * item.quantity;
			itemPrice = itemPrice + priceOfThisItem;
			const product = await Product.findById(item.product);
			const stock = product.stock
				? product.stock + item.quantity
				: item.quantity;
			product.stock = stock;
			await product.save();
			totalQuantity = totalQuantity + item.quantity;
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
		});
		const saved = await newItem.save();
		if (saved) {
		}
		res.status(201).json({ data: newItem, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addPurchaseController;
