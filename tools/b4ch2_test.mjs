// Book Four, Chapter 2 (Coltaine's Fall, src/72_b4_ch2.js): the chapter's halts, both keys, every fight's start and a forced win (both
// grounds of each), the trick, the fire and the swap; from a fresh start, and from a Book Two transfer with Sathi alive and Ramin walking.
// Usage: node tools/b4ch2_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  /* take the visible choice whose words match, run its effect, and go where it goes (a node, or a function) */
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  /* a check made: the roll settles clean for whoever is named (a trick check teaches them) */
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  /* a fight forced: both grounds, then the node after it */
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.regs = B.def.b4Regs || 0; res.dog = B.units.some(u => u.kind === 'hackle');
    res.foes = B.units.filter(u => u.side === 'e').length;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.regs2 = B.units.filter(u => u.b4reg).length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b4_c2_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\$\{/.test(n.txt)) errs.push(k + ': leak'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const at9 = () => { S.lvl = 9; S.xp = LEVELS[8]; S.picksDue = []; S.f.b4_c1_key = 'grave'; S.f.b4_bone = 'grave'; S.f.b4_company = 1; S.chapters = {1:'grave'}; };
  try {
  /* ================= a fresh start, at the start of Chapter Two ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); at9(); S.kit.push('b4_c1_durhangpipe', 'b4_c1_relic'); save(); startChapter(2);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, n0:S.nerve, nodes:nodes.length, renderErr:renderAll(), keys:B4KEYS[2].join(',')};
  talk('b4_c2_start'); take('b4_c2_start', /Walk/);
  talk('b4_c2_tree'); take('b4_c2_tree', /Pick it up/); out.f.fetish = S.kit.includes('b4_c2_fetish'); out.f.treeFlag = S.f.b4_c2_tree;
  const na = S.nerve; talk('b4_c2_axes'); made('b4_c2_axes', /Adjunct's order/, 'haddat'); out.f.axes = {flag:S.f.b4_c2_axes, nerve:S.nerve - na};
  talk('b4_c2_hollet_road'); const nh = S.nerve; take('b4_c2_hollet_road', /take the front/); out.f.front = {flag:S.f.b4_c2_front, nerve:S.nerve - nh};
  talk('b4_c2_radde_road'); take('b4_c2_radde_road', /the Barrow/); out.f.called = S.f.b4_c2_called;
  talk('b4_c2_crows'); out.f.crows = S.f.b4_c2_crowsRefuse;
  talk('b4_c2_hillview'); out.f.barrow = {seen:S.f.b4_barrowSeen, sathi:/Sathi is up there/.test(DLG.b4_c2_hillview().txt), hackle:/Hackle/.test(DLG.b4_c2_hillview().txt), names:/says names/.test(DLG.b4_c2_hillview().txt)};
  talk('b4_c2_ask'); out.f.askOpts = vis('b4_c2_ask').length; take('b4_c2_ask', /Haddat will tell/); out.f.ask = S.f.b4_c2_ask;
  talk('b4_c2_milestone'); take('b4_c2_milestone', /Take the chip/); out.f.chip = S.kit.includes('b4_c2_milestone');
  talk('b4_c2_cart'); made('b4_c2_cart', /Get water/, 'marrow'); out.f.cart = S.f.b4_c2_cart;
  talk('b4_c2_to_camp'); out.f.stdNotNow = has('b4_c2_to_camp', /Not now/); out.f.std = S.f.b4_c2_standard; take('b4_c2_to_camp', /night's camp/);
  out.f.camp = {area:S.area, ph:S.f.b4_c2_ph, node:S.node, deck:has('b4_c2_camp_arrive', /Deck/)};
  /* the reading */
  talk('b4_c2_deck'); const dk = DLG.b4_c2_deck(); runFx(dk.ch.find(c => /draw/.test(c.t))); out.f.deck = {drawn:S.f.b4_c2_drawn, reader:S.f.b4_c2_reader, card:S.card, inPool:B4POOL[2].includes(S.card)}; talk('b4_c2_card');
  /* the fire: a hub with an again line; a rest; the squad's talk, a line each; the pipe; the way on with Not now */
  talk('b4_c2_fire'); const fy = DLG.b4_c2_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b4_c2_fire', /rest/), talk:has('b4_c2_fire', /Talk with the squad/), on:has('b4_c2_fire', /Up the path/), notNow:has('b4_c2_fire', /Not now/), pipe:has('b4_c2_fire', /pipe/)};
  take('b4_c2_fire', /Let the squad rest/); out.f.rested = S.f.b4_c2_rest2;
  out.f.talkLines = DLG.b4_c2_fire_talk().txt.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  talk('b4_c2_marines'); out.f.duiker = S.f.b4_c2_duiker && /Empty/.test(DLG.b4_c2_marines().txt) && !/alive|lives/.test(DLG.b4_c2_marines().txt);
  talk('b4_c2_oldsoldier'); talk('b4_c2_hollet_camp'); talk('b4_c2_radde_camp');
  take('b4_c2_radde_camp', /Up the hill/); take('b4_c2_path', /Up the hill/); out.f.hill = {area:S.area, node:S.node};
  /* the trick */
  talk('b4_c2_pilgrim'); made('b4_c2_pilgrim', /Teach us the word/, 'haddat'); out.f.trick = S.tricks && S.tricks.b4_c2_crow && S.tricks.b4_c2_crow.who; out.f.spirit = !!(TRICKS.b4_c2_crow.spirit && AB.t_b4_c2_crow.spirit);
  /* the robbers at dusk, both grounds */
  talk('b4_c2_robbers_go'); out.f.robNotNow = has('b4_c2_robbers_go', /Not now/);
  out.f.rob = await force('b4_c2_robbers'); out.f.robDone = S.f.b4_c2_robbersDone;
  take('b4_c2_robbers_after', /Down to the camp/); out.f.night = {area:S.area, node:S.node, ph:S.f.b4_c2_ph};
  out.f.keyNotNow = has('b4_c2_key', /moment/); out.f.noTemul = !AREAS.b4_c2_camp.npcs.find(n => n.id === 'temul').show();
  const snap = JSON.stringify(S);
  /* key: fall */
  S.loy.haddat = 0; S.loy.marrow = 0; const n2 = S.nerve, h2 = S.loy.haddat, m2 = S.loy.marrow; talk('b4_c2_key'); take('b4_c2_key', /goes up the hill/); out.g = {notYet:has('b4_c2_key_fall', /Not yet/), tangle:/dead don't need the cusser/.test(DLG.b4_c2_key_fall().txt)};
  take('b4_c2_key_fall', /Up the hill, with the pilgrims/); Object.assign(out.g, {key:S.f.b4_c2_key, climbed:S.f.b4_fallClimbed, nerve:S.nerve - n2, haddat:S.loy.haddat - h2, marrow:S.loy.marrow - m2, area:S.area, node:S.node});
  take('b4_c2_climb', /Sit with the pilgrims/); out.g.relicOpt = has('b4_c2_names', /Coltaine's finger/); out.g.noFeather = !has('b4_c2_names', /feather/);
  take('b4_c2_names', /Coltaine's finger/); out.g.relicLeft = S.f.b4_c2_relicLeft && !S.kit.includes('b4_c1_relic');
  take('b4_c2_names', /Keep the watch/); out.g.waitNotNow = has('b4_c2_hill_wait', /Not now/);
  out.g.hill = await force('b4_c2_hill'); out.g.done = S.f.b4_c2_hillDone;
  take('b4_c2_hill_after', /Down to the column/); out.g.morn = {area:S.area, node:S.node, news:S.f.b4_news, ph:S.f.b4_c2_ph};
  out.g.belief = /the camp is saying/.test(DLG.b4_c2_dawn_arrive().txt);
  talk('b4_c2_hollet_news'); take('b4_c2_hollet_news', /Chain was dead/); out.g.doubt = S.f.b4_c2_doubt;
  talk('b4_c2_fear'); out.g.widget = /Nerve/.test(DLG.b4_c2_fear().html || ''); out.g.tallow = /Tallow/.test(DLG.b4_c2_fear().txt); const n3 = S.nerve; take('b4_c2_fear', /whole company/); out.g.fear = {flag:S.f.b4_c2_fear, nerve:S.nerve - n3};
  talk('b4_c2_radde_dawn'); out.g.rear = /at the back/.test(DLG.b4_c2_radde_dawn().txt);
  talk('b4_c2_fire'); out.g.noRest = !has('b4_c2_fire', /Sit an hour/); out.g.fallIn = has('b4_c2_fire', /Fall in/);
  take('b4_c2_fire', /Fall in/); take('b4_c2_dawn', /North/); await wait(50); out.g.end = {view, ch:S.chapters[2], lvl:S.lvl, nerve:S.nerve, xp:S.xp};
  out.g.extras = CHAPTERS[2].extras().length; out.g.journal = CHAPTERS[2].journal().length;
  /* key: march, from the same moment */
  S = JSON.parse(snap); save(); startExplore('b4_c2_camp');
  const n4 = S.nerve, h4 = S.loy.haddat; talk('b4_c2_key'); take('b4_c2_key', /keeps its place/); take('b4_c2_key_march', /To the line/);
  out.c = {key:S.f.b4_c2_key, climbed:S.f.b4_fallClimbed, nerve:S.nerve - n4, haddat:S.loy.haddat - h4, node:S.node, lineNpc:AREAS.b4_c2_camp.npcs.find(n => n.id === 'line').show(), notNow:has('b4_c2_line', /Not now/)};
  out.c.probe = await force('b4_c2_probe'); out.c.done = S.f.b4_c2_probeDone;
  take('b4_c2_probe_after', /Sleep/); out.c.morn = {area:S.area, news:S.f.b4_news};
  talk('b4_c2_fire'); out.c.rest = has('b4_c2_fire', /Sit an hour before the march/); take('b4_c2_fire', /Sit an hour before/);
  talk('b4_c2_radde_dawn'); out.c.held = /the place held/.test(DLG.b4_c2_radde_dawn().txt);
  talk('b4_c2_fire'); take('b4_c2_fire', /Fall in/); take('b4_c2_dawn', /North/); await wait(50); out.c.end = {view, ch:S.chapters[2], lvl:S.lvl, nerve:S.nerve};

  /* ================= a Book Two transfer on the Wickan road: Sathi alive, Ramin walking, Keth waiting ================= */
  setBook('hoc'); S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'wickans', lvl:9, mates:['haddat', 'sathi', 'tangle', 'marrow'], dead:[], ramin:true, keth:true,
    f:{b2_c7_key:'wickans', b2_c6_key:'whole', b2_hackleBack:0, keepsakes:['b2_bluethread']}};
  delete S.dead.sathi; S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'marrow']; migrate(S); at9(); S.f.b4_c1_key = 'chain'; S.f.b4_bone = 'chain'; S.f.b4_c1_token = 'feather'; S.chapters = {1:'chain'};
  if (!S.kit.includes('b2_bluethread')) S.kit.push('b2_bluethread'); S.f.b4_kethDone = 2; save(); b4Join('redblade'); startChapter(2);
  out.t = {renderErr:renderAll(), ramin:b4In('redblade'), squad:S.squad.join(',')};
  out.t.nobody = /None of the squad is up there/.test(DLG.b4_c2_hillview().txt);
  out.t.recruitNamed = ['b4_c2_start', 'b4_c2_fire_talk', 'b4_c2_key', 'b4_c2_dawn', 'b4_c2_line', 'b4_c2_names', 'b4_c2_crows', 'b4_c2_pilgrim'].filter(k => /Ramin/.test(DLG[k]().txt)).length;
  out.t.sathiEdge = edgesFor(vis('b4_c2_pilgrim').find(c => c.check), 'sathi').some(e => e[1] === 2);
  S.f.b4_c2_ph = 2; startExplore('b4_c2_hill'); out.t.rob = await force('b4_c2_robbers'); // Hackle at Sathi's knee
  startExplore('b4_c2_camp'); talk('b4_c2_night'); out.t.temulShow = AREAS.b4_c2_camp.npcs.find(n => n.id === 'temul').show(); talk('b4_c2_temul'); out.t.temul = S.f.b4_temulPast;
  talk('b4_c2_fire'); out.t.swapOffered = has('b4_c2_fire', /Send for Keth/); take('b4_c2_fire', /Send for Keth/); S.picksDue = []; // a recruit who joins brings a talent pick; settle it
  out.t.swap = {keth:b4In('warlock'), ramin:b4In('redblade'), raminWaits:S.f.b4_raminDone === 2, kethFlag:S.f.b4_kethDone};
  out.t.kethLine = /Keth/.test(DLG.b4_c2_fire_talk().txt) && DLG.b4_c2_fire_talk().txt.split('\n\n').length === S.squad.filter(id => id !== 'sgt').length + (b42Dog() && !b4In('sathi') ? 1 : 0);
  talk('b4_c2_key'); out.t.kethKey = /grandmother/.test(DLG.b4_c2_key().txt); take('b4_c2_key', /goes up the hill/); take('b4_c2_key_fall', /Up the hill, with the pilgrims/);
  out.t.keepOpt = has('b4_c2_names', /Leave .*blue/i); out.t.featherOpt = has('b4_c2_names', /feather/);
  take('b4_c2_names', /feather/); out.t.feather = S.kit.includes('b4_c2_crowfeather');
  take('b4_c2_names', /Leave .*blue/i); out.t.keepLeft = S.f.b4_c2_keepLeft === 'b2_bluethread' && !S.kit.includes('b2_bluethread');
  /* the trick in a fight: the crows strike the blow again; the whetstone's first blow */
  S.tricks = {b4_c2_crow:{who:'sathi', ch:2, left:null}}; equip('haddat', 'b4_c2_milestone'); if (!S.kit.includes('b4_c2_milestone')) S.kit.push('b4_c2_milestone');
  startBattle('b4_c2_hill', {}); await wait(60);
  const bearer = B.units.find(u => u.id === 'sathi'), foe = B.units.find(u => u.side === 'e'); out.t.ab = trickAbs('sathi').includes('t_b4_c2_crow');
  AB.t_b4_c2_crow.run(bearer); out.t.crowOn = !!B.b4crow; let crows = 0; for (let i = 0; i < 30; i++) { bearer.hp = bearer.maxhp; const n0 = B.log.length; attack(foe, bearer); if (B.log.slice(0, B.log.length - n0 + 1).some(l => /The crows/.test(l))) crows++; }
  out.t.crows = crows; squadTurnStart(bearer); out.t.crowOff = !B.b4crow;
  const had = B.units.find(u => u.id === 'haddat'); foe.ac = 1; for (let i = 0; i < 5 && !had.b4whet; i++) attack(had, foe); out.t.whet = !!had.b4whet;
  B.over = true; B = null;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, g = r.g || {}, c = r.c || {}, t = r.t || {};
if (f.area) {
  f.area === 'b4_c2_road' && f.ch === 2 && f.lvl0 === 9 && f.keys === 'fall,march' && !f.renderErr.length ? ok(`a fresh start opens Chapter Two on the Aren Way at level 9; all ${f.nodes} b4_c2 nodes render`) : no('fresh ' + JSON.stringify(f));
  f.fetish && f.treeFlag && f.axes.flag === 'stopped' && f.axes.nerve === 1 && f.front.flag === 1 && f.front.nerve === 1 && f.called === 'barrow' && f.crows ? ok('the road: the fetish picked up, the 10th\'s axe stopped (a check, Nerve +1), the front of the company (Nerve +1), the hill\'s two names, the Crow refuse Temul') : no('road ' + JSON.stringify(f));
  f.barrow.seen === 1 && f.barrow.sathi && f.barrow.hackle && f.barrow.names && f.askOpts === 3 && f.ask === 'names' ? ok('the Barrow seen from the road (b4_barrowSeen), Sathi\'s one line and Hackle\'s absence, Haddat\'s names; the new soldiers ask (three answers)') : no('barrow ' + JSON.stringify([f.barrow, f.askOpts, f.ask]));
  f.chip && f.cart === 'ok' && f.std === 1 && f.stdNotNow ? ok('the milestone chip, the sick boy at the water cart, the standard raised far off (Not now offered)') : no('road2 ' + JSON.stringify([f.chip, f.cart, f.std, f.stdNotNow]));
  f.camp.area === 'b4_c2_camp' && f.camp.ph === 2 && f.camp.deck && f.deck.drawn === 1 && f.deck.reader === 'marrow' && f.deck.inPool ? ok(`the first halt below the Fall, the Deck (Marrow reads: ${f.deck.card})`) : no('camp/deck ' + JSON.stringify([f.camp, f.deck]));
  f.fire.again && f.fire.rest && f.fire.talk && f.fire.on && f.fire.notNow && f.fire.pipe && f.rested === 1 && f.talkLines === f.squadHere ? ok(`the fire: an again line, a rest, the squad's talk (a line each, ${f.talkLines}), the pipe, the way on with Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere]));
  f.duiker && f.hill.area === 'b4_c2_hill' && f.trick === 'haddat' && f.spirit ? ok('Duiker\'s tree as camp talk (empty, nobody knows); up the hill; the trick, the Pilgrim\'s Crow (spirit-craft)') : no('hill ' + JSON.stringify([f.duiker, f.hill, f.trick, f.spirit]));
  f.robNotNow && f.rob.started && f.rob.stage2 && f.rob.inStage2 && f.rob.after === 'b4_c2_robbers_after' && f.robDone && f.night.area === 'b4_c2_camp' && f.night.ph === 3 && f.keyNotNow && f.noTemul ? ok('the robbers on the Fall at dusk, both grounds forced; the night; the key can wait; no Temul off the Wickan road') : no('robbers ' + JSON.stringify([f.rob, f.robDone, f.night, f.keyNotNow, f.noTemul]));
}
g.key === 'fall' && g.climbed === 1 && g.nerve === 1 && g.haddat === 2 && g.marrow === 1 && g.tangle && g.notYet && g.area === 'b4_c2_hill' && g.node === 'b4_c2_climb' ? ok('key fall: b4_fallClimbed 1, Nerve +1, Haddat +2, Marrow +1, Tangle keeps the cusser') : no('fall ' + JSON.stringify(g));
g.relicOpt && g.relicLeft && g.noFeather && g.waitNotNow && g.hill && g.hill.stage2 && g.hill.inStage2 && g.hill.regs >= 1 && g.done ? ok(`fall: the names, the market's finger left on the hill; the robbers' second try with the company (${g.hill && g.hill.regs} regular), both grounds`) : no('fall fight ' + JSON.stringify(g));
g.morn && g.morn.area === 'b4_c2_morning' && g.morn.news === 1 && g.belief && g.doubt === 1 && g.widget && g.tallow && g.fear.flag === 'fire' && g.fear.nerve === 1 && g.rear && g.noRest && g.fallIn ? ok('the morning: the news as belief (b4_news), Hollet, Tallow\'s fear with the Nerve widget, the Third at the back with no rest') : no('fall morning ' + JSON.stringify(g));
g.end && g.end.view === 'end' && g.end.ch === 'fall' && g.end.lvl >= 10 ? ok(`fall: the chapter's end (level ${g.end.lvl}, xp ${g.end.xp}, Nerve ${g.end.nerve}; ${g.extras} end lines, ${g.journal} journal)`) : no('fall end ' + JSON.stringify(g.end));
c.key === 'march' && c.climbed === 0 && c.nerve === 1 && c.haddat === -1 && c.node === 'b4_c2_line' && c.lineNpc && c.notNow ? ok('key march: b4_fallClimbed 0, Radde approves (Nerve +1), Haddat −1, the Third\'s place on the line') : no('march ' + JSON.stringify(c));
c.probe && c.probe.started && c.probe.regs >= 1 && c.probe.stage2 && c.probe.inStage2 && c.done && c.morn.area === 'b4_c2_morning' && c.morn.news === 1 && c.rest && c.held && c.end && c.end.view === 'end' && c.end.ch === 'march' && c.end.lvl >= 10 ? ok(`march: the night probe with the company (${c.probe.regs}), its second ground in the column, the rest before the march, the end (level ${c.end.lvl}, Nerve ${c.end.nerve})`) : no('march fight/end ' + JSON.stringify(c));
if (t.renderErr) {
  !t.renderErr.length && t.ramin && t.nobody ? ok('a transfer on the Wickan road with nobody at the Barrow: every node renders; the hill line says none of the squad is up there') : no('transfer ' + JSON.stringify([t.renderErr, t.ramin, t.nobody, t.squad]));
  t.recruitNamed >= 6 && t.sathiEdge && t.rob && t.rob.dog ? ok(`Ramin walking is named in ${t.recruitNamed} of 8 sampled nodes; Sathi has the edge for the Crow's word; Hackle at her knee on the hill`) : no('recruit ' + JSON.stringify([t.recruitNamed, t.sathiEdge, t.rob]));
  t.temulShow && t.temul === 1 ? ok('on the Wickan road Temul walks past the fire (b4_temulPast)') : no('temul ' + JSON.stringify([t.temulShow, t.temul]));
  t.swapOffered && t.swap.keth && !t.swap.ramin && t.swap.raminWaits && t.kethLine && t.kethKey ? ok('the swap at the fire: Keth in, Ramin back to the Red Blades, near; Keth has his line at the fire and at the key') : no('swap ' + JSON.stringify([t.swapOffered, t.swap, t.kethLine, t.kethKey]));
  t.keepOpt && t.featherOpt && t.feather && t.keepLeft ? ok('fall on a chain bone: the old woman\'s crow feather (b4_c2_crowfeather); a Book Two keepsake left on the hill') : no('feather ' + JSON.stringify([t.keepOpt, t.featherOpt, t.feather, t.keepLeft]));
  t.ab && t.crowOn && t.crows > 0 && t.crowOff && t.whet ? ok(`the Pilgrim's Crow in a fight: blows on the bearer struck again (${t.crows} of 30), ended on the bearer's turn; the whetstone's first blow`) : no('crow ' + JSON.stringify([t.ab, t.crowOn, t.crows, t.crowOff, t.whet]));
}
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b4ch2: FAIL (${bad.length})` : 'b4ch2: all ok'); process.exit(bad.length ? 1 : 0);
