import { expect } from "@playwright/test";

export class AddToCartPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator("//input[@value='Add to cart']");
    this.barNotification = page.locator('#bar-notification');
    this.cartQuantity = page.locator('.cart-qty');
  }

  async addToCartFromSearchOrProduct() {
    // Click add to cart button (works on search results or product page)
    await this.addToCartButton.first().click();
    // Wait for page navigation if coming from search results
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
    // Wait a bit for the page to settle
    await this.page.waitForTimeout(1000);
  }

  async clickAddToCartOnProductPage() {
    // After navigating to product page, click the add to cart button again
    await this.addToCartButton.first().click();
  }

  async verifyAddToCartSuccess() {
    // Check that cart quantity was updated (visible on page header)
    await expect(this.cartQuantity).toContainText('(1)', { timeout: 5000 });
  }
}