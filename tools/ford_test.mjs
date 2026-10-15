// v6.3.2: Mincer's count at the Sekala follows Tangle's cusser, whichever order the player meets them in.
// Usage: node tools/ford_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(() => {
  const mk = f => { S = newStateDG('Test'); Object.assign(S.f, f); return S; };
  const txt = (node, f) => { mk(f); const n = DLG[node](); return [n.txt, (n.ch || []).map(c => c.t).join(' | ')].join(' || '); };
  return {
    tangleIn: (mk({}), b2In('tangle')),
    firstGiven: txt('b2_mincer', {b2_cusser:1, b2_fordWork:1}),
    firstKept: txt('b2_mincer', {b2_cusserKept:1, b2_fordWork:1}),
    firstNone: txt('b2_mincer', {}),
    missGiven: txt('b2_mincer_miss', {b2_cusser:1, b2_fordWork:1}),
    whoAfter: txt('b2_mincer_who', {b2_cusser:1, b2_fordWork:1}),
    whoBefore: txt('b2_mincer_who', {}),
    againGiven: txt('b2_mincer_again', {b2_mincer:1, b2_cusser:1}),
  }; });
ok(o.tangleIn, 'Tangle is in the new Book Two squad');
ok(/fifty-five cussers/.test(o.firstGiven) && !/when I find the last|fifty-four/i.test(o.firstGiven), 'cusser given first: Mincer counts fifty-five and is not still looking');
ok(/fifty-four cussers/.test(o.firstKept) && /I always find one/.test(o.firstKept), 'cusser kept: fifty-four, he will find one');
ok(/fifty-four cussers\. Fifty-five when I find the last/.test(o.firstNone), 'nothing settled yet: the original line');
ok(!/one missing/.test(o.missGiven), 'a missed Wits check no longer says one is missing after you gave it');
ok(!/lay the last of the stones/.test(o.whoAfter) && /lay the last of the stones/.test(o.whoBefore), '"Who lights it?" only sends Tangle to the stones if he hasn\'t been yet');
ok(/Fifty-five/.test(o.againGiven), 'returning to Mincer still says fifty-five');
ok(!errors.length, `no page errors (${errors.slice(0, 3).join(' | ')})`);
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
