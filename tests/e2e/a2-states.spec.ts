import { expect, test } from '@playwright/test';

test('invitación, recuperación y estados accesibles no confirman operaciones reales', async ({
  page,
}) => {
  await page.goto('/invite/demo');
  await page.getByLabel('Tipo de cuenta').selectOption('new');
  await page.getByLabel('Nombre', { exact: true }).fill('Persona');
  await page.getByLabel('Apellidos', { exact: true }).fill('Invitada');
  await page.getByLabel('Correo electrónico').fill('demo@example.test');
  await page.getByLabel('Contraseña', { exact: true }).fill('clave-conceptual');
  await page.getByLabel('Confirmar contraseña', { exact: true }).fill('clave-conceptual');
  await page.getByRole('button', { name: 'Revisar aceptación conceptual' }).click();
  await expect(page.getByRole('status')).toContainText('ni se creó una membresía');
  await page.goto('/forgot-password');
  await page.getByLabel('Correo electrónico').fill('demo@example.test');
  await page.getByRole('button', { name: 'Ver recuperación conceptual' }).click();
  await expect(page.getByRole('status')).toContainText('no se envió ningún correo');
  await page.goto('/app/settings');
  await page.getByRole('tab', { name: 'Error', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Error de ejemplo');
  await page.getByRole('tab', { name: 'Deshabilitado', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Acción deshabilitada' })).toBeDisabled();
});

test('los menús móviles contienen el foco y cierran con Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const publicButton = page.getByRole('button', { name: 'Abrir navegación', exact: true });
  await publicButton.click();
  await page.keyboard.press('Escape');
  await expect(publicButton).toBeFocused();
  await expect(publicButton).toHaveAttribute('aria-expanded', 'false');
  await page.goto('/app');
  await expect(page.locator('.sidebar')).toHaveAttribute('inert', '');
  const appButton = page.getByRole('button', { name: 'Abrir menú empresarial' });
  await appButton.click();
  await expect(page.locator('.app-body')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(appButton).toBeFocused();
  await expect(page.locator('.sidebar')).toHaveAttribute('inert', '');
});
