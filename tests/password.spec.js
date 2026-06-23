import { test, expect } from "@playwright/test";
import { PasswordPage } from "../pages/PasswordPage";

test("Forgot password flow using POM", async ({ page }) => {
  const passwordPage = new PasswordPage(page);

  //  Go to signin page
  await passwordPage.goto();

  //  Open login page
  await passwordPage.openLoginPage();

  // : Click Forgot password link
  await passwordPage.openForgotPassword();

  //  Fill recovery email and submit
  await passwordPage.recoverPassword("abhianime1018@gmail.com");

  // Verify success message
  await passwordPage.verifyRecoverySuccess();

  //  Screenshot of success message only
  await page.locator(".result").screenshot({ path: "screenshots/success-message.png" });

  //  Full page screenshot after recovery
  await page.screenshot({ path: "screenshots/password_send_sucessfully.png", fullPage: true });

  // Step 6: Keep recovery confirmation visible for 5 seconds
  await page.waitForTimeout(5000);
});
