# Copilot instructions — css-portfolio

Purpose
A short, machine-focused summary to help Copilot sessions navigate and modify this repository.

## Build / test / lint commands
- None found. This repository is a static HTML/CSS portfolio with no build system, no package.json, and no test or lint scripts.
- Running a single test: N/A (no test framework present).

## High-level architecture
- Single-page static site.
  - Entry point: index.html (root of repository).
  - Styles: css/styles.css
  - Assets: images/ (contains project images)
  - Fonts: Google Fonts loaded in the head of index.html
- No JavaScript, no bundler, no server-side code. Files are served as static assets.
- Semantic layout: header, projects (.projects and .project-item), work-experience (.work-experience and .job-item), education, footer.

## Key conventions (repository-specific)
- Layout container: .content-wrap is reused across sections as the main content wrapper.
- Section separators use class .divider.
- Reusable components and HTML structure to follow when adding content:
  - Project entry: <section class="project-item"> containing <img>, <h3>, <p>, and <a class="btn">.
  - Job entry: <section class="job-item"> with .job-details (title/date) and .job-summary (description/points).
  - Buttons/CTA links use class .btn.
- CSS organization: primary stylesheet is css/styles.css; prefer adding rules there or clearly named additional files and updating index.html.
- Asset paths are relative (e.g., css/styles.css, images/...). Filenames in images/ are not normalized (mixed case) — be careful with case sensitivity when deploying to case-sensitive hosts.
- When extending the site, preserve existing semantic structure and class names to avoid breaking styles.

## Files to read first (for context)
1. index.html — authoritative structure and content
2. css/styles.css — styling and layout rules
3. README.md — author/project notes

## AI assistant configs scanned
Searched for common assistant config files (CLAUDE.md, .cursorrules, .cursor/rules, AGENTS.md, .windsurfrules, CONVENTIONS.md, AIDER_CONVENTIONS.md, .clinerules, .cline_rules). None were found in the repository.

