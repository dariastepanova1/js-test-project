import { BasePage } from "../BasePage.pom.js";

export class LeftNavBar extends BasePage {
  selectors = {
    genericNavItem: (itemName) =>
      this._page.locator('[class*="sidebar"] a', { hasText: itemName }),
  };

  constructor(page) {
    super(page);
  }

  async clickNavItem(itemName) {
    await this.selectors.genericNavItem(itemName).click();
  }
}
