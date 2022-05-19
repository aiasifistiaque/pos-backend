import asyncHandler from 'express-async-handler';
import Activity from '../../models/activityModel.js';
import Brand from '../../models/brandModel.js';

const getActivitiesController = asyncHandler(async (req, res) => {
	try {
		const data = await Activity.find({ store: req.store })
			.populate({
				path: 'user',
				select: 'name email',
			})
			.sort('-createdAt');

		res.status(200).json({ data: data, status: 'successful' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: 'error', error: e.message });
	}
});

export default getActivitiesController;
