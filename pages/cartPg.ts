import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePg";
import { HomePage } from "./homePg";
import { ContactPage } from "./contactPg";

export class CartPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  elements = {
    rows: this.page.locator('tr.cart-item'),
    columns: this.page.locator('tr.cart-item>td')
  }

  async validateProductPriceOnCartPg(product: string, expectedPrice: string) {
    const row = this.page.locator(`tr:has-text("${product}")`);
    await expect(row.locator('td').nth(1)).toContainText(expectedPrice);
  }

  async validateSubtotalProductPrice(productName: string, expectedSubtotal: string) {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    await expect(row.locator('td').nth(3)).toContainText(expectedSubtotal);
    const subTotal = await row.locator('td').nth(3).textContent();
   
    const subtotalNumber = Number(subTotal?.replace('$', ''));
    const expectedSubTotalNum = Number(expectedSubtotal.replace('$', ''));
    expect(subtotalNumber).toBe(expectedSubTotalNum);
    return subtotalNumber;

    };

  async validateTotalPrice(expectedTotal: number) {
    
    const total = await this.page.locator('.total').textContent();
    const totalValue = Number(total?.replace('Total: ', '').replace('$', ''));
    expect(totalValue).toBe(expectedTotal);
  }
  




}