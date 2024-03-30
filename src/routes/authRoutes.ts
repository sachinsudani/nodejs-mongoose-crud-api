import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register/v1', register);
router.post('/login/v1', login);

export default router;
