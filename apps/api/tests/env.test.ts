import { describe, expect, it } from 'vitest';
import { readEnv } from '../src/config/env.js';

describe('configuración de entorno', () => {
  it('permite arrancar localmente sin un archivo .env', () => {
    expect(readEnv({})).toStrictEqual({
      NODE_ENV: 'development',
      HOST: '127.0.0.1',
      PORT: 3000,
      SHUTDOWN_TIMEOUT_MS: 10000,
    });
  });

  it.each(['0', '65536', 'abc', '3000.5', ''])('rechaza un puerto inválido: %s', (port) => {
    expect(() => readEnv({ PORT: port })).toThrow('Configuración inválida: PORT.');
  });

  it('no incluye el valor de configuración inválido en el error', () => {
    expect(() => readEnv({ NODE_ENV: 'valor-privado' })).toThrow(
      'Configuración inválida: NODE_ENV.',
    );
  });
});
