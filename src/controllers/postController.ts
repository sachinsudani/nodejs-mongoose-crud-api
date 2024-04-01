import { Request, Response } from 'express';
import Post from '../models/Post';
import { postSchema, updatePostSchema } from '../utils/validation';

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

export const updatePost = async (req: Request, res: Response) => {
	const { title, body, geoLocation, active } = updatePostSchema.parse(req.body);

	const updatedPost = await Post.findByIdAndUpdate(
		{ _id: req.params.id, createdBy: req.params.userId },
		{
			title,
			body,
			active,
			geoLocation: {
				type: 'Point',
				coordinates: geoLocation?.coordinates,
			},
		},
		{ new: true }
	);

	updatedPost
		? res.json(updatedPost)
		: res.status(404).json({ message: 'Post not found' });
};
