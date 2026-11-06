// Book Seven, Chapter 2 (The File, src/122_b7_ch2.js): the halts, both keys from the same moment in the yard, the reading at the first halt
// (the yard, the Tiles through Perrit), the fire (rest, a line each, the Rising box, the roster, Not now), every fight's start and a forced
// win (both grounds of the alley; the bridge at four with a clean file and at six once it carries a note), the trick (taught, and its battle
// half), the Rising and file moves ('name': Rising −1, file −1; 'refuse': Rising +1, file +2; the neighbours' "yes, but" files +1), the
// grey coat's edge on a rise:true Guile check, Ilsa's join (and the waiting road, and the road out), and the chapter's end; from a fresh
// start, and from a --from=2 style save with Perrit dead and Book Five's recruits walking, where every node must still render, the
// tile-woman reads, and every squadmate has a line at the fire.
// Usage: node tools/b7ch2_test.mjs   (build first; exit 1 on a failure)
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
  const win = async (id) => { const res = {id};
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const force = async (id, start) => { (start || (() => startBattle(id, {})))(); await wait(60); const res = {started:!!B && B.id === id, foes:B.units.filter(u => u.side === 'e').length, dark:!!B.def.dark}; return Object.assign(res, await win(id)); };
  const nodes = Object.keys(DLG).filter(k => /^b7_c2_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b|Kettle|Tehol the Only|Mael\b|Bonehunter|!\s/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt.replace(/"[^"]*"/g, '') + (n.html || '').replace(/<[^>]*>/g, ''))) errs.push(k + ': leaks'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); (n.ch || []).forEach(c => { const t = typeof c.t === 'function' ? c.t() : c.t; if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const atPhases = () => { const was = S.f.b7_c2_ph, errs = []; [1, 2, 3, 4, 5].forEach(p => { S.f.b7_c2_ph = p; renderAll().forEach(e => errs.push(p + ':' + e)); }); S.f.b7_c2_ph = was; return errs; };
  const lines = () => DLG.b7_c2_fire_talk().txt.split('\n\n').length;
  try {
  /* ================= a fresh start ================= */
  setBook('rg'); S = newStateRG('Fresh', 'Other'); S.picksDue = []; save(); startChapter(2); S.picksDue = [];
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, renderErr:atPhases(), title:CHAPTERS[2].title, nodes:nodes.length, areas:CHAPTERS[2].areas.length, fights:Object.keys(CHAPTERS[2].battles).length,
    rise0:b7Rising(), file0:b7File(), items:Object.keys(CHAPTERS[2].gear).every(k => !!ART['item/' + k] && ITEMS[k].role && !/receipt|hookknife|sealcoat/.test(ART['item/' + k].slice(0, 400))),
    figure:typeof FIGX.ilsa === 'function' && typeof FIGX.b7_agent === 'function' && FOES.b7_agent.kind === 'b7_agent', por:typeof POR.ilsa === 'function',
    scenes:['b7_barracks', 'b7_letheras', 'b7_c2_greymorning', 'b7_c2_alley', 'b7_c2_bridge'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), other:Object.keys(S.th || {}).join(',')};
  /* phase 1: the yard, the reading (Perrit, the Tiles), the Finadd, the clerk, the tile-woman, the gate */
  talk('b7_c2_yard'); out.f.ph = S.f.b7_c2_ph; out.f.tiles = has('b7_c2_yard', /tiles/);
  talk('b7_c2_read'); const rd = DLG.b7_c2_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b7_c2_drawn, reader:S.f.b7_c2_reader, card:S.card, inPool:B7POOL[2].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), back:B7READ[2].back, words:rd.txt.length > 40};
  talk('b7_c2_card'); out.r.cardNode = DLG.b7_c2_card().sp; out.r.backGo = DLG.b7_c2_card().ch[0].go;
  talk('b7_c2_bunk'); out.f.bunkGated = !has('b7_c2_bunk', /Morning/);
  talk('b7_c2_ennic'); out.f.ennic = S.f.b7_c2_ennic; take('b7_c2_ennic', /barracks saying/); out.f.quarrel = S.f.b7_c2_quarrel && /First Concubine/.test(DLG.b7_c2_ennic_news().txt) && /champions/.test(DLG.b7_c2_ennic_news().txt);
  talk('b7_c2_clerk'); made('b7_c2_clerk', /Patriotists' clerk copied/, 'perrit'); out.f.clerk = S.f.b7_c2_clerkOk;
  talk('b7_c2_tilewoman'); out.f.tw = S.f.b7_c2_tw;
  talk('b7_c2_gate_view'); out.g = {lesson:has('b7_c2_gate_view', /lesson/), watch:has('b7_c2_gate_view', /Make him wait/), decline:has('b7_c2_gate_view', /Decline/), notNow:has('b7_c2_gate_view', /Not now/), npc:AREAS.b7_c2_barracks.npcs.find(n => n.id === 'edur').show()};
  out.g.fight = await force('b7_c2_gate'); out.g.done = S.f.b7_c2_gateDone; out.g.npcGone = !AREAS.b7_c2_barracks.npcs.find(n => n.id === 'edur').show();
  /* the fire, phase 1 */
  talk('b7_c2_fire'); const fy = DLG.b7_c2_fire(); out.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b7_c2_fire', /rest/), talk:has('b7_c2_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), roster:ROSTER_FIRES.rg[2].includes('b7_c2_fire'), html:/The Rising/.test(fy.html || ''), bed:has('b7_c2_fire', /^Bed/)};
  S.wounds = {tobet:4}; take('b7_c2_fire', /Let the squad rest/); out.fire.rested = S.f.b7_c2_rest1 && !S.wounds;
  out.fire.talkLines = lines(); out.fire.here = S.squad.filter(id => id !== 'sgt').length;
  /* the night, then the morning street */
  take('b7_c2_fire', /^Bed/); take('b7_c2_bunk', /Morning/); out.st = {area:S.area, ph:S.f.b7_c2_ph};
  talk('b7_c2_to_alley'); out.st.alleyGated = !has('b7_c2_to_alley', /after them/);
  talk('b7_c2_door'); made('b7_c2_door', /Read the room/, 'perrit'); out.st.door = S.f.b7_c2_door && S.f.b7_c2_doorRead && S.f.b7_c2_cook;
  take('b7_c2_door', /Wipe/); out.st.slate = S.f.b7_c2_slate;
  talk('b7_c2_board'); out.st.board = S.f.b7_c2_board && /Karos Invictad/.test(DLG.b7_c2_board().txt) && /rat/.test(DLG.b7_c2_board().txt);
  talk('b7_c2_agents'); talk('b7_c2_stall'); const ds = S.silver, dsa = S.inv.salve; take('b7_c2_stall', /jar of salve/); out.st.stall = {docks:ds - S.silver, salve:S.inv.salve - dsa};
  /* the neighbours: a rise:true Guile check; with a clean file, no edge from the file; its "yes, but" files a page (tested from a snapshot) */
  const nc = DLG.b7_c2_neighbours().ch.find(c => c.rise); out.n = {rise:!!nc, fileEdge:edgesFor(nc, 'tobet').some(e => /file/.test(e[0])), heat:b7HeatTier()};
  const snapN = JSON.stringify(S);
  near('b7_c2_neighbours', /Ask him/, 'tobet'); out.n.nearFile = b7File(); out.n.filed = (S.stats || {}).b7Filed || 0;
  S = JSON.parse(snapN); save(); setBook('rg'); startExplore('b7_c2_street');
  made('b7_c2_neighbours', /Ask him/, 'ammet'); out.n.ok = S.f.b7_c2_neighOk && b7File() === 0;
  /* Ilsa: the file, the grey coat; walk, wait, or go */
  talk('b7_c2_ilsa'); out.i = {notNow:has('b7_c2_ilsa', /Not now/)}; take('b7_c2_ilsa', /Go on/); out.i.met = S.f.b7_c2_ilsaMet; out.i.coat = S.kit.includes('b7_c2_greycoat');
  out.i.choices = ['walk with us', 'safe room', 'Get out', 'Not now'].every(w => has('b7_c2_ilsa_file', new RegExp(w)));
  const snapI = JSON.stringify(S);
  take('b7_c2_ilsa_file', /safe room/); out.i.wait = {flag:S.f.b7_ilsaDone, roster:ROSTER_BOOKS.rg.wait('ilsa'), camp:(S.camp || []).includes('ilsa'), npc:AREAS.b7_c2_street.npcs.find(n => n.id === 'ilsa').show(), teach:b72Teach()};
  talk('b7_c2_ilsa'); take('b7_c2_ilsa', /Walk with us/); out.i.wait.joined = b7In('ilsa') && S.f.b7_ilsaDone === 1 && !(S.camp || []).includes('ilsa');
  S = JSON.parse(snapI); save(); setBook('rg'); startExplore('b7_c2_street');
  take('b7_c2_ilsa_file', /Get out/); out.i.away = {flag:S.f.b7_ilsaDone, can:b7CanRecruit('ilsa'), teach:b72Teach()};
  S = JSON.parse(snapI); save(); setBook('rg'); startExplore('b7_c2_street');
  take('b7_c2_ilsa_file', /walk with us/); out.i.join = {in:b7In('ilsa'), flag:S.f.b7_ilsaDone, lvl:S.lvl, fire:/Ilsa/.test(DLG.b7_c2_fire_talk().txt), lines:lines(), here:S.squad.filter(id => id !== 'sgt').length};
  S.picksDue = []; { const m = document.getElementById('modal'); if (m) m.hidden = true; }
  /* the grey coat: +1 on a rise:true Guile check for whoever wears it */
  S.gear.tobet = Object.assign({}, S.gear.tobet, {armour:'b7_c2_greycoat'}); out.i.coatEdge = (edgesFor(nc, 'tobet').find(e => /grey coat/.test(e[0])) || [])[1] || 0; out.i.coatOther = edgesFor(nc, 'thegg').some(e => /grey coat/.test(e[0])); delete S.gear.tobet.armour;
  /* the trick: the Clerk's Margin, from Ilsa */
  take('b7_c2_ilsa_join', /how a file is read/); out.t = {teach:b72Teach(), notNow:has('b7_c2_margin', /Not now/), dc:DLG.b7_c2_margin().ch[0].check[1]}; made('b7_c2_margin', /Learn the marks/, 'ilsa');
  out.t = Object.assign(out.t, {who:S.tricks && S.tricks.b7_c2_margin && S.tricks.b7_c2_margin.who, ok:S.f.b7_c2_marginOk, fx:/armour/.test(TRICKS.b7_c2_margin.fx)});
  /* dusk: the canal, the lamplighter (the one line of the other squad's news), the alley */
  talk('b7_c2_to_alley'); take('b7_c2_to_alley', /after them/); out.a = {area:S.area, ph:S.f.b7_c2_ph};
  S.f.b7_c1_key = 'strip'; talk('b7_c2_lamplighter'); out.a.lamp = /burned last/.test(DLG.b7_c2_lamplighter().txt) && !/Third/.test(DLG.b7_c2_lamplighter().txt); delete S.f.b7_c1_key;
  talk('b7_c2_bridge_view'); out.a.bridgeShut = !has('b7_c2_bridge_view', /Through them/);
  talk('b7_c2_alley_view'); out.a.choices = has('b7_c2_alley_view', /Straight down/) && has('b7_c2_alley_view', /Over the wall/) && has('b7_c2_alley_view', /Not now/);
  /* the margin's battle half, in the alley */
  startBattle('b7_c2_alley', {}); await wait(60);
  { const u = B.units.find(x => x.id === 'ilsa'); out.t.offered = trickOk(u, AB.t_b7_c2_margin); AB.t_b7_c2_margin.run(u); out.t.line = !!B.line && B.line.u === u && lineCovers(u); }
  out.a.fight = Object.assign({started:B.id === 'b7_c2_alley', foes:B.units.filter(u => u.side === 'e').length}, await win('b7_c2_alley'));
  out.a.kit = S.kit.includes('b7_c2_agentknife') && S.kit.includes('b7_c2_filepage'); out.a.done = S.f.b7_c2_alleyDone;
  take('b7_c2_alley_after', /Back to the barracks/); out.a.notNow = has('b7_c2_night2', /Not now/); take('b7_c2_night2', /yard/);
  out.k = {area:S.area, ph:S.f.b7_c2_ph, patNpc:AREAS.b7_c2_yardday.npcs.find(n => n.id === 'pat').show()};
  talk('b7_c2_yard_gate'); out.k.gateGated = !has('b7_c2_yard_gate', /with the lists/);
  /* the key, in the yard */
  talk('b7_c2_patriot'); const kn = DLG.b7_c2_patriot(); out.k = Object.assign(out.k, {name:has('b7_c2_patriot', /Give him a name/), refuse:has('b7_c2_patriot', /No name/), notYet:has('b7_c2_patriot', /Not yet/), html:/The Rising/.test(kn.html || '') && /Your file/.test(kn.html || ''), ilsa:/Ilsa/.test(kn.txt)});
  const snapK = JSON.stringify(S), r0 = b7Rising(), f0 = b7File(), lk = {thegg:S.loy.thegg, perrit:S.loy.perrit, ilsa:S.loy.ilsa};
  /* ================= key: name, then back to refuse from the same moment ================= */
  take('b7_c2_patriot', /Give him a name/); out.nm = {key:S.f.b7_c2_key, rise:b7Rising() - r0, file:b7File() - f0, heat:b7HeatTier(), thegg:S.loy.thegg - lk.thegg, perrit:S.loy.perrit - lk.perrit, ilsa:S.loy.ilsa - lk.ilsa};
  take('b7_c2_name', /Finadd/); out.nm.errand = S.f.b7_c2_errand; out.nm.marginOffer = !has('b7_c2_patriot_after', /margin/); // already learned
  take('b7_c2_patriot_after', /Over the bridge/); take('b7_c2_yard_gate', /with the lists/); out.nm.area = S.area; out.nm.ph = S.f.b7_c2_ph; out.nm.eel = /eel-seller's stall/.test(DLG.b7_c2_bridge_dusk().txt);
  out.nm.bridge = await force('b7_c2_bridge', () => b72Bridge({})); out.nm.hot = S.f.b7_c2_bridgeHot;
  S = JSON.parse(snapK); save(); setBook('rg'); startExplore('b7_c2_yardday');
  take('b7_c2_patriot', /No name/); out.rf = {key:S.f.b7_c2_key, rise:b7Rising() - r0, file:b7File() - f0, heat:b7HeatTier(), thegg:S.loy.thegg - lk.thegg, perrit:S.loy.perrit - lk.perrit, rose:(S.stats || {}).b7Rose || 0, filed:(S.stats || {}).b7Filed || 0};
  take('b7_c2_refuse', /Finadd/); take('b7_c2_patriot_after', /Over the bridge/); take('b7_c2_yard_gate', /with the lists/);
  talk('b7_c2_bridge_view'); out.rf.hotText = /names are on it/.test(DLG.b7_c2_bridge_view().txt); out.rf.coat = !!DLG.b7_c2_bridge_view().ch.find(c => c.rise);
  out.rf.bridge = await force('b7_c2_bridge', () => b72Bridge({})); out.rf.hot = S.f.b7_c2_bridgeHot; out.rf.done = S.f.b7_c2_bridgeDone;
  /* home, the fire, the end */
  take('b7_c2_bridge_after', /Home/); out.e = {notNow:has('b7_c2_home', /Not now/)}; take('b7_c2_home', /fire/); out.e.area = S.area;
  const fz = DLG.b7_c2_fire(); out.e.html = /The Rising/.test(fz.html || ''); out.e.onward = has('b7_c2_fire', /night is over/); out.e.lines = lines(); out.e.here = S.squad.filter(id => id !== 'sgt').length;
  talk('b7_c2_ennic_eve'); out.e.eve = S.f.b7_c2_ennicEve;
  take('b7_c2_fire', /night is over/); out.e.ilsaEnd = /Ilsa/.test(DLG.b7_c2_onward().txt); out.e.notYet = has('b7_c2_onward', /Not yet/);
  take('b7_c2_onward', /Sleep/); await wait(60);
  out.e = Object.assign(out.e, {view, ch:S.chapters[2], lvl:S.lvl, xp:S.xp, rise:b7Rising(), file:b7File(), extras:CHAPTERS[2].extras().length, journal:CHAPTERS[2].journal().length, endText:(CHEND[2] || {}).refuse && CHEND[2].refuse[0]});
  /* ================= a --from=2 style save: Perrit dead, Book Five's recruits walking; the Third waits ================= */
  setBook('rg'); S = newStateRG('Syn', 'Other'); { const L = S.th.l; L.squad = ['sgt', 'tobet', 'thegg', 'ruuk', 'brune', 'pessa']; L.dead = {perrit:{ch:7, where:'Brans Keep', from:'mt'}}; ['ruuk', 'brune', 'pessa'].forEach(k => { L.loy[k] ??= 0; L.gear[k] ??= {}; L.picks[k] ??= []; }); L.picksDue = []; }
  S.picksDue = []; save(); startChapter(2); S.picksDue = [];
  out.y = {thread:S.thread, renderErr:atPhases(), lines:lines(), here:S.squad.filter(id => id !== 'sgt').length, reader:visReader().id, teach:b72Teach(), pessa:/Pessa/.test(DLG.b7_c2_fire_talk().txt), brune:/Brune/.test(DLG.b7_c2_fire_talk().txt)};
  S.f.b7_c2_ph = 5; out.y.lines5 = lines();
  /* a full squad: Ilsa waits when six walk */
  S.f.b7_c2_ph = 2; take('b7_c2_ilsa', /Go on/); take('b7_c2_ilsa_file', /walk with us/); out.y.full = {flag:S.f.b7_ilsaDone, camp:(S.camp || []).includes('ilsa'), in:b7In('ilsa')};
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, g = r.g || {}, fi = r.fire || {}, st = r.st || {}, n = r.n || {}, i = r.i || {}, t = r.t || {}, a = r.a || {}, k = r.k || {}, nm = r.nm || {}, rf = r.rf || {}, e = r.e || {}, y = r.y || {};
if (f.area) {
  f.area === 'b7_c2_barracks' && f.ch === 2 && f.thread === 'l' && f.lvl0 === 8 && f.squad === 'sgt,tobet,thegg,perrit,ammet' && !f.renderErr.length && f.title === 'The File' && f.rise0 === 2 && f.file0 === 0 && f.items && f.figure && f.por && f.scenes && f.other === 't'
    ? ok(`a fresh start opens Chapter Two in the barracks yard at level 8 with the Letherii (the Third waiting), the Rising at 2, the file clean; every b7_c2 node renders in every phase (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); items, Ilsa, the agent and five backdrops drawn`) : no('fresh ' + JSON.stringify(f).slice(0, 900));
  f.ph === 1 && f.tiles && f.bunkGated && f.ennic === 1 && f.quarrel && f.clerk === 1 && f.tw === 1
    ? ok('the first night: the yard offers the Tiles; the bunk-house waits on the Finadd; his news (the First Concubine, the champions); the clerk\'s second book; the tile-woman') : no('night ' + JSON.stringify(f).slice(0, 600));
}
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.back === 'b7_c2_yard' && rd.words && rd.cardNode === 'The Tiles of the Holds' && rd.backGo === 'b7_c2_yard' ? ok(`the reading at the yard: Perrit lays the Tiles (${rd.card}); back to b7_c2_yard`) : no('reading ' + JSON.stringify(rd));
g.lesson && g.watch && g.decline && g.notNow && g.npc && g.fight && g.fight.started && g.fight.foes === 3 && g.fight.after === 'b7_c2_gate_after' && g.done === 1 && g.npcGone ? ok('the gate: the Edur\'s lesson (take it, watch them, decline, Not now); three Edur, a forced win') : no('gate ' + JSON.stringify(g));
fi.again && fi.rest && fi.talk && fi.notNow && fi.roster && fi.html && fi.bed && fi.rested && fi.talkLines === fi.here ? ok(`the fire: an again line, the Rising and the file, a rest (wounds close), the talk (a line each, ${fi.talkLines}), the roster, bed, Not now`) : no('fire ' + JSON.stringify(fi));
st.area === 'b7_c2_street' && st.ph === 2 && st.alleyGated && st.door && st.slate === 1 && st.board && st.stall.docks === 6 && st.stall.salve === 1 ? ok('the morning street: the cookshop door left open (read, the slate wiped), the broadsheet (Karos Invictad, the rat), the barrow (6 docks); dusk waits on Ilsa') : no('street ' + JSON.stringify(st));
n.rise && !n.fileEdge && n.heat === 'clean' && n.nearFile === 1 && n.filed >= 1 && n.ok ? ok('the neighbours: a rise:true Guile check (no file edge while clean); its "yes, but" files a page (+1); made, the file stays clean') : no('neighbours ' + JSON.stringify(n));
i.notNow && i.met === 1 && i.coat && i.choices && i.wait && i.wait.flag === 2 && i.wait.roster && i.wait.camp && i.wait.npc && i.wait.teach === 'ilsa' && i.wait.joined && i.away && i.away.flag === 0 && !i.away.can && i.away.teach === 'perrit' && i.join && i.join.in && i.join.flag === 1 && i.join.fire && i.join.lines === i.join.here && i.coatEdge === 1 && !i.coatOther
  ? ok('Ilsa: the file and the grey coat; she waits (the roster can bring her) then joins, or goes, or joins at once with a line at the fire; the coat gives +1 on a rise:true Guile check to its wearer only') : no('ilsa ' + JSON.stringify(i));
t.teach === 'ilsa' && t.notNow && t.dc === 16 && t.who === 'ilsa' && t.ok === 1 && t.fx && t.offered && t.line ? ok('the trick: the Clerk\'s Margin, a ✦ wits 16 check with Ilsa (Perrit without her); in a fight it closes the line (armour, no flanking)') : no('trick ' + JSON.stringify(t));
a.area === 'b7_c2_canal' && a.ph === 3 && a.lamp && a.bridgeShut && a.choices && a.fight && a.fight.started && a.fight.foes === 5 && a.fight.stage2 && a.fight.inStage2 && a.fight.after === 'b7_c2_alley_after' && a.kit && a.done === 1 && a.notNow
  ? ok('dusk: the lamplighter\'s rumour of burning ships (the other squad, one line); the alley, both grounds forced; the sleeve-knife and a page of the squad\'s file') : no('alley ' + JSON.stringify(a));
k.area === 'b7_c2_yardday' && k.ph === 4 && k.patNpc && k.gateGated && k.name && k.refuse && k.notYet && k.html && k.ilsa ? ok('the morning after: the man in the grey coat; the key (a name, no name, Not yet) with the Rising and the file shown; Ilsa behind the bunk-house door') : no('key ' + JSON.stringify(k));
nm.key === 'name' && nm.rise === -1 && nm.file === 0 && nm.heat === 'clean' && nm.thegg === -1 && nm.perrit === 1 && nm.ilsa === -1 && nm.errand === 1 && nm.marginOffer && nm.area === 'b7_c2_canal' && nm.ph === 5 && nm.eel && nm.bridge && nm.bridge.started && nm.bridge.foes === 4 && nm.hot === undefined && nm.bridge.after === 'b7_c2_bridge_after'
  ? ok('key name: the Rising −1, the file stays at 0 (clean); Thegg −1, Perrit +1, Ilsa −1; the eel-seller\'s door open on the way; the bridge at four') : no('name ' + JSON.stringify(nm));
rf.key === 'refuse' && rf.rise === 1 && rf.file === 2 && rf.heat === 'noted' && rf.thegg === 1 && rf.perrit === -1 && rf.rose >= 1 && rf.filed >= 2 && rf.hotText && rf.coat && rf.bridge && rf.bridge.foes === 6 && rf.hot === 1 && rf.done === 1
  ? ok('key refuse: the Rising +1, the file +2 (noted); Thegg +1, Perrit −1; at the bridge the squad\'s names are on the list, six of them') : no('refuse ' + JSON.stringify(rf));
e.notNow && e.area === 'b7_c2_barracks' && e.html && e.onward && e.lines === e.here && e.eve === 1 && e.ilsaEnd && e.notYet && e.view === 'end' && e.ch === 'refuse' && e.lvl >= 9 && e.rise === 3 && e.file === 2 && e.extras >= 5 && e.journal >= 5 && e.endText === 'No name'
  ? ok(`the end: home to the fire (the Rising and the file, a line each); the Finadd keeps the page; the chapter ends on refuse at level ${e.lvl} (${e.xp} xp), the Rising ${e.rise}, the file ${e.file}`) : no('end ' + JSON.stringify(e));
y.thread === 'l' && y.renderErr && !y.renderErr.length && y.lines === y.here && y.reader === 'tilewoman' && y.teach === 'clerk' && y.pessa && y.brune && y.lines5 === y.here && y.full && y.full.flag === 2 && y.full.camp && !y.full.in
  ? ok(`a --from=2 style save (Perrit dead; Ruuk, Brune and Pessa walking): every node renders, a line each at the fire (${y.lines}), the tile-woman reads, the clerk teaches the margin; with six walking Ilsa waits`) : no('synthetic ' + JSON.stringify(y));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b7ch2: FAIL (${bad.length})` : 'b7ch2: all ok'); process.exit(bad.length ? 1 : 0);
