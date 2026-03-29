import { Router } from 'express';

const authRouter = Router();

authRouter.get('/', (req, res) => res.send({ title: 'Auth route is working perfectly 🚀' }));

authRouter.post('/sign-up', (req, res) =>
  res.send({ title: 'Sign up route is working perfectly 🚀'})
);

authRouter.post('/sign-in', (req, res) =>
  res.send({ title: 'Sign in route is working perfectly 🚀' })
);

authRouter.post('/sign-out', (req, res) =>
  res.send({ title: 'Sign out route is working perfectly 🚀' })
);

export default authRouter;