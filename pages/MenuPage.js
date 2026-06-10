import { expect } from "@playwright/test";

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.menus = page.locator(".top-menu > li");
  }

  async navigate() {
    await this.page.goto("https://demowebshop.tricentis.com/");
  }

  async validateAllMenusAndSubMenus() {
    const menuCount = await this.menus.count();

    for (let i = 0; i < menuCount; i++) {
      const menuName = await this.menus.nth(i).textContent();

      console.log(`Main Menu: ${menuName}`);

      await this.menus.nth(i).hover();

      const subMenus = this.menus.nth(i).locator("ul li");
      const subCount = await subMenus.count();

      for (let j = 0; j < subCount; j++) {
        const subMenuName = await subMenus.nth(j).textContent();

        console.log(`   Sub Menu: ${subMenuName}`);

        expect(subMenuName?.trim()).not.toBe("");
      }
    }
  }
}