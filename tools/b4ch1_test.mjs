// Book Four, Chapter 1 (The Muster, src/71_b4_ch1.js): the chapter's halts, both keys, every fight's start and a forced win (both grounds
// of each), the trick, the fire and the swap; from a fresh start, and from a Book Two transfer with Sathi alive and Ramin walking.
// Usage: node tools/b4ch1_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who) => { const n = DLG[id](), c = n.ch.filter(x => !x.req || x.req()).find(x => re.test(x.t)); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  /* a fight forced: both grounds when there are two, then the node after it */
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.regs = B.def.b4Regs || 0; res.obj = !!B.def.objective; res.dog = B.units.some(u => u.kind === 'hackle');
    res.foes = B.units.filter(u => u.side === 'e').length;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); } // a level's talent pick came first
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b4_c1_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  try {
  /* ================= a fresh start ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); S.picksDue = []; save(); startChapter(1);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, n0:S.nerve, renderErr:renderAll()};
  talk('b4_c1_start'); out.f.company = S.f.b4_company;
  take('b4_c1_start', /Watch the 8th/); const nBefore = S.nerve; take('b4_c1_blast', /Keep watching/); take('b4_c1_grub', /Eyes front/); take('b4_c1_fallout', /Fall out/); out.f.omen = S.nerve - nBefore;
  out.f.blistig = S.f.b4_blistig;
  talk('b4_c1_hollet'); take('b4_c1_hollet', /9th's now/); out.f.errand = S.f.b4_c1_errand; out.f.hollet = S.f.b4_c1_hollet;
  talk('b4_c1_radde'); out.f.nerveWidget = /Nerve/.test(DLG.b4_c1_radde().html || '');
  talk('b4_c1_recruits'); made('b4_c1_recruits', /Shields up/, 'haddat'); out.f.drill = S.f.b4_c1_drill;
  talk('b4_c1_to_streets'); take('b4_c1_to_streets', /Down to the harbour/); out.f.streets = S.area;
  const sil = S.silver; talk('b4_c1_stall'); take('b4_c1_stall', /Buy the finger/); out.f.relic = {flag:S.f.b4_c1_relic, kit:S.kit.includes('b4_c1_relic'), paid:sil - S.silver};
  talk('b4_c1_sweep'); out.f.noRamin = !has('b4_c1_sweep', /Ramin/); take('b4_c1_sweep', /clear off/); out.f.sash = S.kit.includes('b4_c1_redsash');
  talk('b4_c1_to_quay'); out.f.water = S.f.b4_c1_water; out.f.noKeth = !has('b4_c1_to_quay', /Keth/);
  talk('b4_c1_gate'); out.f.gateNotNow = has('b4_c1_gate', /Not now/);
  const n1 = S.nerve; out.f.runners = await force('b4_c1_runners'); out.f.clean = S.nerve - n1; out.f.pipe = S.kit.includes('b4_c1_durhangpipe'); out.f.runnersDone = S.f.b4_c1_runnersDone;
  talk('b4_c1_oldguard'); made('b4_c1_oldguard', /Show us/, 'haddat'); out.f.trick = S.tricks && S.tricks.b4_c1_gate && S.tricks.b4_c1_gate.who;
  talk('b4_c1_gate'); take('b4_c1_gate_in', /In, and the gate/); out.f.yard = {area:S.area, ph:S.f.b4_c1_ph, node:S.node, deck:has('b4_c1_yard_arrive', /Deck/)};
  /* the reading */
  talk('b4_c1_deck'); const dk = DLG.b4_c1_deck(); const draw = dk.ch.find(c => /draw/.test(c.t)); runFx(draw); out.f.deck = {drawn:S.f.b4_c1_drawn, reader:S.f.b4_c1_reader, card:S.card, inPool:B4POOL[1].includes(S.card)}; talk('b4_c1_card');
  /* the fire: a hub with an again line; a rest; the squad's talk, a line each; the way on with Not now */
  talk('b4_c1_yard'); const fy = DLG.b4_c1_yard(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b4_c1_yard', /rest/), talk:has('b4_c1_yard', /Talk with the squad/), on:has('b4_c1_yard', /Over the wall/), notNow:has('b4_c1_yard', /Not now/), pipe:has('b4_c1_yard', /pipe/)};
  take('b4_c1_yard', /Let the squad rest/); out.f.rested = S.f.b4_c1_rest2;
  const tk = DLG.b4_c1_yard_talk().txt; out.f.talkLines = tk.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  talk('b4_c1_radde_night'); out.f.rumour = /Mallick Rel/.test(DLG.b4_c1_radde_night().txt) && !/Pullyk Alar's face/.test(DLG.b4_c1_radde_night().txt);
  talk('b4_c1_recruits_night'); take('b4_c1_recruits_night', /hunger and thirst/); out.f.recNight = S.f.b4_c1_recNight;
  talk('b4_c1_wall'); take('b4_c1_wall', /Over the wall/); out.f.cem = S.area;
  out.f.chainLine = /Sathi may be under it/.test(DLG.b4_c1_chaincorner().txt);
  out.f.dig = await force('b4_c1_dig'); out.f.digDone = S.f.b4_c1_digDone;
  out.f.bury = has('b4_c1_dig_after', /Bury/); take('b4_c1_dig_after', /Bury/); out.f.buried = S.f.b4_c1_relicBuried && !S.kit.includes('b4_c1_relic');
  out.f.keyNotNow = has('b4_c1_key', /moment/);
  const snap = JSON.stringify(S);
  /* key: grave */
  const n2 = S.nerve; take('b4_c1_key', /old graves, like the rest/); out.g = {key:S.f.b4_c1_key, bone:S.f.b4_bone, nerve:S.nerve - n2, finger:S.kit.includes('b4_c1_finger')};
  take('b4_c1_key_grave', /Back over the wall/); out.g.ph = S.f.b4_c1_ph; out.g.area = S.area;
  talk('b4_c1_yard'); out.g.onward = has('b4_c1_yard', /dig detail/);
  take('b4_c1_yard', /dig detail/); out.g.cem = S.area;
  out.g.watch = await force('b4_c1_watch'); out.g.done = S.f.b4_c1_watchDone && S.f.b4_c1_sexton;
  talk('b4_c1_yard'); take('b4_c1_yard', /Sleep/); take('b4_c1_dawn', /North/); await wait(50); out.g.end = {view, ch:S.chapters[1], lvl:S.lvl, nerve:S.nerve};
  out.g.extras = CHAPTERS[1].extras().length; out.g.journal = CHAPTERS[1].journal().length;
  /* key: chain, from the same moment */
  S = JSON.parse(snap); save(); startExplore('b4_c1_cemetery');
  talk('b4_c1_key'); take('b4_c1_key', /crow feather/); const n3 = S.nerve, l3 = {haddat:S.loy.haddat, marrow:S.loy.marrow};
  take('b4_c1_key_chain', /Write it/); out.c = {key:S.f.b4_c1_key, bone:S.f.b4_bone, token:S.f.b4_c1_token, radde:S.f.b4_c1_radded, nerve:S.nerve - n3, haddat:S.loy.haddat - l3.haddat, marrow:S.loy.marrow - l3.marrow};
  out.c.ph = S.f.b4_c1_ph; out.c.area = S.area;
  talk('b4_c1_yard'); out.c.onward = has('b4_c1_yard', /end bunk-house/); take('b4_c1_yard', /end bunk-house/);
  out.c.brawl = await force('b4_c1_brawl'); out.c.done = S.f.b4_c1_brawlDone;
  talk('b4_c1_radde_n2'); out.c.knot = /knot/.test(DLG.b4_c1_radde_n2().txt);
  talk('b4_c1_yard'); take('b4_c1_yard', /Sleep/); take('b4_c1_dawn', /North/); await wait(50); out.c.end = {view, ch:S.chapters[1], lvl:S.lvl};

  /* ================= a Book Two transfer: Sathi alive, Ramin walking, Keth waiting ================= */
  setBook('hoc'); S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'guard', lvl:8, mates:['haddat', 'sathi', 'tangle', 'marrow'], dead:[], ramin:true, keth:true,
    f:{b2_c7_key:'guard', b2_nobles7:'backed', b2_hackleBack:0, keepsakes:['b2_bluethread']}};
  delete S.dead.sathi; S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'marrow']; migrate(S); S.picksDue = []; save(); startChapter(1);
  out.t = {renderErr:renderAll()};
  talk('b4_c1_start'); talk('b4_c1_fallout'); out.t.keneb = /Keneb/.test(DLG.b4_c1_grub().txt);
  startExplore('b4_c1_streets'); talk('b4_c1_sweep'); out.t.raminOffered = has('b4_c1_sweep', /Ramin/); take('b4_c1_sweep', /Ramin/); take('b4_c1_ramin', /Walk with us/);
  out.t.ramin = {in:b4In('redblade'), flag:S.f.b4_raminDone, sash:S.kit.includes('b4_c1_redsash')};
  talk('b4_c1_to_quay'); out.t.kethOffered = has('b4_c1_to_quay', /Keth/); take('b4_c1_to_quay', /Keth/); take('b4_c1_keth', /We're asking/);
  out.t.keth = {in:b4In('warlock'), flag:S.f.b4_kethDone, waits:/Another walks with you/.test(DLG.b4_c1_keth_join().txt)};
  out.t.recruitNamed = ['b4_c1_start', 'b4_c1_stall', 'b4_c1_yard_talk', 'b4_c1_key', 'b4_c1_dawn', 'b4_c1_yard_rest', 'b4_c1_dig_after'].filter(k => /Ramin/.test(DLG[k]().txt)).length;
  out.t.fight = await force('b4_c1_runners'); // Hackle at Sathi's knee
  S.f.b4_c1_water = 1; talk('b4_c1_gate'); take('b4_c1_gate_in', /In, and the gate/);
  talk('b4_c1_radde_night'); out.t.pullyk = /remember your face somewhere else/.test(DLG.b4_c1_radde_night().txt);
  talk('b4_c1_yard'); out.t.swapOffered = has('b4_c1_yard', /Send for Keth/); take('b4_c1_yard', /Send for Keth/);
  out.t.swap = {keth:b4In('warlock'), ramin:b4In('redblade'), raminWaits:S.f.b4_raminDone === 2, kethFlag:S.f.b4_kethDone};
  out.t.kethLine = /Keth/.test(DLG.b4_c1_yard_talk().txt);
  S.f.b4_c1_digDone = 1; startExplore('b4_c1_cemetery'); out.t.noBarrowName = !/may be under it/.test(DLG.b4_c1_chaincorner().txt);
  talk('b4_c1_key'); out.t.keepsake = has('b4_c1_key', /what we carried/); out.t.thread = has('b4_c1_key', /blue thread/);
  take('b4_c1_key', /what we carried/); const l4 = S.loy.sathi; take('b4_c1_key_chain', /Write it/); out.t.sathi = S.loy.sathi - l4; out.t.token = S.f.b4_c1_token;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, g = r.g || {}, c = r.c || {}, t = r.t || {};
if (f.area) {
  f.area === 'b4_c1_line' && f.ch === 1 && f.lvl0 === 8 && f.squad === 'sgt,haddat,tangle,marrow,tallow' && !f.renderErr.length ? ok('a fresh start opens Chapter One on the marshaling ground at level 8, and every b4_c1 node renders') : no('fresh ' + JSON.stringify(f));
  f.company === 1 && f.omen === -2 && f.blistig === 1 ? ok('the review: the company posting (b4_company), the omen and Blistig in the recruits\' hearing (Nerve −2), b4_blistig') : no('review ' + JSON.stringify([f.company, f.omen, f.blistig]));
  f.errand === 1 && f.hollet === 'ninth' && f.nerveWidget && ['clean', 'ok'].includes(f.drill) ? ok('Hollet\'s errand, Radde\'s book with the Nerve widget, the recruits drilled') : no('company ' + JSON.stringify([f.errand, f.hollet, f.nerveWidget, f.drill]));
  f.streets === 'b4_c1_streets' && f.relic.flag === 'bought' && f.relic.kit && f.relic.paid === 8 && f.noRamin && f.sash && f.water === 1 && f.noKeth ? ok('the streets: the relic bought to bury (8 silver), the sash, the water; no Ramin or Keth on a fresh start') : no('streets ' + JSON.stringify(f));
  f.gateNotNow && f.runners.started && f.runners.regs >= 1 && f.runners.after === 'b4_c1_runners_after' && f.runnersDone && f.pipe && f.clean === 1 ? ok(`the harbour fight: the company comes (${f.runners.regs} regular), a forced win, the pipe, and Nerve +1 for a clean fight`) : no('runners ' + JSON.stringify([f.runners, f.clean, f.pipe]));
  f.trick === 'haddat' ? ok('the trick: the Gate Drill, taught at the gate') : no('trick ' + f.trick);
  f.yard.area === 'b4_c1_barracks' && f.yard.ph === 2 && f.yard.deck && f.deck.drawn === 1 && f.deck.reader === 'marrow' && f.deck.inPool ? ok(`the first halt: the barracks yard, the Deck (Marrow reads: ${f.deck.card})`) : no('yard/deck ' + JSON.stringify([f.yard, f.deck]));
  f.fire.again && f.fire.rest && f.fire.talk && f.fire.on && f.fire.notNow && f.fire.pipe && f.rested === 1 && f.talkLines === f.squadHere ? ok(`the fire: an again line, a rest, the squad's talk (a line each, ${f.talkLines}), the pipe, the way on with Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere]));
  f.rumour && f.recNight === 'truth' && f.cem === 'b4_c1_cemetery' && f.chainLine ? ok('the night: the rumours, the recruits, over the wall, and one line for Sathi at the Chain\'s corner') : no('night ' + JSON.stringify([f.rumour, f.recNight, f.cem, f.chainLine]));
  f.dig.started && f.dig.stage2 && f.dig.inStage2 && f.dig.after === 'b4_c1_dig_after' && f.digDone && f.bury && f.buried && f.keyNotNow ? ok('the graveyard fight, both grounds forced; the market finger buried with the Chain\'s dead; the key can wait') : no('dig ' + JSON.stringify([f.dig, f.digDone, f.bury, f.buried, f.keyNotNow]));
}
g.key === 'grave' && g.bone === 'grave' && g.nerve === 2 && g.finger && g.ph === 3 && g.area === 'b4_c1_barracks' ? ok('key grave: b4_bone grave, Nerve +2, the finger bone, the second night') : no('grave ' + JSON.stringify(g));
g.onward && g.cem === 'b4_c1_cemetery' && g.watch && g.watch.stage2 && g.watch.inStage2 && g.watch.regs >= 1 && g.done && g.end && g.end.view === 'end' && g.end.ch === 'grave' && g.end.lvl >= 9 ? ok(`grave: the dig detail's fight, both grounds, then dawn and the chapter's end (level ${g.end && g.end.lvl}, Nerve ${g.end && g.end.nerve}; ${g.extras} end lines, ${g.journal} journal)`) : no('grave fight/end ' + JSON.stringify(g));
c.key === 'chain' && c.bone === 'chain' && c.token === 'feather' && c.radde === 1 && c.nerve === -1 && c.haddat === 1 && c.marrow === 1 && c.ph === 3 ? ok('key chain: b4_bone chain, the token, Radde\'s mark, Nerve −1, Haddat and Marrow +1') : no('chain ' + JSON.stringify(c));
c.onward && c.brawl && c.brawl.obj && c.brawl.stage2 && c.brawl.inStage2 && c.done && c.knot && c.end && c.end.view === 'end' && c.end.ch === 'chain' ? ok('chain: the brawl (an objective fight), both grounds, then dawn and the chapter\'s end') : no('chain fight/end ' + JSON.stringify(c));
if (t.renderErr) {
  !t.renderErr.length && t.keneb ? ok('a transfer on the Aren Guard road: every node renders; the captain who takes the boy is Keneb') : no('transfer ' + JSON.stringify(t.renderErr) + ' keneb ' + t.keneb);
  t.raminOffered && t.ramin.in && t.ramin.flag === 1 && t.ramin.sash && t.recruitNamed >= 5 ? ok(`Ramin on the drink sweep joins (b4Join), gives his sash, and is named in ${t.recruitNamed} of 7 sampled nodes`) : no('ramin ' + JSON.stringify([t.raminOffered, t.ramin, t.recruitNamed]));
  t.kethOffered && !t.keth.in && t.keth.flag === 2 && t.keth.waits ? ok('Keth on the quay waits near: one recruit walks at a time') : no('keth ' + JSON.stringify([t.kethOffered, t.keth]));
  t.fight.dog && t.fight.started ? ok('Hackle is at Sathi\'s knee in the chapter\'s fights') : no('dog ' + JSON.stringify(t.fight));
  t.pullyk ? ok('b2_nobles7 came across: the line about Pullyk Alar\'s empty house') : no('pullyk');
  t.swapOffered && t.swap.keth && !t.swap.ramin && t.swap.raminWaits && t.kethLine ? ok('the swap at the fire: Keth in, Ramin back to the Red Blades, near; Keth has his line at the fire') : no('swap ' + JSON.stringify([t.swapOffered, t.swap, t.kethLine]));
  t.noBarrowName && t.keepsake && t.thread && t.token === 'keepsake' && t.sathi === 1 ? ok('nobody fell at the Barrow: no name on the board; the key offers the keepsake and Haddat\'s thread; Sathi +1 on chain') : no('transfer key ' + JSON.stringify([t.noBarrowName, t.keepsake, t.thread, t.token, t.sathi]));
}
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b4ch1: FAIL (${bad.length})` : 'b4ch1: all ok'); process.exit(bad.length ? 1 : 0);
