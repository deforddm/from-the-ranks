// v10.2 balance (docs/v10.2-balance.md): the per-fight rows. SOLDIER_FIGHT (31c) is Soldier's, every book, and replaces the chapter's
// SOLDIER_LATE row for that fight; B1GAP / B2GAP / B3GAP_FIGHT / B4GAP_FIGHT are Bridgeburner's, Books One to Four, on top of the rest.
// Checks, with a foe made by mkFoe inside each fight that has a row:
//   - a Soldier row changes the Soldier foe exactly as it says (in place of the chapter row), and nothing on Story or Bridgeburner;
//   - a Bridgeburner row changes the Bridgeburner foe exactly as it says, and nothing on Story or Soldier;
//   - a row keyed to one book's fight does nothing in another book; a fight with no row is as it was;
//   - Soldier's foe is never stronger than Bridgeburner's in the same fight: its threat, health × chance to hit armour 16 × average blow
//     (Bridgeburner's blow ×1.2, DIFFS), is at most 10% over Bridgeburner's (the rows are tuned by measured wins, so health and flat
//     damage trade off a little; the measured Soldier win is at or above Bridgeburner's in every fight, docs/v10.2-balance.md). Not
//     SOLDIER_SKIP's fights: they keep their Soldier weight by David's call, and their Bridgeburner side was eased to the target.
import { server, browser as launch, openGame } from './page.mjs';
let bad = 0; const ok = (c, m) => { if (!c || process.env.VERBOSE) console.log(`${c ? 'ok' : 'FAIL'} ${m}`); if (!c) bad++; };

const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const out = await page.evaluate(() => {
  try {
    const mk = { gotm: () => newState('Sol'), dg: () => newStateDG('Sol'), moi: () => newStateMOI('Sol'), hoc: () => newStateHOC('Sol'), mt: () => newStateMT('Sol'), bh: () => newStateBH('Sol'), rg: () => newStateRG('Sol'), tth: () => newStateTTH('Sol') };
    const bookOf = id => ({ b2: 'dg', b3: 'moi', b4: 'hoc', b5: 'mt', b6: 'bh', b7: 'rg', b8: 'tth' })[id.slice(0, 2)] || 'gotm';
    const chOf = id => +(Object.keys(CHAPTERS).find(n => CHAPTERS[n].battles && id in CHAPTERS[n].battles) || 0);
    const foe = (book, ch, diff, bid) => { if (typeof setBook === 'function') setBook(book); S = mk[book](); S.chapter = ch; S.diff = diff; B = { id: bid, def: {} };
      const u = mkFoe('bruiser', 1, 1); B = null; return { hp: u.maxhp, atk: u.atk, dmg: u.dmg[2], ac: u.ac, avg: u.dmg[0] * (u.dmg[1] + 1) / 2 + u.dmg[2] }; };
    const emptied = (tbl, id, fn) => { const keep = tbl[id]; delete tbl[id]; try { return fn(); } finally { tbl[id] = keep; } };
    const BB = { gotm: B1GAP, dg: B2GAP, moi: B3GAP_FIGHT, hoc: B4GAP_FIGHT };
    const rows = [];
    for (const id of Object.keys(SOLDIER_FIGHT)) { const book = bookOf(id); if (typeof setBook === 'function') setBook(book); const ch = chOf(id), r = { id, book, ch, kind: 'S', row: { ...SOLDIER_FIGHT[id] } };
      for (const d of ['story', 'soldier', 'bridgeburner']) { r[d] = foe(book, ch, d, id); r[d + '0'] = emptied(SOLDIER_FIGHT, id, () => foe(book, ch, d, id)); }
      r.late = (SOLDIER_LATE[book] || {})[ch] || null; r.skip = SOLDIER_SKIP.has(id); rows.push(r); }
    for (const [book, tbl] of Object.entries(BB)) for (const id of Object.keys(tbl)) { if (typeof setBook === 'function') setBook(book); const ch = chOf(id), r = { id, book, ch, kind: 'B', row: { ...tbl[id] } };
      for (const d of ['story', 'soldier', 'bridgeburner']) { r[d] = foe(book, ch, d, id); r[d + '0'] = emptied(tbl, id, () => foe(book, ch, d, id)); }
      r.other = foe(book === 'gotm' ? 'dg' : 'gotm', ch, 'bridgeburner', id); r.other0 = emptied(tbl, id, () => foe(book === 'gotm' ? 'dg' : 'gotm', ch, 'bridgeburner', id)); rows.push(r); }
    // Soldier never stronger than Bridgeburner, every fight with a row
    const ids = [...new Set([...Object.keys(SOLDIER_FIGHT), ...Object.values(BB).flatMap(t => Object.keys(t)), ...Object.keys(B5GAP_FIGHT), ...Object.keys(B6GAP), ...Object.keys(B7GAP)])];
    const cap = ids.filter(id => !SOLDIER_SKIP.has(id)).map(id => { const book = bookOf(id); if (typeof setBook === 'function') setBook(book); const ch = chOf(id); return { id, s: foe(book, ch, 'soldier', id), b: foe(book, ch, 'bridgeburner', id) }; });
    return { rows, cap };
  } catch (e) { return { err: e.stack.split('\n').slice(0, 3).join(' | ') }; }
});
if (out.err) { console.log('ERR ' + out.err); bad++; }
else {
  const same = (a, b) => a.hp === b.hp && a.atk === b.atk && a.dmg === b.dmg && a.ac === b.ac;
  const near = (a, b) => Math.abs(a - b) <= Math.max(1.01, b * .04); // Books Three and Four round again in their own mkFoe
  let nS = 0, nB = 0;
  for (const r of out.rows) {
    const t = `${r.id} (${r.book} ch${r.ch})`, g = r.row;
    if (r.kind === 'S') { nS++;
      ok(!r.skip, `${t}: not one of SOLDIER_SKIP's fights`);
      ok(same(r.story, r.story0) && same(r.bridgeburner, r.bridgeburner0), `${t}: the Soldier row does nothing on Story or Bridgeburner`);
      const l = r.late || {}, wantHp = r.soldier0.hp / (l.hp || 1) * (g.hp || 1);
      ok(near(r.soldier.hp, wantHp) && r.soldier.atk === r.soldier0.atk - (l.atk || 0) + (g.atk || 0) && r.soldier.dmg === r.soldier0.dmg - (l.dmg || 0) + (g.dmg || 0) && r.soldier.ac === r.soldier0.ac + (g.ac || 0),
        `${t}: Soldier carries its own row in place of the chapter's (${r.soldier0.hp}→${r.soldier.hp} hp, ${JSON.stringify(g)})`);
    } else { nB++;
      ok(same(r.story, r.story0) && same(r.soldier, r.soldier0), `${t}: the Bridgeburner row does nothing on Story or Soldier`);
      ok(near(r.bridgeburner.hp, r.bridgeburner0.hp * (g.hp || 1)) && r.bridgeburner.atk === r.bridgeburner0.atk + (g.atk || 0) && r.bridgeburner.dmg === r.bridgeburner0.dmg + (g.dmg || 0) && r.bridgeburner.ac === r.bridgeburner0.ac + (g.ac || 0),
        `${t}: Bridgeburner carries the row (${r.bridgeburner0.hp}→${r.bridgeburner.hp} hp, ${JSON.stringify(g)})`);
      ok(same(r.other, r.other0), `${t}: the row does nothing in another book`);
    }
  }
  console.log(`${nS} Soldier rows, ${nB} Bridgeburner rows (Books One to Four) checked`);
  const threat = (f, k) => f.hp * Math.min(.95, Math.max(.05, (21 + f.atk - 16) / 20)) * Math.max(1, f.avg * k);
  const over = out.cap.filter(c => threat(c.s, 1) > 1.1 * threat(c.b, 1.2));
  ok(!over.length, `Soldier's foe never stronger than Bridgeburner's, fight for fight (${out.cap.length} fights)` + (over.length ? ': ' + over.map(c => `${c.id} ${(threat(c.s, 1) / threat(c.b, 1.2)).toFixed(2)}×`).join('; ') : ''));
}
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
console.log(bad ? `${bad} FAILED` : 'all ok');
process.exit(bad ? 1 : 0);
