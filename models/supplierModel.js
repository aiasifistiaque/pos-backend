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
		email: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},

		address: {
			type: String,
			trim: true,
		},

		description: {
			type: String,
			trim: true,
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

const Supplier = mongoose.model('Supplier', schema);

export default Supplier;
