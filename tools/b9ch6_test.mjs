// Book Nine, Chapter 6 (Dust on the Horizon, src/166_b9_ch6.js): the Letherii's last chapter, the battle's day on the escort's own stretch.
// Every node renders clean (no never-name, no "!" in narration, no rounds or turns); every check carries a "yes, but" and every onward step a
// "Not now" or "Not yet", under every phase and key; the Tiles reading opens at a shield on the plain; Finadd Ennic's orders; the escort
// scale; the trick (Raise the Dust) behind its ✦ wits 18 check, free, and its battle half; the line check (Ch 2's drill +2) and the line
// (main, stage 2, NOT mortal: death checks run); the plate; both keys from the same moment (line: the gap closed, or the gap fight; train:
// the wagons, survive 5, Rations +2 once, S.f.b9_c6_trainHeld, Ch 4's book an easier start); the pull-back (survive 4); the rearguard news;
// every Letherii road (escort / adjunct / home, b9Faith colouring home) to the end; the Witness beat (three answers, Not now records
// nothing); the march −1 (Rations as the brief says); the fates for Ch 7's finale; a --from=6 style transfer save that reloads.
// Usage: node tools/b9ch6_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const tt = c => typeof c.t === 'function' ? c.t() : c.t;
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(tt).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(tt(x)));
  const roll = (id, re, who, tier, pass) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(tt).join(' | ')}]`); runFx(c);
    settleRoll({who, stat:c.check[0], tier, ok:pass, pass, margin:pass ? 6 : -4, nat:pass ? 18 : 4}, c); return c; };
  const made = (id, re, who) => { const c = roll(id, re, who, 'clean', true); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => roll(id, re, who, 'near', true);
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { B = null; view = 'scene'; S = JSON.parse(snap); save(); setBook('dod'); b9Use('l'); S.chapter = 6; startExplore(area); };
  const leave = area => { B = null; view = 'scene'; S.scene = 'talk'; startExplore(area); };
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length;
    res.survive = !!(B.def.objective && B.def.objective.type === 'survive'); res.mortal = !!B.def.mortal; res.death = deathOn(); res.surprise = opt.surprise || null;
    res.kinds = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.kind))].join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.death2 = deathOn(); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b9_c6_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Tarr\b|Cuttle|Hedge|Bavedict|Keneb|Blistig|Errant|Brys|Aranict|Atri-Ceda|Henar|Ublala|Kalam|Tehol|Tool\b|Hetan|Setoc|Snake|Quick Ben|Ruthan|Bottle|Lostara|Tavore|Khundryl|Gall\b|\bweeks\b|\bmonths\b|Glass Desert|Forkrul|Chancel|Kolanse's coast|south along the coast|Bonehunters/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = tt(c); if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase, key and road */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set();
    const keep = JSON.stringify(S.f);
    [1, 2, 3, 4, 5].forEach(ph => ['line', 'train', null].forEach(k => [0, 1].forEach(fl => { S.f.b9_c6_ph = ph; S.f.b9_c6_key = k;
      ['b9_c6_orders', 'b9_c6_scale', 'b9_c6_lineDone', 'b9_c6_keyDone', 'b9_c6_trainDone', 'b9_c6_dustTried', 'b9_c6_plateGot'].forEach(f => { S.f[f] = fl ? 1 : undefined; }); S.f.b9_lethRoad = fl ? 'escort' : undefined;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); })));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Fresh'); S.picksDue = []; save(); startChapter(6); S.picksDue = []; save();
  const thirdKeep = JSON.stringify(S.th.t && S.th.t.squad);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, rat0:b9Rations(), march:S.f.b9_march6, squad:S.squad.join(','), renderErr:renderAll(), title:CHAPTERS[6].title, nodes:nodes.length, areas:CHAPTERS[6].areas.length, fights:Object.keys(CHAPTERS[6].battles).length,
    items:Object.keys(CHAPTERS[6].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[6].gear).length,
    scale:ITEMS.b9_c6_escortscale && ITEMS.b9_c6_escortscale.slot === 'armour' && ITEMS.b9_c6_escortscale.role === 'mail' && ITEMS.b9_c6_escortscale.ac === 2, plate:ITEMS.b9_c6_plate && ITEMS.b9_c6_plate.slot === 'trinket',
    fig:typeof FIGX.b9_nahruk === 'function', ground:typeof TILEX.b9_c6_field === 'function', kindKept:FOES.b9_lnahruk.kind === 'khell' && FOES.b9_nahruk.kind === 'khell',
    scenes:['b9_line', 'b9_battle', 'b9_c6_dawn', 'b9_c6_wagons', 'b9_c6_dusk'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.dod[6] || []).includes('b9_c6_fire'), audit:audit(), read6:!!B9READ[6] && !!B9READ[6].say.perrit && !!B9READ[6].say.tilewoman && B9READ[6].back === 'b9_c6_fire',
    fates:!!CHAPTERS[6].fates && typeof CHAPTERS[6].fates.pages === 'function'};
  /* draw every backdrop at phone size in each phase and key, and the short-tail (khell) in Book Nine (no page errors) */
  { const cv = document.createElement('canvas'); cv.width = 390; cv.height = 300; [1, 2, 3, 4, 5].forEach(ph => ['line', 'train'].forEach(k => [0, 1].forEach(d => { S.f.b9_c6_ph = ph; S.f.b9_c6_key = ph >= 3 ? k : undefined; S.f.b9_c6_lineDone = ph > 2 || d ? 1 : undefined;
      ['b9_line', 'b9_battle', 'b9_c6_dawn', 'b9_c6_wagons', 'b9_c6_dusk'].forEach(s => SCENEX[s](cv, 1000 + ph*300)); }))); ['b9_c6_ph', 'b9_c6_key', 'b9_c6_lineDone'].forEach(k => { S.f[k] = undefined; });
    const ctx = cv.getContext('2d'); drawFigure(ctx, 'khell', 50, 50, 1, 1000, {}); drawFigure(ctx, 'b9_nahruk', 80, 50, 1.3, 1000, {}); }
  /* the start: first light, the reading among the first halt's choices */
  talk('b9_c6_start'); out.f.ph = S.f.b9_c6_ph; out.f.tiles = has('b9_c6_start', /Sit with Perrit and the tiles/); out.f.dust = /dust-storm|brown smear/.test(DLG.b9_c6_start().txt + CHAPTERS[6].intro.paras.map(p => typeof p === 'function' ? p() : p).join(' '));
  talk('b9_c6_read'); const rd = DLG.b9_c6_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b9_c6_drawn, reader:S.f.b9_c6_reader, inPool:B9POOL[6].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), cardNode:cardNodeName(), cardSp:DLG.b9_c6_card().sp, cardBack:DLG.b9_c6_card().ch[0].go, again:!has('b9_c6_fire', /Sit with/), where:/shield/.test(DLG.b9_c6_card().txt)};
  /* the Finadd's orders, the storm question; Yelt's scale */
  talk('b9_c6_ennic'); out.e = {orders:S.f.b9_c6_orders, notNow:has('b9_c6_ennic', /Not now/), cairn:/cairn/.test(DLG.b9_c6_ennic().txt)}; take('b9_c6_ennic', /storm/); out.e.storm = S.f.b9_c6_storm === 1;
  talk('b9_c6_fire'); out.e.noLine = !has('b9_c6_fire', /Into the line/);
  talk('b9_c6_yelt'); out.e.scale = S.kit.includes('b9_c6_escortscale'); out.e.html = /Rations/.test(DLG.b9_c6_yelt().html || '');
  ['b9_c6_orla', 'b9_c6_shield', 'b9_c6_cairn', 'b9_c6_washend', 'b9_c6_barrels', 'b9_c6_shields', 'b9_c6_waiting'].forEach(k => talk(k)); out.e.tw = !has('b9_c6_shield', /Sit with/);
  /* the trick: Raise the Dust, from Brennet (walking) or an old drover */
  talk('b9_c6_drovers'); const tc = vis('b9_c6_drovers').find(c => c.trick);
  out.t = {dc:tc && tc.check[1], stat:tc && tc.check[0], noNear:tc && !tc.near, notNow:has('b9_c6_drovers', /Not now/), brennet:(edgesFor(tc, 'brennet').find(e => /carting/.test(e[0])) || [])[1] || 0, teacher:/Brennet/.test(DLG.b9_c6_drovers().txt) || /old drover/.test(DLG.b9_c6_drovers().txt)};
  made('b9_c6_drovers', /Learn it the drovers/, 'thegg');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b9_c6_dust && S.tricks.b9_c6_dust.who, ok:S.f.b9_c6_dustOk, free:!!AB.t_b9_c6_dust.free, words:/does not use the action/.test(TRICKS.b9_c6_dust.fx), again:!has('b9_c6_drovers', /Learn/)});
  /* the fire at dawn */
  talk('b9_c6_fire'); const f1 = DLG.b9_c6_fire(); out.fire1 = {html:/Rations/.test(f1.html || ''), talk:has('b9_c6_fire', /Talk with the squad/), rest:has('b9_c6_fire', /rest/), line:has('b9_c6_fire', /Into the line/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1])), noWit:!has('b9_c6_fire', /walking it for/)};
  out.fire1.lines = DLG.b9_c6_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {thegg:4}; take('b9_c6_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b9_c6_rest1 === 1;
  take('b9_c6_fire', /Into the line/); out.fire1.notYet = has('b9_c6_toline', /Not yet/); take('b9_c6_toline', /Into the line/);
  /* ================= phase 2: the line ================= */
  out.l = {area:S.area, ph:S.f.b9_c6_ph, arrive:S.node === 'b9_c6_arrive', notNow:has('b9_c6_arrive', /Not now/)};
  { const c = vis('b9_c6_arrive').find(x => x.check); out.l.noDrill = (edgesFor(c, 'tobet').find(e => /drill/.test(e[0])) || [])[1] || 0; S.f.b9_c2_drilled = 1; out.l.drill = (edgesFor(c, 'tobet').find(e => /drill/.test(e[0])) || [])[1] || 0; delete S.f.b9_c2_drilled; }
  { const sn = JSON.stringify(S); near('b9_c6_arrive', /Lock the line/, 'tobet'); out.l.near = ((S.bruised || {}).tobet || 0) > 0; restore(sn, 'b9_c6_line'); }
  /* the trick's battle half: free, a 3×3 of dust */
  startBattle('b9_c6_line', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'thegg'); out.t.button = !!u && u.ab.includes('t_b9_c6_dust') && abOk(u, 't_b9_c6_dust'); B.cur = u; const s0 = (B.smoke || []).length; AB.t_b9_c6_dust.run(u, u.x, Math.max(0, u.y - 3)); out.t.smoke = (B.smoke || []).length - s0; }
  leave('b9_c6_line'); S.f.b9_c6_ph = 2;
  out.l.fight = await force('b9_c6_line', {surprise:'p'}); out.l.done = S.f.b9_c6_lineDone;
  out.l.news = /next company east has lost a file/.test(DLG.b9_c6_line_after().txt);
  take('b9_c6_line_after', /piece of something/); out.l.plate = S.kit.includes('b9_c6_plate'); out.l.plateOnce = !has('b9_c6_shields', /piece of something/);
  /* ================= the key, from Ennic ================= */
  talk('b9_c6_ennic'); const kn = DLG.b9_c6_key();
  out.key = {node:S.node, line:has('b9_c6_key', /The stretch/), train:has('b9_c6_key', /The train/), notYet:has('b9_c6_key', /Not yet/), html:/Rations/.test(kn.html || ''), booked:/where Yelt's book says/.test(kn.txt)};
  const snapK = JSON.stringify(S), ratK = b9Rations(), loyK = Object.assign({}, S.loy);
  /* ================= key: line ================= */
  take('b9_c6_key', /The stretch/); out.k1 = {key:S.f.b9_c6_key, ph:S.f.b9_c6_ph, thegg:S.loy.thegg - loyK.thegg, rat:b9Rations() - ratK};
  take('b9_c6_key_line', /The line/); out.k1.node = S.node; out.k1.notNow = has('b9_c6_afternoon', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c6_afternoon', /Swing the Sixth/, 'thegg'); out.k1.near = !!(S.rattled || {}).thegg; restore(sn, 'b9_c6_line'); }
  { const sn = JSON.stringify(S); made('b9_c6_afternoon', /Swing the Sixth/, 'thegg'); out.k1.closed = S.f.b9_c6_gapClosed === 1 && S.f.b9_c6_keyDone === 1; restore(sn, 'b9_c6_line'); }
  out.k1.gap = await force('b9_c6_gap', {}); out.k1.gapDone = S.f.b9_c6_gapDone === 1 && S.f.b9_c6_keyDone === 1;
  take('b9_c6_gap_after', /Hold the stretch/); out.k1.held = has('b9_c6_held', /Not yet/); take('b9_c6_held', /The Finadd/);
  out.k1.pull = {node:S.node, ph:S.f.b9_c6_ph, notNow:has('b9_c6_pullback', /Not now/)};
  { const sn = JSON.stringify(S); near('b9_c6_pullback', /Go back in step/, 'tobet'); out.k1.pull.near = ((S.bruised || {}).tobet || 0) > 0; if (B) leave('b9_c6_line'); restore(sn, 'b9_c6_line'); }
  out.k1.dusk = await force('b9_c6_dusk', {}); out.k1.duskDone = S.f.b9_c6_duskDone === 1 && S.f.b9_c6_ph === 5;
  take('b9_c6_dusk_after', /The rise/); out.k1.area = S.area;
  out.k1.eve = {news:/the foreigners' rearguard is still out there/.test(DLG.b9_c6_eve_arrive().txt), flag:S.f.b9_c6_news, html:/Rations/.test(DLG.b9_c6_eve_arrive().html || '')};
  ['b9_c6_edge', 'b9_c6_banner', 'b9_c6_newline', 'b9_c6_eve_train', 'b9_c6_eve_yelt', 'b9_c6_eve_tilewoman'].forEach(k => talk(k));
  talk('b9_c6_fire'); out.k1.eve.noNight = !has('b9_c6_fire', /^Night/) && !has('b9_c6_fire', /walking it for/);
  /* the road: from the same moment, each road to the end; the Witness beat after it */
  take('b9_c6_eve_arrive', /The Finadd/); const rn = DLG.b9_c6_road();
  out.road = {roads:has('b9_c6_road', /brigades/) && has('b9_c6_road', /East/) && has('b9_c6_road', /Home/), notNow:has('b9_c6_road', /Not now/), html:/Rations/.test(rn.html || '')};
  const snapR = JSON.stringify(S), ratR = b9Rations(), ends = {};
  for (const [re, road] of [[/brigades/, 'escort'], [/East/, 'adjunct'], [/Home/, 'home']]) { restore(snapR, 'b9_c6_rise'); talk('b9_c6_road'); take('b9_c6_road', re);
    const e = {road:S.f.b9_lethRoad, lr:b9LethRoad()}; e.ask = has('b9_c6_road_done', /Ask it/) && has('b9_c6_road_done', /Not now/); take('b9_c6_road_done', /Ask it/);
    e.wit = vis('b9_c6_witness').length; take('b9_c6_witness', road === 'home' ? /column turns/ : road === 'adjunct' ? /somebody saw it/ : /Each other/); e.rec = (S.b9.wit || {}).c6;
    take('b9_c6_wit_done', /Back to the fire/); e.night = has('b9_c6_fire', /^Night/) && has('b9_c6_fire', /Not now/) && !has('b9_c6_fire', /walking it for/);
    take('b9_c6_fire', /^Night/); e.notYet = has('b9_c6_onward', /Not yet/); take('b9_c6_onward', /^Night/); await wait(60);
    e.end = {view, ch:S.chapters[6], rat:b9Rations(), lvl:S.lvl, endText:(CHEND[6] || {}).line && CHEND[6].line[0], extras:CHAPTERS[6].extras().length, journal:CHAPTERS[6].journal().length, fates:CHAPTERS[6].fates.pages().length, sgt:/./.test(CHAPTERS[6].fates.line('sgt')), third:JSON.stringify(S.th.t && S.th.t.squad) === thirdKeep || JSON.stringify(S.squad) === thirdKeep};
    ends[road] = e; }
  out.ends = ends;
  /* the Witness: Not now records nothing; and a doubting squad has "home" said plainly */
  { restore(snapR, 'b9_c6_rise'); S.f.b9_lethRoad = 'escort'; talk('b9_c6_witness'); take('b9_c6_witness', /Not now/); out.road.notNowNothing = !(S.b9.wit || {}).c6;
    restore(snapR, 'b9_c6_rise'); S.b9.wit = {c4:'doubt'}; out.road.doubt = b9Faith('l') === 'doubt' && has('b9_c6_road', /Say it plainly/) && /says the word home/.test(DLG.b9_c6_road().txt);
    S.b9.wit = {c4:'kept'}; out.road.kept = !has('b9_c6_road', /Say it plainly/); }
  /* ================= key: train, from the same moment ================= */
  restore(snapK, 'b9_c6_line');
  take('b9_c6_key', /The train/); out.k2 = {key:S.f.b9_c6_key, ph:S.f.b9_c6_ph, brennet:S.loy.brennet != null ? S.loy.brennet - (loyK.brennet || 0) : 'n/a'};
  take('b9_c6_key_train', /Back to the wagons/); out.k2.area = S.area; out.k2.node = S.node; take('b9_c6_tr_arrive', /east side/);
  ['b9_c6_tr_yelt', 'b9_c6_tr_saffa', 'b9_c6_tr_tilewoman', 'b9_c6_tr_orla', 'b9_c6_tr_wagon', 'b9_c6_tr_barrels', 'b9_c6_tr_crates', 'b9_c6_tr_oxen'].forEach(k => talk(k));
  { const c = vis('b9_c6_tr_dust').find(x => x.check); out.k2.rations = !!c.rations; out.k2.notNow = has('b9_c6_tr_dust', /Not now/); out.k2.book = (edgesFor(c, 'tobet').find(e => /Yelt's book/.test(e[0])) || [])[1] || 0; }
  { const sn = JSON.stringify(S); near('b9_c6_tr_dust', /Draw the last wagons/, 'tobet'); out.k2.near = ((S.bruised || {}).tobet || 0) > 0; if (B) leave('b9_c6_train'); restore(sn, 'b9_c6_train'); }
  const r2 = b9Rations(); out.k2.fight = await force('b9_c6_train', {surprise:'p'}); out.k2.up = b9Rations() - r2; out.k2.held = S.f.b9_c6_trainHeld === 1 && S.f.b9_c6_keyDone === 1;
  talk('b9_c6_train_after'); out.k2.once = b9Rations() - r2; out.k2.after = has('b9_c6_train_after', /Not now/);
  take('b9_c6_train_after', /Back to the line/); out.k2.pull = S.node === 'b9_c6_pullback';
  out.k2.dusk = await force('b9_c6_dusk', {}); take('b9_c6_dusk_after', /The rise/); talk('b9_c6_road'); take('b9_c6_road', /brigades/); take('b9_c6_road_done', /Not now/);
  out.k2.trainLine = /every barrel in them/.test(DLG.b9_c6_eve_train().txt);
  take('b9_c6_fire', /^Night/); take('b9_c6_onward', /^Night/); await wait(60);
  out.k2.end = {view, ch:S.chapters[6], rat:b9Rations(), endText:CHEND[6].train[0], extras:CHAPTERS[6].extras().some(x => /supply train/.test(x)), wit:!(S.b9.wit || {}).c6};
  /* ================= a --from=6 style save: keys only (Ch 4 forage, so the train is strung out), Perrit dead, Ilsa walking, Kaedra waiting ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Syn'); S.picksDue = []; save(); Object.assign(S.f, {b9_c2_key:'drill', b9_c4_key:'forage', b9_brennetDone:1, b9_kaedraDone:2}); startChapter(6); S.picksDue = [];
  S.squad = ['sgt', 'tobet', 'thegg', 'ammet', 'ilsa', 'brennet']; S.dead.perrit = {ch:6, where:'the river', from:'rg'}; S.camp = ['kaedra'];
  ['ilsa', 'brennet', 'kaedra'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.lvl = 13; S.xp = LEVELS[12]; save();
  out.y = {renderErr:renderAll(), reader:b9Rd().id, rat:b9Rations(), lines:DLG.b9_c6_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, noPerrit:!/Perrit/.test(DLG.b9_c6_fire_talk().txt),
    drilled:/Malazan sergeant drilled it/.test(DLG.b9_c6_arrive().txt), kaeNpc:AREAS.b9_c6_line.npcs.find(n => n.id === 'kaedra').show(), teach:/Brennet/.test(DLG.b9_c6_drovers().txt), strung:/strung out/.test(DLG.b9_c6_key().txt)};
  out.y.audit = audit();
  S.f.b9_lethRoad = 'adjunct'; out.y.fates = CHAPTERS[6].fates.pages().map(p => p.id).join(',');
  save(); const sid = S.sid; const back = loadSlot(sid); out.y.reload = !!back && back.thread === 'l' && !!back.th && !!back.th.t && back.squad.includes('ilsa') && back.f.b9_lethRoad === 'adjunct';
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, e = r.e || {}, t = r.t || {}, f1 = r.fire1 || {}, l = r.l || {}, key = r.key || {}, k1 = r.k1 || {}, road = r.road || {}, ends = r.ends || {}, k2 = r.k2 || {}, y = r.y || {};
if (f.area) {
  f.area === 'b9_c6_line' && f.ch === 6 && f.thread === 'l' && f.lvl0 === 11 && f.rat0 === 5 && f.march === 1 && f.squad === 'sgt,tobet,thegg,perrit,ammet' && !f.renderErr.length && f.title === 'Dust on the Horizon' && f.areas === 3 && f.fights === 4 && f.items && f.itemN === 2 && f.scale && f.plate && f.fig && f.ground && f.kindKept && f.scenes && f.fireRoster && f.read6 && f.fates
    ? ok(`a fresh start opens Chapter Six on the line: the Letherii at level 11, the march eats 1 (Rations 6 to 5); every b9_c6 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); two items with art and roles; the short-tail drawn (kind 'khell' kept); the ground; five backdrops; the fates for Ch 7`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 5 && au.tricks === 1 && !au.noNear.length && au.onwards >= 6 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.tiles && f.dust ? ok('the start: first light on the line, the dust on the horizon, the reading offered at the first halt') : no('start ' + JSON.stringify({ph:f.ph, tiles:f.tiles, dust:f.dust}));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.cardNode === 'b9_c6_card' && rd.cardSp === 'The Tiles of the Holds' && rd.cardBack === 'b9_c6_fire' && rd.again && rd.where ? ok('the Tiles reading opens at a shield on the plain: Perrit lays the tiles from B9POOL[6]; the card node is the visions pass\'s hook (b9_c6_card); back to b9_c6_fire; offered once') : no('reading ' + JSON.stringify(rd));
e.orders === 1 && e.notNow && e.cairn && e.storm && e.noLine && e.scale && e.html && e.tw ? ok('the Finadd\'s orders (from the cairn to the wash), the storm that is not; the fire holds the way on until the scale is out; Yelt\'s escort scale; Orla, the cairn, the wash, the shields') : no('orders ' + JSON.stringify(e));
t.dc === 18 && t.stat === 'wits' && t.noNear && t.notNow && t.brennet === 2 && t.teacher && t.who === 'thegg' && t.ok === 1 && t.free && t.words && t.again && t.button && t.smoke >= 8
  ? ok('the trick: Raise the Dust, a ✦ wits 18 check that names the carting houses\' dust; free (one free trick a turn); in a fight a 3×3 of dust') : no('trick ' + JSON.stringify(t));
f1.html && f1.talk && f1.rest && f1.line && f1.notNow && f1.noWit && f1.lines === f1.here && f1.rested && f1.notYet ? ok(`the fire at dawn: Rations shown, a rest, the talk (a line each, ${f1.lines}), into the line with Not yet beside it`) : no('fire1 ' + JSON.stringify(f1));
l.area === 'b9_c6_line' && l.ph === 2 && l.arrive && l.notNow && l.noDrill === 0 && l.drill === 2 && l.near && l.fight && l.fight.started && l.fight.stage2 && l.fight.inStage2 && l.fight.allies === 2 && l.fight.foes === 3 && !l.fight.mortal && l.fight.death && l.fight.death2 && l.fight.kinds === 'khell' && l.fight.after === 'b9_c6_line_after' && l.done === 1 && l.news && l.plate && l.plateOnce
  ? ok('the line: the dust comes on; the line check (Ch 2\'s drill +2; its "yes, but": a numb arm); the short-tails (three, two escort soldiers beside the squad), the second rank; NOT mortal, death checks run in both stages; the news as headline; the plate') : no('line ' + JSON.stringify(l).slice(0, 900));
key.node && key.line && key.train && key.notYet && key.html && key.booked ? ok('the key at noon, from the Finadd: the stretch, the train, Not yet; Rations shown; Ch 4\'s book: the train where it should be') : no('key ' + JSON.stringify(key));
k1.key === 'line' && k1.ph === 3 && k1.thegg === 1 && k1.rat === 0 && k1.node === 'b9_c6_afternoon' && k1.notNow && k1.near && k1.closed && k1.gap && k1.gap.started && !k1.gap.mortal && k1.gap.death && k1.gapDone && k1.held && k1.pull.node === 'b9_c6_pullback' && k1.pull.ph === 4 && k1.pull.notNow && k1.pull.near && k1.dusk && k1.dusk.survive && k1.duskDone && k1.area === 'b9_c6_rise' && k1.eve.news && k1.eve.flag === 1 && k1.eve.html && k1.eve.noNight
  ? ok('key line: Thegg +1; the afternoon gap (closed with the next company, or the gap fight, not mortal); the pull-back to the rise (a survive fight; its "yes, but": an ankle); the rearguard news at dusk') : no('line key ' + JSON.stringify(k1).slice(0, 1000));
const endsOk = ['escort', 'adjunct', 'home'].every(k => { const x = ends[k]; return x && x.road === k && x.lr === k && x.ask && x.wit === 4 && x.night && x.notYet && x.end && x.end.view === 'end' && x.end.ch === 'line' && x.end.endText === 'The stretch held' && x.end.fates >= 5 && x.end.sgt && x.end.third && x.end.extras >= 4; });
endsOk && ends.escort.rec === 'kept' && ends.adjunct.rec === 'kept' && ends.home.rec === 'doubt' && road.roads && road.notNow && road.html && road.notNowNothing && road.doubt && road.kept
  ? ok(`every Letherii road reaches the end (escort, adjunct, home; S.f.b9_lethRoad), each with the Witness beat after it (kept / kept / doubt; Not now records nothing); a doubting squad says home plainly; level ${ends.escort.end.lvl}, Rations ${ends.escort.end.rat}; the fates read (${ends.escort.end.fates} pages)`) : no('roads ' + JSON.stringify({road, ends}).slice(0, 1400));
k2.key === 'train' && k2.ph === 3 && k2.area === 'b9_c6_train' && k2.node === 'b9_c6_tr_arrive' && k2.rations && k2.notNow && k2.book === 2 && k2.near && k2.fight && k2.fight.started && k2.fight.survive && !k2.fight.mortal && k2.fight.death && k2.fight.allies === 1 && k2.up === 2 && k2.once === 2 && k2.held && k2.after && k2.pull && k2.dusk && k2.dusk.started && k2.trainLine && k2.end && k2.end.view === 'end' && k2.end.ch === 'train' && k2.end.extras && k2.end.endText === 'The wagons came through' && k2.end.wit
  ? ok(`key train, from the same moment: back to the wagons (a rations check; Ch 4's book +2; a "yes, but": a spoke-bruise); hold them (survive 5, not mortal); Rations +2 once, S.f.b9_c6_trainHeld; the end on train, Rations ${k2.end.rat} (the Witness left for Not now)`) : no('train key ' + JSON.stringify(k2).slice(0, 1000));
y.renderErr && !y.renderErr.length && y.reader === 'tilewoman' && y.rat === 5 && y.lines === y.here && y.noPerrit && y.drilled && y.kaeNpc && y.teach && y.strung && !y.audit.noNear.length && !y.audit.noStay.length && /tobet/.test(y.fates) && /kaedra/.test(y.fates) && /sgt$/.test(y.fates) && y.reload
  ? ok(`a --from=6 style save (keys only: drill, forage; Perrit dead; Ilsa and Brennet walking, Kaedra waiting): every node renders, the tile-woman reads, a line each at the fire (${y.lines}); the drill shows on the line; Kaedra waits with the outriders; the train strung out; the fates list walkers, the waiting and the sergeant; the save reloads`) : no('transfer ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b9ch6: FAIL (${bad.length})` : 'b9ch6: all ok'); process.exit(bad.length ? 1 : 0);
