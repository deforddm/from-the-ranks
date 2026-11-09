// Book Eight, Chapter 7 (The Toll, src/147_b8_ch7.js), and the book's finale: the halts, the three roads from the same moment at the fire,
// the reading on the shingle (and the card node the visions pass hooks onto), the fire (the Contract shown, a rest, a line each, the
// roster, Not now), every fight's start and a forced win (the Fourth's door, the dyers' row and its yard, the roofs with b8Roofs(7) on the
// contract tiles), the Contract (the morning's −2 when the Ch 6 knives went down, the roofs' own −1, the engine's +1 for a Guild fight),
// the trick behind a hard check (The Toll Count: the Lady's Pull's shape, chapter charges, free in battle, answering 'pull' in checks), the
// items (each with art), the callbacks (Tuft's cold that turns warm, Tufty, the Guardian's words with no name), Vasso joining from the step,
// the bell for every soldier, the hard limits (no never-names, no "!" in narration), "Not now" on every onward step and a "yes, but" on
// every check; and the finale on all three roads (the road page with the Contract, a fate page per squadmate, the fallen and the waiting,
// the sergeant, Where the books meet, the coda with the roll of the dead and the credit to Steven Erikson and Ian C. Esslemont), from a
// fresh start and from a --from=7 style save (Tuft dead before the book, Brisk fallen on the last night, the knives down, Sohra and Ellis
// walking, Edrem waiting, Vasso sent away).
// Usage: node tools/b8ch7_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(typeof x.t === 'function' ? x.t() : x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(typeof x.t === 'function' ? x.t() : x.t));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tth'); S.chapter = 7; startExplore(area); };
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.guild = !!B.def.guild; res.kinds = B.units.filter(u => u.side === 'e').map(u => u.key || u.kind).join(',');
    res.surprise = B.surprise || (B.surpriseRound ? 'p' : null) || (opt.surprise || null);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.title2 = B && B.def.title; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b8_c7_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  /* canon the Fourth cannot meet or the narrator may not print here (tth-canon §4, rules 70-83), and the never-use names */
  const NEVER = /Bridgeburner|Seba|Krute|Picker|Mallet|Bluepearl|Antsy|Blend\b|Murillio|Duiker|Kruppe|Kellanved|Dancer|Laseen|Ammanas|Burn's Sleep|\b1\d\d\d\b|Whiskeyjack|Iskar|Jarak|Dragnipur|Draconus|Nimander|Spawn|Mother Dark|Traveller|Cotillion|Shadowthrone|Kallor|Karsa|Samar|Spinnock|Endest|Korlat|Orfantal|Dassem|Raest|Chaur|Vorcan|Rallick|Cutter|Challice|Gorlas|Seerdomin|Salind|Gradithan|Spindle|Monkrat|Silanah|Itkovian|sacrifice|Bastion|Legate|Seguleh|Toc\b|Andii procession|Phoenix Inn's door|K'rul's Bar|\bRake\b/;
  const NEVER_CS = /\bSpite\b|\bEnvy\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else { const t = n.txt + ' ' + (n.html || '').replace(/<[^>]*>/g, ' ') + ' ' + (n.ch || []).map(c => typeof c.t === 'function' ? c.t() : c.t).join(' ');
      if (leak.test(t)) errs.push(k + ': leaks ' + t.match(leak)[0]); else if (NEVER.test(t) || NEVER_CS.test(t)) errs.push(k + ': a never-name: ' + (t.match(NEVER) || t.match(NEVER_CS))[0]);
      else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); } } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but"; every onward step has a "Not now" (or "Not yet") beside it; under every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), onwards = new Set();
    const keep = {ph:S.f.b8_c7_ph, k:S.f.b8_c7_key, t:S.f.b8_c7_tolled, l:S.f.b8_c7_lootDone, g:S.f.b8_c7_guardian, d:S.f.b8_c7_doorDone};
    [1, 2, 3].forEach(ph => ['daru', 'coral', 'east', null].forEach(k => [0, 1].forEach(done => { S.f.b8_c7_ph = ph; S.f.b8_c7_key = k; S.f.b8_c7_tolled = done; S.f.b8_c7_lootDone = done; S.f.b8_c7_guardian = done; S.f.b8_c7_doorDone = done;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    Object.assign(S.f, {b8_c7_ph:keep.ph, b8_c7_key:keep.k, b8_c7_tolled:keep.t, b8_c7_lootDone:keep.l, b8_c7_guardian:keep.g, b8_c7_doorDone:keep.d});
    return {checks:checks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  const lines = () => DLG.b8_c7_fire_talk().txt.split('\n\n').length, here = () => S.squad.filter(id => id !== 'sgt' && b8In(id)).length;
  const finale = async () => { const P = finPages(), pages = [];
    for (let i = 0; i < P.length; i++) { showFinale(i); await wait(20); const el = document.getElementById('fin'); const t = (el ? el.innerText : '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
      const body = t.replace(/The Malazan world[\s\S]*$/, '');
      pages.push({k:P[i].k, id:P[i].id || '', head:(document.querySelector('.fin-k') || {}).textContent || '', h1:(document.querySelector('.fin-title') || {}).textContent || '', h2:(document.querySelector('.fin-who h2') || {}).textContent || '', h3:(document.querySelector('.fin-h') || {}).textContent || '', len:t.length, next:!!document.getElementById('fNext'),
        leak:leak.test(t) || NEVER.test(body) || NEVER_CS.test(body), never:(body.match(NEVER) || body.match(NEVER_CS) || [''])[0], t}); }
    return pages; };
  try {
  /* ================= a fresh start, brought to Chapter Seven (earlier keys unset: the defaults; Vasso waiting on the step, Edrem on his road) ================= */
  setBook('tth'); S = newStateTTH('Fresh'); S.lvl = 19; S.xp = LEVELS[18]; S.chapters = {}; S.b8 = {con:5, hi:6, lo:2};
  S.f.b8_vassoDone = 2; S.f.b8_edremDone = 2; S.camp = ['vasso', 'edrem']; ['vasso', 'edrem'].forEach(k => { S.loy[k] = 0; S.gear[k] = {}; S.picks[k] = []; });
  S.picksDue = []; save(); startChapter(7); S.picksDue = [];
  out.f = {area:S.area, ch:S.chapter, renderErr:renderAll(), title:CHAPTERS[7].title, nodes:nodes.length, areas:CHAPTERS[7].areas.length, fights:Object.keys(CHAPTERS[7].battles).length,
    items:Object.keys(CHAPTERS[7].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && ART['item/' + k] !== ART['item/b8_c4_ashrag']), itemN:Object.keys(CHAPTERS[7].gear).length,
    bell:ITEMS.b8_c7_bell.slot === 'trinket' && ITEMS.b8_c7_bell.stat && ITEMS.b8_c7_bell.stat.wits === 1, band:ITEMS.b8_c7_mourningband.slot === 'trinket' && ITEMS.b8_c7_mourningband.hp > 0, noNumbers:Object.values(CHAPTERS[7].gear).every(it => !/\d/.test(it.line)),
    figs:['b8_c7_guardian', 'b8_c7_benna'].every(k => typeof FIGX[k] === 'function' && FIGX[k].toString().includes('ctx.save')),
    scenes:['b8_lakeshore', 'b8_morning', 'b8_c7_street'].every(k => typeof SCENEX[k] === 'function' && SCENES[k] && SCENEX[k].toString().includes('b87')),
    fireRoster:(ROSTER_FIRES.tth[7] || []).includes('b8_c7_fire'), keys:JSON.stringify(B8KEYS[7]), audit:audit()};
  /* the start: the Contract (no knives down: no cooling), the reading on the shingle */
  const con0 = b8Contract(); talk('b8_c7_start'); out.f.ph = S.f.b8_c7_ph; out.f.cool = b8Contract() - con0; out.f.cooled = S.f.b8_c7_cooled; out.f.deck = has('b8_c7_start', /Sit with Tuft/); out.f.html = /The Contract/.test(DLG.b8_c7_start().html || '');
  talk('b8_c7_read'); const rd = DLG.b8_c7_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b8_c7_drawn, reader:S.f.b8_c7_reader, card:S.card, inPool:B8POOL[7].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B8READ[7].back, shingle:/shingle/.test(B8READ[7].where), cardNode:cardNodeName(), cardSp:DLG.b8_c7_card().sp, cardBack:DLG.b8_c7_card().ch[0].go, says:['tuft', 'sohra', 'benna'].every(k => !!B8READ[7].say[k])};
  /* the fire in phase 1 */
  talk('b8_c7_fire'); const f1 = DLG.b8_c7_fire(); out.fire1 = {html:/The Contract/.test(f1.html || ''), talk:has('b8_c7_fire', /Talk with the squad/), rest:has('b8_c7_fire', /rest/), toll:has('b8_c7_fire', /bell for every/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t), lines:lines(), here:here()};
  S.wounds = {brisk:4}; S.injury = {kettle:'kelyk'}; take('b8_c7_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && !(S.injury || {}).kettle && S.f.b8_c7_rest1 === 1;
  /* Tuft and the east: a cold that turns warm, never named */
  talk('b8_c7_lake'); const lk = DLG.b8_c7_lake().txt; out.warm = {flag:S.f.b8_c7_warm, words:/warm/.test(lk) && /cold/.test(lk) && !/Mother|Gate/.test(lk)};
  /* up into the street */
  out.st = {notNow:has('b8_c7_to_street', /Not now/)}; take('b8_c7_to_street', /Up into the street/); out.st.area = S.area; out.st.seen = S.f.b8_c7_street;
  out.st.roadShut = !has('b8_c7_to_road', /Go with them/);
  /* the door: the "yes, but" on the might check, then the fight */
  talk('b8_c7_door'); out.d = {fight:has('b8_c7_door', /Clear the room/), notNow:has('b8_c7_door', /Not now/)};
  const sd = JSON.stringify(S); near('b8_c7_door', /Tell them/, 'brisk'); out.d.near = ((S.bruised || {}).brisk || 0) > 0; restore(sd, 'b8_c7_street');
  const cd = b8Contract(); out.d.battle = await force('b8_c7_doorway'); out.d.done = S.f.b8_c7_doorDone === 1 && /room/.test(DLG.b8_c7_door().txt) && DLG.b8_c7_door().sp === 'The Fourth\'s door'; out.d.con = b8Contract() - cd;
  /* Benlo: the city's news (the moon, a giant in the street, a councillor dead), never a seen death */
  startExplore('b8_c7_street'); talk('b8_c7_benlo'); take('b8_c7_benlo', /bells/); const bb = DLG.b8_c7_benlo_bells().txt; take('b8_c7_benlo_bells', /Back/); take('b8_c7_benlo', /What else/); const bc = DLG.b8_c7_benlo_city().txt;
  out.b = {flag:S.f.b8_c7_benlo, son:/Son of Darkness/.test(bb) && /No one knows how/.test(bb) && /ox cart/.test(bb), city:/moon/.test(bc) && /giant in the street/.test(bc) && /councillor's widow fell/.test(bc)};
  /* Vasso on the step: he joins */
  const vn = AREAS.b8_c7_street.npcs.find(n => n.id === 'vasso'); out.v = {show:vn.show(), notNow:has('b8_c7_vasso', /Not now/)};
  talk('b8_c7_vasso'); take('b8_c7_vasso', /Walk with us/); clearModal(); out.v.in = b8In('vasso') && S.f.b8_vassoDone === 1; out.v.gone = !vn.show();
  /* the roofs: b8Roofs(7) at the Contract 5 is two knives (three, one fewer); the contract edge; the "yes, but" costs a mark; talked off cools it by 1 */
  out.rf = {list:b8Roofs(7).length, open:b87RoofsOpen() && AREAS.b8_c7_street.map.join('').includes('S')};
  talk('b8_c7_roofs_look'); const rc = vis('b8_c7_roofs_look').find(c => c.check); out.rf.contract = !!rc.contract && edgesFor(rc, 'sgt').some(e => /Guild's paper/.test(e[0]) && e[1] === -1); out.rf.vasso = (edgesFor(rc, 'vasso').find(e => /not today/.test(e[0])) || [])[1]; out.rf.notNow = has('b8_c7_roofs_look', /Not now/);
  const sr = JSON.stringify(S); const crA = b8Contract(); near('b8_c7_roofs_look', /Let them see you/, 'vasso'); out.rf.nearCon = b8Contract() - crA; restore(sr, 'b8_c7_street');
  const sr2 = JSON.stringify(S); const crB = b8Contract(); made('b8_c7_roofs_look', /Let them see you/, 'vasso'); out.rf.talkedCon = b8Contract() - crB; out.rf.left = S.f.b8_c7_roofsLeft === 1; restore(sr2, 'b8_c7_street');
  const crC = b8Contract(); out.rf.battle = await force('b8_c7_roofs'); out.rf.fightCon = b8Contract() - crC; out.rf.done = S.f.b8_c7_roofsDone === 1 && !b87RoofsOpen() && /nothing on it but chimneys/.test(DLG.b8_c7_roofs_look().txt);
  /* the dyers' row: the flank check's "yes, but", then the fight with surprise and its yard; Orsa and the mourning band */
  startExplore('b8_c7_street'); talk('b8_c7_looters_look'); out.l = {notNow:has('b8_c7_looters_look', /Not now/), straight:has('b8_c7_looters_look', /straight at them/)};
  const sl = JSON.stringify(S); near('b8_c7_looters_look', /Come at them/, 'kettle'); out.l.near = !!(S.rattled || {}).kettle; restore(sl, 'b8_c7_street');
  made('b8_c7_looters_look', /Come at them/, 'vasso'); out.l.flank = S.f.b8_c7_lootFlank === 1;
  const cl = b8Contract(); out.l.battle = await force('b8_c7_looters', {surprise:'p'}); out.l.con = b8Contract() - cl; out.l.done = S.f.b8_c7_lootDone === 1;
  take('b8_c7_looters_after', /See to Orsa/); out.l.band = S.kit.includes('b8_c7_mourningband') && S.f.b8_c7_band === 1;
  /* the east road: phase 2 */
  startExplore('b8_c7_street'); out.p = {open:has('b8_c7_to_road', /Go with them/), notNow:has('b8_c7_to_road', /Not now/)}; take('b8_c7_to_road', /Go with them/); out.p.ph = S.f.b8_c7_ph; out.p.area = S.area; out.p.arrive = S.f.b8_c7_road === 1;
  const ra = DLG.b8_c7_road_arrive().txt; out.p.crowd = /tens of thousands/.test(ra) && /No one at the back is going to get any nearer/.test(ra) && !/Andii/.test(ra);
  talk('b8_c7_ahead'); out.p.notYet = !/stops, all of it/.test(DLG.b8_c7_ahead().txt);
  /* callback 5: Tufty, from old Benna, with Tuft there */
  const bn = AREAS.b8_c7_road.npcs.find(n => n.id === 'benna'); out.tf = {show:bn.show()}; talk('b8_c7_benna'); out.tf.rumour = /Tufty/.test(DLG.b8_c7_benna().txt) && /Jaghut/.test(DLG.b8_c7_benna().txt); take('b8_c7_benna', /Look at Tuft/);
  out.tf.flag = S.f.b8_c7_tufty === 1; out.tf.amused = /I have never/.test(DLG.b8_c7_tufty().txt);
  /* callback 8: the Guardian at the crowd's back, Book One's words, no name */
  const gn = AREAS.b8_c7_road.npcs.find(n => n.id === 'guardian'); out.g = {show:gn.show()}; talk('b8_c7_guardian'); const g1 = DLG.b8_c7_guardian().txt;
  out.g.count = /He gets to (two|three|four|five|six)\./.test(g1) && /Fourth Squad/.test(g1); out.g.salute = /returns it/.test(g1);
  take('b8_c7_guardian', /Sir/); const g2 = DLG.b8_c7_guardian_say().txt; out.g.words = /Anything else, Sergeant,.*ask it now/.test(g2); out.g.flag = S.f.b8_c7_guardian === 1; out.g.gone = !gn.show(); out.g.noName = !/Whiskeyjack|Iskar|captain's name/.test(g1 + g2);
  out.g.patron = PATRONS.brisk === PATRON_B8GATE;
  /* the halt: the crowd stops, the cart goes on; back to the lake */
  talk('b8_c7_ahead'); out.h = {halt:S.node === 'b8_c7_ahead' && /cart goes on alone/.test(DLG.b8_c7_ahead().txt), notYet:has('b8_c7_ahead', /Not yet/), never:/never know what is at the end/.test(DLG.b8_c7_halt().txt)};
  take('b8_c7_halt', /Back to the city/); out.h.ph = S.f.b8_c7_ph; out.h.area = S.area;
  /* the fire in phase 3: the toll first; the bell; Ohl reads the list */
  talk('b8_c7_fire'); out.t = {toll:has('b8_c7_fire', /bell for every/), roadsShut:!has('b8_c7_fire', /The roads/), rest:has('b8_c7_fire', /rest/), lines3:lines(), here3:here()};
  take('b8_c7_fire', /bell for every/); out.t.bell = S.kit.includes('b8_c7_bell'); out.t.choices = vis('b8_c7_toll').length; out.t.notYet = has('b8_c7_toll', /Not yet/);
  take('b8_c7_toll', /Read the list/); out.t.list = S.f.b8_c7_toll === 'list' && S.f.b8_c7_tolled === 1 && /every name/.test(DLG.b8_c7_toll_list().txt);
  take('b8_c7_toll_list', /Sit with it/);
  /* the trick: The Toll Count (✦ wits 17), the Lady's Pull's shape */
  const tc = vis('b8_c7_count').find(c => c.trick); out.k = {dc:tc && tc.check[1], stat:tc && tc.check[0], lore:/count the squad, get the number, check it/.test(DLG.b8_c7_count().txt), notNow:has('b8_c7_count', /Not now/),
    edgeVasso:(edgesFor(tc, 'vasso').find(e => /bells/.test(e[0])) || [])[1], edgeSgt:(edgesFor(tc, 'sgt').find(e => /halt/.test(e[0])) || [])[1]};
  const sk = JSON.stringify(S); near('b8_c7_count', /Count them/, 'ohl'); out.k.near = !!(S.rattled || {}).ohl; restore(sk, 'b8_c7_shore');
  made('b8_c7_count', /Count them/, 'vasso');
  out.k = Object.assign(out.k, {who:S.tricks && S.tricks.b8_c7_toll && S.tricks.b8_c7_toll.who, ok:S.f.b8_c7_tollOk, use:TRICKS.b8_c7_toll.use, free:!!AB.t_b8_c7_toll.free, words:/one free trick a turn/.test(TRICKS.b8_c7_toll.fx) && /−2/.test(TRICKS.b8_c7_toll.fx),
    again:!has('b8_c7_count', /Count them/), left:trickLeft('pull'), n:trickN('b8_c7_toll'), passive:!V103_PASSIVE.includes('b8_c7_toll')});
  spendTrick('pull'); out.k.spent = trickLeft('b8_c7_toll') === out.k.left - 1 && S.tricks.pull && S.tricks.pull.b87 === 1 && trickBy('pull') === 'vasso';
  delete S.tricks.pull; out.k.spent = out.k.spent && trickLeft('pull') === out.k.left - 1; S.tricks.b8_c7_toll.left = out.k.left;
  startBattle('b8_c7_looters', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'vasso'); out.k.offered = trickOk(u, AB.t_b8_c7_toll); AB.t_b8_c7_toll.run(u); out.k.lucky = u.luckyTurn === B.turn && S.push === 1; }
  B = null; view = 'scene'; S.scene = 'talk'; S.push = 0; startExplore('b8_c7_shore');
  /* the key: the roads */
  talk('b8_c7_fire'); out.y = {roads:has('b8_c7_fire', /The roads/)}; take('b8_c7_fire', /The roads/);
  const kn = DLG.b8_c7_roads(); out.y = Object.assign(out.y, {daru:has('b8_c7_roads', /Darujhistan\.$/), coral:has('b8_c7_roads', /Back to Black Coral/), east:has('b8_c7_roads', /East\. A ship/), notYet:has('b8_c7_roads', /Not yet/), html:/The Contract/.test(kn.html || ''), stand:/The Andii's pay/.test(vis('b8_c7_roads')[1].t)});
  const snapK = JSON.stringify(S), conK = b8Contract();
  const road = async (key, re) => { S = JSON.parse(snapK); save(); setBook('tth'); S.chapter = 7; startExplore('b8_c7_shore');
    take('b8_c7_roads', re); const o = {key:S.f.b8_c7_key, back:has(`b8_c7_${key}_go`, /Not yet/), go:has(`b8_c7_${key}_go`, /That's the road/)};
    take(`b8_c7_${key}_go`, /That's the road/); await wait(60); o.view = view; o.ch = S.chapters[7]; o.endText = (CHEND[7] || {})[key] && CHEND[7][key][0]; o.con = b8Contract(); o.extras = CHAPTERS[7].extras().length; o.journal = CHAPTERS[7].journal().length;
    o.pages = await finale(); return o; };
  out.daru = await road('daru', /Darujhistan\.$/); out.coral = await road('coral', /Back to Black Coral/); out.east = await road('east', /East\. A ship/);
  out.onward = b87Onward(S) && !b87Onward(Object.assign({}, S, {chapters:{7:'daru'}}));
  /* ================= a --from=7 style save: Tuft dead before the book, Brisk fallen on the last night, the knives down; Sohra and Ellis walking; Edrem waiting; Vasso sent away ================= */
  setBook('tth'); S = newStateTTH('Syn'); S.lvl = 19; S.xp = LEVELS[18]; S.squad = ['sgt', 'kettle', 'ohl', 'sohra', 'ellis']; S.dead.tuft = {ch:7, where:'Coral', from:'moi'}; S.dead.brisk = {ch:6, where:'The knives'};
  S.imported = {from:'Syn', book:'moi', road:'standdown', lvl:15, mates:['brisk', 'kettle', 'ohl', 'sohra', 'ellis'], lifted:true};
  S.chapters = {1:'hunt', 2:'fields', 3:'kneel', 4:'burn', 5:'fast', 6:'wall'}; Object.entries(S.chapters).forEach(([n, v]) => { S.f[`b8_c${n}_key`] = v; });
  S.f.b8_c6_knivesDown = 1; S.f.b8_c6_wayOut = 'fought'; S.f.b8_vassoDone = 0; S.f.b8_edremDone = 2; S.camp = ['edrem']; S.b8 = {con:6, hi:7, lo:3};
  ['sohra', 'ellis', 'edrem'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(7); S.picksDue = [];
  talk('b8_c7_start'); out.s = {cool:b8Contract(), cooled:S.f.b8_c7_cooled, renderErr:renderAll(), reader:visReader().id, lines:lines(), here:here(), brisk:/is not\./.test(CHAPTERS[7].intro.paras[1]()),
    wall:/wall/.test(DLG.b8_c7_start().txt), roofs:b8Roofs(7).length, roofNpc:b87RoofsOpen(), none:/counted enough/.test(DLG.b8_c7_roofs_look().txt),
    vassoNpc:AREAS.b8_c7_street.npcs.find(n => n.id === 'vasso').show(), benna:AREAS.b8_c7_road.npcs.find(n => n.id === 'benna').show(), audit:audit()};
  S.f.b8_c7_ph = 3; S.f.b8_c7_tolled = 1; out.s.coralKneel = /Redeemer's road/.test(vis('b8_c7_roads')[1].t);
  S.f.b8_c7_key = 'east'; chapterEnd(7, 'east'); await wait(60); out.s.pages = await finale();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, f1 = r.fire1 || {}, w = r.warm || {}, st = r.st || {}, d = r.d || {}, b = r.b || {}, v = r.v || {}, rf = r.rf || {}, l = r.l || {}, p = r.p || {}, tf = r.tf || {}, g = r.g || {}, h = r.h || {}, t = r.t || {}, k = r.k || {}, y = r.y || {}, s = r.s || {};
if (f.area) {
  f.area === 'b8_c7_shore' && f.ch === 7 && !f.renderErr.length && f.title === 'The Toll' && f.areas === 3 && f.fights === 3 && f.items && f.itemN === 2 && f.bell && f.band && f.noNumbers && f.figs && f.scenes && f.fireRoster && f.keys === '["daru","coral","east"]' && f.nodes >= 60 && f.nodes <= 80
    ? ok(`Chapter Seven opens on the lake shore; every b8_c7 node renders, no never-name, no "!" in narration (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); two new items with their own art; the Guardian, Benna, the shore, the road and the street drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 4 && !au.noNear.length && au.onwards >= 8 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.cool === 0 && f.cooled === 1 && f.deck && f.html ? ok('the start: first light on the shingle, the reading offered at the first halt, the Contract shown; no knives down, so no cooling') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'tuft' && rd.inPool && rd.notNow && rd.back === 'b8_c7_fire' && rd.shingle && rd.says && rd.cardNode === 'b8_c7_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b8_c7_fire' ? ok(`the reading on the shingle: Tuft draws (${rd.card}); a line for all three readers; the card node is the visions pass's hook (b8_c7_card)`) : no('reading ' + JSON.stringify(rd));
f1.html && f1.talk && f1.rest && !f1.toll && f1.notNow && f1.lines === f1.here && f1.rested ? ok(`the fire at first light: the Contract shown, a rest (wounds and the kelyk-sickness go), the talk (a line each, ${f1.lines}), Not now`) : no('fire1 ' + JSON.stringify(f1));
w.flag === 1 && w.words ? ok('Tuft at the water: a cold she has carried since Pale turns warm, east, never named') : no('warm ' + JSON.stringify(w));
st.notNow && st.area === 'b8_c7_street' && st.seen === 1 && st.roadShut ? ok('up into the street; the east road waits on the dyers\' row') : no('street ' + JSON.stringify(st));
d.fight && d.notNow && d.near && d.battle && d.battle.started && d.battle.foes === 3 && !d.battle.guild && d.battle.after === 'b8_c7_door_after' && d.done && d.con === 0 ? ok('the Fourth\'s door: a "yes, but" on facing them down, the fight (three, not the Guild: the Contract does not move), the room the Fourth\'s again') : no('door ' + JSON.stringify(d));
b.flag && b.son && b.city ? ok('Benlo\'s news: the bells for the Son of Darkness (nobody saw), the ox cart, the moon, a giant in the street, a councillor\'s widow fell') : no('benlo ' + JSON.stringify(b));
v.show && v.notNow && v.in && v.gone ? ok('Vasso on the Fourth\'s step joins') : no('vasso ' + JSON.stringify(v));
rf.list === 2 && rf.open && rf.contract && rf.vasso === 3 && rf.notNow && rf.nearCon === 1 && rf.talkedCon === -1 && rf.left && rf.battle && rf.battle.started && rf.battle.foes === 2 && rf.battle.guild && rf.battle.after === 'b8_c7_roofs_after' && rf.fightCon === 1 && rf.done
  ? ok('the roofs: b8Roofs(7) puts two knives on the tiles at the Contract 5; the check carries the Guild\'s paper (−1); talked off it cools by 1, a "yes, but" marks it back; fought, the engine counts the Guild\'s dead (+1)') : no('roofs ' + JSON.stringify(rf));
l.notNow && l.straight && l.near && l.flank && l.battle && l.battle.started && l.battle.foes === 4 && l.battle.surprise === 'p' && l.battle.stage2 && l.battle.inStage2 && l.battle.after === 'b8_c7_looters_after' && l.con === 0 && l.done && l.band
  ? ok(`the dyers' row: a "yes, but" on coming through the cloth, the fight with surprise (${l.battle.foes} foes) and its yard (${l.battle.title2}); Orsa and the mourning band`) : no('looters ' + JSON.stringify(l));
p.open && p.notNow && p.ph === 2 && p.area === 'b8_c7_road' && p.arrive && p.crowd && p.notYet ? ok('the procession: phase 2, the Fourth at the very back of tens of thousands, the cart a speck, no Andii; nobody at the back gets nearer') : no('procession ' + JSON.stringify(p));
tf.show && tf.rumour && tf.flag && tf.amused ? ok('callback 5: old Benna\'s rumour of a dead white cat called Tufty; Tuft is not amused; never the house or the cat on the page') : no('tufty ' + JSON.stringify(tf));
g.show && g.count && g.salute && g.words && g.flag && g.gone && g.noName && g.patron ? ok('callback 8: a soldier at the crowd\'s back counts the Fourth, returns Brisk\'s salute and says "Anything else, Sergeant, ask it now" (Book One); no name; Brisk\'s god is the Guardians of the Gate') : no('guardian ' + JSON.stringify(g));
h.halt && h.notYet && h.never && h.ph === 3 && h.area === 'b8_c7_shore' ? ok('the crowd stops on a rise and the cart goes on alone; the barrow never seen; back to the lake at evening') : no('halt ' + JSON.stringify(h));
t.toll && t.roadsShut && t.rest && t.lines3 === t.here3 && t.bell && t.choices === 4 && t.notYet && t.list ? ok('the bell for every soldier: the brass bell; Ohl reads the list (or the ledger, or no names); the roads wait on it') : no('toll ' + JSON.stringify(t));
k.dc === 17 && k.stat === 'wits' && k.lore && k.notNow && k.edgeVasso === 3 && k.edgeSgt === 2 && k.near && k.who === 'vasso' && k.ok === 1 && k.use === 'chapter' && k.free && k.words && k.again && k.left === k.n && k.passive && k.spent && k.offered && k.lucky
  ? ok('the trick: The Toll Count, a ✦ wits 17 check that names the count at every halt; chapter charges (three at this level), it answers the Pull\'s spin in a check, free in battle (roll twice, the next check −2)') : no('trick ' + JSON.stringify(k));
y.roads && y.daru && y.coral && y.east && y.notYet && y.html && y.stand ? ok('the key at the fire: daru, coral (the Andii\'s pay, on Ch 3 stand), east, Not yet; the Contract shown') : no('key ' + JSON.stringify(y));
const finCheck = (o, key, title, must) => { const P = o.pages || [], road = P[0] || {}, fates = P.filter(x => x.k === 'fate' && x.id !== 'sgt'), sg = P.find(x => x.id === 'sgt'), meet = P.find(x => x.k === 'b87meet'), end = P[P.length - 1] || {};
  const leaks = P.filter(x => x.leak || x.len < 60).map(x => x.k + ':' + x.id + ':' + x.never);
  return o.key === key && o.back && o.go && o.view === 'end' && o.ch === key && !!o.endText && o.extras >= 5 && o.journal >= 4 && road.h1 === title && /The Contract, at the end/.test(road.t) && must.every(re => re.test(road.t))
    && fates.length >= 5 && fates.every(x => x.h2 && x.h3 && x.len > 200) && sg && /Time served/.test(sg.h3) && meet && /Where the books meet/.test(meet.head) && end.k === 'end' && /Steven Erikson and Ian C\. Esslemont/.test(end.t) && /The End of Book Eight/.test(end.t) && /brass bell/.test(end.t) && /last Fete/.test(end.t) && !leaks.length
    ? null : {key, title:road.h1, fates:fates.map(x => x.id + ':' + x.h3), sg:sg && sg.h3, meet:!!meet, end:end.k, leaks, road:road.t && road.t.slice(0, 300), o:Object.assign({}, o, {pages:P.length})}; };
const fd = finCheck(r.daru || {}, 'daru', 'The door kept', [/come back one day/, /Phoenix/]); !fd ? ok(`the finale on daru (${(r.daru.pages || []).length} pages): the door kept, a page per squadmate (Brisk, Kettle, Tuft, Ohl, Vasso), the sergeant, Where the books meet, the coda and the credit`) : no('daru finale ' + JSON.stringify(fd).slice(0, 1600));
const fc = finCheck(r.coral || {}, 'coral', 'Back to Black Coral', [/fire from the sky/, /young lord/, /Thessaly/]); !fc ? ok(`the finale on coral (${(r.coral.pages || []).length} pages): Black Coral in the Andii's pay (Ch 3 stand), the camp's fire told after, a young lord, warmer dark`) : no('coral finale ' + JSON.stringify(fc).slice(0, 1600));
const fe = finCheck(r.east || {}, 'east', 'A ship east', [/Book Nine/]); !fe && r.onward ? ok(`the finale on east (${(r.east.pages || []).length} pages): a ship toward the Malazans abroad; the save Book Nine may import (b87Onward)`) : no('east finale ' + JSON.stringify(fe).slice(0, 1600) + ' onward ' + r.onward);
const waits = (o) => (o.pages || []).filter(x => x.k === 'gone');
{ const wd = waits(r.daru || {}), ed = wd.find(x => x.id === 'edrem'); ed && /Waiting/.test(ed.head) && /pilgrims' road/.test(ed.h3) ? ok('Edrem, waiting on his road, has his page') : no('waiting ' + JSON.stringify(wd.map(x => [x.id, x.head, x.h3]))); }
const sp = s.pages || [], sb = sp.find(x => x.k === 'gone' && x.id === 'brisk'), stf = sp.find(x => x.k === 'gone' && x.id === 'tuft'), sed = sp.find(x => x.k === 'gone' && x.id === 'edrem'), sv = sp.find(x => x.k === 'gone' && x.id === 'vasso'), sEnd = sp[sp.length - 1] || {};
s.cool === 4 && s.cooled === 2 && s.renderErr && !s.renderErr.length && s.reader === 'sohra' && s.lines === s.here && s.brisk && s.wall && s.roofs === 0 && !s.roofNpc && s.none && !s.vassoNpc && !s.benna && !s.audit.noNear.length && !s.audit.noStay.length && s.coralKneel
  ? ok(`a --from=7 style save (Tuft dead before, Brisk fallen on the last night, the knives down): the Contract cools by 2 (6 to 4, "the Guild has counted enough"), nobody on the roofs, Sohra reads, a line each (${s.lines}), no Tufty without Tuft, coral is the Redeemer's road on Ch 3 kneel`) : no('synthetic ' + JSON.stringify(Object.assign({}, s, {pages:sp.length})).slice(0, 1200));
sb && /Fallen/.test(sb.h3) && /last night of the Fete/.test(sb.t) && /broken stretch of the city wall/.test(sb.t) && stf && /before this book/.test(stf.t) && sed && /Waiting/.test(sed.head) && sv && /Sent away/.test(sv.head) && /Brisk/.test(sEnd.t) && /The dead/.test(sEnd.t) && !sp.some(x => x.leak || x.len < 60)
  ? ok(`the fallen and the waiting (${sp.length} pages on east): Brisk fallen on the last night at the wall, Tuft fallen before the book, Edrem waiting, Vasso sent away; the roll of the dead on the end page`) : no('fallen ' + JSON.stringify(sp.map(x => [x.k, x.id, x.head, x.h3, x.never])).slice(0, 1400));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b8ch7: FAIL (${bad.length})` : 'b8ch7: all ok'); process.exit(bad.length ? 1 : 0);
