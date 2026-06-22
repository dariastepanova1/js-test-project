export class GaragePage {
  selectors = {
    addCarButton: () => cy.contains("button", "Add car"),
    addFuelExpenseButton: () => cy.contains("button", "Add fuel expense"),
    successAlert: () => cy.get('div[class*="alert-success"] p'),

    carItem: '[class="car-item"]',
    carName: '[class="car_name"]',
    editIcon: '[class="icon icon-edit"]',
  };

  clickAddCar() {
    this.selectors.addCarButton().click();
  }

  clickAddFuelExpenses() {
    this.selectors.addFuelExpenseButton().click();
  }

  clickEditCar(brand, model) {
    const carName = `${brand} ${model}`.trim();

    cy.contains(this.selectors.carItem, carName)
      .within(() => {
        cy.get(this.selectors.editIcon).click();
      });
  }

  checkAlertMessage(text) {
    this.selectors
      .successAlert()
      .should("be.visible")
      .and("contain.text", text);
  }
}