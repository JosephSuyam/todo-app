import { Router } from 'express';
import { getTasks, fetchTask, addTask, updateTask, setTaskStatus } from '../controllers/tasks.js';
import resourceValidator from '../middleware/resourceValidator.js';
import taskSchema from '../middleware/resourceSchema/taskSchema.js';

const tasksRouter = Router();

tasksRouter.get('/get-tasks', getTasks);
tasksRouter.get('/get-tasks/:task_id', fetchTask);
tasksRouter.post('/add-task', resourceValidator(taskSchema.addTaskSchema), addTask);
tasksRouter.put('/update-task/:task_id', resourceValidator(taskSchema.addTaskSchema), updateTask);
tasksRouter.patch('/set-status/:task_id', resourceValidator(taskSchema.setTaskStatusSchema), setTaskStatus);

export default tasksRouter;