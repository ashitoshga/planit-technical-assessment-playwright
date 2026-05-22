import { Page } from "@playwright/test";
import { BasePage } from "./basePg";
import { expect } from "@playwright/test";

export class ContactPage extends BasePage {
    
  constructor(page: Page) {
    super(page);
  } 

  elements = {
    forenameInput: this.page.getByRole('textbox', { name: 'forename' }),
    surnameInput: this.page.getByRole('textbox', { name: 'surname' }),
    emailInput: this.page.getByRole('textbox', { name: 'email' }),
    telephoneInput: this.page.getByRole('textbox', { name: 'telephone' }),
    messageInput: this.page.getByRole('textbox', { name: 'message' }),
    submitButton: this.page.getByRole('link', {name: 'Submit'}),
    alertpopup: this.page.locator('.popup.modal'),
    successMessage: this.page.locator('.alert-success'),
    errorMessage: this.page.locator('.alert-error'),
    forenameError: this.page.locator('#forename-err'),
    emailError: this.page.locator('#email-err'),
    messageError: this.page.locator('#message-err')
  }

  async fillContactForm(forename: string, email: string, message: string) {
    await this.elements.forenameInput.fill(forename);
    await this.elements.emailInput.fill(email);
    await this.elements.messageInput.fill(message);
  }

 

  async getSuccessMessage(forename: string) {
    
    await expect(this.elements.alertpopup).toBeVisible();
    await expect(this.elements.alertpopup).toHaveText('Sending Feedback', { timeout: 10000 });
    await expect(this.elements.alertpopup).toBeHidden({ timeout: 25000 });
    await expect(this.elements.successMessage).toContainText(`Thanks ${forename}, we appreciate your feedback.`, { timeout: 10000 });
  }

  async validateErrorMessage() {
    await expect(this.elements.forenameError).toContainText('Forename is required');
    await expect(this.elements.emailError).toContainText('Email is required');
    await expect(this.elements.messageError).toContainText('Message is required');
    await expect(this.elements.errorMessage).toContainText('We welcome your feedback - but we won\'t get it unless you complete the form correctly.');
  }

  async validateErrorMessageRemoved() {
    await expect(this.elements.forenameError).toBeHidden();
    await expect(this.elements.emailError).toBeHidden();
    await expect(this.elements.messageError).toBeHidden();
    await expect(this.elements.errorMessage).toBeHidden();
  }

async submitContactForm() {
    await this.elements.submitButton.click();
  }
  





}
