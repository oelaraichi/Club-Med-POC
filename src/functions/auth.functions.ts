import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function verifyAuthenticationEntryPoints(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.expectLoginEntryPointsVisible();
}
