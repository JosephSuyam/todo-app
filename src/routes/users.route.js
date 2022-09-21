import { Router } from 'express';
import { updateUser, deactivateUser } from '../controllers/users.js';
import resourceValidator from '../middleware/resourceValidator.js';
import userSchema from '../middleware/resourceSchema/userSchema.js';

const usersRouter = Router();

authRouter.post('/sign-up', resourceValidator(authSchema.signupSchema), addUser);
authRouter.post('/login', resourceValidator(authSchema.loginSchema), login);
authRouter.get('/logout', logout);
usersRouter.put('/update-user', resourceValidator(userSchema.updateUserSchema), updateUser);
usersRouter.delete('/deactivate-user', deactivateUser);

export default usersRouter;