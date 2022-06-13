import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
		},
		email: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
			unique: true,
		},

		address: {
			type: String,
			trim: true,
		},

		description: {
			type: String,
			trim: true,
		},
		payable: {
			type: Number,
		},
		role: {
			type: String,
			required: true,
		},

		receivable: {
			type: Number,
		},
		due: {
			type: Number,
		},

		note: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Customer = mongoose.model('Customer', schema);

export default Customer;
