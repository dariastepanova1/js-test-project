export class AddFuelExpenseDialog {
  selectors = {
    expenseLitersInput: () => cy.get('[id="addExpenseLiters"]'),
    costInput: () => cy.get('[id="addExpenseTotalCost"]'),
    expenseMileage: () => cy.get('[id="addExpenseMileage"]'),
    cancelButton: () =>
      cy.contains(
        '[class="modal-footer d-flex justify-content-end"] button',
        "Cancel",
      ),
    addButton: () =>
      cy.contains(
        '[class="modal-footer d-flex justify-content-end"] button',
        "Add",
      ),
      successAlert: () => cy.get('div[class*="alert-success"] p')
  };

  fillExpenseLiters(expenseLiters) {
    this.selectors.expenseLitersInput().type(expenseLiters);
  }

  fillCosts(expenseCosts) {
    this.selectors.costInput().type(expenseCosts);
  }

  fillExpenseMileage(expenseMileage) {
    this.selectors.expenseMileage().should("be.visible").type(expenseMileage);
  }

  clickAdd() {
    this.selectors.addButton().click();
  }

  clickCancel() {
    this.selectors.cancelButton().click();
  }

    checkAlertMessage(text) {
    this.selectors
      .successAlert()
      .should("be.visible")
      .and("contain.text", text);
  }
}
