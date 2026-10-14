// v6.1.2: a "yes, but" with no cost of its own never takes silver. Might pays in skin (health off the next fight), Wits and Guile rattle the roller.
// Usage: node tools/yesbut_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, arg) => page.evaluate(f, arg);

const o = await ev(async () => { const wait = ms => new Promise(r => setTimeout(r, ms));
  S = newState('Hask'); S.silver = 20; save();
  const near = (stat, who) => settleRoll({who, stat, tier:'near', ok:true, pass:true, margin:-1, nat:9}, {check:[stat, 12]});
  near('might', 'brisk'); const m = {silver:S.silver, bruised:(S.bruised || {}).brisk};
  near('wits', 'kettle'); const w = {silver:S.silver, rattled:!!S.rattled.kettle};
  near('guile', 'tuft'); const g = {silver:S.silver, rattled:!!S.rattled.tuft};
  // a scene's own near: still wins
  settleRoll({who:'sgt', stat:'might', tier:'near', ok:true, pass:true, margin:-1, nat:9}, {check:['might', 12], near:{t:'own cost', fx:()=>{ S.f.ownNear = 1; }}});
  const own = {flag:S.f.ownNear, bruisedSgt:(S.bruised || {}).sgt};
  startBattle('guild_roofs', {}); await wait(500);
  const b = B.units.find(u => u.id === 'brisk'); const bt = {down:b.maxhp - b.hp, cleared:!S.bruised.brisk, log:B.log.some(l => /still sore/.test(l))};
  return {m, w, g, own, bt, nb:bruiseN()}; });
ok(o.m.silver === 20 && o.m.bruised === o.nb, `Might: no silver, ${o.nb} health owed (${JSON.stringify(o.m)})`);
ok(o.w.silver === 20 && o.w.rattled, 'Wits: no silver, rattled');
ok(o.g.silver === 20 && o.g.rattled, 'Guile: no silver, rattled');
ok(o.own.flag === 1 && !o.own.bruisedSgt, 'a scene\'s own "yes, but" replaces the fallback');
ok(o.bt.down >= o.nb && o.bt.cleared && o.bt.log, `the next fight starts ${o.bt.down} health down, then it's paid (${JSON.stringify(o.bt)})`);

// Dryj Spring: the round-by-the-gully check has its own cost now
const d = await ev(() => { const node = DLG.b2_spring_wait();
  const c = node && node.ch.find(x => x.check); return c ? {has:!!(c.near && c.near.fx), t:typeof c.near.t} : {err:'node not found'}; });
ok(d.has, `Dryj Spring's gully check carries its own "yes, but" (${JSON.stringify(d)})`);

// every check on a choice carries its own "yes, but" (v6.2.0), except tricks, which never have one
{ const fs = await import('fs'); const missing = [];
  for (const f of fs.readdirSync('src').filter(f => f.endsWith('.js') && !f.startsWith('16'))) { const s = fs.readFileSync('src/' + f, 'utf8'); let i = -1;
    while ((i = s.indexOf('check:[', i + 1)) >= 0) { const st = s.lastIndexOf('{t:', i); if (st < 0) continue; let d = 0, j = st;
      for (; j < s.length; j++) { if (s[j] === '{') d++; else if (s[j] === '}' && --d === 0) break; }
      const body = s.slice(st, j); if (!/near:|trick:/.test(body) && !/near:\s*\w+\.\w*[Nn]ear/.test(body)) missing.push(f + ':' + (s.slice(0, i).split('\n').length)); } }
  const known = ['43_chapter4.js:5', '43_chapter4.js:11', '46_chapter7.js:90']; // helpers whose near: sits beside the check, outside a {t:} choice
  const left = missing.filter(m => !known.includes(m));
  ok(!left.length, `every check has its own "yes, but" (${left.length ? left.join(', ') : 'all'})`); }

// run every choice's own "yes, but" once, in its own book, and check it says something and throws nothing
const run = await ev(() => { const out = {n:0, bad:[]};
  const books = [['newState', k => !/^b[23]_/.test(k)], ['newStateDG', k => /^b2_/.test(k)], ['newStateMOI', k => /^b3_/.test(k)]];
  for (const [mk, mine] of books) for (const k of Object.keys(DLG).filter(mine)) {
    S = window[mk]('Test'); S.silver = 10; S.inv.salve = 2; S.inv.sharper = 2; S.inv.smoker = 2; S.inv.burner = 2; let node; try { node = DLG[k](); } catch(e) { continue; }
    for (const c of (node && node.ch) || []) { if (!c || !c.check || !c.near || !(c.near.fx || c.near.t)) continue;
      const who = (typeof checkers === 'function' && checkers(c)[0]) || 'sgt', before = document.querySelectorAll('.note').length;
      try { const box = []; const realNote = note; window.note = (t, cls) => box.push(t);
        settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); window.note = realNote; out.n++;
        if (!box.some(t => /\S/.test(t || ''))) out.bad.push(k + ': no text'); }
      catch(e) { window.note = window.note; out.bad.push(k + ': ' + e.message); } } }
  return out; });
ok(run.n >= 90 && !run.bad.length, `${run.n} scene costs paid without error, each with its text (${run.bad.slice(0, 6).join(' | ')})`);

ok(!errors.length, `no page errors (${errors.slice(0, 3).join(' | ')})`);
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
