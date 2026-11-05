/* ============ Book Six, Chapter 1: The Lato Odhan ============ */
/* The Third of Blistig's 9th, with the Fourteenth (The Bonehunters ch 3-6; bh-canon §2). Weeks after Raraku the Fourteenth is chasing
   Leoman across the Lato Odhan. Night one in the 9th's camp in a dry wash (the captain, the quartermaster's cart, an old soldier of the
   9th by a cairn, the Deck). Day two on the road: the well the scouts marked, where bandits came first and threw a dead goat in after
   they drank (b6_c1_well, which passes the fever on: "the well water"), then the rebel rearguard in a dry wash across the road
   (b6_c1_rearguard, stage 2 the rise), and a wounded rebel with the news: Leoman has taken Y'Ghatan, killed the Falah'd at the gate and
   sent the people to Lothal. Then the camp before the city: walls the colour of old bone, the 9th digging in, the reinforcements walking
   in under Captain Faradan Sort (seen, never spoken with), the surgeons' tents, and at the camp's west edge the handful of townsfolk who
   would not go to Lothal. Leoman's knives come out of a postern for them at night (b6_c1_edge), and Mehet, a potter's son with a sling
   and a ring of keys, asks to walk with the squad (b6Join('mehet')) and draws the city in the dirt (the trick, the Potter's Map). Night
   on the barrow road under the walls: the Empire's old dead dug out by the rebels (W6). The key, S.f.b6_c1_key: 'bury' (a night's
   work putting them back, and a rebel patrol out of the walls, b6_c1_patrol) or 'leave' (the squad rests behind the picket lantern).
   Dawn, and the siege lines. Notes for later chapters: docs/bh-ch1-notes.md. */
/* FOR THE ARTIST (101b): names this file uses.
   Items: ART['item/b6_c1_odhanveil'], ['item/b6_c1_wellrope'], ['item/b6_c1_rebeltulwar'] (this file registers a borrowed placeholder
   for each with ??=, so a plain ART['item/...'] = ... in 101b replaces it).
   Figures: mehet (the recruit), b6_rebel / b6_fanatic (100's foes; their kind is borrowed until 101b draws them). Reused: b4_c1_hollet
   (the captain), b2soldier (the old soldier, the surgeon, the diggers, the reinforcements), b4_c1_recruit (the runner), hissari_m (the
   townsfolk), b4_c7_fleer, b4_c7_fleerbow, b4_c5_rider (this chapter's own foes).
   Backdrops: b6_odhan_night and b6_ghatan_walls (100's, yours to redraw). This file adds three scenes that borrow until you redraw them:
   b6_c1_road (the Odhan by day, borrows b4_march), b6_c1_well (a stone well-head in the scrub, borrows b4_c5_seep), b6_c1_barrownight
   (the barrow road under the walls at night, opened mounds, a picket lantern; borrows b4_c4_fog).
   Ground (TILEX, all existing): b4_c2_way (the night camp: '.' road, ',' verge, 'n' tent, 'c' cart, 'k' cairn, 'T' tree, 'F' fire),
   odhan (the road by day: 'o' the well), b4_c4_camp (the camp before the city: '=' tent, 'W' wagon, 'h' horse lines, 'f' cook fire),
   b4_c4_hills (the barrow road: 'B' barrow, 'L' the picket's lantern). Battle 't' is low cover. */

/* ---- small helpers (b61: Book Six, Chapter One) ---- */
/* loyalty only for a squadmate who is here */
const b61L = (id, n) => { if (b6In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b61Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b6In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* a line for a squadmate only if they are here */
const b61If = (id, s) => b6In(id) ? (typeof s === 'function' ? s() : s) : '';
/* who rolled the last check, and their name in a sentence */
const b61Who = () => (ROLL() && ROLL().who) || 'sgt';
const b61Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b61Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b61Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b61V = (id, you, they) => id === 'sgt' ? you : they;
const b61And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b61Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the first night on the Odhan, 2 the road by day (the well, the rearguard), 3 the camp before Y'Ghatan, 4 the barrow road */
const b61Ph = () => S.f.b6_c1_ph || 1;
const b61Key = () => S.f.b6_c1_key || null;
/* whoever speaks the desert tongues best, for the prisoner and the townsfolk */
const b61Tongue = () => ['haddat', 'mehet', 'redblade', 'darrut', 'orvas', 'hessa'].find(id => b6In(id)) || null;
/* the squad, by name, everyone but the sergeant */
const b61Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b6In(id));

/* ---- the Potter's Map: The Line (line, t_line), in Book Six's words. Mehet knows Y'Ghatan's old wells, drains and well-heads, and
   which ground is old cut stone. Not sorcery. Once a fight: the bearer and every squadmate beside them take +3 + level step armour and
   cannot be flanked until the bearer's next turn. ---- */
Object.assign(TRICKS, {
  b6_c1_map:{name:'The Potter\'s Map', ch:1, use:'fight', ab:'t_b6_c1_map', where:'the camp\'s edge before Y\'Ghatan, with Mehet and a potter\'s knife in the dirt',
    lore:'Mehet draws Y\'Ghatan in the dirt with the point of a potter\'s knife: every old well, every drain-head, every kerb of cut stone the city has built over and forgotten. Old stone does not shift under the feet. Put your back to a well-head and nothing comes round behind you, because there is nothing behind you but a hole.',
    get fx(){ return `Once a fight: the bearer calls the stone, and the bearer and every squadmate beside them set their backs to it. They take +${3 + lvT()} armour and cannot be flanked until the bearer's next turn. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b6_c1_map:{name:TRICKS.b6_c1_map.name, trick:'b6_c1_map', self:true, desc:()=>TRICKS.b6_c1_map.fx,
    run(u){ B.line = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => lineCovers(p)); in_.forEach(p => { float(p, 'old stone', '#d8c49a'); sparks(p.x, p.y, 8, '#d8c49a', .4); });
      blog(`${u.name}: "Stone!" ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} set${in_.length > 2 ? '' : 's'} a back to the same old kerb. Nothing comes round behind it.` : 'One back to the stone. It will have to do.'}`); }},
});

/* ---- the Odhan veil: +1 armour against shots on top of its own (a soldier's veil of the desert weave; Claude's call on the number) ---- */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o);
    if (b6On() && t && t.side === 'p' && !t.ally && a && a.side === 'e' && (a.rng || 1) > 1 && cheb(o.from || a, t) > 1 && Object.values((S.gear && S.gear[t.id]) || {}).includes('b6_c1_odhanveil')) c.ac += 1;
    return c; }; }

/* ---- borrowed pictures until the artist's file (101b) replaces them: three scenes and the three items ---- */
{ const like = {b6_c1_road:'b4_march', b6_c1_well:'b4_c5_seep', b6_c1_barrownight:'b4_c4_fog'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || SCENEX.b6_ghatan_walls || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof ART !== 'undefined') [['b6_c1_odhanveil', 'b2_wickanhide'], ['b6_c1_wellrope', 'b2_wellrope'], ['b6_c1_rebeltulwar', 'b2_auxtulwar']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Six's glossary ---- */
GLOSSX.bh.push(
  [1, 'The Lato Odhan', 'Scrub, hardpan and old stone between the Holy Desert and the coast. Flat enough to see a day\'s march off, and nothing in it worth the look.', ()=>(S && (S.chapter || 0) >= 1)],
  [1, 'Lothal', 'A city of the Odhans. Leoman sent the people of Y\'Ghatan there with their goods before the siege, and most of them went.', ()=>!!(S && S.f && S.f.b6_c1_news)],
  [1, 'The barrows of Y\'Ghatan', 'The mounds along the road under the walls, where the Empire buried its dead the last time it took the city. The rebels dug into them before the Fourteenth came up.', ()=>!!(S && S.f && S.f.b6_c1_ph >= 4)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.bh = ROSTER_FIRES.bh || {}; ROSTER_FIRES.bh[1] = ['b6_c1_fire'];

const B6CH1 = {
  title:'The Lato Odhan', number:'One',
  intro:{loc:'The Lato Odhan', sub:'The Fourteenth on the march · night', scene:'b6_odhan_night', cap:'Cook-fires in a line across the scrub, the picket horses stamping, and somewhere ahead of them an old city.',
    paras:[
`Weeks after Raraku, the Fourteenth is still chasing the last of the rebellion across the Lato Odhan. Leoman of the Flails got out of the Holy Desert with an army behind him, and the Adjunct has decided he will not keep it. The country is scrub and hardpan and old stone, flat enough to see a day's march off in any direction, and nothing in any of them worth seeing.`,
()=>{ const v = b61Mates().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Third squad, 9th Legion. ${v.length ? `${b61And(v)} ${v.length > 1 ? 'are' : 'is'} the Third this season, and ${v.length > 1 ? 'they have' : 'that has'} walked a long way behind you already.` : 'The Third, this season, is you.'} The 9th marches at the back of the column, where Fist Blistig likes it, and eats everybody's dust.`; },
`Tonight the column has stopped in a dry wash with a little shade in it. The 9th has the far end. The word going down the cook-lines is a name: Y'Ghatan.`],
    go:'Into the camp', node:'b6_c1_start'},

  areas:[
    /* 16 x 12 (b4_c2_way, night). , verge (scrub)  . the track down the wash  n a tent  c the quartermaster's cart  k a cairn  T a thorn tree
       F the Third's fire  > east, along the track: the march at first light */
    { id:'b6_c1_odhan', title:'The Lato Odhan · the 9th\'s camp', sub:'Night · a dry wash', hint:'Tap ground to move · tap a figure to talk · the fire is by the track, the cart to the west', decor:'b4_c2_way', dark:true,
      map:[ "#,,,,,,,,,,,,,,#",
            "#,n,,,,,,,,,n,,#",
            "#,,,,,,,,,,,,,,#",
            "#,,,c,,,,,,,,,,#",
            "#,,,,,,F,,,,,,,#",
            "#..............>",
            "#,,,,,,,,,,,,,,#",
            "#,,n,,,,,,,,n,,#",
            "#,,,,,,,,,T,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#,,,k,,,,,,,,,,#",
            "################" ],
      walk:'.,', triggers:{F:'b6_c1_fire', c:'b6_c1_qm', k:'b6_c1_oldsoldier', '>':'b6_c1_east'}, start:{x:7, y:6},
      quest:()=> !S.f.b6_c1_orders1 ? 'The captain, by the tents.' : 'The fire, and then sleep. The column moves at first light.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b4_c1_hollet', x:11, y:3, node:()=>'b6_c1_captain', fresh:()=>!S.f.b6_c1_orders1},
        {id:'oldsoldier', name:'An old soldier of the 9th', kind:'b2soldier', x:5, y:10, node:()=>'b6_c1_oldsoldier', fresh:()=>!S.f.b6_c1_oldTried} ] },

    /* 16 x 12 (odhan, day). , scrub  . the track  # rock  o the well  b a thorn bush  < west, back toward the column  > east, the road ahead */
    { id:'b6_c1_road', title:'The Lato Odhan · the road', sub:'Day · ahead of the column', hint:'Tap ground to move · the well is to the north-west, the road goes on east', decor:'odhan',
      map:[ "################",
            "#,,,,,#,,,,,,,,#",
            "#,,o,,,,,,,#,,,#",
            "#,,,,,,,,,,,,,,#",
            "<..............>",
            "#,,,,,,,,,,,,,,#",
            "#,,#,,,,,,,,,,,#",
            "#,,,,,,,,#,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#,,,,,,b,,,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "################" ],
      walk:'.,', triggers:{o:'b6_c1_well_arrive', '<':'b6_c1_road_back', '>':'b6_c1_to_wash'}, start:{x:2, y:4},
      quest:()=> !S.f.b6_c1_wellDone ? 'The well the scouts marked, to the north-west. Hold it for the water wagons.' : !S.f.b6_c1_rearDone ? 'East along the road. The scouts say there is something in the wash ahead.' : 'East, and the city.',
      npcs:[
        {id:'prisoner', name:'A wounded rebel', kind:'b4_c7_fleer', x:13, y:5, node:()=>'b6_c1_prisoner', show:()=>!!S.f.b6_c1_rearDone && !S.f.b6_c1_prisoner, fresh:()=>true} ] },

    /* 16 x 12 (b4_c4_camp, dusk). . earth  , trampled grass  = a tent  W a wagon  h horse lines  f the Third's cook fire
       < west, the camp's edge and the townsfolk  > east, the barrow road under the walls */
    { id:'b6_c1_camp', title:'Before Y\'Ghatan · the 9th\'s lines', sub:'Dusk · the siege camp', hint:'Tap ground to move · tap a figure to talk · the camp\'s edge is west, the barrow road east', decor:'b4_c4_camp',
      map:[ "################",
            "#==.==.==.==.==#",
            "#..............#",
            "#.W.....f....W.#",
            "<..............#",
            "#,,,,,,,,,,,,,,#",
            "#..............>",
            "#.==..hhhh..==.#",
            "#..............#",
            "#,,,,,,,,,,,,,,#",
            "#..W.......W...#",
            "################" ],
      walk:'.,', triggers:{f:'b6_c1_fire', '<':'b6_c1_edge', '>':'b6_c1_to_barrows'}, start:{x:7, y:5},
      quest:()=> !S.f.b6_c1_orders3 ? 'The captain, in the 9th\'s lines.' : !S.f.b6_c1_edgeDone ? 'The camp\'s west edge, where the townsfolk who stayed are camped.' : 'The barrow road, east, under the walls. The captain\'s picket.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b4_c1_hollet', x:8, y:5, node:()=>'b6_c1_captain_camp', fresh:()=>!S.f.b6_c1_orders3},
        {id:'diggers', name:'The 9th\'s diggers', kind:'b2soldier', x:4, y:8, node:()=>'b6_c1_dig', fresh:()=>!S.f.b6_c1_digTried},
        {id:'column', name:'A column coming in', kind:'b2soldier', x:13, y:2, node:()=>'b6_c1_column', fresh:()=>!S.f.b6_c1_sortSeen},
        {id:'surgeon', name:'The 9th\'s surgeon', kind:'b2soldier', x:2, y:8, node:()=>'b6_c1_surgeon', fresh:()=>b6FeverList().length > 0},
        {id:'runner', name:'A runner from the Fists\' tents', kind:'b4_c1_recruit', x:11, y:8, node:()=>'b6_c1_runner', fresh:()=>!S.f.b6_c1_rumour} ] },

    /* 16 x 12 (b4_c4_hills, night). , scrub  . grass  B a barrow  # rock  L the picket's lantern  < west, back toward the camp */
    { id:'b6_c1_barrows', title:'Y\'Ghatan · the barrow road', sub:'Night · under the walls', hint:'Tap ground to move · the opened barrows are all along the road · the lantern is the picket', decor:'b4_c4_hills', dark:true,
      map:[ "################",
            "#,,BB,,,,,BBB,,#",
            "#,,,,,,BB,,,,,,#",
            "#,BB,,,,,,,,BB,#",
            "#,,,,,L,,,,,,,,#",
            "<..............#",
            "#,,BBB,,,,BB,,,#",
            "#,,,,,,,,,,,,,,#",
            "#,BB,,,,BBB,,,,#",
            "#,,,,,,,,,,,BB,#",
            "#,,,,#,,,,,,,,,#",
            "################" ],
      walk:'.,', triggers:{B:'b6_c1_barrow', L:'b6_c1_lantern', '<':'b6_c1_barrows_back'}, start:{x:2, y:5},
      quest:()=> !b61Key() ? 'The opened barrows along the road. The picket\'s lantern is by the road.' : b61Key() === 'bury' && !S.f.b6_c1_patrolDone ? 'Someone is coming down from the walls.' : 'Back by the lantern. Dawn is not far off.',
      npcs:[
        {id:'patrol', name:'Shapes coming down from the walls', kind:'b4_c7_fleer', x:12, y:4, node:()=>'b6_c1_patrol_start', show:()=>b61Key() === 'bury' && !S.f.b6_c1_patrolDone, fresh:()=>true},
        {id:'dawn', name:'The picket\'s lantern, going pale', kind:'b2soldier', x:6, y:5, node:()=>'b6_c1_dawn', show:()=>!!b61Key() && (b61Key() === 'leave' || !!S.f.b6_c1_patrolDone), fresh:()=>true} ] } ],

  battles:{
    /* the well the scouts marked: bandits came first, and threw a dead goat in after they drank. The fight passes the fever on (100). */
    b6_c1_well:{title:'The well on the Odhan', style:'b4_c4_hills', open:true, warrenText:'Noon on the Odhan · the warrens are thin and hot here', warren:{meanas:1, denul:1}, music:'battle',
      feverRisk:'the well water',
      map:["#..t...#","........","..t..t..","........","...tt...","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_bandit',2,1],['b6_bandit',5,1],['b6_bandit',4,3],['b6_c1_wellbow',6,0]], xp:160, after:'b6_c1_well_after',
      preText:()=>`They come off the well-head with knives out, all at once, like men who would rather not be asked why the water stinks.`},
    /* the rebel rearguard in a dry wash across the road, there to slow the column a day */
    b6_c1_rearguard:{title:'The wash across the road', style:'b4_c4_hills', open:true, warrenText:'Afternoon on the Odhan · dust in the air, and in the warrens', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.t..t.#","........",".t....t.","........","..t..t..","........","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_rebel',2,2],['b6_rebel',5,2],['b6_rebel',4,4],['b6_rebelbow',1,0],['b6_rebelbow',6,0]], xp:220, after:'b6_c1_rear_after',
      preText:()=>`The rebels in the wash stand up out of the stones all together, as if somebody had pulled a cord, and the bowmen on the far bank stand up with them.`,
      stage2:{title:'The rise', xp:110,
        text:()=>`The ones in the wash break and go back up the far bank to a rise of broken rock where their captain has been watching. He has not run. He has a tulwar across his knees and three men round him, and the look of somebody who was told to hold a road for a day and has decided to hold it for the afternoon at least.${b61If('tangle', `\n\nTangle looks at the rise and at the satchel and back. "Uphill," he says. "Always uphill."`)}`,
        map:["##.t..##","#......#","..t..t..","........","........","...t....","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b6_rebelchief',3,1],['b6_rebel',1,2],['b6_rebel',6,2],['b6_fanatic',4,3]]} },
    /* the camp's edge at night: Leoman's knives out of a postern, for the townsfolk who would not go to Lothal */
    b6_c1_edge:{title:'The camp\'s edge', style:'b4_c4_camp', dark:true, open:true, warrenText:'Night under Y\'Ghatan · the warrens are close and uneasy', warren:{meanas:1, denul:1}, music:'battle',
      map:["#..t...#","........","..#..t..","........",".t....t.","........","...##...","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_c1_knife',2,1],['b6_c1_knife',5,1],['b6_rebel',4,3],['b6_fanatic',2,4]], xp:150, after:'b6_c1_edge_after',
      preText:()=>`The lamps by the townsfolk's blankets go over, and in the dark that comes after there are more people than there were.`},
    /* 'bury': a rebel patrol out of the walls, come to see who is putting the Empire's dead back */
    b6_c1_patrol:{title:'The barrow road', style:'b4_c4_hills', dark:true, open:true, warrenText:'Night on the barrow road · something in the warrens is listening', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.t...t#","........","..t..t..","........","........",".t....t.","........","...tt...","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_c1_patrolchief',3,1],['b6_rebel',1,2],['b6_rebel',6,2],['b6_rebelbow',4,0]], xp:180, after:'b6_c1_patrol_after',
      preText:()=>`They come down off the walls by a rope at the angle of a tower, and they come quietly, until they see what the squad has been doing. Then they come fast.`} },

  foes:{
    /* a bandit at the well with a short bow */
    b6_c1_wellbow:{name:'Bandit with a short bow', sig:'b', kind:'b4_c7_fleerbow', hp:22, ac:13, atk:9, dmg:[1,6,3], rng:5, mv:4, init:2, verb:'shoots at'},
    /* Leoman's knives out of the postern, for informers: quick, light, gone again */
    b6_c1_knife:{name:'A knife from the postern', sig:'k', kind:'b4_c7_fleer', hp:22, ac:13, atk:10, dmg:[1,6,3], rng:1, mv:5, init:3, sk:['hitrun'], verb:'drives a long knife at'},
    /* the patrol's leader on the barrow road */
    b6_c1_patrolchief:{name:'The patrol\'s leader', sig:'P', kind:'b4_c5_rider', hp:44, ac:15, atk:11, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cuts at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b6_c1_odhanveil:{name:'An Odhan veil', slot:'armour', role:'light', who:null, ac:1,
      line:'A long veil of the Odhan\'s double weave, the colour of the scrub, wound over the head and shoulders and across the face. The bandit at the well wore it for the dust. It turns the sun, and a little of an arrow, which is more than most cloth will do.', special:'+1 more armour against shots from beyond arm\'s reach.'},
    b6_c1_wellrope:{name:'The well\'s rope', slot:'trinket', role:'any', who:null, stat:{might:1},
      line:'A coil of the well\'s own rope, plaited hide, dark and stiff with years of water and sun, with a knot at one end that somebody tied a long time ago and nobody since has been able to undo. Whoever carries it hauls a little harder.'},
    b6_c1_rebeltulwar:{name:'A rebel captain\'s tulwar', slot:'weapon', role:'heavyweapon', who:null, atk:1, dmg:[1,10,3],
      line:'A heavy curved tulwar, broad at the end of the blade where the weight is, with a grip wound in red cord and a ring of brass at the pommel. The captain on the rise held a road with it all afternoon. It was not his fault the road did not hold.'} },

  scenes:{
    b6_c1_road:{loc:'The Lato Odhan', sub:'The road · ahead of the column', cap:'Hardpan and scrub to the edge of the sky, the track running east through it, and the column\'s dust a long way behind.', amb:'explore'},
    b6_c1_well:{loc:'The Lato Odhan', sub:'A well the scouts marked', cap:'A ring of old stone in the scrub, a frame of poles over it, and a bucket on a rope.', amb:'explore'},
    b6_c1_barrownight:{loc:'Y\'Ghatan', sub:'The barrow road · night', cap:'Old mounds along the road under the walls, dug open, a picket\'s lantern among them, and the city dark above.', amb:'explore'} },

  end:{
    bury:['The barrows', 'The Fourteenth came up across the Lato Odhan to Y\'Ghatan, where Leoman had made himself Falah\'d and sent the city away. On the barrow road under the walls the rebels had dug into the Empire\'s old dead. The Third spent the night before the siege putting them back, and fought a patrol out of the walls for it. The mounds are closed again. The city will not thank them, and the army did not ask them to.'],
    leave:['The picket', 'The Fourteenth came up across the Lato Odhan to Y\'Ghatan, where Leoman had made himself Falah\'d and sent the city away. On the barrow road under the walls the rebels had dug into the Empire\'s old dead. The Third held its picket by the lantern and rested, as the captain had said to, and the barrows stayed open to the sky. The squad goes into the siege with its sleep. It goes in knowing what it walked past.'] },
  endScene:'b6_ghatan_walls',
  endCap:()=> b61Key() === 'bury' ? 'Y\'Ghatan at first light, the walls the colour of bone, and along the road under them a line of mounds with fresh earth on them.' : 'Y\'Ghatan at first light, the walls the colour of bone, and along the road under them a line of mounds still open to the sky.',
  tease:'Next: the north coast. Onearm\'s Host, the rain, and something walking the roads ahead of it.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b6_c1_key === 'bury') x.push(`The Third put the Empire's old dead back in their barrows on the night before the siege.${f.b6_c1_patrolDone ? ' A patrol came down off the walls to stop it, and did not.' : ''}`);
    if (f.b6_c1_key === 'leave') x.push('The Third held its picket on the barrow road and rested. The barrows stayed open.');
    if (f.b6_mehetDone === 1) x.push(b6In('mehet') ? 'Mehet, a potter\'s son of Y\'Ghatan who would not go to Lothal, walks with the Third, with his sling and his ring of keys.' : 'Mehet, a potter\'s son of Y\'Ghatan, walks with the Third.');
    if (f.b6_mehetDone === 2) x.push('Mehet, a potter\'s son of Y\'Ghatan, waits with the townsfolk at the camp\'s edge, if the squad will have him.');
    if (f.b6_mehetDone === 0) x.push('Mehet, a potter\'s son of Y\'Ghatan, went his own way.');
    if (f.b6_c1_mapOk) x.push('Mehet drew Y\'Ghatan in the dirt for the squad: its old wells, its drains, its old stone.');
    if (f.b6_c1_wellClean) x.push('The squad hauled a dead goat out of a well on the Odhan, and the 9th\'s water wagons filled behind it.');
    if (f.b6_c1_prisoner === 'kept') x.push('A wounded rebel from the wash went to the captain\'s wagon with water in him.');
    if (f.b6_c1_prisoner === 'left') x.push('A wounded rebel from the wash was left by the road with a water skin.');
    if (f.b6_c1_dug) x.push('The 9th\'s diggers owe the Third a stretch of trench.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b6_c1_key && (f.b6_c1_key === 'bury' ? 'On the barrow road the squad put the old dead back, the night before the siege.' : 'On the barrow road the squad held its picket and rested. The barrows are still open.'),
    f.b6_c1_ph >= 4 && 'The rebels dug into the barrows of the Malazan dead along the road under Y\'Ghatan\'s walls before the Fourteenth came up.',
    f.b6_mehetDone != null && 'At the camp\'s edge, Leoman\'s knives came out of a postern at night for the townsfolk who would not go to Lothal. A potter\'s son named Mehet was one of them.',
    f.b6_c1_rumour && 'Camp talk: the Fists are not happy with the Adjunct, Fist Blistig least of all. Onearm\'s Host is on the north coast, and they say the High Fist\'s spirit is broken.',
    f.b6_c1_sortSeen && 'Reinforcements walked into the camp before Y\'Ghatan under a captain from the Stormwall, Faradan Sort, the soldiers say.',
    f.b6_c1_news && 'Leoman has taken Y\'Ghatan. He killed the Falah\'d at the gate, made himself Falah\'d, and sent the city\'s people to Lothal with their goods.',
    f.b6_c1_wellDone && 'Bandits held a well on the Odhan ahead of the column, and fouled it.',
    'The Fourteenth is chasing Leoman of the Flails across the Lato Odhan, weeks after Raraku.'].filter(Boolean); },

  dlg:{
    /* ---- the first night on the Odhan: the first halt ---- */
    b6_c1_start:()=>({sp:'The 9th\'s camp', scene:'b6_odhan_night', fx:()=>{ S.f.b6_c1_ph = S.f.b6_c1_ph || 1; }, txt:
`The wash is a long shallow trough of sand and stones with thorn scrub along its banks, and the 9th's tents go up along it in two crooked rows because there is no room for straight ones. The water wagons are a day behind. The quartermaster's cart is not, and he is already standing on it, counting.

To the east the track goes on into the dark. Somewhere along it, a long way off, is the rebel army, and in front of the rebel army, the scouts say, a city.

${b61Say({haddat:`Haddat grounds the blue shield at the edge of the firelight and looks east. "Y'Ghatan," she says, in the trade tongue first, and then in Malazan, as if one of the two might sound better. Neither does.`, marrow:`Marrow lowers herself onto a flat stone by the fire and sets her bag between her feet. "Another city, child," she says. "They do keep making them."`, _:`The squad drops its packs by the fire and looks east, where there is nothing to see.`})}${b61If('tangle', `\n\nTangle counts the satchel, and counts it again, and then touches the Kanese bead on his wrist, his goodnight to it.`)}${b61If('mirrel', `\n\nMirrel goes along the tent rows with her hospice bag, looking at feet. "Sit. Boot. Other boot. Good."`)}`,
      ch:[b6DeckChoice(1),
          {t:'The fire.', go:'b6_c1_fire'},
          {t:'The captain, by the tents.', go:'b6_c1_captain'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b6_c1_deck:()=>b6DeckOffer(1),
    b6_c1_card:()=>b6DeckCard(1),

    /* the fire: a rest, the squad, the fever, and the way on (the games pass wraps this node: keep the id) */
    b6_c1_fire:()=>{ const ph = b61Ph(), camp = ph >= 3;
      return {sp:'The Third\'s fire', scene:camp ? 'b6_ghatan_walls' : 'b6_odhan_night', html:feverHTML(),
        again:()=> camp ? `The Third's fire in the 9th's lines, with the walls of Y'Ghatan above it in the dusk.` : 'The Third\'s fire in the wash, burning thorn. It burns fast.', txt:
`${camp ? `The Third's cook fire in the 9th's lines is dried camel dung and a little thorn, and it smokes. Above it, a long bowshot off, the walls of Y'Ghatan go up out of the plain, pale as old bone in the last of the light, with the lamps coming out along the top of them one by one.${S.f.b6_mehetDone === 1 && b6In('mehet') ? `\n\nMehet sits on the far side of the fire with his back to the city, turning his ring of keys over in his fingers, one key at a time.` : ''}` : `The Third's fire is a ring of stones in the bed of the wash, burning thorn, which burns hot and fast and has to be fed all night. The sparks go straight up. There is no wind on the Odhan after dark, and no sound but the camp's.`}${b61Say({marrow:`\n\nMarrow has her knotted string out and is running it through her fingers, not tying anything.`, haddat:`\n\nHaddat sits with the blue shield across her knees, oiling the straps.`, _:''})}`,
        ch:[b6DeckChoice(1),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f['b6_c1_rest' + ph], fx:()=>{ S.f['b6_c1_rest' + ph] = 1; rest(camp ? 'The squad sits an hour by its own fire under the walls. Wounds close, mostly.' : 'The squad sits an hour by the thorn fire in the wash. Wounds close, mostly.'); }, go:'b6_c1_fire_rest'},
            {t:'Talk with the squad.', go:'b6_c1_fire_talk'},
            {t:'See to the fever.', req:()=>b6FeverList().length > 0, go:'b6_c1_fire_fever'},
            {t:'Turn in. The column moves at first light.', req:()=>ph === 1 && !!S.f.b6_c1_orders1, onward:true, go:'b6_c1_sleep1'},
            {t:'To the barrow road. The captain\'s picket.', req:()=>ph === 3 && !!S.f.b6_c1_orders3 && !!S.f.b6_c1_edgeDone, onward:true, go:'b6_c1_to_barrows_go'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c1_fire_rest:()=>({sp:'The Third\'s fire', scene:b61Ph() >= 3 ? 'b6_ghatan_walls' : 'b6_odhan_night', txt:
`An hour, then, ${b61Ph() >= 3 ? 'with the city\'s lamps along the wall above and the 9th\'s digging going on in the dark behind' : 'with the thorn crackling and the stars all the way down to the ground on every side'}.

${b61Say({marrow:`Marrow goes round the squad with her hands, as she always has, and stops at each of them long enough to frown. "Sand," she says. "In everything, child. In the warren too." She closes a cut on somebody's wrist anyway.`, mirrel:`Mirrel goes round the squad with her water skin, one mouthful each, and watches each one swallow. "Sit. Drink. Good."`, _:`Some of them sleep. The rest watch the fire.`})}${b61If('haddat', `\n\nHaddat lies down with her head on her pack and says names under her breath, low, one after another, the dead of Hissar and the Chain and the road since. She has said them every night since Hissar. She has not run out.`)}${b61If('tangle', `\n\nTangle sleeps with the satchel under his head and both wrists wound with fuse-cord, so that nobody can take either without waking him.`)}`,
      ch:[{t:'Back to the fire.', go:'b6_c1_fire'}]}),
    b6_c1_fire_talk:()=>{ const ph = b61Ph(), camp = ph >= 3, ln = [];
      if (b6In('haddat')) ln.push(camp ? `Haddat is looking at the walls. "My mother sold water in Y'Ghatan once," she says. "She said the city drank like a camel: all at once, and then not for a month." She turns back to the fire. "She said it was a hard city, and proud of it. I think she would not like what it is proud of tonight."` : `Haddat is cleaning sand out of the blue shield's grip with the point of a knife. "The Odhan has no water you can see," she says, "and plenty you cannot. The wells are old. Older than the tribes." She works the knife. "The bandits will have got to them first. They always do."`);
      if (b6In('sathi')) ln.push(camp ? `Sathi has her boots off and her feet to the fire and is grinning at the walls with all her filed teeth. "Big," she says. "I like them big. More of them to fall down."` : `Sathi is lying on her back with her hands behind her head, looking at the stars. "Weasels say the Odhan is where the sky comes to rest," she says. "I think it's where it comes to die." She laughs, which she does at funerals.`);
      if (b6In('tangle')) ln.push(camp ? `Tangle has been looking at the walls since the 9th came up. "Old," he says. "Older than the Empire. Patched." He counts the satchel by feel. "Patched walls go down if you know where the patches are." He counts it again. "I'm not saying I know."` : `Tangle has the satchel open on his knees and is counting by the firelight. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." He closes it, opens it, counts again. "Same," he says, relieved.`);
      if (b6In('marrow')) ln.push(camp ? `Marrow is tying a knot in her string, a slow careful one. "The warren is strange here, child," she says. "Like a room somebody has just left. Still warm." She draws the knot tight. "I don't like a city that has been emptied. It is waiting for something to fill it."` : `Marrow is rubbing a salve into her own knuckles, which she does not do for anyone else to see. "Weeks," she says, "since Raraku. The army thinks it won something there." She caps the salve. "It walked into a desert and walked out again. That is not the same, child."`);
      if (b6In('mirrel')) ln.push(camp ? `Mirrel is rolling her clean linen tighter than it needs to be. "Sieges are slow," she says. "Slow is good. Slow is fevers and feet and the flux, and I know those." She ties off the roll. "It's the fast part after I don't like."` : `Mirrel is counting the squad's salves into her bag in threes. "Three, six, and one." She frowns. "In Li Heng we'd have called this a well-stocked night."`);
      if (b6In('tallow')) ln.push(`Tallow has his grandmother's deck in its oilcloth in his lap and is not opening it. "She said never read on the road to a city," he says. "Or was it never read on a road? Or in a city?" He puts it away. "She said a lot of things."`);
      if (b6In('hessa')) ln.push(`Hessa sits very straight with the spear upright beside her. "In Kartool they say every city sits on the Worm's back," she says. "Old cities sit closer to her." She looks east. "This one will be very close."`);
      if (b6In('tebbet')) ln.push(`Tebbet is waxing his bowstring. "Walls," he says, when you sit. "I'd rather be on top of them." He goes back to the string. "Or a long way off."`);
      if (b6In('darrut')) ln.push(`Darrut has his helm on his knee and is looking into it. "I was on the wall at Aren," he says, "when the city shut its gates on Coltaine." He puts the helm on the ground, upside down. "I know what it's like on the other side of one of those."`);
      if (b6In('yorin')) ln.push(`Yorin is holding his copper wind-vane flat on his palm. The little arrow points at nothing in particular. "No wind," he says. "Serc doesn't like the Odhan. Too still." He puts it away. "Neither do I."`);
      if (b6In('rasp')) ln.push(`Rasp has the satchel on the far side of the fire from everyone and her hand on its flap. "Malaz City has walls older than that," she says. "Not by much." She checks a fuse. "I grew up under them. You stop looking up."`);
      if (b6In('orvas')) ln.push(`Orvas is mending a strap on his lance. "The Burned Tears ride the far side of the city," he says. "With the Wickans." He pulls the strap tight. "I am here. That is also true."`);
      if (b6In('redblade')) ln.push(`Ramin is scraping the dust out of the links of his scale with a thumbnail. "Leoman was a Falah'd's man once," he says. "Every Seven Cities boy knew his name." He keeps scraping. "I hope to meet him. I hope not to."`);
      if (b6In('warlock')) ln.push(`Keth sits facing east with his knees drawn up. "*An old city,*" the grandmother says, out of his mouth. "*Old cities have long memories, boy. Mind what you leave in this one.*"`);
      if (b6In('mehet')) ln.push(`Mehet is turning his ring of keys over, one at a time, and naming them under his breath. "My father's door," he says, when he sees you watching. "My uncle's. The kiln-yard gate." He holds one up. "This one I don't know. I keep it anyway."`);
      return {sp:'The Third\'s fire', scene:camp ? 'b6_ghatan_walls' : 'b6_odhan_night', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b6_c1_fire'}]}; },
    /* the fever, at the fire: the squad's healer can break it, and it costs them the hour */
    b6_c1_fire_fever:()=>{ const f = b6FeverList(), h = HEALER(), can = b6CanCure(), ph = b61Ph();
      return {sp:'The Third\'s fire', scene:ph >= 3 ? 'b6_ghatan_walls' : 'b6_odhan_night', html:feverHTML(), txt:
`${f.map(id => id === 'sgt' ? 'You are' : NAME(id) + ' is').join(', and ')} sweating by the fire with no heat in the night to sweat for, and shaking with it, and cannot keep the water down.

${can && h ? `${NAME(h)} looks, and puts a hand flat to a forehead, and frowns. ${h === 'marrow' ? `"Bad water, child," Marrow says. "I can break it. It will cost me the hour, and you a bad one."` : h === 'mirrel' ? `"Bad water," Mirrel says. "Sit. Hand. Other hand." She counts three under her breath. "I can break it. It takes the hour."` : `"I can break it," ${NAME(h)} says. "It takes the hour."`}` : `The squad has no one with the hands for it. The 9th's surgeons are with the wagons${ph >= 3 ? ', in the tents along the lines' : ', a day behind'}.`}`,
        ch:[{t:can && h ? `Let ${NAME(h)} break it.` : 'Nothing to be done here.', req:()=>can && !!h, fx:()=>{ const how = `${NAME(HEALER())}'s hands, at the fire`; b6FeverList().forEach(id => b6Cure(id, how)); S.f['b6_c1_rest' + b61Ph()] = 1; }, go:'b6_c1_fire'},
            {t:'Not now.', go:'b6_c1_fire'}]}; },

    /* ---- the captain, the first night ---- */
    b6_c1_captain:()=>({sp:'The captain', scene:'b6_odhan_night', fx:()=>{ S.f.b6_c1_orders1 = 1; }, again:()=>`The captain, by the tents, with the orders in his hand. "Sergeant."`, txt:
`The 9th's company captain is a thin man who coughs into his fist before he says anything, as if clearing the way for it. He keeps the numbers, and he is better at the numbers than at the rest of it, and he knows that, which is more than most captains know.

"Sergeant." The cough. "The column moves at first light. The water wagons are a day behind and the Fist wants the 9th's skins full before the next halt." He shows you a scrap of hide with a scout's marks on it. "There's a well here, half a day east of the track. Old. The scouts say it's sweet. Take the Third ahead and hold it till the wagons come up."

He folds the hide. "The bandits out here know every well on the Odhan. Mind they don't know this one better than the scouts do."`,
      ch:[{t:'"What\'s ahead of us, Captain?"', go:'b6_c1_captain_news'},
          {t:'"The well. Yes, Captain."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_captain_news:()=>({sp:'The captain', scene:'b6_odhan_night', fx:()=>{ S.f.b6_c1_capNews = 1; }, txt:
`"Leoman," the captain says, "and whatever he got out of Raraku with him. The scouts think three or four thousand." He coughs. "They think he's making for Y'Ghatan. It's the only city out here with walls worth the name."

He looks east along the track. "The Fist says we'll catch him before he gets there. The Fist also says the Adjunct will march us into the ground doing it." He considers which of the two to believe, and does not choose. "Fill your skins at the well, Sergeant. Whatever happens, it'll happen thirsty."${b61If('darrut', `\n\nDarrut, behind you, says under his breath, "The Fist said the same at Aren." He does not say what the Fist said at Aren.`)}`,
      ch:[{t:'"Yes, Captain."', go:()=>startExplore()}]}),

    /* ---- the quartermaster's cart ---- */
    b6_c1_qm:()=>({sp:'The quartermaster', scene:'b6_odhan_night', fx:()=>{ S.f.b6_c1_qm = 1; }, again:()=>`The quartermaster, on his cart, counting. "Salves, four. Silver, not promises."`, txt:
`The 9th's quartermaster stands on his cart in the dark counting the casks, and then counts them again, and writes both numbers down so that one of them at least will be right. He has a crate of field salves at his feet, in waxed cloth.

"Four silver," he says, without looking down. "And before you ask, Sergeant, no, the Fist does not issue them free on campaign. The Fist issues them free in Aren. This is not Aren."`,
      ch:[{t:'A salve.', tag:'4 silver', req:()=>(S.silver || 0) >= 4, fx:()=>{ S.silver -= 4; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for four silver.', 'good'); }, go:'b6_c1_qm'},
          {t:'Talk him down. ("The wagons are a day behind. You aren\'t.")', check:['guile', 15], req:()=>(S.silver || 0) >= 2 && !S.f.b6_c1_haggle,
            edges:id=>[id === 'sgt' && ['you have watched him count for a year', 1], id === 'rasp' && ['a marine-trained sapper knows what a quartermaster skims', 2], id === 'tallow' && ['he talks too much, and some of it lands', 1], id === 'darrut' && ['the Aren Guard knew every quartermaster\'s trick', 1], id === 'haddat' && ['she is too formal to haggle', -1], id === 'marrow' && ['she would rather have the salve than the argument', -1]],
            near:{t:()=>`Yes, but he makes ${b61Nm(b61Who())} count the casks for him while he wraps it, twice, and the casks take the hour the squad would have had by the fire. No rest at this fire.`, fx:()=>{ S.f['b6_c1_rest' + b61Ph()] = 1; }},
            fx:()=>{ S.f.b6_c1_haggle = 1; }, go:'b6_c1_qm_haggled', fail:'b6_c1_qm_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_qm_haggled:()=>({sp:'The quartermaster', scene:'b6_odhan_night', fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 2); S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for two silver.', 'good'); }, txt:
`He stops counting. He looks east, where the rebels are, and west, where the wagons are, and down at you. "Two," he says. "And if the Fist asks, I counted it as spoiled."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b6_c1_qm_no:()=>({sp:'The quartermaster', scene:'b6_odhan_night', txt:
`"The wagons are a day behind," he agrees. "So is every quartermaster in this army who gives his salves away." He goes back to counting. "Four, Sergeant."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ---- the old soldier by the cairn: Y'Ghatan, and the wells ---- */
    b6_c1_oldsoldier:()=>({sp:'An old soldier of the 9th', scene:'b6_odhan_night', again:()=>`The old soldier by the cairn, with his cup. "Y'Ghatan," he says, to the cup.`, txt:
`An old soldier of the 9th sits with his back against a cairn of stones somebody piled up on the bank of the wash a long time ago, with a cup in his hand that has been empty for a while. He has been in the army longer than the Fourteenth has existed. He reads the Deck for the legion behind the cook-lines for a finger of rum, and the legion says he is right more often than is comfortable.

"Y'Ghatan," he says, before you have said anything. "The Empire took it once before. Before your time. Before mine, nearly." He turns the cup. "There are barrows all along the road under the walls, the old ones say, full of the soldiers it cost. The First Sword fell there, they say. In the fire." He shrugs. "They say a lot of things about the First Sword."

He looks at the cup again. "That's a city that takes its price."`,
      ch:[{t:'Ask him about the wells on the Odhan.', check:['wits', 15], req:()=>!S.f.b6_c1_oldTried,
            edges:id=>[id === 'haddat' && ['her mother\'s people sold water across the Odhans', 2], id === 'mehet' && ['he knows the old wells of the country round his city', 2], id === 'sgt' && ['you have marched the Odhans before', 1], id === 'tallow' && ['he asks too many questions at once', -1], id === 'tebbet' && ['the hills of Dal Hon have streams, not wells', -1]],
            near:{t:()=>`Yes, but he wants a story back for every one he gives, and ${b61Nm(b61Who())} ${b61V(b61Who(), 'are', 'is')} up past midnight telling them: rattled.`, fx:()=>b61Rattle(b61Who())},
            fx:()=>{ S.f.b6_c1_oldTried = 1; }, go:'b6_c1_old_ok', fail:'b6_c1_old_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_old_ok:()=>({sp:'An old soldier of the 9th', scene:'b6_odhan_night', fx:()=>{ S.f.b6_c1_wellWarned = 1; }, txt:
`He takes the scout's scrap of hide out of ${by({sgt:'your', _:'{who}\'s'})} hand and looks at it by the firelight for a while.

"That one," he says. "I know that one. Sweet water, the scouts say. It was. The tribes stopped using it twenty years ago." He taps the mark. "A well everybody stops using is a well somebody is using for something else. Go round to it from the north, Sergeant, from the side with the rocks. Whoever's there will be watching the track."

He hands the hide back and holds out the empty cup, in case.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b6_c1_old_no:()=>({sp:'An old soldier of the 9th', scene:'b6_odhan_night', txt:
`He listens, and nods, and tells a long story about a well near Pan'potsun that had a dead man in it for three years before anybody noticed, which is not about this well and has no point at the end of it.

"Wells," he says. "You never know with wells." He holds out the empty cup.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b6_c1_east:()=>({sp:'The track', scene:'b6_odhan_night', txt:
`The track goes on east down the wash into the dark, between the scrub. The 9th's pickets are out along it, and past them nothing at all, for a long way.

The column moves at first light. Not before.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ---- the night, and the march ---- */
    b6_c1_sleep1:()=>({sp:'The 9th\'s camp', scene:'b6_odhan_night', fx:()=>{ S.f.b6_c1_slept = 1; }, txt:
`The thorn burns down. The camp goes quiet, row by row, until there is nothing but the pickets calling to each other along the wash and somebody's horse complaining.

${b61Say({haddat:`Haddat is the last awake. She says the names, low, into the dark, and you are asleep before she gets to the end of them.`, marrow:`Marrow is the last awake, sitting up with her string. When you wake in the night she is still sitting there, and the string has one more knot.`, _:`You sleep as soldiers sleep on the march, all at once and not for long enough.`})}

Before dawn the drums go down the line, and the camp comes apart into a column again in the dark, the way it always does, swearing.`,
      ch:[{t:'First light. The column moves.', onward:true, go:'b6_c1_march'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_march:()=>({sp:'The Lato Odhan', scene:'b6_c1_road', fx:()=>{ S.f.b6_c1_ph = 2; }, txt:
`By the time the sun is up the column is strung out across the Odhan for a league behind the Wickan outriders, and the 9th is at the back of it in the dust of everyone else. The captain sends the Third on ahead at a trot, off the track, toward the scout's mark.

The country does not change. Hardpan the colour of a biscuit, thorn scrub in grey clumps, here and there a rock the size of a house, sitting by itself as if it had been put down and forgotten. The heat comes up out of the ground before it comes down out of the sky.${b61If('sathi', `\n\nSathi trots ahead of the squad, grinning back at it, and points at the horizon with her whole arm: there, there, there.`)}`,
      ch:[{t:'Ahead, to the well.', onward:true, go:()=>{ startExplore('b6_c1_road'); talk('b6_c1_road_arrive'); }}]}),
    b6_c1_road_arrive:()=>({sp:'The Lato Odhan', scene:'b6_c1_road', txt:
`The track runs east through the scrub as straight as if somebody had drawn it. North of it, past a scatter of rocks, there is a frame of poles over a ring of stone: the well. Further on along the track the ground drops into a dry wash, and there is nothing to see in the wash at all, which is the thing about it you notice.

${b61Say({tebbet:`Tebbet shades his eyes and studies the well. "Smoke," he says. "Little. A cook fire."`, haddat:`Haddat looks at the well and then at the ground. "Tracks," she says. "Not ours. Not the scouts'. Six, maybe."`, _:`There is a little smoke at the well: a cook fire.`})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b6_c1_road_back:()=>({sp:'The Lato Odhan', scene:'b6_c1_road', txt:
`Back along the track, a long way back, the column's dust stands up off the Odhan in a brown wall, and somewhere under it is the 9th and the captain, and the water wagons a day behind that.

The captain said to hold the well.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* ---- the well ---- */
    b6_c1_well_arrive:()=>{ const done = !!S.f.b6_c1_wellDone;
      return {sp:'The well', scene:'b6_c1_well', again:()=> done ? `The well. ${S.f.b6_c1_wellClean ? 'The water is coming up clean.' : 'The water still stinks.'}` : 'The well, and the men at it.', txt: done ?
`The well is a ring of old cut stone, waist-high, with a frame of poles over it and a bucket on a rope. ${S.f.b6_c1_wellClean ? 'The water coming up in the bucket is clear, and cold, and tastes of stone. The 9th\'s water wagons will fill here by evening.' : S.f.b6_c1_wellTried ? 'The water still stinks. The wagons\' crews will have to deal with it, and will say so.' : `Down in the dark of it the water stinks, because the bandits threw a dead goat in after they drank, so that the army behind would get nothing.`}` :
`There are six of them at the well, or seven: men of the Odhan in veils and dust-coloured robes, with a cook fire going and a string of camels hobbled in the scrub. They have drunk, and filled their skins, and now two of them are dragging a dead goat across the stones to the well's mouth.

They mean to throw it in. The water will be no good to anyone behind them for a week.${S.f.b6_c1_wellWarned ? `\n\nThe old soldier was right. They are watching the track, and nothing else.` : ''}${b61If('haddat', `\n\nHaddat says something under her breath in a tongue of the Odhan that is not polite in any dialect.`)}`,
        ch: done ? [
          {t:'Clear the well before the wagons come up.', check:['might', 15], req:()=>!S.f.b6_c1_wellTried,
            edges:id=>[id === 'darrut' && ['he has hauled a gate-bar alone', 1], id === 'hessa' && ['she is square and strong and does not mind dead things', 1], id === 'haddat' && ['she knows how the Odhan\'s wells are built', 1], id === 'redblade' && ['he has the shoulders for it', 1], id === 'tallow' && ['he is all elbows on a rope', -1], id === 'marrow' && ['she is old for hauling, and says so', -2]],
            near:{t:()=>`Yes, but ${b61Nm(b61Who())} went down the rope to get a hand under it, and came up with a mouthful of that water. You drank from that well.`, fx:()=>b6Catch(b61Who(), 'the well water')},
            fx:()=>{ S.f.b6_c1_wellTried = 1; }, go:'b6_c1_well_clean', fail:'b6_c1_well_foul'},
          {t:'Leave it for the wagons\' crews.', go:()=>startExplore()}] : [
          {t:'"Third! At them!" Straight in.', go:()=>startBattle('b6_c1_well', {})},
          {t:'Round by the rocks to the north, quiet.', check:['guile', 15],
            edges:id=>[id === 'sathi' && ['she rode down on Odhan camps for the Weasels', 2], id === 'tebbet' && ['he was taught to be a long way off and unseen', 1], id === 'mehet' && ['he knows the country round his city', 1], S.f.b6_c1_wellWarned && id === 'sgt' && ['the old soldier told you which way', 2], id === 'darrut' && ['an Aren Guard\'s kit is not made for creeping', -1], id === 'tallow' && ['he is the loudest quiet man in the 9th', -1]],
            near:{t:()=>`Yes, but ${b61Nm(b61Who())} ${b61V(b61Who(), 'go', 'goes')} down on a thorn bush in the rocks, and the thorns go in deep. ${b61Nmc(b61Who())}'ll feel it in the fight.`, fx:()=>bruise(b61Who(), bruiseN())},
            go:()=>startBattle('b6_c1_well', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c1_well_seen'},
          {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c1_well_seen:()=>({sp:'The well', scene:'b6_c1_well', txt:
`A camel sees you first, and says so, loudly, the way camels do. Every head at the well comes round. The goat goes in the water anyway, with a splash, and then the knives come out.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c1_well', {surprise:'e'})}]}),
    b6_c1_well_after:()=>({sp:'The well', scene:'b6_c1_well', fx:()=>{ S.f.b6_c1_wellDone = 1; gain('b6_c1_wellrope'); gain('b6_c1_odhanveil'); }, txt:
`The bandits who can still run are running, west, on their camels, and do not look back. The rest are past running.

The goat went in. One of them kicked it over the edge during the fight, and it is down there now in the dark of the well, and the water that comes up on the bucket stinks of it already. ${b61Say({mirrel:`Mirrel smells the bucket and puts it down very carefully. "Not a mouthful of that," she says. "Not one. Three days of it in you and I'll be counting you on the cots."`, marrow:`Marrow smells the bucket and puts it down. "Leave that, child," she says. "Even you."`, _:'The bucket goes back down untouched.'})}

The bandit who was watching the track had a veil of the Odhan's double weave wound over his head, and the well's old rope is plaited hide, stiff with years of sun. Both go in the kit. The goat is still in the well.`,
      ch:[{t:'Look at the well.', go:'b6_c1_well_arrive'},
          {t:'On along the road.', go:()=>startExplore()}]}),
    b6_c1_well_clean:()=>({sp:'The well', scene:'b6_c1_well', fx:()=>{ S.f.b6_c1_wellClean = 1; b61L('mirrel', 1); b61L('haddat', 1); }, txt:
`It takes the rope, and a hook made from a tent peg, and ${by({sgt:'you', _:'{who}'})} at the bottom of the rope with an arm round the thing and the rest of the squad hauling. It comes up in the end. It goes a long way off into the scrub, downwind.

Then bucket after bucket, drawn and poured away on the stones, until what comes up is clear. It tastes of stone and cold, and of nothing else.

By evening the 9th's water wagons are filling at the well, and the drivers want to know who did it, and are told.${b61If('haddat', `\n\nHaddat drinks the first clean bucket, a little, and pours the rest back down the well, the way her mother's people did. "For the next one," she says.`)}`,
      ch:[{t:'On along the road.', go:()=>startExplore()}]}),
    b6_c1_well_foul:()=>({sp:'The well', scene:'b6_c1_well', txt:
`The rope slips, twice. The hook made from a tent peg bends. The thing in the well is heavier than a goat has any right to be, and it does not want to come up.

In the end the squad lets the rope go and stands round the well-head breathing. The wagons' crews will have to deal with it. They will have opinions about that.`,
      ch:[{t:'On along the road.', go:()=>startExplore()}]}),

    /* ---- the rebel rearguard in the wash ---- */
    b6_c1_to_wash:()=>{ const done = !!S.f.b6_c1_rearDone, well = !!S.f.b6_c1_wellDone;
      return {sp:'The wash', scene:'b6_c1_road', again:()=> done ? 'The wash, empty now, and the road beyond it.' : 'The wash across the road, and nothing in it.', txt: !well ?
`The track goes on east toward a dry wash with nothing in it. The captain said to hold the well first, and the well is to the north-west, with smoke going up from it.` : done ?
`The wash is empty now but for what the fight left in it. Beyond it the road goes on east across the Odhan, and somewhere at the end of the road, according to a wounded man, is a city with a new Falah'd.` :
`The track drops into a dry wash a hundred paces wide, all stones and sand, with a rise of broken rock on the far bank. There is nothing in it. There is nothing in it in the particular way of a place where a lot of people are lying very still.

${b61Say({sathi:`Sathi sniffs. "Horses," she says. "Over the rise. Not ours." She grins. "Lots."`, tebbet:`Tebbet studies the far bank. "Bows," he says. "On the rise. Four. Five."`, haddat:`Haddat looks at the stones in the wash. "Those were moved," she says. "To lie behind."`, _:`The scrub on the far bank moves, once, with no wind to move it.`})}

The rebels have left a rearguard across the road, to slow the column a day. The Third is a long way ahead of the column.`,
        ch: !well ? [{t:'Back to the road.', go:()=>startExplore()}] : done ? [{t:'On, to the city.', req:()=>!!S.f.b6_c1_prisoner, onward:true, go:'b6_c1_to_city'}, {t:'Not now.', go:()=>startExplore()}] : [
          {t:'"Third! Down into the wash!" Straight at them.', go:()=>startBattle('b6_c1_rearguard', {})},
          {t:'Up the wash and round their flank, under the bank.', check:['wits', 15],
            edges:id=>[id === 'sathi' && ['an outrider reads a wash like a page', 2], id === 'tebbet' && ['he sees the far bank better than any of you', 1], id === 'haddat' && ['she knows the Odhan\'s ground', 1], id === 'orvas' && ['the Khundryl ride round, never at', 1], id === 'tallow' && ['he would rather go straight at it and get it over', -1], id === 'hessa' && ['a temple guard stands; she does not creep', -1]],
            near:{t:()=>`Yes, but the bank gives way under ${b61Nm(b61Who())}, and ${b61Nm(b61Who())} ${b61V(b61Who(), 'go', 'goes')} down it in a slide of stones on ${b61V(b61Who(), 'your', 'the')} shoulder. ${b61Nmc(b61Who())}'ll feel it in the fight.`, fx:()=>bruise(b61Who(), bruiseN())},
            go:()=>startBattle('b6_c1_rearguard', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c1_rear_seen'},
          {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c1_rear_seen:()=>({sp:'The wash', scene:'b6_c1_road', txt:
`Halfway up the wash a stone goes from under somebody's boot and rattles down onto the others, and the whole far bank stands up and looks at you.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c1_rearguard', {surprise:'e'})}]}),
    b6_c1_rear_after:()=>({sp:'The rise', scene:'b6_c1_road', fx:()=>{ S.f.b6_c1_rearDone = 1; gain('b6_c1_rebeltulwar'); }, txt:
`The rise is the Third's. The rebel captain is down on the rocks with his tulwar beside him, and his horse-holders are a cloud of dust going east. The rest of the rearguard has gone with them, or is past going anywhere.

The captain's tulwar is a heavy curved thing with a red-cord grip, and it goes in the kit. ${b61Say({tangle:`Tangle counts the satchel. "Didn't need a thing," he says, a little sadly.`, sathi:`Sathi laughs at the dust going east. "Run," she calls after it. "Run, run."`, _:''})}

One of them is still alive, at the foot of the rise: a young man with a cut across the ribs, sitting against a rock with his hands open on his knees to show there is nothing in them.`,
      ch:[{t:'The wounded one.', go:'b6_c1_prisoner'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_prisoner:()=>{ const t = b61Tongue();
      return {sp:'A wounded rebel', scene:'b6_c1_road', fx:()=>{ S.f.b6_c1_news = 1; }, again:()=>`The wounded rebel, against his rock. He has said what he is going to say.`, txt:
`He is younger than he looked from the rise. ${t ? `${t === 'haddat' ? 'Haddat squats in front of him and speaks to him in his own tongue, politely, the way she speaks to everybody, and he answers her as if he had not expected to be spoken to politely ever again' : `${NAME(t)} squats in front of him and asks him, in the tongue of the Odhan, what he was doing in the wash, and he answers`}.` : 'He has some Malazan, as everybody in Seven Cities has some Malazan, and he uses it.'}

"A day," he says. "We were to hold you a day. It is done now anyway." He looks east. "Leoman is in Y'Ghatan. He went to the gate and the Falah'd came out to meet him, and Leoman killed him there, in the gate, and made himself Falah'd." He says it with something that is nearly pride and nearly not. "Then he told the city to go. All of it. To Lothal, with their goods, everything they could carry. He said the city would not want to be there when you came."

He looks at ${t ? (t === 'sgt' ? 'you' : NAME(t)) : 'you'}. "He took the oil," he says. "From the presses. All of it. For the lamps, his men said." He does not seem to know why he has said it.${b61If('haddat', t === 'haddat' ? `\n\nHaddat translates it all, word for word, and at the end she is quiet a breath before she stands.` : '')}`,
        ch:[{t:'Water, and the captain\'s wagon when the column comes up.', fx:()=>{ S.f.b6_c1_prisoner = 'kept'; b61L('haddat', 1); b61L('marrow', 1); }, go:'b6_c1_prisoner_kept'},
            {t:'Leave him a water skin, and walk on.', fx:()=>{ S.f.b6_c1_prisoner = 'left'; b61L('sathi', 1); b61L('tangle', 1); }, go:'b6_c1_prisoner_left'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c1_prisoner_kept:()=>({sp:'A wounded rebel', scene:'b6_c1_road', txt:
`${b61Say({marrow:`Marrow closes the cut across his ribs with her hands and a little of the warren, enough that he will live to the wagon, and no more. "There, child," she says. "Now you are the captain's problem."`, mirrel:`Mirrel closes the cut across his ribs, counting three under her breath. "Sit. Breathe. Good. Now you're the captain's."`, _:`The squad binds the cut across his ribs as well as it can, and gives him water.`})}

When the column comes up through the dust in the afternoon, the captain looks at him for a while, and coughs, and has him put on a wagon. The captain writes the news down, and sends a runner forward with it, because that is what the captain does.`,
      ch:[{t:'On, to the city.', onward:true, go:'b6_c1_to_city'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_prisoner_left:()=>({sp:'A wounded rebel', scene:'b6_c1_road', txt:
`You leave him the skin, and he holds it in both hands and does not drink, as if drinking would be agreeing to something.

When the squad looks back from the far side of the wash he is gone, west, on foot, toward wherever the rest of them went. The column comes up through the dust in the afternoon. The captain hears the news, and coughs, and sends a runner forward with it.`,
      ch:[{t:'On, to the city.', onward:true, go:'b6_c1_to_city'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the camp before Y'Ghatan ---- */
    b6_c1_to_city:()=>({sp:'Y\'Ghatan', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_ph = 3; }, txt:
`The Fourteenth comes up to Y'Ghatan at the end of a long hot march, and stops, all of it, at once, as a column stops when the head of it has seen something.

The city stands up out of the plain on its own old hill, inside walls the colour of bone. They are very old and very thick and patched in a hundred places with newer stone, and above them, in the middle of the city, there is a great dome, and towers, and no smoke from any chimney. Along the road that runs under the walls there are mounds: long low barrows, a line of them, the Empire's dead from the last time.

The 9th is put to digging before the sun goes down.`,
      ch:[{t:'Into the 9th\'s lines.', onward:true, go:()=>{ startExplore('b6_c1_camp'); talk('b6_c1_camp_arrive'); }}]}),
    b6_c1_camp_arrive:()=>({sp:'Before Y\'Ghatan', scene:'b6_ghatan_walls', txt:
`The 9th's lines go in on the west side of the city, in trampled grass and earth, a long bowshot from the walls: tents, the wagons, the horse lines, the trenches started. Far out on the plain, beyond the camp, Wickan outriders and the Khundryl ride the circle round the city in the dust, so that nobody gets out of it without being seen.

${b61Say({haddat:`Haddat looks at the walls and then at the barrows along the road under them. She does not ask what they are. Her mouth moves on a word, and stops.`, tangle:`Tangle stands with his hands on the satchel looking at the walls, the patches, the newer stone. "Huh," he says.`, _:`The squad stands at the edge of the 9th's lines and looks up at the walls.`})}${b61If('marrow', `\n\nMarrow touches a knot on her string. "Old," she says. "Old and empty. I don't like it, child. A full city is noisy. This one is listening."`)}`,
      ch:[{t:'Look at the walls.', go:'b6_c1_walls'},
          {t:'Walk the lines.', go:()=>startExplore()}]}),
    b6_c1_walls:()=>({sp:'The walls', scene:'b6_ghatan_walls', txt:
`The walls of Y'Ghatan, from as close as the 9th's trench-line will let you go: old cut stone the colour of bone, and in it, here and there, darker stone, newer, set in where somebody once made a hole. There are a great many holes.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c1_dig:()=>({sp:'The 9th\'s diggers', scene:'b6_ghatan_walls', again:()=>`The 9th's diggers, in their trench. ${S.f.b6_c1_dug ? 'They wave a spade.' : 'They are still at it.'}`, txt:
`A work party of the 9th is digging the trench-line in the hard earth with picks and spades and short tempers, a long bowshot from the walls. The ground is old, and full of stones, and some of the stones have been cut by somebody's hands.

"Room for a few more," their corporal says, and holds out a pick. "Room for a lot more."${b61If('tangle', `\n\nTangle looks at the line of the trench and at the walls. "Wrong way," he says. "Not wrong. Just not the way I'd go."`)}`,
      ch:[{t:'Take a pick. An hour of it.', check:['might', 14], req:()=>!S.f.b6_c1_digTried,
            edges:id=>[id === 'darrut' && ['he has dug ramparts for the Aren Guard', 2], id === 'hessa' && ['she is strong and does not tire', 1], id === 'tangle' && ['a sapper knows how ground breaks', 1], id === 'redblade' && ['he is broad in the shoulder', 1], id === 'yorin' && ['a mage\'s hands are for other work', -1], id === 'marrow' && ['she is too old for a pick and says so', -2]],
            near:{t:()=>`Yes, but the pick comes down on a buried stone, and the jar goes all the way up ${b61Pos(b61Who())} arms into the shoulders. It will be there tomorrow.`, fx:()=>bruise(b61Who(), bruiseN())},
            fx:()=>{ S.f.b6_c1_digTried = 1; }, go:'b6_c1_dig_ok', fail:'b6_c1_dig_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_dig_ok:()=>({sp:'The 9th\'s diggers', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_dug = 1; }, txt:
`An hour of it, and the trench is a body-length longer than it would have been, and ${by({sgt:'you', _:'{who}'})} can feel every stone that came out of it.

"Third squad," the corporal says, and writes it on the back of his hand with a burnt stick, which is the 9th's way of owing somebody. "We'll remember."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c1_dig_no:()=>({sp:'The 9th\'s diggers', scene:'b6_ghatan_walls', txt:
`The ground does not want to be dug. The pick finds stone, and stone, and more stone, and after an hour there is a scraped place and a great deal of swearing.

"That's how it's been all afternoon," the corporal says. "Thanks anyway."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c1_column:()=>({sp:'A column coming in', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_sortSeen = 1; }, again:()=>'The new column, making its camp at the end of the lines.', txt:
`A column is coming in along the road from the west in its own dust: reinforcements, a few hundred, fresh off the coast in kit that has not yet learned what the Odhan is. The 9th stops digging to watch them come, because a column of somebody else's soldiers is the best thing to look at on a campaign that is not food.

At the head of it walks a woman captain, square and weathered, who walks like somebody who has stood on a high wall in a cold wind for a long time. "Faradan Sort," the word goes down the trench. "From the Stormwall. Korelri." The 9th knows nothing else about her. By nightfall everybody in the 9th will know something.

Further back in the column a sergeant from Kartool is telling the world what she thinks of it, at length, and a very large corporal behind her is carrying her pack as well as his own.${b61If('hessa', `\n\nHessa watches the Kartool sergeant go by. "City watch," she says. "I know the walk." She does not say if that is good.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c1_captain_camp:()=>({sp:'The captain', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_orders3 = 1; }, again:()=>`The captain, in the 9th's lines. "The barrow road tonight, Sergeant."`, txt:
`The captain is standing at the end of the 9th's trench with a slate in his hand, counting spades. He coughs, and puts the slate under his arm.

"Sergeant. The Third has the picket on the barrow road tonight, east, under the walls. The Fist wants to know if anything comes out of the city that way after dark." He looks up at the walls. "Leoman has a few thousand in there, and the city empty round them. He'll want to know what we're doing as much as we want to know what he is."

He lowers his voice. "And the townsfolk at the camp's west edge. A few of them didn't go to Lothal. They're camped by our pickets, selling water and figs. The Fist doesn't care about them. I'd keep an eye on them anyway. If I were Leoman, I'd want to know who stayed, and why."`,
      ch:[{t:'"What\'s on the barrow road, Captain?"', go:'b6_c1_captain_barrows'},
          {t:'"Yes, Captain."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_captain_barrows:()=>({sp:'The captain', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_barrowsTold = 1; }, txt:
`"The barrows." The cough. "The Empire's dead, from the first siege. A long time ago." He looks at the slate as if the answer were on it. "Before we came up, the rebels went out and dug into them. Looking for iron, or for something to say to us. The Fist rode past this afternoon and looked."

He does not say what the Fist said. "The orders are to watch the road. Not to do anything else on it." He looks at you. "Those are the orders, Sergeant."${b61If('haddat', `\n\nHaddat, beside you, has gone very still.`)}`,
      ch:[{t:'"Yes, Captain."', go:()=>startExplore()}]}),
    b6_c1_surgeon:()=>{ const f = b6FeverList();
      return {sp:'The 9th\'s surgeon', scene:'b6_ghatan_walls', html:feverHTML(), again:()=>`The surgeons' tents, at the end of the lines. ${b6FeverList().length ? 'There is fever in the squad.' : 'The surgeon is washing his hands, again.'}`, txt:
`The 9th's surgeons have their tents at the end of the lines, and the surgeon on duty is a bald man in a stained apron who has been washing his hands in a bucket since the 9th came up and shows no sign of stopping.

"Fever," he says, before you say anything. "Bad water on the Odhan. Half the column drank from something it shouldn't have." He shakes the water off his hands. "There's talk of worse on the coast. Here it's bad water. So far."${f.length ? `\n\nHe looks at ${f.map(id => id === 'sgt' ? 'you' : NAME(id)).join(' and ')}. "That's the look," he says. "Sit down."` : ''}`,
        ch:[{t:'Have him break the fever.', tag:S.inv && S.inv.salve > 0 ? 'a salve' : '', req:()=>b6FeverList().length > 0, fx:()=>{ b6FeverList().forEach(id => b6Cure(id, 'the 9th\'s surgeons')); if ((S.inv.salve || 0) > 0) { S.inv.salve--; note('The surgeon keeps a salve for his trouble.', 'bad'); } }, go:'b6_c1_surgeon'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c1_runner:()=>({sp:'A runner from the Fists\' tents', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_rumour = 1; }, again:()=>`The runner, catching his breath. He has told you everything he knows and some things he doesn't.`, txt:
`A runner from the Fists' end of the camp has stopped by the 9th's wagons to catch his breath and tell anyone who will listen what he has heard through a tent wall, which is a runner's real work.

"The Fists are not happy," he says. "With the Adjunct. All of them, and Fist Blistig least happy of the lot. They say Raraku was nothing, and this is worse, and she won't say what she means to do." He lowers his voice. "There's talk they'll go to her together. Fist Keneb says wait. Fist Blistig says he's done waiting."

He drinks from somebody's skin without asking. "And the Host won't come. Onearm's Host, up on the north coast. They say the High Fist's spirit is broken." He hands the skin back. "Not my words. I only carry them."${b61If('darrut', `\n\nDarrut, who followed Blistig out of Aren, studies the ground between his boots, and stays out of it.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* ---- the camp's edge: the townsfolk who stayed, Mehet, the knives out of the postern ---- */
    b6_c1_edge:()=>{ const met = !!S.f.b6_c1_mehetMet, done = !!S.f.b6_c1_edgeDone, d = S.f.b6_mehetDone;
      return {sp:'The camp\'s edge', scene:'b6_ghatan_walls', again:()=> done ? `The townsfolk's blankets at the camp's edge, with the lamps lit again.${d === 1 && b6In('mehet') ? '' : d === 2 ? ' Mehet is with them, waiting.' : ''}` : 'The townsfolk at the camp\'s edge, by the pickets.', txt: done ?
`The townsfolk who stayed have lit their lamps again, and moved their blankets closer to the 9th's pickets, as close as the pickets will let them. They watch the squad go by with the faces of people who have stopped expecting anything and have just been given it.${d === 2 ? `\n\nMehet is sitting with them, his sling in his lap, waiting. He lifts a hand.` : ''}` :
`At the west edge of the 9th's lines, just outside the pickets, a handful of people from the city have made a camp of blankets and lamps: an old man with a donkey, a woman with two children, a few men, a few more women. They did not go to Lothal. They sell water and dried figs to the soldiers, at prices that make the quartermaster look generous.

${met ? 'Mehet is among them, with his ring of keys, watching the walls.' : `One of them is a man of thirty or so in a quilted coat, with a scarf over his mouth against the dust and a sling wound round his wrist. He is not selling anything. He is watching the walls, and turning a ring of old keys over in his fingers, one key at a time.`}`,
        ch:[{t:'Talk to the man with the keys.', req:()=>!met, go:'b6_c1_mehet_meet'},
            {t:'Wait with them for dark.', req:()=>met && !done, onward:true, go:'b6_c1_edge_night'},
            {t:'"Show us the city, Mehet."', req:()=>done && !S.f.b6_c1_mapTried && d !== 0, go:'b6_c1_map'},
            {t:'"Walk with us, Mehet."', req:()=>done && d === 2, fx:()=>{ b6Join('mehet'); }, go:'b6_c1_mehet_join'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c1_mehet_meet:()=>({sp:'Mehet', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_mehetMet = 1; }, txt:
`"Mehet," he says, when you ask, and pulls the scarf down. "Of the street of the potters. My father's kiln was by the north wall." His Malazan is good, and careful, a trader's Malazan.

"Leoman sent the city to Lothal. Everybody. With their goods, on their backs." He shrugs. "I stayed. Somebody had to know where the cisterns are." He holds up the ring of keys. "These are the doors of my family. My father's house, my uncle's, the kiln-yard gate. The Falah'd's men pulled the houses down twenty years ago to widen the wall road." He turns a key over. "I keep the keys. The doors are gone. I am a potter's son, Sergeant. I know the value of a thing that holds nothing."

He looks up at the walls, and then at the townsfolk round him. "They come out at night," he says, more quietly. "Leoman's men. Through a postern in the north wall. They come for the ones who stayed, to ask why we stayed, and who we talk to." He looks at your uniform. "We talk to you."${b61If('haddat', `\n\nHaddat says something to him in the tongue of the Odhan, and he answers her in the same, and for a breath the two of them are somewhere else.`)}`,
      ch:[{t:'Wait with them for dark.', onward:true, go:'b6_c1_edge_night'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_edge_night:()=>({sp:'The camp\'s edge', scene:'b6_ghatan_walls', txt:
`Dark comes down fast under the walls. The townsfolk's lamps make a small yellow island at the edge of the 9th's lines, and beyond it the plain is black up to the black of the walls, and somewhere in the walls, Mehet says, is a door.

You wait. ${b61Say({tebbet:`Tebbet sits a little way off in the dark with an arrow on the string and his eyes half shut.`, sathi:`Sathi lies flat in the grass beyond the lamps, grinning at nothing, her knife in her teeth.`, haddat:`Haddat sits among the townsfolk with the blue shield beside her, and talks to the old man with the donkey, low, in his own tongue.`, _:`The squad waits in the dark beyond the lamps.`})}

Near midnight the donkey lifts its head and looks at the walls, and the old man puts his hand on its neck.`,
      ch:[{t:'"Up. Shields." Meet them in the open.', go:()=>startBattle('b6_c1_edge', {})},
          {t:'Let them come into the lamplight, then close behind them.', check:['guile', 15],
            edges:id=>[id === 'mehet' && ['he knows how they come', 2], id === 'sathi' && ['she has lain in the dark for worse', 1], id === 'tebbet' && ['he is patient and unseen', 1], id === 'haddat' && ['the townsfolk trust her', 1], id === 'tallow' && ['he can\'t keep still', -1], id === 'hessa' && ['a temple guard stands in the open', -1]],
            near:{t:()=>`Yes, but it is a long wait in the dark with a held breath, and ${b61Nm(b61Who())} ${b61V(b61Who(), 'come', 'comes')} out of it wound tight: rattled.`, fx:()=>b61Rattle(b61Who())},
            go:()=>startBattle('b6_c1_edge', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c1_edge_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_edge_seen:()=>({sp:'The camp\'s edge', scene:'b6_ghatan_walls', txt:
`A boot shifts in the grass, and a voice in the dark says a word in the tongue of the Odhan, sharp. The lamps go over. In the dark that comes after, there are a great many more people than there were.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c1_edge', {surprise:'e'})}]}),
    b6_c1_edge_after:()=>({sp:'The camp\'s edge', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_edgeDone = 1; }, txt:
`The knives from the postern are gone back into the dark, those that can go. The 9th's pickets come running with torches when it is all over, as pickets do, and stand about looking at what is on the ground.

The townsfolk relight their lamps. The woman with the two children holds them so tight they complain. The old man with the donkey comes and takes ${b61Pos('sgt')} hand in both of his and says something long in his own tongue${b61Tongue() ? `, and ${NAME(b61Tongue())} does not translate it, because it does not need translating` : ''}.

Mehet is standing over one of the dead with his sling loose in his hand. "I knew him," he says. "He sold rope by the east gate." He winds the sling back round his wrist. Then he looks at you. "They will come again, Sergeant. For me, now, if not the others. I would rather be with soldiers when they do." He holds up the keys. "I can carry a pack. I can use this. And I know the city. Under it too."`,
      ch:[{t:'"Then walk with us."', fx:()=>{ b6Join('mehet'); b61L('haddat', 1); }, go:'b6_c1_mehet_join'},
          {t:'"Stay with your people for now. We know where you are."', fx:()=>{ S.f.b6_mehetDone = 2; }, go:'b6_c1_mehet_wait'},
          {t:'"Go to Lothal, Mehet. It\'s safer than an army."', fx:()=>{ S.f.b6_mehetDone = 0; b61L('haddat', -1); }, go:'b6_c1_mehet_no'},
          {t:'"Show us the city first."', req:()=>!S.f.b6_c1_mapTried, go:'b6_c1_map'}]}),
    b6_c1_mehet_join:()=>({sp:'Mehet', scene:'b6_ghatan_walls', txt:
`${b6In('mehet') ? `Mehet nods, once, as if a price had been agreed that he had expected to be higher. He takes up a pack from among the townsfolk's blankets, says goodbye to the old man with the donkey, and walks back into the 9th's lines with the Third, turning his keys.

${b61Say({haddat:`Haddat walks beside him and asks him, politely, in the tongue of the Odhan, the names of his dead. He tells her. She says them back to him, to be sure she has them right.`, tangle:`Tangle looks at the sling. "Clay shot?" he says. "Fired clay?" Mehet shows him. Tangle weighs one in his hand, approves, and gives it back. "No powder in it," he says, a little sadly.`, _:'The squad makes room for him at the fire.'})}` : `Mehet nods, and takes up a pack, and then sees how many walk with the Third already. "I'll wait with my people," he says, "until you have a place for me. You know where I am."`}`,
      ch:[{t:'"Show us the city, Mehet."', req:()=>!S.f.b6_c1_mapTried, go:'b6_c1_map'},
          {t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c1_mehet_wait:()=>({sp:'Mehet', scene:'b6_ghatan_walls', txt:
`Mehet nods. "For now," he says. "I'll be here. The pickets have seen me now. That will help."

He sits back down among the townsfolk, his sling in his lap, and watches the walls.`,
      ch:[{t:'"Show us the city first, Mehet."', req:()=>!S.f.b6_c1_mapTried, go:'b6_c1_map'},
          {t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c1_mehet_no:()=>({sp:'Mehet', scene:'b6_ghatan_walls', txt:
`Mehet looks at you a while, and then laughs, short, without much in it. "Lothal," he says. "Yes. Safer." He winds the sling round his wrist. "Thank you, Sergeant."

By morning he and his pack are gone from the townsfolk's blankets. The old man with the donkey says he went west, and then says he does not know where he went.${b61If('haddat', `\n\nHaddat watches the place where he slept for a while, and keeps what she thinks of it to herself. It shows anyway.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    /* the trick: Mehet's map in the dirt */
    b6_c1_map:()=>({sp:'Mehet', scene:'b6_ghatan_walls', txt:
`Mehet clears a patch of earth by the lamps with the side of his boot and draws the city in it with the point of a potter's knife: the wall, the gates, the great dome in the middle, the streets. Then he draws the other city, the one under it.

"Wells," he says, and makes a mark, and another, and another. "Old. Older than the walls, some of them. Drains, here, here, to the west, all the way under. Cisterns. The kerbs of all of them are cut stone, the old stone, and the old stone does not move." He taps a well-head. "Put your back to one of these and nothing can come round behind you. There is nothing behind you but a hole." He looks up. "My grandfather showed me. He was a well-digger before he was a potter. He said a city is a jar, and you must know where the cracks are."`,
      ch:[{t:'Learn the map. Every well-head.', check:['wits', 17], trick:'b6_c1_map', req:()=>!S.f.b6_c1_mapTried, fx:()=>{ S.f.b6_c1_mapTried = 1; },
            edges:id=>[id === 'mehet' && ['it is his map, and his grandfather\'s', 3], id === 'tangle' && ['a sapper thinks in drains and tunnels', 1], id === 'haddat' && ['she knows the wells of Seven Cities', 1], id === 'rasp' && ['marine-trained: she was taught to read a city from under it', 1], id === 'sathi' && ['she has never cared what is under anything', -1], id === 'tallow' && ['he gets the north wall and the south wall mixed', -1]],
            near:{t:()=>`Yes, but it takes half the night by the lamps, and ${b61Nm(b61Who())} ${b61V(b61Who(), 'go', 'goes')} to sleep with wells behind the eyes: rattled.`, fx:()=>b61Rattle(b61Who())},
            go:'b6_c1_map_ok', fail:'b6_c1_map_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_map_ok:()=>({sp:'Mehet', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c1_mapOk = 1; b61L('mehet', 1); }, txt:
`By the time the lamps are low ${by({sgt:'you can', mehet:'Mehet has walked it all twice, out loud, and', _:'{who} can'})} draw it back to him without looking: every well-head, every drain, every kerb of old stone between the north wall and the south.

"Good," Mehet says, and rubs the city out with his boot. "Now you know where to stand." He considers. "In a fight, the old stone is a friend. It is the only one in Y'Ghatan."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c1_map_no:()=>({sp:'Mehet', scene:'b6_ghatan_walls', txt:
`It is a lot of city. The wells go into the drains and the drains go into the cisterns, and somewhere about the third cistern ${by({sgt:'you lose', _:'{who} loses'})} the north wall entirely.

"It took me twelve years," Mehet says, not unkindly, and rubs it out. "You had an evening."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* ---- the barrow road ---- */
    b6_c1_to_barrows:()=>{ const ok = !!S.f.b6_c1_orders3 && !!S.f.b6_c1_edgeDone;
      return {sp:'The barrow road', scene:'b6_ghatan_walls', txt: ok ?
`East of the 9th's lines the road runs on under the walls, between the barrows, into the dark. The captain's picket is out there tonight, and the picket is the Third.` :
`East of the 9th's lines the road runs on under the walls, between the barrows. ${!S.f.b6_c1_orders3 ? 'The captain has not given the night\'s orders yet.' : 'The captain wanted an eye kept on the townsfolk at the camp\'s west edge first.'}`,
        ch:[{t:'Out to the barrow road.', req:()=>ok, onward:true, go:'b6_c1_to_barrows_go'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c1_to_barrows_go:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', fx:()=>{ S.f.b6_c1_ph = 4; }, txt:
`The Third goes out of the 9th's lines after dark, east along the road under the walls, with a hooded lantern for the picket and orders to watch and nothing else.

The walls go up on the left hand, black against a sky full of stars. On the right hand the plain goes away into the dark. In between, all along the road, are the barrows.`,
      ch:[{t:'Along the road.', onward:true, go:()=>{ startExplore('b6_c1_barrows'); talk('b6_c1_barrows_arrive'); }}]}),
    b6_c1_barrows_arrive:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', txt:
`They were long low mounds once, grassed over, with a line of stones along the top of each. The rebels have dug into every one of them. There are trenches cut down through the grass and the earth and into whatever was under it, and what was under it has been pulled out onto the ground and left there under the stars: old bones, old iron, rotted leather, the bits of soldiers the Empire left here a long time ago.

${b61Say({haddat:`Haddat stops in the road. She stands there with the blue shield on her arm and looks at it, all of it, and then she begins to say the names she knows, and when she runs out of those she says the ones she doesn't: *a soldier, a soldier, a soldier.*`, marrow:`Marrow stops in the road and puts her hand on her string. "Ah, child," she says, to nobody. "Ah."`, _:'The squad stops in the road and looks.'})}${b61If('mehet', `\n\nMehet looks at the barrows and then up at the walls of his city. "They did this so you would see it," he says. "So you would be angry, and come at the walls angry." He turns his keys. "Leoman knows your army."`)}${b61If('sathi', `\n\nSathi does not laugh.`)}`,
      ch:[{t:'Set the picket.', go:()=>startExplore()}]}),
    b6_c1_lantern:()=>({sp:'The picket\'s lantern', scene:'b6_c1_barrownight', fx:()=>{ S.f.b6_c1_names = 1; }, again:()=>`The picket's lantern, hooded, by the road. ${b61Key() ? 'The night is going.' : 'The barrows on every side.'}`, txt:
`The picket's lantern sits on a stone by the road with its hood down to a slit, so that it shows to the 9th's lines and not to the walls. From here you can see the whole barrow road in the starlight, and the dark shapes of what was dug out lying on the ground along it.

${b61Say({haddat:() => `Haddat sits by the lantern and says names. ${S.dead && S.dead.sathi ? 'Near the end of them she says *Sathi*, and stops, and goes on.' : 'The Chain\'s, and the road\'s, and the ones from Hissar.'} "My mother said the dead hear their names," she says. "I do not know if that is true. I say them in case."`, marrow:() => `Marrow sits by the lantern and ties a knot in her string. ${S.dead && S.dead.sathi ? '"For Sathi," she says. "She would have laughed at this, child. She laughed at funerals."' : '"One for these," she says. "One for all of them. It will have to do."'}`, _:`You sit by the lantern a while, and look at the barrows.`})}${b61If('mehet', `\n\nMehet sits down on the other side of the lantern. "My grandfather dug wells along this road," he says. "He said there were bones in every one he dug. He said this whole plain is a barrow, if you go down far enough."`)}`,
      ch:[{t:'The opened barrows.', req:()=>!b61Key(), go:'b6_c1_barrow'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the key: the opened barrows, the night before the siege */
    b6_c1_barrow:()=>{ const k = b61Key();
      return {sp:'The opened barrows', scene:'b6_c1_barrownight', again:()=> k === 'bury' ? 'The barrows, closed again, with fresh earth on them.' : k === 'leave' ? 'The barrows, open to the sky.' : 'The opened barrows, and what was in them.', txt: k === 'bury' ?
`The barrows along this stretch of the road are closed again, the earth heaped back over what was in them, the line of stones put back along the top of each one as near as anybody could tell where it had been.${S.f.b6_c1_patrolDone ? '' : '\n\nSomebody on the walls has seen the lantern moving all night, and the earth moving with it.'}` : k === 'leave' ? `The barrows lie open to the sky, as the rebels left them. The squad holds its picket and lets them be.` :
`You stand at the edge of the nearest barrow. It is a long trench now, cut down through the grass into the old earth, and what came out of it is on the ground beside it in the starlight: bones gone brown, the rust of old iron, a buckle, a shield-boss with the Empire's mark still on it under the rust.

The orders are to watch the road. It would take the whole night, and every hand in the Third, to put this stretch of it back. The rebels on the walls would see the lantern moving, and want to know why.${b61If('haddat', `\n\nHaddat is standing beside you. "Sergeant," she says. That is all she says.`)}${b61If('tangle', `\n\n"They're dead," Tangle says, not unkindly. "They won't mind either way. We'll mind tomorrow, if we've been digging all night."`)}${b61If('mehet', `\n\nMehet waits to see what Malazans do.`)}`,
        ch: k ? [{t:'Not now.', go:()=>startExplore()}] : [
          {t:'Put them back. All of them, before dawn.', fx:()=>{ S.f.b6_c1_key = 'bury'; b61L('haddat', 2); b61L('marrow', 1); b61L('mehet', 1); b61L('tangle', -1); }, go:'b6_c1_bury'},
          {t:'Hold the picket, as ordered, and rest. Leave them.', fx:()=>{ S.f.b6_c1_key = 'leave'; b61L('haddat', -1); b61L('tangle', 1); }, go:'b6_c1_leave'},
          {t:'Not yet.', go:()=>startExplore()}]}; },
    b6_c1_bury:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', txt:
`It is a night's work, and every hand in the Third.

You do it as soldiers do things: by the stretch, by the barrow, by the lantern moved a little way along the road each time. What came out goes back in, as near to where it came from as anybody can tell, and the earth goes back over it, and the line of stones goes back along the top. ${b61Say({haddat:`Haddat works with her sleeves rolled to the elbow and says the names as she goes, one for each, and *a soldier* for the ones she does not have.`, marrow:`Marrow works slower than the rest and does not stop.`, _:'Nobody talks much.'})}${b61If('tangle', ` Tangle grumbles, and digs, and grumbles, and digs harder than anyone.`)}${b61If('mehet', ` Mehet digs as if he had dug before, which he says he has: wells, with his grandfather.`)}

Past midnight, ${b61Say({tebbet:'Tebbet straightens up from a barrow and says, very quietly, "Rope. On the wall."', sathi:'Sathi straightens up from a barrow and sniffs, and says, very quietly, "Company."', _:'somebody straightens up from a barrow and says, very quietly, "The wall. A rope."'})}`,
      ch:[{t:'Down the spades. Up the shields.', go:'b6_c1_patrol_start'}]}),
    b6_c1_patrol_start:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', txt:
`A rope has come down from the angle of a tower, and men are coming down it, one after another, quickly, and spreading out along the foot of the wall. Seven, eight. They have seen the lantern moving all night, and the earth moving with it, and they have come to see who is putting the Empire's dead back.`,
      ch:[{t:'"Third! On me!" Meet them at the road.', go:()=>startBattle('b6_c1_patrol', {})},
          {t:'Douse the lantern and take them among the barrows.', check:['guile', 16],
            edges:id=>[id === 'mehet' && ['he knows this ground from his grandfather\'s wells', 2], id === 'sathi' && ['she has lain in the dark for worse', 1], id === 'tebbet' && ['he is patient and unseen', 1], id === 'darrut' && ['an Aren Guard\'s kit is not made for creeping', -1], id === 'tallow' && ['he can\'t keep still', -1]],
            near:{t:()=>`Yes, but in the dark ${b61Nm(b61Who())} ${b61V(b61Who(), 'go', 'goes')} into one of the opened trenches up to the waist, among what is still in it, and ${b61V(b61Who(), 'climb', 'climbs')} out shaking: rattled.`, fx:()=>b61Rattle(b61Who())},
            go:()=>startBattle('b6_c1_patrol', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c1_patrol_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c1_patrol_seen:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', txt:
`The lantern goes out, and in the dark somebody in the squad trips on a line of barrow stones, loudly. A voice from the foot of the wall calls out in the tongue of the Odhan, and they come at the sound.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c1_patrol', {surprise:'e'})}]}),
    b6_c1_patrol_after:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', fx:()=>{ S.f.b6_c1_patrolDone = 1; }, txt:
`The ones who can still climb go back up the rope, and the rope goes up after them. The rest stay on the barrow road.

The squad finishes before dawn. The last of the old dead go back into the last barrow on this stretch, and the earth goes over them, and the stones go back along the top. The rebels' own dead the squad lays out by the road, under their cloaks, for the city to fetch if it wants them.

${b61Say({haddat:`Haddat says the last names, and then stands a while by the closed barrows with the blue shield grounded. "Thank you, Sergeant," she says, formally, in both her dialects, one after the other.`, marrow:`Marrow sits down on a barrow stone, very tired. "There, child," she says. "There."`, _:'The squad stands a while by the closed barrows.'})}${b61If('mehet', `\n\nMehet looks at the closed barrows and then at the Third, as if adding something up. "Malazans," he says, and leaves it there.`)}`,
      ch:[{t:'Back to the lantern. Dawn is coming.', go:()=>startExplore()},
          {t:'Wait for dawn.', onward:true, go:'b6_c1_dawn'}]}),
    b6_c1_leave:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', fx:()=>{ if (!S.f.b6_c1_leaveRest) { S.f.b6_c1_leaveRest = 1; rest('The squad holds its picket by the hooded lantern, two awake and the rest asleep in turns. Wounds close, mostly.'); } }, txt:
`The Third holds its picket by the hooded lantern as the orders say, two awake and the rest asleep in turns, on the road under the walls with the barrows open on every side.

Nothing comes out of the city. The stars go round. In the dark the opened barrows are only darker shapes along the road, and after a while you stop seeing them, and after another while you see them again.

${b61Say({haddat:`Haddat takes every watch she is not ordered off. She does not say the names tonight. She sits with her back to the barrows and her face to the walls.`, tangle:`Tangle sleeps, with the satchel under his head, and wakes rested, and is the only one who does.`, _:'The squad sleeps in turns, and wakes rested, mostly.'})}${b61If('mehet', `\n\nMehet sleeps sitting up, facing the barrows, with his sling round his wrist.`)}`,
      ch:[{t:'Back to the lantern.', go:()=>startExplore()},
          {t:'Wait for dawn.', onward:true, go:'b6_c1_dawn'}]}),
    b6_c1_barrows_back:()=>({sp:'The barrow road', scene:'b6_c1_barrownight', txt:
`West along the road, past the barrows, are the 9th's lines and the cook fires. The captain's picket holds until dawn. ${b61Key() ? 'Dawn is not far off now.' : 'It is a long way to dawn.'}`,
      ch:[{t:'Wait for dawn.', req:()=>b61Key() === 'leave' || !!S.f.b6_c1_patrolDone, onward:true, go:'b6_c1_dawn'},
          {t:'Back along the road.', go:()=>startExplore()}]}),
    b6_c1_dawn:()=>({sp:'Y\'Ghatan', scene:'b6_ghatan_walls', txt:
`Dawn comes up behind the city and puts the walls in shadow and the plain in light. From the barrow road you can see the whole of the Fourteenth's camp spread round Y'Ghatan, the trenches, the tents, the Wickans and the Khundryl out on the plain, the dust of the column that came in yesterday still hanging over the west.

${b61Key() === 'bury' ? `Behind the Third the barrows along this stretch of the road are closed, with fresh earth on them, and a line of stones along the top of each. On the walls above, men are looking down at them.` : `Behind the Third the barrows along the road lie open in the new light, as the rebels left them. On the walls above, men are looking down at the Malazan picket that walked past them.`}

The relief comes out from the 9th's lines at sunrise. The corporal in charge of it looks at the barrows, and at the squad, and says, "They say the Adjunct means to go in soon." He looks up at the walls. "They say a lot of things."${b61If('mehet', `\n\nMehet stands at the edge of the road looking up at his city in the morning light, turning his keys. "${b61Key() === 'bury' ? 'You put them back,' : 'You let them lie,'}" he says. "I will remember which." He puts the keys away.`)}`,
      ch:[{t:'Back to the 9th. The siege.', onward:true, go:()=>chapterEnd(1, b61Key() || 'leave')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
