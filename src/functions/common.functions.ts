import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { env } from "../utils/env";

// Single entry-point used by step definitions to open the tested page.
export async function openClubMedAppPage(page: Page): Promise<HomePage> {
  const homePage = new HomePage(page);
  // Keep URL source centralized in env to avoid hardcoding in steps.
  await homePage.open(env.baseUrl);
  return homePage;
}
