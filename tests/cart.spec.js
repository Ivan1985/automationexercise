import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products.page.js';
import { CartPage } from '../pages/cart.page.js';

test.describe('Task 2: Search and Add a Product to Cart', () => {
    test('@E2E 2. Test the search functionality and cart behavior', async ({ page }) => {
        const home = new HomePage(page);
        const products = new ProductsPage(page);
        const cart = new CartPage(page);

        console.log('=== Task 2: Search & Add to Cart ===');

        // 1) Navigate to Home
        await home.goto();

        // 2) Go to Products
        await home.openProducts();

        // 3) Search for "T-shirt"
        const query = 'T-shirt';
        await products.search(query);

        // 4) Open first "View Product" (PDP)
        await products.openFirstResultPdp();

        // 5) Grab PDP details (name & unit price)
        const { name, priceText } = await products.getPdpDetails();
        console.log(`PDP name: ${name} | price: ${priceText}`);

        // 6) Add to cart from PDP
        await products.addToCartOnPdp();

        // 7) Open Cart (via modal or direct)
        await products.openCartFromModalIfVisible();

        // 8) Verify cart row matches PDP (quantity should be 1 by default)
        await cart.expectProductMatches({ name, priceText, quantity: 1 });

        console.log('=== Task 2 completed: cart details match PDP ===');
    });
});