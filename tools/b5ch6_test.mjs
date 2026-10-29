// Book Five, Chapter 6 (Brans Keep, src/86_b5_ch6.js): the eve in the Whitefinders' lines (the first halt and where the Sixth stands by
// Ch4's key, the mortal fight signposted, the King's bounty: thirty off every walking soldier's line and the quarter's pay, the house's
// factor at the line's end on Ch5 'sign', salves at six, the old drill-sergeant and the trick (taught, and its battle half), the paint,
// the foragers and the lake shore fight, the crossing, the fire: a rest, the pay desk, one scene each, Thegg gives Pessa her pack back,
// the Whitefinders' Drill (89) played through in the DOM and paid once, the roster); the night; the reading at dawn (the tiles on a
// shield); the day in the dry channel (the sorceries, the towers, the pillars, the Preda's standard far off; the clash, hand to hand,
// without sorcery; the Edur sword; the break); the key both ways: stand (the mortal fight b5_c6_channel, Edur warriors and unblooded only,
// both grounds; a death in it: the dead stay dead, the debt goes to the heirs, never in the squad after; Ennic wounded and stitched; the
// survivors +1; the hills and the Jheck; the ridge and the declaration; the barrow, the heirs written with the house's interest; the end)
// and fallback (loyalties, no fallen, the Dissent road, the cart, the flight, Ennic wounded, the barrow from the road, the end); from a
// 'run'/'refuse' road with nobody recruited (the second rank, Thegg's line, the army's clerk without interest, nobody fallen); and from a
// --from=6 style save where every node must still render in every phase, with and without a fallen squadmate.
// Usage: node tools/b5ch6_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); shut(); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const edge = (c, id) => (c.edges(id).filter(Boolean).reduce((a, e) => a + e[1], 0));
  /* a fight forced to its end; die: squadmates to put down in the last ground (a mortal fight kills them) */
  const force = async (id, die = []) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.mortal = !!B.def.mortal; res.dark = !!B.def.dark; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).map(u => u.kind).join(','); res.waves = (B.def.waves || []).length; res.kinds = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.kind))].join(','); res.ids = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.id || u.key || u.kind))].join(',');
    res.foeIds = [...new Set((BATTLES[id].foes || []).map(f => f[0]).concat(...(BATTLES[id].waves || []).map(w => w.foes.map(f => f[0]))))].join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2;
      res.foes2 = [...new Set((BATTLES[id].stage2.foes || []).map(f => f[0]).concat(...(BATTLES[id].stage2.waves || []).map(w => w.foes.map(f => f[0]))))].join(','); }
    die.forEach(d => { const u = B.units.find(x => x.side === 'p' && x.id === d); if (u) u.hp = 0; });
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b5_c6_/.test(k));
  const NEVER = /Kettle|Green Jackets|crossbow|Tomad|Binadas|Rhulad|Mosag|Uruth|Udinaas|Feather Witch|Trull|Canarth|Ahlrada|Hebaz|Moroch|Artisans' standard|Crippled|\bchaos\b|Brous|Hull|Seren/;
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{|\bnull\b/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words'); else if (!n.ch.some(c => !c.req || c.req())) errs.push(k + ': no visible choice'); else if (NEVER.test(n.txt + n.ch.map(c => c.t).join(' '))) errs.push(k + ': a hard-limit word ' + NEVER.exec(n.txt + n.ch.map(c => c.t).join(' '))[0]); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const mk = (o, name) => { setBook('mt'); S = newStateMT(name); S.lvl = 7; S.xp = LEVELS[6]; S.chapters = {1:o.k1, 2:o.k2, 3:o.k3, 4:o.k4, 5:o.k5}; S.f.b5_c1_key = o.k1; S.f.b5_c2_key = o.k2; S.f.b5_c3_key = o.k3; S.f.b5_c4_key = o.k4; S.f.b5_c5_key = o.k5; S.f.b5_holder = o.k5 === 'sign' ? 'house' : 'army'; S.f.b5_trate = 1; S.f.b5_fentReach = 1; S.f.b5_trateFell = 1;
    if (o.k4 === 'hold') { S.f.b5_disarmed = 1; S.f.b5_rearmed = 1; S.f.b5_disarmed = 0; }
    if (o.pessa) { b5Join('pessa'); shut(); S.f.b5_c5_pack = 1; }
    S.picksDue = []; save(); startChapter(6); };
  const L = () => Object.fromEntries(['tobet', 'thegg', 'perrit', 'ammet', 'pessa'].map(k => [k, S.loy[k] ?? null]));
  const dLoy = (a, b) => Object.fromEntries(Object.keys(b).map(k => [k, (b[k] ?? 0) - (a[k] ?? 0)]));
  try {
  /* ================= a fresh Chapter Six after hold / sign, Pessa walking (Thegg carried her pack) ================= */
  mk({k1:'pay', k2:'dead', k3:'warn', k4:'hold', k5:'sign', pessa:true}, 'Fresh');
  out.f = {area:S.area, ch:S.chapter, title:CHAPTERS[6].title, num:CHAPTERS[6].number, renderErr:renderAll(), roster:ROSTER_FIRES.mt[6].join(), reg:BOOKSNAP.mt && !!BOOKSNAP.mt.ch[6], pessa:b5In('pessa'), keys:B5KEYS[6].join(), intro:typeof CHAPTERS[6].intro.paras[1] === 'function' && /front of the crossing/.test(CHAPTERS[6].intro.paras[1]())};
  talk('b5_c6_start'); const st = DLG.b5_c6_start(); out.f.start = {ph:S.f.b5_c6_ph, again:typeof st.again === 'function', front:/The Sixth has the front of the crossing/.test(st.txt), order:/Crimson Rampant Brigade on the far left/.test(st.txt) && /Merchants' Battalion in front of the lake/.test(st.txt) && /the Artisans, the other half of the Riven, and the Whitefinders/.test(st.txt), ceda:/No Ceda/.test(st.txt), mortal:/Whoever falls there stays down/.test(st.txt), preda:/from the Preda/.test(st.txt)};
  talk('b5_c6_ennic'); out.f.ennic = S.f.b5_c6_ennic === 1 && /Hand to hand/.test(DLG.b5_c6_ennic().txt) && /will not be getting up/.test(DLG.b5_c6_ennic().txt) && has('b5_c6_ennic', /Not now/);
  /* the King's bounty for the stand */
  { const ids = ['sgt', 'tobet', 'thegg', 'perrit', 'ammet', 'pessa'], d0 = Object.fromEntries(ids.map(id => [id, b5Debt(id)])), s0 = S.silver; talk('b5_c6_bounty'); const bt = DLG.b5_c6_bounty().txt;
    out.f.bounty = {flag:S.f.b5_bounty, off:ids.map(id => d0[id] - b5Debt(id)).join(','), docks:S.silver - s0, tobet:/Thirty docks to stand in a ditch," he says. "I have been offered worse\./.test(bt), factor:/house's factor has his folding desk out/.test(bt) && /writing down who is standing where/.test(bt), pessa:/worth thirty docks dead/.test(bt), notNow:has('b5_c6_bounty', /Not now/)};
    const d1 = b5Debt('tobet'); talk('b5_c6_bounty'); out.f.bounty.once = b5Debt('tobet') === d1; }
  talk('b5_c6_factor'); out.f.factor = {shown:AREAS.b5_c6_lines.npcs.find(n => n.id === 'factor').show(), txt:/The house likes to know where its paper stands/.test(DLG.b5_c6_factor().txt)};
  S.silver = Math.max(S.silver, 40); { const sv = S.inv.salve, s0 = S.silver; talk('b5_c6_qm'); take('b5_c6_qm', /A salve/); out.f.qm = {salve:S.inv.salve - sv, docks:s0 - S.silver}; }
  /* the trick: the White Finger, ✦ Might 16 */
  talk('b5_c6_drillsgt'); const tc = vis('b5_c6_drillsgt').find(x => /White Finger/.test(x.t)); out.f.trickCheck = tc.check.join(':') + ':' + tc.trick; out.f.trickEdges = ['thegg', 'brune', 'sgt', 'tobet', 'perrit'].map(id => edge(tc, id)).join(',');
  out.f.guess = /only what I think/.test(DLG.b5_c6_drillsgt().txt);
  made('b5_c6_drillsgt', /White Finger/, 'thegg'); out.f.trick = {who:S.tricks && S.tricks.b5_c6_finger && S.tricks.b5_c6_finger.who, ok:S.f.b5_c6_fingerOk, notSorcery:!TRICKS.b5_c6_finger.sorcery && /Not sorcery/.test(TRICKS.b5_c6_finger.fx), paint:S.kit.includes('b5_c6_paint') && ITEMS.b5_c6_paint.ac === 1, guess:/only a guess/.test(DLG.b5_c6_finger_ok().txt), node:S.node};
  /* the foragers and the lake shore */
  talk('b5_c6_foragers'); take('b5_c6_foragers', /Show us the shore/); out.f.lake = {node:S.node, check:vis('b5_c6_lakepath').find(x => /reeds/.test(x.t)).check.join(':'), notNow:has('b5_c6_lakepath', /Not now/)};
  { const sv = S.silver; out.f.shore = await force('b5_c6_shore'); out.f.shore.done = S.f.b5_c6_shoreDone; out.f.shore.docks = S.silver - sv; }
  startExplore('b5_c6_lines');
  talk('b5_c6_crossing'); out.f.crossing = /stays down/.test(DLG.b5_c6_crossing().txt) && has('b5_c6_crossing', /Not now/) && !has('b5_c6_crossing', /Whitefinders' place/);
  /* the fire */
  talk('b5_c6_fire'); const fy = DLG.b5_c6_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b5_c6_fire', /rest/), pay:has('b5_c6_fire', /pay desk/), talk:has('b5_c6_fire', /Talk with the squad/), pack:has('b5_c6_fire', /Pessa's pack/), sleep:has('b5_c6_fire', /^Sleep/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), game:fy.ch.some(c => c.tag === 'The Whitefinders\' Drill' && (!c.req || c.req())), roster:fy.ch.some(c => /roster|Who walks/i.test(c.t + (c.tag || '')))};
  take('b5_c6_fire', /Let the squad rest/); out.f.rested = S.f.b5_c6_rest;
  const ft = DLG.b5_c6_fire_talk(); out.f.talk = {lines:ft.txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, paidUp:(ft.txt.match(/Paid up/g) || []).length};
  { const l0 = L(); talk('b5_c6_pack'); const l1 = L(); out.f.pack = {flag:S.f.b5_c6_pack, loy:dLoy(l0, l1), txt:/you should have your own things/.test(DLG.b5_c6_pack().txt) && /since the road south/.test(DLG.b5_c6_pack().txt), gone:!has('b5_c6_fire', /Pessa's pack/)}; }
  talk('b5_c6_pay'); const pd = DLG.b5_c6_pay(); out.f.desk = {html:/The squad/.test(pd.html || ''), notNow:/Not now/.test(pd.ch[pd.ch.length - 1].t), back:pd.ch[pd.ch.length - 1].go};
  { const d0 = b5Debt('ammet'), s1 = S.silver; take('b5_c6_pay', /on Ammet's debt/); out.f.desk.paid = d0 - b5Debt('ammet'); out.f.desk.spent = s1 - S.silver; }
  /* the Whitefinders' Drill, played through in the DOM: every pole met as it lands, and the lock on three */
  { const s0 = S.silver, t0 = S.loy.thegg; talk('b5_c6_fire'); const gc = DLG.b5_c6_fire().ch.find(c => c.tag === 'The Whitefinders\' Drill'); gc.go(); await wait(80);
    const mg = document.getElementById('mg'); out.f.game = {open:!mg.hidden, title:/The Whitefinders' Drill/.test(mg.textContent)};
    for (let c = 0; c < 3; c++) { document.getElementById('drGo').click(); await wait(20); const g = MG.state;
      for (const p of g.poles) { const d = p.at - performance.now(); if (d > 0) await wait(d); document.getElementById('drUp').click(); await wait(5); }
      const deadline = performance.now() + 6000; while ((MG.state.phase === 'count') && performance.now() < deadline) await wait(40); }
    const g = MG.state; out.f.game.held = g.held; out.f.game.total = g.total; { const d = g.lock.at - performance.now(); if (d > 0) await wait(d); } document.getElementById('drUp').click(); await wait(40);
    out.f.game.locked = MG.state.locked; document.getElementById('drDone').click(); await wait(60);
    out.f.game.after = S.node; out.f.game.drill = S.f.b5_drill; out.f.game.docks = S.silver - s0; out.f.game.thegg = S.loy.thegg - t0; out.f.game.again = !DLG.b5_c6_fire().ch.some(c => c.tag === 'The Whitefinders\' Drill' && (!c.req || c.req()));
    out.f.game.afterTxt = /ten docks from his own purse/.test(DLG.b5_c6_drill_after().txt); out.f.game.journal = CHAPTERS[6].journal().some(x => /drill-sergeant drilled the Sixth/.test(x));
    const s1 = S.silver; b5DrillPay({held:15, total:15, locked:true, done:true}); out.f.game.once = S.silver === s1; }
  /* the night, and dawn: the reading on a shield */
  take('b5_c6_fire', /^Sleep/); out.f.night = {node:S.node, notNow:has('b5_c6_night', /Not now/)};
  take('b5_c6_night', /First light/); out.f.dawn = {ph:S.f.b5_c6_ph, tiles:has('b5_c6_dawn', /tiles/), on:has('b5_c6_dawn', /To the crossing/), notNow:has('b5_c6_dawn', /Not now/), noSleep:!has('b5_c6_fire', /^Sleep/), crossing:has('b5_c6_fire', /To the crossing/)};
  talk('b5_c6_tiles'); const tk = DLG.b5_c6_tiles(); out.f.tilesNotNow = tk.ch.some(c => /Not now/.test(c.t)); runFx(tk.ch.find(c => /lay them/.test(c.t)));
  out.f.tiles = {drawn:S.f.b5_c6_drawn, reader:S.f.b5_c6_reader, card:S.card, inPool:B5POOL[6].includes(S.card), scene:B5READ[6].scene, lean:B5POOL[6].filter(x => x === 'b5t_axe').length, say:/only flat thing in the army this morning/.test(tk.txt), table:!!READTABLE['mt:6']};
  talk('b5_c6_card'); const cd = DLG.b5_c6_card(); out.f.card = {sp:cd.sp, back:cd.ch[0].go}; out.f.tilesDone = has('b5_c6_tiles_done', /To the crossing/);
  /* the day in the dry channel */
  take('b5_c6_tiles_done', /To the crossing/); out.f.dawnGo = /front of the crossing/.test(DLG.b5_c6_dawn_go().txt);
  take('b5_c6_dawn_go', /Into the channel/); out.f.channel = {area:S.area, node:S.node, notNow:has('b5_c6_channel_arrive', /Not now/)};
  take('b5_c6_channel_arrive', /Watch the field/); const so = DLG.b5_c6_sorcery().txt; out.f.sorcery = {day:S.f.b5_c6_day, dust:/raise the dust/.test(so), white:/white fire/.test(so), towers:/Both corner towers come down/.test(so), pillars:/come down on the left and the centre/.test(so), standard:/goes under, and does not come up/.test(so), notNow:has('b5_c6_sorcery', /Not now/)};
  take('b5_c6_sorcery', /lake beds/); const cl = DLG.b5_c6_clash().txt; out.f.clash = {day:S.f.b5_c6_day, lakebeds:/The ones who came over the lake beds/.test(cl), noSorcery:/There is no sorcery in them/.test(cl), hand:/hand to hand/.test(cl), blade:S.kit.includes('b5_c6_edurblade') && ITEMS.b5_c6_edurblade.atk === 1 && ITEMS.b5_c6_edurblade.role === 'blade'};
  take('b5_c6_clash', /Back to the lip/); const bk = DLG.b5_c6_break(); const st1 = vis('b5_c6_break').find(c => /Hold the crossing/.test(c.t));
  out.f.brk = {day:S.f.b5_c6_day, mortalTag:st1 && st1.tag === 'mortal', mortalTxt:st1 && /\(a mortal fight: whoever falls here stays down\)$/.test(st1.t), fallback:has('b5_c6_break', /Toward Dissent/), notYet:has('b5_c6_break', /Not yet/), sees:/the left is gone, and the centre is gone/.test(bk.txt), pillar:/one of the pillars has turned/.test(bk.txt), pessa:/I'll do what the soldiers do/.test(bk.txt)};
  const snap = JSON.stringify(S);
  /* ================= key: stand; Tobet falls in the mortal fight ================= */
  { const l0 = L(); take('b5_c6_break', /Hold the crossing/); out.s = {key:S.f.b5_c6_key, node:S.node, txt:/Whoever falls here stays down/.test(DLG.b5_c6_stand().txt), check:vis('b5_c6_stand').find(c => /finger/i.test(c.t)).check.join(':'), notNow:has('b5_c6_stand', /Not now/)};
    const debtT = b5Debt('tobet'), total0 = b5DebtTotal(); out.s.fight = await force('b5_c6_channel', ['tobet']);
    out.s.dead = {dead:!!(S.dead && S.dead.tobet), inSquad:S.squad.includes('tobet'), b5In:b5In('tobet'), heirs:(S.f.b5_heirs || {}).tobet, want:debtT, total:total0 - b5DebtTotal(), fallen:(S.f.b5_c6_fallen || []).join(), lastFallen:(S.f.lastFallen || []).join()};
    const ca = DLG.b5_c6_channel_after(); out.s.after = {node:S.node, txt:/Tobet did not get up/.test(ca.txt) && /He is lying on the stones/.test(ca.txt), ennic:S.f.b5_c6_ennicHurt === 1 && S.f.b5_c6_stitched === 'ammet' && /Hold still/.test(ca.txt), loy:dLoy(l0, L())};
    take('b5_c6_channel_after', /Up into the hills/); out.s.hills = {area:S.area, ph:S.f.b5_c6_ph, node:S.node, fewer:/one fewer/.test(DLG.b5_c6_hills_arrive().txt), ridgeShut:!has('b5_c6_ridge', /Watch the field/)};
    talk('b5_c6_hunt'); out.s.hunt = {check:vis('b5_c6_hunt').find(c => /scree/.test(c.t)).check.join(':'), ruuk:edge(vis('b5_c6_hunt').find(c => /scree/.test(c.t)), 'ruuk'), notNow:has('b5_c6_hunt', /Not now/)};
    out.s.hfight = await force('b5_c6_hills'); out.s.hfight.done = S.f.b5_c6_hillsDone; out.s.stone = S.kit.includes('b5_c6_lakestone') && ITEMS.b5_c6_lakestone.hp === 3;
    out.s.rain = /what they took up with them comes down/.test(DLG.b5_c6_hills_after().txt) && /keep is burning/.test(DLG.b5_c6_hills_after().txt);
    { const sv = S.silver; talk('b5_c6_shrine'); take('b5_c6_shrine', /Take them/); out.s.shrine = S.silver - sv; }
    talk('b5_c6_ennic_hills'); out.s.ennicHills = /crossing it out now/.test(DLG.b5_c6_ennic_hills().txt);
    talk('b5_c6_ridge'); const rd = DLG.b5_c6_ridge().txt; out.s.ridge = {decl:/The Letherii are his subjects now/.test(rd) && /buried together, in one barrow, ready by midnight/.test(rd) && /not have the day called a victory/.test(rd), on:has('b5_c6_ridge', /Watch the field/)};
    const h0 = (S.f.b5_heirs || {}).tobet; take('b5_c6_ridge', /Watch the field/); const bw = DLG.b5_c6_barrow();
    out.s.barrow = {seen:S.f.b5_barrowSeen, ph:S.f.b5_c6_ph, interest:(S.f.b5_heirs || {}).tobet - h0, want:Math.ceil(h0 / 10), written:S.f.b5_c6_heirsWritten, factor:/house's factor comes up the hill path/.test(bw.txt) && /with the house's interest on top/.test(bw.txt), heir:/Tobet's [\d,]+ docks goes to his family on the tenant farm/.test(bw.txt), inIt:/Tobet is in it/.test(bw.txt), notSquad:/not the squad's to pay/.test(bw.txt), html:/The squad/.test(bw.html || '')};
    { const h1 = (S.f.b5_heirs || {}).tobet; talk('b5_c6_barrow'); out.s.barrow.once = (S.f.b5_heirs || {}).tobet === h1; }
    take('b5_c6_barrow', /The morning/); out.s.endNode = S.node && /Letheras/.test(DLG.b5_c6_end().txt);
    take('b5_c6_end', /South-east, to Letheras/); await wait(60); out.s.end = {view, ch:S.chapters[6], lvl:S.lvl, extras:CHAPTERS[6].extras().some(x => /Tobet did not come out of it/.test(x)), journal:CHAPTERS[6].journal().some(x => /Tobet fell there/.test(x)), stillDead:!S.squad.includes('tobet') && !!S.dead.tobet, camp:!(S.camp || []).includes('tobet')}; }
  /* ================= key: fallback, from the same moment ================= */
  { S = JSON.parse(snap); save(); startExplore('b5_c6_channel'); G.said = {}; talk('b5_c6_break');
    const l0 = L(); take('b5_c6_break', /Toward Dissent/); const l1 = L();
    out.u = {key:S.f.b5_c6_key, loy:dLoy(l0, l1), fallen:Array.isArray(S.f.b5_c6_fallen) && !S.f.b5_c6_fallen.length, txt:/We left the crossing/.test(DLG.b5_c6_fallback().txt) && /Good\./.test(DLG.b5_c6_fallback().txt)};
    take('b5_c6_fallback', /South-west/); out.u.area = S.area; out.u.node = S.node;
    { const sv = S.silver; talk('b5_c6_cart'); out.u.cartCheck = vis('b5_c6_cart').find(c => /cashbox/.test(c.t)).check.join(':'); made('b5_c6_cart', /cashbox/, 'thegg'); out.u.cart = S.silver - sv; }
    talk('b5_c6_roadsw'); out.u.roadShut = !has('b5_c6_roadsw', /Watch the field/);
    talk('b5_c6_fleeing'); out.u.wallCheck = vis('b5_c6_fleeing').find(c => /wall's far side/.test(c.t)).check.join(':');
    out.u.fight = await force('b5_c6_flight'); out.u.fight.done = S.f.b5_c6_flightDone;
    out.u.after = {ennic:S.f.b5_c6_ennicHurt === 1, stone:S.kit.includes('b5_c6_lakestone'), fallen:(S.f.b5_c6_fallen || []).length === 0, rain:/what they took up with them comes down/.test(DLG.b5_c6_flight_after().txt), nobodyDead:!Object.keys(S.dead || {}).length};
    take('b5_c6_flight_after', /On, toward Dissent/); out.u.road = /The Letherii are his subjects now/.test(DLG.b5_c6_roadsw().txt);
    take('b5_c6_roadsw', /Watch the field/); out.u.barrow = {seen:S.f.b5_barrowSeen, road:/from the Dissent road/.test(DLG.b5_c6_barrow().txt), noFell:!/is in it\. Nobody says so/.test(DLG.b5_c6_barrow().txt)};
    take('b5_c6_barrow', /The morning/); take('b5_c6_end', /South-east, to Letheras/); await wait(60); out.u.end = {view, ch:S.chapters[6]}; }
  /* ================= a 'run'/'refuse' road, nobody recruited: the second rank; the army's clerk; nobody fallen ================= */
  { mk({k1:'swim', k2:'salvage', k3:'watch', k4:'run', k5:'refuse'}, 'Run'); talk('b5_c6_start'); const st = DLG.b5_c6_start().txt;
    out.n = {second:/The Sixth has the second rank/.test(st), thegg:/Not behind me/.test(st), intro:/second rank, behind the Second Company/.test(CHAPTERS[6].intro.paras[1]()), noFactor:!AREAS.b5_c6_lines.npcs.find(n => n.id === 'factor').show()};
    talk('b5_c6_bounty'); out.n.noFactorLine = !/house's factor/.test(DLG.b5_c6_bounty().txt); out.n.noPack = !has('b5_c6_fire', /Pessa's pack/);
    S.f.b5_c6_ph = 2; S.f.b5_c6_day = 3; startExplore('b5_c6_channel'); talk('b5_c6_break'); out.n.secondTxt = /The Second Company was in front of the Sixth/.test(BATTLES.b5_c6_channel.preText());
    take('b5_c6_break', /Hold the crossing/); out.n.fight = await force('b5_c6_channel'); out.n.fallen = (S.f.b5_c6_fallen || []).length === 0 && /Everyone in the squad gets up/.test(DLG.b5_c6_channel_after().txt);
    S.f.b5_c6_hillsDone = 1; talk('b5_c6_barrow'); const bw = DLG.b5_c6_barrow().txt; out.n.barrow = {army:S.f.b5_c6_heirsWritten === 'army' && /company clerk sits on the oilskin case/.test(bw) && /without interest/.test(bw), noFactor:!/house's factor/.test(bw)}; }
  /* ================= a --from=6 style save (Brune walks, Ruuk and Pessa wait): every node renders in every phase; the roster; the trick in a fight ================= */
  { setBook('mt'); S = newStateMT('Syn'); S.lvl = 7; S.xp = LEVELS[6]; Object.assign(S.f, {b5_c1_key:'swim', b5_c2_key:'salvage', b5_c3_key:'watch', b5_c4_key:'hold', b5_c5_key:'sign', b5_holder:'house', b5_disarmed:1, b5_rearmed:1}); S.f.b5_disarmed = 0;
    S.chapters = {1:'swim', 2:'salvage', 3:'watch', 4:'hold', 5:'sign'}; S.f.b5_bruneDone = 1; S.squad.push('brune'); S.f.b5_ruukDone = 2; S.f.b5_pessaDone = 2; S.camp = ['ruuk', 'pessa']; S.picksDue = []; migrate(S); save(); startChapter(6);
    const errs = []; const states = [[1, 0, null, []], [2, 0, null, []], [2, 1, null, []], [2, 2, null, []], [2, 3, null, []], [3, 3, 'stand', []], [3, 3, 'stand', ['perrit']], [4, 3, 'stand', ['perrit']], [3, 3, 'fallback', []], [4, 3, 'fallback', []]];
    for (const [ph, day, k, fell] of states) { const sv = JSON.stringify(S); S.f.b5_c6_ph = ph; S.f.b5_c6_day = day; S.f.b5_c6_key = k; S.f.b5_c6_fallen = fell; if (fell.length) { fell.forEach(id => kill(id)); } errs.push(...renderAll().map(e => `ph${ph}d${day}${k || ''}${fell.join('')} ${e}`)); S = JSON.parse(sv); }
    out.y = {renderErr:errs, brune:b5In('brune')};
    talk('b5_c6_fire'); const rc = vis('b5_c6_fire').find(c => /roster|Who walks/i.test(c.t + (c.tag || ''))); out.y.roster = !!rc; out.y.offers = b5Offers().includes('ruuk') && b5Offers().includes('pessa');
    /* the trick's battle half: boss to boss, +3 + level step armour, no flanking */
    S.tricks = S.tricks || {}; S.tricks.b5_c6_finger = {who:'thegg', ch:6}; startBattle('b5_c6_shore', {}); await wait(60); const u = B.units.find(x => x.side === 'p' && x.id === 'thegg'), v = B.units.find(x => x.side === 'p' && x.id !== 'thegg' && !x.ally);
    v.x = u.x + 1; v.y = u.y; out.y.offered = typeof trickOk === 'function' && trickOk(u, AB.t_b5_c6_finger); AB.t_b5_c6_finger.run(u); out.y.line = !!B.line && lineCovers(u) && lineCovers(v); out.y.ac = 3 + lvT(); B = null; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, s = r.s || {}, u = r.u || {}, n = r.n || {}, y = r.y || {};
if (f.area) {
  f.area === 'b5_c6_lines' && f.ch === 6 && f.title === 'Brans Keep' && f.num === 'Six' && !f.renderErr.length && f.roster === 'b5_c6_fire' && f.reg && f.pessa && f.keys === 'stand,fallback' && f.intro ? ok('a fresh Chapter Six opens in the Whitefinders\' lines (hold: the front of the crossing), Pessa walking; registered; a roster fire; every b5_c6 node renders with a visible choice and no hard-limit word') : no('fresh ' + JSON.stringify(f).slice(0, 900));
  const t = f.start || {}; t.ph === 1 && t.again && t.front && t.order && t.ceda && t.mortal && t.preda && f.ennic ? ok('the first halt: the order of battle as the Preda\'s orders (the right across the channel: Artisans, Riven, Whitefinders), no Ceda; the mortal fight signposted, and again by Ennic') : no('start ' + JSON.stringify([t, f.ennic]));
  const b = f.bounty || {}; b.flag === 1 && b.off === '30,30,30,30,30,30' && b.docks === 15 && b.tobet && b.factor && b.pessa && b.notNow && b.once && f.factor.shown && f.factor.txt && f.qm.salve === 1 && f.qm.docks === 6 ? ok('the King\'s bounty: thirty off the sergeant and every walking soldier, once, and the quarter\'s pay (15); Tobet\'s ditch; the house\'s factor at the line\'s end writing who stands where (sign); salves at six') : no('bounty ' + JSON.stringify([b, f.factor, f.qm]));
  f.trickCheck === 'might:16:b5_c6_finger' && f.trickEdges === '3,1,1,-2,-2' && f.guess && f.trick.who === 'thegg' && f.trick.ok && f.trick.notSorcery && f.trick.paint && f.trick.guess ? ok('the trick: the White Finger, ✦ Might 16 (Thegg +3, Brune +1, you +1, Tobet −2, Perrit −2), the drill-sergeant\'s guess and only a guess, not sorcery; the paint (+1 armour)') : no('trick ' + JSON.stringify([f.trickCheck, f.trickEdges, f.guess, f.trick]));
  const sh = f.shore || {}; f.lake.node === 'b5_c6_lakepath' && f.lake.check === 'wits:15' && f.lake.notNow && sh.started && sh.foes === 3 && sh.waves === 1 && sh.kinds === 'b5_jheck' && sh.done && sh.docks === 10 && f.crossing ? ok('the foragers by the lake: the shore fight (Jheck ×3, a wave), the foragers\' purse 10; the crossing on the eve, signposted') : no('shore ' + JSON.stringify([f.lake, sh, f.crossing]));
  const fi = f.fire || {}; fi.again && fi.rest && fi.pay && fi.talk && fi.pack && fi.sleep && fi.notNow && fi.game && fi.roster && f.rested === 1 && f.talk.lines === f.talk.here && f.talk.paidUp === f.talk.here && f.pack.flag === 1 && f.pack.loy.pessa === 1 && f.pack.loy.thegg === 1 && f.pack.txt && f.pack.gone && f.desk.html && f.desk.notNow && f.desk.back === 'b5_c6_fire' && f.desk.paid === 10 && f.desk.spent === 10 ? ok('the fire: an again line, a rest, the pay desk, one scene each (before the paybook, and paid up), Thegg gives Pessa her pack back, the drill, the roster, Sleep and Not now') : no('fire ' + JSON.stringify([fi, f.rested, f.talk, f.pack, f.desk]));
  const gm = f.game || {}; gm.open && gm.title && gm.total === 15 && gm.held >= 13 && gm.locked === true && gm.after === 'b5_c6_drill_after' && gm.drill && gm.drill.done && gm.docks === 10 && gm.thegg === (gm.held >= 14 ? 1 : 0) && gm.again && gm.afterTxt && gm.journal && gm.once ? ok(`the Whitefinders' Drill played through: ${gm.held} of ${gm.total} boss to boss and the lock on three; 10 docks from the Finadd's purse once; Thegg +${gm.thegg}`) : no('game ' + JSON.stringify(gm));
  f.night.node === 'b5_c6_night' && f.night.notNow && f.dawn.ph === 2 && f.dawn.tiles && f.dawn.on && f.dawn.notNow && f.dawn.noSleep && f.dawn.crossing && f.tilesNotNow && f.tiles.drawn === 1 && f.tiles.reader === 'perrit' && f.tiles.inPool && f.tiles.scene === 'b5_branskeep' && f.tiles.lean === 3 && f.tiles.say && f.tiles.table && f.card.sp === 'The Tiles of the Holds' && f.card.back === 'b5_c6_tiles_done' && f.tilesDone ? ok(`the night; dawn and the reading on a shield (Perrit lays the tiles: ${f.tiles.card}; the Axe leans ×3; "Not now" offered)`) : no('night/tiles ' + JSON.stringify([f.night, f.dawn, f.tiles, f.card, f.tilesDone]));
  f.dawnGo && f.channel.area === 'b5_c6_channel' && f.channel.node === 'b5_c6_channel_arrive' && f.channel.notNow && f.sorcery.day === 1 && f.sorcery.dust && f.sorcery.white && f.sorcery.towers && f.sorcery.pillars && f.sorcery.standard && f.sorcery.notNow && f.clash.day === 2 && f.clash.lakebeds && f.clash.noSorcery && f.clash.hand && f.clash.blade ? ok('the day: the dust and the white fire, both towers down, the pillars on the left and the centre, a standard under far off (never her name, never how); the Edur over the lake beds, hand to hand, without sorcery; an Edur sword (+1 to hit)') : no('day ' + JSON.stringify([f.dawnGo, f.channel, f.sorcery, f.clash]));
  const k = f.brk || {}; k.day === 3 && k.mortalTag && k.mortalTxt && k.fallback && k.notYet && k.sees && k.pillar && k.pessa ? ok('the break: the right sees the left and the centre gone, a pillar turns; the key with "(a mortal fight: whoever falls here stays down)" tagged mortal, the fallback, Not yet; Pessa has her say') : no('break ' + JSON.stringify(k));
}
const sf = s.fight || {}; s.key === 'stand' && s.txt && s.check === 'might:15' && s.notNow && sf.started && sf.mortal && sf.foeIds === 'b5_edur,b5_unblooded' && sf.allies === 'b5_letherii' && sf.waves === 1 && sf.stage2 && sf.inStage2 && sf.foes2 === 'b5_edur,b5_unblooded' && sf.after === 'b5_c6_channel_after' ? ok('stand: the mortal fight at the crossing (Edur warriors and unblooded only, no K\'risnan, no demon; a Whitefinder regular beside; a wave; the channel\'s lip)') : no('stand fight ' + JSON.stringify([s.key, s.txt, s.check, s.notNow, sf]));
const sd = s.dead || {}; sd.dead && !sd.inSquad && !sd.b5In && sd.heirs === sd.want && sd.want > 0 && sd.total === sd.want && sd.fallen === 'tobet' && sd.lastFallen === 'tobet' && s.after && s.after.txt && s.after.ennic && s.after.loy.thegg === 1 && s.after.loy.perrit === 1 && s.after.loy.ammet === 1 && s.after.loy.pessa === 1 ? ok(`a death in the mortal fight: Tobet stays dead, out of the squad, his ${sd.heirs} docks gone to the heirs (off the squad's total, never charged), b5_c6_fallen = [tobet]; Ennic wounded and Ammet stitches him; the survivors +1`) : no('death ' + JSON.stringify([sd, s.after]));
const sh2 = s.hills || {}; sh2.area === 'b5_c6_hills' && sh2.ph === 3 && sh2.fewer && sh2.ridgeShut && s.hunt.check === 'wits:15' && s.hunt.ruuk === 3 && s.hunt.notNow && s.hfight && s.hfight.started && !s.hfight.mortal && s.hfight.foes === 6 && s.hfight.done && s.stone && s.rain && s.shrine === 8 && s.ennicHills && s.ridge.decl && s.ridge.on ? ok('the hills: one fewer; the Jheck hunting (not mortal: wolves ×4, wraiths ×2); the stone from the old lake bed (+3 health); the pillars lift and what they carried comes down (headline); the Errant\'s dish (8); the declaration heard on the ridge') : no('hills ' + JSON.stringify([sh2, s.hunt, s.hfight, s.stone, s.rain, s.shrine, s.ennicHills, s.ridge]));
const sb = s.barrow || {}; sb.seen === 1 && sb.ph === 4 && sb.interest === sb.want && sb.written === 'house' && sb.factor && sb.heir && sb.inIt && sb.notSquad && sb.html && sb.once && s.endNode && s.end && s.end.view === 'end' && s.end.ch === 'stand' && s.end.extras && s.end.journal && s.end.stillDead && s.end.camp ? ok(`the barrow seen from the ridge; the house's factor writes the dead to the heirs with its interest (+${sb.interest}, once); Tobet's debt to his family on the tenant farm, said once, plainly; the end (level ${s.end && s.end.lvl}); Tobet never back in the squad`) : no('barrow/end ' + JSON.stringify([sb, s.endNode, s.end]));
JSON.stringify(u.loy) === JSON.stringify({tobet:1, thegg:-1, perrit:0, ammet:0, pessa:1}) && u.key === 'fallback' && u.fallen && u.txt && u.area === 'b5_c6_dissent' && u.node === 'b5_c6_dissent_arrive' && u.cartCheck === 'might:12' && u.cart === 8 && u.roadShut && u.wallCheck === 'wits:15' && u.fight && u.fight.started && !u.fight.mortal && u.fight.foeIds === 'b5_jheck,b5_wraith' && u.fight.done && u.after.ennic && u.after.stone && u.after.fallen && u.after.rain && u.after.nobodyDead && u.road && u.barrow.seen && u.barrow.road && u.barrow.noFell && u.end && u.end.view === 'end' && u.end.ch === 'fallback' ? ok('fallback: Thegg −1, Pessa +1, Tobet +1; nobody fallen; the Dissent road, the sutler\'s cashbox (8), the flight (Jheck and wraiths, not mortal), Ennic wounded, the stone; the declaration and the barrow from the road; the end') : no('fallback ' + JSON.stringify(u).slice(0, 900));
n.second && n.thegg && n.intro && n.noFactor && n.noFactorLine && n.noPack && n.secondTxt && n.fight && n.fight.mortal && n.fallen && n.barrow.army && n.barrow.noFactor ? ok('after run and refuse, nobody recruited: the second rank and Thegg\'s line; no factor; the stand with nobody fallen; the army\'s clerk writes the dead without interest') : no('run ' + JSON.stringify(n).slice(0, 800));
y.renderErr && !y.renderErr.length && y.brune && y.roster && y.offers && y.offered && y.line ? ok(`a --from=6 style save (Brune walks, Ruuk and Pessa wait): every node renders in every phase, both keys, with and without a fallen squadmate; the roster offers both; the White Finger locks the line (+${y.ac} armour, no flanking)`) : no('synthetic ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b5ch6: FAIL (${bad.length})` : 'b5ch6: all ok'); process.exit(bad.length ? 1 : 0);
