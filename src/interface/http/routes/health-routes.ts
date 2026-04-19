import { Router } from 'express';
import type { AppConfig } from '../../../config/env';
import mongoose from 'mongoose';

export function createHealthRouter(config: AppConfig): Router {
  const r = Router();

  r.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'saas-case-management', api_prefix: config.apiPrefix });
  });

  r.get('/health/ready', (_req, res) => {
    const dbState = mongoose.connection.readyState;
    const ready = dbState === 1;
    if (ready) {
      res.json({ status: 'ready', mongodb: 'connected' });
      return;
    }
    res.status(503).json({
      status: 'not_ready',
      mongodb: dbState === 2 ? 'connecting' : 'disconnected',
    });
  });

  return r;
}
