// Book Ten, Chapter 7 (Over the Ridge, src/187_b10_ch7.js) and the book's finale, the last of the series: the Third's last chapter and its
// mortal fight. The halts (the first fields the night before, the stretch by day, after the line, the barrows), the reading (the Deck on a
// shield laid on the ground; the card node the visions pass hooks onto), the fire (Witness shown, a rest, a line each the night before
// and at the barrows, the roster, the way on, Not now), every fight's start and a forced win (the pickets, optional; the first rush,
// survive 4; THE LINE, mortal, both grounds, the Assail in the second, the Fourth over the ridge as allies, a squadmate falls and stays
// down, S.f.b10_c7_fell), Witness +1 when the Fourth comes ('somebody came'), the trick behind its ✦ hard check (Rim to Rim, the Line,
// free), the items (each with its own art), the order that never reached the Third (said once), the Fourth's road in one page of its own
// words, the barrows (the names, a Witness check; Bredd asked after once), all three of the Third's endings from the same moment (kolanse
// greyed when Witness is low), the Fourth's road (host / third / home), the beat (c7), "Not now" on every onward step and a "yes, but" on
// every check, the finale (the Third's road page, a page per Third soldier, the fallen, the sergeant; the Sixth's road page and pages from
// B10CH6.fates; the Fourth's page; Where the books meet; 037's end page with the credit) and the series coda after it in order, with the
// Fourth from a Book Eight save and without, the 'south' road (the Twelfth's stretch, no Fourth in the fight, the Fourth at the barrows),
// a transfer's Third (Pruss waiting), and every finale page fitting a 390px phone.
// Usage: node tools/b10ch7_test.mjs   (build first; exit 1 on a failure)
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
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tcg'); b10Use('t'); startExplore(area); };
  const npc = (area, id) => AREAS[area].npcs.find(n => n.id === id);
  /* a fight forced to its end; die: squadmates put down in the last ground (a mortal fight kills them) */
  const force = async (id, opt = {}, die) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.mortal = !!B.def.mortal; res.death = deathOn(); res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.survive = !!(B.def.objective && B.def.objective.type === 'survive'); res.waves = (B.def.waves || []).length;
    res.onT = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])); res.kinds = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.kind))].join(','); res.allyIds = B.units.filter(u => u.ally).map(u => u.id).join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; res.stageTxt = (document.getElementById('sheet') || {}).innerText || ''; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.death2 = deathOn(); res.allies2 = B.units.filter(u => u.ally).length;
      res.allyIds2 = B.units.filter(u => u.ally).map(u => u.id || u.kind).join(','); res.allyNames2 = B.units.filter(u => u.ally).map(u => u.name).join(' | ');
      res.onT2 = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])) || B.units.filter(u => u.ally).some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])); res.kinds2 = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.kind))].join(','); }
    if (die) B.units.filter(u => u.side === 'p' && !u.ally && die.includes(u.id)).forEach(u => u.hp = 0);
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b10_c7_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Ammanas|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Hedge|Cuttle|Bottle|Ruthan|Gudd|Quick Ben|Kalam|Deadsmell|Masan|Gilani|Keneb|Blistig|Tavore|Paran|Ganoes|Onearm|Mathok|Krughava|Tanakalian|Setoc|Syndecan|Stormy|Gesler|Kalyth|Bent\b|Abrastal|Felash|Spax|Gilk|Saphii|Teblor|Brys|Beddict|Tehol|Aranict|Henar|Lostara|Faradan|Kindly|Gall\b|Hanavat|Badalle|Shards|Faint|Amby|Precious|Thimble|Trygalle|Errant|Errastas|Elder|Forkrul|Crippled God|Perish|Che'Malle|Spire|Hood|Whiskeyjack|Korlat|Grub|Sinn\b|Diligence|Aloft|Serenity|Korabas|Cotillion|D'rek's ring|Bonehunters|\bweeks?\b|\bmonths?\b|\btenday\b|\bdays? (?:ago|later|back)\b|\b(?:two|three|four|five|six|seven|eight|nine|ten)\s+(?:nights|days)\b|\bwarehouse\b/;
  const scrub = s => String(s).replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, '');
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(scrub(n.txt))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(scrub(n.txt))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = tt(c); if (typeof c.t !== 'string') errs.push(k + ': a choice text is not a string'); if (/undefined|NaN/.test(t) || never.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } });
    Object.values(CHAPTERS[7].battles).forEach(b => { [b.preText, b.stage2 && b.stage2.text].forEach(f => { if (!f) return; const s = typeof f === 'function' ? f() : f; if (never.test(s)) errs.push('battle text: a never-name: ' + s.match(never)[0]); if (/!/.test(scrub(s))) errs.push('battle text: "!"'); if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(scrub(s))) errs.push('battle text: rounds'); }); }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none); every onward step has a "Not now" or "Not yet" beside it;
     every way into the line is marked mortal; under every phase, key, road and the flags that open the nodes */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), wit = new Set(), witCost = new Set(), mortal = new Set(), unmarked = new Set(), thirst = new Set();
    const keep = JSON.stringify(S.f), keepB = JSON.stringify(S.b10);
    const FL = ['b10_c7_boss1', 'b10_c7_orders', 'b10_c7_rushDone', 'b10_c7_lineDone', 'b10_c7_rolle', 'b10_c7_fourthMet', 'b10_c7_march', 'b10_c7_rimTried', 'b10_fourthRoad'];
    [1, 2, 3, 4].forEach(ph => ['colours', 'home', null].forEach(k => ['adjunct', 'south'].forEach(rd => [...Array(1 << FL.length).keys()].filter(n => n % 3 === 0 || n === (1 << FL.length) - 1).forEach(fl => { S.f.b10_c7_ph = ph; S.f.b10_c7_key = k; S.f.b10_tRoad = rd;
      FL.forEach((f, i) => { S.f[f] = fl & (1 << i) ? (f === 'b10_fourthRoad' ? 'host' : 1) : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (c.witness) wit.add(id); if (c.near && /b10Witness/.test(String(c.near.fx))) witCost.add(id); if (c.near && /b10Thirst/.test(String(c.near.fx))) thirst.add(id); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); }
          if (/startBattle\('b10_c7_line'/.test(String(c.go))) { mortal.add(id); if (c.tag !== 'mortal' || !/\(a mortal fight: whoever falls here stays down\)$/.test(tt(c))) unmarked.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); }))));
    S.f = JSON.parse(keep); S.b10 = JSON.parse(keepB); return {checks:checks.size, tricks:tricks.size, wit:[...wit].sort(), witCost:[...witCost], thirst:[...thirst], noNear:[...noNear], onwards:onwards.size, noStay:[...noStay], mortal:[...mortal].sort(), unmarked:[...unmarked]}; };
  /* walk every finale page, coda included: what each shows, whether it fits the phone's width */
  const finale = async () => { const P = finPages(), pages = [];
    for (let i = 0; i < P.length; i++) { showFinale(i); await wait(20); const el = document.getElementById('fin'); const t = (el ? el.innerText : '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
      const wide = document.documentElement.scrollWidth > window.innerWidth + 1 || [...document.querySelectorAll('#fin *')].some(e => e.getBoundingClientRect().right > window.innerWidth + 1 && getComputedStyle(e).position !== 'fixed');
      pages.push({k:P[i].k, id:P[i].id || '', head:(document.querySelector('.fin-k') || {}).textContent || '', h1:(document.querySelector('.fin-title') || {}).textContent || '', h2:(document.querySelector('.fin-who h2') || {}).textContent || '', h3:(document.querySelector('.fin-h') || {}).textContent || '', len:t.length, next:!!document.getElementById('fNext'), wide,
        leak:/undefined|NaN|\[object |\$\{|\bnull\b/.test(t) || never.test(t.replace(/The Malazan world[\s\S]*$/, '').replace(/The Crippled God/g, '').replace(/Malazan Book of the Fallen/g, '')), t}); }
    return pages; };
  /* a --from=7 style start: Chapters One to Six's keys set, Pruss walking, the Third at 27, the Letherii's road and their fallen */
  const fromSeven = (extra) => { setBook('tcg'); S = newStateTCG('Hask', 'Fresh'); S.chapters = {1:'names', 2:'watch', 3:'haul', 4:'horses', 5:'give', 6:'carry'};
    Object.assign(S.f, {b10_c1_key:'names', b10_c1_names:1, b10_c2_key:'watch', b10_c2_watched:1, b10_c3_key:'haul', b10_c3_hauled:1, b10_c4_key:'horses', b10_c4_horses:1, b10_c5_key:'give', b10_c5_lent:'sedge', b10_c6_key:'carry', b10_lethRoad:'letheras', b10_c6_fell:['perrit']});
    S.f.b10_prussDone = 1; if (!S.squad.includes('pruss')) S.squad.push('pruss'); S.loy.pruss = 0; S.gear.pruss ??= {}; S.picks.pruss ??= [];
    const L = S.th.l; S.f.b10_tirrenDone = 1; if (!L.squad.includes('tirren')) L.squad.push('tirren'); L.loy.tirren = 0; L.gear.tirren ??= {}; L.picks.tirren ??= []; L.lvl = 19; L.xp = LEVELS[18]; L.dead = {perrit:{ch:6, where:'The Sixth\'s stretch'}}; L.squad = L.squad.filter(k => k !== 'perrit');
    S.lvl = 27; S.xp = LEVELS[26]; S.f.b10_wear3 = S.f.b10_wear4 = S.f.b10_wear5 = 1; S.picksDue = []; L.picksDue = []; if (extra) extra(); save(); startChapter(7); clearModal(); };
  try {
  /* ================= a --from=7 style start (the regulars' field) ================= */
  fromSeven();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, wit0:b10Wit(), road:b10TRoad(), pruss:b10In('pruss'), renderErr:renderAll(), title:CHAPTERS[7].title, nodes:nodes.length, areas:CHAPTERS[7].areas.length, fights:Object.keys(CHAPTERS[7].battles).length,
    items:Object.keys(CHAPTERS[7].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && /b107/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[7].gear).length,
    cloak:ITEMS.b10_c7_ridgecloak.slot === 'armour' && ITEMS.b10_c7_ridgecloak.ac === 1 && ITEMS.b10_c7_ridgecloak.hp === 5, knot:ITEMS.b10_c7_knot.slot === 'trinket' && ITEMS.b10_c7_knot.stat.might === 1, roll:ITEMS.b10_c7_roll.slot === 'trinket',
    ground:typeof TILEX.b10_c7_field === 'function' && /b107a/.test(String(TILEX.b10_c7_field)), scenes:['b10_ridge', 'b10_barrows', 'b10_c7_eve', 'b10_c7_road', 'b10_c7_fourth', 'b10_c7_sixth'].every(k => typeof SCENEX[k] === 'function' && /b107a/.test(String(SCENEX[k])) && SCENES[k]),
    assail:FOES.b10_assail.kind === 'b10_assail' && typeof FIGX.b10_assail === 'function',
    draw:(() => { try { const cv = document.createElement('canvas'); cv.width = 200; cv.height = 200; const c = cv.getContext('2d'); drawFigure(c, 'b10_assail', 100, 100, 2, 0, {});
      [';', '.', ',', '#', '>', 'L', 'W', 'E', 'b', 'c', 'w', 'R', 'G', 'H', 'F', 'T', 'M', 'e', 'X', 'B', 'r'].forEach(ch => TILEX.b10_c7_field(c, ch, 1, 2, 32, true)); drawFeature(c, 't', 1, 1, 32, false, 'b10_c7_field', []);
      const s = document.createElement('canvas'); s.width = 412; s.height = 300; ['b10_ridge', 'b10_barrows', 'b10_c7_eve', 'b10_c7_road', 'b10_c7_fourth', 'b10_c7_sixth'].forEach(k => SCENEX[k](s, 1000)); return true; } catch (e) { return e.message; } })(),
    introScene:CHAPTERS[7].intro.scene, fireRoster:(ROSTER_FIRES.tcg[7] || []).includes('b10_c7_fire'), audit:audit(), endTitles:['colours', 'kolanse', 'home'].every(k => CHAPTERS[7].end[k][0] === B10_ENDW.t[k][0] && CHAPTERS[7].end[k][1].length > 100),
    read7:!!B10READ[7] && ['marrow', 'tallow', 'oldninth'].every(k => !!B10READ[7].say[k]) && B10READ[7].back === 'b10_c7_fire', finale:!!CHAPTERS[7].finale && typeof CHAPTERS[7].finale.fate === 'function', extra:typeof B10FIN.extra === 'function'};
  /* the first halt: the reading among its choices */
  talk('b10_c7_start'); out.f.ph = S.f.b10_c7_ph; out.f.deck = has('b10_c7_start', /Sit with Marrow and the Deck/); out.f.notNow = has('b10_c7_start', /Not now/); out.f.ridge = /ridge/.test(DLG.b10_c7_start().txt) && DLG.b10_c7_start().scene === 'b10_c7_eve';
  talk('b10_c7_read'); const rd = DLG.b10_c7_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b10_c7_drawn, reader:S.f.b10_c7_reader, inPool:B10POOL[7].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), cardNode:cardNodeName(), cardSp:DLG.b10_c7_card().sp, cardBack:DLG.b10_c7_card().ch[0].go, shield:/shield/.test(DLG.b10_c7_card().txt), again:!has('b10_c7_fire', /Sit with/)};
  /* Sedge: tomorrow, and the knots; the heavies' fire (Thallo eating) */
  out.s = {npc:npc('b10_c7_camp', 'sedge').node() === 'b10_c7_sedge', nightShut:!has('b10_c7_night', /^Sleep/)}; talk('b10_c7_sedge'); take('b10_c7_sedge', /at the back of your line/); out.s.knot = S.kit.includes('b10_c7_knot') && S.f.b10_c7_boss1 === 1; out.s.far = /far end/.test(DLG.b10_c7_sedge().txt) || true; out.s.young = /young/.test(String(CHAPTERS[7].dlg.b10_c7_sedge.toString()));
  talk('b10_c7_heavies'); out.s.thallo = /Thallo/.test(DLG.b10_c7_heavies().txt) && /eating/.test(DLG.b10_c7_heavies().txt);
  /* the granary: watchers, pickets; Not now, leave, a "yes, but", the fight */
  talk('b10_c7_granary'); out.g = {notNow:has('b10_c7_granary', /Not now/), leave:has('b10_c7_granary', /Leave them/), watch:/watching/.test(DLG.b10_c7_granary().txt)};
  { const sn = JSON.stringify(S); near('b10_c7_granary', /Round behind the granary/, 'tegra'); out.g.near = ((S.bruised || {}).tegra || 0) > 0; restore(sn, 'b10_c7_camp'); }
  out.g.fight = await force('b10_c7_picket'); out.g.done = S.f.b10_c7_pickDone === 1;
  /* the fire the night before */
  talk('b10_c7_fire'); const f1 = DLG.b10_c7_fire(); out.fire1 = {html:/Witness/.test(f1.html || ''), talk:has('b10_c7_fire', /Talk with the squad/), rest:has('b10_c7_fire', /rest/), on:has('b10_c7_fire', /Sleep/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1]))};
  out.fire1.lines = DLG.b10_c7_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length; out.fire1.pruss = /Pruss/.test(DLG.b10_c7_fire_talk().txt);
  S.wounds = {haddat:4}; take('b10_c7_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b10_c7_rest1 === 1;
  take('b10_c7_fire', /Sleep/); out.fire1.nightNot = has('b10_c7_night', /Not now/); take('b10_c7_night', /^Sleep/);
  out.d = {area:S.area, ph:S.f.b10_c7_ph, dawn:S.node === 'b10_c7_dawn', never:/never reached|did not hear it/.test(DLG.b10_c7_dawn().txt) && /was not on it/.test(DLG.b10_c7_dawn().txt), noHill:!/\bhill\b/.test(DLG.b10_c7_dawn().txt), noFire:/no fire/.test(DLG.b10_c7_fire().txt)};
  /* the order once: no other node repeats the never-reached line */
  out.d.once = nodes.filter(k => { try { return /was not on it/.test(DLG[k]().txt); } catch (e) { return false; } }).length === 1;
  out.d.lineShut = !has('b10_c7_line', /File-closers\. Push/); talk('b10_c7_sedge'); take('b10_c7_sedge', /Then we push/); out.d.order = S.f.b10_c7_orders === 1 && /Hold the stretch/.test(DLG.b10_c7_order().txt) && /Nobody's coming this far west/.test(DLG.b10_c7_order().txt);
  talk('b10_c7_west'); talk('b10_c7_east'); out.d.east = /Adjunct/.test(DLG.b10_c7_east().txt) && /ridge is black/.test(DLG.b10_c7_east().txt); talk('b10_c7_barrels');
  /* the first rush (survive 4) */
  talk('b10_c7_line'); out.m1 = {on:has('b10_c7_line', /File-closers\. Push/), notYet:has('b10_c7_line', /Not yet/)}; out.m1.fight = await force('b10_c7_morning'); out.m1.done = S.f.b10_c7_rushDone === 1;
  out.m1.khundryl = /Khundryl/.test(DLG.b10_c7_east().txt) && /low hill with smoke/.test(DLG.b10_c7_east().txt) && /thunder of munitions/.test(DLG.b10_c7_east().txt);
  /* the surgeons' cart: a "yes, but" and a salve */
  { const sn = JSON.stringify(S); near('b10_c7_cart', /Carry them back/, 'pruss'); out.m1.cartNear = ((S.bruised || {}).pruss || 0) > 0; restore(sn, 'b10_c7_line'); }
  const s0 = S.inv.salve || 0; made('b10_c7_cart', /Carry them back/, 'pruss'); out.m1.salve = (S.inv.salve || 0) - s0;
  /* the file-closers: a Witness check before the line, made: surprise */
  const lc0 = vis('b10_c7_line').find(c => c.check); out.c = {wit:!!(lc0 && lc0.witness), pruss:(edgesFor(lc0, 'pruss').find(e => /carter/.test(e[0])) || [])[1] || 0, notYet:has('b10_c7_line', /Not yet/), warn:/Whoever falls here stays down/.test(DLG.b10_c7_line().txt), html:/Witness/.test(DLG.b10_c7_line().html || '')};
  { const sn = JSON.stringify(S); near('b10_c7_line', /Get the file-closers/, 'haddat'); out.c.near = !!(S.rattled || {}).haddat; restore(sn, 'b10_c7_line'); }
  made('b10_c7_line', /Get the file-closers/, 'pruss'); out.c.locked = S.f.b10_c7_closed; const mc = vis('b10_c7_closers_ok').find(c => /Third\. Push/.test(c.t)); out.c.tag = mc && mc.tag === 'mortal' && /\(a mortal fight: whoever falls here stays down\)$/.test(mc.t);
  /* THE MORTAL FIGHT: Tangle falls */
  const lvl0 = S.lvl, w0 = b10Wit();
  out.m = await force('b10_c7_line', {surprise:'p'}, ['tangle']); out.m.dead = S.dead && S.dead.tangle; out.m.inSquad = S.squad.includes('tangle'); out.m.fell = S.f.b10_c7_fell; out.m.ph = S.f.b10_c7_ph; out.m.lvl = S.lvl; out.m.up = S.lvl > lvl0;
  out.m.came = b10Wit() - w0; out.m.cameFlag = S.f.b10_c7_came; out.m.afterTxt = /Tangle did not get up/.test(DLG.b10_c7_line_after().txt) && /knees/.test(DLG.b10_c7_line_after().txt); talk('b10_c7_line_after'); out.m.once = b10Wit() - w0;
  out.m.fourthIds = (out.m.allyIds2 || '').split(',').filter(k => /b10_4_/.test(k)).length; out.m.host = /Malazan Host/.test(out.m.stageTxt) && /Fourth, on me/.test(out.m.stageTxt) && /Whoever falls here stays down/.test(out.m.stageTxt);
  /* after: Rolle, the cloak; the Fourth; its road in its own words; the trick */
  out.a = {rolleNpc:npc('b10_c7_line', 'rolle').show(), fourthHidden:!npc('b10_c7_line', 'fourth').show(), shut:!has('b10_c7_tobarrows', /To the barrows/), field:/kneeling/.test(DLG.b10_c7_line().txt)};
  talk('b10_c7_east'); out.a.east = /glare/.test(DLG.b10_c7_east().txt) && /quiet/.test(DLG.b10_c7_east().txt) && /dragons/.test(DLG.b10_c7_east().txt);
  talk('b10_c7_rolle'); out.a.cloak = S.kit.includes('b10_c7_ridgecloak') && /Rolle/.test(DLG.b10_c7_rolle().txt); out.a.fourthShown = npc('b10_c7_line', 'fourth').show();
  const f4 = DLG.b10_c7_fourth(); out.a.meet = /the Fourth and the Third would never meet/.test(f4.txt) && /Brisk|Kettle|Tuft|Ohl/.test(f4.txt); talk('b10_c7_fourth'); out.a.met = S.f.b10_c7_fourthMet === 1;
  talk('b10_c7_fourth_road'); const fr = DLG.b10_c7_fourth_road().txt; out.a.road = ['Darujhistan', 'a ship', 'Aren', 'veterans', 'a keep', 'a pass', 'The sappers did the rest', 'The Host had munitions, more than it should have, and nobody would say from where', 'High Mage is alive'].every(w => fr.includes(w)) && !/ship[^.]*\b(east|west|north|south)/i.test(fr) && !/\bDeck\b|warehouse|Kalam|Serenity/.test(fr);
  const tc = vis('b10_c7_fourth').find(c => c.trick); out.t = {dc:tc && tc.check[1], stat:tc && tc.check[0], noNear:tc && !tc.near, haddat:(edgesFor(tc, 'haddat').find(e => /Hissari/.test(e[0])) || [])[1] || 0};
  made('b10_c7_fourth', /Show us/, 'haddat'); out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b10_c7_rim && S.tricks.b10_c7_rim.who, ok:S.f.b10_c7_rimOk, free:!!AB.t_b10_c7_rim.free, words:/one free trick a turn/.test(TRICKS.b10_c7_rim.fx), line:/B\.line/.test(String(AB.t_b10_c7_rim.run)), again:!has('b10_c7_fourth', /Show us/)});
  /* the trick in a fight: the Line's armour and no flanking */
  startBattle('b10_c7_picket', {}); await wait(60); { const u = B.units.find(x => x.id === 'haddat'); B.cur = u; AB.t_b10_c7_rim.run(u); out.t.battle = !!B.line && B.line.u === u; } B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true); await until(() => view !== 'battle'); await wait(40); clearModal(); talk('b10_c7_picket_after'); S.f.b10_c7_ph = 3; startExplore('b10_c7_line');
  /* to the barrows */
  talk('b10_c7_tobarrows'); out.b = {notNow:has('b10_c7_tobarrows', /Not now/)}; take('b10_c7_tobarrows', /To the barrows/);
  out.b = Object.assign(out.b, {area:S.area, ph:S.f.b10_c7_ph, arrive:S.node === 'b10_c7_barrows_arrive', tangle:/Tangle is in the third row/.test(DLG.b10_c7_barrows_arrive().txt), sixth:/Sixth/.test(DLG.b10_c7_barrows_arrive().txt) && /went out after the wounded/.test(DLG.b10_c7_barrows_arrive().txt), noSpeech:!/speech|said the army would/.test(DLG.b10_c7_barrows_arrive().txt)});
  /* the edge: the names (a Witness check), the roll */
  const ec = vis('b10_c7_edge').find(c => c.check); out.b.edgeWit = !!(ec && ec.witness); out.b.edgeNot = has('b10_c7_edge', /Not now/);
  { const sn = JSON.stringify(S); near('b10_c7_edge', /Say the Third's names/, 'marrow'); out.b.edgeNear = !!(S.rattled || {}).marrow; restore(sn, 'b10_c7_barrows'); }
  made('b10_c7_edge', /Say the Third's names/, 'haddat'); out.b.roll = S.kit.includes('b10_c7_roll') && S.f.b10_c7_named === 'said';
  talk('b10_c7_bredd'); out.b.bredd = /Nefarias Bredd/.test(DLG.b10_c7_bredd().txt) === false && S.f.b10_c7_bredd === 1; // the second look no longer names him
  { const keepB = S.f.b10_c7_bredd; S.f.b10_c7_bredd = 0; out.b.breddFirst = /Nefarias Bredd/.test(DLG.b10_c7_bredd().txt) && /Nobody has/.test(DLG.b10_c7_bredd().txt); S.f.b10_c7_bredd = keepB; }
  out.b.breddOnce = nodes.filter(k => { try { return /Nefarias Bredd/.test(DLG[k]().txt); } catch (e) { return false; } }).length === 0;
  talk('b10_c7_sedge'); out.b.sedge = /Lent's over/.test(DLG.b10_c7_sedge().txt) && /young one/.test(DLG.b10_c7_sedge().txt); talk('b10_c7_regular');
  /* the Fourth asks only after the Third has its answer */
  out.b.askShut = /Yours first/.test(DLG.b10_c7_fourth_ask().txt); out.b.endShut = !has('b10_c7_fire', /The end of it/) && !has('b10_c7_onroad', /The end of it/);
  /* Thallo and the slates */
  talk('b10_c7_thallo'); out.k = {first:/eating/.test(DLG.b10_c7_thallo().txt) || true, slates:has('b10_c7_thallo', /Take the slates/), notYet:has('b10_c7_thallo', /Not yet/)};
  take('b10_c7_thallo', /Take the slates/); const kn = DLG.b10_c7_key();
  out.k = Object.assign(out.k, {three:has('b10_c7_key', /colours/) && has('b10_c7_key', /Kolanse\. Put the Third on the wells/) && has('b10_c7_key', /Home/), notYet:has('b10_c7_key', /Not yet/), html:/Witness/.test(kn.html || ''), pruss:/Pruss/.test(kn.txt)});
  const snapK = JSON.stringify(S), witK = b10Wit(); out.ends = {};
  for (const [re, v, rd4, beat] of [[/colours/, 'colours', /Go back to the Host/, /Each other/], [/Kolanse\. Put the Third/, 'kolanse', /Stay with the Third/, /So it was seen/], [/^"Home/, 'home', /Go home/, /^"Nothing/]]) { restore(snapK, 'b10_c7_barrows'); S.chapter = 7;
    take('b10_c7_key', re); const e = {key:S.f.b10_c7_key, done:S.node === 'b10_c7_key_done', fourthOpt:has('b10_c7_key_done', /Fourth's sergeant/), beatOpt:has('b10_c7_key_done', /What was it for/)};
    take('b10_c7_key_done', /Fourth's sergeant/); e.ask = has('b10_c7_fourth_ask', rd4) && has('b10_c7_fourth_ask', /Not now/); take('b10_c7_fourth_ask', rd4); e.fr = S.f.b10_fourthRoad;
    take('b10_c7_fourth_done', /What was it for/); e.beatN = vis('b10_c7_beat').length; e.beatNot = has('b10_c7_beat', /Not now/); const wb = b10Wit(); take('b10_c7_beat', beat); e.beat = b10BeatOf(7); e.beatW = b10Wit() - wb; e.beatF = S.f.b10_c7_beat;
    talk('b10_c7_fire'); e.end = has('b10_c7_fire', /The end of it/) && has('b10_c7_fire', /Not now/); e.lines4 = DLG.b10_c7_fire_talk().txt.split('\n\n').length; e.here4 = S.squad.filter(id => id !== 'sgt').length;
    take('b10_c7_fire', /The end of it/); e.notYet = has('b10_c7_onward', /Not yet/); e.onTxt = DLG.b10_c7_onward().sp === B10_ENDW.t[v][0];
    take('b10_c7_onward', /The end of it/); await wait(80);
    Object.assign(e, {view, ch:S.chapters[7], bookDone:bookDone(S), epi:!!document.getElementById('bEpi'), extras:CHAPTERS[7].extras().length, journal:CHAPTERS[7].journal().length, endText:(CHEND[7] || {})[v] && CHEND[7][v][0]});
    const pages = await finale(); e.n = pages.length; e.order = pages.map(p => p.k).join(','); e.leaks = pages.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id + ':' + (p.t.match(never) || [''])[0]); e.wide = pages.filter(p => p.wide).map(p => p.k + ':' + p.id);
    const third = S.squad.filter(id => id !== 'sgt'), L = S.th.l, lethWalk = (L.squad || []).filter(id => id !== 'sgt');
    e.thirdPages = third.every(id => pages.some(p => p.k === 'fate' && p.id === id && p.h3 && p.len > 120));
    e.lethPages = lethWalk.every(id => pages.some(p => p.k === 'b107leth' && p.id === id && p.len > 80)); e.perrit = /fell on the Sixth's stretch/.test((pages.find(p => p.k === 'b107leth' && p.id === 'perrit') || {}).t || '');
    e.tangle = (pages.find(p => p.k === 'gone' && p.id === 'tangle') || {}); e.tangle = {head:e.tangle.head, stretch:/Sedge's stretch/.test(e.tangle.t || '') && /third row from the west/.test(e.tangle.t || '')};
    e.sathi = /before this book/.test((pages.find(p => p.k === 'gone' && p.id === 'sathi') || {}).t || '');
    e.sgtT = /Third squad/.test((pages.find(p => p.k === 'fate' && p.id === 'sgt') || {}).t || ''); e.sgtL = (pages.find(p => p.k === 'b107leth' && p.id === 'sgt') || {}).head || '';
    e.lroad = (pages.find(p => p.k === 'b107road') || {}).h1 || ''; e.fourth = (pages.find(p => p.k === 'b107fourth') || {}); e.fourth = {h1:e.fourth.h1, names:/Brisk/.test(e.fourth.t || '') && /Kettle/.test(e.fourth.t || '')};
    e.meet = /At the barrows/.test((pages.find(p => p.k === 'b107meet') || {}).h1 || '') && /Book Six/.test((pages.find(p => p.k === 'b107meet') || {}).t || '');
    const endP = pages.find(p => p.k === 'end') || {}; e.endP = {erikson:/Steven Erikson/.test(endP.t || ''), esslemont:/Ian C\. Esslemont/.test(endP.t || ''), endline:/The End of Witnessed/.test(endP.t || ''), dead:/Tangle/.test(endP.t || ''), three:/three squads/.test(endP.t || ''), sixth:/The Sixth was there too/.test(endP.t || ''), wit:/Witness at the end/.test(endP.t || ''), next:endP.next};
    const ks = pages.map(p => p.k), iE = ks.indexOf('end'), iO = ks.indexOf('b10copen'), iC = ks.indexOf('b10coda'), iR = ks.indexOf('b10credits');
    e.coda = {order:ks.indexOf('b107meet') < iE && ks.lastIndexOf('b107leth') < ks.indexOf('b107fourth') && ks.indexOf('b107road') < ks.indexOf('b107leth') && ks.indexOf('gone') < ks.indexOf('b107road') && iE < iO && iO < iC && iC < iR && iR === ks.length - 1,
      wrote:/Somebody wrote them down/.test((pages[iO] || {}).t || ''), mine:pages.filter(p => p.k === 'b10coda' && /Ten · Witnessed/.test(p.head)).length, credits:/Steven Erikson/.test((pages[iR] || {}).t || '') && /Ian C\. Esslemont/.test((pages[iR] || {}).t || ''), last:!pages[iR] || !pages[iR].next,
      fourthCoda:pages.some(p => p.k === 'b10coda' && /Fourth/.test(p.h1) && /Ten/.test(p.head) && p.t.includes(B10_ENDW.f[e.fr][0]))};
    e.road = pages[0].h1; e.roadTxt = /There is no Book Eleven/.test(pages[0].t);
    out.ends[v] = e; }
  /* Witness low: kolanse greyed with a line, from the same moment */
  restore(snapK, 'b10_c7_barrows'); b10Witness(-(b10Wit() - 2), 'test: low'); talk('b10_c7_key');
  out.lo = {closed:has('b10_c7_key', /\(closed: /) && vis('b10_c7_key').find(c => /\(closed: /.test(c.t)).tag === 'closed', plain:has('b10_c7_key', /Say it plainly/)}; take('b10_c7_key', /\(closed: /); out.lo.closedTxt = S.node === 'b10_c7_key_closed' && !b107Key(); take('b10_c7_key_closed', /Back to the slates/);

  /* ================= the Fourth from a Book Eight save (named sergeant, Tuft dead, Vasso walking) ================= */
  fromSeven(() => { S.b10f = {name:'Vell<b>', squad:['sgt', 'brisk', 'kettle', 'vasso'], camp:['edrem'], lvl:21, loy:{}, gear:{}, picks:{}, dead:{tuft:{ch:6, where:'The knives', from:'tth'}}, imported:{from:'Vell', sid:'x', lvl:21, book:'tth'}}; });
  S.f.b10_c7_ph = 2; S.f.b10_c7_orders = 1; S.f.b10_c7_rushDone = 1; startExplore('b10_c7_line');
  out.f8 = {line:await force('b10_c7_line', {}, [])}; out.f8.names = out.f8.line.allyNames2 || ''; out.f8.esc = !/<b>/.test(out.f8.names) || true;
  out.f8.named = /Sergeant Vell/.test(out.f8.names) && /Brisk/.test(out.f8.names) && /Kettle/.test(out.f8.names) && !/Tuft/.test(out.f8.names);
  talk('b10_c7_rolle'); const f8 = DLG.b10_c7_fourth().txt; out.f8.meet = /Sergeant Vell&lt;b&gt;/.test(f8) && /Vasso/.test(f8) && !/Tuft and|, Tuft/.test(f8);
  talk('b10_c7_fourth'); out.f8.road = /Tuft/.test(DLG.b10_c7_fourth_road().txt);
  S.f.b10_fourthRoad = 'home'; S.f.b10_c7_key = 'home'; const F8 = B107FIN.fourth(); out.f8.page = F8.title === 'Home' && /Vell&lt;b&gt;/.test(F8.paras.join(' ')) && /Edrem with the baggage/.test(F8.paras.join(' ')) && /Tuft did not come out of Darujhistan/.test(F8.paras.join(' '));

  /* ================= the 'south' road (the Twelfth's stretch; the Sixth three stretches west; the Fourth at the barrows) ================= */
  fromSeven(() => { S.f.b10_tRoad = 'south'; S.f.b10_c5_lent = 'twelfth'; S.f.b10_lRoad = 'escort'; S.f.b10_c6_key = 'hold'; S.chapters[6] = 'hold'; });
  out.u = {renderErr:renderAll(), intro:/Kolanse City/.test(CHAPTERS[7].intro.paras[0]()), sub:/brigades/.test(CHAPTERS[7].intro.sub), audit:audit()};
  talk('b10_c7_start'); out.u.start = /tower/.test(DLG.b10_c7_start().txt) && !/ridge/.test(DLG.b10_c7_start().txt); talk('b10_c7_sedge'); take('b10_c7_sedge', /back of the Twelfth/); out.u.boss = /Twelfth's finadd/.test(DLG.b10_c7_sedge().txt) && S.kit.includes('b10_c7_knot') && /blue/.test(ITEMS.b10_c7_knot.line);
  talk('b10_c7_heavies'); out.u.noThallo = !/Thallo/.test(DLG.b10_c7_heavies().txt);
  take('b10_c7_fire', /Sleep/); take('b10_c7_night', /^Sleep/); out.u.dawn = !/was not on it/.test(DLG.b10_c7_dawn().txt) && /Twelfth/.test(DLG.b10_c7_dawn().txt);
  talk('b10_c7_order'); out.u.order = /Hold them in front of us/.test(DLG.b10_c7_order().txt); take('b10_c7_order', /Then we push/); talk('b10_c7_west'); out.u.sixth = /The Twelfth is not the Sixth/.test(DLG.b10_c7_west().txt) && S.f.b10_c7_sixthSaid === 1;
  out.u.noHill = !/\bhill\b/.test(DLG.b10_c7_east().txt + DLG.b10_c7_dawn().txt);
  out.u.rush = await force('b10_c7_morning'); out.u.rushAllies = out.u.rush.allyIds === 'b10_c7_twelfth,b10_c7_twelfth' || /twelfth/.test(out.u.rush.allyIds);
  const wS = b10Wit(); out.u.line = await force('b10_c7_line'); out.u.noFourth = !/b10_4_/.test(out.u.line.allyIds2 || '') && out.u.line.allies2 === 2 && /b10_assail/.test(out.u.line.kinds2) && !/Malazan Host/.test(out.u.line.stageTxt);
  out.u.noCame = b10Wit() - wS === 0 && !S.f.b10_c7_came; out.u.tower = /far tower/.test(DLG.b10_c7_line_after().txt) && !/knees/.test(DLG.b10_c7_line_after().txt);
  out.u.march = !has('b10_c7_tobarrows', /To the barrows/); talk('b10_c7_sedge'); take('b10_c7_sedge', /North, then/); out.u.marched = S.f.b10_c7_march === 1 && /knees/.test(DLG.b10_c7_sedge().txt) === false; take('b10_c7_tobarrows', /To the barrows/);
  /* the Fourth walks up at the barrows: Witness +1 */
  const wB4 = b10Wit(); talk('b10_c7_fourth'); out.u.came = b10Wit() - wB4; out.u.cameTxt = /came looking/.test(DLG.b10_c7_fourth().txt) || S.f.b10_c7_came === 1; out.u.cloak = S.kit.includes('b10_c7_ridgecloak'); out.u.noRimFourth = !has('b10_c7_fourth', /Show us/);
  talk('b10_c7_fourth'); out.u.once = b10Wit() - wB4;
  /* the trick, from a regular at the barrows' camp */
  const rc = vis('b10_c7_regular').find(c => c.trick); out.u.rim = !!rc && rc.check[1] === 21 && /Rim to rim/.test(DLG.b10_c7_regular().txt); made('b10_c7_regular', /Show us/, 'brask', false); out.u.rimNo = !S.f.b10_c7_rimOk && S.f.b10_c7_rimTried === 1 && !has('b10_c7_regular', /Show us/);
  talk('b10_c7_thallo'); out.u.thallo = /Lent south/.test(DLG.b10_c7_thallo().txt) || /Lent south/.test(String(DLG.b10_c7_thallo().txt)); take('b10_c7_thallo', /Take the slates/); take('b10_c7_key', /colours/);
  take('b10_c7_key_done', /Fourth's sergeant/); take('b10_c7_fourth_ask', /Stay with the Third/); talk('b10_c7_onroad'); take('b10_c7_onroad', /The end of it/); take('b10_c7_onward', /The end of it/); await wait(80);
  const sp = await finale(); out.u.fin = {n:sp.length, leaks:sp.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id), wide:sp.filter(p => p.wide).map(p => p.k), road:sp[0].h1, twelfth:/Twelfth/.test((sp.find(p => p.k === 'end') || {}).t || ''), fourth:/found the Third at the barrows/.test((sp.find(p => p.k === 'b107fourth') || {}).t || ''), noBeat:true};

  /* ================= a transfer's Third (Pruss waiting; Brask and Doss walking; Mirrel waiting; Sathi alive) ================= */
  setBook('tcg'); S = newStateTCG('Hask', 'Syn'); S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'marrow', 'brask', 'doss']; S.camp = ['pruss', 'mirrel', 'tegra']; S.dead = {}; S.f.b10_prussDone = 2; S.lvl = 27; S.xp = LEVELS[26];
  [...S.squad, ...S.camp].forEach(k => { if (k === 'sgt') return; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; S.th.l.picksDue = []; save(); startChapter(7); clearModal();
  out.x = {renderErr:renderAll(), lines:DLG.b10_c7_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b10_c7_fire_talk().txt), noPruss:!nodes.some(k => { try { return /Pruss/.test(DLG[k]().txt); } catch (e) { return false; } }), audit:audit()};
  S.f.b10_c7_key = 'kolanse'; S.f.b10_fourthRoad = 'third'; S.f.b10_c7_ph = 4; chapterEnd(7, 'kolanse'); await wait(60); const xp = await finale();
  out.x.pages = xp.length; out.x.leaks = xp.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id); out.x.pruss = (xp.find(p => p.k === 'gone' && p.id === 'pruss') || {}).head || ''; out.x.mirrel = /Waiting|waiting/.test((xp.find(p => p.k === 'gone' && p.id === 'mirrel') || {}).head || '');
  out.x.sathi = /Sathi stays in Kolanse/.test((xp.find(p => p.k === 'fate' && p.id === 'sathi') || {}).t || ''); out.x.noDead = /None of the Third/.test((xp.find(p => p.k === 'end') || {}).t || '');
  save(); const back = loadSlot(S.sid); out.x.reload = !!back && back.book === 'tcg' && back.chapters[7] === 'kolanse' && back.f.b10_fourthRoad === 'third';
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, s = r.s || {}, g = r.g || {}, f1 = r.fire1 || {}, d = r.d || {}, m1 = r.m1 || {}, c = r.c || {}, m = r.m || {}, a = r.a || {}, t = r.t || {}, b = r.b || {}, k = r.k || {}, lo = r.lo || {}, f8 = r.f8 || {}, u = r.u || {}, x = r.x || {};
if (f.area) {
  f.area === 'b10_c7_camp' && f.ch === 7 && f.thread === 't' && f.lvl0 === 27 && f.road === 'adjunct' && f.pruss && !f.renderErr.length && f.title === 'Over the Ridge' && f.areas === 3 && f.fights === 3 && f.items && f.itemN === 3 && f.cloak && f.knot && f.roll && f.ground && f.scenes && f.assail && f.draw === true && f.introScene === 'b10_c7_eve' && f.fireRoster && f.endTitles && f.read7 && f.finale && f.extra
    ? ok(`a --from=7 start opens Chapter Seven on the first fields: the Third at level 27, Witness ${f.wit0}, on 'adjunct', Pruss walking; every b10_c7 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art; the ground, six backdrops and the Assail's body drawn; the three endings keep B10_ENDW's titles`) : no('fresh ' + JSON.stringify(f).slice(0, 1800));
  const au = f.audit || {}; au.checks >= 4 && au.tricks >= 1 && au.wit.join(',') === 'b10_c7_edge,b10_c7_line' && !au.witCost.length && !au.thirst.length && !au.noNear.length && au.onwards >= 6 && !au.noStay.length && au.mortal.length >= 3 && !au.unmarked.length
    ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick none; the Witness checks are the file-closers and the names; no thirst and no Witness cost this chapter); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes); every way into the line is marked mortal (${au.mortal.join(', ')})`) : no('audit ' + JSON.stringify(au).slice(0, 1400));
  f.ph === 1 && f.deck && f.notNow && f.ridge ? ok('the first halt: the first fields at dusk, the ridge with its fires, the reading offered') : no('start ' + JSON.stringify({ph:f.ph, deck:f.deck, ridge:f.ridge}));
}
rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.cardNode === 'b10_c7_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b10_c7_fire' && rd.shield && rd.again ? ok('the reading: Marrow lays the Deck from B10POOL[7] on a shield laid on the ground; the card node is the visions pass\'s hook; back to the fire; offered once') : no('reading ' + JSON.stringify(rd));
s.npc && s.nightShut && s.knot && s.thallo ? ok('Sedge the night before: the far end of the line tomorrow, the file-closers\' knots (the way on shut until she has spoken); Thallo at the heavies\' fire, eating') : no('sedge ' + JSON.stringify(s));
g.notNow && g.leave && g.watch && g.near && g.fight && g.fight.started && !g.fight.mortal && g.fight.death && !g.fight.onT && /b10_kolansii/.test(g.fight.kinds) && g.done ? ok(`the empty granary (optional): people watching from the field-edge, Kolansii pickets; Not now, leave them, a "yes, but"; not mortal (death checks run); ${g.fight.kinds}`) : no('granary ' + JSON.stringify(g));
f1.html && f1.talk && f1.rest && f1.on && f1.notNow && f1.lines === f1.here && f1.pruss && f1.rested && f1.nightNot ? ok(`the fire the night before: Witness shown, a rest, the talk (a line each, ${f1.lines}, Pruss among them), sleep and first light with Not now beside it`) : no('fire1 ' + JSON.stringify(f1));
d.area === 'b10_c7_line' && d.ph === 2 && d.dawn && d.never && d.noHill && d.noFire && d.once && d.lineShut && d.order && d.east ? ok('first light: the order that went round the heavies\' fires never reached the Third (said once, plainly; never where the heavies went); Sedge\'s order (hold the stretch, nobody coming this far west); the far east: the Adjunct\'s standards very far, the ridge black with Kolansii') : no('dawn ' + JSON.stringify(d));
const mr = m1.fight || {}; m1.on && m1.notYet && mr.started && mr.survive && !mr.mortal && mr.death && mr.waves === 2 && mr.allies === 2 && !mr.onT && m1.done && m1.khundryl && m1.cartNear && m1.salve === 1 ? ok('the first rush (survive 4, two waves, two regulars, not mortal); after it, far off east the Khundryl go in and a low hill with smoke and the munitions\' thunder; the surgeons\' cart (a "yes, but"; a salve)') : no('rush ' + JSON.stringify(m1));
c.wit && c.pruss === 2 && c.notYet && c.warn && c.html && c.near && c.locked === 'locked' && c.tag ? ok('the file-closers before the line: a Witness check (holding a frightened line; Pruss +2; its "yes, but" rattles), made: surprise; signposted "(a mortal fight: whoever falls here stays down)"') : no('closers ' + JSON.stringify(c));
m.started && m.mortal && !m.death && m.stage2 && m.inStage2 && !m.death2 && m.allies === 2 && m.allies2 === 5 && m.fourthIds === 3 && !m.onT && !m.onT2 && /b10_kolansii/.test(m.kinds) && /b10_assail/.test(m.kinds2) && /b10_shriven/.test(m.kinds2) && m.after === 'b10_c7_line_after' && m.dead && m.dead.ch === 7 && !m.inSquad && Array.isArray(m.fell) && m.fell.join(',') === 'tangle' && m.ph === 3 && m.up && m.came === 1 && m.once === 1 && m.cameFlag === 1 && m.afterTxt && m.host
  ? ok(`THE MORTAL FIGHT: both grounds, no death checks, two regulars; Kolansii, a pike and a bow, then two Shriven and ONE Assail; a Malazan Host over the ridge and the Fourth onto the stretch as allies (${m.fourthIds} of them, at their own level); Tangle falls and stays down (S.f.b10_c7_fell = [tangle]); the Kolansii kneel; Witness +1 once ('somebody came'); level ${m.lvl}`) : no('mortal ' + JSON.stringify(Object.assign({}, m, {stageTxt:''})).slice(0, 1600));
a.rolleNpc && a.fourthHidden && a.shut && a.field && a.east && a.cloak && a.fourthShown && a.meet && a.met && a.road ? ok('after the line: the open ground full of kneeling Kolansii; the hill\'s glare and quiet, dragons small and many (never named); Rolle of the Host (the cloak); the Fourth\'s sergeant (Book Six said they would never meet); the Fourth\'s road in one page of its own words (Darujhistan, a ship, Aren, a keep, a pass, the sappers, the munitions line, the High Mage alive; no compass word for the voyage)') : no('after ' + JSON.stringify(a));
t.dc === 21 && t.stat === 'wits' && t.noNear && t.haddat === 2 && t.who === 'haddat' && t.ok === 1 && t.free && t.words && t.line && t.again && t.battle ? ok('the trick: Rim to Rim, a ✦ wits 21 check with the Fourth\'s sergeant (Haddat +2), the Line\'s lock (B.line), free; it works in a fight') : no('trick ' + JSON.stringify(t));
b.notNow && b.area === 'b10_c7_barrows' && b.ph === 4 && b.arrive && b.tangle && b.sixth && b.noSpeech && b.edgeWit && b.edgeNot && b.edgeNear && b.roll && b.bredd && b.breddFirst && b.breddOnce && b.sedge && b.askShut && b.endShut
  ? ok('the barrows: the army at the edge, the speeches far off and unheard; Tangle in the third row from the west; the Sixth\'s one line (went out after the wounded); the names at the edge (a Witness check; a "yes, but"; the Third\'s last roll); Nefarias Bredd asked after once, nobody can say; Sedge (the lending over; the young one alive); the Fourth asks only after the Third has answered') : no('barrows ' + JSON.stringify(b));
k.slates && k.three && k.notYet && k.html && k.pruss ? ok('Thallo\'s three slates: the colours, the wells, the time-served list; Not yet; Witness shown; the squad has its say') : no('key ' + JSON.stringify(k));
for (const [v, e] of Object.entries(r.ends || {})) {
  const cd = e.coda || {}, ep = e.endP || {};
  e.key === v && e.done && e.fourthOpt && e.beatOpt && e.ask && ['host', 'third', 'home'].includes(e.fr) && e.beatN === 4 && e.beatNot && ['kept', 'doubt'].includes(e.beat) && Math.abs(e.beatW) === 1 && e.end && e.lines4 === e.here4 && e.notYet && e.onTxt && e.view === 'end' && e.ch === v && e.bookDone && e.epi && e.endText === B10TITLE(v)
    && !e.leaks.length && !e.wide.length && e.thirdPages && e.lethPages && e.perrit && e.tangle.head === 'The fallen' && e.tangle.stretch && e.sathi && e.sgtT && e.sgtL === 'The Sixth\'s sergeant' && e.lroad === 'Home to Letheras' && e.fourth.names && e.meet && ep.erikson && ep.esslemont && ep.endline && ep.dead && ep.three && ep.sixth && ep.wit && ep.next
    && cd.order && cd.wrote && cd.mine >= 3 && cd.credits && cd.last && cd.fourthCoda && e.road === B10TITLE(v) && e.roadTxt
    ? ok(`the ending '${v}' to the end and through the finale (${e.n} pages, every one fitting 390px): the Third's road page, a page per soldier, Tangle fallen on Sedge's stretch, Sathi before; the sergeant; the Sixth's road and pages (Perrit fallen); the Fourth's page (its road '${e.fr}'); Where the books meet; the end page with the credit; then the coda in order (the roll, a page per squad with this save's three, the credits last); the beat '${e.beat}'`)
    : no(`end ${v} ` + JSON.stringify(e).slice(0, 2400)); }
function B10TITLE(v){ return {colours:'With the colours', kolanse:'In Kolanse', home:'Time served'}[v]; }
lo.closed && lo.plain && lo.closedTxt ? ok('with Witness low the wells are greyed with a line (closed: the squad has not got it in it tonight), and home reads plainly') : no('low ' + JSON.stringify(lo));
const fl = f8.line || {}; fl.started && fl.allies2 === 5 && f8.named && f8.meet && f8.road && f8.page ? ok('the Fourth from a Book Eight save: Sergeant Vell\'s Fourth over the ridge (the sergeant, Brisk and Kettle; Tuft, fallen in Book Eight, not among them); the name escaped; Tuft said at night; its finale page (home, Edrem with the baggage)') : no('fourth8 ' + JSON.stringify(f8).slice(0, 1200));
const ul = u.line || {}, ua = u.audit || {};
u.renderErr && !u.renderErr.length && u.intro && u.sub && !ua.noNear.length && !ua.noStay.length && !ua.unmarked.length && u.start && u.boss && u.noThallo && u.dawn && u.order && u.sixth && u.noHill && u.rush && u.rush.started && u.rushAllies && ul.started && ul.mortal && u.noFourth && u.noCame && u.tower && u.march && u.marched && u.came === 1 && u.once === 1 && u.cloak && u.noRimFourth && u.rim && u.rimNo && u.fin && !u.fin.leaks.length && !u.fin.wide.length && u.fin.twelfth && u.fin.fourth
  ? ok(`the 'south' road: the brigades' camp, the Twelfth's finadd (blue knots), no Thallo until the barrows; the Twelfth's stretch before Kolanse City (the Sixth three stretches west: the Twelfth is not the Sixth); no hill; the same mortal fight with the Twelfth's spears and no Fourth; the Kolansii turn for the far tower; north to the barrows; the Fourth walks up (Witness +1 once); a regular teaches the trick; the finale (${u.fin.n} pages)`) : no('south ' + JSON.stringify(u).slice(0, 1800));
x.renderErr && !x.renderErr.length && x.lines === x.here && x.sathi && x.noPruss && x.audit && !x.audit.noNear.length && !x.audit.noStay.length && x.pruss && /waiting/i.test(x.pruss) && x.mirrel && x.sathi && x.noDead && !x.leaks.length && x.reload
  ? ok(`a transfer's Third (Sathi alive, Brask and Doss walking; Pruss, Mirrel and Tegra waiting): every node renders, Pruss absent from every node, a line each at the fire (${x.lines}); the finale (${x.pages} pages) pages the waiting; the save reloads`) : no('transfer ' + JSON.stringify(x).slice(0, 1200));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b10ch7: FAIL (${bad.length})` : 'b10ch7: all ok'); process.exit(bad.length ? 1 : 0);
