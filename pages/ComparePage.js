// pages/ComparePage.js
import { expect } from "@playwright/test";

export class ComparePage {
  constructor(page) {
    this.page = page;
    this.compareLink = page.locator('a[href="/compareproducts"]');
    this.compareTable = page.locator('.compare-products-table');
    this.clearListButton = page.locator('input[value="Clear list"], .clear-list');
    this.emptyMessage = page.locator('.no-data, .result');
  }

  async openComparePage() {
    await expect(this.compareLink).toBeVisible();
    await this.compareLink.click();
  }

  async verifyComparisonTable() {
    await expect(this.compareTable).toBeVisible();
  }

  async clearComparisonList() {
    if (await this.clearListButton.count() > 0) {
      await this.clearListButton.click();
    }
  }

  async verifyComparisonListCleared() {
    await expect(this.emptyMessage).toBeVisible();
  }
}
