import { expect, Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async acceptCookiesIfVisible(selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      const button = this.page.locator(selector).first();
      if (await button.isVisible({ timeout: 1500 }).catch(() => false)) {
        await button.click();
        return;
      }
    }
  }

  async expectTextVisible(text: string | RegExp): Promise<void> {
    await expect(this.page.getByText(text, { exact: false }).first()).toBeVisible();
  }
}
