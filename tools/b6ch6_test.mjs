// Book Six, Chapter 6 (The Falling Sky, src/106_b6_ch6.js): the Fourth's last chapter. The night road and the first halt (the lights below
// the moon, the High Fist riding out ahead, never his gate); the Deck at the halt (Tuft reads; the Gate leans); the trick (The Fold
// Remembered: Tuft's way, and Ohl's without her) and its card-screen half (trickLeft/spendTrick('fold') count and spend it in Book Six);
// the night fight at the baggage (both grounds); the starstone; the day camp and the fire (rest, talk, news, the squad's own scenes, the
// roster, the way on, "Not now"); the last well (optional); Hanar Ara: the surrender seen from the line, the High Fist's eye on Ch4 'vote';
// the edge and its "yes, but" fever; the cult fight (feverRisk: someone catches it) and the cure (Ohl, or a carrier); the key both ways
// (letgo, report); the Fourth's road all three ways (highfist, hanarara, home) and the end; B6CH6.fates read from the Third's side (S.th.h);
// a --from=6 style save where every node renders in every phase, with and without Tuft and the recruits.
// Usage: node tools/b6ch6_test.mjs   (build first; exit 1 on a failure)
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
  const shut = () => { S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; };
  const made = (id, re, who, tier = 'clean') => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); S.node = id; runFx(c);
    settleRoll({who, stat:c.check[0], tier, ok:tier !== 'near', pass:true, margin:tier === 'near' ? -1 : 6, nat:tier === 'near' ? 10 : 18}, c); shut(); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  const edge = (c, id) => (c.edges(id).filter(Boolean).reduce((a, e) => a + e[1], 0));
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.mortal = !!B.def.mortal; res.fever = B.def.feverRisk || ''; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).map(u => u.kind).join(',');
    res.foeIds = [...new Set((BATTLES[id].foes || []).map(f => f[0]).concat(...(BATTLES[id].waves || []).map(w => w.foes.map(f => f[0]))))].join(',');
    const until = async (f, ms = 4000) => { const t0 = Date.now(); while (!f() && Date.now() - t0 < ms) await wait(30); return f(); };
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true); res.stage2 = await until(() => !!document.getElementById('bOn')); const on = document.getElementById('bOn'); if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2; }
    const b0 = B; B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; endBeat(true); await until(() => B !== b0 || S.node === BATTLES[id].after || !!(S.picksDue && S.picksDue.length));
    if (S.picksDue && S.picksDue.length) { shut(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b6_c6_/.test(k));
  const NEVER = /Felisin|Kulat|Laseen|Kellanved|Dancer|Ammanas|Bridgeburner|Bonehunter|Paran's gate|Mael|Noto|Hurlochel|Burn's Sleep|\b11\d\d\b/;
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); const all = n && (n.txt + (n.html || '') + n.ch.map(c => c.t).join(' '));
    if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (/undefined|NaN|\[object |\$\{|\bnull\b/.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (!n.ch.some(c => !c.req || c.req())) errs.push(k + ': no visible choice'); else if (NEVER.test(all)) errs.push(k + ': a hard-limit word ' + NEVER.exec(all)[0]); else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* a Book Six save at the start of Chapter 6: the Fourth at 15, the Third at 16, the earlier keys, Brannoc with the Fourth (Ressa optional) */
  const mk = (o = {}) => { setBook('bh'); S = newStateBH('Hask', 'Brann'); S.chapters = {};
    [1, 2, 3, 4, 5].forEach(i => { const v = o['k' + i] || B6KEYS[i][0]; S.f[`b6_c${i}_key`] = v; S.chapters[i] = v; });
    S.lvl = 16; S.xp = LEVELS[15]; S.th.h.lvl = 15; S.th.h.xp = LEVELS[14]; S.f.b6_soliel = 1; S.f.b6_mehetDone = 1; S.squad.push('mehet'); S.loy.mehet = 0;
    const h = S.th.h; if (o.brannoc !== false) { S.f.b6_brannocDone = 1; h.squad.push('brannoc'); h.loy.brannoc = 0; }
    if (o.ressa) { S.f.b6_ressaDone = 1; if (h.squad.length < 6) h.squad.push('ressa'); else h.camp = ['ressa']; h.loy.ressa = 0; } else { S.f.b6_ressaDone = 2; h.camp = ['ressa']; }
    if (o.noTuft) { h.squad = h.squad.filter(x => x !== 'tuft'); h.dead = Object.assign({}, h.dead, {tuft:{ch:4, where:'Before G\'danisban'}}); }
    [S, h].forEach(x => { [...x.squad, ...(x.camp || [])].forEach(k => { x.loy[k] ??= 0; x.gear[k] ??= {}; x.picks[k] ??= []; }); x.picksDue = []; });
    migrate(S); save(); startChapter(6); shut(); };
  const clone = () => JSON.parse(JSON.stringify(S));
  const restore = snap => { S = JSON.parse(JSON.stringify(snap)); setBook('bh'); b6Use('h'); };
  try {
  /* ================= a fresh Chapter Six, Ch4 'vote', Brannoc walking ================= */
  mk({k2:'pass', k4:'vote'});
  out.f = {thread:S.thread, area:S.area, ch:S.chapter, title:CHAPTERS[6].title, num:CHAPTERS[6].number, sgt:S.name, squad:S.squad.join(), brannoc:b6In('brannoc'), roster:(ROSTER_FIRES.bh || {})[6] ? ROSTER_FIRES.bh[6].join() : '', keys:B6KEYS[6].join(), renderErr:renderAll(),
    deck:B6DECK[6] && B6DECK[6].back === 'b6_c6_start' && B6DECK[6].scene === 'b6_sky' && ['tuft', 'sohra', 'benna'].every(k => B6DECK[6].say[k]), items:['b6_c6_starstone', 'b6_c6_hanararobe'].every(k => ITEMS[k] && ITEMS[k].line && ITEMS[k].role && ART['item/' + k])};
  talk('b6_c6_start'); const st = DLG.b6_c6_start();
  out.f.start = {ph:S.f.b6_c6_ph, again:typeof st.again === 'function', lights:/the first light comes down/.test(st.txt), deck:st.ch.some(c => c.deck && /Deck/.test(c.t) && (!c.req || c.req())), fold:has('b6_c6_start', /Tuft has the Deck out/), walk:has('b6_c6_start', /Walk the halted column/)};
  take('b6_c6_start', /Watch the lights/); const lt = DLG.b6_c6_lights().txt;
  out.f.lights = {flag:S.f.b6_c6_lights, twelve:/Twelve lights, in a curve below the moon/.test(lt), rode:/High Fist and a handful/.test(lt), noGate:!/gate/i.test(lt), back:has('b6_c6_lights', /Back to the halt/) && has('b6_c6_lights', /Not now/), gone:!has('b6_c6_start', /Watch the lights/)};
  /* the trick, Tuft's way, ✦ Wits 17 */
  talk('b6_c6_fold'); const tc = vis('b6_c6_fold').find(x => /Fold Remembered/.test(x.t)); out.f.trickCheck = tc.check.join(':') + ':' + tc.trick; out.f.trickEdge = edge(tc, 'tuft'); out.f.trickNotNow = has('b6_c6_fold', /Not now/);
  made('b6_c6_fold', /Show me/, 'tuft');
  { const t = S.tricks && S.tricks.b6_c6_fold; out.f.trick = {who:t && t.who, left:trickLeft('b6_c6_fold'), viaFold:trickLeft('fold'), ok:S.f.b6_c6_foldOk, by:S.f.b6_c6_foldBy, node:S.node, txt:/She's still in the hands/.test(DLG.b6_c6_fold_ok().txt), notSorcery:/Not sorcery/.test(TRICKS.b6_c6_fold.fx), use:TRICKS.b6_c6_fold.use};
    const n0 = trickLeft('b6_c6_fold'); spendTrick('fold'); out.f.trick.spent = n0 - trickLeft('b6_c6_fold'); t.left = trickN('b6_c6_fold'); out.f.trick.gone = !has('b6_c6_start', /Tuft has the Deck out/); }
  /* the Deck, read by Tuft at the halt */
  talk('b6_c6_start'); const dc = vis('b6_c6_start').find(c => c.deck); runFx(dc); talk(dc.go); const off = DLG.b6_c6_deck();
  out.f.offer = {sp:off.sp, scene:off.scene, say:/Tattersail read under a sky like this once/.test(off.txt), notNow:off.ch.some(c => /Not now/.test(c.t))};
  const draw = off.ch.find(c => /draw/.test(c.t)); runFx(draw); out.f.card = {drawn:S.f.b6_c6_drawn, reader:S.f.b6_c6_reader, card:S.card, inPool:B6POOL[6].includes(S.card), lean:B6POOL[6].filter(x => x === 'b3c_gate').length};
  talk('b6_c6_card'); const cd = DLG.b6_c6_card(); out.f.card.sp = cd.sp; out.f.card.back = cd.ch[0].go; out.f.card.gone = !vis('b6_c6_start').some(c => c.deck);
  /* the column: the captain, the road ahead, the Falari, the drovers */
  talk('b6_c6_captain'); out.f.captain = S.f.b6_c6_captain === 1 && /Halt holds/.test(DLG.b6_c6_captain().txt) && has('b6_c6_captain', /Back to the Fourth's stretch/) && has('b6_c6_captain', /Not now/);
  out.f.ahead = /Nobody past/.test(DLG.b6_c6_ahead().txt) && !/gate/i.test(DLG.b6_c6_ahead().txt);
  talk('b6_c6_falari'); out.f.falari = /Sweetcreek/.test(DLG.b6_c6_falari().txt) && /Brannoc is among them/.test(DLG.b6_c6_falari().txt);
  talk('b6_c6_drovers'); out.f.drovers = /Three nights/.test(DLG.b6_c6_drovers().txt) && has('b6_c6_drovers', /stand with you/);
  /* the night fight at the baggage */
  talk('b6_c6_tail'); out.f.tail = {check:vis('b6_c6_tail').find(x => /past the lamps/.test(x.t)).check.join(':'), shields:has('b6_c6_tail', /Shields/), notNow:has('b6_c6_tail', /Not now/)};
  out.f.night = await force('b6_c6_night'); out.f.night.done = S.f.b6_c6_nightDone; out.f.night.stone = S.kit.includes('b6_c6_starstone') && ITEMS.b6_c6_starstone.stat.wits === 1;
  out.f.night.afterTxt = /black stone/.test(DLG.b6_c6_night_after().txt) && /nobody in the ranks can say what he went out to do/.test(DLG.b6_c6_night_after().txt);
  talk('b6_c6_marked'); out.f.marked = /It opened/.test(DLG.b6_c6_marked().txt) && AREAS.b6_c6_road.npcs.find(n => n.id === 'marked').show();
  /* dawn, the day camp, the fire */
  out.f.night.wayOn = has('b6_c6_tail', /Dawn/) && has('b6_c6_ahead', /Dawn/) && has('b6_c6_drovers', /Dawn/); // a "Not now" after the fight never strands the squad on the road
  take('b6_c6_night_after', /Dawn/); out.f.dawn = {ph:S.f.b6_c6_ph, node:S.node};
  take('b6_c6_dawn', /fire/); out.f.camp = {area:S.area, node:S.node};
  const fy = DLG.b6_c6_fire(); out.f.fire = {again:typeof fy.again === 'function', html:/fever/.test(fy.html || ''), rest:has('b6_c6_fire', /rest/), talk:has('b6_c6_fire', /Talk with the squad/), news:has('b6_c6_fire', /Camp news/), roster:fy.ch.some(c => c.roster), march:has('b6_c6_fire', /night's march/), lamp:has('b6_c6_fire', /Ohl has a small lamp/), whistle:has('b6_c6_fire', /Brannoc wants/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t)};
  take('b6_c6_fire', /Let the squad rest/); out.f.rested = S.f.b6_c6_rest; out.f.restGone = !has('b6_c6_fire', /Let the squad rest/);
  const ft = DLG.b6_c6_fire_talk(); out.f.talk = {lines:ft.txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length};
  talk('b6_c6_news'); out.f.news = /Y'Ghatan/.test(DLG.b6_c6_news().txt) && S.f.b6_c6_news === 1;
  { const l0 = S.loy.ohl; talk('b6_c6_lamp'); out.f.lamp = {loy:S.loy.ohl - l0, txt:/Soliel/.test(DLG.b6_c6_lamp().txt)}; }
  talk('b6_c6_whistle'); out.f.whistle = S.f.b6_c6_whistle === 1 && /tin whistle/.test(DLG.b6_c6_whistle().txt);
  talk('b6_c6_canvas'); out.f.canvas = /Falari in its vowels/.test(DLG.b6_c6_canvas().txt);
  /* the last well (optional) */
  talk('b6_c6_wells_ask'); out.f.wellsAsk = S.f.b6_c6_wellsAsked === 1; out.f.wells = await force('b6_c6_wells'); out.f.wells.done = S.f.b6_c6_wellsDone;
  /* the march to Hanar Ara */
  talk('b6_c6_fire'); take('b6_c6_fire', /night's march/); take('b6_c6_tomarch', /Draw up/); out.f.hanar = {ph:S.f.b6_c6_ph, node:S.node};
  take('b6_c6_hanar_arrive', /Seventh's place/); out.f.line = {area:S.area, node:S.node, edgeShut:!has('b6_c6_edge', /Hold the picket/)};
  take('b6_c6_line', /Watch/); const sr = DLG.b6_c6_surrender().txt; out.f.surr = {flag:S.f.b6_c6_surr, eye:S.f.b6_c6_eye, letgo:/Let them go/.test(sr), stops:/stops on the Fourth/.test(sr), noMathokTalk:!/Mathok says/.test(sr)};
  talk('b6_c6_rebels'); out.f.rebels = /Go home, Malazan/.test(DLG.b6_c6_rebels().txt);
  talk('b6_c6_captain_hanar'); out.f.capHanar = /picket at the city's edge/.test(DLG.b6_c6_captain_hanar().txt);
  talk('b6_c6_keeper'); out.f.keeper = /We're the ones it left/.test(DLG.b6_c6_keeper().txt);
  /* the edge: the "yes, but" that can give the fever (on a snapshot), then the picket and the cult fight */
  const atEdge = clone();
  talk('b6_c6_edge'); const ec = vis('b6_c6_edge').find(x => /among the tents/.test(x.t)); out.f.edgeCheck = ec.check.join(':'); out.f.edgeRessa = edge(ec, 'ressa');
  { const f0 = b6FeverList().length; made('b6_c6_edge', /among the tents/, 'kettle', 'near'); out.f.nearFever = {caught:b6Fevered('kettle'), more:b6FeverList().length - f0, flag:S.f.b6_c6_nearFever, node:S.node}; }
  restore(atEdge);
  talk('b6_c6_edge'); take('b6_c6_edge', /Hold the picket/); out.f.dusk = S.node;
  { const f0 = (S.stats.b6Caught || 0); out.f.cult = await force('b6_c6_cult'); out.f.cult.done = S.f.b6_c6_cultDone; out.f.cult.robe = S.kit.includes('b6_c6_hanararobe') && ITEMS.b6_c6_hanararobe.ac === 1;
    out.f.cult.caught = (S.stats.b6Caught || 0) - f0; out.f.cult.fevered = b6FeverList().join(); }
  const ca = DLG.b6_c6_cult_after(); out.f.cureOffer = ca.ch.some(c => /Ohl sees to the fever/.test(c.t) && (!c.req || c.req())) && /fever/i.test(ca.html || '');
  { const c0 = S.stats.b6Cured || 0; take('b6_c6_cult_after', /Ohl sees to the fever/); out.f.cured = {left:b6FeverList().length, tally:(S.stats.b6Cured || 0) - c0, node:S.node}; }
  /* the key, both ways, from the same moment */
  const atKey = clone();
  talk('b6_c6_key'); const kn = DLG.b6_c6_key(); out.f.key = {txt:/surrender stands as he gave it/.test(kn.txt), letgo:has('b6_c6_key', /Let it stand/), report:has('b6_c6_key', /Write it down/), notYet:has('b6_c6_key', /Not yet/)};
  { const l0 = {ohl:S.loy.ohl, brisk:S.loy.brisk}; take('b6_c6_key', /Let it stand/); out.f.letgo = {key:S.f.b6_c6_key, node:S.node, ohl:S.loy.ohl - l0.ohl, brisk:S.loy.brisk - l0.brisk}; }
  take('b6_c6_letgo', /road from here/); const rd = DLG.b6_c6_roads(); out.f.roads = {ph:S.f.b6_c6_ph, three:['On with the Host', 'Hanar Ara road', 'Time served'].every(t => rd.ch.some(c => c.t.includes(t))), notYet:has('b6_c6_roads', /Not yet/)};
  const atRoads = clone();
  out.f.ends = {};
  for (const [re, road, node] of [[/On with the Host/, 'highfist', 'b6_c6_road_highfist'], [/Hanar Ara road/, 'hanarara', 'b6_c6_road_hanarara'], [/Time served/, 'home', 'b6_c6_road_home']]) {
    restore(atRoads); talk('b6_c6_roads'); take('b6_c6_roads', re); const e = {road:S.f.b6_fourthRoad, node:S.node, txt:DLG[node]().txt.length > 200};
    take(node, /On/); e.end = S.node === 'b6_c6_end'; e.endTxt = /you count the Fourth/i.test(DLG.b6_c6_end().txt);
    const ex = CHAPTERS[6].extras(), jn = CHAPTERS[6].journal(); e.extras = ex.length >= 4 && ex.some(x => x.includes('surrender')); e.journal = jn.length >= 3;
    take('b6_c6_end', /./); await wait(30); e.view = view; e.ch = S.chapters[6]; e.endCap = typeof CHAPTERS[6].endCap === 'function' ? CHAPTERS[6].endCap().length > 40 : false;
    /* the fate pages, from the Fourth's side and then from the Third's (Ch7's finale reads them with S.th.h) */
    const F = CHAPTERS[6].fates; const p1 = F.pages(); b6Use('r'); const p2 = F.pages(); const rp = F.roadPage();
    e.fates = {n:p1.length, same:JSON.stringify(p1) === JSON.stringify(p2), ids:p2.map(p => p.id).join(), allTxt:p2.every(p => p.title && p.txt && p.txt.length > 80 && !/undefined|NaN|\$\{/.test(p.txt)), sgtLast:p2[p2.length - 1].id === 'sgt',
      camp:p2.some(p => p.id === 'ressa' && p.label === 'With the company'), road:rp.title === {highfist:'With the High Fist', hanarara:'The Hanar Ara road', home:'Time served'}[road] && rp.paras.length >= 3, half:F.half() === S.th.h, roadKey:F.road() === road && F.key() === 'letgo'};
    out.f.ends[road] = e; }
  /* report: from the key's moment */
  restore(atKey); talk('b6_c6_key'); { const l0 = {ohl:S.loy.ohl, brisk:S.loy.brisk}; take('b6_c6_key', /Write it down/); out.f.report = {key:S.f.b6_c6_key, reported:S.f.b6_c6_reported, node:S.node, ohl:S.loy.ohl - l0.ohl, brisk:S.loy.brisk - l0.brisk, txt:/nothing will come of it/.test(DLG.b6_c6_report().txt)};
    take('b6_c6_report', /road from here/); take('b6_c6_roads', /Hanar Ara road/); out.f.report.hanar = /You named the cult/.test(DLG.b6_c6_road_hanarara().txt); take('b6_c6_road_hanarara', /On/); take('b6_c6_end', /./); await wait(30);
    out.f.report.view = view; out.f.report.ch = S.chapters[6]; out.f.report.sgtFate = /a line in the captain's hand/.test(CHAPTERS[6].fates.page('sgt').txt); }
  out.f.renderEnd = renderAll();

  /* ================= without Tuft (fallen before), no Brannoc, Ressa walking, Ch4 'out': Ohl's fold, Ressa's scenes ================= */
  mk({noTuft:true, brannoc:false, ressa:true, k4:'out', k2:'burn'});
  out.o = {squad:S.squad.join(), ressa:b6In('ressa'), tuft:b6In('tuft'), renderErr:renderAll(), ohlFold:has('b6_c6_start', /Ohl is watching the lights/), tuftFold:has('b6_c6_start', /Tuft has the Deck out/), reader:b6Rd().id};
  talk('b6_c6_fold'); const oc = vis('b6_c6_fold').find(x => /Ohl's way/.test(x.t)); out.o.check = oc && oc.check.join(':'); out.o.edge = oc && edge(oc, 'ohl');
  made('b6_c6_fold', /Ohl's way/, 'ohl'); out.o.trick = {who:S.tricks.b6_c6_fold && S.tricks.b6_c6_fold.who, by:S.f.b6_c6_foldBy, txt:/Twenty years late/.test(DLG.b6_c6_fold_ok().txt)};
  out.o.kindly = /Captain Kindly as was/.test(DLG.b6_c6_lights().txt);
  S.f.b6_c6_ph = 2; out.o.blue = has('b6_c6_fire', /Ressa is scrubbing/) && /dyer's blue/.test(DLG.b6_c6_blue().txt);
  S.f.b6_c6_ph = 3; S.f.b6_c6_surr = 1; out.o.burned = /burned a village like this/.test(DLG.b6_c6_edge().txt) || /burned on orders/.test(DLG.b6_c6_edge().txt);
  out.o.noEye = !/stops on the Fourth/.test((delete S.f.b6_c6_surr, DLG.b6_c6_surrender().txt));
  /* Ressa never catches it: the cult fight's fever goes to someone else */
  S.f.b6_c6_surr = 1; { const sv = clone(); await force('b6_c6_cult'); out.o.ressaClean = !b6Fevered('ressa') && b6FeverList().length === 1; restore(sv); }
  /* every phase renders */
  out.o.phases = [1, 2, 3, 4].map(ph => { S.f.b6_c6_ph = ph; return renderAll().join('; '); }).filter(Boolean);
  S.f.b6_c6_key = 'report'; S.f.b6_fourthRoad = 'home'; out.o.late = renderAll();
  /* a gotm-state render (lint renders Book Six nodes in Book One's state): nothing throws */
  setBook('gotm'); S = newState('Lint'); S.chapter = 6; migrate(S); out.o.gotm = renderAll();
  } catch (e) { out.err = e.stack || String(e); }
  return out;
});
if (r.err) no('threw: ' + r.err);
const f = r.f || {}, o = r.o || {};
f.thread === 'h' && f.area === 'b6_c6_road' && f.ch === 6 && f.title === 'The Falling Sky' && f.num === 'Six' && f.sgt === 'Brann' && /brisk,kettle,tuft,ohl/.test(f.squad) && f.brannoc && f.roster === 'b6_c6_fire' && f.keys === 'letgo,report' && f.deck && f.items && !(f.renderErr || []).length ? ok('Chapter Six registers for the Fourth (Sergeant Brann, Brannoc walking); the roster fire, B6DECK[6] for Tuft, Sohra and Benna, both items with art; every node renders') : no('setup ' + JSON.stringify(f).slice(0, 700));
const s0 = f.start || {}; s0.ph === 1 && s0.again && s0.lights && s0.deck && s0.fold && s0.walk ? ok('the first halt: the lights begin, the column stops; the Deck, the fold and the walk on offer') : no('start ' + JSON.stringify(s0));
const l = f.lights || {}; l.flag && l.twelve && l.rode && l.noGate && l.back && l.gone ? ok('the lights: twelve in a curve below the moon; the High Fist rides out with a handful; no gate') : no('lights ' + JSON.stringify(l));
const t = f.trick || {}; f.trickCheck === 'wits:17:tuft:b6_c6_fold' && f.trickEdge === 3 && f.trickNotNow && t.who === 'tuft' && t.left === 2 && t.viaFold >= 2 && t.ok && t.by === 'tuft' && t.txt && t.notSorcery && t.use === 'chapter' && t.spent === 1 && t.gone ? ok(`The Fold Remembered: ✦ Wits 17, Tuft +3; she carries it (${t.left} a chapter at level 15); trickLeft('fold') counts it and spendTrick('fold') spends it`) : no('trick ' + JSON.stringify([f.trickCheck, f.trickEdge, t]));
const c = f.card || {}, of = f.offer || {}; of.say && of.scene === 'b6_sky' && of.notNow && c.drawn === 1 && c.reader === 'tuft' && c.inPool && c.lean === 3 && c.sp === 'The Deck of Dragons' && c.back === 'b6_c6_start' && c.gone ? ok(`the Deck at the halt: Tuft reads on Brisk's shield (${c.card}; the Gate leans ×3; "Not now" offered)`) : no('deck ' + JSON.stringify([of, c]));
f.captain && f.ahead && f.falari && f.drovers ? ok('the halted column: the captain (halt holds), the heavies across the road ahead (no gate), Sweetcreek\'s Falari with Brannoc, the drovers') : no('column ' + JSON.stringify([f.captain, f.ahead, f.falari, f.drovers]));
const n = f.night || {}; f.tail && f.tail.check === 'guile:16' && f.tail.notNow && n.started && !n.mortal && n.stage2 && n.inStage2 && n.allies === 'b2soldier' && n.foeIds === 'b6_c6_raidchief,b6_bandit,b6_c6_banditbow,b6_cultist' && n.after === 'b6_c6_night_after' && n.done && n.stone && n.afterTxt && n.wayOn && f.marked ? ok('the night fight at the baggage (bandits, then the marked running for the lights past the lamps; a regular beside; not mortal); the black stone (+1 wits); the marked by the wagons') : no('night ' + JSON.stringify([f.tail, n, f.marked]));
const fi = f.fire || {}; f.dawn && f.dawn.ph === 2 && f.camp.area === 'b6_c6_camp' && f.camp.node === 'b6_c6_fire' && fi.again && fi.html && fi.rest && fi.talk && fi.news && fi.roster && fi.march && fi.lamp && fi.whistle && fi.notNow && f.rested && f.restGone && f.talk.lines === f.talk.here && f.news && f.lamp.loy === 1 && f.lamp.txt && f.whistle && f.canvas ? ok(`the day camp and the fire: rest, a line each (${f.talk.lines}), camp news (the Fourteenth as rumour), Ohl's lamp to Soliel, Brannoc's whistle, the roster, the way on, "Not now"; Sweetcreek and Bude through canvas`) : no('fire ' + JSON.stringify([f.dawn, f.camp, fi, f.rested, f.talk, f.news, f.lamp, f.whistle, f.canvas]));
const w = f.wells || {}; f.wellsAsk && w.started && w.allies === 'b2soldier' && w.done && w.after === 'b6_c6_wells_after' ? ok('the last well (optional): Sweetcreek\'s water party brought in') : no('wells ' + JSON.stringify(w));
const sr = f.surr || {}; f.hanar.ph === 3 && f.line.area === 'b6_c6_hanar' && f.line.edgeShut && sr.flag === 1 && sr.eye === 1 && sr.letgo && sr.stops && sr.noMathokTalk && f.rebels && f.capHanar && f.keeper ? ok('Hanar Ara: the surrender seen from the line, "Let them go"; on Ch4 \'vote\' the High Fist\'s eye stops on the Fourth; the rebels going, the captain, a shrine-keeper') : no('hanar ' + JSON.stringify([f.hanar, f.line, sr, f.rebels, f.capHanar, f.keeper]));
const nf = f.nearFever || {}; f.edgeCheck === 'guile:16' && f.edgeRessa === 3 && nf.caught && nf.more === 1 && nf.flag === 1 ? ok('the edge\'s "yes, but": whoever went in among the tents catches the fever (once a chapter)') : no('near fever ' + JSON.stringify([f.edgeCheck, f.edgeRessa, nf]));
const cu = f.cult || {}; f.dusk === 'b6_c6_dusk' && cu.started && cu.fever === 'the edge of Hanar Ara' && cu.stage2 && cu.inStage2 && cu.done && cu.robe && cu.caught === 1 && cu.fevered && f.cureOffer && f.cured.left === 0 && f.cured.tally === 1 && f.cured.node === 'b6_c6_cured' ? ok(`the cult at the city's edge (feverRisk; the outer shrines): ${cu.fevered} catches it; Ohl breaks it; the pilgrim's robe (+1 armour)`) : no('cult ' + JSON.stringify([f.dusk, cu, f.cureOffer, f.cured]));
const k = f.key || {}, lg = f.letgo || {}, rp = f.report || {}; k.txt && k.letgo && k.report && k.notYet && lg.key === 'letgo' && lg.node === 'b6_c6_letgo' && lg.ohl === 1 && lg.brisk === -1 && rp.key === 'report' && rp.reported === 1 && rp.ohl === -1 && rp.brisk === 1 && rp.txt && rp.hanar && rp.view === 'end' && rp.ch === 'report' && rp.sgtFate ? ok('the key both ways: letgo (Ohl +1, Brisk −1) and report (Brisk +1, Ohl −1; written, nothing comes of it; read on the Hanar Ara road and the sergeant\'s fate page)') : no('key ' + JSON.stringify([k, lg, rp]));
const E = f.ends || {}; f.roads && f.roads.ph === 4 && f.roads.three && f.roads.notYet && ['highfist', 'hanarara', 'home'].every(x => { const e = E[x] || {}; return e.road === x && e.txt && e.end && e.endTxt && e.extras && e.journal && e.view === 'end' && e.ch === 'letgo' && e.endCap && e.fates && e.fates.same && e.fates.allTxt && e.fates.sgtLast && e.fates.camp && e.fates.road && e.fates.half && e.fates.roadKey; })
  ? ok(`the Fourth's road all three ways (highfist, hanarara, home), each to the end; B6CH6.fates reads the same pages from the Third's side (${E.highfist.fates.ids})`) : no('roads ' + JSON.stringify([f.roads, E]).slice(0, 1500));
!(f.renderEnd || []).length ? ok('every node renders after the end') : no('render end ' + JSON.stringify(f.renderEnd));
!o.tuft && o.ressa && o.ohlFold && !o.tuftFold && o.reader === 'sohra' || o.reader === 'benna' ? 0 : 0;
!o.tuft && o.ressa && o.ohlFold && !o.tuftFold && o.check === 'wits:17:ohl' && o.edge === 2 && o.trick && o.trick.who === 'ohl' && o.trick.by === 'ohl' && o.trick.txt && o.kindly && o.blue && o.burned && o.noEye && o.ressaClean && !(o.renderErr || []).length && !o.phases.length && !(o.late || []).length && !(o.gotm || []).length
  ? ok(`without Tuft: Ohl's fold (✦ Wits 17, Ohl +2; reader ${o.reader}); Ch4 'out' (Captain Kindly as was; no eye); Ch2 'burn'; Ressa walks, scrubs the blue, never catches the fever; every node renders in every phase, and in Book One's state`) : no('no-Tuft ' + JSON.stringify(o).slice(0, 1200));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b6ch6: FAIL (${bad.length})` : 'b6ch6: all ok'); process.exit(bad.length ? 1 : 0);
