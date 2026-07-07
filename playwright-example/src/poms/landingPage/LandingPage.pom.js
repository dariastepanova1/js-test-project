import { BasePage } from "../BasePage.pom.js";

export class LandingPage extends BasePage {
  selectors = {
    signUpButton: this._page.getByRole("button", {
      name: "Sign up",
      exact: true,
    }),
  };

  constructor(page) {
    super(page, "/");
  }

  async clickSignUpButton() {
    await this.selectors.signUpButton.click();
  }
}
