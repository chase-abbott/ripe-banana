
import { Router } from 'express';
import Film from '../models/Film.js';
import Studio from '../models/Studio.js';

export default Router()
  .post('/api/v1/studios', async (req, res, next) => {
    try{
      const studio = await Studio.create(req.body, {
        include: [{
          association: Studio.Film
        }]
      });
      res.send(studio);
    }
    catch(err){
      next(err);
    }
  })

  .get('/api/v1/studios', async (req, res, next) => {
    try {
      const studio = await Studio.findAll({
        attributes: ['id', 'name']
      });
      res.send(studio);
    } catch (err) {
      next(err);
    }
  })
  .get('/api/v1/studios/:id', async (req, res, next) => {
    try{
      const studio = await Studio.findByPk(req.params.id, {
        attributes: ['id', 'name', 'city', 'state', 'country'],
        include: {
          model: Film,
          attributes: ['id', 'title'],
        },
      });
      res.send(studio);
    }
    catch(err){
      next(err);
    }
  });
