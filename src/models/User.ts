import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	username: string;
	password: string;
	email?: string;
	role?: string;
}

const ROLE = ['USER', 'ADMIN'];

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	role: {
		type: String,
		default: ROLE[0],
		enum: ROLE,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		default: '',
	},
});

export default mongoose.model<IUser>('User', userSchema);
