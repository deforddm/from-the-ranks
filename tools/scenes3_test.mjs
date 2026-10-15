// Book Three's backdrops match their words: every node that was showing the wrong picture (wrong place, wrong time of day, or the moment
// before or after the one the text is in) names the scene painted for it; the chapter cards, end screens and Deck readings do too; every
// scene key a Book Three node, chapter or reading uses is in SCENES with a caption and a painter, and every painter draws, with motion and
// without, on an offscreen canvas without throwing and without leaving the canvas blank. A node's scene is checked by calling DLG[id]()
// in a Book Three state (setBook('moi'), newStateMOI('Hask')). The near-misses painted after (rain on the road to the river, the tent closed after
// the parley, Capustan at sunrise, the far bank of the river at dusk and at night, the shore at night) each differ visibly from the painting
// they vary, so a variant can't silently fall back to its base.
// Usage: node tools/scenes3_test.mjs   (exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };

// node id -> the scene it should show (the ones that were wrong, and the first node of each chain that inherited a wrong one)
const NODES = {
  b3_c1_road: 'b3_c1_divide', b3_c1_train_after: 'b3_pale_grey', b3_c1_dawn: 'b3_pale_dawn',
  b3_c2_far_arrive: 'b3_c2_far', b3_c2_after_hill: 'b3_c2_hill', b3_c2_camp_arrive: 'b3_c2_camp_night', b3_c2_after_night: 'b3_c2_herds_dawn',
  b3_c2_river_arrive: 'b3_c2_ford', b3_c2_after_herd: 'b3_c2_far_night', b3_c2_after_wagons: 'b3_c2_flood_night',
  b3_c3_start: 'b3_c3_walls_night', b3_c3_deck: 'b3_c3_walls_night', b3_c3_card: 'b3_c3_walls_night', b3_c3_close: 'b3_c3_walls_night',
  b3_c3_grass: 'b3_c3_field', b3_c3_camp_help: 'b3_c3_court',
  b3_c4_hunt_home: 'b3_c4_cold_night', b3_c4_dawn: 'b3_c4_dawn',
  b3_c6_start: 'b3_c6_host', b3_c6_deck: 'b3_c6_host', b3_c6_card: 'b3_c6_host', b3_c6_start2: 'b3_c6_road', b3_c6_after_field: 'b3_c6_lift_empty',
  b3_c6_q_flight: 'b3_c6_flight', b3_c6_q_foot: 'b3_c6_ledge', b3_c6_q_seen: 'b3_c6_ledge', b3_c6_q_after_land: 'b3_c6_ledge', b3_c6_q_after_condors: 'b3_c7_coral',
  b3_c6_m_march: 'b3_c6_road', b3_c6_m_raid_pre: 'b3_c6_slips_night', b3_c6_m_river: 'b3_c6_downriver', b3_c6_m_after_amb: 'b3_c6_downriver', b3_c6_m_landing_in: 'b3_c6_maurik',
  // the near-misses: rain on the road, the tent closed after the parley, sunrise at Capustan, the far bank at dusk, the shore at night
  b3_c2_to_river: 'b3_c2_herds_rain', b3_c1_parley_after: 'b3_c1_parley_after', b3_c3_field_arrive: 'b3_c3_walls_dawn', b3_c2_herd_fight: 'b3_c2_far_dusk',
  b3_c7_burial2: 'b3_c7_shore_night',
  // unchanged, checked so a later edit does not undo the morning at Pale, the parley before the tent, the Spawn at sunset or the last morning
  b3_c1_start: 'b3_pale_camp', b3_c1_deck: 'b3_pale_camp', b3_c1_parley_strike: 'b3_c1_parley', b3_c2_start: 'b3_c2_herds', b3_c7_burial: 'b3_c7_sea', b3_c7_end: 'b3_c7_finale' };
// nodes with no scene of their own, and the node in front of them whose picture they keep (it must be one that fits them)
const CHAINS = { b3_c2_tree: 'b3_c2_after_hill', b3_c2_tree_no: 'b3_c2_after_hill', b3_c3_grass_water: 'b3_c3_grass', b3_c3_grass_stood: 'b3_c3_grass', b3_c3_grass_left: 'b3_c3_grass',
  b3_c3_water: 'b3_c3_grass_water', b3_c3_camp_helped: 'b3_c3_camp_help', b3_c3_camp_back: 'b3_c3_camp_help', b3_c6_wj_why: 'b3_c6_after_field', b3_c6_key_quorl: 'b3_c6_after_field',
  b3_c6_key_maurik: 'b3_c6_after_field', b3_c6_m_raid_dark: 'b3_c6_m_raid_pre', b3_c6_m_raid_bad: 'b3_c6_m_raid_pre', b3_c6_m_river_wall: 'b3_c6_m_river', b3_c6_m_river_bad: 'b3_c6_m_river' };
// chapter cards and end screens (by the chapter's key, where the end screen depends on it)
const INTRO = {1: 'b3_pale_camp', 2: 'b3_c2_herds', 3: 'b3_c3_walls_night', 4: 'b3_c4_prisoners', 5: 'b3_c5_catlin', 6: 'b3_c6_lift', 7: 'b3_c7_coral'};
const END = {1: 'b3_pale_dawn', '2herd': 'b3_c2_far_night', '2wagons': 'b3_c2_flood_night', 3: 'b3_c3_walls_night', 4: 'b3_c4_dawn', 5: 'b3_c5_camp', '6quorl': 'b3_c7_coral', '6maurik': 'b3_c6_road', 7: 'b3_c7_finale'};
// each variant painted for a near-miss, and the painting it varies: they must not come out the same (the parley after differs only round the
// tent, so a smaller share of it is enough)
const PAIRS = [['b3_c2_herds_rain', 'b3_c2_herds'], ['b3_c1_parley_after', 'b3_c1_parley', .005], ['b3_c3_walls_dawn', 'b3_c3_walls'], ['b3_c2_far_dusk', 'b3_c2_flood'],
  ['b3_c2_far_night', 'b3_c2_flood_night'], ['b3_c7_shore_night', 'b3_c7_finale']];

const R = await page.evaluate(([NODES, CHAINS, INTRO, END, PAIRS]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('moi'); S = newStateMOI('Hask'); migrate(S); S.picksDue = []; save();
  const sceneOf = id => { try { const n = DLG[id](); return n ? (n.scene || null) : 'NO NODE'; } catch (e) { return 'THREW ' + e.message; } };
  const gosOf = id => { try { return (DLG[id]().ch || []).flatMap(c => [c.go, c.fail]).filter(g => typeof g === 'string'); } catch (e) { return []; } };
  const out = {nodes:{}, chains:{}, intro:{}, end:{}, used:[], bad:[]};
  Object.keys(NODES).forEach(id => { S.chapter = +id.match(/^b3_c(\d)/)[1]; out.nodes[id] = sceneOf(id); });
  Object.entries(CHAINS).forEach(([id, from]) => { S.chapter = +id.match(/^b3_c(\d)/)[1]; out.chains[id] = {own:sceneOf(id), from:sceneOf(from), leads:gosOf(from).includes(id)}; });
  Object.keys(INTRO).forEach(n => { out.intro[n] = CHAPTERS[n] && CHAPTERS[n].book === 'moi' ? CHAPTERS[n].intro.scene : 'not Book Three'; });
  Object.keys(END).forEach(k => { const n = parseInt(k), key = String(k).replace(/^\d/, ''); S.f.b3_c6_key = n === 6 ? key : 'quorl'; S.f.b3_c2_key = n === 2 ? key : null; out.end[k] = CHAPTERS[n].endScene; }); S.f.b3_c2_key = null;
  // every scene used anywhere in Book Three
  const used = new Set();
  for (let ch = 1; ch <= 7; ch++) { S.chapter = ch; Object.keys(DLG).filter(k => k.startsWith('b3_c' + ch + '_')).forEach(k => { const s = sceneOf(k); if (s && !/^THREW|^NO NODE/.test(s)) used.add(s); else if (/^THREW/.test(s || '')) out.bad.push(k + ': ' + s); }); }
  Object.keys(DLG).filter(k => k.startsWith('b3_') && !/^b3_c\d_/.test(k)).forEach(k => { const s = sceneOf(k); if (s && !/^THREW|^NO NODE/.test(s)) used.add(s); });
  Object.values(CHAPTERS).filter(c => c.book === 'moi').forEach(c => { used.add(c.intro.scene); ['quorl', 'maurik'].forEach(k => { S.f.b3_c6_key = k; used.add(c.endScene); }); ['herd', 'wagons'].forEach(k => { S.f.b3_c2_key = k; used.add(c.endScene); }); S.f.b3_c2_key = null; });
  ['quorl', 'maurik'].forEach(k => { S.f.b3_c6_key = k; Object.values(B3DECK).forEach(d => { if (d && d.scene) used.add(d.scene); }); }); // Chapter 7's reading is on the mountain or on the hill
  out.used = [...used].filter(Boolean).sort().map(k => { const sc = SCENES[k], cv = document.createElement('canvas'); cv.width = 560; cv.height = 240; let err = '', blank = true;
    try { SCENEX[k](cv, 0); SCENEX[k](cv, 4321); const m = SET.motion; SET.motion = 'off'; try { SCENEX[k](cv, 777); } finally { SET.motion = m; } // held still
      const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let lit = 0; for (let i=0;i<d.length;i+=4*97) if (d[i] + d[i + 1] + d[i + 2] > 30) lit++; blank = lit < 20; } catch (e) { err = String(e && e.stack || e).slice(0, 200); }
    return {k, scene:!!sc, cap:!!(sc && sc.cap && sc.loc && sc.sub), painter:typeof SCENEX[k] === 'function', err, blank}; });
  const m = SET.motion; SET.motion = 'off'; // held still, so only the painting differs
  try { out.pairs = PAIRS.map(([a, b, min = .15]) => { const px = k => { const cv = document.createElement('canvas'); cv.width = 560; cv.height = 240; SCENEX[k](cv, 1000); return cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; };
    try { const A = px(a), B = px(b); let diff = 0, n = 0; for (let i=0;i<A.length;i+=4*13){ n++; if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 24) diff++; } return {a, b, min, frac:diff/n}; } catch (e) { return {a, b, min, frac:0, err:String(e).slice(0, 120)}; } }); }
  finally { SET.motion = m; }
  return out; }, [NODES, CHAINS, INTRO, END, PAIRS]);

Object.entries(NODES).forEach(([id, want]) => ok(R.nodes[id] === want, `${id} shows ${want} (${R.nodes[id]})`));
Object.entries(CHAINS).forEach(([id, from]) => { const c = R.chains[id]; ok(!c.own && c.leads && (c.from === NODES[from] || (CHAINS[from] && R.chains[from] && R.chains[from].from === NODES[CHAINS[from]])),
  `${id} has no scene of its own and keeps ${from}'s picture (${c.own || 'none'} / ${c.from}${c.leads ? '' : ', not led to from it'})`); });
Object.entries(INTRO).forEach(([n, want]) => ok(R.intro[n] === want, `Chapter ${n}'s card shows ${want} (${R.intro[n]})`));
Object.entries(END).forEach(([k, want]) => ok(R.end[k] === want, `Chapter ${k}'s end screen shows ${want} (${R.end[k]})`));
ok(!R.bad.length, `every Book Three node builds ${R.bad.join('; ')}`);
R.pairs.forEach(p => ok(p.frac > p.min, `${p.a} is its own painting, not ${p.b} (${(p.frac*100).toFixed(1)}% of the picture differs${p.err ? ' — ' + p.err : ''})`));
ok(R.used.length > 30, `Book Three uses ${R.used.length} backdrops`);
R.used.forEach(u => ok(u.scene && u.cap && u.painter && !u.err && !u.blank, `${u.k}: in SCENES with a caption, painted${u.err ? ' — ' + u.err : ''}${u.blank ? ' — blank' : ''}${u.scene ? '' : ' — not in SCENES'}${u.cap ? '' : ' — no caption'}`));
ok(!errors.length, `no page errors ${errors.join(' | ')}`);
await br.close(); srv.kill();
console.log(fail ? 'FAILED' : 'all passed');
process.exit(fail);
