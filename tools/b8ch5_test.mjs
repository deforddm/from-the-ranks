// Book Eight, Chapter 5 (The Road Back, src/145_b8_ch5.js): the halts, both keys from the same moment at the milestone, the reading in the
// grass at dusk (and the card node the visions pass hooks onto), the fire (the Contract shown, a rest, a line each, the roster, Not now),
// every fight's start and a forced win (the long grass; both grounds of the dry wash and of the burned wayhouse, the wayhouse's knives
// from b8Roofs(5) and its +1 from the engine), the trick behind a hard check (Grass-Running: passive, its battle half marks the first
// foe to move and stops flanking), the items (each with its own art), the Contract (fast +1; wary's knives +1 by the engine; the lie-up
// check carries the Guild's paper and its "yes, but" costs one), the Hounds (never fought), the four torches far off (never closer), the
// peddler (stopped, poured, or let go and his kelyk still never reaching the city), the news at the gate (Mallet, callback 3; never the
// raid), what the chapter reads from Ch 2 and Ch 4 with defaults, "Not now" on every onward step and a "yes, but" on every check, from a
// fresh start and from a --from=5 style save (Tuft dead; Sohra, Vasso and Edrem walking; Ch 2 'fields', Ch 4 'burn').
// Usage: node tools/b8ch5_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(typeof x.t === 'function' ? x.t() : x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(typeof x.t === 'function' ? x.t() : x.t));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tth'); startExplore(area); };
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark; res.guild = !!B.def.guild;
    res.surprise = B.surprise || (B.surpriseRound ? 'p' : null); res.hound = B.units.some(u => u.b8hound);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.title2 = B && B.def.title; res.foes2 = B && B.units.filter(u => u.side === 'e').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b8_c5_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  /* the hard limits: nobody canon may meet or name here (§4), the never-use names, the crossroads people (rule 83), Traveller and Karsa and
     the plains clans, the Guild's Grand Master by name (rule 70), the raid's others (rule 71), years and weeks counted */
  const never = /Bridgeburner|Seba|Krute|Picker|Antsy|Blend\b|Murillio|Duiker|Kruppe|Kellanved|Dancer|Laseen|Burn's Sleep|\b11\d\d\b|Spinnock|Kallor|Korlat|Orfantal|Traveller|Karsa|Samar|Kindaru|Skathandi|Seerdomin|Benighted|Endest|Nimander|Itkovian|Bastion|Dragnipur|\bRake\b|\d+ (weeks|months|years)/i;
  const newsOnly = /Mallet|Bluepearl|Whiskeyjack/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (newsOnly.test(n.txt) && !['b8_c5_news', 'b8_c5_mallet', 'b8_c5_fire_talk'].includes(k)) errs.push(k + ': K\'rul\'s dead before the gate: ' + n.txt.match(newsOnly)[0]);
    else if (/Whiskeyjack/.test(n.txt) && k !== 'b8_c5_mallet') errs.push(k + ': the commander named outside the memory');
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but"; every onward step has a "Not now" (or "Not yet") beside it; under every phase, key and road */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), onwards = new Set();
    const keep = JSON.stringify({ph:S.f.b8_c5_ph, k:S.f.b8_c5_key, p:S.f.b8_c5_peddler, kd:S.f.b8_c5_knivesDone, m:S.f.b8_c5_mallet, c:S.f.b8_c5_calder});
    [1, 2, 3, 4].forEach(ph => ['fast', 'wary', null].forEach(k => [0, 1].forEach(done => { S.f.b8_c5_ph = ph; S.f.b8_c5_key = k; S.f.b8_c5_peddler = done ? 'stopped' : undefined; S.f.b8_c5_knivesDone = done; S.f.b8_c5_mallet = done; S.f.b8_c5_calder = done;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    const k0 = JSON.parse(keep); S.f.b8_c5_ph = k0.ph; S.f.b8_c5_key = k0.k; S.f.b8_c5_peddler = k0.p; S.f.b8_c5_knivesDone = k0.kd; S.f.b8_c5_mallet = k0.m; S.f.b8_c5_calder = k0.c;
    Object.keys(S.f).forEach(f => { if (S.f[f] === undefined) delete S.f[f]; });
    return {checks:checks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  const lines = () => DLG.b8_c5_fire_talk().txt.split('\n\n').length, here = () => S.squad.filter(id => id !== 'sgt' && b8In(id)).length;
  try {
  /* ================= a fresh start, brought to Chapter Five (earlier keys unset: the defaults) ================= */
  setBook('tth'); S = newStateTTH('Fresh'); S.lvl = 18; S.xp = LEVELS[17]; S.chapters = {}; S.picksDue = []; save(); const con0 = b8Contract(); startChapter(5); S.picksDue = [];
  const own = k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && !['b7_c4_bluelance', 'b7_c4_bluescale', 'b7_c4_musterbadge'].some(l => ART['item/' + k] === ART['item/' + l]);
  out.f = {area:S.area, ch:S.chapter, con:b8Contract() - con0, renderErr:renderAll(), title:CHAPTERS[5].title, nodes:nodes.length, areas:CHAPTERS[5].areas.length, fights:Object.keys(CHAPTERS[5].battles).length,
    items:Object.keys(CHAPTERS[5].gear).every(k => own(k) && ITEMS[k].role), itemN:Object.keys(CHAPTERS[5].gear).length,
    pack:ITEMS.b8_c5_peddlerpack.slot === 'trinket' && ITEMS.b8_c5_peddlerpack.stat.guile === 1, cloak:ITEMS.b8_c5_grasscloak.slot === 'armour' && ITEMS.b8_c5_grasscloak.role === 'light' && ITEMS.b8_c5_grasscloak.ac > 0,
    sword:ITEMS.b8_c5_raidersword.slot === 'weapon' && ITEMS.b8_c5_raidersword.role === 'blade', noNumbers:Object.values(CHAPTERS[5].gear).every(it => !/\d/.test(it.line)),
    figs:['b8_c5_outrider', 'b8_c5_peddler', 'b8_c5_benna'].every(k => typeof FIGX[k] === 'function' && FIGX[k].toString().length > 300), tiles:['b8_c5_grass', 'b8_c5_day'].every(k => typeof TILEX[k] === 'function'),
    scenes:['b8_lamatath', 'b8_c5_night', 'b8_c5_wash', 'b8_c5_wayhouse', 'b8_c5_gate'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), ownLam:SCENEX.b8_lamatath.toString().includes('b85'),
    fireRoster:(ROSTER_FIRES.tth[5] || []).includes('b8_c5_fire'), noHound:Object.values(CHAPTERS[5].battles).every(b => !(b.foes || []).some(f => f[0] === 'b8_hound') && !((b.stage2 || {}).foes || []).some(f => f[0] === 'b8_hound')),
    passive:V103_PASSIVE.includes('b8_c5_grass') && AB.t_b8_c5_grass.passive === true && /Always on/.test(TRICKS.b8_c5_grass.fx) && !/^Once a fight/.test(TRICKS.b8_c5_grass.fx),
    audit:audit()};
  /* the start, and the reading in the grass at dusk */
  talk('b8_c5_start'); out.f.ph = S.f.b8_c5_ph; out.f.deck = has('b8_c5_start', /Sit with Tuft/); out.f.walk = has('b8_c5_start', /Walk the halt/);
  talk('b8_c5_read'); const rd = DLG.b8_c5_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b8_c5_drawn, reader:S.f.b8_c5_reader, card:S.card, inPool:B8POOL[5].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B8READ[5].back, grass:/grass at dusk/.test(B8READ[5].where), cardNode:cardNodeName(), cardSp:DLG.b8_c5_card().sp, cardBack:DLG.b8_c5_card().ch[0].go, says:['tuft', 'sohra', 'benna'].every(k => !!B8READ[5].say[k])};
  /* the fire before Calder: no sleep yet */
  talk('b8_c5_fire'); const f1 = DLG.b8_c5_fire(); out.fire1 = {html:/The Contract/.test(f1.html || ''), talk:has('b8_c5_fire', /Talk with the squad/), sleep:has('b8_c5_fire', /Sleep/), rest:has('b8_c5_fire', /rest/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t), lines:lines(), here:here()};
  out.fire1.westShut = !has('b8_c5_west', /wash/);
  /* Calder, the outrider, Benna */
  talk('b8_c5_calder'); out.c = {met:S.f.b8_c5_calder, passed:/hidden wagon is empty now/.test(DLG.b8_c5_calder().txt)};
  take('b8_c5_calder', /Fete/); out.c.fete = /shuts at dusk on the last day/.test(DLG.b8_c5_calder_fete().txt); take('b8_c5_calder_fete', /Back/);
  take('b8_c5_calder', /road/); out.c.road = /peddler/.test(DLG.b8_c5_calder_road().txt); take('b8_c5_calder_road', /Back/);
  take('b8_c5_calder', /hidden wagon/); out.c.kelyk = S.f.b8_c5_calderKelyk === 1; take('b8_c5_calder_kelyk', /Back/);
  talk('b8_c5_outrider'); out.c.outrider = S.f.b8_c5_outrider === 1 && /Not to be known/.test(DLG.b8_c5_outrider().txt);
  talk('b8_c5_benna'); out.c.benna = S.f.b8_c5_benna === 1;
  /* the long grass: the riders (optional), a "yes, but" on facing them, then the fight */
  talk('b8_c5_to_grass'); out.g = {start:/shoulder-high/.test(DLG.b8_c5_to_grass().txt), notNow:has('b8_c5_grass_start', /Not now/)};
  const sg = JSON.stringify(S); near('b8_c5_grass_start', /Stand up in the grass/, 'kettle'); out.g.near = !!(S.rattled || {}).kettle; restore(sg, 'b8_c5_road');
  const cg = b8Contract(); out.g.fight = await force('b8_c5_grass'); out.g.con = b8Contract() - cg; out.g.done = S.f.b8_c5_grassDone === 1 && S.kit.includes('b8_c5_raidersword');
  out.g.after = /trampled flat/.test(DLG.b8_c5_to_grass().txt);
  /* the fire: a rest, then sleep; the night (the Hounds): a "yes, but" on holding the teams; never a fight */
  talk('b8_c5_fire'); out.n = {sleep:has('b8_c5_fire', /Sleep/)};
  S.wounds = {brisk:4}; S.injury = {kettle:'kelyk'}; take('b8_c5_fire', /Let the squad rest/); out.n.rested = !S.wounds && !(S.injury || {}).kettle && S.f.b8_c5_rest1 === 1;
  take('b8_c5_fire', /Sleep/); out.n.hounds = S.f.b8_c5_hounds === 1 && /Something is running through the grass/.test(DLG.b8_c5_sleep().txt) && vis('b8_c5_sleep').every(c => !/startBattle/.test(String(c.go)));
  const sn = JSON.stringify(S); near('b8_c5_sleep', /Hold the teams/, 'brisk'); out.n.near = ((S.bruised || {}).brisk || 0) > 0; restore(sn, 'b8_c5_road');
  made('b8_c5_sleep', /Hold the teams/, 'brisk'); out.n.held = S.f.b8_c5_teams === 'held' && /do not look at the wagons/.test(DLG.b8_c5_night_held().txt);
  take('b8_c5_night_held', /Lie down/); out.n.ph = S.f.b8_c5_ph; out.n.dawnNot = has('b8_c5_dawn_go', /Not now/);
  /* the dawn: the outrider reads the grass (the trick, ✦ wits 17; the cloak either way) */
  take('b8_c5_dawn_go', /Go and see/); const tc = vis('b8_c5_dawn').find(c => c.trick);
  out.t = {cloak:S.kit.includes('b8_c5_grasscloak'), dc:tc && tc.check[1], stat:tc && tc.check[0], notNow:has('b8_c5_dawn', /Not now/), edgeTuft:(edgesFor(tc, 'tuft').find(e => /Shadow/.test(e[0])) || [])[1], edgeVasso:(edgesFor(tc, 'vasso').find(e => /city boy/.test(e[0])) || [])[1]};
  const st = JSON.stringify(S); near('b8_c5_dawn', /Learn to read/, 'kettle'); out.t.near = !!(S.rattled || {}).kettle; restore(st, 'b8_c5_road');
  made('b8_c5_dawn', /Learn to read/, 'tuft'); out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b8_c5_grass && S.tricks.b8_c5_grass.who, ok:S.f.b8_c5_grassOk, again:!has('b8_c5_dawn', /Learn/)});
  /* its battle half: switched on as the fight opens, no button; the first foe to move is marked (+2), nobody flanked */
  startBattle('b8_c5_grass', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'tuft'), g = B.b85grass; out.t.on = !!g && g.on && g.u === u; out.t.noButton = !(u.ab || []).includes('t_b8_c5_grass') || !trickOk(u, AB.t_b8_c5_grass);
    const fs = B.units.filter(x => x.side === 'e'), a = fs[0], b = fs[1], me = B.units.find(x => x.id === 'brisk'); g.marked = null; g.on = true; g.r0 = B.round || 1; fs.forEach(x => { delete x.b85heard; });
    boonFoeTurnStart(a); out.t.marked = g.marked === a && a.b85heard === B.round + 1;
    out.t.plus = atkCalc(me, a).bonus - atkCalc(me, b).bonus; out.t.flank = flanked(b, me, b) === false;
    B.round = (B.round || 1) + 1; squadTurnStart(u); out.t.off = !g.on; }
  B = null; view = 'scene'; S.scene = 'talk';
  /* ================= phase 2: the dry wash, the peddler ================= */
  startExplore('b8_c5_road'); out.w = {west:has('b8_c5_west', /Ride ahead/), notNow:has('b8_c5_west', /Not now/), sleepShut:!has('b8_c5_fire', /Sleep/)};
  take('b8_c5_west', /Ride ahead/); out.w.area = S.area; out.w.seen = S.f.b8_c5_washSeen;
  talk('b8_c5_cart'); out.w.seal = /wheel and a key/.test(DLG.b8_c5_cart().txt);
  gain('b8_kelykjug'); talk('b8_c5_peddler'); out.w.met = S.f.b8_c5_pedMet; out.w.smell = /carrying a jug already/.test(DLG.b8_c5_peddler().txt); out.w.notLast = !/last of it/.test(DLG.b8_c5_peddler().txt); out.w.notNow = has('b8_c5_peddler', /Not now/);
  take('b8_c5_peddler', /Who sent you/); out.w.who = /He gives nothing/.test(DLG.b8_c5_peddler_who().txt); take('b8_c5_peddler_who', /Back/);
  take('b8_c5_peddler', /isn't for sale/); out.w.jug = S.f.b8_c5_jug === 'poured' && !S.kit.includes('b8_kelykjug'); take('b8_c5_jug', /Back/);
  const sp = JSON.stringify(S);
  /* the peddler let go: his cart smashed in the grass by morning, and his kelyk never reaches the city */
  take('b8_c5_peddler', /not our business/); out.l = {flag:S.f.b8_c5_peddler, npcGone:!AREAS.b8_c5_wash.npcs[0].show()};
  take('b8_c5_peddler_let', /Back along/); take('b8_c5_wash_back', /Back to the wagons/); out.l.eve = S.f.b8_c5_eve2 === 1; take('b8_c5_eve2', /fire/);
  take('b8_c5_fire', /Sleep/); out.l.mule = /mule screaming/.test(DLG.b8_c5_sleep2().txt); take('b8_c5_sleep2', /last day/);
  out.l.wreckFirst = has('b8_c5_lastday', /found on the road/) && !has('b8_c5_lastday', /^The milestone/);
  take('b8_c5_lastday', /found on the road/); out.l.wreck = S.f.b8_c5_wreck === 1 && S.kit.includes('b8_c5_peddlerpack') && /jugs are broken, all of them/.test(DLG.b8_c5_wreck().txt) && !/body|dead/.test(DLG.b8_c5_wreck().txt);
  restore(sp, 'b8_c5_wash');
  /* talked into pouring it out ("yes, but": rattled) */
  take('b8_c5_peddler', /Pour it out/); out.p = {notNow:has('b8_c5_peddler_pour', /Not now/)};
  const sq = JSON.stringify(S); near('b8_c5_peddler_pour', /Talk to him/, 'tuft'); out.p.near = !!(S.rattled || {}).tuft; restore(sq, 'b8_c5_wash');
  made('b8_c5_peddler_pour', /Talk to him/, 'ohl'); out.p.poured = S.f.b8_c5_peddler === 'poured' && S.kit.includes('b8_c5_peddlerpack') && /pours them out/.test(DLG.b8_c5_peddler_talked().txt);
  restore(sp, 'b8_c5_wash');
  /* stopped: the fight, both grounds */
  take('b8_c5_peddler', /Pour it out/); const cp = b8Contract(); out.p.fight = await force('b8_c5_peddler'); out.p.fightCon = b8Contract() - cp; out.p.stopped = S.f.b8_c5_peddler === 'stopped' && S.kit.includes('b8_c5_peddlerpack');
  out.p.cart = /stands empty/.test(DLG.b8_c5_cart().txt);
  /* the evening, the last night, the last morning, the milestone (the outrider reads the chalk: no Vasso on a fresh start) */
  take('b8_c5_peddler_after', /Back along/); take('b8_c5_wash_back', /Back to the wagons/); take('b8_c5_eve2', /fire/);
  talk('b8_c5_fire'); out.k = {sleep2:has('b8_c5_fire', /Sleep/), rest2:has('b8_c5_fire', /rest/)}; take('b8_c5_fire', /Sleep/); out.k.noMule = !/mule/.test(DLG.b8_c5_sleep2().txt);
  take('b8_c5_sleep2', /last day/); out.k.ph = S.f.b8_c5_ph; out.k.noWreck = !has('b8_c5_lastday', /found on the road/);
  take('b8_c5_lastday', /milestone/); out.k.chalk = S.f.b8_c5_chalk === 1 && /City men/.test(DLG.b8_c5_milestone().txt) && has('b8_c5_milestone', /Not yet/);
  take('b8_c5_milestone', /Decide/); const kn = DLG.b8_c5_key(); out.k = Object.assign(out.k, {fast:has('b8_c5_key', /Fast\.$/), wary:has('b8_c5_key', /Wary\.$/), notYet:has('b8_c5_key', /Not yet/), html:/The Contract/.test(kn.html || '')});
  const snapK = JSON.stringify(S), conK = b8Contract();
  /* ================= key: fast ================= */
  take('b8_c5_key', /Fast\.$/); out.fa = {key:S.f.b8_c5_key, con:b8Contract() - conK, notNow:has('b8_c5_fast', /Not now/), decideGone:!has('b8_c5_milestone', /Decide/)};
  talk('b8_c5_fire'); out.fa.way = has('b8_c5_fire', /On, for the gate/);
  take('b8_c5_fast', /To the gate/); out.fa.area = S.area; out.fa.ph = S.f.b8_c5_ph; out.fa.torches = S.f.b8_c5_torches === 1 && /four torches on tall poles/.test(DLG.b8_c5_gate_arrive().txt) && /one figure/.test(DLG.b8_c5_gate_arrive().txt);
  take('b8_c5_gate_arrive', /queue/); talk('b8_c5_torches'); out.fa.never = /does not come nearer/.test(DLG.b8_c5_torches().txt) && vis('b8_c5_torches').length === 1;
  out.fa.gateShut = !has('b8_c5_gate_in', /Through|Talk the wagons/);
  talk('b8_c5_benlo'); out.fa.benloNot = has('b8_c5_benlo', /Not now/); take('b8_c5_benlo', /Heard what/);
  const nt = DLG.b8_c5_news().txt; out.fa.news = /Mallet/.test(nt) && /Bluepearl/.test(nt) && /Guild, people say/.test(nt) && !/raid|Picker|Blend|Antsy|cellar/.test(nt);
  take('b8_c5_news', /Mallet/); const mt = DLG.b8_c5_mallet().txt; out.fa.mallet = S.f.b8_c5_mallet === 1 && /a week/.test(mt) && /the commander/.test(mt) && !/Whiskeyjack/.test(mt) && /better than me/.test(mt) && /Hood/.test(mt);
  talk('b8_c5_calder_end'); out.fa.calder = S.f.b8_c5_calderEnd === 1 && /merchant'll want you again/.test(DLG.b8_c5_calder_end().txt);
  talk('b8_c5_benna_end'); out.fa.benna = S.f.b8_c5_bennaEnd === 1 && /Bar it/.test(DLG.b8_c5_benna_end().txt);
  talk('b8_c5_wall'); out.fa.wall = /masks/.test(DLG.b8_c5_wall().txt);
  const gc = vis('b8_c5_gate_in').find(c => c.check); out.fa.toll = gc && gc.check[0] === 'guile' && has('b8_c5_gate_in', /Not now/);
  const sl = JSON.stringify(S), s0 = S.silver; near('b8_c5_gate_in', /Talk the wagons/, 'sgt'); out.fa.near = s0 - S.silver === Math.min(4, s0); restore(sl, 'b8_c5_gate');
  made('b8_c5_gate_in', /Talk the wagons/, 'sgt'); out.fa.fair = S.f.b8_c5_toll === 'fair' && S.silver === s0 && has('b8_c5_toll_ok', /Not now/);
  take('b8_c5_toll_ok', /Through the gate/); out.fa.notYet = has('b8_c5_onward', /Not yet/);
  const conF = b8Contract(); take('b8_c5_onward', /Home/); await wait(60);
  out.fa.end = {view, ch:S.chapters[5], con:conF, lvl:S.lvl, extras:CHAPTERS[5].extras().length, journal:CHAPTERS[5].journal().length, endText:(CHEND[5] || {}).fast && CHEND[5].fast[0]};
  /* ================= key: wary, from the same moment ================= */
  S = JSON.parse(snapK); save(); setBook('tth'); S.chapter = 5; startExplore('b8_c5_road');
  take('b8_c5_key', /Wary\.$/); out.wa = {key:S.f.b8_c5_key, con:b8Contract() - conK};
  take('b8_c5_wary', /Up to the wayhouse/); out.wa.area = S.area; out.wa.notNow = has('b8_c5_lieup', /Not now/);
  const lc = vis('b8_c5_lieup').find(c => c.check); out.wa.contractCheck = !!lc.contract; out.wa.grassEdge = (edgesFor(lc, 'kettle').find(e => /Grass-Running/.test(e[0])) || [])[1];
  { const c0 = S.b8.con; S.b8.con = 5; out.wa.paper = (edgesFor(lc, 'kettle').find(e => /Guild's paper/.test(e[0])) || [])[1]; S.b8.con = c0; }
  const sw = JSON.stringify(S), cw = b8Contract(); near('b8_c5_lieup', /Find each of them/, 'kettle'); out.wa.near = b8Contract() - cw; restore(sw, 'b8_c5_rise');
  out.wa.onShut = !has('b8_c5_rise_on', /To the gate/);
  made('b8_c5_lieup', /Find each of them/, 'kettle'); out.wa.found = S.f.b8_c5_found === 1;
  const ck = b8Contract(), roofs = b8Roofs(5).length; out.wa.fight = await force('b8_c5_knives', {surprise:'p'}); out.wa.roofs = roofs; out.wa.fightCon = b8Contract() - ck;
  out.wa.scouted = S.f.b8_c5_scouted === 1 && S.f.b8_c5_knivesDone === 1 && !AREAS.b8_c5_rise.npcs[0].show();
  talk('b8_c5_wayhouse'); out.wa.blank = /blank on both sides/.test(DLG.b8_c5_wayhouse().txt);
  take('b8_c5_rise_on', /To the gate/); out.wa.gate = S.area === 'b8_c5_gate' && S.f.b8_c5_torches === 1;
  take('b8_c5_gate_arrive', /queue/); talk('b8_c5_benlo'); take('b8_c5_benlo', /Heard what/); take('b8_c5_news', /Mallet/); talk('b8_c5_gate_in');
  take('b8_c5_gate_in', /Pay what they ask/); out.wa.paid = S.f.b8_c5_toll === 'paid'; take('b8_c5_toll_paid', /Through/);
  const conW = b8Contract(); take('b8_c5_onward', /Home/); await wait(60);
  out.wa.end = {view, ch:S.chapters[5], con:conW, endText:(CHEND[5] || {}).wary && CHEND[5].wary[0]};
  /* ================= a --from=5 style save: Tuft dead; Sohra, Vasso and Edrem walking; Ch 1 hunt, Ch 2 fields, Ch 3 kneel, Ch 4 burn ================= */
  setBook('tth'); S = newStateTTH('Syn'); S.lvl = 18; S.xp = LEVELS[17]; S.squad = ['sgt', 'brisk', 'kettle', 'ohl', 'sohra', 'vasso', 'edrem']; S.squad = S.squad.slice(0, 6); S.dead.tuft = {ch:7, where:'Coral', from:'moi'};
  S.squad = ['sgt', 'brisk', 'ohl', 'sohra', 'vasso', 'edrem']; S.camp = ['kettle'];
  S.imported = {from:'Syn', book:'moi', road:'daru', lvl:15, mates:['brisk', 'kettle', 'ohl', 'sohra'], lifted:true};
  S.chapters = {1:'hunt', 2:'fields', 3:'kneel', 4:'burn'}; S.f.b8_c1_key = 'hunt'; S.f.b8_c2_key = 'fields'; S.f.b8_c3_key = 'kneel'; S.f.b8_c4_key = 'burn'; S.f.b8_vassoDone = 1; S.f.b8_edremDone = 1; S.f.b8_away3 = 1; S.f.b8_away4 = 1;
  ['sohra', 'vasso', 'edrem', 'kettle'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(5); S.picksDue = [];
  out.s = {renderErr:renderAll(), reader:visReader().id, lines:lines(), here:here(), vasso:/Vasso/.test(DLG.b8_c5_fire_talk().txt), edrem:/Edrem/.test(DLG.b8_c5_fire_talk().txt), sohra:/Sohra/.test(DLG.b8_c5_fire_talk().txt),
    cold:/cool with the Fourth/.test(DLG.b8_c5_calder().txt), last:/last of it/.test(DLG.b8_c5_peddler().txt), noSeal:/None of them carry a Daru seal/.test(DLG.b8_c5_cart().txt),
    vassoStart:/Vasso/.test(DLG.b8_c5_start().txt), edremStart:/Edrem/.test(DLG.b8_c5_start().txt)};
  S.f.b8_c5_chalk = 1; out.s.vassoChalk = /The Guild's road mark/.test(DLG.b8_c5_milestone().txt);
  { const lc2 = DLG.b8_c5_lieup().ch.find(c => c.check); out.s.vassoEdge = (edgesFor(lc2, 'vasso').find(e => /taught where/.test(e[0])) || [])[1]; }
  S.f.b8_c5_ph = 3; out.s.lines3 = lines(); S.f.b8_c5_news = 1; out.s.vassoNews = /Not my paper/.test(DLG.b8_c5_news().txt); out.s.noOhlLedger = /writes a name in it/.test(DLG.b8_c5_mallet().txt);
  out.s.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, f1 = r.fire1 || {}, c = r.c || {}, g = r.g || {}, n = r.n || {}, t = r.t || {}, w = r.w || {}, l = r.l || {}, p = r.p || {}, k = r.k || {}, fa = r.fa || {}, wa = r.wa || {}, s = r.s || {};
if (f.area) {
  f.area === 'b8_c5_road' && f.ch === 5 && f.con === 0 && !f.renderErr.length && f.title === 'The Road Back' && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 3 && f.pack && f.cloak && f.sword && f.noNumbers && f.figs && f.tiles && f.scenes && f.ownLam && f.fireRoster && f.noHound && f.passive && f.nodes >= 60 && f.nodes <= 80
    ? ok(`Chapter Five opens at the caravan's halt on the Lamatath, the Contract unmoved; every b8_c5 node renders, no never-name, K'rul's dead only at the gate, no "!" in narration (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights, no Hound in any); three new items with their own art; the outrider, the peddler, Benna, two grounds and five backdrops drawn; Grass-Running is passive`) : no('fresh ' + JSON.stringify(f).slice(0, 1600));
  const au = f.audit || {}; au.checks >= 6 && !au.noNear.length && au.onwards >= 8 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.walk ? ok('the start: the halt on the grass, the reading offered at the first halt') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'tuft' && rd.inPool && rd.notNow && rd.back === 'b8_c5_fire' && rd.grass && rd.says && rd.cardNode === 'b8_c5_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b8_c5_fire' ? ok(`the reading in the grass at dusk: Tuft draws (${rd.card}); a line for all three readers; the card node is the visions pass's hook (b8_c5_card)`) : no('reading ' + JSON.stringify(rd));
f1.html && f1.talk && !f1.sleep && f1.rest && f1.notNow && f1.lines === f1.here && f1.westShut ? ok(`the fire before Calder: the Contract shown, a rest, the talk (a line each, ${f1.lines}), Not now; no sleep and no road west yet`) : no('fire1 ' + JSON.stringify(f1));
c.met && c.passed && c.fete && c.road && c.kelyk && c.outrider && c.benna ? ok('Calder (the gate shuts at dusk on the last day; the peddler ahead; his empty wagon, Ch 2 passed by default), the outrider who will not give her name, Benna at her tubs') : no('calder ' + JSON.stringify(c));
g.start && g.notNow && g.near && g.fight && g.fight.started && g.fight.dark && !g.fight.guild && !g.fight.hound && g.fight.after === 'b8_c5_grass_after' && g.con === 0 && g.done && g.after ? ok(`the long grass (optional): a "yes, but" on facing the riders, the fight (${g.fight.foes} raiders, not the Guild), the raider's sword`) : no('grass ' + JSON.stringify(g));
n.sleep && n.rested && n.hounds && n.near && n.held && n.ph === 2 && n.dawnNot ? ok('the night: a rest first (wounds and the kelyk-sickness go); something runs through the grass toward the city, never a fight; a "yes, but" on holding the teams; they do not look at the wagons') : no('night ' + JSON.stringify(n));
t.cloak && t.dc === 17 && t.stat === 'wits' && t.notNow && t.edgeTuft === 1 && t.edgeVasso === -1 && t.near && t.who === 'tuft' && t.ok === 1 && t.again && t.on && t.noButton && t.marked && t.plus === 2 && t.flank && t.off
  ? ok('the trick: Grass-Running, a ✦ wits 17 check at the outrider\'s line; passive (on as the fight opens, no button), marks the first foe to move (+2), nobody flanked through the first round; the grass-dyed cloak') : no('trick ' + JSON.stringify(t));
w.west && w.notNow && w.sleepShut && w.area === 'b8_c5_wash' && w.seen && w.seal && w.met && w.smell && w.notLast && w.notNow && w.who && w.jug ? ok('the dry wash: the peddler (from the camp, nobody sent him), the merchant\'s seal on his jugs (Ch 2 passed), the squad\'s own jug poured out at his feet') : no('wash ' + JSON.stringify(w));
l.flag === 'let' && l.npcGone && l.eve && l.mule && l.wreckFirst && l.wreck ? ok('the peddler let go: a mule in the night, and by morning his cart smashed in the grass where something ran through it, every jug broken, his tracks running east; the pack') : no('let ' + JSON.stringify(l));
p.notNow && p.near && p.poured && p.fight && p.fight.started && p.fight.stage2 && p.fight.inStage2 && p.fight.after === 'b8_c5_peddler_after' && p.fightCon === 0 && p.stopped && p.cart ? ok(`the peddler talked round (a "yes, but"), or stopped: the dry wash and the riders back from the water (${p.fight.foes} then ${p.fight.foes2})`) : no('peddler ' + JSON.stringify(p));
k.sleep2 && k.rest2 && k.noMule && k.ph === 3 && k.noWreck && k.chalk && k.fast && k.wary && k.notYet && k.html ? ok('the last day: the Guild\'s chalk on the milestone (the outrider reads it), the key with the Contract shown and Not yet') : no('key ' + JSON.stringify(k));
fa.key === 'fast' && fa.con === 1 && fa.notNow && fa.decideGone && fa.way && fa.area === 'b8_c5_gate' && fa.ph === 4 && fa.torches && fa.never && fa.gateShut && fa.benloNot && fa.news && fa.mallet && fa.calder && fa.benna && fa.wall && fa.toll && fa.near && fa.fair && fa.notYet && fa.end && fa.end.view === 'end' && fa.end.ch === 'fast' && fa.end.extras >= 5 && fa.end.journal >= 5 && fa.end.endText === 'The gate before dark'
  ? ok(`key fast: the Contract +1 (they slipped the knives); the gate at dusk; four torches far off and one figure, never nearer; Benlo's news (Mallet and Bluepearl, never the raid), the sergeant and Ohl remember Mallet's week; the toll ("yes, but" in silver); the end at the Contract ${fa.end.con}`) : no('fast ' + JSON.stringify(fa).slice(0, 1400));
wa.key === 'wary' && wa.con === 0 && wa.area === 'b8_c5_rise' && wa.notNow && wa.contractCheck && wa.grassEdge === 2 && wa.paper === -1 && wa.near === 1 && wa.onShut && wa.found && wa.fight && wa.fight.started && wa.fight.guild && wa.fight.foes === 1 + wa.roofs && wa.fight.stage2 && wa.fight.inStage2 && wa.fight.after === 'b8_c5_knives_after' && wa.fightCon === 1 && wa.scouted && wa.blank && wa.gate && wa.paid && wa.end && wa.end.view === 'end' && wa.end.ch === 'wary' && wa.end.endText === 'The knives on the road'
  ? ok(`key wary, from the same moment: the lie-up check carries the Guild's paper and its "yes, but" costs one Contract; the burned wayhouse (a crossbow and ${wa.roofs} knives by b8Roofs(5)), the roof, the engine's +1; scouted for Ch 6; the end at the Contract ${wa.end.con}`) : no('wary ' + JSON.stringify(wa).slice(0, 1400));
s.renderErr && !s.renderErr.length && s.reader === 'sohra' && s.lines === s.here && s.lines3 === s.here && s.vasso && s.edrem && s.sohra && s.cold && s.last && s.noSeal && s.vassoStart && s.edremStart && s.vassoChalk && s.vassoEdge === 3 && s.vassoNews && s.noOhlLedger && !s.audit.noNear.length && !s.audit.noStay.length
  ? ok(`a --from=5 style save (Tuft dead; Sohra, Vasso, Edrem walking; Ch 2 fields, Ch 4 burn): every node renders, Sohra reads, a line each at the fire (${s.lines}), Calder cool, the peddler's the last kelyk on the road and no Daru seal, Vasso reads the chalk and says "not my paper", the sergeant's ledger takes the names`) : no('synthetic ' + JSON.stringify(s).slice(0, 1400));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b8ch5: FAIL (${bad.length})` : 'b8ch5: all ok'); process.exit(bad.length ? 1 : 0);
