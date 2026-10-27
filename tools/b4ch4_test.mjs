// Book Four, Chapter 4 (Leoman's Raids, src/74_b4_ch4.js): the chapter's halts, both keys, every fight's start and a forced win (both
// grounds of each), the trick, the unbroken lamp, the salve, the fire and the swap; from a fresh start at level 11, and from a Book Two
// transfer with Sathi alive and a recruit walking (Ramin, with Orvas near).
// Usage: node tools/b4ch4_test.mjs   (build first; exit 1 on a failure)
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
  /* a check made: the roll settles for whoever is named (a trick check teaches them) */
  const made = (id, re, who, tier = 'clean') => { const n = DLG[id](), c = n.ch.filter(x => !x.req || x.req()).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c);
    settleRoll({who, stat:c.check[0], tier, ok:tier !== 'near', pass:true, margin:tier === 'near' ? -1 : 6, nat:tier === 'near' ? 9 : 18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  /* a fight forced: both grounds when there are two, then the node after it */
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.regs = B.def.b4Regs || 0; res.obj = !!B.def.objective; res.dog = B.units.some(u => u.kind === 'hackle');
    res.foes = B.units.filter(u => u.side === 'e').length; res.fires = B.fires.length; res.allies = B.units.filter(u => u.ally && u.kind === 'b4_c4_setiwounded').length;
    res.fog = B.log.some(l => /^<em>Fog\./.test(l)) && !B.log.some(l => /Whirlwind's sand/.test(l));
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60);
      res.inStage2 = !!B && !!B.def.isStage2; res.allies2 = B.units.filter(u => u.ally && u.kind === 'b4_c4_setiwounded').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); } // a level's talent pick came first
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b4_c4_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); if (/undefined|NaN|\[object/.test(n.txt)) errs.push(k + ': leaks'); if (!n.ch.filter(c => !c.req || c.req()).length) errs.push(k + ': no choice'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const lvl11 = () => { S.lvl = 11; S.xp = LEVELS[10]; S.chapters = {1:'grave', 2:'march', 3:'carry'}; S.f.b4_c1_key = 'grave'; S.f.b4_bone = 'grave'; S.f.b4_c2_key = 'march'; S.f.b4_c3_key = 'carry'; S.f.b4_carried = 1; S.picksDue = []; };
  try {
  /* ================= a fresh start, at Chapter Four ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); lvl11(); save(); startChapter(4);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, n0:S.nerve, renderErr:renderAll(), nodes:nodes.length, key:JSON.stringify(B4KEYS[4])};
  talk('b4_c4_start'); take('b4_c4_start', /Watch him/); out.f.sun = {node:S.node, boy:/small boy/.test(DLG.b4_c4_start().txt)}; take('b4_c4_sun', /shade/);
  talk('b4_c4_radde'); out.f.nerveWidget = /Nerve/.test(DLG.b4_c4_radde().html || ''); take('b4_c4_radde', /wagon line/); out.f.orders = S.f.b4_c4_orders;
  talk('b4_c4_recruits'); const nr = S.nerve; take('b4_c4_recruits', /can walk it/); out.f.recruits = S.nerve - nr;
  talk('b4_c4_lancers_pass'); made('b4_c4_lancers_pass', /Call after/, 'haddat', 'near'); out.f.called = S.f.b4_c4_called; out.f.rattled = !!(S.rattled && S.rattled.haddat);
  talk('b4_c4_hollet'); take('b4_c4_hollet', /hat/); out.f.hat = S.node;
  talk('b4_c4_to_camp'); out.f.campNotNow = has('b4_c4_to_camp', /Not now/); take('b4_c4_to_camp', /Make camp/); const nraid = S.nerve; take('b4_c4_dusk', /feet/);
  out.f.raid = {nerve:S.nerve - nraid, leoman:S.f.b4_leoman, ph:S.f.b4_c4_ph};
  const sh0 = S.inv.sharper || 0; made('b4_c4_raid', /munitions out/, 'tangle'); out.f.muni = {flag:S.f.b4_c4_muni, sharper:(S.inv.sharper || 0) - sh0};
  const nw = S.nerve; out.f.wagons = await force('b4_c4_wagons'); out.f.wagonsClean = S.nerve - nw; out.f.wagonsDone = S.f.b4_c4_wagonsDone;
  take('b4_c4_wagons_after', /Into the camp/); out.f.camp = S.area;
  talk('b4_c4_camp_recruits'); out.f.nerveWidget2 = /Nerve/.test(DLG.b4_c4_camp_recruits().html || ''); take('b4_c4_camp_recruits', /held the line/);
  talk('b4_c4_ashes'); take('b4_c4_ashes', /unbroken one/); out.f.lamp = S.kit.includes('b4_c4_lampball');
  made('b4_c4_ashes', /dud to pieces/, 'tangle'); out.f.trick = S.tricks && S.tricks.b4_c4_bola && S.tricks.b4_c4_bola.who;
  talk('b4_c4_to_seti'); out.f.setiNotYet = has('b4_c4_to_seti', /Not yet/); talk('b4_c4_camp_radde');
  talk('b4_c4_to_seti'); out.f.setiNotNow = has('b4_c4_to_seti', /Not now/); const na = S.nerve; take('b4_c4_to_seti', /On, with the column/);
  out.f.ambush = {nerve:S.nerve - na, flag:S.f.b4_c4_ambush, ph:S.f.b4_c4_ph}; take('b4_c4_ambush', /wounded camp/);
  out.f.seti = {area:S.area, deck:has('b4_c4_seti_arrive', /Deck/), barrow:/Sathi would have been/.test(DLG.b4_c4_seti_arrive().txt)};
  /* the reading at the wounded Seti's fire */
  talk('b4_c4_deck'); const dk = DLG.b4_c4_deck(); const draw = dk.ch.find(c => /draw/.test(c.t)); runFx(draw); out.f.deck = {drawn:S.f.b4_c4_drawn, reader:S.f.b4_c4_reader, card:S.card, inPool:B4POOL[4].includes(S.card), queen:B4POOL[4].filter(c => c === 'b2c_queen').length};
  /* the fire */
  talk('b4_c4_setifire'); const fy = DLG.b4_c4_setifire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b4_c4_setifire', /rest/), talk:has('b4_c4_setifire', /Talk with the squad/), on:has('b4_c4_setifire', /shouting/), notNow:has('b4_c4_setifire', /Not now/)};
  take('b4_c4_setifire', /Let the squad rest/); out.f.rested = S.f.b4_c4_rest;
  out.f.talkLines = DLG.b4_c4_setifire_talk().txt.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  /* the wounded, the cutter's salve, the archer's bow, the Adjunct's word */
  talk('b4_c4_tents'); const nt = S.nerve; made('b4_c4_tents', /under the wagons/, 'marrow'); out.f.tents = {flag:S.f.b4_c4_carried, nerve:S.nerve - nt};
  talk('b4_c4_healer'); out.f.salve = S.kit.includes('b4_c4_salve'); out.f.healerAgain = /More salve/.test(DLG.b4_c4_healer().txt);
  talk('b4_c4_archer'); made('b4_c4_archer', /Try her bow/, 'tallow'); out.f.bow = {kit:S.kit.includes('b4_c4_setibow'), flag:S.f.b4_c4_setibow};
  out.f.adjunct = /Wounded Malazans are better than dead ones/.test(DLG.b4_c4_hollet_seti().txt);
  /* the lancers' grudge: avoidable by talk; and the fight forced */
  talk('b4_c4_lancers'); out.f.lancersNotNow = has('b4_c4_lancers', /Not now/);
  const snapL = JSON.stringify(S);
  made('b4_c4_lancers', /Talk them down/, 'haddat'); out.f.lancersTalked = {done:S.f.b4_c4_lancersDone, how:S.f.b4_c4_lancersHow};
  S = JSON.parse(snapL); save(); startExplore('b4_c4_seti');
  out.f.lancers = await force('b4_c4_lancers_brawl'); out.f.lancersDone = S.f.b4_c4_lancersDone;
  talk('b4_c4_setifire'); out.f.fireKey = has('b4_c4_setifire', /night's orders/);
  talk('b4_c4_key'); out.f.keyNotNow = has('b4_c4_key', /moment/);
  const snap = JSON.stringify(S);
  /* key: seti */
  const ls = {n:S.nerve, m:S.loy.marrow};
  take('b4_c4_key', /stay with the wounded/); out.s = {key:S.f.b4_c4_key, saved:S.f.b4_setiSaved, nerve:S.nerve - ls.n, marrow:S.loy.marrow - ls.m};
  take('b4_c4_key_seti', /small hours/); out.s.vigilNotNow = has('b4_c4_vigil', /Not yet/);
  out.s.fight = await force('b4_c4_wounded'); out.s.done = S.f.b4_c4_woundedDone;
  const nm = S.nerve; take('b4_c4_wounded_after', /Wait for the morning/); out.s.morning = {node:S.node, nerve:S.nerve - nm, ph:S.f.b4_c4_ph, blistig:S.f.b4_blistigNoticed, keneb:/Keneb's acting Fist/.test(DLG.b4_c4_morning().txt), gamet:/Fist Gamet/.test(DLG.b4_c4_morning().txt)};
  take('b4_c4_morning', /empty helms/); out.s.helm = S.kit.includes('b4_c4_helm'); take('b4_c4_helm', /Fall in/); await wait(50);
  out.s.end = {view, ch:S.chapters[4], lvl:S.lvl, nerve:S.nerve, saved:S.f.b4_setiSaved}; out.s.extras = CHAPTERS[4].extras().length; out.s.journal = CHAPTERS[4].journal().length;
  /* key: picket, from the same moment */
  S = JSON.parse(snap); save(); startExplore('b4_c4_seti');
  talk('b4_c4_key'); const lp = {n:S.nerve, t:S.loy.tebbet, m:S.loy.marrow}; take('b4_c4_key', /far end/); out.p = {key:S.f.b4_c4_key, saved:S.f.b4_setiSaved, nerve:S.nerve - lp.n, marrow:S.loy.marrow - lp.m};
  take('b4_c4_key_picket', /North, into the hills/); out.p.area = S.area; take('b4_c4_hills_arrive', /lantern/);
  talk('b4_c4_lantern'); take('b4_c4_lantern', /Keep it lit/); out.p.lit = S.f.b4_c4_lanternLit; out.p.far = /other end of the 9th's line/.test(DLG.b4_c4_lantern().txt) || /long way from it/.test(DLG.b4_c4_lantern().txt);
  talk('b4_c4_fogshapes'); out.p.notYet = has('b4_c4_fogshapes', /Not yet/);
  out.p.fight = await force('b4_c4_picket'); out.p.done = S.f.b4_c4_picketDone;
  take('b4_c4_picket_after', /until morning/); out.p.blistig = S.f.b4_blistigNoticed; out.p.lost = /did not see the morning/.test(DLG.b4_c4_morning().txt);
  take('b4_c4_morning', /Fall in/); await wait(50);
  out.p.end = {view, ch:S.chapters[4], lvl:S.lvl, nerve:S.nerve};
  /* the trick in a fight: the bola bursts on the mark and leaves oil round it, 1d6 + the level step to whoever starts a turn there */
  S = JSON.parse(snap); S.tricks = {b4_c4_bola:{who:'tangle', ch:4}}; if (!S.kit.includes('b4_c4_lampball')) S.kit.push('b4_c4_lampball'); equip('marrow', 'b4_c4_lampball'); /* v7.2: one wearer per piece */ S.card = null; save(); startBattle('b4_c4_picket', {}); await wait(60);
  { const u = B.units.find(x => x.id === 'tangle'), e = B.units.find(x => x.side === 'e'), m = B.units.find(x => x.id === 'marrow');
    out.tr = {ab:u.ab.includes('t_b4_c4_bola'), ok:abOk(u, 't_b4_c4_bola'), lampAb:!!m && m.ab.includes('b4_c4_lampball')};
    const f0 = B.fires.length; B.cur = u; AB.t_b4_c4_bola.run(u, e.x, e.y); await wait(700); out.tr.fires = B.fires.filter(f => f.b4oil).length; out.tr.f0 = f0;
    const t = e.hp > 0 ? e : B.units.find(x => x.side === 'e' && x.hp > 0); if (t) { t.x = B.fires.find(f => f.b4oil).x; t.y = B.fires.find(f => f.b4oil).y; const h0 = t.hp; blog(`${t.name} is caught in the lamp-oil.`); hurt(t, 1); out.tr.step = h0 - t.hp; out.tr.want = 1 + lvT(); }
    out.tr.noSorc = !AB.t_b4_c4_bola.sorcery && !AB.t_b4_c4_bola.strain;
    /* the salve: the first heal on its carrier +2, once */
    S.gear.haddat = Object.assign({}, S.gear.haddat, {trinket:'b4_c4_salve'}); const hd = B.units.find(x => x.id === 'haddat'); hd.hp = 1; heal(hd, 3); const h1 = hd.hp; heal(hd, 3); out.tr.salve = [h1, hd.hp - h1];
    /* the lamp, thrown: once a book, then gone */
    B.cur = m; AB.b4_c4_lampball.run(m, e.x, e.y); await wait(700); out.tr.lampGone = !S.kit.includes('b4_c4_lampball') && S.f.b4_lampballThrown === 1 && !abOk(m, 'b4_c4_lampball');
    B.over = true; }
  } catch (e) { out.err = e.stack; }
  /* ================= a Book Two transfer: Sathi alive, Ramin walking, Orvas near ================= */
  try {
  setBook('hoc'); S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'guard', lvl:8, mates:['haddat', 'sathi', 'tangle', 'marrow'], dead:[], ramin:true, keth:true,
    f:{b2_c7_key:'guard', b2_vatharLost:3, b2_hackleBack:0, keepsakes:['b2_bluethread']}};
  delete S.dead.sathi; S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'marrow', 'redblade']; S.f.b4_raminDone = 1; S.f.b4_kethDone = 2; S.f.b4_orvasDone = 2; S.loy.orvas = 2; migrate(S); lvl11(); save(); startChapter(4);
  out.t = {renderErr:renderAll(), ramin:b4In('redblade')};
  out.t.raminNamed = ['b4_c4_sun', 'b4_c4_radde_2', 'b4_c4_dusk', 'b4_c4_wagons_after', 'b4_c4_ambush', 'b4_c4_setifire_talk', 'b4_c4_lancers', 'b4_c4_key', 'b4_c4_vigil', 'b4_c4_morning'].filter(k => /Ramin/.test(DLG[k]().txt)).length;
  out.t.noBarrow = !/on the Barrow now/.test(DLG.b4_c4_seti_arrive().txt);
  out.t.fight = await force('b4_c4_wagons');
  S.f.b4_c4_ph = 3; startExplore('b4_c4_seti'); talk('b4_c4_setifire'); out.t.swapOffered = has('b4_c4_setifire', /Send for Orvas/) && has('b4_c4_setifire', /Send for Keth/); take('b4_c4_setifire', /Send for Orvas/);
  out.t.swap = {orvas:b4In('orvas'), ramin:b4In('redblade'), raminWaits:S.f.b4_raminDone === 2, orvasFlag:S.f.b4_orvasDone, line:/Orvas/.test(DLG.b4_c4_setifire_swap().txt)};
  out.t.orvasNamed = ['b4_c4_sun', 'b4_c4_dusk', 'b4_c4_wagons_after', 'b4_c4_ambush', 'b4_c4_setifire_talk', 'b4_c4_lancers', 'b4_c4_key', 'b4_c4_vigil', 'b4_c4_morning'].filter(k => /Orvas/.test(DLG[k]().txt)).length;
  out.t.regard = /what you did at the river/.test(DLG.b4_c4_lancers().txt);
  out.t.lancers = await force('b4_c4_lancers_brawl');
  out.t.dog = out.t.lancers.dog;
  } catch (e) { out.err2 = e.stack; }
  return out;
});
if (r.err) no('page script threw (fresh): ' + r.err);
if (r.err2) no('page script threw (transfer): ' + r.err2);
const f = r.f || {}, s = r.s || {}, p = r.p || {}, t = r.t || {}, tr = r.tr || {};
if (f.area) {
  f.area === 'b4_c4_column' && f.ch === 4 && f.lvl0 === 11 && f.squad === 'sgt,haddat,tangle,marrow,tallow' && !f.renderErr.length && f.nodes >= 60 && f.nodes <= 80 && f.key === '["seti","picket"]' ? ok(`a fresh start opens Chapter Four at the noon halt at level 11, and every one of ${f.nodes} b4_c4 nodes renders with a choice`) : no('fresh ' + JSON.stringify(f));
  f.sun.boy && f.nerveWidget && f.orders === 1 && f.recruits === 1 && f.called === 1 && f.rattled && f.hat === 'b4_c4_hollet_hat' ? ok('the halt: the boy in the sun (far off), Radde\'s book with the Nerve widget, the recruits (+1), the Seti riding past ("yes, but": rattled), Hollet\'s hat') : no('halt ' + JSON.stringify([f.sun, f.nerveWidget, f.orders, f.recruits, f.called, f.rattled, f.hat]));
  f.campNotNow && f.raid.nerve === -1 && f.raid.leoman === 1 && f.raid.ph === 2 && f.muni.flag === 'saved' && f.muni.sharper === 1 ? ok('the raid: Nerve −1, b4_leoman, Tangle pulls the munitions out of the burning wagon (+1 sharper)') : no('raid ' + JSON.stringify([f.campNotNow, f.raid, f.muni]));
  f.wagons.started && f.wagons.obj && f.wagons.regs >= 1 && f.wagons.fires >= 6 && f.wagons.stage2 && f.wagons.inStage2 && f.wagons.after === 'b4_c4_wagons_after' && f.wagonsDone && f.wagonsClean === 1 && f.camp === 'b4_c4_camp' ? ok(`the wagon line: a hold-out among ${f.wagons.fires} burning tiles with the company (${f.wagons.regs} regular), both grounds, Nerve +1 for a clean fight`) : no('wagons ' + JSON.stringify([f.wagons, f.wagonsDone, f.wagonsClean, f.camp]));
  f.nerveWidget2 && f.lamp && f.trick === 'tangle' && f.setiNotYet && f.setiNotNow ? ok('the camp after: the recruits (Nerve widget), the unbroken lamp, the trick (the Oil Bola, Tangle), the way on with Not now') : no('camp ' + JSON.stringify([f.nerveWidget2, f.lamp, f.trick, f.setiNotYet, f.setiNotNow]));
  f.ambush.nerve === -1 && f.ambush.ph === 3 && f.seti.area === 'b4_c4_seti' && f.seti.deck && f.seti.barrow ? ok('the Seti ambushed (Nerve −1); the wounded camp with the Deck, and the one Barrow line, for Sathi') : no('ambush ' + JSON.stringify([f.ambush, f.seti]));
  f.deck.drawn === 1 && f.deck.reader === 'marrow' && f.deck.inPool && f.deck.queen === 3 ? ok(`the reading at the wounded Seti's fire (Marrow draws ${f.deck.card}; the pool leans to the Queen)`) : no('deck ' + JSON.stringify(f.deck));
  f.fire.again && f.fire.rest && f.fire.talk && f.fire.on && f.fire.notNow && f.rested === 1 && f.talkLines === f.squadHere ? ok(`the fire b4_c4_setifire: an again line, a rest, the squad's talk (a line each, ${f.talkLines}), the way on with Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere]));
  f.tents.flag === 'all' && f.tents.nerve === 1 && f.salve && f.healerAgain && f.bow.kit && f.adjunct ? ok('the wounded carried in (Nerve +1); the cutter\'s horse-salve; the archer\'s horn bow; the Adjunct\'s word through the officers') : no('wounded ' + JSON.stringify([f.tents, f.salve, f.healerAgain, f.bow, f.adjunct]));
  f.lancersNotNow && f.lancersTalked.done === 1 && f.lancersTalked.how === 'talked' && f.lancers.started && f.lancers.obj && f.lancers.after === 'b4_c4_lancers_after' && f.lancersDone && f.fireKey && f.keyNotNow ? ok('the lancers\' grudge: talked down, or the brawl (an objective fight) forced; then the night\'s orders, which can wait') : no('lancers ' + JSON.stringify([f.lancersNotNow, f.lancersTalked, f.lancers, f.lancersDone, f.fireKey, f.keyNotNow]));
}
s.key === 'seti' && s.saved === 1 && s.nerve === 1 && s.marrow === 2 && s.vigilNotNow && s.fight && s.fight.started && s.fight.obj && s.fight.allies >= 1 && s.fight.stage2 && s.fight.inStage2 && s.fight.allies2 >= 2 && s.done ? ok('key seti: b4_setiSaved 1, Nerve +1, Marrow +2; the wounded camp held four rounds with a Seti archer beside the squad, then the rush, with the Seti who could stand') : no('seti ' + JSON.stringify(s));
s.morning && s.morning.node === 'b4_c4_morning' && s.morning.nerve === -1 && s.morning.ph === 5 && !s.morning.blistig && s.morning.keneb && s.morning.gamet && s.helm && s.end && s.end.view === 'end' && s.end.ch === 'seti' && s.end.lvl >= 12 ? ok(`seti: the morning (Nerve −1, the Fist's fall and Keneb acting Fist as camp talk), the helm; the end at level ${s.end && s.end.lvl}, Nerve ${s.end && s.end.nerve} (${s.extras} end lines, ${s.journal} journal)`) : no('seti end ' + JSON.stringify([s.morning, s.helm, s.end]));
p.key === 'picket' && p.saved === 0 && p.nerve === 1 && p.marrow === -1 && p.area === 'b4_c4_hills' && p.lit && p.far && p.notYet && p.fight && p.fight.started && p.fight.regs >= 1 && p.fight.fog && p.fight.stage2 && p.fight.inStage2 && p.done ? ok('key picket: Nerve +1, b4_setiSaved 0; the far end of the line in fog (the log says fog, not dust), the company, both grounds') : no('picket ' + JSON.stringify(p));
p.blistig === 1 && p.lost && p.end && p.end.view === 'end' && p.end.ch === 'picket' && p.end.lvl >= 12 ? ok(`picket: b4_blistigNoticed, the Seti camp lost wounded (one line); the end at level ${p.end && p.end.lvl}`) : no('picket end ' + JSON.stringify([p.blistig, p.lost, p.end]));
tr.ab && tr.ok && tr.lampAb && tr.fires >= 4 && tr.step === tr.want && tr.noSorc && tr.salve && tr.salve[0] === 6 && tr.salve[1] === 3 && tr.lampGone ? ok(`the Oil Bola in a fight: ${tr.fires} tiles of oil, ${tr.want} (1 + the level step) on a turn in it, not sorcery; the salve +2 once; the unbroken lamp thrown once, then gone`) : no('trick in battle ' + JSON.stringify(tr));
if (t.renderErr) {
  !t.renderErr.length && t.ramin && t.raminNamed >= 7 && t.noBarrow ? ok(`a transfer on the Aren Guard road with Ramin walking: every node renders; Ramin named in ${t.raminNamed} of 10 sampled nodes; nobody fell at the Barrow, so no Barrow line`) : no('transfer ' + JSON.stringify([t.renderErr, t.ramin, t.raminNamed, t.noBarrow]));
  t.fight && t.fight.dog && t.fight.started ? ok('Hackle is at Sathi\'s knee in the chapter\'s fights') : no('dog ' + JSON.stringify(t.fight));
  t.swapOffered && t.swap.orvas && !t.swap.ramin && t.swap.raminWaits && t.swap.orvasFlag === 1 && t.swap.line && t.orvasNamed >= 7 && t.regard ? ok(`the swap at the Seti fire: Orvas in, Ramin back to the Red Blades, near; Orvas named in ${t.orvasNamed} of 9 sampled nodes, and his regard from the ford read`) : no('swap ' + JSON.stringify([t.swapOffered, t.swap, t.orvasNamed, t.regard]));
}
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b4ch4: FAIL (${bad.length})` : 'b4ch4: all ok'); process.exit(bad.length ? 1 : 0);
