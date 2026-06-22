import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('//a[text()="Log in"]');
    this.emailField = page.locator('//*[@id="Email"]');
    this.passwordField = page.locator('//*[@id="Password"]');
    this.loginButton = page.locator('input[value="Log in"]');
    this.errorMessage = page.locator('.message-error, .validation-summary-errors li');
    this.logoutLink = page.locator('//a[text()="Log out"]');
  }

  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await this.page.waitForLoadState("domcontentloaded", { timeout: 60000 });
  }

  async openLoginPage() {
    await this.loginLink.waitFor({ state: "visible", timeout: 10000 });
    await this.loginLink.click({ timeout: 10000 });
    await expect(this.page).toHaveURL(/login/, { timeout: 10000 });
    await this.emailField.waitFor({ state: "visible", timeout: 10000 });
  }

  async loginUser(email, password) {
    await this.emailField.waitFor({ state: "visible", timeout: 10000 });
    await this.passwordField.waitFor({ state: "visible", timeout: 10000 });
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click({ timeout: 10000 });
  }

  async verifyLoginSuccess() {
    await expect(this.logoutLink).toBeVisible();
  }

  async verifyLoginError(expectedText = 'Login was unsuccessful') {
    const error = this.errorMessage.first();
    await expect(error).toBeVisible({ timeout: 1000 });
    await expect(error).toContainText(expectedText, { timeout: 10000 });
  }
}
