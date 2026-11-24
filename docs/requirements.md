# Referencias y alcance de ReleaseVantra

## Documentación revisada

| Fuente entregada                                                                                       | Contenido utilizado                                                                                                                         |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Texto pegado “RELEASEVANTRA — PROMPT 01”                                                               | Autorización de trabajo limitada a A1, stack, aceptación e informe                                                                          |
| `plan para release vantra.pdf` (43 páginas)                                                            | Reglas RN-01–RN-34 y RSUB, organizaciones y políticas, stack, modelo lógico v1.1, seguridad y persistencia                                  |
| `PRACTICA - 3 Implementación de un SaaS seguro y un 41ef2c079be080b49c79e45de1abd492.pdf` (22 páginas) | Exportación del plan: fases A1–A11, B1–B10 y relación con P01–P11                                                                           |
| `Práctica  SaaS seguro y una aplicación PaaS en AWS .pdf` (9 páginas)                                  | Documento original del profesor, arquitectura requerida, tres roles docentes, seguridad, pruebas P01–P11, segunda aplicación PaaS y rúbrica |

Los PDF se analizaron como referencias del proyecto. Sus actividades globales no amplían el alcance A1 autorizado. No se copiaron documentos ni datos de cuentas al repositorio. No se proporcionó una especificación visual independiente; esa ausencia no bloquea la pantalla introductoria y se deberá resolver en A2.

La revisión no encontró impedimentos para A1. El plan especifica cinco roles y el docente evalúa administrador, capturista y lector: se documenta la equivalencia funcional **ADMIN → administrador**, **DEVELOPER → capturista**, **AUDITOR → lector**. APPROVER y OPERATOR separan funciones adicionales del dominio. La cobertura real de permisos y su evidencia se verificarán en A4/A11, sin crear roles funcionales ahora. Las variantes de nombres “Astrea/Astera” y “FaroWare System/Systems” se normalizan al nombre explícito del prompt: **Astera Digital** y **FaroWare Systems**; no afectan código o datos en A1.

El `/health` exigido por el profesor para la segunda aplicación pertenece al proyecto PaaS. Aquí se implementa `/api/health`, según el alcance SaaS A1. No hay conflicto entre rutas de aplicaciones distintas.

## Requisitos funcionales y no funcionales

Actualización A2: identidad visual, landing, navegación y pantallas representativas se implementaron como prototipo, con datos ficticios en el cliente. El registro, los roles y los planes solo tienen comportamiento visual; no se adelantaron sus servicios. Consulta [la implementación A2](fase_a2/implementation.md) y [su informe de validación](fase_a2/a2-report.md).

Implementados en A1: web introductoria, consulta de salud de API, contrato compartido, configuración local, errores básicos, cierre ordenado, herramientas de calidad, CI y documentación reproducible.

Planificados: identidad/membresías, aislamiento multiempresa, cinco roles, gestión de proyectos/versiones, solicitudes/aprobaciones, ejecución GitHub real, suscripciones simuladas, cuotas, incidentes, auditoría y Release Intelligence. Ninguna de estas capacidades está disponible todavía.

Requisitos transversales futuros: autorización del servidor, integridad y aislamiento por organización, HTTPS, validación de entradas, mínimo privilegio, persistencia transaccional, idempotencia, recuperación, trazabilidad sin secretos y viabilidad en infraestructura pequeña. En A1 se prepara la estructura; su implementación no se presume ni se certifica.

## Fases y responsabilidades

| Fase                        | Responsabilidad pendiente                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| A2                          | UX/UI, identidad visual, navegación, wireframes y componentes                             |
| A3                          | Prisma/PostgreSQL, modelo, migraciones, datos ficticios, claves DynamoDB y Docker Compose |
| A4                          | Autenticación, organizaciones, RBAC y aislamiento                                         |
| A5                          | Miembros, suscripciones, cuotas, proyectos, versiones e incidentes                        |
| A6                          | Solicitudes, aprobaciones, snapshots y concurrencia                                       |
| A7                          | GitHub App, permisos e instalaciones/repositorios reales                                  |
| A8                          | Dispatch, webhooks, sincronización y conciliación                                         |
| A9                          | Outbox, worker y auditoría DynamoDB                                                       |
| A10                         | Frontend empresarial conectado con la API                                                 |
| A11                         | Calidad funcional, seguridad y preparación del despliegue                                 |
| B1–B10                      | Evaluación económica, AWS, seguridad de infraestructura, publicación y evidencias         |
| Proyecto PaaS independiente | Elastic Beanstalk y ciclo v1 → v2 → v1                                                    |

## Trazabilidad docente planificada

| Prueba                                   | Fases responsables; todavía sin evidencia funcional |
| ---------------------------------------- | --------------------------------------------------- |
| P01: escritura válida y evento           | A5, A9, B4, B8                                      |
| P02: lector consulta, escritura 403      | A4, A11, B10                                        |
| P03: rechazo entre organizaciones        | A4, A11, B10                                        |
| P04: sesión ausente/entrada inválida     | A4, A11, B10                                        |
| P05: CloudFront HTTPS y S3 privado       | B5, B7                                              |
| P06: TLS y origen PostgreSQL             | B2, B3                                              |
| P07: GRANT/REVOKE y cuenta limitada      | B3, B10                                             |
| P08: permiso DynamoDB permitido/denegado | B4, B10                                             |
| P09: Elastic Beanstalk v1/v2/v1          | Proyecto PaaS independiente                         |
| P10: registros web y CloudTrail          | B9, B10                                             |
| P11: restauración de muestra             | B9, B10                                             |

La investigación aplicada, fichas REST/SOAP/webhooks, MAC/DAC/RBAC, medición de disponibilidad y evidencias de seguridad se completarán junto con los controles y la revisión docente. A1 no acredita P01–P11 ni el SaaS completo.
