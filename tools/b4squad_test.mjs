// v7.1: the Fourteenth's spares (src/70e_b4_squad.js). The muster at Chapter 1's start (the pick, and its marks: a squad of the sergeant,
// Haddat and Ramin lacks a healer, a bow, a sapper and sorcery; a fresh start with Marrow and Tangle lacks only a bow and sorcery, and is not
// offered Rasp); the three new soldiers and Tallow's and Hessa's new abilities in a fight (Sky-Fire hits, the Sky's Shove throws, the Worm
// heals, Autumn's Touch strips armour, the sling shoots at range, the Twins reroll a miss and a failed save); the Dust on Yorin and not on
// Hessa; the fire offer for a save from before the muster (and for a transfer save mid-book), and none after a muster; the sheets and the fates.
// Usage: node tools/b4squad_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const vis = id => DLG[id]().ch.filter(x => !x.req || x.req());
  const take = (id, re) => { const c = vis(id).find(x => re.test(x.t)); if (!c) throw new Error(`${id}: no choice ${re} in [${vis(id).map(x => x.t).join(' | ')}]`);
    runFx(c); if (typeof c.go === 'string') talk(c.go); else if (typeof c.go === 'function') c.go(); return c; };
  const marks = () => Object.fromEntries(['tallow', 'hessa', 'tebbet', 'darrut', 'mirrel', 'yorin', 'rasp'].map(id => [id, b4SpareOk(id) ? b4SpareMark(id) || '-' : 'x']));
  try {
  /* ================= the muster: a fresh start (Haddat, Tangle, Marrow came across; one place) ================= */
  setBook('hoc'); S = newStateHOC('Fresh'); S.picksDue = []; save(); startChapter(1);
  out.fresh = {due:S.f.b4_musterDue, node:B4CH1.intro.node, intro:B4CH1.intro.paras.map(p => typeof p === 'function' ? p() : p).join(' ')};
  talk('b4_muster'); out.fresh.squad = S.squad.join(','); out.fresh.marks = marks(); out.fresh.choices = vis('b4_muster').map(c => c.t + (c.tag ? ' [' + c.tag + ']' : ''));
  out.fresh.btn = [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent).join(' | ');
  take('b4_muster', /Take Yorin/); out.fresh.after = {squad:S.squad.join(','), choices:vis('b4_muster').map(c => c.t), loy:S.loy.yorin, vet:(S.picks.yorin || []).filter(p => PICKS.vet.some(v => v[0] === p)).length};
  take('b4_muster', /Into the line/); out.fresh.done = {node:S.node, mustered:S.f.b4_mustered, due:(S.picksDue || []).join(','), intro:B4CH1.intro.node, spares:b4SparesOpen()};
  /* ================= the muster: the sergeant, Haddat and Ramin (two places) ================= */
  S = newStateHOC('Two'); S.squad = ['sgt', 'haddat', 'redblade']; S.loy = {haddat:0, redblade:0}; S.f.b4_musterDue = 2; S.f.b4_fill = []; S.picksDue = []; S.chapter = 1; save();
  out.two = {marks:marks()}; talk('b4_muster'); take('b4_muster', /Take Mirrel/); out.two.marks2 = marks(); take('b4_muster', /Take Rasp/);
  out.two.squad = S.squad.join(','); out.two.last = vis('b4_muster').map(c => c.t).join('|'); take('b4_muster', /Into the line/); out.two.mustered = S.f.b4_mustered;
  /* ================= a fight: Tallow, Hessa, Mirrel, Yorin, Rasp ================= */
  S = newStateHOC('Fight'); S.squad = ['sgt', 'tallow', 'hessa', 'mirrel', 'yorin', 'rasp']; ['tallow', 'hessa', 'mirrel', 'yorin', 'rasp'].forEach(k => { S.loy[k] = 0; S.gear[k] = {}; S.picks[k] = []; });
  S.f.b4_mustered = 1; S.chapter = 2; S.dust = 0; S.picksDue = []; migrate(S); save();
  const map = Array.from({length:10}, () => '........');
  BATTLES.__sq = {title:'A test ground', warren:{meanas:1, denul:1}, map, party:[[0,9],[1,9],[2,9],[3,9],[4,9],[5,9]], foes:[['deserter',3,5],['deserter',4,5],['deserter',7,0]], xp:10, after:'__sqafter', noDog:true};
  DLG.__sqafter = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  const fight = async (dust) => { if (dust != null) BATTLES.__sq.dust = dust; else delete BATTLES.__sq.dust; startBattle('__sq', {}); B.over = true; await wait(300); B.over = true; B.busy = false; return B; };
  const U = id => B.units.find(u => u.id === id), F = () => B.units.filter(u => u.side === 'e');
  const act = async (who, k, x, y) => { B.cur = U(who); B.over = true; useAb(k, x, y); await wait(900); };
  await fight();
  const ab = Object.fromEntries(['tallow', 'hessa', 'mirrel', 'yorin', 'rasp'].map(k => [k, U(k).ab.join(',')]));
  out.fight = {ab, tallowRng:U('tallow').rng, tallowVerb:U('tallow').verb, healer:HEALER(), yorinMagic:!!U('yorin').magic, hessaMagic:!!U('hessa').magic};
  // Sky-Fire: a foe made easy to hit
  const [f1, f2] = F(); f1.ac = -40; f1.hp = f1.maxhp = 500; const y = U('yorin'); y.x = 1; y.y = 5;
  await act('yorin', 'b4_bolt', f1.x, f1.y); out.fight.bolt = {dealt:500 - f1.hp, strain:U('yorin').strain, log:B.log.slice(0, 3).join(' ')};
  // the Sky's Shove: f1 at (3,5) and f2 at (4,5), Yorin at (1,5): both thrown east
  f1.x = 3; f1.y = 5; f2.x = 4; f2.y = 5; f1.hp = f1.maxhp = 40; f2.hp = f2.maxhp = 40; f1.boss = false; f2.boss = false;
  await act('yorin', 'b4_gust', 3, 5); await wait(1200); out.fight.gust = {f1:[f1.x, f1.y], f2:[f2.x, f2.y], hurt:f1.hp < 40 && f2.hp < 40};
  // Autumn's Touch: the armour rots −3
  f1.hp = f1.maxhp = 40; const h = U('hessa'); h.x = f1.x - 2; h.y = f1.y; const ac0 = atkCalc(U('tallow'), f1).ac; await act('hessa', 'b4_rot', f1.x, f1.y);
  out.fight.rot = {ac0, ac1:atkCalc(U('tallow'), f1).ac, hp:f1.hp, cd:!abOk(U('hessa'), 'b4_rot')};
  // the Worm Gives Back: Tallow hurt, beside Hessa
  const tl = U('tallow'); tl.x = h.x; tl.y = h.y + 1; tl.hp = 5; await act('hessa', 'b4_wormgift', tl.x, tl.y); out.fight.worm = {hp:tl.hp, used:B.used.b4_wormgift};
  // the sling: Tallow at range 4 from a foe
  const f3 = F()[2]; f3.x = tl.x + 4; f3.y = tl.y; f3.ac = -40; f3.hp = f3.maxhp = 500; B.cur = tl; const sl = attack(tl, f3); await wait(500); out.fight.sling = {hit:sl.hit, cheb:cheb(tl, f3), log:B.log.filter(l => /^Tallow /.test(l))[0]};
  // the Twins on a miss: Rasp carries them; a foe she cannot hit except on a 20
  await act('tallow', 'b4_twins', U('rasp').x, U('rasp').y); out.fight.twinsOn = U('rasp').twinsUntil; f3.ac = 99; const rr = Math.random; Math.random = () => .3;
  attack(U('rasp'), f3); Math.random = rr; out.fight.twins = {log:B.log.slice(0, 4).filter(l => /Rasp|Twins/.test(l)).join(' '), spent:U('rasp').twinsUntil, once:!abOk(U('tallow'), 'b4_twins')};
  // the Twins on a save: Mirrel carries them and walks into a burner's fire, fails, and the Twins roll again
  const mi = U('mirrel'); mi.twinsUntil = B.round + 1; mi.hp = mi.maxhp; mi.burnTurns = 0; B.fires.push({x:mi.x, y:mi.y, until:B.round + 3});
  const d0 = B4ROLL.d20; B4ROLL.d20 = () => 20; Math.random = () => 0; enterFire(mi); Math.random = rr; B4ROLL.d20 = d0;
  out.fight.twinsSave = {burn:mi.burnTurns || 0, log:B.log.filter(l => /Twins/.test(l))[0]};
  // the sheets: each new soldier's page opens and names them
  out.sheets = {}; for (const id of ['mirrel', 'yorin', 'rasp', 'tallow', 'hessa']) { B = null; S.scene = 'explore'; const i = SQUAD().indexOf(id); openChars(i); await wait(60); const c = document.getElementById('chars'); out.sheets[id] = !!c && !c.hidden && c.textContent.includes(TPL[id].name) && c.textContent.includes(TPL[id].role.split(' · ')[0].split(' ')[0]); closeChars(); }
  /* ================= the Dust: Yorin's warren sputters; Hessa's prayer does not ================= */
  S.chapter = 7; S.dust = 3; save(); await fight(3); out.dust = {now:b4DustNow()};
  const g1 = F()[0]; g1.ac = -40; g1.hp = g1.maxhp = 500; const y2 = U('yorin'); y2.x = 1; y2.y = 5; g1.x = 3; g1.y = 5;
  const sp0 = S.f.b4_sputters || 0; Math.random = () => 0.01; B.cur = y2; useAb('b4_bolt', g1.x, g1.y); Math.random = rr; await wait(900);
  out.dust.bolt = {sputters:(S.f.b4_sputters || 0) - sp0, log:B.log.filter(l => /sputters|warren|Half effect/i.test(l)).length, dealt:500 - g1.hp};
  const sp1 = S.f.b4_sputters || 0; const h2 = U('hessa'); h2.x = g1.x - 1; h2.y = g1.y; Math.random = () => 0.01; B.cur = h2; useAb('b4_rot', g1.x, g1.y); Math.random = rr; await wait(600);
  out.dust.rot = {sputters:(S.f.b4_sputters || 0) - sp1, rotted:g1.rotUntil >= B.round};
  B = null;
  /* ================= the fire offer: a save from before the muster ================= */
  S = newStateHOC('Old'); delete S.f.b4_musterDue; delete S.f.b4_fill; S.chapter = 2; S.picksDue = []; save(); startChapter(2); S.picksDue = [];
  out.old = {open:b4SparesOpen(), offered:vis('b4_c2_fire').some(c => /Radde has spares/.test(c.t))};
  talk('b4_c2_fire'); take('b4_c2_fire', /Radde has spares/); out.old.spares = vis('b4_spares').map(c => c.t + (c.tag ? ' [' + c.tag + ']' : ''));
  take('b4_spares', /Take Mirrel/); take('b4_spares_out', /Tallow goes back/); S.picksDue = [];
  out.old.squad = S.squad.join(','); out.old.tallowGear = JSON.stringify(S.gear.tallow || {}); take('b4_spares_done', /That will do/);
  out.old.after = {node:S.node, mustered:S.f.b4_mustered, open:b4SparesOpen(), offered:vis('b4_c2_fire').some(c => /Radde has spares/.test(c.t))};
  /* a transfer save mid-book (Chapter 3), from before the muster: offered, and no sapper while Tangle walks */
  S = newStateHOC('Kell'); S.imported = {from:'Kell', sid:'t', road:'guard', lvl:8, mates:['haddat', 'tangle'], dead:['sathi', 'marrow'], ramin:true, keth:false, f:{}};
  S.squad = ['sgt', 'haddat', 'tangle', 'tallow', 'hessa']; delete S.f.b4_musterDue; delete S.f.b4_fill; S.chapter = 3; S.picksDue = []; save(); startChapter(3); S.picksDue = [];
  out.imp = {open:b4SparesOpen(), offered:vis('b4_c3_feast').some(c => /Radde has spares/.test(c.t)), rasp:b4SpareOk('rasp'), list:b4SpareList().join(','), marks:marks()};
  take('b4_c3_feast', /Radde has spares/); take('b4_spares', /Keep the squad/); out.imp.kept = {mustered:S.f.b4_mustered, node:S.node, open:b4SparesOpen()};
  /* the fate pages, every road */
  out.fates = {}; S.squad = ['sgt', 'mirrel', 'yorin', 'rasp']; S.chapter = 7;
  for (const id of ['mirrel', 'yorin', 'rasp']) for (const k of ['line', 'horse', 'ledger']) { const f = B4FIN7.fate(id, k); out.fates[id + ':' + k] = f && f.title && f.txt && f.txt.length > 200 && f.txt.includes(TPL[id].name); }
  S.dead = {yorin:{ch:7, where:'x'}}; out.fates.gone = /wind-vane/.test((B4FIN7.gone('yorin', 'line') || {}).txt || '');
  out.fates.ids = B4CH7.finale.ids().filter(k => ['mirrel', 'yorin', 'rasp'].includes(k)).length;
  } catch (e) { out.err = e.stack; }
  return out;
});
const R = r;
if (R.err) no('page script threw: ' + R.err);
else {
  const F = R.fresh;
  F.due === 1 && F.node === 'b4_muster' && /owes the squad one soldier/.test(F.intro) ? ok('a fresh start owes the squad one soldier; Chapter 1 opens on the muster') : no('fresh muster ' + JSON.stringify(F));
  F.squad === 'sgt,haddat,tangle,marrow' ? ok('the muster clears the provisional fill: the sergeant, Haddat, Tangle and Marrow') : no('fresh squad ' + F.squad);
  const fm = F.marks; fm.tallow === 'no bow in the squad' && fm.tebbet === 'no bow in the squad' && fm.yorin === 'no sorcery in the squad' && fm.mirrel === '-' && fm.hessa === '-' && fm.darrut === '-' && fm.rasp === 'x'
    ? ok('fresh start, Marrow and Tangle in: only bow and sorcery are marked, and Rasp is not offered') : no('fresh marks ' + JSON.stringify(fm));
  F.choices.length === 6 && F.choices.some(c => /Take Yorin \(mage of Serc\)\. \[no sorcery in the squad\]/.test(c)) && /Take Tallow/.test(F.btn) ? ok('the spares are listed as choices with their role and the mark') : no('fresh choices ' + JSON.stringify(F.choices) + ' ' + F.btn);
  F.after.squad === 'sgt,haddat,tangle,marrow,yorin' && F.after.choices.join() === 'Into the line.' && F.after.loy === 0 && F.after.vet === 2 ? ok('taking Yorin fills the place (with his veteran picks); then only "Into the line"') : no('fresh after ' + JSON.stringify(F.after));
  F.done.mustered === 1 && /3/.test(F.done.due) && F.done.intro === 'b4_c1_start' && !F.done.spares ? ok('into the line: mustered, Yorin\'s talent pick due, no fire offer afterwards') : no('fresh done ' + JSON.stringify(F.done));
  const m2 = R.two.marks; m2.mirrel === 'no healer in the squad' && m2.tallow === 'no bow in the squad' && m2.tebbet === 'no bow in the squad' && m2.yorin === 'no sorcery in the squad' && m2.rasp === 'no sapper in the squad' && m2.hessa === '-' && m2.darrut === '-'
    ? ok('the sergeant, Haddat and Ramin: healer, bow, sorcery and munitions all marked') : no('two marks ' + JSON.stringify(m2));
  R.two.marks2.mirrel === 'x' && R.two.marks2.rasp === 'no sapper in the squad' && R.two.squad === 'sgt,haddat,redblade,mirrel,rasp' && R.two.last === 'Into the line.' && R.two.mustered === 1
    ? ok('two places: Mirrel then Rasp, the marks recounted after each pick') : no('two ' + JSON.stringify(R.two));
  const G = R.fight;
  G.ab.tallow === 'b4_twins,salve' && G.ab.hessa === 'b4_rot,b4_wormgift,salve' && G.ab.mirrel === 'mend,wash,stanch,salve' && G.ab.yorin === 'b4_bolt,b4_gust,salve' && G.ab.rasp === 'sharper,burner,cusser,smoker,salve' && G.healer === 'mirrel' && G.yorinMagic && !G.hessaMagic
    ? ok('the abilities: Tallow the Twins, Hessa two prayers, Mirrel Marrow\'s, Yorin two Serc spells, Rasp the satchel; Mirrel is the healer') : no('abilities ' + JSON.stringify(G));
  G.bolt.dealt > 0 && G.bolt.strain === 2 && /lightning/.test(G.bolt.log) ? ok(`Sky-Fire hits (${G.bolt.dealt} damage, strain 2)`) : no('bolt ' + JSON.stringify(G.bolt));
  G.gust.f1[0] === 5 && G.gust.f2[0] === 6 && G.gust.f1[1] === 5 && G.gust.hurt ? ok('the Sky\'s Shove throws both foes two tiles back, and hurts them') : no('gust ' + JSON.stringify(G.gust));
  G.rot.ac1 === G.rot.ac0 - 3 && G.rot.cd ? ok(`Autumn's Touch: armour ${G.rot.ac0} → ${G.rot.ac1}, then it recharges`) : no('rot ' + JSON.stringify(G.rot));
  G.worm.hp > 5 && G.worm.used === 1 ? ok(`the Worm Gives Back heals Tallow (5 → ${G.worm.hp})`) : no('worm ' + JSON.stringify(G.worm));
  G.tallowRng === 4 && G.sling.cheb === 4 && G.sling.hit && /slings a stone at/.test(G.sling.log) ? ok('Tallow\'s sling shoots at range 4') : no('sling ' + JSON.stringify([G.tallowRng, G.sling]));
  /The Twins/.test(G.twins.log) && (G.twins.log.match(/misses/g) || []).length === 2 && G.twins.spent === -1 && G.twins.once ? ok('the Twins: a missed quarrel is thrown again, once a fight') : no('twins ' + JSON.stringify(G.twins));
  G.twinsSave.burn === 0 && /The Twins/.test(G.twinsSave.log) ? ok('the Twins: a failed save against fire is rolled again') : no('twins save ' + JSON.stringify(G.twinsSave));
  Object.values(R.sheets).every(Boolean) ? ok('the character sheet shows each of the five') : no('sheets ' + JSON.stringify(R.sheets));
  R.dust.now === 3 && R.dust.bolt.sputters === 1 && R.dust.bolt.log >= 1 ? ok('Dust 3: Yorin\'s Sky-Fire sputters (half effect)') : no('dust bolt ' + JSON.stringify(R.dust));
  R.dust.rot.sputters === 0 && R.dust.rot.rotted ? ok('Dust 3: Hessa\'s prayer is untouched') : no('dust rot ' + JSON.stringify(R.dust.rot));
  R.old.open && R.old.offered && R.old.spares.some(s => /Take Mirrel \(Denul healer\)\./.test(s)) && R.old.spares.some(s => /Keep the squad/.test(s)) ? ok('a save from before the muster: the fire offers Radde\'s spares') : no('old ' + JSON.stringify(R.old));
  R.old.squad === 'sgt,haddat,tangle,marrow,mirrel' && R.old.tallowGear === '{}' ? ok('the swap: Mirrel in Tallow\'s place, Tallow\'s kit back in the pack') : no('old swap ' + R.old.squad + ' ' + R.old.tallowGear);
  R.old.after.node === 'b4_c2_fire' && R.old.after.mustered === 'fire' && !R.old.after.open && !R.old.after.offered ? ok('back at the fire, and the offer is done for the book') : no('old after ' + JSON.stringify(R.old.after));
  R.imp.open && R.imp.offered && !R.imp.rasp && !/rasp/.test(R.imp.list) && R.imp.kept.mustered === 'kept' && R.imp.kept.node === 'b4_c3_feast' && !R.imp.kept.open
    ? ok('a transfer save mid-book is offered the spares (no sapper while Tangle walks), and may keep its squad') : no('imp ' + JSON.stringify(R.imp));
  Object.entries(R.fates).every(([k, v]) => k === 'ids' ? v === 3 : v) ? ok('a fate page for each of the three on every road, and a fallen line') : no('fates ' + JSON.stringify(R.fates));
}
errors.length ? no('page errors: ' + errors.join(' | ')) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b4squad: FAIL (${bad.length})` : 'b4squad: all ok'); process.exit(bad.length ? 1 : 0);
