# Convenciones y entorno de desarrollo

## Organización

- Documentación por fase en `docs/fase_<letra><numero>/`, con letra minúscula (por ejemplo, `docs/fase_a1/` o `docs/fase_b1/`). Documentos generales o independientes de una fase directamente en `docs/`. Aplicar esta convención en tareas futuras aunque el prompt no la repita; al mover documentos, actualizar sus referencias.
- Archivos y carpetas: `kebab-case`; componentes exportados en `PascalCase` (por ejemplo, función `App` en `app.tsx`). Funciones/variables en `camelCase`, tipos e interfaces en `PascalCase`.
- Módulos por capacidad en `apps/api/src/modules`. Controladores traducen HTTP; servicios futuros contendrán reglas; repositorios futuros contendrán acceso a datos. Ninguna capa empresarial debe confiar en un organization_id enviado por el cliente.
- Contratos comunes en shared, sin dependencias de framework, Prisma o infraestructura. No exportar secretos, modelos de persistencia completos o tipos internos indiscriminadamente.
- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` y verificación de símbolos sin usar activos. Evitar `any`; tratar entradas externas como `unknown` hasta validarlas.
- Imports de tipos con `import type`. Extensiones `.js` en imports relativos NodeNext del backend/shared; alias `@/` disponible en la web para A2/shadcn/ui.
- UTF-8, dos espacios, punto y coma y comillas simples conforme a Prettier. `.gitattributes` normaliza LF aunque Git local tenga autocrlf activado.

## Configuración

| Ubicación       | Variable              | Predeterminado          | Uso                                               |
| --------------- | --------------------- | ----------------------- | ------------------------------------------------- |
| `apps/api/.env` | `NODE_ENV`            | `development`           | `development`, `test` o `production`              |
| `apps/api/.env` | `HOST`                | `127.0.0.1`             | Interfaz de escucha de API                        |
| `apps/api/.env` | `PORT`                | `3000`                  | Puerto entero de 1 a 65535                        |
| `apps/api/.env` | `SHUTDOWN_TIMEOUT_MS` | `10000`                 | Cierre, entero de 1 a 60000 ms                    |
| `apps/web/.env` | `WEB_PORT`            | `5173`                  | Puerto de desarrollo Vite                         |
| `apps/web/.env` | `API_PROXY_TARGET`    | `http://127.0.0.1:3000` | Destino HTTP(S) del proxy local, sin credenciales |

Los procesos iniciados con npm workspaces usan el directorio de su workspace. La API carga `.env` con `node --env-file-if-exists=.env`; valores del entorno del proceso prevalecen sobre el archivo. Vite utiliza sus archivos `.env`, `.env.local` y de modo correspondientes; las variables del proceso también prevalecen. No se usa `.env` en la raíz. Reinicia al cambiar configuración.

Los ejemplos pueden versionarse. `.env` y variantes reales, llaves y certificados quedan ignorados. Las variables `VITE_*` se incorporan al código del navegador: solo pueden contener información pública. Configurar una variable en el servidor de una web ya compilada no modifica su bundle; el proxy es configuración de Vite local, no una integración de producción.

npm 11.19.1 controla los scripts de instalación mediante `allowScripts`. Solo se autorizó `esbuild@0.28.2` (verificación de su binario) en el `package.json` del proyecto; no se modificó la configuración global. Si una actualización cambia esa versión, revisa sus scripts y el cambio de autorización junto con el lockfile.

Si 3000 o 5173 están ocupados, identifica y detén tu proceso o configura otros puertos. Vite usa `strictPort` para evitar cambios silenciosos de URL. Las pruebas E2E usan 3000 y 5173 deliberadamente y no reutilizan servidores existentes.

## Pruebas y errores

- Vitest/Supertest: `apps/api/tests/*.test.ts`. La aplicación se crea sin escuchar un puerto fijo; no se conectan bases o GitHub. Se verifican el contrato de salud, 404, ocultamiento de errores y rechazo de configuración inválida.
- Playwright: `tests/e2e/*.spec.ts`. Comprueba HTTP real a través de Vite y el estado de React, fallo recuperable y rechazo de respuesta inesperada. Arranca y limpia los servidores de prueba. Reportes/trazas quedan ignorados.
- `npm run check` es la puerta local/CI para formato, lint, tipos, pruebas de API y compilación. Ejecuta E2E aparte con `npm run test:e2e` tras instalar Chromium.
- Cambios de API deben mantener respuestas JSON y no exponer stack traces. La configuración inválida muestra nombres de variables, sin valores. La validación Zod de entradas de negocio se añadirá con sus módulos; no hay formularios de negocio en A1.
- No afirmar que salud equivale a que las integraciones o los controles de seguridad funcionan. Son verificaciones distintas y corresponden a fases posteriores.

## Git y registro de cambios

La rama base es `main`. Para trabajo posterior se recomiendan ramas `feat/a2-...`, `fix/...` o `docs/...`, revisadas mediante pull request. Usar mensajes descriptivos, idealmente `feat:`, `fix:`, `test:`, `docs:` o `chore:`. Registrar cambios relevantes en `CHANGELOG.md` y decisiones/validaciones en la documentación de fase.

Esta entrega no realiza commits, pushes ni cambios de remotos automáticamente. El workflow solo se ejecutará en GitHub una vez que el propietario publique los archivos y active sus eventos.
