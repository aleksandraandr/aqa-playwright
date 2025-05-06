import { Locator } from '@playwright/test';
import { Modal } from 'ui/pages/modals/customers/modal.page';

export class DeleteCustomerModal extends Modal {
  readonly uniqueElement = this.page.locator('.modal-dialog');
  private readonly confirmButton = this.page.getByRole('button', { name: /Yes, Delete/i });

  async confirmDeletion() {
    await this.confirmButton.click();
    await this.waitForClosed();
  }
}
