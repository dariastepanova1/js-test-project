import { BasePage } from "../BasePage.pom.js";

export class LandingPage extends BasePage {
  selectors = {
    signUpButton: this._page.getByRole("button", {
      name: "Sign up",
      exact: true,
    }),
    signInButton: this._page.getByRole("button", {
      name: "Sign In",
      exact: true,
    }),
  };

  constructor(page) {
    super(page, "/");
  }

  async clickSignUpButton() {
    await this.selectors.signUpButton.click();
  }

  async clickSignInButton() {
    await this.selectors.signInButton.click();
  }
}
