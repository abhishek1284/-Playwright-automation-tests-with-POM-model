import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('//a[text()="Log in"]');
    this.emailField = page.locator('//*[@id="Email"]');
    this.passwordField = page.locator('//*[@id="Password"]');
    this.loginButton = page.locator('input[value="Log in"]');
    this.logoutLink = page.locator('//a[text()="Log out"]');
  }

  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/");
  }

  async openLoginPage() {
    await this.loginLink.click();
    await expect(this.page).toHaveURL(/login/);
  }

  async loginUser(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.logoutLink).toBeVisible();
  }
}
