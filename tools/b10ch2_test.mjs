// Book Ten, Chapter 2 (The Parting, src/182_b10_ch2.js): the halts, both keys from the same moment at Ennic's word, the reading at the horse-
// lines and the water wagon's tailboard (the Tiles; B10READ[2] by day; the card node the visions pass hooks onto), the fire (Witness shown, a
// rest, a line each by day and by night, the roster, the beat on the first night, Not now), Tirren's join at the first halt (the horse-lines;
// or waiting there when six walk), every fight's start and a forced win (both grounds of the deserters, and of the stragglers on 'adjunct'),
// the trick behind its ✦ hard check (taught, free, its battle half and its check half), the items (each with art), the Witness moves ('watch'
// +1 once when the foreigners are seen to go; the beat ±1), the thirst on 'adjunct' only, "Not now" on every onward step and a "yes, but" on
// every check, both roads ('escort' and 'adjunct'), the Third's one line (its Chapter 1 key, or its 'south' road), the lizard-folk on the road
// ("Che'Malle" once), from a fresh start and from a --from=2 style save with a transfer's squad (Perrit dead; Ilsa, Sorvan, Ruuk, Brune and
// Pessa walking).
// Usage: node tools/b10ch2_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who, ok = true) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(tt).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:ok ? 'clean' : 'fail', ok, pass:ok, margin:ok ? 6 : -6, nat:ok ? 18 : 3}, c); const g = ok ? c.go : (c.fail || c.go); if (typeof g === 'string') talk(g); else g(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tcg'); b10Use('l'); startExplore(area); };
  const npc = (area, id) => AREAS[area].npcs.find(n => n.id === id);
  const inj = () => Object.values(S.injury || {}).filter(v => v === 'b10thirst').length;
  /* a forced win, through the engine's own endBeat; a fight with a second ground goes through stageBreak */
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.kinds = B.units.filter(u => u.side === 'e').map(u => u.fid || u.key || u.type || u.name).join(','); res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b10_c2_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Ammanas|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Hedge|Cuttle|Bottle|Ruthan|Gudd|Quick Ben|Kalam|Deadsmell|Masan|Gilani|Keneb|Blistig|Tavore|Paran|Krughava|Tanakalian|Setoc|Syndecan|Stormy|Gesler|Kalyth|Bent\b|Abrastal|Felash|Spax|Brys|Beddict|Tehol|Aranict|Henar|Faint|Errastas|Elder|Forkrul|Crippled God|Perish|Nefarias|\bweeks?\b|\bmonths?\b|\btenday\b|\bdays? (?:ago|later)\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = tt(c); if (/undefined|NaN/.test(t) || never.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* "Che'Malle" said once in the chapter, by Ennic */
  const cheMalle = () => nodes.filter(k => { try { return /Che'Malle/.test(DLG[k]().txt); } catch (e) { return false; } });
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase, key and road */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), wit = new Set();
    const keep = JSON.stringify(S.f);
    const FL = ['b10_c2_orders', 'b10_c2_sparDone', 'b10_c2_desDone', 'b10_tirrenDone', 'b10_c2_watchDone', 'b10_c2_countDone', 'b10_c2_joined', 'b10_c2_dogsDone'];
    [1, 2, 3, 4].forEach(ph => ['watch', 'count', null].forEach(k => ['escort', 'adjunct'].forEach(rd => [...Array(1 << FL.length).keys()].forEach(fl => { S.f.b10_c2_ph = ph; S.f.b10_c2_key = k; S.f.b10_lRoad = rd;
      FL.forEach((f, i) => { S.f[f] = fl & (1 << i) ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (c.witness) wit.add(id); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); }))));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, wit:wit.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('tcg'); S = newStateTCG('Hask', 'Fresh'); S.picksDue = []; S.th.l.picksDue = []; save(); startChapter(2); clearModal();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, xp0:S.xp, wit0:b10Wit(), road:b10LRoad(), squad:S.squad.join(','), renderErr:renderAll(), title:CHAPTERS[2].title, nodes:nodes.length, areas:CHAPTERS[2].areas.length, fights:Object.keys(CHAPTERS[2].battles).length,
    items:Object.keys(CHAPTERS[2].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)),
    itemN:Object.keys(CHAPTERS[2].gear).length, coat:ITEMS.b10_c2_coat && ITEMS.b10_c2_coat.slot === 'armour' && ITEMS.b10_c2_coat.role === 'light' && ITEMS.b10_c2_coat.ac >= 2,
    spear:ITEMS.b10_c2_spear && ITEMS.b10_c2_spear.slot === 'weapon' && ITEMS.b10_c2_spear.role === 'reach', tally:ITEMS.b10_c2_tally && ITEMS.b10_c2_tally.slot === 'trinket',
    ownArt:['b10_c2_spear', 'b10_c2_coat', 'b10_c2_tally'].every(k => /b102/.test(ART['item/' + k])), fig:typeof FIGX.tirren === 'function' && /braid/.test(String(FIGX.tirren)), ground:typeof TILEX.b10_c2_ground === 'function',
    scenes:['b10_train', 'b10_south', 'b10_c2_dusk', 'b10_c2_halt', 'b10_glass_night'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), ownScenes:/b102/.test(String(SCENEX.b10_train)) && /b102/.test(String(SCENEX.b10_south)),
    fireRoster:(ROSTER_FIRES.tcg[2] || []).includes('b10_c2_fire'), thirst:inj() === 0, che:cheMalle(), audit:audit(), errant:PATRONS.sgt && PATRONS.sgt.god};
  /* the start: the horse-lines, the reading among the first halt's choices (by day) */
  talk('b10_c2_start'); out.f.ph = S.f.b10_c2_ph; out.f.tiles = has('b10_c2_start', /Sit with Perrit and the tiles/); out.f.horses = /horse-lines/.test(DLG.b10_c2_start().txt);
  talk('b10_c2_read'); const rd = DLG.b10_c2_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b10_c2_drawn, reader:S.f.b10_c2_reader, inPool:B10POOL[2].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B10READ[2].back, cardNode:cardNodeName(), cardSp:DLG.b10_c2_card().sp, cardBack:DLG.b10_c2_card().ch[0].go,
    again:!has('b10_c2_fire', /Sit with/), dayScene:rd.scene === 'b10_train' && /Afternoon on the rise/.test(rd.txt)};
  /* Tirren at the horse-lines: the first halt */
  talk('b10_c2_tirren'); out.b = {notNow:has('b10_c2_tirren', /Not now/), npc:npc('b10_c2_rise', 'tirren').show(), farrier:/farrier/.test(DLG.b10_c2_tirren().txt)}; take('b10_c2_tirren', /Waiting for us/);
  out.b.tally = /Horses lost/.test(DLG.b10_c2_tirren_why().txt); out.b.why = S.f.b10_c2_tirrenWhy === 1;
  take('b10_c2_tirren_why', /Walk with us/); clearModal(); out.b = Object.assign(out.b, {in:b10In('tirren'), flag:S.f.b10_tirrenDone, lvl:S.lvl, line:/Tirren/.test(DLG.b10_c2_fire_talk().txt), god:PATRONS.tirren ? PATRONS.tirren.god : null, gone:!npc('b10_c2_rise', 'tirren').show()});
  /* Ennic's word; the key not yet */
  out.e = {notNow:DLG.b10_c2_ennic().ch.some(c => /Not now/.test(tt(c)))}; talk('b10_c2_ennic'); out.e.orders = S.f.b10_c2_orders; take('b10_c2_ennic', /Where are we going/); out.e.where = S.f.b10_c2_where === 1 && /Kolanse/.test(DLG.b10_c2_ennic_where().txt);
  out.e.keyShut = !has('b10_c2_ennic', /The edge/);
  /* the trick: Yelt's water ledger */
  talk('b10_c2_yelt'); const dc = vis('b10_c2_yelt').find(c => c.trick);
  out.t = {dc:dc && dc.check[1], stat:dc && dc.check[0], noNear:dc && !dc.near, notNow:has('b10_c2_yelt', /Not now/), perrit:(edgesFor(dc, 'perrit').find(e => /sums/.test(e[0])) || [])[1] || 0, sgt:(edgesFor(dc, 'sgt').find(e => /ration book/.test(e[0])) || [])[1] || 0};
  made('b10_c2_yelt', /Count the next barrel/, 'perrit');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b10_c2_ledger && S.tricks.b10_c2_ledger.who, ok:S.f.b10_c2_ledgerOk, free:!!AB.t_b10_c2_ledger.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b10_c2_ledger.fx), again:!has('b10_c2_yelt', /Count the next/), left:trickLeft('pull')});
  { spendTrick('pull'); out.t.lend = trickBy('pull') === 'perrit'; if (S.tricks.pull && S.tricks.pull.b102) delete S.tricks.pull; out.t.spent = trickLeft('pull'); S.tricks.b10_c2_ledger.left = trickN('b10_c2_ledger'); }
  /* Orla: the tally, once; Saffa: the one line of the Third (its Chapter 1 key, default 'names') */
  talk('b10_c2_cart'); talk('b10_c2_cart'); out.tally = S.kit.filter(k => k === 'b10_c2_tally').length;
  talk('b10_c2_saffa'); out.rumour = /burial lines/.test(DLG.b10_c2_saffa().txt) && !/drill-sergeants/.test(DLG.b10_c2_saffa().txt);
  S.f.b10_c1_key = 'water'; out.rumourW = /wells/.test(DLG.b10_c2_saffa().txt); S.f.b10_tRoad = 'south'; out.rumourS = /drill-sergeants/.test(DLG.b10_c2_saffa().txt) && /Twelfth/.test(DLG.b10_c2_saffa().txt); delete S.f.b10_c1_key; S.f.b10_tRoad = 'adjunct';
  talk('b10_c2_overlook'); out.over = /lying up|cloaks/.test(DLG.b10_c2_overlook().txt) && S.f.b10_c2_looked === 1;
  talk('b10_c2_tailboard'); out.tw = has('b10_c2_tailboard', /Back to the train/);
  /* the wagons before the drill: shut */
  talk('b10_c2_wagons'); out.w0 = !has('b10_c2_wagons', /Straight down/);
  /* the drill: the Letherii's first fight (survive four) and the trick's battle half */
  talk('b10_c2_drill'); out.sp = {notNow:has('b10_c2_drill', /Not now/), surv:BATTLES.b10_c2_spar.objective && BATTLES.b10_c2_spar.objective.type === 'survive' && BATTLES.b10_c2_spar.objective.rounds === 4, tirren:/Tirren/.test(DLG.b10_c2_drill().txt)};
  startBattle('b10_c2_spar', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'perrit'); out.t.offered = trickOk(u, AB.t_b10_c2_ledger); AB.t_b10_c2_ledger.run(u); out.t.lucky = u.luckyTurn === B.turn; }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b10_c2_rise');
  out.sp.fight = await force('b10_c2_spar'); out.sp.done = S.f.b10_c2_sparDone === 1; out.sp.item = S.kit.includes('b10_c2_spear');
  /* the deserters at the water wagons ('escort'): main, two grounds, a spear of the line beside the squad */
  talk('b10_c2_wagons'); out.d = {notNow:has('b10_c2_wagons', /Not now/), straight:has('b10_c2_wagons', /Straight down/), tirren:/Copper/.test(DLG.b10_c2_wagons().txt)};
  { const sn = JSON.stringify(S); near('b10_c2_wagons', /far side of the row/, 'tobet'); out.d.near = ((S.bruised || {}).tobet || 0) > 0; restore(sn, 'b10_c2_rise'); }
  out.d.fight = await force('b10_c2_deserters'); out.d.done = S.f.b10_c2_desDone === 1; out.d.coat = S.kit.includes('b10_c2_coat'); out.d.lvl = S.lvl; out.d.xp = S.xp;
  out.d.bolk = BATTLES.b10_c2_deserters.foes.every(f => /lbolkando/.test(f[0]));
  /* the fire by day */
  talk('b10_c2_fire'); const f1 = DLG.b10_c2_fire(); out.fire1 = {html:/Witness/.test(f1.html || ''), talk:has('b10_c2_fire', /Talk with the squad/), rest:has('b10_c2_fire', /rest/), noOn:!vis('b10_c2_fire').some(c => c.onward), noBeat:!has('b10_c2_fire', /Why are they/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1]))};
  out.fire1.lines = DLG.b10_c2_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {tobet:4}; take('b10_c2_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b10_c2_rest1 === 1;
  /* the key from Ennic */
  talk('b10_c2_ennic'); const kn = DLG.b10_c2_ennic();
  out.k = {watch:has('b10_c2_ennic', /The edge/), count:has('b10_c2_ennic', /Yelt\. Every barrel/), notYet:has('b10_c2_ennic', /Not yet/), html:/Witness/.test(kn.html || ''), tirren:/Tirren/.test(kn.txt), fresh:npc('b10_c2_rise', 'ennic').fresh()};
  const snapK = JSON.stringify(S), witK = b10Wit(), loyK = {tobet:S.loy.tobet, brennet:S.loy.brennet, tirren:S.loy.tirren, thegg:S.loy.thegg};
  /* ================= key: watch ================= */
  take('b10_c2_ennic', /The edge/); out.a = {key:S.f.b10_c2_key, watched:S.f.b10_c2_watched, counted:S.f.b10_c2_counted == null, ph:S.f.b10_c2_ph, tobet:S.loy.tobet - loyK.tobet, wit0:b10Wit() - witK};
  take('b10_c2_key_watch', /Dusk/); out.a.area = S.area; out.a.arrive = S.node === 'b10_c2_dusk_arrive' && /onto the glass/.test(DLG.b10_c2_dusk_arrive().txt);
  out.a.fireShut = !has('b10_c2_fire', /South, with/); out.a.countShut = !vis('b10_c2_count').some(c => c.check);
  talk('b10_c2_edge'); const ec = vis('b10_c2_edge').find(c => c.check); out.a.edge = {wit:!!(ec && ec.witness), notNow:has('b10_c2_edge', /Not now/), edge:(edgesFor(ec, 'sgt').find(e => e[0] === 'Witness') || [null, 'none'])[1], html:/Witness/.test(DLG.b10_c2_edge().html || ''), tobet:(edgesFor(ec, 'tobet').find(e => /birds/.test(e[0])) || [])[1] || 0};
  { const sn = JSON.stringify(S); near('b10_c2_edge', /Keep the squad on the edge/, 'thegg'); out.a.edge.near = ((S.bruised || {}).thegg || 0) > 0; restore(sn, 'b10_c2_dusk'); }
  made('b10_c2_edge', /Keep the squad on the edge/, 'tobet'); out.a.done = S.f.b10_c2_watchDone; out.a.wit1 = b10Wit() - witK;
  talk('b10_c2_edge_ok'); out.a.once = b10Wit() - witK;
  talk('b10_c2_fire'); out.a.south = has('b10_c2_fire', /South, with the brigades/); out.a.southNot = has('b10_c2_fire', /Not now/); out.a.noBeat = !has('b10_c2_fire', /Why are they/);
  take('b10_c2_fire', /South, with the brigades/); out.a.southNode = S.node === 'b10_c2_south' && has('b10_c2_south', /Not now/);
  take('b10_c2_south', /South, with the brigades/); out.a.halt = {area:S.area, ph:S.f.b10_c2_ph, arrive:S.node === 'b10_c2_halt_arrive', horse:/dead horse|did not get up/.test(DLG.b10_c2_halt_arrive().txt), thirst:inj() === 0 && !S.f.b10_c2_thirst};
  /* the dogs at the dead horse (optional) */
  talk('b10_c2_carcass'); out.a.dogs = {notNow:has('b10_c2_carcass', /Not now/)}; out.a.dogs.fight = await force('b10_c2_dogs'); out.a.dogs.done = S.f.b10_c2_dogsDone === 1;
  talk('b10_c2_barrels'); out.a.barrelsQuiet = !vis('b10_c2_barrels').some(c => /On the carts/.test(tt(c)));
  /* the beat at the fire */
  talk('b10_c2_fire'); out.a.beatOffered = has('b10_c2_fire', /Why are they going\?/); out.a.onward = has('b10_c2_fire', /First light/); out.a.lines3 = DLG.b10_c2_fire_talk().txt.split('\n\n').length;
  take('b10_c2_fire', /Why are they going/); out.a.beat = {notNow:has('b10_c2_beat', /Not now/), n:vis('b10_c2_beat').length, html:/Witness/.test(DLG.b10_c2_beat().html || '')};
  { const sn = JSON.stringify(S); take('b10_c2_beat', /Not now/); out.a.beat.nothing = !b10BeatOf(2); restore(sn, 'b10_c2_halt'); }
  const wB = b10Wit(); take('b10_c2_beat', /reason we haven't been told/); out.a.beat.rec = b10BeatOf(2); out.a.beat.wit = b10Wit() - wB; out.a.beat.gone = !has('b10_c2_fire', /Why are they going/);
  /* the road south: the big ones */
  talk('b10_c2_onroad'); out.a.roadNot = has('b10_c2_onroad', /Not now/); take('b10_c2_onroad', /First light/); out.a.road = {area:S.area, ph:S.f.b10_c2_ph, arrive:S.node === 'b10_c2_road_arrive'};
  out.a.endShut = !has('b10_c2_onroad', /South, the long way/);
  talk('b10_c2_flank'); out.a.flank = {notNow:has('b10_c2_flank', /Not now/), tirren:(edgesFor(vis('b10_c2_flank').find(c => c.check), 'tirren').find(e => /horses know/.test(e[0])) || [])[1] || 0, riders:/two riders/.test(DLG.b10_c2_flank().txt)};
  { const sn = JSON.stringify(S); near('b10_c2_flank', /Get into the horse-lines/, 'thegg'); out.a.flank.near = ((S.bruised || {}).thegg || 0) > 0; restore(sn, 'b10_c2_road'); }
  made('b10_c2_flank', /Get into the horse-lines/, 'tirren'); out.a.flank.joined = S.f.b10_c2_joined;
  out.a.ennic = npc('b10_c2_road', 'ennic').fresh(); talk('b10_c2_ennic_road'); out.a.che = cheMalle();
  talk('b10_c2_onroad'); take('b10_c2_onroad', /South, the long way/); out.a.notYet = has('b10_c2_onward', /Not yet/); out.a.endText = /big ones/.test(DLG.b10_c2_onward().txt) && /Tirren/.test(DLG.b10_c2_onward().txt);
  const witA = b10Wit(); take('b10_c2_onward', /South, the long way round/); await wait(60);
  out.a.end = {view, ch:S.chapters[2], lvl:S.lvl, xp:S.xp, wit:witA, extras:CHAPTERS[2].extras().length, journal:CHAPTERS[2].journal().length, endText:(CHEND[2] || {}).watch && CHEND[2].watch[0], scene:CHAPTERS[2].endScene};
  /* ================= key: count, from the same moment ================= */
  restore(snapK, 'b10_c2_rise'); S.chapter = 2;
  take('b10_c2_ennic', /Yelt\. Every barrel/); out.q = {key:S.f.b10_c2_key, counted:S.f.b10_c2_counted, watched:S.f.b10_c2_watched == null, brennet:S.loy.brennet - loyK.brennet, tirren:S.loy.tirren - loyK.tirren, tobet:S.loy.tobet - loyK.tobet, wit0:b10Wit() - witK};
  take('b10_c2_key_count', /Dusk/); out.q.edgeShut = !vis('b10_c2_edge').some(c => c.check);
  talk('b10_c2_count'); out.q.notNow = has('b10_c2_count', /Not now/); out.q.html = /Witness/.test(DLG.b10_c2_count().html || ''); out.q.brennetTxt = /Brennet/.test(DLG.b10_c2_count().txt);
  out.q.ledgerEdge = (edgesFor(vis('b10_c2_count').find(c => c.check), 'perrit').find(e => /Yelt's way/.test(e[0])) || [])[1] || 0;
  { const sn = JSON.stringify(S); near('b10_c2_count', /Count every barrel/, 'tobet'); out.q.near = !!(S.rattled || {}).tobet; restore(sn, 'b10_c2_dusk'); }
  made('b10_c2_count', /Count every barrel/, 'perrit'); out.q.done = S.f.b10_c2_countDone; out.q.wit = b10Wit() - witK;
  take('b10_c2_fire', /South, with the brigades/); take('b10_c2_south', /South, with the brigades/);
  talk('b10_c2_fire'); const wQ = b10Wit(); take('b10_c2_fire', /Why are they going/); take('b10_c2_beat', /Foreigners\. Mad/); out.q.beat = b10BeatOf(2); out.q.beatWit = b10Wit() - wQ;
  take('b10_c2_fire', /First light/); take('b10_c2_onroad', /First light/); talk('b10_c2_flank'); made('b10_c2_flank', /Get into the horse-lines/, 'perrit', false); out.q.bolted = S.f.b10_c2_joined;
  talk('b10_c2_onroad'); take('b10_c2_onroad', /South, the long way/); const witQ = b10Wit(); take('b10_c2_onward', /South, the long way round/); await wait(60);
  out.q.end = {view, ch:S.chapters[2], wit:witQ, endText:CHEND[2].count[0], extras:CHAPTERS[2].extras().some(x => /counted every barrel/.test(x)), thirst:inj() === 0};
  /* ================= the 'adjunct' road, from the same moment (no deserters on the rise; the stragglers on the first night on the glass) ================= */
  restore(snapK, 'b10_c2_rise'); S.chapter = 2; S.f.b10_lRoad = 'adjunct'; delete S.f.b10_c2_desDone; delete (S.fxd || {}).b10_c2_deserters_after;
  out.u = {renderErr:renderAll(), keyReady:b102KeyReady(), wagonsQuiet:!has('b10_c2_wagons', /Straight down/), intro:/a few Letherii/.test(CHAPTERS[2].intro.paras[0]())};
  take('b10_c2_ennic', /The edge/); take('b10_c2_key_watch', /Dusk/); out.u.edge = /brigades/.test(DLG.b10_c2_edge().txt) && /Grey Helms/.test(DLG.b10_c2_edge().txt);
  made('b10_c2_edge', /Keep the squad on the edge/, 'tobet', false); out.u.done = S.f.b10_c2_watchDone; out.u.wit = b10Wit() - witK;
  talk('b10_c2_fire'); out.u.down = has('b10_c2_fire', /Down onto the glass/); take('b10_c2_fire', /Down onto the glass/); take('b10_c2_south', /Onto the glass/);
  out.u.halt = {area:S.area, scene:DLG.b10_c2_halt_arrive().scene, thirst:inj(), flag:S.f.b10_c2_thirst, glassTile:(() => { try { const cv = document.createElement('canvas'); cv.width = cv.height = 32; TILEX.b10_c2_ground(cv.getContext('2d'), '.', 1, 1, 32, true); return true; } catch (e) { return e.message; } })()};
  talk('b10_c2_halt_arrive'); out.u.halt.again = inj();
  talk('b10_c2_fire'); out.u.onShut = !has('b10_c2_fire', /On\. The column/); out.u.circle = DLG.b10_c2_fire().sp === 'The Sixth\'s circle' && /no fire|There is no fire/.test(DLG.b10_c2_fire().txt);
  talk('b10_c2_barrels'); out.u.bar = {notNow:has('b10_c2_barrels', /Not now/), stand:has('b10_c2_barrels', /On the carts/)};
  { const sn = JSON.stringify(S); near('b10_c2_barrels', /dark side of the column/, 'tobet'); out.u.bar.near = ((S.bruised || {}).tobet || 0) > 0; restore(sn, 'b10_c2_halt'); }
  out.u.fight = await force('b10_c2_deserters'); out.u.dbg = {node:S.node, des:S.f.b10_c2_desDone, view, scene:S.scene}; out.u.strag = BATTLES.b10_c2_deserters.foes.every(f => /lstraggler/.test(f[0])) && BATTLES.b10_c2_deserters.stage2.foes.some(f => /lringleader/.test(f[0])); out.u.desDone = S.f.b10_c2_desDone === 1;
  out.u.words = /stays down/.test(DLG.b10_c2_deserters_after().txt) && /back to his company/.test(DLG.b10_c2_deserters_after().txt);
  talk('b10_c2_fire'); take('b10_c2_fire', /Why are we/); take('b10_c2_beat', /Commander let us follow/); out.u.beat = b10BeatOf(2);
  talk('b10_c2_fire'); out.u.on = has('b10_c2_fire', /On\. The column/); take('b10_c2_fire', /On\. The column/); take('b10_c2_onroad', /On, into the glass/);
  out.u.onward = DLG.b10_c2_onward().scene === 'b10_glass_night' && has('b10_c2_onward', /Not yet/); out.u.renderErr2 = renderAll();
  take('b10_c2_onward', /East, into the glass/); await wait(60); out.u.end = {view, ch:S.chapters[2], scene:CHAPTERS[2].endScene, text:/brigades go south over the rise/.test(CHEND[2].watch[1])};
  /* ================= a --from=2 style save: a transfer's Letherii (Perrit dead; Ilsa, Sorvan, Ruuk, Brune and Pessa walking): six walk, so Tirren waits ================= */
  setBook('tcg'); S = newStateTCG('Hask', 'Syn'); b10Use('l'); S.squad = ['sgt', 'tobet', 'ilsa', 'sorvan', 'ruuk', 'brune']; S.camp = ['pessa', 'thegg', 'ammet', 'brennet', 'kaedra']; S.dead = {perrit:{ch:6, where:'the line', from:'dod'}};
  [...S.squad, ...S.camp].forEach(k => { if (k === 'sgt') return; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; b10Use('t'); S.picksDue = []; save(); startChapter(2); clearModal();
  out.y = {renderErr:renderAll(), reader:b10Rd().id, lines:DLG.b10_c2_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ilsa:/Ilsa/.test(DLG.b10_c2_fire_talk().txt), sorvan:/Sorvan/.test(DLG.b10_c2_fire_talk().txt), noPerrit:!/Perrit/.test(DLG.b10_c2_fire_talk().txt)};
  S.f.b10_c2_ph = 3; out.y.lines3 = DLG.b10_c2_fire_talk().txt.split('\n\n').length; S.f.b10_c2_ph = 1;
  talk('b10_c2_start'); take('b10_c2_start', /The farrier/); take('b10_c2_tirren', /Walk with us/); out.y.tirren = {flag:S.f.b10_tirrenDone, in:b10In('tirren'), wait:ROSTER_BOOKS.tcg.wait('tirren'), npc:npc('b10_c2_rise', 'tirren').show(), text:/Six walk/.test(DLG.b10_c2_tirren_join().txt)};
  take('b10_c2_tirren', /Walk with us/); out.y.tirren.waitedNode = /hoof in her lap/.test(DLG.b10_c2_tirren().txt) || b10In('tirren');
  out.y.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, b = r.b || {}, e = r.e || {}, t = r.t || {}, sp = r.sp || {}, d = r.d || {}, f1 = r.fire1 || {}, k = r.k || {}, a = r.a || {}, q = r.q || {}, u = r.u || {}, y = r.y || {};
if (f.area) {
  f.area === 'b10_c2_rise' && f.ch === 2 && f.thread === 'l' && f.lvl0 === 16 && f.wit0 === 5 && f.road === 'escort' && f.squad === 'sgt,tobet,thegg,perrit,ammet' && !f.renderErr.length && f.title === 'The Parting' && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 3 && f.coat && f.spear && f.tally && f.ownArt && f.fig && f.ground && f.scenes && f.ownScenes && f.fireRoster && f.thirst && f.che.length === 1 && f.che[0] === 'b10_c2_ennic_road' && f.errant === 'the Errant'
    ? ok(`a fresh start opens Chapter Two on the rise: the Letherii at level 16, Witness 5, on 'escort'; every b10_c2 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art and roles, no numbers in their lines; Tirren drawn; the ground, four backdrops of its own; "Che'Malle" said once, by Ennic; the Errant still answers`) : no('fresh ' + JSON.stringify(f).slice(0, 1600));
  const au = f.audit || {}; au.checks >= 5 && au.tricks === 1 && au.wit === 1 && !au.noNear.length && au.onwards >= 4 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none; one Witness check); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes), on both roads`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.tiles && f.horses ? ok('the first halt: the horse-lines, the reading offered') : no('start ' + JSON.stringify({ph:f.ph, tiles:f.tiles, horses:f.horses}));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.back === 'b10_c2_fire' && rd.cardNode === 'b10_c2_card' && rd.cardSp === 'The Tiles of the Holds' && rd.cardBack === 'b10_c2_fire' && rd.again && rd.dayScene ? ok('the reading: Perrit lays the tiles from B10POOL[2] (by day the water wagon on the rise in the heat); the card node is the visions pass\'s hook (b10_c2_card); back to b10_c2_fire; offered once') : no('reading ' + JSON.stringify(rd));
b.notNow && b.npc && b.farrier && b.tally && b.why && b.in && b.flag === 1 && b.line && b.god == null && b.gone ? ok('Tirren joins at the first halt at the horse-lines (her tally of horses lost; no god), with her line at the fire') : no('tirren ' + JSON.stringify(b));
e.orders === 1 && e.notNow && e.where && e.keyShut ? ok('Ennic: the brigades\' word, Kolanse; no key until the day\'s work is done') : no('ennic ' + JSON.stringify(e));
t.dc === 20 && t.stat === 'wits' && t.noNear && t.notNow && t.perrit === 2 && t.sgt === 1 && t.who === 'perrit' && t.ok === 1 && t.free && t.words && t.again && t.left >= 2 && t.spent === t.left - 1 && t.lend && t.offered && t.lucky
  ? ok(`the trick: the Water Ledger, a ✦ wits 20 check that names Yelt's ration book; free; its check half answers the engine's 'pull' (${t.left} a chapter), and in a fight its bearer rolls twice`) : no('trick ' + JSON.stringify(t));
r.tally === 1 && r.rumour && r.rumourW && r.rumourS && r.over && r.tw && r.w0 ? ok('Orla\'s tally once; Saffa\'s one line of the Third (the burial lines, the wells, or on its \'south\' road the drill-sergeants at the Twelfth); the overlook; the wagons shut before the drill') : no('train ' + JSON.stringify({tally:r.tally, rumour:r.rumour, rumourW:r.rumourW, rumourS:r.rumourS, over:r.over, tw:r.tw, w0:r.w0}));
sp.notNow && sp.surv && sp.tirren && sp.fight && sp.fight.started && sp.fight.after === 'b10_c2_spar_after' && sp.done && sp.item ? ok('the drill against the Ninth: survive four, the Letherii\'s first fight; the train-guard\'s spear') : no('spar ' + JSON.stringify(sp));
d.notNow && d.straight && d.tirren && d.near && d.fight && d.fight.started && d.fight.stage2 && d.fight.inStage2 && d.fight.allies === 1 && d.fight.after === 'b10_c2_deserters_after' && d.done && d.coat && d.bolk && d.lvl >= 17
  ? ok(`the Bolkando deserters at the water wagons: the row (${d.fight.foes} foes, a spear of the line beside the squad) and behind the wagons; a "yes, but" in the ditch; the dust-coat; level ${d.lvl}`) : no('deserters ' + JSON.stringify(d));
f1.html && f1.talk && f1.rest && f1.noOn && f1.noBeat && f1.notNow && f1.lines === f1.here && f1.rested ? ok(`the fire by day: Witness shown, a rest, the talk (a line each, ${f1.lines}), no beat and no way on yet, Not now`) : no('fire1 ' + JSON.stringify(f1));
k.watch && k.count && k.notYet && k.html && k.tirren && k.fresh ? ok('the key from Ennic: the edge or Yelt\'s barrels, Not yet; Witness shown; Tirren acknowledged') : no('key ' + JSON.stringify(k));
a.key === 'watch' && a.watched === 1 && a.counted && a.ph === 2 && a.tobet === 1 && a.wit0 === 0 && a.area === 'b10_c2_dusk' && a.arrive && a.fireShut && a.countShut && a.edge && a.edge.wit && a.edge.notNow && a.edge.edge === 'none' && a.edge.html && a.edge.tobet === 2 && a.edge.near && a.done === 'gone' && a.wit1 === 1 && a.once === 1
  ? ok('key watch: Tobet +1, S.f.b10_c2_watched; dusk on the rise; the edge (a Witness check; its "yes, but" a fall on the slope); the foreigners seen to go, Witness +1 once') : no('watch ' + JSON.stringify(a).slice(0, 1200));
a.south && a.southNot && a.noBeat && a.southNode && a.halt && a.halt.area === 'b10_c2_halt' && a.halt.ph === 3 && a.halt.arrive && a.halt.horse && a.halt.thirst && a.dogs && a.dogs.notNow && a.dogs.fight && a.dogs.fight.started && a.dogs.fight.dark && a.dogs.done && a.barrelsQuiet
  ? ok('the way south (Not now beside it); the first night\'s halt: a dead horse, no thirst on \'escort\'; the dogs at the carcass (optional, by night)') : no('halt ' + JSON.stringify({south:a.south, southNot:a.southNot, noBeat:a.noBeat, southNode:a.southNode, halt:a.halt, dogs:a.dogs, barrelsQuiet:a.barrelsQuiet}));
a.beatOffered && a.onward && a.lines3 === f1.here + 0 && a.beat && a.beat.notNow && a.beat.nothing && a.beat.n === 4 && a.beat.html && a.beat.rec === 'kept' && a.beat.wit === 1 && a.beat.gone
  ? ok('the beat at the fire on the first night ("Why are they going?": three answers and Not now, which records nothing); kept +1') : no('beat ' + JSON.stringify({beatOffered:a.beatOffered, onward:a.onward, lines3:a.lines3, beat:a.beat}));
a.roadNot && a.road && a.road.area === 'b10_c2_road' && a.road.ph === 4 && a.road.arrive && a.endShut && a.flank && a.flank.notNow && a.flank.tirren === 2 && a.flank.riders && a.flank.near && a.flank.joined === 'held' && a.ennic && a.che && a.che.length === 1 && a.notYet && a.endText && a.end && a.end.view === 'end' && a.end.ch === 'watch' && a.end.wit === 7 && a.end.lvl >= 17 && a.end.extras >= 5 && a.end.journal >= 6 && a.end.endText === 'Seen to go' && a.end.scene === 'b10_south'
  ? ok(`the road south: the big ones come in along the flank (two riders far off; the horse-lines held, a "yes, but" a horse coming down); Ennic says "Che'Malle" once; the end on watch: level ${a.end.lvl} (${a.end.xp} xp), Witness ${a.end.wit}`) : no('road ' + JSON.stringify(a).slice(0, 1400));
q.key === 'count' && q.counted === 1 && q.watched && q.brennet === 1 && q.tirren === 1 && q.tobet === 0 && q.wit0 === 0 && q.edgeShut && q.notNow && q.html && q.brennetTxt && q.ledgerEdge === 2 && q.near && q.done === 'true' && q.wit === 0 && q.beat === 'doubt' && q.beatWit === -1 && q.bolted === 'bolted' && q.end && q.end.view === 'end' && q.end.ch === 'count' && q.end.wit === 4 && q.end.endText === 'Every barrel counted' && q.end.extras && q.end.thirst
  ? ok(`key count, from the same moment: Brennet (with the train) and Tirren +1, S.f.b10_c2_counted; every barrel twice with Yelt (the ledger's edge; a "yes, but": rattled); Witness unmoved; the beat doubted −1; the horse-lines bolted; no thirst; the end on count, Witness ${q.end.wit}`) : no('count ' + JSON.stringify(q).slice(0, 1200));
u.renderErr && !u.renderErr.length && u.keyReady && u.wagonsQuiet && u.intro && u.edge && u.done === 'dark' && u.wit === 1 && u.down && u.halt && u.halt.area === 'b10_c2_halt' && u.halt.scene === 'b10_glass_night' && u.halt.thirst === 1 && u.halt.flag && u.halt.flag !== 'none' && u.halt.glassTile === true && u.halt.again === 1 && u.onShut && u.circle && u.bar && u.bar.notNow && u.bar.stand && u.bar.near && u.fight && u.fight.started && u.fight.stage2 && u.fight.dark && u.strag && u.desDone && u.words && u.beat === 'kept' && u.on && u.onward && u.renderErr2 && !u.renderErr2.length && u.end && u.end.view === 'end' && u.end.ch === 'watch' && u.end.scene === 'b10_glass_night' && u.end.text
  ? ok('the \'adjunct\' road: no deserters on the rise; the edge watches the brigades go south (missed, still seen, +1); down onto the glass; the first halt on the glass: the thirst once, no fire, stragglers who will not cross at the Sixth\'s barrels (two grounds, fought down, never killed in words); the end into the glass') : no('adjunct ' + JSON.stringify(u).slice(0, 1400));
y.renderErr && !y.renderErr.length && y.reader === 'tilewoman' && y.lines === y.here && y.lines3 === y.here && y.ilsa && y.sorvan && y.noPerrit && y.tirren && y.tirren.flag === 2 && !y.tirren.in && y.tirren.wait && y.tirren.npc && y.tirren.text && y.tirren.waitedNode && y.audit && !y.audit.noNear.length && !y.audit.noStay.length
  ? ok(`a --from=2 style save (Perrit dead; Ilsa, Sorvan, Ruuk and Brune walking): every node renders, the tile-woman reads, a line each at the fire by day and by night (${y.lines}); six walk, so Tirren waits at the horse-lines`) : no('synthetic ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b10ch2: FAIL (${bad.length})` : 'b10ch2: all ok'); process.exit(bad.length ? 1 : 0);
