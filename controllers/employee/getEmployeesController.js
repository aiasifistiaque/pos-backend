import asyncHandler from 'express-async-handler';
import express from 'express';
import Employee from '../../models/employeeModel.js';

const getEmployeesController = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Employee.find(req.meta.query)
			.populate({
				path: 'user',
				select: 'name email',
			})
			.sort(sort)
			.limit(perpage)
			.skip(skip);

		const count = await Employee.count(req.meta.query);

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		const mappedData = await data.map(async (item, i) => {
			if (item.email == 'notadded@ims.io') {
				item.email = item.user.email;
				await item.save();
			}
		});

		res.status(200).json({ ...req.meta, data: data, status: 'Success' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getEmployeesController;
