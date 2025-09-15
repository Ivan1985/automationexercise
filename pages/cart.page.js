import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        // Adjust selectors to site markup if needed.
        this.productNameCell = page.locator('tr').locator('td').nth(1);
        this.productPriceCell = page.locator('tr').locator('td').nth(2);
        this.quantityInput = page.locator('input[type="number"], .cart_quantity_input');
    }

    async expectProductNameContains(partial) {
        await expect(this.page.getByRole('table')).toBeVisible();
        await expect(this.productNameCell).toContainText(new RegExp(partial, 'i'));
    }

    async expectQuantityEquals(qty) {
        if (await this.quantityInput.isVisible()) {
            await expect(this.quantityInput).toHaveValue(String(qty));
        } else {
            // Some carts render quantity as text
            await expect(this.page.locator('td', { hasText: String(qty) }).first()).toBeVisible();
        }
    }
}