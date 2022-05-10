import asyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../../models/productModel.js';
import Sale from '../../models/saleModel.js';

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
		});
		const saved = await newItem.save();

		res.status(201).json({ data: newItem, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addSaleController;
