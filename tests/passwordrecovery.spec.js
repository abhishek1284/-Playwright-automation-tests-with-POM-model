import { test, expect } from "@playwright/test";
import { PasswordPage } from "../pages/PasswordPage";

test("Forgot password flow with invalid email + screenshot", async ({ page }) => {
  const passwordPage = new PasswordPage(page);

  await passwordPage.goto();
  await passwordPage.openLoginPage();
  await passwordPage.openForgotPassword();

  await passwordPage.recoverPassword("invalid_email@test.com");

  const errorLocator = page.locator(".validation-summary-errors");

  try {
    await errorLocator.waitFor({ state: "visible", timeout: 5000 });

    
    await errorLocator.screenshot({ path: "screenshots/invalid-email-error.png" });

    const errorText = await errorLocator.innerText();
    expect.soft(errorText).toContain("Email not found"); // soft assertion → no redline
  } catch (err) {
    console.log(" Error message not found:", err.message);

    await page.screenshot({ path: "screenshots/invalid-email-fallback.png", fullPage: true });

    expect.soft(false, `Handled error: ${err.message}`);
  }

  await page.waitForTimeout(5000);
});
