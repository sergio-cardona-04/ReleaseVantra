import { expect, test } from '@playwright/test';

test('landing con identidad, efectos reales y navegación sin errores', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ReleaseVantra');
  await expect(page.locator('.tech-text')).toHaveAttribute('data-rendered', 'true');
  await expect(page.locator('.gradient-ascii-canvas')).toBeVisible();
  await expect(page.locator('.text-type')).toBeVisible();
  await page.getByRole('button', { name: 'Pausar animaciones' }).click();
  await expect(page.locator('.gradient-ascii-canvas')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Reanudar animaciones' }).click();
  await expect(page.locator('.gradient-ascii-canvas')).toBeVisible();
  await page.getByRole('link', { name: 'Explorar funciones', exact: true }).click();
  await expect(page).toHaveURL(/#features/);
  expect(errors).toEqual([]);
});

const publicRoutes: [string, string][] = [
  ['/features', 'Contexto para cada versión.'],
  ['/pricing', 'Un espacio para tu equipo.'],
  ['/login', 'Bienvenido de nuevo.'],
  ['/register', 'Crea tu cuenta de administrador.'],
  ['/register/organization', 'Un espacio para tu organización.'],
  ['/forgot-password', 'Recupera tu acceso.'],
  ['/invite/demo', 'Una invitación para tu equipo.'],
  ['/docs', 'La base de ReleaseVantra.'],
];
test('todas las rutas públicas tienen contenido identificable', async ({ page }) => {
  for (const [route, title] of publicRoutes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  }
  await page.goto('/invite/caducada');
  await expect(page.getByRole('heading', { name: 'Invitación caducada o inválida' })).toBeVisible();
  await page.goto('/ruta-inexistente');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta ruta no existe.');
});

test('navegación empresarial y datos por organización', async ({ page }) => {
  await page.goto('/app');
  const nav = page.getByRole('navigation', { name: 'Navegación empresarial', exact: true });
  for (const label of [
    'Proyectos',
    'Versiones',
    'Solicitudes',
    'Aprobaciones',
    'Ejecuciones',
    'Incidentes',
    'Auditoría',
    'GitHub',
    'Miembros',
    'Suscripción',
    'Políticas',
    'Release Intelligence',
    'Configuración',
    'Dashboard',
  ]) {
    await nav.getByRole('link', { name: label, exact: label !== 'Aprobaciones' }).click();
    await expect(page.locator('main h1')).toBeVisible();
  }
  await nav.getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page.getByText('Atlas API', { exact: true })).toBeVisible();
  await page.getByLabel('Organización de demostración').selectOption('faro');
  await expect(page.getByText('Faro API', { exact: true })).toBeVisible();
  await expect(page.getByText('Atlas API', { exact: true })).toHaveCount(0);
  await page.reload();
  await expect(page.getByLabel('Organización de demostración')).toHaveValue('astera');
});

test('filtros y detalles de proyecto funcionan', async ({ page }) => {
  await page.goto('/app/projects');
  await page.getByLabel('Buscar proyectos').fill('Atlas');
  await expect(page.getByRole('row')).toHaveCount(2);
  await page.getByRole('link', { name: 'Ver proyecto', exact: true }).click();
  await expect(page.locator('main h1')).toHaveText('Atlas API');
  await page.getByRole('link', { name: 'Preparar solicitud', exact: true }).click();
  await expect(page.getByLabel('Commit SHA de ejemplo')).toHaveValue('c8e4a21');
});

test('dos aprobaciones Production y diálogo sin mutaciones', async ({ page }) => {
  await page.goto('/app/requests/REQ-024');
  await expect(
    page.getByText('Production requiere 2 revisiones independientes en este ejemplo.'),
  ).toBeVisible();
  const before = await page.locator('.approval-count').textContent();
  const button = page.getByRole('button', { name: 'Aprobar · demo', exact: true });
  await button.click();
  await expect(page.getByRole('dialog')).toContainText('En A2 no se registra ninguna decisión.');
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  expect(await page.locator('.approval-count').textContent()).toEqual(before);
});

test('los cinco roles cambian recorridos sin crear una sesión', async ({ page }) => {
  await page.goto('/app');
  for (const role of ['ADMIN', 'DEVELOPER', 'APPROVER', 'OPERATOR', 'AUDITOR']) {
    await page.getByLabel('Rol visual').selectOption(role);
    await expect(page.getByRole('link', { name: 'Dashboard', exact: true })).toBeVisible();
  }
  await expect(page.getByRole('link', { name: 'Miembros', exact: true })).toHaveCount(0);
  expect(
    await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })),
  ).toEqual({ local: 0, session: 0 });
});

test('estados GitHub y ejecución son solo ejemplos', async ({ page }) => {
  await page.goto('/app/integrations/github');
  for (const state of [
    'Instalación autorizada',
    'Repositorios disponibles',
    'Workflows autorizados',
    'Error de conexión',
    'Acceso revocado',
    'Sin conexión',
  ]) {
    await page.getByLabel('Estado de demostración').selectOption(state);
    await expect(page.locator('.panel-heading .badge')).toHaveText(state);
  }
  await page.goto('/app/executions');
  for (const state of [
    'Solicitada',
    'Enviándose',
    'En cola',
    'Ejecutándose',
    'Completada',
    'Fallida',
    'Resultado desconocido',
  ]) {
    await page.getByLabel('Estado de demostración').selectOption(state);
    await expect(page.locator('.execution-state .badge')).toHaveText(state);
  }
  await expect(page.locator('.execution-state')).toContainText('No debe reintentarse ciegamente.');
});

test('Enterprise muestra riesgo fijo y Team respeta cuota de miembros', async ({ page }) => {
  await page.goto('/app/intelligence');
  await expect(page.getByRole('heading', { name: 'Disponible en Enterprise' })).toBeVisible();
  await page.getByLabel('Plan visual').selectOption('Enterprise');
  await expect(page.locator('.risk-score')).toHaveText('42/ 100');
  await expect(page.getByText('Bloqueo: aprobaciones incompletas')).toBeVisible();
  await page.getByRole('link', { name: 'Miembros', exact: true }).click();
  await page.getByLabel('Organización de demostración').selectOption('faro');
  await expect(page.getByRole('button', { name: 'Ver invitación conceptual' })).toBeDisabled();
});

test('registro accesible sin persistencia ni peticiones de negocio', async ({ page }) => {
  const mutations: string[] = [];
  page.on('request', (r) => {
    if (r.method() !== 'GET') mutations.push(r.url());
  });
  await page.goto('/register?plan=Business');
  await page.getByRole('button', { name: 'Continuar a organización' }).click();
  await expect(page.getByLabel('Nombre', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Nombre', { exact: true }).fill('Persona');
  await page.getByLabel('Apellidos', { exact: true }).fill('De prueba');
  await page.getByLabel('Correo electrónico', { exact: true }).fill('demo@example.test');
  await page.getByLabel('Contraseña', { exact: true }).fill('prueba-segura-123');
  await page.getByLabel('Confirmar contraseña', { exact: true }).fill('diferente');
  await page.getByRole('button', { name: 'Continuar a organización' }).click();
  await expect(page.getByText('Las contraseñas deben coincidir.')).toBeVisible();
  await page.getByLabel('Confirmar contraseña', { exact: true }).fill('prueba-segura-123');
  await page.getByRole('button', { name: 'Continuar a organización' }).click();
  await page.getByLabel('Nombre de la empresa').fill('Equipo Visual');
  await expect(page.getByLabel('Slug de la organización')).toHaveValue('equipo-visual');
  await page.getByRole('button', { name: 'Continuar a planes' }).click();
  await page.getByRole('button', { name: 'Ver confirmación conceptual' }).click();
  await expect(
    page.getByRole('heading', { name: 'Vista de confirmación conceptual' }),
  ).toBeVisible();
  expect(await page.evaluate(() => JSON.stringify([localStorage, sessionStorage]))).not.toContain(
    'prueba-segura',
  );
  expect(mutations).toEqual([]);
});

test('login muestra contraseña, carga y limitación explícita', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Correo electrónico').fill('demo@example.test');
  await page.getByLabel('Contraseña', { exact: true }).fill('clave-de-prueba');
  await page.getByRole('button', { name: 'Mostrar contraseña', exact: true }).click();
  await expect(page.getByLabel('Contraseña', { exact: true })).toHaveAttribute('type', 'text');
  await page.getByRole('button', { name: 'Revisar inicio de sesión' }).click();
  await expect(page.getByRole('button', { name: 'Mostrando estado de carga…' })).toBeDisabled();
  await expect(page.getByRole('status')).toContainText('Inicio de sesión no disponible en A2.');
  await expect(page.getByLabel('Contraseña', { exact: true })).toHaveValue('');
});

test('movimiento reducido y ausencia de WebGL conservan contenido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.gradient-ascii-canvas')).toHaveCount(0);
  await expect(page.locator('.tech-text')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ReleaseVantra');
  await expect(page.locator('.hero-subtitle')).toHaveText('Controla cada versión.');
  await page.waitForTimeout(700);
  await expect(page.locator('.hero-subtitle')).toHaveText('Controla cada versión.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const withoutWebGL = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).startsWith('webgl')) return null;
      return original.apply(this, args);
    };
    HTMLCanvasElement.prototype.getContext = withoutWebGL as typeof original;
  });
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Comenzar gratis', exact: true }).last(),
  ).toBeVisible();
});

test('diseño sin desbordamiento en móvil y tablet, menú y foco', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 820, 1440]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 1024 });
    for (const route of ['/', '/login', '/app', '/app/requests/REQ-024']) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${route} a ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.getByRole('button', { name: 'Abrir navegación', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Navegación pública móvil' })
    .getByRole('link', { name: 'Planes', exact: true })
    .click();
  await expect(page.locator('main h1')).toHaveText('Un espacio para tu equipo.');
  await page.goto('/app');
  await page.getByRole('button', { name: 'Abrir menú empresarial' }).click();
  await page
    .getByRole('navigation', { name: 'Navegación empresarial', exact: true })
    .getByRole('link', { name: 'Proyectos', exact: true })
    .click();
  await expect(page.locator('main h1')).toHaveText('Proyectos');
});
