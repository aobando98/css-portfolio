# Copilot instructions — css-portfolio

Purpose
A concise, machine-oriented guide to help Copilot sessions edit, test and validate this static portfolio repository.

Build, test and lint commands
- Install dependencies (Node 18+):
  npm ci --no-audit --no-fund

- Serve locally (single command):
  npm run start
  (http://localhost:5000 by default; Playwright config expects this)

- Run all Playwright tests:
  npm test
  or
  npx playwright test

- Run a single test file:
  npx playwright test tests/e2e.spec.js

- Run a single named test (match title):
  npx playwright test -g "homepage shows title and H1"

- Install Playwright browsers (if tests fail due to missing browsers):
  npx playwright install --with-deps

- Build and bundle CSS:
  npm run build
  (produces css/styles.min.css via esbuild)

- Generate optimized images (optional; requires sharp native deps):
  npm run images
  Note: CI runs this step as `npm run images || true` to tolerate environments where sharp fails.

- Format and lint:
  npm run format
  npm run lint:css

High-level architecture (big picture)
- Static single-page portfolio. index.html is the authoritative entry point and contains most content.
- Styling: css/styles.css (mobile-first, variables). Build step creates css/styles.min.css but index.html currently references css/styles.css.
- Images: images/ holds original assets. images/optimized/ is the output of the image pipeline (scripts/images.js) and is ignored by Git.
- Image pipeline: scripts/images.js uses sharp to produce resized JPEG/WebP/AVIF variants (sizes: 480/800/1200). This is optional in CI and locally may require platform build tools.
- Tests: Playwright tests are in tests/ (e2e.spec.js, meta.spec.js, a11y.spec.js). playwright.config.js launches an http-server at port 5000 to serve the repo for tests.
- SSG scaffolding: Eleventy is scaffolded (src/, .eleventy.js) — optional migration path; build target is _site/ when used.
- CI: .github/workflows/playwright-ci.yml runs install, build, images (tolerant), Playwright install, and tests. .github/workflows/deploy.yml builds the site and (by default) deploys the _site/ folder to GitHub Pages using peaceiris/actions-gh-pages (pushes to the gh-pages branch). Make sure the repository's Pages settings are configured to serve from the gh-pages branch or update the workflow to match your chosen Pages configuration.

Key conventions and repository-specific rules
- DOM/CSS conventions:
  - .content-wrap: page-width container used everywhere.
  - .divider: applied to content sections that visually separate entries.
  - Projects use <article class="project-item"> with <figure>/<figcaption>, <h3>, description, .project-meta list and .btn for CTAs.
  - Job entries use <section class="job-item"> with .job-details and .job-summary.
  - CTA links use class .btn; external links must include rel="noopener noreferrer" and target="_blank".

- Tests are sensitive to specific text and metadata:
  - e2e.spec.js expects the H1 to read exactly: "Alberto Obando Zúñiga". If that text is changed, update tests accordingly.
  - meta.spec.js asserts meta[name="description"], link[rel="canonical"], and meta[property="og:image"]. Keep these tags present and valid.
  - a11y.spec.js runs axe and expects no automated violations; when introducing UI changes, prefer aria labels/landmarks and test locally before committing.

- Images and optimization:
  - images/optimized/ is ignored in .gitignore. The pipeline generates optimized files locally or in CI. Do not assume optimized assets exist on clone.
  - Filenames in images/ use mixed casing; be careful on case-sensitive hosts (Linux). Prefer lowercase filenames when adding new assets.

- Build & CI quirks:
  - package.json includes a postinstall that runs `npx playwright install --with-deps` (large download). Consider removing/adjusting if contributors shouldn't auto-download browsers.
  - The images pipeline uses sharp, which may fail on some CI images or Windows without build tools; CI protects against failure with `|| true`.

- Git/commit conventions used by automation:
  - When creating commits produced by Copilot automation or this agent, include the trailer exactly:
    Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>

Files to read first (in order)
1. package.json — scripts and developer commands (single-source of truth for build/test tasks)
2. index.html — the current authoritative site contents and markup
3. css/styles.css — styling and responsive rules
4. playwright.config.js — how tests launch the local server and test settings
5. scripts/images.js — image optimization logic and outputs
6. tests/* — Playwright tests (e2e, meta, accessibility)

Common pitfalls and recommendations for Copilot
- Avoid large, unnecessary changes to index.html without running Playwright tests; small copy edits can break tests that assert exact strings.
- Prefer making non-destructive edits: add new files or append new sections, keeping old anchors used by tests intact.
- If the image pipeline is required, run `npm run images` locally or enable it in CI; do not commit images/optimized unless intentionally shipping them.
- If modifying tests, run them locally with `npx playwright test <file>` and attach the playwright-report output to PRs when failing.

Integration with other docs
- This file pulls relevant bits from README.md and README.DEV.md; read those for troubleshooting steps and developer notes.

MCP Servers
- This repo benefits from a Playwright-capable MCP server (to run Playwright tests and serve the site). Would you like me to configure an MCP server for Playwright in the workspace? (yes/no)

Summary
- Created/updated Copilot instructions covering build/test/lint commands, the high-level architecture, and repository-specific conventions. Tell me if you want additions (examples for single test invocation, CI guidance, or a step-by-step first-time setup block) and I will update this file.

