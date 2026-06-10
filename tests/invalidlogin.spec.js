import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test('Invalid login with wrong email shows validation error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.openLoginPage();
  await loginPage.loginUser('wrong.email@example.com', 'Password123!');
  await page.screenshot({ path: 'screenshots/invalid-login-wrong-email.png' });
  await loginPage.verifyLoginError();
  await page.waitForTimeout(7000);
});

test('Invalid login with wrong password shows validation error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.openLoginPage();
  await loginPage.loginUser('abhianime1018@gmail.com', 'WrongPassword!');
  await page.screenshot({ path: 'screenshots/invalid-login-wrong-password.png' });
  await loginPage.verifyLoginError();

  await page.waitForTimeout(7000);
});
