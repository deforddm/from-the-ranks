/* ============ audio engine (all procedural) ============ */
/* Everything is synthesised with WebAudio; there are no samples.
   AUDIO.setScene(kind) takes the kind the game asks for ('title', 'explore', 'tunnel', 'dark', 'battle', 'fete', 'lake',
   'end', or any ambience name a scene names: 'dusk', 'night', 'desert', 'siege', 'snow'…) and, from where the game is (the
   area, the talk backdrop, the battle's setting), picks a music cue and an ambience. Each runs as a layer; when either changes,
   the old layer fades out under the new one.
   Each book has its own voice (v6.8.0): a scale, a root, instruments, drums and a reverb. Book One is D Phrygian with flute,
   cello and glass; Book Two (Seven Cities) a Phrygian-dominant scale on E with a reed, an oud and frame drums; Book Three
   (the north, the winter) a low Aeolian on C with a choir, bells and a war drum. The title plays the voice of the book shown.
   AUDIO.play(name, ...args) fires a one-shot. Buses: music, sfx and ambience, each with a send to the shared reverb (a stone
   hall and an open-air one, cross-faded by where the squad stands), into master, a sub-sonic high-pass and a limiter. The
   context starts on the first gesture and is suspended while the page is hidden or the sound is muted. One timer does all
   the scheduling, and only while it can be heard. */
const AUDIO = (() => {
  let ac = null, offline = false, master, busMus, busSfx, busAmb, wetMus, wetSfx, wetAmb, musSend, sfxTo, sfxWet, gHall, gOpen;
  let want = null, pend = false, hush = false, mus = null, amb = null, fading = [], timer = null, muteT = 0, space = 'hall';
  let bufs = {}, recent = {};
  const warned = {};
  /* ---- the voices: one per book ---- */
  const VOICES = {
    gotm:{scale:[0, 1, 3, 5, 7, 8, 10], root:73.42, pad:'saw', wet:.3, drum:'kit', lead:'horn', bellK:1, // D Phrygian
      inst:{title:['glass', 'flute'], calm:['flute', 'cello', 'glass'], end:['flute', 'glass', 'cello']},
      bpm:{title:54, calm:60, end:50, dread:52, battle:96, dark:84}},
    dg:{scale:[0, 1, 4, 5, 7, 8, 10], root:82.41, pad:'thin', wet:.2, drum:'frame', lead:'reed', bellK:0, // E Phrygian dominant (hijaz)
      inst:{title:['reed', 'oud'], calm:['oud', 'reed', 'flute'], end:['reed', 'oud', 'glass']},
      bpm:{title:58, calm:64, end:52, dread:54, battle:104, dark:88},
      pats:['K.s.K.S.', 'K..sK.S.', 'K.S.k.S.', 'K.s.Ks.S'], fills:['K.S.KSSS', 'KsSsK.SS', 'K.SSK.SS'], ost:'XxxX.xXx'},
    moi:{scale:[0, 2, 3, 5, 7, 8, 10], root:65.41, pad:'choir', wet:.45, drum:'war', lead:'lowhorn', bellK:1.4, // C Aeolian
      inst:{title:['choir', 'bell'], calm:['cello', 'choir', 'bell'], end:['choir', 'bell', 'flute']},
      bpm:{title:50, calm:56, end:48, dread:50, battle:88, dark:80},
      pats:['K.......', 'K...K...', 'K.....S.', 'K..k..s.'], fills:['K.S.K.SS', 'K...KSSS'], ost:'X...x.X.'},
    /* v7.0 Book Four (Seven Cities again, a year on, harder and drier): Phrygian dominant on C#2, a reed line and the oud, frame drums
       hit sparer and harder, a pad with sand in it (a low noise hiss under the saw and triangle), very little room */
    hoc:{scale:[0, 1, 4, 5, 7, 8, 10], root:69.30, pad:'sand', wet:.14, drum:'frame', lead:'reed', bellK:0, // C# Phrygian dominant
      inst:{title:['reed', 'oud'], calm:['oud', 'reed'], end:['reed', 'oud', 'glass']},
      bpm:{title:56, calm:60, end:50, dread:52, battle:100, dark:86},
      pats:['K..sK..S', 'K...K.S.', 'K.s.K.SS', 'K..SK.s.'], fills:['K.SSK.SS', 'KSKSK.SS'], ost:'X.xX..x.'},
    /* v8.0 Book Five (Lether: canals, stone, river fog, a kingdom that counts everything): Dorian on B1, lower than every other book, a low
       horn and a bell, war drums, a pad with water under it (a slow low-passed swell under the saw and triangle), stone-room reverb */
    mt:{scale:[0, 2, 3, 5, 7, 9, 10], root:61.74, pad:'tide', wet:.36, drum:'war', lead:'lowhorn', bellK:1.2, // B Dorian
      inst:{title:['bell', 'cello'], calm:['cello', 'glass', 'bell'], end:['bell', 'cello', 'flute']},
      bpm:{title:52, calm:58, end:48, dread:50, battle:92, dark:82},
      pats:['K...K.s.', 'K..sK...', 'K.....S.', 'K..k.Ss.'], fills:['K.S.K.SS', 'K..SKSSS'], ost:'X..x.X..'},
  };
  Object.keys(VOICES).forEach(k => VOICES[k].key = k);
  let V = VOICES.gotm;
  const f = (deg, oct = 0) => V.root * Math.pow(2, (V.scale[((deg % 7) + 7) % 7] + 12 * (Math.floor(deg / 7) + oct)) / 12);
  function voiceKey(){ try { return (typeof S !== 'undefined' && S ? S.book || 'gotm' : typeof BOOK !== 'undefined' && BOOK) || 'gotm'; } catch(e) { return 'gotm'; } }
  const rnd = (a, b) => a + Math.random() * (b - a), pick = a => a[Math.floor(Math.random() * a.length)], chance = p => Math.random() < p, P = () => rnd(-.8, .8);
  const now = () => ac.currentTime;
  const live = () => !!ac && (offline || ac.state === 'running');
  const muted = () => !(SET.master > 0) || !(SET.music > 0 || SET.sfx > 0 || SET.amb > 0);
  const vol = k => Math.max(0, Math.min(1, +SET[k] || 0));
  const res = () => { try { const p = ac.resume(); if (p && p.then) p.then(sync, () => {}); } catch(e) {} };
  const sus = () => { try { const p = ac.suspend(); if (p && p.catch) p.catch(() => {}); } catch(e) {} };
  const warn = (k, m) => { if (!warned[k]) { warned[k] = 1; console.warn('AUDIO: ' + m); } };

  /* ---- the graph ---- */
  function gn(v, to){ const g = ac.createGain(); g.gain.value = v; if (to) g.connect(to); return g; }
  function F(type, fr, q, to){ const n = ac.createBiquadFilter(); n.type = type; n.frequency.value = fr; if (q != null) n.Q.value = q; if (to) n.connect(to); return n; }
  function init(){
    if (ac) return true;
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
    try { ac = new C(); } catch(e) { return false; }
    build(); ac.onstatechange = sync; return true;
  }
  function build(){
    const lim = ac.createDynamicsCompressor(); // a limiter: catches stacked explosions, leaves everything else alone
    lim.threshold.value = -6; lim.knee.value = 4; lim.ratio.value = 12; lim.attack.value = .002; lim.release.value = .2; lim.connect(ac.destination);
    master = gn(0, F('highpass', 30, .7, lim));
    const hall = ac.createConvolver(); hall.buffer = ir(2.6, 6.5, .43); hall.connect(gn(.5, master)); gHall = gn(space === 'hall' ? 1 : 0, hall);
    const open = ac.createConvolver(); open.buffer = ir(.9, 9, .3); open.connect(gn(.42, master)); gOpen = gn(space === 'open' ? 1 : 0, open);
    const verbIn = gn(1); verbIn.connect(gHall); verbIn.connect(gOpen);
    busMus = gn(0, master); busSfx = gn(0, master); busAmb = gn(0, master);
    wetMus = gn(0, verbIn); wetSfx = gn(0, verbIn); wetAmb = gn(0, verbIn);
    musSend = gn(V.wet, wetMus); sfxTo = busSfx; sfxWet = gn(.35, wetSfx);
    applyVolumes();
  }
  function ir(sec, decay, dull){ // a space: decaying noise that loses its top end as it dies. The hall is long and dark; the open air short and thin
    const sr = ac.sampleRate, n = Math.floor(sr * sec), b = ac.createBuffer(2, n, sr);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); let l = 0;
      for (let i = 0; i < n; i++) { const u = i / n; l += (.5 - dull * u) * (Math.random() * 2 - 1 - l); d[i] = l * Math.exp(-decay * u) * Math.min(1, i / (sr * .015)); } }
    return b;
  }
  function setSpace(s, sec = 1.5){ if (s === space || !ac) { space = s; return; } space = s; glide(gHall.gain, s === 'hall' ? 1 : 0, sec); glide(gOpen.gain, s === 'open' ? 1 : 0, sec); }
  /* noise: w white, b brown, p pink. Mono two-second buffers for one-shots (started at a random point, so no two are
     alike); stereo beds for ambience, whose tail is cross-faded into the head so the loop has no seam. */
  function noiseBuf(kind, ch, sec){
    const sr = ac.sampleRate, n = Math.floor(sr * sec), x = Math.floor(sr * .3), b = ac.createBuffer(ch, n, sr), tmp = new Float32Array(n + x);
    for (let c = 0; c < ch; c++) {
      const d = b.getChannelData(c); let l = 0, b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, ss = 0;
      for (let i = 0; i < n + x; i++) { const w = Math.random() * 2 - 1; let y;
        if (kind === 'b') { l = (l + .02 * w) / 1.02; y = l; }
        else if (kind === 'p') { b0 = .99886 * b0 + w * .0555179; b1 = .99332 * b1 + w * .0750759; b2 = .969 * b2 + w * .153852; b3 = .8665 * b3 + w * .3104856; b4 = .55 * b4 + w * .5329522; b5 = -.7616 * b5 - w * .016898; y = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362; b6 = w * .115926; }
        else y = w;
        tmp[i] = y; ss += y * y; }
      const k = (kind === 'w' ? .577 : kind === 'b' ? .2 : .3) / Math.sqrt(ss / (n + x));
      for (let i = x; i < n; i++) d[i] = tmp[i] * k;
      for (let i = 0; i < x; i++) { const u = i / x; d[i] = (tmp[i] * Math.sqrt(u) + tmp[n + i] * Math.sqrt(1 - u)) * k; }
    }
    return b;
  }
  const mono = k => bufs[k] || (bufs[k] = noiseBuf(k, 1, 2));
  const wide = k => bufs[k + '2'] || (bufs[k + '2'] = noiseBuf(k, 2, 4.5));

  /* ---- voices: every one is enveloped from and back to silence, and cleans itself up when it ends ---- */
  function env(g, t, a, peak, d){ g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); }
  function vout(head, t, a, v, d, to, pan, wet){
    const g = ac.createGain(); env(g, t, a, v, d); head.connect(g); let o = g;
    if (pan && ac.createStereoPanner) { o = ac.createStereoPanner(); o.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(o); }
    o.connect(to); if (wet) o.connect(wet);
    return () => { try { o.disconnect(); if (o !== g) g.disconnect(); } catch(e) {} };
  }
  function tone(fr, {type = 'sine', a = .01, d = .3, v = .3, t = now(), to = sfxTo, wet = null, slide = null, filt = null, det = 0, pan = 0, vib = 0, am = null} = {}){
    const o = ac.createOscillator(), end = t + a + d + .05, extra = []; o.type = type; o.frequency.setValueAtTime(fr, t); if (det) o.detune.value = det;
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t + a + d);
    let head = o;
    if (filt) { const fl = F(filt.type || 'lowpass', filt.f, filt.q || .7); if (filt.pk) { fl.frequency.setValueAtTime(filt.f, t); fl.frequency.exponentialRampToValueAtTime(filt.pk, t + a + .001); fl.frequency.exponentialRampToValueAtTime(filt.e || filt.f, t + a + d); } head.connect(fl); head = fl; extra.push(fl); }
    if (vib) { const l = ac.createOscillator(), lg = gn(0); l.frequency.value = rnd(4.6, 5.6); lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(vib, t + a + d * .5); l.connect(lg); lg.connect(o.detune); l.start(t); l.stop(end); extra.push(l, lg); }
    if (am) { const l = ac.createOscillator(), lg = gn(am[1]), mg = gn(1 - am[1]); l.frequency.value = am[0]; l.connect(lg); lg.connect(mg.gain); head.connect(mg); head = mg; l.start(t); l.stop(end); extra.push(l, lg, mg); }
    const off = vout(head, t, a, v, d, to, pan, wet);
    o.start(t); o.stop(end); o.onended = () => { off(); extra.forEach(n => { try { n.disconnect(); } catch(e) {} }); try { o.disconnect(); } catch(e) {} };
    return o;
  }
  function noise({a = .005, d = .2, v = .4, t = now(), f: fr = 1200, q = 1, type = 'bandpass', slide = null, to = sfxTo, wet = null, buf = 'w', pan = 0} = {}){
    const s = ac.createBufferSource(), b = mono(buf), fl = F(type, fr, q), end = t + a + d + .05; s.buffer = b; s.loop = true;
    fl.frequency.setValueAtTime(fr, t); if (slide) fl.frequency.exponentialRampToValueAtTime(Math.max(30, slide), t + a + d);
    s.connect(fl); const off = vout(fl, t, a, v, d, to, pan, wet);
    s.start(t, Math.random() * (b.duration - .5)); s.stop(end); s.onended = () => { off(); try { s.disconnect(); fl.disconnect(); } catch(e) {} };
  }
  /* a sung note: detuned saws through two formants (an open 'ah') and a dull body, with a slow vibrato */
  function sung(fr, {t = now(), a = .35, d = 1.5, v = .1, to = sfxTo, wet = null, pan = 0} = {}){
    const g = ac.createGain(); env(g, t, a, v, d); let o = g; if (pan && ac.createStereoPanner) { o = ac.createStereoPanner(); o.pan.value = pan; g.connect(o); } o.connect(to); if (wet) o.connect(wet);
    const f1 = F('bandpass', 720, 5, g), f2 = F('bandpass', 1180, 6, g), f3 = F('lowpass', 900, .5, g), end = t + a + d + .1, ns = [f1, f2, f3, g, o]; let n = 0;
    [-1, 1].forEach(s => { const x = ac.createOscillator(), l = ac.createOscillator(), lg = gn(9); x.type = 'sawtooth'; x.frequency.value = fr; x.detune.value = s * rnd(5, 9);
      l.frequency.value = rnd(4.4, 5.4); l.connect(lg); lg.connect(x.detune); x.connect(f1); x.connect(f2); x.connect(f3); x.start(t); l.start(t); x.stop(end); l.stop(end); n++; ns.push(x, l, lg);
      x.onended = () => { if (--n === 0) ns.forEach(k => { try { k.disconnect(); } catch(e) {} }); }; });
  }

  /* ---- sound effects ---- */
  const SFX = {
    click(){ const t = now(); tone(rnd(860, 940), {t, type:'square', a:.002, d:.04, v:.05, filt:{f:1800}}); noise({t, d:.012, v:.06, f:2600, q:1.5}); },
    open(){ const t = now(); noise({t, a:.02, d:.2, v:.13, f:1600, slide:900, q:1.2, buf:'p'}); tone(f(0, 2), {t:t + .03, type:'triangle', a:.01, d:.25, v:.035, wet:sfxWet}); }, // a page turned, a flap lifted
    close(){ const t = now(); noise({t, a:.08, d:.1, v:.12, f:900, slide:500, q:1.2, buf:'p'}); tone(f(-3, 2), {t, type:'triangle', a:.02, d:.18, v:.025}); },
    save(){ const t = now(); for (let i = 0; i < 5; i++) noise({t:t + i * rnd(.07, .11), d:rnd(.03, .05), v:rnd(.08, .14), f:rnd(1900, 2600), q:3, pan:rnd(-.2, .2)}); tone(f(4, 2), {t:t + .5, type:'triangle', a:.01, d:.3, v:.03}); }, // a quill, and a dot at the end
    pick(){ const t = now(); [[0, 0], [4, .07]].forEach(([d, dt]) => tone(f(d, 2), {t:t + dt, type:'triangle', a:.005, d:.35, v:.08, wet:sfxWet})); noise({t, d:.03, v:.15, f:2800, q:2}); },
    step(){ const t = now(), p = rnd(-.15, .15); noise({t, a:.004, d:rnd(.05, .08), v:rnd(.2, .26), f:rnd(550, 800), q:.8, type:'lowpass', pan:p}); noise({t, a:.002, d:.025, v:.035, f:rnd(1400, 1900), q:1.2, pan:p}); },
    sword(){ const t = now(), p = rnd(-.2, .2), m = rnd(.92, 1.08);
      noise({t, a:.002, d:.07, v:.42, f:2100 * m, q:.9, pan:p});
      [[1, .07, .45], [2.63, .04, .3], [4.1, .02, .18]].forEach(([r, v, d]) => tone(980 * m * r, {t, a:.002, d, v, pan:p, wet:sfxWet}));
      tone(150, {t, d:.14, v:.35, slide:60}); noise({t, a:.002, d:.1, v:.35, f:450, q:.8, type:'lowpass', pan:p}); },
    blunt(){ const t = now(), p = rnd(-.2, .2); noise({t, a:.002, d:.1, v:.65, f:520, q:.7, type:'lowpass', buf:'b', pan:p}); tone(rnd(100, 120), {t, d:.2, v:.45, slide:48, pan:p}); noise({t, a:.001, d:.02, v:.2, f:1500, q:1, pan:p}); tone(260, {t, type:'triangle', d:.06, v:.12, slide:120, pan:p}); }, // a mace, a cudgel, a fist like a mallet
    spear(){ const t = now(), p = rnd(-.2, .2), m = rnd(.95, 1.05); noise({t, a:.002, d:.05, v:.32, f:2700 * m, q:1.2, pan:p}); tone(1500 * m, {t, type:'triangle', a:.002, d:.07, v:.09, slide:650, pan:p}); noise({t:t + .025, a:.002, d:.1, v:.36, f:420, q:.8, type:'lowpass', pan:p}); tone(140, {t:t + .025, d:.12, v:.28, slide:60}); }, // a point going in
    claw(){ const t = now(), p = rnd(-.25, .25); for (let i = 0; i < 3; i++) noise({t:t + i * .045, a:.002, d:.07, v:.3, f:rnd(1700, 2100), slide:800, q:1.4, pan:p + i * .08}); tone(rnd(150, 175), {t, type:'sawtooth', a:.01, d:.16, v:.1, slide:90, filt:{f:520}, pan:p}); noise({t:t + .05, a:.003, d:.09, v:.3, f:480, type:'lowpass', pan:p}); }, // something with claws or teeth
    sling(){ const t = now(), p = rnd(-.3, .3); noise({t, a:.08, d:.1, v:.14, f:800, slide:1600, q:2, pan:-p}); noise({t:t + .16, a:.002, d:.09, v:.42, f:450, q:.8, type:'lowpass', pan:p}); tone(190, {t:t + .16, d:.1, v:.3, slide:80, pan:p}); },
    miss(){ const t = now(), p = rnd(-.4, .4); noise({t, a:.07, d:.08, v:.42, f:450, slide:1500, q:1.6, pan:p}); noise({t:t + .1, a:.01, d:.16, v:.3, f:1500, slide:500, q:1.6, pan:-p}); },
    bow(){ const t = now(); noise({t, d:.04, v:.4, f:1100, type:'lowpass'}); tone(220, {t, type:'triangle', d:.2, v:.2, slide:110}); tone(440, {t, type:'triangle', d:.1, v:.07, slide:230}); noise({t:t + .02, a:.03, d:.22, v:.13, f:2400, slide:800, q:2.5}); },
    hurt(){ const t = now(), p = rnd(-.2, .2); noise({t, a:.002, d:.09, v:.6, f:650, q:.6, pan:p}); tone(rnd(170, 200), {t, type:'sawtooth', a:.005, d:.16, v:.2, slide:85, filt:{f:1200}, pan:p}); tone(95, {t, d:.16, v:.3, slide:45}); },
    death(){ const t = now(); tone(210, {t, type:'sawtooth', a:.02, d:.8, v:.13, slide:70, filt:{f:700, q:2}}); tone(110, {t, d:.7, v:.22, slide:38}); noise({t, a:.05, d:.6, v:.14, f:500, slide:120, type:'lowpass', buf:'b'}); noise({t:t + .28, a:.004, d:.22, v:.4, f:650, type:'lowpass'}); },
    boom(big = 1){ const t = now(); noise({t, a:.004, d:.8 * big, v:.9, f:2600, slide:70, type:'lowpass', buf:'b', wet:sfxWet}); tone(70, {t, d:.8 * big, v:.45, slide:28}); noise({t, a:.002, d:.16, v:.4, f:1400, q:.7}); noise({t:t + .04, d:.5 * big, v:.16, f:3200, slide:1100, q:.7, wet:sfxWet}); },
    /* the Moranth munitions, each its own (v6.8.0): a sharper is a crack and a spray of iron; a cusser is the ground thinking about it; a smoker is a pop and a long hiss */
    sharper(){ const t = now(); noise({t, a:.001, d:.14, v:.95, f:3400, slide:300, type:'lowpass', wet:sfxWet}); tone(95, {t, d:.32, v:.4, slide:38}); noise({t, a:.001, d:.05, v:.5, f:1800, q:.6});
      for (let i = 0; i < 6; i++) noise({t:t + rnd(.03, .25), a:.004, d:rnd(.05, .1), v:rnd(.06, .14), f:rnd(3000, 5500), slide:rnd(900, 1500), q:3, pan:P()}); },
    cusser(){ const t = now(); noise({t, a:.004, d:1.5, v:1, f:2400, slide:50, type:'lowpass', buf:'b', wet:sfxWet}); tone(48, {t, d:1.4, v:.55, slide:22}); tone(72, {t, type:'triangle', d:.5, v:.3, slide:30}); noise({t, a:.002, d:.2, v:.5, f:1300, q:.7});
      noise({t:t + .05, d:.9, v:.2, f:3000, slide:900, q:.7, wet:sfxWet}); tone(2900, {t:t + .1, a:.05, d:1.6, v:.03, slide:2500}); // the ring in the ears afterwards
      for (let i = 0; i < 9; i++) noise({t:t + rnd(.3, 1.3), d:rnd(.015, .03), v:rnd(.05, .14), f:rnd(900, 2200), q:2.5, pan:P(), wet:sfxWet}); },
    smoker(){ const t = now(); noise({t, a:.002, d:.04, v:.35, f:1100, q:1}); noise({t:t + .03, a:.08, d:1.7, v:.33, f:600, slide:1500, q:.8, type:'bandpass', buf:'p', wet:sfxWet}); noise({t:t + .1, a:.3, d:1.2, v:.12, f:300, type:'lowpass', buf:'b'}); },
    burner(){ const t = now(); noise({t, a:.05, d:.9, v:.55, f:900, slide:300, q:.8, type:'lowpass', buf:'b'}); noise({t, a:.08, d:1.1, v:.14, f:2000, q:1.2}); for (let i = 0; i < 7; i++) noise({t:t + rnd(.1, 1), d:.012, v:rnd(.08, .16), f:rnd(1400, 2800), q:2, pan:P()}); },
    /* the warrens (v6.8.0): Thyr's fire, Omtose Phellack's ice, Hood's grey, Serc's air. Meanas stays 'shadow', Denul 'heal', the old 'magic' is Mockra's shimmer */
    magic(){ const t = now(); [0, 2, 4, 7].forEach((d, i) => tone(f(d + 7, 2), {t:t + i * .06, a:.02, d:.5, v:.12, wet:sfxWet, pan:(i - 1.5) * .25})); noise({t, a:.1, d:.6, v:.07, f:3600, q:4, wet:sfxWet}); },
    shadow(){ const t = now(); tone(440, {t, type:'sawtooth', a:.05, d:.6, v:.12, slide:110, filt:{f:900, q:3}, wet:sfxWet}); noise({t, a:.08, d:.7, v:.15, f:1200, slide:200, q:2, wet:sfxWet}); },
    fire(){ const t = now(); noise({t, a:.08, d:.55, v:.45, f:700, slide:2600, q:1.2, buf:'p', wet:sfxWet}); noise({t:t + .05, a:.1, d:.7, v:.2, f:300, type:'lowpass', buf:'b'}); for (let i = 0; i < 6; i++) noise({t:t + rnd(.15, .8), d:rnd(.006, .02), v:rnd(.06, .14), f:rnd(1500, 3200), q:2, pan:P()}); },
    ice(){ const t = now(); noise({t, a:.001, d:.04, v:.5, f:4200, q:1.5}); tone(3100, {t, a:.002, d:.7, v:.04, slide:2300, wet:sfxWet}); [0, 4, 7].forEach((d, i) => tone(f(d, 4), {t:t + .05 + i * .07, a:.02, d:1.3, v:.03, det:rnd(-8, 8), wet:sfxWet, pan:(i - 1) * .4})); noise({t:t + .02, a:.05, d:.5, v:.12, f:1800, slide:600, q:3, wet:sfxWet}); },
    grey(){ const t = now(); tone(f(0, 1), {t, type:'sawtooth', a:.06, d:.8, v:.1, filt:{f:380, pk:900, e:300, q:2}, vib:6, wet:sfxWet}); noise({t, a:.2, d:.9, v:.26, f:280, type:'lowpass', buf:'b', wet:sfxWet}); tone(2300, {t:t + .05, a:.12, d:.6, v:.022, slide:1600, wet:sfxWet}); noise({t:t + .3, a:.1, d:.5, v:.06, f:1500, q:5, wet:sfxWet}); }, // Hood's warren: hollow, and something high and wrong in it
    air(){ const t = now(); noise({t, a:.12, d:.7, v:.34, f:1500, slide:450, q:1.1, pan:-.6}); noise({t:t + .08, a:.12, d:.7, v:.3, f:1300, slide:400, q:1.1, pan:.6}); tone(900, {t, type:'triangle', a:.1, d:.5, v:.03, slide:300}); },
    heal(){ const t = now(); [0, 4, 7, 11].forEach((d, i) => tone(f(d, 3), {t:t + i * .09, type:'triangle', a:.02, d:.7, v:.09, wet:sfxWet})); },
    shuffle(){ const t = now(); for (let i = 0; i < 6; i++) noise({t:t + i * .07 + rnd(0, .02), d:.05, v:.28, f:rnd(1600, 2300), q:2, pan:rnd(-.3, .3)}); },
    flip(){ const t = now(); noise({t, d:.09, v:.4, f:1700, q:1.5}); tone(f(0, 3), {t:t + .05, a:.02, d:.35, v:.08, wet:sfxWet}); },
    reveal(){ const t = now(); [1, 2, 3.01, 4.7].forEach((h, i) => tone(f(0, 1) * h, {t, a:.02, d:2.6 - i * .4, v:.22 / (i + 1), wet:sfxWet})); noise({t, a:.3, d:1.6, v:.07, f:2400, q:3, wet:sfxWet}); },
    /* the Houses (v6.8.0): a figure for each when the turned card is read */
    house(h = ''){ const t = now() + .4, H = String(h);
      if (/Dark/.test(H)) { [0, 3].forEach(d => tone(f(d, 0), {t, type:'sawtooth', a:.5, d:2.6, v:.07, filt:{f:260, pk:520, e:220}, to:busMus, wet:musSend})); }
      else if (/Shadow/.test(H)) { [0, .35, .7].forEach((dt, i) => tone(f(1, 3) * (i === 1 ? 1.03 : 1), {t:t + dt, a:.03, d:1.2, v:.05, det:rnd(-15, 15), to:busMus, wet:musSend, pan:P() * .6})); noise({t, a:.3, d:1.5, v:.05, f:1400, q:6, to:busMus, wet:musSend}); }
      else if (/Death/.test(H)) { toll(t, f(0, 1), .11, busMus); toll(t + 1.6, f(0, 0), .08, busMus); }
      else if (/Life/.test(H)) { [0, 2, 4, 7].forEach((d, i) => tone(f(d, 2), {t:t + i * .18, type:'triangle', a:.05, d:1.4, v:.07, vib:6, to:busMus, wet:musSend})); }
      else if (/Light/.test(H)) { [7, 11, 14].forEach((d, i) => tone(f(d, 2), {t:t + i * .1, a:.02, d:1.8, v:.05, to:busMus, wet:musSend})); }
      else if (/Chains/.test(H)) { for (let i = 0; i < 4; i++) { const u = t + i * rnd(.14, .2), b = rnd(1500, 2100); [[1, .05, .3], [2.4, .02, .15]].forEach(([r, v, d]) => tone(b * r, {t:u, a:.002, d, v, to:busMus, wet:musSend, pan:P() * .5})); } noise({t, a:.05, d:.5, v:.3, f:200, type:'lowpass', buf:'b', to:busMus}); tone(f(0, 0), {t, type:'sawtooth', a:.1, d:1.6, v:.05, filt:{f:300}, to:busMus, wet:musSend}); }
      else if (/Unaligned/.test(H)) { [[2100, 0], [2650, .11]].forEach(([fr, dt]) => tone(fr * rnd(.98, 1.02), {t:t + dt, a:.002, d:.3, v:.06, to:busMus, wet:musSend})); tone(f(4, 2), {t:t + .3, type:'triangle', a:.05, d:1.1, v:.05, to:busMus, wet:musSend}); }
      else if (/Hold|Fulcra/.test(H)) { [0, .16, .3].forEach((dt, i) => { noise({t:t + dt, a:.002, d:.06, v:.22 - i * .05, f:1800 - i * 300, q:3, to:busMus, wet:musSend}); tone(f(i ? 4 : 0, 1), {t:t + dt, type:'triangle', a:.003, d:.5, v:.05, to:busMus, wet:musSend}); }); tone(f(0, 0), {t:t + .4, type:'sawtooth', a:.2, d:2, v:.04, filt:{f:320}, to:busMus, wet:musSend}); } // v8.0 a tile of the Holds laid on stone: three knocks and a low note
      else noise({t, a:.4, d:1, v:.03, f:1000, q:2, to:busMus, wet:musSend}); }, // the unpainted card: gesso and grain
    slam(){ const t = now(); tone(60, {t, d:1.1, v:.6, slide:24}); tone(130, {t, type:'triangle', d:.35, v:.25, slide:55}); noise({t, a:.003, d:.9, v:.7, f:1600, slide:70, type:'lowpass', buf:'b', wet:sfxWet}); noise({t, a:.002, d:.12, v:.35, f:900, q:.8});
      for (let i = 0; i < 6; i++) noise({t:t + rnd(.08, .7), d:.03, v:rnd(.05, .12), f:rnd(900, 2200), q:2, pan:P()}); },
    up(){ const t = now(); [0, 3, 7, 10, 14].forEach((d, i) => tone(f(d, 2), {t:t + i * .1, type:'triangle', a:.02, d:.8, v:.13, wet:sfxWet})); },
    trick(){ const t = now(); [0, 4, 7, 14].forEach((d, i) => tone(f(d, 2), {t:t + i * .07, a:.01, d:.9, v:.09, wet:sfxWet, pan:(i - 1.5) * .3})); noise({t, a:.05, d:.5, v:.05, f:3000, q:4, wet:sfxWet}); },
    coin(){ const t = now(), m = rnd(.95, 1.05); [[2100, .1, .22], [3350, .05, .16], [5200, .018, .08]].forEach(([fr, v, d]) => tone(fr * m, {t, a:.002, d, v})); [[2350, .06, .18], [3700, .03, .12]].forEach(([fr, v, d]) => tone(fr * m, {t:t + .07, a:.002, d, v})); },
    win(){ const t = now(); [[0, 0], [3, .2], [7, .4], [5, .7], [7, 1]].forEach(([d, dt]) => tone(f(d, 1), {t:t + dt, type:'triangle', a:.03, d:1.1, v:.18, to:busMus, wet:musSend})); },
    lose(){ const t = now(); [0, 1, 5].forEach(d => { tone(f(d, 0), {t, type:'sawtooth', a:.4, d:3, v:.11, filt:{f:500}, to:busMus, wet:musSend}); tone(f(d, 1), {t, type:'sawtooth', a:.5, d:2.6, v:.04, filt:{f:900}, to:busMus, wet:musSend}); }); },
    /* stingers (v6.8.0), in the book's voice: a chapter opening; a key choice made */
    chapter(){ const t = now() + .05, L = sting(7);
      DRUM[V.drum].K(L, t, 1); pad(L, t, [0, 4], 5, V.key === 'moi' ? .07 : .06, 600); const m = pick(MOT);
      m.forEach((d, i) => melodyAs(V.inst.title[0], L, t + .5 + i * .45, d, .9)); if (V.bellK) toll(t + 2.4, f(0, 1), .06 * V.bellK, L.far); },
    choice(){ const t = now(), L = sting(5);
      [0, 1].forEach((d, i) => tone(f(d, 0), {t, type:'sawtooth', a:.5, d:2.6, v:.055, filt:{f:300, pk:520, e:240}, to:L.near, pan:(i - .5) * .4})); if (V.key === 'moi') sung(f(0, 1), {t:t + .2, a:.6, d:2.2, v:.045, to:L.near}); toll(t + .9, f(-3, 1), .045, L.far); },
    dice(ok){ const t = now(); noise({t, d:.06, v:.3, f:2300, q:2}); noise({t:t + .08, d:.06, v:.25, f:2000, q:2}); tone(ok ? f(7, 2) : f(1, 1), {t:t + .2, type:'triangle', a:.02, d:.5, v:.12}); },
    growl(){ const t = now(); tone(78, {t, type:'sawtooth', a:.18, d:1.3, v:.3, slide:52, filt:{f:300, pk:750, e:260, q:3}, am:[27, .45]}); tone(156, {t, type:'sawtooth', a:.2, d:1.1, v:.07, slide:104, filt:{f:600, q:4}, am:[31, .4]}); noise({t, a:.12, d:1.2, v:.2, f:380, q:1.2, buf:'b', wet:sfxWet}); },
    /* Hackle, the Weasel Clan's cattle-dog (Book Two): a bark is a pitched burst through a mouth-shaped band, falling; n of them, quick */
    bark(n = 2){ const t0 = now(), p = rnd(-.25, .25), m = rnd(.92, 1.08);
      for (let i = 0; i < n; i++) { const t = t0 + i * rnd(.17, .23), k = i ? rnd(.94, 1) : 1;
        tone(rnd(360, 400) * m * k, {t, type:'sawtooth', a:.006, d:.12, v:.24, slide:200 * m, filt:{type:'bandpass', f:800, pk:1500, e:650, q:2.2}, pan:p, wet:sfxWet});
        tone(rnd(180, 200) * m * k, {t, type:'square', a:.005, d:.09, v:.09, slide:120, filt:{f:650}, pan:p});
        noise({t, a:.003, d:.08, v:.2, f:1250 * m, q:1.3, pan:p}); } },
    yelp(){ const t = now(), p = rnd(-.25, .25); tone(rnd(950, 1080), {t, type:'sawtooth', a:.004, d:.17, v:.13, slide:500, filt:{type:'bandpass', f:1400, q:2}, pan:p}); noise({t, a:.002, d:.07, v:.1, f:2200, q:2, pan:p}); },
    whine(){ const t = now(); tone(700, {t, type:'triangle', a:.08, d:.5, v:.09, slide:900, vib:28, filt:{f:1900}}); tone(900, {t:t + .5, type:'triangle', a:.04, d:.7, v:.08, slide:520, vib:34, filt:{f:1700}}); tone(1800, {t, type:'sine', a:.1, d:.9, v:.02, slide:1100}); },
    snarl(){ const t = now(); tone(118, {t, type:'sawtooth', a:.12, d:.9, v:.2, slide:96, filt:{f:480, pk:950, e:420, q:4}, am:[36, .55]}); tone(236, {t, type:'sawtooth', a:.14, d:.7, v:.05, slide:190, filt:{f:900, q:5}, am:[41, .5]}); noise({t, a:.08, d:.8, v:.13, f:720, q:1.5, wet:sfxWet}); },
    /* Book Two's games: water running from one skin to another; and the four voices under the ground (a pentatonic, low and old) */
    pour(){ const t = now(); noise({t, a:.08, d:.45, v:.16, f:900, slide:1500, q:3, type:'bandpass', buf:'p'}); for (let i = 0; i < 6; i++) tone(rnd(700, 1300), {t:t + rnd(.05, .45), type:'sine', a:.005, d:.06, v:.03, slide:rnd(400, 600)}); },
    stone(k = 0){ const t = now(), fr = [196, 233.1, 293.7, 349.2][k % 4]; tone(fr, {t, type:'triangle', a:.02, d:.9, v:.16, wet:sfxWet}); tone(fr * 2, {t, type:'sine', a:.03, d:.6, v:.04, wet:sfxWet}); tone(fr / 2, {t, type:'sine', a:.05, d:1.1, v:.08}); },
    /* the Land's Teeth (Book Two, Keth): the ground growling up under someone, and then its jaws: stone on stone, and a crack of bone */
    rumble(){ const t = now(); noise({t, a:.22, d:.5, v:.55, f:170, slide:340, type:'lowpass', buf:'b', wet:sfxWet}); tone(46, {t, type:'sawtooth', a:.18, d:.6, v:.2, slide:36, filt:{f:230}, am:[17, .5]});
      for (let i = 0; i < 7; i++) noise({t:t + rnd(.05, .5), d:.02, v:rnd(.05, .12), f:rnd(700, 1600), q:2, pan:P()}); },
    chomp(){ const t = now(); noise({t, a:.002, d:.22, v:.75, f:1100, slide:180, type:'lowpass', buf:'b', wet:sfxWet}); tone(88, {t, d:.32, v:.45, slide:38}); tone(140, {t, type:'triangle', d:.12, v:.18, slide:70});
      for (let i = 0; i < 6; i++) noise({t:t + i*.016 + rnd(0, .01), d:.022, v:rnd(.18, .34), f:rnd(1700, 3300), q:2.5, pan:P()}); tone(rnd(1300, 1500), {t:t + .01, type:'triangle', a:.001, d:.05, v:.07}); },
    howl(){ const t = now(); tone(390, {t, type:'triangle', a:.35, d:.9, v:.11, slide:640, vib:22, filt:{f:2000}, wet:sfxWet}); tone(640, {t:t + 1.1, type:'triangle', a:.06, d:1.5, v:.1, slide:330, vib:30, filt:{f:1800}, wet:sfxWet}); tone(1280, {t:t + .4, type:'sine', a:.4, d:1.6, v:.025, slide:700, wet:sfxWet}); },
  };
  function play(k, ...a){
    const fn = SFX[k];
    if (!fn) return warn(k, 'no sound named "' + k + '"');
    if (!ac) return;
    const stinger = k === 'win' || k === 'lose';
    if (stinger) settle();
    const musical = stinger || k === 'house' || k === 'chapter' || k === 'choice';
    if (!live() || muted() || !(vol(musical ? 'music' : 'sfx') > 0)) return;
    const t = now(), p = recent[k], r = recent[k] = p && t - p.t < .06 ? {t:p.t, n:p.n + 1} : {t, n:0};
    if (r.n > 2) return; // a burst of the same sound in one instant (a blast hitting five foes) is heard once, not five times louder
    const was = sfxTo; if (r.n) sfxTo = gn(r.n === 1 ? .5 : .3, busSfx);
    try { fn(...a); } catch(e) {}
    if (r.n) { const g = sfxTo; setTimeout(() => { try { g.disconnect(); } catch(e) {} }, 5000); }
    sfxTo = was;
  }
  /* which sound a landed blow makes, from the attacker's verb: 'brings the long mace down on' is blunt, 'drives a spear at' a point, 'claws at' teeth */
  function blow(verb = '', ranged = false){
    const v = String(verb);
    if (/hand of ice|cold hand/.test(v)) return 'ice';
    if (/fire at|burning/.test(v)) return 'fire';
    if (/grey|sorcer|ground up/.test(v)) return 'grey';
    if (/sling/.test(v)) return 'sling';
    if (/loose|shoot|bolt|quarrel|arrow|bow|javelin/.test(v)) return 'bow';
    if (/mace|cudgel|mallet|hammer|fist|mattock|pick |club|pot at/.test(v)) return 'blunt';
    if (/claw|tear|bite|reaches|drops on|unfolds|grinds|takes apart|closes a/.test(v)) return 'claw';
    if (/spear|lance|pike|halberd|thrust|stab|knife|knifes|flint|sickle/.test(v)) return 'spear';
    return ranged ? 'bow' : 'sword';
  }

  /* ---- layers: a music cue or an ambience, with a near input (dry, a little reverb) and a far one (dull, mostly reverb) ---- */
  function layer(bus, wet, key, wn){
    const L = {key, keep:new Set(), dry:gn(0, bus), wet:gn(0, wet)};
    L.near = gn(1, L.dry); L.near.connect(gn(wn, L.wet));
    L.far = F('lowpass', 2400, .5); L.far.connect(gn(.35, L.dry)); L.far.connect(L.wet);
    return L;
  }
  function glide(p, v, s){ // ramp from wherever it is now. Chrome drops a sample to zero if a running ramp is plainly cancelled, and restarts from a finished ramp's end on cancelAndHold, so hold only a ramp that is still running
    const t = now(); s = Math.max(.02, s); if (p._e > t && p.cancelAndHoldAtTime) p.cancelAndHoldAtTime(t); else { p.cancelScheduledValues(t); p.setValueAtTime(p.value, t); } p.linearRampToValueAtTime(v, t + s); p._e = t + s; }
  function fadeTo(L, v, s){ glide(L.dry.gain, v, s); glide(L.wet.gain, v, s); }
  function retire(L, s){
    if (!L) return; L.step = null; fadeTo(L, 0, s); L.end = now() + s + .05; fading.push(L);
    const slow = fading.filter(x => !x.quick); if (slow.length > 3) { const o = slow[0]; o.quick = true; fadeTo(o, 0, .05); o.end = now() + .07; } // rapid scene changes: cut the oldest short, but never with a click
  }
  function kill(L){ const t = now(); L.keep.forEach(n => { try { n.stop(t); } catch(e) {} }); L.keep.clear(); [L.dry, L.wet, L.near, L.far].forEach(n => { try { n.disconnect(); } catch(e) {} }); }
  function reap(t){ fading = fading.filter(L => { if (t < L.end) return true; kill(L); return false; }); }
  function settle(){ if (mus && (mus.key === 'battle' || mus.key === 'dark')) { retire(mus, 2.5); mus = null; hush = true; } } // a fight is over: let its music go
  function sting(life){ // a short-lived music layer for a stinger: up at once, gone after life seconds
    const L = layer(busMus, wetMus, 'sting', V.wet), t = now(); [L.dry.gain, L.wet.gain].forEach(p => { p.setValueAtTime(1, t); p.setValueAtTime(1, t + life - 1.5); p.linearRampToValueAtTime(0, t + life); p._e = t + life; }); L.end = t + life + .05; fading.push(L); return L; }

  /* ---- music: generative, in the book's voice ---- */
  const MOT = [[0,-1,0,2],[4,3,1,0],[7,5,4,3],[0,3,4,7],[2,1,0,-3],[4,7,8,7],[0,0,3,2],[7,8,10,7],[4,5,4,1],[0,1,0,-2],[3,2,1,0],[5,4,1,0]];
  const PL = [[[0,4],[0,3],[-2,2],[-1,3]], [[0,4],[1,5],[0,4],[-2,2]], [[-2,2],[-1,3],[0,4],[0,4]], [[0,4],[-1,3],[1,5],[0,4]]];
  const PE = [[[0,2,4],[-2,0,2],[-1,1,3],[0,2,4]], [[0,2,4],[1,3,5],[-2,0,2],[0,2,4]], [[-2,0,2],[-1,1,3],[0,2,4],[0,4]]];
  const PB = [[[0,4],[1,5],[0,3],[-2,1]], [[0,4],[0,4],[1,5],[-1,3]], [[0,4],[-2,2],[1,5],[0,4]]];
  const PD = [[[0,1],[0,4],[-3,1],[0,1]], [[0,4],[1,5],[-3,1],[-2,1]], [[0,1,4],[-3,1],[0,4],[1,5]]];
  function pad(L, t, degs, dur, v, cut){ // Book One: detuned saws, spread left and right, the filter opening and closing with the swell. Book Two: thinner, a triangle under the saw. Book Three: sung, through the choir's formants
    const kind = V.pad, g = gn(0, L.near), end = t + dur; let n = 0; const ns = [g];
    if (kind === 'sand') noise({t, a:dur * .45, d:dur * .5, v:v * .45, f:cut * 2.2, q:.5, type:'bandpass', to:L.near, buf:'p'}); // Book Four: the sand under the chord
    if (kind === 'tide') noise({t, a:dur * .55, d:dur * .45, v:v * .55, f:cut * .7, q:.4, type:'lowpass', to:L.near, buf:'p'}); // Book Five: the canal under the chord
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v * (kind === 'choir' ? 1.6 : 1), t + dur * .4); g.gain.linearRampToValueAtTime(0, end);
    let heads;
    if (kind === 'choir') { heads = [F('bandpass', 700, 4, g), F('bandpass', 1150, 5, g), F('lowpass', cut * .8, .5, g)]; }
    else { const fl = F('lowpass', cut * .5, .5, g); fl.frequency.setValueAtTime(cut * .5, t); fl.frequency.linearRampToValueAtTime(cut, t + dur * .45); fl.frequency.linearRampToValueAtTime(cut * .55, end); heads = [fl]; }
    ns.push(...heads);
    degs.forEach((d, i) => [-1, 1].forEach(s => { const o = ac.createOscillator(); o.type = (kind === 'thin' || kind === 'sand' || kind === 'tide') && s > 0 ? 'triangle' : 'sawtooth'; o.frequency.value = f(d); o.detune.value = s * rnd(kind === 'thin' || kind === 'sand' ? 7 : 4, kind === 'thin' || kind === 'sand' ? 13 : 8);
      let h = o; if (ac.createStereoPanner) { h = ac.createStereoPanner(); h.pan.value = s * (.25 + .15 * i); o.connect(h); } heads.forEach(x => h.connect(x));
      if (kind === 'choir') { const l = ac.createOscillator(), lg = gn(7); l.frequency.value = rnd(4.2, 5.2); l.connect(lg); lg.connect(o.detune); l.start(t); l.stop(end + .05); ns.push(l, lg); }
      o.start(t); o.stop(end + .05); n++; L.keep.add(o);
      o.onended = () => { L.keep.delete(o); try { o.disconnect(); if (h !== o) h.disconnect(); } catch(e) {} if (--n === 0) ns.forEach(x => { try { x.disconnect(); } catch(e) {} }); }; }));
  }
  function glass(L, t, fr, v){ tone(fr, {t, a:.03, d:2.8, v, to:L.far, pan:P() * .5}); tone(fr * 2.005, {t, a:.03, d:1.4, v:v * .3, to:L.far}); }
  function toll(t, fr, v, to){ [[.5, 1, 6], [1, .8, 4], [1.19, .45, 3], [1.5, .3, 2.4], [2, .35, 2], [2.52, .16, 1.3], [3.01, .1, .9]].forEach(([r, k, d]) => tone(fr * r, {t, a:.004, d, v:v * k, to, det:rnd(-4, 4)})); } // a bell with a minor third in it
  function reed(L, t, fr, dur, v){ tone(fr * .95, {t, type:'sawtooth', a:.015, d:.08, v:v * .6, slide:fr, filt:{type:'bandpass', f:900, q:2.5}, to:L.near}); tone(fr, {t:t + .06, type:'sawtooth', a:.05, d:dur, v, filt:{type:'bandpass', f:950, q:2.2}, vib:14, to:L.near}); tone(fr * 2.01, {t:t + .06, a:.08, d:dur * .8, v:v * .18, vib:10, to:L.near}); } // a grace note, then the note, nasal and bending
  function oud(L, t, fr, dur, v){ const p = rnd(-.2, .2); tone(fr, {t, type:'triangle', a:.003, d:dur, v, filt:{f:700, pk:2800, e:500, q:1}, det:rnd(-5, 5), to:L.near, pan:p}); tone(fr, {t:t + .004, type:'sawtooth', a:.003, d:dur * .5, v:v * .35, filt:{f:500, pk:1800, e:400}, det:8, to:L.near, pan:p}); noise({t, d:.02, v:v * .5, f:3000, q:1.5, to:L.near, pan:p}); if (chance(.3)) tone(fr / 2, {t:t + dur * .5, type:'triangle', a:.003, d:dur * .5, v:v * .5, filt:{f:600, pk:2000, e:450}, to:L.near, pan:p}); }
  function melodyAs(inst, L, t, d, bl){
    if (inst === 'cello') tone(f(d, 1), {t, type:'sawtooth', a:.35, d:bl * 2.6, v:.075, filt:{f:300, pk:1000, e:380, q:.8}, vib:9, to:L.near});
    else if (inst === 'glass') glass(L, t, f(d, 3), .04);
    else if (inst === 'reed') reed(L, t, f(d, 2), bl * 2.2, .07);
    else if (inst === 'oud') oud(L, t, f(d, 2), bl * 1.6, .13);
    else if (inst === 'choir') sung(f(d, 1), {t, a:.4, d:bl * 2.6, v:.07, to:L.near, pan:P() * .3});
    else if (inst === 'bell') toll(t, f(d, 1), .05, L.far);
    else { tone(f(d, 2), {t, type:'triangle', a:.08, d:bl * 2.2, v:.14, vib:7, to:L.near}); tone(f(d, 2), {t:t + .02, a:.1, d:bl * 2.2, v:.05, det:6, to:L.near}); }
  }
  const melody = (L, t, d, bl) => melodyAs(L.inst, L, t, d, bl);
  function section(L){ // what the next few bars do: play, thin out, or rest, so a long session breathes
    const S0 = L.st.secs.filter(s => !(s[0] === 'rest' && L.sec === 'rest')); let r = Math.random() * S0.reduce((a, s) => a + s[1], 0);
    const s = S0.find(s => (r -= s[1]) <= 0) || S0[0];
    L.sec = s[0]; L.left = s[2] - 1; L.prog = pick(L.st.prog); L.inst = pick(L.st.inst || ['flute']); L.motif = pick(MOT); L.mi = 0;
    if (L.st.pats) { L.pat = pick(L.st.pats); L.fill = pick(L.st.fills); }
  }
  function lyric(L, t, b){ // title, explore and the endings: a pad every two bars, a line that comes and goes, a bell far off
    const P0 = L.st, bl = L.len;
    if (b % 8 === 0) { if (!(L.left-- > 0)) section(L); const ch = L.ch = L.prog[(b >> 3) % L.prog.length];
      if (L.sec !== 'rest') pad(L, t, ch, bl * 8 + .5, P0.pv * (L.sec === 'thin' ? .75 : 1), P0.cut);
      else if (chance(.6)) pad(L, t, [ch[0]], bl * 8 + .5, P0.pv * .6, P0.cut * .7); }
    if (b % 2 === 0) { const d = L.motif[L.mi];
      if (L.sec === 'full' && chance(P0.dens)) melody(L, t, d, bl);
      else if (L.sec === 'thin' && b % 4 === 0 && chance(P0.dens * .5)) (V.key === 'dg' || V.key === 'hoc' ? oud(L, t, f(d, 3), bl, .05) : glass(L, t, f(d, 3), .03));
      if (++L.mi >= 4) { L.mi = 0; if (chance(.5)) L.motif = pick(MOT); } }
    if (V.bellK && b % P0.bellEvery === P0.bellAt && chance(P0.bell)) toll(t, f(pick(P0.bellDeg), 1), P0.bv * V.bellK, L.far);
    else if (!V.bellK && b % P0.bellEvery === P0.bellAt && chance(P0.bell * .6)) DRUM.frame.S(L, t, .5); // Book Two: a finger cymbal where Book One has a bell
  }
  function heart(L, t, v){ [[0, 1], [.24, .7]].forEach(([dt, k]) => { tone(66, {t:t + dt, a:.004, d:.2, v:.32 * v * k, slide:42, to:L.near}); noise({t:t + dt, a:.004, d:.07, v:.12 * v * k, f:300, type:'lowpass', to:L.near}); }); }
  function dread(L, t, b){ // dark talk: no drums, a slow heart, clusters, a high note that is slightly wrong
    const bl = L.len;
    if (b % 8 === 0) { if (!(L.left-- > 0)) section(L); const ch = L.ch = L.prog[(b >> 3) % L.prog.length], rest = L.sec === 'rest'; pad(L, t, rest ? [ch[0]] : ch, bl * 8 + .5, rest ? .045 : .06, rest ? 280 : 450); }
    if (L.sec === 'pulse' && b % 2 === 0) heart(L, t, b % 8 === 0 ? 1 : .75);
    if (L.sec !== 'rest' && b % 4 === 2 && chance(.3)) glass(L, t, f(pick([1, 4, 5, 8, 11]), 2) * (chance(.35) ? 1.03 : 1), .03);
    if (V.key === 'moi' && L.sec === 'still' && b % 8 === 4 && chance(.5)) sung(f(pick([0, 1, 5]), 0), {t, a:1.2, d:2.5, v:.035, to:L.far});
    if (b % 16 === 8 && chance(.3)) noise({t, a:bl * 3, d:.08, v:.07, f:220, slide:900, type:'lowpass', buf:'b', to:L.near}); // a swell that stops dead
  }
  /* the drums, by voice: Book One's kick and tom; Book Two's frame drum, dum and tak; Book Three's war drum and a rattle on the rim */
  const DRUM = {
    kit:{K(L, t, v){ tone(115, {t, a:.002, d:.32, v:.6 * v, slide:42, to:L.near}); noise({t, a:.002, d:.07, v:.3 * v, f:900, q:.7, type:'lowpass', to:L.near}); },
      S(L, t, v){ tone(195, {t, a:.002, d:.18, v:.3 * v, slide:118, to:L.near}); noise({t, a:.002, d:.06, v:.18 * v, f:1400, q:1, to:L.near}); }},
    frame:{K(L, t, v){ tone(92, {t, a:.002, d:.26, v:.55 * v, slide:58, to:L.near}); noise({t, a:.002, d:.05, v:.16 * v, f:500, q:.8, type:'lowpass', to:L.near}); },
      S(L, t, v){ noise({t, a:.001, d:.05, v:.3 * v, f:2600, q:1.4, to:L.near, pan:.15}); tone(620, {t, a:.001, d:.04, v:.12 * v, slide:300, to:L.near, pan:.15}); }},
    war:{K(L, t, v){ tone(56, {t, a:.003, d:.6, v:.58 * v, slide:30, to:L.near}); noise({t, a:.002, d:.25, v:.3 * v, f:320, q:.7, type:'lowpass', buf:'b', to:L.near}); noise({t, a:.001, d:.04, v:.12 * v, f:1200, q:1, to:L.near}); },
      S(L, t, v){ noise({t, a:.001, d:.12, v:.22 * v, f:1800, q:.8, to:L.near, pan:-.15}); tone(240, {t, a:.001, d:.1, v:.14 * v, slide:140, to:L.near, pan:-.15}); }},
  };
  function horn(L, t, fr, dur, v){ tone(fr, {t, type:'sawtooth', a:.07, d:dur, v, filt:{f:260, pk:1400, e:420, q:1.1}, vib:6, to:L.near}); tone(fr * 1.004, {t, type:'sawtooth', a:.09, d:dur, v:v * .6, filt:{f:240, pk:1100, e:380}, to:L.near, pan:.3}); }
  function lead(L, t, fr, dur, v){ if (V.lead === 'reed') reed(L, t, fr * 2, dur, v * 1.1); else if (V.lead === 'lowhorn') { horn(L, t, fr / 2, dur * 1.2, v * 1.2); if (chance(.3)) sung(fr, {t, a:.3, d:dur, v:v * .6, to:L.far}); } else horn(L, t, fr, dur, v); }
  function battle(L, t, s){ // eighth notes: drums, a low ostinato, a horn over it, and bars where it all drops out
    const P0 = L.st, st = s % 8, bar = s >> 3, e = L.len, D = DRUM[V.drum] || DRUM.kit;
    if (st === 0 && bar % 2 === 0) { if (!(L.left-- > 0)) section(L); L.ch = L.prog[(bar >> 1) % L.prog.length]; pad(L, t, L.ch, e * 16 + .4, P0.pv * (L.sec === 'break' ? 1.3 : 1), P0.cut); }
    const c = (L.sec === 'break' ? 'K.......' : bar % 4 === 3 ? L.fill : L.pat)[st];
    if (c === 'K' || c === 'k') D.K(L, t, c === 'K' ? 1 : .6); else if (c === 'S' || c === 's') D.S(L, t, c === 'S' ? 1 : .55);
    if (L.sec !== 'break') { const o = P0.ost[st]; if (o !== '.') tone(f(L.ch[0] + (o === 'b' ? 1 : 0), 1), {t, type:'sawtooth', a:.006, d:e * .85, v:o === 'X' ? .045 : .03, filt:{f:180, pk:o === 'X' ? 1200 : 800, e:220, q:1.4}, to:L.near}); }
    if (st % 4 === 0) { if (L.sec === 'full' && chance(P0.dens)) lead(L, t, f(L.motif[L.mi], 1), e * 3.6, P0.hv); if (++L.mi >= 4) { L.mi = 0; if (chance(.5)) L.motif = pick(MOT); } }
  }
  const STYLE = {
    title:{bpm:54, fn:lyric, lvl:2, wet:.45, prog:PL, pv:.06, cut:600, dens:.42, inst:['glass','flute'], bell:.7, bellEvery:8, bellAt:4, bellDeg:[0], bv:.07, secs:[['full',4,3],['thin',3,3],['rest',2,2]]},
    calm:{bpm:60, fn:lyric, lvl:2.4, wet:.4, prog:PL, pv:.065, cut:650, dens:.38, inst:['flute','cello','glass'], bell:.5, bellEvery:16, bellAt:12, bellDeg:[0,-3], bv:.05, secs:[['full',5,4],['thin',4,3],['rest',2,2]]},
    end:{bpm:50, fn:lyric, lvl:1.6, wet:.45, prog:PE, pv:.06, cut:700, dens:.55, inst:['flute','glass','cello'], bell:.6, bellEvery:16, bellAt:0, bellDeg:[0], bv:.06, secs:[['full',6,4],['thin',3,3],['rest',1,1]]},
    dread:{bpm:52, fn:dread, lvl:1.7, wet:.5, prog:PD, secs:[['pulse',4,3],['still',3,3],['rest',2,2]]},
    battle:{bpm:96, sub:2, fn:battle, lvl:1.5, wet:.28, prog:PB, pv:.055, cut:800, dens:.55, hv:.07, ost:'XxxXxxXx',
      pats:['K...K.S.','K..K..S.','K.K...S.','K...K.Ss'], fills:['K.S.KSSS','K.sSK.SS','KsS.KsSS'], secs:[['full',5,4],['drive',3,2],['break',1,1]]},
    dark:{bpm:84, sub:2, fn:battle, lvl:1.6, wet:.35, prog:PD, pv:.06, cut:600, dens:.4, hv:.065, ost:'X.x.Xbx.',
      pats:['K......k','K...K...','K..k..S.','K...k.s.'], fills:['K.k.K.SS','K..sK.SS'], secs:[['full',4,4],['drive',3,2],['break',2,1]]},
  };
  function style(key){ // the base style, in the current voice
    const b = STYLE[key], o = Object.assign({}, b); o.bpm = (V.bpm && V.bpm[key]) || b.bpm; if (V.inst && V.inst[key]) o.inst = V.inst[key];
    if (b.pats && V.pats) { o.pats = V.pats; o.fills = V.fills; o.ost = V.ost; } return o;
  }
  function startMusic(key, fin){
    const st = style(key), L = layer(busMus, wetMus, key, st.wet);
    Object.assign(L, {st, fn:st.fn, i:0, left:0, next:now() + .08, len:60 / st.bpm / (st.sub || 1), step:musicStep});
    fadeTo(L, st.lvl || 1, fin); return L;
  }
  function musicStep(L, t, look){ if (L.next < t - .3) L.next = t + .05; while (L.next < look) { if (vol('music') > 0) L.fn(L, L.next, L.i); L.next += L.len; L.i++; } }

  /* ---- ambience: stereo noise beds and drones, plus events at random intervals ---- */
  function bed(L, {buf = 'b', type = 'bandpass', f: fr = 400, q = .7, v = .3, drift = 0, rate = .07}){
    const s = ac.createBufferSource(), fl = F(type, fr, q), g = gn(v, L.near); s.buffer = wide(buf); s.loop = true; s.playbackRate.value = rnd(.94, 1.06);
    s.connect(fl); fl.connect(g); s.start(now(), Math.random() * 3); L.keep.add(s);
    if (drift) { const o = ac.createOscillator(); o.frequency.value = rate * rnd(.8, 1.25); o.connect(gn(drift, fl.frequency)); o.start(); L.keep.add(o); }
    return {g, fl, v, f:fr};
  }
  function drone(L, fr, v, cut, type = 'sine'){ const o = ac.createOscillator(); o.type = type; o.frequency.value = fr; let h = o; if (cut) { h = F('lowpass', cut, .7); o.connect(h); } h.connect(gn(v, L.near)); o.start(); L.keep.add(o); }
  const on = (L, spec) => Object.keys(spec).forEach(k => L.ev.push({fn:EV[k], m:spec[k]}));
  const EV = {
    gust(L, t){ const w = L.wind; if (!w) return; const hold = rnd(1.5, 4); w.g.gain.setTargetAtTime(w.v * rnd(1.4, 2.2), t, rnd(.6, 1.4)); w.g.gain.setTargetAtTime(w.v, t + hold, rnd(1, 2.2)); w.fl.frequency.setTargetAtTime(w.f * rnd(1.2, 1.7), t, 1); w.fl.frequency.setTargetAtTime(w.f, t + hold, 1.8); },
    ember(L, t){ noise({t, d:rnd(.02, .05), v:rnd(.03, .07), f:rnd(1500, 3000), q:3, to:L.near, pan:P()}); },
    drip(L, t){ tone(rnd(1300, 2500), {t, a:.002, d:.16, v:rnd(.05, .09), slide:rnd(500, 800), to:L.far, pan:P()}); },
    pebble(L, t){ const p = P(); for (let i = 0, n = 2 + R(3); i < n; i++) noise({t:t + i * rnd(.05, .14), d:.015, v:rnd(.03, .06), f:rnd(1600, 2800), q:4, to:L.far, pan:p}); },
    rumble(L, t){ noise({t, a:1.5, d:2.5, v:.3, f:140, q:.7, type:'lowpass', buf:'b', to:L.near}); },
    whisper(L, t){ tone(f(R(7), 3), {t, a:.6, d:1.4, v:.04, to:L.far, det:rnd(-15, 15), pan:P()}); if (chance(.5)) noise({t:t + .2, a:.25, d:.7, v:.04, f:rnd(1700, 2600), q:7, to:L.far, pan:P()}); },
    breath(L, t){ noise({t, a:1.6, d:1.8, v:.14, f:340, q:.8, type:'lowpass', buf:'b', to:L.near}); },
    crackle(L, t){ for (let i = 0, n = 2 + R(5); i < n; i++) noise({t:t + rnd(0, .6), d:rnd(.004, .018), v:rnd(.04, .1), f:rnd(1100, 2800), q:1.5, to:L.near, pan:rnd(-.3, .3)}); },
    clink(L, t){ const b = rnd(900, 1400), p = P(); [[1, .03, .25], [2.76, .014, .14], [4.2, .005, .07]].forEach(([r, v, d]) => tone(b * r, {t, a:.004, d, v, to:L.far, pan:p})); },
    hammer(L, t){ const b = rnd(800, 1100), p = P(), gap = rnd(.5, .6); for (let i = 0, n = 3 + R(3); i < n; i++) [[1, .035, .3], [2.76, .014, .15]].forEach(([r, v, d]) => tone(b * r, {t:t + i * gap, a:.002, d, v, to:L.far, pan:p})); },
    voices(L, t){ const p = P(); for (let i = 0, n = 2 + R(4); i < n; i++) noise({t:t + i * rnd(.14, .3), a:.04, d:rnd(.1, .28), v:rnd(.022, .045), f:rnd(350, 900), q:rnd(4, 7), to:L.near, pan:p}); },
    shout(L, t){ const p = P(); for (let i = 0, n = 1 + R(3); i < n; i++) noise({t:t + i * rnd(.3, .6), a:.02, d:rnd(.2, .4), v:rnd(.03, .05), f:rnd(500, 1000), q:5, to:L.far, pan:p}); }, // far off, over a wall
    cheer(L, t){ noise({t, a:.8, d:1.6, v:.06, f:rnd(600, 900), q:.9, to:L.near}); for (let i = 0; i < 6; i++) noise({t:t + rnd(0, 1.2), a:.05, d:rnd(.15, .35), v:rnd(.02, .04), f:rnd(500, 1100), q:5, to:L.near, pan:P()}); },
    pipes(L, t){ const base = R(3), p = P(); for (let i = 0, n = 3 + R(3); i < n; i++) tone(f(base + [0, 2, 4, 3, 1][i], 3), {t:t + i * .22, type:'triangle', a:.04, d:.3, v:.025, to:L.far, det:rnd(-7, 7), pan:p}); },
    fdrum(L, t){ const p = P(); for (let i = 0, n = 4 + R(4); i < n; i++) { const u = t + i * .42 + (i % 2 ? .07 : 0); tone(140, {t:u, d:.18, v:.09, slide:85, to:L.far, pan:p}); noise({t:u, d:.05, v:.05, f:700, type:'lowpass', to:L.far, pan:p}); } },
    wardrum(L, t){ const p = P(); for (let i = 0, n = 3 + R(3); i < n; i++) { const u = t + i * rnd(.7, .9); tone(60, {t:u, a:.003, d:.5, v:.1, slide:34, to:L.far, pan:p}); noise({t:u, a:.002, d:.15, v:.05, f:300, type:'lowpass', buf:'b', to:L.far, pan:p}); } }, // the besiegers' drums, a long way off
    warhorn(L, t){ const p = P(); tone(rnd(95, 115), {t, type:'sawtooth', a:.3, d:1.8, v:.03, filt:{f:300, pk:700, e:300, q:1.5}, vib:4, to:L.far, pan:p}); },
    lap(L, t){ noise({t, a:.08, d:rnd(.5, .9), v:rnd(.07, .12), f:rnd(700, 1000), slide:180, type:'lowpass', buf:'b', to:L.near, pan:P()}); },
    wave(L, t){ noise({t, a:rnd(1.2, 2), d:rnd(1.5, 2.5), v:rnd(.12, .2), f:rnd(900, 1400), slide:300, type:'lowpass', buf:'p', to:L.near, pan:P() * .6}); noise({t:t + 1.4, a:.1, d:1.2, v:.08, f:2200, q:.8, buf:'w', to:L.near}); },
    gull(L, t){ const p = P(); [0, .28].forEach(d => tone(rnd(1500, 1800), {t:t + d, type:'sawtooth', a:.02, d:.22, v:.018, slide:900, filt:{f:2200, q:2}, to:L.far, pan:p})); },
    creak(L, t){ tone(rnd(70, 110), {t, type:'sawtooth', a:.25, d:rnd(.5, .9), v:.03, slide:rnd(60, 90), filt:{type:'bandpass', f:rnd(500, 800), q:5}, vib:25, to:L.near, pan:P()}); },
    wagon(L, t){ const p = P(); tone(rnd(55, 80), {t, type:'sawtooth', a:.4, d:rnd(1, 1.6), v:.025, slide:rnd(50, 70), filt:{type:'bandpass', f:rnd(400, 650), q:4}, vib:18, to:L.far, pan:p}); noise({t, a:.5, d:1.5, v:.06, f:220, type:'lowpass', buf:'b', to:L.far, pan:p}); for (let i = 0; i < 3; i++) noise({t:t + rnd(.2, 1.4), d:.03, v:.03, f:rnd(900, 1500), q:2, to:L.far, pan:p}); },
    low(L, t){ const p = P(), fr = rnd(110, 150); tone(fr, {t, type:'sawtooth', a:.25, d:rnd(.8, 1.3), v:.028, slide:fr * .8, filt:{type:'bandpass', f:420, pk:700, e:380, q:2.5}, vib:12, to:L.far, pan:p}); }, // cattle, a long way down the column
    wail(L, t){ tone(rnd(480, 560), {t, type:'triangle', a:.5, d:1.6, v:.012, slide:rnd(300, 360), vib:20, filt:{f:1400}, to:L.far, pan:P()}); }, // somebody, far off. Never nearer than this
    cicada(L, t){ const fr = rnd(2800, 3600), p = P(); tone(fr, {t, a:.4, d:rnd(1.5, 3), v:.012, am:[rnd(38, 55), .8], filt:{type:'bandpass', f:fr, q:3}, to:L.far, pan:p}); },
    cricket(L, t){ const fr = rnd(3900, 4400), p = P(); for (let i = 0, n = 3 + R(3); i < n; i++) tone(fr, {t:t + i * .045, a:.004, d:.02, v:.008, to:L.far, pan:p}); },
    bird(L, t){ const p = P(), b = rnd(2300, 3200); for (let i = 0, n = 2 + R(4); i < n; i++) tone(b * rnd(.9, 1.15), {t:t + i * rnd(.09, .17), a:.006, d:rnd(.05, .1), v:.012, slide:b * rnd(.7, 1.4), to:L.far, pan:p}); },
    crow(L, t){ const p = P(); for (let i = 0, n = 1 + R(3); i < n; i++) tone(rnd(600, 720), {t:t + i * rnd(.35, .5), type:'sawtooth', a:.02, d:.2, v:.02, slide:rnd(400, 480), filt:{type:'bandpass', f:1100, q:2.5}, am:[rnd(28, 40), .5], to:L.far, pan:p}); },
    owl(L, t){ const p = P(); tone(380, {t, a:.05, d:.3, v:.025, slide:350, to:L.far, pan:p}); tone(370, {t:t + .55, a:.08, d:.55, v:.03, slide:330, to:L.far, pan:p}); },
    hawk(L, t){ tone(rnd(2200, 2600), {t, type:'triangle', a:.05, d:.8, v:.012, slide:rnd(1500, 1800), to:L.far, pan:P()}); },
    hooves(L, t){ const p = P(); for (let i = 0, n = 6 + R(6); i < n; i++) noise({t:t + i * .19 + (i % 2) * .05, d:.03, v:.035, f:rnd(800, 1200), q:2, to:L.far, pan:p}); },
    herd(L, t){ const p = P(); for (let i = 0, n = 10 + R(10); i < n; i++) noise({t:t + i * rnd(.08, .16), d:.04, v:rnd(.02, .04), f:rnd(500, 900), q:1.5, type:'lowpass', to:L.far, pan:p + rnd(-.2, .2)}); if (chance(.5)) EV.low(L, t + rnd(0, 1)); }, // the bhederin, moving
    dog(L, t){ const p = P(); for (let i = 0, n = 1 + R(3); i < n; i++) { const fr = rnd(420, 520); tone(fr, {t:t + i * rnd(.3, .45), type:'sawtooth', a:.01, d:.12, v:.02, slide:fr * .7, filt:{type:'bandpass', f:1000, q:2}, to:L.far, pan:p}); } },
    jackal(L, t){ const p = P(); tone(rnd(700, 800), {t, type:'triangle', a:.2, d:.6, v:.014, slide:rnd(1000, 1200), vib:20, filt:{f:2000}, to:L.far, pan:p}); for (let i = 0; i < 3; i++) tone(rnd(550, 650), {t:t + .8 + i * .18, type:'sawtooth', a:.01, d:.1, v:.012, slide:400, filt:{type:'bandpass', f:1200, q:2}, to:L.far, pan:p}); },
    bell(L, t){ toll(t, f(pick([0, -3]), 1), .05, L.far); },
    ice(L, t){ const p = P(); noise({t, d:.03, v:.08, f:rnd(2000, 3200), q:2, to:L.near, pan:p}); tone(rnd(2600, 3200), {t, a:.002, d:.45, v:.012, slide:rnd(2000, 2400), to:L.far, pan:p}); },
    thunder(L, t){ noise({t, a:.05, d:rnd(2.5, 4), v:.35, f:rnd(120, 200), slide:60, q:.7, type:'lowpass', buf:'b', to:L.near, wet:wetAmb}); noise({t, a:.02, d:.3, v:.1, f:700, q:.8, type:'lowpass', to:L.near}); },
    flap(L, t){ for (let i = 0, n = 2 + R(3); i < n; i++) noise({t:t + i * rnd(.07, .12), d:.06, v:.06, f:rnd(400, 700), type:'lowpass', to:L.near}); },
    hum(L, t){ tone(f(0, -1) * 2, {t, type:'sine', a:2, d:4, v:.05, det:rnd(-10, 10), to:L.near}); tone(f(4, 0), {t:t + 1, a:2.5, d:3.5, v:.02, det:rnd(-12, 12), to:L.far, pan:P()}); }, // the Spawn: a note too low to be a note
  };
  const AMB_LVL = {wind:.5, camp:.56, camp_night:.75, plain:.7, dusk:.7, hills:.53, storm:.63, city_night:.75, lake:.8, tunnel:.75, dark:.75, inn:1.5,
    desert:.62, desert_dusk:.68, desert_night:.75, column:.62, column_night:.72, oasis:.75, forest:.7, forest_night:.78, river:.7, river_night:.74, sea:.68, sea_night:.72, siege:.7, siege_night:.75, burning:.7,
    snow:.6, snow_night:.68, burnt:.62, burnt_night:.7, herds:.68, rain:.62, barrow:.75, coral:.72, spawn:.75}; // so that each sits a few dB under the music
  const SPACE = {tunnel:'hall', dark:'hall', interior:'hall', inn:'hall', barrow:'hall', coral:'hall', spawn:'hall', burning:'hall', siege:'open', fete:'open'}; // which reverb the place has; outdoors is 'open'
  const AMB = {
    wind(L){ L.wind = bed(L, {f:320, q:.8, v:.5, drift:180}); on(L, {gust:11, ember:1.1}); },
    camp(L){ L.wind = bed(L, {f:300, q:.8, v:.36, drift:120}); on(L, {gust:13, clink:8, hammer:28, voices:6, ember:3}); },
    camp_night(L){ L.wind = bed(L, {f:260, q:.8, v:.3, drift:100}); on(L, {gust:15, crackle:1.4, cricket:1.6, voices:10, clink:22, owl:45}); },
    interior(L){ bed(L, {type:'lowpass', f:220, v:.3}); on(L, {creak:12, flap:16, voices:18}); },
    inn(L){ bed(L, {f:420, q:.6, v:.16, drift:60}); on(L, {voices:.55, clink:3.2, crackle:1.8, cheer:28}); },
    plain(L){ L.wind = bed(L, {f:300, q:.7, v:.26, drift:120}); bed(L, {buf:'p', f:1500, q:.5, v:.07, drift:500, rate:.11}); on(L, {gust:8, bird:5, hawk:45}); },
    dusk(L){ L.wind = bed(L, {f:280, q:.7, v:.26, drift:120}); bed(L, {buf:'p', f:1400, q:.5, v:.06, drift:450, rate:.1}); on(L, {gust:10, bird:16, cricket:3.5}); },
    night(L){ L.wind = bed(L, {f:260, v:.18}); bed(L, {buf:'p', f:1300, q:.5, v:.04, drift:400, rate:.09}); on(L, {cricket:.7, owl:32, gust:18}); },
    hills(L){ L.wind = bed(L, {f:380, q:.8, v:.42, drift:200}); bed(L, {buf:'p', f:1600, q:.5, v:.035}); on(L, {gust:7, hawk:30, bird:22}); },
    city(L){ bed(L, {f:480, q:.5, v:.22, drift:120, rate:.05}); on(L, {voices:1.6, hooves:13, clink:9, dog:38, bell:50}); },
    city_night(L){ L.wind = bed(L, {f:280, q:.8, v:.3, drift:120}); on(L, {gust:14, dog:28, bell:55, creak:22, voices:14}); },
    tunnel(L){ bed(L, {type:'lowpass', f:240, v:.55}); drone(L, 49, .06); on(L, {drip:2.4, pebble:11, rumble:32}); },
    dark(L){ bed(L, {type:'lowpass', f:160, v:.5}); drone(L, 36.7, .1); drone(L, 73.4, .05, 170, 'sawtooth'); on(L, {drip:4, whisper:5.5, breath:13}); },
    storm(L){ L.wind = bed(L, {f:360, q:.8, v:.42, drift:200, rate:.13}); bed(L, {buf:'p', f:2300, q:3, v:.05, drift:700, rate:.23}); drone(L, 36.7, .07); on(L, {gust:4, ice:2.6}); },
    fete(L){ bed(L, {f:520, q:.6, v:.26, drift:160, rate:.13}); on(L, {voices:.42, pipes:4.2, cheer:22, fdrum:16}); },
    lake(L){ bed(L, {type:'lowpass', f:380, q:.6, v:.34, drift:140, rate:.09}); on(L, {lap:1.8, gull:8, creak:13}); },
    /* Book Two (v6.8.0): Seven Cities. Dry wind with sand in it, heat, insects; the Chain heard as wagons, cattle and hooves, and somebody far off, never nearer */
    desert(L){ L.wind = bed(L, {f:520, q:.6, v:.3, drift:260, rate:.06}); bed(L, {buf:'w', type:'highpass', f:4500, q:.5, v:.035, drift:900, rate:.17}); on(L, {gust:9, cicada:4, hawk:40, crow:55}); },
    desert_dusk(L){ L.wind = bed(L, {f:420, q:.7, v:.26, drift:200}); bed(L, {buf:'w', type:'highpass', f:4800, q:.5, v:.02, drift:600, rate:.15}); on(L, {gust:11, cicada:7, cricket:4, jackal:60}); },
    desert_night(L){ L.wind = bed(L, {f:300, q:.8, v:.2, drift:140}); on(L, {gust:16, cricket:1.2, jackal:38, owl:70}); },
    column(L){ L.wind = bed(L, {f:480, q:.6, v:.24, drift:220, rate:.06}); bed(L, {buf:'b', type:'lowpass', f:260, v:.14, drift:60, rate:.04}); on(L, {gust:10, wagon:7, low:9, hooves:12, voices:11, wail:75, cicada:9}); },
    column_night(L){ L.wind = bed(L, {f:280, q:.8, v:.22, drift:120}); on(L, {gust:15, crackle:2, low:14, wagon:18, voices:12, cricket:2, wail:90, dog:40}); },
    oasis(L){ L.wind = bed(L, {f:380, q:.7, v:.2, drift:160}); bed(L, {buf:'p', type:'lowpass', f:900, v:.08, drift:200, rate:.1}); on(L, {gust:12, lap:3, bird:6, cicada:8, voices:16}); },
    forest(L){ L.wind = bed(L, {buf:'p', f:1900, q:.6, v:.22, drift:700, rate:.08}); bed(L, {f:300, q:.8, v:.12, drift:80}); on(L, {gust:9, bird:3, creak:14, crow:28, pebble:30}); },
    forest_night(L){ L.wind = bed(L, {buf:'p', f:1500, q:.6, v:.16, drift:500, rate:.07}); on(L, {gust:13, creak:11, owl:20, cricket:1.5, crackle:30}); },
    river(L){ bed(L, {buf:'p', type:'lowpass', f:1800, v:.26, drift:300, rate:.12}); bed(L, {buf:'b', type:'lowpass', f:200, v:.2, drift:40, rate:.05}); L.wind = bed(L, {f:380, q:.7, v:.12, drift:140}); on(L, {lap:1.2, gust:14, bird:9, creak:20}); },
    river_night(L){ bed(L, {buf:'p', type:'lowpass', f:1500, v:.22, drift:250, rate:.1}); bed(L, {buf:'b', type:'lowpass', f:180, v:.18, drift:40, rate:.05}); on(L, {lap:1.5, cricket:1.4, owl:30, creak:18}); },
    sea(L){ bed(L, {buf:'p', type:'lowpass', f:1200, v:.22, drift:300, rate:.08}); L.wind = bed(L, {f:400, q:.6, v:.22, drift:180, rate:.07}); on(L, {wave:5, gull:7, gust:12, creak:9, clink:24}); },
    sea_night(L){ bed(L, {buf:'p', type:'lowpass', f:1000, v:.2, drift:250, rate:.07}); L.wind = bed(L, {f:320, q:.7, v:.2, drift:140}); on(L, {wave:6, gust:14, creak:10, bell:60}); },
    siege(L){ bed(L, {f:460, q:.5, v:.2, drift:120, rate:.05}); L.wind = bed(L, {f:340, q:.8, v:.16, drift:140}); on(L, {voices:3, shout:7, hammer:14, wardrum:26, warhorn:50, gust:12, crow:30, bell:70}); },
    siege_night(L){ L.wind = bed(L, {f:280, q:.8, v:.26, drift:120}); on(L, {gust:13, shout:12, wardrum:22, crackle:4, creak:20, dog:40, warhorn:70}); },
    burning(L){ L.wind = bed(L, {f:340, q:.8, v:.26, drift:140}); bed(L, {buf:'b', type:'lowpass', f:300, v:.16, drift:60, rate:.06}); on(L, {gust:10, crackle:.9, ember:1.5, shout:9, rumble:24, dog:45}); },
    /* Book Three (v6.8.0): the north. Snow wind with ice in it; the burnt lands; the herds; rain on the plain; Coral under its dark, the Spawn over the sea */
    snow(L){ L.wind = bed(L, {f:360, q:.8, v:.4, drift:220, rate:.09}); bed(L, {buf:'w', type:'highpass', f:5000, q:.5, v:.03, drift:1000, rate:.2}); on(L, {gust:6, ice:5, crow:40}); },
    snow_night(L){ L.wind = bed(L, {f:300, q:.8, v:.34, drift:180, rate:.08}); bed(L, {buf:'w', type:'highpass', f:5200, q:.5, v:.025, drift:800, rate:.18}); drone(L, 36.7, .04); on(L, {gust:8, ice:7, owl:80}); },
    burnt(L){ L.wind = bed(L, {f:340, q:.7, v:.34, drift:200}); on(L, {gust:9, crackle:5, ember:2.5, crow:12, flap:30}); },
    burnt_night(L){ L.wind = bed(L, {f:280, q:.8, v:.28, drift:140}); on(L, {gust:12, ember:2, crackle:7, whisper:40, owl:60}); },
    herds(L){ L.wind = bed(L, {f:320, q:.7, v:.26, drift:140}); bed(L, {buf:'p', f:1500, q:.5, v:.06, drift:500, rate:.11}); on(L, {gust:9, herd:9, low:6, bird:12, hawk:40, voices:30}); },
    rain(L){ bed(L, {buf:'w', type:'lowpass', f:2600, q:.5, v:.26, drift:600, rate:.09}); bed(L, {buf:'p', type:'lowpass', f:900, v:.1, drift:200, rate:.07}); L.wind = bed(L, {f:300, q:.8, v:.16, drift:120}); on(L, {drip:1.6, gust:12, thunder:34}); },
    barrow(L){ bed(L, {type:'lowpass', f:180, v:.45}); drone(L, 36.7, .08); L.wind = bed(L, {f:260, q:.8, v:.14, drift:100}); on(L, {gust:16, whisper:7, breath:16, pebble:18, drip:12}); },
    coral(L){ bed(L, {buf:'p', type:'lowpass', f:900, v:.16, drift:200, rate:.06}); bed(L, {type:'lowpass', f:170, v:.3}); drone(L, 32.7, .08); on(L, {wave:9, whisper:9, breath:18, shout:28, wardrum:40, creak:16}); },
    spawn(L){ bed(L, {type:'lowpass', f:150, v:.4}); drone(L, 32.7, .1); drone(L, 65.4, .04, 180, 'sawtooth'); L.wind = bed(L, {f:320, q:.8, v:.14, drift:140}); on(L, {hum:9, gust:14, whisper:12, wave:14}); },
  };
  function startAmb(key, fin){
    const L = layer(busAmb, wetAmb, key, .22); L.ev = []; (AMB[key] || AMB.wind)(L);
    L.ev.forEach(e => e.at = now() + rnd(.3, 1) * e.m); L.step = ambStep; fadeTo(L, AMB_LVL[key] || 1, fin); setSpace(SPACE[key] || 'open', 2); return L;
  }
  function ambStep(L, t, look){ L.ev.forEach(e => { if (e.at < t - .3) e.at = t + rnd(.1, 1) * e.m; while (e.at < look) { if (vol('amb') > 0) try { e.fn(L, Math.max(e.at, t)); } catch(x) {} e.at += e.m * rnd(.35, 1.65); } }); }

  /* ---- what to play where ---- */
  /* a talk scene's backdrop, a map's decor and a battle's setting each name a place; PLACE turns the names into an ambience. Unknown names fall to their book's open country */
  const PLACE = {
    camp:'camp', camp_night:'camp_night', fire:'camp_night', tent:'interior', room:'interior', inn:'inn', plain:'plain', plain_dusk:'dusk', plain_night:'night', plain_andii:'night', plain_glass:'plain', plain_grey:'dusk',
    hills:'hills', hills_dusk:'dusk', hills_night:'night', hills_hounds:'night', hills_kill:'hills', hills_puppet:'dusk', hills_rake:'night', hills_rent:'hills', quorl_hill:'hills', road_east:'hills', quorl_sky:'hills', dragon_sky:'storm', rhivi_barrow:'barrow',
    city_street:'city', city_dusk:'city', city_day:'city', alley_night:'city_night', alley_crimson:'city_night', roof:'city_night', roof_night:'city_night', roof_andii:'city_night', roof_shapes:'city_night', cellar:'tunnel', tunnel:'tunnel', dark:'dark',
    fete_garden:'plain', fete_street:'city', fete_street_night:'city_night', fete_crossing:'city', fete_hall:'interior', ship:'lake', chintro:'camp', vision:'dark', garden_storm:'storm', garden_after:'dusk', lakefront_dawn:'lake', lakefront:'lake', pale:'camp', estate_night:'city_night', estate_terrace:'city_night', jaghut:'dark',
    // Book Two
    b2_hissar_burning:'burning', hissar:'burning', b2_harbour_fog:'sea', b2_harbour_night:'sea_night', b2_silanda:'sea', b2_coltaine_tent:'interior', b2_odhan_day:'desert', b2_odhan_dusk:'desert_dusk', b2_odhan_riders:'desert', odhan:'desert', odhan_night:'desert_night',
    b2_well:'desert_night', b2_caravan_well:'desert_dusk', b2_basin:'desert_dusk', b2_dry_march:'desert', b2_dryj_dusk:'desert_dusk', b2_dryj_spring:'oasis', b2_kherahn:'desert', b2_nenoth_dusk:'desert_dusk', b2_geleen_moon:'desert_night', geleen:'desert_night',
    b2_camp_dawn:'column', b2_camp_night:'column_night', b2_camp_pits:'column', b2_balahn:'column', b2_charge:'column', b2_after:'column_night', b2_odhan_column:'column',
    b2_sekala_cross:'river', b2_sekala_west:'river', b2_sekala_dug:'river', b2_sekala_eve:'river_night', b2_sekala_after:'river', b2_sekala_blown:'river', b2_dojal:'river', river:'river',
    b2_vathar:'river', b2_vathar_cross:'river', b2_vathar_dawn:'river', b2_vathar_dusk:'river_night', b2_vathar_eve:'river_night', b2_vathar_late:'river_night', b2_vathar_night:'river_night', vathar:'river',
    b2_gelor:'hills', b2_gelor_after:'desert_dusk', b2_gelor_dusk:'desert_dusk', ridge:'hills', b2_sanimon:'hills', b2_sanimon_chiefs:'hills', b2_sanimon_dawn:'hills', b2_sanimon_field:'column', b2_sanimon_hills:'hills',
    b2_forest:'forest', forest:'forest', b2_barrow:'barrow', barrow:'barrow', b2_spirits:'dark', b2_tunnel:'tunnel', b2tunnel:'tunnel', b2_trygalle:'desert_night',
    b2_aren_city_dawn:'city', b2_aren_city_day:'city', b2_aren_city_dusk:'city_night', b2_aren_noon:'siege', b2_aren_sortie:'siege', b2_aren_walls:'siege', b2_aren_way:'desert', b2_aren_way_dusk:'desert_dusk', b2_tower:'siege', b2_finale:'sea', aren:'siege',
    // Book Three
    b3_pale_camp:'camp', b3_pale_dawn:'camp', b3_pale_grey:'camp', b3_pale_night:'camp_night', b3camp:'camp', b3camp_night:'camp_night', b3_c1_divide:'hills', b3_c1_parley:'plain', b3_c1_parley_after:'plain', b3_c1_rhivi:'herds', b3_c1_tunnels:'tunnel',
    b3_c2_camp_night:'camp_night', b3_c2_far:'plain', b3_c2_far_dusk:'dusk', b3_c2_far_night:'night', b3_c2_flood:'river', b3_c2_flood_night:'river_night', b3_c2_ford:'river', b3_c2_herds:'herds', b3_c2_herds_dawn:'herds', b3_c2_herds_rain:'rain', b3_c2_hill:'hills', b3_c2_strides:'plain', b3_c2_plain:'plain', b3_c2_plain_night:'night', b3_plain:'plain', b3_plain_dusk:'dusk', b3_plain_night:'night', b3plain:'plain', b3plain_night:'night',
    b3_c3_court:'interior', b3_c3_dragon:'siege', b3_c3_field:'siege', b3_c3_thrall:'interior', b3_c3_walls_dawn:'siege', b3_c3_walls_night:'siege_night', b3_c3_city:'siege', b3_c3_city_night:'siege_night', b3_capustan:'siege', b3_capustan_night:'siege_night', b3city:'siege', b3_tent:'interior',
    b3_c4_cold_night:'snow_night', b3_c4_dawn:'snow', b3_c4_founders:'interior', b3_c4_gathering:'snow', b3_c4_prisoners:'camp', b3_c4_camp:'camp', b3_c4_camp_night:'camp_night',
    b3_c5_burnt:'burnt', b3_c5_camp:'camp', b3_c5_catlin:'plain', b3_catlin:'plain', b3_c5_drowned:'river', b3_c5_domin:'burnt', b3_c5_domin_night:'burnt_night', b3_domin:'burnt', b3_domin_night:'burnt_night', b3domin:'burnt', b3domin_night:'burnt_night', b3_rain:'rain',
    b3_c6_barges:'river', b3_c6_downriver:'river', b3_c6_entrench:'hills', b3_entrench:'hills', b3_c6_flight:'storm', b3_c6_host:'camp', b3_c6_ledge:'hills', b3_c6_lift:'hills', b3_c6_lift_empty:'hills', b3_c6_maurik:'plain', b3_maurik:'plain', b3_c6_road:'plain', b3_c6_slips_night:'night',
    b3_c6_mountain:'snow', b3_c6_mountain_night:'snow_night', b3_c6_river:'river', b3_c6_bankb:'river', b3_c6_campb:'camp', b3_c6_ridgeb:'hills',
    // Book Four (70): the reading places and the decors the chapters will use; anything else b4_ falls to the desert
    b4_aren_yard:'city_night', b4_aren:'city', b4_aren_night:'city_night', b4_barracks:'city_night', b4_graveyard:'city_night', b4aren:'city', b4aren_night:'city_night',
    b4_road_fire:'desert_night', b4_road:'desert', b4_road_dusk:'desert_dusk', b4_fall:'desert_dusk', b4road:'desert', b4road_night:'desert_night', b4_march:'column', b4_march_dusk:'column_night',
    b4_feast:'camp_night', b4_ford:'river', b4_ford_night:'river_night', b4ford:'river', b4_khundryl:'hills', b4_butte:'hills',
    b4_seti_fire:'column_night', b4_camp:'column', b4_camp_night:'column_night', b4camp:'column', b4camp_night:'column_night', b4_hills:'hills', b4_barrows:'barrow',
    b4_wall:'storm', b4_wall_fire:'desert_night', b4wall:'storm', b4_raraku:'desert', b4_raraku_night:'desert_night', b4raraku:'desert', b4raraku_night:'desert_night', b4_seep:'oasis',
    b4_picket:'desert_night', b4_panarak:'siege', b4_panarak_night:'siege_night', b4picket:'desert_night', b4_trenches:'siege_night',
    b4_coral:'coral', b4_coral_dawn:'sea', b4coral:'coral', b4_flood:'sea', b4_finale:'sea_night',
    // Book Five (80): the seven reading places and the decors the chapters will use; anything else b5_ falls to the river country
    b5_barracks:'city_night', b5_letheras:'city', b5_letheras_night:'city_night', b5_canal:'city', b5_canal_night:'city_night', b5_drownings:'city', b5_market:'city', b5letheras:'city', b5letheras_night:'city_night',
    b5_trate_harbour:'sea', b5_trate:'sea', b5_trate_night:'sea_night', b5_wreck:'sea', b5_harbour:'sea', b5trate:'sea',
    b5_landing:'river_night', b5_landing_day:'river', b5_barges:'river', b5_river:'river', b5landing:'river', b5_fire:'river_night',
    b5_highfort:'hills', b5_rampart:'siege', b5_rampart_night:'siege_night', b5_gully:'hills', b5highfort:'hills',
    b5_road_south:'burnt', b5_road:'plain', b5_road_night:'night', b5_burnt:'burnt', b5_cache:'camp', b5road:'plain', b5_march:'column', b5_march_dusk:'column_night',
    b5_branskeep:'hills', b5_channel:'siege', b5_keep:'siege', b5_keep_night:'siege_night', b5branskeep:'hills', b5_barrow:'barrow',
    b5_letheras_fall:'siege', b5_bridge:'city', b5_finale:'city_night',
    // Book Five's chapters: Letheras (81) in the city, Trate (82) on the sea, Kraig's Landing (83) on the river
    b5_c1_barracks:'city_night', b5_c1_lowwalk:'city', b5_c1_canal:'city', b5_c1_walk:'city', b5_c1_court:'interior', b5_c1_festival:'city_night', b5_c1_pittown:'city_night',
    b5_c2_quay:'sea', b5_c2_wharf:'sea', b5_c2_wrecks:'sea_night', b5_c2_hulk:'sea_night', b5_c2_hold:'interior', b5_c2_strand:'sea_night',
    // Kraig's Landing (83) on the river: the dock and the camp, the barges and the bank at night
    b5_c3_dock:'river', b5_c3_barges:'river_night', b5_c3_bank:'river_night', b5_c3_greenfire:'river_night', b5_c3_tents:'river', b5_c3_collapse:'river_night',
    // High Fort (84): the forest road, the west rampart and the field, Dry Gully at night, the battle, the wood, the road south
    b5_c4_road:'forest', b5_c4_forest:'forest', b5_c4_wood:'forest_night', b5_c4_rampart:'siege', b5_c4_field:'hills', b5_c4_gully:'night', b5_c4_lightning:'siege', b5_c4_surrender:'plain',
    // the road south (85): the burned country and its farms, the cache, the camp at Brans Keep
    b5_c5_road:'burnt', b5_c5_burned:'burnt', b5_c5_farm:'burnt', b5_c5_cache:'camp', b5_c5_keep:'camp', b5_c5_arrival:'hills',
    // Brans Keep (86): the lines on the eve, the lake shore, the dry channel in battle, the hills behind the keep, the Dissent road, the barrow
    b5_c6_lines:'camp_night', b5_c6_eve:'camp_night', b5_c6_shore:'lake', b5_c6_channel:'siege', b5_c6_pillars:'siege', b5_c6_break:'siege', b5_c6_hills:'hills', b5_c6_dissent:'plain', b5_c6_barrow:'barrow',
    // Letheras falls (87): the Drownings District at night, the footbridge by night and by day, the walls, the sorcery, under the arch, the Low Walk after
    b5_c7_streets:'city_night', b5_c7_night:'burning', b5_c7_canalnight:'city_night', b5_c7_canal:'city', b5_c7_lowwalk:'city', b5_c7_barricade:'siege', b5_c7_walls:'city', b5_c7_sorcery:'dark', b5_c7_under:'lake', b5_c7_walk:'city_night', b5_c7_finale:'city_night',
    b3_c7_barrow:'barrow', b3_c7_coral:'coral', b3_coral:'coral', b3_c7_finale:'sea', b3_c7_hill:'hills', b3_c7_hill_dusk:'dusk', b3_c7_sea:'sea', b3_c7_shore_night:'sea_night', b3_c7_spawn:'spawn', b3_c7_field:'hills',
  };
  function placeAmb(name, dark){
    if (!name) return null; const n = String(name); if (AMB[n]) return n; if (PLACE[n]) return PLACE[n];
    const base = n.replace(/_(night|dusk|dawn|day|eve|late|after)$/, ''); if (PLACE[base]) { const a = PLACE[base]; return /_night$|_eve$|_late$/.test(n) ? NIGHT[a] || a : a; }
    if (/^b2|^dg|odhan|hissar|aren/.test(n)) return dark ? 'desert_night' : /dusk/.test(n) ? 'desert_dusk' : 'desert';
    if (/^b3|^moi/.test(n)) return dark || /night/.test(n) ? 'night' : /dusk/.test(n) ? 'dusk' : 'plain';
    if (/^b4|^hoc/.test(n)) return dark || /night/.test(n) ? 'desert_night' : /dusk/.test(n) ? 'desert_dusk' : 'desert'; // Book Four: the Holy Desert
    if (/^b5|^mt/.test(n)) return dark || /night/.test(n) ? 'river_night' : /dusk/.test(n) ? 'dusk' : 'river'; // Book Five: Lether's river country
    return null;
  }
  const NIGHT = {plain:'night', dusk:'night', hills:'night', city:'city_night', camp:'camp_night', desert:'desert_night', desert_dusk:'desert_night', column:'column_night', river:'river_night', sea:'sea_night', siege:'siege_night', forest:'forest_night', snow:'snow_night', burnt:'burnt_night', herds:'night'};
  const DECOR_AMB = {pale:'camp', camp_night:'camp_night', plain:'plain', plain_dusk:'dusk', plain_night:'night', hills:'hills', hills_dusk:'dusk', city_dusk:'city', city_night:'city_night', roof_night:'city_night', cellar:'tunnel'};
  function where(){ try { return {v:view, sk:G && G.sceneKind, decor:view === 'explore' ? AREA().decor : null, b:view === 'battle' && S ? BATTLES[S.battle] : null, id:S && S.battle, ch:S ? S.chapter : 0}; } catch(e) { return {}; } }
  function battleAmb(w){ const d = w.b || {}, st = d.style;
    if (st === 'hissar') return 'burning';
    if (st && st.startsWith('odhan')) return d.dark || st === 'odhan_night' ? 'desert_night' : 'desert';
    if (st === 'terrace' || st === 'garden' || w.id === 'house_guards') return 'fete';
    if (st === 'dock') return 'lake'; if (st === 'cellar') return 'tunnel'; if (st === 'storm') return 'storm';
    if (st === 'city' || st === 'roof') return d.dark ? 'city_night' : 'city';
    const p = placeAmb(st, d.dark); if (p) return d.dark ? NIGHT[p] || p : p;
    return d.dark ? 'dark' : d.open ? 'night' : w.ch === 1 ? 'camp_night' : 'tunnel'; }
  function cue(kind){
    const w = where();
    switch (kind) {
      case 'title': return {mus:'title', amb:V.key === 'dg' || V.key === 'hoc' ? 'desert' : V.key === 'moi' ? 'snow' : V.key === 'mt' ? 'river_night' : 'wind'};
      case 'end': return {mus:'end', amb:V.key === 'dg' ? 'sea' : V.key === 'moi' || V.key === 'hoc' ? 'sea_night' : V.key === 'mt' ? 'city_night' : 'wind'};
      case 'battle': return {mus:'battle', amb:battleAmb(w)};
      case 'dark': return w.v === 'battle' ? {mus:'dark', amb:battleAmb(w)} : {mus:'dread', amb:w.sk === 'garden_storm' ? 'storm' : placeAmb(w.sk, true) === 'barrow' ? 'barrow' : w.sk === 'b3_c7_spawn' ? 'spawn' : 'dark'};
      case 'tunnel': return {mus:'calm', amb:'tunnel'};
      case 'fete': return {mus:'calm', amb:'fete'};
      case 'lake': return {mus:'calm', amb:'lake'};
      case 'explore': return {mus:'calm', amb:w.v === 'explore' ? DECOR_AMB[w.decor] || placeAmb(w.decor) || 'wind' : w.v === 'intro' && !w.ch ? 'wind' : placeAmb(w.sk) || 'wind'};
    }
    if (AMB[kind]) return {mus:'calm', amb:kind}; // a scene that names its own ambience: 'dusk', 'night', 'desert', 'siege'…
    const p = placeAmb(kind); if (p) return {mus:'calm', amb:p};
    warn('s:' + kind, 'no cue for scene "' + kind + '"'); return {mus:'calm', amb:'wind'};
  }
  function revoiceNow(){ const k = voiceKey(); if (VOICES[k] && VOICES[k] !== V) { V = VOICES[k]; if (ac) { glide(musSend.gain, V.wet, 1); if (mus) { retire(mus, 2); mus = null; } } return true; } return false; }
  function apply(){
    if (!want) return; revoiceNow(); const c = cue(want);
    if (!hush && (!mus || mus.key !== c.mus)) { const fight = c.mus === 'battle' || c.mus === 'dark'; retire(mus, fight ? .8 : 2.5); mus = startMusic(c.mus, fight ? .15 : 2.5); }
    if (!amb || amb.key !== c.amb) { retire(amb, 2.2); amb = startAmb(c.amb, 2.2); }
  }
  function tick(){ if (!live()) return; const t = now(), look = t + .45; [mus, amb].forEach(L => { if (L && L.step) try { L.step(L, t, look); } catch(e) {} }); reap(t); }
  function sync(){ // run the scheduler exactly while the context is running, visible and not muted
    if (!ac) return;
    if (live() && !muted() && (offline || !document.hidden)) { if (!timer && !offline) timer = setInterval(tick, 120); apply(); tick(); }
    else if (timer) { clearInterval(timer); timer = null; }
  }
  function setScene(kind){ want = kind; hush = false; if (!pend) { pend = true; Promise.resolve().then(() => { pend = false; sync(); }); } } // several calls in one task settle on the last

  /* ---- volumes, unlocking, background ---- */
  function applyVolumes(){
    if (!ac) return;
    const set = (p, v) => offline ? (p.value = v) : glide(p, v, .06); // offline (the tests): no ramp, the first sound counts
    set(master.gain, vol('master')); [[busMus, wetMus, 'music'], [busSfx, wetSfx, 'sfx'], [busAmb, wetAmb, 'amb']].forEach(([b, w, k]) => { set(b.gain, vol(k)); set(w.gain, vol(k)); });
    if (offline) return;
    clearTimeout(muteT);
    if (muted()) muteT = setTimeout(() => { if (muted() && ac.state === 'running') sus(); }, 150); // after the fade: a muted game costs nothing
    else if (ac.state !== 'running' && !document.hidden) res();
    sync();
  }
  function unlock(){
    if (!init() || offline || ac.state === 'running' || document.hidden || muted()) return;
    try { const s = ac.createBufferSource(); s.buffer = ac.createBuffer(1, 1, 22050); s.connect(ac.destination); s.onended = () => s.disconnect(); s.start(0); } catch(e) {} // iOS wants a sound started inside the gesture
    res();
  }
  function vis(){ if (!ac || offline) return; if (document.hidden) { if (ac.state === 'running') sus(); } else if (!muted()) res(); sync(); }
  document.addEventListener('visibilitychange', vis); window.addEventListener('pagehide', vis); window.addEventListener('pageshow', vis);
  const _dev = {attach(c){ ac = c; offline = true; bufs = {}; recent = {}; mus = amb = null; fading = []; want = null; hush = false; build(); }, tick, sync, cue, placeAmb, battleAmb,
    force(m, a){ if (m) mus = startMusic(m, .01); if (a) amb = startAmb(a, .01); },
    advance(sec){ [mus, amb].forEach(L => { if (L && L.step) L.step(L, now(), now() + sec); }); }, // offline tests: schedule sec seconds of whatever is playing
    voice(k){ if (VOICES[k]) { V = VOICES[k]; if (ac) musSend.gain.value = V.wet; } return V.key; },
    get names(){ return {sfx:Object.keys(SFX), amb:Object.keys(AMB), mus:Object.keys(STYLE), voices:Object.keys(VOICES), places:Object.keys(PLACE)}; },
    get state(){ return {want, mus:mus && mus.key, amb:amb && amb.key, voice:V.key, space, fading:fading.length, timer:!!timer, hush, ctx:ac && ac.state}; }};
  return {unlock, play, blow, setScene, applyVolumes, revoice(){ if (revoiceNow() && want && ac) setScene(want); }, _dev, get ready(){ return live(); }};
})();
['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'].forEach(ev => window.addEventListener(ev, () => AUDIO.unlock(), {passive:true, capture:true}));
