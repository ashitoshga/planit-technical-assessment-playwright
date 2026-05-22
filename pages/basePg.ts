import {Page} from '@playwright/test';

export class BasePage {

  constructor(public page: Page) {
    this.page = page;
  }

  navigateToHomePage() {
    return this.page.goto('https://jupiter.cloud.planittesting.com');
  }
}