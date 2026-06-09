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
    await this.page.goto("https://demowebshop.tricentis.com/");
  }

  async openRegisterPage() {
    await this.registerLink.click();
    await expect(this.page).toHaveURL(/register/);
  }

  async registerUser(firstName, lastName, email, password) {
    await this.genderMale.check();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.resultMessage).toHaveText("Your registration completed");
  }
}