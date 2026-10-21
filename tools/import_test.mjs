// From the Ranks shares its site with Ashes of the Pale. On the first run on a device it copies every Ashes sergeant, setting and
// deed across once ('ashes-of-the-pale-*' -> 'from-the-ranks-*'), never the install mark, and never again after that.
// Usage: node tools/import_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch } from './page.mjs';
const srv = await server(); const br = await launch();
const ctx = await br.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage(); const errors = []; page.on('pageerror', e => errors.push(String(e)));
const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
// an Ashes device: two sergeants (one per book), settings, seen-notes, an install mark; nothing of From the Ranks yet.
// Seeded before the game boots, from a page of the same site that is not the game.
await page.goto(srv.url + 'manifest.webmanifest');
await page.evaluate(() => {
  localStorage.clear();
  const sv = (sid, book, name) => ({v:1, sid, name, book, chapter:0, lvl:1, squad:[], f:{}});
  const a = sv('aaa', undefined, 'Hask'), b = sv('bbb', 'dg', 'Vesh');
  for (const s of [a, b]) localStorage.setItem('ashes-of-the-pale-v1:' + s.sid, JSON.stringify(s));
  localStorage.setItem('ashes-of-the-pale-roster', JSON.stringify({list: [{id:'bbb', book:'dg', name:'Vesh', ch:0, lvl:1, upd:2}, {id:'aaa', name:'Hask', ch:0, lvl:1, upd:1}]}));
  localStorage.setItem('ashes-of-the-pale-settings', JSON.stringify({art: false, master: 0}));
  localStorage.setItem('ashes-of-the-pale-seen', '4.8.1'); localStorage.setItem('ashes-of-the-pale-install', 'installed');
});
await page.goto(srv.url); await page.waitForTimeout(800);
const r = await page.evaluate(() => ({ keys: Object.keys(localStorage).sort(), list: roster().list.map(e => e.name + ':' + (e.book || 'gotm')), art: SET.art,
  ashes: Object.keys(localStorage).filter(k => k.startsWith('ashes-of-the-pale-')).length, rows: document.querySelectorAll('.sgtrow').length, tag: (document.querySelector('#tTag') || {}).textContent || '' }));
r.list.join() === 'Vesh:dg,Hask:gotm' ? ok('both sergeants came across, last played first') : no('roster after import: ' + r.list.join());
r.rows === 2 ? ok('the title lists both') : no(`title rows: ${r.rows}`);
r.art === false ? ok('settings came across') : no('settings did not come across');
r.keys.includes('from-the-ranks-seen') ? ok('seen-notes came across') : no('seen-notes missing');
!r.keys.includes('from-the-ranks-install') ? ok('the install mark stays with Ashes') : no('install mark was copied');
r.ashes === 6 ? ok('Ashes keeps its own copy') : no(`Ashes keys left: ${r.ashes}`);
/Hissar burns/.test(r.tag) ? ok('the title wears the last-played book') : no('title tag: ' + r.tag);
// played on: a new sergeant in From the Ranks, then Ashes writes again: no second import
await page.evaluate(() => { S = newState('Corl'); save(); S = null; localStorage.setItem('ashes-of-the-pale-v1:zzz', '{}'); });
await page.reload(); await page.waitForTimeout(600);
const r2 = await page.evaluate(() => ({ n: roster().list.length, z: localStorage.getItem('from-the-ranks-v1:zzz') }));
r2.n === 3 && r2.z === null ? ok('imports once only') : no(`second run: ${r2.n} sergeants, zzz=${r2.z}`);
// a fresh device: nothing to import, nothing breaks
await page.evaluate(() => localStorage.clear()); await page.reload(); await page.waitForTimeout(600);
const r3 = await page.evaluate(() => ({ n: roster().list.length, shelf: document.querySelectorAll('[data-shelf]').length, want: Object.keys(BOOKS).filter(k => !BOOKS[k].coming).length })); // Book Four is on the shelf once a chapter of it is registered
r3.n === 0 && r3.shelf === r3.want ? ok('a fresh device opens on Choose your book') : no(`fresh device: ${JSON.stringify(r3)}`);
await br.close(); srv.kill();
if (errors.length) { console.log('page errors:', errors); process.exit(1); }
if (bad.length) { console.log(`import: FAIL (${bad.length})`); process.exit(1); }
console.log(`import: 9 ok, 0 FAIL`);
