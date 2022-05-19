import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import Brand from '../../models/brandModel.js';
import Activity from '../../models/activityModel.js';

const addActivity = asyncHandler(async body => {
	try {
		const activity = new Activity(body);
		await activity.save();
	} catch (e) {
		console.log(e);
	}
});

export default addActivity;
