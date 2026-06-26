export class FuelExpensesPage {
  selectors = {
    carDropdownItem: '[id="carSelectDropdown"]',
    table: '[class="table expenses_table"]',
    dateCell: '[class="table expenses_table"] td[class="font-weight-bold"]',
    mileageCell: '[class="table expenses_table"] td:nth-child(2)',
    litersCell: '[class="table expenses_table"] td:nth-child(3)',
    costCell: '[class="table expenses_table"] td:nth-child(4)',
    deleteBtn: '[class="table expenses_table"] .btn-delete',
    editBtn: '[class="table expenses_table"] .btn-edit',
  };

  selectCar(brand, model) {
    const carName = `${brand} ${model}`.trim();
    cy.get(this.selectors.carDropdownItem).click();
    cy.get(this.selectors.carDropdownItem).contains(carName).click();
  }

  checkMileage(value) {
    cy.get(this.selectors.mileageCell).should("contain", value);
  }

  checkLiters(value) {
    cy.get(this.selectors.litersCell).should("contain", value);
  }

  checkCost(value) {
    cy.get(this.selectors.costCell).should("contain", value);
  }
}
