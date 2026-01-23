import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

export async function renderTemplate(path, data) {
  let html = await fs.readFile(path, 'utf-8');

  for (const [key, value] of Object.entries(data)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }

  return html;
}

export async function htmlToPDF(html, outputPath) {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true
  });

  await browser.close();
}