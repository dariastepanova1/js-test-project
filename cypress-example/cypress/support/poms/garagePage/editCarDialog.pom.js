export class EditCarDialog {
  selectors = {
    removeCarButton: () => cy.contains("button", "Remove car"),
    popUpRemoveButton: () => cy.contains("button", "Remove"),
    popUpCancelButton: () => cy.contains("button", "Cancel"),
  };

  removeCar() {
    this.selectors.removeCarButton().click();
    this.selectors.popUpRemoveButton().click();
  }
}
