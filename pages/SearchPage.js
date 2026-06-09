import { expect } from "@playwright/test";

export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.button-1.search-box-button');
    this.searchResults = page.locator('.product-item');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async searchFor(term) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }

  async verifyResultsContain(term) {
    const results = this.searchResults;
    await expect(results.first()).toContainText(term, { timeout: 5000 });
  }
}
