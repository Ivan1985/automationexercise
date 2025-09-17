import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.tableRows = page.locator('#cart_info_table tbody tr');
    }

    // Helper: normalize "Rs. 1299" → { text: "Rs. 1299", value: 1299 }
    static parsePrice(priceText) {
        const value = Number((priceText || '').replace(/[^\d]/g, '')) || 0;
        return { text: (priceText || '').trim(), value };
    }

    // Assert first row in cart matches PDP data (name, price, quantity)
    async expectProductMatches({ name, priceText, quantity }) {
        const row = this.tableRows.first();

        // Name
        const cartName = (await row.locator('.cart_description h4 a').textContent() || '').trim();
        expect(cartName).toBe(name);

        // Unit price
        const cartPriceText = (await row.locator('.cart_price p').textContent() || '').trim();
        expect(cartPriceText).toBe(priceText);

        // Quantity (on this site quantity is rendered as a disabled <button> with the number)
        const qtyText = (await row.locator('.cart_quantity button').textContent() || '').trim();
        expect(Number(qtyText)).toBe(quantity);

        // Total = unit price * quantity (check both numeric and text)
        const unit = CartPage.parsePrice(cartPriceText).value;
        const totalExpected = unit * quantity;

        const cartTotalText = (await row.locator('.cart_total .cart_total_price').textContent() || '').trim();
        const cartTotalValue = CartPage.parsePrice(cartTotalText).value;

        expect(cartTotalValue).toBe(totalExpected);
    }
}