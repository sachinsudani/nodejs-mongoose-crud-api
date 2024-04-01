import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const SECRET_KEY = process.env.JWT_SECRET || 'secret';
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const decoded: JwtPayload = jwt.verify(token, SECRET_KEY) as JwtPayload;
	req.params.userId = decoded.user.id;
	next();
};
