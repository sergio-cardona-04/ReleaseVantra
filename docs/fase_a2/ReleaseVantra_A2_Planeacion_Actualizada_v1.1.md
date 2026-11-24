# ReleaseVantra — Acuerdos de planeación de la Fase A2

**Versión del documento:** 1.1 — referencias visuales integradas

**Tarea mayor:** A — Desarrollo de ReleaseVantra  
**Fase:** A2 — Diseño UX/UI, identidad visual y navegación  
**Estado:** Planeación funcional y dirección visual definidas; tres referencias de componentes React Bits y una captura estética recibidas. Pendientes únicamente detalles opcionales de composición, copys y cualquier referencia adicional que el usuario desee compartir.  
**Fecha de consolidación:** 24 de noviembre de 2026  
**Documento:** Acuerdos de diseño y alcance (no es todavía un prompt para Codex).

---

## 1. Objetivo de la fase

Definir la experiencia de usuario, la identidad visual, la navegación y los componentes base de **ReleaseVantra**, plataforma SaaS B2B multiempresa de gestión de versiones, aprobaciones y ejecución controlada de GitHub Actions.

La Fase A2 debe transformar los acuerdos visuales en **un prototipo navegable y responsivo**, construido sobre el monorepositorio preparado en A1, sin implementar aún procesos de negocio ni persistencia real. Se incorpora una landing con efectos visuales React Bits aportados por el usuario; dentro del SaaS la funcionalidad prevalece sobre las animaciones.

**Resultado esperado:** landing pública, sistema de diseño, estructura de navegación, pantallas representativas y componentes reutilizables preparados para conectarse a las funcionalidades reales de las siguientes fases.

### 1.1. Punto de partida

- Monorepositorio existente: `apps/web`, `apps/api` y `packages/shared` con npm workspaces.
- Frontend: React, Vite, TypeScript y Tailwind CSS.
- Backend: Express; endpoint `/api/health` funcional.
- Pruebas y CI establecidos en A1: deben mantenerse operativos.
- Librería visual prevista: **shadcn/ui** con iconografía **Lucide**.
- Todavía no hay autenticación, organizaciones reales, bases de datos, integración GitHub App ni autorización RBAC implementadas.

---

## 2. Identidad visual — decisión aprobada

### 2.1. Dirección estética

**Dark Minimalist Enterprise**: sobria, profesional, monocromática, técnica y con muy poco color. Predominarán el **negro en los fondos** y el **blanco en el texto**; los grises aportarán jerarquía visual y el azul claro se reservará para acentos.

La misma identidad se aplicará a la landing, formularios públicos, dashboard, navegación, módulos empresariales y pantallas técnicas. No se usará una landing visualmente desconectada del SaaS.

### 2.2. Paleta de referencia

| Token sugerido | Color | Uso principal |
|---|---|---|
| Fondo principal | `#090909` | Base visual predominante |
| Superficies | `#171717` | Paneles, sidebar, tarjetas y modales |
| Texto principal | `#FFFFFF` | Títulos, contenido esencial |
| Texto secundario | `#A3A3A3` | Descripciones, metadatos |
| Bordes | `#303030` | Separadores y delimitación discreta |
| Acento | `#93C5FD` | Selecciones, enlaces, foco y pequeños matices |

Los valores son **referencias iniciales**, sujetas a ajustes técnicos de contraste y a las referencias visuales del usuario. No deben dispersarse colores literales en todos los componentes: se utilizarán **tokens semánticos**.

### 2.3. Colores semánticos

- **Verde:** completado, exitoso o conectado.
- **Rojo:** fallido, error o acción destructiva.
- **Ámbar/amarillo:** pendiente, advertencia o atención requerida.
- **Azul:** ejecución en curso y elementos de interacción cuando corresponda.
- **Gris:** neutral, cancelado, archivado o desactivado.

La información no se comunicará exclusivamente mediante color: acompañar con texto y, cuando ayude, iconos.

### 2.4. Criterios de estilo

- Tipografía sans-serif limpia y jerarquizada.
- Tipografía monoespaciada para SHA de commits, identificadores, logs y referencias técnicas.
- Sombras mínimas y bordes discretos.
- Espaciado consistente y densidad apropiada para una herramienta profesional.
- Tablas legibles y controles compactos, evitando decoración innecesaria.
- Interacciones y estados de foco accesibles; comprobar contraste en botones, enlaces y texto secundario.
- **Tema oscuro como predeterminado.** No se exige crear un modo claro en A2; se pueden preparar tokens para incorporarlo en el futuro.

---

## 3. Áreas de la aplicación y navegación

Se distinguen **tres áreas funcionales**:

1. **Pública:** presentación del producto, planes, registro, inicio de sesión e invitaciones.
2. **Empresarial:** dashboard, proyectos, versiones, solicitudes, aprobaciones, ejecuciones, incidentes y auditoría.
3. **Administrativa:** miembros, suscripción, políticas, integración GitHub y ajustes organizacionales.

### 3.1. Layout de la zona empresarial

- **Sidebar** con identidad de ReleaseVantra, organización activa y accesos del rol.
- **Barra superior** con título/contexto, navegación secundaria y menú de usuario.
- **Área principal** para tablas, formularios, paneles y detalles.
- **Breadcrumbs** y encabezados consistentes cuando mejore la orientación.
- Sidebar permanente en escritorio, colapsable en tablet y menú compacto en móvil.
- La navegación mostrará únicamente operaciones relevantes para el rol y plan, pero esto es una **ayuda UX**, no un mecanismo de seguridad.

### 3.2. Cinco roles y sus recorridos prioritarios

| Rol | Entrada o enfoque visual | Acción principal |
|---|---|---|
| Administrador de organización (`ADMIN`) | Dashboard y configuración | Gestionar empresa, miembros, planes, políticas y conexión GitHub |
| Desarrollador (`DEVELOPER`) | Proyectos, versiones y solicitudes | Preparar versión y enviar solicitud |
| Aprobador (`APPROVER`) | Bandeja de aprobaciones | Revisar, aprobar o rechazar |
| Operador (`OPERATOR`) | Solicitudes autorizadas y ejecuciones | Iniciar workflows y supervisar resultados |
| Auditor (`AUDITOR`) | Historial y auditoría | Consultar evidencias sin modificar registros |

Las reglas de autorización reales se implementarán en A4 y fases siguientes. A2 solamente definirá su presentación y navegación.

---

## 4. Landing pública — diseño visual y componentes de referencia aprobados

ReleaseVantra tendrá una **landing page** como ruta principal `/`, independiente del dashboard autenticado `/app`.

### 4.1. Referencia visual compartida

El usuario proporcionó una captura de una landing de estilo *premium minimalista*, con fondo negro, titular blanco de gran tamaño, subtexto gris, controles sencillos, un elemento visual a un lado y mucho espacio negativo. Se adopta como referencia de **composición, jerarquía tipográfica, espaciado, bordes discretos y sobriedad**; no se copiarán su tema arquitectónico, ilustración ni textos.

**Principio:** la landing puede ser expresiva; el SaaS debe ser más funcional, compacto y estable.

### 4.2. Primer pantallazo: hero a pantalla completa

- Alto visible de la primera sección: **mínimo 100svh** como punto de partida, adaptable a pantallas y navegadores móviles.
- Base negra `#090909`, texto blanco, gris secundario y azul claro moderado.
- Fondo animado **`GradientASCII`** de React Bits, ocupando toda la superficie del hero detrás del contenido.
- Nombre **`ReleaseVantra`** como protagonista, representado mediante **`TechText`** de React Bits.
- Subtítulo dinámico con **`TextType`** de React Bits.
- CTA principal: **«Comenzar gratis»** (futuro registro); CTA secundario: **«Explorar funciones»** (desplazamiento a sección informativa).
- Barra superior pública sobria. En escritorio, explorar composición inspirada en la referencia (texto a la izquierda y elemento visual o mockup a la derecha), pero **la presencia y contenido del mockup no están aprobados todavía**. En móvil, priorizar texto legible, CTA visibles y evitar superposición con el gradiente.
- El color y animaciones nunca deben impedir leer el título, los mensajes o los botones: usar capas, atenuación y límites de contraste.

**Copia de prueba, todavía revisable:**

- Wordmark: `ReleaseVantra`.
- Mensaje principal de apoyo: «Controla cada versión. Despliega con confianza».
- Frases posibles para `TextType`: «Aprueba cambios con claridad», «Ejecuta GitHub Actions con control», «Cada despliegue, con trazabilidad».

### 4.3. Componente `GradientASCII` — fondo

**Fuente entregada por el usuario:** `Texto pegado(10).txt` — *React Bits, GradientASCII, JavaScript + CSS*. El archivo incluye documentación de props y código fuente completo; se entregará también a Codex.

Decisiones de uso:

- Solo en el hero principal; evitar replicarlo continuamente en dashboard, formularios o tablas.
- Usar tonos próximos al gris, blanco y azul claro (sin gradientes multicolor saturados).
- Movimiento suave, densidad moderada, brillo contenido e interacciones discretas.
- Respetar `prefers-reduced-motion` y detener o degradar el efecto en dispositivos con recursos limitados o sin soporte WebGL; proporcionar un fondo estático aceptable.
- No interceptar eventos necesarios para los botones y enlaces; cuidar el comportamiento táctil y la legibilidad.
- Cargar con criterio de rendimiento; evitar que el efecto retrase innecesariamente el contenido central.

**Parámetros de partida sugeridos para que Codex los pruebe, NO valores definitivos:**

```tsx
<GradientASCII
  colors={['#222222', '#555555', '#93C5FD', '#F3F4F6']}
  shape="horizon"
  characters=" .:+*#@"
  cellSize={20}
  density={0.55}
  glyphOpacity={0.65}
  gradientOpacity={0.55}
  glow={0.12}
  flicker={0.08}
  flow={0.25}
  speed={0.35}
  mouseInteraction={false}
  clickEffect="none"
/>
```

Las configuraciones se ajustarán visualmente para evitar exceso de luminosidad y consumo de GPU. El código aportado es JavaScript + CSS; se adaptará con tipos apropiados al proyecto TypeScript, manteniendo el comportamiento deseado.

### 4.4. Componente `TechText` — marca y titular

**Fuente entregada por el usuario:** `Texto pegado (2).txt` — *React Bits, TechText, JavaScript + CSS*.

- Aplicar al texto exacto **`ReleaseVantra`**, con tipografía blanca grande y ajuste responsivo.
- Aprovechar los efectos técnicos de contorno/revelación, con animación moderada.
- Evitar arrastre persistente, rebotes exagerados, etiquetas de depuración u otras interacciones que compitan con el mensaje.
- Usar principalmente en el hero. El logotipo en el dashboard debe ser estable y ligero.
- Mantener un título textual accesible para lectores de pantalla y como alternativa cuando canvas o JavaScript no estén disponibles.

**Configuración inicial sugerida, no definitiva:** `reveal="letter"`, `intro="metrics"`, `introDuration={1.6}`, `draggable={false}`, `clickKick={false}`, `labels={false}`, `guides={false}`, `specks={4}`, `color="#FFFFFF"`, `accentColor="#93C5FD"`.

### 4.5. Componente `TextType` — subtítulos

**Fuente entregada por el usuario:** `Texto pegado (3).txt` — *React Bits, TextType, JavaScript + CSS*. Requiere **GSAP**, según el propio archivo aportado.

- Mostrar textos breves en secuencia sin alterar el mensaje semántico principal de la página.
- Preferir cursor tipo barra, transición discreta y velocidad cómoda de lectura.
- Evitar errores tipográficos deliberados (`mistakes={0}`) para mantener el tono corporativo.
- Respetar preferencias de movimiento reducido y reservar espacio suficiente para evitar saltos de diseño al cambiar de frase.
- Mantener una alternativa textual accesible y estable.

**Parámetros de partida sugeridos:** `typingSpeed={55}`, `pauseDuration={2200}`, `deletingSpeed={35}`, `typeEffect="fade"`, `cursorStyle="bar"`, `showCursor`, `mistakes={0}`. La copia final y la política de bucle podrán ajustarse antes de Codex.

### 4.6. Secciones posteriores de la landing

| Sección | Propósito |
|---|---|
| Navegación pública | Logo; enlaces a funciones, planes, login y registro |
| Hero | `GradientASCII` + `TechText` + `TextType` + CTA |
| Características | Proyectos, versiones, aprobaciones, GitHub Actions y auditoría |
| Cómo funciona | **Conectar → solicitar → aprobar → ejecutar → auditar** |
| Integración GitHub | Explicar GitHub App y workflows reales previstos |
| Seguridad | Roles, separación organizacional y trazabilidad |
| Planes | Comparación Team, Business y Enterprise |
| CTA final | Registro público de una organización |
| Footer | Enlaces y documentación del proyecto |

Se conservarán fondo oscuro, bloques con espacio amplio, bordes discretos, tipografía protagonista y muy pocos acentos. Los componentes más complejos permanecerán reservados para donde aporten valor.

**Regla de comunicación:** mientras una funcionalidad no esté implementada, no presentar resultados simulados como verdaderos, ni afirmar que GitHub, RBAC o AWS ya funcionan. Los datos ficticios se identificarán claramente como demostraciones.

### 4.7. Referencias recibidas y otras opcionales

**Recibidas:** captura estética principal y los tres archivos de fuente `GradientASCII`, `TechText` y `TextType`.

**Opcional antes del prompt Codex:** más referencias de navbar, botones, tarjetas, tablas, componentes gráficos o un mockup concreto del SaaS; también el texto definitivo del hero. No es necesario buscar más referencias para que este documento sea válido.

Cuando se prepare el prompt A2, Codex deberá recibir los tres archivos originales además de este acuerdo, para que trabaje con los componentes efectivos, no con recreaciones aproximadas. Deberá verificar los términos de licencia de las fuentes que incorpore.

---

## 5. Alta de organizaciones y de usuarios — decisiones funcionales para diseñar en A2

### 5.1. Registro público de una nueva organización

Se adoptó un **flujo público de creación de organización con cuenta administradora**, distinto del alta de empleados.

**Recorrido previsto:**

`Landing → Crear cuenta de administrador → Registrar organización → Seleccionar plan → Confirmación / acceso inicial`

**Datos del formulario:**

| Campo | Carácter |
|---|---|
| Nombre del administrador | Obligatorio |
| Apellidos | Obligatorio |
| Correo electrónico | Obligatorio |
| Contraseña y confirmación | Obligatorio |
| Nombre de organización | Obligatorio |
| Slug organizacional | Obligatorio; sugerido automáticamente y editable |
| Sector empresarial | Opcional |
| Descripción | Opcional |
| Plan Team / Business / Enterprise | Obligatorio |

**Reglas a contemplar en el diseño:**

- La primera persona crea la organización y se convierte en su administrador.
- Los registros de usuario, organización, membresía y suscripción deberán persistirse de forma atómica **cuando se programe el backend**.
- El registro real deberá contar con validaciones, verificación de correo y medidas contra abuso cuando se implemente.
- En A2 se diseña el flujo visual, **no se crean organizaciones ni usuarios reales**.

### 5.2. Registro de empleados por invitación

Los empleados **no podrán solicitar acceso a una empresa escribiendo su nombre**. Solamente el administrador podrá invitarlos.

**Recorrido previsto:**

`Administrador → Miembros → Invitar → Correo y rol → Enlace temporal → Empleado inicia sesión o crea cuenta → Acepta → Membresía activada`

**Condiciones de negocio para reflejar en pantallas y mensajes:**

- Invitación de un solo uso y con vencimiento.
- Rol definido por el administrador.
- Correo del destinatario verificado frente a la cuenta que acepta.
- Comprobación del límite de usuarios del plan en creación y aceptación.
- Posibilidad de revocar invitaciones y membresías.
- Soporte futuro para usuarios pertenecientes a varias organizaciones autorizadas.
- **MVP escolar:** el administrador podrá copiar manualmente un enlace de invitación; no es obligatorio enviar correos automáticos.

### 5.3. Organizaciones de demostración

- **Astera Digital:** plan Business, 7 usuarios y políticas de aprobación específicas.
- **FaroWare Systems:** plan Team, 5 usuarios y límites de suscripción demostrables.

Sus cuentas y datos se crearán mediante seeders en **A3**. No se programará ese proceso durante A2.

---

## 6. Planes y su representación UX

Los tres planes de suscripción son **simulados**, sin pagos ni facturación real.

| Plan | Precio ficticio | Usuarios | Proyectos | Repositorios | Ejecuciones iniciadas por ReleaseVantra/mes | Función destacada |
|---|---:|---:|---:|---:|---:|---|
| Team | US$0/mes | 5 | 2 | 2 | 30 | Funciones y auditoría básicas |
| Business | US$29/mes | 15 | 8 | 8 | 150 | Analítica y reportes ampliados |
| Enterprise | US$199/mes | Sin cuota comercial | Sin cuota comercial | Sin cuota comercial | Sin cuota comercial | **Release Intelligence**, reglas de riesgo y analítica completa |

**Release Intelligence** será un módulo exclusivo de Enterprise y utilizará un puntaje de riesgo explicable basado en reglas ponderadas, no un modelo de IA entrenado.

El diseño mostrará límites, consumo y funcionalidades habilitadas de forma clara, sin sugerir que «ilimitado» significa recursos cloud o uso de GitHub sin restricciones técnicas.

---

## 7. Mapa de pantallas y rutas previstas

Las rutas son una **propuesta UX**, no un contrato definitivo de backend. Pueden ajustarse antes de implementarse, siempre que se documente el cambio.

### 7.1. Zona pública

| Ruta | Pantalla |
|---|---|
| `/` | Landing |
| `/features` | Funcionalidades |
| `/pricing` | Planes |
| `/login` | Inicio de sesión |
| `/register` | Cuenta de administrador |
| `/register/organization` | Alta de organización |
| `/invite/:token` | Aceptación de invitación |
| `/forgot-password` | Recuperación de acceso |

### 7.2. Zona empresarial y administrativa

| Ruta | Pantalla |
|---|---|
| `/app` | Dashboard |
| `/app/projects` | Proyectos |
| `/app/versions` | Versiones |
| `/app/requests` | Solicitudes |
| `/app/approvals` | Aprobaciones |
| `/app/executions` | Ejecuciones |
| `/app/incidents` | Incidentes |
| `/app/audit` | Auditoría |
| `/app/integrations/github` | Integración GitHub |
| `/app/members` | Miembros |
| `/app/subscription` | Suscripción |
| `/app/policies` | Políticas |
| `/app/intelligence` | Release Intelligence |
| `/app/settings` | Ajustes de usuario y empresa |

### 7.3. Alcance de prototipado

No es necesario completar cada pantalla funcional con todos sus formularios y variantes en A2. Se elaborará el **mapa global** y se implementarán **pantallas representativas navegables** que validen el diseño y la arquitectura UI.

---

## 8. Cinco flujos UX prioritarios

| Flujo | Recorrido | Consideración clave |
|---|---|---|
| Conectar GitHub | Administrador → Integraciones → Instalación → Repositorios | Estados conectado, pendiente, revocado y error |
| Solicitar despliegue | Desarrollador → Proyecto → Versión/commit → Ambiente/workflow → Justificación → Enviar | Mostrar claramente qué commit se solicita |
| Aprobar o rechazar | Aprobador → Bandeja → Detalle → Decisión | Indicador de aprobaciones requeridas; Astera necesita dos en Production |
| Ejecutar workflow | Operador → Autorizadas → Confirmar → Iniciar → Seguimiento | Distinguir cola, ejecución, éxito, fallo y estado desconocido |
| Release Intelligence | Usuario Enterprise autorizado → Solicitud → Riesgo → Factores/recomendación | Riesgo explicable; bloqueo y advertencia inequívocos |

Los datos mostrados en prototipos serán ficticios y estarán identificados como tales.

---

## 9. Sistema de componentes

**Base tecnológica:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui y Lucide, integrados en la estructura preparada durante A1. Se agrega **React Bits** únicamente para los tres componentes identificados en la landing y cualquier componente adicional que posteriormente se apruebe.

| Familia | Componentes previstos |
|---|---|
| Navegación | Sidebar, topbar, breadcrumbs, tabs, menú móvil |
| Formularios | Inputs, selects, textareas, validaciones, controles de fecha cuando proceda |
| Datos | Tablas, filtros, paginación, tarjetas de métricas |
| Acciones | Botones, menús contextuales, diálogos de confirmación |
| Retroalimentación | Toasts, alertas, loaders, skeletons, mensajes vacíos |
| Estados | Badges de solicitudes, pipelines, suscripciones y conexión GitHub |
| Seguridad UX | Acceso restringido, sesión vencida, permiso insuficiente |
| Visualización | Gráficas, líneas de tiempo, progreso de aprobaciones, nivel de riesgo |
| Hero público | React Bits `GradientASCII`, `TechText`, `TextType` |

Se definirán variantes para: `loading`, `empty`, `error`, `success`, `disabled`, permisos insuficientes, integración desconectada y respuesta pendiente de GitHub.

**Reglas de composición:**

- No duplicar componentes equivalentes ni instalar bibliotecas adicionales sin justificación.
- No llevar los efectos de hero a listados, tablas, modales, formularios de operación o páginas de auditoría.
- Evitar canvas/WebGL en áreas empresariales de uso frecuente, salvo una decisión nueva y justificada.
- Los efectos visuales nunca deben crear una falsa impresión de operación concluida o acceso autorizado.
- Adaptar componentes React Bits de JavaScript/CSS a TypeScript con tipos adecuados, manteniendo su comportamiento, verificando licencias y compatibilidad técnica.

---

## 10. Responsive, accesibilidad e interacción

- **Escritorio:** sidebar permanente, tablas y paneles completos; hero con composición amplia y fondo animado contenido.
- **Tablet:** sidebar colapsable y distribución adaptable.
- **Móvil:** navegación compacta, formularios verticales y tratamiento adecuado para tablas anchas; hero sin recortes del título o botones.
- Navegación por teclado y foco visible.
- Etiquetas y mensajes de error asociados a formularios.
- Contrastes compatibles con los objetivos de WCAG 2.2 AA.
- Información de estados comunicada con texto además de color.
- Diseño funcional incluso cuando la API no esté disponible o la integración GitHub falle.
- Efectos de la landing con alternativa estática para `prefers-reduced-motion`, falta de soporte gráfico o limitaciones de rendimiento.
- Probar que los efectos animados no provocan problemas de contraste, foco, interacción o desplazamiento de contenido.

La optimización es **web responsiva**; no se desarrollará una aplicación móvil nativa.

---

## 11. Qué se implementará en A2 y qué NO

### 11.1. Implementación prevista al autorizar A2

- Identidad y tokens de diseño oscuros.
- Landing pública, incluido hero a pantalla completa con `GradientASCII`, `TechText` y `TextType`.
- Navegación y rutas iniciales.
- Formularios **visuales** de registro, organización, selección de plan, login e invitación.
- Layout empresarial con sidebar y barra superior.
- Pantallas de ejemplo: dashboard, proyectos, solicitud/detalle, aprobaciones, integración GitHub y Release Intelligence.
- Componentes UI y estados reutilizables.
- Comportamiento responsivo y pruebas de presentación/navegación.
- Documentación de decisiones UX/UI y trazabilidad de referencias.

### 11.2. Fuera del alcance de A2

- Autenticación, sesiones, registro o invitaciones **funcionales**.
- Creación real de organizaciones y cuentas.
- RBAC o aislamiento multiempresa aplicados por backend.
- PostgreSQL, Prisma, DynamoDB o seeders.
- Suscripciones o consumo persistidos.
- GitHub App, tokens, webhooks y workflows reales.
- Solicitudes, aprobaciones y ejecuciones reales.
- Infraestructura y publicación AWS.
- Aplicación PaaS de Elastic Beanstalk.

**Principio UX:** los prototipos no deben fingir que se ha guardado información o ejecutado un workflow. Los botones de demostración deben tener un comportamiento claramente conceptual o conducir a una vista de ejemplo, no dar una confirmación engañosa de una operación inexistente.

---

## 12. Criterios de aceptación de la Fase A2

A2 podrá cerrarse después de su implementación cuando:

1. Se respeten la identidad monocromática oscura y los contrastes exigidos; hero con los tres componentes React Bits acordados o una degradación accesible cuando el entorno no los soporte.
2. La landing y el layout empresarial sean consistentes visualmente.
3. El mapa de pantallas y rutas esté documentado.
4. Se hayan diseñado los flujos de alta de organización e invitación de empleados.
5. Existan pantallas representativas navegables de los cinco procesos críticos.
6. Se hayan creado componentes reutilizables en lugar de estilos aislados.
7. Los estados de carga, error, vacío y permisos estén representados.
8. La interfaz sea utilizable en escritorio y móvil, con efectos no intrusivos y soporte para movimiento reducido.
9. Los datos ficticios estén claramente separados de resultados reales.
10. Continúen aprobando las pruebas y verificaciones heredadas de A1.
11. Exista documentación de componentes, navegación y decisiones visuales.
12. No se hayan implementado funciones pertenecientes a A3–A11 ni recursos AWS.

---

## 13. Estado y decisiones pendientes antes del prompt para Codex

**Planeación A2: cerrada como base de implementación.** Ya se recibieron la referencia estética principal y las tres fuentes de React Bits, por lo que **no es obligatorio buscar más componentes**.

**Acuerdos confirmados:**

- [x] Identidad oscura, minimalista, profesional; negro/blanco/gris con azul claro de acento.
- [x] Referencia de composición estética compartida por el usuario.
- [x] Hero de toda la primera pantalla.
- [x] `GradientASCII` de fondo, `TechText` para «ReleaseVantra» y `TextType` para subtítulos.
- [x] Landing y SaaS con la misma identidad, pero diferente intensidad de animaciones.
- [x] Rutas, mapa de pantallas, registro empresarial e invitaciones definidos para prototipado.
- [x] Alcance A2 visual y sin persistencia o autenticación real.

**Ajustes opcionales antes de implementar (no bloquean la entrega de este documento):**

- [ ] Referencias adicionales que el usuario quiera compartir (componentes, botones, tablas, navbar, etc.).
- [ ] Texto definitivo del hero, idioma final de marketing y mensajes de `TextType`.
- [ ] Decidir si el hero llevará mockup/visual lateral; si se omite, conservar jerarquía y espacios de la referencia.
- [ ] Afinar parámetros visuales de React Bits tras revisión en escritorio y móvil.

**Paso obligatorio siguiente:** redactar y revisar conjuntamente el **prompt técnico de implementación A2 para Codex** usando este documento y los archivos originales de los tres componentes. No iniciar implementación hasta que el usuario lo solicite.

---

## 14. Forma de trabajo acordada

1. Se conservan las referencias visuales ya proporcionadas; el usuario puede añadir otras si lo desea.
2. Revisamos cualquier detalle pendiente del hero o de la composición antes de fijar el prompt.
3. Preparamos juntos el prompt detallado para Codex.
4. Codex implementa **solo A2** sobre el repositorio existente.
5. Revisamos la interfaz, pruebas y documentación; corregimos lo necesario.
6. Cerramos A2 implementada antes de avanzar a A3.

**Estado al emitir este documento v1.1:** fase A2 **planificada, con referencias visuales integradas**, pero **no implementada ni aceptada técnicamente**.
