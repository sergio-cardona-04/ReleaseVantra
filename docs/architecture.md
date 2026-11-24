# Arquitectura inicial — A1

## Decisiones implementadas

1. **npm workspaces** con `apps/web`, `apps/api` y `packages/shared`. Un único lockfile, paquetes privados y versiones explícitas. No se necesita un orquestador de monorepositorios adicional.
2. **Monolito modular** Express. `app.ts` compone middlewares y rutas sin abrir puertos; `server.ts` valida configuración, escucha y maneja SIGINT/SIGTERM. Esto permite Supertest sin servicios externos y un futuro despliegue sencillo en una EC2 pequeña.
3. **ES Modules** en todo el repositorio. API y shared usan resolución TypeScript NodeNext y extensiones `.js` en imports relativos del backend; Vite usa resolución Bundler.
4. **Contrato compilado** en shared: `HealthResponse`, sin entidades de negocio. Sus declaraciones y módulo ESM se generan en `dist`; la raíz garantiza compilarlo antes de sus consumidores. Los imports son `import type` cuando no hay valores en ejecución.
5. **Frontend mínimo** React/Vite/Tailwind. Un cliente HTTP comprueba el JSON recibido, maneja cancelación y un plazo de cinco segundos, y permite reintentar un fallo. Compartir tipos no sustituye validar respuestas en ejecución.
6. **Mismo origen en desarrollo** mediante el proxy `/api` de Vite. No se añade CORS abierto. Preview tiene el mismo proxy solo para verificar compilaciones locales; producción necesitará la configuración de origen/rutas de tarea B.
7. **Configuración validada al arrancar** con Zod para la API y validación de puerto/URL para Vite. Valores predeterminados locales; archivos `.env` opcionales y excluidos de Git. Node carga el `.env` sin instalar dotenv.
8. **Calidad** con TypeScript estricto, ESLint flat config y Prettier. `concurrently` únicamente coordina y detiene procesos de desarrollo; `tsx` ejecuta TypeScript en la API local. Producción ejecutará JavaScript compilado con Node.

## Responsabilidades y evolución

| Capa          | Ubicación actual                                              | Evolución prevista, sin implementar                                    |
| ------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| HTTP          | `apps/api/src/modules/health/*.routes.ts` y `*.controller.ts` | Router/controlador de cada módulo                                      |
| Dominio       | No requerido para salud                                       | `*.service.ts` junto al módulo, transacciones y reglas                 |
| Datos         | No requerido                                                  | Repositorios por módulo; cliente Prisma y contexto transaccional común |
| Validación    | `config/env.ts`                                               | Esquemas Zod de entradas por módulo                                    |
| Middlewares   | `middleware/error-handler.ts`                                 | Identidad, contexto, RBAC, CSRF y límites                              |
| Integraciones | No requerido                                                  | Adaptadores GitHub y DynamoDB desacoplados de HTTP                     |
| Tareas        | No requerido                                                  | Workers y jobs persistidos, en la misma EC2                            |
| Presentación  | `apps/web/src`                                                | Componentes, rutas y funciones por módulo según A2                     |
| Contratos     | `packages/shared/src`                                         | Tipos/esquemas públicos sin credenciales ni ORM                        |

No hay capas de servicios o repositorios ficticias, inyección de dependencias, microservicios ni mensajería. Salud no tiene lógica de negocio ni acceso a datos que justifique esas capas ahora.

## Contrato HTTP implementado

`GET /api/health` responde `200`, `Content-Type: application/json`, `Cache-Control: no-store` y exactamente `{ "status": "ok" }`. Es una comprobación del proceso HTTP. No mide PostgreSQL, DynamoDB, GitHub, autenticación ni disponibilidad integral. No devuelve variables, versión del runtime, rutas locales ni credenciales.

Las rutas desconocidas devuelven `404` con `{ "error": { "code": "NOT_FOUND", "message": "Ruta no encontrada." } }`. Un error inesperado devuelve `500` con `INTERNAL_ERROR` y un mensaje genérico. El middleware no registra el error original o el cuerpo de la petición. La API desactiva `X-Powered-By`.

El cierre deja de aceptar conexiones y permite finalizar peticiones activas hasta `SHUTDOWN_TIMEOUT_MS`; si vence el plazo, cierra conexiones y sale con código 1. El servidor informa fallos de escucha mediante su código de error, sin revelar el objeto completo. Windows admite Ctrl+C para cierre interactivo; terminar a la fuerza un proceso desde el sistema operativo no garantiza ejecutar estos manejadores.

## Restricciones aprobadas para fases posteriores

Estas decisiones del plan v1.1 se preservan como requisitos, no como controles ya disponibles:

- Infraestructura compartida con organización obtenida de sesión y membresía verificadas. Aislamiento aplicado en servidor, FKs compuestas y RLS PostgreSQL, con denegación sin contexto.
- PostgreSQL como fuente de verdad; 26 tablas, Prisma y SQL adicional para políticas y restricciones en A3 y posteriores.
- DynamoDB para auditoría por organización, con PK `ORG#<uuid>` y orden temporal; Transactional Outbox escrito junto con la operación SQL y publicación idempotente por worker.
- Sesiones propias mediante cookies seguras, hashes Argon2id, protección CSRF y cinco roles. No almacenar tokens de sesión en localStorage.
- GitHub App con permisos mínimos, tokens temporales, validación de instalaciones/repositorios y HMAC de webhooks. Sin tokens personales.
- Jobs persistentes para dispatch/conciliación; los resultados inciertos no se reintentan ciegamente. Snapshot de políticas, idempotencia, cuotas transaccionales y verificación de commit aprobado.
- Planes simulados Team, Business y Enterprise; todos conservarán los controles de seguridad. Release Intelligence será determinista y exclusivo de Enterprise.
- AWS en tarea B: EC2, RDS privado, DynamoDB, S3 privado, CloudFront OAC, HTTPS en frontend/API, DNS, registros, respaldos y evidencia. La actividad Elastic Beanstalk es independiente.

## Compatibilidad

Se eligieron versiones estables consultadas en npm al implementar. TypeScript 7.0.2 estaba disponible, pero `typescript-eslint` 8.74.0 admite `>=4.8.4 <6.1.0`; se usa TypeScript 6.0.3 para respetar ese contrato. No se requiere modificar la instalación global del usuario (Node 26.10.0/npm 11.19.1).

La política de líneas Node y los requisitos de Vite se pueden consultar en [Node.js Releases](https://nodejs.org/en/about/previous-releases) y [Vite Getting Started](https://vite.dev/guide/). Los manifiestos y el lockfile definen las versiones efectivamente instaladas. CI prepara las líneas 24 y 26; la evidencia local se limita a los entornos realmente ejecutados en el informe.
