// Book Ten, Chapter 5 (The Last Water, src/185_b10_ch5.js): the wear at the chapter's start (−1), the halts (the last lie-up, the night
// march, the wet ground at grey light, the glass's far edge), both keys from the same moment at the last water (on b10_c3_hauled the last
// barrel of the wagon the Third hauled, else its last skin), the reading at the first halt (the Deck; B10READ[5]; the card node the
// visions pass hooks onto), the circle (Witness shown, rests, a line each at the lie-up and at the far edge, the roster, the beat at the
// halt in the night, Not now), every fight's start and a forced win (the stragglers at the next cloak, optional and declinable; the
// outriders, both grounds), the trick behind its ✦ hard check (a Witness check; free; its battle half), the items (each with art), the
// Witness moves (the rise's "yes, but" −1; 'give' +2; 'hold' −1; the lake +1 fixed, once; the beat ±1), the thirst on 'give' (and waived by
// b10_c1_water), the children once and from far off, the one rumour, Sedge and the lending, "Not now" on every onward step and a "yes, but"
// on every check, both roads ('adjunct' and 'south'), from a --from=5 style start and from a transfer's squad (Marrow dead; Sathi, Mehet
// and Ottar walking; Pruss waiting; the wagon cut loose in Ch 3).
// Usage: node tools/b10ch5_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(tt).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tcg'); b10Use('t'); startExplore(area); };
  const npc = (area, id) => AREAS[area].npcs.find(n => n.id === id);
  const thirsty = () => Object.entries(S.injury || {}).filter(([, v]) => v === 'b10thirst').map(([k]) => k);
  const whys = []; { const _w = b10Witness; b10Witness = function(n, why){ whys.push([n, why]); return _w(n, why); }; }
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length;
    res.onCover = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x]));
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2;
      res.onCover2 = B.units.filter(u => u.side === 'e').some(u => '#t'.includes((B.def.map[u.y] || '')[u.x])); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b10_c5_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Ammanas|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Hedge|Cuttle|Bottle|Ruthan|Gudd|Quick Ben|Kalam|Deadsmell|Masan|Gilani|Keneb|Blistig|Tavore|Paran|Krughava|Tanakalian|Stormy|Gesler|Abrastal|Brys|Errant|Forkrul|Crippled God|Nefarias|Icarias|Bavedict|Banaschar|Tarr\b|Shortnose|Imass|Che'Malle|Perish|Grey Helm|Snake|Badalle|Saddic|Rutt\b|Held\b|Pores|Bugg|Watered|\bPures?\b|\bVoice\b|blood|urine|\bpiss|\bknife\b|dagger|\bweeks?\b|\bmonths?\b|\btenday\b|\bdays? (?:ago|later)\b|\b(?:[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even|[Ee]ight|[Nn]ine|[Tt]en)\s+(?:nights|days)\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-word: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    else if ((n.txt.replace(/"[^"]*"/g, '').match(/Bonehunters/g) || []).length) errs.push(k + ': the narrator says Bonehunters');
    (n.ch || []).forEach(c => { const t = tt(c); if (/undefined|NaN/.test(t) || never.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* the children: one sentence, from far off, in one node only, never on 'south' (rule 101) */
  const kids = () => nodes.filter(k => { try { return /\bchildren\b/.test(DLG[k]().txt); } catch (e) { return false; } });
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase, key and road */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), wit = new Set(), witCost = new Set();
    const keep = JSON.stringify(S.f);
    const FL = ['b10_c5_orders', 'b10_c5_gave', 'b10_c5_stragDone', 'b10_c5_halt', 'b10_c5_drank', 'b10_c5_ridersDone', 'b10_c5_lent'];
    [1, 2, 3, 4].forEach(ph => ['give', 'hold', null].forEach(k => ['adjunct', 'south'].forEach(rd => [...Array(1 << FL.length).keys()].forEach(fl => { S.f.b10_c5_ph = ph; S.f.b10_c5_key = k; S.f.b10_tRoad = rd;
      FL.forEach((f, i) => { S.f[f] = fl & (1 << i) ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); if (c.witness) wit.add(tt(c)); return; } checks.add(id + ':' + tt(c)); if (c.witness) wit.add(tt(c)); if (c.near && /b10Witness/.test(String(c.near.fx))) witCost.add(tt(c)); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); }))));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, wit:wit.size, witCost:witCost.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  /* a --from=5 style start: Chapters One to Four's keys set (haul in Ch 3), Pruss walking, the Third at level 26 */
  const fromFive = (extra) => { setBook('tcg'); S = newStateTCG('Fresh', 'Brann'); S.chapters = {1:'names', 2:'watch', 3:'haul', 4:'horses'}; S.f.b10_c1_key = 'names'; S.f.b10_c1_names = 1; S.f.b10_c2_key = 'watch'; S.f.b10_c2_watched = 1;
    S.f.b10_c3_key = 'haul'; S.f.b10_c3_hauled = 1; S.f.b10_c4_key = 'horses'; S.f.b10_c4_horses = 1;
    S.f.b10_prussDone = 1; if (!S.squad.includes('pruss')) S.squad.push('pruss'); S.loy.pruss = 0; S.gear.pruss ??= {}; S.picks.pruss ??= []; S.f.b10_tirrenDone = 1;
    S.lvl = 26; S.xp = LEVELS[25]; S.picksDue = []; S.th.l.picksDue = []; if (extra) extra(); save(); startChapter(5); clearModal(); };
  try {
  /* ================= a --from=5 style start ('adjunct') ================= */
  fromFive();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, wit0:b10Wit(), wear:S.f.b10_wear5, road:b10TRoad(), renderErr:renderAll(), title:CHAPTERS[5].title, nodes:nodes.length, areas:CHAPTERS[5].areas.length, fights:Object.keys(CHAPTERS[5].battles).length,
    items:Object.keys(CHAPTERS[5].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[5].gear).length,
    blade:ITEMS.b10_c5_kolansiiblade && ITEMS.b10_c5_kolansiiblade.slot === 'weapon' && ITEMS.b10_c5_kolansiiblade.role === 'blade' && ITEMS.b10_c5_kolansiiblade.dmg[1] === 10,
    skin:ITEMS.b10_c5_emptyskin && ITEMS.b10_c5_emptyskin.slot === 'trinket', stone:ITEMS.b10_c5_lakestone && ITEMS.b10_c5_lakestone.slot === 'trinket',
    ownArt:['b10_c5_kolansiiblade', 'b10_c5_emptyskin', 'b10_c5_lakestone'].every(k => /b105/.test(ART['item/' + k])),
    ground:['b10_c5_ground', 'b10_c5_wet', 'b10_c5_scrub'].every(k => typeof TILEX[k] === 'function' && /b105a/.test(String(TILEX[k]))),
    scenes:['b10_c5_dawn', 'b10_lake', 'b10_kolanse'].every(k => typeof SCENEX[k] === 'function' && SCENES[k] && /b105/.test(String(SCENEX[k]))),
    introScene:CHAPTERS[5].intro.scene, fireRoster:(ROSTER_FIRES.tcg[5] || []).includes('b10_c5_fire'), thirst:thirsty().length, noF:['b10_c5_lieup', 'b10_c5_march', 'b10_c5_lake'].every(a => !AREAS[a].map.join('').includes('F')), audit:audit()};
  /* the start: the last lie-up at first light, the reading among the first halt's choices */
  talk('b10_c5_start'); out.f.ph = S.f.b10_c5_ph; out.f.deck = has('b10_c5_start', /Sit with Marrow/); out.f.dawn = DLG.b10_c5_start().scene === 'b10_c5_dawn' && /First light/.test(DLG.b10_c5_start().txt);
  talk('b10_c5_read'); const rd = DLG.b10_c5_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b10_c5_drawn, reader:S.f.b10_c5_reader, inPool:B10POOL[5].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B10READ[5].back, cardNode:cardNodeName(), cardSp:DLG.b10_c5_card().sp, cardBack:DLG.b10_c5_card().ch[0].go,
    again:!has('b10_c5_fire', /Sit with/), set:/First light at the last lie-up/.test(rd.txt), where:/glass at first light/.test(DLG.b10_c5_card().txt), scene:rd.scene === 'b10_c5_dawn'};
  /* Thallo: the barrels dry; the last water is the hauled wagon's last barrel */
  out.th = {npc:npc('b10_c5_lieup', 'thallo').show() && !npc('b10_c5_lieup', 'master').show(), strag0:!npc('b10_c5_lieup', 'strag').show(), key0:/Thallo is waiting|Thallo/.test(DLG.b10_c5_last().txt) && !DLG.b10_c5_last().ch.some(c => /Take it across/.test(tt(c)))};
  talk('b10_c5_thallo'); out.th.orders = S.f.b10_c5_orders; out.th.notNow = has('b10_c5_thallo', /Not now/); out.th.notEating = /not eating/.test(DLG.b10_c5_thallo().txt); out.th.barrel = /Last barrel on the wagon you hauled/.test(DLG.b10_c5_thallo().txt);
  /* the trick: The Last Mouthful, the old marine teaching (a Witness check) */
  talk('b10_c5_oldmarine'); const dc = vis('b10_c5_oldmarine').find(c => c.trick);
  out.t = {dc:dc && dc.check[1], stat:dc && dc.check[0], wit:!!(dc && dc.witness), noNear:dc && !dc.near, back:has('b10_c5_oldmarine', /Back to the lie-up/), deck:has('b10_c5_oldmarine', /Sit with/) === false, mirrel:(edgesFor(dc, 'mirrel').find(e => /thirst/.test(e[0])) || [])[1] || 0, sgt:(edgesFor(dc, 'sgt').find(e => /Fourteenth/.test(e[0])) || [])[1] || 0, witEdge:edgesFor(dc, 'sgt').some(e => e[0] === 'Witness') === false};
  made('b10_c5_oldmarine', /hold the last mouthful/, 'mirrel');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b10_c5_mouthful && S.tricks.b10_c5_mouthful.who, ok:S.f.b10_c5_mouthfulOk, free:!!AB.t_b10_c5_mouthful.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b10_c5_mouthful.fx), again:!has('b10_c5_oldmarine', /hold the last mouthful/)});
  /* the rise: the chapter's one Witness "yes, but" */
  talk('b10_c5_look'); out.y = {back:has('b10_c5_look', /Back to the lie-up/)};
  { const sn = JSON.stringify(S), w0 = b10Wit(); near('b10_c5_look', /Look back/, 'tebbet'); out.y.near = b10Wit() - w0; out.y.why = (whys[whys.length - 1] || [])[1]; restore(sn, 'b10_c5_lieup'); }
  made('b10_c5_look', /Look back/, 'haddat'); out.y.seen = S.f.b10_c5_look === 1 && /walked it/.test(DLG.b10_c5_look_ok().txt);
  /* the tailboard: the one rumour */
  talk('b10_c5_tail'); out.u = {rumour:S.f.b10_c5_rumour === 1 && /a Fist tried to take the water/.test(DLG.b10_c5_tail().txt)};
  out.u.once = nodes.filter(k => { try { return /Fist tried/.test(DLG[k]().txt); } catch (e) { return false; } }).length === 1;
  /* the circle before the key: no dusk yet */
  talk('b10_c5_fire'); const f1 = DLG.b10_c5_fire(); out.fire1 = {html:/Witness/.test(f1.html || ''), talk:has('b10_c5_fire', /Talk with the squad/), rest:has('b10_c5_fire', /Let the squad rest/), duskShut:!has('b10_c5_fire', /Dusk/), notNow:/Not now/.test(tt(f1.ch[f1.ch.length - 1])), noFire:/no fire|circle/.test(f1.txt)};
  out.fire1.lines = DLG.b10_c5_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {haddat:4}; take('b10_c5_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b10_c5_rest1 === 1;
  /* the next cloak: the stragglers (optional; declinable), a "yes, but" on the guile approach */
  talk('b10_c5_next'); out.s = {notNow:has('b10_c5_next', /Not now/), leave:has('b10_c5_next', /Not our water/), straight:has('b10_c5_next', /Between them and that skin/), npc:npc('b10_c5_lieup', 'strag').show()};
  { const sn = JSON.stringify(S); near('b10_c5_next', /along the cloaks/, 'tangle'); out.s.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c5_lieup'); }
  { const sn = JSON.stringify(S); take('b10_c5_next', /Not our water/); out.s.left = S.f.b10_c5_stragLeft === 1 && !npc('b10_c5_lieup', 'strag').show() && /turn round and go back/.test(DLG.b10_c5_strag_left().txt); restore(sn, 'b10_c5_lieup'); }
  startBattle('b10_c5_stragglers', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'mirrel'); out.t.offered = trickOk(u, AB.t_b10_c5_mouthful); AB.t_b10_c5_mouthful.run(u, u.x, u.y); out.t.steady = !!u.steady && !!AB.t_b10_c5_mouthful.self; }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b10_c5_lieup');
  out.s.fight = await force('b10_c5_stragglers'); out.s.done = S.f.b10_c5_stragDone; out.s.gone = !npc('b10_c5_lieup', 'strag').show();
  out.s.afterText = /stay down/.test(DLG.b10_c5_strag_after().txt) && /None of them is killed/.test(DLG.b10_c5_strag_after().txt) && !/\bdead\b|\bkill/.test(DLG.b10_c5_strag_after().txt.replace('None of them is killed', ''));
  /* the key at the last water */
  talk('b10_c5_last'); const kn = DLG.b10_c5_last();
  out.k = {give:has('b10_c5_last', /Take it across/), hold:has('b10_c5_last', /We keep it/), notYet:has('b10_c5_last', /Not yet/), html:/Witness/.test(kn.html || ''), pruss:/Pruss/.test(kn.txt), barrel:/last barrel on the wagon the Third hauled/.test(kn.txt), youngest:/youngest/.test(kn.txt)};
  const snapK = JSON.stringify(S), witK = b10Wit(), loyK = {haddat:S.loy.haddat, mirrel:S.loy.mirrel, pruss:S.loy.pruss};
  /* ================= key: give ================= */
  take('b10_c5_last', /Take it across/); out.a = {key:S.f.b10_c5_key, wit:b10Wit() - witK, why:(whys[whys.length - 1] || [])[1], haddat:S.loy.haddat - loyK.haddat, mirrel:S.loy.mirrel - loyK.mirrel, node:S.node, notNow:has('b10_c5_key_give', /Not now/), duskShut:!has('b10_c5_fire', /Dusk/)};
  { const gc = vis('b10_c5_key_give').find(c => c.check); out.a.giveWit = !!(gc && gc.witness); const sn = JSON.stringify(S); near('b10_c5_key_give', /a mouthful at a time/, 'haddat'); out.a.near = !!(S.rattled || {}).haddat; restore(sn, 'b10_c5_lieup'); }
  out.a.lastBack = DLG.b10_c5_last().sp === 'The next cloak';
  const thPick = b10ThirstPick(); made('b10_c5_key_give', /a mouthful at a time/, 'mirrel');
  out.a.gave = S.f.b10_c5_gave; out.a.thirst = S.f.b10_c5_thirst; out.a.pick = thPick; out.a.thirsty = thirsty(); out.a.thirstText = new RegExp(NAME(thPick)).test(DLG.b10_c5_give_ok().txt);
  out.a.empty = /dry, with a dipper/.test(DLG.b10_c5_last().txt);
  /* dusk: the night march; the children, once, far off */
  talk('b10_c5_fire'); out.n = {dusk:has('b10_c5_fire', /Dusk\. Up, and on/), duskNot:has('b10_c5_fire', /Not now/)}; take('b10_c5_fire', /Dusk\. Up, and on/);
  out.n = Object.assign(out.n, {area:S.area, ph:S.f.b10_c5_ph, arrive:S.node === 'b10_c5_dusk', dark:!!AREAS.b10_c5_march.dark, kids:kids(), kidsOne:(DLG.b10_c5_dusk().txt.match(/children[^.]*\./g) || []).length, east0:!has('b10_c5_east', /grey light/)});
  /* the halt in the night: the fire with no fire; the beat */
  talk('b10_c5_fire'); const h = DLG.b10_c5_fire(); out.b = {halt:S.f.b10_c5_halt === 1, html:/Witness/.test(h.html || ''), offered:has('b10_c5_fire', /What are we marching for/), noFire:/fire with no fire/.test(h.txt), noRest:!has('b10_c5_fire', /rest/)};
  take('b10_c5_fire', /What are we marching for/); out.b.n = vis('b10_c5_beat').length; out.b.notNow = has('b10_c5_beat', /Not now/); out.b.bhtml = /Witness/.test(DLG.b10_c5_beat().html || '');
  { const sn = JSON.stringify(S); take('b10_c5_beat', /Not now/); out.b.nothing = !b10BeatOf(5); restore(sn, 'b10_c5_march'); }
  const wB = b10Wit(); take('b10_c5_beat', /Our own witness/); out.b.rec = b10BeatOf(5); out.b.wit = b10Wit() - wB; out.b.gone = !has('b10_c5_fire', /What are we marching for/); out.b.flag = S.f.b10_c5_beat;
  /* the rearguard: the one line of the Letherii (Ch 4's horses) */
  talk('b10_c5_rear'); out.u.rear = S.f.b10_c5_rear === 1 && /walked their horses/.test(DLG.b10_c5_rear().txt);
  talk('b10_c5_thallo2'); out.u.th2 = S.f.b10_c5_thallo2 === 1 && !/Adjunct/.test(DLG.b10_c5_thallo2().txt);
  /* grey light: the ground goes wet (the fixed +1, once) */
  talk('b10_c5_east'); out.w = {on:has('b10_c5_east', /grey light/), notNow:has('b10_c5_east', /Not now/)};
  const wL = b10Wit(); take('b10_c5_east', /grey light/); out.w = Object.assign(out.w, {area:S.area, ph:S.f.b10_c5_ph, node:S.node, wit:b10Wit() - wL, why:(whys[whys.length - 1] || [])[1], skin:S.kit.includes('b10_c5_emptyskin'), scene:DLG.b10_c5_wet().scene === 'b10_lake', words:/wet/.test(DLG.b10_c5_wet().txt) && /water/.test(DLG.b10_c5_wet().txt)});
  talk('b10_c5_wet'); out.w.once = b10Wit() - wL; out.w.fireNo = /no circle at the water/.test(DLG.b10_c5_fire().txt);
  out.w.eastShut = !has('b10_c5_lakeeast', /On, to the far edge/);
  { const sn = JSON.stringify(S); near('b10_c5_water', /Through the press/, 'tangle'); out.w.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c5_lake'); }
  made('b10_c5_water', /Through the press/, 'pruss'); out.w.drank = S.f.b10_c5_drank; out.w.stone = S.kit.includes('b10_c5_lakestone');
  talk('b10_c5_thallo3'); out.w.th3 = /eating/.test(DLG.b10_c5_thallo3().txt) && !/gift/.test(DLG.b10_c5_thallo3().txt);
  talk('b10_c5_oldmarine'); out.w.old = /cup full/.test(DLG.b10_c5_oldmarine().txt);
  out.w.eastNot = has('b10_c5_lakeeast', /Not now/); take('b10_c5_lakeeast', /On, to the far edge/);
  /* the glass's far edge: the picket, the outriders (main), Sedge */
  out.e = {area:S.area, ph:S.f.b10_c5_ph, node:S.node, scene:DLG.b10_c5_scrubarrive().scene === 'b10_kolanse', riders0:!npc('b10_c5_scrub', 'riders').show(), fireOk:/A real one/.test(DLG.b10_c5_fire().txt)};
  take('b10_c5_scrubarrive', /Thallo/); out.e.picket = S.f.b10_c5_picket === 1 && /Assail think we died/.test(DLG.b10_c5_thallo4().txt) && has('b10_c5_thallo4', /Not now/); out.e.riders = npc('b10_c5_scrub', 'riders').show();
  talk('b10_c5_riders'); out.e.notNow = has('b10_c5_riders', /Not now/);
  { const sn = JSON.stringify(S); near('b10_c5_riders', /Down in the thorn/, 'tangle'); out.e.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b10_c5_scrub'); }
  const xp0 = S.xp; out.e.fight = await force('b10_c5_outriders'); out.e.done = S.f.b10_c5_ridersDone; out.e.blade = S.kit.includes('b10_c5_kolansiiblade'); out.e.lvl = S.lvl; out.e.xp = S.xp - xp0;
  out.e.noneBack = /None of them rides back/.test(DLG.b10_c5_riders_after().txt); out.e.sedgeNpc = npc('b10_c5_scrub', 'sedge').show() && !npc('b10_c5_scrub', 'finadd').show();
  out.e.onwardShut = !has('b10_c5_fire', /On\. Up out of the scrub/) && !has('b10_c5_edge', /On\. Into Kolanse/);
  talk('b10_c5_sedge'); out.e.lent = S.f.b10_c5_lent; out.e.sedgeText = /So the Third's lent to my company/.test(DLG.b10_c5_sedge().txt) && /young one's walking/.test(DLG.b10_c5_sedge().txt); out.e.sedgeNot = has('b10_c5_sedge', /Not now/);
  out.e.lentOnce = nodes.filter(k => { try { return /lent to my company/.test(DLG[k]().txt); } catch (e) { return false; } }).length === 1;
  /* the far edge's fire: a rest clears the thirst; a line each; the way on */
  talk('b10_c5_fire'); out.e.lines2 = DLG.b10_c5_fire_talk().txt.split('\n\n').length; out.e.here = S.squad.filter(id => id !== 'sgt').length;
  take('b10_c5_fire', /Let the squad rest/); out.e.thirstCleared = thirsty().length === 0; out.e.onward = has('b10_c5_fire', /On\. Up out of the scrub/) && has('b10_c5_fire', /Not now/);
  talk('b10_c5_edge'); out.e.edge = has('b10_c5_edge', /On\. Into Kolanse/) && has('b10_c5_edge', /Not now/);
  take('b10_c5_fire', /On\. Up out of the scrub/); out.e.notYet = has('b10_c5_onward', /Not yet/); out.e.sedgeEnd = /Captain Sedge's company/.test(DLG.b10_c5_onward().txt);
  const witA = b10Wit(); take('b10_c5_onward', /East, into Kolanse/); await wait(60);
  out.a.end = {view, ch:S.chapters[5], wit:witA, extras:CHAPTERS[5].extras().length, journal:CHAPTERS[5].journal().length, endText:(CHEND[5] || {}).give && CHEND[5].give[0], endScene:CHAPTERS[5].endScene};
  /* ================= key: hold, from the same moment ================= */
  restore(snapK, 'b10_c5_lieup'); S.chapter = 5;
  take('b10_c5_last', /We keep it/); out.q = {key:S.f.b10_c5_key, held:S.f.b10_c5_held, wit:b10Wit() - witK, why:(whys[whys.length - 1] || [])[1], haddat:S.loy.haddat - loyK.haddat, mirrel:S.loy.mirrel - loyK.mirrel, thirst:thirsty().length === 0 && !S.f.b10_c5_thirst, last:/is the Third's/.test(DLG.b10_c5_last().txt)};
  out.q.dusk = has('b10_c5_fire', /Dusk\. Up, and on/); take('b10_c5_fire', /Dusk\. Up, and on/); talk('b10_c5_fire'); out.q.round = /goes round, the last of it/.test(DLG.b10_c5_fire().txt);
  const wQ = b10Wit(); take('b10_c5_fire', /What are we marching for/); take('b10_c5_beat', /Nobody will ever know/); out.q.beat = b10BeatOf(5); out.q.beatWit = b10Wit() - wQ;
  take('b10_c5_east', /grey light/); made('b10_c5_water', /Through the press/, 'brask'); take('b10_c5_lakeeast', /On, to the far edge/); take('b10_c5_scrubarrive', /Thallo/);
  await force('b10_c5_outriders'); talk('b10_c5_sedge'); out.q.sedge = !/young one's walking/.test(DLG.b10_c5_sedge().txt) && /That was my file/.test(DLG.b10_c5_sedge().txt);
  take('b10_c5_fire', /On\. Up out of the scrub/); const witQ = b10Wit(); take('b10_c5_onward', /East, into Kolanse/); await wait(60);
  out.q.end = {view, ch:S.chapters[5], wit:witQ, endText:CHEND[5].hold[0], extras:CHAPTERS[5].extras().some(x => /kept its last water/.test(x))};
  /* ================= give with the wells' water from Chapter One: the thirst waived ================= */
  restore(snapK, 'b10_c5_lieup'); S.chapter = 5; S.f.b10_c1_key = 'water'; S.f.b10_c1_water = 1; delete S.f.b10_c1_names;
  take('b10_c5_last', /Take it across/); made('b10_c5_key_give', /a mouthful at a time/, 'mirrel'); out.v = {thirst:S.f.b10_c5_thirst, none:thirsty().length === 0, text:/sappers' wells/.test(DLG.b10_c5_give_ok().txt)};
  /* ================= the 'south' road ================= */
  fromFive(() => { S.f.b10_tRoad = 'south'; S.f.b10_c4_key = 'pace'; delete S.f.b10_c4_horses; S.f.b10_c4_pace = 1; });
  out.x = {renderErr:renderAll(), kids:kids().length === 0, introScene:CHAPTERS[5].intro.scene, startScene:DLG.b10_c5_start().scene, master:npc('b10_c5_lieup', 'master').show() && !npc('b10_c5_lieup', 'thallo').show(), audit:audit(), greyKnights:/bending, slowly, away east/.test(DLG.b10_c5_start().txt)};
  talk('b10_c5_start'); talk('b10_c5_thallo'); out.x.cut = /Ration's cut/.test(DLG.b10_c5_thallo().txt) && /The one you dragged/.test(DLG.b10_c5_thallo().txt);
  talk('b10_c5_tail'); out.x.ships = /King's ships are at the coast/.test(DLG.b10_c5_tail().txt); out.x.noFist = !nodes.some(k => { try { return /Fist tried/.test(DLG[k]().txt); } catch (e) { return false; } });
  out.x.carters = /carter's boy|their boy/.test(DLG.b10_c5_last().txt) && /Bolkando/.test(DLG.b10_c5_next().txt);
  take('b10_c5_last', /Take it across/); made('b10_c5_key_give', /a mouthful at a time/, 'mirrel'); out.x.foreman = /carters' foreman/.test(DLG.b10_c5_give_ok().txt);
  take('b10_c5_fire', /Dusk\. Up, and on/); out.x.night = DLG.b10_c5_dusk().scene === 'b10_south_night' && !/children/.test(DLG.b10_c5_dusk().txt);
  talk('b10_c5_rear'); out.x.rear = /kept pace with the Bolkando/.test(DLG.b10_c5_rear().txt);
  talk('b10_c5_fire'); take('b10_c5_fire', /What are we marching for/); take('b10_c5_beat', /Our own witness/);
  const wS = b10Wit(); take('b10_c5_east', /grey light/); out.x.well = b10Wit() - wS === 1 && (whys[whys.length - 1] || [])[1] === 'the first well in Kolanse' && DLG.b10_c5_wet().scene === 'b10_kolanse' && /first well in Kolanse/.test(DLG.b10_c5_wet().txt) && !/lake/.test(DLG.b10_c5_wet().txt);
  made('b10_c5_water', /Through the press/, 'pruss'); take('b10_c5_lakeeast', /On, to the far edge/); take('b10_c5_scrubarrive', /wagon-master/);
  out.x.farmland = /edge of Kolanse's farmland/.test(DLG.b10_c5_scrubarrive().txt); out.x.fight = await force('b10_c5_outriders');
  out.x.finadd = npc('b10_c5_scrub', 'finadd').show() && !npc('b10_c5_scrub', 'sedge').show(); talk('b10_c5_sedge'); out.x.lent = S.f.b10_c5_lent; out.x.noSedge = !/Sedge/.test(DLG.b10_c5_sedge().txt);
  take('b10_c5_fire', /On\. Up out of the scrub/); out.x.endCap = /farmland/.test(CHAPTERS[5].endCap()); take('b10_c5_onward', /On, toward the coast/); await wait(60); out.x.end = {view, ch:S.chapters[5]};
  /* ================= a transfer's Third (Marrow dead; Sathi, Mehet and Ottar walking; Pruss waiting; the wagon cut in Ch 3) ================= */
  setBook('tcg'); S = newStateTCG('Syn', 'Brann'); S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'mehet', 'ottar']; delete S.dead.sathi; S.dead.marrow = {ch:7, where:'the rearguard', from:'dod'};
  ['sathi', 'mehet', 'ottar'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.f.b10_prussDone = 2; S.camp = [...(S.camp || []), 'pruss']; S.loy.pruss = 0; S.gear.pruss ??= {}; S.picks.pruss ??= [];
  S.chapters = {1:'water', 2:'count', 3:'cut', 4:'pace'}; S.f.b10_c1_key = 'water'; S.f.b10_c1_water = 1; S.f.b10_c2_key = 'count'; S.f.b10_c2_counted = 1; S.f.b10_c3_key = 'cut'; S.f.b10_c4_key = 'pace'; S.f.b10_c4_pace = 1;
  S.lvl = 26; S.xp = LEVELS[25]; S.picksDue = []; save(); startChapter(5); clearModal();
  S.f.b10_c5_orders = 1;
  out.z = {renderErr:renderAll(), reader:b10Rd().id, lines:DLG.b10_c5_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b10_c5_fire_talk().txt), noMarrow:!/Marrow/.test(DLG.b10_c5_fire_talk().txt), noPruss:!/Pruss/.test(DLG.b10_c5_fire_talk().txt) && !/Pruss/.test(DLG.b10_c5_start().txt) && !/Pruss/.test(DLG.b10_c5_last().txt),
    skin:/The Third's last skin/.test(DLG.b10_c5_last().txt), rumour:/kept up/.test(DLG.b10_c5_rear().txt), audit:audit()};
  S.f.b10_c5_ph = 4; out.z.lines2 = DLG.b10_c5_fire_talk().txt.split('\n\n').length;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, th = r.th || {}, t = r.t || {}, y = r.y || {}, u = r.u || {}, f1 = r.fire1 || {}, s = r.s || {}, k = r.k || {}, a = r.a || {}, n = r.n || {}, b = r.b || {}, w = r.w || {}, e = r.e || {}, q = r.q || {}, v = r.v || {}, x = r.x || {}, z = r.z || {};
if (f.area) {
  f.area === 'b10_c5_lieup' && f.ch === 5 && f.thread === 't' && f.lvl0 === 26 && f.wit0 === 4 && f.wear === 1 && f.road === 'adjunct' && !f.renderErr.length && f.title === 'The Last Water' && f.areas === 4 && f.fights === 2 && f.items && f.itemN === 3 && f.blade && f.skin && f.stone && f.ownArt && f.ground && f.scenes && f.introScene === 'b10_glass_night' && f.fireRoster && f.thirst === 0 && f.noF
    ? ok(`a --from=5 style start opens Chapter Five at the last lie-up: the Third at level 26, Witness 5 less the wear (4), on 'adjunct'; every b10_c5 node renders, no never-word, no "!" in narration, no rounds or turns, no narrator's "Bonehunters" (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with their own art and roles; three grounds and three backdrops of its own; no burning 'F' in the glass`) : no('fresh ' + JSON.stringify(f).slice(0, 1600));
  const au = f.audit || {}; au.checks >= 6 && au.tricks === 1 && au.wit === 2 && au.witCost >= 1 && au.witCost <= 2 && !au.noNear.length && au.onwards >= 5 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); two Witness checks (the giving and the trick); one "yes, but" that costs Witness (worded by road); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.dawn ? ok('the first halt: the last lie-up at first light (its own backdrop), the reading offered') : no('start ' + JSON.stringify({ph:f.ph, deck:f.deck, dawn:f.dawn}));
}
rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.back === 'b10_c5_fire' && rd.cardNode === 'b10_c5_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b10_c5_fire' && rd.again && rd.set && rd.where && rd.scene ? ok('the reading: Marrow draws from B10POOL[5] on the glass at first light; the card node is the visions pass\'s hook (b10_c5_card); back to the circle; offered once') : no('reading ' + JSON.stringify(rd));
th.npc && th.strag0 && th.key0 && th.orders === 1 && th.notNow && th.notEating && th.barrel ? ok('Thallo (not eating): the barrels dry; the last water is the last barrel on the wagon the Third hauled (b10_c3_hauled); no key and no stragglers before his word') : no('thallo ' + JSON.stringify(th));
t.dc === 21 && t.stat === 'wits' && t.wit && t.noNear && t.back && t.mirrel === 2 && t.sgt === 1 && t.who === 'mirrel' && t.ok === 1 && t.free && t.words && t.again && t.offered && t.steady ? ok('the trick: The Last Mouthful, a ✦ wits 21 Witness check with the old marine (Mirrel +2, the Fourteenth\'s desert +1); free; in a fight the bearer goes still (Squint\'s Breath)') : no('trick ' + JSON.stringify(t));
y.back && y.near === -1 && y.why === 'no way back' && y.seen ? ok('the rise west: the chapter\'s one "yes, but" that costs Witness (−1, \'no way back\')') : no('rise ' + JSON.stringify(y));
u.rumour && u.once ? ok('the empty tailboard: "a Fist tried to take the water", once, as rumour') : no('rumour ' + JSON.stringify(u));
f1.html && f1.talk && f1.rest && f1.duskShut && f1.notNow && f1.noFire && f1.lines === f1.here && f1.rested ? ok(`the circle at the lie-up (no fire): Witness shown, a rest, the talk (a line each, ${f1.lines}), no dusk before the key, Not now`) : no('fire1 ' + JSON.stringify(f1));
s.notNow && s.leave && s.straight && s.npc && s.near && s.left && s.fight && s.fight.started && s.fight.foes === 3 && !s.fight.onCover && s.fight.after === 'b10_c5_strag_after' && s.done === 1 && s.gone && s.afterText
  ? ok('the stragglers at the next cloak (optional: "Not our water" declines, and their own sergeant sees them off): a "yes, but" on the cloaks; three foes, none on cover; fought down, never killed in words') : no('stragglers ' + JSON.stringify(s));
k.give && k.hold && k.notYet && k.html && k.pruss && k.barrel && k.youngest ? ok('the key at the last water: the hauled wagon\'s last barrel, the next cloak\'s youngest failing; give, hold, Not yet; Witness shown; Pruss') : no('key ' + JSON.stringify(k));
a.key === 'give' && a.wit === 2 && a.why === 'gave the last of it' && a.haddat === 1 && a.mirrel === 1 && a.node === 'b10_c5_key_give' && a.notNow && a.duskShut && a.giveWit && a.near && a.lastBack && a.gave === 'kept' && a.thirst === a.pick && a.thirsty.includes(a.pick) && a.thirstText && a.empty
  ? ok(`key give: Witness +2 ('gave the last of it'), Haddat and Mirrel +1; carried across (a Witness check; a "yes, but" rattles); the thirst to ${a.pick}; the barrel dry after`) : no('give ' + JSON.stringify(a).slice(0, 900));
n.dusk && n.duskNot && n.area === 'b10_c5_march' && n.ph === 2 && n.arrive && n.dark && n.kids && n.kids.length === 1 && n.kids[0] === 'b10_c5_dusk' && n.kidsOne === 1 && n.east0 ? ok('dusk: the night march; the children, one sentence, far off, in one node only') : no('dusk ' + JSON.stringify(n));
b.halt && b.html && b.offered && b.noFire && b.noRest && b.n === 3 && b.notNow && b.bhtml && b.nothing && b.rec === 'kept' && b.wit === 1 && b.gone && b.flag === 'own' ? ok('the halt in the night: the fire with no fire; the beat ("What are we marching for?": our own witness / nobody will ever know, and Not now); kept +1') : no('beat ' + JSON.stringify(b));
u.rear && u.th2 ? ok('the rearguard: the Letherii\'s Ch 4 key as rumour (horses); Thallo in the dark') : no('rear ' + JSON.stringify(u));
w.on && w.notNow && w.area === 'b10_c5_lake' && w.ph === 3 && w.node === 'b10_c5_wet' && w.wit === 1 && w.why === 'water under the column' && w.once === 1 && w.skin && w.scene && w.words && w.fireNo && w.eastShut && w.near && w.drank === 'first' && w.stone && w.th3 && w.old && w.eastNot
  ? ok('grey light: the ground goes wet under the column (Witness +1, \'water under the column\', once; the empty skin); the press at the water (a "yes, but"; the stone); Thallo eating') : no('lake ' + JSON.stringify(w));
e.area === 'b10_c5_scrub' && e.ph === 4 && e.node === 'b10_c5_scrubarrive' && e.scene && e.riders0 && e.fireOk && e.picket && e.riders && e.notNow && e.near && e.fight && e.fight.started && e.fight.foes === 4 && e.fight.stage2 && e.fight.inStage2 && !e.fight.onCover && !e.fight.onCover2 && e.done === 1 && e.blade && e.lvl === 27 && e.noneBack && e.sedgeNpc && e.onwardShut && e.lent === 'sedge' && e.sedgeText && e.sedgeNot && e.lentOnce && e.lines2 === e.here && e.thirstCleared && e.onward && e.edge && e.notYet && e.sedgeEnd
  ? ok(`the far edge: the picket ("the Assail think we died in the glass"); the outriders, both grounds, no foe on cover, none rides back; the blade; level ${e.lvl} (+${e.xp} xp); Sedge asks for file-closers and the Third is lent to her company, said once; a real fire, the thirst cleared, a line each`) : no('edge ' + JSON.stringify(e).slice(0, 1200));
a.end && a.end.view === 'end' && a.end.ch === 'give' && a.end.endText === 'Gave the last of it' && a.end.wit === 8 && a.end.extras >= 5 && a.end.journal >= 5 && a.end.endScene === 'b10_kolanse' ? ok(`the end on give: Witness ${a.end.wit} (4, +2, +1 the beat, +1 the lake)`) : no('give end ' + JSON.stringify(a.end));
q.key === 'hold' && q.held === 1 && q.wit === -1 && q.why === 'held it back' && q.haddat === -1 && q.mirrel === 0 && q.thirst && q.last && q.dusk && q.round && q.beat === 'doubt' && q.beatWit === -1 && q.sedge && q.end && q.end.view === 'end' && q.end.ch === 'hold' && q.end.endText === 'Held it back' && q.end.extras && q.end.wit === 3
  ? ok(`key hold, from the same moment: Witness −1 ('held it back'), Haddat −1; no thirst; the last of it drunk at the halt; the beat doubted −1; Sedge says less; the end on hold, Witness ${q.end.wit}`) : no('hold ' + JSON.stringify(q).slice(0, 1000));
v.thirst === 'waived' && v.none && v.text ? ok('give after Chapter One\'s wells (b10_c1_water): the thirst waived, the uncounted skin from the wells goes round') : no('waived ' + JSON.stringify(v));
x.renderErr && !x.renderErr.length && x.kids && x.introScene === 'b10_south_night' && x.startScene === 'b10_south' && x.master && x.audit && !x.audit.noNear.length && !x.audit.noStay.length && x.greyKnights && x.cut && x.ships && x.noFist && x.carters && x.foreman && x.night && x.rear && x.well && x.farmland && x.fight && x.fight.after === 'b10_c5_riders_after' && x.finadd && x.lent === 'twelfth' && x.noSedge && x.endCap && x.end && x.end.view === 'end' && x.end.ch === 'give'
  ? ok('the \'south\' road: still by night; the wagon-master for Thallo; the ration cut; the grey knights\' dust bending away east; the King\'s ships as rumour; no children, no lake: the first well in Kolanse (+1); the outriders at the farmland\'s edge; the Twelfth asks for the Third; the Letherii\'s pace as rumour') : no('south ' + JSON.stringify(x).slice(0, 1400));
z.renderErr && !z.renderErr.length && z.reader === 'oldninth' && z.lines === z.here && z.lines2 === z.here && z.sathi && z.noMarrow && z.noPruss && z.skin && z.rumour && !z.audit.noNear.length && !z.audit.noStay.length
  ? ok(`a transfer's Third (Marrow dead; Sathi, Mehet and Ottar walking; Pruss at the baggage; the wagon cut in Ch 3): every node renders, the old marine reads, a line each (${z.lines}); the last water is the last skin; the Letherii's 'pace' as a guess`) : no('transfer ' + JSON.stringify(z).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b10ch5: FAIL (${bad.length})` : 'b10ch5: all ok'); process.exit(bad.length ? 1 : 0);
