// v13.65.2: the new address updates itself before it takes a carry. A device whose copy of the new address is an old version
// (its service worker has the old page cached) is opened by the old address's button: it fetches the new version, lets it in,
// reloads, and only then takes the sergeants. Two origins from one server: 127.0.0.1 (old) and localhost (new).
// Usage: node tools/movefresh_test.mjs   (build first; exit 1 on a failure)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { browser as launch, root } from './page.mjs';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const real = fs.readFileSync(path.join(root, 'sw.js'), 'utf8'), NOW = (real.match(/ftr-v[\w.]+/) || [])[0];
let swBody = real.replace(NOW, 'ftr-v0.0.1-old'); // the version this device has until the server publishes the real one
const srv = http.createServer((req, res) => { const u = new URL(req.url, 'http://x'); let p = u.pathname; if (p === '/') p = '/index.html';
  if (p === '/sw.js') { res.writeHead(200, { 'Content-Type': 'text/javascript', 'Cache-Control': 'no-store' }); return res.end(swBody); }
  const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(res); });
await new Promise(r => srv.listen(0, '0.0.0.0', r)); const PORT = srv.address().port;
const OLD = `http://127.0.0.1:${PORT}`, NEW = `http://localhost:${PORT}`;
const br = await launch(); const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
const ctx = await br.newContext({ viewport: { width: 390, height: 844 } }); const errors = [];
await ctx.addInitScript(([to, from]) => { window.FTR_MOVE = { on: true, to, from: [from] }; }, [NEW + '/', OLD]);
const cacheKeys = p => p.evaluate(async () => (await caches.keys()).filter(k => k.startsWith('ftr-v')).join());
// the new address, visited before: an old worker in charge, one sergeant of its own
const n0 = await ctx.newPage(); n0.on('pageerror', e => errors.push(String(e)));
await n0.goto(NEW + '/'); await n0.waitForFunction(() => !!document.querySelector('#tName'), null, { timeout: 20000 });
await n0.evaluate(async () => { await navigator.serviceWorker.ready; for (let i = 0; i < 80 && !navigator.serviceWorker.controller; i++) await new Promise(x => setTimeout(x, 250)); localStorage.clear(); S = newState('Local'); save(); S = null; });
const k0 = await cacheKeys(n0); k0 === 'ftr-v0.0.1-old' ? ok('new address: an old version is cached and in charge') : no('setup cache: ' + k0);
await n0.close();
swBody = real; // the server now has the current version
// the old address: two sergeants, then the button
const p = await ctx.newPage(); p.on('pageerror', e => errors.push(String(e)));
await p.goto(OLD + '/'); await p.waitForFunction(() => !!document.querySelector('#tName'), null, { timeout: 20000 });
await p.evaluate(() => { localStorage.clear(); S = newState('Hask'); S.chapter = 3; save(); S = newStateDG('Vesh'); save(); S = null; showTitle(); try { closeModal(); } catch(e) {} const m = document.getElementById('modal'); if (m) m.hidden = true; });
await p.waitForTimeout(300);
const [np] = await Promise.all([ctx.waitForEvent('page'), p.click('#mvGo')]); np.on('pageerror', e => errors.push(String(e)));
let arrived = ''; for (let i = 0; i < 60; i++) { await np.waitForTimeout(1000); arrived = await np.evaluate(() => { try { return roster().list.map(e => e.name).sort().join(); } catch (e) { return ''; } }).catch(() => ''); if (arrived === 'Hask,Local,Vesh') break; }
arrived === 'Hask,Local,Vesh' ? ok('the sergeants arrive, beside the one already there') : no('arrived: ' + arrived);
const k1 = await cacheKeys(np); k1 === NOW ? ok('the new address updated itself to ' + NOW + ' before taking them') : no('cache after the carry: ' + k1);
const hash = await np.evaluate(() => location.hash); hash === '' ? ok('the #carry mark is gone') : no('hash: ' + hash);
const o = await p.evaluate(() => ({ mark: !!moveMark(), text: (document.querySelector('.mvline') || {}).textContent || '' }));
o.mark && /were carried to/.test(o.text) ? ok('the old address heard it was done') : no('old address: ' + JSON.stringify(o));
errors.length ? no('page errors: ' + errors.slice(0, 3).join(' | ')) : ok('no page errors');
await br.close(); srv.close();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nall passed'); process.exit(bad.length ? 1 : 0);
