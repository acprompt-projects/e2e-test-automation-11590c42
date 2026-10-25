import { test, expect } from "../../fixtures/test-fixtures";

test.describe("Framework smoke checks", () => {
  test("documentation portal responds", async ({ cleanPage }) => {
    const response = await cleanPage.request.get("/");
    expect(response.status()).toBeLessThan(500);
  });

  test("auth gateway health endpoint is reachable", async ({ cleanPage }) => {
    const response = await cleanPage.request.get("/auth/health");
    expect(response.ok()).toBeTruthy();
  });
});