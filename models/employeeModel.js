import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		email: { type: String, default: 'notadded@ims.io' },
		status: { type: String },
		store: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Shop',
		},
		role: {
			type: String,
			required: true,
		},
		addedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Employee = mongoose.model('Employee', schema);

export default Employee;
