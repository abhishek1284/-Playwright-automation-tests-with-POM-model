import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { AddToCartPage } from "../pages/AddToCartPage";

test('Search item and verify quantity 0 shows error', async ({ page }) => {
  const searchPage = new SearchPage(page);
  const addToCartPage = new AddToCartPage(page);

  await searchPage.goto();
  await searchPage.searchFor('computer');
  await searchPage.verifyResultsContain('computer');

  await searchPage.openFirstResult();

  await addToCartPage.setQuantity(74, 0);
  await addToCartPage.clickAddToCartOnProductPage();

  try {
    
    await addToCartPage.verifyQuantityError('Quantity should be positive');
  } catch (error) {
    console.error(" Quantity error verification failed:", error.message);

    
    await page.screenshot({ path: 'quantity-error.png', fullPage: true });

    expect(false, `Handled error: ${error.message}`).toBe(true);
  }

  await page.waitForTimeout(3000);
});