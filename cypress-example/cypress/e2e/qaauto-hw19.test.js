describe("Header and contacts section tests", () => {
  beforeEach(() => {
    cy.visit("", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("Should have correct header elements", () => {
    cy.get(".header.bg-basic-dark").within(() => {
      cy.get(".header_logo").should("be.visible");
      cy.contains("Home").should("be.visible");
      cy.contains("About").should("be.visible");
      cy.contains("Contacts").should("be.visible");
      cy.contains("Guest log in").should("be.visible");
      cy.contains("Sign In").should("be.visible");
    });
  });

  it("Should have correct contacts section elements", () => {
    cy.get(".section.contacts").within(() => {
      cy.checkSocialIcons();

      cy.contains("ithillel.ua").should("be.visible");
      cy.contains("support@ithillel.ua").should("be.visible");
    });
  });
});
