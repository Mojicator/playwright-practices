import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly createAccountButton: Locator;
  readonly goToSignupPageLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByTestId("boton-login");
    this.createAccountButton = page.getByTestId("boton-signup-header");
    this.goToSignupPageLink = page.getByTestId("link-registrarse-login");
  }

  async isVisited() {
    await this.page.goto("http://localhost:3000/login");
    await this.page.waitForLoadState();
  }

  async clearFields() {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  async completeFormAndLogin(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
