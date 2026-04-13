# css-portfolio — Alberto Obando Zúñiga

Static single-page HTML/CSS portfolio for Alberto Obando Zúñiga. Mobile-first styles, Playwright tests, an image optimization pipeline, and optional Eleventy scaffolding are included to support development and CI.

Live site: https://albertoobando.com

Contents
- index.html — site entry
- css/styles.css — main stylesheet
- images/ — project assets (images/optimized is generated)
- tests/ — Playwright tests (e2e, meta, accessibility)
- scripts/ — helper scripts (image pipeline)
- src/ — optional Eleventy source and includes
- .github/workflows — CI (Playwright) and deploy (GitHub Pages)

Requirements
- Node.js 18+ and npm

Quickstart (local)
1. Install dependencies
   npm install
2. (Optional) Generate optimized images (requires sharp)
   npm run images
3. Build CSS
   npm run build
4. Serve locally
   npm run start
   Open http://localhost:5000
5. Run tests (Playwright)
   npm test

If Playwright reports missing browser binaries, run:
   npx playwright install --with-deps

Available npm scripts
- start: serve the repository (http-server)
- test: run Playwright tests
- format: run Prettier
- lint:css: run Stylelint for CSS
- build: bundle & minify CSS (esbuild)
- images: generate optimized images (scripts/images.js)
- build:site: build Eleventy site (optional)

Testing
Playwright tests live in tests/ and include basic e2e checks, meta tag assertions, and an accessibility audit using axe.
CI runs Playwright on PRs; see .github/workflows/playwright-ci.yml.

Development notes
- See README.DEV.md for troubleshooting and more detailed developer steps.
- Eleventy scaffolding was added under src/ to support includes/partials; using it is optional.

Deployment
- GitHub Pages deployment is set up in .github/workflows/deploy.yml. Merging to main triggers a build & deploy.

Contributing & License
- Contributing guidelines: CONTRIBUTING.md
- License: MIT (see LICENSE)

Contact
- Use GitHub Issues or PRs. Contact details are also available in the site footer.

