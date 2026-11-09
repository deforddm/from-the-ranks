/* ============ Book Six, Chapter 2: The North Coast ============ */
/* The Fourth, with Onearm's Host, on the north coast of Seven Cities near Ehrlitan (The Bonehunters ch 1, 6, 8; bh-canon §3).
   The Host has landed to finish the rebellion, and a plague has landed with it, or met it. Phase 1, the camp above the sea at dusk:
   the captain's orders, Brannoc loaned from Sweetcreek's Falari to make up the Seventh's numbers (the recruit), word of the D'rek
   priests found slaughtered, the ranks' feeling that the High Fist's spirit is broken, the Falari boats on the shore below (the trick),
   and a D'rek wayside shrine on the headland with looters at it (b6_c2_shrine, optional). Phase 2, the march inland: empty hamlets,
   a well (the chapter's one fever "yes, but"). Phase 3, a village where the dead were left, and the people robbing them
   (b6_c2_village, main, stage2, feverRisk). Then the order to fire the village, and a family hiding in the last house: the key,
   S.f.b6_c2_key, 'burn' (the village burns; nobody in the squad catches anything there) or 'pass' (the squad goes round, leaves the
   family its roofs, and someone catches the fever carrying them water). Phase 4, bandits on the plague road (b6_c2_road), and the
   column on toward G'danisban. Notes for later chapters: docs/bh-ch2-notes.md. */
/* FOR THE ARTIST (102b): names this file uses.
   Items: ART['item/b6_c2_falariaxe'], ['item/b6_c2_oilskin'], ['item/b6_c2_drekcharm'].
   Figures: brannoc (recruit); foe kinds borrowed from earlier books (deserter, thug, bruiser, b4_c7_fleer, b4_c7_fleerbow, b4_c5_rider).
   NPCs: b2soldier (the captain, a regular, the quartermaster, the runner), crone (the Falari sail-mender), b3_c3_capan (the family).
   Backdrops (SCENEX, 100's placeholders): b6_coast (the camp above the sea), b6_plague_village (the road and the village); b6_camp_night
   is borrowed for the march fire. Ground is borrowed: b3camp_night (the Host's camp), b5_c2_strand (the shore), b3_c5_domin and
   b3_c5_domin_night (the plague road, the village). */

/* ---- small helpers (b62: Book Six, Chapter Two) ---- */
const b62L = (id, n) => { if (b6In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b62Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b6In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b62If = (id, s) => b6In(id) ? (typeof s === 'function' ? s() : s) : '';
const b62Who = () => (ROLL() && ROLL().who) || 'sgt';
const b62Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b62Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b62V = (id, you, they) => id === 'sgt' ? you : they;
const B62HE = {ohl:1, vell:1, brannoc:1};
const b62Him = id => id === 'sgt' ? 'you' : B62HE[id] ? 'him' : 'her';
const b62His = id => id === 'sgt' ? 'your' : B62HE[id] ? 'his' : 'her';
const b62Ph = () => S.f.b6_c2_ph || 1;
const b62Key = () => S.f.b6_c2_key || null;
const b62Here = () => S.squad.filter(id => id !== 'sgt' && b6In(id));
const b62And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b62Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b62Silver = (n, why) => { S.silver = (S.silver || 0) + n; updSilver(); note(`+${n} silver: ${why}.`, 'good'); };
/* Brannoc walks, or waits with Sweetcreek's Falari */
const b62Near = () => b6In('brannoc') || (S.f.b6_brannocDone === 2);
/* who catches it when the squad goes round the village: Brannoc first, who says the plague will not touch a Falari */
const b62Carrier = () => ['brannoc', 'brisk', 'kettle', 'tuft', 'ellis', 'vell', 'sohra', 'greysword', 'ohl', 'sgt'].find(id => (id === 'sgt' || b6In(id)) && !b6Fevered(id)) || null;
/* "stay with Sweetcreek's lines for now": what b6Join does when six walk, done on purpose */
const b62Wait = () => { S.f.b6_brannocDone = 2; S.camp = [...(S.camp || []).filter(x => x !== 'brannoc'), 'brannoc']; S.loy.brannoc ??= 0; S.picks.brannoc ??= []; S.gear.brannoc ??= {};
  note('Brannoc stays with Sweetcreek\'s Falari for now. The roster at any fire can bring him in.'); save(); };

/* ---- Falari Weather-Sense: Rhivi Spirit-Song's mechanics (song), in the islands' words. From an old Falari sail-mender on the shore
   below the Host's camp. Not sorcery. ---- */
Object.assign(TRICKS, {
  b6_c2_weather:{name:'Falari Weather-Sense', ch:2, use:'fight', ab:'t_b6_c2_weather', where:'the shore below the Host\'s camp on the north coast, with an old Falari sail-mender',
    lore:'On the Strike Isles they teach it to children before they teach them to swim: the squall has a front and a back, and between them there is a breath when the wind lets go. You feel it on the back of the neck before it comes. Stand easy in it, and everything that was pulling you over stops pulling.',
    get fx(){ return `Once a fight: the bearer calls the break in the squall. Every squadmate within 4 heals 1d6+${2 + lvB()}, wakes from any daze, and steps out of any fire under them. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b6_c2_weather:{name:TRICKS.b6_c2_weather.name, trick:'b6_c2_weather', self:true, desc:()=>TRICKS.b6_c2_weather.fx,
    run(u){ AUDIO.play('heal'); const near = party().filter(p => !p.ally && cheb(p, u) <= 4);
      near.forEach(p => { heal(p, roll(1, 6, 2 + lvB())); if (p.stun) { p.stun = false; float(p, 'steady', '#bfd8e8'); } B.fires = B.fires.filter(f => !(f.x === p.x && f.y === p.y)); putOut(p); sparks(p.x, p.y, 10, '#bfd8e8', .35); });
      blog(`${u.name} lifts a hand, the way the old sail-mender did, and holds it there. "${u.id === 'brannoc' ? 'Now. Breathe.' : u.id === 'kettle' ? 'There it goes. Breathe, you lot.' : 'Wait. Now.'}" The wind lets go of ${near.length > 1 ? 'the squad' : u.name} for a breath, and everything that was pulling stops pulling.`); }},
});

/* ---- the D'rek charm: the fever costs its wearer 3 health in a fight, not 4 (Claude's call, a small effect only) ---- */
{ const _mk = mkParty; mkParty = function(id, x, y){ const u = _mk(id, x, y); if (b6On() && u && u.fevered && Object.values((S.gear && S.gear[id]) || {}).includes('b6_c2_drekcharm')) { u.maxhp += 1; u.hp = Math.min(u.hp + 1, u.maxhp); } return u; }; }

/* ---- the words this chapter adds to Book Six's glossary ---- */
GLOSSX.bh.push(
  [2, 'Sweetcreek\'s Falari', 'Red-haired islanders in the Host under Captain Sweetcreek, who is Falari too and is said to be a princess on her own islands. It is not said to her face.', ()=>!!(S && S.f && S.f.b6_c2_ph)],
  [2, 'D\'rek', 'The Worm of Autumn, god of decay and of what comes after it. Her priests were the best healers on the coast. Were.', ()=>!!(S && S.f && S.f.b6_c2_drekHeard)]);

/* ---- the reading at the first halt: the camp above the sea ---- */
B6DECK[2] = {scene:'b6_coast', where:'an upturned shield under a tent fly, out of the rain', set:'The Host\'s camp above the sea on the north coast, with Ehrlitan\'s lamps along the bay and the rain coming in off the water.',
  back:'b6_c2_deck_done', backT:'Back to the camp.',
  say:{tuft:`Tuft has the wooden deck out of her sleeve before you have sat down. "It's been wanting out since we landed," she says. "Something on this coast it doesn't like." She does not say what. She deals with her back to the sea.`,
    sohra:`Sohra throws the bones into the smoke of the tent's brazier and frowns at the way the smoke goes. "The sea air," she says. "Or something else in it. The spirits here are thin. Thin and in a hurry."`,
    benna:`Old Benna has followed the Host's laundry across the sea and is not pleased about it. "Salt in everything," she says. "Copper for the reading. And sit where the drip won't get the cards."`}};

/* the fire node is a roster fire (38c) */
ROSTER_FIRES.bh = ROSTER_FIRES.bh || {};
ROSTER_FIRES.bh[2] = ['b6_c2_fire'];

const B6CH2 = {
  title:'The North Coast', number:'Two',
  intro:{loc:'The north coast', sub:'Onearm\'s Host, landed · dusk, rain', scene:'b6_coast', cap:'Tents in rows above a grey sea, the ships riding offshore, and a city\'s lamps along the bay that nobody in the Host has been let into.',
    paras:[
`Onearm's Host has crossed the sea to Seven Cities to finish a rebellion the Empire says is already finished. The ships put the army ashore on the north coast, near Ehrlitan, in rain, and the army went up the slope from the beach and dug in, and has been digging in ever since.`,
()=>{ const v = b62Here().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Fourth Squad, Seventh Company. ${v.length ? `${b62And(v)} ${v.length > 1 ? 'are' : 'is'} with you, wet to the knees and not complaining about it yet.` : 'The Fourth, this season, is you.'} The Seventh is short of hands since Coral, like every company in the Host, and nobody has sent any.`; },
`Somewhere south of here the rebellion's last army is running from the Adjunct's. Somewhere inland, the camp says, a fever is walking from village to village. Most of what the camp says it says loudly. This it says quietly.`],
    go:'Up to the lines', node:'b6_c2_start'},

  areas:[
    /* 16 x 12 (b3camp_night): the Host's camp above the sea, dusk and rain. = tents  F the Fourth's fire  W the quartermaster's wagon
       h the horse lines  s the Seventh's standard  > east, down to the shore  v south, the road inland (from phase 2) */
    { id:'b6_c2_camp', title:'The north coast · the Host\'s camp', sub:'Above the sea · dusk, rain', hint:'Tap ground to move · tap a figure to talk · the shore is east', decor:'b3camp_night', dark:true,
      map:[ "################",
            "#==.==.==..==.=#",
            "#..............#",
            "#.=.=..s..W..=.#",
            "#..............#",
            "#.,,,,..F..,,,.>",
            "#..............#",
            "#.=.=.....hhh..#",
            "#..............#",
            "#.==.==.....==.#",
            "#..............#",
            "#######v########" ],
      walk:'.,', triggers:{F:'b6_c2_fire', W:'b6_c2_qm', '>':'b6_c2_to_shore', v:'b6_c2_to_road'}, start:{x:7, y:6},
      quest:()=> b62Ph() > 1 ? 'The column has gone inland: the road south.' : !S.f.b6_c2_capt ? 'The captain, by the Seventh\'s standard.' : S.f.b6_brannocDone == null ? 'A Falari by the horse lines, waiting for somebody.' : 'The fire. The order to march will come there.',
      npcs:[
        {id:'capt', name:'The captain', kind:'b2soldier', x:8, y:4, node:()=>'b6_c2_captain', show:()=>b62Ph() === 1, fresh:()=>!S.f.b6_c2_capt},
        {id:'brannoc', name:'A Falari soldier', kind:'brannoc', x:13, y:6, node:()=>S.f.b6_brannocDone == null ? 'b6_c2_brannoc' : 'b6_c2_brannoc_again', show:()=>b62Ph() === 1 && !b6In('brannoc') && S.f.b6_brannocDone !== 0 && b6CanRecruit('brannoc'), fresh:()=>S.f.b6_brannocDone == null},
        {id:'regular', name:'A Host regular', kind:'b2soldier', x:3, y:6, node:()=>'b6_c2_regular', show:()=>b62Ph() === 1, fresh:()=>!S.f.b6_c2_regular} ] },

    /* 16 x 12 (b5_c2_strand): the shore under the camp. ~ the sea  , shingle  . sand  B the Falari boats, drawn up  # the bank
       < west, back up to the camp  > east, along the shore to the headland */
    { id:'b6_c2_shore', title:'The north coast · the shore', sub:'Below the camp · the Falari boats', hint:'Tap ground to move · the camp is west · the headland is east', decor:'b5_c2_strand', dark:true,
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~~~~~~~~~~~~~~",
            ",,~~~,,,,~~,,,,,",
            ",B,,,,B,,,,,,B,,",
            "................",
            "<...............",
            "................",
            ".,.....,......,.",
            "................",
            "...............>",
            "....,......,....",
            "################" ],
      walk:'.,', triggers:{B:'b6_c2_boats', '<':'b6_c2_to_camp', '>':'b6_c2_to_shrine'}, start:{x:2, y:5},
      quest:()=> !S.f.b6_c2_weatherTried ? 'An old Falari woman is mending a sail by the boats.' : !S.f.b6_c2_shrineDone ? 'Along the shore to the headland, east. There are figures at the shrine.' : 'Back up to the camp, west.',
      npcs:[
        {id:'mender', name:'An old Falari sail-mender', kind:'crone', x:8, y:4, node:()=>S.f.b6_c2_weatherTried ? 'b6_c2_mender_again' : 'b6_c2_mender', fresh:()=>!S.f.b6_c2_weatherTried} ] },

    /* 16 x 12 (b3_c5_domin): the road inland, in the rain. # the walls of an empty hamlet  w its well  D a house with the door open
       x dead trees  F the Fourth's fire on the march  > east, on along the road */
    { id:'b6_c2_road', title:'Inland · the plague road', sub:'The march · empty country', hint:'Tap ground to move · the road goes on east', decor:'b3_c5_domin',
      map:[ "x,,,,,,,,,,,,,,x",
            ",,###.###,,,,,,,",
            ",,#.....#,,x,,,,",
            ",,#..w..#,,,,,,,",
            ",,##.D.##,,,,,,,",
            "................",
            "...............>",
            "................",
            ",,,,,F,,,,,,,,,,",
            ",x,,,,,,,,,,,x,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,x,,,,,,," ],
      walk:'.,', triggers:{w:'b6_c2_well', D:'b6_c2_house', F:'b6_c2_fire', '>':'b6_c2_road_on'}, start:{x:2, y:6},
      quest:()=> b62Ph() === 2 ? 'The road goes on east. A village, the scouts say, where nobody came out to meet them.' : b62Ph() === 3 ? 'The village, east.' : b62Ph() === 4 ? 'On after the column, east. The road is not empty.' : 'After the column.',
      npcs:[] },

    /* 16 x 12 (b3_c5_domin, night palette): the village where the dead were left. # house walls  D houses with the doors open
       E the last house  w the village well  x dead trees  v south, back to the road */
    { id:'b6_c2_vil', title:'Inland · a village', sub:'Rain · the doors open', hint:'Tap ground to move · the road is south', decor:'b3_c5_domin_night', dark:true,
      map:[ "################",
            "#..###....###..#",
            "#..#D#....#D#..#",
            "#..............#",
            "#.###..w...###.#",
            "#.#E#......#D#.#",
            "#..............#",
            "#....x....x....#",
            "#..............#",
            "#...,,,,,,,,...#",
            "#..............#",
            "#######v########" ],
      walk:'.,', triggers:{D:'b6_c2_houses', E:'b6_c2_lasthouse', w:'b6_c2_vwell', v:'b6_c2_vil_out'}, start:{x:7, y:9},
      quest:()=> !S.f.b6_c2_villageDone ? 'Figures among the houses. Not the people who lived here.' : !b62Key() ? (S.f.b6_c2_order ? 'The last house, west. There is a light in it.' : 'A runner is coming up the road from the column.') : 'Back to the road, south.',
      npcs:[
        {id:'scav', name:'Somebody among the houses', kind:'thug', x:8, y:6, node:()=>'b6_c2_village_arrive', show:()=>!S.f.b6_c2_villageDone, fresh:()=>true},
        {id:'runner', name:'A runner from the column', kind:'b2soldier', x:8, y:8, node:()=>'b6_c2_order', show:()=>!!S.f.b6_c2_villageDone && !b62Key(), fresh:()=>!S.f.b6_c2_order} ] } ],

  battles:{
    /* the D'rek shrine on the headland: looters stripping it, the priests dead inside days since (headline only) */
    b6_c2_shrine:{title:'The shrine on the headland', style:'b3_c5_domin_night', dark:true, warrenText:'The headland · rain off the sea, and the warrens sour', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.t..t.#","#......#","#..##..#","#......#","#.t...t#","#......#","#......#","#..t...#","#......#","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_c2_looter',2,1],['b6_c2_looter',5,1],['b6_bandit',3,3],['b6_c2_looter',6,3],['b6_rebelbow',4,0]], xp:200, after:'b6_c2_shrine_after',
      preText:()=>`The looters have a handcart at the shrine door and the shrine's brass on it. They look at the squad's shields, and at the cart, and decide the cart is worth it.`},
    /* the village where the dead were left: people robbing the dead; then the headman's yard. It spreads the fever. */
    b6_c2_village:{title:'The village of the open doors', style:'b3_c5_domin_night', dark:true, warrenText:'Rain on a dead village · the warrens are sick this season, and everyone who reaches into one comes out grey', warren:{meanas:1, denul:1}, music:'battle',
      feverRisk:'the dead in the village',
      map:["#..##..#","#......#","#.t..t.#","#......#","##....##","#......#","#..t...#","#......#","#......#","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_c2_scav',2,1],['b6_c2_scav',5,1],['b6_c2_scav',3,3],['b6_bandit',5,3],['b6_rebelbow',6,0]], xp:260, after:'b6_c2_village_after',
      preText:()=>`They have scarves over their mouths and sacks over their shoulders, and they have been going from door to door. When they see the shields they drop the sacks. Whatever is in them, they do not want to be caught with it.`,
      stage2:{title:'The headman\'s yard', xp:130,
        text:()=>`The ones in the street go over the back walls. The squad goes after them, through a house they cross at a run, and out into a yard behind a wall, where there are more of them, and a cart already loaded, and a big man with a cudgel who has decided this village is his now.${b62If('brannoc', `\n\nBrannoc puts the whistle in his teeth and blows one note on it, flat, for no reason anyone can see. "Falari for *here we come*," he says round it.`)}`,
        map:["#......#","#.t..t.#","#......#","#..##..#","#......#","#......#","#.t..t.#","#......#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_c2_scavboss',3,1],['b6_c2_scav',1,2],['b6_c2_scav',6,2],['b6_bandit',4,4],['b6_rebelbow',2,0]]} },
    /* bandits on the plague road: they wait for whoever runs from the villages, and tonight the Fourth is behind the column */
    b6_c2_road:{title:'The plague road', style:'b3_c5_domin', warrenText:'The road inland · rain, and the warrens sour', warren:{meanas:1, denul:1}, music:'battle',
      map:["..t..t..","........","...##...","........",".t....t.","........","........","..t..t..","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_c2_roadchief',4,1],['b6_bandit',2,2],['b6_bandit',6,2],['b6_bandit',3,4],['b6_rebelbow',1,0],['b6_rebelbow',6,0]], xp:240, after:'b6_c2_road_after',
      waves:[{round:3, foes:[['b6_bandit',0,5],['b6_bandit',7,5]], text:'Two more come out of the ditch on either side of the road, where they had been lying in the rain since before dawn.'}],
      preText:()=>`They come up out of the ditch with their faces wrapped and their blades out, and the one in front has a Falari axe and a voice used to being obeyed. "Kit," he says. "Boots. Water. Then walk on."`} },

  foes:{
    /* looters at the D'rek shrine */
    b6_c2_looter:{name:'Shrine-looter', sig:'l', kind:'deserter', hp:24, ac:12, atk:9, dmg:[1,6,3], rng:1, mv:5, init:2, sk:['hitrun'], verb:'goes in with a long knife at'},
    /* people robbing the dead in the villages, and the man who leads them */
    b6_c2_scav:{name:'Corpse-robber', sig:'s', kind:'thug', hp:26, ac:12, atk:9, dmg:[1,8,2], rng:1, mv:4, init:2, verb:'swings a hooked bar at'},
    b6_c2_scavboss:{name:'The robbers\' big man', sig:'H', kind:'bruiser', hp:58, ac:14, atk:10, dmg:[1,10,3], rng:1, mv:4, init:1, boss:true, sk:['rally', 'shove'], verb:'brings a cudgel down on'},
    /* the bandit chief on the plague road */
    b6_c2_roadchief:{name:'The bandit chief', sig:'C', kind:'b4_c5_rider', hp:60, ac:15, atk:11, dmg:[1,10,4], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'swings a Falari axe at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b6_c2_falariaxe:{name:'A Falari axe', slot:'weapon', role:'heavyweapon', who:null, atk:1, dmg:[1,12,3],
      line:'Island iron on an ash haft, broad in the blade and bearded, the kind the Falari carry and nobody else can forge. It came off a bandit chief on the plague road. Where he had it from, nobody asked him.'},
    b6_c2_oilskin:{name:'A Host oilskin', slot:'armour', role:'light', who:null, ac:1, hp:2,
      line:'A long coat of oiled canvas over a quilted lining, issued off the quartermaster\'s wagon on the north coast to whoever asked first. It keeps the rain out of the mail, mostly, and the wearer a little warmer than the soldier beside them.'},
    b6_c2_drekcharm:{name:'A D\'rek worm-charm', slot:'trinket', role:'any', who:null, special:'In a fight, the fever costs its wearer 3 health, not 4',
      line:'A little coil of bronze in the shape of a worm eating its tail, on a cord, from the shrine on the headland. The priests gave them to the sick. Whoever wears it feels the fever a little less, or says so.'} },

  end:{
    burn:['The village burned', 'The Fourth landed on the north coast with Onearm\'s Host, and marched inland when the Host did, through villages with their doors open. In one of them the dead had been left, and the living were robbing them, and the squad put a stop to that. Then the order came to fire it. The squad fired it. A family that had hidden in the last house went up the hill path ahead of the smoke, and nobody in the squad touched anything that was burning.'],
    pass:['The roofs left standing', 'The Fourth landed on the north coast with Onearm\'s Host, and marched inland when the Host did, through villages with their doors open. In one of them the dead had been left, and the living were robbing them, and the squad put a stop to that. Then the order came to fire it. The squad went round it instead, because a family was hiding in the last house, and carried them water before it left. One of the squad paid for the water.'] },
  endScene:'b6_plague_village',
  endCap:()=> b62Key() === 'pass' ? 'The column on the road south in the rain, and behind it a village with its roofs on and one chimney going.' : 'The column on the road south in the rain, and behind it a smudge of smoke going flat in the wind.',
  tease:'Next, the Third: Y\'Ghatan, at dusk.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b6_c2_key === 'burn') x.push('The squad fired the village on orders. The family in the last house went up the hill path ahead of the smoke.');
    if (f.b6_c2_key === 'pass') x.push(`The squad went round the village and left the family its roofs.${f.b6_c2_passWho && (f.b6_c2_passWho === 'sgt' || TPL[f.b6_c2_passWho]) ? ` ${f.b6_c2_passWho === 'sgt' ? 'You' : esc(NAME(f.b6_c2_passWho))} caught the fever carrying them water.` : ''}`);
    if (f.b6_c2_villageDone) x.push('In a village where the dead were left, the squad drove off the people robbing them, street and yard.');
    if (f.b6_c2_roadDone) x.push('Bandits on the plague road came up out of the ditch for the squad\'s boots, and did not get them.');
    if (f.b6_c2_shrineDone) x.push('On the headland, the squad drove looters off a shrine of D\'rek whose priests were already dead.');
    if (f.b6_brannocDone === 1 && b6In('brannoc')) x.push('Brannoc of Sweetcreek\'s Falari walks with the Fourth, loaned to make up the Seventh\'s numbers, with his axe and his tin whistle.');
    else if (f.b6_brannocDone === 2) x.push('Brannoc of Sweetcreek\'s Falari waits with his own lines for now. The roster can bring him in.');
    if (f.b6_c2_weatherOk) x.push('An old Falari sail-mender on the shore taught the squad to feel the break in a squall before it comes.');
    if (f.b6_c2_cured) x.push('Ohl broke the fever at the fire, out of a warren that is sick this season, and was grey for a day after.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b6_c2_roadDone && 'Bandits on the plague road, waiting for whoever runs from the villages. Their chief carried a Falari axe.',
    f.b6_c2_key && (f.b6_c2_key === 'burn' ? 'The order came to fire the village. The squad fired it. A family hiding in the last house went up the hill path first.' : 'The order came to fire the village. The squad went round it, and left a family its roofs, and carried them water.'),
    f.b6_c2_villageDone && 'A village inland where the dead were left in the houses, and people going door to door to rob them. The squad stopped them.',
    f.b6_c2_wellOk && 'The hamlet well on the road was bad. The squad filled its skins from the rain instead.',
    f.b6_c2_ph >= 2 && 'The Host marches inland from the coast, in the rain, through villages with their doors open.',
    f.b6_c2_shrineDone && 'A shrine of D\'rek on the headland, its priests dead inside, and looters at the door.',
    f.b6_brannocDone === 1 && 'Brannoc, a Falari of Sweetcreek\'s, loaned to the Seventh to make up its numbers. He walks with the squad.',
    f.b6_brannocDone === 2 && 'Brannoc, a Falari of Sweetcreek\'s, loaned to the Seventh. He waits with his own lines for now.',
    f.b6_c2_dujek && 'The ranks say the High Fist\'s spirit is broken. He has not walked the lines since the landing.',
    f.b6_c2_drekHeard && 'The priests of D\'rek have been found slaughtered, the camp says: the healers, the ones who would have known what to do.',
    'Onearm\'s Host has landed on the north coast of Seven Cities, near Ehrlitan, to finish the rebellion. There is a fever inland.'].filter(Boolean); },

  dlg:{
    /* ---- the first halt: the camp above the sea at dusk ---- */
    b6_c2_start:()=>({sp:'The north coast · the Host\'s camp', scene:'b6_coast', fx:()=>{ S.f.b6_c2_ph ??= 1; },
      again:()=>`The Host's camp above the sea, in the rain. The Seventh's standard, the horse lines, the fire.`, txt:
`The Host's camp, at dusk, in rain.

It covers the slope above the beach in rows of tents that were pitched in a hurry and have been re-pitched since by sergeants with opinions. The palisade is half built. The ships ride offshore with their sails furled, and the boats go back and forth to them all day with things nobody explains. Down the coast to the west, round the bay, the lamps of Ehrlitan are coming on, one at a time. The Host has not been let into the city, and has not asked twice.

${b62Say({brisk:`Brisk looks at the half-built palisade, and at the slope, and at the sea, and says, "Sergeant." It means the palisade will not hold anything and she has noticed.`, kettle:`Kettle is looking at the ships. "Six days on those," she says. "I'm not getting back on one till somebody pays me to."`, _:'The squad looks at the half-built palisade for a while.'})}${b62If('ohl', `\n\nOhl stands at the top of the slope with his stick planted in the mud, looking west along the bay at the lamps, and keeps his thoughts about them to himself.`)}${b62If('tuft', `\n\nTuft has her hood up and her back to the sea, and a hand in her sleeve, on the cards.`)}`,
      ch:[b6DeckChoice(2),
          {t:'Find the captain.', go:'b6_c2_captain'},
          {t:'Walk the lines.', go:()=>startExplore()}]}),
    b6_c2_deck:()=>b6DeckOffer(2),
    b6_c2_card:()=>b6DeckCard(2),
    b6_c2_deck_done:()=>({sp:'The Deck of Dragons', scene:'b6_coast', txt:
`${S.f.b6_c2_drawn ? (S.f.b6_c2_reader === 'tuft' ? 'Tuft gathers the cards and squares them on the shield and puts them back in her sleeve, and keeps her hand there a while after.' : S.f.b6_c2_reader === 'sohra' ? 'Sohra blows the smoke away and picks the bones out of the ash one at a time, counting them.' : 'Old Benna wraps the deck in a square of oilcloth and takes her copper, and the rain goes on dripping off the fly.') : 'The Deck stays where it is.'} Down the slope the sea goes on coming in.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ---- the captain: the Seventh's orders ---- */
    b6_c2_captain:()=>({sp:'The captain', scene:'b6_coast', fx:()=>{ S.f.b6_c2_capt = 1; S.f.b6_c2_ph ??= 1; },
      again:()=>`The captain, under the standard, in the rain. "We march when the Host marches, Sergeant. That's all I know."`, txt:
`The Seventh's captain stands under the company standard with a waxed cape over the mail and the rain coming off the brim of the helm in a string. A clerk stands beside the captain with a writing board under an oilcloth, and has given up trying to write on it.

"Sergeant." The captain looks at the Fourth, and counts it, the way every officer in the Host counts every squad since Coral. "Short, like everybody. I've a Falari of Sweetcreek's on loan to the Seventh, to make up numbers. He's by the horse lines. If you want him, he's yours. If you don't, he's somebody else's by morning."

"Orders. We wait. The Host waits. The ships unload. When the High Fist says march, we march, inland, and I'd guess south. Until then, keep your soldiers out of the city and out of the villages along the coast road." The captain stops. "Especially the villages."`,
      ch:[{t:'"Why the villages?"', req:()=>!S.f.b6_c2_drekHeard, go:'b6_c2_capt_plague'},
          {t:'"The Falari."', req:()=>S.f.b6_brannocDone == null, go:'b6_c2_capt_brannoc'},
          {t:'"Any word from the High Fist?"', req:()=>!S.f.b6_c2_capDujek, go:'b6_c2_capt_dujek'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_capt_plague:()=>({sp:'The captain', scene:'b6_coast', fx:()=>{ S.f.b6_c2_drekHeard = 1; }, txt:
`The captain looks at the clerk, and the clerk finds something to do with the oilcloth.

"There's a fever in them," the captain says. "Inland, along the roads, village to village. The locals say a goddess sent it. The locals say that about rain. And the priests of D'rek, the healers, the ones who'd know what to do about it, have been found slaughtered in their temples." A pause. "Not one or two. That's the word. All of them, the way it's told."

"So. No village wells. No house that hasn't been gone into. No sleeping with the locals, and I'll know." The captain looks at you. "Tell your healer. He'll want to hear it from someone who isn't a rumour."${b62If('ohl', `\n\nOhl, behind you, has heard it. He says something short in Ehrlii, which is not a prayer.`)}`,
      ch:[{t:'Back to the orders.', go:'b6_c2_captain'}]}),
    b6_c2_capt_brannoc:()=>({sp:'The captain', scene:'b6_coast', txt:
`"Brannoc," the captain says. "Red beard, big axe, sings. Sweetcreek's sent me three and I've given two away already." The captain does not smile, quite. "He talks. Sweetcreek says he's good in a fight, and Sweetcreek doesn't say that about anyone, so either he's very good or she wants rid of him. Possibly both."`,
      ch:[{t:'Go and find him by the horse lines.', onward:true, go:'b6_c2_brannoc'},
          {t:'Back to the orders.', go:'b6_c2_captain'}]}),
    b6_c2_capt_dujek:()=>({sp:'The captain', scene:'b6_coast', fx:()=>{ S.f.b6_c2_capDujek = 1; S.f.b6_c2_dujek = 1; }, txt:
`The captain looks up the slope, at the command tents at the top of the camp, where the lamps are lit and the flaps are down.

"He's there," the captain says. "He signs things. The orders come down." The rain runs off the helm. "He hasn't walked the lines since we landed. He used to walk them every night, the Pale years. You'd turn round at a fire and he'd be there with the one arm, asking after your feet."

"It's since Coral," the captain says, more quietly. "Everyone knows it and nobody's to say it. So don't."`,
      ch:[{t:'Back to the orders.', go:'b6_c2_captain'}]}),

    /* ---- Brannoc, by the horse lines: the recruit ---- */
    b6_c2_brannoc:()=>({sp:'A Falari soldier', scene:'b6_coast', txt:
`By the horse lines a big red-haired soldier in mail is sitting on an upturned bucket in the rain, playing a tin whistle, badly. He has a Falari axe across his knees and a red beard braided in two, and he stops when he sees the Fourth's shields and stands up, which takes a while.

"Brannoc," he says. "Sweetcreek's. Loaned to the Seventh, the captain says, to make up the numbers. Which squad's short?" He looks the Fourth over. "Ah. All of them. Well."

${b62Say({kettle:`He sees Kettle, and the red hair under the soot, and his whole face changes. "Strike Isles?" he says. "Which one?" Kettle tells him. He tells her his. It turns out they hate each other's islands, in the old way, and are very pleased about it.`, _:'"I can carry," he says. "I can fight. I sing on the march, which some find a comfort." He considers. "Some don\'t."'})}

"The plague's a Seven Cities thing," he adds, cheerfully. "Doesn't touch a Falari. Everyone knows that."${b62If('ohl', `\n\nOhl looks at him over the top of his stick for some time, and does not tell him otherwise.`)}`,
      ch:[{t:'"Walk with us."', fx:()=>{ b6Join('brannoc'); }, go:'b6_c2_brannoc_join'},
          {t:'"Stay with Sweetcreek\'s lines for now. We\'ll send for you."', fx:()=>b62Wait(), go:'b6_c2_brannoc_wait'},
          {t:'"We can\'t take you."', fx:()=>{ S.f.b6_brannocDone = 0; }, go:'b6_c2_brannoc_away'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_brannoc_join:()=>({sp:'Brannoc', scene:'b6_coast', txt: b6In('brannoc') ?
`"Good," Brannoc says, and puts the whistle away in his mail, which is apparently where it lives. He picks up the bucket, looks at it, and puts it down again, because it was never his. "Where do I sleep? Never mind. Wherever there's room. There's always room."

${b62Say({brisk:`Brisk looks him up and down, from the beard to the boots. "Shield," she says. He has one. She nods, once, and goes back to the fire. That is a great deal, for Brisk.`, kettle:`Kettle shows him where to put his kit, which is upwind of hers, as far as the tent allows.`, _:'The squad makes room at the fire. He takes up most of it.'})}` :
`"Six of you already," Brannoc says, looking along the line. "Well. I'll be with the Falari, then. Send for me." He picks up the whistle again.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c2_brannoc_wait:()=>({sp:'Brannoc', scene:'b6_coast', txt:
`"Fair," Brannoc says. "Sweetcreek's lines are down by the boats. I'll be there, being loaned to nobody." He tucks the axe under his arm. "Send a runner. Or whistle. I'll hear it."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c2_brannoc_away:()=>({sp:'Brannoc', scene:'b6_coast', txt:
`Brannoc shrugs, a large shrug. "Somebody else's by morning, the captain said. He'll be pleased he was right." He goes off down the slope toward the Falari lines, whistling, badly.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c2_brannoc_again:()=>({sp:'Brannoc', scene:'b6_coast', again:()=>`Brannoc, on his bucket, with the whistle. "Sergeant."`, txt:
`Brannoc is back on his bucket by the horse lines, playing the whistle at the horses, who are putting up with it. "Still being loaned," he says. "Still to nobody."`,
      ch:[{t:'"Walk with us now."', req:()=>b6CanRecruit('brannoc') && !b6In('brannoc'), fx:()=>{ b6Join('brannoc'); }, go:'b6_c2_brannoc_join'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- a Host regular: the camp's talk ---- */
    b6_c2_regular:()=>({sp:'A Host regular', scene:'b6_coast', fx:()=>{ S.f.b6_c2_regular = 1; S.f.b6_c2_dujek = 1; },
      again:()=>`The regular, under a cape, with the pot. "No news, Sergeant. There's never news."`, txt:
`A regular of the line has a pot on a small fire under a cape stretched between two spears, and is making it last. He moves over for the Fourth without being asked, which in the Host is manners.

"You hear about the High Fist?" he says. "No? Not been seen. Not since the landing. Lamp's on in the tent all night, orders come out in the morning, and him not out once." He stirs the pot. "Used to walk the lines. You remember. You'd get the one arm on your shoulder and a question about your boots."

"My sergeant says the spirit's gone out of him. Since Coral." He tells it to the pot. "My sergeant says a lot."${b62If('brannoc', `\n\nBrannoc, who never saw the Pale years, listens to this with his head on one side, and for once does not say anything.`)}`,
      ch:[{t:'"Anything else?"', req:()=>!S.f.b6_c2_rumour, go:'b6_c2_regular_rumour'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_regular_rumour:()=>({sp:'A Host regular', scene:'b6_coast', fx:()=>{ S.f.b6_c2_rumour = 1; }, txt:
`"South," the regular says. "The Adjunct's army, the new one, the Fourteenth. They're chasing the last of the rebels into the Odhans, they say, after some fellow with flails. Leoman." He tastes the pot. "Leaving us the plague and the mopping. That's how it goes."${(S.th && S.th.r && S.th.r.name) ? `\n\n"I knew a sergeant went to the Fourteenth," he adds. "${esc(S.th.r.name)}, in the Ninth. Owes me four crowns from a game in Aren. If you see them, tell them I've not forgotten." You are not likely to see them. You say so. He nods. "They never are."` : ''}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* ---- the quartermaster's wagon: oilskins ---- */
    b6_c2_qm:()=>({sp:'The quartermaster', scene:'b6_coast', fx:()=>{ S.f.b6_c2_qm = 1; },
      again:()=>`The quartermaster's wagon, the tarp, the ledger. "Salves are two silver, Sergeant. Before you ask."`, txt:
`The Seventh's quartermaster has a wagon backed up to a tarp, and a ledger under the tarp, and a face that has heard every reason there is. There is a pile of oilskins on the tailboard, Host issue, long coats of oiled canvas that came off the ships this morning.

"First come," the quartermaster says. "One a squad, and I write down who." ${S.f.b6_c2_oilskin ? 'The Fourth\'s is already written down.' : 'Nobody from the Fourth has had theirs yet.'} "Salves are two silver. The surgeons say we'll want more than we've got, and the surgeons are usually right, which is the worst thing about them."`,
      ch:[{t:'The Fourth\'s oilskin.', req:()=>!S.f.b6_c2_oilskin, fx:()=>{ S.f.b6_c2_oilskin = 1; gain('b6_c2_oilskin'); }, go:'b6_c2_qm_coat'},
          {t:'A salve.', tag:'2 silver', req:()=>(S.silver || 0) >= 2 && !S.f.b6_c2_salve, fx:()=>{ S.silver -= 2; updSilver(); S.inv.salve = (S.inv.salve || 0) + 1; S.f.b6_c2_salve = 1; note('+1 salve.', 'good'); }, go:'b6_c2_qm_salve'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_qm_coat:()=>({sp:'The quartermaster', scene:'b6_coast', txt:
`The quartermaster pulls one out of the pile, shakes it, looks at it, and pulls out a better one, which is the nearest a quartermaster comes to a compliment. "Fourth," the quartermaster says, writing it down. "One."${b62Say({brannoc:`\n\nBrannoc holds it up against himself. It comes to his knees. "In Falar," he says, "we call this a shirt."`, brisk:`\n\nBrisk takes it, folds it and puts it on the pack, because the rain has not started to come through the mail yet, and when it does, she will decide.`, _:''})}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b6_c2_qm_salve:()=>({sp:'The quartermaster', scene:'b6_coast', txt:
`Two silver, written down, and a jar of salve with the Host's mark on the wax. "Don't open it in the rain," the quartermaster says. "It doesn't like the rain. Nothing does."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* ---- the fire: a rest, the squad, the fever, the way on (the games pass wraps this node: keep the id) ---- */
    b6_c2_fire:()=>{ const ph = b62Ph(), k = b62Key(), f = b6FeverList(), cureable = b6CanCure() && f.some(id => id !== HEALER());
      return {sp:ph === 1 ? 'The Fourth\'s fire above the sea' : 'The Fourth\'s fire on the march', scene:ph === 1 ? 'b6_coast' : 'b6_camp_night', html:feverHTML(),
        again:()=> ph === 1 ? 'The fire above the sea, under a sail somebody stretched over it.' : ph >= 4 ? 'The fire by the road. The column is ahead, and the road is not empty.' : 'The fire by the road, in the rain, with the empty country all round.', txt:
`${ph === 1 ? `The Fourth's fire, under a scrap of old sail somebody has stretched between two tent poles, so the rain hisses on the canvas and not on the coals. Down the slope the sea comes in, and goes out. West round the bay, Ehrlitan's lamps.` : ph >= 4 ? `A fire in the lee of a broken wall by the road, small, because nobody wants it seen. The column is somewhere ahead, its lamps strung out along the road, and the road between here and there is not empty.` : `A fire by the road, small, in the lee of a broken wall. The country round it is empty: fields nobody has cut, a dog that will not come near, a village on the next rise with no smoke from it.`}${b62If('brannoc', () => `\n\nBrannoc sits at the fire's edge with the whistle in his hands, not playing it${ph === 1 ? ', for once' : ''}.`)}`,
        ch:[b6DeckChoice(2),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f['b6_c2_rest' + ph], fx:()=>{ S.f['b6_c2_rest' + ph] = 1; rest('The Fourth sits an hour by its fire. Wounds close, mostly.'); }, go:'b6_c2_fire_rest'},
            {t:'Talk with the squad.', go:'b6_c2_fire_talk'},
            {t:`Ohl sees to the fever.`, req:()=>cureable, go:'b6_c2_cure'},
            {t:'Brannoc gets the whistle out, and Kettle says something about Falari music.', req:()=>ph === 1 && b6In('brannoc') && b6In('kettle') && !S.f.b6_c2_whistle, go:'b6_c2_whistle'},
            {t:'Ohl is looking west, at the lamps of Ehrlitan.', req:()=>ph === 1 && b6In('ohl') && !S.f.b6_c2_ohlCity, go:'b6_c2_ohl_city'},
            {t:'The order comes down the lines: the Host marches inland at first light.', req:()=>ph === 1 && !!S.f.b6_c2_capt, onward:true, go:'b6_c2_march'},
            {t:'On, after the column.', req:()=>ph >= 4 && !S.f.b6_c2_roadDone, onward:true, go:'b6_c2_bandits'},
            {t:'On, after the column. It is not far now.', req:()=>!!S.f.b6_c2_roadDone, onward:true, go:'b6_c2_column'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c2_fire_rest:()=>({sp:'The fire', scene:b62Ph() === 1 ? 'b6_coast' : 'b6_camp_night', txt:
`An hour by the fire, with the rain on the canvas and the coals ticking.

${b62Say({ohl:`Ohl goes round the squad without asking and looks at feet, which on this coast have been wet for six days, and says "dry them" to each pair, and to some of them twice.`, brisk:`Brisk sits with her back to the wind and her shield across her knees, and is asleep, or looks it.`, _:'One of them sleeps. The others listen to the rain.'})}${b62If('tuft', `\n\nTuft sits close to the fire with her hood up and a lamp lit beside her, though the fire is light enough.`)}${b62If('brannoc', `\n\nBrannoc lies down in the mud on the far side of the fire, wraps himself in a cloak, and snores, at once and very loudly.`)}`,
      ch:[{t:'Back to the fire.', go:'b6_c2_fire'}]}),
    b6_c2_fire_talk:()=>{ const ph = b62Ph(), k = b62Key(), ln = [];
      if (b6In('brisk')) ln.push(ph >= 4 ? (k === 'burn' ? `Brisk is cleaning soot off her shield-rim with her thumb. "Orders," she says. That is all she says about it. She keeps cleaning.` : `Brisk has her eyes on the road behind. "We'll answer for that village," she says. "There'll be asking." She does not sound as if she minds the asking.`) : `Brisk is counting the squad's rations aloud, under her breath, and then counting them again. "Six days of hardtack," she says. "Twelve if nobody's hungry." Everybody is.`);
      if (b6In('kettle')) ln.push(ph >= 2 ? `Kettle has her munitions out on an oilcloth, checking each wax plug for damp. "Wet country," she says. "I hate wet country. Timer-wax hates it worse." She names the cusser, under her breath, and wraps it twice.` : `Kettle sits with her back to the sea. "Six days on a ship," she says, "and you know what the sailors talked about? Fever. The ports we put in at, nobody'd come down to the boats." She checks her ledger. "Didn't want to buy anything, either."`);
      if (b6In('tuft')) ln.push(ph >= 2 ? `Tuft is very quiet tonight, even for Tuft. When you sit by her she says, "The warren's wrong. Meanas. It's like reaching into a pail of something that's gone off." She looks at her hands. "Ohl says Denul's the same. Worse."` : `Tuft is watching the lamps of the command tents up the slope. "Not a soul in or out since dusk," she says, "but the clerks." She turns a card over in her fingers, and does not look at it.`);
      if (b6In('ohl')) ln.push(ph >= 2 ? `Ohl has his tea on, the medicine kind. "Sweat," he says, to nobody. "Shaking. Can't keep water down. That's the start of it, the locals say. After that they say different things." He drinks. "Don't let them drink from the wells."` : `Ohl is boiling his needles. "Ehrlitan," he says, without looking up. "Twenty-two years. They've built on the hill since." He goes on boiling the needles.`);
      if (b6In('brannoc')) ln.push(ph >= 2 ? `Brannoc is mending his boot by the fire. "It doesn't touch Falari," he says, to the boot. "Everyone knows that." He says it again, and this time he looks up at the village on the rise.` : `Brannoc is telling the fire about Sweetcreek. "Her father's a king," he says, "on one of the islands. Not a big island. She'd knock you flat for saying it. She knocked me flat once." He sounds proud.`);
      if (b6In('ellis')) ln.push(`Ellis has her bow unstrung and wrapped against the wet. "Nothing on the road at night," she says. "No carts, no runners, nobody. In this country there's always somebody."`);
      if (b6In('vell')) ln.push(`Vell is coiling a wet rope and coiling it again. "Rope goes bad in this," he says. "So do people."`);
      if (b6In('sohra')) ln.push(`Sohra sits with her bones in her lap. "The spirits here are thin," she says. "They go past in a hurry, all one way. Inland."`);
      if (b6In('greysword')) ln.push(`Dannet sits with her hand on the wolf on her cloak. "A plague has no throat," she says. "You can't fight it." She does not seem to like the idea of a thing she can't fight.`);
      return {sp:'The fire', scene:ph === 1 ? 'b6_coast' : 'b6_camp_night', txt:ln.length ? ln.join('\n\n') : 'You sit by the fire on your own, with the rain, and think about the Fourth as it used to be.',
        ch:[{t:'Back to the fire.', go:'b6_c2_fire'}]}; },
    b6_c2_whistle:()=>({sp:'The fire', scene:'b6_coast', fx:()=>{ S.f.b6_c2_whistle = 1; b62L('brannoc', 1); b62L('kettle', 1); }, txt:
`Brannoc gets the tin whistle out and plays the first bars of something Falari, very badly.

"That's not how it goes," Kettle says.

"It's how it goes on my island."

"On your island they can't tell a whistle from a goat." Kettle holds out her hand. He gives her the whistle. She wipes it, very thoroughly, on her sleeve, and plays the same tune, slightly less badly, and slightly differently.

They argue about it for an hour. Neither of them gives an inch. By the end of it ${b62Say({brisk:'even Brisk is listening, from behind her shield, with her eyes shut', ohl:'Ohl is tapping the tune on his stick', _:'the squad is listening'})}, and the rain has eased, and nobody has said the word fever for an hour.`,
      ch:[{t:'Back to the fire.', go:'b6_c2_fire'}]}),
    b6_c2_ohl_city:()=>({sp:'Ohl', scene:'b6_coast', fx:()=>{ S.f.b6_c2_ohlCity = 1; b62L('ohl', 1); }, txt:
`Ohl stands at the edge of the firelight with his stick, looking west round the bay at the lamps of Ehrlitan.

"I was a temple healer there," he says, when you come and stand by him. "Before the Empire. Before you were born, Sergeant, very likely. The D'rek priests had the big house on the hill, and they were better than us, and they knew it, and they were right." He is quiet for a while. "I knew some of them. Not well. Well enough to argue with."

"The Worm of Autumn," he says. "Decay, and what comes after it. They used to say a healer has to know the one to argue with the other." He turns away from the lamps. "Every one of them killed, and now there's a fever. I don't believe in coincidences, Sergeant. I'm too old."`,
      ch:[{t:'Back to the fire.', go:'b6_c2_fire'}]}),

    /* ---- the fever: who has it, and Ohl's Denul to break it (the warren is sick this season; it costs him) ---- */
    b6_c2_cure:()=>{ const h = HEALER(), sick = b6FeverList().filter(id => id !== h);
      return {sp:h ? NAME(h) : 'The fever', scene:b62Ph() === 1 ? 'b6_coast' : 'b6_camp_night', html:feverHTML(),
        fx:()=>{ const hh = HEALER(); b6FeverList().filter(id => id !== hh).forEach(id => b6Cure(id, 'Denul, at the fire')); if (hh) { bruise(hh, bruiseN()); S.f.b6_c2_cured = 1; } }, txt:
`${h ? NAME(h) : 'The healer'} sits ${sick.length > 1 ? 'each of them' : sick[0] === 'sgt' ? 'you' : sick.length ? NAME(sick[0]) : 'the sick one'} by the fire, and puts a hand flat on the back of the neck, and closes his eyes.

It takes a long time. When he reaches into Denul, the fire gutters as if a door had opened somewhere, and his face goes grey, and stays grey. "It's in the warren," he says, through his teeth. "It's in the warren too. Like reaching through sick." He keeps the hand where it is.

Then the shaking stops. The sweat cools. ${sick.length > 1 ? 'One after another, they' : sick[0] === 'sgt' ? 'You' : 'The sick one'} can keep water down.

${h ? NAME(h) : 'The healer'} sits back on his heels and is sick himself, neatly, off to one side, and wipes his mouth. "That's the warren's price," he says. "Not the fever's. I'll be grey for a day. Don't tell Brisk." ${b6Fevered(h) ? '\n\nHe does not treat himself. "It doesn\'t work that way round," he says. "Ask any healer in Ehrlitan."' : ''}`,
        ch:[{t:'Back to the fire.', go:'b6_c2_fire'}]}; },

    /* ---- down to the shore ---- */
    b6_c2_to_shore:()=>({sp:'The way down to the shore', scene:'b6_coast', txt:
`A path goes down the slope from the end of the tent rows to the beach, where the Falari have their boats drawn up and their own fires going.`,
      ch:[{t:'Down to the shore.', req:()=>b62Ph() === 1, onward:true, go:()=>{ startExplore('b6_c2_shore'); talk('b6_c2_shore_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_shore_arrive:()=>({sp:'The shore', scene:'b6_coast', fx:()=>{ S.f.b6_c2_shore = 1; }, txt:
`The beach under the camp is shingle and then sand, and the sea comes up it grey in the dusk. Sweetcreek's Falari have their own boats drawn up above the tide-line, long island boats with high prows, and they have their own fires, and their own songs, and they keep to them.

Along the shore to the east, a headland goes out into the sea, with something small and stone on the end of it. A shrine, a Falari tells you, without being asked. "D'rek's. There were priests. There were." He goes back to his fire.${b62If('brannoc', `\n\nBrannoc waves to somebody at the Falari fires, and somebody waves back, and somebody else throws a boot at him.`)}`,
      ch:[{t:'Walk the shore.', go:()=>startExplore()}]}),
    b6_c2_to_camp:()=>({sp:'The way up to the camp', scene:'b6_coast', txt:
`The path back up the slope to the tent rows, and the Fourth's fire.`,
      ch:[{t:'Up to the camp.', onward:true, go:()=>startExplore('b6_c2_camp')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_boats:()=>({sp:'The Falari boats', scene:'b6_coast', fx:()=>{ S.f.b6_c2_boats = 1; },
      again:()=>`The Falari boats on the shingle, and the Falari at their fires.`, txt:
`The boats are long and black-tarred, with prows that go up high and come to a point, and every one of them has an eye painted on the bow, so it can see where it is going. The Falari sit by them and mend things.

Further along, by the biggest of the fires, a woman in a captain's cloak is standing with her arms folded, listening to a Falari sergeant, and the sergeant is talking fast. She is red-haired, and not tall, and the whole fire is arranged round her without anyone having been told to. Captain Sweetcreek, you would guess. You do not go nearer.${b62Say({brannoc:`\n\n"That's her," Brannoc says, low. "Don't let her see me. She'll think of something for me to do."`, kettle:`\n\nKettle looks at the eyes on the bows and touches her own brow, quickly, an old Falari habit she has never once admitted to.`, _:''})}`,
      ch:[{t:'Back along the shore.', go:()=>startExplore()}]}),

    /* ---- the old sail-mender: the trick ---- */
    b6_c2_mender:()=>({sp:'An old Falari sail-mender', scene:'b6_coast', txt:
`An old woman sits on an upturned boat with a sail across her knees and a needle the length of a finger, and sews, with her eyes on the seam. Her hands are brown and spotted and as quick as a girl's.

"Squall coming," she says, before you can speak. "After midnight. From there." She points the needle out to sea, at nothing anyone else can see. "You feel it on the back of the neck. Then you feel it let go. There's a breath between the front and the back where the wind stops pulling. A breath. On the islands we teach it to children before swimming."

She bites off a thread. "A soldier could use that, standing in a line. Everything pulling you over, and then it stops. You stand easy in it." She looks at the squad at last. "Sit. Watch the sea. Tell me when."`,
      ch:[{t:'"Show us."', check:['wits', 17], trick:'b6_c2_weather', req:()=>!S.f.b6_c2_weatherTried, fx:()=>{ S.f.b6_c2_weatherTried = 1; },
            edges:id=>[id === 'brannoc' && ['he was taught it as a child, and forgot', 2], id === 'kettle' && ['she is Falari, under the soot', 2], id === 'sgt' && ['you have stood in a lot of lines', 1], id === 'brisk' && ['she would rather stand than watch', -1], id === 'tuft' && ['she is watching the shadows, not the sea', -1]],
            near:{t:()=>{ const w = b62Who(); return `Yes, but she keeps ${b62Nm(w)} on the boat until the squall comes in after midnight, to be sure, and ${w === 'sgt' ? 'you are' : NAME(w) + ' is'} soaked to the skin and shaking by the time she is.`; }, fx:()=>bruise(b62Who(), bruiseN())},
            go:'b6_c2_weather_ok', fail:'b6_c2_weather_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_weather_ok:()=>({sp:'An old Falari sail-mender', scene:'b6_coast', fx:()=>{ S.f.b6_c2_weatherOk = 1; }, txt:
`${by({sgt:'You sit', _:'{who} sits'})} on the next boat and watches the sea, and the dark coming over it, and ${by({sgt:'say', _:'says'})} "now" four times, and is wrong four times. The fifth time ${by({sgt:'you feel', _:'{who} feels'})} it: the back of the neck goes cold, and the wind leans, and leans, and then lets go, for a breath, as if the whole sky had sighed.

"There," the old woman says. "That. Not sorcery. No god in it. Just wind, and the back of your neck." She goes back to the sail. "Stand easy in it. Everything else will be falling over."`,
      ch:[{t:'"Thank you." Back along the shore.', go:()=>startExplore()}]}),
    b6_c2_weather_no:()=>({sp:'An old Falari sail-mender', scene:'b6_coast', txt:
`${by({sgt:'You watch', _:'{who} watches'})} the sea until it is all the same sea, and the wind pulls and pulls and never once lets go.

"You're watching the water," the old woman says. "Watch the back of your neck." She bites off a thread. "Islanders get it. Mainlanders mostly don't. Come back when you've been rained on more."`,
      ch:[{t:'Back along the shore.', go:()=>startExplore()}]}),
    b6_c2_mender_again:()=>({sp:'An old Falari sail-mender', scene:'b6_coast', again:()=>`The old woman, sewing. "Squall after midnight."`, txt:
`The old woman is still sewing. ${S.f.b6_c2_weatherOk ? '"Felt it yet?" she says, without looking up. "You will."' : '"Still raining," she says. "Good for you."'}${b62If('brannoc', ' She looks at Brannoc and says something in Falari, short. He goes red to the ears.')}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the headland: the D'rek shrine, looters at it (optional) ---- */
    b6_c2_to_shrine:()=>({sp:'The headland', scene:'b6_coast', txt: S.f.b6_c2_shrineDone ?
`The shrine on the headland stands with its door shut and a Host picket on it now. The captain sent one, when the Fourth reported.` :
`Along the shore to the end of the headland, in the last of the light. The shrine is small, stone, with a worm carved over its door eating its own tail. The door is open. There is a handcart outside it, and figures going in and out with their arms full.${b62If('ohl', `\n\nOhl stops, and leans on his stick, and looks at the carving over the door for a long time.`)}`,
      ch:[{t:'"Host. Put it down."', req:()=>!S.f.b6_c2_shrineDone, go:()=>startBattle('b6_c2_shrine', {})},
          {t:'Round the rocks below the headland, quiet, and come up behind the cart.', check:['guile', 15], req:()=>!S.f.b6_c2_shrineDone,
            edges:id=>[id === 'tuft' && ['shadows are hers, even wet ones', 2], id === 'ellis' && ['she was trained to be unseen', 1], id === 'kettle' && ['a smuggler knows a landing below a headland', 1], id === 'brisk' && ['there is no quiet way for Brisk in mail', -2], id === 'brannoc' && ['he is humming', -1]],
            near:{t:()=>{ const w = b62Who(); return `Yes, but ${b62Nm(w)} ${b62V(w, 'go', 'goes')} into a rock pool to the waist on the way round, and comes up the headland with ${b62His(w)} teeth going: rattled.`; }, fx:()=>b62Rattle(b62Who())},
            go:()=>startBattle('b6_c2_shrine', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c2_shrine_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_shrine_seen:()=>({sp:'The headland', scene:'b6_coast', txt:
`The rocks below the headland are slick with weed. A boot goes, and a shield rings on stone, and up at the shrine door every head turns at once.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c2_shrine', {surprise:'e'})}]}),
    b6_c2_shrine_after:()=>({sp:'The shrine on the headland', scene:'b6_coast', fx:()=>{ if (!S.f.b6_c2_shrineDone) { S.f.b6_c2_shrineDone = 1; S.f.b6_c2_drekHeard = 1; gain('b6_c2_drekcharm'); } }, txt:
`The looters go off along the headland and down onto the rocks, and leave the cart.

The shrine's door is open. Inside it is small and dark and smells of incense gone stale and of something under that. The priests are there. There were two. They have been dead some days, and it was not the fever. The squad goes no further in than the door.

${b62Say({ohl:`Ohl goes in. You let him. He is in there a while, and when he comes out he has a little coil of bronze on a cord, a worm eating its tail, and he gives it to you. "They gave these to the sick," he says. "One of them should still be worn." That is all he has to say about it.`, _:'On the cart, among the brass, is a little coil of bronze on a cord, a worm eating its tail. The squad takes that, and leaves the brass on the step for the Host to deal with.'})}

The squad reports it at the top of the slope. The captain sends a picket, and writes it down, and is not surprised.`,
      ch:[{t:'Back along the shore.', go:()=>startExplore()}]}),

    /* ---- the march inland ---- */
    b6_c2_march:()=>({sp:'The march', scene:'b6_coast', fx:()=>{ S.f.b6_c2_ph = Math.max(2, S.f.b6_c2_ph || 1); }, txt:
`The order comes down the lines in the dark, sergeant to sergeant: the Host marches at first light, inland, south. Strike the tents. Load the wagons. Leave the palisade.

At first light the Host goes up off the coast in a long column, in rain, with the ships still riding behind it and Ehrlitan's lamps going out one by one along the bay. ${b62Say({brisk:'Brisk has the Fourth\'s packs checked before you have finished giving the order to check them.', _:'The Fourth falls in where the Seventh falls in.'})}

The captain comes down the company once, on foot. "Scouts say the villages along this road are empty," the captain says. "Some of them aren't. No wells. No houses." A pause. "I'll say it every morning until you're sick of it."${b62If('brannoc', `\n\nBrannoc falls in beside you with his axe on his shoulder and starts to sing. Somewhere behind, the whole Falari line takes it up, which settles the question of where he learned it.`)}`,
      ch:[{t:'Inland.', onward:true, go:()=>{ startExplore('b6_c2_road'); talk('b6_c2_road_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b6_c2_to_road:()=>({sp:'The road inland', scene:'b6_coast', txt: b62Ph() === 1 ?
`The road inland goes up off the coast between the hills. The Host is not marching yet. The captain wants the Fourth in the lines until the order comes.` :
`The road inland, after the column.`,
      ch:[{t:'Inland.', req:()=>b62Ph() >= 2, onward:true, go:()=>startExplore('b6_c2_road')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the plague road: empty country ---- */
    b6_c2_road_arrive:()=>({sp:'The road inland', scene:'b6_plague_village', txt:
`Two days inland, and the rain has not stopped once.

The country is low hills and fields, and the fields have not been cut. The first hamlet the column passes has its doors open. So does the second. At the third, a dog stands in a doorway and watches the Host go by and does not bark, and does not come out. No one else comes out either.

The Seventh is at the tail of the column today, and the tail is where the stragglers come up, and where the road is quietest. Off to the side of it, a little way, there is a cluster of houses round a well, with a wall round them, and nobody in them.${b62Say({ohl:`\n\nOhl has a scarf over his mouth and nose already. He hands out others without a word. They smell of vinegar.`, _:''})}`,
      ch:[{t:'Walk the road.', go:()=>startExplore()}]}),
    b6_c2_house:()=>({sp:'An empty house', scene:'b6_plague_village', fx:()=>{ S.f.b6_c2_house = 1; }, txt:
`The door is open. Inside, from the step, a table with bowls on it, and a chair pushed back, and a loom with the cloth half done and the shuttle still in it. Nobody. Whoever lived here went in a hurry, or went in another way.

The squad stays on the step. The captain said.${b62Say({tuft:`\n\nTuft looks at the loom, and then away. "My mother had one like that," she says, which is the first thing anybody in the Fourth has heard about Tuft's mother.`, brannoc:`\n\nBrannoc looks in over your shoulder and is quiet, which for Brannoc is a great deal.`, _:''})}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b6_c2_well:()=>({sp:'The hamlet well', scene:'b6_plague_village', txt: S.f.b6_c2_wellTried ?
`The well, with its stone lip and its bucket on a rope. ${S.f.b6_c2_wellOk ? 'Nobody in the squad goes near it now.' : 'The squad\'s skins are full, and a stomach or two is not happy about it.'}` :
`The hamlet's well has a stone lip and a bucket on a rope, and the water at the bottom is a long way down and black. The squad's skins are low. It has been two days of rain and nothing to catch it in.

Someone has to decide whether this water is good.`,
      ch:[{t:'Look at the well before anybody drinks from it.', check:['wits', 15], req:()=>!S.f.b6_c2_wellTried, fx:()=>{ S.f.b6_c2_wellTried = 1; },
            edges:id=>[id === 'ohl' && ['he was a healer in this country before the Empire came', 2], id === 'kettle' && ['she has smelled bad water in a dozen ports', 1], id === 'sgt' && ['you have marched in Seven Cities before', 1], id === 'brannoc' && ['he thinks it cannot touch a Falari', -2]],
            near:{t:()=>{ const w = b62Who(); return `Yes, but ${w === 'sgt' ? 'you' : NAME(w)} drank from that well before ${b62V(w, 'you', b62Him(w) === 'him' ? 'he' : 'she')} looked at it.`; }, fx:()=>{ b6Catch(b62Who(), 'the hamlet well'); S.f.b6_c2_wellSick = b62Who(); }},
            go:'b6_c2_well_ok', fail:'b6_c2_well_no'},
          {t:'Leave it.', go:()=>startExplore()}]}),
    b6_c2_well_ok:()=>({sp:'The hamlet well', scene:'b6_plague_village', fx:()=>{ S.f.b6_c2_wellOk = 1; }, txt:
`${by({sgt:'You lower', _:'{who} lowers'})} the bucket and bring${by({sgt:'', _:'s'})} it up and look${by({sgt:'', _:'s'})} at it, and smell${by({sgt:'', _:'s'})} it, and pour${by({sgt:'', _:'s'})} it back. There is a film on it, and a smell under the smell of wet stone that nobody wants to name.

"No," ${by({sgt:'you say', ohl:'Ohl says', _:'{who} says'})}. "Nobody."

The squad fills its skins from the rain off a roof instead, slowly, a cupped hand at a time, and nobody complains about the taste.${b62If('brannoc', `\n\nBrannoc, who had the dipper halfway to his mouth, puts it down. "Wasn't going to," he says.`)}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b6_c2_well_no:()=>({sp:'The hamlet well', scene:'b6_plague_village', txt:
`${by({sgt:'You look', _:'{who} looks'})} at the water and it looks like water, black and cold and a long way down. The squad fills its skins.

Later, a mile on, ${by({sgt:'you think', _:'{who} thinks'})} about the film on the bucket, and the smell, and the skins are already full.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b6_c2_road_on:()=>{ const ph = b62Ph();
      return {sp:'The road', scene:'b6_plague_village', txt: ph === 2 ?
`The road goes on east over the rise. There is a village on the far side, the scouts say, off the road a little. No one came out to meet the column, or to rob it, which in this country is worse.

The captain sends the Fourth to look.` : ph === 3 ?
`The village, over the rise.` : ph >= 5 ?
`The road on south, after the column.` :
`The road east, after the column. The light is going. The column's lamps are a long way ahead, and the ditches along the road are deep, and full of rain.`,
        ch:[{t:'To the village.', req:()=>ph === 2 || ph === 3, onward:true, go:()=>{ startExplore('b6_c2_vil'); if (!S.f.b6_c2_villageDone) talk('b6_c2_village_arrive'); }},
            {t:'On, after the column.', req:()=>ph === 4 && !S.f.b6_c2_roadDone, onward:true, go:'b6_c2_bandits'},
            {t:'On, after the column.', req:()=>!!S.f.b6_c2_roadDone, onward:true, go:'b6_c2_column'},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ---- the village where the dead were left ---- */
    b6_c2_village_arrive:()=>({sp:'A village', scene:'b6_plague_village', fx:()=>{ S.f.b6_c2_ph = Math.max(2, S.f.b6_c2_ph || 1); }, txt:
`The village is two streets and a well and a wall round all of it. The doors are open. There are no lamps.

The dead are in the houses, unburied, because there was no one left to bury them. You see that from the street, through the open doors, and you see it once, and once is enough.

There are people in the street. Not the people who lived here. They have scarves over their faces and sacks over their shoulders, and they are going from door to door, in and out, with a lamp hooded low. One of them laughs at something. It carries in the rain.${b62Say({ohl:`\n\nOhl's hand tightens on his stick until the knuckles go white. "Robbing them," he says. "Robbing the dead in the houses, and carrying it out on their backs to the next village." He says something in Ehrlii that is not a prayer.`, brisk:`\n\nBrisk sets her shield. "Sergeant," she says.`, _:''})}${b62If('brannoc', `\n\nBrannoc has stopped humming.`)}`,
      ch:[{t:'"Host. Drop the sacks." Into the street.', req:()=>!S.f.b6_c2_villageDone, go:()=>startBattle('b6_c2_village', {})},
          {t:'Along the back of the houses, quiet, to come at them from the well.', check:['guile', 16], req:()=>!S.f.b6_c2_villageDone,
            edges:id=>[id === 'tuft' && ['the dark is hers', 2], id === 'ellis' && ['she was taught to be unseen', 1], id === 'vell' && ['he goes over walls for a living', 1], id === 'brisk' && ['mail does not go quietly', -2], id === 'brannoc' && ['he is very large', -1]],
            near:{t:()=>{ const w = b62Who(); return `Yes, but the back way goes through a yard nobody should have gone through, and ${b62Nm(w)} ${b62V(w, 'see', 'sees')} what is in it, and ${b62V(w, 'carry', 'carries')} it into the fight: rattled.`; }, fx:()=>b62Rattle(b62Who())},
            go:()=>startBattle('b6_c2_village', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c2_village_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_village_seen:()=>({sp:'A village', scene:'b6_plague_village', txt:
`The back of the houses is a run of yards and walls in the dark. A gate swings. A man with a hooded lamp turns, and shouts, and the lamp comes unhooded.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c2_village', {surprise:'e'})}]}),
    b6_c2_village_after:()=>({sp:'A village', scene:'b6_plague_village', html:feverHTML(), fx:()=>{ if (!S.f.b6_c2_villageDone) { S.f.b6_c2_villageDone = 1; S.f.b6_c2_ph = Math.max(3, S.f.b6_c2_ph || 1); } }, txt:
`The last of them go over the wall into the fields and keep going, and leave their sacks, and the cart in the yard, and the big man face down by it.

The squad stands in the street in the rain, breathing, with the scarves over their faces, and nobody touches the sacks.

${b6FeverList().length ? `By the time the squad has its breath back, ${b62And(b6FeverList().map(b62Nm))} ${b6FeverList().length > 1 || b6FeverList()[0] === 'sgt' ? 'are' : 'is'} sweating in the cold, and shaking, and ${b6FeverList().length > 1 ? 'they are' : b6FeverList()[0] === 'sgt' ? 'you are' : b62Him(b6FeverList()[0]) === 'him' ? 'he is' : 'she is'} not saying so.` : 'Nobody in the squad is sweating in the cold. Not yet.'}${b62Say({ohl:`\n\nOhl looks at every face in the squad, one after another, close, with his hand on each forehead. "Tonight," he says. "At the fire. Not here."`, _:''})}

A runner is coming up the road from the column.`,
      ch:[{t:'Meet the runner.', onward:true, go:'b6_c2_order'},
          {t:'Walk the street.', go:()=>startExplore()}]}),
    b6_c2_houses:()=>({sp:'The houses', scene:'b6_plague_village', txt:
`The houses stand with their doors open. The squad stays in the street. You do not need to go in.${b62Say({ohl:`\n\nOhl stands at one door with his scarf over his face, and says the names of the Ehrlii dead, the old prayer, quietly, for whoever is inside.`, brisk:`\n\nBrisk walks the street end to end, and back, and looks in at nothing.`, _:''})}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b6_c2_vwell:()=>({sp:'The village well', scene:'b6_plague_village', txt:
`The village well, with a dead bird floating in it. ${S.f.b6_c2_wellOk ? 'The squad needs no telling.' : 'The squad drinks from the skins.'}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* ---- the order to fire the village, and the family in the last house: the key ---- */
    b6_c2_order:()=>({sp:'A runner from the column', scene:'b6_plague_village', fx:()=>{ S.f.b6_c2_order = 1; S.f.b6_c2_ph = Math.max(3, S.f.b6_c2_ph || 1); },
      again:()=>`The runner, waiting in the rain. "Fire it, the captain says. Then catch up."`, txt:
`The runner is a boy from the Seventh's clerks with mud to the thighs and a waxed tablet. He stops well short of the first house and stays there.

"The captain's orders," he says. "From the Fist's tent, the captain says. Every village on the road with the dead in it, fire it. So it doesn't go on. So nobody else comes to rob it and carry it on." He looks at the houses and away. "Then catch up. The column's not stopping."

He goes. Halfway back down the road he stops and calls back, "There's somebody in the last house. On the left. I saw a light," and then he goes on, faster.${b62Say({kettle:`\n\nKettle looks at the houses, and then at her satchel, and then at you. "I've two burners," she says. "That's a street. Or a lot of torches and a long night." She does not say which she would rather.`, _:''})}`,
      ch:[{t:'To the last house.', onward:true, go:'b6_c2_lasthouse'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b6_c2_lasthouse:()=>{ const k = b62Key();
      if (k) return {sp:'The last house', scene:'b6_plague_village', txt: k === 'burn' ?
`The last house is a black shell with the rain hissing in it. Up the hill path, nothing.` :
`The last house has its door shut now, and a thread of smoke from the chimney. The door stays shut, and the squad does not knock.`,
        ch:[{t:'Back to the street.', go:()=>startExplore()}]};
      return {sp:'The last house', scene:'b6_plague_village', txt:
`The last house on the left has its shutters closed, the only one in the village that does. There is a light behind them, very small. When you knock on the door with the pommel, the light goes out.

After a while the door opens a hand's width. An old man, a woman, a boy behind her, in the dark of the room. None of them is sweating. None of them is shaking. They have been in here, the woman says, since the first of the village got sick, with the door shut and the shutters closed, and they have not opened them to anybody. They have water from the roof. They had food. They had.

"You are soldiers," the old man says. "You are going to burn it."

${b62Say({ohl:`Ohl stands back from the door, as the captain said, and looks at the three of them the way he looks at a wound. "They're clean," he says, low. "So far. If they go out on the road with the rest of the country, they won't be by morning."`, brisk:`Brisk stands back from the door with her shield and waits for the order. Either order.`, _:'The squad stands back from the door, and waits for you.'})}${b62If('brannoc', `\n\nBrannoc has taken his helm off, in the rain, without seeming to notice.`)}${b62If('kettle', `\n\nKettle has a burner in her hand. She has not cracked the timer.`)}`,
        ch:[{t:'"The Fist says fire it. Get out, up the hill path, now. Then we burn it."', fx:()=>{ S.f.b6_c2_key = 'burn'; S.f.b6_c2_ph = 4; S.f.b6_c2_family = 'fled';
              b62L('brisk', 1); b62L('ohl', -1); b62L('brannoc', -1); if (b6In('kettle') && (S.inv.burner || 0) > 0) { S.inv.burner -= 1; S.f.b6_c2_burner = 1; note('−1 burner.', 'bad'); } }, go:'b6_c2_burn'},
            {t:'"We go round. The roofs stay. Shut the door, and keep it shut."', fx:()=>{ S.f.b6_c2_key = 'pass'; S.f.b6_c2_ph = 4; S.f.b6_c2_family = 'roofs';
              b62L('ohl', 1); b62L('brannoc', 1); b62L('brisk', -1); const w = b62Carrier(); if (w) { b6Catch(w, 'the family in the last house'); S.f.b6_c2_passWho = w; } }, go:'b6_c2_pass'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b6_c2_burn:()=>({sp:'The village', scene:'b6_plague_village', txt:
`The old man looks at you, and at the shields, and at the street. Then he goes back in, and comes out with a bundle, and the woman has the boy by the hand, and the three of them go out of the village by the hill path without looking back, into the rain. The squad keeps its distance, and its hands off the bundle.

${S.f.b6_c2_burner ? 'Kettle cracks the burner\'s timer with her thumb, her hands cupped round it against the rain, and throws it through the first open door, and then the second, from the street, the way she would throw it at anything. "Don\'t breathe the smoke," she says.' : 'The squad does it with torches from the street, through the open doors, and does not go in. It takes a long time in the rain, and then it does not.'}

By the time the squad is back on the road, the village is burning end to end, and the smoke goes flat and grey across the fields in the wind. Up the hill, on the path, nothing.${b62Say({ohl:`\n\nOhl walks at the back of the squad all the way to the road, with his scarf still over his face.`, _:''})}${b62If('brannoc', `\n\nBrannoc walks beside you with his helm under his arm. "Falari don't burn houses," he says, after a while. "We burn boats, when somebody's died in them. It's not the same." He puts the helm back on.`)}${b62If('brisk', `\n\nBrisk says, "Orders," to nobody, once.`)}`,
      ch:[{t:'Back to the road, after the column.', onward:true, go:()=>{ startExplore('b6_c2_road'); talk('b6_c2_road_back'); }}]}),
    b6_c2_pass:()=>{ const w0 = S.f.b6_c2_passWho, w = w0 === 'sgt' || (TPL[w0] && w0 !== 'sgt') ? w0 : null;
      return {sp:'The village', scene:'b6_plague_village', html:feverHTML(), txt:
`The woman shuts the door. The order is not mentioned again. The runner is long gone, and the column is not stopping, and the captain is a long way up the road.

Before it goes, the squad fills a pot from the rain off the roof of the next house and carries it to the last house's door, and leaves it on the step, and knocks once, and steps back. ${w ? `${w === 'sgt' ? 'You carry' : NAME(w) + ' carries'} the pot, and ${w === 'sgt' ? 'set' : 'sets'} it down, and ${w === 'sgt' ? 'go' : 'goes'} back for another, and another, through a yard and past a door that should not have been gone past.` : ''}

By the time the squad is back on the road, there is a thread of smoke from the last house's chimney, and nowhere else in the village.${w ? `\n\nBy nightfall ${w === 'sgt' ? 'you are' : NAME(w) + ' is'} sweating in the cold.${w === 'brannoc' ? ' "Doesn\'t touch a Falari," Brannoc says, through his teeth, and laughs, and is sick by the road.' : ''}` : ''}${b62Say({ohl:`\n\nOhl walks beside you to the road. "We'll answer for it," he says. "Not to the captain. To the fever." He does not sound sorry.`, _:''})}${b62If('brisk', `\n\nBrisk looks back at the chimney once, and then at you, and says nothing at all.`)}`,
        ch:[{t:'Back to the road, after the column.', onward:true, go:()=>{ startExplore('b6_c2_road'); talk('b6_c2_road_back'); }}]}; },
    b6_c2_vil_out:()=>({sp:'The way out of the village', scene:'b6_plague_village', txt: !S.f.b6_c2_villageDone ?
`The road back is south. The captain sent the Fourth to look at the village, and the Fourth has not looked yet.` : !b62Key() ?
`The road back is south, and the column is going on without the Fourth. There is the order, and the last house.` :
`The road back south, after the column.`,
      ch:[{t:'Back to the road.', req:()=>!!b62Key(), onward:true, go:()=>{ startExplore('b6_c2_road'); talk('b6_c2_road_back'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- back on the road: the bandits ---- */
    b6_c2_road_back:()=>({sp:'The road', scene:'b6_plague_village', html:feverHTML(), fx:()=>{ S.f.b6_c2_ph = Math.max(4, S.f.b6_c2_ph || 1); },
      again:()=>`The road, in the rain, with the column's lamps ahead.`, txt:
`The road again, at dusk, with the column's lamps strung out far ahead of it like a necklace somebody dropped. ${b62Key() === 'burn' ? 'Behind the squad, the smoke from the village lies flat across the fields.' : 'Behind the squad, the village sits on its rise with one chimney going.'}

The Fourth makes a small fire by the broken wall of the empty hamlet, to dry its feet and see to its own, before it goes on after the column.`,
      ch:[{t:'To the fire.', go:'b6_c2_fire'},
          {t:'Walk the road.', go:()=>startExplore()}]}),
    b6_c2_bandits:()=>({sp:'The plague road', scene:'b6_plague_village', fx:()=>{ S.f.b6_c2_ph = Math.max(4, S.f.b6_c2_ph || 1); }, txt:
`The road goes on into the dark between deep ditches full of rain, and the column's lamps are a long way ahead.

${b62Say({ellis:'Ellis stops, and puts a hand up. "Ditch," she says. "Both sides. Breathing."', kettle:'Kettle stops. "Ditch," she says, very low. "Left side. I can smell their fire, they put it out too late."', _:'Something moves in the ditch on the left, and something answers it in the ditch on the right.'})}

They have been waiting for whoever runs from the villages. Tonight it is the Fourth, a mile behind the Host, with packs and boots and full water-skins.${b62If('brannoc', `\n\nBrannoc puts his helm on and takes the axe off his shoulder. "Oh good," he says.`)}`,
      ch:[{t:'"Shields." Walk on, and let them come.', go:()=>startBattle('b6_c2_road', {})},
          {t:'Get off the road and into the ditch first, before they are ready.', check:['might', 16],
            edges:id=>[id === 'brisk' && ['she is through a ditch before most people are into it', 2], id === 'brannoc' && ['he is very large and quite fast', 1], id === 'sgt' && ['you have done this on a road before', 1], id === 'tuft' && ['she is small and the ditch is deep', -2], id === 'ohl' && ['he is fifty-eight', -2]],
            near:{t:()=>{ const w = b62Who(); return `Yes, but the ditch is deeper than it looks, and ${b62Nm(w)} ${b62V(w, 'come', 'comes')} up out of it to the chest in rainwater, with the shield full of it.`; }, fx:()=>bruise(b62Who(), bruiseN())},
            go:()=>startBattle('b6_c2_road', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c2_bandits_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c2_bandits_seen:()=>({sp:'The plague road', scene:'b6_plague_village', txt:
`The bank goes out from under a boot, and the squad goes into the ditch in a slide of mud, and comes up in the middle of them, with the wrong foot forward and the wrong side open.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c2_road', {surprise:'e'})}]}),
    b6_c2_road_after:()=>({sp:'The plague road', scene:'b6_plague_village', html:feverHTML(), fx:()=>{ if (!S.f.b6_c2_roadDone) { S.f.b6_c2_roadDone = 1; S.f.b6_c2_ph = 5; gain('b6_c2_falariaxe'); b62Silver(6, 'what the bandits had on them, which was not much'); } }, txt:
`The ones who can still run go off into the fields, and the rain closes behind them.

The chief is in the road. His axe is Falari work, island iron on an ash haft, broad in the blade and bearded. Where he had it from, nobody asks him.${b62Say({brannoc:`\n\nBrannoc picks it up, and weighs it, and looks at the edge, and at the maker's mark on the cheek, and is quiet for a while. "Not one of ours," he says, "that he took it off." He sounds as if he would like to believe it. He hands it to you.`, kettle:`\n\nKettle looks at the maker's mark on the axe's cheek and says the name of an island, and spits.`, _:''})}

There are six silver among the rest of them, and some bread nobody will eat. The squad takes the silver.`,
      ch:[{t:'On, after the column.', onward:true, go:'b6_c2_column'}]}),

    /* ---- the column, and the chapter's end ---- */
    b6_c2_column:()=>({sp:'The column', scene:'b6_plague_village', html:feverHTML(), txt:
`The Fourth comes up with the Seventh's rearguard in the small hours, and falls in, and the rearguard asks no questions. The captain walks back down the company once, at dawn, and looks at the squad, ${b62Key() === 'pass' ? 'and at the road behind it, where there is no smoke' : 'and at the soot on the squad\'s shields'}, and goes back up the column without a word.

The Host goes on south, inland, in the rain. Somewhere ahead, the scouts say, there is a city called G'danisban, and the High Fist means to stop before it. Somewhere behind, the villages.

${b6In('brannoc') ? `Brannoc marches beside you, with his whistle in his teeth, not playing it. "The Seventh's got its numbers," he says, after a while. "The captain'll want to send me back to Sweetcreek." He walks on. "Don't let him."` : b62Near() ? `Somewhere back in the Falari line, a tin whistle is playing very badly. Brannoc is still loaned to the Seventh, and the roster at any fire can send for him.` : ''}${b62If('ohl', `\n\nOhl walks at the back of the squad, as he always does, so he can see them all.`)}${b62If('tuft', `\n\nTuft walks with her hood up and her hand in her sleeve, on the cards.`)}${b62If('kettle', `\n\nKettle walks with her satchel held against her chest, out of the rain.`)}${b62If('brisk', `\n\nBrisk walks at the front, where she always walks, and the rain comes off her shield in a sheet.`)}`,
      ch:[{t:'South.', onward:true, go:()=>chapterEnd(2, b62Key() || 'burn')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
