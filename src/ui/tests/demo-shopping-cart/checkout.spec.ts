import { test, expect, Page } from '@playwright/test';
import { productsToAdd } from 'data/demo-shopping-cart/products';
import { promoCodes } from 'data/demo-shopping-cart/promocodes';

test.describe('[DDT] [Demo-shopping-cart] [E2E]', () => {
  test('Checkout with multiple products and promo codes', async ({ page }) => {
    await page.goto('https://anatoly-karpovich.github.io/demo-shopping-cart/');

    // 1. Add products 2, 4, 6, 8, 10
    for (const product of productsToAdd) {
    await getAddToCardButton(product.name, page).click();
    }

    // 2. Validate the badge with the number of items
    await expect(page.locator('#badge-number')).toHaveText(`${productsToAdd.length}`);

    // 3. Get product prices and calculate total
    const prices = await Promise.all(
    productsToAdd.map(product => getProductPrice(product.name, page)));
    const expectedTotal = prices.reduce((sum, price) => sum + price, 0);

    // 4. Open the cart (checkout view)
    await page.getByRole('button', { name: 'Shopping Cart' }).click();

    // 5. Wait for the cart items to be visible
    const cartItemLocator = page.locator('h5.my-0.fw-bold');
    await expect(cartItemLocator.first()).toBeVisible();

    // 6. Validate the total price
    await expect(page.locator('#total-price')).toHaveText(`$${expectedTotal}.00`);

    // 7. Validate the list of products in the cart
    const titlesInCart = await cartItemLocator.allTextContents();
    const expectedTitles = productsToAdd.map(product => product.name);
    console.log('Titles in cart:', titlesInCart);
    expect(titlesInCart).toEqual(expectedTitles);

    // 8. Apply all promo codes
    console.log('Promocodes:', promoCodes);

    const promoInput = page.locator('#rebate-input');
    const redeemButton = page.locator('#apply-promocode-button');

    await promoInput.scrollIntoViewIfNeeded();
    await promoInput.waitFor({ state: 'visible' });

    for (const code of promoCodes) {
    console.log(`Apply promo code: ${code}`);
    await promoInput.fill(code);
    await redeemButton.click();
    await page.waitForTimeout(500); // let the page recalculate
    }

    // 9. Validate the final price after discounts
    const totalText = await page.locator('#total-price').innerText(); // "$1412.50 (-$4237.5)"
    const [finalTotalString] = totalText.split(' '); // "$1412.50"
    const finalPrice = parseFloat(finalTotalString.replace('$', ''));

    expect(finalPrice).toBeLessThan(expectedTotal);

    // 10. Proceed to checkout
    await page.click('#continue-to-checkout-button');

    // 11. Validate the final order total on the confirmation page
    const orderTotalText = await page.locator('.text-muted').last().innerText();
    const orderTotal = parseFloat(orderTotalText.replace('$', ''));
    expect(orderTotal).toBe(finalPrice)
  });
});

// Utilities (helpers)
function getAddToCardButton(productName: string, page: Page) {
  return page
    .locator('div.card-body')
    .filter({
    has: page.getByText(productName, { exact: true }),
    })
    .getByRole('button', { name: 'Add to card' });
}

function getProductPriceSpan(productName: string, page: Page) {
  return page
    .locator('div.card-body')
    .filter({
    has: page.getByText(productName, { exact: true }),
    })
    .locator('span');
}

async function getProductPrice(productName: string, page: Page): Promise<number> {
  const productPriceSpan = getProductPriceSpan(productName, page);
  const priceText = await productPriceSpan.innerText();
  return +priceText.replace('$', '');
}

