import type { AppConfig } from '../../config/env';

export function createLogger(config: AppConfig) {
  const prefix = `[${config.nodeEnv}]`;
  return {
    info: (msg: string, meta?: Record<string, unknown>) =>
      console.info(prefix, msg, meta ?? ''),
    warn: (msg: string, meta?: Record<string, unknown>) =>
      console.warn(prefix, msg, meta ?? ''),
    error: (msg: string, meta?: Record<string, unknown>) =>
      console.error(prefix, msg, meta ?? ''),
    debug: (msg: string, meta?: Record<string, unknown>) => {
      if (config.logLevel === 'debug') console.debug(prefix, msg, meta ?? '');
    },
  };
}

export type AppLogger = ReturnType<typeof createLogger>;
