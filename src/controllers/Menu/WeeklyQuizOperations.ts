import { ObjectId } from "mongodb";
import { IWeeklyQuiz } from "../../interfaces/weeklyQuiz";
import WeeklyQuizModel from "../../models/WeeklyQuiz.model";

// Weekly Quiz CRUD Operations
export const WeeklyQuizOperations = {
  create: async (quizData: Omit<IWeeklyQuiz, '_id' | 'createdAt' | 'updatedAt'>) => {
    return await new WeeklyQuizModel(quizData).save() as IWeeklyQuiz;
  },

  getAll: async () => {
    return await WeeklyQuizModel.find().lean() as IWeeklyQuiz[];
  },

  getById: async (id: ObjectId | string) => {
    return await WeeklyQuizModel.findById(id).lean() as IWeeklyQuiz | null;
  },

  getActive: async (active: boolean) => {
    return await WeeklyQuizModel.find({ isActive: active }).lean() as IWeeklyQuiz[];
  },

  update: async (id: ObjectId | string, updateData: Partial<Omit<IWeeklyQuiz, '_id' | 'createdAt' | 'updatedAt'>>) => {
    return await WeeklyQuizModel.findByIdAndUpdate(id,
      { $set: updateData },
      { new: true }
    ) as IWeeklyQuiz | null;
  },

  delete: async (id: ObjectId | string) => {
    return await WeeklyQuizModel.findByIdAndDelete(id);
  }
};

