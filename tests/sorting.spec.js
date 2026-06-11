// tests/sorting.spec.js
const { test } = require('@playwright/test');
const { SortPage } = require('../pages/SortPage');

test.describe('Product Sorting Scenarios', () => {
  let sortPage;

  test.beforeEach(async ({ page }) => {
    sortPage = new SortPage(page);
    await sortPage.goto('https://demowebshop.tricentis.com/books');
  });

  test('Sort by Name A-Z', async ({ page }) => {
    sortPage = new SortPage(page);
    await sortPage.sortBy('Name: A to Z');
    const names = await sortPage.getProductNames();
    if (names.length > 0) {
      await sortPage.verifySortedAscending(names);
    }
  });

  test('Sort by Name Z-A', async ({ page }) => {
    sortPage = new SortPage(page);
    await sortPage.sortBy('Name: Z to A');
    const names = await sortPage.getProductNames();
    if (names.length > 0) {
      await sortPage.verifySortedDescending(names);
    }
  });

  test('Sort by Price Low-High', async ({ page }) => {
    sortPage = new SortPage(page);
    await sortPage.sortBy('Price: Low to High');
    const prices = await sortPage.getProductPrices();
    if (prices.length > 0) {
      await sortPage.verifySortedAscending(prices);
    }
  });

  test('Sort by Price High-Low', async ({ page }) => {
    sortPage = new SortPage(page);
    await sortPage.sortBy('Price: High to Low');
    const prices = await sortPage.getProductPrices();
    if (prices.length > 0) {
      await sortPage.verifySortedDescending(prices);
    }
  });
});
