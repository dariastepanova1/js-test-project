import { test as base, expect } from "@playwright/test";
import { GaragePage } from "../src";

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});

export { expect };
