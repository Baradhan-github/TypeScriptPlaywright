import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 10 * 1000,
  testDir: './tests',
  fullyParallel: false,
  // retries: process.env.CI ? 2:0,
  retries:1,
  // workers: process.env.CI ? 1 : undefined,
  workers:1,

  // reporter: [['html',{outputFolder:'.../reports/html-report'}],['allure-playwright',{outputFolder:'.../reports/allure-results'}]],
  reporter:[['html'],['dot'],['line']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport:{width:1280,height:720},
    ignoreHTTPSErrors:true,
    permissions: ['geolocation'],
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
