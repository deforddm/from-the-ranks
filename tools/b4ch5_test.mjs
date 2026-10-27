// Book Four, Chapter 5 (The Wall, src/75_b4_ch5.js): the chapter's halts, both keys, every fight's start and a forced win (both grounds
// of each), the trick, the veil and the sea-glass, the fire and the swap; from a fresh start at level 12, and from a Book Two transfer
// with Haddat dead and Sathi alive, so the seep's fallback finders (Orvas, a Seti scout, Darrut) are each tried.
// Usage: node tools/b4ch5_test.mjs   (build first; exit 1 on a failure)
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
  /* a fight forced: both grounds, then the node after it */
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.regs = B.def.b4Regs || 0; res.dust = b4DustNow(); res.dog = B.units.some(u => u.kind === 'hackle');
    res.foes = B.units.filter(u => u.side === 'e').length;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60);
      res.inStage2 = !!B && !!B.def.isStage2; res.regs2 = B.units.filter(u => u.b4reg).length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); } // a level's talent pick came first
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b4_c5_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); if (/undefined|NaN|\[object|\$\{/.test(n.txt)) errs.push(k + ': leaks'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const lvl12 = () => { S.lvl = 12; S.xp = LEVELS[11]; S.chapters = {1:'grave', 2:'march', 3:'carry', 4:'seti'}; Object.assign(S.f, {b4_c1_key:'grave', b4_bone:'grave', b4_c2_key:'march', b4_c3_key:'carry', b4_carried:1, b4_c4_key:'seti'}); S.picksDue = []; };
  try {
  /* ================= a fresh start, at Chapter Five ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); lvl12(); save(); startChapter(5);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, dust:S.dust, n0:S.nerve, renderErr:renderAll(), nodes:nodes.length};
  talk('b4_c5_start'); out.f.omen = S.nerve - out.f.n0; out.f.deckFirst = has('b4_c5_start', /Deck/);
  take('b4_c5_start', /Walk the camp/);
  talk('b4_c5_radde'); out.f.nerveWidget = /Nerve/.test(DLG.b4_c5_radde().html || ''); take('b4_c5_radde', /Send the seven/); out.f.picket = S.f.b4_c5_raddeSaid && S.f.b4_c5_seven;
  talk('b4_c5_recruits'); const nr = S.nerve; take('b4_c5_recruits', /Sleep\."/); out.f.recruits = S.nerve - nr;
  talk('b4_c5_reshuffle'); out.f.reshuffle = {flag:S.f.b4_c5_reshuffle, keneb:/Keneb/.test(DLG.b4_c5_reshuffle().txt), not9:/Not the 9th/.test(DLG.b4_c5_reshuffle().ch.map(c => c.t).join(' '))};
  talk('b4_c5_bredd'); talk('b4_c5_wagon'); out.f.camp = {bredd:/Neffarias Bredd/.test(DLG.b4_c5_bredd().txt), dolls:/dolls/.test(DLG.b4_c5_wagon().txt)};
  talk('b4_c5_lookout'); made('b4_c5_lookout', /proper look/, 'haddat'); out.f.lone = S.f.b4_c5_lone; out.f.noName = !/Gamet|Grub/.test(DLG.b4_c5_lookout_ok().txt);
  /* the reading short of the Wall */
  talk('b4_c5_deck'); const dk = DLG.b4_c5_deck(); runFx(dk.ch.find(c => /draw/.test(c.t))); out.f.deck = {drawn:S.f.b4_c5_drawn, reader:S.f.b4_c5_reader, card:S.card, inPool:B4POOL[5].includes(S.card)};
  S.card = 'b4c_leper'; { const cn = DLG.b4_c5_card(); cn.fx(); } out.f.chains = S.f.b4_chains;
  /* the fire */
  talk('b4_c5_wallfire'); const fy = DLG.b4_c5_wallfire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b4_c5_wallfire', /rest/), talk:has('b4_c5_wallfire', /Talk with the squad/), on:has('b4_c5_wallfire', /Sleep/), notNow:has('b4_c5_wallfire', /Not now/)};
  take('b4_c5_wallfire', /Let the squad rest/); out.f.rested = S.f.b4_c5_rest;
  out.f.talkLines = DLG.b4_c5_wallfire_talk().txt.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  take('b4_c5_wallfire', /Sleep/); out.f.dawnStay = has('b4_c5_dawn', /moment/); take('b4_c5_dawn', /Out to the Wall/);
  out.f.edge = {area:S.area, ph:S.f.b4_c5_ph};
  /* the Wall's edge: the picket, the riders in the sand */
  talk('b4_c5_picket'); out.f.picketNotNow = has('b4_c5_picket', /Not now/) && has('b4_c5_picket', /Read where/);
  const n1 = S.nerve; out.f.riders = await force('b4_c5_wallriders'); out.f.ridersClean = S.nerve - n1; out.f.veil = S.kit.includes('b4_c5_veil'); out.f.ridersDone = S.f.b4_c5_ridersDone;
  const nw = S.nerve; take('b4_c5_riders_after', /head of the army/); out.f.withdraw = {flag:S.f.b4_c5_withdrawn, nerve:S.nerve - nw, far:/a mile off/.test(DLG.b4_c5_withdraw().txt), noSword:!/sword/i.test(DLG.b4_c5_withdraw().txt)};
  talk('b4_c5_scouts'); out.f.scouts = S.f.b4_c5_scouts;
  take('b4_c5_withdraw', /Fall in/); out.f.walkStay = has('b4_c5_walkin', /Not yet/); take('b4_c5_walkin', /The morning/);
  out.f.sea = {area:S.area, ph:S.f.b4_c5_ph, inside:S.f.b4_c5_inside, barrow:/Sathi would have found a horse/.test(DLG.b4_c5_sea_arrive().txt), warren:/the warren at the Vathar/.test(DLG.b4_c5_sea_arrive().txt)};
  take('b4_c5_sea_arrive', /Fall in/); const nb = S.nerve; out.f.bandageTxt = /bandage/.test(DLG.b4_c5_bandage().txt) && !/hits him|hit him\b/.test(DLG.b4_c5_bandage().txt);
  take('b4_c5_bandage', /Tell the recruits/); out.f.bandage = {flag:S.f.b4_c5_bandage, nerve:S.nerve - nb};
  /* the kit and the trick on the sea floor */
  talk('b4_c5_ship'); made('b4_c5_ship', /Prise the glass/, 'tangle', 'near'); out.f.glass = {kit:S.kit.includes('b4_c5_seaglass'), bruised:!!(S.bruised && S.bruised.tangle)};
  talk('b4_c5_shells'); out.f.conch = S.kit.includes('b4_c5_conch') && /grandmother/.test(DLG.b4_c5_shells().txt);
  talk('b4_c5_marker'); made('b4_c5_marker', /Learn to read/, 'haddat'); out.f.trick = S.tricks && S.tricks.b4_c5_seabed && S.tricks.b4_c5_seabed.who;
  talk('b4_c5_hollet_sea'); out.f.hollet = /Seven days/.test(DLG.b4_c5_hollet_sea().txt);
  talk('b4_c5_to_canal'); out.f.canalShut = !has('b4_c5_to_canal', /canal city/);
  talk('b4_c5_key'); out.f.key = {finder:(DLG.b4_c5_key().fx(), S.f.b4_c5_finder), widow:/the Widow/.test(DLG.b4_c5_key().txt), notNow:has('b4_c5_key', /moment/)};
  const snap = JSON.stringify(S);
  /* key: seep */
  const ls = {n:S.nerve, h:S.loy.haddat};
  take('b4_c5_key', /Show us the Widow/); out.s = {key:S.f.b4_c5_key, nerve:S.nerve - ls.n, haddat:S.loy.haddat - ls.h};
  out.s.chosenStay = has('b4_c5_seep_chosen', /Not yet/); take('b4_c5_seep_chosen', /Off the road/);
  made('b4_c5_seep_go', /Find it in the dust/, 'haddat', 'near'); out.s.found = S.f.b4_c5_found; out.s.thirst = Object.keys(S.bruised || {}).length;
  out.s.startNotNow = has('b4_c5_seep_start', /Not now/);
  out.s.fight = await force('b4_c5_seep'); out.s.done = S.f.b4_c5_seepDone; out.s.water = S.f.b4_seepWater;
  const n3 = S.nerve; take('b4_c5_seep_after', /Into the column/); out.s.waterNerve = S.nerve - n3;
  take('b4_c5_to_canal', /Into the canal city/); out.s.canal = {area:S.area, ph:S.f.b4_c5_ph};
  take('b4_c5_canal_arrive', /Find Radde/); talk('b4_c5_radde_canal'); take('b4_c5_radde_canal', /bring them back/);
  talk('b4_c5_ghosts'); out.s.ghosts = S.f.b4_c5_ghosts;
  out.s.nightShut = !has('b4_c5_night', /Sleep/);
  const n4 = S.nerve; talk('b4_c5_des_start'); DLG.b4_c5_des_start().fx(); out.s.dead = S.nerve - n4; out.s.desNotNow = has('b4_c5_des_start', /Not now/);
  out.s.des = await force('b4_c5_deserters'); out.s.desDone = S.f.b4_c5_desDone;
  take('b4_c5_des_after', /The night/); out.s.nightStay = has('b4_c5_night', /Not yet/); take('b4_c5_night', /Sleep/); await wait(50);
  out.s.end = {view, ch:S.chapters[5], lvl:S.lvl, nerve:S.nerve, net:S.nerve - out.f.n0}; out.s.extras = CHAPTERS[5].extras().length; out.s.journal = CHAPTERS[5].journal().length;
  /* key: column, from the same moment */
  S = JSON.parse(snap); save(); startExplore('b4_c5_seabed');
  talk('b4_c5_key'); const lc = {n:S.nerve, h:S.loy.haddat}; take('b4_c5_key', /The column, as ordered/); out.c = {key:S.f.b4_c5_key, water:S.f.b4_seepWater, nerve:S.nerve - lc.n, haddat:S.loy.haddat - lc.h};
  take('b4_c5_column', /last wagons/); out.c.rearNotNow = has('b4_c5_rear_start', /Not now/);
  const n5 = S.nerve; out.c.fight = await force('b4_c5_rearguard'); out.c.clean = S.nerve - n5; out.c.done = S.f.b4_c5_rearDone;
  take('b4_c5_rear_after', /On, with the column/); take('b4_c5_to_canal', /Into the canal city/); talk('b4_c5_radde_canal'); take('b4_c5_radde_canal', /bring them back/);
  talk('b4_c5_des_start'); DLG.b4_c5_des_start().fx(); made('b4_c5_des_start', /Tell them to run/, 'haddat'); take('b4_c5_des_talked', /Fewer/); await wait(40); out.c.talked = view === 'battle' && !!B && B.surprise === 'p'; B.over = true;
  out.c.des = await force('b4_c5_deserters'); take('b4_c5_des_after', /The night/); take('b4_c5_night', /Sleep/); await wait(50);
  out.c.end = {view, ch:S.chapters[5], lvl:S.lvl, nerve:S.nerve};
  /* the trick, the veil and the sea-glass in a fight: Tebbet's bow in dust 2 */
  S = JSON.parse(snap); if (!S.squad.includes('tebbet')) S.squad.push('tebbet'); migrate(S); S.tricks = {b4_c5_seabed:{who:'haddat', ch:5}}; save();
  startBattle('b4_c5_wallriders', {}); await wait(60);
  { const tb = B.units.find(u => u.id === 'tebbet'), hd = B.units.find(u => u.id === 'haddat'), mv0 = tb.mv; out.tr = {r0:tb.b4rng0, dusty:tb.rng};
    AB.t_b4_c5_seabed.run(hd); out.tr.clear = tb.rng; out.tr.mv = tb.mv - mv0; squadTurnStart(hd); out.tr.back = tb.rng; out.tr.mvBack = tb.mv - mv0; B.over = true; }
  equip('tebbet', 'b4_c5_veil'); startBattle('b4_c5_wallriders', {}); await wait(60);
  { const tb = B.units.find(u => u.id === 'tebbet'); out.tr.veil = tb.rng; B.over = true; }
  equip('tebbet', 'b4_c5_seaglass'); startBattle('b4_c5_wallriders', {}); await wait(60);
  { const tb = B.units.find(u => u.id === 'tebbet'), e = B.units.find(u => u.side === 'e'); out.tr.glass = tb.rng; e.x = tb.x; e.y = Math.max(0, tb.y - 3); attack(tb, e); out.tr.glassAfter = tb.rng; B.over = true; }
  } catch (e) { out.err = e.stack; }
  /* ================= a Book Two transfer: Haddat dead at the Barrow, Sathi alive, Ramin walking ================= */
  try {
  setBook('hoc'); S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'guard', lvl:8, mates:['sathi', 'tangle', 'marrow'], dead:['haddat'], ramin:true, keth:false,
    f:{b2_c7_key:'guard', b2_hackleBack:0, keepsakes:[]}};
  delete S.dead.sathi; S.dead = {haddat:{ch:7, where:'The Barrow', from:'dg'}}; S.squad = ['sgt', 'sathi', 'tangle', 'marrow', 'tallow', 'redblade']; S.f.b4_raminDone = 1; S.f.b4_orvasDone = 2; migrate(S); lvl12();
  S.f.b4_blistigNoticed = 1; save(); startChapter(5);
  out.t = {renderErr:renderAll(), ramin:b4In('redblade'), haddat:b4In('haddat')};
  out.t.raminNamed = ['b4_c5_start', 'b4_c5_wallfire_talk', 'b4_c5_reshuffle', 'b4_c5_picket', 'b4_c5_withdraw', 'b4_c5_sea_arrive', 'b4_c5_key', 'b4_c5_canal_arrive', 'b4_c5_night'].filter(k => { const n = DLG[k](); return /Ramin/.test(n.txt); }).length;
  out.t.fight = await force('b4_c5_wallriders');
  /* the swap at the fire: Orvas in, Ramin back to the Red Blades */
  talk('b4_c5_wallfire'); out.t.swapOffered = has('b4_c5_wallfire', /Send for Orvas/); take('b4_c5_wallfire', /Send for Orvas/);
  out.t.swap = {orvas:b4In('orvas'), ramin:b4In('redblade'), raminWaits:S.f.b4_raminDone === 2, line:/Orvas/.test(DLG.b4_c5_wallfire_swap().txt), fireLine:/Orvas/.test(DLG.b4_c5_wallfire_talk().txt)};
  S.f.b4_c5_ph = 3; startExplore('b4_c5_seabed');
  out.t.barrow = /Haddat would have known/.test(DLG.b4_c5_sea_arrive().txt); out.t.blistig = /knows the Third's name/.test(DLG.b4_c5_bandage().txt);
  /* the seep's finders, in order: Orvas walking; a Seti scout who remembers (Ch4's seti road); Darrut; a Seti scout of the screen */
  const fnd = () => { const n = DLG.b4_c5_key(); n.fx(); return {f:S.f.b4_c5_finder, ok:!/undefined|NaN|\$\{/.test(n.txt), seep:n.ch.some(c => /seep|Widow/.test(c.t))}; };
  out.t.finders = {};
  out.t.finders.orvas = fnd();
  b4SwapIn('redblade'); out.t.finders.none = fnd();
  S.f.b4_setiSaved = 1; out.t.finders.seti = fnd(); out.t.setiNpc = AREAS.b4_c5_seabed.npcs.find(n => n.id === 'seti').show();
  delete S.f.b4_setiSaved; S.squad = S.squad.filter(k => k !== 'redblade'); S.squad.push('darrut'); migrate(S); /* v7.2: six at most */ out.t.finders.darrut = fnd();
  talk('b4_c5_key'); take('b4_c5_key', /Show us the seep/); take('b4_c5_seep_chosen', /Off the road/); out.t.seepGo = /Darrut leads/.test(DLG.b4_c5_seep_go().txt);
  out.t.seep = await force('b4_c5_seep'); out.t.water = S.f.b4_seepWater;
  } catch (e) { out.err2 = e.stack; }
  return out;
});
if (r.err) no('page script threw (fresh): ' + r.err);
if (r.err2) no('page script threw (transfer): ' + r.err2);
const f = r.f || {}, s = r.s || {}, c = r.c || {}, t = r.t || {}, tr = r.tr || {};
if (f.area) {
  f.area === 'b4_c5_camp' && f.ch === 5 && f.lvl0 === 12 && f.dust === 1 && f.squad === 'sgt,haddat,tangle,marrow,tallow' && !f.renderErr.length && f.nodes >= 60 && f.nodes <= 80 ? ok(`a fresh start opens Chapter Five short of the Wall at level 12, Dust 1, and every one of ${f.nodes} b4_c5 nodes renders`) : no('fresh ' + JSON.stringify(f));
  f.omen === -1 && f.deckFirst && f.nerveWidget && f.picket && f.recruits === 1 ? ok('the first halt: the Wall (Nerve −1) and the Deck; Radde\'s book with the Nerve widget, the picket and the seven; the recruits steadied (+1)') : no('halt ' + JSON.stringify([f.omen, f.deckFirst, f.nerveWidget, f.picket, f.recruits]));
  f.reshuffle.flag && f.reshuffle.keneb && f.reshuffle.not9 && f.camp.bredd && f.camp.dolls && f.lone === 1 && f.noName ? ok('the camp: the reshuffle in Keneb\'s company seen across the hollow (not the 9th), Neffarias Bredd in rumour, the marine mage\'s dolls in the queue, an officer walking to the Wall alone (never named)') : no('camp ' + JSON.stringify([f.reshuffle, f.camp, f.lone, f.noName]));
  f.deck.drawn === 1 && f.deck.reader === 'marrow' && f.deck.inPool && f.chains === 1 ? ok(`the reading short of the Wall (Marrow draws ${f.deck.card}); the Leper sets b4_chains`) : no('deck ' + JSON.stringify([f.deck, f.chains]));
  f.fire.again && f.fire.rest && f.fire.talk && f.fire.on && f.fire.notNow && f.rested === 1 && f.talkLines === f.squadHere && f.dawnStay ? ok(`the fire b4_c5_wallfire: an again line, a rest, the squad's talk (a line each, ${f.talkLines}), the way on with Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere, f.dawnStay]));
  f.edge.area === 'b4_c5_edge' && f.picketNotNow && f.riders.started && f.riders.dust === 2 && f.riders.regs >= 1 && f.riders.stage2 && f.riders.inStage2 && f.riders.after === 'b4_c5_riders_after' && f.ridersDone && f.veil && f.ridersClean === 1 ? ok(`the picket at the Wall: riders out of the sand in dust 2, the company (${f.riders.regs} regular), both grounds, Nerve +1 for a clean fight; the veil`) : no('riders ' + JSON.stringify([f.edge, f.picketNotNow, f.riders, f.ridersDone, f.veil, f.ridersClean]));
  f.withdraw.flag && f.withdraw.nerve === 1 && f.withdraw.far && f.withdraw.noSword && f.scouts && f.walkStay ? ok('the Wall goes back, seen from a mile off (Nerve +1, no sword); Temul\'s scouts go in; the walk in can wait') : no('withdraw ' + JSON.stringify([f.withdraw, f.scouts, f.walkStay]));
  f.sea.area === 'b4_c5_seabed' && f.sea.ph === 3 && f.sea.inside && f.sea.barrow && f.sea.warren && f.bandageTxt && f.bandage.flag === 'told' && f.bandage.nerve === 1 ? ok('inside: the old sea floor, the one Barrow line (Sathi), Marrow\'s warren "like the Vathar, only older"; Blistig\'s bandage next morning, the story told (Nerve +1)') : no('sea ' + JSON.stringify([f.sea, f.bandageTxt, f.bandage]));
  f.glass.kit && f.glass.bruised && f.conch && f.trick === 'haddat' && f.hollet && f.canalShut && f.key.finder === 'haddat' && f.key.widow && f.key.notNow ? ok('the sea-glass (its "yes, but"), the conch, the Sea-Bed Road learned at the marker; Hollet\'s seven days; Haddat knows the seep (the Widow); the key can wait') : no('sea kit ' + JSON.stringify([f.glass, f.conch, f.trick, f.hollet, f.canalShut, f.key]));
}
s.key === 'seep' && s.nerve === -1 && s.haddat === 2 && s.chosenStay && s.found === 'ok' && s.thirst >= 4 && s.startNotNow && s.fight && s.fight.started && s.fight.dust === 1 && s.fight.stage2 && s.fight.inStage2 && s.done && s.water === 1 && s.waterNerve === 2 ? ok('key seep: Nerve −1 (the company saw), Haddat +2; the walk\'s "yes, but"; the seep fight in dust 1, both grounds; b4_seepWater 1 and Nerve +2 when the water comes back') : no('seep ' + JSON.stringify(s));
s.canal && s.canal.area === 'b4_c5_canal' && s.ghosts && s.nightShut && s.dead === -1 && s.desNotNow && s.des && s.des.started && s.des.stage2 && s.des.inStage2 && s.desDone && s.nightStay && s.end && s.end.view === 'end' && s.end.ch === 'seep' && s.end.lvl >= 13 && s.end.net >= -2 && s.end.net <= 5 ? ok(`seep: the canal city at dusk, the road of standing stones, the 10th's dead (Nerve −1), the deserters, both grounds; the end at level ${s.end && s.end.lvl}, Nerve ${s.end && s.end.nerve} (net ${s.end && s.end.net}; ${s.extras} end lines, ${s.journal} journal)`) : no('seep canal/end ' + JSON.stringify(s));
c.key === 'column' && c.water === 0 && c.nerve === 1 && c.haddat === -1 && c.rearNotNow && c.fight && c.fight.started && c.fight.regs >= 1 && c.fight.stage2 && c.fight.inStage2 && c.done && c.talked && c.end && c.end.view === 'end' && c.end.ch === 'column' && c.end.lvl >= 13 ? ok(`key column: Nerve +1, Haddat −1, b4_seepWater 0; the rearguard with the company, both grounds; the deserters talked down to a fight with the advantage; the end at level ${c.end && c.end.lvl}`) : no('column ' + JSON.stringify(c));
tr.r0 >= 6 && tr.dusty === tr.r0 - 2 && tr.clear === tr.r0 && tr.mv === 1 && tr.back === tr.r0 - 2 && tr.mvBack === 0 && tr.veil === tr.r0 - 1 && tr.glass === tr.r0 - 1 && tr.glassAfter === tr.r0 - 2 ? ok('in dust 2: the Sea-Bed Road clears the bow\'s range (−2 → 0) and +1 move until the bearer\'s next turn; the veil halves the dust (−1); the sea-glass +1 for the first shot only') : no('trick/kit in battle ' + JSON.stringify(tr));
if (t.renderErr) {
  !t.renderErr.length && t.ramin && !t.haddat && t.raminNamed >= 6 ? ok(`a transfer with Haddat dead and Ramin walking: every node renders; Ramin named in ${t.raminNamed} of 9 sampled nodes`) : no('transfer ' + JSON.stringify([t.renderErr, t.ramin, t.haddat, t.raminNamed]));
  t.fight && t.fight.dog && t.fight.started ? ok('Hackle is at Sathi\'s knee in the chapter\'s fights') : no('dog ' + JSON.stringify(t.fight));
  t.swapOffered && t.swap.orvas && !t.swap.ramin && t.swap.raminWaits && t.swap.line && t.swap.fireLine ? ok('the swap at the fire: Orvas in, Ramin back to the Red Blades; Orvas has his line at the fire') : no('swap ' + JSON.stringify([t.swapOffered, t.swap]));
  t.barrow && t.blistig ? ok('the Barrow line is Haddat\'s; Blistig knows the Third\'s name (Ch4\'s picket road)') : no('transfer lines ' + JSON.stringify([t.barrow, t.blistig]));
  const F = t.finders || {};
  F.orvas && F.orvas.f === 'orvas' && F.none.f === 'scout' && F.seti.f === 'seti' && t.setiNpc && F.darrut.f === 'darrut' && [F.orvas, F.none, F.seti, F.darrut].every(x => x.ok && x.seep) && t.seepGo && t.seep && t.seep.started && t.water === 1 ? ok('the seep without Haddat: Orvas walking, else a Seti scout who remembers (and the Seti archer on the road), else Darrut\'s map, else a Seti scout of the screen; Darrut leads, and the seep is fought') : no('finders ' + JSON.stringify([F, t.setiNpc, t.seepGo, t.seep, t.water]));
}
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
process.exit(bad.length ? 1 : 0);
