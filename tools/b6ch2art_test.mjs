// Book Six, Chapter 2's art (102b): the two backdrops it owns (b6_coast, b6_plague_village) and its extra (b6_c2_burning) are in SCENES with a
// caption, paint with motion and held still without throwing or leaving the canvas blank, and are their own paintings, not the borrowed
// placeholder (B6_SCENE_LIKE); the chapter's items have artwork; Brannoc's figure and portrait and the cultist's figure draw, and the
// cultist foe uses its own figure.
// Usage: node tools/b6ch2art_test.mjs   (build first; exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const R = await page.evaluate(() => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  S = newStateBH('Hask', 'Brann'); save(); setBook('bh'); b6Use('h'); S.squad = [...S.squad, 'brannoc'].slice(0, 6);
  const px = (k, tt = 1000) => { const cv = document.createElement('canvas'); cv.width = 560; cv.height = 240; SCENEX[k](cv, tt); return cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; };
  const lit = d => { let n = 0; for (let i = 0; i < d.length; i += 4*97) if (d[i] + d[i + 1] + d[i + 2] > 30) n++; return n; };
  const diff = (A, B) => { let d = 0, n = 0; for (let i = 0; i < A.length; i += 4*13){ n++; if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 24) d++; } return d/n; };
  const out = {scenes:[], items:{}, figs:{}};
  ['b6_coast', 'b6_plague_village', 'b6_c2_burning'].forEach(k => { const sc = SCENES[k]; let err = '', blank = true, own = 1;
    try { px(k, 0); const m = SET.motion; SET.motion = 'off'; let still; try { still = px(k, 777); } finally { SET.motion = m; } blank = lit(still) < 20;
      const like = B6_SCENE_LIKE[k]; if (like && SCENEX[like]) { SET.motion = 'off'; try { own = diff(px(k), px(like)); } finally { SET.motion = m; } } } catch (e) { err = String(e && e.stack || e).slice(0, 200); }
    out.scenes.push({k, cap:!!(sc && sc.cap && sc.loc && sc.sub), err, blank, own}); });
  ['b6_c2_falariaxe', 'b6_c2_oilskin', 'b6_c2_drekcharm'].forEach(k => { const a = ART['item/' + k] || ''; out.items[k] = a.length > 1200 && a.includes('<svg') && !a.includes('<rect width="240" height="130" fill="#2a2420"/>'); });
  const fig = k => { const cv = document.createElement('canvas'); cv.width = 64; cv.height = 64; const x = cv.getContext('2d'); try { drawFigure(x, k, 32, 40, 2, 500, {phase:.3}); const d = x.getImageData(0, 0, 64, 64).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n > 80; } catch (e) { return 'threw ' + e.message; } };
  out.figs = {brannoc:fig('brannoc'), cultist:fig('b6_cultist'), kind:FOES.b6_cultist && FOES.b6_cultist.kind};
  const por = id => { const cv = document.createElement('canvas'); cv.width = 120; cv.height = 150; paintPortrait(cv.getContext('2d'), id, 120, 150); return cv.getContext('2d').getImageData(0, 0, 120, 150).data; };
  try { const a = por('brannoc'), b = por('sgt'), c = por('brisk'); out.por = {own:typeof POR.brannoc === 'function' && POR.brannoc !== POR.brisk && POR.brannoc !== POR.sgt, vsSgt:diff(a, b), vsBrisk:diff(a, c)}; } catch (e) { out.por = {err:String(e).slice(0, 200)}; }
  return out; });
R.scenes.forEach(s => ok(s.cap && !s.err && !s.blank && s.own > .15, `${s.k}: captioned, painted with motion and held still, its own painting (${(s.own*100).toFixed(0)}% differs from the borrowed one)${s.err ? ' — ' + s.err : ''}${s.blank ? ' — blank' : ''}`));
Object.entries(R.items).forEach(([k, v]) => ok(v, `${k} has its artwork`));
ok(R.figs.brannoc === true, `Brannoc's figure draws (${R.figs.brannoc})`);
ok(R.figs.cultist === true && R.figs.kind === 'b6_cultist', `the cultist's figure draws and the foe uses it (${R.figs.cultist}, kind ${R.figs.kind})`);
ok(R.por && R.por.own && R.por.vsSgt > .1 && R.por.vsBrisk > .1, `Brannoc's portrait is his own ${JSON.stringify(R.por)}`);
ok(!errors.length, `no page errors ${errors.join(' | ')}`);
await br.close(); srv.kill();
console.log(fail ? 'FAILED' : 'all passed');
process.exit(fail);
