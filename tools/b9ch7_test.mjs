// Book Nine, Chapter 7 (The Rearguard, src/167_b9_ch7.js) and the book's finale: the Third's last chapter, the book's ONE mortal fight.
// Every node renders clean (no never-name, no "!" in narration, no rounds or turns) under every phase and key; every check carries a "yes,
// but" and every onward step a "Not now" or "Not yet"; the march −1; Thallo's orders; the brew-fire (the roster fire, phase 1); the
// regulars, the surgeons' cart (a rations check whose "yes, but" is the chapter's ration −1, once), the sappers' cusser; the Witness beat
// before the dark (three answers, Not now records nothing); the line: the mortal fight SIGNPOSTED before it starts (every step into it says
// so; the battle says so) and MORTAL (death checks off; a squadmate who falls in its second ground is dead, named after, on the fate pages
// and the dead list); the lull after dark (the reading opens: the plain after dark); the horsemen far off; the trick (Fight Them Low) behind
// its ✦ wits 19 check, free, and its battle half; into the dark (survive 5, not mortal, death checks run); the walk back; the trail (no
// food found; the news as headline; stragglers; the cloak; the dogs, optional); the camp days after (the column's pot +1, once); the roll
// stick; every road (adjunct / south / home, b9Faith colouring home) to the end and through the finale: a fate page per squadmate of BOTH
// squads, the fallen, those waiting, both sergeants, the Letherii's road, Where the books meet, the end page with the credit; the onward
// helper for Book Ten; a --from=7 style transfer save that reloads.
// Usage: node tools/b9ch7_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const tt = c => typeof c.t === 'function' ? c.t() : c.t;
  const run = c => { runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const take = (id, re) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(tt).join(' | ')}]`); return run(c); };
  const has = (id, re) => vis(id).some(x => re.test(tt(x)));
  const roll = (id, re, who, tier, pass) => { const c = vis(id).find(x => re.test(tt(x))); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(tt).join(' | ')}]`); runFx(c);
    settleRoll({who, stat:c.check[0], tier, ok:pass, pass, margin:pass ? 6 : -4, nat:pass ? 18 : 4}, c); return c; };
  const made = (id, re, who) => { const c = roll(id, re, who, 'clean', true); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const near = (id, re, who) => roll(id, re, who, 'near', true);
  const until = async (f, ms = 6000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
  const clearModal = () => { if (S.picksDue && S.picksDue.length) S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const restore = (snap, area) => { B = null; view = 'scene'; S = JSON.parse(snap); save(); setBook('dod'); b9Use('t'); S.chapter = 7; startExplore(area); };
  /* a fight to its end: foes cleared; 'fall' names a squadmate downed in the last ground (a mortal fight kills them) */
  const force = async (id, opt = {}, fall = null) => { const res = {id};
    startBattle(id, opt); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length;
    res.survive = !!(B.def.objective && B.def.objective.type === 'survive'); res.mortal = !!B.def.mortal; res.death = deathOn(); res.surprise = opt.surprise || null;
    res.log = (B.log || []).map(x => typeof x === 'string' ? x : (x && x.t) || '').join(' | '); res.kinds = [...new Set(B.units.filter(u => u.side === 'e').map(u => u.kind))].join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
      await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); res.stage2 = !!on; res.s2txt = on ? (document.getElementById('sheet').innerText || '') : ''; if (on) on.click(); await wait(80); res.inStage2 = !!B && !!B.def.isStage2; res.death2 = deathOn(); res.mortal2 = !!(B && B.def.mortal); }
    if (fall) { const u = B.units.find(x => x.id === fall); if (u) u.hp = 0; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true);
    await until(() => S.scene === 'talk' && view !== 'battle' || (S.node === BATTLES[id].after));
    await wait(40); clearModal();
    if (S.node !== BATTLES[id].after) talk(BATTLES[id].after);
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b9_c7_/.test(k));
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const NEVER = /Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|Fiddler|Tarr\b|Cuttle|Hedge|Bavedict|Keneb|Blistig|Brys|Aranict|Atri-Ceda|Henar|Ublala|Kalam|Tehol|Tool\b|Hetan|Setoc|Quick Ben|Ruthan|Bottle|Lostara|Tavore|Khundryl|Gall\b|Deadsmell|Gesler|Stormy|Sinter|Gu'Rull|\bweeks\b|\bmonths\b|Glass Desert|Forkrul|Assail|Chancel|Bridgeburner|Perish ships|Hood's throne/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text');
    else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (NEVER.test(n.txt)) errs.push(k + ': a never-name: ' + n.txt.match(NEVER)[0]);
    else if (/!/.test(n.txt.replace(/"[^"]*"/g, '').replace(/<[^>]*>/g, ''))) errs.push(k + ': an exclamation mark in narration'); else if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene);
    else if (/\b(a|the|next|this|each|every|one)\s+(round|turn)s?\b/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': combat rounds in story text');
    (n.ch || []).forEach(c => { const t = tt(c); if (/undefined|NaN/.test(t)) errs.push(k + ': choice leaks'); else if (typeof c.go === 'string' && !DLG[c.go]) errs.push(k + ': goes nowhere: ' + c.go); }); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* under every phase, key, faith and a few flags at once */
  const atPhases = () => { const errs = [], keep = JSON.stringify(S.f), wit = JSON.stringify(S.b9 || {wit:{}}), dead = JSON.stringify(S.dead || {});
    [1, 2, 3, 4].forEach(ph => [null, 'adjunct', 'south', 'home'].forEach(k => [null, 'kept', 'doubt'].forEach(fa => [0, 1].forEach(fl => {
      S.f.b9_c7_ph = ph; S.f.b9_c7_key = k; S.b9 = {wit:fa ? {c5:fa} : {}};
      ['b9_c7_orders', 'b9_c7_rearDone', 'b9_c7_darkDone', 'b9_c7_thallo2', 'b9_c7_news', 'b9_c7_slates', 'b9_c7_cart', 'b9_c7_drawn', 'b9_c7_lowTried'].forEach(f => { S.f[f] = fl ? 1 : undefined; });
      if (fl) S.dead = Object.assign({}, JSON.parse(dead), {mirrel:{ch:7, where:'The rearguard'}}); else S.dead = JSON.parse(dead);
      renderAll().forEach(e => errs.push(`${ph}/${k}/${fa}/${fl}:${e}`)); }))));
    S.f = JSON.parse(keep); S.b9 = JSON.parse(wit); S.dead = JSON.parse(dead); return [...new Set(errs)].slice(0, 12); };
  /* every check carries its own "yes, but" (a ✦ trick check carries none, by the engine's rule); every onward step has a "Not now" or "Not yet" */
  const audit = () => { const noNear = new Set(), noStay = new Set(), checks = new Set(), tricks = new Set(), onwards = new Set(), keep = JSON.stringify(S.f);
    [1, 2, 3, 4].forEach(ph => [null, 'adjunct', 'south', 'home'].forEach(k => [0, 1].forEach(fl => { S.f.b9_c7_ph = ph; S.f.b9_c7_key = k;
      ['b9_c7_orders', 'b9_c7_rearDone', 'b9_c7_darkDone', 'b9_c7_thallo2', 'b9_c7_news', 'b9_c7_slates', 'b9_c7_lowTried', 'b9_c7_regTried', 'b9_c7_cart', 'b9_c7_cusser2Tried', 'b9_c7_lockTried', 'b9_c7_stragTried', 'b9_c7_dogsTried'].forEach(f => { S.f[f] = fl ? 1 : undefined; });
      nodes.forEach(id => { let n; try { n = DLG[id](); } catch (e) { return; } const ch = n.ch || [];
        ch.forEach(c => { if (c.check) { if (c.trick) { tricks.add(id); return; } checks.add(id + ':' + tt(c)); if (!(c.near && c.near.t && typeof c.near.fx === 'function')) noNear.add(id + ':' + tt(c)); } });
        if (ch.some(c => c.onward)) { onwards.add(id); if (!ch.some(c => /^Not (now|yet)/.test(tt(c)))) noStay.add(id); } }); })));
    S.f = JSON.parse(keep); return {checks:checks.size, tricks:tricks.size, noNear:[...noNear], onwards:onwards.size, noStay:[...noStay]}; };
  const finale = async () => { const P = finPages(), pages = [];
    for (let i = 0; i < P.length; i++) { showFinale(i); await wait(20); const el = document.getElementById('fin'); const t = (el ? el.innerText : '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
      pages.push({k:P[i].k, id:P[i].id || '', head:(document.querySelector('.fin-k') || {}).textContent || '', h1:(document.querySelector('.fin-title') || {}).textContent || '', h2:(document.querySelector('.fin-who h2') || {}).textContent || '', h3:(document.querySelector('.fin-h') || {}).textContent || '', len:t.length, next:!!document.getElementById('fNext'), leak:/undefined|NaN|\[object |\$\{|\bnull\b/.test(t) || NEVER.test(t.replace(/The Malazan world[\s\S]*$/, '').replace(/Dust of Dreams/g, '')), t}); }
    return pages; };
  try {
  /* ================= a fresh start ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Fresh'); S.picksDue = []; save(); S.th.l.picksDue = []; startChapter(7); S.picksDue = []; save();
  out.f = {area:S.area, ch:S.chapter, thread:S.thread, lvl0:S.lvl, rat0:b9Rations(), march:S.f.b9_march7, squad:S.squad.join(','), renderErr:atPhases(), title:CHAPTERS[7].title, nodes:nodes.length, areas:CHAPTERS[7].areas.length, fights:Object.keys(CHAPTERS[7].battles).length,
    items:Object.keys(CHAPTERS[7].gear).every(k => !!ART['item/' + k] && /<svg/.test(ART['item/' + k]) && ART['item/' + k] !== ART['item/b9_c6_escortscale'] && ITEMS[k].role && !/\d/.test(ITEMS[k].line)), itemN:Object.keys(CHAPTERS[7].gear).length,
    cloak:ITEMS.b9_c7_rearguardcloak.slot === 'armour' && ITEMS.b9_c7_rearguardcloak.ac === 3, stick:ITEMS.b9_c7_rollstick.slot === 'trinket',
    scenes:['b9_dark', 'b9_retreat', 'b9_c7_late', 'b9_c7_camp', 'b9_c7_road'].every(k => typeof SCENEX[k] === 'function' && SCENES[k]), ground:typeof TILEX.b9_c7_field === 'function',
    fireRoster:(ROSTER_FIRES.dod[7] || []).includes('b9_c7_fire'), audit:audit(), read7:!!B9READ[7] && ['marrow', 'tallow', 'oldninth'].every(k => !!B9READ[7].say[k]) && B9READ[7].back === 'b9_c7_lull',
    finale:!!CHAPTERS[7].finale && typeof CHAPTERS[7].finale.fate === 'function', introOk:CHAPTERS[7].intro.paras.every(p => !leak.test(typeof p === 'function' ? p() : p))};
  /* every backdrop drawn at phone size in each phase and key (no page errors) */
  { const cv = document.createElement('canvas'); cv.width = 390; cv.height = 300; [1, 2, 3, 4].forEach(ph => ['adjunct', 'south', 'home'].forEach(k => [0, 1].forEach(d => { S.f.b9_c7_ph = ph; S.f.b9_c7_key = k; S.chapters[7] = k; S.f.b9_c7_rearDone = d || undefined;
      ['b9_dark', 'b9_retreat', 'b9_c7_late', 'b9_c7_camp', 'b9_c7_road'].forEach(s => SCENEX[s](cv, 1000 + ph*300)); }))); ['b9_c7_ph', 'b9_c7_key', 'b9_c7_rearDone'].forEach(k => { S.f[k] = undefined; }); delete S.chapters[7]; }
  /* the start, Thallo's orders (the signpost), the fire before the line */
  talk('b9_c7_start'); out.s = {ph:S.f.b9_c7_ph, thallo:has('b9_c7_start', /Thallo/), fireOpt:has('b9_c7_start', /brew-fire/)};
  talk('b9_c7_fire'); out.s.noLine = !has('b9_c7_fire', /Into the line/);
  talk('b9_c7_thallo'); out.s.orders = S.f.b9_c7_orders === 1; out.s.sign = /stays down/.test(DLG.b9_c7_thallo().txt); take('b9_c7_thallo', /Why the heavies/); out.s.html = /Rations/.test(DLG.b9_c7_thallo_more().html || '');
  talk('b9_c7_fire'); const fn = DLG.b9_c7_fire();
  out.fire1 = {html:/Rations/.test(fn.html || ''), rest:has('b9_c7_fire', /Eat, and sit/), talk:has('b9_c7_fire', /Talk with the squad/), wit:has('b9_c7_fire', /What are we standing here for/), line:has('b9_c7_fire', /Into the line/), notNow:has('b9_c7_fire', /^Not now/),
    lines:DLG.b9_c7_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length};
  take('b9_c7_fire', /Eat, and sit/); out.fire1.rested = !has('b9_c7_fire', /Eat, and sit/);
  ['b9_c7_captain', 'b9_c7_wreck', 'b9_c7_old1', 'b9_c7_back'].forEach(k => talk(k));
  /* the regulars: a check with a bruise for its "yes, but" */
  { const sn = JSON.stringify(S); near('b9_c7_regulars', /Stop the boy/, 'haddat'); out.reg = {near:((S.bruised || {}).haddat || 0) > 0 || ((S.bruised || {}).sgt || 0) > 0}; restore(sn, 'b9_c7_rear'); }
  made('b9_c7_regulars', /Stop the boy/, 'haddat'); out.reg.ok = S.f.b9_c7_regulars === 'ok';
  /* the surgeons' cart: rations:true; its "yes, but" is the chapter's one ration −1, once */
  { const c = vis('b9_c7_cart').find(x => x.check); out.cart = {rations:!!c.rations, notNow:has('b9_c7_cart', /Back to the stretch/)};
    const sn = JSON.stringify(S), r0 = b9Rations(); near('b9_c7_cart', /Carry him/, 'haddat'); out.cart.down = r0 - b9Rations(); out.cart.lost = S.f.b9_c7_lost === 1; restore(sn, 'b9_c7_rear'); }
  made('b9_c7_cart', /Carry him/, 'haddat'); out.cart.ok = S.f.b9_c7_cart === 'ok';
  /* the sappers' cusser */
  { const c0 = S.inv.cusser || 0; talk('b9_c7_sappers'); out.sap = {one:(S.inv.cusser || 0) - c0 === 1}; talk('b9_c7_sappers'); out.sap.once = (S.inv.cusser || 0) - c0 === 1;
    const sn = JSON.stringify(S), sh = S.inv.sharper || 0; near('b9_c7_sappers', /second one/, 'tangle'); out.sap.near = (S.inv.sharper || 0) === Math.max(0, sh - 1); restore(sn, 'b9_c7_rear'); }
  /* the Witness: three answers, Not now records nothing (from the same moment) */
  const snapW = JSON.stringify(S);
  talk('b9_c7_wit'); take('b9_c7_wit', /Not now/); out.wit = {notNow:!(S.b9.wit || {}).c7};
  for (const [re, v, w] of [[/Each other/, 'kept', 'each'], [/Our own witness/, 'kept', 'own'], [/they put here/, 'doubt', 'put']]) { restore(snapW, 'b9_c7_rear'); talk('b9_c7_wit'); take('b9_c7_wit', re); out.wit[w] = (S.b9.wit || {}).c7 === v && S.f.b9_c7_wit === w && has('b9_c7_wit_done', /mortal/) && has('b9_c7_wit_done', /Not now/); }
  restore(snapW, 'b9_c7_rear'); talk('b9_c7_wit'); take('b9_c7_wit', /Each other/);
  /* the line: signposted (every step into the mortal fight says so) */
  talk('b9_c7_line'); const ln = DLG.b9_c7_line();
  out.line = {sign:/Whoever falls here stays down/.test(ln.txt), tags:vis('b9_c7_line').filter(c => c.onward).every(c => c.tag === 'mortal' && /mortal fight/.test(tt(c))), notNow:has('b9_c7_line', /^Not now/), html:/Rations/.test(ln.html || ''),
    hold:vis('b9_c7_hold').filter(c => c.onward).every(c => c.tag === 'mortal' && /stays down/.test(tt(c))) && /stays down/.test(DLG.b9_c7_hold().txt), pre:/stays down/.test(BATTLES.b9_c7_rearguard.preText()), s2:/stays down/.test(BATTLES.b9_c7_rearguard.stage2.text())};
  { const sn = JSON.stringify(S); near('b9_c7_line', /Lock shields/, 'haddat'); out.line.near = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b9_c7_rear'); }
  made('b9_c7_line', /Lock shields/, 'haddat'); out.line.locked = S.f.b9_c7_locked === 1;
  /* the mortal fight: mortal, death checks off, the battle log says so; Mirrel falls in its second ground and stays down */
  const snapM = JSON.stringify(S);
  out.m = await force('b9_c7_rearguard', {surprise:'p'}, 'mirrel');
  out.m.dead = !!(S.dead.mirrel && S.dead.mirrel.ch === 7 && !S.dead.mirrel.from); out.m.gone = !S.squad.includes('mirrel'); out.m.named = /Mirrel did not get up/.test(DLG.b9_c7_rear_after().txt); out.m.fell = (S.f.lastFallen || []).join(',');
  take('b9_c7_rear_after', /The dark/); out.m.ph = S.f.b9_c7_ph; out.m.area = S.area; out.m.done = S.f.b9_c7_rearDone === 1; out.m.lull = S.node === 'b9_c7_lull';
  /* phase 2: the lull (the first halt after dark): the reading opens; the plain after dark */
  out.rd = {offered:has('b9_c7_lull', /Sit with/), notNow:has('b9_c7_lull', /^Not now/)};
  take('b9_c7_lull', /Sit with/); const rd = DLG.b9_c7_read(); const lay = rd.ch.find(c => /draw|lay them/.test(c.t)); runFx(lay);
  out.rd = Object.assign(out.rd, {drawn:S.f.b9_c7_drawn, reader:S.f.b9_c7_reader, inPool:B9POOL[7].includes(S.card), readNotNow:rd.ch.some(c => /Not now/.test(c.t)), cardNode:cardNodeName(), cardBack:DLG.b9_c7_card().ch[0].go, where:/after dark|burning wagon/.test(DLG.b9_c7_card().txt), again:!has('b9_c7_lull', /Sit with/)});
  talk('b9_c7_horse'); out.horse = {flag:S.f.b9_c7_horse === 1, far:/Very far off/.test(DLG.b9_c7_horse().txt)}; talk('b9_c7_burning'); out.horse.row = /Mirrel/.test(DLG.b9_c7_burning().txt);
  /* the trick: ✦ wits 19, no "yes, but" (the engine's rule), free; its battle half */
  talk('b9_c7_lull'); out.t = {offer:has('b9_c7_lull', /heavy of the next file|Brask/)}; take('b9_c7_lull', /heavy of the next file|Brask/);
  { const c = vis('b9_c7_low').find(x => x.check); out.t.dc = c.check[1]; out.t.stat = c.check[0]; out.t.trick = c.trick; out.t.noNear = !c.near; out.t.edgeT = (c.edges('tangle').find(e => e && /under a wall/.test(e[0])) || [])[1]; }
  made('b9_c7_low', /Learn it/, 'haddat'); out.t.ok = S.f.b9_c7_lowOk === 1 && !!S.tricks.b9_c7_low && S.tricks.b9_c7_low.who === 'haddat'; out.t.free = !!AB.t_b9_c7_low.free && /one free trick a turn/.test(TRICKS.b9_c7_low.fx); out.t.again = !has('b9_c7_lull', /heavy of the next file/);
  /* Thallo after dark, and into the dark: survive 5, not mortal, death checks run */
  talk('b9_c7_dark_line'); out.d = {gated:!has('b9_c7_dark_line', /Hold the dark/)}; talk('b9_c7_thallo2'); out.d.open = has('b9_c7_dark_line', /Hold the dark/) && has('b9_c7_dark_line', /^Not now/);
  out.d.fight = await force('b9_c7_dark', {});
  { startBattle('b9_c7_rearguard', {}); await wait(60); const u = B.units.find(x => x.id === 'haddat'); out.tb = {offered:trickOk(u, AB.t_b9_c7_low)}; B.busy = false; B.cur = u; AB.t_b9_c7_low.run(u); out.tb.steady = !!u.steady; B = null; view = 'scene'; S.scene = 'talk'; }
  talk('b9_c7_dark_after'); out.d.done = S.f.b9_c7_darkDone === 1; out.d.notYet = has('b9_c7_dark_after', /^Not yet/);
  take('b9_c7_dark_after', /Walk back/); out.d.walkNotYet = has('b9_c7_walk', /^Not yet/); const r3 = b9Rations(); take('b9_c7_walk', /The trail/); out.d.ph = S.f.b9_c7_ph; out.d.area = S.area;
  /* phase 3: the trail: no food; the news; stragglers; the cloak; the dogs */
  out.tr = {noFood:b9Rations() === r3 && /no food/.test(DLG.b9_c7_morning().txt)};
  talk('b9_c7_trail_on'); out.tr.gated = !has('b9_c7_trail_on', /Days after/);
  talk('b9_c7_runner'); const nw = DLG.b9_c7_runner().txt; out.tr.news = S.f.b9_c7_news === 1 && /The Fist is dead/.test(nw) && /High Mage is missing/.test(nw) && /captain went in alone/.test(nw) && /Adjunct was carried/.test(nw) && !/High Mage is dead|found him alive|Fist is missing/.test(nw);
  { const sn = JSON.stringify(S); near('b9_c7_stragglers', /on their feet/, 'haddat'); out.tr.stragNear = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b9_c7_trail'); }
  talk('b9_c7_qm'); out.tr.cloak = S.kit.includes('b9_c7_rearguardcloak');
  { const sn = JSON.stringify(S); near('b9_c7_dogs', /Shout them off/, 'haddat'); out.tr.dogsNear = ((S.bruised || {}).haddat || 0) > 0; restore(sn, 'b9_c7_trail'); }
  out.tr.dogsNotNow = has('b9_c7_dogs', /^Not now/); out.tr.dogs = await force('b9_c7_trail', {}); out.tr.dogsDone = S.f.b9_c7_dogsDone === 'fought';
  take('b9_c7_trail_on', /Days after/); out.tr.ph = S.f.b9_c7_ph; out.tr.area = S.area;
  /* phase 4: the camp: the column's pot +1, once */
  out.c = {up:b9Rations() - r3}; talk('b9_c7_camp_arrive'); out.c.once = b9Rations() - r3;
  ['b9_c7_pot', 'b9_c7_next', 'b9_c7_surgeons', 'b9_c7_old4'].forEach(k => talk(k)); out.c.other = /Letherii/.test(DLG.b9_c7_next().txt) && /pulled back in step|Held their stretch/.test(DLG.b9_c7_next().txt);
  talk('b9_c7_fire'); out.c.fire = {html:/Rations/.test(DLG.b9_c7_fire().html || ''), last:has('b9_c7_fire', /last of it/), gap:/Mirrel/.test(DLG.b9_c7_fire().txt), roll:has('b9_c7_fire', /roll into a stick/)};
  take('b9_c7_fire', /roll into a stick/); out.c.stick = S.kit.includes('b9_c7_rollstick') && /Mirrel, a line across/.test(DLG.b9_c7_roll().txt);
  talk('b9_c7_slates'); out.c.slates = S.f.b9_c7_slates === 1;
  /* the key, from the same moment, three ways; each to the end and through the finale */
  talk('b9_c7_key'); out.k = {three:['East', 'South', 'Time served|Home', 'Not yet'].every(w => has('b9_c7_key', new RegExp(w))), html:/Rations/.test(DLG.b9_c7_key().html || '')};
  const snapK = JSON.stringify(S); out.ends = {};
  for (const [re, v] of [[/first slate/, 'adjunct'], [/second slate/, 'south'], [/third slate/, 'home']]) { restore(snapK, 'b9_c7_camp'); take('b9_c7_key', re);
    const e = {key:S.f.b9_c7_key, again:!has('b9_c7_key', /first slate/), last:has('b9_c7_fire', /last of it/)}; talk('b9_c7_fire'); take('b9_c7_fire', /last of it/); e.notYet = has('b9_c7_end', /^Not yet/);
    take('b9_c7_end', /^Go/); await wait(80);
    Object.assign(e, {view, ch:S.chapters[7], done:bookDone(S), epi:!!document.getElementById('bEpi'), onward:b97Onward(S), onT:b97OnwardT(S), extras:CHAPTERS[7].extras().length, journal:CHAPTERS[7].journal().length, endText:(CHEND[7] || {})[v] && CHEND[7][v][0], lvl:S.lvl, rat:b9Rations()});
    const pages = await finale(); e.n = pages.length; e.kinds = pages.map(p => p.k + (p.id ? ':' + p.id : '')).join(' '); e.leaks = pages.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id + ':' + (p.t.match(NEVER) || [''])[0]);
    const third = S.squad.filter(id => id !== 'sgt'), L = S.th.l, lethWalk = (L.squad || []).filter(id => id !== 'sgt');
    e.thirdPages = third.every(id => pages.some(p => p.k === 'fate' && p.id === id && p.h3 && p.len > 120));
    e.lethPages = lethWalk.every(id => pages.some(p => p.k === 'b97leth' && p.id === id && p.len > 80));
    e.mirrel = (pages.find(p => p.k === 'gone' && p.id === 'mirrel') || {}); e.mirrel = {head:e.mirrel.head, h3:e.mirrel.h3, stretch:/cut bank/.test(e.mirrel.t || '')};
    e.sathi = /before this book/.test((pages.find(p => p.k === 'gone' && p.id === 'sathi') || {}).t || '');
    e.sgtT = /Third squad/.test((pages.find(p => p.k === 'fate' && p.id === 'sgt') || {}).t || ''); e.sgtL = (pages.find(p => p.k === 'b97leth' && p.id === 'sgt') || {}).head || '';
    e.lroad = (pages.find(p => p.k === 'b97road') || {}).h1 || ''; e.meet = /Into the Wastes/.test((pages.find(p => p.k === 'b97meet') || {}).h1 || '') && /never met/.test((pages.find(p => p.k === 'b97meet') || {}).t || '');
    const last = pages[pages.length - 1]; e.last = {erikson:/Steven Erikson/.test(last.t), esslemont:/Ian C\. Esslemont/.test(last.t), endline:/Dust on the Boots/.test(last.t), dead:/Mirrel/.test(last.t) && /Sathi/.test(last.t), both:/both squads/.test(last.t), coda:/The Sixth was there too/.test(last.t), rations:/Rations at the end/.test(last.t)};
    e.road = pages[0].h1; e.roadText = /Book Ten/.test(pages[0].t); e.order = pages.map(p => p.k).join(',');
    out.ends[v] = e; }
  /* the Witness colours the road: doubt says home plainly; kept does not */
  restore(snapK, 'b9_c7_camp'); S.b9.wit = {c3:'doubt', c5:'doubt', c7:'doubt'}; out.faith = {doubt:b9Faith('t') === 'doubt' && has('b9_c7_key', /Say it plainly/) && /says the word home/.test(DLG.b9_c7_key().txt) && has('b9_c7_key', /Because the column does/)};
  S.b9.wit = {c3:'kept', c5:'kept', c7:'kept'}; out.faith.kept = !has('b9_c7_key', /Say it plainly/) && has('b9_c7_key', /with the Adjunct/);
  { const h0 = S.loy.haddat || 0; take('b9_c7_key', /third slate/); out.faith.homeCost = (S.loy.haddat || 0) - h0; }
  /* the onward helper: home with the Sixth on home ends both roads; the Sixth on escort goes on */
  { const s = JSON.parse(JSON.stringify(S)); s.chapters[7] = 'home'; s.f.b9_lethRoad = 'home'; const a = b97Onward(s); s.f.b9_lethRoad = 'escort'; out.onw = {homeHome:!a, homeEscort:b97Onward(s) && b97OnwardL(s) && !b97OnwardT(s), notOther:!b97Onward(Object.assign({}, s, {book:'rg'}))}; }

  /* ================= a --from=7 style save: keys only, Brask walking, Tegra waiting, Doss and Wenna, the Third at 22; the Sixth on home ================= */
  setBook('dod'); S = newStateDOD('Hask', 'Syn'); S.picksDue = []; S.th.l.picksDue = []; save();
  Object.assign(S.f, {b9_c1_key:'street', b9_c1_street:1, b9_c3_key:'press', b9_c5_key:'keep', b9_c6_key:'train', b9_c6_trainHeld:1, b9_lethRoad:'home', b9_braskDone:1, b9_tegraDone:2});
  S.b9 = {wit:{c3:'kept', c5:'doubt'}};
  startChapter(7); S.picksDue = [];
  S.squad = ['sgt', 'haddat', 'tangle', 'marrow', 'brask', 'doss']; S.camp = ['tegra', 'wenna'];
  ['brask', 'doss', 'tegra', 'wenna'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); S.lvl = 22; S.xp = LEVELS[21];
  S.th.l.squad = ['sgt', 'tobet', 'thegg', 'ammet', 'brennet']; S.th.l.camp = ['kaedra']; S.th.l.dead = {perrit:{ch:7, where:'the river', from:'rg'}}; ['brennet', 'kaedra'].forEach(k => { S.th.l.loy[k] ??= 0; S.th.l.gear[k] ??= {}; }); save();
  out.y = {renderErr:atPhases(), audit:audit(), rat:b9Rations(), lines:DLG.b9_c7_fire_talk().txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length, brask:/Brask/.test(DLG.b9_c7_start().txt), teach:b97Teach() === 'brask' && /Brask/.test(DLG.b9_c7_low().txt), noHeavy:!AREAS.b9_c7_dark.npcs.find(n => n.id === 'heavy').show()};
  S.f.b9_c7_ph = 4; S.f.b9_c7_key = 'south'; out.y.next = /wagons came through/.test(DLG.b9_c7_next().txt); out.y.tegraKey = /I go where the Third goes/.test(DLG.b9_c7_key().txt) === false; // Tegra waits: no line at the key
  S.f.b9_c7_rearDone = 1; chapterEnd(7, 'south'); await wait(60); const yp = await finale();
  out.y.pages = yp.length; out.y.leaks = yp.filter(p => p.leak || p.len < 60).map(p => p.k + ':' + p.id);
  out.y.tegra = (yp.find(p => p.k === 'gone' && p.id === 'tegra') || {}).head || ''; out.y.wenna = (yp.find(p => p.k === 'gone' && p.id === 'wenna') || {}).head || '';
  out.y.brask = /Brask goes south/.test((yp.find(p => p.k === 'fate' && p.id === 'brask') || {}).t || '') && /stores|quarter where the dead stirred/.test((yp.find(p => p.k === 'fate' && p.id === 'brask') || {}).t || '');
  out.y.street = /quarter where the dead stirred/.test((yp.find(p => p.k === 'fate' && p.id === 'haddat') || {}).t || '') && /kept the column's pace/.test((yp.find(p => p.k === 'fate' && p.id === 'haddat') || {}).t || '') && /kept a dead sutler's cache/.test((yp.find(p => p.k === 'fate' && p.id === 'haddat') || {}).t || '');
  out.y.lroad = (yp.find(p => p.k === 'b97road') || {}).h1 || ''; out.y.lroadT = (yp.find(p => p.k === 'b97road') || {}).t || '';
  out.y.kaedra = (yp.find(p => p.k === 'b97leth' && p.id === 'kaedra') || {}).head || ''; out.y.perrit = (yp.find(p => p.k === 'b97leth' && p.id === 'perrit') || {}).head || '';
  out.y.brennet = /Brennet takes his own name home/.test((yp.find(p => p.k === 'b97leth' && p.id === 'brennet') || {}).t || '');
  out.y.onward = b97Onward(S) && b97OnwardT(S) && !b97OnwardL(S);
  save(); const back = loadSlot(S.sid); out.y.reload = !!back && back.book === 'dod' && back.chapters[7] === 'south' && back.th && back.th.l && back.th.l.squad.includes('brennet') && back.squad.includes('brask');
  } catch (e) { out.err = e.stack; }
  return out;
});
if (r.err) no('page script threw: ' + r.err);
const f = r.f || {}, s = r.s || {}, f1 = r.fire1 || {}, reg = r.reg || {}, cart = r.cart || {}, sap = r.sap || {}, wit = r.wit || {}, line = r.line || {}, m = r.m || {}, rd = r.rd || {}, horse = r.horse || {}, t = r.t || {}, tb = r.tb || {}, d = r.d || {}, tr = r.tr || {}, c = r.c || {}, k = r.k || {}, ends = r.ends || {}, faith = r.faith || {}, onw = r.onw || {}, y = r.y || {};
f.area === 'b9_c7_rear' && f.ch === 7 && f.thread === 't' && f.lvl0 === 19 && f.rat0 === 5 && f.march === 1 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && !f.renderErr.length && f.title === 'The Rearguard' && f.areas === 4 && f.fights === 3 && f.items && f.itemN === 2 && f.cloak && f.stick && f.scenes && f.ground && f.fireRoster && f.read7 && f.finale && f.introOk
  ? ok(`a fresh start opens Chapter Seven on the stretch: the Third at level 19, the march eats 1 (Rations 6 to 5); every b9_c7 node renders under every phase, key, faith and fallen (no never-name, no "!", no rounds or turns; ${f.nodes} nodes, ${f.areas} areas, ${f.fights} fights); two items with their own art; five backdrops; the ground; the roster fire; B9READ[7]`) : no('fresh ' + JSON.stringify(f).slice(0, 1400));
{ const au = f.audit || {}; au.checks >= 6 && au.tricks === 1 && !au.noNear.length && au.onwards >= 8 && !au.noStay.length ? ok(`every check carries its own "yes, but" (${au.checks}; the ✦ trick check none); every onward step has a "Not now" or "Not yet" beside it (${au.onwards} nodes)`) : no('audit ' + JSON.stringify(au).slice(0, 900)); }
s.ph === 1 && s.thallo && s.fireOpt && s.noLine && s.orders && s.sign && s.html && f1.html && f1.rest && f1.talk && f1.wit && f1.line && f1.notNow && f1.lines === f1.here && f1.rested
  ? ok(`Thallo's orders (hold till dark; "whoever goes down out there tonight stays down"); the brew-fire before the line: Rations shown, a rest, the talk (a line each, ${f1.lines}), the Witness, into the line with Not now beside it`) : no('start/fire ' + JSON.stringify({s, f1}));
reg.near && reg.ok && cart.rations && cart.down === 1 && cart.lost && cart.ok && sap.one && sap.once && sap.near ? ok('the regulars (a bruise for its "yes, but"); the surgeons\' cart (rations:true; its "yes, but" is the chapter\'s ration −1); the sappers\' cusser, once, and a second for a sharper') : no('phase 1 ' + JSON.stringify({reg, cart, sap}));
wit.notNow && wit.each && wit.own && wit.put ? ok('the Witness before the dark: each other, our own witness (kept), "they put us here" (doubt); Not now records nothing; each leads on to the mortal line') : no('witness ' + JSON.stringify(wit));
line.sign && line.tags && line.notNow && line.html && line.hold && line.pre && line.s2 && line.near && line.locked ? ok('the mortal fight is signposted before it starts: the line, every step into it ("a mortal fight: whoever falls here stays down"), the hold, the battle\'s preText and its second ground all say so; locking the shields (a crushed hand for its "yes, but")') : no('signpost ' + JSON.stringify(line));
m.started && m.mortal && !m.death && m.stage2 && m.inStage2 && m.mortal2 && !m.death2 && m.allies === 2 && m.foes === 4 && /stays down/.test(m.log) && m.dead && m.gone && m.named && m.fell === 'mirrel' && m.ph === 2 && m.area === 'b9_c7_dark' && m.done && m.lull
  ? ok('the rearguard is MORTAL: death checks off in both grounds (four short-tails, two heavies beside the Third; a heavy and two more at dusk); the battle says whoever falls stays down; Mirrel, downed in the second ground, is dead (S.dead, chapter 7), off the roll and named after; on into the dark') : no('mortal ' + JSON.stringify(m).slice(0, 1000));
rd.offered && rd.notNow && rd.drawn === 1 && rd.reader === 'marrow' && rd.inPool && rd.readNotNow && rd.cardNode === 'b9_c7_card' && rd.cardBack === 'b9_c7_lull' && rd.where && rd.again ? ok('the reading opens at the first halt after dark: Marrow draws from B9POOL[7] on the plain after dark, by a burning wagon; the card node is the visions pass\'s hook; back to the line; offered once') : no('reading ' + JSON.stringify(rd));
horse.flag && horse.far && horse.row ? ok('horsemen go into the dust very far off and fewer come back (never named); the fallen laid by the burning wagons, under cloaks') : no('horse ' + JSON.stringify(horse));
t.offer && t.dc === 19 && t.stat === 'wits' && t.trick === 'b9_c7_low' && t.noNear && t.edgeT === 1 && t.ok && t.free && t.again && tb.offered && tb.steady ? ok('the trick: Fight Them Low, a ✦ wits 19 check that names what the squad knows (a sapper goes under a wall…); free (one free trick a turn); in a fight the bearer drops low (steady)') : no('trick ' + JSON.stringify({t, tb}));
d.gated && d.open && d.fight && d.fight.started && d.fight.survive && !d.fight.mortal && d.fight.death && d.fight.allies === 1 && d.done && d.notYet && d.walkNotYet && d.ph === 3 && d.area === 'b9_c7_trail'
  ? ok('into the dark: Thallo first; survive 5, NOT mortal (death checks run), one heavy beside; the walk back in step (Not yet beside it); the trail at a grey morning') : no('dark ' + JSON.stringify(d).slice(0, 700));
tr.noFood && tr.gated && tr.news && tr.stragNear && tr.cloak && tr.dogsNear && tr.dogsNotNow && tr.dogs && tr.dogs.started && !tr.dogs.mortal && tr.dogsDone && tr.ph === 4 && tr.area === 'b9_c7_camp'
  ? ok('the retreat trail: nothing found (Rations unchanged); the news as headline (the Fist dead, the High Mage missing, a captain went in alone, the Adjunct carried); stragglers; the rearguard\'s cloak; the dogs, optional (fought, or driven off for a bite)') : no('trail ' + JSON.stringify(tr).slice(0, 700));
c.up === 1 && c.once === 1 && c.other && c.fire.html && c.fire.last === false && c.fire.gap && c.fire.roll && c.stick && c.slates && k.three && k.html ? ok('the camp days after: the column\'s pot +1, once; the Letherii\'s one line of news; the fire (the gap where Mirrel would be; the last of it waits for the key); the roll cut into a stick; three slates') : no('camp ' + JSON.stringify({c, k}));
const endOk = (v, title) => { const e = ends[v] || {}; return e.key === v && e.again && e.last && e.notYet && e.view === 'end' && e.ch === v && e.done && e.epi && e.extras >= 6 && e.journal >= 6 && e.endText === title && !e.leaks.length && e.thirdPages && e.lethPages && e.mirrel.head === 'The fallen' && e.mirrel.stretch && e.sathi && e.sgtT && e.sgtL === 'The Sixth\'s sergeant' && e.lroad === 'With the Commander' && e.meet && Object.values(e.last).every(Boolean); };
endOk('adjunct', 'East, with the army') && endOk('south', 'South, the long way round') && endOk('home', 'Time served') && ends.adjunct.onward && ends.adjunct.onT && ends.south.onT && !ends.home.onT && ends.home.onward && ends.adjunct.roadText && ends.south.roadText
  ? ok(`every road reaches the end and the finale (adjunct ${ends.adjunct.n} pages, south ${ends.south.n}, home ${ends.home.n}): a fate page for every soldier of the Third and of the Sixth, the fallen (Mirrel, tonight; Sathi, before), both sergeants, the Sixth's road, Where the books meet, the end page with the dead of both squads, Rations, and the credit to Steven Erikson and Ian C. Esslemont; level ${ends.adjunct.lvl}, Rations ${ends.adjunct.rat}`) : no('ends ' + JSON.stringify(ends).slice(0, 2400));
faith.doubt && faith.kept && faith.homeCost === -1 ? ok('the Witness colours the roads: a doubting Third says home plainly and goes east "because the column does"; a kept Third looks east, and home costs Haddat') : no('faith ' + JSON.stringify(faith));
onw.homeHome && onw.homeEscort && onw.notOther ? ok('the onward helper for Book Ten (b97Onward): the Third on adjunct or south, the Sixth on escort or adjunct; both home ends it; only a Book Nine save') : no('onward ' + JSON.stringify(onw));
y.renderErr && !y.renderErr.length && !y.audit.noNear.length && !y.audit.noStay.length && y.rat === 5 && y.lines === y.here && y.brask && y.teach && y.noHeavy && y.next && y.tegraKey && !y.leaks.length && y.tegra === 'Waiting' && y.wenna === 'Waiting' && y.brask && y.street && y.lroad === 'Home to Lether' && /no road onward from here for the Sixth/.test(y.lroadT) && y.kaedra === 'The Sixth · waiting' && y.perrit === 'The Sixth · the fallen' && y.brennet && y.onward && y.reload
  ? ok(`a --from=7 style save (keys only: street, press, keep, train; the Sixth home; Brask walking, Tegra and Wenna waiting; the Third at 22): every node renders, a line each at the fire (${y.lines}); Brask teaches the trick; the Letherii's wagons in the news; the finale (${y.pages} pages): the waiting, the Sixth's waiting and fallen-before, each soldier's own Book Nine; the save reloads`) : no('transfer ' + JSON.stringify(y).slice(0, 1600));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b9ch7: FAIL (${bad.length})` : 'b9ch7: all ok'); process.exit(bad.length ? 1 : 0);
