import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

export async function verifyDownloadJourneyEntryPoints(
  page: Page,
): Promise<void> {
  const homePage = new HomePage(page);
  await homePage.expectDownloadSectionVisible();
  await homePage.expectStoreLinksVisible();
}
