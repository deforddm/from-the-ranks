/* ============ Book Four, Chapter 1 art: The Muster (placeholders; the finished drawings replace these) ============ */
{
  const stub = (c1, c2) => function(ctx, h, t, o){ h.legs('#2a2622'); h.torso(c1, c2); h.head('#a8826a'); h.look(); };
  [['b4_c1_thief','#4a4238','#1a1610'],['b4_c1_tough','#5a4a3a','#2a1e14'],['b4_c1_runner','#6a5a40','#2a2010'],['b4_c1_hollet','#7a6a4a','#2a2418'],['b4_c1_radde','#6a5a3a','#2a2010'],['b4_c1_recruit','#8a7a5a','#3a2a18']]
    .forEach(([k, a, b]) => { if (!FIGX[k]) FIGX[k] = stub(a, b); });
  ['b4_c1_review','b4_c1_market','b4_c1_graveyard','b4_c1_quay'].forEach(k => { if (!SCENEX[k]) SCENEX[k] = (cv, t) => { const {ctx, W, H} = sceneFit(cv); ctx.fillStyle = '#2a2218'; ctx.fillRect(0, 0, W, H); }; });
  TILEX.b4_c1_aren = (ctx, ch, x, y, T, dark) => TILEX.aren(ctx, '#.,'.includes(ch) ? ch : '.', x, y, T, dark);
  TILEX.b4_c1_barracks = (ctx, ch, x, y, T, dark) => TILEX.aren(ctx, '#.,'.includes(ch) ? ch : '#', x, y, T, true);
  TILEX.b4_c1_graves = (ctx, ch, x, y, T, dark) => TILEX.barrow(ctx, '#.,'.includes(ch) ? ch : '#', x, y, T, true);
  ['b4_c1_finger','b4_c1_relic','b4_c1_redsash','b4_c1_durhangpipe'].forEach(k => { ART['item/' + k] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 130"><rect width="240" height="130" fill="#3a3024"/></svg>`; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] = [240, 130]; });
}
