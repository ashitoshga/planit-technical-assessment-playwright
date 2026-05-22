import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePg";

export class HomePage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  elements = {
    homePageTitle: this.page.locator('h1'),
    contactLink: this.page.getByRole('link', { name: 'Contact' }),
    shopLink: this.page.getByRole('link', { name: 'Shop' , exact: true }),
    cartLink: this.page.getByRole('link', { name: 'Cart' }),
    loginLink: this.page.getByRole('link', { name: 'Login' }),
    homeLink: this.page.getByRole('link', { name: 'Home' })
  }

  async validateHomePageTitle() {
    await expect(this.elements.homePageTitle).toHaveText('Welcome to the Jupiter Toys store');
  }

  async clickOnContactLink() {
    await this.elements.contactLink.click();
  }

  async clickOnShopLink() {
    await this.elements.shopLink.click();
  }

  async clickOnCartLink() {
    await this.elements.cartLink.click();
  }

  async clickOnLoginLink() {
    await this.elements.loginLink.click();
  }

  async clickOnHomeLink() {
    await this.elements.homeLink.click();
  }
}