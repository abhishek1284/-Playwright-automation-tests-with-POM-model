import { test } from "@playwright/test";
import { PasswordPage } from "../pages/PasswordPage";

test("Forgot password flow using POM", async ({ page }) => {
  const passwordPage = new PasswordPage(page);

  // Step 1: Go to signin page
  await passwordPage.goto();

  // Step 2: Open login page
  await passwordPage.openLoginPage();

  // Step 3: Click Forgot password link
  await passwordPage.openForgotPassword();

  // Step 4: Fill recovery email and submit
  await passwordPage.recoverPassword("abhianime1018@gmail.com");

  // Step 5: Verify success message
  await passwordPage.verifyRecoverySuccess();

  // Step 6: Keep recovery confirmation visible for 5 seconds
  await page.waitForTimeout(5000);
});
