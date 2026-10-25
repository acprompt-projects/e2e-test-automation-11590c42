import { test as base, expect, type Page } from "@playwright/test";

export { expect };

const baseURL = process.env.E2E_BASE_URL ?? "https://staging.example.com";

type Fixtures = {
  cleanPage: Page;
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  cleanPage: async ({ page }, use) => {
    await page.context().clearCookies();
    await use(page);
  },

  authenticatedPage: async ({ page }, use) => {
    const token = process.env.E2E_AUTH_TOKEN;
    if (!token) {
      throw new Error("E2E_AUTH_TOKEN must be set for authenticated tests");
    }
    const { hostname } = new URL(baseURL);
    await page.context().addCookies([
      {
        name: "session_token",
        value: token,
        domain: hostname,
        path: "/",
        httpOnly: true,
      },
    ]);
    await use(page);
  },
});