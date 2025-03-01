import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const UserSchema: Schema = new Schema<IUser>({
  mobile: { type: String, default: null },
  mobileSecondary: { type: String, default: null },
  email: { type: String, default: null },
  emailSecondary: { type: String, default: null },
  password: { type: String, default: null },
  displayName: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
}, { timestamps: true })

export default mongoose.model<IUser>('USER', UserSchema); 
