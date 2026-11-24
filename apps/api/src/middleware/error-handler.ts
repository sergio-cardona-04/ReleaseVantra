import type { ErrorRequestHandler, RequestHandler } from 'express';

export const notFound: RequestHandler = (_request, response) => {
  response.status(404).json({
    error: { code: 'NOT_FOUND', message: 'Ruta no encontrada.' },
  });
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  // No imprimir objetos de error ni cuerpos de petición: pueden incluir datos sensibles.
  console.error('[api] Error HTTP no controlado.');
  response.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'No se pudo completar la solicitud.' },
  });
};
