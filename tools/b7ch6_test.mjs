// Book Seven, Chapter 6 (Before the Walls, src/126_b7_ch6.js): the halts, both keys from the same moment at the river, the Letherii's road
// (all three), the reading at the first halt (the line, the Tiles through Perrit, the Gate), the fire (rest, a line each, the Rising box,
// the roster, Not now), b7HeatTier() the night before (the man in the grey coat at watched: rise:true, its "yes, but" files a page; a
// watched squad left alone sleeps badly), Chapter 4's visitor on both keys (the eldest Edur: hold our picket; the captain: stay in the
// line), the trick (the Cadre's Ward, taught by Perrit, and its battle half), the wave and the dome, the Edur walking home (both keys),
// every fight's start and a forced win (the deserters, both grounds of the landing, the stand, both grounds of the break), the Rising moves
// (deserters let go +1 once; 'break' +1; 'stand' none), the chapter's end at level 11, and B7CH6.fates (pages for every soldier on every
// road and key, read from S while the Letherii play and from S.th.l once the Third is in); from a --from=6 style start, and from a
// synthetic save with Perrit dead (Ammet teaches) and with Perrit and Ammet dead (the old escort teaches; the tile-woman reads).
// Usage: node tools/b7ch6_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const go = c => { if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); };
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); go(c); return c; };
  const has = (id, re) => vis(id).some(x => re.test(x.t));
  const made = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); settleRoll({who, stat:c.check[0], tier:'clean', ok:true, pass:true, margin:6, nat:18}, c); go(c); return c; };
  const near = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'near', ok:true, pass:true, margin:-1, nat:9}, c); return c; };
  const failed = (id, re, who) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c); settleRoll({who, stat:c.check[0], tier:'fail', ok:false, pass:false, margin:-6, nat:3}, c); talk(c.fail); return c; };
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const win = async (id) => { const res = {id};
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const force = async (id, start) => { (start || (() => startBattle(id, {})))(); await wait(60); const res = {started:!!B && B.id === id, foes:B.units.filter(u => u.side === 'e').length, allies:B.units.filter(u => u.ally).length, obj:!!B.def.objective}; return Object.assign(res, await win(id)); };
  const nodes = Object.keys(DLG).filter(k => /^b7_c6_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b|Kettle|Tehol|Mael\b|Bonehunter|Beak|Hanradi|Sirryn|Adjunct|marine|K'Chain|!\s/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt.replace(/"[^"]*"/g, '') + (n.html || '').replace(/<[^>]*>/g, ''))) errs.push(k + ': leaks ' + (n.txt.replace(/"[^"]*"/g, '').match(leak) || [''])[0]); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); (n.ch || []).forEach(c => { if (typeof c.t !== 'string' || /undefined|NaN/.test(c.t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const atPhases = () => { const keys = ['b7_c6_ph', 'b7_c6_key', 'b7_c4_key', 'b7_c6_dome', 'b7_lethRoad', 'b7_c6_landingDone'], was = keys.map(k => S.f[k]), errs = [];
    [1, 2, 3, 4].forEach(p => [null, 'stand', 'break'].forEach(k => ['edur', 'letherii'].forEach(k4 => [0, 1].forEach(d => [null, 'army', 'free'].forEach(rd => { S.f.b7_c6_ph = p; S.f.b7_c6_key = k; S.f.b7_c4_key = k4; S.f.b7_c6_dome = d; S.f.b7_c6_landingDone = d; S.f.b7_lethRoad = rd; renderAll().forEach(e => errs.push(`${p}/${k}/${k4}/${d}/${rd}:${e}`)); })))));
    keys.forEach((k, i) => { S.f[k] = was[i]; }); return [...new Set(errs)]; };
  const lines = () => DLG.b7_c6_fire_talk().txt.split('\n\n').length;
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('rg'); startExplore(area); };
  const fatesCheck = () => { const F = B7CH6.fates, errs = [], ids = ['sgt', 'tobet', 'thegg', 'perrit', 'ammet', 'ruuk', 'brune', 'pessa', 'ilsa', 'sorvan', 'doss'], was = [S.f.b7_lethRoad, S.f.b7_c6_key, S.f.b7_c2_key, S.f.b7_c4_key];
    B7_LETHROADS.forEach(rd => ['stand', 'break'].forEach(k => ['name', 'refuse', null].forEach(k2 => ['edur', 'letherii'].forEach(k4 => { S.f.b7_lethRoad = rd; S.f.b7_c6_key = k; S.f.b7_c2_key = k2; S.f.b7_c4_key = k4;
      ids.forEach(id => { const p = F.page(id); if (!p || !p.title || !p.txt || /undefined|NaN|null|\$\{|Tehol|Kettle|Wastes|!\s/.test(p.title + p.txt)) errs.push(`${rd}/${k}/${k2}/${id}`); });
      const rp = F.roadPage(); if (!rp.title || !SCENES[rp.scene] || rp.paras.some(x => /undefined|null/.test(x))) errs.push('road ' + rd); }))));
    [S.f.b7_lethRoad, S.f.b7_c6_key, S.f.b7_c2_key, S.f.b7_c4_key] = was; return errs; };
  try {
  /* ================= a --from=6 style start: the Letherii at 10, Chapter 4 'edur', the file clean ================= */
  setBook('rg'); S = newStateRG('Fresh', 'Other'); S.th.l.lvl = 10; S.th.l.xp = LEVELS[9]; S.th.l.picksDue = []; S.picksDue = []; S.f.b7_c4_key = 'edur'; S.f.b7_c5_key = 'hold'; save(); startChapter(6); S.picksDue = [];
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, renderErr:atPhases(), title:CHAPTERS[6].title, nodes:nodes.length, areas:CHAPTERS[6].areas.length, fights:Object.keys(CHAPTERS[6].battles).length,
    rise0:b7Rising(), file0:b7File(), items:Object.keys(CHAPTERS[6].gear).every(k => !!ART['item/' + k] && ITEMS[k].role && /c76-/.test(ART['item/' + k])), itemsN:Object.keys(CHAPTERS[6].gear).length,
    figure:['b7_malregular', 'b7_malxbow', 'b7_malsgt'].every(k => typeof FIGX[k] === 'function' && FOES[k].kind === k), tile:typeof TILEX.b7_c6_field === 'function',
    scenes:['b7_field', 'b7_river', 'b7_c6_dome', 'b7_c6_walls'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), read:B7READ[6] && B7READ[6].back === 'b7_c6_fire', roster:ROSTER_FIRES.rg[6].includes('b7_c6_fire'), fates:typeof B7CH6.fates.pages === 'function'};
  /* phase 1: the line (the first halt), the reading, the Finadd, the clerk (clean), the tile-woman, the ridge, the plain */
  talk('b7_c6_line'); out.f.ph = S.f.b7_c6_ph; out.f.tiles = has('b7_c6_line', /tiles/);
  talk('b7_c6_read'); const rd = DLG.b7_c6_read(); const lay = rd.ch.find(c => /lay them/.test(c.t)); runFx(lay);
  out.r = {drawn:S.f.b7_c6_drawn, reader:S.f.b7_c6_reader, card:S.card, inPool:B7POOL[6].includes(S.card), notNow:rd.ch.some(c => /Not now/.test(c.t)), words:/shield/.test(rd.txt)};
  talk('b7_c6_card'); out.r.backGo = DLG.b7_c6_card().ch[0].go;
  talk('b7_c6_fire'); out.f.sleepGated = !has('b7_c6_fire', /^Sleep/);
  talk('b7_c6_ennic'); take('b7_c6_ennic', /cadre doing/); out.f.news = S.f.b7_c6_news === 1 && /Chancellor's man/.test(DLG.b7_c6_ennic_news().txt);
  talk('b7_c6_clerk'); out.f.clean = /did not stop at ours/.test(DLG.b7_c6_clerk().txt) && /The Rising/.test(DLG.b7_c6_clerk().html || '');
  out.f.greyHidden = !AREAS.b7_c6_line.npcs.find(n => n.id === 'grey').show();
  talk('b7_c6_tilewoman'); out.f.tw = S.f.b7_c6_tw; talk('b7_c6_ridge'); out.f.ridge = /banners/.test(DLG.b7_c6_ridge().txt); out.f.plain = /ring of small fires/.test(DLG.b7_c6_plain().txt);
  /* the levy: rise:true; its "yes, but" a bruise not the file; made: the ridge's lines and the Third's one line of news */
  talk('b7_c6_levy'); const lc = DLG.b7_c6_levy().ch.find(c => c.rise); out.lv = {rise:!!lc};
  const snapL = JSON.stringify(S), fl0 = b7File(); near('b7_c6_levy', /ask him/, 'tobet'); out.lv.nearFile = b7File() - fl0; out.lv.bruised = (S.bruised || {}).tobet || 0;
  restore(snapL, 'b7_c6_line'); made('b7_c6_levy', /ask him/, 'tobet'); out.lv.ok = S.f.b7_c6_levyOk; out.lv.third = /mill village/.test(DLG.b7_c6_levy_ok().txt);
  /* the visitor (Chapter 4 'edur'): the eldest Edur; and from the same moment on 'letherii', the captain */
  const vE = AREAS.b7_c6_line.npcs.find(n => n.id === 'visitE'), vL = AREAS.b7_c6_line.npcs.find(n => n.id === 'visitL'); out.v = {eShow:vE.show(), lHide:!vL.show()};
  const snapV = JSON.stringify(S);
  S.f.b7_c4_key = 'letherii'; out.v.lShow = vL.show() && !vE.show(); take('b7_c6_visit', /^"Why/); out.v.leth = {ask:S.f.b7_c6_ask, why:S.f.b7_c6_askedWhy, txt:/Because I am asking/.test(DLG.b7_c6_visit_leth().txt)};
  restore(snapV, 'b7_c6_line'); out.v.edurTxt = /hold our picket/.test(DLG.b7_c6_visit().txt); take('b7_c6_visit', /hold your picket/); out.v.ask = S.f.b7_c6_ask; out.v.done = S.f.b7_c6_visitDone;
  /* the fire, phase 1 */
  talk('b7_c6_fire'); const fy = DLG.b7_c6_fire(); out.fire = {again:typeof fy.again === 'function' ? fy.again() : fy.again, rest:has('b7_c6_fire', /rest/), talk:has('b7_c6_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), html:/The Rising/.test(fy.html || '') && /Your file/.test(fy.html || ''), sleep:has('b7_c6_fire', /^Sleep/)};
  S.wounds = {tobet:4}; take('b7_c6_fire', /Let the squad rest/); out.fire.rested = S.f.b7_c6_rest1 && !S.wounds; out.fire.talkLines = lines(); out.fire.here = S.squad.filter(id => id !== 'sgt').length;
  /* the man in the grey coat: the file watched */
  const snapW = JSON.stringify(S); S.b7.file = 5;
  out.w = {tier:b7HeatTier(), npc:AREAS.b7_c6_line.npcs.find(n => n.id === 'grey').show(), clerk:/he has been there since dusk/.test(DLG.b7_c6_clerk().txt)};
  talk('b7_c6_watcher'); const wc = DLG.b7_c6_watcher().ch.find(c => c.rise); out.w.rise = !!wc; out.w.fileEdge = edgesFor(wc, 'tobet').some(e => /file/.test(e[0]));
  const snapW2 = JSON.stringify(S), fw = b7File(); near('b7_c6_watcher', /Talk him away/, 'tobet'); out.w.nearFile = b7File() - fw;
  restore(snapW2, 'b7_c6_line'); take('b7_c6_fire', /^Sleep/); out.w.badTxt = /counted his breaths/.test(DLG.b7_c6_sleep().txt); take('b7_c6_sleep', /First light/); out.w.rattled = Object.keys(S.rattled || {}).length; out.w.badNight = S.f.b7_c6_badNight;
  restore(snapW2, 'b7_c6_line'); made('b7_c6_watcher', /Talk him away/, 'ilsa'); out.w.gone = S.f.b7_c6_watcherGone; take('b7_c6_fire', /^Sleep/); take('b7_c6_sleep', /First light/); out.w.slept = !S.f.b7_c6_badNight;
  restore(snapW, 'b7_c6_line');
  /* sleep (clean), then dawn */
  take('b7_c6_fire', /^Sleep/); out.sl = {quiet:/The night is quiet/.test(DLG.b7_c6_sleep().txt)}; take('b7_c6_sleep', /First light/);
  out.sl.area = S.area; out.sl.ph = S.f.b7_c6_ph; out.sl.dawn = /Hold," he says/.test(DLG.b7_c6_dawn().txt); out.sl.rattled = Object.keys(S.rattled || {}).length;
  talk('b7_c6_plain'); out.sl.waveGated = !S.f.b7_c6_dome && /wants a word/.test(DLG.b7_c6_wave().txt);
  talk('b7_c6_dawn_ennic'); out.sl.shield = S.kit.includes('b7_c6_fingershield');
  /* the trick: the Cadre's Ward, from Perrit */
  talk('b7_c6_fire'); out.t = {offer:has('b7_c6_fire', /Perrit is looking/), ridge:has('b7_c6_ridge', /Perrit/)}; take('b7_c6_fire', /Perrit is looking/);
  out.t.teach = b76Teach(); out.t.dc = DLG.b7_c6_ward().ch[0].check[1]; out.t.notNow = has('b7_c6_ward', /Not now/); made('b7_c6_ward', /Learn it/, 'perrit');
  out.t.who = S.tricks && S.tricks.b7_c6_ward && S.tricks.b7_c6_ward.who; out.t.ok = S.f.b7_c6_wardOk;
  /* the wave, the dome */
  talk('b7_c6_plain'); out.wv = {dome:S.f.b7_c6_dome, txt:/where the dome stood/.test(DLG.b7_c6_wave_after().txt), scene:SCENES.b7_c6_dome && DLG.b7_c6_wave_after().scene === 'b7_c6_dome'};
  out.wv.homeNpc = AREAS.b7_c6_dawn.npcs.find(n => n.id === 'homeE').show(); out.wv.desNpc = AREAS.b7_c6_dawn.npcs.find(n => n.id === 'deserters').show();
  /* the Edur walk home: the eldest (edur); from the same moment, the captain (letherii) */
  const snapH = JSON.stringify(S);
  S.f.b7_c4_key = 'letherii'; talk('b7_c6_home'); take('b7_c6_home', /You knew/); out.h = {capTxt:/twelve companies/i.test(DLG.b7_c6_home_captain().txt)}; take('b7_c6_home_captain', /Twelve companies/); out.h.capKnew = S.f.b7_c6_captainKnew; out.h.capDone = S.f.b7_c6_homeDone;
  restore(snapH, 'b7_c6_dawn'); talk('b7_c6_home'); take('b7_c6_home', /You looked back/); out.h.eldest = S.f.b7_c6_edurWord === 1 && /for us as well/.test(DLG.b7_c6_home_eldest().txt); out.h.done = S.f.b7_c6_homeDone;
  /* the deserters: let go (+1, once), talked (+1 and the charm), or fought (the charm, no move) */
  const snapD = JSON.stringify(S), rd0 = b7Rising();
  talk('b7_c6_deserters'); out.d = {choices:['Hold them', 'Talk to them', 'Step aside', 'Not now'].every(w => has('b7_c6_deserters', new RegExp(w))), rise:!!DLG.b7_c6_deserters().ch.find(c => c.rise)};
  take('b7_c6_deserters', /Step aside/); out.d.let = {flag:S.f.b7_c6_deserters, rise:b7Rising() - rd0}; runFx(DLG.b7_c6_deserters_let().ch[0]); DLG.b7_c6_deserters_let().fx(); out.d.let.once = b7Rising() - rd0;
  restore(snapD, 'b7_c6_dawn'); made('b7_c6_deserters', /Talk to them/, 'tobet'); out.d.talk = {flag:S.f.b7_c6_deserters, rise:b7Rising() - rd0, charm:S.kit.includes('b7_c6_ridgecharm')};
  restore(snapD, 'b7_c6_dawn'); out.d.fight = await force('b7_c6_deserters'); out.d.fought = {flag:S.f.b7_c6_deserters, rise:b7Rising() - rd0, charm:S.kit.includes('b7_c6_ridgecharm')};
  /* the orders, the march, the bank */
  talk('b7_c6_fire'); out.m = {marchGated:!has('b7_c6_fire', /^March/)}; out.m.ennicNode = AREAS.b7_c6_dawn.npcs.find(n => n.id === 'ennic').node();
  talk('b7_c6_orders'); take('b7_c6_orders', /To the fire/); take('b7_c6_fire', /^March/); take('b7_c6_march', /The bank/);
  out.m.area = S.area; out.m.ph = S.f.b7_c6_ph; out.m.noFire = /No fire/.test(DLG.b7_c6_fire().txt); talk('b7_c6_bank_ennic'); out.m.ennic = S.f.b7_c6_bankEnnic;
  /* the landing: both grounds; the trick's battle half */
  talk('b7_c6_boats'); out.l = {notNow:has('b7_c6_boats', /Not now/), check:has('b7_c6_boats', /Meet them at the water/)};
  take('b7_c6_boats', /Hold the bank/); await wait(60);
  out.l.kinds = B.units.filter(u => u.side === 'e').map(u => u.kind).join(',');
  { const u = B.units.find(x => x.id === 'perrit'); const s0 = B.smoke.length; out.t.offered = trickOk(u, AB.t_b7_c6_ward); B.busy = false; B.cur = u; AB.t_b7_c6_ward.run(u, 3, 3); out.t.smoke = B.smoke.length - s0; await wait(60); }
  out.l.fight = Object.assign({started:B.id === 'b7_c6_landing', foes:5, allies:B.units.filter(u => u.ally).length}, await win('b7_c6_landing'));
  out.l.done = S.f.b7_c6_landingDone; out.l.keyNode = AREAS.b7_c6_bank.npcs.find(n => n.id === 'ennic').node();
  /* the key */
  take('b7_c6_landing_after', /The Finadd/); const kn = DLG.b7_c6_key(); out.k = {stand:has('b7_c6_key', /stands/), brk:has('b7_c6_key', /reeds/), notYet:has('b7_c6_key', /Not yet/), html:/The Rising/.test(kn.html || '')};
  const snapK = JSON.stringify(S), rk = b7Rising(), lk = {thegg:S.loy.thegg, pessa:S.loy.pessa};
  /* ================= stand ================= */
  take('b7_c6_key', /stands/); out.st = {key:S.f.b7_c6_key, rise:b7Rising() - rk, thegg:S.loy.thegg - lk.thegg};
  out.st.fight = await force('b7_c6_stand', () => take('b7_c6_key_stand', /whistle/)); out.st.boss = true; out.st.done = S.f.b7_c6_standDone; out.st.walk = /Walk\./.test(DLG.b7_c6_stand_after().txt);
  take('b7_c6_stand_after', /road to the city/); out.st.area = S.area; out.st.ph = S.f.b7_c6_ph;
  const snapS = JSON.stringify(S);
  /* ================= break, from the same moment ================= */
  restore(snapK, 'b7_c6_bank'); take('b7_c6_key', /reeds/); out.br = {key:S.f.b7_c6_key, rise:b7Rising() - rk, pessa:S.loy.pessa - lk.pessa, rose:(S.stats || {}).b7Rose || 0};
  out.br.fight = await force('b7_c6_break', () => take('b7_c6_key_break', /^Run/)); out.br.done = S.f.b7_c6_breakDone;
  take('b7_c6_break_after', /road to the city/); out.br.area = S.area;
  /* phase 4 (break): the walls, the refugees, the gate; the road: all three from one moment */
  out.wl = {walls:/walls of Letheras/.test(DLG.b7_c6_walls().txt), endGated:!has('b7_c6_fire', /through the gate/), gate:/first light/.test(DLG.b7_c6_gate().txt)};
  talk('b7_c6_refugees'); out.wl.refugees = /mob/.test(DLG.b7_c6_refugees().txt);
  talk('b7_c6_road'); out.wl.choices = ['Soldiers', 'guards who came back', 'Out\\.', 'Not yet'].every(w => has('b7_c6_road', new RegExp(w)));
  const snapR = JSON.stringify(S); out.rd = {};
  for (const [re, v] of [[/Soldiers/, 'army'], [/guards/, 'palace'], [/Out\./, 'free']]) { restore(snapR, 'b7_c6_walls'); take('b7_c6_road', re); out.rd[v] = {road:S.f.b7_lethRoad, set:S.f.b7_lethRoad === v, again:!has('b7_c6_road', /Soldiers/)}; }
  /* the end on break + free */
  talk('b7_c6_fire'); out.e = {open:has('b7_c6_fire', /through the gate/), lines:lines(), here:S.squad.filter(id => id !== 'sgt').length, html:/The Rising/.test(DLG.b7_c6_fire().html || '')};
  take('b7_c6_fire', /through the gate/); out.e.notYet = has('b7_c6_end', /Not yet/);
  /* the fates while the Letherii play */
  out.fa = {errs:fatesCheck(), pages:B7CH6.fates.pages().length, here:S.squad.length, last:B7CH6.fates.pages().slice(-1)[0].id, road:B7CH6.fates.road(), key:B7CH6.fates.key(), half:B7CH6.fates.half() === S, roadTitle:B7CH6.fates.roadPage().title};
  take('b7_c6_end', /Into the city/); await wait(60);
  out.e = Object.assign(out.e, {view, ch:S.chapters[6], lvl:S.lvl, xp:S.xp, rise:b7Rising(), extras:CHAPTERS[6].extras().length, journal:CHAPTERS[6].journal().length, endText:(CHEND[6] || {}).break && CHEND[6].break[0]});
  /* the fates once the Third is in (Ch7 reads S.th.l) */
  const lname = S.name; b7Use('t'); out.fa.third = {thread:S.thread, half:B7CH6.fates.half() === S.th.l, name:B7CH6.fates.pages().slice(-1)[0].name === lname, pages:B7CH6.fates.pages().length, para:B7CH6.fates.roadPage().paras.slice(-1)[0].includes(lname)};
  /* stand end too */
  restore(snapS, 'b7_c6_walls'); talk('b7_c6_road'); take('b7_c6_road', /Soldiers/); talk('b7_c6_fire'); take('b7_c6_fire', /through the gate/); take('b7_c6_end', /Into the city/); await wait(60);
  out.e2 = {ch:S.chapters[6], lvl:S.lvl, endText:(CHEND[6] || {}).stand && CHEND[6].stand[0]};
  /* ================= synthetic saves: Perrit dead (Ammet teaches); Perrit and Ammet dead (the old escort; the tile-woman reads) ================= */
  setBook('rg'); S = newStateRG('Syn', 'Other'); { const L = S.th.l; L.squad = ['sgt', 'thegg', 'ammet', 'ruuk', 'brune', 'ilsa']; L.camp = ['sorvan']; L.dead = {perrit:{ch:7, where:'Brans Keep', from:'mt'}, tobet:{ch:7, where:'Letheras', from:'mt'}}; ['ruuk', 'brune', 'ilsa', 'sorvan'].forEach(k => { L.loy[k] ??= 0; L.gear[k] ??= {}; L.picks[k] ??= []; }); L.picksDue = []; L.lvl = 10; L.xp = LEVELS[9]; }
  S.f.b7_c4_key = 'letherii'; S.f.b7_ilsaDone = 1; S.f.b7_sorvanDone = 2; S.picksDue = []; save(); startChapter(6); S.picksDue = [];
  out.y = {thread:S.thread, renderErr:atPhases(), lines:lines(), here:S.squad.filter(id => id !== 'sgt').length, teach:b76Teach(), reader:visReader().id, ilsa:/Ilsa/.test(DLG.b7_c6_fire_talk().txt)};
  S.f.b7_c6_dome = 1; out.y.lines2 = lines(); delete S.f.b7_c6_dome;
  const pg = B7CH6.fates.pages(); out.y.pages = pg.map(p => p.id + ':' + p.label).join(','); out.y.noPerrit = !pg.some(p => p.id === 'perrit');
  S.squad = S.squad.filter(x => x !== 'ammet'); S.dead.ammet = {ch:6, where:'the river'}; S.f.b7_c6_ph = 2; startExplore('b7_c6_dawn');
  out.y.teach2 = b76Teach(); out.y.escort = AREAS.b7_c6_dawn.npcs.find(n => n.id === 'escort').show(); out.y.fallen = B7CH6.fates.pages().some(p => p.id === 'ammet' && p.k === 'gone');
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, rd = r.r || {}, lv = r.lv || {}, v = r.v || {}, fi = r.fire || {}, w = r.w || {}, sl = r.sl || {}, t = r.t || {}, wv = r.wv || {}, h = r.h || {}, d = r.d || {}, m = r.m || {}, l = r.l || {}, k = r.k || {}, st = r.st || {}, b = r.br || {}, wl = r.wl || {}, rdd = r.rd || {}, e = r.e || {}, e2 = r.e2 || {}, fa = r.fa || {}, y = r.y || {};
f.area === 'b7_c6_line' && f.ch === 6 && f.thread === 'l' && f.lvl0 === 10 && f.squad === 'sgt,tobet,thegg,perrit,ammet' && f.renderErr && !f.renderErr.length && f.title === 'Before the Walls' && f.rise0 === 2 && f.file0 === 0 && f.items && f.itemsN === 2 && f.figure && f.tile && f.scenes && f.read && f.roster && f.fates
  ? ok(`a --from=6 start opens Chapter Six in the line below the ridge at level 10 with the Letherii; every b7_c6 node renders in every phase, key, Chapter 4 key and road (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); items, the Malazan figures, the ground and four backdrops drawn`) : no('start ' + JSON.stringify(f).slice(0, 1200));
f.ph === 1 && f.tiles && f.sleepGated && f.news && f.clean && f.greyHidden && f.tw === 1 && f.ridge && f.plain ? ok('the night: the line offers the Tiles; sleep waits; the Finadd on the ridge (the Chancellor\'s man); the clerk on a clean file; no grey coat; the tile-woman, the ridge, the plain') : no('night ' + JSON.stringify(f).slice(0, 500));
rd.drawn === 1 && rd.reader === 'perrit' && rd.inPool && rd.notNow && rd.words && rd.backGo === 'b7_c6_fire' ? ok(`the reading on a shield in the line: Perrit lays the Tiles (${rd.card}); back to b7_c6_fire`) : no('reading ' + JSON.stringify(rd));
lv.rise && lv.nearFile === 0 && lv.bruised > 0 && lv.ok === 1 && lv.third ? ok('the levy: a rise:true check (its "yes, but" a bruise); made, the ridge\'s chalk and wire, and the Third\'s mill village (one line)') : no('levy ' + JSON.stringify(lv));
v.eShow && v.lHide && v.lShow && v.leth.ask === 'stay' && v.leth.why === 1 && v.leth.txt && v.edurTxt && v.ask === 'picket' && v.done === 1 ? ok('the visitor: on edur the eldest asks the Sixth to hold the Edur picket; on letherii the captain asks it to stay in the line when the Edur go out') : no('visit ' + JSON.stringify(v));
fi.again && fi.rest && fi.talk && fi.notNow && fi.html && fi.sleep && fi.rested && fi.talkLines === fi.here ? ok(`the fire: the Rising and the file, a rest, a line each (${fi.talkLines}), sleep once the Finadd and the visitor are done, Not now`) : no('fire ' + JSON.stringify(fi));
w.tier === 'watched' && w.npc && w.clerk && w.rise && w.fileEdge && w.nearFile === 1 && w.badTxt && w.rattled === 2 && w.badNight === 1 && w.gone === 1 && w.slept ? ok('watched: the grey coat at the next fire (rise:true with the file\'s edge; its "yes, but" files a page); left alone, two of the squad rattled at dawn; talked away, the Sixth sleeps') : no('watcher ' + JSON.stringify(w));
sl.quiet && sl.area === 'b7_c6_dawn' && sl.ph === 2 && sl.dawn && sl.rattled === 0 && sl.waveGated && sl.shield ? ok('dawn: a clean night; the Edur go out (the eldest: "Hold"); the plain waits on the Finadd; a Whitefinder shield') : no('dawn ' + JSON.stringify(sl));
t.offer && t.ridge && t.teach === 'perrit' && t.dc === 16 && t.notNow && t.who === 'perrit' && t.ok === 1 && t.offered && t.smoke === 9 ? ok('the trick: the Cadre\'s Ward, a ✦ wits 16 check with Perrit; in a fight a 3×3 of grey') : no('trick ' + JSON.stringify(t));
wv.dome === 1 && wv.txt && wv.scene && wv.homeNpc && wv.desNpc ? ok('the wave off the ridge and a silver dome far off; then the Edur walking home and the deserters') : no('wave ' + JSON.stringify(wv));
h.capTxt && h.capKnew === 'asked' && h.capDone === 1 && h.eldest && h.done === 1 ? ok('the Edur go home: the eldest says the ridge was for the Edur too (edur); the captain says the officers knew (letherii)') : no('home ' + JSON.stringify(h));
d.choices && d.rise && d.let.flag === 'let' && d.let.rise === 1 && d.let.once === 1 && d.talk.flag === 'talked' && d.talk.rise === 1 && d.talk.charm && d.fight.started && d.fight.foes === 6 && d.fight.after === 'b7_c6_deserters_after' && d.fought.flag === 'fought' && d.fought.rise === 0 && d.fought.charm
  ? ok('the deserters: let go (+1, once), talked out of the bag (+1, the charm), or fought (six, a forced win, the charm)') : no('deserters ' + JSON.stringify(d));
m.marchGated && m.ennicNode === 'b7_c6_orders' && m.area === 'b7_c6_bank' && m.ph === 3 && m.noFire && m.ennic === 1 ? ok('the orders and the march: the river bank, no fire, the Finadd from the tree to the rock') : no('march ' + JSON.stringify(m));
l.notNow && l.check && /b7_malregular/.test(l.kinds) && /b7_malxbow/.test(l.kinds) && l.fight.started && l.fight.stage2 && l.fight.inStage2 && l.fight.foes2 === 5 && l.fight.allies === 1 && l.fight.after === 'b7_c6_landing_after' && l.done === 1 && l.keyNode === 'b7_c6_key'
  ? ok('the landing: the Adjunct\'s regulars and crossbows (their own figures), a Whitefinder beside; both grounds forced') : no('landing ' + JSON.stringify(l));
k.stand && k.brk && k.notYet && k.html ? ok('the key at the river: stand, break, Not yet, with the Rising shown') : no('key ' + JSON.stringify(k));
st.key === 'stand' && st.rise === 0 && st.thegg >= 0 && st.fight.started && st.fight.after === 'b7_c6_stand_after' && st.done === 1 && st.walk && st.area === 'b7_c6_walls' && st.ph === 4 ? ok('stand: no move on the Rising; the Malazan sergeant\'s squad (a forced win); "Walk."; the walls') : no('stand ' + JSON.stringify(st));
b.key === 'break' && b.rise === 1 && b.rose >= 1 && b.fight.started && b.fight.obj && b.fight.stage2 && b.fight.inStage2 && b.fight.after === 'b7_c6_break_after' && b.done === 1 && b.area === 'b7_c6_walls' ? ok('break: the Rising +1; the bank (survive) and the reeds forced; the walls') : no('break ' + JSON.stringify(b));
wl.walls && wl.endGated && wl.gate && wl.refugees && wl.choices && rdd.army && rdd.army.set && rdd.palace && rdd.palace.set && rdd.free && rdd.free.set && rdd.free.again ? ok('the walls: the refugees (the mob), the gate; the road: army, palace, free from one moment') : no('walls ' + JSON.stringify([wl, rdd]));
e.open && e.lines === e.here && e.html && e.notYet && e.view === 'end' && e.ch === 'break' && e.lvl >= 11 && e.extras >= 5 && e.journal >= 4 && e.endText === 'The bank' && e2.ch === 'stand' && e2.lvl >= 11 && e2.endText === 'The line that held'
  ? ok(`the end: in through the gate; break at level ${e.lvl} (${e.xp} xp), the Rising ${e.rise}; stand at level ${e2.lvl}`) : no('end ' + JSON.stringify([e, e2]));
fa.errs && !fa.errs.length && fa.pages === fa.here && fa.last === 'sgt' && fa.road === 'free' && fa.key === 'break' && fa.half && fa.roadTitle === 'Out' && fa.third && fa.third.thread === 't' && fa.third.half && fa.third.name && fa.third.pages === fa.pages && fa.third.para
  ? ok(`B7CH6.fates: a page for every soldier on every road, key and earlier key; pages() (${fa.pages}) from S, and from S.th.l once the Third is in`) : no('fates ' + JSON.stringify(fa).slice(0, 800));
y.thread === 'l' && y.renderErr && !y.renderErr.length && y.lines === y.here && y.lines2 === y.here && y.teach === 'ammet' && y.reader === 'tilewoman' && y.ilsa && y.noPerrit && /sorvan:Waiting/.test(y.pages) && y.teach2 === 'escort' && y.escort && y.fallen
  ? ok(`a synthetic save (Perrit and Tobet dead; Ruuk, Brune, Ilsa walking, Sorvan waiting; Chapter 4 letherii): every node renders, a line each, the tile-woman reads, Ammet teaches; with Ammet gone the old escort; the fates list the waiting and the fallen`) : no('synthetic ' + JSON.stringify(y).slice(0, 800));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b7ch6: FAIL (${bad.length})` : 'b7ch6: all ok'); process.exit(bad.length ? 1 : 0);
