// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              // folder containing your spec files
  timeout: 30 * 1000,              // 30 seconds per test
  retries: 1,                      // retry once on failure
  reporter: [['html', { outputFolder: 'playwright-report' }]],

  //  Common settings for all environments
  use: {
    headless: true,
    screenshot: 'only-on-failure', // capture screenshots when tests fail
    video: 'retain-on-failure',    // record video for failed tests
    trace: 'retain-on-failure',    // keep trace for failed tests
  },

  //  Define environments as separate projects
  projects: [
    {
      name: 'staging',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://staging.demowebshop.com' },
    },
    {
      name: 'preprod',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://preprod.demowebshop.com' },
    },
    {
      name: 'prod',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://demowebshop.com' },
    },
    {
      name: 'staging',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://staging.demowebshop.com' },
    },
    {
      name: 'preprod',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://preprod.demowebshop.com' },
    },
    {
      name: 'prod',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://demowebshop.com' },
    },
    {
      name: 'staging',
      use: { ...devices['Desktop Safari'], baseURL: 'https://staging.demowebshop.com' },
    },
    {
      name: 'preprod',
      use: { ...devices['Desktop Safari'], baseURL: 'https://preprod.demowebshop.com' },
    },
    {
      name: 'prod',
      use: { ...devices['Desktop Safari'], baseURL: 'https://demowebshop.com' },
    },
  ],
});
