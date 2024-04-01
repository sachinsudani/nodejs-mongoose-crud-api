import express from 'express';
import { createPost, getAllPosts } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add/v1', authMiddleware, createPost);
router.get('/list/v1', authMiddleware, getAllPosts);

export default router;
