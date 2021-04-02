import * as express from 'express';
import controllers from './daily.controllers';

const dailyRouter = express.Router();


// /api/daily
dailyRouter
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne);

dailyRouter
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default dailyRouter;
