/* ============ Book Eight, Chapter 2: The Black Coral Road ============ */
/* East over the old Domin at winter's end (tth-canon correction 4, fix (A)), with one merchant's caravan (never the Council's), its master
   Calder, the merchant's man. "Weeks", never a count. The scarecrow fields and the towns coming back wrong are canon (R4 S2, R6 S3).
   Phase 1 (S.f.b8_c2_ph), the caravan's first halt out of the city: the fire, the reading (B8READ[2], a wagon's tailboard), Calder and the
   merchant's mail, the last wagon with its tarp lashed down and a sweet smell under it, and Vasso out of the dark on 'quiet' (the brief:
   Ch 2's first halt; b8Join('vasso')). Phase 2, the road east by day: riders on a ridge (b8_c2_raid, optional), the carters' chains (the
   trick, The Carter's Brake). Phase 3, a Pannion town coming back wrong, its well, its priest and the tithe he asks (b8_c2_town, main,
   stage 2 the temple steps). Phase 4, the halt beside the scarecrow fields: the scarecrows sing and never fight; a drover walks into the
   rows after the song and the field-tenders come for her (b8_c2_fields, pollen:true, stage 2 deeper in). Phase 5, the night: lanterns in
   the rows, the tenders at the last wagon, the merchant's kelyk (the jug, gain('b8_kelykjug')), Calder; the key at the fire,
   S.f.b8_c2_key: 'fields' (burn the wagon's kelyk and the field by the road: the fee lost, −20 silver, S.f.b8_c2_kelyk = 'burned') or
   'pass' (say nothing, take the pay: +20, 'passed'). Phase 6: the road on east. Kelyk never reaches the city (canon); it goes east, to the
   camp at the barrow. Notes for later chapters: docs/tth-ch2-notes.md. */
/* FOR THE ARTIST (142b): names this file uses.
   Items: ART['item/b8_c2_caravanmail'], ['item/b8_c2_drovergoad'] (b8_kelykjug is 140b's).
   Figures: b8_c2_calder (the caravan master), b8_c2_carter (the carters, Calder's man), b8_c2_drover (the drover with the red scarf and
   the goad); placeholders here with ??=. Reused: vasso, tenescowri (field-tenders and raiders), priest, b6_cultist, b3_c5_villager.
   Backdrops: b8_road_east, b8_fields, b8_caravan_night (140's, yours), and two this file adds that borrow until you draw them: b8_c2_town
   (a Pannion town coming back: new whitewash over old soot, a well, a temple's steps) and b8_c2_rows (the scarecrow fields at night,
   lanterns moving in the rows, a wagon at the verge).
   Ground (TILEX, this file's fallbacks borrow Book Three's): b8_c2_camp (the caravan's ring at night: 'W' wagons, 'K' the last wagon,
   'F' the fire, '=' carters' tents, 'h' horse lines, '#' the dark beyond the ring, '>' the road east), b8_c2_road (the Domin road by day:
   '.' earth, ',' dead grass, '#' a broken field wall, 'x' a dead tree, 'W' wagons, 'L' the lead wagon and its chains, '<' '>'), b8_c2_town
   ('#' walls new-whitewashed, 'w' the well, 'T' the temple steps, 'x', '<' '>'), b8_c2_fields (dusk to night: 'g' the green rows, 'y' a
   pole in the rows, 'e' the gap where the drover went in, '.' ',' the verge, 'W' 'K' 'F' as the camp, '>' the road on). Battle 't' is low
   cover; on the fields' battle ground ',' is the green rows (walkable) and '#' a wattle hurdle. No bodies anywhere; the scarecrows are
   rag-wrapped shapes on poles at a distance. */

/* ---- small helpers (b82: Book Eight, Chapter Two) ---- */
const b82L = (id, n) => { if (b8In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b82Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b8In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b82If = (id, s) => b8In(id) ? (typeof s === 'function' ? s() : s) : '';
const b82Who = () => (ROLL() && ROLL().who) || 'sgt';
const b82Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b82Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b82V = (id, you, they) => id === 'sgt' ? you : they;
const b82Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the first halt, 2 the road east, 3 the town, 4 the fields halt, 5 the night by the fields, 6 the road on */
const b82Ph = () => S.f.b8_c2_ph || 1;
const b82Key = () => S.f.b8_c2_key || null;
const b82Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b8In(id));
/* Vasso comes out of the dark at the first halt when Chapter 1 left him unsettled: on 'quiet' (the brief), or a save that never set him */
const b82VassoPending = () => S.f.b8_vassoDone == null && b8CanRecruit('vasso');
const b82Benna = () => { try { return visReader().id === 'benna'; } catch (e) { return false; } };
const b82KeyOpen = () => !!S.f.b8_c2_found && !!S.f.b8_c2_calder;

/* ---- The Carter's Brake: the caravan's wagons run up in a line and chained wheel to wheel when riders show, so that a raider has to come
   at the guards from the one side the chain leaves open. It copies the Line (Book One's line, t_line): B.line, so 31's armour and
   flanking rules do the rest. Not sorcery. v10.3: it strikes nobody, so it is free. ---- */
Object.assign(TRICKS, {
  b8_c2_brake:{name:'The Carter\'s Brake', ch:2, use:'fight', ab:'t_b8_c2_brake', where:'the old Domin road, east of Darujhistan, with a merchant\'s wagons and riders on the ridge',
    lore:'Carters on a bad road keep a chain in every wagon bed. When riders show on a ridge the wagons are run up nose to tail and chained wheel to wheel, and the guards stand in the one gap the chain leaves, so that whoever wants the wagons has to come through the guards to get them. The Fourth stood in gaps like that once, on this same country, beside the Host\'s quartermaster\'s wagons, years ago.',
    get fx(){ return `Once a fight: the bearer calls the brake, and the bearer and every squadmate beside them close up as chained wagons do. They take +${3 + lvT()} armour and cannot be flanked until the bearer's next turn. Grows with level. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b8_c2_brake:{name:TRICKS.b8_c2_brake.name, trick:'b8_c2_brake', self:true, free:true, desc:()=>TRICKS.b8_c2_brake.fx,
    run(u){ B.line = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => lineCovers(p)); in_.forEach(p => { float(p, 'the brake', '#c8b890'); sparks(p.x, p.y, 8, '#c8b890', .4); });
      blog(`${u.name}: "Chain up." ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} close${in_.length > 2 ? '' : 's'} in beside them, wheel to wheel, and leave the enemy one gap to come through.` : 'Nobody close enough to chain to. One wheel will have to hold.'}`); }},
});

/* ---- borrowed pictures until the artist's file (142b) replaces them: two scenes, three figures, four grounds, the two items ---- */
{ const like = {b8_c2_town:'b8_road_east', b8_c2_rows:'b8_fields'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof FIGX !== 'undefined') { FIGX.b8_c2_calder ??= (ctx, h, t, o) => (FIGX.b5_c3_trader || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c2_carter ??= (ctx, h, t, o) => (FIGX.b3_c5_villager || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c2_drover ??= (ctx, h, t, o) => (FIGX.b3_c5_villager || FIGX.b2soldier || (() => {}))(ctx, h, t, o); }
if (typeof TILEX !== 'undefined') {
  TILEX.b8_c2_camp ??= (ctx, ch, x, y, T, dark) => TILEX.b3camp_night(ctx, ch === 'K' ? 'W' : ch === '#' ? ',' : ch, x, y, T, true);
  TILEX.b8_c2_road ??= (ctx, ch, x, y, T, dark) => ch === 'W' || ch === 'L' ? TILEX.b3camp(ctx, 'W', x, y, T, !!dark) : TILEX.b3_c5_domin(ctx, ch, x, y, T, dark);
  TILEX.b8_c2_town ??= (ctx, ch, x, y, T, dark) => TILEX.b3_c5_domin(ctx, ch === 'T' ? '.' : ch, x, y, T, dark);
  TILEX.b8_c2_fields ??= (ctx, ch, x, y, T, dark) => ch === 'W' || ch === 'K' || ch === 'F' ? TILEX.b3camp_night(ctx, ch === 'K' ? 'W' : ch, x, y, T, true)
    : TILEX.b3_c5_domin_night(ctx, ch === 'g' ? ',' : ch === 'y' ? 'x' : ch === 'e' ? '.' : ch, x, y, T, true);
  TILEX.b8_c2_rowsb ??= (ctx, ch, x, y, T, dark) => TILEX.b3_c5_domin(ctx, ch, x, y, T, dark); }
if (typeof ART !== 'undefined') [['b8_c2_caravanmail', 'b7_c3_edurmail'], ['b8_c2_drovergoad', 'b7_c4_bluelance']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Eight's glossary ---- */
GLOSSX.tth.push(
  [2, 'Calder', 'The caravan master: the merchant\'s man, not the Council\'s. Thin, Daru, a road coat and a ledger. He pays on time and does not like questions about the last wagon.', ()=>!!(S && S.book === 'tth' && (S.chapter || 0) >= 2)],
  [2, 'The scarecrow fields', 'Green rows in the dead country of the old Domin, and shapes wrapped in rags on poles among them, thousands, to the edge of the sky. They sing. The pollen pulls at the mind. What feeds the green is better not looked at closely.', ()=>!!(S && S.f && (S.f.b8_c2_ph || 0) >= 4)],
  [2, 'The carters\' brake', 'Wagons run up nose to tail and chained wheel to wheel when riders show, so that whoever wants them has to come through the guards in the one gap left.', ()=>!!(S && S.f && S.f.b8_c2_brakeSeen)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[2] = ['b8_c2_fire'];

/* the reading: a wagon's tailboard by the caravan fire, the first night out of the city */
B8READ[2] = {scene:'b8_caravan_night', where:'a wagon\'s tailboard by the caravan fire', set:'The caravan\'s first night out of Darujhistan: wagons drawn in a ring on the old Domin road, one fire, and the dark beyond the ring very wide.', back:'b8_c2_fire', backT:'Back to the fire.',
  say:{tuft:'"Out here," Tuft says, laying the Deck on the tailboard, "the cards are louder. I don\'t know why. Sit."', sohra:'"Open country," Sohra says, and breathes out, the first time since the city. "The bones like it. Sit, before they change their minds."',
       benna:'"Copper first," says Benna. "I\'m paid to wash for this lot, not to read for it. Reading\'s extra."'}};

const B8CH2 = {
  title:B8CH[2], number:'Two',
  intro:{loc:'East of Darujhistan', sub:'The old Domin · winter\'s end', scene:'b8_road_east', cap:'Wagons in a line on a bad road, the hills behind, and the land ahead flat and grey to the edge of the sky.',
    paras:[
`Winter's end. The fog lifts off the lake later every morning, and the Fete's lanterns are going up in the Gadrobi lanes, and the Fourth goes out through the east gate behind a merchant's wagons before any of them are lit.`,
()=>`It is one merchant's venture: his money, his wagons, his goods, and his man Calder to see them through, east over the old Domin to Black Coral, a long road, weeks of it. Not the Council's. The Council has not settled what it thinks of Black Coral yet. The merchant thinks it is a market. He hired guards who know which end of a road is which.${b82Mates().length ? ` ${b82Mates().length > 1 ? 'The squad' : NAME(b82Mates()[0])} came because the paper with five strokes on it wants time to cool, and the far side of the Domin is a long way from any roof in Darujhistan.` : ' You came because the paper with five strokes on it wants time to cool, and the far side of the Domin is a long way from any roof in Darujhistan.'}`,
`Years ago the Fourth crossed this country with the Host, and it was burning. It is not burning now.`],
    go:'To the first halt', node:'b8_c2_start'},

  areas:[
    /* 16 x 12 (b8_c2_camp). . trampled earth  , dead grass  # the dark beyond the ring  W wagons  K the last wagon  F the caravan's fire
       = carters' tents  h horse lines  > the road east, in the dark */
    { id:'b8_c2_camp', title:'The old Domin · the first halt', sub:'Night · the caravan\'s ring', hint:'Tap ground to move · tap a figure to talk · the fire is in the middle of the ring · the last wagon is east', decor:'b8_c2_camp', dark:true,
      map:[ "################",
            "##W..W....W..W.#",
            "#W.,.....,....W#",
            "#....=....=....#",
            "#W.......,.....#",
            "#..,...F.......>",
            "#W.............#",
            "#...=.....,.=..#",
            "#W.....h.h....K#",
            "#.,............#",
            "##.W..W....W..W#",
            "################" ],
      walk:'.,FK>', triggers:{F:'b8_c2_fire', K:'b8_c2_wagon', '>':'b8_c2_camp_east'}, start:{x:7, y:6},
      quest:()=> b82VassoPending() ? 'A young man by the last tent, with his hands where you can see them.'
        : !S.f.b8_c2_calderMet ? 'Calder, the caravan master, at his wagon.'
        : !S.f.b8_c2_wagonSeen ? 'The last wagon in the ring, east, with its tarp lashed down.'
        : 'The fire. In the morning, the road east.',
      npcs:[
        {id:'calder', name:'Calder, at his wagon', kind:'b8_c2_calder', x:10, y:4, node:()=>'b8_c2_calder', fresh:()=>!S.f.b8_c2_calderMet},
        {id:'carters', name:'Carters at the horse lines', kind:'b8_c2_carter', x:6, y:9, node:()=>'b8_c2_carters', fresh:()=>!S.f.b8_c2_carters},
        {id:'vasso2', name:'A young man by the last tent', kind:'vasso', x:2, y:9, node:()=>'b8_c2_vasso', show:()=>b82Ph() === 1 && (b82VassoPending() || (S.f.b8_vassoDone === 2 && !!S.f.b8_c2_vassoCame)), fresh:()=>b82VassoPending()} ] },

    /* 16 x 12 (b8_c2_road). . earth  , dead grass  # a broken field wall  x a dead tree  W wagons  L the lead wagon and its chains
       < back west (the city is weeks behind)  > east, toward a town */
    { id:'b8_c2_road', title:'The old Domin · the road east', sub:'Day · wind from the north · flat to the edge of the sky', hint:'Tap ground to move · tap a figure to talk · the lead wagon carries the chains · the road goes on east', decor:'b8_c2_road',
      map:[ "################",
            "#..x....,..#.,.#",
            "#.,..##....,...#",
            "#.........,....#",
            "#,..W.W.L.W.W..#",
            "<..............>",
            "#....,.........#",
            "#.##......x..,.#",
            "#..,..,.....##.#",
            "#.x.......,....#",
            "#.,..#.....,..x#",
            "################" ],
      walk:'.,L<>', triggers:{L:'b8_c2_brake', '<':'b8_c2_road_west', '>':'b8_c2_to_town'}, start:{x:2, y:5},
      quest:()=> !S.f.b8_c2_ridersSeen ? 'Riders on the ridge, north. The carters have seen them.'
        : !S.f.b8_c2_brakeTried ? 'The lead wagon. The carters are getting the chains out.'
        : !S.f.b8_c2_raidSettled ? 'The riders on the ridge, still watching.' : 'East. There is a town ahead, Calder says, with a well.',
      npcs:[
        {id:'riders', name:'Riders on the ridge', kind:'tenescowri', x:12, y:1, node:()=>'b8_c2_riders', show:()=>b82Ph() === 2 && !S.f.b8_c2_raidSettled, fresh:()=>!S.f.b8_c2_ridersSeen},
        {id:'calder2', name:'Calder, walking his horse', kind:'b8_c2_calder', x:6, y:6, node:()=>'b8_c2_road_calder', fresh:()=>!S.f.b8_c2_roadCalder} ] },

    /* 16 x 12 (b8_c2_town). . earth  , dead grass  # walls, whitewashed again over the soot  w the well  T the temple steps  x a dead tree
       < back west to the road  > on east, out of the town */
    { id:'b8_c2_town', title:'The old Domin · a town coming back', sub:'Dusk · new whitewash on old soot', hint:'Tap ground to move · tap a figure to talk · the well is in the square · the temple is north', decor:'b8_c2_town',
      map:[ "################",
            "#.##..#TT#..##.#",
            "#.#..........#.#",
            "#....,....,....#",
            "##.##......##.,#",
            "<.......w......>",
            "#.,............#",
            "##.###..,.##.###",
            "#...#......#...#",
            "#.,....x.....,.#",
            "#..#..,....#...#",
            "################" ],
      walk:'.,wT<>', triggers:{w:'b8_c2_well', T:'b8_c2_temple', '<':'b8_c2_town_back', '>':'b8_c2_to_fields'}, start:{x:1, y:5},
      quest:()=> !S.f.b8_c2_townDone ? 'The priest on the temple steps is watching the caravan come in. So is the whole town.' : 'East, out of the town, before dark.',
      npcs:[
        {id:'priest', name:'A priest in the square', kind:'priest', x:8, y:3, node:()=>'b8_c2_priest', show:()=>!S.f.b8_c2_townDone, fresh:()=>true},
        {id:'townwoman', name:'A woman by the well', kind:'b3_c5_villager', x:6, y:6, node:()=>'b8_c2_townwoman', fresh:()=>!S.f.b8_c2_townwoman},
        {id:'calderman', name:'Calder\'s man, at a back door', kind:'b8_c2_carter', x:13, y:8, node:()=>'b8_c2_backdoor', show:()=>!S.f.b8_c2_backdoor, fresh:()=>true} ] },

    /* 16 x 12 (b8_c2_fields). g the green rows  y a pole in the rows  e the gap where the drover went in  . , the verge  W wagons
       K the last wagon  F the caravan's fire  > the road on east */
    { id:'b8_c2_fields', title:'The old Domin · the scarecrow fields', sub:'Dusk into night · the halt beside the rows', hint:'Tap ground to move · tap a figure to talk · the rows are north · the fire is on the verge · the last wagon is east', decor:'b8_c2_fields', dark:true,
      map:[ "################",
            "#gggygggggygggg#",
            "#gyggggyggggggg#",
            "#ggggggggygggyg#",
            "#gggyggegggggg.#",
            "#.......,......#",
            "#.,....,....,..#",
            "#W.W..F...W.K..#",
            "#.....,........>",
            "#.,...........,#",
            "#..W....W...W..#",
            "################" ],
      walk:'.,eFK>', triggers:{e:'b8_c2_gap', F:'b8_c2_fire', K:'b8_c2_wagon', '>':'b8_c2_fields_east'}, start:{x:2, y:8},
      quest:()=> !S.f.b8_c2_fieldsDone ? 'The gap in the rows, where the drover went in after the song.'
        : b82Ph() === 4 ? 'The fire. The rows want watching tonight.'
        : !S.f.b8_c2_found ? 'Lanterns in the rows, coming toward the last wagon.'
        : !S.f.b8_c2_calder ? 'Calder. He owes the Fourth a straight answer.'
        : !b82Key() ? 'The fire. The last wagon wants an answer.' : 'East, at first light.',
      npcs:[
        {id:'calder3', name:'Calder, by his wagon', kind:'b8_c2_calder', x:10, y:8, node:()=>S.f.b8_c2_found && !S.f.b8_c2_calder ? 'b8_c2_calder_face' : 'b8_c2_fields_calder', fresh:()=>(!S.f.b8_c2_fieldsCalder && b82Ph() === 4) || (!!S.f.b8_c2_found && !S.f.b8_c2_calder)},
        {id:'drover', name:'The drover with the red scarf', kind:'b8_c2_drover', x:4, y:8, node:()=>'b8_c2_drover', show:()=>!!S.f.b8_c2_fieldsDone, fresh:()=>!S.f.b8_c2_goad},
        {id:'tenders', name:'Lanterns at the last wagon', kind:'tenescowri', x:13, y:6, node:()=>'b8_c2_loading', show:()=>b82Ph() === 5 && !S.f.b8_c2_found, fresh:()=>true} ] } ],

  battles:{
    /* riders on the ridge: road raiders come down on the wagons; the carters have the chains on */
    b8_c2_raid:{title:'The wagons on the Domin road', style:'b8_c2_road', open:true, warrenText:'Noon on the old Domin · wind off the north, dust, a long way to anywhere · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..#.....","........","........",".t.tt.t.","........","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_raider',2,1],['b8_raider',5,1],['b8_raider',4,0]], xp:150, after:'b8_c2_raid_after',
      preText:()=>`They come down off the ridge at a canter, wrapped to the eyes against the dust, with curved blades and no banner. Not soldiers. Men who were soldiers for somebody once, and have kept the horse.`},
    /* the town's square and its priest: the tithe refused; the second ground is the temple steps */
    b8_c2_town:{title:'The square', style:'b8_c2_town', warrenText:'Dusk in a Pannion town coming back · the air sweet, the wells deep · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........",".#....#.","........","........","..t..t..","........",".#....#.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_cultist',2,2],['b8_cultist',5,2],['b8_cultist',4,1]], xp:300, after:'b8_c2_town_after',
      preText:()=>`They come across the square without hurrying, the priest's people, smiling, with knives they have had a long time to sharpen. The town does not move to help them. It does not move to stop them either.`,
      stage2:{title:'The temple steps', xp:150,
        text:()=>`The square is the Fourth's. The priest has gone back up the temple steps, not running, and stands at the top of them in the dusk with his arms open, as if the caravan were late for something.\n\nThe air round him is thick and sweet. Every breath he lets out has a colour in it.${b82Say({ohl:`\n\nOhl puts his sleeve over his mouth. "Don't breathe what he breathes," he says. "I mean it. Don't."`, tuft:`\n\nTuft's hand is up. "That's not a warren," she says. "That's worse. Don't breathe it."`, _:''})}`,
        map:["###..###","##....##","#......#","........","..t..t..","........","#......#","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_kelykpriest',3,1],['b8_cultist',5,2]]} },
    /* the scarecrow fields: the drover walked into the rows after the song, and the field-tenders came for her. The scarecrows sing; they
       never fight (canon). pollen:true (140): the squad is −1 to hit for the first three rounds */
    b8_c2_fields:{title:'The green rows', style:'b8_c2_rowsb', dark:true, pollen:true, warrenText:'Dusk in the scarecrow fields · the singing, and the pollen in the air · warrens steady', warren:{meanas:1, denul:1}, music:'dark',
      map:[",,,,,,,,",",,,,,,,,",",#,,,,#,",",,,,,,,,",",,#,,#,,",",,,,,,,,",",,,,,,,,","..t..t..","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_fieldtender',2,1],['b8_fieldtender',5,1],['b8_fieldtender',4,3],['b8_cultist',3,0]], xp:200, after:'b8_c2_fields_after',
      preText:()=>`They come out of the rows bent low, in rag and sacking, with the long hooks they use on the green: the living who tend the fields. They do not shout. In the rows behind them the scarecrows go on singing, and the song gets in behind the eyes.`,
      stage2:{title:'Deeper in the rows', xp:100,
        text:()=>`The verge is behind the squad now, and the wagons, and the fire. Ahead, deeper in, a red scarf in the green, and someone standing very still beside a pole, listening to it.\n\nTwo more tenders are between her and you. The song is louder here.${b82Say({brisk:`\n\nBrisk hums something, loudly and badly, an old marching tune. "Can't hear it," she says, "if you're doing your own."`, kettle:`\n\nKettle has her fingers in her ears and a sharper in her teeth. She takes it out to say, "I'm not listening," and puts it back.`, _:''})}`,
        map:[",,,,,,,,",",,,,,,,,",",#,,,,#,",",,,,,,,,",",,,,,,,,",",,#,,#,,",",,,,,,,,",",,,,,,,,",",,,,,,,,",",,,,,,,,"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_fieldtender',2,2],['b8_fieldtender',5,2],['b8_cultist',4,1]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b8_c2_caravanmail:{name:'A coat of caravan mail', slot:'armour', role:'mail', who:null, ac:3, hp:2,
      line:'Riveted rings on a quilted backing, the merchant\'s, issued out of an iron-bound chest at the first halt to whoever stands nearest the wagons. It has been mended so often it is more mending than mail, and it holds. It smells of every guard who wore it before, none of whom, Calder says, ever complained.'},
    b8_c2_drovergoad:{name:'A drover\'s goad', slot:'weapon', role:'reach', who:null, atk:1, rng:1, reach:true, dmg:[1,8,2],
      line:'A long ash pole with an iron point and a hook behind it, worn black at the grip, for turning oxen that do not want to turn. Its owner walked into the scarecrow fields after the song and was brought out again. She gave it to the Fourth the next morning without a word, which in a drover is a speech.'} },

  scenes:{
    b8_c2_town:{loc:'The old Domin', sub:'A Pannion town coming back', cap:'A square of houses whitewashed again over the old soot, a well, people at their doors smiling, and a temple at the top of a flight of steps.', amb:'explore'},
    b8_c2_rows:{loc:'The old Domin', sub:'The scarecrow fields · night', cap:'The green rows in the dark, the shapes on their poles against the sky, and lanterns moving among them toward the road.', amb:'explore'} },

  end:{
    fields:['Fire in the rows', 'The merchant\'s caravan went east over the old Domin at winter\'s end, past a town coming back wrong and its priest, and halted beside the scarecrow fields. A drover walked into the rows after the song and was brought out. In the night the field-tenders brought kelyk to the last wagon, and the Fourth saw it, and burned it, the wagon\'s load and the field beside the road with it. Calder kept the guards\' fee. The rest of the fields went on singing.'],
    pass:['Good guards', 'The merchant\'s caravan went east over the old Domin at winter\'s end, past a town coming back wrong and its priest, and halted beside the scarecrow fields. A drover walked into the rows after the song and was brought out. In the night the field-tenders brought kelyk to the last wagon, and the Fourth saw it, and lashed the tarp down again, and took the pay. Good guards do not look in the wagons. The last wagon went on east, heavier.'] },
  endScene:'b8_road_east',
  endCap:()=> S.f.b8_c2_key === 'fields' ? 'The road east at first light, a line of smoke going up behind the wagons from the edge of the green, and the caravan one wagon lighter.' : 'The road east at first light, the wagons in a line, the last of them riding low on its axles.',
  tease:'Next: Black Coral, under a night that does not lift, and the barrow outside it heaped with gifts.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b8_vassoDone === 1 && f.b8_c2_vassoCame) x.push(b8In('vasso') ? 'Vasso, a Guild journeyman sent after the Fourth on the road, came into the firelight instead, and walks with the squad.' : 'Vasso, a Guild journeyman, came into the firelight at the first halt and joined the Fourth.');
    if (f.b8_vassoDone === 2 && f.b8_c2_vassoCame) x.push('Vasso, a Guild journeyman, rides with the wagons, if the squad will have him.');
    if (f.b8_vassoDone === 0 && f.b8_c2_vassoCame) x.push('Vasso, a Guild journeyman, walked back west toward the city alone.');
    if (f.b8_c2_raidSettled) x.push(f.b8_c2_raidDone ? 'Riders came down off a ridge on the Domin road, and went back up it fewer.' : f.b8_c2_raidFaced ? 'Riders on a ridge looked at the Fourth in the gap and thought better of it.' : 'Calder paid the riders on the ridge out of the merchant\'s purse.');
    if (f.b8_c2_brakeOk) x.push('The Fourth learned the carters\' brake: wagons chained wheel to wheel, and one gap left open.');
    if (f.b8_c2_townDone) x.push('A Pannion town coming back asked a tithe of one carter. The Fourth said no, and its priest went down on his own temple steps.');
    if (f.b8_c2_fieldsDone) x.push('A drover with a red scarf walked into the scarecrow fields after the song and was brought out again.');
    if (f.b8_c2_found) x.push('The merchant\'s last wagon carries kelyk east, to the pilgrims at Black Coral. Not to the city. The merchant is not a fool.');
    if (f.b8_c2_kelyk === 'burned') x.push('The Fourth burned the last wagon\'s kelyk, and a field of the green beside the road. Calder kept the fee.');
    if (f.b8_c2_kelyk === 'passed') x.push('The Fourth lashed the tarp down again, and took the pay.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b8_c2_kelyk === 'burned' && 'The last wagon\'s kelyk burned on the verge, and a field of the green with it. Calder kept the fee.',
    f.b8_c2_kelyk === 'passed' && 'The tarp lashed down again over the merchant\'s kelyk. Good guards do not look in the wagons.',
    f.b8_c2_calder && 'Calder said it: kelyk, east, to the camp at the barrow outside Black Coral, where the pilgrims pay. Never to the city.',
    f.b8_c2_found && 'The field-tenders brought jugs to the last wagon in the night. Kelyk, packed in straw.',
    f.b8_c2_fieldsDone && 'A drover walked into the scarecrow fields after the song, and the Fourth went in after her.',
    f.b8_c2_townDone && 'A Pannion town coming back, and a priest of the Dying God who asked a tithe of one carter.',
    f.b8_c2_backdoor && 'Calder\'s man went to a back door in the town with a crate, and came back with a heavier one.',
    f.b8_c2_wagonSeen && 'The last wagon in the ring has its tarp lashed down hard, and smells sweet.',
    'The Fourth, guarding a merchant\'s wagons east over the old Domin at winter\'s end.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the first halt ======== */
    b8_c2_start:()=>({sp:'The first halt', scene:'b8_caravan_night', fx:()=>{ S.f.b8_c2_ph = S.f.b8_c2_ph || 1; if (b82VassoPending()) S.f.b8_c2_vassoCame = 1; }, again:()=>'The caravan\'s ring, the fire, the dark beyond the wagons.', txt:
`The wagons are drawn up in a ring off the road, nose to tail, with the oxen and the horses inside it and the carters already asleep under the axles, the way carters sleep, as if the ground had been waiting for them all day. One fire, in the middle. Beyond the ring, the old Domin goes away flat and dark in every direction to the edge of the sky.

The city is half a day behind you, and it is already strange not to hear a bell.${b82If('kettle', `\n\nKettle has her boots off and her feet to the fire. "First night out," she says. "I'd forgotten how big it is. Out here. Everything."`)}${b82If('ohl', `\n\nOhl is sitting on a wagon's tailboard with his back to the dark. "Last time we came this way," he says, "it was on fire. I'll take dark."`)}${b82VassoPending() ? `\n\nBy the last tent, just inside the reach of the fire, a figure is standing who was not there a moment ago: young, in a dark quilted jack, with both his hands held out a little from his sides and open, so that the fire can find them.` : ''}`,
      ch:[b8ReadChoice(2),
          {t:'The young man by the last tent.', req:()=>b82VassoPending(), go:'b8_c2_vasso'},
          {t:'Walk the ring.', go:()=>startExplore()}]}),
    b8_c2_read:()=>b8ReadOffer(2),
    b8_c2_card:()=>b8ReadCard(2),

    /* Vasso (the recruit, on 'quiet'): sent after the Fourth on the road, where nobody hears, and come into the firelight instead */
    b8_c2_vasso:()=>{ const d = S.f.b8_vassoDone;
      if (d === 2) return {sp:'Vasso', scene:'b8_caravan_night', txt:
`Vasso is sitting on the tongue of the last-but-one wagon, out of the firelight, counting something under his breath. Out here there are no bells. He counts anyway. When he sees you he puts his hands where you can see them, out of habit.`,
        ch:[{t:'"Come to the fire, Vasso."', fx:()=>{ b8Join('vasso'); b82L('ohl', 1); }, go:'b8_c2_vasso_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A young man by the last tent', scene:'b8_caravan_night', again:()=>'The young man by the last tent, his hands open, waiting.', txt:
`He is twenty-odd, Gadrobi by the face, in a dark quilted jack with the Guild's cut to it and soft felt boots that were not made for the road and show it. A knife's hilt over his shoulder. Another at his hip. He has not touched either. He walks up to the fire slowly, keeping his hands out and open, and stops where everyone can see him.

"Malazans," he says. "The paper said Malazans. The Guild doesn't ask which." He looks at you. "I asked."

"Vasso. Journeyman. They gave me your paper after the alley, second on it, after the man you left on your eave. Then you burned yours and barred the door, and the city stopped talking, and they said: wait. They go east at winter's end, with wagons. Do it on the road. The road hears nothing."${b82If('brisk', `\n\nBrisk is on her feet, with the shield, between him and the fire. She has not drawn. She does not need to.`)}`,
        ch:[{t:'"And?"', go:'b8_c2_vasso_why'},
            {t:'"Who paid?"', go:'b8_c2_vasso_who'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c2_vasso_who:()=>({sp:'Vasso', scene:'b8_caravan_night', txt:
`"The knife never knows who paid," he says. "Nor his clan. Nor his master. A paper comes down from somewhere, and you go. That's the Guild." He shrugs, carefully, so as not to move his hands. "The go-between knows. Only him. And you'd have to find which go-between, and he'd have burned his papers by the time you knocked."

"Five strokes and your door. That's all it ever said." He looks back west, toward a city he cannot see from here. "There are other papers this winter. Old soldiers. I don't know whose."`,
      ch:[{t:'"Then why are you standing at our fire?"', go:'b8_c2_vasso_why'}]}),
    b8_c2_vasso_why:()=>({sp:'Vasso', scene:'b8_caravan_night', txt:
`"Because I'm not going to do it," he says. "I've known that since I read it. It took me until the gate to know what came after." He breathes out. "A journeyman who won't do his paper has one of his own by the next new moon. No journeyman gets out of the Guild. I thought I'd try being the first, and that the best place to try it was a long way east, beside the people the Guild has already failed to kill once."

"I know roofs. Lines, knots, which tiles hold. I know the bells." He looks out at the Domin, the whole flat dark size of it. "I've never been outside the walls before. There aren't any roofs. I'd like it noted that I'm not optimistic."${b82Say({kettle:`\n\nKettle looks him up and down. "He walked out after a caravan in roof-boots," she says. "That's either very brave or very stupid." She considers. "We've had both."`, ohl:`\n\nOhl, from the tailboard: "His feet are bleeding, Sergeant. Whatever you decide, let me see to them first."`, _:''})}`,
      ch:[{t:'"Then sit down at the fire, Vasso."', fx:()=>{ b8Join('vasso'); b82L('ohl', 1); }, go:'b8_c2_vasso_join'},
          {t:'"Ride with the wagons a while. We\'ll see."', fx:()=>{ S.f.b8_vassoDone = 2; }, go:'b8_c2_vasso_wait'},
          {t:'"Go back, Vasso. Tell them you couldn\'t find us."', fx:()=>{ S.f.b8_vassoDone = 0; b82L('kettle', -1); }, go:'b8_c2_vasso_home'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c2_vasso_join:()=>({sp:'Vasso', scene:'b8_caravan_night', txt:
`${b8In('vasso') ? `He sits, carefully, on the end of the tailboard, where he can see the dark and the fire both, and puts his hands on his knees.${b82If('ohl', ' Ohl kneels and gets his boots off him without asking, and says something unrepeatable about felt.')}

"Thank you, Sergeant," he says. Then, after a while, to the fire: "It's very quiet. In the city there's always a bell." He listens to the Domin. "I'll get used to it. I'd rather not have to."` : `He nods, and stays by the last tent. The squad is full, and a journeyman can count. "I'll ride with the wagons," he says. "When there's room."`}`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),
    b8_c2_vasso_wait:()=>({sp:'Vasso', scene:'b8_caravan_night', txt:
`He nods, slowly, as if that were more than he had come expecting, and goes and sits on the tongue of the last-but-one wagon, out of the firelight, facing the dark.

"I'll be here," he says. "There's a lot of here."`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),
    b8_c2_vasso_home:()=>({sp:'Vasso', scene:'b8_caravan_night', txt:
`He looks at you, and then at the road west, which is a paler line in the dark going back the way he came.

"Couldn't find you," he says. "Yes, Sergeant." He goes off down it on foot, in his roof-boots, keeping to the middle of the road. The dark has him in a few paces. Out here there are no walls to keep away from.`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),

    /* Calder: the merchant's man; the job; the merchant's mail */
    b8_c2_calder:()=>({sp:'Calder', scene:'b8_caravan_night', fx:()=>{ if (!S.f.b8_c2_calderMet) { S.f.b8_c2_calderMet = 1; gain('b8_c2_caravanmail'); } }, again:()=>'Calder, at his wagon, with the ledger.', txt:
`Calder is a thin Daru in a road coat the colour of the road, with a ledger under his arm that he writes in by the fire every night and lets nobody read. He is the merchant's man: he hires and pays and settles the tolls and says where the wagons stop. He has done this road before, he says. Twice.

${S.f.b8_c2_calderMet ? `He nods at you over the ledger, and goes on writing.` : `"The mail," he says, and nods at an iron-bound chest on his tailboard, open. "The merchant's. One coat for whoever stands nearest the wagons. It's been mended more often than it's been hit, and a merchant likes his mail that way." He watches it go into the kit. "Bring it back at Black Coral. I write everything down."`}`,
      ch:[{t:'"What\'s in the wagons, Calder?"', go:'b8_c2_calder_job'},
          {t:'"Tell me about the road."', go:'b8_c2_calder_road'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c2_calder_job:()=>({sp:'Calder', scene:'b8_caravan_night', txt:
`"Daru glass," he says. "Lamp oil, which they'll want, living in the dark. Bolt cloth. Needles. Salt. The things a new city has never got enough of." He turns a page. "One merchant's money, Sergeant, not the Council's. The Council hasn't made its mind up about Black Coral. The merchant has. He thinks it's a market, and he'd like to be first in it."

"And the last wagon?" You did not ask it. He answers it anyway. "The last wagon is the merchant's own business." He writes something down. "You're paid to keep things off the wagons. Not to look in them."${b82If('vasso', `\n\nVasso, at your shoulder, very quietly: "He answered a question nobody asked. On the roofs, that's the one you write down."`)}`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),
    b8_c2_calder_road:()=>({sp:'Calder', scene:'b8_caravan_night', txt:
`"East, over the old Domin, weeks of it, to the coast and Black Coral." He does not look up. "Bad road, after the Seer. Better than it was. The towns are coming back. People came home and whitewashed over the soot and the priests came back with them." He pauses. "New priests. Of a new god. Sweet-natured people, mostly. They'll sell you water."

"Riders, sometimes. Deserters from somebody's war, who kept the horse." He closes the ledger. "And the fields. You'll smell them before you see them. Keep your people on the road when we pass the fields, Sergeant. Whatever they hear."${b82If('brisk', `\n\nBrisk: "Hear?"`)}`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),
    b8_c2_carters:()=>({sp:'The carters', scene:'b8_caravan_night', fx:()=>{ S.f.b8_c2_carters = 1; }, again:()=>'The carters at the horse lines, seeing to the oxen.', txt:
`Three carters are at the horse lines with a lantern, seeing to an ox that has a stone in its hoof and opinions about it. There is a drover among them, a broad woman with a red scarf over her hair and a goad as long as she is, who talks to the ox the whole time, low, and the ox listens.

"Glass," one of the carters says, when you ask what they are hauling. "Oil. The usual." He nods down the ring toward the last wagon. "Not that one. That one's Calder's man's, and he sleeps under it, and he doesn't drink with us." He spits. "Pays the same, mind."`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),

    /* the last wagon, by phase: the tarp and the smell (1); the fields' night (5, the loading, then the open wagon) */
    b8_c2_wagon:()=>{ const ph = b82Ph();
      if (ph === 5 && !S.f.b8_c2_found) return DLG.b8_c2_loading();
      if (S.f.b8_c2_found) return {sp:'The last wagon', scene:'b8_c2_rows', again:()=>'The last wagon, its tarp thrown back.', txt:
`The last wagon, with ${S.f.b8_c2_kelyk === 'burned' ? 'its bed scorched black and empty, and the tarp gone to ash, and the smell of burnt sugar over everything' : S.f.b8_c2_kelyk === 'passed' ? 'its tarp lashed down again over the straw and the jugs, hard, the way it was' : 'its tarp thrown back on the straw and the jugs, row on row, and the sweet smell coming off it into the night'}.`,
        ch:[{t:'Back to the verge.', go:()=>startExplore()}]};
      if (ph >= 2) return {sp:'The last wagon', scene:b82Ph() >= 4 ? 'b8_caravan_night' : 'b8_road_east', txt:
`The last wagon, riding low on its axles, with its tarp lashed down hard and Calder's man walking beside it. He looks at you. You look at the wagon. Neither of you mentions it.`,
        ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'The last wagon', scene:'b8_caravan_night', fx:()=>{ S.f.b8_c2_wagonSeen = 1; }, again:()=>'The last wagon, the tarp, the sleeper under it, the smell.', txt:
`The last wagon in the ring stands a little apart, with its tarp lashed down hard over the bed and roped at every corner, the knots tarred. It rides lower on its axles than a wagon of cloth and glass should. A man is asleep under it on a blanket, Calder's man, with a club by his hand and his boots on.

And there is a smell. Faint, under the oxen and the woodsmoke: sweet. Fruit gone over. Something under the fruit that the nose does not want to go looking for.${b82If('ohl', `\n\nOhl has stopped beside you. He sniffs once, and his face goes still. "I know that," he says. "I'd rather not."`)}`,
        ch:[{t:'Lift a corner of the tarp, without waking him.', check:['guile', 15], req:()=>!S.f.b8_c2_peekTried,
            edges:id=>[id === 'vasso' && ['six years of not being heard on a roof', 2], id === 'ellis' && ['the Claw taught her to open things quietly', 2], id === 'vell' && ['he knows a tarred knot when he sees one', 2], id === 'tuft' && ['Meanas: the dark under a wagon is hers', 1], id === 'sgt' && ['you have searched a wagon or two in your time', 1], id === 'brisk' && ['mail creaks', -1], id === 'brannoc' && ['a Falari cannot be quiet', -2]],
            near:{t:()=>`Yes, but the knot will not give for a long breath, and ${b82Nm(b82Who())} ${b82V(b82Who(), 'are', 'is')} still kneeling there with ${b82V(b82Who(), 'your', 'a')} hand under the tarp when the sleeper turns over and mutters. ${b82Nmc(b82Who())} ${b82V(b82Who(), 'come', 'comes')} away from it rattled.`, fx:()=>b82Rattle(b82Who())},
            fx:()=>{ S.f.b8_c2_peekTried = 1; }, go:'b8_c2_wagon_peek', fail:'b8_c2_wagon_woke'},
          {t:'Leave it. You\'re paid to keep things off the wagons.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c2_wagon_peek:()=>({sp:'The last wagon', scene:'b8_caravan_night', fx:()=>{ S.f.b8_c2_peek = 1; }, txt:
`The corner comes up a hand's breadth. Under it: straw, packed tight, and in the straw the necks of clay jugs, stoppered and waxed, a row of them, and behind that row another, and behind that one the dark.

Not glass. Not oil. The smell comes up out of the straw, thick, and the corner goes back down, and the knot goes back the way it was. The sleeper sleeps.${b82If('ohl', `\n\nOhl, very quietly, walking back to the fire beside you: "Jugs," he says. "In straw. Sweet." He does not say the word. Neither do you.`)}`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),
    b8_c2_wagon_woke:()=>({sp:'The last wagon', scene:'b8_caravan_night', txt:
`The sleeper is not asleep. He sits up with the club in his hand before the knot is half loose and looks at whoever is crouched by his wheel.

"Merchant's goods," he says. "Off." He does not shout. He does not need to; Calder is already looking over from the fire, with the ledger shut on one finger. In the morning the knots on the tarp have been tied again, differently.`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),
    b8_c2_camp_east:()=>({sp:'The road east', scene:'b8_caravan_night', txt:
`East, past the last wagon, the road goes on into the dark, a paler line on the dark ground, and then not even that. Weeks of it. In the morning.`,
      ch:[{t:'Back to the ring.', go:()=>startExplore()}]}),

    /* the fire: the caravan's fire, by phase (the first halt; the halt beside the fields). The games pass wraps this node: keep the id */
    b8_c2_fire:()=>{ const ph = b82Ph(), rk = 'b8_c2_rest' + ph;
      const way = ph === 1 ? (!b82VassoPending() ? {t:'Sleep. In the morning, the road east.', onward:true, fx:()=>{ S.f.b8_c2_ph = 2; }, go:'b8_c2_morning'} : null)
        : ph === 4 ? (S.f.b8_c2_fieldsDone ? {t:'Sit up with the watch, and look at the rows.', onward:true, fx:()=>{ S.f.b8_c2_ph = 5; }, go:'b8_c2_night'} : null)
        : ph === 5 ? (b82KeyOpen() ? {t:'The last wagon. Decide.', go:'b8_c2_key'} : null)
        : ph === 6 ? {t:'On east, at first light.', onward:true, go:'b8_c2_onward'} : null;
      return {sp:'The caravan\'s fire', scene:'b8_caravan_night', html:contractHTML(),
        again:()=>'The caravan\'s fire, the wagons in a ring, the dark beyond.', txt:
`${ph === 1 ? `The fire in the middle of the ring, the carters snoring under their axles, and out beyond the wagons the whole of the old Domin lying flat and dark under more stars than the city has ever let anyone see.` : ph <= 3 ? `The caravan's fire, the wagons drawn up round it, the road outside.` : ph === 4 ? `The fire on the verge, the wagons drawn up along the road, and to the north the green rows going away into the dusk, and the song coming out of them, very faint, never stopping.${S.f.b8_c2_fieldsDone ? ' The drover with the red scarf is sitting by the fire with a blanket round her, awake.' : ''}` : ph === 5 ? `The fire burned low on the verge. The song goes on in the rows. ${S.f.b8_c2_found ? 'Behind it, at the end of the line, the last wagon stands with its tarp thrown back, and everybody at the fire is very carefully not looking at it, or at Calder.' : 'Out in the rows, lanterns are moving.'}` : `The last of the night on the verge. ${S.f.b8_c2_kelyk === 'burned' ? 'The smell of burnt sugar is still in everything, and the rows nearest the road are black stubble, and quiet.' : 'The last wagon is lashed down again, and the song goes on in the rows.'}`}${b82Say({kettle:`\n\nKettle is counting the munitions again, by firelight.`, ohl:`\n\nOhl is boiling water, because Ohl always is.`, _:''})}`,
        ch:[...(ph === 1 ? [b8ReadChoice(2)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>ph >= 4 && !S.f[rk], fx:()=>{ S.f[rk] = 1; rest('The Fourth sits an hour by the caravan\'s fire. Wounds close, mostly. Whatever the rows put in the blood goes out of it.'); }, go:'b8_c2_fire_rest'},
            {t:'Talk with the squad.', go:'b8_c2_fire_talk'},
            ...(way ? [way] : []),
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c2_fire_rest:()=>({sp:'The caravan\'s fire', scene:'b8_caravan_night', txt:
`An hour, then, by the fire on the verge, with the song in the rows and the wagons at your backs.

${b82Say({ohl:`Ohl goes round the squad with hot water and his hands. "Hook cuts," he says. "From a farm tool. In a field. At my age." He looks at the rows. "Wash them twice. Whatever's on those hooks grew out there."`, ressa:`Ressa goes round the squad with hot water. "Wash them twice," she says of the hook cuts. "I've seen what grows in a fever."`, _:'The squad sees to its own cuts, and washes them twice, because of where the hooks have been.'})}${b82If('brisk', `\n\nBrisk sleeps sitting up, facing the rows.`)}${b82If('vasso', `\n\nVasso does not sleep. He sits with his back to a wheel and counts the stars, because there are no bells.`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c2_fire'}]}),
    b8_c2_fire_talk:()=>{ const late = b82Ph() >= 4, ln = [];
      if (b8In('brisk')) ln.push(late ? `Brisk is facing the rows with the shield against her knee. "I marched through this country once with the Host," she says. "It was burning, and the Seer's own people had lit it. I thought that was as bad as it could get." She touches two fingers to her brow, toward the poles. "Hood's got a lot of them out there, standing up. He'll want them lying down."` : `Brisk has the shield off for once, leaning on a wheel. "East," she says. "Last time it was east too." She looks at the dark. "It's quieter. I don't trust quieter."`);
      if (b8In('kettle')) ln.push(late ? `Kettle has a burner in her lap and is looking at the green rows. "I could," she says. "One burner. It's all dry stalk under the green. It'd go like the Seer's towns went." She puts it away. "Not my wagons, though. Not my say."` : `Kettle is counting under her breath. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," she says. "Out here, nobody to sell me more for weeks." She looks at the dark. "I'll be careful. I'm always careful. You just never see it."`);
      if (b8In('tuft')) ln.push(late ? `Tuft has her back to the rows and the Deck in her lap, unopened. "The song," she says. "It isn't a warren. It's older than that, or newer." She shivers. "There's a god at the bottom of it, and he's dying, and he likes company."` : `Tuft is looking east, toward the coast, toward Coral under its other name. "We'll see the barrow again," she says. "The one we saw go up." She puts the Deck away. "I'd like to see it. I think."`);
      if (b8In('ohl')) ln.push(late ? `Ohl has the oilcloth list on his knee, and is not reading it. "Kelyk," he says at last. He says it like a fever's name. "The pilgrims drink it, and stop being afraid, and then stop. I've no salve for stopping."` : `Ohl is warming his hands. "I've been on this road with Hood walking beside me," he says. "He was very busy, then." He drinks his tea. "He's quieter now. I'd like to keep him that way."`);
      if (b8In('sohra')) ln.push(late ? `Sohra will not face the rows. "The spirits out there are not resting," she says. "They are being kept. Fed on." She throws her bones into the fire and does not look at how they fall. "Someone should let them go."` : `Sohra is sitting with the horses, as she always does in a camp. "Open country," she says, and smiles, which she does not do in the city. "The bones are glad. So am I."`);
      if (b8In('greysword')) ln.push(late ? `Dannet sits with the grey shield across her lap, facing north. "The Pannion used Capustan's dead too," she says. She grips the rim. "This is the same hunger. It has only learned to farm."` : `Dannet stands at the edge of the ring, looking east. "Capustan is behind us," she says. "And Coral ahead. I did not think I would walk this road again." She does not sound sorry.`);
      if (b8In('ellis')) ln.push(late ? `Ellis is watching the lanterns in the rows, which nobody else has seen yet. "There's work going on out there at night," she says. "Not singing. Carrying." She does not take her eyes off them.` : `Ellis is sitting where she can see the whole ring and the road both. "Calder's man sleeps under his wagon with a club," she says. "Guards don't. Owners do."`);
      if (b8In('vell')) ln.push(late ? `Vell is sitting under a wagon, which is the nearest thing to a roof out here. "No lines," he says. "No chimneys. Nowhere to go up to." He listens to the song and puts his hands over his ears. "I don't like this country, Sergeant."` : `Vell is tying knots in nothing. "Calder's man's knots on that tarp are tarred," he says. "That's not for rain. That's so you know if somebody's been at them."`);
      if (b8In('brannoc')) ln.push(late ? `Brannoc is talking, loudly, about Falar, and boats, and how in Falar a field is something you keep cows in. The squad lets him. It is louder than the song.` : `Brannoc is telling the carters about Falar, where the roads are all water and nobody has ever been robbed by a man on a horse. The carters are enjoying it more than they let on.`);
      if (b8In('ressa')) ln.push(late ? `Ressa is boiling every cloth the squad owns. "Whatever's on those hooks," she says, "is what's in the green. I'm not having it in a cut."` : `Ressa has her hands round a cup. "No temples out here," she says. "No bells." She seems to find that a relief.`);
      if (b8In('vasso')) ln.push(late ? `Vasso has his hands round his knees and his back to a wheel. "In the city," he says, "the Guild says kelyk never comes in. That it isn't worth the trouble." He looks at the last wagon. "I always thought that meant somebody had tried."` : `Vasso is sitting with his back to a wheel and his face to the dark. "There's nothing to stand under," he says. "Nothing to stand behind. How do you know where anybody is?" He listens. "Oh. You can hear them coming. That's the trick."`);
      if (b82Benna()) ln.push(`Old Benna is at the laundry wagon with her tubs, washing the carters' shirts by lantern-light for a copper apiece and complaining about the water. "Read for you later," she says, without looking round. "If you've the copper. Reading's extra."`);
      return {sp:'The caravan\'s fire', scene:'b8_caravan_night', txt:ln.length ? ln.join('\n\n') : `The fire, the wagons, the dark. You sit with it a while. It is a great deal of dark.`,
        ch:[{t:'Back to the fire.', go:'b8_c2_fire'}]}; },
    b8_c2_morning:()=>({sp:'The road east', scene:'b8_road_east', txt:
`Morning on the old Domin. The wagons go out of their ring and into a line, and the oxen lean into it, and the road goes east in front of them, a pale rutted track over a country that is flat and grey and very wide, with the hills of home shrinking behind.

The days go by like that. Dust, wind off the north, the creak of axles, the same horizon every evening, a little further on.${b8In('vasso') ? ` Vasso walks beside the lead wagon the first day, looking at the sky as if somebody had only now told him how much of it there is.` : ''}`,
      ch:[{t:'On, east.', go:()=>{ startExplore('b8_c2_road'); talk('b8_c2_road_arrive'); }}]}),

    /* ======== phase 2: the road east ======== */
    b8_c2_road_arrive:()=>({sp:'The old Domin', scene:'b8_road_east', again:()=>'The road east, the wagons in a line, the grey country.', txt:
`Years ago the Fourth crossed this country with the Host, and it was burning. The Seer's own people had lit it ahead of the army: farms, orchards, towns, everything that would burn, so that the Host would find nothing.

It is not burning now. It is grey. The field walls are down and nobody has put them up. The orchards are stumps. Here and there a farm has a new roof on an old shell, and smoke from its chimney, and a face at its door that watches the wagons go by and does not wave.

On the ridge to the north, against the sky, there are riders. They have been there since noon.${b82If('brisk', `\n\nBrisk has seen them. "Six," she says. "Maybe eight. Waiting for the road to bend."`)}`,
      ch:[{t:'Walk the line.', go:()=>startExplore()}]}),
    b8_c2_road_west:()=>({sp:'The road west', scene:'b8_road_east', txt:
`West, the road goes back the way the wagons came, all the way to the city, weeks of it. Somewhere at the end of it there is a door with a bar across it and a paper that wants time to cool. It will keep.`,
      ch:[{t:'Back to the wagons.', go:()=>startExplore()}]}),
    b8_c2_road_calder:()=>({sp:'Calder', scene:'b8_road_east', fx:()=>{ S.f.b8_c2_roadCalder = 1; }, again:()=>'Calder, walking his horse beside the line.', txt:
`Calder is walking his horse beside the line, with the ledger open on the saddle. "Riders," he says, before you ask. "They'll want a toll. If they're the sort who'll take one, I'll pay it out of the merchant's purse and write it down. If they're the other sort, that's what you're for."

He nods at the lead wagon, where the carters are already lifting something heavy and iron out of the bed. "My carters will chain up. They've done it before." He closes the ledger. "Stand in the gap they leave. That's all I'll ask."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    /* the riders on the ridge: an optional fight, faced down, or paid off out of the merchant's purse */
    b8_c2_riders:()=>({sp:'Riders on the ridge', scene:'b8_road_east', fx:()=>{ S.f.b8_c2_ridersSeen = 1; }, again:()=>'The riders on the ridge, still there, still waiting.', txt:
`They have come down off the ridge to where the road bends under it, eight of them, wrapped to the eyes against the dust, on horses that have been fed better than they have. Curved blades. No banner. One of them walks his horse forward on his own, and stops a long spear's length short of the lead wagon, and looks at the chains, and then at the Fourth standing in the gap.

"Toll," he says, in bad Daru. "For the road." He smiles behind the wrappings; you can see it in his eyes. "Or not for the road. As you like."${b82If('vasso', `\n\nVasso, beside you, has gone very still. "They're like bravos," he says, under his breath. "Only with horses."`)}`,
      ch:[{t:'"There\'s your toll." Step out of the gap at them.', onward:true, go:()=>startBattle('b8_c2_raid', {})},
          {t:'Stand in the gap and let them look at you until they work it out.', check:['might', 16], req:()=>!S.f.b8_c2_faceTried,
            edges:id=>[id === 'brisk' && ['she fills a gap, and they can see her do it', 3], id === 'greysword' && ['a Grey Sword in a gap is a wall', 2], id === 'brannoc' && ['he is large and cheerful about it', 1], id === 'sgt' && ['you held gaps on this road before', 1], trickBy('b8_c2_brake') === id && ['the carters\' brake: the chain is on, and the gap is narrow', 2], id === 'vasso' && ['he has never stood in front of a horse', -2], id === 'tuft' && ['she looks nineteen still', -1]],
            near:{t:()=>`Yes, but the one in front rides close enough to put his horse's shoulder into ${b82Nm(b82Who())} before he turns away, and ${b82Nm(b82Who())} ${b82V(b82Who(), 'take', 'takes')} it and ${b82V(b82Who(), 'stand', 'stands')}. ${b82Nmc(b82Who())}'ll be stiff with it in the next fight.`, fx:()=>bruise(b82Who(), bruiseN())},
            fx:()=>{ S.f.b8_c2_faceTried = 1; }, go:'b8_c2_riders_faced', fail:'b8_c2_riders_row'},
          {t:'Let Calder pay them out of the merchant\'s purse.', go:'b8_c2_riders_paid'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c2_riders_faced:()=>({sp:'Riders on the ridge', scene:'b8_road_east', fx:()=>{ S.f.b8_c2_raidSettled = 1; S.f.b8_c2_raidFaced = 1; }, txt:
`He looks at the gap a while: at who is standing in it, and how, and at the chain run wheel to wheel on either side. He works out what it would cost to come through. He works it out twice, to be sure.

Then he laughs, not unkindly, and says something to his friends in a language that is not Daru, and they turn their horses and go back up the ridge at a walk, and over it, and are gone.${b82Say({brisk:`\n\n"Old," Brisk says, after them. "That's what they were looking at. Old." She does not lower the shield until the dust is down.`, _:`\n\nNobody lowers anything until the dust is down.`})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b8_c2_riders_row:()=>({sp:'Riders on the ridge', scene:'b8_road_east', txt:
`He looks at the gap, and decides it is narrower than it is old. He says one word over his shoulder, and the curved blades come out all along the road together.`,
      ch:[{t:'Hold the gap.', go:()=>startBattle('b8_c2_raid', {})}]}),
    b8_c2_riders_paid:()=>({sp:'Calder', scene:'b8_road_east', fx:()=>{ S.f.b8_c2_raidSettled = 1; S.f.b8_c2_raidPaid = 1; }, txt:
`Calder rides forward with a purse, the merchant's, and counts silver into the rider's glove one coin at a time, slowly, so that everybody can see how much and no more. Then he opens the ledger on his saddle and writes it down, there in the road, with the rider watching.

The rider laughs at that, and takes the silver, and goes back up the ridge with his friends. "Cheaper than a guard's funeral," Calder says, shutting the ledger. "The merchant pays for those too." He looks at you. "Next time, maybe, you'll earn it."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b8_c2_raid_after:()=>({sp:'The Domin road', scene:'b8_road_east', fx:()=>{ S.f.b8_c2_raidSettled = 1; S.f.b8_c2_raidDone = 1; }, txt:
`The riders who can still ride go back up the ridge, and over it, and leave the road to the wagons and the dust. Two horses stand about in the road with empty saddles, looking embarrassed. The carters catch them, and Calder writes them down.

${b82Say({kettle:`Kettle is picking a curved blade up off the road. "Seven Cities steel," she says. "Some war a long way off." She drops it. "Not anyone's now."`, ohl:`Ohl is going from man to man with his satchel, theirs as well as ours. "They'll ride," he says, of the ones who can. "Not today."`, _:'The road is quiet again. It is a road that has seen worse.'})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    /* the lead wagon and the chains: the trick */
    b8_c2_brake:()=>({sp:'The lead wagon', scene:'b8_road_east', fx:()=>{ S.f.b8_c2_brakeSeen = 1; }, again:()=>S.f.b8_c2_brakeOk ? 'The carters\' chains, coiled in the lead wagon\'s bed. The Fourth knows how they go now.' : 'The carters\' chains, and the wagons nose to tail along the road.', txt:
`The carters have run the wagons up nose to tail along the road, fast, like people doing a thing they have done before and did not like, and are getting the chains out of the lead wagon's bed: heavy iron, a long run of it, with a hook at every few links. One wheel to the next. Then the next. They leave a single gap, at the bend, the width of two people standing.

You have stood in a gap like this. Years ago, on this same grey country, beside the Host's quartermaster's wagons, with the Seer's peasants coming at you across the fields in their thousands. The quartermaster's carters chained up exactly like this, and swore exactly like this, and the gap held.${b82If('brisk', `\n\nBrisk is already looking at the gap. "Two wide," she says. "That's mine."`)}${b82If('greysword', `\n\nDannet nods at the chain. "Capustan's carters did this in the streets," she says. "With carts. Against the Tenescowri."`)}`,
      ch:[{t:'Learn the brake: the order of the wheels, the hooks, the gap and who stands in it.', check:['wits', 17], trick:'b8_c2_brake', req:()=>!S.f.b8_c2_brakeTried, fx:()=>{ S.f.b8_c2_brakeTried = 1; },
            edges:id=>[id === 'brisk' && ['shields and gaps: she has held both on this road', 2], id === 'greysword' && ['the Grey Swords held Capustan\'s streets behind carts', 2], trickBy('line') === id && ['the Line: shields rim to rim, the same idea in iron', 2], id === 'sgt' && ['you marched this country beside the Host\'s wagons', 1], id === 'kettle' && ['she counts links the way she counts munitions', 1], id === 'sohra' && ['she knows how a horse sees a chained wagon', 1], id === 'vasso' && ['he has never been outside the walls', -1], id === 'vell' && ['chains are not lines', -1]],
            near:{t:()=>`Yes, but a hook skips its link as the chain runs, and the iron comes down across ${b82Nm(b82Who())}'s forearm on the way. ${b82Nmc(b82Who())}'ll feel it in the next fight.`, fx:()=>bruise(b82Who(), bruiseN())},
            go:'b8_c2_brake_ok', fail:'b8_c2_brake_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c2_brake_ok:()=>({sp:'The lead wagon', scene:'b8_road_east', fx:()=>{ S.f.b8_c2_brakeOk = 1; }, txt:
`By the time the dust has settled ${by({sgt:'you have', brisk:'Brisk has', greysword:'Dannet has', kettle:'Kettle has', _:'{who} has'})} been down the chain with the oldest of the carters, wheel by wheel, and back: which wagon goes first and which last, which hook takes the weight, how the gap is set at a bend so that nobody can ride round it, and how many stand in it. Two. Never three.

"You've done this," the old carter says. It is not a question. It is a thing the Fourth will remember the next time it is standing close with somebody coming at it, and needs the next squadmate along to close up.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b8_c2_brake_no:()=>({sp:'The lead wagon', scene:'b8_road_east', txt:
`The chain goes on wheel to wheel too fast to follow, and the carters swear at each other in a Daru so old it is nearly Gadrobi, and the hooks go into links that look exactly like the links they did not go into. It was simpler with the Host. The Host had a quartermaster who shouted.

The chain holds anyway. It does not need you to understand it.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b8_c2_to_town:()=>({sp:'The road east', scene:'b8_road_east', txt:
`East, the road goes on over the grey country, and in the late afternoon there is a town on it: walls, roofs, a temple's dome, and white, very white, in the low sun. Calder says it has a well. He says it once, and leaves it there.${S.f.b8_c2_ridersSeen && !S.f.b8_c2_raidSettled ? '\n\nThe riders are still on the ridge behind, watching the wagons go.' : ''}`,
      ch:[{t:'On to the town.', onward:true, fx:()=>{ S.f.b8_c2_ph = Math.max(3, S.f.b8_c2_ph || 1); }, go:()=>{ startExplore('b8_c2_town'); if (!S.f.b8_c2_townSeen) talk('b8_c2_town_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 3: the town coming back ======== */
    b8_c2_town_arrive:()=>({sp:'A town coming back', scene:'b8_c2_town', fx:()=>{ S.f.b8_c2_townSeen = 1; }, again:()=>'The town, the whitewash, the smiling doors.', txt:
`The town is white. Every wall in it has been whitewashed, and recently, and the soot from the burning years ago comes through the whitewash in grey ghosts, the shapes of flames climbing the walls under the paint. People have come back to live in it. They are at their doors as the wagons come in, all of them, and they are smiling.

Not at anything. Only smiling, slowly, like people who have stopped being frightened. The air smells sweet.

In the square, round a well, the caravan halts. At the top of the temple's steps a priest in a pale robe has come out to stand in the dusk, with his hands folded, watching the wagons come in like a farmer watching rain.${b82If('greysword', `\n\nDannet's hand has gone to her sword. "The Seer's priests used to stand like that," she says. "Before."`)}${b82If('vasso', `\n\nVasso has stopped dead in the square. "Everybody's smiling," he says. "In the Gadrobi, if everybody's smiling, it's because the Guild's in the street."`)}`,
      ch:[{t:'Walk the square.', go:()=>startExplore()}]}),
    b8_c2_town_back:()=>({sp:'The town gate', scene:'b8_c2_town', txt:
`West, the road goes back out of the town the way the wagons came in. The wagons are in the square, and Calder is not moving them until they have been watered.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b8_c2_townwoman:()=>({sp:'A woman by the well', scene:'b8_c2_town', fx:()=>{ S.f.b8_c2_townwoman = 1; }, again:()=>'The woman by the well, still smiling.', txt:
`A woman is sitting on the well's step with a clay cup in her lap. She is thin, and her hands are stained dark to the wrist, and she smiles up at the Fourth the whole time, from very far away.

"Water," she says, when you ask. "The well's good. The god gave it back." She lifts the cup a little; it is not water in it. It is dark and thick and it smells of fruit gone over. "This is better," she says. "This is the god's. You stop being afraid."

She drinks, and her smile goes a little further away. "We were all afraid, before. When the Seer burned us." She does not seem to remember that you were here then, on the other side. "Now we're not."${b82If('ohl', `\n\nOhl crouches in front of her and looks at her eyes, the way he looks at a fever, and stands up again. He keeps quiet, which in Ohl is the worst thing he can say.`)}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b8_c2_well:()=>({sp:'The well', scene:'b8_c2_town', txt:
`The well is deep and the water in it is clean and cold, which surprises everyone. The carters fill the barrels. Round the well's step there are clay cups, a great many, set out in a ring for whoever comes, and every one of them has a dark ring dried in the bottom and smells sweet.

Nobody in the caravan drinks from the cups. Calder made sure of that at the gate, in a voice nobody argued with.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b8_c2_backdoor:()=>({sp:'A back door', scene:'b8_c2_town', fx:()=>{ S.f.b8_c2_backdoor = 1; }, txt:
`Off the square, down a lane, Calder's man is at a back door of the temple with a small crate on his shoulder. The door opens before he knocks. A hand inside, in a pale sleeve, takes the crate, and gives him back another, and the second one is plainly heavier, because he staggers with it.

Then the door shuts and he comes back up the lane, and sees you, and does not stop. He puts the crate in the last wagon, under the tarp, and ties the tarp down again with the tarred knots, and sits on the tailboard and looks at nothing.${b82If('ellis', `\n\nEllis has watched all of it. "Silver going in," she says. "Something coming out. That's a market."`)}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    /* the priest and the tithe: the main fight */
    b8_c2_priest:()=>({sp:'The priest', scene:'b8_c2_town', again:()=>'The priest on the temple steps, smiling, waiting.', txt:
`The priest comes down the temple steps to meet the caravan at the well. Up close he is young, and smooth-faced, and his smile is the town's smile, slow and very far away. His robe is pale, and down the front of it there are dark stains like a wine-taster's.

"Welcome," he says. "The god is generous to travellers. Water, for your beasts. Rest, if you want it." He looks along the line of carters as if he were counting. "And a tithe, as the god asks of every road that crosses his country. One. Only one, to stay with us." He smiles at the youngest of the carters, a boy holding an ox's halter, who has gone white. "He will be so happy here. He will never be afraid again."

Calder has gone the colour of his ledger. Behind the priest, round the square, the smiling people have begun, very slowly, to walk toward the wagons.${b82Say({brisk:`\n\nBrisk steps in front of the carter boy, and puts her shield up. "No," she says. That is all of it.`, ohl:`\n\nOhl says, quite gently, "No," and steps in front of the carter boy.`, _:`\n\nYou step in front of the carter boy.`})}`,
      ch:[{t:'"No tithe." Shields up.', go:()=>startBattle('b8_c2_town', {})},
          {t:'Round the square by the lanes while he talks, and come at his people from behind the well.', check:['guile', 15],
            edges:id=>[id === 'vasso' && ['he knows how to be in a crowd and not be seen in it', 2], id === 'ellis' && ['Claw-trained', 2], id === 'tuft' && ['Meanas: the dusk in a lane is hers', 2], id === 'vell' && ['lanes are just low roofs', 1], id === 'sgt' && ['you have done this in Pannion towns before', 1], id === 'brisk' && ['she is the one standing in front of the boy', -2], id === 'greysword' && ['the Grey Swords do not go round', -1]],
            near:{t:()=>`Yes, but the lane is full of cups, a hundred of them set out on doorsteps, and ${b82Nm(b82Who())} ${b82V(b82Who(), 'kick', 'kicks')} one going round the corner and ${b82V(b82Who(), 'go', 'goes')} down on the cobbles in the sweet dark muck of it. ${b82Nmc(b82Who())}'ll feel the knee in the fight.`, fx:()=>bruise(b82Who(), bruiseN())},
            go:()=>startBattle('b8_c2_town', nearMiss() ? {} : {surprise:'p'}), fail:'b8_c2_priest_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c2_priest_seen:()=>({sp:'The square', scene:'b8_c2_town', txt:
`The priest turns his head, slowly, to the lane, and smiles at whoever is in it. "There's no need to hide," he says. "There's nothing here to be afraid of." Round the square his people take out their knives.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c2_town', {surprise:'e'})}]}),
    b8_c2_town_after:()=>({sp:'The temple steps', scene:'b8_c2_town', fx:()=>{ S.f.b8_c2_townDone = 1; }, txt:
`The priest went down on his own temple steps, in the end, and lies there with his robe spread round him, and the sweet smell coming off it into the dusk. His people who can walk have walked, back to their doors, and stand in them again, and smile.

The town does not come to the priest. It does not thank the Fourth either. The carter boy is still holding his ox, very tight, and shaking, and alive.${b82Say({ohl:`\n\nOhl kneels by the boy. "You're all right," he says. "You're not staying anywhere. You're coming with us." The boy nods, and goes on nodding.`, kettle:`\n\nKettle takes the ox's halter from the carter boy, gently, before he strangles the poor beast with it. "There," she says. "You're coming with us."`, _:''})}

Calder is already moving the wagons. "Out," he says. "Out of this town before dark. Water's in." He keeps his back to the temple, and to the last wagon.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b8_c2_temple:()=>({sp:'The temple', scene:'b8_c2_town', again:()=>'The temple steps, and the doors at the top of them.', txt:S.f.b8_c2_townDone ?
`The temple's doors stand open at the top of the steps. Inside, in the dark, there are jars: shelf on shelf of them, clay, waxed at the neck, like a merchant's storeroom. The same jars, or near enough, as the crate that went into the last wagon. The smell comes out of the door like heat.

The squad does not go in. There is nothing in there anybody wants to carry.${b82If('tuft', `\n\nTuft stands at the bottom of the steps and does not climb them. "There's a god in there," she says. "A piece of one. Sleeping. Dying." She backs away. "Let him."`)}` :
`The temple's steps, and at the top of them, doors, shut, and the priest in front of them watching the square. The steps stay empty while he stands there.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b8_c2_to_fields:()=>{ if (!S.f.b8_c2_townDone) return {sp:'The east gate', scene:'b8_c2_town', txt:
`East, the road goes out of the town. The wagons are in the square, though, and the priest's people are round them, and Calder is not going anywhere until somebody settles what the priest is asking.`,
        ch:[{t:'Back to the square.', go:()=>startExplore()}]};
      return {sp:'The east gate', scene:'b8_c2_town', txt:
`East, the road goes out of the white town and on over the grey country. Behind, in the doors, the town's people watch the wagons go, smiling.

Calder rides up beside you at the gate. "Further on," he says, "there's a halt by the fields. Good water. They leave caravans alone there." He watches the road while he says it.`,
        ch:[{t:'On, east, toward the fields.', onward:true, fx:()=>{ S.f.b8_c2_ph = Math.max(4, S.f.b8_c2_ph || 1); }, go:()=>{ startExplore('b8_c2_fields'); if (!S.f.b8_c2_fieldsSeen) talk('b8_c2_fields_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== phase 4: the halt beside the scarecrow fields ======== */
    b8_c2_fields_arrive:()=>({sp:'The scarecrow fields', scene:'b8_fields', fx:()=>{ S.f.b8_c2_fieldsSeen = 1; }, again:()=>'The fields, the green rows, the shapes on their poles, the song.', txt:
`You smell them first, as Calder said. Then the road comes over a fold in the grey country and there they are: green. The only green for days. Rows of it, dark and thick and glossy, going away north to the edge of the sky, and among the rows, on poles, at every few paces, shapes wrapped in rags.

Scarecrows, the carters call them, and do not look. They are not straw. What feeds the green is wrapped up on those poles. Nobody in the caravan goes near enough to see more than that, and nobody needs to.

And they sing. Very faint, under the wind: not words, and not quite a tune, but something that wants to be followed. The pollen hangs in the dusk over the rows like smoke, and the song is in it.${b82If('tuft', `\n\nTuft has gone grey. "Don't listen," she says. "Whatever you do."`)}${b82If('sohra', `\n\nSohra turns her back on the rows and stays that way. "They are not resting," she says. "They are being kept."`)}

Calder halts the caravan on the verge, a long stone's throw from the first row, and has the fire lit before anybody asks him why here.`,
      ch:[{t:'Walk the verge.', go:()=>startExplore()}]}),
    b8_c2_fields_calder:()=>({sp:'Calder', scene:'b8_fields', fx:()=>{ S.f.b8_c2_fieldsCalder = 1; }, again:()=>'Calder by his wagon, writing.', txt:S.f.b8_c2_fieldsDone ?
`Calder is writing in the ledger by his wagon's lantern. "A drover," he says, without looking up. "Into the rows. It happens." He writes it down. "You brought her out. That's not in the contract. I'll put it in."` :
`"Why here?" Calder looks up from the ledger. "Good water, a spring past the third wagon. And they leave caravans alone, here. They know us." He hears that, a moment after he has said it. "They know the road," he says. "Caravans. They know caravans."

He goes back to the ledger. His pen is not moving.${b82If('ellis', `\n\nEllis, at your shoulder: "He's been here before. More than twice."`)}`,
      ch:[{t:'Back to the verge.', go:()=>startExplore()}]}),
    /* the gap in the rows: the drover has walked in after the song; the fight */
    b8_c2_gap:()=>{ if (S.f.b8_c2_fieldsDone) return {sp:'The edge of the rows', scene:'b8_fields', again:()=>'The edge of the rows, and the gap, closed up.', txt:
`The gap in the rows where the drover went in has closed up again, the green leaning back across it, glossy and dark. The song goes on, very faint. The carters keep their backs to it.`,
        ch:[{t:'Back to the verge.', go:()=>startExplore()}]};
      return {sp:'The edge of the rows', scene:'b8_fields', fx:()=>{ S.f.b8_c2_gapSeen = 1; }, again:()=>'The gap in the rows, the drover\'s footprints going in.', txt:
`At the edge of the green, by the third wagon, there is a gap in the rows where somebody has walked in. Footprints in the soft ground, a big woman's boots, going in straight and steady and not stopping. A goad lies on the verge where she let go of it.

The drover with the red scarf. The carters are standing at the wagons calling her name, and not one of them is going after her. Out in the rows, a long way in, there is a red scarf among the green, moving away. And moving toward it from either side, low and bent among the rows, shapes in rag and sacking with long hooks in their hands.

The song is louder at the edge. It wants you to come in.${b82If('brisk', `\n\nBrisk picks the goad up off the verge, and hands it to a carter, and draws. "Right," she says.`)}`,
        ch:[{t:'Into the rows after her, now.', onward:true, go:()=>startBattle('b8_c2_fields', {})},
            {t:'Stop up your ears, hum something loud, and go in with your heads clear.', check:['wits', 15],
              edges:id=>[id === 'tuft' && ['Meanas: she knows what a lure feels like from the inside', 2], id === 'sohra' && ['she knows when a spirit is calling', 2], id === 'brisk' && ['a marching song, loud and bad', 1], id === 'kettle' && ['she has had her fingers in her ears near munitions for years', 1], id === 'sgt' && ['you have heard things sing in this country before', 1], id === 'vasso' && ['a city boy; he has never heard a field', -1], id === 'brannoc' && ['he cannot hum and listen at once, and he likes to listen', -1]],
              near:{t:()=>`Yes, but the song gets in for a breath anyway, and ${b82Nm(b82Who())} ${b82V(b82Who(), 'are', 'is')} three rows in and walking steady before the squad pulls ${b82Who() === 'sgt' ? 'you' : 'them'} back by the belt. ${b82Nmc(b82Who())} ${b82V(b82Who(), 'go', 'goes')} into the fight shaken.`, fx:()=>b82Rattle(b82Who())},
              go:()=>startBattle('b8_c2_fields', nearMiss() ? {} : {surprise:'p'}), fail:'b8_c2_gap_sung'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c2_gap_sung:()=>({sp:'The green rows', scene:'b8_fields', txt:
`The song gets in. It is very simple. It only wants you to stop being afraid, and keep walking, and for a few paces that seems like the most reasonable thing in the world.

Then a hook comes out of the green at knee height, and the world is not reasonable any more, and the tenders are all round you in the rows.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c2_fields', {surprise:'e'})}]}),
    b8_c2_fields_after:()=>({sp:'The green rows', scene:'b8_fields', fx:()=>{ S.f.b8_c2_fieldsDone = 1; S.f.b8_c2_drover = 'saved'; }, txt:
`The tenders who can still move have gone back into the green, bent low, and the rows have closed behind them. The drover is standing beside a pole with her head on one side, listening, with her red scarf slipped down round her shoulders. When you take her arm she comes, quite meekly, back down the rows to the verge, and then at the edge of the green she stops and looks round at the fire and the wagons and the people calling her name, and her face comes back to her all at once.

She sits down on the verge, hard, and says a word that no ox has ever heard her say.${b82Say({ohl:`\n\nOhl is with her at once, with a blanket and hot water and his hands. "Breathe," he says. "Out. All of it. Out." He washes the pollen off her face himself.`, ressa:`\n\nRessa is with her at once, with a blanket and hot water, washing the pollen off her face.`, _:`\n\nThe carters get a blanket round her and hot water in her, and wash the pollen off her face.`})}

Behind the squad, all the way to the edge of the sky, the scarecrows go on singing. They did not stop for any of it. They did not fight. They never do.`,
      ch:[{t:'Back to the verge.', go:()=>startExplore()}]}),
    b8_c2_drover:()=>({sp:'The drover', scene:'b8_caravan_night', fx:()=>{ if (!S.f.b8_c2_goad) { S.f.b8_c2_goad = 1; gain('b8_c2_drovergoad'); } }, again:()=>'The drover with the red scarf, by the fire, with her back to the rows.', txt:
`The drover is sitting by the fire with a blanket round her and her back to the rows, very deliberately. She has her scarf back over her hair. When you come up she looks at you for a while, and then she reaches behind her and holds out her goad: a long ash pole, iron-pointed, hooked, worn black at the grip.

She does not say anything. She puts it in your hands and turns back to the fire. A carter beside her says, "She means thank you. She's never lent that to anybody. Not even the oxen."${b82If('vasso', `\n\nVasso looks at the goad, and then at the drover. "In the Gadrobi," he says, "that would be a speech."`)}`,
      ch:[{t:'Back to the verge.', go:()=>startExplore()}]}),
    b8_c2_fields_east:()=>({sp:'The road east', scene:b82Ph() >= 5 ? 'b8_c2_rows' : 'b8_fields', txt:b82Key() ?
`East, the road goes on past the end of the fields and over the grey country toward the coast, and Black Coral, weeks of it still. First light is coming up behind the wagons.` :
`East, the road goes on past the end of the fields into the dark. The caravan does not move until morning. ${b82Ph() >= 5 ? 'And there is the last wagon to settle first.' : 'Calder says so, and for once nobody argues with him.'}`,
      ch:[...(b82Key() ? [{t:'On east, at first light.', onward:true, go:'b8_c2_onward'}] : []),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 5: the night by the fields ======== */
    b8_c2_night:()=>({sp:'The night watch', scene:'b8_c2_rows', txt:
`The fire burns down on the verge. The carters sleep under their axles, or pretend to, with blankets over their heads against the song. The drover sleeps with her back to the rows and her goad gone to the Fourth.

Past midnight, out in the green, a long way in, there is a light. Then another. Lanterns, shaded, moving among the rows the way lanterns move when they are being carried by people who know the ground. They are coming toward the road. Toward the end of the line, where the last wagon stands.

And at the last wagon, Calder's man is awake, and has the tarred knots on the tarp untied.${b82If('ellis', `\n\nEllis has been watching the lights for an hour. "There," she says. "Told you. Carrying."`)}`,
      ch:[{t:'Watch.', go:()=>startExplore()}]}),
    b8_c2_loading:()=>({sp:'Lanterns at the last wagon', scene:'b8_c2_rows', again:()=>'The lanterns at the last wagon, and the tenders with their baskets.', txt:
`They come out of the rows in a line, six or seven of them, field-tenders in rag and sacking, each with a basket on their back and a shaded lantern, and they go to the last wagon as if they had done it many times. Calder's man holds the tarp up. They unload their baskets into the straw: jugs, clay, waxed at the neck, one after another after another, and the smell comes off them across the verge, thick and sweet, over the smell of the fire.

Calder's man gives the last of them something in a purse. The tenders go back into the green with their empty baskets. The song does not change.`,
      ch:[{t:'Get close along the wagons and see all of it, unseen.', check:['guile', 15], req:()=>!S.f.b8_c2_watchTried,
            edges:id=>[id === 'vasso' && ['he has watched worse from closer, on the roofs', 2], id === 'ellis' && ['she counted sentries for the Claw for six years', 2], id === 'tuft' && ['Meanas: the dark between the wagons is hers', 2], id === 'sgt' && ['you have watched a supply line before', 1], id === 'kettle' && ['she can lie still a long time over a fuse', 1], id === 'brisk' && ['mail on a dark verge is a bell', -1], id === 'brannoc' && ['a Falari whispers loud', -2]],
            near:{t:()=>`Yes, but the verge is all dry stalk at the end of the line, and ${b82Nm(b82Who())} ${b82V(b82Who(), 'kneel', 'kneels')} on enough of it to make Calder's man look round, and stare, and look away again. ${b82Nmc(b82Who())} ${b82V(b82Who(), 'come', 'comes')} back to the fire rattled.`, fx:()=>b82Rattle(b82Who())},
            fx:()=>{ S.f.b8_c2_watchTried = 1; }, go:'b8_c2_loading_unseen', fail:'b8_c2_loading_seen'},
          {t:'Walk straight up to the wagon.', go:'b8_c2_loading_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c2_loading_unseen:()=>({sp:'The last wagon', scene:'b8_c2_rows', fx:()=>{ S.f.b8_c2_watched = 'unseen'; }, txt:
`Close along the wheels, in the dark between the wagons, you see all of it: the baskets, the jugs, the purse. And, at the very end, Calder himself, coming down the line in his road coat with the ledger under his arm, to stand by his man and count the jugs in by lantern-light and write the number down.

Then the tenders are gone, and the tarp goes down, and Calder goes back to his wagon. His man sits on the tailboard with his club.`,
      ch:[{t:'Now: the tarp.', go:'b8_c2_tarp'}]}),
    b8_c2_loading_seen:()=>({sp:'The last wagon', scene:'b8_c2_rows', fx:()=>{ S.f.b8_c2_watched = 'seen'; }, txt:
`Calder's man sees you coming. He drops the tarp. The lanterns in the rows go out all at once, every one, and the tenders with them, and there is nothing at the end of the line but a wagon and a man with a club, and the sweet smell, and Calder coming down the line fast with the ledger under his arm.

"Merchant's goods," Calder's man says. He does not sound sure any more.`,
      ch:[{t:'Throw the tarp back.', go:'b8_c2_tarp'}]}),
    b8_c2_tarp:()=>({sp:'The last wagon', scene:'b8_c2_rows', fx:()=>{ if (!S.f.b8_c2_found) { S.f.b8_c2_found = 1; S.f.b8_c2_ph = Math.max(5, S.f.b8_c2_ph || 1); gain('b8_kelykjug'); } }, txt:
`The tarp comes back. Under it, straw, and in the straw jugs, packed neck to neck in rows, the whole length of the bed and as deep as an arm goes: hundreds. Clay, stoppered, waxed. The smell comes up out of the wagon like heat out of an oven.

Kelyk. The word can stay where it is; the smell has said it. ${S.f.b8_c2_backdoor ? 'The crate from the temple\'s back door is wedged in at the front, among the others. ' : ''}One of the jugs goes in the Fourth's kit, because a thing like this should be shown to someone, and a jug is a better witness than a guard.${b82Say({ohl:`\n\nOhl holds it a while before he lets it go into the kit. "Sweet," he says. "Then not." He wipes his hand on his coat, twice.`, _:''})}${b82If('vasso', `\n\nVasso stares at the rows of jugs. "The Guild says it never comes into the city," he says. "This is why. It goes the other way."`)}`,
      ch:[{t:'Calder.', go:'b8_c2_calder_face'},
          {t:'Back to the fire.', go:'b8_c2_fire'}]}),
    /* Calder: what the merchant is doing, and where it goes */
    b8_c2_calder_face:()=>({sp:'Calder', scene:'b8_c2_rows', again:()=>'Calder, by the last wagon, the ledger shut on one finger.', txt:S.f.b8_c2_calder ?
`Calder is by his wagon with the ledger shut. He has said what he is going to say. He looks at you, and at the last wagon, and waits to see what the guards he hired will do about it.` :
`Calder stands by the last wagon with the ledger shut on one finger and his face very still. "You were paid," he says, "to keep things off the wagons."

"Not to look in them. I said so. At the first halt. I write everything down." He does not look at the jugs. "The merchant's goods are the merchant's business."`,
      ch:[...(!S.f.b8_c2_calder ? [{t:'"Say it, Calder. Where does it go?"', check:['wits', 15],
            edges:id=>[id === 'vasso' && ['he knows what a man sounds like when he is about to give up a name', 2], id === 'ellis' && ['the Claw taught her how a ledger keeper breaks', 2], id === 'ohl' && ['he has the jug in his hand, and Calder can see his face', 1], id === 'sgt' && ['you have questioned quartermasters', 1], id === 'kettle' && ['she is holding a burner, and not on purpose', 1], id === 'brannoc' && ['he keeps interrupting', -1]],
            near:{t:()=>`Yes, but Calder makes ${b82Nm(b82Who())} wait for it, a long breath of the song and the fire, staring, until ${b82Nm(b82Who())} ${b82V(b82Who(), 'are', 'is')} the one who looks away first. ${b82Nmc(b82Who())} ${b82V(b82Who(), 'come', 'comes')} away from it rattled.`, fx:()=>b82Rattle(b82Who())},
            go:'b8_c2_calder_says', fail:'b8_c2_calder_bluster'}] : []),
          {t:'Back to the fire.', go:'b8_c2_fire'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c2_calder_says:()=>({sp:'Calder', scene:'b8_c2_rows', fx:()=>{ S.f.b8_c2_calder = 'told'; }, txt:
`He looks at the jugs then, for the first time, and breathes out.

"East," he says. "To Black Coral. Not into it: the Andii would have the wagon off the road and us with it. Outside it. There's a camp round the barrow there, pilgrims, thousands of them, come from every road to kneel, and some of them have started drinking something besides water. They pay. They pay very well." He opens the ledger and shuts it again. "The merchant buys it here and sells it there. It never goes west. Never to the city. The merchant isn't a fool."

"Glass, oil, cloth. And one wagon of this. The glass pays for the road. This pays for the glass." He looks at you. "Your fee comes out of it too, Sergeant. I write everything down."`,
      ch:[{t:'Back to the fire.', go:'b8_c2_fire'}]}),
    b8_c2_calder_bluster:()=>({sp:'Calder', scene:'b8_c2_rows', fx:()=>{ S.f.b8_c2_calder = 'jug'; }, txt:
`"Merchant's goods," he says again, louder, "the merchant's business," and goes on saying it in different words, about contracts, and what guards are for, and his ledger.

It does not matter. The jugs say it for him. East: to the only place within weeks of here where thousands of frightened people are camped together with silver to spend. The barrow outside Black Coral. Not west. A merchant who carried this into Darujhistan would not live to count it.

"Your fee comes out of that wagon," Calder says at last, quietly, and that is as near as he comes.`,
      ch:[{t:'Back to the fire.', go:'b8_c2_fire'}]}),

    /* the key: the last wagon, and what the Fourth does about it */
    b8_c2_key:()=>({sp:'The last wagon', scene:'b8_caravan_night', html:contractHTML(), txt:
`The last wagon stands at the end of the line with its tarp thrown back. Calder is by his own wagon with the ledger, waiting. The carters are awake now, all of them, and very carefully not watching.

There are two things guards can do about a wagon. You could burn it: the straw, the jugs, the whole load, here on the verge, and the nearest of the rows beside the road while the fire is in, and never be paid a copper for any of this road, and owe Calder for the merchant's goods besides. Or you could lash the tarp down again, and say nothing, and take the pay at Black Coral, and let a merchant's business be the merchant's.${b82Say({ohl:`\n\n"I've seen it in the town," Ohl says. "In her eyes. I've no salve for that." That is his vote.`, _:''})}${b82Say({brisk:`\n\n"We took the job," Brisk says. "We took the job to get out of the city, and the job's the wagons." She does not sound happy about it. That is hers.`, _:''})}${b82Say({kettle:`\n\nKettle has a burner in her hand, and is turning it over, and over.`, tuft:`\n\nTuft does not take the Deck out. "I already know which card," she says. "You'll choose anyway."`, _:''})}${b82If('vasso', `\n\nVasso says, to nobody in particular, "The Guild would take the pay." Then: "I'm not in the Guild."`)}`,
      ch:[{t:'"Burn it. The wagon, and the field by the road." Fields.', fx:()=>{ S.f.b8_c2_key = 'fields'; S.f.b8_c2_kelyk = 'burned'; S.f.b8_c2_ph = 6; const t = Math.min(20, S.silver || 0); S.silver = (S.silver || 0) - t; S.f.b8_c2_fee = t; updSilver(); b82L('ohl', 1); b82L('brisk', -1); b82L('vasso', 1); }, go:'b8_c2_burn'},
          {t:'"Lash it down. We\'re paid to guard the wagons." Pass.', fx:()=>{ S.f.b8_c2_key = 'pass'; S.f.b8_c2_kelyk = 'passed'; S.f.b8_c2_ph = 6; S.silver = (S.silver || 0) + 20; S.f.b8_c2_fee = 20; updSilver(); b82L('brisk', 1); b82L('ohl', -1); }, go:'b8_c2_pass'},
          {t:'Not yet.', go:'b8_c2_fire'}]}),
    b8_c2_burn:()=>({sp:'The verge', scene:'b8_c2_rows', html:contractHTML(), txt:
`${b82Say({kettle:`Kettle does it, because it is Kettle's to do. One burner, under the tailboard, and she steps back from it before it goes, and it goes.`, _:`It takes a brand from the fire and a long time. The straw catches first.`})} The straw goes up all at once, and then the jugs begin to crack in the heat, one after another, like slow applause, and what is in them burns blue and thick and smells of burnt sugar, and the wagon burns with it.

The fire goes off the tailboard into the dry stalk of the verge, and the squad lets it, and helps it, into the first of the rows. The green does not burn well. The stalk under it does. A field's width of the rows beside the road goes up in the dark, and as it goes, the scarecrows in it stop singing, one by one, where the fire reaches them. The rest of the fields, all the way to the edge of the sky, go on.

No one cheers. Calder stands by his wagon and watches, and writes it down, and when it is done he comes over and holds out his hand. "The fee," he says. "There isn't one. And that was the merchant's goods." He takes what the Fourth has, up to twenty, coin by coin, and writes that down too.${b82If('vasso', `\n\nVasso watches the rows burn with the firelight on his face. "No one pays for this," he says, wondering. "No one paid anyone."`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c2_fire'}]}),
    b8_c2_pass:()=>({sp:'The last wagon', scene:'b8_c2_rows', html:contractHTML(), txt:
`The tarp goes back down over the straw and the jugs, and Calder's man ties the tarred knots again, one at every corner, and sits on the tailboard with his club, and watches the road west.

Calder comes over with the merchant's purse. "Half now," he says, "since you've seen it. Half at Black Coral, as agreed." He counts twenty silver into your hand, coin by coin, and writes it down. "You're good guards," he says. "Good guards don't look in the wagons. You did, and then you didn't. I'll write that down too."

Out in the rows the scarecrows go on singing. The last wagon rides low on its axles.${b82If('ohl', `\n\nOhl takes the jug out of the kit and looks at it, and puts it back, and goes and sits with his back to the last wagon for the rest of the night.`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c2_fire'}]}),

    /* ======== the end: the road on east ======== */
    b8_c2_onward:()=>({sp:'The road east', scene:'b8_road_east', txt:
`First light on the old Domin. The wagons go out of the halt and into their line, and past the end of the fields, ${S.f.b8_c2_kelyk === 'burned' ? 'one fewer than there were, with a line of smoke going up behind them from the edge of the green into a clean sky' : 'all of them, the last riding low, its tarp lashed down hard'}, and the road goes on east over the grey country.

Weeks more of it. The farms thin out. The towns come and go, white, smiling. And then one evening the sky ahead, to the east, along the coast, is darker than it should be, a dark that the sun going down behind the wagons does not light, and does not lift, as if night had been set down over one place on the earth and left there.

Black Coral.${b8In('vasso') ? ` Vasso, beside the lead wagon, stops walking. "That's a city?" he says. "Under that?"` : ''}${b82Say({tuft:`\n\nTuft looks at it a long while. "Coral," she says. "We were there." She does not say what else.`, brisk:`\n\nBrisk looks at it a long while. "Coral," she says. "We were there." She touches two fingers to her brow.`, _:''})}`,
      ch:[{t:'On, to Black Coral.', onward:true, go:()=>chapterEnd(2, b82Key() || B8KEY0[2])},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
