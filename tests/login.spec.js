import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Login with registered user using POM", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.openLoginPage();  


  await loginPage.loginUser("abhianime1018@gmail.com", "Password123!");
  await loginPage.verifyLoginSuccess();


  await page.waitForTimeout(10000);
});
