import { Types } from 'mongoose';
import MenuModel from '../../models/MenuBase.model';
import { IArticle, IPresentation, IImaging, IConsent, IVideo } from '../../interfaces/menu';

// Video CRUD Operations
export const VideoOperations = {
  create: async (videoData: Omit<IVideo, '_id' | 'type' | 'createdAt' | 'updatedAt'>) => {
    return await MenuModel.create({ ...videoData, type: 'video' });
  },

  getAll: async () => {
    return await MenuModel.find({ type: 'video' }).lean() as IVideo[];
  },

  getById: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOne({ _id: id, type: 'video' }).lean() as IVideo | null;
  },

  update: async (id: Types.ObjectId | string, updateData: Partial<Omit<IVideo, '_id' | 'type' | 'createdAt' | 'updatedAt'>>) => {
    return await MenuModel.findOneAndUpdate(
      { _id: id, type: 'video' },
      { $set: updateData },
      { new: true }
    ).lean() as IVideo | null;
  },

  delete: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOneAndDelete({ _id: id, type: 'video' });
  }
};

// Article CRUD Operations
export const ArticleOperations = {
  create: async (articleData: Omit<IArticle, '_id' | 'type' | 'createdAt' | 'updatedAt'>) => {
    return await MenuModel.create({ ...articleData, type: 'article' });
  },

  getAll: async () => {
    return await MenuModel.find({ type: 'article' }).lean() as IArticle[];
  },

  getById: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOne({ _id: id, type: 'article' }).lean() as IArticle | null;
  },

  getByPublisher: async (publisherId: Types.ObjectId | string) => {
    return await MenuModel.find({
      type: 'article',
      'publishedBy._id': publisherId
    }).lean() as IArticle[];
  },

  update: async (id: Types.ObjectId | string, updateData: Partial<Omit<IArticle, '_id' | 'type' | 'createdAt' | 'updatedAt'>>) => {
    return await MenuModel.findOneAndUpdate(
      { _id: id, type: 'article' },
      { $set: updateData },
      { new: true }
    ).lean() as IArticle | null;
  },

  delete: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOneAndDelete({ _id: id, type: 'article' });
  }
};

// Presentation CRUD Operations
export const PresentationOperations = {
  create: async (presentationData: Omit<IPresentation, '_id' | 'type' | 'createdAt' | 'updatedAt'>) => {
    return await MenuModel.create({ ...presentationData, type: 'presentation' });
  },

  getAll: async () => {
    return await MenuModel.find({ type: 'presentation' }).lean() as IPresentation[];
  },

  getById: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOne({ _id: id, type: 'presentation' }).lean() as IPresentation | null;
  },

  getByPresenter: async (presenterId: Types.ObjectId | string) => {
    return await MenuModel.find({
      type: 'presentation',
      'presentatedBy._id': presenterId
    }).lean() as IPresentation[];
  },

  update: async (id: Types.ObjectId | string, updateData: Partial<Omit<IPresentation, '_id' | 'type' | 'createdAt' | 'updatedAt'>>) => {
    return await MenuModel.findOneAndUpdate(
      { _id: id, type: 'presentation' },
      { $set: updateData },
      { new: true }
    ).lean() as IPresentation | null;
  },

  delete: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOneAndDelete({ _id: id, type: 'presentation' });
  }
};

// Imaging CRUD Operations
export const ImagingOperations = {
  create: async (imagingData: Omit<IImaging, '_id' | 'type' | 'createdAt' | 'updatedAt'>) => {
    return await MenuModel.create({ ...imagingData, type: 'imaging' });
  },

  getAll: async () => {
    return await MenuModel.find({ type: 'imaging' }).lean() as IImaging[];
  },

  getById: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOne({ _id: id, type: 'imaging' }).lean() as IImaging | null;
  },

  update: async (id: Types.ObjectId | string, updateData: Partial<Omit<IImaging, '_id' | 'type' | 'createdAt' | 'updatedAt'>>) => {
    return await MenuModel.findOneAndUpdate(
      { _id: id, type: 'imaging' },
      { $set: updateData },
      { new: true }
    ).lean() as IImaging | null;
  },

  delete: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOneAndDelete({ _id: id, type: 'imaging' });
  }
};

// Consent CRUD Operations
export const ConsentOperations = {
  create: async (consentData: Omit<IConsent, '_id' | 'type' | 'createdAt' | 'updatedAt'>) => {
    return await MenuModel.create({ ...consentData, type: 'consent' });
  },

  getAll: async () => {
    return await MenuModel.find({ type: 'consent' }).lean() as IConsent[];
  },

  getById: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOne({ _id: id, type: 'consent' }).lean() as IConsent | null;
  },

  update: async (id: Types.ObjectId | string, updateData: Partial<Omit<IConsent, '_id' | 'type' | 'createdAt' | 'updatedAt'>>) => {
    return await MenuModel.findOneAndUpdate(
      { _id: id, type: 'consent' },
      { $set: updateData },
      { new: true }
    ).lean() as IConsent | null;
  },

  delete: async (id: Types.ObjectId | string) => {
    return await MenuModel.findOneAndDelete({ _id: id, type: 'consent' });
  }
};
