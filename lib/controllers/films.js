import { Router } from 'express';
import Film from '../models/Film';

<<<<<<< HEAD

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
      const film = await Film.findAll({
        attributes: ['id', 'name']
      });
      res.send(film);
    } catch (err) {
      next(err);
    }
  });

=======
export default Router().post('/api/v1/films', async (req, res, next) => {
  try {
    const film = await Film.create(req.body);
    res.send(film);
  } catch (err) {
    next(err);
  }
});
>>>>>>> 7af5c24ea4cd4530e109908094145f18e0dda0dd
