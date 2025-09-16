import 'dotenv/config';
import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { AuthPage } from '../pages/auth.page.js';

test.use({ storageState: null });

const user = JSON.parse(fs.readFileSync('auth/user.json', 'utf-8'));
const mask = () => '********';

test.describe('Login & Logout', () => {
    test('@E2E 1. User can log in with the generated account and then log out', async ({ page }) => {
        const home = new HomePage(page);
        const auth = new AuthPage(page);

        const EMAIL = user.email;                                   // from setup
        const PASSWORD = process.env.TEST_PASSWORD || user.password; // env or fallback from setup

        if (!EMAIL || !PASSWORD) throw new Error('Missing email/password for login.');
        console.log('=== Task 3: Login & Logout ===');
        console.log(`Using → email: ${EMAIL}, password: ${mask()}`);

        await home.goto();
        await home.openAuth();
        await auth.login(EMAIL, PASSWORD);
        await auth.expectLoggedIn();
        await auth.logout();
        await expect(home.signupLoginLink).toBeVisible();

        console.log('=== Login & Logout completed ===');
    });

    // Negativ test
    test('@E2E 2. Login fails with wrong password', async ({ page }) => {
        const home = new HomePage(page);
        const auth = new AuthPage(page);

        const EMAIL = user.email;
        const WRONG_PASSWORD = 'TotallyWrong123!';

        console.log('=== Task 3: Negative Login ===');
        console.log(`Using email: ${EMAIL}, wrong password: ********`);

        await home.goto();
        await home.openAuth();
        await auth.login(EMAIL, WRONG_PASSWORD);
        await auth.expectLoginError();

        console.log('=== Negative login test completed (error message verified) ===');
    });
});