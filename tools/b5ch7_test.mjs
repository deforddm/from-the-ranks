// Book Five, Chapter 7 (The Seventh Closure, src/87_b5_ch7.js) and the end of Book Five: the night in the Drownings District (the first
// halt, the bell, Ennic's orders, the house's strongroom burning on Ch5 'sign' (a quarter of every debt, once) or the clerk in a doorway
// on 'refuse', the looters' fight and its docks, the rubble, your street); the footbridge at night (the barricade, the reading on the
// cracked flagstone, the brazier fire: rest, pay desk, a line each, the fallen named once with their heirs, the roster; the court's men
// on the canal threat: the receipt turns them away on Ch1 'pay', Thegg's face on 'swim', or the fight); the day (the walls, the wolves on
// the tiers and the footbridge with the pack's biggest, the word of the main bridge, the barricade fight and the Low Walk, the sorcery and
// the canal: a Might check, nobody dies, the lamp, the green ash into the water; the day of suffering decreed, never described); the
// evening (the canal children and the trick, the Holed Dock: taught, its check half answering 16's Pull in Lether's words, and its battle
// half; the rumours; Ennic; the clerk); the key three ways (emperor: the books stand; paid: every dock on the smallest first, the
// half-paid released; ledger: the dead roll, the debts to the heirs, the page torn out); the end screen and the book marked finished;
// the finale's pages for every squadmate, every recruit state (walking, waiting, sent away, never met) and the fallen (Tobet, dead at
// Brans Keep, his debt with his family); Deeds; and a --from=7 style save where every node renders in every phase.
// Usage: node tools/b5ch7_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const made = (id, re, who, tier = 'clean') => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); const pass = tier !== 'fail'; settleRoll({who, stat:c.check[0], tier, ok:tier !== 'near' && pass, pass, margin:pass ? 6 : -6, nat:pass ? 18 : 3}, c); shut(); const g = pass ? c.go : c.fail; if (typeof g === 'string') talk(g); else g(); return c; };
  const edge = (c, id) => (c.edges(id).filter(Boolean).reduce((a, e) => a + e[1], 0));
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.mortal = !!B.def.mortal; res.objective = !!B.def.objective; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.waves = (B.def.waves || []).length;
    res.foeIds = [...new Set((BATTLES[id].foes || []).map(f => f[0]).concat(...(BATTLES[id].waves || []).map(w => w.foes.map(f => f[0]))))].join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2;
      res.foes2 = [...new Set((BATTLES[id].stage2.foes || []).map(f => f[0]).concat(...(BATTLES[id].stage2.waves || []).map(w => w.foes.map(f => f[0]))))].join(','); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); talk(BATTLES[id].after); }
    res.after = S.node; res.dead = Object.keys(S.dead || {}).join(','); return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b5_c7_/.test(k));
  const NEVER = /Kettle|Green Jackets|crossbow|Rhulad|Mosag|Trull|Udinaas|Moroch|Soulan|Main Canal|Crippled|\bchaos\b|Brous|Tehol|Bugg|Seren|Iron Bars|Mayen|Azath|B'nagga|Patriot|Karos|Bivatt|Kravos|Errastas|Mael|Burn's Sleep|Malazan/;
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{|\bnull\b/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words'); else if (!n.ch.some(c => !c.req || c.req())) errs.push(k + ': no visible choice'); else if (NEVER.test(n.txt + n.ch.map(c => c.t).join(' '))) errs.push(k + ': a hard-limit word ' + NEVER.exec(n.txt + n.ch.map(c => c.t).join(' '))[0]); else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* the finale, page by page, as the player sees it */
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const finale = async () => { const P = finPages(), pages = [];
    for (let i = 0; i < P.length; i++) { showFinale(i); await wait(20); const el = document.getElementById('fin'); const t = (el ? el.innerText : '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
      pages.push({k:P[i].k, id:P[i].id || '', head:(document.querySelector('.fin-k') || {}).textContent || '', h3:(document.querySelector('.fin-h') || {}).textContent || '', len:t.length, leak:leak.test(t) || NEVER.test(t.replace(/The Malazan world/, '')), t}); }
    return pages; };
  /* a Chapter Seven state: earlier keys, the fallen of Brans Keep, the recruits' states */
  const mk = (o, name) => { setBook('mt'); S = newStateMT(name); S.lvl = 7; S.xp = LEVELS[6]; S.chapter = 6;
    S.chapters = {1:o.k1, 2:o.k2, 3:o.k3, 4:o.k4, 5:o.k5, 6:o.k6}; for (let i = 1; i <= 6; i++) S.f[`b5_c${i}_key`] = S.chapters[i]; S.f.b5_holder = o.k5 === 'sign' ? 'house' : 'army'; S.f.b5_trate = 1; S.f.b5_fentReach = 1; S.f.b5_trateFell = 1; S.f.b5_bounty = 1; S.f.b5_barrowSeen = 1; S.f.b5_c6_ennicHurt = 1; S.f.b5_c6_stitched = 'ammet';
    if (o.k1 === 'swim') S.f.b5_c1_swam = 1;
    (o.fall || []).forEach(id => kill(id)); S.f.b5_c6_fallen = (o.fall || []).slice(); if (o.k5 === 'sign' && o.fall && o.fall.length) S.f.b5_c6_heirsWritten = 'house';
    Object.entries(o.rec || {}).forEach(([id, v]) => { if (v === 1) { b5Join(id); shut(); } else if (v === 2) { S.f[B5_DONE[id]] = 2; b5DebtInit(id); S.camp = [...(S.camp || []), id]; S.loy[id] ??= 0; S.gear[id] ??= {}; S.picks[id] ??= []; } else if (v === 0) S.f[B5_DONE[id]] = 0; });
    (o.kit || []).forEach(id => { if (!S.kit.includes(id)) S.kit.push(id); }); if (o.silver != null) S.silver = o.silver;
    Object.entries(o.debt || {}).forEach(([id, v]) => { S.debt[id] = v; });
    S.picksDue = []; save(); startChapter(7); };
  const L = () => Object.fromEntries(['tobet', 'thegg', 'perrit', 'ammet', 'ruuk', 'brune', 'pessa'].map(k => [k, S.loy[k] ?? null]));
  const dLoy = (a, b) => Object.fromEntries(Object.keys(b).map(k => [k, (b[k] ?? 0) - (a[k] ?? 0)]));
  try {
  /* ================= A: pay / dead / warn / hold / sign / stand; Tobet fell at Brans Keep; Pessa and Brune walk, Ruuk waits ================= */
  mk({k1:'pay', k2:'dead', k3:'warn', k4:'hold', k5:'sign', k6:'stand', fall:['tobet'], rec:{pessa:1, brune:1, ruuk:2}, kit:['b5_c1_receipt', 'b5_c3_ash'], silver:30, debt:{ammet:400}}, 'Fresh');
  out.a = {area:S.area, ch:S.chapter, title:CHAPTERS[7].title, num:CHAPTERS[7].number, renderErr:renderAll(), roster:ROSTER_FIRES.mt[7].join(), reg:!!(BOOKSNAP.mt && BOOKSNAP.mt.ch[7]), keys:B5KEYS[7].join(), squad:S.squad.join(), camp:(S.camp || []).join(), nodes:nodes().length, intro:typeof CHAPTERS[7].intro.paras[2] === 'function' && /Tobet is in the barrow/.test(CHAPTERS[7].intro.paras[2]()), threat0:b5DrowningThreat()};
  talk('b5_c7_start'); const st = DLG.b5_c7_start(); out.a.start = {ph:S.f.b5_c7_ph, again:typeof st.again === 'function', bell:/any soldier, here/.test(st.txt), starlings:/starlings, tens of thousands/.test(st.txt), born:/two streets from where you were born/.test(st.txt), counters:has('b5_c7_start', /Counters' Quarter/)};
  /* the strongroom burns: a quarter of every debt, once */
  { const ids = b5Debtors(), d0 = Object.fromEntries(ids.map(id => [id, b5Debt(id)])); talk('b5_c7_counters'); const want = ids.map(id => Math.ceil(d0[id] / 4)).join(','), got = ids.map(id => d0[id] - b5Debt(id)).join(',');
    const d1 = b5Debt('thegg'); talk('b5_c7_counters'); talk('b5_c7_tobridge'); out.a.burn = {flag:S.f.b5_c7_burned, want, got, once:b5Debt('thegg') === d1, txt:/A quarter of every line the house holds/.test(DLG.b5_c7_counters().txt), ids:ids.join(), gone:!has('b5_c7_start', /Counters' Quarter/)}; }
  talk('b5_c7_ennic'); out.a.ennic = {orders:S.f.b5_c7_orders, txt:/The footbridge over the Quillas Canal by the Low Walk/.test(DLG.b5_c7_ennic().txt), notNow:has('b5_c7_ennic', /Not now/)};
  talk('b5_c7_bell'); out.a.bell = /learned to swim off its steps/.test(DLG.b5_c7_bell().txt); talk('b5_c7_brazier'); out.a.brazier = {txt:/crowned Emperor/.test(DLG.b5_c7_brazier().txt) && /taking wagers/.test(DLG.b5_c7_brazier().txt), pessa:/I poled grain under every bridge/.test(DLG.b5_c7_brazier().txt)};
  talk('b5_c7_street'); out.a.street = /a notch|cut a tally/.test(DLG.b5_c7_street().txt);
  { const sv = S.silver; talk('b5_c7_shop'); out.a.shopCheck = vis('b5_c7_shop').find(c => /Talk them out/.test(c.t)).check.join(':'); out.a.loot = await force('b5_c7_looters'); out.a.loot.docks = S.silver - sv; out.a.loot.done = S.f.b5_c7_lootDone; }
  startExplore('b5_c7_streets');
  { const sv = S.silver; talk('b5_c7_rubble'); made('b5_c7_rubble', /carefully/, 'thegg'); out.a.rubble = S.silver - sv; }
  /* down to the footbridge */
  take('b5_c7_tobridge', /Down to the footbridge/); out.a.bridge = {area:S.area, node:S.node, ph:S.f.b5_c7_ph, threat:S.f.b5_c7_threat, tiles:has('b5_c7_bridge', /tiles/), notNow:has('b5_c7_bridge', /Not now/), court:AREAS.b5_c7_canal.npcs.find(n => n.id === 'court').show()};
  /* the reading on the cracked flagstone */
  talk('b5_c7_tiles'); const tk = DLG.b5_c7_tiles(); out.a.tilesNotNow = tk.ch.some(c => /Not now/.test(c.t)); runFx(tk.ch.find(c => /lay them/.test(c.t)));
  out.a.tiles = {drawn:S.f.b5_c7_drawn, reader:S.f.b5_c7_reader, card:S.card, inPool:B5POOL[7].includes(S.card), lean:B5POOL[7].filter(x => x === 'b5t_gate').length, say:/They can be in it/.test(tk.txt), table:!!READTABLE['mt:7'], scene:B5READ[7].scene};
  talk('b5_c7_card'); const cd = DLG.b5_c7_card(); out.a.card = {sp:cd.sp, back:cd.ch[0].go};
  /* the fire */
  talk('b5_c7_fire'); const fy = DLG.b5_c7_fire(); out.a.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b5_c7_fire', /rest/), pay:has('b5_c7_fire', /pay desk/), payPaid:has('b5_c7_fire', /paid road/), talk:has('b5_c7_fire', /Talk with the squad/), names:has('b5_c7_fire', /Say the names/), sleep:has('b5_c7_fire', /^Sleep/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:fy.ch.some(c => /roster|Who walks/i.test(c.t + (c.tag || ''))), brune:/Brune has gone down the steps/.test(fy.txt), pessa:/Pessa sits on a cart's shaft/.test(fy.txt)};
  take('b5_c7_fire', /Let the squad rest/); out.a.rested = S.f.b5_c7_rest;
  const ft = DLG.b5_c7_fire_talk(); out.a.talk = {lines:ft.txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length};
  talk('b5_c7_names'); const nm = DLG.b5_c7_names(); out.a.names = {flag:S.f.b5_c7_named, tobet:/\*Tobet\*\./.test(nm.txt), heir:/Tobet's [\d,]+ docks went to his family on the tenant farm/.test(nm.txt), notSquad:/not the squad's to pay/.test(nm.txt), gone:!has('b5_c7_fire', /Say the names/)};
  talk('b5_c7_pay'); const pd = DLG.b5_c7_pay(); out.a.desk = {html:/The squad/.test(pd.html || ''), notNow:/Not now/.test(pd.ch[pd.ch.length - 1].t), back:pd.ch[pd.ch.length - 1].go};
  /* the court's men: the receipt (Ch1 'pay') turns them away; the fight from a copy */
  const snapC = JSON.stringify(S);
  talk('b5_c7_courtmen'); const rc = vis('b5_c7_courtmen').find(c => /receipt/.test(c.t)); out.a.court = {check:rc.check.join(':'), sgt:edge(rc, 'sgt'), named:/Ammet, of the Sixth Company/.test(DLG.b5_c7_courtmen().txt), fight:has('b5_c7_courtmen', /Shields/), notNow:has('b5_c7_courtmen', /Not now/), noSwam:!has('b5_c7_courtmen', /Thegg/)};
  made('b5_c7_courtmen', /receipt/, 'sgt'); out.a.court.done = S.f.b5_c7_courtDone; out.a.court.gone = !AREAS.b5_c7_canal.npcs.find(n => n.id === 'court').show();
  { const sv = S; S = JSON.parse(snapC); save(); out.a.courtFight = await force('b5_c7_court'); out.a.courtFight.done = S.f.b5_c7_courtDone; S = sv; save(); startExplore('b5_c7_canal'); }
  /* the night, the morning, the wolves */
  take('b5_c7_fire', /^Sleep/); take('b5_c7_night', /Morning/); out.a.day = {area:S.area, node:S.node, ph:S.f.b5_c7_ph, walls:/citizens of Letheras go up on the white walls/.test(DLG.b5_c7_morning().txt), noSleep:!has('b5_c7_fire', /^Sleep/), notNow:has('b5_c7_morning', /Not now/)};
  talk('b5_c7_wager'); out.a.wager = /It's a small bridge/.test(DLG.b5_c7_wager().txt);
  talk('b5_c7_edur'); out.a.edurEarly = !has('b5_c7_edur', /Shields/);
  talk('b5_c7_tiers'); out.a.tiersCheck = vis('b5_c7_tiers').find(c => /Low Walk under the tiers/.test(c.t)).check.join(':');
  { const sv = S.silver; out.a.wolves = await force('b5_c7_wolves'); out.a.wolves.docks = S.silver - sv; out.a.wolves.done = S.f.b5_c7_wolvesDone; const wa = DLG.b5_c7_wolves_after().txt; out.a.wolves.word = S.f.b5_c7_word === 1 && /A Finadd held the main bridge/.test(wa) && /the Emperor got up/.test(wa) && /Nobody along the canal saw it/.test(wa); out.a.wolves.settle = /Settle Lake/.test(wa) && /Nobody knows what it was/.test(wa); }
  /* the barricade, the sorcery, the canal */
  take('b5_c7_wolves_after', /To the barricade/); out.a.brace = vis('b5_c7_edur').find(c => /Brace the carts/.test(c.t)).check.join(':');
  out.a.bar = await force('b5_c7_barricade'); out.a.bar.done = S.f.b5_c7_barricadeDone; out.a.bar.lamps = /The lamps along the street are going out/.test(DLG.b5_c7_barricade_after().txt);
  take('b5_c7_barricade_after', /The canal/); const cc = vis('b5_c7_sorcery').find(c => /ledge/.test(c.t));
  out.a.canal = {node:S.node, check:cc.check.join(':'), edges:['sgt', 'thegg', 'brune', 'pessa', 'perrit'].map(id => edge(cc, id)).join(','), brune:/Brune goes in like a seal/.test(DLG.b5_c7_sorcery().txt), first:/You go first/.test(DLG.b5_c7_sorcery().txt)};
  { const kit0 = S.kit.includes('b5_c3_ash'); made('b5_c7_sorcery', /ledge/, 'brune'); const un = DLG.b5_c7_under().txt;
    out.a.under = {node:S.node, canal:S.f.b5_c7_canal, stopped:S.f.b5_c7_stopped, lamp:S.kit.includes('b5_c7_lamp') && ITEMS.b5_c7_lamp.hp === 3, ashWas:kit0, ashGone:!S.kit.includes('b5_c7_ash') && !S.kit.includes('b5_c3_ash'), ashTxt:/faintly green/.test(un), decree:/day of suffering/.test(un) && /The voice does not say what that means/.test(un), dead:Object.keys(S.dead).join(), onward:vis('b5_c7_under').length === 1}; }
  /* the evening */
  take('b5_c7_under', /Evening/); out.a.eve = {area:S.area, node:S.node, ph:S.f.b5_c7_ph, patrol:/an Edur patrol is going from door to door/.test(DLG.b5_c7_evening().txt)};
  talk('b5_c7_news'); const nw = DLG.b5_c7_news().txt; out.a.news = /Eberict's dead/.test(nw) && /King's Champion is dead/.test(nw) && /Chancellor's sworn/.test(nw);
  talk('b5_c7_ennic_eve'); out.a.ennicEve = /I will sign whatever you put in front of me/.test(DLG.b5_c7_ennic_eve().txt);
  talk('b5_c7_clerk_eve'); out.a.clerkEve = /Every road out is in here/.test(DLG.b5_c7_clerk_eve().txt);
  /* the trick: the Holed Dock, ✦ Guile 16 */
  talk('b5_c7_children'); const tc = vis('b5_c7_children').find(c => /Holed Dock/.test(c.t)); out.a.trickCheck = tc.check.join(':') + ':' + tc.trick; out.a.trickEdges = ['sgt', 'pessa', 'brune', 'tobet', 'perrit'].map(id => edge(tc, id)).join(',');
  made('b5_c7_children', /Holed Dock/, 'pessa'); out.a.trick = {who:S.tricks && S.tricks.b5_c7_dock && S.tricks.b5_c7_dock.who, ok:S.f.b5_c7_dockOk, dock:S.kit.includes('b5_c7_dock') && ITEMS.b5_c7_dock.stat.guile === 1, left:trickLeft('b5_c7_dock'), notSorcery:/Not sorcery/.test(TRICKS.b5_c7_dock.fx), pullMaps:trickLeft('pull') === trickLeft('b5_c7_dock')};
  /* its check half, in the DOM: a failed roll offers the dock (16's Pull), spends a charge, pushes the next check, and rolls again */
  { talk('b5_c7_children'); const c = {t:'test', check:['wits', 30]}; const r0 = check('wits', 30, 'sgt', c); const rr = Object.assign({}, r0, {nat:3, tot:3 + r0.mod, ok:false, tier:'fail', pass:false, margin:-20});
    let fin = null; const l0 = trickLeft('b5_c7_dock'); rollDice(rr, f => { fin = f; }); const dl = performance.now() + 4000; while (!document.getElementById('dPull') && performance.now() < dl) await wait(40);
    const pb = document.getElementById('dPull'); await wait(30); out.a.pull = {btn:!!pb, words:pb && pb.textContent, notOponn:pb && !/Lady|coin/.test(pb.textContent)};
    if (pb) { pb.click(); await wait(20); out.a.pull.left = l0 - trickLeft('b5_c7_dock'); out.a.pull.push = S.push === 1; out.a.pull.alias = !(S.tricks && S.tricks.pull); out.a.pull.note = notes.some(n => /spins the holed dock on its edge/.test(n.t)) && !notes.some(n => /The Lady pulls/.test(n.t));
      const dl2 = performance.now() + 5000; while (!fin && performance.now() < dl2) { const d = document.getElementById('dice'); if (d) d.click(); await wait(60); } out.a.pull.done = !!fin; } S.push = 0; }
  /* the trick's battle half: the attack rolls twice */
  { startBattle('b5_c7_wolves', {}); await wait(60); const u = B.units.find(x => x.side === 'p' && x.id === 'pessa'); out.a.tb = {offered:typeof trickOk === 'function' && trickOk(u, AB.t_b5_c7_dock), free:AB.t_b5_c7_dock.free === true}; AB.t_b5_c7_dock.run(u); out.a.tb.lucky = u.luckyTurn === B.turn; B = null; S.push = 0; startExplore('b5_c7_walk'); }
  /* the roads: the key node, then each road from the same moment */
  talk('b5_c7_roads'); const rd = DLG.b5_c7_roads(); out.a.roads = {three:['Emperor', 'discharge', 'dead roll'].every(w => rd.ch.some(c => c.t.includes(w))), notYet:has('b5_c7_roads', /Not yet/), html:/The squad/.test(rd.html || ''), brune:/This is the waiting/.test(rd.txt), pessa:/I'm not a soldier/.test(rd.txt), noTobet:!/Tobet/.test(rd.txt)};
  const snapK = JSON.stringify(S); out.roads = {};
  for (const [k, re] of [['emperor', /Emperor's army/], ['paid', /paid out/], ['ledger', /out of the ledger/]]) {
    S = JSON.parse(snapK); save(); startExplore('b5_c7_walk'); const d0 = Object.fromEntries(['sgt', 'thegg', 'perrit', 'ammet', 'brune', 'pessa', 'ruuk'].map(id => [id, b5Debt(id)])), s0 = S.silver, l0 = L();
    take('b5_c7_roads', re); const R = {key:S.f.b5_c7_key, node:S.node, loy:dLoy(l0, L()), silver:S.silver, s0};
    R.debts = Object.fromEntries(Object.keys(d0).map(id => [id, b5Debt(id)])); R.d0 = d0;
    if (k === 'paid') { R.spent = S.f.b5_c7_spent; R.released = (S.f.b5_c7_released || []).join(); R.txt = /smallest first/.test(DLG.b5_c7_paid().txt); }
    if (k === 'ledger') { R.listed = S.f.b5_c7_listed; R.page = S.kit.includes('b5_c7_ledgerpage'); R.txt = /Fell at the footbridge over the Quillas/.test(DLG.b5_c7_ledger().txt) && /the debts pass to the heirs/.test(DLG.b5_c7_ledger().txt); R.ruukDebt = b5Debt('ruuk'); }
    if (k === 'emperor') R.txt = /nothing in the paybook has changed/.test(DLG.b5_c7_emperor().txt);
    take(`b5_c7_${k}`, /The last of it/); R.lastNotYet = has('b5_c7_last', /Not yet/); take('b5_c7_last', /Go\./); await wait(40);
    R.end = {view, ch:S.chapters[7], epi:!!document.getElementById('bEpi'), done:bookDone(S), onward:b57Onward(S), extras:CHAPTERS[7].extras(), journal:CHAPTERS[7].journal().length};
    const pages = await finale(); R.pages = pages.length; R.kinds = pages.map(p => p.k + (p.id ? ':' + p.id : '')).join(' ');
    R.leaks = pages.filter(p => p.leak || p.len < 80).map(p => p.k + ':' + p.id);
    R.road = pages[0] && pages[0].t; R.fates = pages.filter(p => p.k === 'fate').map(p => p.id).join(',');
    const tob = pages.find(p => p.id === 'tobet'); R.tobet = tob && {head:tob.head, barrow:/in the barrow the Emperor ordered/.test(tob.t), heir:/passed to his family on the tenant farm/.test(tob.t), house:/house's interest/.test(tob.t)};
    const ru = pages.find(p => p.id === 'ruuk'); R.ruuk = ru && {head:ru.head, waits:/waited with the company's followers/.test(ru.t)};
    const per = pages.find(p => p.id === 'perrit'), am = pages.find(p => p.id === 'ammet'), th = pages.find(p => p.id === 'thegg'), bru = pages.find(p => p.id === 'brune'), pes = pages.find(p => p.id === 'pessa');
    R.lines = {highFort:/held the west rampart at High Fort/.test(per.t), ammetNerek:/sent a runner up the bank/.test(am.t), theggPaid:/paid his fine at the court/.test(th.t), bruneDead:/carried the drowned/.test(bru.t), pessaChannel:/held the crossing on the dry channel/.test(pes.t),
      debt:k === 'ledger' ? /went to her father, a clerk in the Pursers' District with the dead roll/.test(per.t) : k === 'paid' ? /walked out of uniform still owing|line closed at discharge/.test(per.t) : /line stands as it was/.test(per.t) && /held by the house/.test(per.t), burned:/house's strongroom/.test(per.t)};
    const sg = pages.find(p => p.k === 'fate' && p.id === 'sgt'), last = pages[pages.length - 1]; R.sgt = sg && /Sergeant · Sixth Company, the Whitefinder Battalion/.test(sg.t) && /under the footbridge where you learned to swim/.test(sg.t) && /holed dock/.test(sg.t);
    R.endPage = {endline:/The End of Indebted/.test(last.t), credit:/Steven Erikson/.test(last.t) && /Ian C\. Esslemont/.test(last.t), closure:/Seventh Closure/.test(last.t), canal:/the canal goes by as it always has/.test(last.t), paybooks:/paybook/.test(last.t), count:/Paid down/.test(last.t), dead:/Tobet/.test(last.t), road:/Chapter 7 · The Seventh Closure/.test(last.t)};
    R.onwardLine = k === 'emperor' ? /Book Seven/.test(pages[0].t) && !/Book Seven/.test(pages.slice(1).map(p => p.t).join(' ')) || /Book Seven/.test(pages[0].t) : /no road onward/i.test(pages[0].t);
    R.fleets = (pages.map(p => p.t).join(' ').match(/ships across the sea/g) || []).length;
    out.roads[k] = R; }
  /* Deeds: Book Five on the shelf, its Debt rows, finished in Letheras */
  { const dx = b5DeedsExtra([{s:S}]); out.a.deeds = /Finished in Letheras<\/span><span>1/.test(dx) && /Debt/.test(dx); out.a.shelf = typeof shelfBooks === 'function' ? shelfBooks().map(b => b.id).includes('mt') : null; }
  } catch (e) { out.err = e.stack; }
  try {
  /* ================= B: swim / salvage / watch / run / refuse / fallback; nobody fell; Ruuk sent away, Pessa waiting, Brune never met ================= */
  mk({k1:'swim', k2:'salvage', k3:'watch', k4:'run', k5:'refuse', k6:'fallback', rec:{ruuk:0, pessa:2}, kit:['b5_c1_weightbag'], silver:60, debt:{thegg:400}}, 'Swim');
  out.b = {renderErr:renderAll(), threat:b5DrowningThreat(), counters:!has('b5_c7_start', /Counters' Quarter/), intro:!/barrow at Brans Keep/.test(CHAPTERS[7].intro.paras[2]())};
  talk('b5_c7_clerk'); out.b.clerk = /sitting in it with the oilskin case on his knees/.test(DLG.b5_c7_clerk().txt) && !S.f.b5_c7_burned;
  talk('b5_c7_ennic'); take('b5_c7_ennic', /Low Walk is this way/); take('b5_c7_tobridge', /Down to the footbridge/); out.b.ash = !S.kit.includes('b5_c3_ash');
  out.b.namesHidden = !has('b5_c7_fire', /Say the names/);
  talk('b5_c7_courtmen'); out.b.court = {swam:/That's the one who swam/.test(DLG.b5_c7_courtmen().txt), choice:has('b5_c7_courtmen', /good look at Thegg/), noReceipt:!has('b5_c7_courtmen', /receipt/)};
  take('b5_c7_courtmen', /good look at Thegg/); out.b.court.done = S.f.b5_c7_courtDone; out.b.court.txt = /the court does not like to ask twice/.test(DLG.b5_c7_court_swam().txt);
  S.f.b5_c7_ph = 3; S.f.b5_c7_wolvesDone = 1; S.f.b5_c7_barricadeDone = 1; S.f.b5_c7_day = 2; startExplore('b5_c7_day'); talk('b5_c7_sorcery');
  { const cc = vis('b5_c7_sorcery').find(c => /ledge/.test(c.t)); out.b.canal = {thegg:edge(cc, 'thegg'), first:/Thegg goes first/.test(DLG.b5_c7_sorcery().txt)};
    const th0 = b5Debt('sgt'); made('b5_c7_sorcery', /ledge/, 'sgt', 'fail'); out.b.canal.hard = S.node === 'b5_c7_canal_hard'; out.b.canal.cost = b5Debt('sgt') - th0; out.b.canal.rattled = !!(S.rattled && S.rattled.sgt); take('b5_c7_canal_hard', /Hold on/); out.b.canal.under = S.f.b5_c7_canal === 1 && !Object.keys(S.dead || {}).length; }
  take('b5_c7_under', /Evening/);
  { const d0 = Object.fromEntries(['sgt', 'tobet', 'thegg', 'perrit', 'ammet'].map(id => [id, b5Debt(id)])), s0 = S.silver; take('b5_c7_roads', /paid out/); const rel = S.f.b5_c7_released || [];
    // smallest first: the docks go on the smallest line first
    const order = Object.entries(d0).filter(([, v]) => v > 0).sort((a, b) => a[1] - b[1]); out.b.paid = {spent:S.f.b5_c7_spent, s0, smallest:order[0][0], paidSmallest:d0[order[0][0]] - b5Debt(order[0][0]), released:rel.join(), relOk:rel.every(id => b5Debt(id) === 0), notRelOwe:['sgt', 'tobet', 'thegg', 'perrit', 'ammet'].filter(id => !rel.includes(id)).every(id => b5Debt(id) > 0), pessa:b5Debt('pessa') === B5_DEBT0.pessa};
    take('b5_c7_paid', /The last of it/); take('b5_c7_last', /Go\./); await wait(40);
    const pages = await finale(); out.b.pages = pages.length; out.b.leaks = pages.filter(p => p.leak || p.len < 80).map(p => p.k + ':' + p.id); out.b.kinds = pages.map(p => p.k + (p.id ? ':' + p.id : '')).join(' ');
    const ru = pages.find(p => p.id === 'ruuk'), pe = pages.find(p => p.id === 'pessa'), bu = pages.find(p => p.id === 'brune'), th = pages.find(p => p.id === 'thegg');
    out.b.rec = {ruuk:ru && ru.head === 'Sent away', pessa:pe && pe.head === 'Waiting' && /discharge did not reach/.test(pe.t), brune:bu && bu.head === 'Another road', thegg:th && /swam the Quillas weighted/.test(th.t), noDead:/None of the squad/.test(pages[pages.length - 1].t), noOnward:!b57Onward(S), done:bookDone(S)}; }
  } catch (e) { out.err2 = e.stack; }
  try {
  /* ================= C: a --from=7 style save (Brune walks, Ruuk and Pessa wait, nobody fell): every node renders in every phase ================= */
  setBook('mt'); S = newStateMT('Syn'); S.lvl = 8; S.xp = LEVELS[7]; Object.assign(S.f, {b5_c1_key:'pay', b5_c2_key:'dead', b5_c3_key:'warn', b5_c4_key:'hold', b5_c5_key:'sign', b5_c6_key:'stand', b5_holder:'house', b5_rearmed:1, b5_c6_fallen:[]});
  S.chapters = {1:'pay', 2:'dead', 3:'warn', 4:'hold', 5:'sign', 6:'stand'}; S.f.b5_bruneDone = 1; S.squad.push('brune'); S.f.b5_ruukDone = 2; S.f.b5_pessaDone = 2; S.camp = ['ruuk', 'pessa']; S.picksDue = []; migrate(S); save(); startChapter(7);
  const errs = []; const states = [[1, 0, null], [2, 0, null], [3, 0, null], [3, 1, null], [3, 2, null], [3, 3, null], [4, 3, null], [4, 3, 'emperor'], [4, 3, 'paid'], [4, 3, 'ledger']];
  for (const [ph, day, k] of states) { const sv = JSON.stringify(S); S.f.b5_c7_ph = ph; S.f.b5_c7_day = day; if (day >= 1) S.f.b5_c7_wolvesDone = 1; if (day >= 2) S.f.b5_c7_barricadeDone = 1; if (day >= 3) { S.f.b5_c7_canal = 1; S.f.b5_c7_stopped = 1; } S.f.b5_c7_key = k; if (k === 'paid') b57PaidOut(); if (k === 'ledger') b57Listed(); errs.push(...renderAll().map(e => `ph${ph}d${day}${k || ''} ${e}`)); S = JSON.parse(sv); }
  out.c = {renderErr:errs, brune:b5In('brune')};
  talk('b5_c7_fire'); out.c.roster = vis('b5_c7_fire').some(c => /roster|Who walks/i.test(c.t + (c.tag || ''))); out.c.offers = b5Offers().includes('ruuk') && b5Offers().includes('pessa');
  out.c.next = [1, 2, 3, 4].map(p => { S.f.b5_c7_ph = p; return b57Next(); }).join(',');
  } catch (e) { out.err3 = e.stack; }
  return out;
});
if (r.err) no('page script threw (A): ' + r.err);
if (r.err2) no('page script threw (B): ' + r.err2);
if (r.err3) no('page script threw (C): ' + r.err3);
const a = r.a || {}, b = r.b || {}, c = r.c || {};
if (a.area) {
  a.area === 'b5_c7_streets' && a.ch === 7 && a.title === 'The Seventh Closure' && a.num === 'Seven' && !a.renderErr.length && a.roster === 'b5_c7_fire' && a.reg && a.keys === 'emperor,paid,ledger' && a.intro && a.nodes >= 60 && a.squad.includes('pessa') && a.squad.includes('brune') && !a.squad.includes('tobet') && a.camp === 'ruuk' && a.threat0 ? ok(`a fresh Chapter Seven opens in the Drownings District (Tobet fallen at Brans Keep, Pessa and Brune walking, Ruuk waiting); registered; a roster fire; every one of ${a.nodes} b5_c7 nodes renders with a visible choice, no hard-limit word, no exclamation in narration`) : no('fresh ' + JSON.stringify(a).slice(0, 900));
  const s = a.start || {}; s.ph === 1 && s.again && s.bell && s.starlings && s.born && s.counters && a.ennic.orders === 1 && a.ennic.txt && a.ennic.notNow && a.bell && a.brazier.txt && a.brazier.pessa && a.street ? ok('the night: the bell\'s count, the starlings round the dark tower, two streets from where you were born; Ennic\'s orders (the footbridge by the Low Walk); the bell-station; the brazier\'s news (crowned Emperor, the wagers) and Pessa\'s canal; your street and its tally') : no('night ' + JSON.stringify([s, a.ennic, a.bell, a.brazier, a.street]));
  const bn = a.burn || {}; bn.flag === 1 && bn.want === bn.got && bn.once && bn.txt && bn.gone ? ok(`Ch5 sign: the house's strongroom burns, a quarter of every debt (${bn.got}) once, on every debtor (${bn.ids})`) : no('burn ' + JSON.stringify(bn));
  const lo = a.loot || {}; a.shopCheck === 'guile:14' && lo.started && lo.foes === 5 && lo.foeIds === 'b5_deserter,b5_deserterbow,b5_c7_looter' && lo.done && lo.docks === 12 && a.rubble === 10 ? ok('the looters (deserters ×3, a bowman, a looter; Guile 14 to talk them out): 12 docks; the purse in the rubble (Wits 13): 10') : no('looters ' + JSON.stringify([a.shopCheck, lo, a.rubble]));
  const bd = a.bridge || {}; bd.area === 'b5_c7_canal' && bd.node === 'b5_c7_bridge' && bd.ph === 2 && bd.threat === 1 && bd.tiles && bd.notNow && bd.court ? ok('the footbridge at night: the barricade; the tiles offered; the canal threat (Ammet drowning) brings the court\'s men') : no('bridge ' + JSON.stringify(bd));
  const t = a.tiles || {}; a.tilesNotNow && t.drawn === 1 && t.reader === 'perrit' && t.inPool && t.lean === 3 && t.say && t.table && t.scene === 'b5_letheras' && a.card.sp === 'The Tiles of the Holds' && a.card.back === 'b5_c7_tiles_done' ? ok(`the reading on the cracked flagstone (Perrit lays the tiles: ${t.card}; the Gate leans ×3; "Not now" offered)`) : no('tiles ' + JSON.stringify([t, a.card]));
  const f = a.fire || {}; f.again && f.rest && f.pay && f.payPaid && f.talk && f.names && f.sleep && f.notNow && f.roster && f.brune && f.pessa && a.rested === 1 && a.talk.lines === a.talk.here && a.names.flag === 1 && a.names.tobet && a.names.heir && a.names.notSquad && a.names.gone && a.desk.html && a.desk.notNow && a.desk.back === 'b5_c7_fire' ? ok('the brazier: again, a rest, the pay desk (says the paid road), one line each, the roster, Sleep and Not now; Brune and Pessa at the fire; the names said once (Tobet, his debt to his family on the tenant farm, not the squad\'s)') : no('fire ' + JSON.stringify([f, a.rested, a.talk, a.names, a.desk]));
  const ct = a.court || {}, cf = a.courtFight || {}; ct.check === 'wits:13' && ct.sgt === 2 && ct.named && ct.fight && ct.notNow && ct.noSwam && ct.done === 'receipt' && ct.gone && cf.started && cf.objective && cf.foeIds === 'b5_collector,b5_bully' && cf.done === 'fought' ? ok('the court\'s men with a list (Ammet\'s name): the receipt (Wits 13, you +2) turns them away without a fight; or the fight (non-lethal, four rounds)') : no('court ' + JSON.stringify([ct, cf]));
  const d = a.day || {}; d.area === 'b5_c7_day' && d.node === 'b5_c7_morning' && d.ph === 3 && d.walls && d.noSleep && d.notNow && a.wager && a.edurEarly ? ok('the day: the citizens on the white walls; a slate at the corner; the barricade waits on the wolves') : no('day ' + JSON.stringify([d, a.wager, a.edurEarly]));
  const w = a.wolves || {}; a.tiersCheck === 'wits:15' && w.started && w.foes === 4 && w.waves === 1 && w.stage2 && w.inStage2 && w.foes2 === 'b5_jheck,b5_c7_greatwolf' && w.done && w.docks === 8 && w.word && w.settle ? ok('the wolves on the tiers (Jheck ×4, a wave of 2), the footbridge with the pack\'s biggest; 8 docks off the slate; the main bridge\'s word heard, never seen; Settle Lake\'s thump') : no('wolves ' + JSON.stringify([a.tiersCheck, w]));
  const br2 = a.bar || {}; a.brace === 'might:15' && br2.started && !br2.mortal && br2.allies === 1 && br2.foeIds === 'b5_edur,b5_unblooded,b5_wraith' && br2.stage2 && br2.inStage2 && br2.done && br2.lamps ? ok('the barricade (Edur ×3, unblooded ×3, wraiths ×2, a garrison regular; not mortal), the Low Walk, and the lamps going out') : no('barricade ' + JSON.stringify([a.brace, br2]));
  const cn = a.canal || {}, un = a.under || {}; cn.check === 'might:14' && cn.edges === '2,0,2,2,-1' && cn.brune && cn.first && un.canal === 1 && un.stopped === 1 && un.lamp && un.ashWas && un.ashGone && un.ashTxt && un.decree && un.dead === 'tobet' && un.onward ? ok('into the canal (Might 14: you +2, Brune +2, Pessa +2; Thegg only on swim); nobody dies; the canal lamp; the green ash goes into the water; the killing stopped and a day of suffering decreed, never described') : no('canal ' + JSON.stringify([cn, un]));
  a.eve.area === 'b5_c7_walk' && a.eve.ph === 4 && a.eve.patrol && a.news && a.ennicEve && a.clerkEve ? ok('the evening on the Low Walk: the patrol at the street\'s end; the rumours (Eberict, the King\'s Champion, the Chancellor); Ennic will sign; the clerk\'s other half') : no('evening ' + JSON.stringify([a.eve, a.news, a.ennicEve, a.clerkEve]));
  const tr = a.trick || {}, pl = a.pull || {}, tb = a.tb || {}; a.trickCheck === 'guile:16:b5_c7_dock' && a.trickEdges === '2,2,1,1,-1' && tr.who === 'pessa' && tr.ok && tr.dock && tr.left >= 2 && tr.notSorcery && tr.pullMaps && pl.btn && pl.notOponn && /Spin the dock/.test(pl.words) && pl.left === 1 && pl.push && pl.alias && pl.note && pl.done && tb.offered && tb.free && tb.lucky ? ok(`the trick: the Holed Dock (✦ Guile 16: you +2, Pessa +2, Brune +1, Tobet +1, Perrit −1), the dock (+1 Guile); after a failed check "${pl.words}" rolls again, spends a charge and pushes the next check (−2); in a fight the attack rolls twice`) : no('trick ' + JSON.stringify([a.trickCheck, a.trickEdges, tr, pl, tb]));
  const rs = a.roads || {}; rs.three && rs.notYet && rs.html && rs.brune && rs.pessa && rs.noTobet ? ok('the roads at the Low Walk: three, and "Not yet"; the paybook on the page; Brune and Pessa have their say; Tobet is not there') : no('roads ' + JSON.stringify(rs));
}
for (const [k, R] of Object.entries(r.roads || {})) {
  const debtsOk = k === 'emperor' ? Object.keys(R.d0).every(id => R.debts[id] === R.d0[id]) && R.silver === R.s0 : k === 'paid' ? R.spent === R.s0 && R.silver === 0 && R.txt : Object.entries(R.listed || {}).every(([id, v]) => v === R.d0[id] && R.debts[id] === 0) && R.page && R.txt && R.ruukDebt === R.d0.ruuk && !('ruuk' in (R.listed || {}));
  R.key === k && debtsOk && R.end.view === 'end' && R.end.ch === k && R.end.epi && R.end.done && R.end.onward === (k === 'emperor') && R.end.journal >= 3 && !R.leaks.length && R.pages >= 9 && R.fates.split(',').sort().join() === 'ammet,brune,perrit,pessa,sgt,thegg' && R.tobet && R.tobet.head === 'Fallen at Brans Keep' && R.tobet.barrow && R.tobet.heir && R.tobet.house && R.ruuk && R.ruuk.head === 'Waiting' && R.ruuk.waits && Object.values(R.lines).every(Boolean) && R.sgt && Object.values(R.endPage).every(Boolean) && R.onwardLine && R.fleets === (k === 'emperor' ? 1 : 0)
    ? ok(`road ${k}: ${k === 'emperor' ? 'every line stands, under the new seal' : k === 'paid' ? `${R.spent} docks on the smallest lines first, released: ${R.released || 'nobody'}` : 'the dead roll, every walking line to the heirs (the waiting recruit not listed), the page torn out'}; the book finished${k === 'emperor' ? ', onward to Book Seven' : ', no road onward'}; the finale, ${R.pages} pages: ${R.kinds}`)
    : no(`road ${k} ` + JSON.stringify(R).slice(0, 1400));
}
if (r.roads) (r.a.deeds && r.a.shelf !== false) ? ok('Deeds: Book Five on the shelf, its Debt rows, finished in Letheras') : no('deeds ' + JSON.stringify([r.a.deeds, r.a.shelf]));
if (b.renderErr) {
  !b.renderErr.length && b.threat && b.counters && b.intro && b.clerk && b.namesHidden && b.court.swam && b.court.choice && b.court.noReceipt && b.court.done === 'swam' && b.court.txt ? ok('swim, refuse, fallback, nobody fallen: every node renders; no strongroom (the clerk in a doorway all night); no names to say; the court\'s men know Thegg\'s face, the one who swam, and go') : no('B ' + JSON.stringify(b).slice(0, 900));
  const cn = b.canal || {}; cn.thegg === 2 && cn.first && cn.hard && cn.cost === 15 && cn.rattled && cn.under ? ok('swim: Thegg leads into the canal (+2); a failed check still gets everybody under, for a lost shield (15 against the roller\'s line) and a rattle; nobody dies') : no('B canal ' + JSON.stringify(cn));
  const p = b.paid || {}; p.spent === p.s0 && p.paidSmallest > 0 && p.relOk && p.notRelOwe && p.pessa ? ok(`paid: ${p.spent} docks spent, the smallest line first (${p.smallest}); released: ${p.released || 'nobody'}; everyone else still owes; the waiting Pessa's line untouched`) : no('B paid ' + JSON.stringify(p));
  const rc = b.rec || {}; rc.ruuk && rc.pessa && rc.brune && rc.thegg && rc.noDead && rc.noOnward && rc.done && !b.leaks.length ? ok(`the finale's recruits: Ruuk sent away, Pessa waiting, Brune never met, each a page; Thegg's swim; nobody dead; no road onward (${b.pages} pages: ${b.kinds})`) : no('B finale ' + JSON.stringify([rc, b.leaks, b.kinds]));
}
if (c.renderErr) !c.renderErr.length && c.brune && c.roster && c.offers && c.next === 'b5_c7_ennic,b5_c7_fire,b5_c7_tiers,b5_c7_roads' ? ok('a --from=7 style save (Brune walks, Ruuk and Pessa wait): every node renders in every phase and step, and on every road; the roster offers both; the way on from each phase') : no('synthetic ' + JSON.stringify(c).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b5ch7: FAIL (${bad.length})` : 'b5ch7: all ok'); process.exit(bad.length ? 1 : 0);
