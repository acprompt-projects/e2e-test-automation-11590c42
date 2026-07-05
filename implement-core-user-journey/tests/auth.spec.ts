import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/auth.page';
import { DashboardPage } from './pages/dashboard.page';

test.describe('Authentication flow', () => {
  let auth: AuthPage;

  test.beforeEach(async ({ page }) => {
    auth = new AuthPage(page);
    await auth.goto();
  });

  test('successful login with valid credentials', async ({ page }) => {
    await auth.login('e2e-user@test.com', 'SecureP@ss1');
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(auth.navbarUserBadge).toBeVisible();
  });

  test('shows error on invalid credentials', async () => {
    await auth.login('e2e-user@test.com', 'wrong-password');
    await expect(auth.errorMessage).toBeVisible();
    await expect(auth.errorMessage).toContainText(/invalid/i);
  });

  test('shows validation error for empty email', async () => {
    await auth.emailInput.fill('');
    await auth.submitButton.click();
    await expect(auth.emailInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('redirects unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('logout clears session and redirects', async ({ page }) => {
    await auth.login('e2e-user@test.com', 'SecureP@ss1');
    const dashboard = new DashboardPage(page);
    await dashboard.logoutButton.click();
    await expect(page).toHaveURL(/\/login/);
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});