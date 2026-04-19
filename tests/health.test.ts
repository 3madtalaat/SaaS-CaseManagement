import request from 'supertest';
import { createApp } from '../src/interface/http/create-app';
import { getTestAppConfig } from './helpers/test-app-config';

describe('health routes', () => {
  it('GET /api/v1/health returns ok', async () => {
    const app = createApp(getTestAppConfig());
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok' });
  });
});
