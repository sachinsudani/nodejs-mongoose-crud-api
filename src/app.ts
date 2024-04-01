import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import authConfig from './auth';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongoose';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(passport.initialize());
authConfig();

app.use('/api/users/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
