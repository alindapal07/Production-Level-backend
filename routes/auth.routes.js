import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';
import { verifyEmail } from '../controllers/user.emailVerify.controller.js';

const authRouter = Router();

authRouter.get('/', (req, res) => 
  res.send({ title: 'Auth route is working perfectly 🚀' })
);

//  Auth routes
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

//  Email verification route (IMPORTANT: This should be a GET route since it's accessed via email link)
authRouter.get('/verify-email/:token', verifyEmail);

export default authRouter;