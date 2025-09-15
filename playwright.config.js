import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    timeout: 90000,
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 2,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 5 : 5,
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL || 'https://automationexercise.com',
        headless: true, // true = headless, false = headed
        viewport: { width: 1366, height: 768 },
        ignoreHTTPSErrors: true,
        trace: 'on-first-retry',
        traceOptions: {
            screenshots: true,
            snapshots: true,
            sources: false, // This prevents logging of network requests containing the token
        },
        //screenshot: 'only-on-failure',
        //video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});