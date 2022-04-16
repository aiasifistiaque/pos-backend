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
		displayImage: {
			type: String,
		},
		images: [],
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Brand',
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Category',
		},

		status: {
			type: String,
			default: 'visible',
		},

		subCategory: {
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

		specs: [
			{
				specification: String,
				value: String,
			},
		],

		price: {
			type: Number,
			required: true,
			default: 0,
		},

		cost: {
			type: Number,
			required: true,
			default: 0,
		},

		discount: {
			type: Number,
			default: 0,
		},

		size: {
			type: String,
			trim: true,
		},

		rating: {
			type: Number,
			default: 0,
		},

		stock: {
			type: Number,
			required: true,
			default: 0,
		},

		totalSold: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', schema);

export default Product;