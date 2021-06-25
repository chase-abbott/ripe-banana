import { Router } from 'express';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';

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
  });
