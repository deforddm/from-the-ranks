// Book Six, Chapter 5 (The Kokakal Shore, src/105_b6_ch5.js): the Third on the Sotka road and the Kokakal shore. A fresh Chapter Five
// after a Ch3 'in' with Tangle fallen in the fire and Mehet walking: the registration and the roster fire; every b6_c5 node renders without
// a leak or a hard-limit word; the first halt and its reading (the lean card, the shore's table, the way back); the captain's orders; the
// cairn for Coltaine and its check; the old soldier's talk (the 791, the Host in the rain); the plague village (the well's "yes, but"
// gives the fever; the looters' fight spreads it); the way-station (the call that drops two crossbows; the fight, its stage2, the win;
// both answers for the last deserters); the way down; the shore (the surgeons cure the fever; the Wickans and the trick, taught, and its
// battle half: the hand-cant's marks; the loading master's rope; the boats' fight, stage2 and win); the fire (again, the roster, a rest,
// the talk, the healer's cure after Soliel, Mehet at the water, Not now); the word along the beach; the key both ways (wait: the last
// boat, the walk-in seen from the beach, the missing name said once, the bone taken; sail: aboard, the rail, the bone declined); the end.
// Then a Ch3 'line' save with nobody fallen, no Mehet and Sathi alive: every node still renders, and nobody is looked for.
// Usage: node tools/b6ch5_test.mjs   (build first; exit 1 on a failure)
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
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const roll = (id, re, who, tier) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c);
    const okk = tier !== 'fail'; settleRoll({who, stat:c.check[0], tier, ok:tier === 'clean', pass:okk, margin:tier === 'clean' ? 6 : tier === 'near' ? -1 : -6, nat:12}, c); shut();
    if (okk) go(c); else if (c.fail) talk(c.fail); return c; };
  const edge = (c, id) => (c.edges(id).filter(Boolean).reduce((a, e) => a + e[1], 0));
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.dark = !!B.def.dark; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.waves = (B.def.waves || []).length; res.kinds = B.units.filter(u => u.side === 'e').map(u => u.kind).join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').map(u => u.kind).join(','); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = false;
    if (BATTLES[id].feverRisk) { checkEnd(); for (let i = 0; i < 100 && S.node !== BATTLES[id].after; i++) await wait(50); } else { B.over = true; win(); await wait(30); }
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b6_c5_/.test(k));
  const HARD = /Bonehunters|Laseen|Kellanved|Dancer|Ammanas|Surly|Topper|Silanda|Froth Wolf|Mock's Hold|Grub said|Keneb says|Blistig says|Fiddler|Quick Ben|Kalam|Faradan|Sinn says|Temul says to you|\b11\d\d\b/;
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
      else if (/undefined|NaN|\[object |\$\{|\bnull\b/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks');
      else if (!Array.isArray(n.ch) || !n.ch.filter(c => !c.req || c.req()).length) errs.push(k + ': no visible choices');
      else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words');
      else if (HARD.test(n.txt)) errs.push(k + ': a hard-limit word: ' + n.txt.match(HARD)[0]); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* a Book Six save at the start of Chapter Five: the Third at level 15, earlier keys, Mehet walking, Ch3's fallen */
  const mk = (o) => { setBook('bh'); S = newStateBH('Hask', 'Brann'); S.lvl = 15; S.xp = LEVELS[14]; S.th.h.lvl = 14; S.th.h.xp = LEVELS[13];
    S.chapters = {1:o.k1, 2:'pass', 3:o.k3, 4:'vote'}; S.f.b6_c1_key = o.k1; S.f.b6_c2_key = 'pass'; S.f.b6_c3_key = o.k3; S.f.b6_c4_key = 'vote'; S.f.b6_soliel = o.soliel ? 1 : undefined;
    if (o.mehet) { S.f.b6_mehetDone = 1; S.squad.push('mehet'); S.loy.mehet = 0; S.gear.mehet = {}; S.picks.mehet = []; }
    if (o.sathi) { delete S.dead.sathi; S.squad = S.squad.filter(x => x !== 'mirrel'); S.squad.push('sathi'); S.loy.sathi = 0; S.gear.sathi = {}; S.picks.sathi = []; }
    (o.fallen || []).forEach(id => { S.squad = S.squad.filter(x => x !== id); S.dead[id] = {ch:3, where:'The burning streets'}; });
    S.picksDue = []; migrate(S); save(); startChapter(5); };
  try {
  /* ================= a Ch3 'in' (Tangle fell), 'bury', Mehet walks, Soliel's carriers ================= */
  mk({k1:'bury', k3:'in', mehet:true, fallen:['tangle'], soliel:true});
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, title:CHAPTERS[5].title, num:CHAPTERS[5].number, reg:!!(BOOKSNAP.bh && BOOKSNAP.bh.ch[5]) || CHAPTERS[5] === B6CH5, roster:ROSTER_FIRES.bh[5].join(), keys:B6KEYS[5].join(), renderErr:renderAll(),
    intro:typeof CHAPTERS[5].intro.paras[1] === 'function' && /went into the burning streets/.test(CHAPTERS[5].intro.paras[1]()) && /Tangle stayed in the fire/.test(CHAPTERS[5].intro.paras[1]())};
  /* the first halt and the reading */
  talk('b6_c5_start'); const st = DLG.b6_c5_start(); out.f.start = {ph:S.f.b6_c5_ph, again:typeof st.again === 'function', deck:has('b6_c5_start', /the Deck/), mehet:/That is all water/.test(st.txt), walk:has('b6_c5_start', /Walk the halt/)};
  talk('b6_c5_deck'); const dk = DLG.b6_c5_deck(); out.f.deckNotNow = dk.ch.some(c => /Not now/.test(c.t)); runFx(dk.ch.find(c => /draw/.test(c.t)));
  out.f.deck = {drawn:S.f.b6_c5_drawn, reader:S.f.b6_c5_reader, card:S.card, inPool:B6POOL[5].includes(S.card), lean:B6POOL[5].filter(x => x === 'b2c_queen').length, scene:B6DECK[5].scene, say:/For the crossing/.test(dk.txt), table:!!READTABLE['bh:5']};
  talk('b6_c5_card'); const cd = DLG.b6_c5_card(); out.f.card = {sp:cd.sp, back:cd.ch[0].go}; out.f.back = /The Sotka road comes over the last rise/.test(DLG.b6_c5_deck_back().txt);
  /* the captain, the camp */
  talk('b6_c5_captain'); out.f.cap = {why:has('b6_c5_captain', /when we bring them in/), notNow:has('b6_c5_captain', /Not now/), salves:/the 9th's spare salves/.test(DLG.b6_c5_captain().txt)};
  take('b6_c5_captain', /fetch them/); out.f.capSaid = S.f.b6_c5_capSaid; out.f.capMehet = /dry since my grandfather/.test(DLG.b6_c5_captain_2().txt);
  talk('b6_c5_rumour'); const ru = DLG.b6_c5_rumour().txt; out.f.rumour = {n791:/Seven hundred and ninety-one/.test(ru), host:/Onearm's Host is camped before G'danisban in the rain/.test(ru), flag:S.f.b6_c5_rumour};
  talk('b6_c5_shrine'); const sh = DLG.b6_c5_shrine(); const sc = vis('b6_c5_shrine').find(x => /coast says/.test(x.t)); out.f.shrine = {flag:S.f.b6_c5_shrine, coltaine:/Coltaine/.test(sh.txt) && /A year ago we cursed him/.test(sh.txt), check:sc.check.join(':'), edgeMehet:edge(sc, 'mehet'), notNow:has('b6_c5_shrine', /Not now/)};
  roll('b6_c5_shrine', /coast says/, 'mehet', 'clean'); out.f.coast = S.node === 'b6_c5_shrine_coast' && S.f.b6_c5_coast === 1;
  { const l0 = S.loy.haddat; take('b6_c5_shrine', /Leave something/); out.f.left = {flag:S.f.b6_c5_left, haddat:S.loy.haddat - l0}; }
  /* the way down is shut until the way-station */
  talk('b6_c5_road_on'); out.f.locked = !has('b6_c5_road_on', /Down to the shore/) && has('b6_c5_road_on', /Not now/);
  /* the plague village: the well's "yes, but" gives the fever; the looters spread it */
  talk('b6_c5_villagelane'); take('b6_c5_villagelane', /Down the lane/); out.f.village = {area:S.area, node:S.node};
  const wl = vis('b6_c5_well').find(x => /Draw water/.test(x.t)); out.f.wellCheck = wl.check.join(':');
  roll('b6_c5_well', /Draw water/, 'haddat', 'near'); out.f.wellFever = {fev:b6Fevered('haddat'), node:S.node};
  talk('b6_c5_houses'); out.f.houses = {notNow:has('b6_c5_houses', /Not now/), fight:has('b6_c5_houses', /Put it down/)};
  { const before = b6FeverList().length; out.f.vfight = await force('b6_c5_village'); out.f.vfight.fevered = b6FeverList().length - before; out.f.vfight.done = S.f.b6_c5_villageDone; out.f.vfight.risk = BATTLES.b6_c5_village.feverRisk; }
  take('b6_c5_village_after', /Back to the road/); out.f.backRoad = S.area === 'b6_c5_road';
  /* the way-station: the call (drops the two crossbows), the fight, its stage2, the win; let them go */
  talk('b6_c5_waystation'); const ws = vis('b6_c5_waystation').find(x => /Call to them/.test(x.t)); out.f.wsCheck = ws.check.join(':'); out.f.wsSgt = edge(ws, 'sgt'); out.f.wsNotNow = has('b6_c5_waystation', /Not now/);
  out.f.wsSap = !has('b6_c5_waystation', /sharpers against the wall/); // Tangle fell, nobody else carries the satchel
  roll('b6_c5_waystation', /Call to them/, 'sgt', 'clean'); await wait(60); out.f.drop = !!B && B.id === 'b6_c5_deserters' && B.units.filter(u => u.side === 'e').length === 3; B = null;
  { const sv = S.inv.salve; out.f.dfight = await force('b6_c5_deserters'); out.f.dfight.done = S.f.b6_c5_desDone; out.f.dfight.salves = S.inv.salve - sv; }
  const snapDes = JSON.stringify(S);
  { const l0 = S.loy.haddat; take('b6_c5_des_after', /walk the other way/); out.f.mercy = {v:S.f.b6_c5_desMercy, haddat:S.loy.haddat - l0, ran:/They ran/.test(DLG.b6_c5_des_go().txt)}; }
  { const S1 = S; S = JSON.parse(snapDes); take('b6_c5_des_after', /March them back/); out.f.marched = S.f.b6_c5_desMercy === 'back' && /What the army does with them is the army's/.test(DLG.b6_c5_des_back().txt); S = S1; save(); }
  /* down to the shore */
  talk('b6_c5_road_on'); take('b6_c5_road_on', /Down to the shore/); out.f.shore = {area:S.area, ph:S.f.b6_c5_ph, node:S.node};
  /* the surgeons cure the fever */
  talk('b6_c5_surgeons'); out.f.surg = {html:/Fever:/.test(DLG.b6_c5_surgeons().html), bring:has('b6_c5_surgeons', /Bring in/)}; take('b6_c5_surgeons', /Bring in/); out.f.cured = {left:b6FeverList().length, tally:(S.stats || {}).b6Cured};
  /* the captain on the shore; the Wickans and the trick */
  talk('b6_c5_captain_shore'); out.f.capShore = S.f.b6_c5_capShore === 1 && /Tonight the Third has the boats/.test(DLG.b6_c5_captain_shore().txt);
  talk('b6_c5_wickans'); const wk = DLG.b6_c5_wickans(); const tc = vis('b6_c5_wickans').find(x => /Horse-Talk/.test(x.t)); out.f.wick = {temul:/Temul says most of us will go home/.test(wk.txt), check:tc.check.join(':') + ':' + tc.trick, edges:['warlock', 'sathi', 'orvas', 'redblade', 'haddat'].map(id => edge(tc, id)).join(','), notNow:has('b6_c5_wickans', /Not now/)};
  roll('b6_c5_wickans', /Horse-Talk/, 'haddat', 'clean'); out.f.trick = {who:S.tricks && S.tricks.b6_c5_horsetalk && S.tricks.b6_c5_horsetalk.who, ok:S.f.b6_c5_horseOk, node:S.node, notSorcery:!TRICKS.b6_c5_horsetalk.sorcery && /Not sorcery/.test(TRICKS.b6_c5_horsetalk.fx)};
  /* the loading master: the black ship as sailors' talk, and the rope */
  talk('b6_c5_nokmate'); out.f.mate = {ship:S.f.b6_c5_ship === 1 && /given it to a marine sergeant/.test(DLG.b6_c5_nokmate().txt) && !/Silanda/.test(DLG.b6_c5_nokmate().txt), check:vis('b6_c5_nokmate').find(x => /turn on the line/.test(x.t)).check.join(':')};
  roll('b6_c5_nokmate', /turn on the line/, 'haddat', 'clean'); out.f.rope = S.kit.includes('b6_c5_nokrope') && ITEMS.b6_c5_nokrope.stat.might === 1;
  /* the fire */
  b6Catch('marrow', 'a test'); talk('b6_c5_fire'); const fi = DLG.b6_c5_fire();
  out.f.fire = {again:typeof fi.again === 'function', html:/Fever: Marrow/.test(fi.html), roster:vis('b6_c5_fire').some(c => c.t === 'The roster.'), rest:has('b6_c5_fire', /Let the squad rest/), talk:has('b6_c5_fire', /Talk with the squad/), boats:has('b6_c5_fire', /The boats, tonight/), mehet:has('b6_c5_fire', /down to the water with Mehet/), notNow:has('b6_c5_fire', /Not now/), cure:has('b6_c5_fire', /sees to the fever/)};
  take('b6_c5_fire', /sees to the fever/); out.f.fireCure = {left:b6FeverList().length, rattled:!!(S.rattled && S.rattled.marrow)};
  S.wounds = {haddat:5}; take('b6_c5_fire', /Let the squad rest/); out.f.rested = S.f.b6_c5_rest === 1 && !S.wounds;
  { const n = DLG.b6_c5_fire_talk(); out.f.talk = {mehet:/The doors are ash/.test(n.txt), haddat:/I am going to be the first of my mother's people/.test(n.txt), noTangle:!/^Tangle/m.test(n.txt)}; }
  { const l0 = S.loy.mehet; talk('b6_c5_mehet'); take('b6_c5_mehet', /Some of the stories/); out.f.mehetWalk = {flag:S.f.b6_c5_mehet, loy:S.loy.mehet - l0, said:S.f.b6_c5_mehetSaid}; }
  /* the boats at night */
  talk('b6_c5_boatline'); out.f.boatline = {notNow:has('b6_c5_boatline', /Not now/), noBurner:!has('b6_c5_boatline', /burner/)};
  out.f.bfight = await force('b6_c5_boats'); out.f.bfight.done = S.f.b6_c5_boatsDone;
  take('b6_c5_boats_after', /Back to the fire/); out.f.afterBoats = {area:S.area, node:S.node, word:has('b6_c5_fire', /talk along the beach/)};
  /* the trick's battle half: the hand-cant's marks */
  startBattle('b6_c5_boats', {}); await wait(60); { const u = B.units.find(x => x.side === 'p' && x.id === 'haddat'), t = B.units.find(x => x.side === 'e');
    out.f.tabs = trickAbs('haddat').includes('t_b6_c5_horsetalk'); t.x = Math.min(7, u.x + 2); t.y = u.y; const tl = AB.t_b6_c5_horsetalk.tiles(u); out.f.tiles = tl.includes(t);
    AB.t_b6_c5_horsetalk.run(u, t.x, t.y); out.f.marked = t.cantRound === B.round && t.cantLeft >= 1; out.f.free = !!AB.t_b6_c5_horsetalk.free; } B = null;
  /* the word along the beach, and the key */
  talk('b6_c5_word'); out.f.word = {flag:S.f.b6_c5_word, sepik:/drown two days past Sepik/.test(DLG.b6_c5_word().txt), keneb:/Fist Keneb's pulled his companies off the ships/.test(DLG.b6_c5_word().txt), notNow:has('b6_c5_word', /Not now/)};
  take('b6_c5_word', /find the captain/); out.f.key = {node:S.node, wait:has('b6_c5_key', /last boat/), sail:has('b6_c5_key', /As ordered/), notYet:has('b6_c5_key', /Not yet/)};
  const snap = JSON.stringify(S);
  /* ================= key: wait ================= */
  { const l0 = {tallow:S.loy.tallow ?? null, mehet:S.loy.mehet}; take('b6_c5_key', /last boat/); out.w = {key:S.f.b6_c5_key, mehet:S.loy.mehet - l0.mehet};
    take('b6_c5_wait', /The day/); out.w.morning = {node:S.node, ph:S.f.b6_c5_ph, beach:/Go down the beach/.test(vis('b6_c5_morning')[0].t)};
    take('b6_c5_morning', /down the beach/); const sv = DLG.b6_c5_survivors().txt; out.w.surv = {flag:S.f.b6_c5_survivors, missing:S.f.b6_c5_missing, once:(sv.match(/Tangle/g) || []).length === 2 && /Tangle is not among them/.test(sv)};
    take('b6_c5_survivors', /last boat/); out.w.bone = {node:S.node, inTxt:/You went in/.test(DLG.b6_c5_bone().txt), barrows:/you put the old ones back/.test(DLG.b6_c5_bone().txt)};
    take('b6_c5_bone', /Take them/); out.w.took = {bone:S.f.b6_bone, kit:S.kit.includes('b6_c5_fingerbone'), hp:ITEMS.b6_c5_fingerbone.hp, mehet:/A Y'Ghatan bone/.test(DLG.b6_c5_bone_take().txt)};
    take('b6_c5_bone_take', /last boat/); out.w.last = {node:S.node, notYet:has('b6_c5_last', /Not yet/), click:/finger bones click/.test(DLG.b6_c5_last().txt)};
    out.w.extras = CHAPTERS[5].extras().join(' | '); out.w.journal = CHAPTERS[5].journal().join(' | ');
    take('b6_c5_last', /To the sea/); await wait(60); out.w.end = {view, ch:S.chapters[5]}; }
  /* ================= key: sail, from the same moment ================= */
  { S = JSON.parse(snap); save(); startExplore('b6_c5_shore'); G.said = {}; talk('b6_c5_key');
    take('b6_c5_key', /As ordered/); out.s = {key:S.f.b6_c5_key, sailTxt:/patched foresail takes it up its side on a net/.test(DLG.b6_c5_sail().txt)};
    take('b6_c5_sail', /Not now/); out.s.aboard = {node:S.node, ph:S.f.b6_c5_ph, rail:has('b6_c5_aboard', /The rail/)};
    take('b6_c5_aboard', /The rail/); out.s.morning = {node:S.node, rail:/from the rail/.test(DLG.b6_c5_morning().txt)};
    take('b6_c5_morning', /Watch from the rail/); take('b6_c5_survivors', /Stay at the rail/); out.s.bone = {node:S.node, side:/up the side/.test(DLG.b6_c5_bone().txt), heavyHidden:!AREAS.b6_c5_shore.npcs.find(n => n.id === 'heavy').show()};
    take('b6_c5_bone', /didn't earn/); out.s.no = {bone:!S.f.b6_bone, flag:S.f.b6_c5_boneNo, kit:!S.kit.includes('b6_c5_fingerbone')};
    take('b6_c5_bone_no', /rail/); take('b6_c5_last', /To the sea/); await wait(60); out.s.end = {view, ch:S.chapters[5]}; }
  /* ================= a Ch3 'line' save, nobody fallen, no Mehet, Sathi alive: every node renders in every phase and both keys ================= */
  { mk({k1:'leave', k3:'line', sathi:true});
    const errs = []; [[1, null], [2, null], [3, 'wait'], [3, 'sail']].forEach(([ph, k]) => { S.f.b6_c5_ph = ph; S.f.b6_c5_key = k; errs.push(...renderAll().map(e => `ph${ph}${k || ''} ${e}`)); });
    S.f.b6_c5_ph = 3; S.f.b6_c5_key = 'wait'; out.y = {renderErr:errs, noLook:!/is not among them/.test(DLG.b6_c5_survivors().txt), gate:/You held the gate/.test(DLG.b6_c5_bone().txt), sathiWick:/Weasel teeth/.test(DLG.b6_c5_wickans().txt),
      intro:/held the gate/.test(CHAPTERS[5].intro.paras[1]()) && /Everybody in the squad came out/.test(CHAPTERS[5].intro.paras[1]()), noMehet:!has('b6_c5_fire', /Mehet/), sap:/Tangle/.test(DLG.b6_c5_waystation().ch[1].t)}; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, w = r.w || {}, s = r.s || {}, y = r.y || {};
const J = o => JSON.stringify(o).slice(0, 900);
if (f.area) {
  f.area === 'b6_c5_road' && f.ch === 5 && f.thread === 'r' && f.title === 'The Kokakal Shore' && f.num === 'Five' && f.reg && f.roster === 'b6_c5_fire' && f.keys === 'wait,sail' && !f.renderErr.length && f.intro ? ok('Chapter Five registers for the Third, opens on the Sotka road, one roster fire; every b6_c5 node renders without a leak or a hard-limit word; the intro names the fire\'s dead') : no('fresh ' + J({...f, start:0, deck:0}));
  f.start.ph === 1 && f.start.again && f.start.deck && f.start.mehet && f.start.walk && f.deckNotNow && f.deck.drawn === 1 && f.deck.inPool && f.deck.lean === 3 && f.deck.scene === 'b6_kokakal' && f.deck.say && f.deck.table && f.card.sp === 'The Deck of Dragons' && f.card.back === 'b6_c5_deck_back' && f.back ? ok(`the first halt on the bluff, the reading (${f.deck.reader} draws ${f.deck.card}; the Queen three times; the shore's table) and the way back to the halt`) : no('halt/reading ' + J({start:f.start, deck:f.deck, card:f.card, back:f.back, nn:f.deckNotNow}));
  f.cap.why && f.cap.notNow && f.cap.salves && f.capSaid === 1 && f.capMehet && f.rumour.n791 && f.rumour.host && f.rumour.flag && f.shrine.flag && f.shrine.coltaine && f.shrine.check === 'guile:15' && f.shrine.edgeMehet === 2 && f.shrine.notNow && f.coast && f.left.flag && f.left.haddat === 1 && f.locked ? ok('the captain\'s orders (Mehet on the dry well); the 791 and the Host in the rain as camp talk; the cairn for Coltaine, its check, a gift; the way down shut until the way-station') : no('camp ' + J({cap:f.cap, capSaid:f.capSaid, capMehet:f.capMehet, rumour:f.rumour, shrine:f.shrine, coast:f.coast, left:f.left, locked:f.locked}));
  f.village.area === 'b6_c5_village' && f.village.node === 'b6_c5_village_arrive' && f.wellCheck === 'wits:15' && f.wellFever.fev && f.houses.notNow && f.houses.fight && f.vfight.started && f.vfight.foes === 5 && f.vfight.fevered === 1 && f.vfight.done && f.vfight.risk && f.vfight.after === 'b6_c5_village_after' && f.backRoad ? ok('the plague village: the well\'s "yes, but" gives Haddat the fever; the looters\' fight starts, is won and gives one more soldier the fever; back to the road') : no('village ' + J({village:f.village, wc:f.wellCheck, wf:f.wellFever, h:f.houses, v:f.vfight, b:f.backRoad}));
  f.wsCheck === 'guile:16' && f.wsSgt === 2 && f.wsNotNow && f.wsSap && f.drop && f.dfight.started && f.dfight.foes === 5 && f.dfight.waves === 1 && /deserter/.test(f.dfight.kinds) && /xbow/.test(f.dfight.kinds) && f.dfight.stage2 && f.dfight.inStage2 && /deserter/.test(f.dfight.foes2) && f.dfight.after === 'b6_c5_des_after' && f.dfight.done === 1 && f.dfight.salves === 2 && f.mercy.v === 'go' && f.mercy.haddat === 1 && f.mercy.ran && f.marched ? ok('the way-station: the call drops the two crossbows; the fight (five, a wave, the burned sergeant\'s yard) starts and is won, two salves back; let them go (Haddat +1, "they ran"), or march them back') : no('waystation ' + J({ws:f.wsCheck, sgt:f.wsSgt, nn:f.wsNotNow, sap:f.wsSap, drop:f.drop, d:f.dfight, m:f.mercy, mar:f.marched}));
  f.shore.area === 'b6_c5_shore' && f.shore.ph === 2 && f.shore.node === 'b6_c5_arrive' && f.surg.html && f.surg.bring && f.cured.left === 0 && f.cured.tally >= 2 && f.capShore && f.wick.temul && f.wick.check === 'wits:17:b6_c5_horsetalk' && f.wick.edges === '3,3,2,1,0' && f.wick.notNow && f.trick.who === 'haddat' && f.trick.ok && f.trick.notSorcery && f.mate.ship && f.mate.check === 'might:15' && f.rope ? ok('the shore: the surgeons break the fever; the captain gives the Third the boats; Temul\'s Wickans and Wickan Horse-Talk (Wits 17, taught to Haddat); the black ship as sailors\' talk; Nok\'s rope (+1 Might)') : no('shore ' + J({shore:f.shore, surg:f.surg, cured:f.cured, cap:f.capShore, wick:f.wick, trick:f.trick, mate:f.mate, rope:f.rope}));
  f.fire.again && f.fire.html && f.fire.roster && f.fire.rest && f.fire.talk && f.fire.boats && f.fire.mehet && f.fire.notNow && f.fire.cure && f.fireCure.left === 0 && f.fireCure.rattled && f.rested && f.talk.mehet && f.talk.haddat && f.talk.noTangle && f.mehetWalk.flag && f.mehetWalk.loy === 2 && f.mehetWalk.said === 'true' ? ok('the fire: again, fever shown, the roster, a rest, the talk (no line for the fallen), Marrow breaks the fever after Soliel and pays for it, Mehet at the water, Not now') : no('fire ' + J({fire:f.fire, fc:f.fireCure, r:f.rested, t:f.talk, m:f.mehetWalk}));
  f.boatline.notNow && f.boatline.noBurner && f.bfight.started && f.bfight.dark && f.bfight.allies === 1 && f.bfight.foes === 5 && f.bfight.waves === 1 && f.bfight.stage2 && f.bfight.inStage2 && /bruiser/.test(f.bfight.foes2) && f.bfight.done === 1 && f.afterBoats.area === 'b6_c5_shore' && f.afterBoats.word && f.tabs && f.tiles && f.marked && f.free ? ok('the boats at night (dark, a sentry beside, a wave, the waterline) start and are won; the horse-talk\'s battle half marks a foe for criticals, free of the action') : no('boats ' + J({bl:f.boatline, b:f.bfight, a:f.afterBoats, tabs:f.tabs, tiles:f.tiles, marked:f.marked}));
  f.word.flag === 1 && f.word.sepik && f.word.keneb && f.word.notNow && f.key.node === 'b6_c5_key' && f.key.wait && f.key.sail && f.key.notYet ? ok('the word along the beach (Keneb, a boy, Sepik); the key both ways and Not yet') : no('word/key ' + J({word:f.word, key:f.key}));
}
w.key === 'wait' && w.mehet === 1 && w.morning.node === 'b6_c5_morning' && w.morning.ph === 3 && w.morning.beach && w.surv.flag === 1 && w.surv.missing === 'tangle' && w.surv.once && w.bone.node === 'b6_c5_bone' && w.bone.inTxt && w.bone.barrows && w.took.bone === 1 && w.took.kit && w.took.hp === 4 && w.took.mehet && w.last.node === 'b6_c5_last' && w.last.notYet && w.last.click && /last boat/.test(w.extras) && /finger bone/.test(w.journal) && w.end.view === 'end' && w.end.ch === 'wait' ? ok('key wait: the last boat; the walk-in from the beach; Tangle looked for and not there, said once; the heavy remembers the 9th going in and the barrows; the bone taken (+4 health); the end') : no('wait ' + J(w));
s.key === 'sail' && s.sailTxt && s.aboard.node === 'b6_c5_aboard' && s.aboard.ph === 3 && s.aboard.rail && s.morning.node === 'b6_c5_morning' && s.morning.rail && s.bone.node === 'b6_c5_bone' && s.bone.side && s.bone.heavyHidden && s.no.bone && s.no.flag === 1 && s.no.kit && s.end.view === 'end' && s.end.ch === 'sail' ? ok('key sail: aboard on the first day; Not now keeps the squad aboard; the walk-in from the rail; the heavy comes up the side; the bone declined; the end') : no('sail ' + J(s));
y.renderErr && !y.renderErr.length && y.noLook && y.gate && y.sathiWick && y.intro && y.noMehet && y.sap ? ok('a Ch3 \'line\' save, nobody fallen, no Mehet, Sathi alive: every node renders in every phase and both keys; nobody looked for; the heavy remembers the gate; Sathi answers the Wickan; Tangle\'s sharpers') : no('line save ' + J(y));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b6ch5: FAIL (${bad.length})` : 'b6ch5: all ok'); process.exit(bad.length ? 1 : 0);
