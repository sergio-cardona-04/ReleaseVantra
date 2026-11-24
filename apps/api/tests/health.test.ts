import type { HealthResponse } from '@releasevantra/shared';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

describe('GET /api/health', () => {
  it('devuelve 200 y el contrato público sin exponer configuración', async () => {
    const response = await request(createApp()).get('/api/health');
    const expected: HealthResponse = { status: 'ok' };

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.headers['cache-control']).toBe('no-store');
    expect(response.headers).not.toHaveProperty('x-powered-by');
    expect(response.body).toStrictEqual(expected);
  });

  it('responde 404 JSON en rutas desconocidas', async () => {
    const response = await request(createApp()).get('/api/no-existe');
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      error: { code: 'NOT_FOUND', message: 'Ruta no encontrada.' },
    });
  });
});
