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

describe.only("Add Car Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl, {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    cy.env(["defaultUserCreds"]).then(({ defaultUserCreds }) => {
      const loginDialog = landingPage.clickSignIn();
      landingPage.loginDialog.executeLogin(
        defaultUserCreds.username,
        defaultUserCreds.password,
      );
    });
  });

  afterEach(() => {
    garagePage.clickEditCar();
    editCarDialog.removeCar();
  });

  it("Check add car", () => {
    garagePage.clickAddCar();
    addCarDialog.selectCarBrandByText("BMW");
    addCarDialog.selectCarModelByText("X5");
    addCarDialog.fillMileage(expenseMileage);
    addCarDialog.clickAdd();
    garagePage.checkAlertMessage("Car added");
  });

  it("Check add expenses", () => {
    addCarDialog.addCar("Audi", "Q7", expenseMileage);
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
