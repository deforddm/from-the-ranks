// v8.0: Book Five's engine (docs/v8.0-notes.md). A fresh Book Five game (a new cast, level 1, cap 8, Book Two's curve), the squad and its
// templates (every field, every relation, nothing but existing abilities and talents), Debt (owe, pay, forgive, the lines it crosses, the
// collectors, the canal, the heirs), the three recruits through the roster, the Tiles of the Holds (pools, words, effects, the reading's
// nodes, the tables, the readers), the title and the patch, the gods, Book Five 'coming' on the shelf, the surgeon's and the cadre's hands
// in Lether's words, the foes; and Books One to Four exactly as they were.
// Usage: node tools/b5engine_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(r => setTimeout(r, ms));
  try {
  /* what the other books already had, before Book Five: their soldiers' abilities and talents (Book Five may only reuse them) */
  const MT = ['tobet', 'thegg', 'perrit', 'ammet', 'ruuk', 'brune', 'pessa'];
  const oldIds = Object.keys(TPL).filter(id => !MT.includes(id));
  const oldAb = new Set(oldIds.flatMap(id => TPL[id].ab || [])), oldTal = new Set([...oldIds.flatMap(id => (PICKS[3][id] || []).map(p => p[0])), ...Object.keys(AB).filter(k => ['quorl','shadowstep','mockra','argument','quickshot','ropeswing'].includes(k))]);
  /* a fresh Book Five game */
  S = newStateMT('Vex'); save();
  out.fresh = {book:S.book, lvl:S.lvl, xp:S.xp, silver:S.silver, squad:S.squad.join(','), due:S.picksDue.join(','), cap:lvCap(), debt:JSON.stringify(S.debt), debt0:JSON.stringify(S.debt0), chapter:S.chapter, imported:!!S.imported, dead:Object.keys(S.dead).length, card:S.card};
  out.reader = visReader().id; out.sgtGod = PATRONS.sgt.god; out.sgtEpi = TPL.sgt.epithet; out.sgtFig = (() => { let k = 'sgt'; if (BOOK === 'mt' && FIGX.sgt_mt) k = 'sgt_mt'; return k; })();
  gainXP(99999); out.capLvl = S.lvl; out.dueAt8 = S.picksDue.slice().join(',');
  /* the squad and its templates */
  const FIELDS = ['name', 'role', 'sig', 'col', 'hp', 'ac', 'atk', 'dmg', 'rng', 'mv', 'init', 'st', 'ab', 'epithet', 'origin', 'age', 'service', 'height', 'weapon', 'armour', 'bio', 'bio2', 'traits', 'gear', 'quest', 'banter', 'rel'];
  out.tpl = MT.map(id => { const t = TPL[id], miss = FIELDS.filter(f => t[f] == null || t[f] === '');
    const relMiss = MT.filter(o => o !== id && !(t.rel || {})[o]);
    const abNew = (t.ab || []).filter(a => !oldAb.has(a) || !AB[a]), talNew = (PICKS[3][id] || []).map(p => p[0]).filter(k => !oldTal.has(k));
    return {id, miss, relMiss, banter:(t.banter || []).length, verb:!!VERB[id], statup:(STATUP[id] || []).length, picks:(PICKS[3][id] || []).length, abNew, talNew, fig:!!FIGX[id], por:!!POR[id], roles:!!TPL_ROLES[id]}; });
  out.sizes = MT.map(id => `${id}:${TPL[id].hp}/${TPL[id].ac}/${TPL[id].atk}`).join(' ');
  out.porSgt = !!POR.sgt_mt && !!FIGX.sgt_mt;
  out.healer = HEALER(); out.he = MT.map(id => `${id}:${b5He(id)}`).join(',');
  /* the surgeon's and the cadre's hands, in Lether's words; the same abilities elsewhere */
  out.names = {mend:AB.mend.name, wash:AB.wash.name, stanch:AB.stanch.name, bolt:AB.b4_bolt.name, gust:AB.b4_gust.name, hook:AB.grapple.name, lance:AB.b2_lance.name, mendDesc:/no sorcery/.test(AB.mend.desc())};
  { const S0 = S; S = newState('Hask'); out.namesGotm = {mend:AB.mend.name, hook:AB.grapple.name, bolt:AB.b4_bolt.name}; S = S0; }
  /* a test ground: Ammet's Needle and Gut in a thin warren is not thinned, and the log tells it as surgery */
  BATTLES.__b5 = {title:'A test ground', warrenText:'', warren:{meanas:.5, denul:.5}, map:['........', '........', '........', '........', '........', '........', '........', '........', '........', '........'],
    party:[[2,8],[3,8],[4,8],[5,8],[3,9],[4,9]], foes:[['b5_edur',3,1],['b5_wraith',5,0]], xp:10, after:'__b5after'};
  DLG.__b5after = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  S = newStateMT('Mend'); S.lvl = 3; S.xp = LEVELS[2]; save();
  startBattle('__b5', {}); for (let i = 0; i < 40 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100);
  B.busy = true; B.over = true; const am = B.units.find(u => u.id === 'ammet'), tb = B.units.find(u => u.id === 'tobet'); tb.hp = 1; B.cur = am;
  const _rnd = Math.random; Math.random = () => .9999; // the most the needle can do, so thinning would show
  try { AB.mend.run(am, tb.x, tb.y); } finally { Math.random = _rnd; }
  out.mend = {healed:tb.hp - 1, expect:Math.min(tb.maxhp, 12 + 3 + lvB()) , log:String(B.log[0]), warren:B.warren.denul};
  out.edurLog = B.log.some(l => /Tiste Edur|wraith/i.test(String(l))) || true;
  /* Debt */
  S = newStateMT('Debt'); S.silver = 50; save();
  out.d = {total0:b5DebtTotal(), tobet0:b5Debt('tobet'), stand0:b5Standing('tobet')};
  out.d.paid = b5Pay('tobet', 30, 'A test'); out.d.silverAfter = S.silver; out.d.tobet1 = b5Debt('tobet');
  out.d.payNone = (S.silver = 0, b5Pay('tobet', 10)); S.silver = 50;
  const l0 = S.loy.ammet; b5Forgive('ammet', 100, 'A bounty'); out.d.ammetEase = b5Standing('ammet'); out.d.loyEase = S.loy.ammet - l0;
  b5Forgive('ammet', 999); out.d.ammetFree = b5Standing('ammet'); out.d.loyFree = S.loy.ammet - l0; out.d.freedFlag = !!S.f.b5_freed_ammet;
  const lt = S.loy.thegg; b5Owe('thegg', 80, 'Drink'); out.d.theggPress = b5Standing('thegg'); out.d.loyPress = S.loy.thegg - lt; out.d.collectors = S.f.b5_collectors; out.d.list = b5Collectors().join(',');
  b5Owe('thegg', 200); out.d.theggDrown = b5Standing('thegg'); out.d.drownRisk = !!S.f.b5_drownRisk;
  S.chapter = 1; out.d.threat1 = b5DrowningThreat(); S.chapter = 4; out.d.threat4 = b5DrowningThreat(); S.chapter = 7; out.d.threat7 = b5DrowningThreat();
  b5Owe('thegg', 50); out.d.loyOnce = S.loy.thegg - lt; // the collectors' line is crossed once
  out.d.html = /Thegg/.test(debtHTML('The road')) && /owed/.test(debtHTML('The road'));
  out.d.sgt = b5Owe('sgt', 10) === 10 && b5Debt('sgt') === 350;
  /* the dead's debt passes to the heirs, and the squad is not charged */
  const before = b5DebtTotal(), owedT = b5Debt('tobet'), silver0 = S.silver; kill('tobet');
  out.d.heirs = (S.f.b5_heirs || {}).tobet; out.d.owedT = owedT; out.d.totalAfter = b5DebtTotal(); out.d.totalExpect = before - owedT; out.d.silverSame = S.silver === silver0;
  out.d.journal = journalNotes()[0]; out.d.stats = statsRows(S).map(r => r[0]).join('|');
  /* the HUD: docks, and the debt pill */
  S = newStateMT('Hud'); S.scene = 'explore'; save(); startExplore(); await wait(150); updSilver(); out.hud = {silver:($('#silver') || {}).textContent || '', pill:($('#chainp') || {}).textContent || ''};
  /* the squad sheet shows the debt */
  openChars(1); out.sheet = {debt:!!document.querySelector('.b5debt'), txt:(document.querySelector('.b5debt') || {}).textContent || ''}; closeChars(); openChars(0, 'story'); out.sheetSgt = !!document.querySelector('.b5debt'); closeChars();
  /* the recruits, through the roster */
  S = newStateMT('Rec'); S.lvl = 4; S.xp = LEVELS[3]; save();
  out.rec = {can:B5_RECRUITS.map(id => b5CanRecruit(id)).join(','), joinR:b5Join('ruuk'), squad1:S.squad.join(','), debtR:b5Debt('ruuk'), joinB:b5Join('brune'), squad2:S.squad.join(','), joinP:b5Join('pessa'), pWaits:b5Waiting('pessa'), camp:(S.camp || []).join(','), offers:b5Offers().join(',')};
  out.rec.swap = b5SwapIn('pessa'); out.rec.squad3 = S.squad.join(','); out.rec.campAfter = (S.camp || []).join(','); out.rec.core = ROSTER_BOOKS.mt.core.join(',');
  out.rec.cantCore = !rosterCanOut('perrit'); out.rec.lacks = rosterLacks().join(',');
  S.f.b5_bruneDone = 0; out.rec.sentAway = b5CanRecruit('brune');
  /* disarmed at High Fort, rearmed at the cache: weapons only, to whoever wore them; a fresh save gets the fallback */
  S = newStateMT('Arms'); S.lvl = 5; S.xp = LEVELS[4]; save();
  { const ws = Object.keys(ITEMS).filter(k => ITEMS[k].slot === 'weapon'), w1 = ws.find(k => canWear('thegg', k)), w2 = ws.find(k => k !== w1 && canWear('tobet', k)), w3 = ws.find(k => k !== w1 && k !== w2);
    const tr = Object.keys(ITEMS).find(k => ITEMS[k].slot === 'trinket' && canWear('perrit', k));
    S.kit = [w1, w2, w3, tr]; S.gear.thegg = {weapon:w1}; S.gear.tobet = {weapon:w2}; S.gear.perrit = {trinket:tr};
    const n1 = b5Disarm(), st1 = JSON.stringify(S.f.b5_stash), n2 = b5Disarm();
    out.arms = {n1, n2, stash:S.f.b5_stash.slice().sort().join(','), want:[w1, w2, w3].sort().join(','), same:st1 === JSON.stringify(S.f.b5_stash), flag:S.f.b5_disarmed,
      kit:S.kit.join(','), tr, worn:!!(S.gear.thegg.weapon || S.gear.tobet.weapon), trinket:S.gear.perrit.trinket === tr};
    startBattle('__b5', {}); for (let i = 0; i < 40 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100); B.busy = true; B.over = true;
    out.arms.fights = B.units.filter(u => u.side === 'p' && !u.ally).every(u => u.atk > 0 && u.dmg && u.dmg[1] > 0);
    const give = b5Rearm(['b5_nothere']); out.arms.give = give.slice().sort().join(','); out.arms.back = S.gear.thegg.weapon === w1 && S.gear.tobet.weapon === w2;
    out.arms.flags = `${!!S.f.b5_disarmed}/${S.f.b5_rearmed}`; out.arms.again = b5Rearm([w1]).length; out.arms.kitBack = [w1, w2, w3, tr].every(k => S.kit.includes(k));
    S = newStateMT('Arms2'); S.kit = []; b5Disarm(); const fb = b5Rearm([w3, 'b5_nothere']); out.arms.fallback = fb.join(',') === w3 && S.kit.includes(w3); out.arms.w3 = w3;
    S = newStateMT('Arms3'); out.arms.notDisarmed = b5Rearm([w3]).length; }
  /* a Whitefinder regular on the squad's side, grown with the squad */
  BATTLES.__b5reg = Object.assign({}, BATTLES.__b5, {allies:[['b5_regular', 6, 8]]});
  S = newStateMT('Reg'); S.lvl = 6; S.xp = LEVELS[5]; save(); startBattle('__b5reg', {}); for (let i = 0; i < 40 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100); B.busy = true; B.over = true;
  { const a = B.units.find(u => u.id === 'ally_b5_regular'); out.reg = a ? {side:a.side, ally:!!a.ally, hp:a.maxhp, base:FOES.b5_regular.hp, lvB:lvB(), atk:a.atk, fig:!!FIGX[FOES.b5_regular.kind], name:a.name} : null; }
  /* the pay desk: each debtor while the squad has docks, back to the desk; "Not now." to the fire */
  S = newStateMT('Pay'); S.silver = 25; save();
  DLG.__b5desk = () => ({sp:'The clerk', txt:'The paybooks.', html:debtHTML('The desk'), ch:b5PayChoices('__b5back')}); DLG.__b5back = () => ({sp:'Back', txt:'The fire.', ch:[{t:'Leave'}]});
  talk('__b5desk'); await wait(50);
  { const shown = () => [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent);
    const c0 = shown(); out.pay = {c0:c0.length, last:c0[c0.length - 1], tobet10:c0.some(t => /^10 docks on Tobet['’]s debt\.$/.test(t)), allSgt:c0.some(t => /^All we can on your debt\.$/.test(t)), html:/The desk/.test(document.querySelector('#sheet').innerHTML)};
    const t0 = b5Debt('tobet'); [...document.querySelectorAll('#sheet .choice')].find(b => /on Tobet['’]s/.test(b.textContent)).click(); await wait(80);
    out.pay.tobet = t0 - b5Debt('tobet'); out.pay.silver = S.silver; out.pay.node = S.node;
    [...document.querySelectorAll('#sheet .choice')].find(b => /^All we can on Ammet['’]s/.test(b.textContent)).click(); await wait(80);
    out.pay.silver2 = S.silver; const c2 = shown(); out.pay.c2 = c2.join('|');
    [...document.querySelectorAll('#sheet .choice')].find(b => /Not now/.test(b.textContent)).click(); await wait(80); out.pay.after = S.node; closeSheet(); }
  /* the readers: Perrit, else the tile-woman */
  S = newStateMT('Read'); S.squad = S.squad.filter(x => x !== 'perrit'); out.reader2 = visReader().id; S = newStateMT('Read2');
  /* the tiles */
  const bannedTile = /\b(Tiam|Draconus|Rake|Hood|K'rul|Errant|Errastas|Saddick|Knight of Shadows|Korabas|Elder)\b/;
  out.tiles = {n:Object.keys(B5TILES).length, pools:Object.keys(B5POOL).length, poolOk:Object.values(B5POOL).every(p => p.length === 5 && p.every(id => CARDS[id] && B5SAY[id])),
    lean:Object.values(B5POOL).every(p => p[0] === p[1] && p[1] === p[2]), fx:Object.values(B5TILES).every(t => ['armour', 'hp', 'heal', 'hit', 'ward', 'move', 'finish'].includes(t.b5fx) && t.fx && t.house),
    named:[...Object.values(B5TILES).map(t => t.name + ' ' + t.txt), ...Object.keys(B5SAY).flatMap(id => [b5TileSay(id)])].filter(x => bannedTile.test(x)).map(x => x.slice(0, 50)),
    houses:[...new Set(Object.values(B5TILES).map(t => t.house))].sort().join('|')};
  S.card = 'b5t_wall'; S.chapter = 4; startBattle('__b5', {}); for (let i = 0; i < 40 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100); B.busy = true; B.over = true;
  { const p = B.units.find(u => u.id === 'thegg'), e = B.units.find(u => u.side === 'e'); const ac1 = atkCalc(e, p).ac; S.card = null; const ac0 = atkCalc(e, p).ac; S.card = 'b5t_throne'; const h1 = atkCalc(p, e).bonus; S.card = null; const h0 = atkCalc(p, e).bonus;
    S.card = 'b5t_watcher'; const w1 = atkCalc(e, p).bonus; S.card = null; const w0 = atkCalc(e, p).bonus;
    S.card = 'b5t_heartstone'; const hp1 = mkParty('thegg', 0, 0).maxhp; S.card = 'b5t_gate'; const mv1 = mkParty('thegg', 0, 0).mv; S.card = null; const hp0 = mkParty('thegg', 0, 0).maxhp, mv0 = mkParty('thegg', 0, 0).mv;
    out.tileFx = {armour:ac1 - ac0, hit:h1 - h0, ward:w1 - w0, hp:hp1 - hp0, move:mv1 - mv0}; }
  S.card = 'b5t_wall'; startBattle('__b5', {}); await wait(200); out.tileLog = B.log.some(l => /The Wall:/.test(String(l))); B.busy = true; B.over = true;
  S = newStateMT('Tile'); S.chapter = 1; save();
  const ch = b5TileChoice(1), off = b5TileOffer(1); out.offer = {t:ch.t, go:ch.go, req:ch.req(), sp:off.sp, scene:off.scene, choices:off.ch.map(c => c.t).join('|'), txt:/black stone/.test(off.txt)};
  off.ch[0].fx(); out.drawn = {card:S.card, inPool:B5POOL[1].includes(S.card), flag:S.f.b5_c1_drawn, reader:S.f.b5_c1_reader};
  const cardN = b5TileCard(1); out.cardNode = {sp:cardN.sp, oncard:cardN.oncard[0], after:cardN.after.length > 40, html:/icard/.test(cardN.html)};
  out.cardNodeName = cardNodeName(); out.keyFlag = keyFlag();
  out.tables = [1, 2, 3, 4, 5, 6, 7].map(n => { S.chapter = n; return readingTableKey(); }).join(',') + ':' + [1, 2, 3, 4, 5, 6, 7].every(n => READTABLE['mt:' + n]);
  out.vis = {kick:visKick(), tiles:visTiles()};
  /* the gods */
  out.gods = ['perrit', 'thegg', 'brune'].map(id => `${PATRONS[id].god}:${BOONS[PATRONS[id].god] && BOONS[PATRONS[id].god].key}:${!!ART['patrons/' + PATRONS[id].sig]}`).join(',') + ';' + `${PATRONS.sgt.god}:${!!ART['patrons/errant']}`;
  out.godsTxt = ['perrit', 'thegg', 'brune', 'sgt'].map(id => PATRONS[id].txt(id)).filter(x => /Errastas|Elder|Seregahl|Crippled|!/.test(x));
  /* the foes */
  out.foes = Object.keys(FOES).filter(k => /^b5_/.test(k)).map(k => `${k}:${!!(FIGX[FOES[k].kind] || ['bruiser', 'thug'].includes(FOES[k].kind))}`);
  /* the glossary keeps to what may be said */
  const G = Object.fromEntries(GLOSSX.mt.map(g => [g[1], g[2]])); out.gloss = {bugg:G.Bugg, brizad:G['Turudal Brizad'], yan:G['Yan Tovis'], n:GLOSSX.mt.length, errant:G['The Errant']};
  GLOSSX.mt.forEach(g => { if (g[3]) g[3](); });
  /* the keys, the road map, the backdrops */
  out.keys = JSON.stringify(B5KEYS); out.scenes = ['b5_barracks', 'b5_trate_harbour', 'b5_landing', 'b5_highfort', 'b5_road_south', 'b5_branskeep', 'b5_letheras', 'b5_march', 'b5_march_dusk'].every(k => SCENES[k] && SCENEX[k]);
  { const cv = document.createElement('canvas'); cv.style.width = '300px'; cv.style.height = '200px'; document.body.appendChild(cv); S.chapter = 4; drawRoute(cv, S, 0); out.route = cv.width > 0; cv.remove(); }
  out.fin = {endline:FIN_L.endline, role:FIN_L.sgtRole};
  /* the title: off the shelf, out of the picker, dressed by name, Begin refused */
  out.art = {title:!!ART['title/mt'] && ART_SIZE['title/mt'].join('x'), patch:!!ART['insignia/mt'], vi:/>VI</.test(ART['insignia/mt']), flameRight:/translate\(88 -110\)/.test(ART['insignia/mt']), titleArt:BOOKS.mt.titleArt};
  S = null; showTitle(); await wait(200); out.shelf = [...document.querySelectorAll('[data-shelf]')].map(b => b.dataset.shelf).join(',');
  showTitle(false, 'dg'); await wait(200); out.picker = [...document.querySelectorAll('.bseg [data-book]')].map(b => b.dataset.book).join(',');
  showTitle(false, 'mt'); await wait(200); out.mtTitle = {name:$('#tName').textContent, tag:$('#tTag').textContent, patch:$('#tPatch').dataset.book, picker:[...document.querySelectorAll('.bseg [data-book]')].map(b => b.dataset.book).join(','), imp:!$('#impField').hidden, blurb:$('#bBlurb').textContent};
  out.hasCh = Object.keys((BOOKSNAP.mt && BOOKSNAP.mt.ch) || {}).length;
  $('#nm').value = 'Newer'; $('#bNew').click(); await wait(200); out.begin = {msg:($('#nmMsg') || {}).textContent || '', view, S:!!S, book:S && S.book};
  out.coming = BOOKS.mt.coming; out.credit = titleCredit();
  /* Books One to Four exactly as they were */
  const back = {};
  setBook('gotm'); S = newState('One'); back.gotm = {god:PATRONS.sgt.god, mend:AB.mend.name, card:CARDBOOK && CARDBOOK.square ? CARDBOOK.square() : false, key:keyFlag(), silver:(updSilver(), 'ok'), lacks:rosterLacks().includes('munitions') || true, cardNode:cardNodeName()};
  setBook('dg'); S = newStateDG('Two'); back.dg = {god:PATRONS.sgt.god, epi:TPL.sgt.epithet, reader:visReader().id, key:keyFlag(), lvl:lvCap(), hook:AB.grapple.name, kick:visKick()};
  setBook('moi'); S = newStateMOI('Three'); back.moi = {god:PATRONS.sgt.god, reader:visReader().id, cap:lvCap(), key:keyFlag()};
  setBook('hoc'); S = newStateHOC('Four'); back.hoc = {god:PATRONS.sgt.god, reader:visReader().id, cap:lvCap(), squad:S.squad.join(','), key:keyFlag(), card:CARDBOOK.square(), done:CARDBOOK.done(), epi:TPL.sgt.epithet};
  setBook('mt'); S = newStateMT('Five'); back.mt = {epi:TPL.sgt.epithet}; setBook('dg'); back.dgAgain = TPL.sgt.epithet; setBook('gotm');
  out.back = back;
  } catch (e) { out.err = e.stack; }
  return out;
});
const R = r;
if (R.err) no('page script threw: ' + R.err);
else {
const F = R.fresh;
F.book === 'mt' && F.lvl === 1 && F.xp === 0 && F.cap === 8 && R.capLvl === 8 && F.due === '' && F.chapter === 0 && !F.imported && F.dead === 0 && F.silver === 12 ? ok('a fresh Book Five game: level 1, cap 8, nothing carried in, 12 docks') : no('fresh ' + JSON.stringify(F) + ' cap ' + R.capLvl);
R.dueAt8 === '3,5,7' ? ok('Book Two\'s curve and its picks: the talent at 3, the veterans\' picks at 5 and 7') : no('picks due at 8: ' + R.dueAt8);
F.squad === 'sgt,tobet,thegg,perrit,ammet' ? ok('the squad: the sergeant, Tobet, Thegg, Perrit and Ammet') : no('squad ' + F.squad);
F.debt === F.debt0 && /"tobet":900/.test(F.debt) && /"sgt":340/.test(F.debt) ? ok('every soldier starts with a debt, the sergeant too: ' + F.debt) : no('debts ' + F.debt + ' / ' + F.debt0);
R.reader === 'perrit' && R.reader2 === 'tilewoman' ? ok('Perrit reads the tiles; without her, the tile-woman') : no('readers ' + R.reader + ' / ' + R.reader2);
R.sgtGod === 'the Errant' && /Whitefinder/.test(R.sgtEpi) && R.sgtFig === 'sgt_mt' && R.porSgt ? ok('the sergeant: the Errant answers, Sixth Company of the Whitefinders, a Letherii figure and bust') : no('sgt ' + R.sgtGod + ' ' + R.sgtEpi + ' ' + R.sgtFig);
const tplBad = R.tpl.filter(t => t.miss.length || t.relMiss.length || t.banter < 3 || !t.verb || t.statup !== 2 || t.picks !== 2 || !t.fig || !t.por || !t.roles);
!tplBad.length ? ok('all seven soldiers carry the full template: every field, three banter lines, a relation to each of the others, VERB, STATUP, two talents, a figure, a bust and gear roles') : no('templates ' + JSON.stringify(tplBad));
const mechNew = R.tpl.filter(t => t.abNew.length || t.talNew.length);
!mechNew.length ? ok('no new combat mechanics: every ability and talent is one another book\'s soldiers already have') : no('new mechanics ' + JSON.stringify(mechNew.map(t => [t.id, t.abNew, t.talNew])));
console.log('info  base sizes ' + R.sizes);
R.healer === 'ammet' && R.he === 'tobet:he,thegg:he,perrit:she,ammet:she,ruuk:he,brune:she,pessa:she' ? ok('Ammet is the squad\'s healer; the pronouns are fixed (the sergeant has none)') : no('healer ' + R.healer + ' he ' + R.he);
R.names.mend === 'Needle and Gut' && R.names.wash === 'The Rounds' && R.names.stanch === 'Tourniquet' && R.names.hook === 'Boathook' && R.names.lance === 'The Fish-Spear' && /Lightning/.test(R.names.bolt) && R.names.mendDesc && R.namesGotm.mend === 'Mend' && R.namesGotm.hook === 'Grappling Hook' && R.namesGotm.bolt === 'Sky-Fire' ? ok('in Book Five the old abilities wear Lether\'s words (Needle and Gut, the Rounds, the Boathook, the cadre\'s lightning); elsewhere their own') : no('names ' + JSON.stringify([R.names, R.namesGotm]));
R.mend.healed === R.mend.expect && /needle and gut/.test(R.mend.log) && R.mend.warren === .5 ? ok(`surgery is not sorcery: in a thin warren Ammet's needle heals in full (${R.mend.healed}), and the log says needle and gut`) : no('mend ' + JSON.stringify(R.mend));
const D = R.d;
D.paid === 30 && D.silverAfter === 20 && D.tobet1 === 870 && D.payNone === 0 ? ok('b5Pay pays a debt down out of the squad\'s docks, and nothing when there are none') : no('pay ' + JSON.stringify(D));
D.ammetEase === 'easing' && D.loyEase === 1 && D.ammetFree === 'free' && D.loyFree === 2 && D.freedFlag ? ok('paying down past half is loyalty +1, paid up is +1 more (once each)') : no('ease ' + JSON.stringify(D));
D.theggPress === 'pressed' && D.loyPress === -1 && D.collectors === 1 && D.list === 'thegg' && D.loyOnce === -1 ? ok('a debt grown past 1.25× brings the collectors: loyalty −1, once') : no('press ' + JSON.stringify(D));
D.theggDrown === 'drowning' && D.drownRisk && D.threat1 && !D.threat4 && D.threat7 ? ok('at 1.5× the canal is talked of, and in Letheras (Chapters 1 and 7) a Drowning is threatened') : no('drown ' + JSON.stringify(D));
D.html && D.sgt ? ok('the widget shows the debts; the sergeant owes too') : no('html/sgt ' + JSON.stringify(D));
D.heirs === D.owedT && D.totalAfter === D.totalExpect && D.silverSame ? ok(`a dead soldier's debt passes to the heirs (${D.heirs} docks), off the squad's total, and costs the squad nothing`) : no('heirs ' + JSON.stringify(D));
/debts/.test(D.journal) && /heirs/.test(D.journal) && /Docks earned/.test(D.stats) && /debts, now/.test(D.stats) && !/Munitions/.test(D.stats) ? ok('the journal and the count tell the debts; the count says docks') : no('journal ' + D.journal + ' stats ' + D.stats);
/docks/.test(R.hud.silver) && /Debt/.test(R.hud.pill) ? ok(`the HUD counts docks and the squad's debt (${R.hud.silver} · ${R.hud.pill})`) : no('hud ' + JSON.stringify(R.hud));
R.sheet.debt && /Owed/.test(R.sheet.txt) && R.sheetSgt ? ok('the squad sheet shows each soldier\'s debt') : no('sheet ' + JSON.stringify(R.sheet));
const C = R.rec;
C.can === 'true,true,true' && C.joinR && C.debtR === 40 && C.squad1 === 'sgt,tobet,thegg,perrit,ammet,ruuk' && C.joinB === false && C.joinP === false && C.pWaits && /brune/.test(C.camp) && /pessa/.test(C.offers) ? ok('the recruits: Ruuk walks (with his own debt); with six walking, Brune and Pessa wait at camp') : no('recruits ' + JSON.stringify(C));
C.swap && /pessa/.test(C.squad3) && !/ruuk/.test(C.squad3) && /ruuk/.test(C.campAfter) && C.core === 'sgt,tobet,thegg,perrit,ammet' && C.cantCore && !C.sentAway ? ok('the roster swaps a recruit for one waiting; the four always walk; a recruit sent away is not offered') : no('swap ' + JSON.stringify(C));
!/munitions/.test(C.lacks) ? ok('the roster does not count a missing sapper against Lether') : no('lacks ' + C.lacks);
const A = R.arms;
A.n1 === 3 && A.n2 === 0 && A.same && A.stash === A.want && A.flag === 1 && A.kit === A.tr && !A.worn && A.trinket ? ok('b5Disarm: every weapon off every soldier and out of the kit into the stash; trinkets stay; a second call changes nothing') : no('disarm ' + JSON.stringify(A));
A.fights ? ok('disarmed, the squad still fights with its base attacks (knives and staves)') : no('disarmed fight ' + JSON.stringify(A));
A.give === A.want && A.back && A.kitBack && A.flags === 'false/1' && A.again === 0 && A.fallback && A.notDisarmed === 0 ? ok('b5Rearm: the stash comes back to whoever wore it (not the fallback); an empty stash gives the fallback that exists; once only') : no('rearm ' + JSON.stringify(A));
const RG = R.reg;
RG && RG.side === 'p' && RG.ally && RG.hp === RG.base + 3 * RG.lvB && RG.fig && /Whitefinder regular/.test(RG.name) ? ok(`FOES.b5_regular fights on the squad's side and grows with it (${RG.hp} health at level 6)`) : no('regular ' + JSON.stringify(RG));
const P = R.pay;
P.tobet10 && P.allSgt && /Not now\./.test(P.last) && P.html && P.tobet === 10 && P.silver === 15 && P.node === '__b5desk' && P.silver2 === 0 && !/on /.test(P.c2.replace(/.Not now\../, '')) && P.after === '__b5back' ? ok('b5PayChoices: 10 docks or all we can on each debt, back to the desk; with no docks only "Not now.", which goes back') : no('pay desk ' + JSON.stringify(P));
const T = R.tiles;
T.n === 16 && T.pools === 7 && T.poolOk && T.lean && T.fx ? ok('sixteen tiles of the Holds; seven pools, each leaning to one tile, every tile with words and an effect another card already has') : no('tiles ' + JSON.stringify(T));
!T.named.length ? ok('rule 41: no tile, and no reader\'s words, names a being or is the Errant, Saddick or the Knight of Shadows') : no('tiles name ' + JSON.stringify(T.named));
T.houses === 'The Azath Hold|The Beast Hold|The Dragon Hold|The Empty Hold|The Fulcra|The Hold of Ice|The Holds' ? ok('the tiles come from the canon Holds: ' + T.houses) : no('houses ' + T.houses);
R.tileFx.armour === 1 && R.tileFx.hit === 1 && R.tileFx.ward === -1 && R.tileFx.hp === 4 && R.tileFx.move === 1 && R.tileLog ? ok('the drawn tile works in every fight of the chapter, and the fight says so: ' + JSON.stringify(R.tileFx)) : no('tile fx ' + JSON.stringify(R.tileFx) + ' log ' + R.tileLog);
R.offer.go === 'b5_c1_tiles' && R.offer.req && /tiles/.test(R.offer.t) && R.offer.txt && R.offer.choices === 'Let her lay them.|"Not now."' && R.drawn.inPool && R.drawn.flag === 1 && R.drawn.reader === 'perrit' ? ok('a reading: the choice, the offer (and "Not now"), the tile dealt from the chapter\'s pool') : no('offer ' + JSON.stringify([R.offer, R.drawn]));
R.cardNode.sp === 'The Tiles of the Holds' && R.cardNode.html && R.cardNode.after && R.cardNodeName === 'b5_c1_card' && R.keyFlag === 'b5_c1_key' ? ok('the tile node, and Book Five\'s card node and key flag (b5_c1_card, b5_c1_key)') : no('node ' + JSON.stringify([R.cardNode, R.cardNodeName, R.keyFlag]));
R.tables === 'mt:1,mt:2,mt:3,mt:4,mt:5,mt:6,mt:7:true' && R.vis.kick === 'Through the Tiles' ? ok('seven reading places resolve to their tables; the visions are "Through the Tiles"') : no('tables ' + R.tables + ' ' + JSON.stringify(R.vis));
R.gods === 'the Empty Hold:hold:true,the Tarthenal dead:tarthenal:true,the Shore:shore:true;the Errant:true' && !R.godsTxt.length ? ok('the gods: the Errant, the Empty Hold, the Tarthenal dead and the Shore, each a boon and a sigil, none named past what Lether knows') : no('gods ' + R.gods + ' ' + JSON.stringify(R.godsTxt));
R.foes.filter(f => !/^b5_c\d_/.test(f)).length === 13 && R.foes.every(f => /true$/.test(f)) ? ok('thirteen foes for later chapters (Edur, unblooded, K\'risnan, wraith, Jheck, demon; deserters, bullies, a press-gang; and the Whitefinder regular on the squad\'s side), and every chapter\'s own, each with a figure') : no('foes ' + R.foes.join(' '));
R.gloss.bugg === 'Tehol Beddict\'s manservant, a builder. People in Letheras know the name the way they know a bridge.' && /^The Queen's First Consort\./.test(R.gloss.brizad) && /^The Atri-Preda at Fent Reach/.test(R.gloss.yan) && !/Errastas|Elder|Consort/.test(R.gloss.errant) ? ok(`the glossary keeps the canon open (Bugg, Turudal Brizad, Yan Tovis, the Errant; ${R.gloss.n} rows)`) : no('gloss ' + JSON.stringify(R.gloss));
R.keys === JSON.stringify({1:['pay', 'swim'], 2:['salvage', 'dead'], 3:['watch', 'warn'], 4:['hold', 'run'], 5:['sign', 'refuse'], 6:['stand', 'fallback'], 7:['emperor', 'paid', 'ledger']}) && R.scenes && R.route && /Indebted/.test(R.fin.endline) && /Whitefinder/.test(R.fin.role) ? ok('B5KEYS, the reading places\' backdrops, the road map and the finale defaults') : no('keys/scenes ' + JSON.stringify([R.keys, R.scenes, R.route, R.fin]));
R.art.title === '1600x900' && R.art.patch && R.art.vi && R.art.flameRight && R.art.titleArt === 'title/mt' ? ok('the painted title and the coin-shaped patch (VI, the flame on the right)') : no('art ' + JSON.stringify(R.art));
if (R.hasCh) R.shelf.includes('mt') ? ok('Book Five is on the shelf with chapters written') : no('shelf ' + R.shelf);
else R.shelf === 'gotm,dg,moi,hoc' && R.picker === 'gotm,dg,moi,hoc' && R.coming ? ok('Book Five is coming: off the shelf and the picker while no chapter is registered') : no('shelf ' + R.shelf + ' picker ' + R.picker);
R.mtTitle.name === 'Indebted' && /Lether counts everything/.test(R.mtTitle.tag) && R.mtTitle.patch === 'mt' && /mt/.test(R.mtTitle.picker) && !R.mtTitle.imp && (R.hasCh ? /so far|All seven|Plays on its own\.$/.test(R.mtTitle.blurb) : /being written/.test(R.mtTitle.blurb)) ? ok('asked for by name, the title dresses for Book Five (Indebted, its line, its patch); nothing to bring across') : no('mt title ' + JSON.stringify(R.mtTitle));
if (!R.hasCh) /Book Five is still being written/.test(R.begin.msg) && R.begin.view === 'title' && !R.begin.S ? ok('Begin Book Five says it is still being written and stays on the title') : no('begin ' + JSON.stringify(R.begin));
(R.hasCh ? /Midnight Tides/.test(R.credit) : !/Five|Midnight/.test(R.credit)) ? ok('the title\'s credit counts only the books on the shelf: ' + R.credit) : no('credit ' + R.credit);
const BK = R.back;
BK.gotm.god === 'Fener' && BK.gotm.mend === 'Mend' && !BK.gotm.card && BK.gotm.key === 'c0_key' && BK.gotm.cardNode === 'c0_card' ? ok('Book One as it was: Fener, Mend, cards not tiles') : no('gotm ' + JSON.stringify(BK.gotm));
BK.dg.god === 'Fener' && /Hissar/.test(BK.dg.epi) && BK.dg.reader === 'marrow' && BK.dg.key === 'b2_c0_key' && BK.dg.lvl === 8 && BK.dg.hook === 'Grappling Hook' && BK.dg.kick === 'Through the Deck' && /Hissar/.test(BK.dgAgain) ? ok('Book Two as it was, before and after Book Five was opened') : no('dg ' + JSON.stringify(BK.dg) + ' ' + BK.dgAgain);
BK.moi.god === 'Treach' && BK.moi.cap === 15 && BK.moi.key === 'b3_c0_key' ? ok('Book Three as it was: Treach, cap 15') : no('moi ' + JSON.stringify(BK.moi));
BK.hoc.god === 'Treach' && BK.hoc.reader === 'marrow' && BK.hoc.cap === 15 && BK.hoc.squad.startsWith('sgt,haddat,tangle,marrow') && BK.hoc.key === 'b4_c0_key' && !BK.hoc.card && BK.hoc.done === 'Put the cards away' && /9th Legion/.test(BK.hoc.epi) && /Whitefinder/.test(BK.mt.epi) ? ok('Book Four as it was: Treach, Marrow reads cards, the 9th\'s sergeant') : no('hoc ' + JSON.stringify(BK.hoc) + ' mt ' + JSON.stringify(BK.mt));
}
errors.length ? no('page errors: ' + errors.join(' | ')) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b5engine: FAIL (${bad.length})` : 'b5engine: all ok'); process.exit(bad.length ? 1 : 0);
