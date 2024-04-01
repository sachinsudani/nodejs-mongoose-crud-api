import mongoose, { Document, Schema } from 'mongoose';

interface GeoLocation {
	longitude: number;
	latitude: number;
}

export interface IPost extends Document {
	title: string;
	body: string;
	createdBy: mongoose.Schema.Types.ObjectId;
	active: boolean;
	geoLocation: GeoLocation;
}

const postSchema = new Schema<IPost>({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	active: {
		type: Boolean,
		default: true,
	},
	geoLocation: {
		longitude: {
			type: Number,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
	},
});

export default mongoose.model<IPost>('Post', postSchema);
