import { Router } from 'express';
import Review from '../models/Review.js';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/api/v1/reviewers', (req, res, next) => {
    Reviewer.create(req.body)
      .then((reviewer) => res.send(reviewer))
      .catch(next);
  })
  .get('/api/v1/reviewers', (req, res, next) => {
    Reviewer.findAll()
      .then((reviewers) => res.send(reviewers))
      .catch(next);
  })
  .get('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.findByPk(req.params.id, {
      include: {
        model: Review,
        attributes: ['id', 'rating', 'review', 'film'],
      },
    })
      .then((reviewer) => res.send(reviewer))
      .catch(next);
  })
  .put('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  });
