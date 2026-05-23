import dotenv from "dotenv";

dotenv.config();

const slowMo = Number.parseInt(process.env.PW_SLOW_MO || "0", 10);
const stepTimeoutMs = Number.parseInt(process.env.CUCUMBER_TIMEOUT_MS || "30000", 10);
const holdBrowserMs = Number.parseInt(process.env.PW_HOLD_BROWSER_MS || "0", 10);

export const env = {
  baseUrl: process.env.BASE_URL || "https://www.clubmed.fr/l/my-club-med-app",
  browser: process.env.BROWSER || "chromium",
  headless: process.env.PW_HEADLESS !== "false",
  slowMo: Number.isNaN(slowMo) ? 0 : slowMo,
  stepTimeoutMs: Number.isNaN(stepTimeoutMs) ? 30000 : stepTimeoutMs,
  holdBrowserMs: Number.isNaN(holdBrowserMs) ? 0 : holdBrowserMs,
};
