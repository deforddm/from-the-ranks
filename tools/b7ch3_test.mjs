// Book Seven, Chapter 3 (Night Raids, src/123_b7_ch3.js): the halts, the reading on the farmhouse floor, the fire (rest, a line each, the
// Rising box, the roster, Not now), Wenna's join (and the waiting road, and going home), the trick (taught, and its battle half), the guide's
// rise:true check at the farm (with the Rising's edge), every fight's start and a forced win (both grounds of the farm and the factor's house,
// and the old road), the prisoners (let go: the Rising +1, the village opens; kept: −1, the village shuts and the old road must be fought),
// both keys from the same moment in the counting room ('ledger' +2 and the corner of the roll; 'loot' +20 silver, +2 salves, −1), and the
// chapter's end; from a --from=3 style save, and from synthetic saves (Sathi, Tallow, Ottar and Mehet with no Marrow; Doss with no Wenna).
// Usage: node tools/b7ch3_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const unpick = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const force = async (id) => { const res = {id};
    if (!B || B.id !== id) { startBattle(id, {}); await wait(60); }
    res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark; res.allies = B.units.filter(u => u.ally).length;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); unpick(); }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b7_c3_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b|Kettle|Tehol the Only|Mael\b|Borthen|Kenryll/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks ' + (n.txt + (n.html || '')).match(leak)[0]); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); else if (/!/.test(n.txt)) errs.push(k + ': an exclamation mark'); (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const allPhases = () => { const keep = {ph:S.f.b7_c3_ph, key:S.f.b7_c3_key}, e = [];
    for (const ph of [1, 2, 3, 4]) for (const key of [null, 'ledger', 'loot']) { if (ph < 4 && key) continue; S.f.b7_c3_ph = ph; S.f.b7_c3_key = key || undefined; e.push(...renderAll().map(x => `ph${ph}${key ? ' ' + key : ''}: ${x}`)); }
    S.f.b7_c3_ph = keep.ph; if (keep.key) S.f.b7_c3_key = keep.key; else delete S.f.b7_c3_key; return [...new Set(e)]; };
  const marineSlip = () => nodes.filter(k => { try { return /the Third (is|are) (a squad of )?marines|Third squad of marines/i.test(DLG[k]().txt); } catch (e) { return false; } });
  /* a --from=3 style save: the Third at 17 after Chapter 1 on 'burn' (the Rising at 3), Doss walking; the Letherii at 9 after Chapter 2 */
  const from3 = (o = {}) => { setBook('rg'); S = newStateRG('Fresh', 'Other'); S.lvl = 17; S.xp = LEVELS[16]; S.th.l.lvl = 9; S.th.l.xp = LEVELS[8];
    S.chapters = {1:o.c1 || 'burn', 2:o.c2 || 'refuse'}; S.f.b7_c1_key = o.c1 || 'burn'; S.f.b7_c2_key = o.c2 || 'refuse'; S.b7 = {rise:o.rise ?? 3, file:2, hi:o.rise ?? 3};
    if (o.doss !== false) { S.f.b7_dossDone = 1; S.squad.push('doss'); S.loy.doss = 0; S.gear.doss = {}; S.picks.doss = []; }
    S.picksDue = []; save(); startChapter(3); unpick(); };
  try {
  /* ================= a --from=3 start ================= */
  from3();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, renderErr:allPhases(), slip:marineSlip(), title:CHAPTERS[3].title, nodes:nodes.length, areas:CHAPTERS[3].areas.length, fights:Object.keys(CHAPTERS[3].battles).length,
    rise0:b7Rising(), items:Object.keys(CHAPTERS[3].gear).every(k => !!ART['item/' + k] && ITEMS[k].role), figure:typeof FIGX.wenna === 'function', por:typeof POR.wenna === 'function',
    scenes:['b7_farm_night', 'b7_march_night', 'b7_camp_night', 'b7_c3_floor', 'b7_c3_gate', 'b7_c3_house'].every(k => typeof SCENEX[k] === 'function'), read:!!B7READ[3] && B7READ[3].back === 'b7_c3_fire' && ['marrow', 'tallow', 'oldninth'].every(k => B7READ[3].say[k]),
    bonehunters:nodes.filter(k => /Bonehunter/.test(DLG[k]().txt)).length};
  /* phase 1: the farmhouse floor; the reading */
  talk('b7_c3_start'); out.f.ph = S.f.b7_c3_ph; out.f.walk = has('b7_c3_start', /Out into the wood/);
  out.r = {deckChoice:has('b7_c3_start', /Deck/)};
  talk('b7_c3_read'); const rd = DLG.b7_c3_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = Object.assign(out.r, {drawn:S.f.b7_c3_drawn, reader:S.f.b7_c3_reader, card:S.card, inPool:B7POOL[3].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), words:/boards|No lamp/.test(rd.txt)});
  talk('b7_c3_card'); out.r.cardNode = DLG.b7_c3_card().sp; out.r.back = DLG.b7_c3_card().ch[0].go;
  /* the lieutenant; the way out gated on the orders and the guide */
  out.l = {outGated:!has('b7_c3_out', /Down into the valley/)};
  talk('b7_c3_lt'); out.l.orders = S.f.b7_c3_orders1; out.l.sands = /Sands/.test(DLG.b7_c3_lt().txt); out.l.sort = /Sort/.test(DLG.b7_c3_lt().txt); take('b7_c3_lt', /find the farm/); out.l.shake = /Shake/.test(DLG.b7_c3_lt_guide().txt);
  out.l.stillGated = !has('b7_c3_out', /Down into the valley/);
  talk('b7_c3_marines'); out.l.smokes = /ten smokes/i.test(DLG.b7_c3_marines().txt);
  /* the fire on the floor: the Rising box, a rest, the talk, the roster, Not now; no way on until the guide is settled */
  talk('b7_c3_fire'); const fy = DLG.b7_c3_fire(); out.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b7_c3_fire', /rest/), talk:has('b7_c3_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:ROSTER_FIRES.rg[3].includes('b7_c3_fire'), html:/The Rising/.test(fy.html || ''), noOnward:!has('b7_c3_fire', /Out with the column/)};
  S.wounds = {doss:4}; take('b7_c3_fire', /Let the squad rest/); out.fire.rested = S.f.b7_c3_rest1 && !S.wounds;
  out.fire.talkLines = DLG.b7_c3_fire_talk().txt.split('\n\n').length; out.fire.here = S.squad.filter(id => id !== 'sgt').length;
  /* Wenna: wait, then join from the wood; or go home; or join at once */
  talk('b7_c3_wenna'); out.w = {fish:has('b7_c3_wenna', /fish/)}; take('b7_c3_wenna', /fish/); out.w.fished = S.f.b7_c3_fish === 1;
  take('b7_c3_wenna_fish', /Show me/); out.w.map = /road the gulls/.test(DLG.b7_c3_wenna_map().txt) && /Doss/.test(DLG.b7_c3_wenna_map().txt) === !!S.f.b7_c1_dossRoads;
  { const sf = JSON.stringify(S); take('b7_c3_wenna_map', /Then walk with us/); out.w.full = {flag:S.f.b7_wennaDone, in:b7In('wenna'), six:/six already walk/.test(DLG.b7_c3_wenna_join().txt)}; S = JSON.parse(sf); save(); setBook('rg'); startExplore('b7_c3_wood'); }
  /* room in the squad: Mirrel waits at the column's rear for the rest of this test */
  S.squad = S.squad.filter(x => x !== 'mirrel'); S.camp = [...(S.camp || []), 'mirrel']; save();
  const snapW = JSON.stringify(S);
  take('b7_c3_wenna_map', /Wait with the fishers/); out.w.wait = {flag:S.f.b7_wennaDone, roster:ROSTER_BOOKS.rg.wait('wenna'), npc:AREAS.b7_c3_wood.npcs.find(n => n.id === 'wenna').show(), out:has('b7_c3_out', /Down into the valley/)};
  talk('b7_c3_wenna'); take('b7_c3_wenna', /Walk with us/); unpick(); out.w.wait.joined = b7In('wenna') && S.f.b7_wennaDone === 1;
  S = JSON.parse(snapW); save(); setBook('rg'); startExplore('b7_c3_wood');
  take('b7_c3_wenna_map', /Go back to the sea/); out.w.home = {flag:S.f.b7_wennaDone, gone:ROSTER_BOOKS.rg.gone('wenna'), npc:AREAS.b7_c3_wood.npcs.find(n => n.id === 'wenna').show()};
  S = JSON.parse(snapW); save(); setBook('rg'); startExplore('b7_c3_wood');
  take('b7_c3_wenna_map', /Then walk with us/); unpick(); out.w.join = {in:b7In('wenna'), flag:S.f.b7_wennaDone, fire:/Wenna/.test(DLG.b7_c3_fire_talk().txt), lines:DLG.b7_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, joinTxt:/Wenna/.test(DLG.b7_c3_wenna_join().txt)};
  out.fire.onward = has('b7_c3_fire', /Out with the column/);
  /* out into the valley: phase 2 */
  take('b7_c3_out', /Down into the valley/); out.v = {area:S.area, ph:S.f.b7_c3_ph};
  talk('b7_c3_fire'); out.v.noFire = /No fire on the march/.test(DLG.b7_c3_fire().txt) && !has('b7_c3_fire', /rest/);
  out.v.farmNeedsOrders = !has('b7_c3_farm_view', /Straight at them/);
  talk('b7_c3_lt2'); out.v.orders = S.f.b7_c3_orders2; out.v.farmOpen = has('b7_c3_farm_view', /Straight at them/) && has('b7_c3_farm_view', /Not now/);
  talk('b7_c3_ditch'); out.v.drum = S.f.b7_c3_drum === 1 && !/the Drum/.test(DLG.b7_c3_ditch().txt);
  out.v.villageGated = !has('b7_c3_village', /Into the village|old road, then/); out.v.eastGated = !has('b7_c3_fields_east', /Up the lane/);
  /* the trick: Wenna's Tracks, taught by Wenna */
  talk('b7_c3_track'); out.t = {sp:DLG.b7_c3_track().sp, notNow:has('b7_c3_track', /Not now/), dc:DLG.b7_c3_track().ch[0].check[1]}; made('b7_c3_track', /Learn the drains/, 'wenna');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b7_c3_tracks && S.tricks.b7_c3_tracks.who, ok:S.f.b7_c3_tracksOk, fx:/swap places/.test(TRICKS.b7_c3_tracks.fx)});
  /* the farm: the guide's rise:true check (stirring: "The Rising" +1), and the battle half of the trick */
  const gc = DLG.b7_c3_farm_view().ch.find(c => c.rise); out.g = {rise:!!gc, label:gc && /Wenna/.test(gc.t), edge:gc ? ((edgesFor(gc, 'wenna').find(e => /Rising/.test(e[0])) || [])[1] || 0) : 0, wennaEdge:gc ? ((edgesFor(gc, 'wenna').find(e => /Shake/.test(e[0])) || [])[1] || 0) : 0, tier:b7RiseTier()};
  startBattle('b7_c3_farm', {}); await wait(60);
  { const u = B.units.find(x => x.id === 'wenna'), m = B.units.find(x => x.side === 'p' && !x.ally && x !== u); out.t.offered = trickOk(u, AB.t_b7_c3_tracks); out.t.tiles = AB.t_b7_c3_tracks.tiles(u).length; const ux = u.x, uy = u.y, mx = m.x, my = m.y; AB.t_b7_c3_tracks.run(u, m.x, m.y); out.t.swapped = u.x === mx && u.y === my && m.x === ux && m.y === uy; }
  out.farm = await force('b7_c3_farm'); out.farm.xbow = S.kit.includes('b7_c3_letherxbow'); out.farm.done = S.f.b7_c3_farmDone;
  out.farm.prisNpc = AREAS.b7_c3_fields.npcs.find(n => n.id === 'pris').show(); out.farm.villageWaits = !has('b7_c3_village', /Into the village|old road, then/);
  talk('b7_c3_prisoners'); out.farm.other = /told the Patriotists no/.test(DLG.b7_c3_prisoners().txt); out.farm.html = /The Rising/.test(DLG.b7_c3_prisoners().html || '');
  const snapP = JSON.stringify(S), r0 = b7Rising();
  /* prisoners let go: +1, and the village opens (b7Open at 4) */
  take('b7_c3_prisoners', /Go home/); out.p = {freed:S.f.b7_c3_prisoners, rise:b7Rising() - r0};
  talk('b7_c3_prisoners'); runFx(DLG.b7_c3_prisoners().ch[0]); out.p.once = b7Rising() - r0;
  talk('b7_c3_village'); out.p.open = b7Open() && has('b7_c3_village', /Into the village/); take('b7_c3_village', /Into the village/); out.p.village = S.f.b7_c3_village; out.p.bread = /loaf/.test(DLG.b7_c3_village_open().txt);
  out.p.eastOpen = has('b7_c3_fields_east', /Up the lane/); out.p.noRoad = !AREAS.b7_c3_fields.npcs.find(n => n.id === 'road').show();
  const snapE = JSON.stringify(S);
  /* prisoners kept from the same moment: −1, the village shuts, the old road (an Edur camp) */
  S = JSON.parse(snapP); save(); setBook('rg'); startExplore('b7_c3_fields');
  take('b7_c3_prisoners', /Hand them to the column/); out.k = {kept:S.f.b7_c3_prisoners, rise:b7Rising() - r0};
  talk('b7_c3_village'); out.k.shut = !b7Open() && has('b7_c3_village', /old road, then/); take('b7_c3_village', /old road, then/); out.k.village = S.f.b7_c3_village;
  out.k.eastGated = !has('b7_c3_fields_east', /Up the lane/); out.k.roadNpc = AREAS.b7_c3_fields.npcs.find(n => n.id === 'road').show();
  talk('b7_c3_road_start'); out.k.sneak = has('b7_c3_road_start', /hawthorn bank/) && has('b7_c3_road_start', /Not now/);
  const sv0 = S.silver; out.k.road = await force('b7_c3_road'); out.k.roadDone = S.f.b7_c3_roadDone; out.k.silver = S.silver - sv0; out.k.eastOpen = has('b7_c3_fields_east', /Up the lane/);
  /* back to the open village's road: the factor's house */
  S = JSON.parse(snapE); save(); setBook('rg'); startExplore('b7_c3_fields');
  take('b7_c3_fields_east', /Up the lane/); out.h = {ph:S.f.b7_c3_ph, view:/dressed stone/.test(DLG.b7_c3_house_view().txt), wall:has('b7_c3_house_view', /orchard wall/), loose:/loose/.test(DLG.b7_c3_house_view().txt)};
  out.h.fight = await force('b7_c3_factor'); out.h.mail = S.kit.includes('b7_c3_edurmail'); out.h.done = S.f.b7_c3_factorDone;
  take('b7_c3_factor_after', /Into the yard/); out.h.area = S.area;
  talk('b7_c3_steward'); take('b7_c3_steward', /Walk to the city/); out.h.steward = S.f.b7_c3_steward;
  talk('b7_c3_servants'); out.h.servants = S.f.b7_c3_servants; talk('b7_c3_gate'); out.h.gateWaits = /counting room first/.test(DLG.b7_c3_gate().txt);
  talk('b7_c3_fire'); out.h.barnWaits = !has('b7_c3_fire', /rest|On with the column/);
  talk('b7_c3_door'); take('b7_c3_door', /Into the counting room/);
  const kn = DLG.b7_c3_counting(); out.key = {ledger:has('b7_c3_counting', /Burn the rolls/), loot:has('b7_c3_counting', /strongbox/), notYet:has('b7_c3_counting', /Not yet/), html:/The Rising/.test(kn.html || ''), doss:/Burn it/.test(kn.txt), wenna:/Fish don't buy/.test(kn.txt)};
  const snapK = JSON.stringify(S), rk = b7Rising(), sk = {silver:S.silver, salve:S.inv.salve || 0}, ld = S.loy.doss;
  /* key: loot, then back to ledger from the same moment */
  take('b7_c3_counting', /strongbox/); out.lo = {key:S.f.b7_c3_key, silver:S.silver - sk.silver, salve:(S.inv.salve || 0) - sk.salve, rise:b7Rising() - rk, ash:S.kit.includes('b7_c3_ledgerash'), ph:S.f.b7_c3_ph, doss:S.loy.doss - ld};
  S = JSON.parse(snapK); save(); setBook('rg'); startExplore('b7_c3_house');
  take('b7_c3_counting', /Burn the rolls/); out.le = {key:S.f.b7_c3_key, rise:b7Rising() - rk, rose:(S.stats || {}).b7Rose || 0, ash:S.kit.includes('b7_c3_ledgerash'), silver:S.silver - sk.silver, ph:S.f.b7_c3_ph, doss:S.loy.doss - ld, dossLine:/Twenty-six harvests/.test(DLG.b7_c3_ledger().txt)};
  runFx(DLG.b7_c3_counting().ch[0]); out.le.once = b7Rising() - rk;
  /* phase 4: dawn, the barn, the lieutenant, the end */
  take('b7_c3_ledger', /Out into the yard/); out.e = {dawn:/Uru Hela/.test(DLG.b7_c3_dawn().txt), lt4:AREAS.b7_c3_house.npcs.find(n => n.id === 'lt4').show()};
  talk('b7_c3_lt4'); out.e.lt4said = S.f.b7_c3_lt4;
  talk('b7_c3_fire'); out.e.barn = {html:/The Rising/.test(DLG.b7_c3_fire().html || ''), rest:has('b7_c3_fire', /rest/), onward:has('b7_c3_fire', /On with the column/), notNow:has('b7_c3_fire', /Not now/), lines:DLG.b7_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length};
  take('b7_c3_fire', /On with the column/); out.e.wennaEnd = /Wenna/.test(DLG.b7_c3_onward().txt); out.e.dossEnd = /Doss/.test(DLG.b7_c3_onward().txt); out.e.notYet = has('b7_c3_onward', /Not yet/);
  take('b7_c3_onward', /On, with the column/); await wait(60);
  out.e = Object.assign(out.e, {view, ch:S.chapters[3], lvl:S.lvl, xp:S.xp, rise:b7Rising(), extras:CHAPTERS[3].extras().length, journal:CHAPTERS[3].journal().length, endText:(CHEND[3] || {}).ledger && CHEND[3].ledger[0]});
  /* ================= synthetic saves ================= */
  setBook('rg'); S = newStateRG('Syn', 'Other'); delete S.dead.sathi; S.lvl = 17; S.xp = LEVELS[16]; S.squad = ['sgt', 'haddat', 'sathi', 'tallow', 'ottar', 'mehet']; ['sathi', 'tallow', 'ottar', 'mehet'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.f.b7_c1_key = 'strip'; S.picksDue = []; save(); startChapter(3); unpick();
  out.y = {renderErr:allPhases(), lines:DLG.b7_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b7_c3_fire_talk().txt), ottar:/Ottar/.test(DLG.b7_c3_fire_talk().txt), reader:visReader().id, guide:DLG.b7_c3_farm_view && null};
  S.f.b7_c3_ph = 3; out.y.lines3 = DLG.b7_c3_fire_talk().txt.split('\n\n').length; S.f.b7_c3_ph = 2; S.f.b7_c3_orders2 = 1; S.f.b7_wennaDone = 0;
  out.y.teacher = DLG.b7_c3_track().sp; out.y.guideless = /Find the ditch/.test((DLG.b7_c3_farm_view().ch.find(c => c.rise) || {}).t || '');
  from3({c1:'strip', rise:2}); S.f.b7_c3_ph = 2; S.f.b7_c3_orders2 = 1; S.f.b7_c1_dossRoads = 1; S.f.b7_wennaDone = 0;
  { const gc2 = DLG.b7_c3_farm_view().ch.find(c => c.rise); out.z = {teacher:DLG.b7_c3_track().sp, label:/Doss/.test(gc2.t), edges:edgesFor(gc2, 'doss').filter(e => /field-drains|coast/.test(e[0])).length, renderErr:allPhases(), tier:b7RiseTier()}; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, l = r.l || {}, fi = r.fire || {}, w = r.w || {}, v = r.v || {}, t = r.t || {}, g = r.g || {}, fa = r.farm || {}, p = r.p || {}, k = r.k || {}, h = r.h || {}, key = r.key || {}, lo = r.lo || {}, le = r.le || {}, e = r.e || {}, y = r.y || {}, z = r.z || {};
if (f.area) {
  f.area === 'b7_c3_wood' && f.ch === 3 && f.thread === 't' && f.lvl0 === 17 && /doss/.test(f.squad) && !f.renderErr.length && !f.slip.length && f.title === 'Night Raids' && f.rise0 === 3 && f.items && f.figure && f.por && f.scenes && f.read && f.bonehunters <= 1
    ? ok(`a --from=3 start opens Chapter Three in the wood at level 17 with the Third and Doss, the Rising at 3; every b7_c3 node renders in all four phases with no leak or exclamation mark (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); items, Wenna and the six backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 900));
}
f.ph === 1 && f.walk && rd.deckChoice && rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.words && rd.cardNode === 'The Deck of Dragons' && rd.back === 'b7_c3_fire' ? ok(`the farmhouse floor: the Deck offered at the first halt; Marrow reads (${rd.card}); back to b7_c3_fire`) : no('reading ' + JSON.stringify([f.ph, f.walk, rd]));
l.outGated && l.orders === 1 && l.sands && l.sort && l.shake && l.stillGated && l.smokes ? ok('the lieutenant: the crossbowmen, Sands heard of, Sort\'s word; a Shake guide; the way out waits on the guide; the marines\' ten smokes') : no('lieutenant ' + JSON.stringify(l));
fi.again && fi.rest && fi.talk && fi.notNow && fi.roster && fi.html && fi.noOnward && fi.rested && fi.talkLines === fi.here && fi.onward ? ok(`the fire on the floor: an again line, the Rising box, a rest (wounds close), the talk (a line each, ${fi.talkLines}), the roster, Not now; the way on only once the guide is settled`) : no('fire ' + JSON.stringify(fi));
w.fish && w.fished && w.map && w.full && w.full.flag === 2 && !w.full.in && w.full.six && w.wait && w.wait.flag === 2 && w.wait.roster && w.wait.npc && w.wait.out && w.wait.joined && w.home && w.home.flag === 0 && w.home.gone && !w.home.npc && w.join && w.join.in && w.join.flag === 1 && w.join.fire && w.join.lines === w.join.here && w.join.joinTxt
  ? ok('Wenna: smoked fish, the map of the Shake tracks; with six walking she waits at the column\'s edge; with room she waits with the fishers then joins; goes home to the sea; or joins at once, with her line at the fire') : no('wenna ' + JSON.stringify(w));
v.area === 'b7_c3_fields' && v.ph === 2 && v.noFire && v.farmNeedsOrders && v.orders === 1 && v.farmOpen && v.drum && v.villageGated && v.eastGated ? ok('the valley at night: no fire on the march; the farm waits on the lieutenant; the far blow on the road north (never named); the village and the lane wait') : no('valley ' + JSON.stringify(v));
t.sp === 'Wenna' && t.notNow && t.dc === 17 && t.who === 'wenna' && t.ok === 1 && t.fx && t.offered && t.tiles >= 1 && t.swapped ? ok('the trick: Wenna\'s Tracks, a ✦ wits 17 check with Wenna; in a fight it swaps the bearer with a squadmate (the Rope\'s Way)') : no('trick ' + JSON.stringify(t));
g.rise && g.label && g.edge === 1 && g.wennaEdge === 3 && g.tier === 'stirring' ? ok('the guide\'s way into the farm: a rise:true check, Wenna +3, "The Rising" +1') : no('guide ' + JSON.stringify(g));
fa.started && fa.stage2 && fa.inStage2 && fa.after === 'b7_c3_farm_after' && fa.xbow && fa.done === 1 && fa.prisNpc && fa.villageWaits && fa.other && fa.html ? ok(`the farm: both grounds forced (the barn: ${fa.foes2} foes), the Letherii crossbow; the prisoners (and the Letherii's news, one line); the village waits on them`) : no('farm ' + JSON.stringify(fa));
p.freed === 'freed' && p.rise === 1 && p.once === 1 && p.open && p.village === 'open' && p.bread && p.eastOpen && p.noRoad ? ok('prisoners let go: the Rising +1 (once); the village opens its gate (b7Open), bread and the orchard wall; the lane east opens') : no('freed ' + JSON.stringify(p));
k.kept === 'kept' && k.rise === -1 && k.shut && k.village === 'shut' && k.eastGated && k.roadNpc && k.sneak && k.road && k.road.started && k.road.after === 'b7_c3_road_after' && k.roadDone === 1 && k.silver === 6 && k.eastOpen ? ok(`prisoners kept: the Rising −1; the village stays shut; the old road's Edur camp (${k.road.foes} foes, a K'risnan) forced; then the lane opens`) : no('kept ' + JSON.stringify(k));
h.ph === 3 && h.view && h.wall && h.loose && h.fight && h.fight.started && h.fight.stage2 && h.fight.inStage2 && h.fight.allies >= 0 && h.fight.after === 'b7_c3_factor_after' && h.mail && h.done === 1 && h.area === 'b7_c3_house' && h.steward === 'freed' && h.servants === 1 && h.gateWaits && h.barnWaits
  ? ok('the factor\'s house: both grounds forced (the counting-room door), the Finadd\'s Edur mail; the yard, the steward, the house\'s Indebted; the gate and the barn wait on the key') : no('house ' + JSON.stringify(h));
key.ledger && key.loot && key.notYet && key.html && key.doss && key.wenna ? ok('the key in the counting room: ledger, loot, Not yet; the Rising shown; Doss and Wenna speak') : no('key ' + JSON.stringify(key));
lo.key === 'loot' && lo.silver === 20 && lo.salve === 2 && lo.rise === -1 && !lo.ash && lo.ph === 4 && lo.doss === -2 ? ok('key loot: +20 silver, +2 salves, the Rising −1, no corner of the roll; Doss −2') : no('loot ' + JSON.stringify(lo));
le.key === 'ledger' && le.rise === 2 && le.rose >= 2 && le.ash && le.silver === 0 && le.ph === 4 && le.doss === 2 && le.dossLine && le.once === 2 ? ok('key ledger: the Rising +2 (once), the corner of the debt-roll, Doss +2 and his line') : no('ledger ' + JSON.stringify(le));
e.dawn && e.lt4 && e.lt4said && e.barn && e.barn.html && e.barn.rest && e.barn.onward && e.barn.notNow && e.barn.lines === e.barn.here && e.wennaEnd && e.dossEnd && e.notYet && e.view === 'end' && e.ch === 'ledger' && e.lvl >= 18 && e.rise === 6 && e.extras >= 5 && e.journal >= 7 && e.endText === 'The smoke from the counting room'
  ? ok(`the end: dawn (Uru Hela heard of), the barn (rest, Rising box, a line each), the lieutenant; the chapter ends on ledger at level ${e.lvl} (${e.xp} xp), the Rising at ${e.rise}`) : no('end ' + JSON.stringify(e));
y.renderErr && !y.renderErr.length && y.lines === y.here && y.sathi && y.ottar && y.lines3 === y.here && y.reader === 'tallow' && y.teacher === 'An old Shake fisher' && y.guideless ? ok(`a synthetic save (Sathi, Tallow, Ottar and Mehet, no Marrow, no Doss): every node renders, a line each at the fire (${y.lines}), Tallow reads, an old Shake fisher teaches, the ditch without a guide`) : no('synthetic ' + JSON.stringify(y));
z.teacher === 'Doss' && z.label && z.edges === 2 && !z.renderErr.length && z.tier === 'quiet' ? ok('a save with Doss and no Wenna (strip, the Rising 2): Doss teaches the drains and guides the farm (+2, +1 for the coast roads)') : no('doss save ' + JSON.stringify(z));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b7ch3: FAIL (${bad.length})` : 'b7ch3: all ok'); process.exit(bad.length ? 1 : 0);
