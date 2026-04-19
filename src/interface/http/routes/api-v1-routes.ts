import { Router } from 'express';
import type { AppConfig } from '../../../config/env';
import { createHealthRouter } from './health-routes';

/**
 * Top-level `/api/v1` router. Add feature routers (auth, tenants, cases, …) here.
 */
export function createApiV1Router(config: AppConfig): Router {
  const r = Router();
  r.use(createHealthRouter(config));
  return r;
}
