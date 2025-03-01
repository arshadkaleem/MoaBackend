import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { validateJoi } from "../../utils/validateJoi";
import menuValidator from "../../validators/menu.validator";
import menuController from "../../controllers/Menu/menu.controller";
import weeklyQuizValidator from "../../validators/weeklyQuiz.validator";
import weeklyQuizController from "../../controllers/Menu/weeklyQuiz.controller";

const menuRoute = Router();

// Video routes
menuRoute.post(
  '/video',
  validateJoi(menuValidator.VideoJoiSchema),
  catchAsync(menuController.addVideo)
);
menuRoute.get(
  '/video',
  catchAsync(menuController.getAllVideos)
);
menuRoute.get(
  '/video/:id',
  catchAsync(menuController.getVideoById)
);
menuRoute.put(
  '/video/:id',
  validateJoi(menuValidator.UpdateVideoJoiSchema.min(1)),
  catchAsync(menuController.updateVideo)
);
menuRoute.delete(
  '/video/:id',
  catchAsync(menuController.deleteVideo)
);

// Article routes
menuRoute.post(
  '/article',
  validateJoi(menuValidator.ArticleJoiSchema),
  catchAsync(menuController.addArticle)
);
menuRoute.get(
  '/article',
  catchAsync(menuController.getAllArticles)
);
menuRoute.get(
  '/article/:id',
  catchAsync(menuController.getArticleById)
);
menuRoute.put(
  '/article/:id',
  validateJoi(menuValidator.UpdateArticleJoiSchema.min(1)),
  catchAsync(menuController.updateArticle)
);
menuRoute.delete(
  '/article/:id',
  catchAsync(menuController.deleteArticle)
);

// Presentation routes
menuRoute.post(
  '/presentation',
  validateJoi(menuValidator.PresentationJoiSchema),
  catchAsync(menuController.addPresentation)
);
menuRoute.get(
  '/presentation',
  catchAsync(menuController.getAllPresentations)
);
menuRoute.get(
  '/presentation/:id',
  catchAsync(menuController.getPresentationById)
);
menuRoute.put(
  '/presentation/:id',
  validateJoi(menuValidator.UpdatePresentationJoiSchema.min(1)),
  catchAsync(menuController.updatePresentation)
);
menuRoute.delete(
  '/presentation/:id',
  catchAsync(menuController.deletePresentation)
);

// Imaging routes
menuRoute.post(
  '/imaging',
  validateJoi(menuValidator.ImagingJoiSchema),
  catchAsync(menuController.addImaging)
);
menuRoute.get(
  '/imaging',
  catchAsync(menuController.getAllImagings)
);
menuRoute.get(
  '/imaging/:id',
  catchAsync(menuController.getImagingById)
);
menuRoute.put(
  '/imaging/:id',
  validateJoi(menuValidator.UpdateImagingJoiSchema.min(1)),
  catchAsync(menuController.updateImaging)
);
menuRoute.delete(
  '/imaging/:id',
  catchAsync(menuController.deleteImaging)
);

// Consent routes
menuRoute.post(
  '/consent',
  validateJoi(menuValidator.ConsentJoiSchema),
  catchAsync(menuController.addConsent)
);
menuRoute.get(
  '/consent',
  catchAsync(menuController.getAllConsents)
);
menuRoute.get(
  '/consent/:id',
  catchAsync(menuController.getConsentById)
);
menuRoute.put(
  '/consent/:id',
  validateJoi(menuValidator.UpdateConsentJoiSchema.min(1)),
  catchAsync(menuController.updateConsent)
);
menuRoute.delete(
  '/consent/:id',
  catchAsync(menuController.deleteConsent)
);

// Weekly Quiz routes
menuRoute.post(
  '/weeklyquiz',
  validateJoi(weeklyQuizValidator.WeeklyQuizJoiSchema),
  catchAsync(weeklyQuizController.addWeeklyQuiz)
);
menuRoute.get(
  '/weeklyquiz',
  catchAsync(weeklyQuizController.getAllWeeklyQuizzes)
);
menuRoute.get(
  '/weeklyquiz/:id',
  catchAsync(weeklyQuizController.getWeeklyQuizById)
);
menuRoute.get(
  '/weeklyquiz/active/:active',
  catchAsync(weeklyQuizController.getActiveWeeklyQuiz)
);
menuRoute.put(
  '/weeklyquiz/:id',
  validateJoi(weeklyQuizValidator.UpdateWeeklyQuizJoiSchema),
  catchAsync(weeklyQuizController.updateWeeklyQuiz)
);
menuRoute.delete(
  '/weeklyquiz/:id',
  catchAsync(weeklyQuizController.deleteWeeklyQuiz)
);

export default menuRoute;
