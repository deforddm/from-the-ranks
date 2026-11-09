/* ============ Book Seven, Chapter 3: Night Raids ============ */
/* The Third, lent to Fist Keneb's column as a squad of heavies, weeks inland (rg-canon §2, ch 14-18; W17). The column raids by night and
   lies up by day; the Letherii are not rising, and fight beside the Edur (Sort's word, passed down); crossbowmen and a mage have been
   ambushing marine squads. Phase 1, dusk in a wood above a farm valley, the Third waking on the floor of an empty farmhouse: the reading
   (B7READ[3], the farmhouse floor, no lamp), the lieutenant's orders, Wenna, a Shake fisher at the column's edge who knows the inland roads
   (b7Join('wenna')). Phase 2, the fields at night: the Shake track (the trick, Wenna's Tracks), a far sound on a road north (Fiddler's Drum,
   heard of only), the ambush farm (b7_c3_farm, main, stage 2) taken by the guide's way (a rise:true check), its prisoners let go or kept
   (b7Rise(+1/-1), once), the village that opens its gate if b7Open() or shuts it (then the old road and an Edur camp: b7_c3_road).
   Phase 3, the factor's house and its guard (b7_c3_factor, main, stage 2); the key in the counting room, S.f.b7_c3_key: 'ledger' (burn the
   debt records, b7Rise(2)) or 'loot' (+20 silver, +2 salves, b7Rise(-1)). Phase 4, dawn, the lie-up in the factor's barn, and on at dusk.
   Notes for later chapters: docs/rg-ch3-notes.md. */
/* FOR THE ARTIST (123b): names this file uses.
   Items: ART['item/b7_c3_letherxbow'], ['item/b7_c3_edurmail'], ['item/b7_c3_ledgerash'].
   Figures: wenna (the recruit; a placeholder here with ??=). Reused: b2soldier (the lieutenant, marines), b5_letherii (the prisoners),
   b5_c5_refugee (the village, the house's Indebted), b5_c1_clerk (the factor's steward).
   Backdrops: b7_farm_night, b7_march_night and b7_camp_night (120's, yours), and three this file adds that borrow until you draw them:
   b7_c3_floor (inside an empty farmhouse at dusk, shutters closed, no lamp, the hearth cold, the squad on the boards), b7_c3_gate (a
   village's wattle wall and gate at night, a lamp behind the gate or none), b7_c3_house (a factor's house in stone behind a yard wall,
   lit windows, a barn, an orchard, at night).
   Ground (TILEX, all existing): b5_c4_wood (the wood: 'T' trees, ',' litter, 'H' the farmhouse door, '>' out east), plain_night (the
   fields: '#' hedge, 'C' the ambush farm, 'V' the village, 'k' the Shake track, 'r' rock, 'x' a post, 'F' the halt), b5_c5_farm (the
   factor's yard: '#' walls, 'B' the house door, 'b' the barn, 'w' the well, 'e' the gate). Battle 't' is low cover. */

/* ---- small helpers (b73: Book Seven, Chapter Three) ---- */
const b73L = (id, n) => { if (b7In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b73Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b7In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b73If = (id, s) => b7In(id) ? (typeof s === 'function' ? s() : s) : '';
const b73Who = () => (ROLL() && ROLL().who) || 'sgt';
const b73Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b73Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b73V = (id, you, they) => id === 'sgt' ? you : they;
const b73Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 dusk in the wood (the farmhouse floor), 2 the fields at night, 3 the factor's house, 4 dawn in the factor's barn */
const b73Ph = () => S.f.b7_c3_ph || 1;
const b73Key = () => S.f.b7_c3_key || null;
const b73Strip = () => S.f.b7_c1_key === 'strip';
const b73Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b7In(id));
const b73WennaSettled = () => S.f.b7_wennaDone != null;
/* who leads the squad by the back ways tonight: Wenna if she walks, else Doss, else nobody but the lieutenant's map */
const b73Guide = () => b7In('wenna') ? 'wenna' : b7In('doss') ? 'doss' : null;
/* who teaches the Shake track: Wenna (walking, or come up from the fishers at the column's edge), else Doss, else an old Shake fisher */
const b73Teacher = () => (b7In('wenna') || S.f.b7_wennaDone === 2) ? 'wenna' : b7In('doss') ? 'doss' : 'fisher';
const b73VillageOpen = () => !!S.f.b7_c3_prisoners;
const b73EastOpen = () => !!S.f.b7_c3_village && (S.f.b7_c3_village === 'open' || !!S.f.b7_c3_roadDone);

/* ---- Wenna's Tracks: The Rope's Way (Book One's rope), in the Shake's words. The field-drains, hedge-bottoms and eel-ditches the Letherii
   maps leave out because nobody who draws a map walks them; a squad that knows where the ground goes can be where it was not. Not sorcery.
   The battle half swaps two squadmates as the rope does. ---- */
Object.assign(TRICKS, {
  b7_c3_tracks:{name:'Wenna\'s Tracks', ch:3, use:'fight', ab:'t_b7_c3_tracks', where:'the field-drains of a farm valley inland, behind a Shake fisher, at night',
    lore:'The Shake walked this country before Lether drew it, and they still walk it their own way: down the field-drains, along the hedge-bottoms, through the eel-ditches that run under the farm tracks in culverts nobody remembers digging. The Letherii maps leave them out. A soldier who knows where the ground goes can be in a ditch on one side of a yard and then, a breath later, behind a wall on the other.',
    get fx(){ return `Once a fight, and it does not use the bearer's action: swap places with any squadmate within ${5 + lvT()}. No free swings. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b7_c3_tracks:{name:TRICKS.b7_c3_tracks.name, trick:'b7_c3_tracks', free:true, desc:()=>TRICKS.b7_c3_tracks.fx,
    tiles:u=>party().filter(p => p !== u && !p.ally && cheb(u, p) <= 5 + lvT()),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const ux = u.x, uy = u.y; sparks(ux, uy, 8, '#8aa898', .4); sparks(t.x, t.y, 8, '#8aa898', .4);
      u.x = t.x; u.y = t.y; t.x = ux; t.y = uy; AUDIO.play('click'); B.moved = true;
      blog(`${u.name} goes down into a ditch nobody else saw and comes up where ${t.name} was. ${t.name} is where ${u.name} was. The Shake call that walking.`); }},
});

/* ---- borrowed pictures until the artist's file (123b) replaces them: three scenes, the recruit, the three items ---- */
{ const like = {b7_c3_floor:'b7_camp_night', b7_c3_gate:'b7_farm_night', b7_c3_house:'b7_farm_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof FIGX !== 'undefined') FIGX.wenna ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
if (typeof ART !== 'undefined') [['b7_c3_letherxbow', 'b6_c1_rebeltulwar'], ['b7_c3_edurmail', 'b6_c3_scorchedmail'], ['b7_c3_ledgerash', 'b6_c1_wellrope']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Seven's glossary ---- */
GLOSSX.rg.push(
  [3, 'Field-drains', 'The ditches the Letherii dug to drain their fields, and the older ones the Shake dug before them. They run under the farm tracks in culverts and come up behind walls. No map shows them.', ()=>!!(S && S.f && S.f.b7_c3_ph >= 2)],
  [3, 'A smoke', 'The marines\' word for a raid that went well: a factor\'s barn, a tally-shed, an Edur camp, burning, and the smoke of it seen for leagues. They count them.', ()=>!!(S && S.f && S.f.b7_c3_ph >= 2)],
  [3, 'A factor\'s house', 'The stone house in the middle of a factor\'s holding, where his steward keeps the debt-rolls for every family that works his land. Most of the country inland belongs to one factor or another. Most of the people in it owe him.', ()=>!!(S && S.f && S.f.b7_c3_ph >= 3)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[3] = ['b7_c3_fire'];

/* the reading: a farmhouse floor inland, no lamp (rg:3); the Assassin */
B7READ[3] = {scene:'b7_c3_floor', where:'the boards of a farmhouse floor, by no lamp', set:'Dusk on the floor of an empty farmhouse inland, the shutters closed and the hearth cold, and the column waking in the wood outside.', back:'b7_c3_fire', backT:'Back to the floor.',
  say:{marrow:'"No lamp," Marrow says. "Good. The Deck reads better in the dark, child, and so do I." She lays her palm on the boards a moment before she lays anything else on them.',
       tallow:'"My grandmother read by touch when the lamp oil ran out," Tallow says. "She said the cards were warmer face down. I never knew if she meant it." He lays them out face down anyway.',
       oldninth:'An old marine of the column, grey to the eyebrows, has a deck as worn as the 9th\'s old soldier\'s ever was. "Every column has one of us," he says. "The 9th\'s went home on a pinnace. I never had a pinnace." He holds out a cup for the rum.'}};

const B7CH3 = {
  title:'Night Raids', number:'Three',
  intro:{loc:'Inland, Lether', sub:'Keneb\'s column · weeks from the coast', scene:'b7_march_night', cap:'A file of soldiers on a farm track in the dark, no lamps, no talking, and a country asleep on either side.',
    paras:[
`Weeks inland. The column moves at night and lies up by day, in woods and ditches and the backs of barns, and the marines have stopped counting the days and started counting smokes instead: a factor's barn, a tally-shed, an Edur camp, burning, and the smoke of it seen for leagues at dawn.`,
()=>{ const v = b73Mates().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Third squad, 9th Legion, lent to the Fist's column as heavies. ${v.length ? `The squad is ${v.length > 1 ? v.slice(0, -1).join(', ') + ' and ' + v[v.length - 1] : v[0]}, and nobody in it has seen noon since the coast.` : 'The Third, this summer, is you, and you have not seen noon since the coast.'} ${S.f.b7_c1_key === 'strip' ? 'The squad still walks heavier than the marines round it, with what it took off the transport. The marines have stopped mentioning it.' : 'The squad walks with what it came ashore with, and what it has taken since.'}`; },
`The Letherii are not rising. Word of that came down the column a week ago from Captain Sort's squads in the north. They are fighting beside the Edur, and the marines are learning what Letherii crossbows can do in the dark.`],
    go:'Wake', node:'b7_c3_start'},

  areas:[
    /* 16 x 12 (b5_c4_wood, night). T trees  , litter  . the wood floor  H the farmhouse at the wood's edge (the Third's floor, the fire)  > out east, down into the valley */
    { id:'b7_c3_wood', title:'A wood above a farm valley', sub:'Dusk · the column\'s lie-up', hint:'Tap ground to move · tap a figure to talk · the farmhouse is at the wood\'s edge, the valley is east', decor:'b5_c4_wood', dark:true,
      map:[ "TTTTTTTTTTTTTTTT",
            "T,,..T....,..TTT",
            "T,H.......,....T",
            "T.........T....T",
            "TT....,.......,T",
            "T....T.........>",
            "T,.........T...T",
            "T....,.........T",
            "T..T.......,...T",
            "T,.....T....s..T",
            "TT,,........,TTT",
            "TTTTTTTTTTTTTTTT" ],
      walk:'.,', triggers:{H:'b7_c3_fire', s:'b7_c3_spring', '>':'b7_c3_out'}, start:{x:3, y:3},
      quest:()=> !S.f.b7_c3_orders1 ? 'The lieutenant, under the trees.' : !b73WennaSettled() ? 'A Shake fisher at the column\'s edge, who knows the ground.' : 'East, down into the valley. The column moves at full dark.',
      npcs:[
        {id:'lt', name:'The lieutenant', kind:'b2soldier', x:8, y:4, node:()=>'b7_c3_lt', fresh:()=>!S.f.b7_c3_orders1},
        {id:'wenna', name:'A Shake fisher', kind:'wenna', x:12, y:7, node:()=>'b7_c3_wenna', show:()=>S.f.b7_wennaDone == null || S.f.b7_wennaDone === 2, fresh:()=>S.f.b7_wennaDone == null},
        {id:'marines', name:'Marines under the trees', kind:'b2soldier', x:6, y:8, node:()=>'b7_c3_marines', fresh:()=>!S.f.b7_c3_marines},
        {id:'bredd', name:'A marine with a skin', kind:'b2soldier', x:2, y:7, node:()=>'b7_c3_bredd', fresh:()=>!S.f.b7_c3_bredd} ] }, // v11.0: the Bredd rumour, backfilled (plan, David, Nov 8)

    /* 16 x 12 (plain_night). , grass  . the farm track  # hedge  C the farm where the crossbowmen lie  V the village  k the Shake track (a
       field-drain under a hedge)  r a rock  x a post  F the halt  < west, back to the wood  > east, to the factor's house */
    { id:'b7_c3_fields', title:'The farm valley', sub:'Night · the column in the fields', hint:'Tap ground to move · tap a figure to talk · the farm is west, the village north-east, the factor\'s house further east', decor:'plain_night', dark:true,
      map:[ "################",
            "#,,,,#,,,,,,,,,#",
            "#,,C,,,,,,,,V,,#",
            "#,,,,,,,#,,,,,,#",
            "<..............>",
            "#,,,,,,,,,,,,,,#",
            "#,,,k,,,,,#,,,,#",
            "#,,,,,,,r,,,,,,#",
            "#,#,,,F,,,,,,,,#",
            "#,,,,,,,,,,,,#,#",
            "#,,x,,,,,,,,,,,#",
            "################" ],
      walk:'.,', triggers:{C:'b7_c3_farm_view', V:'b7_c3_village', k:'b7_c3_track', F:'b7_c3_fire', '<':'b7_c3_fields_back', '>':'b7_c3_fields_east'}, start:{x:1, y:4},
      quest:()=> !S.f.b7_c3_orders2 ? 'The lieutenant, by the hedge.'
        : !S.f.b7_c3_farmDone ? 'The farm to the west, where the crossbowmen lie.'
        : !S.f.b7_c3_prisoners ? 'The prisoners from the farm, by the hedge.'
        : !S.f.b7_c3_village ? 'The village to the north-east.'
        : S.f.b7_c3_village === 'shut' && !S.f.b7_c3_roadDone ? 'The old road round the village, and whatever is on it.'
        : 'East, to the factor\'s house.',
      npcs:[
        {id:'lt', name:'The lieutenant', kind:'b2soldier', x:6, y:3, node:()=>S.f.b7_c3_prisoners ? 'b7_c3_lt2b' : 'b7_c3_lt2', fresh:()=>!S.f.b7_c3_orders2 || (!!S.f.b7_c3_prisoners && !S.f.b7_c3_lt2b)},
        {id:'ditch', name:'Marines in a ditch', kind:'b2soldier', x:11, y:7, node:()=>'b7_c3_ditch', fresh:()=>!S.f.b7_c3_drum},
        {id:'pris', name:'Letherii prisoners', kind:'b5_letherii', x:4, y:4, node:()=>'b7_c3_prisoners', show:()=>!!S.f.b7_c3_farmDone && !S.f.b7_c3_prisoners, fresh:()=>true},
        {id:'road', name:'Fires on the old road', kind:'b5_edur', x:14, y:5, node:()=>'b7_c3_road_start', show:()=>S.f.b7_c3_village === 'shut' && !S.f.b7_c3_roadDone, fresh:()=>true} ] },

    /* 16 x 12 (b5_c5_farm, night). . the yard  , trodden ash and weeds  # stone walls  B the house door (the counting room)  b the barn  w the well  e the gate, to the lane */
    { id:'b7_c3_house', title:'The factor\'s house', sub:'Night · a holding inland', hint:'Tap ground to move · the house door is at the top left · the barn top right · the gate is south', decor:'b5_c5_farm', dark:true,
      map:[ "################",
            "#......#.......#",
            "#......#..bb...#",
            "#..##BB##......#",
            "#..............#",
            "#........,.....#",
            "#,.....w.......#",
            "#..............#",
            "##............##",
            ",#,,...........#",
            ",,#,,..........#",
            ",,,,,,,ee,,,,,,," ],
      walk:'.,', triggers:{B:'b7_c3_door', b:'b7_c3_fire', w:'b7_c3_well', e:'b7_c3_gate'}, start:{x:7, y:10},
      quest:()=> !b73Key() ? 'The counting room, through the house door.' : 'The barn. The column lies up here by day.',
      npcs:[
        {id:'steward', name:'The factor\'s steward', kind:'b5_c1_clerk', x:11, y:6, node:()=>'b7_c3_steward', fresh:()=>!S.f.b7_c3_steward},
        {id:'house', name:'The house\'s Indebted', kind:'b5_c5_refugee', x:3, y:5, node:()=>'b7_c3_servants', fresh:()=>!S.f.b7_c3_servants},
        {id:'lt4', name:'The lieutenant', kind:'b2soldier', x:12, y:9, node:()=>'b7_c3_lt4', show:()=>b73Ph() >= 4, fresh:()=>!S.f.b7_c3_lt4} ] } ],

  battles:{
    /* the farm where the crossbowmen lie: the main fight, two grounds */
    b7_c3_farm:{title:'A farm in the valley', style:'b5_c5_farm', dark:true, warrenText:'Night at a farm inland · the cadre mage has the air prickling', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t..t..","........",".t....t.","........","...tt...","........","..t...t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_lethxbow',1,0],['b7_lethxbow',6,0],['b7_lethxbow',4,1],['b7_lethsoldier',2,2],['b7_lethsoldier',5,2]], xp:280, after:'b7_c3_farm_after',
      preText:()=>`The crossbowmen are good. They have been doing this for a month, to marines, and they know where to lie: behind the farm's wall, in its yard, along the roof-ridge of a cart shed. The first bolts come out of the dark at chest height, flat and fast.`,
      stage2:{title:'The barn', xp:130,
        text:()=>`The yard is the Third's. The barn is not. Its doors are open a hand's width, and in the dark inside something is building in the air that makes the hair stand on every arm in the squad: the Hold's lightning, and the mage who calls it, with the last of the crossbows round him.${b73If('marrow', `\n\nMarrow's hand closes on her string. "Cadre, child," she says. "He has been saving it."`)}${b73If('tangle', `\n\nTangle has a sharper out already. "Barns," he says. "I like barns."`)}`,
        map:["#......#","#..t...#","........","..t..t..","........","........","...t....","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_lethmage',3,0],['b7_lethxbow',1,1],['b7_lethxbow',6,1],['b7_lethsoldier',4,2]]} },
    /* the old road round the shut village: an Edur camp across it (only when the village shuts its gate) */
    b7_c3_road:{title:'The old road', style:'b5_c5_road', dark:true, open:true, warrenText:'Night on the old road · the shadows by the Edur fire are deeper than the fire explains', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....t...","........",".t....t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_edur',1,1],['b7_edur',5,1],['b7_edurspear',4,2],['b7_krisnan',3,0]], xp:160, after:'b7_c3_road_after',
      preText:()=>`They are on their feet before the squad is close, the way Edur always are, grey in the light of their own small fire, and behind them the K'risnan stands up last and slowest, with the dark gathering round his hands.`},
    /* the factor's house and its guard: the main fight, two grounds */
    b7_c3_factor:{title:'The factor\'s house', style:'b5_c5_farm', dark:true, warrenText:'Night in a factor\'s yard · lamps in every window, and the warrens thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","........",".t....t.","........","...t....","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b7_marine',1,7]],
      foes:[['b7_factorman',2,1],['b7_factorman',5,1],['b7_factorman',3,3],['b7_factorman',1,2],['b7_factorman',6,2]], xp:240, after:'b7_c3_factor_after',
      preText:()=>`The factor's men come out of the house with cudgels and lanterns and the confidence of men who have only ever had to beat farmers. The marine the lieutenant sent to hold the gate settles in behind the Third with her crossbow, and says, mildly, "Heavies first."`,
      stage2:{title:'The counting-room door', xp:130,
        text:()=>`The yard is the Third's. The house door is not. Behind it, in the passage to the counting room, there is a Letherii officer in mail that is not Letherii: long, close-linked, dark as wet slate. Edur work. A gift, from people who give few. He has two of the factor's men with him and a crossbow on the stair, and he does not look like a man who means to run.${b73If('haddat', `\n\nHaddat sets the blue shield. "It is a doorway," she says. "He is standing in it."`)}`,
        map:["#..##..#","#......#","..t..t..","........","........","...t....","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_lethofficer',3,1],['b7_factorman',1,2],['b7_factorman',6,2],['b7_lethxbow',5,1]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b7_c3_letherxbow:{name:'A Letherii field crossbow', slot:'weapon', role:'ranged', who:null, rng:1, atk:2, dmg:[1,10,4],
      line:'A Letherii crossbow of the kind that has been killing marines in the dark all summer: a short, heavy stock of oiled ash, a steel prod, a crank-hook on the belt for spanning it, and a bolt-case of twenty. The crossbowman who carried it notched the stock once for every bolt that hit. There are a great many notches. Whoever carries it now adds their own, or not.'},
    b7_c3_edurmail:{name:'The Finadd\'s Edur mail', slot:'armour', role:'mail', who:null, ac:3, hp:2,
      line:'A long shirt of close-linked mail, dark as wet slate, made by Edur smiths for Edur shoulders and cut down by somebody careful for a Letherii officer. A gift, the steward said, from the Edur, for loyalty. The Finadd who wore it was loyal to the end. It is lighter than Malazan mail, and better, and nobody in the Third is going to say so out loud.'},
    b7_c3_ledgerash:{name:'A corner of the debt-roll', slot:'trinket', role:'any', who:null, stat:{guile:1},
      line:'A charred corner off the factor\'s great debt-roll, the one that burned in his counting room: three lines of a steward\'s hand, three families, and the figures beside them gone to brown smoke-stain and then to nothing. What they owed is past reading now. Whoever carries it is a little harder to read too.'} },

  scenes:{
    b7_c3_floor:{loc:'Inland', sub:'An empty farmhouse · dusk', cap:'A bare farmhouse room with the shutters closed, a cold hearth, no lamp, and a squad of soldiers waking on the boards.', amb:'explore'},
    b7_c3_gate:{loc:'Inland', sub:'A village gate · night', cap:'A wattle wall round a village of plaster and thatch, a gate of split poles in it, and a lamp somewhere behind the gate, or none.', amb:'explore'},
    b7_c3_house:{loc:'Inland', sub:'A factor\'s house · night', cap:'A house of dressed stone behind a yard wall, lamps in every window, a long barn, an orchard, and the farm cottages dark all round it.', amb:'explore'} },

  end:{
    ledger:['The smoke from the counting room', 'Weeks inland, the column raided by night and lay up by day, and the Letherii did not rise. The Third took a farm full of crossbowmen with a Shake fisher showing the way, and came at dawn to a factor\'s house a day from anywhere, and burned his debt-rolls in his own counting room, every family on the holding and every figure beside every name. The smoke stood up over the valley all morning. The farms round about watched it, and said nothing to anybody, and some of them put bread by the road.'],
    loot:['Fed', 'Weeks inland, the column raided by night and lay up by day, and the Letherii did not rise. The Third took a farm full of crossbowmen with a Shake fisher showing the way, and came at dawn to a factor\'s house a day from anywhere, and took his silver and his medicine chest and left his debt-rolls on their shelves. The squad ate well for a week. The farms round about saw the Malazans carry the factor\'s strongbox out of his gate, and drew their own conclusions.'] },
  endScene:'b7_march_night',
  endCap:()=> b73Key() === 'ledger' ? 'A file of soldiers going on in the dusk, and behind them over the valley a column of smoke from a counting room that is still smoking.' : 'A file of soldiers going on in the dusk with full packs, and behind them a factor\'s house with its shelves still full.',
  tease:'Next: Kravos Hill. The Sixth Company mustered against the invaders, the Edur in the camp, and Patriotists with a list.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b7_c3_key === 'ledger') x.push('The Third burned a factor\'s debt-rolls in his own counting room. Every family on the holding is owing nothing, for now.');
    if (f.b7_c3_key === 'loot') x.push('The Third emptied a factor\'s strongbox and his medicine chest, and left his debt-rolls on the shelves.');
    if (f.b7_wennaDone === 1) x.push(b7In('wenna') ? 'Wenna, a Shake fisher who knows the inland roads, walks with the Third, with her gaff.' : 'Wenna, a Shake fisher, walks with the Third.');
    if (f.b7_wennaDone === 2) x.push('Wenna, a Shake fisher, waits with the fishers at the column\'s edge, if the squad will have her.');
    if (f.b7_wennaDone === 0) x.push('Wenna, a Shake fisher, went back toward the sea.');
    if (f.b7_c3_prisoners === 'freed') x.push('Letherii crossbowmen taken at a farm were sent home without their crossbows. The country heard about it.');
    if (f.b7_c3_prisoners === 'kept') x.push('Letherii crossbowmen taken at a farm were handed to the column, tied, and marched with it.');
    if (f.b7_c3_village === 'open') x.push('A village in the valley opened its gate to the Third.');
    if (f.b7_c3_village === 'shut') x.push('A village in the valley kept its gate shut. The Third went round by the old road, and met the Edur on it.');
    if (f.b7_c3_tracksOk) x.push('The Third learned the Shake tracks: the field-drains no map shows.');
    if (f.b7_c3_steward === 'freed') x.push('The factor\'s steward walked off down the lane toward the city with the clothes he stood in.');
    if (f.b7_c3_steward === 'locked') x.push('The factor\'s steward was locked in his own pantry for the factor to find.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b7_c3_key && (f.b7_c3_key === 'ledger' ? 'The Third burned the debt-rolls of a factor\'s holding in his counting room. The smoke was seen for leagues.' : 'The Third took a factor\'s silver and his medicine chest, and left his rolls on their shelves.'),
    f.b7_c3_factorDone && 'A factor\'s house inland, guarded by his men and a Letherii Finadd in Edur mail.',
    f.b7_c3_roadDone && 'An Edur camp on the old road round a shut village, with a K\'risnan at its fire.',
    f.b7_c3_village && (f.b7_c3_village === 'open' ? 'A village in the valley opened its gate to the Third. Word had got there first.' : 'A village in the valley kept its gate barred. Every family inside was afraid to be the one who opened it.'),
    f.b7_c3_prisoners && (f.b7_c3_prisoners === 'freed' ? 'The Third let the crossbowmen from the farm go home, without their crossbows.' : 'The Third handed the crossbowmen from the farm to the column.'),
    f.b7_c3_farmDone && 'Letherii crossbowmen and a cadre mage lay in wait at a farm in the valley. They had been killing marines for a month.',
    f.b7_c3_drum && 'Something went up on a road to the north, louder than any cusser. The marines grinned and would not say whose.',
    f.b7_wennaDone != null && 'A Shake fisher named Wenna, at the column\'s edge with smoked fish to sell, offered to show the Third the roads the maps leave out.',
    'The Letherii are not rising. They fight beside the Edur. Word came down the column from the north.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: dusk in the wood; the farmhouse floor ======== */
    b7_c3_start:()=>({sp:'The farmhouse', scene:'b7_c3_floor', fx:()=>{ S.f.b7_c3_ph = S.f.b7_c3_ph || 1; }, again:()=>'The farmhouse floor, the shutters closed, the hearth cold, and the light going outside.', txt:
`You wake on the boards of an empty farmhouse at the edge of a wood, with a cloak under your head and somebody's boot in your back, and the light through the shutter-cracks going from gold to grey.

The family that lived here left before the column came, and took everything that could be carried: the pots, the lamp, the door off the hearth-oven. What is left is a table too heavy to move, a cold hearth, and a floor that the Third has slept on all day like the dead.

${b73Say({haddat:`Haddat is already up, sitting with her back to the wall and the blue shield across her shins, looking at the cold hearth. "Somebody's home," she says. "Was."`, marrow:`Marrow is sitting up with her string in her lap, her lips moving. She finishes the knot before she looks at you.`, _:`The squad wakes as soldiers wake on a strange floor, one at a time, each surprised to find the others.`})}${b73If('tangle', `\n\nTangle sleeps on, the satchel under his head and the fuse-cord round both wrists.`)}${b73If('doss', `\n\nDoss is at the shutter with an eye to the crack. "Barley," he says. "Badly sown. The factor's man wasn't watching." He sounds almost pleased.`)}

Outside, in the wood, the column is waking too. Somewhere under the trees a voice is calling for the heavies.`,
      ch:[b7ReadChoice(3),
          {t:'The floor. Sit a while.', go:'b7_c3_fire'},
          {t:'Out into the wood.', go:()=>startExplore()}]}),
    b7_c3_read:()=>b7ReadOffer(3),
    b7_c3_card:()=>b7ReadCard(3),

    /* the lieutenant: the night's orders, the crossbowmen, the guide */
    b7_c3_lt:()=>({sp:'The lieutenant', scene:'b7_camp_night', fx:()=>{ S.f.b7_c3_orders1 = 1; }, again:()=>'The lieutenant, under the trees with her slate. "A guide, Sergeant. Then the valley."', txt:
`The lieutenant is crouched under an oak with her slate on her knee, as she has been every dusk for weeks. She looks thinner. Everybody does. ${b73Strip() ? 'Her eyes go to the Third\'s packs first, out of habit, and then to you.' : 'She looks up when the Third comes, and moves over on her root to make room, which from her is a great deal.'}

"There's a farm down in the valley," she says. "Letherii crossbowmen lie up in it by day and go out by night after marine squads. Them and a cadre mage. Two nights back they put a bolt through a marine called Sands, up the line. Not the first." She taps the slate. "The Fist wants them gone. The farm's walls and a barn. You know my view of heavies and walls."

"And Sergeant: the word from Captain Sort's squads in the north. The Letherii aren't rising. They're fighting beside the Edur, and they're good at it." She tucks the slate away. "So we hit what the Edur and the factors use, and we leave the people be, and we see."`,
      ch:[{t:'"How do we find the farm in the dark?"', go:'b7_c3_lt_guide'},
          {t:'"Walls and a barn. Yes, Lieutenant."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c3_lt_guide:()=>({sp:'The lieutenant', scene:'b7_camp_night', txt:
`"Not with my map." She says it with feeling. "Letherii maps show the roads the tax-collectors ride and nothing else. Half the farm tracks on mine aren't there, and the other half are somebody's ditch."

She nods along the wood's edge, to where a handful of figures sit apart from the marines with baskets at their feet. "Shake. Fishers off the coast. A few of them have followed the column inland since the beach, selling smoked fish, because the Edur took their boats and they've nothing else to sell. They know this country. They walked it before Lether drew it." She shrugs. "Take one, if one will come. Pay what they ask. It'll be cheaper than a squad."`,
      ch:[{t:'"A Shake guide. Yes, Lieutenant."', go:()=>startExplore()}]}),

    /* Wenna: a Shake fisher at the column's edge */
    b7_c3_wenna:()=>{ const d = S.f.b7_wennaDone;
      if (d === 2) return {sp:'Wenna', scene:'b7_camp_night', txt:
`Wenna is still with the fishers at the column's edge, mending a cord with her teeth and her fingers, her gaff across her knees. She sees you coming and goes on mending, which seems to be how the Shake say good evening.`,
        ch:[{t:'"Walk with us, Wenna."', fx:()=>{ b7Join('wenna'); b73L('haddat', 1); }, go:'b7_c3_wenna_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A Shake fisher', scene:'b7_camp_night', again:()=>'The Shake fisher, mending her cord, waiting to see what the heavies want.', txt:
`The fisher is a woman of thirty or so, brown and lean, in oiled sealskin over wool with a cord of shells round her neck, sitting on her heels with a basket of smoked fish beside her and a gaff on a line across her knees. She is mending a length of tarred cord with her teeth. Her feet are bare, and wet: she has found the one spring in the whole wood and put them in it.

"Fish," she says, in Letherii, and then in a trade-tongue with the salt still in it. "Smoked. Two silver a string." She looks at the Third, one by one, the way she might look at a catch. "Or you want the other thing. The lieutenant's been showing people that map." She snorts. "The Letherii drew that map from a horse. I walked it."`,
        ch:[{t:'"Show me where it lies."', go:'b7_c3_wenna_map'},
            {t:'A string of fish.', tag:'2 silver', req:()=>(S.silver || 0) >= 2 && !S.f.b7_c3_fish, fx:()=>{ S.silver -= 2; updSilver(); S.f.b7_c3_fish = 1; }, go:'b7_c3_wenna_fish'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c3_wenna_fish:()=>({sp:'A Shake fisher', scene:'b7_camp_night', txt:
`She counts the silver twice, bites one, and hands over a string of smoked fish, six to the string, hard as boot-leather and twice as salty.

${b73Say({tangle:'Tangle tries one and makes a face, and then eats the rest of it anyway. "Salt," he says. "Keeps you awake."', mirrel:'Mirrel sniffs one. "Salt and smoke. It won\'t go off." She shares it out, one each. "Eat. Good."', haddat:'Haddat eats hers slowly, the way she eats everything. "My mother sold water," she says. "She would have charged three."', _:'The squad eats it on the spot. It is the first thing in weeks that has not tasted of the column.'})}

"The Edur took my brother's boat," the fisher says, apropos of nothing, watching them eat. "So I sell fish to Malazans. The sea is a long way back."`,
      ch:[{t:'"Show me where the farm lies."', go:'b7_c3_wenna_map'},
          {t:'Back to the wood.', go:()=>startExplore()}]}),
    b7_c3_wenna_map:()=>({sp:'A Shake fisher', scene:'b7_camp_night', txt:
`She takes a stick and draws in the leaf-litter. The wood, here. The valley below it. The farm the lieutenant wants, a long walled yard and a barn, west along the valley floor. The village north of the track, with its wattle wall. A factor's house further east, in stone, where the valley narrows.

Then she draws the other things, the ones the map leaves out: the field-drains along the hedge-bottoms, the eel-ditch that runs under the farm track in a culvert nobody has cleared in forty years, the dry ditch that comes up behind the farm's barn wall.

"The Letherii call that the Factor's Road," she says, tapping the track. "We call it the road the gulls don't use." She taps the ditch. "That's ours. Shake dug it before the Letherii came. They think it's theirs, because it's on their land."${S.f.b7_c1_dossRoads && b7In('doss') ? `\n\nDoss is crouched beside her, looking at the drawing. "Same as the coast," he says. "Same kind of ditches." She looks at him with a fisher's approval, which is very little, and plenty.` : ''}

She drops the stick. "I'll walk you in. I want the Edur off my coast. You're the only people I've met this year who want the same."`,
      ch:[{t:'"Then walk with us. You\'ll be paid as the squad is paid."', fx:()=>{ b7Join('wenna'); b73L('haddat', 1); b73L('marrow', 1); }, go:'b7_c3_wenna_join'},
          {t:'"Wait with the fishers. We\'ll send for you if we need you."', fx:()=>{ S.f.b7_wennaDone = 2; }, go:'b7_c3_wenna_wait'},
          {t:'"Go back to the sea, fisher. This is no road for you."', fx:()=>{ S.f.b7_wennaDone = 0; b73L('haddat', -1); }, go:'b7_c3_wenna_home'},
          {t:'"Why do you want the Edur gone?"', req:()=>!S.f.b7_c3_wennaWhy, go:'b7_c3_wenna_why'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c3_wenna_why:()=>({sp:'A Shake fisher', scene:'b7_camp_night', fx:()=>{ S.f.b7_c3_wennaWhy = 1; }, txt:
`"My brother had a boat," she says. "A good one, clinker-built, his own, not owed. The Edur came along the coast in the spring taking boats for their fleet. He said no." She goes back to her cord. "They took it anyway. He's in the sea now. The Shore has him."

She bites off the cord. "And the Shake have a queen again this year. Did you hear? Everyone on the coast says so, out loud, to anyone. For years before that, nobody said anything out loud." She looks up. "Things are moving. I'd like to be walking when they move."`,
      ch:[{t:'"Then walk with us."', fx:()=>{ b7Join('wenna'); b73L('haddat', 1); b73L('marrow', 1); }, go:'b7_c3_wenna_join'},
          {t:'"Wait with the fishers for now."', fx:()=>{ S.f.b7_wennaDone = 2; }, go:'b7_c3_wenna_wait'},
          {t:'"Go back to the sea."', fx:()=>{ S.f.b7_wennaDone = 0; b73L('haddat', -1); }, go:'b7_c3_wenna_home'}]}),
    b7_c3_wenna_join:()=>({sp:'Wenna', scene:'b7_camp_night', txt:
`${b7In('wenna') ? `"Wenna," she says, and touches the shells at her throat. She stands, and slings the gaff on its line over one shoulder and the basket on the other, and looks at the Third the way she looked at it before, as a catch, only now it is hers.

"Heavies," she says. "The marines say it like a joke." She considers your boots. "Walk in the ditch-bottoms, not the sides, and nobody will hear you. Even you."${b73If('doss', `\n\nDoss nods to her, one field-hand to another. She nods back. It seems to settle something.`)}` : `She nods, and goes back to wait with the fishers: six already walk with the Third, and a fisher can count a crew. "When there's room in the boat," she says.`}`,
      ch:[{t:'Back to the wood.', go:()=>startExplore()}]}),
    b7_c3_wenna_wait:()=>({sp:'Wenna', scene:'b7_camp_night', txt:
`She shrugs, as if that were the answer she expected from soldiers, and goes back to her cord.

"Wenna," she says, without looking up. "Ask for Wenna. I'll be at the edge with the fish. The edge is where the Shake are used to being."`,
      ch:[{t:'Back to the wood.', go:()=>startExplore()}]}),
    b7_c3_wenna_home:()=>({sp:'A Shake fisher', scene:'b7_camp_night', txt:
`She looks at you a while, and then at the valley, and then west, toward the sea, which is a long way off and smells of nothing from here.

"The sea," she says. "Yes." She shoulders her basket and her gaff and goes off along the wood's edge without hurrying, a woman going home by a road she knows.${b73If('haddat', `\n\nHaddat watches her go, and keeps her opinion to herself. It shows anyway.`)}

The lieutenant's map, then.`,
      ch:[{t:'Back to the wood.', go:()=>startExplore()}]}),

    /* the spring Wenna found in the wood */
    b7_c3_spring:()=>({sp:'A spring in the wood', scene:'b7_camp_night', txt:
`A spring comes up between the roots of a beech into a stone basin somebody set there long ago, and runs off downhill into the valley in a thread of water nobody would notice. ${S.f.b7_wennaDone === 1 ? 'Wenna found it the moment the column came into the wood, and put her feet in it.' : 'There are wet footprints on the basin\'s rim, small and bare: one of the Shake fishers found it first.'}

The water is cold and sweet and tastes of stone. The squad fills its skins, and drinks, and fills them again.${b73If('marrow', `\n\nMarrow puts her fingers in it, and holds them there, and takes them out. "Old, child," she says. "Older than the farms. It remembers somebody who said a word over it once."`)}`,
      ch:[{t:'Back to the wood.', go:()=>startExplore()}]}),

    /* marines under the trees: camp talk (the ten smokes) */
    /* v11.0 (David, Nov 8: Neffarias Bredd, one rumour in every book where Malazan soldiers gather, bigger each time, never seen; Book Four's
       is b4_c5_bredd, Book Six's b6_c5_bredd). Optional; it sets b7_c3_bredd and nothing else. */
    b7_c3_bredd:()=>({sp:'A marine with a skin', scene:'b7_camp_night', fx:()=>{ S.f.b7_c3_bredd = 1; }, again:()=>'The marine with the skin, still whispering about Bredd.', txt:
`A marine is lying under a hedge with a skin of something that is not water, and whispers to the Third as you go past, because the column does not talk out loud by day.

"Neffarias Bredd," she whispers. "You heard? The night the ships burned. He swam out and put three of them out with his helmet, on his own, and then the Adjunct looked at him, and he swam back out and lit them again." She passes the skin. "He's inland now. Ahead of us. They say the Edur have stopped posting sentries on the roads he might use, because they keep finding them asleep, and nobody can say who put them to sleep." She takes the skin back. "Never seen him. That's how good he is."${b73Say({tangle:`\n\n"With his helmet," Tangle whispers. "Not a sharper."\n\n"He doesn't need a sharper," the marine whispers back, with contempt. "He's Neffarias Bredd."`, doss:`\n\nDoss is listening with his whole face. "Is he Indebted?" he whispers. Nobody knows. By morning, along the hedge, he is.`, _:''})}`,
      ch:[{t:'Drink to Neffarias Bredd, quietly.', go:()=>startExplore()},
          {t:'"Three ships is plenty."', go:()=>startExplore()}]}),
    b7_c3_marines:()=>({sp:'Marines under the trees', scene:'b7_camp_night', fx:()=>{ S.f.b7_c3_marines = 1; }, again:()=>'The marines under the trees, sharpening, whispering, counting smokes.', txt:
`A squad of marines is sitting in a ring under a beech, sharpening, and whispering, which they are not supposed to do.

"Ten," one of them is saying. "Tissy went up a tree at dawn and counted ten smokes, all round the horizon. Ten. Ours, every one." He tests an edge with his thumb. "The Letherii must think there's ten thousand of us."

"There's not ten thousand of us," says the one beside him.

"I know there's not. That's the joke." He looks up and sees the Third. "Evening, heavies. You'll be the ones going in the farm door, then. Rather you than me. Their crossbows go through a shield." He considers the Third's shields. "Most shields."`,
      ch:[{t:'Back to the wood.', go:()=>startExplore()}]}),

    /* the fire: by phase. 1 the farmhouse floor at dusk, no lamp; 2 the march (no fire); 3 the factor's house before the key (no fire);
       4 the factor's barn at dawn. The games pass wraps this node: keep the id */
    b7_c3_fire:()=>{ const ph = b73Ph();
      if (ph === 2) return {sp:'The farm valley', scene:'b7_march_night', txt:
`No fire on the march. The column is in the fields on both sides of the valley, and the only light in all this country is the village's one lamp, and the stars.`,
        ch:[{t:'Talk with the squad.', go:'b7_c3_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (ph === 3) return {sp:'The factor\'s barn', scene:'b7_c3_house', txt:
`The factor's barn is long and dry and smells of hay and horses that are not there any more: the factor took them to the city. The column will lie up here by day. Not yet. The counting room first.`,
        ch:[{t:'Talk with the squad.', go:'b7_c3_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      const barn = ph >= 4, rk = 'b7_c3_rest' + (barn ? 4 : 1);
      return {sp:barn ? 'The factor\'s barn' : 'The farmhouse floor', scene:barn ? 'b7_c3_house' : 'b7_c3_floor', html:risingHTML(),
        again:()=> barn ? 'The factor\'s barn by day, the squad in the hay, the doors shut on the light.' : 'The farmhouse floor, the cold hearth, the light going.', txt:
`${barn ? `The factor's barn by day: hay to the rafters at one end, empty stalls at the other, the big doors barred on the light, and the column asleep in it in rows like sacks. No fire. There is never a fire now. The squad sits in the hay in a ring round where one would be.${b73Key() === 'ledger' ? `\n\nThrough a crack in the boards the counting room is still smoking, a thin grey thread going straight up in the still air.` : ''}` : `No lamp and no fire: the column lights neither. The Third sits on the farmhouse floor round the cold hearth in the last grey light, out of habit, and passes the water skin round it instead. The hearthstone is still a little warm from the sun through the shutters. It is the nearest thing to a fire in a week.`}${b73Say({marrow:`\n\nMarrow is picking burrs out of her sleeve, one at a time, and dropping them into the dark.`, haddat:`\n\nHaddat sits with her back to the wall and the blue shield against her shins.`, _:''})}`,
        ch:[...(barn ? [] : [b7ReadChoice(3)]),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(barn ? 'The squad sleeps the day through in the factor\'s hay. Wounds close, mostly.' : 'The squad sits an hour on the farmhouse floor. Wounds close, mostly.'); }, go:'b7_c3_fire_rest'},
            {t:'Talk with the squad.', go:'b7_c3_fire_talk'},
            {t:'Out with the column. Down into the valley.', req:()=>ph === 1 && !!S.f.b7_c3_orders1 && b73WennaSettled(), onward:true, go:'b7_c3_out'},
            {t:'Dusk. On with the column.', req:()=>barn && !!b73Key(), onward:true, go:'b7_c3_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c3_fire_rest:()=>({sp:b73Ph() >= 4 ? 'The factor\'s barn' : 'The farmhouse floor', scene:b73Ph() >= 4 ? 'b7_c3_house' : 'b7_c3_floor', txt:
`${b73Ph() >= 4 ? 'The day, then, in the hay, with the sun going over the barn roof and the column asleep, and the pickets awake in the orchard.' : 'An hour, then, on the boards, with the shutters going dark one crack at a time.'}

${b73Say({marrow:`Marrow kneels by each of them in turn and lays two fingers on a wrist, and frowns, and moves on. "Bramble," she says, "in every cut, child. What do you do in a ditch, roll?" She closes one anyway.`, mirrel:`Mirrel passes the water skin hand to hand and takes it back off anyone who drinks twice. "Drink. Good."`, _:'Some of them sleep. The rest sit with their backs to the wall and do not.'})}${b73If('haddat', `\n\nHaddat lies down with her head on her pack and says names under her breath, and at the end of them the transport's, as she has since the coast.`)}${b73If('wenna', `\n\nWenna sleeps with her bare feet braced against the wall, like a fisher against a boat's strake.`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c3_fire'}]}),
    b7_c3_fire_talk:()=>{ const ph = b73Ph(), late = ph >= 3, ln = [];
      if (b7In('haddat')) ln.push(late ? `Haddat is looking at the house. "My mother said a rich man's house always has one more room than you can see," she says. "That is where he keeps what he owes." She considers. "She meant it about the water-sellers' guild. I think it is true here."` : `Haddat is looking at the cold hearth. "They took the pots," she says. "They left the table." She runs a hand along it. "You cannot carry a table and run. They knew they would run."`);
      if (b7In('sathi')) ln.push(late ? `Sathi is lying on her back with her filed teeth showing. "Crossbowmen in a barn," she says. "Weasels would have burned it with them in. You heavies are soft." She seems to approve of it, a little.` : `Sathi is cleaning under her nails with a knife. "Night raids," she says. "Weasels did it for years. We never had a lieutenant with a slate."`);
      if (b7In('tangle')) ln.push(`Tangle has the satchel open, counting. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." He touches the Kanese bead at his wrist. "${late ? 'The marines went through more last night than we have. I heard one go off up north. Biggest thing I ever heard.' : 'The marines are counting smokes. I count these. Mine go down.'}"`);
      if (b7In('marrow')) ln.push(late ? `Marrow is warming her knuckles in her armpits. "A mage up north called something last night, child," she says. "Not a cadre mage. Older. I felt it in my teeth." She sniffs. "Something that does not belong in a farmhouse. The marines will hear about it. So will we."` : `Marrow is tying a slow knot in her string. "The column's mages are tired, child," she says. "Weeks of Mockra every night. It frays." She draws the knot tight. "So do they."`);
      if (b7In('mirrel')) ln.push(late ? `Mirrel is rolling her linen. "A crossbow bolt doesn't care how heavy you are," she says. "I've taken four out of marines this week. Their shields stop arrows." She ties the roll. "These aren't arrows."` : `Mirrel is counting the salves into her bag in threes. "${numw(S.inv.salve || 0, true)}," she says. "No hospice. No next town that's ours." She closes the bag. "Don't get cut."`);
      if (b7In('tallow')) ln.push(`Tallow is turning his grandmother's deck in its oilcloth without opening it. "She said a farmhouse with no one in it is a bad place to read," he says. "The cards want somebody to have been happy there." He looks round the room. "I'll not ask them."`);
      if (b7In('hessa')) ln.push(`Hessa sits straight with the spear upright. "D'rek is under the fields here too," she says. "Further down, but there. The worm turns the soil." She puts her palm flat on the ground. "The Letherii think they own it because they wrote it in a book."`);
      if (b7In('tebbet')) ln.push(`Tebbet is looking at a Letherii crossbow bolt he dug out of a fence-post. "Steel head," he says. "Fletched with goose. They go through a shield at fifty paces." He turns it. "My bow puts one through a man at two hundred." He puts it away. "They don't need two hundred, in the dark."`);
      if (b7In('darrut')) ln.push(`Darrut has his helm on his knee. "In the Aren Guard," he says, "we fought where people could see us. In the light. That was the point of us." He looks out at the dusk. "I am still not sure what the point of us is here."`);
      if (b7In('yorin')) ln.push(`Yorin has his copper wind-vane on his palm. It points north, and holds there, and trembles. "Something up there pulled every wind in the valley toward it last night," he says. "Serc didn't like it. Neither did I."`);
      if (b7In('rasp')) ln.push(`Rasp is checking fuses with her lips moving. "The marines have a thing they do with a cusser and a road," she says. "I heard two of them talking. I'm not supposed to know." She grins. "Now I know."`);
      if (b7In('orvas')) ln.push(`Orvas is looking at the farm horses' empty stalls. "A country with horses," he says, "and every one of them sent to the city ahead of us." He pulls a strap tight. "The Khundryl would have them back by morning. The Burned Tears are with the Adjunct. I keep remembering that."`);
      if (b7In('redblade')) ln.push(`Ramin is scraping rust off the links of his scale. "The farmers watch us from their doors," he says. "In Seven Cities they would have run, or thrown stones." He keeps scraping. "Here they watch. I do not like being watched by people who are counting."`);
      if (b7In('warlock')) ln.push(`Keth sits with his knees drawn up, very still. "*Men who owe their own children,*" the grandmother says, out of his mouth. "*My mother's country had a word for that, boy. It was not a kind word.*"`);
      if (b7In('mehet')) ln.push(`Mehet is turning his ring of keys over. "The factor's house will have a counting room," he says. "Every rich man's house in Y'Ghatan did. Two locks, always. One for the thief, one for the son." He holds up a key. "I have opened both kinds."`);
      if (b7In('ottar')) ln.push(`Ottar is cleaning the wolf on his shield with a thumb. "Today's word," he says, "is *culvert*. Wenna taught it." He tries it again. "In Perish a culvert is where you put a dead enemy so the river takes him. Here, I see, it is a road."`);
      if (b7In('doss')) ln.push(late ? `Doss is looking at the factor's house with an expression the squad has not seen on him before. "Every holding has one," he says. "The big house in stone. You go to the back door on quarter-days with your board, and a man reads you your line." He wipes his hands on his jerkin, slowly. "I never went in the front."` : `Doss is watching the barley through the shutter. "There's a debt on every row of that," he says. "Seed, and the plough, and the hire of the ox. Wrote it down in the big house before it was ever sown." He says it as a man reads out a list he has heard too often.`);
      if (b7In('wenna')) ln.push(late ? `Wenna has her bare feet in the water-trough. "On the coast we owe nobody," she says. "The Shake were here first. The factors never worked out how to write that down." She wriggles her toes. "So they leave us alone and call us dirty. It is a fair trade."` : `Wenna is mending cord with her teeth. "The Letherii," she says, round it, "count everything. Fish, nets, boats, children. Write it all in a book." She bites the cord off. "We count tides. You can't write a tide in a book. It goes out while you're writing."`);
      return {sp:ph >= 3 ? 'The factor\'s barn' : ph === 2 ? 'The farm valley' : 'The farmhouse floor', scene:ph >= 3 ? 'b7_c3_house' : ph === 2 ? 'b7_march_night' : 'b7_c3_floor', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b7_c3_fire'}]}; },

    /* out of the wood: the column moves at full dark */
    b7_c3_out:()=>{ const ok = !!S.f.b7_c3_orders1 && b73WennaSettled();
      return {sp:'The wood\'s edge', scene:'b7_camp_night', txt: !ok ?
`The valley lies below the wood in the dusk, fields and hedges and a long walled farm to the west, a village with a wattle wall to the north-east, and further east, where the valley narrows, a house in stone with lamps already lit. ${!S.f.b7_c3_orders1 ? 'The lieutenant has the night\'s orders, under the trees.' : 'The lieutenant said: a guide, if one will come. The Shake fishers are at the wood\'s edge.'}` :
`Full dark. The column goes down out of the wood into the valley without a word, squad by squad, by the hedge-bottoms and the field-drains, and over all of it the mages lay their tired Mockra, so that a farmer at his door sees his own hedges and nothing in them.${b7In('wenna') ? `\n\nWenna goes first, barefoot, the gaff on her shoulder. She never once turns to see if the Third is following. The Shake, it seems, assume.` : b7In('doss') ? `\n\nDoss goes first, because somebody has to, and because he knows field-drains with his feet.` : `\n\nThe lieutenant's map goes first, in your head, and is wrong almost at once.`}`,
        ch: !ok ? [{t:'Back to the wood.', go:()=>startExplore()}] :
          [S.area === 'b7_c3_fields' ? {t:'Down into the valley.', fx:()=>{ S.f.b7_c3_ph = Math.max(2, S.f.b7_c3_ph || 1); }, go:'b7_c3_fields_arrive'} // already in the valley: it stays
           : {t:'Down into the valley.', onward:true, fx:()=>{ S.f.b7_c3_ph = 2; }, go:()=>{ startExplore('b7_c3_fields'); talk('b7_c3_fields_arrive'); }},
           {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== phase 2: the fields at night ======== */
    b7_c3_fields_arrive:()=>({sp:'The farm valley', scene:'b7_march_night', txt:
`The valley at night is a country of hedges. Between them the barley stands up to the waist, whispering, and the farm tracks run white under the stars, and nobody walks on them. The column is in the ditches.

West, the long farm the lieutenant wants is dark behind its wall, but there is a smell of a banked fire on the air from that way, and once, faintly, the click of a crossbow being spanned. North-east, the village sits behind its wattle with one lamp lit. East, the factor's house has a lamp in every window, as if it had nothing in the world to fear.${b73If('wenna', `\n\n"Fools," Wenna says, of the house, very quietly. "Lamps." She sounds personally offended.`)}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c3_fields_back:()=>({sp:'The farm valley', scene:'b7_march_night', txt:
`West and up, the wood the column slept in is a black line along the sky. Nothing back there now but an empty farmhouse with a cold hearth.`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),
    b7_c3_fields_east:()=>{ const ok = b73EastOpen() && !!S.f.b7_c3_farmDone;
      return {sp:'The lane east', scene:ok ? 'b7_c3_house' : 'b7_march_night', txt: ok ?
`The lane runs east between high hedges toward the factor's house. Its lamps are still lit, every window. The column is coming up through the orchards on both sides of it, and the lieutenant has sent word: the yard is the heavies'.` :
`The lane runs east toward the factor's house. ${!S.f.b7_c3_farmDone ? 'The lieutenant wants the farm and its crossbows dealt with before the column turns its back on them.' : !S.f.b7_c3_prisoners ? 'There are prisoners from the farm sitting by the hedge, waiting to learn what they are now.' : !S.f.b7_c3_village ? 'The lieutenant wants to know what the village will do before the column passes under its wall.' : 'The old road round the village has Edur on it, between the column and the house.'}`,
        ch: ok ? [{t:'Up the lane, to the house.', onward:true, fx:()=>{ S.f.b7_c3_ph = Math.max(3, S.f.b7_c3_ph || 1); }, go:'b7_c3_house_view'},
                  {t:'Not now.', go:()=>startExplore()}] :
                 [{t:'Back to the fields.', go:()=>startExplore()}]}; },

    /* the lieutenant at the hedge: the farm */
    b7_c3_lt2:()=>({sp:'The lieutenant', scene:'b7_march_night', fx:()=>{ S.f.b7_c3_orders2 = 1; }, again:()=> S.f.b7_c3_farmDone ? 'The lieutenant, in the hedge-bottom. "The village next, Sergeant. Then the house."' : 'The lieutenant, in the hedge-bottom. "The farm, Sergeant. West."', txt:
`The lieutenant is lying in a hedge-bottom with two of her own, watching the long farm to the west over the barley.

"Five crossbows that we've counted, maybe six," she says. "Soldiers with them. The mage is in the barn: you can feel him from here, if you've a mage, and if you haven't you'll feel him later." She points with the stylus. "My lot will hold the track so nothing runs east to the house. The yard and the barn are yours."

"After the farm, the village. I want to know if it opens or shuts before we walk under its wall. Then the house." She looks at you. "Take anyone who throws a crossbow down. I'll not have it said we didn't."`,
      ch:[{t:'"The farm. Yes, Lieutenant."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* marines in a ditch: a far sound on a road north (Fiddler's Drum, heard of only) */
    b7_c3_ditch:()=>({sp:'Marines in a ditch', scene:'b7_march_night', fx:()=>{ S.f.b7_c3_drum = 1; }, again:()=>'The marines in the ditch, still grinning at the north.', txt:
`A squad of marines is lying in a dry ditch, waiting. As the Third comes up, the whole northern sky goes white for a breath, a long way off, beyond the valley's rim, and a long count later the sound arrives: not a crack, like a sharper, nor a thump, like a cusser, but a single enormous blow, as if somebody had dropped a mountain on a road. The barley flattens. Every dog in the valley starts at once.

The marines in the ditch look at each other and grin. They do not look surprised.

"That'll be the road north," one of them says. "There's been digging up there all week." She will not say whose. "Ask your sapper what a drum sounds like, heavies, when you hit it hard enough."${b73Say({tangle:`\n\nTangle has gone quite still with his mouth open. "That's not a cusser," he says. "That's a lot of cussers. Stacked." He sounds like a man in church.`, rasp:`\n\nRasp lets out a breath. "Stacked," she says. "They stacked them. I heard them say it."`, _:''})}`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),

    /* the Shake track: the trick (Wenna; else Doss; else an old Shake fisher) */
    b7_c3_track:()=>{ const te = b73Teacher();
      return {sp:te === 'wenna' ? 'Wenna' : te === 'doss' ? 'Doss' : 'An old Shake fisher', scene:'b7_march_night', again:()=> S.f.b7_c3_tracksOk ? 'The field-drain under the hedge, the way in and the way out.' : 'The field-drain under the hedge, where the Shake track goes down out of sight.', txt:
`${te === 'wenna' ? `${b7In('wenna') ? 'Wenna' : 'Wenna, come up from the fishers at the column\'s edge,'} stops at a hedge and goes down on her heels, and pulls the long grass aside. Under it, a field-drain, lined with old stone, running away under the hedge and out of sight.

"Shake dug this," she says. "Before Lether. It goes under the track, there, and comes up in the barley the far side, and from there there's another, and another." She looks up. "A Letherii looking for you looks along the hedge. You're under it. Then you're behind him. Then you're where your friend was a breath ago, and your friend's where you were." She grins. "Learn the ditches and you can be anywhere. Like the tide."` : te === 'doss' ? `Doss stops at a hedge and goes down on his heels, and pulls the long grass aside. Under it, a field-drain, lined with old stone, running away out of sight.

"Every holding has these," he says. "Older than the factors. Field-hands use them to get from one row to another without the overseer seeing you'd stopped." He looks up, almost shy. "You can be in one row, and then in another, and the man on the horse never sees you go. I did it for twenty years."` : `An old Shake fisher, one of the handful who follow the column selling fish, is squatting by a hedge, and beckons. Under the long grass there is a field-drain, lined with old stone, running away out of sight.

"Ours," he says. "Before Lether. Under the track, up in the barley, and on." He taps his nose. "A Letherii looks along a hedge. A Shake is under it. Learn that, soldiers, and you'll be where your friend was, and he'll be where you were, and the Letherii will still be looking at the hedge."`}`,
        ch:[{t:'Learn the drains: where each one goes, and where it comes up.', check:['wits', 17], trick:'b7_c3_tracks', req:()=>!S.f.b7_c3_tracksTried, fx:()=>{ S.f.b7_c3_tracksTried = 1; },
              edges:id=>[id === 'wenna' && ['the Shake tracks are hers', 3], id === 'doss' && ['twenty years of field-drains', 2], id === 'mehet' && ['a city boy who knew every drain in Y\'Ghatan', 1], id === 'sathi' && ['the Weasels moved by gully and wash', 1], id === 'sgt' && ['you have been walking behind a guide for an hour, watching', 1], id === 'ottar' && ['grey plate does not go down a field-drain', -2], id === 'haddat' && ['the blue shield will not fit in a culvert', -1], id === 'darrut' && ['the Aren Guard did not crawl', -1]],
              near:{t:()=>`Yes, but the drains go on for most of an hour, in the wet, and ${b73Nm(b73Who())} ${b73V(b73Who(), 'come', 'comes')} up out of the last one soaked to the waist. ${b73Nmc(b73Who())}'ll feel it in the fight.`, fx:()=>bruise(b73Who(), bruiseN())},
              go:'b7_c3_track_ok', fail:'b7_c3_track_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c3_track_ok:()=>({sp:'The Shake track', scene:'b7_march_night', fx:()=>{ S.f.b7_c3_tracksOk = 1; b73L('wenna', 1); }, txt:
`By the time the moon is up ${by({sgt:'you can', wenna:'Wenna is calling you a fisher, which seems to be praise, and you can', doss:'Doss is grinning in the dark, and you can', _:'{who} can'})} take the whole of the Third down into a drain on one side of the farm track and up into the barley on the other without a stalk moving, and back, and along to the next.

${b73Teacher() === 'wenna' ? '"There," Wenna says. "Now you walk like people."' : b73Teacher() === 'doss' ? '"There," Doss says. "Now the overseer can\'t see you either."' : '"There," the old fisher says. "Now you\'re a little bit Shake." He seems to think this is the best thing he could say of anyone.'}`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),
    b7_c3_track_no:()=>({sp:'The Shake track', scene:'b7_march_night', txt:
`It is a lot of ditches, and all of them look the same in the dark. The squad goes down into one and comes up, after a long wet crawl, in exactly the same place it went in, facing the other way.

${b73Teacher() === 'wenna' ? '"Took me a childhood," Wenna says. "You had an hour." She does not sound surprised.' : b73Teacher() === 'doss' ? '"Took me years," Doss says, apologetically. "I\'m not good at showing."' : '"Took me sixty years," the old fisher says. "You had an hour." He goes back to his fish.'}`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),

    /* the farm where the crossbowmen lie: the main fight, and the guide's way in (rise:true) */
    b7_c3_farm_view:()=>{ const done = !!S.f.b7_c3_farmDone, g = b73Guide();
      if (done) return {sp:'The farm', scene:'b7_farm_night', again:()=>'The farm, its barn open, its yard quiet.', txt:
`The farm is the Third's. Its barn stands open on the dark, and the smell of the mage's lightning is still in it, like hot iron.`,
        ch:[{t:'Search the farmhouse.', req:()=>!S.f.b7_c3_searched, go:'b7_c3_farm_search'},
            {t:'Back to the fields.', go:()=>startExplore()}]};
      if (!S.f.b7_c3_orders2) return {sp:'The farm', scene:'b7_farm_night', txt:
`A long farm behind a stone wall, west along the valley floor, a barn and a cart shed and a house, all dark. Somewhere inside the wall there is a banked fire. The lieutenant, in the hedge-bottom, will want a word before the Third goes over that wall.`,
        ch:[{t:'Back to the fields.', go:()=>startExplore()}]};
      return {sp:'The farm', scene:'b7_farm_night', txt:
`The farm lies dark behind its wall: a long house, a cart shed with a ridged roof, a barn with its doors a hand's width open. Nothing moves. That is the worst of it. Crossbowmen who have been killing marines for a month do not move.

${g === 'wenna' ? `Wenna is lying beside you in the barley. "Ditch," she breathes, and points: a dry ditch under the hedge that runs right up behind the barn wall. "They watch the gate and the track. They never watch a ditch."` : g === 'doss' ? `Doss is lying beside you in the barley. "There's a drain," he breathes. "There always is. Behind the barn." He points. "They'll watch the gate."` : `The lieutenant's map shows a gate and a track, and the gate and the track are exactly what the crossbows will be watching. There might be a ditch behind the barn. There usually is.`}${b73If('marrow', `\n\nMarrow's lips are pressed thin. "The mage is in the barn, child," she says. "Awake."`)}`,
        ch:[{t:'"Third! Over the wall!" Straight at them.', go:()=>startBattle('b7_c3_farm', {})},
            {t:g === 'wenna' ? 'Wenna\'s way: down the dry ditch and in behind the barn.' : g === 'doss' ? 'Doss\'s way: the drain behind the barn.' : 'Find the ditch behind the barn, and go in that way.', check:['wits', 15], rise:true,
              edges:id=>[id === 'wenna' && ['the Shake tracks are hers', 3], id === 'doss' && ['he knows field-drains with his feet', 2], S.f.b7_c1_dossRoads && id === 'doss' && ['he drew you these tracks in the dirt on the coast', 1], S.f.b7_c3_tracksOk && id === 'sgt' && ['the Shake track: the squad goes in under the hedge', 2], g === 'wenna' && id === 'sgt' && ['Wenna is in the ditch in front of you', 1], id === 'sathi' && ['she went in under Odhan camps for the Weasels', 1], id === 'ottar' && ['grey plate in a ditch is a bell', -2], id === 'darrut' && ['an Aren Guard\'s kit was not made for ditches', -1]],
              near:{t:()=>`Yes, but the ditch is not as dry as it looked, and ${b73Nm(b73Who())} ${b73V(b73Who(), 'come', 'comes')} up out of it at the barn wall with a mouthful of it and a knee on a stone. ${b73Nmc(b73Who())}'ll be a step slow for a while.`, fx:()=>bruise(b73Who(), bruiseN())},
              fx:()=>{ S.f.b7_c3_guided = 1; }, go:()=>startBattle('b7_c3_farm', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c3_farm_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c3_farm_seen:()=>({sp:'The farm', scene:'b7_farm_night', txt:
`Halfway up the ditch a sheep that nobody knew about stands up in the dark and says what it thinks of soldiers. On the cart-shed roof a crossbow turns. Then all of them do.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b7_c3_farm', {surprise:'e'})}]}),
    b7_c3_farm_after:()=>({sp:'The farm', scene:'b7_farm_night', fx:()=>{ if (!S.f.b7_c3_farmDone) { S.f.b7_c3_farmDone = 1; gain('b7_c3_letherxbow'); } }, txt:
`The barn is quiet. The air in it still prickles where the mage's last lightning went into the rafters instead of into anybody, and a beam is smouldering, and ${b73Say({tangle:'Tangle', haddat:'Haddat', _:'somebody'})} puts it out with a cloak.

The crossbows lie where they fell. One of them is better than the others, short and heavy, with a steel prod and a stock notched along its whole length, a notch for every bolt that hit. It goes in the kit.

And three of the crossbowmen are alive, on their knees in the yard with their hands on their heads and their spanning-hooks thrown down in front of them. They are Letherii, not Edur: young, frightened, and in the same blue-grey the Letherii regulars wear. They threw their crossbows down. The lieutenant said: take anyone who does.${b73If('mirrel', `\n\nMirrel is already looking them over for wounds. "One's cut," she says. "Not deep. Sit. Still. Good."`)}`,
      ch:[{t:'The prisoners.', go:'b7_c3_prisoners'}]}),

    /* the farmhouse at the farm, after the fight */
    b7_c3_farm_search:()=>({sp:'The farmhouse', scene:'b7_farm_night', fx:()=>{ if (!S.f.b7_c3_searched) { S.f.b7_c3_searched = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('In the mage\'s pack: a jar of the cadre\'s salve, as good as one of Mirrel\'s.', 'good'); } }, txt:
`The farmhouse is where the crossbowmen slept by day: blankets on the floor in rows, bolts in bundles by the door, a pot of something cold on the hearth. The family that farmed here is not here. A child's wooden horse on the windowsill says they were, once.

On the table, under a stone, an order in a Letherii clerk's hand with an Edur mark pressed into the wax at its foot: the garrison at some town north of here to send *crossbowmen and one mage of the cadre* into the valleys *to clear the invaders from the farms*. The Edur mark is above the Finadd's signature, not below it.${b73Say({tangle:`\n\nTangle reads it over your shoulder. "Edur say go," he says, "and the Letherii go." He sniffs. "Captain Sort's lot had it right."`, haddat:`\n\nHaddat looks at the Edur mark a long while. "Above," she says. "Not below."`, _:'\n\nCaptain Sort\'s word, written down: the Letherii fight beside the Edur because the Edur say so.'})}

In the mage's pack there is a jar of the cadre's own salve, sealed, which the Third takes, and nothing else anybody wants.`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),

    /* the prisoners from the farm: let go or kept (the Rising, once) */
    b7_c3_prisoners:()=>{ const c2 = S.f.b7_c2_key;
      return {sp:'Letherii prisoners', scene:'b7_farm_night', html:risingHTML(), again:()=>'The three crossbowmen, kneeling by the hedge, waiting.', txt:
`They are sitting by the hedge now, hands tied in front, while the marines on the track look over at them and then at the Third, waiting to see.

The oldest is perhaps twenty. He does the talking, in Letherii and then in a soldier's trade-tongue. "We were told to," he says. "The Edur came to the garrison and said, the Malazans are here, go and kill them, and the Finadd said yes." He swallows. "I'm Indebted. So's he. The army pays down the debt. A little. If you live."

He looks at the farm. "My mother's people farm three valleys east. If you let us go, I'll go there. I won't go back to the garrison. They'd send me out again."

${c2 === 'refuse' ? `"In Letheras," the second one says, unasked, "they say a squad of the city's own soldiers told the Patriotists no, to their faces, and lived the week. People whisper it in the barracks." He seems to think it is something a Malazan should know.` : c2 === 'name' ? `"In Letheras," the second one says, unasked, "the Patriotists take a door a night now. They had a name off a squad of the city's own soldiers, they say, and used it." He seems to think it is something a Malazan should know.` : `"In Letheras," the second one says, unasked, "the Patriotists take a door a night now." He seems to think it is something a Malazan should know.`}`,
        ch:[{t:'"Go home. Without the crossbows. Tell your mother\'s valley who let you go."', fx:()=>{ if (!S.f.b7_c3_prisoners) { S.f.b7_c3_prisoners = 'freed'; b7Rise(1, 'Letherii prisoners sent home'); b73L('haddat', 1); b73L('marrow', 1); b73L('sathi', -1); } }, go:'b7_c3_pris_free'},
            {t:'Hand them to the column, tied. The lieutenant can decide.', fx:()=>{ if (!S.f.b7_c3_prisoners) { S.f.b7_c3_prisoners = 'kept'; b7Rise(-1, 'Letherii prisoners kept'); b73L('tangle', 1); b73L('mirrel', 1); b73L('haddat', -1); } }, go:'b7_c3_pris_keep'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c3_pris_free:()=>({sp:'Letherii prisoners', scene:'b7_farm_night', html:risingHTML(), txt:
`The cords come off. They stand, and look at each other, and then at the Third, as if waiting for the joke. Then the oldest one says something in Letherii that is plainly thanks, and they go off east along a hedge-bottom at a fast walk, without looking back, three young men going home three valleys over with a story about Malazans.

${b73Say({haddat:'Haddat watches them go. "They will tell it," she says. "In every farmhouse between here and there."', tangle:'"They\'ll say there were a hundred of us," Tangle says. "With a dragon."', _:'They will tell it. That was the point.'})}${b73If('sathi', `\n\nSathi watches them go with her teeth showing. "Weasels would have kept the boots," she says.`)}

On the track, the lieutenant watches it too, and keeps whatever she thinks of it off her slate.`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),
    b7_c3_pris_keep:()=>({sp:'Letherii prisoners', scene:'b7_farm_night', html:risingHTML(), txt:
`Two marines come down off the track and take them, a cord from wrist to wrist, and march them off into the dark after the column. The oldest one looks back once, at the farm, and then he is gone into the hedges with the others.

${b73Say({mirrel:'Mirrel watches them go. "They\'ll slow the column," she says. "Somebody will have to feed them." She does not say what happens if somebody won\'t.', haddat:'Haddat watches them go, and after a while says, "They were boys," to the dark.', _:'The column will feed them, or it won\'t. It is the lieutenant\'s to decide now.'})}

The farms along the valley will hear that the Malazans take men off farms and march them away. Farms always hear.`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),

    /* the lieutenant after the farm: her word on the prisoners and the village */
    b7_c3_lt2b:()=>({sp:'The lieutenant', scene:'b7_march_night', fx:()=>{ S.f.b7_c3_lt2b = 1; }, again:()=>'The lieutenant, in the hedge-bottom. "The house, Sergeant. East."', txt:
`The lieutenant is still in her hedge-bottom with the slate. ${S.f.b7_c3_prisoners === 'freed' ? `"You let them go," she says. Not a question. She writes something. "The Fist will hear of it. He'll hear of it from the farms before he hears it from me." She looks up. "That's not a complaint, Sergeant. That's how you'd want him to hear it."` : `"Two of mine are walking three boys behind the column on a cord," she says. "They'll eat our food and slow our march." She writes something. "You did what I said. I said take them." She looks at the slate a while longer than the writing needs.`}

"${S.f.b7_c3_village ? (S.f.b7_c3_village === 'open' ? 'The village opened. To you. I\'ll take that' : 'The village stayed shut. I don\'t blame it') : 'Now the village. Let\'s see if it opens'}. Then the house."`,
      ch:[{t:'"The house. Yes, Lieutenant."', go:()=>startExplore()}]}),

    /* the village: it opens its gate if the Rising has reached it (b7Open), or keeps it shut */
    b7_c3_village:()=>{ const v = S.f.b7_c3_village;
      if (v === 'open') return {sp:'The village', scene:'b7_c3_gate', again:()=>'The village gate, open a hand\'s width, and the lamp behind it.', txt:
`The village gate stands open a hand's width. Behind it the old woman's lamp is still lit, and somebody has left a jar of water by the gatepost where the marines will pass.`,
        ch:[{t:'Back to the fields.', go:()=>startExplore()}]};
      if (v === 'shut') return {sp:'The village', scene:'b7_c3_gate', again:()=>'The village gate, barred, dark.', txt:
`The village gate is barred and the lamp behind it is out. ${S.f.b7_c3_roadDone ? 'The old road round it is the Third\'s.' : 'The old road round the wall, east, has fires on it.'}`,
        ch:[{t:'Back to the fields.', go:()=>startExplore()}]};
      if (!S.f.b7_c3_farmDone || !b73VillageOpen()) return {sp:'The village', scene:'b7_c3_gate', txt:
`A village of plaster and thatch behind a wall of wattle and stakes, north of the track, with one lamp lit somewhere behind its gate. ${!S.f.b7_c3_farmDone ? 'The lieutenant wants the farm first. A village with crossbowmen at its back will not open to anybody.' : 'There are prisoners from the farm sitting by the hedge, waiting. The village will want to know what the Malazans do with prisoners before it knows what it does with Malazans.'}`,
        ch:[{t:'Back to the fields.', go:()=>startExplore()}]};
      const open = b7Open();
      return {sp:'The village', scene:'b7_c3_gate', html:risingHTML(), txt:
`The village sits behind its wattle wall with one lamp lit. The column has come up round it in the dark, and the village knows: there are no dogs barking, which means somebody went round and shut them in.

You go up to the gate alone but for ${b73Say({wenna:'Wenna', doss:'Doss', haddat:'Haddat', _:'the squad at your back'})}, and stand where the lamp can see you.

${open ? `For a long breath nothing happens. Then the bar comes back, and the gate opens a hand's width, and an old woman looks out at you over her lamp.

"You're the ones who burned the shed on the coast road," she says, in Letherii, then in trade-tongue. "And let the boys go at the farm." Word has got here first, the way word does. She opens the gate a little wider. "Come in, then. Quietly. We've children asleep."` : `For a long breath nothing happens. Then the lamp behind the gate goes out.

A voice through the wattle, a man's, low: "Go round. Go round by the old road. We've children. If the Edur hear we opened the gate to you, they'll burn us for it, and you'll be gone by morning." A pause. "There's Edur on the old road. A camp. We can't help that either."`}`,
        ch: open ? [{t:'Into the village.', fx:()=>{ S.f.b7_c3_village = 'open'; }, go:'b7_c3_village_open'}]
                 : [{t:'"The old road, then."', fx:()=>{ S.f.b7_c3_village = 'shut'; }, go:'b7_c3_village_shut'}]}; },
    b7_c3_village_open:()=>({sp:'The village', scene:'b7_c3_gate', fx:()=>{ S.f.b7_c3_villageIn = 1; }, txt:
`Inside the wall, a square of beaten earth with a well in it, and the doors round it shut, but not barred. Faces at the shutter-cracks. The old woman puts a loaf in your hands, and then another, and a crock of something that is mostly onions.

"The factor's house," she says, nodding east. "You'll be going there. Everybody goes there in the end." She tells you how: not the lane, which the factor's men watch, but the orchard wall on the north side, where the stones are loose because nobody in the village has been let into the orchard in thirty years to mend them. "His steward reads us our lines on quarter-days at the back door," she says. "My grandson's line is longer than he is tall."${b73If('doss', `\n\nDoss is standing by the well with his cap in his hands. "Same here," he says to her. "Same everywhere." She looks at the flail, and then at his face, and nods.`)}${b73If('wenna', `\n\nWenna is drinking from the well bucket without asking, which seems to be the Shake way with wells. The old woman lets her.`)}`,
      ch:[{t:'The well, and the faces at the shutters.', req:()=>!S.f.b7_c3_well2, go:'b7_c3_village_well'},
          {t:'Back to the fields.', go:()=>startExplore()}]}),
    b7_c3_village_well:()=>({sp:'The village well', scene:'b7_c3_gate', fx:()=>{ S.f.b7_c3_well2 = 1; }, txt:
`The well in the square is brackish, the old woman says: it goes brackish every summer, and the factor's well, a league east, never does, and the village is not let draw from the factor's well. The squad drinks anyway.

At the shutters, the faces watch. A boy of ten or so comes out of a door in a man's jerkin to the knees and stands by the well looking at ${b73Say({haddat:'Haddat\'s blue shield', tangle:'Tangle\'s satchel', _:'the Third\'s kit'})} with the whole of his face.

"That's my grandson," the old woman says. "The one with the line longer than he is." The boy does not know what she means, or he does, and has decided not to mind. "His uncle went for a soldier, to pay it down. The army pays down a debt a little, if you live." She takes the boy's shoulder. "He went with the crossbows."${S.f.b7_c3_prisoners === 'freed' ? `\n\nShe does not say which crossbows, or which farm. She does not need to. She looks at you for a moment longer than she has to, and then takes the boy indoors.` : `\n\nShe does not ask which crossbows, or which farm, or where the three boys on the cord are going. She takes the boy indoors.`}`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),
    b7_c3_village_shut:()=>({sp:'The village', scene:'b7_c3_gate', txt:
`The lamp stays out. Behind the wattle, somebody is breathing very quietly, and a child is being told to hush, in a whisper that carries.

${b73Say({haddat:'"They are afraid of the right thing," Haddat says, and turns away from the gate.', doss:'"They\'re right," Doss says, unhappily. "I\'d not open it either. Not yet."', marrow:'"Afraid, child," Marrow says. "Of the Edur, not of us. That is something, at least."', _:'They are afraid of the right thing. That is not nothing.'})}

The old road goes round the east side of the wall. There are fires on it.`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),

    /* the old road round the shut village: an Edur camp */
    b7_c3_road_start:()=>({sp:'The old road', scene:'b7_march_night', txt:
`A sunken road round the east side of the village, older than the farms, between banks with hawthorn on top. Across it, in a hollow where it bends, an Edur camp: one small fire, four grey shapes round it, long spears stacked, and a fifth sitting apart, wrapped in a dark cloak, very still. A K'risnan. Even from here the shadows round him lie wrong.${b73If('marrow', `\n\nMarrow hisses through her teeth. "That one, child," she says. "Him first, or he'll have us all."`)}`,
      ch:[{t:'"Third! Down the road!" Straight at them.', go:()=>startBattle('b7_c3_road', {})},
          {t:'Along the hawthorn bank, above them, quiet.', check:['guile', 16],
            edges:id=>[id === 'wenna' && ['she walked this road as a girl, selling fish', 2], S.f.b7_c3_tracksOk && id === 'sgt' && ['the Shake track runs along this bank', 2], id === 'sathi' && ['she crept up on Odhan camps for the Weasels', 2], id === 'tebbet' && ['a bowman knows how to be above and unseen', 1], id === 'ottar' && ['grey plate in hawthorn is a bell', -2], id === 'darrut' && ['he is not built for banks', -1]],
            near:{t:()=>`Yes, but the hawthorn gets its own back on the way along, and ${b73Nm(b73Who())} ${b73V(b73Who(), 'come', 'comes')} down off the bank scratched to the elbows. ${b73Nmc(b73Who())}'ll carry that into the next fight.`, fx:()=>bruise(b73Who(), bruiseN())},
            go:()=>startBattle('b7_c3_road', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c3_road_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c3_road_seen:()=>({sp:'The old road', scene:'b7_march_night', txt:
`A twig. Only a twig, on the bank, under a boot. Four grey heads come round together, and the K'risnan stands, and the fire in the hollow goes very small.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b7_c3_road', {surprise:'e'})}]}),
    b7_c3_road_after:()=>({sp:'The old road', scene:'b7_march_night', fx:()=>{ if (!S.f.b7_c3_roadDone) { S.f.b7_c3_roadDone = 1; S.silver = (S.silver || 0) + 6; updSilver(); note('Off the Edur camp: six silver in Letherii coin, a soldier\'s pay.', 'good'); } }, txt:
`The road is the Third's. The Edur fire has gone out, as if something had put it out from the inside, and the hollow is very dark.

The K'risnan lies a little apart from the others, as he sat. The squad leaves him be a while, and then ${b73Say({haddat:'Haddat', mirrel:'Mirrel', _:'somebody'})} does, because somebody has to, and comes back and says only, "He's dead." In the Edur packs there is a purse of Letherii coin, a soldier's pay, which seems to be what the Edur pay their Letherii and do not bother to give them.${b73Say({haddat:`\n\nHaddat kneels by the nearest Edur and says *a soldier*, as she does, and gets up.`, _:''})}

Behind the village wall, a shutter opens a crack, and closes.`,
      ch:[{t:'Back to the fields.', go:()=>startExplore()}]}),

    /* ======== phase 3: the factor's house ======== */
    b7_c3_house_view:()=>{ const done = !!S.f.b7_c3_factorDone;
      if (done) return {sp:'The factor\'s house', scene:'b7_c3_house', txt:
`The factor's house is the Third's. Its gate stands open on the yard.`,
        ch:[{t:'Into the yard.', onward:true, go:()=>{ startExplore('b7_c3_house'); talk('b7_c3_house_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The factor\'s house', scene:'b7_c3_house', txt:
`A house of dressed stone behind a yard wall, two floors, a slate roof, a lamp in every window: the only stone house in the valley, and the only lit one. A long barn beside it. An orchard behind. In the yard, through the gate, the factor's men are standing about with cudgels and lanterns, talking loudly, as men do who have heard a very big noise from the north and been told it was nothing.

${S.f.b7_c3_villageIn ? 'The orchard wall on the north side, the old woman said. Where the stones are loose.' : 'There is an orchard wall on the north side. Walls have weak courses, usually.'}${b73If('doss', `\n\nDoss is looking at the house. His hands are white on the flail.`)}${b73If('mehet', `\n\nMehet looks at the upper windows. "Counting room's on the ground floor," he says. "Back of the house. They always are. Money's heavy."`)}`,
        ch:[{t:'"Third! Through the gate!" Straight in.', go:()=>startBattle('b7_c3_factor', {})},
            {t:'Round by the orchard wall, and over it.', check:['wits', 15],
              edges:id=>[S.f.b7_c3_villageIn && id === 'sgt' && ['the old woman told you where the stones are loose', 2], id === 'tangle' && ['a sapper reads a wall for its weak course', 1], id === 'mehet' && ['he has been over a great many walls', 1], id === 'doss' && ['he has climbed a factor\'s orchard wall before, for apples', 1], id === 'wenna' && ['barefoot on a wall is easy', 1], id === 'haddat' && ['a shield is no help on a wall', -1], id === 'ottar' && ['grey plate and a wall disagree', -2]],
              near:{t:()=>`Yes, but a loose stone goes out from under ${b73Nm(b73Who())} at the top, and ${b73Nm(b73Who())} ${b73V(b73Who(), 'land', 'lands')} in the orchard on a hip. ${b73Nmc(b73Who())}'ll be stiff by the next fight.`, fx:()=>bruise(b73Who(), bruiseN())},
              go:()=>startBattle('b7_c3_factor', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c3_house_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c3_house_seen:()=>({sp:'The factor\'s house', scene:'b7_c3_house', txt:
`The orchard has geese in it, which no map shows and no one thought to mention. The factor's men come round the corner of the house with their lanterns up, shouting, and somebody in an upper window is shouting louder.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b7_c3_factor', {surprise:'e'})}]}),
    b7_c3_factor_after:()=>({sp:'The factor\'s house', scene:'b7_c3_house', fx:()=>{ if (!S.f.b7_c3_factorDone) { S.f.b7_c3_factorDone = 1; gain('b7_c3_edurmail'); } S.f.b7_c3_ph = Math.max(3, S.f.b7_c3_ph || 1); }, txt:
`The yard is quiet. The factor's men who could run have run, out through the orchard and away across the fields, and the lanterns lie where they dropped them, still burning.

The Finadd is down in the passage outside the counting room in his Edur mail, long and dark and close-linked, the kind no Letherii smith makes. A gift, for loyalty. He was loyal. The mail goes in the kit; it fits, near enough, with a little lacing.${b73Say({haddat:`\n\nHaddat stands in the passage with the blue shield, where he stood. "It is a doorway," she says. "Now I am standing in it."`, _:''})}

Through the house, at the back, there is a door with two locks on it, and behind the door the factor keeps what the valley owes him.`,
      ch:[{t:'Into the yard.', onward:true, go:()=>{ startExplore('b7_c3_house'); talk('b7_c3_house_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c3_house_arrive:()=>({sp:'The factor\'s yard', scene:'b7_c3_house', again:()=>'The factor\'s yard, the lanterns guttering, the house door open.', txt:
`The column is coming in through the orchard and the gate now, marines spreading through the outbuildings, quiet, quick, the way they do everything. The lieutenant's word comes down: the column lies up here by day. The barn for the squads. The house for nobody.

In the yard, by the well, a thin man in a good coat is standing very straight with his hands clasped, as if waiting to be announced. At the kitchen door, a knot of people in homespun who are plainly not the factor's household but its Indebted, the ones who cook and scrub and carry, are watching the Malazans with no expression at all.

The house door stands open. The counting room is at the back.`,
      ch:[{t:'The counting room.', go:'b7_c3_door'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),

    /* the steward: the factor is in the city */
    b7_c3_steward:()=>({sp:'The factor\'s steward', scene:'b7_c3_house', again:()=> S.f.b7_c3_steward ? 'The steward has been seen to.' : 'The steward, very straight, waiting to be told what he is now.', txt:
`The steward is a thin Letherii in a good coat with ink on the second finger of his right hand, and he holds himself as if the coat were armour. "The factor is in Letheras," he says, in careful trade-tongue, before you have asked. "He went a month ago, when the news came from the coast. With the horses and the plate." He swallows. "He left me the house, and the rolls, and the Finadd, and told me nothing would come up this valley that the Finadd could not deal with."

He looks at the passage where the Finadd lies. "I wrote to him that it would. He did not answer."${b73Key() === 'ledger' ? `\n\nHe looks at the smoke coming out of the back of his house. "Thirty years," he says. "Thirty years I kept those rolls. Every family. Every quarter." He seems unsure whether he is grieving or relieved, and so, it seems, is his face.` : b73Key() === 'loot' ? `\n\nHe looks at the strongbox going out of the gate. "He'll say I gave it you," he says. "He'll add it to my own line." He almost laughs. "I'm in the rolls too, you know. Every steward is."` : ''}`,
      ch:[{t:'"Walk to the city, steward. Tell the factor the Malazans came up his valley. It is even true."', fx:()=>{ S.f.b7_c3_steward = 'freed'; b73L('haddat', 1); b73L('marrow', 1); }, go:'b7_c3_steward_free'},
          {t:'Lock him in his own pantry for the factor\'s people to find.', fx:()=>{ S.f.b7_c3_steward = 'locked'; b73L('tangle', 1); b73L('mirrel', 1); }, go:'b7_c3_steward_lock'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c3_steward_free:()=>({sp:'The factor\'s steward', scene:'b7_c3_house', txt:
`He bows, which nobody expected, and goes out of the gate in his good coat, and down the lane toward the city at a walk that wants very badly to be a run, and is not allowed to be.

${b73Say({doss:'Doss watches him go. "He read us our lines," he says. "That one, or one like him. Every quarter-day." He does not move. "Let him walk."', haddat:'"He will tell them it was a thousand of us," Haddat says.', _:'He will tell the factor there were a thousand of you. Let him.'})}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c3_steward_lock:()=>({sp:'The factor\'s steward', scene:'b7_c3_house', txt:
`He goes into the pantry without being pushed, and sits down on a sack of meal, and thanks you when the door is shut. ${b73Say({mehet:'Mehet locks it with the steward\'s own key, and then, out of habit, with one of his.', tangle:'Tangle wedges the latch with a fuse-spike. "Comes out with a good pull," he says, "if you know where." The steward does not know where.', _:'The bolt is a good one. The factor paid for good bolts.'})}

"Thank you," he says again, through the door. "It will look much better. He might believe me."`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the house's Indebted: the cooks and carriers */
    b7_c3_servants:()=>({sp:'The house\'s Indebted', scene:'b7_c3_house', fx:()=>{ S.f.b7_c3_servants = 1; }, again:()=>'The house\'s Indebted, at the kitchen door, watching.', txt:
`There are seven of them at the kitchen door: a cook with her arms floury to the elbow, two girls, an old man, a boy with a bucket, two women who scrub. They are the factor's, in the way the table and the plate were the factor's, except that the plate went to Letheras and they did not.

${b73Key() === 'ledger' ? `They are watching the smoke come out of the back of the house. The cook is crying, without any sound, and does not seem to know it. The boy with the bucket is grinning so widely it looks painful.\n\n"All of it?" the old man asks. You tell him: all of it. He nods, slowly, for some time.` : b73Key() === 'loot' ? `They are watching the factor's strongbox go out of the gate between two marines. "That was his," the cook says. "It's yours now." She seems to be working out whether that is better or worse for her, and not getting an answer. The rolls are still on their shelves. They know it. They know exactly which shelf.` : `"Are you going to burn it?" the cook asks. She does not say what. She does not need to. "The rolls. In there." She looks at the house. "He keeps them in there. Everybody on the holding is in them. Us too." She wipes her hands on her apron. "I only ask."`}${b73If('doss', `\n\nDoss stands with them a while, and the kitchen door is very quiet. He seems to belong there, and also not, and to know both.`)}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    b7_c3_well:()=>({sp:'The factor\'s well', scene:'b7_c3_house', txt:
`The factor's well has a stone head and a good windlass and a roof over it against the leaves, and the water at the bottom is sweet and cold. The village's well, the old woman said, goes brackish every summer. This one never has. The squad fills its skins, and drinks, and fills them again.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c3_gate:()=>({sp:'The factor\'s gate', scene:'b7_c3_house', txt: b73Key() ?
`Through the gate the lane runs west toward the village in the grey before dawn. The column lies up here by day, in the barn and the orchard, and the pickets are already out along the lane. At dusk it moves on.` :
`Through the gate the lane runs west toward the village. Not yet. The counting room first.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the counting room: the key */
    b7_c3_door:()=>{ const k = b73Key();
      if (!S.f.b7_c3_factorDone) return {sp:'The house door', scene:'b7_c3_house', txt:`The house door is barred from inside. Somebody behind it is still loyal.`, ch:[{t:'Back to the yard.', go:()=>startExplore()}]};
      return {sp:'The counting room', scene:'b7_c3_house', txt: k ?
`${k === 'ledger' ? 'The counting room is black to the ceiling and still warm. The shelves are bare boards, charred. The great roll is ash on the table, a long grey shape of ash that still holds the shape of what it was, until somebody opens the door and the draught takes it.' : 'The counting room is as it was, but for the strongbox, and the medicine chest, and a draught from the open door that makes the rolls on their shelves stir a little in their ribbons, as if they were breathing.'}` :
`Two locks on the door. ${b73If('mehet', 'Mehet opens both with the steward\'s keys and then, out of pride, with one of his own. ')}Inside, a room with one high window and shelves on every wall, and on the shelves, rolls: parchment rolls, each tied with a ribbon, each ribbon a colour, each colour a family, and every family on the holding is here. On the table in the middle lies the great roll, the one the others are copied into, open at the last quarter-day.`,
        ch: k ? [{t:'Back to the yard.', go:()=>startExplore()}] : [{t:'Into the counting room.', go:'b7_c3_counting'}, {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c3_counting:()=>({sp:'The counting room', scene:'b7_c3_house', html:risingHTML(), txt:
`The steward's hand is small and patient. Every family on the holding has its line: the seed, the plough-hire, the ox, the roof, the interest, the interest on the interest, quarter after quarter, generation after generation, every figure carried down to the next. Some of the rolls are so old the ribbons have faded white.

There is a strongbox under the table, iron-bound, and it is heavy. There is a medicine chest on a shelf by the window, with the factor's mark on it, full of the good salves the factor kept for his own household and did not share. The Third has been living off the land for weeks. The land has not been generous.

${b73Strip() ? 'The squad still has some of what it took off the transport. Not much, now.' : 'The squad has what it came ashore with, and less every week.'}${b73If('doss', `\n\nDoss is standing in the doorway with the flail hanging from his hand. He is looking at the shelves. "Burn it," he says, very quietly. It is not quite a request. "Sergeant. Burn it."`)}${b73If('wenna', `\n\nWenna is looking at the strongbox. "Fish don't buy themselves," she says. Then she looks at the rolls${b7In('doss') ? ', and at Doss' : ''}, and leaves it there.`)}${b73If('tangle', `\n\nTangle has a fuse out already. Tangle always has a fuse out already. "Your choice, Sergeant," he says. "I'm only ready."`)}${b73If('mirrel', `\n\nMirrel has the medicine chest open. "Good salves," she says. "Better than ours. There's enough here for a month." She does not close it.`)}`,
      ch:[{t:'Burn the rolls. All of them, and the great roll with them.', fx:()=>{ if (!S.f.b7_c3_key) { S.f.b7_c3_key = 'ledger'; S.f.b7_c3_ph = 4; b7Rise(2, 'a factor\'s debt-rolls burned'); gain('b7_c3_ledgerash'); b73L('doss', 2); b73L('haddat', 1); b73L('marrow', 1); b73L('wenna', -1); b73L('mirrel', -1); } }, go:'b7_c3_ledger'},
          {t:'Take the strongbox and the medicine chest. The squad has to eat.', fx:()=>{ if (!S.f.b7_c3_key) { S.f.b7_c3_key = 'loot'; S.f.b7_c3_ph = 4; S.silver = (S.silver || 0) + 20; updSilver(); S.inv.salve = (S.inv.salve || 0) + 2; note('Out of the factor\'s strongbox and chest: twenty silver and two salves.', 'good'); b7Rise(-1, 'a factor\'s house looted, his rolls left'); b73L('mirrel', 1); b73L('wenna', 1); b73L('tangle', 1); b73L('doss', -2); b73L('haddat', -1); } }, go:'b7_c3_loot'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b7_c3_ledger:()=>({sp:'The counting room', scene:'b7_c3_house', html:risingHTML(), txt:
`It goes up slowly, as parchment does: the ribbons first, flaring in their colours one after another down the shelves, and then the rolls themselves curling and spitting, and the great roll on the table last, its pages lifting one by one on the heat as if somebody were reading the whole valley's debts very fast, aloud, to the end.

The smoke goes out of the high window and up into the grey before dawn, straight up in the still air, and stands there over the valley like a post.

A corner of the great roll lifts off on the heat and goes up toward the ceiling, and ${b73Say({doss:'Doss', haddat:'Haddat', _:'somebody'})} catches it out of the air. Three lines of the steward's hand, three families, and the figures beside them already brown and going. It goes in the kit. What they owed is ash.${b73If('doss', `\n\nDoss stands in the doorway and watches it burn to the end, every roll, every ribbon. When it is done he takes his cap off, and holds it, and does not put it back on for some time. "Twenty-six harvests," he says. "Not mine, this one. Somebody's." He swallows. "That's right. That's how it should look."`)}${b73If('wenna', `\n\nWenna watches with her arms folded. "Fish don't buy themselves," she says again, but softer. "Still." She watches the ribbons go. "Still."`)}`,
      ch:[{t:'Out into the yard. Dawn is coming.', go:'b7_c3_dawn'}]}),
    b7_c3_loot:()=>({sp:'The counting room', scene:'b7_c3_house', html:risingHTML(), txt:
`The strongbox comes up from under the table between ${b73Say({haddat:'Haddat and you', tangle:'Tangle and you', _:'two of the squad'})}, and the lock comes off it with ${b73Say({mehet:'one of Mehet\'s keys', tangle:'a fuse-spike and some language', _:'a sword-hilt and some language'})}: Letherii silver, enough to feed a squad for a month off a farm that will sell. The medicine chest has jars of the factor's own salves in it, sealed with wax, better than the column's.

The rolls stay on their shelves in their ribbons, untouched. There is no time, and no fire, and the squad has to eat.${b73If('doss', `\n\nDoss stands in the doorway and looks at the rolls, and then at you, and then at the strongbox, and is quiet for some time. Then he says, "Right," as a man says it when something has been decided for him, again. He goes out to the barn.`)}${b73If('wenna', `\n\nWenna weighs a handful of the silver. "Fish," she says. "And a boat, one day." She seems content${b7In('doss') ? ', and then, looking at the door Doss went out of, a little less' : ''}.`)}

Outside, the house's Indebted watch the strongbox go across the yard. They know which shelf their rolls are on.`,
      ch:[{t:'Out into the yard. Dawn is coming.', go:'b7_c3_dawn'}]}),

    /* ======== phase 4: dawn, the lie-up in the factor's barn ======== */
    b7_c3_dawn:()=>({sp:'The factor\'s yard', scene:'b7_c3_house', fx:()=>{ S.f.b7_c3_ph = 4; }, again:()=>'The factor\'s yard at dawn, the column going to ground in the barn and the orchard.', txt:
`Dawn. The column goes to ground in the factor's barn and orchard, marines in the hay, pickets in the trees, the mages' Mockra laid over all of it, worn thin, so that the valley sees a factor's house with its lamps gone out and nothing more. ${b73Key() === 'ledger' ? 'Except the smoke, which the valley sees very well.' : 'The valley sees nothing. The factor\'s house looks as it always has, but quieter.'}

In the barn, the marines have news, the way marines always do at dawn. Up north, a mage of the Letherii called something at a farmhouse that was not a cadre's lightning: demons, they say, things out of a warren, and a marine named Uru Hela did not come back from it. Another company's squad. The marines say the name once, and then do not say it again.${b73If('marrow', `\n\nMarrow nods slowly, hearing it. "I felt it, child," she says. "In my teeth."`)}`,
      ch:[{t:'The barn.', go:'b7_c3_fire'},
          {t:'Doss, by the counting-room window.', req:()=>b7In('doss') && !S.f.b7_c3_dossDawn, go:'b7_c3_doss_dawn'},
          {t:'Wenna, at the water-trough.', req:()=>b7In('wenna') && !S.f.b7_c3_wennaDawn, go:'b7_c3_wenna_dawn'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b7_c3_doss_dawn:()=>({sp:b7In('doss') ? 'Doss' : 'The counting-room window', scene:'b7_c3_house', fx:()=>{ S.f.b7_c3_dossDawn = 1; }, txt: !b7In('doss') ?
`The counting room's high window looks out on the yard. ${b73Key() === 'ledger' ? 'A thin smoke still comes out of it.' : 'Behind it the rolls sit on their shelves in their ribbons.'}` : b73Key() === 'ledger' ?
`Doss is sitting on the mounting-block under the counting-room window with the flail across his knees, watching the last of the smoke come out of it. He has not slept. He does not look as if he wants to.

"On quarter-days," he says, "you stood here. Under this window. The steward read your line out of it, and you said yes, and went home." He looks up at it. "I always wondered what was in there. Shelves, it turns out." He nearly laughs. "Just shelves."${(S.kit || []).includes('b7_c3_ledgerash') ? `

You show him the corner of the roll. He turns it to the light, the three lines and the brown stain where the figures were, and gives it back. "Somebody's grandmother," he says. "Somebody's son. Owing nothing." He puts his cap back on. "Keep it with the other one."` : ''}` :
`Doss is sitting on the mounting-block under the counting-room window with the flail across his knees. He has not slept. Behind the window the rolls are still on their shelves, every ribbon in its place.

"I know," he says, before you have said anything. "The squad has to eat." He looks at his hands. "On the holding, they said that too. The factor has to eat. The steward has to eat." He stands, and shoulders the flail. "I'll march, Sergeant. I said I would." He leaves it there, which is worse.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c3_wenna_dawn:()=>({sp:b7In('wenna') ? 'Wenna' : 'The water-trough', scene:'b7_c3_house', fx:()=>{ S.f.b7_c3_wennaDawn = 1; }, txt: !b7In('wenna') ?
`The factor's water-trough, stone, full, with a skin of dawn light on it.` :
`Wenna has her bare feet in the factor's water-trough and her eyes shut, and her lips are moving. Her gaff leans on the trough beside her.

"The Shore," she says, when she has finished, without opening her eyes. "A trough isn't the sea. It's water, though. She hears through water." She opens one eye. "I told her about the farm, and the ditch. She likes ditches. They go to the sea in the end, all of them."

${b73Key() === 'ledger' ? `She looks at the smoke. "My brother would have liked that," she says. "He owed nobody. He said it was the only thing the Shake had the Letherii wanted."` : `She looks at the strongbox the marines are dividing. "My share's a boat," she says. "One day. Clinker-built." She shuts the eye again. "Not owed."`}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    /* the lieutenant at dawn: her look by the key, and the Rising as the column sees it */
    b7_c3_lt4:()=>({sp:'The lieutenant', scene:'b7_c3_house', fx:()=>{ S.f.b7_c3_lt4 = 1; }, again:()=>'The lieutenant, in the orchard with her slate. "Dusk, Sergeant."', txt:
`The lieutenant is sitting under an apple tree in the factor's orchard with the slate on her knee, writing in the first light. ${b73Key() === 'ledger' ? 'She looks at the smoke over the house, a long time, and then at you, and makes a mark.' : 'She looks at the strongbox the marines are dividing, and then at you, and makes a mark. It is hard to say what kind.'}

"The Fist means to catch one of their brigades on a road before the month's out," she says. "A real one, not crossbows in a barn. He's counting." She taps the slate. "So am I. The farm, the ${S.f.b7_c3_roadDone ? 'Edur on the old road, the ' : ''}house." ${b7Rising() >= 5 ? `\n\n"And the country's moving, Sergeant. There was water by the lane this morning, and a loaf on a gatepost, and a boy came up to the pickets and told them where the Edur ride at night. Nobody asked him." She almost smiles. "That's the asking. It's working, a bit."` : b7Rising() >= 3 ? `\n\n"A village opened its gate tonight. Not to us, to you. I'll take it." She almost smiles.` : `\n\n"The country's watching. It's not moving. Not yet." She tucks the slate away. "Captain Sort's lot say it won't. I'd like them wrong."`}`,
      ch:[{t:'"Dusk. Yes, Lieutenant."', go:()=>startExplore()}]}),

    /* the end: dusk, and on */
    b7_c3_onward:()=>({sp:'The farm valley', scene:'b7_march_night', txt:
`At dusk the column stands up out of the factor's hay and orchard all at once, as if the holding had decided to walk, and goes on east along the narrowing valley in the falling dark, squad by squad, without a lamp. ${b73Key() === 'ledger' ? 'Behind it, the counting room is still smoking, and in the farm cottages all down the valley there are people standing at their doors in the dusk, looking at it.' : 'Behind it, the factor\'s house sits quiet with its rolls on their shelves and its strongbox gone, and in the farm cottages all down the valley the doors are shut.'}

${b73Key() === 'ledger' ? `The Third walks light, with the factor's silver still in his strongbox somewhere in the ash, and the lieutenant has put it in the middle of the file, where the heavies go.` : `The Third walks heavy, with the factor's silver and the factor's salves, and the squad eats better than it has since the coast.`}${b7In('wenna') ? `\n\nWenna walks at the head of the Third, barefoot in the ditch-bottom, the gaff on her shoulder. "Two days to the river," she says, "the Shake way. Four the Letherii way." She does not say which way it will be.` : ''}${b7In('doss') ? `\n\nDoss walks at the back with the flail on his shoulder${b73Key() === 'ledger' ? `, and every so often he looks back at the smoke, and then forward again, and walks a little faster.` : `, and faces front, toward the road.`}` : ''}${b73Say({haddat:`\n\nHaddat says the names under her breath as she walks, and at the end, quietly, a new one: *the Finadd*. She did not know his name. Then she is done.`, _:''})}`,
      ch:[{t:'On, with the column.', onward:true, go:()=>chapterEnd(3, b73Key() || 'ledger')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
