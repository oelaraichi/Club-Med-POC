import { expect, Page } from "@playwright/test";

export class BasePage {
  protected constructor(protected readonly page: Page) {}

  // Navigate to the given URL and wait for the page DOM to be ready.
  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  // Accept cookies if a consent button is visible on the page.
  async acceptCookiesIfVisible(selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      const button = this.page.locator(selector).first();
      const isVisible = await button
        .isVisible({ timeout: 1500 })
        .catch(() => false);
      if (isVisible) {
        await button.click();
        return;
      }
    }
  }

  // Assert that a given text is visible somewhere on the page.
  async expectTextVisible(text: string | RegExp): Promise<void> {
    await expect(
      this.page.getByText(text, { exact: false }).first(),
    ).toBeVisible();
  }
}
