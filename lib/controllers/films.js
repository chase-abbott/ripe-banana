import { Router } from 'express';
import Film from '../models/Film';

export default Router().post('/api/v1/films', async (req, res, next) => {
  try {
    const film = await Film.create(req.body);
    res.send(film);
  } catch (err) {
    next(err);
  }
})
  .get('/api/v1/films', async (req, res, next) => {
    try {
      const film = await Film.findAll({
        attributes: ['id', 'title']
      });
      res.send(film);
    } catch (err) {
      next(err);
    }
  });
