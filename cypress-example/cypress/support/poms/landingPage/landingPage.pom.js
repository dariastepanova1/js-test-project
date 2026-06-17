import { LoginDialog } from "./loginDialog.pom.js";
export class LandingPage {
  selectors = {
    signInButton: () => cy.contains("button", "Sign In"),
    signUpButton: () => cy.contains("button", "Sign Up"),
    guestSignInButton: () => cy.contains("button", "Guest log in"),
  };

  loginDialog = new LoginDialog();

  clickSignIn() {
    this.selectors.signInButton().click();
    return this.loginDialog;
  }

  clickSignUp() {
    this.selectors.signUpButton().click();
  }

  clickGuestSignIn() {
    this.selectors.guestSignInButton().click();
  }
}
