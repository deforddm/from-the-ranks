// v7.2: the roster (src/38c_roster.js). In every book the choice is at each chapter fire; the squad is at most six; the core always walks;
// recruits and spares can be sent to camp and brought back, choosing both sides on one screen; gear is parked and given back; the Book Three
// full import (sergeant, four, Ellis) can bench Ellis for Sohra, Sohra waiting is offered, and no fire claims she came when there was no room;
// Book Four chooses which recruit goes and keeps its five; transfers carry Ramin into Book Four and Ellis into Book Three with gear, loyalty
// and picks; Back drops a half-made choice, then closes; the screen fits a phone.
// Usage: node tools/roster_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(() => { const out = {};
  const click = sel => { const b = document.querySelector(sel); if (!b || b.disabled) return false; b.click(); return true; };
  const sheetText = () => $('#sheet').textContent;
  /* ---- the choice at every chapter fire ---- */
  out.fires = {}; const mk = {gotm:()=>newState('F1'), dg:()=>newStateDG('F2'), moi:()=>newStateMOI('F3'), hoc:()=>newStateHOC('F4')};
  for (const [book, chs] of Object.entries(ROSTER_FIRES)) { setBook(book); S = mk[book](); S.picksDue = []; if (book === 'hoc') { S.f.b4_mustered = 1; delete S.f.b4_musterDue; }
    out.fires[book] = {chapters:Object.keys(chs).map(Number), miss:[]};
    for (const [n, ids] of Object.entries(chs)) for (const id of ids) { S.chapter = +n;
      let has = false; try { const node = DLG[id](); has = node.ch.some(c => c.t === 'The roster.' && (!c.req || c.req())); } catch(e) { has = 'err ' + e.message; }
      if (has !== true) out.fires[book].miss.push(`${n}:${id}:${has}`); } }
  setBook('gotm');
  /* ---- Book One: six at most; Vell with no room waits at camp and says so; the core can't be benched ---- */
  S = newState('One'); S.chapter = 4; S.picksDue = []; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; recruit('ellis'); notes = [];
  recruit('vell'); out.one = {sq:S.squad.join(','), camp:(S.camp || []).join(','), note:notes.map(n => n.t).join(' | '), core:rosterCanOut('brisk'), ellis:rosterCanOut('ellis'), swap:rosterCanSwap('ellis', 'vell'), inAlone:rosterCanIn('vell')};
  rosterSwap('ellis', 'vell'); out.one.after = {sq:S.squad.join(','), camp:S.camp.join(','), len:S.squad.length};
  openModal('roster'); out.one.tab = !!document.querySelector('#modal .mbox.roster') && /Ellis/.test($('#modal').textContent); closeRoster();
  /* ---- Book Two: Ramin, then Keth with no room: Ramin goes back, and the roster can change it back ---- */
  setBook('dg'); S = newStateDG('Two'); S.chapter = 3; S.picksDue = []; save();
  b2SwapIn('redblade'); out.two = {r:S.squad.join(',')}; b2SwapIn('warlock'); out.two.k = S.squad.join(','); out.two.wait = rosterCampList().join(',');
  out.two.open = rosterOpen(); out.two.back = rosterSwap('warlock', 'redblade'); out.two.sq = S.squad.join(','); out.two.len = S.squad.length;
  out.two.cap = rosterValid([...S.squad, 'warlock']);
  /* ---- Book Three: the full import, sergeant + four + Ellis; Sohra waits ---- */
  setBook('gotm'); const a = newState('Rusk'); Object.assign(a, {chapter:7, chapters:{0:'given', 7:'outlaw'}, lvl:8, xp:1900, squad:['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'ellis'],
    f:{c7_follow:{brisk:true, kettle:true, tuft:true, ohl:true, ellis:true}, c7_key:'outlaw'}, kit:['guildblade', 'scoutcloak'], gear:{sgt:{}, ellis:{weapon:'guildblade', armour:'scoutcloak'}},
    loy:{brisk:1, kettle:1, tuft:1, ohl:1, ellis:2}, picks:{ellis:['ghost', 'iron', 'keen'], sgt:['discipline', 'iron', 'keen']}});
  S = a; save(); const aid = a.sid; S = null;
  S = newStateMOI('Rusk', aid, newSid()); S.picksDue = []; S.chapter = 6; save();
  out.three = {sq:S.squad.join(','), ellisGear:JSON.stringify(S.gear.ellis), ellisLoy:S.loy.ellis, ellisPicks:(S.picks.ellis || []).join(',')};
  b3Join('sohra'); out.three.join = {sq:S.squad.join(','), waiting:b3Waiting('sohra'), camp:rosterCampList().join(','), canSend:b3CanSend('sohra')};
  const fire = DLG.b3_c6_fire(); out.three.fireSend = fire.ch.filter(c => /Send for Sohra/.test(c.t) && (!c.req || c.req())).length; out.three.fireRoster = (fire.ch.find(c => c.t === 'The roster.') || {}).tag;
  /* the screen: choose Ellis out, Sohra in, do it */
  startExplore(); talk('b3_c6_fire'); const rc = curCh.find(c => c.t === 'The roster.'); choose(rc); ROSTER_UI.flush();
  out.three.screen = rosterIsOpen(); out.three.lacks = $('#modal .rlack').textContent;
  out.three.sohraRow = /Sohra/.test($('#modal').textContent) && /at the Rhivi fires/.test($('#modal').textContent);
  out.three.coreBtn = !!document.querySelector('[data-rout="brisk"]');
  click('[data-rin="sohra"]'); out.three.askIn = ($('#modal .rask') || {}).textContent || '';
  backTop(); out.three.backSel = rosterIsOpen() && !rosterSel.inn;
  click('[data-rout="ellis"]'); click('[data-rin="sohra"]'); out.three.ask = ($('#modal .rask') || {}).textContent || ''; click('#rDo');
  out.three.after = {sq:S.squad.join(','), ellis:JSON.stringify(S.gear.ellis), parked:JSON.stringify((S.parked || {}).ellis || {}), camp:rosterCampList().join(','), flag:S.f.b3_sohraDone};
  out.three.fit = {sw:document.documentElement.scrollWidth, rows:[...document.querySelectorAll('#modal .rrow')].every(e => e.getBoundingClientRect().right <= 390)};
  out.three.top = $('#modal').scrollTop;
  backTop(); out.three.closed = !rosterIsOpen(); out.three.fireAgain = !$('#sheet').hidden && S.node === 'b3_c6_fire';
  /* the fire after: no false claims (Dannet waits, and there is no room and no recruit-for-recruit... Sohra walks, so a swap is honest) */
  S.f.b3_dannetDone = 2; S.camp.push('greysword'); out.three.dannet = {can:b3CanSend('greysword'), roster:rosterCanSwap('sohra', 'greysword')};
  b3SwapIn('greysword'); out.three.dannet.sq = S.squad.join(','); out.three.dannet.swapTxt = DLG.b3_c6_swap().txt.slice(0, 40);
  /* the 7-strong import: sergeant, four, Ellis and Vell: Vell waits at camp */
  setBook('gotm'); const b = newState('Seven'); Object.assign(b, {chapter:7, chapters:{0:'given', 7:'outlaw'}, lvl:8, squad:['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell'],
    f:{c7_follow:{brisk:true, kettle:true, tuft:true, ohl:true, ellis:true, vell:true}}, kit:['daruknife'], gear:{vell:{weapon:'daruknife'}}});
  S = b; save(); const bid = b.sid; S = null; S = newStateMOI('Seven', bid, newSid());
  out.seven = {sq:S.squad.join(','), camp:rosterCampList().join(','), vell:JSON.stringify(S.gear.vell), parked:JSON.stringify((S.parked || {}).vell || {})};
  /* ---- Book Four: which recruit goes; the five stay filled; Ramin carried from Book Two ---- */
  setBook('dg'); const c = newStateDG('Ram'); Object.assign(c, {chapter:7, chapters:{7:'guard'}, lvl:8, squad:['sgt', 'haddat', 'tangle', 'marrow', 'redblade'], kit:['b2_arensword', 'b2_arenmail'],
    gear:{sgt:{}, haddat:{}, tangle:{}, marrow:{}, redblade:{weapon:'b2_arensword', armour:'b2_arenmail'}}, loy:{haddat:1, tangle:1, marrow:1, redblade:3},
    picks:{redblade:[PICKS[3].redblade ? PICKS[3].redblade[0][0] : 'iron', 'iron']}, dead:{sathi:{ch:7, where:'The Barrow'}}});
  S = c; letGo('redblade', 'x'); S.f.b2_raminGone = 1; S.f.b2_raminDone = 1; S.f.b2_c7_key = 'guard'; save(); const cid = c.sid; S = null;
  setBook('hoc'); S = newStateHOC('Ram', cid, newSid()); S.picksDue = []; S.f.b4_mustered = 1; delete S.f.b4_musterDue; S.squad = [...S.squad.filter(k => !HOC_NEW.includes(k)), 'tallow']; S.loy.tallow = 0; S.chapter = 3; save();
  out.four = {imp:!!(S.imported && S.imported.ramin), parked:JSON.stringify((S.parked || {}).redblade || {})};
  b4Join('redblade'); out.four.ramin = {sq:S.squad.join(','), gear:JSON.stringify(S.gear.redblade), loy:S.loy.redblade, picks:(S.picks.redblade || []).join(',')};
  S.f.b4_orvasDone = 2; out.four.waiting = rosterCampList().join(',');
  out.four.spareAlone = rosterCanOut('tallow'); out.four.spareSwap = rosterCanSwap('tallow', 'hessa'); out.four.spareForRecruit = rosterCanSwap('tallow', 'orvas'); out.four.coreOut = rosterCanOut('haddat');
  out.four.recruitForRecruit = rosterCanSwap('redblade', 'orvas');
  openRoster(null); click('[data-rin="orvas"]'); out.four.outs = [...document.querySelectorAll('[data-rout]')].filter(b => !b.disabled).map(b => b.dataset.rout).join(',');
  click('[data-rout="redblade"]'); click('#rDo'); out.four.after = {sq:S.squad.join(','), camp:rosterCampList().join(','), flag:S.f.b4_raminDone};
  click('[data-rout="tallow"]'); click('[data-rin="tebbet"]'); click('#rDo'); out.four.spare = S.squad.join(','); closeRoster();
  out.four.offers = b4Offers().join(','); b4SwapIn('redblade'); out.four.sendFor = {sq:S.squad.join(','), gear:JSON.stringify(S.gear.redblade)};
  return out; });
console.log(JSON.stringify(r, null, 1).slice(0, 4000));
for (const [book, f] of Object.entries(r.fires)) {
  const need = book === 'gotm' ? [2] : [1, 2, 3, 4, 5, 6, 7];
  ok(need.every(n => f.chapters.includes(n)) && !f.miss.length, `${book}: the roster choice at every chapter fire (${f.chapters.join(',')}${f.miss.length ? '; missing ' + f.miss.join(' ') : ''})`);
}
ok(r.one.sq === 'sgt,brisk,kettle,tuft,ohl,ellis' && r.one.camp === 'vell' && /No room in the squad: Vell waits at camp/.test(r.one.note), `Book One: six at most, and Vell waits at camp and says so (${r.one.note})`);
ok(!r.one.core && r.one.ellis && r.one.swap && !r.one.inAlone, 'Book One: the core can\'t go to camp; Ellis can; Vell comes in only for someone');
ok(r.one.after.sq === 'sgt,brisk,kettle,tuft,ohl,vell' && r.one.after.camp === 'ellis' && r.one.tab, 'Book One: Vell in for Ellis, and the Roster tab is there');
ok(r.two.r === 'sgt,haddat,sathi,tangle,marrow,redblade' && r.two.k === 'sgt,haddat,sathi,tangle,marrow,warlock' && r.two.wait === 'redblade', `Book Two: Keth with no room sends Ramin back to his people (${r.two.k}; waits ${r.two.wait})`);
ok(r.two.open && r.two.back && r.two.sq === 'sgt,haddat,sathi,tangle,marrow,redblade' && r.two.len === 6 && !r.two.cap, 'Book Two: the roster swaps them back, and never makes seven');
ok(r.three.sq === 'sgt,brisk,kettle,tuft,ohl,ellis' && /guildblade/.test(r.three.ellisGear) && r.three.ellisLoy === 2 && /ghost/.test(r.three.ellisPicks), `Book Three: Ellis comes across with her gear, loyalty and picks (${r.three.ellisGear} ${r.three.ellisLoy} ${r.three.ellisPicks})`);
ok(r.three.join.sq === 'sgt,brisk,kettle,tuft,ohl,ellis' && r.three.join.waiting && r.three.join.camp === 'sohra' && !r.three.join.canSend, 'Book Three, full: Sohra waits at the Rhivi fires, and is not sent for blind');
ok(r.three.fireSend === 0 && /1 at camp/.test(r.three.fireRoster || ''), `the fire offers no "Send for Sohra" it can't keep, and the roster says one waits (${r.three.fireRoster})`);
ok(r.three.screen && r.three.sohraRow && !r.three.coreBtn, 'the screen opens over the fire, Sohra listed at camp, no button to bench the core');
ok(/No room: choose who goes to camp for Sohra/.test(r.three.askIn) && r.three.backSel, `choosing Sohra alone asks who goes out; Back drops the choice (${r.three.askIn})`);
ok(/Ellis to camp, Sohra walks/.test(r.three.ask) && r.three.after.sq === 'sgt,brisk,kettle,tuft,ohl,sohra' && r.three.after.camp === 'ellis' && r.three.after.flag === 1, `both sides chosen: Ellis to camp, Sohra in (${JSON.stringify(r.three.after)})`);
ok(r.three.after.ellis === '{}' && /guildblade/.test(r.three.after.parked), 'Ellis\'s gear stays in the pack, remembered for her');
ok(r.three.fit.sw <= 390 && r.three.fit.rows && r.three.top === 0, `the screen fits 390px and opens at the top (${JSON.stringify(r.three.fit)})`);
ok(r.three.closed && r.three.fireAgain, 'Back closes the screen, and the fire is there again');
ok(r.three.dannet.can && r.three.dannet.roster && r.three.dannet.sq === 'sgt,brisk,kettle,tuft,ohl,greysword' && /^Dannet/.test(r.three.dannet.swapTxt), `Dannet sent for: Sohra goes back, and the fire says Dannet came because she did (${JSON.stringify(r.three.dannet)})`);
ok(r.seven.sq === 'sgt,brisk,kettle,tuft,ohl,ellis' && r.seven.camp === 'vell' && r.seven.vell === '{}' && /daruknife/.test(r.seven.parked), `a seven-strong import: Vell waits at camp with his gear parked (${JSON.stringify(r.seven)})`);
ok(r.four.imp && /arensword/.test(r.four.parked), 'Book Four: Ramin\'s Book Two gear waits for him');
ok(/redblade/.test(r.four.ramin.sq) && /arensword/.test(r.four.ramin.gear) && /arenmail/.test(r.four.ramin.gear) && r.four.ramin.loy === 3 && /iron/.test(r.four.ramin.picks), `Ramin joins in his Book Two gear, loyalty and picks (${JSON.stringify(r.four.ramin)})`);
ok(!r.four.spareAlone && r.four.spareSwap && !r.four.spareForRecruit && !r.four.coreOut && r.four.recruitForRecruit, 'Book Four: a spare goes only for a spare (the five stay filled); recruit for recruit; never the core');
ok(r.four.outs === 'redblade' && r.four.after.sq.includes('orvas') && !r.four.after.sq.includes('redblade') && r.four.after.camp.includes('redblade') && r.four.after.flag === 2, `Book Four: the sergeant chooses which recruit goes (${r.four.outs}; ${JSON.stringify(r.four.after)})`);
ok(r.four.spare.includes('tebbet') && !r.four.spare.includes('tallow'), `a spare swapped for a spare (${r.four.spare})`);
ok(r.four.offers === 'redblade' && r.four.sendFor.sq.includes('redblade') && /arensword/.test(r.four.sendFor.gear), `"Send for Ramin" swaps him back for Orvas, in his own gear (${JSON.stringify(r.four.sendFor)})`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
console.log(bad.length ? `roster: FAIL (${bad.length})` : 'roster: all ok'); process.exit(bad.length ? 1 : 0);
