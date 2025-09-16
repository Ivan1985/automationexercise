// pages/auth.page.js
import { expect } from '@playwright/test';

export class AuthPage {
    constructor(page) {
        this.page = page;

        // --- Login form (left column on /login) ---
        this.loginEmail = page.locator('form:has-text("Login")').getByPlaceholder(/email address/i);
        this.loginPassword = page.locator('form:has-text("Login")').getByPlaceholder(/password/i);
        this.loginBtn = page.getByRole('button', { name: /^login$/i });

        // --- Logged-in state & logout ---
        this.loggedInAs = page.getByText(/logged in as/i);
        this.logoutLink = page.getByRole('link', { name: /logout/i });

        // --- Signup (step 1) on /login, right column ---
        this.signupName = page.getByRole('textbox', { name: /^name$/i });
        this.signupEmail = page.locator('form:has-text("Signup")').getByPlaceholder(/email address/i);
        this.signupBtn = page.getByRole('button', { name: /^signup$/i });

        // --- Registration form (step 2) ---
        this.titleMr = page.getByText('Mr.', { exact: false });
        this.password = page.getByRole('textbox', { name: /password \*/i });
        this.days = page.locator('#days');
        this.months = page.locator('#months');
        this.years = page.locator('#years');
        this.firstName = page.getByRole('textbox', { name: /first name \*/i });
        this.lastName = page.getByRole('textbox', { name: /last name \*/i });
        this.company = page.getByRole('textbox', { name: /^company$/i });
        this.address1 = page.getByRole('textbox', { name: /address \* \(street address/i });
        this.country = page.getByLabel(/country \*/i);
        this.state = page.getByRole('textbox', { name: /state \*/i });
        this.cityZip = page.getByRole('textbox', { name: /city \* zipcode \*/i }); // AE groups these
        this.zipcode = page.locator('#zipcode');
        this.mobile = page.getByRole('textbox', { name: /mobile number \*/i });
        this.createAccountBtn = page.getByRole('button', { name: /create account/i });

        // --- Success page after registration ---
        this.accountCreatedMsg = page.getByText(/account created!/i);
        this.continueLink = page.getByRole('link', { name: /continue/i });
    }

    // ---------- Public actions used by tests & setup ----------

    async login(email, password) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginBtn.click();
    }

    async expectLoggedIn(expectedName) {
        await expect(this.loggedInAs).toBeVisible();
        if (expectedName) {
            await expect(this.loggedInAs).toContainText(new RegExp(expectedName, 'i'));
        }
    }

    async logout() {
        await this.logoutLink.click();
    }

    // Step 1: fill Name + Email and click Signup
    async signupBasic({ name, email }) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupBtn.click();
    }

    // Step 2: fill complete registration form and submit
    async fillRegistrationForm({ password, dob = { day: '2', month: '3', year: '2015' }, profile }) {
        await this.titleMr.click();
        await this.password.fill(password);

        await this.days.selectOption(dob.day);
        await this.months.selectOption(dob.month);
        await this.years.selectOption(dob.year);

        await this.firstName.fill(profile.firstName);
        await this.lastName.fill(profile.lastName);
        await this.company.fill(profile.company);

        await this.address1.fill(profile.address1);
        await this.country.selectOption(profile.country);
        await this.state.fill(profile.state);

        // AE UI has combined City/Zip field + separate #zipcode
        await this.cityZip.fill(profile.city);
        await this.zipcode.fill(profile.zipcode);

        await this.mobile.fill(profile.mobile);

        await this.createAccountBtn.click();
    }

    // Verify success screen then land on logged-in home
    async expectAccountCreatedAndLoggedIn() {
        await expect(this.accountCreatedMsg).toBeVisible();
        await this.continueLink.click();
        await expect(this.loggedInAs).toBeVisible();
    }
}