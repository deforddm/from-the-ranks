// v11.0: Book Eight's engine (docs/v11.0-notes.md). One squad, the Fourth: a fresh start (Brisk, Kettle, Tuft and Ohl at 16, cap 21), the
// transfers (a finished Book Three on 'daru' or 'standdown', lifted to 16; a finished Book Six whose Fourth took 'highfist', 'hanarara' or
// 'home', keeping its level, read from o.th.h when the Third played last; others refused), the Contract (moves, tiers, edges, the roofs, the
// way out, the fight hook, the engine's own moves), the Hound that cannot die, the gods by chapter (Hood to Ch 5, the dead in Ch 6, the
// Guardians from Ch 7; never the Redeemer or the Dying God), the new boons, the charm, the jug, the shroud (free, a ward at once), the
// recruits, the reader, the shelf (coming until a chapter registers) and the title screen.
// Usage: node tools/b8engine_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(async () => { const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  try {
  out.caps = ['gotm', 'dg', 'moi', 'hoc', 'mt', 'bh'].map(b => { S = {book:b}; return b + ':' + lvCap(); }).join(' ');
  S = {book:'tth'}; out.cap = lvCap();
  out.shelf = shelfBooks().map(b => b.id).join(','); out.coming = !!BOOKS.tth.coming; out.tthCh = Object.keys((BOOKSNAP.tth && BOOKSNAP.tth.ch) || {}).length; out.book = {n:BOOKS.tth.n, word:BOOKS.tth.word, name:BOOKS.tth.name, title:BOOKS.tth.title, tag:BOOKS.tth.tag};
  /* fresh */
  setBook('tth'); S = newStateTTH('Hask'); save();
  out.fresh = {book:S.book, lvl:S.lvl, squad:S.squad.join(','), con:b8Contract(), tier:b8ConTier(), key:keyFlag(), core:rosterBook().core.join(','), patron:PATRONS.sgt.god, sgt:/years/.test(TPL.sgt.bio || ''), road:b8Story()};
  gainXP(9999999); out.top = S.lvl;
  /* the Contract */
  S = newStateTTH('Hask'); notes = [];
  const c = {check:['guile', 12], contract:true}, plain = {check:['guile', 12]};
  const e0 = edgesFor(c, 'sgt').some(e => /paper/.test(e[0]));
  b8Con(3, 'names asked'); const e1 = edgesFor(c, 'sgt').find(e => /paper/.test(e[0])), e1p = edgesFor(plain, 'sgt').some(e => /paper/.test(e[0]));
  b8Con(20, 'test'); const top = b8Contract(), eTop = (edgesFor(c, 'sgt').find(e => /paper/.test(e[0])) || [])[1]; b8Con(-30, 'test');
  out.con = {e0, e1:e1 && e1[1], e1p, top, eTop, low:b8Contract(), noted:notes.some(n => /The Contract \+3 \(names asked\)/.test(n.t)), hi:S.b8.hi, lo:S.b8.lo, html:/The Contract/.test(contractHTML())};
  out.roofs = [0, 2, 4, 6, 8, 10].map(v => b8Roofs(6, v).length + ':' + b8Roofs(6, v).filter(k => k === 'b8_gmknife').length).join(' ');
  out.roofs5 = b8Roofs(5, 10).join(','); S.f.b8_c6_knivesDown = 1; out.roofs7 = b8Roofs(7, 10).length; delete S.f.b8_c6_knivesDown; out.roofs7b = b8Roofs(7, 10).length;
  out.way = [0, 1, 3, 5, 8, 10].map(v => b8WayOut(v)).join(','); S.squad.push('vasso'); out.wayV = b8WayOut(6); S.squad.pop();
  /* the fight hook and the Guild's dead */
  BATTLES.__b8 = Object.assign({}, BATTLES.knives, {foes:[['b8_knife', 3, 1]], contract:[[1, 1], [2, 1], [4, 1], [5, 1]], guild:true, after:'__b8after'});
  DLG.__b8after = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  S.chapter = 6; S.b8.con = 7; out.hook = battleDef('__b8').foes.map(f => f[0]).join(',');
  startBattle('__b8', {}); await wait(80); B.busy = true; out.hookB = foes().length;
  const con0 = b8Contract(); B.over = false; foes().forEach(f => hurt(f, 999)); checkEnd(); await wait(2600); out.guildDead = b8Contract() - con0;
  /* time away */
  S = newStateTTH('Hask'); S.chapter = 2; const s0 = S; out.away = {c0:b8Contract()}; try { startChapter(3); } catch(e) {} out.away.c3 = s0.b8.con; S = s0; try { startChapter(3); } catch(e) {} out.away.again = s0.b8.con;
  /* the Hound */
  S = newStateTTH('Hask'); S.chapter = 6; save();
  BATTLES.__hd = Object.assign({}, BATTLES.knives, {foes:[['b8_knife', 3, 1], ['b8_hound', 5, 1]], after:'__b8after'});
  startBattle('__hd', {}); await wait(80); B.busy = true; const hd = B.units.find(u => u.b8hound);
  hurt(hd, 99999); blast && 0; const h1 = hd.hp; B.round = 1; newRound(); const still = B.units.includes(hd); newRound(); const gone = !B.units.includes(hd);
  out.hound = {hp:h1, still, gone, noZero:h1 > 0, immortal:!!hd.immortal, rule:FOES.b8_hound.hp >= 999};
  /* the gods by chapter */
  S = newStateTTH('Hask'); const godAt = ch => { S.chapter = ch; return PATRONS.brisk.god; };
  out.gods = [1, 5, 6, 7].map(godAt).join('|'); S.chapter = 6; out.deadBoon = patronBoon('brisk') && patronBoon('brisk').key; S.chapter = 7; out.gateBoon = patronBoon('brisk') && patronBoon('brisk').key;
  out.krul = patronBoon('vasso') && patronBoon('vasso').key; out.edrem = !PATRONS.edrem;
  const all = []; for (let ch = 1; ch <= 7; ch++) { S.chapter = ch; Object.keys(PATRONS).forEach(id => all.push(PATRONS[id].god)); }
  out.never = !all.some(g => /Redeemer|Dying God|Crippled/.test(g)) && !Object.keys(BOONS).some(g => /Redeemer|Dying God/.test(g));
  S = {book:'gotm'}; out.briskOut = PATRONS.brisk.god; setBook('tth');
  out.sigils = ['patrons/b8dead', 'patrons/b8gate', 'patrons/krul'].every(k => ART[k]);
  /* the boons at work */
  S = newStateTTH('Hask'); S.chapter = 7; save();
  S.boons = {fight:'__hd', gods:['b8dead', 'b8gate', 'krul'], spared:{}}; startBattle('__hd', {}); await wait(80); B.busy = true;
  const br0 = B.units.find(u => u.id === 'brisk'), kn = foes().find(f => !f.b8hound);
  out.boons = {ward:br0.ward === Math.round(br0.maxhp * .1)};
  S.boons.gods = []; const hN = atkCalc(kn, br0).bonus, mN = atkCalc(br0, kn).bonus; S.boons.gods = ['b8dead', 'b8gate', 'krul'];
  out.boons.dead = atkCalc(kn, br0).bonus - hN; out.boons.krul = atkCalc(br0, kn).bonus - mN;
  br0.ward = 0; hurt(br0, 9999); out.boons.gate = br0.hp; out.boons.gateWard = br0.ward; hurt(br0, 9999); out.boons.gateOnce = br0.hp;
  /* the charm */
  S = newStateTTH('Hask'); S.chapter = 2; S.kit.push('b8_hoodcharm'); S.gear.brisk = {trinket:'b8_hoodcharm'}; save();
  startBattle('__hd', {}); await wait(80); B.busy = true; const bc = B.units.find(u => u.id === 'brisk'), ek = foes().find(f => !f.b8hound);
  ek.hp = Math.floor(ek.maxhp / 2); const ekh = ek.hp; bc.ward = 0; bc.soak = 0; bc.hp = bc.maxhp; const dn = Math.ceil(bc.maxhp * .6); hurt(bc, dn);
  out.charm = {back:bc.hp === bc.maxhp, laid:ekh - ek.hp, once:!!B.used.b8charm_brisk, art:!!ART['item/b8_hoodcharm'], special:/half/.test(itemSpecial ? (typeof ITEM_SPECIAL.b8_hoodcharm === 'function' ? ITEM_SPECIAL.b8_hoodcharm() : '') : '')};
  bc.hp = bc.maxhp; hurt(bc, dn); out.charm.second = bc.hp < bc.maxhp;
  S.chapter = 6; startBattle('__hd', {}); await wait(80); B.busy = true; const bc6 = B.units.find(u => u.id === 'brisk'), ek6 = foes().find(f => !f.b8hound); ek6.hp = Math.floor(ek6.maxhp / 2); bc6.ward = 0; bc6.soak = 0; hurt(bc6, Math.ceil(bc6.maxhp * .6)); out.charm.cold = bc6.hp < bc6.maxhp;
  /* the jug */
  S = newStateTTH('Hask'); S.chapter = 2; S.kit.push('b8_kelykjug'); S.gear.kettle = {trinket:'b8_kelykjug'}; save();
  startBattle('__hd', {}); await wait(80); B.busy = true; const kj = B.units.find(u => u.id === 'kettle'), kf = foes().find(f => !f.b8hound);
  const kb0 = atkCalc(kj, kf).bonus; kj.hp = 5; B.round = 1; out.jug = {ab:kj.ab.includes('b8_drink'), ok:abOk(kj, 'b8_drink'), free:!!AB.b8_drink.free};
  AB.b8_drink.run(kj); out.jug.healed = kj.hp > 5; out.jug.hit = atkCalc(kj, kf).bonus - kb0; out.jug.sick = S.injury && S.injury.kettle; out.jug.again = abOk(kj, 'b8_drink');
  const kNext = mkParty('kettle', 0, 0); B.used = {}; const kAfter = mkParty('kettle', 0, 0); out.jug.later = kAfter.atk - (kNext.atk);
  S.injury = {kettle:'kelyk'}; const k1 = mkParty('kettle', 0, 0); S.injury = null; const k0 = mkParty('kettle', 0, 0); out.jug.minus = k0.atk - k1.atk;
  out.jug.rand = [...Array(60)].map(() => { S.injury = null; giveInjury({id:'ohl', name:'Ohl'}); return S.injury.ohl; }).includes('kelyk'); S.injury = null;
  out.jug.art = !!ART['item/b8_kelykjug'];
  /* the shroud: free, a full 15% ward at once, never stacking */
  S = newStateTTH('Hask'); S.chapter = 3; S.tricks = {b8_shroud:{who:'tuft', ch:3, left:null}}; save();
  startBattle('__hd', {}); await wait(80); B.busy = true; const tu = B.units.find(u => u.id === 'tuft'), ta = B.units.find(u => u.id === 'brisk');
  out.shroud = {ab:tu.ab.includes('t_b8_shroud'), free:!!AB.t_b8_shroud.free && !!TRICKS.b8_shroud.free, elder:!!TRICKS.b8_shroud.elder};
  ta.ward = 0; AB.t_b8_shroud.run(tu, ta.x, ta.y); out.shroud.ward = ta.ward === wardCap(ta); ta.ward = wardCap(ta) + 5; AB.t_b8_shroud.run(tu, ta.x, ta.y); out.shroud.noStack = ta.ward === wardCap(ta) + 5;
  /* the transfers */
  const mk = o => { const id = newSid(); localStorage.setItem(slotKey(id), JSON.stringify(Object.assign({v:1, sid:id, f:{}, kit:[], gear:{}, picks:{}, loy:{}, inv:{salve:1, sharper:3}, dead:{}}, o))); const keep = S; S = loadSlot(id); save(); S = keep; return id; };
  const daru = mk({name:'Rusk', book:'moi', lvl:15, chapters:{7:'daru'}, squad:['sgt', 'brisk', 'kettle', 'ohl', 'sohra'], dead:{tuft:{ch:7, where:'Coral'}}, loy:{brisk:2}, gear:{brisk:{weapon:'b3_c7_greymail'}}});
  const host = mk({name:'Hosty', book:'moi', lvl:15, chapters:{7:'host'}, squad:['sgt', 'brisk']});
  const hf = mk({name:'Ula', book:'bh', thread:'r', lvl:18, chapters:{7:'adjunct'}, f:{b6_fourthRoad:'highfist'}, squad:['sgt', 'haddat'], th:{h:{name:'Brann', lvl:17, squad:['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'brannoc'], gear:{}, picks:{}, loy:{tuft:1}, kit:[], inv:{salve:2, cusser:2}, dead:{}}}});
  const unf = mk({name:'Half', book:'bh', thread:'h', lvl:16, chapters:{6:'letgo'}, f:{b6_fourthRoad:'home'}, squad:['sgt', 'brisk']});
  out.qual = {daru:!!b8Imp(daru), host:!!b8Imp(host), hf:!!b8Imp(hf), unf:!!b8Imp(unf), list:b8ImpList().length, name:b8ImpName(hf)};
  S = newStateTTH('Rusk', daru); setBook('tth');
  out.impM = {lvl:S.lvl, squad:S.squad.join(','), tuftDead:!!S.dead.tuft, road:b8Road(), loy:S.loy.brisk, lifted:S.imported.lifted, from:S.imported.book};
  S = newStateTTH('Brann', hf); out.impB = {lvl:S.lvl, squad:S.squad.join(','), road:b8Road(), cusser:S.inv.cusser, loy:S.loy.tuft, camp:(S.camp || []).join(',')};
  /* recruits */
  S = newStateTTH('Hask'); S.chapter = 1; b8Join('vasso'); out.rec = {vasso:S.squad.includes('vasso'), flag:S.f.b8_vassoDone, roles:['vasso', 'edrem'].every(id => TPL[id] && TPL_ROLES[id] && VERB[id] && STATUP[id] && PICKS[3][id]), por:!!(POR.vasso && POR.edrem), fig:!!(FIGX.vasso && FIGX.edrem)};
  b8Join('edrem'); b8Join('edrem'); out.rec.edrem = !S.squad.includes('edrem') && (S.camp || []).includes('edrem') && S.f.b8_edremDone === 2; out.rec.bench = rosterBook().bench().includes('sohra');
  /* the reader */
  S = newStateTTH('Hask'); S.chapter = 1; out.read = {who:visReader().id, choice:/Deck/.test(b8ReadChoice(1).t), offer:!!b8ReadOffer(1).ch.length, node:cardNodeName(), key:readingTableKey(),
    tables:[1, 2, 3, 4, 5, 6, 7].every(n => !!READTABLE['tth:' + n]), pools:[1, 2, 3, 4, 5, 6, 7].every(n => b8Pool(n).length === 5),
    said:[...new Set(Object.values(B8POOL).flat())].every(id => B8SAY[id] && ['tuft', 'sohra', 'benna'].every(k => B8SAY[id][k])), host:/Host/.test(b8ReadOffer(1).txt)};
  S.squad = S.squad.filter(k => k !== 'tuft'); out.read.benna = visReader().id; out.read.bennaWords = /Daru/.test(b8ReadOffer(1).txt);
  /* art, scenes, foes, glossary, keys */
  out.art = {title:/<svg/.test(ART['title/tth'] || ''), patch:/bell/.test(ART['insignia/tth'] || ''), titleArt:BOOKS.tth.titleArt, patchKey:BOOKS.tth.patch,
    scenes:Object.keys(B8_SCENE_LIKE).every(k => SCENES[k] && SCENEX[k]), foes:['b8_knife', 'b8_guildbow', 'b8_veteran', 'b8_gmknife', 'b8_cultist', 'b8_kelykpriest', 'b8_pilgrim', 'b8_bravo', 'b8_hound'].every(k => FOES[k]),
    soak:[foeSoak('b8_knife'), foeSoak('b8_veteran'), foeSoak('b8_gmknife')].join(','), sorc:FOE_SORC.has('b8_kelykpriest'), pierce:foePierce('b8_guildbow'),
    gloss:(GLOSSX.tth || []).length, keys:Object.keys(B8KEYS).length, defaults:Object.keys(B8KEY0).every(n => B8KEYS[n].includes(B8KEY0[n])), gap:Object.keys(B8GAP).length, voice:((AUDIO.names || (AUDIO._dev && AUDIO._dev.names) || {}).voices || []).includes('tth')};
  } catch(e) { out.err = String(e && e.stack || e); }
  return out; });
const ui = await page.evaluate(async () => { const wait = ms => new Promise(res => setTimeout(res, ms)); const o = {};
  try { o.empty = !!BOOKS.tth.coming; if (o.empty) { showTitle(false, 'tth'); await wait(300); document.getElementById('nm').value = 'Empt'; o.msgEmpty = (document.getElementById('bNew').click(), await wait(100), document.getElementById('nmMsg').textContent); } // once a chapter registers there is no empty screen to see
    registerChapter(1, {number:1, title:'Test', area:{id:'b8_test', map:['....'], start:{x:1, y:0}}, intro:{loc:'', sub:'', cap:'', paras:[], go:'Go'}}, 'tth'); showTitle(false, 'tth'); await wait(300);
    o.shelf = !BOOKS.tth.coming && shelfBooks().some(b => b.id === 'tth'); o.h1 = document.getElementById('tName').textContent;
    o.imp = !document.getElementById('impField').hidden && /Book Three or Book Six/.test(document.getElementById('impField').textContent);
    const seg = document.querySelector('.bseg'), bs = [...seg.querySelectorAll('.btn')]; o.picker = bs.length; o.fit = document.documentElement.scrollWidth <= innerWidth + 1 && bs.every(b => b.getBoundingClientRect().right <= innerWidth + 1);
    o.meet = /Time Served/.test(whereBooksMeetHTML(true));
    document.getElementById('nm').value = 'Ferro'; document.getElementById('bNew').click(); await wait(300); o.made = !!(S && S.book === 'tth' && S.name === 'Ferro' && S.lvl === 16);
  } catch(e) { o.err = String(e); } return o; });
if (r.err) ok(false, 'threw: ' + r.err); else {
  ok(r.caps === 'gotm:8 dg:8 moi:15 hoc:15 mt:8 bh:18' && r.cap === 21, `caps: ${r.caps}; Book Eight 21`);
  ok((r.tthCh ? !r.coming && r.shelf.includes('tth') : r.coming && !r.shelf.includes('tth')) && r.book.n === 8 && r.book.word === 'Eight' && r.book.name === 'Time Served' && r.book.title === 'Toll the Hounds' && /paper/.test(r.book.tag), 'the shelf: Book Eight, Time Served, beside Toll the Hounds, coming until a chapter registers');
  const f = r.fresh; ok(f.book === 'tth' && f.lvl === 16 && f.squad === 'sgt,brisk,kettle,tuft,ohl' && f.con === 3 && f.tier === 'paper' && f.key === 'b8_c0_key' && f.core === 'sgt,brisk,kettle,tuft,ohl' && f.patron === 'Treach' && f.sgt && f.road === 'daru' && r.top === 21, 'fresh start: the four at 16, Treach, b8_ keys, the Contract at 3, the daru years; the cap is 21: ' + JSON.stringify(f) + ' top ' + r.top);
  const c = r.con; ok(!c.e0 && c.e1 === -1 && !c.e1p && c.top === 10 && c.eTop === -3 && c.low === 0 && c.noted && c.hi === 10 && c.lo === 0 && c.html, 'the Contract: noted, clamped 0..10, its edge on contract:true checks only (−1 at 6, −3 at 10): ' + JSON.stringify(c));
  ok(r.roofs === '0:0 2:0 3:0 3:0 3:0 3:1' && r.roofs5 === 'b8_knife,b8_knife,b8_knife' && r.roofs7 === 0 && r.roofs7b === 2, `the roofs by the Contract (${r.roofs}); Ch 5 knives only (${r.roofs5}); Ch 7 one fewer, none after the Ch 6 win (${r.roofs7b}/${r.roofs7})`);
  ok(r.way === 'quiet,quiet,roofs,,,' && r.wayV === 'word', `the one way out: quiet, roofs, Vasso's word, then none (${r.way}; with Vasso ${r.wayV})`);
  ok(r.hook === 'b8_knife,b8_knife,b8_knife,b8_veteran' && r.hookB === 4 && r.guildDead === 1, `the fight hook puts the roofs on the contract tiles (${r.hook}); the Guild counts its dead (+${r.guildDead})`);
  ok(r.away.c0 === 3 && r.away.c3 === 2 && r.away.again === 2, 'time away: Chapter 3 cools the paper by 1, once: ' + JSON.stringify(r.away));
  ok(r.hound.noZero && r.hound.hp >= 999 && r.hound.still && r.hound.gone && r.hound.immortal && r.hound.rule, 'the Hound: nothing drops it (rule 14), it stays its rounds and goes on down the street: ' + JSON.stringify(r.hound));
  ok(r.gods === 'Hood|Hood|the dead|the Guardians of the Gate' && r.deadBoon === 'b8dead' && r.gateBoon === 'b8gate' && r.krul === 'krul' && r.edrem && r.never && r.briskOut === 'Hood' && r.sigils, `the gods by chapter (${r.gods}); K'rul for Vasso; Edrem none; never the Redeemer or the Dying God; Hood outside Book Eight; sigils`);
  const b = r.boons; ok(b.ward && b.dead === -1 && b.krul === 1 && b.gate === 1 && b.gateWard > 0 && b.gateOnce === 0, 'the new boons: the dead (a ward, −1 to be hit), the Gate (stay up once, with a ward), K\'rul (+1 to hit): ' + JSON.stringify(b));
  const ch = r.charm; ok(ch.back && ch.laid > 0 && ch.once && ch.second && ch.cold && ch.art, 'the Hood-touched charm: once a fight the wound comes off and goes to a dying foe; cold on the last night; art: ' + JSON.stringify(ch));
  const j = r.jug; ok(j.ab && j.ok && j.free && j.healed && j.hit === 2 && j.sick === 'kelyk' && !j.again && j.minus === 1 && !j.rand && j.art, 'the jug of kelyk: drunk on the first turn heals and +2 to hit; then the kelyk-sickness (−1) in the wound slot, never from a bad fall; art: ' + JSON.stringify(j));
  const sh = r.shroud; ok(sh.ab && sh.free && sh.elder && sh.ward && sh.noStack, 'the Kurald Galain shroud: a free trick, elder, a full 15% ward at once, never stacking: ' + JSON.stringify(sh));
  const q = r.qual; ok(q.daru && !q.host && q.hf && !q.unf && q.list === 2 && q.name === 'Brann', 'transfers: Book Three daru/standdown and a finished Book Six\'s Fourth; others refused; the Fourth\'s own sergeant name: ' + JSON.stringify(q));
  const m = r.impM; ok(m.lvl === 16 && m.squad === 'sgt,brisk,kettle,ohl,sohra' && m.tuftDead && m.road === 'daru' && m.loy === 2 && m.lifted && m.from === 'moi', 'a Book Three Fourth is lifted to 16, with its dead, loyalty and recruits: ' + JSON.stringify(m));
  const ib = r.impB; ok(ib.lvl === 17 && ib.squad === 'sgt,brisk,kettle,tuft,ohl,brannoc' && ib.road === 'highfist' && ib.cusser === 2 && ib.loy === 1, 'a Book Six Fourth keeps its level and comes from o.th.h: ' + JSON.stringify(ib));
  const rc = r.rec; ok(rc.vasso && rc.flag === 1 && rc.roles && rc.por && rc.fig && rc.edrem && rc.bench, 'recruits: Vasso and Edrem, roles, talents, busts and sprites; earlier recruits on the bench: ' + JSON.stringify(rc));
  const d = r.read; ok(d.who === 'tuft' && d.choice && d.offer && d.node === 'b8_c1_card' && d.key === 'tth:1' && d.tables && d.pools && d.said && !d.host && d.benna === 'benna' && d.bennaWords, 'the reader: Book Three\'s chain (Tuft, else Benna, now a Daru washerwoman), seven tables and pools, every card said: ' + JSON.stringify(d));
  const a = r.art; ok(a.title && a.patch && a.titleArt === 'title/tth' && a.patchKey === 'insignia/tth' && a.scenes && a.foes && a.soak === '0,1,2' && a.sorc && a.pierce && a.gloss >= 12 && a.keys === 7 && a.defaults && a.gap >= 24 && a.voice, 'title art, the patch with its bell, the backdrops, the foes with soak, the glossary, keys, the balance tables (a Bridgeburner row a fight, docs/v11.0-balance.md), the voice: ' + JSON.stringify(a));
}
ok((!ui.empty || /still being written/.test(ui.msgEmpty || '')) && ui.shelf && /Time/.test(ui.h1 || '') && ui.imp && ui.picker >= 8 && ui.fit && ui.meet && ui.made, 'the new-sergeant screen: still being written while empty; eight books fit at 390px; a transfer picker; Where the books meet; Begin makes a level-16 Fourth: ' + JSON.stringify(ui));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.close && srv.close();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nERRORS: none'); process.exit(bad.length ? 1 : 0);
