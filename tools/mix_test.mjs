// The mix (series polish §4): every book's voice, rendered offline at the same music cues, is measured for loudness
// (BS.1770-style: K-weighted, 400 ms blocks, gated) and must sit within about a decibel of the other books at each cue.
// The engine's per-voice trims (VOICES[k].trim in src/013) are what hold it there; this keeps a later change from drifting.
// Two fixed seeds, thirty seconds each, so the generative sections (full, thin, rest) are averaged and every run is the same.
// Usage: node tools/mix_test.mjs [--json] [--cues=title,calm]   (exit 1 when a cue spreads more than SPREAD dB across the books)
import { server, browser, openGame } from './page.mjs';
const SPREAD = 1.5, SEC = 30, SEEDS = [1234567, 7654321];
const arg = k => (process.argv.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const json = process.argv.includes('--json');
const srv = await server(); const br = await browser();
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 1024, height: 768, settings: { master: .8, music: .6, sfx: .8, amb: .6 } });

/* render sec seconds of one cue in one voice, music only, and return its integrated loudness (LUFS, relative to this page's own scale) */
const loud = (voice, mus, seed) => page.evaluate(async ({ voice, mus, seed, SEC }) => {
  let s = seed; Math.random = () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const sr = 24000, ctx = new OfflineAudioContext(2, sr * SEC, sr);
  AUDIO._dev.attach(ctx); AUDIO._dev.voice(voice); AUDIO._dev.force(mus, null); AUDIO._dev.advance(SEC);
  const buf = await ctx.startRendering();
  const bq = (b0, b1, b2, a0, a1, a2) => { b0 /= a0; b1 /= a0; b2 /= a0; a1 /= a0; a2 /= a0; let x1 = 0, x2 = 0, y1 = 0, y2 = 0; return x => { const y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x; y2 = y1; y1 = y; return y; }; };
  const shelf = () => { const A = Math.pow(10, 4 / 40), w = 2 * Math.PI * 1681 / sr, c = Math.cos(w), al = Math.sin(w) / 2 * Math.SQRT2, q = 2 * Math.sqrt(A) * al;
    return bq(A * ((A + 1) + (A - 1) * c + q), -2 * A * ((A - 1) + (A + 1) * c), A * ((A + 1) + (A - 1) * c - q), (A + 1) - (A - 1) * c + q, 2 * ((A - 1) - (A + 1) * c), (A + 1) - (A - 1) * c - q); };
  const hp = () => { const w = 2 * Math.PI * 38 / sr, c = Math.cos(w), al = Math.sin(w) / (2 * .5); return bq((1 + c) / 2, -(1 + c), (1 + c) / 2, 1 + al, -2 * c, 1 - al); };
  const n = buf.length, sq = new Float64Array(n);
  for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch), f1 = shelf(), f2 = hp(); for (let i = 0; i < n; i++) { const y = f2(f1(d[i])); sq[i] += y * y; } }
  const blk = Math.round(sr * .4), hop = Math.round(sr * .1), from = sr * 3, ls = []; // the first three seconds are the cue fading in
  for (let i = from; i + blk <= n; i += hop) { let a = 0; for (let j = i; j < i + blk; j++) a += sq[j]; ls.push(a / blk); }
  const lufs = m => -.691 + 10 * Math.log10(m), g1 = ls.filter(m => lufs(m) > -70), mean = a => a.reduce((x, y) => x + y, 0) / a.length;
  if (!g1.length) return -99; const rel = lufs(mean(g1)) - 10, g2 = g1.filter(m => lufs(m) > rel); return lufs(mean(g2));
}, { voice, mus, seed, SEC });

const names = await page.evaluate(() => AUDIO._dev.names);
const cues = (arg('cues') || '').split(',').filter(Boolean).length ? arg('cues').split(',') : ['title', 'calm', 'end', 'dread', ...names.mus.filter(m => /^battle/.test(m)), 'dark'];
const T = {};
for (const c of cues) { T[c] = {};
  for (const v of names.voices) { const ms = []; for (const s of SEEDS) ms.push(await loud(v, c, s)); T[c][v] = 10 * Math.log10(ms.reduce((a, m) => a + Math.pow(10, m / 10), 0) / ms.length); } }
console.log('LUFS (relative)  ' + names.voices.map(v => v.padStart(6)).join(' ') + '  spread');
for (const c of cues) { const xs = names.voices.map(v => T[c][v]), sp = Math.max(...xs) - Math.min(...xs);
  console.log(c.padEnd(16) + ' ' + xs.map(x => x.toFixed(1).padStart(6)).join(' ') + '  ' + sp.toFixed(2).padStart(5)); }
for (const c of cues) { const xs = names.voices.map(v => T[c][v]), sp = Math.max(...xs) - Math.min(...xs);
  ok(sp <= SPREAD, `${c}: the ten books within ${SPREAD} dB of each other (spread ${sp.toFixed(2)} dB, ${names.voices[xs.indexOf(Math.min(...xs))]} quietest, ${names.voices[xs.indexOf(Math.max(...xs))]} loudest)`); }
if (json) console.log('JSON ' + JSON.stringify(T));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await page.close(); await br.close(); srv.kill(); process.exit(fail);
