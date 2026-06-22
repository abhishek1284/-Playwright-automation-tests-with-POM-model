import { expect } from "@playwright/test";

export class AddToCartPage {
  constructor(page) {
    this.page = page;

    // Product
    this.addToCartButton = page.locator("input[value='Add to cart']");

    // Cart
    this.cartQuantity = page.locator(".cart-qty");
    this.cartLink = page.locator("#topcartlink");

    // Shopping Cart Page
    this.countryDropdown = page.locator("#CountryId");
    this.stateDropdown = page.locator("#StateProvinceId");
    this.estimateShippingButton = page.locator("input.estimate-shipping-button");
    this.termsCheckbox = page.locator("#termsofservice");
    this.checkoutButton = page.locator("#checkout");

    // Notification
    this.successNotification = page.locator("#bar-notification .content");

    // Billing address fields
    this.firstName = page.locator("#BillingNewAddress_FirstName");
    this.lastName = page.locator("#BillingNewAddress_LastName");
    this.email = page.locator("#BillingNewAddress_Email");
    this.country = page.locator("#BillingNewAddress_CountryId");
    this.city = page.locator("#BillingNewAddress_City");
    this.address1 = page.locator("#BillingNewAddress_Address1");
    this.zip = page.locator("#BillingNewAddress_ZipPostalCode");
    this.phone = page.locator("#BillingNewAddress_PhoneNumber");

    // Scoped locator for Billing Continue
    this.billingContinue = page.locator(
      "#billing-buttons-container input.button-1.new-address-next-step-button"
    );
  }

  async clickAddToCartOnProductPage() {
    await this.addToCartButton.first().click();
    await expect(this.successNotification).toContainText(
      "The product has been added to your shopping cart",
      { timeout: 10000 }
    );
  }

  async verifyAddToCartSuccess() {
    await expect(this.cartQuantity).not.toContainText("(0)", { timeout: 10000 });
  }

  async goToShoppingCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async estimateShipping(country = "Nepal") {
    await this.countryDropdown.waitFor({ state: "visible", timeout: 10000 });
    await this.countryDropdown.selectOption({ label: country });

    const stateCount = await this.stateDropdown.locator("option").count();
    if (stateCount > 1) {
      await this.stateDropdown.selectOption({ index: 1 });
    }

    await this.estimateShippingButton.scrollIntoViewIfNeeded();
    await expect(this.estimateShippingButton).toBeVisible();
    await this.estimateShippingButton.click({ force: true });
    await this.page.waitForTimeout(2000);
  }

  async proceedToCheckout() {
    await this.termsCheckbox.check();
    await expect(this.termsCheckbox).toBeChecked();
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout/, { timeout: 15000 });
  }

  async fillShippingAndCheckout(country = "Nepal") {
    try {
      await this.estimateShipping(country);
    } catch (error) {
      console.log("Estimate Shipping skipped. Proceeding to Checkout...");
    }
    await this.proceedToCheckout();
  }

  async fillBillingAddress(firstName, lastName, email, city, address1, zip, phone, country = "Nepal") {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.country.selectOption({ label: country });
    await this.city.fill(city);
    await this.address1.fill(address1);
    await this.zip.fill(zip);
    await this.phone.fill(phone);

    // Click Billing Continue
    await this.billingContinue.click();

    // ✅ Take screenshot after billing step
    await this.page.screenshot({ path: "screenshots/billing-step.png", fullPage: true });
  }
}
