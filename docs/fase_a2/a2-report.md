# Informe de implementación y validación — A2

Fecha: 24 de noviembre de 2026. Rama: `feat/002-fase-a2`.

Control visual adicional: **`GATE: OPEN 35 (rounds used up)`**, sin excepciones ni hallazgos ocultados. Las verificaciones del proyecto y las 17 pruebas E2E aprobaron. El control de plantilla no quedó en PASS.

## 1. Resultado

La base A1 se convirtió en un prototipo de ReleaseVantra con landing pública, identidad oscura, registro e invitaciones conceptuales y navegación empresarial. Los módulos representativos tienen estados y acciones explorables, sin crear cuentas, membresías, aprobaciones ni ejecuciones reales.

La landing incluye características, proceso Conectar → Solicitar → Aprobar → Ejecutar → Auditar, GitHub, seguridad prevista, los tres planes y CTA. Se mantuvieron la API, el contrato de salud y las pruebas de A1.

## 2. Estructura final

La [documentación de implementación](implementation.md#estructura) contiene el árbol completo. Los archivos principales son:

```text
apps/web/src/
├── app.tsx
├── styles.css
├── layouts/{public-layout,app-layout}.tsx
├── components/
│   ├── ui/{button,dialog,primitives,tabs}.tsx
│   ├── react-bits/                 # Componentes suministrados, TSX y CSS
│   └── workspace/                 # Encabezado y tabla de ejecuciones
├── pages/
│   ├── landing.tsx
│   ├── auth.tsx
│   ├── public-pages.tsx
│   ├── workspace.tsx
│   └── workspace/                 # Nueve módulos de presentación
├── mocks/{data,demo-context,features}.ts
└── hooks/{use-motion,use-focus-trap}.ts
tests/e2e/{intro,a2,a2-states}.spec.ts
docs/fase_a2/{implementation,a2-report}.md
docs/third-party-notices.md
```

El acuerdo original se conserva en su ubicación; se excluyó únicamente del reformateo automático. No se modificaron los documentos de A1, `apps/api`, `packages/shared` ni el workflow CI.

## 3. Componentes

Se incorporaron Button con variantes, Input, Select, Textarea, campos con errores asociados, mostrar/ocultar contraseña, Card, DataTable, Badge, Tabs, Dialog, menú desplegable, Alert, EmptyState, Skeleton y Progress. Sidebar, topbar, marca, encabezados y controles de demostración se comparten entre módulos.

Button, `cn` y la composición accesible siguen la base shadcn/ui; Radix gestiona diálogos, tabs y menú del usuario. Lucide aporta la iconografía. `HealthStatus` reutiliza el cliente HTTP validado de A1 y conserva cancelación, error y reintento.

## 4. React Bits y compatibilidad

Las implementaciones originales suministradas se adaptaron a TypeScript estricto, conservando sus algoritmos y estilos. GradientASCII usa WebGL2 nativo; TechText, Canvas 2D; TextType, GSAP. Se añadieron tipos de props, estado, glifos, programas y uniforms, sin desactivar verificaciones.

Se mantuvo `ReleaseVantra` como título HTML accesible y respaldo del canvas. El fondo tiene ASCII estático, los efectos se cargan con `React.lazy`, existe pausa explícita y se evita la animación bajo movimiento reducido. El fondo se limita a DPR 1 y 30 fps en el hero. No se añadieron efectos a tablas o formularios.

| Dependencia incorporada          | Versión |
| -------------------------------- | ------- |
| react-router-dom                 | 7.18.7  |
| radix-ui                         | 1.8.1   |
| lucide-react                     | 1.79.0  |
| gsap                             | 3.15.1  |
| class-variance-authority         | 0.7.1   |
| clsx                             | 2.1.1   |
| tailwind-merge                   | 3.7.1   |
| Geist / Geist Mono de Fontsource | 5.3.0   |

Se comprobaron los requisitos de runtime y peers en npm; la instalación no presentó conflictos y el lockfile fija las versiones. Las licencias están documentadas en [avisos de terceros](../third-party-notices.md). React Bits conserva su aviso MIT + Commons Clause; shadcn/ui, MIT; las fuentes, SIL OFL. GSAP se usa conforme a su licencia estándar para aplicaciones web.

## 5. Navegación y flujos

Rutas públicas: `/`, `/features`, `/pricing`, `/login`, `/register`, `/register/organization`, `/forgot-password`, `/invite/:token` y `/docs`. Existe una vista 404.

Rutas empresariales: dashboard, proyectos y detalle, versiones, solicitudes y detalle/preparación, aprobaciones, ejecuciones, incidentes, auditoría, GitHub, miembros, suscripción, políticas, Release Intelligence y configuración bajo `/app`. El [mapa completo](implementation.md#rutas) especifica cada ruta.

El registro avanza por administrador → organización → plan → confirmación conceptual. No guarda contraseñas ni crea entidades. Las invitaciones tienen variantes cuenta existente/nueva e inválida/caducada; la ruta fija `/invite/demo` permite explorar la aceptación. FaroWare ilustra el límite de cinco miembros Team. Los selectores de organización, rol y plan se reinician al recargar.

## 6. Diseño, responsive y accesibilidad

Se aplicó la paleta acordada mediante tokens semánticos: fondo `#090909`, superficies `#171717`, blanco, texto secundario `#A3A3A3`, borde `#303030` y acento `#93C5FD`. Los colores semánticos acompañan textos e iconos. Geist y Geist Mono se sirven localmente.

El hero ocupa al menos `100svh`. Las columnas, paneles y formularios se adaptan al ancho; las tablas anchas se desplazan dentro de su propio contenedor. La sidebar pasa a un menú móvil y no recibe foco mientras está cerrada. Se añadieron foco visible, salto al contenido, labels, asociación de errores, Escape y retorno de foco en menús y diálogos.

Se verificó ausencia de desbordamiento de página a 320, 390, 768, 820 y 1440 px. Las comprobaciones automatizadas no equivalen a una certificación WCAG ni a pruebas físicas con todos los dispositivos y lectores de pantalla.

## 7. Pruebas ejecutadas

Entorno local: Windows, Node 26.10.0 y npm 11.19.1. No se ejecutó una matriz local Node 24 ni se publicó esta rama para lanzar CI remoto.

| Comando                | Resultado observado                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `npm ci`               | Instalación reproducible correcta; 407 paquetes auditados, cero vulnerabilidades informadas |
| `npm run format:check` | Correcto                                                                                    |
| `npm run lint`         | Correcto, cero advertencias permitidas                                                      |
| `npm run typecheck`    | Correcto: workspaces y herramientas/E2E                                                     |
| `npm test`             | 10 pruebas de API aprobadas, tres archivos                                                  |
| `npm run build`        | Shared, API y web compilados correctamente                                                  |
| `npm run check`        | Cadena completa aprobada, también después de `npm ci`                                       |
| `npm run test:e2e`     | 17 pruebas Chromium aprobadas                                                               |
| `git diff --check`     | Sin errores de whitespace                                                                   |

Cobertura E2E: identidad y tres efectos sin errores JavaScript/consola; pausa; rutas públicas y empresariales; filtros; detalles; políticas de dos aprobaciones Production; diálogos sin mutación; cinco roles; estados GitHub y ejecución; Enterprise y cuotas; registro y contraseña coincidente; ausencia de peticiones de negocio y persistencia; login/carga/error; recuperación e invitación; tabs; foco móvil; responsive; movimiento reducido; ausencia de WebGL; salud HTTP real, reintento y rechazo de respuesta inesperada.

Las primeras pasadas detectaron y permitieron corregir una codificación incorrecta en la navegación, además de ajustar tipos y sincronización de los componentes externos. La suite final se ejecutó después de esas correcciones.

## 8. Evidencia visual y revisión adicional

La medición de rendimiento sobre el build compilado terminó en **0 FAIL y 2 WARN**, una advertencia de JavaScript por cada ancho. Se conservaron [los resultados completos](performance.json). Transferencia: 244,1 KiB a 1440 px y 243,5 KiB a 390 px; JavaScript analizado: 533,8 KiB, por encima del umbral recomendado de 450 KiB del checker. No se ocultó esta advertencia. Se cargaron dos archivos de fuentes (51,9 KiB), un contexto WebGL al inicio y ninguno al llegar al final. CLS mediano: 0,000 en ambos anchos. FCP/LCP mediano: 340 ms y 300 ms respectivamente, en tres cargas con WebGL deshabilitado para medir la CPU. Son mediciones locales de laboratorio, no métricas de usuarios reales ni garantía de rendimiento en otros equipos.

Se capturó la aplicación compilada con el navegador headless de las herramientas de diseño. No son resultados de despliegues ni datos de clientes reales:

- [Landing de escritorio](evidence/landing-desktop.png), ancho 1440 px y viewport de 900 px de alto.
- [Landing móvil](evidence/landing-mobile.png), viewport 390 × 844 px.
- [Dashboard](evidence/dashboard-desktop.png), viewport 1440 × 1440 px para incluir la navegación completa.
- [Detalle de solicitud](evidence/request-desktop.png), viewport 1440 × 1440 px para conservar la sidebar en una sola captura.

Las capturas de landing conservan la página completa y pueden mostrar un subtítulo en un punto intermedio de la escritura. Se inspeccionaron la composición, contraste, contenido de demostración y disposición de los controles; no se presentan como prueba de servicios empresariales activos.

También se capturó e inspeccionó la landing a 1024 × 768, 820 × 1180 y 768 × 1024 px. Esas capturas auxiliares permanecen en `.local/a2-visual/`, ignorada por Git; las cuatro evidencias principales se incluyen en esta carpeta de fase.

El chequeo adicional de la habilidad de diseño impone reglas de su propia plantilla (altura exacta por sección, componentes de su kit y vocabulario de titulares). Se corrigieron hallazgos aplicables como alineación, foco y contención del fondo. Resultado final: `GATE: OPEN 35 (rounds used up)`, tres rondas y cero waivers. Los 35 hallazgos abiertos se conservan individualmente en [visual-review.json](visual-review.json), con ubicación, explicación y sugerencia; no se presenta como una aprobación automática integral.

Entre las observaciones se incluyen alturas que no son múltiplos exactos de una pantalla, reglas sobre el contenedor raíz de React, interpretación de texto ASCII decorativo como contenido, diferencia de tamaños de tipografía y ausencia de las animaciones adicionales del kit. También pide sustituir el título «ReleaseVantra» y no reconoce varios encabezados españoles como nombres de sección; esas sugerencias no deben aplicarse automáticamente contra el brief. Se mantuvieron las tres animaciones aprobadas por el usuario y el contenido de demostración. No se instalaron fotografías ni efectos adicionales para satisfacer el checker.

La segunda ronda sobre el archivo estático se encontró con `/index.html`, que React Router trata como ruta desconocida; sus 17 observaciones correspondían a la página 404 y no se contaron como revisión válida de la landing. La tercera ronda se realizó sobre la raíz del preview Vite compilado, con HTTP 200 y la landing correcta. La evaluación final se conserva sin alterar el kit ni fabricar aprobaciones.

Voz editorial: español directo para equipos técnicos; funciones previstas descritas como tales. Paleta del usuario, pareja Geist/Geist Mono, hero centrado en tipografía alineada a la izquierda, GradientASCII como único fondo animado, TechText y TextType como efectos acordados. Sin fotografías, escenas 3D ni afirmaciones de clientes o estadísticas reales. Las métricas dentro del SaaS provienen del conjunto ficticio visible, no de analítica de producción.

## 9. Limitaciones y fases posteriores

- A2 es una presentación navegable. No implementa identidad, sesiones, RBAC, aislamiento real, bases de datos, seeders, cuotas transaccionales, facturación, GitHub App, webhooks, dispatch, Outbox ni motor de riesgo.
- El puntaje Enterprise y los logs son ejemplos fijos. Los repositorios y commits mostrados son ficticios.
- La única operación de datos real es la consulta de salud A1 desde configuración.
- La producción necesitará configurar fallback SPA para rutas profundas; Vite ya soporta la navegación local.
- No hay dominio canónico ni imagen social de producción configurados; el proyecto todavía no se publica.
- El acuerdo y los avisos de licencias se conservan. No se requieren fotos ni activos adicionales para usar este prototipo.
- No se modificó configuración ajena al repositorio ni se hicieron commits, pushes o despliegues.

## 10. Estado de los criterios A2

| Criterio                                     | Estado de implementación                              |
| -------------------------------------------- | ----------------------------------------------------- |
| Landing completa e identidad oscura          | Implementado; capturado en navegador                  |
| GradientASCII, TechText y TextType reales    | Adaptados e incluidos; ejecución y fallbacks probados |
| Navegación pública y formularios             | Implementados y probados                              |
| Layout empresarial y módulos representativos | Implementados y probados                              |
| Cinco roles y tres planes                    | Exploración visual en memoria                         |
| Componentes reutilizables                    | Compartidos por rutas y módulos                       |
| Responsive y alternativas accesibles         | Probados en los tamaños y condiciones indicados       |
| Demostración distinguida de datos reales     | Avisos y acciones conceptuales; sin persistencia      |
| Pruebas A1, nuevas A2 y compilación          | Aprobadas según la tabla de resultados                |
| Documentación técnica y acuerdo original     | Conservados y ampliados en `docs/fase_a2/`            |
| Exclusión de A3 y otras fases                | Respetada                                             |

La implementación funcional de A2 está entregada. La aprobación visual definitiva corresponde a la revisión del usuario; el chequeo adicional de plantilla no debe confundirse con un PASS ni con las pruebas del proyecto. No se avanzó a A3.
