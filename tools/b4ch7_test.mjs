// Book Four, Chapter 7 (The Convergence, src/77_b4_ch7.js) and the end of Book Four: the chapter's halts; the night and the one face
// among the riders (Sathi on a fresh start, a different Barrow dead on a transfer; b4_saw far and close); every fight's start and a
// forced win, both grounds; the mortal fight fought (a squadmate's death recorded) and let go (Nerve −2, no fight); the trick and the
// black bead in a fight; the fire and the swap; all three roads to the finale with every finale page rendered.
// Usage: node tools/b4ch7_test.mjs   (build first; exit 1 on a failure)
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
  const made = (id, re, who, tier = 'clean') => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no check ${re}`); runFx(c);
    settleRoll({who, stat:c.check[0], tier, ok:tier !== 'near', pass:true, margin:tier === 'near' ? -1 : 6, nat:tier === 'near' ? 9 : 18}, c); if (typeof c.go === 'string') talk(c.go); else c.go(); return c; };
  /* a fight forced: both grounds (killing `dies` on the last one if asked), then the node after it */
  const force = async (id, dies) => { const res = {id};
    startBattle(id, {}); await wait(60); res.started = !!B && B.id === id; res.regs = B.def.b4Regs || 0; res.dust = b4DustNow(); res.dog = B.units.some(u => u.kind === 'hackle');
    res.mortal = !!B.def.mortal; res.foes = B.units.filter(u => u.side === 'e').length; res.minY = Math.min(...B.units.filter(u => u.side === 'e').map(u => u.y)); res.close = !!B.def.b47Close; res.sumY = B.units.filter(u => u.side === 'e').reduce((a, u) => a + u.y, 0);
    if (BATTLES[id].stage2) { B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; stageBreak(); await wait(30); const on = document.getElementById('bOn'); res.stage2 = !!on; if (on) on.click(); await wait(60);
      res.inStage2 = !!B && !!B.def.isStage2; }
    if (dies) { const u = B.units.find(v => v.id === dies); if (u) u.hp = 0; }
    B.units.filter(u => u.side === 'e').forEach(u => u.hp = 0); B.over = true; win(); await wait(30);
    if (S.picksDue && S.picksDue.length) { res.picks = S.picksDue.join(','); S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; talk(BATTLES[id].after); }
    res.after = S.node; return res; };
  const nodes = Object.keys(DLG).filter(k => /^b4_c7_/.test(k));
  const leak = /undefined|NaN|\[object|\$\{|\bnull\b/;
  const renderAll = () => { const errs = []; nodes.forEach(k => { try { const n = DLG[k](); if (!n || typeof n.txt !== 'string' || !n.txt.trim()) errs.push(k + ': no text'); else if (leak.test(n.txt)) errs.push(k + ': leaks'); if (n.scene && !SCENES[n.scene]) errs.push(k + ': scene ' + n.scene); } catch (e) { errs.push(k + ': ' + e.message); } }); return errs; };
  /* the finale, every page, read off the screen */
  const finale = async () => { const P = finPages(), pages = [];
    for (let i = 0; i < P.length; i++) { showFinale(i); await wait(20); const el = document.getElementById('fin'); const t = el ? el.innerText : '';
      pages.push({k:P[i].k, id:P[i].id || '', head:(document.querySelector('.fin-k') || {}).textContent || '', len:t.length, leak:leak.test(t), t}); }
    return pages; };
  const lvl14 = (saw) => { S.lvl = 14; S.xp = LEVELS[13]; S.chapters = {1:'chain', 2:'fall', 3:'carry', 4:'seti', 5:'seep', 6:saw === 'close' ? 'forward' : 'hold'};
    Object.assign(S.f, {b4_c1_key:'chain', b4_bone:'chain', b4_c1_token:'feather', b4_c2_key:'fall', b4_fallClimbed:1, b4_c3_key:'carry', b4_carried:1, b4_c4_key:'seti', b4_setiSaved:1, b4_c5_key:'seep', b4_seepWater:1, b4_c6_key:saw === 'close' ? 'forward' : 'hold'});
    if (saw) S.f.b4_saw = saw; S.picksDue = []; };
  try {
  /* ================= a fresh start at Chapter Seven: Sathi is the Barrow dead; b4_saw unset (far); Orvas walking ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); lvl14(); S.f.b4_orvasDone = 1; S.squad.push('orvas'); S.loy.orvas = 2; migrate(S); save(); startChapter(7);
  out.f = {area:S.area, ch:S.chapter, squad:S.squad.join(','), lvl0:S.lvl, dust:S.dust, n0:S.nerve, renderErr:renderAll(), nodes:nodes.length, face:b47Face(), sure:b47Sure()};
  talk('b4_c7_start'); take('b4_c7_start', /Find Radde/);
  out.f.radde = /Nerve/.test(DLG.b4_c7_radde().html || ''); take('b4_c7_radde', /see to the riders/); out.f.raddeSaid = S.f.b4_c7_raddeSaid;
  const nr = S.nerve; talk('b4_c7_recruits'); take('b4_c7_recruits', /hold a rise/); out.f.recruits = S.nerve - nr;
  talk('b4_c7_seti'); out.f.seti = /society remembers/.test(DLG.b4_c7_seti().txt) && AREAS.b4_c7_picket.npcs.find(n => n.id === 'seti').show();
  talk('b4_c7_lookout'); made('b4_c7_lookout', /proper look/, 'tebbet' in TPL && b4In('tebbet') ? 'tebbet' : 'haddat'); out.f.look = S.f.b4_c7_look;
  talk('b4_c7_shield'); const sf = DLG.b4_c7_shield(); out.f.shield = {again:!!(sf.again && sf.again()), talk:DLG.b4_c7_shield_talk().txt.split('\n\n').length, here:b47Mates().length + (b47Dog() && !b4In('sathi') ? 1 : 0)};
  out.f.screenEarly = !has('b4_c7_screen', /Listen/);
  /* dusk: the outriders, with the company */
  talk('b4_c7_out_start'); out.f.outNotNow = has('b4_c7_out_start', /Not now/);
  const n1 = S.nerve; out.f.out = await force('b4_c7_outriders'); out.f.outClean = S.nerve - n1; take('b4_c7_out_after', /Back to the screen/); out.f.ph2 = b47Ph();
  /* the night: sounds, the dark changing, butterflies, the standard, the ride, the face */
  talk('b4_c7_screen'); const ns = S.nerve; take('b4_c7_screen', /Listen/); out.f.sounds = S.nerve - ns;
  out.f.dark = /Butterflies/.test(DLG.b4_c7_dark().txt) && /Wickan standard/.test(DLG.b4_c7_dark().txt); take('b4_c7_sounds', /Watch it/); take('b4_c7_dark', /Hold the screen/);
  out.f.ride = {flag:S.f.b4_c7_ride, league:/a league off/.test(DLG.b4_c7_ride().txt), noHooves:/no sound of hooves/.test(DLG.b4_c7_ride().txt), notNow:has('b4_c7_ride', /Not now/), npc:AREAS.b4_c7_picket.npcs.find(n => n.id === 'rider').show()};
  take('b4_c7_ride', /near edge/);
  { const ft = DLG.b4_c7_face().txt, look = b47FaceLook(); out.f.faceTxt = {sathi:/braids flying/.test(look), far:/too far for a face/.test(look) || /nearly sure/.test(look), token:/crow feather/.test(look), unnamed:!/Sathi/.test(look), named:/says the name\. "Sathi\."/.test(ft), namer:b47Namer()}; }
  const nf = S.nerve; take('b4_c7_face', /Our dead ride with us/); out.f.faceR = {seen:S.f.b4_c7_faceSeen, said:S.f.b4_c7_faceSaid, nerve:S.nerve - nf, ph:b47Ph(), silent:/no sound at all/.test(DLG.b4_c7_after_ride().txt)};
  /* before dawn: the signpost */
  talk('b4_c7_predawn'); const pd = DLG.b4_c7_predawn(); out.f.sign = {mortal:pd.ch.some(c => /mortal fight: whoever falls here stays down/.test(c.t)), letgo:has('b4_c7_predawn', /Let them go by/), moment:has('b4_c7_predawn', /moment/), widget:/Nerve/.test(pd.html || '')};
  const snap = JSON.stringify(S);
  /* ---- the mortal fight, fought: Tangle falls ---- */
  take('b4_c7_predawn', /Hold the end of the line/); out.m = {area:S.area}; talk('b4_c7_hold'); out.m.notNow = has('b4_c7_hold', /Not now/) && has('b4_c7_hold', /Let them go by after all/);
  const nb = S.nerve; out.m.fight = await force('b4_c7_breakout', 'tangle'); out.m.dead = S.dead.tangle && {ch:S.dead.tangle.ch, where:S.dead.tangle.where}; out.m.inSquad = S.squad.includes('tangle');
  out.m.afterTxt = /Tangle did not get up/.test(DLG.b4_c7_break_after().txt); take('b4_c7_break_after', /Wait for the light/); out.m.nerve = S.nerve - nb; out.m.done = S.f.b4_c7_breakDone;
  const snapM = JSON.stringify(S);
  /* ---- the mortal fight, let go: Nerve −2, and no fight ---- */
  S = JSON.parse(snap); save(); startExplore('b4_c7_picket'); const nl = S.nerve; take('b4_c7_predawn', /Let them go by/); out.l = {nerve:S.nerve - nl, letGo:S.f.b4_c7_letGo, noFight:view !== 'battle' && !S.f.b4_c7_breakDone, txt:/lets them go by/.test(DLG.b4_c7_letgo().txt)};
  take('b4_c7_letgo', /Wait for the light/); out.l.area = S.area;
  /* back to the fought road for the morning */
  S = JSON.parse(snapM); save(); startExplore('b4_c7_breach');
  const nm = S.nerve; take('b4_c7_dawn', /Back along the line/); out.d = {area:S.area, ph:b47Ph()};
  out.d.morning = {nerve:S.nerve - nm, silent:/The trenches are silent/.test(DLG.b4_c7_morning().txt)}; take('b4_c7_morning', /Find Radde/);
  out.d.earlyWatch = !has('b4_c7_watch', /Watch/);
  const ng = S.nerve; talk('b4_c7_radde_morning'); DLG.b4_c7_radde_morning().fx(); out.d.gamet = {nerve:S.nerve - ng, txt:/Fist Gamet died in the night/.test(DLG.b4_c7_radde_morning().txt) && /clot in the brain/.test(DLG.b4_c7_radde_morning().txt) && /Keneb's Fist/.test(DLG.b4_c7_radde_morning().txt)};
  talk('b4_c7_hollet_morning');
  take('b4_c7_radde_morning', /To the screen/); out.d.watchNotNow = has('b4_c7_watch', /Not now/); take('b4_c7_watch', /Watch/);
  { const t = DLG.b4_c7_duel().txt; out.d.duel = {flag:S.f.b4_c7_duel, dust:S.dust, one:/One thrust/.test(t), silent:/no cheering/i.test(t), noName:!/Felisin|Tavore/.test(t)}; }
  take('b4_c7_duel', /Back along the screen/); { const t = DLG.b4_c7_giant().txt; out.d.giant = {flag:S.f.b4_c7_giant, far:/does not look at the 9th/.test(t), noName:!/Karsa|Toblakai|Knight of Chains/.test(t)}; }
  S.f.b4_c7_holletMorn = 0; talk('b4_c7_hollet_morning'); DLG.b4_c7_hollet_morning().fx(); { const t = DLG.b4_c7_hollet_morning().txt; out.d.camp = {ranal:/Ranal's dead/.test(t) && /sandstorm/.test(t), dom:/Korbolo Dom/.test(t) && /bound man/.test(t), pale:/Pale ones/.test(t)}; }
  /* the ramps' foot: the sword, with its "yes, but" */
  talk('b4_c7_radde_ramps'); take('b4_c7_radde_ramps', /ramps' foot/); out.d.rampsNotNow = has('b4_c7_to_ramps', /Not now/); made('b4_c7_to_ramps', /good sword/, 'darrut' in S.loy ? 'darrut' : 'haddat', 'near');
  out.d.sword = {kit:S.kit.includes('b4_c7_dogslayerblade'), rattled:!!S.rattled};
  /* the warning, the run, the spur, the flood */
  talk('b4_c7_warning'); out.d.warn = {flag:S.f.b4_c7_warned, coral:/The coral/.test(DLG.b4_c7_warning().txt), moment:has('b4_c7_warning', /moment/)}; take('b4_c7_warning', /Run for the coral/);
  out.d.runNotNow = has('b4_c7_run', /Not now/); out.d.spur = await force('b4_c7_spur'); out.d.flood = /Raraku is a sea/.test(DLG.b4_c7_spur_after().txt);
  take('b4_c7_spur_after', /Up onto the island/); out.i = {area:S.area, ph:b47Ph(), lvl:S.lvl, deckFirst:has('b4_c7_isle_arrive', /Deck/)};
  /* the reading on the island */
  talk('b4_c7_deck'); const dk = DLG.b4_c7_deck(); runFx(dk.ch.find(c => /draw/.test(c.t))); out.i.deck = {drawn:S.f.b4_c7_drawn, reader:S.f.b4_c7_reader, card:S.card, inPool:B4POOL[7].includes(S.card), settle:/quiet|in order|box/.test(dk.txt)};
  S.card = 'herald'; out.i.herald = /came through it/.test(b4CardSay('herald'));
  /* the fire */
  talk('b4_c7_isle'); const fi = DLG.b4_c7_isle(); out.i.fire = {again:!!fi.again(), rest:has('b4_c7_isle', /rest/), talk:has('b4_c7_isle', /Talk with the squad/), notNow:has('b4_c7_isle', /Not now/), shut:!has('b4_c7_isle', /The road out/)};
  take('b4_c7_isle', /rest/); out.i.rested = S.f.b4_c7_rest; out.i.talkLines = DLG.b4_c7_isle_talk().txt.split('\n\n').length; out.i.here = b47Mates().length + (b47Dog() && !b4In('sathi') ? 1 : 0);
  /* the trick, offered to the one who saw the face and said the name */
  talk('b4_c7_shore'); out.i.namer = S.f.b4_c7_namer; made('b4_c7_shore', /call the dust/, S.f.b4_c7_namer === 'sgt' ? 'sgt' : S.f.b4_c7_namer); out.i.trick = S.tricks && S.tricks.b4_c7_deadride && S.tricks.b4_c7_deadride.who;
  talk('b4_c7_coralhead'); out.i.coral = S.kit.includes('b4_c7_coral');
  talk('b4_c7_strangers'); { const t = DLG.b4_c7_strangers().txt; out.i.strangers = /Sixteen/.test(t) && /A girl among them/.test(t) && !/Sinn|Ashok/.test(t); }
  talk('b4_c7_radde_isle'); out.i.pursuit = /Across this entire continent/.test(DLG.b4_c7_radde_isle().txt); DLG.b4_c7_radde_isle().fx();
  out.i.road = has('b4_c7_isle', /The road out/); out.i.keyNotNow = has('b4_c7_key', /Not yet/); out.i.keyWidget = /Nerve/.test(DLG.b4_c7_key().html || '');
  const snapK = JSON.stringify(S);
  out.roads = {};
  for (const [k, re] of [['line', /The 9th\. In the file/], ['horse', /The horse/], ['ledger', /The water/]]) {
    S = JSON.parse(snapK); save(); startExplore('b4_c7_isle'); const n0 = S.nerve;
    take('b4_c7_key', re); const R = {key:S.f.b4_c7_key, nerve:S.nerve - n0, tear:S.kit.includes('b4_c7_tear')};
    take(`b4_c7_${k}`, /Back to the fire/); R.lastNotYet = has('b4_c7_last', /Not yet/); take('b4_c7_isle', /The last of it/); take('b4_c7_last', /Go\./); await wait(40);
    R.end = {view, ch:S.chapters[7], lvl:S.lvl, epi:!!document.getElementById('bEpi'), extras:CHAPTERS[7].extras().length, journal:CHAPTERS[7].journal().length, net:S.nerve - out.f.n0};
    const pages = await finale(); R.pages = pages.length; R.kinds = pages.map(p => p.k + (p.id ? ':' + p.id : '')).join(' ');
    R.leaks = pages.filter(p => p.leak || p.len < 80).map(p => p.k + ':' + p.id);
    R.road = pages[0] && /Nerve \d+ of 10/.test(pages[0].t); R.riders = pages.find(p => p.id === 'sathi'); R.riders = R.riders && {head:R.riders.head, rode:/Among the riders/.test(R.riders.t) && /said the name/.test(R.riders.t)};
    R.fallen = pages.find(p => p.id === 'tangle'); R.fallen = R.fallen && {head:R.fallen.head, end:/end of the line/.test(R.fallen.t)};
    const last = pages[pages.length - 1]; R.endPage = {endline:/The End of Unblooded/.test(last.t), credit:/Steven Erikson/.test(last.t) && /Ian C\. Esslemont/.test(last.t), bones:/finger bone/.test(last.t), standard:/bone before a sandstorm/.test(last.t), sea:/a sea/.test(last.t), pursuit:/pursuit/.test(last.t), noYG:!/Y'Ghatan/.test(pages.map(p => p.t).join(' ')), noBH:!/Bonehunters/.test(pages.map(p => p.t).join(' '))};
    R.sgt = pages.some(p => p.k === 'fate' && p.id === 'sgt' && /finger bone/.test(p.t));
    out.roads[k] = R; }
  /* the trick and the black bead in a fight */
  S = JSON.parse(snapK); S.tricks = {b4_c7_deadride:{who:'haddat', ch:7}}; equip('haddat', 'b4_c7_tear'); save();
  startBattle('b4_c7_spur', {}); await wait(60);
  { const hd = B.units.find(u => u.id === 'haddat'), e = B.units.find(u => u.side === 'e'); e.x = hd.x; e.y = Math.max(0, hd.y - 3); const h0 = e.hp;
    out.tr = {tiles:AB.t_b4_c7_deadride.tiles(hd).includes(e), spirit:!!AB.t_b4_c7_deadride.spirit}; AB.t_b4_c7_deadride.run(hd, e.x, e.y); out.tr.dmg = h0 - e.hp;
    const e2 = B.units.find(u => u.side === 'e' && u !== e && u.hp > 0); e2.x = hd.x; e2.y = Math.max(0, hd.y - 1); e2.ac = -20; e2.maxhp = e2.hp = 400; const h2 = e2.hp; for (let k = 0; k < 6 && !hd.b47tear; k++) attack(hd, e2); await wait(400); out.tr.tear = hd.b47tear === true; out.tr.hit2 = h2 - e2.hp; B.over = true; }
  } catch (e) { out.err = e.stack; }
  /* ================= a Book Two transfer: Marrow dead at the Barrow, Sathi alive, Ramin walking, Orvas waiting; b4_saw close ================= */
  try {
  setBook('hoc'); S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'guard', lvl:8, mates:['haddat', 'sathi', 'tangle'], dead:['marrow'], ramin:true, keth:false, f:{b2_c7_key:'guard', b2_hackleBack:0, b2_ilhar:'parted', keepsakes:[]}};
  S.dead = {marrow:{ch:7, where:'The Barrow', from:'dg'}}; S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'tallow', 'redblade']; S.f.b4_raminDone = 1; S.f.b4_orvasDone = 2; migrate(S); lvl14('close'); save(); startChapter(7);
  out.t = {renderErr:renderAll(), face:b47Face(), sure:b47Sure(), namer:b47Namer(), ramin:b4In('redblade')};
  out.t.raminNamed = ['b4_c7_start', 'b4_c7_shield_talk', 'b4_c7_radde_2', 'b4_c7_sounds', 'b4_c7_ride', 'b4_c7_predawn', 'b4_c7_hold', 'b4_c7_giant', 'b4_c7_key', 'b4_c7_last'].filter(k => { const n = DLG[k](); return /Ramin/.test(n.txt); });
  out.t.intro = /went forward in the dark/.test(B4CH7.intro.paras[1]());
  { const look = b47FaceLook(); out.t.look = {marrow:/too many pockets/.test(look), clear:/plainly/.test(look), unnamed:!/Marrow/.test(look), token:/crow feather/.test(look), named:/says the name\. "Marrow\."/.test(DLG.b4_c7_face().txt)}; }
  { const s0 = S.f.b4_saw, c0 = S.f.b4_fallClimbed; S.f.b4_saw = 'far'; S.f.b4_fallClimbed = 0; out.t.farLook = /too far for a face/i.test(b47FaceLook()) && b47Sure() === 'sure'; S.f.b4_saw = s0; S.f.b4_fallClimbed = c0; }
  { const sv = S; S = JSON.parse(JSON.stringify(S)); delete S.imported; S.dead = {sathi:{ch:7, where:'The Barrow', from:'dg'}}; S.f.b4_saw = 'close'; out.t.freshClose = b47Face() === 'sathi' && /plainly/.test(b47FaceLook()) && /braids flying/.test(b47FaceLook()); S = sv; }
  out.t.out = await force('b4_c7_outriders');
  S.f.b4_c7_ph = 3; out.t.br = await force('b4_c7_breakout'); out.t.brFar = (() => { const s = S.f.b4_saw; S.f.b4_saw = 'far'; const d = battleDef('b4_c7_breakout'); S.f.b4_saw = s; return {foes:d.foes.length, minY:Math.min(...d.foes.map(f => f[2])), sumY:d.foes.reduce((a, f) => a + f[2], 0), wave:d.waves[0].round}; })();
  out.t.brClose = (() => { const d = battleDef('b4_c7_breakout'); return {foes:d.foes.length, minY:Math.min(...d.foes.map(f => f[2])), sumY:d.foes.reduce((a, f) => a + f[2], 0), wave:d.waves[0].round}; })();
  /* the swap at the island fire: Orvas in, Ramin back to the Red Blades */
  S.f.b4_c7_ph = 6; startExplore('b4_c7_isle'); talk('b4_c7_isle'); out.t.swapOffered = has('b4_c7_isle', /Send across the water for Orvas/); take('b4_c7_isle', /Send across the water for Orvas/);
  out.t.swap = {orvas:b4In('orvas'), ramin:b4In('redblade'), raminWaits:S.f.b4_raminDone === 2, line:/Orvas comes across/.test(DLG.b4_c7_isle_swap().txt), fireLine:/Orvas/.test(DLG.b4_c7_isle_talk().txt)};
  S.picksDue = []; S.f.b4_c7_faceSeen = 1; S.f.b4_c7_namer = 'haddat'; S.f.b4_c7_raddeIsle = 1; take('b4_c7_key', /The horse/); out.t.horse = {lead:S.f.b4_c7_lead, tear:S.kit.includes('b4_c7_tear'), sathi:/Horses/.test(DLG.b4_c7_horse().txt), tangle:/I'll walk/.test(DLG.b4_c7_horse().txt)};
  take('b4_c7_horse', /Back to the fire/); take('b4_c7_isle', /The last of it/); take('b4_c7_last', /Go\./); await wait(40);
  const pages = await finale(); out.t.pages = pages.length; out.t.leaks = pages.filter(p => p.leak || p.len < 80).map(p => p.k + ':' + p.id);
  out.t.riders = (pages.find(p => p.id === 'marrow') || {}).head; out.t.riderTxt = /Among the riders/.test((pages.find(p => p.id === 'marrow') || {}).t || '') && /Plainly/.test((pages.find(p => p.id === 'marrow') || {}).t || '');
  out.t.ramin = (pages.find(p => p.id === 'redblade') || {}).head; out.t.raminTxt = /Red Blades/.test((pages.find(p => p.id === 'redblade') || {}).t || '');
  out.t.fates = pages.filter(p => p.k === 'fate').map(p => p.id).join(',');
  } catch (e) { out.err2 = e.stack; }
  return out;
});
if (r.err) no('page script threw (fresh): ' + r.err);
if (r.err2) no('page script threw (transfer): ' + r.err2);
const f = Object.assign({shield:{}, out:{}, ride:{}, faceTxt:{}, sign:{}}, r.f || {}), m = r.m || {}, l = r.l || {}, d = r.d || {}, i = r.i || {}, t = r.t || {}, tr = r.tr || {};
if (f.area) {
  f.area === 'b4_c7_picket' && f.ch === 7 && f.lvl0 === 14 && f.dust === 3 && !f.renderErr.length && f.nodes >= 60 && f.nodes <= 80 ? ok(`a fresh start opens Chapter Seven at the flank picket at level 14, Dust 3, and every one of ${f.nodes} b4_c7 nodes renders`) : no('fresh ' + JSON.stringify(f));
  f.radde && f.raddeSaid && f.recruits === 1 && f.seti && f.look === 'ok' && f.shield.again && f.shield.talk === f.shield.here && f.screenEarly ? ok(`the picket: Radde's book with the Nerve widget; the recruits held (+1); the Seti archer (Ch4's seti road); the lookout; the shielded fire, a line each (${f.shield.talk})`) : no('picket ' + JSON.stringify([f.radde, f.raddeSaid, f.recruits, f.seti, f.look, f.shield, f.screenEarly]));
  f.outNotNow && f.out.started && f.out.dust === 3 && f.out.regs >= 1 && f.out.stage2 && f.out.inStage2 && f.out.after === 'b4_c7_out_after' && f.outClean === 1 && f.ph2 === 2 ? ok(`the outriders at dusk: Dust 3, the company (${f.out.regs}), both grounds, Nerve +1 for a clean fight`) : no('outriders ' + JSON.stringify([f.outNotNow, f.out, f.outClean, f.ph2]));
  f.sounds === -1 && f.dark && f.ride.flag && f.ride.league && f.ride.noHooves && f.ride.notNow && f.ride.npc ? ok('the night: sounds almost heard (Nerve −1), the dark changing, butterflies and a Wickan standard, a sound at a league, the riders with no sound of hooves') : no('night ' + JSON.stringify([f.sounds, f.dark, f.ride]));
  f.face === 'sathi' && f.sure === 'near' && f.faceTxt.sathi && f.faceTxt.far && f.faceTxt.token && f.faceTxt.unnamed && f.faceTxt.named && f.faceR && f.faceR.seen && f.faceR.said === 'aloud' && f.faceR.nerve === 1 && f.faceR.ph === 3 && f.faceR.silent ? ok(`the one face, fresh start: Sathi (not named by the narrator; ${f.faceTxt.namer} says the name), far but the Fall climbed, the crow feather on the chain road; said aloud (Nerve +1); then silence`) : no('face ' + JSON.stringify([f.face, f.faceR, f.sure, f.faceTxt]));
  f.sign.mortal && f.sign.letgo && f.sign.moment && f.sign.widget ? ok('before dawn: the mortal fight signposted on the choice ("whoever falls here stays down"), with "let them go by" beside it') : no('signpost ' + JSON.stringify(f.sign));
}
m.area === 'b4_c7_breach' && m.notNow && m.fight && m.fight.started && m.fight.mortal && m.fight.stage2 && m.fight.inStage2 && m.dead && m.dead.ch === 7 && /end of the line|last picket/i.test(m.dead.where) && !m.inSquad && m.afterTxt && m.nerve === -1 && m.done ? ok('the mortal fight fought: both grounds; Tangle falls, and S.dead records him (Chapter 7, The end of the line); the aftermath names him (Nerve −1)') : no('mortal ' + JSON.stringify(m));
l.nerve === -2 && l.letGo && l.noFight && l.txt && l.area === 'b4_c7_breach' ? ok('the mortal fight let go: Nerve −2, no fight, and on to dawn') : no('let go ' + JSON.stringify(l));
d.area === 'b4_c7_line' && d.morning && d.morning.nerve === 1 && d.morning.silent && d.earlyWatch && d.gamet.nerve === -1 && d.gamet.txt && d.watchNotNow && d.duel.flag && d.duel.dust === 1 && d.duel.one && d.duel.silent && d.duel.noName && d.giant.flag && d.giant.far && d.giant.noName && d.camp.ranal && d.camp.dom && d.camp.pale ? ok('the morning: the trenches silent (Nerve +1); Gamet dead of a clot, Keneb Fist (Nerve −1); the duel watched in silence, one thrust, no names; the dust settles to 1; the giant rides past far off; Ranal in a sandstorm, pale riders, a bound man (Dom) in camp talk') : no('morning ' + JSON.stringify(d));
d.sword && d.sword.kit && d.sword.rattled && d.rampsNotNow && d.warn.flag && d.warn.coral && d.warn.moment && d.runNotNow && d.spur && d.spur.started && d.spur.dust === 1 && d.spur.stage2 && d.spur.inStage2 && d.flood ? ok('the ramps\' foot (the Dogslayer\'s sword, its "yes, but"); the Wickan boy\'s warning; the run; the spur fight in Dust 1, both grounds; Raraku is a sea') : no('flood ' + JSON.stringify([d.sword, d.rampsNotNow, d.warn, d.runNotNow, d.spur, d.flood]));
i.area === 'b4_c7_isle' && i.ph === 6 && i.deckFirst && i.deck && i.deck.drawn === 1 && i.deck.inPool && i.deck.settle && i.herald && i.fire.again && i.fire.rest && i.fire.talk && i.fire.notNow && i.fire.shut && i.rested === 1 && i.talkLines === i.here ? ok(`the coral island: the last reading (${i.deck && i.deck.reader} draws ${i.deck && i.deck.card}; the cards settle), the Herald's island words; the fire b4_c7_isle (again, rest, a line each, Not now; the road waits for Radde)`) : no('isle ' + JSON.stringify(i));
i.trick && i.trick === i.namer && i.coral && i.strangers && i.pursuit && i.road && i.keyNotNow && i.keyWidget ? ok(`the Dead Ride learned by the one who said the name (${i.trick}); the coral; sixteen strangers, a girl among them; the pursuit ordered; the road can wait`) : no('isle 2 ' + JSON.stringify(i));
for (const [k, R] of Object.entries(r.roads || {})) {
  R.key === k && R.end.view === 'end' && R.end.ch === k && R.end.epi && R.end.lvl >= 14 && R.end.lvl <= 15 && R.end.net >= -2 && R.end.net <= 3 && !R.leaks.length && R.pages >= 6 && R.road && R.riders && R.riders.head === 'Among the riders' && R.riders.rode && R.fallen && R.fallen.end && R.sgt && Object.values(R.endPage).every(Boolean) && (k !== 'horse' || R.tear) ? ok(`road ${k}: Nerve ${R.nerve >= 0 ? '+' : ''}${R.nerve}; the end at level ${R.end.lvl} (net Nerve ${R.end.net}; ${R.end.extras} end lines, ${R.end.journal} journal); the finale, ${R.pages} pages, every one rendered: ${R.kinds}`) : no(`road ${k} ` + JSON.stringify(R));
}
tr.tiles && tr.spirit && tr.dmg >= 2 + 2 + 3 && tr.tear && tr.hit2 >= 3 ? ok(`in a fight: the Dead Ride rides down an enemy within 4 (${tr.dmg} damage, spirit-craft); the black bead adds 2 to the first hit`) : no('trick/bead ' + JSON.stringify(tr));
if (t.renderErr) {
  !t.renderErr.length && t.face === 'marrow' && t.sure === 'clear' && t.namer === 'haddat' && t.look.marrow && t.look.clear && t.look.unnamed && t.look.token && t.look.named && t.intro && t.farLook && t.freshClose ? ok('a transfer with Marrow dead at the Barrow and b4_saw close: every node renders; the face is Marrow\'s, plainly, Haddat says the name; the intro remembers going forward; far and no Fall: a shape they are sure of; a fresh start on the forward road sees Sathi plainly') : no('transfer face ' + JSON.stringify(t));
  t.ramin && t.raminNamed.length >= 7 && t.out.dog ? ok(`Ramin named in ${t.raminNamed.length} of 10 sampled nodes; Hackle at Sathi's knee`) : no('transfer ramin ' + JSON.stringify([t.ramin, t.raminNamed, t.out]));
  t.br.close && t.brClose.foes === t.brFar.foes && t.brClose.sumY > t.brFar.sumY && t.brClose.wave === t.brFar.wave ? ok(`b4_saw close: the breakout's flank fleers start nearer (${t.brClose.foes} foes either way, rows ${t.brClose.sumY} against ${t.brFar.sumY}, the wave at round ${t.brClose.wave} on both roads; tuned Oct 21)`) : no('close ' + JSON.stringify([t.br, t.brClose, t.brFar]));
  t.swapOffered && t.swap.orvas && !t.swap.ramin && t.swap.raminWaits && t.swap.line && t.swap.fireLine ? ok('the swap at the island fire: Orvas in, Ramin back to the Red Blades; Orvas has his line at the fire') : no('swap ' + JSON.stringify([t.swapOffered, t.swap]));
  t.horse.lead === 'orvas' && t.horse.tear && t.horse.sathi && t.horse.tangle && !t.leaks.length && t.riders === 'Among the riders' && t.riderTxt && t.ramin === 'With his people' && t.raminTxt ? ok(`the horse road on the transfer: Orvas leads and gives the black bead; Sathi's horses, Tangle walks; the finale (${t.pages} pages): Marrow among the riders, Ramin with the Red Blades; fates ${t.fates}`) : no('transfer finale ' + JSON.stringify([t.horse, t.leaks, t.riders, t.riderTxt, t.ramin, t.raminTxt, t.fates]));
}
errors.length ? no('page errors: ' + errors.join(' | ').slice(0, 600)) : ok('no page errors');
await br.close(); srv.kill();
process.exit(bad.length ? 1 : 0);
