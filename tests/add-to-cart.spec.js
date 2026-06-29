import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { AddToCartPage } from "../pages/AddToCartPage";

test("Search item and verify Add to Cart works", async ({ page }) => {
  const searchPage = new SearchPage(page);
  const addToCartPage = new AddToCartPage(page);

  await searchPage.goto();

  await searchPage.searchFor("computer");
  await searchPage.verifyResultsContain("computer");

  await searchPage.openFirstResult();

  const productId = 72;

  await addToCartPage.setQuantity(productId, 1);
  await addToCartPage.clickAddToCart(productId);

  await addToCartPage.verifyAddToCartSuccess();


  const successMessage = page.locator(".bar-notification.success");
  await expect(successMessage).toBeVisible();

 
  await successMessage.screenshot({
    path: "screenshots/add-to-cart-success-message.png",
  });

  await page.screenshot({
    path: "screenshots/add-to-cart-full-page.png",
    fullPage: true,
  });

  await page.waitForTimeout(3000);
});