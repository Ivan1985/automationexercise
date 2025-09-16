// Ensure env vars are loaded locally (no-op in CI if already provided)
import 'dotenv/config';

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { AuthPage } from '../pages/auth.page.js';
import { uniqueEmail, uniqueName, maskPassword } from '../utils/helper.js';

test.describe('Validate User Registration Process', () => {
    test('@E2E 1. New user can successfully register and log in', async ({ page }) => {
        const home = new HomePage(page);
        const auth = new AuthPage(page);

        // Read from env (no fallback)
        const NAME_PREFIX = process.env.NAME_PREFIX || 'Ivan QA';
        const EMAIL_PREFIX = process.env.EMAIL_PREFIX || 'ivan.qa';
        const PASSWORD = process.env.TEST_PASSWORD;

        // Hard guard: skip if TEST_PASSWORD is not provided
        test.skip(!PASSWORD, 'Set TEST_PASSWORD in your .env (or GitHub Secrets) to run this test.');

        // Generate unique data to avoid email collisions
        const name = uniqueName(NAME_PREFIX);
        const email = uniqueEmail(EMAIL_PREFIX);

        const profile = {
            firstName: 'First',
            lastName: 'Last',
            company: 'Test Company',
            address1: 'Nikole Tesle 333',
            country: 'United States',
            state: 'South Caroline',
            city: 'Myrtle Beach',
            zipcode: '10001',
            mobile: '123321123321',
        };

        // Safe logs (password fully hidden)
        console.log('=== Task 1: Registration ===');
        console.log(`Using data → name: ${name}, email: ${email}, password: ${maskPassword()}`);

        // Flow
        await home.goto();
        await home.openAuth();
        await auth.signupBasic({ name, email });
        await auth.fillRegistrationForm({ password: PASSWORD, profile });
        await auth.expectAccountCreatedAndLoggedIn();

        // Verify "Logged in as <name>"
        await expect(auth.loggedInAs).toContainText(new RegExp(name.split(' ')[0], 'i'));

        console.log('=== Registration finished successfully ===');
    });
});