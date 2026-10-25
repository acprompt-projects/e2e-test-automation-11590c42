import { type Locator, type Page } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;
  abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto(this.path, { waitUntil: "domcontentloaded" });
  }

  heading(name: string): Locator {
    return this.page.getByRole("heading", { name });
  }

  async expectVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" });
  }
}