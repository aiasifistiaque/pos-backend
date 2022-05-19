import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		address: {
			street: String,
			city: String,
			postCode: String,
			country: { type: String, default: 'Bangladesh' },
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
		},
		terms: [],

		description: {
			type: String,
			trim: true,
		},
		category: {
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

const Shop = mongoose.model('Shop', schema);

export default Shop;
