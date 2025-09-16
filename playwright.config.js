import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    testDir: './tests',
    globalSetup: './global-setup.mjs',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 5 : 5,
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL || 'https://automationexercise.com',
        storageState: process.env.STORAGE_STATE_PATH || 'auth/state.json', // default: tests start logged-in
        headless: true, // true = headless, false = headed
        trace: 'on-first-retry',
        traceOptions: {
            screenshots: true,
            snapshots: true,
            sources: false, // This prevents logging of network requests containing the token
        },
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});