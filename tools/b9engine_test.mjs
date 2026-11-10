// v12.0: Book Nine's engine (docs/v12.0-notes.md). Two squads taking turns in one save: the Third (Ch 1, 3, 5, 7; fresh 19, cap 24) and
// Book Seven's Letherii (Ch 2, 4, 6; fresh 11, cap 16), each with its own levels; the swap at startChapter; the transfers from a finished
// Book Seven (its Third on 'adjunct', its Letherii on 'army'; read from o.th when the other squad played last; others refused); Rations
// (moves, tiers, the march, edges on rations:true checks and every check when hungry, health in fights, per squad); Witness (beats, faith,
// the witness:true edge); the fever; the gods (Treach, the Errant, the Guardians for Hood's); the recruits; the readers by squad (the
// v10.0.2 rule: the Letherii's lines are the Letherii's); the foes; the art; the shelf (coming until a chapter registers) and the title screen.
// Usage: node tools/b9engine_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(async () => { const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  try {
  out.caps = ['gotm', 'dg', 'moi', 'hoc', 'mt', 'bh', 'tth'].map(b => { S = {book:b}; return b + ':' + lvCap(); }).join(' ');
  S = {book:'rg', thread:'t'}; out.rgT = lvCap(); S = {book:'rg', thread:'l'}; out.rgL = lvCap();
  S = {book:'dod', thread:'t'}; out.capT = lvCap(); S = {book:'dod', thread:'l'}; out.capL = lvCap();
  out.levels = LEVELS.length; out.dmg = [21, 22, 24].map(l => lvDmg(l)).join(','); out.ac = [22, 23].map(l => lvAc(l)).join(',');
  out.shelf = shelfBooks().map(b => b.id).join(','); out.coming = !!BOOKS.dod.coming; out.dodCh = Object.keys((BOOKSNAP.dod && BOOKSNAP.dod.ch) || {}).length;
  out.book = {n:BOOKS.dod.n, word:BOOKS.dod.word, name:BOOKS.dod.name, title:BOOKS.dod.title, tag:BOOKS.dod.tag, h1:BOOKS.dod.h1.join(' ')};
  /* stub chapters, so startChapter runs (the real ones register from 161-167) */
  for (let n = 1; n <= 7; n++) if (!(BOOKSNAP.dod.ch[n] || (BOOK === 'dod' && CHAPTERS[n]))) registerChapter(n, {number:n, title:'Stub', area:{id:'b9_stub' + n, map:['....', '....'], start:{x:1, y:0}}, intro:{loc:'', sub:'', cap:'', paras:[], go:'Go'}}, 'dod');
  /* fresh: both halves */
  setBook('dod'); S = newStateDOD('Hask', 'Brann'); save(); try { startChapter(1); } catch(e) {}
  out.fresh = {book:S.book, thread:S.thread, name:S.name, lvl:S.lvl, squad:S.squad.join(','), sathi:!!S.dead.sathi, rat:b9Rations(), tier:b9RatTier(), key:keyFlag(), core:rosterBook().core.join(','), patron:PATRONS.sgt.god,
    lName:S.th.l.name, lLvl:S.th.l.lvl, lSquad:S.th.l.squad.join(','), lRat:S.th.l.b9r.n, lMun:S.th.l.inv.cusser, lDebt:!!(S.th.l.debt && S.th.l.debt.tobet), sgtBio:/Bonehunters/.test(TPL.sgt.bio2 || ''), look:b9SgtLook()};
  gainXP(9999999); out.topT = S.lvl;
  /* the swap: Chapter 2 is the Letherii's; Chapter 3 the Third's again, and the march eats */
  S.chapter = 1; S.lvl = 19; S.xp = LEVELS[18]; notes = []; try { startChapter(2); } catch(e) {}
  out.swap = {thread:S.thread, name:S.name, squad:S.squad.join(','), core:rosterBook().core.join(','), patron:PATRONS.sgt.god, look:b9SgtLook(), rat:b9Rations(), waiting:S.th.t && S.th.t.name, sgtBio:/escort/.test(TPL.sgt.bio2 || ''), noMun:!rosterLacks().includes('munitions')};
  const abK = Object.keys(B5_ABX).find(k => AB[k] && B5_ABX[k].name); out.swap.hands = abK ? AB[abK].name === B5_ABX[abK].name : true;
  gainXP(9999999); out.topL = S.lvl; out.waitLvl = S.th.t.lvl;
  try { startChapter(3); } catch(e) {}
  out.back = {thread:S.thread, name:S.name, lvl:S.lvl, rat:b9Rations(), lRat:S.th.l.b9r.n, march:!!S.f.b9_march3, hands:abK ? AB[abK].name !== B5_ABX[abK].name : true};
  try { startChapter(3); } catch(e) {} out.back.once = b9Rations();
  /* Rations */
  S = newStateDOD('Hask', 'Brann'); notes = [];
  const rc = {check:['wits', 12], rations:true}, plain = {check:['wits', 12]};
  const e0 = edgesFor(rc, 'sgt').find(e => e[0] === 'Rations'); b9Ration(3, 'a cache'); const eFull = (edgesFor(rc, 'sgt').find(e => e[0] === 'Rations') || [])[1];
  b9Ration(-6, 'test'); const eShort = (edgesFor(rc, 'sgt').find(e => e[0] === 'Rations') || [])[1], pShort = edgesFor(plain, 'sgt').some(e => /belly/.test(e[0]));
  b9Ration(-2, 'test'); const eHun = (edgesFor(rc, 'sgt').find(e => e[0] === 'Rations') || [])[1], pHun = (edgesFor(plain, 'sgt').find(e => /belly/.test(e[0])) || [])[1];
  b9Ration(-20, 'test'); const eStarve = (edgesFor(rc, 'sgt').find(e => e[0] === 'Rations') || [])[1];
  out.rat = {e0:!!e0, eFull, eShort, pShort, eHun, pHun, eStarve, low:b9Rations(), noted:notes.some(n => /Rations \+3 \(a cache\)/.test(n.t)), tierNote:notes.some(n => /now/.test(n.t)), lo:S.b9r.lo, hi:S.b9r.hi, html:/Rations/.test(rationsHTML()),
    tiers:[0, 1, 3, 5, 8].map(v => b9RatTier(v)).join(','), up:(S.stats || {}).b9RatUp, down:(S.stats || {}).b9RatDown};
  /* hunger in a fight */
  BATTLES.__b9 = Object.assign({}, BATTLES.knives, {foes:[['b9_nahruk', 3, 1]], after:'__b9after'}); DLG.__b9after = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  S = newStateDOD('Hask', 'Brann'); S.chapter = 3; save(); startBattle('__b9', {}); await wait(80); B.busy = true; const h0 = B.units.find(u => u.id === 'haddat').maxhp;
  S.b9r.n = 1; startBattle('__b9', {}); await wait(80); B.busy = true; const h1 = B.units.find(u => u.id === 'haddat');
  out.hunger = {cut:h0 - h1.maxhp, want:Math.round(h0 * .1), full:h1.hp === h1.maxhp, log:/Half a ration/.test((B.log || []).join(' '))};
  const nr = B.units.find(u => u.kind === 'b9_nahruk' || u.id === 'b9_nahruk');
  out.foe = {soak:foeSoak('b9_nahruk'), dr:nr && nr.dr, resist:!!(nr && nr.resist && nr.resist.sharper === .5), weak:!!(nr && nr.weak && nr.weak.cusser === 1.5), kind:FOES.b9_nahruk.kind, sorc:FOE_SORC.has('b9_nahrukcaster') && FOE_SORC.has('b9_lnahrukcaster'),
    shorttail:b9Shorttail(nr), names:Object.keys(FOES).filter(k => /^b9_/.test(k)).every(k => !/K'Chain|Nah'ruk/.test(FOES[k].name)), all:['b9_deserter', 'b9_raider', 'b9_dog', 'b9_bhederin', 'b9_nahrukbrute', 'b9_lraider', 'b9_lbarghast', 'b9_lnahruk', 'b9_heavy', 'b9_escort', 'b9_bluerose'].every(k => FOES[k])};
  /* Witness */
  S = newStateDOD('Hask', 'Brann'); notes = []; S.chapter = 1; out.wit = {none:b9Wit('kept'), faith0:b9Faith()};
  S.chapter = 3; b9Wit('kept', 'the fire'); b9Wit('doubt'); S.chapter = 5; b9Wit('doubt');
  const wc = {check:['wits', 12], witness:true};
  out.wit.c3 = S.b9.wit.c3; out.wit.faith1 = b9Faith('t'); out.wit.eq = b9Witness('t').kept + ':' + b9Witness('t').doubt; S.chapter = 7; b9Wit('doubt'); out.wit.faith2 = b9Faith('t'); out.wit.edge = (edgesFor(wc, 'sgt').find(e => /witness/.test(e[0])) || [])[1];
  out.wit.l = b9Faith('l'); out.wit.noted = notes.some(n => /Witness/.test(n.t));
  /* the fever */
  S = newStateDOD('Hask', 'Brann'); S.chapter = 3; const sick = b9SickPick(); out.fever = {pick:!!sick && sick !== 'sgt', given:b9Fever(sick), hit:(injuryOf(sick) || {}).hit, again:b9Fever(sick)};
  const ff = mkParty(sick, 0, 0); S.injury = null; const f0 = mkParty(sick, 0, 0); out.fever.minus = f0.atk - ff.atk;
  out.fever.rand = [...Array(60)].map(() => { S.injury = null; giveInjury({id:'haddat', name:'Haddat'}); return S.injury.haddat; }).some(k => k === 'b9fever' || k === 'kelyk'); S.injury = null;
  /* the gods */
  S = newStateDOD('Hask', 'Brann'); out.gods = {haddat:PATRONS.haddat && PATRONS.haddat.god, boon:(patronBoon('haddat') || {}).key, sgt:PATRONS.sgt.god};
  S.chapter = 1; try { startChapter(2); } catch(e) {} out.gods.lsgt = PATRONS.sgt.god; out.gods.perrit = PATRONS.perrit && PATRONS.perrit.god;
  S = {book:'rg', thread:'t'}; out.gods.haddatRg = PATRONS.haddat.god; setBook('dod');
  out.gods.recruits = ['brask', 'tegra', 'brennet', 'kaedra'].every(k => !PATRONS[k]);
  /* the Guardians' boon at work */
  S = newStateDOD('Hask', 'Brann'); S.chapter = 3; save(); S.boons = {fight:'__b9', gods:['b8gate'], spared:{}}; startBattle('__b9', {}); await wait(80); B.busy = true;
  const hu = B.units.find(u => u.id === 'haddat'); hu.ward = 0; hurt(hu, 9999); out.gate = {hp:hu.hp, ward:hu.ward > 0}; hurt(hu, 9999); out.gate.once = hu.hp; S.boons = null;
  /* the transfers */
  const mk = o => { const id = newSid(); localStorage.setItem(slotKey(id), JSON.stringify(Object.assign({v:1, sid:id, f:{}, kit:[], gear:{}, picks:{}, loy:{}, inv:{salve:1, sharper:3}, dead:{}}, o))); const keep = S; S = loadSlot(id); save(); S = keep; return id; };
  const full = mk({name:'Rusk', book:'rg', thread:'t', lvl:21, chapters:{7:'adjunct'}, f:{b7_c7_key:'adjunct', b7_lethRoad:'army'}, squad:['sgt', 'haddat', 'tangle', 'doss', 'wenna'], dead:{marrow:{ch:5, where:'The village', from:'rg'}}, loy:{haddat:2},
    gear:{haddat:{weapon:'b2_arensword'}}, kit:['b2_arensword'], th:{l:{name:'Vey', lvl:12, squad:['sgt', 'tobet', 'thegg', 'perrit', 'ilsa'], gear:{}, picks:{}, loy:{tobet:1}, kit:[], inv:{salve:2}, dead:{ammet:{ch:6, where:'The field', from:'rg'}}, debt:{tobet:800}, debt0:{tobet:900}}}});
  const home = mk({name:'Homer', book:'rg', thread:'t', lvl:21, chapters:{7:'home'}, f:{b7_lethRoad:'palace'}, squad:['sgt', 'haddat']});
  const half = mk({name:'Half', book:'rg', thread:'l', lvl:10, chapters:{6:'stand'}, f:{b7_lethRoad:'army'}, squad:['sgt', 'tobet']});
  out.qual = {fullT:!!b9ImpT(full), fullL:!!b9ImpL(full), homeT:!!b9ImpT(home), homeL:!!b9ImpL(home), half:!!b9ImpL(half), listT:b9ImpList('t').length, listL:b9ImpList('l').length, nameT:b9ImpName(full, 't'), nameL:b9ImpName(full, 'l'), desc:/Vey/.test(b9ImpDesc(full, 'l'))};
  S = newStateDOD('Rusk', 'Vey', full, full); setBook('dod');
  out.imp = {lvl:S.lvl, squad:S.squad.join(','), marrowDead:!!S.dead.marrow, sword:(S.gear.haddat || {}).weapon, loy:S.loy.haddat, lLvl:S.th.l.lvl, lSquad:S.th.l.squad.join(','), ammetDead:!!S.th.l.dead.ammet, debt:S.th.l.debt && S.th.l.debt.tobet, lifted:S.imported && S.imported.lifted, lLifted:S.th.l.imported && S.th.l.imported.lifted, newSid:S.sid !== full};
  S = newStateDOD('Homer', 'Brann', home, home); out.impNone = {lvl:S.lvl, squad:S.squad.join(','), imported:!!S.imported};
  /* recruits */
  S = newStateDOD('Hask', 'Brann'); S.chapter = 1; out.rec = {brask:b9Join('brask'), in:S.squad.includes('brask'), flag:S.f.b9_braskDone, notL:!b9CanRecruit('brennet'),
    roles:['brask', 'tegra', 'brennet', 'kaedra'].every(id => TPL[id] && TPL_ROLES[id] && VERB[id] && STATUP[id] && PICKS[3][id]), por:['brask', 'tegra', 'brennet', 'kaedra'].every(id => POR[id]), fig:['brask', 'tegra', 'brennet', 'kaedra'].every(id => FIGX[id])};
  S.squad.push('doss'); b9Join('tegra'); out.rec.tegra = !S.squad.includes('tegra') && (S.camp || []).includes('tegra') && S.f.b9_tegraDone === 2;
  out.rec.bench = rosterBook().bench().includes('doss'); try { startChapter(2); } catch(e) {} out.rec.lBench = rosterBook().bench().includes('brennet') && !rosterBook().bench().includes('brask'); out.rec.brennet = b9Join('brennet') && S.squad.includes('brennet');
  /* the readers, by squad (the v10.0.2 rule) */
  S = newStateDOD('Hask', 'Brann'); S.chapter = 1; setBook('dod');
  out.read = {who:visReader().id, choice:/Deck/.test(b9ReadChoice(1).t), offer:!!b9ReadOffer(1).ch.length, node:cardNodeName(), key:readingTableKey(), tiles:visTiles(),
    tables:[1, 2, 3, 4, 5, 6, 7].every(n => !!READTABLE['dod:' + n]), pools:[1, 2, 3, 4, 5, 6, 7].every(n => b9Pool(n).length === 5),
    saidT:[1, 3, 5, 7].flatMap(n => B9POOL[n]).every(id => B9SAY[id] && ['marrow', 'tallow', 'oldninth'].every(k => B9SAY[id][k])),
    saidL:[2, 4, 6].flatMap(n => B9POOL[n]).every(id => B9SAY_L[id] && ['perrit', 'tilewoman'].every(k => B9SAY_L[id][k]))};
  out.read.sayT = /Marrow/.test(b9CardSay('herald')); S.squad = S.squad.filter(k => k !== 'marrow'); out.read.marine = /old marine/.test(b9ReadOffer(1).txt + b9ReadChoice(1).t);
  try { startChapter(2); } catch(e) {}
  out.read.l = {who:visReader().id, choice:/tiles/.test(b9ReadChoice(2).t), node:cardNodeName(), tiles:visTiles(), key:readingTableKey(), sayL:/Perrit/.test(b9CardSay('b5t_walker')) && /long road/.test(b9CardSay('b5t_walker'))};
  S.card = 'b5t_wall'; out.read.l.tile = b9Tile(); S.squad = S.squad.filter(k => k !== 'perrit'); out.read.l.tw = visReader().id; out.read.l.twWords = /supply wagon|tailboards/.test(b9ReadOffer(2).txt);
  /* art, scenes, glossary, keys, voice */
  out.art = {title:/<svg/.test(ART['title/dod'] || ''), patch:/boot-print/.test(ART['insignia/dod'] || ''), titleArt:BOOKS.dod.titleArt, patchKey:BOOKS.dod.patch,
    scenes:Object.keys(B9_SCENE_LIKE).every(k => SCENES[k] && SCENEX[k]), gloss:(GLOSSX.dod || []).length, keys:Object.keys(B9KEYS).length, ch:Object.keys(B9CH).length,
    defaults:Object.keys(B9KEY0).every(n => B9KEYS[n].includes(B9KEY0[n])), keys7:B9KEYS[7].length, roads:B9_LETHROADS.join(','), gap:Object.keys(B9GAP).length === 0 && B9GAP_ROW === null && Object.keys(B9SOLDIER).length === 0,
    voice:((AUDIO.names || (AUDIO._dev && AUDIO._dev.names) || {}).voices || []).includes('dod'),
    places:['b9_letheras_night', 'b9_column', 'b9_wastes', 'b9_wastes_night', 'b9_camp_night', 'b9_line', 'b9_dark', 'b9_muster'].map(k => AUDIO._dev.placeAmb(k)).join(','),
    passive:V103_PASSIVE.includes('b9_c4_spoor'), deeds:/Rations/.test(b9DeedsExtra([]))};
  } catch(e) { out.err = String(e && e.stack || e); }
  return out; });
const ui = await page.evaluate(async () => { const wait = ms => new Promise(res => setTimeout(res, ms)); const o = {};
  try { o.empty = !!BOOKS.dod.coming; if (o.empty) { showTitle(false, 'dod'); await wait(300); document.getElementById('nm').value = 'Empt'; o.msgEmpty = (document.getElementById('bNew').click(), await wait(100), document.getElementById('nmMsg').textContent); }
    registerChapter(1, {number:1, title:'Test', area:{id:'b9_test', map:['....'], start:{x:1, y:0}}, intro:{loc:'', sub:'', cap:'', paras:[], go:'Go'}}, 'dod'); showTitle(false, 'dod'); await wait(300);
    o.shelf = !BOOKS.dod.coming && shelfBooks().some(b => b.id === 'dod'); o.h1 = document.getElementById('tName').textContent;
    o.imp = !document.getElementById('impField').hidden && /Book Seven/.test(document.getElementById('impField').textContent) && !document.getElementById('impField2').hidden && /Letherii/.test(document.getElementById('impField2').textContent);
    const seg = document.querySelector('.bseg'), bs = [...seg.querySelectorAll('.btn')]; o.picker = bs.length; o.fit = document.documentElement.scrollWidth <= innerWidth + 1 && bs.every(b => b.getBoundingClientRect().right <= innerWidth + 1);
    o.meet = /Dust on the Boots/.test(whereBooksMeetHTML(true)); o.credit = /^Nine books/.test(titleCredit());
    document.getElementById('nm').value = 'Ferro'; document.getElementById('nm2').value = 'Ferro'; document.getElementById('bNew').click(); await wait(100); o.twoNames = /Two sergeants/.test(document.getElementById('nmMsg').textContent);
    document.getElementById('nm2').value = 'Vale'; document.getElementById('bNew').click(); await wait(300);
    o.made = !!(S && S.book === 'dod' && S.name === 'Ferro' && S.lvl === 19 && S.th.l.name === 'Vale' && S.th.l.lvl === 11 && S.thread === 't');
  } catch(e) { o.err = String(e); } return o; });
if (r.err) ok(false, 'threw: ' + r.err); else {
  ok(r.caps === 'gotm:8 dg:8 moi:15 hoc:15 mt:8 bh:18 tth:21' && r.rgT === 21 && r.rgL === 12 && r.capT === 24 && r.capL === 16 && r.levels === 24 && r.dmg === '7,8,8' && r.ac === '5,6', `caps: the others unchanged (${r.caps}; rg ${r.rgT}/${r.rgL}); Book Nine 24 / 16; levels to 24; 22 +1 damage, 23 +1 armour`);
  ok((r.dodCh ? !r.coming && r.shelf.includes('dod') : r.coming && !r.shelf.includes('dod')) && r.book.n === 9 && r.book.word === 'Nine' && r.book.name === 'Dust on the Boots' && r.book.title === 'Dust of Dreams' && /rations/.test(r.book.tag) && r.book.h1 === 'Dust on the Boots', 'the shelf: Book Nine, Dust on the Boots, beside Dust of Dreams, coming until a chapter registers');
  const f = r.fresh; ok(f.book === 'dod' && f.thread === 't' && f.name === 'Hask' && f.lvl === 19 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && f.sathi && f.rat === 6 && f.tier === 'fed' && f.key === 'b9_c1_key' && f.core === 'sgt,haddat,sathi,tangle,marrow' && f.patron === 'Treach'
    && f.lName === 'Brann' && f.lLvl === 11 && f.lSquad === 'sgt,tobet,thegg,perrit,ammet' && f.lRat === 6 && f.lMun === 0 && f.lDebt && f.sgtBio && f.look === 'dg' && r.topT === 24, 'fresh start: the Third at 19 (Sathi fell at the Barrow), the Letherii at 11, rations 6 each, Treach, b9_ keys; the Third tops out at 24: ' + JSON.stringify(f) + ' top ' + r.topT);
  const s = r.swap; ok(s.thread === 'l' && s.name === 'Brann' && s.squad === 'sgt,tobet,thegg,perrit,ammet' && s.core === 'sgt,tobet,thegg,perrit,ammet' && s.patron === 'the Errant' && s.look === 'mt' && s.rat === 6 && s.waiting === 'Hask' && s.sgtBio && s.noMun && s.hands && r.topL === 16 && r.waitLvl === 19,
    'the swap: Chapter 2 brings the Letherii on top (the Errant, Book Five\'s look and hands, no munitions missed, rations their own, no march in Letheras); they top out at 16 while the Third waits at 19: ' + JSON.stringify(s) + ` top ${r.topL} waiting ${r.waitLvl}`);
  const b = r.back; ok(b.thread === 't' && b.name === 'Hask' && b.lvl === 19 && b.rat === 4 && b.lRat === 6 && b.march && b.hands && b.once === 4, 'Chapter 3 swaps the Third back; the march eats 2 of the Third\'s rations, once, and leaves the Letherii\'s alone: ' + JSON.stringify(b));
  const t = r.rat; ok(!t.e0 && t.eFull === 1 && t.eShort === -1 && !t.pShort && t.eHun === -2 && t.pHun === -1 && t.eStarve === -3 && t.low === 0 && t.noted && t.tierNote && t.lo === 0 && t.hi === 9 && t.html && t.tiers === 'starving,hungry,short,fed,full' && t.up === 3 && t.down === 9,
    'Rations: noted, clamped 0..10, tiers; the edge on rations:true checks (+1 full, 0 fed, −1 short, −2 hungry, −3 starving) and "An empty belly" on every other check when hungry: ' + JSON.stringify(t));
  const h = r.hunger; ok(h.cut === h.want && h.want > 0 && h.full && h.log, 'hunger in a fight: half a ration and less takes 10% off every squadmate\'s health, and the log says so: ' + JSON.stringify(h));
  const fo = r.foe; ok(fo.soak === 2 && fo.dr === 3 && fo.resist && fo.weak && fo.kind === 'khell' && fo.sorc && fo.shorttail && fo.names && fo.all, 'the foes: the short-tails armoured (soak 2, a hide), sharpers half spent and cussers tearing them open, their sorcerers\' blows sorcery, never named K\'Chain or Nah\'ruk on screen; the rest present: ' + JSON.stringify(fo));
  const w = r.wit; ok(w.none === null && w.faith0 === null && w.c3 === 'kept' && w.faith1 === 'kept' && w.eq === '1:1' && w.faith2 === 'doubt' && w.edge === -1 && w.l === null && w.noted, 'Witness: no beat in Chapter 1; the first answer stands; faith follows the count; the witness:true edge; the Letherii\'s own: ' + JSON.stringify(w));
  const fv = r.fever; ok(fv.pick && fv.given && fv.hit === 1 && !fv.again && fv.minus === 1 && !fv.rand, 'the fever: a chapter gives it (−1 to hit), never a bad fall: ' + JSON.stringify(fv));
  const g = r.gods; ok(g.haddat === 'the Guardians of the Gate' && g.boon === 'b8gate' && g.sgt === 'Treach' && g.lsgt === 'the Errant' && g.perrit === 'the Empty Hold' && g.haddatRg === 'Hood' && g.recruits && r.gate.hp === 1 && r.gate.ward && r.gate.once <= 0,
    'the gods: Treach for the Third\'s sergeant, the Errant for the Letherii\'s; Hood\'s faithful answered by the Guardians of the Gate (Hood still in Book Seven); no gods for the recruits; the Gate holds once: ' + JSON.stringify(g) + ' ' + JSON.stringify(r.gate));
  const q = r.qual; ok(q.fullT && q.fullL && !q.homeT && !q.homeL && !q.half && q.listT === 1 && q.listL === 1 && q.nameT === 'Rusk' && q.nameL === 'Vey' && q.desc, 'transfers: a finished Book Seven\'s Third on adjunct and Letherii on army; other roads and unfinished saves refused; each squad\'s own sergeant: ' + JSON.stringify(q));
  const i = r.imp; ok(i.lvl === 21 && i.squad === 'sgt,haddat,tangle,doss,wenna' && i.marrowDead && i.sword === 'b2_arensword' && i.loy === 2 && i.lLvl === 12 && i.lSquad === 'sgt,tobet,thegg,perrit,ilsa' && i.ammetDead && i.debt === 800 && !i.lifted && !i.lLifted && i.newSid,
    'a Book Seven save carries both squads: levels (21 and 12 kept), gear, loyalty, recruits, the dead stay dead, the Letherii\'s debts; a new slot: ' + JSON.stringify(i));
  ok(r.impNone.lvl === 19 && r.impNone.squad === 'sgt,haddat,tangle,marrow,mirrel' && !r.impNone.imported, 'a Book Seven save on the wrong roads starts both squads fresh: ' + JSON.stringify(r.impNone));
  const rc = r.rec; ok(rc.brask && rc.in && rc.flag === 1 && rc.notL && rc.roles && rc.por && rc.fig && rc.tegra && rc.bench && rc.lBench && rc.brennet, 'recruits: Brask and Tegra with the Third, Brennet and Kaedra with the Letherii; a seventh waits; benches by squad; roles, talents, busts and sprites: ' + JSON.stringify(rc));
  const d = r.read; ok(d.who === 'marrow' && d.choice && d.offer && d.node === 'b9_c1_card' && d.key === 'dod:1' && !d.tiles && d.tables && d.pools && d.saidT && d.saidL && d.sayT && d.marine
    && d.l.who === 'perrit' && d.l.choice && d.l.node === 'b9_c2_card' && d.l.tiles && d.l.key === 'dod:2' && d.l.sayL && d.l.tile === 'armour' && d.l.tw === 'tilewoman' && d.l.twWords,
    'the readers: the Third\'s Deck (Marrow, else the old marine), the Letherii\'s Tiles (Perrit, else the tile-woman with the train), each squad\'s own lines (the v10.0.2 rule), seven tables and pools, the tiles\' effects: ' + JSON.stringify(d));
  const a = r.art; ok(a.title && a.patch && a.titleArt === 'title/dod' && a.patchKey === 'insignia/dod' && a.scenes && a.gloss >= 12 && a.keys === 7 && a.ch === 7 && a.defaults && a.keys7 === 3 && a.roads === 'escort,adjunct,home' && a.gap && a.voice && a.places === 'city_night,column,plain,night,camp_night,siege,night,camp' && a.passive && a.deeds,
    'title art, the patch with its boot-print, the backdrops, the glossary, keys and roads, the balance tables empty for the balance step, the voice and places, Ch 4\'s passive registered, Deeds: ' + JSON.stringify(a));
}
ok((!ui.empty || /still being written/.test(ui.msgEmpty || '')) && ui.shelf && /Dust/.test(ui.h1 || '') && ui.imp && ui.picker >= 9 && ui.fit && ui.meet && ui.credit && ui.twoNames && ui.made, 'the new-sergeant screen: still being written while empty; nine books fit at 390px; two names and two Book Seven pickers; Where the books meet; Begin makes the Third at 19 and the Letherii at 11: ' + JSON.stringify(ui));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.close && srv.close();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nERRORS: none'); process.exit(bad.length ? 1 : 0);
