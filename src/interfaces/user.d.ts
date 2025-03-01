import { Document, ObjectId } from 'mongoose';

interface IUser extends Document {
  _id: ObjectId;
  mobile: string | null;
  mobileSecondary: string | null;
  email: string | null;
  emailSecondary: string | null;
  password: string | null;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
