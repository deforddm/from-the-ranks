/* v13.58.0: tile art (src/989f_tileart.js; series-polish-plan.md §3c). Looks only: it must paint every map of a book it covers without an error,
   leave the books it does not cover alone, and change no map. */
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 412, height: 915 });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const R = await page.evaluate(() => { const out = {painted:0, skipped:[], errs:[], other:0, changed:[]};
  const warn0 = console.warn; console.warn = (...a) => { if (String(a[0]) === 'tile art') out.errs.push(String(a[1] && a[1].message || a[1])); warn0.apply(console, a); };
  S = newState('Hask'); S.picksDue = []; S.chapter = 7; migrate(S);
  const run = (id, map, cols, rows, dark, tunnel, style, battle) => { const before = JSON.stringify(map); if (!tileArtOn(battle, style, tunnel)) { out.skipped.push(id + ':' + style); return; }
    const c = G.bctx.canvas; if (c.width < cols * G.T || c.height < rows * G.T) { c.width = cols * G.T; c.height = rows * G.T; }
    prerender(map, cols, rows, dark, tunnel, style, battle); out.painted++; if (JSON.stringify(map) !== before) out.changed.push(id); };
  startExplore('pale');
  Object.values(CHAPTERS).forEach(CH => { (CH.areas || []).forEach(a => run(a.id, a.map, a.map[0].length, a.map.length, !!a.dark || /night/.test(a.decor || ''), false, a.decor || 'camp_night', false));
    Object.entries(CH.battles || {}).forEach(([id, d]) => run(id, d.map, 8, 10, d.dark, !d.open && !d.style, d.style || (d.open ? 'plain' : ''), true)); });
  out.kinds = ['city_night', 'city_dusk', 'pale', 'camp_night', 'plain', 'hills_night'].map(s => tileArtKind(s, false)).join() + ',' + tileArtKind('', true);
  out.left = ['roof_night', 'estate_night', 'lakefront', 'dock', 'cellar', 'odhan', 'b5_c1_canal'].every(s => tileArtKind(s, false) === null);
  out.otherBook = tileArtOn(false, 'odhan', false) || tileArtOn(false, 'b8_c2_town', false); out.byBook = {};
  for (const b of ['tth', 'rg', 'moi']) { try { setBook(b); S = b === 'tth' ? newStateTTH('Hask') : b === 'moi' ? newStateMOI('Hask') : newStateRG('Hask', 'Hask'); S.picksDue = []; const n0 = out.painted; Object.values(CHAPTERS).forEach(CH => { (CH.areas || []).forEach(a => run(a.id, a.map, a.map[0].length, a.map.length, !!a.dark || /night/.test(a.decor || ''), false, a.decor || 'camp_night', false)); Object.entries(CH.battles || {}).forEach(([id, d]) => run(id, d.map, 8, 10, d.dark, !d.open && !d.style, d.style || (d.open ? 'plain' : ''), true)); }); out.byBook[b] = out.painted - n0; } catch (e) { out.errs.push(b + ': ' + e.message); } }
  setBook('gotm'); S = newState('Hask'); window.FTR_NOTILEART = 1; out.seam = tileArtOn(false, 'plain', false); window.FTR_NOTILEART = 0;
  console.warn = warn0; return out; });
ok(R.painted >= 25, `Book One: ${R.painted} maps painted`);
ok(!R.errs.length, 'no painter errors ' + R.errs.slice(0, 3).join(' / '));
ok(!R.changed.length, 'no map changed ' + R.changed);
ok(R.kinds === 'city,city,earth,earth,grass,grass,sap', 'each style has its painter (' + R.kinds + ')');
ok(R.left, 'the roofs, the estate, the lake, the dock, the cellar and other books\' styles are left alone');
ok(R.otherBook === false, 'a later book\'s own style is not painted over'); ok(R.byBook.tth >= 10 && R.byBook.rg >= 3, 'the later books\' borrowed Book One styles are painted ' + JSON.stringify(R.byBook)); ok(R.seam === false, 'the off switch for tools works');
console.log('left as they were: ' + R.skipped.length + ' maps');
ok(!errors.length, 'no page errors ' + errors.slice(0, 2).join(' / '));
await br.close(); console.log(fails ? `FAIL (${fails})` : 'PASS'); process.exit(fails ? 1 : 0);
