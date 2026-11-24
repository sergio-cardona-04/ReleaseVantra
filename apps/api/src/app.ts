import express from 'express';
import { errorHandler, notFound } from './middleware/error-handler.js';
import { healthRouter } from './modules/health/health.routes.js';

/** Construye la aplicación sin abrir puertos ni conectar dependencias externas. */
export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use('/api', healthRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
