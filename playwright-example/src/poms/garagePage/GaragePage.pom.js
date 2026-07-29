import { BasePage } from "../BasePage.pom.js";

export class GaragePage extends BasePage {
  selectors = {
    addCarButton: this._page.getByRole("button", {
      name: "Add car",
      exact: true,
    }),
  };

  constructor(page) {
    super(page, "/panel/garage");
  }

  async clickAddCar() {
    await this.selectors.addCarButton.click();
  }
}
