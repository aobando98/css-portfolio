#!/usr/bin/env node
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  try {
    // Lazy-load Playwright so the script doesn't crash if not installed yet.
    const { chromium } = require('playwright');

    const resumeFile = path.resolve(__dirname, '..', 'resume.html');
    const resumeURL = pathToFileURL(resumeFile).href;
    console.log('Loading:', resumeURL);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(resumeURL, { waitUntil: 'networkidle' });

    const outPath = path.resolve(__dirname, '..', 'resume-fixed.pdf');
    await page.pdf({ path: outPath, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });

    console.log('Saved PDF to', outPath);
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('Error generating PDF:', err);
    process.exit(1);
  }
})();
