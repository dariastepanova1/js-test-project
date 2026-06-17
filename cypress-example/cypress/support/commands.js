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