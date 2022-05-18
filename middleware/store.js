import asyncHandler from 'express-async-handler';

export const store = asyncHandler(async (req, res, next) => {
	let store;

	if (req.headers.store) {
		try {
			store = req.headers.store;
			req.store = store;

			next();
		} catch (error) {
			res.status(401).json({ message: 'Error Fetching store' });
		}
	}

	if (!store) {
		console.log('Error: Store not defined');

		return res.status(401).json({ message: 'Store not defined' });
	}
});
