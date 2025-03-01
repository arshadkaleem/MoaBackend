import Joi from "joi";

export default {
  eventJoiSchema: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    banner: Joi.string().default(null),
    startDate: Joi.date().required(),
    endDate: Joi.date().default(null),
    status: Joi.string().valid('upcoming', 'past').default('upcoming'),
    url: Joi.string().required(),
  }),
  updateEventJoiSchema: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    banner: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().default(null),
    status: Joi.string().valid('upcoming', 'past').optional(),
    url: Joi.string().optional(),
  }),
}
