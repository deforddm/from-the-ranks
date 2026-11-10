// Book Ten, Chapter 4 (The Long Way Round, src/184_b10_ch4.js): the wear at the chapter's start (−1), the halts (dusk at the horse-lines,
// the road south by day or the night march on the glass, the key's night at the horse-lines), both keys from the same moment at Ennic's word,
// the reading at the first halt (the Tiles; B10READ[4] on a horse-blanket; the card node the visions pass hooks onto), the fire (Witness
// shown, a rest that clears the thirst, a line each at dusk and at night, the roster, the beat at the key's night, Not now), every fight's
// start and a forced win (both grounds of the foragers; the thieves in the dark on 'horses'; the dogs, optional), the trick behind its ✦ hard
// check (Tirren's hand, a group heal, a full turn, no ward), the items (each with art), the Witness moves (the lookout's "yes, but" −1;
// 'horses' +1 once when the horses are walked in; the beat ±1), the thirst on 'horses' (and waived by b10_c2_counted), the strangers at the
// rear (never met), "Not now" on every onward step and a "yes, but" on every check, both roads ('escort' and 'adjunct'), the Third's one
// line, from a --from=4 style start and from a transfer's squad (Perrit dead; Tirren waiting).
// Usage: node tools/b10ch4_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who, ok = true) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(tt).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:ok ? 'clean' : 'fail', ok, pass:ok, margin:ok ? 6 : -6, nat:ok ? 18 : 3}, c); const g = ok ? c.go : (c.fail || c.go); if (typeof g === 'string') talk(g); else g(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tcg'); b10Use('l'); startExplore(area); };
  const npc = (area, id) => AREAS[area].npcs.find(n => n.id === id);
  const thirsty = () => Object.entries(S.injury || {}).filter(([, v]) => v === 'b10thirst').map(([k]) => k);
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark;
    res.onT = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x]));
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2;
      res.onT2 = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b10_c4_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Ammanas|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Hedge|Cuttle|Bottle|Ruthan|Gudd|Quick Ben|Kalam|Deadsmell|Masan|Gilani|Keneb|Blistig|Tavore|Paran|Krughava|Tanakalian|Setoc|Syndecan|Stormy|Gesler|Kalyth|Bent\b|Abrastal|Felash|Spax|Brys|Beddict|Tehol|Aranict|Henar|Faint|Amby|Precious|Thimble|Trygalle|Errant|Errastas|Elder|Forkrul|Crippled God|Perish|Che'Malle|Nefarias|Bonehunters|\bweeks?\b|\bmonths?\b|\btenday\b|\bdays? (?:ago|later|back)\b|\b(?:two|three|four|five|six|seven|eight|nine|ten)\s+(?:nights|days)\b|\bmountains?\b|\bpass\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = tt(c); if (/undefined|NaN/.test(t) || never.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none); every onward step has a "Not now" or "Not yet" beside it;
     under every phase, key and road; exactly one "yes, but" costs Witness */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), wit = new Set(), witCost = new Set();
    const keep = JSON.stringify(S.f);
    const FL = ['b10_c4_orders', 'b10_c4_downSeen', 'b10_c4_forDone', 'b10_c4_strangers', 'b10_c4_lookDone', 'b10_c4_walked', 'b10_c4_kept', 'b10_c4_nightDone'];
    [1, 2, 3].forEach(ph => ['horses', 'pace', null].forEach(k => ['escort', 'adjunct'].forEach(rd => [...Array(1 << FL.length).keys()].forEach(fl => { S.f.b10_c4_ph = ph; S.f.b10_c4_key = k; S.f.b10_lRoad = rd;
      FL.forEach((f, i) => { S.f[f] = fl & (1 << i) ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (c.witness) wit.add(id); if (c.near && /b10Witness/.test(String(c.near.fx))) witCost.add(id); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); }))));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, wit:[...wit], witCost:[...witCost], noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  /* a --from=4 style start: Chapters One to Three's keys set, Pruss and Tirren walking, the Letherii at level 17 */
  const fromFour = (extra) => { setBook('tcg'); S = newStateTCG('Hask', 'Fresh'); S.chapters = {1:'names', 2:'watch', 3:'haul'}; S.f.b10_c1_key = 'names'; S.f.b10_c1_names = 1; S.f.b10_c2_key = 'watch'; S.f.b10_c2_watched = 1; S.f.b10_c3_key = 'haul'; S.f.b10_c3_hauled = 1;
    S.f.b10_prussDone = 1; if (!S.squad.includes('pruss')) S.squad.push('pruss'); S.loy.pruss = 0; S.gear.pruss ??= {}; S.picks.pruss ??= [];
    S.f.b10_tirrenDone = 1; const L = S.th.l; if (!L.squad.includes('tirren')) L.squad.push('tirren'); L.loy.tirren = 0; L.gear.tirren ??= {}; L.picks.tirren ??= []; L.lvl = 17; L.xp = LEVELS[16];
    S.f.b10_wear3 = 1; S.picksDue = []; L.picksDue = []; if (extra) extra(); save(); startChapter(4); clearModal(); };
  try {
  /* ================= a --from=4 style start ('escort') ================= */
  fromFour();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, wit0:b10Wit(), wear:S.f.b10_wear4, road:b10LRoad(), tirren:b10In('tirren'), renderErr:renderAll(), title:CHAPTERS[4].title, nodes:nodes.length, areas:CHAPTERS[4].areas.length, fights:Object.keys(CHAPTERS[4].battles).length,
    items:Object.keys(CHAPTERS[4].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[4].gear).length,
    bow:ITEMS.b10_c4_horsebow && ITEMS.b10_c4_horsebow.slot === 'weapon' && ITEMS.b10_c4_horsebow.role === 'ranged' && ITEMS.b10_c4_horsebow.dmg[1] === 8, rasp:ITEMS.b10_c4_rasp && ITEMS.b10_c4_rasp.slot === 'trinket', veil:ITEMS.b10_c4_veil && ITEMS.b10_c4_veil.slot === 'trinket',
    ownArt:['b10_c4_horsebow', 'b10_c4_rasp', 'b10_c4_veil'].every(k => /b104/.test(ART['item/' + k])), ground:typeof TILEX.b10_c4_ground === 'function' && /b104a/.test(String(TILEX.b10_c4_ground)),
    scenes:['b10_c4_dusk', 'b10_south_night'].every(k => typeof SCENEX[k] === 'function' && SCENES[k] && /b104/.test(String(SCENEX[k]))),
    introScene:CHAPTERS[4].intro.scene, fireRoster:(ROSTER_FIRES.tcg[4] || []).includes('b10_c4_fire'), thirst:thirsty().length, audit:audit(), god:PATRONS.sgt && PATRONS.sgt.god, quiet:!!(PATRONS.sgt && PATRONS.sgt.quiet)};
  /* the start: the horse-lines at dusk, the reading among the first halt's choices */
  talk('b10_c4_start'); out.f.ph = S.f.b10_c4_ph; out.f.tiles = has('b10_c4_start', /Sit with Perrit and the tiles/); out.f.down = /lain down/.test(DLG.b10_c4_start().txt) && DLG.b10_c4_start().scene === 'b10_c4_dusk';
  talk('b10_c4_read'); const rd = DLG.b10_c4_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b10_c4_drawn, reader:S.f.b10_c4_reader, inPool:B10POOL[4].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B10READ[4].back, cardNode:cardNodeName(), cardSp:DLG.b10_c4_card().sp, cardBack:DLG.b10_c4_card().ch[0].go,
    again:!has('b10_c4_fire', /Sit with/), blanket:/horse-blanket/.test(DLG.b10_c4_card().txt), cold:/cold/i.test(rd.txt)};
  /* the trick at the horse that has gone down */
  talk('b10_c4_down'); const dc = vis('b10_c4_down').find(c => c.trick);
  out.t = {dc:dc && dc.check[1], stat:dc && dc.check[0], noNear:dc && !dc.near, notNow:has('b10_c4_down', /Not now/), tirren:(edgesFor(dc, 'tirren').find(e => /farrier/.test(e[0])) || [])[1] || 0, ammet:(edgesFor(dc, 'ammet').find(e => /surgeon/.test(e[0])) || [])[1] || 0};
  made('b10_c4_down', /Learn it/, 'tirren');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b10_c4_farrier && S.tricks.b10_c4_farrier.who, ok:S.f.b10_c4_farrierOk, rasp:S.kit.includes('b10_c4_rasp'), notFree:!AB.t_b10_c4_farrier.free, words:!/one free trick/.test(TRICKS.b10_c4_farrier.fx) && /uses the action, and leaves no ward/.test(TRICKS.b10_c4_farrier.fx), again:!has('b10_c4_down', /Learn it/)});
  /* Ennic's word; the picket before it: shut */
  talk('b10_c4_picket'); out.p0 = !has('b10_c4_picket', /On the picket/);
  out.e = {notNow:has('b10_c4_ennic', /Not now/)}; talk('b10_c4_ennic'); out.e.orders = S.f.b10_c4_orders; take('b10_c4_ennic', /What else is the column saying/); out.e.ride = S.f.b10_c4_ride === 1 && /grey knights' commander rode off into the glass/.test(DLG.b10_c4_ennic_ride().txt);
  /* Yelt, Orla (the veil, once), Saffa (the Third's one line), the tile-woman */
  talk('b10_c4_yelt'); out.y = {water:/horses' water/.test(DLG.b10_c4_yelt().txt), counted:/Counted the night the army split/.test(DLG.b10_c4_yelt().txt)};
  talk('b10_c4_cart'); talk('b10_c4_cart'); out.veil = S.kit.filter(k => k === 'b10_c4_veil').length;
  talk('b10_c4_saffa'); out.rumour = /traces/.test(DLG.b10_c4_saffa().txt); S.f.b10_c3_key = 'cut'; out.rumourC = /cutting their wagons loose/.test(DLG.b10_c4_saffa().txt); S.f.b10_tRoad = 'south'; out.rumourS = /Twelfth/.test(DLG.b10_c4_saffa().txt); S.f.b10_c3_key = 'haul'; S.f.b10_tRoad = 'adjunct';
  talk('b10_c4_tile'); out.tw = has('b10_c4_tile', /Sit with Perrit/) === false && has('b10_c4_tile', /Back to/) && /Cold/.test(DLG.b10_c4_tile().txt);
  /* the fire at dusk before the foragers: no way on */
  talk('b10_c4_fire'); const f1 = DLG.b10_c4_fire(); out.fire1 = {html:/Witness/.test(f1.html || ''), talk:has('b10_c4_fire', /Talk with the squad/), rest:has('b10_c4_fire', /rest/), noOn:!vis('b10_c4_fire').some(c => c.onward), noBeat:!has('b10_c4_fire', /What did Lether/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1]))};
  out.fire1.lines = DLG.b10_c4_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length; out.fire1.tirren = /Tirren/.test(DLG.b10_c4_fire_talk().txt);
  /* the foragers at the picket's end (main; two grounds; a spear of the line) */
  talk('b10_c4_picket'); out.fo = {notNow:has('b10_c4_picket', /Not now/), straight:has('b10_c4_picket', /On the picket/), tirren:/Tirren/.test(DLG.b10_c4_picket().txt), hungry:/hungry country/.test(DLG.b10_c4_picket().txt)};
  { const sn = JSON.stringify(S); near('b10_c4_picket', /round the picket's end/, 'tobet'); out.fo.near = ((S.bruised || {}).tobet || 0) > 0; restore(sn, 'b10_c4_lines'); }
  { startBattle('b10_c4_foragers', {}); await wait(80); const u = B.units.find(x => x.id === 'tirren'); u.hp = 3; const h0 = u.hp; out.t.offered = trickOk(u, AB.t_b10_c4_farrier); AB.t_b10_c4_farrier.run(u); out.t.healed = u.hp > h0; out.t.noWard = !u.ward; B = null; view = 'scene'; S.scene = 'talk'; startExplore('b10_c4_lines'); }
  out.fo.fight = await force('b10_c4_foragers'); out.fo.done = S.f.b10_c4_forDone === 1; out.fo.bow = S.kit.includes('b10_c4_horsebow'); out.fo.lvl = S.lvl; out.fo.xp = S.xp;
  out.fo.kinds = BATTLES.b10_c4_foragers.foes.every(f => /lforager/.test(f[0])) && BATTLES.b10_c4_foragers.stage2.foes.some(f => /lforagerchief/.test(f[0])); out.fo.words = /does not get up/.test(DLG.b10_c4_foragers_after().txt);
  /* the fire, after: the way on (Not now beside it) */
  S.wounds = {tobet:4}; take('b10_c4_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b10_c4_rest1 === 1;
  talk('b10_c4_fire'); out.fire1.on = has('b10_c4_fire', /First light\. The road south/); take('b10_c4_fire', /First light\. The road south/); out.fire1.dawnNot = has('b10_c4_dawn', /Not now/);
  take('b10_c4_dawn', /First light\. South/); out.road = {area:S.area, ph:S.f.b10_c4_ph, arrive:S.node === 'b10_c4_road_arrive', scene:DLG.b10_c4_road_arrive().scene, noFire:!vis('b10_c4_fire').some(c => c.onward)};
  out.road.keyShut = !has('b10_c4_ennic', /We walk them/); out.road.ennicFresh0 = npc('b10_c4_road', 'ennic').fresh();
  /* the rear: the strangers, never met */
  out.road.three = /three figures/.test(DLG.b10_c4_rear().txt); talk('b10_c4_rear'); out.road.strangers = S.f.b10_c4_strangers === 1 && out.road.three;
  /* the dogs (optional) */
  talk('b10_c4_wash'); out.road.dogsNot = has('b10_c4_wash', /Not now/); out.road.dogs = await force('b10_c4_dogs'); out.road.dogsDone = S.f.b10_c4_dogsDone === 1;
  /* the lookout: the one Witness "yes, but" */
  talk('b10_c4_look'); out.road.lookNot = has('b10_c4_look', /Not now/); out.road.lookHtml = /Witness/.test(DLG.b10_c4_look().html || '');
  { const sn = JSON.stringify(S), w0 = b10Wit(); near('b10_c4_look', /Bolkando's tail/, 'tobet'); out.road.lookCost = b10Wit() - w0; restore(sn, 'b10_c4_road'); }
  made('b10_c4_look', /Bolkando's tail/, 'kaedra', false); out.road.look = S.f.b10_c4_lookDone;
  /* the key from Ennic */
  talk('b10_c4_ennic'); const kn = DLG.b10_c4_ennic();
  out.k = {horses:has('b10_c4_ennic', /We walk them/), pace:has('b10_c4_ennic', /We keep up/), notYet:has('b10_c4_ennic', /Not yet/), html:/Witness/.test(kn.html || ''), tirren:/Tirren/.test(kn.txt), thegg:/Thegg/.test(kn.txt), fresh:npc('b10_c4_road', 'ennic').fresh()};
  const snapK = JSON.stringify(S), witK = b10Wit(), loyK = {tirren:S.loy.tirren, thegg:S.loy.thegg};
  /* ================= key: horses ================= */
  take('b10_c4_ennic', /We walk them/); out.a = {key:S.f.b10_c4_key, horses:S.f.b10_c4_horses, pace:S.f.b10_c4_pace == null, ph:S.f.b10_c4_ph, tirren:S.loy.tirren - loyK.tirren, thegg:S.loy.thegg - loyK.thegg, wit0:b10Wit() - witK};
  take('b10_c4_key_horses', /At their pace/); out.a.area = S.area; out.a.arrive = S.node === 'b10_c4_night_arrive' && DLG.b10_c4_night_arrive().scene === 'b10_south_night';
  out.a.fireShut = !has('b10_c4_fire', /On south/); out.a.beatShut = !has('b10_c4_fire', /What did Lether/); out.a.thievesShut = !has('b10_c4_thieves', /Put them off/);
  talk('b10_c4_horselines'); const hc = vis('b10_c4_horselines').find(c => c.check); out.a.walk = {wit:!!(hc && hc.witness), notNow:has('b10_c4_horselines', /Not now/), html:/Witness/.test(DLG.b10_c4_horselines().html || ''), farrier:(edgesFor(hc, 'tirren').find(e => /farrier's hand/.test(e[0])) || [])[1] || 0};
  { const sn = JSON.stringify(S); near('b10_c4_horselines', /The horses first/, 'thegg'); out.a.walk.near = ((S.bruised || {}).thegg || 0) > 0; restore(sn, 'b10_c4_night'); }
  made('b10_c4_horselines', /The horses first/, 'tirren'); out.a.walked = S.f.b10_c4_walked; out.a.wit1 = b10Wit() - witK; out.a.thirst = thirsty(); out.a.thirstFlag = S.f.b10_c4_thirst;
  talk('b10_c4_horselines_ok'); out.a.once = b10Wit() - witK; out.a.thirstWords = /has the thirst/.test(DLG.b10_c4_horselines_ok().txt);
  talk('b10_c4_fire'); out.a.beatOffered = has('b10_c4_fire', /What did Lether/); out.a.onShut = !has('b10_c4_fire', /First light\. On south/); out.a.thirstFire = /has the thirst/.test(DLG.b10_c4_fire().txt);
  take('b10_c4_fire', /Let the squad rest/); out.a.rested = thirsty().length === 0;
  /* the thieves in the dark */
  talk('b10_c4_thieves'); out.a.th = {notNow:has('b10_c4_thieves', /Not now/)}; out.a.th.fight = await force('b10_c4_night'); out.a.th.done = S.f.b10_c4_nightDone === 1;
  /* the beat */
  talk('b10_c4_fire'); take('b10_c4_fire', /What did Lether/); out.a.beat = {notNow:has('b10_c4_beat', /Not now/), n:vis('b10_c4_beat').length, html:/Witness/.test(DLG.b10_c4_beat().html || '')};
  { const sn = JSON.stringify(S); take('b10_c4_beat', /Not now/); out.a.beat.nothing = !b10BeatOf(4); restore(sn, 'b10_c4_night'); }
  const wB = b10Wit(); take('b10_c4_beat', /Each other/); out.a.beat.rec = b10BeatOf(4); out.a.beat.wit = b10Wit() - wB; out.a.beat.gone = !has('b10_c4_fire', /What did Lether/);
  talk('b10_c4_yelt'); out.a.ledger = /shut the ledger/.test(DLG.b10_c4_yelt().txt);
  talk('b10_c4_fire'); out.a.on = has('b10_c4_fire', /First light\. On south/) && has('b10_c4_fire', /Not now/); out.a.lines3 = DLG.b10_c4_fire_talk().txt.split('\n\n').length;
  take('b10_c4_fire', /First light\. On south/); out.a.onroadNot = has('b10_c4_onroad', /Not now/); take('b10_c4_onroad', /First light\. On south/); out.a.notYet = has('b10_c4_onward', /Not yet/); out.a.endText = /Tirren/.test(DLG.b10_c4_onward().txt);
  const witA = b10Wit(); take('b10_c4_onward', /South, the long way round/); await wait(60);
  out.a.end = {view, ch:S.chapters[4], lvl:S.th && S.thread === 'l' ? S.lvl : S.th.l.lvl, wit:witA, extras:CHAPTERS[4].extras().length, journal:CHAPTERS[4].journal().length, endText:(CHEND[4] || {}).horses && CHEND[4].horses[0], scene:CHAPTERS[4].endScene};
  /* ================= key: pace, from the same moment ================= */
  restore(snapK, 'b10_c4_road'); S.chapter = 4;
  take('b10_c4_ennic', /We keep up/); out.q = {key:S.f.b10_c4_key, pace:S.f.b10_c4_pace, horses:S.f.b10_c4_horses == null, tirren:S.loy.tirren - loyK.tirren, thegg:S.loy.thegg - loyK.thegg, wit0:b10Wit() - witK};
  take('b10_c4_key_pace', /Keep up/); out.q.arrive = /Bolkando's camp/.test(DLG.b10_c4_night_arrive().txt);
  talk('b10_c4_horselines'); out.q.notNow = has('b10_c4_horselines', /Not now/); out.q.html = /Witness/.test(DLG.b10_c4_horselines().html || ''); out.q.noWit = !vis('b10_c4_horselines').some(c => c.witness);
  { const sn = JSON.stringify(S); near('b10_c4_horselines', /Go down the picket/, 'tobet'); out.q.near = !!(S.rattled || {}).tobet; restore(sn, 'b10_c4_night'); }
  made('b10_c4_horselines', /Go down the picket/, 'thegg'); out.q.kept = S.f.b10_c4_kept; out.q.wit = b10Wit() - witK; out.q.thirst = thirsty().length;
  out.q.thievesQuiet = !has('b10_c4_thieves', /Put them off/);
  talk('b10_c4_fire'); take('b10_c4_fire', /What did Lether/); take('b10_c4_beat', /Nothing anyone will remember/); out.q.beat = b10BeatOf(4); out.q.beatWit = b10Wit() - witK;
  talk('b10_c4_fire'); out.q.on = has('b10_c4_fire', /First light\. On south/); take('b10_c4_fire', /First light\. On south/); take('b10_c4_onroad', /First light\. On south/);
  const witQ = b10Wit(); take('b10_c4_onward', /South, the long way round/); await wait(60);
  out.q.end = {view, ch:S.chapters[4], wit:witQ, endText:CHEND[4].pace[0], extras:CHAPTERS[4].extras().some(x => /drove the horses/.test(x))};
  /* ================= the thirst waived by Chapter Two's count ================= */
  restore(snapK, 'b10_c4_road'); S.chapter = 4; S.f.b10_c2_counted = 1; S.f.b10_c2_key = 'count';
  take('b10_c4_ennic', /We walk them/); take('b10_c4_key_horses', /At their pace/); made('b10_c4_horselines', /The horses first/, 'tirren', false);
  out.w = {walked:S.f.b10_c4_walked, thirst:thirsty().length, flag:S.f.b10_c4_thirst, wit:b10Wit() - witK, words:/kept a little back/.test(DLG.b10_c4_horselines_no().txt)};
  /* ================= the 'adjunct' road (the middle of the crossing) ================= */
  fromFour(() => { S.th.l.f = S.th.l.f; S.f.b10_lRoad = 'adjunct'; });
  out.u = {renderErr:renderAll(), intro:/crossing goes on/.test(CHAPTERS[4].intro.paras[0]()), noYelt:!npc('b10_c4_lines', 'saffa').show() && !npc('b10_c4_lines', 'tilewoman').show()};
  talk('b10_c4_start'); talk('b10_c4_cart'); out.u.veil = S.kit.includes('b10_c4_veil'); out.u.rumour = /heavies/.test(DLG.b10_c4_cart().txt);
  talk('b10_c4_ennic'); talk('b10_c4_picket'); out.u.pick = has('b10_c4_picket', /On the picket/);
  out.u.fight = await force('b10_c4_foragers'); out.u.strag = BATTLES.b10_c4_foragers.foes.every(f => /lstraggler/.test(f[0])) && BATTLES.b10_c4_foragers.stage2.foes.some(f => /lringleader/.test(f[0]));
  out.u.words = /stays down/.test(DLG.b10_c4_foragers_after().txt) && /back to his company/.test(DLG.b10_c4_foragers_after().txt);
  talk('b10_c4_fire'); out.u.circle = DLG.b10_c4_fire().sp === 'The Sixth\'s circle'; take('b10_c4_fire', /Full dark\. The march/); take('b10_c4_dawn', /East, behind the column/);
  out.u.march = {area:S.area, dark:!!AREAS[S.area].dark, scene:DLG.b10_c4_march_arrive().scene, keyReady:false};
  talk('b10_c4_look'); made('b10_c4_look', /Keep the column in sight/, 'ruuk'); out.u.march.keyReady = b104KeyReady();
  out.u.glassTile = (() => { try { const cv = document.createElement('canvas'); cv.width = cv.height = 32; ['.', 'h', 'k', 'W', 'T', 'F', '#', '>'].forEach(c => TILEX.b10_c4_ground(cv.getContext('2d'), c, 1, 1, 32, true)); return true; } catch (e) { return e.message; } })();
  talk('b10_c4_ennic'); out.u.keyTxt = /last of Lether's horses/.test(DLG.b10_c4_ennic().txt); take('b10_c4_ennic', /We walk them/); take('b10_c4_key_horses', /At their pace/);
  out.u.night = {area:S.area, scene:DLG.b10_c4_night_arrive().scene, glass:/glass/.test(DLG.b10_c4_night_arrive().txt)};
  made('b10_c4_horselines', /The horses first/, 'tirren'); talk('b10_c4_thieves'); out.u.th = await force('b10_c4_night'); out.u.thWords = /stays down/.test(DLG.b10_c4_thieves_after().txt);
  talk('b10_c4_fire'); take('b10_c4_fire', /What did Lether/); take('b10_c4_beat', /The Commander/); out.u.beat = b10BeatOf(4);
  talk('b10_c4_fire'); out.u.on = has('b10_c4_fire', /On\. The column is getting up/); take('b10_c4_fire', /On\. The column/); take('b10_c4_onroad', /On, east/);
  out.u.onward = DLG.b10_c4_onward().scene === 'b10_glass_night' && has('b10_c4_onward', /Not yet/); out.u.renderErr2 = renderAll();
  take('b10_c4_onward', /East, through the glass/); await wait(60); out.u.end = {view, ch:S.chapters[4], scene:CHAPTERS[4].endScene, text:/behind the column's tail/.test(CHEND[4].horses[1])};
  /* ================= a transfer's Letherii (Perrit dead; Ilsa, Sorvan walking; Tirren waiting at the horse-lines) ================= */
  setBook('tcg'); S = newStateTCG('Hask', 'Syn'); b10Use('l'); S.squad = ['sgt', 'tobet', 'ilsa', 'sorvan', 'thegg', 'ammet']; S.camp = ['tirren', 'brennet', 'kaedra']; S.dead = {perrit:{ch:6, where:'the line', from:'dod'}}; S.f.b10_tirrenDone = 2; S.lvl = 17; S.xp = LEVELS[16];
  [...S.squad, ...S.camp].forEach(k => { if (k === 'sgt') return; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; b10Use('t'); S.picksDue = []; save(); startChapter(4); clearModal();
  out.x = {renderErr:renderAll(), reader:b10Rd().id, lines:DLG.b10_c4_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ilsa:/Ilsa/.test(DLG.b10_c4_fire_talk().txt), noTirren:!/Tirren/.test(DLG.b10_c4_fire_talk().txt),
    old:/old farrier/.test(DLG.b10_c4_start().txt), noPerrit:!/Perrit/.test(DLG.b10_c4_fire_talk().txt), audit:audit()};
  S.f.b10_c4_ph = 3; S.f.b10_c4_key = 'horses'; out.x.lines3 = DLG.b10_c4_fire_talk().txt.split('\n\n').length;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, t = r.t || {}, e = r.e || {}, y = r.y || {}, f1 = r.fire1 || {}, fo = r.fo || {}, rq = r.road || {}, k = r.k || {}, a = r.a || {}, q = r.q || {}, w = r.w || {}, u = r.u || {}, x = r.x || {};
if (f.area) {
  f.area === 'b10_c4_lines' && f.ch === 4 && f.thread === 'l' && f.lvl0 === 17 && f.wit0 === 4 && f.wear === 1 && f.road === 'escort' && f.tirren && !f.renderErr.length && f.title === 'The Long Way Round' && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 3 && f.bow && f.rasp && f.veil && f.ownArt && f.ground && f.scenes && f.introScene === 'b10_c4_dusk' && f.fireRoster && f.thirst === 0 && f.quiet
    ? ok(`a --from=4 start opens Chapter Four at the horse-lines: the Letherii at level 17, the wear (Witness 5 → 4), on 'escort', Tirren walking; every b10_c4 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art and roles; the ground and two backdrops of its own; Lether's luck is quiet`) : no('fresh ' + JSON.stringify(f).slice(0, 1600));
  const au = f.audit || {}; au.checks >= 6 && au.tricks === 1 && au.wit.length === 1 && au.wit[0] === 'b10_c4_horselines' && au.witCost.length === 1 && au.witCost[0] === 'b10_c4_look' && !au.noNear.length && au.onwards >= 4 && !au.noStay.length
    ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none; one Witness check, the horses' water; one "yes, but" that costs Witness, the lookout); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes), on both roads`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.tiles && f.down ? ok('the first halt: a horse lain down at the horse-lines, the reading offered') : no('start ' + JSON.stringify({ph:f.ph, tiles:f.tiles, down:f.down}));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.back === 'b10_c4_fire' && rd.cardNode === 'b10_c4_card' && rd.cardSp === 'The Tiles of the Holds' && rd.cardBack === 'b10_c4_fire' && rd.again && rd.blanket && rd.cold ? ok('the reading: Perrit lays the tiles from B10POOL[4] on a horse-blanket (the tiles cold); the card node is the visions pass\'s hook; back to b10_c4_fire; offered once') : no('reading ' + JSON.stringify(rd));
t.dc === 20 && t.stat === 'wits' && t.noNear && t.notNow && t.tirren === 2 && t.ammet === 2 && t.who === 'tirren' && t.ok === 1 && t.rasp && t.notFree && t.words && t.again && t.offered && t.healed && t.noWard
  ? ok('the trick: The Farrier\'s Hand, a ✦ wits 20 check (Tirren\'s and Ammet\'s hands +2); a group heal that uses the action and leaves no ward; the rasp') : no('trick ' + JSON.stringify(t));
r.p0 && e.orders === 1 && e.notNow && e.ride ? ok('Ennic: the column\'s word; the rumour (the grey knights\' commander rode off into the glass); the picket shut until then') : no('ennic ' + JSON.stringify({p0:r.p0, e}));
y.water && !y.counted && r.veil === 1 && r.rumour && r.rumourC && r.rumourS && r.tw ? ok('Yelt and the horses\' water; Orla\'s veil once; Saffa\'s one line of the Third (haul, cut, or its \'south\' road); the tile-woman, the tiles cold') : no('train ' + JSON.stringify({y, veil:r.veil, rumour:r.rumour, rumourC:r.rumourC, rumourS:r.rumourS, tw:r.tw}));
f1.html && f1.talk && f1.rest && f1.noOn && f1.noBeat && f1.notNow && f1.lines === f1.here && f1.tirren && f1.rested && f1.on && f1.dawnNot ? ok(`the fire at dusk: Witness shown, a rest, the talk (a line each, ${f1.lines}, Tirren's among them), no beat; the way on only after the foragers, Not now beside it`) : no('fire1 ' + JSON.stringify(f1));
fo.notNow && fo.straight && fo.tirren && fo.hungry && fo.near && fo.fight && fo.fight.started && fo.fight.stage2 && fo.fight.inStage2 && fo.fight.allies === 1 && !fo.fight.onT && !fo.fight.onT2 && fo.fight.after === 'b10_c4_foragers_after' && fo.done && fo.bow && fo.kinds && fo.words && fo.lvl >= 18
  ? ok(`the foragers at the picket's end: a hungry country, not soldiers (${fo.fight.foes} foes, a spear of the line, no foe on cover); the headman in the scrub; a "yes, but" in the thorn; the horse-bow; level ${fo.lvl} (${fo.xp} xp)`) : no('foragers ' + JSON.stringify(fo));
rq.area === 'b10_c4_road' && rq.ph === 2 && rq.arrive && rq.scene === 'b10_south' && rq.keyShut && !rq.ennicFresh0 && rq.strangers && rq.dogsNot && rq.dogs && rq.dogs.started && rq.dogsDone && rq.lookNot && rq.lookHtml && rq.lookCost === -1 && rq.look === 'lost'
  ? ok('the road south by day: the strangers at the rear, seen far off and taken in by somebody else; the dogs in the wash (optional); the lookout (missed, found; its "yes, but" Witness −1); no key until then') : no('road ' + JSON.stringify(rq));
k.horses && k.pace && k.notYet && k.html && k.tirren && k.thegg && k.fresh ? ok('the key from Ennic: walk them or keep up, Not yet; Witness shown; Tirren and Thegg have their say') : no('key ' + JSON.stringify(k));
a.key === 'horses' && a.horses === 1 && a.pace && a.ph === 3 && a.tirren === 1 && a.thegg === 0 && a.wit0 === 0 && a.area === 'b10_c4_night' && a.arrive && a.fireShut && a.beatShut && a.thievesShut && a.walk && a.walk.wit && a.walk.notNow && a.walk.html && a.walk.farrier === 2 && a.walk.near && a.walked === 'all' && a.wit1 === 1 && a.once === 1 && a.thirst.length === 1 && a.thirstFlag === a.thirst[0] && a.thirstWords && a.beatOffered && a.onShut && a.thirstFire && a.rested
  ? ok('key horses: Tirren +1, S.f.b10_c4_horses; the night at the tail; the horses\' water (a Witness check; the farrier\'s hand +2; its "yes, but" a hoof on the foot); the horses lived, Witness +1 once; the thirst once, and a rest clears it') : no('horses ' + JSON.stringify(a).slice(0, 1400));
a.th && a.th.notNow && a.th.fight && a.th.fight.started && a.th.fight.dark && !a.th.fight.onT && a.th.done && a.beat && a.beat.notNow && a.beat.nothing && a.beat.n === 4 && a.beat.html && a.beat.rec === 'kept' && a.beat.wit === 1 && a.beat.gone && a.ledger && a.on && a.lines3 === f1.here && a.onroadNot && a.notYet && a.endText && a.end && a.end.view === 'end' && a.end.ch === 'horses' && a.end.wit === 6 && a.end.extras >= 5 && a.end.journal >= 6 && a.end.endText === 'The horses lived' && a.end.scene === 'b10_south'
  ? ok(`the thieves at the picket in the dark; the beat at the fire, Yelt's ledger shut ("What did Lether send us out here for?": three answers and Not now, which records nothing); kept +1; the end on horses, Witness ${a.end.wit}`) : no('horses end ' + JSON.stringify({th:a.th, beat:a.beat, ledger:a.ledger, on:a.on, lines3:a.lines3, onroadNot:a.onroadNot, notYet:a.notYet, endText:a.endText, end:a.end}));
q.key === 'pace' && q.pace === 1 && q.horses && q.tirren === -1 && q.thegg === 1 && q.wit0 === 0 && q.arrive && q.notNow && q.html && q.noWit && q.near && q.kept === 'kept' && q.wit === 0 && q.thirst === 0 && q.thievesQuiet && q.beat === 'doubt' && q.beatWit === -1 && q.on && q.end && q.end.view === 'end' && q.end.ch === 'pace' && q.end.wit === 3 && q.end.endText === 'Kept up' && q.end.extras
  ? ok(`key pace, from the same moment: Thegg +1, Tirren −1, S.f.b10_c4_pace; the Bolkando's camp; the horses that are left got up (a "yes, but": rattled); no thirst, no thieves; the beat doubted −1; the end on pace, Witness ${q.end.wit}`) : no('pace ' + JSON.stringify(q).slice(0, 1200));
w.walked === 'most' && w.thirst === 0 && w.flag === 'waived' && w.wit === 1 && w.words ? ok('the thirst waived by Chapter Two\'s count (b10_c2_counted): the horses\' water was in Yelt\'s book; the horses still lived (missed, +1)') : no('waived ' + JSON.stringify(w));
u.renderErr && !u.renderErr.length && u.intro && u.noYelt && u.veil && u.rumour && u.pick && u.fight && u.fight.started && u.fight.stage2 && !u.fight.onT && u.strag && u.words && u.circle && u.march && u.march.area === 'b10_c4_march' && u.march.dark && u.march.scene === 'b10_glass_night' && u.march.keyReady && u.glassTile === true && u.keyTxt && u.night && u.night.area === 'b10_c4_night' && u.night.scene === 'b10_glass_night' && u.night.glass && u.th && u.th.started && u.thWords && u.beat === 'kept' && u.on && u.onward && u.renderErr2 && !u.renderErr2.length && u.end && u.end.view === 'end' && u.end.ch === 'horses' && u.end.scene === 'b10_glass_night' && u.end.text
  ? ok('the \'adjunct\' road: the middle of the crossing; the foreigners\' water-sergeant (the veil, the Third\'s line); stragglers for the horses\' water (two grounds, fought down, never killed in words); the night march (no strangers, no dogs); the last of Lether\'s horses walked in; stragglers at the picket; the end on the glass') : no('adjunct ' + JSON.stringify(u).slice(0, 1400));
x.renderErr && !x.renderErr.length && x.reader === 'tilewoman' && x.lines === x.here && x.lines3 === x.here && x.ilsa && x.noTirren && x.old && x.noPerrit && x.audit && !x.audit.noNear.length && !x.audit.noStay.length
  ? ok(`a transfer's Letherii (Perrit dead; Tirren waiting at the horse-lines): every node renders, the tile-woman reads, the train's old farrier at the horse that has gone down, a line each at the fire (${x.lines})`) : no('transfer ' + JSON.stringify(x).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b10ch4: FAIL (${bad.length})` : 'b10ch4: all ok'); process.exit(bad.length ? 1 : 0);
