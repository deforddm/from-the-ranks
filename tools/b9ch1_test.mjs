// Book Nine, Chapter 1 (Letheras, Emptied, src/161_b9_ch1.js): the halts, both keys from the same moment at the gate, the reading at the
// kit-crate (the Deck; and the card node the visions pass hooks onto), the fire (Rations shown, a rest, a line each, the roster, Not now),
// Brask's join at the first halt (the clerk's list; or waiting in the heavies' lines when six walk), every fight's start and a forced win
// (both grounds of the looters), the trick behind its ✦ hard check (taught, free, and its battle half), the items (each with art), the
// Rations moves (stores +2 at the dawn count; street: the alley's "yes, but" −1 and the household's loaf +1), "Not now" on every onward step
// and a "yes, but" on every check, from a fresh start and from a --from=1 style save with a transfer's squad (Marrow dead, Sathi, Mehet and
// Ottar walking).
// Usage: node tools/b9ch1_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('dod'); b9Use('t'); startExplore(area); };
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
  const nodes = Object.keys(DLG).filter(k => /^b9_c1_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Keneb|Blistig|Errant|Brys|Ublala|Kalam|\bweeks\b|\bmonths\b(?!.*fell)|Glass Desert|Forkrul/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(round|turn)s?\b/.test(n.txt.replace(/"[^"]*"/g, '')) && /\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set();
    const keep = JSON.stringify(S.f);
    [1, 2, 3, 4].forEach(ph => ['stores', 'street', null].forEach(k => [0, 1].forEach(fl => { S.f.b9_c1_ph = ph; S.f.b9_c1_key = k;
      ['b9_c1_orders1', 'b9_c1_horse', 'b9_c1_storesDone', 'b9_c1_house', 'b9_c1_boy', 'b9_c1_dawn', 'b9_c1_orders3', 'b9_c1_lootersDone', 'b9_c1_clerk'].forEach(f => { S.f[f] = fl ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('dod'); S = newStateDOD('Fresh', 'Brann'); S.picksDue = []; save(); startChapter(1);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, xp0:S.xp, rat0:b9Rations(), squad:S.squad.join(','), renderErr:renderAll(), title:CHAPTERS[1].title, nodes:nodes.length, areas:CHAPTERS[1].areas.length, fights:Object.keys(CHAPTERS[1].battles).length,
    shelf:BOOKS.dod.coming, items:Object.keys(CHAPTERS[1].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line.replace(/9th/g, ''))),
    itemN:Object.keys(CHAPTERS[1].gear).length, scale:ITEMS.b9_c1_heavyscale && ITEMS.b9_c1_heavyscale.slot === 'armour' && ITEMS.b9_c1_heavyscale.role === 'mail' && ITEMS.b9_c1_heavyscale.ac >= 3,
    tin:ITEMS.b9_c1_messtin && ITEMS.b9_c1_messtin.slot === 'trinket', knife:ITEMS.b9_c1_gutterknife && ITEMS.b9_c1_gutterknife.slot === 'weapon' && ITEMS.b9_c1_gutterknife.role === 'blade',
    figs:['brask', 'b9_c1_thallo'].every(k => typeof FIGX[k] === 'function'), ground:['b9_c1_barracks', 'b9_c1_quarter', 'b9_c1_taproom'].every(k => typeof TILEX[k] === 'function'),
    scenes:['b9_letheras_night', 'b9_barracks', 'b9_c1_street', 'b9_c1_stable', 'b9_c1_lanes', 'b9_c1_tavern'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.dod[1] || []).includes('b9_c1_fire'), audit:audit()};
  /* the start: the yard emptying, the reading among the first halt's choices */
  talk('b9_c1_start'); out.f.ph = S.f.b9_c1_ph; out.f.deck = has('b9_c1_start', /Sit with Marrow/); out.f.empty = /emptying/.test(DLG.b9_c1_start().txt);
  talk('b9_c1_read'); const rd = DLG.b9_c1_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b9_c1_drawn, reader:S.f.b9_c1_reader, inPool:B9POOL[1].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B9READ[1].back, cardNode:cardNodeName(), cardSp:DLG.b9_c1_card().sp, cardBack:DLG.b9_c1_card().ch[0].go, again:!has('b9_c1_fire', /Sit with/)};
  /* Thallo: the captain's word; the why check's "yes, but", then made */
  talk('b9_c1_thallo'); out.th = {orders:S.f.b9_c1_orders1, notNow:has('b9_c1_thallo', /Not now/)}; take('b9_c1_thallo', /Why is everybody/);
  { const sn = JSON.stringify(S); near('b9_c1_thallo_why', /Press him/, 'haddat'); out.th.near = !!(S.rattled || {}).haddat; restore(sn, 'b9_c1_yard'); }
  made('b9_c1_thallo_why', /Press him/, 'haddat'); out.th.more = S.f.b9_c1_whyMore === 1 && S.f.b9_c1_why === 1;
  out.th.womanShut = !AREAS.b9_c1_yard.npcs.find(n => n.id === 'woman').show(); talk('b9_c1_fire'); out.th.fireShut = !has('b9_c1_fire', /woman/);
  /* the clerk's list: Brask joins at the first halt */
  talk('b9_c1_clerk'); take('b9_c1_clerk', /heavy with the kit/); out.b = {notNow:has('b9_c1_brask', /Not now/)}; take('b9_c1_brask', /What happened/); out.b.stick = /tally-stick/.test(DLG.b9_c1_brask_squad().txt);
  take('b9_c1_brask_squad', /Walk with us/); clearModal(); out.b = Object.assign(out.b, {in:b9In('brask'), flag:S.f.b9_braskDone, lvl:S.lvl, line:/Brask/.test(DLG.b9_c1_fire_talk().txt), god:PATRONS.brask ? PATRONS.brask.god : null});
  /* the bunk-house: the mess-tin, once */
  talk('b9_c1_bunk'); talk('b9_c1_bunk'); out.tin = S.kit.filter(k => k === 'b9_c1_messtin').length;
  /* the fire before the key */
  talk('b9_c1_fire'); const f1 = DLG.b9_c1_fire(); out.fire1 = {html:/Rations/.test(f1.html || ''), talk:has('b9_c1_fire', /Talk with the squad/), rest:has('b9_c1_fire', /rest/), woman:has('b9_c1_fire', /woman/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t)};
  out.fire1.lines = DLG.b9_c1_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {haddat:4}; take('b9_c1_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b9_c1_rest1 === 1;
  talk('b9_c1_stable'); out.fire1.sheet = /under a sheet/.test(DLG.b9_c1_stable().txt) && !S.f.b9_c1_horse;
  /* the key at the gate */
  out.k = {npc:AREAS.b9_c1_yard.npcs.find(n => n.id === 'woman').show()}; talk('b9_c1_gate'); take('b9_c1_gate', /The woman/);
  const kn = DLG.b9_c1_woman(); out.k = Object.assign(out.k, {stores:has('b9_c1_woman', /The stores/), street:has('b9_c1_woman', /We go with her/), notYet:has('b9_c1_woman', /Not yet/), html:/Rations/.test(kn.html || ''), brask:/Brask/.test(kn.txt)});
  const snapK = JSON.stringify(S), ratK = b9Rations(), loyK = {haddat:S.loy.haddat, marrow:S.loy.marrow};
  /* ================= key: stores ================= */
  take('b9_c1_woman', /The stores/); out.s = {key:S.f.b9_c1_key, ph:S.f.b9_c1_ph, street:S.f.b9_c1_street == null, rat:b9Rations() - ratK};
  take('b9_c1_key_stores', /The watch/); out.s.thievesShut = !AREAS.b9_c1_yard.npcs.find(n => n.id === 'thieves').show();
  talk('b9_c1_stable'); out.s.horse = S.f.b9_c1_horse === 1 && S.f.b9_c1_roof === 1; out.s.horseText = /lying down in the straw again/.test(DLG.b9_c1_stable().txt);
  out.s.thieves = AREAS.b9_c1_yard.npcs.find(n => n.id === 'thieves').show(); out.s.notNow = has('b9_c1_thieves', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c1_thieves', /Wait in the dark/, 'tangle'); out.s.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b9_c1_yard'); }
  out.s.fight = await force('b9_c1_stores'); out.s.done = S.f.b9_c1_storesDone; out.s.afterNot = has('b9_c1_stores_after', /Not now/);
  take('b9_c1_stores_after', /Dawn/); out.s.counted = S.f.b9_c1_counted === 1; out.s.rat2 = b9Rations() - ratK; out.s.tier = b9RatTier(); out.s.dawnNot = has('b9_c1_dawn_stores', /Not now/);
  talk('b9_c1_dawn_stores'); out.s.once = b9Rations() - ratK;
  take('b9_c1_dawn_stores', /days after/); out.m = {area:S.area, ph:S.f.b9_c1_ph};
  /* the muster: Thallo's word, the captain, the quartermaster's scale, the drill sergeant's roll (the trick) */
  talk('b9_c1_gate3'); out.m.gateShut = !has('b9_c1_gate3', /quarter/);
  take('b9_c1_muster_arrive', /Thallo/); out.m.orders = S.f.b9_c1_orders3 === 1 && /Letherii are mustering their escort/.test(DLG.b9_c1_thallo3().txt);
  talk('b9_c1_captain'); out.m.captain = S.f.b9_c1_captain === 1;
  talk('b9_c1_qm'); out.m.scale = S.kit.includes('b9_c1_heavyscale') && /sat on my stores/.test(DLG.b9_c1_qm().txt);
  talk('b9_c1_drill'); const dc = vis('b9_c1_drill').find(c => c.trick); out.t = {dc:dc && dc.check[1], stat:dc && dc.check[0], noNear:dc && !dc.near, notNow:has('b9_c1_drill', /Not now/), brask:(edgesFor(dc, 'brask').find(e => /answering this roll/.test(e[0])) || [])[1] || 0, musters:(edgesFor(dc, 'sgt').find(e => /musters/.test(e[0])) || [])[1] || 0};
  made('b9_c1_drill', /Learn the roll/, 'brask');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b9_c1_rollcall && S.tricks.b9_c1_rollcall.who, ok:S.f.b9_c1_rollOk, free:!!AB.t_b9_c1_rollcall.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b9_c1_rollcall.fx), again:!has('b9_c1_drill', /Learn/)});
  /* the quarter by day: the looters (the book's first fight, two grounds), the knife */
  take('b9_c1_gate3', /emptied quarter/); out.l = {area:S.area, notNow:has('b9_c1_looted', /Not now/)};
  { const sn = JSON.stringify(S); near('b9_c1_looted', /Round by the next yard/, 'mehet' in TPL && b9In('mehet') ? 'mehet' : 'tangle'); out.l.near = Object.values(S.bruised || {}).some(v => v > 0); restore(sn, 'b9_c1_lanes'); }
  out.l.fight = await force('b9_c1_looters'); out.l.done = S.f.b9_c1_lootersDone; out.l.knife = S.kit.includes('b9_c1_gutterknife'); out.l.ph = S.f.b9_c1_ph;
  /* the trick's battle half, in a fight */
  startBattle('b9_c1_brawl', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'brask'); out.t.offered = trickOk(u, AB.t_b9_c1_rollcall); AB.t_b9_c1_rollcall.run(u); out.t.line = !!B.line && B.line.u === u; }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b9_c1_lanes');
  /* the tavern: the round, the talk's "yes, but" (money is the scene), the brawl */
  talk('b9_c1_tavern'); out.v = {round:has('b9_c1_tavern', /round/), outside:has('b9_c1_tavern', /Outside/), notNow:has('b9_c1_tavern', /Not now/)};
  { const sn = JSON.stringify(S), s0 = S.silver; near('b9_c1_tavern', /Talk them down/, 'haddat'); out.v.near = s0 - S.silver; restore(sn, 'b9_c1_lanes'); }
  out.v.fight = await force('b9_c1_brawl'); out.v.done = S.f.b9_c1_brawlDone; out.v.map = /map/.test(DLG.b9_c1_brawl_after().txt);
  /* the household by day on 'stores': a shut door, no loaf */
  const rh = b9Rations(); talk('b9_c1_house_day'); out.v.noLoaf = b9Rations() === rh && !S.f.b9_c1_bread;
  /* back, the fire, the end on stores */
  take('b9_c1_lanes_back', /Back to the barracks/); talk('b9_c1_fire'); out.e = {onward:has('b9_c1_fire', /The march/), rest:has('b9_c1_fire', /rest/), html:/Rations/.test(DLG.b9_c1_fire().html || '')};
  out.e.lines = DLG.b9_c1_fire_talk().txt.split('\n\n').length; out.e.here = S.squad.filter(id => id !== 'sgt').length;
  take('b9_c1_fire', /The march/); out.e.notYet = has('b9_c1_onward', /Not yet/); out.e.brask = /Brask answers/.test(DLG.b9_c1_onward().txt); out.e.html = /Rations/.test(DLG.b9_c1_onward().html || '');
  const ratS = b9Rations(); take('b9_c1_onward', /East/); await wait(60);
  out.e = Object.assign(out.e, {view, ch:S.chapters[1], lvl:S.lvl, xp:S.xp, rat:ratS, extras:CHAPTERS[1].extras().length, journal:CHAPTERS[1].journal().length, endText:(CHEND[1] || {}).stores && CHEND[1].stores[0], keyFlag:S.f.b9_c1_key});
  /* ================= key: street, from the same moment ================= */
  restore(snapK, 'b9_c1_yard'); S.chapter = 1;
  take('b9_c1_woman', /We go with her/); out.q = {key:S.f.b9_c1_key, street:S.f.b9_c1_street, ph:S.f.b9_c1_ph, haddat:S.loy.haddat - loyK.haddat, marrow:S.loy.marrow - loyK.marrow};
  take('b9_c1_key_street', /Up the lane/); out.q.area = S.area; out.q.arrive = S.node === 'b9_c1_street_arrive';
  out.q.alleyShut = !has('b9_c1_alley', /Go in slowly/); out.q.backShut = !has('b9_c1_street_back', /Into the yard/);
  talk('b9_c1_house'); out.q.house = S.f.b9_c1_house === 1; out.q.houseNot = has('b9_c1_house', /Not now/); out.q.yardShut = !has('b9_c1_house', /The yard/);
  take('b9_c1_house', /The alley/); out.q.alleyNot = has('b9_c1_alley', /Not now/);
  { const sn = JSON.stringify(S), r0 = b9Rations(); near('b9_c1_alley', /Go in slowly/, 'haddat'); out.q.near = b9Rations() - r0; restore(sn, 'b9_c1_quarter'); }
  made('b9_c1_alley', /Go in slowly/, 'haddat'); out.q.boy = S.f.b9_c1_boy;
  take('b9_c1_boy_ok', /mother/); take('b9_c1_house', /The yard/); out.q.horse = S.f.b9_c1_horse === 1 && S.f.b9_c1_roof === 1 && /Then nothing more/.test(DLG.b9_c1_yardgate().txt); out.q.yardNot = has('b9_c1_yardgate', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c1_yardgate', /Drag it out/, 'brask'); out.q.horseNear = ((S.bruised || {}).brask || 0) > 0; restore(sn, 'b9_c1_quarter'); }
  made('b9_c1_yardgate', /Drag it out/, 'brask'); out.q.out = S.f.b9_c1_horseOut;
  take('b9_c1_horse_ok', /Sit the night/); out.q.dawn = S.f.b9_c1_dawn === 1; out.q.dawnNot = has('b9_c1_street_dawn', /Not now/);
  take('b9_c1_street_dawn', /Back to the barracks/); out.q.once = /Counted once/.test(DLG.b9_c1_street_back().txt); out.q.backNot = has('b9_c1_street_back', /Not now/);
  take('b9_c1_street_back', /Into the yard/); out.q.muster = S.area; out.q.ph3 = S.f.b9_c1_ph; out.q.rat = b9Rations() - ratK;
  talk('b9_c1_qm'); out.q.scale = S.kit.includes('b9_c1_heavyscale') && /went walking/.test(DLG.b9_c1_qm().txt);
  take('b9_c1_muster_arrive', /Thallo/); take('b9_c1_gate3', /emptied quarter/); const rl = b9Rations(); talk('b9_c1_house_day'); out.q.loaf = b9Rations() - rl; talk('b9_c1_house_day'); out.q.loafOnce = b9Rations() - rl;
  out.q.fight = await force('b9_c1_looters'); take('b9_c1_lanes_back', /Back to the barracks/); talk('b9_c1_gate3'); take('b9_c1_gate3', /The march/);
  out.q.waving = /waving/.test(DLG.b9_c1_onward().txt); const ratQ = b9Rations(); take('b9_c1_onward', /East/); await wait(60);
  out.q.end = {view, ch:S.chapters[1], rat:ratQ, lvl:S.lvl, extras:CHAPTERS[1].extras().some(x => /household/.test(x)), endText:CHEND[1].street[0]};
  /* ================= a --from=1 style save: a transfer's Third (Marrow dead; Sathi, Mehet and Ottar walking): six walk, so Brask waits ================= */
  setBook('dod'); S = newStateDOD('Syn', 'Brann'); S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'mehet', 'ottar']; delete S.dead.sathi; S.dead.marrow = {ch:6, where:'the Barrow', from:'rg'};
  ['sathi', 'mehet', 'ottar'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(1);
  out.y = {renderErr:renderAll(), reader:b9Rd().id, lines:DLG.b9_c1_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b9_c1_fire_talk().txt), ottar:/Ottar/.test(DLG.b9_c1_fire_talk().txt), noMarrow:!/Marrow/.test(DLG.b9_c1_fire_talk().txt)};
  S.f.b9_c1_ph = 3; out.y.lines3 = DLG.b9_c1_fire_talk().txt.split('\n\n').length; S.f.b9_c1_ph = 1;
  talk('b9_c1_clerk'); take('b9_c1_clerk', /heavy with the kit/); take('b9_c1_brask', /Walk with us/); out.y.brask = {flag:S.f.b9_braskDone, in:b9In('brask'), wait:ROSTER_BOOKS.dod.wait('brask'), npc:AREAS.b9_c1_yard.npcs.find(n => n.id === 'brask').show(), text:/six already walk/.test(DLG.b9_c1_brask_join().txt)};
  out.y.woman = AREAS.b9_c1_yard.npcs.find(n => n.id === 'woman').show() === false; S.f.b9_c1_orders1 = 1; out.y.woman2 = AREAS.b9_c1_yard.npcs.find(n => n.id === 'woman').show();
  out.y.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, th = r.th || {}, b = r.b || {}, f1 = r.fire1 || {}, k = r.k || {}, s = r.s || {}, m = r.m || {}, t = r.t || {}, l = r.l || {}, v = r.v || {}, e = r.e || {}, q = r.q || {}, y = r.y || {};
if (f.area) {
  f.area === 'b9_c1_yard' && f.ch === 1 && f.thread === 't' && f.lvl0 === 19 && f.rat0 === 6 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && !f.renderErr.length && f.title === 'Letheras, Emptied' && f.shelf === false && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 3 && f.scale && f.tin && f.knife && f.figs && f.ground && f.scenes && f.fireRoster
    ? ok(`a fresh start opens Chapter One in the barracks yard: the Third at level 19, Rations 6; every b9_c1 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with art and roles, no numbers in their lines; Brask and Thallo drawn; three grounds, six backdrops`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 5 && au.tricks === 1 && !au.noNear.length && au.onwards >= 7 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.empty ? ok('the start: the yard emptying, the reading offered at the first halt') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.back === 'b9_c1_fire' && rd.cardNode === 'b9_c1_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b9_c1_fire' && rd.again ? ok('the reading at the kit-crate: Marrow draws from B9POOL[1]; the card node is the visions pass\'s hook (b9_c1_card); back to b9_c1_fire; offered once') : no('reading ' + JSON.stringify(rd));
th.orders === 1 && th.notNow && th.near && th.more && th.womanShut && th.fireShut ? ok('Thallo: the captain\'s word on the stores; the why check (a "yes, but": rattled); nobody at the gate until Brask is settled') : no('thallo ' + JSON.stringify(th));
b.notNow && b.stick && b.in && b.flag === 1 && b.line && b.god == null ? ok(`Brask joins at the first halt off the clerk's list (his old squad's tally-stick; no god), with his line at the fire`) : no('brask ' + JSON.stringify(b));
r.tin === 1 ? ok('the 9th\'s empty bunk-house: the mess-tin, once') : no('tin ' + r.tin);
f1.html && f1.talk && f1.rest && f1.woman && f1.notNow && f1.lines === f1.here && f1.rested && f1.sheet ? ok(`the fire before the key: Rations shown, a rest (wounds close), the talk (a line each, ${f1.lines}), the way to the gate, Not now; the dead horse under its sheet`) : no('fire1 ' + JSON.stringify(f1));
k.npc && k.stores && k.street && k.notYet && k.html && k.brask ? ok('the key at the gate: stores, street, Not yet; Rations shown; Brask acknowledged') : no('key ' + JSON.stringify(k));
s.key === 'stores' && s.ph === 2 && s.street && s.rat === 0 && s.thievesShut && s.horse && s.horseText && s.thieves && s.notNow && s.near && s.fight && s.fight.started && s.fight.dark && s.fight.after === 'b9_c1_stores_after' && s.done === 1 && s.afterNot && s.counted && s.rat2 === 2 && s.tier === 'full' && s.once === 2 && s.dawnNot && m.area === 'b9_c1_muster' && m.ph === 3
  ? ok(`key stores: the dead horse stands, the roof goes in; thieves at the stores (${s.fight.foes}; a "yes, but" on the ambush); the dawn count, Rations +2 once (to ${s.tier}); on to the muster`) : no('stores ' + JSON.stringify(s).slice(0, 900));
m.gateShut && m.orders && m.captain && m.scale ? ok('the muster: Thallo\'s word (and one line of the Letherii escort), the captain seen, the quartermaster\'s heavy scale') : no('muster ' + JSON.stringify(m));
t.dc === 19 && t.stat === 'wits' && t.noNear && t.notNow && t.brask === 2 && t.musters === 1 && t.who === 'brask' && t.ok === 1 && t.free && t.words && t.again && t.offered && t.line ? ok('the trick: The Roll at the Gate, a ✦ wits 19 check that names the Fourteenth\'s musters and the Gate Drill; free (its words end on the one-free-trick line); in a fight it holds the line') : no('trick ' + JSON.stringify(t));
l.area === 'b9_c1_lanes' && l.notNow && l.near && l.fight && l.fight.started && l.fight.stage2 && l.fight.inStage2 && l.fight.allies === 1 && l.fight.after === 'b9_c1_looters_after' && l.done === 1 && l.knife && l.ph === 4 ? ok(`the looters: the lane (${l.fight.foes} foes, a heavy beside the Third) and the yard behind; a "yes, but" on the yard wall; the gutter-knife`) : no('looters ' + JSON.stringify(l));
v.round && v.outside && v.notNow && v.near === 3 && v.fight && v.fight.started && v.fight.after === 'b9_c1_brawl_after' && v.done === 1 && v.map && v.noLoaf ? ok('the tavern: a round, the talk (its "yes, but" a round on the Malazans, three silver: money is the scene), the brawl; the shut door on stores') : no('tavern ' + JSON.stringify(v));
e.onward && e.notYet && e.brask && e.html && e.view === 'end' && e.ch === 'stores' && e.keyFlag === 'stores' && e.lvl >= 20 && e.rat === 8 && e.extras >= 5 && e.journal >= 7 && e.endText === 'The stores counted twice' && e.lines === e.here
  ? ok(`the end on stores: out of the gate at first light (Not yet offered; Brask answers his old names); level ${e.lvl} (${e.xp} xp), Rations ${e.rat}`) : no('end ' + JSON.stringify(e));
q.key === 'street' && q.street === 1 && q.ph === 2 && q.haddat === 1 && q.marrow === 1 && q.area === 'b9_c1_quarter' && q.arrive && q.alleyShut && q.backShut && q.house && q.houseNot && q.yardShut && q.alleyNot && q.near === -1 && q.boy === 'found' && q.horse && q.yardNot && q.horseNear && q.out === 'out' && q.dawn && q.dawnNot && q.once && q.backNot && q.muster === 'b9_c1_muster' && q.ph3 === 3 && q.rat === 0 && q.scale && q.loaf === 1 && q.loafOnce === 1 && q.fight && q.waving && q.end && q.end.view === 'end' && q.end.ch === 'street' && q.end.rat === 7 && q.end.lvl >= 20 && q.end.extras && q.end.endText === 'A household in the quarter'
  ? ok(`key street, from the same moment: Haddat and Marrow +1, S.f.b9_c1_street; the quarter, the boy in the alley (a "yes, but": a ration of bread), the dead horse stands and lies down, the roof goes in; dragged out (a "yes, but": skin); dawn, Thallo counted once; the loaf +1 once; the end on street, Rations ${q.end.rat}`) : no('street ' + JSON.stringify(q).slice(0, 1200));
y.renderErr && !y.renderErr.length && y.reader === 'oldninth' && y.lines === y.here && y.lines3 === y.here && y.sathi && y.ottar && y.noMarrow && y.brask && y.brask.flag === 2 && !y.brask.in && y.brask.wait && y.brask.npc && y.brask.text && y.woman && y.woman2 && !y.audit.noNear.length && !y.audit.noStay.length
  ? ok(`a --from=1 style save (Marrow dead; Sathi, Mehet and Ottar walking): every node renders, the old marine reads, a line each at the fire by night and by day (${y.lines}); six walk, so Brask waits in the heavies' lines, and the woman comes once he is settled`) : no('synthetic ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b9ch1: FAIL (${bad.length})` : 'b9ch1: all ok'); process.exit(bad.length ? 1 : 0);
