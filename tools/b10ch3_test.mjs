// Book Ten, Chapter 3 (Night Marches, src/183_b10_ch3.js): the wear at the chapter's start (−1), the halts (the first lie-up, the night
// march, the second lie-up), both keys from the same moment at the water wagon when the oxen go down, the reading at the first halt (the
// Deck; B10READ[3]; the card node the visions pass hooks onto), the circle (Witness shown, a rest that clears the thirst, a line each at
// both lie-ups, the roster, the beat at the second lie-up, Not now), every fight's start and a forced win (both grounds of the stragglers at
// the wagon; the traces, survive four), the trick behind its ✦ hard check (taught by Pruss, free, and its battle half), the items (each with
// art), the Witness moves (the dead city's "yes, but" −1; 'haul' +1 when the wagon comes through, once; 'cut' −1; the beat ±1), the thirst
// on 'haul' (and waived by b10_c1_water), "Not now" on every onward step and a "yes, but" on every check, both roads ('adjunct' and
// 'south'), from a fresh --from=3 style start and from a transfer's squad (Marrow dead; Sathi, Mehet and Ottar walking; Pruss waiting).
// Usage: node tools/b10ch3_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const tt = c => typeof c.t === 'function' ? c.t() : c.t;
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(tt).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(tt(x)));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(tt).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tcg'); b10Use('t'); startExplore(area); };
  const npc = (area, id) => AREAS[area].npcs.find(n => n.id === id);
  const thirsty = () => Object.entries(S.injury || {}).filter(([, v]) => v === 'b10thirst').map(([k]) => k);
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark;
    res.onShard = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x]));
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2;
      res.onShard2 = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b10_c3_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Ammanas|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Hedge|Cuttle|Bottle|Ruthan|Gudd|Quick Ben|Kalam|Deadsmell|Masan|Gilani|Keneb|Blistig|Tavore|Paran|Krughava|Tanakalian|Stormy|Gesler|Abrastal|Brys|Errant|Forkrul|Crippled God|Nefarias|Icarias|Bavedict|Banaschar|Tarr\b|Shortnose|Imass|Che'Malle|Perish|Grey Helm|\bweeks?\b|\bmonths?\b|\btenday\b|\bdays? (?:ago|later)\b|\b(?:two|three|four|five|six|seven|eight|nine|ten)\s+nights\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    else if ((n.txt.replace(/"[^"]*"/g, '').match(/Bonehunters/g) || []).length) errs.push(k + ': the narrator says Bonehunters');
    (n.ch || []).forEach(c => { const t = tt(c); if (/undefined|NaN/.test(t) || never.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase, key and road */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), wit = new Set(), witCost = new Set();
    const keep = JSON.stringify(S.f);
    const FL = ['b10_c3_orders', 'b10_c3_counted', 'b10_c3_wagonDone', 'b10_c3_tracesDone', 'b10_c3_through', 'b10_c3_carried', 'b10_c3_cloak'];
    [1, 2, 3, 4].forEach(ph => ['haul', 'cut', null].forEach(k => ['adjunct', 'south'].forEach(rd => [...Array(1 << FL.length).keys()].forEach(fl => { S.f.b10_c3_ph = ph; S.f.b10_c3_key = k; S.f.b10_tRoad = rd;
      FL.forEach((f, i) => { S.f[f] = fl & (1 << i) ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (c.witness) wit.add(tt(c)); if (c.near && /b10Witness/.test(String(c.near.fx))) witCost.add(tt(c)); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); }))));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, wit:wit.size, witCost:witCost.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  /* a --from=3 style start: Chapter One's and Two's keys set, Pruss walking, the Third at level 25 */
  const fromThree = (extra) => { setBook('tcg'); S = newStateTCG('Fresh', 'Brann'); S.chapters = {1:'names', 2:'watch'}; S.f.b10_c1_key = 'names'; S.f.b10_c1_names = 1; S.f.b10_c2_key = 'watch'; S.f.b10_c2_watched = 1;
    S.f.b10_prussDone = 1; if (!S.squad.includes('pruss')) S.squad.push('pruss'); S.loy.pruss = 0; S.gear.pruss ??= {}; S.picks.pruss ??= []; S.f.b10_tirrenDone = 1;
    S.lvl = 25; S.xp = LEVELS[24]; S.picksDue = []; S.th.l.picksDue = []; if (extra) extra(); save(); startChapter(3); clearModal(); };
  try {
  /* ================= a --from=3 style start ('adjunct') ================= */
  fromThree();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, wit0:b10Wit(), wear:S.f.b10_wear3, road:b10TRoad(), renderErr:renderAll(), title:CHAPTERS[3].title, nodes:nodes.length, areas:CHAPTERS[3].areas.length, fights:Object.keys(CHAPTERS[3].battles).length,
    items:Object.keys(CHAPTERS[3].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[3].gear).length,
    knife:ITEMS.b10_c3_glassknife && ITEMS.b10_c3_glassknife.slot === 'weapon' && ITEMS.b10_c3_glassknife.role === 'blade' && ITEMS.b10_c3_glassknife.dmg[1] === 8,
    cloak:ITEMS.b10_c3_nightcloak && ITEMS.b10_c3_nightcloak.slot === 'armour' && ITEMS.b10_c3_nightcloak.role === 'light', strap:ITEMS.b10_c3_tracestrap && ITEMS.b10_c3_tracestrap.slot === 'trinket',
    ownArt:['b10_c3_glassknife', 'b10_c3_nightcloak', 'b10_c3_tracestrap'].every(k => /b103/.test(ART['item/' + k])), ground:typeof TILEX.b10_c3_ground === 'function' && /b103aGlassT/.test(String(TILEX.b10_c3_ground)),
    scenes:['b10_glass', 'b10_glass_night', 'b10_traces', 'b10_c3_city'].every(k => typeof SCENEX[k] === 'function' && SCENES[k] && /b103/.test(String(SCENEX[k]))),
    introScene:CHAPTERS[3].intro.scene, fireRoster:(ROSTER_FIRES.tcg[3] || []).includes('b10_c3_fire'), thirst:thirsty().length, audit:audit()};
  /* the start: the first lie-up, the reading among the first halt's choices */
  talk('b10_c3_start'); out.f.ph = S.f.b10_c3_ph; out.f.deck = has('b10_c3_start', /Sit with Marrow/); out.f.cloaks = /cloaks/.test(DLG.b10_c3_start().txt) && DLG.b10_c3_start().scene === 'b10_glass';
  talk('b10_c3_read'); const rd = DLG.b10_c3_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b10_c3_drawn, reader:S.f.b10_c3_reader, inPool:B10POOL[3].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B10READ[3].back, cardNode:cardNodeName(), cardSp:DLG.b10_c3_card().sp, cardBack:DLG.b10_c3_card().ch[0].go,
    again:!has('b10_c3_fire', /Sit with/), set:/stars going out/.test(rd.txt), where:/glass under the stars/.test(DLG.b10_c3_card().txt)};
  /* Thallo: the day watch */
  out.th = {npc:npc('b10_c3_lieup', 'thallo').show() && !npc('b10_c3_lieup', 'master').show(), strag0:!npc('b10_c3_lieup', 'strag').show()};
  talk('b10_c3_thallo'); out.th.orders = S.f.b10_c3_orders; out.th.notNow = has('b10_c3_thallo', /Not now/); out.th.eating = /eating again/.test(DLG.b10_c3_thallo().txt);
  /* the count at the tailboard */
  talk('b10_c3_wagon'); out.c = {notNow:has('b10_c3_wagon', /Not now/)};
  { const sn = JSON.stringify(S); near('b10_c3_wagon', /measure every skin/, 'haddat'); out.c.near = !!(S.rattled || {}).haddat; restore(sn, 'b10_c3_lieup'); }
  made('b10_c3_wagon', /measure every skin/, 'tangle'); out.c.counted = S.f.b10_c3_counted; out.c.strag = npc('b10_c3_lieup', 'strag').show();
  /* the trick at the picket: Into the Traces, Pruss teaching */
  talk('b10_c3_oxen'); const dc = vis('b10_c3_oxen').find(c => c.trick);
  out.t = {dc:dc && dc.check[1], stat:dc && dc.check[0], noNear:dc && !dc.near, notNow:has('b10_c3_oxen', /Not now/), pruss:(edgesFor(dc, 'pruss').find(e => /carter/.test(e[0])) || [])[1] || 0, sgt:(edgesFor(dc, 'sgt').find(e => /Fourteenth/.test(e[0])) || [])[1] || 0, teacher:/Pruss is between them/.test(DLG.b10_c3_oxen().txt)};
  made('b10_c3_oxen', /lean into a strap/, 'pruss');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b10_c3_harness && S.tricks.b10_c3_harness.who, ok:S.f.b10_c3_harnessOk, strap:S.kit.filter(k => k === 'b10_c3_tracestrap').length, free:!!AB.t_b10_c3_harness.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b10_c3_harness.fx), again:!has('b10_c3_oxen', /lean into a strap/)});
  /* the old marine and the west edge */
  talk('b10_c3_oldmarine'); out.old = S.f.b10_c3_old === 1 && !has('b10_c3_oldmarine', /Sit with/); talk('b10_c3_west'); out.west = /heavies' captain/.test(DLG.b10_c3_west().txt);
  /* the fire before the stragglers: no dusk yet */
  talk('b10_c3_fire'); const f1 = DLG.b10_c3_fire(); out.fire1 = {html:/Witness/.test(f1.html || ''), talk:has('b10_c3_fire', /Talk with the squad/), rest:has('b10_c3_fire', /Let the squad rest/), duskShut:!has('b10_c3_fire', /Dusk/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1])), noFire:/no fire|circle/.test(f1.txt)};
  out.fire1.lines = DLG.b10_c3_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {haddat:4}; take('b10_c3_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b10_c3_rest1 === 1;
  /* the stragglers at noon: the approaches (a "yes, but" each; the call carries Witness), the call made drops one, both grounds */
  talk('b10_c3_strag'); out.s = {notNow:has('b10_c3_strag', /Not now/), straight:has('b10_c3_strag', /Between them and the wagon/), edgeTo:DLG.b10_c3_edge().sp === DLG.b10_c3_strag().sp};
  { const sn = JSON.stringify(S); near('b10_c3_strag', /along the cloaks/, 'tangle'); out.s.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c3_lieup'); }
  { const cc = vis('b10_c3_strag').find(c => c.witness); out.s.callWit = !!cc && (edgesFor(cc, 'sgt').find(e => e[0] === 'Witness') || [null, 'none'])[1] === 'none';
    const sn = JSON.stringify(S); near('b10_c3_strag', /Call to them/, 'haddat'); out.s.callNear = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b10_c3_lieup'); }
  made('b10_c3_strag', /Call to them/, 'haddat'); out.s.called = S.f.b10_c3_called; out.s.callText = /Bonehunters/.test(DLG.b10_c3_call_ok().txt);
  startBattle('b10_c3_wagon', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'pruss'), o = B.units.find(x => x.id === 'haddat'), ux = u.x, uy = u.y, ox = o.x, oy = o.y; out.t.offered = trickOk(u, AB.t_b10_c3_harness) && AB.t_b10_c3_harness.tiles(u).includes(o); AB.t_b10_c3_harness.run(u, o.x, o.y); out.t.swapped = u.x === ox && u.y === oy && o.x === ux && o.y === uy; }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b10_c3_lieup');
  const xp0 = S.xp; out.s.fight = await force('b10_c3_wagon', {drop:[3]}); out.s.done = S.f.b10_c3_wagonDone; out.s.knife = S.kit.includes('b10_c3_glassknife'); out.s.stragGone = !npc('b10_c3_lieup', 'strag').show();
  out.s.lvl = S.lvl; out.s.xp = S.xp - xp0; out.s.afterText = /stay down|staying there/.test(DLG.b10_c3_wagon_after().txt) && !/\bdead\b|\bkill/.test(DLG.b10_c3_wagon_after().txt);
  /* dusk: the night march */
  talk('b10_c3_fire'); out.n = {dusk:has('b10_c3_fire', /Dusk\. Up, and on/), duskNot:has('b10_c3_fire', /Not now/)}; take('b10_c3_fire', /Dusk\. Up, and on/);
  out.n = Object.assign(out.n, {area:S.area, ph:S.f.b10_c3_ph, arrive:S.node === 'b10_c3_dusk', twoSkies:/stars come out again|same stars/.test(DLG.b10_c3_dusk().txt), dark:!!AREAS.b10_c3_march.dark, noCircle:/no circle/.test(DLG.b10_c3_fire().txt)});
  /* the dead city far off: the chapter's one Witness "yes, but" */
  talk('b10_c3_city'); out.y = {scene:DLG.b10_c3_city().scene === 'b10_c3_city', far:/too straight to be ground/.test(DLG.b10_c3_city().txt), back:has('b10_c3_city', /Back to the column/)};
  { const sn = JSON.stringify(S), w0 = b10Wit(); near('b10_c3_city', /Look until/, 'tebbet'); out.y.near = b10Wit() - w0; restore(sn, 'b10_c3_march'); }
  made('b10_c3_city', /Look until/, 'haddat'); out.y.seen = S.f.b10_c3_city === 1 && /Walls/.test(DLG.b10_c3_city_ok().txt);
  /* the rearguard: the one line of the Letherii */
  talk('b10_c3_rear'); out.u = {rear:S.f.b10_c3_rear === 1, line:/rise at dusk/.test(DLG.b10_c3_rear().txt) && /Letherii/.test(DLG.b10_c3_rear().txt)};
  /* the key at the water wagon */
  talk('b10_c3_wagonn'); const kn = DLG.b10_c3_wagonn();
  out.k = {haul:has('b10_c3_wagonn', /We take the traces/), cut:has('b10_c3_wagonn', /Cut it loose/), notYet:has('b10_c3_wagonn', /Not yet/), html:/Witness/.test(kn.html || ''), pruss:/Pruss/.test(kn.txt), thallo:/Thallo/.test(kn.txt), npc:npc('b10_c3_march', 'thallo').show()};
  const snapK = JSON.stringify(S), witK = b10Wit(), loyK = {pruss:S.loy.pruss, tangle:S.loy.tangle};
  /* ================= key: haul ================= */
  take('b10_c3_wagonn', /We take the traces/); out.a = {key:S.f.b10_c3_key, hauled:S.f.b10_c3_hauled, ph:S.f.b10_c3_ph, pruss:S.loy.pruss - loyK.pruss, tangle:S.loy.tangle - loyK.tangle, wit0:b10Wit() - witK, thallo:/Thallo takes the near strap beside Pruss/.test(DLG.b10_c3_key_haul().txt), notNow:has('b10_c3_key_haul', /Not now/)};
  take('b10_c3_key_haul', /Lean into it/); out.a.tracesNot = has('b10_c3_traces', /Not now/); out.a.east0 = !has('b10_c3_east', /Grey light/);
  { const sn = JSON.stringify(S); near('b10_c3_traces', /wait for them in the dark/, 'tangle'); out.a.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c3_march'); }
  out.a.surv = BATTLES.b10_c3_traces.objective && BATTLES.b10_c3_traces.objective.type === 'survive' && BATTLES.b10_c3_traces.objective.rounds === 4;
  const thPick = b10ThirstPick(); out.a.fight = await force('b10_c3_traces'); out.a.done = S.f.b10_c3_tracesDone; out.a.thirst = S.f.b10_c3_thirst; out.a.thirsty = thirsty(); out.a.pick = thPick;
  out.a.thirstText = new RegExp(NAME(thPick)).test(DLG.b10_c3_traces_after().txt); out.a.strapOnce = S.kit.filter(k => k === 'b10_c3_tracestrap').length;
  out.a.shelfNot = has('b10_c3_shelf', /Not now/); out.a.wagonnShelf = DLG.b10_c3_wagonn().sp === 'The shelf';
  { const sn = JSON.stringify(S); near('b10_c3_shelf', /lift it over/, 'haddat'); out.a.shelfNear = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b10_c3_march'); }
  const wS = b10Wit(); made('b10_c3_shelf', /lift it over/, 'pruss'); out.a.through = S.f.b10_c3_through; out.a.wit1 = b10Wit() - wS; talk('b10_c3_shelf_ok'); out.a.once = b10Wit() - wS;
  talk('b10_c3_east'); out.a.eastNot = has('b10_c3_east', /Not now/); take('b10_c3_east', /Grey light/);
  out.a.grey = {area:S.area, ph:S.f.b10_c3_ph, node:S.node, wagon:/wagon stands in the middle/.test(DLG.b10_c3_grey().txt), thirstLine:/cracked lips/.test(DLG.b10_c3_grey().txt)};
  talk('b10_c3_thallo2'); out.a.cloak = S.kit.includes('b10_c3_nightcloak') && S.f.b10_c3_cloak === 1;
  talk('b10_c3_wagon2'); out.a.wagon2 = /tailboard/.test(DLG.b10_c3_wagon2().txt);
  talk('b10_c3_dust'); { const sn = JSON.stringify(S); near('b10_c3_dust', /Shade your eyes/, 'tangle'); out.a.dustNear = !!(S.rattled || {}).tangle; restore(sn, 'b10_c3_lieup2'); }
  made('b10_c3_dust', /Shade your eyes/, 'tebbet'); out.a.dust = S.f.b10_c3_dust === 1 && /Riders/.test(DLG.b10_c3_dust_ok().txt) && !/Perish|grey knights' commander/.test(DLG.b10_c3_dust_ok().txt);
  /* the circle at the second lie-up: the rest clears the thirst; the beat */
  talk('b10_c3_fire'); out.a.beatOffered = has('b10_c3_fire', /What are we marching for/); out.a.onward = has('b10_c3_fire', /Dusk again/); out.a.fireNot = has('b10_c3_fire', /Not now/);
  out.a.lines2 = DLG.b10_c3_fire_talk().txt.split('\n\n').length;
  take('b10_c3_fire', /Let the squad rest/); out.a.thirstCleared = thirsty().length === 0;
  take('b10_c3_fire', /What are we marching for/); out.a.beat = {notNow:has('b10_c3_beat', /Not now/), n:vis('b10_c3_beat').length, html:/Witness/.test(DLG.b10_c3_beat().html || '')};
  { const sn = JSON.stringify(S); take('b10_c3_beat', /Not now/); out.a.beat.nothing = !b10BeatOf(3); restore(sn, 'b10_c3_lieup2'); }
  const wB = b10Wit(); take('b10_c3_beat', /Each other/); out.a.beat.rec = b10BeatOf(3); out.a.beat.wit = b10Wit() - wB; out.a.beat.gone = !has('b10_c3_fire', /What are we marching for/);
  talk('b10_c3_dusk2'); out.a.dusk2Not = has('b10_c3_dusk2', /Not now/);
  take('b10_c3_fire', /Dusk again/); out.a.notYet = has('b10_c3_onward', /Not yet/); out.a.glass = DLG.b10_c3_onward().scene === 'b10_glass_night' && /traces/.test(DLG.b10_c3_onward().txt);
  const witA = b10Wit(); take('b10_c3_onward', /East, into the glass/); await wait(60);
  out.a.end = {view, ch:S.chapters[3], lvl:S.lvl, xp:S.xp, wit:witA, extras:CHAPTERS[3].extras().length, journal:CHAPTERS[3].journal().length, endText:(CHEND[3] || {}).haul && CHEND[3].haul[0], endScene:CHAPTERS[3].endScene};
  /* ================= key: cut, from the same moment ================= */
  restore(snapK, 'b10_c3_march'); S.chapter = 3;
  take('b10_c3_wagonn', /Cut it loose/); out.q = {key:S.f.b10_c3_key, hauled:S.f.b10_c3_hauled == null, ph:S.f.b10_c3_ph, tangle:S.loy.tangle - loyK.tangle, pruss:S.loy.pruss - loyK.pruss, wit:b10Wit() - witK, notNow:has('b10_c3_key_cut', /Not now/)};
  take('b10_c3_key_cut', /Fill every skin/); out.q.cutNot = has('b10_c3_cutloose', /Not now/);
  { const sn = JSON.stringify(S); near('b10_c3_cutloose', /Shoulder it all/, 'tangle'); out.q.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c3_march'); }
  made('b10_c3_cutloose', /Shoulder it all/, 'pruss'); out.q.carried = S.f.b10_c3_carried; out.q.thirst = thirsty().length === 0 && !S.f.b10_c3_thirst; out.q.noTraces = S.f.b10_c3_tracesDone == null;
  out.q.wagonn = /getting smaller/.test(DLG.b10_c3_wagonn().txt);
  take('b10_c3_east', /Grey light/); out.q.grey = /half full/.test(DLG.b10_c3_grey().txt); out.q.wagon2 = DLG.b10_c3_wagon2().sp === 'The skins';
  const wQ = b10Wit(); take('b10_c3_fire', /What are we marching for/); take('b10_c3_beat', /column's walking/); out.q.beat = b10BeatOf(3); out.q.beatWit = b10Wit() - wQ;
  take('b10_c3_fire', /Dusk again/); const witQ = b10Wit(); take('b10_c3_onward', /East, into the glass/); await wait(60);
  out.q.end = {view, ch:S.chapters[3], wit:witQ, endText:CHEND[3].cut[0], extras:CHAPTERS[3].extras().some(x => /cut the wagon loose/.test(x))};
  /* ================= haul with the wells' water from Chapter One: the thirst waived ================= */
  restore(snapK, 'b10_c3_march'); S.chapter = 3; S.f.b10_c1_key = 'water'; S.f.b10_c1_water = 1; delete S.f.b10_c1_names;
  take('b10_c3_wagonn', /We take the traces/); take('b10_c3_key_haul', /Lean into it/); out.v = {fight:await force('b10_c3_traces')}; out.v.thirst = S.f.b10_c3_thirst; out.v.none = thirsty().length === 0; out.v.text = /sappers' wells/.test(DLG.b10_c3_traces_after().txt);
  /* ================= the 'south' road ================= */
  fromThree(() => { S.f.b10_tRoad = 'south'; });
  out.w = {renderErr:renderAll(), wit0:b10Wit(), introScene:CHAPTERS[3].intro.scene, startScene:DLG.b10_c3_start().scene, master:npc('b10_c3_lieup', 'master').show() && !npc('b10_c3_lieup', 'thallo').show(), audit:audit()};
  talk('b10_c3_start'); talk('b10_c3_thallo'); out.w.boss = /wagon-master/.test(DLG.b10_c3_thallo().txt); talk('b10_c3_wagon'); made('b10_c3_wagon', /measure every skin/, 'tangle');
  out.w.carters = /carters/i.test(DLG.b10_c3_strag().txt) && /Bolkando/.test(DLG.b10_c3_strag().txt); out.w.fight = await force('b10_c3_wagon');
  take('b10_c3_fire', /Dusk\. Up, and on/); out.w.night = DLG.b10_c3_dusk().scene === 'b10_south_night' && /paleness/.test(DLG.b10_c3_dusk().txt);
  out.w.city = DLG.b10_c3_city().scene === 'b10_south_night' && /The glass\. The army is somewhere on it/.test(DLG.b10_c3_city().txt);
  talk('b10_c3_rear'); out.w.rear = /Three wagons back/.test(DLG.b10_c3_rear().txt);
  out.w.key = /wagon-master/.test(DLG.b10_c3_wagonn().txt) && /supply wagon/i.test(DLG.b10_c3_wagonn().txt);
  take('b10_c3_wagonn', /We take the traces/); out.w.tracesScene = DLG.b10_c3_key_haul().scene === 'b10_south_night'; take('b10_c3_key_haul', /Lean into it/); out.w.traces = await force('b10_c3_traces');
  made('b10_c3_shelf', /lift it over/, 'pruss'); take('b10_c3_east', /Grey light/); out.w.grey = DLG.b10_c3_grey().scene === 'b10_south';
  take('b10_c3_fire', /What are we marching for/); take('b10_c3_beat', /She knows/); take('b10_c3_fire', /Dusk again/); out.w.onward = /Letherii mule|borrowed/.test(DLG.b10_c3_onward().txt); out.w.endCap = /road south/.test(CHAPTERS[3].endCap()); out.w.endScene = CHAPTERS[3].endScene;
  take('b10_c3_onward', /South, the long way/); await wait(60); out.w.end = {view, ch:S.chapters[3]};
  /* ================= a transfer's Third (Marrow dead; Sathi, Mehet and Ottar walking; Pruss waiting at the baggage) ================= */
  setBook('tcg'); S = newStateTCG('Syn', 'Brann'); S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'mehet', 'ottar']; delete S.dead.sathi; S.dead.marrow = {ch:7, where:'the rearguard', from:'dod'};
  ['sathi', 'mehet', 'ottar'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.f.b10_prussDone = 2; S.camp = [...(S.camp || []), 'pruss']; S.loy.pruss = 0; S.gear.pruss ??= {}; S.picks.pruss ??= [];
  S.chapters = {1:'water', 2:'count'}; S.f.b10_c1_key = 'water'; S.f.b10_c1_water = 1; S.f.b10_c2_key = 'count'; S.f.b10_c2_counted = 1; S.lvl = 25; S.xp = LEVELS[24]; S.picksDue = []; save(); startChapter(3); clearModal();
  out.z = {renderErr:renderAll(), reader:b10Rd().id, lines:DLG.b10_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b10_c3_fire_talk().txt), noMarrow:!/Marrow/.test(DLG.b10_c3_fire_talk().txt), noPruss:!/Pruss/.test(DLG.b10_c3_fire_talk().txt) && !/Pruss/.test(DLG.b10_c3_start().txt),
    teacher:/Thallo comes over/.test(DLG.b10_c3_oxen().txt), rumour:/counted their water twice/.test(DLG.b10_c3_rear().txt), audit:audit()};
  S.f.b10_c3_ph = 4; out.z.lines2 = DLG.b10_c3_fire_talk().txt.split('\n\n').length;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, th = r.th || {}, c = r.c || {}, t = r.t || {}, f1 = r.fire1 || {}, s = r.s || {}, n = r.n || {}, y = r.y || {}, u = r.u || {}, k = r.k || {}, a = r.a || {}, q = r.q || {}, v = r.v || {}, w = r.w || {}, z = r.z || {};
if (f.area) {
  f.area === 'b10_c3_lieup' && f.ch === 3 && f.thread === 't' && f.lvl0 === 25 && f.wit0 === 4 && f.wear === 1 && f.road === 'adjunct' && !f.renderErr.length && f.title === 'Night Marches' && f.areas === 3 && f.fights === 2 && f.items && f.itemN === 3 && f.knife && f.cloak && f.strap && f.ownArt && f.ground && f.scenes && f.introScene === 'b10_glass_night' && f.fireRoster && f.thirst === 0
    ? ok(`a --from=3 style start opens Chapter Three at the first lie-up: the Third at level 25, Witness 5 less the wear (4), on 'adjunct'; every b10_c3 node renders, no never-name, no "!" in narration, no rounds or turns, no narrator's "Bonehunters" (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art and roles; the glass ground; four backdrops of its own`) : no('fresh ' + JSON.stringify(f).slice(0, 1600));
  const au = f.audit || {}; au.checks >= 7 && au.tricks === 1 && au.wit >= 1 && au.wit <= 2 && au.witCost >= 1 && au.witCost <= 2 && !au.noNear.length && au.onwards >= 4 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none; one Witness check and one "yes, but" that costs Witness, each worded by road); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.cloaks ? ok('the first halt: the lie-up under the cloaks at grey light, the reading offered') : no('start ' + JSON.stringify({ph:f.ph, deck:f.deck, cloaks:f.cloaks}));
}
rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.back === 'b10_c3_fire' && rd.cardNode === 'b10_c3_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b10_c3_fire' && rd.again && rd.set && rd.where ? ok('the reading: Marrow draws from B10POOL[3] on the glass under the stars, at grey light; the card node is the visions pass\'s hook (b10_c3_card); back to the circle; offered once') : no('reading ' + JSON.stringify(rd));
th.npc && th.strag0 && th.orders === 1 && th.notNow && th.eating ? ok('Thallo (eating again): the day watch on the company\'s water wagon; no stragglers before the watch and the count') : no('thallo ' + JSON.stringify(th));
c.notNow && c.near && c.counted === 'true' && c.strag ? ok('the count at the tailboard (a "yes, but": a mouthful spilled, rattled); then the shapes on the open ground') : no('count ' + JSON.stringify(c));
t.dc === 21 && t.stat === 'might' && t.noNear && t.notNow && t.pruss === 2 && t.sgt === 1 && t.teacher && t.who === 'pruss' && t.ok === 1 && t.strap === 1 && t.free && t.words && t.again && t.offered && t.swapped ? ok('the trick: Into the Traces, a ✦ might 21 check at the picket (Pruss teaches; a carter\'s son +2, the Fourteenth\'s wagons +1); free; in a fight two squadmates change places; the trace-strap') : no('trick ' + JSON.stringify(t));
r.old && r.west ? ok('the old marine; the column lying up west, the heavies\' captain looking at feet') : no('old/west ' + JSON.stringify({old:r.old, west:r.west}));
f1.html && f1.talk && f1.rest && f1.duskShut && f1.notNow && f1.noFire && f1.lines === f1.here && f1.rested ? ok(`the circle at the first lie-up (no fire): Witness shown, a rest, the talk (a line each, ${f1.lines}), no dusk before the stragglers, Not now`) : no('fire1 ' + JSON.stringify(f1));
s.notNow && s.straight && s.edgeTo && s.near && s.callWit && s.callNear && s.called === 'sat' && s.callText && s.fight && s.fight.started && s.fight.foes === 3 && s.fight.stage2 && s.fight.inStage2 && !s.fight.onShard && !s.fight.onShard2 && s.fight.after === 'b10_c3_wagon_after' && s.done === 1 && s.knife && s.stragGone && s.lvl >= 26 && s.afterText
  ? ok(`the stragglers at the wagon at noon: a "yes, but" on the cloaks; called by their company (a Witness check; one sits down, ${s.fight.foes} come on); both grounds, no foe on a shard; fought down, never killed in words; the glass knife; level ${s.lvl} (+${s.xp} xp)`) : no('stragglers ' + JSON.stringify(s));
n.dusk && n.duskNot && n.area === 'b10_c3_march' && n.ph === 2 && n.arrive && n.twoSkies && n.dark && n.noCircle ? ok('dusk: the night march, no lamps, the stars above and below') : no('dusk ' + JSON.stringify(n));
y.scene && y.far && y.back && y.near === -1 && y.seen ? ok('the dead city far off to the north (never named, never entered; its "yes, but" costs one Witness)') : no('city ' + JSON.stringify(y));
u.rear && u.line ? ok('the rearguard: the one line of the Letherii (Chapter Two\'s \'watch\', as rumour)') : no('rear ' + JSON.stringify(u));
k.haul && k.cut && k.notYet && k.html && k.pruss && k.thallo && k.npc ? ok('the key at the water wagon when the oxen go down: the traces or cut it loose, Not yet; Witness shown; Pruss and Thallo') : no('key ' + JSON.stringify(k));
a.key === 'haul' && a.hauled === 1 && a.ph === 3 && a.pruss === 1 && a.tangle === 0 && a.wit0 === 0 && a.thallo && a.notNow && a.tracesNot && a.east0 && a.near && a.surv && a.fight && a.fight.started && a.fight.dark && !a.fight.onShard && a.fight.after === 'b10_c3_traces_after' && a.done === 1 && a.thirst === a.pick && a.thirsty.includes(a.pick) && a.thirstText && a.strapOnce === 1 && a.shelfNot && a.wagonnShelf && a.shelfNear && a.through === 'over' && a.wit1 === 1 && a.once === 1
  ? ok(`key haul: Pruss +1, S.f.b10_c3_hauled, Thallo in the traces beside Pruss; the traces at night (survive four, ${a.fight.foes} foes, a "yes, but"); the thirst on ${a.pick}; the shelf (a "yes, but"); the wagon came through, Witness +1 once`) : no('haul ' + JSON.stringify(a).slice(0, 1400));
a.eastNot && a.grey && a.grey.area === 'b10_c3_lieup2' && a.grey.ph === 4 && a.grey.wagon && a.grey.thirstLine && a.cloak && a.wagon2 && a.dustNear && a.dust && a.beatOffered && a.onward && a.fireNot && a.lines2 === f1.here && a.thirstCleared && a.beat && a.beat.notNow && a.beat.nothing && a.beat.n === 4 && a.beat.html && a.beat.rec === 'kept' && a.beat.wit === 1 && a.beat.gone && a.dusk2Not && a.notYet && a.glass && a.end && a.end.view === 'end' && a.end.ch === 'haul' && a.end.lvl >= 26 && a.end.extras >= 4 && a.end.journal >= 6 && a.end.endText === 'The wagon came through' && a.end.endScene === 'b10_glass'
  ? ok(`the second lie-up: the wagon, Thallo's cloak, the dust far off (a "yes, but"); the circle (a rest clears the thirst); the beat ("What are we marching for?": three answers and Not now); kept +1; the end on haul: level ${a.end.lvl} (${a.end.xp} xp), Witness ${a.end.wit}`) : no('haul end ' + JSON.stringify(a).slice(0, 1400));
q.key === 'cut' && q.hauled && q.ph === 3 && q.tangle === 1 && q.pruss === 0 && q.wit === -1 && q.notNow && q.cutNot && q.near && q.carried === 'all' && q.thirst && q.noTraces && q.wagonn && q.grey && q.wagon2 && q.beat === 'doubt' && q.beatWit === -1 && q.end && q.end.view === 'end' && q.end.ch === 'cut' && q.end.endText === 'Left in the glass' && q.end.extras
  ? ok(`key cut, from the same moment: Tangle +1, Witness −1 ('left it in the glass'); every skin carried (a "yes, but"); no traces, no thirst; the beat doubted −1; the end on cut, Witness ${q.end.wit}`) : no('cut ' + JSON.stringify(q).slice(0, 1200));
v.fight && v.fight.after === 'b10_c3_traces_after' && v.thirst === 'waived' && v.none && v.text ? ok('haul after Chapter One\'s wells (b10_c1_water): the thirst waived, the skins from the wells go round') : no('waived ' + JSON.stringify(v));
w.renderErr && !w.renderErr.length && w.introScene === 'b10_south_night' && w.startScene === 'b10_south' && w.master && w.audit && !w.audit.noNear.length && !w.audit.noStay.length && w.boss && w.carters && w.fight && w.fight.after === 'b10_c3_wagon_after' && w.night && w.city && w.rear && w.key && w.tracesScene && w.traces && w.traces.after === 'b10_c3_traces_after' && w.grey && w.onward && w.endCap && w.endScene === 'b10_south' && w.end && w.end.view === 'end' && w.end.ch === 'haul'
  ? ok('the \'south\' road: the Twelfth\'s wagon-master for Thallo; Bolkando and Letherii carters gone thirsty; the glass a paleness to the north; the Sixth three wagons back; a supply wagon with a broken team; the road\'s backdrops; the end') : no('south ' + JSON.stringify(w).slice(0, 1400));
z.renderErr && !z.renderErr.length && z.reader === 'oldninth' && z.lines === z.here && z.lines2 === z.here && z.sathi && z.noMarrow && z.noPruss && z.teacher && z.rumour && !z.audit.noNear.length && !z.audit.noStay.length
  ? ok(`a transfer's Third (Marrow dead; Sathi, Mehet and Ottar walking; Pruss at the baggage): every node renders, the old marine reads, a line each in the circle (${z.lines}); Thallo teaches the traces; the Letherii's 'count' as rumour`) : no('transfer ' + JSON.stringify(z).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b10ch3: FAIL (${bad.length})` : 'b10ch3: all ok'); process.exit(bad.length ? 1 : 0);
