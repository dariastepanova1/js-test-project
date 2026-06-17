export class RegistrationDialog {
  selectors = {
    firstNameInput: () =>
      cy.get('[class="modal-content"] input[id="signupName"]'),
    lastNameInput: () =>
      cy.get('[class="modal-content"] input[id="signupLastName"]'),
    emailInput: () => cy.get('[class="modal-content"] input[id="signupEmail"]'),
    passwordInput: () =>
      cy.get('[class="modal-content"] input[id="signupPassword"]'),
    confirmPasswordInput: () =>
      cy.get('[class="modal-content"] input[id="signupRepeatPassword"]'),
    registerButton: () =>
      cy.contains('[class="modal-content"] button', "Register"),
    closeCrossButton: () =>
      cy.contains('[class="modal-content"] button', "Close"),
    errorLine: () => cy.get('div[class="invalid-feedback"] p'),
  };

  clickCloseCross() {
    this.selectors.closeCrossButton().click();
  }

  clickRegister() {
    this.selectors.registerButton().click();
  }

  fillFirstName(firstName) {
    this.selectors.firstNameInput().type(firstName);
  }

  fillLastName(lastName) {
    this.selectors.lastNameInput().type(lastName);
  }

  fillEmail(email) {
    this.selectors.emailInput().type(email);
  }

  fillPassword(password) {
    this.selectors.passwordInput().type(password, { sensitive: true });
  }

  fillConfirmPassword(confirmPassword) {
    this.selectors.confirmPasswordInput().type(confirmPassword, { sensitive: true });
  }

  checkErrorLine(text) {
    this.selectors.errorLine().should("be.visible").and("have.text", text);
  }

  executeRegistration(firstName, lastName, email, password, confirmPassword) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillEmail(email);
    this.fillPassword(password);
    this.fillConfirmPassword(confirmPassword);
    this.clickRegister();
  }
}
