import {Router} from 'express';

const authRouter= Router();

authRouter.post('/sign-up',(req, res)=> res.send(body : {title : 'Sign up route is working perfectly 🚀'}));
authRouter.post('/sign-in',(req, res)=> res.send(body : {title : 'Sign in route is working perfectly 🚀'}));
authRouter.post('/sign-out',(req, res)=> res.send(body : {title : 'Sign out route is working perfectly 🚀'}));

export default authRouter;