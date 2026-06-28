// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Hillel/);
});

test("registration modal appears", async ({ page }) => {
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(
    page.getByRole("heading", { name: "Registration" }),
  ).toBeVisible();
});
