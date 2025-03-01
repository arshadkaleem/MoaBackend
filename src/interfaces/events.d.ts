import { Document, ObjectId } from 'mongoose';

interface IEvent extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  banner: string | null;
  startDate: Date;
  endDate: Date | null;
  url: string;
  status: 'upcoming' | 'past';
  createdAt: Date;
  updatedAt: Date;
}

