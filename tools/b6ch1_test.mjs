// Book Six, Chapter 1 (The Lato Odhan, src/101_b6_ch1.js): the chapter's halts, both keys, the reading, the fire (rest, talk, fever),
// every fight's start and a forced win (both grounds of the rearguard), the well's fever caught and cured (at the surgeon's and at the
// fire), Mehet's join (and the waiting road), the trick (taught, and its battle half), the Odhan veil against shots, and the chapter's
// end; from a fresh start, and from a --from=1 style save with Sathi alive and Book Four's spares walking, where every node must still
// render and every squadmate has a line at the fire.
// Usage: node tools/b6ch1_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  /* a fight forced: both grounds when there are two, then the engine's own end (endBeat, so a feverRisk fight passes the fever on) */
  const force = async (id, also) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark;
    if (also) await also(res);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b6_c1_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{|Bonehunter/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  try {
  /* ================= a fresh start ================= */
  setBook('bh'); S = newStateBH('Fresh', 'Other'); S.picksDue = []; save(); startChapter(1);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, renderErr:renderAll(), title:CHAPTERS[1].title, nodes:nodes.length, areas:CHAPTERS[1].areas.length, fights:Object.keys(CHAPTERS[1].battles).length,
    sathiDead:!!S.dead.sathi, shelf:BOOKS.bh.coming};
  talk('b6_c1_start'); out.f.ph = S.f.b6_c1_ph; out.f.deckChoice = has('b6_c1_start', /Deck/); out.f.startNotNow = vis('b6_c1_start').some(c => /Walk the camp/.test(c.t));
  /* the reading at the first halt: Marrow reads */
  talk('b6_c1_deck'); const dk = DLG.b6_c1_deck(); const lay = dk.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.f.deck = {drawn:S.f.b6_c1_drawn, reader:S.f.b6_c1_reader, card:S.card, inPool:B6POOL[1].includes(S.card), notNow:dk.ch.some(c => /Not now/.test(c.t)), back:B6DECK[1].back};
  talk('b6_c1_card'); out.f.cardNode = DLG.b6_c1_card().sp;
  /* the fire: an again line, a rest, the talk (a line each), the roster, Not now */
  talk('b6_c1_fire'); const fy = DLG.b6_c1_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b6_c1_fire', /rest/), talk:has('b6_c1_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:ROSTER_FIRES.bh[1].includes('b6_c1_fire'), html:/fever/i.test(fy.html || '')};
  take('b6_c1_fire', /Let the squad rest/); out.f.rested = S.f.b6_c1_rest1;
  out.f.talkLines = DLG.b6_c1_fire_talk().txt.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  /* the captain, the quartermaster, the old soldier */
  out.f.noSleepYet = !has('b6_c1_fire', /Turn in/);
  talk('b6_c1_captain'); out.f.orders = S.f.b6_c1_orders1; take('b6_c1_captain', /What's ahead/); out.f.capNews = S.f.b6_c1_capNews;
  const sv = S.inv.salve, ss = S.silver; talk('b6_c1_qm'); take('b6_c1_qm', /^A salve/); out.f.qm = {salve:S.inv.salve - sv, silver:ss - S.silver};
  talk('b6_c1_oldsoldier'); out.f.oldNotNow = has('b6_c1_oldsoldier', /Not now/); made('b6_c1_oldsoldier', /wells/, 'haddat'); out.f.warned = S.f.b6_c1_wellWarned;
  /* the night, the march, the road */
  talk('b6_c1_fire'); take('b6_c1_fire', /Turn in/); out.f.slept = S.f.b6_c1_slept; take('b6_c1_sleep1', /First light/); take('b6_c1_march', /Ahead/);
  out.f.road = {area:S.area, ph:S.f.b6_c1_ph};
  talk('b6_c1_to_wash'); out.f.washGated = !has('b6_c1_to_wash', /Straight at them/);
  /* the well: the fight passes the fever on */
  talk('b6_c1_well_arrive'); out.f.wellNotNow = has('b6_c1_well_arrive', /Not now/); out.f.wellSneak = has('b6_c1_well_arrive', /Round by the rocks/);
  const fev0 = b6FeverList().length;
  out.f.well = await force('b6_c1_well'); out.f.well.risk = BATTLES.b6_c1_well.feverRisk; out.f.well.fevered = b6FeverList().length - fev0; out.f.well.caught = (S.stats || {}).b6Caught || 0;
  out.f.well.kit = S.kit.includes('b6_c1_wellrope') && S.kit.includes('b6_c1_odhanveil'); out.f.well.done = S.f.b6_c1_wellDone;
  talk('b6_c1_well_arrive'); made('b6_c1_well_arrive', /Clear the well/, 'darrut' in TPL && b6In('darrut') ? 'darrut' : 'haddat'); out.f.wellClean = S.f.b6_c1_wellClean;
  /* the rearguard: both grounds */
  talk('b6_c1_to_wash'); out.f.washNotNow = has('b6_c1_to_wash', /Not now/);
  out.f.rear = await force('b6_c1_rearguard'); out.f.rear.tulwar = S.kit.includes('b6_c1_rebeltulwar'); out.f.rear.done = S.f.b6_c1_rearDone;
  take('b6_c1_rear_after', /wounded one/); out.f.news = S.f.b6_c1_news && /Lothal/.test(DLG.b6_c1_prisoner().txt) && /Falah'd/.test(DLG.b6_c1_prisoner().txt);
  const lh = S.loy.haddat; take('b6_c1_prisoner', /captain's wagon/); out.f.prisoner = {flag:S.f.b6_c1_prisoner, haddat:S.loy.haddat - lh};
  take('b6_c1_prisoner_kept', /On, to the city/); take('b6_c1_to_city', /Into the 9th's lines/); out.f.camp = {area:S.area, ph:S.f.b6_c1_ph};
  /* the surgeon breaks the fever */
  talk('b6_c1_surgeon'); out.f.surgeonOffers = has('b6_c1_surgeon', /break the fever/); take('b6_c1_surgeon', /break the fever/); out.f.cured = {left:b6FeverList().length, n:(S.stats || {}).b6Cured || 0};
  /* the fever again, and the fire's healer breaks it (Marrow) */
  b6Catch('tangle', 'test'); talk('b6_c1_fire'); out.f.fireFever = has('b6_c1_fire', /fever/); take('b6_c1_fire', /fever/); take('b6_c1_fire_fever', /break it/); out.f.fireCured = !b6Fevered('tangle') && ((S.stats || {}).b6Cured || 0) === out.f.cured.n + 1;
  /* the camp: the captain, the column, the runner, the diggers */
  talk('b6_c1_to_barrows'); out.f.barrowsGated = !has('b6_c1_to_barrows', /Out to the barrow road/);
  talk('b6_c1_captain_camp'); take('b6_c1_captain_camp', /barrow road/); out.f.orders3 = S.f.b6_c1_orders3 && S.f.b6_c1_barrowsTold;
  talk('b6_c1_column'); out.f.sort = S.f.b6_c1_sortSeen && /Faradan Sort/.test(DLG.b6_c1_column().txt);
  talk('b6_c1_runner'); out.f.rumour = S.f.b6_c1_rumour && /Blistig/.test(DLG.b6_c1_runner().txt) && /Host/.test(DLG.b6_c1_runner().txt);
  talk('b6_c1_dig'); near('b6_c1_dig', /pick/, 'haddat'); out.f.digNear = ((S.bruised || {}).haddat || 0) > 0;
  /* the camp's edge: Mehet, the knives from the postern */
  talk('b6_c1_edge'); take('b6_c1_edge', /man with the keys/); out.f.met = S.f.b6_c1_mehetMet; take('b6_c1_mehet_meet', /Wait with them/);
  out.f.edgeNotNow = has('b6_c1_edge_night', /Not now/);
  out.f.edge = await force('b6_c1_edge');
  const snapE = JSON.stringify(S);
  /* the waiting road: Mehet stays with the townsfolk, then joins from the edge */
  take('b6_c1_edge_after', /Stay with your people/); out.f.wait = {flag:S.f.b6_mehetDone, roster:ROSTER_BOOKS.bh.wait('mehet')};
  talk('b6_c1_edge'); take('b6_c1_edge', /Walk with us/); out.f.wait.joined = b6In('mehet') && S.f.b6_mehetDone === 1;
  S = JSON.parse(snapE); save(); setBook('bh');
  take('b6_c1_edge_after', /Then walk with us/); out.f.join = {in:b6In('mehet'), flag:S.f.b6_mehetDone, fire:/Mehet/.test(DLG.b6_c1_fire_talk().txt)};
  /* the trick: the Potter's Map, learned by Mehet's own hand here */
  take('b6_c1_mehet_join', /Show us the city/); out.f.mapNotNow = has('b6_c1_map', /Not now/); made('b6_c1_map', /Learn the map/, 'haddat');
  out.f.trick = {who:S.tricks && S.tricks.b6_c1_map && S.tricks.b6_c1_map.who, ok:S.f.b6_c1_mapOk, fx:/flanked/.test(TRICKS.b6_c1_map.fx), dc:vis('b6_c1_map').length === 1};
  /* its battle half, and the veil against shots */
  startBattle('b6_c1_patrol', {}); await wait(60);
  { const u = B.units.find(x => x.id === 'haddat'), m = B.units.find(x => x.side === 'p' && x.id !== 'haddat' && !x.ally && cheb(x, u) === 1) || B.units.find(x => x.side === 'p' && x.id !== 'haddat');
    out.f.trick.offered = trickOk(u, AB.t_b6_c1_map); const ac0 = atkCalc(B.units.find(x => x.side === 'e'), u).ac; AB.t_b6_c1_map.run(u); out.f.trick.covers = lineCovers(u); out.f.trick.ac = atkCalc(B.units.find(x => x.side === 'e'), u).ac - ac0; B.line = null;
    const bow = B.units.find(x => x.side === 'e' && x.rng > 1); S.gear.haddat = Object.assign({}, S.gear.haddat, {armour:'b6_c1_odhanveil'}); bow.x = u.x; bow.y = Math.max(0, u.y - 4);
    const shot0 = atkCalc(bow, u).ac; S.gear.haddat.armour = null; delete S.gear.haddat.armour; const shot1 = atkCalc(bow, u).ac; out.f.veil = shot0 - shot1; }
  B = null; view = 'scene'; S.scene = 'talk';
  /* the barrow road */
  talk('b6_c1_fire'); take('b6_c1_fire', /barrow road/); take('b6_c1_to_barrows_go', /Along the road/); out.f.barrows = {area:S.area, ph:S.f.b6_c1_ph, mehet:/Mehet/.test(DLG.b6_c1_barrows_arrive().txt)};
  talk('b6_c1_lantern'); out.f.names = S.f.b6_c1_names && /Sathi/.test(DLG.b6_c1_lantern().txt);
  talk('b6_c1_barrow'); out.f.keyNotYet = has('b6_c1_barrow', /Not yet/); out.f.keyMehet = /Mehet/.test(DLG.b6_c1_barrow().txt);
  const snap = JSON.stringify(S), lb = {haddat:S.loy.haddat, tangle:S.loy.tangle};
  /* ================= key: bury ================= */
  take('b6_c1_barrow', /Put them back/); out.b = {key:S.f.b6_c1_key, haddat:S.loy.haddat - lb.haddat, haddatWant:Math.min(2, 3 - lb.haddat), tangle:S.loy.tangle - lb.tangle, tangleWant:Math.max(-1, -3 - lb.tangle)};
  take('b6_c1_bury', /Up the shields/); out.b.patrolNotNow = has('b6_c1_patrol_start', /Not now/); out.b.npc = AREAS.b6_c1_barrows.npcs.find(n => n.id === 'patrol').show();
  out.b.patrol = await force('b6_c1_patrol'); out.b.done = S.f.b6_c1_patrolDone;
  take('b6_c1_patrol_after', /Wait for dawn/); out.b.dawn = /fresh earth/.test(DLG.b6_c1_dawn().txt); out.b.notYet = has('b6_c1_dawn', /Not yet/);
  take('b6_c1_dawn', /siege/); await wait(60); out.b.end = {view, ch:S.chapters[1], lvl:S.lvl, xp:S.xp};
  out.b.extras = CHAPTERS[1].extras().length; out.b.journal = CHAPTERS[1].journal().length; out.b.endText = (CHEND[1] || {}).bury && CHEND[1].bury[0];
  /* ================= key: leave, from the same moment ================= */
  S = JSON.parse(snap); save(); setBook('bh'); startExplore('b6_c1_barrows'); G.said = {};
  S.wounds = {haddat:5}; talk('b6_c1_barrow'); take('b6_c1_barrow', /Leave them/); out.l = {key:S.f.b6_c1_key, rested:!S.wounds, haddat:S.loy.haddat - lb.haddat, tangle:S.loy.tangle - lb.tangle, noPatrol:!AREAS.b6_c1_barrows.npcs.find(n => n.id === 'patrol').show()};
  take('b6_c1_leave', /Wait for dawn/); out.l.dawn = /open/.test(DLG.b6_c1_dawn().txt);
  take('b6_c1_dawn', /siege/); await wait(60); out.l.end = {view, ch:S.chapters[1], lvl:S.lvl};
  /* ================= a --from=1 style save: Sathi alive, Book Four's spares and Ramin walking ================= */
  setBook('bh'); S = newStateBH('Syn', 'Other'); delete S.dead.sathi; S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'tallow', 'rasp']; ['sathi', 'tallow', 'rasp'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(1);
  out.y = {renderErr:renderAll(), lines:DLG.b6_c1_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b6_c1_fire_talk().txt), reader:visReader().id};
  /* and a squad with no healer: the fire cannot break the fever, the surgeon can */
  S.squad = ['sgt', 'tangle', 'sathi', 'tallow']; b6Catch('tallow', 'test'); out.y.noHealer = !b6CanCure() && !has('b6_c1_fire_fever', /break it/); b6Cure('tallow', 'test');
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, b = r.b || {}, l = r.l || {}, y = r.y || {};
if (f.area) {
  f.area === 'b6_c1_odhan' && f.ch === 1 && f.thread === 'r' && f.lvl0 === 12 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && f.sathiDead && !f.renderErr.length && f.title === 'The Lato Odhan' && f.shelf === false ? ok(`a fresh start opens Chapter One on the Odhan at level 12 with the Third (Sathi dead); every b6_c1 node renders (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights)`) : no('fresh ' + JSON.stringify(f).slice(0, 900));
  f.ph === 1 && f.deckChoice && f.startNotNow && f.deck.drawn === 1 && f.deck.reader === 'marrow' && f.deck.inPool && f.deck.notNow && f.deck.back === 'b6_c1_fire' && f.cardNode === 'The Deck of Dragons' ? ok(`the first halt: the Deck offered; Marrow reads (${f.deck.card}); back to b6_c1_fire`) : no('halt/deck ' + JSON.stringify([f.ph, f.deckChoice, f.deck, f.cardNode]));
  f.fire.again && f.fire.rest && f.fire.talk && f.fire.notNow && f.fire.roster && f.fire.html && f.rested === 1 && f.talkLines === f.squadHere ? ok(`the fire: an again line, the fever box, a rest, the talk (a line each, ${f.talkLines}), the roster, Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere]));
  f.noSleepYet && f.orders === 1 && f.capNews === 1 && f.qm.salve === 1 && f.qm.silver === 4 && f.oldNotNow && f.warned === 1 ? ok('the captain\'s orders and news; the quartermaster\'s salve (4 silver); the old soldier\'s word on the well') : no('camp1 ' + JSON.stringify([f.noSleepYet, f.orders, f.capNews, f.qm, f.warned]));
  f.slept === 1 && f.road.area === 'b6_c1_road' && f.road.ph === 2 && f.washGated ? ok('the night, the march, the road by day (the wash waits on the well)') : no('road ' + JSON.stringify([f.slept, f.road, f.washGated]));
  f.wellNotNow && f.wellSneak && f.well.started && f.well.after === 'b6_c1_well_after' && f.well.risk === 'the well water' && f.well.fevered === 1 && f.well.caught >= 1 && f.well.kit && f.well.done === 1 && f.wellClean === 1 ? ok('the well: a forced win, the fever caught ("the well water"), the rope and the veil, the well cleared') : no('well ' + JSON.stringify([f.well, f.wellClean]));
  f.washNotNow && f.rear.started && f.rear.stage2 && f.rear.inStage2 && f.rear.after === 'b6_c1_rear_after' && f.rear.tulwar && f.rear.done === 1 && f.news && f.prisoner.flag === 'kept' && f.prisoner.haddat === 1 ? ok('the rearguard: both grounds forced, the tulwar; the prisoner\'s news (the Falah\'d, Lothal); kept for the captain (Haddat +1)') : no('rear ' + JSON.stringify([f.rear, f.news, f.prisoner]));
  f.camp.area === 'b6_c1_camp' && f.camp.ph === 3 && f.surgeonOffers && f.cured.left === 0 && f.cured.n >= 1 && f.fireFever && f.fireCured ? ok('the camp before Y\'Ghatan; the fever broken by the surgeon, and again at the fire by Marrow') : no('camp/cure ' + JSON.stringify([f.camp, f.surgeonOffers, f.cured, f.fireFever, f.fireCured]));
  f.barrowsGated && f.orders3 && f.sort && f.rumour && f.digNear ? ok('the barrow road waits on the orders; the captain, Faradan Sort\'s column (seen), the runner\'s rumour (Blistig, the Host), the diggers\' "yes, but"') : no('camp2 ' + JSON.stringify([f.barrowsGated, f.orders3, f.sort, f.rumour, f.digNear]));
  f.met && f.edgeNotNow && f.edge.started && f.edge.dark && f.edge.after === 'b6_c1_edge_after' && f.wait.flag === 2 && f.wait.roster && f.wait.joined && f.join.in && f.join.flag === 1 && f.join.fire ? ok('the camp\'s edge: Mehet met, the knives from the postern (a forced win); Mehet waits, then joins; or joins at once, with his line at the fire') : no('edge/join ' + JSON.stringify([f.met, f.edge, f.wait, f.join]));
  f.mapNotNow && f.trick.who === 'haddat' && f.trick.ok === 1 && f.trick.fx && f.trick.offered && f.trick.covers && f.trick.ac >= 3 && f.veil === 1 ? ok(`the trick: the Potter's Map, taught by Mehet (+${f.trick.ac} armour, no flanking, in a fight); the Odhan veil +1 against shots`) : no('trick ' + JSON.stringify([f.trick, f.veil]));
  f.barrows.area === 'b6_c1_barrows' && f.barrows.ph === 4 && f.barrows.mehet && f.names && f.keyNotYet && f.keyMehet ? ok('the barrow road at night: the opened barrows, Mehet\'s word, Sathi\'s name at the lantern, the key with Not yet') : no('barrows ' + JSON.stringify([f.barrows, f.names, f.keyNotYet, f.keyMehet]));
}
b.key === 'bury' && b.haddat === b.haddatWant && b.tangle === b.tangleWant && b.patrolNotNow && b.npc && b.patrol && b.patrol.started && b.patrol.after === 'b6_c1_patrol_after' && b.done === 1 && b.dawn && b.notYet && b.end && b.end.view === 'end' && b.end.ch === 'bury' && b.end.lvl >= 13 && b.extras >= 3 && b.journal >= 5 && b.endText === 'The barrows' ? ok(`key bury: Haddat +2 (to the cap), Tangle −1; the patrol off the walls (forced win); dawn; the chapter's end at level ${b.end.lvl} (${b.end.xp} xp)`) : no('bury ' + JSON.stringify(b));
l.key === 'leave' && l.rested && l.haddat === -1 && l.tangle === 1 && l.noPatrol && l.dawn && l.end && l.end.view === 'end' && l.end.ch === 'leave' && l.end.lvl >= 13 ? ok(`key leave: the squad rests (wounds close), Haddat −1, Tangle +1; no patrol; dawn with the barrows open; the end at level ${l.end.lvl}`) : no('leave ' + JSON.stringify(l));
y.renderErr && !y.renderErr.length && y.lines === y.here && y.sathi && y.reader === 'marrow' || (y.renderErr && !y.renderErr.length && y.lines === y.here && y.sathi && y.reader === 'tallow') ? ok(`a --from=1 style save (Sathi alive, Tallow and Rasp walking, no Marrow): every node renders, a line each at the fire (${y.lines}), ${y.reader} reads`) : no('synthetic ' + JSON.stringify(y));
y.noHealer ? ok('with no healer walking the fire cannot break the fever (the surgeon can)') : no('no healer ' + JSON.stringify(y.noHealer));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b6ch1: FAIL (${bad.length})` : 'b6ch1: all ok'); process.exit(bad.length ? 1 : 0);
