// Book Nine, Chapter 2 (The Escort, src/162_b9_ch2.js): the Letherii's halts, both keys from the same moment with the Finadd on the last
// day, the reading at the tailboard (the Tiles; and the card node the visions pass hooks onto), the fire (Rations shown, a rest, a line
// each, Not now), Brennet's join at the wagons (or waiting with the train when six walk), every fight's start and a forced win (the drill,
// a survive fight; the corporal's bout; both grounds of the train's yard), the trick behind its ✦ hard check (taught, free, and its battle
// half), the items (each with art), the Rations moves (wagons +2 once; the ambush's "yes, but" −1), "Not now" on every onward step and a
// "yes, but" on every check, from a fresh start and from a --from=2 style transfer save (Perrit dead; Ilsa and Sorvan walking).
// Usage: node tools/b9ch2_test.mjs   (build first; exit 1 on a failure)
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
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('dod'); b9Use('l'); startExplore(area); };
  /* a forced win, through the engine's own endBeat; a fight with a second ground goes through stageBreak */
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark; res.survive = !!(B.def.objective && B.def.objective.type === 'survive');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b9_c2_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Tarr\b|Cuttle|Hedge|Bavedict|Keneb|Blistig|Errant|Brys|Henar|Ublala|Kalam|Tehol|\bweeks\b|\bmonths\b|Glass Desert|Forkrul|Chancel/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set();
    const keep = JSON.stringify(S.f);
    [1, 2, 3, 4, 5].forEach(ph => ['wagons', 'drill', null].forEach(k => [0, 1].forEach(fl => { S.f.b9_c2_ph = ph; S.f.b9_c2_key = k;
      ['b9_c2_orders1', 'b9_c2_drillDone', 'b9_c2_wagonsDone', 'b9_c2_counted', 'b9_c2_keyDone', 'b9_c2_redrillDone', 'b9_c2_orla'].forEach(f => { S.f[f] = fl ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Fresh'); S.picksDue = []; save(); startChapter(2); S.picksDue = []; save();
  const thirdKeep = JSON.stringify(S.th.t && S.th.t.squad);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, xp0:S.xp, rat0:b9Rations(), squad:S.squad.join(','), name:S.name, renderErr:renderAll(), title:CHAPTERS[2].title, nodes:nodes.length, areas:CHAPTERS[2].areas.length, fights:Object.keys(CHAPTERS[2].battles).length,
    shelf:BOOKS.dod.coming, items:Object.keys(CHAPTERS[2].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)),
    itemN:Object.keys(CHAPTERS[2].gear).length, coat:ITEMS.b9_c2_carterscoat && ITEMS.b9_c2_carterscoat.slot === 'armour' && ITEMS.b9_c2_carterscoat.role === 'light' && ITEMS.b9_c2_carterscoat.ac >= 1,
    tally:ITEMS.b9_c2_tallystick && ITEMS.b9_c2_tallystick.slot === 'trinket', spear:ITEMS.b9_c2_escortspear && ITEMS.b9_c2_escortspear.slot === 'weapon' && ITEMS.b9_c2_escortspear.role === 'reach',
    figs:['brennet', 'b9_c2_orla', 'b9_c2_saffa'].every(k => typeof FIGX[k] === 'function'), ground:typeof TILEX.b9_c2_muster === 'function',
    scenes:['b9_muster', 'b9_wagons', 'b9_c2_yardnight', 'b9_c2_road'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.dod[2] || []).includes('b9_c2_fire'), audit:audit(), docks:/dock/.test(b9Coin(3))};
  /* draw every backdrop once at phone size (no page errors) */
  { const cv = document.createElement('canvas'); cv.width = 390; cv.height = 300; ['b9_muster', 'b9_wagons', 'b9_c2_yardnight', 'b9_c2_road'].forEach(k => SCENEX[k](cv, 1000)); S.f.b9_c2_ph = 2; SCENEX.b9_muster(cv, 1000); S.f.b9_c2_ph = 1; }
  /* the start: the evening, the reading among the first halt's choices */
  talk('b9_c2_start'); out.f.ph = S.f.b9_c2_ph; out.f.tiles = has('b9_c2_start', /Sit with Perrit and the tiles/); out.f.eve = /lamps/i.test(DLG.b9_c2_start().txt) && /evening/.test(SCENES.b9_muster.cap);
  talk('b9_c2_read'); const rd = DLG.b9_c2_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b9_c2_drawn, reader:S.f.b9_c2_reader, inPool:B9POOL[2].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B9READ[2].back, cardNode:cardNodeName(), cardSp:DLG.b9_c2_card().sp, cardBack:DLG.b9_c2_card().ch[0].go, again:!has('b9_c2_fire', /Sit with/), tile:!!b9Tile() || B5TILES[S.card] != null};
  /* the Finadd's word */
  talk('b9_c2_ennic'); out.e1 = {orders:S.f.b9_c2_orders1, notNow:has('b9_c2_ennic', /Not now/), kolanse:false}; take('b9_c2_ennic', /Where are we going/); out.e1.kolanse = /Kolanse/.test(DLG.b9_c2_ennic_where().txt);
  talk('b9_c2_fire'); out.e1.noTurn = !has('b9_c2_fire', /Turn in/);
  /* the wagons: Brennet joins at the first halt */
  talk('b9_c2_wagonline'); out.b = {notNow:has('b9_c2_wagonline', /Not now/)}; take('b9_c2_wagonline', /Why the Sixth/); out.b.chit = /debt-chit/.test(DLG.b9_c2_brennet_why().txt);
  take('b9_c2_brennet_why', /Walk with us/); clearModal(); out.b = Object.assign(out.b, {in:b9In('brennet'), flag:S.f.b9_brennetDone, lvl:S.lvl, line:/Brennet/.test(DLG.b9_c2_fire_talk().txt), god:PATRONS.brennet ? PATRONS.brennet.god : null});
  /* Yelt's count (a "yes, but": rattled), then made */
  talk('b9_c2_yelt'); out.y = {notNow:has('b9_c2_yelt', /Not now/), rations:!!vis('b9_c2_yelt').find(c => c.check).rations};
  { const sn = JSON.stringify(S); near('b9_c2_yelt', /Go down the wagons/, 'brennet'); out.y.near = !!(S.rattled || {}).brennet; restore(sn, 'b9_c2_ground'); }
  made('b9_c2_yelt', /Go down the wagons/, 'brennet'); out.y.found = S.f.b9_c2_found;
  /* Orla's cart (a "yes, but": skin), the coat */
  talk('b9_c2_cart'); out.o = {notNow:has('b9_c2_cart', /Not now/)};
  { const sn = JSON.stringify(S); near('b9_c2_cart', /lift it out/, 'thegg'); out.o.near = ((S.bruised || {}).thegg || 0) > 0; restore(sn, 'b9_c2_ground'); }
  made('b9_c2_cart', /lift it out/, 'thegg'); out.o.coat = S.kit.includes('b9_c2_carterscoat') && S.f.b9_c2_orla === 'out';
  talk('b9_c2_saffa'); talk('b9_c2_oxen'); talk('b9_c2_barrels'); talk('b9_c2_tailboard'); out.o.tw = !has('b9_c2_tailboard', /Sit with/);
  /* the fire on the first evening */
  talk('b9_c2_fire'); const f1 = DLG.b9_c2_fire(); out.fire1 = {html:/Rations/.test(f1.html || ''), talk:has('b9_c2_fire', /Talk with the squad/), rest:has('b9_c2_fire', /rest/), turn:has('b9_c2_fire', /Turn in/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t), brennet:/Brennet/.test(f1.txt)};
  out.fire1.lines = DLG.b9_c2_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {thegg:4}; take('b9_c2_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b9_c2_rest1 === 1;
  take('b9_c2_fire', /Turn in/); out.fire1.notYet = has('b9_c2_turnin', /Not yet/); take('b9_c2_turnin', /First light/);
  /* ================= phase 2: the drill field ================= */
  out.d = {area:S.area, ph:S.f.b9_c2_ph, arrive:S.node === 'b9_c2_field_arrive', backShut:!has('b9_c2_field_back', /Dusk/), scene:/Malazan sergeant walking/.test(SCENES.b9_muster.cap)};
  take('b9_c2_field_arrive', /Malazan sergeant/); out.d.notNow = has('b9_c2_sergeant', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c2_sergeant', /Answer him back/, 'pessa' in TPL && b9In('pessa') ? 'pessa' : 'tobet'); out.d.near = Object.values(S.bruised || {}).some(v => v > 0); restore(sn, 'b9_c2_field'); }
  made('b9_c2_sergeant', /Answer him back/, 'sgt'); out.d.back = S.f.b9_c2_back === 1;
  out.d.fight = await force('b9_c2_drill'); out.d.done = S.f.b9_c2_drillDone;
  /* the trick: the step */
  take('b9_c2_drill_after', /Show us the step/); const tc = vis('b9_c2_sergeant_after').find(c => c.trick);
  out.t = {dc:tc && tc.check[1], stat:tc && tc.check[0], noNear:tc && !tc.near, notNow:has('b9_c2_sergeant_after', /Not now/), brennet:(edgesFor(tc, 'brennet').find(e => /ox team/.test(e[0])) || [])[1] || 0, sorvan:(edgesFor(tc, 'sorvan').find(e => /Bluerose/.test(e[0])) || [])[1] || 0, sgt:(edgesFor(tc, 'sgt').find(e => /Whitefinders/.test(e[0])) || [])[1] || 0};
  made('b9_c2_sergeant_after', /Learn the step/, 'brennet');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b9_c2_step && S.tricks.b9_c2_step.who, ok:S.f.b9_c2_stepOk, free:!!AB.t_b9_c2_step.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b9_c2_step.fx), again:!has('b9_c2_sergeant_after', /Learn/)});
  /* the rumour, and one line of the other squad */
  talk('b9_c2_heavy'); out.d.rumour = /ghost/.test(DLG.b9_c2_heavy().txt) && /recruiting/i.test(DLG.b9_c2_heavy().txt) && /squad lent to the heavies/.test(DLG.b9_c2_heavy().txt);
  /* the corporal's bout (optional) and the trick's battle half */
  talk('b9_c2_corporal'); out.v = {notNow:has('b9_c2_corporal', /Not now/)};
  startBattle('b9_c2_bout', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'brennet'); out.t.offered = trickOk(u, AB.t_b9_c2_step); AB.t_b9_c2_step.run(u); out.t.on = !!B.b9step && B.b9step.u === u;
    const foe = B.units.find(x => x.side === 'e'); const ac0 = atkCalc(foe, u, {}).ac; B.b9step = null; const ac1 = atkCalc(foe, u, {}).ac; out.t.ac = ac0 - ac1; }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b9_c2_field');
  out.v.fight = await force('b9_c2_bout'); out.v.done = S.f.b9_c2_boutDone;
  /* back to the lines at dusk: the train's yard */
  talk('b9_c2_field_back'); out.d.dusk = has('b9_c2_field_back', /Dusk/) && has('b9_c2_field_back', /Not now/); take('b9_c2_field_back', /Dusk/);
  out.w = {area:S.area, ph:S.f.b9_c2_ph, arrive:S.node === 'b9_c2_yard_arrive', thieves:AREAS.b9_c2_yard.npcs.find(n => n.id === 'thieves').show(), backShut:!has('b9_c2_yard_back', /last day/)};
  talk('b9_c2_thieves'); out.w.notNow = has('b9_c2_thieves', /Not now/);
  { const sn = JSON.stringify(S), r0 = b9Rations(); near('b9_c2_thieves', /Come round behind the oxen/, 'tobet'); out.w.near = b9Rations() - r0; restore(sn, 'b9_c2_yard'); }
  out.w.fight = await force('b9_c2_wagons', {surprise:'p'}); out.w.done = S.f.b9_c2_wagonsDone; out.w.spear = S.kit.includes('b9_c2_escortspear');
  take('b9_c2_wagons_after', /Yelt/); out.w.tally = S.kit.includes('b9_c2_tallystick') && S.f.b9_c2_counted === 1; out.w.yeltNot = has('b9_c2_yelt_night', /Not now/);
  take('b9_c2_yelt_night', /last day/); out.k = {area:S.area, ph:S.f.b9_c2_ph, arrive:S.node === 'b9_c2_last_arrive'};
  /* ================= phase 4: the key, from the Finadd ================= */
  talk('b9_c2_fire'); out.k.noMarch = !has('b9_c2_fire', /The march/);
  take('b9_c2_last_arrive', /The Finadd/); const kn = DLG.b9_c2_ennic4();
  out.k = Object.assign(out.k, {wagons:has('b9_c2_ennic4', /The wagons/), drill:has('b9_c2_ennic4', /The square/), notYet:has('b9_c2_ennic4', /Not yet/), html:/Rations/.test(kn.html || ''), brennet:/Brennet/.test(kn.txt), thegg:/Thegg/.test(kn.txt)});
  const snapK = JSON.stringify(S), ratK = b9Rations(), loyK = S.loy.thegg;
  /* ================= key: wagons ================= */
  take('b9_c2_ennic4', /The wagons/); out.g = {key:S.f.b9_c2_key, ph:S.f.b9_c2_ph, drilled:S.f.b9_c2_drilled == null, thegg:S.loy.thegg - loyK, rat:b9Rations() - ratK};
  take('b9_c2_key_wagons', /To the train/); out.g.loadNot = has('b9_c2_load', /Not now/); out.g.loadHtml = /Rations/.test(DLG.b9_c2_load().html || ''); out.g.rations = !!vis('b9_c2_load').find(c => c.check).rations;
  { const sn = JSON.stringify(S); near('b9_c2_load', /Load the brigade/, 'brennet'); out.g.near = ((S.bruised || {}).brennet || 0) > 0; restore(sn, 'b9_c2_last'); }
  made('b9_c2_load', /Load the brigade/, 'brennet'); out.g.rat2 = b9Rations() - ratK; out.g.tier = b9RatTier(); out.g.keyDone = S.f.b9_c2_keyDone; talk('b9_c2_loaded'); out.g.once = b9Rations() - ratK;
  talk('b9_c2_fire'); out.g.march = has('b9_c2_fire', /The march/) && has('b9_c2_fire', /Not now/); out.g.lines = DLG.b9_c2_fire_talk().txt.split('\n\n').length; out.g.here = S.squad.filter(id => id !== 'sgt').length;
  take('b9_c2_fire', /The march/); out.g.notYet = has('b9_c2_onward', /Not yet/); out.g.brennet = /Brennet walks beside/.test(DLG.b9_c2_onward().txt); out.g.html = /Rations/.test(DLG.b9_c2_onward().html || '');
  const ratG = b9Rations(); take('b9_c2_onward', /East/); await wait(60);
  out.g.end = {view, ch:S.chapters[2], lvl:S.lvl, xp:S.xp, rat:ratG, extras:CHAPTERS[2].extras().length, journal:CHAPTERS[2].journal().length, endText:(CHEND[2] || {}).wagons && CHEND[2].wagons[0], keyFlag:S.f.b9_c2_key, third:JSON.stringify(S.th.t && S.th.t.squad) === thirdKeep || JSON.stringify(S.squad) === thirdKeep};
  /* ================= key: drill, from the same moment ================= */
  restore(snapK, 'b9_c2_last'); S.chapter = 2;
  take('b9_c2_ennic4', /The square/); out.q = {key:S.f.b9_c2_key, drilled:S.f.b9_c2_drilled, ph:S.f.b9_c2_ph, thegg:S.loy.thegg - loyK, rat:b9Rations() - ratK};
  take('b9_c2_key_drill', /drill field/); out.q.area = S.area; out.q.node = S.node; out.q.notNow = has('b9_c2_redrill', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c2_redrill', /Hold the line/, 'thegg'); out.q.near = ((S.bruised || {}).thegg || 0) > 0; restore(sn, 'b9_c2_field'); }
  made('b9_c2_redrill', /Hold the line/, 'thegg'); out.q.done = S.f.b9_c2_redrillDone === 1 && S.f.b9_c2_keyDone === 1; out.q.doneNot = has('b9_c2_redrill_done', /Not now/);
  take('b9_c2_redrill_done', /muster ground/); out.q.back = S.area;
  talk('b9_c2_load'); out.q.noLoad = !vis('b9_c2_load').some(c => c.check);
  talk('b9_c2_fire'); take('b9_c2_fire', /The march/); out.q.sgt = /knows the step/.test(DLG.b9_c2_onward().txt);
  const ratQ = b9Rations(); take('b9_c2_onward', /East/); await wait(60);
  out.q.end = {view, ch:S.chapters[2], rat:ratQ, lvl:S.lvl, extras:CHAPTERS[2].extras().some(x => /more drill/.test(x)), endText:CHEND[2].drill[0]};
  /* ================= a --from=2 style transfer save: Perrit dead; Ilsa and Sorvan walking (six walk), so Brennet waits ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Syn'); S.picksDue = []; save(); startChapter(2); S.picksDue = [];
  S.squad = ['sgt', 'tobet', 'thegg', 'ammet', 'ilsa', 'sorvan']; S.dead.perrit = {ch:6, where:'the river', from:'rg'};
  ['ilsa', 'sorvan'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.imported = {from:'Syn', sid:'x', lvl:12, mates:['tobet', 'thegg', 'ammet', 'ilsa', 'sorvan'], lifted:false}; S.lvl = 12; S.xp = LEVELS[11]; save();
  out.y2 = {renderErr:renderAll(), reader:b9Rd().id, lines:DLG.b9_c2_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ilsa:/Ilsa/.test(DLG.b9_c2_fire_talk().txt), sorvan:/Sorvan/.test(DLG.b9_c2_fire_talk().txt), noPerrit:!/Perrit/.test(DLG.b9_c2_fire_talk().txt), tiles:has('b9_c2_tailboard', /Sit with the tile-woman/)};
  S.f.b9_c2_ph = 4; out.y2.lines4 = DLG.b9_c2_fire_talk().txt.split('\n\n').length; S.f.b9_c2_ph = 1;
  talk('b9_c2_wagonline'); take('b9_c2_wagonline', /Walk with us/); out.y2.brennet = {flag:S.f.b9_brennetDone, in:b9In('brennet'), wait:ROSTER_BOOKS.dod.wait('brennet'), npc:AREAS.b9_c2_ground.npcs.find(n => n.id === 'brennet').show(), text:/six already walk/.test(DLG.b9_c2_brennet_join().txt)};
  S.f.b9_c2_orders1 = 1; talk('b9_c2_fire'); out.y2.turn = has('b9_c2_fire', /Turn in/);
  out.y2.audit = audit();
  /* the save goes round a reload with both halves */
  save(); const sid = S.sid; const back = loadSlot(sid); out.y2.reload = !!back && back.thread === 'l' && !!back.th && !!back.th.t && back.squad.includes('ilsa');
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, e1 = r.e1 || {}, b = r.b || {}, y = r.y || {}, o = r.o || {}, f1 = r.fire1 || {}, d = r.d || {}, t = r.t || {}, v = r.v || {}, w = r.w || {}, k = r.k || {}, g = r.g || {}, q = r.q || {}, y2 = r.y2 || {};
if (f.area) {
  f.area === 'b9_c2_ground' && f.ch === 2 && f.thread === 'l' && f.lvl0 === 11 && f.rat0 === 6 && f.squad === 'sgt,tobet,thegg,perrit,ammet' && f.name === 'Fresh' && !f.renderErr.length && f.title === 'The Escort' && f.shelf === false && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 3 && f.coat && f.tally && f.spear && f.figs && f.ground && f.scenes && f.fireRoster && f.docks
    ? ok(`a fresh start opens Chapter Two on the muster ground: the Letherii at level 11, Rations 6; every b9_c2 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with art and roles, no numbers in their lines; Brennet, Orla and Saffa drawn; the ground; four backdrops`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 6 && au.tricks >= 1 && au.tricks <= 2 && !au.noNear.length && au.onwards >= 6 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.tiles && f.eve ? ok('the start: the first evening, the drill over, the reading offered at the first halt (the backdrop and its caption at evening)') : no('start ' + JSON.stringify(f).slice(0, 300));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.back === 'b9_c2_fire' && rd.cardNode === 'b9_c2_card' && rd.cardSp === 'The Tiles of the Holds' && rd.cardBack === 'b9_c2_fire' && rd.again ? ok('the reading at the tailboard: Perrit lays the tiles from B9POOL[2]; the card node is the visions pass\'s hook (b9_c2_card); back to b9_c2_fire; offered once') : no('reading ' + JSON.stringify(rd));
e1.orders === 1 && e1.notNow && e1.kolanse && e1.noTurn ? ok('the Finadd: the escort\'s word (the Commander\'s new companies, headline), Kolanse said and nothing of it; no turning in until Brennet is settled') : no('ennic ' + JSON.stringify(e1));
b.notNow && b.chit && b.in && b.flag === 1 && b.line && b.god == null ? ok('Brennet joins at the wagons, the first halt (his cancelled debt-chit; no god), with his line at the fire') : no('brennet ' + JSON.stringify(b));
y.notNow && y.rations && y.near && y.found === 1 ? ok('Yelt\'s ration book: the lost barrels (a rations check; its "yes, but": rattled)') : no('yelt ' + JSON.stringify(y));
o.notNow && o.near && o.coat && o.tw ? ok('Orla\'s water-cart out of the ditch (a "yes, but": skin), the carter\'s coat; Saffa, the oxen, the barrels, the tile-woman') : no('orla ' + JSON.stringify(o));
f1.html && f1.talk && f1.rest && f1.turn && f1.notNow && f1.brennet && f1.lines === f1.here && f1.rested && f1.notYet ? ok(`the fire on the first evening: Rations shown, a rest (wounds close), the talk (a line each, ${f1.lines}), Brennet acknowledged, turning in with Not yet beside it`) : no('fire1 ' + JSON.stringify(f1));
d.area === 'b9_c2_field' && d.ph === 2 && d.arrive && d.backShut && d.scene && d.notNow && d.near && d.back && d.fight && d.fight.started && d.fight.survive && d.fight.foes === 3 && d.fight.after === 'b9_c2_drill_after' && d.done === 1 && d.rumour && d.dusk
  ? ok('the drill field by day: the Malazan sergeant\'s needling (a "yes, but": shields held out), the drill (a survive fight, the Letherii\'s first), the rumour and one line of the other squad; dusk with Not now') : no('drill ' + JSON.stringify(d).slice(0, 700));
t.dc === 18 && t.stat === 'wits' && t.noNear && t.notNow && t.brennet === 2 && t.sorvan === 2 && t.sgt === 1 && t.who === 'brennet' && t.ok === 1 && t.free && t.words && t.again && t.offered && t.on && t.ac > 0 ? ok(`the trick: The Malazan Step, a ✦ wits 18 check that names the ox team, Bluerose and the Whitefinders' parade step; free (its words end on the one-free-trick line); in a fight it holds the line (+${t.ac} armour)`) : no('trick ' + JSON.stringify(t));
v.notNow && v.fight && v.fight.started && v.fight.after === 'b9_c2_bout_after' && v.done === 1 ? ok('the corporal\'s bout (optional): wooden swords, a handshake after') : no('bout ' + JSON.stringify(v));
w.area === 'b9_c2_yard' && w.ph === 3 && w.arrive && w.thieves && w.backShut && w.notNow && w.near === -1 && w.fight && w.fight.started && w.fight.dark && w.fight.stage2 && w.fight.inStage2 && w.fight.allies === 1 && w.fight.after === 'b9_c2_wagons_after' && w.done === 1 && w.spear && w.tally && w.yeltNot
  ? ok(`the train's yard at night: thieves at the water barrels (${w.fight.foes} foes, an escort sentry beside the squad, a "yes, but" on the ambush: a ration gone), between the wagons; the escort spear; Yelt's count and his spare tally`) : no('wagons ' + JSON.stringify(w).slice(0, 900));
k.area === 'b9_c2_last' && k.ph === 4 && k.arrive && k.noMarch && k.wagons && k.drill && k.notYet && k.html && k.brennet && k.thegg ? ok('the key on the last day, from the Finadd: wagons, drill, Not yet; Rations shown; Brennet and Thegg acknowledged') : no('key ' + JSON.stringify(k));
g.key === 'wagons' && g.ph === 5 && g.drilled && g.thegg === 0 && g.rat === 0 && g.loadNot && g.loadHtml && g.rations && g.near && g.rat2 === 2 && g.tier === 'full' && g.keyDone === 1 && g.once === 2 && g.march && g.lines === g.here && g.notYet && g.brennet && g.html && g.end && g.end.view === 'end' && g.end.ch === 'wagons' && g.end.keyFlag === 'wagons' && g.end.lvl >= 12 && g.end.rat === 8 && g.end.extras >= 5 && g.end.journal >= 7 && g.end.endText === 'The wagons loaded true' && g.end.third
  ? ok(`key wagons: the loading with Yelt and Orla (a rations check; a "yes, but": skin), Rations +2 once (to ${g.tier}); out of the gate behind the foreigners (Not yet offered; Brennet walks); level ${g.end.lvl} (${g.end.xp} xp), Rations ${g.end.rat}; the Third's half untouched`) : no('wagons key ' + JSON.stringify(g).slice(0, 1000));
q.key === 'drill' && q.drilled === 1 && q.ph === 5 && q.thegg === 1 && q.rat === 0 && q.area === 'b9_c2_field' && q.node === 'b9_c2_redrill' && q.notNow && q.near && q.done && q.doneNot && q.back === 'b9_c2_last' && q.noLoad && q.sgt && q.end && q.end.view === 'end' && q.end.ch === 'drill' && q.end.rat === 6 && q.end.lvl >= 12 && q.end.extras && q.end.endText === 'Back for more'
  ? ok(`key drill, from the same moment: Thegg +1, S.f.b9_c2_drilled; back to the square (a "yes, but": skin), "You'll do"; no ration move; the end on drill, Rations ${q.end.rat}`) : no('drill key ' + JSON.stringify(q).slice(0, 900));
y2.renderErr && !y2.renderErr.length && y2.reader === 'tilewoman' && y2.tiles && y2.lines === y2.here && y2.lines4 === y2.here && y2.ilsa && y2.sorvan && y2.noPerrit && y2.brennet && y2.brennet.flag === 2 && !y2.brennet.in && y2.brennet.wait && y2.brennet.npc && y2.brennet.text && y2.turn && !y2.audit.noNear.length && !y2.audit.noStay.length && y2.reload
  ? ok(`a --from=2 style transfer save (Perrit dead; Ilsa and Sorvan walking): every node renders, the tile-woman reads, a line each at the fire by evening and by day (${y2.lines}); six walk, so Brennet waits with the train and the night still opens; the save reloads with both halves`) : no('transfer ' + JSON.stringify(y2).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b9ch2: FAIL (${bad.length})` : 'b9ch2: all ok'); process.exit(bad.length ? 1 : 0);
