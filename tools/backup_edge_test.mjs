// v10.2 §4 (docs/v10.2-spec.md, David's option A): the second stat backs up a check. One helper at most (the highest in the stat),
// second stat only, never the roller, the walking squad only (not at camp, away or dead), never on a ✦ trick check; it is in the
// odds, the who-rolls picker and the roll line.
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms)), r = {};
  S = newState('Hask'); S.chapter = 2; S.lvl = 4; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; migrate(S); save();
  const C = (st, extra) => Object.assign({t:'Try it', check:[st, 12]}, extra || {});
  const helps = (c, id) => edgesFor(c, id).filter(e => /^with /.test(e[0]));
  // Might: second stat might is the sergeant, Kettle and Ohl (STATUP); Brisk rolls; the sergeant (might 2) is the strongest
  r.might = helps(C('might'), 'brisk'); r.mightWho = backupFor(C('might'), 'brisk');
  // the roller never helps themselves: the sergeant rolls Might, the next best of Kettle and Ohl helps
  r.sgtRolls = backupFor(C('might'), 'sgt');
  // Wits: second wits is Brisk and Tuft; Tuft rolls, Brisk helps
  r.wits = backupFor(C('wits'), 'tuft');
  // Guile: nobody here has it second
  r.guile = backupFor(C('guile'), 'tuft');
  // a ✦ trick check: no help
  r.trick = helps(C('might', {trick:'line'}), 'brisk').length;
  // odds include it: +2 is +10%
  const plain = statOf('brisk', 'might'), withH = modFor(C('might'), 'brisk'); r.mod = withH - plain - sumEdges(edgesFor(C('might'), 'brisk').filter(e => !/^with /.test(e[0])));
  const savedSq = S.squad.slice();
  // walking squad only: the sergeant at camp, then Kettle away, then Ohl dead
  S.squad = ['brisk', 'kettle', 'tuft', 'ohl']; r.camp = backupFor(C('might'), 'brisk');
  AWAY.push(k => k === 'kettle'); r.away = backupFor(C('might'), 'brisk'); AWAY.pop();
  S.squad = ['brisk', 'tuft', 'ohl']; S.dead = {ohl:1}; r.dead = backupFor(C('might'), 'brisk'); S.dead = {}; S.squad = savedSq;
  // odds and the picker: a node with a Might check
  DLG.__bk = () => ({sp:'Test', txt:'A door.', ch:[{t:'Put a shoulder to it', check:['might', 12], go:'__bk2', fail:'__bk2'}]});
  DLG.__bk2 = () => ({sp:'Test', txt:'Done.', ch:[{t:'Leave'}]});
  SET.dice = true; talk('__bk'); await wait(300);
  const btn = [...$('#sheet').querySelectorAll('.choice')].find(b => /shoulder/.test(b.textContent)); btn && btn.click(); await wait(300);
  const pk = [...$('#sheet').querySelectorAll('[data-who]')]; const bp = pk.find(b => b.dataset.who === 'brisk');
  r.picker = bp ? bp.textContent : ''; r.pickerOdds = oddsOf(C('might'), 'brisk'); r.pickerSgt = (pk.find(b => b.dataset.who === 'sgt') || {}).textContent || '';
  bp && bp.click(); await wait(200); r.rollLine = ($('#dice .dwho') || {}).textContent || ''; await wait(2500);
  SET.dice = false;
  return r;
});
ok(o.might.length === 1 && o.mightWho === 'sgt' && o.might[0][1] === 2, `one helper, the strongest in it, +2: ${JSON.stringify(o.might)}`);
ok(o.sgtRolls === 'kettle' || o.sgtRolls === 'ohl', `the roller never helps; the next best does: ${o.sgtRolls}`);
ok(o.wits === 'brisk', `second stat Wits backs a Wits check: ${o.wits}`);
ok(o.guile === null, `nobody with Guile second: no help (${o.guile})`);
ok(o.trick === 0, 'no help on a ✦ trick check');
ok(o.mod === 2, `the help is in modFor (+${o.mod})`);
ok(o.camp && o.camp !== 'sgt', `not from camp: ${o.camp}`);
ok(o.away === 'ohl', `not someone away: ${o.away}`);
ok(o.dead === null, `not the dead: ${o.dead}`);
ok(/with Hask \+2/.test(o.picker), `the picker names it: ${o.picker}`);
ok(/with/.test(o.pickerSgt) && !/with Hask/.test(o.pickerSgt), `the sergeant's row has a different helper: ${o.pickerSgt}`);
ok(/Brisk, with Hask \(\+2\) · Might/.test(o.rollLine), `the roll line: ${o.rollLine}`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
