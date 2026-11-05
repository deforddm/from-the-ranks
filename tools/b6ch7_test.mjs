// Book Six, Chapter 7 (Malaz City, src/107_b6_ch7.js) and the end of Book Six: at sea (the first halt and the Deck on a hatch cover; the
// cook's sandbox fire: a rest, a line each, the fevered seen to; the ambush from the rail with Ch5's key as one line; Sepik; the Perish
// and Ottar's join, waiting when six walk; the Grey Helms' drill: the trick, ✦ Might 17, its battle half, and the shield); the cold
// realm and its wolves; the Jakatakan fleet; Malaz City's waterfront (the captain's orders, the Wickan families, the alley fight, the mob
// on the jetty and its stage2, the City Guard talked off or fought, the Hold as a silhouette, the dispatch-boat rumour); the horns and
// the key three ways (adjunct: Book Seven's import; jetty; wickans: the lanes, the streets fight and its stage2, the landward gate); the
// end screen; the finale for both squads (the Third's road and pages, the Fourth's road from S.f.b6_fourthRoad and pages from B6CH6.fates
// or the fallback, both sergeants, the fallen of each, the waiting recruits, Where the books meet, the end); and every node rendered in
// every phase with no leak, no hard-limit word and no exclamation mark in narration.
// Usage: node tools/b6ch7_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who, tier = 'clean') => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re} in [${vis(id).map(x => x.t).join(' | ')}]`); runFx(c); const pass = tier !== 'fail'; settleRoll({who, stat:c.check[0], tier, ok:tier !== 'near' && pass, pass, margin:pass ? 6 : -6, nat:pass ? 18 : 3}, c); shut(); const g = pass ? c.go : c.fail; if (typeof g === 'string') talk(g); else g(); return c; };
  const edge = (c, id) => (c.edges(id).filter(Boolean).reduce((a, e) => a + e[1], 0));
  const force = async (id) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.foes = B.units.filter(u => u.side === 'e').length; res.allies = B.units.filter(u => u.ally).length; res.waves = (B.def.waves || []).length;
    res.foeIds = [...new Set((BATTLES[id].foes || []).map(f => f[0]))].join(',');
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60); res.inStage2 = !!B && !!B.def.isStage2;
      res.foes2 = [...new Set((BATTLES[id].stage2.foes || []).map(f => f[0]))].join(','); }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); shut(); talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = () => Object.keys(DLG).filter(k => /^b6_c7_/.test(k));
  const NEVER = /Laseen|Kellanved|Dancer|Ammanas|Surly|Topper|the Talon|the Eel|T'orrud|Burn's Sleep|Smiley|Hanged Man|Deadhouse|Raven Hill|Admiral Bridge|Centre District|First Throne|Froth Wolf|Silanda|Mouse|T'amber|Run'Thurvian|Rynag|Cuttle|Koryk|crossbow-wielding/;
  const leak = /undefined|NaN|\[object |\$\{|\bnull\b/;
  const renderAll = () => { const errs = []; nodes().forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt + (n.html || ''))) errs.push(k + ': leaks'); else if (!Array.isArray(n.ch) || !n.ch.length) errs.push(k + ': no choices'); else if (n.ch.some(c => typeof c.t !== 'string')) errs.push(k + ': a choice without words'); else if (!n.ch.some(c => !c.req || c.req())) errs.push(k + ': no visible choice'); else if (NEVER.test(n.txt + n.ch.map(c => c.t).join(' '))) errs.push(k + ': a hard-limit word ' + NEVER.exec(n.txt + n.ch.map(c => c.t).join(' '))[0]); else if (/!/.test(n.txt.replace(/"[^"]*"/g, ''))) errs.push(k + ': an exclamation mark in narration'); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  const finale = async () => { const P = finPages(), pages = [];
    for (let i = 0; i < P.length; i++) { showFinale(i); await wait(20); const el = document.getElementById('fin'); const t = (el ? el.innerText : '').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
      pages.push({k:P[i].k, id:P[i].id || '', head:(document.querySelector('.fin-k') || {}).textContent || '', h3:(document.querySelector('.fin-h') || {}).textContent || '', len:t.length, next:!!document.getElementById('fNext'), leak:leak.test(t) || NEVER.test(t.replace(/The Malazan world/, '')), t}); }
    return pages; };
  /* a Chapter Seven state: earlier keys, both squads; o.room leaves a place for Ottar */
  const mk = (o) => { setBook('bh'); S = newStateBH('Hask', 'Brann'); S.lvl = 16; S.xp = LEVELS[15]; S.th.h.lvl = 15; S.th.h.xp = LEVELS[14]; S.chapter = 6;
    const k = {1:o.k1, 2:o.k2, 3:o.k3, 4:o.k4, 5:o.k5, 6:o.k6}; S.chapters = {}; for (let i = 1; i <= 6; i++) if (k[i]) { S.f[`b6_c${i}_key`] = k[i]; S.chapters[i] = k[i]; }
    if (o.road) S.f.b6_fourthRoad = o.road; if (o.bone) S.f.b6_bone = 1; S.f.b6_soliel = 1;
    if (!o.room) { S.f.b6_mehetDone = 1; S.squad.push('mehet'); S.loy.mehet = 0; S.gear.mehet = {}; S.picks.mehet = []; }
    S.f.b6_brannocDone = 1; S.th.h.squad.push('brannoc'); S.th.h.loy.brannoc = 0; S.th.h.gear.brannoc = {}; S.th.h.picks.brannoc = [];
    S.f.b6_ressaDone = 2; S.th.h.camp = ['ressa']; S.th.h.loy.ressa = 0; S.th.h.gear.ressa = {}; S.th.h.picks.ressa = [];
    (o.fall3 || []).forEach(id => { S.chapter = 3; kill(id); S.dead[id].where = 'The burning streets'; S.chapter = 6; });
    (o.fallH || []).forEach(id => { S.th.h.squad = S.th.h.squad.filter(x => x !== id); S.th.h.dead[id] = {ch:4, where:'Before G\'danisban'}; });
    S.picksDue = []; S.th.h.picksDue = []; migrate(S); save(); startChapter(7); };
  try {
  /* ================= A: bury / burn / line / vote / wait / letgo; the Fourth on the High Fist's road; Mehet walks, six walk (Ottar waits) ================= */
  mk({k1:'bury', k2:'burn', k3:'line', k4:'vote', k5:'wait', k6:'letgo', road:'highfist', bone:1});
  out.a = {area:S.area, ch:S.chapter, thread:S.thread, title:CHAPTERS[7].title, num:CHAPTERS[7].number, renderErr:renderAll(), roster:(ROSTER_FIRES.bh || {})[7] && ROSTER_FIRES.bh[7].join(), reg:!!CHAPTERS[7] && CHAPTERS[7] === B6CH7, keys:B6KEYS[7].join(), squad:S.squad.join(), nodes:nodes().length,
    intro:typeof CHAPTERS[7].intro.paras[2] === 'function' && /held its transport a day on the shore/.test(CHAPTERS[7].intro.paras[2]()), level:S.lvl};
  talk('b6_c7_start'); const st = DLG.b6_c7_start(); out.a.start = {ph:S.f.b6_c7_ph, again:typeof st.again === 'function', deck:has('b6_c7_start', /Deck/), fire:has('b6_c7_start', /sandbox/), walk:has('b6_c7_start', /Walk the deck/)};
  /* the reading on the hatch cover */
  take('b6_c7_start', /Deck/); const dk = DLG.b6_c7_deck(); out.a.deckNotNow = dk.ch.some(c => /Not now/.test(c.t)); runFx(dk.ch.find(c => /draw/.test(c.t)));
  out.a.deck = {drawn:S.f.b6_c7_drawn, reader:S.f.b6_c7_reader, card:S.card, inPool:B6POOL[7].includes(S.card), lean:B6POOL[7].filter(x => x === 'b4c_knightchains').length, say:/Cards at sea/.test(dk.txt), table:!!READTABLE['bh:7'], back:B6DECK[7].back};
  talk('b6_c7_card'); const cd = DLG.b6_c7_card(); out.a.card = {sp:cd.sp, back:cd.ch[0].go}; talk('b6_c7_deck_done');
  /* the fire: rest, talk, the fevered */
  b6Catch('tangle', 'the hold'); talk('b6_c7_fire'); const fy = DLG.b6_c7_fire();
  out.a.fire = {again:typeof fy.again === 'function' ? fy.again() : '', rest:has('b6_c7_fire', /rest/), talk:has('b6_c7_fire', /Talk with the squad/), fever:has('b6_c7_fire', /fevered/), on:has('b6_c7_fire', /^On\.$/), notNow:/Not now/.test(fy.ch[fy.ch.length - 1].t), html:/Fever: Tangle/.test(fy.html || ''), roster:fy.ch.some(c => /roster|Who walks/i.test(c.t + (c.tag || '')))};
  take('b6_c7_fire', /rest/); out.a.rested = S.f.b6_c7_restSea;
  const ft = DLG.b6_c7_fire_talk(); out.a.talk = {lines:ft.txt.split('\n\n').length, here:S.squad.filter(id => id !== 'sgt').length};
  take('b6_c7_fire', /fevered/); out.a.cured = !b6Fevered('tangle') && (S.stats || {}).b6Cured >= 1;
  /* the ambush, Sepik, the Perish */
  startExplore('b6_c7_transport'); talk('b6_c7_rail'); out.a.railFirst = has('b6_c7_rail', /north line/);
  take('b6_c7_rail', /north line/); const am = DLG.b6_c7_ambush().txt; out.a.ambush = {done:S.f.b6_c7_ambushDone, water:/sea to the north stands up/.test(am), earth:/a wall of earth rises/.test(am), wait:/on a boy's word/.test(am), sail:!/since the first day/.test(am)};
  take('b6_c7_ambush', /Breathe/); startExplore();
  talk('b6_c7_rail'); take('b6_c7_rail', /island/); out.a.sepik = {flag:S.f.b6_c7_sepik, txt:/nobody at all/.test(DLG.b6_c7_sepik().txt)};
  talk('b6_c7_drill'); out.a.drillEarly = !has('b6_c7_drill', /Grey Helms' Wall/);
  talk('b6_c7_rail'); take('b6_c7_rail', /grey ships/); out.a.perish = {ph:S.f.b6_c7_ph, nemil:/Nemil supply ships/.test(DLG.b6_c7_perish().txt), npc:AREAS.b6_c7_transport.npcs.find(n => n.id === 'ottar').show()};
  take('b6_c7_perish', /who has come aboard/); out.a.ottarTxt = /Our Destriant speaks to your Adjunct/.test(DLG.b6_c7_ottar().txt);
  take('b6_c7_ottar', /walk with the Third/); out.a.ottar = {done:S.f.b6_ottarDone, camp:(S.camp || []).includes('ottar'), squad:S.squad.includes('ottar'), node:S.node, waits:/wait with my own/.test(DLG.b6_c7_ottar_join().txt)};
  /* the trick: the Grey Helms' Wall, ✦ Might 17 */
  talk('b6_c7_drill'); const tc = vis('b6_c7_drill').find(c => /Grey Helms' Wall/.test(c.t)); out.a.trickCheck = tc.check.join(':') + ':' + tc.trick; out.a.trickEdges = ['ottar', 'haddat', 'darrut', 'mehet', 'tangle'].map(id => edge(tc, id)).join(',');
  made('b6_c7_drill', /Grey Helms' Wall/, 'haddat'); out.a.trick = {who:S.tricks && S.tricks.b6_c7_wall && S.tricks.b6_c7_wall.who, shield:S.kit.includes('b6_c7_greyhelmshield') && ITEMS.b6_c7_greyhelmshield.ac === 2 && ITEMS.b6_c7_greyhelmshield.role === 'shield', left:trickLeft('b6_c7_wall'), notSorcery:/Not sorcery/.test(TRICKS.b6_c7_wall.fx), gone:!has('b6_c7_drill', /Grey Helms' Wall/)};
  { startBattle('b6_c7_jetty', {}); await wait(60); const u = B.units.find(x => x.side === 'p' && x.id === 'haddat'); const f = B.units.find(x => x.side === 'e');
    out.a.tb = {offered:abOk(u, 't_b6_c7_wall'), aoe:AB.t_b6_c7_wall.aoe === 1}; const hp0 = f.hp; AB.t_b6_c7_wall.run(u, f.x, f.y); await wait(400); out.a.tb.hit = f.hp < hp0 && f.dazzleUntil != null; B = null; startExplore('b6_c7_transport'); }
  /* the realm, the wolves, the Jakatakan fleet, Malaz */
  talk('b6_c7_bow'); take('b6_c7_bow', /Hold on/); out.a.realm = {ph:S.f.b6_c7_ph, node:S.node};
  take('b6_c7_realm', /below the rail/); out.a.realm.area = S.area;
  talk('b6_c7_wolves'); out.a.wolves = {heard:S.f.b6_c7_wolvesHeard, ottar:!/Ottar has gone down/.test(DLG.b6_c7_wolves().txt)};
  take('b6_c7_wolves', /Hold on/); out.a.jak = /Jakatakan/.test(DLG.b6_c7_jakatakan().txt);
  take('b6_c7_jakatakan', /Malaz City/); out.a.landfall = {ph:S.f.b6_c7_ph, hold:/Mock's Hold, dark against the sky/.test(DLG.b6_c7_landfall().txt)};
  take('b6_c7_landfall', /Down the plank/); out.a.jetty = {area:S.area, node:S.node, wickans:/turned on its Wickans/.test(DLG.b6_c7_jetty_start().txt)};
  talk('b6_c7_mob'); out.a.mobEarly = !has('b6_c7_mob', /Shields/);
  talk('b6_c7_orders'); out.a.orders = S.f.b6_c7_orders === 1 && /jetty's foot/.test(DLG.b6_c7_orders().txt);
  talk('b6_c7_wickans_fam'); out.a.fam = S.f.b6_c7_famMet === 1 && AREAS.b6_c7_jetty.npcs.find(n => n.id === 'grandmother').show();
  talk('b6_c7_news'); out.a.news = /Onearm's dead/.test(DLG.b6_c7_news().txt) && /north-east after something in the sky/.test(DLG.b6_c7_news().txt);
  talk('b6_c7_holdview'); out.a.hold = /Aragan/.test(DLG.b6_c7_holdview().txt) && /The Hold is not for the likes of the 9th/.test(DLG.b6_c7_holdview().txt);
  /* the alley (optional) and the mob (main) */
  talk('b6_c7_alley'); out.a.alleyCheck = vis('b6_c7_alley').find(c => /prisoner/.test(c.t)).check.join(':');
  out.a.alley = await force('b6_c7_alley'); out.a.alley.done = S.f.b6_c7_alleyDone;
  startExplore('b6_c7_jetty'); talk('b6_c7_mob'); out.a.brace = vis('b6_c7_mob').find(c => /harbour carts/.test(c.t)).check.join(':');
  { const xp0 = S.xp; out.a.mob = await force('b6_c7_jetty'); out.a.mob.done = S.f.b6_c7_mobDone; out.a.mob.xp = S.xp - xp0; const ja = DLG.b6_c7_jetty_after().txt; out.a.mob.shouts = /a Fist's voice/.test(ja) && /We're the Adjunct's/.test(ja); out.a.mob.cussers = /Cussers/.test(ja) && /On ballista bolts/.test(ja); }
  startExplore('b6_c7_jetty'); out.a.guardNpc = AREAS.b6_c7_jetty.npcs.find(n => n.id === 'guard').show();
  talk('b6_c7_grandmother'); out.a.cloak = S.kit.includes('b6_c7_malazcloak') && ITEMS.b6_c7_malazcloak.ac === 1;
  /* the Guard: read the order (talked), or fight (from a copy) */
  const snapG = JSON.stringify(S);
  talk('b6_c7_guard_come'); const gc = vis('b6_c7_guard_come').find(c => /read it out/.test(c.t)); out.a.guardCheck = gc.check.join(':'); out.a.guardSgt = edge(gc, 'sgt');
  made('b6_c7_guard_come', /read it out/, 'sgt'); out.a.guardDone = S.f.b6_c7_guardDone;
  { const sv = S; S = JSON.parse(snapG); save(); const xp0 = S.xp; out.a.guardFight = await force('b6_c7_guard'); out.a.guardFight.done = S.f.b6_c7_guardDone; out.a.guardFight.xp = S.xp - xp0; out.a.lvlAfter = S.lvl; S = sv; save(); startExplore('b6_c7_jetty'); }
  /* the horns, the roads */
  out.a.captainNode = AREAS.b6_c7_jetty.npcs.find(n => n.id === 'captain').node();
  talk('b6_c7_signal'); out.a.signal = {flag:S.f.b6_c7_signal, ph:S.f.b6_c7_ph, txt:/the horns go/.test(DLG.b6_c7_signal().txt)};
  take('b6_c7_signal', /The roads/); const rd = DLG.b6_c7_roads(); out.a.roads = {three:['with the Adjunct', 'left on the jetty', 'with the Wickans'].every(w => rd.ch.some(c => c.t.includes(w))), notYet:has('b6_c7_roads', /Not yet/), mehet:/I stayed once/.test(rd.txt), haddat:/Water-sellers' rule/.test(rd.txt)};
  const snapK = JSON.stringify(S); out.roads = {};
  for (const [k, re] of [['adjunct', /with the Adjunct/], ['jetty', /left on the jetty/], ['wickans', /with the Wickans/]]) {
    S = JSON.parse(snapK); save(); startExplore('b6_c7_jetty'); const R = {};
    take('b6_c7_roads', re); R.key = S.f.b6_c7_key; R.node = S.node;
    if (k === 'wickans') { take('b6_c7_wickans_road', /Up the lane/); R.area = S.area; R.lastEarly = /still up the lane/.test(DLG.b6_c7_last().txt); talk('b6_c7_house'); R.roofCheck = vis('b6_c7_house').find(c => /roofs/.test(c.t)).check.join(':');
      R.streets = await force('b6_c7_streets'); R.streets.done = S.f.b6_c7_streetsDone; take('b6_c7_streets_after', /Out of the gate/); R.gate = S.f.b6_c7_gone === 1; take('b6_c7_gate', /The last of it/); }
    else take(k === 'adjunct' ? 'b6_c7_adjunct' : 'b6_c7_jetty_road', /The last of it/);
    R.lastNotYet = has('b6_c7_last', /Not yet/); take('b6_c7_last', /Go\./); await wait(40);
    R.end = {view, ch:S.chapters[7], epi:!!document.getElementById('bEpi'), done:bookDone(S), onward:b67Onward(S), extras:CHAPTERS[7].extras(), journal:CHAPTERS[7].journal().length, thread:S.thread};
    const pages = await finale(); R.pages = pages.length; R.kinds = pages.map(p => p.k + (p.id ? ':' + p.id : '')).join(' ');
    R.leaks = pages.filter(p => p.leak || p.len < 80).map(p => p.k + ':' + p.id);
    R.road = pages[0] && pages[0].t; R.thread = S.thread; R.name = S.name;
    const f4 = pages.filter(p => p.k === 'b67fate4'); R.fourth = f4.map(p => p.id).join(',');
    R.r4 = pages.find(p => p.k === 'b67road4'); R.r4 = R.r4 && {head:R.r4.head, high:/High Fist's Host/.test(R.r4.t), burn:/burned a plague village/.test(R.r4.t), vote:/stood for the High Fist/.test(R.r4.t), letgo:/let the surrender stand/.test(R.r4.t), never:/never met the Third/.test(R.r4.t)};
    R.sgt4 = (pages.find(p => p.k === 'b67fate4' && p.id === 'sgt') || {}); R.sgt4 = {name:/Brann/.test(R.sgt4.t || ''), role:/Fourth Squad, Seventh Company/.test(R.sgt4.t || ''), head:R.sgt4.head};
    R.ressa = (pages.find(p => p.k === 'b67gone4' && p.id === 'ressa') || {}).head || '';
    R.meet = pages.find(p => p.k === 'b67meet'); R.meet = R.meet && /Where the books meet/.test(R.meet.head) && /Lether/.test(R.meet.t) && /never met/.test(R.meet.t);
    R.order = pages.map(p => p.k).join(',');
    const sg = pages.find(p => p.k === 'fate' && p.id === 'sgt'), last = pages[pages.length - 1];
    R.sgt = sg && /Third squad, 9th Legion, the Fourteenth/.test(sg.t) && /put the old dead back/.test(sg.t) && /held the gate/.test(sg.t) && /finger bone/.test(sg.t);
    R.endPage = {endline:/The End of Bones in the Walls/.test(last.t), credit:/Steven Erikson/.test(last.t) && /Ian C\. Esslemont/.test(last.t), lastNoNext:!last.next, fire:/seven hundred and ninety-one/.test(last.t)};
    R.onwardLine = k === 'adjunct' ? /Book Seven/.test(pages[0].t) : /no road onward/i.test(pages[0].t);
    out.roads[k] = R; }
  } catch (e) { out.err = e.stack; }
  try {
  /* ================= B: leave / pass / in / out / sail / report; the Fourth home; room for Ottar; Mirrel fell in the fire; Kettle fell before G'danisban; a mock B6CH6.fates ================= */
  mk({k1:'leave', k2:'pass', k3:'in', k4:'out', k5:'sail', k6:'report', road:'home', room:1, fall3:['mirrel'], fallH:['kettle']});
  out.b = {renderErr:renderAll(), intro:/Mirrel is in the barrow outside Y'Ghatan/.test(CHAPTERS[7].intro.paras[2]()) && /since the first day of the loading/.test(CHAPTERS[7].intro.paras[2]())};
  talk('b6_c7_ambush'); out.b.sail = /aboard since the first day/.test(DLG.b6_c7_ambush().txt);
  S.f.b6_c7_ambushDone = 1; S.f.b6_c7_sepik = 1; talk('b6_c7_perish'); take('b6_c7_perish', /who has come aboard/); take('b6_c7_ottar', /walk with the Third/); out.b.ottar = {squad:S.squad.includes('ottar'), done:S.f.b6_ottarDone, txt:/Teach me/.test(DLG.b6_c7_ottar_join().txt)};
  talk('b6_c7_captain'); out.b.captain = /Mirrel/.test(DLG.b6_c7_captain().txt);
  /* the mock: only when Chapter 6 is absent from this build */
  out.b.mocked = typeof B6CH6 === 'undefined'; if (out.b.mocked) globalThis.B6CH6 = {fates:{brisk:'MOCK-STRING Brisk stands in front of things, on the road home, as she always has, and the Fourth is glad of it.', tuft:(id, road) => `MOCK-FN ${id} ${road} ${b6In('tuft') ? 'in' : 'out'} ${S.name}: Tuft reads the Deck on the boat home, and two cards refuse her.`, sgt:() => `MOCK-SGT ${S.name} took the Fourth home out of the plague year, and counted it on the quay.`, ohl:() => { throw new Error('boom'); }}};
  Object.assign(S.f, {b6_c7_ph:5, b6_c7_ambushDone:1, b6_c7_sepik:1, b6_c7_perish:1, b6_c7_ottarMet:1, b6_c7_realm:1, b6_c7_mobDone:1, b6_c7_guardDone:'fought', b6_c7_signal:1}); startExplore('b6_c7_jetty');
  take('b6_c7_roads', /with the Adjunct/); take('b6_c7_adjunct', /The last of it/); take('b6_c7_last', /Go\./); await wait(40);
  const pages = await finale(); out.b.pages = pages.length; out.b.kinds = pages.map(p => p.k + (p.id ? ':' + p.id : '')).join(' '); out.b.leaks = pages.filter(p => p.leak || p.len < 80).map(p => p.k + ':' + p.id);
  const mir = pages.find(p => p.id === 'mirrel'); out.b.mirrel = mir && {k:mir.k, head:mir.head, fire:/burning streets, holding Sinn's way open/.test(mir.t), barrow:/beside the old barrows the rebels opened/.test(mir.t)};
  const ket = pages.find(p => p.k === 'b67gone4' && p.id === 'kettle'); out.b.kettle = ket && {head:ket.head, fell:/fell in the plague year/.test(ket.t)};
  const bri = pages.find(p => p.k === 'b67fate4' && p.id === 'brisk'), tuf = pages.find(p => p.k === 'b67fate4' && p.id === 'tuft'), oh = pages.find(p => p.k === 'b67fate4' && p.id === 'ohl'), s4 = pages.find(p => p.k === 'b67fate4' && p.id === 'sgt');
  out.b.fates = out.b.mocked ? {brisk:/MOCK-STRING/.test(bri.t), tuft:/MOCK-FN tuft home in Brann/.test(tuf.t), sgt:/MOCK-SGT Brann/.test(s4.t), ohlFallback:/went home with the Fourth/.test(oh.t)} : {brisk:bri.len > 80, tuft:tuf.len > 80, sgt:s4.len > 80, ohlFallback:oh.len > 80};
  out.b.road4 = (pages.find(p => p.k === 'b67road4') || {}).t || ''; out.b.road4 = {home:/The Fourth went home/.test(out.b.road4), pass:/left a family its roofs/.test(out.b.road4), out:/stayed out of the vote/.test(out.b.road4), report:/named the city's cult/.test(out.b.road4), title:/The road home/.test(out.b.road4)};
  out.b.after = {thread:S.thread, name:S.name, squadHasMirrel:S.squad.includes('mirrel'), th:!!(S.th && S.th.h), hName:S.th && S.th.h && S.th.h.name};
  out.b.endDead = /Mirrel/.test(pages[pages.length - 1].t) && /Kettle did not come through the plague year/.test(pages[pages.length - 1].t);
  if (out.b.mocked) delete globalThis.B6CH6;
  } catch (e) { out.err2 = e.stack; }
  try {
  /* ================= C: a --from=7 style save: every node renders in every phase and step, on every road ================= */
  mk({road:'hanarara'}); const errs = [];
  const states = [{ph:1}, {ph:1, b6_c7_ambushDone:1}, {ph:2, b6_c7_ambushDone:1, b6_c7_sepik:1, b6_c7_perish:1}, {ph:2, b6_c7_ambushDone:1, b6_c7_sepik:1, b6_c7_perish:1, b6_c7_ottarMet:1, b6_c7_drillTried:1}, {ph:3, b6_c7_ottarMet:1, b6_c7_realm:1},
    {ph:4, b6_c7_ashore:1}, {ph:4, b6_c7_orders:1, b6_c7_mobDone:1}, {ph:4, b6_c7_orders:1, b6_c7_mobDone:1, b6_c7_guardDone:'talked'}, {ph:5, b6_c7_mobDone:1, b6_c7_guardDone:1, b6_c7_signal:1},
    {ph:5, b6_c7_mobDone:1, b6_c7_guardDone:1, b6_c7_signal:1, b6_c7_key:'adjunct'}, {ph:5, b6_c7_mobDone:1, b6_c7_guardDone:1, b6_c7_signal:1, b6_c7_key:'jetty'}, {ph:5, b6_c7_mobDone:1, b6_c7_guardDone:1, b6_c7_signal:1, b6_c7_key:'wickans', b6_c7_inLanes:1},
    {ph:5, b6_c7_mobDone:1, b6_c7_guardDone:1, b6_c7_signal:1, b6_c7_key:'wickans', b6_c7_inLanes:1, b6_c7_streetsDone:1, b6_c7_gone:1}];
  for (const st of states) { const sv = JSON.stringify(S); Object.assign(S.f, st, {b6_c7_ph:st.ph}); errs.push(...renderAll().map(e => `${JSON.stringify(st).slice(0, 60)} ${e}`)); S = JSON.parse(sv); }
  out.c = {renderErr:errs};
  out.c.next = [[1, {}], [1, {b6_c7_ambushDone:1}], [2, {}], [2, {b6_c7_ottarMet:1}], [3, {}], [4, {}], [4, {b6_c7_mobDone:1}], [4, {b6_c7_mobDone:1, b6_c7_guardDone:1}], [5, {}], [5, {b6_c7_key:'wickans'}], [5, {b6_c7_key:'jetty'}]].map(([p, f]) => { const sv = JSON.stringify(S.f); S.f.b6_c7_ph = p; Object.assign(S.f, f); const n = b67Next(); S.f = JSON.parse(sv); return n; }).join(',');
  out.c.news = /city of the plague-marked/.test((S.f.b6_fourthRoad = 'hanarara', DLG.b6_c7_news().txt));
  out.c.gloss = GLOSSX.bh.filter(g => /Grey Helms|Mock's Hold|Sepik/.test(g[1])).length;
  } catch (e) { out.err3 = e.stack; }
  return out;
});
if (r.err) no('page script threw (A): ' + r.err);
if (r.err2) no('page script threw (B): ' + r.err2);
if (r.err3) no('page script threw (C): ' + r.err3);
const a = r.a || {}, b = r.b || {}, c = r.c || {};
if (a.area) {
  a.area === 'b6_c7_transport' && a.ch === 7 && a.thread === 'r' && a.title === 'Malaz City' && a.num === 'Seven' && !a.renderErr.length && a.roster === 'b6_c7_fire' && a.reg && a.keys === 'adjunct,jetty,wickans' && a.intro && a.nodes >= 60 && a.squad.includes('mehet') ? ok(`a fresh Chapter Seven opens on the transport's deck with the Third (Mehet walking, level ${a.level}); registered; a roster fire; every one of ${a.nodes} b6_c7 nodes renders with a visible choice, no hard-limit word, no exclamation in narration`) : no('fresh ' + JSON.stringify(a).slice(0, 900));
  const s = a.start || {}; s.ph === 1 && s.again && s.deck && s.fire && s.walk ? ok('the first halt: the Deck among its choices, the sandbox, and the deck') : no('start ' + JSON.stringify(s));
  const d = a.deck || {}; a.deckNotNow && d.drawn === 1 && d.reader === 'marrow' && d.inPool && d.lean === 3 && d.say && d.table && d.back === 'b6_c7_deck_done' && a.card.sp === 'The Deck of Dragons' && a.card.back === 'b6_c7_deck_done' ? ok(`the reading on a hatch cover (Marrow draws ${d.card}; the Knight of Chains leans ×3; "Not now" offered)`) : no('deck ' + JSON.stringify([d, a.card, a.deckNotNow]));
  const f = a.fire || {}; f.again && f.rest && f.talk && f.fever && f.on && f.notNow && f.html && f.roster && a.rested === 1 && a.talk.lines === a.talk.here && a.cured ? ok('the cook\'s sandbox: again, a rest, a line each, the roster, the fevered seen to (Tangle, by Marrow), On and Not now') : no('fire ' + JSON.stringify([f, a.rested, a.talk, a.cured]));
  const am = a.ambush || {}; a.railFirst && am.done === 1 && am.water && am.earth && am.wait && am.sail && a.sepik.flag === 1 && a.sepik.txt && a.drillEarly ? ok('the ambush from the rail (the wall of water, the wall of earth; Ch5 \'wait\' as one line); Sepik, wrecked and empty') : no('ambush ' + JSON.stringify([a.railFirst, am, a.sepik, a.drillEarly]));
  const ot = a.ottar || {}; a.perish.ph === 2 && a.perish.nemil && a.perish.npc && a.ottarTxt && ot.done === 2 && ot.camp && !ot.squad && ot.waits ? ok('the Perish come alongside (the Nemil run for home); Ottar sent across, and waits with the Grey Helms when six walk') : no('ottar ' + JSON.stringify([a.perish, a.ottarTxt, ot]));
  const tr = a.trick || {}, tb = a.tb || {}; a.trickCheck === 'might:17:b6_c7_wall' && a.trickEdges === '3,2,2,-2,-1' && tr.who === 'haddat' && tr.shield && tr.left >= 2 && tr.notSorcery && tr.gone && tb.offered && tb.aoe && tb.hit ? ok('the trick: the Grey Helms\' Wall (✦ Might 17; Ottar +3, Haddat +2, Darrut +2, Mehet −2, Tangle −1), the tall shield (+2 armour); in a fight a 3×3 that hurts and leaves them reeling') : no('trick ' + JSON.stringify([a.trickCheck, a.trickEdges, tr, tb]));
  a.realm.ph === 3 && a.realm.area === 'b6_c7_cold' && a.wolves.heard === 1 && a.jak && a.landfall.ph === 4 && a.landfall.hold && a.jetty.area === 'b6_c7_jetty' && a.jetty.wickans ? ok('the cold realm (its own dark deck), the wolves, the Jakatakan fleet, Malaz City and the Hold, the waterfront turned on its Wickans') : no('realm ' + JSON.stringify([a.realm, a.wolves, a.jak, a.landfall, a.jetty]));
  a.mobEarly && a.orders && a.fam && a.news && a.hold ? ok('the waterfront: the captain\'s orders first; the Wickan families; the dispatch-boat rumour (one line of the Host); the Hold as a silhouette, Aragan by name') : no('waterfront ' + JSON.stringify([a.mobEarly, a.orders, a.fam, a.news, a.hold]));
  const al = a.alley || {}, mb = a.mob || {}; a.alleyCheck === 'guile:16' && al.started && al.foes === 5 && al.done === 'fought' && a.brace === 'might:17' && mb.started && mb.allies === 1 && mb.waves === 1 && mb.stage2 && mb.inStage2 && mb.foes2.includes('b6_c7_ringleader') && mb.done === 1 && mb.shouts && mb.cussers ? ok(`the alley (rioters, a ringleader); the mob on the jetty (a wave, a regular beside the squad) and the jetty's foot (stage2, the ringleader): +${mb.xp} xp; the Fist's shouts and the cussers, heard`) : no('mob ' + JSON.stringify([a.alleyCheck, al, a.brace, mb]));
  const gf = a.guardFight || {}; a.guardNpc && a.cloak && a.guardCheck === 'wits:17' && a.guardSgt === 2 && a.guardDone === 'talked' && gf.started && gf.foeIds.includes('b6_c7_guardsgt') && gf.done === 'fought' ? ok(`the City Guard: the order read out (Wits 17, you +2) sends them off, or the fight (+${gf.xp} xp, level ${a.lvlAfter} after); the grandmother\'s cloak (+1 armour)`) : no('guard ' + JSON.stringify([a.guardNpc, a.cloak, a.guardCheck, a.guardSgt, a.guardDone, gf]));
  a.captainNode === 'b6_c7_signal' && a.signal.flag === 1 && a.signal.ph === 5 && a.signal.txt && a.roads.three && a.roads.notYet && a.roads.mehet && a.roads.haddat ? ok('the horns (the captain sends you there); the roads: three, and "Not yet"; Mehet and Haddat have their say') : no('roads ' + JSON.stringify([a.captainNode, a.signal, a.roads]));
}
for (const [k, R] of Object.entries(r.roads || {})) {
  const wk = k !== 'wickans' || (R.area === 'b6_c7_lanes' && R.lastEarly && R.roofCheck === 'wits:16' && R.streets.started && R.streets.stage2 && R.streets.inStage2 && R.streets.done === 1 && R.gate);
  const order = R.order.split(','), iEndSgt = order.indexOf('fate', 1), iR4 = order.indexOf('b67road4'), iMeet = order.indexOf('b67meet');
  R.key === k && wk && R.end.view === 'end' && R.end.ch === k && R.end.epi && R.end.done && R.end.onward === (k === 'adjunct') && R.end.journal >= 3 && R.end.thread === 'r' && !R.leaks.length && R.thread === 'r' && R.name === 'Hask'
    && R.fourth.split(',').sort().join() === 'brannoc,brisk,kettle,ohl,sgt,tuft' && R.r4 && Object.values(R.r4).every(Boolean) && R.sgt4.name && R.sgt4.role && R.ressa === 'The Fourth · waiting' && R.meet && iR4 > 0 && iMeet === order.length - 2 && iR4 < iMeet
    && R.sgt && Object.values(R.endPage).every(Boolean) && R.onwardLine
    ? ok(`road ${k}: ${k === 'adjunct' ? 'out with the fleet, onward to Book Seven' : k === 'jetty' ? 'left on the jetty, no road onward' : 'the lanes, the streets fight and the gate, no road onward'}; the finale, ${R.pages} pages: ${R.kinds}`)
    : no(`road ${k} ` + JSON.stringify(R).slice(0, 1600));
}
if (b.renderErr) {
  !b.renderErr.length && b.intro && b.sail && b.ottar.squad && b.ottar.done === 1 && b.ottar.txt && b.captain ? ok('leave, pass, in, out, sail, report: every node renders; Mirrel in the barrow from the fire (the intro, the captain\'s book); Ch5 \'sail\' read at the ambush; Ottar walks when there is room') : no('B ' + JSON.stringify(b).slice(0, 900));
  const fs = b.fates || {}; fs.brisk && fs.tuft && fs.sgt && fs.ohlFallback && b.mirrel && b.mirrel.k === 'gone' && b.mirrel.head === 'The fallen' && b.mirrel.fire && b.mirrel.barrow && b.kettle && b.kettle.head === 'The Fourth · the fallen' && b.kettle.fell && Object.values(b.road4).every(Boolean) && !b.leaks.length && b.after.thread === 'r' && b.after.name === 'Hask' && b.after.th && b.after.hName === 'Brann' && b.endDead
    ? ok(`the finale reads ${b.mocked ? 'a mock B6CH6.fates (a string, a function called with the Fourth swapped in, the sergeant, and a throwing entry falling back)' : 'Chapter 6\'s B6CH6.fates'}; the Fourth's road home with Ch2/4/6's keys; Mirrel fallen in the fire, Kettle before G\'danisban; the squads swapped back after (${b.pages} pages)`)
    : no('B finale ' + JSON.stringify([fs, b.mirrel, b.kettle, b.road4, b.leaks, b.after, b.endDead, b.kinds]));
}
if (c.renderErr) !c.renderErr.length && c.next === 'b6_c7_ambush,b6_c7_sepik,b6_c7_perish,b6_c7_realm,b6_c7_jakatakan,b6_c7_mob,b6_c7_guard_come,b6_c7_signal,b6_c7_roads,b6_c7_lanes_start,b6_c7_last' && c.news && c.gloss === 3 ? ok('a --from=7 style save: every node renders in every phase and step, on every road; the way on from each; the Hanar Ara rumour; three glossary rows') : no('synthetic ' + JSON.stringify(c).slice(0, 1200));
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b6ch7: FAIL (${bad.length})` : 'b6ch7: all ok'); process.exit(bad.length ? 1 : 0);
