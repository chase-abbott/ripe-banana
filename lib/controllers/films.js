import { Router } from 'express';
import Film from '../models/Film.js';
import Studio from '../models/Studio.js';


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

  .get('/api/v1/films', async (req, res, next) => {
    try {
      const films = await Film.findAll({
        attributes: ['id', 'title', 'released'],
        include: {
          model: Studio,
          attributes: ['id', 'name'],
        },
      });
      res.send(films);
    }
    catch (err) {
      next(err);
    }
  })

  ;
