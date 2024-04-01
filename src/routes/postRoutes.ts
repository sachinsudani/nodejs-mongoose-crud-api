import express from 'express';
import { createPost } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add/v1', authMiddleware, createPost);

export default router;
