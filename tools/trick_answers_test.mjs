/* v13.56.0: tricks that answer by themselves (src/989b_answers.js; series-polish-plan.md §0g). */
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fails = 0; const ok = (c, m) => { console.log((c ? '  ok  ' : '  FAIL ') + m); if (!c) fails++; };
const R = await page.evaluate(async () => {
  const out = {}; const wait = ms => new Promise(r => setTimeout(r, ms));
  const BUTTONS = ['rope','b6_c3_breath','b7_c3_tracks','b8_c1_roofline','b5_c1_haul','b10_c3_harness','bluefire','b4_c4_bola','b5_c4_brand','b6_c7_wall','b7_c5_square','b10_c6_square'];
  out.count = Object.keys(ANS_FAM).length; out.missing = Object.values(ANS).flat().filter(k => !ANS_FAM[k]);
  out.buttonsPassive = BUTTONS.filter(k => !TRICKS[k] || AB[TRICKS[k].ab].passive);
  out.unsorted = Object.keys(TRICKS).filter(k => TRICKS[k].ab && !ANS_FAM[k] && !BUTTONS.includes(k) && !AB[TRICKS[k].ab].passive);
  out.words = Object.keys(ANS_FAM).filter(k => !/^Works by itself, .+\. Nothing to press\. /.test(TRICKS[k].fx) || /uses the action|takes the bearer's action|does not use the/.test(TRICKS[k].fx));
  /* a fight to work in */
  S = newState('Hask'); S.chapter = 4; S.lvl = 6; migrate(S); S.squad = ['sgt','brisk','kettle','tuft'];
  const give = (k, who) => { S.tricks = S.tricks || {}; S.tricks[k] = {who}; };
  const fight = () => { startBattle('guild_roofs', {}); B.smoke = []; };
  const sgt = () => B.units.find(u => u.id === 'sgt'), mate = () => B.units.find(u => u.side === 'p' && u.id !== 'sgt' && !u.ally), foe = () => foes()[0];
  const put = (u, x, y) => { u.x = x; u.y = y; };
  const open = () => { for (let y = 1; y < 30; y++) for (let x = 1; x < 40; x++) if ([0,1,2,3].every(i => inB(x + i, y) && !wall(x + i, y) && !pitAt(x + i, y) && inB(x + i, y + 1) && !wall(x + i, y + 1) && inB(x + i, y - 1) && !wall(x + i, y - 1)) && inB(x - 1, y) && !wall(x - 1, y)) return {x, y}; };
  const stage = (ks) => { S.tricks = {}; ks.forEach(k => give(k, 'sgt')); fight(); const o = open(); const keepF = foe(); B.units.forEach(u => { if (u.side !== 'p' && u !== keepF) { u.hp = 0; u.x = -9; u.y = -9; } }); B.units.filter(u => u.side === 'p' && u !== sgt() && u !== mate()).forEach(u => { u.hp = 0; u.x = -8; u.y = -8; });
    put(sgt(), o.x, o.y); put(mate(), o.x, o.y + 1); const f = foe(); put(f, o.x + 1, o.y); f.hp = f.maxhp = 400; sgt().hp = sgt().maxhp = 200; mate().maxhp = 200; mate().hp = 200; return o; };
  const hitTill = (a, t, o, n = 60) => { let r; for (let i = 0; i < n; i++) { r = attack(a, t, o || {}); if (r && r.hit) break; } return r; };
  try {
    /* no button on the bar */
    stage(['line','song','cant','rope']); out.bar = sgt().ab.filter(k => /^t_/.test(k));
    /* lock: an enemy strikes at the mate beside the bearer */
    attack(foe(), mate(), {}); out.lock = !!(B.line && B.line.u === sgt()) && !!B.used.t_line;
    /* sign: the bearer hits */
    hitTill(sgt(), foe()); await wait(400); out.sign = foe().cantRound === B.round;
    /* heal: the mate falls below half */
    mate().hp = 60; ansHalf(mate(), null); out.heal = mate().hp > 60 && !!B.used.t_song;
    /* once a fight */
    B.line = null; attack(foe(), sgt(), {}); out.lockOnce = !B.line;
    /* stop, wound */
    stage(['rime','b3_c3_stripe']); hitTill(foe(), sgt()); await wait(500); out.stop = !!foe().stun || foe().rimeUntil >= B.round; out.wound = sgt().stripeUntil >= B.round;
    /* coin: the first miss is struck again and costs a charge */
    stage(['pull']); S.tricks.pull.left = 2; S.push = 0; let miss = null; for (let i = 0; i < 300 && !B.used.ans_pull; i++) attack(sgt(), foe(), {}); out.coin = !!B.used.ans_pull && S.tricks.pull.left === 1 && S.push === 1;
    /* close without the slow; crowd; breath */
    stage(['b2_earth']); foe().slowTurn = false; ansNear(); out.close = foe().earthUntil > B.round - 1 && !foe().slowTurn;
    stage(['b2_breath']); const f2 = B.units.find(u => u.side !== 'p' && u.hp <= 0); f2.hp = f2.maxhp = 300; put(f2, sgt().x + 1, sgt().y - 1 >= 0 && !solid(sgt().x + 1, sgt().y - 1) ? sgt().y - 1 : sgt().y + 1); if (unitAt(f2.x, f2.y) !== f2) put(f2, sgt().x - 1, sgt().y);
    const m0 = mate().hp, h0 = foe().hp; ansNear(); await wait(200); out.breath = foe().ansColdUntil >= B.round && foe().hp < h0 && mate().hp === m0;
    const cf = foe(), c0 = atkCalc(cf, sgt(), {}).bonus; cf.ansColdUntil = -1; const c1 = atkCalc(cf, sgt(), {}).bonus; out.cold = c1 - c0 === 2; out.coldAt = [c0, c1, B.round]; cf.ansColdUntil = B.round + 1; out.coldAt.push(atkCalc(cf, sgt(), {}).bonus, cf.side, cf.hp);
    /* first turn: the cry and the aim */
    stage(['b2_paint','b2_squint']); squadTurnStart(sgt()); out.first = sgt().rallyUntil >= B.round && !!sgt().steady;
    /* cover: a shot at the mate */
    stage(['dark']); put(foe(), sgt().x + 3, sgt().y); const turn0 = B.turn, cur0 = B.cur; attack(foe(), mate(), {}); out.cover = B.smoke.some(s => s.x === mate().x && s.y === mate().y) && B.cur === cur0;
    /* way in: only a long weapon */
    stage(['b2_inside']); hitTill(sgt(), foe()); out.insideNot = !B.used.t_b2_inside; foe().sk = (foe().sk || []).concat('reach'); attack(sgt(), foe(), {}); await wait(600); out.inside = !!B.used.t_b2_inside && !(foe().sk || []).includes('reach');
    /* knot: a shot at the bearer from three off hauls the shooter in */
    stage(['b3_c6_knot']); put(foe(), sgt().x + 3, sgt().y); attack(foe(), sgt(), {}); await wait(400); out.knot = cheb(foe(), sgt()) === 1 && !!(foe().prone || foe().rising != null || foe().boss); out.knotAt = [cheb(foe(), sgt()), foe().prone, foe().rising];
    /* the ward, the pain, the ride */
    stage(['b8_shroud','b3_c7_anvil','b4_c7_deadride']); mate().hp = 50; const fh = foe().hp; ansHalf(mate(), foe()); await wait(200); out.half = mate().ward > 0 && mate().hp > 50 && foe().hp < fh;
    /* buttons stay */
    stage(['rope','bluefire']); out.keep = ['t_rope','t_bluefire'].every(k => sgt().ab.includes(k));
    out.stats = Object.keys(TPL).filter(k => TPL[k].st && !TPL[k].ally && STATUP[k]).filter(k => { const v = Object.values(TPL[k].st); return v.reduce((x, y) => x + y, 0) !== 5 || Math.max(...v) > 3; }); S.lvl = 24; out.late = ['might','wits','guile'].map(q => lvStat('brisk', q)).join();
  } catch (e) { out.err = String(e && e.stack || e).slice(0, 400); }
  return out; });
console.log(JSON.stringify(R));
ok(!R.err, 'no error ' + (R.err || '')); ok(R.count === 53, '53 tricks answer by themselves (' + R.count + ')'); ok(!R.missing.length, 'every one exists ' + R.missing); ok(!R.buttonsPassive.length, 'the 12 swaps and throws keep buttons ' + R.buttonsPassive);
ok(!R.unsorted.length, 'no trick left unsorted ' + R.unsorted); ok(!R.words.length, 'each says how it fires ' + R.words);
ok(R.bar && R.bar.join() === 't_rope', 'only the swap is on the bar ' + R.bar);
for (const k of ['lock','sign','heal','lockOnce','stop','wound','coin','close','breath','cold','first','cover','insideNot','inside','knot','half','keep']) ok(R[k], k);
ok(R.stats && !R.stats.length, 'every soldier starts on 5, none above 3 ' + R.stats); ok(R.late === '3,3,0', 'stat gains carry on at 16, 20 and 24 (' + R.late + ')');
ok(!errors.length, 'no page errors ' + errors.slice(0, 2).join(' / '));
await br.close(); console.log(fails ? `FAIL (${fails})` : 'PASS'); process.exit(fails ? 1 : 0);
