// Book Six, Chapter 3 (Y'Ghatan, src/103_b6_ch3.js): the chapter's halts, both keys ('in', the mortal fight with the fire spreading tile by
// tile, and 'line', the gate held four rounds), every fight's start and a forced win (both grounds of each main fight), the trick (taught,
// and its battle half), the fire (rest, the fever, the squad's talk, the way on), Fever caught (the water wagon's "yes, but") and cured (at
// the fire, by the squad's healer), the reading (the Herald, at the barrow field the night after), Chapter One's key read at the old
// barrows ('bury' and 'leave'), the squad's dead remembered at the long barrow, and the chapter's end; from a fresh start of Chapter Three
// with Mehet walking, without him, and from a --from=3 style save, where every node must still render.
// Usage: node tools/b6ch3_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const go = c => { if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); };
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); go(c); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const roll = (id, re, who, tier) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c);
    const pass = tier !== 'fail'; settleRoll({who, stat:c.check[0], tier, ok:pass, pass, margin:pass ? (tier === 'near' ? -1 : 6) : -6, nat:pass ? (tier === 'near' ? 9 : 18) : 3}, c);
    if (pass) go(c); else talk(c.fail); return c; };
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; const sh = document.getElementById('sheet'); };
  const killFoes = () => B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0);
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.mortal = !!B.def.mortal; res.obj = !!B.def.objective; res.foes = B.units.filter(u => u.side === 'e').length; res.fires = B.fires.length;
    if (opt.rounds) { for (let i = 0; i < opt.rounds; i++) newRound(); res.firesAfter = B.fires.length; res.round = B.round; }
    if (BATTLES[id].stage2) { killFoes(); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60);
      res.inStage2 = !!B && !!B.def.isStage2; res.title2 = B.def.title; res.fires2 = B.fires.length; }
    if (opt.fall) B.units.filter(u => u.side === 'p' && u.id === opt.fall).forEach(u => u.hp = 0);
    killFoes(); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b6_c3_/.test(k));
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{|!\s/.test(n.txt.replace(/"[^"]*"/g, '') + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const mk = (k1, mehet) => { setBook('bh'); S = newStateBH('Hask', 'Brann'); S.lvl = 13; S.xp = LEVELS[12]; S.chapters = {1:k1, 2:'pass'}; S.f.b6_c1_key = k1; S.f.b6_c2_key = 'pass';
    if (mehet) { b6Join('mehet'); shut(); } S.picksDue = []; save(); startChapter(3); };
  try {
  /* ================= a fresh Chapter Three after a 'bury' Chapter One, with Mehet walking ================= */
  mk('bury', true);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, title:CHAPTERS[3].title, num:CHAPTERS[3].number, renderErr:renderAll(), roster:ROSTER_FIRES.bh[3].includes('b6_c3_fire'), mehet:b6In('mehet'), nodes:nodes().length, areas:CHAPTERS[3].areas.length, keys:B6KEYS[3].join(',')};
  talk('b6_c3_start'); out.f.ph = S.f.b6_c3_ph; out.f.startAgain = typeof DLG.b6_c3_start().again === 'function';
  /* the orders, the old soldier (Chapter One's key, and news of the other squad) */
  take('b6_c3_start', /Find the captain/); out.f.orders = S.f.b6_c3_orders; out.f.blistig = /Blistig/.test(DLG.b6_c3_capt().txt);
  talk('b6_c3_old'); out.f.oldBury = /put them back/.test(DLG.b6_c3_old().txt); take('b6_c3_old', /Any word/); out.f.otherSquad = /Onearm's Host/.test(DLG.b6_c3_old2().txt) && /goes round its plague villages/.test(DLG.b6_c3_old2().txt);
  /* Fever caught: the water wagon, a "yes, but" */
  talk('b6_c3_water'); roll('b6_c3_water', /casks/, 'haddat', 'near'); out.f.fever = {caught:b6Fevered('haddat'), node:S.node, list:b6FeverList().join(','), stat:(S.stats || {}).b6Caught || 0};
  /* the trick: The Sapper's Breath */
  talk('b6_c3_sapper'); const sc = vis('b6_c3_sapper').find(x => /Show us/.test(x.t)); out.f.trickCheck = sc.check.join(':') + ':' + sc.trick + ':' + (sc.edges('tangle').filter(Boolean)[0] || [0, 0])[1];
  roll('b6_c3_sapper', /Show us/, 'tangle', 'clean'); out.f.trick = {who:S.tricks && S.tricks.b6_c3_breath && S.tricks.b6_c3_breath.who, ok:S.f.b6_c3_breathOk, free:!!AB.t_b6_c3_breath.free, notNow:has('b6_c3_sapper_again', /Not now/)};
  /* the rider, the forward lip, the fire before the sally */
  talk('b6_c3_rider'); out.f.rider = S.f.b6_c3_rider;
  talk('b6_c3_fire'); const fy = DLG.b6_c3_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b6_c3_fire', /rest/), fever:has('b6_c3_fire', /fever/i), talk:has('b6_c3_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), html:/Fever: Haddat/.test(fy.html), dusk:has('b6_c3_fire', /Dusk/), roster:fy.ch.some(c => c.t === 'The roster.' && (!c.req || c.req()))};
  /* Fever cured at the fire, by the squad's healer */
  take('b6_c3_fire', /fever/i); out.f.cure = {canCure:b6CanCure(), offer:has('b6_c3_fever', /sees to Haddat/)}; take('b6_c3_fever', /sees to Haddat/); out.f.cure.cured = !b6Fevered('haddat'); out.f.cure.stat = (S.stats || {}).b6Cured || 0;
  take('b6_c3_fire', /rest/); out.f.rested = !!S.f.b6_c3_rest1; talk('b6_c3_fire_talk'); out.f.talkMehet = /Lothal/.test(DLG.b6_c3_fire_talk().txt);
  talk('b6_c3_spoil'); out.f.spoil = {drain:/storm drain/.test(DLG.b6_c3_spoil().txt), sally:has('b6_c3_spoil', /Shields/), notNow:has('b6_c3_spoil', /Not now/)};
  take('b6_c3_spoil', /Shields/); out.f.sallyStart = {node:S.node, notNow:has('b6_c3_sally_start', /Not now/), check:vis('b6_c3_sally_start').some(c => c.check)};
  /* the sally: both grounds, a forced win */
  out.f.sally = await force('b6_c3_sally'); out.f.sally.done = S.f.b6_c3_sallyDone; out.f.sally.knife = S.kit.includes('b6_c3_fanaticknife'); out.f.sally.oil = S.f.b6_c3_oil;
  /* the trick's battle half: swap places (from inside a fight) */
  { startBattle('b6_c3_sally', {}); await wait(60); const u = B.units.find(x => x.id === 'tangle'), t = B.units.find(x => x.id === 'haddat'); const ux = u.x, uy = u.y, tx = t.x, ty = t.y;
    const tiles = AB.t_b6_c3_breath.tiles(u); AB.t_b6_c3_breath.run(u, t.x, t.y); out.f.swap = {tiles:tiles.includes(t), swapped:u.x === tx && u.y === ty && t.x === ux && t.y === uy}; B.over = true; }
  /* dusk: the wall, the fire, the order */
  talk('b6_c3_sally_after'); take('b6_c3_sally_after', /Dusk/); out.f.ph2 = S.f.b6_c3_ph;
  take('b6_c3_wall', /Watch/); take('b6_c3_wall2', /Wait/); out.f.light = /three thousand/.test(DLG.b6_c3_light().txt); take('b6_c3_light', /captain/);
  out.f.order = {node:S.node, notNow:has('b6_c3_order', /Not now/)}; take('b6_c3_order', /North/); out.f.breach = {area:S.area, node:S.node, order:S.f.b6_c3_order};
  /* under the walls */
  talk('b6_c3_surgeon'); talk('b6_c3_burned'); roll('b6_c3_burned', /Help/, 'marrow', 'clean'); out.f.burned = S.f.b6_c3_burnedOk; talk('b6_c3_well'); out.f.well = /sweet/.test(DLG.b6_c3_well().txt);
  talk('b6_c3_key'); out.f.key = {mortalTag:vis('b6_c3_key').some(c => c.tag === 'mortal' && /mortal fight/.test(c.t)), gate:has('b6_c3_key', /gate/), notYet:has('b6_c3_key', /Not yet/)};
  const snapKey = JSON.stringify(S);

  /* ---- 'in': the burning streets (mortal), Mirrel falls ---- */
  take('b6_c3_key', /breach/); out.n = {key:S.f.b6_c3_key, node:S.node}; take('b6_c3_in', /Into the streets/); out.n.start = {node:S.node, notNow:has('b6_c3_streets_start', /Not now/)};
  out.n.fight = await force('b6_c3_streets', {rounds:3, fall:'mirrel'});
  out.n.dead = {mirrel:!!(S.dead && S.dead.mirrel), fell:b63Fell().join(','), squad:S.squad.includes('mirrel'), mail:S.kit.includes('b6_c3_scorchedmail'), afterTxt:/Mirrel did not get up/.test(DLG.b6_c3_streets_after().txt)};
  take('b6_c3_streets_after', /Out along/); take('b6_c3_path', /night/); out.n.night = {node:S.node, notNow:has('b6_c3_night', /Not now/)};
  take('b6_c3_night', /barrow field/); out.n.barrows = {area:S.area, ph:S.f.b6_c3_ph, node:S.node, deck:has('b6_c3_barrows_arrive', /Deck/), bury:/old dead were put back/.test(DLG.b6_c3_barrows_arrive().txt)};
  /* the reading: the Herald, at the barrow field */
  talk('b6_c3_deck'); const dk = DLG.b6_c3_deck(); out.n.deckNotNow = dk.ch.some(c => /Not now/.test(c.t)); out.n.deckSay = /Not tonight/.test(dk.txt); runFx(dk.ch.find(c => /draw/.test(c.t)));
  out.n.reading = {drawn:S.f.b6_c3_drawn, reader:S.f.b6_c3_reader, card:S.card, inPool:B6POOL[3].includes(S.card), lean:B6POOL[3].filter(x => x === 'herald').length, scene:B6DECK[3].scene, table:!!READTABLE['bh:3']};
  talk('b6_c3_card'); out.n.card = {sp:DLG.b6_c3_card().sp, back:DLG.b6_c3_card().ch[0].go};
  talk('b6_c3_long'); out.n.long = {flag:S.f.b6_c3_long, mirrel:/Mirrel is in it/.test(DLG.b6_c3_long().txt)};
  talk('b6_c3_oldbarrow'); out.n.oldBury = /put back/.test(DLG.b6_c3_oldbarrow().txt) && !has('b6_c3_oldbarrow', /stones back/);
  talk('b6_c3_city'); out.n.keys = /where the doors were/.test(DLG.b6_c3_city().txt);
  talk('b6_c3_count'); out.n.count = /Seven hundred and ninety-one/.test(DLG.b6_c3_count().txt);
  talk('b6_c3_fire'); out.n.fire3 = {deck:DLG.b6_c3_fire().ch.some(c => c.deck && /Deck/.test(c.t)), capt:has('b6_c3_fire', /captain/), talkFell:/Mirrel would have sat/.test(DLG.b6_c3_fire_talk().txt)};
  talk('b6_c3_far'); out.n.far = {fight:has('b6_c3_far', /With me/), notNow:has('b6_c3_far', /Not now/)};
  out.n.strays = await force('b6_c3_strays'); out.n.strays.done = S.f.b6_c3_strays;
  talk('b6_c3_capt3'); out.n.capt3 = {flag:S.f.b6_c3_capt3, sotka:/Sotka/.test(DLG.b6_c3_capt3().txt)}; take('b6_c3_capt3', /Yes, Captain/);
  out.n.march = {notNow:has('b6_c3_march', /Not now/)}; out.n.journal = CHAPTERS[3].journal().length; out.n.extras = CHAPTERS[3].extras().join(' | ');
  take('b6_c3_march', /Sotka road/); await wait(50); out.n.end = {chapter:S.chapters[3], view, endTitle:(CHEND[3] || {}).in && CHEND[3].in[0]};

  /* ---- 'line': the gate (from the same moment) ---- */
  S = JSON.parse(snapKey); save(); startExplore('b6_c3_breach');
  take('b6_c3_key', /gate/); out.l = {key:S.f.b6_c3_key, node:S.node}; take('b6_c3_line', /The gate/); out.l.start = {node:S.node, notNow:has('b6_c3_gate_start', /Not now/)};
  talk('b6_c3_gatedoor'); out.l.door = has('b6_c3_gatedoor', /Hold the gate/);
  out.l.fight = await force('b6_c3_gate'); out.l.done = S.f.b6_c3_gateDone; out.l.mail = S.kit.includes('b6_c3_scorchedmail'); out.l.dead = Object.keys(S.dead || {}).filter(k => S.dead[k].ch === 3).length;
  take('b6_c3_gate_after', /gate/); take('b6_c3_gate_pull', /night/); take('b6_c3_night', /barrow field/); out.l.ph = S.f.b6_c3_ph; out.l.renderErr = renderAll();
  talk('b6_c3_capt3'); take('b6_c3_capt3', /Yes, Captain/); take('b6_c3_march', /Sotka road/); await wait(50); out.l.end = S.chapters[3];

  /* ================= a 'leave' Chapter One, no Mehet: the open barrows, and text without him ================= */
  mk('leave', false); out.v = {mehet:b6In('mehet'), renderErr:renderAll()};
  S.f.b6_c3_ph = 3; out.v.open = /still stand open/.test(DLG.b6_c3_barrows_arrive().txt); out.v.mend = has('b6_c3_oldbarrow', /stones back/); take('b6_c3_oldbarrow', /stones back/); out.v.mended = S.f.b6_c3_mended;
  S.f.b6_c1_key = undefined; out.v.unset = !/undefined/.test(DLG.b6_c3_oldbarrow().txt + DLG.b6_c3_barrows_arrive().txt + DLG.b6_c3_old().txt);

  /* ================= a --from=3 style save: both squads, random earlier keys, Mehet joined, Sathi dead ================= */
  { setBook('bh'); S = newStateBH('Hask', 'Brann'); S.chapters = {1:'leave', 2:'burn'}; S.f.b6_c1_key = 'leave'; S.f.b6_c2_key = 'burn'; S.lvl = 13; S.xp = LEVELS[12];
    S.f.b6_mehetDone = 1; if (!S.squad.includes('mehet')) S.squad.push('mehet'); S.loy.mehet = 0; S.f.b6_brannocDone = 1; S.picksDue = []; migrate(S); save(); startChapter(3);
    out.s = {area:S.area, thread:S.thread, renderErr:renderAll(), sathiDead:!!S.dead.sathi, otherBurn:/firing its plague villages/.test(DLG.b6_c3_old2().txt)}; }
  } catch (e) { out.err = e.message + ' ' + (e.stack || '').split('\n').slice(1, 3).join(' '); }
  return out;
});
const f = r.f || {}, n = r.n || {}, l = r.l || {}, v = r.v || {}, s = r.s || {};
if (r.err) no('threw: ' + r.err);
f.area === 'b6_c3_line' && f.ch === 3 && f.thread === 'r' && f.title === 'Y\'Ghatan' && f.num === 'Three' && f.roster && f.mehet ? ok(`Chapter Three opens on the reserve line, the Third playing (${f.nodes} nodes, ${f.areas} areas)`) : no('fresh: ' + JSON.stringify(f));
f.nodes >= 60 && f.nodes <= 80 && f.areas === 3 && f.keys === 'in,line' ? ok('size: 60-80 nodes, three areas, the keys in/line') : no('size: ' + f.nodes + '/' + f.areas + ' ' + f.keys);
(f.renderErr || []).length === 0 ? ok('every node renders (fresh, Mehet walking)') : no('render: ' + f.renderErr.join('; '));
f.ph === 1 && f.startAgain && f.orders && f.blistig ? ok('the first halt and the captain\'s orders (Blistig at a distance)') : no('start: ' + JSON.stringify({ph:f.ph, a:f.startAgain, o:f.orders, b:f.blistig}));
f.oldBury && f.otherSquad ? ok('the old soldier reads Chapter One\'s key, and gives the other squad\'s news as rumour (Ch2 key)') : no('old: ' + f.oldBury + ' ' + f.otherSquad);
f.fever && f.fever.caught && f.fever.stat === 1 && f.fever.node === 'b6_c3_water_ok' ? ok('Fever caught: the water wagon\'s "yes, but" (' + f.fever.list + ')') : no('fever: ' + JSON.stringify(f.fever));
f.trickCheck === 'wits:17:b6_c3_breath:3' && f.trick && f.trick.who === 'tangle' && f.trick.ok && f.trick.free && f.trick.notNow ? ok('the trick: The Sapper\'s Breath (wits 17), taught to Tangle, free') : no('trick: ' + f.trickCheck + ' ' + JSON.stringify(f.trick));
f.swap && f.swap.tiles && f.swap.swapped ? ok('the trick\'s battle half swaps two squadmates (The Rope\'s Way)') : no('swap: ' + JSON.stringify(f.swap));
const fi = f.fire || {}; fi.again && fi.rest && fi.fever && fi.talk && fi.notNow && fi.html && !fi.dusk && fi.roster ? ok('the fire: the roster, rest, the fever, the squad, "Not now"') : no('fire: ' + JSON.stringify(fi));
f.cure && f.cure.canCure && f.cure.offer && f.cure.cured && f.cure.stat === 1 && f.rested && f.talkMehet ? ok('Fever cured at the fire by the squad\'s healer; the rest; the squad talks (Mehet)') : no('cure: ' + JSON.stringify(f.cure) + ' ' + f.rested + ' ' + f.talkMehet);
f.spoil && f.spoil.drain && f.spoil.sally && f.spoil.notNow && f.sallyStart && f.sallyStart.notNow && f.sallyStart.check ? ok('the forward lip and the drain: the sally offered, declinable, with a check') : no('spoil: ' + JSON.stringify(f.spoil) + JSON.stringify(f.sallyStart));
const sa = f.sally || {}; sa.started && sa.stage2 && sa.inStage2 && sa.title2 === 'The drain mouth' && sa.after === 'b6_c3_sally_after' && sa.done && sa.knife && sa.oil ? ok('b6_c3_sally: both grounds, the win, the knife, the oil (Mehet)') : no('sally: ' + JSON.stringify(sa));
f.ph2 === 2 && f.light && f.order && f.order.notNow && f.breach && f.breach.area === 'b6_c3_breach' && f.breach.order ? ok('dusk: the wall, the fire (headline), the order, under the walls') : no('dusk: ' + JSON.stringify({p:f.ph2, l:f.light, o:f.order, b:f.breach}));
f.burned && f.well && f.key && f.key.mortalTag && f.key.gate && f.key.notYet ? ok('under the walls: the burned, the well; the key offers the mortal breach (signposted), the gate, "Not yet"') : no('walls: ' + JSON.stringify({b:f.burned, w:f.well, k:f.key}));
n.key === 'in' && n.start && n.start.notNow ? ok('key "in": into the streets, declinable') : no('in: ' + JSON.stringify(n.start) + n.key);
const nf = n.fight || {}; nf.started && nf.mortal && nf.fires >= 4 && nf.firesAfter > nf.fires && nf.stage2 && nf.inStage2 && nf.fires2 >= 4 && nf.after === 'b6_c3_streets_after' ? ok(`b6_c3_streets: mortal, the fire spreads (${nf.fires} -> ${nf.firesAfter} tiles by round ${nf.round}), both grounds, the win`) : no('streets: ' + JSON.stringify(nf));
n.dead && n.dead.mirrel && n.dead.fell === 'mirrel' && !n.dead.squad && n.dead.mail && n.dead.afterTxt ? ok('the mortal fight: Mirrel fell and stays down; the scorched mail') : no('dead: ' + JSON.stringify(n.dead));
n.night && n.night.notNow && n.barrows && n.barrows.area === 'b6_c3_barrows' && n.barrows.ph === 3 && n.barrows.deck && n.barrows.bury ? ok('the night, then the barrow field (Chapter One\'s bury read), the Deck at its first halt') : no('barrows: ' + JSON.stringify(n.night) + JSON.stringify(n.barrows));
const rd = n.reading || {}; n.deckNotNow && n.deckSay && rd.drawn && rd.reader === 'marrow' && rd.inPool && rd.lean === 3 && rd.scene === 'b6_barrows' && rd.table && n.card && n.card.back === 'b6_c3_fire' ? ok(`the reading: Marrow draws ${rd.card} (the Herald leans) at the barrow field`) : no('reading: ' + JSON.stringify({rd, c:n.card, nn:n.deckNotNow, s:n.deckSay}));
n.long && n.long.flag && n.long.mirrel && n.oldBury && n.keys && n.count && n.fire3 && n.fire3.deck && n.fire3.capt && n.fire3.talkFell ? ok('the long barrow remembers Mirrel; the old barrows; Mehet\'s keys; 791; the fire after') : no('after: ' + JSON.stringify({lg:n.long, o:n.oldBury, k:n.keys, c:n.count, f:n.fire3}));
const st = n.strays || {}; n.far && n.far.fight && n.far.notNow && st.started && st.after === 'b6_c3_strays_after' && st.done ? ok('b6_c3_strays: optional, declinable, the win') : no('strays: ' + JSON.stringify(n.far) + JSON.stringify(st));
n.capt3 && n.capt3.flag && n.capt3.sotka && n.march && n.march.notNow && n.end && n.end.chapter === 'in' && n.end.endTitle === 'The way out' && n.journal >= 5 && /long barrow/.test(n.extras) ? ok('the march for Sotka; chapterEnd(3, "in"); the journal and the end lines') : no('end: ' + JSON.stringify({c:n.capt3, m:n.march, e:n.end, j:n.journal, x:n.extras}));
l.key === 'line' && l.start && l.start.notNow && l.door ? ok('key "line": the gate, declinable') : no('line: ' + JSON.stringify(l));
const lf = l.fight || {}; lf.started && lf.obj && !lf.mortal && lf.stage2 && lf.inStage2 && lf.title2 === 'The side of the walls' && lf.after === 'b6_c3_gate_after' && l.done && l.mail && l.dead === 0 ? ok('b6_c3_gate: held four rounds, not mortal, both grounds, the win, the mail') : no('gate: ' + JSON.stringify(lf) + ' ' + l.done + ' ' + l.mail + ' ' + l.dead);
l.ph === 3 && (l.renderErr || []).length === 0 && l.end === 'line' ? ok('the line road: the barrow field, every node renders, chapterEnd(3, "line")') : no('line end: ' + l.ph + ' ' + l.end + ' ' + (l.renderErr || []).join('; '));
!v.mehet && (v.renderErr || []).length === 0 && v.open && v.mend && v.mended && v.unset ? ok('Chapter One "leave": the open barrows, one put back; without Mehet; unset key reads clean') : no('leave: ' + JSON.stringify(v));
s.area === 'b6_c3_line' && s.thread === 'r' && (s.renderErr || []).length === 0 && s.sathiDead && s.otherBurn ? ok('a --from=3 style save: every node renders, Sathi dead, the Ch2 "burn" rumour') : no('synth: ' + JSON.stringify(s));
errors.length ? no('page errors: ' + [...new Set(errors)].join(' | ')) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `\n${bad.length} FAILED` : '\nall passed');
process.exit(bad.length ? 1 : 0);
