import { Router } from 'express';
import Film from '../models/film.js';
import Studio from '../models/Studio.js';

export default Router()
  .post('/api/v1/films', async (req, res, next) => {
    try {
      const film = await Film.create(req.body);
      res.send(film);
    }
    catch (err) {
      next(err);
    }
  })

  ;
