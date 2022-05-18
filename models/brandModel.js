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
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
		},
		image: {
			type: String,
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

const Brand = mongoose.model('Brand', schema);

export default Brand;
