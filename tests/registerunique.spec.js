import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test("Register unique new user using POM", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goto();


  await registerPage.openRegisterPage();

  
  const timestamp = Date.now();
  const email = `abhianime${timestamp}@gmail.com`;
  const password = "Password123!";
  await registerPage.registerUser("Abhishek", "Pradhan", email, password);

  
  await registerPage.verifyRegistrationSuccess();

  
  await page.waitForTimeout(1000);
});
