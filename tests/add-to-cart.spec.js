 import { test } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { AddToCartPage } from "../pages/AddToCartPage";

test('Search item and verify add to cart button works using POM', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const addToCartPage = new AddToCartPage(page);

  await searchPage.goto();
  await searchPage.searchFor('computer');
  await searchPage.verifyResultsContain('computer');

  // Click add to cart from search results (navigates to product page)
  await addToCartPage.addToCartFromSearchOrProduct();

  // Click add to cart on the product page
  await addToCartPage.clickAddToCartOnProductPage();

  // Verify the item was added to cart
  await addToCartPage.verifyAddToCartSuccess();

  await page.waitForTimeout(3000);
});