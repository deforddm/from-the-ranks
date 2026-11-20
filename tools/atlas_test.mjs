// The atlas (v13.54.0; David, Nov 19, 2026: "more impressive maps"): every book on the shelf has a road map of its own with a stop
// for every chapter, every stop a sergeant has reached sits inside the sheet at a phone's width, every map draws at every chapter,
// the world map is an image that stops at the book it is asked to stop at (rule 85: Book Nine's finale never shows the Glass Desert),
// and the relief pass changes how a map looks and nothing else.
// Usage: node tools/atlas_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { width: 390, height: 844 });
const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {missing:[], short:[], off:[], threw:[], blank:[], clash:[]}; await document.fonts.ready;
  const books = shelfBooks().map(B => B.id); out.books = books.length;
  const host = document.createElement('div'); host.style.cssText = 'position:fixed;left:0;top:0;width:360px;z-index:99999'; document.body.appendChild(host);
  for (const b of books) { const R = ATL_ROUTES[b]; if (!R) { out.missing.push(b); continue; } if (R.stops.length !== 8) out.short.push(b + ':' + R.stops.length);
    for (const cls of ['route', 'route sm']) { host.innerHTML = `<div class="${cls}"><canvas></canvas></div>`; const cv = host.querySelector('canvas'), W = cv.clientWidth, H = cv.clientHeight, v = atlView(R.cam, 8, 8, W - 16, H - 16);
      R.stops.forEach((s, n) => { if (s.to) return; const x = v.X(s.x), y = v.Y(s.y); if (x < 16 || x > W - 16 || y < 16 || y > H - 16) out.off.push(`${b} ${cls} stop ${n} at ${Math.round(x)},${Math.round(y)} of ${W}x${H}`); });
      for (let ch = 0; ch <= 7; ch++) { try { drawRoute(cv, {book:b, chapter:ch, chapters:{}}, 100); const d = cv.getContext('2d').getImageData(cv.width >> 1, cv.height >> 1, 1, 1).data; if (!d[3]) out.blank.push(b + ' ch ' + ch);
          const bx = cv._atl.img.boxes || [], hit = (p, q, m) => p.x0 < q.x1 - m && q.x0 < p.x1 - m && p.y0 < q.y1 - m && q.y0 < p.y1 - m, names = bx.filter(o => o.k === 'name'); // every name on the sheet, clear of every other name, mark, the title box and the compass
          names.forEach((n, i) => { if (n.x0 < 10 || n.x1 > W - 10 || n.y0 < 10 || n.y1 > H - 10) out.clash.push(`${b} ${cls} ch ${ch}: "${n.t}" runs off the sheet`); names.slice(i + 1).forEach(m => { if (hit(n, m, 1)) out.clash.push(`${b} ${cls} ch ${ch}: "${n.t}" over "${m.t}"`); }); bx.filter(o => o.k !== 'name' && o.tag !== n.tag).forEach(m => { if (hit(n, m, 1.5)) out.clash.push(`${b} ${cls} ch ${ch}: "${n.t}" over ${m.t}`); }); });
          bx.filter(o => o.k === 'mark').forEach(n => bx.filter(o => o.k === 'title' || o.k === 'compass').forEach(m => { if (hit(n, m, 0)) out.clash.push(`${b} ${cls} ch ${ch}: ${n.t} under ${m.t}`); })); } catch (e) { out.threw.push(`${b} ch ${ch}: ${e.message}`); } } } }
  host.remove();
  out.world = {}; for (const k of [null, 'gotm', 'mt', 'dod', 'tcg']) { const h = worldSVG(k); out.world[k || 'all'] = {img:/^<img class="worldmap"[^>]+src="data:image\/jpeg/.test(h), len:h.length, glass:/Glass Desert/.test(h), lether:/Lether/.test(h)}; }
  out.sameNineTen = worldSVG('dod') === worldSVG('tcg');
  // the relief pass: same map rows after as before, and the wrapped painter still there
  S = newState('Hask'); S.chapter = 3; save(); startExplore('daru_street'); const a = AREA(), before = JSON.stringify(a.map); fitCanvas(ACOLS(), AROWS()); out.mapSame = before === JSON.stringify(AREA().map); out.wrapped = typeof prerender.base === 'function' && typeof mapRelief === 'function';
  return out;
});
r.books >= 10 && !r.missing.length ? ok(`every book on the shelf (${r.books}) has a road map`) : no('no road map for: ' + r.missing.join(', '));
!r.short.length ? ok('every road map has a stop for the opening and each of seven chapters') : no('stops: ' + r.short.join(', '));
!r.off.length ? ok('every stop sits inside the sheet at a phone\'s width, Deeds and Journal sizes') : no('off the sheet: ' + r.off.join('; '));
!r.threw.length && !r.blank.length ? ok('every road map draws at every chapter') : no('threw: ' + r.threw.join('; ') + ' blank: ' + r.blank.join(', '));
!r.clash.length ? ok('no name on any road map runs off the sheet or sits on another name, a mark, the title box or the compass, at any chapter') : no('clashes: ' + r.clash.slice(0, 12).join('; '));
Object.values(r.world).every(w => w.img && w.len > 20000) ? ok('the world map is a drawn image at every stopping point') : no('world: ' + JSON.stringify(r.world));
!r.world.gotm.lether && r.world.mt.lether && !r.world.dod.glass && r.world.tcg.glass && !r.sameNineTen ? ok('the world map stops at its book (no Lether before Book Five, no Glass Desert before Book Ten)') : no('rule 85: ' + JSON.stringify(r.world) + ' same ' + r.sameNineTen);
r.mapSame && r.wrapped ? ok('the relief pass leaves the map\'s tiles as they were') : no('relief: ' + JSON.stringify({mapSame:r.mapSame, wrapped:r.wrapped}));
errors.forEach(e => no('page error: ' + e));
await br.close(); srv.kill();
console.log(bad.length ? `\natlas_test: ${bad.length} FAILED` : '\natlas_test: all passed'); process.exit(bad.length ? 1 : 0);
