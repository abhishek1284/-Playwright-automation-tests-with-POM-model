import { expect } from "@playwright/test";

export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.button-1.search-box-button');
    this.searchResults = page.locator('.product-item');
    this.firstResultLink = page.locator('.product-item h2 a').first();
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async searchFor(term) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }

  async verifyResultsContain(term) {
    const firstTitle = this.page.locator('.product-item h2 a').first();
    //  Use regex for case-insensitive partial match
    await expect(firstTitle).toContainText(new RegExp(term, "i"), { timeout: 5000 });
  }

  async openFirstResult() {
    await this.firstResultLink.click();
    await this.page.waitForLoadState('networkidle');
  }
}