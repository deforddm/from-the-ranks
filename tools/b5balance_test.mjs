// Book Five's balance pass (David, Thu Oct 29, 2026; docs/mt-balance.md) and the fate-page fix.
//   - B5GAP (80) is Book Five's and Bridgeburner's only: with every row pushed to absurd numbers, a foe in Books One to Four, on every
//     chapter and difficulty, is exactly what it was; in Book Five, Story and Soldier foes are untouched by it (bar B5SOFT's fight);
//   - every Book Five chapter has a Bridgeburner row that makes foes harder, and the Soldier cap still holds (Soldier never harder than
//     Bridgeburner: the late Soldier extra and B5SOFT both sit under Bridgeburner's DIFFS + B5GAP);
//   - B5SOFT eases Ch 7's barricade on Soldier only, and nowhere else;
//   - the fate pages: a recruit waiting (not walking) at High Fort (Ch 4) or Brans Keep (Ch 6) is not credited with the rampart or the
//     crossing; one who walked is; the record is set when the key fight starts; an old save without the record credits as before.
import { server, browser as launch, openGame } from './page.mjs';
let bad = 0; const ok = (c, m) => { console.log(`${c ? 'ok' : 'FAIL'} ${m}`); if (!c) bad++; };

const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const out = await page.evaluate(() => {
  try {
    const mk = { gotm: () => newState('Sol'), dg: () => newStateDG('Sol'), moi: () => newStateMOI('Sol'), hoc: () => newStateHOC('Sol'), mt: () => newStateMT('Sol') };
    const foe = (book, ch, diff, bid) => { S = mk[book](); S.chapter = ch; S.diff = diff; B = bid ? { id: bid, def: {} } : null;
      const u = mkFoe('b5_edur', 1, 1); B = null; return { hp: u.maxhp, atk: u.atk, ac: u.ac, dmg: u.dmg[2] }; };
    const same = (a, b) => a.hp === b.hp && a.atk === b.atk && a.ac === b.ac && a.dmg === b.dmg;
    const keepGap = JSON.parse(JSON.stringify(B5GAP)), keepSoft = JSON.parse(JSON.stringify(B5SOFT)), keepFight = JSON.parse(JSON.stringify(B5GAP_FIGHT));
    const wild = () => { for (let c = 1; c <= 7; c++) Object.assign(B5GAP[c], { ac: 9, atk: 9, hp: 5, dmg: 9 }); },
      tame = () => { for (let c = 1; c <= 7; c++) Object.assign(B5GAP[c], { ac: 0, atk: 0, hp: 1, dmg: 0 }); },
      put = () => { for (let c = 1; c <= 7; c++) Object.assign(B5GAP[c], keepGap[c]); };
    const others = [];
    for (const book of ['gotm', 'dg', 'moi', 'hoc']) for (let ch = 1; ch <= 7; ch++) for (const diff of ['story', 'soldier', 'bridgeburner']) {
      tame(); const a = foe(book, ch, diff); wild(); const b = foe(book, ch, diff); put(); const c = foe(book, ch, diff);
      others.push({ book, ch, diff, same: same(a, b) && same(a, c) });
    }
    const mt = [];
    for (let ch = 1; ch <= 7; ch++) {
      const r = { ch, row: keepGap[ch] };
      for (const diff of ['story', 'soldier', 'bridgeburner']) { tame(); r[diff + '0'] = foe('mt', ch, diff); put(); r[diff] = foe('mt', ch, diff); }
      mt.push(r);
    }
    // the barricade: eased on Soldier, not on Story or Bridgeburner, and nowhere outside Book Five
    const bar = {};
    const noSoft = fn => { const k = Object.keys(B5SOFT), keep = { ...B5SOFT }; k.forEach(x => delete B5SOFT[x]); try { return fn(); } finally { Object.assign(B5SOFT, keep); } };
    for (const diff of ['story', 'soldier', 'bridgeburner']) { bar[diff] = foe('mt', 7, diff, 'b5_c7_barricade'); bar[diff + 'x'] = noSoft(() => foe('mt', 7, diff, 'b5_c7_barricade')); }
    bar.dg = foe('dg', 7, 'soldier', 'b5_c7_barricade'); bar.dgx = noSoft(() => foe('dg', 7, 'soldier', 'b5_c7_barricade'));
    const softKeys = Object.keys(B5SOFT);
    const capRows = []; // Soldier's foe (late extra + B5SOFT) never above Bridgeburner's for the same fight
    for (let ch = 1; ch <= 7; ch++) for (const id of [null, ...softKeys]) { if (id && ch !== 7) continue;
      const s = foe('mt', ch, 'soldier', id), b = foe('mt', ch, 'bridgeburner', id); capRows.push({ ch, id, s, b }); }
    return { others, mt, bar, softKeys, keepSoft, keepFight, capRows };
  } catch (e) { return { err: e.stack.split('\n').slice(0, 3).join(' | ') }; }
});
if (out.err) { console.log('ERR ' + out.err); bad++; }
else {
  const off = out.others.filter(o => !o.same);
  ok(!off.length, `Books One to Four: every foe, chapter and difficulty unchanged by B5GAP (${out.others.length} checked)` + (off.length ? ': ' + off.map(o => `${o.book} ch${o.ch} ${o.diff}`).join(', ') : ''));
  for (const r of out.mt) {
    const g = r.row, live = g && (g.hp > 1 || g.atk > 0 || g.dmg > 0 || g.ac > 0);
    ok(live, `Book Five ch${r.ch}: a Bridgeburner row is set (${JSON.stringify(g)})`);
    ok(r.bridgeburner.hp >= r.bridgeburner0.hp && r.bridgeburner.atk === r.bridgeburner0.atk + (g.atk || 0) && r.bridgeburner.dmg === r.bridgeburner0.dmg + (g.dmg || 0) && r.bridgeburner.ac === r.bridgeburner0.ac + (g.ac || 0),
      `Book Five ch${r.ch}: Bridgeburner foe carries it (${r.bridgeburner0.hp}→${r.bridgeburner.hp} hp, +${r.bridgeburner.atk - r.bridgeburner0.atk} to hit, +${r.bridgeburner.dmg - r.bridgeburner0.dmg} damage, +${r.bridgeburner.ac - r.bridgeburner0.ac} armour)`);
    ok(JSON.stringify(r.story) === JSON.stringify(r.story0) && JSON.stringify(r.soldier) === JSON.stringify(r.soldier0), `Book Five ch${r.ch}: Story and Soldier untouched by B5GAP`);
  }
  ok(out.softKeys.length === 1 && out.softKeys[0] === 'b5_c7_barricade', `B5SOFT eases only the barricade (${out.softKeys.join(', ')})`);
  const b = out.bar;
  ok(b.soldier.hp < b.soldierx.hp || b.soldier.atk < b.soldierx.atk || b.soldier.dmg < b.soldierx.dmg, `the barricade is eased on Soldier (${b.soldierx.hp}→${b.soldier.hp} hp, ${b.soldierx.atk}→${b.soldier.atk} to hit, ${b.soldierx.dmg}→${b.soldier.dmg} damage)`);
  ok(JSON.stringify(b.story) === JSON.stringify(b.storyx) && JSON.stringify(b.bridgeburner) === JSON.stringify(b.bridgeburnerx), 'the barricade is not eased on Story or Bridgeburner');
  ok(JSON.stringify(b.dg) === JSON.stringify(b.dgx), 'B5SOFT does nothing outside Book Five');
  const over = out.capRows.filter(r => r.s.hp > r.b.hp || r.s.atk > r.b.atk || r.s.dmg > r.b.dmg + 1 || r.s.ac > r.b.ac);
  ok(!over.length, 'Book Five: Soldier never harder than Bridgeburner, fight for fight' + (over.length ? ': ' + over.map(r => `ch${r.ch}${r.id ? ' ' + r.id : ''}`).join(', ') : ''));
}

/* the fate pages */
const fate = await page.evaluate(() => {
  try {
    const st = (keys) => { setBook('mt'); S = newStateMT('Sol'); S.chapter = 7; Object.assign(S.f, keys); S.f.b5_c6_fallen = [];
      S.f.b5_ruukDone = 1; S.f.b5_pessaDone = 1; S.f.b5_bruneDone = 1; S.squad = ['sgt', 'tobet', 'thegg', 'perrit', 'ammet', 'ruuk'];
      ['ruuk', 'pessa', 'brune'].forEach(k => { S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; }); migrate(S); };
    const txt = (id, key) => B57FIN.fate(id, key).txt;
    const r = {};
    // Ch 4 'hold': Ruuk waited (not in the record), Tobet walked
    st({ b5_c4_key: 'hold', b5_c6_key: 'stand', b5_c4_walked: ['sgt', 'tobet', 'thegg', 'perrit', 'ammet', 'brune'], b5_c6_walked: ['sgt', 'tobet', 'thegg', 'perrit', 'ammet', 'ruuk'] });
    r.ruukHold = txt('ruuk', 'emperor'); r.tobetHold = txt('tobet', 'emperor'); r.sgtHold = txt('sgt', 'emperor');
    // Ch 4 'run': a waiting Ruuk did not go into the wood with the squad
    S.f.b5_c4_key = 'run'; r.ruukRun = txt('ruuk', 'paid');
    // Ch 6: Pessa waited at Brans Keep, Tobet did too (a core soldier may wait from Ch 6), then both walk in Ch 7
    S.f.b5_c6_walked = ['sgt', 'thegg', 'perrit', 'ammet', 'ruuk', 'brune']; S.squad = ['sgt', 'tobet', 'thegg', 'perrit', 'ammet', 'pessa'];
    r.pessaStand = txt('pessa', 'ledger'); r.tobetStand = txt('tobet', 'ledger');
    S.f.b5_c6_key = 'fallback'; r.pessaFall = txt('pessa', 'emperor');
    S.f.b5_c6_key = 'stand'; S.f.b5_c6_walked.push('pessa'); r.pessaWalked = txt('pessa', 'emperor');
    // an old save: no record, so everyone is credited as before
    delete S.f.b5_c4_walked; delete S.f.b5_c6_walked; S.f.b5_c4_key = 'hold'; r.ruukOld = txt('ruuk', 'emperor'); r.pessaOld = txt('pessa', 'emperor');
    // the record is set when the key fight starts (and when the key is chosen): Ruuk walks into the demon fight
    setBook('mt'); S = newStateMT('Sol'); S.chapter = 4; S.f.b5_ruukDone = 1; S.squad = [...S.squad, 'ruuk']; S.loy.ruuk ??= 0; S.gear.ruuk ??= {}; S.picks.ruuk ??= []; migrate(S);
    startChapter(4); startBattle('b5_c4_demon', {}); r.rec4 = S.f.b5_c4_walked && [...S.f.b5_c4_walked]; B = null;
    S.chapter = 6; S.squad = S.squad.filter(k => k !== 'ruuk'); startChapter(6); startBattle('b5_c6_channel', {}); r.rec6 = S.f.b5_c6_walked && [...S.f.b5_c6_walked]; B = null;
    return r;
  } catch (e) { return { err: e.stack.split('\n').slice(0, 3).join(' | ') }; }
});
if (fate.err) { console.log('ERR fate ' + fate.err); bad++; }
else {
  const rampart = /held the west rampart/, wood = /into the Jheck's wood/, crossing = /held the crossing/, dissent = /toward Dissent/;
  ok(!rampart.test(fate.ruukHold) && /followers/.test(fate.ruukHold), 'Ch4 hold: a recruit waiting at High Fort is not credited with the rampart');
  ok(rampart.test(fate.tobetHold), 'Ch4 hold: a soldier who walked is credited with the rampart');
  ok(rampart.test(fate.sgtHold), 'Ch4 hold: the sergeant is credited with the rampart');
  ok(!wood.test(fate.ruukRun) && /followers/.test(fate.ruukRun), 'Ch4 run: a recruit waiting at High Fort did not go into the wood with the squad');
  ok(!crossing.test(fate.pessaStand) && /behind the lines/.test(fate.pessaStand), 'Ch6 stand: a recruit waiting at Brans Keep is not credited with the crossing');
  ok(!crossing.test(fate.tobetStand) && wood.test(fate.tobetStand), 'Ch6 stand: a core soldier waiting at Brans Keep is not credited with the crossing (and keeps the wood he walked, on Ch4 run)');
  ok(!dissent.test(fate.pessaFall) && /behind the lines/.test(fate.pessaFall), 'Ch6 fallback: a waiting recruit did not go back over the channel with the squad');
  ok(crossing.test(fate.pessaWalked), 'Ch6 stand: a recruit who walked is credited with the crossing');
  ok(rampart.test(fate.ruukOld) && crossing.test(fate.pessaOld), 'an old save without the record credits as before');
  ok(Array.isArray(fate.rec4) && fate.rec4.includes('ruuk') && fate.rec4.includes('sgt'), `the key fight at High Fort records who walked (${fate.rec4})`);
  ok(Array.isArray(fate.rec6) && !fate.rec6.includes('ruuk') && fate.rec6.includes('ammet'), `the key fight at Brans Keep records who walked (${fate.rec6})`);
}
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
console.log(bad ? `${bad} FAILED` : 'all ok');
process.exit(bad ? 1 : 0);
