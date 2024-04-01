import { Request, Response } from 'express';
import Post from '../models/Post';
import { postSchema } from '../utils/validation';

export const createPost = async (req: Request, res: Response) => {
	const { title, body, geoLocation, active } = postSchema.parse(req.body);

	const newPost = new Post({
		title,
		body,
		createdBy: req.params.userId,
		active,
		geoLocation: {
			type: 'Point',
			coordinates: geoLocation.coordinates,
		},
	});
	newPost
		.save()
		.then((post) => res.json(post))
		.catch((err) => console.error(err));
};

export const getAllPosts = async (req: Request, res: Response) => {
	const posts = await Post.find({ createdBy: req.params.userId });
	posts.length > 0
		? res.json(posts)
		: res.status(404).json({ message: 'No posts found' });
};
