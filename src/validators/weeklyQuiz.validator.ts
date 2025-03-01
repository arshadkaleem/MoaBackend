import Joi from "joi";

export default {
  WeeklyQuizJoiSchema: Joi.object({
    quiz: Joi.array().items(
      Joi.object({
        image: Joi.string().optional(),
        question: Joi.string().required(),
        correctAnswer: Joi.string().required(),
        options: Joi.array().items(
          Joi.object({
            index: Joi.string().required(),
            isSelected: Joi.boolean().required(),
            answer: Joi.string().required()
          })
        ).required()
      })
    ).required(),
    startTime: Joi.date().default(new Date()),
    endTime: Joi.date().optional(),
    isActive: Joi.boolean().default(true)
  }),
  UpdateWeeklyQuizJoiSchema: Joi.object({
    quiz: Joi.array().items(
      Joi.object({
        image: Joi.string().optional(),
        question: Joi.string().optional(),
        correctAnswer: Joi.string().optional(),
        options: Joi.array().items(
          Joi.object({
            index: Joi.string().optional(),
            isSelected: Joi.boolean().optional(),
            answer: Joi.string().optional()
          })
        ).optional()
      })
    ).optional(),
    startTime: Joi.date().default(new Date()),
    endTime: Joi.date().optional(),
    isActive: Joi.boolean().default(true)
  })
}
