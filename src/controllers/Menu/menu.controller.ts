import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import { ArticleOperations, ConsentOperations, ImagingOperations, PresentationOperations, VideoOperations } from "./MenuOperations";
import { IArticle, IConsent, IImaging, IPresentation } from "../../interfaces/menu";

// [VIDEO]
const addVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, videoUrl } = req.body;

  try {
    new URL(videoUrl);
  } catch (e) {
    throw createHttpError(400, "Invalid video URL")
  }

  const video = await VideoOperations.create({ title, videoUrl });

  res.status(200).json({
    success: true,
    message: "Video added successfully",
    data: video
  })
}

const getAllVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const videos = await VideoOperations.getAll();

  const videosWithId = videos.flatMap(video => {
    if (video.videoUrl.includes("youtube.com")) {
      const ytId = video.videoUrl.split("v=")[1];
      return { ...video, ytId };
    }
    return video;
  });

  res.status(200).json({
    success: true,
    data: videosWithId,
  })
}

const getVideoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  const video = await VideoOperations.getById(id);
  if (!video) throw createHttpError(404, "Video not found");

  res.status(200).json({
    success: true,
    data: { ...video, ytId: video.videoUrl.split("v=")[1] },
  })
}

const updateVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, videoUrl } = req.body;

  const updatedVideo = await VideoOperations.update(id, { title, videoUrl });

  res.status(200).json({
    success: true,
    message: "Video updated successfully",
    data: { ...updatedVideo, ytId: updatedVideo?.videoUrl.split("v=")[1] },
  })
}

const deleteVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  VideoOperations.delete(id);

  res.status(200).json({
    success: true,
    message: "Video deleted successfully",
  })
}



// [ARTICLE]
const addArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    title,
    description,
    articleUrl,
    publishedBy: { userId = null, displayName = 'Anonymous' },
  } = req.body as Omit<IArticle, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  const article = await ArticleOperations.create({ title, description, articleUrl, publishedBy: { userId, displayName, at: new Date() } });

  res.status(200).json({
    success: true,
    message: "Article added successfully",
    data: article
  })
}

const getAllArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const articles = await ArticleOperations.getAll();

  res.status(200).json({
    success: true,
    data: articles
  })
}

const getArticleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;

  if (!id) throw createHttpError(400, "Invalid article ID");

  const article = await ArticleOperations.getById(id);

  res.status(200).json({
    success: true,
    data: article
  })
}

const updateArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;
  const {
    title,
    description,
    articleUrl,
    publishedBy
  } = req.body as Omit<IArticle, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  if (!id) throw createHttpError(400, "Invalid article ID");

  const updatedArticle = await ArticleOperations.update(id, { title, description, articleUrl, publishedBy });

  res.status(200).json({
    success: true,
    message: "Article updated successfully",
    data: updatedArticle
  })
}

const deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id;

  if (!id) throw createHttpError(400, "Invalid article ID");

  await ArticleOperations.delete(id);

  res.status(200).json({
    success: true,
    message: "Article deleted successfully"
  })
}



// [PRESENTATION]
const addPresentation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    title,
    description,
    presentationUrl,
    presentatedBy: { userId = null, displayName = 'Anonymous' },
  } = req.body as Omit<IPresentation, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  const presentation = await PresentationOperations.create({ title, description, presentationUrl, presentatedBy: { userId, displayName, at: new Date() } });

  res.status(200).json({
    success: true,
    message: "Presentation added successfully",
    data: presentation
  })
}

const getAllPresentations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const presentations = await PresentationOperations.getAll();

  res.status(200).json({
    success: true,
    data: presentations
  })
}

const getPresentationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  const presentation = await PresentationOperations.getById(id);

  res.status(200).json({
    success: true,
    data: presentation
  })
}

const updatePresentation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;
  const {
    title,
    description,
    presentationUrl,
    presentatedBy,
  } = req.body as Omit<IPresentation, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  const updatedPresentation = await PresentationOperations.update(id, { title, description, presentationUrl, presentatedBy });

  res.status(200).json({
    success: true,
    message: "Presentation updated successfully",
    data: updatedPresentation
  })
}

const deletePresentation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  await PresentationOperations.delete(id);

  res.status(200).json({
    success: true,
    message: "Presentation deleted successfully"
  })
}



// [IMAGING]
const addImaging = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    title,
    body,
    url,
  } = req.body as Omit<IImaging, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  const imaging = await ImagingOperations.create({ title, body, url });

  res.status(200).json({
    success: true,
    message: "Imaging added successfully",
    data: imaging
  })
}

const getAllImagings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const presentations = await ImagingOperations.getAll();

  res.status(200).json({
    success: true,
    data: presentations
  })
}

const getImagingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  const presentation = await ImagingOperations.getById(id);

  res.status(200).json({
    success: true,
    data: presentation
  })
}

const updateImaging = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;
  const {
    title,
    body,
    url,
  } = req.body as Omit<IImaging, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  const updatedImaging = await ImagingOperations.update(id, { title, body, url });

  res.status(200).json({
    success: true,
    message: "Imaging updated successfully",
    data: updatedImaging
  })
}

const deleteImaging = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  await ImagingOperations.delete(id);

  res.status(200).json({
    success: true,
    message: "Imaging deleted successfully"
  })
}



// [CONSENT]
const addConsent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    title,
    url
  } = req.body as Omit<IConsent, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  const consent = await ConsentOperations.create({ title, url });

  res.status(200).json({
    success: true,
    message: "Consent added successfully",
    data: consent
  })
}

const getAllConsents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const presentations = await ConsentOperations.getAll();

  res.status(200).json({
    success: true,
    data: presentations
  })
}

const getConsentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  const presentation = await ConsentOperations.getById(id);

  res.status(200).json({
    success: true,
    data: presentation
  })
}

const updateConsent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { id } = req.params;
  const {
    title,
    url
  } = req.body as Omit<IConsent, '_id' | 'type' | 'createdAt' | 'updatedAt'>;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  const updatedConsent = await ConsentOperations.update(id, { title, url });

  res.status(200).json({
    success: true,
    message: "Consent updated successfully",
    data: updatedConsent
  })
}

const deleteConsent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id;

  if (!id) throw createHttpError(400, "Invalid presentation ID");

  await ConsentOperations.delete(id);

  res.status(200).json({
    success: true,
    message: "Consent deleted successfully"
  })
}

export default {
  // [VIDEO]
  addVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,

  // [ARTICLE]
  addArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,

  // [PRESENTATION]
  addPresentation,
  getAllPresentations,
  getPresentationById,
  updatePresentation,
  deletePresentation,

  // [IMAGING]
  addImaging,
  getAllImagings,
  getImagingById,
  updateImaging,
  deleteImaging,

  // [CONSENT]
  addConsent,
  getAllConsents,
  getConsentById,
  updateConsent,
  deleteConsent,
}
