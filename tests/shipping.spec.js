import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { SearchPage } from "../pages/SearchPage";
import { AddToCartPage } from "../pages/AddToCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("Register, search product, add to cart, fill billing, and confirm order", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const searchPage = new SearchPage(page);
  const addToCartPage = new AddToCartPage(page);
  const checkoutPage = new CheckoutPage(page);

  const email = `abhishek${Date.now()}@gmail.com`;
  const password = "Password123!";

  // Step 1: Register
  await registerPage.goto();
  await registerPage.openRegisterPage();
  await registerPage.registerUser("Abhishek", "Pradhan", email, password);
  await registerPage.verifyRegistrationSuccess();

  // Step 2: Search + Add product
  await searchPage.searchFor("computer");
  await searchPage.verifyResultsContain("computer");
  await searchPage.openFirstResult();
  await addToCartPage.clickAddToCartOnProductPage();
  await addToCartPage.verifyAddToCartSuccess();

  // Step 3: Cart + Estimate shipping + Checkout
  await addToCartPage.goToShoppingCart();
  await addToCartPage.fillShippingAndCheckout("Nepal");

  // Step 4: Fill billing address
  await addToCartPage.fillBillingAddress(
    "Abhishek",
    "Pradhan",
    email,
    "Kathmandu",
    "Baneshwor Road",
    "44600",
    "9800000000"
  );

  // Step 5: Shipping + Payment + Confirm
  await checkoutPage.completeShipping();
  await checkoutPage.completePayment();
  await checkoutPage.confirmPaymentInfo();

  // ✅ Step 6: Click Confirm button
  await checkoutPage.confirmOrder();

  // Step 7: Verify success
  await checkoutPage.verifyOrderSuccess();
});
