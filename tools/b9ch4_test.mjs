// Book Nine, Chapter 4 (The Ration Book, src/164_b9_ch4.js): the Letherii's halts, both keys from the same moment with the Finadd at the
// noon halt, the reading at a ration crate (the Tiles; and the card node the visions pass hooks onto), the fire (Rations shown, a rest, a
// line each, the Witness beat, Not now), Kaedra's join at the first halt (or waiting with the outriders when six walk), every fight's start
// and a forced win (the stampede, a survive fight; the raid on both grounds; the forage fight on 'forage'), the trick behind its ✦ hard
// check (taught, passive, and its battle half), the items (each with art), the Rations moves (the march −2; the hunt +1 once; the
// stampede's "yes, but" −1; book +1 / forage +3), "Not now" on every onward step and a "yes, but" on every check, from a fresh start and
// from a --from=4 style transfer save (Perrit dead; Ilsa and Sorvan walking, so Kaedra waits).
// Usage: node tools/b9ch4_test.mjs   (build first; exit 1 on a failure)
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
  const leaveBattle = area => { B = null; view = 'scene'; S.scene = 'talk'; startExplore(area); };
  const force = async (id, opt = {}) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.dark = !!B.def.dark; res.survive = !!(B.def.objective && B.def.objective.type === 'survive');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b9_c4_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const never = /Bridgeburner|Kellanved|Dancer|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Tarr\b|Cuttle|Hedge|Bavedict|Keneb|Blistig|Errant|Brys|Aranict|Atri-Ceda|Henar|Ublala|Kalam|Tehol|Tool\b|Hetan|Stolmen|Sekara|Setoc|Snake|\bweeks\b|\bmonths\b|Glass Desert|Forkrul|Chancel|White Face|Senan|Gilk/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (never.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(never)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or
     "Not yet" beside it; under every phase and key */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set();
    const keep = JSON.stringify(S.f);
    [1, 2, 3, 4, 5].forEach(ph => ['book', 'forage', null].forEach(k => [0, 1].forEach(fl => { S.f.b9_c4_ph = ph; S.f.b9_c4_key = k;
      ['b9_c4_orders1', 'b9_c4_countTried', 'b9_c4_marks', 'b9_c4_raidDone', 'b9_c4_closed', 'b9_c4_herdDone', 'b9_c4_keyDone', 'b9_c4_forageDone', 'b9_kaedraDone'].forEach(f => { S.f[f] = fl ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + c.t); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + c.t); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(typeof c.t === 'function' ? c.t() : c.t))) noStay.add(id); } }); })));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  try {
  /* ================= a fresh start ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Fresh'); S.picksDue = []; save(); startChapter(4); S.picksDue = []; save();
  const thirdKeep = JSON.stringify(S.th.t && S.th.t.squad);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, rat0:b9Rations(), march:S.f.b9_march4, squad:S.squad.join(','), renderErr:renderAll(), title:CHAPTERS[4].title, nodes:nodes.length, areas:CHAPTERS[4].areas.length, fights:Object.keys(CHAPTERS[4].battles).length,
    items:Object.keys(CHAPTERS[4].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[4].gear).length,
    spear:ITEMS.b9_c4_bluerosespear && ITEMS.b9_c4_bluerosespear.slot === 'weapon' && ITEMS.b9_c4_bluerosespear.role === 'reach' && ITEMS.b9_c4_bluerosespear.dmg[2] === 3,
    coat:ITEMS.b9_c4_scoutcoat && ITEMS.b9_c4_scoutcoat.slot === 'armour' && ITEMS.b9_c4_scoutcoat.role === 'light', whistle:ITEMS.b9_c4_bonewhistle && ITEMS.b9_c4_bonewhistle.slot === 'trinket',
    figs:['kaedra', 'b9_c4_outrider', 'b9_c4_runner'].every(k => typeof FIGX[k] === 'function'), ground:typeof TILEX.b9_c4_wastes === 'function',
    scenes:['b9_wastes', 'b9_camp_night', 'b9_c4_dusk', 'b9_c4_wash'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]),
    fireRoster:(ROSTER_FIRES.dod[4] || []).includes('b9_c4_fire'), audit:audit(), read4:!!B9READ[4] && !!B9READ[4].say.perrit && !!B9READ[4].say.tilewoman};
  /* draw every backdrop at phone size in each phase (no page errors) */
  { const cv = document.createElement('canvas'); cv.width = 390; cv.height = 300; [1, 2, 3, 4, 5].forEach(ph => { S.f.b9_c4_ph = ph; ['b9_wastes', 'b9_camp_night', 'b9_c4_dusk', 'b9_c4_wash'].forEach(k => SCENEX[k](cv, 1000)); }); S.f.b9_c4_ph = undefined; }
  /* the start: dusk, the reading and Kaedra among the first halt's choices */
  talk('b9_c4_start'); out.f.ph = S.f.b9_c4_ph; out.f.tiles = has('b9_c4_start', /Sit with Perrit and the tiles/); out.f.kae = has('b9_c4_start', /outriders/);
  talk('b9_c4_read'); const rd = DLG.b9_c4_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b9_c4_drawn, reader:S.f.b9_c4_reader, inPool:B9POOL[4].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B9READ[4].back, cardNode:cardNodeName(), cardSp:DLG.b9_c4_card().sp, cardBack:DLG.b9_c4_card().ch[0].go, again:!has('b9_c4_fire', /Sit with/), where:/ration crate/.test(DLG.b9_c4_card().txt)};
  /* the Finadd's word */
  talk('b9_c4_ennic'); out.e1 = {orders:S.f.b9_c4_orders1, notNow:has('b9_c4_ennic', /Not now/), mages:/Malazan mages have fallen/.test(DLG.b9_c4_ennic().txt)}; take('b9_c4_ennic', /Barghast/); out.e1.akryn = /Akryn/.test(DLG.b9_c4_ennic_smoke().txt);
  /* Kaedra joins at the first halt */
  talk('b9_c4_kaedra'); out.k = {notNow:has('b9_c4_kaedra', /Not now/)}; take('b9_c4_kaedra', /Why walk out/); out.k.bead = /blue bead/.test(DLG.b9_c4_kaedra_why().txt);
  take('b9_c4_kaedra_why', /Walk with us/); clearModal(); out.k = Object.assign(out.k, {in:b9In('kaedra'), flag:S.f.b9_kaedraDone, line:/Kaedra/.test(DLG.b9_c4_fire_talk().txt), fire:/Kaedra/.test(DLG.b9_c4_fire().txt), god:PATRONS.kaedra ? PATRONS.kaedra.god : null});
  /* the runner, then Yelt's count (a "yes, but": rattled), then made: the chalk */
  talk('b9_c4_runner'); out.y = {runner:S.f.b9_c4_runnerSeen === 1};
  talk('b9_c4_fire'); out.y.noNight = !has('b9_c4_fire', /Sit the train/);
  talk('b9_c4_yelt'); out.y.notNow = has('b9_c4_yelt', /Not now/); out.y.rations = !!vis('b9_c4_yelt').find(c => c.check).rations; out.y.html = /Rations/.test(DLG.b9_c4_yelt().html || '');
  out.y.edge = (edgesFor(vis('b9_c4_yelt').find(c => c.check), 'tobet').find(e => /runner/.test(e[0])) || [])[1] || 0;
  { const sn = JSON.stringify(S); near('b9_c4_yelt', /Go through the count/, 'perrit'); out.y.near = !!(S.rattled || {}).perrit; restore(sn, 'b9_c4_camp'); }
  made('b9_c4_yelt', /Go through the count/, 'perrit'); out.y.marks = S.f.b9_c4_marks; out.y.kae = /Border sign/.test(DLG.b9_c4_yelt_ok().txt); out.y.okNot = has('b9_c4_yelt_ok', /Not now/) && has('b9_c4_yelt_ok', /Then the Sixth/);
  talk('b9_c4_cart'); talk('b9_c4_saffa'); talk('b9_c4_oxen'); talk('b9_c4_horses'); talk('b9_c4_barrels'); talk('b9_c4_ring'); talk('b9_c4_wagon'); talk('b9_c4_crate'); out.y.tw = !has('b9_c4_crate', /Sit with/);
  /* the fire at dusk */
  talk('b9_c4_fire'); const f1 = DLG.b9_c4_fire(); out.fire1 = {html:/Rations/.test(f1.html || ''), talk:has('b9_c4_fire', /Talk with the squad/), rest:has('b9_c4_fire', /rest/), night:has('b9_c4_fire', /Sit the train/), notNow:/Not now/.test(f1.ch[f1.ch.length - 1].t), noWit:!has('b9_c4_fire', /What did Lether/)};
  out.fire1.lines = DLG.b9_c4_fire_talk().txt.split('\n\n').length; out.fire1.here = S.squad.filter(id => id !== 'sgt').length;
  S.wounds = {thegg:4}; take('b9_c4_fire', /Let the squad rest/); out.fire1.rested = !S.wounds && S.f.b9_c4_rest1 === 1;
  take('b9_c4_fire', /Sit the train/); out.fire1.notYet = has('b9_c4_tonight', /Not yet/); take('b9_c4_tonight', /Night/);
  /* ================= phase 2: the night, the raid ================= */
  out.w = {area:S.area, ph:S.f.b9_c4_ph, arrive:S.node === 'b9_c4_night_arrive', raiders:AREAS.b9_c4_camp.npcs.find(n => n.id === 'raiders').show(), kae:/Kaedra/.test(DLG.b9_c4_night_arrive().txt)};
  talk('b9_c4_raiders'); out.w.notNow = has('b9_c4_raiders', /Not now/); out.w.wait = has('b9_c4_raiders', /chalked wagons/);
  { const sn = JSON.stringify(S); near('b9_c4_raiders', /Wait by the chalked/, 'kaedra'); out.w.near = ((S.bruised || {}).kaedra || 0) > 0; restore(sn, 'b9_c4_camp'); }
  out.w.fight = await force('b9_c4_raid', {surprise:'p'}); out.w.done = S.f.b9_c4_raidDone; out.w.whistle = S.kit.includes('b9_c4_bonewhistle'); out.w.runner = S.f.b9_c4_runner;
  take('b9_c4_raid_after', /Yelt/); out.w.closed = S.f.b9_c4_closed === 1;
  take('b9_c4_yelt_night', /fire/); const f2 = DLG.b9_c4_fire();
  out.wit = {scene:f2.scene, wit:has('b9_c4_fire', /What did Lether/), sleep:has('b9_c4_fire', /Sleep/), noRest:!has('b9_c4_fire', /rest/), notNow:has('b9_c4_fire', /Not now/)};
  take('b9_c4_fire', /What did Lether/); out.wit.html = /Rations/.test(DLG.b9_c4_witness().html || ''); out.wit.opts = vis('b9_c4_witness').length; out.wit.stay = has('b9_c4_witness', /Not now/);
  { const sn = JSON.stringify(S); take('b9_c4_witness', /Not now/); out.wit.notNowNothing = !(S.b9.wit || {}).c4; restore(sn, 'b9_c4_camp');
    const res = {};
    [[/Each other/, 'kept', 'each'], [/The Commander asked/, 'kept', 'commander'], [/The pay/, 'doubt', 'pay']].forEach(([re, v, f]) => { const s2 = JSON.stringify(S); talk('b9_c4_witness'); take('b9_c4_witness', re); res[f] = (S.b9.wit || {}).c4 === v && S.f.b9_c4_wit === f && /Yelt/.test(DLG.b9_c4_wit_done().txt); restore(s2, 'b9_c4_camp'); });
    out.wit.answers = res; }
  talk('b9_c4_witness'); take('b9_c4_witness', /Each other/); out.wit.rec = (S.b9.wit || {}).c4; out.wit.faith = b9Faith('l'); out.wit.fireHtml = /still marching/.test(DLG.b9_c4_fire().html || '');
  talk('b9_c4_fire'); take('b9_c4_fire', /Sleep/); out.wit.turnNot = has('b9_c4_turnin', /Not yet/); take('b9_c4_turnin', /Morning/);
  /* ================= phase 3: the noon halt ================= */
  out.d = {area:S.area, ph:S.f.b9_c4_ph, arrive:S.node === 'b9_c4_day_arrive', cap:/noon/.test(SCENES.b9_wastes.cap), noKey:!vis('b9_c4_ennic3').some(c => /The book/.test(c.t))};
  take('b9_c4_day_arrive', /outriders/); out.d.notNow = has('b9_c4_herdsign', /Not now/);
  { const sn = JSON.stringify(S), r0 = b9Rations(); near('b9_c4_herdsign', /Get the oxen/, 'brennet' in TPL && b9In('brennet') ? 'brennet' : 'thegg'); out.d.near = b9Rations() - r0; if (B) leaveBattle('b9_c4_wastes'); restore(sn, 'b9_c4_wastes'); }
  out.d.fight = await force('b9_c4_herd'); out.d.done = S.f.b9_c4_herdDone;
  /* the hunt (+1 once; a "yes, but": skin) */
  talk('b9_c4_straggler'); out.h = {notNow:has('b9_c4_straggler', /Not now/), rations:!!vis('b9_c4_straggler').find(c => c.check).rations};
  { const sn = JSON.stringify(S); near('b9_c4_straggler', /Track it/, 'kaedra'); out.h.near = ((S.bruised || {}).kaedra || 0) > 0; restore(sn, 'b9_c4_wastes'); }
  const rh = b9Rations(); made('b9_c4_straggler', /Track it/, 'kaedra'); out.h.up = b9Rations() - rh; talk('b9_c4_hunt_ok'); out.h.once = b9Rations() - rh; out.h.again = !has('b9_c4_straggler', /Track it/);
  /* the trick: Reading the Spoor */
  talk('b9_c4_spoor'); const tc = vis('b9_c4_spoor').find(c => c.trick);
  out.t = {dc:tc && tc.check[1], stat:tc && tc.check[0], noNear:tc && !tc.near, notNow:has('b9_c4_spoor', /Not now/), kaedra:(edgesFor(tc, 'kaedra').find(e => /forts/.test(e[0])) || [])[1] || 0, ruuk:(edgesFor(tc, 'ruuk').find(e => /Faraed/.test(e[0])) || [])[1] || 0};
  made('b9_c4_spoor', /Learn to read it/, 'tobet');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b9_c4_spoor && S.tricks.b9_c4_spoor.who, ok:S.f.b9_c4_spoorOk, coat:S.kit.includes('b9_c4_scoutcoat'), passive:!!AB.t_b9_c4_spoor.passive, free:!!AB.t_b9_c4_spoor.free, listed:V103_PASSIVE.includes('b9_c4_spoor'), words:/Always on/.test(TRICKS.b9_c4_spoor.fx) && !/^Once a fight/.test(TRICKS.b9_c4_spoor.fx), again:!has('b9_c4_spoor', /Learn/)});
  /* the outrider: the spear, the rumour, the other squad */
  talk('b9_c4_outrider'); out.o = {spear:S.kit.includes('b9_c4_bluerosespear'), akryn:/Akryn/.test(DLG.b9_c4_outrider().txt), other:/foreigners' squads of heavies/.test(DLG.b9_c4_outrider().txt)};
  talk('b9_c4_cairn'); talk('b9_c4_daywagons'); talk('b9_c4_tilewagon'); talk('b9_c4_eastward');
  /* the trick's battle half: it opens by itself in the forage fight */
  startBattle('b9_c4_forage', {}); await wait(80);
  { const u = B.units.find(x => x.id === 'tobet'); out.t.on = !!B.b94spoor && B.b94spoor.u === u; out.t.button = typeof trickAbs === 'function' ? !trickAbs(u).some(a => a === AB.t_b9_c4_spoor || a === 't_b9_c4_spoor') : true;
    const foe = B.units.find(x => x.side === 'e'); foe.b94read = B.round + 1; const b0 = atkCalc(u, foe, {}).bonus; foe.b94read = null; const b1 = atkCalc(u, foe, {}).bonus; out.t.hit = b0 - b1; }
  leaveBattle('b9_c4_wastes');
  /* ================= the key, from Ennic ================= */
  talk('b9_c4_ennic3'); const kn = DLG.b9_c4_ennic3();
  out.key = {book:has('b9_c4_ennic3', /The book/), forage:has('b9_c4_ennic3', /Forage/), notYet:has('b9_c4_ennic3', /Not yet/), html:/Rations/.test(kn.html || ''), kaedra:/Kaedra/.test(kn.txt)};
  const snapK = JSON.stringify(S), ratK = b9Rations(), loyK = S.loy.kaedra;
  /* ================= key: book ================= */
  take('b9_c4_ennic3', /The book/); out.b = {key:S.f.b9_c4_key, ph:S.f.b9_c4_ph, rat:b9Rations() - ratK, kae:S.loy.kaedra - loyK};
  take('b9_c4_key_book', /To the train/); out.b.area = S.area; out.b.node = S.node; take('b9_c4_eve_arrive', /Yelt/);
  out.b.notNow = has('b9_c4_book', /Not now/); out.b.rations = !!vis('b9_c4_book').find(c => c.check).rations; out.b.html = /Rations/.test(DLG.b9_c4_book().html || '');
  { const sn = JSON.stringify(S); near('b9_c4_book', /Count the brigade/, 'perrit'); out.b.near = !!(S.rattled || {}).perrit; restore(sn, 'b9_c4_camp'); }
  made('b9_c4_book', /Count the brigade/, 'perrit'); out.b.rat2 = b9Rations() - ratK; out.b.flag = S.f.b9_c4_book; out.b.keyDone = S.f.b9_c4_keyDone; talk('b9_c4_booked'); out.b.once = b9Rations() - ratK;
  take('b9_c4_booked', /fire/); out.b.east = has('b9_c4_fire', /First light/) && has('b9_c4_fire', /Not now/); out.b.lines = DLG.b9_c4_fire_talk().txt.split('\n\n').length; out.b.here = S.squad.filter(id => id !== 'sgt').length;
  take('b9_c4_fire', /First light/); out.b.notYet = has('b9_c4_onward', /Not yet/); out.b.kaeEnd = /Kaedra walks beside/.test(DLG.b9_c4_onward().txt); out.b.htmlEnd = /Rations/.test(DLG.b9_c4_onward().html || '');
  const ratB = b9Rations(); take('b9_c4_onward', /East/); await wait(60);
  out.b.end = {view, ch:S.chapters[4], lvl:S.lvl, xp:S.xp, rat:ratB, extras:CHAPTERS[4].extras().length, journal:CHAPTERS[4].journal().length, endText:(CHEND[4] || {}).book && CHEND[4].book[0], third:JSON.stringify(S.th.t && S.th.t.squad) === thirdKeep || JSON.stringify(S.squad) === thirdKeep};
  /* ================= key: forage, from the same moment ================= */
  restore(snapK, 'b9_c4_wastes'); S.chapter = 4;
  take('b9_c4_ennic3', /Forage/); out.g = {key:S.f.b9_c4_key, ph:S.f.b9_c4_ph, kae:S.loy.kaedra - loyK, rat:b9Rations() - ratK, book:S.f.b9_c4_book == null};
  take('b9_c4_key_forage', /South/); out.g.area = S.area; out.g.node = S.node; take('b9_c4_ride', /Down into/);
  talk('b9_c4_decurion'); talk('b9_c4_seep'); talk('b9_c4_wash_back'); out.g.backShut = !has('b9_c4_wash_back', /dusk/);
  talk('b9_c4_washherd'); out.g.notNow = has('b9_c4_washherd', /Not now/);
  { const sn = JSON.stringify(S); near('b9_c4_washherd', /Come up the wash/, 'kaedra'); out.g.near = ((S.bruised || {}).kaedra || 0) > 0; if (B) leaveBattle('b9_c4_wash'); restore(sn, 'b9_c4_wash'); }
  out.g.fight = await force('b9_c4_forage', {surprise:'p'}); out.g.done = S.f.b9_c4_forageDone; out.g.rat3 = b9Rations() - ratK; out.g.keyDone = S.f.b9_c4_keyDone;
  out.g.after = has('b9_c4_forage_after', /Back to the column/) && has('b9_c4_forage_after', /Not now/); talk('b9_c4_forage_after'); out.g.once = b9Rations() - ratK;
  take('b9_c4_forage_after', /Back to the column/); out.g.area2 = S.area; out.g.eve = /meat/.test(DLG.b9_c4_eve_arrive().txt);
  take('b9_c4_eve_arrive', /fire/); take('b9_c4_fire', /First light/); out.g.end1 = /salted meat/.test(DLG.b9_c4_onward().txt);
  const ratG = b9Rations(); take('b9_c4_onward', /East/); await wait(60);
  out.g.end = {view, ch:S.chapters[4], rat:ratG, tier:b9RatTier(ratG), lvl:S.lvl, extras:CHAPTERS[4].extras().some(x => /rode out/.test(x)), endText:CHEND[4].forage[0]};
  /* ================= a --from=4 style transfer save: Perrit dead; Ilsa and Sorvan walking (six walk), so Kaedra waits ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Syn'); S.picksDue = []; save(); S.f.b9_c2_key = 'drill'; S.f.b9_brennetDone = 1; startChapter(4); S.picksDue = [];
  S.squad = ['sgt', 'tobet', 'thegg', 'ammet', 'ilsa', 'sorvan']; S.dead.perrit = {ch:6, where:'the river', from:'rg'};
  ['ilsa', 'sorvan'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.imported = {from:'Syn', sid:'x', lvl:12, mates:['tobet', 'thegg', 'ammet', 'ilsa', 'sorvan'], lifted:false}; S.lvl = 12; S.xp = LEVELS[11]; save();
  out.y2 = {renderErr:renderAll(), reader:b9Rd().id, rat:b9Rations(), lines:DLG.b9_c4_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ilsa:/Ilsa/.test(DLG.b9_c4_fire_talk().txt), sorvan:/Sorvan/.test(DLG.b9_c4_fire_talk().txt), noPerrit:!/Perrit/.test(DLG.b9_c4_fire_talk().txt), tiles:has('b9_c4_crate', /Sit with the tile-woman/)};
  S.f.b9_c4_ph = 3; out.y2.lines3 = DLG.b9_c4_fire_talk().txt.split('\n\n').length; S.f.b9_c4_ph = 1;
  talk('b9_c4_kaedra'); take('b9_c4_kaedra', /Walk with us/); out.y2.kaedra = {flag:S.f.b9_kaedraDone, in:b9In('kaedra'), wait:ROSTER_BOOKS.dod.wait('kaedra'), npc:AREAS.b9_c4_camp.npcs.find(n => n.id === 'kaedra').show(), text:/six already walk/.test(DLG.b9_c4_kaedra_join().txt), again:has('b9_c4_kaedra', /Walk with us/)};
  S.f.b9_c4_orders1 = 1; S.f.b9_c4_countTried = 1; talk('b9_c4_fire'); out.y2.night = has('b9_c4_fire', /Sit the train/);
  S.f.b9_c4_ph = 3; S.f.b9_c4_herdDone = 1; out.y2.kaeSpoor = AREAS.b9_c4_wastes.npcs.find(n => n.id === 'kaedra').show() && vis('b9_c4_spoor').some(c => c.trick); S.f.b9_c4_ph = 1; S.f.b9_c4_herdDone = undefined;
  out.y2.audit = audit();
  save(); const sid = S.sid; const back = loadSlot(sid); out.y2.reload = !!back && back.thread === 'l' && !!back.th && !!back.th.t && back.squad.includes('ilsa') && back.f.b9_kaedraDone === 2;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, e1 = r.e1 || {}, k = r.k || {}, y = r.y || {}, f1 = r.fire1 || {}, w = r.w || {}, wit = r.wit || {}, d = r.d || {}, h = r.h || {}, t = r.t || {}, o = r.o || {}, key = r.key || {}, b = r.b || {}, g = r.g || {}, y2 = r.y2 || {};
if (f.area) {
  f.area === 'b9_c4_camp' && f.ch === 4 && f.thread === 'l' && f.lvl0 === 11 && f.rat0 === 4 && f.march === 1 && f.squad === 'sgt,tobet,thegg,perrit,ammet' && !f.renderErr.length && f.title === 'The Ration Book' && f.areas === 3 && f.fights === 3 && f.items && f.itemN === 3 && f.spear && f.coat && f.whistle && f.figs && f.ground && f.scenes && f.fireRoster && f.read4
    ? ok(`a fresh start opens Chapter Four at the train: the Letherii at level 11, the march eats 2 (Rations 6 to 4); every b9_c4 node renders, no never-name, no "!" in narration, no rounds or turns (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); three items with art and roles; Kaedra, an outrider and the runner drawn; the ground; four backdrops`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
  const au = f.audit || {}; au.checks >= 6 && au.tricks === 1 && !au.noNear.length && au.onwards >= 6 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900));
  f.ph === 1 && f.tiles && f.kae ? ok('the start: dusk at the train, the reading and Kaedra offered at the first halt') : no('start ' + JSON.stringify({ph:f.ph, tiles:f.tiles, kae:f.kae}));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.back === 'b9_c4_fire' && rd.cardNode === 'b9_c4_card' && rd.cardSp === 'The Tiles of the Holds' && rd.cardBack === 'b9_c4_fire' && rd.again && rd.where ? ok('the reading at a ration crate: Perrit lays the tiles from B9POOL[4]; the card node is the visions pass\'s hook (b9_c4_card); back to b9_c4_fire; offered once') : no('reading ' + JSON.stringify(rd));
e1.orders === 1 && e1.notNow && e1.mages && e1.akryn ? ok('the Finadd: the ration down a step, "the Malazan mages have fallen" (headline), the Barghast war on the Akryn as news') : no('ennic ' + JSON.stringify(e1));
k.notNow && k.bead && k.in && k.flag === 1 && k.line && k.fire && k.god == null ? ok('Kaedra joins at the first halt (the blue bead, the border fort; no god), with her line at the fire') : no('kaedra ' + JSON.stringify(k));
y.runner && y.noNight && y.notNow && y.rations && y.html && y.edge === 1 && y.near && y.marks === 1 && y.kae && y.okNot && y.tw ? ok('Yelt\'s ration book short: the runner seen (an edge), the count (a rations check; its "yes, but": rattled), the chalk under the water wagons; Orla, Saffa, the oxen, the horse lines, the crate') : no('yelt ' + JSON.stringify(y));
f1.html && f1.talk && f1.rest && f1.night && f1.notNow && f1.noWit && f1.lines === f1.here && f1.rested && f1.notYet ? ok(`the fire at dusk: Rations shown, a rest, the talk (a line each, ${f1.lines}), sitting the train with Not yet beside it`) : no('fire1 ' + JSON.stringify(f1));
w.area === 'b9_c4_camp' && w.ph === 2 && w.arrive && w.raiders && w.kae && w.notNow && w.wait && w.near && w.fight && w.fight.started && w.fight.dark && w.fight.stage2 && w.fight.inStage2 && w.fight.allies === 1 && w.fight.foes === 5 && w.fight.after === 'b9_c4_raid_after' && w.done === 1 && w.whistle && w.runner === 'gone' && w.closed
  ? ok('the night: raiders at the chalked water wagons (five foes, an escort sentry beside the squad, a "yes, but" on the wait: stiff), outside the ring; the bone whistle; the runner gone; Yelt closes the book') : no('raid ' + JSON.stringify(w).slice(0, 900));
const wa = wit.answers || {}; wit.scene === 'b9_camp_night' && wit.wit && wit.sleep && wit.noRest && wit.notNow && wit.html && wit.opts === 4 && wit.stay && wit.notNowNothing && wa.each && wa.commander && wa.pay && wit.rec === 'kept' && wit.faith === 'kept' && wit.fireHtml && wit.turnNot
  ? ok('the Witness beat at the train\'s fire, Yelt\'s ledger closed: each other / the Commander (kept), the pay (doubt), Not now records nothing; the fire shows it after') : no('witness ' + JSON.stringify(wit));
d.area === 'b9_c4_wastes' && d.ph === 3 && d.arrive && d.cap && d.noKey && d.notNow && d.near === -1 && d.fight && d.fight.started && d.fight.survive && d.fight.allies === 1 && d.fight.after === 'b9_c4_herd_after' && d.done === 1
  ? ok('the noon halt: the stampede (a survive fight, a Bluerose outrider beside the squad; the "yes, but" a barrel burst, a ration gone)') : no('herd ' + JSON.stringify(d));
h.notNow && h.rations && h.near && h.up === 1 && h.once === 1 && h.again ? ok('the hunt: a lamed straggler (a rations check, a "yes, but": a horn\'s flat), Rations +1 once') : no('hunt ' + JSON.stringify(h));
t.dc === 18 && t.stat === 'wits' && t.noNear && t.notNow && t.kaedra === 2 && t.ruuk === 2 && t.who === 'tobet' && t.ok === 1 && t.coat && t.passive && t.free && t.listed && t.words && t.again && t.on && t.button && t.hit === 2
  ? ok('the trick: Reading the Spoor, a ✦ wits 18 check that names the forts\' spoor and the Faraed grass; passive (V103_PASSIVE, "Always on", no button), opening by itself in a fight (+2 to hit the first foe to move); the scout\'s coat') : no('trick ' + JSON.stringify(t));
o.spear && o.akryn && o.other ? ok('the outrider: the Bluerose lance-spear, the Barghast war on the Akryn (the rumour), one line of the other squad as camp talk') : no('outrider ' + JSON.stringify(o));
key.book && key.forage && key.notYet && key.html && key.kaedra ? ok('the key at the noon halt, from the Finadd: book, forage, Not yet; Rations shown; Kaedra acknowledged') : no('key ' + JSON.stringify(key));
b.key === 'book' && b.ph === 4 && b.rat === 0 && b.kae === 0 && b.area === 'b9_c4_camp' && b.node === 'b9_c4_eve_arrive' && b.notNow && b.rations && b.html && b.near && b.rat2 === 1 && b.flag === 1 && b.keyDone === 1 && b.once === 1 && b.east && b.lines === b.here && b.notYet && b.kaeEnd && b.htmlEnd && b.end && b.end.view === 'end' && b.end.ch === 'book' && b.end.lvl >= 12 && b.end.extras >= 6 && b.end.journal >= 6 && b.end.endText === 'An honest count' && b.end.third
  ? ok(`key book: the honest count with Yelt (a rations check; a "yes, but": rattled), Rations +1 once, S.f.b9_c4_book; first light east (Not yet; Kaedra walks); level ${b.end.lvl} (${b.end.xp} xp), Rations ${b.end.rat}; the Third's half untouched`) : no('book key ' + JSON.stringify(b).slice(0, 1000));
g.key === 'forage' && g.ph >= 4 && g.kae === 1 && g.rat === 0 && g.book && g.area === 'b9_c4_wash' && g.node === 'b9_c4_ride' && g.backShut && g.notNow && g.near && g.fight && g.fight.started && g.fight.allies === 2 && g.fight.foes === 4 && g.fight.after === 'b9_c4_forage_after' && g.done === 1 && g.rat3 === 3 && g.keyDone === 1 && g.after && g.once === 3 && g.area2 === 'b9_c4_camp' && g.eve && g.end1 && g.end && g.end.view === 'end' && g.end.ch === 'forage' && g.end.extras && g.end.endText === 'Game, and a little water'
  ? ok(`key forage, from the same moment: Kaedra +1; out to a dry wash (a "yes, but": cut knees); Barghast skirmishers who claim the herd (no clan named; two outriders beside the squad); Rations +3 once; the end on forage, Rations ${g.end.rat} (${g.end.tier})`) : no('forage key ' + JSON.stringify(g).slice(0, 1000));
y2.renderErr && !y2.renderErr.length && y2.reader === 'tilewoman' && y2.tiles && y2.rat === 4 && y2.lines === y2.here && y2.lines3 === y2.here && y2.ilsa && y2.sorvan && y2.noPerrit && y2.kaedra && y2.kaedra.flag === 2 && !y2.kaedra.in && y2.kaedra.wait && y2.kaedra.npc && y2.kaedra.text && y2.kaedra.again && y2.night && y2.kaeSpoor && !y2.audit.noNear.length && !y2.audit.noStay.length && y2.reload
  ? ok(`a --from=4 style transfer save (Perrit dead; Ilsa and Sorvan walking): every node renders, the tile-woman reads, a line each at the fire by dusk and by day (${y2.lines}); six walk, so Kaedra waits with the outriders, still teaches the spoor, and the night still opens; the save reloads with both halves`) : no('transfer ' + JSON.stringify(y2).slice(0, 900));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b9ch4: FAIL (${bad.length})` : 'b9ch4: all ok'); process.exit(bad.length ? 1 : 0);
