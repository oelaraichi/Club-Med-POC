import dotenv from "dotenv";

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL || "https://www.clubmed.fr/l/my-club-med-app",
  browser: process.env.BROWSER || "chromium",
  headless: process.env.PW_HEADLESS !== "false",
};
