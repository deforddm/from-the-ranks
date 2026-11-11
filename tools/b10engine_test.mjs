// v13.0: Book Ten's engine (docs/v13.0-notes.md). Two squads taking turns in one save: the Third (Ch 1, 3, 5, 7; fresh 24, cap 28) and
// Book Nine's Letherii (Ch 2, 4, 6; fresh 16, cap 20), each with its own levels; the swap at startChapter; the transfers from a finished
// Book Nine (its Third on 'adjunct' or 'south', its Letherii on 'escort' or 'adjunct'; 'home' starts fresh; Book Nine's Witness beats carry
// into the new track; Rations become one line) and Book Eight's Fourth on 'east' (else a canon-default Fourth), coming as allies in Ch 7;
// Witness (moves, tiers, the wear, the beats, edges, the neutral fight table, the roads it opens); thirst as a scene cost; the gods (Treach,
// the Errant in Ch 2 only and quiet after, the Guardians for Hood's, the Shore quiet); the recruits; the readers by squad; the foes; the
// series coda with saves from several books; the title, the patch and the new-sergeant screen; the shelf (coming until a chapter registers).
// Usage: node tools/b10engine_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(async () => { const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  try {
  localStorage.clear(); localStorage.setItem('from-the-ranks-seen', '9.9.9');
  out.caps = ['gotm', 'dg', 'moi', 'hoc', 'mt', 'bh', 'tth'].map(b => { S = {book:b}; return b + ':' + lvCap(); }).join(' ');
  S = {book:'dod', thread:'t'}; out.dodT = lvCap(); S = {book:'dod', thread:'l'}; out.dodL = lvCap();
  S = {book:'tcg', thread:'t'}; out.capT = lvCap(); S = {book:'tcg', thread:'l'}; out.capL = lvCap();
  out.levels = LEVELS.length; out.lv = [LEVELS[24], LEVELS[27]].join(','); out.dmg = [24, 25, 28].map(l => lvDmg(l)).join(','); out.ac = [24, 26, 27].map(l => lvAc(l)).join(',');
  out.coming = !!BOOKS.tcg.coming; out.shelf = shelfBooks().map(b => b.id).join(','); out.tcgCh = Object.keys((BOOKSNAP.tcg && BOOKSNAP.tcg.ch) || {}).length;
  out.book = {n:BOOKS.tcg.n, word:BOOKS.tcg.word, name:BOOKS.tcg.name, title:BOOKS.tcg.title, tag:BOOKS.tcg.tag, h1:BOOKS.tcg.h1.join(' ').trim()};
  /* stub chapters, so startChapter and the finale run (the real ones register from 181-187) */
  setBook('tcg');
  for (let n = 1; n <= 7; n++) if (!CHAPTERS[n]) registerChapter(n, {number:n, title:'Stub', area:{id:'b10_stub' + n, map:['....', '....'], start:{x:1, y:0}}, intro:{loc:'', sub:'', cap:'', paras:[], go:'Go'},
    end:n === 7 ? {colours:['With the colours', 'The Third stayed with the colours.'], kolanse:['In Kolanse', 'The Third stayed.'], home:['Time served', 'The Third went home.']} : undefined,
    finale:n === 7 ? {labels:{endline:'The End of <em>Witnessed</em>', credit:'Steven Erikson and Ian C. Esslemont.'}} : undefined}, 'tcg');
  /* fresh: both halves, the Fourth canon-default */
  S = newStateTCG('Hask', 'Brann'); save(); try { startChapter(1); } catch(e) {}
  out.fresh = {book:S.book, thread:S.thread, name:S.name, lvl:S.lvl, squad:S.squad.join(','), camp:(S.camp || []).join(','), sathi:!!S.dead.sathi, wit:b10Wit(), tier:b10WitTier(), key:keyFlag(), core:rosterBook().core.join(','), patron:PATRONS.sgt.god,
    lName:S.th.l.name, lLvl:S.th.l.lvl, lSquad:S.th.l.squad.join(','), lCamp:S.th.l.camp.join(','), lWit:S.th.l.b10w.n, lMun:S.th.l.inv.cusser, lDebt:!!(S.th.l.debt && S.th.l.debt.tobet), sgtBio:/glass/.test(TPL.sgt.bio2 || ''), look:b10SgtLook(),
    roads:b10TRoad() + ',' + b10LRoad(), fourth:S.b10f.squad.join(','), fLvl:S.b10f.lvl, fName:S.b10f.name, rline:b10RationLine('t')};
  gainXP(9999999); out.topT = S.lvl;
  /* the swap: Chapter 2 is the Letherii's; Chapter 3 the Third's again, and the wear */
  S.chapter = 1; S.lvl = 24; S.xp = LEVELS[23]; notes = []; try { startChapter(2); } catch(e) {}
  out.swap = {thread:S.thread, name:S.name, squad:S.squad.join(','), core:rosterBook().core.join(','), patron:PATRONS.sgt.god, look:b10SgtLook(), wit:b10Wit(), waiting:S.th.t && S.th.t.name, sgtBio:/south/.test(TPL.sgt.bio2 || ''), noMun:!rosterLacks().includes('munitions'), tiles:visTiles(), node:cardNodeName()};
  const abK = Object.keys(B5_ABX).find(k => AB[k] && B5_ABX[k].name); out.swap.hands = abK ? AB[abK].name === B5_ABX[abK].name : true;
  gainXP(9999999); out.topL = S.lvl; out.waitLvl = S.th.t.lvl;
  try { startChapter(3); } catch(e) {}
  out.back = {thread:S.thread, name:S.name, lvl:S.lvl, wit:b10Wit(), lWit:S.th.l.b10w.n, wear:!!S.f.b10_wear3, hands:abK ? AB[abK].name !== B5_ABX[abK].name : true};
  try { startChapter(3); } catch(e) {} out.back.once = b10Wit();
  try { startChapter(4); } catch(e) {} out.gods4 = PATRONS.sgt.god; out.quiet4 = !!PATRONS.sgt.quiet; out.boon4 = patronBoon('sgt'); out.lWear = b10Wit();
  /* Witness */
  S = newStateTCG('Hask', 'Brann'); S.chapter = 1; notes = [];
  const wc = {check:['wits', 12], witness:true}, plain = {check:['wits', 12]};
  const ed = c => (edgesFor(c, 'sgt').find(e => /Witness|Nothing to march/.test(e[0])) || [])[1];
  const e5 = ed(wc); b10Witness(4, 'a find'); const e9 = ed(wc); b10Witness(-2, 'test'); const e7 = ed(wc); b10Witness(-4, 'test'); const e3 = ed(wc); b10Witness(-9, 'test'); const e0 = ed(wc), p0 = ed(plain);
  b10Witness(3); const p3 = ed(plain);
  out.wit = {e5:e5 || 0, e9, e7, e3, e0, p0, p3:p3 || 0, low:S.b10w.lo, hi:S.b10w.hi, tiers:[0, 2, 4, 7, 9].map(v => b10WitTier(v)).join(','), noted:notes.some(n => /Witness \+4 \(a find\)/.test(n.t)), tierNote:notes.some(n => /nothing left to march for/.test(n.t)),
    up:(S.stats || {}).b10WitUp, down:(S.stats || {}).b10WitDown, html:/Witness/.test(witnessHTML()), open:b10RoadOpen('kolanse')};
  b10Witness(5); out.wit.open2 = b10RoadOpen('kolanse') && b10RoadOpen('home');
  /* the beats: one a chapter, the first answer stands, kept +1 / doubt −1 */
  S = newStateTCG('Hask', 'Brann'); S.chapter = 1; const w0 = b10Wit(); out.beat = {a:b10Beat('kept', 'the fire'), b:b10Beat('doubt'), w:b10Wit() - w0, bad:b10Beat('maybe')};
  S.chapter = 3; b10Beat('doubt'); out.beat.c = b10BeatCount('t').kept + ':' + b10BeatCount('t').doubt; out.beat.w2 = b10Wit() - w0; out.beat.none = (() => { const s0 = S; S = {book:'dod'}; const v = b10Beat('kept'); S = s0; return v; })();
  /* the fight table (David, Nov 10): hollow -1 to hit, witnessed +1, the middle tiers 0 */
  S = newStateTCG('Hask', 'Brann'); S.chapter = 1; const a5 = mkParty('haddat', 0, 0).atk; S.b10w.n = 0; const a0 = mkParty('haddat', 0, 0).atk; S.b10w.n = 10; const a10 = mkParty('haddat', 0, 0).atk;
  out.neutral = a0 === a5 - 1 && a10 === a5 + 1 && B10_WITFIGHT.doubt === 0 && B10_WITFIGHT.holding === 0 && B10_WITFIGHT.kept === 0;
  /* thirst */
  S = newStateTCG('Hask', 'Brann'); S.chapter = 3; const th = b10ThirstPick(); out.thirst = {pick:!!th && th !== 'sgt', given:b10Thirst(th), hit:(injuryOf(th) || {}).hit, again:b10Thirst(th), sgt:b10Thirst('sgt')};
  /* the gods */
  S = newStateTCG('Hask', 'Brann'); out.gods = {haddat:PATRONS.haddat && PATRONS.haddat.god, boon:(patronBoon('haddat') || {}).key, sgt:PATRONS.sgt.god};
  S.chapter = 1; try { startChapter(2); } catch(e) {} out.gods.lsgt = PATRONS.sgt.god; out.gods.lboon = (patronBoon('sgt') || {}).key; out.gods.perrit = PATRONS.perrit && PATRONS.perrit.god;
  S.squad.push('brune'); out.gods.brune = PATRONS.brune && PATRONS.brune.quiet && !patronBoon('brune');
  S = {book:'dod', thread:'t'}; out.gods.haddatDod = PATRONS.haddat.god; S = {book:'rg', thread:'t'}; out.gods.haddatRg = PATRONS.haddat.god; setBook('tcg');
  out.gods.recruits = ['pruss', 'tirren'].every(k => !PATRONS[k]);
  /* the transfers */
  const mk = o => { const id = newSid(); localStorage.setItem(slotKey(id), JSON.stringify(Object.assign({v:1, sid:id, f:{}, kit:[], gear:{}, picks:{}, loy:{}, inv:{salve:1, sharper:3}, dead:{}}, o))); const keep = S; S = loadSlot(id); save(); S = keep; return id; };
  const south = mk({name:'Rusk', book:'dod', thread:'t', lvl:23, chapters:{7:'south'}, f:{b9_c7_key:'south', b9_lethRoad:'adjunct'}, squad:['sgt', 'haddat', 'tangle', 'brask', 'wenna'], camp:['tegra'], dead:{marrow:{ch:7, where:'The rearguard'}}, loy:{haddat:2},
    gear:{haddat:{weapon:'b2_arensword'}}, kit:['b2_arensword'], b9r:{n:2}, b9:{wit:{c3:'kept', c5:'kept', c7:'doubt', c4:'doubt', c6:'doubt'}},
    th:{l:{name:'Vey', lvl:14, squad:['sgt', 'tobet', 'thegg', 'perrit', 'kaedra'], gear:{}, picks:{}, loy:{tobet:1}, kit:[], inv:{salve:2}, dead:{ammet:{ch:6, where:'The line'}}, debt:{tobet:800}, debt0:{tobet:900}, b9r:{n:9}}}});
  const east = mk({name:'Esk', book:'dod', thread:'t', lvl:24, chapters:{7:'adjunct'}, f:{}, squad:['sgt', 'haddat', 'mirrel'], th:{l:{name:'Orr', lvl:16, squad:['sgt', 'tobet'], gear:{}, picks:{}, loy:{}, kit:[], inv:{}, dead:{}}}});
  const home = mk({name:'Homer', book:'dod', thread:'t', lvl:23, chapters:{7:'home'}, f:{b9_lethRoad:'home'}, squad:['sgt', 'haddat']});
  const half = mk({name:'Half', book:'dod', thread:'l', lvl:13, chapters:{6:'line'}, f:{b9_lethRoad:'escort'}, squad:['sgt', 'tobet']});
  const tthE = mk({name:'Brisket', book:'tth', lvl:20, chapters:{7:'east'}, squad:['sgt', 'brisk', 'kettle', 'ohl', 'vell'], dead:{tuft:{ch:6, where:'The Fete'}}, loy:{kettle:2}});
  const tthC = mk({name:'Coral', book:'tth', lvl:20, chapters:{7:'coral'}, squad:['sgt', 'brisk']});
  out.qual = {sT:!!b10ImpT(south), sL:!!b10ImpL(south), eT:!!b10ImpT(east), eL:!!b10ImpL(east), hT:!!b10ImpT(home), hL:!!b10ImpL(home), half:!!b10ImpL(half) || !!b10ImpT(half), fE:!!b10ImpF(tthE), fC:!!b10ImpF(tthC),
    listT:b10ImpList('t').length, listL:b10ImpList('l').length, listF:b10ImpList('f').length, nameT:b10ImpName(south, 't'), nameL:b10ImpName(south, 'l'), nameF:b10ImpName(tthE, 'f'), desc:/Vey/.test(b10ImpDesc(south, 'l')) && /east into the glass/.test(b10ImpDesc(south, 'l')), descF:/Brisket/.test(b10ImpDesc(tthE, 'f'))};
  S = newStateTCG('Rusk', 'Vey', south, south, tthE); setBook('tcg');
  out.imp = {lvl:S.lvl, squad:S.squad.join(','), camp:(S.camp || []).join(','), marrowDead:!!S.dead.marrow, from:S.dead.marrow && S.dead.marrow.from, sword:(S.gear.haddat || {}).weapon, loy:S.loy.haddat, roads:b10TRoad() + ',' + b10LRoad(), wit:b10Wit(),
    lLvl:S.th.l.lvl, lSquad:S.th.l.squad.join(','), ammetDead:!!S.th.l.dead.ammet, debt:S.th.l.debt && S.th.l.debt.tobet, lWit:S.th.l.b10w.n, lifted:S.imported && S.imported.lifted, newSid:S.sid !== south,
    rT:b10RationLine('t'), rL:b10RationLine('l'), f:S.b10f.squad.join(','), fName:S.b10f.name, fLvl:S.b10f.lvl, fTuft:!!S.b10f.dead.tuft};
  /* the Fourth over the ridge: allies at the Fourth's own level, never the dead */
  const al = b10FourthAllies(2, 3); out.allies = {n:al.length, ids:al.map(a => a[0]).join(','), sgt:FOES[al[0][0]].name, kettle:!!FOES.b10_4_kettle, noTuft:!FOES.b10_4_tuft, x:al.map(a => a[1]).join(',')};
  BATTLES.__b10 = Object.assign({}, BATTLES.knives, {foes:[['b10_kolansii', 3, 1]], after:'__b10after', allies:al}); DLG.__b10after = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  S.chapter = 7; save(); try { startBattle('__b10', {}); await wait(80); B.busy = true; const k = B.units.find(u => u.ally && /Kettle/.test(u.name)); out.allies.inFight = !!k && k.side === 'p'; } catch(e) { out.allies.inFight = 'err ' + e.message; }
  out.thirstRand = [...Array(80)].map(() => { S.injury = null; giveInjury({id:'haddat', name:'Haddat'}); return S.injury.haddat; }).some(k => k === 'b10thirst'); S.injury = null;
  B = null;
  S = newStateTCG('Esk', 'Orr', east, east); out.impE = {roads:b10TRoad() + ',' + b10LRoad(), wit:b10Wit(), lWit:S.th.l.b10w.n, fourth:S.b10f.squad.join(','), fName:S.b10f.name, rl:b10RationLine('t')};
  S = newStateTCG('Homer', 'Brann', home, home); out.impNone = {lvl:S.lvl, squad:S.squad.join(','), imported:!!S.imported, roads:b10TRoad() + ',' + b10LRoad(), lvlL:S.th.l.lvl};
  /* recruits */
  S = newStateTCG('Hask', 'Brann'); S.chapter = 1; out.rec = {pruss:b10Join('pruss'), in:S.squad.includes('pruss'), flag:S.f.b10_prussDone, notL:!b10CanRecruit('tirren'),
    roles:['pruss', 'tirren'].every(id => TPL[id] && TPL_ROLES[id] && VERB[id] && STATUP[id] && PICKS[3][id]), por:['pruss', 'tirren'].every(id => POR[id]), fig:['pruss', 'tirren'].every(id => FIGX[id])};
  out.rec.bench = rosterBook().bench().includes('brask') && rosterBook().wait('brask'); try { startChapter(2); } catch(e) {} out.rec.lBench = rosterBook().bench().includes('tirren') && !rosterBook().bench().includes('pruss'); out.rec.tirren = b10Join('tirren') && S.squad.includes('tirren');
  S.squad.push('ilsa'); out.rec.full = (() => { S.f.b10_tirrenDone = undefined; S.squad = S.squad.filter(k => k !== 'tirren'); return b10Join('tirren') && !S.squad.includes('tirren') && S.f.b10_tirrenDone === 2; })();
  /* the readers, by squad (the v10.0.2 rule) */
  S = newStateTCG('Hask', 'Brann'); S.chapter = 1; setBook('tcg');
  out.read = {who:visReader().id, choice:/Deck/.test(b10ReadChoice(1).t), offer:!!b10ReadOffer(1).ch.length, node:cardNodeName(), key:readingTableKey(), tiles:visTiles(),
    tables:[1, 2, 3, 4, 5, 6, 7].every(n => !!READTABLE['tcg:' + n]), pools:[1, 2, 3, 4, 5, 6, 7].every(n => b10Pool(n).length === 5),
    saidT:[1, 3, 5, 7].flatMap(n => B10POOL[n]).every(id => B10SAY[id] && ['marrow', 'tallow', 'oldninth'].every(k => B10SAY[id][k])),
    saidL:[2, 4, 6].flatMap(n => B10POOL[n]).every(id => B10SAY_L[id] && ['perrit', 'tilewoman'].every(k => B10SAY_L[id][k])), sayT:/Marrow/.test(b10CardSay('b3c_lifesoldier'))};
  S.squad = S.squad.filter(k => k !== 'marrow'); out.read.marine = /old marine/.test(b10ReadOffer(1).txt + b10ReadChoice(1).t);
  try { startChapter(2); } catch(e) {}
  out.read.l = {who:visReader().id, choice:/tiles/.test(b10ReadChoice(2).t), node:cardNodeName(), tiles:visTiles(), key:readingTableKey(), sayL:/Perrit/.test(b10CardSay('b5t_seer'))};
  S.card = 'b5t_wall'; out.read.l.tile = b10Tile(); S.squad = S.squad.filter(k => k !== 'perrit'); out.read.l.tw = visReader().id;
  /* the foes: on-screen names keep rule 103 (no Pure, no "Watered", no Voice), the rest present */
  out.foes = {names:Object.keys(FOES).filter(k => /^b10_/.test(k)).every(k => !/Watered|Pure|Voice|Forkrul|Diligence|Reverence|Aloft/.test(FOES[k].name)),
    all:['b10_scav', 'b10_straggler', 'b10_outrider', 'b10_kolansii', 'b10_kolbow', 'b10_kolpike', 'b10_kofficer', 'b10_shriven', 'b10_assail', 'b10_lbolkando', 'b10_ldog', 'b10_lforager', 'b10_lstraggler', 'b10_lkolansii', 'b10_lkofficer', 'b10_lshriven', 'b10_lassail', 'b10_regular', 'b10_lspear'].every(k => FOES[k] && FOES[k].kind),
    soak:foeSoak('b10_shriven'), empty:Object.keys(B10GAP).filter(k => /^b10_/.test(k)).length === 19 && Object.keys(B10SOLDIER).length === 13 && Object.keys(B10SOLDIER).every(k => SOLDIER_FIGHT[k] === B10SOLDIER[k])};
  /* art, scenes, glossary, keys, voice */
  out.art = {title:/<svg/.test(ART['title/tcg'] || ''), size:(ART['title/tcg'] || '').length, patch:/viewBox="0 0 600 /.test(ART['insignia/tcg'] || '') && /shard of glass/.test(ART['insignia/tcg']), titleArt:BOOKS.tcg.titleArt, patchKey:BOOKS.tcg.patch, cls:tpatchCls(BOOKS.tcg.patch),
    scenes:Object.keys(B10_SCENE_LIKE).every(k => SCENES[k] && SCENEX[k]), gloss:(GLOSSX.tcg || []).length, keys:Object.keys(B10KEYS).length, ch:Object.keys(B10CH).length,
    defaults:Object.keys(B10KEY0).every(n => B10KEYS[n].includes(B10KEY0[n])), keys7:B10KEYS[7].length, roads:B10_LETHROADS.join(',') + '|' + B10_FOURTHROADS.join(','),
    voice:((AUDIO.names || (AUDIO._dev && AUDIO._dev.names) || {}).voices || []).includes('tcg'),
    places:['b10_camp', 'b10_glass_night', 'b10_glass', 'b10_south', 'b10_coast', 'b10_field', 'b10_barrows', 'b10_lake'].map(k => AUDIO._dev.placeAmb(k)).join(','), deeds:/Witness/.test(b10DeedsExtra([]))};
  /* the series coda: saves from several books, finished and not; the current save finished too */
  localStorage.clear(); localStorage.setItem('from-the-ranks-seen', '9.9.9');
  const g1 = mk({name:'Ashen', chapters:{7:'outlaw'}, f:{c7_key:'outlaw'}, squad:['sgt', 'brisk', 'kettle', 'tuft', 'ohl'], dead:{ellis:{ch:5, where:'The Fete'}}});
  const g2 = mk({name:'Unfinished', chapters:{3:'x'}, squad:['sgt', 'brisk']});
  const r7 = mk({name:'Seven', book:'rg', thread:'t', lvl:21, chapters:{7:'adjunct'}, f:{b7_lethRoad:'palace'}, squad:['sgt', 'haddat', 'tangle'], dead:{sathi:{ch:7, where:'The Barrow', from:'dg'}, marrow:{ch:4, where:'The village'}},
    th:{l:{name:'Lethy', squad:['sgt', 'tobet', 'thegg'], dead:{}}}});
  const d9 = mk({name:'Nine', book:'dod', thread:'t', lvl:23, chapters:{7:'south'}, f:{}, squad:['sgt', 'haddat'], th:{l:{name:'Ninel', squad:['sgt', 'perrit'], dead:{ammet:{ch:6, where:'The line'}}}}});
  const e8 = mk({name:'Eight', book:'tth', lvl:20, chapters:{7:'east'}, squad:['sgt', 'brisk', 'kettle'], dead:{}});
  setBook('tcg'); S = newStateTCG('Last', 'Lethan'); S.chapter = 7; S.chapters = {1:'names', 2:'watch', 3:'haul', 4:'horses', 5:'give', 6:'hold', 7:'colours'}; S.f.b10_c7_key = 'colours'; S.f.b10_lethRoad = 'kolanse'; S.f.b10_fourthRoad = 'third'; save();
  const Q = b10CodaPages(), books = Q.map(q => q.book).join(',');
  out.coda = {n:Q.length, books, unf:!Q.some(q => q.sgt === 'Unfinished'), first:Q[0] && Q[0].sgt, rgL:Q.some(q => q.book === 'rg' && q.unit === 'Sixth' && q.road && /Palace Guard/.test(q.road[1])),
    sathi:!Q.some(q => q.book === 'rg' && q.fell.includes('sathi')), marrow:Q.some(q => q.book === 'rg' && q.fell.includes('marrow')), tcgF:Q.some(q => q.book === 'tcg' && q.unit === 'Fourth' && q.road && q.road[0] === 'With the Third'),
    tcgL:Q.some(q => q.book === 'tcg' && q.unit === 'Sixth' && q.road && q.road[0] === 'In Kolanse' && q.wit === 5)};
  const words = Q.map(q => b10CodaWords(q)); out.coda.w = {gotm:/You flew north/.test(words[0].paras.join(' ')) && /Sergeant Ashen's Fourth/.test(words[0].title) && /Did not: Ellis/.test(words[0].paras.join(' ')),
    neutral:words.some(w => w.paras[0] === B10_NEUTRAL) || !Q.every(q => q.road), wit:words.some(w => /At the end, still marching for something/.test(w.paras.join(' ')))};
  /* a book with nothing to read gets the neutral line */
  out.coda.none = b10CodaWords({book:'hoc', unit:'Third', sgt:'', road:null, walked:[], fell:[]}).paras[0] === B10_NEUTRAL;
  /* the finale's pages: Book Ten's own, then the coda after the end page, the credits last */
  B10FIN.extra = () => [{k:'b107test'}]; const P = finPages(); B10FIN.extra = null;
  const iEnd = P.findIndex(p => p.k === 'end'), iOpen = P.findIndex(p => p.k === 'b10copen'), iCred = P.findIndex(p => p.k === 'b10credits');
  out.fin = {extraBeforeEnd:P.findIndex(p => p.k === 'b107test') === iEnd - 1, order:iEnd >= 0 && iOpen === iEnd + 1 && iCred === P.length - 1, codaN:P.filter(p => p.k === 'b10coda').length};
  const P2 = finPages(); const i0 = P2.findIndex(p => p.k === 'b10copen'), iE = P2.findIndex(p => p.k === 'end');
  showFinale(i0); await wait(60); out.fin.open = /forgotten/.test($('#app').textContent) && /Somebody wrote them down/.test($('#app').textContent) && !!$('#fNext');
  showFinale(i0 + 1); await wait(60); out.fin.page = /Book One/.test($('#app').textContent) && /Ashen/.test($('#app').textContent);
  showFinale(P2.length - 1); await wait(60); out.fin.cred = /Steven Erikson/.test($('#app').textContent) && /Ian C\. Esslemont/.test($('#app').textContent) && !!$('#fTitle') && !$('#fNext');
  out.fin.fit = document.documentElement.scrollWidth <= innerWidth + 1;
  showFinale(iE); await wait(60); out.fin.endNext = !!$('#fNext') && /Witnessed/.test($('#app').textContent);
  finGo(1); await wait(60); out.fin.go = S.finPage === iE + 1;
  view = 'title'; S = null;
  } catch(e) { out.err = String(e && e.stack || e); }
  return out; });
const ui = await page.evaluate(async () => { const wait = ms => new Promise(res => setTimeout(res, ms)); const o = {};
  try { localStorage.clear(); localStorage.setItem('from-the-ranks-seen', '9.9.9'); S = null;
    setBook('gotm'); const keep = BOOKSNAP.tcg.ch; BOOKSNAP.tcg.ch = {};
    o.empty = !!BOOKS.tcg.coming; if (o.empty) { showTitle(false, 'tcg'); await wait(300); document.getElementById('nm').value = 'Empt'; o.msgEmpty = (document.getElementById('bNew').click(), await wait(100), document.getElementById('nmMsg').textContent); }
    BOOKSNAP.tcg.ch = keep; if (!Object.keys(keep).length) registerChapter(1, {number:1, title:'Test', area:{id:'b10_test', map:['....'], start:{x:1, y:0}}, intro:{loc:'', sub:'', cap:'', paras:[], go:'Go'}}, 'tcg');
    showTitle(false, 'tcg'); await wait(300);
    o.shelf = !BOOKS.tcg.coming && shelfBooks().some(b => b.id === 'tcg'); o.h1 = document.getElementById('tName').textContent; o.tag = document.getElementById('tTag').textContent;
    o.patch = !!document.querySelector('#tPatch .tpatch2'); o.art = !!document.querySelector('.titleart svg');
    o.imp = !document.getElementById('impField').hidden && /Book Nine/.test(document.getElementById('impField').textContent) && !document.getElementById('impField2').hidden && /Letherii/.test(document.getElementById('impField2').textContent) && !!document.getElementById('impSel3') && /Book Eight/.test(document.getElementById('impField2').textContent);
    const seg = document.querySelector('.bseg'), bs = [...seg.querySelectorAll('.btn')]; o.picker = bs.length; o.fit = document.documentElement.scrollWidth <= innerWidth + 1 && bs.every(b => b.getBoundingClientRect().right <= innerWidth + 1);
    o.meet = /Witnessed/.test(whereBooksMeetHTML(true)); o.credit = titleCredit(); o.nmLab = document.getElementById('nmLab').textContent;
    document.getElementById('nm').value = 'Ferro'; document.getElementById('nm2').value = 'Ferro'; document.getElementById('bNew').click(); await wait(100); o.twoNames = /Two sergeants/.test(document.getElementById('nmMsg').textContent);
    document.getElementById('nm2').value = 'Vale'; document.getElementById('bNew').click(); await wait(300);
    o.made = !!(S && S.book === 'tcg' && S.name === 'Ferro' && S.lvl === 24 && S.th.l.name === 'Vale' && S.th.l.lvl === 16 && S.thread === 't' && S.b10f && S.b10f.squad.length === 5);
    o.hud = /Witness/.test((document.getElementById('chainp') || {}).textContent || '') || true;
  } catch(e) { o.err = String(e && e.stack || e); } return o; });
if (r.err) ok(false, 'threw: ' + r.err); else {
  ok(r.caps === 'gotm:8 dg:8 moi:15 hoc:15 mt:8 bh:18 tth:21' && r.dodT === 24 && r.dodL === 16 && r.capT === 28 && r.capL === 20 && r.levels === 28 && r.lv === '7510,8500' && r.dmg === '8,9,9' && r.ac === '6,6,7',
    `caps: the others unchanged (${r.caps}; dod ${r.dodT}/${r.dodL}); Book Ten 28 / 20; levels to 28 (330 a level); +1 damage at 25 and +1 armour at 27 (David, Nov 10)`);
  ok((r.tcgCh ? !r.coming && r.shelf.includes('tcg') : r.coming && !r.shelf.includes('tcg')) && r.book.n === 10 && r.book.word === 'Ten' && r.book.name === 'Witnessed' && r.book.title === 'The Crippled God' && /Somebody should/.test(r.book.tag) && r.book.h1 === 'Witnessed', 'the shelf: Book Ten, Witnessed, beside The Crippled God, coming until a chapter registers: ' + JSON.stringify(r.book));
  const f = r.fresh; ok(f.book === 'tcg' && f.thread === 't' && f.name === 'Hask' && f.lvl === 24 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && f.camp === 'brask,tegra' && f.sathi && f.wit === 5 && f.tier === 'holding' && f.key === 'b10_c1_key' && f.core === 'sgt,haddat,sathi,tangle,marrow' && f.patron === 'Treach'
    && f.lName === 'Brann' && f.lLvl === 16 && f.lSquad === 'sgt,tobet,thegg,perrit,ammet' && f.lCamp === 'brennet,kaedra' && f.lWit === 5 && f.lMun === 0 && f.lDebt && f.sgtBio && f.look === 'dg' && f.roads === 'adjunct,escort'
    && f.fourth === 'sgt,brisk,kettle,tuft,ohl' && f.fLvl === 20 && f.fName === '' && f.rline === '' && r.topT === 28, 'fresh start: the Third at 24 (Brask and Tegra at the baggage), the Letherii at 16, Witness 5 each, Treach, b10_ keys, canon\'s roads, the canon-default Fourth at 20; the Third tops out at 28: ' + JSON.stringify(f) + ' top ' + r.topT);
  const s = r.swap; ok(s.thread === 'l' && s.name === 'Brann' && s.squad === 'sgt,tobet,thegg,perrit,ammet' && s.core === 'sgt,tobet,thegg,perrit,ammet' && s.patron === 'the Errant' && s.look === 'mt' && s.wit === 5 && s.waiting === 'Hask' && s.sgtBio && s.noMun && s.hands && s.tiles && s.node === 'b10_c2_card' && r.topL === 20 && r.waitLvl === 24,
    'the swap: Chapter 2 brings the Letherii on top (the Errant, Book Five\'s look and hands, the Tiles, no munitions missed); they top out at 20 while the Third waits at 24: ' + JSON.stringify(s) + ` top ${r.topL} waiting ${r.waitLvl}`);
  const b = r.back; ok(b.thread === 't' && b.name === 'Hask' && b.lvl === 24 && b.wit === 4 && b.lWit === 5 && b.wear && b.hands && b.once === 4 && r.gods4 === 'Lether\'s luck' && r.quiet4 && !r.boon4 && r.lWear === 4,
    'Chapter 3 swaps the Third back and the wear takes 1 Witness, once, leaving the Letherii\'s alone; in Chapter 4 the Errant has gone quiet (no boon) and the Letherii\'s wear: ' + JSON.stringify(b) + ` ${r.gods4} ${r.lWear}`);
  const w = r.wit; ok(w.e5 === 0 && w.e9 === 2 && w.e7 === 1 && w.e3 === -1 && w.e0 === -2 && w.p0 === -1 && w.p3 === 0 && w.low === 0 && w.hi === 9 && w.tiers === 'hollow,doubt,holding,kept,witnessed' && w.noted && w.tierNote && w.up === 7 && w.down === 9 && w.html && !w.open && w.open2,
    'Witness: noted, clamped 0..10, tiers; the edge on witness:true checks (+2 witnessed … −2 hollow) and "Nothing to march for" on every other check when hollow; Kolanse opens at holding: ' + JSON.stringify(w));
  const bt = r.beat; ok(bt.a === 'kept' && bt.b === 'kept' && bt.w === 1 && bt.bad === null && bt.c === '1:1' && bt.w2 === 0 && bt.none === null && r.neutral, 'the beats: one a chapter, the first answer stands, kept +1 and doubt −1, nothing outside Book Ten; the fight table: hollow -1, witnessed +1: ' + JSON.stringify(bt) + ' neutral ' + r.neutral);
  const t = r.thirst; ok(t.pick && t.given && t.hit === 1 && !t.again && !t.sgt && r.thirstRand === false, 'thirst: a chapter gives it (−1 to hit), never twice, never the sergeant, never a bad fall: ' + JSON.stringify(t));
  const g = r.gods; ok(g.haddat === 'the Guardians of the Gate' && g.boon === 'b8gate' && g.sgt === 'Treach' && g.lsgt === 'the Errant' && g.lboon === 'errant' && g.perrit === 'the Empty Hold' && g.brune && g.haddatDod === 'the Guardians of the Gate' && g.haddatRg === 'Hood' && g.recruits,
    'the gods: Treach; the Errant in Chapter 2; Hood\'s faithful answered by the Guardians (Book Seven unchanged); the Shore quiet, no boon; no gods for the recruits: ' + JSON.stringify(g));
  const q = r.qual; ok(q.sT && q.sL && q.eT && q.eL && !q.hT && !q.hL && !q.half && q.fE && !q.fC && q.listT === 2 && q.listL === 2 && q.listF === 1 && q.nameT === 'Rusk' && q.nameL === 'Vey' && q.nameF === 'Brisket' && q.desc && q.descF,
    'transfers: a finished Book Nine\'s Third on adjunct or south and Letherii on escort (by default) or adjunct; home and unfinished refused; Book Eight\'s Fourth on east only: ' + JSON.stringify(q));
  const i = r.imp; ok(i.lvl === 24 && i.squad === 'sgt,haddat,tangle,brask,wenna,tegra' && i.camp === '' && i.marrowDead && i.from === 'dod' && i.sword === 'b2_arensword' && i.loy === 2 && i.roads === 'south,adjunct' && i.wit === 6
    && i.lLvl === 16 && i.lSquad === 'sgt,tobet,thegg,perrit,kaedra' && i.ammetDead && i.debt === 800 && i.lWit === 3 && i.lifted && i.newSid && /half a ration/.test(i.rT) && /full/.test(i.rL)
    && i.f === 'sgt,brisk,kettle,ohl,vell' && i.fName === 'Brisket' && i.fLvl === 20 && i.fTuft, 'a Book Nine save carries both squads (levels lifted to 24 and 16, gear, loyalty, the dead, debts, their roads; Witness from Book Nine\'s beats: 5+2−1 and 5−2; Rations as one line); Book Eight\'s Fourth with its dead: ' + JSON.stringify(i));
  const a = r.allies; ok(a.n === 3 && a.ids === 'b10_4_sgt,b10_4_brisk,b10_4_kettle' && /Sergeant Brisket, of the Fourth/.test(a.sgt) && a.kettle && a.noTuft && a.x === '2,3,4' && a.inFight === true, 'the Fourth over the ridge: its sergeant and first living squadmates as allies, at its own level: ' + JSON.stringify(a));
  ok(r.impE.roads === 'adjunct,escort' && r.impE.wit === 5 && r.impE.lWit === 5 && r.impE.fourth === 'sgt,brisk,kettle,tuft,ohl' && r.impE.fName === '' && r.impE.rl === '' && r.impNone.lvl === 24 && r.impNone.squad === 'sgt,haddat,tangle,marrow,mirrel' && !r.impNone.imported && r.impNone.roads === 'adjunct,escort' && r.impNone.lvlL === 16,
    'a Book Nine save on canon\'s roads carries with Witness 5 and no ration line; on home, both squads start fresh on canon\'s roads: ' + JSON.stringify(r.impE) + ' ' + JSON.stringify(r.impNone));
  const rc = r.rec; ok(rc.pruss && rc.in && rc.flag === 1 && rc.notL && rc.roles && rc.por && rc.fig && rc.bench && rc.lBench && rc.tirren && rc.full, 'recruits: Pruss with the Third, Tirren with the Letherii; a seventh waits; benches by squad; roles, talents, busts and sprites: ' + JSON.stringify(rc));
  const d = r.read; ok(d.who === 'marrow' && d.choice && d.offer && d.node === 'b10_c1_card' && d.key === 'tcg:1' && !d.tiles && d.tables && d.pools && d.saidT && d.saidL && d.sayT && d.marine
    && d.l.who === 'perrit' && d.l.choice && d.l.node === 'b10_c2_card' && d.l.tiles && d.l.key === 'tcg:2' && d.l.sayL && d.l.tile === 'armour' && d.l.tw === 'tilewoman',
    'the readers: the Third\'s Deck (Marrow, else the old marine), the Letherii\'s Tiles (Perrit, else the tile-woman), each squad\'s own lines, seven tables and pools, the tiles\' effects: ' + JSON.stringify(d));
  ok(r.foes.names && r.foes.all && r.foes.soak === 2 && r.foes.empty, 'the foes: present with bodies; no Pure, Watered or Voice on screen (rule 103); the balance tables filled (19 Bridgeburner rows, 13 Soldier rows in SOLDIER_FIGHT): ' + JSON.stringify(r.foes));
  const ar = r.art; ok(ar.title && ar.size < 120000 && ar.patch && ar.titleArt === 'title/tcg' && ar.patchKey === 'insignia/tcg' && /tpatch2/.test(ar.cls) && ar.scenes && ar.gloss >= 12 && ar.keys === 7 && ar.ch === 7 && ar.defaults && ar.keys7 === 3 && ar.roads === 'letheras,kolanse,free|host,third,home' && ar.voice
    && ar.places === 'camp,desert_night,desert,column,sea,siege,barrow,lake' && ar.deeds, 'title art (under 120 KB), the two-squad patch at single size (tpatch2), backdrops, glossary, keys and endings, the voice and places, Deeds: ' + JSON.stringify(ar));
  const c = r.coda; ok(c.n === 9 && c.books === 'gotm,rg,rg,tth,dod,dod,tcg,tcg,tcg' && c.unf && c.first === 'Ashen' && c.rgL && c.sathi && c.marrow && c.tcgF && c.tcgL && c.w.gotm && c.w.wit && c.none,
    'the coda: one page per squad from every finished book on the device, Book One first (an unfinished save left out; two-squad books give two pages, Book Ten three); each from its book\'s own road words; the dead carried from earlier books not counted twice; a book with nothing to read gets the neutral line: ' + JSON.stringify(c));
  const fn = r.fin; ok(fn.extraBeforeEnd && fn.order && fn.codaN === 9 && fn.open && fn.page && fn.cred && fn.fit && fn.endNext && fn.go, 'the finale: Chapter 7\'s extra pages before the end page; then the opening, the squads, and the credits last (Steven Erikson and Ian C. Esslemont, a Title button); fits at 390px: ' + JSON.stringify(fn));
}
if (ui.err) ok(false, 'ui threw: ' + ui.err);
ok((!ui.empty || /still being written/.test(ui.msgEmpty || '')) && ui.shelf && /Witnessed/.test(ui.h1 || '') && ui.patch && ui.art && ui.imp && ui.picker >= 10 && ui.fit && ui.meet && /^Ten books/.test(ui.credit || '') && !/more to come/.test(ui.credit) && /Third/.test(ui.nmLab) && ui.twoNames && ui.made,
  'the new-sergeant screen: still being written while empty; the title and the two-squad patch; ten books fit at 390px; two names, two Book Nine pickers and Book Eight\'s Fourth; the credit says ten and no more to come; Begin makes the Third at 24, the Letherii at 16 and the Fourth: ' + JSON.stringify(ui));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.close && srv.close();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nERRORS: none'); process.exit(bad.length ? 1 : 0);
