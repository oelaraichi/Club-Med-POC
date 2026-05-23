import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";

// Shared test container injected into each Cucumber scenario.
export class CustomWorld extends World {
  // Populated in Before hook and consumed by step definitions.
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// Register custom world so Cucumber instantiates it per scenario.
setWorldConstructor(CustomWorld);
