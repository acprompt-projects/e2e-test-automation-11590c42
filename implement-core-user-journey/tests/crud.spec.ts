import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/auth.page';
import { DashboardPage } from './pages/dashboard.page';

test.describe('Entity CRUD operations', () => {
  const entityName = `Test Entity ${Date.now()}`;
  const updatedName = `Updated ${entityName}`;

  test.beforeEach(async ({ page }) => {
    const auth = new AuthPage(page);
    await auth.goto();
    await auth.login('e2e-user@test.com', 'SecureP@ss1');
    const dashboard = new DashboardPage(page);
    await dashboard.sidebarEntitiesLink.click();
    await expect(page).toHaveURL(/\/entities/);
  });

  test('creates a new entity', async ({ page }) => {
    await page.getByRole('button', { name: /create|add/i }).click();
    await page.getByLabel(/name/i).fill(entityName);
    await page.getByLabel(/description/i).fill('Created by e2e test');
    await page.getByRole('button', { name: /save|submit/i }).click();
    await expect(page.getByText(entityName)).toBeVisible();
  });

  test('reads entity detail', async ({ page }) => {
    await page.locator('[data-testid="entity-row"]').filter({ hasText: entityName }).click();
    await expect(page.getByText(entityName)).toBeVisible();
    await expect(page.getByText('Created by e2e test')).toBeVisible();
  });

  test('updates an existing entity', async ({ page }) => {
    await page.locator('[data-testid="entity-row"]').filter({ hasText: entityName }).click();
    await page.getByRole('button', { name: /edit/i }).click();
    await page.getByLabel(/name/i).clear();
    await page.getByLabel(/name/i).fill(updatedName);
    await page.getByRole('button', { name: /save|update/i }).click();
    await expect(page.getByText(updatedName)).toBeVisible();
  });

  test('deletes an entity', async ({ page }) => {
    await page.locator('[data-testid="entity-row"]').filter({ hasText: updatedName }).click();
    await page.getByRole('button', { name: /delete/i }).click();
    await page.getByRole('button', { name: /confirm/i }).click();
    await expect(page.getByText(updatedName)).not.toBeVisible();
  });
});