import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  Status,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from "@playwright/test";
import { env } from "../../src/utils/env";
import { CustomWorld } from "./world";

setDefaultTimeout(env.stepTimeoutMs);

let sharedBrowser: Browser | undefined;
let sharedContext: BrowserContext | undefined;
let sharedPage: Page | undefined;

BeforeAll(async function () {
  // Select Playwright engine from env, defaulting to Chromium.
  const browserType =
    env.browser === "firefox"
      ? firefox
      : env.browser === "webkit"
        ? webkit
        : chromium;

  // Start a single browser instance for the whole test run.
  sharedBrowser = await browserType.launch({
    headless: env.headless,
    slowMo: env.slowMo,
  });

  // Keep one context + one page for all scenarios in the run.
  sharedContext = await sharedBrowser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  sharedPage = await sharedContext.newPage();
});

Before(async function (this: CustomWorld) {
  if (!sharedBrowser || !sharedContext || !sharedPage) {
    throw new Error("Shared browser context was not initialized in BeforeAll.");
  }

  // Reuse the same browser/context/page for the whole suite.
  this.browser = sharedBrowser;
  this.context = sharedContext;
  this.page = sharedPage;
});

After(async function (this: CustomWorld, scenario) {
  // Attach a full-page screenshot only when a scenario fails.
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");
  }

  // Context/page are intentionally kept alive until AfterAll.
});

AfterAll(async function () {
  // Keep browser visible for observation before teardown.
  if (env.holdBrowserMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, env.holdBrowserMs));
  }

  await sharedContext?.close();
  await sharedBrowser?.close();
  sharedPage = undefined;
  sharedContext = undefined;
  sharedBrowser = undefined;
});
