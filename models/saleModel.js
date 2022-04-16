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
		orderItems: [
			{
				price: { type: Number, required: true },
				qty: { type: Number, required: true },
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
			phone: { type: String, required: true },
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true, default: 'Bangladesh' },
		},
		paymentMethod: {
			type: String,
			required: true,
			default: 'cash',
		},

		itemPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},

		vat: {
			type: Number,
			required: true,
			default: 0.0,
		},

		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},

		discount: {
			type: Number,
			required: true,
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
