import { loadEnvFiles } from './config/load-env';
import { loadConfigFromEnv } from './config/env';
import { connectMongoAsync, disconnectMongoAsync } from './infrastructure/database/mongo-connection';
import { createLogger } from './infrastructure/logging/logger';
import { createApp } from './interface/http/create-app';

async function mainAsync(): Promise<void> {
  loadEnvFiles();
  const config = loadConfigFromEnv();
  const log = createLogger(config);

  await connectMongoAsync(config);
  log.info('MongoDB connected');

  const app = createApp(config);
  const server = app.listen(config.port, () => {
    log.info(`HTTP listening on port ${config.port}`, { api_prefix: config.apiPrefix });
  });

  const shutdown = (signal: string) => {
    log.info(`Received ${signal}, shutting down`);
    server.close(() => {
      void disconnectMongoAsync().then(() => {
        process.exit(0);
      });
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

void mainAsync().catch((err) => {
  console.error(err);
  process.exit(1);
});
