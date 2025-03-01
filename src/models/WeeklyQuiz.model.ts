import mongoose, { Schema } from 'mongoose';
import { IWeeklyQuiz } from '../interfaces/weeklyQuiz';

const WeeklyQuizSchema: Schema = new Schema<IWeeklyQuiz>({
  quiz: [
    {
      image: { type: String },
      question: { type: String, required: true },
      correctAnswer: { type: String, required: true },
      options: [
        {
          index: { type: String, required: true },
          isSelected: { type: Boolean, default: false },
          answer: { type: String, required: true }
        }
      ]
    }
  ],
  startTime: { type: Date, required: true, default: Date.now },
  endTime: {
    type: Date,
    required: true,
    // '1 week from now date'
    default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IWeeklyQuiz>('WEEKLYQUIZ', WeeklyQuizSchema);
