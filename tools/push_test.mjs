// Pushback (v13.4, David Nov 12): who a push moves. The very heavy (HEAVY_FOES or heavy:true) and the deathless never; a leader (boss)
// braces about half the time; everyone else moves whatever their health. Usage: node tools/push_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(() => {
  const out = {};
  const plain = mkFoe('b10_kolansii', 3, 3, 300), heavy = mkFoe('stone', 3, 3), hound = mkFoe('b8_hound', 3, 3), lead = mkFoe('b10_kofficer', 3, 3);
  out.plain = [plain.maxhp, pushHolds(plain)]; out.heavy = pushHolds(heavy); out.hound = pushHolds(hound); out.flag = heavy.heavy && !plain.heavy;
  let braced = 0; for (let i = 0; i < 400; i++) if (pushHolds(lead) === 'braced') braced++; out.braced = braced;
  out.noFixed = !/maxhp >= 45/.test(Object.values(AB).map(a => a.run ? a.run.toString() : '').join('\n'));
  return out;
});
ok(r.plain[0] > 45 && r.plain[1] === '', `an ordinary soldier moves whatever its health (${r.plain})`);
ok(r.heavy === 'heavy' && r.hound === 'heavy' && r.flag, 'the Stonebound and a Hound never move');
ok(r.braced > 140 && r.braced < 260, `a leader braces about half the time (${r.braced} of 400)`);
ok(r.noFixed, 'no push left on the old 45-health rule');
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); process.exit(bad.length ? 1 : 0);
