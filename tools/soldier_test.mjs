// v7.4.0: the Soldier-only late-book extra (David, Oct 27, 2026: "Soldier feels too easy late in each book").
// Books One-Three: SOLDIER_LATE (31c) from Chapter 3 on; Book Four: B4GAP's s column (70; left as tuned Oct 21, see docs/v7.4-notes.md).
// Checks, with a foe made by mkFoe in every book, chapter and difficulty:
//   - on Soldier the extra applies in the chapters that carry it, and exactly as the table says;
//   - it is absent on Story and Bridgeburner (the same foe as with the table emptied);
//   - Chapters 1-2 of Books One-Three carry none, and Book Four's Ch1-4 column is as tuned on Oct 21;
//   - Book Three's Coral mortal fights (SOLDIER_SKIP) keep their weight on Soldier.
import { server, browser as launch, openGame } from './page.mjs';
let bad = 0; const ok = (c, m) => { console.log(`${c ? 'ok' : 'FAIL'} ${m}`); if (!c) bad++; };

const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const out = await page.evaluate(() => {
  const rows = [];
  try {
    const mk = { gotm: () => newState('Sol'), dg: () => newStateDG('Sol'), moi: () => newStateMOI('Sol'), hoc: () => newStateHOC('Sol') };
    const foe = (book, ch, diff, bid) => { S = mk[book](); S.chapter = ch; S.diff = diff; B = bid ? { id: bid, def: {} } : null;
      const u = mkFoe('bruiser', 1, 1); B = null; return { hp: u.maxhp, atk: u.atk, dmg: u.dmg[2] }; };
    /* the table entry for (book, ch), and a way to empty it for a moment */
    const entry = (book, ch) => book === 'hoc' ? B4GAP[ch] && B4GAP[ch].s : SOLDIER_LATE[book] && SOLDIER_LATE[book][ch];
    const without = (book, ch, fn) => { const e = entry(book, ch); if (!e) return fn();
      const keep = { ...e }; Object.assign(e, { hp: 1, atk: 0, dmg: 0 }); try { return fn(); } finally { Object.assign(e, keep); } };
    for (const book of ['gotm', 'dg', 'moi', 'hoc']) for (let ch = 1; ch <= 7; ch++) {
      const e = entry(book, ch) ? { ...entry(book, ch) } : null;
      const r = {};
      for (const diff of ['story', 'soldier', 'bridgeburner']) { r[diff] = foe(book, ch, diff); r[diff + '0'] = without(book, ch, () => foe(book, ch, diff)); }
      rows.push({ book, ch, e, r });
    }
    // the exempt fights
    const skip = [...SOLDIER_SKIP].map(id => { const e = { ...SOLDIER_LATE.moi[7] };
      const a = foe('moi', 7, 'soldier', id), b = without('moi', 7, () => foe('moi', 7, 'soldier', id)); return { id, e, a, b }; });
    return { rows, skip };
  } catch (e) { return { err: e.stack.split('\n').slice(0, 3).join(' | ') }; }
});
if (out.err) { console.log('ERR ' + out.err); bad++; }
else {
  const live = e => e && ((e.hp || 1) !== 1 || (e.atk || 0) || (e.dmg || 0));
  const late = (book, ch) => book === 'hoc' ? ch >= 5 : ch >= 3;
  const B4_EARLY = { 1: { hp: 1.08, atk: 0, dmg: 1 }, 2: { hp: 1.2, atk: 1, dmg: 1 }, 3: { hp: 1.2, atk: 1, dmg: 2 }, 4: { hp: 1.2, atk: 1, dmg: 2 } };
  for (const { book, ch, e, r } of out.rows) {
    const tag = `${book} ch${ch}`;
    ok(r.story.hp === r.story0.hp && r.story.atk === r.story0.atk && r.story.dmg === r.story0.dmg, `${tag}: Story foe has no Soldier extra (${r.story.hp} hp)`);
    ok(r.bridgeburner.hp === r.bridgeburner0.hp && r.bridgeburner.atk === r.bridgeburner0.atk && r.bridgeburner.dmg === r.bridgeburner0.dmg, `${tag}: Bridgeburner foe has no Soldier extra (${r.bridgeburner.hp} hp)`);
    if (late(book, ch)) {
      ok(live(e), `${tag}: a Soldier extra is set (${JSON.stringify(e)})`);
      const wantHp = r.soldier0.hp * (e.hp || 1);
      ok(Math.abs(r.soldier.hp - wantHp) <= Math.max(1.01, wantHp * .04) && // Book Three's B3GAP rounds again after the base mkFoe
        r.soldier.atk === r.soldier0.atk + (e.atk || 0) && r.soldier.dmg === r.soldier0.dmg + (e.dmg || 0),
        `${tag}: Soldier foe carries it (${r.soldier0.hp}→${r.soldier.hp} hp, +${r.soldier.atk - r.soldier0.atk} to hit, +${r.soldier.dmg - r.soldier0.dmg} damage)`);
    } else if (book === 'hoc') {
      const w = B4_EARLY[ch];
      ok(e && e.hp === w.hp && (e.atk || 0) === w.atk && (e.dmg || 0) === w.dmg, `${tag}: Book Four's Oct 21 Soldier column unchanged (${JSON.stringify(e)})`);
    } else {
      ok(!live(e) && r.soldier.hp === r.soldier0.hp && r.soldier.dmg === r.soldier0.dmg && r.soldier.atk === r.soldier0.atk, `${tag}: no Soldier extra in the early chapters`);
    }
  }
  for (const { id, e, a, b } of out.skip) ok(live(e) && a.hp === b.hp && a.atk === b.atk && a.dmg === b.dmg, `${id}: the Coral mortal fight keeps its weight on Soldier (${a.hp} hp)`);
}
/* David, Oct 27, 9:20 PM PDT: Soldier stays under Bridgeburner (health ×1.25, to hit +1; wounds ×1.2, so at most +1 flat damage) */
{ const cap = await page.evaluate(() => Object.entries(SOLDIER_LATE).flatMap(([b, t]) => Object.entries(t).filter(([, e]) => e.hp > DIFFS.bridgeburner.hp || e.atk > DIFFS.bridgeburner.atk || e.dmg > 1).map(([c]) => b + ' ch' + c)));
  ok(!cap.length, 'Soldier\'s late extra never passes Bridgeburner' + (cap.length ? ': ' + cap.join(', ') : '')); }
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
console.log(bad ? `${bad} FAILED` : 'all ok');
process.exit(bad ? 1 : 0);
