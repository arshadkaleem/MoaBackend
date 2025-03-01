import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import { IPost } from "../interfaces/posts"
import PostModel from "../models/Post.model";

const addPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    postTitle,
    postedBy = {
      userId: null,
      displayName: 'Anonymous'
    },
    imageUrl,
    postContent,
    isActive = true
  } = req.body as Omit<IPost, '_id' | 'createdAt' | 'updatedAt'>;

  const post = new PostModel({
    postTitle,
    postedBy,
    imageUrl,
    postContent,
    isActive
  });

  await post.save();

  res.status(200).json({
    success: true,
    message: "Post added successfully",
  })
}

const getAllPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const posts = await PostModel.find({}, '-postContent', { lean: true });

  if (!posts) {
    throw createHttpError(404, 'No posts found');
  }

  res.status(200).json({
    success: true,
    data: posts
  })
}


const getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = req.params.id;

  const post = await PostModel.findById(id).lean();

  if (!post) throw createHttpError(404, 'No posts found');

  res.status(200).json({
    success: true,
    data: post
  })
}


const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const {
    postTitle,
    postedBy,
    imageUrl,
    postContent,
    isActive
  } = req.body as Partial<Omit<IPost, '_id' | 'createdAt' | 'updatedAt'>>;

  const id = req.params.id;

  const updatedPost = await PostModel.findByIdAndUpdate(id, {
    postTitle,
    postedBy,
    imageUrl,
    postContent,
    isActive
  }, { new: true });

  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: updatedPost
  })
}


const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const id = req.params.id;

  await PostModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully'
  })
}

export default {
  addPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost
}
