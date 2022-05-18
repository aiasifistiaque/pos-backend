import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		owner: {
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
