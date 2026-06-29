// import { test } from "@playwright/test";
// import { RegisterPage } from "../pages/RegisterPage";
// import { SearchPage } from "../pages/SearchPage";
// import { AddToCartPage } from "../pages/AddToCartPage";

// test("Register, add to cart, fill billing only", async ({ page }) => {
//   const registerPage = new RegisterPage(page);
//   const searchPage = new SearchPage(page);
//   const addToCartPage = new AddToCartPage(page);

//   const email = `abhishek${Date.now()}@gmail.com`;
//   const password = "Password123!";

//   // Register
//   await registerPage.goto();
//   await registerPage.openRegisterPage();
//   await registerPage.registerUser("Abhishek", "Pradhan", email, password);
//   await registerPage.verifyRegistrationSuccess();

//   // Search + Add product
//   await searchPage.searchFor("computer");
//   await searchPage.verifyResultsContain("computer");
//   await searchPage.openFirstResult();
//   await addToCartPage.clickAddToCartOnProductPage();
//   await addToCartPage.verifyAddToCartSuccess();

//   // Cart + Estimate shipping + Checkout
//   await addToCartPage.goToShoppingCart();
//   await addToCartPage.fillShippingAndCheckout("Nepal");

//   //  Billing step only
//   await addToCartPage.fillBillingAddress(
//     "Abhishek",
//     "Pradhan",
//     email,
//     "Kathmandu",
//     "Baneshwor Road",
//     "44600",
//     "9800000000",
//     "Nepal"
//   );

//   // Test stops here after billing
// });

