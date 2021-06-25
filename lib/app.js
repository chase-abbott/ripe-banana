import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studioContoller from './controllers/studios.js';
import filmContoller from './controllers/films.js';
import reviewers from './controllers/reviewers.js';
import actorController from './controllers/actors.js';

const app = express();

app.use(express.json());
app.use(studioContoller);

app.use(reviewers);
app.use(actorController);
app.use(filmContoller);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
