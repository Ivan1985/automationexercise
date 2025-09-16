import 'dotenv/config';
import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { AuthPage } from '../pages/auth.page.js';

// Start logged-out for this file
test.use({ storageState: null });

const user = JSON.parse(fs.readFileSync('auth/user.json', 'utf-8'));
const mask = () => '********';

test.describe('Task 3: Login & Logout', () => {
    test('User can log in with the generated account and then log out', async ({ page }) => {
        const home = new HomePage(page);
        const auth = new AuthPage(page);

        const EMAIL = user.email;                 // from global-setup
        const PASSWORD = process.env.TEST_PASSWORD; // from env/CI

        if (!EMAIL || !PASSWORD) throw new Error('Missing user email (auth/user.json) or TEST_PASSWORD (.env/CI).');

        console.log('=== Task 3: Login & Logout ===');
        console.log(`Using → email: ${EMAIL}, password: ${mask()}`);

        await home.goto();
        await home.openAuth();
        await auth.login(EMAIL, PASSWORD);
        await auth.expectLoggedIn();  // optionally assert name
        await auth.logout();
        await expect(home.signupLoginLink).toBeVisible();

        console.log('=== Login & Logout completed ===');
    });
});