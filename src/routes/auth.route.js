import { Router } from 'express';
import { login, logout } from '../controllers/auth.js';
import { addUser } from '../controllers/users.js';
import resourceValidator from '../middleware/resourceValidator.js';
import authSchema from '../middleware/resourceSchema/authSchema.js';

const authRouter = Router();

authRouter.post('/sign-up', resourceValidator(authSchema.signupSchema), addUser);
authRouter.post('/login', resourceValidator(authSchema.loginSchema), login);
authRouter.get('/logout', logout);

export default authRouter;