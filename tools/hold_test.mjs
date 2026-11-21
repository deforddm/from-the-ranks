// The hold switch (v13.62.0; plan §0g item a): a healing trick answers by itself unless the sergeant holds it; held, it is a button again;
// let go, it answers again. The choice is in the save. Nothing but the healing tricks can be held.
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser(); let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const { page, errors } = await openGame(br, srv.url, { fast:true, width:412, height:915 });
const r = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const o = {};
  setBook('gotm'); S = newState('Hask'); S.picksDue = []; migrate(S); S.tricks = S.tricks || {}; S.tricks.song = {who:'ohl', used:0}; S.tricks.line = {who:'brisk', used:0}; save();
  o.holdable = Object.keys(ANS_FAM).filter(holdable).length; o.lineNo = !holdable('line');
  const fight = async () => { startBattle('guild_roofs', {}); await wait(300); const u = B.units.find(q => q.id === 'ohl'), k = B.units.find(q => q.id === 'kettle'); return {u, k}; };
  // let go: no button, and it fires when a squadmate drops below half
  let f = await fight(); o.autoNoBtn = !f.u.ab.includes(TRICKS.song.ab); f.k.x = f.u.x; f.k.y = f.u.y + 1; f.k.hp = Math.floor(f.k.maxhp * .3); ansHalf(f.k, null); await wait(500); o.autoFired = !!B.used[TRICKS.song.ab]; B.over = true;
  // held: a button, and it does not fire by itself
  holdSet('song', true); o.saved = !!JSON.parse(JSON.stringify(S)).trickHold.song; o.words = /^Held for your word/.test(TRICKS.song.fx);
  f = await fight(); o.heldBtn = f.u.ab.includes(TRICKS.song.ab); f.k.x = f.u.x; f.k.y = f.u.y + 1; f.k.hp = Math.floor(f.k.maxhp * .3); ansHalf(f.k, null); await wait(500); o.heldQuiet = !B.used[TRICKS.song.ab];
  holdSet('song', false); o.midOff = !f.u.ab.includes(TRICKS.song.ab); holdSet('song', true); o.midOn = f.u.ab.includes(TRICKS.song.ab); B.over = true;
  holdSet('line', true); o.lineIgnored = !(S.trickHold && S.trickHold.line) && AB[TRICKS.line.ab].passive === true;
  // the sheet shows the switch for the song only
  view = 'explore'; B = null; startExplore(); await wait(200); openChars(SQUAD().indexOf('ohl')); await wait(200); const b = document.querySelector('#chars [data-hold="song"]'); o.sheetBtn = !!b && b.getAttribute('aria-pressed') === 'true'; b.click(); await wait(200);
  o.sheetOff = !ansHeld('song') && document.querySelector('#chars [data-hold="song"]').getAttribute('aria-pressed') === 'false'; openChars(SQUAD().indexOf('brisk')); await wait(200); o.noLineBtn = !document.querySelector('#chars [data-hold]'); closeChars(); return o; });
ok(r.holdable === 9 && r.lineNo, `nine healing tricks can be held, the Line cannot (${r.holdable})`);
ok(r.autoNoBtn && r.autoFired, 'let go: no button, and it answers when a squadmate drops below half');
ok(r.saved && r.words, 'held: kept in the save, and the trick\'s words say so');
ok(r.heldBtn && r.heldQuiet, 'held: a button on the bearer\'s bar, and it does not fire by itself');
ok(r.midOff && r.midOn, 'switched in a fight, the bar follows at once');
ok(r.lineIgnored, 'holding a trick that cannot be held does nothing');
ok(r.sheetBtn && r.sheetOff && r.noLineBtn, 'the sheet shows the switch under the song only, and it toggles');
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
