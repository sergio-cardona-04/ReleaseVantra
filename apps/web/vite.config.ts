import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const port = Number(env.WEB_PORT ?? 5173);
  const target = env.API_PROXY_TARGET ?? 'http://127.0.0.1:3000';
  const targetUrl = new URL(target);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('WEB_PORT debe ser un entero entre 1 y 65535.');
  }
  if (
    !['http:', 'https:'].includes(targetUrl.protocol) ||
    targetUrl.username ||
    targetUrl.password
  ) {
    throw new Error('API_PROXY_TARGET debe ser una URL HTTP(S) sin credenciales.');
  }

  const proxy = { '/api': { target, changeOrigin: true } };

  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: { host: '127.0.0.1', port, strictPort: true, proxy },
    preview: { host: '127.0.0.1', port: 4173, strictPort: true, proxy },
  };
});
