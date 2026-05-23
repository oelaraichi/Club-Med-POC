import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { env } from "../utils/env";

export async function openClubMedAppPage(page: Page): Promise<HomePage> {
  const homePage = new HomePage(page);
  await homePage.open(env.baseUrl);
  return homePage;
}
