import { test } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";

test("Validate Demo Web Shop menu navigation", async ({ page }) => {

  const menuPage = new MenuPage(page);

  await menuPage.navigate();

  await menuPage.validateAllMenusAndSubMenus();

});