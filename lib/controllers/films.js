import { Router } from 'express';
import Actor from '../models/Actor';
import Film from '../models/Film';
import Review from '../models/Review';
import Reviewer from '../models/Reviewer';
import Studio from '../models/Studio';

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
  })
  .get('/api/v1/films/:id', async (req, res, next) => {
    try{
      const film = await Film.findByPk(req.params.id, {
        attributes: ['title', 'released'],
        include: [{
          model: Studio,
          attributes: ['id', 'name']
        },
        {
          model: Actor,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: Review,
          attributes: ['id', 'rating', 'review'],
          include: {
            model: Reviewer,
            attributes: ['id', 'name']
          }
        }]
      });
      res.send(film);
    }
    catch(err){
      next(err);
    }
  });
