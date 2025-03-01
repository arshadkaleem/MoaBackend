import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import usersController from "../../controllers/users.controller";

const usersRoute = Router();

usersRoute.post('/register', catchAsync(usersController.login));

export default usersRoute;
