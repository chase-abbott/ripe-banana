import { Router } from 'express';
import Film from '../models/Film.js';
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
      attributes: ['id', 'name', 'company'],
      include: {
        model: Review,
        attributes: ['id', 'rating', 'review'],
        include: {
          model: Film,
          attributes: ['id', 'title'],
        },
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
  })
  .delete('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.findByPk(req.params.id)
      .then((reviewer) => {
        if (reviewer.hasReviews()) {
          Promise.reject('cannot delete reviewer');
        } else {
          Reviewer.destroy({ where: { id: req.params.id } });
        }
      })
      .then((numRows) => res.send({ numRows }))
      .catch(next);
  });
