import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly welcomeHeading: Locator;
  readonly sidebar: Locator;
  readonly sidebarEntitiesLink: Locator;
  readonly sidebarDocsLink: Locator;
  readonly breadcrumb: Locator;
  readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.welcomeHeading = page.getByRole('heading', { level: 1 });
    this.sidebar = page.locator('[data-testid="sidebar"]');
    this.sidebarEntitiesLink = this.sidebar.getByRole('link', { name: /entities/i });
    this.sidebarDocsLink = this.sidebar.getByRole('link', { name: /docs|documentation/i });
    this.breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    this.logoutButton = page.getByRole('button', { name: /log out|sign out/i });
  }
}