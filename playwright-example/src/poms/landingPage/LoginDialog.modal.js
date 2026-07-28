import { BasePage } from "../BasePage.pom.js";

export class LoginDialog extends BasePage {
  selectors = {
    emailInput: this._page.locator('input[id="signinEmail"]'),
    passwordInput: this._page.locator('input[id="signinPassword"]'),
    loginButton: this._page.getByRole("button", {
      name: "Login",
      exact: true,
    }),
  };

  constructor(page) {
    super(page, "/");
  }

  async fillLoginForm(
    email,
    password
  ) {
    await this.selectors.emailInput.fill(email);
    await this.selectors.passwordInput.fill(password);
    await this.selectors.loginButton.click();
  }
}
