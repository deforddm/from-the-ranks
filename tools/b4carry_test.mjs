// v7.0: Book Four's transfer and squad. A finished Book Two on the Aren Guard road (Sathi and Marrow dead at the Barrow, Ramin gone to the
// cells, Keth gone to the Wickan children, gear worn, kit, picks, a trick) comes across: level 8, the gear, kit, picks and tricks of those who
// come, the dead stay dead, the squad refilled to five from the Fourteenth in the fixed order, Ramin and Keth offered as recruits; a Book Two
// on the desert road is not offered; a fresh start is the sergeant, Haddat, Tangle, Marrow and Tallow; the book is off the shelf while it
// has no chapters, Begin says so, and nothing throws. Also Nerve and Dust, the company regulars, the reader, and the recruit swap.
// Usage: node tools/b4carry_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 360, height: 780 });
const bad = [], ok = m => console.log('ok  ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(r => setTimeout(r, ms));
  try {
  /* a fresh Book Four game */
  S = newStateHOC('Vet'); save();
  out.fresh = {book:S.book, lvl:S.lvl, xp:S.xp, squad:S.squad.join(','), dead:Object.keys(S.dead).join(','), due:S.picksDue.join(','), nerve:S.nerve, dust:S.dust, reader:visReader().id,
    ramin:b4CanRecruit('redblade'), keth:b4CanRecruit('warlock'), orvas:b4CanRecruit('orvas'), sgtGod:PATRONS.sgt.god, cap:lvCap()};
  gainXP(99999); out.freshCap = S.lvl;
  /* the transfer: a finished Book Two on the Aren Guard road */
  const items = Object.keys(ITEMS).filter(k => /^b2_/.test(k) && ITEMS[k].slot); const [gH, gT, gS, gLoose] = items;
  setBook('dg'); const a = newStateDG('Rusk'); Object.assign(a, {chapter:7, chapters:{1:'x', 7:'guard'}, lvl:8, xp:1900,
    squad:['sgt', 'haddat', 'tangle'], dead:{sathi:{ch:7, where:'The Barrow'}, marrow:{ch:7, where:'The Barrow'}},
    f:{b2_c7_key:'guard', b2_raminGone:1, b2_kethGone:1, b2_raminDone:1, b2_kethDone:1, b2_ilhar:'came', b2_vatharLost:4, b2_barrowHeld:1, b2_gateCount:31, b2_hackleBack:1},
    gear:{sgt:{}, haddat:{[ITEMS[gH].slot]:gH}, tangle:{[ITEMS[gT].slot]:gT}, sathi:{}, marrow:{}},
    kit:[gH, gT, gS, gLoose], inv:{sharper:4, burner:0, cusser:1, salve:1, smoker:2},
    picks:{sgt:['discipline', 'iron', 'keen'], haddat:['shieldwall', 'iron', 'keen'], tangle:['longfuse', 'iron', 'fleet'], sathi:['ghost', 'iron', 'keen']},
    tricks:{b2_measure:{who:'haddat', ch:1, left:0}, pull:{who:'sathi', ch:3, left:1}}, loy:{haddat:3, tangle:2, sathi:1, marrow:1}});
  if (!TRICKS.b2_measure) delete a.tricks.b2_measure; if (!TRICKS.pull) delete a.tricks.pull;
  S = a; save(); const id = a.sid; S = null;
  const d = newStateDG('Dune'); Object.assign(d, {chapter:7, chapters:{7:'desert'}, f:{b2_c7_key:'desert'}}); S = d; save(); const idDesert = d.sid; S = null;
  const u = newStateDG('Unfin'); Object.assign(u, {chapter:5, chapters:{}}); S = u; save(); S = null;
  setBook('gotm');
  out.offered = b4Finished().map(e => e.name).join(','); out.desertQualifies = b4Qualifies(loadSlot(idDesert));
  S = newStateHOC('Rusk', id, newSid()); save();
  out.imp = {book:S.book, lvl:S.lvl, squad:S.squad.join(','), dead:Object.keys(S.dead).sort().join(','), deadFrom:Object.values(S.dead).every(x => x.from === 'dg'),
    haddatGear:Object.values(S.gear.haddat || {}).includes(gH), tangleGear:Object.values(S.gear.tangle || {}).includes(gT), kit:[gH, gT, gS, gLoose].every(g => S.kit.includes(g)),
    picks:JSON.stringify(S.picks.haddat), due:S.picksDue.join(','), tricks:Object.keys(S.tricks || {}).sort().join(','), inv:JSON.stringify(S.inv),
    loyH:S.loy.haddat, loyT:S.loy.tangle, flags:['b2_ilhar', 'b2_vatharLost', 'b2_barrowHeld', 'b2_gateCount', 'b2_raminGone', 'b2_kethGone', 'b2_hackleBack'].every(k => b4Was(k) != null),
    ramin:b4CanRecruit('redblade'), keth:b4CanRecruit('warlock'), reader:visReader().id, road:S.imported.road, from:S.imported.from, oneKept:!!loadSlot(id) && loadSlot(id).book === 'dg'};
  out.impBattle = !!mkParty('hessa', 0, 0) && !!mkParty('haddat', 0, 0);
  out.marrowRecruitable = b4CanRecruit('marrow'); out.sathiInSquad = S.squad.includes('sathi');
  /* the recruits: one at a time, and swapped */
  out.joinRamin = b4Join('redblade'); out.joinKeth = b4Join('warlock'); out.kethWaits = b4Waiting('warlock'); out.swap = b4SwapIn('warlock');
  out.after = {squad:S.squad.join(','), raminWaits:b4Waiting('redblade'), kethIn:b4In('warlock'), vet:S.picks.warlock.filter(p => PICKS.vet.some(v => v[0] === p)).length};
  /* the Book Four lives of Book Two's four, and their return to Book Two's */
  out.lives = {haddat:TPL.haddat.epithet, rel:!!TPL.haddat.rel.tallow}; setBook('dg'); out.livesBack = {haddat:TPL.haddat.epithet, rel:!!TPL.haddat.rel.tallow}; setBook('hoc');
  /* Nerve and Dust; the company regulars */
  S = newStateHOC('Ner'); S.chapter = 5; S.dust = 2; save();
  BATTLES.__b4 = {title:'A test ground', warrenText:'', warren:{meanas:1, denul:1}, map:['........', '........', '........', '........', '........', '........', '........', '........', '........', '........'],
    party:[[2,8],[3,8],[4,8],[5,8],[3,9],[4,9]], foes:[['deserter',3,1],['xbow',5,0]], xp:10, after:'__b4after', company:{at:[[1,8],[6,8]]}};
  DLG.__b4after = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  const fight = async nerve => { S.nerve = nerve; save(); startBattle('__b4', {}); for (let i = 0; i < 40 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100); const regs = B.units.filter(u => u.b4reg).length, tb = B.units.find(u => u.id === 'tebbet' || u.id === 'tallow'), xb = B.units.find(u => u.kind === 'xbow'); return {regs, xbRng:xb && xb.rng, brittle:!!B.b4Brittle, log:B.log.map(String)}; };
  const f8 = await fight(8); out.n8 = {regs:f8.regs, dustLog:f8.log.some(l => /Dust 2/.test(l)), xbRng:f8.xbRng, xbBase:FOES.xbow.rng};
  B.busy = true; B.over = true;
  const f9 = await fight(9); out.n9 = f9.regs; B.busy = true; B.over = true;
  const f5 = await fight(5); out.n5 = f5.regs; B.busy = true; B.over = true;
  const f0 = await fight(0); out.n0 = {regs:f0.regs, brittle:f0.brittle}; B.busy = true; B.over = false; B.round = 2; newRound(); out.broke = B.units.filter(u => u.b4reg).length; B.busy = true; B.over = true;
  b4Nerve(+20); out.nerveMax = S.nerve; b4Nerve(-30); out.nerveMin = S.nerve;
  out.html = nerveHTML('The road').includes('Dust');
  /* the sputter: Marrow's Mend in Dust 3 sputters 15% of the time; under the Leper never */
  S.chapter = 7; S.dust = 3; out.pct = b4SputterPct(); S.card = 'b4c_leper'; out.leperFx = CARDS.b4c_leper.fx; S.card = null;
  /* the title: off the shelf, not in the picker, and Begin says it is being written */
  S = null; showTitle(); await wait(200); out.shelf = [...document.querySelectorAll('[data-shelf]')].map(b => b.dataset.shelf).join(',');
  showTitle(false, 'dg'); await wait(200); out.picker = [...document.querySelectorAll('.bseg [data-book]')].map(b => b.dataset.book).join(',');
  showTitle(false, 'hoc'); await wait(200); out.hocTitle = {name:$('#tName').textContent, tag:$('#tTag').textContent, patch:$('#tPatch').dataset.book, picker:[...document.querySelectorAll('.bseg [data-book]')].map(b => b.dataset.book).join(','), imp:!$('#impField').hidden};
  $('#nm').value = 'Newer'; $('#bNew').click(); await wait(200); out.begin = {msg:$('#nmMsg').textContent, view, S:!!S};
  out.impDesc = b4ImpDesc(id);
  } catch (e) { out.err = e.stack; }
  return out;
});
const R = r;
if (R.err) no('page script threw: ' + R.err);
else {
R.fresh.book === 'hoc' && R.fresh.lvl === 8 && R.fresh.xp === 1900 && R.fresh.due === '3,5,7' && R.fresh.cap === 15 && R.freshCap === 15 ? ok('a fresh Book Four game starts at level 8 (cap 15) and picks its level 3/5/7 talents') : no('fresh ' + JSON.stringify(R.fresh) + ' cap ' + R.freshCap);
R.fresh.squad === 'sgt,haddat,tangle,marrow,tallow' && R.fresh.dead === 'sathi' ? ok('a fresh start: the sergeant, Haddat, Tangle, Marrow and Tallow; Sathi fell at the Barrow') : no('fresh squad ' + R.fresh.squad + ' dead ' + R.fresh.dead);
!R.fresh.ramin && !R.fresh.keth && R.fresh.orvas ? ok('a fresh start offers Orvas only (Ramin and Keth come by transfer)') : no('fresh recruits ' + JSON.stringify(R.fresh));
R.fresh.nerve === 5 && R.fresh.dust === 0 && R.fresh.reader === 'marrow' && R.fresh.sgtGod === 'Treach' ? ok('Nerve 5, no Dust; Marrow reads; Treach answers for the sergeant') : no('fresh misc ' + JSON.stringify(R.fresh));
R.offered === 'Rusk' && R.desertQualifies === false ? ok('only the finished Aren Guard save is offered: the desert road and an unfinished Book Two are not') : no('offered ' + R.offered + ' desert ' + R.desertQualifies);
R.imp.lvl === 8 && R.imp.squad === 'sgt,haddat,tangle,tallow,hessa' ? ok('the transfer: level 8, Haddat and Tangle keep their places, Tallow and Hessa fill the squad to five') : no('imp ' + JSON.stringify(R.imp));
R.imp.dead === 'marrow,sathi' && R.imp.deadFrom && !R.sathiInSquad && R.marrowRecruitable === false ? ok('the Barrow dead stay dead (in S.dead, marked from Book Two)') : no('dead ' + R.imp.dead + ' from ' + R.imp.deadFrom);
R.imp.haddatGear && R.imp.tangleGear && R.imp.kit ? ok('worn gear and unworn kit come across') : no('gear ' + JSON.stringify(R.imp));
R.imp.picks === '["shieldwall","iron","keen"]' ? ok('talents and veteran picks come across') : no('picks ' + R.imp.picks + ' due ' + R.imp.due);
!/pull/.test(R.imp.tricks) ? ok(`tricks of the dead stay behind (came: ${R.imp.tricks || 'none'})`) : no('tricks ' + R.imp.tricks);
R.imp.inv === JSON.stringify({sharper:4, burner:0, cusser:1, smoker:2, salve:2}) ? ok("Tangle's satchel comes across as Book Two left it") : no('inv ' + R.imp.inv);
R.imp.loyH === 3 && R.imp.loyT === 2 && R.imp.flags ? ok('loyalty and the Book Two flags later chapters read come across (S.imported.f)') : no('loy/flags ' + JSON.stringify(R.imp));
R.imp.ramin && R.imp.keth ? ok('Ramin (the cells) and Keth (the Wickan children) are offered as recruits') : no('recruits ' + R.imp.ramin + ' ' + R.imp.keth);
R.imp.reader === 'tallow' ? ok('with Marrow dead, Tallow reads from his grandmother\'s deck') : no('reader ' + R.imp.reader);
R.imp.oneKept && R.imp.from === 'Rusk' && R.imp.road === 'guard' ? ok('the Book Two save is kept; the new save knows its road') : no('kept ' + JSON.stringify(R.imp));
R.joinRamin === true && R.joinKeth === false && R.kethWaits === true && R.swap === true && R.after.kethIn && R.after.raminWaits && !/redblade/.test(R.after.squad) && R.after.vet === 2 ? ok('one recruit at a time: Keth waits, the swap brings him in and sends Ramin back, with his veteran picks') : no('swap ' + JSON.stringify(R));
R.lives.haddat !== R.livesBack.haddat && R.lives.rel && !R.livesBack.rel ? ok("Book Two's four wear their Book Four lives in Book Four, and Book Two's in Book Two") : no('lives ' + JSON.stringify([R.lives, R.livesBack]));
R.n5 === 1 && R.n8.regs === 2 && R.n9 === 3 && R.n0.regs === 1 && R.n0.brittle ? ok('the company: one regular, two at Nerve 7+, three at 9+; brittle at 3 or less') : no('regs ' + JSON.stringify([R.n5, R.n8, R.n9, R.n0]));
R.broke === 0 ? ok('at Nerve 0 the regular breaks at the end of round 2') : no('broke ' + R.broke);
R.n8.dustLog && R.n8.xbRng === Math.max(2, R.n8.xbBase - 2) ? ok(`Dust 2 is logged and shortens the crossbow (${R.n8.xbBase} → ${R.n8.xbRng})`) : no('dust ' + JSON.stringify(R.n8));
R.nerveMax === 10 && R.nerveMin === 0 && R.html ? ok('Nerve stays within 0..10; the widget shows Nerve and Dust') : no('nerve ' + R.nerveMax + ' ' + R.nerveMin);
R.pct === 15 && /never sputters/.test(R.leperFx) ? ok('Dust 3: sorcery sputters 15%; the Leper keeps it clean') : no('pct ' + R.pct);
R.shelf === 'gotm,dg,moi' && R.picker === 'gotm,dg,moi' ? ok('Book Four is off the shelf and the picker while it has no chapters') : no('shelf ' + R.shelf + ' picker ' + R.picker);
R.hocTitle.name === 'Unblooded' && /never fought/.test(R.hocTitle.tag) && R.hocTitle.patch === 'hoc' && /hoc/.test(R.hocTitle.picker) && R.hocTitle.imp ? ok('asked for by name, the title dresses for Book Four (Unblooded, its line, its patch) and offers the transfer') : no('hoc title ' + JSON.stringify(R.hocTitle));
/still being written/.test(R.begin.msg) && R.begin.view === 'title' && !R.begin.S ? ok('Begin Book Four says it is still being written and stays on the title') : no('begin ' + JSON.stringify(R.begin));
/Haddat and Tangle/.test(R.impDesc) && /Sathi and Marrow|Marrow and Sathi/.test(R.impDesc) && /Tallow and Hessa/.test(R.impDesc) ? ok('the transfer is described when picked: ' + R.impDesc) : no('impDesc ' + R.impDesc);
}
errors.length ? no('page errors: ' + errors.join(' | ')) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b4carry: FAIL (${bad.length})` : 'b4carry: all ok'); process.exit(bad.length ? 1 : 0);
