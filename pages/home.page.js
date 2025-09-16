import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginLink = page.getByRole('link', { name: /signup \/ login/i });
    }

    async goto() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(this.page.getByRole('link', { name: /home/i })).toBeVisible();
    }

    async openAuth() {
        await this.signupLoginLink.click();
    }
}