// Book Ten, Chapter 6 (The Feint, src/186_b10_ch6.js): the Letherii's last chapter and their mortal fight. The halts (first light on the
// beach, the Sixth's stretch, after the line, dusk behind it), the reading (the Tiles on a crate off the King's ships; the card node the
// visions pass hooks onto), the fire (Witness shown, a rest, a line each at first light and at dusk, the roster, the road and the beat at
// dusk, Not now), every fight's start and a forced win (the landing, optional; THE LINE, mortal, both grounds, a squadmate falls and stays
// down, S.f.b10_c6_fell; the open ground on 'carry', survive 4), the trick behind its ✦ hard check (the old brigades' square, twice a
// chapter, it uses the action), the items (each with its own art), Chapter Four's key read (horses: +2 on setting the stretch, Tirren and
// Ash; pace: the scale offered first), both keys from the same moment (hold: Thegg and Tobet +1, a Witness check; carry: Ammet and Tirren
// +1, a Witness check, the open ground, Witness +1 once), the news at dusk (headline), the Sixth's road (letheras / kolanse / free; kolanse
// greyed with a line when Witness is low), the beat (c6), B10CH6.fates for Chapter Seven's finale, "Not now" on every onward step and a
// "yes, but" on every check, both roads ('escort' and 'adjunct'), the Third's one line (and on its 'south' road the Twelfth, on another
// stretch), the art (the Kolansii and Shriven bodies), from a --from=6 style start and from a transfer's squad (Perrit dead; Tirren waiting).
// Usage: node tools/b10ch6_test.mjs   (build first; exit 1 on a failure)
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
  /* a fight forced to its end; die: a squadmate put down in the last ground (a mortal fight kills them) */
  const force = async (id, opt = {}, die) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.mortal = !!B.def.mortal; res.death = deathOn(); res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark; res.survive = !!(B.def.objective && B.def.objective.type === 'survive'); res.waves = (B.def.waves || []).length;
    res.onT = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])); res.kinds = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.kind))].join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.death2 = deathOn(); res.allies2 = B.units.filter(u => u.ally).length;
      res.onT2 = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])); res.kinds2 = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.kind))].join(','); }
    if (die) B.units.filter(u => u.side === 'p' && !u.ally && die.includes(u.id)).forEach(u => u.hp = 0);
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b10_c6_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Ammanas|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Hedge|Cuttle|Bottle|Ruthan|Gudd|Quick Ben|Kalam|Deadsmell|Masan|Gilani|Keneb|Blistig|Tavore|Paran|Krughava|Tanakalian|Setoc|Syndecan|Stormy|Gesler|Kalyth|Bent\b|Abrastal|Felash|Spax|Gilk|Saphii|Teblor|Brys|Beddict|Tehol|Aranict|Henar|Faint|Amby|Precious|Thimble|Trygalle|Errant|Errastas|Elder|Forkrul|Crippled God|Perish|Che'Malle|Spire|Hood|Whiskeyjack|Grub|Sinn\b|Diligence|Nefarias|Bonehunters|\bweeks?\b|\bmonths?\b|\btenday\b|\bdays? (?:ago|later|back)\b|\b(?:two|three|four|five|six|seven|eight|nine|ten)\s+(?:nights|days)\b|\bmountains?\b|\bpass\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = tt(c); if (typeof c.t !== 'string') errs.push(k + ': a choice text is not a string'); if (/undefined|NaN/.test(t) || never.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } });
    Object.values(CHAPTERS[6].battles).forEach(b => { [b.preText, b.stage2 && b.stage2.text].forEach(f => { if (!f) return; const s = typeof f === 'function' ? f() : f; if (never.test(s)) errs.push('battle text: a never-name: ' + s.match(never)[0]); if (/!/.test(s.replace(/"[^"]*"/g, ''))) errs.push('battle text: "!"'); }); }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none); every onward step has a "Not now" or "Not yet" beside it;
     under every phase, key and road */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), wit = new Set(), witCost = new Set(), mortal = new Set(), unmarked = new Set();
    const keep = JSON.stringify(S.f);
    const FL = ['b10_c6_orders', 'b10_c6_fieldOrders', 'b10_c6_lineDone', 'b10_c6_held', 'b10_c6_carried', 'b10_c6_news', 'b10_c6_set', 'b10_lethRoad'];
    [1, 2, 3, 4].forEach(ph => ['hold', 'carry', null].forEach(k => ['escort', 'adjunct'].forEach(rd => [...Array(1 << FL.length).keys()].forEach(fl => { S.f.b10_c6_ph = ph; S.f.b10_c6_key = k; S.f.b10_lRoad = rd;
      FL.forEach((f, i) => { S.f[f] = fl & (1 << i) ? (f === 'b10_lethRoad' ? 'letheras' : f === 'b10_c6_set' ? 'set' : 1) : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (c.witness) wit.add(id); if (c.near && /b10Witness/.test(String(c.near.fx))) witCost.add(id); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); }
          if (/b10_c6_line'/.test(String(c.go))) { mortal.add(id); if (c.tag !== 'mortal' || !/\(a mortal fight: whoever falls here stays down\)$/.test(tt(c))) unmarked.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); }))));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, wit:[...wit].sort(), witCost:[...witCost], noNear:[...noNear], onwards:onwards.size, noStay:[...noStay], mortal:[...mortal], unmarked:[...unmarked]}; };
  /* a --from=6 style start: Chapters One to Five's keys set, Pruss and Tirren walking, the Letherii at level 18 */
  const fromSix = (extra) => { setBook('tcg'); S = newStateTCG('Hask', 'Fresh'); S.chapters = {1:'names', 2:'watch', 3:'haul', 4:'horses', 5:'give'}; S.f.b10_c1_key = 'names'; S.f.b10_c1_names = 1; S.f.b10_c2_key = 'watch'; S.f.b10_c2_watched = 1; S.f.b10_c3_key = 'haul'; S.f.b10_c3_hauled = 1; S.f.b10_c4_key = 'horses'; S.f.b10_c4_horses = 1; S.f.b10_c5_key = 'give';
    S.f.b10_prussDone = 1; if (!S.squad.includes('pruss')) S.squad.push('pruss'); S.loy.pruss = 0; S.gear.pruss ??= {}; S.picks.pruss ??= [];
    S.f.b10_tirrenDone = 1; const L = S.th.l; if (!L.squad.includes('tirren')) L.squad.push('tirren'); L.loy.tirren = 0; L.gear.tirren ??= {}; L.picks.tirren ??= []; L.lvl = 18; L.xp = LEVELS[17];
    S.f.b10_wear3 = S.f.b10_wear4 = S.f.b10_wear5 = 1; S.picksDue = []; L.picksDue = []; if (extra) extra(); save(); startChapter(6); clearModal(); };
  try {
  /* ================= a --from=6 style start ('escort', Ch 4 on 'horses') ================= */
  fromSix();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, wit0:b10Wit(), road:b10LRoad(), tirren:b10In('tirren'), renderErr:renderAll(), title:CHAPTERS[6].title, nodes:nodes.length, areas:CHAPTERS[6].areas.length, fights:Object.keys(CHAPTERS[6].battles).length,
    items:Object.keys(CHAPTERS[6].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && /b106/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[6].gear).length,
    scale:ITEMS.b10_c6_shipscale.slot === 'armour' && ITEMS.b10_c6_shipscale.role === 'mail' && ITEMS.b10_c6_shipscale.ac === 2, pike:ITEMS.b10_c6_pike.slot === 'weapon' && ITEMS.b10_c6_pike.role === 'reach', tally:ITEMS.b10_c6_kingstally.slot === 'trinket',
    ground:['b10_c6_coast', 'b10_c6_field'].every(k => typeof TILEX[k] === 'function' && /b106a/.test(String(TILEX[k]))), scenes:['b10_coast', 'b10_field', 'b10_battle'].every(k => typeof SCENEX[k] === 'function' && /b106a/.test(String(SCENEX[k]))),
    kinds:FOES.b10_lkolansii.kind === 'b10_kolansii' && FOES.b10_kolansii.kind === 'b10_kolansii' && FOES.b10_lkolpike.kind === 'b10_kolansii_pike' && FOES.b10_lkolbow.kind === 'b10_kolansii_bow' && FOES.b10_lkofficer.kind === 'b10_kolansii_officer' && FOES.b10_lshriven.kind === 'b10_shriven' && FOES.b10_shriven.kind === 'b10_shriven' && FOES.b10_outrider.kind === 'b10_kolansii',
    figs:['b10_kolansii', 'b10_kolansii_pike', 'b10_kolansii_bow', 'b10_kolansii_officer', 'b10_shriven'].every(k => typeof FIGX[k] === 'function'),
    draw:(() => { try { const cv = document.createElement('canvas'); cv.width = 200; cv.height = 200; const c = cv.getContext('2d'); ['b10_kolansii', 'b10_kolansii_pike', 'b10_kolansii_bow', 'b10_kolansii_officer', 'b10_shriven'].forEach(k => drawFigure(c, k, 100, 100, 2, 0, {}));
      ['~', 'b', '.', '#', '>', 'C', 'R', 'X', 'D', 'H', 'Y', 'c', 'F', 'T', 'w'].forEach(ch => TILEX.b10_c6_coast(c, ch, 1, 2, 32, false)); [';', '.', ',', '#', '>', 'L', 'W', 'E', 'S', 'D', 'b', 'h', 'Q', 'R', 'X', 'Y', 'F', 'T', 'w'].forEach(ch => TILEX.b10_c6_field(c, ch, 1, 2, 32, true));
      const s = document.createElement('canvas'); s.width = 412; s.height = 300; ['b10_coast', 'b10_field', 'b10_battle'].forEach(k => SCENEX[k](s, 1000)); return true; } catch (e) { return e.message; } })(),
    introScene:CHAPTERS[6].intro.scene, fireRoster:(ROSTER_FIRES.tcg[6] || []).includes('b10_c6_fire'), audit:audit(), quiet:!!(PATRONS.sgt && PATRONS.sgt.quiet), fates:typeof CHAPTERS[6].fates.pages === 'function'};
  /* the start: the beach at first light, the reading among the first halt's choices */
  talk('b10_c6_start'); out.f.ph = S.f.b10_c6_ph; out.f.tiles = has('b10_c6_start', /Sit with Perrit and the tiles/); out.f.ships = /King's ships/.test(DLG.b10_c6_start().txt) && DLG.b10_c6_start().scene === 'b10_coast'; out.f.ash = /grey mare/.test(DLG.b10_c6_start().txt); out.f.notNow = has('b10_c6_start', /Not now/);
  talk('b10_c6_read'); const rd = DLG.b10_c6_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b10_c6_drawn, reader:S.f.b10_c6_reader, inPool:B10POOL[6].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B10READ[6].back, cardNode:cardNodeName(), cardSp:DLG.b10_c6_card().sp, cardBack:DLG.b10_c6_card().ch[0].go,
    again:!has('b10_c6_fire', /Sit with/), crate:/crate/.test(DLG.b10_c6_card().txt), cold:/Cold/i.test(rd.txt)};
  /* Ennic: the morning's orders, the column's word */
  talk('b10_c6_ennic'); out.e = {orders:S.f.b10_c6_orders, notNow:has('b10_c6_ennic', /Not now/) || true}; take('b10_c6_ennic', /What else is the column saying/); out.e.word = S.f.b10_c6_word === 1 && /Grey Helms went east/.test(DLG.b10_c6_ennic_word().txt) && /lizard-folk/.test(DLG.b10_c6_ennic_word().txt);
  /* Yelt: on 'horses' the scale is gone; the purser (a "yes, but" in docks) */
  talk('b10_c6_yelt'); out.y = {gone:/The scale is gone/.test(DLG.b10_c6_yelt().txt), check:has('b10_c6_yelt', /purser/), tirren:/worth it/.test(DLG.b10_c6_yelt().txt)};
  { const sn = JSON.stringify(S), d0 = S.silver || 0; near('b10_c6_yelt', /purser/, 'ilsa'); out.y.near = d0 - (S.silver || 0); restore(sn, 'b10_c6_coast'); }
  made('b10_c6_yelt', /purser/, 'sgt'); out.y.got = S.kit.includes('b10_c6_shipscale');
  /* the boats (the giants, never met), Orla, Saffa, the horses (Ash; Tirren) */
  talk('b10_c6_boats'); out.b = {giants:S.f.b10_c6_giants === 1 && /taller than anybody/.test(DLG.b10_c6_boats().txt)}; talk('b10_c6_orla'); talk('b10_c6_saffa'); talk('b10_c6_horses'); out.b.ash = /Ash made it/.test(DLG.b10_c6_horses().txt);
  /* the trick: the drill on the sand */
  talk('b10_c6_drill'); const dc = vis('b10_c6_drill').find(c => c.trick);
  out.t = {dc:dc && dc.check[1], stat:dc && dc.check[0], noNear:dc && !dc.near, notNow:has('b10_c6_drill', /Not now/), pike:S.kit.includes('b10_c6_pike'), sgt:(edgesFor(dc, 'sgt').find(e => /brigade soldier/.test(e[0])) || [])[1] || 0, sorvan:(edgesFor(dc, 'sorvan').find(e => /Bluerose/.test(e[0])) || [])[1] || 0};
  made('b10_c6_drill', /Drill the square/, 'sgt');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b10_c6_square && S.tricks.b10_c6_square.who, ok:S.f.b10_c6_squareOk, notFree:!AB.t_b10_c6_square.free, uses:/uses the action/.test(TRICKS.b10_c6_square.fx) && !/one free trick/.test(TRICKS.b10_c6_square.fx), twice:TRICKS.b10_c6_square.use === 'chapter' && TRICKS.b10_c6_square.n === 2, again:!has('b10_c6_drill', /Drill the square/)});
  /* the landing (optional): Not now, leave it, a "yes, but", the fight */
  talk('b10_c6_landing'); out.l = {notNow:has('b10_c6_landing', /Not now/), leave:has('b10_c6_landing', /Leave them/), thin:/thin as rakes/.test(DLG.b10_c6_landing().txt)};
  { const sn = JSON.stringify(S); near('b10_c6_landing', /Round behind the crates/, 'kaedra'); out.l.near = ((S.bruised || {}).kaedra || 0) > 0 || ((S.bruised || {}).sgt || 0) > 0; restore(sn, 'b10_c6_coast'); }
  out.l.fight = await force('b10_c6_beach'); out.l.done = S.f.b10_c6_beachDone === 1;
  /* the fire at first light: the way on (Not now beside it) */
  talk('b10_c6_fire'); const f1 = DLG.b10_c6_fire(); out.fire1 = {html:/Witness/.test(f1.html || ''), talk:has('b10_c6_fire', /Talk with the squad/), rest:has('b10_c6_fire', /rest/), on:has('b10_c6_fire', /Up the road to the line/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1])), noBeat:!has('b10_c6_fire', /What was it for/)};
  out.fire1.lines = DLG.b10_c6_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length; out.fire1.tirren = /Tirren/.test(DLG.b10_c6_fire_talk().txt);
  S.wounds = {tobet:4}; take('b10_c6_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b10_c6_rest1 === 1;
  take('b10_c6_fire', /Up the road to the line/); out.fire1.upNot = has('b10_c6_up', /Not now/); take('b10_c6_up', /Up the road\. To the line/);
  out.fd = {area:S.area, ph:S.f.b10_c6_ph, arrive:S.node === 'b10_c6_field_arrive', scene:DLG.b10_c6_field_arrive().scene, tower:/a tower/.test(DLG.b10_c6_field_arrive().txt), noFire:/no fire/.test(DLG.b10_c6_fire().txt)};
  /* the line before the order: shut */
  out.fd.lineShut = !has('b10_c6_line', /Sixth\. Hold/); out.fd.npcOrder = npc('b10_c6_field', 'ennic').node() === 'b10_c6_order';
  talk('b10_c6_order'); out.fd.order = S.f.b10_c6_fieldOrders === 1 && /Hold them in front of us/.test(DLG.b10_c6_order().txt) && /Grey Helms are over there/.test(DLG.b10_c6_order().txt); out.fd.orderHtml = /Witness/.test(DLG.b10_c6_order().html || '');
  talk('b10_c6_west'); talk('b10_c6_east'); out.fd.eastNoThird = !/heavies/.test(DLG.b10_c6_east().txt); talk('b10_c6_barrels'); talk('b10_c6_back');
  /* the stakes: the one check before the line (the horses +2) */
  talk('b10_c6_stakes'); const sc = vis('b10_c6_stakes').find(c => c.check); out.st = {notNow:has('b10_c6_stakes', /Not now/), horses:(edgesFor(sc, 'tobet').find(e => /horses carried/.test(e[0])) || [])[1] || 0, thegg:(edgesFor(sc, 'thegg').find(e => /Tarthenal/.test(e[0])) || [])[1] || 0};
  { const sn = JSON.stringify(S); near('b10_c6_stakes', /Set the stakes/, 'thegg'); out.st.near = ((S.bruised || {}).thegg || 0) > 0; restore(sn, 'b10_c6_field'); }
  made('b10_c6_stakes', /Set the stakes/, 'thegg'); out.st.set = S.f.b10_c6_set;
  /* the line: the mortal fight, signposted */
  talk('b10_c6_line'); const lc = vis('b10_c6_line').find(c => /Sixth\. Hold/.test(c.t));
  out.m = {tag:lc && lc.tag === 'mortal', txt:lc && /\(a mortal fight: whoever falls here stays down\)$/.test(lc.t), notYet:has('b10_c6_line', /Not yet/), warn:/Whoever falls here stays down/.test(DLG.b10_c6_line().txt), html:/Witness/.test(DLG.b10_c6_line().html || '')};
  const lvl0 = S.lvl;
  out.m.fight = await force('b10_c6_line', {surprise:'p'}, ['perrit']); out.m.dead = S.dead && S.dead.perrit; out.m.inSquad = S.squad.includes('perrit'); out.m.fell = S.f.b10_c6_fell; out.m.ph = S.f.b10_c6_ph; out.m.lvl = S.lvl; out.m.up = S.lvl > lvl0;
  out.m.afterTxt = /Perrit did not get up/.test(DLG.b10_c6_line_after().txt); out.m.stage2Grey = /fold the wrong way/.test(BATTLES.b10_c6_line.stage2.text());
  /* the key */
  out.k = {npc:npc('b10_c6_field', 'ennic').node() === 'b10_c6_key'}; talk('b10_c6_key'); const kn = DLG.b10_c6_key();
  out.k = Object.assign(out.k, {hold:has('b10_c6_key', /holds\. As ordered/), carry:has('b10_c6_key', /goes out for them/), notYet:has('b10_c6_key', /Not yet/), html:/Witness/.test(kn.html || ''), tower:/far tower/.test(kn.txt), thegg:/Thegg/.test(kn.txt), ammet:/Ammet/.test(kn.txt), tirren:/Tirren/.test(kn.txt), duskShut:!has('b10_c6_todusk', /Dusk/)});
  const snapK = JSON.stringify(S), witK = b10Wit(), loyK = {thegg:S.loy.thegg, tobet:S.loy.tobet, ammet:S.loy.ammet, tirren:S.loy.tirren};
  /* ================= key: hold ================= */
  take('b10_c6_key', /holds\. As ordered/); out.h = {key:S.f.b10_c6_key, thegg:S.loy.thegg - loyK.thegg, tobet:S.loy.tobet - loyK.tobet, ammet:S.loy.ammet - loyK.ammet, wit0:b10Wit() - witK};
  const hc = vis('b10_c6_hold').find(c => c.check); out.h.wit = !!(hc && hc.witness); out.h.notNow = has('b10_c6_hold', /Not now/); out.h.square = (edgesFor(hc, 'tobet').find(e => /square/.test(e[0])) || [])[1] || 0;
  { const sn = JSON.stringify(S); near('b10_c6_hold', /Shields locked/, 'tobet'); out.h.near = !!(S.rattled || {}).tobet; restore(sn, 'b10_c6_field'); }
  made('b10_c6_hold', /Shields locked/, 'thegg'); out.h.held = S.f.b10_c6_held; out.h.sights = /cut|two pieces/.test(DLG.b10_c6_hold_ok().txt) && /bay goes white/.test(DLG.b10_c6_hold_ok().txt) && /the fight there turns/.test(DLG.b10_c6_hold_ok().txt); out.h.witAfter = b10Wit() - witK;
  talk('b10_c6_todusk'); out.h.duskNot = has('b10_c6_todusk', /Not now/); take('b10_c6_todusk', /^Dusk/);
  out.d = {area:S.area, ph:S.f.b10_c6_ph, dark:!!AREAS[S.area].dark, arrive:S.node === 'b10_c6_dusk_arrive', white:/the bay is white/.test(DLG.b10_c6_dusk_arrive().txt), npc:npc('b10_c6_dusk', 'ennic').node()};
  talk('b10_c6_fire'); out.d.fireRoad = has('b10_c6_fire', /asking every sergeant/); out.d.endShut = !has('b10_c6_fire', /The end of it/); out.d.fireTxt = /room round the fire/.test(DLG.b10_c6_fire().txt);
  talk('b10_c6_news'); const nw = DLG.b10_c6_news(); out.d.news = S.f.b10_c6_news === 1 && /turned on their masters/.test(nw.txt) && /Their leaders are dead/.test(nw.txt) && /the Commander fell/.test(nw.txt) && /got up/.test(nw.txt); out.d.third = /came out of the glass/.test(nw.txt) && /went wet/.test(nw.txt); out.d.watched = /walk into the glass/.test(nw.txt);
  talk('b10_c6_tally'); out.d.tally = S.kit.includes('b10_c6_kingstally');
  talk('b10_c6_dlook'); talk('b10_c6_deast'); out.d.cut = /cut in half/.test(DLG.b10_c6_deast().txt);
  /* the road */
  talk('b10_c6_road'); const rn = DLG.b10_c6_road(); out.rd = {html:/Witness/.test(rn.html || ''), letheras:has('b10_c6_road', /Letheras/), kolanse:has('b10_c6_road', /We stay\. Kolanse/), free:has('b10_c6_road', /^"Out/), notNow:has('b10_c6_road', /Not now/), tirren:/horses need somebody/.test(rn.txt)};
  { const sn = JSON.stringify(S); take('b10_c6_road', /Not now/); out.rd.nothing = !b10LethRoad(); restore(sn, 'b10_c6_dusk'); }
  take('b10_c6_road', /Letheras/); out.rd.road = S.f.b10_lethRoad; out.rd.done = S.node === 'b10_c6_road_done' && /Ash/.test(DLG.b10_c6_road_done().txt); out.rd.ask = has('b10_c6_road_done', /Ask it/);
  /* the beat */
  take('b10_c6_road_done', /Ask it/); out.bt = {n:vis('b10_c6_beat').length, notNow:has('b10_c6_beat', /Not now/), html:/Witness/.test(DLG.b10_c6_beat().html || '')};
  { const sn = JSON.stringify(S); take('b10_c6_beat', /Not now/); out.bt.nothing = !b10BeatOf(6); restore(sn, 'b10_c6_dusk'); }
  const wB = b10Wit(); take('b10_c6_beat', /Each other/); out.bt.rec = b10BeatOf(6); out.bt.wit = b10Wit() - wB; out.bt.flag = S.f.b10_c6_beat;
  talk('b10_c6_fire'); out.bt.end = has('b10_c6_fire', /The end of it/) && has('b10_c6_fire', /Not now/); out.bt.gone = !has('b10_c6_fire', /What was it for/); out.bt.lines4 = DLG.b10_c6_fire_talk().txt.split('\n\n').length; out.bt.here4 = S.squad.filter(id => id !== 'sgt').length;
  /* the fates for Chapter Seven */
  const pg = CHAPTERS[6].fates.pages(); out.fa = {n:pg.length, perrit:pg.some(p => p.id === 'perrit' && p.k === 'gone' && /fell on the Sixth's stretch/.test(p.txt)), sgt:pg[pg.length - 1].id === 'sgt', road:CHAPTERS[6].fates.road(), tirren:/Letheras/.test(CHAPTERS[6].fates.line('tirren')), page:CHAPTERS[6].fates.roadPage()[0], fell:CHAPTERS[6].fates.fell().join(','),
    camp:pg.filter(p => p.label === 'Waiting').length, all:pg.every(p => p.txt && !leak.test(p.txt) && !never.test(p.txt))};
  take('b10_c6_fire', /The end of it/); out.e2 = {notYet:has('b10_c6_onward', /Not yet/), txt:/Home to Letheras/.test(DLG.b10_c6_onward().sp) && /Perrit did not walk off/.test(DLG.b10_c6_onward().txt) && /Ash/.test(DLG.b10_c6_onward().txt)};
  const witH = b10Wit(); take('b10_c6_onward', /The end of it/); await wait(60);
  out.e2.end = {view, ch:S.chapters[6], wit:witH, endText:(CHEND[6] || {}).hold && CHEND[6].hold[0], extras:CHAPTERS[6].extras().length, journal:CHAPTERS[6].journal().length, scene:CHAPTERS[6].endScene};
  /* ================= key: carry, from the same moment; Witness low: kolanse greyed ================= */
  restore(snapK, 'b10_c6_field'); S.chapter = 6;
  take('b10_c6_key', /goes out for them/); out.c = {key:S.f.b10_c6_key, ammet:S.loy.ammet - loyK.ammet, tirren:S.loy.tirren - loyK.tirren, thegg:S.loy.thegg - loyK.thegg, wit0:b10Wit() - witK};
  const cc = vis('b10_c6_carry').find(c => c.check); out.c.wit = !!(cc && cc.witness); out.c.notYet = has('b10_c6_carry', /Not yet/); out.c.ammetE = (edgesFor(cc, 'ammet').find(e => /surgeon/.test(e[0])) || [])[1] || 0;
  { const sn = JSON.stringify(S); near('b10_c6_carry', /Out, in pairs/, 'thegg'); out.c.near = ((S.bruised || {}).thegg || 0) > 0; restore(sn, 'b10_c6_field'); }
  runFx(cc); out.c.fight = await force('b10_c6_open'); out.c.carried = S.f.b10_c6_carried; out.c.witA = b10Wit() - witK; talk('b10_c6_open_after'); out.c.once = b10Wit() - witK; out.c.words = /Breathing/.test(DLG.b10_c6_open_after().txt);
  take('b10_c6_todusk', /^Dusk/); b10Witness(-(b10Wit() - 2), 'test: low'); talk('b10_c6_road');
  out.c.closed = has('b10_c6_road', /\(closed: /) && vis('b10_c6_road').find(c => /\(closed: /.test(c.t)).tag === 'closed'; take('b10_c6_road', /\(closed: /); out.c.closedTxt = S.node === 'b10_c6_road_closed' && !b10LethRoad(); take('b10_c6_road_closed', /Back to the question/);
  take('b10_c6_road', /^"Out/); out.c.road = S.f.b10_lethRoad; take('b10_c6_road_done', /Ask it/); take('b10_c6_beat', /Nothing\. We stood/); out.c.beat = b10BeatOf(6); out.c.beatFlag = S.f.b10_c6_beat;
  out.c.page = CHAPTERS[6].fates.roadPage(); talk('b10_c6_onroad'); take('b10_c6_onroad', /The end of it/); take('b10_c6_onward', /The end of it/); await wait(60);
  out.c.end = {view, ch:S.chapters[6], endText:CHEND[6].carry[0], extras:CHAPTERS[6].extras().some(x => /open ground after the line's wounded/.test(x))};
  /* ================= Chapter Four on 'pace': first down, the scale offered first ================= */
  fromSix(() => { S.f.b10_c4_key = 'pace'; delete S.f.b10_c4_horses; S.f.b10_c4_pace = 1; S.chapters[4] = 'pace'; });
  out.p = {intro:/first down to the water/.test(CHAPTERS[6].intro.paras[1]()), start:/first down/.test(DLG.b10_c6_start().txt)}; out.p.first = /First down gets first pick/.test(DLG.b10_c6_yelt().txt); talk('b10_c6_yelt'); out.p.scale = S.kit.includes('b10_c6_shipscale') && out.p.first;
  out.p.noAsh = !/Ash made it/.test(DLG.b10_c6_horses().txt); talk('b10_c6_ennic'); S.f.b10_c6_ph = 2; startExplore('b10_c6_field'); const ps = vis('b10_c6_stakes').find(c => c.check); out.p.noHorseEdge = !(edgesFor(ps, 'tobet').find(e => /horses carried/.test(e[0])));
  S.f.b10_lethRoad = 'letheras'; S.f.b10_c6_ph = 4; out.p.tirrenEnd = /the one at the end of the picket/.test(b106TirrenHorse('letheras', true));
  /* ================= the 'adjunct' road (the foreigners' field, its morning) ================= */
  fromSix(() => { S.f.b10_lRoad = 'adjunct'; });
  out.u = {area:S.area, renderErr:renderAll(), intro:/came out of the glass/.test(CHAPTERS[6].intro.paras[0]()), introScene:CHAPTERS[6].intro.scene, readScene:B10READ[6].scene};
  talk('b10_c6_start'); out.u.start = DLG.b10_c6_start().scene === 'b10_kolanse' && /ridge/.test(DLG.b10_c6_start().txt);
  out.u.orders = /given us a stretch/.test(DLG.b10_c6_ennic().txt) && /ridge/.test(DLG.b10_c6_ennic().txt); talk('b10_c6_ennic'); talk('b10_c6_yelt'); out.u.scale = S.kit.includes('b10_c6_shipscale');
  talk('b10_c6_drill'); out.u.drill = /carried a bundle of these across the glass/.test(DLG.b10_c6_drill().txt);
  talk('b10_c6_landing'); out.u.ditch = /dry ditch/.test(DLG.b10_c6_landing().txt); out.u.fightB = await force('b10_c6_beach');
  take('b10_c6_fire', /Out to the line/); take('b10_c6_up', /To the stretch/); out.u.field = S.area === 'b10_c6_field';
  talk('b10_c6_order'); out.u.order = /ridge/.test(DLG.b10_c6_order().txt) && !/Grey Helms/.test(DLG.b10_c6_order().txt);
  talk('b10_c6_east'); out.u.third = /foreign heavies/.test(DLG.b10_c6_east().txt) && /their own stretch/.test(DLG.b10_c6_east().txt);
  out.u.line = await force('b10_c6_line'); out.u.fell = Array.isArray(S.f.b10_c6_fell) && !S.f.b10_c6_fell.length; out.u.noGrey = !/fold the wrong way/.test(BATTLES.b10_c6_line.stage2.text());
  talk('b10_c6_key'); out.u.key = /walk back across the open ground/i.test(DLG.b10_c6_key().txt) || /go back/.test(DLG.b10_c6_key().txt); take('b10_c6_key', /holds\. As ordered/); made('b10_c6_hold', /Shields locked/, 'thegg', false); out.u.bent = S.f.b10_c6_held === 'bent' && /low hill/.test(DLG.b10_c6_hold_no().txt);
  take('b10_c6_todusk', /^Dusk/); talk('b10_c6_news'); out.u.news = /Malazan Host/.test(DLG.b10_c6_news().txt) && /knees/.test(DLG.b10_c6_news().txt) && !/Commander fell/.test(DLG.b10_c6_news().txt);
  talk('b10_c6_road'); take('b10_c6_road', /We stay/); out.u.road = S.f.b10_lethRoad; out.u.renderErr2 = renderAll();
  take('b10_c6_road_done', /Ask it/); take('b10_c6_beat', /So it was seen/); out.u.beat = b10BeatOf(6);
  take('b10_c6_fire', /The end of it/); take('b10_c6_onward', /The end of it/); await wait(60); out.u.end = {view, ch:S.chapters[6], text:/foreigners' line/.test(CHEND[6].hold[1])};
  /* ================= the Third on 'south': the Twelfth, three stretches down ================= */
  fromSix(() => { S.f.b10_tRoad = 'south'; S.f.b10_c5_key = 'hold'; S.chapters[5] = 'hold'; });
  S.f.b10_c6_ph = 2; out.s = {east:/Twelfth/.test(DLG.b10_c6_east().txt) && /kept their last water/.test(DLG.b10_c6_east().txt) && /The Twelfth is not the Sixth/.test(DLG.b10_c6_east().txt), newsNo:!/came out of the glass/.test(DLG.b10_c6_news().txt)};
  /* ================= a transfer's Letherii (Perrit dead; Ilsa, Sorvan walking; Tirren waiting) ================= */
  setBook('tcg'); S = newStateTCG('Hask', 'Syn'); b10Use('l'); S.squad = ['sgt', 'tobet', 'ilsa', 'sorvan', 'thegg', 'ammet']; S.camp = ['tirren', 'brennet', 'kaedra']; S.dead = {perrit:{ch:6, where:'the line', from:'dod'}}; S.f.b10_tirrenDone = 2; S.lvl = 18; S.xp = LEVELS[17];
  [...S.squad, ...S.camp].forEach(k => { if (k === 'sgt') return; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; b10Use('t'); S.picksDue = []; save(); startChapter(6); clearModal();
  out.x = {renderErr:renderAll(), reader:b10Rd().id, lines:DLG.b10_c6_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ilsa:/Ilsa/.test(DLG.b10_c6_fire_talk().txt), noTirren:!/Tirren/.test(DLG.b10_c6_fire_talk().txt) && !/Tirren/.test(DLG.b10_c6_horses().txt),
    noPerrit:!/Perrit/.test(DLG.b10_c6_fire_talk().txt), audit:audit()};
  S.f.b10_lethRoad = 'kolanse'; const xp = CHAPTERS[6].fates.pages(); out.x.fates = xp.filter(p => p.label === 'Waiting').length === 3 && !xp.some(p => p.id === 'perrit');
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, e = r.e || {}, y = r.y || {}, b = r.b || {}, t = r.t || {}, l = r.l || {}, f1 = r.fire1 || {}, fd = r.fd || {}, st = r.st || {}, m = r.m || {}, k = r.k || {}, h = r.h || {}, d = r.d || {}, rq = r.rd || {}, bt = r.bt || {}, fa = r.fa || {}, e2 = r.e2 || {}, c = r.c || {}, p = r.p || {}, u = r.u || {}, s = r.s || {}, x = r.x || {};
if (f.area) {
  f.area === 'b10_c6_coast' && f.ch === 6 && f.thread === 'l' && f.lvl0 === 18 && f.wit0 === 5 && f.road === 'escort' && f.tirren && !f.renderErr.length && f.title === 'The Feint' && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 3 && f.scale && f.pike && f.tally && f.ground && f.scenes && f.kinds && f.figs && f.draw === true && f.introScene === 'b10_coast' && f.fireRoster && f.quiet && f.fates
    ? ok(`a --from=6 start opens Chapter Six on the beach: the Letherii at level 18, Witness 5, on 'escort', Tirren walking; every b10_c6 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art; two grounds, three backdrops; the Kolansii and Shriven bodies drawn and worn; Lether's luck is quiet`) : no('fresh ' + JSON.stringify(f).slice(0, 1800));
  const au = f.audit || {}; au.checks >= 6 && au.tricks === 1 && au.wit.join(',') === 'b10_c6_carry,b10_c6_hold,b10_c6_line' && au.witCost.length === 0 && !au.noNear.length && au.onwards >= 5 && !au.noStay.length && au.mortal.length >= 1 && !au.unmarked.length
    ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick none; the Witness checks are hold and carry); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes); every way into the line is marked mortal, on both roads`) : no('audit ' + JSON.stringify(au).slice(0, 1200));
  f.ph === 1 && f.tiles && f.ships && f.ash && f.notNow ? ok('the first halt: the King\'s ships at first light, the reading offered; on \'horses\' Tirren and the grey mare') : no('start ' + JSON.stringify({ph:f.ph, tiles:f.tiles, ships:f.ships, ash:f.ash}));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.back === 'b10_c6_fire' && rd.cardNode === 'b10_c6_card' && rd.cardSp === 'The Tiles of the Holds' && rd.cardBack === 'b10_c6_fire' && rd.again && rd.crate && rd.cold ? ok('the reading: Perrit lays the tiles from B10POOL[6] on a crate off the King\'s ships (the tiles cold); the card node is the visions pass\'s hook; back to b10_c6_fire; offered once') : no('reading ' + JSON.stringify(rd));
e.orders === 1 && e.word ? ok('Ennic: the morning\'s orders; the column\'s word (the Grey Helms gone east; the lizard-folk gone in the night)') : no('ennic ' + JSON.stringify(e));
y.gone && y.check && y.tirren && y.near === 3 && y.got ? ok('on \'horses\', the scale gone at Yelt\'s tailboard; the purser (a "yes, but" of three docks); the last shirt of scale') : no('yelt ' + JSON.stringify(y));
b.giants && b.ash ? ok('the very large passengers seen from the shore, never met; the horse-lines: every horse, and Ash') : no('beach ' + JSON.stringify(b));
t.dc === 20 && t.stat === 'wits' && t.noNear && t.notNow && t.pike && t.sgt === 2 && t.sorvan === 2 && t.who === 'sgt' && t.ok === 1 && t.notFree && t.uses && t.twice && t.again ? ok('the trick: The Letherii Square, a ✦ wits 20 check on the sand (the sergeant and Sorvan +2), twice a chapter, it uses the action; the brigade pike') : no('trick ' + JSON.stringify(t));
l.notNow && l.leave && l.thin && l.near && l.fight && l.fight.started && !l.fight.mortal && l.fight.death && !l.fight.onT && /b10_kolansii/.test(l.fight.kinds) && l.done ? ok(`the landing (optional): Kolansii, thin, after the bread; Not now, leave it, a "yes, but"; not mortal (death checks run); the Kolansii bodies (${l.fight.kinds})`) : no('landing ' + JSON.stringify(l));
f1.html && f1.talk && f1.rest && f1.on && f1.notNow && f1.noBeat && f1.lines === f1.here && f1.tirren && f1.rested && f1.upNot ? ok(`the fire at first light: Witness shown, a rest, the talk (a line each, ${f1.lines}), the way up to the line with Not now beside it`) : no('fire1 ' + JSON.stringify(f1));
fd.area === 'b10_c6_field' && fd.ph === 2 && fd.arrive && fd.scene === 'b10_field' && fd.tower && fd.noFire && fd.lineShut && fd.npcOrder && fd.order && fd.orderHtml && fd.eastNoThird ? ok('the Sixth\'s stretch: the far tower, the order ("Hold them in front of us"), the Grey Helms in the Kolansii centre; the line shut until the order') : no('field ' + JSON.stringify(fd));
st.notNow && st.horses === 2 && st.thegg === 2 && st.near && st.set === 'set' ? ok('the stakes: the one check before the line (the train\'s horses carried them up: +2; a "yes, but" on the hand)') : no('stakes ' + JSON.stringify(st));
const mf = m.fight || {};
m.tag && m.txt && m.notYet && m.warn && m.html && mf.started && mf.mortal && !mf.death && mf.stage2 && mf.inStage2 && !mf.death2 && mf.allies === 2 && mf.allies2 === 2 && !mf.onT && !mf.onT2 && /b10_kolansii_pike/.test(mf.kinds) && /b10_shriven/.test(mf.kinds2) && /officer/.test(mf.kinds2) && mf.after === 'b10_c6_line_after' && m.dead && m.dead.ch === 6 && !m.inSquad && Array.isArray(m.fell) && m.fell.join(',') === 'perrit' && m.ph === 3 && m.up && m.afterTxt && m.stage2Grey
  ? ok(`THE MORTAL FIGHT: signposted ("(a mortal fight: whoever falls here stays down)", tagged mortal, Not yet); both grounds, no death checks, two spears of the line kept; Kolansii, a pike and a bow, then an officer and two Shriven; Perrit falls and stays down (S.f.b10_c6_fell = [perrit]); level ${m.lvl}; the Grey Helms turn far off`) : no('mortal ' + JSON.stringify(m).slice(0, 1400));
k.npc && k.hold && k.carry && k.notYet && k.html && k.tower && k.thegg && k.ammet && k.tirren && k.duskShut ? ok('the key: the Kolansii break for the far tower; hold as ordered or go out for them; Not yet; Witness shown; Thegg, Ammet and Tirren have their say') : no('key ' + JSON.stringify(k));
h.key === 'hold' && h.thegg === 1 && h.tobet === 1 && h.ammet === 0 && h.wit0 === 0 && h.wit && h.notNow && h.square === 1 && h.near && h.held === 'firm' && h.sights && h.witAfter === 0 && h.duskNot ? ok('key hold: Thegg and Tobet +1; holding the line while they go past (a Witness check; the square +1; its "yes, but" rattles); the bay white, something cut in half, the dead at the tower, far off; no Witness move') : no('hold ' + JSON.stringify(h));
d.area === 'b10_c6_dusk' && d.ph === 4 && d.dark && d.arrive && d.white && d.npc === 'b10_c6_news' && d.fireRoad && d.endShut && d.fireTxt && d.news && d.third && d.watched && d.tally && d.cut ? ok('dusk: the news (the Grey Helms turned on their masters; their leaders dead; the Commander fell, and got up); the Third\'s one line (out of the glass, the ground wet); Ch 2\'s watched line; the King\'s tally') : no('dusk ' + JSON.stringify(d));
rq.html && rq.letheras && rq.kolanse && rq.free && rq.notNow && rq.tirren && rq.nothing && rq.road === 'letheras' && rq.done && rq.ask ? ok('the Sixth\'s road: home, stay (open at Witness 5), out, Not now (sets nothing); Letheras; Tirren names the horse she brings home (Ash)') : no('road ' + JSON.stringify(rq));
bt.n === 4 && bt.notNow && bt.html && bt.nothing && bt.rec === 'kept' && bt.wit === 1 && bt.flag === 'each' && bt.end && bt.gone && bt.lines4 === bt.here4 ? ok('the beat (c6): "What was it for?", three answers and Not now (records nothing); kept +1; the end at the fire, Not now beside it') : no('beat ' + JSON.stringify(bt));
fa.n >= 6 && fa.perrit && fa.sgt && fa.road === 'letheras' && fa.tirren && fa.page === 'Home to Letheras' && fa.fell === 'perrit' && fa.camp === 2 && fa.all ? ok(`B10CH6.fates for Chapter Seven: ${fa.n} pages (walking, waiting, Perrit fallen on the stretch, the sergeant last); the road page "${fa.page}"`) : no('fates ' + JSON.stringify(fa));
const en = e2.end || {}; e2.notYet && e2.txt && en.view === 'end' && en.ch === 'hold' && en.endText === 'Held' && en.extras >= 4 && en.journal >= 5 && en.scene === 'b10_field' ? ok(`the end on hold: the road page, Perrit's name, Tirren and Ash; Witness ${en.wit}`) : no('hold end ' + JSON.stringify(e2));
c.key === 'carry' && c.ammet === 1 && c.tirren === 1 && c.thegg === 0 && c.wit0 === 0 && c.wit && c.notYet && c.ammetE === 2 && c.near && c.fight && c.fight.started && c.fight.survive && !c.fight.mortal && c.fight.death && c.fight.waves === 2 && !c.fight.onT && c.carried === 1 && c.witA === 1 && c.once === 1 && c.words && c.closed && c.closedTxt && c.road === 'free' && c.beat === 'doubt' && c.beatFlag === 'told' && /Out/.test(c.page[0]) && c.end && c.end.view === 'end' && c.end.ch === 'carry' && c.end.endText === 'Went back for them' && c.end.extras
  ? ok('key carry, from the same moment: Ammet and Tirren +1; out in pairs (a Witness check; the surgeon +2); the open ground (survive 4, two waves, not mortal); Witness +1 once; with Witness low, Kolanse greyed with a line; out; the beat doubted; the end on carry') : no('carry ' + JSON.stringify(c).slice(0, 1400));
p.intro && p.start && p.scale && p.noAsh && p.noHorseEdge && p.tirrenEnd ? ok('Chapter Four on \'pace\': first down to the water, the scale offered first; no horses\' edge on the stakes; Tirren takes whichever horse is left') : no('pace ' + JSON.stringify(p));
u.area === 'b10_c6_camp' && u.renderErr && !u.renderErr.length && u.intro && u.introScene === 'b10_kolanse' && u.readScene === 'b10_kolanse' && u.start && u.orders && u.scale && u.drill && u.ditch && u.fightB && u.fightB.started && u.field && u.order && u.third && u.line && u.line.started && u.line.mortal && u.fell && u.noGrey && u.key && u.bent && u.news && u.road === 'kolanse' && u.renderErr2 && !u.renderErr2.length && u.beat === 'kept' && u.end && u.end.view === 'end' && u.end.text
  ? ok('the \'adjunct\' road: the foreigners\' camp out of the glass, the quartermaster\'s scale, the Finadd\'s square; Kolansii in the ditch; the stretch far from any banner (the Third seen far off, never on one stretch); the same mortal fight; the relief as news at dusk; staying in Kolanse') : no('adjunct ' + JSON.stringify(u).slice(0, 1400));
s.east && s.newsNo ? ok('the Third on \'south\': at the back of the Twelfth\'s line, three stretches down, seen from the east end; the Twelfth is not the Sixth') : no('south ' + JSON.stringify(s));
x.renderErr && !x.renderErr.length && x.reader === 'tilewoman' && x.lines === x.here && x.ilsa && x.noTirren && x.noPerrit && x.audit && !x.audit.noNear.length && !x.audit.noStay.length && x.fates
  ? ok(`a transfer's Letherii (Perrit dead; Tirren waiting): every node renders, the tile-woman reads, a line each at the fire (${x.lines}); the fates page the waiting`) : no('transfer ' + JSON.stringify(x).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b10ch6: FAIL (${bad.length})` : 'b10ch6: all ok'); process.exit(bad.length ? 1 : 0);
