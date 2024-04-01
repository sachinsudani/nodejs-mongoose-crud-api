import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z
			.string()
			.trim()
			.min(3, { message: 'Username must be at least 3 characters long' }),
		password: z
			.string()
			.trim()
			.min(6, { message: 'Password must be at least 6 characters long' }),
		role: z.enum(['USER', 'ADMIN']).optional(),
	})
	.strict();

export const loginSchema = z
	.object({
		username: z.string().trim().min(3),
		password: z.string().trim().min(6),
	})
	.strict();

export const postSchema = z
	.object({
		title: z.string().trim().min(3),
		body: z.string().trim().min(6),
		active: z.boolean().optional(),
		geoLocation: z
			.object({
				longitude: z.number().min(-180).max(180),
				latitude: z.number().min(-90).max(90),
			})
			.strict(),
	})
	.strict();

export const updatePostSchema = z
	.object({
		title: z.string().trim().min(3).optional(),
		body: z.string().trim().min(6).optional(),
		active: z.boolean().optional(),
		geoLocation: z
			.object({
				longitude: z.number().min(-180).max(180),
				latitude: z.number().min(-90).max(90),
			})
			.strict()
			.optional(),
	})
	.strict();
