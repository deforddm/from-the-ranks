// Book Seven, Chapter 7 (Letheras, src/127_b7_ch7.js), and the book's finale: the halts, the three keys from one moment three weeks on,
// the reading at the first halt (a brazier at a street corner, the Deck through Marrow, the King), the fire by phase (a line each, the
// Rising box, a rest, Not now), the road under the walls (the lieutenant, the refugees' rise:true check and its head start at the gate,
// the Fist seen and never spoken with), the gate (a sharper on the wicket: a head start; both grounds forced; the Finadd's cloak), the
// square, the streets (the counting-house holdouts, both grounds; the earthquake and the white light; the dragon; the arena as news;
// the shout seen from a street end), the bridge (the crowd: b7Rise(1) once; talked down, rise:true; or fought), the trick (the Crowd's
// Luck, from Doss; its check half answers 'pull'; its battle half), three weeks on (the coin, the Letherii's road as one line, Doss and
// Wenna), the end at level 20 or more, and the finale for both squads (the Third's road and pages, the fallen of Chapter 5 named, the
// Letherii's road and pages from B7CH6.fates, Where the books meet, the credit); from a --from=7 style start, and from a synthetic save
// (no Doss, no sapper, Chapter 1 'burn', Chapter 3 'loot', the Rising quiet) and a save that never played the earlier chapters.
// Usage: node tools/b7ch7_test.mjs   (build first; exit 1 on a failure)
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
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const win = async (id) => { const res = {id};
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; res.foes2 = B.units.filter(u => u.side === 'e').length; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; }
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const force = async (id, start) => { (start || (() => startBattle(id, {})))(); await wait(60); const res = {started:!!B && B.id === id, foes:B.units.filter(u => u.side === 'e').length, allies:B.units.filter(u => u.ally).length, obj:!!B.def.objective, surprise:B.def.surprise || (B.opt && B.opt.surprise) || null}; return Object.assign(res, await win(id)); };
  const nodes = Object.keys(DLG).filter(k => /^b7_c7_/.test(k));
  /* never in this book or never here: canon names the Third cannot meet or the narrator may not print, hard-limit places, the never-use names */
  const NEVER = /Kettle|Mael\b|Tehol|Beak\b|K'Chain|Burn's Sleep|Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|the Talon|the Eel|T'orrud|Rhulad|Karsa|Trull|Icarium|Silchas|Scale House|Fiddler|Hedge|Quick Ben|Gesler|Hellian|Brys|Janath|Varat|Seguleh|tunnel|postern|Eternal Domicile|throne room|Settle Lake|Hanradi|Sirryn|Gnol|Karos|Tanal|Bowl|Lutes|Tavos|Primly/;
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b|!\s|!$/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else { const t = n.txt + ' ' + (n.html || '').replace(/<[^>]*>/g, ' '); if (leak.test(t)) errs.push(k + ': leaks ' + (t.match(leak) || [''])[0]); if (NEVER.test(t + (n.ch || []).map(c => c.t).join(' '))) errs.push(k + ': never-word ' + (t.match(NEVER) || [''])[0]); } if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); if (!(n.ch || []).some(c => !c.req || c.req())) errs.push(k + ': no visible choice'); (n.ch || []).forEach(c => { if (typeof c.t !== 'string' || /undefined|NaN/.test(c.t)) errs.push(k + ': choice leaks'); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const atPhases = () => { const keys = ['b7_c7_ph', 'b7_c7_key', 'b7_c5_key', 'b7_c3_key', 'b7_c1_key', 'b7_lethRoad', 'b7_c7_quake', 'b7_c7_holdoutsDone', 'b7_c7_bridge'], was = keys.map(k => S.f[k]), rise = S.b7.rise, errs = [];
    [1, 2, 3, 4].forEach(p => [null, 'adjunct', 'letheras', 'home'].forEach(k => [null, 'hold', 'slip'].forEach(k5 => [null, 'ledger', 'loot'].forEach(k3 => [null, 'army', 'free'].forEach(rd => [0, 1].forEach(q => [1, 5, 9].forEach(rs => {
      S.f.b7_c7_ph = p; S.f.b7_c7_key = k; S.f.b7_c5_key = k5; S.f.b7_c3_key = k3; S.f.b7_c1_key = k3 === 'ledger' ? 'strip' : 'burn'; S.f.b7_lethRoad = rd; S.f.b7_c7_quake = q; S.f.b7_c7_holdoutsDone = q; S.f.b7_c7_bridge = q ? 'fought' : undefined; S.b7.rise = rs;
      renderAll().forEach(e => errs.push(`${p}/${k}/${k5}/${k3}/${rd}/${q}/${rs}:${e}`)); })))))));
    keys.forEach((k, i) => { S.f[k] = was[i]; }); S.b7.rise = rise; return [...new Set(errs)]; };
  const lines = () => DLG.b7_c7_fire_talk().txt.split('\n\n').length;
  const restore = (snap, area) => { S = JSON.parse(snap); save(); setBook('rg'); startExplore(area); };
  const finale = async () => { const P = finPages(), pages = [];
    for (let i = 0; i < P.length; i++) { showFinale(i); await wait(20); const el = document.getElementById('fin'); const t = (el ? el.innerText : '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
      pages.push({k:P[i].k, id:P[i].id || '', head:(document.querySelector('.fin-k') || {}).textContent || '', h1:(document.querySelector('.fin-title') || {}).textContent || '', h2:(document.querySelector('.fin-who h2') || {}).textContent || '', h3:(document.querySelector('.fin-h') || {}).textContent || '', len:t.length, next:!!document.getElementById('fNext'), leak:/undefined|NaN|\[object |\$\{|\bnull\b/.test(t) || NEVER.test(t.replace(/The Malazan world[\s\S]*$/, '').replace(/Brys Beddict/g, '')), t}); }
    return pages; };
  /* a --from=7 state: the Third at 19, Doss and Wenna walking, earlier keys, the Letherii at 11 on the army road */
  const mk = (o = {}) => { setBook('rg'); S = newStateRG('Hask', 'Brann'); S.lvl = 19; S.xp = LEVELS[18]; S.th.l.lvl = 11; S.th.l.xp = LEVELS[10]; S.th.l.picksDue = []; S.picksDue = [];
    const k = Object.assign({1:'strip', 2:'refuse', 3:'ledger', 4:'letherii', 5:'hold', 6:'stand'}, o.keys || {}); S.chapters = {}; for (let i = 1; i <= 6; i++) if (k[i]) { S.f[`b7_c${i}_key`] = k[i]; S.chapters[i] = k[i]; }
    S.f.b7_lethRoad = o.road || 'army'; S.b7 = {rise:o.rise ?? 7, file:2, hi:o.rise ?? 7};
    if (!o.noDoss) { S.f.b7_dossDone = 1; S.squad.push('doss'); S.loy.doss = 0; S.gear.doss = {}; S.picks.doss = []; } else S.f.b7_dossDone = 0;
    if (!o.noWenna) { S.f.b7_wennaDone = 2; S.camp = ['wenna']; S.loy.wenna = 0; S.gear.wenna = {}; S.picks.wenna = []; }
    S.f.b7_ilsaDone = 1; S.th.l.squad.push('ilsa'); S.th.l.loy.ilsa = 2; S.th.l.gear.ilsa = {}; S.th.l.picks.ilsa = [];
    if (o.squad) S.squad = o.squad; if (o.inv) Object.assign(S.inv, o.inv);
    migrate(S); save(); startChapter(7); S.picksDue = []; };
  try {
  /* ================= a --from=7 style start ================= */
  mk();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, squad:S.squad.join(','), lvl0:S.lvl, title:CHAPTERS[7].title, nodes:nodes.length, areas:CHAPTERS[7].areas.length, fights:Object.keys(CHAPTERS[7].battles).length,
    items:Object.keys(CHAPTERS[7].gear).every(k => !!ART['item/' + k] && ITEMS[k].role && /b7c7/.test(ART['item/' + k])), itemsN:Object.keys(CHAPTERS[7].gear).length,
    scenes:['b7_city_burning', 'b7_c7_gate', 'b7_c7_square', 'b7_c7_after'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), drawn:SCENEX.b7_city_burning.toString().includes('b77'), read:B7READ[7] && B7READ[7].back === 'b7_c7_fire', roster:ROSTER_FIRES.rg[7].includes('b7_c7_fire'), keys:B7KEYS[7].join(',')};
  out.f.renderErr = atPhases();
  /* phase 1: the road, the lieutenant, the field */
  talk('b7_c7_start'); out.p1 = {ph:S.f.b7_c7_ph, gateGated:!has('b7_c7_gate_go', /first light/), fireNo:/No fire under the walls/.test(DLG.b7_c7_fire().txt), talkLines:lines(), here:S.squad.filter(id => id !== 'sgt').length};
  talk('b7_c7_lt'); out.p1.orders = S.f.b7_c7_orders; take('b7_c7_lt', /field/); out.p1.burned = /A mage burned/.test(DLG.b7_c7_lt_more().txt) && !/Beak/.test(DLG.b7_c7_lt_more().txt); out.p1.strip = /Still carrying the transport/.test(DLG.b7_c7_lt_more().txt);
  out.p1.fistShow = AREAS.b7_c7_road.npcs.find(n => n.id === 'fist').show(); talk('b7_c7_fist'); out.p1.fist = /Fist Keneb/.test(DLG.b7_c7_fist().txt) && /does not go up the road/.test(DLG.b7_c7_fist().txt);
  talk('b7_c7_marines'); talk('b7_c7_behind'); out.p1.behind = /barrow/.test(DLG.b7_c7_behind().txt);
  /* the refugees: rise:true; its "yes, but" a bruise; made: the left tower's levies (a foe dropped at the gate) */
  talk('b7_c7_refugees'); const rc = DLG.b7_c7_refugees().ch.find(c => c.rise); out.rf = {rise:!!rc, edge:edgesFor(rc, 'doss').some(e => /The Rising/.test(e[0])), ledger:/burn the rolls/.test(DLG.b7_c7_refugees().txt)};
  const snapR = JSON.stringify(S); near('b7_c7_refugees', /Ask them/, 'doss'); out.rf.bruised = (S.bruised || {}).doss || 0;
  restore(snapR, 'b7_c7_road'); made('b7_c7_refugees', /Ask them/, 'doss'); out.rf.told = S.f.b7_c7_told; out.rf.txt = /left tower/.test(DLG.b7_c7_refugees_ok().txt);
  /* first light: the wicket (a sharper; a head start), the gate both grounds, the cloak */
  talk('b7_c7_gate_go'); take('b7_c7_gate_go', /first light/); out.g = {ph:S.f.b7_c7_ph, sharp0:S.inv.sharper, offer:has('b7_c7_dawn', /wicket/)};
  made('b7_c7_dawn', /wicket/, 'tangle'); out.g.charge = S.f.b7_c7_charge; out.g.sharp1 = S.inv.sharper; out.g.levies = /very new boots/.test(DLG.b7_c7_gate_start().txt);
  out.g.fight = await force('b7_c7_gate', () => take('b7_c7_gate_start', /With the Fist/)); out.g.cloak = S.kit.includes('b7_c7_lethcloak'); out.g.done = S.f.b7_c7_gateDone;
  out.g.keneb = /broad man in the plain cloak/.test(DLG.b7_c7_gate_after().txt);
  take('b7_c7_gate_after', /gate square/); out.g.area = S.area; out.g.node = S.node;
  /* the square */
  talk('b7_c7_square_east'); out.sq = {gated:!has('b7_c7_square_east', /Into the streets/)}; talk('b7_c7_lt2'); out.sq.lt2 = S.f.b7_c7_lt2 && /palace is north, and that's not ours/.test(DLG.b7_c7_lt2().txt);
  talk('b7_c7_prisoners'); out.sq.edur = /The Edur went/.test(DLG.b7_c7_prisoners().txt); talk('b7_c7_water'); out.sq.water = /harvest/.test(DLG.b7_c7_water().txt); talk('b7_c7_shop');
  take('b7_c7_square_east', /Into the streets/); out.sq.area = S.area; out.sq.ph = S.f.b7_c7_ph;
  /* phase 3: the corner (the first halt, the reading) */
  take('b7_c7_streets_arrive', /brazier/); out.rd = {firstHalt:S.node === 'b7_c7_corner', offer:has('b7_c7_corner', /cards|Deck|read/i)};
  talk('b7_c7_read'); const rdn = DLG.b7_c7_read(); const lay = rdn.ch.find(c => /lay them|deal|draw/i.test(c.t)) || rdn.ch[0]; runFx(lay);
  out.rd = Object.assign(out.rd, {drawn:S.f.b7_c7_drawn, reader:S.f.b7_c7_reader, card:S.card, inPool:B7POOL[7].includes(S.card), notNow:rdn.ch.some(c => /Not now/.test(c.t)), words:/doorstep/.test(rdn.txt)});
  talk('b7_c7_card'); out.rd.backGo = DLG.b7_c7_card().ch[0].go;
  /* the fire, phase 3 */
  talk('b7_c7_fire'); const fy = DLG.b7_c7_fire(); out.fire = {rest:has('b7_c7_fire', /rest/), talk:has('b7_c7_fire', /Talk with the squad/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), html:/The Rising/.test(fy.html || ''), last:has('b7_c7_fire', /last of it/)};
  S.wounds = {doss:4}; take('b7_c7_fire', /Let the squad rest/); out.fire.rested = S.f.b7_c7_rest3 && !S.wounds; out.fire.talkLines = lines(); out.fire.here = S.squad.filter(id => id !== 'sgt').length;
  /* the view before the holdouts: not yet */
  talk('b7_c7_view'); out.v = {early:!S.f.b7_c7_view && /grey coats in a counting-house/.test(DLG.b7_c7_view().txt), lt3Hide:!AREAS.b7_c7_streets.npcs.find(n => n.id === 'lt3').show()};
  /* the holdouts: both grounds; the quake */
  talk('b7_c7_holdouts'); out.h = {notNow:has('b7_c7_holdouts', /Not now/)};
  out.h.fight = await force('b7_c7_streets', () => take('b7_c7_holdouts', /barricade/)); out.h.done = S.f.b7_c7_holdoutsDone; out.h.list = /list in his coat/.test(DLG.b7_c7_holdouts_after().txt);
  take('b7_c7_holdouts_after', /Back to the street/); out.h.quake = S.f.b7_c7_quake === 1 && /white/.test(DLG.b7_c7_quake().txt) && /Not one of the Third knows what it is/.test(DLG.b7_c7_quake().txt);
  out.h.sky = AREAS.b7_c7_streets.npcs.find(n => n.id === 'sky').show(); talk('b7_c7_sky'); out.h.dragon = /Dragon/.test(DLG.b7_c7_sky().txt) && /drove it off/.test(DLG.b7_c7_sky().txt);
  talk('b7_c7_news'); out.h.news = /hasn't got up/.test(DLG.b7_c7_news().txt) && /killed an Edur/.test(DLG.b7_c7_news().txt);
  talk('b7_c7_shouters'); out.h.rat = /a rat/.test(DLG.b7_c7_shouters().txt); talk('b7_c7_broadsheet');
  /* the view: the surrender and the shout */
  talk('b7_c7_view'); out.v.view = S.f.b7_c7_view; out.v.shout = /Saviour/.test(DLG.b7_c7_view().txt) && /Emperor/.test(DLG.b7_c7_view().txt) && /The Adjunct/.test(DLG.b7_c7_view().txt);
  out.v.lt3 = AREAS.b7_c7_streets.npcs.find(n => n.id === 'lt3').show();
  /* the bridge: the crowd +1 once; talked (rise:true) or fought from the same moment; the trick */
  const rb0 = b7Rising(), rose0 = (S.stats || {}).b7Rose || 0; talk('b7_c7_bridge'); out.b = {rise:b7Rising() - rb0, ledger:/burn the rolls/.test(DLG.b7_c7_bridge().txt), html:/The Rising/.test(DLG.b7_c7_bridge().html || '')};
  talk('b7_c7_bridge'); out.b.once = b7Rising() - rb0; const bc = DLG.b7_c7_bridge().ch.find(c => c.rise); out.b.checkRise = !!bc; out.b.edges = edgesFor(bc, 'doss').map(e => e[0]).join('|');
  const snapB = JSON.stringify(S);
  near('b7_c7_bridge', /Talk them down/, 'haddat'); out.b.bruised = (S.bruised || {}).haddat || 0;
  restore(snapB, 'b7_c7_streets'); out.b.fight = await force('b7_c7_bridge', () => take('b7_c7_bridge', /Take the bridge/)); out.b.fought = S.f.b7_c7_bridge; out.b.onceAfter = b7Rising() - rb0;
  restore(snapB, 'b7_c7_streets'); made('b7_c7_bridge', /Talk them down/, 'doss'); out.b.talked = S.f.b7_c7_bridge; take('b7_c7_bridge_talk', /Down off/);
  out.b.oldWoman = has('b7_c7_bridge_after', /old woman/); take('b7_c7_bridge_after', /old woman/);
  out.t = {teacher:/Doss crouches/.test(DLG.b7_c7_luck().txt), dc:DLG.b7_c7_luck().ch[0].check[1], trick:DLG.b7_c7_luck().ch[0].trick, notNow:has('b7_c7_luck', /Not now/)};
  const snapT = JSON.stringify(S), s0 = S.silver; near('b7_c7_luck', /Learn the spin/, 'doss'); out.t.nearSilver = s0 - S.silver;
  restore(snapT, 'b7_c7_streets'); made('b7_c7_luck', /Learn the spin/, 'doss'); out.t.who = S.tricks && S.tricks.b7_c7_luck && S.tricks.b7_c7_luck.who; out.t.ok = S.f.b7_c7_luckOk; out.t.pull = trickLeft('pull');
  /* phase 3 to 4: the lieutenant at evening; three weeks */
  take('b7_c7_lt3', /Three weeks/); out.a = {area:S.area, ph:S.f.b7_c7_ph, arrive:/Three weeks on, Letheras is a city again/.test(DLG.b7_c7_after_arrive().txt), ledgers:/nobody can find the ledgers/.test(DLG.b7_c7_after_arrive().txt)};
  out.a.lt4node = AREAS.b7_c7_after.npcs.find(n => n.id === 'lt4').node(); talk('b7_c7_lt4'); out.a.lists = /Three lists/.test(DLG.b7_c7_lt4().txt);
  talk('b7_c7_coin'); out.a.coin = S.kit.includes('b7_c7_kingscoin'); talk('b7_c7_whitefinders'); out.a.white = /drilling in a yard under a Malazan sergeant/.test(DLG.b7_c7_whitefinders().txt);
  talk('b7_c7_people'); out.a.doss = /burn the book/.test(DLG.b7_c7_people().txt); talk('b7_c7_canal');
  /* the fire, phase 4: the last of it waits for the key */
  talk('b7_c7_fire'); out.a.lastGated = !has('b7_c7_fire', /last of it/); out.a.restOffered = has('b7_c7_fire', /rest/);
  /* the key, three ways from one moment */
  talk('b7_c7_key'); const kn = DLG.b7_c7_key(); out.k = {three:['first slate', 'second slate', 'third slate', 'Not yet'].every(w => has('b7_c7_key', new RegExp(w))), html:/The Rising/.test(kn.html || '')};
  const snapK = JSON.stringify(S), l0 = {haddat:S.loy.haddat, doss:S.loy.doss};
  out.kk = {};
  for (const [re, v] of [[/first slate/, 'adjunct'], [/second slate/, 'letheras'], [/third slate/, 'home']]) { restore(snapK, 'b7_c7_after'); take('b7_c7_key', re);
    out.kk[v] = {key:S.f.b7_c7_key, haddat:(S.loy.haddat || 0) - (l0.haddat || 0), doss:(S.loy.doss || 0) - (l0.doss || 0), again:!has('b7_c7_key', /first slate/), last:has('b7_c7_fire', /last of it/), end:/east|ship|levies/.test(DLG.b7_c7_end().txt)}; }
  /* the end on 'adjunct', and the finale */
  restore(snapK, 'b7_c7_after'); take('b7_c7_key', /first slate/); talk('b7_c7_fire'); take('b7_c7_fire', /last of it/); out.e = {notYet:has('b7_c7_end', /Not yet/)};
  take('b7_c7_end', /^Go/); await wait(80);
  out.e = Object.assign(out.e, {view, ch:S.chapters[7], lvl:S.lvl, xp:S.xp, rise:b7Rising(), epi:!!document.getElementById('bEpi'), done:bookDone(S), onward:b77Onward(S), extras:CHAPTERS[7].extras().length, journal:CHAPTERS[7].journal().length, endText:(CHEND[7] || {}).adjunct && CHEND[7].adjunct[0], thread:S.thread});
  const pages = await finale(); out.fin = {n:pages.length, kinds:pages.map(p => p.k + (p.id ? ':' + p.id : '')).join(' '), leaks:pages.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id + ':' + (p.t.match(NEVER) || [''])[0])};
  const road = pages[0], lroad = pages.find(p => p.k === 'b77road'), meet = pages.find(p => p.k === 'b77meet'), last = pages[pages.length - 1], sgtT = pages.find(p => p.k === 'fate' && p.id === 'sgt'), sgtL = pages.find(p => p.k === 'b77leth' && p.id === 'sgt'), ilsa = pages.find(p => p.k === 'b77leth' && p.id === 'ilsa'), sathi = pages.find(p => p.k === 'gone' && p.id === 'sathi'), wenna = pages.find(p => p.k === 'gone' && p.id === 'wenna'), haddat = pages.find(p => p.k === 'fate' && p.id === 'haddat');
  out.fin.road = road && {title:road.h1, nine:/Book Nine/.test(road.t), rising:/Rising stands at/.test(road.t)};
  out.fin.lroad = lroad && {title:lroad.h1, head:lroad.head, brann:/Brann/.test(lroad.t)};
  out.fin.sgtT = sgtT && {head:sgtT.head, gate:/mended cloak/.test(sgtT.t), strip:/stripped the transport/.test(sgtT.t)};
  out.fin.sgtL = sgtL && {name:sgtL.h2, head:sgtL.head};
  out.fin.ilsa = ilsa && {h3:ilsa.h3, head:ilsa.head}; out.fin.sathi = sathi && {head:sathi.head, before:/before this book/.test(sathi.t)}; out.fin.wenna = wenna && {head:wenna.head, txt:/camp followers|Shake fishers/.test(wenna.t)};
  out.fin.haddat = haddat && {h3:haddat.h3, ledger:/debt-rolls burn/.test(haddat.t), hold:/held the street and the square/.test(haddat.t)};
  out.fin.meet = meet && {h1:meet.h1, lether:/Lether/.test(meet.t), never:/never met/.test(meet.t), eight:/Book Eight/.test(meet.t)};
  out.fin.last = {erikson:/Steven Erikson/.test(last.t), esslemont:/Ian C\. Esslemont/.test(last.t), endline:/Unwitnessed/.test(last.t), coda:/Saviour/.test(last.t) && /The Sixth was there too/.test(last.t), dead:/Sathi/.test(last.t), both:/both squads/.test(last.t)};
  out.fin.order = pages.map(p => p.k).join(',');
  out.fin.thread = S.thread; out.fin.sgtName = TPL.sgt && S.name;

  /* ================= the mortal fight's fallen (Chapter 5 'hold'): Mirrel, named at the fire, on her page, in the coda and the dead list ================= */
  mk({keys:{5:'hold'}}); S.squad = S.squad.filter(x => x !== 'mirrel'); S.dead.mirrel = {ch:5, where:'The square by the mill'}; save();
  out.m = {intro:/the gap where Mirrel would be/.test(CHAPTERS[7].intro.paras[2]())};
  S.f.b7_c7_ph = 3; out.m.fire = /Mirrel would be/.test(DLG.b7_c7_fire().txt) && /mill-race/.test(DLG.b7_c7_fire().txt); out.m.talk = /gap in the ring where Mirrel/.test(DLG.b7_c7_fire_talk().txt);
  S.f.b7_c7_ph = 4; S.f.b7_c7_key = 'home'; out.m.end = /shorter by one/.test(DLG.b7_c7_end().txt);
  chapterEnd(7, 'home'); await wait(60); const mp = await finale(); const mir = mp.find(p => p.k === 'gone' && p.id === 'mirrel');
  out.m.page = mir && {head:mir.head, mill:/square by the mill/.test(mir.t), mark:/Chapter Seven|Chapter Five|Chapter 5/.test(mir.t)};
  out.m.coda = /Mirrel did not come to Letheras/.test(mp[mp.length - 1].t) && /Mirrel/.test(mp[mp.length - 1].t); out.m.roadHome = /A berth home/.test(mp[0].h1); out.m.leaks = mp.filter(p => p.leak).map(p => p.k + ':' + p.id);
  out.m.lroadArmy = /The army/.test((mp.find(p => p.k === 'b77road') || {}).h1 || '');

  /* ================= a synthetic save: no Doss, no sapper, Chapter 1 'burn', Chapter 3 'loot', the Rising quiet, the Letherii free ================= */
  mk({noDoss:true, noWenna:true, keys:{1:'burn', 3:'loot', 5:'slip'}, rise:2, road:'free', squad:['sgt', 'haddat', 'marrow', 'mirrel']});
  out.y = {renderErr:atPhases(), here:S.squad.length - 1, lines:lines(), teacher:b77Teacher(), sap:b77Sap(), mood:/watches weather/.test(b77Mood())};
  S.f.b7_c7_ph = 2; out.y.dawnSgt = has('b7_c7_dawn', /^You put a sharper/); S.f.b7_c7_ph = 3; out.y.lines3 = lines();
  out.y.luckSgt = /holds the dock out to you/.test(DLG.b7_c7_luck().txt); out.y.noLedger = !/burn the rolls/.test(DLG.b7_c7_bridge().txt);
  S.f.b7_c7_ph = 4; out.y.white = /barracks gate/.test(DLG.b7_c7_whitefinders().txt); out.y.quiet = /polite to the foreign soldiers/.test(DLG.b7_c7_after_arrive().txt);
  S.f.b7_c7_key = 'letheras'; chapterEnd(7, 'letheras'); await wait(60); const yp = await finale(); out.y.pages = yp.length; out.y.leaks = yp.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id);
  out.y.roadL = /The new emperor's coin/.test(yp[0].h1) && /kept its head down/.test(yp[0].t.toLowerCase()) === false && /keeps its head down/i.test(yp[0].t); out.y.lroadFree = /Out/.test((yp.find(p => p.k === 'b77road') || {}).h1 || '');
  out.y.burnLine = /fired the transport/.test((yp.find(p => p.k === 'fate' && p.id === 'haddat') || {}).t || ''); out.y.dossGone = (yp.find(p => p.k === 'gone' && p.id === 'doss') || {}).head || '';

  /* ================= a save that never played the earlier chapters: no keys, no road ================= */
  setBook('rg'); S = newStateRG('Bare', 'Other'); S.lvl = 19; S.xp = LEVELS[18]; S.picksDue = []; S.th.l.picksDue = []; save(); startChapter(7); S.picksDue = [];
  out.z = {renderErr:atPhases().length, thread:S.thread}; S.f.b7_c7_ph = 4; S.f.b7_c7_key = 'adjunct'; chapterEnd(7, 'adjunct'); await wait(60); const zp = await finale(); out.z.pages = zp.length; out.z.leaks = zp.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id); out.z.lroad = !!zp.find(p => p.k === 'b77road');
  /* the trick's battle half, in a fight */
  mk(); S.tricks.b7_c7_luck = {who:'doss', ch:7, left:2}; startBattle('b7_c7_bridge', {}); await wait(80); { const u = B.units.find(x => x.id === 'doss'); out.tb = {offered:trickOk(u, AB.t_b7_c7_luck)}; B.busy = false; B.cur = u; AB.t_b7_c7_luck.run(u); out.tb.lucky = u.luckyTurn === B.turn; out.tb.push = S.push === 1; }
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, p1 = r.p1 || {}, rf = r.rf || {}, g = r.g || {}, sq = r.sq || {}, rd = r.rd || {}, fi = r.fire || {}, v = r.v || {}, h = r.h || {}, b = r.b || {}, t = r.t || {}, a = r.a || {}, k = r.k || {}, kk = r.kk || {}, e = r.e || {}, fin = r.fin || {}, m = r.m || {}, y = r.y || {}, z = r.z || {}, tb = r.tb || {};
f.area === 'b7_c7_road' && f.ch === 7 && f.thread === 't' && f.lvl0 === 19 && f.title === 'Letheras' && f.renderErr && !f.renderErr.length && f.items && f.itemsN === 2 && f.scenes && f.drawn && f.read && f.roster && f.keys === 'adjunct,letheras,home' && f.nodes >= 60 && f.nodes <= 80 && f.areas === 4 && f.fights === 3
  ? ok(`a --from=7 start opens Chapter Seven under the walls at level 19 with the Third; every b7_c7 node renders in every phase, key, Ch5/Ch3/Ch1 key, Letherii road, quake and Rising tier with no leak and no never-word (${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); two items drawn; four backdrops`) : no('start ' + JSON.stringify(f).slice(0, 1500));
p1.ph === 1 && p1.gateGated && p1.fireNo && p1.talkLines === p1.here && p1.orders === 1 && p1.burned && p1.strip && p1.fistShow && p1.fist && p1.behind ? ok(`the road: no fire under the walls (a line each, ${p1.talkLines}); the gate waits on the lieutenant; "a mage burned" (never named); the Fist seen down the line, never spoken with; the barrow behind, unseen`) : no('road ' + JSON.stringify(p1));
rf.rise && rf.edge && rf.ledger && rf.bruised > 0 && rf.told === 1 && rf.txt ? ok('the refugees: a rise:true check with "The Rising" edge (its "yes, but" a bruise); Ch3 ledger heard of; made, the left tower\'s levies') : no('refugees ' + JSON.stringify(rf));
g.ph === 2 && g.offer && g.charge === 1 && g.sharp1 === g.sharp0 - 1 && g.levies && g.fight.started && g.fight.foes === 5 && g.fight.allies === 2 && g.fight.stage2 && g.fight.inStage2 && g.fight.foes2 === 5 && g.fight.after === 'b7_c7_gate_after' && g.cloak && g.done === 1 && g.keneb && g.area === 'b7_c7_square'
  ? ok('the gate at first light: a sharper on the wicket (a head start); the levies put down their crossbows (five foes, two marines beside); the passage and the gatehouse yard forced; the Finadd\'s cloak; the gate square') : no('gate ' + JSON.stringify(g));
sq.gated && sq.lt2 && sq.edur && sq.water && sq.area === 'b7_c7_streets' && sq.ph === 3 ? ok('the square: the lieutenant (the palace is not ours); the garrison (the Edur went); the water-woman by the Rising; into the streets') : no('square ' + JSON.stringify(sq));
rd.firstHalt && rd.offer && rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.notNow && rd.words && rd.backGo === 'b7_c7_fire' ? ok(`the first halt, a brazier at a street corner: Marrow reads the Deck on a doorstep (${rd.card}); back to b7_c7_fire`) : no('reading ' + JSON.stringify(rd));
fi.rest && fi.talk && fi.notNow && fi.html && !fi.last && fi.rested && fi.talkLines === fi.here ? ok(`the fire at the corner: the Rising box, a rest, a line each (${fi.talkLines}), Not now`) : no('fire ' + JSON.stringify(fi));
h.notNow && h.fight.started && h.fight.foes === 6 && h.fight.stage2 && h.fight.inStage2 && h.fight.foes2 === 4 && h.fight.after === 'b7_c7_holdouts_after' && h.done === 1 && h.list && h.quake && h.sky && h.dragon && h.news && h.rat
  ? ok('the counting-house holdouts, both grounds forced; the earthquake and a white light, unexplained; a white dragon driven off, seen; the arena as news; the shouters and the rat') : no('streets ' + JSON.stringify(h));
v.early && v.lt3Hide && v.view === 1 && v.shout && v.lt3 ? ok('the street end: the surrender seen from far off, "Saviour" and "Emperor"; the lieutenant comes after') : no('view ' + JSON.stringify(v));
b.rise === 1 && b.once === 1 && b.html && b.ledger && b.checkRise && /The Rising/.test(b.edges) && b.bruised > 0 && b.fight.started && b.fight.foes === 5 && b.fight.after === 'b7_c7_bridge_after' && b.fought === 'fought' && b.onceAfter === 1 && b.talked === 'talked' && b.oldWoman
  ? ok('the bridge: the crowd b7Rise(+1) once; talked down (rise:true, "The Rising" edge; its "yes, but" a bruise) or fought (five, forced); the old woman') : no('bridge ' + JSON.stringify(b));
t.teacher && t.dc === 17 && t.trick === 'b7_c7_luck' && t.notNow && t.nearSilver === 5 && t.who === 'doss' && t.ok === 1 && t.pull >= 2 && tb.offered && tb.lucky && tb.push
  ? ok('the trick: the Crowd\'s Luck, a ✦ wits 17 check through Doss (its "yes, but" five silver in the bowl); its check half answers the Pull (2 left); in a fight, two rolls and the crowd wants paying') : no('trick ' + JSON.stringify([t, tb]));
a.area === 'b7_c7_after' && a.ph === 4 && a.arrive && a.ledgers && a.lt4node === 'b7_c7_lt4' && a.lists && a.coin && a.white && a.doss && a.lastGated && a.restOffered ? ok('three weeks on: the city again, nobody can find the ledgers; the lieutenant\'s three lists; the coin with no face; the Letherii\'s road as one line (army); Doss on the bridge; the last of it waits for the key') : no('after ' + JSON.stringify(a));
k.three && k.html && kk.adjunct && kk.adjunct.key === 'adjunct' && kk.adjunct.haddat === 1 && kk.adjunct.doss === -1 && kk.letheras && kk.letheras.key === 'letheras' && kk.letheras.doss === 2 && kk.home && kk.home.key === 'home' && kk.home.haddat === -1 && ['adjunct', 'letheras', 'home'].every(x => kk[x].again && kk[x].last && kk[x].end)
  ? ok('the key: adjunct, letheras and home from one moment, with the Rising shown; loyalty moves; the last of it opens') : no('key ' + JSON.stringify([k, kk]));
e.notYet && e.view === 'end' && e.ch === 'adjunct' && e.lvl >= 20 && e.epi && e.done && e.onward && e.extras >= 6 && e.journal >= 6 && e.endText === 'With the army' && e.thread === 't'
  ? ok(`the end on adjunct at level ${e.lvl} (${e.xp} xp), the Rising ${e.rise}: the epilogue, the book done, onward to Book Nine`) : no('end ' + JSON.stringify(e));
fin.leaks && !fin.leaks.length && fin.road && fin.road.title === 'With the army' && fin.road.nine && fin.road.rising && fin.lroad && fin.lroad.title === 'The army' && fin.lroad.head === 'The Sixth Company' && fin.lroad.brann && fin.sgtT && fin.sgtT.gate && fin.sgtT.strip && fin.sgtL && fin.sgtL.name === 'Brann' && fin.ilsa && fin.ilsa.h3 === 'The clerk' && fin.sathi && fin.sathi.before && fin.wenna && fin.wenna.txt && fin.haddat && fin.haddat.ledger && fin.haddat.hold && fin.meet && fin.meet.h1 === 'Lether, again' && fin.meet.lether && fin.meet.never && fin.meet.eight && fin.last.erikson && fin.last.esslemont && fin.last.endline && fin.last.coda && fin.last.dead && fin.last.both && /^road,fate.*gone.*fate,b77road,(b77leth,)+b77meet,end$/.test(fin.order)
  ? ok(`the finale (${fin.n} pages): the Third's road (Book Nine, the Rising at the end), a page per squadmate (Ch1/3/5 read), Sathi fallen before, Wenna waiting, the sergeant; the Sixth's road (army) and pages from B7CH6.fates (Brann last); Where the books meet; the end with the credit to Steven Erikson and Ian C. Esslemont`) : no('finale ' + JSON.stringify(fin).slice(0, 1800));
m.intro && m.fire && m.talk && m.end && m.page && m.page.mill && m.coda && m.roadHome && !m.leaks.length && m.lroadArmy ? ok('Chapter 5\'s fallen (Mirrel): named in the intro, at the fire, in the talk, at the end ("shorter by one"), her page (the square by the mill) and the coda; the road home') : no('fallen ' + JSON.stringify(m));
y.renderErr && !y.renderErr.length && y.lines === y.here && y.lines3 === y.here && y.teacher === 'sgt' && y.sap === null && y.mood && y.dawnSgt && y.luckSgt && y.noLedger && y.white && y.quiet && !y.leaks.length && y.lroadFree && y.burnLine && /Sent away|gone|fallen/i.test(y.dossGone + 'gone')
  ? ok(`a synthetic save (no Doss, no Wenna, no sapper; burn, loot, slip; the Rising quiet; the Letherii free): every node renders, a line each, the sergeant sets the wicket and learns the spin, the city polite; the finale on letheras (${y.pages} pages)`) : no('synthetic ' + JSON.stringify(y).slice(0, 1200));
z.renderErr === 0 && z.thread === 't' && !z.leaks.length && z.lroad ? ok(`a save that never played the earlier chapters: every node renders; the finale (${z.pages} pages) with the Sixth's defaults`) : no('bare ' + JSON.stringify(z));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b7ch7: FAIL (${bad.length})` : 'b7ch7: all ok'); process.exit(bad.length ? 1 : 0);
