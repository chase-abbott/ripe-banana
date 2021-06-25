import { Router } from 'express';
import Actor from '../models/Actor';

export default Router()
  .post('/api/v1/actors', async (req, res, next) => {
    try {
      const actor = await Actor.create(req.body);
      res.send(actor);
    } catch (err) {
      next(err);
    }

  });


