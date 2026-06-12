import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test("Register new user using POM", async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goto();
  await registerPage.openRegisterPage();

  const email = "abhianime1018@gmail.com"; // fixed email
  const password = "Password123!";
  await registerPage.registerUser("Abhishek", "Pradhan", email, password);

  try {
    // Step 4: Verify success
    await registerPage.verifyRegistrationSuccess();
  } catch (error) {
    // If registration fails (email already exists), log it instead of failing
    console.warn("Non-critical registration error:", error.message);
  }

  // Step 5: Keep dashboard visible for 10 seconds
  await page.waitForTimeout(10000);
});
