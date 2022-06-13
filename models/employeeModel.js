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
		permissions: [],
	},
	{
		timestamps: true,
	}
);

const Employee = mongoose.model('Employee', schema);

export default Employee;

/**
 * 
 * {
				product: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				sale: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				purchase: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				customer: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				supplier: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				employee: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				cateogry: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				brand: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
				analytics: {
					create: { type: Boolean, default: false },
					read: { type: Boolean, default: false },
					edit: { type: Boolean, default: false },
					delete: { type: Boolean, default: false },
				},
			},
 */
