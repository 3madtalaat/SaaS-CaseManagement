export type NodeEnv = 'development' | 'production' | 'test';

export interface AppConfig {
  nodeEnv: NodeEnv;
  port: number;
  apiPrefix: string;
  corsOrigin: string;
  mongodbUri: string;
  mongodbDbName: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  bcryptRounds: number;
  tokenEncryptionKey: string | undefined;
  googleClientId: string | undefined;
  googleClientSecret: string | undefined;
  googleOauthRedirectBase: string;
  gmailPubsubTopic: string | undefined;
  emailPollIntervalMs: number;
  publicAppUrl: string;
  emailFromName: string;
  internalApiKey: string | undefined;
  emailWorkerEnabled: boolean;
  logLevel: string;
}

function readEnvString(key: string, defaultValue?: string): string {
  const v = process.env[key];
  if (v !== undefined && v !== '') return v;
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Missing required environment variable: ${key}`);
}

function readEnvInt(key: string, defaultValue: number): number {
  const raw = process.env[key];
  if (raw === undefined || raw === '') return defaultValue;
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n)) throw new Error(`Invalid integer for ${key}`);
  return n;
}

function readEnvBool(key: string, defaultValue: boolean): boolean {
  const raw = process.env[key];
  if (raw === undefined || raw === '') return defaultValue;
  return raw === '1' || raw.toLowerCase() === 'true';
}

export function loadConfigFromEnv(): AppConfig {
  const rawEnv = process.env.node_env ?? process.env.NODE_ENV ?? 'development';
  const nodeEnv = rawEnv as NodeEnv;
  return {
    nodeEnv,
    port: readEnvInt('port', 3000),
    apiPrefix: readEnvString('api_prefix', '/api/v1'),
    corsOrigin: readEnvString('cors_origin', 'http://localhost:5173'),
    mongodbUri: readEnvString('mongodb_uri', 'mongodb://127.0.0.1:27017/case_management'),
    mongodbDbName: readEnvString('mongodb_db_name', 'case_management'),
    jwtSecret: readEnvString('jwt_secret', 'dev-only-change-me'),
    jwtExpiresIn: readEnvString('jwt_expires_in', '15m'),
    jwtRefreshSecret: readEnvString('jwt_refresh_secret', 'dev-only-change-me'),
    jwtRefreshExpiresIn: readEnvString('jwt_refresh_expires_in', '7d'),
    bcryptRounds: readEnvInt('bcrypt_rounds', 12),
    tokenEncryptionKey: process.env.token_encryption_key,
    googleClientId: process.env.google_client_id,
    googleClientSecret: process.env.google_client_secret,
    googleOauthRedirectBase: readEnvString(
      'google_oauth_redirect_base',
      'http://localhost:3000/api/v1/tenants'
    ),
    gmailPubsubTopic: process.env.gmail_pubsub_topic,
    emailPollIntervalMs: readEnvInt('email_poll_interval_ms', 60_000),
    publicAppUrl: readEnvString('public_app_url', 'http://localhost:5173'),
    emailFromName: readEnvString('email_from_name', 'Case Management'),
    internalApiKey: process.env.internal_api_key,
    emailWorkerEnabled: readEnvBool('email_worker_enabled', true),
    logLevel: readEnvString('log_level', 'info'),
  };
}
