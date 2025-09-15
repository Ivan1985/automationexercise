import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { AuthPage } from '../pages/auth.page.js';
import { uniqueEmail, uniqueName } from '../utils/helper.js';

test.describe('Auth flows', () => {
    test.only('Task 1: Registration shows "Account Created!" and logs in', async ({ page }) => {
        const home = new HomePage(page);
        const auth = new AuthPage(page);

        const email = uniqueEmail('ivan.qa');
        const name = uniqueName('Ivan QA');
        const password = 'Playwright!123';

        await home.goto();
        await home.openAuth();

        // Step 1: name + email
        await auth.signupBasic(name, email);

        // Step 2: registration form
        await auth.fillRegistrationForm(password);

        // Expect success + logged in state
        await auth.expectAccountCreated();
        await expect(auth.loggedInAs).toContainText(new RegExp(name.split(' ')[0], 'i'));
    });

    test('Task 3: Login with existing account and then logout', async ({ page }) => {
        const home = new HomePage(page);
        const auth = new AuthPage(page);

        // Provide valid existing creds in .env or replace below.
        const existingEmail = process.env.TEST_EMAIL || 'existing_user@example.com';
        const existingPassword = process.env.TEST_PASSWORD || 'StrongPass!123';

        await home.goto();
        await home.openAuth();

        await auth.login(existingEmail, existingPassword);

        // Verify logged in
        await expect(auth.loggedInAs).toBeVisible();

        // Logout
        await auth.logout();

        // Verify "Signup / Login" link visible again
        await expect(home.signupLoginLink).toBeVisible();
    });
});