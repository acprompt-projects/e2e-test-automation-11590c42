import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/auth.page';
import { DashboardPage } from './pages/dashboard.page';

test.describe('Dashboard navigation', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const auth = new AuthPage(page);
    await auth.goto();
    await auth.login('e2e-user@test.com', 'SecureP@ss1');
    dashboard = new DashboardPage(page);
  });

  test('displays welcome message and sidebar', async () => {
    await expect(dashboard.welcomeHeading).toBeVisible();
    await expect(dashboard.sidebar).toBeVisible();
  });

  test('navigates to entities list via sidebar', async ({ page }) => {
    await dashboard.sidebarEntitiesLink.click();
    await expect(page).toHaveURL(/\/entities/);
  });

  test('navigates to documentation portal via sidebar', async ({ page }) => {
    await dashboard.sidebarDocsLink.click();
    await expect(page).toHaveURL(/\/docs/);
  });

  test('breadcrumb updates correctly on nested navigation', async ({ page }) => {
    await dashboard.sidebarEntitiesLink.click();
    await page.locator('[data-testid="entity-row"]').first().click();
    await expect(dashboard.breadcrumb).toContainText('Entities');
  });
});