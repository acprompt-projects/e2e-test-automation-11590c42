import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Seed e2e test user via health-check endpoint
  await page.goto(`${baseURL}/api/seed?email=e2e-user@test.com&password=SecureP@ss1`);
  await page.waitForLoadState('networkidle');

  // Store auth state for reuse
  await page.goto(`${baseURL}/login`);
  await page.getByLabel(/email/i).fill('e2e-user@test.com');
  await page.getByLabel(/password/i).fill('SecureP@ss1');
  await page.getByRole('button', { name: /log in|sign in/i }).click();
  await page.waitForURL(/\/dashboard/);
  await page.context().storageState({ path: '.auth/user.json' });

  await browser.close();
}

export default globalSetup;