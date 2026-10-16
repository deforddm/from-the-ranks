// v6.7.2: a munition spent by a story choice ("uses 1 sharper") counts on the Deeds page as thrown, like one thrown in a fight; a gift ("for good") doesn't.
// Usage: node tools/munitions_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(async () => {
  S = newState('Hask'); S.inv.sharper = 5; S.inv.cusser = 2; S.inv.smoker = 2; save();
  const row = () => (statsRows(S).find(r => r[0] === 'Munitions thrown') || [])[1];
  const none = row();
  // a real story choice: Chapter Four's guild roofs ("Kettle skims a sharper along the ridge")
  let real = null; for (const k of Object.keys(DLG)) { try { const n = typeof DLG[k] === 'function' ? DLG[k]() : DLG[k]; const c = n && n.ch && n.ch.find(x => x.tag === 'uses 1 sharper' && !x.check);
    if (c) { const g = c.go; c.go = null; choose(c); c.go = g; real = k; break; } } catch(e) {} }
  const afterReal = row();
  choose({t:'smoke', tag:'uses 1 smoker', fx:()=>{ S.inv.smoker--; }, go:null});
  choose({t:'cusser', fx:()=>{ S.inv.cusser -= 1; }, go:null}); // untagged, as Chapter Five's "Down!"
  choose({t:'gift', tag:'1 sharper, for good', fx:()=>{ S.inv.sharper--; }, go:null});
  choose({t:'buy', fx:()=>{ S.inv.sharper += 2; }, go:null});
  return {none, real, afterReal, end:row(), st:S.stats, html:statsHTML(S).includes('1 smoker') };
});
ok(o.none === 'none', `a new sergeant: ${o.none}`);
ok(o.real && /^1 sharper$/.test(o.afterReal), `a real story choice (${o.real}) counts: ${o.afterReal}`);
ok(o.end === '1 sharper, 1 cusser, 1 smoker', `tagged, untagged, gift and purchase: ${o.end}`);
ok(o.html, 'the Deeds count shows it');
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
