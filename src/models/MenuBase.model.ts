import mongoose, { Schema } from 'mongoose';
import { IArticle, IConsent, IImaging, IMenu, IMenuBase, IPresentation, IVideo } from '../interfaces/menu';

const MenuBaseSchema: Schema = new Schema<IMenuBase>({
  type: {
    type: String,
    required: true,
    enum: ['video', 'article', 'presentation', 'imaging', 'consent']
  },
}, {
  discriminatorKey: 'type',
  timestamps: true
})

const VideoSchema: Schema = MenuBaseSchema.discriminator('video', new Schema<IVideo>({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true }
}));

const ArticleSchema: Schema = MenuBaseSchema.discriminator('article', new Schema<IArticle>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  publishedBy: {
    userId: { type: String, default: null },
    displayName: { type: String, default: 'Anonymous' },
    at: { type: Date, required: true, default: Date.now }
  },
  articleUrl: { type: String, required: true }
}));

const PresentationSchema: Schema = MenuBaseSchema.discriminator('presentation', new Schema<IPresentation>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  presentatedBy: {
    userId: { type: String, default: null },
    displayName: { type: String, default: 'Anonymous' },
    at: { type: Date, required: true, default: Date.now }
  },
  presentationUrl: { type: String, required: true }
}));

const ImagingSchema: Schema = MenuBaseSchema.discriminator('imaging', new Schema<IImaging>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: { type: String, required: true }
}));

const ConsentSchema: Schema = MenuBaseSchema.discriminator('consent', new Schema<IConsent>({
  title: { type: String, required: true },
  url: { type: String, required: true }
}));

export {
  VideoSchema,
  ArticleSchema,
  PresentationSchema,
  ImagingSchema,
  ConsentSchema
}

export default mongoose.model<IMenu>('MENU', MenuBaseSchema);
