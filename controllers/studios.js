
import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/api/v1/studios', async (req, res, next) => {
    try{
      const studio = await Studio.create(req.body);
      res.send(studio);
    }
    catch(err){
      next(err);
    }
  });
