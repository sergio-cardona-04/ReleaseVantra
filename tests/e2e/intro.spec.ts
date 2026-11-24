import { expect, test } from '@playwright/test';

test('el frontend consulta la API real a través del proxy de Vite', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const healthRequest = page.waitForResponse('**/api/health');
  await page.goto('/');

  await expect(page).toHaveTitle('ReleaseVantra | Entorno de desarrollo');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Entorno de desarrollo preparado.',
  );
  await expect(page.getByRole('status')).toHaveText('API conectada');
  const health = await healthRequest;
  expect(health.status()).toBe(200);
  expect(await health.json()).toEqual({ status: 'ok' });
  expect(errors).toEqual([]);

  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('muestra el fallo de API y permite recuperar la conexión', async ({ page }) => {
  await page.route('**/api/health', (route) => route.fulfill({ status: 503, body: '{}' }));
  await page.goto('/');
  await expect(page.getByRole('status')).toHaveText('No se pudo conectar con la API');
  await page.unroute('**/api/health');
  await page.getByRole('button', { name: 'Reintentar conexión' }).click();
  await expect(page.getByRole('status')).toHaveText('API conectada');
});

test('una respuesta inválida no se presenta como conexión correcta', async ({ page }) => {
  await page.route('**/api/health', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'unexpected' }),
    }),
  );
  await page.goto('/');
  await expect(page.getByRole('status')).toHaveText('No se pudo conectar con la API');
});
