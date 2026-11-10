// Book Nine, Chapter 5 (Short Rations, src/165_b9_ch5.js): the Third's halts, both keys from the same moment at the dead sutler's cache,
// the reading on bare ground (the Deck; and the card node the visions pass hooks onto), the fire (Rations shown, a rest, a line each,
// the Witness beat, Not now), Tegra's join at the first halt (or waiting at the guides' fire when six walk), every fight's start and a
// forced win (the cache on both grounds, the bull, the dogs), the trick behind its ✦ hard check (taught, free, witness:true, and its
// battle half), the items (each with art), the Rations moves (the march −2; the bull +2 once; the bull's "yes, but" −1; keep +2 / share 0),
// the far dust at the end, "Not now" on every onward step and a "yes, but" on every check, from a fresh start and from a --from=5 style
// transfer save (Marrow dead; Doss and Wenna walking, so Tegra waits).
// Usage: node tools/b9ch5_test.mjs   (build first; exit 1 on a failure)
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
  const roll = (id, re, who, tier, pass) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c);
    settleRoll({who, stat:c.check[0], tier, ok:pass, pass, margin:pass ? 6 : -4, nat:pass ? 18 : 4}, c); return c; };
  const made = (id, re, who) => { const c = roll(id, re, who, 'clean', true); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => roll(id, re, who, 'near', true);
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('dod'); b9Use('t'); startExplore(area); };
  const leaveBattle = area => { B = null; view = 'scene'; S.scene = 'talk'; startExplore(area); };
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b9_c5_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  /* Keneb and Hedge may be named here, seen far off (dod-canon §4: seen at a distance); nobody else on the never-speaks list, and never the never-use names */
  const never = /Bridgeburner|Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|short-tail|Fiddler|Tarr\b|Cuttle|Bavedict|Blistig|Errant|Brys|Aranict|Henar|Ublala|Kalam|Tehol|Tool\b|Hetan|Stolmen|Sekara|Setoc|Snake|\bweeks?\b|\bmonths?\b|fortnight|Glass Desert|Forkrul|Chancel|White Face|Senan|Gesler|Stormy|Sinter|Kisswhere|Masan|Pores|Bredd|Throatslitter|Kalyth|Che'Malle|Shi'gal|Quick Ben|Bottle|Koryk|Tavore|Bonehunters/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set();
    const keep = JSON.stringify(S.f);
    [1, 2, 3].forEach(ph => ['share', 'keep', null].forEach(k => [0, 1].forEach(fl => { S.f.b9_c5_ph = ph; S.f.b9_c5_key = k;
      ['b9_c5_orders1', 'b9_c5_orders2', 'b9_c5_dug', 'b9_c5_searched', 'b9_c5_found', 'b9_c5_cacheDone', 'b9_c5_bullDone', 'b9_c5_dogsDone', 'b9_tegraDone', 'b9_c5_cairn'].forEach(f => { S.f[f] = fl ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Fresh'); S.picksDue = []; save(); startChapter(5); S.picksDue = []; save();
  const lethKeep = JSON.stringify(S.th.l && S.th.l.squad);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, rat0:b9Rations(), march:S.f.b9_march5, squad:S.squad.join(','), renderErr:renderAll(), title:CHAPTERS[5].title, nodes:nodes.length, areas:CHAPTERS[5].areas.length, fights:Object.keys(CHAPTERS[5].battles).length,
    items:Object.keys(CHAPTERS[5].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[5].gear).length,
    artOwn:['b9_c5_barghastaxe', 'b9_c5_sutlerspack', 'b9_c5_dustscarf'].every(k => /aria-label/.test(ART['item/' + k]) && ART['item/' + k] !== ART['item/b9_c3_akrynknife'] && ART['item/' + k] !== ART['item/b9_c3_boilingpot'] && ART['item/' + k] !== ART['item/b9_c3_feverbark']),
    axe:ITEMS.b9_c5_barghastaxe && ITEMS.b9_c5_barghastaxe.slot === 'weapon' && ITEMS.b9_c5_barghastaxe.role === 'blade' && ITEMS.b9_c5_barghastaxe.dmg[2] === 4,
    pack:ITEMS.b9_c5_sutlerspack && ITEMS.b9_c5_sutlerspack.slot === 'trinket', scarf:ITEMS.b9_c5_dustscarf && ITEMS.b9_c5_dustscarf.slot === 'trinket',
    fig:typeof FIGX.tegra === 'function', ground:typeof TILEX.b9_c5_wastes === 'function',
    scenes:['b9_wastes_night', 'b9_dust', 'b9_c5_plain', 'b9_c5_wash'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.dod[5] || []).includes('b9_c5_fire'), audit:audit(), read5:!!B9READ[5] && !!B9READ[5].say.marrow && !!B9READ[5].say.tallow && !!B9READ[5].say.oldninth && B9READ[5].back === 'b9_c5_fire'};
  /* draw every backdrop at phone size in each phase (no page errors) */
  { const cv = document.createElement('canvas'); cv.width = 390; cv.height = 300; [1, 2, 3].forEach(ph => { S.f.b9_c5_ph = ph; ['b9_wastes_night', 'b9_dust', 'b9_c5_plain', 'b9_c5_wash'].forEach(k => SCENEX[k](cv, 1000)); }); S.f.b9_c5_ph = undefined; }
  /* the start: night, the reading and Tegra among the first halt's choices */
  talk('b9_c5_start'); out.f.ph = S.f.b9_c5_ph; out.f.deck = has('b9_c5_start', /Marrow|Deck|card/i) || vis('b9_c5_start').length >= 4; out.f.teg = has('b9_c5_start', /guides' fire/);
  talk('b9_c5_read'); const rd = DLG.b9_c5_read(); const lay = rd.ch.find(c => /cut|lay|draw|turn/i.test(c.t) && !/Not now/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b9_c5_drawn, reader:S.f.b9_c5_reader, inPool:B9POOL[5].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), cardNode:cardNodeName(), cardBack:DLG.b9_c5_card().ch[0].go, again:!has('b9_c5_fire', /Marrow lay|Sit with/), where:/bare ground/.test(DLG.b9_c5_card().txt + B9READ[5].where)};
  /* Thallo's word: the ration cut */
  talk('b9_c5_thallo'); out.t1 = {orders:S.f.b9_c5_orders1, notNow:has('b9_c5_thallo', /Not now/), cut:/Half a biscuit/.test(DLG.b9_c5_thallo().txt)}; take('b9_c5_thallo', /How long/);
  /* Tegra joins at the first halt */
  talk('b9_c5_tegra'); out.k = {notNow:has('b9_c5_tegra', /Not now/)}; take('b9_c5_tegra', /Which clan/); out.k.noClan = /do not say the name/.test(DLG.b9_c5_tegra_why().txt);
  take('b9_c5_tegra_why', /Walk with us/); clearModal(); out.k = Object.assign(out.k, {in:b9In('tegra'), flag:S.f.b9_tegraDone, line:/Tegra/.test(DLG.b9_c5_fire_talk().txt), fire:/Tegra/.test(DLG.b9_c5_fire().txt), god:PATRONS.tegra ? PATRONS.tegra.god : null});
  /* Harro: the dead sutler, the scarf (a "yes, but" in silver: money is the scene), the wash */
  talk('b9_c5_harro'); out.h = {notNow:has('b9_c5_harro', /Not now/), sutler:/Kartool/.test(DLG.b9_c5_harro().txt)};
  { const sn = JSON.stringify(S), s0 = S.silver; near('b9_c5_harro', /Talk him down/, 'tangle'); out.h.near = s0 - S.silver === 3 && S.kit.includes('b9_c5_dustscarf'); restore(sn, 'b9_c5_camp'); }
  made('b9_c5_harro', /Talk him down/, 'tangle'); out.h.scarf = S.kit.includes('b9_c5_dustscarf'); take('b9_c5_harro', /This wash/); out.h.wash = S.f.b9_c5_harroWash === 1;
  talk('b9_c5_wagons'); talk('b9_c5_heavies'); take('b9_c5_heavies', /Count the days/); talk('b9_c5_camp_east'); talk('b9_c5_oldmarine');
  out.h.heavies = S.f.b9_c5_heavies === 1; out.h.noTrick1 = !vis('b9_c5_oldmarine').some(c => c.trick);
  /* the fire, the first night */
  talk('b9_c5_fire'); const f1 = DLG.b9_c5_fire(); out.fire1 = {html:/Rations/.test(f1.html || ''), short:/Short rations/.test(f1.txt), talk:has('b9_c5_fire', /Talk with the squad/), rest:has('b9_c5_fire', /rest/), turn:has('b9_c5_fire', /Turn in/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t), noWit:!has('b9_c5_fire', /What are we marching/)};
  out.fire1.lines = DLG.b9_c5_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {haddat:4}; take('b9_c5_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b9_c5_rest1 === 1;
  take('b9_c5_fire', /Turn in/); out.fire1.notYet = has('b9_c5_turnin', /Not yet/); take('b9_c5_turnin', /First light/);
  /* ================= phase 2: the noon halt ================= */
  out.d = {area:S.area, ph:S.f.b9_c5_ph, arrive:S.node === 'b9_c5_day_arrive', tegra:/Tegra/.test(DLG.b9_c5_day_arrive().txt)};
  take('b9_c5_day_arrive', /Thallo/); out.d.rumour = /Two of the marines' sergeants are gone/.test(DLG.b9_c5_thallo2().txt) && !/tent/.test(DLG.b9_c5_thallo2().txt); out.d.orders = S.f.b9_c5_orders2;
  talk('b9_c5_rise'); out.d.keneb = /Keneb/.test(DLG.b9_c5_rise().txt) && /fetch/.test(DLG.b9_c5_rise().txt) && vis('b9_c5_rise').length === 1;
  talk('b9_c5_sappers'); out.d.hedge = /leather cap/.test(DLG.b9_c5_sappers().txt) && /not enough/.test(DLG.b9_c5_sappers().txt) && vis('b9_c5_sappers').length === 1;
  talk('b9_c5_plain_east');
  /* the bull: driven off (the "yes, but": a ration gone, once), or killed (+2 once) */
  talk('b9_c5_bull'); out.b = {notNow:has('b9_c5_bull', /Not now/)};
  { const sn = JSON.stringify(S), r0 = b9Rations(); near('b9_c5_bull', /Shields and noise/, 'brask'); talk('b9_c5_bull_gone'); out.b.near = b9Rations() - r0; out.b.driven = S.f.b9_c5_bullDone === 'driven'; restore(sn, 'b9_c5_plain'); }
  const rb = b9Rations(); out.b.fight = await force('b9_c5_bull'); out.b.up = b9Rations() - rb; talk('b9_c5_bull_after'); out.b.once = b9Rations() - rb; out.b.killed = S.f.b9_c5_bullDone === 'killed';
  /* the way south */
  talk('b9_c5_south'); out.s = {onward:vis('b9_c5_south').some(c => c.onward), notNow:has('b9_c5_south', /Not now/)}; take('b9_c5_south', /South, to the wash/);
  out.s.area = S.area; out.s.arrive = S.node === 'b9_c5_wash_arrive';
  /* the dig: Tegra's water-lore (a rations check; its "yes, but": a bank comes down), the axe on either outcome */
  talk('b9_c5_dig'); out.g = {notNow:has('b9_c5_dig', /Not now/), rations:!!vis('b9_c5_dig').find(c => c.check).rations, edge:(edgesFor(vis('b9_c5_dig').find(c => c.check), 'tegra').find(e => /plains/.test(e[0])) || [])[1] || 0};
  { const sn = JSON.stringify(S); near('b9_c5_dig', /Dig it/, 'tegra'); out.g.near = ((S.bruised || {}).tegra || 0) > 0; restore(sn, 'b9_c5_wash'); }
  made('b9_c5_dig', /Dig it/, 'tegra'); out.g.dug = S.f.b9_c5_dug; out.g.axe = S.kit.includes('b9_c5_barghastaxe');
  /* the dogs: optional, every way */
  talk('b9_c5_dogs'); out.dg = {notNow:has('b9_c5_dogs', /Not now/), leave:has('b9_c5_dogs', /Leave them the mule/)};
  { const sn = JSON.stringify(S); near('b9_c5_dogs', /Stones and noise/, 'brask'); out.dg.near = ((S.bruised || {}).brask || 0) > 0; restore(sn, 'b9_c5_wash'); }
  out.dg.fight = await force('b9_c5_dogs'); out.dg.done = S.f.b9_c5_dogsDone;
  /* the shade, the cairn */
  talk('b9_c5_shade'); take('b9_c5_shade', /Stones over him/); out.sh = {cairn:S.f.b9_c5_cairn === 1};
  /* the wreck: the floor (a "yes, but": a nail), then the men on the lip */
  talk('b9_c5_wreck'); out.w = {notNow:has('b9_c5_wreck', /Not now/), harro:(edgesFor(vis('b9_c5_wreck').find(c => c.check), 'haddat').find(e => /Harro/.test(e[0])) || [])[1] || 0};
  { const sn = JSON.stringify(S); near('b9_c5_wreck', /Go over it/, 'mehet' in TPL && b9In('mehet') ? 'mehet' : 'tangle'); out.w.near = Object.values(S.bruised || {}).some(v => v > 0); restore(sn, 'b9_c5_wash'); }
  made('b9_c5_wreck', /Go over it/, 'tangle'); out.w.found = S.f.b9_c5_found; out.w.comers = AREAS.b9_c5_wash.npcs.find(n => n.id === 'comers').show();
  talk('b9_c5_comers'); out.w.cNot = has('b9_c5_comers', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c5_comers', /Down behind the wreck/, 'tegra'); out.w.cNear = ((S.bruised || {}).tegra || 0) > 0; if (B) leaveBattle('b9_c5_wash'); restore(sn, 'b9_c5_wash'); }
  out.w.fight = await force('b9_c5_cache', {surprise:'p'}); out.w.done = S.f.b9_c5_cacheDone; out.w.pack = S.kit.includes('b9_c5_sutlerspack');
  out.w.toKey = has('b9_c5_cache_after', /The cache/); out.w.wreckKey = DLG.b9_c5_wreck().sp === 'The cache';
  /* ================= the key, at the cache ================= */
  talk('b9_c5_key'); const kn = DLG.b9_c5_key();
  out.key = {share:has('b9_c5_key', /company's pot/), keep:has('b9_c5_key', /It's ours/), notYet:has('b9_c5_key', /Not yet/), html:/Rations/.test(kn.html || ''), tegra:/Tegra/.test(kn.txt), brask:!b9In('brask') || /Brask/.test(kn.txt), haddat:/Haddat/.test(kn.txt)};
  const snapK = JSON.stringify(S), ratK = b9Rations(), loyK = {...S.loy};
  /* ================= key: share ================= */
  take('b9_c5_key', /company's pot/); out.sh5 = {key:S.f.b9_c5_key, shared:S.f.b9_c5_shared, rat:b9Rations() - ratK, brask:b9In('brask') ? S.loy.brask - loyK.brask : 1, haddat:S.loy.haddat - loyK.haddat};
  out.sh5.notNow = has('b9_c5_key_share', /Not now/); take('b9_c5_key_share', /Back to the column/); out.sh5.backNot = has('b9_c5_wash_back', /Not now/); take('b9_c5_wash_back', /The camp, at dusk/);
  out.sh5.area = S.area; out.sh5.ph = S.f.b9_c5_ph; out.sh5.arrive = /pot is thicker/.test(DLG.b9_c5_camp2_arrive().txt);
  talk('b9_c5_thallo3'); out.sh5.thallo = /thank you/.test(DLG.b9_c5_thallo3().txt);
  talk('b9_c5_harro'); out.sh5.other = /Letherii escort caught a thief/.test(DLG.b9_c5_harro().txt);
  /* the Witness beat at the dung-fire */
  talk('b9_c5_fire'); const f3 = DLG.b9_c5_fire(); out.wit = {html:/Rations/.test(f3.html || ''), wit:has('b9_c5_fire', /What are we marching/), noTurn:!has('b9_c5_fire', /Turn in/), east:has('b9_c5_fire', /First light/), notNow:has('b9_c5_fire', /Not now/), noRead:!has('b9_c5_fire', /Marrow|card|Deck/)};
  take('b9_c5_fire', /What are we marching/); out.wit.whtml = /Rations/.test(DLG.b9_c5_witness().html || ''); out.wit.opts = vis('b9_c5_witness').length; out.wit.stay = has('b9_c5_witness', /Not now/);
  { const sn = JSON.stringify(S); take('b9_c5_witness', /Not now/); out.wit.notNowNothing = !(S.b9.wit || {}).c5; restore(sn, 'b9_c5_camp');
    const res = {};
    [[/Our own witness/, 'kept', 'own'], [/Each other/, 'kept', 'each'], [/Nothing\. We march/, 'doubt', 'nothing']].forEach(([re, v, f]) => { const s2 = JSON.stringify(S); talk('b9_c5_witness'); take('b9_c5_witness', re); res[f] = (S.b9.wit || {}).c5 === v && S.f.b9_c5_wit === f && DLG.b9_c5_wit_done().txt.length > 80; restore(s2, 'b9_c5_camp'); });
    out.wit.answers = res; }
  talk('b9_c5_witness'); take('b9_c5_witness', /Our own witness/); out.wit.rec = (S.b9.wit || {}).c5; out.wit.faith = b9Faith('t'); out.wit.fireHtml = /still marching/.test(DLG.b9_c5_fire().html || '');
  /* the trick: Our Own Witness, behind its ✦ check (witness:true) */
  talk('b9_c5_oldmarine'); const tc = vis('b9_c5_oldmarine').find(c => c.trick);
  out.t = {dc:tc && tc.check[1], stat:tc && tc.check[0], noNear:tc && !tc.near, wit:!!(tc && tc.witness), witEdge:(edgesFor(tc, 'haddat').find(e => /Our own witness/.test(e[0])) || [])[1] || 0, haddat:(edgesFor(tc, 'haddat').find(e => /names of the dead/.test(e[0])) || [])[1] || 0, back:has('b9_c5_oldmarine', /Back to the camp/)};
  made('b9_c5_oldmarine', /Learn to say it/, 'haddat');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b9_c5_witness && S.tricks.b9_c5_witness.who, ok:S.f.b9_c5_wordOk, free:!!AB.t_b9_c5_witness.free, words:/does not use the action/.test(TRICKS.b9_c5_witness.fx), again:!vis('b9_c5_oldmarine').some(c => c.trick)});
  startBattle('b9_c5_bull', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'haddat'), mate = B.units.find(x => x.side === 'p' && !x.ally && x !== u); mate.x = u.x + 1; mate.y = u.y; const foe = B.units.find(x => x.side === 'e'); foe.x = u.x; foe.y = u.y - 2;
    AB.t_b9_c5_witness.run(u); out.t.rally = (u.rallyUntil || 0) > B.round && (mate.rallyUntil || 0) > B.round; out.t.falter = foe.dazzleUntil != null && foe.dazzleUntil >= B.round; }
  leaveBattle('b9_c5_camp');
  /* first light, the far dust (once), the end */
  talk('b9_c5_fire'); take('b9_c5_fire', /First light/); out.sh5.notYet = has('b9_c5_onward', /Not yet/); out.sh5.dust = /Not the column's/.test(DLG.b9_c5_onward().txt) && /Tegra/.test(DLG.b9_c5_onward().txt); out.sh5.scene = DLG.b9_c5_onward().scene;
  out.sh5.cap = /not the column's/.test(SCENES.b9_dust.cap); out.sh5.htmlEnd = /Rations/.test(DLG.b9_c5_onward().html || '');
  const ratS = b9Rations(); take('b9_c5_onward', /East/); await wait(60);
  out.sh5.end = {view, ch:S.chapters[5], lvl:S.lvl, xp:S.xp, rat:ratS, dust:S.f.b9_c5_dust, extras:CHAPTERS[5].extras().length, journal:CHAPTERS[5].journal().length, endText:(CHEND[5] || {}).share && CHEND[5].share[0], leth:JSON.stringify(S.th.l && S.th.l.squad) === lethKeep || JSON.stringify(S.squad) === lethKeep};
  /* ================= key: keep, from the same moment ================= */
  restore(snapK, 'b9_c5_wash'); S.chapter = 5;
  take('b9_c5_key', /It's ours/); talk('b9_c5_key_keep'); out.kp = {key:S.f.b9_c5_key, shared:S.f.b9_c5_shared == null, rat:b9Rations() - ratK, tegra:S.loy.tegra - loyK.tegra, haddat:S.loy.haddat - loyK.haddat};
  talk('b9_c5_key_keep'); out.kp.once = b9Rations() - ratK; out.kp.heavy = /Didn't see anything/.test(DLG.b9_c5_skins().txt);
  take('b9_c5_key_keep', /Back to the column/); take('b9_c5_wash_back', /The camp, at dusk/); out.kp.arrive = /own packs/.test(DLG.b9_c5_camp2_arrive().txt); out.kp.thallo = /pork/.test(DLG.b9_c5_thallo3().txt);
  talk('b9_c5_fire'); out.kp.lines = DLG.b9_c5_fire_talk().txt.split('\n\n').length; out.kp.here = S.squad.filter(id => id !== 'sgt').length;
  take('b9_c5_fire', /First light/); out.kp.end1 = /belts a hole looser/.test(DLG.b9_c5_onward().txt);
  const ratP = b9Rations(); take('b9_c5_onward', /East/); await wait(60);
  out.kp.end = {view, ch:S.chapters[5], rat:ratP, tier:b9RatTier(ratP), extras:CHAPTERS[5].extras().some(x => /kept it/.test(x)), endText:CHEND[5].keep[0]};
  /* ================= a --from=5 style transfer save: Marrow dead; Doss and Wenna walking (six walk), so Tegra waits ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Syn'); S.picksDue = []; save(); S.f.b9_c3_key = 'press'; S.f.b9_c3_sick = 'tangle'; S.f.b9_braskDone = 1; S.f.b9_c4_key = 'forage'; startChapter(5); S.picksDue = [];
  S.squad = ['sgt', 'haddat', 'tangle', 'mirrel', 'doss', 'wenna']; S.dead.marrow = {ch:7, where:'the river', from:'rg'};
  ['doss', 'wenna'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.camp = ['brask']; S.imported = {from:'Syn', sid:'x', lvl:21, mates:['haddat', 'tangle', 'mirrel', 'doss', 'wenna'], lifted:false}; S.lvl = 21; S.xp = LEVELS[20]; save();
  out.y2 = {renderErr:renderAll(), reader:b9Rd().id, rat:b9Rations(), lines:DLG.b9_c5_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, doss:/Doss/.test(DLG.b9_c5_fire_talk().txt), wenna:/Wenna/.test(DLG.b9_c5_fire_talk().txt), noMarrow:!/Marrow/.test(DLG.b9_c5_fire_talk().txt), c3:/lost it somewhere/.test(DLG.b9_c5_start().txt)};
  S.f.b9_c5_ph = 3; S.f.b9_c5_key = 'keep'; out.y2.lines3 = DLG.b9_c5_fire_talk().txt.split('\n\n').length; S.f.b9_c5_ph = 1; S.f.b9_c5_key = undefined;
  talk('b9_c5_tegra'); take('b9_c5_tegra', /Walk with us/); out.y2.tegra = {flag:S.f.b9_tegraDone, in:b9In('tegra'), wait:ROSTER_BOOKS.dod.wait('tegra'), npc:AREAS.b9_c5_camp.npcs.find(n => n.id === 'tegra').show(), text:/six already walk/.test(DLG.b9_c5_tegra_join().txt), again:has('b9_c5_tegra', /Walk with us/)};
  S.f.b9_c5_ph = 2; out.y2.digGuide = /Tegra/.test(DLG.b9_c5_dig().txt) && AREAS.b9_c5_wash.npcs.find(n => n.id === 'tegra').show(); out.y2.other = /blue cavalry/.test((() => { S.f.b9_c5_ph = 3; const t = DLG.b9_c5_harro().txt; S.f.b9_c5_ph = 2; return t; })()); S.f.b9_c5_ph = 1;
  out.y2.audit = audit();
  save(); const sid = S.sid; const back = loadSlot(sid); out.y2.reload = !!back && back.thread === 't' && !!back.th && !!back.th.l && back.squad.includes('wenna') && back.f.b9_tegraDone === 2;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, t1 = r.t1 || {}, k = r.k || {}, h = r.h || {}, f1 = r.fire1 || {}, d = r.d || {}, b = r.b || {}, s = r.s || {}, g = r.g || {}, dg = r.dg || {}, sh = r.sh || {}, w = r.w || {}, key = r.key || {}, s5 = r.sh5 || {}, wit = r.wit || {}, t = r.t || {}, kp = r.kp || {}, y2 = r.y2 || {};
if (f.area) {
  f.area === 'b9_c5_camp' && f.ch === 5 && f.thread === 't' && f.lvl0 === 19 && f.rat0 === 4 && f.march === 1 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && !f.renderErr.length && f.title === 'Short Rations' && f.areas === 3 && f.fights === 3 && f.items && f.itemN === 3 && f.artOwn && f.axe && f.pack && f.scarf && f.fig && f.ground && f.scenes && f.fireRoster && f.read5
    ? ok(`a fresh start opens Chapter Five at the camp: the Third at level 19, the march eats 2 (Rations 6 to 4); every b9_c5 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art and roles; Tegra drawn; the ground; four backdrops`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 6 && au.tricks === 1 && !au.noNear.length && au.onwards >= 6 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.teg ? ok('the start: night at the camp, the reading and Tegra offered at the first halt') : no('start ' + JSON.stringify({ph:f.ph, deck:f.deck, teg:f.teg}));
}
rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.cardNode === 'b9_c5_card' && rd.cardBack === 'b9_c5_fire' && rd.again && rd.where ? ok('the reading on bare ground: Marrow deals from B9POOL[5]; the card node is the visions pass\'s hook (b9_c5_card); back to b9_c5_fire; offered once') : no('reading ' + JSON.stringify(rd));
t1.orders === 1 && t1.notNow && t1.cut ? ok('Thallo: the ration cut a step (half a biscuit, water by the cup), the guide hired') : no('thallo ' + JSON.stringify(t1));
k.notNow && k.noClan && k.in && k.flag === 1 && k.line && k.fire && k.god == null ? ok('Tegra joins at the first halt (her clan never named; no god), with her line at the fire') : no('tegra ' + JSON.stringify(k));
h.notNow && h.sutler && h.near && h.scarf && h.wash && h.heavies && h.noTrick1 ? ok('Harro: the dead Kartool sutler and his floor, the dust-scarf (its "yes, but" in silver: money is the scene), the wash; the heavies\' talk of the west; the old marine (no trick yet)') : no('harro ' + JSON.stringify(h));
f1.html && f1.short && f1.talk && f1.rest && f1.turn && f1.notNow && f1.noWit && f1.lines === f1.here && f1.rested && f1.notYet ? ok(`the fire, the first night: short rations named, Rations shown, a rest, the talk (a line each, ${f1.lines}), turning in with Not yet beside it`) : no('fire1 ' + JSON.stringify(f1));
d.area === 'b9_c5_plain' && d.ph === 2 && d.arrive && d.tegra && d.rumour && d.orders === 1 && d.keneb && d.hedge ? ok('the noon halt: "two sergeants gone in the night" (the one rumour, no tent); a lone officer far out, fetched back (Keneb\'s ride, seen and never touched); the munitions short at the sappers\' wagons (Hedge, at a distance)') : no('halt ' + JSON.stringify(d));
b.notNow && b.near === -1 && b.driven && b.fight && b.fight.started && b.fight.foes === 1 && b.fight.after === 'b9_c5_bull_after' && b.up === 2 && b.once === 2 && b.killed ? ok('the bull: driven off (its "yes, but": a sack of biscuit, a ration gone) or killed (Rations +2 once)') : no('bull ' + JSON.stringify(b));
s.onward && s.notNow && s.area === 'b9_c5_wash' && s.arrive ? ok('the way south to the wash, with Not now beside it') : no('south ' + JSON.stringify(s));
g.notNow && g.rations && g.edge === 2 && g.near && g.dug === 'ok' && g.axe ? ok('Tegra\'s dig for water under the sand (a rations check, her plains +2; a "yes, but": the bank comes down); the throwing-axe') : no('dig ' + JSON.stringify(g));
dg.notNow && dg.leave && dg.near && dg.fight && dg.fight.started && dg.fight.foes === 4 && dg.fight.after === 'b9_c5_dogs_after' && dg.done === 'fought' ? ok('the dogs up the wash (optional: fought, driven off, or left the mule)') : no('dogs ' + JSON.stringify(dg));
sh.cairn ? ok('the dead sutler in the shade, and a cairn') : no('shade ' + JSON.stringify(sh));
w.notNow && w.harro === 1 && w.near && w.found === 1 && w.comers && w.cNot && w.cNear && w.fight && w.fight.started && w.fight.stage2 && w.fight.inStage2 && w.fight.allies === 1 && w.fight.foes === 4 && w.fight.after === 'b9_c5_cache_after' && w.done === 1 && w.pack && w.toKey && w.wreckKey
  ? ok('the wreck: the false floor (Harro\'s word an edge; a "yes, but": a nail), the men on the lip, the cache fight (four, a heavy beside the squad; the officer at the wreck in stage 2); the sutler\'s pack') : no('wreck ' + JSON.stringify(w).slice(0, 900));
key.share && key.keep && key.notYet && key.html && key.tegra && key.brask && key.haddat ? ok('the key at the cache: share, keep, Not yet; Rations shown; Tegra, Brask and Haddat acknowledged') : no('key ' + JSON.stringify(key));
const wa = wit.answers || {}; wit.html && wit.wit && wit.noTurn && wit.east && wit.notNow && wit.noRead && wit.whtml && wit.opts === 4 && wit.stay && wit.notNowNothing && wa.own && wa.each && wa.nothing && wit.rec === 'kept' && wit.faith === 'kept' && wit.fireHtml
  ? ok('the Witness beat at the dung-fire on short rations: our own witness / each other (kept), nothing said out loud (doubt), Not now records nothing; the fire shows it after') : no('witness ' + JSON.stringify(wit));
t.dc === 19 && t.stat === 'wits' && t.noNear && t.wit && t.witEdge === 1 && t.haddat === 2 && t.back && t.who === 'haddat' && t.ok === 1 && t.free && t.words && t.again && t.rally && t.falter
  ? ok('the trick: Our Own Witness, a ✦ wits 19 check carrying witness:true ("Our own witness" +1 on a kept squad) that names the dead\'s names; free (it does not use the action), copying the Khundryl Paint in a fight') : no('trick ' + JSON.stringify(t));
s5.key === 'share' && s5.shared === 1 && s5.rat === 0 && s5.brask === 1 && s5.haddat === 1 && s5.notNow && s5.backNot && s5.area === 'b9_c5_camp' && s5.ph === 3 && s5.arrive && s5.thallo && s5.other && s5.notYet && s5.dust && s5.scene === 'b9_dust' && s5.cap && s5.htmlEnd && s5.end && s5.end.view === 'end' && s5.end.ch === 'share' && s5.end.dust === 1 && s5.end.lvl >= 20 && s5.end.extras >= 6 && s5.end.journal >= 6 && s5.end.endText === 'Into the company\'s pot' && s5.end.leth
  ? ok(`key share: the company's pot (no ration move; Brask and Haddat +1; S.f.b9_c5_shared); Thallo's thanks; Harro's one line of the other squad; first light and the far dust (Not yet); level ${s5.end.lvl} (${s5.end.xp} xp), Rations ${s5.end.rat}; the Letherii's half untouched`) : no('share key ' + JSON.stringify(s5).slice(0, 1000));
kp.key === 'keep' && kp.shared && kp.rat === 2 && kp.once === 2 && kp.tegra === 1 && kp.haddat === -1 && kp.heavy && kp.arrive && kp.thallo && kp.lines === kp.here && kp.end1 && kp.end && kp.end.view === 'end' && kp.end.ch === 'keep' && kp.end.extras && kp.end.endText === 'What the squad kept'
  ? ok(`key keep, from the same moment: Rations +2 once; Tegra +1, Haddat −1; the heavy saw nothing; the end on keep, Rations ${kp.end.rat} (${kp.end.tier})`) : no('keep key ' + JSON.stringify(kp).slice(0, 1000));
y2.renderErr && !y2.renderErr.length && y2.reader === 'oldninth' && y2.rat === 4 && y2.lines === y2.here && y2.lines3 === y2.here && y2.doss && y2.wenna && y2.noMarrow && y2.c3 && y2.tegra && y2.tegra.flag === 2 && !y2.tegra.in && y2.tegra.wait && y2.tegra.npc && y2.tegra.text && y2.tegra.again && y2.digGuide && y2.other && !y2.audit.noNear.length && !y2.audit.noStay.length && y2.reload
  ? ok(`a --from=5 style transfer save (Marrow dead; Doss and Wenna walking; Ch 3's press with Tangle fevered): every node renders, the old marine reads, a line each at the fire both nights (${y2.lines}); six walk, so Tegra waits at the guides' fire and still leads the dig; Harro has the forage line; the save reloads with both halves`) : no('transfer ' + JSON.stringify(y2).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b9ch5: FAIL (${bad.length})` : 'b9ch5: all ok'); process.exit(bad.length ? 1 : 0);
