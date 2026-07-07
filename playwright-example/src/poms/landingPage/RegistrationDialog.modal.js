import { BasePage } from "../BasePage.pom.js";

export class RegistrationDialog extends BasePage {
  selectors = {
    firstNameInput: this._page.locator('input[id="signupName"]'),
    lastNameInput: this._page.locator('input[id="signupLastName"]'),
    emailInput: this._page.locator('input[id="signupEmail"]'),
    passwordInput: this._page.locator('input[id="signupPassword"]'),
    repeatPasswordInput: this._page.locator('input[id="signupRepeatPassword"]'),
    genericInputValidationError: (errorText) =>
      this._page.locator('div[class="invalid-feedback"] p', {
        hasText: errorText,
      }),
    registerButton: this._page.getByRole("button", { name: "Register" }),
  };

  async fillFirstName(firstName) {
    await this.selectors.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.selectors.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.selectors.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.selectors.passwordInput.fill(password);
  }

  async fillRepeatPassword(repeatPassword) {
    await this.selectors.repeatPasswordInput.fill(repeatPassword);
  }

  async fillRegistrationForm(
    firstName,
    lastName,
    email,
    password
  ) {
    await this.selectors.firstNameInput.fill(firstName);
    await this.selectors.lastNameInput.fill(lastName);
    await this.selectors.emailInput.fill(email);
    await this.selectors.passwordInput.fill(password);
    await this.selectors.repeatPasswordInput.fill(password);
  }

  async clickRegisterButton() {
    await this.selectors.registerButton.click();
  }
}
