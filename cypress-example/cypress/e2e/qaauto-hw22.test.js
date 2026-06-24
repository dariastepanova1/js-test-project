import {
  AddCarDialog,
  AddFuelExpenseDialog,
  LeftNavBar,
  FuelExpensesPage,
} from "../support/poms";

const addCarDialog = new AddCarDialog();
const addFuelExpenseDialog = new AddFuelExpenseDialog();
const leftNavBar = new LeftNavBar();
const fuelExpensesPage = new FuelExpensesPage();

const expenseMileage = 100;
const carBrand = "BMW";
const carModel = "X5";

describe("Add Car and Fuel expenses mixed UI and API tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.env(["defaultUserCreds"]).then(({ defaultUserCreds }) => {
      cy.login(defaultUserCreds.username, defaultUserCreds.password);
    });
  });

  afterEach(() => {
    cy.get("@carId").then((carId) => {
      cy.deleteCar(carId);
    });
  });

  it("Check add car", () => {
    cy.intercept("POST", "/api/cars").as("createCar");
    addCarDialog.addCar(carBrand, carModel, expenseMileage);

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      cy.wrap(response.body.data.id).as("carId");
    });

    cy.get("@carId").then((carId) => {
      cy.request("GET", "/api/cars").then((res) => {
        expect(res.status).to.eq(200);

        const createdCar = res.body.data.find((car) => car.id === carId);

        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq(carBrand);
        expect(createdCar.model).to.eq(carModel);
      });
    });
  });

  it("Check add expenses", () => {
    const liters = 10;
    const expenses = 100;
    const newExpenseMileage = expenseMileage + 1;

    cy.intercept("POST", "/api/cars").as("createCar");
    addCarDialog.addCar(carBrand, carModel, expenseMileage);

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      cy.wrap(response.body.data.id).as("carId");
    });

    cy.get("@carId").then((carId) => {
      cy.createExpense(carId, newExpenseMileage, liters, expenses).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.exist;
          expect(response.body.data.mileage).to.eq(newExpenseMileage);
          expect(response.body.data.liters).to.eq(liters);
          expect(response.body.data.totalCost).to.eq(expenses);
        },
      );

      leftNavBar.clickNavItem("Fuel expenses");
      fuelExpensesPage.selectCar(carBrand, carModel);
      fuelExpensesPage.checkMileage(newExpenseMileage);
      fuelExpensesPage.checkLiters(liters);
      fuelExpensesPage.checkCost(expenses);
    });
  });
});
