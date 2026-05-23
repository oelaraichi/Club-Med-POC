import { Given, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../hooks/world";
import { openClubMedAppPage } from "../../src/functions/common.functions";
import { verifyDownloadJourneyEntryPoints } from "../../src/functions/booking.functions";
import { HomePage } from "../../src/pages/HomePage";

Given(
  "je suis sur la page My Club Med App",
  async function (this: CustomWorld) {
    await openClubMedAppPage(this.page);
  },
);

Then(
  "la page My Club Med App est affichée correctement",
  async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.expectPageLoaded();
  },
);

Then(
  "la section de téléchargement est visible",
  async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.expectDownloadSectionVisible();
  },
);

Then(
  "les liens App Store et Google Play sont disponibles",
  async function (this: CustomWorld) {
    await verifyDownloadJourneyEntryPoints(this.page);
  },
);
