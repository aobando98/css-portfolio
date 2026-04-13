const { execSync } = require('child_process');

if (!process.env.NETLIFY) {
  try {
    execSync('npx playwright install --with-deps', { stdio: 'inherit' });
  } catch (err) {
    // Fail silently during install if Playwright cannot install; CI may run this step separately
    console.error('Playwright install failed:', err && err.message ? err.message : err);
  }
}
