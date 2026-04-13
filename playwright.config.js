module.exports = {
  testDir: 'tests',
  timeout: 30000,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npx http-server . -p 5000',
    url: 'http://localhost:5000',
    reuseExistingServer: true,
  },
};
