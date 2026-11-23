/* ============ v13.4 toughness reset (David, Nov 12-13, 2026; series-polish-plan.md §0c.1) ============
   Books One to Five drop an ordinary soldier in about six good hits; from Book Six it drifted, and Books Eight to Ten were fights against
   four or five 200-health sponges, which is why munitions, pushback and the Whisper faded there. David chose "B, plus A for the tiny fights":
   health back down to the six-hit scale, and the danger given back as to-hit and damage, same layouts (fights of three enemies or fewer
   get a few more, by hand, in their chapters). This is the last word on a foe's numbers: it wraps every book's mkFoe (loaded after them).
   TOUGH[book] = {hp ×, atk +, dmg +}, on Soldier and Bridgeburner (Story keeps its own easy numbers); the deathless are left alone.
   The per-fight rows (SOLDIER_FIGHT, B1GAP.., B6GAP..B10GAP) still sit under this and are re-tuned after it. ---- */
const TOUGH = {   // calibrated Nov 13, 2026 with the Whisper bot, 10 runs a fight (series-polish-plan.md §0c; numbers in resume.md)
  moi:{hp:.75, atk:0, dmg:1}, hoc:{hp:.75, atk:1, dmg:2},
  bh:{hp:.65, atk:2, dmg:3}, rg:{hp:.75, atk:1, dmg:2},
  tth:{hp:.7, atk:4, dmg:8}, dod:{hp:.65, atk:3, dmg:6}, tcg:{hp:.7, atk:3, dmg:7},
};
/* TFIGHT[id] = {s: k, b: k}: a fight's own step on Soldier (s) and Bridgeburner (b), after TOUGH. Each step is +1 to hit, and every
   third step +1 damage; a negative step eases. Health is left alone so the fight keeps its length. Set by the per-fight pass. */
const TFIGHT = { // Nov 22, 2026 (David: "2", then "Yes and yes"): Bridgeburner raised on 101 fights of Books One, Three, Four, Six, Seven, Eight, Nine (docs/v13.63-balance/). per-fight pass, Nov 13, 2026 (Whisper bot, 20 runs a step; the won% is at the chosen step) Re-tuned Nov 18, 2026 (David: "fix both"): the fights under the floors eased, Bridgeburner in Books Seven to Ten brought toward 75-80%; taught bot, 20 runs a step (docs/v13.49-balance/).
  b8_c2_fields:{b: 2}, // v13.53.0
  b10_c7_morning:{b: 4}, // v13.53.0
  b10_c6_open:{b: 4}, // v13.53.0
  b10_c3_traces:{b: 4}, // v13.53.0
  b10_c1_spar:{b: 4}, // v13.53.0
  b9_c7_dark:{b: 4}, // v13.53.0
  b9_c6_dusk:{b: 4}, // v13.53.0
  b9_c6_train:{b: 4}, // v13.53.0
  b9_c5_dogs:{b: 8}, // v13.53.0 | Nov 22: b+8 (every trick 85%, none 85%)
  b9_c2_bout:{b: 5}, // v13.53.0 | Nov 22: b+5 (every trick 70%, none 70%)
  b9_c1_looters:{b: 2}, // v13.53.0
  b8_c5_knives:{b: 1}, // v13.53.0
  b8_c3_sellers:{b: 7}, // v13.53.0 | Nov 22: b+7 (every trick 85%, none 85%)
  b8_c3_road:{b: 3}, // v13.53.0 | Nov 22: b+3 (every trick 85%, none 80%)
  b10_c1_graves:{b: 0}, // b-5 65% | Nov 18: b-2
  b10_c1_strippers:{b: -6}, // b-10 80% | Nov 18: b-9
  b10_c2_deserters:{s: -3, b: -2}, // s-3 90%, b-3 80% | Nov 18: b-1 (floor: b:-2)
  b10_c2_dogs:{b: 7}, // b+4 70% | Nov 18: b+7
  b10_c3_wagon:{s: -8, b: -3}, // s-8 90%, b-3 65%
  b10_c4_dogs:{b: 5}, // | Nov 18: b+4
  b10_c4_foragers:{b: -1}, // b-2 65%
  b10_c4_night:{b: -1}, // b-2 65%
  b10_c5_outriders:{s: -11, b: -8}, // s at b's step: Soldier's foe never stronger than Bridgeburner's (fightrow_test); b -11 70% | Nov 18: b-8
  b10_c5_stragglers:{b: 4}, // | Nov 18: b+4
  b10_c6_beach:{b: -3}, // b-5 75% | Nov 18: b-3
  b10_c7_picket:{b: -4}, // b-4 85%
  b2_barrow:{b: 6}, // b+6 85%
  b2_batrol:{s: -3}, // | Nov 18: s-3
  b2_dryraid:{s: -2}, // s-2 90%
  b2_envoy:{b: -1}, // b-1 75%
  b2_postern:{b: -2}, // | Nov 18: b-2
  b2_pull:{s: -3, b: -2}, // s-3 95%, b-2 85%
  b2_ring:{b: -2}, // b-2 70%
  b2_silver:{b: -2}, // b-2 70%
  b3_c3_hold:{b: 2}, // b+2 70%
  b3_c3_picket:{b: 5}, // b+2 85% | Nov 22: b+5 (every trick 85%, none 80%)
  b3_c4_brawl:{b: 10}, // b+6 85% | Nov 22: b+10 (every trick 90%, none 90%)
  b3_c4_breakout:{b: 3}, // b+3 75%
  b3_c5_wellfight:{b: 5}, // b+1 90% | Nov 22: b+5 (every trick 90%, none 70%)
  b3_c6_ambush:{b: 2}, // b-1 80% | Nov 22: b+2 (every trick 70%, none 80%)
  b3_c6_field:{b: 4}, // b+1 85% | Nov 22: b+4 (every trick 90%, none 70%)
  b3_c6_landing:{s: -2, b: 1}, // s-2 90% | Nov 22: b+1 (every trick 70%, none 60%)
  b3_c7_herds:{s: -2, b: 1}, // s-2 90%, b-2 90% | Nov 22: b+1 (every trick 100%, none 95%)
  b3_c7_hunt:{b: 2}, // b+2 85%
  b3_c7_stairs:{b: 3}, // b+3 80%
  b3_c7_stakes:{b: 5}, // b+5 80%
  b4_c1_dig:{b: -1}, // b-1 85%
  b4_c1_watch:{b: 2}, // b+1 90% | Nov 22: b+2 (every trick 70%, none 70%)
  b4_c2_probe:{s: -1}, // s-1 90%
  b4_c3_poles:{s: -2, b: 5}, // s-2 95%, b+2 80% | Nov 22: b+5 (every trick 60%, none 70%)
  b4_c3_scavengers:{b: 6}, // b+3 65% | Nov 22: b+6 (every trick 75%, none 65%)
  b4_c4_picket:{b: 5}, // b+2 60% | Nov 22: b+5 (every trick 75%, none 65%)
  b4_c5_rearguard:{b: 6}, // b+3 80% | Nov 22: b+6 (every trick 90%, none 75%)
  b4_c5_wallriders:{b: 2}, // b+2 75%
  b4_c6_nest:{b: 5}, // b+2 90% | Nov 22: b+5 (every trick 80%, none 80%)
  b4_c6_patrol:{b: 3}, // b+2 85% | Nov 22: b+3 (every trick 90%, none 70%)
  b4_c7_outriders:{b: 6}, // b+4 85% | Nov 22: b+6 (every trick 85%, none 60%)
  b5_c1_lowwalk:{b: -1}, // | Nov 18: b-1
  b5_c2_hulk:{b: 3}, // b+4 75% | Nov 18: b+3
  b5_c2_looters:{b: -2}, // b-2 65%
  b5_c3_deserters:{b: -2}, // b-2 95%
  b5_c4_wraiths:{b: 2}, // b+2 70%
  b5_c5_factor:{b: 4}, // b+4 75%
  b5_c5_farm:{b: -1}, // b-1 85%
  b5_c6_channel:{b: -1}, // | Nov 18: b-1
  b5_c7_court:{b: 10}, // b+10 90%
  b5_c7_looters:{b: 2}, // b+2 80%
  b6_c1_rearguard:{b: -2}, // b-2 80%
  b6_c1_well:{b: 1}, // b+1 65%
  b6_c2_road:{s: -3, b: -1}, // s-3 100%, b-3 70% | Nov 22: b-1 (every trick 80%, none 75%)
  b6_c3_sally:{b: 3}, // b-1 90% | Nov 22: b+3 (every trick 90%, none 65%)
  b6_c3_streets:{b: 2}, // b+2 65%
  b6_c4_streets:{b: 8}, // b-1 75% | Nov 22: b+8 (every trick 75%, none 85%)
  b6_c5_village:{b: 13}, // b+4 85% | Nov 22: b+13 (every trick 85%, none 65%)
  b6_c6_night:{b: 8}, // b+2 75% | Nov 22: b+8 (every trick 80%, none 85%)
  b6_c6_wells:{b: 6}, // b+6 85%
  b7_c1_dunes:{b: -1}, // b-3 75% | Nov 18: b-1
  b7_c2_alley:{b: 2}, // b+2 65%
  b7_c2_bridge:{b: 2}, // | Nov 18: b+2
  b7_c2_gate:{b: 3}, // | Nov 18: b+2 | Nov 22: b+3 (every trick 100%, none 70%)
  b7_c3_factor:{b: 4}, // | Nov 18: b+3 | Nov 22: b+4 (every trick 75%, none 70%)
  b7_c3_farm:{s: -2, b: 1}, // s-2 95% | Nov 18: b+1
  b7_c3_road:{b: 3}, // | Nov 18: b+2 | Nov 22: b+3 (every trick 62%, none 70%)
  b7_c4_edurcamp:{b: 3}, // | Nov 18: b+3
  b7_c4_patriots:{b: 5}, // | Nov 18: b+2 | Nov 22: b+5 (every trick 62%, none 70%)
  b7_c4_riot:{b: 4}, // b+3 70% (floor: b:1) | Nov 22: b+4 (every trick 38%, none 65%)
  b7_c5_bailiff:{b: 8}, // | Nov 18: b+2 | Nov 22: b+8 (every trick 75%, none 75%)
  b7_c5_road:{b: 5}, // | Nov 18: b+4 | Nov 22: b+5 (every trick 65%, none 75%)
  b7_c5_village:{b: -2}, // b-2 70%
  b7_c6_break:{b: -2}, // b-2 90%
  b7_c6_landing:{b: 1}, // b+1 80% | Nov 22: b+1 (every trick 88%, none 60%)
  b7_c7_bridge:{b: 2}, // | Nov 18: b+3 (floor: b:2)
  b7_c7_gate:{b: 3}, // b-1 85% | Nov 18: b+2 | Nov 22: b+3 (every trick 85%, none 70%)
  b7_c7_streets:{b: 3}, // b-2 65% | Nov 18: b+1 | Nov 22: b+3 (every trick 100%, none 70%)
  b8_c1_alley:{b: 4}, // | Nov 18: b+4
  b8_c1_chancers:{b: 5}, // | Nov 18: b+2 | Nov 22: b+5 (every trick 90%, none 95%)
  b8_c1_den:{b: 7}, // | Nov 18: b+4 | Nov 22: b+7 (every trick 80%, none 65%)
  b8_c2_raid:{b: 11}, // b+2 85% | Nov 22: b+11 (every trick 90%, none 95%)
  b8_c2_town:{b: 12}, // | Nov 18: b+6 | Nov 22: b+12 (every trick 80%, none 80%)
  b8_c3_ridge:{b: 10}, // | Nov 18: b+2 | Nov 22: b+10 (every trick 75%, none 60%)
  b8_c4_drunk:{s: -5, b: 2}, // s-5 95%, b-3 70% | Nov 22: b+2 (every trick 70%, none 80%)
  b8_c4_edge:{b: -3}, // b-5 80%
  b8_c4_stores:{b: 11}, // | Nov 18: b+4 | Nov 22: b+11 (every trick 90%, none 85%)
  b8_c4_water:{b: 10}, // | Nov 18: b+4 | Nov 22: b+10 (every trick 80%, none 80%)
  b8_c5_grass:{b: 7}, // | Nov 18: b+3
  b8_c5_peddler:{b: 21}, // b+4 85% | Nov 18: b+10 | Nov 22: b+21 (every trick 90%, none 80%)
  b8_c6_masks:{b: 10}, // b+4 85% | Nov 18: b+7
  b8_c6_street:{b: -4}, // b-6 80%
  b8_c6_wall:{b: 3}, // | Nov 18: b+3
  b8_c7_doorway:{b: 15}, // | Nov 18: b+3 | Nov 22: b+15 (every trick 90%, none 85%)
  b8_c7_looters:{s: -5, b: 2}, // s-5 85%, b-6 75% | Nov 18: b-4 | Nov 22: b+2 (every trick 95%, none 85%)
  b8_c7_roofs:{b: 6}, // | Nov 18: b+2
  b9_c1_brawl:{s: -2, b: 3}, // s-2 90% | Nov 18: b+2
  b9_c1_stores:{b: 5}, // | Nov 18: b+3 | Nov 22: b+5 (every trick 95%, none 95%)
  b9_c2_drill:{b: -3}, // b-3 65%
  b9_c3_dogs:{b: 15}, // | Nov 18: b+4 | Nov 22: b+15 (every trick 80%, none 70%)
  b9_c3_farm:{b: 11}, // | Nov 18: b+6 | Nov 22: b+11 (every trick 85%, none 95%)
  b9_c4_forage:{b: 10}, // | Nov 18: b+5 | Nov 22: b+10 (every trick 75%, none 65%)
  b9_c4_raid:{b: 2}, // b-2 85% | Nov 18: b+1 | Nov 22: b+2 (every trick 85%, none 65%)
  b9_c5_bull:{b: 6}, // | Nov 18: b+3 | Nov 22: b+6 (every trick 75%, none 80%)
  b9_c5_cache:{b: 19}, // b+2 80% | Nov 18: b+8 | Nov 22: b+19 (every trick 70%, none 65%)
  b9_c6_gap:{b: 13}, // b+6 80% | Nov 18: b+9 | Nov 22: b+13 (every trick 75%, none 75%)
  b9_c6_line:{b: 6}, // b+4 80%
  b9_c7_trail:{b: 8}, // b+2 85% | Nov 18: b+6
  c1_wagon:{b: 2}, // b+2 65%
  c3_toughs:{b: 0}, // b+2 65% | Nov 18: b-1 | Nov 22: b+0 (every trick 65%, none 70%)
  c5_dig:{b: 0}, // b-2 85% | Nov 22: b+0 (every trick 75%, none 70%)
  c7_worrygate:{b: -1}, // b-2 65% | Nov 22: b-1 (every trick 90%, none 75%)
  last_accounting:{s: -2, b: -1}, // s-2 95%, b-1 75%
  reprisal:{b: 0}, // | Nov 18: b-1 | Nov 22: b+0 (every trick 80%, none 70%)
  terrace_knives_2:{b: 2}, // b-2 80% | Nov 22: b+2 (every trick 75%, none 60%)
  the_mines:{b: 1}, // b-1 80% | Nov 22: b+1 (every trick 80%, none 80%)
  accounting:{b: 1}, // v13.63.0 | Nov 22: b+1 (every trick 55%, none 70%)
  outriders:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 65%, none 70%)
  c2_deserters:{b: 1}, // v13.63.0 | Nov 22: b+1 (every trick 85%, none 70%)
  cutpurses:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 80%, none 70%)
  guild_roofs_2:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 85%, none 85%)
  c4_clan:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 85%, none 70%)
  terrace_knives:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 75%, none 70%)
  c6_bonfire:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 95%, none 85%)
  b3_c1_brawl:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 75%, none 85%)
  b3_c1_herds:{b: 1}, // v13.63.0 | Nov 22: b+1 (every trick 85%, none 90%)
  b3_c2_hill:{b: 3}, // v13.63.0 | Nov 22: b+3 (every trick 80%, none 95%)
  b3_c2_herdfight:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 95%, none 75%)
  b3_c2_wagonfight:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 95%, none 95%)
  b3_c3_camps:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 80%, none 80%)
  b3_c3_granary:{b: 7}, // v13.63.0 | Nov 22: b+7 (every trick 80%, none 75%)
  b3_c6_condors:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 100%, none 85%)
  b3_c6_raid:{b: 3}, // v13.63.0 | Nov 22: b+3 (every trick 85%, none 65%)
  b3_c7_trenchfight:{b: 6}, // v13.63.0 | Nov 22: b+6 (every trick 75%, none 70%)
  b3_c7_side:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 90%, none 75%)
  b3_c7_probe:{b: 8}, // v13.63.0 | Nov 22: b+8 (every trick 90%, none 70%)
  b3_c7_gully:{b: 8}, // v13.63.0 | Nov 22: b+8 (every trick 90%, none 75%)
  b4_c2_hill:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 90%, none 65%)
  b4_c3_raiders:{b: 4}, // v13.63.0 | Nov 22: b+4 (every trick 80%, none 75%)
  b4_c5_seep:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 90%, none 85%)
  b4_c5_deserters:{b: 7}, // v13.63.0 | Nov 22: b+7 (every trick 70%, none 80%)
  b4_c6_dusk:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 70%, none 70%)
  b4_c6_outpost:{b: 8}, // v13.63.0 | Nov 22: b+8 (every trick 60%, none 70%)
  b4_c7_spur:{b: 3}, // v13.63.0 | Nov 22: b+3 (every trick 80%, none 80%)
  b6_c2_shrine:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 80%, none 90%)
  b6_c2_village:{b: 1}, // v13.63.0 | Nov 22: b+1 (every trick 80%, none 75%)
  b6_c3_strays:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 95%, none 90%)
  b6_c4_cult:{b: 9}, // v13.63.0 | Nov 22: b+9 (every trick 90%, none 90%)
  b6_c5_deserters:{b: 6}, // v13.63.0 | Nov 22: b+6 (every trick 70%, none 60%)
  b6_c6_cult:{b: 8}, // v13.63.0 | Nov 22: b+8 (every trick 70%, none 90%)
  b6_c7_jetty:{b: 3}, // v13.63.0 | Nov 22: b+3 (every trick 85%, none 90%)
  b6_c7_guard:{b: 9}, // v13.63.0 | Nov 22: b+9 (every trick 65%, none 80%)
  b6_c7_streets:{b: 7}, // v13.63.0 | Nov 22: b+7 (every trick 75%, none 95%)
  b6_c5_boats:{b: 3}, // v13.63.0 | Nov 22: b+3 (every trick 100%, none 80%)
  b6_c7_alley:{b: 6}, // v13.63.0 | Nov 22: b+6 (every trick 90%, none 75%)
  b7_c1_riders:{b: 3}, // v13.63.0 | Nov 22: b+3 (every trick 38%, none 65%)
  b7_c6_stand:{b: 5}, // v13.63.0 | Nov 22: b+5 (every trick 100%, none 90%)
  b8_c1_hunt:{b: 2}, // v13.63.0 | Nov 22: b+2 (every trick 90%, none 70%)
};
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra);
    if (!S || u.immortal || DIFF() === DIFFS.story) return u;
    const t = TOUGH[S.book || 'gotm'], tf = B && B.id && TFIGHT[B.id], st = tf ? tf[(S.diff || 'soldier') === 'bridgeburner' ? 'b' : 's'] || 0 : 0;
    const hp = t ? t.hp : 1, atk = (t ? t.atk || 0 : 0) + st, dmg = (t ? t.dmg || 0 : 0) + Math.trunc(st / 3);
    if (hp !== 1) u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * hp));
    u.atk = (u.atk || 0) + atk;
    if (u.dmg && dmg) u.dmg = [u.dmg[0], u.dmg[1], Math.max(0, (u.dmg[2] || 0) + dmg)];
    return u; }; }
