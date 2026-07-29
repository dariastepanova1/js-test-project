import { BasePage } from "../BasePage.pom.js";

export class ProfilePage extends BasePage {
  selectors = {
    profileName: this._page.locator(".profile_name.display-4"),
  };

  constructor(page) {
    super(page, "/panel/profile");
  }

  async getProfileName() {
    return await this.selectors.profileName.textContent();
  }
}