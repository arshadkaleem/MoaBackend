import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import { IWeeklyQuiz } from "../../interfaces/weeklyQuiz";
import { WeeklyQuizOperations } from "./WeeklyQuizOperations";

const addWeeklyQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    quiz,
    startTime = new Date(),
    endTime = new Date(startTime.getTime() + 1000 * 60 * 60 * 24 * 7),
    isActive = true
  } = req.body as Omit<IWeeklyQuiz, '_id' | 'createdAt' | 'updatedAt'>;

  const newQuiz = await WeeklyQuizOperations.create({ quiz, startTime, endTime, isActive } as Omit<IWeeklyQuiz, '_id' | 'createdAt' | 'updatedAt'>);


  res.status(200).json({
    success: true,
    message: `Weekly Quiz added successfully from ${newQuiz.startTime} to ${newQuiz.endTime}`,
    data: newQuiz
  })
}


const getAllWeeklyQuizzes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const allQuiz = await WeeklyQuizOperations.getAll();

  res.status(200).json({
    success: true,
    data: allQuiz
  })
}

const getWeeklyQuizById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  const quiz = await WeeklyQuizOperations.getById(id);

  if (!quiz) return next(new createHttpError.NotFound('Weekly Quiz not found'));

  res.status(200).json({
    success: true,
    data: quiz
  })
}

const getActiveWeeklyQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { active } = req.params;

  const activeQuiz = await WeeklyQuizOperations.getActive(active !== 'false');

  res.status(200).json({
    success: true,
    data: activeQuiz
  })
}

const updateWeeklyQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const {
    quiz,
    startTime,
    endTime,
    isActive
  } = req.body as Partial<Omit<IWeeklyQuiz, '_id' | 'createdAt' | 'updatedAt'>>;

  const updatedQuiz = await WeeklyQuizOperations.update(id, { quiz, startTime, endTime, isActive });

  if (!updatedQuiz) return next(new createHttpError.NotFound('Weekly Quiz not found'));

  res.status(200).json({
    success: true,
    message: `Weekly Quiz updated successfully`,
    data: updatedQuiz
  })
}

const deleteWeeklyQuiz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  const deletedQuiz = await WeeklyQuizOperations.delete(id);

  if (!deletedQuiz) return next(new createHttpError.NotFound('Weekly Quiz not found'));

  res.status(200).json({
    success: true,
    message: `Weekly Quiz deleted successfully`
  })
}

export default {
  addWeeklyQuiz,
  getAllWeeklyQuizzes,
  getWeeklyQuizById,
  getActiveWeeklyQuiz,
  updateWeeklyQuiz,
  deleteWeeklyQuiz
}

