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

		description: {
			type: String,
			trim: true,
		},

		note: {
			type: String,
			trim: true,
		},
		products: {},
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model('Category', schema);

export default Category;
