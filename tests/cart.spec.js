import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products.page.js';
import { CartPage } from '../pages/cart.page.js';

test.describe('Search & Add to Cart (uses saved storageState)', () => {
    test('@E2E 1. Search T-shirt and add to cart', async ({ page }) => {
        // const home = new HomePage(page);
        // const products = new ProductsPage(page);
        // const cart = new CartPage(page);

        // await home.goto();               // already authenticated by storageState
        // await home.openProducts();       // add this method in HomePage if you haven't

        // await products.search('T-shirt');
        // await products.openFirstResult();

        // const pdpName = (await page.locator('h1,h2,.product-information h2').first().textContent())?.trim() || '';
        // await products.addToCartOnPdp(); // or keep your current button logic
        // await cart.openFromModalIfVisible();

        // await cart.expectProductNameContains(pdpName.split(' ')[0] || 'T-shirt');
        // await cart.expectQuantityEquals(1);
    });
});