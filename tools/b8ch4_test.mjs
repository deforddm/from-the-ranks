// Book Eight, Chapter 4 (The Pilgrims' Camp, src/144_b8_ch4.js): the halts, both keys from the same moment at the fire, the reading on a
// pilgrim's mat (and the card node the visions pass hooks onto), the fire (the Contract shown, a rest, a line each, the roster, Not now),
// every fight's start and a forced win (the water line, the end tent, both grounds of the far edge and of the store-yard), the trick behind
// a hard check (taught; not free, a group heal that uses the action and leaves no ward), the items (each with art), the Contract (the
// engine's −1 at the chapter's start, and nothing else), Edrem waiting at his road and joining, what the chapter reads from Ch 2 and Ch 3
// with defaults (the extra wave on 'passed', the Daru seal; 'stand' +2 on the hold check), the hard limits (no never-names, no hut, no
// named canon camp people), "Not now" on every onward step and a "yes, but" on every check, from a fresh start and from a --from=4 style
// save (Tuft dead, Sohra walking, Vasso walking, Edrem waiting; Ch 2 'fields', Ch 3 'kneel').
// Usage: node tools/b8ch4_test.mjs   (build first; exit 1 on a failure)
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
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tth'); startExplore(area); };
  /* a forced win, through the engine's own endBeat; a fight with a second ground goes through stageBreak */
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark; res.guild = !!B.def.guild;
    res.surprise = B.surprise || (B.surpriseRound ? 'p' : null); res.obj = B.def.objective && B.def.objective.rounds; res.waves = (B.def.waves || []).length;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.title2 = B && B.def.title; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b8_c4_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Seba|Krute|Picker|Mallet|Bluepearl|Antsy|Blend\b|Murillio|Duiker|Kruppe|Kellanved|Dancer|Laseen|Burn's Sleep|\b11\d\d\b|Salind|Gradithan|Spindle|Monkrat|Silanah|Seerdomin|Benighted|Spinnock|Endest|Nimander|Itkovian|Dying God's body|Bastion|\bhut\b|dragon/i;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but"; every onward step has a "Not now" (or "Not yet") beside it; under every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), onwards = new Set();
    const keep = {ph:S.f.b8_c4_ph, k:S.f.b8_c4_key, h:S.f.b8_c4_held, b:S.f.b8_c4_burned, w:S.f.b8_c4_waterDone};
    [1, 2, 3, 4].forEach(ph => ['hold', 'burn', null].forEach(k => [0, 1].forEach(done => { S.f.b8_c4_ph = ph; S.f.b8_c4_key = k; S.f.b8_c4_held = done && k === 'hold' ? 1 : 0; S.f.b8_c4_burned = done && k === 'burn' ? 1 : 0; S.f.b8_c4_waterDone = done;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f.b8_c4_ph = keep.ph; S.f.b8_c4_key = keep.k; S.f.b8_c4_held = keep.h; S.f.b8_c4_burned = keep.b; S.f.b8_c4_waterDone = keep.w;
    return {checks:checks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  const lines = () => DLG.b8_c4_fire_talk().txt.split('\n\n').length, here = () => S.squad.filter(id => id !== 'sgt' && b8In(id)).length;
  try {
  /* ================= a fresh start, brought to Chapter Four (earlier keys unset: the defaults) ================= */
  setBook('tth'); S = newStateTTH('Fresh'); S.lvl = 17; S.xp = LEVELS[16]; S.chapters = {}; S.f.b8_edremDone = 2; S.camp = ['edrem']; S.loy.edrem = 0; S.gear.edrem = {}; S.picks.edrem = [];
  S.picksDue = []; save(); const con0 = b8Contract(); startChapter(4); S.picksDue = [];
  out.f = {area:S.area, ch:S.chapter, con:b8Contract() - con0, away:S.f.b8_away4, renderErr:renderAll(), title:CHAPTERS[4].title, nodes:nodes.length, areas:CHAPTERS[4].areas.length, fights:Object.keys(CHAPTERS[4].battles).length,
    items:Object.keys(CHAPTERS[4].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && ART['item/' + k] !== ART['item/b7_c4_bluelance'] && ART['item/' + k] !== ART['item/b7_c4_bluescale'] && ART['item/' + k] !== ART['item/b7_c4_musterbadge']),
    itemN:Object.keys(CHAPTERS[4].gear).length, hook:ITEMS.b8_c4_camphook.slot === 'weapon' && ITEMS.b8_c4_camphook.role === 'reach' && ITEMS.b8_c4_camphook.atk > 0, scale:ITEMS.b8_c4_greyscale.slot === 'armour' && ITEMS.b8_c4_greyscale.role === 'mail' && ITEMS.b8_c4_greyscale.ac > 0,
    rag:ITEMS.b8_c4_ashrag.slot === 'trinket' && ITEMS.b8_c4_ashrag.hp > 0, noNumbers:Object.values(CHAPTERS[4].gear).every(it => !/\d/.test(it.line)),
    figs:['b8_c4_mossa', 'b8_c4_hurrin', 'b8_c4_carrier'].every(k => typeof FIGX[k] === 'function'), tile:typeof TILEX.b8_c4_camp === 'function',
    scenes:['b8_camp_night', 'b8_c4_rows', 'b8_c4_yard', 'b8_c4_tent'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), ownCamp:SCENEX.b8_camp_night.toString().includes('b84'),
    fireRoster:(ROSTER_FIRES.tth[4] || []).includes('b8_c4_fire'), audit:audit()};
  /* the start, and the reading on a pilgrim's mat */
  talk('b8_c4_start'); out.f.ph = S.f.b8_c4_ph; out.f.deck = has('b8_c4_start', /Sit with Tuft/); out.f.walk = has('b8_c4_start', /Walk the edge/);
  talk('b8_c4_read'); const rd = DLG.b8_c4_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b8_c4_drawn, reader:S.f.b8_c4_reader, card:S.card, inPool:B8POOL[4].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B8READ[4].back, mat:/pilgrim's mat/.test(B8READ[4].where), cardNode:cardNodeName(), cardSp:DLG.b8_c4_card().sp, cardBack:DLG.b8_c4_card().ch[0].go, says:['tuft', 'sohra', 'benna'].every(k => !!B8READ[4].say[k])};
  /* the fire before the water line */
  talk('b8_c4_fire'); const f1 = DLG.b8_c4_fire(); out.fire1 = {html:/The Contract/.test(f1.html || ''), talk:has('b8_c4_fire', /Talk with the squad/), sleep:has('b8_c4_fire', /Sleep/), rest:has('b8_c4_fire', /rest/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t), lines:lines(), here:here()};
  out.fire1.rowsShut = !has('b8_c4_to_rows', /Into the rows/); out.fire1.yardShut = !has('b8_c4_to_yard', /fence/);
  /* Mossa: the camp, the guards (the hook), the Redeemer (never a boon), the prayer, the jug */
  gain('b8_kelykjug'); talk('b8_c4_mossa'); out.m = {met:S.f.b8_c4_mossaMet, smell:/carrying it/.test(DLG.b8_c4_mossa().txt), kneelShut:!has('b8_c4_mossa', /Kneel/)};
  take('b8_c4_mossa', /happening/); out.m.camp = /children are kept apart/.test(DLG.b8_c4_mossa_camp().txt); take('b8_c4_mossa_camp', /Back/);
  take('b8_c4_mossa', /guards/); out.m.hook = S.kit.includes('b8_c4_camphook'); out.m.stopped = /stopped coming/.test(DLG.b8_c4_mossa_guards().txt); take('b8_c4_mossa_guards', /Back/);
  take('b8_c4_mossa', /help/); const gt = DLG.b8_c4_mossa_god().txt; out.m.never = /never once done what anybody asked/.test(gt) && /Sometimes he speaks/.test(gt);
  const silver0 = S.silver, inj0 = JSON.stringify(S.injury || {}), boons0 = JSON.stringify(S.boons || {});
  take('b8_c4_mossa_god', /Kneel/); out.m.knelt = S.f.b8_c4_knelt === 1 && /Nothing is given/.test(DLG.b8_c4_kneel().txt) && S.silver === silver0 && JSON.stringify(S.boons || {}) === boons0 && JSON.stringify(S.injury || {}) === inj0;
  take('b8_c4_mossa', /jug/); take('b8_c4_jug', /Pour/); out.m.poured = S.f.b8_c4_jug === 'poured' && !S.kit.includes('b8_kelykjug');
  /* Edrem at his road: waiting from Ch 3, he joins */
  startExplore('b8_c4_edge'); const en = AREAS.b8_c4_edge.npcs.find(n => n.id === 'edrem'); out.e = {show:en.show(), notNow:has('b8_c4_edrem', /Not now/)};
  talk('b8_c4_edrem'); take('b8_c4_edrem', /walk with us/i); clearModal(); out.e.in = b8In('edrem') && S.f.b8_edremDone === 1; out.e.gone = !en.show(); out.e.once = (DLG.b8_c4_edrem_join().txt.match(/Seerdomin/g) || []).length === 0;
  /* the water line: the "yes, but" on talking them off, then the fight */
  talk('b8_c4_water'); out.w = {start:S.node === 'b8_c4_water' || S.node === 'b8_c4_water_start', go:has('b8_c4_water_start', /Off the barrels/), notNow:has('b8_c4_water_start', /Not now/)};
  const sw = JSON.stringify(S); near('b8_c4_water_start', /Talk them away/, 'edrem'); out.w.near = !!(S.rattled || {}).edrem; restore(sw, 'b8_c4_edge');
  out.w.fight = await force('b8_c4_water'); out.w.done = S.f.b8_c4_waterDone === 1 && S.f.b8_c4_waterFought === 1;
  /* the carriers' song: the trick (✦ wits 17), the ash-rag */
  take('b8_c4_water_after', /Help the carriers/); const sg = DLG.b8_c4_song(); const tc = vis('b8_c4_song').find(c => c.trick);
  out.t = {rag:S.kit.includes('b8_c4_ashrag'), seen:S.f.b8_c4_songSeen, dc:tc && tc.check[1], stat:tc && tc.check[0], lore:/Rhivi/.test(sg.txt) && /isn't a prayer/.test(sg.txt), notNow:has('b8_c4_song', /Not now/), edgeEdrem:(edgesFor(tc, 'edrem').find(e => /road/.test(e[0])) || [])[1]};
  const st = JSON.stringify(S); near('b8_c4_song', /Learn the song/, 'ohl'); out.t.near = !!(S.rattled || {}).ohl; restore(st, 'b8_c4_edge');
  made('b8_c4_song', /Learn the song/, 'edrem');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b8_c4_hymn && S.tricks.b8_c4_hymn.who, ok:S.f.b8_c4_hymnOk, notFree:!AB.t_b8_c4_hymn.free && !TRICKS.b8_c4_hymn.free, words:/uses the action/.test(TRICKS.b8_c4_hymn.fx) && !/one free trick/.test(TRICKS.b8_c4_hymn.fx), again:!has('b8_c4_song', /Learn/), passive:!V103_PASSIVE.includes('b8_c4_hymn')});
  /* its battle half: a group heal, the action spent, no ward */
  startBattle('b8_c4_drunk', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'edrem'), mates = B.units.filter(x => x.side === 'p' && !x.ally && cheb(x, u) <= 4); mates.forEach(p => { p.hp = Math.max(1, p.maxhp - 12); p.ward = 0; });
    const hp0 = mates.map(p => p.hp); out.t.offered = trickOk(u, AB.t_b8_c4_hymn); AB.t_b8_c4_hymn.run(u);
    out.t.healed = mates.every((p, i) => p.hp > hp0[i]); out.t.noWard = mates.every(p => !p.ward); out.t.n = mates.length; }
  B = null; view = 'scene'; S.scene = 'talk';
  /* the carrier, the fire's rest, and sleep */
  startExplore('b8_c4_edge'); talk('b8_c4_carrier'); out.c = {carrier:S.f.b8_c4_carrier};
  talk('b8_c4_fire'); out.fire2 = {sleep:has('b8_c4_fire', /Sleep/), rest:has('b8_c4_fire', /rest/)};
  S.wounds = {brisk:4}; S.injury = {kettle:'kelyk'}; take('b8_c4_fire', /Let the squad rest/); out.fire2.rested = !S.wounds && !(S.injury || {}).kettle && S.f.b8_c4_rest1 === 1;
  take('b8_c4_fire', /Sleep/); out.fire2.ph = S.f.b8_c4_ph; take('b8_c4_sleep', /Up/); talk('b8_c4_fire'); out.fire2.keyShut = !has('b8_c4_fire', /dark comes on/);
  out.fire2.lines2 = lines(); out.fire2.here2 = here(); out.fire2.edremLine = /Edrem/.test(DLG.b8_c4_fire_talk().txt);
  /* phase 2: the rows (Hurrin and the grey scale, the rope, the barrow), the end tent */
  take('b8_c4_to_rows', /Into the rows/); out.rw = {area:S.area, seen:S.f.b8_c4_rowsSeen, edremNamed:/Edrem/.test(DLG.b8_c4_rows_arrive().txt)};
  talk('b8_c4_hurrin'); out.rw.met = S.f.b8_c4_hurrinMet; out.rw.scaleShut = !has('b8_c4_hurrin', /bundle/);
  take('b8_c4_hurrin', /Where are you from/); take('b8_c4_hurrin_north', /Back/); take('b8_c4_hurrin', /sweet stuff/); take('b8_c4_hurrin_drink', /Back/);
  take('b8_c4_hurrin', /flaps tied/); out.rw.kids = /behind a rope/.test(DLG.b8_c4_hurrin_kids().txt); take('b8_c4_hurrin_kids', /Back/);
  take('b8_c4_hurrin', /bundle/); const l0 = S.loy.edrem; take('b8_c4_hurrin_scale', /wear it/); out.rw.scale = S.kit.includes('b8_c4_greyscale') && S.f.b8_c4_scale === 1 && S.loy.edrem - l0 === 1;
  talk('b8_c4_rope'); out.rw.rope = S.f.b8_c4_ropeSeen === 1 && vis('b8_c4_rope').length === 1 && /Back/.test(vis('b8_c4_rope')[0].t);
  talk('b8_c4_barrow_look'); out.rw.barrow = /Not tonight/.test(DLG.b8_c4_barrow_look().txt);
  out.rw.backNot = has('b8_c4_rows_back', /Not now/);
  const dn = AREAS.b8_c4_rows.npcs.find(n => n.id === 'drinkers'); out.d = {show:dn.show(), notNow:has('b8_c4_tentend', /Not now/)};
  const sd = JSON.stringify(S); near('b8_c4_tentend', /Talk past/, 'brisk'); out.d.near = ((S.bruised || {}).brisk || 0) > 0; restore(sd, 'b8_c4_rows');
  out.d.fight = await force('b8_c4_drunk'); out.d.done = S.f.b8_c4_drunkDone === 1 && !dn.show();
  /* the store-yard, its jugs (the Daru seal: Ch 2's default 'pass'), the keepers */
  startExplore('b8_c4_edge'); take('b8_c4_to_yard', /fence/); out.y = {area:S.area, seen:S.f.b8_c4_yardSeen};
  talk('b8_c4_jars'); out.y.seal = S.f.b8_c4_sealSeen === 1 && /Daru merchant's mark/.test(DLG.b8_c4_jars().txt); talk('b8_c4_keepers'); out.y.keepers = S.f.b8_c4_keepers === 1 && vis('b8_c4_keepers').every(c => !c.go || typeof c.go !== 'function' || !/startBattle/.test(String(c.go)));
  /* the key, from the fire */
  startExplore('b8_c4_edge'); talk('b8_c4_fire'); out.k = {open:has('b8_c4_fire', /dark comes on/)}; take('b8_c4_fire', /dark comes on/);
  out.k.dusk = has('b8_c4_dusk', /Decide/) && has('b8_c4_dusk', /Not yet/) && /The Contract/.test(DLG.b8_c4_dusk().html || ''); take('b8_c4_dusk', /Decide/);
  const kn = DLG.b8_c4_key(); out.k = Object.assign(out.k, {hold:has('b8_c4_key', /Hold\.$/), burn:has('b8_c4_key', /Burn\.$/), notYet:has('b8_c4_key', /Not yet/), html:/The Contract/.test(kn.html || ''), edrem:/Edrem/.test(kn.txt)});
  const snapK = JSON.stringify(S), conK = b8Contract();
  /* ================= key: hold ================= */
  take('b8_c4_key', /Hold\.$/); out.h = {key:S.f.b8_c4_key, ph:S.f.b8_c4_ph, con:b8Contract() - conK};
  talk('b8_c4_fire'); out.h.way = has('b8_c4_fire', /set it/); out.h.rowsShut = !has('b8_c4_to_rows', /Into the rows/);
  take('b8_c4_hold_go', /set it/); const hc = vis('b8_c4_hold').find(c => c.check); out.h.notNow = has('b8_c4_hold', /Not now/);
  out.h.stand = (edgesFor(hc, 'kettle').find(e => /trust the squad/.test(e[0])) || [])[1]; S.f.b8_c3_key = 'kneel'; out.h.kneel = !edgesFor(hc, 'kettle').some(e => /trust the squad/.test(e[0])); delete S.f.b8_c3_key;
  out.h.waves = BATTLES.b8_c4_edge.waves.length; S.f.b8_c2_kelyk = 'burned'; out.h.wavesBurned = BATTLES.b8_c4_edge.waves.length; delete S.f.b8_c2_kelyk;
  out.h.lastWave = /Daru merchant's seal/.test(BATTLES.b8_c4_edge.waves[3].text);
  const sh = JSON.stringify(S); near('b8_c4_hold', /Set the edge/, 'brisk'); out.h.near = ((S.bruised || {}).brisk || 0) > 0; restore(sh, 'b8_c4_edge');
  made('b8_c4_hold', /Set the edge/, 'edrem'); out.h.set = S.f.b8_c4_edgeSet === 1;
  const ch0 = b8Contract(); vis('b8_c4_hold_set'); out.h.fight = await force('b8_c4_edge', {surprise:'p'}); out.h.fightCon = b8Contract() - ch0; out.h.held = S.f.b8_c4_held === 1;
  talk('b8_c4_fire'); out.h.bells = has('b8_c4_fire', /Wait for the bells/); take('b8_c4_fire', /Wait for the bells/); out.h.ph4 = S.f.b8_c4_ph;
  take('b8_c4_morning', /Up/); talk('b8_c4_mossa_end'); out.h.mossaEnd = S.f.b8_c4_mossaEnd === 1 && /It'll come again/.test(DLG.b8_c4_mossa_end().txt);
  talk('b8_c4_hurrin_end'); out.h.hurrinEnd = S.f.b8_c4_hurrinEnd === 1 && /Someone will bring those children out/.test(DLG.b8_c4_hurrin_end().txt);
  talk('b8_c4_road'); out.h.road = has('b8_c4_road', /wagons/) && has('b8_c4_road', /Not now/);
  talk('b8_c4_fire'); out.h.onward = has('b8_c4_fire', /wagons west/); take('b8_c4_fire', /wagons west/); out.h.notYet = has('b8_c4_onward', /Not yet/);
  const conH = b8Contract(); take('b8_c4_onward', /West/); await wait(60);
  out.h.end = {view, ch:S.chapters[4], con:conH, lvl:S.lvl, xp:S.xp, extras:CHAPTERS[4].extras().length, journal:CHAPTERS[4].journal().length, endText:(CHEND[4] || {}).hold && CHEND[4].hold[0]};
  /* ================= key: burn, from the same moment ================= */
  S = JSON.parse(snapK); save(); setBook('tth'); S.chapter = 4; startExplore('b8_c4_edge');
  take('b8_c4_key', /Burn\.$/); out.b = {key:S.f.b8_c4_key, ph:S.f.b8_c4_ph, con:b8Contract() - conK, guards:/guards from the barrow road/.test(DLG.b8_c4_burn_go().txt)};
  talk('b8_c4_fire'); out.b.way = has('b8_c4_fire', /store-yard/); take('b8_c4_burn_go', /North/); out.b.notNow = has('b8_c4_burn', /Not now/);
  take('b8_c4_burn', /Into the yard/); out.b.area = S.area; out.b.startNot = has('b8_c4_stores_start', /Not now/);
  const kp = AREAS.b8_c4_yard.npcs.find(n => n.id === 'keepers'); out.b.npc = kp.show() && kp.node() === 'b8_c4_stores_start';
  const cb = b8Contract(); out.b.fight = await force('b8_c4_stores'); out.b.fightCon = b8Contract() - cb; out.b.done = S.f.b8_c4_storesDone === 1 && !kp.show();
  out.b.priest = BATTLES.b8_c4_stores.foes.some(f => f[0] === 'b8_kelykpriest');
  const sbn = JSON.stringify(S); near('b8_c4_stores_after', /Burn it so/, 'kettle'); out.b.near = ((S.bruised || {}).kettle || 0) > 0; restore(sbn, 'b8_c4_yard');
  out.b.jarsAgain = has('b8_c4_jars', /Burn it/); made('b8_c4_stores_after', /Burn it so/, 'kettle'); out.b.burned = S.f.b8_c4_burned === 1;
  take('b8_c4_burn_ok', /Back/); out.b.cost = S.f.b8_c4_edgeCost; out.b.ash = /black/.test(DLG.b8_c4_jars().txt);
  talk('b8_c4_fire'); take('b8_c4_fire', /Wait for the bells/); take('b8_c4_morning', /Up/); talk('b8_c4_fire'); take('b8_c4_fire', /wagons west/);
  const conB = b8Contract(); take('b8_c4_onward', /West/); await wait(60);
  out.b.end = {view, ch:S.chapters[4], con:conB, endText:(CHEND[4] || {}).burn && CHEND[4].burn[0]};
  /* ================= a --from=4 style save: Tuft dead, Sohra and Vasso walking, Edrem waiting; Ch 2 'fields', Ch 3 'kneel' ================= */
  setBook('tth'); S = newStateTTH('Syn'); S.lvl = 17; S.xp = LEVELS[16]; S.squad = ['sgt', 'brisk', 'kettle', 'ohl', 'sohra', 'vasso']; S.dead.tuft = {ch:7, where:'Coral', from:'moi'};
  S.imported = {from:'Syn', book:'moi', road:'daru', lvl:15, mates:['brisk', 'kettle', 'ohl', 'sohra'], lifted:true};
  S.chapters = {1:'hunt', 2:'fields', 3:'kneel'}; S.f.b8_c1_key = 'hunt'; S.f.b8_c2_key = 'fields'; S.f.b8_c3_key = 'kneel'; S.f.b8_vassoDone = 1; S.f.b8_edremDone = 2; S.camp = ['edrem']; S.f.b8_away3 = 1;
  ['sohra', 'vasso', 'edrem'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(4); S.picksDue = [];
  out.s = {renderErr:renderAll(), reader:visReader().id, lines:lines(), here:here(), vasso:/Vasso/.test(DLG.b8_c4_fire_talk().txt), sohra:/Sohra/.test(DLG.b8_c4_fire_talk().txt),
    knelt:/You put something down/.test(DLG.b8_c4_mossa().txt), waves:BATTLES.b8_c4_edge.waves.length, noSeal:/None of them have a Daru seal/.test(DLG.b8_c4_jars().txt) && !S.f.b8_c4_sealSeen,
    edremNpc:AREAS.b8_c4_edge.npcs.find(n => n.id === 'edrem').show(), vassoStart:/Vasso/.test(DLG.b8_c4_start().txt)};
  S.f.b8_c4_ph = 3; S.f.b8_c4_key = 'burn'; out.s.noGuards = /Mossa takes the second fire-hook/.test(DLG.b8_c4_burn_go().txt); S.f.b8_c4_storesDone = 1; S.f.b8_c4_burned = 1; out.s.tents = /two tents/.test(DLG.b8_c4_edge_news().txt);
  S.f.b8_c4_ph = 3; S.f.b8_c4_key = 'hold'; out.s.lines3 = lines(); const hk = DLG.b8_c4_hold().ch.find(c => c.check); out.s.noStand = !edgesFor(hk, 'brisk').some(e => /trust the squad/.test(e[0]));
  out.s.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, f1 = r.fire1 || {}, m = r.m || {}, e = r.e || {}, w = r.w || {}, t = r.t || {}, c = r.c || {}, f2 = r.fire2 || {}, rw = r.rw || {}, d = r.d || {}, y = r.y || {}, k = r.k || {}, h = r.h || {}, b = r.b || {}, s = r.s || {};
if (f.area) {
  f.area === 'b8_c4_edge' && f.ch === 4 && f.con === -1 && f.away === 1 && !f.renderErr.length && f.title === 'The Pilgrims\' Camp' && f.areas === 3 && f.fights === 4 && f.items && f.itemN === 3 && f.hook && f.scale && f.rag && f.noNumbers && f.figs && f.tile && f.scenes && f.ownCamp && f.fireRoster && f.nodes >= 60 && f.nodes <= 80
    ? ok(`Chapter Four opens at the camp's far edge, the Contract −1 by the engine (weeks out of the city); every b8_c4 node renders, no never-name, no "!" in narration (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three new items with their own art; Mossa, Hurrin, the carrier, the camp ground and four backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 6 && !au.noNear.length && au.onwards >= 8 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.walk ? ok('the start: the far edge, the reading offered at the first halt') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'tuft' && rd.inPool && rd.notNow && rd.back === 'b8_c4_fire' && rd.mat && rd.says && rd.cardNode === 'b8_c4_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b8_c4_fire' ? ok(`the reading on a pilgrim's mat: Tuft draws (${rd.card}); a line for all three readers; the card node is the visions pass's hook (b8_c4_card)`) : no('reading ' + JSON.stringify(rd));
f1.html && f1.talk && !f1.sleep && !f1.rest && f1.notNow && f1.lines === f1.here && f1.rowsShut && f1.yardShut ? ok(`the fire before the water line: the Contract shown, the talk (a line each, ${f1.lines}), Not now; the rows and the yard wait`) : no('fire1 ' + JSON.stringify(f1));
m.met && m.smell && m.kneelShut && m.camp && m.hook && m.stopped && m.never && m.knelt && m.poured ? ok('Mossa: the camp\'s first turning (the children kept apart, the guards stopped coming), the fire-hook; the Redeemer speaks to some and never does what is asked; a prayer gives peace and nothing else; the jug poured out') : no('mossa ' + JSON.stringify(m));
e.show && e.notNow && e.in && e.gone && e.once ? ok('Edrem waits at his road and joins at the edge') : no('edrem ' + JSON.stringify(e));
w.go && w.notNow && w.near && w.fight && w.fight.started && w.fight.dark && !w.fight.guild && w.fight.after === 'b8_c4_water_after' && w.done ? ok(`the water line: a "yes, but" on talking them off, the fight (${w.fight.foes} foes, kelyk-mad pilgrims)`) : no('water ' + JSON.stringify(w));
t.rag && t.seen && t.dc === 17 && t.stat === 'wits' && t.lore && t.notNow && t.edgeEdrem === 3 && t.near && t.who === 'edrem' && t.ok === 1 && t.notFree && t.words && t.again && t.passive && t.offered && t.healed && t.noWard && t.n >= 2
  ? ok(`the trick: The Water-Song, a ✦ wits 17 check that names the Rhivi song; a group heal that uses the action and leaves no ward (${t.n} healed); the ash-rag`) : no('trick ' + JSON.stringify(t));
c.carrier && f2.sleep && f2.rest && f2.rested && f2.ph === 2 && f2.keyShut && f2.lines2 === f2.here2 && f2.edremLine ? ok('the fire after the water line: a rest (wounds and the kelyk-sickness go), then sleep; the key waits on the rows and the yard; Edrem has his line') : no('fire2 ' + JSON.stringify([c, f2]));
rw.area === 'b8_c4_rows' && rw.seen && rw.edremNamed && rw.met && rw.scaleShut && rw.kids && rw.scale && rw.rope && rw.barrow && rw.backNot ? ok('the rows: Hurrin from the north and his brother\'s grey scale (Edrem +1); the rope across the barrow end (nothing to do but walk on); the barrow, far off') : no('rows ' + JSON.stringify(rw));
d.show && d.notNow && d.near && d.fight && d.fight.started && d.fight.after === 'b8_c4_drunk_after' && d.done ? ok(`the end tent (optional): a "yes, but" on facing the men in the coats, the fight (${d.fight.foes} foes)`) : no('drunk ' + JSON.stringify(d));
y.area === 'b8_c4_yard' && y.seen && y.seal && y.keepers ? ok('the store-yard: the jugs, the Daru merchant\'s seal on some (Ch 2 passed, by default), the keepers watch and no fight yet') : no('yard ' + JSON.stringify(y));
k.open && k.dusk && k.hold && k.burn && k.notYet && k.html && k.edrem ? ok('the key at the fire, the bad night: hold, burn, Not yet; the Contract shown; Edrem\'s vote') : no('key ' + JSON.stringify(k));
h.key === 'hold' && h.ph === 3 && h.con === 0 && h.way && h.rowsShut && h.notNow && h.stand === 2 && h.kneel && h.waves === 4 && h.wavesBurned === 3 && h.lastWave && h.near && h.set && h.fight && h.fight.started && h.fight.obj === 5 && h.fight.stage2 && h.fight.inStage2 && h.fight.after === 'b8_c4_edge_after' && h.fightCon === 0 && h.held && h.bells && h.ph4 === 4 && h.mossaEnd && h.hurrinEnd && h.road && h.onward && h.notYet && h.end && h.end.view === 'end' && h.end.ch === 'hold' && h.end.con === 2 && h.end.extras >= 5 && h.end.journal >= 5 && h.end.endText === 'The edge held'
  ? ok(`key hold: the hold check (Ch 3 'stand' +2, not on 'kneel'), five rounds with one more wave on 'passed' (4 waves, 3 on 'burned'), the men behind them; the morning, Mossa and Hurrin; the end at level ${h.end.lvl}, the Contract at ${h.end.con}`) : no('hold ' + JSON.stringify(h).slice(0, 1400));
b.key === 'burn' && b.ph === 3 && b.con === 0 && b.guards && b.way && b.notNow && b.area === 'b8_c4_yard' && b.startNot && b.npc && b.fight && b.fight.started && b.fight.stage2 && b.fight.inStage2 && b.fight.after === 'b8_c4_stores_after' && b.fightCon === 0 && b.done && b.priest && b.near && b.jarsAgain && b.burned && b.cost === 'held' && b.ash && b.end && b.end.view === 'end' && b.end.ch === 'burn' && b.end.con === 2 && b.end.endText === 'The stores burned'
  ? ok('key burn, from the same moment: the guards from the barrow road hold the edge (Ch 3 stand); the store-yard and the sheds (the priest); a "yes, but" on the burning; the end on burn') : no('burn ' + JSON.stringify(b).slice(0, 1200));
s.renderErr && !s.renderErr.length && s.reader === 'sohra' && s.lines === s.here && s.lines3 === s.here && s.vasso && s.sohra && s.knelt && s.waves === 3 && s.noSeal && s.edremNpc && s.vassoStart && s.noGuards && s.tents && s.noStand && !s.audit.noNear.length && !s.audit.noStay.length
  ? ok(`a --from=4 style save (Tuft dead; Sohra and Vasso walking, Edrem waiting; Ch 2 fields, Ch 3 kneel): every node renders, Sohra reads, a line each at the fire (${s.lines}), Mossa saw the kneeling, three waves and no Daru seal, no 'stand' edge, Mossa holds the edge and two tents go down`) : no('synthetic ' + JSON.stringify(s).slice(0, 1200));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b8ch4: FAIL (${bad.length})` : 'b8ch4: all ok'); process.exit(bad.length ? 1 : 0);
