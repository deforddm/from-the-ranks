// Book Five, Chapter 2 (Trate, src/82_b5_ch2.js; Harbour Tiles in src/89_b5_games.js): the chapter's halts, both keys and their debt
// moves, the reading, the fire and the pay desk, Harbour Tiles, the trick (taught, and its battle half), Brune's join (walking, and
// waiting with the boats), every fight's start and a forced win (both grounds of the hulk), and the chapter's end; from a fresh start of
// Chapter Two after a 'swim' Chapter One, and from a --from=2 style save after 'pay', where every node must still render.
// Usage: node tools/b5ch2_test.mjs   (build first; exit 1 on a failure)
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
  const force = async (id, also) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.obj = !!B.def.objective; res.dark = !!B.def.dark; res.foes = B.units.filter(u => u.side === 'e').length; res.waves = (B.def.waves || []).length;
    if (also) await also(res);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').map(u => u.kind).join(','); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b5_c2_/.test(k));
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const mk = (k1, name) => { setBook('mt'); S = newStateMT(name); S.lvl = 3; S.xp = LEVELS[2]; S.chapters = {1:k1}; S.f.b5_c1_key = k1; S.f.b5_trate = 1; S.f.b5_c1_fine = 300;
    if (k1 === 'swim') { S.f.b5_c1_swam = 1; b5Owe('thegg', 40, 'The court\'s fee'); } S.picksDue = []; save(); startChapter(2); };
  try {
  /* ================= a fresh Chapter Two, after a 'swim' Chapter One ================= */
  mk('swim', 'Fresh');
  out.f = {area:S.area, ch:S.chapter, title:CHAPTERS[2].title, num:CHAPTERS[2].number, renderErr:renderAll(), roster:ROSTER_FIRES.mt[2].includes('b5_c2_fire'), reg:BOOKSNAP.mt && !!BOOKSNAP.mt.ch[2]};
  talk('b5_c2_start'); out.f.ph = S.f.b5_c2_ph; out.f.tileChoice = has('b5_c2_start', /tiles/); out.f.startAgain = typeof DLG.b5_c2_start().again === 'function';
  /* the reading at the first halt */
  talk('b5_c2_tiles'); const tk = DLG.b5_c2_tiles(); out.f.tilesNotNow = tk.ch.some(c => /Not now/.test(c.t)); runFx(tk.ch.find(c => /lay them/.test(c.t)));
  out.f.tiles = {drawn:S.f.b5_c2_drawn, reader:S.f.b5_c2_reader, card:S.card, inPool:B5POOL[2].includes(S.card), scene:B5READ[2].scene}; talk('b5_c2_card'); const cd = DLG.b5_c2_card(); out.f.card = {sp:cd.sp, back:cd.ch[0].go};
  talk('b5_c2_tiles_done'); out.f.tilesDone = has('b5_c2_tiles_done', /Back to the work/);
  /* the Finadd, the harbour master, the wave */
  talk('b5_c2_ennic'); out.f.ennic = S.f.b5_c2_ennic; talk('b5_c2_harbourmaster'); out.f.hm = {flag:S.f.b5_c2_hm, board:has('b5_c2_harbourmaster', /board her at dusk/), notNow:has('b5_c2_harbourmaster', /Not now/), again:!!DLG.b5_c2_harbourmaster().again};
  take('b5_c2_harbourmaster', /What happened/); const wv = DLG.b5_c2_hm_wave().txt; out.f.wave = {flag:S.f.b5_c2_wave, scow:/pilot scow/.test(wv), toll:!/\d+ (dead|drowned)/.test(wv)};
  /* the market: a tooth for a dock; the flower dancers; the cart of the drowned */
  const s0 = S.silver; talk('b5_c2_market'); out.f.dancers = /flower dancers/.test(DLG.b5_c2_market().txt); take('b5_c2_market', /tooth/); out.f.tooth = {kit:S.kit.includes('b5_c2_tooth'), cost:s0 - S.silver, hp:ITEMS.b5_c2_tooth.hp};
  talk('b5_c2_cartdead'); take('b5_c2_cartdead', /Lend/); out.f.cart = S.f.b5_c2_cart;
  /* the looters in the flooded sheds */
  talk('b5_c2_sheds'); out.f.shedsNotNow = has('b5_c2_sheds', /Not now/); const sl = S.silver; out.f.loot = await force('b5_c2_looters'); out.f.loot.docks = S.silver - sl; out.f.loot.done = S.f.b5_c2_lootDone;
  /* the trick: the Pilot's Eye */
  talk('b5_c2_pilot'); out.f.pilotNotNow = has('b5_c2_pilot', /Not now/); const pc = vis('b5_c2_pilot').find(x => /Show us/.test(x.t)); out.f.pilotCheck = pc.check.join(':') + ':' + pc.trick;
  out.f.pilotEdges = ['brune', 'tobet', 'ruuk', 'thegg'].map(id => (pc.edges(id).filter(Boolean)[0] || [0, 0])[1]).join(',');
  made('b5_c2_pilot', /Show us/, 'tobet'); out.f.trick = {who:S.tricks && S.tricks.b5_c2_pilot && S.tricks.b5_c2_pilot.who, ok:S.f.b5_c2_pilotOk, ab:!!AB.t_b5_c2_pilot && AB.t_b5_c2_pilot.self, fx:/flanked/.test(TRICKS.b5_c2_pilot.fx), again:!!DLG.b5_c2_pilot_again().again};
  /* the first hulk at dusk */
  talk('b5_c2_gangplank'); take('b5_c2_gangplank', /Up the plank/); take('b5_c2_board_go', /Aboard/); out.f.hulk0 = {area:S.area, seen:S.f.b5_wraithSeen, node:S.node};
  talk('b5_c2_rigging'); talk('b5_c2_hatch'); out.f.hatchNotNow = has('b5_c2_hatch', /Not now/);
  out.f.hulk = await force('b5_c2_hulk', async res => { const u = B.units.find(x => x.side === 'p' && x.id === 'tobet') || B.units.find(x => x.side === 'p'), e = B.units.find(x => x.side === 'e'), p2 = B.units.find(x => x.side === 'p' && x !== u);
    res.offered = typeof trickOk === 'function' && trickOk(u, AB.t_b5_c2_pilot); AB.t_b5_c2_pilot.run(u); res.on = !!(B.b52eye && B.b52eye.on); res.noFlank = flanked(e, p2) === false;
    boonFoeTurnStart(e); res.marked = B.b52eye.marked === e; const c = atkCalc(p2, e); const keep = e.b52markUntil; e.b52markUntil = -1; const c0 = atkCalc(p2, e); e.b52markUntil = keep; res.bonus = c.bonus - c0.bonus;
    squadTurnStart(u); res.off = !B.b52eye.on; });
  out.f.hulkFlags = {done:S.f.b5_c2_hulkDone, ph:S.f.b5_c2_ph};
  const sh = S.silver; take('b5_c2_hulk_after', /Down the plank/); out.f.report = {area:S.area, node:S.node, docks:S.silver - sh, gaff:S.kit.includes('b5_c2_gaff'), reach:!!ITEMS.b5_c2_gaff.reach};
  /* the strand, the fire */
  take('b5_c2_hulk_report', /To the strand/); out.f.strand = {area:S.area, node:S.node};
  talk('b5_c2_fire'); const fy = DLG.b5_c2_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b5_c2_fire', /rest/), pay:has('b5_c2_fire', /pay desk/), talk:has('b5_c2_fire', /Talk with the squad/), on:has('b5_c2_fire', /Sleep\. The work/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), game:has('b5_c2_fire', /counting-tiles/), roster:fy.ch.some(c => /roster|Who walks/i.test(c.t + (c.tag || '')))};
  take('b5_c2_fire', /Let the squad rest/); out.f.rested = S.f.b5_c2_rest2;
  /* Brune joins at the Shake boats */
  talk('b5_c2_brune'); out.f.bruneOffer = ['Walk with us', 'Stay with your boats', 'can\'t take you', 'Not now'].every(t => has('b5_c2_brune', new RegExp(t)));
  take('b5_c2_brune', /Walk with us/); S.picksDue = []; { const m = document.getElementById('modal'); if (m) m.hidden = true; } talk('b5_c2_brune_join'); out.f.brune = {walks:b5In('brune'), flag:S.f.b5_bruneDone, debt:b5Debt('brune'), start:b5DebtStart('brune'), gloss:GLOSSX.mt.find(g => g[1] === 'The Shake')[3]()};
  /* the fish-hook, with Ammet there */
  talk('b5_c2_fire'); out.f.hookOffer = has('b5_c2_fire', /holding out her hand/); take('b5_c2_fire', /holding out her hand/); out.f.hook = S.f.b5_bruneHook;
  const ft = DLG.b5_c2_fire_talk().txt; out.f.talk = {lines:ft.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, brune:/Brune/.test(ft)};
  /* the pay desk; the quartermaster's salve; the Shake woman's boat */
  talk('b5_c2_clerk'); talk('b5_c2_pay'); const pd = DLG.b5_c2_pay(); out.f.desk = {html:/The squad/.test(pd.html || ''), ten:pd.ch.some(c => /docks on/.test(c.t)), notNow:/Not now/.test(pd.ch[pd.ch.length - 1].t), back:pd.ch[pd.ch.length - 1].go};
  const d0 = b5Debt('ammet'), s1 = S.silver; take('b5_c2_pay', /on Ammet's debt/); out.f.desk.paid = d0 - b5Debt('ammet'); out.f.desk.spent = s1 - S.silver;
  const sv = S.inv.salve, ss = S.silver; talk('b5_c2_qm'); take('b5_c2_qm', /^A salve/); out.f.qm = {salve:S.inv.salve - sv, docks:ss - S.silver};
  const sv2 = S.inv.salve; talk('b5_c2_shakewoman'); made('b5_c2_shakewoman', /shoulder/, 'thegg'); out.f.boat = S.inv.salve - sv2;
  /* Harbour Tiles (89) at the fire */
  S.silver = Math.max(S.silver, 6); talk('b5_c2_fire');
  { const sw = S.silver; const c = vis('b5_c2_fire').find(x => /counting-tiles/.test(x.t)); c.go(); await wait(80); const q = s => document.querySelector(s);
    out.f.game = {open:!q('#mg').hidden, title:(q('#mg h2') || {}).textContent};
    q('#htCount') && q('#htCount').click(); await wait(20); out.f.game.counted = !!(MG.state && MG.state.counted);
    for (let i = 0; i < 8; i++) { const b = q('#mgPanel [data-c="h1"]:not([disabled])') || q('#mgPanel [data-c="l1"]:not([disabled])'); if (!b) break; b.click(); await wait(15); }
    out.f.game.closed = !!q('#htDone'); out.f.game.turns = MG.state && MG.state.turn; q('#htDone') && q('#htDone').click(); await wait(60);
    out.f.game.after = S.node; out.f.game.flag = !!S.f.b5_tiles; out.f.game.net = S.silver - sw; out.f.game.capOk = (S.f.b5_tilesNet || 0) <= 12 && out.f.game.net <= 12; out.f.game.again = !has('b5_c2_fire', /counting-tiles/); }
  /* the weeks of the harbour; the night watch */
  talk('b5_c2_fire'); const sk = S.silver; take('b5_c2_fire', /Sleep\. The work/); out.f.weeks = {ph:S.f.b5_c2_ph, docks:S.silver - sk, flag:S.f.b5_c2_weeks, delegation:/delegation has sailed north/.test(DLG.b5_c2_weeks().txt)};
  const sw2 = S.silver; made('b5_c2_weeks', /night watch/, 'tobet'); out.f.watch = {ok:S.f.b5_c2_watchOk, docks:S.silver - sw2};
  take('b5_c2_watch_ok', /Back to the fire/); out.f.bountyOn = has('b5_c2_fire', /posted something/);
  take('b5_c2_fire', /posted something/); out.f.bounty = {area:S.area, node:S.node, keys:has('b5_c2_bounty', /coin first/) && has('b5_c2_bounty', /drowned first/), notYet:has('b5_c2_bounty', /Not yet/), brune:/Brune/.test(DLG.b5_c2_bounty().txt), thegg:/under once this year/.test(DLG.b5_c2_bounty().txt)};
  const snap = JSON.stringify(S);
  const L = () => ({tobet:S.loy.tobet, perrit:S.loy.perrit, brune:S.loy.brune, ammet:S.loy.ammet, thegg:S.loy.thegg});
  /* ================= key: salvage ================= */
  { const l0 = L(), sd = S.silver, bd = b5Debt('brune'); take('b5_c2_bounty', /coin first/); const l1 = L();
    out.s = {key:S.f.b5_c2_key, eased:S.f.b5_eased_brune ? 1 : 0, docks:S.silver - sd, brune:bd - b5Debt('brune'), loy:Object.fromEntries(Object.keys(l1).map(k => [k, l1[k] - l0[k]]))};
    out.s.diveTxt = /I have been under once this year already/.test(DLG.b5_c2_dive().txt); made('b5_c2_dive', /Down into the hold/, 'thegg'); take('b5_c2_dive_ok', /^On/); out.s.coat = S.kit.includes('b5_c2_sealcoat'); out.s.hauled = S.f.b5_c2_hauled;
    take('b5_c2_hauled', /To the strand/); out.s.area = S.area; out.s.wreckOn = has('b5_c2_fire', /salvage chests/); take('b5_c2_fire', /salvage chests/); out.s.wreckNotNow = has('b5_c2_wreck_start', /Not now/);
    out.s.wreck = await force('b5_c2_wreckers'); out.s.wreck.done = S.f.b5_c2_wreckDone; out.s.ph = S.f.b5_c2_ph;
    take('b5_c2_wreckers_after', /To the strand/); out.s.warOn = has('b5_c2_fire', /Finadd is coming/); take('b5_c2_fire', /Finadd is coming/); out.s.war = {flag:S.f.b5_c2_war, txt:/declared war/.test(DLG.b5_c2_war().txt) && /Kraig's Landing/.test(DLG.b5_c2_war().txt), brune:/Brune/.test(DLG.b5_c2_war().txt)};
    take('b5_c2_war', /Up the river, Finadd/); out.s.road = {notYet:has('b5_c2_road', /Not yet/), brune:/Brune/.test(DLG.b5_c2_road().txt)};
    take('b5_c2_road', /^Up the river/); await wait(60); out.s.end = {view, ch:S.chapters[2], lvl:S.lvl}; out.s.extras = CHAPTERS[2].extras().length; out.s.journal = CHAPTERS[2].journal().length; }
  /* ================= key: dead, from the same moment ================= */
  { S = JSON.parse(snap); save(); startExplore('b5_c2_quay'); G.said = {}; talk('b5_c2_bounty');
    const l0 = L(), sd = S.silver, bd = b5Debt('brune'); take('b5_c2_bounty', /drowned first/); const l1 = L();
    out.d = {key:S.f.b5_c2_key, docks:S.silver - sd, brune:bd - b5Debt('brune'), loy:Object.fromEntries(Object.keys(l1).map(k => [k, l1[k] - l0[k]]))};
    const dc = vis('b5_c2_dive').find(x => /Down into the hold/.test(x.t)); out.d.theggEdge = (dc.edges('thegg').filter(Boolean)[0] || [0, 0])[1]; out.d.diveTxt = /I have been under once this year already/.test(DLG.b5_c2_dive().txt);
    made('b5_c2_dive', /Down into the hold/, 'thegg'); take('b5_c2_dive_ok', /^On/); out.d.laid = {flag:S.f.b5_c2_laid, shells:S.kit.includes('b5_c2_shells'), brune:/Brune lays the shells/.test(DLG.b5_c2_laid().txt)};
    take('b5_c2_laid', /Stay with the dead/); out.d.tideNotNow = has('b5_c2_tide_start', /Not now/);
    out.d.tide = await force('b5_c2_tide'); out.d.tide.done = S.f.b5_c2_tideDone; out.d.ph = S.f.b5_c2_ph;
    take('b5_c2_tide_after', /To the strand/); take('b5_c2_fire', /Finadd is coming/); take('b5_c2_war', /Up the river, Finadd/);
    out.d.shellsOnQuay = /shells are still lying/.test(DLG.b5_c2_road().txt); take('b5_c2_road', /^Up the river/); await wait(60); out.d.end = {view, ch:S.chapters[2], lvl:S.lvl}; }
  /* ================= Brune waits with the boats; the bounty still reaches her ================= */
  { mk('pay', 'Wait'); talk('b5_c2_start'); S.f.b5_c2_ph = 2; S.f.b5_c2_hulkDone = 1; startExplore('b5_c2_strand');
    talk('b5_c2_brune'); take('b5_c2_brune', /Stay with your boats/); out.w = {flag:S.f.b5_bruneDone, waits:b5Waiting('brune'), walks:b5In('brune'), camp:(S.camp || []).includes('brune'), debt:b5Debt('brune'), npc:AREAS.b5_c2_strand.npcs.find(n => n.id === 'brune').show()};
    out.w.offers = b5Offers().includes('brune'); out.w.again = has('b5_c2_brune_again', /Walk with us now/);
    S.f.b5_c2_ph = 3; S.f.b5_c2_weeks = 1; startExplore('b5_c2_quay'); talk('b5_c2_bounty'); out.w.perrit = /eight a line/.test(DLG.b5_c2_bounty().txt); out.w.watching = /Brune is among them/.test(DLG.b5_c2_bounty().txt);
    const snapW = JSON.stringify(S), lb = S.loy.brune, bd = b5Debt('brune'); take('b5_c2_bounty', /coin first/); out.w.forgiven = bd - b5Debt('brune'); out.w.loySalv = S.loy.brune - lb; out.w.eased = S.f.b5_eased_brune ? 1 : 0;
    S = JSON.parse(snapW); save(); const lb2 = S.loy.brune; take('b5_c2_bounty', /drowned first/); out.w.loyDead = S.loy.brune - lb2;
    /* turned away: she is gone from the strand */
    mk('pay', 'Away'); S.f.b5_c2_ph = 2; startExplore('b5_c2_strand'); talk('b5_c2_brune'); take('b5_c2_brune', /can't take you/); out.w.away = {flag:S.f.b5_bruneDone, npc:AREAS.b5_c2_strand.npcs.find(n => n.id === 'brune').show(), can:b5CanRecruit('brune')}; }
  /* ================= a --from=2 style save ('pay' Chapter One): every node renders, phase by phase ================= */
  { setBook('mt'); S = newStateMT('Syn'); S.lvl = 3; S.xp = LEVELS[2]; S.f.b5_c1_key = 'pay'; S.chapters = {1:'pay'}; S.picksDue = []; migrate(S); save(); startChapter(2);
    const errs = []; [1, 2, 3, 4].forEach(ph => { S.f.b5_c2_ph = ph; if (ph >= 3) S.f.b5_c2_key = ph === 3 ? null : 'dead'; errs.push(...renderAll().map(e => `ph${ph} ${e}`)); });
    b5Join('brune'); errs.push(...renderAll().map(e => `brune ${e}`)); out.y = {renderErr:errs, brune:b5In('brune')}; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, s = r.s || {}, d = r.d || {}, w = r.w || {}, y = r.y || {};
if (f.area) {
  f.area === 'b5_c2_quay' && f.ch === 2 && f.title === 'Trate' && f.num === 'Two' && !f.renderErr.length && f.roster && f.reg ? ok('a fresh Chapter Two opens on the quays at Trate; registered for Book Five; every b5_c2 node renders') : no('fresh ' + JSON.stringify(f).slice(0, 600));
  f.ph === 1 && f.tileChoice && f.startAgain && f.tilesNotNow && f.tiles.drawn === 1 && f.tiles.reader === 'perrit' && f.tiles.inPool && f.tiles.scene === 'b5_trate_harbour' && f.card.sp === 'The Tiles of the Holds' && f.card.back === 'b5_c2_tiles_done' && f.tilesDone ? ok(`the first halt and the reading on the quay (Perrit lays the tiles: ${f.tiles.card}; "Not now" offered)`) : no('tiles ' + JSON.stringify([f.ph, f.tileChoice, f.tiles, f.card, f.tilesDone]));
  f.ennic && f.hm.flag && f.hm.board && f.hm.notNow && f.hm.again && f.wave.flag && f.wave.scow && f.wave.toll ? ok('the Finadd, the harbour master\'s board (a hub with an again line), the wave told without a toll') : no('hm ' + JSON.stringify([f.ennic, f.hm, f.wave]));
  f.dancers && f.tooth.kit && f.tooth.cost === 1 && f.tooth.hp === 3 && f.cart ? ok('the market: the flower dancers, a tooth nobody can name for a dock (+3 health); the Legion\'s cart') : no('market ' + JSON.stringify([f.dancers, f.tooth, f.cart]));
  f.shedsNotNow && f.loot.started && f.loot.after === 'b5_c2_looters_after' && f.loot.done && f.loot.docks === 8 ? ok('the looters in the flooded sheds: a forced win, +8 docks') : no('looters ' + JSON.stringify(f.loot));
  f.pilotNotNow && f.pilotCheck === 'wits:16:b5_c2_pilot' && f.pilotEdges === '2,1,1,-1' && f.trick.who === 'tobet' && f.trick.ok && f.trick.ab && f.trick.fx && f.trick.again ? ok('the trick: the Pilot\'s Eye, ✦ Wits 16 (Brune +2, Tobet +1, Ruuk +1, Thegg −1), taught at the end of the long quay') : no('trick ' + JSON.stringify([f.pilotCheck, f.pilotEdges, f.trick]));
  f.hulk0.area === 'b5_c2_hulk' && f.hulk0.seen === 1 && f.hatchNotNow && f.hulk.started && f.hulk.dark && f.hulk.waves === 1 && f.hulk.stage2 && f.hulk.inStage2 && /b5_c2_drowned/.test(f.hulk.foes2 || '') && f.hulk.after === 'b5_c2_hulk_after' ? ok(`the first hulk at dusk: the shapes in the rigging (b5_wraithSeen); dark, a wave, both grounds forced, the drowned man's coat on the deck (${f.hulk.foes2})`) : no('hulk ' + JSON.stringify([f.hulk0, f.hulk]));
  f.hulk.offered && f.hulk.on && f.hulk.noFlank && f.hulk.marked && f.hulk.bonus === 2 && f.hulk.off ? ok('the Pilot\'s Eye in the hulk: no flanking while it holds, the first enemy to move is marked, +2 to hit it, done at the bearer\'s next turn') : no('trick in battle ' + JSON.stringify(f.hulk));
  f.hulkFlags.done === 1 && f.hulkFlags.ph === 2 && f.report.area === 'b5_c2_quay' && f.report.docks === 10 && f.report.gaff && f.report.reach && f.strand.area === 'b5_c2_strand' ? ok('the harbour master pays the Legion\'s 10 docks and gives the gaff (a reach weapon); down to the strand') : no('report ' + JSON.stringify([f.hulkFlags, f.report, f.strand]));
  f.fire.again && f.fire.rest && f.fire.pay && f.fire.talk && f.fire.on && f.fire.notNow && f.fire.game && f.fire.roster && f.rested === 1 ? ok('the fire on the strand: an again line, a rest, the pay desk, the squad\'s talk, Harbour Tiles, the roster, the way on with Not now') : no('fire ' + JSON.stringify([f.fire, f.rested]));
  f.bruneOffer && f.brune.walks && f.brune.flag === 1 && f.brune.debt === 60 && f.brune.start === 60 && f.brune.gloss ? ok('Brune of the Shake joins at the boats with her own 60 docks (walk, wait, turn away, Not now offered)') : no('brune ' + JSON.stringify([f.bruneOffer, f.brune]));
  f.hookOffer && f.hook === 1 && f.talk.lines === f.talk.here && f.talk.brune ? ok(`the fish-hook (Brune and Ammet both there); the squad's talk, a line each with Brune's (${f.talk.lines})`) : no('hook/talk ' + JSON.stringify([f.hookOffer, f.hook, f.talk]));
  f.desk.html && f.desk.ten && f.desk.notNow && f.desk.back === 'b5_c2_fire' && f.desk.paid === 10 && f.desk.spent === 10 && f.qm.salve === 1 && f.qm.docks === 6 && f.boat === 1 ? ok('the pay desk (10 docks on Ammet\'s line, back to the fire); the quartermaster\'s salve at 6; the Shake woman\'s salve for the boat') : no('desk ' + JSON.stringify([f.desk, f.qm, f.boat]));
  f.game && f.game.open && f.game.title === 'Harbour Tiles' && f.game.closed && f.game.turns === 8 && f.game.after === 'b5_c2_tiles_after' && f.game.flag && f.game.capOk && f.game.again ? ok(`Harbour Tiles at the fire: the count, eight calls, the table closes and pays once (net ${f.game.net} docks)`) : no('game ' + JSON.stringify(f.game));
  f.weeks.ph === 3 && f.weeks.docks === 6 && f.weeks.flag && f.weeks.delegation && f.watch.ok && f.watch.docks === 5 && f.bountyOn ? ok('the weeks of the harbour (+6, the delegation sailed north as rumour), the night watch (+5), the bounty posted') : no('weeks ' + JSON.stringify([f.weeks, f.watch, f.bountyOn]));
  f.bounty.area === 'b5_c2_quay' && f.bounty.node === 'b5_c2_bounty' && f.bounty.keys && f.bounty.notYet && f.bounty.brune && f.bounty.thegg ? ok('the key at the harbour master\'s board: both ways, Not yet; Brune\'s line; on Ch1 swim, Thegg\'s') : no('bounty ' + JSON.stringify(f.bounty));
}
s.key === 'salvage' && s.docks === 40 && s.brune === 30 && JSON.stringify(s.loy) === JSON.stringify({tobet:1, perrit:1, brune:-1 + s.eased, ammet:-1, thegg:0}) && s.diveTxt && s.coat && s.hauled ? ok('key salvage: +40 docks, 30 off Brune\'s boat, Tobet +1, Perrit +1, Brune −1 (and +1 back when the debt halves), Ammet −1; the dive (Thegg, on swim), the sealskin coat') : no('salvage ' + JSON.stringify(s));
s.wreckOn && s.wreckNotNow && s.wreck && s.wreck.started && s.wreck.after === 'b5_c2_wreckers_after' && s.wreck.done && s.ph === 4 ? ok('salvage: the wreckers at the chests that night (a forced win)') : no('wreckers ' + JSON.stringify([s.wreckOn, s.wreck, s.ph]));
s.warOn && s.war && s.war.flag && s.war.txt && s.war.brune && s.road.notYet && s.road.brune && s.end && s.end.view === 'end' && s.end.ch === 'salvage' && s.end.lvl >= 4 ? ok(`salvage: the Edur have declared war, the barges to Kraig's Landing, Brune at the end, the chapter's end (level ${s.end && s.end.lvl}; ${s.extras} end lines, ${s.journal} journal)`) : no('salvage end ' + JSON.stringify([s.war, s.road, s.end]));
d.key === 'dead' && d.docks === 0 && d.brune === 0 && JSON.stringify(d.loy) === JSON.stringify({tobet:0, perrit:0, brune:2, ammet:1, thegg:1}) && d.theggEdge === 2 && d.diveTxt ? ok('key dead: no docks, Brune +2, Ammet +1, Thegg +1; Thegg goes down (+2 on the dive, on Ch1 swim)') : no('dead ' + JSON.stringify(d));
d.laid && d.laid.flag === 1 && d.laid.shells && d.laid.brune && d.tideNotNow && d.tide && d.tide.started && d.tide.obj && d.tide.waves === 1 && d.tide.done && d.ph === 4 && d.shellsOnQuay && d.end && d.end.ch === 'dead' ? ok('dead: the dead laid on the quay with the Shake, the shells from Brune; the evening tide (an objective fight, a wave); the end') : no('dead end ' + JSON.stringify([d.laid, d.tide, d.end]));
w.flag === 2 && w.waits && !w.walks && w.camp && w.debt === 60 && w.npc && w.offers && w.again && w.perrit && w.watching && w.forgiven === 30 && w.loySalv === w.eased && w.loyDead === 2 && w.away && w.away.flag === 0 && !w.away.npc && !w.away.can ? ok('Brune waits with the boats (the roster can bring her in; the salvage bounty still pays her boat, and she sees the dead carried, +2); turned away, she is gone; on Ch1 pay, Perrit\'s sums') : no('wait ' + JSON.stringify(w));
y.renderErr && !y.renderErr.length && y.brune ? ok('a --from=2 style save after Ch1 pay: every node renders in every phase, with Brune and without') : no('synthetic ' + JSON.stringify(y).slice(0, 800));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b5ch2: FAIL (${bad.length})` : 'b5ch2: all ok'); process.exit(bad.length ? 1 : 0);
