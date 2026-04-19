import type { AppConfig } from '../../src/config/env';

/**
 * Stable AppConfig for HTTP tests (no env file required).
 */
export function getTestAppConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    nodeEnv: 'test',
    port: 0,
    apiPrefix: '/api/v1',
    corsOrigin: 'http://localhost:5173',
    mongodbUri: 'mongodb://127.0.0.1:27017/case_management_test',
    mongodbDbName: 'case_management_test',
    jwtSecret: 'test-jwt-secret',
    jwtExpiresIn: '15m',
    jwtRefreshSecret: 'test-refresh-secret',
    jwtRefreshExpiresIn: '7d',
    bcryptRounds: 4,
    tokenEncryptionKey: undefined,
    googleClientId: undefined,
    googleClientSecret: undefined,
    googleOauthRedirectBase: 'http://localhost:3000/api/v1/tenants',
    gmailPubsubTopic: undefined,
    emailPollIntervalMs: 60_000,
    publicAppUrl: 'http://localhost:5173',
    emailFromName: 'Case Management Test',
    internalApiKey: undefined,
    emailWorkerEnabled: false,
    logLevel: 'error',
    ...overrides,
  };
}
