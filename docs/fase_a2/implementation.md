# Implementación A2 — Diseño y navegación

Fecha: 24 de noviembre de 2026. Rama de trabajo: `feat/002-fase-a2`.

## Alcance y referencias

Se implementó el prototipo visual sobre el monorepositorio A1. La referencia funcional es [el acuerdo original](ReleaseVantra_A2_Planeacion_Actualizada_v1.1.md), conservado sin modificaciones. Se revisaron el README, desarrollo, requisitos, arquitectura e informe A1, las pruebas y los tres adjuntos originales de React Bits. La arquitectura A1 está en `docs/fase_a1/architecture.md`; el archivo `docs/architecture.md` mencionado en el prompt ya no existe después de la organización por fases.

El prompt técnico A2 recibido autoriza la implementación y sustituye la indicación histórica del acuerdo de esperar ese prompt. No se cambió la arquitectura backend ni se avanzó a A3. No se hicieron commits, pushes, despliegues ni altas de servicios cloud.

La referencia de la casa modular se utiliza para la composición, espacio y contraste. No se copian su tema, ilustración ni texto. El hero se concentra en la marca y los tres efectos suministrados; la representación del producto aparece después como solicitud ilustrativa.

## Estructura

```text
apps/web/
├── components.json                 # Convenciones shadcn/ui
├── public/favicon.svg              # Símbolo propio
└── src/
    ├── app.tsx                     # Router y metadatos por ruta
    ├── main.tsx                    # Fuentes locales y entrada
    ├── styles.css                  # Tokens, layouts y responsive
    ├── layouts/
    │   ├── public-layout.tsx
    │   └── app-layout.tsx
    ├── components/
    │   ├── ui/                     # Button, primitives, Dialog y Tabs
    │   ├── react-bits/             # Tres fuentes adaptadas + hero-effects
    │   ├── workspace/              # Encabezado y tabla compartidos
    │   ├── brand.tsx
    │   ├── data-table.tsx
    │   ├── demo-action.tsx
    │   ├── form-fields.tsx
    │   ├── health-status.tsx
    │   └── pricing.tsx
    ├── hooks/                      # Movimiento reducido y foco modal
    ├── lib/                        # Navegación, cn y cliente HTTP A1
    ├── mocks/                      # Datos tipados y contexto en memoria
    └── pages/
        ├── landing.tsx
        ├── public-pages.tsx
        ├── auth.tsx
        ├── workspace.tsx           # Selección de módulo visual
        └── workspace/              # Dashboard, proyectos, solicitudes,
                                   # ejecuciones, GitHub, miembros,
                                   # inteligencia, suscripción y estructura
tests/e2e/
├── intro.spec.ts                   # Cobertura A1 preservada en ajustes
├── a2.spec.ts                      # Presentación, navegación y flujos A2
└── a2-states.spec.ts               # Invitación, estados y foco móvil
docs/
├── third-party-notices.md
└── fase_a2/
    ├── ReleaseVantra_A2_Planeacion_Actualizada_v1.1.md
    ├── implementation.md
    └── a2-report.md
```

## Sistema de diseño

Dirección: Dark Minimalist Enterprise. Negro predominante, blancos, grises y azul claro moderado. Las variables semánticas están centralizadas en `styles.css` y expuestas mediante `@theme inline` de Tailwind 4.

| Token              | Valor     | Uso                            |
| ------------------ | --------- | ------------------------------ |
| `--background`     | `#090909` | Fondo principal                |
| `--surface`        | `#171717` | Superficies                    |
| `--surface-subtle` | `#101010` | Paneles y áreas secundarias    |
| `--foreground`     | `#FFFFFF` | Texto principal                |
| `--muted`          | `#A3A3A3` | Metadatos y texto secundario   |
| `--border`         | `#303030` | Contornos                      |
| `--accent`         | `#93C5FD` | Foco y selección               |
| `--success`        | `#86D9A6` | Éxito ilustrativo o salud real |
| `--danger`         | `#FCA5A5` | Error y rechazo                |
| `--warning`        | `#E9C281` | Pendiente y advertencia        |

Geist Variable y Geist Mono Variable se distribuyen localmente mediante Fontsource. No se hacen peticiones a Google Fonts. La segunda familia se usa en commits, logs y referencias. Botones, controles, contornos y esquinas comparten reglas; no hay sombras decorativas ni animaciones de tablas.

La base shadcn/ui usa Button con CVA, composición Slot y `cn` (`clsx` + `tailwind-merge`), Dialog de Radix, DropdownMenu de Radix y Tabs con navegación por teclado de Radix. Los campos, tarjetas, tablas, alertas, badges, progreso, estados vacíos y skeletons son componentes ligeros del mismo sistema. `components.json` permite continuar incorporando componentes con los alias existentes. Lucide aporta los iconos de interfaz.

## React Bits

Se extrajeron las implementaciones completas de los adjuntos originales, se conservaron sus algoritmos y estilos y se añadieron interfaces de props y tipos internos. No se usaron `any`, `@ts-nocheck` ni excepciones globales de TypeScript o lint.

| Componente    | Implementación conservada                                                  | Adaptaciones                                                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GradientASCII | Shader WebGL2, rampas Oklab, atlas de glifos, render targets y composición | Paleta aprobada, DPR 1 en hero, máximo 30 fps, sin interacción ni clic, uniforms ausentes como `null`, detección de contexto perdido y sincronización de props mediante efecto |
| TechText      | Canvas 2D, métricas de glifos, sprites, revelación y entrada `metrics`     | Marca exacta, alineación izquierda, sin arrastre, kick, etiquetas ni barrido continuo; título HTML accesible como respaldo; marca de primer render para alternar el respaldo   |
| TextType      | Secuencia de grafemas, borrado, efectos por carácter y cursor GSAP         | Props tipadas, transiciones de estado diferidas, JSX compatible con las reglas de refs de React 19, sin errores intencionales; movimiento reducido realmente estático          |

Los componentes se cargan por `React.lazy`. `hero-effects.tsx` aplica `prefers-reduced-motion` con suscripción a cambios, pausa explícita y suspensión fuera de la primera pantalla. El texto esencial es HTML. El fondo tiene una alternativa ASCII estática siempre disponible y no intercepta eventos. Las dimensiones de marca y subtítulo reservan espacio para evitar saltos al cambiar frases. Los efectos no aparecen en el área empresarial.

Únicamente TextType necesita GSAP. GradientASCII utiliza WebGL nativo y TechText Canvas 2D, sin Three.js ni motores adicionales. Los [avisos de terceros](../third-party-notices.md) conservan las licencias de React Bits y shadcn/ui y las referencias de GSAP y fuentes.

## Rutas

React Router 7 mantiene navegación del navegador, enlaces, historial y carga directa de rutas en Vite. El servidor de producción futuro necesitará reescritura SPA a `index.html`; no se implementó infraestructura de publicación.

| Ruta pública             | Contenido                                                             |
| ------------------------ | --------------------------------------------------------------------- |
| `/`                      | Hero, características, proceso, GitHub, seguridad, planes y CTA       |
| `/features`              | Capacidades previstas                                                 |
| `/pricing`               | Team, Business y Enterprise                                           |
| `/login`                 | Correo, contraseña visible/oculta y estado de carga/error conceptual  |
| `/register`              | Administrador: nombre, apellidos, correo y confirmación de contraseña |
| `/register/organization` | Organización, slug, sector, descripción, plan y resumen conceptual    |
| `/forgot-password`       | Recuperación conceptual; no envía correo                              |
| `/invite/demo`           | Invitación ilustrativa; cuenta existente o nueva                      |
| `/invite/:token`         | Estado caducado/inválido para valores distintos de `demo`             |
| `/docs`                  | Índice de documentación y referencia al repositorio                   |
| Ruta desconocida         | Página 404 identificable                                              |

| Ruta empresarial           | Contenido                                            |
| -------------------------- | ---------------------------------------------------- |
| `/app`                     | Métricas, ejecuciones, pendientes y actividad        |
| `/app/projects`            | Filtro por nombre y ambiente                         |
| `/app/projects/:id`        | Repositorio, versión y workflow conceptual           |
| `/app/versions`            | Versiones y commits                                  |
| `/app/requests`            | Solicitudes y filtros                                |
| `/app/requests/new`        | Preparación conceptual de una solicitud              |
| `/app/requests/:id`        | Commit, ambiente, workflow, aprobaciones e historial |
| `/app/approvals`           | Bandeja de pendientes                                |
| `/app/executions`          | Resultados de ejemplo y siete estados explorables    |
| `/app/incidents`           | Estado vacío y recorrido conceptual                  |
| `/app/audit`               | Eventos ilustrativos por organización                |
| `/app/integrations/github` | Seis estados de conexión, repositorios y workflows   |
| `/app/members`             | Consumo de miembros e invitación conceptual          |
| `/app/subscription`        | Cuotas, planes y comparación                         |
| `/app/policies`            | Production: dos aprobaciones Astera, una FaroWare    |
| `/app/intelligence`        | Bloqueo visual por plan y riesgo fijo Enterprise     |
| `/app/settings`            | Contexto, salud real de API y estados visuales       |

El layout empresarial incluye sidebar agrupada, organización activa, contexto superior, usuario conceptual, menú desplegable y selector de rol/plan. El menú por rol es una ayuda UX: no aplica seguridad. Las rutas no incluidas en el recorrido de un rol muestran una explicación de permiso visual, no un 403 del backend.

## Flujos y datos

Administrador → organización → plan → resumen conceptual. Las contraseñas son campos no controlados, se validan en el formulario y se descartan al cambiar de pantalla. No se guardan en estado compartido, almacenamiento web ni backend. La organización escrita permanece en memoria local del formulario mientras se revisa el recorrido, sin crear entidades.

Miembros → correo/rol → vista previa → `/invite/demo` → cuenta existente/nueva. No se crean tokens ni enlaces temporales funcionales. `demo` es una ruta fija de ejemplo. Los textos explican el vencimiento, uso único, verificación de correo y comprobación futura de cuotas. FaroWare tiene el cupo Team completo y bloquea continuar con la invitación conceptual.

Los datos tipados de Astera Digital (Business, siete usuarios) y FaroWare Systems (Team, cinco usuarios) viven en `mocks/data.ts`. Proyectos, solicitudes, ejecuciones, métricas y auditoría se filtran en el cliente por organización de demostración. El selector se reinicia al recargar. El puntaje Enterprise es un ejemplo fijo, sin algoritmo. Los nombres técnicos y referencias son ficticios, no repositorios consultados en GitHub.

La única consulta de datos real se mantiene en `lib/health.ts`, hacia `/api/health` desde ajustes. Se preservan cancelación, timeout, validación del JSON y reintento de A1. La salud del proceso no demuestra que GitHub, una base de datos o la autorización estén operativos.

## Accesibilidad y responsive

- Enlace inicial para saltar al contenido, `lang=es`, títulos por ruta y estructura de encabezados.
- Foco visible, controles con etiquetas, errores asociados con `aria-describedby` y foco al primer campo inválido.
- Estados con texto e iconos; nunca solo color.
- Diálogos y menú de usuario con Radix: foco, Escape y retorno al activador.
- Navegación móvil con foco contenido, cierre con Escape, bloqueo del fondo y restauración de foco; sidebar cerrada marcada `inert`.
- Sidebar fija en escritorio y desplegable bajo 1024 px. Formularios y paneles pasan a una columna. Tablas conservan scroll en su propio contenedor enfocable, sin desbordar la página.
- Comprobación automatizada a 320, 390, 768, 820 y 1440 px, además de capturas de navegador.
- Pausa accesible de los efectos y alternativa estática ante movimiento reducido o falta de soporte gráfico.

Esto no sustituye una auditoría exhaustiva WCAG con lectores de pantalla y dispositivos físicos. Los detalles de ejecución, capturas, resultados y límites están en [el informe A2](a2-report.md).

## Integración futura

A3 añadirá persistencia; A4 identidad, membresías, autorización y aislamiento real; A5–A9 servicios empresariales, GitHub y auditoría; A10 conectará estas vistas con APIs. Los módulos de presentación y mocks están separados del cliente HTTP para sustituir los datos sin reescribir layouts ni controles. Ningún diálogo de A2 afirma una operación real completada.
