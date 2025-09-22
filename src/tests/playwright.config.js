// Playwright Configuration for Multilingual Testing
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // Test directory
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL for tests
    baseURL: 'http://localhost:5173',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on failure
    video: 'retain-on-failure'
  },

  // Configure projects for major browsers and language combinations
  projects: [
    // Desktop browsers - Indonesian
    {
      name: 'chromium-id',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'id-ID',
        timezoneId: 'Asia/Jakarta'
      },
    },
    {
      name: 'firefox-id',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'id-ID',
        timezoneId: 'Asia/Jakarta'
      },
    },
    {
      name: 'webkit-id',
      use: {
        ...devices['Desktop Safari'],
        locale: 'id-ID',
        timezoneId: 'Asia/Jakarta'
      },
    },

    // Desktop browsers - English
    {
      name: 'chromium-en',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en-US',
        timezoneId: 'America/New_York'
      },
    },
    {
      name: 'firefox-en',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'en-US',
        timezoneId: 'America/New_York'
      },
    },
    {
      name: 'webkit-en',
      use: {
        ...devices['Desktop Safari'],
        locale: 'en-US',
        timezoneId: 'America/New_York'
      },
    },

    // Mobile devices - Indonesian
    {
      name: 'mobile-chrome-id',
      use: {
        ...devices['Pixel 7'],
        locale: 'id-ID',
        timezoneId: 'Asia/Jakarta'
      },
    },
    {
      name: 'mobile-safari-id',
      use: {
        ...devices['iPhone 14'],
        locale: 'id-ID',
        timezoneId: 'Asia/Jakarta'
      },
    },

    // Mobile devices - English
    {
      name: 'mobile-chrome-en',
      use: {
        ...devices['Pixel 7'],
        locale: 'en-US',
        timezoneId: 'America/New_York'
      },
    },
    {
      name: 'mobile-safari-en',
      use: {
        ...devices['iPhone 14'],
        locale: 'en-US',
        timezoneId: 'America/New_York'
      },
    },

    // Edge cases and older browsers
    {
      name: 'edge-id',
      use: {
        ...devices['Desktop Edge'],
        locale: 'id-ID',
        timezoneId: 'Asia/Jakarta'
      },
    },
    {
      name: 'edge-en',
      use: {
        ...devices['Desktop Edge'],
        locale: 'en-US',
        timezoneId: 'America/New_York'
      },
    }
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },

  // Global setup and teardown
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),

  // Test timeout
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 5000
  },

  // Output directory
  outputDir: 'test-results/',

  // Maximum time in milliseconds the whole test suite can run
  globalTimeout: 10 * 60 * 1000, // 10 minutes
})