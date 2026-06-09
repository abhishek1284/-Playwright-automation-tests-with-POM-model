import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test("Register new user using POM", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  // Step 1: Navigate to site
  await registerPage.goto();

  // Step 2: Open Register page
  await registerPage.openRegisterPage();

  // Step 3: Fill and submit form with fixed email
  const email = "abhianime1018@gmail.com";
  const password = "Password123!";
  await registerPage.registerUser("Abhishek", "Pradhan", email, password);

  // Step 4: Verify success
  await registerPage.verifyRegistrationSuccess();

  // Step 5: Keep dashboard visible for 10 seconds
  await page.waitForTimeout(10000);  // waits 10 seconds before closing
});
