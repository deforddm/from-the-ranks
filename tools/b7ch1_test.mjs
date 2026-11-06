// Book Seven, Chapter 1 (The Burned Ships, src/121_b7_ch1.js): the halts, both keys from the same moment at the waterline, the reading at the
// first halt above the beach, the fire (rest, a line each, the Rising box, the roster, Not now), every fight's start and a forced win (both
// grounds of the tally-shed), the trick (taught, and its battle half), the Rising moves (the tally-book +1; 'strip': the farm −1, and +2
// sharpers and +2 salves), the riders (optional on 'burn', required before the shed on 'strip'), Doss's join (and the waiting road, and a
// rise:true check with the Rising's edge), and the chapter's end; from a fresh start, and from a --from=1 style save with Sathi alive and
// Book Four's spares walking, where every node must still render and every squadmate has a line at the fire.
// Usage: node tools/b7ch1_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.dark = !!B.def.dark;
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b7_c1_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b|Kettle|Tehol the Only|Mael\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* the Third is never called marines in the narration: "the Third" and "marines" never in one sentence that makes them the same */
  const marineSlip = () => nodes.filter(k => { try { return /the Third (is|are) (a squad of )?marines|Third squad of marines/i.test(DLG[k]().txt); } catch (e) { return false; } });
  try {
  /* ================= a fresh start ================= */
  setBook('rg'); S = newStateRG('Fresh', 'Other'); S.picksDue = []; save(); startChapter(1);
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, renderErr:renderAll(), slip:marineSlip(), title:CHAPTERS[1].title, nodes:nodes.length, areas:CHAPTERS[1].areas.length, fights:Object.keys(CHAPTERS[1].battles).length,
    sathiDead:!!S.dead.sathi, shelf:BOOKS.rg.coming, rise0:b7Rising(), items:Object.keys(CHAPTERS[1].gear).every(k => !!ART['item/' + k] && ITEMS[k].role), figure:typeof FIGX.doss === 'function', por:typeof POR.doss === 'function',
    scenes:['b7_coast_burning', 'b7_coast_night', 'b7_c1_landing', 'b7_c1_shed'].every(k => typeof SCENEX[k] === 'function')};
  /* phase 1: the landing; the lieutenant; the old soldier; the quartermaster */
  talk('b7_c1_start'); out.f.ph = S.f.b7_c1_ph; out.f.startWalk = has('b7_c1_start', /Walk the beach/);
  talk('b7_c1_boats'); out.f.boatsGated = !has('b7_c1_boats', /Fire her/);
  talk('b7_c1_lt'); out.f.orders = S.f.b7_c1_orders1; take('b7_c1_lt', /Burn them/); out.f.why = S.f.b7_c1_why && /nwitnessed/.test(DLG.b7_c1_lt_why().txt);
  out.f.bonehunters = nodes.filter(k => /Bonehunter/.test(DLG[k]().txt)).length;
  const sv = S.inv.salve, ss = S.silver; talk('b7_c1_qm'); take('b7_c1_qm', /^A salve/); out.f.qm = {salve:S.inv.salve - sv, silver:ss - S.silver};
  talk('b7_c1_old'); out.f.oldNotNow = has('b7_c1_old', /Not now/); made('b7_c1_old', /sailors said/, 'haddat'); out.f.warned = S.f.b7_c1_duneWarned;
  talk('b7_c1_fire'); out.f.fireUnlit = /not lit/.test(DLG.b7_c1_fire().txt) && !has('b7_c1_fire', /rest/);
  out.f.inlandGated = !has('b7_c1_inland', /Inland, to the coast road/);
  /* the key at the waterline */
  talk('b7_c1_boats'); const kn = DLG.b7_c1_boats(); out.f.key = {burn:has('b7_c1_boats', /Fire her/), strip:has('b7_c1_boats', /Strip her/), notYet:has('b7_c1_boats', /Not yet/), html:/The Rising/.test(kn.html || '')};
  const snapK = JSON.stringify(S);
  /* ================= key: strip, then back to burn from the same moment ================= */
  const inv0 = {sh:S.inv.sharper, sa:S.inv.salve}, lk = {tangle:S.loy.tangle, haddat:S.loy.haddat};
  take('b7_c1_boats', /Strip her/); out.s = {key:S.f.b7_c1_key, late:S.f.b7_c1_late, sharper:S.inv.sharper - inv0.sh, salve1:S.inv.salve - inv0.sa, tangle:S.loy.tangle - lk.tangle, haddat:S.loy.haddat - lk.haddat};
  take('b7_c1_strip', /Ashore/); out.s.cloak = S.kit.includes('b7_c1_charredcloak');
  take('b7_c1_burning', /Up into the dunes/); talk('b7_c1_lt2'); talk('b7_c1_dunes_start');
  out.s.dunes = await force('b7_c1_dunes'); talk('b7_c1_inland'); take('b7_c1_inland', /Inland, to the coast road/);
  out.s.road = {area:S.area, ph:S.f.b7_c1_ph};
  talk('b7_c1_lt3'); out.s.shedGated = !has('b7_c1_shed_view', /Straight in/); out.s.noPass = !has('b7_c1_riders_start', /Let them pass/);
  const r0 = b7Rising(); talk('b7_c1_farm'); take('b7_c1_farm', /^Take what the squad needs/); out.s.farm = {salve:S.inv.salve - inv0.sa, rise:b7Rising() - r0, done:S.f.b7_c1_farmDone, fell:(S.stats || {}).b7Fell || 0};
  out.s.stillGated = !has('b7_c1_shed_view', /Straight in/);
  out.s.riders = await force('b7_c1_riders'); out.s.shedOpen = has('b7_c1_shed_view', /Straight in/);
  /* back to the waterline: key burn */
  S = JSON.parse(snapK); save(); setBook('rg'); startExplore('b7_c1_beach');
  take('b7_c1_boats', /Fire her/); out.b = {key:S.f.b7_c1_key, haddat:S.loy.haddat - lk.haddat, tangle:S.loy.tangle - lk.tangle, sharper:S.inv.sharper - inv0.sh};
  take('b7_c1_burn', /Ashore/); out.b.burned = S.f.b7_c1_burned; out.b.cloak = S.kit.includes('b7_c1_charredcloak');
  take('b7_c1_burning', /Up into the dunes/); out.b.ph = S.f.b7_c1_ph;
  /* phase 2: the first halt, the reading, the fire */
  out.r = {deckChoice:has('b7_c1_above', /Deck/)};
  talk('b7_c1_read'); const rd = DLG.b7_c1_read(); const lay = rd.ch.find(c => /draw/.test(c.t)); runFx(lay);
  out.r = Object.assign(out.r, {drawn:S.f.b7_c1_drawn, reader:S.f.b7_c1_reader, card:S.card, inPool:B7POOL[1].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B7READ[1].back, words:rd.txt.length > 40});
  talk('b7_c1_card'); out.r.cardNode = DLG.b7_c1_card().sp;
  talk('b7_c1_fire'); const fy = DLG.b7_c1_fire(); out.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b7_c1_fire', /rest/), talk:has('b7_c1_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:ROSTER_FIRES.rg[1].includes('b7_c1_fire'), html:/The Rising/.test(fy.html || ''), noOnward:!has('b7_c1_fire', /Inland/)};
  S.wounds = {haddat:4}; take('b7_c1_fire', /Let the squad rest/); out.fire.rested = S.f.b7_c1_rest2 && !S.wounds;
  out.fire.talkLines = DLG.b7_c1_fire_talk().txt.split('\n\n').length; out.fire.here = S.squad.filter(id => id !== 'sgt').length;
  /* the trick: Finger-Talk */
  talk('b7_c1_marine'); out.t = {notNow:has('b7_c1_marine', /Not now/)}; made('b7_c1_marine', /Learn the signs/, 'haddat');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b7_c1_fingertalk && S.tricks.b7_c1_fingertalk.who, ok:S.f.b7_c1_fingerOk, fx:/critical/.test(TRICKS.b7_c1_fingertalk.fx), dc:DLG.b7_c1_marine().ch[0].check[1]});
  /* the dunes, with its battle half of the trick */
  talk('b7_c1_lt2'); out.d = {orders:S.f.b7_c1_orders2, npc:AREAS.b7_c1_beach.npcs.find(n => n.id === 'dunes').show(), sneak:has('b7_c1_dunes_start', /Under the crest/), notNow:has('b7_c1_dunes_start', /Not now/)};
  startBattle('b7_c1_dunes', {}); await wait(60);
  { const u = B.units.find(x => x.id === 'haddat'), f = B.units.find(x => x.side === 'e'); out.t.offered = trickOk(u, AB.t_b7_c1_fingertalk); out.t.tiles = AB.t_b7_c1_fingertalk.tiles(u).length; f.x = u.x; f.y = Math.max(0, u.y - 2); AB.t_b7_c1_fingertalk.run(u, f.x, f.y); out.t.marked = f.cantRound === B.round && f.cantLeft >= 1; }
  B = null; view = 'scene'; S.scene = 'talk';
  out.d.fight = await force('b7_c1_dunes'); out.d.done = S.f.b7_c1_dunesDone;
  out.fire.onward = has('b7_c1_fire', /Inland/);
  /* phase 3: the coast road */
  take('b7_c1_fire', /Inland/); take('b7_c1_inland', /Inland, to the coast road/); out.road = {area:S.area, ph:S.f.b7_c1_ph};
  talk('b7_c1_farm'); out.road.farmShut = !has('b7_c1_farm', /Take/);
  talk('b7_c1_barley'); out.road.barley = S.f.b7_c1_barley;
  talk('b7_c1_shed_view'); out.road.shedNeedsOrders = !has('b7_c1_shed_view', /Straight in/);
  talk('b7_c1_lt3'); out.road.shedOpen = has('b7_c1_shed_view', /Straight in/) && has('b7_c1_shed_view', /seaward wall/) && has('b7_c1_shed_view', /Not now/);
  out.road.pass = has('b7_c1_riders_start', /Let them pass/);
  const snapR = JSON.stringify(S);
  take('b7_c1_riders_start', /Let them pass/); out.road.passed = S.f.b7_c1_ridersPassed && !AREAS.b7_c1_road.npcs.find(n => n.id === 'riders').show();
  S = JSON.parse(snapR); save(); setBook('rg'); startExplore('b7_c1_road');
  talk('b7_c1_riders_start'); near('b7_c1_riders_start', /ditch/, 'haddat'); out.road.ditchNear = ((S.bruised || {}).haddat || 0) > 0;
  out.road.riders = await force('b7_c1_riders'); out.road.ridersDone = S.f.b7_c1_ridersDone;
  /* the tally-shed: both grounds */
  out.tally = await force('b7_c1_tally'); out.tally.blade = S.kit.includes('b7_c1_factorblade'); out.tally.done = S.f.b7_c1_tallyDone;
  take('b7_c1_tally_after', /Into the yard/); out.tally.area = S.area; out.tally.ph = S.f.b7_c1_ph;
  talk('b7_c1_shed_out'); out.tally.outGated = !has('b7_c1_shed_out', /lie-up/);
  const rb = b7Rising(), rose0 = (S.stats || {}).b7Rose || 0; talk('b7_c1_book'); take('b7_c1_book', /Burn it/);
  out.book = {burned:S.f.b7_c1_bookBurned, rise:b7Rising() - rb, rose:((S.stats || {}).b7Rose || 0) - rose0, ash:S.kit.includes('b7_c1_tallyash'), doss:/Doss/.test(DLG.b7_c1_book_burn().txt), html:/The Rising/.test(DLG.b7_c1_book_burn().html || '')};
  talk('b7_c1_book_burn'); out.book.once = b7Rising() - rb; // re-reading the node does not move it again
  talk('b7_c1_clerk'); take('b7_c1_clerk', /Go home/); out.book.clerk = S.f.b7_c1_clerk;
  talk('b7_c1_shed_out'); take('b7_c1_shed_out', /lie-up/); out.lie = {area:S.area, ph:S.f.b7_c1_ph, dossNpc:AREAS.b7_c1_road.npcs.find(n => n.id === 'doss').show()};
  talk('b7_c1_fire'); out.lie.fireCamp = /not a fire/.test(DLG.b7_c1_fire().txt) && !has('b7_c1_fire', /On with the column/);
  talk('b7_c1_lt5'); out.lie.lt5 = /bucket of water/.test(DLG.b7_c1_lt5().txt);
  /* Doss: a rise:true check carries the Rising's edge (stirring: +1) */
  const dc = DLG.b7_c1_doss().ch.find(c => c.rise); out.doss = {rise:!!dc, edge:(edgesFor(dc, 'haddat').find(e => /Rising/.test(e[0])) || [])[1] || 0, tier:b7RiseTier()};
  made('b7_c1_doss', /roads inland/, 'haddat'); out.doss.roads = S.f.b7_c1_dossRoads;
  const snapD = JSON.stringify(S);
  take('b7_c1_doss_roads', /soldier's pay/); take('b7_c1_doss_pay', /Wait with the camp followers/); out.doss.wait = {flag:S.f.b7_dossDone, roster:ROSTER_BOOKS.rg.wait('doss'), npc:AREAS.b7_c1_road.npcs.find(n => n.id === 'doss').show()};
  talk('b7_c1_doss'); take('b7_c1_doss', /Walk with us/); out.doss.wait.joined = b7In('doss') && S.f.b7_dossDone === 1;
  S = JSON.parse(snapD); save(); setBook('rg'); startExplore('b7_c1_road');
  take('b7_c1_doss_roads', /soldier's pay/); take('b7_c1_doss_pay', /Then walk with us/); out.doss.join = {in:b7In('doss'), flag:S.f.b7_dossDone, fire:/Doss/.test(DLG.b7_c1_fire_talk().txt), lvl:S.lvl};
  S.picksDue = []; { const m = document.getElementById('modal'); if (m) m.hidden = true; } take('b7_c1_doss_join', /page/); out.doss.page = S.f.b7_c1_dossPage;
  /* the end */
  talk('b7_c1_fire'); out.end = {onward:has('b7_c1_fire', /On with the column/)}; take('b7_c1_fire', /On with the column/);
  out.end.dossLine = /Doss/.test(DLG.b7_c1_onward().txt); out.end.notYet = has('b7_c1_onward', /Not yet/);
  take('b7_c1_onward', /Inland, with the column/); await wait(60);
  out.end = Object.assign(out.end, {view, ch:S.chapters[1], lvl:S.lvl, xp:S.xp, rise:b7Rising(), extras:CHAPTERS[1].extras().length, journal:CHAPTERS[1].journal().length, endText:(CHEND[1] || {}).burn && CHEND[1].burn[0]});
  /* ================= a --from=1 style save: Sathi alive, Book Four's spares and Book Six's recruits walking ================= */
  setBook('rg'); S = newStateRG('Syn', 'Other'); delete S.dead.sathi; S.squad = ['sgt', 'haddat', 'sathi', 'tallow', 'ottar', 'mehet']; ['sathi', 'tallow', 'ottar', 'mehet'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.picksDue = []; save(); startChapter(1);
  S.f.b7_c1_ph = 2;
  out.y = {renderErr:renderAll(), lines:DLG.b7_c1_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, sathi:/Sathi/.test(DLG.b7_c1_fire_talk().txt), ottar:/Ottar/.test(DLG.b7_c1_fire_talk().txt), reader:visReader().id};
  S.f.b7_c1_ph = 5; out.y.lines5 = DLG.b7_c1_fire_talk().txt.split('\n\n').length;
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, s = r.s || {}, b = r.b || {}, rd = r.r || {}, fi = r.fire || {}, t = r.t || {}, d = r.d || {}, ro = r.road || {}, ta = r.tally || {}, bk = r.book || {}, li = r.lie || {}, ds = r.doss || {}, en = r.end || {}, y = r.y || {};
if (f.area) {
  f.area === 'b7_c1_beach' && f.ch === 1 && f.thread === 't' && f.lvl0 === 16 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && f.sathiDead && !f.renderErr.length && !f.slip.length && f.title === 'The Burned Ships' && f.shelf === false && f.rise0 === 2 && f.items && f.figure && f.por && f.scenes
    ? ok(`a fresh start opens Chapter One on the beach at level 16 with the Third (Sathi dead), the Rising at 2; every b7_c1 node renders (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); items, Doss and the four backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 900));
  f.ph === 1 && f.startWalk && f.boatsGated && f.orders === 1 && f.why && f.bonehunters <= 1 && f.qm.salve === 1 && f.qm.silver === 4 && f.oldNotNow && f.warned === 1 && f.fireUnlit && f.inlandGated
    ? ok(`the landing: the waterline waits on the lieutenant; her orders and the runner's "unwitnessed"; "Bonehunters" ${f.bonehunters}× at most; the quartermaster's salve (4 silver); the old soldier's word on the Edur; the fire unlit; inland gated`) : no('landing ' + JSON.stringify(f).slice(0, 700));
  f.key.burn && f.key.strip && f.key.notYet && f.key.html ? ok('the key at the waterline: burn, strip, Not yet, the Rising shown') : no('key ' + JSON.stringify(f.key));
}
s.key === 'strip' && s.late === 1 && s.sharper === 2 && s.salve1 === 1 && s.tangle === 1 && s.haddat === -1 && s.cloak && s.dunes && s.dunes.started && s.road.area === 'b7_c1_road' && s.road.ph === 3 && s.shedGated && s.noPass && s.farm.salve === 2 && s.farm.rise === -1 && s.farm.done === 1 && s.farm.fell >= 1 && s.stillGated && s.riders && s.riders.started && s.riders.after === 'b7_c1_riders_after' && s.shedOpen
  ? ok('key strip: +2 sharpers and a salve from the holds, late (Tangle +1, Haddat −1); on the road the riders cannot be let pass; the farm gives the second salve and the Rising −1; the shed opens only after the farm and the riders') : no('strip ' + JSON.stringify(s).slice(0, 900));
b.key === 'burn' && b.haddat === 1 && b.tangle === -1 && b.sharper === 0 && b.burned === 1 && b.cloak && b.ph === 2 ? ok('key burn: fired on the lamp (Haddat +1, Tangle −1), no extra stores; the burning gives the charred cloak') : no('burn ' + JSON.stringify(b));
rd.deckChoice && rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.back === 'b7_c1_fire' && rd.words && rd.cardNode === 'The Deck of Dragons' ? ok(`the first halt above the beach: the Deck offered; Marrow reads (${rd.card}); back to b7_c1_fire`) : no('reading ' + JSON.stringify(rd));
fi.again && fi.rest && fi.talk && fi.notNow && fi.roster && fi.html && fi.noOnward && fi.rested && fi.talkLines === fi.here && fi.onward ? ok(`the fire: an again line, the Rising box, a rest (wounds close), the talk (a line each, ${fi.talkLines}), the roster, Not now; the way inland only after the dunes`) : no('fire ' + JSON.stringify(fi));
t.notNow && t.who === 'haddat' && t.ok === 1 && t.fx && t.dc === 17 && t.offered && t.tiles >= 1 && t.marked ? ok('the trick: Finger-Talk, a ✦ wits 17 check with a marine of the column; in a fight it marks an enemy for criticals (the hand-cant)') : no('trick ' + JSON.stringify(t));
d.orders === 1 && d.npc && d.sneak && d.notNow && d.fight && d.fight.started && d.fight.dark && d.fight.after === 'b7_c1_dunes_after' && d.done === 1 ? ok(`the dunes: the Edur patrol (${d.fight.foes} foes, dark), a forced win`) : no('dunes ' + JSON.stringify(d));
ro.area === 'b7_c1_road' && ro.ph === 3 && ro.farmShut && ro.barley === 1 && ro.shedNeedsOrders && ro.shedOpen && ro.pass && ro.passed && ro.ditchNear && ro.riders && ro.riders.started && ro.ridersDone === 1 ? ok('the coast road on burn: the farm left shut; the marines in the barley; the shed waits on the lieutenant; the riders can be let pass, or ambushed from the ditch (a "yes, but") and beaten') : no('road ' + JSON.stringify(ro));
ta.started && ta.stage2 && ta.inStage2 && ta.after === 'b7_c1_tally_after' && ta.blade && ta.done === 1 && ta.area === 'b7_c1_shed' && ta.ph === 4 && ta.outGated ? ok('the tally-shed: both grounds forced (the shed door), the factor\'s guard-sword; the yard; the gate waits on the book') : no('tally ' + JSON.stringify(ta));
bk.burned === 1 && bk.rise === 1 && bk.rose >= 1 && bk.ash && bk.doss && bk.html && bk.once === 1 && bk.clerk === 'freed' ? ok('the tally-book burned: the Rising +1 (once), the page with Doss\'s name on it; the clerk sent home') : no('book ' + JSON.stringify(bk));
li.area === 'b7_c1_road' && li.ph === 5 && li.dossNpc && li.fireCamp && li.lt5 && ds.rise && ds.edge === 1 && ds.tier === 'stirring' && ds.roads === 1 ? ok('the lie-up: the cold fire, the lieutenant\'s word; Doss at the pickets; his rise:true check carries "The Rising" +1') : no('lie/doss ' + JSON.stringify([li, ds]).slice(0, 600));
ds.wait && ds.wait.flag === 2 && ds.wait.roster && ds.wait.npc && ds.wait.joined && ds.join && ds.join.in && ds.join.flag === 1 && ds.join.fire && ds.page === 1 ? ok('Doss waits with the camp followers, then joins; or joins at once, with his line at the fire and the burnt page') : no('doss ' + JSON.stringify(ds));
en.onward && en.dossLine && en.notYet && en.view === 'end' && en.ch === 'burn' && en.lvl >= 17 && en.rise === 3 && en.extras >= 4 && en.journal >= 6 && en.endText === 'On the lamp' ? ok(`the end: on with the column (Not yet offered); the chapter ends on burn at level ${en.lvl} (${en.xp} xp), the Rising at ${en.rise}`) : no('end ' + JSON.stringify(en));
y.renderErr && !y.renderErr.length && y.lines === y.here && y.sathi && y.ottar && y.lines5 === y.here && (y.reader === 'marrow' || y.reader === 'tallow') ? ok(`a --from=1 style save (Sathi, Tallow, Ottar and Mehet walking, no Marrow): every node renders, a line each at the fire in both phases (${y.lines}), ${y.reader} reads`) : no('synthetic ' + JSON.stringify(y));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b7ch1: FAIL (${bad.length})` : 'b7ch1: all ok'); process.exit(bad.length ? 1 : 0);
