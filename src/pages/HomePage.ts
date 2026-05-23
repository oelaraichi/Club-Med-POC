import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { homeLocators } from "../locators/home.locators";
import { appData } from "../utils/testData";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Open the Club Med App landing page and accept cookies if shown.
  async open(baseUrl: string): Promise<void> {
    await this.goto(baseUrl);
    await this.acceptCookiesIfVisible(homeLocators.cookieConsentButton);
  }

  // Verify that the home page is loaded by checking title and main heading.
  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(appData.pageTitle);
    await expect(
      this.page
        .locator(homeLocators.mainHeading)
        .filter({ hasText: appData.mainHeading }),
    ).toBeVisible();
  }

  // Verify that the download section text is visible.
  async expectDownloadSectionVisible(): Promise<void> {
    await this.expectTextVisible(appData.downloadSection);
  }

  // Verify that both App Store and Google Play links are visible.
  async expectStoreLinksVisible(): Promise<void> {
    const appStoreLink = this.page.locator(homeLocators.appStoreLink).first();
    const googlePlayLink = this.page
      .locator(homeLocators.googlePlayLink)
      .first();

    await this.smoothScrollTo(appStoreLink, 1000);
    await expect(appStoreLink).toBeVisible();
    await this.smoothScrollTo(googlePlayLink, 700);
    await expect(googlePlayLink).toBeVisible();
  }
}
