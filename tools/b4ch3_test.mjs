// Book Four, Chapter 3 (The Burned Tears, src/73_b4_ch3.js): the chapter's halts, both keys, every fight's start and a forced win (both
// grounds of each), the trick, the ferry rope, the fire and the swap, Orvas's join; from a fresh start at level 10, and from a Book Two
// transfer with Sathi alive and Ramin walking.
// Usage: node tools/b4ch3_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  /* take the visible choice whose words match, run its effect, and go where it goes (a node, or a function) */
  const take = (id, re) => { const n = DLG[id](), c = n.ch.filter(x => !x.req || x.req()).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${n.ch.filter(x => !x.req || x.req()).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const has = (id, re) => DLG[id]().ch.filter(x => !x.req || x.req()).some(x => re.test(x.t));
  /* a check made: the roll settles clean for whoever is named (a trick check teaches them) */
  const made = (id, re, who, tier = 'clean') => { const n = DLG[id](), c = n.ch.filter(x => !x.req || x.req()).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c);
    settleRoll({who, stat:c.check[0], tier, ok:tier !== 'near', pass:true, margin:tier === 'near' ? -1 : 6, nat:tier === 'near' ? 9 : 18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  /* a fight forced: both grounds when there are two, then the node after it */
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.regs = B.def.b4Regs || 0; res.obj = !!B.def.objective; res.dog = B.units.some(u => u.kind === 'hackle');
    res.foes = B.units.filter(u => u.side === 'e').length;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60);
      res.inStage2 = !!B && !!B.def.isStage2; res.allies2 = B.units.filter(u => u.ally && u.kind === 'b4_c3_khundryl').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); } // a level's talent pick came first
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b4_c3_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); if (/undefined|NaN|\[object/.test(n.txt)) errs.push(k + ': leaks'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const lvl10 = () => { S.lvl = 10; S.xp = LEVELS[9]; S.chapters = {1:'grave', 2:'march'}; S.f.b4_c1_key = 'grave'; S.f.b4_bone = 'grave'; S.f.b4_c2_key = 'march'; S.picksDue = []; };
  try {
  /* ================= a fresh start, at Chapter Three ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); lvl10(); save(); startChapter(3);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, n0:S.nerve, renderErr:renderAll(), nodes:nodes.length};
  talk('b4_c3_start'); const nd = S.nerve; take('b4_c3_start', /Eat\. Drink/); take('b4_c3_dust', /On your feet/); out.f.dust = S.nerve - nd;
  talk('b4_c3_radde'); out.f.nerveWidget = /Nerve/.test(DLG.b4_c3_radde().html || ''); take('b4_c3_radde', /take the picket/); out.f.picket = S.f.b4_c3_picket;
  talk('b4_c3_recruits'); const nr = S.nerve; take('b4_c3_recruits', /not hitting us/); out.f.recruits = S.nerve - nr;
  talk('b4_c3_cairn'); made('b4_c3_cairn', /proper look/, 'haddat'); out.f.counted = S.f.b4_c3_counted;
  talk('b4_c3_to_flank'); out.f.flankNotNow = has('b4_c3_to_flank', /Not now/) && has('b4_c3_to_flank', /wash's mouth/);
  const n1 = S.nerve; out.f.raiders = await force('b4_c3_raiders'); out.f.clean = S.nerve - n1; out.f.raidersDone = S.f.b4_c3_raidersDone;
  const n2 = S.nerve; take('b4_c3_raiders_after', /Back to the column/); out.f.come = {khundryl:S.f.b4_khundryl, nerve:S.nerve - n2, notNow:has('b4_c3_come_in', /Not now/)};
  take('b4_c3_come_in', /fires/); out.f.camp = {area:S.area, ph:S.f.b4_c3_ph, node:S.node, deck:has('b4_c3_feast_arrive', /Deck/)};
  /* the reading at the feast */
  talk('b4_c3_deck'); const dk = DLG.b4_c3_deck(); const draw = dk.ch.find(c => /draw/.test(c.t)); runFx(draw); out.f.deck = {drawn:S.f.b4_c3_drawn, reader:S.f.b4_c3_reader, card:S.card, inPool:B4POOL[3].includes(S.card)};
  S.card = 'b4c_knightchains'; talk('b4_c3_card'); out.f.chains = S.f.b4_chains;
  /* the fire */
  talk('b4_c3_feast'); const fy = DLG.b4_c3_feast(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b4_c3_feast', /rest/), talk:has('b4_c3_feast', /Talk with the squad/), on:has('b4_c3_feast', /shouting/), notNow:has('b4_c3_feast', /Not now/)};
  take('b4_c3_feast', /Let the squad rest/); out.f.rested = S.f.b4_c3_rest2;
  out.f.talkLines = DLG.b4_c3_feast_talk().txt.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  talk('b4_c3_shaman'); const ns = S.nerve; take('b4_c3_shaman', /blessing/); out.f.shaman = {flag:S.f.b4_c3_shamanTold, nerve:S.nerve - ns, said:/restless life/.test(DLG.b4_c3_shaman().txt)};
  talk('b4_c3_mourner'); made('b4_c3_mourner', /learn the cry/, 'haddat'); out.f.trick = S.tricks && S.tricks.b4_c3_tears && S.tricks.b4_c3_tears.who;
  talk('b4_c3_gall'); take('b4_c3_gall', /Drink/); out.f.cup = S.kit.includes('b4_c3_cup');
  talk('b4_c3_orvas'); out.f.orvasOffer = has('b4_c3_orvas', /Walk with us/) && has('b4_c3_orvas', /near/) && has('b4_c3_orvas', /Go home/);
  const snapO = JSON.stringify(S);
  take('b4_c3_orvas', /Walk with us/); if (S.picksDue && S.picksDue.length) { out.f.orvasPicks = S.picksDue.join(','); S.picksDue = []; talk('b4_c3_orvas_join'); } out.f.orvas = {in:b4In('orvas'), flag:S.f.b4_orvasDone, knife:S.kit.includes('b4_c3_khundrylknife'), lvl:S.lvl, line:/Orvas/.test(DLG.b4_c3_feast_talk().txt)};
  out.f.orvasNamed = ['b4_c3_feast_talk', 'b4_c3_feast_rest', 'b4_c3_brawl_start', 'b4_c3_ford_arrive', 'b4_c3_key', 'b4_c3_dawn', 'b4_c3_butte', 'b4_c3_scav_after', 'b4_c3_poles_after'].filter(k => /Orvas/.test(DLG[k]().txt)).length;
  out.f.brawl = await force('b4_c3_brawl'); out.f.brawlDone = S.f.b4_c3_brawlDone;
  talk('b4_c3_feast'); take('b4_c3_feast', /Sleep\. The river/); out.f.toFord = has('b4_c3_to_ford', /Not now/); const nf = S.nerve; take('b4_c3_to_ford', /Down to the river/);
  out.f.ford = {area:S.area, ph:S.f.b4_c3_ph, nerve:S.nerve - nf, barrow:/Sathi crossed here/.test(DLG.b4_c3_ford_arrive().txt), third:/a third of the squad's stretch/.test(DLG.b4_c3_ford_arrive().txt)};
  /* the ferry rope: cut, then +1 on the next check, spent on the roll */
  talk('b4_c3_rope'); made('b4_c3_rope', /Cut a length/, 'haddat'); out.f.rope = {kit:S.kit.includes('b4_c3_ferryrope'), edge:edgesFor({check:['wits', 14]}, 'haddat').some(e => /ferry rope/.test(e[0]))};
  check('wits', 10, 'haddat', {check:['wits', 10]}); out.f.rope.spent = !!S.f.b4_rope3 && !edgesFor({check:['wits', 14]}, 'haddat').some(e => /ferry rope/.test(e[0]));
  talk('b4_c3_key'); out.f.keyNotNow = has('b4_c3_key', /moment/);
  const snap = JSON.stringify(S);
  /* key: carry */
  const lc = {n:S.nerve, h:S.loy.haddat, m:S.loy.marrow, t:S.loy.tangle, o:S.loy.orvas};
  take('b4_c3_key', /carry our own/); out.c = {key:S.f.b4_c3_key, carried:S.f.b4_carried, nerve:S.nerve - lc.n, haddat:S.loy.haddat - lc.h, marrow:S.loy.marrow - lc.m, tangle:S.loy.tangle - lc.t, orvas:S.loy.orvas - lc.o};
  made('b4_c3_carry', /Into the water/, 'haddat', 'near'); out.c.waded = S.f.b4_c3_waded; out.c.bead = S.kit.includes('b4_c3_bonebead'); out.c.noRest = S.f.b4_c3_noRest; out.c.bruised = Object.keys(S.bruised || {}).length;
  out.c.scavNotNow = has('b4_c3_scav_start', /Not now/);
  out.c.scav = await force('b4_c3_scavengers'); out.c.done = S.f.b4_c3_scavDone;
  take('b4_c3_scav_after', /Wait for the light/); out.c.blast = S.f.b4_c3_blast; out.c.after = /marine squad that blew it crosses first/.test(DLG.b4_c3_dawn().txt) && /after the marines/.test(DLG.b4_c3_dawn().txt);
  take('b4_c3_dawn', /up the far bank/); out.c.butte = {node:S.node, ww:S.f.b4_whirlwindSeen}; take('b4_c3_butte', /North/); await wait(50);
  out.c.end = {view, ch:S.chapters[3], lvl:S.lvl, nerve:S.nerve, carried:S.f.b4_carried}; out.c.extras = CHAPTERS[3].extras().length; out.c.journal = CHAPTERS[3].journal().length;
  /* key: blow, from the same moment */
  S = JSON.parse(snap); save(); startExplore('b4_c3_ford');
  talk('b4_c3_key'); const lb = {n:S.nerve, h:S.loy.haddat, t:S.loy.tangle}; take('b4_c3_key', /Let the sappers/); out.b = {key:S.f.b4_c3_key, carried:S.f.b4_carried, nerve:S.nerve - lb.n, haddat:S.loy.haddat - lb.h, tangle:S.loy.tangle - lb.t};
  take('b4_c3_blow', /Sleep\. The sappers/); out.b.slept = S.f.b4_c3_slept; take('b4_c3_dawn', /far bank/); out.b.area = S.area;
  out.b.bandNotNow = has('b4_c3_band', /Not now/);
  out.b.poles = await force('b4_c3_poles'); out.b.done = S.f.b4_c3_bandDone; out.b.bead = S.kit.includes('b4_c3_bonebead');
  take('b4_c3_poles_after', /fire, and sleep/); take('b4_c3_farfire', /Sleep\. The butte/); out.b.butte = S.f.b4_whirlwindSeen; take('b4_c3_butte', /North/); await wait(50);
  out.b.end = {view, ch:S.chapters[3], lvl:S.lvl, carried:S.f.b4_carried};
  /* Orvas near, and sent away (from the offer) */
  S = JSON.parse(snapO); save(); startExplore('b4_c3_camp'); take('b4_c3_orvas', /near/); out.near = {flag:S.f.b4_orvasDone, in:b4In('orvas'), knife:S.kit.includes('b4_c3_khundrylknife'), swap:has('b4_c3_feast', /Send for Orvas/)};
  S.f.b4_c3_brawlDone = 1; S.f.b4_c3_ph = 3; startExplore('b4_c3_ford'); talk('b4_c3_key'); take('b4_c3_key', /carry our own/); out.near.joined = b4In('orvas') && S.f.b4_orvasDone === 1;
  S = JSON.parse(snapO); save(); startExplore('b4_c3_camp'); take('b4_c3_orvas', /Go home/); out.away = {flag:S.f.b4_orvasDone, in:b4In('orvas'), noSwap:!has('b4_c3_feast', /Send for Orvas/)};
  /* the trick in a fight: the cry marks the near enemy; they are −2 to hit this round; the next blow on one of them +2, once */
  S = JSON.parse(snapO); S.tricks = {b4_c3_tears:{who:'haddat', ch:3}}; save(); startBattle('b4_c3_raiders', {}); await wait(60);
  { const u = B.units.find(x => x.id === 'haddat'), e = B.units.find(x => x.side === 'e'); e.x = u.x; e.y = u.y - 1; const before = atkCalc(e, u).bonus, hb = atkCalc(u, e).bonus; AB.t_b4_c3_tears.run(u);
    out.tr = {marked:B.b4tears.marked.includes(e), foeHit:atkCalc(e, u).bonus - before, myHit:atkCalc(u, e).bonus - hb, spirit:!!AB.t_b4_c3_tears.spirit};
    attack(u, e); out.tr.spent = B.b4tears.spent; out.tr.after = atkCalc(u, e).bonus - hb; B.over = true; }
  } catch (e) { out.err = e.stack; }
  /* ================= a Book Two transfer: Sathi alive, Ramin walking ================= */
  try {
  setBook('hoc'); S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'guard', lvl:8, mates:['haddat', 'sathi', 'tangle', 'marrow'], dead:[], ramin:true, keth:true,
    f:{b2_c7_key:'guard', b2_vatharLost:3, b2_hackleBack:0, keepsakes:['b2_bluethread']}};
  delete S.dead.sathi; S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'marrow', 'redblade']; S.f.b4_raminDone = 1; S.f.b4_kethDone = 2; migrate(S); lvl10(); save(); startChapter(3);
  out.t = {renderErr:renderAll(), ramin:b4In('redblade')};
  out.t.raminNamed = ['b4_c3_start', 'b4_c3_dust', 'b4_c3_come_in', 'b4_c3_feast_arrive', 'b4_c3_feast_talk', 'b4_c3_key', 'b4_c3_ford_arrive', 'b4_c3_dawn', 'b4_c3_butte'].filter(k => /Ramin/.test(DLG[k]().txt)).length;
  out.t.fight = await force('b4_c3_raiders');
  S.f.b4_c3_raidersDone = 1; S.f.b4_c3_ph = 2; startExplore('b4_c3_camp'); talk('b4_c3_orvas'); take('b4_c3_orvas', /Walk with us/);
  out.t.orvas = {in:b4In('orvas'), flag:S.f.b4_orvasDone, waits:/Another walks with you/.test(DLG.b4_c3_orvas_join().txt), knife:S.kit.includes('b4_c3_khundrylknife')};
  talk('b4_c3_feast'); out.t.swapOffered = has('b4_c3_feast', /Send for Orvas/) && has('b4_c3_feast', /Send for Keth/); take('b4_c3_feast', /Send for Orvas/);
  out.t.swap = {orvas:b4In('orvas'), ramin:b4In('redblade'), raminWaits:S.f.b4_raminDone === 2, orvasFlag:S.f.b4_orvasDone, line:/Orvas/.test(DLG.b4_c3_feast_swap().txt)};
  S.f.b4_c3_brawlDone = 1; S.f.b4_c3_ph = 3; startExplore('b4_c3_ford'); const fa = DLG.b4_c3_ford_arrive().txt;
  out.t.ford = {three:/kept three of the squad's stretch/.test(fa), noBarrow:!/on the Barrow now/.test(fa)};
  const lo = S.loy.orvas; talk('b4_c3_key'); take('b4_c3_key', /carry our own/); out.t.orvasLoy = S.loy.orvas - lo;
  } catch (e) { out.err2 = e.stack; }
  return out;
});
if (r.err) no('page script threw (fresh): ' + r.err);
if (r.err2) no('page script threw (transfer): ' + r.err2);
const f = r.f || {}, c = r.c || {}, b = r.b || {}, t = r.t || {}, tr = r.tr || {};
if (f.area) {
  f.area === 'b4_c3_hills' && f.ch === 3 && f.lvl0 === 10 && f.squad === 'sgt,haddat,tangle,marrow,tallow' && !f.renderErr.length && f.nodes >= 60 && f.nodes <= 80 ? ok(`a fresh start opens Chapter Three in the Vathar Hills at level 10, and every one of ${f.nodes} b4_c3 nodes renders`) : no('fresh ' + JSON.stringify(f));
  f.dust === -1 && f.nerveWidget && f.picket === 1 && f.recruits === 1 && f.counted === 1 ? ok('the halt: the dust on the ridges (Nerve −1), Radde\'s book with the Nerve widget, the picket, the recruits steadied (+1), the riders read from the cairn') : no('halt ' + JSON.stringify([f.dust, f.nerveWidget, f.picket, f.recruits, f.counted]));
  f.flankNotNow && f.raiders.started && f.raiders.regs >= 1 && f.raiders.stage2 && f.raiders.inStage2 && f.raiders.allies2 >= 2 && f.raiders.after === 'b4_c3_raiders_after' && f.raidersDone && f.clean === 1 ? ok(`the raiders on the flank picket: the company (${f.raiders.regs} regular), both grounds, ${f.raiders.allies2} Burned Tear riders in the second, Nerve +1 for a clean fight`) : no('raiders ' + JSON.stringify([f.flankNotNow, f.raiders, f.clean]));
  f.come.khundryl === 1 && f.come.nerve === 1 && f.come.notNow && f.camp.area === 'b4_c3_camp' && f.camp.ph === 2 && f.camp.deck ? ok('the Khundryl come in (b4_khundryl, Nerve +1); the feast, the first halt, with the Deck') : no('come in ' + JSON.stringify([f.come, f.camp]));
  f.deck.drawn === 1 && f.deck.reader === 'marrow' && f.deck.inPool && f.chains === 1 ? ok(`the reading at the feast (Marrow draws ${f.deck.card}); a Chains card sets b4_chains`) : no('deck ' + JSON.stringify([f.deck, f.chains]));
  f.fire.again && f.fire.rest && f.fire.talk && f.fire.on && f.fire.notNow && f.rested === 1 && f.talkLines === f.squadHere ? ok(`the fire b4_c3_feast: an again line, a rest, the squad's talk (a line each, ${f.talkLines}), the way on with Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere]));
  f.shaman.flag === 'bless' && f.shaman.nerve === 1 && f.shaman.said && f.trick === 'haddat' && f.cup ? ok('the shamans\' "long but restless life" (told as a blessing, Nerve +1); the trick, the Black Tears; the war chief\'s cup') : no('feast ' + JSON.stringify([f.shaman, f.trick, f.cup]));
  f.orvasOffer && f.orvas.in && f.orvas.flag === 1 && f.orvas.knife && f.orvas.line && f.orvasNamed >= 6 ? ok(`Orvas comes to the fire and joins (b4Join): the knife, his line at the fire, named in ${f.orvasNamed} of 9 sampled nodes`) : no('orvas ' + JSON.stringify([f.orvasOffer, f.orvas, f.orvasNamed]));
  f.brawl.started && f.brawl.obj && f.brawl.after === 'b4_c3_brawl_after' && f.brawlDone && f.toFord ? ok('the brawl at the edge of the fires (an objective fight), forced; then the road to the river with Not now') : no('brawl ' + JSON.stringify([f.brawl, f.brawlDone, f.toFord]));
  f.ford.area === 'b4_c3_ford' && f.ford.ph === 3 && f.ford.nerve === -1 && f.ford.barrow && f.ford.third ? ok('Vathar Crossing: the bones (Nerve −1), "a third of the squad\'s stretch", and the one Barrow line, for Sathi') : no('ford ' + JSON.stringify(f.ford));
  f.rope.kit && f.rope.edge && f.rope.spent && f.keyNotNow ? ok('the old ferry rope: cut free, +1 named on the next check, spent on the roll; the key can wait') : no('rope ' + JSON.stringify([f.rope, f.keyNotNow]));
}
c.key === 'carry' && c.carried === 1 && c.nerve === 1 && c.haddat === 2 && c.marrow === 2 && c.tangle === -1 && c.orvas === 2 && c.waded && c.bead && c.noRest && c.bruised >= 4 ? ok('key carry: b4_carried 1, Nerve +1, Haddat and Marrow +2, Tangle −1, Orvas +2; the cold water\'s "yes, but"; the bead; no rest') : no('carry ' + JSON.stringify(c));
c.scavNotNow && c.scav && c.scav.started && c.scav.stage2 && c.scav.inStage2 && c.done && c.blast && c.after && c.butte && c.butte.ww === 1 && c.end && c.end.view === 'end' && c.end.ch === 'carry' && c.end.lvl >= 11 ? ok(`carry: the scavengers in the shallows, both grounds; dawn, the marines across first and the Third after; the butte (b4_whirlwindSeen); the end at level ${c.end && c.end.lvl}, Nerve ${c.end && c.end.nerve} (${c.extras} end lines, ${c.journal} journal)`) : no('carry fight/end ' + JSON.stringify(c));
b.key === 'blow' && b.carried === 0 && b.nerve === 1 && b.tangle === 2 && b.haddat === -1 && b.slept === 1 && b.area === 'b4_c3_farbank' ? ok('key blow: b4_carried 0, Nerve +1, Tangle +2, Haddat −1; a night\'s rest; across to the far bank') : no('blow ' + JSON.stringify(b));
b.bandNotNow && b.poles && b.poles.started && b.poles.stage2 && b.poles.inStage2 && b.done && b.bead && b.butte === 1 && b.end && b.end.view === 'end' && b.end.ch === 'blow' ? ok(`blow: the river band at the poles, both grounds; the bead; the butte; the end at level ${b.end && b.end.lvl}`) : no('blow fight/end ' + JSON.stringify(b));
const nr = r.near || {}, aw = r.away || {};
nr.flag === 2 && !nr.in && nr.knife && nr.swap && nr.joined && aw.flag === 0 && !aw.in && aw.noSwap ? ok('Orvas near (flag 2: offered at the fire, and joins when the squad carries its dead); sent away (flag 0: not offered)') : no('orvas near/away ' + JSON.stringify([nr, aw]));
tr.marked && tr.foeHit === -2 && tr.myHit === 2 && tr.spirit && tr.spent && tr.after === 0 ? ok('the Black Tears in a fight: the near enemy marked, −2 to hit this round, the next blow on one +2 and spent; spirit-craft') : no('trick in battle ' + JSON.stringify(tr));
if (t.renderErr) {
  !t.renderErr.length && t.ramin && t.raminNamed >= 6 ? ok(`a transfer on the Aren Guard road with Ramin walking: every node renders; Ramin named in ${t.raminNamed} of 9 sampled nodes`) : no('transfer ' + JSON.stringify([t.renderErr, t.ramin, t.raminNamed]));
  t.fight && t.fight.dog && t.fight.started ? ok('Hackle is at Sathi\'s knee in the chapter\'s fights') : no('dog ' + JSON.stringify(t.fight));
  t.orvas && !t.orvas.in && t.orvas.flag === 2 && t.orvas.waits && t.orvas.knife ? ok('Orvas offered while Ramin walks: he waits near with his clan (one recruit at a time), and gives the knife') : no('transfer orvas ' + JSON.stringify(t.orvas));
  t.swapOffered && t.swap.orvas && !t.swap.ramin && t.swap.raminWaits && t.swap.orvasFlag === 1 && t.swap.line ? ok('the swap at the fire: Orvas in, Ramin back to the Red Blades, near') : no('swap ' + JSON.stringify([t.swapOffered, t.swap]));
  t.ford && t.ford.three && t.ford.noBarrow && t.orvasLoy === 2 ? ok('the transfer\'s Vathar count ("three of the squad\'s stretch"); nobody fell at the Barrow, so no Barrow line; Orvas +2 on carry') : no('transfer ford ' + JSON.stringify([t.ford, t.orvasLoy]));
}
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b4ch3: FAIL (${bad.length})` : 'b4ch3: all ok'); process.exit(bad.length ? 1 : 0);
