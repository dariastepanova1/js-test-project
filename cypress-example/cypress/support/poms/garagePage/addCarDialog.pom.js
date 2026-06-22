import { GaragePage } from "./garagePage.pom.js";

export class AddCarDialog {
  selectors = {
    carBrandSelector: () => cy.get('[id="addCarBrand"]'),
    carModelSelector: () => cy.get('[id="addCarModel"]'),
    mileageInput: () => cy.get('[id="addCarMileage"]'),
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
  };

garagePage = new GaragePage();

  selectCarBrandByText(brandName) {
    this.selectors.carBrandSelector().select(brandName);
  }

  selectCarModelByText(modelName) {
    this.selectors.carModelSelector().select(modelName);
  }

  clickAdd() {
    this.selectors.addButton().click();
  }

  clickCancel() {
    this.selectors.cancelButton().click();
  }

  fillMileage(mileage) {
    this.selectors.mileageInput().type(mileage);
  }

  addCar(text, model, mileage) {
    (this.garagePage.clickAddCar(),
      this.selectCarBrandByText(text),
      this.selectCarModelByText(model),
      this.fillMileage(mileage),
      this.clickAdd());
  }
}
