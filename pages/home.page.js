import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginLink = page.getByRole('link', { name: /signup \/ login/i });
        this.productsLink = page.getByRole('link', { name: /products/i });
        this.cartLink = page.getByRole('link', { name: /cart/i });
    }

    async goto() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        // Basic sanity check that Home is loaded.
        await expect(this.page.getByRole('link', { name: /home/i })).toBeVisible();
    }

    async openAuth() {
        await this.signupLoginLink.click();
    }

    async openProducts() {
        await this.productsLink.click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}