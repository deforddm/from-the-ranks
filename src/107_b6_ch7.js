/* ============ Book Six, Chapter 7: Malaz City, and the end of Book Six ============ */
/* The Third at sea and in Malaz City (The Bonehunters ch 18-23; bh-canon §2 ch 18-23, §4, §5, §6, §7). Phase 1, at sea on a transport
   of Nok's fleet: the Edur lines north and south, a wall of water, and a wall of earth that cannot be there (the ambush, seen from a
   transport's rail; Ch5's key read as one line: 'sail' aboard since the first day, 'wait' a day held on the shore). Sepik seen from
   the rail, its harbour wrecked, no landfall. Phase 2: the Nemil supply ships run for home; the Perish's great grey ships come alongside
   and a Grey Helm is sent across to the squad's transport (Ottar, b6Join at sea); the Grey Helms drill on the transport's waist (the
   trick, The Grey Helms' Wall, ✦ Might 17). Phase 3: the passage through the cold realm (ice, roaring water, ships that seem to fly,
   wolves a long way off); out of it, the Jakatakan fleet. Phase 4, Malaz City's waterfront: a neighbouring jetty to the marines', the
   city turned on its Wickans, Wickan families come down to the water; the mob on the jetty (b6_c7_jetty, main, stage2); the City Guard
   come for the families (b6_c7_guard); the shouts from the main jetty (a Fist's voice; the army turned, as soldiers tell it); flat bangs
   down the waterfront; Mock's Hold as a silhouette; the Red Blades gone up to it (rumour). Phase 5, the fleet's horns: the roads, the
   key S.f.b6_c7_key: 'adjunct' (out of the harbour with the fleet; Book Seven imports it), 'jetty' (left on the jetty, in Malaz City),
   'wickans' (into the streets after the Wickans, b6_c7_streets, and gone with them). Then the finale (B6CH7.finale, read by 37's
   showFinale, extended here for two squads): the Third's road and pages, the Fourth's road (S.f.b6_fourthRoad) and pages (from
   B6CH6.fates when Chapter 6 has written them), and Where the books meet. Never Mock's Hold (a silhouette at most), the Centre District,
   Admiral Bridge, Raven Hill, the Mouse, the Hanged Man, Smiley's, Fiddler's tenement, the Deadhouse, the First Throne, the Froth Wolf
   or the Silanda; never a word with Tavore, Keneb, Quick Ben, Kalam, Fiddler, Gesler, Hellian, Faradan Sort, Sinn or the Perish
   Destriant. Notes: docs/bh-ch7-notes.md. */
/* FOR THE ARTIST (107b): names this file uses.
   Items: ART['item/b6_c7_greyhelmshield'], ART['item/b6_c7_malazcloak'] (this file sets a borrowed placeholder with ??= so the lint
   passes before the art lands; a plain assignment in 107b replaces it).
   Figures: ottar (the recruit), b6_rioter, b6_cityguard (the brief's). This file's foes use kinds that are already drawn: b6_c7_ringleader
   ('bruiser'), b6_c7_guardsgt ('b2soldier'). NPCs: b4_c1_hollet (the captain), b2soldier (the old soldier, a guard), b5_c2_pilot (the
   transport's master), greysword (Grey Helms on deck), warlock (a Wickan boy), b5_c1_tilewoman (a Wickan grandmother), b5_c3_bargeman
   (a dispatch-boat sailor).
   Backdrops (SCENEX): the brief's b6_sea and b6_malaz; this file's b6_c7_ambush, b6_c7_realm, b6_c7_jetty, b6_c7_lanes, b6_c7_finale
   borrow drawings until 107b paints them (??= here, lazy).
   Ground (TILEX): b6_c7_deck and b6_c7_deckcold (the transport's deck: . deck, - an open grating, # rail and bulkhead, m mast, h hatch,
   R the rail, F the cook's sandbox, G the Grey Helms' drill, O the bow), b6_c7_quay (the waterfront: ~ harbour, . planking, , stone,
   # the harbour sheds, H the plank to the transport, X the main jetty, W the Wickan families, F a tar-barrel fire, A an alley mouth,
   K the Hold over the roofs, M the street mouth, < the way into the streets), b6_c7_streets (the lanes behind the waterfront, at dusk:
   as Book Five's streets, with W a Wickan house, G the landward gate, > back to the water), and for fights b6_c7_wharf (# the harbour)
   and b6_c7_lanefight. Each borrows Book Five's ground (??=) until 107b paints it. In fights 't' is cover. */

/* ---- small helpers (b67: Book Six, Chapter Seven) ---- */
const b67L = (id, n) => { if (b6In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b67Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b6In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b67If = (id, s) => b6In(id) ? (typeof s === 'function' ? s() : s) : '';
const b67Who = () => (ROLL() && ROLL().who) || 'sgt';
const b67Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b67Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b67V = (id, you, they) => id === 'sgt' ? you : they;
const b67Ph = () => S.f.b6_c7_ph || 1;
const b67Key = () => S.f.b6_c7_key || null;
const b67Here = () => (S.squad || []).filter(id => id !== 'sgt' && b6In(id));
const b67And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b67Cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const b67Has = id => !!(S.kit && S.kit.includes(id));
const b67Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const B67_SHE = ['haddat', 'sathi', 'marrow', 'hessa', 'mirrel', 'rasp', 'brisk', 'kettle', 'tuft', 'ellis', 'sohra', 'greysword', 'ressa'];
const b67He = id => B67_SHE.includes(id) ? 'she' : 'he';
const b67His = id => B67_SHE.includes(id) ? 'her' : 'his';
const b67Him = id => B67_SHE.includes(id) ? 'her' : 'him';
/* the earlier keys, each read with a default (a --from=7 save may have taken either; an unset key reads as the quieter road) */
const b67Buried = () => S.f.b6_c1_key === 'bury';                      // Ch1: the barrows put back the night before the siege
const b67WentIn = () => S.f.b6_c3_key === 'in';                        // Ch3: into the burning streets (the mortal fight); else the gate
const b67Sailed = () => S.f.b6_c5_key === 'sail';                      // Ch5: aboard on the first day; else held a day on the shore
const b67Bone = () => !!S.f.b6_bone;                                   // Ch5: the finger bone taken up
const b67FRoad = () => ['highfist', 'hanarara', 'home'].includes(S.f.b6_fourthRoad) ? S.f.b6_fourthRoad : 'highfist';
/* the squad's dead from Y'Ghatan's streets (Ch3's mortal fight: killed in Book Six, so no 'from') */
const b67Fell3 = () => Object.keys(S.dead || {}).filter(id => S.dead[id] && S.dead[id].ch === 3 && !S.dead[id].from && TPL[id]);
/* where the chapter goes on from, if a "Not now" stepped away between its steps */
const b67Next = () => { const p = b67Ph();
  if (p < 2) return !S.f.b6_c7_ambushDone ? 'b6_c7_ambush' : 'b6_c7_sepik';
  if (p < 3) return !S.f.b6_c7_ottarMet ? 'b6_c7_perish' : 'b6_c7_realm';
  if (p < 4) return 'b6_c7_jakatakan';
  if (p < 5) return !S.f.b6_c7_mobDone ? 'b6_c7_mob' : !S.f.b6_c7_guardDone ? 'b6_c7_guard_come' : 'b6_c7_signal';
  return !b67Key() ? 'b6_c7_roads' : b67Key() === 'wickans' && !S.f.b6_c7_streetsDone ? 'b6_c7_lanes_start' : 'b6_c7_last'; };
const b67Area = () => { const p = b67Ph(); return p < 3 ? 'b6_c7_transport' : p < 4 ? 'b6_c7_cold' : S.f.b6_c7_inLanes ? 'b6_c7_lanes' : 'b6_c7_jetty'; };
const b67Scene = () => { const p = b67Ph(); return p < 3 ? 'b6_sea' : p < 4 ? 'b6_c7_realm' : 'b6_malaz'; };

/* ---- the ground, the backdrops and the item art: borrowed until 107b paints them (lazy, so a later drawing wins) ---- */
TILEX.b6_c7_deck ??= (...a) => TILEX.b5_c2_hulk(...a);
TILEX.b6_c7_deckcold ??= (...a) => TILEX.b5_c2_hulk(...a);
TILEX.b6_c7_quay ??= (...a) => TILEX.b5_c2_quay(...a);
TILEX.b6_c7_streets ??= (...a) => TILEX.b5_c7_streets(...a);
TILEX.b6_c7_wharf ??= (...a) => TILEX.b5_c2_wharf(...a);
TILEX.b6_c7_lanefight ??= (...a) => TILEX.b5_c7_streets(...a);
{ const like = {b6_c7_ambush:'b6_sea', b6_c7_realm:'b3_c4_cold_night', b6_c7_jetty:'b6_malaz', b6_c7_lanes:'b5_c7_night', b6_c7_finale:'b6_sea'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || SCENEX.b6_sea || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof ART !== 'undefined') { ART['item/b6_c7_greyhelmshield'] ??= ART['item/b3_c3_shield']; ART['item/b6_c7_malazcloak'] ??= ART['item/b2_wickanhide']; }

/* ---- the Grey Helms' Wall: Blue Fire's mechanics (bluefire, t_bluefire) in the Perish's words. Not a throw: a shield wall that goes
   forward four paces at a run and through whatever is in front of it. Twice a chapter (one more from level 5): 2d6+level damage to
   everything in a 3×3, squad included, and everything caught is reeling: −3 to hit through the next round. Not sorcery. ---- */
Object.assign(TRICKS, {
  b6_c7_wall:{name:'The Grey Helms\' Wall', ch:7, use:'chapter', n:2, ab:'t_b6_c7_wall', where:'the Grey Helms\' drill on a transport\'s waist, at sea',
    lore:'The Perish fight in a wall of tall shields with the wolf on them, and the wall does not stand still: on a word it goes forward at a run, four paces, and whatever is in front of it goes down or goes over. The Grey Helms drilled it on the transport\'s waist every morning, and one of the squad learned the word.',
    get fx(){ return `${trickTimes('b6_c7_wall')} a chapter: call the wall, range 4. 2d6${lvDmg() ? '+' + lvDmg() : ''} to everything in a 3×3, squad included (stand clear of it), and everything caught is reeling: −3 to hit through the next round. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b6_c7_wall:{name:TRICKS.b6_c7_wall.name, trick:'b6_c7_wall', aoe:1, range:4, desc:()=>TRICKS.b6_c7_wall.fx,
    run(u, x, y){ const pt = {x, y}; AUDIO.play('sword'); shakeMap();
      later(() => { const caught = B.units.filter(v => v.hp > 0 && cheb(v, pt) <= 1); caught.forEach(v => { v.dazzleUntil = B.round + 1; });
        blast(pt, [[2, 6, lvDmg()], [2, 6, lvDmg()]], '#a8b4c0'); sparks(pt.x, pt.y, 24, '#c8d0d8', .7); }, REDUCE() ? 1 : 260);
      blog(`${u.name} gives the Perish word. The wall goes forward four paces at a run, shields locked, and does not stop for what is in front of it.`); }},
});

/* ---- the words this chapter adds to Book Six's glossary ---- */
GLOSSX.bh.push(
  [7, 'The Grey Helms', 'The Perish\'s soldiers: grey plate, tall shields with a wolf on them, and a Destriant who speaks for their god. They came alongside the fleet at sea and sailed with it.', ()=>(S.chapter || 0) >= 7],
  [7, 'Mock\'s Hold', 'The fortress on its rock above Malaz City and its harbour. The Empire was born under it, they say in the city, and the Empire\'s people go up to it.', ()=>(S.chapter || 0) >= 7],
  [7, 'Sepik', 'An island on the fleet\'s road west. When the fleet passed it the harbour was wrecked and there was nobody on the quays.', ()=>!!(S.f && S.f.b6_c7_sepik)]);

/* ---- the reading: a transport's deck at sea, on a hatch cover, by a lantern, with a jug (bh:7) ---- */
B6DECK[7] = {scene:'b6_sea', where:'a hatch cover lashed down amidships, with a lantern hung off a stay above it and a water jug wedged against the coaming',
  set:'A transport\'s deck in Nok\'s fleet, a few days out from the Kokakal shore, with the sea grey on every side and the fleet strung out behind.', back:'b6_c7_deck_done', backT:'Back to the deck.',
  say:{marrow:'"Cards at sea," Marrow says, wedging the jug with her knee. "My mother would have thrown them over the side for the sea\'s share. I am not my mother, child. Sit."',
       tallow:'"My grandmother read for fishermen," Tallow says. "On boats. She said the Deck goes quiet on water, like it\'s listening for something under the keel." He shuffles. "Mostly they came back."',
       oldninth:'"Rum first," the old soldier says, and gets it. "One for the sea. Then the card." He pours a finger over the side, and one for himself, and shuffles one-handed, with the other on the rail.'}};

/* the fire is a roster fire (38c): the cook's sandbox on the deck at sea, a tar barrel on the jetty in Malaz City */
ROSTER_FIRES.bh = ROSTER_FIRES.bh || {}; ROSTER_FIRES.bh[7] = ['b6_c7_fire'];

const B6CH7 = {
  title:'Malaz City', number:'Seven',
  intro:{loc:'At sea', sub:'Nok\'s fleet · days out from the Kokakal shore', scene:'b6_sea', cap:'Grey water, a grey sky, the fleet strung out behind, and every soldier aboard looking at the horizon.',
    paras:[
`The Fourteenth is at sea. It went aboard Admiral Nok's transports off the Kokakal shore, legion by legion, and the shore went down behind it into the haze, and Seven Cities with it, and nobody on the squad's transport watched it go for long.`,
`The transport is a broad, slow, tarred thing with a Quon crew who speak to soldiers as little as they can manage. The 9th has the waist and the hold. The squad has a square of deck by the mainmast and the right to be sick over the lee rail, and has used it.`,
()=>{ const v = b67Here().map(NAME), fell = b67Fell3().map(NAME);
  return `${v.length ? `${b67And(v)} ${v.length > 1 ? 'are' : 'is'} with you.` : 'The squad, at sea, is you.'}${fell.length ? ` ${b67And(fell)} ${fell.length > 1 ? 'are' : 'is'} in the barrow outside Y'Ghatan.` : ''} ${b67Sailed() ? 'The squad has been aboard since the first day of the loading, a day longer than Keneb\'s people, and knows every plank of this deck.' : 'The squad held its transport a day on the shore, on a boy\'s word, as the 8th did. The crew laughed at it then.'}`; }],
    go:'On deck', node:'b6_c7_start'},

  areas:[
    /* 16 x 12 (b6_c7_deck): the transport's deck at sea. # the rail and bulkheads  m a mast  h the hatch to the hold  - an open grating
       R the rail (the view)  F the cook's sandbox (the fire)  G the Grey Helms' drill (from phase 2)  O the bow */
    { id:'b6_c7_transport', title:'A transport · at sea', sub:'Nok\'s fleet · the squad\'s square of deck', hint:'Tap ground to move · tap a figure to talk · the rail shows what the sea is doing', decor:'b6_c7_deck',
      map:[ "################",
            "#..m.......m...#",
            "#..............#",
            "R....h.....G...R",
            "#..............#",
            "#....--.....F..#",
            "#....--........#",
            "#..m.......m...#",
            "#..............#",
            "#..............#",
            "#......O.......#",
            "################" ],
      walk:'.', triggers:{R:'b6_c7_rail', h:'b6_c7_hold', F:'b6_c7_fire', G:'b6_c7_drill', O:'b6_c7_bow'}, start:{x:7, y:8},
      quest:()=> !S.f.b6_c7_ambushDone ? 'The lookout is shouting. The rail.' : !S.f.b6_c7_sepik ? 'An island to the west. The rail.' : !S.f.b6_c7_ottarMet ? 'Grey ships coming up astern. The rail.' : 'The fleet is turning into something. The bow.',
      npcs:[
        {id:'captain', name:'Captain Hollet', kind:'b4_c1_hollet', x:9, y:8, node:()=>'b6_c7_captain', fresh:()=>!S.f.b6_c7_captain},
        {id:'master', name:'The transport\'s master', kind:'b5_c2_pilot', x:13, y:2, node:()=>'b6_c7_master', fresh:()=>!S.f.b6_c7_master},
        {id:'oldninth', name:'An old soldier of the 9th', kind:'b2soldier', x:2, y:5, node:()=>'b6_c7_oldsoldier', fresh:()=>!S.f.b6_c7_oldsoldier},
        {id:'ottar', name:'A Grey Helm', kind:'greysword', x:9, y:4, node:()=>'b6_c7_ottar', show:()=>b67Ph() === 2 && !!S.f.b6_c7_perish && !S.f.b6_c7_ottarMet, fresh:()=>true} ] },

    /* 16 x 12 (b6_c7_deckcold, dark): the same deck in the cold realm, the lanterns lit at noon */
    { id:'b6_c7_cold', title:'A transport · somewhere cold', sub:'Ice on the rigging · water roaring', hint:'Tap ground to move · the rail · the bow', decor:'b6_c7_deckcold', dark:true,
      map:[ "################",
            "#..m.......m...#",
            "#..............#",
            "R....h.....G...R",
            "#..............#",
            "#....--.....F..#",
            "#....--........#",
            "#..m.......m...#",
            "#..............#",
            "#..............#",
            "#......O.......#",
            "################" ],
      walk:'.', triggers:{R:'b6_c7_ice', h:'b6_c7_hold', F:'b6_c7_fire', G:'b6_c7_drill', O:'b6_c7_wolves'}, start:{x:7, y:8},
      quest:()=> !S.f.b6_c7_wolvesHeard ? 'Something is howling a long way off. The bow.' : 'Out of here. The bow.',
      npcs:[
        {id:'captain', name:'Captain Hollet', kind:'b4_c1_hollet', x:9, y:8, node:()=>'b6_c7_captain', fresh:()=>false},
        {id:'master', name:'The transport\'s master', kind:'b5_c2_pilot', x:13, y:2, node:()=>'b6_c7_master', fresh:()=>!S.f.b6_c7_masterCold} ] },

    /* 16 x 12 (b6_c7_quay): Malaz City's waterfront, a jetty along from the marines'. ~ harbour  H the plank to the transport  X the main
       jetty, along the waterfront  . planking  , stone  W the Wickan families  F a tar-barrel fire  # the harbour sheds  A an alley mouth
       K the Hold over the roofs  M the street mouth (the mob)  < the way into the streets */
    { id:'b6_c7_jetty', title:'Malaz City · the waterfront', sub:'A jetty along from the marines\'', hint:'Tap ground to move · tap a figure to talk · the street mouth is where the city comes from', decor:'b6_c7_quay',
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~H~~~~~~~~~X~~",
            "~~~.~~~~~~~~~.~~",
            "~~~.~~~~~~~~~.~~",
            "................",
            "..F........W....",
            "................",
            ",,,,,,,,,,,,,,,,",
            "####A###,,K#####",
            "#,,,,,,,,,,,,,M#",
            "<,,,,,,,,,,,,,,#",
            "################" ],
      walk:'.,', triggers:{H:'b6_c7_plank', X:'b6_c7_shouts', W:'b6_c7_wickans_fam', F:'b6_c7_fire', A:'b6_c7_alley', K:'b6_c7_holdview', M:'b6_c7_mob', '<':'b6_c7_tolanes'}, start:{x:4, y:5},
      quest:()=> !S.f.b6_c7_mobDone ? 'The city is coming down to the water. The street mouth.' : !S.f.b6_c7_guardDone ? 'The City Guard, for the Wickans.' : !b67Key() ? (S.f.b6_c7_signal ? 'The roads.' : 'Horns from the harbour.') : b67Key() === 'wickans' && !S.f.b6_c7_streetsDone ? 'Into the streets, west.' : 'The last of it.',
      npcs:[
        {id:'captain', name:'Captain Hollet', kind:'b4_c1_hollet', x:6, y:4, node:()=>S.f.b6_c7_guardDone ? 'b6_c7_signal' : 'b6_c7_orders', fresh:()=>!S.f.b6_c7_orders || (!!S.f.b6_c7_guardDone && !S.f.b6_c7_signal)},
        {id:'guard', name:'The City Guard', kind:'b2soldier', x:12, y:9, node:()=>'b6_c7_guard_come', show:()=>!!S.f.b6_c7_mobDone && !S.f.b6_c7_guardDone, fresh:()=>true},
        {id:'sailor', name:'A sailor off a dispatch boat', kind:'b5_c3_bargeman', x:1, y:6, node:()=>'b6_c7_news', fresh:()=>!S.f.b6_c7_news},
        {id:'grandmother', name:'A Wickan grandmother', kind:'b5_c1_tilewoman', x:10, y:6, node:()=>'b6_c7_grandmother', show:()=>!!S.f.b6_c7_famMet, fresh:()=>!S.f.b6_c7_gran} ] },

    /* 16 x 12 (b6_c7_streets, dusk): the lanes behind the waterfront (the 'wickans' road). W the Wickan house  G the landward gate
       > back to the water  x a shut shop  c a cart  F a street brazier */
    { id:'b6_c7_lanes', title:'Malaz City · the lanes', sub:'Behind the waterfront · dusk', hint:'Tap ground to move · the Wickan house is up the lane · the gate is south-east', decor:'b6_c7_streets', dark:true,
      map:[ "####,,.##..,####",
            "#..,....#.....W#",
            "#.c..,..#..,...#",
            "##...........x.#",
            "#....##..,.....#",
            "#.,..##....c...#",
            ">......F.......#",
            "#..,.......##..#",
            "#.....c....##..#",
            "##..,...,......#",
            "#.......#..,..G#",
            "################" ],
      walk:'.,', triggers:{W:'b6_c7_house', G:'b6_c7_gate', '>':'b6_c7_lanes_back', x:'b6_c7_shop', F:'b6_c7_brazier'}, start:{x:2, y:6},
      quest:()=> !S.f.b6_c7_streetsDone ? 'The Wickan house, up the lane.' : 'The landward gate.',
      npcs:[] } ],

  battles:{
    /* optional: rioters dragging a Wickan boy out of a fish-shed alley at the jetty's foot */
    b6_c7_alley:{title:'The fish-shed alley', style:'b6_c7_lanefight', warrenText:'Malaz City · the warrens sick with the plague even here, and the city loud', warren:{meanas:1, denul:1}, music:'battle',
      map:["##..#..#","........","..t.....","........",".....t..","........","#.......","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_rioter',2,1],['b6_rioter',5,1],['b6_rioter',4,2],['b6_rioter',3,0],['b6_c7_ringleader',6,0]], xp:220, after:'b6_c7_alley_after',
      preText:()=>`Five of them, with clubs and a boat-hook, and between them a Wickan boy with a split lip, being walked toward the water. The one at the back has a fisherman's apron and a city voice, and is telling the others what the boy's people did on the Wickan plains forty years ago, as if he had been there.${b67If('rasp', ' Rasp knows the voice. Not the man; the voice. "Malaz," she says. "Always somebody to blame for the plains."')}`},
    /* main: the mob on the jetty, then the jetty's foot with the City Guard standing by and a ringleader */
    b6_c7_jetty:{title:'The jetty', style:'b6_c7_wharf', warrenText:'The waterfront · every warren thick with the plague, and the city louder than any of them', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","#..t...#","#......#","#....t.#","#......#","#......#","#..t...#","#......#","#......#","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b6_regular',1,7]],
      foes:[['b6_rioter',1,1],['b6_rioter',5,1],['b6_rioter',3,0],['b6_rioter',4,2],['b6_rioter',6,2],['b6_rioter',1,0]], xp:400, after:'b6_c7_jetty_after',
      waves:[{round:2, foes:[['b6_rioter',3,0],['b6_rioter',5,0]], text:'More come out of the street mouth behind them, pushed on by the ones behind those.'}],
      preText:()=>`They come out of the street mouth in a crowd and then in a run, the whole width of the waterfront: dockers, fishwives, apprentices, men with chair legs and gaff hooks, shouting about Wickans and about the plains and about the army that brought them here. Some of them are drunk. Most of them are not. The Wickan families are behind the squad, at the jetty's end, with the water behind them.${b67Say({haddat:'\n\nHaddat sets the blue shield on her arm. "Water-sellers\' rule," she says. "No one pushes anyone into the water."', ottar:'\n\nOttar sets his tall shield down on the planks with a sound like a door shutting. "Behind," he says, in Malazan, his word for the day.', _:''})}`,
      stage2:{title:'The jetty\'s foot', xp:220,
        text:()=>`The first rush breaks on the shields and goes back up the waterfront, carrying its hurt. Then the second, and this one has somebody at the front who has done this before: a big man in a docker's leather with a boat-hook, and a handful round him who move together. Behind them, at the street mouth, four of the City Guard stand in a row with their hands on their sword hilts, watching, and not coming forward to stop anything.${b67Say({darrut:'\n\nDarrut looks at the Guard and spits. "I was on a wall in Aren," he says. "We came forward."', tangle:'\n\nTangle has a sharper in his hand and is looking at the planks under his feet. "Not on a jetty," he says, and puts it back. "Not with the boats."', _:''})}`,
        map:["#......#","#.t....#","#......#","#......#","#...t..#","#......#","#......#","#..t...#","#......#","#......#"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b6_regular',6,8]],
        foes:[['b6_c7_ringleader',4,0],['b6_rioter',3,1],['b6_rioter',5,1],['b6_rioter',3,2],['b6_rioter',6,1]]} },
    /* the City Guard come for the Wickan families, by order (never shown whose) */
    b6_c7_guard:{title:'The City Guard', style:'b6_c7_wharf', warrenText:'The waterfront · the warrens sick, and the Guard\'s own mage keeping out of it', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","#......#","#..t...#","#......#","#....t.#","#......#","#......#","#.t....#","#......#","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_cityguard',2,1],['b6_cityguard',5,1],['b6_cityguard',3,0],['b6_c7_guardsgt',4,0],['b6_rioter',6,2],['b6_rioter',1,2]], xp:320, after:'b6_c7_guard_after',
      preText:()=>`The Guard sergeant does not draw until the squad does, and then he draws very quickly. His Guardsmen come on in a line, as they were taught, in the City Guard's coats, with the city's mob at their backs cheering them for the first time in their lives.${b67If('ottar', '\n\nOttar looks at the City Guard, and at the mob behind them, and says something in his own tongue that is plainly not a prayer.')}`},
    /* the 'wickans' road: into the streets after the Wickans; then the landward gate */
    b6_c7_streets:{title:'The lane', style:'b6_c7_lanefight', dark:true, warrenText:'The lanes at dusk · the warrens sick, and the city burning a Wickan street two lanes over', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.......","#..t....","#.......","#.....t.","#.......","#.......","#..t....","#.......","#.......","#......."],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_rioter',2,1],['b6_rioter',5,1],['b6_rioter',4,0],['b6_cityguard',3,2],['b6_cityguard',6,0]], xp:320, after:'b6_c7_streets_after',
      preText:()=>`The lane outside the Wickan house is full of the city: a dozen with torches and clubs, and two of the City Guard among them, not stopping it. There is a family in the house. The door is barred and somebody inside is singing, low, in Wickan, the way the riders sang at their fires in the Odhan.${b67If('warlock', '\n\nKeth has gone white. "*That is a death song,*" the grandmother says, out of his mouth. "*Not yet. Not yet, little ones.*"')}`,
      stage2:{title:'The landward gate', xp:140,
        text:()=>`The lane is clear, and the family is out, and the squad goes with them down the lanes toward the landward gate with the city behind. At the gate there are more of the Guard, and they have been told to keep it, and they mean to.`,
        map:["##....##","........","...t....","........","t.......","......t.","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_cityguard',3,1],['b6_cityguard',5,1],['b6_c7_guardsgt',4,0],['b6_rioter',2,2]]} } },

  foes:{
    /* a waterfront ringleader: a big docker with a boat-hook, who has done this before */
    b6_c7_ringleader:{name:'A docker with a boat-hook', sig:'R', kind:'bruiser', hp:44, ac:13, atk:10, dmg:[1,10,3], rng:2, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'swings a boat-hook at'},
    /* a sergeant of the City Guard of Malaz, under an order nobody shows the squad */
    b6_c7_guardsgt:{name:'A Guard sergeant', sig:'S', kind:'b2soldier', hp:50, ac:16, atk:11, dmg:[1,10,4], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cuts at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b6_c7_greyhelmshield:{name:'A Grey Helm\'s tall shield', slot:'armour', role:'shield', who:null, ac:2,
      line:'A tall Perish shield, grey-painted, with a wolf on it in a darker grey and its rim filed sharp. The Grey Helms keep a spare for every man aboard, and one of them gave it to the squad at sea, without explanation. It is heavier than a Malazan shield and stands up on its own.'},
    b6_c7_malazcloak:{name:'A harbour cloak from Malaz City', slot:'armour', role:'light', who:null, ac:1, hp:3,
      line:'A long oiled wool cloak in the dun of Malaz City\'s waterfront, with a hood and a fishwife\'s mending at the hem. A Wickan grandmother put it round the shoulders of whoever stood nearest at the jetty\'s end, and said it had been her husband\'s, and that he would have wanted it to go with a soldier.'} },

  scenes:{
    b6_c7_ambush:{loc:'At sea', sub:'The fleet in an ambush', cap:'Ships to the north and to the south, a wall of water rising between, and the fleet turning in the middle of it.', amb:'battle'},
    b6_c7_realm:{loc:'Somewhere cold', sub:'The fleet in a sea that is not any sea', cap:'Ice the size of hills going by in a green light, and water roaring, and the ships running as if downhill.', amb:'explore'},
    b6_c7_jetty:{loc:'Malaz City', sub:'A jetty along from the marines\'', cap:'The waterfront crowded with the city, smoke over a Wickan street, and Mock\'s Hold dark on its rock above it all.', amb:'explore'},
    b6_c7_lanes:{loc:'Malaz City', sub:'The lanes behind the waterfront · dusk', cap:'Narrow lanes going up from the water, torches moving in them, and a Wickan street burning two lanes over.', amb:'explore'},
    b6_c7_finale:{loc:'Malaz City', sub:'The harbour at dusk', cap:'The harbour at dusk, sails going out past the mole, and the city behind still loud.', amb:'explore'} },

  end:{
    adjunct:['Out with the fleet', 'The fleet went through an ambush and a deserted harbour and a sea that was not any sea, and came to Malaz City, and the city turned on its own Wickans. The Third held a jetty along from the marines\' against the mob and the City Guard, and when the horns went it went back aboard, and the transports went out of the harbour with the Adjunct before anybody could stop them.'],
    jetty:['Left on the jetty', 'The fleet went through an ambush and a deserted harbour and a sea that was not any sea, and came to Malaz City, and the city turned on its own Wickans. The Third held a jetty along from the marines\' against the mob and the City Guard, and when the horns went it stayed at the jetty\'s foot while the last boats went, and the fleet sailed without it.'],
    wickans:['With the Wickans', 'The fleet went through an ambush and a deserted harbour and a sea that was not any sea, and came to Malaz City, and the city turned on its own Wickans. The Third held a jetty along from the marines\' against the mob and the City Guard, and when the horns went it went the other way, up into the lanes after a Wickan family, and out of the landward gate with them.'] },
  endScene:'b6_c7_finale',
  endCap:()=> b67Key() === 'adjunct' ? 'The harbour at dusk, the transports going out past the mole, and the squad at a rail watching the city go.' : b67Key() === 'jetty' ? 'The harbour at dusk, the sails going out past the mole, and the squad at the jetty\'s foot watching them go.' : 'The road inland at dusk, a Wickan family on it, and the squad walking behind them with the city at its back.',
  tease:'The epilogue: where each squad\'s road goes, a page for every soldier of both, and where the books meet.',

  extras:()=>{ const f = S.f, x = [];
    x.push(b67Sailed() ? 'The squad was aboard from the first day of the loading, a day longer on its transport than most.' : 'The squad held its transport a day on the shore, on a boy\'s word.');
    if (f.b6_c7_ambushDone) x.push('From a transport\'s rail the squad saw the Edur lines, a wall of water, and a wall of earth that could not be there.');
    if (f.b6_c7_ottarMet) x.push(b6In('ottar') ? 'A Grey Helm of the Perish came across to the transport, and walks with the Third.' : (S.camp || []).includes('ottar') || f.b6_ottarDone === 2 ? 'A Grey Helm of the Perish came across to the transport, and waits with the Grey Helms.' : 'A Grey Helm of the Perish came across to the transport, and went to stand with his own.');
    if (f.b6_c7_alleyDone) x.push('The squad took a Wickan boy off the mob in a fish-shed alley.');
    if (f.b6_c7_mobDone) x.push('The Third held the jetty against Malaz City\'s mob, with the Wickan families behind it.');
    if (f.b6_c7_guardDone) x.push(f.b6_c7_guardDone === 'talked' ? 'The City Guard came for the Wickan families, and went away without them.' : 'The City Guard came for the Wickan families, and did not get them.');
    if (f.b6_c7_key === 'adjunct') x.push('This sergeant\'s road goes on, with the Adjunct. Book Seven, when it is written, will offer this save.');
    if (f.b6_c7_key === 'jetty') x.push('The Third is in Malaz City, on a jetty, with the fleet gone. No road onward.');
    if (f.b6_c7_key === 'wickans') x.push('The Third went out of Malaz City by the landward gate with a Wickan family. No road onward.');
    if (b6In('mehet')) x.push('Mehet saw the sea for the first time, and was sick in it, and forgave it.');
    if (b6In('ottar')) x.push('Ottar learned seven Malazan words, one a day, and used all of them on the jetty.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b6_c7_key === 'adjunct' && 'The Third went out of Malaz harbour with the fleet and the Adjunct.',
    f.b6_c7_key === 'jetty' && 'The Third stayed on the jetty while the fleet sailed, and is in Malaz City.',
    f.b6_c7_key === 'wickans' && 'The Third went into the lanes after a Wickan family, and out of the landward gate with them.',
    f.b6_c7_shouts && 'Down the waterfront a Fist shouted at the marines\' jetty, and the soldiers say the army is the Adjunct\'s now. Not one of the Third heard all of it.',
    f.b6_c7_realm && 'The fleet went through a sea of ice and roaring water that was not any sea, and came out of it.',
    f.b6_c7_sepik && 'Sepik\'s harbour was wrecked and its quays empty. The fleet did not put in.',
    f.b6_c7_ambushDone && 'The Edur came at the fleet out of the north and the south, with a wall of water, and a wall of earth stood up against it.',
    'The Third is aboard a transport in Nok\'s fleet, bound west for Quon Tali.'].filter(Boolean); },

  dlg:{
    /* ---- phase 1: at sea, the ambush ---- */
    b6_c7_start:()=>({sp:'At sea', scene:'b6_sea', fx:()=>{ S.f.b6_c7_ph ??= 1; },
      again:()=>`The transport's deck, the fleet strung out behind, and the lookout at the masthead.`, txt:
`The fourth morning out, the wind goes round to the north and stays there, and the transport leans away from it and goes on, and the squad wakes on its square of deck by the mainmast with salt in its blankets.

The sea is grey and very large, and most of the 9th grew up a long way from it. The fleet is strung out behind for a league, transports and supply ships and the warships on the flanks, and up at the head of it, a long way off, the Adjunct's flagship, which nobody on this deck has been closer to than this.${b67Say({mehet:'\n\nMehet is sitting with his back against the mainmast and his eyes shut. "Tell me when it stops moving," he says. "Not before."', marrow:'\n\nMarrow is at the lee rail with her coat of too many pockets buttoned to the chin, looking at the water as if it owed her a patient. "Salt," she says. "Salt is good for wounds. That is the only thing I will say for it."', _:''})}

At the masthead the lookout is quiet, which is what you want from a lookout.`,
      ch:[b6DeckChoice(7),
          {t:'The cook\'s sandbox. Something hot.', go:'b6_c7_fire'},
          {t:'Walk the deck.', go:()=>startExplore()}]}),
    b6_c7_deck:()=>b6DeckOffer(7),
    b6_c7_card:()=>b6DeckCard(7),
    b6_c7_deck_done:()=>({sp:'The Deck of Dragons', scene:'b6_sea', txt:
`${S.f.b6_c7_drawn ? (S.f.b6_c7_reader === 'marrow' ? 'Marrow puts the cards away in the oilcloth one at a time, and ties a knot in her string after, and does not say for whom.' : S.f.b6_c7_reader === 'tallow' ? 'Tallow wraps his grandmother\'s cards in their oilcloth and holds the bundle a while against his chest, with the deck moving under him.' : 'The old soldier puts his deck away inside his coat, and finishes the rum, and goes back to the rail.') : 'The Deck stays wrapped.'} The lantern swings on its stay. Somewhere aft, the master is shouting at somebody about a rope.`,
      ch:[{t:'Back to the deck.', go:()=>startExplore()}]}),

    /* the rail: what the sea is doing, by phase */
    b6_c7_rail:()=>({sp:'The rail', scene:S.f.b6_c7_ambushDone ? 'b6_sea' : 'b6_c7_ambush', again:()=>`The rail, and the sea.`, txt: !S.f.b6_c7_ambushDone ?
`The lookout at the masthead has started shouting, and the master has stopped shouting at the rope, and everybody on the deck is at one rail or the other.

To the north, along the horizon, there are ships. A line of them, low and dark, with sails nobody on this deck has seen before. To the south, when you cross the deck to look, there are more.` : !S.f.b6_c7_sepik ?
`The fleet is going on west, raggedly, with the warships pulling back into their places. To the west, low on the water, there is an island, and a harbour mouth, and no smoke over it at all.` : !S.f.b6_c7_perish ?
`Behind the fleet, coming up out of the south-east with the wind, there are grey ships. Great ones, bigger than anything in Nok's fleet, with grey sails, coming on in a line as if they had been told where to find it.` :
`The grey ships are with the fleet now, on its flanks, and the sea between the ships has become an ordinary sea again. The Nemil supply ships are gone over the horizon to the north-east, going home.`,
      ch:[{t:'Watch the north line.', req:()=>!S.f.b6_c7_ambushDone, onward:true, go:'b6_c7_ambush'},
          {t:'Watch the island.', req:()=>!!S.f.b6_c7_ambushDone && !S.f.b6_c7_sepik, onward:true, go:'b6_c7_sepik'},
          {t:'Watch the grey ships come up.', req:()=>!!S.f.b6_c7_sepik && !S.f.b6_c7_perish, onward:true, go:'b6_c7_perish'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the ambush, from a transport's rail (W18): Edur lines north and south, the wall of water, the wall of earth */
    b6_c7_ambush:()=>({sp:'The ambush', scene:'b6_c7_ambush', fx:()=>{ if (S.f.b6_c7_ambushDone) return; S.f.b6_c7_ambushDone = 1; }, again:()=>`The sea where the ambush was.`, txt:
`The dark ships come in from both sides at once, as if somebody had drawn two lines on a chart and the fleet had sailed between them. Grey-skinned crews on their decks, tall, still. Edur, the master says, though nobody on this deck has ever seen one, and he has only heard. From a country nobody here has been to, across an ocean nobody here has crossed.

Then the sea to the north stands up.

It is a wall of water, the height of a hill, the width of the horizon, and it is coming. The transport's crew stops doing anything at all. In the waist the 9th's soldiers stand up from their dice. A man at the bow is praying to Mael in a high, clear, ordinary voice.

And between the fleet and the wall, out of the sea, a wall of earth rises. Brown, raw, wet, with rocks in it and roots hanging off it, standing out of the water where there is no land for a hundred leagues, and the water breaks on it, and goes up white, and comes down, and does not come through.

The Edur lines turn away. Not fast. Then faster.

Behind the earth there is nothing but sea, when the spray clears. It may never have been there at all. On the next transport over, the marines are shouting that it was the High Mage's work, and then that it was illusion, and then that it was something more than illusion by the end, and then they stop shouting, because they do not know either.${b67Say({tangle:'\n\nTangle has his hands on the rail and the satchel between his feet. "That was a lot of earth," he says, at last, "to put in the sea." He sounds envious.', yorin:'\n\nYorin is white to the lips and holding his copper vane, which is spinning. "That was not Serc," he says. "That was not anything I know." He makes it stop.', _:''})}

${b67Sailed() ? 'You have been aboard since the first day of the loading, at anchor while the 8th sat a day on the shore on a boy\'s word. Two days past Sepik, the boy said. There is no laughing at boys on this deck today.' : 'You held the transport a day on the shore, on a boy\'s word. The crew laughed then. The deck is not laughing now, and the master has been looking at the 9th with something like respect.'}`,
      ch:[{t:'Breathe.', onward:true, go:'b6_c7_ambush_after'}]}),
    b6_c7_ambush_after:()=>({sp:'At sea', scene:'b6_sea', again:()=>`The fleet re-forming.`, txt:
`The fleet comes back together over an afternoon, the warships herding, the transports wallowing back into their places. The deck is quiet. The 9th goes back to its dice and finds it has forgotten whose throw it was.

The captain comes along the deck counting heads, which is what the captain does after anything, and gets the right number, and looks relieved about it in a way that is not quite a captain's.`,
      ch:[{t:'Walk the deck.', go:()=>startExplore()}]}),

    /* Sepik (W19): wrecked, deserted; no landfall */
    b6_c7_sepik:()=>({sp:'Sepik', scene:'b6_sea', fx:()=>{ S.f.b6_c7_sepik = 1; }, again:()=>`Sepik, astern now.`, txt:
`The fleet comes down past the island close enough to see the harbour, and does not go in.

The harbour mole is broken in two places, and there are hulls on their sides in the shallows with their masts gone, and on the quays there is nobody at all. No smoke. No boats putting out to sell fish to a fleet, which every harbour does. The houses go up the hill behind the quays with their doors open.

"Sepik," the master says. "There'd be a market on that quay any day of the year." He spits over the side. "The Edur were here first, then." Why, the deck does not know. The fleet does not put in to find out.${b67Say({hessa:'\n\nHessa looks at the open doors a long time. "Everything ends up sand," she says. "Even harbours." She does not sound comforted.', mirrel:'\n\nMirrel counts the hulls in the shallows, one, two, three, and stops counting. "No one to treat," she says. "That is the worst kind of quiet."', _:''})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 2: the Perish come alongside (W20); a Grey Helm sent across ---- */
    b6_c7_perish:()=>({sp:'The grey ships', scene:'b6_sea', fx:()=>{ S.f.b6_c7_perish = 1; S.f.b6_c7_ph = Math.max(2, b67Ph()); }, again:()=>`The grey ships on the fleet's flank.`, txt:
`The grey ships come up through the fleet as if the fleet stood still. Great warships, grey-hulled and grey-sailed, with a wolf's head on every prow and soldiers in grey plate lining every rail, shields up, not moving, a long way above the transport's deck.

For an afternoon nobody knows what they are. Then the signal flags go up from the flagship, and down the fleet, ship to ship, and the master reads them out to the deck: *friends*. The Perish, from across the sea, come to sail with the Adjunct. Their Destriant has gone aboard the flagship to speak to her.

At dusk the Nemil supply ships, which have been at the back of the fleet since the Kokakal shore, put about together and run for home, north-east, without a signal. The master watches them go. "Someone's frightened," he says. "And it's not them in the grey."

One of the grey ships comes alongside the transport in the last of the light, close enough to throw a line, and throws one. A soldier comes down it, hand over hand, in plate, with a tall shield on his back, and steps onto the transport's rail as easily as onto a doorstep.${b67If('mehet', '\n\nMehet opens his eyes long enough to watch, and shuts them again. "People choose to do this," he says.')}`,
      ch:[{t:'Go and see who has come aboard.', onward:true, go:'b6_c7_ottar'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_ottar:()=>({sp:'A Grey Helm', scene:'b6_sea', fx:()=>{ S.f.b6_c7_ottarMet = 1; }, again:()=>`The Grey Helm on the transport's deck.`, txt: S.f.b6_ottarDone != null && S.f.b6_c7_ottarAsked ?
`The Grey Helm is on the deck, ${b6In('ottar') ? 'with the squad' : 'with the grey shield on his back'}, learning the word for *rope* from the master.` :
`He is tall and grey-bearded and very still, in grey plate over mail, with a long single-edged sword at his hip and a tall shield with a wolf on it. He takes his helm off on the deck and looks at the soldiers of the 9th, and at the captain, and at you, and picks you.

"Ottar," he says. "Of the Grey Helms. Our Destriant speaks to your Adjunct." He considers his Malazan, which is careful and slow. "I speak to you. That is how it is done." He has been sent, he says, across to the ships of the Malazans, one Grey Helm to each of some of them, to learn how they fight, so that when the Perish fight beside them nobody is surprised. He does not say what the Perish are here to fight. When the captain asks, he says his Destriant will say, and that is all.

He prays before he eats, briefly, at the rail, to the north, where there is nothing but sea.${b67Say({haddat:'\n\nHaddat looks at his shield. "That is a good shield," she says. He looks at hers. "That is a good shield," he says. They seem to have settled something.', ottar:'', _:''})}`,
      ch:[{t:'"Then walk with the Third, Ottar. Learn it from us."', req:()=>!S.f.b6_c7_ottarAsked && b6CanRecruit('ottar'), onward:true, fx:()=>{ S.f.b6_c7_ottarAsked = 1; b6Join('ottar'); }, go:'b6_c7_ottar_join'},
          {t:'"Stand with the transport\'s marines. They know more than we do."', req:()=>!S.f.b6_c7_ottarAsked && b6CanRecruit('ottar'), fx:()=>{ S.f.b6_c7_ottarAsked = 1; S.f.b6_ottarDone = 0; }, go:'b6_c7_ottar_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_ottar_join:()=>({sp:'Ottar', scene:'b6_sea', fx:()=>{ S.f.b6_c7_ph = Math.max(2, b67Ph()); }, txt: b6In('ottar') ?
`Ottar nods, once, as if this were what he had expected, and sets his shield down by the mainmast with the squad's kit, and sits on the deck beside it with his back straight.

"Today's word," he says. "Teach me." The squad teaches him *sergeant*. He says it carefully, twice, and then to you. It sounds like a rank in his mouth, which it seldom does in the 9th's.${b67Say({tangle:'\n\nTangle offers him a strip of dried goat. He prays over it, briefly, and eats it, and says the Malazan for *thank you*, which somebody has already taught him.', marrow:'\n\nMarrow looks him over, the way she looks at everybody, for where he will bleed. "You\'ll do, child," she says. He is thirty-eight. He accepts it.', _:''})}` :
`Ottar nods. "Then I wait with my own," he says, "until there is room." He goes back up the line to the grey ship as he came, hand over hand, in plate, and the squad watches him all the way, because it is worth watching.`,
      ch:[{t:'Walk the deck.', go:()=>startExplore()}]}),
    b6_c7_ottar_no:()=>({sp:'Ottar', scene:'b6_sea', txt:
`Ottar inclines his head. "The marines," he says. "Yes. I will learn from them." He goes aft to the transport's handful of marines, who do not know what to do with him either, and by nightfall he has taught them a word in Perish and learned two in Malazan, and is drilling with them on the waist.`,
      ch:[{t:'Walk the deck.', go:()=>startExplore()}]}),

    /* the Grey Helms' drill on the waist: the trick (✦ Might 17), and the shield */
    b6_c7_drill:()=>({sp:'The Grey Helms\' drill', scene:b67Scene(), again:()=>`The waist, and the grey shields.`, txt: b67Ph() < 2 || !S.f.b6_c7_perish ?
`The waist of the transport, where the 9th plays dice and the crew coils rope. Nothing to see but the dice.` : S.f.b6_c7_drillTried ?
`The Grey Helms drill on the waist every morning, ${b67Ph() >= 3 ? 'even here, with ice on the shields' : 'with the 9th watching'}. ${trickBy('b6_c7_wall') ? `${trickBy('b6_c7_wall') === 'sgt' ? 'You go' : `${NAME(trickBy('b6_c7_wall'))} goes`} down most mornings to stand in the wall with them.` : 'The 9th has stopped watching. The squad has not.'}` :
`More of them have come across from the grey ships by now, a handful, to this transport and the next, and in the mornings they drill on the waist: six tall shields in a line, rim locked to rim, and a Grey Helm at the end calling the word.

On the word the line goes forward four paces at a run, all six together, and stops dead, and on the next word it goes back. It is very loud. The deck shakes under it. The 9th has stopped playing dice to watch, and the crew to coil rope, and the master to shout.

The one calling the word sees the squad watching, and holds a hand out toward the end of the line, where there is room for one more shield.`,
      ch:[{t:'Take the end of the wall, and learn the word. (the Grey Helms\' Wall)', check:['might', 17], trick:'b6_c7_wall', req:()=>b67Ph() >= 2 && !!S.f.b6_c7_perish && !S.f.b6_c7_drillTried, fx:()=>{ S.f.b6_c7_drillTried = 1; },
            edges:id=>[id === 'ottar' && ['it is his own drill', 3], id === 'haddat' && ['the blue shield has stood in worse lines', 2], id === 'darrut' && ['Aren Guard drill: shields locked, on the word', 2], id === 'hessa' && ['she stands like a temple door', 1], id === 'redblade' && ['the Red Blades fought in a wall too', 1], id === 'mehet' && ['a sling and a quilted coat, in a wall of plate', -2], id === 'tangle' && ['a sapper does not stand in walls; he blows holes in them', -1]],
            near:{t:()=>{ const w = b67Who(); return `Yes, but the wall goes forward and ${b67Nm(w)} ${b67V(w, 'go', 'goes')} with it a step late, and the shield on the left comes round into ${b67Pos(w)} ribs: bruised.`; }, fx:()=>bruise(b67Who(), bruiseN())},
            go:'b6_c7_drill_ok', fail:'b6_c7_drill_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_drill_ok:()=>({sp:'The Grey Helms\' drill', scene:b67Scene(), fx:()=>{ if (!S.f.b6_c7_shieldGot) { S.f.b6_c7_shieldGot = 1; gain('b6_c7_greyhelmshield'); } }, txt:
`On the word, ${by({sgt:'you go', _:'{who} goes'})} forward with the wall, four paces, rim locked to rim, and ${by({sgt:'you stop', _:'stops'})} dead when it stops, and the deck stops shaking a breath later.

The Grey Helm at the end says something in his own tongue, and then, carefully, in Malazan: "Again." Again. And again, until the word is a thing the body does without being asked.

At the end of the morning one of them brings a spare shield up from below, tall and grey with the wolf on it, and leans it against the mainmast by the squad's kit, and goes back to his own without a word.${b67If('ottar', '\n\nOttar looks at the shield, and at you. "It is a gift," he says. "Do not thank him. He would not know what to do."')}`,
      ch:[{t:'Back to the deck.', go:()=>startExplore()}]}),
    b6_c7_drill_no:()=>({sp:'The Grey Helms\' drill', scene:b67Scene(), fx:()=>{ if (!S.f.b6_c7_shieldGot) { S.f.b6_c7_shieldGot = 1; gain('b6_c7_greyhelmshield'); } }, txt:
`The wall goes forward on the word, and ${by({sgt:'you go', _:'{who} goes'})} forward a beat after it, and the wall has a gap in it where ${by({sgt:'you', _:'{who}'})} should be. The Grey Helm at the end looks at the gap with something close to pain.

They try it a dozen times. The gap gets smaller. It does not close.

At the end of the morning one of them brings a spare shield up from below anyway, tall and grey with the wolf on it, and leans it by the squad's kit. A shield, it seems, is a thing the Perish give whether or not you can stand in their wall.`,
      ch:[{t:'Back to the deck.', go:()=>startExplore()}]}),

    /* the hold: where the 9th is sick, and where the squad takes stock (fever) */
    b6_c7_hold:()=>({sp:'The hold', scene:b67Scene(), html:feverHTML(), again:()=>`The hatch, and the hold below it.`, txt:
`Down the hatch, the 9th's hold: soldiers in hammocks and on the boards between them, three deep, and the smell a hold gets when four hundred soldiers have been in it for a week and the sea has been in it too.

The plague did not come aboard with the 9th, or not much of it. Some of the soldiers who walked in from Y'Ghatan have the sweats still, and the surgeons go along the hammocks twice a day with water and a lamp. ${b6FeverList().length ? 'The squad\'s own fevered are down here, in the end hammocks, where it is coolest.' : 'None of the squad is down here, which the squad does not take for granted.'}${b67If('marrow', '\n\nMarrow goes down most days to help. She says the sea is good for fevers. She says it about everything.')}`,
      ch:[{t:'Have the fevered seen to.', req:()=>b6FeverList().length > 0 && b6CanCure(), go:'b6_c7_fire_fever'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the bow: the way on, by phase */
    b6_c7_bow:()=>({sp:'The bow', scene:'b6_sea', again:()=>`The bow, and the sea ahead.`, txt: !S.f.b6_c7_ottarMet ?
`The bow, where the spray comes over, and the sea ahead empty to the edge. The lookout at the masthead is the one to ask.` :
`The bow, and ahead of the fleet the sea has changed colour. It is going green, and then darker, and the air coming over the bow is suddenly cold, colder than any air off any sea between Seven Cities and Quon Tali. The master is up here too, and he has gone the colour of the sea.

"That's not the course," he says. "That's not Shal-Morzinn either." The flagship's signal comes down the line: *follow*. "Follow where," the master says, to nobody, and follows.`,
      ch:[{t:'Hold on to something.', req:()=>!!S.f.b6_c7_ottarMet, onward:true, go:'b6_c7_realm'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 3: the passage through the cold realm (W21) ---- */
    b6_c7_realm:()=>({sp:'Somewhere cold', scene:'b6_c7_realm', fx:()=>{ S.f.b6_c7_ph = Math.max(3, b67Ph()); S.f.b6_c7_realm = 1; }, again:()=>`The cold, and the roaring water.`, txt:
`The light goes green, and then grey, and then a colour nobody has a word for, and the sea is not the sea any more.

It is water, and it is roaring, and it is going downhill. The transport goes with it, faster than it has ever gone, faster than a ship can go, with the wind behind it like a hand, and on both sides, going by, there is ice: ice the size of hills, ice the size of cities, blue at the heart and white at the edges, close enough that the spray off the transport's bow freezes on it.

Frost comes down the rigging. The lanterns are lit at what must be noon. Every soldier on the deck is wrapped in every blanket the 9th owns.${b67Say({ottar:'\n\nOttar stands at the rail with his helm off in the cold, and his face is wet, and it is not the spray. "This is his," he says. "His and hers. I did not think I would see it with my own eyes." He does not say whose.', mehet:'\n\nMehet has opened his eyes. "This is not the sea," he says. "I was told about the sea. This is not it." He seems relieved.', _:''})}`,
      ch:[{t:'Get below the rail.', onward:true, go:()=>{ startExplore('b6_c7_cold'); }},
          {t:'Stay at the rail.', go:()=>{ startExplore('b6_c7_cold'); talk('b6_c7_ice'); }}]}),
    b6_c7_ice:()=>({sp:'The rail', scene:'b6_c7_realm', again:()=>`The rail, the ice going by.`, txt:
`At the rail, with the cold in your teeth, you watch the ice go by. There are shapes in some of it, deep in the blue, that could be anything. Rocks. Old ships. You decide they are rocks.

Ahead, the fleet is strung out in a line down the roaring water, and some of the ships look as if they are not touching it at all. As if they are going over it. You look at your own transport's hull, to see if it is touching, and decide not to find out.${b67If('tallow', '\n\nTallow has his grandmother\'s cards inside his shirt with one hand flat over them. "They\'ve gone very quiet," he says. "Like they\'re listening."')}`,
      ch:[{t:'Back from the rail.', go:()=>startExplore()}]}),
    b6_c7_wolves:()=>({sp:'The bow', scene:'b6_c7_realm', fx:()=>{ S.f.b6_c7_wolvesHeard = 1; }, again:()=>`The bow, and the long howl ahead.`, txt:
`At the bow, through the roaring, there is another sound, a long way off. A howl. Then another, answering, off to one side.

Wolves, the 9th says, all along the deck, in low voices. Wolves, out there on the ice. The 9th does not ask how big a wolf would have to be to be heard over this, or what it would be doing out here, where there is no land.${b67If('ottar', '\n\nOttar has gone down on one knee on the frozen deck with his sword point down in front of him and his forehead on the hilt. He stays there until the howling stops. When he gets up he looks younger, and he does not explain.')}

The howling stops. The roaring goes on. Ahead, very far ahead, the colour of the light is changing again.`,
      ch:[{t:'Hold on.', onward:true, go:'b6_c7_jakatakan'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* out of the realm: the Jakatakan fleet (W22) */
    b6_c7_jakatakan:()=>({sp:'Out of the cold', scene:'b6_sea', fx:()=>{ S.f.b6_c7_jak = 1; }, again:()=>`The Jakatakan ships on the flank.`, txt:
`The light goes ordinary between one breath and the next, and the fleet is on an ordinary sea under an ordinary sky, with an ordinary wind, and the ice is melting off the rigging and coming down on everybody's heads.

For a while, not a soul aboard knows where they are. Then the master does: he knows the colour of this water, and the shape of that cloud over the land to the north. "Quon," he says. "That's Quon Tali. That's home." He sounds as if he does not believe himself.

That afternoon another fleet finds them: Malazan warships, out of Jakatakan, under a commander who signals the flagship in a way the master reads out slowly and does not like. They come in close on the flanks, and stay there, and their marines line the rails and watch the transports, and it is not the way friends watch.${b67Say({marrow:'\n\nMarrow watches the Jakatakan marines watching. "Home," she says. "Child, I had forgotten what home looks like. It looks like that."', rasp:'\n\nRasp watches the Jakatakan ships take their places. "Navy," she says. "Jakatakan navy. They think the Fourteenth is a rumour with a smell." She looks north. "Malaz. Two days. I was born there. I have not missed it."', _:''})}`,
      ch:[{t:'Malaz City.', onward:true, go:'b6_c7_landfall'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the master, by phase */
    b6_c7_master:()=>({sp:'The transport\'s master', scene:b67Scene(), fx:()=>{ S.f.b6_c7_master = 1; if (b67Ph() >= 3) S.f.b6_c7_masterCold = 1; }, again:()=>`The master by the wheel.`, txt: b67Ph() >= 3 ?
`The master has a rope round his waist and the other end round the wheel's post, and he has not left the wheel since the light went green. "Thirty years," he says, through his teeth. "Thirty years from Malaz to Aren and back. I know every current on that road by its smell." The ice goes by. "I don't know this one. I don't want to." He holds on.` :
`The master is a Quon sailor with a face like a split oar and a voice that has been shouting into wind for thirty years. He speaks to soldiers as little as he can.

"Your lot," he says, "is sick over my lee rail, which is the right rail. I'll say that for the 9th. The 8th's lot on the next ship are sick over the windward rail." He looks out at the fleet. "Malaz in three weeks, if the wind holds and nobody's waiting for us." ${S.f.b6_c7_ambushDone ? 'He looks north, where the Edur were. "Someone was waiting for us."' : 'He looks north. He does not say what he would be waiting for.'}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the captain, unnamed (the 9th's company captain, as in Book Four) */
    b6_c7_captain:()=>({sp:'Captain Hollet', scene:b67Scene(), fx:()=>{ S.f.b6_c7_captain = 1; }, again:()=>`The captain, with the company's book.`, txt:
`The captain has the company's book open on a coil of rope and is writing the sea into it, day by day, because a book has to have something in it.

"The Adjunct's taking us to Malaz City," the captain says. "That's the word from the flagship. Malaz, then wherever the Empress says." The captain does not say the Empress's name; nobody in the 9th does, out of an old habit nobody can explain. "Resupply. Reinforcements. Orders." A pause. "I've been to Malaz. It's a city that likes soldiers best when they're leaving."${b67Fell3().length ? `\n\nThe captain turns back a page, to Y'Ghatan, and looks at a line there, and turns forward again. "${b67And(b67Fell3().map(NAME))}," the captain says. "I wrote ${b67Fell3().length > 1 ? 'them' : b67Him(b67Fell3()[0])} properly."` : ''}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the old soldier of the 9th (the Deck's third reader; at sea he is decor and a voice) */
    b6_c7_oldsoldier:()=>({sp:'An old soldier of the 9th', scene:'b6_sea', fx:()=>{ S.f.b6_c7_oldsoldier = 1; }, again:()=>`The old soldier at the rail, with his cup.`, txt:
`The old soldier of the 9th has found the one dry place on the deck, in the lee of the longboat, and has a cup in his hand that he did not get from the 9th's stores.

"Malaz," he says. "I was born there, near enough. Went for a soldier off the waterfront when the old Emperor was still alive." He drinks. "Forty years. And we're going back with an army in the transports and the plague behind us and the Edur in front." He drinks again. "The city'll be glad to see us. For about an hour."${b67Bone() ? `\n\nHe looks at the finger bone at your throat. "Y'Ghatan," he says. "I heard. The ones who walked out of it took up the bones. Bonehunters, the marines are calling themselves." He touches his own, an old one from Aren. "Suits."` : ''}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the fire: the cook's sandbox at sea; a tar barrel on the jetty ---- */
    b6_c7_fire:()=>{ const p = b67Ph(), sea = p < 4;
      return {sp:sea ? 'The cook\'s sandbox' : 'The tar-barrel fire', scene:b67Scene(), html:feverHTML(), again:()=>sea ? (p === 3 ? `The sandbox fire, the only warm place on the deck.` : `The cook's sandbox, and the pot on it.`) : `The tar barrel on the jetty, burning.`, txt: sea ?
`${p === 3 ? 'In the cold, the cook\'s sandbox amidships is the only fire on the deck, a box of sand with coals in it and an iron pot over them, and the whole of the 9th would sit round it if the crew let them. The crew lets the squad, because the squad brought the Grey Helms and the Grey Helms frighten the crew.' : 'The cook\'s sandbox amidships: a box of sand with a fire in it and an iron pot over the fire, which is the only fire allowed on a wooden ship. The cook lets the squad sit by it in the evenings, for the price of carrying his water.'}${b67If('ottar', '\n\nOttar sits a little apart, with his shield across his knees, sharpening the rim.')}${b67If('mehet', '\n\nMehet sits with his back against the sandbox, as near the fire and as far from the rail as a man can get on this ship.')}` :
`At the landward end of the jetty somebody has knocked the head off a tar barrel and set it burning, and the smoke goes up black over the waterfront to join the other smoke. The squad stands round it because it is a fire, and because from here you can see both the street mouth and the boats.${b67If('rasp', '\n\nRasp stands with her back to the fire, facing the city she was born in. She has not said anything about it since the ship came in.')}`,
        ch:[{t:'Sit a while. Let the squad rest.', req:()=>!S.f[`b6_c7_rest${sea ? 'Sea' : 'Jetty'}`], fx:()=>{ S.f[`b6_c7_rest${sea ? 'Sea' : 'Jetty'}`] = 1; rest(sea ? 'The squad sits by the cook\'s sandbox through an evening, and sleeps. Wounds close, mostly.' : 'The squad sits by the tar barrel an hour, with one eye on the street mouth. Wounds close, mostly.'); }, go:'b6_c7_fire_rest'},
            {t:'Talk with the squad.', go:'b6_c7_fire_talk'},
            {t:`Have ${HEALER() && b6In(HEALER()) ? NAME(HEALER()) : 'the surgeons'} see to the fevered.`, req:()=>b6FeverList().length > 0 && b6CanCure(), go:'b6_c7_fire_fever'},
            {t:'On.', onward:true, go:()=>talk(b67Next())},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c7_fire_rest:()=>({sp:b67Ph() < 4 ? 'The cook\'s sandbox' : 'The tar-barrel fire', scene:b67Scene(), txt:
`${b67Ph() < 4 ? 'An evening by the sandbox. The deck rises and falls. The cook bangs his pot. The 9th\'s dice go on in the waist, quieter.' : 'An hour by the tar barrel. The smoke goes up. Down the waterfront the shouting rises and falls, like a sea.'}

${b67Say({marrow:'Marrow goes round the squad with her string and her needles and her temple-woman\'s hands, and calls everybody *child*, and ties a knot for each.', mirrel:'Mirrel goes round the squad in threes, counting under her breath, hand, other hand, good.', _:'Some of the squad sleep. The rest watch.'})}${b67If('tangle', '\n\nTangle counts the satchel by feel, twice, out loud, under his breath.')}`,
      ch:[{t:'Back to the fire.', go:'b6_c7_fire'}]}),
    /* the fevered seen to: always from a scene (a healer, the surgeons, or a carrier's touch since Chapter 4) */
    b6_c7_fire_fever:()=>{ const h = HEALER(), who = b6FeverList(), by_ = h && b6In(h) ? h : null;
      return {sp:'The fevered', scene:b67Scene(), fx:()=>{ b6FeverList().forEach(id => b6Cure(id, by_ ? `${NAME(by_)}, at sea` : S.f.b6_soliel ? 'a carrier\'s touch, among the 9th' : 'the 9th\'s surgeons')); }, html:feverHTML(), txt: who.length ?
`${by_ ? `${NAME(by_)} sits with ${b67And(who.map(b67Nm))} through a night, with water and a wet cloth and the slow work of a healer whose warren is sick too, and pays for it in the morning with a headache like a hatch slammed shut.` : S.f.b6_soliel ? `There is a soldier of the 9th aboard who walked in from the plague country with blue under the nails and the fever gone out of him, and who has found that a hand on a fevered brow does something now. He comes along the deck at dusk, embarrassed, and puts his hand on ${b67And(who.map(b67Nm))} in turn, and goes away again without being thanked.` : `The 9th's surgeons come along the deck with their bags and their lamp, and do what surgeons do for the sweats, which is water and patience and a bitter draught.`} By morning the fever is gone.` :
`The squad is clear of the fever.`,
        ch:[{t:'Back to the fire.', go:'b6_c7_fire'}]}; },
    /* the squad's talk: one line each, at sea or on the jetty */
    b6_c7_fire_talk:()=>{ const ln = [], sea = b67Ph() < 4;
      if (b6In('haddat')) ln.push(sea ? `Haddat is going through her names at the sandbox, under her breath, as she has every night since Hissar. ${b67Fell3().length ? `The list has ${b67And(b67Fell3().map(NAME))} on it now, from the streets of Y'Ghatan. She says ${b67Fell3().length > 1 ? 'them' : b67Him(b67Fell3()[0])} twice.` : 'The list is no longer than it was at Y\'Ghatan. She checks it twice to be sure.'}` : `Haddat watches the street mouth over the blue shield's rim. "My mother sold water to everybody," she says. "Wickans too, on the Odhan, when they came through. She said thirst does not ask who your grandmother was." She settles the shield. "This city never had a water-seller like her."`);
      if (b6In('sathi')) ln.push(sea ? `Sathi is at the rail, watching the sea like a plain she could ride if it would only hold still. "No horses," she says. "No grass. Water going nowhere." She grins with her filed teeth. "I hate it."` : `Sathi has a knife out and is not hiding it. "Wickans," she says. "This city's Wickans." Her voice is very flat. "I want to meet the ones who started this."`);
      if (b6In('tangle')) ln.push(sea ? `Tangle has the satchel open on his knees and is counting by feel, twice. "Dry," he says. "The sea gets into everything except Moranth clay. I asked the master to put that in his log. He wouldn't."` : `Tangle has a sharper in his fist and is looking at the planks under his feet and at the water under the planks. "Not on a jetty," he says. "Not with the boats." He puts it back. "Mincer would have found a way. Mincer would have sunk us."`);
      if (b6In('marrow')) ln.push(sea ? `Marrow is tying knots in her string by the light of the sandbox, one after another, not looking. "Y'Ghatan," she says, "and the plague, and now the sea. I am running out of string, child." She ties another.` : `Marrow has her bag open and is laying out what she has on a crate, in rows. "Cities," she says. "The worst of them is that there are always more hurt than there is linen." She closes the bag. "I'll want the Wickan children first, if it comes to it."`);
      if (b6In('mirrel')) ln.push(sea ? `Mirrel is rolling bandages on her knee in threes. "In Li Heng," she says, "we said the sea was where the plague went to drown." She rolls another. "It doesn't, does it."` : `Mirrel is counting the Wickan families behind the squad, in threes, as she counts everything. "Forty," she says. "And two babies." She counts again. "Forty and two."`);
      if (b6In('mehet')) ln.push(sea ? `Mehet is holding his ring of keys in both hands, and turns one over and over: the key to a door in Y'Ghatan that burned with the street. "I thought I would go back," he says. "After. To see what was standing." He looks at the sea. "This is very far from the street of the potters."` : `Mehet is looking up at the Hold on its rock. "Every city has one," he says. "A place on a hill where the people who decide things live." He turns a key over. "In Y'Ghatan it was the Falah'd's palace. It is ash." He does not say anything about the Hold. He does not need to.`);
      if (b6In('ottar')) ln.push(sea ? `Ottar is sharpening his shield's rim with long slow strokes. "Today's word was *rope*," he says. "Yesterday *bread*. Tomorrow you will teach me *wall*." He tests the rim with his thumb. "We have a word for it already. I would like yours."` : `Ottar stands with his shield grounded and his eyes on the street mouth. "In Perish," he says, "a city that turns on a people inside its own walls has a name." He thinks about it. "I will not teach you that word."`);
      if (b6In('tallow')) ln.push(sea ? `Tallow has his grandmother's deck out of its oilcloth and is not reading it. "She'd have read for the crew," he says. "Every one of them. For coppers." He wraps it. "They'd have come back, too."` : `Tallow is from Quon Tali, two days up the coast, and has been looking at the city all afternoon like a relative he owes money. "I always thought I'd come home in a fleet," he says. "With a band." He listens to the mob. "This isn't the band."`);
      if (b6In('hessa')) ln.push(sea ? `Hessa has her palm flat on the deck, which is all her prayers ever take. "The priests of D'rek were the best healers in Seven Cities," she says. "They found them dead in their temples, before the plague came. Before." She lifts her hand. "The Worm is patient. I am trying to be."` : `Hessa looks at the Wickan children behind the squad, and at the city. "We stand in front of them," she says, as if reading it off a temple wall. "That is all a door is for."`);
      if (b6In('tebbet')) ln.push(sea ? `Tebbet is waxing his bowstring in the cold. "I'd rather be a long way off," he says. "Look." He waves at the sea. "Everywhere is a long way off. I'm not enjoying it."` : `Tebbet is on a stack of crates with his bow, looking down into the street mouth. "I'd rather be a long way off," he says. "This is about the right distance." He nocks.`);
      if (b6In('darrut')) ln.push(sea ? `Darrut is oiling his big shield. "On the wall at Aren," he says, "we watched the ships come in and thought, at least they're not the sea." He considers it. "I've changed my mind about the sea."` : `Darrut is looking at the City Guard at the street mouth with an expression nobody in the squad has seen on him. "Guard," he says. "City Guard." He spits. "I was City Guard."`);
      if (b6In('yorin')) ln.push(sea ? `Yorin has the copper vane on his knee and it has not stopped swinging since the cold. "Serc's no use out here," he says. "Every wind is somebody's." He lets it spin.` : `Yorin puts a finger up to the smoke. "Wind off the land," he says. "It'll carry the fleet out, when it goes." He keeps the finger up. "That's the only good news I've got."`);
      if (b6In('rasp')) ln.push(sea ? `Rasp weighs the satchel in one hand and sets it down. "Malaz," she says. "I was a marine-trained sapper off the Malaz waterfront and they never let me into the marines." She looks north. "They'll still be there. The marines. And the waterfront."` : `Rasp has her back to the tar barrel and her face to her city. "I knew that street," she says, of the one burning. "There was a Wickan smith on it who made my first fuse-tongs." She weighs the satchel. "Lovely work. He'd be seventy."`);
      if (b6In('orvas')) ln.push(sea ? `Orvas is sitting with his lance across his knees, looking at it. "A Khundryl on a boat," he says. "My grandmother would weep. Loudly." He seems to think that is about right.` : `Orvas looks at the Wickan families. "Gall says the Khundryl and the Wickans rode together in the Odhan, after the Chain." He grips the lance. "This city wants us both. They say so."`);
      if (b6In('redblade')) ln.push(sea ? `Ramin is polishing the red scale. "My father would have called the wall of earth a sign," he says. "And the wolves." He polishes. "He'd have been right, for once."` : `Ramin has heard the word going round the waterfront: the Red Blades have gone up to the Hold, and will not be sailing. He polishes the red scale anyway. "Lent," he says. "And kept. I find I am glad of it today."`);
      if (b6In('warlock')) ln.push(sea ? `Keth is wrapped in two blankets. "*Water,*" the grandmother says, out of his mouth. "*Nothing but water. I was promised grass.*" Keth, his own voice: "No one promised you grass."` : `Keth is very quiet, looking at the smoke over the Wickan street. Then the grandmother speaks, very low. "*Those are ours. In there. Ours.*" Keth does not answer her.`);
      return {sp:sea ? 'The cook\'s sandbox' : 'The tar-barrel fire', scene:b67Scene(), txt:ln.length ? ln.join('\n\n') : `The squad, tonight, is you, and the fire. You sit with it a while.`,
        ch:[{t:'Back to the fire.', go:'b6_c7_fire'}]}; },

    /* ---- phase 4: Malaz City ---- */
    b6_c7_landfall:()=>({sp:'Malaz City', scene:'b6_malaz', fx:()=>{ S.f.b6_c7_ph = Math.max(4, b67Ph()); }, again:()=>`The harbour, the city, the Hold.`, txt:
`Malaz City comes up out of the sea at noon two days later: an island, a harbour, a city going up the slopes from the water in roofs and towers and smoke, and above it all, on its rock, Mock's Hold, dark against the sky. Everybody on the deck looks at the Hold. Not a word is said about it.

The harbour is too small for the fleet. The flagship goes in, and the warships, and the transports after, to whatever jetty there is room at. The squad's transport ties up at a jetty along the waterfront from the main one, where the marines are going ashore, close enough to see them and too far to hear.

There is smoke over the city. Not cooking smoke. Over one quarter, up from the water, it is black and thick, and the master, sniffing it, says it is a street burning. The captain asks the harbour-men on the jetty what street.

"Wickan street," one of them says, and looks at the Fourteenth's soldiers coming down the planks, and goes away fast.`,
      ch:[{t:'Down the plank.', onward:true, go:()=>{ startExplore('b6_c7_jetty'); talk('b6_c7_jetty_start'); }}]}),
    b6_c7_jetty_start:()=>({sp:'The waterfront', scene:'b6_c7_jetty', fx:()=>{ S.f.b6_c7_ph = Math.max(4, b67Ph()); S.f.b6_c7_ashore = 1; }, again:()=>`The waterfront, the smoke, the Hold.`, txt:
`The waterfront is loud. It has been loud since before the fleet came in, the harbour-men say, and it is getting louder.

The city has turned on its Wickans. Not one of the harbour-men will say who started it or why, only that it started days ago and has not stopped: a Wickan street burning, Wickan families dragged out of their houses, Wickan shops gutted. And now the Fourteenth is here, which brought Wickans with it out of Seven Cities, and the city has decided that is the same thing.

At the jetty's end, with the water at their backs, there are Wickan families: forty or so, women and children and old men, who came down to the harbour when they saw the fleet because the fleet was the only thing in Malaz City that might not be against them.${b67Say({sathi:'\n\nSathi looks at the families and her face goes very still. "Wickans," she says. "Theirs. This city\'s." She draws her knife.', warlock:'\n\nKeth stops dead on the planks. The grandmother says something out of his mouth, very fast and very low, and then nothing at all.', rasp:'\n\nRasp has stopped at the top of the plank. "My city," she says. "This is my city." She does not sound proud of it.', _:''})}`,
      ch:[{t:'The captain.', go:'b6_c7_orders'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_orders:()=>({sp:'Captain Hollet', scene:'b6_c7_jetty', fx:()=>{ S.f.b6_c7_orders = 1; }, again:()=>`The captain at the jetty's head.`, txt:
`The captain has the company on the jetty, in a line across it at the landward end, and is looking at the street mouth across the waterfront, where the noise is coming from.

"No orders," the captain says. "The flagship's sent none. The Fist's at the main jetty and hasn't sent any either." The captain looks back at the Wickan families. "So these are the orders. No one comes down this jetty who isn't the Fourteenth. No one goes into the water." A breath. "The Third has the jetty's foot. Hold it."`,
      ch:[{t:'"The jetty\'s foot."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the Wickan families at the jetty's end */
    b6_c7_wickans_fam:()=>({sp:'The jetty\'s end', scene:'b6_c7_jetty', fx:()=>{ S.f.b6_c7_famMet = 1; }, again:()=>`The Wickan families at the jetty's end.`, txt:
`The families have gathered at the jetty's end with what they could carry: bundles, a pot, a cradle, a saddle somebody would not leave. The children are very quiet. The old men stand in front of the women with knives. One of them has a horse-bow without a string.

Most of them have never seen the Wickan plains. They are the grandchildren of riders who came to Malaz with the old Emperor's armies, forty and fifty years ago, and stayed, and married, and became fishmongers and smiths and chandlers. The city knew their names yesterday.${b67If('warlock', '\n\nKeth goes along the families saying something in Wickan, low, over and over. A woman answers him, and then another. The grandmother is saying it with him.')}${b67If('orvas', '\n\nOrvas stands where the families can see him, with his black tears and his lance, and an old man among them looks at the tears and says the word for Khundryl, and it seems to comfort him.')}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_grandmother:()=>({sp:'A Wickan grandmother', scene:'b6_c7_jetty', fx:()=>{ S.f.b6_c7_gran = 1; if (!S.f.b6_c7_cloakGot && S.f.b6_c7_mobDone) { S.f.b6_c7_cloakGot = 1; gain('b6_c7_malazcloak'); } }, again:()=>`The grandmother, with her bundle.`, txt: !S.f.b6_c7_mobDone ?
`An old Wickan woman with a bundle on her knee and a long dun cloak round her shoulders is sitting on a bollard at the jetty's end, watching the street mouth. She speaks Malazan with a fishwife's waterfront voice.

"My husband sold rope on this jetty for forty years," she says. "They bought rope from him at the start of the week. By the end of it they had burned his shop." She looks at the soldiers. "He's dead. Before all this. I'm glad of it. That's what this city's done to me."` :
`The old woman stands up off her bollard when the squad comes back down the jetty, and takes the long dun cloak off her shoulders, and puts it round ${b67Here().length ? `${NAME(b67Here()[0])}'s` : 'your'} shoulders without asking.

"His," she says. "My husband's. Harbour wool, oiled. It'll keep the sea out." She settles it. "He'd want it to go with a soldier. He was one, once, for the old Emperor." She sits down again. "Don't argue. I'm too old for it."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the plank back up to the transport */
    b6_c7_plank:()=>({sp:'The plank', scene:'b6_c7_jetty', again:()=>`The plank up to the transport.`, txt:
`The transport's plank, and the master at the top of it with his arms folded, watching the waterfront. "No one comes up this plank who isn't yours," he says. "I don't care whose grandmother."${S.f.b6_c7_signal ? ' He looks out at the harbour, where the flagship is getting under way. "We go when she goes," he says. "With you or without."' : ''}`,
      ch:[{t:'The horns.', req:()=>!!S.f.b6_c7_guardDone && !S.f.b6_c7_signal, onward:true, go:'b6_c7_signal'},
          {t:'The roads.', req:()=>!!S.f.b6_c7_signal && !b67Key(), onward:true, go:'b6_c7_roads'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the optional alley: rioters with a Wickan boy */
    b6_c7_alley:()=>({sp:'The fish-shed alley', scene:'b6_c7_jetty', again:()=>`The alley between the fish sheds.`, txt: S.f.b6_c7_alleyDone ?
`The alley between the fish sheds, empty, with a boat-hook lying in it.` :
`Between two fish sheds there is an alley going up from the waterfront, and in the alley there are five men with clubs and a boat-hook walking a Wickan boy of fourteen or so down toward the water between them. He has a split lip and his hands are tied. He is not crying. He is looking at the squad.`,
      ch:[{t:'"Let him go." Shields.', req:()=>!S.f.b6_c7_alleyDone, go:()=>startBattle('b6_c7_alley', {})},
          {t:'Tell them the boy is the Fourteenth\'s prisoner now, and the Fourteenth wants him.', check:['guile', 16], req:()=>!S.f.b6_c7_alleyDone && !S.f.b6_c7_alleyTried, fx:()=>{ S.f.b6_c7_alleyTried = 1; },
            edges:id=>[id === 'sgt' && ['a sergeant\'s voice, and a sergeant\'s face', 2], id === 'rasp' && ['she talks Malaz waterfront, and they hear it', 2], id === 'darrut' && ['he sounds exactly like the Guard', 1], id === 'ottar' && ['a foreigner in grey plate; they do not believe a word', -2]],
            near:{t:()=>{ const w = b67Who(); return `Yes, but one of them looks at ${b67Nm(w)} a long time before he lets go, and says ${b67Nm(w) === 'you' ? 'your' : b67His(w)} face will be remembered on this waterfront: rattled.`; }, fx:()=>b67Rattle(b67Who())},
            go:'b6_c7_alley_talked', fail:'b6_c7_alley_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_alley_talked:()=>({sp:'The fish-shed alley', scene:'b6_c7_jetty', fx:()=>{ if (!S.f.b6_c7_alleyDone) { S.f.b6_c7_alleyDone = 'talked'; } }, txt:
`They look at the shields, and at the sergeant, and at the jetty behind, with the whole 9th on it, and one of them laughs, and lets go of the boy's arm. "Take him," he says. "Hang him yourselves. Save us the rope." They go back up the alley.

The boy walks down to the squad with his tied hands in front of him, and somebody cuts the cord, and he goes past the shields to the jetty's end without a word, where a woman among the families makes a sound nobody in the squad will forget.`,
      ch:[{t:'Back to the jetty.', go:()=>startExplore()}]}),
    b6_c7_alley_no:()=>({sp:'The fish-shed alley', scene:'b6_c7_jetty', txt:
`They listen, and the one in the fisherman's apron laughs. "The Fourteenth," he says. "That brought them. You want him? Come and get him."`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c7_alley', {surprise:'e'})}]}),
    b6_c7_alley_after:()=>({sp:'The fish-shed alley', scene:'b6_c7_jetty', fx:()=>{ if (!S.f.b6_c7_alleyDone) S.f.b6_c7_alleyDone = 'fought'; }, txt:
`The ones who can, run, up the alley and into the city. The boat-hook is left lying on the cobbles.

A knife cuts the boy's hands free. He looks at the squad, at every face, as if he means to remember them, and goes down to the jetty's end, to the families, where a woman takes hold of him and does not let go.${b67If('marrow', '\n\nMarrow follows him down with her bag, to see to the lip. "Hold still, child," she says. He does.')}`,
      ch:[{t:'Back to the jetty.', go:()=>startExplore()}]}),

    /* the Hold over the roofs (a silhouette only, ever) */
    b6_c7_holdview:()=>({sp:'Mock\'s Hold', scene:'b6_c7_jetty', fx:()=>{ S.f.b6_c7_holdSeen = 1; }, again:()=>`The Hold on its rock, over the roofs.`, txt:
`Between the harbour sheds there is a gap, and through it, up over the city's roofs, the rock and the Hold on it: dark walls against the sky, a tower, a flag nobody down here can make out.

Word comes along the waterfront in pieces, from runners and harbour-men and soldiers off other jetties. The Empress is in the Hold, they say. A new Fist came a month ago, a man called Aragan. ${S.f.b6_c7_mobDone ? 'The Red Blades have gone up to the Hold, every one of them, and will not be sailing. The Hold wants the Wickans and the Khundryl handed over, as the price of something. Not a soul on this waterfront knows what.' : 'What the Hold wants with the Fourteenth, the waterfront does not know. Everybody has a guess.'}

The squad does not go up there. The 9th does not go up there. The Hold is not for the likes of the 9th.${b67If('redblade', S.f.b6_c7_mobDone ? '\n\nRamin hears the word about the Red Blades, and stands very still, and then goes on polishing his red scale. "Lent," he says. "And kept."' : '')}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* a sailor off a dispatch boat: one line of the other squad, as rumour */
    b6_c7_news:()=>({sp:'A sailor off a dispatch boat', scene:'b6_c7_jetty', fx:()=>{ S.f.b6_c7_news = 1; }, again:()=>`The dispatch-boat sailor, coiling rope.`, txt:
`A sailor off a fast dispatch boat out of Seven Cities is coiling rope on the next berth along, and keeping his head down, and talks to soldiers because soldiers are safer company today than his own city.

"Onearm's dead," he says. "Plague. Before G'danisban, in the rain. They say the army chose its own High Fist, by shouting, the whole Host, from the ranks." He shakes his head. "${b67FRoad() === 'hanarara' ? 'And then marched off north-east after something in the sky, they say, to a city of the plague-marked.' : b67FRoad() === 'home' ? 'And some of them are coming home, they say, on the same boats as the dispatches.' : 'And then marched off north-east after something in the sky, they say, and nobody\'s heard since.'}" He coils. "Seven Cities. You're well out of it."${b67If('mirrel', '\n\nMirrel listens to the word *plague* the way she listens to everything, and does a sum in her head, and does not like it.')}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the street mouth: the mob (the main fight) */
    b6_c7_mob:()=>({sp:'The street mouth', scene:'b6_c7_jetty', again:()=>`The street mouth across the waterfront.`, txt: S.f.b6_c7_mobDone ?
`The street mouth, quieter, with things lying in it that people dropped when they ran.` : !S.f.b6_c7_orders ?
`Across the waterfront, the street mouth, and the noise coming down it. The captain has not given the Third its place yet.` :
`The noise comes down the street mouth first, and then the city does.

It comes out onto the waterfront in a crowd and stops, seeing the Fourteenth on the jetties. Then it sees the Wickan families behind the 9th's line. Then somebody at the front shouts something about the plains, and something about the army that brought them, and the crowd comes on.

You touch the edge of your shield, from habit, and the squad closes up.`,
      ch:[{t:'"Shields. None past."', req:()=>!!S.f.b6_c7_orders && !S.f.b6_c7_mobDone, go:()=>startBattle('b6_c7_jetty', {})},
          {t:'Drag the harbour carts across the jetty\'s foot first, so they come one way.', check:['might', 17], req:()=>!!S.f.b6_c7_orders && !S.f.b6_c7_mobDone && !S.f.b6_c7_braceTried, fx:()=>{ S.f.b6_c7_braceTried = 1; },
            edges:id=>[id === 'ottar' && ['he lifts the cart with his shield arm', 2], id === 'darrut' && ['Aren Guard: a barricade is a wall you build', 2], id === 'haddat' && ['she has braced a water-cart on a hill', 1], id === 'tangle' && ['he would rather blow it up', -1], id === 'mehet' && ['he is still finding his feet on land', -1]],
            near:{t:()=>{ const w = b67Who(); return `Yes, but a cart's shaft comes round as ${b67Nm(w)} ${b67V(w, 'set', 'sets')} it and catches a shoulder: bruised.`; }, fx:()=>bruise(b67Who(), bruiseN())},
            go:()=>startBattle('b6_c7_jetty', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c7_mob_late'},
          {t:'The captain first.', req:()=>!S.f.b6_c7_orders, go:'b6_c7_orders'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_mob_late:()=>({sp:'The street mouth', scene:'b6_c7_jetty', txt:
`The cart will not shift. Its wheel is chocked with a fish crate somebody nailed down, and by the time the crate comes up the city is on the jetty.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c7_jetty', {surprise:'e'})}]}),
    b6_c7_jetty_after:()=>({sp:'The jetty', scene:'b6_c7_jetty', fx:()=>{ if (S.f.b6_c7_mobDone) return; S.f.b6_c7_mobDone = 1; S.f.b6_c7_shouts = 1; }, txt:
`The mob goes back up the waterfront, carrying its hurt, and stops at the street mouth, and stays there, shouting. The City Guard stand at the street mouth with it, watching.

Then, down the waterfront from the main jetty, there is a sound that is not the mob. A voice. One voice, very loud, a Fist's voice, shouting at somebody, and then the marines' voices answering, all together, the way soldiers answer when they mean it. The words do not carry this far. The shape of them does: a line being drawn.

A runner comes along the waterfront from the main jetty, a marine, grinning in a way nobody has grinned all day. "He's said it," the marine says, to anybody. "The Fist. To the mob and the Guard and the Hold, the lot. We're the Adjunct's. Not theirs." He runs on, to the next jetty, to say it again.

Somewhere along the docks, after that, there are great flat bangs, one after another, and the screaming moves away from the water. "Cussers," somebody says. "On ballista bolts." The marines, then. No one else would.${b67Say({tangle:'\n\nTangle listens to the bangs with his head on one side. "Cussers on bolts," he says. "From a ballista." His face goes soft. "Oh, that\'s lovely."', rasp:'\n\nRasp listens to the bangs with her head on one side. "Cussers on bolts," she says. "Marines." She weighs the satchel. "Lovely."', _:''})}`,
      ch:[{t:'Back to the jetty.', go:()=>startExplore()}]}),
    b6_c7_shouts:()=>({sp:'The main jetty', scene:'b6_c7_jetty', again:()=>`The main jetty, along the waterfront.`, txt: S.f.b6_c7_mobDone ?
`Along the waterfront the main jetty is a solid block of marines, and the mob is not at it any more. The Perish hold the docks in the middle of the harbour, in a grey wall, and nobody is going near them either.${b67If('ottar', ' Ottar looks at the grey wall a long time. "Yes," he says.')}` :
`Along the waterfront, the main jetty, where the marines went ashore: a solid block of soldiers at its landward end, and the city in front of them, and the noise of it. It is too far to hear anything but noise. It is close enough to see that the marines are not moving back.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the City Guard come for the Wickan families */
    b6_c7_guard_come:()=>({sp:'The City Guard', scene:'b6_c7_jetty', again:()=>`The City Guard at the jetty's foot.`, txt: S.f.b6_c7_guardDone ?
`The street mouth, and no Guard in it now.` :
`The City Guard come down from the street mouth in a body when the mob has gone back: a dozen, in the Guard's coats, with a sergeant at their head who has a paper in his hand and has decided he does not need to read it out.

"The Wickans," he says. "Orders. They're to be taken up into the city, for their own safety." The mob at the street mouth laughs at *safety*. "Step aside, soldiers. This isn't your city."${b67If('darrut', '\n\nDarrut looks at the Guard sergeant\'s coat, and at his own hands. "Aren," he says. "We shut the gate. They died under it." He sets his shield. "Not again."')}`,
      ch:[{t:'"Not up this jetty." Shields.', req:()=>!S.f.b6_c7_guardDone, go:()=>startBattle('b6_c7_guard', {})},
          {t:'Ask to read the order, and read it out to the whole waterfront.', check:['wits', 17], req:()=>!S.f.b6_c7_guardDone && !S.f.b6_c7_guardTried, fx:()=>{ S.f.b6_c7_guardTried = 1; },
            edges:id=>[id === 'sgt' && ['you have read a great many orders in a great many hands', 2], id === 'darrut' && ['he knows how a Guard order is written', 2], id === 'rasp' && ['a Malaz voice, reading Malaz paper', 1], id === 'tallow' && ['he talks too much, which helps here', 1], id === 'sathi' && ['she would rather knife him', -2]],
            near:{t:()=>{ const w = b67Who(); return `Yes, but the Guard sergeant snatches the paper back before ${b67Nm(w)} ${b67V(w, 'finish', 'finishes')} and the mob throws a cobble, and it finds ${b67Pos(w)} brow: bruised.`; }, fx:()=>bruise(b67Who(), bruiseN())},
            go:'b6_c7_guard_read', fail:'b6_c7_guard_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_guard_read:()=>({sp:'The City Guard', scene:'b6_c7_jetty', fx:()=>{ if (!S.f.b6_c7_guardDone) S.f.b6_c7_guardDone = 'talked'; }, txt:
`${by({sgt:'You take', _:'{who} takes'})} the paper out of the Guard sergeant's hand before he can close it, and reads it, loudly, the whole of it, down to the seal and the clerk's mark at the foot.

It is not an order to take anybody anywhere for their safety. It is an order to *clear the waterfront of disorder*, and it is signed by nobody anybody on the waterfront has heard of, and it does not mention Wickans at all.

The Guard sergeant has gone red. His Guardsmen have started to look at each other. On the next jetty a marine laughs. The Guard sergeant takes the paper back, and folds it, and takes his Guard back up to the street mouth, and the mob jeers at him all the way, which nobody on the jetty minds.`,
      ch:[{t:'Back to the jetty.', go:()=>startExplore()}]}),
    b6_c7_guard_no:()=>({sp:'The City Guard', scene:'b6_c7_jetty', txt:
`The Guard sergeant puts the paper away inside his coat. "Read it yourself," he says. "In the Hold." He draws.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c7_guard', {surprise:'e'})}]}),
    b6_c7_guard_after:()=>({sp:'The jetty', scene:'b6_c7_jetty', fx:()=>{ if (!S.f.b6_c7_guardDone) S.f.b6_c7_guardDone = 'fought'; }, txt:
`The City Guard go back up to the street mouth, carrying their sergeant between two of them, and the mob does not cheer them this time.

Behind the squad, at the jetty's end, the Wickan families have not moved. An old man with an unstrung horse-bow has stood in front of them the whole time. He sits down now, on a crate, very slowly.${b67If('hessa', '\n\nHessa goes and stands by him. "We stand in front," she tells him. "You can sit." He does not understand a word of it, and nods.')}`,
      ch:[{t:'Back to the jetty.', go:()=>startExplore()}]}),

    /* ---- phase 5: the fleet's horns, and the roads ---- */
    b6_c7_signal:()=>({sp:'Horns', scene:'b6_c7_finale', fx:()=>{ S.f.b6_c7_signal = 1; S.f.b6_c7_ph = Math.max(5, b67Ph()); }, again:()=>`The horns from the harbour, and the fleet getting under way.`, txt: !S.f.b6_c7_guardDone ?
`The harbour is busy, and the squad is busier. The City Guard are at the street mouth.` :
`At dusk the horns go, from the flagship and then from every warship in the harbour, and the fleet starts to move.

Not slowly. The flagship is already off her jetty and going out with her sails half up. The warships go after her. Up and down the waterfront the transports' crews are hauling in their planks with the soldiers still running up them, and the marines are coming off the main jetty in a block, backwards, with their crossbows up. Out past the harbour mole there are more sails, coming in from the sea: Nok's own warships, the master says, and they are not coming in to wave the fleet goodbye.

On the squad's jetty the master has the plank half in. Behind the squad the Wickan families are looking at the transports, and at the city, and at the soldiers. Up in the lanes a Wickan house is still burning, and in the gaps of the mob's noise there is singing coming from somewhere up there, low, in Wickan.

The captain is at the plank. "Now," the captain says, "or not at all, Sergeant."`,
      ch:[{t:'The roads.', req:()=>!!S.f.b6_c7_guardDone, onward:true, go:'b6_c7_roads'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_roads:()=>({sp:'The roads', scene:'b6_c7_finale', fx:()=>{ S.f.b6_c7_signal = 1; S.f.b6_c7_ph = Math.max(5, b67Ph()); }, again:()=>`The plank, the lanes, the jetty.`, txt: b67Key() ?
`It is decided. ${b67Key() === 'adjunct' ? 'The Third is going with the fleet.' : b67Key() === 'jetty' ? 'The Third is staying on the jetty.' : 'The Third is going into the lanes.'}` :
`The transports are going. The master has his hands on the plank. Everybody is looking at you, the way they have looked at you since Aren, because you are the sergeant, and the sergeant is who decides.

There are three roads off this jetty.

*Up the plank, now, with the fleet,* out of the harbour behind the Adjunct before Nok's warships close the mole, to wherever she takes it.

*Stay on the jetty.* Hold its foot while the last boats go, with the Wickan families behind you, and let the fleet sail without the Third. Malaz City, with its Guard and its mob and its Hold, and the Third left in it.

*Into the lanes, after the singing.* A Wickan family in a house up the lane, and the city at the door, and then out of the landward gate with whoever the squad can bring, and gone.${b67Say({haddat:'\n\n"Water-sellers\' rule," Haddat says, quietly. "No one into the water." She does not say which road that means. She means you to work it out.', _:''})}${b67If('marrow', '\n\nMarrow has her bag on her back already. "There are hurt children up those lanes, child," she says. "And on that ship. Choose. I\'ll go where you go."')}${b67If('tangle', '\n\nTangle hefts the satchel. "Whatever you say, Sergeant." He means it.')}${b67If('mehet', '\n\nMehet holds up his ring of keys, all the doors that are not there any more. "I stayed once," he says. "When everybody left. I know what staying is." He does not tell you to.')}${b67If('ottar', '\n\nOttar looks out at the grey ships in the harbour, and then at you. "My Destriant sent me to you," he says. "Not to the ship. To you."')}${b67If('sathi', '\n\nSathi is already looking up the lanes, toward the singing.')}${b67If('warlock', '\n\n"*Up there,*" the grandmother says, out of Keth\'s mouth. "*Ours.*" Keth says nothing at all, and does not move until you do.')}${b67If('rasp', '\n\nRasp looks at the city. "I left it once," she says. "I can leave it again. Or not." She shrugs the satchel up. "Your call."')}`,
      ch:[{t:'"Up the plank. With the fleet." (with the Adjunct)', req:()=>!b67Key(), fx:()=>{ S.f.b6_c7_key = 'adjunct'; b67L('ottar', 1); b67L('tangle', 1); b67L('rasp', 1); b67L('warlock', -2); b67L('sathi', -1); b67L('orvas', -1); }, go:'b6_c7_adjunct'},
          {t:'"We hold the jetty\'s foot. Let them sail." (left on the jetty)', req:()=>!b67Key(), fx:()=>{ S.f.b6_c7_key = 'jetty'; b67L('haddat', 1); b67L('hessa', 1); b67L('darrut', 1); b67L('mirrel', 1); b67L('ottar', -1); b67L('tangle', -1); }, go:'b6_c7_jetty_road'},
          {t:'"Into the lanes. After the singing." (with the Wickans)', req:()=>!b67Key(), fx:()=>{ S.f.b6_c7_key = 'wickans'; b67L('sathi', 2); b67L('warlock', 2); b67L('orvas', 1); b67L('marrow', 1); b67L('ottar', -1); b67L('rasp', -1); }, go:'b6_c7_wickans_road'},
          {t:'"Not yet."', req:()=>!b67Key(), go:()=>startExplore()},
          {t:'On.', req:()=>!!b67Key(), onward:true, go:b67Next()},
          {t:'Not now.', req:()=>!!b67Key(), go:()=>startExplore()}]}),
    b6_c7_adjunct:()=>({sp:'With the fleet', scene:'b6_c7_finale', txt:
`Up the plank at a run, the squad and the rest of the 9th, with the master hauling it in behind the last boot, and the transport is off the jetty before anybody has found a place to stand.

At the jetty's foot the Wickan families stand and watch it go. The captain has shouted to the next jetty, where the marines' boats are still taking people off, and some of the families are going along the waterfront that way, at a run. Not all. You watch the ones who stay until the transport turns and the jetty goes behind a ship's hull.

The fleet goes out past the mole in the dusk with the land wind behind it, and Nok's warships come round the point too late, and turn, and do not follow.${b67If('ottar', '\n\nOttar stands at the stern rail with his helm under his arm, watching Malaz City go. "So," he says. "Now I know how the Malazans leave a city." He does not say whether he approves.')}`,
      ch:[{t:'The last of it.', onward:true, go:'b6_c7_last'}]}),
    b6_c7_jetty_road:()=>({sp:'Left on the jetty', scene:'b6_c7_finale', txt:
`The master looks at you, and at the families, and hauls the plank in without another word. The transport goes off the jetty with the rest of the 9th at its rail, and the captain at the stern, looking back, with the company's book under one arm.

The Third stays at the jetty's foot with its shields locked, and the families behind it, while the last of the fleet goes out past the mole in the dusk. The mob comes down to the waterfront again when the sails are gone. It finds the Third still there. It looks at the Third a long time, and goes back up into the city.

When it is dark, the families go along the waterfront in twos and threes, to the fishing boats, to cousins, to wherever a Wickan family goes in Malaz City now. The Third stays until the last of them have gone.${b67If('haddat', '\n\nHaddat says the names of the ones who died on this jetty today, which she does not know, so she says what they were. A docker. A fishwife. A Guardsman. She says them anyway.')}`,
      ch:[{t:'The last of it.', onward:true, go:'b6_c7_last'}]}),
    b6_c7_wickans_road:()=>({sp:'With the Wickans', scene:'b6_c7_lanes', fx:()=>{ S.f.b6_c7_inLanes = 1; }, txt:
`The transport goes off the jetty behind you with the 9th at its rail and the captain at the stern, shouting something you will never hear, and the Third goes the other way: across the waterfront, past the street mouth while the mob is watching the fleet go, and up into the lanes, toward the singing.

The Wickan families stay at the jetty's end, where the marines' boats can reach them. The old man with the unstrung bow tells you which house it is.`,
      ch:[{t:'Up the lane.', onward:true, go:()=>{ startExplore('b6_c7_lanes'); talk('b6_c7_lanes_start'); }}]}),

    /* ---- the lanes (the 'wickans' road) ---- */
    b6_c7_tolanes:()=>({sp:'The way into the streets', scene:'b6_c7_jetty', again:()=>`The way up into the lanes.`, txt: b67Key() === 'wickans' ?
`The way up into the lanes, toward the singing.` :
`The way up into the lanes, between the harbour sheds. The city is up there. The Third's place is the jetty.`,
      ch:[{t:'Up into the lanes.', req:()=>b67Key() === 'wickans' && !S.f.b6_c7_gone, onward:true, go:()=>{ S.f.b6_c7_inLanes = 1; startExplore('b6_c7_lanes'); talk('b6_c7_lanes_start'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_lanes_start:()=>({sp:'The lanes', scene:'b6_c7_lanes', fx:()=>{ S.f.b6_c7_inLanes = 1; }, again:()=>`The lanes behind the waterfront, at dusk.`, txt:
`The lanes behind the waterfront go up from the water steeply, narrow and crooked, with the upper floors leaning together over them, and every door shut. Torches move in them, two lanes over, three. A Wickan street is burning to the north, and the light of it is on every wall.

The singing is up this lane, and getting louder as the squad climbs, low, in Wickan.${b67If('mehet', '\n\nMehet looks at the lanes and something in his face settles. "Streets," he says. "I know streets." He takes the lead without being asked, and never once stands with his back to a wall.')}`,
      ch:[{t:'Up the lane.', go:()=>startExplore()}]}),
    b6_c7_house:()=>({sp:'The Wickan house', scene:'b6_c7_lanes', again:()=>`The Wickan house at the top of the lane.`, txt: S.f.b6_c7_streetsDone ?
`The Wickan house, its door open now, and empty.` :
`At the top of the lane, a narrow house with its door barred, and the singing coming from behind it, and in the lane in front of it a dozen of the city with torches and clubs, and two of the City Guard among them, not stopping it. There is a ladder against the wall. There is a jar of oil.`,
      ch:[{t:'"Shields." Into the lane.', req:()=>!S.f.b6_c7_streetsDone, go:()=>startBattle('b6_c7_streets', {})},
          {t:'Up the next house and across the roofs, and drop on them from above.', check:['wits', 16], req:()=>!S.f.b6_c7_streetsDone && !S.f.b6_c7_roofTried, fx:()=>{ S.f.b6_c7_roofTried = 1; },
            edges:id=>[id === 'mehet' && ['he knows how city roofs join', 2], id === 'sathi' && ['quick and light, and she wants this', 2], id === 'tebbet' && ['he would rather be above it', 1], id === 'ottar' && ['grey plate on a roof', -2], id === 'darrut' && ['the big shield does not climb', -1]],
            near:{t:()=>{ const w = b67Who(); return `Yes, but a tile goes from under ${b67Pos(w)} boot on the way across, and ${b67Nm(w)} ${b67V(w, 'come', 'comes')} down hard on the next roof: bruised.`; }, fx:()=>bruise(b67Who(), bruiseN())},
            go:()=>startBattle('b6_c7_streets', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c7_roof_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_roof_seen:()=>({sp:'The Wickan house', scene:'b6_c7_lanes', txt:
`A tile goes, and slides, and smashes in the lane, and every face below looks up.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c7_streets', {surprise:'e'})}]}),
    b6_c7_streets_after:()=>({sp:'The landward gate', scene:'b6_c7_lanes', fx:()=>{ if (S.f.b6_c7_streetsDone) return; S.f.b6_c7_streetsDone = 1; }, txt:
`The gate's Guard go back into their gatehouse and shut the door on themselves, and the landward gate stands open, with the road beyond it going up into the island's hills in the dusk.

The family is a woman and her mother and four children and a boy of sixteen with a horse-bow, strung. The singing was the mother. She has stopped now. She looks at the squad, and at the city behind, and at the road, and says something in Wickan that nobody in the Third understands but everybody does.${b67If('warlock', '\n\nKeth answers her. Then the grandmother answers her, out of his mouth, and the old woman laughs, once, very surprised.')}`,
      ch:[{t:'Out of the gate.', onward:true, go:'b6_c7_gate'}]}),
    b6_c7_gate:()=>({sp:'The landward gate', scene:'b6_c7_lanes', fx:()=>{ if (S.f.b6_c7_streetsDone) S.f.b6_c7_gone = 1; }, again:()=>`The landward gate, and the road into the hills.`, txt: !S.f.b6_c7_streetsDone ?
`The landward gate, shut, with the Guard on it. There is a family up the lane first.` :
`Out of the landward gate, the Third and the family, onto the road that goes up into the island's hills in the dark. Behind, the city is still loud, and the burning street is a red smudge on the sky. Ahead there is a fishing village on the far side of the island, the boy with the bow says, where there are cousins, and boats, and the mainland across the water, and beyond the mainland, a long way off, the Wickan plains that none of them have ever seen.

The fleet will be well out to sea by now. The Third does not look for it.`,
      ch:[{t:'The last of it.', req:()=>!!S.f.b6_c7_streetsDone, onward:true, go:'b6_c7_last'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_lanes_back:()=>({sp:'The way down', scene:'b6_c7_lanes', again:()=>`The lane going down to the water.`, txt:
`The lane goes down to the waterfront, and the waterfront is the mob's again now that the fleet is going. There is nothing down there for the Third.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_shop:()=>({sp:'A shut shop', scene:'b6_c7_lanes', again:()=>`The shut shop with the painted horse.`, txt:
`A chandler's with its shutters barred and a horse painted small over the door, the way the Wickan shops in this city are marked by the people who own them. The horse has been painted over in red, and later someone has scraped the red half off again.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c7_brazier:()=>({sp:'A street brazier', scene:'b6_c7_lanes', again:()=>`The brazier at the corner, with nobody at it.`, txt:
`A brazier at a corner, lit and left. Whoever lit it has gone up toward the burning street with a torch from it. The coals tick.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the end of the chapter, and of Book Six */
    b6_c7_last:()=> !b67Key() ? ({sp:'The jetty', scene:'b6_c7_finale', txt:
`The road is not chosen yet.`,
      ch:[{t:'Not yet.', go:()=>startExplore()}]}) : b67Key() === 'wickans' && !S.f.b6_c7_streetsDone ? ({sp:'The lanes', scene:'b6_c7_lanes', txt:
`The family is still up the lane.`,
      ch:[{t:'Not yet.', go:()=>startExplore()}]}) : ({sp:'The last of it', scene:'b6_c7_finale', fx:()=>{ S.f.b6_c7_lastSeen = 1; }, txt:
`${b67Key() === 'adjunct' ? 'The squad stands at the transport\'s rail in the dark with the land wind behind, and the fleet strung out ahead, and Malaz City going down behind into the night, still burning in one place.' : b67Key() === 'jetty' ? 'The squad sits at the jetty\'s foot in the dark with its shields across its knees, and the harbour empty in front of it, and the city behind, quieter now.' : 'The squad walks up the hill road in the dark behind a Wickan family, with a boy with a horse-bow at the front, and the city going down behind it, still burning in one place.'}

You count the squad, from habit, and get the number, and check it.${b67Bone() ? ' The finger bone at your throat knocks against your mail at every step.' : ''}`,
      ch:[{t:'Go.', onward:true, go:()=>chapterEnd(7, b67Key())},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* ============ the end of Book Six: both squads (37's showFinale, extended below for the Fourth's pages and Where the books meet) ============ */
const B67FIN = {};
B67FIN.KEYS = ['adjunct', 'jetty', 'wickans'];
B67FIN.key = k => B67FIN.KEYS.includes(k) ? k : B67FIN.KEYS.includes(S.f.b6_c7_key) ? S.f.b6_c7_key : 'adjunct';
B67FIN.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B67FIN.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
/* the Third's Book Six, in one line per soldier: Ch1's barrows, Ch3's fire, Ch5's bone (each read with a default) */
/* Ottar came aboard at sea: Y'Ghatan, its barrows and its bones are not his */
B67FIN.barrows = id => id === 'ottar' ? '' : b67Buried() ? `At Y'Ghatan, the last night before the assault, ${id === 'sgt' ? 'you' : b67He(id)} put the old dead back in their barrows with the squad.` : S.f.b6_c1_key === 'leave' ? `At Y'Ghatan the squad rested under the walls, and the barrows stayed open.` : '';
B67FIN.fire = id => id === 'ottar' ? '' : b67WentIn() ? `When the city burned, ${id === 'sgt' ? 'you' : b67He(id)} went into the streets with the squad to hold Sinn's way open, and came out by it.` : `When the city burned, ${id === 'sgt' ? 'you' : b67He(id)} held the gate with the squad and pulled the burned out of the smoke.`;
B67FIN.bone = id => b67Bone() && id !== 'ottar' ? `${id === 'sgt' ? 'You wear' : `${b67Cap(b67He(id))} wears`} the finger bone from Y'Ghatan, as the soldiers who walked out of it do.` : '';

B67FIN.ending = key => {
  const T = {adjunct:['Out with the fleet', 'b6_c7_finale'], jetty:['Left on the jetty', 'b6_c7_finale'], wickans:['With the Wickans', 'b6_c7_finale']}[key] || ['Out with the fleet', 'b6_c7_finale'];
  if (typeof S === 'undefined' || !S || !S.f) return {title:T[0], scene:T[1], paras:[]};
  try {
    const mates = b67Here().map(NAME), n = b67Here().length + 1;
    let P;
    if (key === 'adjunct') P = [
`The fleet goes west out of Malaz harbour in the night with the land wind behind it, and Nok's warships turn at the mole and do not follow. Behind it the city has its Hold and its Empress and its mob and its new First Sword. Ahead there is the sea, and whatever the Adjunct means to do with an army that has been told, from a jetty, that it is hers.`,
`${mates.length ? `${b67And(mates)} ${mates.length > 1 ? 'are' : 'is'} at the rail with you.` : 'You are at the rail alone, and the captain puts two of the 9th beside you so that it looks like a squad.'} Where the fleet is going, the 9th does not know. It has never known that about any road.`,
`At every halt, even at sea, the Third counts itself, and gets ${numw(n)}, and checks it. The Third's road goes on, with the Adjunct: Book Seven, when it is written, will offer this save.`];
    else if (key === 'jetty') P = [
`The fleet goes out of Malaz harbour in the dusk without the Third. On a page of the captain's book, against a squad's number, it says *left at Malaz City, holding a jetty*, and nothing about whether that was an order.`,
`${mates.length ? `${b67And(mates)} ${mates.length > 1 ? 'stay' : 'stays'} with you.` : 'You stay alone.'} When the Wickan families have gone along the waterfront in the dark to wherever a Wickan family goes in Malaz City now, the Third gets up off the jetty, and goes into the city it held a jetty against, and finds that a city that has burned itself out is a quiet place for a while.`,
`There is no road onward from here. The Third is in Malaz City, under the Hold, a long way from any army.`];
    else P = [
`The fleet goes out of Malaz harbour in the dusk without the Third. The Third is on the hill road by then, behind a Wickan family, with a boy with a horse-bow at the front of it.`,
`${mates.length ? `${b67And(mates)} ${mates.length > 1 ? 'walk' : 'walks'} with you.` : 'You walk alone with them.'} On the far side of the island there is a fishing village with cousins in it, and boats, and the mainland across the water, and beyond the mainland the Wickan plains, which none of the family has ever seen and all of them talk about.`,
`There is no road onward from here. No one is looking for a squad that walked out of Malaz City behind a Wickan grandmother.`];
    return {title:T[0], scene:T[1], paras:P};
  } catch(e) { return {title:T[0], scene:T[1], paras:[]}; }
};

/* a road line per soldier per road, and a closing line by loyalty */
B67FIN.T = {
  haddat:{title:'The names', adjunct:'Haddat stands at the stern rail with the blue shield on her arm and says the names as Malaz City goes down behind, all of them, the old ones from Hissar and the new ones.', jetty:'Haddat stays at the jetty\'s foot with the blue shield, because nobody was to go into the water, and nobody did. She says the names that night: the ones from Hissar, and the ones from the jetty, whose names she never knew.', wickans:'Haddat walks behind the Wickan family on the hill road with the blue shield on her back, and the mother teaches her the Wickan for *water*, and Haddat teaches her the Hissari.',
    mem:'Her list is longer than it was at Raraku.', loy:['"Sergeant," she says, at the end of the names, every night. She means you are on the list of the ones she says while they are alive.', 'She says your name with the others at night, the way she says the ones she has lost track of.', '"You are not on the list," she tells you. "Good. Stay off it."']},
  sathi:{title:'Laughing', adjunct:'Sathi rides a ship as she rides everything, badly and laughing, and hates the sea out loud every day of it.', jetty:'Sathi stays on the jetty with her knife out, and when the mob comes back after the fleet is gone she laughs at it, and it goes away.', wickans:'Sathi walks up the hill road behind a Wickan family, the first Wickans she has met who were not riders, and talks to the children about horses until they are sick of horses.',
    mem:'She laughs at funerals. She laughed at Y\'Ghatan.', loy:['"You\'re all right, for infantry," she tells you. It is the best thing a Wickan has ever said to a Malazan.', 'She walks a little apart from you now.', 'She calls you *Sergeant* the Wickan way, which means nothing and everything.']},
  tangle:{title:'The count', adjunct:'Tangle counts the satchel at the rail every morning, twice, out loud, and the marines on the next transport have started to ask what he has in it.', jetty:'Tangle stays on the jetty and counts the satchel by feel in the dark, twice. In Malaz City, he says, there is a man who sells Moranth clay under the counter. He means to find him.', wickans:'Tangle walks up the hill road with the satchel, which is the Empire\'s, and has decided the Empire will not miss it, and counts it every morning, twice.',
    mem:'The prayer bead is still on his wrist. He says Mincer\'s name at the end of the count.', loy:['"You point," he says, "and I make it stop being there." From a sapper there is nothing warmer.', 'He tells you the count now, and nothing else.', '"Dry," he tells you, every morning.']},
  marrow:{title:'The string', adjunct:'Marrow goes down into the hold every day with her bag, and the 9th\'s sick call her *mother*, and she calls them *child*.', jetty:'Marrow stays on the jetty, and when the families go she goes with the last of them, to see to a child with a cough, and comes back at dawn with a new knot in her string.', wickans:'Marrow walks up the hill road beside the Wickan grandmother, and they argue about herbs all the way to the far side of the island, and agree about nothing, and are delighted.',
    mem:'The string has a knot in it now for everyone from Y\'Ghatan. She is still tying.', loy:['"Child," she says to you, still, and once, "Sergeant, child," which is both.', 'She heals you as she heals everybody, and says no more than she must.', '"You\'ll do, child," she says.']},
  mirrel:{title:'Three, and up', adjunct:'Mirrel goes down into the hold with her bag every day and counts the sick in threes, and the count gets smaller.', jetty:'Mirrel stays on the jetty, and in the morning she finds a poorhouse up from the waterfront with sixty beds and one tired healer, and that is how she likes it.', wickans:'Mirrel walks up the hill road with the hospice bag across her shoulder, and counts the family in threes at every halt. Seven. She checks.',
    mem:'In Li Heng they said the sea was where the plague went to drown. She has stopped saying it.', loy:['"Sit," she tells you, at the end of every day. "Hand. Other hand. Good."', 'She tends you as she tends everybody, quickly, and moves on.', '"You\'ll keep," she tells you. From Mirrel it is a diagnosis.']},
  mehet:{title:'The keys', adjunct:'Mehet stands at the stern rail with his ring of keys and watches another city go down behind him, and does not say whether it is easier the second time.', jetty:'Mehet stays on the jetty, and then in the city, which has streets, and in a week he knows them all, and which walls are newer than they look.', wickans:'Mehet walks up the hill road ahead of the family, because he knows how a road leaves a city, and never once stands with his back to a wall.',
    mem:'He stayed in Y\'Ghatan when the Falah\'d sent the city out, because somebody had to know where the cisterns were. He has not said why else.', loy:['He gives you a key off his ring, to a door in Y\'Ghatan that is ash. "You will not need it," he says. "Keep it."', 'He counts the Malazans the way they count him, still.', '"Streets," he says to you, of every place you go. "Every place has streets."']},
  ottar:{title:'The word for wall', adjunct:'Ottar stands at the stern with his helm under his arm, learning the Malazan for the sea, and the ship, and the Adjunct, one word a day, and goes where his Destriant sends him, which is still the Third.', jetty:'Ottar stays on the jetty with the Third and watches the grey ships go out with the fleet, and does not go after them. "He sent me to you," he says. "Not to the ship."', wickans:'Ottar walks up the hill road behind a Wickan family in grey plate, and prays before he eats at every halt, briefly, and the children copy him.',
    mem:'In the cold, with the ice going by, he heard his god, and knelt on the deck. He has not said what was said.', loy:['"Sergeant," he says to you, carefully, as a rank. It sounds like one, in his mouth.', 'He is courteous to you. Only that.', 'He teaches you a word in Perish every day, one for one.']},
  tallow:{title:'Mostly they came back', adjunct:'Tallow reads the Deck for the 9th at sea on an upturned bucket, badly, from his grandmother\'s cards, and the crew comes to watch.', jetty:'Tallow stays in Malaz City, two days down the coast from where he was born, and reads the Deck for the fishermen on the waterfront. They mostly come back.', wickans:'Tallow walks up the hill road with his grandmother\'s cards in his shirt, and at the fishing village on the far side he reads for the boats.',
    mem:'The cards went quiet on the water.', loy:['"You\'re the one she\'d have read for," he tells you. "You\'d have come back."', 'He talks less to you than he did.', 'He still talks too much. You have stopped minding.']},
  hessa:{title:'The door', adjunct:'Hessa stands in the hold\'s hatch like a temple door, and the 9th\'s sick sleep easier for it.', jetty:'Hessa stays on the jetty, and in the morning she goes looking for D\'rek\'s temple in Malaz City, and finds it, small and old, and stands at its door.', wickans:'Hessa walks up the hill road behind the family, and at night she stands between them and the road like a door.',
    mem:'The priests of D\'rek were found dead in their temples before the plague. She has not decided what the Worm meant by it.', loy:['"You are a door too, Sergeant," she tells you.', 'She guards you as she guards everybody.', '"Stand where she can see you," she says, before everything.']},
  tebbet:{title:'A long way off', adjunct:'Tebbet goes up the rigging with his bow, because the masthead is the longest way off on a ship, and the crew lets him.', jetty:'Tebbet stays on the jetty, and in a week he has found the one tower in Malaz City you can see the whole harbour from, and is on it.', wickans:'Tebbet walks the hill road out on the flanks, far out, which is where he always wanted to be.',
    mem:'He would rather be a long way off. The sea was too far.', loy:['"I\'d rather be a long way off," he says. "With you. That\'s the thing."', 'He goes out on the flanks more often now.', 'He brings you a fish, sometimes, and goes again.']},
  darrut:{title:'The wall', adjunct:'Darrut stands at the rail with his big shield and watches the City Guard on the waterfront grow small, and says nothing about Aren.', jetty:'Darrut stays on the jetty, and in a month the City Guard of Malaz has offered him a sergeant\'s coat, and he has thrown it in the harbour.', wickans:'Darrut walks up the hill road with his big shield, and at the landward gate he stood in front of the Guard\'s gatehouse door until it shut.',
    mem:'He was on the wall at Aren when the gate shut on the Chain. At Malaz City he did not shut anything.', loy:['"You\'d have done in the Guard," he tells you. From an Aren man it is everything.', 'He stands where you put him, and no nearer.', '"Sergeant," he says, Guard-fashion.']},
  yorin:{title:'Clear tomorrow', adjunct:'Yorin tells the master what the wind will do, every morning, and is right, and the master has started to listen.', jetty:'Yorin stays in Malaz City, and a barge-master on the waterfront hires him to say when it will rain.', wickans:'Yorin walks up the hill road and says it will be clear tomorrow. It is.',
    mem:'He felt the wall of earth come up out of the sea, and says it was not anything he knows.', loy:['"Clear tomorrow, Sergeant," he tells you, every night.', 'He tells you what the sky will do, when you ask.', '"Wind off the land," he says, and grins.']},
  rasp:{title:'Lovely', adjunct:'Rasp watches her city go down behind her for the second time, and weighs the satchel, and says the marines get the good fuse and she got the good squad.', jetty:'Rasp stays in her city, and finds the Wickan smith\'s daughter who made her first fuse-tongs, alive, and helps her open the shop again.', wickans:'Rasp walks out of her city by the landward gate with the satchel on her hip, for the second time in her life, and does not look back the first time either.',
    mem:'She was born on the Malaz waterfront. She never did get into the marines.', loy:['"You point," she tells you, "and I make it lovely."', 'She tells you the satchel\'s weight and nothing else.', 'She weighs the satchel every morning and nods to you.']},
  orvas:{title:'The tears', adjunct:'Orvas stands at the rail with his lance, a Khundryl on a ship, and the Hold that wanted the Khundryl handed over goes down behind him.', jetty:'Orvas stays on the jetty, a Khundryl in Malaz City, and the families that go along the waterfront in the dark touch his black tears as they pass, for luck.', wickans:'Orvas walks up the hill road with the Wickan family, and at the first halt he weeps for the burned street, very loudly, and the family weeps with him.',
    mem:'The tears on his face are tattooed and black. He has never said why.', loy:['"You are not Khundryl," he tells you. "And I am not Malazan. And here we are."', 'He walks with you because the herd sent him.', 'He lifts his lance to you, mornings.']},
  redblade:{title:'The red scale', adjunct:'Ramin sails with the Fourteenth in his red scale, the one Red Blade who did not go up to the Hold.', jetty:'Ramin stays in Malaz City in his red scale, under the Hold where his old company has gone, and is not asked to join it.', wickans:'Ramin takes off the red scale at the landward gate and leaves it on the gatepost, and walks up the hill road a stranger.',
    mem:'The Red Blades went up to the Hold. He did not.', loy:['"Lent," he says of himself. "And kept."', 'He is courteous to you. Only that.', 'He polishes the scale every night.']},
  warlock:{title:'The grandmother', adjunct:'Keth sails with the fleet, and the grandmother complains about the water every day of it, and about the city that burned her people\'s street.', jetty:'Keth stays on the jetty, and when the families go the grandmother goes with them, in his mouth, and comes back at dawn very quiet.', wickans:'Keth walks up the hill road with the Wickan family, and the grandmother talks to them all the way, out of his mouth, and they answer her.',
    mem:'"*Ours,*" the grandmother said of the families. She has not stopped saying it.', loy:['"*This one,*" the grandmother says of you. "*This one I would have married.*"', 'The grandmother has opinions about you. Keth does not repeat them.', '"*Well,*" the grandmother says of you. "*You\'ll do.*"']},
};
/* a page for a squadmate of the Third who walks to the end */
B67FIN.fate = (id, key) => {
  key = B67FIN.key(key); const t = B67FIN.T[id];
  if (id === 'sgt') return B67FIN.sgt(key);
  const tr = Object.entries(S.tricks || {}).filter(([k, v]) => v.who === id && TRICKS[k] && /^b6_/.test(k)).map(([k]) => `${b67Cap(b67He(id))} carries a trick out of Book Six: ${TRICKS[k].name}.`)[0] || '';
  if (!t) return {title:TPL[id] ? TPL[id].role : '', txt:B67FIN.join([TPL[id] ? TPL[id].quest : '', B67FIN.barrows(id), B67FIN.fire(id)])};
  return {title:t.title, txt:B67FIN.join([t[key], `${t.mem} ${B67FIN.barrows(id)} ${B67FIN.fire(id)}`, B67FIN.bone(id), tr, B67FIN.loy(id, t.loy[0], t.loy[1], t.loy[2])])};
};
/* a page for someone of the Third not walking at the end: the fallen, a recruit waiting or sent away */
B67FIN.gone = (id, key) => {
  key = B67FIN.key(key);
  if (S.dead && S.dead[id]) { const d = S.dead[id];
    if (d.ch === 3 && !d.from) return {title:'Fallen', txt:B67FIN.join([
      `${NAME(id)} fell at Y'Ghatan, in the burning streets, holding Sinn's way open while the others came out by it. Whoever fell there stayed down.`,
      `${b67Cap(b67He(id))} is in the long new barrow outside the walls, with the rest of the Fourteenth's dead from the fire, ${b67Buried() ? 'beside the old barrows the squad put back' : 'beside the old barrows the rebels opened'}.`,
      `The squad said the name at the barrow, and on the deck at sea, and at the jetty's foot in Malaz City. The Third carried it the rest of the way.`])};
    return {title:'Fallen', txt:B67FIN.join([`${NAME(id)} fell before this book, ${d.where ? `at ${d.where}` : 'on an earlier road'}, and did not come to Y'Ghatan.`, `The Third carried the name all the way to Malaz City, and says it at night with the others.`])}; }
  const done = S.f[B6_DONE[id]], waits = (S.camp || []).includes(id) || done === 2;
  if (id === 'mehet' || id === 'ottar') {
    if (waits) return {label:'Waiting', title:id === 'mehet' ? 'With the townsfolk' : 'With the Grey Helms', txt:id === 'mehet' ? `Mehet waited below decks with the 9th's company while six walked, and came ashore at Malaz City behind them with his ring of keys. ${key === 'adjunct' ? 'He went back aboard with the 9th.' : 'When the fleet went he was aboard it, with the 9th, and the Third was not.'}` : `Ottar waited with the Grey Helms on their ship while six walked, and the Perish held the centre docks at Malaz City in a grey wall. ${key === 'adjunct' ? 'He sails with the fleet, and comes across to the transport some mornings to drill.' : 'He sailed with the fleet, and the Third did not. His Destriant will send him somewhere else.'}`};
    if (done === 0) return {label:'Sent away', title:id === 'mehet' ? 'Y\'Ghatan' : 'The marines', txt:id === 'mehet' ? `Mehet stayed with the Y'Ghatan townsfolk at the camp's edge when the squad would not take him, and the city burned, and nobody in the Third knows where he went.` : `Ottar stood with the transport's marines instead, as he was told, and taught them a word in Perish, and learned two in Malazan, and drilled on the waist every morning with the 9th watching.`};
    return null; }
  if ((S.camp || []).includes(id)) return {label:'Waiting', title:'With the company', txt:`${NAME(id)} waited with the 9th's company through the sea and Malaz City while six walked, and ${key === 'adjunct' ? 'sails with the fleet, two decks down' : 'went with the fleet when the Third did not'}.`};
  return null;
};
/* the Third's sergeant */
B67FIN.sgt = key => {
  const f = S.f;
  return {title:'Third squad', txt:B67FIN.join([
    key === 'adjunct' ? 'You sail with the Fourteenth, Third squad, 9th Legion, with the company\'s book honest and the munitions counted twice, behind an Adjunct who has been told from a jetty that the army is hers. When the recruits ask what Malaz City was like you tell them about a jetty, and a Wickan grandmother, and they do not understand, which is right.' :
    key === 'jetty' ? 'You stayed on a jetty in Malaz City while the fleet sailed. Somewhere in the captain\'s book you are *left at Malaz City, holding a jetty*, in a neat hand. You walk the city under the Hold with what is left of the Third, and at night you count, out of habit, and check it.' :
    'You walked out of Malaz City behind a Wickan family, by the landward gate, while the fleet sailed without you. Somewhere in the captain\'s book the Third is *gone into the city*. You walk the island\'s hill roads with what is left of the squad, and at night you count, and check it.',
    `${B67FIN.barrows('sgt')} ${B67FIN.fire('sgt')} ${b67Fell3().length ? `It cost ${b67And(b67Fell3().map(NAME))}.` : 'Everybody came out.'}`,
    f.b6_c7_ambushDone ? 'At sea you watched a wall of earth stand up out of the water against a wall of water, from a transport\'s rail, and you still do not know what you saw.' : '',
    trickBy('b6_c7_wall') === 'sgt' ? 'You know the Perish word for the wall. You do not use it often.' : '',
    f.sgtScar ? 'There is a scar you do not look at.' : '',
    B67FIN.bone('sgt')])};
};

/* ---- the Fourth's pages: its road (S.f.b6_fourthRoad, Chapter 6's), a page per soldier and its sergeant ----
   CONTRACT with Chapter 6 (written in parallel): B6CH6.fates, keyed by squadmate id (and 'sgt' for the Fourth's sergeant), each value a
   string or a function returning a string. It is called with (id, road) while the Fourth is the squad on S (swapped in for the call by
   b6Use, so b6In, NAME('sgt'), S.loy and S.dead are the Fourth's). Read defensively: B6CH6 may be undefined; a missing or empty value
   falls back to the short generic page here. */
const b67AsH = fn => { if (!(S && S.th && S.th.h) || b6Thread() !== 'r') return fn(); b6Use('h'); try { return fn(); } finally { b6Use('r'); } };
const b67H = () => (S && S.th && S.th.h) || null;
const B67_FT = {brisk:'Four coppers', kettle:'The count', tuft:'The Deck', ohl:'The list', sohra:'The herd-mother', greysword:'The Wolves of Winter', ellis:'Still looking', vell:'Sky', brannoc:'The whistle', ressa:'Blue fingers', sgt:'Fourth squad'};
const B67_FR = {highfist:'With the High Fist', hanarara:'The Hanar Ara road', home:'The road home'};
/* the generic line per Fourth soldier per road, when Chapter 6 has not written one */
B67FIN.fourthFallback = (id, road) => {
  const nm = id === 'sgt' ? 'You' : NAME(id), he = b67He(id);
  const r = road === 'hanarara' ? `${id === 'sgt' ? 'You stood' : `${nm} stood`} the picket on the Hanar Ara road with the Fourth after the surrender, short of the outer shrines, until the Host sent for it.` :
    road === 'home' ? `${id === 'sgt' ? 'You went' : `${nm} went`} home with the Fourth on the time-served list, out of Seven Cities and its plague, on a ship west.` :
    `${id === 'sgt' ? 'You marched' : `${nm} marched`} on with the Fourth in the Host, behind the High Fist the army chose in the rain, to wherever he takes it.`;
  const w = {brisk:'She still stands in front of things.', kettle:'She still counts the munitions every dusk, by name.', tuft:'She still reads the Deck on an upturned shield.', ohl:'His list is longer by a book of plague.',
    sohra:'She sings to the dead of every field the Host crosses.', greysword:'The wolf on her shield is nearer finished.', ellis:'She still counts the horses first.', vell:'He still coils the rope at dusk.',
    brannoc:'He still sings on the march, badly, and the Falari still tell him to stop.', ressa:'The dyer\'s blue is still on her fingers. The fever never came back.'}[id] || '';
  return B67FIN.join([r, w, id === 'sgt' ? 'The Fourth came through the plague year in Seven Cities. That is its part. It is small.' : `${b67Cap(he)} came through the plague year.`]);
};
B67FIN.fourthText = (id, road) => { let v = null;
  try { const F = typeof B6CH6 !== 'undefined' && B6CH6 && B6CH6.fates;
    /* Chapter 6 shipped its fates as an object with page(id) -> {title, txt} (docs/bh-ch6-notes.md); read that first, then the per-id shape */
    if (F && typeof F.page === 'function') { const pg = F.page(id); v = pg && pg.txt; }
    else { const e = F && F[id]; v = typeof e === 'function' ? e(id, road) : e; } } catch(e) { v = null; }
  return typeof v === 'string' && v.trim() ? v : B67FIN.fourthFallback(id, road); };
B67FIN.fourthTitle = id => { try { const F = typeof B6CH6 !== 'undefined' && B6CH6 && B6CH6.fates; const pg = F && typeof F.page === 'function' && F.page(id); if (pg && pg.title) return pg.title; } catch(e) { /* fall through */ } return B67_FT[id] || ''; };
/* the Fourth's road page */
B67FIN.fourthRoad = () => { const road = b67FRoad(), h = b67H(), f = S.f;
  const P = [
    road === 'hanarara' ? `The Host went on from Hanar Ara with its High Fist. The Fourth did not, for a while. It stayed behind as the picket on the Hanar Ara road, short of the outer shrines, to see Mathok's people clear, and ${h ? `Sergeant ${esc(h.name)}` : 'its sergeant'} wrote down every day of it for a captain who will read none of them.` :
    road === 'home' ? `The Fourth went home. Its names went on the time-served list, and it went down to the coast and onto a ship west, out of Seven Cities and its plague, and the Host went on without it.` :
    `The Fourth marched on with Onearm's Host, which is the High Fist's Host now: the army chose him in the rain before G'danisban, from the ranks, by shouting, after Onearm died. Where he takes it, the Seventh Company does not know.`,
    `${f.b6_c2_key === 'burn' ? 'On the north coast it burned a plague village on orders.' : f.b6_c2_key === 'pass' ? 'On the north coast it went round a plague village, and left a family its roofs.' : 'On the north coast it marched inland through the empty villages.'} ${f.b6_c4_key === 'vote' ? 'Before G\'danisban it stood for the High Fist from the back of the ranks.' : f.b6_c4_key === 'out' ? 'Before G\'danisban it stayed out of the vote, on picket.' : 'Before G\'danisban it stood in the rain while the army chose.'} ${f.b6_c6_key === 'report' ? 'At Hanar Ara it named the city\'s cult to its captain, and nothing came of it.' : f.b6_c6_key === 'letgo' ? 'At Hanar Ara it let the surrender stand as the High Fist gave it.' : 'At Hanar Ara it watched the rebels lay down their arms.'}`,
    `It never met the Third. It never will. They were in the same plague year, in the same country, a few hundred leagues apart, and that is all.`];
  return {title:B67_FR[road] || B67_FR.highfist, paras:P}; };

/* the Fourth's pages, built while the Fourth is swapped in */
B67FIN.fourthPages = () => { const h = b67H(); if (!h) return [];
  return b67AsH(() => { const road = b67FRoad(), P = [{k:'b67road4'}];
    (S.squad || []).filter(id => id !== 'sgt').forEach(id => P.push({k:'b67fate4', id}));
    ['brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell', 'sohra', 'greysword', 'brannoc', 'ressa'].filter(id => !(S.squad || []).includes(id)).forEach(id => {
      if (S.dead && S.dead[id]) P.push({k:'b67gone4', id, dead:1});
      else if ((S.camp || []).includes(id) || ((id === 'brannoc' || id === 'ressa') && S.f[B6_DONE[id]] === 2)) P.push({k:'b67gone4', id, wait:1}); });
    P.push({k:'b67fate4', id:'sgt'}); return P; }); };
/* where the books meet */
B67FIN.meet = () => [
`Book Six ran in Seven Cities and on the sea to Quon Tali, in the plague year, weeks after Raraku and Book Four. The Third came into it from Book Four's road, still in the Fourteenth; the Fourth from Book Three's, still in the Host, from Coral across the sea. The two armies never met, and neither did the squads.`,
`Seven Cities is the ground Books Two and Four walked: the Odhans, Aren in memory, Raraku's new sea. Lether, where Book Five's squad ended, is in this book only as a dark fleet on the horizon, with grey-skinned crews and a wall of water, a long way from home.`,
`The Fourteenth's road goes west out of Malaz harbour, with the Adjunct, into Book Seven. The Host's goes on with its High Fist. Whatever comes after, it starts here.`];

/* the coda: both squads, the fire, the sea, the city */
B67FIN.coda = key => { const fell = b67Fell3(), h = b67H(), hDead = h ? Object.keys(h.dead || {}).filter(id => h.dead[id] && !h.dead[id].from && TPL[id]) : [];
  return [
`Y'Ghatan burned with nearly three thousand of the Fourteenth inside it, and seven hundred and ninety-one came out by Sinn's way through the fire. The plague went across Seven Cities, and Dujek Onearm died of it before G'danisban, and the Host chose its own High Fist in the rain. The Fourteenth sailed from the Kokakal shore through an ambush and a sea that was not any sea, and came to Malaz City, and found the city turned on its Wickans, and was told from a jetty that it was the Adjunct's army now.`,
`The Third was there. It ${b67WentIn() ? 'went into the burning streets to hold the way open' : 'held the gate and pulled the burned out of the smoke'}, and held a jetty along from the marines' in Malaz City. ${fell.length ? `${b67And(fell.map(NAME))} did not come out of the fire.` : 'Every one of the Third who went to Y\'Ghatan came out of it.'} The Fourth was in the rain before G'danisban, and under the falling sky. ${hDead.length ? `${b67And(hDead.map(NAME))} did not come through the plague year.` : 'Every one of the Fourth came through the plague year.'} That is each squad's part. It is small. It is the only part anybody will tell right.`,
`Out on the sea, west of Quon Tali, there is a fleet with an army aboard that has been given a name by its own soldiers, from the bones they took up. Behind it, in Seven Cities, the plague is burning itself out. ${b67Here().length ? 'The Third counts itself, and gets the number, and checks it.' : 'The sergeant counts, and gets one, and checks it.'}`]; };

B6CH7.finale = {
  ids:()=>['haddat', 'sathi', 'tangle', 'marrow', 'mirrel', 'mehet', 'ottar', 'tallow', 'hessa', 'tebbet', 'darrut', 'yorin', 'rasp', 'orvas', 'redblade', 'warlock'],
  labels:{epi:'Epilogue', squad:'The Third', fallen:'The fallen', away:'Not at Malaz City', sgtRole:'Sergeant · Third squad, 9th Legion, the Fourteenth', road:'The road', prologue:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length + (b67H() ? Object.keys(b67H().dead || {}).length : 0)} names, both squads`], noDead:'None of the Third. Every one of them came to Malaz City.', paper:false,
    endline:'The End of <em>Bones in the Walls</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for The Bonehunters, Y\'Ghatan, the plague year and the fleet, and to Ian C. Esslemont for the world they built together; the Third and the Fourth only walked beside it.'},
  endings:{ get adjunct(){ return B67FIN.ending('adjunct'); }, get jetty(){ return B67FIN.ending('jetty'); }, get wickans(){ return B67FIN.ending('wickans'); } },
  fate:(id, key)=>B67FIN.fate(id, key),
  gone:(id, key)=>B67FIN.gone(id, key),
  coda:(key)=>B67FIN.coda(key) };

/* ---- the finale for two squads (Book Six only, guarded): 37's pages, with the Fourth's road, its pages and Where the books meet put in
   before the end. The extra page kinds are drawn here in 37's shape (the same buttons, so the swipe, the keys and the bot all work). ---- */
{ const _fp = finPages, _sf = showFinale;
  const mine = k => /^b67/.test(k);
  finPages = function(){ const P = _fp(); if (!b6On()) return P;
    let add = []; try { add = B67FIN.fourthPages(); } catch(e) { console.warn('finale', e); add = []; }
    add.push({k:'b67meet'}); P.splice(P.length - 1, 0, ...add); return P; };
  /* the Fourth's sergeant's portrait: painted once in Book One's look (S.thread 'h'), then lent to 19's cache for each frame */
  let b67Sgt4 = null;
  const sgt4Layer = () => { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, was = S.thread;
    try { b6SgtFor('h'); S.thread = 'h'; PORTRAIT_CACHE.delete(key); const cv = document.createElement('canvas'); cv.width = 400; cv.height = 520; drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, 0); b67Sgt4 = PORTRAIT_CACHE.get(key) || null; PORTRAIT_CACHE.delete(key); }
    finally { S.thread = was; b6SgtFor(b6Thread()); } return key; };
  showFinale = function(i = 0){ if (!b6On()) return _sf(i);
    const P = finPages(); i = clamp(i | 0, 0, P.length - 1); const pg = P[i]; if (!mine(pg.k)) return _sf(i);
    S.scene = 'finale'; S.finPage = i; S.node = null; save();
    view = 'finale'; $('#sheet').hidden = true; B = null; titleAnim = null; finAnim = null; AUDIO.setScene('end');
    const h = b67H(), road = b67FRoad(); let body = '';
    if (pg.k === 'b67road4') { const R = B67FIN.fourthRoad(); G.sceneKind = road === 'hanarara' ? 'b6_hanar_ara' : road === 'home' ? 'b6_coast' : 'b6_sky';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">The Fourth</div><h1 class="fin-title">${esc(R.title)}</h1><div class="narr">${R.paras.map(p => fmt(p)).join('')}</div>`; }
    else if (pg.k === 'b67meet') { G.sceneKind = 'b6_sea';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">Where the books meet</div><h1 class="fin-title">Seven Cities, and the sea</h1><div class="narr">${B67FIN.meet().map(p => fmt(p)).join('')}</div>${typeof worldSVG === 'function' ? `<div class="gloss meet">${(() => { try { return worldSVG(); } catch(e) { return ''; } })()}</div>` : ''}`; }
    else { const id = pg.id, sgt = id === 'sgt', gone = pg.k === 'b67gone4';
      const info = b67AsH(() => { const nm = sgt ? S.name : NAME(id), role = sgt ? 'Sergeant · Fourth Squad, Seventh Company, Onearm\'s Host' : (TPL[id] ? TPL[id].role : ''), loyv = sgt ? '' : loyLabel((S.loy || {})[id] || 0);
        let title = B67FIN.fourthTitle(id) || role, txt = '', where = '';
        if (gone && pg.dead) { const d = S.dead[id] || {}; title = 'Fallen'; where = d.from ? (d.where || '') : [d.where, d.ch ? `Chapter ${d.ch}` : ''].filter(Boolean).join(' · ');
          txt = B67FIN.join([d.from ? `${nm} fell before this book${d.where ? `, at ${d.where}` : ''}, and did not come to the north coast.` : `${nm} fell in the plague year${d.where ? `, at ${d.where}` : ''}. Whoever fell there stayed down.`, 'The Fourth carried the name the rest of the way.']); }
        else if (gone && pg.wait) { title = id === 'brannoc' ? 'With the Falari' : id === 'ressa' ? 'With the surgeons' : 'Waiting';
          txt = B67FIN.join([B67FIN.fourthText(id, road), `${nm} waited while six walked, and was not with the Fourth at the end.`]); }
        else txt = B67FIN.fourthText(id, road);
        return {nm, role, loyv, title, txt, where}; });
      if (sgt) sgt4Layer();
      body = `<div class="fin-k">${sgt ? 'The Fourth\'s sergeant' : gone ? (pg.dead ? 'The Fourth · the fallen' : 'The Fourth · waiting') : 'The Fourth'}</div>
      <div class="fin-card"><div class="fin-por ${gone ? 'gone' : ''}"><canvas id="fpc" width="400" height="520" aria-hidden="true"></canvas>${gone ? `<span class="fin-mark ${pg.dead ? '' : 'away'}">${pg.dead ? '†' : 'gone'}</span>` : ''}</div>
        <div class="fin-who"><h2>${esc(info.nm)}</h2><div class="r">${esc(info.role)}</div>${sgt ? '' : gone ? (info.where ? `<div class="pips">${esc(info.where)}</div>` : '') : `<div class="pips">${info.loyv}</div>`}</div></div>
      <h3 class="fin-h">${esc(info.title)}</h3><div class="narr fin-txt">${fmt(info.txt || '')}</div>`;
      finAnim = t => { const cv = $('#fpc'); if (!cv) { finAnim = null; return; }
        if (sgt && b67Sgt4) { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, own = PORTRAIT_CACHE.get(key); PORTRAIT_CACHE.set(key, b67Sgt4); try { drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, t); } finally { if (own) PORTRAIT_CACHE.set(key, own); else PORTRAIT_CACHE.delete(key); } }
        else drawPortrait(cv.getContext('2d'), id, 400, 520, t); }; }
    toTop(); $('#app').innerHTML = `<div class="fin" id="fin">${body}
    <div class="fin-nav"><button class="btn" id="fBack">Back</button><span class="fin-pg">${i + 1} / ${P.length}</span><button class="btn primary" id="fNext">Next</button></div></div>`;
    window.scrollTo(0, 0);
    $('#fBack').onclick = () => { AUDIO.play('click'); finGo(-1); };
    $('#fNext').onclick = () => { AUDIO.play('click'); finGo(1); };
    let sx = null, sy = null; const el = $('#fin'); el.ontouchstart = e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    el.ontouchend = e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) { AUDIO.play('flip'); finGo(dx < 0 ? 1 : -1); } }; }; }

/* ---- an engine gap, worked round here (Book Six only, guarded; reported to the lead): VET_LVLS (15) has seven levels to 17, PICKS.vet (14)
   has six picks, so at level 17 a soldier who already holds all six is owed a pick with nothing to choose, and 37's openPicks waits
   for ever on a Confirm that never enables (the --from=7 bot stuck at 'picks'). Skip a veteran level nobody walking can take. ---- */
{ const _op = openPicks;
  openPicks = function(done){ if (b6On() && Array.isArray(S.picksDue)) while (S.picksDue.length && S.picksDue[0] !== 3 && !SQUAD().some(id => owesAt(id, S.picksDue[0]) && PICKS.vet.some(v => !has(id, v[0])))) S.picksDue.shift();
    return _op(done); }; }

/* the onward road: a finished Book Six save on the 'adjunct' road is the one Book Seven imports (no import is written yet) */
const b67Onward = s => !!(s && s.book === 'bh' && s.chapters && s.chapters[7] === 'adjunct');
