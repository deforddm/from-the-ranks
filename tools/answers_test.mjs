// v7.3.0: David's answers to the open questions (Oct 27, 2026), kept answered.
// Q2  Bridgeburner: a win mends a quarter of what was lost, on top of the old patch-up.
// Q7  Raest: Omtose Phellack is Elder; otataral dust is never offered against him and never stops his ice.
// Q9  Book Three Ch5: the drowning is Shank's (Coral); the ford's cadre mage stands the river up instead.
// Q18 Book Two: Bungle is a sergeant, never a captain.
// Q19 Book Four: the Khundryl join on the road to the Vathar (HoC ch 15); there are no Vathar Hills (v7.3.1).
import fs from 'fs';
import path from 'path';
import { server, browser as launch, openGame, root } from './page.mjs';
let bad = 0; const ok = (c, m) => { console.log(`${c ? 'ok' : 'FAIL'} ${m}`); if (!c) bad++; };

// ---- static: the text says what David ruled ----
const src = f => fs.readFileSync(path.join(root, 'src', f), 'utf8');
const b2 = ['51_b2_ch4.js', '52_b2_ch5.js', '53_b2_ch6.js', '54_b2_ch7.js'].map(src).join('\n');
ok(!/Captain Bungle|Bungle\. Captain|Bungle's company/.test(b2), 'Q18: no Captain Bungle and no "Bungle\'s company" in Book Two');
ok((b2.match(/Sergeant Bungle/g) || []).length >= 6, 'Q18: Sergeant Bungle names his scenes');
const c5 = src('65_b3_ch5.js');
ok(!/the cadre drowned|put the river in him|drowned man|cadre mage drowned/i.test(c5), 'Q9: no cadre drowning at the Ch5 ford');
ok(/the river stand up/.test(c5) && /quarrel/.test(c5), 'Q9: the ford\'s mage stands the river up, and a quarrel kills the Pannion mage');
ok(/Shank had one of their Seerdomin/.test(src('67_b3_ch7.js')), 'Q9: Coral\'s Bridgeburner tells of Shank\'s drowning');
const b4 = fs.readdirSync(path.join(root, 'src')).filter(f => /^7\d/.test(f)).map(f => src(f).replace(/never "the Vathar Hills"/g, '')).join('\n');
ok(!/Vathar Hills/.test(b4), 'Q19: Book Four never says "the Vathar Hills"');
ok(!/u\.ai === 'raest' && !u\.otat/.test(src('31_battle.js')), 'Q7: the Tyrant\'s lance does not check for otataral');

// ---- in the page ----
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const out = await page.evaluate(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms)), log = []; try {
  // Q2: carried wounds on Bridgeburner, with and without a healer standing
  for (const healer of [false, true]) {
    S = newState('Bb'); S.diff = 'bridgeburner'; S.chapter = 2; S.squad = ['sgt','brisk','kettle','tuft','ohl']; migrate(S); save();
    startBattle('outriders', {}); await wait(500);
    const sq = party().filter(u => !u.ally), want = {};
    sq.forEach((u, i) => { u.hp = i === 0 ? 0 : Math.max(1, Math.round(u.maxhp * (.2 + i * .15))); });
    const oh = sq.find(u => u.id === 'ohl'); if (oh) oh.hp = healer ? Math.max(1, oh.hp) : 0;
    const k = healer ? .2 : .1;
    sq.forEach(u => { const base = u.hp > 0 ? u.hp : Math.round(u.maxhp * .25), old = Math.min(u.maxhp, base + Math.round(u.maxhp * k));
      want[u.id] = { now: Math.min(u.maxhp, base + Math.round((u.maxhp - base) * .25) + Math.round(u.maxhp * k)), old, max: u.maxhp }; });
    carryWounds();
    const got = sq.map(u => [u.id, S.wounds[u.id], want[u.id]]);
    log.push(`Q2 ${healer ? 'healer' : 'no healer'}: ` + JSON.stringify(got.map(([id, w, x]) => [id, w, x.old, x.max])));
    log.push((got.every(([, w, x]) => w === x.now) ? 'OK ' : 'BAD ') + `Q2 ${healer ? 'healer' : 'no healer'}: a quarter of what was lost mends, on top of the patch-up`);
    log.push((got.every(([, w, x]) => w >= x.old) && got.some(([, w, x]) => w > x.old) ? 'OK ' : 'BAD ') + `Q2 ${healer ? 'healer' : 'no healer'}: never less than before, more for the badly hurt`);
    B = null;
  }
  // Q7: the Tyrant and the dust
  S = newState('Hask'); S.chapter = 6; S.lvl = 6; S.squad = ['sgt','brisk','kettle','tuft','ohl']; migrate(S); earnTrick('otataral', 'brisk'); save();
  const bid = Object.keys(BATTLES).find(k => BATTLES[k].foes.some(f => f[0] === 'raest'));
  startBattle(bid, {}); await wait(600);
  const ra = foes().find(f => f.ai === 'raest'), bk = B.units.find(u => u.id === 'brisk');
  if (ra && bk) { const spot = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[2,0],[0,2]].map(([dx,dy]) => [bk.x+dx, bk.y+dy]).find(([x,y]) => !solid(x,y) && !unitAt(x,y)); if (spot) { ra.x = spot[0]; ra.y = spot[1]; } log.push('raest at ' + ra.x + ',' + ra.y + ' unitAt=' + (unitAt(ra.x, ra.y) || {}).id); }
  log.push((ra && bk && !AB.t_otataral.tiles(bk).includes(ra) ? 'OK ' : 'BAD ') + `Q7: otataral is never offered against the Tyrant (${bid})`);
  if (ra && bk) { AB.t_otataral.run(bk, ra.x, ra.y); log.push((!ra.otat && B.log.some(l => /older than otataral/.test(l)) ? 'OK ' : 'BAD ') + 'Q7: dust thrown at him anyway does nothing'); }
  log.push((/Omtose Phellack/.test(TRICKS.otataral.fx) ? 'OK ' : 'BAD ') + 'Q7: the trick says the Jaghut\'s ice shrugs it off');
  } catch (e) { log.push('ERR ' + e.stack.split('\n').slice(0, 3).join(' | ')); } return log;
});
out.forEach(l => { if (/^OK /.test(l)) ok(true, l.slice(3)); else if (/^BAD /.test(l)) ok(false, l.slice(4)); else { console.log('  ' + l); if (/^ERR/.test(l)) bad++; } });
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
process.exit(bad ? 1 : 0);
