Cypress.Commands.add("checkSocialIcons", () => {
  const icons = [
    "facebook",
    "telegram",
    "youtube",
    "instagram",
    "linkedin",
  ];

  icons.forEach((icon) => {
    cy.get(`.socials_icon.icon.icon-${icon}`).should("be.visible");
  });
});