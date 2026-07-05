import { type Page, type Locator } from '@playwright/test';

export class AuthPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly navbarUserBadge: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole('button', { name: /log in|sign in/i });
    this.errorMessage = page.getByRole('alert');
    this.navbarUserBadge = page.locator('[data-testid="user-badge"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}