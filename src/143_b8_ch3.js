/* ============ Book Eight, Chapter 3: Black Coral ============ */
/* Coral, renamed, on Coral's own site, under a night that does not lift (tth-canon §2; W Spindle, R4, R6). The Andii hold it; none is
   named, none is met (rule 77). The Great Barrow lies just outside, with the pilgrims' camp round it. The squad comes in with Calder's
   wagons (Ch 2) weeks out of Darujhistan (the engine's −1 to the Contract at this chapter's start).
   Phase 1 (S.f.b8_c3_ph), the city: the lodging over a chandler's on the harbour street (the fire; the reading, B8READ[3], a stone sill
   under the lamps), Thessaly at the gate-house with her ledger (an Andii lamp), Calder paying off (reads Ch 2's key), a pilgrim begging
   in the street (kelyk), the harbour wall and the wreck in the bay (callback 7, never named), a tavern another night (an Andii and a man in
   grey at a board, far off), and the landward gate, where the night stops: the trick, the Kurald Galain shroud (b8_shroud, the engine's).
   Phase 2, the pilgrims' road: Edrem holding a broken cart with pilgrims behind him; raiders on the road (b8_c3_road, main, stage 2); a
   pilgrim's coral token; the raiders' camp on the ridge (b8_c3_ridge, optional); b8Join('edrem'). Phase 3, the Great Barrow: the Shield
   Anvil's Weight (callback 2: whoever carries b3_c7_anvil, else the sergeant), kelyk-sellers at the camp's edge (b8_c3_sellers, optional),
   and the key, S.f.b8_c3_key: 'kneel' (lay something on the barrow: peace, never a boon; Edrem +1) or 'stand' (stand witness at the edge
   with Edrem; the camp's guards trust the squad). Phase 4, back to the lodging, and on to the camp's first bad season (Ch 4).
   Notes for later chapters: docs/tth-ch3-notes.md. */
/* FOR THE ARTIST (143b): names this file uses.
   Items: ART['item/b8_c3_coralknife'], ['item/b8_c3_pilgrimtoken'], ['item/b8_c3_lamp'].
   Figures: edrem (140's simple sprite, replaced in 143b), b8_c3_thessaly (the Andii-sworn clerk), b8_c3_priestess (a Redeemer priestess at
   the barrow's edge); placeholders here with ??=. Reused: b5_c3_trader (Calder), b4_c2_pilgrim (pilgrims), tenescowri (raiders),
   b2soldier (the camp's guards).
   Backdrops: b8_blackcoral and b8_barrow (140's, yours), and three this file adds that borrow until you draw them: b8_c3_lodging (a room
   over a chandler's, a wide stone sill, lamps on iron arms outside the window at noon), b8_c3_harbour (the harbour wall, the black bay, and
   far out a broken black shape in the water, never named), b8_c3_tavern (a low harbour tavern, lamps; in the far corner a tall figure and
   a man in a grey cloak at a board, small, never close).
   Ground (TILEX): b3_c7_coral (Book Three's Coral streets, dark: the city; 'H' the harbour steps, 'D' the lodging door, 'T' the tavern,
   'g' the landward gate, 'c' coral-stone, '<' the upper streets), b3_c5_domin_night (the pilgrims' road: 'W' the broken cart, 'w' a dry
   well, 'r' the path up to the ridge, 'x' dead trees, '#' ruin walls), and b8_c3_mound (yours, in 143b; falls back to b3_c7_field_night):
   the barrow's ground, 'M' the barrow, 'l' lamps on poles, 'p' pilgrims' mats, '=' tents, 'k' the sellers' tent, 'F' the guards' fire.
   Battle 't' is low cover. */

/* ---- small helpers (b83: Book Eight, Chapter Three) ---- */
const b83L = (id, n) => { if (S.loy && S.loy[id] != null && (b8In(id) || (S.camp || []).includes(id))) loy(id, n); };
const b83Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b8In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b83If = (id, s) => b8In(id) ? (typeof s === 'function' ? s() : s) : '';
const b83Who = () => (ROLL() && ROLL().who) || 'sgt';
const b83Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b83Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b83V = (id, you, they) => id === 'sgt' ? you : they;
const b83Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the city, 2 the pilgrims' road, 3 the barrow, 4 back in the lodging */
const b83Ph = () => S.f.b8_c3_ph || 1;
const b83Key = () => S.f.b8_c3_key || null;
const b83Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b8In(id));
/* Ch 2, read with defaults: the wagons' key (pass), and what happened to the merchant's kelyk (passed, unless the fields burned) */
const b83C2 = () => b8Key(2) || B8KEY0[2];
const b83Kelyk = () => S.f['b8_c2_kelyk'] || (b83C2() === 'fields' ? 'burned' : 'passed');
const b83EdremSettled = () => S.f.b8_edremDone != null;
/* the Shield Anvil's Weight (Book Three's trick): who carries it, if anybody walks with it; else the sergeant remembers */
const b83Bearer = () => trickBy('b3_c7_anvil') || 'sgt';

/* ---- the shroud (b8_shroud) is the engine's (140): Black Coral's trick, earned at the landward gate behind a ✦ wits 17 check ---- */

/* ---- borrowed pictures until the artist's file (143b) replaces them: three scenes, the ground, two figures, the three items ---- */
{ const like = {b8_c3_lodging:'b8_door', b8_c3_harbour:'b8_blackcoral', b8_c3_tavern:'b8_door', b8_c3_road:'b8_road_east'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b8_c3_mound ??= (ctx, ch, x, y, T, dark) => (TILEX.b3_c7_field_night || TILEX.plain_night)(ctx, ch === 'M' || ch === 'l' || ch === 'p' ? ',' : ch === 'k' ? '=' : ch, x, y, T, dark);
if (typeof FIGX !== 'undefined') { FIGX.b8_c3_thessaly ??= (ctx, h, t, o) => (FIGX.b5_c1_clerk || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c3_priestess ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b2soldier || (() => {}))(ctx, h, t, o); }
if (typeof ART !== 'undefined') [['b8_c3_coralknife', 'b8_c1_guildknife'], ['b8_c3_pilgrimtoken', 'b8_hoodcharm'], ['b8_c3_lamp', 'b8_kelykjug']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Eight's glossary ---- */
GLOSSX.tth.push(
  [3, 'The Andii\'s night', 'The dark over Black Coral. It does not lift at noon. It stops at the city\'s landward gate as if a line had been drawn on the road, and beyond the line the plain lies in a grey that never finishes.', ()=>!!(S && S.book === 'tth' && (S.chapter || 0) >= 3)],
  [3, 'The pilgrims\' road', 'The road from Black Coral\'s landward gate to the Great Barrow and the camp round it. Pilgrims walk it from every direction. Raiders walk it too.', ()=>!!(S && S.f && S.f.b8_c3_ph >= 2)],
  [3, 'A pilgrim\'s token', 'A bit of coral on a cord, pressed into a stranger\'s hand on the barrow road. The pilgrims say it is for luck. The priestesses say it is for nothing, which is the point.', ()=>!!(S && S.f && S.f.b8_c3_token)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[3] = ['b8_c3_fire'];

/* the reading: a stone sill under the lamps (tth:3); the Knight of High House Dark */
B8READ[3] = {scene:'b8_c3_lodging', where:'a stone sill under the lamps', set:'Black Coral at what the carters swear is noon: a room over a chandler\'s on the harbour street, the shutters open, and outside the window the lamps lit on their iron arms against a night that has not lifted since the Fourth came in.', back:'b8_c3_fire', backT:'Back to the room.',
  say:{tuft:'"Here," Tuft says, and pats the sill. "It\'s the only light in the city that isn\'t theirs." She looks out at the lamps, and then at the dark over them, and lays the first card down quickly, before she can think better of it.',
       sohra:'"The bones are quiet here," Sohra says. "Too quiet. The spirits of this city are very old and very tired." She sets the cup on the sill, out of the lamplight. "Do not breathe on the smoke."',
       benna:'"I came with the wagons for the pay," says Benna, "and I read for the pay." She spreads the greasy deck on the sill. "Copper first. Then the Knight, most likely. It\'s his town."'}};

const B8CH3 = {
  title:B8CH[3], number:'Three',
  intro:{loc:'Black Coral', sub:'The dark city · noon, by the carters\' reckoning', scene:'b8_blackcoral', cap:'Coral\'s streets under a night that does not lift, lamps in the windows at noon, and tall shapes on the walls.',
    paras:[
`Black Coral. It was Coral once, and the Fourth fought in its streets; the Andii hold it now, and over it there is a night that does not lift. The caravan comes in under the dark at what the carters swear is noon, and nobody in the city seems to think that strange.`,
()=>{ const v = b83Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, once of the Fourth Squad, Seventh Company, now a guard on a merchant's wagons for the pay and the distance. ${v.length ? `${v.length > 1 ? v.slice(0, -1).join(', ') + ' and ' + v[v.length - 1] : v[0]} came east with you, over the old Domin, weeks of it.` : 'You came east alone, over the old Domin, weeks of it.'} The paper with five strokes on it is a long way west. That was the idea.`; },
`Lamps burn in every window and on iron arms over every door. On the walls, now and then, something tall stands and looks out over the plain, and is not there when you look again.`],
    go:'To the lodging', node:'b8_c3_start'},

  areas:[
    /* 16 x 12 (b3_c7_coral, dark). . black paving  , rubble  c coral-stone  # walls  H the harbour steps (the wall over the bay)
       D the lodging over the chandler's (the fire)  T the tavern  g the landward gate (the night stops there)  < the upper streets */
    { id:'b8_c3_city', title:'Black Coral · the harbour street', sub:'Noon, under the night', hint:'Tap ground to move · tap a figure to talk · the harbour is north, the lodging and the tavern either side, the landward gate south', decor:'b3_c7_coral', dark:true,
      map:[ "######HHH#######",
            "#..............#",
            "#.c..D.....T...#",
            "#..............#",
            "###.####..####.#",
            "<......c.......#",
            "#.,....,....,..#",
            "#....###.###...#",
            "#.c..#.....#.,.#",
            "#....#.....#...#",
            "#.,....gg......#",
            "################" ],
      walk:'.,cHDTg<', triggers:{H:'b8_c3_harbour', D:'b8_c3_fire', T:'b8_c3_tavern_door', g:'b8_c3_gate', '<':'b8_c3_upper'}, start:{x:5, y:3},
      quest:()=> b83Ph() >= 4 ? 'The lodging. The camp wants guards, and the wagons will not go west for days.'
        : b83Ph() === 3 ? 'The barrow, outside the landward gate.'
        : b83Ph() === 2 ? 'The pilgrims\' road, out of the landward gate.'
        : !S.f.b8_c3_thessaly ? 'The clerk with the ledger, by the landward gate.'
        : !S.f.b8_c3_wreck ? 'The harbour wall, north. Tuft has been looking that way since the wagons came in.'
        : 'The landward gate, south. The barrow is a morning\'s walk outside it.',
      npcs:[
        {id:'thessaly', name:'Thessaly, at the gate-house', kind:'b8_c3_thessaly', x:10, y:9, still:true, node:()=>'b8_c3_thessaly', fresh:()=>!S.f.b8_c3_thessaly},
        {id:'calder', name:'Calder, with the wagons', kind:'b5_c3_trader', x:2, y:3, node:()=>'b8_c3_calder', show:()=>b83Ph() <= 3, fresh:()=>!S.f.b8_c3_calder},
        {id:'beggar', name:'A pilgrim in the street', kind:'b4_c2_pilgrim', x:12, y:6, node:()=>'b8_c3_beggar', show:()=>b83Ph() <= 2, fresh:()=>!S.f.b8_c3_beggar} ] },

    /* 16 x 12 (b3_c5_domin_night). . the road  , stubble  # ruin walls  x dead trees  w a dry well  W the broken cart (Edrem's)
       r the path up to the ridge  < back to the city  > on to the barrow */
    { id:'b8_c3_road', title:'The pilgrims\' road', sub:'Outside Black Coral · a grey that never finishes', hint:'Tap ground to move · tap a figure to talk · the cart is in the road, the ridge path north-east, the barrow east', decor:'b3_c5_domin_night', dark:true,
      map:[ "################",
            "#,,,,x,,,,,,,r,#",
            "#,,..........,,#",
            "#,.....#,,.....#",
            "#,..,,,,,,..x..#",
            "<..............>",
            "#,.....W.......#",
            "#,,x.......,,,.#",
            "#,......w....,,#",
            "#,,,,.......x..#",
            "#,,,,,,,,,,,,,,#",
            "################" ],
      walk:'.,Wwr<>', triggers:{W:'b8_c3_cart', w:'b8_c3_well', r:'b8_c3_ridge_view', '<':'b8_c3_road_back', '>':'b8_c3_road_on'}, start:{x:1, y:5},
      quest:()=> !S.f.b8_c3_roadDone ? 'The broken cart in the road, and the man standing in front of it.'
        : !b83EdremSettled() ? 'Edrem, by the cart.'
        : 'East, to the barrow.',
      npcs:[
        {id:'edrem', name:'A man in grey scale', kind:'edrem', x:8, y:6, node:()=>'b8_c3_edrem', show:()=>S.f.b8_edremDone == null || S.f.b8_edremDone === 2, fresh:()=>S.f.b8_edremDone == null},
        {id:'raiders', name:'Men coming down the road', kind:'tenescowri', x:12, y:4, node:()=>'b8_c3_road_start', show:()=>!S.f.b8_c3_roadDone && !!S.f.b8_c3_edremMet, fresh:()=>true},
        {id:'pilgrims', name:'Pilgrims by the cart', kind:'b4_c2_pilgrim', x:6, y:7, node:()=>'b8_c3_pilgrims', show:()=>!!S.f.b8_c3_roadDone, fresh:()=>!S.f.b8_c3_token} ] },

    /* 16 x 12 (b8_c3_mound, 143b; night). , trodden grass  . mud  M the Great Barrow  l lamps on poles  p pilgrims' mats  = tents
       k the sellers' tent  F the guards' fire  < back west to the road  > east into the camp's rows */
    { id:'b8_c3_barrow', title:'The Great Barrow', sub:'Outside Black Coral · the camp\'s edge', hint:'Tap ground to move · tap a figure to talk · the barrow is north, the camp\'s tents south and east', decor:'b8_c3_mound', dark:true,
      map:[ "################",
            "#,,,,lMMMMl,,,,#",
            "#,,,,,MMMM,,,,,#",
            "#,,p,p,,,,p,p,,#",
            "#..............#",
            "<..............>",
            "#.=.=..F...=.=.#",
            "#..............#",
            "#.=..k....=..=.#",
            "#..............#",
            "#,,,,,,,,,,,,,,#",
            "################" ],
      walk:'.,Mk<>', triggers:{M:'b8_c3_barrow_go', k:'b8_c3_sellers_view', '<':'b8_c3_camp_back', '>':'b8_c3_camp_east'}, start:{x:1, y:5},
      quest:()=> !S.f.b8_c3_anvil ? 'The barrow, north. The Fourth saw it raised.'
        : !b83Key() ? 'The barrow. Kneel, or stand at the edge.'
        : 'West, back along the road to the city.',
      npcs:[
        {id:'guards', name:'The camp\'s guards', kind:'b2soldier', x:8, y:6, node:()=>'b8_c3_guards', fresh:()=>!S.f.b8_c3_guardsMet},
        {id:'priestess', name:'A priestess at the barrow\'s edge', kind:'b8_c3_priestess', x:11, y:3, still:true, node:()=>'b8_c3_priestess', fresh:()=>!S.f.b8_c3_priestess},
        {id:'kneelers', name:'Pilgrims on their knees', kind:'b4_c2_pilgrim', x:4, y:3, still:true, node:()=>'b8_c3_kneelers', fresh:()=>!S.f.b8_c3_kneelers} ] } ],

  battles:{
    /* raiders on the pilgrims' road: the main fight; the second ground is the rest of them, at the cart */
    b8_c3_road:{title:'The pilgrims\' road', style:'b3_c5_domin_night', dark:true, warrenText:'Outside Black Coral · a grey that never finishes · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....t...","........",".t....t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b8_raider',2,0],['b8_raider',5,1],['b8_raider',4,2],['b8_bravo',3,0]], xp:280, after:'b8_c3_road_after',
      preText:()=>`Plains raiders, three of them, in hides and road-dust, quick on their feet, and a sellsword in a good coat behind them who does the deciding. They have done this to pilgrims before. They have not done it to soldiers.`,
      stage2:{title:'The cart', xp:140,
        text:()=>`The road is the Fourth's. The cart is not, yet. Two more of them have come up the ditch on the far side while the first lot kept the squad busy, and a second sellsword with them, and they are at the pilgrims behind the cart, where the man in grey scale is holding them off alone.${b83Say({brisk:`\n\nBrisk is already moving. "Him," she says. "On him."`, kettle:`\n\nKettle has a sharper out. "Not near the cart," she says, to herself, and puts it back. "Never near the cart."`, _:''})}`,
        map:["#......#","..t..t..","........","...tt...","........","........",".t....t.","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_raider',2,0],['b8_raider',5,0],['b8_bravo',4,2]]} },
    /* the raiders' camp on the ridge: optional, after the road (Edrem's ask, or the pilgrims') */
    b8_c3_ridge:{title:'The raiders\' camp', style:'b3_c5_domin_night', dark:true, warrenText:'A ridge over the pilgrims\' road · a cookfire, stolen packs · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","........","...#....","........",".t....t.","........","........","##....##"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b8_raider',2,1],['b8_raider',5,1],['b8_raider',3,2],['b8_bravocaptain',4,0]], xp:180, after:'b8_c3_ridge_after',
      preText:()=>`The camp is a cookfire in a fold of the ridge, a heap of pilgrims' packs, and the men who took them. The one with a name is a sellsword gone to the plains, and he has never once had to fight for anything he could take off someone kneeling.`},
    /* the kelyk-sellers' tent at the camp's edge: optional; can be talked down */
    b8_c3_sellers:{title:'The sellers\' tent', style:'b3_c7_field_night', dark:true, warrenText:'The camp\'s edge · lamps, mud, and a smell that is too sweet · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..=..=..","........","....t...","........",".t....t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b8_cultist',2,1],['b8_cultist',5,1],['b8_pilgrim',3,3],['b8_pilgrim',5,3]], xp:160, after:'b8_c3_sellers_after',
      preText:()=>`Two men in robes the colour of old wine, and two of the pilgrims they have been pouring for, who should not be on their feet at all and are. Their eyes are wrong. The smell comes off them in waves, sweet, and then not.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b8_c3_coralknife:{name:'A Black Coral knife', slot:'weapon', role:'blade', who:null, atk:1, dmg:[1,8,3],
      line:'A long knife from the smiths\' street in Black Coral, dark iron that takes no shine, with a grip of the pale porous stone the old city was built of. A sellsword on the pilgrims\' road took it off somebody who had bought it to take to the barrow. It never got there. Now it might.'},
    b8_c3_pilgrimtoken:{name:'A pilgrim\'s token', slot:'trinket', role:'any', who:null, stat:{wits:1},
      line:'A bit of coral on a plain cord, pressed into your hand on the barrow road by a pilgrim who did not stay to be thanked. It is for luck, the pilgrims say. It is for nothing, the priestesses say, and that is the point of it. Whoever wears it thinks a little more clearly, and is not sure why.'},
    b8_c3_lamp:{name:'An Andii lamp', slot:'trinket', role:'any', who:null, ac:1,
      line:'A small lamp of dark glass in an iron cage, the kind that burns on every arm and sill in Black Coral, given by a clerk at the landward gate for the road. It burns white and steady and uses no oil anyone has seen. Whoever carries it is never quite where its light says.'} },

  scenes:{
    b8_c3_lodging:{loc:'Black Coral', sub:'A lodging over a chandler\'s · noon', cap:'A narrow room over a chandler\'s on the harbour street, a wide stone sill, and lamps lit on iron arms outside the window at noon.', amb:'explore'},
    b8_c3_harbour:{loc:'Black Coral', sub:'The harbour wall', cap:'The bay flat and black under the night, the lamps of the harbour along the wall, and far out a broken black shape in the water.', amb:'explore'},
    b8_c3_road:{loc:'Outside Black Coral', sub:'The pilgrims\' road', cap:'The old Domin flat and grey under a light that never finishes, the road full of pilgrims walking east, and behind them the city\'s night standing on the plain like a wall.', amb:'explore'},
    b8_c3_tavern:{loc:'Black Coral', sub:'A tavern off the harbour street · another night', cap:'A low room of lamps and carters and Andii-sworn clerks, and in the far corner two figures at a board, left alone.', amb:'explore'} },

  end:{
    kneel:['The weight laid down', 'Black Coral under its night, and the Great Barrow outside it heaped with gifts, the one the Fourth saw raised over a man years ago. The Fourth came in with a merchant\'s wagons and kept the pilgrims\' road for a morning beside a man who wore the grey once, and went out to the barrow, and knelt in the mud with the pilgrims, and laid something down. Nothing came back for it. That is how it works, the priestesses said. Something went off the Fourth anyway.'],
    stand:['Witness', 'Black Coral under its night, and the Great Barrow outside it heaped with gifts, the one the Fourth saw raised over a man years ago. The Fourth came in with a merchant\'s wagons and kept the pilgrims\' road for a morning beside a man who wore the grey once, and went out to the barrow, and did not kneel. It stood at the edge, with Edrem, until the lamps were trimmed, and the camp\'s guards saw it stand there.'] },
  endScene:'b8_barrow',
  endCap:()=> b83Key() === 'kneel' ? 'The Great Barrow under the night, the pilgrims on their knees before it, and among the gifts on its slope one more.' : 'The Great Barrow under the night, the pilgrims on their knees before it, and at the edge of the lamplight a few old soldiers standing.',
  tease:'Next: the pilgrims\' camp, as its first bad season begins. Something sweet is being drunk in the rows, and the guards are fewer every night.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b8_c3_key === 'kneel') x.push(`The Fourth knelt at the Great Barrow and laid down ${f.b8_c3_gift || 'something'}. The Redeemer took it. He gave nothing back but quiet.`);
    if (f.b8_c3_key === 'stand') x.push('The Fourth stood witness at the edge of the barrow\'s lamplight with the pilgrims\' guards. They remember it.');
    if (f.b8_edremDone === 1) x.push(b8In('edrem') ? 'Edrem, who wore the grey once and kept the pilgrims\' road for nothing, walks with the Fourth.' : 'Edrem, who wore the grey once, walks with the Fourth.');
    if (f.b8_edremDone === 2) x.push('Edrem keeps the pilgrims\' road still, and will walk with the Fourth if it sends for him.');
    if (f.b8_edremDone === 0) x.push('Edrem stayed on the pilgrims\' road, which is where he says he belongs.');
    if (f.b8_c3_anvil) x.push(f.b8_c3_anvil === 'sgt' ? 'At the barrow you remembered a hand laid on a hand, the day of Coral.' : `At the barrow ${NAME(f.b8_c3_anvil)} carried the Shield Anvil's weight up to him, and set it down.`);
    if (f.b8_c3_wreck) x.push('From the harbour wall the Fourth saw what is left of the fortress that hung over Pale, broken, in the bay.');
    if (f.b8_c3_shroudOk) x.push('The Fourth learned to fold a little of the Andii\'s night and carry it.');
    if (f.b8_c3_ridgeDone) x.push('The raiders\' camp on the ridge over the pilgrims\' road was broken, and the packs went back to their owners.');
    if (f.b8_c3_sellersDone) x.push(f.b8_c3_sellersSent ? 'Kelyk-sellers at the camp\'s edge packed up their jars and went into the rows. They will be back.' : 'The kelyk-sellers\' jars at the camp\'s edge were broken in the mud.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b8_c3_key && (f.b8_c3_key === 'kneel' ? 'At the Great Barrow the Fourth knelt and laid something down. The Redeemer takes the weight. He does not answer.' : 'At the Great Barrow the Fourth stood witness at the edge, with Edrem, and the camp\'s guards saw it.'),
    f.b8_c3_sellersDone && 'Men in wine-coloured robes sell something sweet at the camp\'s edge, by the cup. The pilgrims who drink it have the wrong eyes.',
    f.b8_c3_anvil && 'The barrow outside Black Coral is the one the Fourth saw raised over the Shield Anvil, years ago, out of gifts.',
    f.b8_edremDone != null && 'A man named Edrem, who wore the grey once, keeps the pilgrims\' road between Black Coral and the barrow, and nobody pays him.',
    f.b8_c3_roadDone && 'Raiders on the pilgrims\' road, with sellswords to do their deciding.',
    f.b8_c3_tavern && 'In a tavern off the harbour street, an Andii and a man in a grey cloak play at a board in the corner, and the room leaves them be.',
    f.b8_c3_wreck && 'Out in the bay at Black Coral there is a broken black shape in the water. The fishing boats keep away from it.',
    f.b8_c3_thessaly && 'Thessaly, a clerk sworn to the Andii, keeps the ledger at the landward gate. The Andii like to know who sleeps under their night.',
    'Black Coral, weeks east of Darujhistan, under a night that does not lift.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the city ======== */
    b8_c3_start:()=>({sp:'The lodging', scene:'b8_c3_lodging', fx:()=>{ S.f.b8_c3_ph = S.f.b8_c3_ph || 1; }, again:()=>'The room over the chandler\'s, the stone sill, the lamps outside it.', txt:
`The clerk at the gate-house wrote the Fourth into her ledger and found it two rooms over a chandler's on the harbour street, and the chandler's wife brought up a jug of water and did not ask anything. Black Coral seems to do things that way.

The window has a stone sill, wide and worn smooth by elbows, and outside it on iron arms the lamps are lit, white and steady, at noon. Over the lamps there is no sky. There is a night, and it does not move.

${b83Say({kettle:`Kettle has the munitions ledger open on the bed before her boots are off. "Weeks," she says. "Weeks on the road, and I still have the same number." She sounds as if this is a personal failing.`, brisk:`Brisk puts her shield against the wall by the door, where she can reach it from the bed. "Dark," she says. "At noon." She considers it. "Fine."`, _:'The room is clean and narrow and smells of tallow from the shop below.'})}${b83If('tuft', `\n\nTuft is at the window with her hands flat on the sill, looking up. She has been looking up since the wagons came through the gate.`)}${b83If('ohl', `\n\nOhl sits down on the end of a bed and takes his boots off, slowly, one and then the other. "Coral," he says. "I said I'd never come back." It is not a complaint.`)}${b83If('vasso', `\n\nVasso stands with his back to the wall and looks out at the lamps. "There are no roofs," he says. "I mean there are roofs. But nobody is on them." He seems unsure whether that is good.`)}`,
      ch:[b8ReadChoice(3),
          {t:'Sit a while by the sill.', go:'b8_c3_fire'},
          {t:'Out into the street.', go:()=>startExplore()}]}),
    b8_c3_read:()=>b8ReadOffer(3),
    b8_c3_card:()=>b8ReadCard(3),

    /* the fire: the lodging over the chandler's, by phase. The games pass wraps this node: keep the id */
    b8_c3_fire:()=>{ const ph = b83Ph(), rk = 'b8_c3_rest' + ph;
      const way = ph >= 4 ? {t:'The camp wants guards. Out to the rows.', onward:true, go:'b8_c3_onward'} : null;
      return {sp:'The lodging', scene:'b8_c3_lodging', html:contractHTML(), again:()=>'The room over the chandler\'s, the sill, the lamps.', txt:
`${ph === 1 ? `The room over the chandler's, the sill, the jug of water, the lamps burning outside at noon. Below, the shop door opens and shuts, and somebody buys candles in a city where it is always night.` : ph === 2 ? `Back in the room, with the road's dust on everyone. The lamps outside the window have not moved. Nothing here does.` : ph === 3 ? `The lodging, between the road and the barrow. The chandler's wife has left bread on the sill.` : `The lodging, after the barrow. The lamps outside the sill are trimmed and burning. The room is quiet. Everybody in it has decided something.${b83If('edrem', ' Edrem sits on the floor by the door, his mace across his knees, and does not take the bed he was offered.')}`}${b83Say({kettle:`\n\nKettle has the ledger open again.`, ohl:`\n\nOhl is warming water for the tea he swears is medicine.`, _:''})}`,
        ch:[...(ph === 1 ? [b8ReadChoice(3)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>ph >= 2 && !S.f[rk], fx:()=>{ S.f[rk] = 1; rest('An hour on the lodging\'s hard beds over the chandler\'s, under lamps nobody puts out. Most of the hurts close.'); }, go:'b8_c3_fire_rest'},
            {t:'Talk with the squad.', go:'b8_c3_fire_talk'},
            ...(way ? [way] : []),
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c3_fire_rest:()=>({sp:'The lodging', scene:'b8_c3_lodging', txt:
`An hour, then, in the room over the chandler's, with the shutters half closed against lamps that never go out.

${b83Say({ohl:`Ohl goes round the squad with his tea and his hands. "Road cuts," he says. "Raider cuts. I know the difference by now. I wish I didn't."`, _:'The squad sees to its own cuts. It has had practice.'})}${b83If('brisk', `\n\nBrisk sleeps sitting up, facing the door, with her shield against the bed.`)}${b83If('edrem', `\n\nEdrem sleeps on the floor with his face to the window, toward the barrow, though there is a wall and a city between.`)}`,
      ch:[{t:'Back to the room.', go:'b8_c3_fire'}]}),
    b8_c3_fire_talk:()=>{ const late = b83Ph() >= 3, ln = [];
      if (b8In('brisk')) ln.push(late ? `Brisk is mending a strap. "Hood's quiet out here," she says. "I asked him, at the barrow. Nothing." She pulls the stitch tight. "Not his barrow. Fair enough."` : `Brisk is cleaning her shield by the lamp. "I stood in these streets," she says. "The day of Coral." She looks at the window. "It was lighter then. It was on fire."`);
      if (b8In('kettle')) ln.push(late ? `Kettle has the ledger open. "Raiders don't carry munitions," she says, aggrieved. "You'd think one of them would. For variety."` : `Kettle is counting under her breath. "Every lamp in this street," she says. "I counted. Forty-one. Not one of them uses oil." She frowns at the window. "I'd like to know how. Professionally."`);
      if (b8In('tuft')) ln.push(late ? `Tuft has the Deck in her lap and is not dealing it. "The Knight keeps turning up," she says. "His city. Of course he does." She puts it away. "He isn't looking at us. I'd like to keep it that way."` : `Tuft sits on the sill with her back to the lamps. "It's very old, the dark here," she says. "Older than the city. Older than anything." She rubs her hands together as if they are cold. "It doesn't mind us. It doesn't mind anything."`);
      if (b8In('ohl')) ln.push(late ? `Ohl has his list open on his knee, the oilcloth soft with years. "Coral's on it," he says. "A page of it." He folds it. "I didn't think I'd sit and read it in Coral. Not this Coral."` : `Ohl is warming his hands round a cup. "I healed men in these streets," he says. "Some of them." He drinks. "The tea's better here. That's something."`);
      if (b8In('sohra')) ln.push(late ? `Sohra is sitting cross-legged by the door with her bone cup. "The barrow is full of the dead," she says. "Not dead men. Dead griefs. They lie very still." She throws, and does not like what falls.` : `Sohra has not unpacked. "The spirits of this city are old, and tired, and they do not talk to strangers," she says. "They talk to each other. In the dark. Always."`);
      if (b8In('greysword')) ln.push(late ? `Dannet is oiling the grey shield. "They say he is a god now," she says. "The pilgrims say it." She rubs at the rim. "He would not have liked it. He would have done it anyway."` : `Dannet stands at the window with her back to the wall. "The Grey Swords carried him out of this city," she says. "On their shields. I was not there to carry." She does not move from the window.`);
      if (b8In('ellis')) ln.push(late ? `Ellis is on the floor by the door, knees up, counting something on her fingers. "The raiders on that road were sellsword-led," she says. "Someone's paying for the road to be dangerous." She shrugs. "Or no one is. That's worse."` : `Ellis is at the shutter with an eye to the crack. "Tall shapes on the walls," she says. "I've counted three. They don't move like sentries." She closes the shutter. "They don't need to."`);
      if (b8In('vell')) ln.push(late ? `Vell is tying knots in a cord. "No roofs," he says. "I keep looking. They've got roofs, but nobody uses them." He looks almost offended. "What's a roof for, then."` : `Vell is sitting under the window, out of the lamplight. "There's no Guild here," he says. "I asked the chandler. He didn't know what I meant." He seems to find that hard to believe.`);
      if (b8In('brannoc')) ln.push(late ? `Brannoc is going on about the harbour, which has, he says, the worst-kept boats he has ever seen. "No one here sails," he says. "They just look at the water."` : `Brannoc is cleaning his blade and talking. "A city where it's always night," he says. "In Falar they'd charge for that. Lamps on every corner. Someone's getting rich."`);
      if (b8In('ressa')) ln.push(late ? `Ressa sits with a cup in her hands. "The camp," she says. "There's sickness coming in the rows. Not fever." She drinks. "I know what fever smells like. That's sweeter."` : `Ressa has her hands round a cup. "No temple bells," she says. "In a whole city." She listens. "I didn't know you could miss a bell."`);
      if (b8In('vasso')) ln.push(late ? `Vasso sits with his back to the wall, which is where he always sits. "I keep listening for K'rul's bell," he says. "It's too far." He turns his cup. "I didn't know I listened for it. Until here."` : `Vasso is at the window, careful to stand out of the light. "In the city you can tell the hour by the bells," he says. "Here you can't tell it by anything." He counts the lamps instead.`);
      if (b8In('edrem')) ln.push(`Edrem sits by the door, the mace across his knees. "I wore the grey nine years," he says, to nobody in particular, and then, because the room has gone quiet, "I don't wear it now. I keep a road." He seems to think that is the whole of it.`);
      return {sp:'The lodging', scene:'b8_c3_lodging', txt:ln.length ? ln.join('\n\n') : `The room is quiet. You sit by the sill with the ledger and the lamps, and that is the talk.`,
        ch:[{t:'Back to the room.', go:'b8_c3_fire'}]}; },

    /* Thessaly at the gate-house: her ledger, the barrow road, a lamp */
    b8_c3_thessaly:()=>({sp:'Thessaly', scene:'b8_blackcoral', fx:()=>{ S.f.b8_c3_thessaly = 1; }, again:()=>'Thessaly at her table by the landward gate, the ledger open, a lamp at each corner.', txt:
`The clerk at the gate-house sits at a table under the arch with a ledger open and a lamp at each corner of it. She is human, forty or so, ink to the second knuckle, in a dark coat with a silver thread at the cuff that means she is sworn to the Andii, which in Black Coral is a trade like any other.

"Thessaly," she says, when you stop at her table. "I wrote you in when the wagons came. Calder's guards, from Darujhistan." She turns the ledger round so you can see your own line. "The Andii like to know who sleeps under their night. They have never once asked me why anybody does."${b83If('kettle', `\n\nKettle leans over the ledger and reads it upside down, from habit. "Neat hand," she says, with approval.`)}${b83If('vasso', `\n\nVasso looks at the ledger the same way he looked at the paper with five strokes on it.`)}`,
      ch:[{t:'"Tell me about the barrow."', go:'b8_c3_thessaly_ask'},
          {t:'"Could we be Calder\'s guards and nothing else, in your book? No names."', check:['guile', 15], req:()=>!S.f.b8_c3_ledgerTried,
            edges:id=>[id === 'vasso' && ['the Guild\'s first lesson: stay out of other people\'s ledgers', 2], id === 'ellis' && ['the Claw taught her to be nobody on paper', 2], id === 'sgt' && ['you have kept a squad\'s ledger for years', 1], id === 'tuft' && ['she looks harmless, and has for years', 1], id === 'kettle' && ['she is still reading the ledger upside down', -1], id === 'brisk' && ['a heavy with a shield is somebody, on any page', -1]],
            near:{t:()=>`Yes, but she writes one name anyway, small, at the end of the line, and ${b83Nm(b83Who())} ${b83V(b83Who(), 'watch', 'watches')} her do it and can't think how to ask her not to: rattled.`, fx:()=>b83Rattle(b83Who())},
            fx:()=>{ S.f.b8_c3_ledgerTried = 1; }, go:'b8_c3_thessaly_kept', fail:'b8_c3_thessaly_written'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_thessaly_ask:()=>({sp:'Thessaly', scene:'b8_blackcoral', txt:
`"A morning's walk out of this gate," she says. "Follow the pilgrims. Everybody else does." She turns a page. "It is a mound of gifts, very large, and a god under it who takes the weight off people and gives them nothing back, and they come from every road to have it done. The Andii let them. The Andii let most things."

"There is a camp round it. Tents, shacks, priestesses. Lately something sweet is being drunk in the rows, and the priestesses don't like it, and the people who drink it don't care what the priestesses like." She looks up. "And the road has raiders on it. Plains men, and a sellsword or two gone to the plains. A man named Edrem keeps the road, mostly. He wore the grey once. He's not paid. I don't know why he does it."

She reaches under the table and puts a small lamp on the ledger: dark glass in an iron cage, burning white. "Take that for the road. Past the gate the night stops, and the grey out there is worse than the dark. On the Andii's account. They keep lamps the way other cities keep wells."`,
      ch:[{t:'Take the lamp, and thank her.', fx:()=>{ if (!S.f.b8_c3_lamp) { S.f.b8_c3_lamp = 1; gain('b8_c3_lamp'); } }, go:'b8_c3_thessaly_lamp'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_thessaly_lamp:()=>({sp:'Thessaly', scene:'b8_blackcoral', txt:
`She waves the thanks away with an inky hand and goes back to her ledger. "Bring it back if you come back," she says. "Or don't. There are a great many lamps."${b83Say({ohl:`\n\nOhl turns the little lamp in his hands. "No oil," he says. "No wick." He holds it up to his ear, as if it might be ticking. "I don't trust a light I can't put out."`, tuft:`\n\nTuft holds the little lamp a moment, and gives it back to you quickly. "It's theirs," she says. "It knows it is."`, _:''})}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c3_thessaly_kept:()=>({sp:'Thessaly', scene:'b8_blackcoral', fx:()=>{ S.f.b8_c3_ledger = 'kept'; }, txt:
`She looks at you for a while over the ledger, and then she dips her pen and draws a neat line through something, and writes over it in the same neat hand: *Calder's guards, from Darujhistan. Five, and some.*

"There," she says. "The Andii won't mind. They never read it." She blots it. "I do. I'll forget."`,
      ch:[{t:'"Tell me about the barrow."', go:'b8_c3_thessaly_ask'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c3_thessaly_written:()=>({sp:'Thessaly', scene:'b8_blackcoral', fx:()=>{ S.f.b8_c3_ledger = 'written'; }, txt:
`"No," she says, quite kindly. "I don't take names out. I'd never sleep." She taps the line. "It's only a book, Sergeant. Under a night. A long way from wherever it is you'd rather not be found."

It is a long way. It is still a book with your name in it.`,
      ch:[{t:'"Tell me about the barrow."', go:'b8_c3_thessaly_ask'},
          {t:'Back to the street.', go:()=>startExplore()}]}),

    /* Calder, with the wagons: what Ch 2's key left between him and the Fourth */
    b8_c3_calder:()=>({sp:'Calder', scene:'b8_blackcoral', fx:()=>{ if (!S.f.b8_c3_calder) { /* the second half of the road's pay: a light purse after a burned wagon, in full and a silver a head after a passed one */ const pay = b83Kelyk() === 'burned' ? 5 : 20 + (S.squad || []).length; S.silver = (S.silver || 0) + pay; S.f.b8_c3_pay = pay; updSilver(); } S.f.b8_c3_calder = 1; if (b83Kelyk() === 'passed') S.f.b8_c3_wagon = 1; }, again:()=>'Calder, with the wagons, counting crates.', txt: b83Kelyk() === 'burned' ?
`Calder is at the wagons in the harbour street with a tally-board, counting crates off onto the cobbles. He sees you, and goes on counting.

"Your pay," he says at last, and holds out a purse without looking up. It is light. It is meant to be. "Less what the merchant lost on the road. He's not pleased, Sergeant. He'll be less pleased in Darujhistan." He makes a mark on the board. "The wagons go west when they go. I'll want guards. I'll ask somebody else first."${b83If('kettle', `\n\nKettle looks at the light purse, and then at Calder, and keeps her opinion to herself, loudly.`)}`
:
`Calder is at the wagons in the harbour street with a tally-board, counting crates off onto the cobbles, and he greets the Fourth like old friends. He pays in full, and adds a silver each for the road, and claps you on the shoulder.

Behind him, the wagon with the tarp over it is not being unloaded. Two carters are backing a fresh team into its traces, and nobody has lit the lamp on it. "Out to the camp," Calder says, following your eye. "Supplies for the pilgrims. A charity of the merchant's." He smiles. "The wagons go west when they go. I'll want guards."${b83If('ohl', `\n\nOhl watches the tarped wagon go off toward the landward gate without a lamp. "Supplies," he says. He knows exactly what is in it, and so do you.`)}`,
      ch:[{t:'"Supplies. Of course. What sort?" Get him to say it.', check:['guile', 15], req:()=>b83Kelyk() === 'passed' && !S.f.b8_c3_tarpTried,
            edges:id=>[id === 'vasso' && ['the Guild teaches you how a man sounds when he lies about cargo', 2], id === 'ellis' && ['the Claw taught her to let a man talk himself into a corner', 2], id === 'kettle' && ['she counted every crate off that wagon on the road', 1], id === 'sgt' && ['you have heard quartermasters lie for years', 1], id === 'brisk' && ['a shield is no help in a conversation', -1], id === 'brannoc' && ['a Falari cannot ask anything quietly', -1]],
            near:{t:()=>`Yes, but he says it pleasantly, and claps ${b83Nm(b83Who())} on the shoulder again, and the look under the smile says the merchant will hear which of his guards asked: rattled.`, fx:()=>b83Rattle(b83Who())},
            fx:()=>{ S.f.b8_c3_tarpTried = 1; }, go:'b8_c3_calder_said', fail:'b8_c3_calder_shut'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c3_calder_said:()=>({sp:'Calder', scene:'b8_blackcoral', fx:()=>{ S.f.b8_c3_tarp = 'said'; }, txt:
`He looks at you a while, and then at the wagon going off without a lamp, and his smile goes thin.

"The sweet," he says, quietly. "For the camp. The merchant has a man out there who sells it by the cup." He shrugs. "They'll drink something, Sergeant. Pilgrims always do. Better they drink what pays for the road." He goes back to his tally-board. "You took the pay on the road. You can't give it back now."${b83Say({ohl:`\n\nOhl, very quietly: "We could." He does not move, though.`, _:''})}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c3_calder_shut:()=>({sp:'Calder', scene:'b8_blackcoral', fx:()=>{ S.f.b8_c3_tarp = 'shut'; }, txt:
`"Supplies," he says again, warmly, as if you had asked after his health, and goes on counting crates. The tarped wagon turns the corner toward the landward gate and is gone.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* a pilgrim begging in the street: the kelyk, headline only */
    b8_c3_beggar:()=>({sp:'A pilgrim in the street', scene:'b8_blackcoral', fx:()=>{ S.f.b8_c3_beggar = 1; }, again:()=>'The pilgrim in the doorway, asleep now, or something like it.', txt:
`A pilgrim is sitting in a doorway with her bowl out, come in from the camp, by her muddy hem. She is not old. She looks old. When you pass she lifts the bowl, and the smell comes off her clothes, sweet, like fruit left too long in the sun.

"For the cup," she says. "Only for the cup. It takes the weight better than he does." She means the barrow. She laughs, and stops, and does not seem to know why she stopped.${b83Say({ohl:`\n\nOhl crouches in front of her and looks at her eyes, and at her hands, and stands up again. "Kelyk," he says, very low. "That's the smell. It doesn't let go." He puts a copper in her bowl anyway. "Food," he tells her. "Food, with that."`, ressa:`\n\nRessa crouches and looks at the woman's eyes. "That isn't fever," she says. "That's sweeter." She does not put anything in the bowl. She looks as if she would like to put something in the bowl.`, _:`\n\nKelyk. Calder's merchant knew the smell, on the road. So do you, now. It does not let go.`})}`,
      ch:[{t:'Put a copper in the bowl for bread, and go on.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the harbour wall: the wreck in the bay (callback 7). Never named. Tuft knows it */
    b8_c3_harbour:()=>({sp:'The harbour wall', scene:'b8_c3_harbour', again:()=>'The harbour wall, the black bay, and far out the shape in the water.', txt:
`The harbour wall is old Coral's, black stone patched with the pale, and lamps run along it on poles. Below it the bay lies flat and black under the night, so still that the lamps stand in it upside down.

Far out, past where the lamps reach, something breaks the water. A broken black shape, tilted, huge, like a cliff that fell into the sea and never finished falling. The fishing boats keep well away from it. Their lamps make a long ring round it on the water and do not come in.`,
      ch:[{t:'Look at it a while.', go:'b8_c3_wreck'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c3_wreck:()=>({sp:'The harbour wall', scene:'b8_c3_harbour', fx:()=>{ if (!S.f.b8_c3_wreck) S.f.b8_c3_wreck = b8In('tuft') ? 'tuft' : 'sgt'; }, txt:
`${b8In('tuft') ? `Tuft knows it before you do. She is standing at the wall with both hands on the stone and her face gone still.

"We saw it over Pale," she says. "Every day. Over our heads, black, the whole sky of it." She does not point. "And from the shore, after Coral, we watched it go out to sea with the dead in it. It was going so slowly." She swallows. "It didn't get very far."

She looks at it for some time. Then she takes the Deck out of her sleeve and puts it away again without drawing anything, which is the nearest thing to a prayer you have seen her make.` : `You know it. It takes a moment, because the last time you saw it whole it was a whole sky: black, over Pale, every day, over the Fourth's heads. And after Coral, from the shore, you watched it go out to sea with the dead in it, slowly, until it was nothing.

It did not get very far.`}${b83Say({brisk:`\n\nBrisk lifts two fingers to her brow, toward the shape in the water, the old salute. She holds it a moment longer than usual.`, _:''})}${b83If('ohl', `\n\nOhl has his hand on the oilcloth in his coat, where his list is. He does not take it out.`)}${b83If('kettle', `\n\nKettle starts to count something out there, under her breath, and stops.`)}${b83If('vasso', `\n\nVasso looks from the shape to the squad and back. He has the sense to ask nothing.`)}${b83If('edrem', `\n\nEdrem stands a little apart. "It came down on the Seer's palace," he says. "I was in the city. I saw it come." That is all he says about it.`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* a tavern off the harbour street, another night: an Andii and a man in grey at a board, far off; never at their table */
    b8_c3_tavern_door:()=>({sp:'The tavern', scene:'b8_blackcoral', txt:
`A low door off the harbour street with a lamp over it and noise behind it: a tavern, the kind every harbour keeps, for carters and fishermen and clerks after their work.`,
      ch:[{t:'In, for a cup.', go:'b8_c3_tavern'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_tavern:()=>({sp:'The tavern', scene:'b8_c3_tavern', fx:()=>{ S.f.b8_c3_tavern = 1; }, again:()=>'The tavern, the lamps, and in the far corner the board.', txt:
`Another night, though here it is hard to say what makes one night another. The tavern is low and warm and full of lamps, and of carters and fishermen and Andii-sworn clerks with silver at their cuffs, and the Fourth finds a table by the wall and a jug of something thin and sour that the landlord calls wine with a straight face.

In the far corner there is a table by itself. A tall Andii sits at it, long-limbed, dark-skinned, quiet, and across from him a man in a grey cloak, and between them a board with pieces on it. The Andii moves a piece. The man in grey looks at it. Neither of them speaks. The whole room leaves that corner alone, as if by long arrangement, and the Fourth leaves it alone with the room.${b83If('edrem', `\n\nEdrem sits with his back to that corner and orders water.`)}${b83If('vasso', `\n\nVasso has counted the doors, the windows and the landlord's knives, and sits where he can see all three.`)}`,
      ch:[{t:'Drink the sour wine, and listen to the room.', go:'b8_c3_tavern_room'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c3_tavern_room:()=>({sp:'The tavern', scene:'b8_c3_tavern', txt:
`The room talks about what rooms talk about: the price of salt fish, a clerk's daughter, the wagons in from the west. A carter at the next table asks the landlord, low, if he has any of the sweet, and the landlord tells him, not low at all, to take it to the camp where it belongs, and the carter goes.

"Rows are full of it," a fisherman says, to his cup. "The priestesses can't stop it. The guards don't try any more." He drinks. "It'll come to something. That sort of thing always comes to something."

In the corner, the man in grey moves a piece at last. The Andii looks at the board a long while. The room does not watch them do it.${b83Say({ohl:`\n\nOhl pushes the sour wine away. "I'll have water," he says. "It's the only thing in this city I'm sure of."`, tuft:`\n\nTuft stares into her cup. "Don't look at the corner," she says, very low. "I mean it."`, _:''})}`,
      ch:[{t:'Back out into the street.', go:()=>startExplore()}]}),

    /* the upper streets: not for the Fourth */
    b8_c3_upper:()=>({sp:'The upper streets', scene:'b8_blackcoral', txt:
`West, the streets climb toward the heart of the city, where the lamps are fewer and the buildings taller and darker, and the tall shapes on the walls stand closer together. A human porter coming down with an empty basket shakes his head at you before you have asked anything.

"Not up there," he says. "Not for us. No one stops you. You just don't." He goes on down to the harbour.`,
      ch:[{t:'Back down the street.', go:()=>startExplore()}]}),

    /* the landward gate: the night stops. The trick (the Kurald Galain shroud), and the pilgrims' road */
    b8_c3_gate:()=>({sp:'The landward gate', scene:'b8_blackcoral', again:()=> S.f.b8_c3_shroudOk ? 'The landward gate, and the edge of the night just outside it. The Fourth knows how to fold a little of it now.' : 'The landward gate, and the edge of the night just outside it.', txt:
`At the landward gate the night stops. You can see the edge of it, just outside the arch: a line across the road where the dark simply ends, as if somebody had drawn it there, and beyond the line the plain in a thin grey light, like a winter dusk that never finishes. Pilgrims pass through it both ways, and flinch, both ways.

You know this dark. Not this city's, but its kind. A dark like it came down once over a terrace in Darujhistan, the night of the Fete, like a lid on a pot, and took a fight away with it.${b83If('tuft', `\n\nTuft puts her hand out into the edge of it, slowly, the way you would put a hand into a river to feel the cold. "Cold," she says. And then, quieter, with a look on her face you have not seen there in years: "And under it, not. Like somebody holding a hand that's been out in the winter." She takes her hand back and holds it against her chest, and that is all of it she will give.`)}${trickBy('dark') ? `\n\n${NAME(trickBy('dark'))}'s hand has gone to where the Courtesy of Darkness lives, at the wrist, without being asked. It knows this kind of dark.` : ''}`,
      ch:[{t:'Fold a piece of the dark round a hand, the way the Andii carry it.', check:['wits', 17], trick:'b8_shroud', req:()=>!S.f.b8_c3_shroudTried, fx:()=>{ S.f.b8_c3_shroudTried = 1; },
            edges:id=>[id === 'tuft' && ['Meanas: Shadow is the dark\'s own child, and she has felt this before', 3], trickBy('dark') === id && ['A Courtesy of Darkness: it has held this dark before', 3], id === 'sgt' && ['you saw the dark come down over Lady Simtal\'s terrace', 1], id === 'sohra' && ['the spirits live in the dark, and she has asked them things there', 1], id === 'edrem' && ['years of standing under this night at the barrow', 1], id === 'ohl' && ['Denul wants light to work by', -1], id === 'kettle' && ['a sapper likes to see her fuse', -1], id === 'brisk' && ['Hood\'s dark is a different dark', -1]],
            near:{t:()=>`Yes, but the dark gets into ${b83Nm(b83Who())}'s hand to the wrist and is slow to come out: the fingers will not close properly until evening, and ${b83Nm(b83Who())} ${b83V(b83Who(), 'keep', 'keeps')} looking at them. Rattled.`, fx:()=>b83Rattle(b83Who())},
            go:'b8_c3_shroud_ok', fail:'b8_c3_shroud_no'},
          {t:'Out onto the pilgrims\' road.', onward:true, fx:()=>{ S.f.b8_c3_ph = Math.max(2, S.f.b8_c3_ph || 1); }, go:()=>{ startExplore('b8_c3_road'); if (!S.f.b8_c3_roadSeen) talk('b8_c3_road_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_shroud_ok:()=>({sp:'The landward gate', scene:'b8_blackcoral', fx:()=>{ S.f.b8_c3_shroudOk = 1; }, txt:
`${by({sgt:'You put your hand', tuft:'Tuft puts her hand', _:'{who} puts a hand'})} into the edge of the night and do not take it back. It is cold, and then it is not anything, and then a little of it comes away when the hand does: a fold of dark lying over the fingers like a cloth, weightless, very patient.

It does not last. It does not need to. When it is wanted, on a squadmate's shoulders in a fight, it will lie over them once and take the blow that was meant for them, and then go back to wherever the Andii's night goes.${b83If('vasso', `\n\nVasso watches with his hands very still. "The Guild would pay anything for that," he says. "Anything." He seems to decide, there and then, never to tell them.`)}`,
      ch:[{t:'Back to the gate.', go:'b8_c3_gate'}]}),
    b8_c3_shroud_no:()=>({sp:'The landward gate', scene:'b8_blackcoral', txt:
`The dark is there, at the line, and the hand goes into it, and comes out with nothing but the cold. It does not refuse. It does not notice. It is a very old dark and it is busy being dark, and a squad of Malazans from Darujhistan is not, it seems, its business.`,
      ch:[{t:'Back to the gate.', go:'b8_c3_gate'}]}),

    /* ======== phase 2: the pilgrims' road ======== */
    b8_c3_road_arrive:()=>({sp:'The pilgrims\' road', scene:'b8_c3_road', fx:()=>{ S.f.b8_c3_roadSeen = 1; }, txt:
`Outside the gate the grey is worse than the dark, as Thessaly said. It is the light of a day that has given up: no shadows, no sun, the old Domin flat and colourless to the edge of everything, and the road going east across it full of people walking.

Pilgrims. Old ones and young ones, in twos and threes and alone, with bundles and without, all going the same way. A morning's walk east, under a smudge of lamps on the horizon, is the barrow.

Halfway there a cart has gone over in the road, a wheel off, and in front of it, with a knot of pilgrims crouched behind him, a man is standing in old grey scale with a mace in both hands, looking east along the road at something coming.${b83If('vasso', `\n\nVasso has his hand on his knife. "Outside the walls," he says. "Twice now." He does not sound as if he is getting used to it.`)}`,
      ch:[{t:'To the cart.', go:()=>startExplore()}]}),
    b8_c3_cart:()=>({sp:'The broken cart', scene:'b8_c3_road', txt: S.f.b8_c3_roadDone ?
`The cart is back on three wheels and a prop, and the pilgrims are loading it again, slowly, with the care of people who have very little and have just nearly lost it.${b83If('edrem', ' Edrem has his shoulder under the axle while they do it.')}` :
`The cart is a pilgrims' cart, hired by a dozen of them together in Black Coral to carry the old and the lame out to the barrow, and it has thrown a wheel in a rut. They are crouched behind it now. The man in grey scale is standing in front of it, between them and the road east.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    /* Edrem: the first meeting, before the raiders */
    b8_c3_edrem:()=>{ const d = S.f.b8_edremDone;
      if (d === 2) return {sp:'Edrem', scene:'b8_c3_road', txt:
`Edrem is on the road still, by the cart, with his mace slung, watching the pilgrims go by. He nods to you when you come up, one sentry to another.`,
        ch:[{t:'"Walk with us, Edrem."', fx:()=>{ b8Join('edrem'); b83L('brisk', 1); }, go:'b8_c3_edrem_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (S.f.b8_c3_roadDone) return DLG.b8_c3_edrem_after();
      return {sp:'A man in grey scale', scene:'b8_c3_road', fx:()=>{ S.f.b8_c3_edremMet = 1; }, again:()=>'The man in grey scale, in front of the cart, watching the road east.', txt:
`He is forty or so, grey in the stubble, with a face that has been out in a great deal of bad light. The scale is old Pannion grey, good work once, with the marks on it filed off so hard the metal is bright in the scars. There is a pilgrim's cloak over one shoulder and a bit of coral on a cord at his throat. He does not take his eyes off the road.

"Raiders," he says. "Seven. Three on the road, the rest round by the ditch, for the cart. They come every few days." He shifts his grip on the mace. "You're Malazans. Soldiers. I know how you stand."${b83If('brisk', `\n\nBrisk has already set her shield beside him, without being asked. He looks at it, and at her, and something in his shoulders comes down a finger's width.`)}`,
        ch:[{t:'"Who are you?"', go:'b8_c3_edrem_who'},
            {t:'"Then we\'ll stand with you." Face the road.', go:'b8_c3_road_start'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c3_edrem_who:()=>({sp:'A man in grey scale', scene:'b8_c3_road', txt:
`"Edrem." He says it as if he has not had much use for it lately. "I wore the grey once. Seerdomin, the Domin called us. Nine years." His jaw works. "No one calls me anything now. I keep this road. I'm not paid. That's the point of it."

He nods east, where there are figures on the road now, three of them, coming on at a walk that is too easy. "They'll want the cart. The pilgrims carry what they mean to lay on the barrow. Some of it's worth taking."`,
      ch:[{t:'"Then we\'ll stand with you, Edrem."', go:'b8_c3_road_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_road_start:()=>({sp:'The pilgrims\' road', scene:'b8_c3_road', fx:()=>{ S.f.b8_c3_edremMet = 1; }, txt:
`Three of them on the road, in hides and road-dust, with a sellsword in a good coat walking behind like a man out to see a property. The rest will be in the ditch. Edrem said so, and Edrem has stood here before.

"Old soldiers," the sellsword calls, cheerfully, when he sees the Fourth. "Pilgrims too, are you? You'll want to lighten your load before the barrow. We help with that."${b83If('kettle', `\n\nKettle has a sharper in her hand. "Not near the cart," she says. "I know. I know."`)}${b83If('vasso', `\n\nVasso, at your shoulder: "The one in the coat is a Daru bravo gone to the plains. You can tell by the boots." He sounds personally disappointed in the man.`)}`,
      ch:[{t:'"Fourth. With him." Up the road at them.', go:()=>startBattle('b8_c3_road', {})},
          {t:'Round through the dead trees and the stubble, and come at them out of the grey.', check:['guile', 15], req:()=>!S.f.b8_c3_roadTried,
            edges:id=>[id === 'ellis' && ['she scouted worse ground than this for the Claw', 2], id === 'tuft' && ['Meanas: the grey here is all shadow and no light', 2], id === 'vasso' && ['he has crossed whole districts unseen', 2], id === 'sohra' && ['she rode the Rhivi plains, and knows how to come out of flat ground', 1], id === 'sgt' && ['you have done this on worse roads', 1], id === 'brisk' && ['a heavy in a stubble field is a heavy in a stubble field', -1], id === 'greysword' && ['the Grey Swords did not teach creeping', -1]],
            near:{t:()=>`Yes, but the stubble is cut short and sharp as pikes, and ${b83Nm(b83Who())} ${b83V(b83Who(), 'come', 'comes')} out of it with both shins opened. ${b83Nmc(b83Who())}'ll feel it in the fight.`, fx:()=>bruise(b83Who(), bruiseN())},
            fx:()=>{ S.f.b8_c3_roadTried = 1; }, go:()=>startBattle('b8_c3_road', nearMiss() ? {} : {surprise:'p'}), fail:'b8_c3_road_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_road_seen:()=>({sp:'The pilgrims\' road', scene:'b8_c3_road', txt:
`A dead tree goes over with a crack like a shot, and the sellsword laughs, and points, and the three in hides spread out on the road at a run.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b8_c3_road', {surprise:'e'})}]}),
    b8_c3_road_after:()=>({sp:'The pilgrims\' road', scene:'b8_c3_road', fx:()=>{ if (!S.f.b8_c3_roadDone) { S.f.b8_c3_roadDone = 1; gain('b8_c3_coralknife'); } }, txt:
`The road is quiet. The raiders who can run have run, back into the grey toward the ridge, and the sellsword in the good coat went with them, without the coat. The pilgrims come out from behind the cart one at a time, as if the road might not hold.

The second sellsword had a long knife on him, dark iron with a grip of pale porous stone, the kind they sell in the smiths' street in Black Coral to people who mean to take one to the barrow. He took it off someone. It goes in the kit.

Edrem is standing where he stood, by the cart, with blood on his mace and his breath coming hard. He looks at the Fourth as if he had not expected anybody to come down that road but raiders, ever again.${b83Say({ohl:`\n\nOhl is already among the pilgrims with his hands. "No one's dying," he says. "Not today." He looks up at Edrem. "You. Sit down before you fall down."`, brisk:`\n\nBrisk sets her shield down beside Edrem's cart and leans on it. "Good line," she says to him. "For one man."`, _:''})}`,
      ch:[{t:'To Edrem.', go:()=>{ startExplore(); talk('b8_c3_edrem_after'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* Edrem, after the road: the join */
    b8_c3_edrem_after:()=>({sp:'Edrem', scene:'b8_c3_road', again:()=>'Edrem by the cart, his breath back, his mace slung.', txt:
`"They'll be back," he says, when he can. "Three days. Four. They camp on the ridge, over there, in a fold out of the wind, with everything they've taken off the road." He looks at the pilgrims loading the cart. "I can't take a camp. One man can't. I keep the road instead."

He looks at the Fourth properly for the first time: the old kit, the old habits, the way you stand. "You're going to the barrow. Everyone is." A breath. "I've kept this road for years. I could keep it a while with somebody beside me. Or I could walk with you, out there, and back, wherever you're going. The road will keep a day." He does not say which he would rather. He is plainly a man who does not ask for things.${b83If('vasso', `\n\nVasso, quietly, to you: "He's like us. He just hasn't got a door."`)}`,
      ch:[{t:'"Walk with us, Edrem. There\'s room."', fx:()=>{ b8Join('edrem'); b83L('brisk', 1); }, go:'b8_c3_edrem_join'},
          {t:'"Keep your road for now. We\'ll send for you."', fx:()=>{ S.f.b8_edremDone = 2; }, go:'b8_c3_edrem_wait'},
          {t:'"The road needs you more than we do."', fx:()=>{ S.f.b8_edremDone = 0; b83L('ohl', -1); }, go:'b8_c3_edrem_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_edrem_join:()=>({sp:'Edrem', scene:'b8_c3_road', txt:
`${b8In('edrem') ? `He nods, once, the way he does everything, and slings the mace, and settles the pilgrim's cloak on his shoulder.

"I don't pray," he says, as if it needed saying before anything else. "I'll stand where the praying people can see me. That's what I do." He looks down the road toward the barrow. "And I'll hold a line. I was good at that, once. For the wrong side." He falls in beside ${b83Say({brisk:'Brisk, shield to shield, without being told', _:'the squad, at the end of it, where a heavy goes'})}.` : `He nods, and stays by the cart. Six walk with the Fourth already, and a soldier can count. "When there's room," he says. "I'll be on the road. I'm always on the road."`}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b8_c3_edrem_wait:()=>({sp:'Edrem', scene:'b8_c3_road', txt:
`He nods, as if that were the answer he expected from anybody.

"The road," he says. "Ask anyone on it for Edrem. They'll point."`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b8_c3_edrem_no:()=>({sp:'Edrem', scene:'b8_c3_road', txt:
`"Yes," he says. "It does." He does not sound hurt. He sounds as if he has been told something he already knew. He goes back to the cart and puts his shoulder under the axle.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* the pilgrims by the cart: a coral token, and the sweet smell on one of them */
    b8_c3_pilgrims:()=>({sp:'Pilgrims by the cart', scene:'b8_c3_road', fx:()=>{ if (!S.f.b8_c3_token) { S.f.b8_c3_token = 1; gain('b8_c3_pilgrimtoken'); } }, again:()=>'The pilgrims, loading the cart.', txt:
`An old man from the north, by his accent, comes over from the cart and takes your hand in both of his and presses something into it: a bit of coral on a plain cord. He does not stay to be thanked. He goes back to the cart and helps lift a woman with a bad leg onto it.

"For luck," one of the others says. "They say." She smiles. "The priestesses say it's for nothing. That's why he gives them away."

One of the younger ones, at the back, has the sweet smell on her, and the wrong look in her eyes, and the others keep her between them and do not talk about it.${b83If('ohl', `\n\nOhl watches the young one for some time. "Kelyk," he says, low. "Even out here. Even going to the barrow." He shakes his head. "It takes the weight too, they think. It takes everything."`)}${b83If('edrem', `\n\nEdrem has a word with the one who has the smell on her, very quiet, and she nods, with her eyes on the road.`)}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* a dry well on the road */
    b8_c3_well:()=>({sp:'A dry well', scene:'b8_c3_road', again:()=>'The dry well by the road.', txt:
`A well by the road, from when there were farms here, its windlass gone and its stones blackened by some old fire. It is dry. At the bottom, where the light does not quite reach, something glints: a flask, small, stoppered, thrown down. The sweet smell comes up out of the well, faint, like rot in a fruit store.${b83Say({kettle:`\n\nKettle looks down it and sniffs. "Someone had the sense to throw it away," she says. "Or ran out of sense after." She does not go down for it.`, _:'\n\nNobody goes down for it.'})}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* the raiders' camp on the ridge: optional */
    b8_c3_ridge_view:()=>({sp:'The ridge path', scene:'b8_c3_road', again:()=> S.f.b8_c3_ridgeDone ? 'The ridge path up to the fold where the raiders camped. Empty now.' : 'The ridge path, going up into the grey toward the raiders\' fold.', txt: S.f.b8_c3_ridgeDone ?
`The path goes up the ridge to the fold where the raiders camped. The fire is out. The packs went back down the road to the people they came off.` : !S.f.b8_c3_roadDone ?
`A goat-path goes up off the road onto a low ridge, toward a fold in it out of the wind. There is smoke from the fold, thin, and the man in grey scale at the cart is watching the road, not the path.` :
`A goat-path goes up off the road onto the ridge, toward the fold where the raiders camp: thin smoke, and somewhere up there a heap of pilgrims' packs and the men who took them, getting their breath back.${b83If('edrem', `\n\nEdrem looks up at the smoke. "They'll come back in three days," he says. "Unless they can't."`)}`,
      ch:[{t:'Up the path, to the raiders\' camp.', onward:true, req:()=>!!S.f.b8_c3_roadDone && !S.f.b8_c3_ridgeDone, go:'b8_c3_ridge_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_ridge_start:()=>({sp:'The raiders\' camp', scene:'b8_c3_road', txt:
`The fold in the ridge is out of the wind, and out of sight of the road, and full of the raiders' living: a cookfire, hides on poles, a heap of bundles and packs with pilgrims' tokens still tied to some of them. Four men round the fire, one of them the sellsword with a name, arm in a sling, who has plainly been explaining to the others why it went wrong.

He sees the Fourth at the lip of the fold. He stops explaining.`,
      ch:[{t:'"You were told." Down into the fold.', go:()=>startBattle('b8_c3_ridge', {})},
          {t:'Along the ridge and down on them from above, out of the grey.', check:['wits', 15], req:()=>!S.f.b8_c3_ridgeTried,
            edges:id=>[id === 'ellis' && ['she counted sentries for the Claw for six years', 2], id === 'vell' && ['a ridge is a roof with grass on it', 2], id === 'edrem' && ['he has watched this ridge from the road for years', 2], id === 'kettle' && ['she reads ground for where it will hold a foot', 1], id === 'sgt' && ['you can read a fold of ground for its blind side', 1], id === 'brisk' && ['a heavy on a slope is a rockfall', -1], id === 'ohl' && ['old knees, loose shale', -1]],
            near:{t:()=>`Yes, but the shale goes out from under ${b83Nm(b83Who())} at the last, and ${b83Nm(b83Who())} ${b83V(b83Who(), 'arrive', 'arrives')} at the bottom of the fold bruised to the hip. ${b83Nmc(b83Who())}'ll feel it in the fight.`, fx:()=>bruise(b83Who(), bruiseN())},
            fx:()=>{ S.f.b8_c3_ridgeTried = 1; }, go:()=>startBattle('b8_c3_ridge', nearMiss() ? {} : {surprise:'p'}), fail:'b8_c3_ridge_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_ridge_seen:()=>({sp:'The raiders\' camp', scene:'b8_c3_road', txt:
`The shale goes, all at once, in a long rattle down into the fold, and the men at the fire are on their feet before it stops.`,
      ch:[{t:'Down into them, now.', go:()=>startBattle('b8_c3_ridge', {surprise:'e'})}]}),
    b8_c3_ridge_after:()=>({sp:'The raiders\' camp', scene:'b8_c3_road', fx:()=>{ S.f.b8_c3_ridgeDone = 1; b83L('edrem', 1); }, txt:
`The fold is quiet. The raiders who could run have gone over the far side of the ridge and onto the plain, and they will not be back on this road soon. The packs go down to the cart in three trips, and the pilgrims go through them with their hands shaking, finding their own.

Some of them find what they were going to lay on the barrow. One old woman finds a child's shoe, very small, and holds it, and does not say whose it was.${b83If('edrem', `\n\nEdrem carries the last of the packs down himself. "Three days," he says, to no one, "and they'd have been back." He looks at the Fourth. "They won't now." It is as near to thanks as he seems to come.`)}`,
      ch:[{t:'Back down to the road.', go:()=>startExplore()}]}),

    /* the road's ends */
    b8_c3_road_back:()=>({sp:'The pilgrims\' road', scene:'b8_c3_road', txt:
`West, the road runs back to the line where the night begins, and the gate, and the lamps.`,
      ch:[{t:'Back to the city.', onward:true, go:()=>startExplore('b8_c3_city')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_road_on:()=>({sp:'The pilgrims\' road', scene:'b8_c3_road', txt: S.f.b8_c3_roadDone ?
`East, the road goes on with the pilgrims to the barrow and its lamps.` :
`East, the road goes on to the barrow. But there is a cart over in the road behind you, and a man in front of it, and something coming.`,
      ch: S.f.b8_c3_roadDone ? [{t:'On to the barrow.', onward:true, fx:()=>{ S.f.b8_c3_ph = Math.max(3, S.f.b8_c3_ph || 1); }, go:()=>{ startExplore('b8_c3_barrow'); if (!S.f.b8_c3_barrowSeen) talk('b8_c3_barrow_arrive'); }},
                                {t:'Not now.', go:()=>startExplore()}]
                             : [{t:'Back to the road.', go:()=>startExplore()}]}),

    /* ======== phase 3: the Great Barrow ======== */
    b8_c3_barrow_arrive:()=>({sp:'The Great Barrow', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_barrowSeen = 1; }, txt:
`The barrow is bigger than you remember. Much bigger. The Fourth saw it raised: a mound of gifts on the plain outside Coral, a man under it the Grey Swords carried off the field, and the soldiers of every army coming in the night one at a time to lay something down. Years, now. The gifts have not stopped.

It is a hill. Lamps stand round it on poles. It is heaped with things to its crown, stones and knives and coins and boots and toys, and pilgrims kneel before it in the mud in rows, hundreds of them, quiet, and get up one at a time and go, and others come and kneel. Round it, south and east, the camp: tents, shacks, cookfires, a smell of mud and smoke and, somewhere in the rows, something sweeter.${b83If('ohl', `\n\nOhl stops at the edge of the lamplight. "I left a needle on that," he says. "Somewhere in there." He does not try to see it.`)}${b83If('brisk', `\n\nBrisk looks up at the crown of it for a while. Then she nods to it, once, the way she nods to a man in the line beside her. She did that the last time too.`)}${b83If('edrem', `\n\nEdrem stops beside you. "I sleep facing it," he says. "Most nights." He does not kneel.`)}${b83If('vasso', `\n\nVasso has gone very quiet. "All of that," he says. "One at a time." He seems unable to stop counting.`)}`,
      ch:[{t:'Look about the barrow.', go:()=>startExplore()}]}),
    b8_c3_barrow_go:()=> !S.f.b8_c3_anvil ? DLG.b8_c3_anvil() : !b83Key() ? DLG.b8_c3_key() : {sp:'The Great Barrow', scene:'b8_barrow', again:()=>'The barrow under its lamps, the pilgrims kneeling.', txt:
`The barrow under its lamps, heaped with gifts to the crown, and the pilgrims kneeling in the mud before it. ${b83Key() === 'kneel' ? 'Somewhere on the slope, among all the rest, is what the Fourth laid down.' : 'The Fourth stood at the edge here, and the guards saw.'}${b83If('edrem', ' Edrem stands a little apart, as he always does.')}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]},
    /* the Shield Anvil's Weight (callback 2): whoever carries it gets the scene; if nobody, the sergeant remembers. Never his end. */
    b8_c3_anvil:()=>{ const w = b83Bearer();
      return {sp:'The Great Barrow', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_anvil = w; }, txt:
`Up close, at the foot of it, among the kneeling, the barrow is all gifts, every one of them put there by somebody's hand. A helmet with the crest broken. A wooden horse. A coin with a hole in it. A stone polished on a sleeve, and another, and another.

${w === 'sgt' ? `You remember a hand laid on a hand.

Not his. A Grey Sword's, on the day of Coral, showing a soldier how they carried each other on the wall: *not the blow. The one it was meant for.* It was only a hand on a hand. It took a weight, and the weight went somewhere, and did not come back.

The man under all this taught them that. You know he is still doing it: the pilgrims come, and kneel, and get up lighter, and go.` : w === 'greysword' ? `Dannet goes up to the foot of it alone, with the grey shield on her arm, and stands there.

"He taught us this on the wall at Capustan," she says, without turning round. "The weight. Not the blow; the one it was meant for. I have carried it since. In every fight. I put my hand where theirs is, the way he showed us." She lays her palm flat on a stone at the barrow's foot, and leans on it, a little. "So. It goes back to him now. For a moment."

When she takes her hand away she stands straighter. Something has gone off her. She does not say what.` : w === 'ohl' ? `Ohl goes up to the foot of it with his hands open.

"The Shield Anvil's weight," he says. "The Grey Swords showed me, the day of Coral. I've used it on every one of you." He looks at his hands. "It's not Denul. It's not anything. It's deciding to carry some of it." He lays one hand flat among the gifts, and leaves it there. "I'd like to give some of it back. Just for a moment. He won't mind. He never minded."

He takes his hand away. He looks, for a moment, younger.` : w === 'brisk' ? `Brisk goes up to the foot of it with her shield, and stands there, and does not salute.

"Carried it," she says. "Since Coral. His trick. Hand on the hand." She puts her free hand flat on the gifts, gently, the way she would put it on a squadmate's shoulder in the line. "Not the blow. The one it was meant for." She is quiet a moment. "Hood's never once asked me to carry anything. This one did."

She takes her hand away and comes back to the squad, and stands a little closer to them than usual.` : `${NAME(w)} goes up to the foot of it alone. ${NAME(w)} has carried the Shield Anvil's weight since the day of Coral: a hand laid over a squadmate's hand, the way the Grey Swords showed it, *not the blow, the one it was meant for*.

At the barrow's foot ${NAME(w)} lays a hand flat on the gifts, and leans, a little, and for a moment gives some of it back. Then ${NAME(w)} comes away lighter, and does not say how.`}${b83If('tuft', w === 'tuft' ? '' : `\n\nTuft has the Deck out, and does not draw. "The Soldier of High House Life," she says, very low. "Kneeling over somebody. He's still doing it."`)}${b83If('edrem', `\n\nEdrem watches from the edge of the lamplight, with his mace slung and his face shut.`)}`,
        ch:[{t:'Stay a while.', go:'b8_c3_key'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    /* the key: kneel, or stand witness at the edge */
    b8_c3_key:()=>({sp:'The Great Barrow', scene:'b8_barrow', html:contractHTML(), txt:
`The pilgrims come and kneel and get up and go. Some of them lay something down. Most of them only kneel, and put their hands flat in the mud, and stay like that a while, and then get up with their faces changed. The priestesses at the edge of the lamplight say the Redeemer takes the weight off whoever asks, and gives them nothing for it, not a thing, but quiet. They say it to everyone who comes. Some of the pilgrims go away angry. Most do not.

${b8In('edrem') ? 'Edrem stands at the edge, where the lamplight stops, with his mace slung, where he has stood for years. He does not kneel. He never has.' : 'At the edge, where the lamplight stops, the camp\'s guards stand and watch the road and the rows. They do not kneel.'}

There are two things an old soldier can do here.${b83Say({ohl:`\n\n"I've a few things I'd put down," Ohl says, "if somebody'd take them." That is his.`, _:''})}${b83Say({brisk:`\n\n"I stand," Brisk says. "That's what we do. Stand where they can see us." That is hers.`, _:''})}${b83If('kettle', `\n\nKettle turns a sharper over and over in her fingers, and does not say which.`)}${b83If('vasso', `\n\nVasso looks at the kneeling rows, and at the edge, and at you. "I'll do whichever you do," he says. "I've never done either."`)}`,
      ch:[{t:'Kneel in the mud with the pilgrims, and lay something down.', go:'b8_c3_kneel'},
          {t:'Stand witness at the edge of the lamplight, with Edrem and the guards.', fx:()=>{ S.f.b8_c3_key = 'stand'; S.f.b8_c3_guards = 1; b83L('brisk', 1); b83L('edrem', 1); }, go:'b8_c3_stand'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b8_c3_kneel:()=>({sp:'The Great Barrow', scene:'b8_barrow', txt:
`You kneel in the mud with the pilgrims, between an old man who smells of fish and a girl with a bundle on her back. The ground is cold. The lamps hiss. In front of you the gifts go up and up.

What does an old soldier lay down?`,
      ch:[{t:'A copper out of the Fourth\'s rent jar, from the door in Darujhistan.', fx:()=>{ S.f.b8_c3_gift = 'a copper from the Fourth\'s rent jar'; }, go:'b8_c3_kneel_after'},
          {t:'A thread pulled from the old patch, the faded round IV.', fx:()=>{ S.f.b8_c3_gift = 'a thread from the Fourth\'s old patch'; }, go:'b8_c3_kneel_after'},
          {t:'A stone off the road, polished on a sleeve, the way it was done the last time.', fx:()=>{ S.f.b8_c3_gift = 'a stone off the road, polished on a sleeve'; }, go:'b8_c3_kneel_after'},
          {t:'Not yet. Get up again.', go:'b8_c3_key'}]}),
    b8_c3_kneel_after:()=>({sp:'The Great Barrow', scene:'b8_barrow', fx:()=>{ if (!S.f.b8_c3_key) { S.f.b8_c3_key = 'kneel'; b83L('edrem', 1); b83L('ohl', 1); } }, txt:
`You set it down among the others, and put your hands flat in the mud, and stay like that a while.

Nothing answers. There is no voice, no warmth, no sign; the lamps hiss and the girl beside you is crying quietly and the old man is asleep on his knees. Nothing comes back for what you laid down. That is how it works, the priestesses say. He takes. He does not give.

But something goes off you anyway. Not much. A weight you had stopped noticing you were carrying, from Pale, from Coral, from the years, from a paper with five strokes on it. It goes, and it does not come back, and in its place there is nothing at all, which turns out to be lighter.${b83Say({ohl:`\n\nOhl kneels beside you, slowly, his knees cracking, and lays his list down flat on the mud a moment, oilcloth and all, and then picks it up again and puts it back in his coat. "Still all there," he says. "Lighter, though."`, _:''})}${b83If('edrem', `\n\nWhen you get up, Edrem is at the edge of the lamplight, watching. He nods to you, once, sentry to sentry. It is more than he has given anyone.`)}${b83If('vasso', `\n\nVasso kneels too, a little way off, awkwardly, as a man does who has never done it. He gets up looking puzzled, and stays puzzled the rest of the day.`)}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]}),
    b8_c3_stand:()=>({sp:'The Great Barrow', scene:'b8_barrow', txt:
`So the Fourth does not kneel. It stands at the edge of the lamplight, where the guards stand, ${b8In('edrem') ? 'beside Edrem, ' : ''}with its back to the dark and its face to the barrow and the people kneeling before it, and stays there.

It is what soldiers do. You stand where the people on their knees can see you, and you watch the road and the rows, and you do not ask anything of anybody. The pilgrims come, and kneel, and get up, and go, and some of them look up at the Fourth on their way past and nod, as if the Fourth were part of the barrow too.

The guards notice. Toward the end, when the lamps are being trimmed, one of them comes along the edge with a skin of water and passes it down the Fourth's line without a word, and stands with you after that, a little closer.${b83If('edrem', `\n\nEdrem stands at your shoulder the whole time, silent, and when the lamps are trimmed he says, "Good," just that, as if a line had held.`)}${b83If('vasso', `\n\nVasso stands at the end of the line with his hands where they can be seen. "Like the step," he says. "Only bigger."`)}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]}),

    /* the camp's guards, and a priestess */
    b8_c3_guards:()=>({sp:'The camp\'s guards', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_guardsMet = 1; }, again:()=>'The camp\'s guards by their fire, fewer than the fire was built for.', txt:
`The camp's guards are a dozen pilgrims with spears and some old soldiers among them, round a fire that was built for more. ${S.f.b8_c3_guards ? `They make room at it for the Fourth now, without being asked.` : `They watch the Fourth come up with the careful faces of people who have seen soldiers before and not liked what came next.`}

"Fewer of us every week," one of them says, a grey woman with a Daru accent and a spear she knows how to hold. "People stop coming out. They say they're tired." She looks into the rows, toward the sweet smell. "They're not tired."${b83If('edrem', `\n\nShe nods to Edrem. "Road's quiet?" "Quieter," he says.`)}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]}),
    b8_c3_priestess:()=>({sp:'A priestess', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_priestess = 1; }, again:()=>'The priestess at the barrow\'s edge, with her bowl of water.', txt:
`She is young, in a plain grey shift with the mud of the barrow to the knee, and she has a bowl of water and a cloth, and she is washing the hands of pilgrims who come away from the barrow with their hands in the mud.

"He takes the weight," she says, when you ask. "That's all. People come and ask him for things, a son back, a debt gone, the rain. He doesn't give those. He never has. They go away angry." She wrings the cloth. "He takes what's on them, if they let him. That's all. It's a great deal. Most people don't know how much they're carrying till it's gone."${b83If('ohl', `\n\nOhl holds out his hands to her, mud and all, and she washes them without looking up.`)}${b83If('edrem', `\n\nShe sees Edrem behind you, and something in her face closes, and then opens again, carefully. "You're welcome here," she says to him. "You know that." He nods, and does not come any closer.`)}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]}),
    b8_c3_kneelers:()=>({sp:'Pilgrims on their knees', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_kneelers = 1; }, again:()=>'The pilgrims on their knees in the mud.', txt:
`Rows of them, on their knees in the mud before the barrow, hands flat on the ground. A merchant in a coat that was good once. A woman with a baby asleep on her back. Two Rhivi, very still. An old Barghast with his face paint cracked. They do not talk. Now and then one of them gets up, and stands a moment, and goes, and somebody else takes the place.

None of them is asking for anything you can see.${b83If('sohra', `\n\nSohra stops by the two Rhivi, and says something to them in their own tongue, very low, and they answer, and she comes away with her eyes wet. "They are from the herds near Pale," she says. "They came all this way." She does not say what for.`)}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]}),

    /* the kelyk-sellers' tent at the camp's edge: optional; talked down or fought */
    b8_c3_sellers_view:()=>({sp:'A tent at the camp\'s edge', scene:'b8_barrow', again:()=> S.f.b8_c3_sellersDone ? 'The sellers\' tent, empty, its lamp out.' : 'The tent with the lamp hung low, and the sweet smell.', txt: S.f.b8_c3_sellersDone ?
`The tent at the camp's edge is empty now, its lamp out, its awning down in the mud. The smell is still on the ground. It will be on the ground a long while.` :
`At the edge of the camp, a tent with its front rolled up and a lamp hung low inside it, and two men in robes the colour of old wine pouring from a stoppered jar into the cups pilgrims hold out to them, one copper a cup. The smell comes out of the tent in waves, sweet, like fruit left too long in the sun, and then not sweet at all.

The pilgrims who have drunk sit on the ground round the tent. Some of them are smiling. Their eyes are wrong.${S.f.b8_c3_wagon ? `\n\nThe jars along the back of the tent have a chalk mark on them you know: Calder's tally-mark, from every crate on the road east.` : ''}${b83Say({ohl:`\n\nOhl stops dead. "Kelyk," he says. "By the cup. At the barrow." He sounds, for once, past anger. "Of course. Where else."`, _:''})}${b83If('edrem', `\n\nEdrem's hand has gone to his mace. "Every week there are more of these," he says. "The priestesses ask them to go. They don't go."`)}`,
      ch:[{t:'Tell the pilgrims to go back to their tents, and the sellers to pack up.', check:['guile', 15], req:()=>!S.f.b8_c3_sellersDone && !S.f.b8_c3_sellersTried,
            edges:id=>[id === 'ohl' && ['a healer\'s voice, and he knows what the stuff does', 2], id === 'ressa' && ['she has a voice for sickrooms', 2], id === 'edrem' && ['the pilgrims know him from the road', 2], S.f.b8_c3_guards && ['the camp\'s guards stand behind the Fourth now', 2], id === 'sgt' && ['you have cleared worse taverns', 1], id === 'kettle' && ['she wants very badly to throw something', -1], id === 'brisk' && ['she does not talk men down; she stands in front of them', -1]],
            near:{t:()=>`Yes, but one of the drinkers will not go: she gets hold of ${b83Nm(b83Who())}'s sleeve and will not let go, and tells ${b83V(b83Who(), 'you', 'them')} very sweetly what the cup is for, and ${b83Nm(b83Who())} will hear it in the dark for days. Rattled.`, fx:()=>b83Rattle(b83Who())},
            fx:()=>{ S.f.b8_c3_sellersTried = 1; }, go:'b8_c3_sellers_calm', fail:'b8_c3_sellers_row'},
          {t:'Kick the jars over.', req:()=>!S.f.b8_c3_sellersDone, go:'b8_c3_sellers_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_sellers_calm:()=>({sp:'The sellers\' tent', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_sellersDone = 1; S.f.b8_c3_sellersSent = 1; }, txt:
`It takes a while. The pilgrims go back toward the rows one at a time, holding each other up, and the two men in the wine-coloured robes look at the Fourth, and at the guards behind it, and decide that the camp is very large and has a great many other edges.

They pack the jars in straw and carry them off into the rows between them, without hurrying. They do not look back.

They will be back. Everyone at the edge knows it.${b83If('ohl', `\n\nOhl watches them go. "That's not the end of it," he says. "That's the start." He goes to see to the ones still sitting on the ground.`)}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]}),
    b8_c3_sellers_row:()=>({sp:'The sellers\' tent', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_sellersTried = 1; }, txt:
`The taller of the two sellers puts the jar down very carefully, and picks up a hooked knife from under the table. Two of the drinkers get up off the ground with him. They should not be able to stand, and they are standing, and smiling.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c3_sellers', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c3_sellers_after:()=>({sp:'The sellers\' tent', scene:'b8_barrow', fx:()=>{ S.f.b8_c3_sellersDone = 1; }, txt:
`The jars go into the mud, every one, and the sweet goes into the ground, and the smell comes up off it so thick the guards step back. The two sellers are gone into the rows, the taller one bleeding. The drinkers who stood up are lying down again, and breathing, and Ohl ${b8In('ohl') ? 'is' : 'would be'} at them with his hands.

"They'll sleep it off," ${b8In('ohl') ? 'Ohl says' : 'a priestess says, coming over with her bowl'}. "Most of them." ${b8In('ohl') ? 'He does not say what they wake into.' : 'She does not say what they wake into.'}${b83If('edrem', `\n\nEdrem stands over the broken jars a long while. "It'll come to something," he says. "This always comes to something."`)}`,
      ch:[{t:'Back to the camp\'s edge.', go:()=>startExplore()}]}),

    /* the camp's ends */
    b8_c3_camp_east:()=>({sp:'The camp', scene:'b8_barrow', txt:
`East, the camp goes on: rows of tents and shacks and cookfires, a long way, and children running between them, and somewhere in the rows the sweet smell again. There will be time for the camp. Calder's wagons will not go west for days.`,
      ch:[{t:'Back to the barrow.', go:()=>startExplore()}]}),
    b8_c3_camp_back:()=>({sp:'The camp\'s edge', scene:'b8_barrow', txt: b83Key() ?
`West, the pilgrims' road goes back across the grey to the line where the night begins, and the gate, and the lodging over the chandler's.` :
`West, the pilgrims' road goes back across the grey toward the city. The barrow is behind you, and you have not done what you came out to do, either way.`,
      ch:[{t: b83Key() ? 'Back to the city, and the lodging.' : 'Back along the road.', onward:true, fx:()=>{ if (b83Key()) S.f.b8_c3_ph = 4; }, go:()=> b83Key() ? (startExplore('b8_c3_city'), talk('b8_c3_return')) : startExplore('b8_c3_road')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 4: the lodging, and on ======== */
    b8_c3_return:()=>({sp:'The lodging', scene:'b8_c3_lodging', txt:
`Back through the line where the night begins, which is no easier going in than coming out, and up the harbour street to the chandler's, and the room, and the sill, and the lamps.

${b83Key() === 'kneel' ? 'The Fourth is quiet on the stairs. Something went off it at the barrow, and nobody knows yet what to do with the space where it was.' : 'The Fourth is quiet on the stairs. It stood at the edge all through the lamp-trimming, and its legs know it.'}${b83If('edrem', `\n\nEdrem comes up the stairs last, and stops in the doorway, and looks at the room, the beds, the sill, as a man looks at a thing he has not had in a long time. "I'll take the floor," he says.`)}`,
      ch:[{t:'In.', go:'b8_c3_fire'}]}),
    b8_c3_onward:()=>({sp:'The lodging', scene:'b8_c3_lodging', txt:
`Calder's wagons will not go west for days: the merchant's man is waiting on a cargo, or a price, or both. The paper in Darujhistan is still a long way off and cooling, a little, with every day the Fourth is not there.

And the camp wants guards. ${S.f.b8_c3_guards ? 'The grey woman with the Daru accent came to the lodging herself, and stood in the door, and asked.' : 'Word came up from the camp\'s edge, by a boy with a muddy hem, asking for anyone who could hold a spear.'} Fewer of them every week, she said. The sweet is spreading in the rows. People are frightened, and the frightened ones are starting to drink it too.${b83If('edrem', `\n\nEdrem is already on his feet. "That's my road too," he says. "The far end of it."`)}${b83Say({ohl:`\n\n"Kelyk," Ohl says. "In a camp of people who came to put their weight down." He picks up his satchel. "Someone had better be there."`, _:''})}`,
      ch:[{t:'Out to the camp\'s edge, then.', onward:true, go:()=>chapterEnd(3, b83Key() || B8KEY0[3])},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
