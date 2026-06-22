import {
  LandingPage,
  LoginDialog,
  GaragePage,
  AddCarDialog,
  AddFuelExpenseDialog,
  EditCarDialog,
  LeftNavBar,
} from "../support/poms";

const landingPage = new LandingPage();
const loginDialog = new LoginDialog();
const garagePage = new GaragePage();
const addCarDialog = new AddCarDialog();
const addFuelExpenseDialog = new AddFuelExpenseDialog();
const editCarDialog = new EditCarDialog();
const leftNavBar = new LeftNavBar();
const expenseMileage = 100;
const carBrand = "BMW";
const carModel = "X5";

describe("Add Car Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl),
    cy.env(["defaultUserCreds"]).then(({ defaultUserCreds }) => {
      const loginDialog = landingPage.clickSignIn();
      landingPage.loginDialog.executeLogin(
        defaultUserCreds.username,
        defaultUserCreds.password,
      );
    });
  });

  afterEach(() => {
    garagePage.clickEditCar(carBrand, carModel);
    editCarDialog.removeCar();
  });

  it("Check add car", () => {
    garagePage.clickAddCar();
    addCarDialog.selectCarBrandByText(carBrand);
    addCarDialog.selectCarModelByText(carModel);
    addCarDialog.fillMileage(expenseMileage);
    addCarDialog.clickAdd();
    garagePage.checkAlertMessage("Car added");
  });

  it("Check add expenses", () => {
    addCarDialog.addCar(carBrand, carModel, expenseMileage);
    garagePage.clickAddFuelExpenses();
    addFuelExpenseDialog.selectors
      .expenseMileage()
      .type("{selectall}{backspace}");
    addFuelExpenseDialog.fillExpenseMileage(expenseMileage + 1);
    addFuelExpenseDialog.fillExpenseLiters("10");
    addFuelExpenseDialog.fillCosts("20");
    addFuelExpenseDialog.clickAdd();
    addFuelExpenseDialog.checkAlertMessage("Fuel expense added");
    leftNavBar.clickNavItem("Garage");
  });
});
