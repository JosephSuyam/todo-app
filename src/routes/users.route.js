import { Router } from 'express';
import { updateUser, deactivateUser } from '../controllers/users.js';
import resourceValidator from '../middleware/resourceValidator.js';
import userSchema from '../middleware/resourceSchema/userSchema.js';

const usersRouter = Router();

usersRouter.put('/update-user', resourceValidator(userSchema.updateUserSchema), updateUser);
usersRouter.delete('/deactivate-user', deactivateUser);

export default usersRouter;