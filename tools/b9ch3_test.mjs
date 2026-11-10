// Book Nine, Chapter 3 (The Road East, src/163_b9_ch3.js): the Third's halts, the fever falling on a squadmate when the chapter starts,
// the march's Rations (−2), the reading at the stone (and the card node the visions pass hooks onto), the fire (Rations shown, a rest
// that leaves the fever, a line each, Not now), the Letherii healer and the trick behind its ✦ hard check (taught; a group heal, a full
// turn, no ward; its battle half), Brask's own scene, the items (each with art), every fight's start and a forced win (the dogs; both
// grounds of the last farm; the raiders on Duvo's horses), the farm's or Duvo's +1 (once only), the Witness beat (three answers, each
// recorded; Not now records nothing), both keys from the same moment (boil −1 and the fever broken; press +1 and the fever kept),
// "Not now" on every onward step and a "yes, but" on every check, from a fresh start and from a --from=3 style transfer save.
// Usage: node tools/b9ch3_test.mjs   (build first; exit 1 on a failure)
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
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark;
    res.fever = (B.units.find(u => u.id === S.f.b9_c3_sick) || {}).id || null;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b9_c3_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Tarr\b|Cuttle|Hedge|Bavedict|Keneb|Blistig|Errant|Brys|Henar|Ublala|Kalam|Tehol|Koryk|Bottle|Gudd|Bugg|\bSinn\b|\bGrub\b|\bweeks\b|\bmonths\b|Glass Desert|Forkrul|Chancel|blood to drink|urine/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it; under
     every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set();
    const keep = JSON.stringify(S.f);
    [1, 2, 3, 4].forEach(ph => ['boil', 'press', null].forEach(k => [0, 1].forEach(fl => { S.f.b9_c3_ph = ph; S.f.b9_c3_key = k;
      ['b9_c3_orders1', 'b9_c3_orders2', 'b9_c3_orders3', 'b9_c3_healer', 'b9_c3_farmDone', 'b9_c3_roadDone', 'b9_c3_dogsDone', 'b9_c3_bark'].forEach(f => { S.f[f] = fl ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Fresh'); S.picksDue = []; S.f.b9_braskDone = 1; S.squad.push('brask'); S.loy.brask = 1; S.gear.brask ??= {}; S.picks.brask ??= []; migrate(S); save(); startChapter(3); S.picksDue = []; save();
  const sick = S.f.b9_c3_sick;
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, rat0:b9Rations(), march:S.f.b9_march3, squad:S.squad.join(','), name:S.name, sick, fever:!!sick && S.injury && S.injury[sick] === 'b9fever', notHealer:!['marrow', 'mirrel', 'sgt'].includes(sick),
    renderErr:renderAll(), title:CHAPTERS[3].title, nodes:nodes.length, areas:CHAPTERS[3].areas.length, fights:Object.keys(CHAPTERS[3].battles).length,
    items:Object.keys(CHAPTERS[3].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[3].gear).length,
    knife:ITEMS.b9_c3_akrynknife && ITEMS.b9_c3_akrynknife.slot === 'weapon' && ITEMS.b9_c3_akrynknife.role === 'blade' && ITEMS.b9_c3_akrynknife.atk >= 1,
    pot:ITEMS.b9_c3_boilingpot && ITEMS.b9_c3_boilingpot.slot === 'trinket', bark:ITEMS.b9_c3_feverbark && ITEMS.b9_c3_feverbark.slot === 'trinket',
    figs:['b9_c3_healer', 'b9_c3_harro', 'b9_c3_duvo'].every(k => typeof FIGX[k] === 'function'), ground:typeof TILEX.b9_c3_road === 'function' && typeof TILEX.b9_c3_farm === 'function',
    scenes:['b9_road_east', 'b9_column', 'b9_c3_farm', 'b9_c3_fevercamp', 'b9_c3_edge'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.dod[3] || []).includes('b9_c3_fire'), audit:audit(), silver:/silver/.test(b9Coin(3))};
  { const cv = document.createElement('canvas'); cv.width = 390; cv.height = 300; ['b9_road_east', 'b9_column', 'b9_c3_farm', 'b9_c3_fevercamp', 'b9_c3_edge'].forEach(k => SCENEX[k](cv, 1000)); }
  /* the start: the first halt, the reading offered */
  talk('b9_c3_start'); out.f.ph = S.f.b9_c3_ph; out.f.deck = has('b9_c3_start', /and the Deck/); out.f.sickTxt = new RegExp(NAME(sick)).test(DLG.b9_c3_start().txt);
  talk('b9_c3_read'); const rd = DLG.b9_c3_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b9_c3_drawn, reader:S.f.b9_c3_reader, inPool:B9POOL[3].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B9READ[3].back, where:/stone/.test(B9READ[3].where), cardNode:cardNodeName(), cardSp:DLG.b9_c3_card().sp, cardBack:DLG.b9_c3_card().ch[0].go, again:!has('b9_c3_fire', /and the Deck/), say:['marrow', 'tallow', 'oldninth'].every(k => B9READ[3].say[k])};
  /* Thallo, the first night */
  talk('b9_c3_thallo'); out.t1 = {orders:S.f.b9_c3_orders1, notNow:has('b9_c3_thallo', /Not now/)}; take('b9_c3_thallo', /Where did it come from/); out.t1.bone = (DLG.b9_c3_thallo_more().txt.match(/Bonehunters/g) || []).length;
  talk('b9_c3_fire'); out.t1.noTurn = !has('b9_c3_fire', /Turn in/);
  /* Brask's own scene */
  talk('b9_c3_brask'); out.bk = {flag:S.f.b9_c3_brask, show:AREAS.b9_c3_camp.npcs.find(n => n.id === 'brask').show(), named:/Brask/.test(DLG.b9_c3_fire_talk().txt)};
  /* the healer: the trick behind its ✦ hard check */
  talk('b9_c3_carts'); take('b9_c3_carts', /The healer/); const tc = vis('b9_c3_healer').find(c => c.trick);
  out.t = {dc:tc && tc.check[1], stat:tc && tc.check[0], noNear:tc && !tc.near, notNow:has('b9_c3_healer', /Not now/), mirrel:(edgesFor(tc, 'mirrel').find(e => /Li Heng/.test(e[0])) || [])[1] || 0, marrow:(edgesFor(tc, 'marrow').find(e => /Soliel/.test(e[0])) || [])[1] || 0, other:/companies/.test(DLG.b9_c3_healer().txt)};
  made('b9_c3_healer', /Learn it properly/, 'mirrel');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b9_c3_cure && S.tricks.b9_c3_cure.who, ok:S.f.b9_c3_cureOk, free:!!AB.t_b9_c3_cure.free, words:/takes the bearer's action\.$/.test(TRICKS.b9_c3_cure.fx), pot:S.kit.includes('b9_c3_boilingpot'), again:!vis('b9_c3_healer').some(c => c.trick)});
  /* keeping the sick going (a rations check; its "yes, but": rattled); the sick never rolls it */
  take('b9_c3_healer', /Show us what to do/); { const c = vis('b9_c3_sick').find(x => x.check); out.s = {rations:!!c.rations, not:(c.not || []).includes(sick), notNow:has('b9_c3_sick', /Not now/)};
    const sn = JSON.stringify(S); near('b9_c3_sick', /Sit with/, 'marrow'); out.s.near = !!(S.rattled || {}).marrow; restore(sn, 'b9_c3_camp'); }
  made('b9_c3_sick', /Sit with/, 'mirrel'); out.s.tended = S.f.b9_c3_tended;
  /* the dogs (optional): the brands' "yes, but", then the fight */
  talk('b9_c3_dogs'); out.d = {notNow:has('b9_c3_dogs', /Not now/)};
  { const sn = JSON.stringify(S); near('b9_c3_dogs', /Brands/, 'haddat'); out.d.near = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b9_c3_camp'); }
  out.d.fight = await force('b9_c3_dogs'); out.d.done = S.f.b9_c3_dogsDone;
  /* the trick's battle half: a group heal, no ward */
  startBattle('b9_c3_dogs', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'mirrel') || B.units.find(x => x.side === 'p' && !x.ally); const mates = B.units.filter(p => p.side === 'p' && !p.ally); mates.forEach(p => { p.hp = Math.max(1, p.hp - 12); p.ward = 0; });
    const hp0 = mates.reduce((a, p) => a + p.hp, 0); out.t.offered = trickOk(u, AB.t_b9_c3_cure); AB.t_b9_c3_cure.run(u); out.t.healed = mates.reduce((a, p) => a + p.hp, 0) - hp0; out.t.noWard = mates.every(p => !p.ward); }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b9_c3_camp');
  /* the fire on the first night: a rest leaves the fever */
  talk('b9_c3_fire'); const f1 = DLG.b9_c3_fire();
  out.fire1 = {html:/Rations/.test(f1.html || ''), talk:has('b9_c3_fire', /Talk with the squad/), rest:has('b9_c3_fire', /rest/), turn:has('b9_c3_fire', /Turn in/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t), brask:/Brask/.test(f1.txt)};
  out.fire1.lines = DLG.b9_c3_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {haddat:4}; take('b9_c3_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b9_c3_rest1 === 1; out.fire1.feverKept = S.injury && S.injury[sick] === 'b9fever';
  take('b9_c3_fire', /Turn in/); out.fire1.notYet = has('b9_c3_turnin', /Not yet/); take('b9_c3_turnin', /First light/);
  /* ================= phase 2: the road, Harro, the last farm ================= */
  out.p2 = {area:S.area, ph:S.f.b9_c3_ph, arrive:S.node === 'b9_c3_road_arrive', laneShut:!has('b9_c3_lane', /Down the lane/)};
  take('b9_c3_road_arrive', /Thallo/); out.p2.notNow = has('b9_c3_thallo2', /Not now/); out.p2.lane = has('b9_c3_lane', /Down the lane/) && has('b9_c3_lane', /Not now/);
  talk('b9_c3_harro'); out.h = {notNow:has('b9_c3_harro', /Not now/), silver0:S.silver};
  { const sn = JSON.stringify(S); near('b9_c3_harro', /Talk him down/, 'mehet' in TPL && b9In('mehet') ? 'mehet' : 'tangle'); out.h.near = sn && (JSON.parse(sn).silver - S.silver); out.h.nearBark = S.kit.includes('b9_c3_feverbark'); restore(sn, 'b9_c3_road'); }
  made('b9_c3_harro', /Talk him down/, 'tangle'); out.h.bark = S.kit.includes('b9_c3_feverbark'); out.h.paid = out.h.silver0 - S.silver;
  take('b9_c3_lane', /Down the lane/); out.fm = {area:S.area, arrive:S.node === 'b9_c3_farm_arrive', notNow:has('b9_c3_door', /Not now/), backShut:!has('b9_c3_farm_back', /camp, at dusk/)};
  { const sn = JSON.stringify(S); near('b9_c3_door', /Round by the barn/, 'tangle'); out.fm.near = ((S.bruised || {}).tangle || 0) > 0; restore(sn, 'b9_c3_farm'); if (B) { B = null; view = 'scene'; } }
  out.fm.fight = await force('b9_c3_farm', {surprise:'p'}); out.fm.done = S.f.b9_c3_farmDone;
  /* the farm's last stores: a rations check, +1 once (the anchor) */
  const ratF = b9Rations(); take('b9_c3_farm_after', /old woman/); out.fs = {rations:!!vis('b9_c3_farmer').find(c => c.check).rations, notNow:true};
  { const sn = JSON.stringify(S); near('b9_c3_farmer', /Buy what she can spare/, 'doss' in TPL && b9In('doss') ? 'doss' : 'haddat'); out.fs.near = Object.keys(S.rattled || {}).length > 0; restore(sn, 'b9_c3_farm'); }
  const snapFarm = JSON.stringify(S);
  made('b9_c3_farmer', /Buy what she can spare/, 'haddat'); out.fs.up = b9Rations() - ratF; out.fs.found = S.f.b9_c3_found; talk('b9_c3_stores_ok'); out.fs.once = b9Rations() - ratF;
  talk('b9_c3_farm_thallo'); out.fm.thalloOn = has('b9_c3_farm_thallo', /Back to the column/) && has('b9_c3_farm_thallo', /Not now/);
  talk('b9_c3_farm_back'); out.fm.back = has('b9_c3_farm_back', /camp, at dusk/) && has('b9_c3_farm_back', /Not now/); take('b9_c3_farm_back', /camp, at dusk/);
  /* ================= phase 3: the second night, the Witness beat, the key ================= */
  out.p3 = {area:S.area, ph:S.f.b9_c3_ph, arrive:S.node === 'b9_c3_camp2_arrive', noKey:!has('b9_c3_fire', /captain's word/)};
  take('b9_c3_camp2_arrive', /Thallo/); const t3 = DLG.b9_c3_thallo3().txt; out.p3.saying = /surviving isn't what this is about/.test(t3) && !/meeting/.test(t3); out.p3.orders = S.f.b9_c3_orders3; out.p3.notNow = has('b9_c3_thallo3', /Not now/);
  out.p3.keyOn = has('b9_c3_fire', /captain's word/) && has('b9_c3_fire', /Not now/);
  /* the Witness: three answers, each recorded once; Not now records nothing */
  const snapW = JSON.stringify(S);
  out.w = {opts:vis('b9_c3_witness').length, html:/Rations/.test(DLG.b9_c3_witness().html || ''), notNow:has('b9_c3_witness', /Not now/)};
  take('b9_c3_witness', /Not now/); out.w.none = !(S.b9 && S.b9.wit && S.b9.wit.c3);
  [['squad', /For each other/, 'kept'], ['adjunct', /The Adjunct knows why/, 'kept'], ['column', /The column's going/, 'doubt']].forEach(([k, re, v]) => { restore(snapW, 'b9_c3_camp'); take('b9_c3_witness', re); out.w[k] = S.b9.wit.c3 === v && b9Faith('t') === v && S.f.b9_c3_wit === k && /\S/.test(DLG.b9_c3_wit_done().txt); });
  restore(snapW, 'b9_c3_camp'); take('b9_c3_witness', /For each other/); out.w.stands = (b9Wit('doubt', 'again'), S.b9.wit.c3 === 'kept'); out.w.fire = !has('b9_c3_fire', /What are we marching for/);
  /* the key, from the same moment */
  talk('b9_c3_carts'); const kn = DLG.b9_c3_key();
  out.k = {node:S.node, boil:has('b9_c3_key', /We stop/), press:has('b9_c3_key', /We keep the pace/), notYet:has('b9_c3_key', /Not yet/), html:/Rations/.test(kn.html || ''), brask:/Brask/.test(kn.txt), sick:new RegExp(NAME(sick)).test(kn.txt)};
  const snapK = JSON.stringify(S), ratK = b9Rations();
  /* ================= key: boil ================= */
  take('b9_c3_key', /We stop/); out.b = {key:S.f.b9_c3_key, rat:b9Rations() - ratK, notNow:has('b9_c3_key_boil', /Not now/)};
  take('b9_c3_key_boil', /After the column/); out.b.broke = S.f.b9_c3_feverBroke === 1 && !(S.injury && S.injury[sick]); out.b.notNow2 = has('b9_c3_boil_day', /Not now/);
  take('b9_c3_boil_day', /Wastes' edge/); out.b.area = S.area; out.b.ph = S.f.b9_c3_ph;
  /* ================= phase 4: the Wastes' edge (on boil): Duvo, the horses, Harro, the fire ================= */
  talk('b9_c3_duvo'); out.u = {rumour:/Barghast have gone to war/.test(DLG.b9_c3_duvo().txt), noMeat:!has('b9_c3_duvo', /horse-meat/), notNow:has('b9_c3_duvo', /Not now/)};
  take('b9_c3_duvo', /Your horses/); out.u.notNow2 = has('b9_c3_horses', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c3_horses', /Read the tracks/, 'haddat'); out.u.near = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b9_c3_edge'); if (B) { B = null; view = 'scene'; } }
  out.u.fight = await force('b9_c3_road', {surprise:'p'}); out.u.done = S.f.b9_c3_roadDone; out.u.knife = S.kit.includes('b9_c3_akrynknife');
  talk('b9_c3_harro'); out.u.harro = /behind the column two days/.test(DLG.b9_c3_harro().txt);
  talk('b9_c3_fire'); const f4 = DLG.b9_c3_fire(); out.fire4 = {html:/Rations/.test(f4.html || ''), on:has('b9_c3_fire', /Out onto the Wastes/), notNow:has('b9_c3_fire', /Not now/), rest:has('b9_c3_fire', /rest/), lines:DLG.b9_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length};
  take('b9_c3_fire', /Out onto the Wastes/); out.b.notYet = has('b9_c3_onward', /Not yet/); out.b.html = /Rations/.test(DLG.b9_c3_onward().html || ''); out.b.brask = /Brask/.test(DLG.b9_c3_onward().txt);
  const ratB = b9Rations(); take('b9_c3_onward', /East/); await wait(60);
  out.b.end = {view, ch:S.chapters[3], lvl:S.lvl, xp:S.xp, rat:ratB, extras:CHAPTERS[3].extras().length, journal:CHAPTERS[3].journal().length, endText:(CHEND[3] || {}).boil && CHEND[3].boil[0], keyFlag:S.f.b9_c3_key, sickFlag:S.f.b9_c3_sick};
  /* ================= key: press, from the same moment ================= */
  restore(snapK, 'b9_c3_camp'); S.chapter = 3;
  take('b9_c3_key', /We keep the pace/); out.p = {key:S.f.b9_c3_key, rat:b9Rations() - ratK, notNow:has('b9_c3_key_press', /Not now/)};
  take('b9_c3_key_press', /On, with the column/); take('b9_c3_press_day', /Wastes' edge/); out.p.fever = S.injury && S.injury[sick] === 'b9fever'; out.p.area = S.area;
  /* Duvo's horse-meat cannot add a second +1 once the farm gave one; from the snapshot before the farm's stores, it gives the +1 */
  talk('b9_c3_duvo'); out.p.noMeat = !has('b9_c3_duvo', /horse-meat/);
  talk('b9_c3_fire'); take('b9_c3_fire', /Let the squad rest/); out.p.feverAfterRest = S.injury && S.injury[sick] === 'b9fever';
  out.p.edgeSick = new RegExp(NAME(sick)).test(DLG.b9_c3_fire().txt);
  take('b9_c3_fire', /Out onto the Wastes/); const ratP = b9Rations(); out.p.walks = new RegExp(NAME(sick) + ' walks').test(DLG.b9_c3_onward().txt);
  take('b9_c3_onward', /East/); await wait(60);
  out.p.end = {view, ch:S.chapters[3], rat:ratP, endText:CHEND[3].press[0], extras:CHAPTERS[3].extras().some(x => /still shaking/.test(x))};
  /* Duvo instead of the farm: from before the farm's stores, leave them their stores; then Duvo's meat is the +1 */
  restore(snapFarm, 'b9_c3_farm'); S.chapter = 3; const ratD = b9Rations(); take('b9_c3_farmer', /Keep it/); S.f.b9_c3_ph = 4; startExplore('b9_c3_edge');
  talk('b9_c3_duvo'); out.dv = {meat:has('b9_c3_duvo', /horse-meat/), rations:!!(vis('b9_c3_duvo').find(c => c.check) || {}).rations};
  { const sn = JSON.stringify(S); near('b9_c3_duvo', /horse-meat/, 'haddat'); out.dv.near = JSON.parse(sn).silver - S.silver; restore(sn, 'b9_c3_edge'); }
  made('b9_c3_duvo', /horse-meat/, 'haddat'); out.dv.up = b9Rations() - ratD; out.dv.found = S.f.b9_c3_found;
  take('b9_c3_duvo', /knife/); out.dv.knife = has('b9_c3_duvo_knife', /Eight, then/) || (S.silver || 0) < 8;
  /* ================= a --from=3 style transfer save: Tangle dead; Doss and Brask walking, Wenna at camp ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Syn'); S.picksDue = []; save();
  S.squad = ['sgt', 'haddat', 'marrow', 'mirrel', 'doss', 'brask']; S.camp = [...(S.camp || []), 'wenna']; S.dead.tangle = {ch:6, where:'the river', from:'rg'}; S.f.b9_braskDone = 1; S.f.b9_c1_key = 'street'; S.chapters = {1:'street', 2:'drill'}; S.f.b9_c2_key = 'drill';
  ['doss', 'wenna', 'brask'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.lvl = 20; S.xp = LEVELS[19]; S.b9r = {n:7, lo:6, hi:8}; migrate(S); save(); startChapter(3); S.picksDue = []; save();
  const sk2 = S.f.b9_c3_sick;
  out.y = {renderErr:renderAll(), sick:sk2, fever:S.injury && S.injury[sk2] === 'b9fever', notHealer:!['marrow', 'mirrel'].includes(sk2), rat:b9Rations(), reader:b9Rd().id, lines:DLG.b9_c3_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length,
    doss:/Doss/.test(DLG.b9_c3_fire_talk().txt), wenna:!/Wenna/.test(DLG.b9_c3_fire_talk().txt), noTangle:!/Tangle/.test(DLG.b9_c3_fire_talk().txt), street:/household/.test(DLG.b9_c3_start().txt), drill:/drill sergeant's square/.test(DLG.b9_c3_healer().txt)};
  S.f.b9_c3_ph = 4; out.y.lines4 = DLG.b9_c3_fire_talk().txt.split('\n\n').length; S.f.b9_c3_ph = 1;
  out.y.audit = audit();
  save(); const sid = S.sid; const back = loadSlot(sid); out.y.reload = !!back && back.thread === 't' && !!back.th && !!back.th.l && back.squad.includes('brask') && back.f.b9_c3_sick === sk2; out.y.rl = back ? {t:back.thread, th:!!back.th, l:!!(back.th && back.th.l), b:(back.squad || []).includes('brask'), s:back.f && back.f.b9_c3_sick} : null;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, t1 = r.t1 || {}, bk = r.bk || {}, t = r.t || {}, s = r.s || {}, d = r.d || {}, f1 = r.fire1 || {}, p2 = r.p2 || {}, h = r.h || {}, fm = r.fm || {}, fs = r.fs || {}, p3 = r.p3 || {}, w = r.w || {}, k = r.k || {}, b = r.b || {}, u = r.u || {}, f4 = r.fire4 || {}, p = r.p || {}, dv = r.dv || {}, y = r.y || {};
if (f.area) {
  f.area === 'b9_c3_camp' && f.ch === 3 && f.thread === 't' && f.lvl0 === 19 && f.rat0 === 4 && f.march === 1 && f.name === 'Hask' && f.sick && f.fever && f.notHealer && !f.renderErr.length && f.title === 'The Road East' && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 3 && f.knife && f.pot && f.bark && f.figs && f.ground && f.scenes && f.fireRoster && f.silver
    ? ok(`a fresh start opens Chapter Three in the camp by the road: the Third, the march eats 2 (Rations ${f.rat0}); the fever falls on ${f.sick} (not a healer); every b9_c3 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with art and roles; three figures; the ground; five backdrops`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 7 && au.tricks === 1 && !au.noNear.length && au.onwards >= 8 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.deck && f.sickTxt ? ok('the start: the first night\'s camp, the sick one named, the reading offered at the first halt') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.back === 'b9_c3_fire' && rd.where && rd.cardNode === 'b9_c3_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b9_c3_fire' && rd.again && rd.say ? ok('the reading at the stone by the road: Marrow draws from B9POOL[3]; a say line for each reader; the card node is the visions pass\'s hook (b9_c3_card); back to b9_c3_fire; offered once') : no('reading ' + JSON.stringify(rd));
t1.orders === 1 && t1.notNow && t1.bone === 1 && t1.noTurn ? ok('Thallo, the first night: the fever and the Letherii healers; "Bonehunters" said once by a soldier; no turning in before the carts') : no('thallo ' + JSON.stringify(t1));
bk.flag === 1 && bk.show && bk.named ? ok('Brask\'s own scene (water down the fever-carts), and his line at the fire') : no('brask ' + JSON.stringify(bk));
t.dc === 19 && t.stat === 'wits' && t.noNear && t.notNow && t.mirrel === 2 && t.marrow === 2 && t.other && t.who === 'mirrel' && t.ok === 1 && !t.free && t.words && t.pot && t.again && t.offered && t.healed > 0 && t.noWard ? ok(`the trick: The Letherii Cure, a ✦ wits 19 check that names Li Heng's fevers and Soliel; a group heal, a full turn, no ward (healed ${t.healed}); the healer's boiling-pot; one line of the other squad`) : no('trick ' + JSON.stringify(t));
s.rations && s.not && s.notNow && s.near && s.tended === 'ok' ? ok('keeping the sick going: a rations check the sick never rolls (its "yes, but": rattled)') : no('sick ' + JSON.stringify(s));
d.notNow && d.near && d.fight && d.fight.started && d.fight.dark && d.fight.foes === 4 && d.fight.after === 'b9_c3_dogs_after' && d.done === 'fought' ? ok('Wastes dogs at the fever-carts (optional; the brands\' "yes, but": skin), by night') : no('dogs ' + JSON.stringify(d));
f1.html && f1.talk && f1.rest && f1.turn && f1.notNow && f1.brask && f1.lines === f1.here && f1.rested && f1.feverKept && f1.notYet ? ok(`the fire on the first night: Rations shown, a rest (wounds close; the fever stays), the talk (a line each, ${f1.lines}), Brask acknowledged, turning in with Not yet beside it`) : no('fire1 ' + JSON.stringify(f1));
p2.area === 'b9_c3_road' && p2.ph === 2 && p2.arrive && p2.laneShut && p2.notNow && p2.lane && h.notNow && h.near === 5 && h.nearBark && h.bark && h.paid === 3 ? ok('the road among the last farms: Thallo\'s job; Harro sells dear (talked down to three; the "yes, but" costs five: money is the scene)') : no('road ' + JSON.stringify({p2, h}));
fm.area === 'b9_c3_farm' && fm.arrive && fm.notNow && fm.backShut && fm.near && fm.fight && fm.fight.started && fm.fight.stage2 && fm.fight.inStage2 && fm.fight.allies === 1 && fm.fight.fever === f.sick && fm.fight.after === 'b9_c3_farm_after' && fm.done === 1 && fm.thalloOn && fm.back
  ? ok(`the last farm: deserters (main, ${fm.fight.foes} foes, a heavy beside the squad, the fevered one fighting with the fever; the barn behind), a "yes, but" on the way round; back to the column with Not now`) : no('farm ' + JSON.stringify(fm).slice(0, 900));
fs.rations && fs.near && fs.up === 1 && fs.found === 'farm' && fs.once === 1 ? ok('the farm\'s last stores: a rations check, Rations +1 once (the chapter\'s anchor)') : no('stores ' + JSON.stringify(fs));
p3.area === 'b9_c3_camp' && p3.ph === 3 && p3.arrive && p3.noKey && p3.saying && p3.orders === 1 && p3.notNow && p3.keyOn ? ok('the second night: Thallo passes on what a marines\' sergeant said, secondhand ("surviving isn\'t what this is about"), and the captain\'s word on the sick') : no('night2 ' + JSON.stringify(p3));
w.opts === 4 && w.html && w.notNow && w.none && w.squad && w.adjunct && w.column && w.stands && w.fire ? ok('the Witness beat at the fever-fire: three answers (the squad, the Adjunct\'s word: kept; the column\'s going: doubt), each recorded in S.b9.wit.c3; Not now records nothing; the first answer stands') : no('witness ' + JSON.stringify(w));
k.node === 'b9_c3_carts' && k.boil && k.press && k.notYet && k.html && k.brask && k.sick ? ok('the key at the fever-carts: boil, press, Not yet; Rations shown; Brask and the sick acknowledged') : no('key ' + JSON.stringify(k));
b.key === 'boil' && b.rat === -1 && b.notNow && b.broke && b.notNow2 && b.area === 'b9_c3_edge' && b.ph === 4 && b.notYet && b.html && b.brask && b.end && b.end.view === 'end' && b.end.ch === 'boil' && b.end.keyFlag === 'boil' && b.end.sickFlag === f.sick && b.end.lvl >= 20 && b.end.endText === 'The fever broken' && b.end.extras >= 5 && b.end.journal >= 6
  ? ok(`key boil: Rations −1 (fuel and time), the fever broken, two days behind the column; the end on boil at level ${b.end.lvl} (${b.end.xp} xp), Rations ${b.end.rat}`) : no('boil ' + JSON.stringify(b).slice(0, 900));
u.rumour && u.noMeat && u.notNow && u.notNow2 && u.near && u.fight && u.fight.started && u.fight.foes === 4 && u.fight.after === 'b9_c3_road_after' && u.done === 1 && u.knife && u.harro && f4.html && f4.on && f4.notNow && f4.rest && f4.lines === f4.here
  ? ok('the Wastes\' edge: Duvo (the Barghast war on the Akryn as news; no second +1 after the farm), raiders on his horses (optional; a "yes, but" on the tracks), the Akrynnai knife; Harro again; the fire at the last water with a line each') : no('edge ' + JSON.stringify({u, f4}).slice(0, 900));
p.key === 'press' && p.rat === 1 && p.notNow && p.fever && p.area === 'b9_c3_edge' && p.noMeat && p.feverAfterRest && p.edgeSick && p.walks && p.end && p.end.view === 'end' && p.end.ch === 'press' && p.end.endText === 'The column\'s pace' && p.end.extras
  ? ok(`key press, from the same moment: Rations +1 (kept our place at the wagons); the sick one carries the fever to the fire and onto the Wastes (a rest does not clear it); the end on press, Rations ${p.end.rat}`) : no('press ' + JSON.stringify(p).slice(0, 900));
dv.meat && dv.rations && dv.near === 3 && dv.up === 1 && dv.found === 'duvo' && dv.knife ? ok('Duvo instead of the farm: the horse-meat is a rations check (its "yes, but": three silver), Rations +1 when the farm gave nothing; the knife for sale') : no('duvo ' + JSON.stringify(dv));
y.renderErr && !y.renderErr.length && y.sick && y.fever && y.notHealer && y.rat === 5 && y.reader === 'marrow' && y.lines === y.here && y.lines4 === y.here && y.doss && y.wenna && y.noTangle && y.street && y.drill && !y.audit.noNear.length && !y.audit.noStay.length && y.reload
  ? ok(`a --from=3 style transfer save (Tangle dead; Doss and Brask walking, Wenna at camp; street, drill): every node renders, the fever falls on ${y.sick}, the march eats 2 (Rations ${y.rat}); a line each at both fires (${y.lines}); Ch 1's household and Ch 2's drill as camp talk; the save reloads with both halves`) : no('transfer ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b9ch3: FAIL (${bad.length})` : 'b9ch3: all ok'); process.exit(bad.length ? 1 : 0);
