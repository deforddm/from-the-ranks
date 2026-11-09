// Book Eight, Chapter 3 (Black Coral, src/143_b8_ch3.js): the halts, both keys from the same moment at the barrow, the reading on the
// stone sill (Tuft; and the card node the visions pass hooks onto), the fire (the Contract shown, a rest, a line each, the roster, Not now),
// the engine's −1 to the Contract at the chapter's start (and nothing else here moves it), every fight's start and a forced win (both
// grounds of the road), the trick behind a hard check (the Kurald Galain shroud: taught, free, its battle half sets a full ward), the items
// (each with art), the recruit (Edrem: waits, then joins; or joins at once; "Seerdomin" once), the callbacks (the wreck in the bay, never
// named; the Shield Anvil's Weight, the bearer's scene or the sergeant's; Tuft's cold that turns warm; the kelyk), Ch 2's flags read with
// defaults, "Not now" on every onward step and a "yes, but" on every check, from a fresh start and from a --from=3 style save (Vasso
// walking; then a transfer's Fourth with Tuft dead, Dannet carrying the Shield Anvil's Weight).
// Usage: node tools/b8ch3_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const src3 = fs.readFileSync(path.join(here, '..', 'src', '143_b8_ch3.js'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const seerdomin = (src3.match(/Seerdomin/g) || []).length;
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
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tth'); S.chapter = 3; startExplore(area); };
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark; res.guild = !!B.def.guild;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b8_c3_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Moon's Spawn|Spawns|Seba|Krute|Picker|Mallet|Bluepearl|Spindle|Monkrat|Spinnock|Endest|Salind|Gradithan|High Priestess|Nimander|Rake|Mother Dark|Itkovian|Whiskeyjack|Kellanved|Dancer|Laseen|Burn's Sleep|\b11\d\d\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), onwards = new Set();
    const ph0 = S.f.b8_c3_ph, k0 = S.f.b8_c3_key, rd0 = S.f.b8_c3_roadDone;
    [1, 2, 3, 4].forEach(ph => ['kneel', 'stand', null].forEach(k => [0, 1].forEach(rd => { S.f.b8_c3_ph = ph; S.f.b8_c3_key = k; S.f.b8_c3_roadDone = rd;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f.b8_c3_ph = ph0; S.f.b8_c3_key = k0; S.f.b8_c3_roadDone = rd0; return {checks:checks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start, straight into Chapter Three ================= */
  setBook('tth'); S = newStateTTH('Fresh'); S.picksDue = []; save(); const con0 = b8Contract(); startChapter(3);
  out.f = {area:S.area, ch:S.chapter, con0, con:b8Contract(), away:S.f.b8_away3, squad:S.squad.join(','), renderErr:renderAll(), title:CHAPTERS[3].title, nodes:nodes.length, areas:CHAPTERS[3].areas.length, fights:Object.keys(CHAPTERS[3].battles).length,
    items:Object.keys(CHAPTERS[3].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role) && Object.keys(CHAPTERS[3].gear).every(k => ART['item/' + k] !== ART['item/b8_c1_guildknife'] && ART['item/' + k] !== ART['item/b8_hoodcharm'] && ART['item/' + k] !== ART['item/b8_kelykjug']),
    itemN:Object.keys(CHAPTERS[3].gear).length, knife:ITEMS.b8_c3_coralknife.slot === 'weapon' && ITEMS.b8_c3_coralknife.role === 'blade' && ITEMS.b8_c3_coralknife.atk > 0, token:ITEMS.b8_c3_pilgrimtoken.slot === 'trinket' && ITEMS.b8_c3_pilgrimtoken.stat.wits === 1, lamp:ITEMS.b8_c3_lamp.slot === 'trinket' && ITEMS.b8_c3_lamp.ac === 1,
    figs:['edrem', 'b8_c3_thessaly', 'b8_c3_priestess'].every(k => typeof FIGX[k] === 'function') && /filed/.test(String(FIGX.edrem)), tile:typeof TILEX.b8_c3_mound === 'function' && /b83MoundTile/.test(String(TILEX.b8_c3_mound)),
    scenes:['b8_blackcoral', 'b8_barrow', 'b8_c3_lodging', 'b8_c3_harbour', 'b8_c3_tavern'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]) && /b83/.test(String(SCENEX.b8_blackcoral)) && /b83/.test(String(SCENEX.b8_barrow)),
    fireRoster:(ROSTER_FIRES.tth[3] || []).includes('b8_c3_fire'), read3:!!B8READ[3] && B8READ[3].back === 'b8_c3_fire', audit:audit()};
  /* the start: the lodging, the sill, the reading */
  talk('b8_c3_start'); out.f.ph = S.f.b8_c3_ph; out.f.deck = has('b8_c3_start', /Sit with Tuft/); out.f.stay = has('b8_c3_start', /street/);
  talk('b8_c3_read'); const rd = DLG.b8_c3_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b8_c3_drawn, reader:S.f.b8_c3_reader, inPool:B8POOL[3].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), cardNode:cardNodeName(), cardSp:DLG.b8_c3_card().sp, cardBack:DLG.b8_c3_card().ch[0].go, sill:/stone sill/.test(DLG.b8_c3_card().txt)};
  /* the fire */
  talk('b8_c3_fire'); const f1 = DLG.b8_c3_fire(); out.fire1 = {html:/The Contract/.test(f1.html || ''), talk:has('b8_c3_fire', /Talk with the squad/), rest:has('b8_c3_fire', /rest/), onward:has('b8_c3_fire', /camp wants/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t)};
  out.fire1.lines = DLG.b8_c3_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  /* Thessaly: her ledger (the "yes, but"), the barrow, the lamp */
  talk('b8_c3_thessaly'); out.t = {seen:S.f.b8_c3_thessaly, notNow:has('b8_c3_thessaly', /Not now/), andii:/sworn to the Andii/.test(DLG.b8_c3_thessaly().txt)};
  const s1 = JSON.stringify(S); near('b8_c3_thessaly', /No names/, 'tuft'); out.t.near = !!(S.rattled || {}).tuft; restore(s1, 'b8_c3_city');
  made('b8_c3_thessaly', /No names/, 'tuft'); out.t.kept = S.f.b8_c3_ledger;
  take('b8_c3_thessaly_kept', /barrow/); out.t.edrem = /Edrem/.test(DLG.b8_c3_thessaly_ask().txt) && /wore the grey once/.test(DLG.b8_c3_thessaly_ask().txt); out.t.kelyk = /sweet/.test(DLG.b8_c3_thessaly_ask().txt);
  take('b8_c3_thessaly_ask', /lamp/); out.t.lamp = S.kit.includes('b8_c3_lamp'); talk('b8_c3_thessaly_ask'); take('b8_c3_thessaly_ask', /lamp/); out.t.lampOnce = S.kit.filter(k => k === 'b8_c3_lamp').length === 1;
  /* Calder: Ch 2 read with a default (pass, so the merchant's kelyk was passed) and on 'fields' (burned) */
  talk('b8_c3_calder'); out.c = {passWagon:S.f.b8_c3_wagon === 1, passText:/tarp/.test(DLG.b8_c3_calder().txt)};
  { const sv = S.f.b8_c2_kelyk; S.f.b8_c2_kelyk = 'burned'; out.c.burned = /light/.test(DLG.b8_c3_calder().txt) && !/tarp/.test(DLG.b8_c3_calder().txt); if (sv == null) delete S.f.b8_c2_kelyk; else S.f.b8_c2_kelyk = sv; }
  /* the beggar (kelyk), the harbour (the wreck, callback 7), the tavern, the upper streets */
  talk('b8_c3_beggar'); out.k = {beggar:/Kelyk/.test(DLG.b8_c3_beggar().txt) && S.f.b8_c3_beggar === 1};
  talk('b8_c3_harbour'); take('b8_c3_harbour', /Look at it/); const wk = DLG.b8_c3_wreck().txt; out.w = {flag:S.f.b8_c3_wreck, tuft:/Tuft knows it/.test(wk), pale:/over Pale/.test(wk), dead:/with the dead in it/.test(wk)};
  talk('b8_c3_tavern_door'); out.w.tavernNot = has('b8_c3_tavern_door', /Not now/); take('b8_c3_tavern_door', /In, for a cup/); const tv = DLG.b8_c3_tavern().txt; out.w.tavern = S.f.b8_c3_tavern === 1 && /tall Andii/.test(tv) && /grey cloak/.test(tv) && /leaves that corner alone/.test(tv);
  out.w.upper = !vis('b8_c3_upper').some(c => c.onward);
  /* the gate: the trick (the Kurald Galain shroud), Tuft's cold that turns warm, the road */
  talk('b8_c3_gate'); const gt = DLG.b8_c3_gate(); const gc = vis('b8_c3_gate').find(c => c.trick);
  out.s = {dc:gc && gc.check[1], stat:gc && gc.check[0], trick:gc && gc.trick, notNow:has('b8_c3_gate', /Not now/), road:has('b8_c3_gate', /pilgrims' road/), lore:/terrace in Darujhistan/.test(gt.txt), warm:/And under it, not/.test(gt.txt) && !/Mother|Gate of/.test(gt.txt),
    edge:(gc.edges('tuft') || []).filter(Boolean).map(e => e[1])[0]};
  const s2 = JSON.stringify(S); near('b8_c3_gate', /Fold a piece/, 'kettle'); out.s.near = !!(S.rattled || {}).kettle; restore(s2, 'b8_c3_city');
  made('b8_c3_gate', /Fold a piece/, 'tuft'); out.s.who = S.tricks && S.tricks.b8_shroud && S.tricks.b8_shroud.who; out.s.ok = S.f.b8_c3_shroudOk; out.s.again = !has('b8_c3_gate', /Fold a piece/);
  out.s.free = !!AB.t_b8_shroud.free && /It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b8_shroud.fx);
  /* the road */
  const conR = b8Contract(); take('b8_c3_gate', /pilgrims' road/); out.rd = {area:S.area, ph:S.f.b8_c3_ph, arrive:S.node === 'b8_c3_road_arrive' || S.f.b8_c3_roadSeen === 1};
  out.rd.raidersHidden = !AREAS.b8_c3_road.npcs.find(n => n.id === 'raiders').show(); out.rd.onShut = !has('b8_c3_road_on', /On to the barrow/);
  talk('b8_c3_edrem'); out.rd.edremNot = has('b8_c3_edrem', /Not now/); out.rd.filed = /filed off/.test(DLG.b8_c3_edrem().txt);
  take('b8_c3_edrem', /Who are you/); const ew = DLG.b8_c3_edrem_who().txt; out.rd.grey = /I wore the grey once/.test(ew) && (ew.match(/Seerdomin/g) || []).length === 1;
  take('b8_c3_edrem_who', /stand with you/); out.rd.startNot = has('b8_c3_road_start', /Not now/); out.rd.raidersShown = AREAS.b8_c3_road.npcs.find(n => n.id === 'raiders').show();
  const s3 = JSON.stringify(S); near('b8_c3_road_start', /Round through/, 'tuft'); out.rd.near = ((S.bruised || {}).tuft || 0) > 0; restore(s3, 'b8_c3_road');
  out.rd.fight = await force('b8_c3_road'); out.rd.con = b8Contract() - conR; out.rd.knife = S.kit.includes('b8_c3_coralknife'); out.rd.done = S.f.b8_c3_roadDone;
  out.rd.edremAfter = has('b8_c3_road_after', /To Edrem/) && has('b8_c3_road_after', /Not now/);
  /* Edrem: waits, then joins; or joins at once */
  talk('b8_c3_edrem'); out.e = {after:S.node === 'b8_c3_edrem' && /They'll be back/.test(DLG.b8_c3_edrem().txt), notNow:has('b8_c3_edrem_after', /Not now/)};
  const s4 = JSON.stringify(S);
  take('b8_c3_edrem_after', /Keep your road/); out.e.wait = {flag:S.f.b8_edremDone, roster:ROSTER_BOOKS.tth.wait('edrem'), npc:AREAS.b8_c3_road.npcs.find(n => n.id === 'edrem').show()};
  talk('b8_c3_edrem'); take('b8_c3_edrem', /Walk with us/); clearModal(); out.e.wait.joined = b8In('edrem') && S.f.b8_edremDone === 1;
  restore(s4, 'b8_c3_road');
  take('b8_c3_edrem_after', /Walk with us/); clearModal(); out.e.join = {in:b8In('edrem'), flag:S.f.b8_edremDone, fire:/Edrem/.test(DLG.b8_c3_fire_talk().txt), npcGone:!AREAS.b8_c3_road.npcs.find(n => n.id === 'edrem').show(), god:!PATRONS.edrem};
  out.e.lines = DLG.b8_c3_fire_talk().txt.split('\n\n').length; out.e.here = S.squad.filter(id => id !== 'sgt').length;
  /* the pilgrims' token, the well, the ridge (optional fight) */
  talk('b8_c3_pilgrims'); out.p = {token:S.kit.includes('b8_c3_pilgrimtoken'), kelyk:/Kelyk/.test(DLG.b8_c3_pilgrims().txt)}; talk('b8_c3_pilgrims'); out.p.once = S.kit.filter(k => k === 'b8_c3_pilgrimtoken').length === 1;
  out.p.well = /sweet smell/.test(DLG.b8_c3_well().txt);
  talk('b8_c3_ridge_view'); out.p.ridgeNot = has('b8_c3_ridge_view', /Not now/); take('b8_c3_ridge_view', /Up the path/); out.p.ridgeStartNot = has('b8_c3_ridge_start', /Not now/);
  const s5 = JSON.stringify(S); near('b8_c3_ridge_start', /Along the ridge/, 'edrem'); out.p.ridgeNear = ((S.bruised || {}).edrem || 0) > 0; restore(s5, 'b8_c3_road');
  const le0 = S.loy.edrem; out.p.ridge = await force('b8_c3_ridge'); out.p.ridgeDone = S.f.b8_c3_ridgeDone; out.p.ridgeLoy = S.loy.edrem - le0;
  /* on to the barrow */
  out.rd.onOpen = has('b8_c3_road_on', /On to the barrow/) && has('b8_c3_road_on', /Not now/); take('b8_c3_road_on', /On to the barrow/);
  out.b = {area:S.area, ph:S.f.b8_c3_ph, seen:S.f.b8_c3_barrowSeen, gifts:/gifts/.test(DLG.b8_c3_barrow_arrive().txt), ohl:/needle/.test(DLG.b8_c3_barrow_arrive().txt), edrem:/Edrem/.test(DLG.b8_c3_barrow_arrive().txt)};
  out.b.backShut = /not done what you came out to do/.test(DLG.b8_c3_camp_back().txt);
  /* the Shield Anvil's Weight: nobody carries it on a fresh start, so the sergeant remembers */
  out.b.anvilNode = /hand laid on a hand/.test(DLG.b8_c3_barrow_go().txt); talk('b8_c3_barrow_go'); const an = DLG.b8_c3_anvil();
  if (an.fx) an.fx(); out.b.anvil = S.f.b8_c3_anvil; out.b.anvilNot = has('b8_c3_anvil', /Not now/);
  { const sv = JSON.stringify(S.tricks || {}); S.tricks = Object.assign({}, S.tricks, {b3_c7_anvil:{who:'ohl', ch:7, left:null}}); out.b.ohlScene = b83Bearer() === 'ohl' && /Ohl goes up to the foot of it/.test(DLG.b8_c3_anvil().txt); S.tricks = JSON.parse(sv); }
  /* the sellers (optional): their "yes, but", the passed wagon's chalk, the fight */
  talk('b8_c3_sellers_view'); out.sl = {chalk:/Calder's tally-mark/.test(DLG.b8_c3_sellers_view().txt), notNow:has('b8_c3_sellers_view', /Not now/), kelyk:/Kelyk/.test(DLG.b8_c3_sellers_view().txt)};
  const s6 = JSON.stringify(S); near('b8_c3_sellers_view', /Tell the pilgrims/, 'ohl'); out.sl.near = !!(S.rattled || {}).ohl; restore(s6, 'b8_c3_barrow');
  take('b8_c3_sellers_view', /Kick the jars/); out.sl.rowNot = has('b8_c3_sellers_row', /Not now/); out.sl.fight = await force('b8_c3_sellers'); out.sl.done = S.f.b8_c3_sellersDone;
  talk('b8_c3_guards'); talk('b8_c3_priestess'); out.sl.priestess = /does not give|doesn't give/.test(DLG.b8_c3_priestess().txt) || /He takes the weight/.test(DLG.b8_c3_priestess().txt);
  /* the key at the barrow */
  talk('b8_c3_key'); const kn = DLG.b8_c3_key(); out.k3 = {kneel:has('b8_c3_key', /Kneel/), stand:has('b8_c3_key', /Stand witness/), notYet:has('b8_c3_key', /Not yet/), html:/The Contract/.test(kn.html || ''), edrem:/Edrem stands at the edge/.test(kn.txt)};
  const snapK = JSON.stringify(S), conK = b8Contract();
  /* ================= key: kneel ================= */
  const le1 = S.loy.edrem; take('b8_c3_key', /Kneel/); out.kn = {notYet:has('b8_c3_kneel', /Not yet/)}; take('b8_c3_kneel', /stone off the road/);
  const ka = DLG.b8_c3_kneel_after(); out.kn = Object.assign(out.kn, {key:S.f.b8_c3_key, gift:S.f.b8_c3_gift, loy:S.loy.edrem - le1, con:b8Contract() - conK, noBoon:/Nothing comes back/.test(ka.txt) && /He does not give/.test(ka.txt)});
  out.kn.backOpen = has('b8_c3_camp_back', /Back to the city/) && has('b8_c3_camp_back', /Not now/); take('b8_c3_camp_back', /Back to the city/); out.kn.area = S.area; out.kn.ph = S.f.b8_c3_ph; out.kn.ret = S.node === 'b8_c3_return';
  talk('b8_c3_fire'); out.kn.rest = has('b8_c3_fire', /rest/); S.wounds = {brisk:4}; take('b8_c3_fire', /Let the squad rest/); out.kn.rested = !S.wounds && S.f.b8_c3_rest4 === 1;
  out.kn.fire = has('b8_c3_fire', /camp wants/); take('b8_c3_fire', /camp wants/); out.kn.notYet = has('b8_c3_onward', /Not yet/); out.kn.edremLine = /Edrem/.test(DLG.b8_c3_onward().txt);
  const conE = b8Contract(); take('b8_c3_onward', /camp's edge/); await wait(60);
  out.kn.end = {view, ch:S.chapters[3], con:conE, extras:CHAPTERS[3].extras().length, journal:CHAPTERS[3].journal().length, endText:(CHEND[3] || {}).kneel && CHEND[3].kneel[0]};
  /* ================= key: stand, from the same moment ================= */
  restore(snapK, 'b8_c3_barrow');
  const lb = S.loy.brisk; take('b8_c3_key', /Stand witness/); out.st = {key:S.f.b8_c3_key, guards:S.f.b8_c3_guards, loy:S.loy.brisk - lb, con:b8Contract() - conK, text:/guards notice/i.test(DLG.b8_c3_stand().txt)};
  out.st.guardsWarm = /make room at it/.test(DLG.b8_c3_guards().txt); take('b8_c3_camp_back', /Back to the city/); out.st.onwardAsk = /came to the lodging herself/.test(DLG.b8_c3_onward().txt);
  take('b8_c3_fire', /camp wants/); const conS = b8Contract(); take('b8_c3_onward', /camp's edge/); await wait(60); out.st.end = {view, ch:S.chapters[3], con:conS};
  /* ================= a --from=3 style save (Vasso walking, the Contract at 4 before the chapter), and a key never chosen ================= */
  setBook('tth'); S = newStateTTH('Syn'); S.f.b8_c1_key = 'hunt'; S.chapters = {1:'hunt', 2:'fields'}; S.f.b8_c2_key = 'fields'; S.lvl = 17; S.xp = LEVELS[16]; S.b8 = {con:4, hi:4, lo:3};
  S.f.b8_vassoDone = 1; S.squad.push('vasso'); ['vasso'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; migrate(S); save(); startChapter(3);
  out.y = {con:b8Contract(), renderErr:renderAll(), lines:DLG.b8_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, vasso:/Vasso/.test(DLG.b8_c3_fire_talk().txt), vassoStart:/Vasso/.test(DLG.b8_c3_start().txt),
    burned:!S.f.b8_c3_wagon && /light/.test(DLG.b8_c3_calder().txt), audit:audit()};
  /* ================= a transfer's Fourth: Tuft dead, Dannet carrying the Shield Anvil's Weight, Sohra reading ================= */
  setBook('tth'); S = newStateTTH('Imp'); S.squad = ['sgt', 'brisk', 'kettle', 'ohl', 'sohra', 'greysword']; S.dead.tuft = {ch:7, where:'Coral', from:'moi'}; S.imported = {from:'Imp', book:'moi', road:'daru', lvl:15, mates:['brisk', 'kettle', 'ohl', 'sohra', 'greysword'], lifted:true};
  ['sohra', 'greysword'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.tricks = {b3_c7_anvil:{who:'greysword', ch:7, left:null}}; S.picksDue = []; save(); startChapter(3);
  out.z = {renderErr:renderAll(), reader:visReader().id, lines:DLG.b8_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sohra:/Sohra/.test(DLG.b8_c3_fire_talk().txt), dannet:/Dannet/.test(DLG.b8_c3_fire_talk().txt)};
  talk('b8_c3_wreck'); out.z.wreck = S.f.b8_c3_wreck; out.z.wreckText = /You know it/.test(DLG.b8_c3_wreck().txt);
  const an2 = DLG.b8_c3_anvil(); an2.fx(); out.z.anvil = S.f.b8_c3_anvil; out.z.anvilText = /Dannet goes up to the foot of it alone/.test(an2.txt) && /Capustan/.test(an2.txt);
  out.z.gateNoTuft = !/Tuft puts her hand/.test(DLG.b8_c3_gate().txt); out.z.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, f1 = r.fire1 || {}, t = r.t || {}, c = r.c || {}, k = r.k || {}, w = r.w || {}, s = r.s || {}, ro = r.rd || {}, e = r.e || {}, p = r.p || {}, b = r.b || {}, sl = r.sl || {}, k3 = r.k3 || {}, kn = r.kn || {}, st = r.st || {}, y = r.y || {}, z = r.z || {};
if (f.area) {
  f.area === 'b8_c3_city' && f.ch === 3 && f.con0 === 3 && f.con === 2 && f.away === 1 && f.squad === 'sgt,brisk,kettle,tuft,ohl' && !f.renderErr.length && f.title === 'Black Coral' && f.nodes >= 60 && f.nodes <= 80 && f.areas === 3 && f.fights === 3 && f.items && f.itemN === 3 && f.knife && f.token && f.lamp && f.figs && f.tile && f.scenes && f.fireRoster && f.read3
    ? ok(`a fresh start opens Chapter Three in the harbour street; the engine cools the Contract 3 → 2 (weeks out of the city); every b8_c3 node renders, no never-name, no "!" in narration (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three new items with their own art; Edrem, Thessaly, a priestess, the barrow's ground and five backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 6 && !au.noNear.length && au.onwards >= 6 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.stay ? ok('the start: the lodging over the chandler\'s, the stone sill, the reading offered') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'tuft' && rd.inPool && rd.notNow && rd.cardNode === 'b8_c3_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b8_c3_fire' && rd.sill ? ok('the reading on a stone sill under the lamps: Tuft draws from the Knight\'s pool; the card node is the visions pass\'s hook (b8_c3_card); back to b8_c3_fire') : no('reading ' + JSON.stringify(rd));
f1.html && f1.talk && !f1.rest && !f1.onward && f1.notNow && f1.lines === f1.here ? ok(`the fire on arrival: the Contract shown, the talk (a line each, ${f1.lines}), no rest yet, no way on yet, Not now`) : no('fire1 ' + JSON.stringify(f1));
t.seen && t.notNow && t.andii && t.near && t.kept === 'kept' && t.edrem && t.kelyk && t.lamp && t.lampOnce ? ok('Thessaly: sworn to the Andii; a "yes, but" on keeping names out of her ledger; the barrow, the kelyk in the rows, Edrem who "wore the grey once"; an Andii lamp, once') : no('thessaly ' + JSON.stringify(t));
c.passWagon && c.passText && c.burned ? ok('Calder reads Chapter Two with a default: the merchant\'s tarped wagon goes off to the camp (passed), or a light purse (the fields burned)') : no('calder ' + JSON.stringify(c));
k.beggar && w.flag === 'tuft' && w.tuft && w.pale && w.dead && w.tavernNot && w.tavern && w.upper ? ok('the city: a pilgrim begging for the cup (kelyk); the wreck in the bay, Tuft knows it, never named (callback 7); the tavern another night, the board in the corner left alone; the upper streets not for the Fourth') : no('city ' + JSON.stringify([k, w]));
s.dc === 17 && s.stat === 'wits' && s.trick === 'b8_shroud' && s.notNow && s.road && s.lore && s.warm && s.edge === 3 && s.near && s.who === 'tuft' && s.ok === 1 && s.again && s.free
  ? ok('the trick: the Kurald Galain shroud, a ✦ wits 17 check at the landward gate that names Simtal\'s terrace and Tuft\'s Meanas (+3); its "yes, but"; free; Tuft\'s cold that turns warm, never named') : no('shroud ' + JSON.stringify(s));
ro.area === 'b8_c3_road' && ro.ph === 2 && ro.arrive && ro.raidersHidden && ro.onShut && ro.edremNot && ro.filed && ro.grey && ro.startNot && ro.raidersShown && ro.near && ro.fight && ro.fight.started && ro.fight.stage2 && ro.fight.inStage2 && !ro.fight.guild && ro.fight.after === 'b8_c3_road_after' && ro.con === 0 && ro.knife && ro.done === 1 && ro.edremAfter
  ? ok(`the pilgrims' road: Edrem at the cart ("I wore the grey once", "Seerdomin" once); a "yes, but" in the stubble; the raiders (${ro.fight.foes}) and the cart's second ground; not the Guild (the Contract unmoved); the Black Coral knife`) : no('road ' + JSON.stringify(ro).slice(0, 900));
e.after && e.notNow && e.wait && e.wait.flag === 2 && e.wait.roster && e.wait.npc && e.wait.joined && e.join && e.join.in && e.join.flag === 1 && e.join.fire && e.join.npcGone && e.lines === e.here
  ? ok('Edrem: waits on his road, then joins; or joins at once, with his line at the fire') : no('edrem ' + JSON.stringify(e));
p.token && p.kelyk && p.once && p.well && p.ridgeNot && p.ridgeStartNot && p.ridgeNear && p.ridge && p.ridge.started && p.ridge.after === 'b8_c3_ridge_after' && p.ridgeDone === 1 && p.ridgeLoy === 1
  ? ok('the pilgrims\' token (once), the kelyk on the road and down the dry well; the raiders\' camp on the ridge (optional, its "yes, but"; Edrem +1)') : no('pilgrims/ridge ' + JSON.stringify(p));
ro.onOpen && b.area === 'b8_c3_barrow' && b.ph === 3 && b.seen && b.gifts && b.ohl && b.edrem && b.backShut && b.anvilNode && b.anvil === 'sgt' && b.anvilNot && b.ohlScene
  ? ok('the Great Barrow: heaped with gifts, Ohl\'s needle, Edrem facing it; the Shield Anvil\'s Weight remembered by the sergeant on a fresh start, or the bearer\'s own scene (Ohl)') : no('barrow ' + JSON.stringify(b));
sl.chalk && sl.notNow && sl.kelyk && sl.near && sl.rowNot && sl.fight && sl.fight.started && sl.fight.after === 'b8_c3_sellers_after' && sl.done === 1 && sl.priestess
  ? ok(`the kelyk-sellers at the camp's edge: Calder's chalk on the jars (passed), a "yes, but" on talking them down, the fight (${sl.fight.foes}); a priestess: he takes the weight, he does not give`) : no('sellers ' + JSON.stringify(sl));
k3.kneel && k3.stand && k3.notYet && k3.html && k3.edrem ? ok('the key at the barrow: kneel, stand witness, Not yet, the Contract shown, Edrem at the edge') : no('key ' + JSON.stringify(k3));
kn.notYet && kn.key === 'kneel' && kn.gift && kn.loy === 1 && kn.con === 0 && kn.noBoon && kn.backOpen && kn.area === 'b8_c3_city' && kn.ph === 4 && kn.ret && kn.rest && kn.rested && kn.fire && kn.notYet && kn.edremLine && kn.end && kn.end.view === 'end' && kn.end.ch === 'kneel' && kn.end.con === 2 && kn.end.extras >= 6 && kn.end.journal >= 8 && kn.end.endText === 'The weight laid down'
  ? ok(`key kneel: ${kn.gift}; peace, never a boon; Edrem +1; back to the lodging; a rest; on to the camp; the end with the Contract at ${kn.end.con}`) : no('kneel ' + JSON.stringify(kn));
st.key === 'stand' && st.guards === 1 && st.loy === 1 && st.con === 0 && st.text && st.guardsWarm && st.onwardAsk && st.end && st.end.view === 'end' && st.end.ch === 'stand' ? ok('key stand, from the same moment: the camp\'s guards trust the Fourth (S.f.b8_c3_guards), Brisk +1; the guards\' captain asks at the lodging; the end on stand') : no('stand ' + JSON.stringify(st));
y.con === 3 && !y.renderErr.length && y.lines === y.here && y.vasso && y.vassoStart && y.burned && !y.audit.noNear.length && !y.audit.noStay.length ? ok(`a --from=3 style save (Vasso walking, the fields burned in Ch 2): the Contract 4 → 3; every node renders; a line each at the fire (${y.lines}), Vasso's included`) : no('from3 ' + JSON.stringify(y).slice(0, 900));
!(z.renderErr || [1]).length && z.reader === 'sohra' && z.lines === z.here && z.sohra && z.dannet && z.wreck === 'sgt' && z.wreckText && z.anvil === 'greysword' && z.anvilText && z.gateNoTuft && !z.audit.noNear.length && !z.audit.noStay.length
  ? ok('a transfer\'s Fourth (Tuft dead, Sohra and Dannet walking): Sohra reads; the sergeant knows the wreck; Dannet carries the Shield Anvil\'s Weight up to the barrow (Capustan)') : no('transfer ' + JSON.stringify(z).slice(0, 900));
seerdomin === 1 ? ok('"Seerdomin" appears once in the chapter\'s text (Edrem\'s own words)') : no(`"Seerdomin" appears ${seerdomin} times in the chapter's text`);
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b8ch3: FAIL (${bad.length})` : 'b8ch3: all ok'); process.exit(bad.length ? 1 : 0);
