import { expect } from '@playwright/test';

export class AuthPage {
    constructor(page) {
        this.page = page;

        // Step 1 (Signup form at /login)
        this.signupName = page.getByRole('textbox', { name: /^name$/i });
        this.signupEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder(/email address/i);
        this.signupBtn = page.getByRole('button', { name: /^signup$/i });

        // Step 2 (Registration form)
        this.titleMr = page.getByText('Mr.', { exact: false }); // from codegen
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
        this.city = page.getByRole('textbox', { name: /city \* zipcode \*/i }); // per codegen
        this.zipcode = page.locator('#zipcode');
        this.mobile = page.getByRole('textbox', { name: /mobile number \*/i });
        this.createAccountBtn = page.getByRole('button', { name: /create account/i });

        // Messages / navigation
        this.accountCreatedMsg = page.getByText(/account created!/i);
        this.continueLink = page.getByRole('link', { name: /continue/i });
        this.loggedInAs = page.getByText(/logged in as/i);
    }

    // Step 1: Name + Email, then click Signup
    async signupBasic({ name, email }) {
        await expect(this.signupName).toBeVisible();
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupBtn.click();
    }

    // Step 2: Fill full registration form (fields from your codegen)
    async fillRegistrationForm({ password, dob = { day: '2', month: '3', year: '2015' }, profile }) {
        // Title
        await this.titleMr.click();

        // Password
        await this.password.fill(password);

        // DOB
        await this.days.selectOption(dob.day);
        await this.months.selectOption(dob.month);
        await this.years.selectOption(dob.year);

        // Name / Company
        await this.firstName.fill(profile.firstName);
        await this.lastName.fill(profile.lastName);
        await this.company.fill(profile.company);

        // Address
        await this.address1.fill(profile.address1);
        await this.country.selectOption(profile.country); // e.g., 'United States'
        await this.state.fill(profile.state);

        // City + Zip (per site’s UI in your recording)
        await this.city.fill(profile.city);
        await this.zipcode.fill(profile.zipcode);

        // Mobile
        await this.mobile.fill(profile.mobile);

        // Submit
        await this.createAccountBtn.click();
    }

    // Verify success + continue + "Logged in as"
    async expectAccountCreatedAndLoggedIn() {
        await expect(this.accountCreatedMsg).toBeVisible();
        await this.continueLink.click();
        await expect(this.loggedInAs).toBeVisible();
    }
}