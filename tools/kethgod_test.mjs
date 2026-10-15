// v6.4.1: Keth and the Semk god. With Keth walking with the squad he feels the god given to the land beyond the Sekala and the piece of
// it that gets away; can be asked about it before the raid; knows the god-ridden in the cut (and the Land's Teeth bites it twice as
// hard); speaks after the raid and at the pits; and kneels on the lake bed below Gelor Ridge when the ground finishes it. And a pass of
// lines in scenes where Ramin had one and Keth had none. Without Keth none of it shows.
// Usage: node tools/kethgod_test.mjs   (build first; exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const bad = /\bundefined\b|\bNaN\b|\[object |\$\{|\bnull\b/;

const r = await ev(src => { const bad = new RegExp(src); const out = {};
  const fresh = (ch, keth) => { setBook('dg'); S = newStateDG('Hask'); S.chapter = ch; S.lvl = 4; S.chain = {water:6, column:20}; migrate(S); if (keth) { S.squad.push('warlock'); S.f.b2_kethDone = 1; } save(); };
  const txt = (k, ch) => { const n = DLG[k](); return {t:typeof n.txt === 'function' ? n.txt() : n.txt, ch:(n.ch || []).filter(c => !c.req || c.req()).map(c => c.t), n}; };
  // Chapter 2: the night
  fresh(2, true); let n = txt('b2_night'); out.night = /A small piece, hiding in somebody/.test(n.t) && /palms flat/.test(n.t); n.n.fx(); out.piece = !!S.f.b2_kethPiece;
  out.end = /dreaming of a hunt/.test(txt('b2_end').t);
  fresh(2, false); out.nightNo = !/Keth/.test(txt('b2_night').t) && !/Foolish Dog boy/.test(txt('b2_end').t);
  // Chapter 3: before the raid, the cut, after, the pits, the Shallows
  fresh(3, true); S.f.b2_kethPiece = 1; let k3 = txt('b2_keth3'); out.ask = k3.ch.some(c => /Semk god/.test(c));
  const g = txt('b2_keth3g'); out.g = /does not know yet that it is dying/.test(g.t) && /Did you tell the Fist/.test(g.t) && g.ch.length === 2;
  S.f.b2_keth3god = 1; out.askGone = !txt('b2_keth3').ch.some(c => /Semk god/.test(c));
  out.cut = /That is the piece/.test(B2CH3.battles.b2_raid.stage2.text());
  S.f.b2_kethBitGod = 1; out.back = /Not for much longer/.test(txt('b2_raid_back').t) && /Wash them/.test(txt('b2_raid_back').t);
  out.pits = /It will not cross the river/.test(txt('b2_water').t);
  S.f.b2_baitHeld = 1; const sh = txt('b2_after_bait'); out.bait = /That is all of it now. Eat/.test(sh.t) && /makes us family/.test(sh.t); sh.n.fx(); out.fed = !!S.f.b2_kethFed;
  out.pull = /That is all of it now/.test(txt('b2_after_pull').t);
  out.extras = B2CH3.extras().some(x => /finished the Semk god/.test(x));
  const all = [];
  ['b2_keth3', 'b2_keth3g', 'b2_raid_back', 'b2_water', 'b2_after_bait', 'b2_after_pull', 'b2_east_gave', 'b2_raid_star', 'b2_tangle_go'].forEach(k => { try { all.push([k, txt(k).t]); } catch (e) { all.push([k, 'THREW ' + e.message]); } });
  fresh(3, false); out.noKeth3 = !/Keth/.test(txt('b2_water').t) && !/That is the piece/.test(B2CH3.battles.b2_raid.stage2.text());
  // later chapters: the pass
  fresh(4, true); all.push(['b2_envoys', txt('b2_envoys').t], ['b2_nethpara2', txt('b2_nethpara2').t]);
  fresh(5, true); all.push(['b2_shade', txt('b2_shade').t], ['b2_ration', txt('b2_ration').t], ['b2_key_column', txt('b2_key_column').t]);
  fresh(6, true); all.push(['b2_sdawn', txt('b2_sdawn').t]);
  out.pass = all.filter(([k, t]) => !/Keth|old woman/.test(t)).map(([k]) => k).join(',');
  out.badTxt = all.filter(([k, t]) => bad.test(t) || /^THREW/.test(t)).map(([k, t]) => k + ': ' + (t.match(bad) || [t])[0]).join('; ');
  return out; }, bad.source);
ok(r.night && r.piece, 'the night beyond the Sekala: Keth feels the god given to the land, and the piece that gets away');
ok(r.end, 'the day of rest: Keth asleep on the ground, dreaming of the hunt');
ok(r.nightNo, 'without Keth, none of it');
ok(r.ask && r.g && r.askGone, 'before the raid: "The Semk god. Is it dead?" (asked once; it remembers the Sekala)');
ok(r.cut, 'in the cut: "That is the piece."');
ok(r.back && r.pits, 'after the raid, and at the pits');
ok(r.bait && r.pull && r.fed && r.extras, 'below Gelor Ridge: Keth kneels while the ground finishes it, on either key; the chapter page says so');
ok(r.noKeth3, 'without Keth in Chapter 3, none of it');
ok(!r.pass, `a line for Keth in every scene of the pass${r.pass ? ': missing in ' + r.pass : ''}`);
ok(!r.badTxt, `every line reads clean${r.badTxt ? ': ' + r.badTxt : ''}`);

// the Land's Teeth on what is left of the god: 2d8, and Keth has had a bite
const t = await ev(async () => { setBook('dg'); S = newStateDG('Hask'); S.chapter = 3; S.lvl = 4; S.chain = {water:6, column:20}; S.squad.push('warlock'); S.f.b2_kethDone = 1; migrate(S); save();
  startBattle('b2_raid', {}); const k = B.units.find(u => u.id === 'warlock'); B.units = B.units.filter(u => u.side === 'p'); const g = mkFoe('b2_godrider', 3, 3); g.ac = -50; g.hp = g.maxhp = 500; B.units.push(g); k.x = 3; k.y = 6; B.cur = k;
  let seen = null; const _a = attack; attack = function(a, t, o){ if (t === g) seen = o.dmg[0]; return _a(a, t, o); };
  await AB.b2_teeth.run(k, 3, 3); attack = _a; const o = {dice:seen, bit:!!S.f.b2_kethBitGod, log:B.log.some(l => /The ground knows this one/.test(l))}; B = null; return o; });
ok(t.dice === 2 && t.bit && t.log, `the Land's Teeth on the god-ridden: ${t.dice}d8, the ground knows the taste`);
ok(!errors.length, `no page errors${errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''}`);
await br.close(); srv.kill(); process.exit(fail);
