import path from 'node:path';
import dotenv from 'dotenv';

/**
 * Loads `.env` from the project root when present (non-production).
 */
export function loadEnvFiles(): void {
  if (process.env.node_env === 'production') return;
  const root = path.resolve(process.cwd(), '.env');
  dotenv.config({ path: root });
}
