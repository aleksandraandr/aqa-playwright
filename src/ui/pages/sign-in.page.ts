import { ICredentials } from 'types/customers/sign-in.types';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.getByRole('button', { name: 'Login'});
  
  readonly uniqueElement = this.loginButton;

  public async fillCredentials({ email, password }: ICredentials) {
    email && (await this.emailInput.fill(email));
    password && (await this.passwordInput.fill(password));
  }

  public async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }
}

  
