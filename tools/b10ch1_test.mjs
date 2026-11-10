// Book Ten, Chapter 1 (Missing Is Not Dead, src/181_b10_ch1.js): the halts, both keys from the same moment at Thallo's word, the reading at
// the burial lines (the Deck; B10READ[1] by day and by night; the card node the visions pass hooks onto), the fire (Witness shown, a rest,
// a line each by day and by night, the roster, the beat after the night's work, Not now), Pruss's join at the first halt (the clerk's slate;
// or waiting at the heavies' baggage when six walk), every fight's start and a forced win (both grounds of the strippers), the trick behind
// its ✦ hard check (taught, free, and its battle half), the items (each with art), the Witness moves (the tent's "yes, but" −1; 'names'
// +1 when every name is said, once; the beat ±1), no thirst, "Not now" on every onward step and a "yes, but" on every check, both roads
// ('adjunct' and 'south'), from a fresh start and from a --from=1 style save with a transfer's squad (Marrow dead; Sathi, Mehet and Ottar).
// Usage: node tools/b10ch1_test.mjs   (build first; exit 1 on a failure)
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
  /* a forced win, through the engine's own endBeat; a fight with a second ground goes through stageBreak */
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b10_c1_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Ammanas|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Hedge|Cuttle|Bottle|Ruthan|Gudd|Quick Ben|Kalam|Deadsmell|Masan|Gilani|Keneb|Blistig|Tavore|Paran|Krughava|Tanakalian|Stormy|Gesler|Abrastal|Brys|Errant|Forkrul|Crippled God|Nefarias|\bweeks?\b|\bmonths?\b|\btenday\b|\bdays? (?:ago|later)\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = tt(c); if (/undefined|NaN/.test(t) || never.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase, key and road */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), wit = new Set();
    const keep = JSON.stringify(S.f);
    const FL = ['b10_c1_clerk', 'b10_c1_orders', 'b10_c1_stripDone', 'b10_c1_news', 'b10_c1_word', 'b10_c1_gravesDone', 'b10_c1_named', 'b10_c1_waterDone'];
    [1, 2, 3].forEach(ph => ['names', 'water', null].forEach(k => ['adjunct', 'south'].forEach(rd => [...Array(1 << FL.length).keys()].forEach(fl => { S.f.b10_c1_ph = ph; S.f.b10_c1_key = k; S.f.b10_tRoad = rd;
      FL.forEach((f, i) => { S.f[f] = fl & (1 << i) ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (c.witness) wit.add(id); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); }))));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, wit:wit.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('tcg'); S = newStateTCG('Fresh', 'Brann'); S.picksDue = []; save(); startChapter(1);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, xp0:S.xp, wit0:b10Wit(), road:b10TRoad(), squad:S.squad.join(','), renderErr:renderAll(), title:CHAPTERS[1].title, nodes:nodes.length, areas:CHAPTERS[1].areas.length, fights:Object.keys(CHAPTERS[1].battles).length,
    shelf:BOOKS.tcg.coming, items:Object.keys(CHAPTERS[1].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)),
    itemN:Object.keys(CHAPTERS[1].gear).length, scale:ITEMS.b10_c1_scale && ITEMS.b10_c1_scale.slot === 'armour' && ITEMS.b10_c1_scale.role === 'mail' && ITEMS.b10_c1_scale.ac >= 3,
    spade:ITEMS.b10_c1_spade && ITEMS.b10_c1_spade.slot === 'weapon' && ITEMS.b10_c1_spade.role === 'heavyweapon', slate:ITEMS.b10_c1_slate && ITEMS.b10_c1_slate.slot === 'trinket',
    ownArt:['b10_c1_scale', 'b10_c1_spade', 'b10_c1_slate'].every(k => /b101/.test(ART['item/' + k])),
    figs:['pruss', 'b9_c1_thallo'].every(k => typeof FIGX[k] === 'function'), ground:typeof TILEX.b10_c1_camp === 'function',
    scenes:['b10_burial', 'b10_camp', 'b10_camp_night', 'b10_c1_linesn', 'b10_c1_wells'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.tcg[1] || []).includes('b10_c1_fire'), thirst:!Object.values(S.injury || {}).includes('b10thirst'), audit:audit()};
  /* the start: the burial lines, the reading among the first halt's choices (by day) */
  talk('b10_c1_start'); out.f.ph = S.f.b10_c1_ph; out.f.deck = has('b10_c1_start', /Sit with Marrow/); out.f.lines = /burial lines|trenches/.test(DLG.b10_c1_start().txt);
  talk('b10_c1_read'); const rd = DLG.b10_c1_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b10_c1_drawn, reader:S.f.b10_c1_reader, inPool:B10POOL[1].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B10READ[1].back, cardNode:cardNodeName(), cardSp:DLG.b10_c1_card().sp, cardBack:DLG.b10_c1_card().ch[0].go,
    again:!has('b10_c1_fire', /Sit with/), dayScene:rd.scene === 'b10_burial' && /Afternoon/.test(rd.txt)};
  /* the clerk's slate: Pruss joins at the first halt */
  talk('b10_c1_clerk'); out.b = {clerk:S.f.b10_c1_clerk, notNow:has('b10_c1_clerk', /Not now/), npc:npc('b10_c1_lines', 'pruss').show()}; take('b10_c1_clerk', /heavy with the kit/);
  out.b.pnotNow = has('b10_c1_pruss', /Not now/); take('b10_c1_pruss', /Your squad/); out.b.helm = /old sergeant's|sergeant's/.test(DLG.b10_c1_pruss_squad().txt) && S.f.b10_c1_prussSquad === 1;
  take('b10_c1_pruss_squad', /Walk with us/); clearModal(); out.b = Object.assign(out.b, {in:b10In('pruss'), flag:S.f.b10_prussDone, lvl:S.lvl, line:/Pruss/.test(DLG.b10_c1_fire_talk().txt), god:PATRONS.pruss ? PATRONS.pruss.god : null, gone:!npc('b10_c1_lines', 'pruss').show()});
  /* the trestle: the slate, once Pruss is settled, once */
  talk('b10_c1_table'); talk('b10_c1_table'); out.slate = S.kit.filter(k => k === 'b10_c1_slate').length;
  /* the spade cart: once */
  talk('b10_c1_spadecart'); talk('b10_c1_spadecart'); out.spade = S.kit.filter(k => k === 'b10_c1_spade').length;
  /* the edge before Thallo: shut */
  talk('b10_c1_edge'); out.e0 = !has('b10_c1_edge', /Straight in/);
  /* Thallo: the captain's word, the bread */
  talk('b10_c1_thallo'); out.th = {orders:S.f.b10_c1_orders, notNow:has('b10_c1_thallo', /Not now/), notEating:/not eating/.test(DLG.b10_c1_thallo().txt)}; take('b10_c1_thallo', /long tents/); out.th.bread = S.f.b10_c1_bread === 1;
  /* the trick: the heavies' roll over a grave */
  talk('b10_c1_roll'); const dc = vis('b10_c1_roll').find(c => c.trick);
  out.t = {dc:dc && dc.check[1], stat:dc && dc.check[0], noNear:dc && !dc.near, notNow:has('b10_c1_roll', /Not now/), pruss:(edgesFor(dc, 'pruss').find(e => /four years/.test(e[0])) || [])[1] || 0, musters:(edgesFor(dc, 'sgt').find(e => /musters/.test(e[0])) || [])[1] || 0};
  made('b10_c1_roll', /Learn the heavies/, 'pruss');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b10_c1_roll && S.tricks.b10_c1_roll.who, ok:S.f.b10_c1_rollOk, free:!!AB.t_b10_c1_roll.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b10_c1_roll.fx), again:!has('b10_c1_roll', /Learn/)});
  /* the strippers at the edge: the Third's first fight (two grounds, a regular beside), the scale */
  talk('b10_c1_edge'); out.s = {notNow:has('b10_c1_edge', /Not now/), straight:has('b10_c1_edge', /Straight in/), pruss:/Pruss/.test(DLG.b10_c1_edge().txt)};
  { const sn = JSON.stringify(S); near('b10_c1_edge', /spoil heaps/, 'tangle'); out.s.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c1_lines'); }
  out.s.fight = await force('b10_c1_strippers'); out.s.done = S.f.b10_c1_stripDone; out.s.scaleItem = S.kit.includes('b10_c1_scale'); out.s.thalloGone = !npc('b10_c1_lines', 'thallo').show();
  out.s.xp = S.xp; out.s.lvl = S.lvl;
  /* the camp by day */
  take('b10_c1_tocamp', /To the camp/); out.c = {area:S.area, arrive:S.node === 'b10_c1_camp_arrive' && S.f.b10_c1_campSeen === 1};
  talk('b10_c1_rise'); out.c.allies = S.f.b10_c1_allies === 1 && /grey knights|Grey knights/i.test(DLG.b10_c1_rise().txt) && /horse-folk/.test(DLG.b10_c1_rise().txt);
  talk('b10_c1_longtent'); out.c.ltNot = has('b10_c1_longtent', /Not now/);
  { const sn = JSON.stringify(S); near('b10_c1_longtent', /Move the far rows/, 'haddat'); out.c.ltNear = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b10_c1_camp'); }
  const sv0 = S.inv.salve || 0; made('b10_c1_longtent', /Move the far rows/, 'pruss'); out.c.salve = (S.inv.salve || 0) - sv0; out.c.carried = S.f.b10_c1_carried === 1;
  talk('b10_c1_captain'); out.c.captain = S.f.b10_c1_captain === 1;
  talk('b10_c1_oldmarine'); out.c.old = S.f.b10_c1_old === 1 && /on her feet/.test(DLG.b10_c1_oldmarine().txt);
  /* the fire by day, before the news: no dusk yet */
  talk('b10_c1_fire'); const f1 = DLG.b10_c1_fire(); out.fire1 = {html:/Witness/.test(f1.html || ''), talk:has('b10_c1_fire', /Talk with the squad/), rest:has('b10_c1_fire', /rest/), duskShut:!has('b10_c1_fire', /Dusk/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1]))};
  out.fire1.lines = DLG.b10_c1_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {haddat:4}; take('b10_c1_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b10_c1_rest1 === 1;
  /* the spar (optional; survive) and the trick's battle half */
  talk('b10_c1_spar'); out.sp = {notNow:has('b10_c1_spar', /Not now/), surv:BATTLES.b10_c1_spar.objective && BATTLES.b10_c1_spar.objective.type === 'survive' && BATTLES.b10_c1_spar.objective.rounds === 4};
  startBattle('b10_c1_spar', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'pruss'); out.t.offered = trickOk(u, AB.t_b10_c1_roll); AB.t_b10_c1_roll.run(u); out.t.rally = (u.rallyUntil || 0) >= B.round; }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b10_c1_camp');
  out.sp.fight = await force('b10_c1_spar'); out.sp.done = S.f.b10_c1_sparDone === 1;
  /* Thallo's news, then dusk */
  out.n = {npc:npc('b10_c1_camp', 'thallo').show()}; talk('b10_c1_thallo_news'); out.n.news = S.f.b10_c1_news === 1 && /on her feet/.test(DLG.b10_c1_thallo_news().txt) && /big tent/.test(DLG.b10_c1_thallo_news().txt);
  talk('b10_c1_fire'); out.n.dusk = has('b10_c1_fire', /Dusk/); out.n.duskNot = has('b10_c1_fire', /Not now/);
  take('b10_c1_fire', /Dusk/); out.n = Object.assign(out.n, {area:S.area, ph:S.f.b10_c1_ph, arrive:S.node === 'b10_c1_night_arrive', missing:S.f.b10_c1_missing === 1 && /Missing is not dead/.test(DLG.b10_c1_night_arrive().txt) && /dead Imass/.test(DLG.b10_c1_night_arrive().txt)});
  out.n.nightRead = (() => { const n = DLG.b10_c1_read(); return n.scene === 'b10_c1_linesn' && /Night in the camp/.test(n.txt); })();
  out.n.lines2 = DLG.b10_c1_fire_talk().txt.split('\n\n').length;
  /* the big tent: the lamps; the clerk's "yes, but" costs one Witness; the word heard */
  talk('b10_c1_thallo_night'); out.n.keyShut = !has('b10_c1_thallo_night', /burial lines/);
  talk('b10_c1_tent'); out.w = {notNow:has('b10_c1_tent', /Not now/), later:has('b10_c1_tent', /Camp word will come/)};
  { const sn = JSON.stringify(S), w0 = b10Wit(); near('b10_c1_tent', /Catch the clerk/, 'haddat'); out.w.near = b10Wit() - w0; restore(sn, 'b10_c1_night'); }
  const wK0 = b10Wit(); made('b10_c1_tent', /Catch the clerk/, 'haddat'); out.w = Object.assign(out.w, {word:S.f.b10_c1_word, chained:/free the chained god/.test(DLG.b10_c1_word_ok().txt), glass:/Glass Desert/.test(DLG.b10_c1_word_ok().txt), wit:b10Wit() - wK0});
  /* the key from Thallo */
  talk('b10_c1_thallo_night'); const kn = DLG.b10_c1_thallo_night();
  out.k = {names:has('b10_c1_thallo_night', /burial lines/), water:has('b10_c1_thallo_night', /The water/), notYet:has('b10_c1_thallo_night', /Not yet/), html:/Witness/.test(kn.html || ''), pruss:/Pruss/.test(kn.txt), lent:/lent out/.test(kn.txt)};
  const snapK = JSON.stringify(S), witK = b10Wit(), loyK = {haddat:S.loy.haddat, marrow:S.loy.marrow, tangle:S.loy.tangle, pruss:S.loy.pruss};
  /* ================= key: names ================= */
  take('b10_c1_thallo_night', /burial lines/); out.a = {key:S.f.b10_c1_key, names:S.f.b10_c1_names, water:S.f.b10_c1_water == null, ph:S.f.b10_c1_ph, haddat:S.loy.haddat - loyK.haddat, marrow:S.loy.marrow - loyK.marrow, wit0:b10Wit() - witK};
  take('b10_c1_key_names', /burial lines/); out.a.robbers = npc('b10_c1_night', 'robbers').show(); out.a.notNow = has('b10_c1_nightlines', /Not now/); out.a.fireShut = !has('b10_c1_fire', /East|Letherii/);
  { const sn = JSON.stringify(S); near('b10_c1_nightlines', /Along the spoil heaps/, 'tangle'); out.a.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c1_night'); }
  out.a.fight = await force('b10_c1_graves'); out.a.done = S.f.b10_c1_gravesDone === 1; out.a.robbersGone = !npc('b10_c1_night', 'robbers').show();
  talk('b10_c1_nightlines'); const sc = vis('b10_c1_nightlines').find(c => c.check); out.a.say = {wit:!!(sc && sc.witness), notNow:has('b10_c1_nightlines', /Not now/), edge:(edgesFor(sc, 'sgt').find(e => e[0] === 'Witness') || [null, 'none'])[1], html:/Witness/.test(DLG.b10_c1_nightlines().html || '')};
  { const sn = JSON.stringify(S); near('b10_c1_nightlines', /Say every name/, 'haddat'); out.a.say.near = !!(S.rattled || {}).haddat; restore(sn, 'b10_c1_night'); }
  made('b10_c1_nightlines', /Say every name/, 'haddat'); out.a.named = S.f.b10_c1_named; out.a.wit1 = b10Wit() - witK;
  talk('b10_c1_named_ok'); out.a.once = b10Wit() - witK;
  /* the fire after: the beat */
  talk('b10_c1_fire'); out.a.beatOffered = has('b10_c1_fire', /Why are we still here/); out.a.onward = has('b10_c1_fire', /glass's edge/); out.a.fireNot = has('b10_c1_fire', /Not now/);
  take('b10_c1_fire', /Why are we still here/); out.a.beat = {notNow:has('b10_c1_beat', /Not now/), n:vis('b10_c1_beat').length, html:/Witness/.test(DLG.b10_c1_beat().html || '')};
  { const sn = JSON.stringify(S); take('b10_c1_beat', /Not now/); out.a.beat.nothing = !b10BeatOf(1); restore(sn, 'b10_c1_night'); }
  const wB = b10Wit(); take('b10_c1_beat', /Each other/); out.a.beat.rec = b10BeatOf(1); out.a.beat.wit = b10Wit() - wB; out.a.beat.gone = !has('b10_c1_fire', /Why are we still here/);
  out.a.thirst = !Object.values(S.injury || {}).includes('b10thirst');
  talk('b10_c1_east'); out.a.eastNot = has('b10_c1_east', /Not now/);
  take('b10_c1_fire', /glass's edge/); out.a.notYet = has('b10_c1_onward', /Not yet/); out.a.glass = DLG.b10_c1_onward().scene === 'b10_glass_night' && /edge of the glass/.test(DLG.b10_c1_onward().txt); out.a.pruss = /Pruss/.test(DLG.b10_c1_onward().txt);
  const witA = b10Wit(); take('b10_c1_onward', /Into the glass/); await wait(60);
  out.a.end = {view, ch:S.chapters[1], lvl:S.lvl, xp:S.xp, wit:witA, extras:CHAPTERS[1].extras().length, journal:CHAPTERS[1].journal().length, endText:(CHEND[1] || {}).names && CHEND[1].names[0]};
  /* ================= key: water, from the same moment ================= */
  restore(snapK, 'b10_c1_night'); S.chapter = 1;
  take('b10_c1_thallo_night', /The water/); out.q = {key:S.f.b10_c1_key, water:S.f.b10_c1_water, names:S.f.b10_c1_names == null, tangle:S.loy.tangle - loyK.tangle, pruss:S.loy.pruss - loyK.pruss, haddat:S.loy.haddat - loyK.haddat};
  take('b10_c1_key_water', /To the wells/); out.q.robbersShut = !npc('b10_c1_night', 'robbers').show(); out.q.linesShut = !has('b10_c1_nightlines', /Straight down/);
  talk('b10_c1_wells'); out.q.notNow = has('b10_c1_wells', /Not now/); out.q.html = /Witness/.test(DLG.b10_c1_wells().html || '');
  { const sn = JSON.stringify(S); near('b10_c1_wells', /bottom of the chain/, 'tangle'); out.q.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c1_night'); }
  made('b10_c1_wells', /bottom of the chain/, 'pruss'); out.q.done = S.f.b10_c1_waterDone; out.q.wit = b10Wit() - witK;
  talk('b10_c1_fire'); const wQ = b10Wit(); take('b10_c1_fire', /Why are we still here/); take('b10_c1_beat', /Nobody's said/); out.q.beat = b10BeatOf(1); out.q.beatWit = b10Wit() - wQ;
  out.q.thirst = !Object.values(S.injury || {}).includes('b10thirst');
  take('b10_c1_fire', /glass's edge/); const witQ = b10Wit(); take('b10_c1_onward', /Into the glass/); await wait(60);
  out.q.end = {view, ch:S.chapters[1], wit:witQ, endText:CHEND[1].water[0], extras:CHAPTERS[1].extras().some(x => /wells/.test(x))};
  /* ================= the 'south' road, from the same moment ================= */
  restore(snapK, 'b10_c1_night'); S.chapter = 1; S.f.b10_tRoad = 'south';
  out.u = {lent:/lent out/.test(DLG.b10_c1_thallo_night().txt)}; take('b10_c1_thallo_night', /The water/); take('b10_c1_key_water', /To the wells/); made('b10_c1_wells', /bottom of the chain/, 'pruss');
  talk('b10_c1_fire'); out.u.onward = has('b10_c1_fire', /Letherii wagons/); take('b10_c1_fire', /Letherii wagons/);
  out.u.scene = DLG.b10_c1_onward().scene; out.u.text = /Letherii wagons/.test(DLG.b10_c1_onward().txt); out.u.notYet = has('b10_c1_onward', /Not yet/); out.u.renderErr = renderAll();
  out.u.endCap = /Letherii wagons/.test(CHAPTERS[1].endCap()); take('b10_c1_onward', /South/); await wait(60); out.u.end = {view, ch:S.chapters[1]};
  /* ================= a --from=1 style save: a transfer's Third (Marrow dead; Sathi, Mehet and Ottar walking): six walk, so Pruss waits ================= */
  setBook('tcg'); S = newStateTCG('Syn', 'Brann'); S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'mehet', 'ottar']; delete S.dead.sathi; S.dead.marrow = {ch:7, where:'the rearguard', from:'dod'};
  ['sathi', 'mehet', 'ottar'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(1);
  out.y = {renderErr:renderAll(), reader:b10Rd().id, lines:DLG.b10_c1_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b10_c1_fire_talk().txt), ottar:/Ottar/.test(DLG.b10_c1_fire_talk().txt), noMarrow:!/Marrow/.test(DLG.b10_c1_fire_talk().txt)};
  S.f.b10_c1_ph = 2; out.y.lines2 = DLG.b10_c1_fire_talk().txt.split('\n\n').length; S.f.b10_c1_ph = 1;
  talk('b10_c1_clerk'); take('b10_c1_clerk', /heavy with the kit/); take('b10_c1_pruss', /Walk with us/); out.y.pruss = {flag:S.f.b10_prussDone, in:b10In('pruss'), wait:ROSTER_BOOKS.tcg.wait ? ROSTER_BOOKS.tcg.wait('pruss') : true, npc:npc('b10_c1_lines', 'pruss').show(), text:/Six walk/.test(DLG.b10_c1_pruss_join().txt)};
  talk('b10_c1_table'); out.y.slate = S.kit.includes('b10_c1_slate') && !/Six of those/.test(DLG.b10_c1_table().txt);
  out.y.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, b = r.b || {}, th = r.th || {}, t = r.t || {}, s = r.s || {}, c = r.c || {}, f1 = r.fire1 || {}, sp = r.sp || {}, n = r.n || {}, w = r.w || {}, k = r.k || {}, a = r.a || {}, q = r.q || {}, u = r.u || {}, y = r.y || {};
if (f.area) {
  f.area === 'b10_c1_lines' && f.ch === 1 && f.thread === 't' && f.lvl0 === 24 && f.wit0 === 5 && f.road === 'adjunct' && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && !f.renderErr.length && f.title === 'Missing Is Not Dead' && f.shelf === false && f.areas === 3 && f.fights === 3 && f.items && f.itemN === 3 && f.scale && f.spade && f.slate && f.ownArt && f.figs && f.ground && f.scenes && f.fireRoster && f.thirst
    ? ok(`a fresh start opens Chapter One at the burial lines: the Third at level 24, Witness 5, on 'adjunct'; every b10_c1 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art and roles, no numbers in their lines; Pruss and Thallo drawn; the ground, five backdrops`) : no('fresh ' + JSON.stringify(f).slice(0, 1600));
  const au = f.audit || {}; au.checks >= 6 && au.tricks === 1 && au.wit === 1 && !au.noNear.length && au.onwards >= 5 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none; one Witness check); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes), on both roads`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.lines ? ok('the first halt: the burial lines, the reading offered') : no('start ' + JSON.stringify({ph:f.ph, deck:f.deck, lines:f.lines}));
}
rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.back === 'b10_c1_fire' && rd.cardNode === 'b10_c1_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b10_c1_fire' && rd.again && rd.dayScene ? ok('the reading at the burial lines: Marrow draws from B10POOL[1] (by day the barrel in the sun); the card node is the visions pass\'s hook (b10_c1_card); back to b10_c1_fire; offered once') : no('reading ' + JSON.stringify(rd));
b.clerk === 1 && b.notNow && b.npc && b.pnotNow && b.helm && b.in && b.flag === 1 && b.line && b.god == null && b.gone ? ok('Pruss joins at the first halt off the clerk\'s slate (his old sergeant\'s helm, six names; no god), with his line at the fire') : no('pruss ' + JSON.stringify(b));
r.slate === 1 && r.spade === 1 && r.e0 ? ok('the clerk\'s slate and the sapper\'s spade, once each; the edge shut until Thallo\'s word') : no('items ' + JSON.stringify({slate:r.slate, spade:r.spade, e0:r.e0}));
th.orders === 1 && th.notNow && th.notEating && th.bread ? ok('Thallo: the captain\'s word on the strippers; not eating (his bread to the long tents)') : no('thallo ' + JSON.stringify(th));
t.dc === 21 && t.stat === 'wits' && t.noNear && t.notNow && t.pruss === 2 && t.musters === 1 && t.who === 'pruss' && t.ok === 1 && t.free && t.words && t.again && t.offered && t.rally ? ok('the trick: Every Name, a ✦ wits 21 check that names the Fourteenth\'s musters and the Roll at the Gate; free (its words end on the one-free-trick line); in a fight it steadies the squad beside the bearer') : no('trick ' + JSON.stringify(t));
s.notNow && s.straight && s.pruss && s.near && s.fight && s.fight.started && s.fight.stage2 && s.fight.inStage2 && s.fight.allies === 1 && s.fight.after === 'b10_c1_strippers_after' && s.done === 1 && s.scaleItem && s.thalloGone && s.lvl >= 25
  ? ok(`the strippers at the edge: the open ground (${s.fight.foes} foes, a regular beside the Third) and the wash behind; a "yes, but" on the spoil heaps; the stripped scale; level ${s.lvl}`) : no('strippers ' + JSON.stringify(s));
c.area === 'b10_c1_camp' && c.arrive && c.allies && c.ltNot && c.ltNear && c.salve === 1 && c.carried && c.captain && c.old ? ok('the camp by day: the allies coming in (seen from the rise), the long tents (a "yes, but": a wrenched back; a salve), the heavies\' captain seen, the old marine with the news') : no('camp ' + JSON.stringify(c));
f1.html && f1.talk && f1.rest && f1.duskShut && f1.notNow && f1.lines === f1.here && f1.rested ? ok(`the fire by day: Witness shown, a rest, the talk (a line each, ${f1.lines}), no dusk before the news, Not now`) : no('fire1 ' + JSON.stringify(f1));
sp.notNow && sp.surv && sp.fight && sp.fight.started && sp.fight.after === 'b10_c1_spar_after' && sp.done ? ok('the heavies\' square: optional, survive four, wooden swords') : no('spar ' + JSON.stringify(sp));
n.npc && n.news && n.dusk && n.duskNot && n.area === 'b10_c1_night' && n.ph === 2 && n.arrive && n.missing && n.nightRead && n.keyShut && n.lines2 === f1.here
  ? ok('Thallo\'s news (the Adjunct on her feet, the officers in the big tent); dusk; the night: two of the missing walked back in with the dead Imass, "missing is not dead"; the night reading; no key before the word') : no('news ' + JSON.stringify(n));
w.notNow && w.later && w.near === -1 && w.word === 'heard' && w.chained && w.glass && w.wit === 0 ? ok('the big tent: the lamps; the clerk at the door (a "yes, but": the plan and no why, Witness −1); the camp word: east into the glass, "she means to free the chained god"') : no('tent ' + JSON.stringify(w));
k.names && k.water && k.notYet && k.html && k.pruss && !k.lent ? ok('the key from Thallo: the burial lines or the water, Not yet; Witness shown; Pruss acknowledged; no "lent out" on \'adjunct\'') : no('key ' + JSON.stringify(k));
a.key === 'names' && a.names === 1 && a.water && a.ph === 3 && a.haddat === 1 && a.marrow === 1 && a.wit0 === 0 && a.robbers && a.notNow && a.fireShut && a.near && a.fight && a.fight.started && a.fight.dark && a.fight.after === 'b10_c1_graves_after' && a.done && a.robbersGone && a.say && a.say.wit && a.say.notNow && a.say.edge === 'none' && a.say.html && a.say.near && a.named === 'said' && a.wit1 === 1 && a.once === 1
  ? ok(`key names: Haddat and Marrow +1, S.f.b10_c1_names; robbers at the trenches by night (${a.fight.foes}; a "yes, but"); every name said (a Witness check; its "yes, but" rattled), Witness +1 once`) : no('names ' + JSON.stringify(a).slice(0, 1200));
a.beatOffered && a.onward && a.fireNot && a.beat && a.beat.notNow && a.beat.nothing && a.beat.n === 4 && a.beat.html && a.beat.rec === 'kept' && a.beat.wit === 1 && a.beat.gone && a.thirst && a.eastNot && a.notYet && a.glass && a.pruss && a.end && a.end.view === 'end' && a.end.ch === 'names' && a.end.wit === 7 && a.end.lvl >= 25 && a.end.extras >= 4 && a.end.journal >= 6 && a.end.endText === 'Every name said'
  ? ok(`the beat at the fire ("Why are we still here?": three answers and Not now, which records nothing); kept +1; no thirst; the end on names at the glass's edge: level ${a.end.lvl} (${a.end.xp} xp), Witness ${a.end.wit}`) : no('names end ' + JSON.stringify(a).slice(0, 1200));
q.key === 'water' && q.water === 1 && q.names && q.tangle === 1 && q.pruss === 1 && q.haddat === 0 && q.robbersShut && q.linesShut && q.notNow && q.html && q.near && q.done === 'kept' && q.wit === 0 && q.beat === 'doubt' && q.beatWit === -1 && q.thirst && q.end && q.end.view === 'end' && q.end.ch === 'water' && q.end.wit === 4 && q.end.endText === 'Every skin filled' && q.end.extras
  ? ok(`key water, from the same moment: Tangle and Pruss +1, S.f.b10_c1_water; the wells all night (a "yes, but": a bucket on the shoulder); Witness unmoved; the beat doubted −1; no thirst; the end on water, Witness ${q.end.wit}`) : no('water ' + JSON.stringify(q).slice(0, 1200));
u.lent && u.onward && u.scene === 'b10_train' && u.text && u.notYet && u.renderErr && !u.renderErr.length && u.endCap && u.end && u.end.view === 'end' && u.end.ch === 'water' ? ok('the \'south\' road: Thallo says the Third is lent out to the Commander\'s column; the last scene walks across the camp to the Letherii wagons') : no('south ' + JSON.stringify(u));
y.renderErr && !y.renderErr.length && y.reader === 'oldninth' && y.lines === y.here && y.lines2 === y.here && y.sathi && y.ottar && y.noMarrow && y.pruss && y.pruss.flag === 2 && !y.pruss.in && y.pruss.npc && y.pruss.text && y.slate && !y.audit.noNear.length && !y.audit.noStay.length
  ? ok(`a --from=1 style save (Marrow dead; Sathi, Mehet and Ottar walking): every node renders, the old marine reads, a line each at the fire by day and by night (${y.lines}); six walk, so Pruss waits at the heavies' baggage, and the slate still comes`) : no('synthetic ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b10ch1: FAIL (${bad.length})` : 'b10ch1: all ok'); process.exit(bad.length ? 1 : 0);
