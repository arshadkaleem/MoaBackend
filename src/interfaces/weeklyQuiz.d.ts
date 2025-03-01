import { Document, ObjectId } from 'mongoose';

interface IWeeklyQuiz extends Document {
  _id: ObjectId;
  quiz: {
    image: string | undefined;
    question: string;
    correctAnswer: string;
    options: {
      index: string;
      isSelected: boolean;
      answer: string;
    }[];
  }[];
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
