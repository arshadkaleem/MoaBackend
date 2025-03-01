import Joi from "joi";

export default {
  VideoJoiSchema: Joi.object({
    title: Joi.string().required(),
    videoUrl: Joi.string().required()
  }),
  ArticleJoiSchema: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    publishedBy: Joi.object({
      userId: Joi.string().default(null),
      displayName: Joi.string().default('Anonymous'),
      at: Joi.date().default(new Date())
    }).required(),
    articleUrl: Joi.string().required()
  }),
  PresentationJoiSchema: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    presentatedBy: Joi.object({
      userId: Joi.string().default(null),
      displayName: Joi.string().default('Anonymous'),
      at: Joi.date().default(new Date())
    }).required(),
    presentationUrl: Joi.string().required()
  }),
  ImagingJoiSchema: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    url: Joi.string().required()
  }),
  ConsentJoiSchema: Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required()
  }),


  // Update Joi Schema
  UpdateVideoJoiSchema: Joi.object({
    title: Joi.string().optional(),
    videoUrl: Joi.string().optional()
  }),
  UpdateArticleJoiSchema: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    publishedBy: Joi.object({
      userId: Joi.string().optional(),
      displayName: Joi.string().optional(),
      at: Joi.date().optional()
    }).optional(),
    articleUrl: Joi.string().optional()
  }),
  UpdatePresentationJoiSchema: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    presentatedBy: Joi.object({
      userId: Joi.string().optional(),
      displayName: Joi.string().optional(),
      at: Joi.date().optional()
    }).optional(),
    presentationUrl: Joi.string().optional()
  }),
  UpdateImagingJoiSchema: Joi.object({
    title: Joi.string().optional(),
    body: Joi.string().optional(),
    url: Joi.string().optional()
  }),
  UpdateConsentJoiSchema: Joi.object({
    title: Joi.string().optional(),
    url: Joi.string().optional()
  }),
}
