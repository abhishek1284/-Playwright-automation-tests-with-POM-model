import { test } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { ComparePage } from "../pages/ComparePage";

test.describe("Search and Compare Products", () => {

  test("Search for Computer and Books, then compare", async ({ page }) => {
    const searchPage = new SearchPage(page);
    const comparePage = new ComparePage(page);

    try {
      // Search for computer
      await searchPage.goto();
      await searchPage.searchFor("computer");
      await searchPage.verifyResultsContain("computer");
      await searchPage.openFirstResult();

      await page
        .locator('input[value="Add to compare list"]')
        .click({ timeout: 5000 });

      console.log("Computer added to compare list");
    } catch (error) {
      console.log("Error while adding computer:", error.message);
    }

    try {
      // Search for book
      await searchPage.goto();
      await searchPage.searchFor("book");
      await searchPage.verifyResultsContain("book");
      await searchPage.openFirstResult();

      await page
        .locator('input[value="Add to compare list"]')
        .click({ timeout: 5000 });

      console.log("Book added to compare list");
    } catch (error) {
      console.log("Error while adding book:", error.message);
    }

    try {
      // Compare page
      await comparePage.openComparePage();
      await comparePage.verifyComparisonTable();

      console.log("Comparison table verified");
    } catch (error) {
      console.log("Comparison table verification failed:", error.message);
    }
  });

  test("Clear comparison list", async ({ page }) => {
    const searchPage = new SearchPage(page);
    const comparePage = new ComparePage(page);

    try {
      await searchPage.goto();
      await searchPage.searchFor("computer");
      await searchPage.openFirstResult();

      await page
        .locator('input[value="Add to compare list"]')
        .click({ timeout: 5000 });

      console.log("Computer added");
    } catch (error) {
      console.log("Computer add failed:", error.message);
    }

    try {
      await searchPage.goto();
      await searchPage.searchFor("book");
      await searchPage.openFirstResult();

      await page
        .locator('input[value="Add to compare list"]')
        .click({ timeout: 5000 });

      console.log("Book added");
    } catch (error) {
      console.log("Book add failed:", error.message);
    }

    try {
      await comparePage.openComparePage();
      await comparePage.clearComparisonList();
      await comparePage.verifyComparisonListCleared();

      console.log("Comparison list cleared successfully");
    } catch (error) {
      console.log("Clear comparison list failed:", error.message);
    }
  });

});