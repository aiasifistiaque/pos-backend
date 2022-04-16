import { User, validate } from '../models/userModel.js';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const router = express.Router();

//const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

router.post('/login', async (req, res) => {
	const { error } = loginValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user)
		return res
			.status(400)
			.send({ status: 'error', error: 'User does not exist' });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword)
		res.status(400).send({ status: 'error', error: 'Wrong password' });

	try {
		const token = user.generateAuthToken();
		res.status(200).send(`Bearer ${token}`);
	} catch {
		e => console.log(e);
	}
});

router.post('/register', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user)
		return res
			.status(400)
			.send({ status: 'error', error: 'User already registered' });

	user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	try {
		await user.save();

		const token = user.generateAuthToken();
		res.status(200).header('x-auth-token', token).send(`Bearer ${token}`);
	} catch (e) {
		console.log(e);
		res.status(500).send('Internal Server Error');
	}
});

function loginValidate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

export default router;
