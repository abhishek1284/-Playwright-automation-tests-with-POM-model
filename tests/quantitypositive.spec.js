import { test } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { AddToCartPage } from "../pages/AddToCartPage";

test('Search item and verify quantity 0 shows error', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const addToCartPage = new AddToCartPage(page);

  await searchPage.goto();
  await searchPage.searchFor('computer');
  await searchPage.verifyResultsContain('computer');

  // Open the first product result and navigate to the product page
  await searchPage.openFirstResult();

  // Set quantity to 0 on the product page
  await addToCartPage.setQuantity(74, 0);

  // Try to add to cart
  await addToCartPage.clickAddToCartOnProductPage();

  // Verify error message
  await addToCartPage.verifyQuantityError('Quantity must be positive');

  await page.waitForTimeout(3000);
});
