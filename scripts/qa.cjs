// Run with Node and @playwright/test resolvable (install locally or use NODE_PATH).
// QA_OUT must point outside the published website; no server stays alive after exit.
const { chromium, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const out = path.resolve(process.env.QA_OUT || path.join(root, '..', 'company-qa'));
assert(!out.startsWith(root + path.sep) && out !== root, 'QA_OUT must be outside the site');
fs.mkdirSync(out, { recursive: true });
const results = [];
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); return res.end();
  }
  const type = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png' }[path.extname(file)];
  res.setHeader('Content-Type', type || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  let browser;
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await chromium.launch({ channel: process.env.QA_BROWSER || 'msedge', headless: true });
    for (const javaScriptEnabled of [true, false]) {
      for (const reducedMotion of ['no-preference', 'reduce']) {
        for (const [width, height] of [[1440,960],[768,960],[375,812],[320,568],[1440,600],[1920,740]]) {
          const context = await browser.newContext({ viewport: { width, height }, javaScriptEnabled, reducedMotion });
          const page = await context.newPage();
          const errors = [], external = [];
          page.on('pageerror', e => errors.push(e.message));
          await page.route('**/*', route => {
            if (new URL(route.request().url()).origin !== origin) { external.push(route.request().url()); return route.abort(); }
            return route.continue();
          });
          await page.goto(origin);
          await page.evaluate(async () => {
            await Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode(); }));
          });
          assert.equal(await page.locator('video').count(), 0);
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `overflow ${width}x${height}`);
          await expect(page.locator('h1')).toBeVisible();
          const heroBounds = await page.locator('.hero-copy').boundingBox();
          assert(heroBounds.y >= 70, `hero overlaps nav: ${width}x${height}`);
          await page.keyboard.press('Tab');
          await expect(page.locator('.skip')).toBeFocused();
          await page.keyboard.press('Enter');
          await expect(page).toHaveURL(/#intro$/);
          for (const link of ['product.html','contact.html','careers.html']) {
            const response = await page.request.get(`${origin}/${link}`);
            assert.equal(response.status(), 200);
            assert((await response.text()).includes('<html lang="ko">'));
          }
          await expect(page.locator('a[href="https://esgcheck.kr/"]').first()).toBeAttached();
          if (javaScriptEnabled) {
            const trigger = page.locator('.closing [data-contact]');
            await trigger.click();
            await expect(page.locator('#contact-dialog')).toBeVisible();
            await expect(page.locator('#contact-dialog a')).toHaveAttribute('href', 'mailto:esgcheck@gmail.com');
            await page.keyboard.press('Escape');
            await expect(page.locator('#contact-dialog')).not.toBeVisible();
            await expect(trigger).toBeFocused();
            await page.locator('#credits-open').click();
            await expect(page.locator('#credits-dialog')).toContainText('AI로 생성한');
            await page.locator('#credits-dialog [data-close]').click();
            const animated = width > 600 && height >= 800 && reducedMotion !== 'reduce';
            if (animated) {
              for (let i=0; i<3; i++) {
                await page.locator(`[data-scene="${i}"]`).click();
                await expect(page.locator('#scene-counter')).toHaveText(`0${i+1} / 03`);
                await expect(page.locator('.scene-copy[aria-hidden="false"]')).toHaveCount(1);
                await expect(page.locator('.scene-copy.active')).toHaveCSS('opacity', '1');
                await expect(page.locator('.scene.active')).toHaveCSS('opacity', '1');
              }
              await expect(page.locator('.hero-copy')).toHaveAttribute('inert', '');
              if (width === 1440) {
                await page.screenshot({ path: path.join(out, 'approach.png') });
                await page.emulateMedia({ reducedMotion: 'reduce' });
                await expect(page.locator('html')).not.toHaveClass(/scenes-animated/);
                await expect(page.locator('.scene-copy[aria-hidden]')).toHaveCount(0);
                await expect(page.locator('.hero-copy')).not.toHaveAttribute('inert', '');
                await page.emulateMedia({ reducedMotion: 'no-preference' });
                await expect(page.locator('html')).toHaveClass(/scenes-animated/);
              }
            } else {
              for (let i=0; i<3; i++) await expect(page.locator('.scene-copy').nth(i)).toBeVisible();
              await expect(page.locator('.scene-copy[aria-hidden]')).toHaveCount(0);
            }
          } else {
            for (let i=0; i<3; i++) await expect(page.locator('.scene-copy').nth(i)).toBeVisible();
            await expect(page.locator('.script-notice')).toBeVisible();
          }
          if (javaScriptEnabled && reducedMotion === 'no-preference' && [1440,375].includes(width) && height > 700) {
            await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
            await expect(page.locator('.hero-copy')).not.toHaveAttribute('inert','');
            await page.screenshot({ path: path.join(out, `hero-${width}.png`) });
            await page.locator('#product').scrollIntoViewIfNeeded();
            await page.locator('#product').screenshot({ path: path.join(out, `product-${width}.png`) });
          }
          assert.deepEqual(errors, []);
          assert.deepEqual(external, []);
          results.push({ width, height, javaScriptEnabled, reducedMotion, status: 'PASS' });
          await context.close();
        }
      }
    }
    fs.writeFileSync(path.join(out, 'result.json'), JSON.stringify({ cases: results.length, results }, null, 2));
    console.log(JSON.stringify({ cases: results.length, status: 'PASS', output: out }));
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
