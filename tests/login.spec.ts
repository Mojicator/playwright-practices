import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { User } from "../models/user";
import TestData from "../data/testData.json";

let loginPage: LoginPage;
let userValid: User;
let userInvalid: User;

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.isVisited();
    userValid = new User(TestData.userInvalid);
    userInvalid = new User(TestData.userValid);
  });

  test("TC01 Login successfuly", async ({ page }) => {
    await loginPage.emailInput.fill(userValid.email);
    await loginPage.passwordInput.fill(userValid.password);
    await loginPage.loginButton.click();
    await expect(page).toHaveURL("http://localhost:3000/dashboard");
    await expect(page.getByRole("alert")).toContainText(
      "Inicio de sesión exitoso"
    );
  });

  test("TC02 Login with non existing user", async ({ page }) => {
    await loginPage.emailInput.fill(userInvalid.email);
    await loginPage.passwordInput.fill("random text");
    await loginPage.loginButton.click();
    await expect(page.getByRole("alert")).toContainText("Invalid credentials");
  });

  test("TC03 Login with password incorrect", async ({ page }) => {
    await loginPage.emailInput.fill(userValid.email);
    await loginPage.passwordInput.fill("random text");
    await loginPage.loginButton.click();
    await expect(page.getByRole("alert")).toContainText("Invalid credentials");
  });

  test("TC04 Login with invalid email", async ({ page }) => {
    await loginPage.emailInput.fill("no email");
    await loginPage.passwordInput.fill("some text");
    await loginPage.loginButton.click();
    await expect(page).toHaveURL("http://localhost:3000/login");
  });

  test("TC05 Verify all visual elements", async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.createAccountButton).toBeVisible();
    await expect(loginPage.goToSignupPageLink).toBeVisible();
  });

  test("TC06 Verify type of fields", async () => {
    await expect(loginPage.emailInput).toHaveAttribute("type", "email");
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  });

  test("TC07 Go to create an account", async ({ page }) => {
    await loginPage.createAccountButton.click();
    await expect(page).toHaveURL("http://localhost:3000/signup");
  });

  test("TC08 Go to signup page", async ({ page }) => {
    await loginPage.goToSignupPageLink.click();
    await expect(page).toHaveURL("http://localhost:3000/signup");
  });
});
