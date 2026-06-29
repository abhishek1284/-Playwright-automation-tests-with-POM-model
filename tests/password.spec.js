import { test, expect } from "@playwright/test";
import { PasswordPage } from "../pages/PasswordPage";

test("Forgot password flow using POM", async ({ page }) => {
  const passwordPage = new PasswordPage(page);

  await passwordPage.goto();

  await passwordPage.openLoginPage();

 
  await passwordPage.openForgotPassword();


  await passwordPage.recoverPassword("abhianime1018@gmail.com");

  await passwordPage.verifyRecoverySuccess();

  await page.locator(".result").screenshot({ path: "screenshots/success-message.png" });


  await page.screenshot({ path: "screenshots/password_send_sucessfully.png", fullPage: true });

  await page.waitForTimeout(5000);
});
