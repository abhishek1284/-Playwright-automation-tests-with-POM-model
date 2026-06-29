import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { AddToCartPage } from "../pages/AddToCartPage";
import fs from "fs";
import path from "path";

test("Verify quantity 0 shows error message", async ({ page }) => {
  const searchPage = new SearchPage(page);
  const addToCartPage = new AddToCartPage(page);

  const screenshotDir = path.resolve("screenshots");

 
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
  
    await searchPage.goto();

    await searchPage.searchFor("computer");
    await searchPage.verifyResultsContain("computer");

   
    await searchPage.openFirstResult();

    const qtyBox = page.locator("input.qty-input");

  
    await qtyBox.fill("0");
    await expect(qtyBox).toHaveValue("0");

    await page.screenshot({
      path: path.join(screenshotDir, "qty-0.png"),
      fullPage: true,
    });

   
    await addToCartPage.clickAddToCart(72);

   
    await page.waitForTimeout(2000);


    const validationMessage = page.getByText(
      "Quantity should be positive",
      { exact: false }
    );

    await expect(validationMessage).toBeVisible({
      timeout: 10000,
    });

    await expect(validationMessage).toContainText(
      "Quantity should be positive"
    );

    await page.screenshot({
      path: path.join(
        screenshotDir,
        "quantity-validation-error.png"
      ),
      fullPage: true,
    });

    console.log(
      "Validation message displayed: Quantity should be positive"
    );

    console.log("TEST PASSED ✔");
  } catch (error) {
    console.log("TEST FAILED ❌", error);

    try {
      await page.screenshot({
        path: path.join(
          screenshotDir,
          "failure-debug.png"
        ),
        fullPage: true,
      });

      console.log("Failure screenshot captured");
    } catch (screenshotError) {
      console.log(
        "Even failure screenshot failed:",
        screenshotError
      );
    }

    throw error;
  }
});