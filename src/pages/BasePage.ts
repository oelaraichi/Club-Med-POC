import { expect, Locator, Page } from "@playwright/test";

// Shared primitives reused by page objects to keep steps concise.
export class BasePage {
  protected constructor(protected readonly page: Page) {}

  // Navigate to the given URL and wait for the page DOM to be ready.
  async goto(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  // Accept cookies as soon as a consent button appears.
  async acceptCookiesIfVisible(
    selectors: string[],
    timeoutMs = 5000,
    preClickDelayMs = 700,
    postClickDelayMs = 500,
  ): Promise<void> {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      // Try selectors in order because cookie banners vary by locale/variant.
      for (const selector of selectors) {
        const button = this.page.locator(selector).first();
        const isVisible = await button.isVisible().catch(() => false);
        if (isVisible) {
          // Keep a short visual pause so cookie click is clearly observable.
          if (preClickDelayMs > 0) {
            await this.page.waitForTimeout(preClickDelayMs);
          }
          await button.click({ timeout: 1000 });
          if (postClickDelayMs > 0) {
            await this.page.waitForTimeout(postClickDelayMs);
          }
          return;
        }
      }

      // Short polling interval so click happens quickly when banner appears.
      await this.page.waitForTimeout(100);
    }
  }

  // Assert that a given text is visible somewhere on the page.
  async expectTextVisible(text: string | RegExp): Promise<void> {
    await expect(
      this.page.getByText(text, { exact: false }).first(),
    ).toBeVisible();
  }

  // Smoothly scroll to a locator so movement is visible during headed runs.
  async smoothScrollTo(locator: Locator, holdMs = 800): Promise<void> {
    const target = locator.first();
    await target.waitFor({ state: "attached" });
    await target.evaluate((node) => {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    await this.page.waitForTimeout(holdMs);
  }
}
