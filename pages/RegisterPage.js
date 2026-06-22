import { expect } from "@playwright/test";

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.locator("a.ico-register");
    this.genderMale = page.locator("#gender-male");
    this.firstName = page.locator("#FirstName");
    this.lastName = page.locator("#LastName");
    this.email = page.locator("#Email");
    this.password = page.locator("#Password");
    this.confirmPassword = page.locator("#ConfirmPassword");
    this.registerButton = page.locator('input[name="register-button"]');
    this.resultMessage = page.locator(".result");
  }

  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await this.page.waitForLoadState("domcontentloaded", { timeout: 60000 });
  }

  async openRegisterPage() {
    await this.registerLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.registerLink.click({ timeout: 10000 });
    await expect(this.page).toHaveURL(/register/, { timeout: 10000 });
    await this.firstName.waitFor({ state: 'visible', timeout: 10000 });
  }

  async registerUser(firstName, lastName, email, password) {
    await this.genderMale.waitFor({ state: 'visible', timeout: 10000 });
    await this.genderMale.check();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.registerButton.click({ timeout: 10000 });
  }

  async verifyRegistrationSuccess() {
    // Accept either the registration success message or an already-logged-in state
    const logoutLink = this.page.locator('a.ico-logout');
    try {
      await expect(this.resultMessage).toHaveText("Your registration completed", { timeout: 3000 });
    } catch (e) {
      await expect(logoutLink).toBeVisible({ timeout: 3000 });
    }
  }
}