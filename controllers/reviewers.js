import { Router } from 'express';
import Reviewer from '../lib/models/Reviewer';

export default Router().post('/api/v1/reviewers', (req, res, next) => {
  Reviewer.create(req.body)
    .then((reviewer) => res.send(reviewer))
    .catch(next);
});
