export class GaragePage {
  selectors = {
    addCarButton: () => cy.contains("button", "Add car"),
    addFuelExpenseButton: () => cy.contains("button", "Add fuel expense"),
    editCarButton: () => cy.get('[class="icon icon-edit"]'),
    successAlert: () => cy.get('div[class*="alert-success"] p'),
  };

  clickAddCar() {
    this.selectors.addCarButton().click();
  }

  clickAddFuelExpenses() {
    this.selectors.addFuelExpenseButton().click();
  }

  clickEditCar() {
    this.selectors.editCarButton().first().click();
  }

  checkAlertMessage(text) {
    this.selectors
      .successAlert()
      .should("be.visible")
      .and("contain.text", text);
  }
}
