import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		store: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Shop',
		},
		name: {
			type: String,
		},
		category: {
			type: String,
			lowercase: true,
		},
		type: {
			type: String,
			lowercase: true,
		},
		model: {
			type: String,
		},
		description: {
			type: String,
		},
		prevState: {
			type: String,
		},
		newState: {
			type: String,
		},
		prevStateId: {
			type: mongoose.Schema.Types.ObjectId,
		},
		newStateId: {
			type: mongoose.Schema.Types.ObjectId,
		},
		extra: {
			type: mongoose.Schema.Types.Mixed,
		},
	},
	{
		timestamps: true,
	}
);

const Activity = mongoose.model('Activity', schema);

export default Activity;
