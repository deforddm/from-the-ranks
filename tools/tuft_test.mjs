// Tuft's kit (v13.4, David Nov 12): Phantom and the Mockra Whisper from the start, no Veil; her level-3 talent is Shadow Step or Shadow
// Lash (strain 4, a chain: 3 enemies, 4 from level 7, 5 from level 14, 2 less each leap, never a squadmate); a save whose Tuft took the
// Whisper as her talent is asked to choose again. Usage: node tools/tuft_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  out.kit = TPL.tuft.ab.join(','); out.talents = PICKS[3].tuft.map(p => p[0]).join(','); out.noVeil = !AB.veil;
  /* the old save: Tuft took the Whisper at 3 */
  const old = newState('Hask'); old.lvl = 5; old.picks.tuft = ['mockra', 'iron']; old.picksDue = []; const m = migrate(JSON.parse(JSON.stringify(old)));
  out.migr = [m.picks.tuft.join(','), m.picksDue.join(',')];
  /* the Lash in a fight: a row of enemies a tile apart, a squadmate among them */
  S = newState('Hask'); S.lvl = 8; S.picks.tuft = ['shadowlash']; save(); startBattle(Object.keys(BATTLES).find(k => !/^b\d/.test(k) && !BATTLES[k].stage2Only) || 'pale_ambush', {}); await wait(80);
  const tu = B.units.find(u => u.id === 'tuft'); out.hasLash = tu.ab.includes('shadowlash') && tu.ab.includes('mockra') && tu.ab.includes('phantom') && !tu.ab.includes('veil');
  const fs = B.units.filter(u => u.side === 'e'); const sq = B.units.filter(u => u.side === 'p' && u.id !== 'tuft');
  B.units = B.units.filter(u => u.side === 'p' || fs.indexOf(u) < 5);
  const row = B.units.filter(u => u.side === 'e'); row.forEach((e, i) => { e.x = 1 + i; e.y = 1; e.hp = e.maxhp = 999; e.ac = 0; });
  const mate = sq[0]; mate.x = 0; mate.y = 2; const mh = mate.hp; tu.x = 3; tu.y = 5; tu.atk = 60;
  await AB.shadowlash.run(tu, row[0].x, row[0].y); await wait(50);
  out.struck = row.filter(e => e.hp < 999).length; out.mateSafe = mate.hp === mh; out.n = lashN(); out.strain = AB.shadowlash.strain;
  return out;
});
ok(r.kit === 'phantom,mockra,salve' && r.noVeil, `Phantom and the Whisper from the start, no Veil (${r.kit})`);
ok(r.talents === 'shadowstep,shadowlash', `her talent: Shadow Step or Shadow Lash (${r.talents})`);
ok(r.migr[0] === 'iron' && r.migr[1] === '3', `a Tuft who took the Whisper chooses again (${r.migr})`);
ok(r.hasLash, 'in a fight her kit is Phantom, the Whisper and the Lash');
ok(r.n === 4 && r.struck === 4 && r.mateSafe && r.strain === 4, `at level 8 the Lash strikes four, never the squadmate beside them, strain 4 (${r.struck} of ${r.n})`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); process.exit(bad.length ? 1 : 0);
