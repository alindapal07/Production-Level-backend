import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.post('/', (req, res) =>
  res.json({ title: 'Create a new subscription' })
);

subscriptionRouter.get('/', (req, res) =>
  res.json({ title: 'Get all subscription details' })
);

subscriptionRouter.get('/:id', (req, res) =>
  res.json({ title: 'Get a subscription details' })
);

subscriptionRouter.put('/:id', (req, res) =>
  res.json({ title: 'Update a subscription details' })
);

subscriptionRouter.delete('/:id', (req, res) =>
  res.json({ title: 'Delete a subscription details' })
);

subscriptionRouter.get('/user/:userId', (req, res) =>
  res.json({ title: 'Get subscriptions for a user' })
);

subscriptionRouter.post('/user/:userId', (req, res) =>
  res.json({ title: 'Create a subscription for a user' })
);

subscriptionRouter.get('/plan/:planId', (req, res) =>
  res.json({ title: 'Get subscriptions for a plan' })
);

export default subscriptionRouter;