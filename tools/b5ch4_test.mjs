// Book Five, Chapter 4 (High Fort, src/84_b5_ch4.js): the march (the ford and the river carry, the hill's gifts), the first halt at High
// Fort and the reading, the posting (and the noted company on a Ch3 'warn'), the fire (no game) and the pay desk, the trick (taught, and
// its battle half: the pitch burns), the cadre-master who does not link Perrit, the view (Moroch far off), the night patrol in Dry Gully,
// the battle (the eleven die; the wraiths with the garrison, both grounds), the key both ways (hold: the demon to the horns, the
// wounded, the word, b5Disarm; run: the wood, the wolves, the road south armed), the roster at the fire with Ruuk waiting, and the
// chapter's end; from a fresh start of Chapter Four after a 'watch' Chapter Three with Ruuk walking, from a 'warn' Chapter Three, and from
// a --from=4 style save (Brune walks, Ruuk waits), where every node must still render.
// Usage: node tools/b5ch4_test.mjs   (build first; exit 1 on a failure)
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
  const missed = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); runFx(c); settleRoll({who, stat:c.check[0], tier:'fail', ok:false, pass:false, margin:-6, nat:3}, c); talk(c.fail); return c; };
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const force = async (id, also) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.obj = !!B.def.objective; res.dark = !!B.def.dark; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).map(u => u.kind).join(','); res.waves = (B.def.waves || []).length; res.kinds = B.units.filter(u => u.side === 'e').map(u => u.kind).join(',');
    if (also) await also(res);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').map(u => u.kind).join(','); res.obj2 = !!B.def.objective; res.allies2 = B.units.filter(u => u.ally).length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b5_c4_/.test(k));
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words'); else if (/Kettle|Green Jackets|crossbow|last mage|Lilac|Trull|Hanradi|Fear Sengar/i.test(n.txt)) errs.push(k + ': a hard-limit word'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const mk = (k3, name, ruuk) => { setBook('mt'); S = newStateMT(name); S.lvl = 5; S.xp = LEVELS[4]; S.chapters = {1:'pay', 2:'dead', 3:k3}; S.f.b5_c1_key = 'pay'; S.f.b5_c2_key = 'dead'; S.f.b5_c3_key = k3; S.f.b5_trate = 1; S.f.b5_fentReach = 1;
    if (k3 === 'warn') { S.f.b5_noted = 1; S.f.b5_c3_runner = 'tobet'; }
    if (ruuk) { b5Join('ruuk'); shut(); } S.picksDue = []; save(); startChapter(4); };
  const L = () => ({tobet:S.loy.tobet, thegg:S.loy.thegg, perrit:S.loy.perrit, ammet:S.loy.ammet, ruuk:S.loy.ruuk ?? null});
  try {
  /* ================= a fresh Chapter Four, after a 'watch' Chapter Three, with Ruuk walking ================= */
  mk('watch', 'Fresh', true);
  out.f = {area:S.area, ch:S.chapter, title:CHAPTERS[4].title, num:CHAPTERS[4].number, renderErr:renderAll(), roster:ROSTER_FIRES.mt[4].includes('b5_c4_fire'), reg:BOOKSNAP.mt && !!BOOKSNAP.mt.ch[4], ruuk:b5In('ruuk'), keys:B5KEYS[4].join()};
  talk('b5_c4_start'); out.f.ph = S.f.b5_c4_ph; out.f.startAgain = typeof DLG.b5_c4_start().again === 'function'; out.f.ruukGuide = /The map lies/.test(DLG.b5_c4_start().txt);
  talk('b5_c4_ennic_road'); out.f.ennicRoad = S.f.b5_c4_ennicRoad === 1 && has('b5_c4_ennic_road', /Not now/);
  out.f.guideShown = AREAS.b5_c4_road.npcs.find(n => n.id === 'guide').show();
  /* the march: the north edge is shut until the ford; the ford and the river carry; the hill */
  talk('b5_c4_north'); out.f.northLocked = !has('b5_c4_north', /On, to High Fort/) && has('b5_c4_north', /Not now/);
  talk('b5_c4_ford'); out.f.carry = {flag:S.f.b5_ruukCarried, txt:/Thegg picks him up/.test(DLG.b5_c4_ford().txt), check:vis('b5_c4_ford').find(x => /Across/.test(x.t)).check.join(':'), notNow:has('b5_c4_ford', /Not now/)};
  made('b5_c4_ford', /Across/, 'thegg'); out.f.crossed = {flag:S.f.b5_c4_crossed, node:S.node};
  talk('b5_c4_hill'); out.f.hill = {stone:S.f.b5_c4_stone, herb:S.f.b5_c4_herb, txt:/It does not tell anything/.test(DLG.b5_c4_hill().txt) && /For the bowels/.test(DLG.b5_c4_hill().txt)};
  talk('b5_c4_north'); take('b5_c4_north', /On, to High Fort/); out.f.arrive = {area:S.area, node:S.node, ph:S.f.b5_c4_ph, tileChoice:has('b5_c4_arrive', /tiles/), noBattalion:/battalion is not at High Fort/.test(DLG.b5_c4_arrive().txt), queen:/Queen's Battalion and the Quillas Brigade/.test(DLG.b5_c4_arrive().txt), again:!!DLG.b5_c4_arrive().again};
  /* the reading at the first halt */
  talk('b5_c4_tiles'); const tk = DLG.b5_c4_tiles(); out.f.tilesNotNow = tk.ch.some(c => /Not now/.test(c.t)); runFx(tk.ch.find(c => /lay them/.test(c.t)));
  out.f.tiles = {drawn:S.f.b5_c4_drawn, reader:S.f.b5_c4_reader, card:S.card, inPool:B5POOL[4].includes(S.card), scene:B5READ[4].scene, lean:B5POOL[4].filter(x => x === 'b5t_wall').length, say:/The tiles like a wall/.test(tk.txt), table:!!READTABLE['mt:4']};
  talk('b5_c4_card'); const cd = DLG.b5_c4_card(); out.f.card = {sp:cd.sp, back:cd.ch[0].go}; talk('b5_c4_tiles_done'); out.f.tilesDone = has('b5_c4_tiles_done', /Back to the rampart/);
  /* the posting (no 'noted' line after 'watch'); the rations check */
  talk('b5_c4_posting'); out.f.posting = {flag:S.f.b5_c4_posted, west:/westernmost rampart/.test(DLG.b5_c4_posting().txt), noted:/as far from the royals as the fort has/.test(DLG.b5_c4_posting().txt), notNow:has('b5_c4_posting', /Not now/), again:!!DLG.b5_c4_posting().again};
  { const sv = S.inv.salve; made('b5_c4_posting', /rations/, 'sgt'); out.f.rations = {flag:S.f.b5_c4_rations, salve:S.inv.salve - sv}; }
  /* the trick: the Brand-Pot */
  talk('b5_c4_oldhand'); out.f.handNotNow = has('b5_c4_oldhand', /Not now/); const bc = vis('b5_c4_oldhand').find(x => /Brand-Pot/.test(x.t)); out.f.brandCheck = bc.check.join(':') + ':' + bc.trick;
  out.f.brandEdges = ['ruuk', 'brune', 'tobet', 'thegg'].map(id => (bc.edges(id).filter(Boolean)[0] || [0, 0])[1]).join(',');
  made('b5_c4_oldhand', /Brand-Pot/, 'tobet'); out.f.trick = {who:S.tricks && S.tricks.b5_c4_brand && S.tricks.b5_c4_brand.who, ok:S.f.b5_c4_brandOk, pot:S.kit.includes('b5_c4_pitchpot'), notSorcery:!TRICKS.b5_c4_brand.sorcery && /Not sorcery/.test(TRICKS.b5_c4_brand.fx), again:!!DLG.b5_c4_oldhand_again().again, moroch:/Moroch Nevath/.test(DLG.b5_c4_oldhand_again().txt)};
  /* the cadre-master: Perrit is not linked; the Grass Jacket; the straggler from Trate (talk only); the view (Moroch far off) */
  out.f.cadreShown = AREAS.b5_c4_rampart.npcs.find(n => n.id === 'cadre').show(); talk('b5_c4_cadre'); const ct = DLG.b5_c4_cadre().txt; out.f.cadre = {unlinked:S.f.b5_c4_unlinked, eleven:/eleven who have/.test(ct), notLast:!/last/.test(ct)};
  talk('b5_c4_grass'); made('b5_c4_grass', /What's out there/, 'tobet'); out.f.grass = {word:S.f.b5_c4_grassWord, wraiths:/Wraiths first/.test(DLG.b5_c4_grass_ok().txt), notGreen:!/Green Jacket/.test(DLG.b5_c4_grass().txt)};
  talk('b5_c4_straggler'); const st = DLG.b5_c4_straggler().txt; out.f.trate = {flag:S.f.b5_c4_trate, fallen:/From the sea, in a night/.test(st), limits:!/lighthouse|Rhulad|crossroads|Iron Bars|Emperor/i.test(st), dead:/carried the dead out/.test(st)};
  talk('b5_c4_view'); const vw = DLG.b5_c4_view(); out.f.view = {moroch:S.f.b5_c4_moroch, scene:vw.scene, dresh:/Dresh ballistae/.test(vw.txt), stone:/small fort of stone/.test(vw.txt), noName:!/Moroch/.test(vw.txt)};
  talk('b5_c4_gate'); out.f.gate = /fort's full/.test(DLG.b5_c4_gate().txt);
  /* the fire: no game, a rest, the pay desk, the squad's talk, the roster, the way on */
  talk('b5_c4_fire'); const fy = DLG.b5_c4_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b5_c4_fire', /rest/), pay:has('b5_c4_fire', /pay desk/), talk:has('b5_c4_fire', /Talk with the squad/), patrol:has('b5_c4_fire', /Dry Gully/), sleep:has('b5_c4_fire', /wait for the dawn/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), noGame:!fy.ch.some(c => /bones|tiles game|wager|game/i.test(c.t)), roster:fy.ch.some(c => /roster|Who walks/i.test(c.t + (c.tag || '')))};
  take('b5_c4_fire', /Let the squad rest/); out.f.rested = S.f.b5_c4_rest2;
  const ft = DLG.b5_c4_fire_talk().txt; out.f.talk = {lines:ft.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ruuk:/No birds on the pass/.test(ft), carried:/He carried me/.test(ft), perrit:/Eleven on one thread/.test(ft)};
  /* the pay desk */
  S.silver = Math.max(S.silver, 30); talk('b5_c4_clerk'); out.f.clerk = /nothing to buy at High Fort/.test(DLG.b5_c4_clerk().txt) && /still write it/.test(DLG.b5_c4_clerk().txt);
  talk('b5_c4_pay'); const pd = DLG.b5_c4_pay(); out.f.desk = {html:/The squad/.test(pd.html || ''), ten:pd.ch.some(c => /docks on/.test(c.t)), notNow:/Not now/.test(pd.ch[pd.ch.length - 1].t), back:pd.ch[pd.ch.length - 1].go, surprise:/still works, even here/.test(pd.txt)};
  const d0 = b5Debt('ammet'), s1 = S.silver; take('b5_c4_pay', /on Ammet's debt/); out.f.desk.paid = d0 - b5Debt('ammet'); out.f.desk.spent = s1 - S.silver;
  /* the night patrol in Dry Gully */
  take('b5_c4_fire', /Dry Gully/); out.f.patrol = S.f.b5_c4_patrol; take('b5_c4_patrol', /sally-steps/); out.f.sally = has('b5_c4_sally', /out to the gully/) && has('b5_c4_sally', /Not now/);
  take('b5_c4_sally', /out to the gully/); out.f.gully = {area:S.area, dark:!!AREAS.b5_c4_gully.dark, node:S.node};
  talk('b5_c4_gully_back'); out.f.gullyBackOpen = has('b5_c4_gully_back', /back to the rampart/);
  talk('b5_c4_tracks'); out.f.tracks = {notNow:has('b5_c4_tracks', /Not now/), check:vis('b5_c4_tracks').find(x => /Through the brush/.test(x.t)).check.join(':')};
  out.f.gfight = await force('b5_c4_gully'); out.f.gfight.done = S.f.b5_c4_gullyDone;
  { const sg = S.silver; take('b5_c4_gully_back', /back to the rampart/); out.f.reported = {area:S.area, node:S.node, docks:S.silver - sg}; }
  /* the night, and dawn: the eleven */
  talk('b5_c4_fire'); take('b5_c4_fire', /wait for the dawn/); out.f.night = {flag:S.f.b5_c4_night, notNow:has('b5_c4_night', /Not now/)};
  take('b5_c4_night', /Dawn/); const dw = DLG.b5_c4_dawn().txt; out.f.dawn = {ph:S.f.b5_c4_ph, mages:S.f.b5_c4_mages, eleven:/Every one of the eleven dies/.test(dw), door:/door slammed in a long corridor/.test(dw), knew:/I knew two of them/.test(dw), notLast:!/last/.test(dw), notNow:has('b5_c4_dawn', /Not now/), scene:DLG.b5_c4_dawn().scene};
  take('b5_c4_dawn', /To the crest/); out.f.crest = {node:S.node, check:vis('b5_c4_crest').find(x => /Brand-pots along the crest/.test(x.t)).check.join(':'), notNow:has('b5_c4_crest', /Not now/)};
  /* the wraiths, with the garrison; the Brand-Pot in battle */
  out.f.wr = await force('b5_c4_wraiths', async res => { const u = B.units.find(x => x.side === 'p' && x.id === 'tobet'), e = B.units.find(x => x.side === 'e');
    res.offered = typeof trickOk === 'function' && trickOk(u, AB.t_b5_c4_brand); const f0 = B.fires.length; AB.t_b5_c4_brand.run(u, e.x, e.y); await new Promise(r => setTimeout(r, 900)); res.fires = B.fires.length - f0; res.pitch = B.fires.some(f => f.b5pitch);
    const ally = B.units.find(x => x.ally); res.allyHp = ally && ally.maxhp; res.allyBase = FOES.b5_c4_garrison.hp; });
  out.f.wrDone = S.f.b5_c4_wraithsDone;
  const tf = DLG.b5_c4_fire_talk().txt; out.f.talk3 = {perrit:/I knew two of them/.test(tf)};
  take('b5_c4_wraiths_after', /helm/); out.f.helm = S.kit.includes('b5_c4_helm') && ITEMS.b5_c4_helm.ac === 1;
  out.f.key = {node:S.node, hold:has('b5_c4_key', /holds the west rampart/), run:has('b5_c4_key', /West, with them/), notYet:has('b5_c4_key', /Not yet/), ruukTxt:/In the trees I can take you anywhere/.test(DLG.b5_c4_key().txt), theggTxt:/I ran, once/.test(DLG.b5_c4_key().txt)};
  const snap = JSON.stringify(S);
  /* ================= key: hold ================= */
  { const l0 = L(); S.kit.push('b5_c3_spear'); S.gear.tobet = S.gear.tobet || {}; take('b5_c4_key', /holds the west rampart/); const l1 = L();
    out.h = {key:S.f.b5_c4_key, loy:Object.fromEntries(Object.keys(l1).map(k => [k, (l1[k] ?? 0) - (l0[k] ?? 0)])), node:S.node, ruukTxt:/We could have been in the trees/.test(DLG.b5_c4_hold().txt), notNow:has('b5_c4_hold', /Not now/)};
    out.h.fight = await force('b5_c4_demon'); out.h.fight.done = S.f.b5_c4_demonDone; out.h.tooth = S.kit.includes('b5_c4_wolftooth') && ITEMS.b5_c4_wolftooth.stat.might === 1; out.h.wolves = /wolves are going among the wounded/.test(DLG.b5_c4_demon_after().txt);
    take('b5_c4_demon_after', /Our wounded/); out.h.wounded = {node:S.node, check:vis('b5_c4_wounded').find(x => /Carry them in/.test(x.t)).check.join(':'), notNow:has('b5_c4_wounded', /Not now/)};
    /* "Not now" between the steps: the fire takes the battle on again */
    startExplore('b5_c4_rampart'); talk('b5_c4_fire'); out.h.fireOn = has('b5_c4_fire', /On, along the rampart/); take('b5_c4_fire', /On, along the rampart/); out.h.resumed = S.node;
    made('b5_c4_wounded', /Carry them in/, 'thegg'); out.h.carried = S.f.b5_c4_wounded;
    take('b5_c4_wounded_in', /On/); const wd = DLG.b5_c4_word().txt; out.h.word = {frontier:/And the whole frontier with it/.test(wd), taken:/The Queen is taken, and the Prince/.test(wd), terms:/disarmed, and let go/.test(wd), noDelegation:!/delegation/.test(wd)};
    take('b5_c4_word', /To the pile/); out.h.pile = {disarmed:S.f.b5_disarmed, stash:(S.f.b5_stash || []).includes('b5_c3_spear'), spearGone:!S.kit.includes('b5_c3_spear'), helm:S.kit.includes('b5_c4_helm'), pot:S.kit.includes('b5_c4_pitchpot'), scene:DLG.b5_c4_pile().scene};
    take('b5_c4_pile', /South/); out.h.south = {notYet:has('b5_c4_south', /Not yet/), noMoroch:!/Moroch/.test(DLG.b5_c4_south().txt)};
    take('b5_c4_south', /South, to wherever/); await wait(60); out.h.end = {view, ch:S.chapters[4], lvl:S.lvl}; out.h.extras = CHAPTERS[4].extras().length; out.h.journal = CHAPTERS[4].journal().length; out.h.endRead = /surrendered/.test(CHAPTERS[4].journal().join(' ')); }
  /* ================= key: run, from the same moment ================= */
  { S = JSON.parse(snap); save(); startExplore('b5_c4_rampart'); G.said = {}; talk('b5_c4_key');
    const l0 = L(); take('b5_c4_key', /West, with them/); const l1 = L();
    out.n = {key:S.f.b5_c4_key, loy:Object.fromEntries(Object.keys(l1).map(k => [k, (l1[k] ?? 0) - (l0[k] ?? 0)])), node:S.node, theggTxt:/I do not run\. I ran\./.test(DLG.b5_c4_run().txt), notNow:has('b5_c4_run', /Not now/)};
    take('b5_c4_run', /Into the trees/); out.n.wood = {area:S.area, dark:!!AREAS.b5_c4_wood.dark, node:S.node};
    talk('b5_c4_wood_edge'); out.n.edgeLocked = !has('b5_c4_wood_edge', /Out, to the road/) && has('b5_c4_wood_edge', /Not now/);
    talk('b5_c4_wolfsign'); out.n.sign = {notNow:has('b5_c4_wolfsign', /Not now/), check:vis('b5_c4_wolfsign').find(x => /downwind/.test(x.t)).check.join(':'), wounded:/wolves are at the wounded/.test(DLG.b5_c4_wolfsign().txt), noBasin:!/basin|B'nagga/.test(DLG.b5_c4_wolfsign().txt)};
    out.n.fight = await force('b5_c4_wolves'); out.n.fight.done = S.f.b5_c4_wolvesDone; out.n.tooth = S.kit.includes('b5_c4_wolftooth');
    take('b5_c4_wood_edge', /Out, to the road/); const ro = DLG.b5_c4_road_out().txt; out.n.road = {node:S.node, armed:!S.f.b5_disarmed, frontier:/And the whole frontier with it/.test(ro), column:/without swords/.test(ro), notYet:has('b5_c4_road_out', /Not yet/)};
    take('b5_c4_road_out', /ahead of the column/); await wait(60); out.n.end = {view, ch:S.chapters[4], lvl:S.lvl, armed:!S.f.b5_disarmed}; }
  /* ================= after a 'warn' Chapter Three, without Ruuk: the noted company, Perrit's line, the scout guides ================= */
  { mk('warn', 'Warn', false); talk('b5_c4_start'); out.w = {scoutGuide:/Faraed scout from the Landing/.test(DLG.b5_c4_start().txt), guide:AREAS.b5_c4_road.npcs.find(n => n.id === 'guide').show()};
    talk('b5_c4_ford'); out.w.noCarry = !S.f.b5_ruukCarried; talk('b5_c4_hill'); out.w.noGifts = !S.f.b5_c4_stone && !S.f.b5_c4_herb;
    S.f.b5_c4_ford = 1; S.f.b5_c4_ph = 2; startExplore('b5_c4_rampart'); talk('b5_c4_posting'); out.w.noted = /as far from the royals as the fort has/.test(DLG.b5_c4_posting().txt);
    out.w.fireTalk = /The Sixth was right/.test(DLG.b5_c4_fire_talk().txt);
    S.f.b5_c4_ph = 3; S.f.b5_c4_mages = 1; out.w.dawnNoKnew = !/I knew two of them/.test(DLG.b5_c4_dawn().txt); out.w.fireTalk3 = /I wrote it down, Sergeant, the night the runner went/.test(DLG.b5_c4_fire_talk().txt);
    out.w.journal = CHAPTERS[4].journal().some(x => /noted company/.test(x)); }
  /* ================= a --from=4 style save (Brune walks, Ruuk waits): every node renders, phase by phase, both keys; the roster swaps Ruuk in ================= */
  { setBook('mt'); S = newStateMT('Syn'); S.lvl = 5; S.xp = LEVELS[4]; S.f.b5_c1_key = 'swim'; S.f.b5_c2_key = 'salvage'; S.f.b5_c3_key = 'warn'; S.chapters = {1:'swim', 2:'salvage', 3:'warn'}; S.f.b5_bruneDone = 1; S.squad.push('brune'); S.f.b5_ruukDone = 2; S.camp = ['ruuk']; S.picksDue = []; migrate(S); save(); startChapter(4);
    const errs = []; [[1, null], [2, null], [3, null], [3, 'hold'], [3, 'run']].forEach(([ph, k]) => { S.f.b5_c4_ph = ph; S.f.b5_c4_key = k; errs.push(...renderAll().map(e => `ph${ph}${k || ''} ${e}`)); });
    S.f.b5_c4_ph = 2; S.f.b5_c4_key = null; startExplore('b5_c4_rampart'); talk('b5_c4_fire'); const rc = vis('b5_c4_fire').find(c => /roster|Who walks/i.test(c.t + (c.tag || '')));
    out.y = {renderErr:errs, brune:b5In('brune'), ruukWaits:b5Waiting('ruuk'), roster:!!rc, offers:b5Offers().includes('ruuk')};
    b5SwapIn('ruuk'); shut(); out.y.swapped = b5In('ruuk') && b5Waiting('brune'); errs.push(...renderAll().map(e => `ruuk ${e}`)); out.y.renderErr2 = renderAll(); }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, h = r.h || {}, n = r.n || {}, w = r.w || {}, y = r.y || {};
if (f.area) {
  f.area === 'b5_c4_road' && f.ch === 4 && f.title === 'High Fort' && f.num === 'Four' && !f.renderErr.length && f.roster && f.reg && f.ruuk && f.keys === 'hold,run' ? ok('a fresh Chapter Four opens on the forest road, Ruuk walking; registered for Book Five; every b5_c4 node renders') : no('fresh ' + JSON.stringify(f).slice(0, 600));
  f.ph === 1 && f.startAgain && f.ruukGuide && f.ennicRoad && !f.guideShown && f.northLocked && f.carry.flag === 1 && f.carry.txt && f.carry.check === 'might:12' && f.carry.notNow && f.crossed.flag === 1 && f.hill.stone === 1 && f.hill.herb === 1 && f.hill.txt ? ok('the march: Ruuk guides; the north is shut until the ford; Thegg carries Ruuk over unasked (b5_ruukCarried); the hill: a stone for Perrit, a herb for Ammet') : no('march ' + JSON.stringify([f.ph, f.ruukGuide, f.ennicRoad, f.guideShown, f.northLocked, f.carry, f.crossed, f.hill]));
  f.arrive.area === 'b5_c4_rampart' && f.arrive.node === 'b5_c4_arrive' && f.arrive.ph === 2 && f.arrive.tileChoice && f.arrive.noBattalion && f.arrive.queen && f.arrive.again && f.tilesNotNow && f.tiles.drawn === 1 && f.tiles.reader === 'perrit' && f.tiles.inPool && f.tiles.scene === 'b5_highfort' && f.tiles.lean === 3 && f.tiles.say && f.tiles.table && f.card.sp === 'The Tiles of the Holds' && f.card.back === 'b5_c4_tiles_done' && f.tilesDone ? ok(`High Fort, no battalion; the first halt and the reading on the west rampart (Perrit lays the tiles: ${f.tiles.card}; the Wall leans ×3; "Not now" offered)`) : no('arrive/tiles ' + JSON.stringify([f.arrive, f.tiles, f.card, f.tilesDone]));
  f.posting.flag && f.posting.west && !f.posting.noted && f.posting.notNow && f.posting.again && f.rations.flag && f.rations.salve === 1 ? ok('the posting: the westernmost rampart under the tower (no "noted" line after watch); the rations (Guile 13): bread and a salve') : no('posting ' + JSON.stringify([f.posting, f.rations]));
  f.handNotNow && f.brandCheck === 'wits:16:b5_c4_brand' && f.brandEdges === '1,1,1,-1' && f.trick.who === 'tobet' && f.trick.ok && f.trick.pot && f.trick.notSorcery && f.trick.again && f.trick.moroch ? ok('the trick: the Brand-Pot, ✦ Wits 16 (Ruuk +1, Brune +1, Tobet +1, Thegg −1), not sorcery; the brand-pot item; the old hand names the Prince\'s Finadd once') : no('trick ' + JSON.stringify([f.brandCheck, f.brandEdges, f.trick]));
  f.cadreShown && f.cadre.unlinked && f.cadre.eleven && f.cadre.notLast && f.grass.word && f.grass.wraiths && f.grass.notGreen && f.trate.flag && f.trate.fallen && f.trate.limits && f.trate.dead && f.view.moroch === 1 && f.view.scene === 'b5_c4_field' && f.view.dresh && f.view.stone && f.view.noName && f.gate ? ok('the cadre-master does not link Perrit; a Grass Jacket\'s word; Trate\'s fall as a straggler\'s talk only (and the Ch2 dead read); the field from the firing step (Moroch far off, unnamed there: b5_c4_moroch)') : no('rampart ' + JSON.stringify([f.cadreShown, f.cadre, f.grass, f.trate, f.view, f.gate]));
  f.fire.again && f.fire.rest && f.fire.pay && f.fire.talk && f.fire.patrol && f.fire.sleep && f.fire.notNow && f.fire.noGame && f.fire.roster && f.rested === 1 && f.talk.lines === f.talk.here && f.talk.ruuk && f.talk.carried && f.talk.perrit && f.clerk && f.desk.html && f.desk.ten && f.desk.notNow && f.desk.back === 'b5_c4_fire' && f.desk.surprise && f.desk.paid === 10 && f.desk.spent === 10 ? ok('the fire: an again line, a rest, the pay desk (nothing to buy; paying still works, with surprise), the squad\'s talk (Ruuk remembers the carry), the roster, no game, the way on with Not now') : no('fire ' + JSON.stringify([f.fire, f.rested, f.talk, f.clerk, f.desk]));
  f.patrol === 1 && f.sally && f.gully.area === 'b5_c4_gully' && f.gully.dark && f.gully.node === 'b5_c4_gully_arrive' && f.gullyBackOpen && f.tracks.notNow && f.tracks.check === 'wits:14' && f.gfight.started && f.gfight.dark && /b5_unblooded/.test(f.gfight.kinds) && /b5_edur/.test(f.gfight.kinds) && f.gfight.after === 'b5_c4_gully_after' && f.gfight.done && f.reported.area === 'b5_c4_rampart' && f.reported.node === 'b5_c4_reported' && f.reported.docks === 8 ? ok('the night patrol in Dry Gully (dark): unblooded and a warrior, a forced win; the garrison\'s rate, 8 docks') : no('gully ' + JSON.stringify([f.patrol, f.sally, f.gully, f.tracks, f.gfight, f.reported]));
  f.night.flag && f.night.notNow && f.dawn.ph === 3 && f.dawn.mages && f.dawn.eleven && f.dawn.door && f.dawn.knew && f.dawn.notLast && f.dawn.notNow && f.dawn.scene === 'b5_c4_lightning' && f.crest.node === 'b5_c4_crest' && f.crest.check === 'wits:13' && f.crest.notNow ? ok('the night; dawn: the sorcery comes back and every one of the eleven dies; Perrit, unlinked, feels it go through the Hold (and knew two, after watch); never "the last"') : no('dawn ' + JSON.stringify([f.night, f.dawn, f.crest]));
  f.wr.started && f.wr.allies === 'b5_c4_garrison,b5_c4_garrison' && f.wr.waves === 1 && /b5_wraith/.test(f.wr.kinds) && f.wr.stage2 && f.wr.inStage2 && f.wr.allies2 === 2 && /b5_unblooded/.test(f.wr.foes2 || '') && f.wr.after === 'b5_c4_wraiths_after' && f.wrDone && f.wr.allyHp > f.wr.allyBase ? ok(`the wraiths over the west rampart, with the garrison (grown: ${f.wr.allyHp} health), a wave; the bastion's foot (${f.wr.foes2})`) : no('wraiths ' + JSON.stringify([f.wr, f.wrDone]));
  f.wr.offered && f.wr.fires >= 4 && f.wr.pitch ? ok(`the Brand-Pot on the rampart: offered once a fight, thrown, the pitch burns (${f.wr.fires} tiles)`) : no('trick in battle ' + JSON.stringify(f.wr));
  f.talk3.perrit && f.helm && f.key.node === 'b5_c4_key' && f.key.hold && f.key.run && f.key.notYet && f.key.ruukTxt && f.key.theggTxt ? ok('the break: the Grass Jacket\'s helm (+1 armour); the key both ways and Not yet; Ruuk and Thegg have their say') : no('key ' + JSON.stringify([f.talk3, f.helm, f.key]));
}
h.key === 'hold' && JSON.stringify(h.loy) === JSON.stringify({tobet:0, thegg:1, perrit:0, ammet:1, ruuk:-1}) && h.ruukTxt && h.notNow && h.fight && h.fight.started && /b5_demon/.test(h.fight.kinds) && h.fight.stage2 && h.fight.inStage2 && h.fight.obj2 && /b5_demon/.test(h.fight.foes2 || '') && h.fight.done && h.tooth && h.wolves ? ok('key hold: Thegg +1, Ammet +1, Ruuk −1 ("We could have been in the trees"); the demon inside the rampart, the back slope held until the horns (survive); the tooth; the wolves among the wounded, one line') : no('hold ' + JSON.stringify(h).slice(0, 700));
h.wounded && h.wounded.check === 'might:13' && h.wounded.notNow && h.fireOn && h.resumed === 'b5_c4_wounded' && h.carried === 1 && h.word && h.word.frontier && h.word.taken && h.word.terms && h.word.noDelegation && h.pile && h.pile.disarmed === 1 && h.pile.stash && h.pile.spearGone && h.pile.helm && h.pile.pot && h.pile.scene === 'b5_c4_surrender' && h.south.notYet && h.south.noMoroch && h.end && h.end.view === 'end' && h.end.ch === 'hold' && h.end.lvl >= 6 && h.endRead ? ok(`hold: the wounded carried in (b5_c4_wounded; the fire takes it on after Not now); the word down the line, never the delegation; b5Disarm (the spear on the pile, the helm and the pot kept); south in the file, never Moroch's group; the end (level ${h.end && h.end.lvl}; ${h.extras} end lines, ${h.journal} journal)`) : no('hold end ' + JSON.stringify([h.wounded, h.fireOn, h.resumed, h.carried, h.word, h.pile, h.south, h.end, h.endRead]));
n.key === 'run' && JSON.stringify(n.loy) === JSON.stringify({tobet:1, thegg:-1, perrit:0, ammet:0, ruuk:2}) && n.theggTxt && n.notNow && n.wood.area === 'b5_c4_wood' && n.wood.dark && n.wood.node === 'b5_c4_wood_arrive' && n.edgeLocked && n.sign.notNow && n.sign.check === 'wits:14' && n.sign.wounded && n.sign.noBasin ? ok('key run: Ruuk +2, Tobet +1, Thegg −1 ("I do not run. I ran."); into the wood (failing light); the edge shut until the wolves; never the basin') : no('run ' + JSON.stringify(n).slice(0, 700));
n.fight && n.fight.started && n.fight.dark && /b5_jheck/.test(n.fight.kinds) && n.fight.waves === 1 && n.fight.done && n.tooth && n.road && n.road.armed && n.road.frontier && n.road.column && n.road.notYet && n.end && n.end.ch === 'run' && n.end.armed && n.end.lvl >= 6 ? ok(`run: the Jheck in the trees (a wave), the tooth; out on the road south ahead of the disarmed column, armed; the word; the end (level ${n.end && n.end.lvl})`) : no('run end ' + JSON.stringify([n.fight, n.tooth, n.road, n.end]));
w.scoutGuide && w.guide && w.noCarry && w.noGifts && w.noted && w.fireTalk && w.dawnNoKnew && w.fireTalk3 && w.journal ? ok('after warn, without Ruuk: the scout guides, no carry and no gifts; "as far from the royals as the fort has"; Perrit\'s line warms (she wrote the Sixth was right)') : no('warn ' + JSON.stringify(w));
y.renderErr && !y.renderErr.length && y.brune && y.ruukWaits && y.roster && y.offers && y.swapped && !y.renderErr2.length ? ok('a --from=4 style save (Brune walks, Ruuk waits): every node renders in every phase and both keys; the roster at the fire brings Ruuk in for Brune') : no('synthetic ' + JSON.stringify(y).slice(0, 800));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b5ch4: FAIL (${bad.length})` : 'b5ch4: all ok'); process.exit(bad.length ? 1 : 0);
