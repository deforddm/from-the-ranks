// Book Five, Chapter 1 (The Drownings, src/81_b5_ch1.js; the Wager Board in src/89_b5_games.js): the chapter's halts, both keys and
// their debt moves, the reading, the fire and the pay desk, the Wager Board, the trick (taught, and its battle half), every fight's start
// and a forced win (both grounds of the tavern), and the chapter's end; from a fresh start, and from a --from=1 style save (level 2) with
// a recruit walking, where every node must still render and the recruit has a line at the fire.
// Usage: node tools/b5ch1_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  /* take the visible choice whose words match, run its effect, and go where it goes (a node, or a function) */
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  /* a check made: the roll settles clean for whoever is named (a trick check teaches them) */
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  /* a fight forced: both grounds when there are two, then the node after it */
  const force = async (id, also) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.obj = !!B.def.objective; res.foes = B.units.filter(u => u.side === 'e').length;
    if (also) await also(res);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b5_c1_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{/.test(n.txt)) errs.push(k + ': leaks'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const debts = () => Object.fromEntries(['sgt', 'tobet', 'thegg', 'perrit', 'ammet'].map(id => [id, b5Debt(id)]));
  try {
  /* ================= a fresh start ================= */
  setBook('mt'); S = newStateMT('Fresh'); S.picksDue = []; save(); startChapter(1);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, silver0:S.silver, renderErr:renderAll(), title:CHAPTERS[1].title, shelf:BOOKS.mt.coming};
  talk('b5_c1_start'); out.f.ph = S.f.b5_c1_ph; out.f.tileChoice = has('b5_c1_start', /tiles/);
  /* the clerk's table: the paybooks, the note for Thegg, each soldier's line, the sums */
  talk('b5_c1_clerk'); out.f.clerk = {tab:S.f.b5_c1_tab, html:/The Sixth Company/.test(DLG.b5_c1_clerk().html || ''), lines:['tobet', 'thegg', 'perrit', 'ammet'].every(id => has('b5_c1_clerk', new RegExp(TPL[id].name + '\'s line')))};
  const sil1 = S.silver; made('b5_c1_clerk', /company's sums/, 'perrit'); out.f.sums = {flag:S.f.b5_c1_sums, got:S.silver - sil1};
  /* the reading at the first halt */
  talk('b5_c1_tiles'); const tk = DLG.b5_c1_tiles(); const lay = tk.ch.find(c => /lay them/.test(c.t)); runFx(lay); out.f.tiles = {drawn:S.f.b5_c1_drawn, reader:S.f.b5_c1_reader, card:S.card, inPool:B5POOL[1].includes(S.card)}; talk('b5_c1_card'); out.f.cardNode = DLG.b5_c1_card().sp;
  /* the fire: a hub with an again line; a rest; the pay desk; the squad's talk, a line each; the way on with Not now */
  talk('b5_c1_yard'); const fy = DLG.b5_c1_yard(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b5_c1_yard', /rest/), pay:has('b5_c1_yard', /pay desk/), talk:has('b5_c1_yard', /Talk with the squad/), on:has('b5_c1_yard', /Turn in/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:ROSTER_FIRES.mt[1].includes('b5_c1_yard')};
  take('b5_c1_yard', /Let the squad rest/); out.f.rested = S.f.b5_c1_rest1;
  const tkk = DLG.b5_c1_yard_talk().txt; out.f.talkLines = tkk.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  /* the pay desk */
  talk('b5_c1_pay'); const pd = DLG.b5_c1_pay(); out.f.desk = {html:/The squad/.test(pd.html || ''), ten:pd.ch.some(c => /docks on/.test(c.t)), notNow:/Not now/.test(pd.ch[pd.ch.length - 1].t)};
  const d0 = b5Debt('ammet'), s0 = S.silver; take('b5_c1_pay', /on Ammet's debt/); out.f.desk.paid = d0 - b5Debt('ammet'); out.f.desk.spent = s0 - S.silver;
  /* the quartermaster: salves at six */
  const sv = S.inv.salve, ss = S.silver; talk('b5_c1_qm'); take('b5_c1_qm', /^A salve/); out.f.qm = {salve:S.inv.salve - sv, docks:ss - S.silver};
  talk('b5_c1_ennic'); take('b5_c1_ennic', /What is the city/); out.f.court = /Eberict/.test(DLG.b5_c1_ennic_court().txt) && /Brys Beddict/.test(DLG.b5_c1_ennic_court().txt);
  /* the night, then out into the festival: the Low Walk */
  talk('b5_c1_yard'); take('b5_c1_yard', /Turn in/); out.f.slept = S.f.b5_c1_slept; take('b5_c1_sleep1', /Out through the gate/); take('b5_c1_out', /Walk the Low Walk/);
  out.f.canal = {area:S.area, ph:S.f.b5_c1_ph, node:S.node};
  talk('b5_c1_board'); out.f.bugg = S.f.b5_bugg; talk('b5_c1_stall'); out.f.eberict = /Eberict/.test(DLG.b5_c1_stall().txt);
  /* the cutpurses */
  talk('b5_c1_crowd'); out.f.crowdNotNow = has('b5_c1_crowd', /Not now/);
  const sc = S.silver; out.f.cut = await force('b5_c1_cutpurses'); out.f.cut.chit = S.kit.includes('b5_c1_chit'); out.f.cut.docks = S.silver - sc; out.f.cut.done = S.f.b5_c1_cutDone;
  /* the trick: the Rope-Man's Haul */
  talk('b5_c1_ropeman'); out.f.ropeNotNow = has('b5_c1_ropeman', /Not now/); made('b5_c1_ropeman', /Show us/, 'sgt'); out.f.trick = {who:S.tricks && S.tricks.b5_c1_haul && S.tricks.b5_c1_haul.who, knife:S.kit.includes('b5_c1_hookknife'), fx:/swap places/.test(TRICKS.b5_c1_haul.fx), ab:!!AB.t_b5_c1_haul && AB.t_b5_c1_haul.free};
  /* the pit town at dusk */
  talk('b5_c1_to_pit'); take('b5_c1_to_pit', /Out to the pit town/); out.f.pit = {area:S.area, pit:S.f.b5_c1_pit};
  talk('b5_c1_oldman'); made('b5_c1_oldman', /collector/, 'thegg'); out.f.warned = S.f.b5_c1_warned;
  const scart = S.silver; talk('b5_c1_cart'); made('b5_c1_cart', /shoulder/, 'thegg'); out.f.cart = S.silver - scart;
  talk('b5_c1_taverndoor'); out.f.brizad = S.f.b5_brizad; out.f.tavernNotNow = has('b5_c1_taverndoor', /Not now/);
  /* the tavern fight: an objective fight, both grounds; the trick's battle half in it (the haul swaps the bearer and a squadmate) */
  out.f.tavern = await force('b5_c1_tavern', async res => { const u = B.units.find(x => x.id === 'sgt'), t = B.units.find(x => x.side === 'p' && x.id === 'thegg'); res.haulOffered = typeof trickOk === 'function' && trickOk(u, AB.t_b5_c1_haul); const ux = u.x, uy = u.y, tx = t.x, ty = t.y; AB.t_b5_c1_haul.run(u, tx, ty); res.hauled = u.x === tx && u.y === ty && t.x === ux && t.y === uy; });
  out.f.fine = {fine:S.f.b5_c1_fine, done:S.f.b5_c1_tavernDone, node:S.node, thegg:/Thegg/.test(DLG.b5_c1_tavern_after().txt)};
  take('b5_c1_tavern_after', /After him/); out.f.court2 = {area:S.area, node:S.node, notYet:has('b5_c1_court', /Not yet/)};
  const snap = JSON.stringify(S), before = debts(), lb = {thegg:S.loy.thegg, perrit:S.loy.perrit, tobet:S.loy.tobet};
  /* ================= key: pay ================= */
  const sp = S.silver; take('b5_c1_court', /paybooks/); const after = debts();
  out.p = {key:S.f.b5_c1_key, moves:Object.fromEntries(Object.keys(after).map(k => [k, after[k] - before[k]])), fee:sp - S.silver, receipt:S.kit.includes('b5_c1_receipt'), thegg:S.loy.thegg - lb.thegg, perrit:S.loy.perrit - lb.perrit,
    pressed:b5Collectors().length, stand:['sgt', 'tobet', 'thegg', 'perrit', 'ammet'].map(id => b5Standing(id)).join(',')};
  take('b5_c1_court_pay', /Back to the barracks/); take('b5_c1_evening_go', /Into the yard/); out.p.eve = {ph:S.f.b5_c1_ph, area:S.area, node:S.node};
  const se = S.silver; talk('b5_c1_ennic_eve'); out.p.purse = S.silver - se;
  talk('b5_c1_festival'); out.p.brys = S.f.b5_c1_brys && /Brys Beddict/.test(DLG.b5_c1_festival().txt);
  /* the Wager Board (89) at the fire on the festival night */
  talk('b5_c1_yard'); out.p.wagerOffered = has('b5_c1_yard', /chalk board/); out.p.laneOn = has('b5_c1_yard', /noise in the lane/);
  { const sw = S.silver; const c = vis('b5_c1_yard').find(x => /chalk board/.test(x.t)); c.go(); await wait(80); const q = s => document.querySelector(s);
    out.p.game = {open:!q('#mg').hidden, title:(q('#mg h2') || {}).textContent};
    q('#mgPanel [data-w="0"]').click(); await wait(20); q('#mgPanel [data-st="1"]').click(); await wait(20); q('#wgPass').click(); await wait(20); q('#wgPass').click(); await wait(40);
    out.p.game.closed = !!q('#wgDone'); out.p.game.chalk = /morning/.test((q('#mgPanel') || {}).textContent || ''); q('#wgDone').click(); await wait(60);
    out.p.game.after = S.node; out.p.game.flag = !!S.f.b5_wager; out.p.game.net = S.silver - sw; out.p.game.capOk = (S.f.b5_wagerNet || 0) <= 12; out.p.game.again = !has('b5_c1_yard', /chalk board/); }
  /* the key fight: the barracks lane */
  take('b5_c1_yard', /noise in the lane/); out.p.laneNotNow = has('b5_c1_lane_start', /Not now/);
  const tl = b5Debt('thegg'); out.p.lane = await force('b5_c1_lane'); out.p.lane.done = S.f.b5_c1_laneDone; out.p.lane.struck = tl - b5Debt('thegg');
  talk('b5_c1_yard'); take('b5_c1_yard', /^Turn in\.$/); take('b5_c1_sleep2', /tiers/); out.p.tiersArea = S.area;
  take('b5_c1_tiers', /Finadd/); out.p.trate = S.f.b5_trate; take('b5_c1_trate', /North, Finadd/); out.p.roadNotYet = has('b5_c1_road', /Not yet/);
  take('b5_c1_road', /^North/); await wait(60); out.p.end = {view, ch:S.chapters[1], lvl:S.lvl};
  out.p.extras = CHAPTERS[1].extras().length; out.p.journal = CHAPTERS[1].journal().length;
  /* ================= key: swim, from the same moment ================= */
  S = JSON.parse(snap); save(); startExplore('b5_c1_canalnight'); G.said = {};
  talk('b5_c1_court'); const bs = debts(), ls = {thegg:S.loy.thegg, tobet:S.loy.tobet}; take('b5_c1_court', /swim it/);
  out.s = {key:S.f.b5_c1_key, noMoveYet:JSON.stringify(debts()) === JSON.stringify(bs)};
  take('b5_c1_court_swim', /Back to the barracks/); take('b5_c1_evening_go', /Into the yard/);
  talk('b5_c1_yard'); out.s.noLane = !has('b5_c1_yard', /noise in the lane/); take('b5_c1_yard', /steps at first light/); take('b5_c1_sleep2', /steps/); out.s.steps = S.node;
  take('b5_c1_steps', /goes down the steps/); out.s.swim = {swam:S.f.b5_c1_swam, fee:b5Debt('thegg') - bs.thegg, tobet:S.loy.tobet - ls.tobet, thegg:S.loy.thegg - ls.thegg, sack:S.kit.includes('b5_c1_weightbag'), ammet:/Ammet/.test(DLG.b5_c1_swim_after().txt), walksBed:/walk(s|ed)? (along )?the bed/.test(DLG.b5_c1_swim().txt)};
  take('b5_c1_swim', /far steps/); take('b5_c1_swim_after', /Up onto the Low Walk/); out.s.area = S.area;
  out.s.bookmen = AREAS.b5_c1_canal.npcs.find(n => n.id === 'bookmen').show();
  talk('b5_c1_walk_start'); out.s.walkNotNow = has('b5_c1_walk_start', /Not now/);
  const sw2 = S.silver; out.s.walk = await force('b5_c1_lowwalk'); out.s.walk.done = S.f.b5_c1_walkDone; out.s.walk.docks = S.silver - sw2;
  talk('b5_c1_tiers'); take('b5_c1_tiers', /Finadd/); take('b5_c1_trate', /North, Finadd/); take('b5_c1_road', /^North/); await wait(60); out.s.end = {view, ch:S.chapters[1], lvl:S.lvl};
  /* ================= a --from=1 style save: level 2, Brune walking (only in a synthetic save; she joins in Chapter 2) ================= */
  setBook('mt'); S = newStateMT('Syn'); S.lvl = 2; S.xp = LEVELS[1]; S.picksDue = []; b5Join('brune'); save(); startChapter(1);
  out.y = {renderErr:renderAll(), brune:b5In('brune'), talk:/Brune/.test(DLG.b5_c1_yard_talk().txt), lines:DLG.b5_c1_yard_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length};
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, p = r.p || {}, s = r.s || {}, y = r.y || {};
if (f.area) {
  f.area === 'b5_c1_barracks' && f.ch === 1 && f.lvl0 === 1 && f.squad === 'sgt,tobet,thegg,perrit,ammet' && !f.renderErr.length && f.title === 'The Drownings' && f.shelf === false ? ok('a fresh start opens Chapter One in the barracks yard at level 1; Book Five is on the shelf; every b5_c1 node renders') : no('fresh ' + JSON.stringify(f));
  f.ph === 1 && f.tileChoice && f.clerk.tab === 1 && f.clerk.html && f.clerk.lines && f.sums.flag === 'ok' && f.sums.got === 6 ? ok('the first halt: the tiles offered; the clerk\'s table with the paybooks, the note for Thegg, each soldier\'s line, the sums (+6 docks)') : no('halt ' + JSON.stringify([f.ph, f.tileChoice, f.clerk, f.sums]));
  f.tiles.drawn === 1 && f.tiles.reader === 'perrit' && f.tiles.inPool && f.cardNode === 'The Tiles of the Holds' ? ok(`the reading in the barracks yard (Perrit lays the tiles: ${f.tiles.card})`) : no('tiles ' + JSON.stringify([f.tiles, f.cardNode]));
  f.fire.again && f.fire.rest && f.fire.pay && f.fire.talk && f.fire.on && f.fire.notNow && f.fire.roster && f.rested === 1 && f.talkLines === f.squadHere ? ok(`the fire: an again line, a rest, the pay desk, the squad's talk (a line each, ${f.talkLines}), the roster, the way on with Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere]));
  f.desk.html && f.desk.ten && f.desk.notNow && f.desk.paid === 10 && f.desk.spent === 10 ? ok('the pay desk: the debts shown, 10 docks paid on Ammet\'s line, Not now') : no('desk ' + JSON.stringify(f.desk));
  f.qm.salve === 1 && f.qm.docks === 6 && f.court ? ok('the quartermaster\'s salve at 6 docks; the Finadd\'s barracks talk (Brys, Eberict)') : no('qm/court ' + JSON.stringify([f.qm, f.court]));
  f.slept === 1 && f.canal.area === 'b5_c1_canal' && f.canal.ph === 2 && f.bugg === 1 && f.eberict ? ok('the night, then the Low Walk on the festival\'s first day: the builder\'s board (b5_bugg), the eel stall\'s talk') : no('canal ' + JSON.stringify([f.slept, f.canal, f.bugg, f.eberict]));
  f.crowdNotNow && f.cut.started && f.cut.after === 'b5_c1_cutpurses_after' && f.cut.done && f.cut.chit && f.cut.docks === 8 ? ok('the cutpurses in the Down Market: a forced win, the wager-chit, +8 docks') : no('cutpurses ' + JSON.stringify(f.cut));
  f.ropeNotNow && f.trick.who === 'sgt' && f.trick.knife && f.trick.fx && f.trick.ab ? ok('the trick: the Rope-Man\'s Haul, taught on the Low Walk (the hook-knife with it)') : no('trick ' + JSON.stringify(f.trick));
  f.pit.area === 'b5_c1_pittown' && f.warned === 1 && f.cart === 5 && f.brizad === 1 && f.tavernNotNow ? ok('the pit town: the old Tarthenal\'s warning, the carter (+5), the tavern\'s talk of the First Consort (b5_brizad)') : no('pit ' + JSON.stringify([f.pit, f.warned, f.cart, f.brizad]));
  f.tavern.started && f.tavern.obj && f.tavern.stage2 && f.tavern.inStage2 && f.tavern.after === 'b5_c1_tavern_after' && f.tavern.haulOffered && f.tavern.hauled ? ok('the tavern fight: an objective fight, both grounds forced; the haul offered in it, and it swaps the bearer and Thegg') : no('tavern ' + JSON.stringify(f.tavern));
  f.fine.fine === 300 && f.fine.done === 1 && f.fine.thegg && f.court2.area === 'b5_c1_canalnight' && f.court2.node === 'b5_c1_court' && f.court2.notYet ? ok('the Garrison takes Thegg: 300 docks (b5_c1_fine); the fines court by night, and the key can wait') : no('fine ' + JSON.stringify([f.fine, f.court2]));
}
p.key === 'pay' && JSON.stringify(p.moves) === JSON.stringify({sgt:80, tobet:60, thegg:60, perrit:60, ammet:40}) && p.fee >= 0 && p.fee <= 10 && p.receipt && p.thegg === 2 && p.perrit === -1 && p.pressed === 0 ? ok(`key pay: 80/60/60/60/40 on five paybooks, the clerk's fee ${p.fee} in hand, the receipt, Thegg +2, Perrit −1; nobody pressed (${p.stand})`) : no('pay ' + JSON.stringify(p));
p.eve && p.eve.ph === 3 && p.eve.area === 'b5_c1_barracks' && p.purse === 5 && p.brys ? ok('the festival night in the yard: the Finadd\'s dock (+5), the King\'s party far off with the Champion') : no('eve ' + JSON.stringify([p.eve, p.purse, p.brys]));
p.wagerOffered && p.game && p.game.open && p.game.title === 'The Wager Board' && p.game.closed && p.game.chalk && p.game.after === 'b5_c1_wager_after' && p.game.flag && p.game.capOk && p.game.again ? ok(`the Wager Board at the fire: three lines, a stake, the morning's chalk, played once (net ${p.game.net} docks)`) : no('wager ' + JSON.stringify([p.wagerOffered, p.game]));
p.laneOn && p.laneNotNow && p.lane && p.lane.started && p.lane.obj && p.lane.done && p.lane.struck === 20 ? ok('pay: the collector in the barracks lane (an objective fight), the interest struck out (Thegg −20)') : no('lane ' + JSON.stringify([p.laneOn, p.lane]));
p.tiersArea === 'b5_c1_canal' && p.trate === 1 && p.roadNotYet && p.end && p.end.view === 'end' && p.end.ch === 'pay' && p.end.lvl >= 3 ? ok(`pay: the Special Drownings from the tiers, the Trate news (b5_trate), the road, the chapter's end (level ${p.end && p.end.lvl}; ${p.extras} end lines, ${p.journal} journal)`) : no('pay end ' + JSON.stringify([p.tiersArea, p.trate, p.end]));
s.key === 'swim' && s.noMoveYet && s.noLane && s.steps === 'b5_c1_steps' ? ok('key swim: no debt moves at the court; no lane fight; the steps at first light') : no('swim ' + JSON.stringify(s));
s.swim && s.swim.swam === 1 && s.swim.fee === 40 && s.swim.tobet === -1 && s.swim.thegg === 0 && s.swim.sack && s.swim.ammet && !s.swim.walksBed ? ok('swim: Thegg swims (the court\'s fee, Thegg +40), Tobet −1, Thegg 0, the weight-sack, Ammet on his chest; he never walks the bed') : no('swim ' + JSON.stringify(s.swim));
s.area === 'b5_c1_canal' && s.bookmen && s.walkNotNow && s.walk && s.walk.started && s.walk.done && s.walk.docks === 10 && s.end && s.end.view === 'end' && s.end.ch === 'swim' ? ok('swim: the bookmaker\'s men on the Low Walk (a forced win, +10 docks), then the tiers, the road and the chapter\'s end') : no('swim end ' + JSON.stringify([s.area, s.bookmen, s.walk, s.end]));
y.renderErr && !y.renderErr.length && y.brune && y.talk && y.lines === y.here ? ok('a --from=1 style save with Brune walking: every node renders, and she has her line at the fire') : no('synthetic ' + JSON.stringify(y));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b5ch1: FAIL (${bad.length})` : 'b5ch1: all ok'); process.exit(bad.length ? 1 : 0);
