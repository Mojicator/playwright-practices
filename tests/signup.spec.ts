import { test, expect } from "@playwright/test";

test.describe("Sign up page", () => {
  test("TC01 Verify all visual elements exist", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByTestId("boton-registrarse")).toBeVisible();
  });

  test("TC02 Verify Sign up button is disabled when form is loaded", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await expect(page.getByTestId("boton-registrarse")).toBeDisabled();
  });

  test("TC03 Verify Sign up button is enabled when form is filled in", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.locator('input[name="firstName"]').fill("Maria");
    await page.locator('input[name="lastName"]').fill("Suarez");
    await page.locator('input[name="email"]').fill("masuarez@email.com");
    await page.locator('input[name="password"]').fill("test123");
    await expect(page.getByTestId("boton-registrarse")).toBeEnabled();
  });

  test("TC04 Navigate to Login page", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByTestId("boton-login-header-signup").click();
    await expect(page).toHaveURL("http://localhost:3000/login");
  });

  test("TC05 Sign up an user successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.locator('input[name="firstName"]').fill("Maria");
    await page.locator('input[name="lastName"]').fill("Suarez");
    await page
      .locator('input[name="email"]')
      .fill(`masuares${Date.now()}@test.com`);
    await page.locator('input[name="password"]').fill("test123");
    await page.getByTestId("boton-registrarse").click();
    await expect(page.getByRole("alert")).toContainText("Registro exitoso!");
  });

  test("TC06 Sign up an user that already exist", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.locator('input[name="firstName"]').fill("Maria");
    await page.locator('input[name="lastName"]').fill("Suarez");
    await page.locator('input[name="email"]').fill("oscar2mojica@gmail.com");
    await page.locator('input[name="password"]').fill("test123");
    await page.getByTestId("boton-registrarse").click();
    await expect(page.getByRole("alert")).toContainText("Email already in use");
  });
});
