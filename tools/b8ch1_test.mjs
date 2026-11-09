// Book Eight, Chapter 1 (Before the Fete, src/141_b8_ch1.js): the halts, both keys from the same moment at the fire, the reading at the
// table (Tuft; and the card node the visions pass hooks onto), the fire (the Contract shown, a rest, a line each, the roster, Not now),
// every fight's start and a forced win (both grounds of the alley and of the go-between's house), the trick behind a hard check (taught,
// free, and its battle half), the items (each with art), the Contract moves (the alley +1 by the engine, hunt +2, quiet −2, the go-between
// check's "yes, but" +1 once), the recruit (Vasso on 'hunt': waits, then joins; or joins at once), the callbacks (the painted sign, Bredd,
// the old historian at K'rul's, Vell's mark), "Not now" on every onward step and a "yes, but" on every check, from a fresh start and from a
// --from=1 style save with a transfer's squad (Tuft dead, Vell and Ellis walking).
// Usage: node tools/b8ch1_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  /* a forced win, through the engine's own endBeat (so the Guild's +1 is the engine's); a fight with a second ground goes through stageBreak */
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark; res.guild = !!B.def.guild;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.style2 = B && B.def.style; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b8_c1_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Seba|Krute|Picker|Mallet|Bluepearl|Antsy|Blend\b|Murillio|Duiker|Kruppe|Vidikas estate|Kellanved|Dancer|Laseen|Burn's Sleep|\b11\d\d\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but"; every onward step has a "Not now" (or "Not yet") beside it; under several states */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), onwards = new Set();
    const ph0 = S.f.b8_c1_ph, k0 = S.f.b8_c1_key;
    [1, 2, 3, 4, 5].forEach(ph => ['hunt', 'quiet', null].forEach(k => { S.f.b8_c1_ph = ph; S.f.b8_c1_key = k;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); }));
    S.f.b8_c1_ph = ph0; S.f.b8_c1_key = k0; return {checks:checks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('tth'); S = newStateTTH('Fresh'); S.picksDue = []; save(); startChapter(1);
  out.f = {area:S.area, ch:S.chapter, lvl0:S.lvl, squad:S.squad.join(','), con0:b8Contract(), renderErr:renderAll(), title:CHAPTERS[1].title, nodes:nodes.length, areas:CHAPTERS[1].areas.length, fights:Object.keys(CHAPTERS[1].battles).length,
    shelf:BOOKS.tth.coming, items:Object.keys(CHAPTERS[1].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role) && !!ART['item/b8_hoodcharm'],
    itemN:Object.keys(CHAPTERS[1].gear).length, knife:ITEMS.b8_c1_guildknife && ITEMS.b8_c1_guildknife.slot === 'weapon' && ITEMS.b8_c1_guildknife.role === 'blade' && ITEMS.b8_c1_guildknife.atk > 0, boots:ITEMS.b8_c1_roofboots && ITEMS.b8_c1_roofboots.slot === 'trinket' && ITEMS.b8_c1_roofboots.mv === 1,
    figs:['vasso', 'b8_c1_veteran', 'b8_c1_orsa', 'b8_c1_benlo'].every(k => typeof FIGX[k] === 'function'), sign:typeof b81Sign === 'function',
    scenes:['b8_daru_night', 'b8_gadrobi', 'b8_door', 'b8_c1_tavern', 'b8_c1_den', 'b8_c1_roofs', 'b8_c1_house'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.tth[1] || []).includes('b8_c1_fire'), audit:audit()};
  /* the start: the table, the reading, the roof */
  talk('b8_c1_start'); out.f.ph = S.f.b8_c1_ph; out.f.deck = has('b8_c1_start', /Sit with Tuft/); out.f.stay = has('b8_c1_start', /street/);
  out.f.roofText = /not the wind/.test(DLG.b8_c1_start().txt);
  talk('b8_c1_read'); const rd = DLG.b8_c1_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b8_c1_drawn, reader:S.f.b8_c1_reader, card:S.card, inPool:B8POOL[1].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B8READ[1].back, cardNode:cardNodeName(), cardSp:DLG.b8_c1_card().sp, cardBack:DLG.b8_c1_card().ch[0].go};
  /* the fire before the alley */
  talk('b8_c1_fire'); const f1 = DLG.b8_c1_fire(); out.fire1 = {html:/The Contract/.test(f1.html || ''), talk:has('b8_c1_fire', /Talk with the squad/), alley:has('b8_c1_fire', /alley/), rest:has('b8_c1_fire', /rest/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t)};
  out.fire1.lines = DLG.b8_c1_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  talk('b8_c1_lampboy'); out.f.lampboy = S.f.b8_c1_lampboy && has('b8_c1_lampboy', /Not now/);
  out.f.lanesShut = !has('b8_c1_to_lanes', /Into the lanes/); out.f.phoenix = /Phoenix/.test(DLG.b8_c1_phoenix().txt) && !has('b8_c1_phoenix', /in/i) === false;
  /* the alley: the "yes, but", and the fight (two grounds, the engine's +1) */
  talk('b8_c1_listen'); take('b8_c1_listen', /Out the back/);
  out.a = {straight:has('b8_c1_alley_start', /Straight down/), sneak:has('b8_c1_alley_start', /neighbour/), notNow:has('b8_c1_alley_start', /Not now/)};
  const sa = JSON.stringify(S); near('b8_c1_alley_start', /neighbour/, 'tuft'); out.a.near = ((S.bruised || {}).tuft || 0) > 0; S = JSON.parse(sa); save(); setBook('tth'); startExplore('b8_c1_street');
  const c0 = b8Contract(); out.a.fight = await force('b8_c1_alley'); out.a.con = b8Contract() - c0; out.a.knife = S.kit.includes('b8_c1_guildknife'); out.a.done = S.f.b8_c1_alleyDone; out.a.ph = S.f.b8_c1_ph;
  /* the roofs: the trick, the boots, the way down */
  take('b8_c1_alley_after', /Look about/); out.roof = {area:S.area};
  talk('b8_c1_line'); const lc = vis('b8_c1_line').find(c => c.trick); out.t = {dc:lc && lc.check[1], stat:lc && lc.check[0], notNow:has('b8_c1_line', /Not now/), lore:/Daru District/.test(DLG.b8_c1_line().txt)};
  made('b8_c1_line', /Learn the lines/, 'tuft');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b8_c1_roofline && S.tricks.b8_c1_roofline.who, ok:S.f.b8_c1_lineOk, free:!!AB.t_b8_c1_roofline.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b8_c1_roofline.fx), again:!has('b8_c1_line', /Learn/)});
  talk('b8_c1_boots'); out.roof.boots = S.kit.includes('b8_c1_roofboots'); talk('b8_c1_boots'); out.roof.bootsOnce = S.kit.filter(k => k === 'b8_c1_roofboots').length === 1;
  out.roof.downNot = has('b8_c1_roofs_down', /Not now/);
  take('b8_c1_roofs_down', /Down, and in/); const pp = DLG.b8_c1_paper(); out.p = {area:S.area, read:S.f.b8_c1_paperRead, five:/five short strokes/.test(pp.txt), html:/The Contract/.test(pp.html || ''), noClient:/No client/.test(pp.txt), noVell:!has('b8_c1_paper', /Vell/)};
  /* the trick's battle half, in a fight (the trick-bearer swaps with a squadmate, free) */
  startBattle('b8_c1_den', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'tuft'), m = B.units.find(x => x.side === 'p' && x !== u && !x.ally); out.t.offered = trickOk(u, AB.t_b8_c1_roofline); out.t.tiles = AB.t_b8_c1_roofline.tiles(u).length;
    const ux = u.x, uy = u.y, mx = m.x, my = m.y; AB.t_b8_c1_roofline.run(u, mx, my); out.t.swapped = u.x === mx && u.y === my && m.x === ux && m.y === uy; }
  B = null; view = 'scene'; S.scene = 'talk';
  /* the fire after the paper: a rest, then morning */
  talk('b8_c1_fire'); out.fire2 = {rest:has('b8_c1_fire', /rest/), sleep:has('b8_c1_fire', /Sleep/)};
  S.wounds = {brisk:4}; take('b8_c1_fire', /Let the squad rest/); out.fire2.rested = !S.wounds && S.f.b8_c1_rest2 === 1;
  take('b8_c1_fire', /Sleep/); out.fire2.ph = S.f.b8_c1_ph; talk('b8_c1_fire'); out.fire2.keyShut = !has('b8_c1_fire', /Decide/);
  /* phase 3: the lanes, the tavern (the sign, Bredd, the historian, the charm), Benlo, Orsa's */
  take('b8_c1_to_lanes', /Into the lanes/); out.l = {area:S.area, seen:S.f.b8_c1_lanesSeen};
  talk('b8_c1_tavern'); out.l.sign = S.f.b8_c1_sign === 1 && /Rumjugs and Sweetlard/.test(DLG.b8_c1_tavern().txt) && /crate lid/.test(DLG.b8_c1_tavern().txt);
  take('b8_c1_tavern', /old soldier/); out.l.vet = S.f.b8_c1_vetMet; take('b8_c1_vet', /Seven Cities lot/); out.l.bredd = S.f.b8_c1_bredd === 1 && /shovel/.test(DLG.b8_c1_bredd().txt) && /Never met him/.test(DLG.b8_c1_bredd().txt);
  take('b8_c1_bredd', /Drink/); take('b8_c1_vet', /knows things/); out.l.hist = S.f.b8_c1_historian === 1 && /K'rul's/.test(DLG.b8_c1_historian().txt) && /wrote it down/.test(DLG.b8_c1_historian().txt);
  take('b8_c1_historian', /Back/); take('b8_c1_vet', /Guild came over/); out.l.guild = S.f.b8_c1_vetGuild === 1 && /Orsa/.test(DLG.b8_c1_vet_guild().txt);
  take('b8_c1_vet_guild', /Back/); take('b8_c1_vet', /charm/); out.l.charmNot = has('b8_c1_charm', /Not now/);
  const sc = JSON.stringify(S); near('b8_c1_charm', /Trade him a story/, 'brisk'); out.l.charmNear = !!(S.rattled || {}).brisk; S = JSON.parse(sc); save(); setBook('tth'); startExplore('b8_c1_gadrobi');
  made('b8_c1_charm', /Trade him a story/, 'brisk'); out.l.charm = S.kit.includes('b8_hoodcharm') && S.f.b8_c1_charm === 'story';
  const s0 = S.silver, sh0 = S.inv.sharper; talk('b8_c1_benlo'); take('b8_c1_benlo', /^A sharper/); out.l.benlo = {silver:s0 - S.silver, sharper:S.inv.sharper - sh0};
  const sb = JSON.stringify(S); near('b8_c1_benlo', /Talk the price down/, 'kettle'); out.l.benloNear = !!(S.rattled || {}).kettle; S = JSON.parse(sb); save(); setBook('tth'); startExplore('b8_c1_gadrobi');
  made('b8_c1_benlo', /Talk the price down/, 'kettle'); out.l.cheap = S.f.b8_c1_cheap === 1 && /3 silver/.test(vis('b8_c1_benlo').find(c => /^A sharper/.test(c.t)).tag);
  talk('b8_c1_dyer'); out.l.dyer = /Vidikas/.test(DLG.b8_c1_dyer().txt);
  /* Orsa's den: the brawl (optional), its "yes, but", and the fight */
  talk('b8_c1_den_door'); take('b8_c1_den_door', /Down the steps/); out.d = {orsaAskShut:!has('b8_c1_den', /Who brokers/)};
  take('b8_c1_den', /Play a round/); out.d.kettle = /Kettle cheats at bones/.test(DLG.b8_c1_den_play().txt); out.d.notNow = has('b8_c1_den_play', /Not now/);
  const sd = JSON.stringify(S); near('b8_c1_den_play', /Sit down, friend/, 'ohl'); out.d.near = !!(S.rattled || {}).ohl; S = JSON.parse(sd); save(); setBook('tth'); startExplore('b8_c1_gadrobi');
  take('b8_c1_den_play', /outside/); out.d.fight = await force('b8_c1_den'); out.d.done = S.f.b8_c1_denDone;
  /* the key at the fire */
  startExplore('b8_c1_street'); talk('b8_c1_fire'); out.k = {open:has('b8_c1_fire', /Decide/)}; take('b8_c1_fire', /Decide/);
  const kn = DLG.b8_c1_key(); out.k = Object.assign(out.k, {hunt:has('b8_c1_key', /Hunt/), quiet:has('b8_c1_key', /Quiet/), notYet:has('b8_c1_key', /Not yet/), html:/The Contract/.test(kn.html || '')});
  const snapK = JSON.stringify(S), conK = b8Contract();
  /* ================= key: hunt ================= */
  take('b8_c1_key', /Hunt/); out.h = {key:S.f.b8_c1_key, ph:S.f.b8_c1_ph, con:b8Contract() - conK};
  out.h.daruShut = !has('b8_c1_to_daru', /go-between/); talk('b8_c1_den'); out.h.ask = has('b8_c1_den', /Who brokers/); take('b8_c1_den', /Who brokers/);
  const oc = vis('b8_c1_orsa_ask').find(c => c.check); out.h.contractCheck = !!oc.contract; out.h.edge = (edgesFor(oc, 'vell').find(e => /paper/.test(e[0])) || [])[1] || 0; out.h.tier = b8ConTier();
  const so = JSON.stringify(S), cn = b8Contract(); near('b8_c1_orsa_ask', /Ask her quietly/, 'tuft'); out.h.nearCon = b8Contract() - cn; S.f.b8_c1_orsaTried = 0; near('b8_c1_orsa_ask', /Ask her quietly/, 'tuft'); out.h.nearOnce = b8Contract() - cn;
  S = JSON.parse(so); save(); setBook('tth'); startExplore('b8_c1_gadrobi');
  made('b8_c1_orsa_ask', /Ask her quietly/, 'tuft'); out.h.named = S.f.b8_c1_named && S.f.b8_c1_quietName;
  out.h.daruOpen = has('b8_c1_to_daru', /go-between/) && has('b8_c1_to_daru', /Not now/); take('b8_c1_to_daru', /go-between/); out.h.area = S.area;
  out.h.startNot = has('b8_c1_hunt_start', /Not now/); out.h.closedShut = !has('b8_c1_closed', /shoulder/);
  const ch0 = b8Contract(); out.h.fight = await force('b8_c1_hunt'); out.h.huntCon = b8Contract() - ch0; out.h.done = S.f.b8_c1_huntDone;
  talk('b8_c1_closed'); out.h.closedNot = has('b8_c1_closed', /Not now/); take('b8_c1_closed', /shoulder/); const cb = DLG.b8_c1_closed_broke().txt;
  out.h.closed = S.f.b8_c1_closed; out.h.noPayer = /No name/.test(cb) && !/paid by/i.test(cb);
  take('b8_c1_closed_broke', /Home/); out.h.ph5 = S.f.b8_c1_ph; take('b8_c1_home', /step/); out.h.street = S.area; out.h.vNpc = AREAS.b8_c1_street.npcs.find(n => n.id === 'vasso').show();
  talk('b8_c1_fire'); out.h.endShut = !has('b8_c1_fire', /Winter's end/);
  /* Vasso: the paper's words; wait, then join; or join at once */
  out.v = {words:/The paper said Malazans\. The Guild doesn't ask which/.test(DLG.b8_c1_vasso().txt), notNow:has('b8_c1_vasso', /Not now/)};
  take('b8_c1_vasso', /Who paid/); out.v.who = /No one on the roofs knows who paid/.test(DLG.b8_c1_vasso_who().txt); take('b8_c1_vasso_who', /Why/);
  const sv = JSON.stringify(S);
  take('b8_c1_vasso_why', /Wait at the door/); out.v.wait = {flag:S.f.b8_vassoDone, roster:ROSTER_BOOKS.tth.wait('vasso'), npc:AREAS.b8_c1_street.npcs.find(n => n.id === 'vasso').show()};
  talk('b8_c1_vasso'); take('b8_c1_vasso', /Come in/); clearModal(); out.v.wait.joined = b8In('vasso') && S.f.b8_vassoDone === 1;
  S = JSON.parse(sv); save(); setBook('tth'); startExplore('b8_c1_street');
  take('b8_c1_vasso_why', /Then come in/); clearModal(); out.v.join = {in:b8In('vasso'), flag:S.f.b8_vassoDone, fire:/Vasso/.test(DLG.b8_c1_fire_talk().txt), lvl:S.lvl, god:PATRONS.vasso && PATRONS.vasso.god};
  out.v.lines = DLG.b8_c1_fire_talk().txt.split('\n\n').length; out.v.here = S.squad.filter(id => id !== 'sgt').length;
  /* the end on hunt */
  talk('b8_c1_fire'); out.e = {onward:has('b8_c1_fire', /Winter's end/)}; take('b8_c1_fire', /Winter's end/);
  out.e.notYet = has('b8_c1_onward', /Not yet/); out.e.vassoLine = /Vasso/.test(DLG.b8_c1_onward().txt);
  const conH = b8Contract(); take('b8_c1_onward', /East/); await wait(60);
  out.e = Object.assign(out.e, {view, ch:S.chapters[1], lvl:S.lvl, xp:S.xp, con:conH, extras:CHAPTERS[1].extras().length, journal:CHAPTERS[1].journal().length, endText:(CHEND[1] || {}).hunt && CHEND[1].hunt[0]});
  /* ================= key: quiet, from the same moment ================= */
  S = JSON.parse(snapK); save(); setBook('tth'); S.chapter = 1; startExplore('b8_c1_street');
  take('b8_c1_key', /Quiet/); out.q = {key:S.f.b8_c1_key, ph:S.f.b8_c1_ph, con:b8Contract() - conK, burned:/paper goes in the fire/.test(DLG.b8_c1_quiet().txt), html:/The Contract/.test(DLG.b8_c1_quiet().html || '')};
  out.q.npc = AREAS.b8_c1_street.npcs.find(n => n.id === 'chancers').show(); out.q.noVasso = !AREAS.b8_c1_street.npcs.find(n => n.id === 'vasso').show(); out.q.daruShut = !has('b8_c1_to_daru', /go-between/);
  talk('b8_c1_fire'); out.q.endShut = !has('b8_c1_fire', /Winter's end/); out.q.notNow = has('b8_c1_chancers_start', /Not now/);
  const sq = JSON.stringify(S); near('b8_c1_chancers_start', /Go home/, 'brisk'); out.q.near = ((S.bruised || {}).brisk || 0) > 0; S = JSON.parse(sq); save(); setBook('tth'); startExplore('b8_c1_street');
  const cq = b8Contract(); out.q.fight = await force('b8_c1_chancers'); out.q.fightCon = b8Contract() - cq; out.q.done = S.f.b8_c1_chancersDone; out.q.ph2 = S.f.b8_c1_ph;
  talk('b8_c1_fire'); out.q.onward = has('b8_c1_fire', /Winter's end/); take('b8_c1_fire', /Winter's end/); const conQ = b8Contract(); take('b8_c1_onward', /East/); await wait(60);
  out.q.end = {view, ch:S.chapters[1], con:conQ, vasso:S.f.b8_vassoDone == null};
  /* ================= a --from=1 style save: a transfer's Fourth (Tuft dead; Vell and Ellis walking) ================= */
  setBook('tth'); S = newStateTTH('Syn'); S.squad = ['sgt', 'brisk', 'kettle', 'ohl', 'vell', 'ellis']; S.dead.tuft = {ch:7, where:'Coral', from:'moi'}; S.imported = {from:'Syn', book:'moi', road:'daru', lvl:15, mates:['brisk', 'kettle', 'ohl', 'vell', 'ellis'], lifted:true};
  ['vell', 'ellis'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(1);
  out.y = {renderErr:renderAll(), reader:visReader().id, lines:DLG.b8_c1_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, vell:/Vell/.test(DLG.b8_c1_fire_talk().txt), ellis:/Ellis/.test(DLG.b8_c1_fire_talk().txt),
    phoenix:/other ideas/.test(DLG.b8_c1_phoenix().txt), oldNews:/old news/.test(DLG.b8_c1_paper().txt)};
  S.f.b8_c1_ph = 3; out.y.lines3 = DLG.b8_c1_fire_talk().txt.split('\n\n').length; S.f.b8_c1_ph = 2;
  talk('b8_c1_paper'); out.y.vellChoice = has('b8_c1_paper', /Vell\. What does it say/); out.y.vellMark = /It is his mark/.test(DLG.b8_c1_paper().txt);
  take('b8_c1_paper', /Vell\. What/); const l0 = S.loy.vell; take('b8_c1_vell', /cut it out/); out.y.vell = {flag:S.f.b8_c1_vell, loy:S.loy.vell - l0, gone:!has('b8_c1_paper', /Vell\. What/)};
  out.y.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, f1 = r.fire1 || {}, a = r.a || {}, ro = r.roof || {}, t = r.t || {}, p = r.p || {}, f2 = r.fire2 || {}, l = r.l || {}, d = r.d || {}, k = r.k || {}, h = r.h || {}, v = r.v || {}, e = r.e || {}, q = r.q || {}, y = r.y || {};
if (f.area) {
  f.area === 'b8_c1_street' && f.ch === 1 && f.lvl0 === 16 && f.squad === 'sgt,brisk,kettle,tuft,ohl' && f.con0 === 3 && !f.renderErr.length && f.title === 'Before the Fete' && f.shelf === false && f.areas === 4 && f.fights === 4 && f.items && f.itemN === 2 && f.knife && f.boots && f.figs && f.sign && f.scenes && f.fireRoster
    ? ok(`a fresh start opens Chapter One at the Fourth's street at level 16, the Contract at 3; every b8_c1 node renders, no never-name, no "!" in narration (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); two new items with art and the charm; Vasso, the old soldier, Orsa, Benlo, the sign, seven backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 1200));
  const au = f.audit || {}; au.checks >= 8 && !au.noNear.length && au.onwards >= 8 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.stay && f.roofText && f.lampboy && f.lanesShut ? ok('the start: the table, the reading offered, something on the roof that is not the wind; the lamplighter\'s boy; the lanes shut at night') : no('start ' + JSON.stringify(f).slice(0, 400));
}
rd.drawn === 1 && rd.reader === 'tuft' && rd.inPool && rd.notNow && rd.back === 'b8_c1_fire' && rd.cardNode === 'b8_c1_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b8_c1_fire' ? ok(`the reading at the table: Tuft draws (${rd.card}); the card node is the visions pass's hook (b8_c1_card); back to b8_c1_fire`) : no('reading ' + JSON.stringify(rd));
f1.html && f1.talk && f1.alley && !f1.rest && f1.notNow && f1.lines === f1.here ? ok(`the fire before the alley: the Contract shown, the talk (a line each, ${f1.lines}), the way to the alley, Not now`) : no('fire1 ' + JSON.stringify(f1));
a.straight && a.sneak && a.notNow && a.near && a.fight && a.fight.started && a.fight.guild && a.fight.dark && a.fight.stage2 && a.fight.inStage2 && a.fight.style2 === 'roof' && a.fight.after === 'b8_c1_alley_after' && a.con === 1 && a.knife && a.done === 1 && a.ph === 2
  ? ok(`the first knife: the alley (${a.fight.foes} foes, guild:true) and the roofs; a "yes, but" on the neighbour's yard; the engine's Contract +1; the Guild knife`) : no('alley ' + JSON.stringify(a));
t.dc === 17 && t.stat === 'wits' && t.notNow && t.lore && t.who === 'tuft' && t.ok === 1 && t.free && t.words && t.again && t.offered && t.tiles >= 1 && t.swapped ? ok('the trick: The Roof-Line, a ✦ wits 17 check that names the Daru roofs; free (its words end on the one-free-trick line); in a fight it swaps the bearer with a squadmate') : no('trick ' + JSON.stringify(t));
ro.area === 'b8_c1_roofs' && ro.boots && ro.bootsOnce && ro.downNot && p.area === 'b8_c1_street' && p.read && p.five && p.html && p.noClient && p.noVell ? ok('the roofs and the paper: the roof-boots (once); the paper with five strokes, no client, the Contract shown') : no('roofs/paper ' + JSON.stringify([ro, p]));
f2.rest && f2.sleep && f2.rested && f2.ph === 3 && f2.keyShut ? ok('the fire after the paper: a rest (wounds close), then morning; the key waits on the lanes') : no('fire2 ' + JSON.stringify(f2));
l.area === 'b8_c1_gadrobi' && l.seen && l.sign && l.vet === 1 && l.bredd && l.hist && l.guild && l.charmNot && l.charmNear && l.charm && l.benlo.silver === 5 && l.benlo.sharper === 1 && l.benloNear && l.cheap && l.dyer
  ? ok('the lanes: the painted sign (Rumjugs and Sweetlard; Kettle\'s crate lid), the old soldier from the Seven Cities lot, Bredd and the shovel, the old historian at K\'rul\'s, the charm for a story; Benlo\'s Moranth at a buyer\'s price; the Council\'s young men as gossip') : no('lanes ' + JSON.stringify(l));
d.orsaAskShut && d.kettle && d.notNow && d.near && d.fight && d.fight.started && d.fight.after === 'b8_c1_den_after' && d.done === 1 ? ok(`Orsa's den: Kettle's dice, a "yes, but" on talking him down, the brawl (${d.fight.foes} bravos)`) : no('den ' + JSON.stringify(d));
k.open && k.hunt && k.quiet && k.notYet && k.html ? ok('the key at the fire: hunt, quiet, Not yet, the Contract shown') : no('key ' + JSON.stringify(k));
h.key === 'hunt' && h.ph === 4 && h.con === 2 && h.daruShut && h.ask && h.contractCheck && h.edge === -1 && h.tier === 'watched' && h.nearCon === 1 && h.nearOnce === 1 && h.named && h.daruOpen && h.area === 'b8_c1_house' && h.startNot && h.closedShut && h.fight && h.fight.stage2 && h.fight.inStage2 && h.fight.after === 'b8_c1_hunt_after' && !h.fight.guild && h.huntCon === 0 && h.done === 1 && h.closedNot && h.closed === 'broke' && h.noPayer && h.ph5 === 5 && h.street === 'b8_c1_street' && h.vNpc && h.endShut
  ? ok('key hunt: the Contract +2; Orsa\'s go-between check is contract:true ("The Guild\'s paper" −1 at 6), its "yes, but" +1 once; the go-between\'s courtyard and stair; a shut door and ash, never who paid; home to a young man on the step') : no('hunt ' + JSON.stringify(h).slice(0, 1200));
v.words && v.notNow && v.who && v.wait && v.wait.flag === 2 && v.wait.roster && v.wait.npc && v.wait.joined && v.join && v.join.in && v.join.flag === 1 && v.join.fire && v.join.god === 'K\'rul' && v.lines === v.here
  ? ok('Vasso: "The paper said Malazans. The Guild doesn\'t ask which."; nobody on the roofs knows who paid; he waits at the door, then joins; or joins at once, with his line at the fire') : no('vasso ' + JSON.stringify(v));
e.onward && e.notYet && e.vassoLine && e.view === 'end' && e.ch === 'hunt' && e.lvl >= 17 && e.con === 6 && e.extras >= 6 && e.journal >= 8 && e.endText === 'Names asked' ? ok(`the end on hunt: east at winter's end (Not yet offered); level ${e.lvl} (${e.xp} xp), the Contract at ${e.con}`) : no('end ' + JSON.stringify(e));
q.key === 'quiet' && q.ph === 4 && q.con === -2 && q.burned && q.html && q.npc && q.noVasso && q.daruShut && q.endShut && q.notNow && q.near && q.fight && q.fight.started && !q.fight.guild && q.fightCon === 0 && q.done === 1 && q.ph2 === 5 && q.onward && q.end && q.end.view === 'end' && q.end.ch === 'quiet' && q.end.con === 2 && q.end.vasso
  ? ok(`key quiet, from the same moment: the Contract −2; the paper burned; chancers at the door (a "yes, but" on facing them down; not the Guild); no Vasso; the end on quiet with the Contract at ${q.end.con}`) : no('quiet ' + JSON.stringify(q));
y.renderErr && !y.renderErr.length && y.reader !== 'tuft' && y.lines === y.here && y.lines3 === y.here && y.vell && y.ellis && y.phoenix && y.oldNews && y.vellChoice && y.vellMark && y.vell.flag === 'cut' && y.vell.loy === 2 && y.vell.gone && !y.audit.noNear.length && !y.audit.noStay.length
  ? ok(`a --from=1 style save (Tuft dead; Vell and Ellis walking): every node renders, ${y.reader} reads, a line each at the fire in both halves (${y.lines}), the Phoenix had other ideas, five strokes of old news, Vell's mark cut out of the cord`) : no('synthetic ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b8ch1: FAIL (${bad.length})` : 'b8ch1: all ok'); process.exit(bad.length ? 1 : 0);
