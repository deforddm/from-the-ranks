// v13.65.2: the official address wears the green icon set; every other address keeps the brown one. The files exist and are images.
// Usage: node tools/icon_test.mjs   (build first; exit 1 on a failure)
import fs from 'node:fs'; import path from 'node:path';
import { server, browser as launch, root } from './page.mjs';
const srv = await server(); const br = await launch(); const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
const links = p => p.evaluate(() => ['manifest', 'icon', 'apple-touch-icon'].map(r => document.querySelector(`link[rel="${r}"]`).getAttribute('href')).join());
{ const p = await (await br.newContext()).newPage(); await p.goto(srv.url); await p.waitForTimeout(500);
  const l = await links(p); l === 'manifest.webmanifest,icon-192.png,apple-touch-icon.png' ? ok('any other address: the brown set') : no('default: ' + l); }
{ const ctx = await br.newContext(); await ctx.addInitScript(() => { window.FTR_HOST = 'playfromtheranks.com'; }); const p = await ctx.newPage(); await p.goto(srv.url); await p.waitForTimeout(500);
  const l = await links(p); l === 'manifest-official.webmanifest,icon-official-192.png,apple-touch-icon-official.png' ? ok('playfromtheranks.com: the green set') : no('official: ' + l);
  const m = await p.evaluate(async () => { const r = await fetch('manifest-official.webmanifest'); const j = await r.json(); const out = []; for (const i of j.icons) { const x = await fetch(i.src); out.push(i.src + ':' + x.status + ':' + (x.headers.get('content-type') || '')); } return { name: j.name, start: j.start_url, icons: out }; });
  m.name === 'From the Ranks' && m.start === './' && m.icons.length === 3 && m.icons.every(i => /:200:image\/png/.test(i)) ? ok('its manifest names three green icons, all served') : no('manifest: ' + JSON.stringify(m)); }
{ const ctx = await br.newContext(); await ctx.addInitScript(() => { window.FTR_HOST = 'trygalle.playfromtheranks.com'; }); const p = await ctx.newPage(); await p.goto(srv.url); await p.waitForTimeout(500);
  (await links(p)).startsWith('manifest.webmanifest') ? ok('a subdomain is not the official address') : no('subdomain took the green set'); }
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
/manifest-official\.webmanifest/.test(sw) && /icon-official-maskable-512\.png/.test(sw) ? ok('the service worker keeps the green set for offline play there') : no('sw.js does not precache the green set');
for (const f of ['icon-official-192.png', 'icon-official-512.png', 'icon-official-maskable-512.png', 'apple-touch-icon-official.png']) if (!fs.existsSync(path.join(root, f))) no('missing ' + f);
await br.close(); srv.kill(); console.log(bad.length ? `\n${bad.length} FAIL` : '\nall passed'); process.exit(bad.length ? 1 : 0);
