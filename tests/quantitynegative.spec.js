import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { AddToCartPage } from "../pages/AddToCartPage";
import fs from "fs";
import path from "path";

test("Verify quantity 0 shows error message", async ({ page }) => {
  const searchPage = new SearchPage(page);
  const addToCartPage = new AddToCartPage(page);

  const screenshotDir = path.resolve("screenshots");

  // Create folder safely
  try {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  } catch (err) {
    console.log("Failed to create screenshots folder:", err);
  }

  try {
    await searchPage.goto();

    // Search product
    await searchPage.searchFor("computer");
    await searchPage.verifyResultsContain("computer");

    // Open first product
    await searchPage.openFirstResult();

    const qtyBox = page.locator("input.qty-input");

    // Enter quantity 0
    await qtyBox.fill("0");
    await expect(qtyBox).toHaveValue("0");

    // Screenshot after entering quantity
    await page.screenshot({
      path: path.join(screenshotDir, "qty-0.png"),
      fullPage: true,
    });

    // Add to cart (safe wait)
    await Promise.all([
      page.waitForLoadState("domcontentloaded"),
      addToCartPage.clickAddToCart(72),
    ]);

    // Screenshot after add to cart
    await page.screenshot({
      path: path.join(screenshotDir, "after-add-to-cart.png"),
      fullPage: true,
    });

    // Error message check
    const errorMessage = page.locator(
      ".message-error, .validation-summary-errors"
    );

    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    // Screenshot error
    await page.screenshot({
      path: path.join(screenshotDir, "error-message.png"),
      fullPage: true,
    });

    console.log("TEST PASSED ✔");
  } catch (error) {
    console.log("TEST FAILED ❌", error);

    // 🔥 FINAL SAFE SCREENSHOT (important for debugging)
    try {
      await page.screenshot({
        path: path.join(screenshotDir, "failure-debug.png"),
        fullPage: true,
      });
      console.log("Failure screenshot captured");
    } catch (screenshotError) {
      console.log("Even failure screenshot failed:", screenshotError);
    }

    throw error; // rethrow so Playwright marks test as failed
  }
});