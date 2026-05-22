import { test } from "@playwright/test";
import { HomePage } from "../pages/homePg";
import { ContactPage } from "../pages/contactPg";
import { CartPage } from "../pages/cartPg";
import { ShopPage } from "../pages/shopPg";
import { testData } from "../pages/utils/testData";

test.describe('Shop Tests Suite', () => {
  let homePage: HomePage;
  let cartPage: CartPage;
  let contactPage: ContactPage;
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    contactPage = new ContactPage(page);
    shopPage = new ShopPage(page);
   
  });

  test('Test Case 1', async () => {

    await homePage.navigateToHomePage();
    await homePage.clickOnContactLink();
    await contactPage.submitContactForm();
    await contactPage.validateErrorMessage();
    
    await contactPage.fillContactForm(testData.contactForm.forename, testData.contactForm.email, testData.contactForm.message);
    await contactPage.validateErrorMessageRemoved();
    
    await contactPage.submitContactForm();
    await contactPage.getSuccessMessage(testData.contactForm.forename);

  })

test.describe.configure({ mode: 'default' });
test.setTimeout(60000); 

    //Run the test 5 times
  for(let i=1; i<5; i++) {
  test('Test Case 2 - Running test for ' + (i) + ' ' +'time' , async () => {
    await homePage.navigateToHomePage();
    await homePage.clickOnContactLink();
    await contactPage.fillContactForm(testData.contactForm.forename, testData.contactForm.email, testData.contactForm.message);
    await contactPage.submitContactForm();
    await contactPage.getSuccessMessage(testData.contactForm.forename);

  })
  }

  test('Test Case 3', async () => {
    await homePage.navigateToHomePage();
    await homePage.clickOnShopLink();
    await shopPage.buyProduct('Stuffed Frog', 2);
    await shopPage.buyProduct('Fluffy Bunny', 5);
    await shopPage.buyProduct('Valentine Bear', 3);
    await shopPage.validateProductPrice('Valentine Bear', '$14.99');
    await homePage.clickOnCartLink();
    //product price for each product
    await cartPage.validateProductPriceOnCartPg('Stuffed Frog', '$10.99');
    await cartPage.validateProductPriceOnCartPg('Fluffy Bunny', '$9.99');
    await cartPage.validateProductPriceOnCartPg('Valentine Bear', '$14.99');
    //subtotal price for each product
    const subTotal1 = await cartPage.validateSubtotalProductPrice('Stuffed Frog', '$21.98');
    const subTotal2 = await cartPage.validateSubtotalProductPrice('Fluffy Bunny', '$49.95');
    const subTotal3 = await cartPage.validateSubtotalProductPrice('Valentine Bear', '$44.97');
    //total price
    const expectedTotal = subTotal1 + subTotal2 + subTotal3;
    await cartPage.validateTotalPrice(expectedTotal);
  })


});
