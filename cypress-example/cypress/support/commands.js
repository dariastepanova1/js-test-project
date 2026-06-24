Cypress.Commands.add("checkSocialIcons", () => {
  const icons = ["facebook", "telegram", "youtube", "instagram", "linkedin"];

  icons.forEach((icon) => {
    cy.get(`.socials_icon.icon.icon-${icon}`).should("be.visible");
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.contains("button", "Sign In").click();
  cy.get('[class="modal-content"]').within(() => {
    cy.get('input[id="signinEmail"]').type(username);
    cy.get('input[id="signinPassword"]').type(password);
    cy.contains("button", "Login").should("be.enabled").click();
  });
});

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  originalFn(url, {
    auth: Cypress.expose("basicAuth"),
    ...options,
  });
});

Cypress.Commands.add("createExpense", (carId, mileage, liters, totalCost) => {
  return cy.request({
    method: "POST",
    url: "/api/expenses",
    body: {
      carId,
      reportedAt: new Date().toISOString().split("T")[0],
      mileage,
      liters,
      totalCost,
    },
  });
});

Cypress.Commands.add("deleteCar", (carId) => {
  return cy.request({
    method: "DELETE",
    url: `/api/cars/${carId}`
  });
});