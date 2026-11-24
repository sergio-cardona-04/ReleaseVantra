import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { errorHandler } from '../src/middleware/error-handler.js';

describe('manejo de errores', () => {
  it('oculta mensajes internos y devuelve un error JSON estable', async () => {
    const logger = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const app = express();
    app.get('/fallo', async () => {
      throw new Error('dato-interno-que-no-debe-salir');
    });
    app.use(errorHandler);

    const response = await request(app).get('/fallo');
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: { code: 'INTERNAL_ERROR', message: 'No se pudo completar la solicitud.' },
    });
    expect(JSON.stringify(logger.mock.calls)).not.toContain('dato-interno');
  });
});
