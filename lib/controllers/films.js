import { Router } from 'express';
import Film from '../models/Film.js';


export default Router()
  .post('/api/v1/films', async (req, res, next) => {
    try {
      const film = await Film.create(req.body, {
        include: [{
          association: Film.Studio
        }]
      });
      res.send(film);
    }
    catch (err) {
      next(err);
    }
  })

;
