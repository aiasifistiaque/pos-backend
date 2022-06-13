import asyncHandler from 'express-async-handler';
import express from 'express';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';
import addActivity from '../activity/addActivity.js';
import Brand from '../../models/brandModel.js';

const addNewProductController = asyncHandler(async (req, res) => {
	const {
		name,
		displayImage,
		images,
		price,
		cost,
		description,
		note,
		stock,
		stockAlert,
		status,
		subCategory,
		size,
		totalSold,
		otherCategory,
		otherBrand,
		categoryCode,
	} = req.body;
	let category = req.body.category;
	let brand = req.body.brand;
	let catCode = categoryCode;
	try {
		if (category == 'other') {
			const categoryCount = await Category.count({ store: req.store });
			const code =
				categoryCount < 10
					? `00${categoryCount}`
					: categoryCount < 100
					? `0${categoryCount}`
					: categoryCount;

			const newCategory = new Category({
				user: req.user._id,
				name: otherCategory,
				store: req.store,
				code,
			});
			const savedCategory = await newCategory.save();
			category = savedCategory;
			catCode = savedCategory.code;
		}
		if (brand == 'other') {
			const newBrand = new Brand({
				user: req.user._id,
				name: otherBrand,
				store: req.store,
			});
			const savedBrand = await newBrand.save();
			brand = savedBrand;
		}
		const productCount = await Product.count({
			store: req.store,
			category: category,
		});

		const sku = `${catCode}${
			productCount < 10
				? `00${productCount}`
				: productCount < 100
				? `0${productCount}`
				: productCount
		}`;

		console.log(productCount);

		const newItem = new Product({
			user: req.user._id,
			name,
			displayImage,
			images,
			category,
			brand,
			price,
			cost,
			description,
			note,
			stock,
			stockAlert,
			status,
			subCategory,
			size,
			totalSold,
			store: req.store,
			sku,
		});
		const saved = await newItem.save();

		addActivity({
			name: 'Add Product',
			category: 'product',
			user: req.user._id,
			store: req.store,
			newStateId: saved._id,
			description: `added a new product ${name}`,
			type: 'create',
		});

		res.status(201).json({ data: newItem, status: 'Item has been added' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default addNewProductController;
