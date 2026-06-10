import { test } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";

test("Add products from multiple categories", async ({ page }) => {

  const productPage = new ProductPage(page);

  const categories = [
    "Books",
    "Computers",
    "Electronics"
  ];

  await productPage.navigateToHomePage();

  await productPage.addProductsFromCategories(categories);

});