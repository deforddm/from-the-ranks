// v13.64.1: on a host that redirects /index.html to / (Cloudflare Pages), the game still opens once the service worker is in
// charge, and a worker that cached a redirected page is replaced without the page's help.
// Usage: node tools/swredirect_test.mjs   (build first; exit 1 on a failure)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { browser as launch, root } from './page.mjs';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
let swBody = null; // null: the repo's sw.js; a string: served in its place
const srv = http.createServer((req, res) => { const u = new URL(req.url, 'http://x'); let p = u.pathname;
  if (p === '/index.html') { res.writeHead(308, { Location: '/' + u.search }); return res.end(); } // as Cloudflare Pages does
  if (p === '/') p = '/index.html';
  if (p === '/sw.js' && swBody != null) { res.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-store' }); return res.end(swBody); }
  const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(res); });
await new Promise(r => srv.listen(0, '127.0.0.1', r)); const URL0 = `http://127.0.0.1:${srv.address().port}/`;
const br = await launch(); const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
const up = async p => { try { await p.waitForFunction(() => !!document.querySelector('#tName'), null, { timeout: 15000 }); return true; } catch (e) { return false; } };
const active = p => p.evaluate(async () => { const r = await navigator.serviceWorker.ready; for (let i = 0; i < 60 && !navigator.serviceWorker.controller; i++) await new Promise(x => setTimeout(x, 250)); return !!navigator.serviceWorker.controller; });
// 1. this version: first visit, then a second with the worker in charge
{ const ctx = await br.newContext(); const p = await ctx.newPage();
  await p.goto(URL0); (await up(p)) ? ok('first visit opens') : no('first visit did not open');
  (await active(p)) ? ok('the worker takes charge') : no('the worker never took charge');
  const r = await p.goto(URL0).then(() => true, e => String(e)); r === true && (await up(p)) ? ok('second visit opens from the worker\'s cache') : no('second visit: ' + r);
  const red = await p.evaluate(async () => { const ks = await caches.keys(); const c = await caches.open(ks.find(k => k.startsWith('ftr-v'))); const x = await c.match('./index.html'); return x ? x.redirected : null; });
  red === false ? ok('the cached page is a plain copy, not a redirected one') : no('cached page redirected: ' + red);
  await ctx.close(); }
// 2. a device left broken by the old worker heals itself
{ const real = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const i = real.indexOf("self.addEventListener('install'"), j = real.indexOf("self.addEventListener('activate'");
  swBody = real.slice(0, i).replace(/ftr-v[\d.]+\w*/, 'ftr-v0.0.1-old') + "self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, {cache:'reload'}))))); });\n" + real.slice(j); // the worker as it was before the fix
  const ctx = await br.newContext(); const p = await ctx.newPage();
  await p.goto(URL0); await up(p); await active(p);
  const broke = await p.goto(URL0).then(() => up(p), () => false);
  !broke ? ok('the old worker: the second visit fails, as seen on Cloudflare Pages') : no('the old worker did not reproduce the failure');
  swBody = null; // the fixed worker is published
  let healed = false; for (let k = 0; k < 6 && !healed; k++) { await p.goto(URL0).catch(() => {}); healed = await p.evaluate(() => !!document.querySelector('#tName')).catch(() => false); if (!healed) await p.waitForTimeout(4000); }
  healed ? ok('with the fixed worker published, the broken device opens again without clearing anything') : no('the broken device did not heal');
  await ctx.close(); }
await br.close(); srv.close();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nall passed'); process.exit(bad.length ? 1 : 0);
