import { Router } from 'express';
import Actor from '../models/Actor';
import Film from '../models/Film';

export default Router()
  .post('/api/v1/actors', async (req, res, next) => {
    try {
      const actor = await Actor.create(req.body);
      res.send(actor);
    } catch (err) {
      next(err);
    }
  })
  .get('/api/v1/actors', async (req, res, next) => {
    try {
      const actor = await Actor.findAll({
        attributes: ['id', 'name'],
      });
      res.send(actor);
    } catch (err) {
      next(err);
    }
  })
  .get('/api/v1/actors/:id', async (req, res, next) => {
    try {
      const actor = await Actor.findByPk(req.params.id, {
        attributes: ['name', 'dob', 'pob'],
        include: [
          {
            model: Film,
            attributes: ['id', 'title', 'released'],
          },
        ],
      });
      res.send(actor);
    } catch (err) {
      next(err);
    }
  });
