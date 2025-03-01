import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import usersController from "../../controllers/users.controller";
import { validateJoi } from "../../utils/validateJoi";
import postController from "../../controllers/post.controller";
import postValidator from "../../validators/post.validator";

const postsRoute = Router();

// Create Post
postsRoute.post('/', validateJoi(postValidator.postJoiSchema), catchAsync(postController.addPost));
// Get Posts
postsRoute.get('/', catchAsync(postController.getAllPost));
// Get Post by ID
postsRoute.get('/:id', catchAsync(postController.getPostById));
// Update Post
postsRoute.put('/:id', validateJoi(postValidator.updatePostJoiSchema), catchAsync(postController.updatePost));
// Delete Post
postsRoute.delete('/:id', catchAsync(postController.deletePost));

export default postsRoute;
