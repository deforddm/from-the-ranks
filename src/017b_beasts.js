/* v13.51.0: the animals drawn as animals (David, Nov 18, 2026: "improve the artwork of the jheck wolves, horses and other animals").
   Two shared drawers, so every wolf, dog, horse and ox in the game has the same bones under it:
   drawWolf: a wolf or a dog side on, shaded, for the walking and fighting figures (the Hound of Shadow keeps its own, 017).
   beastHorse / beastOx: one-colour silhouettes for the scene art, where a horse is a few pixels of dusk. */

/* a wolf, side on, facing +x, feet on y = 0, about 57 units nose to tail and 17 at the shoulder (the Hound's frame, 017).
   o: {fur, dark, pale (hex): the coat, its saddle and far legs, its belly and muzzle; g: stride -1..1; eye (hex); snarl: teeth showing;
       lean: 0..1, ribs and a tucked belly (a camp dog); tail: 'low' (a wolf's) | 'high' (a dog's, curled over); ear: 'down' drops the far ear; grey: 0..1, an old muzzle} */
function drawWolf(ctx, o = {}){
  const fur = o.fur || '#7c7870', dark = o.dark || shade(fur, -.42), pale = o.pale || shade(fur, .34), g = o.g || 0, lean = o.lean || 0;
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const leg = (pts, w, c, paw) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    const [fx, fy] = pts[pts.length - 1]; ctx.strokeStyle = paw; ctx.lineWidth = w*.72; ctx.beginPath(); ctx.moveTo(fx - .3, fy + .1); ctx.lineTo(fx + 1.5, fy + .1); ctx.stroke(); };
  /* the far legs: a foreleg straight under the shoulder, a hind leg with the hock set back */
  leg([[10.4, -9], [11.4 - g*1.6, -4.8], [11.8 + g*3.2, -.7]], 2.5, dark, shade(dark, -.2));
  leg([[-14.6, -10], [-18.6 + g*1.6, -5.2], [-15.6 - g*3.2, -.7]], 2.8, dark, shade(dark, -.2));
  /* the tail */
  ctx.fillStyle = fur; ctx.beginPath();
  if (o.tail === 'high') { ctx.moveTo(-20.6, -13.4); ctx.quadraticCurveTo(-27.6, -17.4 - g*.6, -25.6, -22.6); ctx.quadraticCurveTo(-22.6, -24.6, -21.2, -21.6); ctx.quadraticCurveTo(-23.8, -21.8, -23.6, -18.6); ctx.quadraticCurveTo(-22.6, -14.4, -19.4, -11.6); }
  else { ctx.moveTo(-20.4, -13.6); ctx.quadraticCurveTo(-29.4, -13.6, -31.6, -5.2 + g*.8); ctx.quadraticCurveTo(-31.4, -2.6, -29.2, -2.8 + g*.8); ctx.quadraticCurveTo(-25.6, -7.2, -19.6, -8.8); }
  ctx.closePath(); ctx.fill();
  if (o.tail !== 'high') { ctx.fillStyle = rgba(dark, .55); ctx.beginPath(); ctx.moveTo(-28.6, -8.6); ctx.quadraticCurveTo(-31.4, -5.6, -31.4, -4 + g*.8); ctx.quadraticCurveTo(-30.6, -2.6, -29.2, -2.8 + g*.8); ctx.quadraticCurveTo(-28.4, -5.4, -28.6, -8.6); ctx.fill(); } // the dark tip
  /* the body: a deep chest, a tucked waist, the head carried level and forward */
  const by = -7.4 - lean*1.3; // the belly line rises on a lean one
  const body = () => { ctx.beginPath(); ctx.moveTo(-21.6, -8.6); ctx.quadraticCurveTo(-22.6, -12.6, -19.6, -14.2); ctx.quadraticCurveTo(-13, -15.9, -6, -15.2); ctx.quadraticCurveTo(0, -15.2, 4.6, -17.2); // the croup, the back, up to the withers
    ctx.quadraticCurveTo(8.4, -18.2, 12.4, -17.2); ctx.lineTo(16.6, -17.4); ctx.quadraticCurveTo(19.2, -17, 20.6, -15.2); // the neck's ruff, the skull
    ctx.lineTo(25.6, -13.4); ctx.quadraticCurveTo(27.4, -13, 27.2, -11.8); ctx.lineTo(25.8, -10.6); ctx.lineTo(20.6, -10); // the stop, the muzzle, the nose, the lip
    ctx.quadraticCurveTo(18, -9, 16.4, -8.6); ctx.quadraticCurveTo(14.6, -5.2, 10.6, -4.6); ctx.quadraticCurveTo(7.6, -4.6, 5.6, -6); // the jaw, the throat's ruff, the brisket
    ctx.quadraticCurveTo(-2, by + .4, -10, by - 1.6); ctx.quadraticCurveTo(-14.6, by - 1.2, -17.6, -6.6); ctx.quadraticCurveTo(-20.6, -6.4, -21.6, -8.6); ctx.closePath(); }; // the belly, the tuck, the haunch
  const gr = ctx.createLinearGradient(0, -18, 0, -5); gr.addColorStop(0, dark); gr.addColorStop(.3, fur); gr.addColorStop(.72, fur); gr.addColorStop(1, pale); body(); ctx.fillStyle = gr; ctx.fill();
  ctx.save(); body(); ctx.clip();
    ctx.fillStyle = rgba(pale, .8); ctx.beginPath(); ctx.moveTo(27.4, -12); ctx.lineTo(20.6, -12.2); ctx.quadraticCurveTo(15.6, -11.6, 14.4, -8); ctx.quadraticCurveTo(12.6, -6.6, 5.6, -7.2); ctx.lineTo(5.6, -3); ctx.lineTo(27.4, -3); ctx.closePath(); ctx.fill(); // pale under the jaw, the throat and the chest
    ctx.fillStyle = rgba(dark, .5); ctx.beginPath(); ctx.moveTo(-20, -15); ctx.quadraticCurveTo(-8, -17, 4.6, -18.4); ctx.lineTo(13, -18.2); ctx.lineTo(12, -15.6); ctx.quadraticCurveTo(2, -13.2, -8, -13.4); ctx.quadraticCurveTo(-15, -13, -20, -12); ctx.closePath(); ctx.fill(); // the saddle
    ctx.strokeStyle = rgba(dark, .5); ctx.lineWidth = .7; ctx.beginPath(); for (let i = 0; i < 7; i++){ const x = 3.4 + i*1.5; ctx.moveTo(x, -16.6 + i*.5); ctx.lineTo(x - 1.5, -12.4 + i*.7); } ctx.stroke(); // the ruff, in hanks down the neck
    ctx.strokeStyle = rgba(pale, .3); ctx.lineWidth = .6; ctx.beginPath(); for (let i = 0; i < 6; i++){ const x = -19 + i*1.5; ctx.moveTo(x, -12.4 + i*.2); ctx.lineTo(x - 1.2, -8.6 + i*.1); } ctx.stroke(); // the haunch's long fur
    if (lean > 0) { ctx.strokeStyle = rgba(dark, .5*lean); ctx.lineWidth = .7; ctx.beginPath(); for (let i = 0; i < 5; i++){ const x = -6.4 + i*2.3; ctx.moveTo(x, -13.4); ctx.quadraticCurveTo(x - 1.4, -10.6, x - .4, by - .4); } ctx.stroke();
      ctx.strokeStyle = rgba(pale, .28*lean); ctx.beginPath(); for (let i = 0; i < 5; i++){ const x = -5.6 + i*2.3; ctx.moveTo(x, -13.2); ctx.quadraticCurveTo(x - 1.4, -10.6, x - .4, by - .4); } ctx.stroke(); } // every rib
    if (o.grey) { ctx.fillStyle = rgba('#d8d4cc', .7*o.grey); ctx.beginPath(); ctx.moveTo(19.6, -16.4); ctx.lineTo(28, -14); ctx.lineTo(28, -9); ctx.lineTo(18.6, -9); ctx.closePath(); ctx.fill(); } // grey to the muzzle
  ctx.restore();
  /* the ears: the far one behind and darker, the near one pricked */
  if (o.ear === 'down') poly(ctx, [[14.6, -17.2], [12.2, -16.4], [13.6, -13.8]], dark); else poly(ctx, [[13.2, -17.2], [13.6, -21.4], [15.8, -17.2]], dark);
  poly(ctx, [[15.2, -17.2], [16.6, -22.2], [18.9, -16.8]], fur); poly(ctx, [[16, -17.6], [16.7, -20.6], [17.9, -17.4]], rgba('#2a1c18', .55));
  /* the near legs: thicker, the coat's own colour, pale at the paw */
  leg([[8.2, -9.6], [8.6 + g*1.6, -4.9], [8.8 - g*3.2, -.7]], 3, fur, pale);
  ctx.fillStyle = fur; ctx.beginPath(); ctx.ellipse(-15, -10.2, 4.4, 3.6, -.5, 0, Math.PI*2); ctx.fill(); // the thigh, over the leg's top
  leg([[-13.6, -9.6], [-18 - g*1.6, -5.2], [-14.6 + g*3.2, -.7]], 3.2, fur, pale);
  /* the face */
  ctx.fillStyle = '#0c0a09'; ctx.beginPath(); ctx.ellipse(26.7, -12.5, 1.15, .95, 0, 0, Math.PI*2); ctx.fill(); // the nose
  ctx.strokeStyle = 'rgba(12,8,6,.85)'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(26.2, -11.1); ctx.lineTo(21, -10.5 - (o.snarl ? .5 : 0)); ctx.stroke(); // the mouth
  if (o.snarl) { ctx.fillStyle = '#16100e'; ctx.beginPath(); ctx.moveTo(21, -11.4); ctx.lineTo(26.4, -11.4); ctx.lineTo(25.8, -9.6); ctx.lineTo(21.4, -9.2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ece4d0'; for (let i = 0; i < 4; i++) ctx.fillRect(21.8 + i*1.15, -11.3, .55, 1 + (i === 3 ? .7 : 0)); }
  ctx.fillStyle = 'rgba(14,10,8,.7)'; ctx.beginPath(); ctx.moveTo(18.6, -15.3); ctx.lineTo(21.4, -14.6); ctx.lineTo(18.8, -14.3); ctx.closePath(); ctx.fill(); // the eye's dark rim
  ctx.fillStyle = o.eye || '#e8c860'; ctx.beginPath(); ctx.ellipse(19.9, -14.75, .85, .6, .2, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = '#0a0806'; ctx.fillRect(19.7, -15.05, .5, .6);
  ctx.strokeStyle = rgba(pale, .35); ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(-19, -14.4); ctx.quadraticCurveTo(-8, -16.2, 4.6, -17.6); ctx.quadraticCurveTo(8.4, -18.4, 12.4, -17.5); ctx.stroke(); // light along the back
  ctx.restore();
}

/* a horse as one flat shape, side on, facing +x, feet on y = 0, the barrel about 11 long and the withers 8.6 up: the measure the scene art's
   old ovals-on-sticks used, so it drops into their places. The caller scales and flips it.
   o: {g: stride -1..1; run: 1 stretched at the gallop, 2 gathered under; down: head to the ground; up: head thrown high; tail: false for a docked one;
       bare: true leaves the neck and head off (a rider's own code draws them)} */
function beastHorse(x, col, o = {}){
  const g = o.g || 0; x.save(); x.fillStyle = col; x.strokeStyle = col; x.lineCap = 'round'; x.lineJoin = 'round';
  const leg = (a, b, c, w) => { x.lineWidth = w; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); x.lineWidth = w*.5; x.beginPath(); x.moveTo(b[0], b[1]); x.lineTo(c[0], c[1] - .3); x.stroke();
    x.lineWidth = w*.62; x.beginPath(); x.moveTo(c[0], c[1] - .24); x.lineTo(c[0] + .36, c[1] - .24); x.stroke(); };
  if (o.run === 1) { leg([3.9, -5.2], [6.2, -3.8], [8.6, -2.4], 1.15); leg([3.3, -5.2], [5.2, -3], [7.2, -1], 1.15); leg([-4, -5.6], [-6.4, -3.6], [-8.8, -2], 1.3); leg([-3.4, -5.4], [-5.4, -2.8], [-7.4, -.6], 1.3); }
  else if (o.run === 2) { leg([3.9, -5.2], [4.8, -2.8], [2.8, -1.4], 1.15); leg([3.3, -5.2], [5.2, -3.2], [3.8, -.7], 1.15); leg([-4, -5.6], [-2.2, -3.2], [-.8, -1], 1.3); leg([-3.4, -5.4], [-3.2, -2.8], [-1.8, -.3], 1.3); }
  else { leg([3, -5.2], [2.8 + g*.7, -2.7], [2.7 + g*1.7, 0], .95); leg([4.3, -5.2], [4.4 - g*.7, -2.7], [4.4 - g*1.7, 0], 1);
    leg([-3.2, -5.6], [-3.9 - g*.5, -2.9], [-3.1 - g*1.6, 0], 1.1); leg([-4.6, -5.6], [-5.6 + g*.5, -2.9], [-4.9 + g*1.6, 0], 1.15); }
  x.beginPath(); x.moveTo(-5.8, -6.8); x.quadraticCurveTo(-5.6, -8.9, -3.6, -8.9); x.quadraticCurveTo(-.4, -7.9, 2.7, -8.7); // the rump, the croup, the back, the withers
  if (o.bare) { x.lineTo(5.2, -8); }
  else if (o.down) { x.quadraticCurveTo(5.8, -8.6, 7.3, -4.9); x.lineTo(7.9, -5.5); x.lineTo(7.9, -4.3); x.lineTo(8.7, -1.5); x.quadraticCurveTo(8.6, -.7, 7.8, -.9); x.lineTo(6.7, -3.6); x.quadraticCurveTo(5.9, -5.4, 5.5, -6.2); } // the neck let down, the head at the ground
  else if (o.up) { x.quadraticCurveTo(4, -11.6, 5.3, -13.5); x.lineTo(5.3, -14.6); x.lineTo(6, -13.7); x.lineTo(8.6, -12.9); x.quadraticCurveTo(9.2, -12.3, 8.6, -11.8); x.lineTo(6.6, -11.5); x.quadraticCurveTo(5.9, -9.8, 5.7, -8.2); x.quadraticCurveTo(5.6, -7, 5.5, -6.2); } // thrown high
  else { x.quadraticCurveTo(4.6, -11.2, 6.4, -12.3); x.lineTo(6.5, -13.4); x.lineTo(7.1, -12.4); x.lineTo(9.3, -10.1); x.quadraticCurveTo(9.8, -9.3, 9.1, -8.9); x.lineTo(7.3, -9.8); x.quadraticCurveTo(6.3, -9.4, 5.9, -8.2); x.quadraticCurveTo(5.6, -7, 5.5, -6.2); } // the crest, the ear, the long face, the jaw, the throat
  x.quadraticCurveTo(5.4, -4.5, 4.1, -4.4); x.quadraticCurveTo(0, -3.5, -3.2, -4.6); x.quadraticCurveTo(-4.8, -4.4, -5.7, -5.4); x.closePath(); x.fill(); // the chest, the belly, the flank
  if (o.tail !== false) { x.beginPath(); x.moveTo(-5.2, -8.5); x.quadraticCurveTo(-8.2, -8.3 - g*.3, -8 - g*.3, -3.2); x.lineTo(-7.4 - g*.3, -2.2); x.quadraticCurveTo(-7.1, -6.4, -5.6, -7.6); x.closePath(); x.fill(); } // the tail
  if (o.mane) { x.fillStyle = o.mane; x.beginPath(); x.moveTo(2.9, -8.7); x.quadraticCurveTo(4.5, -11.4, 6.3, -12.4); x.lineTo(5.6, -10.6); x.quadraticCurveTo(4.6, -9.6, 4.2, -7.8); x.closePath(); x.fill(); }
  x.restore();
}

/* an ox as one flat shape, side on, facing +x, feet on y = 0, the barrel about 16 long and the hump 10 up (b92aOx's measure): the heavy shoulder,
   the head carried low, the dewlap, the horn. o: {horn: colour of the horn (drawn over), g: stride} */
function beastOx(x, col, o = {}){
  const g = o.g || 0; x.save(); x.fillStyle = col; x.strokeStyle = col; x.lineCap = 'round'; x.lineJoin = 'round';
  const leg = (hx, k, w) => { x.lineWidth = w; x.beginPath(); x.moveTo(hx, -4.6); x.lineTo(hx + k*.5, -2.2); x.stroke(); x.lineWidth = w*.68; x.beginPath(); x.moveTo(hx + k*.5, -2.2); x.lineTo(hx + k*1.3, -.3); x.stroke(); };
  leg(5.6, g, 1.9); leg(6.9, -g, 2); leg(-5.4, -g, 2); leg(-6.8, g, 2.1);
  x.beginPath(); x.moveTo(-8.6, -6.4); x.quadraticCurveTo(-8.6, -9.6, -6, -9.6); x.quadraticCurveTo(-1, -8.8, 2.6, -9.6); x.quadraticCurveTo(4.6, -11, 6.6, -10.2); // the rump, the back, the hump over the shoulder
  x.quadraticCurveTo(8.6, -9.4, 9.8, -8.2); x.lineTo(10.4, -9); x.lineTo(10.8, -7.8); x.quadraticCurveTo(13, -6.8, 13.4, -4.4); x.quadraticCurveTo(13.4, -3.2, 12.2, -3.2); x.lineTo(10.4, -4.6); // the neck, an ear, the long head held low, the muzzle
  x.quadraticCurveTo(9.4, -2.6, 8.2, -3.4); x.quadraticCurveTo(7.6, -2.6, 6.6, -3.2); x.quadraticCurveTo(0, -2.2, -5.6, -3.4); x.quadraticCurveTo(-7.8, -3.6, -8.6, -6.4); x.closePath(); x.fill(); // the dewlap, the brisket, the belly
  x.lineWidth = .7; x.beginPath(); x.moveTo(-8.4, -8.6); x.quadraticCurveTo(-10, -7 , -9.6 - g*.4, -3); x.stroke(); x.beginPath(); x.ellipse(-9.6 - g*.4, -2.4, .6, 1, 0, 0, 7); x.fill(); // the tail and its tuft
  if (o.horn) { x.strokeStyle = o.horn; x.lineWidth = .7; x.beginPath(); x.moveTo(10, -8.6); x.quadraticCurveTo(11.6, -11.2, 13.2, -10.2); x.stroke(); }
  x.restore();
}
