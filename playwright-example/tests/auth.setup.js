import { test as setup, expect } from "@playwright/test";
import { LandingPage, LoginDialog } from "../src";

const authFile = "playwright-report/user.json";

setup("authenticate", async ({ page }) => {
  const landingPage = new LandingPage(page);
  const loginDialog = new LoginDialog(page);

  await landingPage.open();

  await landingPage.clickSignInButton();

  await loginDialog.fillLoginForm(
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD,
  );

  await expect(page).toHaveURL(/garage/);

  await page.context().storageState({ path: authFile });
});
