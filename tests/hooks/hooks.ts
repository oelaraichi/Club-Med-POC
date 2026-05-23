import { After, Before, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { env } from '../../src/utils/env';
import { CustomWorld } from './world';

Before(async function (this: CustomWorld) {
  const browserType = env.browser === 'firefox' ? firefox : env.browser === 'webkit' ? webkit : chromium;
  this.browser = await browserType.launch({ headless: env.headless });
  this.context = await this.browser.newContext({ viewport: { width: 1440, height: 900 } });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }

  await this.context?.close();
  await this.browser?.close();
});
