import { test, expect } from "../fixtures/userGarage.fixtures.js";

import { ProfilePage } from "../src";

test("User profile displays mocked name", async ({ page }) => {
  const profilePage = new ProfilePage(page);

  await page.route("**/api/users/profile", async (route) => {
    await route.fulfill({
      status: 200,
      json: {
        status: "ok",
        data: {
          userId: 369391,
          photoFilename: "default-user.png",
          name: "Mocked",
          lastName: "Name",
        },
      },
    });
  });

  await profilePage.open();

  await expect(profilePage.selectors.profileName).toHaveText("Mocked Name");
});

test.describe("Cars API", () => {
  test("Create car successfully", async ({ apiContext }) => {
    const response = await apiContext.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.status).toBe("ok");
    expect(body.data.mileage).toBe(100);
  });

  test("Create car with invalid mileage", async ({ apiContext }) => {
    const response = await apiContext.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -1,
      },
    });

    expect(response.status()).toBe(400);
  });

  test("Create car without required fields", async ({ apiContext }) => {
    const response = await apiContext.post("/api/cars", {
      data: {},
    });

    expect(response.status()).toBe(400);
  });
});
