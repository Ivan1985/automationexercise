import { expect } from '@playwright/test';

export class AuthPage {
    constructor(page) {
        this.page = page;

        // Signup step 1
        this.signupName = page.getByPlaceholder(/name/i);
        this.signupEmail = page.getByPlaceholder(/email/i).first();
        this.signupButton = page.getByRole('button', { name: /signup/i });

        // Registration form (step 2) – adjust if labels differ on the site.
        this.titleMr = page.getByLabel(/mr/i);
        this.password = page.getByLabel(/password/i);
        this.firstName = page.getByLabel(/first name/i);
        this.lastName = page.getByLabel(/last name/i);
        this.address = page.getByLabel(/address/i);
        this.country = page.getByLabel(/country/i);
        this.state = page.getByLabel(/state/i);
        this.city = page.getByLabel(/city/i);
        this.zipcode = page.getByLabel(/zipcode|zip code/i);
        this.mobile = page.getByLabel(/mobile|phone/i);
        this.createAccountButton = page.getByRole('button', { name: /create account/i });

        // Messages / navigation
        this.accountCreated = page.getByText(/account created!/i);
        this.continueButton = page
            .getByRole('link', { name: /continue/i })
            .or(page.getByRole('button', { name: /continue/i }));
        this.loggedInAs = page.getByText(/logged in as/i);
        this.logoutLink = page.getByRole('link', { name: /logout/i });

        // Login (existing user)
        this.loginEmail = page.getByPlaceholder(/email/i).first();
        this.loginPassword = page.getByPlaceholder(/password/i).first();
        this.loginButton = page.getByRole('button', { name: /^login$/i });
    }

    // --- Signup flow helpers ---
    async signupBasic(name, email) {
        await expect(this.signupName).toBeVisible();
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async fillRegistrationForm(password) {
        // Some fields may be optional; guard with isVisible.
        if (await this.titleMr.isVisible()) await this.titleMr.check();
        await this.password.fill(password);
        if (await this.firstName.isVisible()) await this.firstName.fill('Ivan');
        if (await this.lastName.isVisible()) await this.lastName.fill('Ignjatovic');
        if (await this.address.isVisible()) await this.address.fill('Test street 1');
        if (await this.country.isVisible()) {
            try { await this.country.selectOption({ label: 'Canada' }); } catch { }
        }
        if (await this.state.isVisible()) await this.state.fill('ON');
        if (await this.city.isVisible()) await this.city.fill('Toronto');
        if (await this.zipcode.isVisible()) await this.zipcode.fill('M5V1A1');
        if (await this.mobile.isVisible()) await this.mobile.fill('+1 555 0100');
        await this.createAccountButton.click();
    }

    async expectAccountCreated() {
        await expect(this.accountCreated).toBeVisible();
        await this.continueButton.click(); // Many flows require "Continue" after success message
        await expect(this.loggedInAs).toBeVisible(); // user is logged in
    }

    // --- Login/Logout helpers ---
    async login(email, password) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutLink.click();
    }
}