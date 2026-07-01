import { test, expect } from "@playwright/test";

test.describe.only("Registration fields validation", () => {
  let firstNameInput;
  let lastNameInput;
  let error;
  let emailInput;
  let passwordInput;
  let repeatPasswordInput;
  let registerButton;

  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.getByRole("button", { name: "Sign up" }).click();
    firstNameInput = page.locator('[id="signupName"]');
    lastNameInput = page.locator('[id="signupLastName"]');
    emailInput = page.locator('[id="signupEmail"]');
    error = page.locator('div[class="invalid-feedback"] p');
    passwordInput = page.locator('[id="signupPassword"]');
    repeatPasswordInput = page.locator('[id="signupRepeatPassword"]');
    registerButton = page.getByRole("button", { name: "Register" });
  });

  //first name
  test('should show "Name required" and highlight field in red', async ({
    page,
  }) => {
    await firstNameInput.focus();
    await firstNameInput.blur();

    await expect(error).toHaveText("Name required");
    await expect(firstNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test('should show "Name is invalid" for invalid characters', async ({
    page,
  }) => {
    await firstNameInput.fill("123@");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText("Name is invalid");
  });

  test("should show validation for name shorter than 2 characters", async ({
    page,
  }) => {
    await firstNameInput.fill("A");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });

  test("should show validation for name longer than 20 characters", async ({
    page,
  }) => {
    await firstNameInput.fill("ABCDEFGHIJKLMNOPQRSTU");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText(
      "Name has to be from 2 to 20 characters long",
    );
  });

  //last name
  test('should show "Last name required" and highlight field in red', async () => {
    await lastNameInput.focus();
    await lastNameInput.blur();

    await expect(error).toHaveText("Last name required");
    await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test('should show "Last name is invalid" for invalid characters', async ({
    page,
  }) => {
    await lastNameInput.fill("123@");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText("Last name is invalid");
  });

  test("should show validation for last name shorter than 2 characters", async ({
    page,
  }) => {
    await lastNameInput.fill("A");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });

  test("should show validation for last name longer than 20 characters", async ({
    page,
  }) => {
    await lastNameInput.fill("ABCDEFGHIJKLMNOPQRSTU");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText(
      "Last name has to be from 2 to 20 characters long",
    );
  });

  //email
  test('should show "Email required" and highlight field in red', async () => {
    await emailInput.focus();
    await emailInput.blur();

    await expect(error).toHaveText("Email required");
    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test('should show "Email is invalid" for incorrect email format', async ({
    page,
  }) => {
    await emailInput.fill("test123");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText("Email is incorrect");
  });

  //password
  test('should show "Password is required" and highlight field in red', async () => {
    await passwordInput.focus();
    await passwordInput.blur();

    await expect(error).toHaveText("Password required");
    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("should show password complexity validation message", async ({
    page,
  }) => {
    await passwordInput.fill("abc");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });

  //re-enter password
  test('should show "Re-enter password required" and highlight field in red', async () => {
    await repeatPasswordInput.focus();
    await repeatPasswordInput.blur();

    await expect(error).toHaveText("Re-enter password required");
    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );
  });

  test('should show "Passwords do not match" when passwords are different', async ({
    page,
  }) => {
    await passwordInput.fill("Test1234A");
    await repeatPasswordInput.fill("Different123");
    await page.keyboard.press("Tab");

    await expect(error).toHaveText("Passwords do not match");
  });

  test("should disable register button when all fields are empty", async ({
    page,
  }) => {
    await expect(registerButton).toBeDisabled();
  });

  //successful registration
  test("should successfully register with valid data", async ({ page }) => {
    const uniqueEmail = `aqa${Date.now()}@test.com`;

    await firstNameInput.fill("John");
    await lastNameInput.fill("Doe");
    await emailInput.fill(uniqueEmail);
    await passwordInput.fill("Test1234A");
    await repeatPasswordInput.fill("Test1234A");
    await expect(registerButton).toBeEnabled();
    await registerButton.click();
    await expect(page).toHaveURL(/garage/);
  });
});
