import { defineConfig, devices } from '@playwright/test';
import { appUrl } from './config/environment';

const baseURL = appUrl;

export default defineConfig({
  timeout: 10 * 1000,
  testDir: './tests',
  fullyParallel: false,
  // retries: process.env.CI ? 2:0,
  retries: 0,
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,

  // reporter: [['html',{outputFolder:'.../reports/html-report'}],['allure-playwright',{outputFolder:'.../reports/allure-results'}]],
  reporter: [['html'], ['allure-playwright'], ['dot'], ['line']],
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    headless: false
  },


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

  ],

});
