import express from 'express';
import type { AppConfig } from '../../config/env';
import { createCorsMiddleware } from './middleware/cors';
import { createApiV1Router } from './routes/api-v1-routes';

export function createApp(config: AppConfig): express.Application {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));
  app.use(createCorsMiddleware(config));
  app.use(config.apiPrefix, createApiV1Router(config));
  return app;
}
