// v6.4.1: haggling on the Chain. Every water-trader in Book Two (the camp follower at the Sekala, the Kanese tinker, the noble's man,
// the Trygalle shareholder, the Khundryl horse-trader) can be haggled with, in their own voice, at their own stall; and once a haggle
// the squad can say "We're guarding your life": two skins off and the bottom with them for the people who walk in the column, a long
// shot with the Trygalle (the Guild guards the Guild; it costs nothing), and a joke to a Khundryl (who likes the nerve).
// Usage: node tools/haggle_test.mjs   (build first; exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const bad = /\bundefined\b|\bNaN\b|\[object |\$\{|\{him\}|\{his\}/;
const TRADERS = [['b2_follower2', 2, {b2_blown:1}], ['b2_tinker3', 3, {}], ['b2_servant4', 4, {}], ['b2_trader5', 5, {}], ['b2_ktrader6', 6, {}]];
const fresh = (ch, f) => ev(([ch, f]) => { setBook('dg'); S = newStateDG('Hask'); S.chapter = ch; S.lvl = 4; S.chain = {water:12, column:20}; migrate(S); Object.assign(S.f, f); save(); }, [ch, f]);

for (const [node, ch, f] of TRADERS) {
  await fresh(ch, f);
  const r = await ev(([node, src]) => { const bad = new RegExp(src); talk(node); const h = curCh.filter(c => /^Haggle for/.test(c.t)); if (!h.length) return {n:0};
    choose(h[0]); const g = MG.state, panel = () => $('#mgPanel').innerText; const o = {n:h.length, open:panel(), guardBtn:!!$('#hgGuard'), p0:g.price, f0:g.floor};
    const R0 = Math.random; Math.random = () => 0.01; $('#hgGuard').click(); Math.random = R0; o.p1 = g.price; o.f1 = g.floor; o.after = panel(); o.guardGone = !$('#hgGuard');
    o.helpers = [...document.querySelectorAll('#mgPanel [data-help]')].map(b => b.innerText).join('|');
    const hb = document.querySelector('#mgPanel [data-help]'); if (hb) { hb.click(); o.help = panel(); }
    o.water0 = S.chain.water; $('#hgPay').click(); o.paid = S.chain.water === o.water0 - o.p1; o.done = panel(); $('#hgDone').click();
    o.again = curCh.filter(c => /^Haggle for/.test(c.t)).length === h.length - 1;
    o.bad = [o.open, o.after, o.help || '', o.done, o.helpers].filter(t => bad.test(t)).map(t => (t.match(bad) || [''])[0]).join(','); return o; }, [node, bad.source]);
  ok(r.n > 0 && r.guardBtn, `${node}: every ware can be haggled for, and the squad can say who guards whom`);
  ok(r.f1 === Math.max(1, r.f0 - 1) && r.p1 === Math.max(r.f1, r.p0 - 2) && r.p1 < r.p0 && r.guardGone, `${node}: when it lands, two off and the bottom with it (never below a skin), once (${r.p0} → ${r.p1})`);
  ok(r.paid && r.again && !r.bad, `${node}: paid at the haggled price, one haggle a piece, every line reads clean${r.bad ? ': ' + r.bad : ''}`);
}

// when it does not land: the column's people lose patience; the Guild costs nothing; the Khundryl likes the nerve
const miss = await ev(() => { const out = {};
  for (const [node, ch, f] of [['b2_tinker3', 3, {}], ['b2_trader5', 5, {}], ['b2_ktrader6', 6, {}]]) {
    setBook('dg'); S = newStateDG('Hask'); S.chapter = ch; S.lvl = 4; S.chain = {water:12, column:20}; migrate(S); Object.assign(S.f, f); save();
    talk(node); choose(curCh.find(c => /^Haggle for/.test(c.t))); const g = MG.state, p0 = g.pat, pr = g.price; const R0 = Math.random; Math.random = () => 0.99; $('#hgGuard').click(); Math.random = R0;
    out[node] = {d:g.pat - p0, same:g.price === pr, txt:$('#mgPanel').innerText.slice(0, 200)}; mgClose({}); }
  return out; });
ok(miss.b2_tinker3.d === -1 && miss.b2_tinker3.same, 'the tinker, unmoved: it costs a little patience');
ok(miss.b2_trader5.d === 0 && /The Guild guards the Guild/.test(miss.b2_trader5.txt), 'the Trygalle: "The Guild guards the Guild." It costs nothing');
ok(miss.b2_ktrader6.d === 1 && /four hundred leagues/.test(miss.b2_ktrader6.txt), 'the Khundryl laughs: he rode four hundred leagues to guard you, and likes the nerve');
ok(!errors.length, `no page errors${errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''}`);
await br.close(); srv.kill(); process.exit(fail);
