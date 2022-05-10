import asyncHandler from 'express-async-handler';
import express from 'express';
import Expense from '../../models/expenseModel.js';

const addExpenseController = asyncHandler(async (req, res) => {
	const { name, note, description, amount, category } = req.body;
	try {
		const newItem = new Expense({
			user: req.user._id,
			name,
			category,
			description,
			note,
			amount: parseInt(amount),
		});
		const saved = await newItem.save();

		res.status(201).json({ data: saved, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addExpenseController;
