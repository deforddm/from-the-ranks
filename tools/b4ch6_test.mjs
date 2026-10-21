// Book Four, Chapter 6 (Pan'arak, src/76_b4_ch6.js): the chapter's halts, both keys, every fight's start and a forced win (both grounds
// of each), the trick, the badge and the horn, the fire and the swap, the eve; from a fresh start at level 13 (with Ch5's seep water), and
// from a Book Two transfer with Sathi alive and Keth walking, on Ch4's seti and picket roads (the Seti archer, asked for by name).
// Usage: node tools/b4ch6_test.mjs   (build first; exit 1 on a failure)
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
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.regs = B.def.b4Regs || 0; res.dust = b4DustNow(); res.dog = B.units.some(u => u.kind === 'hackle');
    res.seti = B.units.some(u => u.kind === 'b4_c6_setiarcher' && u.ally); res.skins = !!B.b4skins; res.foes = B.units.filter(u => u.side === 'e').length;
    { const tg = B.units.find(u => u.id === 'tangle'); if (tg) res.tangleRng = [tg.b4rng0, tg.rng, tg.maxhp - (TPL.tangle.hp + (S.lvl - 1)*4)]; }
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60);
      res.inStage2 = !!B && !!B.def.isStage2; res.regs2 = B.units.filter(u => u.b4reg).length; res.seti2 = B.units.some(u => u.kind === 'b4_c6_setiarcher'); res.style2 = B.def.style; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); } // a level's talent pick came first
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b4_c6_/.test(k));
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); if (/undefined|NaN|\[object|\$\{/.test(n.txt)) errs.push(k + ': leaks'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const lvl13 = () => { S.lvl = 13; S.xp = LEVELS[12]; S.chapters = {1:'grave', 2:'march', 3:'carry', 4:'seti', 5:'seep'}; Object.assign(S.f, {b4_c1_key:'grave', b4_bone:'grave', b4_c2_key:'march', b4_c3_key:'carry', b4_carried:1, b4_c4_key:'seti', b4_c5_key:'seep', b4_seepWater:1, b4_c5_desDone:1}); S.picksDue = []; };
  try {
  /* ================= a fresh start, at Chapter Six ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); lvl13(); save(); startChapter(6);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, dust:S.dust, n0:S.nerve, renderErr:renderAll(), nodes:nodes.length, volunteered:/put his hand up/.test(CHAPTERS[6].intro.paras[2]())};
  talk('b4_c6_start'); out.f.omen = S.nerve - out.f.n0; out.f.deckFirst = has('b4_c6_start', /Deck/); out.f.glossary = S.f.b4_c6_panarak && S.f.b4_c6_dogs;
  take('b4_c6_start', /Find Radde/);
  out.f.spurShut = !has('b4_c6_to_spur', /gullies/);
  talk('b4_c6_radde'); out.f.raddeTxt = /put my hand up/.test(DLG.b4_c6_radde().txt); take('b4_c6_radde', /Who's on our left/); out.f.notNamed = !/Keneb|8th|10th/.test(DLG.b4_c6_radde_why().txt) && /horse is held back/.test(DLG.b4_c6_radde_why().txt);
  take('b4_c6_radde_why', /The spur/); out.f.said = S.f.b4_c6_raddeSaid;
  talk('b4_c6_recruits'); out.f.nerveWidget = /Nerve/.test(DLG.b4_c6_recruits().html || ''); const nr = S.nerve; take('b4_c6_recruits', /Get some sleep/); out.f.recruits = S.nerve - nr;
  talk('b4_c6_lookout'); made('b4_c6_lookout', /Count the ramps/, 'haddat', 'near'); out.f.counted = S.f.b4_c6_counted && !!(S.rattled && S.rattled.haddat);
  talk('b4_c6_nilnether'); out.f.nil = S.f.b4_c6_nil && /barefoot/.test(DLG.b4_c6_nilnether().txt);
  talk('b4_c6_horse'); out.f.horse = S.f.b4_c6_horse && /No room/.test(DLG.b4_c6_horse().txt);
  talk('b4_c6_hollet'); out.f.hollet = S.f.b4_c6_hollet;
  talk('b4_c6_scrape'); made('b4_c6_scrape', /Dig the scrapes/, 'tangle'); out.f.dug = S.f.b4_c6_dug;
  /* the reading at the picket */
  talk('b4_c6_deck'); const dk = DLG.b4_c6_deck(); runFx(dk.ch.find(c => /draw/.test(c.t))); out.f.deck = {drawn:S.f.b4_c6_drawn, reader:S.f.b4_c6_reader, card:S.card, inPool:B4POOL[6].includes(S.card)};
  S.card = 'b4c_leper'; { const cn = DLG.b4_c6_card(); cn.fx(); } out.f.chains = S.f.b4_chains;
  /* the fire at dusk */
  talk('b4_c6_picketfire'); const fy = DLG.b4_c6_picketfire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b4_c6_picketfire', /rest/), talk:has('b4_c6_picketfire', /Talk with the squad/), on:has('b4_c6_picketfire', /Out to the spur/), notNow:has('b4_c6_picketfire', /Not now/), noEve:!has('b4_c6_picketfire', /The eve/)};
  take('b4_c6_picketfire', /Let the squad rest/); out.f.rested = S.f.b4_c6_rest1;
  out.f.talkLines = DLG.b4_c6_picketfire_talk().txt.split('\n\n').length; out.f.squadHere = S.squad.filter(id => id !== 'sgt').length;
  /* the spur, with the seep's water in the skins */
  take('b4_c6_picketfire', /Out to the spur/); out.f.spurStay = has('b4_c6_to_spur', /Not now/); take('b4_c6_to_spur', /Up the gullies/); out.f.spurNotNow = has('b4_c6_spur_start', /Not now/) && has('b4_c6_spur_start', /far gully/);
  out.f.nest = await force('b4_c6_nest'); out.f.spade = S.kit.includes('b4_c6_trenchspade'); out.f.nestDone = S.f.b4_c6_nestDone;
  /* dusk: the skirmishers, with the company */
  take('b4_c6_nest_after', /Back to the picket/); talk('b4_c6_dusk_start'); out.f.duskNotNow = has('b4_c6_dusk_start', /Not now/);
  const n1 = S.nerve; out.f.dusk = await force('b4_c6_dusk'); out.f.duskClean = S.nerve - n1; out.f.badge = S.kit.includes('b4_c6_dogslayer'); out.f.horn = S.kit.includes('b4_c6_pickethorn');
  take('b4_c6_dusk_after', /The night/); out.f.nightStay = has('b4_c6_nightfall', /Not yet/); take('b4_c6_nightfall', /The night/);
  out.f.night = {area:S.area, ph:S.f.b4_c6_ph, barrow:/Sathi would have hated a picket/.test(DLG.b4_c6_night_arrive().txt)};
  /* the eve: one scene per squadmate present, each guarded */
  talk('b4_c6_picketfire'); out.f.eveOffered = has('b4_c6_picketfire', /The eve/); const ev = DLG.b4_c6_eve(), evCh = ev.ch.filter(c => !c.req || c.req()).filter(c => !/Back/.test(c.t));
  out.f.eve = {again:typeof ev.again === 'function' ? !!ev.again() : !!ev.again, n:evCh.length, want:S.squad.filter(id => id !== 'sgt').length, loy:0, all:true};
  evCh.forEach(c => { const id = c.go.replace('b4_c6_eve_', ''), l0 = S.loy[id]; talk(c.go); DLG[c.go]().fx && DLG[c.go]().fx(); if (!S.f['b4_c6_eve_' + id]) out.f.eve.all = false; if (S.loy[id] === Math.min(3, l0 + 1)) out.f.eve.loy++; });
  out.f.tallowReads = /bell/.test(DLG.b4_c6_eve_tallow().txt) && !/Master|Knight of Chains/.test(DLG.b4_c6_eve_tallow().txt);
  /* the Long Listen, and the recruits at night */
  talk('b4_c6_listenpost'); made('b4_c6_listenpost', /Learn to hear/, 'haddat'); out.f.trick = S.tricks && S.tricks.b4_c6_listen && S.tricks.b4_c6_listen.who;
  talk('b4_c6_recruits_night'); out.f.nightWidget = /Nerve/.test(DLG.b4_c6_recruits_night().html || ''); const nn = S.nerve; take('b4_c6_recruits_night', /Sit down by him/); out.f.recNight = S.nerve - nn;
  out.f.gapShut = !has('b4_c6_gap', /Out across/);
  talk('b4_c6_radde_night'); take('b4_c6_radde_night', /Sergeant\."/); out.f.keyStay = has('b4_c6_key', /moment/);
  const snap = JSON.stringify(S);
  /* key: hold */
  const lh = {n:S.nerve, d:S.loy.darrut, h:S.loy.hessa};
  take('b4_c6_key', /We hold the picket/); out.h = {key:S.f.b4_c6_key, saw:S.f.b4_saw, nerve:S.nerve - lh.n, hollet:S.f.b4_c6_holletSigned};
  out.h.stay = has('b4_c6_hold', /Not yet/); take('b4_c6_hold', /To the screen/); out.h.startNotNow = has('b4_c6_patrol_start', /Not now/);
  const n3 = S.nerve; out.h.fight = await force('b4_c6_patrol'); out.h.clean = S.nerve - n3; out.h.done = S.f.b4_c6_patrolDone;
  take('b4_c6_patrol_after', /Back to the fire/); out.h.dawnOn = has('b4_c6_picketfire', /first light/); take('b4_c6_picketfire', /first light/);
  out.h.dawnStay = has('b4_c6_dawn', /Not yet/); take('b4_c6_dawn', /Sleep/); await wait(50);
  out.h.end = {view, ch:S.chapters[6], lvl:S.lvl, nerve:S.nerve, net:S.nerve - out.f.n0}; out.h.extras = CHAPTERS[6].extras().length; out.h.journal = CHAPTERS[6].journal().length;
  /* key: forward, from the same moment */
  S = JSON.parse(snap); save(); startExplore('b4_c6_night');
  talk('b4_c6_key'); const lf = {n:S.nerve}; take('b4_c6_key', /go and look/); out.w = {key:S.f.b4_c6_key, saw:S.f.b4_saw, nerve:S.nerve - lf.n};
  out.w.stay = has('b4_c6_forward', /Not yet/); take('b4_c6_forward', /To the gap/); out.w.gapNotNow = has('b4_c6_gap', /Not now/);
  made('b4_c6_gap', /Out across the basin/, 'tangle', 'near'); out.w.seen = S.f.b4_c6_seen; take('b4_c6_out', /On, low/); out.w.basin = S.area;
  talk('b4_c6_basin_rock'); out.w.backShut = !has('b4_c6_basin_back', /Back to the line/);
  take('b4_c6_to_ramp', /Up to the foot/); out.w.ramp = {area:S.area, ph:S.f.b4_c6_ph, close:S.f.b4_c6_sawClose, wrong:/the dark is wrong/.test(DLG.b4_c6_ramp_arrive().txt)};
  out.w.upShut = DLG.b4_c6_ramp_up().ch.every(c => /Not that way/.test(c.t)); talk('b4_c6_ramp_look');
  out.w.noInside = !/inside the trench|into the trench/.test(DLG.b4_c6_ramp_look().txt);
  talk('b4_c6_outpost_start'); out.w.outNotNow = has('b4_c6_outpost_start', /Not now/);
  const n6 = S.nerve; out.w.fight = await force('b4_c6_outpost'); out.w.done = S.f.b4_c6_outpostDone; out.w.clean = S.nerve - n6;
  take('b4_c6_outpost_after', /Inside the screen/); take('b4_c6_return', /The fire/); out.w.area = S.area; take('b4_c6_picketfire', /first light/); take('b4_c6_dawn', /Sleep/); await wait(50);
  out.w.end = {view, ch:S.chapters[6], lvl:S.lvl, nerve:S.nerve, net:S.nerve - out.f.n0};
  /* the trick, the badge and the horn in a fight */
  S = JSON.parse(snap); migrate(S); S.tricks = {b4_c6_listen:{who:'haddat', ch:6}}; S.gear.haddat = Object.assign({}, S.gear.haddat, {trinket:'b4_c6_pickethorn'}); S.gear.tangle = Object.assign({}, S.gear.tangle, {trinket:'b4_c6_dogslayer'}); delete S.f.b4_c6_hornBlown; save();
  startBattle('b4_c6_dusk', {}); await wait(60);
  { const hd = B.units.find(u => u.id === 'haddat'), tg = B.units.find(u => u.id === 'tangle'), mr = B.units.find(u => u.id === 'marrow'), fs = B.units.filter(u => u.side === 'e'), e0 = fs[0], e1 = fs[1];
    out.tr = {hasListen:hd.ab.includes('t_b4_c6_listen'), hasHorn:hd.ab.includes('t_b4_c6_horn')};
    const b0 = atkCalc(mr, e0).bonus, b1 = atkCalc(mr, e1).bonus;
    AB.t_b4_c6_listen.run(hd); boonFoeTurnStart(e0); boonFoeTurnStart(e1); out.tr.marked = atkCalc(mr, e0).bonus - b0; out.tr.unmarked = atkCalc(mr, e1).bonus - b1;
    e0.x = hd.x + 1; e0.y = hd.y; e1.x = hd.x - 1; e1.y = hd.y; out.tr.noFlank = !flanked(e0, hd); squadTurnStart(hd); out.tr.flankBack = flanked(e0, hd);
    { const withB = atkCalc(tg, e0).bonus, g = S.gear.tangle.trinket; S.gear.tangle.trinket = null; out.tr.badge = withB - atkCalc(tg, e0).bonus; S.gear.tangle.trinket = g; }
    const allies0 = B.units.filter(u => u.b4reg).length; B.cur = hd; AB.t_b4_c6_horn.run(hd); out.tr.horn = B.units.filter(u => u.b4reg).length - allies0; out.tr.blown = S.f.b4_c6_hornBlown; B.over = true; }
  startBattle('b4_c6_dusk', {}); await wait(60); out.tr.hornGone = !B.units.find(u => u.id === 'haddat').ab.includes('t_b4_c6_horn'); B.over = true;
  } catch (e) { out.err = e.stack; }
  /* ================= a Book Two transfer: Sathi alive, Keth walking, Marrow dead at the Barrow; Ch4's seti and picket roads ================= */
  try {
  setBook('hoc'); S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'wickans', lvl:8, mates:['haddat', 'sathi', 'tangle'], dead:['marrow'], ramin:false, keth:true,
    f:{b2_c7_key:'wickans', b2_hackleBack:0, b2_ilhar:'lost', keepsakes:[]}};
  delete S.dead.sathi; S.dead = {marrow:{ch:7, where:'The Barrow', from:'dg'}}; S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'tallow', 'warlock']; S.f.b4_kethDone = 1; S.f.b4_orvasDone = 2; migrate(S); lvl13();
  S.f.b4_seepWater = 0; S.f.b4_setiSaved = 1; S.f.b4_blistigNoticed = 1; save(); startChapter(6);
  out.t = {renderErr:renderAll(), keth:b4In('warlock'), marrow:b4In('marrow'), asked:/asked for the Chain squad by name/.test(CHAPTERS[6].intro.paras[2]())};
  out.t.kethNamed = ['b4_c6_start', 'b4_c6_picketfire_talk', 'b4_c6_radde_2', 'b4_c6_spur_start', 'b4_c6_nilnether', 'b4_c6_dusk_start', 'b4_c6_key', 'b4_c6_hold', 'b4_c6_dawn'].filter(k => { const n = DLG[k](); return /Keth|grandmother/.test(n.txt); }).length;
  talk('b4_c6_radde'); out.t.raddeAsked = /By name/.test(DLG.b4_c6_radde().txt);
  out.t.ilhar = /green cloths that went over to Dom/.test(DLG.b4_c6_lookout().txt);
  out.t.setiNpc = AREAS.b4_c6_lines.npcs.find(n => n.id === 'seti').show(); talk('b4_c6_seti'); take('b4_c6_seti', /Stand with us/); out.t.stood = S.f.b4_c6_setiStood;
  out.t.nest = await force('b4_c6_nest');
  /* the swap at the fire: Orvas in, Keth back to Temul's youths */
  talk('b4_c6_picketfire'); out.t.swapOffered = has('b4_c6_picketfire', /Send for Orvas/); take('b4_c6_picketfire', /Send for Orvas/);
  out.t.swap = {orvas:b4In('orvas'), keth:b4In('warlock'), kethWaits:S.f.b4_kethDone === 2, line:/Orvas/.test(DLG.b4_c6_picketfire_swap().txt), fireLine:/Orvas/.test(DLG.b4_c6_picketfire_talk().txt)};
  b4SwapIn('warlock'); S.f.b4_c6_nestDone = 1; S.f.b4_c6_duskDone = 1; S.f.b4_c6_ph = 2; startExplore('b4_c6_night');
  out.t.barrow = /Marrow would have gone along the scrape/.test(DLG.b4_c6_night_arrive().txt);
  out.t.eveKeth = DLG.b4_c6_eve().ch.filter(c => !c.req || c.req()).some(c => /Keth/.test(c.t)) && !DLG.b4_c6_eve().ch.filter(c => !c.req || c.req()).some(c => /Marrow/.test(c.t));
  out.t.reader = (visReader() || {}).id;
  const tsnap = JSON.stringify(S);
  talk('b4_c6_key'); take('b4_c6_key', /We hold/); out.t.patrol = await force('b4_c6_patrol');
  S = JSON.parse(tsnap); save(); startExplore('b4_c6_night'); talk('b4_c6_key'); take('b4_c6_key', /go and look/); take('b4_c6_forward', /To the gap/); made('b4_c6_gap', /Out across/, 'sathi');
  out.t.seen = S.f.b4_c6_seen; take('b4_c6_out', /On, low/); take('b4_c6_to_ramp', /Up to the foot/); out.t.ilharTrench = /make herself stop/.test(DLG.b4_c6_ramp_look().txt);
  out.t.outpost = await force('b4_c6_outpost'); take('b4_c6_outpost_after', /Inside the screen/); take('b4_c6_picketfire', /first light/); take('b4_c6_dawn', /Sleep/); await wait(50);
  out.t.end = {view, ch:S.chapters[6], extras:CHAPTERS[6].extras().some(x => /Seti archer/.test(x)) && CHAPTERS[6].extras().some(x => /Keth/.test(x))};
  } catch (e) { out.err2 = e.stack; }
  return out;
});
if (r.err) no('page script threw (fresh): ' + r.err);
if (r.err2) no('page script threw (transfer): ' + r.err2);
const f = r.f || {}, h = r.h || {}, w = r.w || {}, t = r.t || {}, tr = r.tr || {};
if (f.area) {
  f.area === 'b4_c6_lines' && f.ch === 6 && f.lvl0 === 13 && f.dust === 2 && f.squad === 'sgt,haddat,tangle,marrow,tallow' && !f.renderErr.length && f.nodes >= 60 && f.nodes <= 80 && f.volunteered ? ok(`a fresh start opens Chapter Six at the flank pickets at level 13, Dust 2, Radde volunteered the Third; every one of ${f.nodes} b4_c6 nodes renders`) : no('fresh ' + JSON.stringify(f));
  f.omen === -1 && f.deckFirst && f.glossary && f.spurShut && f.raddeTxt && f.notNamed && f.said ? ok('the first halt: the trenches within sight (Nerve −1) and the Deck; Radde: the spur before dark, a legion gone round (unnamed), the horse held back') : no('halt ' + JSON.stringify([f.omen, f.deckFirst, f.glossary, f.spurShut, f.raddeTxt, f.notNamed, f.said]));
  f.nerveWidget && f.recruits === 1 && f.counted && f.nil && f.horse && f.hollet && f.dug ? ok('the picket at dusk: the recruits with the Nerve widget (+1); the ramps counted ("yes, but" rattled); Nil and Nether walk the lines; the horse held back; Hollet; the scrapes dug') : no('dusk ' + JSON.stringify([f.nerveWidget, f.recruits, f.counted, f.nil, f.horse, f.hollet, f.dug]));
  f.deck.drawn === 1 && f.deck.reader === 'marrow' && f.deck.inPool && f.chains === 1 ? ok(`the reading at the picket (Marrow draws ${f.deck.card}); the Leper sets b4_chains`) : no('deck ' + JSON.stringify([f.deck, f.chains]));
  f.fire.again && f.fire.rest && f.fire.talk && f.fire.on && f.fire.notNow && f.fire.noEve && f.rested === 1 && f.talkLines === f.squadHere ? ok(`the fire b4_c6_picketfire: an again line, a rest, the squad's talk (a line each, ${f.talkLines}), the way on with Not now`) : no('fire ' + JSON.stringify([f.fire, f.rested, f.talkLines, f.squadHere]));
  f.spurStay && f.spurNotNow && f.nest.started && f.nest.dust === 2 && f.nest.skins && f.nest.tangleRng && f.nest.tangleRng[1] === f.nest.tangleRng[0] && f.nest.stage2 && f.nest.inStage2 && f.nestDone && f.spade ? ok(`the spur (both grounds): the seep's water, +3 health and no dust on the first round's shots (Tangle ${f.nest.tangleRng && f.nest.tangleRng.join('/')}); the sapper's spade`) : no('nest ' + JSON.stringify([f.spurStay, f.spurNotNow, f.nest, f.nestDone, f.spade]));
  f.duskNotNow && f.dusk.started && f.dusk.regs >= 1 && f.dusk.stage2 && f.dusk.inStage2 && f.duskClean === 1 && f.badge && f.horn && f.nightStay ? ok(`dusk: the skirmishers with the company (${f.dusk.regs} regular), both grounds, Nerve +1 clean; the cut-off badge and the picket's horn`) : no('dusk fight ' + JSON.stringify([f.duskNotNow, f.dusk, f.duskClean, f.badge, f.horn, f.nightStay]));
  f.night.area === 'b4_c6_night' && f.night.ph === 2 && f.night.barrow && f.eveOffered && f.eve.again && f.eve.n === f.eve.want && f.eve.all && f.eve.loy === f.eve.n && f.tallowReads ? ok(`the night: the one Barrow line (Sathi); the eve, one scene for each of the ${f.eve.n} squadmates present, each +1 regard; Tallow's grandmother reads the night (the bell)`) : no('eve ' + JSON.stringify([f.night, f.eveOffered, f.eve, f.tallowReads]));
  f.trick === 'haddat' && f.nightWidget && f.recNight === 1 && f.gapShut && f.keyStay ? ok('the Long Listen learned on the rock; Nerve at its test (the widget, the boy who shook, +1); the gap shut before the key; the key can wait') : no('night ' + JSON.stringify([f.trick, f.nightWidget, f.recNight, f.gapShut, f.keyStay]));
}
h.key === 'hold' && h.saw === 'far' && h.nerve === 2 && h.hollet && h.stay && h.startNotNow && h.fight && h.fight.started && h.fight.regs >= 1 && h.fight.stage2 && h.fight.inStage2 && !h.fight.seti && h.clean === 1 && h.done && h.dawnOn && h.dawnStay && h.end && h.end.view === 'end' && h.end.ch === 'hold' && h.end.lvl >= 14 && h.end.net >= -2 && h.end.net <= 6
  ? ok(`key hold: b4_saw far, Radde and Hollet sign, Nerve +2; the patrol after midnight with the company, both grounds; the end at level ${h.end.lvl}, Nerve ${h.end.nerve} (net ${h.end.net}; ${h.extras} end lines, ${h.journal} journal)`) : no('hold ' + JSON.stringify(h));
w.key === 'forward' && w.saw === 'close' && w.nerve === -1 && w.stay && w.gapNotNow && w.seen === 'near' && w.basin === 'b4_c6_basin' && w.backShut && w.ramp.area === 'b4_c6_ramp' && w.ramp.ph === 4 && w.ramp.close && w.ramp.wrong && w.upShut && w.noInside && w.outNotNow && w.fight && w.fight.started && w.fight.stage2 && w.fight.inStage2 && w.fight.style2 === 'b4_c6_lines' && w.done && w.clean === 1 && w.area === 'b4_c6_night' && w.end && w.end.view === 'end' && w.end.ch === 'forward' && w.end.lvl >= 14
  ? ok(`key forward: b4_saw close, Nerve −1; the gap's "yes, but" (seen); the basin, the ramps' foot (the trenches full, the dark wrong), never up the ramps; the outpost and the run back (both grounds), Nerve +1 with nobody down; the end at level ${w.end.lvl}`) : no('forward ' + JSON.stringify(w));
tr.hasListen && tr.hasHorn && tr.marked === 2 && tr.unmarked === 0 && tr.noFlank && tr.badge === 1 && tr.horn === 2 && tr.blown === 1 && tr.hornGone ? ok('in a fight: the Long Listen marks the first enemy to move (+2, not the second) and no flanking until the bearer\'s next turn; the badge +1 against Dom\'s soldiers; the horn brings two regulars, once a book') : no('trick/kit ' + JSON.stringify(tr));
if (t.renderErr) {
  !t.renderErr.length && t.keth && !t.marrow && t.asked && t.raddeAsked && t.kethNamed >= 6 ? ok(`a transfer with Sathi alive, Keth walking and Marrow at the Barrow: every node renders; asked for by name (Ch4's picket road); Keth named in ${t.kethNamed} of 9 sampled nodes`) : no('transfer ' + JSON.stringify([t.renderErr, t.keth, t.marrow, t.asked, t.raddeAsked, t.kethNamed]));
  t.nest && t.nest.dog && t.nest.started && !t.nest.skins ? ok('Hackle is at Sathi\'s knee in the chapter\'s fights; no seep water on the column road') : no('dog ' + JSON.stringify(t.nest));
  t.swapOffered && t.swap.orvas && !t.swap.keth && t.swap.kethWaits && t.swap.line && t.swap.fireLine ? ok('the swap at the fire: Orvas in, Keth back to Temul\'s youths; Orvas has his line at the fire') : no('swap ' + JSON.stringify([t.swapOffered, t.swap]));
  t.ilhar && t.ilharTrench && t.barrow && t.eveKeth && t.reader === 'tallow' ? ok('Haddat looks for her brother among the Dogslayers (b2_ilhar lost) and stops; the Barrow line is Marrow\'s; the eve offers Keth and not Marrow; Tallow reads') : no('transfer lines ' + JSON.stringify([t.ilhar, t.ilharTrench, t.barrow, t.eveKeth, t.reader]));
  t.setiNpc && t.stood && t.patrol && t.patrol.seti && t.patrol.seti2 && t.outpost && t.outpost.seti && t.seen === 'no' && t.end && t.end.view === 'end' && t.end.ch === 'forward' && t.end.extras ? ok('the Seti archer who remembers stands the picket and fights in both key fights (both grounds); Sathi gets the squad across unseen; the end lines name the Seti and Keth') : no('seti ' + JSON.stringify([t.setiNpc, t.stood, t.patrol, t.outpost, t.seen, t.end]));
}
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
process.exit(bad.length ? 1 : 0);
