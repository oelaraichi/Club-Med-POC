import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { loginLocators } from '../locators/login.locators';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoginEntryPointsVisible(): Promise<void> {
    await expect(this.page.locator(loginLocators.loginLink).first()).toBeVisible();
    await expect(this.page.locator(loginLocators.createAccountLink).first()).toBeVisible();
  }
}
