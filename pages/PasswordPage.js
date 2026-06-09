import { expect } from "@playwright/test";

export class PasswordPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('//a[text()="Log in"]');
    this.forgotPasswordLink = page.locator('//a[text()="Forgot password?"]');
    this.recoveryEmailField = page.locator('//*[@id="Email"]');
    this.recoverButton = page.locator('input[name="send-email"]');
    this.resultMessage = page.locator(".result");
  }

  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/");
  }

  async openLoginPage() {
    await this.loginLink.click();
    await expect(this.page).toHaveURL(/login/);
  }

  async openForgotPassword() {
    await this.forgotPasswordLink.click();
    await expect(this.page).toHaveURL(/passwordrecovery/);
  }

  async recoverPassword(email) {
    await this.recoveryEmailField.fill(email);
    await this.recoverButton.click();
  }

  async verifyRecoverySuccess() {
    await expect(this.resultMessage).toContainText("Email with instructions has been sent");
  }
}
