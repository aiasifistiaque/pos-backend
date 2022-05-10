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
		details: {
			type: String,
		},
		amount: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			default: 'Common',
		},
		note: { type: String },
	},
	{
		timestamps: true,
	}
);

const Expense = mongoose.model('Expense', schema);

export default Expense;
