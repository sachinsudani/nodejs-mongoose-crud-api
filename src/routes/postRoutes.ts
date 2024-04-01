import express from 'express';
import {
	createPost,
	deletePost,
	getAllPosts,
	updatePost,
} from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/posts', authMiddleware, createPost);
router.get('/posts', authMiddleware, getAllPosts);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id', authMiddleware, deletePost);

export default router;
