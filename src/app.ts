import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongoose';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
