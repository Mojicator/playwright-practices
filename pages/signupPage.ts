import { Page, Locator } from "@playwright/test";
import { User } from "../models/user";

export class SignupPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;
  readonly goToLoginPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signupButton = page.getByTestId("boton-registrarse");
    this.goToLoginPageButton = page.getByTestId("boton-login-header-signup");
  }

  async isVisited() {
    await this.page.goto("http://localhost:3000/");
    await this.page.waitForLoadState();
  }

  async fillInForm(user: User) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }
}
