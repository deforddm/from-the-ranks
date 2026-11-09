/* ============ Book Eight, Chapter 4: The Pilgrims' Camp ============ */
/* The camp round the barrow outside Black Coral, at its FIRST turning (tth-canon correction 1, fix (A); R6 S5-S7): the sweet stuff spreading
   down the rows, the children kept apart at the barrow end, the guards who walked the rows no longer coming, the pilgrims frightened. The
   Fourth keeps the camp's far edge for a priestess of the Redeemer while Calder's wagons load in the city, holds it (or burns its kelyk) on
   one bad night, and is gone west before the real turning. Salind, Gradithan and his hut, Spindle and Monkrat, the children's escape and the
   dragon are never on the page (rules 71, 78; brief §Chapter 4); the Redeemer never grants (correction 8): a prayer gives peace, never a boon.
   Phase 1 (S.f.b8_c4_ph), the edge at evening by the city's bells: the fire, the reading on a pilgrim's mat (B8READ[4]), Mossa at her tent
   (the camp's fire-hook; a prayer facing the barrow; the jug, if the squad carries it), the water line (kelyk-mad pilgrims at the barrels,
   b8_c4_water), the water-carriers' song (the trick, The Water-Song; the ash-rag). Phase 2, the next "day" under the same night: the rows
   (Hurrin from the north and his brother's grey scale; the rope across the barrow end; the drinkers' tent, b8_c4_drunk, optional), the
   store-yard behind the edge and its jugs (a Daru merchant's seal on some, if Ch 2's kelyk was passed). Then the bad night at the fire, the
   key S.f.b8_c4_key: 'hold' (keep the far edge through the night: the hold check, Ch 3's 'stand' +2; b8_c4_edge, survive five rounds, one
   more wave if b8_c2_kelyk is 'passed', stage 2 the men behind them) or 'burn' (the edge's own kelyk stores in the yard: b8_c4_stores,
   stage 2 the sheds; then the burning). Phase 4, the morning by the bells: Mossa, Hurrin, and the wagons west.
   Notes for later chapters: docs/tth-ch4-notes.md. */
/* FOR THE ARTIST (144b): names this file uses.
   Items: ART['item/b8_c4_camphook'], ['item/b8_c4_greyscale'], ['item/b8_c4_ashrag'].
   Figures: b8_c4_mossa (the Redeemer priestess at the edge), b8_c4_hurrin (the pilgrim from the north), b8_c4_carrier (a water-carrier with a
   yoke and two buckets); placeholders here with ??=. Reused: edrem (140 / Ch 3), b4_c2_pilgrim (kelyk-mad pilgrims), b6_cultist (the sellers),
   priest (the Dying God's priest).
   Backdrops: b8_camp_night (140's, yours), and three this file adds that borrow until drawn: b8_c4_rows (the camp's inner rows under the
   night, shacks and rag-lines, a sweet haze, the barrow far off with its lamps), b8_c4_yard (the store-yard behind the edge: a stake fence,
   lean-tos stacked with stoppered jugs under oiled cloth), b8_c4_tent (inside Mossa's tent: a lamp in a tin, a mat, cups, the sick).
   Ground: TILEX.b8_c4_camp (this chapter's; placeholder here borrows b3camp_night): '.' trodden mud, ',' grass, '=' tents, 's' shacks,
   'F' a fire, 'T' Mossa's tent, 'w' the water barrels on a handcart, 'r' the rope across the barrow end, 'x' a lean-to of jugs, 'c' a
   handcart, 't' low cover (barrels, a heap of bundles), '#' a stake fence; '<' '>' '^' 'v' edge arrows. */

/* ---- small helpers (b84: Book Eight, Chapter Four) ---- */
const b84L = (id, n) => { if (b8In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b84Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b8In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b84If = (id, s) => b8In(id) ? (typeof s === 'function' ? s() : s) : '';
const b84Who = () => (ROLL() && ROLL().who) || 'sgt';
const b84Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b84Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b84V = (id, you, they) => id === 'sgt' ? you : they;
const b84Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b84And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* the phase: 1 the edge at evening, 2 the next day (the rows and the yard), 3 the bad night (the key's road), 4 the morning */
const b84Ph = () => S.f.b8_c4_ph || 1;
const b84Key = () => S.f.b8_c4_key || null;
const b84Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b8In(id));
/* earlier chapters, read with defaults (a --from=4 save sets keys only): Ch 2's wagons and Ch 3's barrow */
const b84Kelyk = () => S.f.b8_c2_kelyk || ((b8Key(2) || B8KEY0[2]) === 'fields' ? 'burned' : 'passed');
const b84Passed = () => b84Kelyk() === 'passed';
const b84Stood = () => (b8Key(3) || B8KEY0[3]) === 'stand';
const b84Knelt = () => (b8Key(3) || B8KEY0[3]) === 'kneel';
/* Edrem: walking, or here at his own road and willing (waiting from Ch 3, or a save that never met him) */
const b84EdremHere = () => !b8In('edrem') && b8CanRecruit('edrem');
const b84Jug = () => (S.kit || []).includes('b8_kelykjug');
const b84Hook = () => (S.kit || []).includes('b8_c4_camphook');
const b84KeyOpen = () => !!S.f.b8_c4_hurrinMet && !!S.f.b8_c4_yardSeen;
const b84NightDone = () => b84Key() === 'hold' ? !!S.f.b8_c4_held : b84Key() === 'burn' ? !!S.f.b8_c4_burned : false;

/* ---- The Water-Song: what the camp's water-carriers sing over the sick. People's craft, never the Redeemer's power. It copies Rhivi
   Spirit-Song (song, t_song): a group heal, a full turn (v10.3: group heals keep the action), a plain heal, so no ward. ---- */
Object.assign(TRICKS, {
  b8_c4_hymn:{name:'The Water-Song', ch:4, use:'fight', ab:'t_b8_c4_hymn', where:'the water line at the pilgrims\' camp outside Black Coral, the night the sweet stuff came down the rows',
    lore:'What the camp\'s water-carriers sing over the sick: no god\'s words, only an old Domin carrying-song slowed right down, sung low over a cup held to the mouth, a wet rag on the brow and a hand on the back of the neck until the shaking stops. The carriers say it is not a prayer, and nobody has ever asked the barrow to help with it. It works anyway, on people who have been told they will not be let go of.',
    fx:'Once a fight: the bearer sings the carriers\' song, low, with the cup and the rag and a hand on the neck. Every squadmate within 4 heals 1d6+2, and 1 more for each squad level past the first, wakes from any daze, and steps out of any fire under them. It uses the action, and leaves no ward. Not sorcery, and no god\'s.'},
});
Object.assign(AB, {
  t_b8_c4_hymn:{name:TRICKS.b8_c4_hymn.name, trick:'b8_c4_hymn', self:true, desc:()=>TRICKS.b8_c4_hymn.fx,
    run(u){ AUDIO.play('heal'); const near = party().filter(p => !p.ally && cheb(p, u) <= 4);
      near.forEach(p => { heal(p, roll(1, 6, 2 + lvB())); if (p.stun) { p.stun = false; float(p, 'steadied', '#a8c0d8'); } B.fires = B.fires.filter(f => !(f.x === p.x && f.y === p.y)); putOut(p); sparks(p.x, p.y, 10, '#a8c0d8', .35); });
      blog(`${u.name} sings the carriers' song, low and slow, the old Domin words for lifting a load, ${near.length > 1 ? 'a hand on one neck and then the next' : 'to nobody but themselves'}. Not a prayer. It does not need to be.`); }},
});

/* ---- borrowed pictures until the artist's file (144b) replaces them: three scenes, the ground, three figures, the three items ---- */
{ const like = {b8_c4_rows:'b8_camp_night', b8_c4_yard:'b8_camp_night', b8_c4_tent:'b8_camp_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b8_c4_camp ??= (...a) => (TILEX.b3camp_night || (() => {}))(...a);
if (typeof FIGX !== 'undefined') { FIGX.b8_c4_mossa ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c4_hurrin ??= (ctx, h, t, o) => (FIGX.b3_c5_villager || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c4_carrier ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b2soldier || (() => {}))(ctx, h, t, o); }
if (typeof ART !== 'undefined') [['b8_c4_camphook', 'b7_c4_bluelance'], ['b8_c4_greyscale', 'b7_c4_bluescale'], ['b8_c4_ashrag', 'b7_c4_musterbadge']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Eight's glossary ---- */
GLOSSX.tth.push(
  [4, 'The camp\'s edge', 'The last rows of the pilgrims\' camp before the open dark: the sick, the water line, a priestess of the Redeemer, and nobody walking the rows at night any more.', ()=>!!(S && S.book === 'tth' && (S.chapter || 0) >= 4)],
  [4, 'The water-carriers', 'Pilgrims who carry water from the city\'s wells out to the camp on yokes, and sit with the sick. They sing while they do it. They say it is not a prayer.', ()=>!!(S && S.f && S.f.b8_c4_songSeen)],
  [4, 'The store-yard', 'A stake fence behind the camp\'s edge with lean-tos inside, and under the oiled cloth, stoppered jugs, crates of them. The smell is worst there.', ()=>!!(S && S.f && S.f.b8_c4_yardSeen)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[4] = ['b8_c4_fire'];

/* the reading: a pilgrim's mat at the camp's edge (the Soldier of High House Life leans, B8POOL[4]) */
B8READ[4] = {scene:'b8_camp_night', where:'a pilgrim\'s mat at the camp\'s edge', set:'The camp\'s far edge under Black Coral\'s night, a few small fires, the open dark beyond the last tents, and a sweet smell coming down the rows from further in.', back:'b8_c4_fire', backT:'Back to the fire.',
  say:{tuft:'"On the mat," Tuft says, and kneels on somebody\'s rolled bedding, which its owner gave up for the purpose. "The dark here is somebody\'s. Kept, like a lamp." She keeps her back to the walls. "One card. Quick."',
       sohra:'"The dead here are not lying down," Sohra says, and spreads the mat flat with both hands. "They are being asked to stand. The bones do not like it." She sets the cup down. "Sit."',
       benna:'"A pilgrim\'s mat," says Benna, settling on it with a grunt. "I\'ve read on worse. I\'ve read on a dead horse." She holds her hand out. "Copper. Then we see."'}};

const B8CH4 = {
  title:B8CH[4], number:'Four',
  intro:{loc:'Outside Black Coral', sub:'The pilgrims\' camp · the far edge', scene:'b8_camp_night', cap:'Tents and shacks in rows round the barrow, a few small fires, and the open dark beyond the last of them.',
    paras:[
`Outside Black Coral the night does not lift either. The camp lies round the barrow in rows of tents and shacks and rag-roofed lean-tos, a town nobody planned, lit by small fires and by the lamps the Andii city keeps burning on its walls behind. The bells in the city say it is evening. The sky says what it said at noon.`,
()=>{ const v = b84Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, and the Fourth has come out of the city to the camp's far edge because a priestess of the Redeemer asked for hands, and Calder's wagons will not be loaded for the road west for days yet. ${v.length ? `${b84And(v)} ${v.length > 1 ? 'have' : 'has'} come with you.` : 'You came by yourself. The ledger came too.'} The Fourth has never been good at waiting with nothing to hold.`; },
`Something has started in the camp. The people at the edge can smell it before they can say it: a sweetness coming down the rows from further in, on breath, on hands, on the rims of cups.`],
    go:'To the edge', node:'b8_c4_start'},

  areas:[
    /* 16 x 12 (b8_c4_camp, night). . trodden mud  , grass  = tents  s shacks  T Mossa's tent  w the water line (barrels on a handcart)
       F the Fourth's fire  ^ north along the edge to the store-yard  < west into the rows  v south, the road back to the city */
    { id:'b8_c4_edge', title:'The pilgrims\' camp · the far edge', sub:'Black Coral\'s night · the last rows', hint:'Tap ground to move · tap a figure to talk · the rows are west, the yard north, the city road south', decor:'b8_c4_camp', dark:true,
      map:[ ",,,,,,,^,,,,,,,,",
            ",=,s,,,.,,=,,s,,",
            ",,,,,,,.,,,,,,,,",
            "<....T......w..,",
            ",,=,,,,.,,,,,=,,",
            ",,,,,,,.F,,,,,,,",
            ",s,,=,,.,,,,s,,,",
            ",,,,,,,.,,,,,,,,",
            ",=,,,,,.,,,=,,,,",
            ",,,,,s,.,,,,,,s,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,v,,,,,,,," ],
      walk:'.,<^v', triggers:{T:'b8_c4_mossa', w:'b8_c4_water', F:'b8_c4_fire', '^':'b8_c4_to_yard', '<':'b8_c4_to_rows', 'v':'b8_c4_road'}, start:{x:7, y:9},
      quest:()=> b84Ph() === 1 ? (!S.f.b8_c4_mossaMet ? 'Mossa, the priestess, at her tent.' : !S.f.b8_c4_waterDone ? 'The water line. Something is wrong at the barrels.' : 'The fire, and what sleep there is.')
        : b84Ph() === 2 ? (!S.f.b8_c4_hurrinMet ? 'The rows, west. The frightened ones keep their flaps tied.' : !S.f.b8_c4_yardSeen ? 'North along the edge. Where does the sweet stuff come from?' : 'The fire. It is getting dark, even here.')
        : b84Ph() === 3 ? (b84NightDone() ? 'The fire.' : b84Key() === 'burn' ? 'North, to the store-yard.' : 'The edge. Set it, and hold it.')
        : 'The road south, and the wagons west.',
      npcs:[
        {id:'mossa', name:'Mossa, a priestess of the Redeemer', kind:'b8_c4_mossa', x:6, y:4, node:()=> b84Ph() >= 4 ? 'b8_c4_mossa_end' : 'b8_c4_mossa', fresh:()=> b84Ph() >= 4 ? !S.f.b8_c4_mossaEnd : !S.f.b8_c4_mossaMet},
        {id:'carrier', name:'A water-carrier', kind:'b8_c4_carrier', x:12, y:4, node:()=>'b8_c4_carrier', show:()=>!!S.f.b8_c4_waterDone, fresh:()=>!S.f.b8_c4_carrier},
        {id:'edrem', name:'Edrem, on the pilgrims\' road', kind:'edrem', x:9, y:7, node:()=>'b8_c4_edrem', show:()=>b84EdremHere(), fresh:()=>!S.f.b8_c4_edremTalk} ] },

    /* 16 x 12 (b8_c4_camp, night). The inner rows toward the barrow. = tents  s shacks  r the rope across the barrow end, the children's
       tents beyond it  ^ toward the barrow  > east, back to the edge */
    { id:'b8_c4_rows', title:'The pilgrims\' camp · the rows', sub:'Black Coral\'s night · toward the barrow', hint:'Tap ground to move · tap a figure to talk · the barrow is north, the edge east', decor:'b8_c4_camp', dark:true,
      map:[ "=,s,=,,^,,=,,s,=",
            ",,,,,,,.,,,,,,,,",
            "rrrrrr,.,,=,,s,,",
            ",,,,,,,.,,,,,,,,",
            "=,s,=,,.,,,s,=,,",
            "...............>",
            ",,=,,s,.,,=,,,s,",
            ",,,,,,,.,,,,,,,,",
            "s,=,,,,.,,,s,,=,",
            ",,,,,,,.,,,,,,,,",
            ",=,,s,,.,,=,,s,,",
            ",,,,,,,.,,,,,,,," ],
      walk:'.,^>', triggers:{r:'b8_c4_rope', '^':'b8_c4_barrow_look', '>':'b8_c4_rows_back'}, start:{x:14, y:5},
      quest:()=> !S.f.b8_c4_hurrinMet ? 'A man from the north, by his shack, coughing.' : !S.f.b8_c4_yardSeen ? 'Back to the edge, and north along it.' : 'Back to the edge.',
      npcs:[
        {id:'hurrin', name:'Hurrin, a pilgrim from the north', kind:'b8_c4_hurrin', x:12, y:3, node:()=> b84Ph() >= 4 ? 'b8_c4_hurrin_end' : 'b8_c4_hurrin', fresh:()=> b84Ph() >= 4 ? !S.f.b8_c4_hurrinEnd : !S.f.b8_c4_hurrinMet},
        {id:'drinkers', name:'Drinkers at the end tent', kind:'b4_c2_pilgrim', x:3, y:9, node:()=>'b8_c4_tentend', show:()=>b84Ph() === 2 && !S.f.b8_c4_drunkDone, fresh:()=>true} ] },

    /* 16 x 12 (b8_c4_camp, night). The store-yard behind the edge. # the stake fence  x lean-tos stacked with jugs  c handcarts
       t a barrel table  v back south to the edge */
    { id:'b8_c4_yard', title:'The pilgrims\' camp · the store-yard', sub:'Black Coral\'s night · behind the edge', hint:'Tap ground to move · the lean-tos are along the fence · the edge is south', decor:'b8_c4_camp', dark:true,
      map:[ "################",
            "#,,x,,x,,,x,,c,#",
            "#..............#",
            "#,c,,,,,,,,,,,,#",
            "#......t.......#",
            "#,,,,,,,,,,,c,,#",
            "#..............#",
            "#,,,,,,,,,,,,,,#",
            "#######..#######",
            ",,,,,,,..,,,,,,,",
            ",,=,,,,..,,,s,,,",
            ",,,,,,,vv,,,,,,," ],
      walk:'.,v', triggers:{x:'b8_c4_jars', 'v':'b8_c4_yard_back'}, start:{x:7, y:10},
      quest:()=> b84Ph() === 3 && b84Key() === 'burn' && !S.f.b8_c4_storesDone ? 'The keepers, by the lean-tos.' : b84Ph() === 3 && b84Key() === 'burn' && !S.f.b8_c4_burned ? 'The jugs. All of them.' : 'Back to the edge.',
      npcs:[
        {id:'keepers', name:'The keepers of the yard', kind:'b6_cultist', x:7, y:3, node:()=> b84Ph() === 3 && b84Key() === 'burn' ? 'b8_c4_stores_start' : 'b8_c4_keepers', show:()=>b84Ph() >= 2 && b84Ph() <= 3 && !S.f.b8_c4_storesDone && !(b84Ph() === 3 && b84Key() === 'hold'), fresh:()=>!S.f.b8_c4_keepers || (b84Ph() === 3 && b84Key() === 'burn')} ] } ],

  battles:{
    /* the water line: pilgrims gone sweet on kelyk at the barrels, and the man who brought them the jugs */
    b8_c4_water:{title:'The water line', style:'b8_c4_camp', open:true, dark:true, warrenText:'Black Coral\'s night · the Andii\'s dark over everything · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["t......t","..t..t..","........","...tt...","........",".t....t.","........","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_pilgrim',2,2],['b8_pilgrim',5,2],['b8_pilgrim',3,1],['b8_cultist',4,0]], xp:180, after:'b8_c4_water_after',
      preText:()=>`They do not feel much. That is the first thing anybody learns about the ones who have drunk: a cut is a thing that happens to somebody else. They come at the squad laughing, with their mouths stained dark, and the man with the jugs stays at the back where the laughing is not.`},
    /* the drinkers' tent at the end of Hurrin's row (optional): Hurrin's neighbours, and two of the men who bring the jugs */
    b8_c4_drunk:{title:'The end tent', style:'b8_c4_camp', open:true, dark:true, warrenText:'Black Coral\'s night · a sweet haze in the row · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","#..t...#","........","..t..t..","........","...tt...","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_pilgrim',2,2],['b8_pilgrim',5,2],['b8_pilgrim',4,3],['b8_cultist',2,0],['b8_cultist',5,0]], xp:200, after:'b8_c4_drunk_after',
      preText:()=>`The tent flap comes down and the row is full of them, more than there should have been room for inside. Two of them are not pilgrims. Two of them have good boots and dry hands and have been waiting for exactly this.`},
    /* key 'hold': the bad night at the far edge. Five rounds; one more wave if the merchant's kelyk was passed east in Ch 2; then the men behind them */
    b8_c4_edge:{title:'The far edge', style:'b8_c4_camp', open:true, dark:true, warrenText:'The bad night · the camp\'s far edge, the sick behind you · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:5, text:'Hold the edge for five rounds. The sick are behind you, and the water.'},
      map:["........","........","..t..t..","........","t......t","........","...tt...","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_pilgrim',2,1],['b8_pilgrim',5,1],['b8_pilgrim',4,2],['b8_cultist',3,0]], xp:360, after:'b8_c4_edge_after',
      get waves(){ const w = [{round:2, foes:[['b8_pilgrim',1,0],['b8_pilgrim',6,0]], text:'More come down the rows out of the dark, two and three together, the sweet smell coming ahead of them.'},
          {round:3, foes:[['b8_cultist',4,0],['b8_pilgrim',2,0]], text:'One of the men who bring the jugs comes with this lot, walking behind, pointing.'},
          {round:4, foes:[['b8_pilgrim',0,1],['b8_pilgrim',7,1]], text:'Two come round the ends of the line, between the last tents, where the lamps were moved back.'}];
        if (typeof S !== 'undefined' && S && b84Passed()) w.push({round:5, foes:[['b8_pilgrim',2,0],['b8_pilgrim',5,0],['b8_pilgrim',4,0]], text:'One more lot, the last of the night, and some of them are carrying jugs with a Daru merchant\'s seal pressed into the clay.'});
        return w; },
      preText:()=>`They come down the rows the way water comes down a gutter, finding the low places: the gaps between the tents, the lanes where the lamps were moved back. Some of them are singing. It is not the carriers' song. Behind them, not hurrying, come the men who bring the jugs.`,
      stage2:{title:'The men behind them', xp:120,
        text:()=>`The last of the drinkers are down in the mud or sitting with their heads in their hands, and the carriers are already coming out from behind the line with the cups. The men who walked behind them are not down. There are three of them in the open ground past the last tent, and they have stopped pointing, and drawn.${b84Say({edrem:`\n\nEdrem rolls his shoulders under the old grey scale. "These ones I know," he says. "These ones have always been the same."`, brisk:`\n\nBrisk looks at the three of them, and at her shield, and says something to Hood that is not polite.`, _:''})}`,
        map:["........","..t.....","........",".....t..","........","........","..t..t..","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_cultist',2,1],['b8_cultist',5,1],['b8_pilgrim',4,2]]} },
    /* key 'burn': the edge's own kelyk stores in the yard, and their keepers. Never the camp's heart; never anybody's hut. */
    b8_c4_stores:{title:'The store-yard', style:'b8_c4_camp', open:true, dark:true, warrenText:'The bad night · a stake fence, the smell of fruit gone over · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.#..#.#","........","..t..t..","........","........","...t....","........",".t....t.","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_cultist',2,2],['b8_cultist',5,2],['b8_kelykpriest',4,0]], xp:260, after:'b8_c4_stores_after',
      preText:()=>`The keepers do not run. The priest among them puts down the jug he was stoppering and turns, unhurried, and when he breathes out the air in the yard goes sweet and thick, and the lamps on the fence seem to lean toward him.`,
      stage2:{title:'The sheds', xp:130,
        text:()=>`The yard is the Fourth's. The sheds at the back are not: two more of the keepers have got in among the lean-tos with a pair of the ones who have drunk, and they are standing between the squad and the jugs as if the jugs were children.${b84Say({kettle:`\n\nKettle looks at the oiled cloth and the dry wood under it with professional interest. "After," she says, to herself. "After."`, ohl:`\n\nOhl looks at the stacked jugs, and then at the drinkers in front of them, and his mouth goes thin. "That's the whole price of it," he says. "Standing there."`, _:''})}`,
        map:["#t#tt#t#","........","..t..t..","........","........","........","..t..t..","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_cultist',3,1],['b8_pilgrim',2,2],['b8_pilgrim',5,2]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b8_c4_camphook:{name:'The camp\'s fire-hook', slot:'weapon', role:'reach', who:null, atk:1, rng:1, reach:true, dmg:[1,10,2],
      line:'An iron hook on an ash pole as long as a tall man, for pulling a burning tent down before the fire walks to the next one. The camp has three. Mossa lent the Fourth the one with the best edge, and said she would like it back, and did not say when. It keeps trouble at the far end of its reach, which in this camp is the right distance from most things.'},
    b8_c4_greyscale:{name:'Old grey scale', slot:'armour', role:'mail', who:null, ac:3, hp:2,
      line:'A shirt of grey scale with the Seer\'s marks filed off every plate, the way the men who wore it filed them after the Domin fell. Hurrin\'s brother wore it home from the war and died in it of something slower. Hurrin carried it all the way from the north to lay on the barrow, and could not put it down. It fits a soldier. It was always meant to.'},
    b8_c4_ashrag:{name:'A carrier\'s ash-rag', slot:'trinket', role:'any', who:null, hp:2, stat:{wits:1},
      line:'A strip of undyed cloth soaked in water and wood-ash, the way the water-carriers tie theirs over the mouth and nose against the sweet smoke in the rows. It smells of a cold hearth. The carriers say it keeps the head clear. They have been right about most things.'} },

  scenes:{
    b8_c4_rows:{loc:'Outside Black Coral', sub:'The pilgrims\' camp · the rows', cap:'Shacks and tents close on both sides, rag-lines across the lane, a sweet haze over the roofs, and far off at the camp\'s heart the barrow and its lamps.', amb:'explore'},
    b8_c4_yard:{loc:'Outside Black Coral', sub:'The store-yard behind the edge', cap:'A stake fence, lean-tos along it, and under oiled cloth more stoppered jugs than anyone could drink.', amb:'explore'},
    b8_c4_tent:{loc:'Outside Black Coral', sub:'Mossa\'s tent', cap:'A lamp in a tin, a mat on the ground, a row of cups, and the sick asleep along the walls.', amb:'explore'} },

  end:{
    hold:['The edge held', 'The camp outside Black Coral began to turn while the Fourth was in it, the sweet stuff coming down the rows and the frightened tying their flaps shut. On the bad night the Fourth stood at the far edge between the ones who had drunk and the ones who had not, with the sick and the water behind them, and the edge held till the bells said morning. It was one night. The Fourth was gone west before the next.'],
    burn:['The stores burned', 'The camp outside Black Coral began to turn while the Fourth was in it, the sweet stuff coming down the rows and the frightened tying their flaps shut. On the bad night the Fourth went into the store-yard behind the edge and burned what was kept there, every jug of it, while others held the edge. It will not have been the last of it. It was the last of it at that edge, for a while. The Fourth was gone west before the next.'] },
  endScene:'b8_camp_night',
  endCap:()=> S.f.b8_c4_key === 'burn' ? 'The camp\'s far edge in the morning, by the bells: a smear of smoke over the store-yard, and the water line working.' : 'The camp\'s far edge in the morning, by the bells: the carriers going among the sick, and the line in the mud where the Fourth stood.',
  tease:'Next: the road back west over the Lamatath, with Calder\'s wagons and the Fete begun somewhere behind the hills, and something running through the grass at night.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b8_c4_key === 'hold') x.push(`The Fourth held the camp's far edge through the bad night.${f.b8_c4_edgeSet ? ' The carts went across the gap before dark.' : ''}`);
    if (f.b8_c4_key === 'burn') x.push(`The Fourth burned the kelyk in the store-yard behind the edge.${f.b8_c4_edgeCost === 'tents' ? ' Two tents at the edge went down the same night.' : ' The edge held without them.'}`);
    if (f.b8_c4_hymnOk) x.push('The Fourth learned the water-carriers\' song.');
    if (f.b8_c4_scale) x.push('Hurrin, from the north, gave up his brother\'s grey scale to someone standing up.');
    if (f.b8_c4_drunkDone) x.push('The end tent in Hurrin\'s row is empty now.');
    if (f.b8_c4_sealSeen) x.push('Some of the jugs in the yard had a Daru merchant\'s seal on them. The Fourth knew the seal.');
    if (f.b8_c4_jug === 'poured') x.push('The jug from the merchant\'s wagon went into the mud at the water line.');
    if (f.b8_c4_knelt) x.push('Somebody in the Fourth knelt with a priestess of the Redeemer, and put a thing down, and did not ask for anything back.');
    if (b8In('edrem')) x.push('Edrem walks with the Fourth, away from his road for the first time in years.');
    if (b8In('vasso')) x.push('Vasso has seen a city where it is always night. He says the roofs were very good.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b8_c4_key === 'burn' && 'The store-yard behind the edge, and what was kept in it, burned.',
    f.b8_c4_key === 'hold' && 'The bad night at the far edge: the drinkers came down the rows, and the men who bring the jugs behind them.',
    f.b8_c4_ropeSeen && 'The children are kept apart now, in tents behind a rope at the barrow end. Someone should bring them out. Not a handful of old soldiers in a night.',
    f.b8_c4_hurrinMet && 'Hurrin, from the north, came to lay his brother\'s grey scale on the barrow and could not put it down.',
    f.b8_c4_songSeen && 'The water-carriers sing over the sick. They say it is not a prayer.',
    f.b8_c4_mossaMet && 'Mossa, a priestess of the Redeemer, keeps the camp\'s far edge. The guards who walked the rows stopped coming.',
    'The Fourth, at the pilgrims\' camp outside Black Coral, while Calder\'s wagons load.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the edge at evening, by the bells ======== */
    b8_c4_start:()=>({sp:'The camp\'s edge', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_ph = S.f.b8_c4_ph || 1; }, again:()=>'The camp\'s far edge, the open dark beyond it, the sweet smell from the rows.', txt:
`The far edge is the last row of tents and then nothing: the old Domin running away east into a night no one is lighting. The Fourth has a fire going in a ring of stones, of what the camp could spare. A little way along there is a tent with a lamp in a tin hung outside it, and at the end of the row a handcart with water barrels on it, and people round the barrels.

${b84Say({brisk:`Brisk has put her back to the open dark and her face to the rows, which is the wrong way round for anyone but Brisk. "The trouble's that way," she says. "Out there's only dark."`, _:`You put your back to the open dark and your face to the rows. The trouble, if it comes, will come from inside.`})}${b84If('edrem', `\n\nEdrem stands a little apart, looking down the rows toward the barrow, the mace hanging from his fist. "It was not like this a season ago," he says. "A season ago they were frightened of the dark. Now they are frightened of each other."`)}${b84If('ohl', `\n\nOhl sniffs the air and makes a face. "Fruit," he says. "Gone over. And under it, something I'd rather not name in front of the sick."`)}${b84If('vasso', `\n\nVasso is looking up, at a sky with nothing in it. "No bells out here," he says. "Only the city's, far off. I keep waiting for the hour."`)}`,
      ch:[b8ReadChoice(4),
          {t:'Find the priestess who asked for you.', go:'b8_c4_mossa'},
          {t:'Walk the edge.', go:()=>startExplore()}]}),
    b8_c4_read:()=>b8ReadOffer(4),
    b8_c4_card:()=>b8ReadCard(4),

    /* Mossa at her tent: the camp, the guards, the Redeemer, the hook, a prayer, and the jug if the squad carries it */
    b8_c4_mossa:()=>({sp:'Mossa', scene:'b8_c4_tent', fx:()=>{ S.f.b8_c4_mossaMet = 1; }, again:()=>'Mossa, at her tent, with the lamp in its tin and the sick asleep along the walls.', txt:
`Mossa is a woman of the Domin coast with grey in her braid and mud to the knee, in a plain undyed robe with a bit of coral on a cord round her neck. Inside her tent the sick are asleep along the walls on mats, and there is a row of cups by the door, washed. Her hands are cracked from the water.

"You came," she says, as if she had been told you would and had not believed it. "Good. There are not many hands at this end of the camp any more."${b84If('edrem', ` She sees Edrem behind you, and something in her face lets go a little. "And you. I thought the road had you for good."\n\n"It still might," Edrem says.`)}${b84Knelt() ? `\n\n"I saw you at the barrow," she says to you. "You put something down." She does not ask what.` : b84Stood() ? `\n\n"I saw you at the barrow's edge," she says. "Standing. The guards there talk about you." She almost smiles. "They don't talk about much."` : ''}${b84Jug() && !S.f.b8_c4_jug ? `\n\nShe stops, and breathes in, and looks at the squad's kit. "One of you is carrying it," she says. "I can smell it from here."` : ''}`,
      ch:[{t:'"What\'s happening to the camp?"', go:'b8_c4_mossa_camp'},
          {t:'"Where are the guards?"', go:'b8_c4_mossa_guards'},
          {t:'"Does he help? The one in the barrow?"', go:'b8_c4_mossa_god'},
          {t:'"The jug. It came off a merchant\'s wagon. We don\'t drink it."', req:()=>b84Jug() && !S.f.b8_c4_jug, go:'b8_c4_jug'},
          {t:'Kneel with her a while, facing the barrow.', req:()=>!!S.f.b8_c4_godAsked && !S.f.b8_c4_knelt, go:'b8_c4_kneel'},
          {t:'Back to the edge.', go:()=>startExplore()}]}),
    b8_c4_mossa_camp:()=>({sp:'Mossa', scene:'b8_c4_tent', fx:()=>{ S.f.b8_c4_campTold = 1; }, txt:
`"It started small," she says. "A man came down the rows with jugs. He said it took the fear off. It does." She turns one of the clean cups in her hands. "Then it takes the rest. They stop being frightened, and then they stop being much of anything. They dance. They don't feel cuts. They give their water away and drink that instead."

"And the children are kept apart now. In tents at the barrow end, behind a rope, by people who smile when they tell you it is for the best." She puts the cup down. "Someone should bring them out. I have said so. Saying is all I have."${b84Say({ohl:`\n\nOhl has been listening with his arms folded. "How many of these," he says, nodding at the mats, "came off it?"\n\n"Most," says Mossa. "Some of them will get up."`, tuft:`\n\nTuft is looking at the sleepers along the wall. "They look like the ones after Coral," she says, very low. "After the Seer. The ones who'd been told what to want."`, _:''})}`,
      ch:[{t:'Back to Mossa.', go:'b8_c4_mossa'}]}),
    b8_c4_mossa_guards:()=>({sp:'Mossa', scene:'b8_c4_tent', fx:()=>{ S.f.b8_c4_guardsTold = 1; if (!S.f.b8_c4_hook) { S.f.b8_c4_hook = 1; gain('b8_c4_camphook'); } }, txt:
`"They stopped coming," she says. "The ones who walked the rows at night. There were never many. A few men who'd been soldiers once and had nothing to do with their hands. One night they were there, and then they weren't, and nobody said why." She shrugs. "I have stopped asking why about anything in this camp. It saves breath."

She reaches behind the tent flap and brings out a long ash pole with an iron hook on the end of it, the hook worn bright on its inside curve. "The camp's fire-hook. One of three. If a tent goes up, you pull it down before the fire walks to the next one." She holds it out. "The guards had it. You have it now. I'd like it back."${b84If('edrem', `\n\nEdrem looks at the hook, and at her. "I walked these rows," he says. "Before the road. I should have stayed."\n\n"You should have done a great many things," Mossa says, not unkindly. "So should all of us. You're here."`)}`,
      ch:[{t:'Back to Mossa.', go:'b8_c4_mossa'}]}),
    /* the Redeemer: he takes the weight; he never acts for a petitioner (correction 8). Never silent on the page, never a boon. */
    b8_c4_mossa_god:()=>({sp:'Mossa', scene:'b8_c4_tent', fx:()=>{ S.f.b8_c4_godAsked = 1; }, txt:
`Mossa looks toward the camp's heart, where the barrow is, though from here there is only the dark and a few lamps.

"He takes the weight," she says. "That's all he ever said he would do. People come here from every road to put something down, and he takes it, and they are lighter. He listens, they say. Sometimes he speaks, to someone." She shakes her head. "He has never once done what anybody asked him to. Not for the sick. Not for the ones on the jugs. Not for me."

"Don't ask him for anything tonight, Sergeant. Ask me. I can at least say no to your face."${b84Say({brisk:`\n\nBrisk touches two fingers to her brow, out of habit, toward the dark where the barrow is. Not to him. To the one she always salutes. Hood, for his part, keeps his own counsel.`, _:''})}`,
      ch:[{t:'Kneel with her a while, facing the barrow.', req:()=>!S.f.b8_c4_knelt, go:'b8_c4_kneel'},
          {t:'Back to Mossa.', go:'b8_c4_mossa'}]}),
    b8_c4_kneel:()=>({sp:'Mossa', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_knelt = 1; }, txt:
`You kneel in the mud beside her, outside the tent, facing the dark where the barrow is. She does not tell you what to say, and keeps her own words to herself.

You put something down. It is not much; it is not the worst of it. A name, perhaps, or a road. It goes, as a pack goes when another pair of hands takes the weight of it off your shoulders for a while and you find you had forgotten how heavy it was.

Nothing answers. Nothing is given. For a while, kneeling in the mud at the end of the world, nothing is heavy, and then you get up, and it is a night like the others, and your knees are wet.${b84If('edrem', `\n\nEdrem has not knelt. He stands behind you and Mossa, where the pair of you can be seen, which is what he does. "That is all it is," he says, when you get up. "It is enough, some nights."`)}`,
      ch:[{t:'Back to the edge.', go:()=>startExplore()}]}),
    /* the jug from Ch 2's wagon, if the squad carries it: pour it out, or keep it */
    b8_c4_jug:()=>({sp:'Mossa', scene:'b8_c4_tent', txt:
`Mossa looks at the jug when it comes out of the kit, stoppered, sticky at the neck, and does not reach for it.

"You don't drink it," she says. "No. But somebody will, if it leaves this tent. They always find it." She looks at the sick along the wall. "The water line has a gutter. It runs out into the dark. Nothing grows there anyway."${b84Say({ohl:`\n\nOhl keeps his mouth shut, which from Ohl is a speech.`, _:''})}`,
      ch:[{t:'Pour it out into the gutter.', fx:()=>{ S.f.b8_c4_jug = 'poured'; unwear('b8_kelykjug'); S.kit = (S.kit || []).filter(k => k !== 'b8_kelykjug'); b84L('ohl', 1); note('The jug of kelyk goes into the gutter at the water line.', 'good'); }, go:'b8_c4_jug_pour'},
          {t:'"We\'ll keep it. Stoppered. No one here will touch it."', fx:()=>{ S.f.b8_c4_jug = 'kept'; b84L('ohl', -1); }, go:'b8_c4_jug_keep'}]}),
    b8_c4_jug_pour:()=>({sp:'The water line', scene:'b8_camp_night', txt:
`It goes into the gutter dark and slow, and the smell comes up off it, fruit and something under the fruit, and then the gutter carries it out past the last tent into the open ground, where nothing grows anyway.

Mossa rinses the jug out with clean water, twice, and sets it upside down by her door with the cups. "There," she says. "Now it's a jug."`,
      ch:[{t:'Back to Mossa.', go:'b8_c4_mossa'}]}),
    b8_c4_jug_keep:()=>({sp:'Mossa', scene:'b8_c4_tent', txt:
`She nods slowly, and does not argue. "Keep it close, then," she says. "Closer than you think you need to."`,
      ch:[{t:'Back to Mossa.', go:'b8_c4_mossa'}]}),

    /* the water line: phase 1, the drinkers at the barrels; after, the carriers and their song (the trick) */
    b8_c4_water:()=> !S.f.b8_c4_waterDone ? DLG.b8_c4_water_start() : DLG.b8_c4_song(),
    b8_c4_water_start:()=>({sp:'The water line', scene:'b8_camp_night', txt:
`At the barrels on the handcart four pilgrims are laughing. They have their mouths stained dark and their hands wet, and they are tipping the camp's water out on the ground to make room in the barrels for what one of them is pouring in from a jug. The carriers who brought the water out from the city on their yokes are standing back against the last tent, holding their empty buckets, not knowing what to do.

Behind the four, in a good coat, a man with a jug in each hand watches it happen and does not laugh at all.${b84If('edrem', `\n\nEdrem has gone very still. "That is the camp's water," he says. "That is all the water the sick have."`)}${b84If('vasso', `\n\nVasso has his eyes on the man in the good coat. "He's not one of them," he says. "Look at his boots. He walked here dry."`)}`,
      ch:[{t:'"Off the barrels. Now." Go in.', go:()=>startBattle('b8_c4_water', {})},
          {t:'Talk them away from the barrels, gently, before the man in the coat sees it coming.', check:['guile', 15],
            edges:id=>[id === 'edrem' && ['he has talked pilgrims off the road for years', 3], id === 'ohl' && ['he has seen what the sweet stuff does, and talks to them as patients', 2], id === 'sohra' && ['a Rhivi voice, low, the way you talk to a frightened herd', 2], id === 'vasso' && ['the Guild teaches you to sound like nobody in particular', 1], id === 'sgt' && ['you have talked drunk soldiers out of worse', 1], id === 'brisk' && ['a heavy in mail does not sound gentle', -1], id === 'kettle' && ['she cannot keep the contempt out of it', -1]],
            near:{t:()=>`Yes, but one of them will only go if ${b84Nm(b84Who())} ${b84V(b84Who(), 'take', 'takes')} his hands and dance three steps with him first, laughing, his breath all sweetness, and it stays with ${b84Nm(b84Who())} after: rattled.`, fx:()=>b84Rattle(b84Who())},
            go:'b8_c4_water_talked', fail:'b8_c4_water_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_water_talked:()=>({sp:'The water line', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_waterDone = 1; S.f.b8_c4_waterTalked = 1; }, txt:
`They go, in the end, the four of them, the way children go when they are told there is something better round the corner: laughing still, holding hands, back up the rows into the sweet haze. The man in the good coat watches them go, and looks at you, and goes after them with his jugs, not hurrying.

Two of the barrels are still clean. The carriers come away from the tent and put their hands on them, as if to make sure.`,
      ch:[{t:'Help the carriers with the barrels.', go:'b8_c4_song'}]}),
    b8_c4_water_row:()=>({sp:'The water line', scene:'b8_camp_night', txt:
`The one nearest stops laughing. He looks at you as if you were something he had been told about, and the man in the good coat says a word from behind, quietly, and all four of them turn.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c4_water', {})}]}),
    b8_c4_water_after:()=>({sp:'The water line', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_waterDone = 1; S.f.b8_c4_waterFought = 1; }, txt:
`It is quiet at the barrels after. Two of the four are sitting in the mud with their heads in their hands, shaking, the sweetness going off them in a sour sweat; the other two have gone back up the rows at a run, laughing, and do not seem to know they are bleeding. The man in the good coat is nowhere. He left the jugs.${b84Say({ohl:`\n\nOhl is already down in the mud with the two who stayed, a hand on each of them. "Water," he says, without looking up. "Clean, if there's any left."`, _:`\n\nThe two who stayed want water. There is a little left that is clean.`})}${b84If('edrem', `\n\nEdrem picks the jugs up, one in each hand, and carries them to the gutter, and pours them out, without a word.`)}`,
      ch:[{t:'Help the carriers with the sick.', go:'b8_c4_song'}]}),
    /* the carriers' song: the trick (✦ wits 17), and the ash-rag either way */
    b8_c4_song:()=>({sp:'The water-carriers', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_songSeen = 1; if (!S.f.b8_c4_rag) { S.f.b8_c4_rag = 1; gain('b8_c4_ashrag'); } }, again:()=>'The water-carriers at the barrels, singing low over the sick.', txt:
`The carriers sit the sick down along the handcart's wheels and go among them with cups, and while they do it they sing: low, slow, no tune to speak of, an old carrying-song from the Domin coast for lifting a load, slowed right down until it is almost breathing. A cup to the mouth. A wet rag on the brow. A hand flat on the back of the neck, until the shaking stops. Then the next one.

"It isn't a prayer," the oldest of them says, when she sees you watching. She ties an ash-rag over your mouth and nose for you, the way theirs are tied, against the sweet smoke. "No one up there helps with it. It works anyway." She goes back to the song.

You have heard something like it before. On the Rhivi Plain, years ago, the Rhivi sang the same shape of thing over their dead, so the spirits of the grass would carry them.${b84If('ohl', ` And Ohl has sat with more cups to more mouths than anyone alive; he is humming along before he knows it.`)}${b84If('edrem', `\n\n"They sing it every night," Edrem says. "On the road you can hear it from the hill. I never learned the words."`)}`,
      ch:[{t:'Learn the song: the words, the cup, the hand on the neck.', check:['wits', 17], trick:'b8_c4_hymn', req:()=>!S.f.b8_c4_hymnTried, fx:()=>{ S.f.b8_c4_hymnTried = 1; },
            edges:id=>[id === 'edrem' && ['years on the pilgrims\' road, hearing it from the hill every night', 3], trickBy('song') === id && ['the Rhivi Spirit-Song: the same shape, other words', 2], id === 'ohl' && ['Denul, the list, and a lifetime of cups held to mouths', 2], id === 'sohra' && ['Rhivi: she sang the dead onto the grass herself', 2], id === 'ressa' && ['the fever wards in the temples, where they sang over the dying', 2], id === 'tuft' && ['she remembers the Rhivi singing on the plain', 1], id === 'sgt' && ['you heard the Rhivi sing over their dead, years ago', 1], id === 'brisk' && ['Brisk sings like a portcullis coming down', -1], id === 'kettle' && ['she counts the verses instead of singing them', -1], id === 'vasso' && ['the Guild does not sing', -1]],
            near:{t:()=>`Yes, but the song will not come right until ${b84Nm(b84Who())} ${b84V(b84Who(), 'have', 'has')} sat with every one of the sick in the row, and one of them weeps the whole time, and ${b84Nm(b84Who())} ${b84V(b84Who(), 'go', 'goes')} back to the fire with it still going round: rattled.`, fx:()=>b84Rattle(b84Who())},
            go:'b8_c4_song_ok', fail:'b8_c4_song_no'},
          {t:'Hold the cups for them, and leave the singing to the carriers.', go:'b8_c4_song_cups'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_song_ok:()=>({sp:'The water-carriers', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_hymnOk = 1; }, txt:
`By the end of the row ${by({sgt:'you have', edrem:'Edrem has, of all people,', ohl:'Ohl has, and is pretending he always knew it,', _:'{who} has'})} the words and the shape of it: the cup, the rag, the hand, the breath held under the tune so the one being sung to can find it and hold it too. It is not much. It is a way of telling somebody they will not be let go of.

The oldest carrier listens to the last verse with her head on one side and nods once. "That'll do," she says. "Sing it when the shaking starts. Not after."`,
      ch:[{t:'Back to the edge.', go:()=>startExplore()}]}),
    b8_c4_song_no:()=>({sp:'The water-carriers', scene:'b8_camp_night', txt:
`The words go by like water through the fingers. The tune is there and then it is not, and the hand on the neck is only a hand. The carriers do not mind. They have been singing it all their lives, and you have been at it an hour.

"Come back when you've carried something," the oldest of them says, and hands you a cup.`,
      ch:[{t:'Back to the edge.', go:()=>startExplore()}]}),
    b8_c4_song_cups:()=>({sp:'The water-carriers', scene:'b8_camp_night', txt:
`So you hold the cups, and fetch the clean water, and move the sick a little nearer the fire when the carriers ask, and let the song go on round you. It is a thing to do with your hands. In this camp that counts for a good deal.`,
      ch:[{t:'Back to the edge.', go:()=>startExplore()}]}),
    b8_c4_carrier:()=>({sp:'A water-carrier', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_carrier = 1; }, again:()=>'A water-carrier with a yoke and two buckets, resting at the handcart.', txt:
`A young carrier is resting at the handcart with the yoke across his knees and two buckets either side of him. He walks the water out from the city's wells every day, he says, there and back and there again, under a sky that is the same at both ends.

"They used to thank us," he says. "Now some of them throw it out to make room." He looks up the rows. "I keep carrying. What else would I do with my shoulders."${b84Ph() >= 4 ? `\n\n"You'll be going, then," he says. "With the wagons." He nods. "Thank you for the barrels."` : ''}`,
      ch:[{t:'Back to the edge.', go:()=>startExplore()}]}),

    /* Edrem at his road, if he waits (Ch 3), or if this save never met him */
    b8_c4_edrem:()=>({sp:'Edrem', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_edremTalk = 1; }, again:()=>'Edrem, on the pilgrims\' road where it comes in to the edge.', txt:
`Edrem is where the pilgrims' road comes in to the edge of the camp, standing where the walkers can see him, in old grey scale with the marks filed off and a pilgrim's cloak over it, the long mace hanging from his fist.

"Sergeant," he says. "The edge is worse than the road tonight. I can smell it from here." He looks at the squad. "If you are holding this end, I would rather hold it with you than watch."`,
      ch:[{t:'"Then walk with us, Edrem."', fx:()=>{ b8Join('edrem'); }, go:'b8_c4_edrem_join'},
          {t:'"Keep your road. We\'ll send if we need you."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_edrem_join:()=>({sp:'Edrem', scene:'b8_camp_night', txt:
`${b8In('edrem') ? `He nods once and falls in, at the end of the line, where a heavy goes. "I wore the grey once," he says, to the dark past the tents. "It is good to stand in a line that is not his."` : `He nods, and stays where he is. "Six walk already," he says. "I can count. When there is room, I will be on the road."`}`,
      ch:[{t:'Back to the edge.', go:()=>startExplore()}]}),

    /* the fire: the camp's edge, by phase. The games pass wraps this node: keep the id */
    b8_c4_fire:()=>{ const ph = b84Ph(), rk = 'b8_c4_rest' + ph;
      const way = ph === 1 ? (S.f.b8_c4_waterDone ? {t:'Sleep, such as it is. The bells will say when it is morning.', onward:true, go:'b8_c4_sleep'} : null)
        : ph === 2 ? (b84KeyOpen() ? {t:'The dark comes on thicker. Something is moving in the rows.', go:'b8_c4_dusk'} : null)
        : ph === 3 ? (b84NightDone() ? {t:'Wait for the bells.', onward:true, go:'b8_c4_morning'} : b84Key() === 'hold' ? {t:'To the edge, and set it.', onward:true, go:'b8_c4_hold'} : b84Key() === 'burn' ? {t:'North, to the store-yard.', onward:true, go:'b8_c4_burn'} : null)
        : {t:'The wagons west.', onward:true, go:'b8_c4_onward'};
      return {sp:'The camp\'s edge', scene:'b8_camp_night', html:contractHTML(),
        again:()=>'The Fourth\'s fire at the camp\'s edge, the open dark behind it.', txt:
`${ph === 1 ? `The fire is small and the dark round it is very large. The city's bells, far off, have said evening, and nothing else about the sky agrees.` : ph === 2 ? `The bells say it is day. There is no day. The camp goes about its business by lamplight, and the sweet smell is stronger than it was.${b84KeyOpen() ? ' Down the rows, people are tying their tent flaps shut.' : ''}` : ph === 3 ? (b84NightDone() ? `It is over, for tonight. The fire is still in. No one at the edge is sleeping, but some of them are lying down, which is a start.` : `The bad night. The fire is banked low so it will not show the squad to the rows. Somewhere in the camp a lot of people are singing something that is not the carriers' song.`) : `The bells say morning. The dark says what it always says. The fire has gone to embers, and the edge is still here.`}${b84Say({kettle:`\n\nKettle is counting munitions on a flat stone by the fire.`, ohl:`\n\nOhl is boiling the camp's water before anyone drinks it.`, _:''})}`,
        ch:[...(ph === 1 ? [b8ReadChoice(4)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk] && (ph > 1 || !!S.f.b8_c4_waterDone), fx:()=>{ S.f[rk] = 1; rest('An hour by the fire at the edge, one of the squad always awake. The cuts close. Whatever the sweet stuff left in anyone goes out of them in a sweat.'); }, go:'b8_c4_fire_rest'},
            {t:'Talk with the squad.', go:'b8_c4_fire_talk'},
            ...(way ? [way] : []),
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c4_fire_rest:()=>({sp:'The camp\'s edge', scene:'b8_camp_night', txt:
`An hour, then, by the fire, with the open dark at the squad's backs.

${b84Say({ohl:`Ohl goes round the squad with the boiled water and his hands, and closes what wants closing, and complains about each of you while he does it. "Bites," he says, to one cut. "They bite, on that stuff. Like dogs."`, _:'The squad sees to its own cuts. It has had practice.'})}${b84If('edrem', `\n\nEdrem sleeps sitting up, facing the barrow, as he always does.`)}${b84If('tuft', `\n\nTuft sleeps with her back to the fire and her face to the dark, which is not something she does anywhere else. "It's a kept dark," she says, when asked. "Someone's holding it. It's the safest dark I've ever slept in."`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c4_fire'}]}),
    b8_c4_fire_talk:()=>{ const late = b84Ph() >= 3, ln = [];
      if (b8In('brisk')) ln.push(late ? `Brisk has the shield on her knee and is working the dents out of the rim with a stone. "Holding a line for people who don't know they're behind it," she says. "That's the job, mostly. Always was." She taps two fingers to her brow. "Not tonight, Hood. You've had enough out of this camp."` : `Brisk is watching the rows with her chin on the shield's rim. "I don't like a fight where the other side can't feel it," she says. "It's like holding a gate against the tide. The tide doesn't get tired."`);
      if (b8In('kettle')) ln.push(late ? `Kettle has the munitions out on a stone. "One cusser," she says, "would sort that yard out for good." She looks at the tents all round it. "One cusser would sort a great deal out for good. That's the trouble with cussers."` : `Kettle is counting under her breath. "Six rows to the barrow end," she says. "Nine lamps on this side. Three hooks, and we've got one." She looks up. "I count when I'm frightened. It's not working."`);
      if (b8In('tuft')) ln.push(late ? `Tuft has the Deck in her lap and is not drawing. "The Soldier of Life keeps coming up," she says. "Kneeling over somebody." She looks toward the barrow. "We watched him go under. I thought that was the end of it."` : `Tuft is sitting with her back to the fire, looking out at the dark. "It's held," she says. "The dark here. Someone's holding it up over the city like a cloak over a lamp." She shivers. "I don't mind. I'd just like to know whose arms are tired."`);
      if (b8In('ohl')) ln.push(late ? `Ohl has his list out on his knee, the oilcloth open. "I'm not putting any of these on it," he says, of the camp. "They're not ours." He folds it. "That's what I keep telling myself."` : `Ohl is boiling water in the squad's pot. "It's a poor trade," he says, of the jugs. "At any price. I've seen most of the prices." He stirs. "This one's the worst. It's the ones who pay it smiling."`);
      if (b8In('sohra')) ln.push(late ? `Sohra has her bone cup in her lap and has not thrown it all night. "The bones are quiet," she says. "They do not want to fall in this place." She puts the cup away. "I do not blame them."` : `Sohra is sitting cross-legged just out of the firelight with her eyes shut. "The carriers' song is a herding song," she says. "Did you know? For bringing the cattle in at night. They have only changed the words." She seems pleased.`);
      if (b8In('greysword')) ln.push(late ? `Dannet stands the watch by the last tent with the grey shield up. "In Capustan we held a gate for people who wanted to live," she says. "This is harder. Some of these do not." She does not lower the shield.` : `Dannet is oiling the grey shield. "The Wolves are quiet here," she says. "I think they do not like the dark. I think they do not like the sweetness more."`);
      if (b8In('ellis')) ln.push(late ? `Ellis is sitting with her back to a wheel of the water-cart, facing up the rows. "Men in good coats with dry boots," she says. "Walking behind. I've seen that before." She almost smiles. "The Claw would have liked them."` : `Ellis has walked the edge twice already, without a sound. "Nine ways in from the rows," she says, sitting down. "Two you'd use. One you'd use if you were clever." She looks at the dark. "None from out there. Out there's nothing."`);
      if (b8In('vell')) ln.push(late ? `Vell is tying knots in a bit of cord and undoing them. "There's no roofs here," he says. "Only tents. You can't get above anything." He looks unhappy about it. "I don't know where to stand."` : `Vell is sitting under the water-cart, which is the nearest thing to a roof the edge has. "It's quiet," he says. "Not city quiet. Like everyone's listening for the same thing."`);
      if (b8In('brannoc')) ln.push(late ? `Brannoc has stopped talking, which for Brannoc is a wound. After a while he says, "In Falar the priests sell you a jug of something on feast days. It makes you sing." He looks at the rows. "Not like that."` : `Brannoc is telling the fire about a Falari harbour where it is always noon, by way of complaint. "Here it's always night," he says. "Someone's got the two the wrong way round."`);
      if (b8In('ressa')) ln.push(late ? `Ressa has her hands round a cup of the boiled water. "In the temples, in the bad years, the fever took them smiling too, at the end," she says. "We sang over them anyway." She drinks. "You don't stop."` : `Ressa has been sitting with the sick in Mossa's tent since the squad came. "They don't hurt," she says, coming back to the fire. "That's the worst of it. They don't hurt, so they don't stop."`);
      if (b8In('vasso')) ln.push(late ? `Vasso sits with his back to the fire and his face to the rows, where the shadows are. "There's no Guild here," he says. "No one's paying for these people. No one's written anything down." He turns a knife over. "I thought that would feel better than it does."` : `Vasso keeps looking up at a sky with nothing in it. "In the city there's always a bell," he says. "The hour, a temple, K'rul's, low, under everything." He listens. "Here it's only the city's, far off, saying it's evening when it isn't. I miss them. I didn't think I would."`);
      if (b8In('edrem')) ln.push(late ? `Edrem sits facing the barrow, with the mace across his knees. "The ones on the jugs were frightened, before," he says. "I walked them up the road myself, some of them. Frightened is better." He does not look away from the dark. "I would like them frightened again."` : `Edrem is standing; it is how he sits. "This end of the camp was always the poor end," he says. "The last to come, the sick, the ones with nothing to lay down." He looks along the edge. "They're the ones still sober. No one brought them a jug. No one thought they were worth one."`);
      return {sp:'The camp\'s edge', scene:'b8_camp_night', txt:ln.length ? ln.join('\n\n') : `It is quiet at the fire. You sit with the ledger, and the open dark behind you, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b8_c4_fire'}]}; },
    b8_c4_sleep:()=>({sp:'The camp\'s edge', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_ph = Math.max(2, S.f.b8_c4_ph || 1); }, txt:
`There is no morning here, only the city's bells, far off, saying so. You sleep in turns by the fire, two awake at a time, and wake to the same dark you lay down in, a little colder.

The camp goes about its day by lamplight. Further in, down the rows toward the barrow, there is music where there was none yesterday, and the sweet smell has come a row nearer the edge in the night.${b84Say({edrem:`\n\n"The rows," Edrem says, buckling the scale. "That's where it is. We should see it before it sees us."`, kettle:`\n\n"The rows," Kettle says, pulling her boots on. "I want to know where the jugs are coming from. You can't count what you can't find."`, _:`\n\nThe rows, then. You want to know where the jugs are coming from.`})}`,
      ch:[{t:'Up, then.', go:()=>startExplore()}]}),

    /* the edge's other ways: the rows (west), the yard (north), the road to the city (south) */
    b8_c4_to_rows:()=>{ const ph = b84Ph();
      if (ph === 1) return {sp:'The rows', scene:'b8_c4_rows', txt:
`West, the rows run in toward the barrow, tent after tent, lit here and there. At this hour the frightened ones have their flaps tied and the others are further in, where the music is. ${S.f.b8_c4_waterDone ? 'Tomorrow, by the bells.' : 'And there is something wrong at the water line first.'}`,
        ch:[{t:'Back to the edge.', go:()=>startExplore()}]};
      if (ph === 3 && !b84NightDone()) return {sp:'The rows', scene:'b8_c4_rows', txt:
`Not tonight. Tonight the rows are coming to you.`,
        ch:[{t:'Back to the edge.', go:()=>startExplore()}]};
      return {sp:'The rows', scene:'b8_c4_rows', txt:
`West, the rows run in toward the barrow: shacks and tents close on both sides, rag-lines across the lane, a sweet haze lying over the roofs, and far off at the camp's heart the barrow's long dark shape and its lamps.`,
        ch:[{t:'Into the rows.', onward:true, go:()=>{ startExplore('b8_c4_rows'); if (!S.f.b8_c4_rowsSeen) talk('b8_c4_rows_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c4_to_yard:()=>{ const ph = b84Ph();
      if (ph === 1) return {sp:'North along the edge', scene:'b8_camp_night', txt:
`North, the edge runs on past the last of the tents to a stake fence round something, with a lamp on the gate. A man is standing at the gate, watching the edge. ${S.f.b8_c4_waterDone ? 'In the morning, then.' : 'The water line first.'}`,
        ch:[{t:'Back to the edge.', go:()=>startExplore()}]};
      if (ph === 3 && b84Key() === 'hold' && !b84NightDone()) return {sp:'North along the edge', scene:'b8_camp_night', txt:
`Not tonight. Tonight the edge is the Fourth's, and the yard can wait for somebody else.`,
        ch:[{t:'Back to the edge.', go:()=>startExplore()}]};
      return {sp:'North along the edge', scene:'b8_camp_night', txt:
`North, the edge runs on past the last tents to a stake fence with a lamp on its gate. The sweet smell is thicker the nearer you go.`,
        ch:[{t:'To the fence.', onward:true, go:()=>{ startExplore('b8_c4_yard'); if (!S.f.b8_c4_yardSeen) talk('b8_c4_yard_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c4_road:()=>({sp:'The road to the city', scene:'b8_camp_night', again:()=>'The road back to Black Coral, lamps on its walls.', txt:
`South, the pilgrims' road runs back to Black Coral between the dark fields, the city's lamps strung along its walls like a necklace somebody has put down and forgotten. Calder's wagons are in there, loading.${b84Ph() >= 4 ? ' Calder sent a boy out at the morning bell: the wagons are loaded. They go west today.' : ' They will not be ready for days.'}`,
      ch:[...(b84Ph() >= 4 ? [{t:'Back to the city, and the wagons.', onward:true, go:'b8_c4_onward'}] : []),
          {t:b84Ph() >= 4 ? 'Not now.' : 'Back to the edge.', go:()=>startExplore()}]}),

    /* ======== phase 2: the rows ======== */
    b8_c4_rows_arrive:()=>({sp:'The rows', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_rowsSeen = 1; }, txt:
`The rows are a town made of whatever people carried: tents, shacks of driftwood and wagon-boards, rag roofs on poles, a cart turned on its side with a family living under it. The lanes between are mud. Lamps hang at the corners, and some of them have been let go out.

Half the flaps along the lane are tied shut from inside. In a gap between two tents, three people are dancing very slowly to no music, with their eyes open and their mouths dark, and nobody stops them, and nobody watches.${b84If('edrem', `\n\nEdrem walks the lane as if he owned it, slow, where the tied flaps can see him. Behind one of them somebody says his name, very quietly, as a question. "Yes," he says, not stopping. "Still here."`)}${b84If('vasso', `\n\n"I keep looking for the roofs," Vasso says. "There aren't any. Everybody can see everybody." He does not like it.`)}`,
      ch:[{t:'Walk the rows.', go:()=>startExplore()}]}),
    b8_c4_rows_back:()=>({sp:'The rows', scene:'b8_c4_rows', txt:
`East, the lane runs back out to the edge, the fire, the water line and the open dark.`,
      ch:[{t:'Back to the edge.', onward:true, go:()=>startExplore('b8_c4_edge')},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* Hurrin, a pilgrim from the north, and his brother's grey scale */
    b8_c4_hurrin:()=>({sp:'Hurrin', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_hurrinMet = 1; }, again:()=>'Hurrin, at his shack, with the bundle he has not put down.', txt:
`Hurrin is a thin man from the north with a cough he has brought all the way with him, sitting on an upturned bucket outside a shack of wagon-boards with a bundle in his lap, wrapped in sacking and tied with cord. His flap is not tied shut. He is the only one in the row whose flap is not tied shut.

"Soldiers," he says, and coughs. "Real ones. I can tell by the way you stand at a corner." He shifts the bundle. "Sit, if you like. The bucket's taken but the mud's free."`,
      ch:[{t:'"Where are you from, Hurrin?"', go:'b8_c4_hurrin_north'},
          {t:'"The sweet stuff. Who brings it?"', go:'b8_c4_hurrin_drink'},
          {t:'"Your neighbours have their flaps tied. Yours isn\'t."', go:'b8_c4_hurrin_kids'},
          {t:'"What\'s in the bundle?"', req:()=>!!S.f.b8_c4_hurrinNorth && !S.f.b8_c4_scale, go:'b8_c4_hurrin_scale'},
          {t:'Back to the row.', go:()=>startExplore()}]}),
    b8_c4_hurrin_north:()=>({sp:'Hurrin', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_hurrinNorth = 1; }, txt:
`"North," he says. "Past the Domin. A hill town you'll not have heard of; nobody has, it's that kind of town." He coughs. "My brother went with the Seer's army when the grey came through for the young men, and came home after it fell, and filed the marks off his armour with a rasp the first night, every plate. Took him till morning."

"He died last winter. Of his chest, not of anything brave." He looks down at the bundle in his lap. "I said I'd bring it here. Lay it on the barrow, where they say the weight goes. It's a long road. I've been here more evenings than I can count, evenings that weren't, and I've not laid it down."`,
      ch:[{t:'Back to Hurrin.', go:'b8_c4_hurrin'}]}),
    b8_c4_hurrin_drink:()=>({sp:'Hurrin', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_hurrinDrink = 1; }, txt:
`"Men with good boots," he says. "They come out from further in, past the barrow end, with jugs. They don't drink it. They give it away, the first time." He coughs into his sleeve. "My neighbours took it. The woman opposite, whose girl they took to the tents behind the rope. She drinks it now. She says the girl is happier."

"I'm frightened all the time," Hurrin says, simply. "Every night. I'd like to stop." He looks at the shut flaps. "But I've seen what stopping looks like."${b84If('ohl', `\n\n"Stay frightened," Ohl tells him. "It's the healthier of the two. I'm a healer. I'd know."`)}`,
      ch:[{t:'Back to Hurrin.', go:'b8_c4_hurrin'}]}),
    b8_c4_hurrin_kids:()=>({sp:'Hurrin', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_hurrinKids = 1; }, txt:
`"I've nothing anyone wants," he says. "And if they come, I'd like to see them coming." He nods west, down the row. "The end tent there. That was the family from the coast road. Four of them, now with friends. They've got loud. They stop people at the row's end and ask them if they're thirsty."

"And the children are all down the barrow end now, behind a rope," he says. "Every one in the camp under twelve or so. For their safety." He coughs. "Someone ought to bring them out of there. I keep thinking it. I'm not the one. I can't even put a shirt down."`,
      ch:[{t:'Back to Hurrin.', go:'b8_c4_hurrin'}]}),
    b8_c4_hurrin_scale:()=>({sp:'Hurrin', scene:'b8_c4_rows', txt:
`He unties the cord with fingers that take their time, and opens the sacking. Grey scale, old and well oiled, every plate filed smooth where a mark used to be.${b84If('edrem', ` Edrem looks at it without speaking; his own plates are filed the same way, with the same patience.`)}

"I can't put it on the barrow," Hurrin says. "I've tried. I get as far as the gifts and my hands won't. It doesn't feel like a weight to be taken. It feels like a shirt somebody ought to be wearing." He looks up at the squad. "Someone standing up for something."`,
      ch:[{t:'"Then we\'ll wear it, Hurrin. And stand up in it."', fx:()=>{ S.f.b8_c4_scale = 1; gain('b8_c4_greyscale'); b84L('edrem', 1); }, go:'b8_c4_hurrin_given'},
          {t:'"Keep it. Lay it down when you\'re ready."', go:'b8_c4_hurrin'}]}),
    b8_c4_hurrin_given:()=>({sp:'Hurrin', scene:'b8_c4_rows', txt:
`He folds the sacking up very small after, and puts it in his coat, and sits with his empty hands in his lap looking at them.

"There," he says. "That's lighter." He seems surprised. "No one took it. I gave it." He coughs, and laughs a little at himself. "My brother would say I'd made a meal of that."`,
      ch:[{t:'Back to the row.', go:()=>startExplore()}]}),
    /* the rope across the barrow end: the children kept apart. Never the rescue; never theirs (brief §Chapter 4, rule 71) */
    b8_c4_rope:()=>({sp:'The barrow end', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_ropeSeen = 1; }, again:()=>'The rope across the barrow end, and the lamps beyond it.', txt:
`At the end of the rows a rope is strung on stakes across the lane, waist high, and beyond it there is a cluster of tents with more lamps than anywhere else in the camp, and small shapes moving between them. Two men stand at the rope, in good coats, and smile at anyone who comes near, and say that the children are very well, and very happy, and that it is all for the best.

It is not a thing a handful of old soldiers can do in one night and then walk away from, with wagons leaving and the whole camp watching. You know it. ${b84Say({brisk:'So does Brisk. Her hand has gone to her sword and stayed there, and she takes it away again only because you look at her.', tuft:'So does Tuft. She stands at your shoulder looking at the lamps and her face does a thing you have not seen it do since Pale.', _:'So does everyone with you.'})}${b84If('edrem', `\n\nEdrem says, very low, "Someone will. I have to believe that someone will." He turns away from the rope first.`)}`,
      ch:[{t:'Back along the row.', go:()=>startExplore()}]}),
    b8_c4_barrow_look:()=>({sp:'Toward the barrow', scene:'b8_barrow', again:()=>'The barrow far off at the camp\'s heart, heaped with gifts.', txt:
`North, between the last tents, the barrow: a long dark heap at the camp's heart, gifts piled on it higher than a man, pilgrims on their knees in the mud before it, lamps. You stood there ${b84Knelt() ? 'and laid something on it' : 'at its edge and watched'}, not long ago. It looks further off from here than it did.

Not tonight. Tonight the trouble is behind you, at the edge.${b84If('edrem', `\n\nEdrem looks at it the way he always does, as a man looks at the place he guards, not the god in it.`)}`,
      ch:[{t:'Back along the row.', go:()=>startExplore()}]}),
    /* the drinkers' tent at the end of Hurrin's row (optional fight, or talked down) */
    b8_c4_tentend:()=>({sp:'The end tent', scene:'b8_c4_rows', txt:
`At the end of Hurrin's row the family from the coast road has its flap tied back, and four of them sit in the mouth of it with cups, and two men in good coats sit with them, and they all look up when the squad comes along the lane.

"Thirsty?" says the woman in front, and holds out her cup. Her mouth is dark at the corners. Behind her, the men in the good coats do not hold out anything.`,
      ch:[{t:'"No. And neither is anyone else in this row." Clear the tent.', go:()=>startBattle('b8_c4_drunk', {})},
          {t:'Talk past the woman, to the men in the coats: tell them the edge is spoken for.', check:['might', 16],
            edges:id=>[id === 'edrem' && ['they know him on this road', 3], id === 'brisk' && ['she fills a lane, and they can see her do it', 2], id === 'greysword' && ['a Grey Sword stood the walls of Capustan', 2], id === 'sgt' && ['you have faced down men in good coats before', 1], id === 'tuft' && ['she looks nineteen still', -1], id === 'vasso' && ['he looks like what he is, a boy from the roofs', -1]],
            near:{t:()=>`Yes, but the bigger of the two takes a long look at ${b84Nm(b84Who())} first, close, and pours his cup out on ${b84Nm(b84Who())}${b84Who() === 'sgt' ? 'r' : '\'s'} boots, slowly, and ${b84Nm(b84Who())} ${b84V(b84Who(), 'stand', 'stands')} there and ${b84V(b84Who(), 'let', 'lets')} him. It costs: stiff with it in the next fight.`, fx:()=>bruise(b84Who(), bruiseN())},
            go:'b8_c4_tent_talked', fail:'b8_c4_tent_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_tent_talked:()=>({sp:'The end tent', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_drunkDone = 1; S.f.b8_c4_drunkSent = 1; }, txt:
`The two men look at the squad, and at each other, and work it out. They get up without hurrying and go away up the row toward the barrow end, and after a while the four with the cups get up and follow them, the way they follow anything now.

The tent stays, empty, with its flap tied back and the cups in the mud. Down the row, one of the tied flaps comes open a little, and somebody looks out.`,
      ch:[{t:'Back to the row.', go:()=>startExplore()}]}),
    b8_c4_tent_row:()=>({sp:'The end tent', scene:'b8_c4_rows', txt:
`The bigger of the two men smiles, and says a word to the woman with the cup, quietly, and she gets up, and so do the others, all at once, still smiling.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c4_drunk', {})}]}),
    b8_c4_drunk_after:()=>({sp:'The end tent', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_drunkDone = 1; }, txt:
`The row is quiet after. The men in the good coats are gone, one of them limping; the family from the coast road are sitting in the mud outside their own tent, holding on to each other, the sweetness going off them in a shaking sweat.${b84Say({ohl:`\n\nOhl goes and sits with them, and after a while the woman lets him look at her hands, which she has cut on something and not noticed.`, _:`\n\nAfter a while the woman looks at her hands, which she has cut on something and not noticed, and starts to cry.`})}${b84If('edrem', `\n\nEdrem stands in the lane where the tied flaps can see him, until some of them come untied.`)}`,
      ch:[{t:'Back to the row.', go:()=>startExplore()}]}),

    /* ======== the store-yard behind the edge ======== */
    b8_c4_yard_arrive:()=>({sp:'The store-yard', scene:'b8_c4_yard', fx:()=>{ S.f.b8_c4_yardSeen = 1; }, txt:
`Behind the last tents on the north of the edge there is a yard with a stake fence round it, a lamp on the gate and nobody stopping you at it. Along the fence inside are lean-tos under oiled cloth, and under the cloth, stacked, stoppered jugs. Crates of them. More than this end of the camp could drink in a season.

The smell is worst here. It is fruit gone over, and under the fruit something that the back of your throat knows before you do.${b84Say({kettle:`\n\nKettle walks the length of the lean-tos, counting under her breath, and stops. "That's not for this end," she says. "That's for the whole camp. This is where they keep it till they need it."`, ohl:`\n\nOhl stands at the gate and goes no further. "I'll not breathe that if I don't have to," he says. "I've breathed enough of what men sell."`, _:''})}${b84If('vasso', `\n\n"Store-yard," Vasso says. "The Guild keeps them too, in the city. Not for this." He looks at the jugs. "Worse than this, sometimes. Not often."`)}`,
      ch:[{t:'Look about the yard.', go:()=>startExplore()}]}),
    b8_c4_yard_back:()=>({sp:'The store-yard', scene:'b8_c4_yard', txt:
`South, through the gate, the edge: the tents, the fire, the water line.`,
      ch:[{t:'Back to the edge.', onward:true, go:()=>startExplore('b8_c4_edge')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_jars:()=>({sp:'The lean-tos', scene:'b8_c4_yard', fx:()=>{ if (b84Passed()) S.f.b8_c4_sealSeen = 1; }, again:()=>'The lean-tos along the fence, and the jugs under the oiled cloth.', txt: S.f.b8_c4_burned ?
`Where the lean-tos were there is a line of black along the fence, still warm, and shards of clay in the ash, and a sweetness on the air that is going, slowly, like a bad smell from a room when the window is opened.` :
`Under the oiled cloth the jugs are stacked in straw, row on row, each one stoppered with wax and tied down. ${b84Passed() ? `Some of them have a seal pressed into the clay at the shoulder: a Daru merchant's mark, a wheel and a key. It is the mark that was painted on the side of every wagon the Fourth guarded east. You knew what was in the hidden wagon. You let it go by. Here it is.` : `None of them have a Daru seal. Whatever the merchant was carrying east went up in the fields on the road, and none of it came here by the Fourth's wagons. That is something. It is not much.`}${b84Passed() ? b84Say({ohl:`\n\nOhl looks at the seal and keeps looking. "Twenty silver," he says. "That was the pay, wasn't it."`, kettle:`\n\nKettle touches the seal with one finger and takes the finger away. "We counted these wagons in," she says. "Every night. We counted them."`, _:''}) : ''}`,
      ch:[{t:'Burn it. All of it.', req:()=>b84Key() === 'burn' && !!S.f.b8_c4_storesDone && !S.f.b8_c4_burned, go:'b8_c4_stores_after'},
          {t:'Back to the yard.', go:()=>startExplore()}]}),
    b8_c4_keepers:()=>({sp:'The keepers', scene:'b8_c4_yard', fx:()=>{ S.f.b8_c4_keepers = 1; }, again:()=>'The keepers of the yard, by the lean-tos, watching.', txt:
`By the lean-tos there are two men in good coats and dry boots, stoppering jugs, and a third in a dark priest's robe with a stained mouth who is not stoppering anything. They look at the squad when it comes in, the three of them, and then go back to what they were doing, as if the squad were a gust of wind in the yard.

"Pilgrims are welcome," the priest says, not looking up. "Everyone is welcome. Take a jug. Take the fear off." He seals another. "The edge will come to it. The edge always does."${b84If('edrem', `\n\nEdrem does not move. "Not while I stand on it," he says.`)}`,
      ch:[{t:'Leave them to it, for now.', go:()=>startExplore()}]}),

    /* ======== the bad night, and the key ======== */
    b8_c4_dusk:()=>({sp:'The camp\'s edge', scene:'b8_camp_night', html:contractHTML(), fx:()=>{ S.f.b8_c4_dusk = 1; }, txt:
`It gets darker, even here. You would not have thought it could. The lamps in the rows go out one by one, the way lamps go out when somebody is going down a lane putting them out, and the music further in gets louder and less like music.

Mossa comes to the fire with her hands wet. "Tonight," she says. "They are telling them in the rows that the edge has water and the sick, and that the sick are a waste of what they are given. The ones who have drunk will come down to the edge. The ones who sell it will come behind them, to see the edge drink too." She looks at the squad. "I can hold the tent. I can't hold the edge."

There are two things the Fourth can do with a night like this. You can stand at the far edge between the ones who have drunk and the ones who have not, with the sick and the water at your back, and hold it till the bells say morning. Or you can go north to the store-yard while ${b84Stood() ? 'the camp\'s guards, who know you from the barrow, come to stand at the edge with Mossa' : 'Mossa and the carriers hold the edge as best they can'}, and burn what is kept there, every jug, so that tomorrow and the day after there is that much less of it.`,
      ch:[{t:'Decide.', go:'b8_c4_key'},
          {t:'Not yet.', go:'b8_c4_fire'}]}),
    b8_c4_key:()=>({sp:'The bad night', scene:'b8_camp_night', html:contractHTML(), txt:
`The fire is banked low. The music in the rows is coming nearer.

${b84Say({brisk:`"Hold it," Brisk says. "That's what we are. That's all we ever were." That is her vote.`, _:''})}${b84Say({ohl:`${b8In('brisk') ? '\n\n' : ''}"Burn it," Ohl says. "Every jug in that yard is a dozen of these on mats. I've seen the prices." That is his.`, _:''})}${b84If('edrem', `\n\n"The edge," Edrem says. "The people on it. Jugs can be brought again. These people cannot."`)}${b84Say({kettle:`\n\nKettle keeps her own counsel, and turns a burner over in her fingers, and looks north toward the yard.`, tuft:`\n\nTuft has the Deck out and puts it away again without drawing. "It doesn't say," she says. "It never says the important ones."`, _:''})}${b84If('vasso', `\n\nVasso looks from you to the yard and back. "I'll go where you go," he says. "I'd rather it was somewhere with a roof."`)}`,
      ch:[{t:'"We hold the edge." Hold.', fx:()=>{ S.f.b8_c4_key = 'hold'; S.f.b8_c4_ph = 3; b84L('brisk', 1); b84L('edrem', 1); b84L('ohl', -1); }, go:'b8_c4_hold_go'},
          {t:'"We burn the stores." Burn.', fx:()=>{ S.f.b8_c4_key = 'burn'; S.f.b8_c4_ph = 3; b84L('ohl', 1); b84L('kettle', 1); b84L('brisk', -1); }, go:'b8_c4_burn_go'},
          {t:'Not yet.', go:'b8_c4_fire'}]}),
    b8_c4_hold_go:()=>({sp:'The bad night', scene:'b8_camp_night', html:contractHTML(), txt:
`So the Fourth holds the edge.

${b84Say({brisk:`Brisk takes the shield off her back and puts it on her arm, and that is all the speech she makes.`, _:`The squad takes its kit and goes to the edge, and that is all the speech anyone makes.`})} Mossa goes back to her tent, to the sick and the cups, and ties the flap open so the light will show you where she is.${b84If('edrem', `\n\nEdrem goes to the place where the pilgrims' road comes in, and stands there, where everyone can see him. "Here," he says. "They will come this way first. They always come the way they know."`)}`,
      ch:[{t:'To the edge, and set it.', go:'b8_c4_hold'},
          {t:'Back to the fire a moment.', go:'b8_c4_fire'}]}),
    b8_c4_burn_go:()=>({sp:'The bad night', scene:'b8_camp_night', html:contractHTML(), txt:
`So the Fourth goes for the stores.

${b84Stood() ? `The guards from the barrow road come out of the dark while you are making ready, five of them, old soldiers with nothing to do with their hands, who gave up walking the rows a while ago and never said why, and who stood at the barrow's edge with you. "We heard," the eldest says. "We'll hold the edge. Go and do it."` : `Mossa takes the second fire-hook from behind her tent flap and stands in the lane with it, and the carriers stand with her with their yokes, and that is the edge tonight. "Go," she says. "Be quick."`}${b84Say({kettle:`\n\nKettle has a burner in each hand and a sharper in her teeth, and takes the sharper out to say, "Finally."`, _:''})}`,
      ch:[{t:'North, to the store-yard.', go:'b8_c4_burn'},
          {t:'Back to the fire a moment.', go:'b8_c4_fire'}]}),

    /* ---- 'hold': setting the edge (Ch 3's 'stand' +2: the camp's guards trust the squad), then the fight ---- */
    b8_c4_hold:()=>({sp:'The far edge', scene:'b8_camp_night', again:()=>'The far edge in the bad night, the music coming down the rows.', txt:
`The far edge in the dark: the last row of tents, the gaps between them, the lanes coming out from the rows, the water line and Mossa's lamp behind. The music is two rows in now. You can hear feet in the mud under it.

There is a little time. Enough to drag the handcarts across the widest gap, move the lamps back so the squad is in the dark and the lanes are not, and carry the sick a row further from the noise.${b84Stood() ? ` The guards from the barrow road come to help without being asked; they stood with you there, and remember.` : ''}${b84If('edrem', ` Edrem is already dragging the first cart.`)}`,
      ch:[{t:'Set the edge: carts across the gap, the lamps moved back, the sick carried in.', check:['wits', 16],
            edges:id=>[b84Stood() && ['the camp\'s guards trust the squad, and lend their hands', 2], id === 'edrem' && ['he has held this edge before, alone', 2], id === 'brisk' && ['holding a line is what she is', 2], id === 'greysword' && ['the Grey Swords set Capustan\'s gates', 2], id === 'kettle' && ['she counts the gaps and the lamps, and knows which matter', 1], id === 'ellis' && ['she found the nine ways in already', 1], id === 'sgt' && ['you have set a line in the dark before, often', 1], id === 'vasso' && ['a roof boy on flat ground', -1], id === 'tuft' && ['she keeps looking at the dark instead of the lanes', -1]],
            near:{t:()=>`Yes, but the widest cart sticks in the mud and ${b84Nm(b84Who())} ${b84V(b84Who(), 'put', 'puts')} a shoulder to the wheel to free it, and something in the shoulder goes with a sound like a knot giving. ${b84Nmc(b84Who())}'ll feel it in the fight.`, fx:()=>bruise(b84Who(), bruiseN())},
            go:'b8_c4_hold_set', fail:'b8_c4_hold_loose'},
          {t:'No time to set it. Stand in the gap.', go:()=>startBattle('b8_c4_edge', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_hold_set:()=>({sp:'The far edge', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_edgeSet = 1; }, txt:
`The carts go across the gap. The lamps go back, so that the lanes coming out of the rows are lit and the edge behind them is not, and the sick are a row further off with the carriers sitting among them. When the first of the drinkers come out of the lane into the light, the Fourth is already standing in the dark, waiting, and they do not see it until it moves.`,
      ch:[{t:'Hold.', go:()=>startBattle('b8_c4_edge', nearMiss() ? {} : {surprise:'p'})}]}),
    b8_c4_hold_loose:()=>({sp:'The far edge', scene:'b8_camp_night', txt:
`The first cart is only half across when the music comes out of the lane all at once, and the drinkers with it, and there is no more time to set anything. The lamps are where they were. So is the squad.`,
      ch:[{t:'Hold anyway.', go:()=>startBattle('b8_c4_edge', {})}]}),
    b8_c4_edge_after:()=>({sp:'The far edge', scene:'b8_camp_night', fx:()=>{ if (!S.f.b8_c4_held) { S.f.b8_c4_held = 1; b84L('edrem', 1); } }, txt:
`The bells in the city say it is the small hours. The edge is still the edge.

The ones who came down the rows are lying in the mud or sitting with their heads in their hands, and the carriers are going among them with the cups and the song, the same as they go among the sick, without asking which they were. The men in the good coats are gone back in toward the barrow end, those that could go. Not one of them has come through the line to the tents behind it. Mossa's lamp is still lit.${b84Say({brisk:`\n\nBrisk leans on her shield and breathes. "Held," she says. She salutes the dark, two fingers. "Not tonight, Hood. Not these."`, _:''})}${b84If('edrem', `\n\nEdrem stands where the road comes in, as he did before it started, as he will after. "They will be frightened again in the morning," he says. "Some of them. Good."`)}${b84If('vasso', `\n\nVasso sits down in the mud where he is, suddenly, and looks at his knife. "Still never put it in anybody," he says, a little surprised. "There was always somebody nearer."`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c4_fire'}]}),

    /* ---- 'burn': the store-yard (never the camp, never anybody's hut), then the burning ---- */
    b8_c4_burn:()=>({sp:'The store-yard', scene:'b8_c4_yard', txt:
`North along the edge in the dark, past the last of the tents, to the stake fence and its lamp. The gate is shut tonight, and there are more voices inside it than there were.${b84If('vasso', `\n\n"Three by the lean-tos," Vasso says, very low, at the gate's crack. "The priest. More at the back, in the sheds." He looks at the fence. "I could go over. It'd be like a roof, nearly."`)}`,
      ch:[{t:'Into the yard.', onward:true, go:()=>{ startExplore('b8_c4_yard'); talk('b8_c4_stores_start'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_stores_start:()=>({sp:'The store-yard', scene:'b8_c4_yard', txt:
`The keepers are in the yard, and they are not stoppering anything tonight: they are loading handcarts, jug after jug, for the edge. The priest stands among the carts with his stained mouth and his hands open, and when he sees the squad come through the gate he smiles as if you had come to help.

"Pilgrims," he says. "Good. Take a jug down with you. The edge is thirsty tonight."`,
      ch:[{t:'"No." Take the yard.', go:()=>startBattle('b8_c4_stores', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_stores_after:()=>({sp:'The store-yard', scene:'b8_c4_yard', fx:()=>{ S.f.b8_c4_storesDone = 1; }, txt:
`The yard is quiet. The keepers who could run have run, out through the back of the fence into the dark toward the camp's heart; the priest is down among his carts, and the sweetness in the air round him is going thin.

And there are the jugs: along the fence under the oiled cloth, on the carts, in the sheds at the back, row on row in their straw, more than this end of the camp could drink in a season. Oiled cloth, dry straw, old wood. It will burn. The trouble is that the tents start twenty paces south of the fence, and they will burn too.${b84If('kettle', `\n\nKettle is already looking at the wind, such as there is, and at the fence, and counting.`)}`,
      ch:[{t:'Burn it so it burns here and nowhere else: the straw pulled back from the fence, the fire set to draw north.', check:['wits', 15],
            edges:id=>[id === 'kettle' && ['munitions, and a sapper\'s lifetime of knowing what fire will do', 3], id === 'brannoc' && ['Falari: a harbour town knows fire on a wind', 1], id === 'ellis' && ['Claw-trained, and she has burned a store before', 1], id === 'sgt' && ['you have burned an enemy\'s stores before, on the march', 1], b84Hook() && id === 'brisk' && ['the camp\'s fire-hook, and the reach to use it', 1], id === 'vasso' && ['a city boy: fire is a thing the watch deals with', -1]],
            near:{t:()=>`Yes, but a fall of burning straw comes off the last lean-to the wrong way and ${b84Nm(b84Who())} ${b84V(b84Who(), 'beat', 'beats')} it out with bare hands before it reaches the fence. ${b84Nmc(b84Who())}'ll feel it in the next fight.`, fx:()=>bruise(b84Who(), bruiseN())},
            go:'b8_c4_burn_ok', fail:'b8_c4_burn_spread'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c4_burn_ok:()=>({sp:'The store-yard', scene:'b8_c4_yard', fx:()=>{ S.f.b8_c4_burned = 1; }, txt:
`It goes up the way stores go up: slowly, and then all at once. The oiled cloth first, then the straw, then the jugs, cracking one after another in the heat like knuckles, and the stuff in them running out and catching with a low blue flame and a smell that is sweet for a moment and then only foul. The fire draws north, the way it was set to, away from the tents, and stays inside the fence.

None of the Fourth goes near enough to breathe it. You stand at the gate and watch it burn down, all of it, every jug, until it is a long low glow along the fence and a smear of smoke going up into a sky that does not notice.${b84Say({ohl:`\n\nOhl watches the whole of it without moving. "There," he says at the end. "That's a dozen mats that'll stay empty." He does not sound glad. He sounds tired.`, _:''})}`,
      ch:[{t:'Back to the edge.', go:'b8_c4_edge_news'}]}),
    b8_c4_burn_spread:()=>({sp:'The store-yard', scene:'b8_c4_yard', fx:()=>{ S.f.b8_c4_burned = 1; S.f.b8_c4_yardSpread = 1; }, txt:
`It goes up the wrong way. The straw catches before it is pulled back, and the fire walks along the fence instead of away from it, and a lean-to at the south corner goes over in a shower of sparks onto the nearest tent, which is empty, thank whatever is listening.

${b84Hook() ? `The fire-hook earns its keep. The empty tent comes down in a heap before the fire walks to the next one, and somebody stamps the heap out, and somebody else is swearing very steadily in a way that helps.` : `There is no hook. The squad pulls the empty tent down by its ropes, by hand, before the fire walks to the next one, and somebody's hands are raw for it.`} The stores burn, all of them, every jug. It is not tidy. It is done.`,
      ch:[{t:'Back to the edge.', go:'b8_c4_edge_news'}]}),
    b8_c4_edge_news:()=>({sp:'The camp\'s edge', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_edgeCost = b84Stood() ? 'held' : 'tents'; }, txt: b84Stood() ?
`The edge held without you. The guards from the barrow road are sitting along the last row with their backs to the tents, as tired as old soldiers get, and the drinkers who came down the rows are lying in the mud with the carriers going among them. Not one got through to the sick. "They came," the eldest guard says. "Not so many as there might have been. Half of them were looking north at the glow." He nods at the smoke. "That was you."` :
`The edge held, just. Mossa and the carriers kept the lane with the second hook and their yokes, and the drinkers who came down the rows did not get past the water line; but two tents at the end of the row went down in the struggle, and one of the carriers has a cut over his eye that Mossa is sewing by lamplight. "We held," she says, not looking up from the needle. "You burned it. Both of those happened." She ties off the thread. "I'll take both."`,
      ch:[{t:'Back to the fire.', go:'b8_c4_fire'}]}),

    /* ======== phase 4: the morning, by the bells ======== */
    b8_c4_morning:()=>({sp:'The camp\'s edge', scene:'b8_camp_night', fx:()=>{ S.f.b8_c4_ph = 4; }, txt:
`The city's bells say morning. The dark says what it always says. The camp's far edge is still here: the tents, the water line, Mossa's lamp, the carriers already going out on the road to the city with their yokes for the first of the day's water.

${S.f.b8_c4_key === 'burn' ? `North, along the fence, a smear of smoke is still going up from the store-yard into the dark.` : `Out in front of the last row there is a line in the mud where the Fourth stood all night, and nobody has walked over it yet.`} Further in, down the rows, the music has stopped. It will start again. Everyone at the edge knows it will start again, and worse, and no one at the edge puts it into words.

A boy comes out along the road from the city with word from Calder: the wagons are loaded. They go west today.`,
      ch:[{t:'Up, then. Say what there is to say.', go:()=>startExplore()}]}),
    b8_c4_mossa_end:()=>({sp:'Mossa', scene:'b8_c4_tent', fx:()=>{ S.f.b8_c4_mossaEnd = 1; }, txt:
`Mossa is at her tent door with the cups, washing them, as she was when you came.

"You're going," she says. "Good. You've a city to go back to, and this isn't it." She dries a cup. "It'll come again. Worse, next time. You'll be gone, and that's right; it was one night, and you gave it." She looks at you. "No one gave us one of those in a long while."${S.f.b8_c4_hook ? `\n\n${b84Hook() ? `"Keep the hook," she says, before you can offer it. "I said I'd like it back. I'd like you to have it more."` : `"The hook," she says. "Keep it, wherever it is. It was meant to go."`}` : ''}${b84If('edrem', `\n\nShe looks at Edrem, and then past him at the road. "You're going with them," she says. It is not a question. "Good. The road will still be here."\n\n"I know," Edrem says. "That is what frightens me."`)}`,
      ch:[{t:'Back to the edge.', go:()=>startExplore()}]}),
    b8_c4_hurrin_end:()=>({sp:'Hurrin', scene:'b8_c4_rows', fx:()=>{ S.f.b8_c4_hurrinEnd = 1; }, txt:
`Hurrin is on his bucket outside his shack, with his hands in his lap, coughing.${S.f.b8_c4_scale ? ' There is no bundle in his lap now. He keeps looking at the place where it was.' : ' The bundle is still in his lap, tied up in its sacking.'}

"You're off, then," he says. "With the wagons." He nods slowly. "I'll stay. I came to put something down, and I'm not done." He coughs. "I'm still frightened. I thought you'd like to know. Every night."${S.f.b8_c4_ropeSeen ? `\n\n"Someone will bring those children out," he says, looking down the row toward the rope. "I keep telling myself. One of these nights." He does not say who. He does not know.` : ''}`,
      ch:[{t:'Back to the row.', go:()=>startExplore()}]}),
    b8_c4_onward:()=>({sp:'The road to the city', scene:'b8_camp_night', txt:
`The road back to Black Coral runs between the dark fields to the lamps on its walls, and Calder's wagons are drawn up inside the gate with their teams in the traces and Calder swearing at the loading. West, over the Lamatath, with the wagons, toward a city where the sky does what it is told.

By the time the wagons are halfway, the Fete will have begun in Darujhistan, masks and lanterns and the whole city in the streets for days on end. The Contract will be waiting, cooler than it was, and not gone. The Fourth has been away long enough for the city to forget a little. It has not been away long enough for the Guild.${b84If('edrem', `\n\nEdrem walks at the end of the line with the long mace over his shoulder, and keeps his face to the west until the road turns, and then looks back at the barrow, once.`)}${b84If('vasso', `\n\nVasso is looking at the sky as the gate goes by overhead. "Somewhere out there it gets light," he says. "I'd like to see that again."`)}`,
      ch:[{t:'West, with the wagons.', onward:true, go:()=>chapterEnd(4, b84Key() || B8KEY0[4])},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
