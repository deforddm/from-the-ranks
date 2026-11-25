Tue Nov 24, 2026, 2:56 AM PST. Measured on v13.67.0. **PROPOSAL, nothing built: Bridgeburner after the falls, fire, wear damage and munitions changes.**

# Bridgeburner re-measure and proposal (v13.67.0)

Every trick carried, 8 runs a fight (`tools/balance.mjs --diff=bridgeburner --tricks --runs=8`). The twelve fights that read under 60% were run again at 20. David's target: about 75 to 80% a book, band 65 to 85, no fight under 60%.

| Book | Before tonight | Now | Fights never lost | Fights over 85% that can be raised | Left alone (first fight, survive, mortal) |
|---|---|---|---|---|---|
| One | 82% | 88% | 15 of 30 | 16 | 8 |
| Two | 81% | 85% | 6 of 24 | 15 | 4 |
| Three | 84% | 90% | 13 of 31 | 18 | 7 |
| Four | 78% | 87% | 11 of 26 | 14 | 7 |
| Five | 83% | 84% | 11 of 28 | 12 | 9 |
| Six | 84% | 92% | 12 of 24 | 18 | 3 |
| Seven | 78% | 87% | 9 of 23 | 11 | 4 |
| Eight | 86% | 95% | 17 of 24 | 18 | 4 |
| Nine | 84% | 84% | 9 of 22 | 10 | 7 |
| Ten | 84% | 90% | 7 of 19 | 7 | 8 |

**Proposed:** raise the Bridgeburner step on the 139 fights in the fifth column: one step where a fight reads 88%, two where it was never lost; then tune each at 20 runs a step until it reads 85% or under with every trick and 60% or over with none, as v13.63.0 was done. A step is +1 to the enemies' chance to hit, and every third step +1 damage. Soldier, enemy health, numbers and layouts untouched.

**Under the floor:** of twelve fights that read under 60% at 8 runs, eleven read 65 to 95% at 20 runs. One is really low: Book Two's `b2_batrol`, 50% at 20 runs. Proposed: ease it one step.

| Fight | 8 runs | 20 runs |
|---|---|---|
| Bat'rol · the flank (`b2_batrol`) | 38% | 50% |
| Pell's wagon (`c1_wagon`) | 50% | 75% |
| The vault under the Gadrobi crossing (`the_mines`) | 50% | 80% |
| The Gadrobi crossing (`c6_bonfire`) | 38% | 95% |
| The evening tide (`b5_c2_tide`) | 50% | 65% |
| The west rampart (`b5_c4_wraiths`) | 50% | 70% |
| The barracks yard (`b4_c1_brawl`) | 50% | 75% |
| The shallows (`b4_c3_scavengers`) | 25% | 80% |
| The muster gate (`b7_c4_riot`) | 50% | 65% |
| The drill field (`b9_c2_drill`) | 50% | 70% |
| The dry wash (`b9_c4_forage`) | 50% | 75% |
| The line (`b9_c6_line`) | 38% | 75% |

## Every fight proposed for a raise

### Book One

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The drowned stretch (`stone`) | 0 | 88% | 10.5 | +0 | +1 |
| The grass at night (`outriders`) | 2 | 88% | 13.0 | +2 | +3 |
| The foot of the ridge (`c2_deserters`) | 2 | 100% | 12.5 | +1 | +3 |
| The alley by the Worry Gate (`cutpurses`) | 3 | 88% | 11.5 | +2 | +3 |
| The alley behind the dye-shop (`knives`) | 3 | 88% | 11.0 | +0 | +1 |
| The dogleg in the alley (`c3_toughs`) | 3 | 100% | 8.0 | +0 | +2 |
| The Gadrobi roofs (`guild_roofs`) | 4 | 88% | 11.5 | +0 | +1 |
| The alley under the roofs (`reprisal`) | 4 | 100% | 11.5 | +0 | +2 |
| The plank home (`c4_clan`) | 4 | 88% | 6.5 | +2 | +3 |
| The ridge of small barrows (`barrow_wards`) | 5 | 100% | 15.0 | +0 | +2 |
| The lip of the dig (`c5_dig`) | 5 | 100% | 8.0 | +0 | +2 |
| The stable yard behind the gate (`house_guards`) | 6 | 88% | 12.0 | +0 | +1 |
| The upper terrace (`terrace_knives`) | 6 | 100% | 9.5 | +5 | +7 |
| The upper terrace (`terrace_knives_2`) | 6 | 100% | 8.5 | +2 | +4 |
| The last accounting (`last_accounting`) | 7 | 100% | 13.5 | -1 | +1 |
| The Worry Gate (`c7_worrygate`) | 7 | 88% | 14.0 | -1 | +0 |

### Book Two

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The quarter cistern (`b2_cistern`) | 1 | 88% | 8.0 | +0 | +1 |
| Dryj Spring (`b2_spring`) | 2 | 100% | 13.0 | +0 | +2 |
| The caravan well (`b2_tithwell`) | 2 | 88% | 13.0 | +0 | +1 |
| The horse lines (`b2_raid`) | 3 | 88% | 10.5 | +0 | +1 |
| The gap in the wagons (`b2_pull`) | 3 | 88% | 13.5 | -2 | -1 |
| The ring (`b2_ring`) | 3 | 88% | 16.0 | -2 | -1 |
| The ropes (`b2_ropes`) | 4 | 100% | 9.0 | +0 | +2 |
| At the water's edge (`b2_envoy`) | 4 | 100% | 9.5 | -1 | +1 |
| The mounds (`b2_mounds`) | 5 | 100% | 7.0 | +0 | +2 |
| The herd (`b2_herd`) | 5 | 88% | 11.0 | +0 | +1 |
| The Tregyn line (`b2_sanimon`) | 6 | 88% | 11.0 | +0 | +1 |
| Dojal Spring (`b2_dojal`) | 6 | 88% | 14.0 | +0 | +1 |
| The silver (`b2_silver`) | 6 | 88% | 12.5 | -2 | -1 |
| Aren Way (`b2_runway`) | 7 | 100% | 15.0 | +0 | +2 |
| The postern (`b2_postern`) | 7 | 88% | 16.0 | -2 | -1 |

### Book Three

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The Ilgres fire (`b3_c1_brawl`) | 1 | 88% | 6.5 | +2 | +3 |
| The far bank (`b3_c2_herdfight`) | 2 | 88% | 13.5 | +2 | +3 |
| The wagon-ford (`b3_c2_wagonfight`) | 2 | 100% | 11.0 | +5 | +7 |
| The picket on the rise (`b3_c3_picket`) | 3 | 88% | 11.5 | +5 | +6 |
| The granary (`b3_c3_granary`) | 3 | 100% | 7.5 | +7 | +9 |
| By the gap (`b3_c4_brawl`) | 4 | 100% | 8.0 | +10 | +12 |
| The ford (`b3_c5_ford`) | 5 | 88% | 14.0 | +0 | +1 |
| The burnt town (`b3_c5_town`) | 5 | 88% | 14.0 | +0 | +1 |
| The well (`b3_c5_wellfight`) | 5 | 88% | 9.0 | +5 | +6 |
| The lift field (`b3_c6_field`) | 6 | 100% | 12.0 | +4 | +6 |
| The landing ledge (`b3_c6_landing`) | 6 | 100% | 13.0 | +1 | +3 |
| The roost at dusk (`b3_c6_condors`) | 6 | 88% | 14.0 | +2 | +3 |
| The barge camp (`b3_c6_raid`) | 6 | 88% | 12.0 | +3 | +4 |
| The river (`b3_c6_ambush`) | 6 | 100% | 13.0 | +2 | +4 |
| The stair (`b3_c7_stairs`) | 7 | 100% | 5.5 | +3 | +5 |
| The side street (`b3_c7_side`) | 7 | 100% | 12.5 | +2 | +4 |
| The foot of the hill (`b3_c7_probe`) | 7 | 88% | 14.5 | +8 | +9 |
| The herd lines (`b3_c7_herds`) | 7 | 100% | 12.5 | +1 | +3 |

### Book Four

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The Chain's corner (`b4_c1_dig`) | 1 | 88% | 11.5 | -1 | +0 |
| Coltaine's Fall (`b4_c2_robbers`) | 2 | 88% | 10.0 | +0 | +1 |
| The Fall at night (`b4_c2_hill`) | 2 | 88% | 11.5 | +2 | +3 |
| The flank picket (`b4_c3_raiders`) | 3 | 88% | 9.0 | +4 | +5 |
| The poles (`b4_c3_poles`) | 3 | 100% | 9.5 | +5 | +7 |
| The far end of the line (`b4_c4_picket`) | 4 | 100% | 10.0 | +5 | +7 |
| The picket at the Wall (`b4_c5_wallriders`) | 5 | 100% | 11.0 | +2 | +4 |
| The seep (`b4_c5_seep`) | 5 | 88% | 10.5 | +5 | +6 |
| The canal city (`b4_c5_deserters`) | 5 | 100% | 14.0 | +7 | +9 |
| The spur (`b4_c6_nest`) | 6 | 100% | 9.0 | +5 | +7 |
| The probe at dusk (`b4_c6_dusk`) | 6 | 100% | 10.5 | +5 | +7 |
| The patrol after midnight (`b4_c6_patrol`) | 6 | 100% | 11.5 | +3 | +5 |
| The scrub at dusk (`b4_c7_outriders`) | 7 | 88% | 12.5 | +6 | +7 |
| The coral spur (`b4_c7_spur`) | 7 | 88% | 12.0 | +3 | +4 |

### Book Five

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The Low Walk (`b5_c1_lowwalk`) | 1 | 88% | 6.0 | -1 | +0 |
| The scouts' fire (`b5_c3_deserters`) | 3 | 100% | 6.0 | -2 | +0 |
| The reeds (`b5_c3_bank`) | 3 | 100% | 4.0 | +0 | +2 |
| Dry Gully (`b5_c4_gully`) | 4 | 100% | 7.0 | +0 | +2 |
| The wood (`b5_c4_wolves`) | 4 | 100% | 5.0 | +0 | +2 |
| The burned farm (`b5_c5_farm`) | 5 | 88% | 12.5 | -1 | +0 |
| The lake shore (`b5_c6_shore`) | 6 | 88% | 6.0 | +0 | +1 |
| The hills (`b5_c6_hills`) | 6 | 100% | 5.0 | +0 | +2 |
| The open ground (`b5_c6_flight`) | 6 | 100% | 5.5 | +0 | +2 |
| The broken shopfront (`b5_c7_looters`) | 7 | 88% | 6.0 | +2 | +3 |
| The tiers (`b5_c7_wolves`) | 7 | 100% | 10.0 | +0 | +2 |
| The barricade (`b5_c7_barricade`) | 7 | 100% | 11.5 | +0 | +2 |

### Book Six

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The wash across the road (`b6_c1_rearguard`) | 1 | 100% | 15.0 | -2 | +0 |
| The camp's edge (`b6_c1_edge`) | 1 | 100% | 9.0 | +0 | +2 |
| The shrine on the headland (`b6_c2_shrine`) | 2 | 88% | 7.0 | +5 | +6 |
| The village of the open doors (`b6_c2_village`) | 2 | 100% | 14.0 | +1 | +3 |
| The reserve's wagons (`b6_c3_sally`) | 3 | 100% | 13.5 | +3 | +5 |
| The far barrows (`b6_c3_strays`) | 3 | 88% | 8.0 | +5 | +6 |
| The surgeons' carts (`b6_c4_carts`) | 4 | 100% | 6.5 | +0 | +2 |
| The camp's edge (`b6_c4_cult`) | 4 | 100% | 11.0 | +9 | +11 |
| The forward picket (`b6_c4_streets`) | 4 | 88% | 7.5 | +8 | +9 |
| The plague village (`b6_c5_village`) | 5 | 88% | 6.5 | +13 | +14 |
| The way-station (`b6_c5_deserters`) | 5 | 88% | 13.0 | +6 | +7 |
| The boats (`b6_c5_boats`) | 5 | 100% | 13.0 | +3 | +5 |
| The baggage at the tail (`b6_c6_night`) | 6 | 88% | 13.5 | +8 | +9 |
| The last well (`b6_c6_wells`) | 6 | 100% | 7.5 | +6 | +8 |
| The city's edge (`b6_c6_cult`) | 6 | 100% | 12.5 | +8 | +10 |
| The jetty (`b6_c7_jetty`) | 7 | 100% | 12.5 | +3 | +5 |
| The City Guard (`b6_c7_guard`) | 7 | 100% | 7.0 | +9 | +11 |
| The lane (`b6_c7_streets`) | 7 | 88% | 13.5 | +7 | +8 |

### Book Seven

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The tally-shed (`b7_c1_tally`) | 1 | 88% | 19.0 | +0 | +1 |
| The canal bridge (`b7_c2_bridge`) | 2 | 100% | 5.0 | +2 | +4 |
| A farm in the valley (`b7_c3_farm`) | 3 | 88% | 17.5 | +1 | +2 |
| The horse lines (`b7_c4_patriots`) | 4 | 88% | 10.0 | +5 | +6 |
| The north lane (`b7_c5_bailiff`) | 5 | 88% | 13.0 | +8 | +9 |
| The foot of the ridge (`b7_c6_deserters`) | 6 | 100% | 5.0 | +0 | +2 |
| The water's edge (`b7_c6_landing`) | 6 | 100% | 11.5 | +1 | +3 |
| The Sixth's stretch of the bank (`b7_c6_stand`) | 6 | 100% | 6.0 | +5 | +7 |
| The gate of Letheras (`b7_c7_gate`) | 7 | 88% | 19.0 | +3 | +4 |
| The counting-house street (`b7_c7_streets`) | 7 | 88% | 17.0 | +3 | +4 |
| The bridge (`b7_c7_bridge`) | 7 | 100% | 9.5 | +2 | +4 |

### Book Eight

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The go-between's courtyard (`b8_c1_hunt`) | 1 | 100% | 13.5 | +2 | +4 |
| The Fourth's street (`b8_c1_chancers`) | 1 | 88% | 8.0 | +5 | +6 |
| The wagons on the Domin road (`b8_c2_raid`) | 2 | 100% | 8.5 | +11 | +13 |
| The square (`b8_c2_town`) | 2 | 100% | 14.5 | +12 | +14 |
| The green rows (`b8_c2_fields`) | 2 | 100% | 12.5 | +2 | +4 |
| The pilgrims' road (`b8_c3_road`) | 3 | 100% | 13.0 | +3 | +5 |
| The sellers' tent (`b8_c3_sellers`) | 3 | 88% | 9.0 | +7 | +8 |
| The water line (`b8_c4_water`) | 4 | 100% | 6.5 | +10 | +12 |
| The end tent (`b8_c4_drunk`) | 4 | 88% | 10.5 | +2 | +3 |
| The store-yard (`b8_c4_stores`) | 4 | 100% | 16.0 | +11 | +13 |
| The long grass (`b8_c5_grass`) | 5 | 100% | 7.5 | +7 | +9 |
| The dry wash (`b8_c5_peddler`) | 5 | 100% | 17.0 | +21 | +23 |
| The burned wayhouse (`b8_c5_knives`) | 5 | 100% | 11.0 | +1 | +3 |
| The dyers' row (`b8_c6_masks`) | 6 | 100% | 7.0 | +10 | +12 |
| The breach (`b8_c6_wall`) | 6 | 100% | 13.0 | +3 | +5 |
| The dyers' row (`b8_c7_looters`) | 7 | 88% | 13.5 | +2 | +3 |
| The roofs over the street (`b8_c7_roofs`) | 7 | 100% | 6.0 | +6 | +8 |
| The Fourth's door (`b8_c7_doorway`) | 7 | 100% | 6.0 | +15 | +17 |

### Book Nine

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The soldiers' tavern (`b9_c1_brawl`) | 1 | 100% | 13.0 | +3 | +5 |
| The train's yard (`b9_c2_wagons`) | 2 | 88% | 12.0 | +0 | +1 |
| The last farm (`b9_c3_farm`) | 3 | 88% | 14.0 | +11 | +12 |
| The trader's horses (`b9_c3_road`) | 3 | 100% | 9.0 | +0 | +2 |
| The water wagons (`b9_c4_raid`) | 4 | 100% | 10.0 | +2 | +4 |
| The sutler's cache (`b9_c5_cache`) | 5 | 100% | 18.0 | +19 | +21 |
| The bull (`b9_c5_bull`) | 5 | 88% | 21.0 | +6 | +7 |
| The dogs in the wash (`b9_c5_dogs`) | 5 | 100% | 8.5 | +8 | +10 |
| The gap (`b9_c6_gap`) | 6 | 88% | 11.0 | +13 | +14 |
| The stragglers' edge (`b9_c7_trail`) | 7 | 100% | 7.5 | +8 | +10 |

### Book Ten

| Fight | Chapter | Won | Typical rounds | Step now | Proposed |
|---|---|---|---|---|---|
| The burial lines by night (`b10_c1_graves`) | 1 | 100% | 14.5 | +0 | +2 |
| The water wagons (`b10_c2_deserters`) | 2 | 88% | 11.5 | -2 | -1 |
| The picket in the dark (`b10_c4_night`) | 4 | 88% | 7.5 | -1 | +0 |
| The wash (`b10_c4_dogs`) | 4 | 100% | 6.5 | +5 | +7 |
| The scrub's edge (`b10_c5_outriders`) | 5 | 100% | 24.0 | -8 | -6 |
| The landing (`b10_c6_beach`) | 6 | 88% | 9.5 | -3 | -2 |
| The empty granary (`b10_c7_picket`) | 7 | 88% | 9.0 | -4 | -3 |


## What was built (v13.68.0, Tue Nov 24, 2026 PST)

David: "do it" (6:25 AM). Each fight stepped at 20 runs until it read 85% or under with every trick; then checked with no tricks, and any fight under 60% eased one step and read again both ways. Raw record: steps.json.

| Book | Fights changed | Average, every trick (changed fights) |
|---|---|---|
| One | 13 | 80% |
| Two | 14 | 74% |
| Three | 18 | 80% |
| Four | 14 | 76% |
| Five | 12 | 82% |
| Six | 16 | 80% |
| Seven | 10 | 82% |
| Eight | 8 | 84% |
| Nine | 9 | 81% |
| Ten | 6 | 77% |

| Fight | Book | Step before | Step now | Every trick | No tricks |
|---|---|---|---|---|---|
| c2_deserters | One | +1 | +2 | 80% | 80% |
| knives | One | +0 | +2 | 90% | 65% |
| c3_toughs | One | +0 | +2 | 90% | 90% |
| guild_roofs | One | +0 | +1 | 80% | 60% |
| reprisal | One | +0 | +2 | 70% | 65% |
| c4_clan | One | +2 | +3 | 85% | 80% |
| barrow_wards | One | +0 | +2 | 75% | 80% |
| c5_dig | One | +0 | +2 | 80% | 60% |
| house_guards | One | +0 | +3 | 85% | 65% |
| terrace_knives | One | +5 | +7 | 65% | 65% |
| terrace_knives_2 | One | +2 | +3 | 85% | 65% |
| last_accounting | One | -1 | +1 | 80% | 70% |
| c7_worrygate | One | -1 | +0 | 80% | 70% |
| b2_cistern | Two | +0 | +1 | 65% | 75% |
| b2_spring | Two | +0 | +2 | 70% | 85% |
| b2_tithwell | Two | +0 | +1 | 80% | 80% |
| b2_pull | Two | -2 | +0 | 65% | 75% |
| b2_ring | Two | -2 | -1 | 80% | 75% |
| b2_ropes | Two | +0 | +4 | 75% | 80% |
| b2_envoy | Two | -1 | +1 | 75% | 65% |
| b2_mounds | Two | +0 | +2 | 80% | 90% |
| b2_herd | Two | +0 | +2 | 85% | 90% |
| b2_sanimon | Two | +0 | +2 | 60% | 75% |
| b2_silver | Two | -2 | +1 | 60% | 80% |
| b2_runway | Two | +0 | +1 | 70% | 90% |
| b2_postern | Two | -2 | -1 | 100% | 95% |
| b3_c1_brawl | Three | +2 | +4 | 75% | 95% |
| b3_c2_herdfight | Three | +2 | +3 | 80% | 85% |
| b3_c2_wagonfight | Three | +5 | +8 | 80% | 90% |
| b3_c3_picket | Three | +5 | +8 | 70% | 95% |
| b3_c3_granary | Three | +7 | +9 | 85% | 60% |
| b3_c4_brawl | Three | +10 | +12 | 85% | 90% |
| b3_c5_ford | Three | +0 | +2 | 80% | 75% |
| b3_c5_town | Three | +0 | +3 | 85% | 80% |
| b3_c5_wellfight | Three | +5 | +8 | 80% | 85% |
| b3_c6_field | Three | +4 | +6 | 70% | 65% |
| b3_c6_landing | Three | +1 | +3 | 70% | 75% |
| b3_c6_condors | Three | +2 | +5 | 85% | 85% |
| b3_c6_raid | Three | +3 | +5 | 95% | 75% |
| b3_c6_ambush | Three | +2 | +3 | 80% | 85% |
| b3_c7_stairs | Three | +3 | +10 | 85% | 85% |
| b3_c7_side | Three | +2 | +4 | 75% | 70% |
| b3_c7_probe | Three | +8 | +9 | 75% | 90% |
| b3_c7_herds | Three | +1 | +3 | 85% | 85% |
| b4_c1_dig | Four | -1 | +0 | 80% | 85% |
| b4_c2_robbers | Four | +0 | +1 | 80% | 75% |
| b4_c2_hill | Four | +2 | +3 | 65% | 70% |
| b4_c3_raiders | Four | +4 | +5 | 75% | 80% |
| b4_c3_poles | Four | +5 | +7 | 65% | 70% |
| b4_c4_picket | Four | +5 | +7 | 85% | 80% |
| b4_c5_wallriders | Four | +2 | +6 | 75% | 80% |
| b4_c5_seep | Four | +5 | +6 | 75% | 85% |
| b4_c5_deserters | Four | +7 | +9 | 85% | 90% |
| b4_c6_nest | Four | +5 | +7 | 75% | 60% |
| b4_c6_dusk | Four | +5 | +7 | 75% | 85% |
| b4_c6_patrol | Four | +3 | +7 | 70% | 80% |
| b4_c7_outriders | Four | +6 | +11 | 80% | 85% |
| b4_c7_spur | Four | +3 | +4 | 85% | 90% |
| b5_c1_lowwalk | Five | -1 | +0 | 80% | 80% |
| b5_c3_deserters | Five | -2 | +2 | 80% | 75% |
| b5_c3_bank | Five | +0 | +2 | 85% | 75% |
| b5_c4_gully | Five | +0 | +2 | 85% | 75% |
| b5_c4_wolves | Five | +0 | +6 | 80% | 70% |
| b5_c5_farm | Five | -1 | +0 | 85% | 75% |
| b5_c6_shore | Five | +0 | +8 | 75% | 65% |
| b5_c6_hills | Five | +0 | +4 | 80% | 60% |
| b5_c6_flight | Five | +0 | +2 | 80% | 90% |
| b5_c7_looters | Five | +2 | +3 | 85% | 70% |
| b5_c7_wolves | Five | +0 | +2 | 85% | 95% |
| b5_c7_barricade | Five | +0 | +2 | 85% | 80% |
| b6_c1_rearguard | Six | -2 | +2 | 75% | 65% |
| b6_c1_edge | Six | +0 | +2 | 75% | 100% |
| b6_c2_shrine | Six | +5 | +7 | 80% | 85% |
| b6_c2_village | Six | +1 | +3 | 75% | 70% |
| b6_c3_sally | Six | +3 | +5 | 80% | 85% |
| b6_c3_strays | Six | +5 | +6 | 80% | 85% |
| b6_c4_cult | Six | +9 | +13 | 70% | 85% |
| b6_c4_streets | Six | +8 | +14 | 85% | 90% |
| b6_c5_village | Six | +13 | +15 | 75% | 85% |
| b6_c5_deserters | Six | +6 | +7 | 80% | 60% |
| b6_c5_boats | Six | +3 | +7 | 85% | 85% |
| b6_c6_night | Six | +8 | +9 | 85% | 95% |
| b6_c6_cult | Six | +8 | +12 | 85% | 80% |
| b6_c7_jetty | Six | +3 | +6 | 80% | 75% |
| b6_c7_guard | Six | +9 | +11 | 85% | 85% |
| b6_c7_streets | Six | +7 | +10 | 85% | 90% |
| b7_c1_tally | Seven | +0 | +1 | 85% | 85% |
| b7_c2_bridge | Seven | +2 | +5 | 80% | 65% |
| b7_c3_farm | Seven | +1 | +4 | 70% | 60% |
| b7_c5_bailiff | Seven | +8 | +9 | 85% | 95% |
| b7_c6_deserters | Seven | +0 | +4 | 85% | 60% |
| b7_c6_landing | Seven | +1 | +2 | 85% | 75% |
| b7_c6_stand | Seven | +5 | +8 | 90% | 90% |
| b7_c7_gate | Seven | +3 | +4 | 65% | 80% |
| b7_c7_streets | Seven | +3 | +5 | 85% | 65% |
| b7_c7_bridge | Seven | +2 | +6 | 85% | 80% |
| b8_c1_hunt | Eight | +2 | +6 | 85% | 95% |
| b8_c2_town | Eight | +12 | +15 | 85% | 90% |
| b8_c2_fields | Eight | +2 | +6 | 80% | 90% |
| b8_c3_road | Eight | +3 | +9 | 85% | 75% |
| b8_c4_drunk | Eight | +2 | +9 | 85% | 70% |
| b8_c4_stores | Eight | +11 | +14 | 80% | 90% |
| b8_c6_wall | Eight | +3 | +9 | 85% | 80% |
| b8_c7_looters | Eight | +2 | +11 | 85% | 80% |
| b9_c1_brawl | Nine | +3 | +11 | 70% | 75% |
| b9_c2_wagons | Nine | +0 | +3 | 75% | 75% |
| b9_c3_farm | Nine | +11 | +12 | 80% | 80% |
| b9_c3_road | Nine | +0 | +9 | 85% | 85% |
| b9_c4_raid | Nine | +2 | +4 | 80% | 75% |
| b9_c5_cache | Nine | +19 | +21 | 80% | 90% |
| b9_c5_bull | Nine | +6 | +7 | 85% | 90% |
| b9_c5_dogs | Nine | +8 | +17 | 85% | 90% |
| b9_c6_gap | Nine | +13 | +14 | 85% | 85% |
| b10_c1_graves | Ten | +0 | +2 | 80% | 85% |
| b10_c2_deserters | Ten | -2 | +0 | 70% | 70% |
| b10_c4_night | Ten | -1 | +0 | 75% | 80% |
| b10_c4_dogs | Ten | +5 | +7 | 75% | 90% |
| b10_c5_outriders | Ten | -8 | -6 | 75% | 90% |
| b10_c6_beach | Ten | -3 | -2 | 85% | 85% |
| b2_batrol | Two | +0 | -1 | 70% | 80% |

**Left alone (Claude's call, the v13.63.0 rule):** b10_c7_picket, b6_c4_carts, b6_c6_wells, b8_c1_chancers, b8_c2_raid, b8_c5_grass, b8_c5_knives, b8_c5_peddler, b8_c6_masks, b8_c7_doorway, b8_c7_roofs, b9_c7_trail, b8_c3_sellers, b8_c4_water. The first twelve still read 95% or more at seven to nine extra steps; b8_c3_sellers and b8_c4_water read 90% at nine extra steps (+16 and +19). Steps do not decide these fights, so they stay where they were.

**Over 85% with every trick, kept (Claude's call):** knives 90, c3_toughs 90, b2_postern 100, b3_c6_raid 95, b7_c6_stand 90. One more step drops each to 60% or under on one of the two readings, so the floor wins over the ceiling.
