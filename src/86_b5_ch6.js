/* ============ Book Five, Chapter 6: Brans Keep ============ */
/* The army of Lether stands at Brans Keep (Midnight Tides ch 22-23; mt-canon §7.2, §8, §9, §17c). Phase 1, the eve: the Whitefinders on
   the right, across the dry channel, with the Artisans and the other part of the Riven; the order of battle heard as orders "from the
   Preda" and seen as banners (the Crimson Rampant far left by the river, the Snakebelt and part of the Riven before the ridge, the King's
   Battalion at the walls and the Merchants' before the lake); the Ceda absent. Where the Sixth stands is Ch4's key (hold: the front of
   the crossing; run: the second rank). The King's bounty for the stand (b5Forgive 30 on the sergeant and every walking soldier,
   b5_bounty); on Ch5 'sign' the house's factor at the line's end writing who stands where. The drill-sergeant's guess at the white
   fingertip (the trick, the White Finger); the Whitefinders' Drill at the fire (89); Jheck on the battalion's foragers by the lake
   (b5_c6_shore, optional); one short scene each at the fire; Thegg gives Pessa her pack back. The mortal fight is signposted here and
   again at the choice. Phase 2, the day: the tiles at dawn (the reading's place); the K'risnan's dust and the Letherii white fire; the
   pillars; both corner towers fall; the pillars come down on the left and the centre; the Preda's standard goes under, far off, never
   how; the Edur who came over the lake beds meet the right hand to hand, without sorcery; then the right sees, and a pillar turns toward
   it, and it breaks. The key, S.f.b5_c6_key: 'stand' (hold the crossing while the battalion goes back over: b5_c6_channel, the book's one
   mortal fight, Edur warriors and unblooded only; then the hills with the Jheck hunting, b5_c6_hills) or 'fallback' (back over with the
   first who break, toward Dissent: b5_c6_flight). Phase 3-4, after: the pillars lift and what they carried comes down (headline); the
   keep burns; the Emperor's declaration heard; the barrow raised on the field at night, far off (b5_barrowSeen); the fallen named once,
   and who carries their debts (the engine has passed them: S.f.b5_heirs). Never the Edur hill, the towers' mages, the Preda's command,
   the Edur right, Rhulad and Mosag's quarrel, Trull, Ahlrada Ahn, Canarth; never Tomad or Binadas in person or by name in narration;
   never Moroch's recruiting or the Artisans' standard. Notes for later chapters: docs/mt-ch6-notes.md. */
/* FOR THE ARTIST (86b): names this file uses.
   Items: ART['item/b5_c6_edurblade'], ['item/b5_c6_paint'], ['item/b5_c6_lakestone'].
   Figures: b5_c6_whitefinder, b5_c6_drillsgt. Reused: b5_c1_ennic, b5_c1_clerk, b5_c1_tilewoman, b5_c5_factor, b5_c5_quartermaster,
   b5_letherii, and the shelf's b5_edur, b5_unblooded, b5_jheck, b5_wraith, b5_regular.
   Backdrops (SCENEX): b5_branskeep (80's, redrawn), b5_c6_eve, b5_c6_pillars, b5_c6_break, b5_c6_barrow.
   Ground (TILEX): b5_c6_lines (. grass , trodden earth = tent F fire ~ the dry channel - the crossing L the lake path), b5_c6_channel
   (. channel floor , stones # bank - the crossing s dropped shield n the far lip), b5_c6_hills (. scrub , scree # rock x thorn o a
   wayside shrine J the Jheck's trail v the ridge), b5_c6_dissent (. road , grass # wall c abandoned cart J the fleeing v on, south-west),
   b5_c6_shore (battle only: . shingle , reeds # the lake). In fights 't' is cover (a tent's crates, a fallen shield-wall of the dead's
   shields, a boulder, a cart). */

/* ---- small helpers (b56: Book Five, Chapter Six) ---- */
const b56L = (id, n) => { if (b5In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b56Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b5In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b56If = (id, s) => b5In(id) ? (typeof s === 'function' ? s() : s) : '';
const b56Who = () => (ROLL() && ROLL().who) || 'sgt';
const b56Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b56Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b56V = (id, you, they) => id === 'sgt' ? you : they;
const b56Ph = () => S.f.b5_c6_ph || 1;
const b56Key = () => S.f.b5_c6_key || null;
const b56Docks = (n, why) => { S.silver = (S.silver || 0) + n; updSilver(); note(`+${n} docks: ${why}.`, 'good'); };
const b56Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b56Here = () => S.squad.filter(id => id !== 'sgt' && b5In(id));
const b56And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* the earlier keys, each read with a default (a --from=6 save may have taken either; an unset key reads as the quieter road) */
const b56Front = () => S.f.b5_c4_key !== 'run';                                  // Ch4 'hold': Ennic's account of the west rampart; the front of the crossing
const b56House = () => S.f.b5_c5_key === 'sign' || S.f.b5_holder === 'house';    // Ch5 'sign': the house holds the paybooks
/* the fallen of the mortal fight (ids), and who carries each debt now (the brief's heirs table) */
const b56Fallen = () => (Array.isArray(S.f.b5_c6_fallen) ? S.f.b5_c6_fallen : []).filter(id => TPL[id]);
const B56_HEIRS = {sgt:'a cousin two streets back from the Quillas', tobet:'his family on the tenant farm, who are Indebted again', thegg:'nobody living: the tavern writes it to a dead woman\'s dead son, and the clerk says that is a ledger nobody can collect', perrit:'her father, a clerk in the Pursers\' District', ammet:'the cutler, who takes the tools back, and the note dies with her name', ruuk:'his clan in the Faraed hills', brune:'her village on the coast', pessa:'nobody: her name is spelled wrong in the press-gang\'s book, and her husband is gone'};
const b56Heir = id => { const owed = ((S.f.b5_heirs || {})[id]) || 0; return owed > 0 ? `${NAME(id)}'s ${b5Coin(owed)} goes to ${B56_HEIRS[id] || 'the heirs'}.` : `${NAME(id)} owed nothing at the end. The clerk writes that too.`; };
/* the day, step by step: 0 arrived in the channel, 1 the sorceries seen, 2 the clash, 3 the break (the key) */
const b56Day = () => S.f.b5_c6_day || 0;
const b56DayNext = () => ['b5_c6_sorcery', 'b5_c6_clash', 'b5_c6_break', 'b5_c6_break'][Math.min(3, b56Day())];
/* where the chapter goes on from, if a "Not now" stepped away between its steps */
const b56Next = () => { if (b56Ph() < 2) return 'b5_c6_fire'; if (!b56Key()) return b56DayNext(); return b56Key() === 'stand' ? (S.f.b5_c6_hillsDone ? 'b5_c6_ridge' : 'b5_c6_hunt') : (S.f.b5_c6_flightDone ? 'b5_c6_roadsw' : 'b5_c6_fleeing'); };
/* a "yes, but" in docks of debt on whoever rolled it (5 to 20), never past what the holder will wait for: if it would press the roller,
   the scene takes another cost (alt: {t(id), fx(id)}). fx runs before t (16, settleRoll), so fx decides. As b55Owe. */
let b56NearOk = true;
const b56Room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50; return b5Debt(id) + n <= lim; };
const b56Owe = (n, why, line, alt) => ({
  fx:()=>{ const w = b56Who(); b56NearOk = b56Room(w, n); if (b56NearOk) b5Owe(w, n, why); else if (alt && alt.fx) alt.fx(w); },
  t:()=>{ const w = b56Who(); return b56NearOk ? line(w) : (alt && alt.t ? alt.t(w) : `Yes, but it costs ${b56Nm(w)} something.`); }});
/* the King's bounty for the stand: 30 docks off the sergeant's line and every walking soldier's, once (the brief's Ch6 row) */
const b56Bounty = () => { if (S.f.b5_bounty) return; S.f.b5_bounty = 1;
  ['sgt', ...S.squad.filter(id => id !== 'sgt' && b5In(id))].forEach(id => { const d = b5Debt(id); if (d > 0) b5Forgive(id, Math.min(30, d), 'the King\'s bounty for the stand'); });
  b56Docks(15, 'the quarter\'s pay, a day early, at the clerk\'s table'); save(); };
/* the survivors' +1, once, after the stand */
const b56Survived = () => { if (S.f.b5_c6_survived) return; S.f.b5_c6_survived = 1; b56Here().forEach(id => b56L(id, 1)); };
/* on Ch5 'sign' the house writes the dead's debts to the heirs with its interest, a tenth on top, once (never the squad's to pay) */
const b56HeirsWritten = () => { if (S.f.b5_c6_heirsWritten) return; S.f.b5_c6_heirsWritten = b56House() ? 'house' : 'army';
  if (b56House()) b56Fallen().forEach(id => { const h = S.f.b5_heirs || {}; if ((h[id] || 0) > 0) h[id] += Math.ceil(h[id] / 10); }); save(); };

/* ---- the White Finger: the Line (line, t_line), in Lether's words. An old drill-sergeant of the battalion says the fingertip on the
   boss is a drill nobody remembers is a drill: touch shields boss to boss, and the line can't be opened. It is only his guess. Not
   sorcery. Once a fight: the bearer and every squadmate beside them take +3 + level step armour and cannot be flanked until the
   bearer's next turn. ---- */
Object.assign(TRICKS, {
  b5_c6_finger:{name:'The White Finger', ch:6, use:'fight', ab:'t_b5_c6_finger', where:'the Whitefinders\' lines at Brans Keep, on the eve, with the battalion\'s old drill-sergeant',
    lore:'The old drill-sergeant\'s guess at the white fingertip on every Whitefinder\'s boss: that it was a drill once, before anybody now in the battalion, and the drill was the point. Touch the bosses together, finger to finger, rim over rim, and a line of shields locks so that nothing gets a blade between them. The battalion does not know why the mark. He says this is why. He says it is only a guess.',
    get fx(){ return `Once a fight: the bearer calls the finger, and the bearer and every squadmate beside them touch bosses. They take +${3 + lvT()} armour and cannot be flanked until the bearer's next turn. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b5_c6_finger:{name:TRICKS.b5_c6_finger.name, trick:'b5_c6_finger', self:true, desc:()=>TRICKS.b5_c6_finger.fx,
    run(u){ B.line = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => lineCovers(p)); in_.forEach(p => { float(p, 'boss to boss', '#e8e4d8'); sparks(p.x, p.y, 8, '#e8e4d8', .4); });
      blog(`${u.name}: "The finger!" ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} put${in_.length > 2 ? '' : 's'} a boss to the boss beside, white to white, and the shields lock. Not sorcery. Drill.` : 'One boss, and nobody beside it to touch. It will have to do.'}`); }},
});

/* ---- the words this chapter adds to Book Five's glossary ---- */
GLOSSX.mt.push(
  [6, 'The dry channel', 'A seasonal drainage course running north-east from Brans Keep, dry in summer: a bed of stones between two banks. The army\'s right stood across it.', ()=>(S.chapter || 0) >= 6],
  [6, 'The King\'s bounty', 'Thirty docks off every soldier\'s paybook line for standing at Brans Keep, paid on the eve by the company clerks, at the Preda\'s order.', ()=>!!(S.f && S.f.b5_bounty)],
  [6, 'The barrow at Brans Keep', 'One long mound on the field below the keep, raised in a night, with the dead of both armies in it together, by the order of the Edur\'s Emperor.', ()=>!!(S.f && S.f.b5_barrowSeen)]);

/* ---- the reading: Brans Keep across the dry channel, a shield on the grass at dawn, dust (the morning of the battle) ---- */
B5READ[6] = {scene:'b5_branskeep', where:'a shield laid face up on the grass, its white fingertip at the top', set:'Brans Keep across the dry channel at first light, the army standing to in its lines, and dust already coming up off the field to the north.',
  back:'b5_c6_tiles_done', backT:'Back to the lines.',
  get say(){ return {perrit:`Perrit lays her shield face up on the grass for a table and smooths the calfskin over the boss. "It is the only flat thing in the army this morning," she says. "Sit, Sergeant."${b5In('pessa') ? ' Pessa sits down on the other side of it without being asked, with her boathook across her knees.' : ''} Perrit takes the first tile out of the pouch and holds it a moment before she lays it, which she has never done.`,
    tilewoman:`The tile-woman has come up from the followers' carts in the dark, with her bag, and she puts a soldier's shield face up on the grass between you without asking whose. "Bone on iron," she says, and spits to one side, for manners. "A dock, Sergeant. You'll not want to owe me this one."`}; }};

/* the fire is a roster fire (38c): the Sixth's fire in the Whitefinders' lines on the eve */
ROSTER_FIRES.mt[6] = ['b5_c6_fire'];

const B5CH6 = {
  title:'Brans Keep', number:'Six',
  intro:{loc:'Brans Keep', sub:'The Whitefinders\' lines, across the dry channel · the eve', scene:'b5_branskeep', cap:'The keep squat against its cliff, the lake grey beside it, and the whole army of Lether drawn up in front of its last great work.',
    paras:[
`The army of Lether is drawn up in front of Brans Keep, and it is the largest thing any soldier in the Sixth has ever seen. It runs from the river in the west to the lake in the east, battalion by battalion, banner by banner, and it is all of it waiting.`,
()=> b56Front() ? `The Whitefinders are on the right, across the dry channel, and the Sixth is at the front of the crossing. Finadd Ennic's account of the west rampart at High Fort has reached the battalion's commander, in Ennic's neat hand, and the commander has read it.` :
  `The Whitefinders are on the right, across the dry channel, and the Sixth is in the second rank, behind the Second Company. It has not been said why. It has not needed saying: the Sixth came out of the west wood at High Fort with its swords on.`,
()=>{ const v = b56Here().map(id => TPL[id].name);
  return `${v.length ? `${b56And(v)} ${v.length > 1 ? 'are' : 'is'} with you.` : 'The squad, tonight, is you.'} Across the field to the north, the Edur are gathering. Tomorrow they will come.`; }],
    go:'To the lines', node:'b5_c6_start'},

  areas:[
    /* 16 x 12 (b5_c6_lines, the eve: dusk, then night). The Whitefinders' lines across the dry channel: . grass  , trodden earth  = tents
       F the Sixth's fire  ~ the dry channel  - the crossing  L the path down to the lake, where the foragers went */
    { id:'b5_c6_lines', title:'Brans Keep · the Whitefinders\' lines', sub:'Across the dry channel · the eve', hint:'Tap ground to move · tap a figure to talk · the fire is in the middle of the lines', decor:'b5_c6_lines',
      map:[ "~~,,==,,.,,==,,L",
            "~~,,==,,.,,==,,,",
            "~-,,,,,,.,,,,,,,",
            "~~,,,,,,.,,,==,,",
            "~~,,==,,F,,,==,,",
            "~~,,==,,,,,,,,,,",
            "~~,,,,,,.,,,,,,,",
            "~~,,,,,,.,,,==,,",
            "~~,==,,,.,,,==,,",
            "~~,==,,,.,,,,,,,",
            "~~,,,,,,.,,,,,,,",
            "~~,,,,,,.,,,,,,," ],
      walk:'.,', triggers:{F:'b5_c6_fire', '-':'b5_c6_crossing', L:'b5_c6_lakepath'}, start:{x:8, y:10},
      quest:()=> !S.f.b5_bounty ? 'The clerk\'s table. The King has sent something.' : b56Ph() >= 2 ? 'Dawn. To the crossing.' : 'The fire. Tomorrow they will come.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:7, y:6, node:()=>'b5_c6_ennic', fresh:()=>!S.f.b5_c6_ennic},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:10, y:5, node:()=>S.f.b5_bounty ? 'b5_c6_clerk' : 'b5_c6_bounty', fresh:()=>!S.f.b5_bounty},
        {id:'qm', name:'The quartermaster', kind:'b5_c5_quartermaster', x:14, y:8, node:()=>'b5_c6_qm', fresh:()=>!S.f.b5_c6_qm},
        {id:'drill', name:'The old drill-sergeant', kind:'b5_c6_drillsgt', x:5, y:10, node:()=>'b5_c6_drillsgt', fresh:()=>!S.f.b5_c6_drillTried},
        {id:'foragers', name:'The foragers\' sergeant', kind:'b5_c6_whitefinder', x:13, y:2, node:()=>'b5_c6_foragers', show:()=>b56Ph() < 2, fresh:()=>!S.f.b5_c6_foragers},
        {id:'factor', name:'The house\'s factor', kind:'b5_c5_factor', x:14, y:10, node:()=>'b5_c6_factor', show:()=>b56House(), fresh:()=>!S.f.b5_c6_factor},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:3, y:6, node:()=>'b5_c6_tilewoman', fresh:()=>false} ] },

    /* 16 x 12 (b5_c6_channel, the day). The dry channel in battle: . the channel floor  , stones  # the banks  n the far lip, where the
       right stands and the Edur come  - the crossing, the way back over  s shields dropped on the stones (decor) */
    { id:'b5_c6_channel', title:'The dry channel', sub:'Brans Keep · the day', hint:'Tap ground to move · the far lip is where the line stands · the crossing goes back over', decor:'b5_c6_channel',
      map:[ "####nnnnnnnn####",
            "###,,,,..,,,,###",
            "##,,..s..,..,,##",
            "##,.,....,...,##",
            "#,,...,..s..,,,#",
            "#,.,......,..,,#",
            "#,,..s..,....,,#",
            "##,,.,...,..,,##",
            "##,,....,..,.,##",
            "###,,.,..,.,,###",
            "####,,,..,,,####",
            "#######--#######" ],
      walk:'.,s', triggers:{n:'b5_c6_lip', '-':'b5_c6_crossback'}, start:{x:8, y:9},
      quest:()=> !b56Key() ? (b56Day() >= 2 ? 'The far lip. The battalion is breaking.' : 'The far lip. The right is holding.') : 'The crossing.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:6, node:()=>b56Key() ? 'b5_c6_ennic_day' : b56DayNext(), fresh:()=>!b56Key()} ] },

    /* 16 x 12 (b5_c6_hills, after the stand: afternoon into night). The barren hills behind the keep: . scrub  , scree  # rock  x thorn
       o a wayside shrine to the Errant  J the Jheck's trail  v the ridge, where the field can be seen */
    { id:'b5_c6_hills', title:'The hills behind the keep', sub:'Brans Keep · after', hint:'Tap ground to move · the ridge looks down on the field', decor:'b5_c6_hills',
      map:[ "########vv######",
            "##,,,,,,..,,,,##",
            "#,,x,,,.,,,x,,,#",
            "#,,,,#,.,,,,,,,#",
            "#,x,,,,..,,,#,,#",
            "#,,,,,,,.,,,,,,J",
            "##,,,o,,.,,x,,,#",
            "#,,,,,,,.,,,,,,#",
            "#,x,,,,..,,,x,,#",
            "#,,,,,,.,,,,,,,#",
            "##,,,,,.,,,,,###",
            "#####,,..,,#####" ],
      walk:'.,', triggers:{v:'b5_c6_ridge', o:'b5_c6_shrine', J:'b5_c6_hunt'}, start:{x:7, y:10},
      quest:()=> !S.f.b5_c6_hillsDone ? 'The Jheck are hunting. The ridge, and past it.' : 'The ridge. The field below.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:9, node:()=>'b5_c6_ennic_hills', fresh:()=>!S.f.b5_c6_ennicHills} ] },

    /* 16 x 12 (b5_c6_dissent, after the fallback). The road south-west toward Dissent across open ground: . the road  , grass  # field
       walls  c an abandoned cart  J the fleeing, and what is running them down  v on, south-west */
    { id:'b5_c6_dissent', title:'The Dissent road', sub:'South-west from Brans Keep · after', hint:'Tap ground to move · the road goes on south-west', decor:'b5_c6_dissent',
      map:[ "####,,,,..,,,,,,",
            ",,,#,,,,.,,,,,,,",
            ",,,,,,,..,,c,,,,",
            ",#,,,,,.,,,,,,,J",
            ",#,,,,.,,,,,,,,,",
            ",,,,,..,,,,,#,,,",
            ",,,,.,,,,,,,#,,,",
            ",,,..,,,,,,,,,,,",
            ",,..,,,,c,,,,,,,",
            ",..,,,,,,,,,##,,",
            "..,,,,,,,,,,,,,,",
            "v,,,,,,,,,,,,,,," ],
      walk:'.,', triggers:{c:'b5_c6_cart', J:'b5_c6_fleeing', v:'b5_c6_roadsw'}, start:{x:9, y:0},
      quest:()=> !S.f.b5_c6_flightDone ? 'The Jheck are running down the fleeing. South-west.' : 'South-west, toward Dissent.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:8, y:3, node:()=>'b5_c6_ennic_road', fresh:()=>!S.f.b5_c6_ennicRoad} ] } ],

  battles:{
    /* the eve (optional): Jheck outriders on the battalion's foragers by the lake */
    b5_c6_shore:{title:'The lake shore', style:'b5_c6_shore', warrenText:'Lake Brans at dusk · the Holds are crowded, as if they too had come to stand here', warren:{meanas:1, denul:1}, music:'battle',
      map:["#####...","###.....","##..t...","#.......","#...t...","##......","#.....t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_jheck',4,1],['b5_jheck',6,2],['b5_jheck',5,0]], xp:130, after:'b5_c6_shore_after',
      waves:[{round:2, foes:[['b5_jheck',7,5]], text:'Another comes along the shingle at a lope, low, from the reeds where the foragers left their carts.'}],
      preText:()=>`Three wolves on the shingle where the foragers' carts stand, too big to be wolves, and the foragers behind the carts with their sacks of meal. The wolves turn when the Sixth comes down the path. They do not run. They spread.${b56If('brune', ' Brune has her feet in the lake already, because it is water, and her fish-spear up.')}`},
    /* stand: hold the crossing on the dry channel while the battalion goes back over it. The book's one mortal fight: the Edur who came
       over the lake beds, warriors and unblooded only (they fought without sorcery: no K'risnan, no demon). Then the channel's lip, the
       last rush, until the pillar's shadow comes over the field and the Edur themselves fall back from it. */
    b5_c6_channel:{title:'The crossing', style:'b5_c6_channel', mortal:true, hurtMost:true, warrenText:'The dry channel at Brans Keep · whoever falls here stays down · the Holds are torn open over the field and nothing in them is listening', warren:{meanas:1, denul:1}, music:'battle',
      map:["##......","#..t....","........","...t..t.","........","t.......","........","....t...","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b5_regular',1,7]],
      foes:[['b5_edur',2,0],['b5_edur',5,1],['b5_unblooded',2,2],['b5_unblooded',6,2],['b5_unblooded',4,0]], xp:200, after:'b5_c6_channel_after',
      waves:[{round:3, foes:[['b5_unblooded',0,3],['b5_unblooded',7,3]], text:'Two more come down the far bank at a run, young ones, without a mark on them yet, and one of them is shouting a name.'}],
      preText:()=>`Behind you the battalion is going back over the crossing, a thousand soldiers on a strip of stones twenty paces wide, and the noise of it is like a river. In front of you, coming down the far bank into the channel, are the Edur who came over the lake beds: tall, grey, in dark leather, with long swords, and no sorcery about them at all. They have been fighting hand to hand all morning. So have you.${b56Front() ? ' The Sixth is at the front of the crossing. That was the honour.' : ' The Second Company was in front of the Sixth this morning. The Second Company is going back over the crossing now, what is left of it, and the Sixth is in front.'}`,
      stage2:{title:'The channel\'s lip', xp:100,
        text:()=>`The first of them are down on the stones, or back up the far bank, and the crossing behind you is emptying. Then the last rush: more of them over the lip at once, the oldest and the youngest together, because the Letherii they have been killing all morning are getting away, and somebody up there has told them so.\n\nOver everything, the light is going wrong. One of the pillars has turned off the centre and is coming this way across the field, and its shadow is in front of it.${b56Say({thegg:'\n\n"Behind me," Thegg says, very calm, and sets his shield on the stones.', tobet:'\n\nTobet has an arrow on the string. "Three left," he says, flat, about the arrows.', _:''})}`,
        map:["........","..t.....","........","....t...","........","t.....t.","........","...t....","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b5_regular',6,8]],
        foes:[['b5_edur',3,1],['b5_edur',5,0],['b5_unblooded',2,2],['b5_unblooded',6,2]],
        waves:[{round:2, foes:[['b5_unblooded',7,1]], text:'One more over the lip, alone, late, and in a hurry to make up for it.'}]} },
    /* stand: the break into the hills behind the keep, with the Jheck hunting survivors and a few wraiths drifting. Not mortal. */
    b5_c6_hills:{title:'The hills', style:'b5_c6_hills', warrenText:'The hills behind Brans Keep · the sky is coming down in pieces, a long way off', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....#...","..t.....","........","......t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_jheck',1,0],['b5_jheck',5,1],['b5_jheck',3,0],['b5_jheck',6,2],['b5_wraith',1,3],['b5_wraith',6,0]], xp:160, after:'b5_c6_hills_after',
      preText:()=>`They come up the scree the way wolves come at a flock: not at the soldiers, at the gaps between them. Four, and two shapes drifting behind them over the thorn that are not wolves and not anything with a shadow of its own.${b56If('ruuk', ' Ruuk has a spear back over his shoulder already. "Up," he says. "Always up. They hate up."')}`},
    /* fallback: Jheck and wraiths running down the fleeing on the open ground south-west. Not mortal. */
    b5_c6_flight:{title:'The open ground', style:'b5_c6_dissent', warrenText:'The open ground south-west of Brans Keep · the Holds are a long way behind, burning', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t.....","........",".....t..","........","..t.....","........","......t.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_jheck',1,0],['b5_jheck',5,1],['b5_jheck',4,0],['b5_wraith',1,2],['b5_wraith',6,3],['b5_wraith',3,0]], xp:170, after:'b5_c6_flight_after',
      waves:[{round:3, foes:[['b5_jheck',7,4]], text:'Another wolf comes across the grass from the north, at a run, on the scent of the others.'}],
      preText:()=>`On the open ground between the channel and the Dissent road the fleeing have stopped being an army. They are people running, in ones and twos, and the wolves are going among them, and the wraiths with the wolves. A knot of Riven soldiers has stopped by a field wall to fight because it cannot run any further, and the Sixth is nearest.${b56If('pessa', ' Pessa has her boathook down off the upright, for once.')}`} },

  foes:{},

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b5_c6_edurblade:{name:'An Edur sword from the channel', slot:'weapon', role:'blade', who:null, atk:1,
      line:'A long blade of dark iron, slightly curved, with grey leather on the grip worn to the shape of a hand bigger than yours. It came off the stones of the dry channel at Brans Keep, where its owner left it. The Edur make better swords than Lether does, and Lether has always known it. +1 to hit.'},
    b5_c6_paint:{name:'A pot of white paint', slot:'trinket', role:'any', who:null, ac:1,
      line:'A small clay pot with a white rim and a frayed brush tied to its neck with string: the battalion\'s own paint, for the fingertip on the boss. Whoever carries it repaints the squad\'s bosses on the eve of a fight, and the squad stands a little straighter for it. Why the finger, the battalion cannot say. +1 armour.'},
    b5_c6_lakestone:{name:'A stone from the old lake bed', slot:'trinket', role:'any', who:null, hp:3,
      line:'A flat stone, pale grey with a darker ring, worn smooth by water that has not been there for longer than Lether has. Picked up on the way out of Brans Keep. It is a good weight in the hand, and it is the only thing anybody brought out of that field that nobody owes for. +3 health.'} },

  scenes:{
    b5_c6_eve:{loc:'Brans Keep', sub:'The eve · the army\'s fires', cap:'The army\'s fires across the field at night, the keep\'s towers black against the cliff, the lake still, and the Edur\'s fires on the hills to the north.', amb:'explore'},
    b5_c6_pillars:{loc:'Brans Keep', sub:'The day · from across the channel', cap:'Dark pillars rising over the left and the centre, very far off, and the keep small under them.', amb:'explore'},
    b5_c6_break:{loc:'Brans Keep', sub:'The day · the right breaking', cap:'The right going back over the channel in a long spill, and a pillar\'s shadow coming across the field.', amb:'explore'},
    b5_c6_barrow:{loc:'Brans Keep', sub:'The night after · from far off', cap:'A long mound being raised on the field at night, torches round it, and the keep burning behind.', amb:'explore'} },

  end:{
    stand:['The crossing', 'The army of Lether stood at Brans Keep and was destroyed there. The pillars came down on the left and the centre, the corner towers fell, and the Preda\'s standard went under. On the right, across the dry channel, the Whitefinders fought the Edur hand to hand until they saw what had happened to the rest, and broke. The Sixth held the crossing while the battalion went back over it, and then went up into the hills with the Jheck hunting. That night the Edur\'s Emperor ordered the dead of both armies into one barrow, and the Sixth watched it raised from the ridge.'],
    fallback:['The Dissent road', 'The army of Lether stood at Brans Keep and was destroyed there. The pillars came down on the left and the centre, the corner towers fell, and the Preda\'s standard went under. On the right, across the dry channel, the Whitefinders fought the Edur hand to hand until they saw what had happened to the rest, and broke. The Sixth went back over the channel with the first of them, toward Dissent, and fought the Jheck on the open ground. That night the Edur\'s Emperor ordered the dead of both armies into one barrow, and the Sixth saw its torches from the road.'] },
  endScene:'b5_c6_barrow',
  endCap:()=> b56Key() === 'stand' ? 'The barrow on the field at night, from the ridge: torches, and the keep burning behind it, and the Sixth on the hill, fewer or not.' : 'The barrow on the field at night, from the Dissent road: a line of torches very small, and the keep burning behind it.',
  tease:'Next: Letheras. The broken army comes home in the night, and the Edur come down the west road in the morning.',

  extras:()=>{ const f = S.f, x = [], fell = b56Fallen();
    if (f.b5_bounty) x.push('On the eve the clerk paid the King\'s bounty for the stand: thirty docks off every soldier\'s line.');
    if (f.b5_c6_key === 'stand') x.push(fell.length ? `The Sixth held the crossing on the dry channel while the battalion went back over. ${b56And(fell.map(NAME))} did not come out of it, and ${fell.length > 1 ? 'lie' : 'lies'} in the barrow with the rest.` : 'The Sixth held the crossing on the dry channel while the battalion went back over, and everyone in the squad came out of it.');
    if (f.b5_c6_key === 'fallback') x.push('The Sixth went back over the channel with the first who broke, toward Dissent.');
    if (f.b5_c6_ennicHurt) x.push(f.b5_c6_stitched === 'ammet' ? 'Finadd Ennic was wounded, and Ammet stitched him.' : 'Finadd Ennic was wounded, and the battalion\'s surgeons stitched him.');
    if (f.b5_c6_fingerOk) x.push('The old drill-sergeant showed the squad his guess at the white fingertip: boss to boss, and the line cannot be opened.');
    if (f.b5_c6_shoreDone) x.push('On the eve the Sixth drove Jheck off the battalion\'s foragers by the lake.');
    if (f.b5_c6_pack) x.push('Thegg gave Pessa her pack back on the eve.');
    if (b5In('pessa')) x.push('Pessa came through Brans Keep with her boathook and her grievance, both intact.');
    if (b5In('ruuk')) x.push('Ruuk found the squad a road out, as he said he would.');
    if (b5In('brune')) x.push('Brune came through Brans Keep, and says the lake was wrong water.');
    return x; },

  journal:()=>{ const f = S.f, fell = b56Fallen(); return [
    f.b5_barrowSeen && 'The Edur\'s Emperor has declared the Letherii his subjects, and ordered the dead of both armies buried together. The barrow was raised on the field at Brans Keep in a night.',
    f.b5_c6_key === 'stand' && (fell.length ? `The Sixth held the crossing at Brans Keep. ${b56And(fell.map(NAME))} fell there. Their debts went to their heirs.` : 'The Sixth held the crossing at Brans Keep, and came out of it whole.'),
    f.b5_c6_key === 'fallback' && 'The Sixth went back over the channel at Brans Keep with the first who broke, toward Dissent.',
    f.b5_c6_day >= 1 && 'The army of Lether was destroyed at Brans Keep. The pillars came down on the left and the centre. The Preda\'s standard went under.',
    f.b5_bounty && 'The King paid a bounty for the stand: thirty docks off every soldier\'s line.',
    'The Sixth is at Brans Keep, with its battalion, on the right across the dry channel.'].filter(Boolean); },

  dlg:{
    /* ---- phase 1: the eve ---- */
    b5_c6_start:()=>({sp:'Brans Keep · the eve', scene:'b5_branskeep', fx:()=>{ S.f.b5_c6_ph ??= 1; },
      again:()=>`The Whitefinders' lines across the dry channel, and the army drawn up beyond it to the keep's walls.`, txt:
`The orders come down the lines all afternoon, from the Preda, in the Preda's words, read out by Finadds standing on carts: who stands where, and why, and what happens to anybody found anywhere else.

The Crimson Rampant Brigade on the far left, where the hills meet the Dissent River. The Snakebelt and half the Riven before the ridge. The King's Battalion at the keep's walls, the heavy infantry, all of it; the Merchants' Battalion in front of the lake. And the right, across the dry channel: the Artisans, the other half of the Riven, and the Whitefinders.

No Ceda. The talk is that he is in Letheras, on his tile. Each of the keep's two corner towers has a mage on it instead, and the mangonels, and a great many people looking up at them.

${b56Front() ? `The Sixth has the front of the crossing on the dry channel, where the right will come back over if it comes back at all. Ennic's account of the west rampart did that. He looks as if he would like to write a correction.` : `The Sixth has the second rank, behind the Second Company, at the crossing on the dry channel.${b56If('thegg', ' Thegg looks at the Second\'s backs, a long way down. "Second rank," he says. "Behind them. Not behind me." He says it without heat, which in Thegg is not the same as without feeling.')}`}

Ennic has said one more thing, to the Sixth only, quietly, so that it would be said once: the right will be hand to hand. Whoever falls there stays down.`,
      ch:[{t:'Find the Finadd.', go:'b5_c6_ennic'},
          {t:'The clerk has a table out. Something from the King.', req:()=>!S.f.b5_bounty, go:'b5_c6_bounty'},
          {t:'Walk the lines.', go:()=>startExplore()}]}),

    b5_c6_ennic:()=>({sp:B5_FINADD.name, scene:'b5_branskeep', fx:()=>{ S.f.b5_c6_ennic = 1; },
      again:()=>`Finadd Ennic, with the battalion's orders folded into his book. "Tomorrow, Sergeant."`, txt:
`Finadd Ennic has the battalion's orders folded into his book, and has read them so many times that the folds have gone soft.

"The right holds the channel," he says. "The Edur have a third army coming down from the north-east, the commander says, over the lake beds, late. That will be ours." He looks across the channel at the old lake beds, grey and flat, going away toward the hills. "There are mages on the towers, and the King's Battalion, and the Preda. All of that is the centre. Over here it will be shields." He closes the book. "Hand to hand, Sergeant. I wanted the Sixth to hear it from me. Whoever goes down over there will not be getting up, and I would rather everybody knew it tonight than learned it tomorrow."

He hesitates. "I have written the Sixth's roll out fair. In case." He does not say in case of what. He seems ashamed of the neatness of it.`,
      ch:[{t:'"Hand to hand, Finadd. We heard."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the King's bounty for the stand: the clerk at his table, the battalion in a line ---- */
    b5_c6_bounty:()=>({sp:'The clerk\'s table', scene:'b5_branskeep', html:debtHTML('The Sixth Company · Brans Keep'), fx:()=>{ b56Bounty(); },
      again:()=>`The clerk's table, and the line of soldiers going past it.`, txt:
`Every company clerk in the battalion has a table out, and the battalion is in a line in front of them, by company, and the line goes past each table one soldier at a time.

It is the King's bounty for the stand, by the Preda's order, read out at the head of the line: thirty docks off every soldier's paybook line for standing at Brans Keep tomorrow, written today, so that every soldier stands tomorrow thirty docks lighter. The company clerk writes it against each line in the Sixth's book as each soldier goes past, and then the quarter's pay, a day early, in docks, into the Finadd's hand for the company, because the army would rather owe nothing to the dead.

${b56Say({tobet:'Tobet watches thirty come off his line. "Thirty docks to stand in a ditch," he says. "I have been offered worse." He walks on.', _:'The line goes past.'})}${b56If('pessa', `\n\nPessa reads her line out loud as the clerk writes it. "A hundred and twenty, less thirty." She looks at the figure. "So the King thinks I'm worth thirty docks dead. Good. I've a figure now."`)}${b56House() ? `\n\nAt the end of the line, outside the last tent, the house's factor has his folding desk out under his clerk's umbrella and his ledger open, and he is writing down who is standing where. He does not seem to think anybody will mind.` : ''}${b5Collectors().length ? `\n\nThe clerk looks up from the book once, at ${b56And(b5Collectors().map(b56Nm))}. "Still more than the holder likes," he says, quietly. "The bounty helps. It does not help enough." He goes back to writing.` : ''}`,
      ch:[{t:'The pay desk, while the book is open.', go:'b5_c6_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_clerk:()=>({sp:'The company clerk', scene:'b5_branskeep', html:debtHTML('The Sixth Company · Brans Keep'),
      again:()=>`The clerk, with the case on his knees.`, txt:
`The company clerk has packed the table away and is sitting on the oilskin case instead, with the Sixth's book on his knees, checking the bounty's figures a third time.

"Every line is thirty lighter," he says. "I have checked." He turns a page. "I have also written out the heirs, Sergeant, for every line. The army asks it the night before. It always has." He does not look up. "I would rather not have to read any of them out."`,
      ch:[{t:'The pay desk.', go:'b5_c6_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_pay:()=>({sp:'The clerk\'s case · the pay desk', scene:'b5_branskeep', html:debtHTML('The Sixth Company · Brans Keep'), again:()=>`The pay desk. The clerk's pen is wet, and the squad has ${b5Coin(S.silver || 0)} in hand.`, txt:
`The clerk opens the book on the case. "Anything the squad pays down tonight, I write tonight," he says. "${b56House() ? 'The house gets it at the quarter.' : 'The holders get it at the quarter.'} Whatever happens tomorrow, it will have been paid." He wets the pen. "That is the one thing tomorrow cannot change."`,
      ch:b5PayChoices('b5_c6_fire')}),

    /* the house's factor, at the end of the line (Ch5 'sign') */
    b5_c6_factor:()=>({sp:'The house\'s factor', scene:'b5_branskeep', fx:()=>{ S.f.b5_c6_factor = 1; },
      again:()=>`The factor at his folding desk, writing who is standing where.`, txt:
`The factor is at his folding desk outside the last tent, under the umbrella, with his ledger open, writing down companies and places. "The Sixth," he says pleasantly. "The crossing." He writes it. "The house likes to know where its paper stands."

He blots the line. "The house does not expect to lose by tomorrow, Sergeant. The house never expects to lose. It writes things down so that it doesn't." He looks at you over the ledger, and for a moment his pleasant face is not doing anything at all. "Stand somewhere sensible."${b56If('tobet', `\n\nTobet watches him write. "He's counting us," he says, low. "In case." He does not finish it either.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the quartermaster: salves at six */
    b5_c6_qm:()=>({sp:'The quartermaster', scene:'b5_branskeep', fx:()=>{ S.f.b5_c6_qm = 1; },
      again:()=>`The quartermaster, counting. "Salves, six. Tonight, six. Tomorrow, nobody knows."`, txt:
`The quartermaster has his cart drawn up by the Sixth's tents with the salves in their dry crate and the linen in rolls, and he is counting them for the fourth time, because counting is what he can do tonight.

"Six docks," he says. "I'll not put the price up for the night before. I've known quartermasters who did." He writes something. "None of them were Whitefinders."`,
      ch:[{t:'A salve.', tag:'6 docks', req:()=>(S.silver || 0) >= 6, fx:()=>{ S.silver -= 6; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for six docks.', 'good'); }, go:'b5_c6_qm'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the tile-woman: decor on the eve; the reading is at dawn */
    b5_c6_tilewoman:()=>({sp:'The tile-woman', scene:'b5_c6_eve', again:()=>`The tile-woman by the followers' carts, with her bag.`, txt:
`The tile-woman sits on the tail of the followers' last cart with her bag of oiled cloth in her lap, and spits to one side when you come over.

${b56Ph() >= 2 ? (b5In('perrit') ? `"Your mage reads," she says. "Good." She looks at the dust to the north and does not spit, for once.` : `"First light," she says. "I said I'd come up." She shakes the bag, and it clicks. "Sit, if you want it. A dock."`) : b5In('perrit') ? `"Your mage will read at first light," she says. "Good. I'd not read this one at night. The bones don't like the dark before a thing like this." She looks across the field at the Edur's fires on the hills. "Neither do I."` : `"At first light," she says. "Not before. I'll come up with the bag." She looks across the field at the Edur's fires on the hills. "Bone wants the light, for a thing like this."`}`,
      ch:[Object.assign(b5TileChoice(6), {req:()=>b56Ph() >= 2 && !b5In('perrit') && !S.f.b5_c6_drawn && !S.f.b5_c6_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the old drill-sergeant: the White Finger (the trick, ✦ Might 16) and the paint ---- */
    b5_c6_drillsgt:()=>({sp:'The old drill-sergeant', scene:'b5_c6_eve', fx:()=>{ S.f.b5_c6_drillMet = 1; },
      again:()=>`The old drill-sergeant with his paint-pot, by the battalion's shields.`, txt:
`An old sergeant of the battalion, grey to the eyebrows, is going along the Sixth's shields where they are stacked by the tents with a pot of white paint and a brush, touching up the fingertips on the bosses, one by one, because it is his to do, he has decided. He was not asked. He is not stopped.

"Thirty years in the Whitefinders," he says, when you stop. "Drill-sergeant for twenty of them. And nobody in thirty years could tell me why the finger." He paints. "So I'll tell you what I think, and it's only what I think. It's a drill. It was always a drill. Somebody before anybody now in the battalion taught it, and the teaching wore off and the paint didn't."

He holds up two shields, boss to boss, the white fingertips touching. "Finger to finger. Rim over rim. Lock them like that down a line and there's nowhere to put a blade between. That's the finger. That's what it's for." He lets the shields down. "I can show you. Your arms will hate me."`,
      ch:[{t:'"Show us." (the White Finger)', check:['might', 16], trick:'b5_c6_finger', req:()=>!S.f.b5_c6_drillTried, fx:()=>{ S.f.b5_c6_drillTried = 1; },
            edges:id=>[id === 'thegg' && ['a shield is the thing he knows best', 3], id === 'brune' && ['she has held a boat against a tide by its gunwale', 1], id === 'sgt' && ['you have touched the finger before every fight since the barracks', 1], id === 'tobet' && ['he is a bowman, and the shield is mostly a place to hide', -2], id === 'perrit' && ['she is small, and the drill was made for the big', -2]],
            near:{t:()=>{ const w = b56Who(); return `Yes, but the drill-sergeant runs ${b56Nm(w)} through it until it is right, and then three times more, and ${b56Pos(w)} shield arm is dead to the shoulder by the end: wrenched, and bruised.`; }, fx:()=>bruise(b56Who(), bruiseN())},
            go:'b5_c6_finger_ok', fail:'b5_c6_finger_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_finger_ok:()=>({sp:'The old drill-sergeant', scene:'b5_c6_eve', fx:()=>{ S.f.b5_c6_fingerOk = 1; if (!S.f.b5_c6_paint) { S.f.b5_c6_paint = 1; gain('b5_c6_paint'); } }, txt:
`He runs ${by({sgt:'you', _:'{who}'})} through it on the grass between the tents, with two soldiers of the Second as the line: boss to boss, finger to finger, rim over rim, and then he comes at the line with a pole and tries to get it between. He cannot. He tries again, harder, and cannot.

"There," he says. "That. Thirty years, and that's the first line I've seen lock right first night." He hands ${by({sgt:'you', _:'{who}'})} the paint-pot. "Keep it. Paint them all before the morning. If the finger's on the boss, they'll touch it. That's the drill too." He picks up his pole and goes off along the lines, looking for another company to annoy. "It's only a guess," he says, over his shoulder. "Mind that."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b5_c6_finger_no:()=>({sp:'The old drill-sergeant', scene:'b5_c6_eve', fx:()=>{ if (!S.f.b5_c6_paint) { S.f.b5_c6_paint = 1; gain('b5_c6_paint'); } }, txt:
`The pole goes between the shields, every time. Rim under rim, or the bosses a hand apart, or the finger pointing the wrong way. The drill-sergeant is patient about it, out loud, at length, in words the Second Company writes down for later.

"Takes a season," he says, at last. "You've a night." He hands you the paint-pot anyway. "Paint them. If the finger's on the boss, somebody'll touch it when it matters, whether they know why or not."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* ---- the foragers by the lake (optional): the shore fight ---- */
    b5_c6_foragers:()=>({sp:'The foragers\' sergeant', scene:'b5_c6_eve', fx:()=>{ S.f.b5_c6_foragers = 1; },
      again:()=>`The foragers' sergeant, looking down the path to the lake. "Three of them, and big."`, txt: S.f.b5_c6_shoreDone ?
`The foragers' sergeant is counting sacks of meal by the lake path. "All here," he says. "And all of us." He touches his boss. "Obliged, Sixth."` :
`A sergeant of the battalion's foragers comes up the path from the lake at a run, without his shield, and finds the Sixth because the Sixth is nearest.

"Wolves," he says. "On the shore, where we left the carts. We've been buying meal off the Dissent farmers all day for the battalion, and we were bringing it in along the lake, and there are wolves on the shingle, too big for wolves." He gets his breath. "My lads are behind the carts. The battalion's at the orders. Sixth, I'd take it kindly."`,
      ch:[{t:'"Show us the shore."', req:()=>!S.f.b5_c6_shoreDone, go:'b5_c6_lakepath'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_lakepath:()=>({sp:'The lake path', scene:'b5_c6_eve', again:()=>`The path down to the lake, and the shingle at the bottom of it.`, txt: S.f.b5_c6_shoreDone ?
`The path down to Lake Brans, and the foragers' carts on the shingle at the bottom, and the still water going away grey toward the keep. Nothing on the shore now but the meal sacks.` : b56Ph() >= 2 ?
`The path down to Lake Brans. There is nobody on it this morning. Everybody is where the orders put them.` :
`The path goes down off the battalion's ground to the shore of Lake Brans, a strip of grey shingle with reeds at its edge and the foragers' two carts stopped on it. On the shingle, between the carts and the reeds, something big is moving low to the ground.${b56If('brune', `\n\nBrune looks at the lake. "Still water," she says. "It does not go to the sea." Then she looks at the shapes on the shingle and takes her fish-spear off her back.`)}`,
      ch:[{t:'Down to the shore. Shields.', req:()=>!S.f.b5_c6_shoreDone && b56Ph() < 2, go:()=>startBattle('b5_c6_shore', {})},
          {t:'Down through the reeds, quiet, and onto them from the water side.', check:['wits', 15], req:()=>!S.f.b5_c6_shoreDone && b56Ph() < 2 && !S.f.b5_c6_reedsTried, fx:()=>{ S.f.b5_c6_reedsTried = 1; },
            edges:id=>[id === 'brune' && ['she has walked reed-beds after fish all her life', 2], id === 'ruuk' && ['he reads ground, and reeds are ground', 1], id === 'tobet' && ['he is where the blow is not', 1], id === 'thegg' && ['the reeds were not made for Thegg', -2]],
            near:b56Owe(8, 'A forager\'s sack of meal trodden into the lake', w => `Yes, but ${b56Nm(w)} ${b56V(w, 'go', 'goes')} through the reeds onto a meal sack the foragers dropped, and the sack goes into the lake, and the foragers' sergeant writes it against ${b56Pos(w)} line: ${b5Coin(8)}.`, {t:w => `Yes, but the reeds are deeper than they look, and ${b56Nm(w)} ${b56V(w, 'come', 'comes')} out of them wet to the chest and shaking with it: rattled.`, fx:w => b56Rattle(w)}),
            go:()=>startBattle('b5_c6_shore', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c6_reeds_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_reeds_seen:()=>({sp:'The lake shore', scene:'b5_c6_eve', txt:
`The reeds crack, wet and loud. On the shingle every head comes round at once, and the wolves are already moving.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c6_shore', {surprise:'e'})}]}),
    b5_c6_shore_after:()=>({sp:'The lake shore', scene:'b5_c6_eve', fx:()=>{ if (!S.f.b5_c6_shoreDone) { S.f.b5_c6_shoreDone = 1; b56Docks(10, 'the foragers\' purse, what was left of it after the Dissent farmers'); } }, txt:
`The last of them goes into the reeds and away along the shore toward the north, low and fast, and does not come back. The foragers come out from behind their carts with their knives in their hands and their faces grey.

The foragers' sergeant counts his lads, and his sacks, and then his purse, and gives the Sixth what is in the purse. "Ten," he says. "The Dissent farmers had the rest." He looks north along the shore, where the wolves went. "They're Jheck. They'll be in the hills tomorrow, after. Wolves always come after." He touches the finger on his boss, and seems to think about what he has said, and wishes he had not said it.${b56If('ammet', `\n\nAmmet goes round the foragers with her linen. "Hold still," she says, to a boy with a bite in his forearm. "It's a bite. You'll keep the arm. Hold still."`)}`,
      ch:[{t:'Back up to the lines.', go:()=>startExplore()}]}),

    /* the crossing, on the eve: the dry channel, the lake beds beyond, and what tomorrow is */
    b5_c6_crossing:()=>({sp:'The crossing', scene:b56Ph() >= 2 ? 'b5_branskeep' : 'b5_c6_eve', again:()=>`The crossing on the dry channel, a strip of stones twenty paces wide.`, txt: b56Ph() >= 2 ?
`The crossing on the dry channel, with the battalion standing to on the far side of it in the grey, and the Sixth's place at ${b56Front() ? 'the front' : 'the second rank'}. It is time.` :
`The crossing on the dry channel: a place where the banks come down and the stones are flat enough to walk on, twenty paces wide, the only easy way over for half a league either way. If the right comes back tonight or tomorrow, it comes back here.

Beyond it the old lake beds go away north-east, flat and grey, toward the hills, and on the hills there are fires, a great many fires, more coming out every moment in the dusk. The whole battalion is looking at them.${b56Say({perrit:`\n\nPerrit stands with her back to the channel, which has no water in it, and faces the keep. "There are mages on both towers," she says. "Linked. I can feel the link from here." She does not say what else she can feel.`, ammet:`\n\nAmmet looks at the stones of the crossing. "Hard ground for carrying," she says. "I'll want the wounded off it quick." She does not say whose.`, _:''})}

Whoever falls over there, tomorrow, stays down.`,
      ch:[{t:'To the Whitefinders\' place in the line.', req:()=>b56Ph() >= 2, onward:true, go:'b5_c6_dawn_go'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the Sixth's fire on the eve (the Whitefinders' Drill goes here, from 89; keep the id) ---- */
    b5_c6_fire:()=>({sp:'The Sixth\'s fire', scene:'b5_c6_eve', again:()=>`The Sixth's fire in the Whitefinders' lines, and the Edur's fires on the hills across the channel.`, txt:
`The Sixth's fire among the Whitefinders' tents, the battalion's fires all round it, and the army's beyond those all the way to the keep and the lake, so many that the field looks lit from underneath. Across the channel, on the hills to the north-east, the Edur have fires too, and they are not fewer.

Not much is being drunk at the fire.${b56If('ammet', ' Ammet is not drinking at all, which nobody remarks on, because she never does the night before.')}${b56If('pessa', `\n\nPessa sits with her boathook across her knees and watches the Edur's fires as if they were a bargeman she owed money.`)}${b56If('ruuk', `\n\nRuuk has climbed onto the quartermaster's cart to see the hills better, and is counting fires, and has given up.`)}${b56If('brune', `\n\nBrune sits with her back to the channel and her face to the lake, the way she would sit at a fire on a shore.`)}`,
      ch:[{t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b5_c6_rest, fx:()=>{ S.f.b5_c6_rest = 1; b5Rest('The squad sits an hour by its own fire in its own battalion\'s lines, the night before. Wounds close, mostly.'); }, go:'b5_c6_fire_rest'},
          {t:'The pay desk, at the clerk\'s case.', go:'b5_c6_pay'},
          {t:'Talk with the squad.', go:'b5_c6_fire_talk'},
          {t:'Thegg has Pessa\'s pack by his own.', req:()=>b5In('thegg') && b5In('pessa') && !S.f.b5_c6_pack, go:'b5_c6_pack'},
          {t:'The bounty, at the clerk\'s table.', req:()=>!S.f.b5_bounty, go:'b5_c6_bounty'},
          {t:'Sleep. The morning comes early.', req:()=>b56Ph() < 2 && !!S.f.b5_bounty, onward:true, go:'b5_c6_night'},
          {t:'To the crossing. It is time.', req:()=>b56Ph() >= 2, onward:true, go:'b5_c6_dawn_go'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_fire_rest:()=>({sp:'The Sixth\'s fire', scene:'b5_c6_eve', txt:
`An hour by the fire. The battalion's lines go quiet round it, a whole battalion pretending to sleep.

${b56Say({ammet:`Ammet goes round the squad and looks at feet, and at hands, and at the stitches from High Fort, and says "Hold still" to anyone who moves.`, thegg:`Thegg sits with his shield across his knees and his hand flat on it, and does not move for the whole hour.`, _:'One of them sleeps. The others watch the hills.'})}${b56If('tobet', `\n\nTobet counts his arrows, then his debts, then his arrows, and cuts a notch in the tally-stick, and looks at it a while, and puts it away.`)}${S.kit && S.kit.includes('b5_c6_paint') ? `\n\nWhoever has the drill-sergeant's paint-pot goes along the squad's shields by the firelight and paints every fingertip fresh, white, one after another, and the squad watches it done, and it helps, and the squad could not tell you why.` : ''}`,
      ch:[{t:'Back to the fire.', go:'b5_c6_fire'}]}),
    /* one short scene each: who they were before the paybook, and what they would do paid up */
    b5_c6_fire_talk:()=>{ const ln = [];
      if (b5In('tobet')) ln.push(`Tobet is looking at the fire. "Before the paybook," he says, "I was a boy on a tenant farm who could hit a crow at sixty paces. That's all. That's why the army bought me." He thinks. "Paid up? I'd go and find the plough. Just to see it. Nine hundred docks of plough." He nearly smiles. "I'd want it to be a very good plough."`);
      if (b5In('thegg')) ln.push(`Thegg is talking low in his mother's tongue at the edge of the firelight, to his mother's people's dead. When he sees you he stops. "Before," he says, "I carried casks for the tavern. For her. Up the cellar steps, two at a time." He looks at his hands. "Paid up, I would close the tab. Write it out in my own hand. *Paid*." He considers. "Then I would sit in that tavern a whole night and not carry anything."`);
      if (b5In('perrit')) ln.push(`Perrit is doing nothing, which is so unlike her that people keep looking. "Before the school," she says, "I copied ledgers for my father in the Pursers' District at three docks a week. I was good at it." She turns her tile pouch over in her hands. "Paid up, I would open a school. For clerks' daughters. Sums and the Holds." A pause. "Not linking. I would not teach linking."`);
      if (b5In('ammet')) ln.push(`Ammet is threading a needle by the firelight. "Before the army," she says, "I was a cutler's prentice who sewed up the other prentices when they cut themselves. Then the cutler sold me my tools on a note." She holds the thread up to the light. "Paid up, I'd keep the tools and burn the note. In the cutler's own grate. Slowly." She bites the thread.`);
      if (b5In('ruuk')) ln.push(`Ruuk is on the cart, looking at the hills. "Before, I was a Faraed boy who knew every road," he says. "Now I am a Faraed boy who knows every road and owes Lether forty docks of grain." He grins down. "Paid up, I would go home and tell my grandmother the Letherii have a battle with more fires than stars. She will not believe it. She never believes me."`);
      if (b5In('brune')) ln.push(`Brune has her face to the lake. "Before, I had a boat," she says. "Then the harbour took it for the tax, and I had a debt." She is quiet for a while. "Paid up, I would have a boat again. A small one. I would not go far in it." She looks at the still water. "Not on this. The sea."`);
      if (b5In('pessa')) ln.push(`Pessa reads her line in the clerk's book out loud, from memory: "*Pessa*. Less thirty." She sniffs. "Before, I poled grain on the canals with my husband, and we owed the barge-master like everybody." She says it plainly, and lets it go. "Paid up?" She thinks about it as if nobody had ever asked. "I'd go back to the canal and find out who's poling my barge, and argue with them."`);
      return {sp:'The Sixth\'s fire', scene:'b5_c6_eve', txt:ln.length ? ln.join('\n\n') : `The squad is you tonight, and the fire. You sit with it, and think about the paybook, and what you would do with your line paid up, and find you have never once let yourself think it through.`,
        ch:[{t:'Back to the fire.', go:'b5_c6_fire'}]}; },
    /* Thegg gives Pessa her pack back (both walking; Ch5 had him carry it the first day) */
    b5_c6_pack:()=>({sp:'Thegg and Pessa', scene:'b5_c6_eve', fx:()=>{ S.f.b5_c6_pack = 1; b56L('pessa', 1); b56L('thegg', 1); }, txt:
`Thegg gets up from his side of the fire with Pessa's pack in his hand, the sack with the strap that he has carried on his own shoulder ${S.f.b5_c5_pack ? 'since the road south' : 'since she came in'}, and sets it down beside her, carefully, the right way up.

"Tomorrow," he says, "you should have your own things." He goes back to his side of the fire and sits down.

Pessa looks at the pack for a while. Then she puts her hand on it. "I'd have carried it," she says. "I've carried worse." Thegg nods. "I know," he says. Neither of them says anything else about it, and that is the whole of it, and the squad pretends it did not see.`,
      ch:[{t:'Back to the fire.', go:'b5_c6_fire'}]}),

    /* the night before: short */
    b5_c6_night:()=>({sp:'The night', scene:'b5_c6_eve', again:()=>`The night before, and the Edur's fires on the hills.`, txt:
`The night is short and nobody sleeps much of it. The army's fires burn down across the field one by one, and the Edur's on the hills do not.

Some time after midnight a sound comes over the field from the north, low, like a great many people breathing at once. It goes on and on, and then stops, and the battalion lies in its blankets listening to it stop.${b56If('thegg', `\n\nThegg talks to his mother's people's dead, very low, until the fires are ash, in her tongue. The squad lets him tell them in private.`)}${b56If('tobet', `\n\nTobet sleeps with his bow in his arms, like a child with a stick.`)}${b56If('perrit', `\n\nPerrit lies awake on her back with her hand on the tile pouch, and twice you hear her say a number under her breath, and then stop.`)}

Then the sky over the lake goes grey, and the horns go along the lines.`,
      ch:[{t:'First light.', onward:true, fx:()=>{ S.f.b5_c6_ph = 2; }, go:'b5_c6_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 2: dawn; the reading's place (a shield on the grass at first light, dust) ---- */
    b5_c6_dawn:()=>({sp:'Brans Keep · first light', scene:'b5_branskeep', fx:()=>{ S.f.b5_c6_ph = Math.max(2, b56Ph()); },
      again:()=>`First light over Brans Keep, the army standing to, and dust coming up to the north.`, txt:
`First light over Brans Keep. The army is standing to in its lines from the river to the lake, a long dark edge across the field with its banners over it, and the keep behind with its two corner towers and the figures on them.

To the north, across the field, dust is coming up. A great deal of it. It does not drift the way dust drifts.

Finadd Ennic comes along the Sixth's tents with his book under his arm. "The crossing, Sergeant," he says. "Our place. In a quarter of an hour." He looks at the dust. "Whatever there is to do before, do it now."`,
      ch:[b5TileChoice(6),
          {t:'To the crossing.', onward:true, go:'b5_c6_dawn_go'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_tiles:()=>b5TileOffer(6),
    b5_c6_card:()=>b5TileCard(6),
    b5_c6_tiles_done:()=>({sp:'The Tiles of the Holds', scene:'b5_branskeep', txt:
`${S.f.b5_c6_drawn ? (S.f.b5_c6_reader === 'perrit' ? 'Perrit puts the tiles back in the pouch one at a time and ties it twice, and then a third time, and picks her shield up off the grass and puts it on her arm.' : 'The tile-woman wraps the bone tiles in the oiled cloth and gives the soldier his shield back, and the dock goes somewhere in her shawl. "Stand somewhere sensible," she says, and goes back to the carts.') : 'The tiles stay in the pouch.'} The horns go again along the lines.`,
      ch:[{t:'To the crossing.', onward:true, go:'b5_c6_dawn_go'},
          {t:'Back to the lines.', go:()=>startExplore()}]}),
    b5_c6_dawn_go:()=>({sp:'The crossing', scene:'b5_branskeep', again:()=>`The crossing, and the battalion going over it to the far lip.`, txt:
`The battalion goes over the crossing to the far side of the dry channel, company by company, and forms on the far lip facing the old lake beds, and the Sixth goes with it, ${b56Front() ? 'to the front of the crossing, where the channel\'s far bank comes down to the stones' : 'into the second rank, behind the Second Company\'s shields'}.

The banks of the dry channel are higher than a man on the far side. Down in it, among the stones, it is very quiet. You touch the white fingertip on your shield's boss, for the Errant, and so does the soldier beside you, and the one beside that.`,
      ch:[{t:'Into the channel.', onward:true, go:()=>{ S.f.b5_c6_ph = 2; startExplore('b5_c6_channel'); talk('b5_c6_channel_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the day, in the dry channel: the sorceries, the clash, the break ---- */
    b5_c6_channel_arrive:()=>({sp:'The dry channel', scene:'b5_c6_pillars', again:()=>`The dry channel, and the battalion on the far lip above it.`, txt:
`The dry channel, a bed of stones between two banks, with the battalion's line along the far lip above you and the crossing behind. From the lip you can see the whole field: the old lake beds going away north-east toward the hills, and far off to the left the keep, and the army, and the dust.

The dust is moving.`,
      ch:[{t:'Up on the lip. Watch the field.', go:'b5_c6_sorcery'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_sorcery:()=>({sp:'The field', scene:'b5_c6_pillars', fx:()=>{ S.f.b5_c6_day = Math.max(1, b56Day()); },
      again:()=>`The field from the lip: the pillars over the left and the centre, and the keep under them.`, txt:
`It begins far off, over the left and the centre, and the right watches it from across the channel, a long way off, with nothing to do but watch.

The Edur's sorcerers raise the dust. It goes up off the field in dark streams, tall and slow, and leans toward the army. The army answers: from the keep's towers and from the cadre in the lines a wave of white fire goes out across the field, so bright the right has to look away, and where it goes through the dark things in front of the Edur they come apart in hundreds. The wraiths go forward anyway. They are going forward to be burned, and they do not seem to mind.

Then the pillars. Huge dark columns, rising out of the dust over the Edur's lines, higher than the cliff behind the keep, higher than anything. The white fire meets them, and something goes wrong in the meeting. The light over the keep changes colour.

Both corner towers come down, the left and then the right, the way a sandcastle goes when the sea reaches it, with the mages and the mangonels on them. The white fire goes wild, and runs back along the army, and then the pillars lean, and come down on the left and the centre.

Afterwards nobody on the right can say how long it took. Far off, where the King's Battalion was, a standard that everybody on the field knows by its colours goes under, and does not come up.${b56Say({perrit:`\n\nPerrit has gone the colour of the stones. "The link," she says, very quietly. "Every link in the army. It went." She is holding on to the bank with both hands.`, tobet:`\n\nTobet's lips move: he is counting something. Then: "That was the Preda's," he says, flat, about the standard. The squad lets it stand.`, _:''})}`,
      ch:[{t:'The lake beds. Something is coming over them.', go:'b5_c6_clash'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_clash:()=>({sp:'The far lip', scene:'b5_c6_pillars', fx:()=>{ S.f.b5_c6_day = Math.max(2, b56Day()); if (!S.f.b5_c6_blade) { S.f.b5_c6_blade = 1; gain('b5_c6_edurblade'); } },
      again:()=>`The far lip, the battalion's line on it, and the Edur in front.`, txt:
`They come over the old lake beds late, as Ennic said they would: an army of Edur out of the north-east, from the hills, across the flat grey ground at a run, and the right sees them coming most of an hour before they arrive. "The ones who came over the lake beds," the soldiers call them, all that day and afterwards. The right never learns more of their name than that.

There is no sorcery in them. They come at the right with swords, and the right meets them with shields, along the channel's far lip, hand to hand, Artisans and Riven and Whitefinders, and it holds. ${b56Front() ? 'The Sixth is in it from the first moment, at the front of the crossing, shields up and the Edur on them.' : 'The Second Company takes the first of it, in front of the Sixth, and then the Second is fewer and the Sixth is in it too.'}

It is not like High Fort. Here the dying is not done by light. They are dying the ordinary way, and the right is good at the ordinary way, and for an hour, for two, it holds the lip.

In a lull, when the Edur in front of the Sixth have gone back to the lake beds to come again, ${b56Say({thegg:'Thegg comes down off the lip with an Edur sword in his hand that its owner will not want back, and gives it to the squad without a word', tobet:'Tobet picks an Edur sword up off the stones of the channel, where its owner left it, and holds it out to whoever wants it', _:'there is an Edur sword on the stones of the channel, where its owner left it, and somebody picks it up'})}.`,
      ch:[{t:'Back to the lip.', go:'b5_c6_break'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_break:()=>({sp:'The far lip', scene:'b5_c6_break', fx:()=>{ S.f.b5_c6_day = 3; },
      again:()=>`The battalion breaking along the lip, and the pillar coming.`, txt: b56Key() ?
`It is decided. ${b56Key() === 'stand' ? 'The Sixth holds the crossing.' : 'The Sixth goes back over the channel.'}` :
`Then the right sees.

It sees because somebody on the lip turns round, and then everybody does: the left is gone, and the centre is gone, and where the army was there is a field with the pillars standing on it, and the keep beyond, burning. The Merchants' Battalion is not in front of the lake. The King's Battalion is not at the walls. There is nobody between the right and the cliff but the dead.

And one of the pillars has turned. It has come off the centre and is crossing the field toward the right, slowly, as if it had all the day, and the ground under it is going dark.

The right breaks. It goes at once, all along the lip, Artisans and Riven and Whitefinders, not running yet, going back, down into the dry channel and over it at the crossing, a thousand soldiers on a strip of stones twenty paces wide. The Edur on the lake beds see it and come on.

Finadd Ennic is beside you with his sword out, which you have never seen before. "Sergeant," he says, and waits, as he always waits. Whatever you put in front of him, he will do it with his sword out.${b56Say({thegg:`\n\nThegg looks at the crossing and the soldiers crowding onto it. "Someone has to stand at the end," he says. "That is what the end is for." He does not say it should be him. He sets his shield.`, _:''})}${b56If('tobet', `\n\nTobet has three arrows left. "We could just go," he says, very quietly. "Nobody would write it down."`)}${b56If('perrit', `\n\nPerrit is looking at the pillar. "It is slow," she says. "We have the time it takes to cross the field. That is all we have."`)}${b56If('ammet', `\n\nAmmet has her bag on her back. "If we stand," she says, "I'll want somewhere to put them. If we go, I'll want them walking." She does not say which she wants.`)}${b56If('pessa', `\n\nPessa has her boathook down. "I'm not a soldier," she says. "I'll do what the soldiers do."`)}${b56If('ruuk', `\n\nRuuk is a step ahead already, toward the hills behind the keep. "There is a way up, if we hold," he says. "There is a way south, if we go. Both are roads."`)}${b56If('brune', `\n\nBrune looks at the dark coming across the field. "The Shore takes everything back," she says. "I would just like it to wait."`)}`,
      ch:[{t:'"Hold the crossing. Let the battalion go back over." (a mortal fight: whoever falls here stays down)', tag:'mortal', req:()=>!b56Key(), onward:true, fx:()=>{ S.f.b5_c6_key = 'stand'; }, go:'b5_c6_stand'},
          {t:'"Back over the channel, with the first of them. Toward Dissent."', req:()=>!b56Key(), onward:true, fx:()=>{ S.f.b5_c6_key = 'fallback'; S.f.b5_c6_fallen = []; b56L('thegg', -1); b56L('pessa', 1); b56L('tobet', 1); }, go:'b5_c6_fallback'},
          {t:'"Not yet."', req:()=>!b56Key(), go:()=>startExplore()},
          {t:'Not now.', req:()=>!!b56Key(), go:()=>startExplore()}]}),
    b5_c6_lip:()=>({sp:'The far lip', scene:b56Day() >= 3 ? 'b5_c6_break' : 'b5_c6_pillars', again:()=>`The far lip of the dry channel, and the field beyond it.`, txt: b56Key() ?
`The far lip, and the field beyond it, going dark under the pillar's shadow.` :
`The far lip of the dry channel, where the battalion stands. ${b56Day() >= 2 ? 'The Edur are on the lake beds in front of it, close.' : b56Day() >= 1 ? 'The field beyond it is not the field it was an hour ago.' : 'The dust is moving, far off to the left, over the army.'}`,
      ch:[{t:'Up on the lip.', req:()=>!b56Key(), go:()=>talk(b56DayNext())},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_crossback:()=>({sp:'The crossing', scene:b56Day() >= 3 ? 'b5_c6_break' : 'b5_c6_pillars', again:()=>`The crossing, the way back over.`, txt: b56Key() === 'stand' ?
`The crossing behind you, and the battalion going back over it.` : b56Key() === 'fallback' ?
`The crossing, crowded, and the Dissent road beyond.` :
`The crossing, the way back over the channel, behind the battalion's line. ${b56Day() >= 3 ? 'The battalion is going back over it now.' : 'Nobody is going back over it yet. That is what the line is for.'}`,
      ch:[{t:'Up on the lip.', req:()=>!b56Key(), go:()=>talk(b56DayNext())},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_ennic_day:()=>({sp:B5_FINADD.name, scene:'b5_c6_break', again:()=>`Finadd Ennic, with his sword out.`, txt:
`Finadd Ennic has his sword out and his book inside his coat. "${b56Key() === 'stand' ? 'The crossing, Sergeant. Until the last of them are over.' : 'Over, Sergeant. Toward Dissent. Keep them together.'}"`,
      ch:[{t:b56Key() === 'stand' ? 'To the crossing.' : 'Over the channel.', req:()=>(b56Key() === 'stand' && !S.f.b5_c6_channelDone) || (b56Key() === 'fallback' && !S.f.b5_c6_flightDone), onward:true, go:()=>talk(b56Key() === 'stand' ? 'b5_c6_stand' : 'b5_c6_fallback')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the key: stand (the mortal fight) ---- */
    b5_c6_stand:()=>({sp:'The crossing', scene:'b5_c6_break', again:()=>`The end of the crossing, and the Edur coming down the far bank.`, txt: S.f.b5_c6_channelDone ?
`The crossing is behind you. It is done.` :
`"Hold it," you say, and Finadd Ennic says it after you, louder, so the soldiers round the Sixth will hear it from an officer: "The Sixth holds the crossing. Everybody else, over."

The Sixth goes down off the lip into the channel and across the end of the crossing, between the battalion and the Edur, and turns round. Behind it the right goes back over the stones, as fast as a thousand soldiers can, eyes front, because the Sixth is there so that it need not turn round.

The Edur come down the far bank. This is hand to hand, and nobody here has any sorcery left, on either side. *Whoever falls here stays down.*${b56Say({thegg:'\n\n"Behind me," Thegg says.', _:''})}${b56If('pessa', `\n\nPessa sets the boathook's butt on the stones. "So this is the soldiering," she says. "I'd wondered."`)}`,
      ch:[{t:'"Shields. Hold the crossing."', req:()=>!S.f.b5_c6_channelDone, go:()=>startBattle('b5_c6_channel', {})},
          {t:'"The finger. Boss to boss, across the crossing." Lock the line before they reach it.', check:['might', 15], req:()=>!S.f.b5_c6_channelDone && !S.f.b5_c6_lockTried, fx:()=>{ S.f.b5_c6_lockTried = 1; },
            edges:id=>[id === 'thegg' && ['a shield is the thing he knows best', 2], S.f.b5_c6_fingerOk && ['the drill-sergeant showed the squad the finger', 2], id === 'brune' && ['she has held a gunwale against a tide', 1], id === 'perrit' && ['she is small, and the drill was made for the big', -1]],
            near:{t:()=>{ const w = b56Who(); return `Yes, but the line locks a breath late, and the first Edur sword comes over ${b56Pos(w)} rim before it does: cut, and bruised.`; }, fx:()=>bruise(b56Who(), bruiseN())},
            go:()=>startBattle('b5_c6_channel', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c6_lock_late'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_lock_late:()=>({sp:'The crossing', scene:'b5_c6_break', txt:
`The shields are still coming together when the Edur reach them. Rim under rim, and a boss a hand from the next, and a gap, and an Edur sword already in the gap.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c6_channel', {surprise:'e'})}]}),
    b5_c6_channel_after:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
      return {sp:'The crossing', scene:'b5_c6_break', fx:()=>{ if (S.f.b5_c6_channelDone) return; S.f.b5_c6_channelDone = 1; S.f.b5_c6_fallen = fell.slice(); S.f.b5_c6_ennicHurt = 1; S.f.b5_c6_stitched = b5In('ammet') ? 'ammet' : 'surgeons'; b56Survived(); }, txt:
`The pillar's shadow comes over the field, and over the lake beds, and the Edur stop. They look up at it, and then they go back, all of them, the way they came, quickly, as if they knew something about it that the Letherii did not.

The crossing behind the Sixth is empty. The battalion is over.

${fell.length ? `${b56And(fell.map(NAME))} did not get up.\n\n${fell.length > 1 ? 'They are' : (b5He(fell[0]) === 'she' ? 'She is' : 'He is')} lying on the stones of the crossing where the line was, and the shadow is coming, and there is no time, and no way to carry ${fell.length > 1 ? 'them' : b5Him(fell[0])} and run. The squad does what there is to do, which is very little, and quickly. Then it goes.` : `Everyone in the squad gets up. You count them twice, on the stones, with the shadow coming, and get the same number both times.`}

Finadd Ennic is sitting on the stones with his hand pressed to his side, and blood coming through his fingers. "It is nothing," he says, which is not true. ${b5In('ammet') ? 'Ammet is already kneeling by him with the needle out. "Hold still," she says, and he does, and she stitches him on the stones of the crossing with the shadow coming, quickly and well, and ties it off, and gets him up.' : 'Two of the battalion\'s surgeons come back over the crossing for him, against the tide of soldiers going the other way, and stitch him where he sits, and get him up.'}

"The hills," he says, on his feet. "Behind the keep. Up." He looks at the crossing once, and then he turns his back on it.`,
        ch:[{t:'Up into the hills.', onward:true, go:()=>{ S.f.b5_c6_ph = 3; startExplore('b5_c6_hills'); talk('b5_c6_hills_arrive'); }}]}; },

    /* ---- stand: the hills behind the keep, the Jheck hunting ---- */
    b5_c6_hills_arrive:()=>({sp:'The hills', scene:'b5_c6_break', again:()=>`The hills behind the keep, scrub and scree and thorn.`, txt:
`The hills behind the keep are barren: scrub and scree and thorn, and old dry water-courses going up between the rocks. The Sixth goes up them with what is left of the battalion spread out across the slopes, every company on its own.${b56Fallen().length ? ` The Sixth is ${b56Fallen().length > 1 ? `${b56Fallen().length} fewer` : 'one fewer'} than it came over the crossing this morning, and nobody is saying so.` : ''}

Behind and below, on the field, the pillars are still standing. Wolves are coming up the slopes, not many, not fast, the way wolves come when they know a flock is tired, and a few shapes drift with them that are not wolves.${b56If('ruuk', `\n\nRuuk is a step ahead, of course. "Not that way," he says. "The map lies. Come." There is no map. He means the slope.`)}`,
      ch:[{t:'The wolves are on the trail. Meet them.', req:()=>!S.f.b5_c6_hillsDone, go:'b5_c6_hunt'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_hunt:()=>({sp:'The Jheck\'s trail', scene:'b5_c6_break', again:()=>`The trail up the hill, and the wolves on it.`, txt: S.f.b5_c6_hillsDone ?
`The trail up the hill, empty now.` :
`The wolves are on the trail below the Sixth, between it and a file of Riven soldiers who have stopped on the scree because one of them cannot go on. The Jheck have seen the file. They have seen the Sixth too.`,
      ch:[{t:'"Shields. Down to them."', req:()=>!S.f.b5_c6_hillsDone, go:()=>startBattle('b5_c6_hills', {})},
          {t:'Up and round, above them on the scree, and down onto them.', check:['wits', 15], req:()=>!S.f.b5_c6_hillsDone && !S.f.b5_c6_screeTried, fx:()=>{ S.f.b5_c6_screeTried = 1; },
            edges:id=>[id === 'ruuk' && ['hills are his, and the map lies', 3], id === 'tobet' && ['he sees the whole slope from above', 1], id === 'pessa' && ['she keeps low', 1], id === 'thegg' && ['scree was not made for Thegg', -2]],
            near:{t:()=>{ const w = b56Who(); return `Yes, but the scree goes from under ${b56Pos(w)} feet on the way down, and ${b56Nm(w)} ${b56V(w, 'arrive', 'arrives')} on the trail sliding and skinned: bruised.`; }, fx:()=>bruise(b56Who(), bruiseN())},
            go:()=>startBattle('b5_c6_hills', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c6_scree_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_scree_seen:()=>({sp:'The Jheck\'s trail', scene:'b5_c6_break', txt:
`A stone goes rattling down the scree ahead of the squad, and then another, and the wolves look up the slope all together.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c6_hills', {surprise:'e'})}]}),
    b5_c6_hills_after:()=>({sp:'The hills', scene:'b5_c6_barrow', fx:()=>{ if (S.f.b5_c6_hillsDone) return; S.f.b5_c6_hillsDone = 1; if (!S.f.b5_c6_stone) { S.f.b5_c6_stone = 1; gain('b5_c6_lakestone'); } }, txt:
`The last wolf goes away down the slope toward the field, and the shapes with it, and the Riven file gets up off the scree and goes on, carrying the one who could not.

Then the sky over the field begins to come down.

The pillars lift. They go up off the field slowly, the way they came, and as they go, what they took up with them comes down: dust first, and then a long rattling rain over the whole field, of armour and broken things and what was in the armour. The Sixth stands on the scree and watches it fall a long way off, and the squad is quiet until it stops. Behind it, the keep is burning.

${by({sgt:'You pick', _:'{who} picks'})} up a stone from the dry course at your feet, because your hand wants something to hold: a flat stone from the old lake bed, banded, pale grey with a darker ring.`,
      ch:[{t:'Up to the ridge.', onward:true, go:'b5_c6_ridge'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_ennic_hills:()=>({sp:B5_FINADD.name, scene:'b5_c6_break', fx:()=>{ S.f.b5_c6_ennicHills = 1; },
      again:()=>`Finadd Ennic, sitting on a rock with his hand on his side.`, txt:
`Finadd Ennic is sitting on a rock with his hand on the stitches and his book open on his knee, writing, slowly, because his hand is not steady. "The roll," he says. "I wrote it out fair last night. In case." He does not look up. "I am crossing it out now. Properly."${b56Fallen().length ? ` He writes a name, and then ${b56Fallen().length > 1 ? 'another' : 'nothing more'}, and blots it.` : ' He looks at the page for a while. "Nobody from the squad," he says. "I will write that down too. It deserves writing down."'}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    /* a wayside shrine to the Errant in the hills: a dish of docks left for him. Take it, or leave it. */
    b5_c6_shrine:()=>({sp:'A wayside shrine', scene:'b5_c6_break', again:()=>`The wayside shrine on the hill path, ${S.f.b5_c6_shrine === 'took' ? 'its dish empty' : 'its dish of docks'}.`, txt:
`A wayside shrine on the hill path above the keep, a hut of stones the size of a dog's kennel with a holed dock carved over its door: the Errant's, for travellers on the Dissent road, from when there was a road here that people travelled. In front of it there is a clay dish, and in the dish there are docks, left by people going past for luck, over years. Eight of them, untouched. You do not take the Errant's docks.${S.f.b5_c6_shrine ? (S.f.b5_c6_shrine === 'took' ? '\n\nThe dish is empty now. You emptied it.' : '\n\nYou left them. They are still there.') : ''}`,
      ch:[{t:'Take them. Nobody else is coming this way.', req:()=>!S.f.b5_c6_shrine, fx:()=>{ S.f.b5_c6_shrine = 'took'; b56Docks(8, 'out of the Errant\'s dish on the hill path'); }, go:'b5_c6_shrine_took'},
          {t:'Leave them. Put one of your own in.', req:()=>!S.f.b5_c6_shrine && (S.silver || 0) >= 1, fx:()=>{ S.f.b5_c6_shrine = 'gave'; S.silver -= 1; updSilver(); }, go:'b5_c6_shrine_gave'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_shrine_took:()=>({sp:'A wayside shrine', scene:'b5_c6_break', txt:
`The docks go into your purse, eight of them, cold. Nothing happens. On a day like today, nothing would.${b56If('tobet', ` Tobet watches you do it. "He'll want those back," he says. "With interest. He's Letherii."`)}`,
      ch:[{t:'Back to the path.', go:()=>startExplore()}]}),
    b5_c6_shrine_gave:()=>({sp:'A wayside shrine', scene:'b5_c6_break', txt:
`You put a dock of your own in the dish with the eight, and it makes nine, and you touch the white fingertip on your boss, for the Errant, from habit.${b56If('perrit', ` Perrit watches. "Nine docks to a god who is not there," she says. "Nine." She does not say whether she disapproves.`)}`,
      ch:[{t:'Back to the path.', go:()=>startExplore()}]}),
    /* the ridge: the field, the keep burning, the declaration heard, the barrow at night */
    b5_c6_ridge:()=>({sp:'The ridge', scene:'b5_c6_barrow', again:()=>`The ridge above the field, and the barrow below.`, txt: !S.f.b5_c6_hillsDone ?
`The ridge is above, and the wolves are between it and the Sixth.` :
`From the ridge the whole field lies below, in the last of the light, and it is very quiet. The keep is burning. The field is covered from the cliff to the lake with what the sky put down on it. On the old lake beds, the Edur are making camp.

At dusk a soldier of the Riven comes up the slope alone, without a weapon, and sits down among the Sixth, and says what he was let go to say. The Edur took him on the field, and a great many others, and then they let some go, to carry word. Their Emperor has declared it. The Letherii are his subjects now, every one. He will not have the day called a victory. And the dead, both armies' dead, are to be buried together, in one barrow, ready by midnight.

He says it as if he does not believe any of it, and then he lies down on the scree and sleeps.`,
      ch:[{t:'Watch the field.', req:()=>!!S.f.b5_c6_hillsDone, onward:true, go:'b5_c6_barrow'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_barrow:()=>{ const fell = b56Fallen(), k = b56Key() || 'stand';
      return {sp:'The barrow', scene:'b5_c6_barrow', html:debtHTML('The Sixth Company · after Brans Keep'), fx:()=>{ S.f.b5_c6_ph = 4; S.f.b5_barrowSeen = 1; b56HeirsWritten(); }, again:()=>`The barrow on the field, and the torches round it.`, txt:
`In the night, torches come out on the field below, hundreds of them, and move about, and gather in a long line, and under the torches the ground rises: a mound, very long, raised in a night by a great many hands, with the dead of both armies going into it together. The Sixth watches it from ${k === 'stand' ? 'the ridge' : 'the Dissent road'} until the torches go out, near midnight, one by one.

${fell.length ? `${b56And(fell.map(NAME))} ${fell.length > 1 ? 'are' : 'is'} in it. The squad knows it without the words.\n\n` : ''}${b56House() ? `Before the torches are out the house's factor comes ${k === 'stand' ? 'up the hill path' : 'along the road'} with his clerk and the umbrella, from the field, where he has been at the barrow. "The Edur let the Letherii write their dead," he says. "Subjects, it seems, may keep books." He opens his ledger on a rock. ${fell.length ? `He writes the Sixth's dead to their heirs, in his clean hand, with the house's interest on top, one part in ten, and blots it.` : 'He writes the battalion\'s dead to their heirs, page after page, with the house\'s interest, and the Sixth\'s page he writes with no names on it, and seems almost put out.'}` : `The company clerk sits on the oilskin case by the Sixth's little fire with the book open on his knees, and writes. ${fell.length ? 'He writes the Sixth\'s dead to their heirs, out of the list he made the night before, without interest, because the army does not charge interest on the dead, and he says so, aloud, as if somebody had asked.' : 'He writes the company\'s dead to their heirs, from the battalion\'s roll, without interest. The squad\'s page he leaves as it is.'}`}${fell.length ? `\n\n${fell.map(b56Heir).join(' ')} It is not the squad's to pay. The army's rule says the heirs carry it, and the army's rule is written down.` : ''}${b56If('thegg', `\n\nThegg watches the torches a long time. "My mother's people raised barrows," he says. "For everybody, after. Both sides." He thinks. "I did not think the Edur knew."`)}${b56If('pessa', `\n\nPessa watches the torches go out. "So he's their Emperor and we're his," she says. "I've been his a whole afternoon and I've not had a ration off him yet."`)}${b56If('ruuk', `\n\nRuuk sits with his knees up, watching. He does not name any birds tonight.`)}${b56If('brune', `\n\nBrune watches the mound rise. "The Shore would have taken them," she says. "This is slower." She does not say which she would rather.`)}`,
        ch:[{t:'The morning, and the road to Letheras.', onward:true, go:'b5_c6_end'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c6_end:()=>{ const k = b56Key() || 'stand';
      return {sp:'After Brans Keep', scene:'b5_c6_barrow', txt:
`In the grey before morning Finadd Ennic gets the Sixth up, and counts it, and writes the count in his book, and shuts it.

"Letheras," he says. "Everybody who can walk is going to Letheras. The battalion's commander is dead, or taken; nobody knows which. The army is what is walking." He looks at the road. "I have been told nothing. So I will tell the Sixth what I would tell it if I had been told: Letheras, and the City Garrison, and the walls."

${k === 'stand' ? 'The Sixth comes down off the hills onto the Dissent road in the grey, among the stragglers, and turns south-east, toward the city.' : 'The Sixth turns off the Dissent road in the grey, among the stragglers, south-east, toward the city.'} Behind it the keep is still burning. In front of it, somewhere, the Edur are getting up too.${b56Say({tobet:`\n\nTobet walks with his bow unstrung over his shoulder. "Back to Letheras," he says. "Where they keep the books."`, _:''})}

You touch the white fingertip on your shield's boss, for the Errant, from habit, and find it chipped.`,
        ch:[{t:'South-east, to Letheras.', onward:true, go:()=>chapterEnd(6, k)},
            {t:'Not yet.', go:()=>startExplore()}]}; },

    /* ---- the key: fallback (the Dissent road, the flight) ---- */
    b5_c6_fallback:()=>({sp:'The crossing', scene:'b5_c6_break', again:()=>`The crossing, crowded, and the open ground beyond toward Dissent.`, txt:
`"Over," you say, and Finadd Ennic says it after you, to the Sixth: "Over, and together."

The Sixth goes back over the crossing with the first of the right to break, in the press of it, Artisans and Riven and Whitefinders all together on the stones, and up the near bank, and out onto the open ground going south-west toward the Dissent road. Behind it the crossing fills, and the Edur come down the far bank into the channel, and the Sixth does not see what happens at the crossing after that, because it is not looking back.${b56If('thegg', `\n\nThegg goes over the crossing last of the squad, walking backward with his shield up. "We left the crossing," he says, when he is over. He says it the way he would say a debt.`)}${b56If('pessa', `\n\nPessa is over first. "We left the crossing," she says. "Good."`)}${b56If('tobet', `\n\nTobet keeps his three arrows. "Nobody will write it down," he says. He sounds as if he will.`)}`,
      ch:[{t:'South-west, toward Dissent.', onward:true, go:()=>{ S.f.b5_c6_ph = 3; startExplore('b5_c6_dissent'); talk('b5_c6_dissent_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_dissent_arrive:()=>({sp:'The open ground', scene:'b5_c6_break', again:()=>`The open ground toward the Dissent road, and the fleeing on it.`, txt:
`The open ground south-west of the channel is grass and field walls and a road going away toward Dissent, and it is full of people running. The right is not an army now. It is soldiers in ones and twos and knots, going as fast as they can, and among them, on the grass, the wolves are going, and with the wolves a few shapes that drift over the ground and are not wolves.

The Jheck are running them down.`,
      ch:[{t:'To the knot of Riven at the field wall.', req:()=>!S.f.b5_c6_flightDone, go:'b5_c6_fleeing'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_fleeing:()=>({sp:'The field wall', scene:'b5_c6_break', again:()=>`The field wall on the open ground, and the Riven behind it.`, txt: S.f.b5_c6_flightDone ?
`The field wall, and the Riven gone on south from it.` :
`A knot of Riven soldiers has stopped against a field wall because two of them cannot run any further, and the wolves have seen them stop. They are going round the knot now, in a wide ring, the way wolves go.${b56If('ruuk', `\n\nRuuk has a spear in his hand. "They are wolves," he says. "Wolves hate a wall at their backs more than we do. Put them against it."`)}`,
      ch:[{t:'"Shields. To the wall."', req:()=>!S.f.b5_c6_flightDone, go:()=>startBattle('b5_c6_flight', {})},
          {t:'Along the wall\'s far side, low, and out at them from behind it.', check:['wits', 15], req:()=>!S.f.b5_c6_flightDone && !S.f.b5_c6_wallTried, fx:()=>{ S.f.b5_c6_wallTried = 1; },
            edges:id=>[id === 'ruuk' && ['he reads ground, and a field wall is ground', 2], id === 'pessa' && ['she keeps low, and she knows a towpath wall', 2], id === 'tobet' && ['he is where the blow is not', 1], id === 'thegg' && ['there is no wall in Lether that hides Thegg', -2]],
            near:b56Owe(10, 'A Riven soldier\'s dropped kit, signed for by the nearest Whitefinder', w => `Yes, but a Riven soldier drops his kit going over the wall and runs, and the Riven's quartermaster, later, finds ${b56Pos(w)} name in it and writes the kit against ${b56Pos(w)} line: ${b5Coin(10)}.`, {t:w => `Yes, but the wall's far side is a ditch, and ${b56Nm(w)} ${b56V(w, 'come', 'comes')} out of it with ${b56Pos(w)} heart going like a drum: rattled.`, fx:w => b56Rattle(w)}),
            go:()=>startBattle('b5_c6_flight', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c6_wall_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_wall_seen:()=>({sp:'The field wall', scene:'b5_c6_break', txt:
`A stone comes off the top of the wall under somebody's hand and goes down on the far side with a crack. The ring of wolves stops going round, all at once.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c6_flight', {surprise:'e'})}]}),
    b5_c6_flight_after:()=>({sp:'The open ground', scene:'b5_c6_barrow', fx:()=>{ if (S.f.b5_c6_flightDone) return; S.f.b5_c6_flightDone = 1; S.f.b5_c6_fallen = []; S.f.b5_c6_ennicHurt = 1; S.f.b5_c6_stitched = b5In('ammet') ? 'ammet' : 'surgeons'; if (!S.f.b5_c6_stone) { S.f.b5_c6_stone = 1; gain('b5_c6_lakestone'); } }, txt:
`The wolves go off across the grass toward the hills, and the shapes with them, after other knots and other walls. The Riven at the wall get up and go on south-west, carrying their two, and one of them stops long enough to touch his own boss to yours, for luck, which is not a thing the Riven do.

Finadd Ennic is sitting against the wall with his hand pressed to his side and blood coming through his fingers, where a wolf got past a shield. "It is nothing," he says, which is not true. ${b5In('ammet') ? 'Ammet is kneeling by him with the needle out before he has finished saying it. "Hold still," she says, and stitches him against the wall, quickly and well, and gets him up.' : 'Two surgeons of the Artisans, going past, stop and stitch him against the wall without being asked, and get him up, and go on.'}

Then the sky over the field behind begins to come down.

The pillars lift off the field the way they came, slowly, and what they took up with them comes down: dust, and then a long rattling rain of armour and broken things and what was in the armour, over the whole field, a long way off. The Sixth stands on the Dissent road and watches it fall, and the keep burn, and nobody says anything until it stops.

${by({sgt:'You pick', _:'{who} picks'})} up a stone from the old lake bed at the road's edge, because your hand wants something to hold: flat, banded, pale grey with a darker ring.`,
      ch:[{t:'On, toward Dissent.', onward:true, go:'b5_c6_roadsw'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_ennic_road:()=>({sp:B5_FINADD.name, scene:'b5_c6_break', fx:()=>{ S.f.b5_c6_ennicRoad = 1; },
      again:()=>`Finadd Ennic on the road, with his book under his arm.`, txt: S.f.b5_c6_ennicHurt ?
`Finadd Ennic walks with one hand on the stitches and the book under his other arm. "The roll," he says. "I wrote it out fair last night. In case." He looks at the road ahead. "Nobody from the squad. I will write that down. It deserves writing down." He does not say what else he will write about the crossing. Perhaps nothing.` :
`Finadd Ennic has his sword out still, and seems to have forgotten it. "Together, Sergeant," he says. "Whatever comes across that grass, together."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_cart:()=>({sp:'An abandoned cart', scene:'b5_c6_break', again:()=>`The abandoned cart by the road${S.f.b5_c6_cart ? ', its cashbox open' : ''}.`, txt: S.f.b5_c6_cart ?
`The sutler's cart, its mules gone, its cashbox open and empty.` :
`A sutler's cart stands by the road with its traces cut and its mules gone, and everything a sutler sells to an army still on it: boots, salt, a cask of something, ribbons. Under the seat, a cashbox, locked.`,
      ch:[{t:'Open the cashbox.', check:['might', 12], req:()=>!S.f.b5_c6_cart && !S.f.b5_c6_cartTried, fx:()=>{ S.f.b5_c6_cartTried = 1; },
            edges:id=>[id === 'thegg' && ['he simply opens it', 3], id === 'pessa' && ['she has got into a barge-master\'s box before', 1], id === 'perrit' && ['she would rather work out the lock', -1]],
            near:{t:()=>{ const w = b56Who(); return `Yes, but the lid comes up all at once and takes the skin off ${b56Pos(w)} knuckles with it: bruised.`; }, fx:()=>bruise(b56Who(), bruiseN())},
            go:'b5_c6_cart_ok', fail:'b5_c6_cart_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c6_cart_ok:()=>({sp:'An abandoned cart', scene:'b5_c6_break', fx:()=>{ if (!S.f.b5_c6_cart) { S.f.b5_c6_cart = 1; b56Docks(8, 'a sutler\'s cashbox, abandoned on the Dissent road'); } }, txt:
`The cashbox gives. Inside, eight docks, a sutler's tally-book and a lock of somebody's hair in paper. The squad takes the docks and puts the hair back under the seat, where the sutler will not come for it.${b56If('tobet', ` Tobet looks at the tally-book. "He was owed four hundred," he says. "By the army." He puts it back too.`)}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c6_cart_no:()=>({sp:'An abandoned cart', scene:'b5_c6_break', txt:
`The cashbox will not give, and the road behind is full of people running, and there is no time to stand at a sutler's cart with a stone. The Sixth leaves it.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c6_roadsw:()=>({sp:'The Dissent road', scene:'b5_c6_barrow', again:()=>`The Dissent road, going on south-west.`, txt: !S.f.b5_c6_flightDone ?
`The road goes on south-west, toward Dissent. Behind you on the open ground the wolves are among the fleeing, and the Riven at the field wall have stopped.` :
`The Dissent road at dusk, with the stragglers of the right on it, going south-west in a long loose file. Behind, the keep burns.

At dusk a soldier of the Riven comes along the road alone, without a weapon, and walks a while with the Sixth, and says what he was let go to say. The Edur took him on the field, and a great many others, and then they let some go, to carry word. Their Emperor has declared it. The Letherii are his subjects now, every one. He will not have the day called a victory. And the dead, both armies' dead, are to be buried together, in one barrow, ready by midnight.

He says it as if he does not believe any of it, and then he goes on ahead, faster.`,
      ch:[{t:'Watch the field from the road.', req:()=>!!S.f.b5_c6_flightDone, onward:true, go:'b5_c6_barrow'},
          {t:'Back to the field wall.', req:()=>!S.f.b5_c6_flightDone, go:'b5_c6_fleeing'},
          {t:'Not now.', go:()=>startExplore()}]}),
  },
};
