import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { homeLocators } from '../locators/home.locators';
import { appData } from '../utils/testData';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(baseUrl: string): Promise<void> {
    await this.goto(baseUrl);
    await this.acceptCookiesIfVisible(homeLocators.cookieConsentButton);
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(appData.pageTitle);
    await expect(this.page.locator(homeLocators.mainHeading).filter({ hasText: appData.mainHeading })).toBeVisible();
  }

  async expectDownloadSectionVisible(): Promise<void> {
    await this.expectTextVisible(appData.downloadSection);
  }

  async expectStoreLinksVisible(): Promise<void> {
    await expect(this.page.locator(homeLocators.appStoreLink).first()).toBeVisible();
    await expect(this.page.locator(homeLocators.googlePlayLink).first()).toBeVisible();
  }
}
