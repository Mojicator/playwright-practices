import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/signupPage";

let signupPage: SignupPage;

test.describe("Sign up page", () => {
  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.isVisited();
  });

  test("TC01 Verify all visual elements exist", async () => {
    await expect(signupPage.firstNameInput).toBeVisible();
    await expect(signupPage.lastNameInput).toBeVisible();
    await expect(signupPage.emailInput).toBeVisible();
    await expect(signupPage.passwordInput).toBeVisible();
    await expect(signupPage.signupButton).toBeVisible();
  });

  test("TC02 Verify Sign up button is disabled when form is loaded", async () => {
    await expect(signupPage.signupButton).toBeDisabled();
  });

  test("TC03 Verify Sign up button is enabled when form is filled in", async () => {
    await signupPage.fillInForm(
      "Maria",
      "Suarez",
      "masuarez@email.com",
      "test123"
    );
    await expect(signupPage.signupButton).toBeEnabled();
  });

  test("TC04 Navigate to Login page", async ({ page }) => {
    await page.getByTestId("boton-login-header-signup").click();
    await expect(page).toHaveURL("http://localhost:3000/login");
  });

  test("TC05 Sign up an user successfully", async ({ page }) => {
    await signupPage.fillInForm(
      "Maria",
      "Suarez",
      `masuares${Date.now()}@test.com`,
      "test123"
    );
    await signupPage.signupButton.click();
    await expect(page.getByRole("alert")).toContainText("Registro exitoso!");
  });

  test("TC06 Sign up an user that already exist", async ({ page }) => {
    await signupPage.fillInForm(
      "Oscar",
      "Hernandez",
      "oscar2mojica@gmail.com",
      "test123"
    );
    await signupPage.signupButton.click();
    await expect(page.getByRole("alert")).toContainText("Email already in use");
  });
});
