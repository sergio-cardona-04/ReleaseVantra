import type { HealthResponse } from '@releasevantra/shared';
import type { RequestHandler } from 'express';

export const getHealth: RequestHandler = (_request, response) => {
  const body: HealthResponse = { status: 'ok' };
  response.set('Cache-Control', 'no-store').status(200).json(body);
};
