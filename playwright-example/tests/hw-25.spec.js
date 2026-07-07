import { test, expect } from "@playwright/test";

import { LandingPage, RegistrationDialog } from "../src";

/** @type {LandingPage} */
let landingPage;
/** @type {RegistrationDialog} */
let registrationDialog;

test.describe("Registration form validation tests", () => {
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    registrationDialog = new RegistrationDialog(page);
    await landingPage.open();
    await landingPage.clickSignUpButton();
  });

  //first name
  test('should show "Name required" and highlight field in red', async ({
    page,
  }) => {
    await registrationDialog.selectors.firstNameInput.focus();
    await registrationDialog.selectors.firstNameInput.blur();

    await expect(
      registrationDialog.selectors.genericInputValidationError("Name required"),
    ).toBeVisible();
    await expect(registrationDialog.selectors.firstNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  test('should show "Name is invalid" for invalid characters', async ({
    page,
  }) => {
    await registrationDialog.fillFirstName("123@");
    await registrationDialog.selectors.firstNameInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Name is invalid",
      ),
    ).toBeVisible();
  });

  test("should show validation for name shorter than 2 characters", async ({
    page,
  }) => {
    await registrationDialog.fillFirstName("A");
    await registrationDialog.selectors.firstNameInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Name has to be from 2 to 20 characters long",
      ),
    ).toBeVisible();
  });

  test("should show validation for name longer than 20 characters", async ({
    page,
  }) => {
    await registrationDialog.fillFirstName("ABCDEFGHIJKLMNOPQRSTU");
    await registrationDialog.selectors.firstNameInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Name has to be from 2 to 20 characters long",
      ),
    ).toBeVisible();
  });

  //last name
  test('should show "Last name required" and highlight field in red', async () => {
    await registrationDialog.selectors.lastNameInput.focus();
    await registrationDialog.selectors.lastNameInput.blur();

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Last name required",
      ),
    ).toBeVisible();
    await expect(registrationDialog.selectors.lastNameInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  test('should show "Last name is invalid" for invalid characters', async ({
    page,
  }) => {
    await registrationDialog.fillLastName("123@");
    await registrationDialog.selectors.lastNameInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Last name is invalid",
      ),
    ).toBeVisible();
  });

  test("should show validation for last name shorter than 2 characters", async ({
    page,
  }) => {
    await registrationDialog.fillLastName("A");
    await registrationDialog.selectors.lastNameInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Last name has to be from 2 to 20 characters long",
      ),
    ).toBeVisible();
  });

  test("should show validation for last name longer than 20 characters", async ({
    page,
  }) => {
    await registrationDialog.fillLastName("ABCDEFGHIJKLMNOPQRSTU");
    await registrationDialog.selectors.lastNameInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Last name has to be from 2 to 20 characters long",
      ),
    ).toBeVisible();
  });

  //email
  test('should show "Email required" and highlight field in red', async () => {
    await registrationDialog.selectors.emailInput.focus();
    await registrationDialog.selectors.emailInput.blur();

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Email required",
      ),
    ).toBeVisible();
    await expect(registrationDialog.selectors.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  test('should show "Email is invalid" for incorrect email format', async ({
    page,
  }) => {
    await registrationDialog.fillEmail("test123");
    await registrationDialog.selectors.emailInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Email is incorrect",
      ),
    ).toBeVisible();
  });

  //password
  test('should show "Password is required" and highlight field in red', async () => {
    await registrationDialog.selectors.passwordInput.focus();
    await registrationDialog.selectors.passwordInput.blur();

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Password required",
      ),
    ).toBeVisible();
    await expect(registrationDialog.selectors.passwordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  test("should show password complexity validation message", async ({
    page,
  }) => {
    await registrationDialog.fillPassword("abc");
    await registrationDialog.selectors.passwordInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      ),
    ).toBeVisible();
  });

  //re-enter password
  test('should show "Re-enter password required" and highlight field in red', async () => {
    await registrationDialog.selectors.repeatPasswordInput.focus();
    await registrationDialog.selectors.repeatPasswordInput.blur();

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Re-enter password required",
      ),
    ).toBeVisible();
    await expect(registrationDialog.selectors.repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  test('should show "Passwords do not match" when passwords are different', async ({
    page,
  }) => {
    await registrationDialog.fillPassword("Test1234A");
    await registrationDialog.fillRepeatPassword("Different123");
    await registrationDialog.selectors.passwordInput.press("Tab");

    await expect(
      registrationDialog.selectors.genericInputValidationError(
        "Passwords do not match",
      ),
    ).toBeVisible();
  });

  test("should disable register button when all fields are empty", async ({
    page,
  }) => {
    await expect(registrationDialog.selectors.registerButton).toBeDisabled();
  });

  //successful registration
  test("should successfully register with valid data", async ({ page }) => {
    const uniqueEmail = `aqa${Date.now()}@test.com`;

    await registrationDialog.fillRegistrationForm(
      "John",
      "Doe",
      uniqueEmail,
      "Test123A",
    );
    await expect(registrationDialog.selectors.registerButton).toBeEnabled();
    await registrationDialog.clickRegisterButton();
    await expect(page).toHaveURL(/garage/);
  });
});
