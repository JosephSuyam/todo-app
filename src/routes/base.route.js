import { Router } from 'express';
import { jwtAuth } from '../middleware/jwtAuth.js';
import authRouter from "./auth.route.js";
import usersRouter from "./users.route.js";
import tasksRouter from "./tasks.route.js";

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/users', jwtAuth, usersRouter);
baseRouter.use('/tasks', jwtAuth, tasksRouter);

export default baseRouter;