import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

// Validate the download funnel entry points exposed on home page.
export async function verifyDownloadJourneyEntryPoints(
  page: Page,
): Promise<void> {
  const homePage = new HomePage(page);
  // First ensure the section exists before checking store CTAs.
  await homePage.expectDownloadSectionVisible();
  await homePage.expectStoreLinksVisible();
}
