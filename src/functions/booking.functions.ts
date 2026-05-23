import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

export async function verifyDownloadJourneyEntryPoints(page: Page): Promise<void> {
  const homePage = new HomePage(page);
  await homePage.expectDownloadSectionVisible();
  await homePage.expectStoreLinksVisible();
}

export async function verifySearchJourneyEntryPoint(page: Page): Promise<void> {
  const searchPage = new SearchPage(page);
  await searchPage.expectSearchEntryPointVisible();
}
