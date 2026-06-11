// pages/SortPage.js
const { expect } = require('@playwright/test');

class SortPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('select#products-orderby');
    this.productItems = page.locator('.product-item');
    this.productTitles = page.locator('.product-title');
    this.productPrices = page.locator('.actual-price');
  }

  async goto(url = 'https://demowebshop.tricentis.com/books') {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
    await this.sortDropdown.waitFor({ state: 'visible', timeout: 10000 });
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
    await this.page.waitForTimeout(500);
    await this.page.waitForLoadState('networkidle');
  }

  async getProductNames() {
    await this.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
    const names = await this.productTitles.allTextContents();
    return names.map(name => name.trim()).filter(name => name.length > 0);
  }

  async getProductPrices() {
    await this.productPrices.first().waitFor({ state: 'visible', timeout: 10000 });
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts
      .map(price => {
        const match = price.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      })
      .filter(price => price > 0);
  }

  async verifySortedAscending(values) {
    const sorted = [...values].sort((a, b) => 
      typeof a === 'string' ? a.localeCompare(b) : a - b
    );
    expect(values).toEqual(sorted);
  }

  async verifySortedDescending(values) {
    const sorted = [...values].sort((a, b) => 
      typeof a === 'string' ? b.localeCompare(a) : b - a
    );
    expect(values).toEqual(sorted);
  }
}

module.exports = { SortPage };
