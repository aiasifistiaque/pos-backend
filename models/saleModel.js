import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Customer',
		},
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
		},
		orderItems: [
			{
				price: { type: Number, required: true },
				quantity: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		status: { type: String, required: true, default: 'Order Placed' },
		seen: { type: Number, default: 0 },

		shippingAddress: {
			phone: { type: String },
			address: { type: String },
			city: { type: String },
			postalCode: { type: String },
			country: { type: String, default: 'Bangladesh' },
		},
		paymentMethod: {
			type: String,
			default: 'cash',
		},

		itemPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},

		vat: {
			type: Number,

			default: 0.0,
		},

		shippingPrice: {
			type: Number,

			default: 0.0,
		},

		discount: {
			type: Number,

			default: 0.0,
		},

		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},

		isPaid: {
			type: Boolean,
			default: false,
		},

		paidAt: {
			type: Date,
		},

		date: { type: Date },

		isDelivered: {
			type: Boolean,
		},

		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Sale = mongoose.model('Sale', schema);

export default Sale;
