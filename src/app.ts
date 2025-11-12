import cors from 'cors';
import express from 'express';

import { verifySignatureRouter } from './routes/verifySignature';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/verify-signature', verifySignatureRouter);

export { app };


