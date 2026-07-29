import { test, expect } from "../fixtures/userGarage.fixtures.js";

test("User can open Garage page", async ({ userGaragePage }) => {
  await expect(userGaragePage.selectors.addCarButton).toBeVisible();
});