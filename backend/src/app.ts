import express, { type Express } from 'express';
import { piecesJustificativesRouter } from './routes/pieces-justificatives.js';

export function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use(piecesJustificativesRouter);

  return app;
}
