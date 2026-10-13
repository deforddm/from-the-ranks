// The sergeant is always in front in story art: in every backdrop of both books, wherever the squad stands in a line facing one way,
// the sergeant is at the leading end of it (rightmost facing right, leftmost facing left) and drawn last, so nobody stands across them.
// A ring of the squad facing in (some one way, some the other) puts the sergeant in the middle at the front; those are only checked for
// being drawn last. Usage: node tools/sgtfront_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, {});
const res = await page.evaluate(() => {
  const bad = [], seen = {gotm:0, dg:0}, real = drawFigure;
  for (const book of ['gotm', 'dg']) {
    setBook(book); S = book === 'dg' ? newStateDG('Hask') : newState('Hask'); if (book === 'dg') S.squad.push('warlock'); else S.squad = [...PORDER, 'ellis']; migrate(S); S.chapter = 3;
    const mates = new Set(S.squad), kinds = [...new Set([...Object.keys(SCENES), ...Object.keys(SCENEX)])];
    const cv = document.createElement('canvas'); cv.style.width = '390px'; cv.style.height = '240px'; document.body.appendChild(cv);
    for (const k of kinds) { const drawn = []; drawFigure = (ctx, id, x, y, sc, t, o = {}) => { if (mates.has(id)) drawn.push({id, x, dir:o.dir ?? 1}); };
      try { drawScene(cv, k, 1000); } catch (e) { continue; } finally { drawFigure = real; }
      const q = drawn; if (!q.some(d => d.id === 'sgt') || q.length < 2) continue; seen[book]++;
      if (q[q.length - 1].id !== 'sgt') { bad.push(`${book} ${k}: the sergeant is drawn before ${q[q.length - 1].id}`); continue; }
      const others = q.filter(d => d.id !== 'sgt'), dirs = new Set(others.map(d => d.dir)), s = q.find(d => d.id === 'sgt');
      if (dirs.size !== 1 || s.dir !== [...dirs][0]) continue; // a ring, or the sergeant turned to face them
      const lead = s.dir < 0 ? others.every(d => d.x >= s.x) : others.every(d => d.x <= s.x);
      if (!lead) bad.push(`${book} ${k}: facing ${s.dir < 0 ? 'left' : 'right'}, the sergeant is not at the front`); }
    cv.remove(); }
  return {bad, seen}; });
await br.close(); srv.kill();
if (errors.length) console.log('page errors:', errors);
if (res.bad.length) { console.log('sgtfront: FAIL\n  ' + res.bad.join('\n  ')); process.exit(1); }
console.log(`sgtfront: ok (${res.seen.gotm} Book One and ${res.seen.dg} Book Two backdrops with the squad in them)`);
