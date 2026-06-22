import { test } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";

test("Search functionality using POM", async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();

  await searchPage.searchFor("computer");

  await searchPage.verifyResultsContain("computer");

  // Keep UI visible for debugging
  await page.waitForTimeout(3000);
});



