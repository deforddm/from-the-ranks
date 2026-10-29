// Book Five, Chapter 3 (Kraig's Landing, src/83_b5_ch3.js; Knucklebones in src/89_b5_games.js): the chapter's halts, both keys and their
// debt moves, the reading, the fire and the pay desk, Knucklebones, the trick (taught, and its battle half), Ruuk's join (walking in
// Brune's place, walking with room, waiting with the scouts, turned away) and his trader's man (paid, let ride, talked down), every
// fight's start and a forced win (both grounds of the barges), and the chapter's end; from a fresh start of Chapter Three after a 'dead'
// Chapter Two with Brune walking, and from a --from=3 style save, where every node must still render.
// Usage: node tools/b5ch3_test.mjs   (build first; exit 1 on a failure)
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
  const missed = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); runFx(c); settleRoll({who, stat:c.check[0], tier:'fail', ok:false, pass:false, margin:-6, nat:3}, c); talk(c.fail); return c; };
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const force = async (id, also) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.obj = !!B.def.objective; res.dark = !!B.def.dark; res.foes = B.units.filter(u => u.side === 'e').length; res.waves = (B.def.waves || []).length; res.kinds = B.units.filter(u => u.side === 'e').map(u => u.kind).join(',');
    if (also) await also(res);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').map(u => u.kind).join(','); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b5_c3_/.test(k));
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const mk = (k2, name, brune) => { setBook('mt'); S = newStateMT(name); S.lvl = 4; S.xp = LEVELS[3]; S.chapters = {1:'pay', 2:k2}; S.f.b5_c1_key = 'pay'; S.f.b5_c2_key = k2; S.f.b5_trate = 1;
    if (brune) { b5Join('brune'); shut(); } S.picksDue = []; save(); startChapter(3); };
  const L = () => ({tobet:S.loy.tobet, thegg:S.loy.thegg, perrit:S.loy.perrit, ammet:S.loy.ammet, ruuk:S.loy.ruuk ?? null});
  try {
  /* ================= a fresh Chapter Three, after a 'dead' Chapter Two, with Brune walking ================= */
  mk('dead', 'Fresh', true);
  out.f = {area:S.area, ch:S.chapter, title:CHAPTERS[3].title, num:CHAPTERS[3].number, renderErr:renderAll(), roster:ROSTER_FIRES.mt[3].includes('b5_c3_fire'), reg:BOOKSNAP.mt && !!BOOKSNAP.mt.ch[3], brune:b5In('brune')};
  talk('b5_c3_start'); out.f.ph = S.f.b5_c3_ph; out.f.tileChoice = has('b5_c3_start', /tiles/); out.f.startAgain = typeof DLG.b5_c3_start().again === 'function';
  /* the reading at the first halt */
  talk('b5_c3_tiles'); const tk = DLG.b5_c3_tiles(); out.f.tilesNotNow = tk.ch.some(c => /Not now/.test(c.t)); runFx(tk.ch.find(c => /lay them/.test(c.t)));
  out.f.tiles = {drawn:S.f.b5_c3_drawn, reader:S.f.b5_c3_reader, card:S.card, inPool:B5POOL[3].includes(S.card), scene:B5READ[3].scene, lean:B5POOL[3].filter(x => x === B5POOL[3][0]).length, say:/Water on every side/.test(tk.txt)};
  talk('b5_c3_card'); const cd = DLG.b5_c3_card(); out.f.card = {sp:cd.sp, back:cd.ch[0].go}; talk('b5_c3_tiles_done'); out.f.tilesDone = has('b5_c3_tiles_done', /Back to the Landing/);
  /* the Finadd, the barracks talk, the soldier of the Cold Clay, the rise */
  talk('b5_c3_ennic'); const en = DLG.b5_c3_ennic().txt; out.f.ennic = {flag:S.f.b5_c3_ennic, news:S.f.b5_c3_news, recall:/called the Whitefinders back north/.test(en), strike:/strike first/.test(en), again:!!DLG.b5_c3_ennic().again}; take('b5_c3_ennic', /battalion\. Good/);
  talk('b5_c3_regiment'); const rg = DLG.b5_c3_regiment().txt; out.f.rumour = /went over/.test(rg) && /No name/.test(rg) && !/Hull|Beddict/.test(rg);
  talk('b5_c3_rise'); out.f.rise = {scene:DLG.b5_c3_rise().scene, banners:/King's banner and the Ceda's/.test(DLG.b5_c3_rise().txt)};
  /* the trick: the Cadre's Link */
  talk('b5_c3_cadre'); out.f.cadreNotNow = has('b5_c3_cadre', /Not now/); const cc = vis('b5_c3_cadre').find(x => /Show us/.test(x.t)); out.f.linkCheck = cc.check.join(':') + ':' + cc.trick;
  out.f.linkEdges = ['perrit', 'tobet', 'thegg', 'ruuk'].map(id => (cc.edges(id).filter(Boolean)[0] || [0, 0])[1]).join(',');
  made('b5_c3_cadre', /Show us/, 'perrit'); out.f.trick = {who:S.tricks && S.tricks.b5_c3_link && S.tricks.b5_c3_link.who, ok:S.f.b5_c3_linkOk, tile:S.kit.includes('b5_c3_cadretile'), stat:ITEMS.b5_c3_cadretile.stat && ITEMS.b5_c3_cadretile.stat.wits, sorcery:!!TRICKS.b5_c3_link.sorcery, free:!!AB.t_b5_c3_link.free, again:!!DLG.b5_c3_cadre_again().again};
  /* Ruuk at the scouts' fire, with Brune walking: he walks in her place */
  talk('b5_c3_scouts'); out.f.scoutsBoy = has('b5_c3_scouts', /boy with the spears/);
  talk('b5_c3_ruuk'); out.f.ruukOffer = {instead:has('b5_c3_ruuk', /instead of Brune/), plain:has('b5_c3_ruuk', /^"Walk with us\."$/), stay:has('b5_c3_ruuk', /Stay with the scouts/), no:has('b5_c3_ruuk', /can't take you/), notNow:has('b5_c3_ruuk', /Not now/)};
  take('b5_c3_ruuk', /instead of Brune/); shut(); talk('b5_c3_ruuk_join');
  out.f.ruuk = {walks:b5In('ruuk'), flag:S.f.b5_ruukDone, debt:b5Debt('ruuk'), start:b5DebtStart('ruuk'), spear:S.kit.includes('b5_c3_spear'), brune:b5Waiting('brune'), bruneFlag:S.f.b5_bruneDone, gloss:GLOSSX.mt.find(g => g[1] === 'The Faraed')[3](), joinTxt:/forty docks, a winter's grain/.test(DLG.b5_c3_ruuk_join().txt)};
  /* the trader's man: three ways, from one moment */
  { const npc = AREAS.b5_c3_dock.npcs.find(n => n.id === 'trader'); out.f.traderShow = npc.show(); const snapT = JSON.stringify(S);
    S.silver = 30; const s0 = S.silver; take('b5_c3_trader', /Twenty docks/); out.f.tPaid = {debt:b5Debt('ruuk'), spent:s0 - S.silver, flag:S.f.b5_c3_trader, gone:!npc.show()};
    S = JSON.parse(snapT); save(); take('b5_c3_trader', /Write it on the grain/); out.f.tRide = {debt:b5Debt('ruuk'), standing:b5Standing('ruuk'), pressed:!!S.f.b5_pressed_ruuk, coll:S.f.b5_collectors || 0};
    S = JSON.parse(snapT); save(); const near = vis('b5_c3_trader').find(x => /army pays its guides/.test(x.t)); out.f.tCheck = near.check.join(':'); made('b5_c3_trader', /army pays its guides/, 'sgt'); out.f.tTalk = {debt:b5Debt('ruuk'), flag:S.f.b5_c3_trader, done:S.f.b5_c3_traderDone}; }
  /* the Nerek haulers: Ammet and the rope sores */
  talk('b5_c3_nerek'); made('b5_c3_nerek', /rope sores/, 'ammet'); out.f.haulers = S.f.b5_c3_haulers;
  /* the fire */
  talk('b5_c3_fire'); const fy = DLG.b5_c3_fire(); out.f.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b5_c3_fire', /rest/), pay:has('b5_c3_fire', /pay desk/), talk:has('b5_c3_fire', /Talk with the squad/), on:has('b5_c3_fire', /first watch/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), game:has('b5_c3_fire', /knucklebones/), roster:fy.ch.some(c => /roster|Who walks/i.test(c.t + (c.tag || ''))), crews:/carried the dead out/.test(fy.txt)};
  take('b5_c3_fire', /Let the squad rest/); out.f.rested = S.f.b5_c3_rest1;
  const ft = DLG.b5_c3_fire_talk().txt; out.f.talk = {lines:ft.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, ruuk:/Ruuk|rain-bird/.test(ft)};
  /* the pay desk; the quartermaster's salve */
  S.silver = Math.max(S.silver, 30); talk('b5_c3_clerk'); talk('b5_c3_pay'); const pd = DLG.b5_c3_pay(); out.f.desk = {html:/The squad/.test(pd.html || ''), ten:pd.ch.some(c => /docks on/.test(c.t)), notNow:/Not now/.test(pd.ch[pd.ch.length - 1].t), back:pd.ch[pd.ch.length - 1].go};
  const d0 = b5Debt('ammet'), s1 = S.silver; take('b5_c3_pay', /on Ammet's debt/); out.f.desk.paid = d0 - b5Debt('ammet'); out.f.desk.spent = s1 - S.silver;
  const sv = S.inv.salve, ss = S.silver; talk('b5_c3_qm'); take('b5_c3_qm', /^A salve/); out.f.qm = {salve:S.inv.salve - sv, docks:ss - S.silver};
  /* Knucklebones (89) at the fire */
  S.silver = Math.max(S.silver, 8); talk('b5_c3_fire');
  { const sw = S.silver; const c = vis('b5_c3_fire').find(x => /knucklebones/.test(x.t)); c.go(); await wait(80); const q = s => document.querySelector(s);
    out.f.game = {open:!q('#mg').hidden, title:(q('#mg h2') || {}).textContent, sinker:/sinker/.test((q('#mgPanel') || {}).textContent || '')};
    const st = q('#mgPanel [data-st="1"]'); st && st.click(); await wait(20);
    for (let i = 0; i < 400 && !(MG.state && MG.state.over); i++) { const g = MG.state; if (g.errantReady) { const b = q('#kbLet'); b && b.click(); }
      else if (g.who === 'me' && !g.busy) { if (g.turn >= 12) { const b = q('#kbBank'); b && !b.disabled && b.click(); } else { const b = q('#kbThrow'); b && !b.disabled && b.click(); } }
      await wait(40); }
    out.f.game.over = !!(MG.state && MG.state.over); out.f.game.games = MG.state && MG.state.games; q('#kbDone') && q('#kbDone').click(); await wait(60);
    out.f.game.after = S.node; out.f.game.flag = !!S.f.b5_bones; out.f.game.net = S.silver - sw; out.f.game.capOk = (S.f.b5_bonesNet || 0) <= 15 && out.f.game.net <= 15; out.f.game.again = !has('b5_c3_fire', /knucklebones/); }
  /* the first night: the barges, the river thieves */
  talk('b5_c3_fire'); take('b5_c3_fire', /first watch/); out.f.watch = S.f.b5_c3_watch; take('b5_c3_watch_start', /Down onto the barges/); out.f.barges = {area:S.area, dark:!!AREAS.b5_c3_barges.dark};
  talk('b5_c3_rope'); out.f.ropeNotNow = has('b5_c3_rope', /Not now/); out.f.ropeCheck = vis('b5_c3_rope').find(x => /Shutter the lantern/.test(x.t)).check.join(':');
  out.f.river = await force('b5_c3_rivermen', async res => { const u = B.units.find(x => x.side === 'p' && x.id === 'perrit'), e = B.units.find(x => x.side === 'e');
    res.offered = typeof trickOk === 'function' && trickOk(u, AB.t_b5_c3_link); res.tiles = AB.t_b5_c3_link.tiles(u).length > 0; AB.t_b5_c3_link.run(u, e.x, e.y); res.marked = e.cantRound === B.round && e.cantLeft === 1 + lvT(); res.pit = B.def.pitTxt; });
  out.f.riverFlags = {done:S.f.b5_c3_riverDone};
  const sm = S.silver; take('b5_c3_rivermen_after', /Up to the dock/); out.f.morning = {area:S.area, node:S.node, docks:S.silver - sm, ph:S.f.b5_c3_ph};
  /* phase 2: the deserters at the scouts' fire */
  talk('b5_c3_scouts'); out.f.desOffer = has('b5_c3_scouts', /Put them down/) && has('b5_c3_scouts', /behind the bowman/) && has('b5_c3_scouts', /Not now/);
  const sd = S.silver; out.f.des = await force('b5_c3_deserters'); out.f.des.docks = S.silver - sd; out.f.des.done = S.f.b5_c3_desDone;
  /* the evening: the orders, the Nerek, the key */
  talk('b5_c3_nerek'); out.f.nerekWord = /There were Nerek up there/.test(DLG.b5_c3_nerek().txt);
  talk('b5_c3_fire'); out.f.ordersOn = has('b5_c3_fire', /night's orders/); take('b5_c3_fire', /night's orders/); out.f.orders = {node:S.node, txt:/strike the Edur villages/.test(DLG.b5_c3_orders().txt) && /There were Nerek up there/.test(DLG.b5_c3_orders().txt), notNow:has('b5_c3_orders', /Not now/)};
  take('b5_c3_orders', /Decide/); out.f.key = {node:S.node, watch:has('b5_c3_key', /as ordered/), warn:has('b5_c3_key', /Ruuk\. Up the bank/), notYet:has('b5_c3_key', /Not yet/), ruukTxt:/I know the bank road/.test(DLG.b5_c3_key().txt)};
  const snap = JSON.stringify(S);
  /* ================= key: watch ================= */
  { const l0 = L(), d0 = b5Debt('sgt'); take('b5_c3_key', /as ordered/); const l1 = L();
    out.w = {key:S.f.b5_c3_key, loy:Object.fromEntries(Object.keys(l1).map(k => [k, (l1[k] ?? 0) - (l0[k] ?? 0)])), debt:b5Debt('sgt') - d0, node:S.node, scene:DLG.b5_c3_thefire().scene, cheer:/camp cheers/.test(DLG.b5_c3_thefire().txt)};
    take('b5_c3_thefire', /^On/); out.w.collapse = {flag:S.f.b5_c3_collapse, scene:DLG.b5_c3_collapse().scene, ammet:/Hold still/.test(DLG.b5_c3_collapse().txt), noDead:/in the shed is killed/.test(DLG.b5_c3_collapse().txt)};
    take('b5_c3_collapse', /barge-line/); out.w.cheerNotNow = has('b5_c3_cheer_start', /Not now/);
    out.w.cheer = await force('b5_c3_cheer'); out.w.cheer.done = S.f.b5_c3_cheerDone; out.w.ph = S.f.b5_c3_ph; out.w.objText = BATTLES.b5_c3_cheer.objective.text;
    take('b5_c3_cheer_after', /Dawn/); out.w.dawn = {fent:S.f.b5_fentReach, ash:S.kit.includes('b5_c3_ash'), yan:GLOSSX.mt.find(g => g[1] === 'Yan Tovis')[3](), txt:/Fent Reach has surrendered/.test(DLG.b5_c3_dawn().txt), notNow:has('b5_c3_dawn', /Not now/)};
    take('b5_c3_dawn', /High Fort, Finadd/); out.w.road = {notYet:has('b5_c3_road', /Not yet/), wagons:/iron-banded/.test(DLG.b5_c3_road().txt)};
    take('b5_c3_road', /North, to High Fort/); await wait(60); out.w.end = {view, ch:S.chapters[3], lvl:S.lvl}; out.w.extras = CHAPTERS[3].extras().length; out.w.journal = CHAPTERS[3].journal().length; }
  /* ================= key: warn, from the same moment (Ruuk runs) ================= */
  { S = JSON.parse(snap); save(); startExplore('b5_c3_dock'); G.said = {}; talk('b5_c3_key');
    const l0 = L(), d0 = b5Debt('sgt'); take('b5_c3_key', /Up the bank/); const l1 = L();
    out.n = {key:S.f.b5_c3_key, runner:S.f.b5_c3_runner, loy:Object.fromEntries(Object.keys(l1).map(k => [k, (l1[k] ?? 0) - (l0[k] ?? 0)])), node:S.node, tooLate:/not a league up the bank/.test(DLG.b5_c3_runner().txt), notNow:has('b5_c3_runner', /Not now/)};
    take('b5_c3_runner', /After him/); out.n.bank = {area:S.area, dark:!!AREAS.b5_c3_bank.dark};
    talk('b5_c3_deadtree'); out.n.mark = /Faraed scouts' mark/.test(DLG.b5_c3_deadtree().txt); talk('b5_c3_bank_back'); out.n.backLocked = !has('b5_c3_bank_back', /Down to the Landing/) && has('b5_c3_bank_back', /Not now/);
    talk('b5_c3_bank_edge'); out.n.edge = {notNow:has('b5_c3_bank_edge', /Not now/), check:vis('b5_c3_bank_edge').find(x => /along the water/.test(x.t)).check.join(':'), noEdur:!/Trull|Sengar|K'risnan/.test(DLG.b5_c3_bank_edge().txt)};
    out.n.fight = await force('b5_c3_bank'); out.n.fight.done = S.f.b5_c3_bankDone;
    out.n.after = {dontKnow:/I do not know/.test(DLG.b5_c3_bank_after().txt)};
    take('b5_c3_bank_after', /Down to the Landing/); out.n.noted = {area:S.area, node:S.node, flag:S.f.b5_noted, debt:b5Debt('sgt') - d0, ph:S.f.b5_c3_ph};
    take('b5_c3_noted', /Dawn/); take('b5_c3_dawn', /High Fort, Finadd/); out.n.ash = S.kit.includes('b5_c3_ash');
    take('b5_c3_road', /North, to High Fort/); await wait(60); out.n.end = {view, ch:S.chapters[3], lvl:S.lvl, noted:CHAPTERS[3].journal().some(x => /noted the Sixth/.test(x))}; }
  /* ================= Tobet runs (no Ruuk walking); Ruuk with room; Ruuk waits; Ruuk turned away ================= */
  { mk('salvage', 'Tobet', false); talk('b5_c3_start'); out.t = {crews:/harbour master's forty/.test(DLG.b5_c3_fire().txt)};
    talk('b5_c3_ruuk'); out.t.offer = has('b5_c3_ruuk', /^"Walk with us\."$/) && !has('b5_c3_ruuk', /instead of Brune/); const snapR = JSON.stringify(S);
    take('b5_c3_ruuk', /^"Walk with us\."$/); shut(); out.t.room = {walks:b5In('ruuk'), flag:S.f.b5_ruukDone, spear:S.kit.includes('b5_c3_spear')};
    S = JSON.parse(snapR); save(); take('b5_c3_ruuk', /Stay with the scouts/); out.t.wait = {flag:S.f.b5_ruukDone, waits:b5Waiting('ruuk'), walks:b5In('ruuk'), debt:b5Debt('ruuk'), offers:b5Offers().includes('ruuk'), again:has('b5_c3_ruuk_again', /Walk with us now/), trader:AREAS.b5_c3_dock.npcs.find(n => n.id === 'trader').show()};
    talk('b5_c3_scouts'); out.t.spearTrade = has('b5_c3_scouts', /throwing-spear, in trade/);
    S = JSON.parse(snapR); save(); take('b5_c3_ruuk', /can't take you/); out.t.away = {flag:S.f.b5_ruukDone, npc:AREAS.b5_c3_dock.npcs.find(n => n.id === 'ruuk').show(), can:b5CanRecruit('ruuk'), trader:AREAS.b5_c3_dock.npcs.find(n => n.id === 'trader').show()};
    S.silver = 10; talk('b5_c3_scouts'); take('b5_c3_scouts', /throwing-spear, in trade/); out.t.away.spear = S.kit.includes('b5_c3_spear');
    S.f.b5_c3_ph = 2; S.f.b5_c3_riverDone = 1; talk('b5_c3_orders'); talk('b5_c3_key'); out.t.tobetTxt = /Tobet is at your elbow/.test(DLG.b5_c3_key().txt); take('b5_c3_key', /Tobet\. Up the bank/); out.t.runner = S.f.b5_c3_runner; out.t.runTxt = /Tobet takes nothing/.test(DLG.b5_c3_runner().txt); }
  /* ================= a --from=3 style save (Brune walks): every node renders, phase by phase, both keys ================= */
  { setBook('mt'); S = newStateMT('Syn'); S.lvl = 4; S.xp = LEVELS[3]; S.f.b5_c1_key = 'swim'; S.f.b5_c2_key = 'salvage'; S.chapters = {1:'swim', 2:'salvage'}; S.f.b5_bruneDone = 1; S.squad.push('brune'); S.picksDue = []; migrate(S); save(); startChapter(3);
    const errs = []; [[1, null], [2, null], [2, 'watch'], [2, 'warn'], [3, 'watch'], [3, 'warn']].forEach(([ph, k]) => { S.f.b5_c3_ph = ph; S.f.b5_c3_key = k; if (k === 'warn') S.f.b5_c3_runner = 'tobet'; errs.push(...renderAll().map(e => `ph${ph}${k || ''} ${e}`)); });
    b5Join('ruuk'); shut(); errs.push(...renderAll().map(e => `ruuk ${e}`)); out.y = {renderErr:errs, brune:b5In('brune'), ruukWaits:b5Waiting('ruuk')}; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, w = r.w || {}, n = r.n || {}, t = r.t || {}, y = r.y || {};
if (f.area) {
  f.area === 'b5_c3_dock' && f.ch === 3 && f.title === 'Kraig\'s Landing' && f.num === 'Three' && !f.renderErr.length && f.roster && f.reg && f.brune ? ok('a fresh Chapter Three opens on the dock at Kraig\'s Landing, Brune walking; registered for Book Five; every b5_c3 node renders') : no('fresh ' + JSON.stringify(f).slice(0, 600));
  f.ph === 1 && f.tileChoice && f.startAgain && f.tilesNotNow && f.tiles.drawn === 1 && f.tiles.reader === 'perrit' && f.tiles.inPool && f.tiles.scene === 'b5_landing' && f.tiles.say && f.card.sp === 'The Tiles of the Holds' && f.card.back === 'b5_c3_tiles_done' && f.tilesDone ? ok(`the first halt and the reading on the barges (Perrit lays the tiles: ${f.tiles.card}; "Not now" offered)`) : no('tiles ' + JSON.stringify([f.ph, f.tileChoice, f.tiles, f.card, f.tilesDone]));
  f.ennic.flag && f.ennic.news && f.ennic.recall && f.ennic.strike && f.ennic.again && f.rumour && f.rise.scene === 'b5_c3_tents' && f.rise.banners ? ok('the Finadd\'s barracks talk (the strike wanted, the Whitefinders recalled), a Letherii went over (never who), the mages\' tents from the rise') : no('news ' + JSON.stringify([f.ennic, f.rumour, f.rise]));
  f.cadreNotNow && f.linkCheck === 'wits:16:b5_c3_link' && f.linkEdges === '3,1,-2,-1' && f.trick.who === 'perrit' && f.trick.ok && f.trick.tile && f.trick.stat === 1 && f.trick.sorcery && f.trick.free && f.trick.again ? ok('the trick: the Cadre\'s Link, ✦ Wits 16 (Perrit +3, Tobet +1, Thegg −2, Ruuk −1), rides the Hold; the cadre\'s spare tile (+1 Wits)') : no('trick ' + JSON.stringify([f.linkCheck, f.linkEdges, f.trick]));
  f.scoutsBoy && f.ruukOffer.instead && !f.ruukOffer.plain && f.ruukOffer.stay && f.ruukOffer.no && f.ruukOffer.notNow && f.ruuk.walks && f.ruuk.flag === 1 && f.ruuk.debt === 40 && f.ruuk.start === 40 && f.ruuk.spear && f.ruuk.brune && f.ruuk.bruneFlag === 2 && f.ruuk.gloss && f.ruuk.joinTxt ? ok('Ruuk joins at the scouts\' fire in Brune\'s place (she waits), with his own 40 docks and his spare spear') : no('ruuk ' + JSON.stringify([f.ruukOffer, f.ruuk]));
  f.traderShow && f.tPaid.debt === 20 && f.tPaid.spent === 20 && f.tPaid.flag === 'paid' && f.tPaid.gone && f.tRide.debt === 55 && f.tRide.pressed && f.tRide.coll >= 1 && f.tCheck === 'guile:14' && f.tTalk.debt === 40 && f.tTalk.flag === 'talked' ? ok('the trader\'s man: paid off (20 docks), let ride (+15, Ruuk pressed, the collectors counted), or talked down (Guile 14)') : no('trader ' + JSON.stringify([f.traderShow, f.tPaid, f.tRide, f.tCheck, f.tTalk]));
  f.haulers === 1 && f.fire.again && f.fire.rest && f.fire.pay && f.fire.talk && f.fire.on && f.fire.notNow && f.fire.game && f.fire.roster && f.fire.crews && f.rested === 1 && f.talk.lines === f.talk.here && f.talk.ruuk ? ok('the Nerek haulers (Ammet); the barge crews\' fire: an again line, a rest, the pay desk, the squad\'s talk, Knucklebones, the roster, the way on with Not now; the crews know the Sixth from Trate') : no('fire ' + JSON.stringify([f.haulers, f.fire, f.rested, f.talk]));
  f.desk.html && f.desk.ten && f.desk.notNow && f.desk.back === 'b5_c3_fire' && f.desk.paid === 10 && f.desk.spent === 10 && f.qm.salve === 1 && f.qm.docks === 6 ? ok('the pay desk (10 docks on Ammet\'s line, back to the fire); the quartermaster\'s salve at 6') : no('desk ' + JSON.stringify([f.desk, f.qm]));
  f.game && f.game.open && f.game.title === 'Knucklebones' && f.game.sinker && f.game.over && f.game.after === 'b5_c3_bones_after' && f.game.flag && f.game.capOk && f.game.again ? ok(`Knucklebones at the fire: a game played through, the table closes and pays once (net ${f.game.net} docks)`) : no('game ' + JSON.stringify(f.game));
  f.watch === 1 && f.barges.area === 'b5_c3_barges' && f.barges.dark && f.ropeNotNow && f.ropeCheck === 'wits:14' && f.river.started && f.river.dark && f.river.waves === 1 && f.river.stage2 && f.river.inStage2 && /b5_c3_riverboss/.test(f.river.foes2 || '') && f.river.after === 'b5_c3_rivermen_after' && f.riverFlags.done === 1 ? ok(`the first night on the barges: the river thieves (dark, a wave from the water), both grounds forced, the drifting barge (${f.river.foes2})`) : no('river ' + JSON.stringify([f.watch, f.barges, f.river]));
  f.river.offered && f.river.tiles && f.river.marked && f.river.pit === 'the river' ? ok('the Cadre\'s Link on the barges: offered once a fight, an enemy within 6 marked for the hand-cant\'s critical') : no('trick in battle ' + JSON.stringify(f.river));
  f.morning.area === 'b5_c3_dock' && f.morning.node === 'b5_c3_morning' && f.morning.docks === 18 && f.morning.ph === 2 && f.desOffer && f.des.started && f.des.after === 'b5_c3_deserters_after' && f.des.docks === 8 && f.des.done ? ok('morning: the barge-master\'s 12 and the regiment\'s 6; the deserters at the scouts\' fire (a forced win, +8)') : no('day ' + JSON.stringify([f.morning, f.desOffer, f.des]));
  f.nerekWord && f.ordersOn && f.orders.txt && f.orders.notNow && f.key.node === 'b5_c3_key' && f.key.watch && f.key.warn && f.key.notYet && f.key.ruukTxt ? ok('the evening: the night\'s orders, "there were Nerek up there", the key both ways and Not yet; Ruuk offers to run') : no('key ' + JSON.stringify([f.nerekWord, f.ordersOn, f.orders, f.key]));
}
w.key === 'watch' && JSON.stringify(w.loy) === JSON.stringify({tobet:0, thegg:0, perrit:1, ammet:-1, ruuk:0}) && w.debt === 0 && w.scene === 'b5_c3_greenfire' && w.cheer && w.collapse && w.collapse.flag && w.collapse.scene === 'b5_c3_collapse' && w.collapse.ammet && w.collapse.noDead ? ok('key watch: Perrit +1, Ammet −1, no docks; the green fire and the camp cheering; the shed falls, Ammet in the rubble, nobody killed') : no('watch ' + JSON.stringify(w).slice(0, 600));
w.cheerNotNow && w.cheer && w.cheer.started && w.cheer.obj && w.cheer.waves === 1 && w.cheer.done && w.ph === 3 && /nobody killed/.test(w.objText || '') && w.dawn && w.dawn.fent === 1 && w.dawn.ash && w.dawn.yan && w.dawn.txt && w.dawn.notNow && w.road.notYet && w.road.wagons && w.end && w.end.view === 'end' && w.end.ch === 'watch' && w.end.lvl >= 5 ? ok(`watch: the drunks at the barge-line (survive 4 rounds, a wave); dawn: Fent Reach, the ash; the road; the end (level ${w.end && w.end.lvl}; ${w.extras} end lines, ${w.journal} journal)`) : no('watch end ' + JSON.stringify([w.cheer, w.ph, w.dawn, w.road, w.end]));
n.key === 'warn' && n.runner === 'ruuk' && JSON.stringify(n.loy) === JSON.stringify({tobet:0, thegg:1, perrit:-1, ammet:2, ruuk:0}) && n.tooLate && n.notNow && n.bank.area === 'b5_c3_bank' && n.bank.dark && n.mark && n.backLocked ? ok('key warn: Ruuk runs; Ammet +2, Thegg +1, Perrit −1; the fire comes first; up the bank after him (the scouts\' mark on the dead tree)') : no('warn ' + JSON.stringify(n).slice(0, 600));
n.edge && n.edge.notNow && n.edge.check === 'wits:14' && n.edge.noEdur && n.fight && n.fight.started && n.fight.dark && /b5_wraith/.test(n.fight.kinds) && /b5_unblooded/.test(n.fight.kinds) && !/krisnan|b5_edur/.test(n.fight.kinds) && n.fight.done && n.after.dontKnow && n.noted.flag === 1 && n.noted.debt === 30 && n.noted.ph === 3 && n.ash && n.end && n.end.ch === 'warn' && n.end.noted ? ok(`warn: the reeds (wraiths and an unblooded, no K'risnan), the runner doesn't know; the regiment notes the Sixth and fines the sergeant 30; the end (level ${n.end && n.end.lvl})`) : no('warn end ' + JSON.stringify([n.edge, n.fight, n.after, n.noted, n.end]));
t.crews && t.offer && t.room && t.room.walks && t.room.flag === 1 && t.room.spear && t.wait && t.wait.flag === 2 && t.wait.waits && !t.wait.walks && t.wait.debt === 40 && t.wait.offers && t.wait.again && t.wait.trader && !t.spearTrade && t.away && t.away.flag === 0 && !t.away.npc && !t.away.can && !t.away.trader && t.away.spear && t.tobetTxt && t.runner === 'tobet' && t.runTxt ? ok('without Brune: Ruuk walks with room, or waits with the scouts (the roster offers him; the trader still comes), or is turned away (a scout trades the spear); Tobet is the runner when Ruuk does not walk; the crews know the salvage company') : no('variants ' + JSON.stringify(t));
y.renderErr && !y.renderErr.length && y.brune && y.ruukWaits ? ok('a --from=3 style save (Brune walks): every node renders in every phase and both keys; Ruuk waits when six walk') : no('synthetic ' + JSON.stringify(y).slice(0, 800));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b5ch3: FAIL (${bad.length})` : 'b5ch3: all ok'); process.exit(bad.length ? 1 : 0);
