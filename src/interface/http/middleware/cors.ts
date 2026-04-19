import type { AppConfig } from '../../../config/env';
import type { RequestHandler } from 'express';

export function createCorsMiddleware(config: AppConfig): RequestHandler {
  return (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.corsOrigin);
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Tenant-Id'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  };
}
