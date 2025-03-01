import { Document, ObjectId } from 'mongoose';

interface IPost extends Document {
  _id: ObjectId
  postTitle: string;
  postedBy: {
    userId: string | null;
    displayName: string | 'Anonymous';
  };
  imageUrl: string | null;
  postContent: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
