// Checks the generated files, not just the source configuration. Run after `gatsby build`.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const read = (file) => fs.readFileSync(path.join('public', file), 'utf8');
const home = read('index.html');
const sitemap = read('sitemap.xml');
const index = read('sitemap/sitemap-index.xml');
const urls = read('sitemap/sitemap-0.xml');
const feed = read('rss.xml');
const textSitemap = read('sitemap.txt').trim().split(/\r?\n/);

assert.match(home, /<h1\b/i, 'home page needs an h1');
const homeHeading = (home.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i) || [])[0] || '';
assert(homeHeading.includes('서준범') && homeHeading.includes('AI 에이전트'), 'home introduction missing from static HTML');
assert([...urls.matchAll(/<loc>([^<]+)<\/loc>/g)].every((m) => new URL(m[1]).pathname.endsWith('/')), 'sitemap contains redirecting non-slash URLs');
assert(textSitemap.includes('https://toranalytics.github.io/playground/'), 'playground canonical missing from text sitemap');
assert.match(home, /<button\b[^>]*aria-label="(?:라이트|다크) 모드로 전환"/i, 'theme toggle needs an accessible button');
assert.match(home, /<link\b(?=[^>]*rel="alternate")(?=[^>]*type="application\/rss\+xml")(?=[^>]*href="\/rss\.xml")[^>]*>/i, 'RSS autodiscovery link missing');
assert.strictEqual(sitemap, index, 'legacy sitemap.xml must match the generated sitemap index');
assert.match(index, /\/sitemap\/sitemap-0\.xml/, 'sitemap index does not point to URL list');
assert.doesNotMatch(urls, /<lastmod>/i, 'do not emit fabricated per-page modification dates');
assert.match(feed, /<rss\b/i, 'RSS feed missing');
assert(textSitemap.length > 0 && textSitemap.every((url) => /^https:\/\/toranalytics\.github\.io\//.test(url)), 'invalid text sitemap URL');
assert.strictEqual(new Set(textSitemap).size, textSitemap.length, 'text sitemap has duplicate URLs');

function postPaths(dir, relative = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const next = path.join(dir, entry.name);
    const rel = path.join(relative, entry.name);
    if (entry.isDirectory()) return postPaths(next, rel);
    return entry.name === 'index.md' ? [path.dirname(rel).split(path.sep).join('/')] : [];
  });
}
const posts = postPaths('content');
const locs = new Set([...urls.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '')));
for (const post of posts) {
  assert(locs.has('/' + post), `post missing from sitemap: /${post}/`);
  assert(fs.existsSync(path.join('public', post, 'index.html')), `generated post missing: /${post}/`);
  assert(textSitemap.includes('https://toranalytics.github.io/' + post + '/'), `post missing from text sitemap: /${post}/`);
}
console.log(`Search output checks passed: home, feed, sitemap, ${posts.length} posts.`);
