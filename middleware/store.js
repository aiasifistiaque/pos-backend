import Employee from '../models/employeeModel.js';

export const store = (value = 'none') => {
	return async (req, res, next) => {
		try {
			let store;

			if (req.headers.store) {
				store = req.headers.store;
				req.store = store;

				const isEmployee = await Employee.findOne({
					user: req.user._id,
					store: store,
				}).select('permissions role');

				if (!isEmployee) {
					return res.status(401).json({ message: 'Not Authorized' });
				}

				if (value != 'none' && isEmployee.role != 'owner') {
					//const permissions=isEmployee.permission
					const permission = isEmployee?.permissions?.includes(value);

					if (!permission) {
						return res.status(401).json({ message: 'Not Authorized' });
					}
				}

				req.employee = isEmployee.role;

				next();
			}

			if (!store) {
				return res.status(401).json({ message: 'Store not defined' });
			}
		} catch (error) {
			return res
				.status(401)
				.json({ message: 'Error Fetching data', error: error.message });
		}
	};
};
