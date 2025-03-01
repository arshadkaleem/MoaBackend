import mongoose, { Schema } from 'mongoose';
import { IEvent } from '../interfaces/events';

const EventSchema: Schema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  banner: { type: String, default: null },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  status: { type: String, enum: ['upcoming', 'past'], required: true, default: 'upcoming' },
  url: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model<IEvent>('EVENT', EventSchema); 
