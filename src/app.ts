import cors from 'cors';
import express from 'express';

import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiRouter } from './routes';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.get('/health', (_req: any, res: any) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };


