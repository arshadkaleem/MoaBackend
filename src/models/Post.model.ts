import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interfaces/posts';

const PostSchema: Schema = new Schema<IPost>({
  postTitle: { type: String, required: true },
  postedBy: {
    userId: { type: String, default: null, ref: 'USER' },
    displayName: { type: String, default: 'Anonymous' },
  },
  imageUrl: { type: String, default: null },
  postContent: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true })

export default mongoose.model<IPost>('POST', PostSchema); 
