import { Page, Locator } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signupButton = page.getByTestId("boton-registrarse");
  }

  async isVisited() {
    await this.page.goto("http://localhost:3000/");
    await this.page.waitForLoadState();
  }

  async fillInForm(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
}
