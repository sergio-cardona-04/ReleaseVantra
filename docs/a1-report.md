# Informe de entrega — Fase A1

Fecha de referencia: **24 de noviembre de 2026**, zona del usuario America/Mexico_City.

## 1. Resumen de implementación

Se preparó una base local funcional de ReleaseVantra en `C:\Users\checo\source\ReleaseVantra`, partiendo de un repositorio vacío con Git ya inicializado. Se revisaron el prompt y los tres PDF entregados, incluido el documento original del profesor recibido durante la revisión. No se encontraron impedimentos para el alcance A1.

La entrega incorpora npm workspaces, frontend introductorio React/Vite/Tailwind, backend Express, contrato compartido de salud, entorno configurable sin secretos, manejo de errores y cierre ordenado, herramientas de calidad, pruebas y CI. El script de notificación Windows es una petición adicional del usuario y no forma parte del dominio SaaS.

No se desarrollaron funciones empresariales ni A2, bases de datos, GitHub App, AWS o la aplicación PaaS. No se hicieron commits, pushes ni despliegues.

## 2. Estructura final del repositorio

```text
ReleaseVantra/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/env.ts
│   │   │   ├── middleware/error-handler.ts
│   │   │   ├── modules/health/
│   │   │   │   ├── health.controller.ts
│   │   │   │   └── health.routes.ts
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── tests/{env,errors,health}.test.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.build.json
│   │   └── vitest.config.ts
│   └── web/
│       ├── src/
│       │   ├── lib/health.ts
│       │   ├── app.tsx
│       │   ├── main.tsx
│       │   └── styles.css
│       ├── .env.example
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── packages/shared/
│   ├── src/index.ts
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   ├── architecture.md
│   ├── development.md
│   ├── requirements.md
│   └── a1-report.md
├── tests/e2e/intro.spec.ts
├── scripts/notify-completion.ps1
├── .github/workflows/ci.yml
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── CHANGELOG.md
├── README.md
├── eslint.config.js
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.base.json
└── tsconfig.tools.json
```

`apps` contiene los procesos web/API; `packages/shared` comparte contratos sin framework; `docs` guarda decisiones y resultados; `tests/e2e` verifica la comunicación desde el navegador; `.github` contiene únicamente CI. Los directorios generados `node_modules`, `dist` y resultados de pruebas están ignorados y se omiten del árbol.

## 3. Archivos creados o modificados

Todos los archivos de la entrega son nuevos, salvo la metadata Git preexistente, que se conservó.

| Grupo                                       | Propósito                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Manifiestos raíz/workspaces y lockfile      | Dependencias privadas, enlaces entre paquetes y scripts reproducibles                    |
| `tsconfig*.json`                            | Tipado estricto, resolución ESM y compilación separada de código/pruebas                 |
| ESLint/Prettier/EditorConfig/Git attributes | Convenciones y finales de línea consistentes                                             |
| `apps/api/src`                              | Creación de app, entorno validado, router/controlador, 404/500 JSON y ciclo del servidor |
| `apps/web/src` e `index.html`               | Pantalla A1 accesible, estado real de conexión y reintento                               |
| `vite.config.ts`                            | React, Tailwind, alias `@/`, puertos y proxy local/preview                               |
| `packages/shared/src/index.ts`              | Contrato `HealthResponse` consumido por API y web                                        |
| `.env.example` y `.gitignore`               | Configuración documentada y exclusión de archivos privados/generados                     |
| Pruebas Vitest/Supertest/Playwright         | Salud, errores, configuración y comportamiento web/API                                   |
| `.github/workflows/ci.yml`                  | Instalación, calidad, compilación y E2E; permisos de lectura, sin despliegue             |
| README, CHANGELOG y documentos              | Inicio desde cero, alcance, decisiones, convenciones y evidencia                         |
| Script PowerShell                           | Ventana local de trabajo terminado, sin tareas programadas ni cambios del sistema        |

## 4. Dependencias y entorno

| Herramienta                | Versión utilizada |
| -------------------------- | ----------------- |
| Node.js local              | 26.10.0           |
| npm local / fijado para CI | 11.19.1           |
| TypeScript                 | 6.0.3             |
| React / React DOM          | 19.3.1            |
| Vite / plugin React        | 8.3.8 / 6.3.0     |
| Tailwind CSS / plugin Vite | 4.3.5             |
| Express                    | 5.3.0             |
| Zod                        | 4.6.7             |
| Vitest                     | 5.1.1             |
| Supertest                  | 7.3.2             |
| Playwright                 | 1.65.1            |
| ESLint / typescript-eslint | 10.15.0 / 8.74.0  |
| Prettier                   | 3.10.1            |
| concurrently               | 10.0.7            |
| tsx                        | 4.23.15           |

`concurrently` coordina los tres procesos de desarrollo y `tsx` ejecuta la API TypeScript durante el desarrollo. Son utilidades pequeñas para el entorno local; la API compilada no las necesita en ejecución. Los demás paquetes auxiliares son tipos y plugins de las herramientas aprobadas. No se instalaron Prisma, AWS SDK, Octokit, Docker ni shadcn/ui prematuramente.

Se eligió TypeScript 6.0.3 porque la versión 7.0.2 disponible excede el rango admitido por `typescript-eslint` 8.74.0 (`<6.1.0`). No se actualizaron Node/npm globales. La autorización de instalación de `esbuild@0.28.2` está limitada al manifiesto del proyecto.

El workflow usa versiones de `actions/checkout` y `actions/setup-node` fijadas a sus SHA de la línea v7, verificados contra sus repositorios oficiales. El job configura Node 24/26 y npm 11.19.1, con `contents: read` y sin persistir credenciales de checkout.

## 5. Comandos exactos

Desde la raíz:

```bash
npm ci
npm run dev
```

Abrir `http://127.0.0.1:5173`. Para calidad y compilación:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run format:check
```

El conjunto anterior se agrupa en `npm run check`. Para pruebas de navegador, con 3000 y 5173 libres:

```bash
npx playwright install chromium
npm run test:e2e
```

Para comprobar la salida compilada:

```bash
npm run build
npm run start:api
```

En otra terminal: `npm run preview:web`, y abrir `http://127.0.0.1:4173`. Detalles de variables, puertos y comandos individuales en README y `docs/development.md`.

## 6. Pruebas y resultados obtenidos

Ejecución real en Windows con Node 26.10.0/npm 11.19.1:

| Comprobación ejecutada                      | Resultado                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `npm install`                               | Dependencias instaladas y lockfile generado; auditoría sin vulnerabilidades          |
| `npm ci`                                    | Reinstalación reproducible correcta; auditoría sin vulnerabilidades                  |
| `npm ls --depth=0`                          | Workspaces enlazados y dependencias sin errores                                      |
| `npm run format:check`                      | Correcto                                                                             |
| `npm run lint`                              | Correcto, cero advertencias                                                          |
| `npm run typecheck`                         | Correcto en shared, API, web y herramientas/E2E                                      |
| `npm test`                                  | **10 pruebas aprobadas**, 3 archivos                                                 |
| `npm run build`                             | Shared, API y web compilados correctamente                                           |
| `npm run check`                             | Secuencia completa aprobada                                                          |
| `npx playwright install chromium`           | Navegador instalado correctamente tras reintentar                                    |
| `npm run test:e2e`                          | **3 pruebas aprobadas** en Chromium                                                  |
| `npm run dev`                               | Arranque conjunto real desde la raíz, sin `.env`                                     |
| HTTP directo y proxy de desarrollo          | API 3000 y proxy 5173 devolvieron 200 y `{ "status": "ok" }`                         |
| Inspección visual Chromium                  | Escritorio 1365×900 y móvil 375×812; pantalla legible, sin desbordamiento horizontal |
| `npm run start:api` y `npm run preview:web` | API compilada, HTML compilado y proxy 4173 devolvieron 200                           |
| `git check-ignore`                          | `.env`, llaves, dist y dependencias quedan excluidos                                 |
| Búsqueda de patrones de credenciales        | Sin coincidencias de tokens GitHub, claves AWS o llaves privadas en archivos fuente  |

Las pruebas HTTP verificaron salud sin información adicional, cabeceras JSON/no-store, 404 controlado y error 500 sin datos internos. Las de configuración verificaron valores predeterminados y rechazo de puertos inválidos sin revelar valores. E2E verificó React/proxy/API reales, fallo HTTP con recuperación y rechazo de un JSON que incumple el contrato.

Se corrigieron dos errores de tipos de la configuración inicial E2E: una propiedad opcional con `undefined` incompatible con `exactOptionalPropertyTypes`, y la ausencia de tipos DOM en el proyecto de herramientas. El primer intento de instalar Chromium sufrió un reinicio de conexión y después coincidió con la reinstalación de dependencias; se repitió tras finalizar `npm ci` y terminó correctamente. No quedan fallos de las verificaciones ejecutadas.

**Límites de la evidencia:** CI está preparado, pero no se ejecutó en GitHub porque no se publicaron cambios. Node 24 y Linux se configuran como matriz de CI, pero no se probaron localmente. El código incluye cierre ordenado por señales y plazo; el terminal automatizado no entregó Ctrl+C como señal verificable en Windows, por lo que se cerraron únicamente los procesos propios de verificación mediante limpieza del sistema. No se declara una prueba real de drenaje de conexiones por señales. Los controles de seguridad y las pruebas P01–P11 quedan pendientes de sus fases.

## 7. Decisiones arquitectónicas y ajustes

Se respetó la estructura propuesta `apps/web`, `apps/api`, `packages/shared`, `docs` y `.github`. La API se organiza por módulos, con configuración y middlewares comunes; no se añadieron servicios, repositorios o workers vacíos. Su ubicación futura y responsabilidades están documentadas para mantener un monolito viable en una EC2 pequeña.

Shared se compila antes de consumirlo para resolver declaraciones de tipos en desarrollo, pruebas y producción. El proxy mantiene el mismo origen local sin abrir CORS. La pantalla valida la respuesta en ejecución, distingue espera/error/éxito y limita la espera de red. `app.ts` se separa del arranque para pruebas aisladas. Playwright se limita a la pantalla A1.

La equivalencia de los roles docentes con los del plan, el uso de `/api/health` para este SaaS y la separación de la aplicación PaaS se documentaron en `docs/requirements.md`. No se alteraron reglas de negocio o modelos aprobados.

## 8. Estado de la Fase A1

| Criterio                                     | Estado                                                            |
| -------------------------------------------- | ----------------------------------------------------------------- |
| Monorepositorio funcional                    | Cumplido                                                          |
| Arranque React y Express                     | Cumplido                                                          |
| `/api/health` HTTP 200                       | Cumplido                                                          |
| Consulta local desde frontend                | Cumplido, verificada en navegador                                 |
| Contratos compartidos                        | Cumplido, usados por API y web                                    |
| Scripts y configuración documentados         | Cumplido                                                          |
| ESLint, TypeScript y pruebas                 | Cumplido                                                          |
| GitHub Actions CI básico                     | Configurado; ejecución remota pendiente de publicación autorizada |
| Sin secretos en los archivos de entrega      | Revisión sin hallazgos; archivos sensibles ignorados              |
| README reproducible desde cero               | Cumplido, con `npm ci` comprobado                                 |
| Respeto del plan y alcance                   | Cumplido: solo A1 y aviso local solicitado                        |
| Sin AWS, commits, pushes o fases posteriores | Cumplido                                                          |

**A1 implementada y validada localmente.** No quedan pendientes funcionales de su alcance. Los límites de validación son CI remoto, otros sistemas/runtimes y drenaje real por señales desde el terminal automatizado. La actualización futura a TypeScript 7 requiere revisar la compatibilidad del analizador ESLint. La aplicación todavía no está preparada para usuarios reales ni publicación productiva: sus controles empresariales pertenecen a fases posteriores.

## 9. Preparación de la Fase A2

React/TypeScript, Tailwind 4, alias `@/`, entrada SPA y estructura separada del cliente HTTP quedan listos para incorporar el sistema de diseño y shadcn/ui. La pantalla actual es exclusivamente introductoria. No se definieron identidad visual definitiva, navegación empresarial, dashboards o formularios.

A2 deberá revisar las referencias visuales que se proporcionen y definir UX/UI y recorridos de roles antes de implementar el frontend funcional completo. Esta entrega no inicia esa fase.
