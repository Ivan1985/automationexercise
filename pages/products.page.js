import { expect } from '@playwright/test';

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsLink = page.getByRole('link', { name: /products/i });
        this.searchInput = page.getByRole('textbox', { name: /search product/i });
        this.searchBtn = page.getByRole('button', { name: //i }); // site uses icon text
        this.searchResults = page.locator('.features_items .product-image-wrapper');
    }

    // Go to Products page from anywhere
    async open() {
        await this.productsLink.click();
        await expect(this.page).toHaveURL(/\/products$/);
    }

    // Perform a search and assert results appear
    async search(term) {
        await this.searchInput.fill(term);
        await this.searchBtn.click();

        // Wait for at least 1 result
        const resultsCount = await this.searchResults.count();
        expect(resultsCount).toBeGreaterThan(0);
    }

    // Click "View Product" of the first result
    async openFirstResultPdp() {
        const firstCard = this.searchResults.first();
        await firstCard.getByRole('link', { name: /view product/i }).click();
        await expect(this.page).toHaveURL(/\/product_details\//);
    }

    // Read PDP details (name + price text)
    async getPdpDetails() {
        // Name: lives in ".product-information h2"
        const name = (await this.page.locator('.product-information h2').first().textContent() || '').trim();

        // Price: often shown as "Rs. 1299" inside .product-information
        // We grab the first element that contains "Rs."
        const priceLocator = this.page.locator('.product-information :text("Rs.")').first();
        const priceText = (await priceLocator.textContent() || '').trim();

        return { name, priceText };
    }

    // Click "Add to cart" on PDP
    async addToCartOnPdp() {
        const addBtn = this.page.getByRole('button', { name: /add to cart/i })
            .or(this.page.getByRole('link', { name: /add to cart/i }));
        await addBtn.first().click();
    }

    // Modal appears -> click "View Cart" if present; otherwise navigate to /view_cart
    async openCartFromModalIfVisible() {
        const viewCart = this.page.getByRole('link', { name: /view cart/i })
            .or(this.page.getByRole('button', { name: /view cart/i }));
        if (await viewCart.first().isVisible().catch(() => false)) {
            await viewCart.first().click();
        } else {
            await this.page.goto('/view_cart');
        }
    }
}