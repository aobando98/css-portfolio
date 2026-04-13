# Copilot instructions for css-portfolio

## Build, test, and lint commands

- Install dependencies with `npm ci --no-audit --no-fund` when you want the CI-equivalent install; `npm install` is also documented for local setup.
- Run the local site with `npm run start`. It serves the repository at `http://localhost:5000`.
- Run the full Playwright suite with `npm test` or `npx playwright test`.
- Run a single Playwright file with `npx playwright test tests/e2e.spec.js`.
- Run a single named Playwright test with `npx playwright test -g "homepage shows title and H1"`.
- If Playwright browser binaries are missing, run `npx playwright install --with-deps`.
- Build CSS with `npm run build`. This runs esbuild and writes `css/styles.min.css`.
- Run the optional image pipeline with `npm run images`. It uses `sharp` and may fail on some environments; CI treats it as non-fatal.
- Build the optional Eleventy output with `npm run build:site`, which emits `_site/`.
- Format and lint with `npm run format` and `npm run lint:css`.

## High-level architecture

- The live site is still centered on `index.html`. Most page content, metadata, accessibility landmarks, navigation anchors, and section structure live there, and the Playwright suite asserts against that file directly.
- There are two parallel page sources today: the hand-authored static site in `index.html`, and the partial Eleventy scaffold in `src/index.njk`. The Eleventy template currently only wires shared includes and an empty `<main>`; it is not a full copy of the production page. Changes to the real site usually belong in `index.html` unless you are actively migrating content into Eleventy.
- `css/styles.css` is the authoritative stylesheet for both `index.html` and `resume.html`. The build step generates `css/styles.min.css`, but the checked-in HTML currently links `css/styles.css`, so changes only made to the minified file will not affect the page source.
- `resume.html` is a separate, print-friendly document that reuses the main stylesheet and adds inline overrides for resume-specific layout. If you change shared typography, colors, spacing, or utility classes in `css/styles.css`, check both the portfolio page and the resume page.
- `playwright.config.js` starts `http-server` on port 5000 and sets `baseURL` to that server. Tests do not expect a separate app server.
- `src/` and `.eleventy.js` are optional scaffolding for an Eleventy migration path. When `npm run build:site` is used, Eleventy outputs to `_site/` and passthrough-copies `css/` and `images/`.
- `scripts/images.js` is a local/CI asset helper, not a runtime dependency. It reads from `images/`, writes optimized variants into `images/optimized/`, and generates 480/800/1200px JPEG/WebP outputs plus one AVIF per source image.
- GitHub Actions reflect the intended workflow: Playwright CI installs deps, builds CSS, tolerates image-pipeline failures, installs Playwright browsers, and runs tests; the deploy workflow builds `_site/` and publishes that directory to `gh-pages`. Because deployment publishes `_site/`, any Eleventy migration work has to keep passthrough assets and generated output aligned with what `index.html` currently serves.

## Key conventions

- Keep the section IDs and anchor targets stable unless you update navigation and tests together. Important anchors include `main-content`, `projects`, `work-experience`, `education`, `skills`, `testimonials`, and `contact`.
- The repeated layout pattern is `section` -> `.content-wrap`, often combined with `.divider` and/or `.item-details`. Reuse those wrappers before introducing new container patterns.
- Project entries follow a consistent structure: `article.project-item` with a `figure`, `figcaption`, `h3`, descriptive copy, a `.project-meta` list, and a CTA using `.btn`.
- Work history entries use `article.job-item` split into `.job-details` and `.job-summary`. Education uses `.edu-grid`, `.edu-card`, and `.edu-side`. Skills use `.skills-grid`, `.skill-card`, and `.skill-meters`. Testimonials use `.testimonials-grid` and `.testimonial-card`.
- External links that open a new tab consistently use `target="_blank"` together with `rel="noopener noreferrer"`. CTA links are generally styled with `.btn`.
- Accessibility is part of the current markup contract: there is a skip link, landmarked main content, labeled form fields, `aria-label` usage on some links, and progress bars in the skills section. Avoid removing these patterns when editing content.
- The current tests are intentionally narrow but copy-sensitive. `tests/e2e.spec.js` expects the H1 text `Alberto Obando Zúñiga`, and `tests/meta.spec.js` requires the description, canonical, and `og:image` tags to remain present.
- Generated artifacts are ignored by Git: `css/styles.min.css`, `images/optimized/`, and `playwright-report/`. Do not assume they exist in a fresh clone.
- Image filenames in `images/` use mixed casing. Preserve exact filename case in HTML/CSS references because CI and deployment run on Linux.
- `CONTRIBUTING.md` asks for small PRs and screenshots for visual changes, so keep changes focused and include visual evidence when updating UI.

## Reference docs already used in this repo

- `README.md` is the primary setup overview.
- `README.DEV.md` adds local development and troubleshooting notes.
- `CONTRIBUTING.md` documents contribution expectations.

## Node & tooling

- Node.js 18+ is required (see README). Use `npm ci --no-audit --no-fund` for CI-style installs; `npm install` is fine for local development.
- Playwright is a devDependency; if tests fail due to missing browsers run `npx playwright install --with-deps`.
- The build step uses esbuild to produce `css/styles.min.css`. The checked-in HTML links `css/styles.css`, so building is only required for production or CI.

## PDF generation

- A helper script generates a print-ready PDF of the resume:
  - Run `node scripts/generate-pdf.js` or `npm run generate-pdf`.
  - Output: `resume-fixed.pdf` at the repo root.
  - Note: Playwright browser binaries must be installed for this script to work (`npx playwright install --with-deps`).

## Playwright / tests notes

- Playwright config (`playwright.config.js`) starts a local http-server on port 5000 and sets `baseURL` to that server. Tests assume the site is served at `http://localhost:5000`.
- To run a single test file: `npx playwright test tests/e2e.spec.js`.
- To run a single named test: `npx playwright test -g "homepage shows title and H1"`.
- The tests are copy-sensitive: changing visible strings (e.g., H1) may cause failures.

## Where to change content

- `index.html` is the authoritative site entry. Make content edits there unless actively migrating pieces into the Eleventy sources under `src/`.
- `css/styles.css` is the source stylesheet. Keep resume-specific overrides in `resume.html` or the resume-specific print styles.


