import express from 'express';
import {
	createPost,
	getAllPosts,
	updatePost,
} from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/posts', authMiddleware, createPost);
router.get('/posts', authMiddleware, getAllPosts);
router.put('/posts/:id', authMiddleware, updatePost);

export default router;
