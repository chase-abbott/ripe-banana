import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studios from './controllers/studios.js';
import films from './controllers/films.js';
import reviewers from './controllers/reviewers.js';
import actors from './controllers/actors.js';
import reviews from './controllers/reviews.js';
import './models';

const app = express();

app.use(express.json());
app.use(studios);
app.use(reviewers);
app.use(reviews);
app.use(actors);
app.use(films);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
