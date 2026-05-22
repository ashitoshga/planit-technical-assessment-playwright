import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePg";

export class ShopPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async buyProduct(productName: string, quantity: number) {
    for (let i = 0; i < quantity; i++) {
    const prodEle = this.page.locator('li.product', {hasText: productName});
    await prodEle.getByRole('link', { name: 'Buy' }).click();
    }
  }

  async validateProductPrice(productName: string, expectedPrice: string) {
    const prodElePrice = this.page.locator('li.product', {hasText: productName});
    await expect(prodElePrice.locator('.product-price')).toHaveText(expectedPrice);
  }
   



}