// The sound pass (v6.8.0): every sound effect, every ambience and every music cue in every book's voice renders in an
// OfflineAudioContext and is measured: it must make a sound, must not clip (the limiter holds), and must carry no NaN.
// Also: every scene, decor and battle style named in the source resolves to an ambience (no silent fall to wind),
// the voice follows the book, and blows are named by their verbs.
// Usage: node tools/audio_test.mjs   (exit 1 on a failure)
import fs from 'fs';
import path from 'path';
import { server, browser, openGame, root } from './page.mjs';
const srv = await server(); const br = await browser();
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 1024, height: 768, settings: { master: .8, music: .6, sfx: .8, amb: .6 } });

/* render one thing offline: a one-shot, or seconds of a music cue and an ambience in a voice. Returns peak and RMS */
const render = (what) => page.evaluate(async (what) => {
  let seed = 1234567; Math.random = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; // the same dice every run
  const sr = 24000, sec = what.sec || 1.5, ctx = new OfflineAudioContext(2, Math.ceil(sr * sec), sr);
  AUDIO._dev.attach(ctx); if (what.voice) AUDIO._dev.voice(what.voice);
  if (what.sfx) { AUDIO.play(what.sfx, ...(what.args || [])); }
  if (what.mus || what.amb) { AUDIO._dev.force(what.mus, what.amb); AUDIO._dev.advance(sec); }
  const buf = await ctx.startRendering();
  let peak = 0, ss = 0, nan = 0, n = 0, late = 0;
  for (let c = 0; c < buf.numberOfChannels; c++) { const d = buf.getChannelData(c); for (let i = 0; i < d.length; i++) { const x = d[i]; if (x !== x) { nan++; continue; } const a = Math.abs(x); if (a > peak) peak = a; ss += x * x; n++; if (i > d.length * .6) late += x * x; } }
  return { peak, rms: Math.sqrt(ss / n), lateRms: Math.sqrt(late / (n * .4)), nan };
}, what);

const names = await page.evaluate(() => AUDIO._dev.names);
ok(names.voices.length === 5 && names.voices.join() === 'gotm,dg,moi,hoc,mt', 'five voices, one per book: ' + names.voices.join(', '));
ok(names.sfx.length >= 45, names.sfx.length + ' sound effects');
ok(names.amb.length >= 38, names.amb.length + ' ambiences');

/* every one-shot, in Book One's voice, and the pitched ones again in the other two */
const silentOk = new Set(); // none may be silent
for (const k of names.sfx) {
  const args = k === 'house' ? ['High House Death'] : k === 'dice' ? [true] : k === 'bark' ? [2] : [];
  const r = await render({ sfx: k, args, sec: k === 'cusser' || k === 'chapter' || k === 'choice' || k === 'reveal' ? 3.5 : 1.5 });
  ok(r.nan === 0 && r.peak > .002 && r.peak <= 1 && r.rms > 5e-5, `sfx ${k}: peak ${r.peak.toFixed(3)} rms ${r.rms.toFixed(4)}${r.nan ? ' NaN!' : ''}`);
}
for (const h of ['High House Dark', 'High House Shadow', 'High House Life', 'High House Light', 'High House Chains', 'Unaligned', '—', 'The Empty Hold', 'The Fulcra']) { // v8.0: Book Five's tiles of the Holds knock on stone
  const r = await render({ sfx: 'house', args: [h], sec: 2.5, voice: h.includes('Chains') ? 'moi' : h.includes('Life') ? 'dg' : /Hold|Fulcra/.test(h) ? 'mt' : 'gotm' });
  ok(r.nan === 0 && r.peak > .003 && r.peak <= 1, `house ${h}: peak ${r.peak.toFixed(3)}`);
}
for (const v of ['dg', 'moi', 'hoc', 'mt']) for (const k of ['chapter', 'choice', 'win', 'lose', 'up', 'trick', 'heal', 'magic', 'grey', 'ice']) {
  const r = await render({ sfx: k, sec: 3, voice: v });
  ok(r.nan === 0 && r.peak > .004 && r.peak <= 1, `sfx ${k} in ${v}: peak ${r.peak.toFixed(3)}`);
}

/* every music cue in every voice: four seconds, must still be sounding in the last part (the layer plays on) */
for (const v of names.voices) for (const m of names.mus) {
  const r = await render({ mus: m, voice: v, sec: 10 });
  ok(r.nan === 0 && r.rms > .002 && r.lateRms > .001 && r.peak <= 1, `music ${m} (${v}): rms ${r.rms.toFixed(4)} late ${r.lateRms.toFixed(4)} peak ${r.peak.toFixed(3)}`);
}
/* every ambience: a bed that is there from the start and stays */
for (const a of names.amb) {
  const r = await render({ amb: a, sec: 4 });
  ok(r.nan === 0 && r.rms > .002 && r.lateRms > .001 && r.peak <= 1, `ambience ${a}: rms ${r.rms.toFixed(4)} late ${r.lateRms.toFixed(4)}`);
}

/* the plumbing: every place the source names resolves to a real ambience */
const src = fs.readdirSync(path.join(root, 'src')).filter(f => f.endsWith('.js') && !f.startsWith('13_')).map(f => fs.readFileSync(path.join(root, 'src', f), 'utf8')).join('\n');
const uniq = re => [...new Set([...src.matchAll(re)].map(m => m[1]))];
const scenes = uniq(/scene:'([a-z_0-9]+)'/g).filter(s => s !== 'explore' && s !== 'intro'), decors = uniq(/decor:'([a-z_0-9]+)'/g), styles = uniq(/style:'([a-z_0-9]+)'/g), ambs = uniq(/amb:'([a-z_0-9]+)'/g).filter(a => a !== 'explore');
const resolve = await page.evaluate(({ scenes, decors, styles, ambs }) => {
  const out = { scenes: {}, decors: {}, styles: {}, ambs: {} }, A = AUDIO._dev;
  scenes.forEach(s => out.scenes[s] = A.placeAmb(s)); decors.forEach(d => out.decors[d] = A.placeAmb(d));
  styles.forEach(s => out.styles[s] = A.battleAmb({ b: { style: s }, ch: 3 })); ambs.forEach(a => out.ambs[a] = A.cue(a).amb);
  return out;
}, { scenes, decors, styles, ambs });
const known = new Set(names.amb);
const bad = o => Object.entries(o).filter(([k, v]) => !v || !known.has(v)).map(([k, v]) => `${k}→${v}`);
const b1 = bad(resolve.scenes).filter(x => !/^(fete_|garden_after|ship)/.test(x) && !/^(explore|intro|chintro|dark)→/.test(x)); // fete scenes are routed by sceneAmb before the engine sees them
ok(b1.length === 0, `${scenes.length} talk scenes resolve to an ambience` + (b1.length ? ': ' + b1.join(' ') : ''));
const b2 = bad(resolve.decors).filter(x => !/^(estate_|lakefront)/.test(x)); // routed by decorAmb (fete, lake)
ok(b2.length === 0, `${decors.length} map decors resolve` + (b2.length ? ': ' + b2.join(' ') : ''));
const b3 = bad(resolve.styles);
ok(b3.length === 0, `${styles.length} battle styles resolve` + (b3.length ? ': ' + b3.join(' ') : ''));
const b4 = Object.entries(resolve.ambs).filter(([k, v]) => v === 'wind' && k !== 'wind').map(([k, v]) => k);
ok(b4.length === 0, `${ambs.length} scene ambience words are understood (${ambs.join(', ')})` + (b4.length ? '; fall to wind: ' + b4.join(' ') : ''));
ok(resolve.scenes.b2_odhan_dusk === 'desert_dusk' && resolve.scenes.b3_c3_walls_night === 'siege_night' && resolve.scenes.b2_vathar_night === 'river_night' && resolve.decors.b3_c5_domin === 'burnt' && resolve.styles.b3_c7_coral === 'coral', 'spot checks: the Odhan at dusk, Capustan\'s walls at night, the Vathar at night, the Domin, Coral');

/* the voice follows the book, on the title too */
const voices = await page.evaluate(() => { const out = {}; setBook('dg'); out.titleDg = AUDIO._dev.cue('title'); S = newState('Hask'); S.book = 'moi'; AUDIO.revoice(); out.moi = AUDIO._dev.state.voice; S.book = 'hoc'; AUDIO.revoice(); out.hoc = AUDIO._dev.state.voice; out.titleHoc = AUDIO._dev.cue('title'); out.endHoc = AUDIO._dev.cue('end'); S.book = 'gotm'; AUDIO.revoice(); out.gotm = AUDIO._dev.state.voice; S = null; setBook('gotm'); return out; });
ok(voices.moi === 'moi' && voices.gotm === 'gotm' && voices.hoc === 'hoc', `the voice follows the save's book (${voices.moi}, ${voices.hoc}, ${voices.gotm})`);
ok(voices.titleHoc && voices.titleHoc.amb === 'desert' && voices.endHoc && voices.endHoc.amb === 'sea_night', `Book Four's title is the desert and its end the sea at night (${JSON.stringify(voices.titleHoc)}, ${JSON.stringify(voices.endHoc)})`);
const b4p = await page.evaluate(() => ['b4_aren_yard', 'b4_road_fire', 'b4_feast', 'b4_seti_fire', 'b4_wall_fire', 'b4_picket', 'b4_coral', 'b4_nowhere', 'b4_nowhere_night'].map(k => AUDIO._dev.placeAmb(k)));
ok(b4p.join() === 'city_night,desert_night,camp_night,column_night,desert_night,desert_night,coral,desert,desert_night', 'Book Four\'s reading places, and b4_ falling to the desert: ' + b4p.join(', '));

/* v8.0 Book Five: the voice, the title (the river at night) and the end (the city at night), the reading places, and b5_ falling to the river */
const b5v = await page.evaluate(() => { const out = {}; S = newState('Hask'); S.book = 'mt'; AUDIO.revoice(); out.mt = AUDIO._dev.state.voice; out.title = AUDIO._dev.cue('title'); out.end = AUDIO._dev.cue('end'); S.book = 'gotm'; AUDIO.revoice();
  out.places = ['b5_barracks', 'b5_trate_harbour', 'b5_landing', 'b5_highfort', 'b5_road_south', 'b5_branskeep', 'b5_letheras', 'b5_nowhere', 'b5_nowhere_night'].map(k => AUDIO._dev.placeAmb(k)); return out; });
ok(b5v.mt === 'mt' && b5v.title && b5v.title.amb === 'river_night' && b5v.end && b5v.end.amb === 'city_night', `Book Five's voice, its title on the river at night and its end in the city at night (${b5v.mt}, ${JSON.stringify(b5v.title)}, ${JSON.stringify(b5v.end)})`);
ok(b5v.places.join() === 'city_night,sea,river_night,hills,burnt,hills,city,river,river_night', 'Book Five\'s reading places, and b5_ falling to the river country: ' + b5v.places.join(', '));
const b5c = await page.evaluate(() => ['b5_c1_lowwalk', 'b5_c1_festival', 'b5_c1_court', 'b5_c2_quay', 'b5_c2_wrecks', 'b5_c2_strand', 'b5_c2_hold', 'b5_c3_dock', 'b5_c3_barges', 'b5_c3_greenfire', 'b5_c3_tents'].map(k => AUDIO._dev.placeAmb(k)));
ok(b5c.join() === 'city,city_night,interior,sea,sea_night,sea_night,interior,river,river_night,river_night,river', 'Book Five\'s chapters: Letheras in the city, Trate on the sea, Kraig\'s Landing on the river: ' + b5c.join(', '));
const b5d = await page.evaluate(() => ['b5_c4_road', 'b5_c4_rampart', 'b5_c4_field', 'b5_c4_gully', 'b5_c4_lightning', 'b5_c4_wood', 'b5_c4_surrender'].map(k => AUDIO._dev.placeAmb(k)));
ok(b5d.join() === 'forest,siege,hills,night,siege,forest_night,plain', 'Book Five\'s High Fort: the forest road, the rampart, the field, the gully at night, the battle, the wood, the road south: ' + b5d.join(', '));
const b5e = await page.evaluate(() => ['b5_c5_road', 'b5_c5_burned', 'b5_c5_farm', 'b5_c5_cache', 'b5_c5_keep', 'b5_c5_arrival'].map(k => AUDIO._dev.placeAmb(k)));
ok(b5e.join() === 'burnt,burnt,burnt,camp,camp,hills', 'Book Five\'s road south: the burned country, a burned farm, the cache, the camp at Brans Keep, the keep from the north road: ' + b5e.join(', '));
const b5f = await page.evaluate(() => ['b5_c6_lines', 'b5_c6_eve', 'b5_c6_shore', 'b5_c6_channel', 'b5_c6_pillars', 'b5_c6_break', 'b5_c6_hills', 'b5_c6_dissent', 'b5_c6_barrow'].map(k => AUDIO._dev.placeAmb(k)));
ok(b5f.join() === 'camp_night,camp_night,lake,siege,siege,siege,hills,plain,barrow', 'Book Five\'s Brans Keep: the lines and the eve at night, the lake shore, the channel and the pillars and the break, the hills, the Dissent road, the barrow: ' + b5f.join(', '));
const b5g = await page.evaluate(() => ['b5_c7_streets', 'b5_c7_night', 'b5_c7_canalnight', 'b5_c7_canal', 'b5_c7_walls', 'b5_c7_sorcery', 'b5_c7_under', 'b5_c7_walk', 'b5_c7_finale'].map(k => AUDIO._dev.placeAmb(k)));
ok(b5g.join() === 'city_night,burning,city_night,city,city,dark,lake,city_night,city_night', 'Book Five\'s fall of Letheras: the streets at night and the city burning, the footbridge by night and by day, the walls, the sorcery, under the arch, the Low Walk after: ' + b5g.join(', '));

/* blows by verb */
const blows = await page.evaluate(() => ['brings the long mace down on', 'drives a spear at', 'claws at', 'slings a stone at', 'looses a quarrel at', 'throws grey sorcery at', 'lays a hand of ice on', 'cuts at', 'bites', 'swings a fist like a mallet at'].map(v => AUDIO.blow(v)));
ok(blows.join() === 'blunt,spear,claw,sling,bow,grey,ice,sword,claw,blunt', 'blows by verb: ' + blows.join(', '));

ok(!errors.length, 'no page errors ' + errors.join(' | '));
await page.close(); await br.close(); srv.kill(); process.exit(fail);
