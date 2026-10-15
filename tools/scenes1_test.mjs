// Book One backdrops match what the text says: every node that was showing the wrong picture (a Tiste Andii on every night roof, an
// assassin on every dawn roof, the puppet and the rent on the hills all night, the man in crimson in every alley, the Tyrant still standing
// after he went into the ground, a night street at dusk and at noon, the Pale camp at the end of chapters that end somewhere else) now
// names the scene it should, and the figures are drawn only in the scenes whose text has them in it. Also: every scene a Book One node
// uses exists in SCENES, has a caption, and draws without throwing (motion on and off).
// Usage: node tools/scenes1_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const res = await page.evaluate(() => {
  const bad = [], ok = [];
  setBook('gotm');
  const fresh = (ch, f = {}) => { S = newState('Hask'); migrate(S); S.chapter = ch; S.squad = [...PORDER, 'ellis']; Object.assign(S.f, f); return S; };
  const sceneOf = (id, ch, f) => { fresh(ch, f); try { const n = DLG[id](); return n && n.scene; } catch (e) { return 'THREW ' + e.message; } };
  // 1. the nodes that were fixed, and the scene each one should show now
  const WANT = {
    c2_after_deserters:[2,'plain_dusk'],
    c3_start:[3,'city_dusk'], c3_ambush:[3,'city_dusk'], c3_after_cutpurses:[3,'city_dusk'],
    c3_cousins:[3,'alley_night'], c3_after_cousins:[3,'alley_night'], c3_alley:[3,'alley_night'], c3_after_knives:[3,'alley_night'],
    c3_close:[3,'roof'], c3_close_shapes:[3,'roof_shapes'],
    c4_roofs_arrive:[4,'roof_night'], c4_card:[4,'roof_night'], c4_guild:[4,'roof_night'], c4_meet:[4,'roof_night'], c4_meet_guild:[4,'roof_night'],
    c4_meet_andii:[4,'roof_andii'], c4_meet_run:[4,'roof_andii'], c4_vell:[4,'roof_andii'], c4_vell_tuft:[4,'roof_andii'], c4_vell_brisk:[4,'roof_andii'], c4_shield:[4,'roof_andii'], c4_aside:[4,'roof_andii'],
    c4_after_andii:[4,'roof_night'], c4_aside_body:[4,'roof_night'], c4_clan:[4,'roof_night'],
    c4_reprisal:[4,'alley_night'], c4_after_reprisal:[4,'alley_night'], c4_dawn:[4,'roof'], c4_close_end:[4,'roof'],
    c5_nightfall:[5,'hills_night'], c5_lorn_ride:[5,'hills_night'], c5_cutstone:[5,'hills_night'],
    c5_hairlock:[5,'hills_puppet'], c5_hairlock_voice:[5,'hills_puppet'], c5_hairlock_end:[5,'hills_puppet'],
    c5_rent_open:[5,'hills_rent'], c5_rent:[5,'hills_rent'], c5_through_ellis:[5,'hills_rent'], c5_hold_brisk:[5,'hills_rent'], c5_hold_ok:[5,'hills_rent'], c5_hold_fail:[5,'hills_rent'], c5_through_tuft:[5,'hills_rent'], c5_hold_tuft:[5,'hills_rent'], c5_after_rent:[5,'hills_rent'],
    c5_hound_pass:[5,'hills_night'], c5_hounds_gone:[5,'hills_night'], c5_tuft_back:[5,'hills_night'], c5_night_after:[5,'hills_night'], c5_hounds:[5,'hills_night'],
    c6_after_tyrant:[6,'garden_storm'], c6_bb_hedge:[6,'garden_storm'], c6_bb_leg:[6,'garden_after'],
    c6_cellars_run:[6,'fete_street_night'], c6_alley_streets:[6,'fete_street_night'],
    c6_alley_line:[6,'alley_night'], c6_alley_step:[6,'alley_night'], c6_after_alley:[6,'alley_crimson'], c6_alley_women:[6,'alley_night'], c6_alley_paran:[6,'alley_night'],
    c7_worry:[7,'city_day'], c7_worry_faced:[7,'city_day'], c7_worry_fail:[7,'city_day'], c7_worry_paid:[7,'city_day'], c7_after_worry:[7,'city_day'] };
  for (const [id, [ch, want]] of Object.entries(WANT)) { if (!DLG[id]) { bad.push(`${id}: no such node`); continue; } const got = sceneOf(id, ch); if (got !== want) bad.push(`${id}: scene ${got}, want ${want}`); }
  { const got = sceneOf('c7_worry', 7, {c7_worryDone:1}); if (got !== 'city_day') bad.push(`c7_worry (after the lane): scene ${got}, want city_day`); }
  { const a = sceneOf('c7_close_end', 7, {c7_key:'outlaw'}), b = sceneOf('c7_close_end', 7, {c7_key:'city'}); if (a !== 'quorl_sky') bad.push(`c7_close_end (outlaw): ${a}, want quorl_sky`); if (b !== 'quorl_hill') bad.push(`c7_close_end (city): ${b}, want quorl_hill`); }
  if (CHAPTERS[3].intro.scene !== 'city_dusk') bad.push(`chapter 3 intro scene ${CHAPTERS[3].intro.scene}, want city_dusk`);
  [[2,'plain'],[3,'roof'],[4,'roof'],[5,'hills']].forEach(([n, k]) => { if (CHAPTERS[n].endScene !== k) bad.push(`chapter ${n} endScene ${CHAPTERS[n].endScene}, want ${k}`); });
  ok.push(`${Object.keys(WANT).length + 5} fixed nodes and chapter pages point at the right scene`);
  // 2. the painters: route a scene the way the frame loop does, and record which figures it draws
  const paint = (cv, k, t) => SCENEX[k] ? SCENEX[k](cv, t) : FETE_SCENES.includes(k) ? drawEstate(cv, k, t) : (k === 'camp' || k === 'camp_night') ? drawCamp(cv, t, k === 'camp_night')
    : (k === 'tent' || k === 'fire') ? drawInterior(cv, k, t) : (k.startsWith('plain') || k.startsWith('hills')) ? drawPlain(cv, k, t)
    : (k.startsWith('city') || ['inn','cellar','room','roof','roof_night'].includes(k)) ? drawCity(cv, k, t) : drawScene(cv, k, t);
  const cv = document.createElement('canvas'); cv.style.width = '390px'; cv.style.height = '240px'; document.body.appendChild(cv);
  const real = drawFigure, figs = {};
  const figsOf = k => { if (figs[k]) return figs[k]; const seen = new Set(); drawFigure = (ctx, id, ...r) => { seen.add(id); return real(ctx, id, ...r); };
    try { paint(cv, k, 1000); } finally { drawFigure = real; } return (figs[k] = seen); };
  // every scene key any Book One node (or chapter page) uses
  const nodes = Object.keys(DLG).filter(id => !/^b[23]_/.test(id)), used = {};
  for (const id of nodes) { const ch = +((id.match(/^c(\d)_/) || [0, 0])[1]); const k = sceneOf(id, ch); if (typeof k === 'string' && k.startsWith('THREW')) continue; if (k) (used[k] ??= []).push(id); }
  const pages = ['camp', 'camp_night', 'city_dusk', 'plain', 'roof', 'hills', 'quorl_hill', 'fete_garden', 'fete_street', 'lakefront_dawn', 'road_east', 'ship'];
  const keys = [...new Set([...Object.keys(used), ...pages])].filter(k => k !== 'explore');
  const SET0 = SET.motion;
  for (const k of keys) {
    if (!['camp'].includes(k) && !SCENES[k]) bad.push(`scene ${k} (used by ${(used[k] || ['a chapter page']).slice(0, 3).join(', ')}) is not in SCENES`);
    else if (SCENES[k] && !SCENES[k].cap && !['camp_night'].includes(k)) bad.push(`scene ${k} has no caption`);
    if (!['tunnel', 'dark', 'rhivi_barrow'].includes(k) && !SCENEX[k] && !FETE_SCENES.includes(k) && !/^(camp|camp_night|tent|fire|plain|hills|city)/.test(k) && !['inn','cellar','room','roof','roof_night'].includes(k)) bad.push(`scene ${k} has no painter of its own (it would be drawn as the tunnel)`);
    for (const m of ['off', 'on']) { SET.motion = m; for (const t of [1000, 123457]) { try { paint(cv, k, t); } catch (e) { bad.push(`scene ${k} (motion ${m}) threw: ${e.message}`); } } }
  }
  SET.motion = SET0;
  ok.push(`${keys.length} Book One scenes exist and draw`);
  // 3. the figures that were on every backdrop are only where the text has them
  const ONLY = { andii: ['roof_andii'], assassin: [], hairlock: ['hills_puppet', 'hills_rent'], crimson: ['alley_crimson'], raest: ['garden_storm'] };
  for (const [fig, where] of Object.entries(ONLY)) { for (const k of keys) { fresh(+(((used[k] || [''])[0].match(/^c(\d)_/) || [0, 0])[1])); const has = figsOf(k).has(fig); delete figs[k];
      if (has && !where.includes(k)) bad.push(`${fig} is drawn in ${k} (${(used[k] || []).slice(0, 4).join(', ')})`);
      if (!has && where.includes(k)) bad.push(`${fig} is not drawn in ${k}`); } }
  const andiiNodes = (used.roof_andii || []).sort().join(','), wantAndii = ['c4_aside','c4_meet_andii','c4_meet_run','c4_shield','c4_vell','c4_vell_brisk','c4_vell_tuft'].join(',');
  if (andiiNodes !== wantAndii) bad.push(`the Andii roof is shown by ${andiiNodes}, want ${wantAndii}`);
  if ((used.roof_shapes || []).join(',') !== 'c3_close_shapes') bad.push(`the crouched shapes are shown by ${(used.roof_shapes || []).join(',')}, want c3_close_shapes`);
  if ((used.alley_crimson || []).join(',') !== 'c6_after_alley') bad.push(`the man in crimson is shown by ${(used.alley_crimson || []).join(',')}, want c6_after_alley`);
  ok.push('the Andii, the dawn shapes, the puppet, the man in crimson and the Tyrant are drawn only where the text has them');
  cv.remove(); return {bad, ok};
});
await br.close(); srv.kill();
if (errors.length) { console.log('page errors:', errors); res.bad.push('page errors'); }
if (res.bad.length) { console.log('scenes1: FAIL\n  ' + res.bad.join('\n  ')); process.exit(1); }
console.log('scenes1: ok\n  ' + res.ok.join('\n  '));
