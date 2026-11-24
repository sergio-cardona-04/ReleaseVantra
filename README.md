# ReleaseVantra

Plataforma SaaS B2B multiempresa para gestionar versiones, aprobaciones y ejecuciones controladas de GitHub Actions. El objetivo final es que Astera Digital y FaroWare Systems operen desde una misma URL, con datos aislados, cinco roles y trazabilidad por organización.

**Estado actual: Fase A2 — diseño UX/UI y navegación.** Incluye landing oscura con los tres componentes React Bits suministrados, formularios conceptuales y un prototipo empresarial navegable con datos ficticios de Astera Digital y FaroWare Systems. La API de salud, los contratos y las herramientas de A1 se conservan. Autenticación, persistencia, permisos reales e integración GitHub siguen pendientes.

La landing está en `/`; entra por **«Explorar demostración»** desde `/login` o visita `/app`. En la demostración puedes cambiar organización, rol y plan visual. Los formularios no guardan información ni crean cuentas. Las acciones empresariales abren vistas conceptuales.

## Requisitos

- Node.js **24.10+ de la línea 24**, o **26.x**, con npm **11.x**. `.nvmrc` selecciona la línea 26. Usa un parche mantenido de la línea elegida.
- Git para control de versiones.
- Windows, macOS o Linux. Los comandos npm se ejecutan desde la raíz del repositorio.
- Puertos locales 3000 (API), 5173 (web) y, opcionalmente, 4173 (vista previa).

Docker, PostgreSQL, AWS y credenciales GitHub no son necesarios en A1 ni A2.

## Empezar desde cero

```bash
npm ci
npm run dev
```

Abre **http://127.0.0.1:5173** para ver la landing. En **http://127.0.0.1:5173/app/settings** se comprueba **http://127.0.0.1:5173/api/health**, que Vite redirige al backend **http://127.0.0.1:3000/api/health**. Debe mostrar “API conectada”. La respuesta de salud es:

```json
{ "status": "ok" }
```

`npm run dev` compila primero el paquete compartido y mantiene sus tipos, la API y Vite en modo de desarrollo. `Ctrl+C` detiene los procesos. Un fallo o cierre de uno detiene el resto.

No necesitas crear archivos `.env`. Para personalizar puertos u otros valores, copia opcionalmente `apps/api/.env.example` a `apps/api/.env` y `apps/web/.env.example` a `apps/web/.env`. Si cambias `PORT`, actualiza también `API_PROXY_TARGET`. Reinicia el desarrollo después de cambiar la configuración. Más detalles en [desarrollo](docs/development.md).

## Comandos

| Comando                           | Resultado                                                       |
| --------------------------------- | --------------------------------------------------------------- |
| `npm ci`                          | Instala exactamente las versiones del lockfile                  |
| `npm run dev`                     | Inicia todos los workspaces en desarrollo                       |
| `npm run dev:api`                 | Inicia solo la API                                              |
| `npm run dev:web`                 | Inicia solo Vite                                                |
| `npm run typecheck`               | Verifica shared, API, web y configuración/pruebas E2E           |
| `npm run lint`                    | Ejecuta ESLint sin advertencias permitidas                      |
| `npm run format`                  | Formatea el repositorio con Prettier                            |
| `npm run format:check`            | Verifica formato sin modificar archivos                         |
| `npm test`                        | Ejecuta pruebas HTTP y de configuración con Vitest/Supertest    |
| `npx playwright install chromium` | Instala el navegador de pruebas, una vez por entorno            |
| `npm run test:e2e`                | Verifica en Chromium la pantalla, proxy, errores y recuperación |
| `npm run build`                   | Compila shared, API y web, en ese orden                         |
| `npm run check`                   | Ejecuta formato, lint, tipos, pruebas de API y compilación      |
| `npm run start:api`               | Ejecuta la API compilada; requiere `npm run build` previo       |
| `npm run preview:web`             | Sirve el frontend compilado en http://127.0.0.1:4173            |

Las pruebas E2E arrancan y detienen sus propios servidores en 3000 y 5173. Detén antes `npm run dev`; la prueba se niega a reutilizar procesos ajenos. En Linux CI, `npx playwright install --with-deps chromium` prepara también las dependencias del sistema.

Para comprobar los artefactos compilados, ejecuta `npm run build`, después `npm run start:api` en una terminal y `npm run preview:web` en otra. Vite preview incluye un proxy local; no es un servidor de producción.

## Stack

| Área            | Preparado en A1 y A2                                                | Reservado para después                            |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| Monorepositorio | npm workspaces + TypeScript estricto                                | —                                                 |
| Frontend        | React 19, Vite 8, Tailwind CSS 4, Router, Radix, shadcn/ui y Lucide | Conexión empresarial con APIs en A10              |
| Backend         | Node.js, Express 5, REST, Zod 4 para configuración                  | Servicios de negocio y validación de sus entradas |
| Contratos       | `@releasevantra/shared`                                             | Entidades y esquemas de negocio                   |
| Calidad         | ESLint 10, Prettier 3, Vitest 5, Supertest 7, Playwright            | Pruebas empresariales y seguridad                 |
| Persistencia    | Ninguna                                                             | Prisma, PostgreSQL, DynamoDB, Outbox y jobs       |
| Integraciones   | Ninguna                                                             | GitHub App + Octokit y webhooks                   |
| Infraestructura | CI de verificación                                                  | Docker Compose en A3; AWS en tarea B              |

TypeScript está fijado en **6.0.3** por compatibilidad con `typescript-eslint` 8.74.0; las versiones exactas están en los manifiestos y `package-lock.json`.

## Arquitectura y estructura

```text
ReleaseVantra/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/          # Validación del entorno
│   │   │   ├── middleware/      # Errores HTTP y rutas inexistentes
│   │   │   ├── modules/health/  # Router y controlador de salud
│   │   │   ├── app.ts           # Aplicación sin abrir puertos
│   │   │   └── server.ts        # Arranque y cierre ordenado
│   │   └── tests/              # Pruebas HTTP/configuración
│   └── web/
│       └── src/
│           ├── components/     # UI compartida y React Bits
│           ├── layouts/        # Áreas pública y empresarial
│           ├── mocks/          # Datos tipados de demostración
│           ├── pages/          # Rutas públicas y módulos empresariales
│           ├── lib/            # Cliente HTTP, navegación y utilidades
│           ├── app.tsx         # Router público y empresarial
│           ├── main.tsx        # Entrada React
│           └── styles.css      # Tokens, responsive y Tailwind; base mínima
├── packages/shared/src/        # Contrato HealthResponse
├── tests/e2e/                  # Comunicación real web/API y errores
├── docs/                       # Documentos generales y carpetas por fase
│   ├── fase_a1/                # Arquitectura inicial e informe A1
│   ├── fase_a2/                # Acuerdo, implementación y evidencia A2
│   ├── development.md          # Convenciones generales
│   └── requirements.md         # Requisitos y alcance de todas las fases
├── scripts/                    # Notificación Windows solicitada
├── .github/workflows/ci.yml    # Verificaciones, sin despliegues
├── package.json
├── package-lock.json
└── tsconfig*.json
```

El backend es un monolito modular. La web presenta información y consulta la API; el servidor será responsable de validaciones, permisos y aislamiento en fases posteriores. El paquete compartido no depende de React ni de Express. No se crean directorios vacíos para funcionalidades futuras.

## Documentación y siguiente fase

- [Arquitectura y decisiones A1](docs/fase_a1/architecture.md).
- [Convenciones y configuración](docs/development.md).
- [Referencias, requisitos y alcance por fase](docs/requirements.md).
- [Informe de implementación y verificaciones A1](docs/fase_a1/a1-report.md).
- [Diseño, componentes y rutas A2](docs/fase_a2/implementation.md).
- [Informe de implementación y verificaciones A2](docs/fase_a2/a2-report.md).
- [Avisos de terceros](docs/third-party-notices.md).
- [Registro de cambios](CHANGELOG.md).

Los documentos de cada fase se guardan en `docs/fase_<letra><numero>/`, por ejemplo, `docs/fase_a1/` o `docs/fase_b1/`. Los documentos generales o independientes de una fase se guardan directamente en `docs/`. Esta convención se aplica también a la documentación futura.

A2 incorpora UX/UI, navegación, shadcn/ui, Radix y Lucide sobre la base React/Tailwind y el alias `@/`. A3 incorporará el modelo de datos y contenedores cuando se autorice. Autenticación/RBAC, negocio, GitHub, auditoría y la infraestructura AWS se implementarán en sus fases autorizadas. La aplicación PaaS será un proyecto independiente.

El workflow de CI comprueba instalación, formato, lint, tipos, pruebas y compilación en Node 24 y 26. No despliega, no usa secretos y es independiente de los workflows futuros de clientes. Su ejecución remota requiere publicar el repositorio por una acción posterior del propietario.

La notificación de finalización solicitada usa una ventana de Windows y se puede repetir con `powershell.exe -NoProfile -STA -File scripts/notify-completion.ps1`. No se instala una tarea programada ni se cambia la configuración del sistema.
