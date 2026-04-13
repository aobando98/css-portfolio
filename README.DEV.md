Development

Prerequisites
- Node.js 18+ (https://nodejs.org/)

Local setup
1. Install dependencies: npm install
2. Start local server: npm run start (serves site at http://localhost:5000)
3. Run tests: npm test (Playwright tests will run; the config starts a local server automatically)

   If Playwright fails to find browser binaries, run:
   npx playwright install --with-deps

4. Build for production: npm run build (produces css/styles.min.css)

Useful scripts
- npm run format — formats files with Prettier
- npm run lint:css — runs Stylelint for CSS

Notes
- The repository is a static site; adding new tooling is incremental. See .github/workflows for CI/playwright setup.
