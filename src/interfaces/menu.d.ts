import { Document, ObjectId } from 'mongoose';

interface IMenuBase {
  type: 'video' | 'article' | 'presentation' | 'imaging' | 'consent';
  createdAt: Date;
  updatedAt: Date;
}

interface IVideo extends IMenuBase {
  type: 'video';
  _id: ObjectId;
  title: string;
  videoUrl: string;
}

interface IArticle extends IMenuBase {
  type: 'article';
  _id: ObjectId;
  title: string;
  description: string;
  publishedBy: {
    userId: string | null;
    displayName: string | 'Anonymous';
    at: Date;
  };
  articleUrl: string;
}

interface IPresentation extends IMenuBase {
  type: 'presentation';
  _id: ObjectId;
  title: string;
  description: string;
  presentatedBy: {
    userId: string | null;
    displayName: string | 'Anonymous';
    at: Date;
  };
  presentationUrl: string;
}

interface IImaging extends IMenuBase {
  type: 'imaging';
  _id: ObjectId;
  title: string;
  body: string;
  url: string;
}

interface IConsent extends IMenuBase {
  type: 'consent';
  _id: ObjectId;
  title: string;
  url: string;
}


type IMenu = IVideo | IArticle | IPresentation | IImaging | IConsent;
