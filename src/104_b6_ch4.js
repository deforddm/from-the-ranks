/* ============ Book Six, Chapter 4: G'danisban ============ */
/* The Fourth, with Onearm's Host, in the camp before G'danisban in the rain (The Bonehunters ch 13-16; bh-canon §3, §5, §8). Phase 1, the
   lines in the rain: the Seventh Company's captain and the night's orders; camp talk of a deserter who knocked Captain Sweetcreek flat and
   turned out to be the "Captain Kindly" who has taken command; the surgeons' tents and the squad's sick (the trick, the Surgeons' Vinegar,
   from an orderly burning the dead's bedding); the field hospital seen from the mud outside it, never entered; the water detail (the one
   fever "yes, but"); bandits off the plague road at the surgeons' carts (b6_c4_carts, optional); Ressa walks in out of the city at the
   picket and asks for work (b6Join('ressa')). Phase 2, the night: Poliel's followers at the camp's edge (b6_c4_cult, main, stage2,
   feverRisk); something runs through the camp, shapes and sounds, and the squad does not fight it (no Hound dies at the Fourth's hands,
   series-canon rule 14); the streets outside the walls, where the forward picket's post has been overrun from the gate-ward (b6_c4_streets,
   feverRisk). Phase 3, the morning: the fever breaks for many (S.f.b6_soliel = 1; every fevered squadmate b6Cure'd, "the carriers"); the
   bell from the field hospital; the vote, the key S.f.b6_c4_key: 'vote' (the squad stands in the rain at the back of the ranks for the High
   Fist the army chooses) or 'out' (on picket, outside it; the vote is still the army's, unanimous); the tomb seen from the lines.
   Never: the field hospital's command cots, Poliel's or Soliel's temples, the command tent, inside Dujek's tomb, inside the walls. Never a
   word with Paran, Dujek, Hurlochel, Sweetcreek, Rythe Bude or Noto Boil; never the name "Paran" (he is "Captain Kindly", later "the High
   Fist"). Notes for later chapters: docs/bh-ch4-notes.md. */
/* FOR THE ARTIST (104b): names this file uses.
   Items: ART['item/b6_c4_raincloak'], ART['item/b6_c4_dyerknives']. Figure: ressa (the recruit, as an npc kind at the picket).
   Backdrops: b6_gdanisban_rain (100's, the artist's), b6_camp_night (100's, borrowed), and two of this file's own, which borrow until drawn:
   b6_c4_edge (the camp's edge at night, the ditch and the open ground toward the city; borrows b3_c2_camp_night) and b6_c4_outer (the
   streets outside G'danisban's walls at night, the gate shut; borrows b3_c3_walls_night).
   Ground: existing shelf styles only (b3camp, b3camp_night, b3_c3_city_night). Foe kinds: b3_c4_priest, b4_c7_fleer (or b6_cultist when
   Chapter 2's art is in), b4_c1_tough, and 100's b6_bandit / b6_rebelbow. */

/* ---- small helpers (b64: Book Six, Chapter Four) ---- */
const b64L = (id, n) => { if (b6In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b64Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b6In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b64If = (id, s) => b6In(id) ? (typeof s === 'function' ? s() : s) : '';
const b64Who = () => (ROLL() && ROLL().who) || 'sgt';
const b64Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b64Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b64V = (id, you, they) => id === 'sgt' ? you : they;
const b64Ph = () => (S.f && S.f.b6_c4_ph) || 1;
const b64Key = () => (S.f && S.f.b6_c4_key) || null;
const b64Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b64Here = () => (S.squad || []).filter(id => id !== 'sgt' && b6In(id));
const b64And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* Chapter Two's key, read with a default: unset (a --from=4 save that skipped it) reads as neither */
const b64C2 = () => (S.f && S.f.b6_c2_key) || null;
const b64Fev = () => (typeof b6FeverList === 'function' ? b6FeverList() : []);
const b64FevNames = () => b64And(b64Fev().map(id => id === 'sgt' ? 'you' : NAME(id)));
/* Ressa, walking or waiting at the surgeons' tents */
const b64Ressa = () => b6In('ressa');
const b64RessaWaits = () => !!(S.f && S.f.b6_ressaDone === 2);
const b64RessaOpen = () => typeof b6CanRecruit === 'function' && b6CanRecruit('ressa') && !b6In('ressa') && !b64RessaWaits();
/* where the night goes on from, if a player stepped away ("Not now"): the fire offers it again */
const b64Next = () => { const f = S.f;
  if (b64Ph() === 2) return !f.b6_c4_cultDone ? 'b6_c4_shrine' : !f.b6_c4_hounds ? 'b6_c4_hounds' : !f.b6_c4_streetsDone ? 'b6_c4_outer_order' : 'b6_c4_dawn_walk';
  if (b64Ph() >= 3) return !f.b6_c4_bell ? 'b6_c4_bell' : !f.b6_c4_key ? 'b6_c4_key' : !f.b6_c4_word ? (f.b6_c4_key === 'out' ? 'b6_c4_out' : 'b6_c4_vote') : 'b6_c4_tomb';
  return 'b6_c4_dusk'; };

/* ---- the Surgeons' Vinegar: A Courtesy of Darkness (dark) mechanically, in the surgeons' tents' words. The orderlies burn the dead's
   bedding in pits behind the tents, damped with vinegar so it smokes and does not flare: a thick yellow-grey smoke that lies low and
   stings. Carried in a pot and tipped out, it does the same. Not sorcery, so the plague in the warrens does not touch it. Once a fight: a
   3x3 of smoke within 5, for 2 rounds (3 from level 5). Nothing shoots into it, out of it or through it, and enemies standing in it are
   -2 to hit. ---- */
Object.assign(TRICKS, {
  b6_c4_vinegar:{name:'The Surgeons\' Vinegar', ch:4, use:'fight', ab:'t_b6_c4_vinegar', where:'the surgeons\' tents before G\'danisban, from an orderly at the bedding pits',
    lore:'Behind the surgeons\' tents the orderlies burn the bedding of the dead in pits, damped down with vinegar so it smokes instead of flaring. The smoke lies low and yellow and stings the eyes of anyone who stands in it, and it hides everything behind it. An orderly with a scarf over his face and a pot on a pole showed the squad how to carry a smoulder of it and tip it out where it is wanted.',
    get fx(){ return `Once a fight: a 3×3 of bedding-smoke within 5, for ${2 + lvAt(5)} rounds. Nothing shoots into it, out of it or through it, and enemies standing in it are −2 to hit, coughing. Not sorcery: the plague in the warrens does not touch it.`; }},
});
Object.assign(AB, {
  t_b6_c4_vinegar:{name:TRICKS.b6_c4_vinegar.name, trick:'b6_c4_vinegar', aoe:1, range:5, smoke:true, darkness:true, desc:()=>TRICKS.b6_c4_vinegar.fx,
    run(u, x, y){ AUDIO.play('burner', .3); sparks(x, y, 22, '#b8b07a', .4);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (!solid(x + dx, y + dy)) B.smoke.push({x:x + dx, y:y + dy, until:B.round + 2 + lvAt(5), dark:true, b64vin:true, g:'v' + B.turn + ':' + x + ',' + y});
      blog(`${u.name} tips the pot out and steps back. The bedding-smoke comes off the smoulder low and yellow and sour, and lies over the ${placeWord(B.def)} like a wet blanket. Inside it, someone starts coughing and does not stop.`);
      updBattleUI(); afterAct(); }},
});

/* ---- the words this chapter adds to Book Six's glossary ---- */
GLOSSX.bh.push(
  [4, 'Captain Kindly', 'The name the soldiers give the officer who took command of Onearm\'s Host before G\'danisban, with the High Fist dying. Every soldier in the Host knew the name. Not one of them had ever met a Captain Kindly.', ()=>(S.chapter || 0) >= 4 && !!(S.f && S.f.b6_c4_kindly)],
  [4, 'The carriers', 'Those who carry the fever and live. Before G\'danisban, one morning, the touch of a carrier began to break it instead.', ()=>(S.chapter || 0) >= 4 && !!(S.f && S.f.b6_soliel)]);

/* ---- the reading: a surgeons' tent in the rain, on an upturned crate ---- */
B6DECK[4] = {scene:'b6_gdanisban_rain', where:'an upturned medicine crate in the lee of the surgeons\' tents, with the rain loud on the canvas', set:'A wet afternoon before G\'danisban, the Host\'s tents in rows in the mud, the city\'s walls grey behind the rain, and the surgeons\' tents full.',
  back:'b6_c4_deck_done', backT:'Back to the lines.',
  say:{tuft:'"Canvas," Tuft says, and puts her palm flat on the crate as if testing a door. "And rain on it. The cards like a roof." She deals without looking at the city. She has not looked at the city since the Host came in sight of it.',
       sohra:'"Bones do not like the wet," Sohra says, and lays them anyway, on a scrap of hide on the crate, with the smoke from the bedding pits going over. "The herd-mothers read in rain. They said it washes the lies off."',
       benna:'"Rain on canvas," old Benna says, settling on a tub with her deck in a greasy bag. "Best sound there is for a reading. Covers what the cards say from the next tent." She holds out a palm. "Copper. And don\'t sneeze on them."'}};

/* the fire node is a roster fire (38c) */
ROSTER_FIRES.bh = ROSTER_FIRES.bh || {}; ROSTER_FIRES.bh[4] = ['b6_c4_fire'];

/* this chapter's own two backdrops borrow an earlier drawing until 104b paints them (100's pattern) */
SCENEX.b6_c4_edge ??= (cv, t) => (SCENEX.b3_c2_camp_night || SCENEX.b6_camp_night || ((c, tt) => drawCamp(c, tt, true)))(cv, t);
SCENEX.b6_c4_outer ??= (cv, t) => (SCENEX.b3_c3_walls_night || SCENEX.b6_camp_night || ((c, tt) => drawCamp(c, tt, true)))(cv, t);

const B6CH4 = {
  title:'G\'danisban', number:'Four',
  intro:{loc:'Before G\'danisban', sub:'The Host\'s camp · rain', scene:'b6_gdanisban_rain', cap:'Mud, canvas, rain that does not stop, the surgeons\' tents full, and a city\'s grey walls behind it all.',
    paras:[
`Onearm's Host has come inland from the coast through the plague country and stopped in front of G'danisban, east of Raraku, in a rain that started three days ago and has not been told to stop.`,
()=>{ const v = b64Here().map(id => TPL[id].name);
  return `${v.length ? `${b64And(v)} ${v.length > 1 ? 'are' : 'is'} with you in the Seventh Company's lines, ankle-deep, under canvas that leaks at the seams.` : 'The Fourth, this week, is you, in the Seventh Company\'s lines, ankle-deep, under canvas that leaks at the seams.'} ${b64C2() === 'pass' ? 'The village the squad went round on the road inland has come with it, the way a cough comes with a cold.' : b64C2() === 'burn' ? 'The village the squad burned on the road inland is three days behind. The smell of it is not.' : 'The villages on the road inland are three days behind. Their quiet is not.'}`; },
`The High Fist is in the field hospital, the camp says, and has been for days. There is not much else to do in the rain but say things.`],
    go:'Into the lines', node:'b6_c4_start'},

  areas:[
    /* 16 x 12 (b3camp, day and rain; morning in phase 3). The Seventh Company's lines: # palisade and earthwork  = tents  . mud , grass
       W the surgeons' carts at the picket gap  F the Fourth's fire  H the field hospital, seen from the mud outside  S the surgeons' tents
       h horse lines  s the company standard  ^ the picket toward the city */
    { id:'b6_c4_lines', title:'The Seventh Company\'s lines', sub:'Before G\'danisban · rain', hint:'Tap ground to move · tap a figure to talk · the picket faces the city', decor:'b3camp',
      map:[ "####...^...#####",
            "#==.......,..==#",
            "#==..,..W.....s#",
            "#.......,....==#",
            "#==.......F....#",
            "#==..,........H#",
            "#.....,....,...#",
            "#==.......==...#",
            "#==.,..S..==.,.#",
            "#......,.......#",
            "#hhh....,....hh#",
            "################" ],
      walk:'.,', triggers:{F:'b6_c4_fire', S:'b6_c4_surgeons', H:'b6_c4_hospital', W:'b6_c4_carts', '^':'b6_c4_picket'}, start:{x:8, y:9},
      quest:()=> b64Ph() >= 3 ? (!S.f.b6_c4_bell ? 'The lines, in the morning. Something has changed in the rain.' : !b64Key() ? 'The bell. The army is gathering.' : 'The lines. The rain has stopped.')
        : !S.f.b6_c4_orders ? 'The captain, in the company\'s lines.' : 'The fire. Dusk, and the night\'s orders.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b2soldier', x:5, y:3, node:()=>b64Ph() >= 3 ? 'b6_c4_captain_morn' : S.f.b6_c4_orders ? 'b6_c4_captain_again' : 'b6_c4_captain', fresh:()=>b64Ph() >= 3 ? !S.f.b6_c4_capMorn : !S.f.b6_c4_orders},
        {id:'falari', name:'A Falari of Sweetcreek\'s', kind:'b2soldier', x:12, y:6, node:()=>'b6_c4_falari', show:()=>b64Ph() <= 1, fresh:()=>!S.f.b6_c4_kindly},
        {id:'benna', name:'Old Benna', kind:'b3_c5_villager', x:3, y:9, node:()=>'b6_c4_benna', fresh:()=>!S.f.b6_c4_benna},
        {id:'ressa', name:'Ressa', kind:'ressa', x:7, y:1, node:()=>'b6_c4_ressa', show:()=>b64Ph() <= 1 && !!S.f.b6_c4_ressaMet && !S.f.b6_c4_ressaTents && b64RessaOpen(), fresh:()=>true} ] },

    /* 16 x 12 (b3camp_night; phase 2). The camp's edge at night, facing the open ground toward the city: x the rag shrine past the ditch
       # the ditch and its bank, with a gap  = tents  F the picket fire  v back into the lines */
    { id:'b6_c4_edge', title:'The camp\'s edge', sub:'Night · the ditch', hint:'Tap ground to move · the gap in the ditch looks out on the open ground', decor:'b3camp_night', dark:true,
      map:[ ",,..,,....,,..,,",
            ".,....x.....,...",
            "..,......,......",
            "#######..#######",
            "#==....,.....==#",
            "#==..F.......==#",
            "#....,....,....#",
            "#==.....,....==#",
            "#==..,.......==#",
            "#.......,......#",
            "#==....,.....==#",
            "#######v########" ],
      walk:'.,', triggers:{x:'b6_c4_shrine', F:'b6_c4_fire', v:'b6_c4_edge_back'}, start:{x:8, y:9},
      quest:()=> !S.f.b6_c4_cultDone ? 'Out through the gap in the ditch, to the lamps on the open ground.' : !S.f.b6_c4_hounds ? 'The edge. Listen.' : 'Back into the lines. The captain has sent for the Fourth.',
      npcs:[
        {id:'sentry', name:'A sentry of the Seventh', kind:'b2soldier', x:9, y:4, node:()=>'b6_c4_sentry', fresh:()=>!S.f.b6_c4_sentry} ] },

    /* 16 x 12 (b3_c3_city_night; phase 2). The streets outside G'danisban's walls: # walls and house-fronts  G the gate, shut  . paving
       , rubble  = awnings  w a well  c a cart  p the forward picket's post  v back to the camp */
    { id:'b6_c4_outer', title:'Outside the walls', sub:'G\'danisban · the outer streets · night', hint:'Tap ground to move · the picket\'s post is east · the gate stays shut', decor:'b3_c3_city_night', dark:true,
      map:[ "######GG########",
            "#..,....,....=.#",
            "#.=....w.....,.#",
            "##..,.......#..#",
            "#.....,..c.....#",
            "#..#......,..p.#",
            "#.,....=.......#",
            "#....,.....,...#",
            "##..=.....#..,.#",
            "#......,.......#",
            "#..,.....=.....#",
            "#######v########" ],
      walk:'.,', triggers:{G:'b6_c4_gate', w:'b6_c4_well', p:'b6_c4_post', v:'b6_c4_outer_back'}, start:{x:7, y:10},
      quest:()=> !S.f.b6_c4_streetsDone ? 'East, to the forward picket\'s post.' : 'Back to the camp, before dawn.',
      npcs:[] } ],

  battles:{
    /* phase 1, optional: bandits off the plague road at the surgeons' carts as they come in through the picket gap */
    b6_c4_carts:{title:'The surgeons\' carts', style:'b3camp', warrenText:'Before G\'danisban · the warrens are sick with the plague: a spell may cost its caster', warren:{denul:.9, meanas:.9}, music:'battle',
      map:["..,.....","...t....",".t....t.","........","..t..t..","........","....,...","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_bandit',1,1],['b6_bandit',5,0],['b6_bandit',3,2],['b6_c4_banditbow',6,1]], xp:140, after:'b6_c4_carts_after',
      waves:[{round:2, foes:[['b6_bandit',0,5]], text:'Another comes in under the tail of the second cart, low, for the drivers.'}],
      preText:()=>`Four of them in the rain at the tail of the carts, scarves over their faces and their blades out, and the drivers flat in the mud. They have come a long way down the plague road for whatever a surgeon carries, and they do not mean to go back without it.`},
    /* phase 2: Poliel's followers at the camp's edge, a priest with them; then their shrine. It spreads the fever (feverRisk). */
    b6_c4_cult:{title:'The camp\'s edge', style:'b3camp_night', dark:true, feverRisk:'the Mistress\'s followers at the ditch', warrenText:'Night at the ditch · the warrens are sick with the plague tonight, worse than by day', warren:{denul:.85, meanas:.85}, music:'battle',
      map:["........","..t...,.","........",".,....t.","###..###","........","..t.....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_c4_mourner',1,1],['b6_c4_mourner',5,1],['b6_c4_mourner',3,3],['b6_c4_plaguepriest',4,0]], xp:220, after:'b6_c4_cult_after',
      waves:[{round:2, foes:[['b6_c4_mourner',7,6]], text:'One more comes along the inside of the ditch from the next company\'s stretch, low and quick, and nobody there has stopped her.'}],
      preText:()=>`They come in through the gap in the ditch in a line, singing, a dozen lamps behind them on the open ground and more of them still out there. The one in front wears a grey robe gone black with rain and has his hands out, palms up, to show the squad what is on them. The squad does not need to look.`,
      stage2:{title:'The rag shrine', xp:120,
        text:()=>`The priest goes down in the gap with his hands still open. The singing out on the open ground does not stop. It gets louder.\n\nPast the ditch, round a post hung with rags and a dead dog's collar and a hundred little clay bowls, the rest of them are waiting, and they have stopped singing to look at the Fourth.\n\n${b64Say({brisk:'"Shields," Brisk says, to nobody, and walks out through the gap, and the squad goes with her.', ohl:'"Don\'t let them touch you," Ohl says. "Not your skin. Anywhere else." He goes through the gap behind the shields.', _:'The squad goes out through the gap.'})}`,
        map:["...t....","........",".t....t.","........","...,....","........","..t..t..","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b6_c4_mourner',1,1],['b6_c4_mourner',6,1],['b6_c4_mourner',2,0],['b6_c4_mourner',4,2]]} },
    /* phase 2: the forward picket's post in the streets outside the walls, overrun from the gate-ward. It spreads the fever (feverRisk;
       v9.0-notes: "the G'danisban streets") */
    b6_c4_streets:{title:'The forward picket', style:'b3_c3_city_night', dark:true, feverRisk:'the streets outside the walls', warrenText:'Outside G\'danisban · the warrens reek of the plague here, by the walls', warren:{denul:.85, meanas:.85}, music:'battle',
      map:["#..,...#","#......#","#.t..t.#","#......#","##.##.##","#......#","#.t...,#","#......#","#......#","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b6_regular',1,7],['b6_regular',6,7]],
      foes:[['b6_c4_gateman',2,1],['b6_c4_gateman',5,1],['b6_c4_gateman',3,2],['b6_c4_ringleader',4,0],['b6_bandit',1,3]], xp:200, after:'b6_c4_streets_after',
      waves:[{round:2, foes:[['b6_c4_gateman',3,0],['b6_c4_gateman',4,0]], text:'Two more come out of an alley by the gate at a run, with a lamp, shouting for the others.'}],
      preText:()=>`The forward picket's post is a cart turned on its side across the street, and two of the Host's regulars behind it with their backs to the wall, and a crowd in the street in front of them that has come out of the gate-ward with cudgels and a ringleader and nothing left to lose. Two of them turn round when the Fourth comes up the street.`} },

  foes:{
    /* Poliel's followers at the camp's edge (bh-canon §8; never named, never shown close) */
    b6_c4_mourner:{name:'Follower of the Mistress', sig:'c', kind:(typeof FIGX !== 'undefined' && FIGX.b6_cultist) ? 'b6_cultist' : 'b4_c7_fleer', hp:26, ac:12, atk:9, dmg:[1,6,3], rng:1, mv:4, init:2, verb:'reaches for'},
    b6_c4_plaguepriest:{name:'Priest of the Mistress', sig:'P', kind:'b3_c4_priest', hp:56, ac:13, atk:10, dmg:[1,8,3], rng:3, mv:4, init:2, boss:true, sk:['daze', 'rally'], verb:'calls the Mistress down on'},
    /* the gate-ward's crowd, out of the city in the night */
    b6_c4_gateman:{name:'Man of the gate-ward', sig:'m', kind:'b4_c1_tough', hp:24, ac:12, atk:9, dmg:[1,6,3], rng:1, mv:4, init:1, verb:'swings a cudgel at'},
    b6_c4_ringleader:{name:'The gate-ward\'s ringleader', sig:'R', kind:'b4_c1_tough', hp:48, ac:14, atk:10, dmg:[1,8,4], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'brings a butcher\'s cleaver down on'},
    /* the bandits' archer at the carts */
    b6_c4_banditbow:{name:'Plague-road archer', sig:'a', kind:'b4_c7_fleerbow', hp:22, ac:13, atk:9, dmg:[1,8,2], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'} },

  gear:{
    b6_c4_raincloak:{name:'A Host rain-cloak', slot:'armour', role:'light', who:null, ac:1, hp:3,
      line:'Heavy wool waxed against the wet, in the Host\'s blue-grey, with a deep hood and a plain bronze ring at the throat. The rain stands on it in beads and runs off. It came off the surgeons\' carts before G\'danisban, which is the only dry place the Host had. Whoever wears it is a little harder to hit and a little harder to kill, and dry, which before G\'danisban counts for more.'},
    b6_c4_dyerknives:{name:'A dyer\'s knives', slot:'weapon', role:'blade', who:null, atk:1, dmg:[1,6,3],
      line:'Two long single-edged knives from a dye-yard in the streets outside G\'danisban\'s walls, worn thin on the whetstone, the grips stained indigo and bound with cord. There is a blue print on one blade where somebody held it with a wet hand. Whoever owned the yard is not coming back for them.'} },

  scenes:{
    b6_c4_edge:{loc:'Before G\'danisban', sub:'The camp\'s edge · night', cap:'The ditch and its bank, the picket fire low, and out on the open ground toward the city a scatter of lamps where nobody should be.', amb:'explore'},
    b6_c4_outer:{loc:'G\'danisban', sub:'Outside the walls · night', cap:'The streets outside the walls, the houses dark, the gate shut, and somewhere inside the city a sound that does not stop.', amb:'explore'} },

  end:{
    vote:['The vote', 'The Fourth stood in the rain before G\'danisban with Onearm\'s Host while the fever went through the camp. It fought the Mistress\'s followers at the ditch, and held the forward picket in the streets outside the walls, on the night something ran through the camp and the city. In the morning the fever broke for many, and a bell rang in the field hospital. The army chose its High Fist from the man it already called Captain Kindly, and the Fourth stood at the back of the ranks in the mud and gave him its voice.'],
    out:['The picket', 'The Fourth stood in the rain before G\'danisban with Onearm\'s Host while the fever went through the camp. It fought the Mistress\'s followers at the ditch, and held the forward picket in the streets outside the walls, on the night something ran through the camp and the city. In the morning the fever broke for many, and a bell rang in the field hospital. The army chose its High Fist from the man it already called Captain Kindly. The Fourth was on picket, facing the city, and heard the army choose him behind its back.'] },
  endScene:'b6_gdanisban_rain',
  endCap:()=> b64Key() === 'out' ? 'The picket line before G\'danisban, after the rain, and behind it the whole Host gathered round one tent.' : 'The Host gathered in the mud before G\'danisban, after the rain, and the Fourth at the back of it.',
  tease:'Next: the Fourteenth, on the Kokakal shore, waiting for ships that are a long time coming.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b6_c4_key === 'vote') x.push('The Fourth stood at the back of the ranks in the mud for the High Fist the army chose, and gave him its voice with the rest.');
    if (f.b6_c4_key === 'out') x.push('The Fourth stood picket facing the city while the army chose its High Fist. The roar reached it from behind.');
    if (f.b6_c4_cultDone) x.push('The Mistress\'s followers came through the gap in the ditch with their hands open. The Fourth closed the gap.');
    if (f.b6_c4_hounds === 'still') x.push('Something ran through the camp in the night. The Fourth stood still, and it went past.');
    if (f.b6_c4_hounds === 'shaken') x.push('Something ran through the camp in the night. The Fourth will not talk about how close it came.');
    if (f.b6_c4_streetsDone) x.push('The forward picket\'s post in the streets outside the walls held until morning, with the Fourth behind the cart.');
    if (f.b6_c4_cartsDone) x.push('Bandits off the plague road came for the surgeons\' carts at the picket gap. The carts came in.');
    if (f.b6_c4_vinOk) x.push('An orderly at the bedding pits showed the squad how to carry the smoke.');
    if (f.b6_soliel) x.push('The fever broke for many, the morning after. The carriers, the camp says.');
    if (b6In('ressa')) x.push('Ressa walked out of G\'danisban in the rain and asked for work, and walks with the Fourth.');
    else if (b64RessaWaits()) x.push('Ressa walked out of G\'danisban in the rain and asked for work. She waits at the surgeons\' tents for a place in the Fourth.');
    if (b6In('brannoc')) x.push(f.b6_c4_key === 'out' ? 'Brannoc stood the picket with the Fourth, and sang under his breath when the roar came, badly.' : 'Brannoc stood in the ranks with the Fourth, and did not cheer for the man who knocked his captain down, and did not not cheer either.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b6_c4_word && 'Captain Kindly is High Fist of Onearm\'s Host. The army chose him the morning the bell rang, on the strength of the old High Fist\'s logs, the camp says.',
    f.b6_c4_bell && 'The bell rang in the field hospital. High Fist Dujek Onearm is dead of the fever.',
    f.b6_soliel && 'The morning after the night of the shapes, the fever broke for many in the camp. The camp says the carriers\' touch heals it now.',
    f.b6_c4_hounds && 'Something ran through the camp and on into the city in the night. The Seventh will not say what.',
    f.b6_c4_cultDone && 'The Mistress\'s followers came at the ditch with their hands open. A priest led them.',
    f.b6_c4_kindly && 'A deserter knocked Captain Sweetcreek down in the rain, and turned out to be Captain Kindly, who now commands the Host. Not one soldier in the Host has ever met Captain Kindly.',
    f.b6_c4_hospital && 'The High Fist is in the field hospital. Its flap stays shut.',
    (b6In('ressa') || b64RessaWaits()) && 'Ressa, a dyer out of G\'danisban who had the fever and lived, asked the Fourth for work.',
    'The Host is camped before G\'danisban, in the rain.'].filter(Boolean); },

  dlg:{
    /* ---- phase 1: the lines in the rain (the first halt, and the reading) ---- */
    b6_c4_start:()=>({sp:'The Seventh Company\'s lines', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_ph ??= 1; },
      again:()=>`The Seventh Company's lines in the rain, the city's walls grey behind it.`, html:feverHTML(), txt:
`The Seventh Company has a stretch of the Host's lines on the side facing the city: two rows of tents in the mud, a fire-pit with a square of oiled canvas over it on poles, a picket at the gap in the earthwork, and the rain.

G'danisban is a long low shape on its rise beyond the open ground, walls and towers gone the same grey as the sky. Two thin smokes go up from inside it and lean over in the wind. By day, nothing comes out of its gate.

${b64Say({kettle:`Kettle is under the canvas over the fire-pit with her satchel in her lap, wrapping each munition in a second skin of oilcloth. "Damp's the enemy," she says, without looking up. "The city's just a city."`, brisk:`Brisk stands at the end of the tent row with the rain running off her, ignoring it, looking at the city. "Walls," she says. "Good walls." It is not a compliment.`, _:'The squad stands in the rain, looking at the city.'})}${b64If('brannoc', ` Brannoc is trying to keep a pipe lit under the brim of his helmet, and singing to it, badly, to encourage it.`)}${b64If('ohl', `\n\nOhl is looking past the city, east, as if he could see Ehrlitan from here. "My country," he says. "In the rain. I had forgotten it could."`)}`,
      ch:[b6DeckChoice(4),
          {t:'Find the captain.', go:'b6_c4_captain'},
          {t:'Walk the lines.', go:()=>startExplore()}]}),
    b6_c4_deck:()=>b6DeckOffer(4),
    b6_c4_card:()=>b6DeckCard(4),
    b6_c4_deck_done:()=>({sp:'The Deck of Dragons', scene:'b6_gdanisban_rain', txt:
`${S.f.b6_c4_drawn ? (S.f.b6_c4_reader === 'tuft' ? 'Tuft gathers the cards in, wipes the rain off the top one with her sleeve, and puts the Deck away inside her cloak where it is dry. She still has not looked at the city.' : S.f.b6_c4_reader === 'sohra' ? 'Sohra gathers the bones into the hide and ties it twice, and sits on the crate a while with her face turned up into the rain.' : 'Old Benna wipes her cards on her apron, which makes them wetter, and puts them away in the greasy bag, and the copper somewhere else.') : 'The cards stay where they are.'} The rain goes on.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the captain: the night's orders, the camp's word of Captain Kindly, and a cot for the squad's sick (a check) */
    b6_c4_captain:()=>({sp:'The captain', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_orders = 1; }, txt:
`The captain is standing under the company standard with water running off the rim of his helmet in a thin steady line, like a gutter. He has been standing there, by the look of him, since before the rain started.

"Sergeant." He nods at the city. "We hold this stretch. Facing that. By day, nothing comes out. By night, people come out of the gate with lamps and walk to the ditch, and stand at it, and sing." He wipes his face, which does nothing. "The Mistress's people. They want us to come and see what's on their hands. Tonight the Fourth has the edge. You don't touch them. You don't let them through the gap."

He lowers his voice, though there is nobody near but the rain. "And you'll have heard. The High Fist's in the field hospital, and has been. There's a new man in command since yesterday, until he's on his feet." A pause. "Captain Kindly. That's what they're calling him." Another pause. "I served ten years in this Host. I've never met a Captain Kindly. I don't know anyone who has."`,
      ch:[{t:'"The squad\'s sick want cots, Captain. Out of the wet."', req:()=>!S.f.b6_c4_cotTried, check:['guile', 14], fx:()=>{ S.f.b6_c4_cotTried = 1; },
            edges:id=>[id === 'sgt' && ['you know what a company is owed, and how to ask for it', 2], id === 'ohl' && ['he has worked surgeons\' tents for twenty-two years and knows the words', 2], id === 'brannoc' && ['he talks too much, and the captain is tired of talk', -1], id === 'brisk' && ['she asks the way she reads out charges', -1]],
            near:{t:()=>{ const w = b64Who(); return `Yes, but the captain wants something back: the Fourth digs the company's new latrine in the rain this afternoon, and ${b64Nm(w)} ${b64V(w, 'lead', 'leads')} it. No rest at the fire before dusk.`; }, fx:()=>{ S.f.b6_c4_rest1 = 1; }},
            go:'b6_c4_captain_cot', fail:'b6_c4_captain_nocot'},
          {t:'"Yes, Captain. The edge, tonight."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_captain_cot:()=>({sp:'The captain', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_cot = 1; }, txt:
`The captain looks at ${by({sgt:'you', _:'{who}'})}, and at the surgeons' tents, which are full, and at the rain. "One cot," he says. "Tonight. I'll send to the surgeons. Tell them the Seventh's captain said so, and tell them twice." He goes back to looking at the city. "One. Pick who."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c4_captain_nocot:()=>({sp:'The captain', scene:'b6_gdanisban_rain', txt:
`"Every company in the Host has sick," the captain says, not unkindly. "Every company in the Host has asked. The surgeons have no cots, Sergeant. They have floor, and not much of that." He wipes his face. "Keep yours dry if you can. Keep them away from the gap tonight if you can't."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c4_captain_again:()=>({sp:'The captain', scene:'b6_gdanisban_rain', again:()=>`The captain, under the standard, with the rain running off his helmet.`, txt:
`The captain is under the standard, looking at the city. "The edge, tonight," he says, as you come up. "Keep the gap shut." He has not moved, as far as you can tell, since you left him.`,
      ch:[{t:'"Captain."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* camp talk: a Falari of Sweetcreek's on the deserter who knocked his captain flat, and turned out to be Captain Kindly */
    b6_c4_falari:()=>({sp:'A Falari of Sweetcreek\'s', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_kindly = 1; }, again:()=>`The Falari, with his beard in a plait against the wet. "Flat on her back, I'm telling you."`, txt:
`A red-bearded Falari from Captain Sweetcreek's company is sheltering under a wagon's tail at the end of the Seventh's lines, where he has no business being, and he has a story, and he has told it eleven times already this morning, and he would like to tell it to you.

"Picket brings in a deserter," he says. "Two days back, in this. Mud to the eyebrows, a borrowed cloak, no badge. Captain Sweetcreek goes to have a look at him." He grins through the beard. "He knocks her flat. One blow. A Falari princess, in the mud on her back, with her mouth open." He shakes his head, delighted. "Next anyone knows, the man's in the field hospital with the High Fist, and Hurlochel with him. And this morning? He's in command. Captain Kindly, they say his name is."

He lowers his voice to what a Falari thinks is a whisper. "Not a soul's ever met a Captain Kindly. But everybody's heard of him. Work that out."${b64If('brannoc', `\n\nBrannoc has gone the colour of his beard. "Flat on her back," he says. "Sweetcreek." He seems torn between outrage and the urge to tell it himself, to someone, at once. "She'll kill him." A pause. "She'll try. Then she'll be proud of him, the way she is of a good horse that threw her."`)}${b64If('kettle', `\n\n"Falari," Kettle says to the sky, with deep satisfaction. "One island tells a story and the other forty hear it by noon."`)}`,
      ch:[{t:'"What does he look like, this Kindly?"', go:'b6_c4_falari_look'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_falari_look:()=>({sp:'A Falari of Sweetcreek\'s', scene:'b6_gdanisban_rain', txt:
`The Falari thinks about it. "Mud," he says. "Mostly mud. Tall enough. Not young. A face like somebody's told him bad news for a year and he's stopped flinching." He spreads his hands. "It was raining, Sergeant. It's been raining since. Nobody's had a good look at anyone since we got here."

He goes back to his wagon's tail, to wait for the next soldier to come by who has not heard it.${b64If('tuft', `\n\nTuft has listened to all of it with her hood up and her hands inside her sleeves. She does not ask anything. When the Falari has gone she looks once toward the field hospital, and then, carefully, away.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* old Benna at the wash-tubs: she reads when Tuft and Sohra don't; and one line of the other squad's news, as camp talk */
    b6_c4_benna:()=>({sp:'Old Benna', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_benna = 1; }, again:()=>`Old Benna at her tubs in the rain. "Nothing dries."`, txt:
`Old Benna has her wash-tubs set out in a row at the end of the lines, in the rain, which she says saves on water. Nothing she washes will dry. She washes it anyway, for coppers, because the Host has been sweating fever into its shirts for a week and somebody has to.

"The surgeons send me their linen," she says, wringing. "I boil it. I don't touch it with my hands till it's boiled, and I don't touch my face till I'm dead. Thirty years with the Host, and that's the best I've learned." She slaps a shirt over the tub's edge. "That, and the news. The Adjunct's army took Y'Ghatan, they're saying on the coast road. And the city burned, with a lot of the Adjunct's army still in it." She shrugs, wet to the shoulders. "Another army's war. We've got this one."${b6In('tuft') || b6In('sohra') ? '' : `\n\nShe nods at the greasy bag on the tub beside her. "And if your squad's got nobody to read, Sergeant, I've a deck that's never once been surprised."`}`,
      ch:[Object.assign(b6DeckChoice(4), {req:()=>!b6In('tuft') && !b6In('sohra') && !S.f.b6_c4_drawn && !S.f.b6_c4_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the surgeons' tents: the squad's sick, a cot on the captain's word, the bedding pits (the trick), and Ressa if she was sent there */
    b6_c4_surgeons:()=>({sp:'The surgeons\' tents', scene:'b6_gdanisban_rain', again:()=>`The surgeons' tents, full, and the smoke from the pits behind them lying low in the rain.`, html:feverHTML(), txt:
`The surgeons' tents are three long ones end to end, with the flaps tied open for the air and a line of soldiers waiting outside each in the rain, sitting, because they cannot stand. Inside it is floor and blankets and bowls, and the surgeons going along the rows, and a sound that is many people breathing badly at once.

Behind the tents a yellow-grey smoke comes up out of pits and lies along the ground instead of rising, and smells of vinegar and wet wool.${b64Fev().length ? `\n\n${b64FevNames().replace(/^./, c => c.toUpperCase())} ${b64Fev().length > 1 ? 'have' : b64Fev()[0] === 'sgt' ? 'have' : 'has'} the fever: the sweats, the shaking, the water that will not stay down.${S.f.b6_c4_cot && !S.f.b6_c4_cotUsed ? ' The captain\'s cot is waiting.' : ''}` : '\n\nNobody in the squad has the fever. You look at the line outside the tents and do not say so out loud.'}${b64If('ohl', `\n\nOhl stands at the end of the nearest tent with his hands at his sides and his lips moving. He is counting. He stops when he sees you watching.`)}`,
      ch:[{t:'The captain\'s cot, for the worst of the squad.', req:()=>!!S.f.b6_c4_cot && !S.f.b6_c4_cotUsed && b64Fev().length > 0, go:'b6_c4_cot'},
          {t:'Round the back, to the bedding pits.', go:'b6_c4_pits'},
          {t:'Ressa, at the end of the tents, with the surgeons\' bowls.', req:()=>!!S.f.b6_c4_ressaTents && b64RessaOpen(), go:'b6_c4_ressa'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_cot:()=>{ const who = b64Fev()[0] || 'sgt';
      return {sp:'The surgeons\' tents', scene:'b6_gdanisban_rain', fx:()=>{ if (!S.f.b6_c4_cotUsed) { S.f.b6_c4_cotUsed = 1; S.f.b6_c4_rest1 = 1; b6Cure(who, 'a cot in the surgeons\' tent, vinegar and a night'); } }, txt:
`The surgeon who takes the captain's word is a woman with her sleeves tied back and her forearms red from the vinegar, and she reads ${who === 'sgt' ? 'you' : NAME(who)} the way Ohl reads a list, quickly, missing nothing. "Here," she says, and there is a cot, in the corner, with a bowl beside it.

It is a long afternoon and a longer night. Vinegar on a cloth, water a sip at a time, a blanket when the shaking comes and none when the sweat does, and somebody from the squad beside the cot the whole time, because the surgeon will not do that part and says so.

Toward the end of the night the fever breaks. ${who === 'sgt' ? 'You wake' : NAME(who) + ' wakes'} wet through and weak as a new foal and clear in the eyes. The surgeon looks, nods, and wants the cot back.${b64If('ohl', `\n\nOhl sat the night with them. In the morning he says it was a mild one. His hands say otherwise.`)}`,
        ch:[{t:'Back to the lines.', go:()=>startExplore()}]}; },
    b6_c4_pits:()=>({sp:'The bedding pits', scene:'b6_gdanisban_rain', txt:
`Behind the tents an orderly with a scarf over his nose and mouth is feeding bedding into a pit with a long pole: blankets, straw, a soldier's coat. He damps each lot down with vinegar from a bucket, and it smokes instead of flaring, a thick yellow smoke that rolls out of the pit and lies along the ground, and stings.

He sees you watching. "Burn it wet," he says through the scarf, "or it goes up and takes the tents. Burn it dry and the sparks carry it." He jerks his chin at the smoke. "This, nothing gets through. Not a fly, not a fever, not an arrow, I'd say." He taps a clay pot on the end of his pole, full of a smouldering wad. "Carry it like this, and you can put it where you want it. The surgeons use it to clear a tent." He looks at the squad. "You lot could use it to clear a street."`,
      ch:[{t:'"Show us how you carry it." (the Surgeons\' Vinegar)', check:['wits', 17], trick:'b6_c4_vinegar', req:()=>!S.f.b6_c4_vinTried, fx:()=>{ S.f.b6_c4_vinTried = 1; },
            edges:id=>[id === 'ohl' && ['he has worked surgeons\' tents for twenty-two years', 2], id === 'kettle' && ['smoke is a sapper\'s trade, and she has carried worse in a pot', 1], id === 'ressa' && ['she saw the dyers burn their vats out this way in the city', 1], id === 'brannoc' && ['he breathes in at the wrong moment, loudly', -1]],
            near:{t:()=>{ const w = b64Who(); return `Yes, but the pot tips while ${b64Nm(w)} ${b64V(w, 'have', 'has')} it, and ${b64Nm(w)} ${b64V(w, 'breathe', 'breathes')} in a lungful of the smoke: coughing for an hour, eyes streaming, bruised.`; }, fx:()=>bruise(b64Who(), bruiseN())},
            go:'b6_c4_pits_ok', fail:'b6_c4_pits_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_pits_ok:()=>({sp:'The bedding pits', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_vinOk = 1; }, txt:
`The orderly shows ${by({sgt:'you', _:'{who}'})}: a wad of the wet bedding into the pot, a coal on it, the lid half on, and the pole held out and down and away from your face. Tip it, and the smoulder rolls out and the smoke comes off it low and thick and spreads, three paces every way, and stays.

"That," he says. "Vinegar and a dead man's blanket. No sorcery in it. The warrens are full of the fever anyway, the mages say." He hands over a pot. "Keep it damp. Keep it lidded. And don't stand downwind of it, whatever else you do."${b64If('kettle', `\n\nKettle has watched every move. "A smoker," she says, "that doesn't go off." She sounds as if she has been offered a new religion and is thinking about it.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c4_pits_no:()=>({sp:'The bedding pits', scene:'b6_gdanisban_rain', txt:
`The wad goes into the pot too dry and catches properly, and there is a flare, and the orderly knocks it into the pit with his pole before it can do anything clever. "Wet," he says, patiently, as to a child. "I said wet." He goes back to his pit. He has a great deal of bedding to get through, and less patience than bedding.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the field hospital, from the mud outside it: never the command cots, never a word with anyone inside */
    b6_c4_hospital:()=>({sp:'The field hospital', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_hospital = 1; }, again:()=>`The field hospital, its flap shut, the guards in the rain.`, txt: S.f.b6_c4_bell ?
`The field hospital, with its flap tied open now and the guards gone from the corners. Orderlies are carrying cots out into the sun to air. The orderlies leave the one at the back alone. It is empty, and has a cloak folded on it.` :
`The field hospital is apart from the surgeons' tents: one big tent of good canvas with a guard at each corner and lamps lit inside in the middle of the day. The flap stays shut. Through the canvas you can hear a voice, a cutter's, low and sharp, saying no to somebody, and saying it again.

While you stand in the mud a tall outrider comes out of the flap, Hurlochel, whom the Fourth has seen on other roads, and stands in the rain a moment with his face turned up to it. Then he goes back in. He does not see the squad, or anyone.${b64If('ohl', `\n\nOhl stands very still. "I served under him before he was the whole army," he says, very low, in Ehrlii first and then in Malazan. "The Second. He had two arms then." That is all.`)}`,
      ch:[{t:'Ask the nearest guard how the High Fist is.', req:()=>!S.f.b6_c4_hospTried && !S.f.b6_c4_bell, check:['guile', 13], fx:()=>{ S.f.b6_c4_hospTried = 1; },
            edges:id=>[id === 'sgt' && ['a sergeant may ask a guard things', 1], id === 'ohl' && ['he served under the High Fist in the Second, and says so', 2], id === 'brannoc' && ['the guard is Falari, and so is he', 1], id === 'kettle' && ['she asks too brightly', -1]],
            near:{t:()=>`Yes, but the guard wants something for the cutter, who is short of everything: one of the squad's salves goes in through the flap.`, fx:()=>{ if ((S.inv.salve || 0) > 0) S.inv.salve -= 1; }},
            go:'b6_c4_hospital_ok', fail:'b6_c4_hospital_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_hospital_ok:()=>({sp:'The field hospital', scene:'b6_gdanisban_rain', txt:
`The guard looks at the flap, and at you, and lets his shoulders down an inch. "He asks for his logs," he says, very quietly. "Every bell. The new man reads them to him." He swallows. "He was asking for the Seventh by name yesterday. All the old companies, one at a time, as if he was counting." He looks back at the rain. "Go on, Sergeant. There's nothing to stand here for."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c4_hospital_no:()=>({sp:'The field hospital', scene:'b6_gdanisban_rain', txt:
`"Move along, Sergeant," the guard says, to the rain over your shoulder. "Orders. No standing at this tent." He says it to the rain, not to you.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the picket toward the city: Ressa walks in out of the rain (the recruit) */
    b6_c4_picket:()=>({sp:'The picket', scene:'b6_gdanisban_rain', fx:()=>{ if (!S.f.b6_c4_ressaMet && b64Ph() <= 1) S.f.b6_c4_ressaMet = 1; }, again:()=>`The picket at the gap, facing the city across the open ground.`, txt: b64Ph() >= 3 ?
`The picket at the gap in the earthwork, facing the city. The open ground is mud and puddles, and the rain on it is thinning. G'danisban's gate is shut. The smokes inside the walls have stopped.` : S.f.b6_c4_ressaSeen ?
`The picket at the gap in the earthwork, two soldiers of the Seventh with spears and their cloaks over their heads, facing the city across the open ground. Nothing moves on it.` :
`At the picket, two soldiers of the Seventh have their spears down across the gap in the earthwork, and on the far side of them, in the mud, a woman is standing with the rain running off her.

She has walked out of the city. She is young, thin, in a dyer's apron over a quilted coat, with two long knives in her belt that nobody has taken off her, and her hands are blue to the wrist, a deep dye that the rain is not touching. She is not shaking. She is the only person you have seen in three days, besides the soldiers, who is not.

"She says she had it," one of the pickets says, not lowering his spear. "The fever. Says it took her street and left her." He does not sound as if he believes it, or as if he wants her any closer while he decides. "Asks for work."

The woman looks past him at you. "I can carry," she says. "I can cut. I can go where your sick are and not catch it." A pause. "I would like to be somewhere the city isn't."`,
      ch:[{t:'"Let her through. She walks with the Fourth."', req:()=>b64Ph() <= 1 && !S.f.b6_c4_ressaSeen && b64RessaOpen(), fx:()=>{ S.f.b6_c4_ressaSeen = 1; b6Join('ressa'); b64L('ohl', 1); }, go:'b6_c4_ressa_join'},
          {t:'"Let her through. The surgeons need hands."', req:()=>b64Ph() <= 1 && !S.f.b6_c4_ressaSeen && b64RessaOpen(), fx:()=>{ S.f.b6_c4_ressaSeen = 1; S.f.b6_c4_ressaTents = 1; }, go:'b6_c4_ressa_tents'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_ressa:()=>({sp:'Ressa', scene:'b6_gdanisban_rain', again:()=>`Ressa, with her blue hands folded, waiting.`, txt:
`${S.f.b6_c4_ressaTents ? `Ressa is at the end of the surgeons' tents with a stack of bowls, carrying them in and out of the rows where the orderlies will not go without a scarf. She does not wear a scarf. The surgeons have stopped telling her to.` : `Ressa is standing just inside the picket, out of the way, with her blue hands folded in front of her apron and the rain running off her hair.`}

"Ressa," she says, when you ask. "A dyer. Indigo, mostly, and woad when the indigo didn't come." She turns her hands over. "It doesn't wash out. Nothing does, in that trade." She looks toward the city, and then not. "It took my street. Everyone on it. It took me and then it put me down again, and I got up, and they didn't." She says it the way she would say the price of woad. "I have stopped asking it why."${b64If('ohl', `\n\nOhl is looking at her hands, and then at her eyes, and then at her hands. "You had it," he says. "And you're clear." He sounds as if he would like to sit down. "They say there are a few. I had not seen one."`)}`,
      ch:[{t:'"Walk with the Fourth, then."', req:()=>b64RessaOpen(), fx:()=>{ S.f.b6_c4_ressaSeen = 1; b6Join('ressa'); b64L('ohl', 1); }, go:'b6_c4_ressa_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_ressa_join:()=>({sp:'Ressa', scene:'b6_gdanisban_rain', txt:
`${b6In('ressa') ? `Ressa nods once, as if a price had been agreed, and steps in beside the squad.` : `Ressa nods once, as if a price had been agreed. "I'll be at the surgeons' tents, then," she says, "until there's room." Six walk with the Fourth already, and she can count.`}

${b64Say({brisk:`Brisk looks her up and down, the knives, the hands, the apron. "Rations," Brisk says. "Twice a day. Don't touch mine." It is a welcome, from Brisk.`, kettle:`Kettle sticks out a sooty hand. Ressa looks at it, and shakes it with a blue one. "Kettle," Kettle says. "Munitions. Don't touch the satchel." She considers the blue. "Does it come off on things?"`, _:'The squad makes room for her by the fire.'})}${b64If('brannoc', `\n\nBrannoc takes his helmet off to her, which lets the rain in, and introduces himself at length, and Sweetcreek, and Falar, and most of the islands. Ressa listens to all of it without moving her face. At the end she says, "Thank you," and Brannoc looks as if he has won something.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c4_ressa_tents:()=>({sp:'The picket', scene:'b6_gdanisban_rain', txt:
`The pickets lift their spears, and Ressa walks past them without looking at either, and goes up the lines toward the surgeons' tents with her blue hands at her sides. The lines let her pass, and give her room.

"She'll be at the tents," the picket says. "If you want her, Sergeant." He sounds as if he cannot imagine why anyone would.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the surgeons' carts at the picket gap: bandits off the plague road (optional fight) */
    b6_c4_carts:()=>({sp:'The surgeons\' carts', scene:'b6_gdanisban_rain', again:()=>`The carts at the picket gap.`, txt: S.f.b6_c4_cartsDone ?
`The surgeons' carts are in, unloaded, standing empty by the gap with their shafts down in the mud. The drivers are asleep under them.` : b64Ph() >= 2 ?
`The surgeons' carts by the picket gap, black shapes in the dark.` :
`Three carts are coming in through the picket gap from the plague road, the surgeons' supply from the coast, loaded high under oilcloth: linen, vinegar, salves, the cutters' gut and needles. The drivers walk at the horses' heads.

Behind the last cart, on the road in the rain, four figures with scarves over their faces are walking faster than the carts. One has a bow under his cloak to keep the string dry. They have followed the carts a long way, by the look of their boots, and they are about to stop following.`,
      ch:[{t:'"Seventh. To the carts."', req:()=>!S.f.b6_c4_cartsDone && b64Ph() <= 1, go:()=>startBattle('b6_c4_carts', {})},
          {t:'Along the earthwork, behind the carts, and in among them before they know.', req:()=>!S.f.b6_c4_cartsDone && b64Ph() <= 1, check:['wits', 14],
            edges:id=>[id === 'ellis' && ['the Claw taught her where people look', 2], id === 'tuft' && ['the rain and the shadow of the carts are enough for a Meanas veil', 1], id === 'ressa' && ['she walked out of a city of the sick without being seen', 1], id === 'brisk' && ['she is wider than the earthwork', -1], id === 'brannoc' && ['he hums when he creeps', -1]],
            near:{t:()=>{ const w = b64Who(); return `Yes, but ${b64Nm(w)} ${b64V(w, 'go', 'goes')} down the bank on the seat of ${b64V(w, 'your', 'their')} breeches into the ditch-water: soaked, and bruised.`; }, fx:()=>bruise(b64Who(), bruiseN())},
            go:()=>startBattle('b6_c4_carts', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c4_carts_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_carts_seen:()=>({sp:'The surgeons\' carts', scene:'b6_gdanisban_rain', txt:
`The bank gives under a boot and goes into the ditch with a noise like a cow sitting down. All four of them turn, and the one with the bow has the string on before anybody has got up.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c4_carts', {surprise:'e'})}]}),
    b6_c4_carts_after:()=>({sp:'The surgeons\' carts', scene:'b6_gdanisban_rain', fx:()=>{ if (!S.f.b6_c4_cartsDone) { S.f.b6_c4_cartsDone = 1; S.inv.salve = (S.inv.salve || 0) + 1; } if (!S.f.b6_c4_cloakGot) { S.f.b6_c4_cloakGot = 1; gain('b6_c4_raincloak'); } }, txt:
`The carts come in through the gap with the drivers walking beside them as if nothing had happened, as drivers deal with most things.

The surgeons' quartermaster comes down from the tents at a run and counts the load before he counts the squad. When the load is all there he counts the squad as well, and gives the Fourth a salve from the top of the first cart, and then, after looking at you for a while in the rain, a rain-cloak from under the oilcloth: Host issue, waxed, dry inside.

"For whoever's wettest," he says. "That's all of you. Pick."${b64If('brannoc', `\n\nBrannoc offers it to Ressa, if she is near, and to Kettle, and to you, and then puts it on himself before anyone can accept.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the water detail: the one fever "yes, but" of the chapter (the brief: no more than one) */
    b6_c4_water:()=>({sp:'The water detail', scene:'b6_gdanisban_rain', txt:
`The surgeons want water, clean, a great deal of it, and the Seventh's turn has come round. The only clean water near the camp is a stone cistern in a ruined farm off the Host's left flank, a hundred paces of mud away, with a broken winch and a rope.

Everyone knows the rule: boil it before it goes near a mouth. Everyone is also very thirsty, and has been rained on for three days, and the cistern water is cold and clear and right there.`,
      ch:[{t:'Fill the barrels and get them back to the tents.', req:()=>!S.f.b6_c4_waterTried, check:['might', 13], fx:()=>{ S.f.b6_c4_waterTried = 1; },
            edges:id=>[id === 'brisk' && ['she carries two barrels and does not notice', 3], id === 'brannoc' && ['he has hauled water on Falari decks all his life', 2], id === 'greysword' && ['a shield-arm is a carrying arm', 1], id === 'tuft' && ['she is slight, and the barrels are not', -2]],
            near:{t:()=>{ const w = b64Who(); return w === 'ressa' ? `Yes, but Ressa drinks from the cistern, cupped hands, before anyone can stop her. Nothing happens to her. The squad spends the rest of the afternoon watching her for it to happen, and nobody rests at the fire before dusk.` : `Yes, but ${b64Nm(w)} drank from the cistern, cupped hands, once, before anyone could say anything. By evening ${b64Nm(w)} ${b64V(w, 'have', 'has')} the sweats.`; },
              fx:()=>{ const w = b64Who(); if (w === 'ressa') S.f.b6_c4_rest1 = 1; else b6Catch(w, 'the cistern water'); }},
            go:'b6_c4_water_ok', fail:'b6_c4_water_no'},
          {t:'Not now.', go:'b6_c4_fire'}]}),
    b6_c4_water_ok:()=>({sp:'The water detail', scene:'b6_gdanisban_rain', fx:()=>{ if (!S.f.b6_c4_water) { S.f.b6_c4_water = 1; S.inv.salve = (S.inv.salve || 0) + 1; } }, txt:
`The barrels come back to the surgeons' tents full, on a hand-cart with one bad wheel, and the surgeon with the red forearms looks at them and says "Good," which is the first time you have heard the word in three days. She sends the Fourth away with a salve and a look that suggests the squad wash its hands before it touches anything else.`,
      ch:[{t:'Back to the fire.', go:'b6_c4_fire'}]}),
    b6_c4_water_no:()=>({sp:'The water detail', scene:'b6_gdanisban_rain', txt:
`The winch rope parts on the third barrel and the bucket goes to the bottom of the cistern, and the hand-cart's bad wheel comes off in the mud on the way back, and two barrels out of five reach the tents. The surgeon looks at them. She does not say "good". Her silence is worse.`,
      ch:[{t:'Back to the fire.', go:'b6_c4_fire'}]}),

    /* ---- the Fourth's fire: a rest, the squad's talk, a fever check and Ohl's hands, the way on (the games pass wraps it; keep the id) ---- */
    b6_c4_fire:()=>{ const ph = b64Ph();
      return {sp:ph === 2 ? 'The picket fire' : 'The Fourth\'s fire', scene:ph === 2 ? 'b6_c4_edge' : 'b6_gdanisban_rain', html:feverHTML(),
        again:()=> ph === 2 ? 'The picket fire at the edge, low, and the lamps out on the open ground.' : ph >= 3 ? 'The fire, relit, and steam coming off every cloak round it.' : 'The fire under its square of oiled canvas, and the rain on the canvas.', txt:
`${ph === 2 ? `The picket fire at the camp's edge is a small one, kept low so it does not blind the sentries, in a scrape behind the ditch. Out on the open ground toward the city the lamps move and stop and move. Sometimes, between gusts, you can hear the singing.` : ph >= 3 ? `The fire under the oiled canvas is going again, properly, for the first time in days, and every soldier in the Seventh who can stand has come to stand near it. Steam comes off the cloaks. Two tents down a soldier is laughing, and stops, and starts again, as if checking that it still works.` : `The Fourth's fire is a pit with a square of oiled canvas over it on four poles, and it smokes, and it is the only dry thing in the Seventh's lines. The rain drums on the canvas. The squad sits as close as the smoke allows, and closer.`}${b64If('ressa', () => ph <= 1 ? `\n\nRessa sits at the edge of the canvas's shelter with her back very straight, sleeping sitting up, or looking as if she is.` : '')}${b64If('brannoc', () => ph <= 1 ? `\n\nBrannoc has got his pipe lit at last and is guarding it with both hands like a candle in a temple.` : '')}`,
        ch:[Object.assign(b6DeckChoice(4), {req:()=>ph <= 1 && !S.f.b6_c4_drawn && !S.f.b6_c4_noCard}),
            {t:'Sit an hour. Let the squad rest.', req:()=>ph < 3 && !S.f['b6_c4_rest' + ph], fx:()=>{ S.f['b6_c4_rest' + ph] = 1; rest(ph === 2 ? 'The Fourth takes the picket by halves, and the half that is not on it sleeps in its cloaks by the fire. Wounds close, mostly.' : 'The Fourth sits an hour under the canvas with the rain on it. Wounds close, mostly.'); }, go:'b6_c4_fire_rest'},
            {t:'Talk with the squad.', go:'b6_c4_fire_talk'},
            {t:'"Ohl. The fever."', req:()=>b6In('ohl') && !S.f.b6_soliel && !S.f['b6_c4_ohl' + ph] && b64Fev().some(id => id !== 'ohl'), go:'b6_c4_fire_cure'},
            {t:'The water detail, for the surgeons.', req:()=>ph === 1 && !S.f.b6_c4_waterTried, go:'b6_c4_water'},
            {t:'Dusk. The edge, as the captain ordered.', req:()=>ph === 1 && !!S.f.b6_c4_orders, onward:true, go:'b6_c4_dusk'},
            {t:'On.', req:()=>ph >= 2, onward:true, go:()=>talk(b64Next())},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c4_fire_rest:()=>({sp:'The Fourth\'s fire', scene:b64Ph() === 2 ? 'b6_c4_edge' : 'b6_gdanisban_rain', txt:
`${b64Ph() === 2 ? `Half the night by the picket fire in wet cloaks, with the other half of the squad at the ditch, and then the other way round.` : `An hour under the canvas. The rain does not stop, but for an hour it is somebody else's rain.`}

${b64Say({ohl:`Ohl goes round the squad with his tea, which is technically medicine, and makes everyone drink it, and watches them do it. He looks at eyes, and at hands, and at the backs of necks, and keeps what he is looking for to himself.`, brisk:`Brisk sleeps sitting up against a tent pole, or looks as if she does.`, _:'One of them sleeps. The others watch the rain.'})}${b64If('kettle', `\n\nKettle counts the satchel, and then counts it again, and then unwraps one sharper to see if the oilcloth is holding. It is. She wraps it again anyway.`)}${b64If('tuft', `\n\nTuft lies down with her back to the city and the lamp lit beside her, the way she always does.`)}`,
      ch:[{t:'Back to the fire.', go:'b6_c4_fire'}]}),
    b6_c4_fire_talk:()=>{ const ph = b64Ph(), ln = [];
      if (b6In('brisk')) ln.push(ph >= 3 && !S.f.b6_c4_bell ? `Brisk is standing in the first sun in days with her shield on her back, which is Brisk being pleased. "Eleven of the Seventh up," she says. "Good." From Brisk, that is a song.` : ph >= 3 ? `Brisk is standing, because she has been sitting for three days and has decided she is finished with it. "Bell," she says. She lifts two fingers to her brow, to nobody, the way she always has. "Never prayed. Always saluted." She does not lower her hand for a while.` : ph === 2 ? `Brisk is at the ditch with her shield, looking at the lamps. "They want us to come out and look," she says. "So we don't." She sounds as if this settles a great deal more than the ditch.` : `Brisk is counting rations aloud, under her breath, in the rain. "Four days," she says. "If nobody else gets sick. Three if they do." She starts again from the top.`);
      if (b6In('kettle')) ln.push(ph >= 3 ? `Kettle has her satchel open in the first sun in days, every munition laid out on her cloak to air like washing. "Dry," she says, to each of them, as if to old friends back from a war.` : ph === 2 ? `Kettle has a sharper in her hand and is not going to throw it. "Not at them," she says, before you ask. "You can't blow up a sickness. I asked Chub once. He said you could try." She puts it away.` : `Kettle is wrapping munitions in oilcloth. "Brannoc says the fever won't touch Falari." She snorts. "Brannoc's from the little islands. On the Strike Isles we know better. We know better about everything."${b6In('brannoc') ? ` Across the fire, Brannoc says something in Falari that makes her laugh out loud and throw a boot at him.` : ''}`);
      if (b6In('tuft')) ln.push(ph >= 3 ? `Tuft has put her hood down for the first time since the Host came in sight of the city. "It's gone," she says. "Whatever was in the city. Something walked into it last night, and something else walked out." She shivers, and it is not the wet. "I won't read today, Sergeant. The cards would only tell me what I already know."` : ph === 2 ? `Tuft sits with her back to the ditch and her hands inside her sleeves. "The warrens are bad tonight," she says. "Meanas tastes of it. Like a cellar where something died." She looks at the lamps. "I won't reach for it unless you need me to. When you do, I will."` : `Tuft sits with her back to the city. "There's something in there," she says, low. "Not the fever. Something the fever is for." She turns a card over in her fingers without looking at it. "I'd rather not know which. I think I'm going to."`);
      if (b6In('ohl')) ln.push(ph >= 3 && !S.f.b6_c4_bell ? `Ohl is sitting in the mud by the fire with his face in his hands. When he takes them away he is smiling, and his eyes are wet. "She answered," he says. "Not me. Everyone. Twenty-two years I have asked her for one soldier at a time, and this morning she gave the whole camp." He looks toward the field hospital, where the flap is still shut, and stops smiling.` : ph >= 3 ? `Ohl is sitting in the mud, which he would not have done at any other time in twenty-two years, with his face in his hands. When he takes his hands away he is smiling, and his eyes are wet. "She answered," he says. "Not me. Everyone. Twenty-two years, Sergeant, I have asked her for one soldier at a time, and this morning she gave the whole camp." He wipes his face. "And not him. Not the one cot I would have asked for." He gets up, carefully.` : ph === 2 ? `Ohl has his list out by the picket fire, the oilcloth one, and is not reading it. "I can feel the warren from here," he says. "Denul. It's sick, Sergeant. Like a hand that won't close." He folds the list away. "Every time I reach for it tonight, it will reach back. I'll reach anyway. That's the argument."` : `Ohl is making tea. "Ehrlii," he says, of the rain. "We have nine words for it in Ehrlitan. None of them are kind." He hands you a cup. "The fever is in the warren too, Sergeant. The surgeons say it, and I say it. Denul will still do what I ask. It will cost more."`);
      if (b6In('brannoc')) ln.push(ph >= 3 && !S.f.b6_c4_bell ? `Brannoc is stamping the mud off his boots and telling anyone who will listen that he always said the fever wouldn't touch a Falari. The squad lets it go. The fever never got the chance.` : ph >= 3 ? `Brannoc has his tin whistle out and is playing something Falari and mournful on it, very badly, for the bell. The squad lets him play. When he finishes he says, "Sweetcreek'll be wanting a word with the new High Fist," and grins. "I'd pay to stand near enough to hear it."` : ph === 2 ? `Brannoc is humming, very low, at the ditch, until Brisk looks at him. Then he stops. "Falari sing at a sickbed," he whispers. "To keep the dark off." He looks at the lamps on the open ground. "They're singing too." He does not hum again.` : `Brannoc is telling the story of Sweetcreek flat on her back in the mud to anyone at the fire who has not heard it yet, and to some who have. ${S.f.b6_c4_kindly ? `"Captain Kindly," he says. "I'd like to shake his hand. And then I'd like to run."` : `"A deserter," he says. "One blow. They say he's in command now. I don't believe a word of it, and I've told it nine times."`}`);
      if (b6In('ressa')) ln.push(ph >= 3 ? `Ressa is watching the carriers go down the rows with an expression you cannot read. "No one touched me," she says, at last. "When I had it. No one came." She looks at her blue hands. "I'm glad they're coming now. I would like to be gladder."` : ph === 2 ? `Ressa is looking at the lamps on the open ground. "I know some of them," she says. "From the street. From the dye-yards." She does not say what she will do if they come through the gap. Her hands are on her knives.` : `Ressa sleeps sitting up, the way she says she always has since the fever. When she wakes she says, "It's a city. People think it's a sickness with walls round it. It was a city." She goes back to sleep.`);
      if (b6In('sohra')) ln.push(ph >= 3 && !S.f.b6_c4_bell ? `Sohra has her face turned up to the thin sun. "The spirits are coming back," she says. "Slowly. Like birds after a hawk."` : ph >= 3 ? `Sohra sings over the fire, very low, a Rhivi thing for the morning after a death. "For the old one," she says, when she has finished. "The herd-mothers would sing it for any bull that led the herd that long."` : `Sohra has her bag of bones in her lap and is not opening it. "The spirits do not come near this city," she says. "Not even the hungry ones. I have never known a place they would not come."`);
      if (b6In('greysword')) ln.push(ph >= 3 && !S.f.b6_c4_bell ? `Dannet is cleaning the mud off the half-painted wolf on her shield. "Something hunted in the night," she says. "I heard it. Not wolves." She keeps cleaning.` : ph >= 3 ? `Dannet has her hand on the half-painted wolf on her shield. "In Capustan," she says, "when it was over, we stood for the dead. Every one of us, in the rain." She looks at the field hospital. "We will stand for this one."` : `Dannet sits with her shield across her knees. "Capustan had a siege," she says. "Not a fever. I would rather the siege." She considers it. "At least a siege comes at you from the front."`);
      if (b6In('ellis')) ln.push(`Ellis sits apart, with her back to the fire to save her night eyes, watching the ${ph === 2 ? 'lamps' : 'city'}. "Count the sentries and you know the camp," she says. "That city hasn't put a sentry on its wall in three days." She does not seem to like what that tells her.`);
      if (b6In('vell')) ln.push(`Vell is looking at the city's walls with a rope man's eye. "I could be over that in a quarter of a bell," he says. "No one's asking me to, I notice." He seems relieved about it.`);
      return {sp:'The Fourth\'s fire', scene:ph === 2 ? 'b6_c4_edge' : 'b6_gdanisban_rain', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b6_c4_fire'}]}; },
    /* Ohl's hands on the fever, before the carriers: Denul works, and the sick warren takes its price (bh-canon §8: the warrens are infested) */
    b6_c4_fire_cure:()=>{ const ph = b64Ph(), who = b64Fev().find(id => id !== 'ohl') || 'sgt';
      return {sp:'Ohl', scene:ph === 2 ? 'b6_c4_edge' : 'b6_gdanisban_rain', fx:()=>{ if (!S.f['b6_c4_ohl' + ph]) { S.f['b6_c4_ohl' + ph] = 1; if (b6Cure(who, 'Ohl\'s hands, and Denul')) { bruise('ohl', bruiseN()); S.f.b6_c4_ohlCured = (S.f.b6_c4_ohlCured || 0) + 1; } } }, txt:
`Ohl kneels by ${who === 'sgt' ? 'you' : NAME(who)} and puts his old hands flat, one on the chest and one on the brow, and closes his eyes.

You have watched him do this a hundred times. It has never looked like this. His face goes grey and tight, and his lips move in Ehrlii, and the words are not a prayer this time but an argument, low and furious, with something that is arguing back. It goes on a long time. The rain drums on the canvas.

Then ${who === 'sgt' ? 'your' : NAME(who) + '\'s'} fever breaks, all at once, in a sweat like a bucket thrown, and Ohl sits back on his heels and has to be held up.

"It's in the warren," he says, when he can. "It bit me for that." He looks at his hands, which are shaking, which they never do. "Once tonight, Sergeant. Not twice."`,
        ch:[{t:'Back to the fire.', go:'b6_c4_fire'}]}; },

    /* dusk, and the night's orders: phase 1 to phase 2 */
    b6_c4_dusk:()=>({sp:'The Seventh Company\'s lines · dusk', scene:'b6_gdanisban_rain', txt:
`Dusk comes early under the rain, a grey going darker. In the city, lamps come on behind the walls, a few, and then a great many, and then the gate opens a crack and the lamps start to come out of it, one at a time, onto the open ground.

The captain comes down the lines in his dripping helmet. "There they are," he says. "Every night. The Fourth has the edge till dawn. The gap stays shut." He looks at the squad. "And nobody touches them. I mean that, Sergeant. Not with a hand."${b64Fev().length ? `\n\nHe looks at ${b64FevNames()}, and away. "Keep the fevered back from the ditch."` : ''}`,
      ch:[S.area === 'b6_c4_edge' ? {t:'To the edge.', onward:true, fx:()=>{ S.f.b6_c4_ph = 2; }, go:'b6_c4_edge_arrive'} : {t:'To the edge.', onward:true, go:()=>{ S.f.b6_c4_ph = 2; startExplore('b6_c4_edge'); talk('b6_c4_edge_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 2: the night at the edge ---- */
    b6_c4_edge_arrive:()=>({sp:'The camp\'s edge', scene:'b6_c4_edge', again:()=>`The edge, the ditch, the lamps on the open ground.`, txt:
`The camp's edge on the Seventh's stretch is a ditch and a bank of earth with a gap in it a cart wide, and a picket fire in a scrape behind the bank, and past the ditch the open ground toward the city, black, with the lamps on it.

There are more lamps than last night, the sentry says. They come a little closer every night. Tonight some of them have stopped at a post just past the gap, hung with rags, where clay bowls have been set out in rows in the mud, and the singing comes from there.${b64If('tuft', `\n\nTuft has stopped at the bank with her hand on the earth. "The warren's bad here," she whispers. "Right here. As if they brought it with them."`)}${b64If('ressa', `\n\nRessa looks at the post with the rags, and her face does not change. "They did that on our street," she says. "At the end. Bowls. For her to drink from."`)}`,
      ch:[{t:'Walk the edge.', go:()=>startExplore()}]}),
    b6_c4_sentry:()=>({sp:'A sentry of the Seventh', scene:'b6_c4_edge', fx:()=>{ S.f.b6_c4_sentry = 1; }, again:()=>`The sentry at the bank, with his spear and his scarf.`, txt:
`The sentry on the bank has a scarf over his mouth and nose, like the orderlies, and his spear held crossways in both hands like a bar across a door.

"Third night," he says. "They come out at dusk and stand at the post and sing to her. Holding their hands out." He spits over the bank, carefully, away from the wind. "Last night one of them walked up to the gap and stood there with her hands out at me till dawn. Didn't say a word. Just stood." He shifts his grip on the spear. "I didn't touch her. Captain said." A pause. "Tonight there's a priest with them. In grey. You'll see."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_shrine:()=>({sp:'The rag post', scene:'b6_c4_edge', again:()=>`The post past the gap, with the rags on it.`, txt: S.f.b6_c4_cultDone ?
`The post past the gap is down, and the rags with it, and the clay bowls are broken in the mud. The lamps on the open ground have gone back toward the city, all but a few, which have gone out where they stood.` :
`They are at the gap when you reach it: a line of them in the dark, men and women in robes gone black with rain, with lamps, singing something slow in a dialect of Ehrlii that Ohl will not translate afterward. They hold their hands out in front of them, palms up, to show what is on them.

At the front is a priest in grey, taller than the rest, with his head shaved and his hands out like theirs. He looks at the squad on the bank with great patience. Then he steps into the gap, and the line comes after him.`,
      ch:[{t:'"Shields. Close the gap."', req:()=>!S.f.b6_c4_cultDone, go:()=>startBattle('b6_c4_cult', {})},
          {t:'Out along the ditch in the dark, and take the priest from the side before the line is through.', req:()=>!S.f.b6_c4_cultDone, check:['guile', 14],
            edges:id=>[id === 'tuft' && ['a Meanas veil is a small spell, and the dark is large', 2], id === 'ellis' && ['the Claw taught her ditches', 2], id === 'ressa' && ['she knows how they move; she watched them on her street', 1], id === 'brisk' && ['she is very large and very loud in water', -1], id === 'brannoc' && ['he splashes', -1]],
            near:{t:()=>{ const w = b64Who(); return `Yes, but the ditch is deeper than it looks, and ${b64Nm(w)} ${b64V(w, 'go', 'goes')} in to the chest and ${b64V(w, 'lose', 'loses')} a salve out of ${b64V(w, 'your', 'a')} belt-pouch to the water.`; }, fx:()=>{ if ((S.inv.salve || 0) > 0) S.inv.salve -= 1; }},
            go:()=>startBattle('b6_c4_cult', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c4_shrine_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_shrine_seen:()=>({sp:'The gap', scene:'b6_c4_edge', txt:
`The priest turns his head before anyone is near him, as if he had heard you think. He smiles. The singing stops, and the whole line comes through the gap at once.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c4_cult', {surprise:'e'})}]}),
    b6_c4_cult_after:()=>({sp:'The camp\'s edge', scene:'b6_c4_edge', fx:()=>{ S.f.b6_c4_cultDone = 1; }, html:feverHTML(), txt:
`The gap is closed. The post is down. Out on the open ground the lamps are going back toward the city, slowly, some of them, and some are going out where they stand.

${b64Say({ohl:`Ohl goes along the squad in the dark with water and vinegar and a cloth, and washes every hand, every face, every cut, whether it needs it or not. "Anyone they touched," he says. "Tell me. Don't be brave about it. Brave is how it gets in."`, _:'The squad washes its hands in vinegar from the picket\'s bucket, and its faces, and then its hands again.'})}${b64Fev().length ? `\n\nBy the picket fire, ${b64FevNames()} ${b64Fev().length > 1 || b64Fev()[0] === 'sgt' ? 'are' : 'is'} sweating in the cold. It came in somewhere.` : ''}

Then, behind you, in the camp, the horses on the picket lines start to scream.`,
      ch:[{t:'Back inside the ditch. Listen.', onward:true, go:'b6_c4_hounds'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the night something runs through the camp: shapes and sounds; the squad stands still and does not fight it (series-canon rule 14) */
    b6_c4_hounds:()=>({sp:'The camp · night', scene:'b6_c4_edge', again:()=>`The camp in the dark, the horses quiet now, and the city screaming.`, txt: S.f.b6_c4_hounds ?
`It has gone. The horses are quiet. Out past the ditch, the city has started to make a sound that does not stop.` :
`It comes from the far side of the camp, from the north, and it comes fast: the horses first, every picket line in the Host screaming at once, and then the dogs, and then a silence where the dogs were.

Then the shapes. Down the lane between the Seventh's tent rows, low and long and very big, more than one, moving the way water moves downhill. Tent ropes snap. A cook-pot goes over. Something passes a lit tent and its shadow on the canvas is the size of a horse, and then it is past.

They are coming toward the edge. Toward the gap. Toward the city behind it.${b64If('tuft', `\n\nTuft's hand is on your arm, hard. "Don't move," she breathes. "None of you. I know that sound. From the Pale." Her face is white in the firelight. "They're not here for us. Don't make them be."`)}`,
      ch:[{t:'"Still. Everyone. Weapons down. Let it go past."', req:()=>!S.f.b6_c4_hounds, check:['wits', 15],
            edges:id=>[id === 'tuft' && ['she has met them before, and she is still here', 3], id === 'brisk' && ['she can stand still like a wall stands still', 2], id === 'sohra' && ['the herds taught her to stand still when something big goes by', 1], id === 'brannoc' && ['every part of him wants to swing the axe', -2], id === 'kettle' && ['her hand is already in the satchel', -1]],
            near:{t:()=>{ const w = b64Who(); return `Yes, but one of them stops at the gap, right beside ${b64Nm(w)}, and breathes, and goes on. ${b64Nm(w).replace(/^./, c => c.toUpperCase())} will not be right for a day: rattled.`; }, fx:()=>b64Rattle(b64Who())},
            go:'b6_c4_hounds_still', fail:'b6_c4_hounds_shaken'},
          {t:'Not now.', req:()=>!S.f.b6_c4_hounds, go:()=>startExplore()},
          {t:'On.', req:()=>!!S.f.b6_c4_hounds, onward:true, go:'b6_c4_outer_order'}]}),
    b6_c4_hounds_still:()=>({sp:'The camp · night', scene:'b6_c4_edge', fx:()=>{ S.f.b6_c4_hounds ??= 'still'; }, txt:
`The squad stands. Shields down, blades down, Kettle's satchel shut, nobody breathing that does not have to.

They go through the gap like a wind through a door. Something brushes the bank close enough that the earth slides. There is a smell, cold, like a cellar, and like a dog. And then they are out on the open ground, running, toward the city, and the last of the lamps out there go out together.

After a while the horses stop screaming. After a longer while, the city starts.${b64If('ohl', `\n\nOhl lets out a breath he has been holding since the horses. "Hood," he says, in Ehrlii, conversationally. "Not tonight, then. Thank you."`)}`,
      ch:[{t:'On.', onward:true, go:'b6_c4_outer_order'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_hounds_shaken:()=>({sp:'The camp · night', scene:'b6_c4_edge', fx:()=>{ if (!S.f.b6_c4_hounds) { S.f.b6_c4_hounds = 'shaken'; const w = b64Who(); b64Rattle(w); } }, txt:
`One of the squad moves. A shield comes up, or a hand goes to a satchel, or a foot goes back, and one of the shapes in the lane turns its head.

It does not stop. It comes past so close that the squad goes flat in the mud without being told, and it goes over the bank and through the gap and is out on the open ground, running, with the others, toward the city. But it looked. Everyone who was there felt it look.

The squad stays down in the mud a while. When it gets up it does not talk about it, and ${b64Nm(b64Who())} ${b64V(b64Who(), 'are', 'is')} shaking.${b64If('tuft', `\n\n"It looked," Tuft says, very quietly. "That's all. It only looked." She does not sound as if she thinks that is all.`)}`,
      ch:[{t:'On.', onward:true, go:'b6_c4_outer_order'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_edge_back:()=>({sp:'The camp\'s edge', scene:'b6_c4_edge', txt: !S.f.b6_c4_cultDone ?
`The way back into the lines. The captain gave the Fourth the edge until dawn, and there are lamps at the gap.` : !S.f.b6_c4_hounds ?
`The way back into the lines. Behind you, in the camp, the horses have started screaming.` :
`The way back into the lines. A runner from the captain is coming down it at a run, with his helmet in his hand.`,
      ch:[{t:'Back to the gap.', req:()=>!S.f.b6_c4_cultDone, go:()=>startExplore()},
          {t:'Listen.', req:()=>!!S.f.b6_c4_cultDone && !S.f.b6_c4_hounds, onward:true, go:'b6_c4_hounds'},
          {t:'The runner.', req:()=>!!S.f.b6_c4_hounds, onward:true, go:'b6_c4_outer_order'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the captain's runner: the forward picket in the streets outside the walls has not reported */
    b6_c4_outer_order:()=>({sp:'The captain\'s runner', scene:'b6_c4_edge', again:()=>`The runner, waiting, with the city loud behind him.`, txt:
`The runner is a boy of the Seventh with no helmet and mud to the knees. "Captain says," he gets out, "the forward picket. In the streets outside the walls, by the gate. Two of ours behind a cart. They haven't sent back since that, since whatever it was, went in." He points at the city with his helmet. "Captain says the Fourth. Now. Bring them back or hold it with them till dawn. Don't go in the gate." He thinks. "He said that twice. Don't go in the gate."

Inside G'danisban the sound has not stopped. It is not one sound. It is a city's worth.`,
      ch:[{t:'To the streets outside the walls.', onward:true, go:()=>{ startExplore('b6_c4_outer'); talk('b6_c4_outer_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the streets outside the walls: never inside the gate ---- */
    b6_c4_outer_arrive:()=>({sp:'Outside the walls', scene:'b6_c4_outer', again:()=>`The outer streets, dark, and the gate shut on the city's noise.`, txt:
`The streets outside G'danisban's walls are a town of their own, the kind that grows against any city wall: dye-yards and tanneries and potters, the trades the city wants and does not want to smell, houses shouldered against each other along lanes that go nowhere in particular.

They are empty. Doors open, shutters open, a cart in the lane with its shafts on the ground and no horse. The rain has stopped here, or the walls keep it off. Over the walls the noise goes on, rising and falling.

The forward picket's post is east, by the gate, where a lamp is still burning.${b64If('ressa', `\n\nRessa has stopped walking. She is looking down a lane on the left, at a yard with tall vats in it and blue water standing in the gutters. "That was mine," she says. "Not mine. Where I worked." She starts walking again before anyone can say anything.`)}`,
      ch:[{t:'East, to the picket.', go:()=>startExplore()}]}),
    b6_c4_well:()=>({sp:'A well', scene:'b6_c4_outer', again:()=>`The well in the little square, its rope gone.`, txt:
`A well in a square no bigger than a room, with a stone lip worn smooth by a hundred years of buckets, and the bucket gone, and the rope cut. A mark has been chalked on the lip, a circle with a line through it, and then another, and another, all the way round.

${b64Say({ressa:`"Don't," Ressa says, though nobody was going to. "That's the first well it was in. On this side." She touches one of the chalk marks with a blue finger. "My street put these. So people would know." She takes her finger away and wipes it on her apron.`, ohl:`"Don't," Ohl says, though nobody was going to. He reads the chalk marks the way he reads his list. "Ehrlii," he says. "Old. It means *the water is spoken for*." He does not say by whom.`, _:'Nobody drinks.'})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_gate:()=>({sp:'The gate', scene:'b6_c4_outer', again:()=>`The gate, shut, and the noise behind it.`, txt:
`The gate of G'danisban is shut and barred, and nobody is on the wall above it. The noise comes over the top of it and through the cracks: shouting, and running, and something breaking, a long way in, near the centre of the city, where the temples are.

Twice, as you stand there, something heavy hits the inside of the gate and the bar jumps in its brackets. Then it stops. The captain said twice not to go in the gate. You find you have no wish to.${b64If('tuft', `\n\nTuft stands with her back to the gate and her eyes closed. "It's dying," she says. "Something in there is dying. Something very old." She opens her eyes. "Don't ask me what, Sergeant. Please."`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_post:()=>({sp:'The forward picket', scene:'b6_c4_outer', again:()=>`The picket's post by the gate, the cart on its side.`, txt: S.f.b6_c4_streetsDone ?
`The forward picket's post: a cart on its side across the street, and the two regulars of the Host behind it, sitting down now, with their backs to the wall, waiting for the light.` :
`The forward picket's post is a cart turned on its side across the street, with a lamp hung on its upturned wheel, and two of the Host's regulars behind it with their backs to a wall and their swords out.

In the street in front of them is a crowd that has come out of the gate-ward: twenty, more, with cudgels and kitchen knives and a man at the front with a butcher's cleaver who is shouting about the Mistress, and the Malazans, and what the Malazans did to the Mistress, whatever that is. Some of them have the fever. All of them have nothing left to lose. Two of them have seen the Fourth.`,
      ch:[{t:'"Seventh. To the cart."', req:()=>!S.f.b6_c4_streetsDone, go:()=>startBattle('b6_c4_streets', {})},
          {t:'Down the lane behind the dye-yards and into their backs.', req:()=>!S.f.b6_c4_streetsDone, check:['wits', 15],
            edges:id=>[id === 'ressa' && ['she worked in these lanes', 3], id === 'vell' && ['he can go over a yard wall as easily as round it', 2], id === 'ellis' && ['the Claw taught her lanes', 1], id === 'brisk' && ['the lane was not built for Brisk', -2]],
            near:{t:()=>{ const w = b64Who(); return `Yes, but the lane comes out through a dye-yard, and ${b64Nm(w)} ${b64V(w, 'go', 'goes')} into a vat to the waist: blue to the belt for a month, bruised, and the crowd heard the splash.`; }, fx:()=>bruise(b64Who(), bruiseN())},
            go:()=>startBattle('b6_c4_streets', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c4_post_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_post_seen:()=>({sp:'The forward picket', scene:'b6_c4_outer', txt:
`The lane ends in a yard gate that is locked. By the time somebody has got it open, the man with the cleaver is facing the squad, and so is everyone with him.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c4_streets', {surprise:'e'})}]}),
    b6_c4_streets_after:()=>({sp:'The forward picket', scene:'b6_c4_outer', fx:()=>{ S.f.b6_c4_streetsDone = 1; if (!S.f.b6_c4_knivesGot) { S.f.b6_c4_knivesGot = 1; gain('b6_c4_dyerknives'); } }, html:feverHTML(), txt:
`The crowd goes back into the gate-ward the way it came, carrying some of its own and leaving others. The two regulars behind the cart sit down where they stand, with their swords across their knees, and one of them starts to laugh and cannot stop for a while.

Inside the walls, toward the end of the night, the noise stops. Not slowly. All at once, as if a door had been shut on it.

In the street by the cart there is a pair of long knives with indigo-stained grips, dropped by somebody from the dye-yards who will not need them now.${b64Say({ressa:`\n\nRessa picks them up, and turns them over, and reads the blue print on the blade the way you read a name. "The old man's yard, at the end of my street," she says. "He had good steel." She holds them out to the squad. "He'd want them used." She does not say what happened to the old man.`, _:' One of the squad picks them up.'})}`,
      ch:[{t:'Back to the camp, before dawn.', onward:true, go:'b6_c4_dawn_walk'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_outer_back:()=>({sp:'Outside the walls', scene:'b6_c4_outer', txt: S.f.b6_c4_streetsDone ?
`The way back to the camp, through the empty lanes. The sky over the walls is going grey.` :
`The way back to the camp. The forward picket is still out there by the gate, behind its cart. The captain said bring them back or hold it with them.`,
      ch:[{t:'Back to the camp.', req:()=>!!S.f.b6_c4_streetsDone, onward:true, go:'b6_c4_dawn_walk'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_dawn_walk:()=>({sp:'Before G\'danisban · first light', scene:'b6_gdanisban_rain', txt:
`The Fourth walks back to the camp at first light with the two regulars of the forward picket between it, across the open ground, past the broken bowls and the fallen post and the lamps gone out in the mud.

The rain is thinning. For the first time in four days you can see where the sky ends and the city begins.

The camp is quiet in a way it has not been since the Host came here. Not the quiet of the sick. Something else. A sentry at the gap watches the squad come in and says, before anyone can ask, "Go and see."`,
      ch:[{t:'Into the lines.', onward:true, go:()=>{ S.f.b6_c4_ph = 3; startExplore('b6_c4_lines'); talk('b6_c4_morning'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 3: the morning the fever breaks for many (S.f.b6_soliel; every fevered squadmate cured, "the carriers") ---- */
    b6_c4_morning:()=>{ const sick = b64Fev().slice();
      return {sp:'The Seventh Company\'s lines · morning', scene:'b6_gdanisban_rain', fx:()=>{ if (!S.f.b6_soliel) { S.f.b6_soliel = 1; S.f.b6_c4_carried = sick.length; sick.forEach(id => b6Cure(id, 'the carriers')); } },
        again:()=>`The lines in the morning, the rain gone, the sick sitting up.`, txt: S.f.b6_soliel ?
`The lines in the morning, the rain gone, steam rising off the tents. The sick are sitting up in the surgeons' tents. Some of them are asking for food.` :
`The fever has broken.

Not for everyone. For many. Along the Seventh's rows soldiers who could not lift their heads yesterday are sitting up in their blankets, wet through, weak, clear-eyed, asking what happened. Outside the surgeons' tents the line of the sitting sick is half what it was, and the surgeon with the red forearms is standing in the middle of it with her hands hanging at her sides and her mouth open.

It started in the night, the camp says, in the field hospital: the Host's chief cutter had it, Noto Boil, and in the night it broke, and it went out from him. The ones who had carried it are carrying something else now. A touch of the hand, the camp says, and it breaks.${sick.length ? `\n\n${b64And(sick.map(id => id === 'sgt' ? 'You' : NAME(id)))} ${sick.length > 1 || sick[0] === 'sgt' ? 'were' : 'was'} shaking with it at dawn. A carrier came down the row, an orderly from the hospital with his sleeves rolled, and touched ${sick.length > 1 ? 'each of them' : sick[0] === 'sgt' ? 'you' : 'the one'} on the hand, the way you would touch somebody to wake them, and went on to the next tent. By the time the squad came in from the streets, it had gone.` : ''}${b64If('ohl', `\n\nOhl is on his knees in the mud by the fire. "Soliel," he says, and says it again. He has been asking her for twenty-two years.`)}`,
        ch:[{t:'Watch the carriers go down the rows.', go:'b6_c4_carrier'},
            {t:'To the fire.', go:'b6_c4_fire'},
            {t:'Walk the lines.', go:()=>startExplore()}]}; },
    b6_c4_carrier:()=>({sp:'The carriers', scene:'b6_gdanisban_rain', txt:
`They are not priests. That is the first thing. They are orderlies, cooks, a farrier, a woman from the baggage train, two soldiers from the next company who were sick a week ago: anyone who had it and lived. They go down the rows in no order, touching hands, and moving on, and they look as surprised as anyone.

One of them, a cook with a burned forearm, stops at the end of the Seventh's row and sits down suddenly in the mud and weeps, and nobody in the Seventh thinks less of him for it, and after a while he gets up and goes on.${b64Say({ressa:`\n\nRessa watches them with her blue hands folded. "No one came to my street," she says. "When we had it." She watches the cook get up. "They're coming now. That's something." She turns away, toward the city, which she has not done since she left it.`, tuft:`\n\nTuft watches with her hood down. "It's a goddess," she says, very low. "Through them. I can feel her going past, like a warm room." She shivers. "Something else died last night. I felt that too."`, _:''})}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c4_captain_morn:()=>({sp:'The captain', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_capMorn = 1; if (!S.f.b6_c4_cloakGot) { S.f.b6_c4_cloakGot = 1; gain('b6_c4_raincloak'); } }, again:()=>`The captain, his helmet off at last.`, txt:
`The captain has taken his helmet off for the first time in four days. His hair is flat to his skull and there is a red line round his forehead where the rim was. He looks ten years younger and very tired.

"The picket held," he says. "The edge held. Eleven of the Seventh's sick are up this morning." He seems unable to say the number without checking it. "Eleven."${S.f.b6_c4_cartsDone ? '' : ` He nods at a bundle by the standard. "The surgeons' quartermaster sent cloaks to the companies that held the edge last night. Dry. Take one."`} He looks at the field hospital, where the flap is still shut. "Stay near, Sergeant. All of you. Something's coming today. I can feel it in the camp."`,
      ch:[{t:'"Captain."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_bell:()=>({sp:'The field hospital · the bell', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_bell = 1; }, again:()=>`The bell has stopped. The camp is gathering.`, txt:
`At mid-morning a bell rings at the field hospital: one bell, struck slowly, again and again, and every soldier in the Host who hears it stops what they are doing.

It rings and rings. The word comes down the lines faster than a runner could bring it. The High Fist is dead. Dujek Onearm, of the fever, two bells before the man they call Kindly came back to the camp.${b64Say({ohl:`\n\nOhl takes his list out of its oilcloth, and a stub of pencil, and does not write anything. He holds the pencil over the list for a while. "He isn't mine," he says at last. "He was never mine to lose." He puts the list away. "I'll write him anyway. Tonight."`, brisk:`\n\nBrisk lifts two fingers to her brow, and holds them there.`, _:''})}${b64If('brisk', () => b6In('ohl') ? `\n\nBrisk lifts two fingers to her brow, and holds them there.` : '')}${b64If('brannoc', `\n\nBrannoc takes his helmet off, and stands in the mud with it under his arm, and for once in his life is quiet.`)}

Then the companies start to form up. All of them. Toward the big tent in the middle of the camp, where the High Fist's standard is.`,
      ch:[{t:'On.', onward:true, go:'b6_c4_key'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the key: stand for the High Fist the army chooses, from the back of the ranks; or stay out of it, on picket */
    b6_c4_key:()=>({sp:'The Seventh Company\'s lines', scene:'b6_gdanisban_rain', again:()=>`The companies forming up, and the picket at the gap.`, txt: b64Key() ?
`It is decided. ${b64Key() === 'vote' ? 'The Fourth stands with the Seventh in the ranks.' : 'The Fourth has the picket.'}` :
`The captain comes down the lines putting his helmet back on. "Every company," he says. "To the High Fist's tent. The Host will choose." He looks at you. "It's the Host's way, Sergeant, whatever the Empress thinks of it. The officers have read his logs. They'll put a name to the companies, and the companies will answer." He pauses. "The picket still wants keeping while the Host stands in a field shouting. It can be the Fourth, if you want it. Or the Fourth can stand with the Seventh."

He does not say whose name the officers will put. He does not need to. All morning the camp has been saying it: Kindly.${b64If('ohl', `\n\nOhl is already buttoning his robe. "I stood with the Second when he took it," he says. "I'll stand when they give it on."`)}${b64If('brannoc', `\n\nBrannoc rubs his jaw. "He knocked my captain down," he says. "In the mud." He considers it. "Mind, she'd have knocked him down first, given the chance."`)}${b64If('tuft', `\n\nTuft is looking at the picket, not the tent. "I'd rather not be looked at today," she says. "By anyone. By whatever's looking."`)}${b64If('ressa', `\n\nRessa looks from the tent to the gap and back. "I don't vote," she says. "I'm not yours. I'll stand where you stand."`)}`,
      ch:[{t:'"The Fourth stands with the Seventh. At the back, where we belong."', req:()=>!b64Key(), fx:()=>{ S.f.b6_c4_key = 'vote'; b64L('ohl', 1); b64L('brisk', 1); b64L('brannoc', -1); }, go:'b6_c4_vote'},
          {t:'"The Fourth has the picket. The city wants watching."', req:()=>!b64Key(), fx:()=>{ S.f.b6_c4_key = 'out'; b64L('tuft', 1); b64L('brannoc', 1); b64L('ohl', -1); }, go:'b6_c4_out'},
          {t:'"Not yet."', req:()=>!b64Key(), go:()=>startExplore()},
          {t:'Not now.', req:()=>!!b64Key(), go:()=>startExplore()}]}),
    b6_c4_vote:()=>({sp:'Before the High Fist\'s tent', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_word = 1; }, again:()=>`The ranks breaking up in the mud.`, txt:
`The Host stands in the mud before the High Fist's tent, company by company, as far as you can see in every direction, and the Fourth stands at the back of the Seventh, at the back of everything, where you can see the tent and nothing of who is in front of it.

An officer reads, and reads. You catch one word in five over the heads: *logs*, and *the High Fist wrote*, and *in his own hand*. Then a name, and a question, put to the companies one at a time.

When the Seventh's turn comes the captain answers for it, and the Seventh roars behind him, and the Fourth with it: Kindly. It is the same name every company gives. Not one company in the Host gives another. When it is over the sound goes on rolling round the camp and off the city's walls until it is hardly a sound at all.${b64If('ohl', `\n\nOhl did not shout. He stood with his hand on his heart, Seven Cities fashion, and his lips moved, and you think it was the old High Fist's name and not the new one's.`)}${b64If('brannoc', `\n\nBrannoc shouted, in the end, because everyone was. "Sweetcreek's going to have my beard for that," he says afterward, pleased.`)}`,
      ch:[{t:'On.', onward:true, go:'b6_c4_word'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_out:()=>({sp:'The picket', scene:'b6_gdanisban_rain', again:()=>`The picket at the gap, facing the city.`, txt:
`The Fourth takes the picket at the gap, facing the city, with the whole Host at its back walking away toward the tent.

The open ground is mud and broken bowls. G'danisban's gate, which has been shut for four days, is open a crack, and people are coming out of it: not a crowd, not lamps, just people, a few at a time, carrying their sick, walking toward the camp. Word of the carriers has got into the city.

The first of them reach the gap and stop, because there is a picket in it, and look at you.`,
      ch:[{t:'Let them through to the carriers, a few at a time, and keep the gap.', req:()=>!S.f.b6_c4_outTried, check:['guile', 14], fx:()=>{ S.f.b6_c4_outTried = 1; },
            edges:id=>[id === 'ressa' && ['she speaks the city\'s Ehrlii and knows some of them by name', 3], id === 'ohl' && ['he speaks to them in their own tongue, as a healer', 2], id === 'sgt' && ['a sergeant can make a gap orderly', 1], id === 'brisk' && ['she sounds like an arrest', -1]],
            near:{t:()=>{ const w = b64Who(); return `Yes, but a woman with a child pushes past ${b64Nm(w)} and will not be stopped, and ${b64Nm(w)} ${b64V(w, 'give', 'gives')} her the squad's last salve for the child's cut feet to make her sit and wait her turn.`; }, fx:()=>{ if ((S.inv.salve || 0) > 0) S.inv.salve -= 1; }},
            go:'b6_c4_out_ok', fail:'b6_c4_out_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_out_ok:()=>({sp:'The picket', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_word = 1; S.f.b6_c4_letThrough = 1; }, txt:
`The gap becomes a gate. Five at a time, with ${b6In('ressa') ? 'Ressa' : b6In('ohl') ? 'Ohl' : 'one of the squad'} talking to each group in their own tongue, and a soldier walking them up the lines to the surgeons' tents, where the carriers are.

You are halfway through the morning's people when the roar comes from behind you: the whole Host, from the High Fist's tent, one name, over and over, rolling across the camp and off the city's walls. The people at the gap stop and look past you toward it, frightened.

"Your new general," one of them says, in careful Malazan.

"Yes," you say. You did not see it. The Fourth will hear about it later from the Seventh, at length.${b64If('tuft', `\n\nTuft lets out a breath. "Good," she says, to nobody. "Good. He didn't see us."`)}`,
      ch:[{t:'On.', onward:true, go:'b6_c4_word'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_out_no:()=>({sp:'The picket', scene:'b6_gdanisban_rain', fx:()=>{ S.f.b6_c4_word = 1; S.f.b6_c4_letThrough = 0; }, txt:
`It does not work. There are too many, and they are too frightened, and the squad is too few, and in the end the picket does what pickets do: spears down across the gap, and *wait*, in three languages, until the officers come back.

While they wait the roar comes from behind you, from the High Fist's tent: the whole Host, one name, over and over. The people at the gap flinch from it. You hold the gap. The Fourth will hear about the vote later from the Seventh, at length.`,
      ch:[{t:'On.', onward:true, go:'b6_c4_word'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_word:()=>({sp:'Before G\'danisban', scene:'b6_gdanisban_rain', again:()=>`The camp, after the vote.`, txt:
`Captain Kindly is High Fist of Onearm's Host. That is how the word goes down the lines: the officers put his name, on the strength of the old High Fist's logs, and the Host gave it back to them, every company, without one voice against.

Later the whole army waits outside his tent in the mud again, because the camp has heard he is putting on the old High Fist's armour, and wants to see. When he comes out it fits him, the camp says afterward, all but the one arm: the armourers have put a new sleeve on it where there was never a sleeve before.${b64Key() === 'out' ? ' The Fourth sees it from the picket, across half the camp: a figure in grey armour in front of a tent, very small, and a great many people very quiet.' : ' The Fourth sees it from the back of the crowd: a figure in grey armour in front of a tent, very small, and a great many people very quiet.'} Nobody in the Fourth gets a look at his face.`,
      ch:[{t:'On.', onward:true, go:'b6_c4_tomb'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c4_tomb:()=>({sp:'Before G\'danisban', scene:'b6_gdanisban_rain', txt:
`They are building the old High Fist a tomb outside G'danisban. A painter has been inside it since it was raised, the camp says, a little man with paint to the elbows who goes in at first light and comes out at dark and talks to nobody about what he is putting on the walls.

The Fourth sees the tomb from the lines, and the painter's lamp in its door at dusk, and does not go nearer. It is not the squad's tomb to stand in.${b64If('ohl', `\n\nOhl writes a name on his list that night, by the fire, and shows it to nobody, and puts the list away.`)}

The Host will march soon, the captain says. North-east. He does not know why yet. ${b6In('brannoc') ? 'Brannoc says the new High Fist has the look of a man with somewhere to be.' : 'The Seventh says the new High Fist has the look of a man with somewhere to be.'}`,
      ch:[{t:'On, with the Host.', onward:true, go:()=>chapterEnd(4, b64Key() || 'vote')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
