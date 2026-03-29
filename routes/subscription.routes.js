import {Router} from 'express';

const subscriptionRouter = Router ();

subscriptionRouter.post ('/', (req,res)=> res.send (body : {title : 'Create a new subscription'}));
subscriptionRouter.get ('/', (req,res)=> res.send (body : {title : 'Get all subscription details'}));
subscriptionRouter.get ('/:id', (req,res)=> res.send (body : {title : 'Get a subscription details'}));