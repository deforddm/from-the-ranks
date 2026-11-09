// Book Eight, Chapter 2 (The Black Coral Road, src/142_b8_ch2.js): the halts, both keys from the same moment at the fire, the reading on the
// wagon's tailboard (Tuft; and the card node the visions pass hooks onto), the fire (the Contract shown, a rest, a line each, the roster,
// Not now), every fight's start and a forced win (the raid; both grounds of the town and of the fields, pollen:true on the fields), the trick
// behind a hard check (taught, free, and its battle half), the items (each with art; the jug placed), Vasso on 'quiet' at the first halt
// (joins, waits then joins, or goes back), the kelyk thread (the last wagon, the back door, the loading, the jug, Calder's answer), the key's
// silver and S.f.b8_c2_kelyk, the Contract untouched (Ch 2 moves none), "Not now" on every onward step and a "yes, but" on every check,
// from a fresh 'quiet' start and from a --from=2 style save (Vasso walking; Tuft dead, Ohl at the door, Vell and Ellis walking: Benna reads).
// Usage: node tools/b8ch2_test.mjs   (build first; exit 1 on a failure)
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
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('tth'); S.chapter = 2; startExplore(area); };
  /* a forced win, through the engine's own endBeat; a fight with a second ground goes through stageBreak */
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.pollen = !!B.def.pollen; res.guild = !!B.def.guild; res.style = B.def.style;
    res.kinds = B.units.filter(u => u.side === 'e').map(u => u.key || u.kind).join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.pollen2 = !!(B && B.def.pollen); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b8_c2_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Seerdomin|Seba|Krute|Picker|Mallet|Bluepearl|Antsy|Blend\b|Murillio|Kruppe|Nimander|Kallor|Bastion|Heath\b|Gothos|Clip\b|Kellanved|Dancer|Laseen|Burn's Sleep|\b11\d\d\b|\b(two|three|four|five|six|seven|eight|nine|ten|\d+) weeks\b|\b(two|three|four|five|six|\d+) months\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but"; every onward step has a "Not now" (or "Not yet") beside it; under every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), onwards = new Set();
    const ph0 = S.f.b8_c2_ph, k0 = S.f.b8_c2_key, d0 = S.f.b8_c2_fieldsDone, t0 = S.f.b8_c2_townDone;
    [1, 2, 3, 4, 5, 6].forEach(ph => ['fields', 'pass', null].forEach(k => [0, 1].forEach(dn => { S.f.b8_c2_ph = ph; S.f.b8_c2_key = k; S.f.b8_c2_fieldsDone = dn; S.f.b8_c2_townDone = dn;
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f.b8_c2_ph = ph0; S.f.b8_c2_key = k0; S.f.b8_c2_fieldsDone = d0; S.f.b8_c2_townDone = t0; return {checks:checks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start, after Chapter 1 on 'quiet' (Vasso unsettled) ================= */
  setBook('tth'); S = newStateTTH('Fresh'); S.f.b8_c1_key = 'quiet'; S.chapters = {1:'quiet'}; S.picksDue = []; save(); startChapter(2);
  const con0 = b8Contract();
  out.f = {area:S.area, ch:S.chapter, lvl0:S.lvl, renderErr:renderAll(), title:CHAPTERS[2].title, number:CHAPTERS[2].number, nodes:nodes.length, areas:CHAPTERS[2].areas.length, fights:Object.keys(CHAPTERS[2].battles).length,
    items:Object.keys(CHAPTERS[2].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && ITEMS[k].line && !/\d/.test(ITEMS[k].line)) && !!ART['item/b8_kelykjug'],
    itemN:Object.keys(CHAPTERS[2].gear).length, mail:ITEMS.b8_c2_caravanmail && ITEMS.b8_c2_caravanmail.slot === 'armour' && ITEMS.b8_c2_caravanmail.role === 'mail' && ITEMS.b8_c2_caravanmail.ac === 3,
    goad:ITEMS.b8_c2_drovergoad && ITEMS.b8_c2_drovergoad.slot === 'weapon' && ITEMS.b8_c2_drovergoad.role === 'reach' && ITEMS.b8_c2_drovergoad.reach === true,
    figs:['b8_c2_calder', 'b8_c2_carter', 'b8_c2_drover', 'vasso'].every(k => typeof FIGX[k] === 'function'),
    tiles:['b8_c2_camp', 'b8_c2_road', 'b8_c2_town', 'b8_c2_fields', 'b8_c2_rowsb'].every(k => typeof TILEX[k] === 'function'),
    scenes:['b8_road_east', 'b8_fields', 'b8_caravan_night', 'b8_c2_town', 'b8_c2_rows'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.tth[2] || []).includes('b8_c2_fire'), read:B8READ[2] && B8READ[2].back === 'b8_c2_fire' && !!B8READ[2].say.benna && !!B8READ[2].say.sohra && !!B8READ[2].say.tuft, audit:audit()};
  /* the art draws (each backdrop on a canvas, each ground tile) without throwing */
  { const cv = document.createElement('canvas'); cv.width = 390; cv.height = 240; document.body.appendChild(cv); let e = null;
    try { ['b8_road_east', 'b8_fields', 'b8_caravan_night', 'b8_c2_town', 'b8_c2_rows'].forEach(k => SCENEX[k](cv, 1000));
      const c2 = cv.getContext('2d'); [['b8_c2_camp', 'K#WF=h.,'], ['b8_c2_road', 'WL.,#x'], ['b8_c2_town', '#Tw.,'], ['b8_c2_fields', 'gyeKWF.,'], ['b8_c2_rowsb', ',.#']].forEach(([k, chs]) => [...chs].forEach((ch, i) => TILEX[k](c2, ch, i, 1, 24, true))); } catch (er) { e = er.message; }
    out.f.drawErr = e; cv.remove(); }
  /* the start: the first halt, the reading, Vasso at the edge */
  talk('b8_c2_start'); out.s = {ph:S.f.b8_c2_ph, deck:has('b8_c2_start', /Sit with Tuft/), vasso:has('b8_c2_start', /young man/), came:S.f.b8_c2_vassoCame, walk:has('b8_c2_start', /Walk the ring/)};
  talk('b8_c2_read'); const rd = DLG.b8_c2_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b8_c2_drawn, reader:S.f.b8_c2_reader, card:S.card, inPool:B8POOL[2].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), cardNode:cardNodeName(), cardSp:DLG.b8_c2_card().sp, cardBack:DLG.b8_c2_card().ch[0].go};
  /* the fire before Vasso is settled: no sleep */
  talk('b8_c2_fire'); const f1 = DLG.b8_c2_fire(); out.fire1 = {html:/The Contract/.test(f1.html || ''), talk:has('b8_c2_fire', /Talk with the squad/), sleepShut:!has('b8_c2_fire', /Sleep/), rest:has('b8_c2_fire', /rest/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t)};
  out.fire1.lines = DLG.b8_c2_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  /* Vasso: the paper's words; the three answers */
  out.v = {npc:AREAS.b8_c2_camp.npcs.find(n => n.id === 'vasso2').show(), words:/The paper said Malazans\. The Guild doesn't ask which/.test(DLG.b8_c2_vasso().txt), notNow:has('b8_c2_vasso', /Not now/), road:/Do it on the road/.test(DLG.b8_c2_vasso().txt)};
  take('b8_c2_vasso', /Who paid/); out.v.who = /never knows who paid/.test(DLG.b8_c2_vasso_who().txt) && !/paid by/i.test(DLG.b8_c2_vasso_who().txt); take('b8_c2_vasso_who', /Then why/);
  const sv = JSON.stringify(S);
  take('b8_c2_vasso_why', /Ride with the wagons/); out.v.wait = {flag:S.f.b8_vassoDone, npc:AREAS.b8_c2_camp.npcs.find(n => n.id === 'vasso2').show(), sleep:has('b8_c2_fire', /Sleep/)};
  talk('b8_c2_vasso'); take('b8_c2_vasso', /Come to the fire/); clearModal(); out.v.wait.joined = b8In('vasso') && S.f.b8_vassoDone === 1;
  restore(sv, 'b8_c2_camp'); take('b8_c2_vasso_why', /Go back/); out.v.home = {flag:S.f.b8_vassoDone, gone:!b8In('vasso'), sleep:has('b8_c2_fire', /Sleep/), extras:CHAPTERS[2].extras().some(x => /walked back west/.test(x))};
  restore(sv, 'b8_c2_camp'); take('b8_c2_vasso_why', /Then sit down/); clearModal();
  out.v.join = {in:b8In('vasso'), flag:S.f.b8_vassoDone, fire:/Vasso/.test(DLG.b8_c2_fire_talk().txt), lines:DLG.b8_c2_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sleep:has('b8_c2_fire', /Sleep/)};
  /* Calder and the mail; the carters; the last wagon (its "yes, but", the peek) */
  talk('b8_c2_calder'); out.c = {mail:S.kit.includes('b8_c2_caravanmail'), notNow:has('b8_c2_calder', /Not now/)}; talk('b8_c2_calder'); out.c.once = S.kit.filter(k => k === 'b8_c2_caravanmail').length === 1;
  out.c.council = /not the Council's/.test(DLG.b8_c2_calder_job().txt); out.c.weeks = /weeks/.test(DLG.b8_c2_calder_road().txt); talk('b8_c2_carters'); out.c.carters = S.f.b8_c2_carters === 1 && /red scarf/.test(DLG.b8_c2_carters().txt);
  talk('b8_c2_wagon'); out.w = {seen:S.f.b8_c2_wagonSeen, sweet:/sweet/.test(DLG.b8_c2_wagon().txt), notNow:has('b8_c2_wagon', /Not now/)};
  const sw = JSON.stringify(S); near('b8_c2_wagon', /Lift a corner/, 'vasso'); out.w.near = !!(S.rattled || {}).vasso; restore(sw, 'b8_c2_camp');
  made('b8_c2_wagon', /Lift a corner/, 'vasso'); out.w.peek = S.f.b8_c2_peek === 1 && /jugs/.test(DLG.b8_c2_wagon_peek().txt);
  /* the fire, then sleep: the road */
  talk('b8_c2_fire'); out.fire2 = {sleep:has('b8_c2_fire', /Sleep/)}; take('b8_c2_fire', /Sleep/); out.fire2.ph = S.f.b8_c2_ph; take('b8_c2_morning', /On, east/); out.fire2.area = S.area;
  /* phase 2: the road; the riders (faced down, with its "yes, but"; or fought); the trick */
  out.road = {burning:/burning/.test(DLG.b8_c2_road_arrive().txt), npc:AREAS.b8_c2_road.npcs.find(n => n.id === 'riders').show()};
  talk('b8_c2_riders'); out.road.notNow = has('b8_c2_riders', /Not now/); out.road.paid = has('b8_c2_riders', /Calder pay/);
  const sr = JSON.stringify(S); near('b8_c2_riders', /Stand in the gap/, 'brisk'); out.road.near = ((S.bruised || {}).brisk || 0) > 0; restore(sr, 'b8_c2_road');
  made('b8_c2_riders', /Stand in the gap/, 'brisk'); out.road.faced = S.f.b8_c2_raidSettled === 1 && S.f.b8_c2_raidFaced === 1 && !AREAS.b8_c2_road.npcs.find(n => n.id === 'riders').show(); restore(sr, 'b8_c2_road');
  const cr = b8Contract(); out.raid = await force('b8_c2_raid'); out.raid.con = b8Contract() - cr; out.raid.done = S.f.b8_c2_raidDone === 1 && S.f.b8_c2_raidSettled === 1;
  startExplore('b8_c2_road');
  talk('b8_c2_brake'); const bc = vis('b8_c2_brake').find(c => c.trick); out.t = {dc:bc && bc.check[1], stat:bc && bc.check[0], notNow:has('b8_c2_brake', /Not now/), lore:/quartermaster/.test(DLG.b8_c2_brake().txt), seen:S.f.b8_c2_brakeSeen};
  const sb = JSON.stringify(S); near('b8_c2_brake', /Learn the brake/, 'kettle'); out.t.near = ((S.bruised || {}).kettle || 0) > 0; restore(sb, 'b8_c2_road');
  made('b8_c2_brake', /Learn the brake/, 'brisk');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b8_c2_brake && S.tricks.b8_c2_brake.who, ok:S.f.b8_c2_brakeOk, free:!!AB.t_b8_c2_brake.free, words:/It does not use the action \(one free trick a turn\)\.$/.test(TRICKS.b8_c2_brake.fx), again:!has('b8_c2_brake', /Learn/)});
  /* the trick's battle half (the Line's B.line) */
  startBattle('b8_c2_raid', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'brisk'); out.t.offered = trickOk(u, AB.t_b8_c2_brake); AB.t_b8_c2_brake.run(u); out.t.line = !!B.line && B.line.u === u; }
  B = null; view = 'scene'; S.scene = 'talk'; startExplore('b8_c2_road');
  /* phase 3: the town; the back door; the well and the woman; the priest (its "yes, but"; the fight, two grounds) */
  talk('b8_c2_to_town'); out.town = {notNow:has('b8_c2_to_town', /Not now/)}; take('b8_c2_to_town', /On to the town/); out.town.area = S.area; out.town.ph = S.f.b8_c2_ph; out.town.seen = S.f.b8_c2_townSeen;
  out.town.gateShut = !has('b8_c2_to_fields', /On, east/); talk('b8_c2_backdoor'); out.town.back = S.f.b8_c2_backdoor === 1 && /heavier/.test(DLG.b8_c2_backdoor().txt);
  talk('b8_c2_townwoman'); out.town.woman = /stop being afraid/.test(DLG.b8_c2_townwoman().txt); out.town.well = /sweet/.test(DLG.b8_c2_well().txt);
  out.town.templeShut = /shut/.test(DLG.b8_c2_temple().txt);
  talk('b8_c2_priest'); out.town.tithe = /tithe/.test(DLG.b8_c2_priest().txt); out.town.priestNot = has('b8_c2_priest', /Not now/);
  const st = JSON.stringify(S); near('b8_c2_priest', /Round the square/, 'tuft'); out.town.near = ((S.bruised || {}).tuft || 0) > 0; B = null; restore(st, 'b8_c2_town');
  const ct = b8Contract(); out.town.fight = await force('b8_c2_town'); out.town.con = b8Contract() - ct; out.town.done = S.f.b8_c2_townDone === 1;
  out.town.templeOpen = /jars/.test(DLG.b8_c2_temple().txt); out.town.priestGone = !AREAS.b8_c2_town.npcs.find(n => n.id === 'priest').show();
  startExplore('b8_c2_town'); out.town.gateOpen = has('b8_c2_to_fields', /On, east/) && has('b8_c2_to_fields', /Not now/);
  take('b8_c2_to_fields', /On, east/); out.fl = {area:S.area, ph:S.f.b8_c2_ph, seen:S.f.b8_c2_fieldsSeen, sing:/they sing/i.test(DLG.b8_c2_fields_arrive().txt), notStraw:/not straw/.test(DLG.b8_c2_fields_arrive().txt)};
  /* phase 4: the fields: the fire before the rescue, the gap (its "yes, but"; the fight, two grounds, pollen) */
  talk('b8_c2_fire'); out.fl.fireShut = !has('b8_c2_fire', /watch/) && has('b8_c2_fire', /rest/); talk('b8_c2_fields_calder'); out.fl.calder = /They know us/.test(DLG.b8_c2_fields_calder().txt);
  talk('b8_c2_gap'); out.fl.gapNot = has('b8_c2_gap', /Not now/); out.fl.red = /red scarf/.test(DLG.b8_c2_gap().txt);
  const sg = JSON.stringify(S); near('b8_c2_gap', /Stop up your ears/, 'sgt'); out.fl.near = !!(S.rattled || {}).sgt; B = null; restore(sg, 'b8_c2_fields');
  const cf = b8Contract(); out.fl.fight = await force('b8_c2_fields'); out.fl.con = b8Contract() - cf; out.fl.done = S.f.b8_c2_fieldsDone === 1 && S.f.b8_c2_drover === 'saved'; out.fl.never = /never do/.test(DLG.b8_c2_fields_after().txt);
  startExplore('b8_c2_fields'); out.fl.drover = AREAS.b8_c2_fields.npcs.find(n => n.id === 'drover').show(); talk('b8_c2_drover'); out.fl.goad = S.kit.includes('b8_c2_drovergoad');
  /* the fire after: a rest, then the watch (phase 5) */
  S.wounds = {brisk:4}; S.injury = {kettle:'kelyk'}; talk('b8_c2_fire'); take('b8_c2_fire', /Let the squad rest/); out.n = {rested:!S.wounds && !(S.injury || {}).kettle && S.f.b8_c2_rest4 === 1, restOnce:!has('b8_c2_fire', /rest/)};
  take('b8_c2_fire', /Sit up with the watch/); out.n.ph = S.f.b8_c2_ph; out.n.lanterns = /Lanterns/.test(DLG.b8_c2_night().txt); take('b8_c2_night', /Watch/);
  out.n.tenders = AREAS.b8_c2_fields.npcs.find(n => n.id === 'tenders').show(); out.n.wagonIsLoading = DLG.b8_c2_wagon().sp === DLG.b8_c2_loading().sp;
  talk('b8_c2_loading'); out.n.notNow = has('b8_c2_loading', /Not now/);
  const sl = JSON.stringify(S); near('b8_c2_loading', /Get close/, 'ellis'); out.n.near = !!(S.rattled || {}).ellis; restore(sl, 'b8_c2_fields');
  made('b8_c2_loading', /Get close/, 'ellis'); out.n.unseen = S.f.b8_c2_watched === 'unseen' && /Calder himself/.test(DLG.b8_c2_loading_unseen().txt);
  take('b8_c2_loading_unseen', /tarp/); out.n.jug = S.kit.includes('b8_kelykjug') && S.f.b8_c2_found === 1; out.n.crate = /crate from the temple/.test(DLG.b8_c2_tarp().txt);
  talk('b8_c2_fire'); out.n.keyShut = !has('b8_c2_fire', /Decide/);
  talk('b8_c2_calder_face'); out.n.faceNot = has('b8_c2_calder_face', /Not now/);
  const sc = JSON.stringify(S); near('b8_c2_calder_face', /Say it, Calder/, 'vasso'); out.n.calderNear = !!(S.rattled || {}).vasso; restore(sc, 'b8_c2_fields');
  made('b8_c2_calder_face', /Say it, Calder/, 'vasso'); const cs = DLG.b8_c2_calder_says().txt; out.n.calder = S.f.b8_c2_calder === 'told' && /Never to the city/.test(cs) && /barrow/.test(cs) && !/Council/.test(cs);
  /* the key at the fire */
  talk('b8_c2_fire'); out.k = {open:has('b8_c2_fire', /Decide/)}; take('b8_c2_fire', /Decide/);
  const kn = DLG.b8_c2_key(); out.k = Object.assign(out.k, {fields:has('b8_c2_key', /Fields/), pass:has('b8_c2_key', /Pass/), notYet:has('b8_c2_key', /Not yet/), html:/The Contract/.test(kn.html || ''), vasso:/I'm not in the Guild/.test(kn.txt)});
  const snapK = JSON.stringify(S), silK = S.silver;
  /* ================= key: fields ================= */
  take('b8_c2_key', /Fields/); out.kf = {key:S.f.b8_c2_key, kelyk:S.f.b8_c2_kelyk, ph:S.f.b8_c2_ph, silver:S.silver - silK, fee:S.f.b8_c2_fee, burn:/stop singing/.test(DLG.b8_c2_burn().txt), html:/The Contract/.test(DLG.b8_c2_burn().html || '')};
  talk('b8_c2_fire'); out.kf.onward = has('b8_c2_fire', /On east/); out.kf.eastOpen = has('b8_c2_fields_east', /On east/) && has('b8_c2_fields_east', /Not now/);
  take('b8_c2_fire', /On east/); out.kf.notYet = has('b8_c2_onward', /Not yet/); out.kf.coral = /Black Coral/.test(DLG.b8_c2_onward().txt);
  take('b8_c2_onward', /On, to Black Coral/); await wait(60);
  out.kf = Object.assign(out.kf, {view, ch:S.chapters[2], con:b8Contract() - con0, extras:CHAPTERS[2].extras().length, journal:CHAPTERS[2].journal().length, endText:(CHEND[2] || {}).fields && CHEND[2].fields[0], lvl:S.lvl, xp:S.xp});
  /* ================= key: pass, from the same moment ================= */
  S = JSON.parse(snapK); save(); setBook('tth'); S.chapter = 2; startExplore('b8_c2_fields');
  take('b8_c2_key', /Pass/); out.kp = {key:S.f.b8_c2_key, kelyk:S.f.b8_c2_kelyk, silver:S.silver - silK, lashed:/tarred knots again/.test(DLG.b8_c2_pass().txt), wagon:/lashed down again/.test(DLG.b8_c2_wagon().txt)};
  talk('b8_c2_fire'); take('b8_c2_fire', /On east/); take('b8_c2_onward', /On, to Black Coral/); await wait(60);
  out.kp = Object.assign(out.kp, {view, ch:S.chapters[2], con:b8Contract() - con0, endText:(CHEND[2] || {}).pass && CHEND[2].pass[0]});
  /* ================= a --from=2 style save: Vasso walking (Ch 1 'hunt'); Tuft dead; Vell and Ellis walking ================= */
  setBook('tth'); S = newStateTTH('Syn'); S.f.b8_c1_key = 'hunt'; S.chapters = {1:'hunt'}; S.f.b8_vassoDone = 1; S.squad = ['sgt', 'brisk', 'kettle', 'vell', 'ellis', 'vasso'];
  S.dead.tuft = {ch:7, where:'Coral', from:'moi'}; S.imported = {from:'Syn', book:'moi', road:'daru', lvl:15, mates:['brisk', 'kettle', 'ohl', 'vell', 'ellis'], lifted:true};
  ['vell', 'ellis', 'vasso', 'ohl'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.camp = ['ohl']; S.picksDue = []; save(); startChapter(2);
  out.y = {renderErr:renderAll(), reader:visReader().id, pending:b82VassoPending(), noNpc:!AREAS.b8_c2_camp.npcs.find(n => n.id === 'vasso2').show(), sleep:has('b8_c2_fire', /Sleep/),
    lines:DLG.b8_c2_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, benna:/Old Benna/.test(DLG.b8_c2_fire_talk().txt), vell:/Vell/.test(DLG.b8_c2_fire_talk().txt), ellis:/Ellis/.test(DLG.b8_c2_fire_talk().txt), vasso:/Vasso/.test(DLG.b8_c2_fire_talk().txt),
    read:/Sit with/.test(b8ReadChoice(2).t)};
  talk('b8_c2_read'); out.y.bennaSay = /Reading's extra/.test(DLG.b8_c2_read().txt);
  S.f.b8_c2_ph = 4; out.y.lines4 = DLG.b8_c2_fire_talk().txt.split('\n\n').length; S.f.b8_c2_ph = 1;
  out.y.audit = audit();
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, s = r.s || {}, rd = r.r || {}, f1 = r.fire1 || {}, v = r.v || {}, c = r.c || {}, w = r.w || {}, f2 = r.fire2 || {}, ro = r.road || {}, rf = r.raid || {}, t = r.t || {}, tw = r.town || {}, fl = r.fl || {}, n = r.n || {}, k = r.k || {}, kf = r.kf || {}, kp = r.kp || {}, y = r.y || {};
if (f.area) {
  f.area === 'b8_c2_camp' && f.ch === 2 && f.lvl0 === 16 && !f.renderErr.length && f.title === 'The Black Coral Road' && f.number === 'Two' && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 2 && f.mail && f.goad && f.figs && f.tiles && f.scenes && f.fireRoster && f.read && !f.drawErr
    ? ok(`a fresh start opens Chapter Two at the first halt; every b8_c2 node renders, no never-name, no printed year, no count of weeks, no "!" in narration (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); two new items with art and the jug's; three figures, five grounds, five backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 8 && !au.noNear.length && au.onwards >= 6 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
}
s.ph === 1 && s.deck && s.vasso && s.came === 1 && s.walk ? ok('the first halt: the ring, the reading offered, a young man by the last tent') : no('start ' + JSON.stringify(s));
rd.drawn === 1 && rd.reader === 'tuft' && rd.inPool && rd.notNow && rd.cardNode === 'b8_c2_card' && rd.cardSp === 'The Deck of Dragons' && rd.cardBack === 'b8_c2_fire' ? ok(`the reading on the tailboard: Tuft draws (${rd.card}); the card node is the visions pass's hook (b8_c2_card); back to b8_c2_fire`) : no('reading ' + JSON.stringify(rd));
f1.html && f1.talk && f1.sleepShut && !f1.rest && f1.notNow && f1.lines === f1.here ? ok(`the fire at the first halt: the Contract shown, a line each (${f1.lines}); no sleep while Vasso is standing there; Not now`) : no('fire1 ' + JSON.stringify(f1));
v.npc && v.words && v.notNow && v.road && v.who && v.wait && v.wait.flag === 2 && v.wait.npc && v.wait.sleep && v.wait.joined && v.home && v.home.flag === 0 && v.home.gone && v.home.sleep && v.home.extras && v.join && v.join.in && v.join.flag === 1 && v.join.fire && v.join.lines === v.join.here && v.join.sleep
  ? ok('Vasso on quiet: "The paper said Malazans. The Guild doesn\'t ask which."; sent to do it on the road; never who paid; rides with the wagons then comes to the fire, goes back west, or joins at once with his line at the fire') : no('vasso ' + JSON.stringify(v));
c.mail && c.once && c.notNow && c.council && c.weeks && c.carters && w.seen && w.sweet && w.notNow && w.near && w.peek ? ok('Calder: the merchant\'s mail (once), one merchant\'s money and not the Council\'s, "weeks"; the carters and the drover; the last wagon smells sweet, a "yes, but" on the tarp, jugs in straw') : no('calder/wagon ' + JSON.stringify([c, w]));
f2.sleep && f2.ph === 2 && f2.area === 'b8_c2_road' && ro.burning && ro.npc && ro.notNow && ro.paid && ro.near && ro.faced ? ok('the road east: the Domin that was burning; the riders (a "yes, but" on facing them down, faced down, or Calder pays)') : no('road ' + JSON.stringify([f2, ro]));
rf.started && rf.after === 'b8_c2_raid_after' && !rf.guild && rf.con === 0 && rf.done ? ok(`the raid: ${rf.foes} raiders, not the Guild (Contract unmoved)`) : no('raid ' + JSON.stringify(rf));
t.dc === 17 && t.stat === 'wits' && t.notNow && t.lore && t.seen && t.near && t.who === 'brisk' && t.ok === 1 && t.free && t.words && t.again && t.offered && t.line ? ok('the trick: The Carter\'s Brake, a ✦ wits 17 check that names the Host\'s quartermaster\'s wagons; free (its words end on the one-free-trick line); in a fight it sets the Line') : no('trick ' + JSON.stringify(t));
tw.notNow && tw.area === 'b8_c2_town' && tw.ph === 3 && tw.seen && tw.gateShut && tw.back && tw.woman && tw.well && tw.templeShut && tw.tithe && tw.priestNot && tw.near && tw.fight && tw.fight.started && tw.fight.stage2 && tw.fight.inStage2 && tw.fight.after === 'b8_c2_town_after' && tw.con === 0 && tw.done && tw.templeOpen && tw.priestGone && tw.gateOpen
  ? ok(`the town coming back: the back door's crate, the cups, the tithe of one carter, a "yes, but" in the lanes; the square (${tw.fight.foes} foes) and the temple steps; the gate opens after`) : no('town ' + JSON.stringify(tw).slice(0, 900));
fl.area === 'b8_c2_fields' && fl.ph === 4 && fl.seen && fl.sing && fl.notStraw && fl.fireShut && fl.calder && fl.gapNot && fl.red && fl.near && fl.fight && fl.fight.started && fl.fight.pollen && fl.fight.stage2 && fl.fight.inStage2 && fl.fight.pollen2 && fl.fight.style === 'b8_c2_rowsb' && fl.fight.after === 'b8_c2_fields_after' && fl.con === 0 && fl.done && fl.never && fl.drover && fl.goad
  ? ok('the scarecrow fields: they sing and never fight; the drover walks in after the song; a "yes, but" on stopping the ears; the rows and deeper in, pollen on both grounds; the drover\'s goad') : no('fields ' + JSON.stringify(fl).slice(0, 900));
n.rested && n.restOnce && n.ph === 5 && n.lanterns && n.tenders && n.wagonIsLoading && n.notNow && n.near && n.unseen && n.jug && n.crate && n.keyShut && n.faceNot && n.calderNear && n.calder
  ? ok('the night: a rest clears wounds and the kelyk-sickness; lanterns in the rows, the loading (a "yes, but"), Calder counting jugs; the tarp and the jug; Calder says it: east, the barrow, never the city') : no('night ' + JSON.stringify(n));
k.open && k.fields && k.pass && k.notYet && k.html && k.vasso ? ok('the key at the fire: fields, pass, Not yet, the Contract shown, Vasso\'s word') : no('key ' + JSON.stringify(k));
kf.key === 'fields' && kf.kelyk === 'burned' && kf.ph === 6 && kf.silver === -20 && kf.fee === 20 && kf.burn && kf.html && kf.onward && kf.eastOpen && kf.notYet && kf.coral && kf.view === 'end' && kf.ch === 'fields' && kf.con === 0 && kf.extras >= 7 && kf.journal >= 8 && kf.endText === 'Fire in the rows'
  ? ok(`key fields: the wagon and the field burned, −20 silver, S.f.b8_c2_kelyk 'burned'; the end (level ${kf.lvl}, ${kf.xp} xp), the Contract unmoved`) : no('fields key ' + JSON.stringify(kf));
kp.key === 'pass' && kp.kelyk === 'passed' && kp.silver === 20 && kp.lashed && kp.wagon && kp.view === 'end' && kp.ch === 'pass' && kp.con === 0 && kp.endText === 'Good guards'
  ? ok('key pass, from the same moment: the tarp lashed down, +20 silver, S.f.b8_c2_kelyk \'passed\'; the end, the Contract unmoved') : no('pass key ' + JSON.stringify(kp));
y.renderErr && !y.renderErr.length && y.reader === 'benna' && !y.pending && y.noNpc && y.sleep && y.lines === y.here + 1 && y.lines4 === y.here + 1 && y.benna && y.vell && y.ellis && y.vasso && y.read && y.bennaSay && !y.audit.noNear.length && !y.audit.noStay.length
  ? ok(`a --from=2 style save (Vasso walking off 'hunt'; Tuft dead; Vell and Ellis walking): every node renders, Benna reads (and washes for the caravan), a line each at the fire in both halves (${y.lines})`) : no('synthetic ' + JSON.stringify(y).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b8ch2: FAIL (${bad.length})` : 'b8ch2: all ok'); process.exit(bad.length ? 1 : 0);
