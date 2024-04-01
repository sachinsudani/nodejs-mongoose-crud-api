import express from 'express';
import passport from 'passport';
import {
	createPost,
	deletePost,
	getAllPosts,
	getPostCounts,
	updatePost,
} from '../controllers/postController';

const router = express.Router();

router.post(
	'/posts',
	passport.authenticate('jwt', { session: false }),
	createPost
);
router.get(
	'/posts',
	passport.authenticate('jwt', { session: false }),
	getAllPosts
);
router.put(
	'/posts/:id',
	passport.authenticate('jwt', { session: false }),
	updatePost
);
router.delete(
	'/posts/:id',
	passport.authenticate('jwt', { session: false }),
	deletePost
);
router.get('/posts/dashboard', getPostCounts);

export default router;
