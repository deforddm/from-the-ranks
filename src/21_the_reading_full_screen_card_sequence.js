/* ============ the reading: full-screen card sequence ============ */
let cardAnim = null;
/* a later book's reading (47c): CARDBOOK = {txt(id), cap(t, self, second)}, its reader's words for the card and the captions; optional (v8.0, 80c)
   square() true to lay square tiles, done() the button that ends it, look() the vision button. Book One's reading is Tuft's, as written below */
let CARDBOOK = null;
/* v6.11.0: the cards are dealt on a table (21b: one per place), by the reader's own deck and in the reader's own spread; the House's light
   falls on the table after the turn; the way in and out is a fade, and the reading has the Deck's music. The risen card tilts under a finger.
   Sohra throws the bones instead, and the card rises out of the smoke. The timings are the old ones: the text at 5.6 s, a tap hurries it. */
/* opt.card: show that card and leave S.card alone. opt.self: Tuft draws for herself; the flanking cards never turn. */
function cardSequence(done, opt = {}){
  const el = $('#cardfx'), wasOpen = !el.hidden; el.hidden = false; delete el.dataset.shown;
  if (!opt.card && !S.card) S.card = dealCard(['oponn','obelisk','knight','assassin']);
  const cid = opt.card || S.card, self = !!opt.self;
  const picks = ['crown','sceptre','orb'].filter(k => k !== cid).sort(() => Math.random() - .5).concat(['obelisk','knight','oponn'].filter(k => k !== cid && CARDS[k]).sort(() => Math.random() - .5)); // the cards that refuse; a bigger spread reaches past the three
  const c = CARDS[cid] || {name:'?', fx:'', txt:'', hue:'#888'};
  const BK = CARDBOOK && S && S.book && S.book !== 'gotm' ? CARDBOOK : null, ctxt = BK ? BK.txt(cid) : c.txt;
  /* Tattersail's Fold: once a chapter, the turned card goes back and another comes up from the same pool; keep either */
  const second = opt.second, foldPool = (S.cardPool || []).filter(k => k !== cid && CARDS[k]), canFold = !self && !opt.card && !second && foldPool.length && typeof trickLeft === 'function' && trickLeft('fold') > 0;
  const pc = second ? CARDS[second.prev] : null;
  /* Through the Deck: a card with a vision this chapter can be looked into (not Tuft's own draw, a shown card, or the Fold's second card) */
  const vis = !self && !opt.card && !second && typeof visionFor === 'function' ? visionFor(S.chapter, cid) : null;
  /* the table, the reader, the deck and the spread (21b) */
  const reader = readingReader(), spread = readingSpread(reader), bones = !!spread.bones, tbl = readingTable(opt); DECKBACK_NOW = reader;
  el.style.setProperty('--tbl', rgba(tbl.dark, .94));
  el.innerHTML = `<canvas id="ccv"></canvas><div class="cf" id="cfText"><div class="cn">${esc(c.name)}</div><div class="cfx">${esc(c.fx || '')}</div><div class="ct">${smartq(esc(ctxt || '').replace(/&quot;/g,'"'))}</div>
    ${pc ? `<div class="cfold"><span class="fold">✦ Tattersail's Fold: or keep the first card,</span> <b>${esc(pc.name)}</b> <span>${esc(pc.fx || '')}</span></div>` : ''}
    <div class="row cfrow"><button class="btn primary" id="cfGo">${second ? `Keep ${esc(c.name)}` : self ? 'Put the card away' : bones ? 'Gather the bones' : BK && BK.done ? BK.done() : S.chapter ? "Put the cards away" : "Descend"}</button>${vis ? `<button class="btn vis" id="cfVis">✦ ${BK && BK.look ? BK.look() : 'Look into the card'}</button>` : ''}${second ? `<button class="btn" id="cfKeep">Keep ${esc(pc.name)}</button>` : ''}${canFold ? `<button class="btn trk" id="cfFold">✦ Draw again · Tattersail's Fold</button>` : ''}</div></div>`;
  const cv = $('#ccv'), ctx = cv.getContext('2d'); const dpr = Math.min(2, window.devicePixelRatio || 1);
  let img = null, lay = null;
  const sq = !!(BK && BK.square && BK.square()); // v8.0: Book Five lays square tiles of the Holds, not cards (80c)
  const layout = () => { const W = el.clientWidth, H = el.clientHeight, CW = Math.min(160, W*.3, H*.2) * (sq ? 1.12 : 1), CH = sq ? CW : CW*1.5; return {W, H, CW, CH, cx:W/2, deckX:W/2 - CW/2, deckY:Math.min(H*.82, H - CH - 10)}; };
  const fit = () => { cv.width = el.clientWidth * dpr; cv.height = el.clientHeight * dpr; ctx.setTransform(dpr,0,0,dpr,0,0); lay = layout(); try { img = makeReadingTable(tbl, lay.W, lay.H, dpr, reader, lay); } catch(e) { console.warn('table', e); img = null; } }; fit();
  const t0 = performance.now(); let finished = false, cues = {};
  const cue = (k, f) => { if (!cues[k]) { cues[k] = 1; f(); } };
  const prevScene = 'scene' in opt ? opt.scene : (AUDIO._dev && AUDIO._dev.state ? AUDIO._dev.state.want : null); AUDIO.setScene('dark'); // the Fold's second reading hands on the scene to go back to
  AUDIO.play('shuffle');
  if (wasOpen) el.classList.add('in'); else requestAnimationFrame(() => { if (!el.hidden) el.classList.add('in'); });
  /* the way out: the page behind is ready while the table fades (quick for a vision, which has its own reveal) */
  const leave = (after, quick) => { if (finished) return; finished = true; window.removeEventListener('resize', fit); DECKBACK_NOW = 'tuft';
    const ms = REDUCE() ? 0 : quick ? 250 : 550; el.classList.remove('in');
    setTimeout(() => { if (cardAnim === frame) cardAnim = null; if (!el.classList.contains('in')) { el.hidden = true; el.innerHTML = ''; } }, ms);
    if (!quick && prevScene) AUDIO.setScene(prevScene); after(); };
  const end = () => leave(done);
  $('#cfGo').onclick = end;
  if (vis) $('#cfVis').onclick = () => leave(() => playVision(vis, done), true);
  if (second) $('#cfKeep').onclick = () => { S.card = second.prev; const fk = 'c' + S.chapter + '_drawnCard'; if (S.f[fk]) S.f[fk] = S.card; save(); end(); };
  if (canFold) $('#cfFold').onclick = () => { if (finished) return; finished = true; cardAnim = null; window.removeEventListener('resize', fit); spendTrick('fold'); AUDIO.play('shuffle');
    const nk = foldPool[R(foldPool.length)]; S.card = nk; const fk = 'c' + S.chapter + '_drawnCard'; if (S.f[fk]) S.f[fk] = nk; save(); cardSequence(done, {second:{prev:cid}, scene:prevScene}); };
  let skipTo = null; el.onclick = e => { if (e.target.id === 'cfGo' || e.target.id === 'cfVis' || e.target.id === 'cfKeep' || e.target.id === 'cfFold') return; if (dragged) { dragged = false; return; } if (performance.now() - t0 < 6200) skipTo = 6200; };
  /* the risen card tilts under a finger (or the mouse held down) and settles back when let go */
  const tilt = {x:0, y:0, tx:0, ty:0}; let down = false, dragged = false, d0 = null;
  cv.onpointerdown = e => { down = true; d0 = [e.clientX, e.clientY]; try { cv.setPointerCapture(e.pointerId); } catch(_) {} };
  cv.onpointermove = e => { if (!down || !lay) return; if (d0 && Math.hypot(e.clientX - d0[0], e.clientY - d0[1]) > 6) dragged = true; tilt.tx = clamp((e.clientX / lay.W - .5) * 2.4, -1, 1); tilt.ty = clamp((e.clientY / lay.H - .38) * 3, -1, 1); };
  cv.onpointerup = cv.onpointercancel = () => { down = false; tilt.tx = tilt.ty = 0; };
  const TL = REDUCE() ? .35 : 1; // time scale
  const ansSlot = spread.slots.find(s => s.ans), others = spread.slots.filter(s => !s.ans), FLIP = 4900, RISE = 4600;
  const frame = () => {
    let t = (performance.now() - t0) / TL; if (skipTo) { t = Math.max(t, skipTo); }
    const {W, H, CW, CH, cx, deckX, deckY} = lay, phone = W < H;
    const turned = clamp((t - FLIP - 200) / 900, 0, 1);
    drawReadingTable(ctx, W, H, t, tbl, img, {house:c.house, turned});
    const slotXY = sl => ({x: cx + sl.dx * CW - CW/2, y: H * sl.yy + (sl.dy || 0) * CH * (phone ? 1 : .78) - CH/2}); // a wide screen keeps the arms of a cross on it
    if (!bones) {
      // the deck, and the shuffle: cards arc out and back
      ctx.globalAlpha = 1 - clamp((t - 5000) / 800, 0, 1); for (let i=0;i<6;i++) drawCardFlip(ctx, null, deckX, deckY - i*1.5, CW, CH, 0, t, -.06 + i*.01); ctx.globalAlpha = 1;
      if (t < 1400) { for (let i=0;i<7;i++){ const ph = (t/1400 + i/7) % 1, k = Math.sin(ph*Math.PI); const side = i % 2 ? 1 : -1; drawCardFlip(ctx, null, deckX + side*k*W*.28, deckY - k*H*.2, CW, CH, 0, t, side*k*.6); }
        if (t > 700) cue('sh2', () => AUDIO.play('shuffle')); }
      // the spread: the refused cards arrive first, each turns, shows its face for a breath, and goes dark
      others.forEach((sl, i) => { const a = ease(clamp((t - 1500 - i*260) / 600, 0, 1)); if (a <= 0) return; const sc = sl.sc || 1, {x:sx, y:sy} = slotXY(sl);
        const k = self ? 0 : clamp((t - sl.flip) / 500, 0, 1), id = picks[i % picks.length], x = lerp(deckX, sx, a), y = lerp(deckY, sy, a);
        drawCardFlip(ctx, id, x, y, CW, CH, k, t, sl.rot * a, sc);
        if (k > .5) cue('f' + i, () => AUDIO.play('flip'));
        if (!self) { const ref = clamp((t - sl.flip - 1000) / 260, 0, 1); if (ref > 0) { ctx.save(); ctx.translate(x + CW/2, y + CH/2); ctx.rotate(sl.rot); ctx.scale(sc, sc);
          ctx.globalAlpha = ref * .88; ctx.fillStyle = '#060504'; ctx.fillRect(-CW/2, -CH/2, CW, CH); for (let j=0;j<9;j++) ell(ctx, Math.sin(t/500 + j)*CW*.3, CH/2 - ((t/5 + j*30) % (CH+20)), CW*(.15 + hash(j,1)*.15), 6 + hash(j,2)*6, 'rgba(38,32,30,.55)');
          const cr = clamp((t - sl.flip - 1000) / 700, 0, 1); if (cr < 1) { ctx.globalAlpha = (1 - cr) * .9; ctx.strokeStyle = c.hue; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-CW*.1, -CH/2); for (let j=1;j<7;j++) ctx.lineTo((hash(j,3,id.length) - .5)*CW*.5, -CH/2 + j*CH/7 * Math.min(1, cr*2 + .2)); ctx.stroke(); } // the crack of dark through it
          ctx.globalAlpha = 1; ctx.restore(); } }
      });
    } else {
      // Sohra's bones: shaken, thrown into the smoke, settling in a ring; rolled again twice; then the card rises out of the smoke
      const cupX = deckX - CW*.2, cupY = deckY + CH*.6; TBL_PROP.bonecup(ctx, cupX, cupY, CW*.22);
      for (let j=0;j<10;j++){ const k = ((t/3000 + j/10) % 1), sw = Math.sin(t/900 + j*1.7); ctx.save(); ctx.translate(lerp(cupX, cx, k*.95) + sw*CW*(.1 + k*.5), lerp(cupY, H*.38, k*.9)); ctx.scale(1, .45); glow(ctx, 0, 0, CW*(.3 + k*.9), '#d8d4d0', .5*(1 - k)*(1 - k)); ctx.restore(); } // the smoke
      const ring = others, re1 = clamp((t - 2900) / 500, 0, 1), re2 = clamp((t - 3900) / 500, 0, 1);
      ring.forEach((sl, i) => { const {x:sx, y:sy} = slotXY(sl), bx0 = sx + CW/2, by0 = sy + CH/2, bs = CW*.19;
        if (t < 900) { drawKnuckle(ctx, cupX + CW*.9 + (hash(i,1,t/40|0) - .5)*CW*.5, cupY - CW*.1 + (hash(i,2,t/40|0) - .5)*CW*.3, bs, i, t); return; } // shaken in the fist
        const a = clamp((t - 900 - i*90) / 900, 0, 1), arc = Math.sin(a*Math.PI); if (a <= 0) return;
        const hop = Math.sin(re1*Math.PI)*CW*.35 + Math.sin(re2*Math.PI)*CW*.25, jx = (re1 > 0 ? (hash(i,5,2) - .5)*CW*.5*ease(re1) : 0) + (re2 > 0 ? (hash(i,6,2) - .5)*CW*.5*ease(re2) : 0);
        const x = lerp(cupX + CW*.9, bx0, ease(a)) + jx, y = lerp(cupY, by0, ease(a)) - arc*H*.22 - hop, rot = sl.rot + a*6 + re1*4 + re2*3 + (i % 2 ? 1 : -1)*arc*2;
        drawKnuckle(ctx, x, y, bs, rot, t);
        if (a >= 1 && t < 1500 + i*90 + 400) cue('b' + i, () => AUDIO.play('flip')); });
      if (t > 1000) cue('sh2', () => AUDIO.play('shuffle')); if (t > 2900) cue('r1', () => AUDIO.play('shuffle')); if (t > 3900) cue('r2', () => AUDIO.play('shuffle'));
    }
    // the card: it turns (or rises out of the smoke), comes up bigger on a phone held upright, and takes the light of its House
    { const sl = ansSlot, {x:sx, y:sy} = slotXY(sl), iA = others.length, a = bones ? 1 : ease(clamp((t - 1500 - iA*260) / 600, 0, 1));
      if (a > 0) { const k = bones ? clamp((t - RISE) / 900, 0, 1) : clamp((t - FLIP) / 900, 0, 1), rise = clamp((t - RISE) / 700, 0, 1); let sc = 1 + ease(rise) * (phone ? .5 : .35);
        const x = lerp(deckX, sx, a), y = lerp(deckY, sy, a) - (sc - 1) * CH*.4;
        if (k > 0) glow(ctx, x + CW/2, y + CH/2, CW*1.4*sc, c.hue, .12 + k*.28 + Math.sin(t/300)*.04 + (vis && t > 5600 ? Math.max(0, Math.sin(t/650))*.14 : 0));
        tilt.x += (tilt.tx - tilt.x) * .14; tilt.y += (tilt.ty - tilt.y) * .14; const tilting = rise >= 1 && (Math.abs(tilt.x) > .005 || Math.abs(tilt.y) > .005);
        ctx.save(); if (tilting) { ctx.translate(x + CW/2, y + CH/2); ctx.transform(1 - Math.abs(tilt.x)*.14, tilt.x*.06, tilt.y*.05, 1 - Math.abs(tilt.y)*.1, 0, 0); ctx.translate(-x - CW/2, -y - CH/2); }
        if (bones) { ctx.globalAlpha = k; if (k > 0) { const s2 = sc * (.6 + k*.4); drawCardFlip(ctx, cid, x, y, CW, CH, 1, t, sl.rot, s2); } ctx.globalAlpha = 1; }
        else drawCardFlip(ctx, cid, x, y, CW, CH, k, t, sl.rot * a, sc);
        if (tilting) { ctx.translate(x + CW/2, y + CH/2); ctx.rotate(sl.rot); ctx.scale(sc, sc); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(-CW*.6 + tilt.x*CW*.8, -CH*.5, CW*.6 + tilt.x*CW*.8, CH*.5); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, `rgba(255,250,235,${.1 + Math.abs(tilt.x)*.14})`); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(-CW/2, -CH/2, CW, CH); }
        ctx.restore();
        if (k > .5) cue('fA', () => { AUDIO.play('reveal'); AUDIO.play('house', c.house); });
        if (vis && t > 5600) for (let j=0;j<8;j++){ const m = ((t/2600 + j/8) % 1); ell(ctx, x + CW/2 + Math.sin(t/700 + j*2.1)*CW*.5*sc, y + CH*.5 - m*CH*.9*sc, 1.6, 1.6, rgba(c.hue, (1 - m)*.7)); } // and it stirs, when there is a vision in it
      } }
    if (spread.coin && t > 1500) TBL_PROP.coin(ctx, cx + CW*.9, H*.36 + CH*.62, CW*.07); // Benna's copper, on the table
    // captions
    ctx.fillStyle = '#d8c8a8'; ctx.textAlign = 'center'; ctx.font = `italic ${Math.round(Math.min(20, W*.045))}px 'IM Fell English', serif`; ctx.shadowColor = 'rgba(0,0,0,.9)'; ctx.shadowBlur = 8;
    const cap = bones && !second ? (t < 1500 ? (BK ? BK.cap(t, self, second) : 'Sohra breathes on the bones and throws them into the smoke.') : t < 2900 ? 'The bones roll, and settle.' : t < 3900 ? 'She frowns, and gathers them, and throws again.' : t < 4900 ? 'Again.' : t < 5800 ? 'This time they stay. Something comes up out of the smoke.' : '')
      : BK ? BK.cap(t, self, second) : self ? (t < 1500 ? 'Tuft shuffles. Her hands are not steady.' : t < 2900 ? 'One card. For herself. The first time.' : t < 4900 ? 'The cards on either side stay face down.' : t < 5800 ? 'She turns it over.' : '')
      : second ? (t < 1500 ? 'Tuft folds the card back into the spread, the way Tattersail did it.' : t < 2900 ? 'Three again. The Deck lets her, mostly.' : t < 4900 ? '' : t < 5800 ? 'Another comes up.' : '')
      : t < 1500 ? 'Tuft shuffles without looking at her hands.' : t < 2900 ? 'Three cards. She never draws for herself.' : t < 3900 ? 'The first card refuses her.' : t < 4900 ? 'The second card refuses her.' : t < 5800 ? 'The third does not.' : '';
    if (cap) ctx.fillText(cap, cx, H*.74); ctx.shadowColor = 'transparent';
    if (t >= 6200) el.dataset.shown = '1';
    if (t > 5600) { cue('flash', () => { const f = $('#flash'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }); $('#cfText').classList.add('show');
      drawHouseSigil(ctx, c.house, cx, H*.82, Math.min(W, H)*.22, c.hue, clamp((t - 5800) / 1200, 0, 1) * .09); } // the House's mark, faint behind the words
  };
  cardAnim = frame;
  window.addEventListener('resize', fit, {once:false});
}
