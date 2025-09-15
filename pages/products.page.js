import { expect } from '@playwright/test';

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder(/search/i);
        this.searchButton = page.getByRole('button', { name: /search/i });
        // Generic product card – adjust selector if DOM differs.
        this.productCards = page.locator('.product-image-wrapper, .product, [data-test="product-card"]');
    }

    async search(query) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
        await expect(this.productCards.first()).toBeVisible();
    }

    async openFirstResult() {
        // Prefer a "View Product" link; fallback to any link in the card.
        const first = this.productCards.first();
        const viewLink = first.getByRole('link', { name: /view product/i }).or(first.getByRole('link'));
        await viewLink.first().click();
    }
}