import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studioContoller from '../controllers/studios.js';

const app = express();

app.use(express.json());
app.use(studioContoller);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
