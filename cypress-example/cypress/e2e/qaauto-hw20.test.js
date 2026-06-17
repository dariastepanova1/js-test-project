import {
  LoginDialog,
  LandingPage,
  RegistrationDialog,
  LeftNavBar,
} from "../support/poms";

const landingPage = new LandingPage();
const loginDialog = new LoginDialog();
const registrationDialog = new RegistrationDialog();
const leftNavBar = new LeftNavBar();

describe("Registration Dialog Tests", () => {
  beforeEach(() => {
    cy.visit("", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    landingPage.clickSignIn();
    loginDialog.clickRegister();
  });

  it("First name wrong format tests", () => {
    registrationDialog.selectors.firstNameInput().focus().blur();
    registrationDialog.checkErrorLine("Name required");

    registrationDialog.fillFirstName(123);
    registrationDialog.checkErrorLine("Name is invalid");

    registrationDialog.selectors.firstNameInput().clear();

    registrationDialog.fillFirstName("A");
    registrationDialog.checkErrorLine(
      "Name has to be from 2 to 20 characters long",
    );

    registrationDialog.selectors
      .firstNameInput()
      .should("have.css", "border-color", "rgb(220, 53, 69)");

    registrationDialog.selectors.firstNameInput().clear();
  });

  it("Last name wrong format tests", () => {
    registrationDialog.selectors.lastNameInput().focus().blur();
    registrationDialog.checkErrorLine("Last name required");

    registrationDialog.fillLastName(123);
    registrationDialog.checkErrorLine("Last name is invalid");

    registrationDialog.selectors.lastNameInput().clear();

    registrationDialog.fillLastName("A");
    registrationDialog.checkErrorLine(
      "Last name has to be from 2 to 20 characters long",
    );

    registrationDialog.selectors
      .lastNameInput()
      .should("have.css", "border-color", "rgb(220, 53, 69)");

    registrationDialog.selectors.lastNameInput().clear();
  });

  it("Email wrong format tests", () => {
    registrationDialog.selectors.emailInput().focus().blur();
    registrationDialog.checkErrorLine("Email required");

    registrationDialog.fillEmail(123);
    registrationDialog.checkErrorLine("Email is incorrect");

    registrationDialog.selectors
      .emailInput()
      .should("have.css", "border-color", "rgb(220, 53, 69)");

    registrationDialog.selectors.emailInput().clear();
  });

  it("Password wrong format tests", () => {
    registrationDialog.selectors.passwordInput().focus().blur();
    registrationDialog.checkErrorLine("Password required");

    registrationDialog.fillPassword(123);
    registrationDialog.checkErrorLine(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );

    registrationDialog.selectors
      .passwordInput()
      .should("have.css", "border-color", "rgb(220, 53, 69)");

    registrationDialog.selectors.passwordInput().clear();
  });

  it("Repeat password wrong format tests", () => {
    registrationDialog.selectors.confirmPasswordInput().focus().blur();
    registrationDialog.checkErrorLine("Re-enter password required");

    registrationDialog.fillPassword("Qwerty!123");
    registrationDialog.fillConfirmPassword("Qwerty!124");
    registrationDialog.checkErrorLine("Passwords do not match");

    registrationDialog.selectors
      .confirmPasswordInput()
      .should("have.css", "border-color", "rgb(220, 53, 69)");

    registrationDialog.selectors.confirmPasswordInput().clear();
  });

  it("Check register button is disabled with empty data", () => {
    registrationDialog.selectors.registerButton().should("be.disabled");
  });

  it("Check register and login user", () => {
    const uniqueEmail = `john.doe+${Date.now()}@example.com`;
    registrationDialog.executeRegistration(
      "John",
      "Doe",
      uniqueEmail,
      "Qwerty!123",
      "Qwerty!123",
    );
    cy.url().should("include", "/garage");
    leftNavBar.clickNavItem("Log out");

    cy.login(uniqueEmail, "Qwerty!123");
    cy.url().should("include", "/garage");
  });
});
