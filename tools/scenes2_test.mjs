// v6.5.x (Book Two backdrops): every Book Two node shows a painting that matches what its text describes. The nodes re-pointed at new or
// better-fitting scenes show exactly the scene meant for them (the Vathar the afternoon before, at dusk, at night and at first light; Gelor
// after the charge; the hills above Sanimon; Balahn; Aren from the north wall and inside the gate; and the rest); the chapter pages and the
// Deck readings use them too; every scene key any Book Two node, intro, end page or reading uses is registered in SCENES with a caption,
// and its painter draws on an offscreen canvas without throwing, with motion on and off.
// The near-misses after that, painted too: the Vathar the afternoon after the bridges; Sanimon's field after the battle and the Fist's
// standard at dusk; the camp at night outside Hissar and at mid-morning with the water pits; the Sekala with the Seventh dug in, at the
// afternoon crossing, from the west bank and the moment the river stands up; the Geleen at moonrise; Aren harbour at night and in the fog;
// riders on the Chapter 3 skyline; the basin under its white sky. Each painting's sky is as light or as dark as its hour.
// Usage: node tools/scenes2_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };

// node -> the scene it must show (chapter in brackets: the state it is called in)
const WANT = {
  b2_crows:'b2_camp_dawn', b2_c1_deck:'b2_camp_dawn', b2_c1_card:'b2_camp_dawn',
  b2_well_go:'b2_caravan_well', b2_after_well:'b2_caravan_well', b2_back_spring:'b2_dryj_dusk', b2_west_count:'b2_sekala_eve', b2_end:'b2_sekala_after',
  b2_raid_star:'b2_camp_dawn', b2_raid_back:'b2_camp_dawn', b2_patha_arrive:'b2_gelor_dusk', b2_dusk:'b2_gelor_after', b2_dom:'b2_gelor_after', b2_c3_end:'b2_gelor_after',
  b2_vathar_arrive:'b2_vathar_eve', b2_silanda_off:'b2_vathar_late', b2_envoys:'b2_vathar_dusk', b2_carriages_arrive:'b2_vathar_night', b2_dawn:'b2_vathar_dawn',
  b2_ration:'b2_nenoth_dusk', b2_dusk5:'b2_nenoth_dusk',
  b2_c6_start:'b2_sanimon_hills', b2_c6_deck:'b2_sanimon_hills', b2_c6_card:'b2_sanimon_hills', b2_sdawn:'b2_sanimon_dawn', b2_sdawn2:'b2_sanimon_dawn', b2_dojal_arrive:'b2_dojal',
  b2_c7_start:'b2_balahn', b2_c7_deck:'b2_balahn', b2_c7_card:'b2_balahn', b2_aren_arrive:'b2_aren_city_day', b2_evening:'b2_aren_city_dusk', b2_muster:'b2_aren_city_dawn',
  b2_sortie:'b2_aren_sortie', b2_basin:'b2_aren_noon', b2_way_dead:'b2_aren_way_dusk',
  // the near-misses
  b2_camp_arrive:'b2_camp_night', b2_basin_arrive:'b2_basin', b2_wash_hit:'b2_basin', b2_after_batrol:'b2_basin',
  b2_ford_arrive:'b2_sekala_dug', b2_cross_jam:'b2_sekala_cross', b2_west_arrive:'b2_sekala_west', b2_after_west:'b2_sekala_west', b2_blown:'b2_sekala_blown',
  b2_water:'b2_camp_pits', b2_vcross:'b2_vathar_cross', b2_field_arrive:'b2_sanimon_field', b2_warchief:'b2_sanimon_chiefs',
  b2_split:'b2_geleen_moon', b2_split2:'b2_geleen_moon', b2_c6_end:'b2_geleen_moon', b2_quay2:'b2_harbour_night', b2_quay4:'b2_harbour_fog' };
// and the moments these scenes are NOT: the noon battle at the Vathar, the charge at Gelor, the Khundryl at Sanimon, the walls from the road
const STILL = { b2_bridges:'b2_vathar', b2_after_bridge:'b2_vathar', b2_after_ring:'b2_charge', b2_after_sanimon:'b2_sanimon', b2_farbank_arrive:'b2_after', b2_dryj_arrive:'b2_dryj_spring', b2_way_go:'b2_aren_walls', b2_way_arrive:'b2_aren_walls', b2_shallows_arrive:'b2_gelor', b2_punch:'b2_silanda' };

const r = await page.evaluate(({ WANT, STILL }) => {
  const chs = [B2CH1, B2CH2, B2CH3, B2CH4, B2CH5, B2CH6, B2CH7], owner = {};
  chs.forEach((c, i) => Object.keys(c.dlg).forEach(k => { owner[k] = i + 1; }));
  const fresh = ch => { S = newStateDG('Hask'); S.chapter = ch; S.lvl = 6; S.xp = LEVELS[5]; S.chain = {water:6, column:20}; S.f.b2_key = 'daughters'; S.f.b2_c2_key = 'water'; S.f.b2_c3_key = 'pull'; migrate(S); };
  const sceneOf = id => { fresh(owner[id] || 1); try { return DLG[id]().scene || null; } catch (e) { return 'THREW: ' + e.message; } };
  const got = {}, still = {};
  for (const id of Object.keys(WANT)) got[id] = DLG[id] ? sceneOf(id) : 'MISSING NODE';
  for (const id of Object.keys(STILL)) still[id] = DLG[id] ? sceneOf(id) : 'MISSING NODE';
  // every scene key used anywhere in Book Two: nodes (called in their own chapter), intros, end pages, the Deck readings
  const used = {}; const use = (k, from) => { if (k) (used[k] = used[k] || []).push(from); };
  let threw = [];
  for (const id of Object.keys(owner)) { fresh(owner[id]); try { use(DLG[id]().scene, id); } catch (e) { threw.push(id + ': ' + e.message); } }
  chs.forEach((c, i) => { if (c.intro) use(c.intro.scene, 'intro ' + (i + 1)); use(c.endScene, 'end ' + (i + 1)); });
  Object.entries(B2DECK).forEach(([n, d]) => use(d.scene, 'deck ' + n));
  const missing = Object.keys(used).filter(k => !SCENES[k] || !SCENES[k].cap || !SCENES[k].loc || !SCENES[k].sub).map(k => k + ' (' + used[k].slice(0, 3).join(', ') + ')');
  const noPainter = Object.keys(used).filter(k => typeof SCENEX[k] !== 'function');
  const drawErr = []; const was = SET.motion;
  for (const mo of ['off', 'on']) { SET.motion = mo; for (const k of Object.keys(used)) { if (typeof SCENEX[k] !== 'function') continue; const cv = document.createElement('canvas'); cv.width = 560; cv.height = 240;
    try { SCENEX[k](cv, 1234); SCENEX[k](cv, 98765); const px = cv.getContext('2d').getImageData(280, 120, 1, 1).data; if (px[3] === 0) drawErr.push(k + ' drew nothing (' + mo + ')'); } catch (e) { drawErr.push(k + ' (' + mo + '): ' + e.message); } } }
  SET.motion = was;
  return { got, still, used:Object.keys(used).length, missing, noPainter, drawErr, threw,
    intro6:B2CH6.intro.scene, intro7:B2CH7.intro.scene, end3:B2CH3.endScene, deck:[1, 6, 7].map(n => B2DECK[n].scene),
    intro3:B2CH3.intro.scene, intro3cap:B2CH3.intro.cap, end6:B2CH6.endScene, cross:(() => { fresh(2); S.f.b2_mincer = 1; return DLG.b2_cross().scene; })(),
    caps2:{basin:SCENES.b2_basin.cap, after:SCENES.b2_after.cap, harbour:SCENES.b2_harbour.cap},
    sky:Object.fromEntries(['b2_basin', 'b2_camp_pits', 'b2_sekala_cross', 'b2_sekala_west', 'b2_sekala_blown', 'b2_vathar_cross', 'b2_sanimon_field', 'b2_odhan_day',
      'b2_camp_night', 'b2_harbour_night', 'b2_geleen_moon', 'b2_sanimon_chiefs', 'b2_odhan_riders', 'b2_sekala_dug'].map(k => { const cv = document.createElement('canvas'); cv.width = 560; cv.height = 240; SCENEX[k](cv, 4321);
      const d = cv.getContext('2d').getImageData(0, 0, cv.width, Math.round(cv.height*.3)).data; let L = 0, n = 0; for (let i=0;i<d.length;i+=16){ L += .3*d[i] + .59*d[i+1] + .11*d[i+2]; n++; } return [k, Math.round(L/n)]; })),
    caps:Object.keys(WANT).map(id => WANT[id]).filter((k, i, a) => a.indexOf(k) === i).filter(k => !(SCENES[k] && SCENES[k].cap && SCENES[k].cap.length < 200)) };
}, { WANT, STILL });

for (const [id, k] of Object.entries(WANT)) ok(r.got[id] === k, `${id} shows ${k}${r.got[id] === k ? '' : ' (got ' + r.got[id] + ')'}`);
for (const [id, k] of Object.entries(STILL)) ok(r.still[id] === k, `${id} still shows ${k}${r.still[id] === k ? '' : ' (got ' + r.still[id] + ')'}`);
ok(r.intro6 === 'b2_sanimon_hills' && r.intro7 === 'b2_balahn', `the Sanimon and Balahn chapter pages open on their own paintings (${r.intro6}, ${r.intro7})`);
ok(r.intro3 === 'b2_odhan_riders' && /riders/.test(r.intro3cap), `the Chapter 3 page shows the riders its caption names on the skyline (${r.intro3})`);
ok(r.end6 === 'b2_geleen_moon', `Chapter 6 ends at night under the moon, as its end page says (${r.end6})`);
ok(r.cross === 'b2_sekala_cross', `the afternoon crossing at the Sekala shows the afternoon crossing (${r.cross})`);
ok(/white sky/.test(r.caps2.basin) && r.sky.b2_basin > 170, `the Vin'til Basin's caption says white sky and the painting's sky is white (sky ${r.sky.b2_basin})`);
ok(!/far bank a long line/.test(r.caps2.after) && !/grey harbour/.test(r.caps2.harbour), 'the Vathar-after and harbour captions describe what is painted');
{ const day = ['b2_basin', 'b2_camp_pits', 'b2_sekala_cross', 'b2_sekala_west', 'b2_sekala_blown', 'b2_vathar_cross', 'b2_sanimon_field', 'b2_odhan_day'], dark = ['b2_camp_night', 'b2_harbour_night', 'b2_geleen_moon'];
  const badDay = day.filter(k => !(r.sky[k] > 140)), badDark = dark.filter(k => !(r.sky[k] < 60)), dusk = ['b2_sanimon_chiefs', 'b2_odhan_riders', 'b2_sekala_dug'].filter(k => !(r.sky[k] > 25 && r.sky[k] < 150));
  ok(!badDay.length && !badDark.length && !dusk.length, `each painting's sky is as light as its hour: day bright, night dark, dusk and first light between${badDay.length + badDark.length + dusk.length ? ': ' + [...badDay, ...badDark, ...dusk].map(k => k + '=' + r.sky[k]).join(', ') : ''}`); }
ok(r.end3 === 'b2_gelor_after', `Chapter 3 ends on Gelor after the charge, not the charge (${r.end3})`);
ok(r.deck.join() === 'b2_camp_dawn,b2_sanimon_hills,b2_balahn', `the Deck readings at first light, above Sanimon and in Balahn sit on matching paintings (${r.deck.join(', ')})`);
ok(!r.threw.length, `every Book Two node can be called in its own chapter${r.threw.length ? ': ' + r.threw.slice(0, 5).join(' | ') : ''}`);
ok(r.used > 40 && !r.missing.length, `all ${r.used} scene keys Book Two uses are in SCENES with a header and caption${r.missing.length ? ': ' + r.missing.join(' | ') : ''}`);
ok(!r.noPainter.length, `and each has a painter${r.noPainter.length ? ': missing ' + r.noPainter.join(', ') : ''}`);
ok(!r.drawErr.length, `every one draws on an offscreen canvas, motion on and off${r.drawErr.length ? ': ' + r.drawErr.join(' | ') : ''}`);
ok(!r.caps.length, `the new captions are there and short enough to sit under a phone-width picture${r.caps.length ? ': ' + r.caps.join(', ') : ''}`);

// on the page: the Vathar the afternoon before, as the owner saw it
await page.evaluate(() => { S = newStateDG('Hask'); S.chapter = 4; migrate(S); save(); talk('b2_vathar_arrive'); });
await page.waitForTimeout(400);
const shown = await page.evaluate(() => ({ kind:G.sceneKind, cap:(document.querySelector('.scene .cap') || {}).textContent || '', sub:(document.querySelector('.hud .sub') || {}).textContent || '' }));
ok(shown.kind === 'b2_vathar_eve' && /Foolish Dog/.test(shown.cap) && !/bridges/.test(shown.cap) && /Afternoon/.test(shown.sub), `the near bank in the afternoon: no bridges, no army (${shown.sub} · ${shown.cap.slice(0, 60)}…)`);

// and on the page: the night the squad comes into camp
await page.evaluate(() => { S = newStateDG('Hask'); S.chapter = 1; migrate(S); save(); talk('b2_camp_arrive'); });
await page.waitForTimeout(400);
const shown2 = await page.evaluate(() => ({ kind:G.sceneKind, cap:(document.querySelector('.scene .cap') || {}).textContent || '', sub:(document.querySelector('.hud .sub') || {}).textContent || '' }));
ok(shown2.kind === 'b2_camp_night' && /Night/.test(shown2.sub) && /Wickans/.test(shown2.cap), `coming into camp at night shows the camp at night (${shown2.sub} · ${shown2.cap.slice(0, 50)}…)`);

ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' || ') : ''));
await br.close(); srv.kill();
process.exit(fail);
