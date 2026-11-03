// v8.2.4: a fight opened with a munition does what that munition does (v8.2.2), aimed where the foes are thickest (v8.2.4).
// Every burner and smoker opener in Books Two to Four, five times each: a burner reaches at least one foe for 1d6 each
// (never the sharper's 1d10 to all) and leaves fire; a smoker does no damage and leaves smoke; a sharper opener is unchanged
// (every foe hit); the throw is told once, never by both the fight's own preText and the general line.
// Usage: node tools/opener_test.mjs   (build first; exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const FIGHTS = [['b2_raid', 'burner', 'DG'], ['b2_dryraid', 'burner', 'DG'], ['b2_dojal', 'smoker', 'DG'], ['b2_runway', 'smoker', 'DG'], ['b2_postern', 'burner', 'DG'],
  ['b3_c1_herds', 'burner', 'MOI'], ['b3_c1_train', 'burner', 'MOI'], ['b3_c2_night', 'smoker', 'MOI'], ['b3_c3_hold', 'burner', 'MOI'],
  ['b4_c1_runners', 'smoker', 'HOC'], ['b4_c1_dig', 'burner', 'HOC'], ['b4_c1_watch', 'burner', 'HOC'], ['b4_c1_brawl', 'smoker', 'HOC'], ['b4_c3_brawl', 'smoker', 'HOC'],
  ['b4_c3_scavengers', 'burner', 'HOC'], ['b4_c3_poles', 'burner', 'HOC'], ['b4_c5_seep', 'burner', 'HOC'], ['b4_c5_deserters', 'burner', 'HOC'], ['b4_c7_spur', 'burner', 'HOC']];
const r = await page.evaluate(async FIGHTS => {
  const wait = ms => new Promise(res => setTimeout(res, ms)), out = [];
  const run = async (id, bk, opt) => {
    S = ({DG:newStateDG, MOI:newStateMOI, HOC:newStateHOC})[bk]('Opener'); migrate(S);
    if (B) { B.over = true; await wait(40); }
    startBattle(id, opt); await wait(120);
    const fs = B.units.filter(u => u.side === 'e'), hurtF = fs.filter(f => f.hp < f.maxhp);
    const log = (B.log || []).map(l => l.replace(/<[^>]+>/g, ''));
    const told = log.filter(l => /(burner|smoker) (goes|breaks|lobs|into|across|up|over|onto|down)|lobs a (burner|smoker)|drops a (burner|smoker)/i.test(l)).length;
    const res = {foes:fs.length, hit:hurtF.length, maxLoss:Math.max(0, ...fs.map(f => f.maxhp - Math.max(0, f.hp))), fires:(B.fires || []).length, smoke:(B.smoke || []).length, told};
    B.over = true; await wait(40); return res;
  };
  for (const [id, mun, bk] of FIGHTS) {
    if (!BATTLES[id]) { out.push({id, missing:true}); continue; }
    const runs = []; for (let i = 0; i < 5; i++) runs.push(await run(id, bk, {pre:true, mun}));
    const sharp = await run(id, bk, {pre:true});
    out.push({id, mun, runs, sharp});
  }
  return out;
}, FIGHTS);
for (const f of r) {
  if (f.missing) { no(`${f.id}: no such fight`); continue; }
  const { id, mun, runs, sharp } = f;
  if (mun === 'burner') {
    runs.every(x => x.hit >= 1) ? ok(`${id}: the burner reaches at least one foe every time (${runs.map(x => x.hit).join(',')} hit)`) : no(`${id}: a burner opener hit nobody (${runs.map(x => x.hit).join(',')})`);
    runs.every(x => x.maxLoss <= 6) ? ok(`${id}: 1d6 at most to any foe, not the sharper's 1d10`) : no(`${id}: a foe lost more than 6 to a burner opener (${runs.map(x => x.maxLoss).join(',')})`);
    runs.every(x => x.fires > 0) ? ok(`${id}: the ground burns`) : no(`${id}: no fire after a burner opener`);
  } else {
    runs.every(x => x.hit === 0) ? ok(`${id}: the smoker does no damage`) : no(`${id}: a smoker opener hurt someone (${runs.map(x => x.hit).join(',')})`);
    runs.every(x => x.smoke > 0) ? ok(`${id}: smoke where it landed`) : no(`${id}: no smoke after a smoker opener`);
  }
  runs.every(x => x.told <= 1) ? ok(`${id}: the throw is told once`) : no(`${id}: the throw is told ${Math.max(...runs.map(x => x.told))} times`);
  sharp.hit === sharp.foes ? ok(`${id}: a sharper opener still reaches every foe`) : no(`${id}: a sharper opener missed someone (${sharp.hit}/${sharp.foes})`);
}
if (errors.length) no('page errors: ' + errors.slice(0, 3).join(' | '));
console.log(bad.length ? `\n${bad.length} FAIL` : '\nPASS');
await br.close(); if (srv.close) srv.close();
process.exit(bad.length ? 1 : 0);
