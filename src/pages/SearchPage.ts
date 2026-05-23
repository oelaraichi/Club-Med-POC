import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { searchLocators } from '../locators/search.locators';

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectSearchEntryPointVisible(): Promise<void> {
    await expect(this.page.locator(searchLocators.searchLink).first()).toBeVisible();
  }
}
