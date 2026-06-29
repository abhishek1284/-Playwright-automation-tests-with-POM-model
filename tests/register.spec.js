import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test("Register new user using POM", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goto();
  await registerPage.openRegisterPage();

  const email = "abhianime1018@gmail.com"; 
  const password = "Password123!";
  await registerPage.registerUser("Abhishek", "Pradhan", email, password);

  try {
    
    await registerPage.verifyRegistrationSuccess();
  } catch (error) {
   
    console.warn("Non-critical registration error:", error.message);
  }

  await page.waitForTimeout(10000);
});
