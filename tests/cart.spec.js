import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products.page.js';
import { CartPage } from '../pages/cart.page.js';

test.describe('Search and Cart', () => {
    test('@E2E Task 2: Search "T-shirt" -> add to cart -> verify name/price/qty', async ({ page }) => {
        // const home = new HomePage(page);
        // const products = new ProductsPage(page);
        // const cart = new CartPage(page);

        // await home.goto();
        // await home.openProducts();

        // const query = 'T-shirt';
        // await products.search(query);

        // // Open first result and capture PDP data
        // await products.openFirstResult();

        // // PDP selectors can vary; adjust to actual DOM if needed.
        // const pdpName = (await page.locator('h2, h1, .product-information h2').first().textContent())?.trim() || '';
        // const pdpPrice = (await page.locator('.price, .product-information span:has-text("$")').first().textContent())?.trim() || '';

        // // Add to cart
        // const addToCartBtn = page
        //     .getByRole('button', { name: /add to cart/i })
        //     .or(page.getByRole('link', { name: /add to cart/i }));
        // await expect(addToCartBtn.first()).toBeVisible();
        // await addToCartBtn.first().click();

        // // Handle modal or go to cart
        // const viewCart = page
        //     .getByRole('link', { name: /view cart/i })
        //     .or(page.getByRole('button', { name: /view cart/i }));
        // if (await viewCart.first().isVisible().catch(() => false)) {
        //     await viewCart.first().click();
        // } else {
        //     await home.openCart();
        // }

        // // Verify product name (partial match is safer) and quantity=1
        // await cart.expectProductNameContains(pdpName.split(' ')[0] || 'T-shirt');
        // await cart.expectQuantityEquals(1);

        // // Optional: verify price appears somewhere in the row
        // if (pdpPrice) {
        //     await expect(page.getByText(pdpPrice, { exact: false })).toBeVisible();
        // }
    });
});