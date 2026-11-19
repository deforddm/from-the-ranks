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
const TFIGHT = { // per-fight pass, Nov 13, 2026 (Whisper bot, 20 runs a step; the won% is at the chosen step) Re-tuned Nov 18, 2026 (David: "fix both"): the fights under the floors eased, Bridgeburner in Books Seven to Ten brought toward 75-80%; taught bot, 20 runs a step (docs/v13.49-balance/).
  b8_c2_fields:{b: 2}, // v13.53.0
  b10_c7_morning:{b: 4}, // v13.53.0
  b10_c6_open:{b: 4}, // v13.53.0
  b10_c3_traces:{b: 4}, // v13.53.0
  b10_c1_spar:{b: 4}, // v13.53.0
  b9_c7_dark:{b: 4}, // v13.53.0
  b9_c6_dusk:{b: 4}, // v13.53.0
  b9_c6_train:{b: 4}, // v13.53.0
  b9_c5_dogs:{b: 3}, // v13.53.0
  b9_c2_bout:{b: 2}, // v13.53.0
  b9_c1_looters:{b: 2}, // v13.53.0
  b8_c5_knives:{b: 1}, // v13.53.0
  b8_c3_sellers:{b: 4}, // v13.53.0
  b8_c3_road:{b: 1}, // v13.53.0
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
  b3_c3_picket:{b: 2}, // b+2 85%
  b3_c4_brawl:{b: 6}, // b+6 85%
  b3_c4_breakout:{b: 3}, // b+3 75%
  b3_c5_wellfight:{b: 1}, // b+1 90%
  b3_c6_ambush:{b: -1}, // b-1 80%
  b3_c6_field:{b: 1}, // b+1 85%
  b3_c6_landing:{s: -2}, // s-2 90%
  b3_c7_herds:{s: -2, b: -2}, // s-2 90%, b-2 90%
  b3_c7_hunt:{b: 2}, // b+2 85%
  b3_c7_stairs:{b: 3}, // b+3 80%
  b3_c7_stakes:{b: 5}, // b+5 80%
  b4_c1_dig:{b: -1}, // b-1 85%
  b4_c1_watch:{b: 1}, // b+1 90%
  b4_c2_probe:{s: -1}, // s-1 90%
  b4_c3_poles:{s: -2, b: 2}, // s-2 95%, b+2 80%
  b4_c3_scavengers:{b: 3}, // b+3 65%
  b4_c4_picket:{b: 2}, // b+2 60%
  b4_c5_rearguard:{b: 3}, // b+3 80%
  b4_c5_wallriders:{b: 2}, // b+2 75%
  b4_c6_nest:{b: 2}, // b+2 90%
  b4_c6_patrol:{b: 2}, // b+2 85%
  b4_c7_outriders:{b: 4}, // b+4 85%
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
  b6_c2_road:{s: -3, b: -3}, // s-3 100%, b-3 70%
  b6_c3_sally:{b: -1}, // b-1 90%
  b6_c3_streets:{b: 2}, // b+2 65%
  b6_c4_streets:{b: -1}, // b-1 75%
  b6_c5_village:{b: 4}, // b+4 85%
  b6_c6_night:{b: 2}, // b+2 75%
  b6_c6_wells:{b: 6}, // b+6 85%
  b7_c1_dunes:{b: -1}, // b-3 75% | Nov 18: b-1
  b7_c2_alley:{b: 2}, // b+2 65%
  b7_c2_bridge:{b: 2}, // | Nov 18: b+2
  b7_c2_gate:{b: 2}, // | Nov 18: b+2
  b7_c3_factor:{b: 3}, // | Nov 18: b+3
  b7_c3_farm:{s: -2, b: 1}, // s-2 95% | Nov 18: b+1
  b7_c3_road:{b: 2}, // | Nov 18: b+2
  b7_c4_edurcamp:{b: 3}, // | Nov 18: b+3
  b7_c4_patriots:{b: 2}, // | Nov 18: b+2
  b7_c4_riot:{b: 1}, // b+3 70% (floor: b:1)
  b7_c5_bailiff:{b: 2}, // | Nov 18: b+2
  b7_c5_road:{b: 4}, // | Nov 18: b+4
  b7_c5_village:{b: -2}, // b-2 70%
  b7_c6_break:{b: -2}, // b-2 90%
  b7_c6_landing:{b: 0}, // b+1 80%
  b7_c7_bridge:{b: 2}, // | Nov 18: b+3 (floor: b:2)
  b7_c7_gate:{b: 2}, // b-1 85% | Nov 18: b+2
  b7_c7_streets:{b: 1}, // b-2 65% | Nov 18: b+1
  b8_c1_alley:{b: 4}, // | Nov 18: b+4
  b8_c1_chancers:{b: 3}, // | Nov 18: b+2
  b8_c1_den:{b: 5}, // | Nov 18: b+4
  b8_c2_raid:{b: 3}, // b+2 85%
  b8_c2_town:{b: 9}, // | Nov 18: b+6
  b8_c3_ridge:{b: 2}, // | Nov 18: b+2
  b8_c4_drunk:{s: -5, b: -3}, // s-5 95%, b-3 70%
  b8_c4_edge:{b: -3}, // b-5 80%
  b8_c4_stores:{b: 8}, // | Nov 18: b+4
  b8_c4_water:{b: 6}, // | Nov 18: b+4
  b8_c5_grass:{b: 7}, // | Nov 18: b+3
  b8_c5_peddler:{b: 12}, // b+4 85% | Nov 18: b+10
  b8_c6_masks:{b: 10}, // b+4 85% | Nov 18: b+7
  b8_c6_street:{b: -4}, // b-6 80%
  b8_c6_wall:{b: 3}, // | Nov 18: b+3
  b8_c7_doorway:{b: 6}, // | Nov 18: b+3
  b8_c7_looters:{s: -5, b: -3}, // s-5 85%, b-6 75% | Nov 18: b-4
  b8_c7_roofs:{b: 6}, // | Nov 18: b+2
  b9_c1_brawl:{s: -2, b: 3}, // s-2 90% | Nov 18: b+2
  b9_c1_stores:{b: 3}, // | Nov 18: b+3
  b9_c2_drill:{b: -3}, // b-3 65%
  b9_c3_dogs:{b: 8}, // | Nov 18: b+4
  b9_c3_farm:{b: 9}, // | Nov 18: b+6
  b9_c4_forage:{b: 5}, // | Nov 18: b+5
  b9_c4_raid:{b: 1}, // b-2 85% | Nov 18: b+1
  b9_c5_bull:{b: 4}, // | Nov 18: b+3
  b9_c5_cache:{b: 11}, // b+2 80% | Nov 18: b+8
  b9_c6_gap:{b: 9}, // b+6 80% | Nov 18: b+9
  b9_c6_line:{b: 6}, // b+4 80%
  b9_c7_trail:{b: 8}, // b+2 85% | Nov 18: b+6
  c1_wagon:{b: 2}, // b+2 65%
  c3_toughs:{b: -1}, // b+2 65% | Nov 18: b-1
  c5_dig:{b: -2}, // b-2 85%
  c7_worrygate:{b: -2}, // b-2 65%
  last_accounting:{s: -2, b: -1}, // s-2 95%, b-1 75%
  reprisal:{b: -1}, // | Nov 18: b-1
  terrace_knives_2:{b: -2}, // b-2 80%
  the_mines:{b: -1}, // b-1 80%
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
