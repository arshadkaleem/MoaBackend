import Joi from "joi";

export default {
  postJoiSchema: Joi.object({
    postTitle: Joi.string().required(),
    postedBy: Joi.object({
      userId: Joi.string().default(null),
      displayName: Joi.string().default('Anonymous'),
    }),
    imageUrl: Joi.string().default(null),
    postContent: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    createdAt: Joi.date().default(new Date()),
    updatedAt: Joi.date().default(new Date()),
  }),
  updatePostJoiSchema: Joi.object({
    postTitle: Joi.string().optional(),
    postedBy: Joi.object({
      userId: Joi.string().optional(),
      displayName: Joi.string().optional(),
    }),
    imageUrl: Joi.string().optional(),
    postContent: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().default(new Date()),
  }).min(1),
}
