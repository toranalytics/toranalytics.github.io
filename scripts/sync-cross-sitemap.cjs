// After Gatsby build, commit this file alongside any changed page inventory.
const fs = require('fs');
const source = fs.readFileSync('public/sitemap.txt', 'utf8').trim().split(/\r?\n/);
if (!source.length || source.some((url) => !url.startsWith('https://toranalytics.github.io/'))) throw new Error('invalid generated sitemap');
fs.writeFileSync('static/sitemap-cross.txt', [...new Set(source)].sort().join('\n') + '\n');
console.log(`Synced ${source.length} canonical URLs to static/sitemap-cross.txt; commit it with page changes.`);
