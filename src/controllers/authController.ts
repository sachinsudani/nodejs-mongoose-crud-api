import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { loginSchema, registerSchema } from '../utils/validation';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const register = async (req: Request, res: Response) => {
	const { username, password, email, role } = registerSchema.parse(req.body);

	let user = await User.findOne({ username });
	if (user) {
		return res.status(400).json({ message: 'User already exists' });
	}

	user = new User({ username, email, password, role });
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);
	await user.save();

	res.json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = loginSchema.parse(req.body);

	const user = await User.findOne({ username });
	if (!user) {
		return res.status(400).json({ message: 'Invalid credentials' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(400).json({ message: 'Invalid credentials' });
	}

	const payload = {
		user: {
			id: user._id,
			username: user.username,
			role: user.role,
		},
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.json({ token });
};
