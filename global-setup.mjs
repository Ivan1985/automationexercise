import 'dotenv/config';
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import { HomePage } from './pages/home.page.js';
import { AuthPage } from './pages/auth.page.js';
import { uniqueEmail, uniqueName, maskPassword, generateStrongPassword } from './utils/helper.js';

const STATE_PATH = process.env.STORAGE_STATE_PATH || 'auth/state.json';
const USER_PATH = 'auth/user.json';

export default async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseURL = process.env.BASE_URL || 'https://automationexercise.com';

    // Use provided TEST_PASSWORD if any; otherwise generate a strong one (for forks/PRs w/o secrets)
    const password = process.env.TEST_PASSWORD || generateStrongPassword();

    const name = uniqueName('Ivan QA');
    const email = uniqueEmail('ivan.qa');

    const home = new HomePage(page);
    const auth = new AuthPage(page);

    console.log('=== Global setup: register a new user & save storageState ===');
    console.log(`New user name: ${name}, email: ${email}, password: ${maskPassword()}`);

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    await home.openAuth();
    await auth.signupBasic({ name, email });
    await auth.fillRegistrationForm({
        password,
        profile: {
            firstName: 'Test',
            lastName: 'User',
            company: 'PW Co',
            address1: 'Test st 1',
            country: 'United States',
            state: 'CA',
            city: 'LA',
            zipcode: '90001',
            mobile: '1234567890',
        },
    });
    await auth.expectAccountCreatedAndLoggedIn();

    await fs.mkdir('auth', { recursive: true });
    await context.storageState({ path: STATE_PATH });

    // Save email and password for this CI run (git-ignored)
    await fs.writeFile(USER_PATH, JSON.stringify({ email, name, password }, null, 2));

    console.log(`Saved storageState - ${STATE_PATH}`);
    console.log(`Saved user meta - ${USER_PATH}`);

    await browser.close();
}