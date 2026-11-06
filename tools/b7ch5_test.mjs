// Book Seven, Chapter 5 (The Village, src/125_b7_ch5.js): the halts, the reading in the factor's cellar, the fire (rest, a line each, the
// Rising box, the roster, Not now), the road (the scouts' fight), the village (the mill-woman, the well's rise:true check, the bailiff's fight
// and what is done with him, the board, the old shield), the trick (Hold the Square, taught, and its battle half), the warning at dusk
// (b7Guides: the squad set, a round's head start), both keys from the same moment ('hold': the signposted MORTAL fight, the roof, the dead
// recorded as S.dead[id] = {ch:5, where:<the ground's title>} and named at the fire; 'slip': the running fight, not mortal), the Rising
// moves, the riverbank and the chapter's end; from a --from=5 style save, and from synthetic saves.
// Usage: node tools/b7ch5_test.mjs   (build first; exit 1 on a failure)
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
  /* force a fight: optionally go in with options; kill a squadmate at the very end (the mortal test) */
  const force = async (id, opt = {}, fell = null) => { const res = {id};
    if (!B || B.id !== id) { startBattle(id, opt); await wait(60); }
    res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.mortal = !!B.def.mortal; res.surprise = B.surprise || null; res.obj = !!B.def.objective;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').length; res.surprise2 = B.surprise || null; res.title2 = B.def.title; }
    if (fell) { const u = B.units.find(x => x.side === 'p' && x.id === fell); if (u) u.hp = 0; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); unpick(); }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b7_c5_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b|Kettle|Tehol the Only|Mael\b|Hellian|\bUrb\b|\bBowl\b|Lutes|Tavos|Primly|Badan|Bonehunter/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks ' + (n.txt + (n.html || '')).match(leak)[0]); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); else if (/!/.test(n.txt)) errs.push(k + ': an exclamation mark'); (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const allPhases = () => { const keep = {ph:S.f.b7_c5_ph, key:S.f.b7_c5_key, hd:S.f.b7_c5_holdDone, roof:S.f.b7_c5_roof}, e = [];
    for (const ph of [1, 2, 3, 4]) for (const key of [null, 'hold', 'slip']) for (const roof of [0, 1]) { if (ph < 3 && key) continue; if (roof && key !== 'hold') continue; S.f.b7_c5_ph = ph; S.f.b7_c5_key = key || undefined; S.f.b7_c5_holdDone = key === 'hold' && ph >= 4 ? 1 : undefined; S.f.b7_c5_roof = roof || undefined; e.push(...renderAll().map(x => `ph${ph}${key ? ' ' + key : ''}${roof ? ' roof' : ''}: ${x}`)); }
    S.f.b7_c5_ph = keep.ph; ['key', 'hd', 'roof'].forEach(k => { const f = {key:'b7_c5_key', hd:'b7_c5_holdDone', roof:'b7_c5_roof'}[k]; if (keep[k]) S.f[f] = keep[k]; else delete S.f[f]; }); return [...new Set(e)]; };
  const marineSlip = () => nodes.filter(k => { try { return /the Third (is|are) (a squad of )?marines|Third squad of marines/i.test(DLG[k]().txt); } catch (e) { return false; } });
  /* a --from=5 style save: the Third at 18 after Chapters 1 and 3 ('burn', 'ledger'; the Rising at 6), Doss walking, Wenna waiting; the Letherii at 10 */
  const from5 = (o = {}) => { setBook('rg'); S = newStateRG('Fresh', 'Other'); S.lvl = 18; S.xp = LEVELS[17]; S.th.l.lvl = 10; S.th.l.xp = LEVELS[9];
    S.chapters = {1:o.c1 || 'burn', 2:'refuse', 3:o.c3 || 'ledger', 4:o.c4 || 'letherii'}; S.f.b7_c1_key = o.c1 || 'burn'; S.f.b7_c2_key = 'refuse'; if (o.c3 !== null) S.f.b7_c3_key = o.c3 || 'ledger'; S.f.b7_c4_key = o.c4 || 'letherii'; S.b7 = {rise:o.rise ?? 6, file:2, hi:o.rise ?? 6};
    if (o.doss !== false) { S.f.b7_dossDone = 1; S.squad.push('doss'); S.loy.doss = 0; S.gear.doss = {}; S.picks.doss = []; }
    S.f.b7_wennaDone = 2;
    S.picksDue = []; save(); startChapter(5); unpick(); };
  try {
  /* ================= a --from=5 start ================= */
  from5();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, renderErr:allPhases(), slip:marineSlip(), title:CHAPTERS[5].title, nodes:nodes.length, areas:CHAPTERS[5].areas.length, fights:Object.keys(CHAPTERS[5].battles).length,
    rise0:b7Rising(), items:Object.keys(CHAPTERS[5].gear).every(k => !!ART['item/' + k] && ITEMS[k].role), itemsN:Object.keys(CHAPTERS[5].gear).length,
    scenes:['b7_village', 'b7_c5_lane', 'b7_c5_cellar', 'b7_c5_river'].every(k => typeof SCENEX[k] === 'function'), read:!!B7READ[5] && B7READ[5].back === 'b7_c5_fire' && ['marrow', 'tallow', 'oldninth'].every(k => B7READ[5].say[k]),
    fire:ROSTER_FIRES.rg[5].includes('b7_c5_fire'), mortalOnly:Object.entries(CHAPTERS[5].battles).filter(([k, b]) => b.mortal).map(([k]) => k).join(',')};
  /* phase 1: the road */
  talk('b7_c5_start'); out.f.ph = S.f.b7_c5_ph;
  out.l = {eastGated:!has('b7_c5_lane_east', /Into the village/)};
  talk('b7_c5_lt'); out.l.orders = S.f.b7_c5_orders; take('b7_c5_lt', /How many/); out.l.sort = /Sort/.test(DLG.b7_c5_lt_more().txt);
  talk('b7_c5_marines'); out.l.tavern = /tavern/.test(DLG.b7_c5_marines().txt);
  talk('b7_c5_fire'); out.l.noFire = /No fire on the march/.test(DLG.b7_c5_fire().txt) && !has('b7_c5_fire', /rest/);
  out.l.scoutsNpc = AREAS.b7_c5_lane.npcs.find(n => n.id === 'scouts').show();
  talk('b7_c5_scouts'); { const c = DLG.b7_c5_scouts().ch.find(x => x.check); out.l.ambushEdge = c ? ((edgesFor(c, 'doss').find(e => /ditch|overseer/.test(e[0])) || [])[1] || 0) : 0; }
  out.road = await force('b7_c5_road'); out.road.done = S.f.b7_c5_roadDone;
  out.l.boyNpc = AREAS.b7_c5_lane.npcs.find(n => n.id === 'boy').show(); talk('b7_c5_boy'); out.l.boyWord = /burned the rolls/.test(DLG.b7_c5_boy().txt);
  take('b7_c5_boy', /Take us in/); take('b7_c5_boy_more', /East/); take('b7_c5_lane_east', /Into the village/);
  out.v = {area:S.area, ph:S.f.b7_c5_ph, arrive:/factor/.test(DLG.b7_c5_arrive().txt) && /loaf/.test(DLG.b7_c5_arrive().txt)};
  /* phase 2: the cellar (the first halt), the reading */
  take('b7_c5_arrive', /Down into the cellar/); out.r = {deckChoice:has('b7_c5_cellar', /Deck/)};
  talk('b7_c5_read'); const rd = DLG.b7_c5_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = Object.assign(out.r, {drawn:S.f.b7_c5_drawn, reader:S.f.b7_c5_reader, card:S.card, inPool:B7POOL[5].includes(S.card), herald:B7POOL[5].filter(c => c === 'herald').length, notNow:rd.ch.some(c => /Not now/.test(c.t)), words:/cellar|barrel/.test(rd.txt)});
  talk('b7_c5_card'); out.r.cardNode = DLG.b7_c5_card().sp; out.r.back = DLG.b7_c5_card().ch[0].go;
  /* the fire in the cellar */
  talk('b7_c5_fire'); const fy = DLG.b7_c5_fire(); out.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b7_c5_fire', /rest/), talk:has('b7_c5_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), html:/The Rising/.test(fy.html || ''), duskGated:!has('b7_c5_fire', /Wait for dusk/)};
  S.wounds = {doss:4}; take('b7_c5_fire', /Let the squad rest/); out.fire.rested = S.f.b7_c5_rest2 && !S.wounds;
  out.fire.talkLines = DLG.b7_c5_fire_talk().txt.split('\n\n').length; out.fire.here = S.squad.filter(id => id !== 'sgt').length;
  /* the mill-woman, the bailiff, the well (rise:true) */
  talk('b7_c5_miller'); out.m = {said:S.f.b7_c5_miller, bailiff:/bailiff/.test(DLG.b7_c5_miller().txt)}; take('b7_c5_miller', /north lane/); out.m.lane = S.f.b7_c5_lane;
  out.fire.duskOpen = has('b7_c5_fire', /Wait for dusk/);
  const wc = DLG.b7_c5_well().ch.find(c => c.rise); out.m.rise = !!wc && wc.check[0] === 'guile'; out.m.edge = wc ? ((edgesFor(wc, 'doss').find(e => /Rising/.test(e[0])) || [])[1] || 0) : 0; out.m.dossEdge = wc ? ((edgesFor(wc, 'doss').find(e => /field-hands/.test(e[0])) || [])[1] || 0) : 0;
  made('b7_c5_well', /short way/, 'doss'); out.m.short = S.f.b7_c5_short;
  take('b7_c5_gate', /short way/); out.bf = await force('b7_c5_bailiff', {surprise:'p'}); out.bf.done = S.f.b7_c5_bailiffDone; out.bf.letter = /names follow/.test(DLG.b7_c5_bailiff_after().txt);
  { const snapB = JSON.stringify(S), rb = b7Rising();
    take('b7_c5_bailiff_after', /village can decide/); out.bf.village = {flag:S.f.b7_c5_bailiff, rise:b7Rising() - rb}; runFx(DLG.b7_c5_bailiff_after().ch[0]); out.bf.village.once = b7Rising() - rb;
    S = JSON.parse(snapB); save(); setBook('rg'); startExplore('b7_c5_street');
    take('b7_c5_bailiff_after', /Tie him/); out.bf.column = {flag:S.f.b7_c5_bailiff, rise:b7Rising() - rb}; }
  /* the board; the shield */
  { const ld = S.loy.doss; talk('b7_c5_board'); out.b = {doss:/Quarter-day board/.test(DLG.b7_c5_board().txt)}; take('b7_c5_board', /Take the board down/); out.b.down = S.f.b7_c5_boardDown; out.b.loy = S.loy.doss - ld; }
  talk('b7_c5_hall'); take('b7_c5_hall', /lend it/); out.b.shield = S.kit.includes('b7_c5_villageshield') && S.f.b7_c5_shield === 1;
  /* the trick: Hold the Square, Haddat teaches */
  talk('b7_c5_square'); out.t = {sp:DLG.b7_c5_square().sp, notNow:has('b7_c5_square', /Not now/), dc:DLG.b7_c5_square().ch[0].check[1]}; made('b7_c5_square', /Drill the square/, 'haddat');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b7_c5_square && S.tricks.b7_c5_square.who, ok:S.f.b7_c5_squareOk, fx:/3×3/.test(TRICKS.b7_c5_square.fx), use:TRICKS.b7_c5_square.use});
  startBattle('b7_c5_road', {}); await wait(60);
  { const u = B.units.find(x => x.id === 'haddat'), f0 = B.units.find(x => x.side === 'e'); const hp0 = f0.hp; AB.t_b7_c5_square.run(u, f0.x, f0.y); await wait(400); out.t.hit = f0.hp < hp0; out.t.dazzle = f0.dazzleUntil === B.round + 1; out.t.offered = trickAbs('haddat').includes('t_b7_c5_square'); }
  B.over = true; B = null; S.scene = 'explore'; S.battle = null; startExplore('b7_c5_street');
  /* dusk: the warning (b7Guides at 6+: the squad set) */
  take('b7_c5_fire', /Wait for dusk/); out.d = {ph:S.f.b7_c5_ph, warned:S.f.b7_c5_warned, children:/Children are running/.test(DLG.b7_c5_dusk().txt), keyNpc:AREAS.b7_c5_street.npcs.find(n => n.id === 'miller').node()};
  talk('b7_c5_key'); const kn = DLG.b7_c5_key(); out.key = {hold:has('b7_c5_key', /hold the village/), slip:has('b7_c5_key', /river path/), notYet:has('b7_c5_key', /Not yet/), html:/The Rising/.test(kn.html || ''), mortalTag:(kn.ch.find(c => /hold the village/.test(c.t)) || {}).tag === 'mortal', warnText:/mortal fight: whoever falls here stays down/.test((kn.ch.find(c => /hold the village/.test(c.t)) || {}).t || ''), doss:/hid us/.test(kn.txt), wenna:/Edur/.test(kn.txt)};
  const snapK = JSON.stringify(S), rk = b7Rising();
  /* ---- key 'slip' first: −2, the running fight, not mortal ---- */
  take('b7_c5_key', /river path/); out.sl = {key:S.f.b7_c5_key, rise:b7Rising() - rk}; runFx(DLG.b7_c5_key().ch[1]); out.sl.once = b7Rising() - rk;
  out.sl.race = has('b7_c5_race', /river path/); take('b7_c5_slip', /mill-race and the river path/); out.sl.startTag = !/mortal/.test((vis('b7_c5_slip_start')[0] || {}).t || '');
  out.sl.fight = await force('b7_c5_slip', {surprise:'p', drop:[4]}); out.sl.blade = S.kit.includes('b7_c5_edurblade'); out.sl.done = S.f.b7_c5_slipDone; out.sl.glow = /light in the sky/.test(DLG.b7_c5_slip_after().txt);
  out.sl.dead = Object.keys(S.dead || {}).filter(k => S.dead[k].ch === 5).length;
  take('b7_c5_slip_after', /riverbank/); out.sl.area = S.area; out.sl.ph = S.f.b7_c5_ph;
  /* ---- back to the key: 'hold', +2, the roof, the mortal fight ---- */
  S = JSON.parse(snapK); save(); setBook('rg'); startExplore('b7_c5_street');
  take('b7_c5_key', /hold the village/); out.h = {key:S.f.b7_c5_key, rise:b7Rising() - rk}; runFx(DLG.b7_c5_key().ch[0]); out.h.once = b7Rising() - rk;
  const rc = DLG.b7_c5_hold().ch.find(c => c.check); out.h.roofOffered = !!rc && rc.rise === true; out.h.roofEdge = rc ? ((edgesFor(rc, 'tangle').find(e => /sapper/.test(e[0])) || [])[1] || 0) : 0; out.h.villageEdge = rc ? !!edgesFor(rc, 'tangle').find(e => /village carries/.test(e[0])) : false;
  const cus0 = S.inv.cusser || 0; made('b7_c5_hold', /in the factor's roof/, 'tangle'); out.h.roof = S.f.b7_c5_roof; out.h.cusser = (S.inv.cusser || 0) - cus0;
  out.h.startMortal = vis('b7_c5_hold_start').some(c => c.tag === 'mortal' && /whoever falls here stays down/.test(c.t)) && /Whoever falls here stays down/.test(DLG.b7_c5_hold_start().txt);
  out.h.def = {mortal:BATTLES.b7_c5_village.mortal === true, stage2:!!BATTLES.b7_c5_village.stage2, survive:BATTLES.b7_c5_village.objective.rounds};
  { const snapH = JSON.stringify(S);
    /* the roof's relief: stage 2 has three foes and the squad moves first; without it, five */
    out.h.fight = await force('b7_c5_village', {surprise:'p', drop:[5]}, 'mirrel');
    out.h.fell = {lastFallen:(S.f.lastFallen || []).join(','), dead:S.dead.mirrel || null, gone:!S.squad.includes('mirrel'), afterNames:/Mirrel did not get up/.test(DLG.b7_c5_hold_after().txt), blade:S.kit.includes('b7_c5_edurblade'), done:S.f.b7_c5_holdDone};
    take('b7_c5_hold_after', /Down to the river/); take('b7_c5_hold_out', /riverbank/); out.h.area = S.area; out.h.ph = S.f.b7_c5_ph;
    /* phase 4: the bank, the fire with the dead named, the lieutenant, the end */
    out.e = {arrive:/lantern/.test(DLG.b7_c5_bank_arrive().txt), fire:/Mirrel/.test(DLG.b7_c5_fire().txt), talk:/Mirrel/.test(DLG.b7_c5_fire_talk().txt), lines:DLG.b7_c5_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, endGated:!has('b7_c5_fire', /First light/)};
    talk('b7_c5_lt3'); out.e.lt3 = S.f.b7_c5_lt3 && /city/.test(DLG.b7_c5_lt3().txt) && /officers and the Edur/.test(DLG.b7_c5_lt3().txt);
    talk('b7_c5_fire'); out.e.html = /The Rising/.test(DLG.b7_c5_fire().html || ''); out.e.rest = has('b7_c5_fire', /rest/); out.e.onward = has('b7_c5_fire', /First light/); out.e.notNow = has('b7_c5_fire', /Not now/);
    out.e.journal = CHAPTERS[5].journal().some(j => /Mirrel fell/.test(j)); out.e.extras = CHAPTERS[5].extras().some(j => /Mirrel did not get up/.test(j));
    talk('b7_c5_doss_bank'); out.e.dossBank = /bread/.test(DLG.b7_c5_doss_bank().txt);
    take('b7_c5_fire', /First light/); out.e.notYet = has('b7_c5_onward', /Not yet/); out.e.shorter = /shorter by one/.test(DLG.b7_c5_onward().txt);
    take('b7_c5_onward', /On, with the column/); await wait(60);
    out.e = Object.assign(out.e, {view, ch:S.chapters[5], lvl:S.lvl, xp:S.xp, rise:b7Rising(), endText:(CHEND[5] || {}).hold && CHEND[5].hold[0]});
    /* the same moment without the roof: stage 2 is the war-leader's whole band, no head start */
    S = JSON.parse(snapH); delete S.f.b7_c5_roof; save(); setBook('rg'); startExplore('b7_c5_street');
    out.h.noRoof = await force('b7_c5_village', {}); out.h.noRoof.dead = Object.keys(S.dead || {}).filter(k => S.dead[k].ch === 5).length; out.h.noRoof.allUp = /Everyone in the Third got up/.test(DLG.b7_c5_hold_after().txt); }
  /* ================= synthetic saves ================= */
  /* no Marrow, no Haddat, no sapper, the Rising quiet, Ch3 'loot': Tallow reads, Ottar teaches, no warning, the sergeant rigs the roof */
  setBook('rg'); S = newStateRG('Syn', 'Other'); delete S.dead.sathi; S.lvl = 18; S.xp = LEVELS[17]; S.squad = ['sgt', 'sathi', 'tallow', 'ottar', 'mehet', 'mirrel']; ['sathi', 'tallow', 'ottar', 'mehet'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.f.b7_c1_key = 'strip'; S.f.b7_c3_key = 'loot'; S.b7 = {rise:2, file:0, hi:2}; S.inv.cusser = 0; S.inv.sharper = 3; S.picksDue = []; save(); startChapter(5); unpick();
  out.y = {renderErr:allPhases(), lines:DLG.b7_c5_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, reader:visReader().id, teacher:DLG.b7_c5_square().sp, boyNoWord:!/burned the rolls/.test(DLG.b7_c5_boy().txt)};
  S.f.b7_c5_ph = 2; S.f.b7_c5_miller = 1; take('b7_c5_fire', /Wait for dusk/); out.y.warned = !!S.f.b7_c5_warned; out.y.late = /before the light's gone/.test(DLG.b7_c5_dusk().txt);
  S.f.b7_c5_key = 'hold'; out.y.roofSharpers = /two sharpers/.test((DLG.b7_c5_hold().ch.find(c => c.check) || {}).t || '') && /You put/.test((DLG.b7_c5_hold().ch.find(c => c.check) || {}).t || '');
  S.inv.sharper = 1; out.y.noRoof = !DLG.b7_c5_hold().ch.some(c => c.check && (!c.req || c.req()));
  /* a save that never played Chapter Three: the boy comes for fear, not word */
  from5({c3:null, rise:3}); out.z = {renderErr:allPhases(), boy:/scared/.test(DLG.b7_c5_boy().txt)};
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, l = r.l || {}, rd = r.r || {}, fi = r.fire || {}, m = r.m || {}, bf = r.bf || {}, b = r.b || {}, t = r.t || {}, d = r.d || {}, key = r.key || {}, sl = r.sl || {}, h = r.h || {}, e = r.e || {}, y = r.y || {}, z = r.z || {}, road = r.road || {}, v = r.v || {};
if (f.area) {
  f.area === 'b7_c5_lane' && f.ch === 5 && f.thread === 't' && f.lvl0 === 18 && /doss/.test(f.squad) && !f.renderErr.length && !f.slip.length && f.title === 'The Village' && f.rise0 === 6 && f.items && f.itemsN === 2 && f.scenes && f.read && f.fire && f.mortalOnly === 'b7_c5_village'
    ? ok(`a --from=5 start opens Chapter Five on the river road at level 18 with Doss, the Rising at 6; every b7_c5 node renders in every phase and key with no leak, no forbidden name, no exclamation mark (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights; the one mortal fight is b7_c5_village)`) : no('fresh ' + JSON.stringify(f).slice(0, 1200));
}
f.ph === 1 && l.eastGated && l.orders === 1 && l.sort && l.tavern && l.noFire && l.scoutsNpc && l.ambushEdge === 2 && road.started && road.foes === 5 && road.after === 'b7_c5_road_after' && road.done === 1 && l.boyNpc && l.boyWord && v.area === 'b7_c5_street' && v.ph === 2 && v.arrive
  ? ok('the river road: the lieutenant (the funnel), the marines\' news of the tavern village (heard only), no fire on the march; the scouts forced (5 foes); the boy (the burned rolls on ledger); into the village, phase 2') : no('road ' + JSON.stringify([f.ph, l, road, v]));
rd.deckChoice && rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.herald === 3 && rd.notNow && rd.words && rd.cardNode === 'The Deck of Dragons' && rd.back === 'b7_c5_fire' ? ok(`the factor's cellar is the first halt: the Deck offered; Marrow reads (${rd.card}; the Herald leans the pool); back to b7_c5_fire`) : no('reading ' + JSON.stringify(rd));
fi.again && fi.rest && fi.talk && fi.notNow && fi.html && fi.duskGated && fi.rested && fi.talkLines === fi.here && fi.duskOpen ? ok(`the fire in the cellar: an again line, the Rising box, a rest (wounds close), the talk (a line each, ${fi.talkLines}), Not now; dusk waits on the mill-woman`) : no('fire ' + JSON.stringify(fi));
m.said === 1 && m.bailiff && m.lane === 1 && m.rise && m.edge === 2 && m.dossEdge === 3 && m.short === 1 && bf.started && bf.surprise === 'p' && bf.foes === 4 && bf.after === 'b7_c5_bailiff_after' && bf.done === 1 && bf.letter && bf.village.flag === 'village' && bf.village.rise === 1 && bf.village.once === 1 && bf.column.flag === 'column' && bf.column.rise === 0
  ? ok('the mill-woman and the bailiff: the well\'s rise:true check (Doss +3, "The Rising" +2), the short way (surprise); the bailiff forced; handed to the village (the Rising +1, once) or tied for the column (0)') : no('bailiff ' + JSON.stringify([m, bf]));
b.doss && b.down === 1 && b.loy === 1 && b.shield ? ok('the quarter-day board (Doss reads it; down the well, Doss +1); the village\'s old shield from the meeting house') : no('board ' + JSON.stringify(b));
t.sp === 'Haddat' && t.notNow && t.dc === 17 && t.who === 'haddat' && t.ok === 1 && t.fx && t.use === 'chapter' && t.hit && t.dazzle && t.offered ? ok('the trick: Hold the Square, a ✦ wits 17 check with Haddat; in a fight a 3×3 blow that leaves what it catches reeling (Blue Fire\'s mechanics)') : no('trick ' + JSON.stringify(t));
d.ph === 3 && d.warned === 1 && d.children && d.keyNpc === 'b7_c5_key' && key.hold && key.slip && key.notYet && key.html && key.mortalTag && key.warnText && key.doss && key.wenna ? ok('dusk: the Rising at 6 (b7Guides): the children warn the Third in time; the key with the mill-woman: hold (signposted: "a mortal fight: whoever falls here stays down"), slip, Not yet; the Rising shown') : no('dusk/key ' + JSON.stringify([d, key]));
sl.key === 'slip' && sl.rise === -2 && sl.once === -2 && sl.race && sl.startTag && sl.fight.started && !sl.fight.mortal && sl.fight.obj && sl.fight.surprise === 'p' && sl.fight.foes === 4 && sl.fight.stage2 && sl.fight.inStage2 && sl.fight.after === 'b7_c5_slip_after' && sl.blade && sl.done === 1 && sl.glow && sl.dead === 0 && sl.area === 'b7_c5_bank' && sl.ph === 4
  ? ok(`key slip: the Rising −2 (once); the river path (not mortal; survive, a head start, the bailiff's extra foe dropped) and the ford forced; the Edur blade; the light over the trees; the riverbank`) : no('slip ' + JSON.stringify(sl));
h.key === 'hold' && h.rise === 2 && h.once === 2 && h.roofOffered && h.roofEdge === 3 && h.villageEdge && h.roof === 1 && h.cusser === -1 && h.startMortal && h.def.mortal && h.def.stage2 && h.def.survive === 4
  ? ok('key hold: the Rising +2 (once); the roof (a rise:true check, Tangle +3, the village carries it up on ledger) spends the cusser; the street\'s start warns again; b7_c5_village is mortal, holds four rounds, then the square') : no('hold ' + JSON.stringify(h).slice(0, 900));
const hf = h.fight || {}, hl = h.fell || {}, nr = h.noRoof || {};
hf.started && hf.mortal && hf.obj && hf.surprise === 'p' && hf.foes === 5 && hf.stage2 && hf.inStage2 && hf.foes2 === 3 && hf.surprise2 === 'p' && hf.title2 === 'The square by the mill' && hl.lastFallen === 'mirrel' && hl.dead && hl.dead.ch === 5 && hl.dead.where === 'The square by the mill' && hl.gone && hl.afterNames && hl.blade && hl.done === 1 && h.area === 'b7_c5_bank' && h.ph === 4
  ? ok('the mortal fight: the street (the head start; the bailiff\'s extra foe dropped) and the square (the roof down: three foes, the squad first); Mirrel falls and stays down, S.dead.mirrel = {ch:5, where:"The square by the mill"}; named after; the Edur blade') : no('mortal ' + JSON.stringify([hf, hl, h.area, h.ph]));
nr.started && nr.foes === 6 && nr.foes2 === 5 && !nr.surprise2 && nr.dead === 0 && nr.allUp ? ok('the same moment with no roof and no warning: the street at six, the square at the war-leader\'s whole band (five), nobody falls when nobody is down') : no('no roof ' + JSON.stringify(nr));
e.arrive && e.fire && e.talk && e.lines === e.here + 1 && e.endGated && e.lt3 && e.html && e.rest && e.onward && e.notNow && e.journal && e.extras && e.dossBank && e.notYet && e.shorter && e.view === 'end' && e.ch === 'hold' && e.lvl >= 18 && e.endText === 'The square by the mill'
  ? ok(`the riverbank: the dead named at the fire (and a gap in the ring), the lieutenant (the push for the city; the Letherii army rumour, one line), the end at level ${e.lvl} (${e.xp} xp), the Rising at ${e.rise}`) : no('end ' + JSON.stringify(e));
y.renderErr && !y.renderErr.length && y.lines === y.here && y.reader === 'tallow' && y.teacher === 'Ottar' && y.boyNoWord && !y.warned && y.late && y.roofSharpers && y.noRoof ? ok(`a synthetic save (no Marrow, no Haddat, no sapper; the Rising 2, strip and loot): every node renders, a line each (${y.lines}), Tallow reads, Ottar teaches, no warning at dusk, the sergeant can rig the roof with the transport's two sharpers, and not with one`) : no('synthetic ' + JSON.stringify(y));
z.renderErr && !z.renderErr.length && z.boy ? ok('a save that never played Chapter Three: every node renders; the boy comes because the village is afraid') : no('no ch3 ' + JSON.stringify(z));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b7ch5: FAIL (${bad.length})` : 'b7ch5: all ok'); process.exit(bad.length ? 1 : 0);
