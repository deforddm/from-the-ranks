// v11.1: the 3D battlefield (Settings · Battlefield · 3D). Opens Book One's first fight with 3D on, checks that three.js
// loaded and the WebGL view stands over the board, that a tap on a square reaches battleTap, that turning 3D off mid-fight
// puts the 2D board back, and that the 2D path draws as before. Screenshots to /tmp/b3d_*.png.
// node tools/b3d_test.mjs
import { chromium, server, openGame } from './page.mjs';
const srv = await server();
const br = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'] });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
try {
  const { page, errors } = await openGame(br, srv.url, { width: 390, height: 844, dpr: 2, settings: { view3d: true, master: 0, music: 0, sfx: 0, amb: 0 } });
  await page.evaluate(() => { S = newState('Hask'); save(); startBattle(Object.keys(BATTLES)[0], {}); });
  await page.waitForFunction(() => !!document.querySelector('#cv3') && B3D.S && B3D.S.ground, null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const st = await page.evaluate(() => ({ lib: !!B3D.lib, failed: B3D.failed, cv3: !!document.querySelector('#cv3'), flat: G.flat, cards: B3D.S ? B3D.S.objs.size : 0, units: B.units.length,
    w: document.querySelector('#cv3') && document.querySelector('#cv3').getBoundingClientRect().width, w2: document.querySelector('#cv').getBoundingClientRect().width }));
  ok(st.lib && !st.failed, 'three.js loaded (failed=' + st.failed + ')');
  ok(st.cv3 && st.flat, 'the 3D view stands over the board and the board paints flat');
  ok(st.cards === st.units, `a card for every figure (${st.cards}/${st.units})`);
  ok(Math.abs(st.w - st.w2) < 2, `the 3D view covers the board (${st.w} vs ${st.w2})`);
  await page.screenshot({ path: '/tmp/b3d_start.png' });
  // wait for a squad turn, then tap the board's middle through the 3D view and see battleTap receive a square
  await page.waitForFunction(() => B.cur && B.cur.side === 'p' && !B.cur.ally && !B.busy, null, { timeout: 20000 }).catch(() => {});
  const got = await page.evaluate(() => new Promise(res => { const orig = battleTap; window.battleTap = (x, y) => { window.battleTap = orig; res({x, y}); return orig(x, y); };
    const c = document.querySelector('#cv3'), r = c.getBoundingClientRect(), ev = (type) => c.dispatchEvent(new PointerEvent(type, { clientX: r.left + r.width/2, clientY: r.top + r.height*.55, pointerId: 7, pointerType: 'touch', bubbles: true }));
    ev('pointerdown'); ev('pointerup'); setTimeout(() => res(null), 800); }));
  ok(got && got.x >= 0 && got.x < 8 && got.y >= 0 && got.y < 10, 'a tap on the 3D view reaches a square: ' + JSON.stringify(got));
  // a drag turns the view and shows the reset button
  await page.evaluate(() => { const c = document.querySelector('#cv3'), r = c.getBoundingClientRect(), ev = (type, dx) => c.dispatchEvent(new PointerEvent(type, { clientX: r.left + 100 + dx, clientY: r.top + 200, pointerId: 8, pointerType: 'touch', bubbles: true }));
    ev('pointerdown', 0); ev('pointermove', 30); ev('pointermove', 120); ev('pointerup', 120); });
  await page.waitForTimeout(400);
  ok(await page.evaluate(() => Math.abs(B3D.S.yaw) > .3 && !B3D.S.reset.hidden), 'a drag turns the view and offers ⟲');
  await page.screenshot({ path: '/tmp/b3d_turned.png' });
  // a sharper's blast and a thrown shell, drawn in 3D
  await page.evaluate(() => { const n = performance.now(); B.fx.push({kind:'arc', from:{x:2, y:8}, to:{x:4, y:3}, t:n, dur:900}); B.fx.push({kind:'boom', x:5, y:4, r:1, col:'#ffb060', t:n + 200, dur:900}); B.fx.push({kind:'txt', x:5, y:4, txt:'-7', col:'#f08a7c', big:true, t:n + 200, dur:1200}); B.smoke.push({x:3, y:5, until:B.round + 2, g:'t'}, {x:4, y:5, until:B.round + 2, g:'t'}); B.fires.push({x:2, y:4}); });
  await page.waitForTimeout(450);
  await page.screenshot({ path: '/tmp/b3d_fx.png' });
  ok(await page.evaluate(() => B3D.S.fxs.size >= 1), 'floating numbers drawn in 3D');
  // switch 3D off mid-fight: the 3D view goes, the 2D board draws figures again
  await page.evaluate(() => { SET.view3d = false; saveSet(); });
  await page.waitForTimeout(300);
  ok(await page.evaluate(() => !document.querySelector('#cv3') && !B3D.S && G.flat === false), 'turning 3D off puts the 2D board back');
  await page.screenshot({ path: '/tmp/b3d_off.png' });
  ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' || ') : ''));
} finally { await br.close(); srv.kill(); }
console.log(fails ? `${fails} FAILED` : 'all ok'); process.exit(fails ? 1 : 0);
