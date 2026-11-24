import { createApp } from './app.js';
import { readEnv } from './config/env.js';

function main() {
  const config = readEnv();
  const server = createApp().listen(config.PORT, config.HOST, () => {
    console.info(`[api] Escuchando en http://${config.HOST}:${config.PORT}`);
  });

  let shuttingDown = false;

  const shutdown = (signal: NodeJS.Signals) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.info(`[api] ${signal}: cerrando el servidor.`);

    const deadline = setTimeout(() => {
      console.error('[api] Se agotó el plazo de cierre.');
      server.closeAllConnections();
      process.exit(1);
    }, config.SHUTDOWN_TIMEOUT_MS);
    deadline.unref();

    server.close((error) => {
      clearTimeout(deadline);
      if (error) {
        console.error('[api] No se pudo completar el cierre.');
        process.exitCode = 1;
      }
    });
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
  server.on('error', (error: NodeJS.ErrnoException) => {
    console.error(`[api] No se pudo iniciar el servidor (${error.code ?? 'UNKNOWN'}).`);
    process.exitCode = 1;
  });
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : '[api] Error de inicio.');
  process.exitCode = 1;
}
