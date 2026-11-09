/* ============ Book Eight, Chapter 6: The Night of the Hounds ============ */
/* The Gedderone Fete's last night in Darujhistan (tth-canon correction 5; R22 S9, R23 S5, S22). The Fourth is back inside the walls from the
   road west. The city is out in masks; the moon has a crack across it that people point at and laugh. Then the Hounds come over the plain,
   the wall goes down in more places than one, the moon is in pieces, and the Gadrobi District burns. Never why (rule 81).
   Phase 1 (S.f.b8_c6_ph), the Fete at evening: the Fourth's door and the reading on a doorstep (B8READ[6]); the street (Benlo's masks, the
   last Fete remembered: callback 1, b8_c6_fete); the Gadrobi lanes (the painted sign again, the old soldier from Ch 1, Orsa, masked bravos
   shaking down the dyers' row, b8_c6_masks, optional; the Guild's hand-signs on the roofs, the trick); the foot of the east wall, an
   unnamed stretch, and the watch. Phase 2, the night breaks (b8_c6_turn): Hood is not at his gate (rule 74: Brisk's god is "the dead"
   tonight; the charm is cold, 140); the key S.f.b8_c6_key: 'wall' (an unnamed stretch of the broken wall with the watch, b8_c6_wall, stage
   2 the gap) or 'street' (the Gadrobi streets behind the wall and the Fourth's door, b8_c6_street, survive four rounds; a Hound passes the
   end of the street and goes on: b8_hound, never dropped, rule 14; stage 2 the door). Phase 3, the roofs: the Guild's knives, come under
   cover of the night, as many as the Contract says (b8Roofs(6)), and the one way out the Contract opens (b8WayOut()): 'quiet' nobody comes,
   'roofs' a hard check over the Gadrobi roofs (DC 18, contract:true; a failure starts the fight), 'word' Vasso's word to a journeyman he
   knows (loyalty 1 or more; never a guarantee), none. THE BOOK'S MORTAL FIGHT (b8_c6_knives, mortal:true, guild:true): whoever falls stays
   down, the sergeant gets up with a scar, no death checks. Phase 4, toward morning: the moon bursts (never why), the pieces go east.
   Never on the page: Traveller's breach, Cotillion, the gaol, the Temple of Shadow, the Noms' roofs, Coll's estate and the Finnest House,
   K'rul's Bar, the street of Rake's death, the Ravens, Envy and Spite, Hood's end, Dragnipur (tth-canon §4; rules 70-83).
   Notes for later chapters: docs/tth-ch6-notes.md. */
/* FOR THE ARTIST (146b): names this file uses.
   Items: ART['item/b8_c6_guildbow'], ['item/b8_c6_wallstone'].
   Backdrops: b8_wall_night (140's, yours: the broken wall from the Gadrobi side, smoke, the moon in pieces), and two this file adds that
   borrow until drawn: b8_c6_fete (the Fourth's street on the Fete's last evening: paper lanterns, masks, the moon with a crack across it)
   and b8_c6_burning (the Gadrobi streets after the wall broke: fire on the roofs, smoke, the moon in pieces, and at the end of the street,
   small, the dark shape of a Hound going by). Reused: b8_door, b8_gadrobi, b8_daru_night (Ch 1).
   Figures: reused only (b8_c1_benlo, b8_c1_veteran, b8_c1_orsa, reveller, guard, thug, hound). Ground: Book One's city_night (l lanterns,
   F braziers, r rubble, B barrels, D doors, x a post, g steps). */

/* ---- small helpers (b86: Book Eight, Chapter Six) ---- */
const b86L = (id, n) => { if (b8In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b86Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b8In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b86If = (id, s) => b8In(id) ? (typeof s === 'function' ? s() : s) : '';
const b86Who = () => (ROLL() && ROLL().who) || 'sgt';
const b86Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b86Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b86V = (id, you, they) => id === 'sgt' ? you : they;
const b86Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b86And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* the phase: 1 the Fete at evening, 2 the night broken (the key and its fight), 3 the roofs (the knives), 4 toward morning */
const b86Ph = () => S.f.b8_c6_ph || 1;
const b86Key = () => S.f.b8_c6_key === 'wall' || S.f.b8_c6_key === 'street' ? S.f.b8_c6_key : null;
const b86KeyOpen = () => !!S.f.b8_c6_fete && !!S.f.b8_c6_wallSeen;
const b86KeyDone = () => b86Key() === 'wall' ? !!S.f.b8_c6_wallDone : b86Key() === 'street' ? !!S.f.b8_c6_streetDone : false;
const b86Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b8In(id));
/* earlier chapters, read with defaults (a --from=6 save sets keys only) */
const b86Hunt = () => (b8Key(1) || B8KEY0[1]) === 'hunt';
const b86Fast = () => (b8Key(5) || B8KEY0[5]) === 'fast';
const b86Scouted = () => S.f.b8_c5_scouted != null ? !!S.f.b8_c5_scouted : !b86Fast(); // 'wary' found the road knives first (Ch 5)
const b86Charm = () => (S.kit || []).includes('b8_hoodcharm');
/* who fell in this chapter's mortal fight (the dead from earlier books carry a 'from') */
const b86Fell = () => Object.keys(S.dead || {}).filter(id => TPL[id] && S.dead[id] && S.dead[id].ch === 6 && !S.dead[id].from);
/* the knives: one in the street, and whoever the Contract has put on the roofs */
const b86Knives = () => ['b8_knife', ...b8Roofs(6)];
const b86KnifeWords = () => { const k = b86Knives(), v = k.filter(x => x === 'b8_veteran').length, g = k.includes('b8_gmknife'), n = k.filter(x => x === 'b8_knife').length;
  return `${numw(n)} knife${n === 1 ? '' : 's'}${v ? `, ${v > 1 ? numw(v) + ' veterans' : 'a veteran'} with the slow hands` : ''}${g ? ', and one more who stands apart from the rest and has no face the lamps can find' : ''}`; };
const b86VassoCan = () => b8In('vasso') && (S.loy.vasso || 0) >= 1;
const b86Wall = () => (S.kit || []).includes('b8_c6_wallstone');

/* ---- The Knife-Sign: the Guild's hand-signs, roof to roof, read off the knives' own fingers. It copies Claw Hand-Cant (cant, t_cant): sign
   an enemy within 6, and the next hit on it this round is a critical (two hits from the second squad level). v10.3: it strikes nobody, so it
   is free (one free trick a turn). Not sorcery. ---- */
Object.assign(TRICKS, {
  b8_c6_knifesign:{name:'The Knife-Sign', ch:6, use:'fight', ab:'t_b8_c6_knifesign', where:'a lamp-post in the Gadrobi lanes, the Fete\'s last evening, watching the roofs',
    lore:'The Guild talks on the roofs with its hands, the way the Claw does: a flat palm for hold, two fingers for the street, a thumb drawn down the throat for the one the paper names. It is not the Claw\'s cant. It is its cousin, from the same street, and anyone who has read one can learn to read the other with a night of watching. Then you can say it back, to your own.',
    get fx(){ const n = 1 + lvT(); return `Once a fight: give the Guild's sign for an enemy within 6, the thumb down the throat. The next ${n > 1 ? numw(n) + ' hits' : 'hit'} on it this round ${n > 1 ? 'are criticals' : 'is a critical'}. Grows with level. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b8_c6_knifesign:{name:TRICKS.b8_c6_knifesign.name, trick:'b8_c6_knifesign', free:true, desc:()=>TRICKS.b8_c6_knifesign.fx,
    tiles:u=>foes().filter(f => !f.b8hound && cheb(u, f) <= 6 && f.cantRound !== B.round && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; t.cantRound = B.round; t.cantLeft = 1 + lvT(); AUDIO.play('click'); float(t, 'that one', '#cfd8e8'); sparks(t.x, t.y, 6, '#cfd8e8', .3);
      blog(`${u.name}'s thumb goes down the throat, the Guild's own sign, for the squad to read. <em>That one.</em>`); }},
});

/* ---- the Guild's crossbow goes past soak, as the Guild's own does (031c) ---- */
SOAK_PIERCE_ITEMS.add('b8_c6_guildbow');

/* ---- borrowed pictures until the artist's file (146b) replaces them ---- */
{ const like = {b8_c6_fete:'b8_daru_night', b8_c6_burning:'b8_wall_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof ART !== 'undefined') [['b8_c6_guildbow', 'b7_c3_letherxbow'], ['b8_c6_wallstone', 'b7_c4_musterbadge']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Eight's glossary ---- */
GLOSSX.tth.push(
  [6, 'The last night', 'The Gedderone Fete\'s last night, the night the Hounds came into Darujhistan and the wall went down and the moon broke. The Fourth has asked around, and no one can say why. The Fourth has stopped asking.', ()=>!!(S && S.book === 'tth' && (S.chapter || 0) >= 6)],
  [6, 'The Guild\'s hand-signs', 'How the Assassins\' Guild talks roof to roof: palms, fingers and a thumb down the throat. A cousin of the Claw\'s cant, from the same street.', ()=>!!(S && S.f && S.f.b8_c6_signsSeen)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[6] = ['b8_c6_fire'];

/* the reading: a doorstep in the Gadrobi streets (the Gate leans, B8POOL[6]) */
B8READ[6] = {scene:'b8_c6_fete', where:'a doorstep in the Gadrobi streets', set:'The Fourth\'s own step, up the street from the Phoenix, on the Fete\'s last evening: paper lanterns strung across the street, masks going by, and the moon over the roofs with a crack across it.', back:'b8_c6_fire', backT:'Back inside.',
  say:{tuft:'"On the step," Tuft says, and sits on it, with the masks going by close enough to tread on the cards. "Everybody in the city is pretending to be somebody else tonight. The Deck likes that." She does not look as if she does. "One card."',
       sohra:'"The bones do not like masks," Sohra says, and sets the cup on the step between her knees. "They want to see who is throwing. Tonight nobody is anybody." She shakes the cup. "Sit close."',
       benna:'"I wash for half this street," says Benna, lowering herself onto the step with a grunt, "and I\'ll read for the other half, Fete or no Fete." She holds her hand out. "Copper. The Fete doesn\'t make it free."'}};

const B8CH6 = {
  title:B8CH[6], number:'Six',
  intro:{loc:'Darujhistan', sub:'The Gadrobi District · the Fete\'s last night', scene:'b8_c6_fete', cap:'Paper lanterns across the street, masks going by, and over the roofs the moon with a crack across it.',
    paras:[
`The Gedderone Fete has run its days, and this is the last night of it. The whole of Darujhistan is out in the streets in masks, and the paper lanterns are strung roof to roof across every lane in the Gadrobi District, red and amber and green, swaying over the crowds. The gas-lamps burn blue under them, as they always do.`,
()=>{ const v = b86Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, and the Fourth is home. ${b86Fast() ? 'The wagons came in through the east gate before it shut for the night, ahead of whatever the road had waiting.' : 'The wagons came in through the east gate at dusk, with the road behind them and what was on it.'} ${v.length ? `${b86And(v)} ${v.length > 1 ? 'are' : 'is'} with you, and the door up the street from the Phoenix is still yours.` : 'The door up the street from the Phoenix is still yours. The ledger came home too.'}`; },
`Over the roofs, the moon has a crack across it, clean as a plate's. People in the street point at it, and laugh, and put their masks back on.`],
    go:'To the door', node:'b8_c6_start'},

  areas:[
    /* 16 x 12 (city_night). . cobbles  , gutter  # house fronts  D the Fourth's door  l Fete lanterns on poles  B barrels  L gas-lamps
       < down the street, toward the Phoenix  > on into the Gadrobi lanes */
    { id:'b8_c6_lane', title:'Darujhistan · the Fourth\'s street', sub:'The Gadrobi District · the Fete\'s last night', hint:'Tap ground to move · tap a figure to talk · the Fourth\'s door is the one with the bar behind it', decor:'city_night', dark:true,
      map:[ "################",
            "###L####D###l#L#",
            "#..............#",
            "#.l.....,....l.#",
            "#......B.......#",
            "<..............>",
            "#..,....l......#",
            "#L....,.....,.L#",
            "######....######",
            "######.k..######",
            "######L..L######",
            "################" ],
      walk:'.,Dk<>', triggers:{D:'b8_c6_fire', k:'b8_c6_moon', '<':'b8_c6_phoenix', '>':'b8_c6_to_lanes'}, start:{x:8, y:2},
      quest:()=> b86Ph() === 1 ? (!S.f.b8_c6_fete ? 'Benlo, with a barrow full of masks.' : !S.f.b8_c6_lanesSeen ? 'The Gadrobi lanes, east. The whole district is out.' : !S.f.b8_c6_wallSeen ? 'The east wall, past the lanes. The watch is up there.' : 'The door, and the fire.')
        : b86Ph() === 2 ? (!b86Key() ? 'The door. Decide.' : b86Key() === 'street' && !S.f.b8_c6_streetDone ? 'The door. Hold the street.' : b86Key() === 'wall' && !S.f.b8_c6_wallDone ? 'The lanes, and the wall beyond them.' : 'The door.')
        : b86Ph() === 3 ? 'The door. Something is on the roofs.'
        : 'The door. Morning is coming, somewhere.',
      npcs:[
        {id:'benlo', name:'Benlo, with a barrow of masks', kind:'b8_c1_benlo', x:4, y:4, node:()=> b86Ph() >= 4 ? 'b8_c6_benlo_late' : 'b8_c6_benlo', show:()=>b86Ph() === 1 || b86Ph() >= 4, fresh:()=> b86Ph() >= 4 ? !S.f.b8_c6_benloLate : !S.f.b8_c6_fete},
        {id:'revellers', name:'Masks in the street', kind:'reveller', x:11, y:6, node:()=>'b8_c6_revellers', show:()=>b86Ph() === 1, fresh:()=>!S.f.b8_c6_revellers},
        {id:'neighbours', name:'The neighbours, on their steps', kind:'reveller', x:11, y:3, node:()=>'b8_c6_neighbours', show:()=>b86Ph() >= 4, fresh:()=>!S.f.b8_c6_neighbours} ] },

    /* 16 x 12 (city_night). The Gadrobi lanes, the dyers' row. D the tavern with the painted sign  x a lamp-post where the Guild's line
       comes down  g the steps down to Orsa's den  F a Fete brazier  < back to the Fourth's street  v down to the east wall */
    { id:'b8_c6_lanes', title:'Darujhistan · the Gadrobi lanes', sub:'The dyers\' row · the Fete\'s last night', hint:'Tap ground to move · tap a figure to talk · the wall is south, the Fourth\'s street west', decor:'city_night', dark:true,
      map:[ "################",
            "##D####x###g####",
            "#..............#",
            "#.,....l.......#",
            "#..........,...#",
            "<..............#",
            "#....l.....F...#",
            "#.,............#",
            "#######..#######",
            "#######..#######",
            "#######L.#######",
            "#######vv#######" ],
      walk:'.,Dxg<v', triggers:{D:'b8_c6_sign', x:'b8_c6_post', g:'b8_c6_orsa', '<':'b8_c6_lanes_back', 'v':'b8_c6_to_wall'}, start:{x:1, y:5},
      quest:()=> b86Ph() === 1 ? (!S.f.b8_c6_signSeen ? 'The tavern with the painted sign, on the corner.' : !S.f.b8_c6_wallSeen ? 'South, to the wall and the watch.' : 'Back to the Fourth\'s street.')
        : b86Ph() === 2 && b86Key() === 'wall' && !S.f.b8_c6_wallDone ? 'South, to the wall. It is down.' : 'Back to the Fourth\'s street.',
      npcs:[
        {id:'vet', name:'The old soldier from the Seven Cities lot', kind:'b8_c1_veteran', x:3, y:2, node:()=> b86Ph() >= 4 ? 'b8_c6_vet_late' : 'b8_c6_vet', show:()=>b86Ph() === 1 || b86Ph() >= 4, fresh:()=> b86Ph() >= 4 ? !S.f.b8_c6_vetLate : !S.f.b8_c6_vetMet},
        {id:'masks', name:'Bravos in masks', kind:'thug', x:10, y:3, node:()=>'b8_c6_masks_start', show:()=>b86Ph() === 1 && !S.f.b8_c6_masksDone, fresh:()=>true},
        {id:'buckets', name:'A bucket line', kind:'reveller', x:9, y:6, node:()=>'b8_c6_buckets', show:()=>b86Ph() >= 2 && b86Ph() <= 3, fresh:()=>!S.f.b8_c6_buckets} ] },

    /* 16 x 12 (city_night). The foot of the east wall behind the Gadrobi District, an unnamed stretch. # the wall  r mending stone, and
       after the night broke, the fall  F the watch's brazier  B barrels  v back up into the lanes */
    { id:'b8_c6_wallfoot', title:'Darujhistan · the east wall', sub:'Behind the Gadrobi District · an unnamed stretch', hint:'Tap ground to move · tap a figure to talk · the lanes are north', decor:'city_night', dark:true,
      map:[ "################",
            "################",
            "#rr..........rr#",
            "#r......F.....r#",
            "#..............#",
            "#....B....B....#",
            "#..............#",
            "#.,......,.....#",
            "######....######",
            "######....######",
            "######L..L######",
            "######.vv.######" ],
      walk:'.,rv', triggers:{v:'b8_c6_wall_back'}, start:{x:7, y:10},
      quest:()=> b86Ph() === 2 && b86Key() === 'wall' && !S.f.b8_c6_wallDone ? 'The watch, at the breach.' : 'Back up into the lanes.',
      npcs:[
        {id:'watch', name:'A sergeant of the city watch', kind:'guard', x:7, y:4, node:()=> b86Ph() === 2 && b86Key() === 'wall' && !S.f.b8_c6_wallDone ? 'b8_c6_breach' : b86Ph() >= 3 ? 'b8_c6_watch_late' : 'b8_c6_watch', fresh:()=> b86Ph() === 1 ? !S.f.b8_c6_wallSeen : b86Ph() === 2 && b86Key() === 'wall' && !S.f.b8_c6_wallDone} ] } ],

  battles:{
    /* the dyers' row (optional): bravos in Fete masks shaking down the dyers for what the Fete took in */
    b8_c6_masks:{title:'The dyers\' row', style:'city', dark:true, warrenText:'The Fete\'s last evening · lanterns, a brazier, the crowd gone back to the corners · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....t...","........",".t....t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_bravo',4,2]], xp:180, after:'b8_c6_masks_after',
      preText:()=>`Three of them, in good coats and better masks, a cat's face, a bird's and a sun's. The masks do not make them anybody else. Under the lanterns the rapiers come out together, the way they practised it.`},
    /* key 'wall': an unnamed stretch of the broken wall, with the watch. Looters from the city and men in off the plain through the gap. */
    b8_c6_wall:{title:'The breach', style:'city', dark:true, warrenText:'The last night · the wall down, smoke over the Gadrobi roofs, the moon in pieces · the warrens are loud tonight', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","#......#","........","..t..t..","........","...tt...","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_bravo',2,2],['b8_bravo',5,2],['b8_raider',3,1],['b8_raider',4,0]], xp:300, after:'b8_c6_wall_after',
      preText:()=>`They come at the gap from both sides of it: men from the city with sacks and blades, who have heard the watch is thin tonight, and men in off the plain behind them, who followed whatever came through first and found the wall open. None of them is looking at the sky. That makes them the only people in Darujhistan not looking at it.`,
      stage2:{title:'The gap', xp:120,
        text:()=>`The ones on the near side are down or running back into the lanes with nothing in their sacks. The watch has the rubble on the left. The gap itself is still open, a cart's width of broken stone with the plain beyond it, and three more are coming up out of the dark through it, and one of them has a name, by the way the other two wait for him.${b86Say({brisk:`\n\nBrisk sets the shield in the gap. "This bit," she says. "This bit's ours."`, edrem:`\n\nEdrem goes into the gap beside you with the mace up. "A wall is only a road somebody stood across," he says. "I know about roads."`, kettle:`\n\nKettle looks at the rubble with professional sorrow. "If I'd had a day," she says. "If I'd had an hour."`, _:''})}`,
        map:["##....##","#t....t#","........","........","...tt...","........","..t..t..","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_raider',2,1],['b8_raider',5,1],['b8_bravocaptain',4,0]]} },
    /* key 'street': the Gadrobi streets behind the wall, the Fourth's door. Four rounds; a Hound of Shadow passes the end of the street at
       the second and goes on (b8_hound: nothing drops it, rule 14; 140 takes it off the field after its two rounds). Then the door. */
    b8_c6_street:{title:'The Fourth\'s street', style:'city', dark:true, warrenText:'The last night · the Gadrobi District burning, the moon in pieces · Meanas is very loud tonight', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold the street four rounds. The neighbours are behind the Fourth\'s door.'},
      map:["#......#","#......#","#.t..t.#","#......#","........","#..tt..#","#......#","#.t..t.#","#......#","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_raider',3,0]], xp:300, after:'b8_c6_street_after',
      waves:[{round:2, foes:[['b8_hound',4,0]], text:'At the end of the street something comes round the corner low and very fast, as big as a pony and darker than the smoke, and the lanterns that are left go out along its side as it passes. A Hound. It does not stop for the street. It does not stop for anything.'},
             {round:3, foes:[['b8_bravo',1,0],['b8_raider',6,0]], text:'Two more come down the street behind where the Hound went, with sacks, braver for having watched it go.'}],
      preText:()=>`The Gadrobi District is burning two streets over. The neighbours are in behind the Fourth's door with the bar across it, and in the street outside are the ones who have decided that a night like this is a night for taking things: masks pushed up on their foreheads, sacks, blades. ${b8In('brisk') ? 'Brisk is in the doorway. ' : ''}The Fourth is in the street.`,
      stage2:{title:'The door', xp:100,
        text:()=>`The street is the Fourth's, for now. The Hound has gone on, somewhere toward the upper city, and there is a long quiet place where it went by. But three of the ones with sacks have come round by the alley, and they are at the Fourth's door with a beam, and behind the door are the neighbours.${b86Say({ohl:`\n\nOhl hears a child behind the door, and his face does something. "Right," he says. "Right."`, vasso:`\n\nVasso is already moving. "The alley," he says. "I know the alley. I came down it once with a knife for you."`, tuft:`\n\nTuft is looking at the place where the Hound went by. She makes herself stop. "The door," she says. "The door."`, _:''})}`,
        map:["#..##..#","#......#","........","..t..t..","........","........","...tt...","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_bravocaptain',4,0]]} },
    /* THE BOOK'S MORTAL FIGHT: the Guild's knives, come for the Fourth under cover of the night. One in the street, and whoever the Contract
       has on the roofs (140's contract hook: b8Roofs(6) onto the four tiles in order). One ground: a second would drag the fallen back up.
       Whoever falls stays down; the sergeant gets up with a scar; no death checks (031c deathOn). A won Guild fight is +1 to the Contract (140). */
    b8_c6_knives:{title:'The knives', style:'city', dark:true, mortal:true, guild:true, warrenText:'The last night · the Fourth\'s street, the roofs above it · whoever falls here stays down', warren:{meanas:1, denul:1}, music:'dark',
      map:["#......#","#..t...#","........","#......#","#.t..t.#","........","...tt...","#......#","#......#","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_knife',3,0]], contract:[[1,1],[6,1],[0,2],[7,2]], xp:380, after:'b8_c6_knives_after',
      preText:()=>`They come off the roofs the way water comes off them in the rain, down the drainpipes and the shutters and the Guild's own lines, dark on dark, with the blades blackened so that the fire on the roofs will not find them. ${b86KnifeWords()}. They have waited all night for the Fourth to be tired. They are not wrong.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b8_c6_guildbow:{name:'A Guild crossbow', slot:'weapon', role:'ranged', who:null, rng:1, atk:2, dmg:[1,10,4],
      line:'A short crossbow, blackened all over, the stock wrapped in dark cord so it will not knock on a slate, and a quiver of quarrels with the fletching cut low. The Guild makes them for roofs: light enough to carry up a drainpipe, strong enough to go through a good coat at a street\'s width. It goes past armour the way the Guild does.'},
    b8_c6_wallstone:{name:'A stone from the wall', slot:'trinket', role:'any', who:null, hp:3,
      line:'A fist-sized piece of the east wall, dressed on one face and broken on the others, with old mortar on it and a scorch across the dressed side. Darujhistan built the wall to stand. It stood a long time. Soldiers carry a piece of the place they held: it is the only receipt there is.'} },

  scenes:{
    b8_c6_fete:{loc:'Darujhistan', sub:'The Fourth\'s street · the Fete\'s last evening', cap:'Paper lanterns across the street, masks going by, and over the roofs the moon with a crack across it.', amb:'explore'},
    b8_c6_burning:{loc:'Darujhistan', sub:'The Gadrobi streets · the last night', cap:'Fire on the roofs two streets over, smoke across the lanterns, the moon in pieces, and the end of the street very dark.', amb:'battle'} },

  end:{
    wall:['The breach held', 'On the Fete\'s last night the Hounds came into Darujhistan and the wall went down, and the moon broke over the city, and nobody the Fourth asked could say why. The Fourth went up to an unnamed stretch of the east wall where it had fallen and held the gap with the watch until the looters gave it up. Then the Guild came for them, in the dark, as the Contract said it would.'],
    street:['The street held', 'On the Fete\'s last night the Hounds came into Darujhistan and the wall went down, and the moon broke over the city, and nobody the Fourth asked could say why. The Fourth stayed in the Gadrobi streets behind the wall with the neighbours behind its door, and held the street while a Hound went by the end of it and did not stop. Then the Guild came for them, in the dark, as the Contract said it would.'] },
  endScene:'b8_c6_burning',
  endCap:()=> S.f.b8_c6_key === 'wall' ? 'The east wall toward morning: a gap full of rubble, the watch asleep on it, and the sky over the city white where the moon was.' : 'The Fourth\'s street toward morning: the lanterns burned down to their strings, the bar across the door, and the sky over the city white where the moon was.',
  tease:'Next: the morning after. The city stops, all of it, and walks out of its own gates behind an ox cart, and the bells begin.',

  extras:()=>{ const f = S.f, x = [], fell = b86Fell();
    if (f.b8_c6_key === 'wall') x.push('The Fourth held a breach in the east wall with the watch on the Fete\'s last night.');
    if (f.b8_c6_key === 'street') x.push('The Fourth held its own street on the Fete\'s last night. A Hound went by the end of it, and on.');
    if (f.b8_c6_wayOut === 'fought') x.push(fell.length ? `The Guild came off the roofs. The Fourth put them down. ${b86And(fell.map(NAME))} did not get up.` : 'The Guild came off the roofs. The Fourth put them down, and everyone got up.');
    if (f.b8_c6_wayOut === 'roofs') x.push('The Guild was on the roofs. The Fourth went over the roofs the other way, before the knives closed.');
    if (f.b8_c6_wayOut === 'word') x.push('The Guild was on the roofs. Vasso went up and spoke to a journeyman he knew, and the knives went somewhere else.');
    if (f.b8_c6_wayOut === 'quiet') x.push('Nobody came off the roofs for the Fourth on the last night. The paper had gone quiet.');
    if (f.sgtScar && f.b8_c6_wayOut === 'fought') x.push('The sergeant carries a new scar from the Guild\'s knives.');
    if (f.b8_c6_signOk) x.push('The Fourth can read the Guild\'s hand-signs now, and say them back.');
    if (f.b8_c6_fete) x.push('Benlo sold masks on the Fete\'s last evening, and remembered the last Fete like it, and so did the sergeant.');
    if (b8In('vasso')) x.push('Vasso stood in the Fourth\'s street on the night the Guild came for it. He is not in the Guild any more, whatever the Guild says.');
    if (b8In('edrem')) x.push('Edrem saw a city wall go down. He says he has seen it before, from the other side.');
    return x; },

  journal:()=>{ const f = S.f, fell = b86Fell(); return [
    ...fell.map(id => `${NAME(id)} fell in the Fourth's street, to the Guild's knives, the last night of the Fete.`),
    f.b8_c6_wayOut === 'fought' && 'The Guild came off the roofs on the last night. The knives went down.',
    f.b8_c6_wayOut === 'roofs' && 'The Guild was on the roofs on the last night. The Fourth went over them the other way.',
    f.b8_c6_wayOut === 'word' && 'The Guild was on the roofs on the last night. Vasso spoke to a journeyman he knew.',
    f.b8_c6_wayOut === 'quiet' && 'Nobody came off the roofs on the last night.',
    f.b8_c6_key === 'wall' && 'The Fourth held a breach in the east wall with the watch.',
    f.b8_c6_key === 'street' && 'The Fourth held its own street. A Hound went by the end of it.',
    f.b8_c6_burst && 'Toward morning the moon burst, and the pieces went east. No one knows why.',
    f.b8_c6_turned && 'The Hounds came into the city on the Fete\'s last night. The wall went down in more places than one. The moon broke.',
    f.b8_c6_fete && 'The Fete\'s last night: masks in the street, and Benlo remembering the last one like it.',
    'The Fourth, back in Darujhistan from the road, on the Fete\'s last night.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the Fete at evening ======== */
    b8_c6_start:()=>({sp:'The Fourth\'s door', scene:'b8_door', fx:()=>{ S.f.b8_c6_ph = S.f.b8_c6_ph || 1; }, again:()=>'The Fourth\'s door, the fire in, the street outside full of masks.', txt:
`The room is as the Fourth left it: the table, the five chairs and one more, the bar leaning by the door, a skin of dust on the ledger. The fire is in, laid by a neighbour. Outside, the street is full of noise and paper lanterns and people being somebody else for one more night.

${b86Say({brisk:`Brisk walks round the room once, touching things, the way she would walk a camp's line. She stops at the bar by the door and looks at it. "Tonight," she says, "it goes across early."`, _:`You walk round the room once, touching things, the way you would walk a camp's line. The bar by the door goes across early tonight. No one says why.`})}${b86If('kettle', `\n\nKettle has the ledger open on the table already, blowing the dust off it a page at a time. "Rent's paid," she says. "We're the only ones in the street who can say so."`)}${b86If('vasso', `\n\nVasso has not sat down. He is at the shutter, looking up at the roofs over the street, where the lanterns do not reach. "They'll be up there tonight," he says. "Everybody else is down here."`)}${b86If('edrem', `\n\nEdrem stands in the middle of the room with his pack still on, as if a room were a thing he had heard about and not seen in a while. "So this is a door," he says.`)}`,
      ch:[b8ReadChoice(6),
          {t:'Out into the street.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_read:()=>b8ReadOffer(6),
    b8_c6_card:()=>b8ReadCard(6),

    /* the fire: the Fourth's door, by phase. The games pass wraps this node: keep the id */
    b8_c6_fire:()=>{ const ph = b86Ph(), rk = 'b8_c6_rest' + ph, k = b86Key();
      const way = ph === 1 ? (b86KeyOpen() ? {t:'Out into the street. The noise has changed.', onward:true, go:'b8_c6_turn'} : null)
        : ph === 2 ? (!k ? {t:'The night, and what the Fourth does with it. Decide.', go:'b8_c6_key'} : k === 'street' && !S.f.b8_c6_streetDone ? {t:'The street. Hold it.', onward:true, go:'b8_c6_street_door'} : null)
        : ph === 3 ? {t:'The roofs.', onward:true, go:'b8_c6_roofwatch'}
        : ph === 4 ? {t:'Toward morning.', onward:true, go:'b8_c6_onward'} : null;
      return {sp:'The Fourth\'s door', scene:'b8_door', html:contractHTML(),
        again:()=>'The Fourth\'s fire, the table, the bar by the door.', txt:
`${ph === 1 ? `The fire is in, and the cups are out, and outside the shutters the Fete goes by in the street, a long noise of pipes and feet and people laughing at the moon.` : ph === 2 ? `The bar is across the door. Outside, the noise has changed: no pipes now, and the laughing has stopped, and somewhere two streets over there is a roof on fire and people shouting about it. ${!k ? 'The squad is looking at you.' : k === 'wall' && !S.f.b8_c6_wallDone ? 'The wall is waiting.' : 'The street is waiting.'}` : ph === 3 ? `The fire is low. No one suggests putting more on it. Over the street the roofs are dark, and the Gadrobi District burns behind them, and from time to time a slate shifts up there where there is no wind.` : `The fire is down to its coals. The squad sits round it with its back to the walls, and nobody sleeps, and the shutters are white at the edges with a light that is not morning.`}${b86Say({kettle:`\n\nKettle has the ledger open.`, ohl:`\n\nOhl is making the tea.`, _:''})}`,
        ch:[...(ph === 1 ? [b8ReadChoice(6)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk] && (ph !== 1 || !!S.f.b8_c6_lanesSeen), fx:()=>{ S.f[rk] = 1; rest('An hour behind the barred door, with the city coming through the shutters. Wounds close, mostly.'); }, go:'b8_c6_fire_rest'},
            {t:'Talk with the squad.', go:'b8_c6_fire_talk'},
            ...(way ? [way] : []),
            {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}; },
    b8_c6_fire_rest:()=>({sp:'The Fourth\'s door', scene:'b8_door', txt:
`An hour, then, with the bar across the door and the street going by outside it.

${b86Say({ohl:`Ohl goes round the squad with his tea and his hands, and closes what wants closing, and complains about each of you while he does it. "Home a day," he says. "Home a day."`, edrem:`Edrem sees to the squad's cuts with a pilgrim's patience and a soldier's hands, and keeps his opinions about them to himself.`, _:'The squad sees to its own cuts. It has had practice.'})}${b86If('brisk', `\n\nBrisk sleeps sitting up, facing the door, with her shield against her knee.`)}${b86If('tuft', `\n\nTuft sleeps with the lamp lit. Tonight she has turned it up.`)}${b86If('vasso', `\n\nVasso does not sleep. He sits under the shutter with his knees up and listens to the roofs.`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c6_fire'}]}),
    b8_c6_fire_talk:()=>{ const late = b86Ph() >= 2, ln = [];
      if (b8In('brisk')) ln.push(late ? `Brisk is sitting with the shield against her chair and two fingers at her brow, and her eyes shut. She takes the fingers down. "Nothing," she says. "Not even no. There's always been somebody at the gate to say no." That is all she says.` : `Brisk has her boots off for the first time since the road. "A Fete," she says. "Last one I saw, I was in a borrowed mask in a garden with a shield behind a hedge." She considers her feet. "I'd like this one to be dull."`);
      if (b8In('kettle')) ln.push(late ? `Kettle has the satchel open on the table and is counting. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," she says. "${numw(S.inv.burner || 0, true)} burner${(S.inv.burner || 0) === 1 ? '' : 's'}. ${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." She looks at the shutter, which is lit orange from the far side. "I'm not throwing a burner in this district. It's doing fine without me."` : `Kettle is at the shutter, watching the masks go by. "Look at them," she says. "Not one of them knows how to stand in a crowd. A whole city of backs." She does not sound disapproving. She sounds as if she is counting.`);
      if (b8In('tuft')) ln.push(late ? `Tuft is sitting very close to the lamp with her hands round her knees. "Meanas is screaming," she says, quietly. "Shadow's in the streets. Things I don't want to look at are looking at things they don't want either." She swallows. "None of it's for us. I keep telling myself that."` : `Tuft is shuffling the Deck and not dealing it. "The Gate," she says. "It keeps coming up. Every time." She puts the Deck away. "I'd rather it were the Fool."`);
      if (b8In('ohl')) ln.push(late ? `Ohl has his list out on his knee in its oilcloth, and is not reading it. "There's a lot of dying in the city tonight," he says. "None of it's on here. Let's keep it that way." He folds it. "I'm too old to start a second column."` : `Ohl is warming his hands. "Home," he says, as if he is trying the word out. "Half the city in masks and the other half drunk, and I've never been so glad to see a door."`);
      if (b8In('sohra')) ln.push(late ? `Sohra is at the window with her bone cup in both hands, not throwing. "The dead are walking somewhere," she says. "A great many of them. Not here." She frowns. "Somewhere close, and very far. I cannot hear where."` : `Sohra has her cup on her knee. "On the plain we had a night for the dead," she says, "but nobody wore a face over their own for it." She watches a mask go by the shutter. "These people are afraid of being seen."`);
      if (b8In('greysword')) ln.push(late ? `Dannet has the grey shield on her arm already, and her feet set as if the floor might move. "In Capustan, the night the walls went," she says, "nobody looked up. Here they all look up." She glances at the ceiling. "Looking up does not help."` : `Dannet is oiling the grey shield. "A festival for the new year," she says. "In Capustan we had one too." She stops. "I do not remember what it was called. That is strange."`);
      if (b8In('ellis')) ln.push(late ? `Ellis is at the back shutter with it open a crack. "The roofs over Tanner's Row have people on them," she says, "who aren't watching the fire." She closes it. "Count them later. They'll still be there."` : `Ellis has her back to the wall and her eyes on the street. "Good night for it," she says. "Anybody's. A city full of masks." She does not say whose.`);
      if (b8In('vell')) ln.push(late ? `Vell is under the table, which is where he likes to sit in a room with a roof that is being walked on. "Clan marks," he says. "On the ridge. I saw them going home." He is quiet a moment. "One of them is mine. Was."` : `Vell is tying knots in a bit of cord and untying them. "The clans'll be out tonight," he says. "Every roof in the city, with the masks down there to cover the noise." He looks up. "I used to love this night."`);
      if (b8In('brannoc')) ln.push(late ? `Brannoc is cleaning his blade and talking, which is what he does when he is frightened. "In Falar," he says, "the sea comes in sometimes and takes a street. You know where you are with the sea. You know it doesn't hate you."` : `Brannoc is going on about the Fete, which, he says, in Falar would be six days of boats and nobody sober. "Here it's all masks and nobody fun," he says, happily, and takes another mask off the pile.`);
      if (b8In('ressa')) ln.push(late ? `Ressa has her hands round a cup. "The temples should be ringing," she says. "On a night like this every temple in the city should be ringing." She listens. "They're not."` : `Ressa has her hands round a cup, warming them. "I was in a temple for the last Fete in my own city," she says. "Before the fever. They gave out bread." She drinks. "I liked the bread."`);
      if (b8In('vasso')) ln.push(late ? `Vasso has the shutter open a finger's width and his eye to the roofs. "They waited for the night," he says. "I'd have waited for the night. Everybody looking at the sky." He turns one of his knives over in his fingers. "I'd have been very good at tonight."` : `Vasso is not looking at the masks. "Every journeyman in the Guild is on a roof tonight," he says. "It's the best night of the year for it. I used to wait for it like other boys waited for sweets." He tries to smile. "I'm in the street now."`);
      if (b8In('edrem')) ln.push(late ? `Edrem sits with the mace across his knees. "I stood on a wall once," he says, "in the Domin, with the grey on, and watched what came through the gap. It was the wrong side of the wall." He looks at his hands. "This is the right side. It does not feel different."` : `Edrem watches the street through the shutter with a face that does not know what to do with it. "All these people," he says, "and not one of them on their knees." He thinks about it. "I could get to like a city."`);
      return {sp:'The Fourth\'s door', scene:'b8_door', txt:ln.length ? ln.join('\n\n') : `The house is quiet tonight. You sit by the fire with the ledger, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b8_c6_fire'}]}; },

    /* the street's ends */
    b8_c6_phoenix:()=>({sp:'Down the street', scene:'b8_c6_fete', again:()=>'Down the street, the Phoenix\'s lamp, and the Fourth not going in.', txt:
`Down the street, at the bottom where it meets the lane, the painted bird over the Phoenix's door has a paper lantern hung from its beak tonight, and the noise behind the door is the Fete's noise, loud and warm and none of the Fourth's business. The Fourth does not go in. The Fourth has its own door.${b86If('brisk', ` Brisk looks at the Phoenix's lamp, and walks the other way, as she always does.`)}${b86Ph() >= 2 ? `\n\nTonight the street below it is empty, and the lantern in the bird's beak has burned out.` : ''}`,
      ch:[{t:'Back up the street.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_to_lanes:()=>({sp:'The Gadrobi lanes', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_lanesSeen = 1; }, txt:
b86Ph() === 1 ? `East, the lanes of the Gadrobi District are full to the walls: the dyers' row hung with lanterns instead of cloth, braziers at the corners, a fiddler on a barrel, children in paper masks underfoot. Over the roofs the hills are black, and over the hills the moon has its crack.`
  : b86Ph() === 2 ? `East, the lanes have emptied in the time it takes to say so. A lantern burns on the cobbles where it fell. Further on, toward the wall, there is smoke, and shouting, and over the roofs the moon is not one thing any more.`
  : `East, the lanes are dark, the lanterns burned down to their strings, and over the roofs toward the wall the sky is a colour skies are not.`,
      ch:[{t:'Into the lanes.', onward:true, go:()=>startExplore('b8_c6_lanes')},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_lanes_back:()=>({sp:'The Fourth\'s street', scene:'b8_c6_fete', txt:
`West, the lane runs back to the Fourth's street and the door with the bar behind it.`,
      ch:[{t:'Back to the Fourth\'s street.', onward:true, go:()=>startExplore('b8_c6_lane')},
          {t:'Not now.', go:()=>startExplore('b8_c6_lanes')}]}),

    /* Benlo, with a barrow of masks: the last Fete remembered (callback 1) */
    b8_c6_benlo:()=>({sp:'Benlo', scene:'b8_c6_fete', fx:()=>{ S.f.b8_c6_benloMet = 1; }, again:()=>'Benlo at his barrow, the masks hung on strings, his own pushed up on his forehead.', txt:
`Benlo's chestnut barrow has been a mask barrow for the Fete: masks hung on strings from a pole over it, cats and suns and birds and a great many moons, paper and paste and some of them very bad. He has a fox's face pushed up on his own forehead, which does not suit him, and he knows it.

"Sergeant," he says. "You came back. I had a silver on you not coming back." He looks at the squad. "I'll pay it. I'll pay it gladly. A mask? For the last night? Old soldiers, I do a price."${b86If('kettle', `\n\nKettle is already looking at the moons. "Who buys a moon," she says, "with the real one cracked like that?"\n\n"Everybody," says Benlo. "Everybody, since it cracked."`)}`,
      ch:[{t:'"Busy Fete?"', go:'b8_c6_benlo_last'},
          {t:'Buy a mask each for the squad. For the last night.', tag:'2 silver', req:()=>!S.f.b8_c6_masked && (S.silver || 0) >= 2, fx:()=>{ S.f.b8_c6_masked = 1; S.silver -= 2; b86L('brannoc', 1); b86L('kettle', 1); note('Masks for the Fourth, for the last night. Two silver.', 'good'); }, go:'b8_c6_benlo_masks'},
          {t:'Back up the street.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_benlo_last:()=>({sp:'Benlo', scene:'b8_c6_fete', fx:()=>{ S.f.b8_c6_fete = 1; }, again:()=>'Benlo, remembering the last Fete like it.', txt:
`"Busy," Benlo says. "Busy is a word. It's been a Fete." He looks up at the moon, and at the moons on his pole, and back. "I've seen one like it. One. The year the ground came up in the hills on the last night and the frost ran down the gutters, and that great black stone was hanging over the lake that went away after. You remember." He is talking to you. "You were here. Everybody who was here remembers."

"I sold masks that year too," he says. "I sold every one. People want a face to hide behind, a night like that." He pulls the fox down over his own and pushes it straight back up. "This one's going the same way. I can feel it in the cart."

You do remember. You spent the last night of that Fete in a mask that was not yours, in a part of the city that was not yours, among people who did not know what you were, and it ended with the ground coming open. You had a squad of five then.${S.imported && S.imported.book === 'moi' ? ' You went to Coral after that, and came back, and here you are.' : ''} You count the faces round you now, the way you always do.${b86Say({brisk:`\n\n"Same city," Brisk says. "Same moon. Different crack." That is as much as Brisk says about the past, ever.`, tuft:`\n\nTuft is looking at the cracked moon. "That one wasn't ours either," she says. "Last time. The thing in the hills." She shivers. "Nothing up there tonight's ours."`, _:''})}${b86If('ohl', `\n\nOhl was there too. He has a column on his list for that night, and he does not take it out.`)}${b86If('vasso', `\n\nVasso was a boy in the Gadrobi then. "I remember the frost," he says. "My mother put me under the bed. I thought it was the most exciting night of my life." He looks at the moon. "I was wrong, I think."`)}`,
      ch:[{t:'Back to the barrow.', go:'b8_c6_benlo'},
          {t:'Back up the street.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_benlo_masks:()=>({sp:'Benlo', scene:'b8_c6_fete', txt:
`Benlo picks them himself, with care, as if fitting boots. ${b86Say({brisk:'A bull for Brisk, which she takes without comment and wears pushed up on her helm.', _:'A bull for the biggest of you, which goes up on a helm and stays there.'})} ${b86Say({kettle:'A sun for Kettle, who says it is too cheerful and keeps it.', _:'A sun for whoever will have it.'})} ${b86Say({tuft:'A cat for Tuft, who looks at it a long time.', _:'A cat for whoever looks at it longest.'})} ${b86Say({ohl:'For Ohl, a long grey face with sad eyebrows. "It\'s you," says Benlo. Ohl does not argue.', _:'A long grey face with sad eyebrows, for the one who frowns most.'})}${b86If('vasso', ` Vasso refuses a mask. "Not tonight," he says. "Tonight I'd like them to know me."`)}${b86If('edrem', ` Edrem takes a plain white one, and holds it, and does not put it on.`)}

For you, he keeps back a moon, with a crack painted across it. "On the house," he says. "That's the joke."`,
      ch:[{t:'Back to the barrow.', go:'b8_c6_benlo'}]}),
    b8_c6_benlo_late:()=>({sp:'Benlo', scene:'b8_c6_burning', fx:()=>{ S.f.b8_c6_benloLate = 1; }, txt:
`Benlo's barrow is on its side in the street, and the masks are trodden into the cobbles, and Benlo is sitting on the barrow's wheel with his fox's face in his lap. He looks up when the Fourth comes.

"Same as last time," he says. "Every one. Sold or trodden." He turns the fox over. "I'll paint more. There's always another Fete."${b86Fell().length ? `\n\nHe sees who is not with you, and stands up, and takes his cap off, and holds it, which is the most Benlo has ever not said.` : ''}`,
      ch:[{t:'Back up the street.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_revellers:()=>({sp:'The Fete', scene:'b8_c6_fete', fx:()=>{ S.f.b8_c6_revellers = 1; }, txt:
`A line of masks comes down the street hand in hand, cats and moons and birds, dancing the old Gadrobi step that goes three forward and one back, and the line opens round the Fourth without stopping and closes again on the far side, laughing, and goes on down toward the Phoenix.

One of them, a girl in a moon mask, looks up over her shoulder at the real one as she goes, and points, and the whole line looks, and laughs, and dances on.${b86Say({tuft:`\n\nTuft watches them go. "They think it's part of the Fete," she says. "The crack." She does not laugh.`, kettle:`\n\nKettle watches them go. "Three forward, one back," she says. "That's how sappers dance too."`, edrem:`\n\nEdrem watches them go, a long time. "In the Domin," he says, "there were no dances after the Seer. I had forgotten people did this."`, _:''})}${b86If('brannoc', `\n\nBrannoc nearly goes with them. Brisk, or someone, takes him by the collar.`)}`,
      ch:[{t:'Back up the street.', go:()=>startExplore('b8_c6_lane')}]}),

    /* the tavern with the painted sign (Rumjugs and Sweetlard, rule 16): seen again */
    b8_c6_sign:()=>({sp:'The tavern with the painted sign', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_signSeen = 1; }, again:()=>'The tavern with the painted sign, the two women over the door in their masks.', txt:
b86Ph() === 1 ? `The tavern on the corner of the dyers' row has its door open and its benches out in the lane for the last night, and over the door the sign hangs where it always hangs: the two big painted women arm in arm, one with the rum jug on her arm and one with the tray of cakes, and *Rumjugs and Sweetlard* on the red ribbon over them.

Someone has climbed up and hung a paper mask on each of them for the Fete: a cat for the one with the jug, a sun for the one with the cakes. It does not help. No one in the lane knows who they are with the masks or without them. The landlord still says the sign came with the lease.${b86Say({kettle:`\n\nKettle stops under it, as she always does, with her hands behind her back and her head tipped up. "They'd take the masks off," she says. "Those two. They'd want you to know who was coming."${b86If('brisk', `\n\n"You'd follow the cake," Brisk says.\n\n"I'd follow the cake," Kettle agrees.`)}`, _:''})}`
  : `The tavern on the corner has its door barred and its benches gone, and the lane in front of it is empty. Over the door the sign still hangs. Somewhere in the night one of the paper masks has blown off; the woman with the rum jug looks out over the Gadrobi with her own painted face, unbothered, as she always has.${b86If('kettle', `\n\n"Still there," says Kettle, under it. She sounds as if she had been worried.`)}`,
      ch:[{t:'The old soldier at the door.', req:()=>b86Ph() === 1 && !S.f.b8_c6_vetMet, go:'b8_c6_vet'},
          {t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),
    /* the retired Malazan from Ch 1, at the tavern door in the Fete's last evening */
    b8_c6_vet:()=>({sp:'An old soldier', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_vetMet = 1; }, again:()=>'The old soldier from the Seven Cities lot, on the bench by the tavern door.', txt:
`The old soldier from the Seven Cities lot is on the bench outside the tavern door, in his faded telaba, with his cup, watching the lane. He has no mask. He looks at the Fourth come up the lane like an old soldier looking at a squad he knows: counting.

"Back," he says. "Good. The road east, I heard. I heard the Guild was asking where you'd gone." He drinks. "I didn't know. I'd have said I didn't anyway."${b86Charm() ? `\n\nHis eyes go to the black cord on whoever wears his charm. "Keep it close tonight," he says. "Feels wrong in the air. Feels like the old stories about the Pale."` : ''}

He drinks, and looks up at the crack in the moon, and does not say anything about it, which is the most an old soldier can say.${b86If('ohl', `\n\nOhl sits down next to him on the bench, and the two of them watch the lane together with nothing to add.`)}`,
      ch:[{t:'"The charm you sold us. Does it work?"', req:()=>b86Charm(), go:'b8_c6_vet_charm'},
          {t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_vet_charm:()=>({sp:'An old soldier', scene:'b8_gadrobi', txt:
`"Work," he says. He considers the word. "It takes a thing off you and gives it to someone who was going that way anyway. That's not work. That's Hood's sense of humour." He turns his cup round. "Most nights it's cold. Tonight it feels like nothing at all." He shrugs. "Maybe Hood's got a night off too. The whole city has."${b86If('brisk', `\n\nBrisk looks at him sharply, and then at the moon. She touches two fingers to her brow, out of habit, and frowns, as if the habit had missed a step.`)}`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_vet_late:()=>({sp:'An old soldier', scene:'b8_c6_burning', fx:()=>{ S.f.b8_c6_vetLate = 1; }, txt:
`The old soldier is still on his bench by the barred tavern door, as if nothing had happened, except that he has a sword across his knees that nobody saw him bring out. There is smoke in his beard.

"Heard the knives went to your door," he says. "Heard it on the roofs." He looks the Fourth over, counting.${b86Fell().length ? ` He gets to the end, and stops, and starts again, and stops at the same place. "Ah," he says. "Ah, Sergeant."` : ` He gets to the end. "Good," he says. "Good."`}

"I tried my god tonight," he says. "Old habit. Nothing at the gate. No one to say no." He drinks. "First time in forty fights I've wanted to hear it."`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),

    /* Orsa at the top of her den's steps: the Guild is out tonight */
    b8_c6_orsa:()=>({sp:'Orsa', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_orsa = 1; }, again:()=>'Orsa at the top of her steps, a lantern in her fist.', txt:
`Orsa is at the top of the steps down to her den, in her red dress, with a lantern in one fist and the dice cup in the other, keeping the Fete out of her cellar. She sees the Fourth and does not smile.

"You're back," she says. "Pity. You'd have been safer on the road." She lifts the lantern a little toward the roofs. "Count the shapes up there that aren't chimneys. I've counted. More on the roofs tonight than masks in my den." She lowers it. ${b8Contract() >= 4 ? `"Your name's said in my cellar, Sergeant. Up the hill too. Not kindly."` : b8Contract() >= 2 ? `"Your name came up in my cellar once this Fete. Once is enough."` : `"Not for you, I think. Your name's gone quiet. Quiet's a good name to have."`}${b86If('vasso', `\n\nShe looks at Vasso a long time. "Tanner's boy," she says. "They say your name too." Vasso does not answer.`)}${b86If('vell', `\n\n"And you," she says to Vell. "I knew your clan. There's a mark on the Gadrobi ridge tonight that's theirs." Vell looks away.`)}`,
      ch:[{t:'"Who sent them?"', go:'b8_c6_orsa_who'},
          {t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_orsa_who:()=>({sp:'Orsa', scene:'b8_gadrobi', txt:
`Orsa laughs, once, without any fun in it. "Sent," she says. "Nobody sends the Guild, Sergeant. You pay the Guild, and it goes where it likes, when it likes, and it never tells the one who's paying what it did with the coin, and it never tells the one on the paper who paid." She shakes the dice cup once, out of habit. "I've had men in my cellar ask that question for more Fetes than I've got fingers. The ones who asked it loudest, I don't see any more."

"Bar your door," she says. "Sit with your back to it. Go to bed in your boots." She turns to go down her steps. "And if you see the sun come up, come and buy a drink. I'll want to know how."`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),

    /* bravos in masks, shaking down the dyers (optional) */
    b8_c6_masks_start:()=>({sp:'The dyers\' row', scene:'b8_gadrobi', txt:
`Halfway down the dyers' row, three men in good coats and better masks have a dyer up against his own door with a rapier at his throat, and his wife holding out the Fete's takings in a cloth, and the crowd going round them like a stream round a rock. A cat's face, a bird's and a sun's. The masks are new. The coats are not theirs.${b86If('vasso', `\n\nVasso watches them a moment. "Not Guild," he says. "Bravos with a night off. They're not even on a paper."`)}${b86If('edrem', `\n\nEdrem's hand has gone to the mace. "I know this," he says. "I have seen this in a town that was burning."`)}`,
      ch:[{t:'"Put it up." Go in.', go:()=>startBattle('b8_c6_masks', {})},
          {t:'Walk up close and stand there until they find somewhere else to be.', check:['might', 15],
            edges:id=>[id === 'brisk' && ['she is the biggest thing in the lane, and she stands like it', 3], id === 'edrem' && ['he stood a road for years and nobody came past', 2], id === 'greysword' && ['the grey shield, the Grey Swords\' way of standing', 2], id === 'sgt' && ['a sergeant\'s stare', 1], id === 'vasso' && ['they know a Guild jack when they see one', 1], id === 'tuft' && ['she is small and the lane is crowded', -1], id === 'ohl' && ['an old healer does not loom', -1]],
            near:{t:()=>`Yes, but the one in the sun's mask does not go quietly: on his way past he opens ${b86Nm(b86Who())} along the forearm with the rapier's last inch, for pride, and is gone before anybody can do anything about it. Bruised.`, fx:()=>bruise(b86Who(), bruiseN())},
            go:'b8_c6_masks_faced', fail:'b8_c6_masks_row'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_masks_faced:()=>({sp:'The dyers\' row', scene:'b8_gadrobi', fx:()=>{ if (!S.f.b8_c6_masksDone) { S.f.b8_c6_masksDone = 1; S.f.b8_c6_masksFaced = 1; b86L('edrem', 1); } }, txt:
`${by({brisk:'Brisk walks up the row and stops a pace from them, and stands, and waits.', edrem:'Edrem walks up the row with the mace held low, and stops, and stands where the dyer can see him, the way he stood on the pilgrims\' road.', _:'{who} walks up the row and stops a pace from them, and stands, and waits.'})} The cat's face looks at the bird's face. The bird's face looks at the sun's.

They find somewhere else to be. The dyer slides down his own door and sits on the step, and his wife puts the takings back in her apron and gives the Fourth one of the cakes off her tray, without a word.`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_masks_row:()=>({sp:'The dyers\' row', scene:'b8_gadrobi', txt:
`The sun's face laughs. "Old soldiers," he says, through the paste. "On a night like this. Go home, grandmother." The rapier does not leave the dyer's throat.

It is going to be the other way, then.`,
      ch:[{t:'Go in.', go:()=>startBattle('b8_c6_masks', {})},
          {t:'Not now.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_masks_after:()=>({sp:'The dyers\' row', scene:'b8_gadrobi', fx:()=>{ if (!S.f.b8_c6_masksDone) { S.f.b8_c6_masksDone = 1; S.f.b8_c6_masksFought = 1; S.silver = (S.silver || 0) + 4; } }, txt:
`The three of them go back down the row a good deal faster than they came, without the masks, which are lying on the cobbles: a cat, a bird, a sun. The crowd has opened round the fight and is closing again already, as if it were a juggler that had finished.

The dyer's wife puts the takings back in her apron. Then she takes four silver out of it again and holds them out, and will not be told no. "For the masks," she says. "Someone should get something for them."${b86Say({brannoc:`\n\nBrannoc picks the bird's mask up off the cobbles and puts it on. No one stops him.`, kettle:`\n\nKettle picks the sun's mask up off the cobbles, and looks at it, and puts it in the satchel. "Paste," she says. "Good paste."`, _:''})}`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),

    /* the lamp-post where the Guild's line comes down: the Guild's hand-signs on the roofs (the trick) */
    b8_c6_post:()=>({sp:'The Guild\'s line', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_signsSeen = 1; }, again:()=>S.f.b8_c6_signOk ? 'The lamp-post where the Guild\'s line comes down. The Fourth can read the roofs now.' : 'The lamp-post where the Guild\'s line comes down, and the roofs above it.', txt:
`At the corner by the tavern, a Guild line comes down off the roofs to an iron hook on a lamp-post, tarred cord, two strands laid together, as one did over the Fourth's alley in the winter. The crowd does not see it. The crowd never looks past the lanterns.

Up there, against the sky, on the ridge of the dyers' row and the roofs beyond it, there are shapes that are not chimneys. While you watch, one lifts a hand into the light from the street, flat, and another a street away answers it with two fingers, and a third draws a thumb down its own throat, and then they are all still again.

You have seen hands talk like that before. On a roof in this city, years ago, a man of the Claw showed the Fourth a little of how the Claw does it, and said after that he had not.${b86If('vasso', `\n\nVasso has gone very quiet. "Hold," he says, under his breath, reading. "The street. The one the paper names." He does not say which street.`)}${b86If('vell', `\n\nVell's hands are moving at his sides, small, as if answering. He stops them. "Clan cant," he says. "I know it. I used to know it."`)}`,
      ch:[{t:'Watch the roofs until the hands make sense.', check:['wits', 17], trick:'b8_c6_knifesign', req:()=>!S.f.b8_c6_signTried, fx:()=>{ S.f.b8_c6_signTried = 1; },
            edges:id=>[id === 'vasso' && ['his whole time in the Guild, talking with his hands', 3], id === 'vell' && ['he talked this cant on the clans\' roofs before the Fourth', 3], trickBy('cant') === id && ['the Claw\'s hand-cant: this is its cousin', 2], id === 'ellis' && ['the Claw taught her its signs', 2], id === 'sgt' && ['you watched the Claw\'s hands on Kalam\'s roof', 1], id === 'tuft' && ['shadows and hands: Meanas knows the shape of both', 1], id === 'brisk' && ['Brisk reads a shield wall, not a hand', -1], id === 'greysword' && ['the Grey Swords signal with horns', -1]],
            near:{t:()=>`Yes, but one of the shapes on the ridge sees ${b86Nm(b86Who())} reading, and gives the sign for "watched" back down at the street, and the whole ridge goes still and stays still. Someone on a roof saw it.`, fx:()=>{ if (!S.f.b8_c6_roofSaw) { S.f.b8_c6_roofSaw = 1; b8Con(1, 'someone on a roof saw it'); } }},
            go:'b8_c6_post_ok', fail:'b8_c6_post_no'},
          {t:'"Vasso. What are they saying?"', req:()=>b8In('vasso') && !S.f.b8_c6_vassoHands, go:'b8_c6_vasso_hands'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_vasso_hands:()=>({sp:'Vasso', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_vassoHands = 1; }, txt:
`Vasso reads the ridge with his hands in his lap and his face turned away, so that nobody up there sees a face reading. "Hold," he says. "The second hour. Two streets. The one the paper names." He waits for the next hand. "Wait for the noise."

"What noise?" ${b86Say({kettle:'Kettle says.', _:'you say.'})}

"I don't know," Vasso says. "They don't either. They've been told there'll be a noise." He looks up at the moon, with its crack. "Someone up the hill knows something about tonight that the rest of the city doesn't. The Guild always knows a little first." He swallows. "They're waiting for it to start before they start."`,
      ch:[{t:'Back to the lamp-post.', go:'b8_c6_post'}]}),
    b8_c6_post_ok:()=>({sp:'The Guild\'s line', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_signOk = 1; }, txt:
`It takes most of the evening, standing at the corner with the crowd going by and the moon going over, and a cup from the tavern to make standing there look like something. ${by({vasso:'Vasso does it in a quarter of the time and then teaches it, very low, with his hands in his lap where the roofs cannot see them.', vell:'Vell does it in a quarter of the time and then teaches it, very low, with his hands in his lap.', _:'{who} gets it in the end.'})}

Flat palm, hold. Two fingers, the street. A fist opened, now. A thumb down the throat for the one the paper names, which you can give back up at the roof, or across a street to your own, and mean the same thing by it: that one.

The shapes on the ridge go on talking to each other. Now some of the Fourth can listen.`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_post_no:()=>({sp:'The Guild\'s line', scene:'b8_gadrobi', txt:
`The hands go on, up there against the sky, and the meaning goes by under them like the crowd: palm, fingers, thumb, and then still. It is a cousin of the Claw's cant, no more. Cousins do not always speak the same.

The line stays on its hook. The shapes stay on the ridge.`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),

    /* the east wall, an unnamed stretch, and the watch */
    b8_c6_to_wall:()=>({sp:'Down to the wall', scene:b86Ph() >= 2 ? 'b8_wall_night' : 'b8_gadrobi', txt:
b86Ph() === 1 ? `South, the lane runs down between the tanneries to the foot of the east wall behind the Gadrobi District: an old stretch, patched, with nothing to say about it, and a watch post at its foot where somebody has a brazier going.`
  : b86Ph() === 2 && b86Key() === 'wall' && !S.f.b8_c6_wallDone ? `South, down between the tanneries, toward the wall. The smoke is thicker that way. So is the noise.`
  : `South, the lane runs down to the east wall, and the rubble, and the watch sitting on it.`,
      ch:[{t:'Down to the wall.', onward:true, go:()=>{ startExplore('b8_c6_wallfoot'); if (b86Ph() === 1 && !S.f.b8_c6_wallSeen) talk('b8_c6_watch'); }},
          {t:'Not now.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_wall_back:()=>({sp:'The east wall', scene:b86Ph() >= 2 ? 'b8_wall_night' : 'b8_gadrobi', txt:
`North, back up between the tanneries to the Gadrobi lanes.`,
      ch:[{t:'Back up into the lanes.', onward:true, go:()=>startExplore('b8_c6_lanes')},
          {t:'Not now.', go:()=>startExplore('b8_c6_wallfoot')}]}),
    b8_c6_watch:()=>({sp:'A sergeant of the watch', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_wallSeen = 1; }, again:()=>'The watch sergeant at his brazier at the foot of the wall.', txt:
`The watch post is a brazier and a bench and a sergeant of the city watch, a broad Daru with a grey moustache and his helm on the bench beside him, and two young watchmen up on the walk above with a jug between them, looking out at the plain. It is the Fete. The wall has stood a long time.

"Malazans," he says, as the Fourth comes down. He does not get up. "The ones up the street from the Phoenix. I know you. You pay your rent." He nods at the brazier. "Warm your hands. There's nothing out there tonight but grass."${b86If('edrem', `\n\nEdrem looks up at the wall, all the length of it, with an expression nobody in the Fourth has seen on him before. "I have been on the other side of a wall like this," he says. "It looks different from here."`)}${b86If('vasso', `\n\nVasso looks up at the walk, at the young watchmen, and further, at the roofs behind. "No one watches the wall," he says. "Everybody watches the city."`)}`,
      ch:[{t:'"Quiet up there?"', go:'b8_c6_watch_quiet'},
          {t:'Edrem, looking up at the wall.', req:()=>b8In('edrem') && !S.f.b8_c6_edremWall, go:'b8_c6_edrem_wall'},
          {t:'Back up into the lanes.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_edrem_wall:()=>({sp:'Edrem', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c6_edremWall = 1; b86L('edrem', 1); }, txt:
`Edrem walks along the foot of the wall a little way with one hand flat on the stone, like a man beside a horse he does not know yet.

"In the Domin we came at walls like this," he says, when you come up. "From the outside. With ladders, and the Seer's name in our mouths, and the people inside on the walk looking down at us the way those two boys look out at the grass." He takes his hand off the stone. "I used to think about the people on the walk. What they had for supper. Whether they knew."

"They did not know," he says. "Nobody ever knows. That is the thing about a wall." He looks at you. "If it goes tonight, Sergeant, I would like to be on this side of it."`,
      ch:[{t:'Back to the watch.', go:'b8_c6_watch'}]}),
    b8_c6_watch_quiet:()=>({sp:'A sergeant of the watch', scene:'b8_gadrobi', txt:
`"Quiet," he says. "The boys say there's dogs out on the plain. Big ones. Howling." He shrugs. "There's always dogs. Last night of the Fete, they say the hills howl." He looks up at the moon, with its crack. "And that. My wife says it's an omen. My wife says the bread's an omen."

"The last time it went wrong, at a Fete, I was on this wall," he says. "Young as those two. The frost came down off the hills and we all stood up here watching the upper city and none of it came near us." He pours himself a cup. "Walls," he says. "That's what they're for. Standing there."${b86Say({brisk:`\n\nBrisk looks up at the wall, at the old patching, at the young men on the walk. She touches two fingers to her brow, out of habit, and does not seem to know she did it.`, kettle:`\n\nKettle looks at the old patching in the stone with professional interest and keeps what she thinks of it to herself, which for Kettle is a great kindness.`, _:''})}`,
      ch:[{t:'Back up into the lanes.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_watch_late:()=>({sp:'A sergeant of the watch', scene:'b8_wall_night', txt:
`The watch sergeant is sitting on the rubble with his helm off and a cut over one eye, and one of his young men asleep against his shoulder, and the other not there.${S.f.b8_c6_key === 'wall' ? ` He sees the Fourth and lifts a hand. "Malazans," he says. "I'll remember. I'll say so, to anyone that asks." He looks at the gap. "No one will ask."` : ` "It came down in more places than this," he says. "You heard. Everybody heard."`}`,
      ch:[{t:'Back up into the lanes.', go:()=>startExplore('b8_c6_lanes')}]}),

    /* ======== phase 2: the night breaks ======== */
    b8_c6_turn:()=>({sp:'The Fourth\'s street', scene:'b8_c6_burning', fx:()=>{ if (!S.f.b8_c6_turned) { S.f.b8_c6_turned = 1; S.f.b8_c6_ph = 2; } }, txt:
`It starts as a sound: out past the east wall, out on the plain, a howling, long and low and from more than one throat, that the Fete's pipes go on playing over for a while and then stop. Then, from somewhere east and somewhere north at once, the sound of stone going, the long falling noise a wall makes when it is not a wall any more.

People in the street look up. The moon is not cracked now. It is in pieces, hanging apart from each other over the roofs, still bright, as if nobody has told them yet. Nobody in the Fourth can say why. The Fourth does not try.

Then the shouting starts, two streets over, and a roof in the Gadrobi District goes up, and another, and the masks in the street are running, all of them, in every direction at once, with the paper lanterns coming down on top of them.${b86Say({brisk:`\n\nBrisk has two fingers at her brow, the old salute, and her eyes shut. She opens them. "There's nobody there," she says. Her voice is very flat. "At the gate. There's always somebody at the gate." She picks up her shield. "Hood didn't answer."`, ohl:`\n\nOhl has his hand flat on the table, as if feeling for a pulse in it. "Something's wrong at the gate," he says. "The dead are going somewhere else tonight. I can feel them go past."`, _:`\n\nYou find two fingers at your brow, the old salute, to the god every soldier salutes going in. Nothing answers. Not even no.`})}${b86Charm() ? `\n\nThe charm on its black cord is only a knucklebone tonight, cold the way bone is cold. Whatever used to listen through it is not listening.` : ''}${b86If('tuft', `\n\nTuft is white to the lips. "Shadow," she says. "In the streets. It came over the wall." She holds the lamp very close. "It isn't for us. Please let it not be for us."`)}`,
      ch:[{t:'The squad. Now.', go:'b8_c6_key'}]}),
    /* the key: the wall or the street */
    b8_c6_key:()=>({sp:'The last night', scene:'b8_c6_burning', html:contractHTML(), txt:
`There are two places the Fourth can be useful tonight, and only one Fourth.

The wall is down. The watch sergeant at the foot of it had two boys and a jug, and there will be men coming in through the gaps now with sacks and blades, from the city and from the plain behind whatever came over first. Someone has to stand in a gap.

Or the street. The Gadrobi District is burning behind the wall, and the people in this street, the Fourth's own neighbours, have nowhere to go but behind a door with a bar, and the Fourth's is the best door in the street. Someone has to stand in front of it.${b86Say({brisk:`\n\n"Gap," Brisk says. "Always the gap." That is her vote.`, _:''})}${b86Say({ohl:`\n\n"There's children in this street," Ohl says. That is his.`, _:''})}${b86Say({edrem:`\n\nEdrem has his mace. "I have kept a road," he says. "A street is a short road. A gap is a short wall." He waits. "Either."`, vasso:`\n\nVasso is looking up at the roofs, not the wall. "Whichever we pick," he says, "they'll still come. Tonight's the night. The paper says so."`, _:''})}`,
      ch:[{t:'"The wall. We hold a gap with the watch."', fx:()=>{ if (!S.f.b8_c6_key) { S.f.b8_c6_key = 'wall'; b86L('brisk', 1); b86L('edrem', 1); b86L('greysword', 1); b86L('ohl', -1); } }, go:'b8_c6_wall_go'},
          {t:'"The street. We hold our own door."', fx:()=>{ if (!S.f.b8_c6_key) { S.f.b8_c6_key = 'street'; b86L('ohl', 1); b86L('tuft', 1); b86L('vasso', 1); b86L('brisk', -1); } }, go:'b8_c6_street_go'},
          {t:'Not yet.', go:()=>startExplore('b8_c6_lane')}]}),

    /* ---- 'wall': an unnamed stretch of the broken wall, with the watch ---- */
    b8_c6_wall_go:()=>({sp:'The east wall', scene:'b8_wall_night', txt:
`The Fourth goes east through the Gadrobi lanes against the crowd, the whole district coming the other way with what it could carry. The dyers' row is lit orange from one end. A lantern rolls past on the cobbles, burning.

At the foot of the wall the watch post's brazier is on its side, and the wall above it is not there: a gap a cart wide, full of broken stone, with the plain dark beyond it and the moon's pieces hanging over the plain.${b86If('edrem', ` Edrem stops at the sight of it, just for a breath, and then goes on.`)}`,
      ch:[{t:'Down to the wall, and the watch.', onward:true, go:()=>{ startExplore('b8_c6_wallfoot'); talk('b8_c6_breach'); }},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_breach:()=>({sp:'The breach', scene:'b8_wall_night', again:()=>'The gap in the east wall, the watch sergeant on the rubble, the plain beyond.', txt:
`The watch sergeant is up on the rubble with a sword in his hand and his helm on crooked, and one of his young men beside him, white, and the other nowhere. He sees the Fourth come down the lane and something goes out of his shoulders.

"Malazans," he says. "Good. Good. I've two of my own and a cart and a hole the size of a house." He points with the sword: through the gap, out on the plain, shapes are moving, coming in; behind, in the lanes, other shapes are coming down with sacks. "They've worked out the wall's open. Something came through it first. Big. It went on into the city like it had an appointment." He does not say what. "These ones are only men."${b86Say({brisk:`\n\nBrisk looks at the gap, and at the rubble, and at the watch's cart. "Cart across the near side," she says. "Rubble behind it. Then we stand."`, _:'There is a cart, and there is rubble. There is a little time.'})}`,
      ch:[{t:'Get the cart across the gap and the rubble up behind it, with the watch.', check:['might', 16], req:()=>!S.f.b8_c6_cartTried, fx:()=>{ S.f.b8_c6_cartTried = 1; },
            edges:id=>[id === 'brisk' && ['she has set a shield wall in worse gaps', 3], id === 'edrem' && ['he held the Domin\'s walls, once', 2], id === 'kettle' && ['she knows which stone bears weight', 2], id === 'greysword' && ['Capustan\'s walls', 2], id === 'sgt' && ['you have barricaded a street before', 1], id === 'tuft' && ['she cannot lift a cart', -1], id === 'vasso' && ['roofs, not walls', -1]],
            near:{t:()=>`Yes, but the cart's wheel comes off under ${b86Nm(b86Who())} and the whole weight of it comes down on ${b86V(b86Who(), 'your', 'a')} shoulder before the watch can lift it clear. Bruised, and the cart is across.`, fx:()=>bruise(b86Who(), bruiseN())},
            go:'b8_c6_breach_set', fail:'b8_c6_breach_noset'},
          {t:'No time. Stand in the gap. (fight)', onward:true, go:'b8_c6_wall_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_wallfoot')}]}),
    b8_c6_breach_set:()=>({sp:'The breach', scene:'b8_wall_night', fx:()=>{ S.f.b8_c6_cartSet = 1; }, txt:
`The cart goes over on its side across the near half of the gap with a noise like a door slammed in a cathedral, and the rubble goes up behind it, the watch and the Fourth passing stones hand to hand in the dark, and when they come at the gap they come at it narrow, into the Fourth's reach.

"There," says the watch sergeant, breathing hard. "There. That's a wall." He laughs, a little wildly. "That's more wall than we had."`,
      ch:[{t:'Stand in the gap. (fight)', onward:true, go:'b8_c6_wall_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_wallfoot')}]}),
    b8_c6_breach_noset:()=>({sp:'The breach', scene:'b8_wall_night', txt:
`The cart will not go. One wheel is jammed in the fallen stone, and the axle is cracked, and by the time anybody has said so the first of them are at the gap.`,
      ch:[{t:'Stand in the gap. (fight)', onward:true, go:'b8_c6_wall_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_wallfoot')}]}),
    b8_c6_wall_start:()=>({sp:'The breach', scene:'b8_wall_night', txt:
`They come at the gap from both sides of it. None of them is looking at the sky.${S.f.b8_c6_cartSet ? ' The cart takes the first rush, and holds, and turns them into the Fourth.' : ''}`,
      ch:[{t:'"Fourth. The gap."', onward:true, go:()=>startBattle('b8_c6_wall', S.f.b8_c6_cartSet ? {surprise:'p'} : {})},
          {t:'Not now.', go:()=>startExplore('b8_c6_wallfoot')}]}),
    b8_c6_wall_after:()=>({sp:'The breach', scene:'b8_wall_night', fx:()=>{ if (!S.f.b8_c6_wallDone) { S.f.b8_c6_wallDone = 1; S.f.b8_c6_ph = 3; gain('b8_c6_wallstone'); } }, txt:
`The one with the name goes back out through the gap with his arm held against him, and the others go with him, and out on the plain they stop and look back at the wall, at the Fourth on it, and decide. They go north along the wall's foot, looking for an easier hole. There will be one. It is not this one.

The watch sergeant sits down on the rubble very suddenly, as if his legs have voted without him. "I'll remember," he says. "Malazans. I'll say so to anyone that asks." He looks at the gap. "No one will ask."

There is a piece of the wall at your feet, dressed on one face and broken on the rest, scorched across the dressed side. ${b86Say({brisk:'Brisk picks it up and hands it to you without a word, like a receipt.', _:'You pick it up. It is the only receipt there is.'})}

Behind you, over the Gadrobi District, the roofs are burning. Over the Fourth's own street, the roofs are dark.${b86If('vasso', ` Vasso is looking at them. "Home," he says. "Now. They'll be waiting there."`)}`,
      ch:[{t:'Back to the door.', onward:true, go:()=>{ startExplore('b8_c6_lane'); talk('b8_c6_fire'); }},
          {t:'Not now.', go:()=>startExplore('b8_c6_wallfoot')}]}),

    /* ---- 'street': the Gadrobi streets behind the wall, and the Fourth's door ---- */
    b8_c6_street_go:()=>({sp:'The Fourth\'s street', scene:'b8_c6_burning', txt:
`The street is full of people who live in it, running the wrong way, toward the fire, to see. ${b86Say({brisk:'Brisk stands in the middle of the street with the shield on her arm and stops them, one at a time, by being in the way.', _:'The Fourth stands in the middle of the street and stops them, one at a time, by being in the way.'})} The dyer's widow from the corner, with three children and a goat. The old man from the attic with his bird in a cage. The baker's girls. The neighbours.

The Fourth's door has a bar on it. It is the best door in the street.`,
      ch:[{t:'Get them in.', go:'b8_c6_street_door'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_street_door:()=>({sp:'The Fourth\'s door', scene:'b8_c6_burning', again:()=>'The Fourth\'s door, the neighbours behind it, the street outside.', txt:
S.f.b8_c6_streetIn ? `The neighbours are in behind the Fourth's door, with the bar across it. Outside, the street is the Fourth's. At the end of it, toward the wall, there is a darkness the smoke does not explain.`
  : `They do not want to go in. They want to see the fire, or get their things, or find a brother three streets over. They are frightened, and frightened people are deaf. It will take a voice.`,
      ch:[{t:'Talk them in behind the door, all of them, before the street fills.', check:['guile', 15], req:()=>!S.f.b8_c6_streetIn && !S.f.b8_c6_doorTried, fx:()=>{ S.f.b8_c6_doorTried = 1; },
            edges:id=>[id === 'ohl' && ['a healer\'s voice; they know him in the street', 3], id === 'sgt' && ['a sergeant\'s voice carries', 2], id === 'ressa' && ['she has talked a sick street indoors before', 2], id === 'vasso' && ['he grew up in this district; they know his face', 2], id === 'edrem' && ['he has moved frightened pilgrims off a road', 1], id === 'brisk' && ['they are more frightened of Brisk than of the fire', -1], id === 'kettle' && ['her voice is a sapper\'s, all edges', -1]],
            near:{t:()=>`Yes, but the old man from the attic will not come without his bird, and goes back up for it, and ${b86Nm(b86Who())} ${b86V(b86Who(), 'have', 'has')} to go up after him through the smoke and carry him down, bird and all. It takes something out of ${b86V(b86Who(), 'you', b86Nm(b86Who()))}: rattled.`, fx:()=>b86Rattle(b86Who())},
            go:'b8_c6_street_in', fail:'b8_c6_street_out'},
          {t:'The street. Hold it. (fight)', onward:true, req:()=>!!S.f.b8_c6_streetIn || !!S.f.b8_c6_doorTried, go:'b8_c6_street_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_street_in:()=>({sp:'The Fourth\'s door', scene:'b8_door', fx:()=>{ S.f.b8_c6_streetIn = 1; }, txt:
`They go in. ${by({ohl:'Ohl stands at the door with his hand on each shoulder as it goes past him, and says each name, and they go.', vasso:'Vasso goes along the street saying names, mothers\' names and grandmothers\', the tanner\'s boy everybody knew once, and they go.', _:'{who} gets them in, a name at a time, and they go.'})} The dyer's widow and her three and the goat. The old man and his bird. The baker's girls, who bring the bread.

The room is full to the walls. A child sits on the Fourth's ledger. The bar goes across the door from inside, and the Fourth is in the street.`,
      ch:[{t:'The street. Hold it. (fight)', onward:true, go:'b8_c6_street_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_street_out:()=>({sp:'The Fourth\'s door', scene:'b8_c6_burning', txt:
`Some of them go in. The dyer's widow and her three, the baker's girls. The rest scatter up the street toward the fire, to see, or to find somebody, and there is no time to go after them.

The bar goes across the door from inside on whoever is there. The Fourth is in the street.`,
      ch:[{t:'The street. Hold it. (fight)', onward:true, go:'b8_c6_street_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_street_start:()=>({sp:'The Fourth\'s street', scene:'b8_c6_burning', txt:
`They come down the street with masks pushed up and sacks over their shoulders, the ones who have decided a night like this is a night for taking things, and they look at the Fourth in the street, and at the door behind it, and do the sum.

Far down at the end of the street, toward the wall, it has gone very dark.${b86If('tuft', ` Tuft has seen it too. Her lamp is shaking.`)}`,
      ch:[{t:'"Fourth. Hold the street."', onward:true, go:()=>startBattle('b8_c6_street', S.f.b8_c6_streetIn ? {surprise:'p'} : {})},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_street_after:()=>({sp:'The Fourth\'s street', scene:'b8_c6_burning', fx:()=>{ if (!S.f.b8_c6_streetDone) { S.f.b8_c6_streetDone = 1; S.f.b8_c6_ph = 3; S.f.b8_c6_houndSeen = 1; gain('b8_c6_wallstone'); } }, txt:
`The one with the name goes back up the alley with nothing in his sack, and the rest go with him, and the street is the Fourth's.

Where the Hound went by, at the end of the street, there is a long quiet. A water-butt is on its side. The lanterns along that wall have gone out, every one, and nobody has the heart to light them. Lying in the gutter where it went past is a piece of the east wall, dressed on one face and broken on the rest, scorched across the dressed side, carried in from wherever the wall went down, or thrown. ${b86Say({kettle:'Kettle picks it up and turns it over. "A long way to carry a stone," she says, and gives it to you.', _:'You pick it up. It is warm.'})}

The Fourth never touched it. The Fourth could not have.${b86Say({tuft:`\n\nTuft is sitting on the step with the lamp in her lap. "It didn't look at us," she says. "Not once. We weren't anything to it." She laughs, a little. "Best thing I've heard all year."`, ohl:`\n\nOhl stands at the end of the street where it went by, looking the way it went. "Not for us," he says. "Thank whoever."`, _:''})}

Behind the door, the neighbours lift the bar. Over the street, the roofs are dark, and there are shapes on them that are not chimneys.${b86If('vasso', ` Vasso has seen them. "Now," he says. "They'll come now. While we're tired."`)}`,
      ch:[{t:'Inside, to the fire.', go:'b8_c6_fire'}]}),

    /* ======== phase 3: the roofs: the knives, and the one way out the Contract opens ======== */
    b8_c6_roofwatch:()=>{ const w = b8WayOut(), q = w === 'quiet';
      return {sp:'The roofs', scene:'b8_c6_burning', html:contractHTML(), again:()=>'The Fourth\'s street, the roofs above it.', txt:q ?
`You go out into the street and look up at the roofs, all of them, ridge by ridge, the way you have looked up at the roofs every night since the winter.

There is nobody there. The shapes that were not chimneys earlier, on the dyers' row, have gone somewhere else, about somebody else's paper. No one comes for the Fourth tonight. A city with this much else on its mind has forgotten there was ever a paper with five strokes on it, or near enough.${b86If('vasso', `\n\nVasso stands in the street with his head back, reading the dark. "Nothing," he says. He sounds as if he does not trust it. "Nothing for us."`)}`
  : `You go out into the street and look up at the roofs.

They are there. On the ridge over the Fourth's door and the ridge across the street, dark on dark, still: ${b86KnifeWords()}. The Guild, come for the Fourth under cover of the night, while the city looks at the sky. The Contract has been counting all winter. Tonight is when it pays.${b86If('vell', `\n\nOne of them, on the near ridge, lifts a hand into the light from the burning roofs and makes a sign that is not for his own side. It is for Vell: the mark the clans wrote against his name, years ago, when he walked away from them. Vell looks up at it, and does not look away.`)}${w === 'roofs' && S.f.b8_c6_roofsTried ? `\n\nThere was a way over the roofs. There is not now.` : w === 'word' && S.f.b8_c6_wordTried ? `\n\nVasso's word has been given, and not taken.` : w === 'roofs' ? `\n\nThere is one way out of it that does not go through them. The Gadrobi roofs run east from the back of the Fourth's house, ridge to ridge, toward the burning, where no knife will want to follow. Over them, quick, before the ridge closes. It is a hard climb.` : w === 'word' ? `\n\nThere is one way out of it that does not go through them, and it is Vasso's. "I know one of them," he says, very quietly, reading the ridge. "The one on the left with the cord on his wrist. We were journeymen together." He swallows. "I could go up. I could give him my word. It's not a promise. It's a chance."${b86VassoCan() ? '' : `\n\nHe looks at you, and then away. "They wouldn't take my word," he says. "You haven't, yet."`}` : `\n\nThere is no way out of it that does not go through them. The Contract has seen to that.`}

Whoever falls in this fight stays down.`,
        ch:q ? [{t:'Watch the roofs until the moon goes.', fx:()=>{ if (!S.f.b8_c6_wayOut) { S.f.b8_c6_wayOut = 'quiet'; S.f.b8_c6_ph = 4; } }, go:'b8_c6_quiet'}]
          : [{t:'Over the roofs, east, before they close. (a hard check)', req:()=>w === 'roofs' && !S.f.b8_c6_roofsTried, check:['wits', 18], contract:true, fx:()=>{ S.f.b8_c6_roofsTried = 1; },
                edges:id=>[id === 'vasso' && ['he knows which roofs hold', 3], id === 'vell' && ['the clans\' roofs were his before the Fourth\'s', 3], trickBy('b8_c1_roofline') === id && ['the Roof-Line: the Guild\'s own lines, east', 2], id === 'ellis' && ['the Claw taught her roofs', 2], trickBy('rope') === id && ['the Rope\'s Way', 1], id === 'sgt' && ['you crossed these roofs in the winter', 1], id === 'brisk' && ['a heavy on wet slate', -2], id === 'greysword' && ['Grey Sword plate on a ridge', -2], id === 'ohl' && ['old knees, a long way down', -1]],
                near:{t:()=>`Yes, but at the last ridge ${b86Nm(b86Who())} ${b86V(b86Who(), 'put', 'puts')} a foot through a skylight and the glass goes down into somebody's kitchen like a bell, and every shape on the ridge behind turns its head. The Fourth is over and gone. Someone on a roof saw it.`, fx:()=>{ if (!S.f.b8_c6_roofSaw) { S.f.b8_c6_roofSaw = 1; b8Con(1, 'someone on a roof saw it'); } }},
                go:'b8_c6_roofs_ok', fail:'b8_c6_roofs_no'},
              {t:'Vasso goes up and gives his word. (a check; never a guarantee)', req:()=>w === 'word' && b86VassoCan() && !S.f.b8_c6_wordTried, check:['guile', 16, 'vasso'], fx:()=>{ S.f.b8_c6_wordTried = 1; },
                edges:id=>[['they were journeymen together', 2], (S.loy.vasso || 0) >= 2 && ['he believes the Fourth will be there when he comes down', 1], b86Hunt() && ['the Fourth asked names all winter; the Guild remembers', -2]],
                near:{t:()=>`Yes, but the journeyman takes a price for it: the knife from the back of Vasso's neck, the one the Guild gave him. Vasso hands it over hilt first and comes back down without it, and does not talk about it: rattled.`, fx:()=>b86Rattle('vasso')},
                go:'b8_c6_word_ok', fail:'b8_c6_word_no'},
              {t:'Vell, and the mark on the ridge.', req:()=>b8In('vell') && !S.f.b8_c6_vellMark, go:'b8_c6_vell_mark'},
              {t:'Stand in the street and let them come. (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b8_c6_knives_start'},
              {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}; },
    /* callback 4: Vell and the Guild. One knife on the ridge knows his mark; never tied to K'rul's contract (rule 70) */
    b8_c6_vell_mark:()=>({sp:'Vell', scene:'b8_c6_burning', fx:()=>{ S.f.b8_c6_vellMark = 1; }, txt:
`Vell does not look away from the ridge. "My old clan," he says. "The mark's the clan-master's. Hand over the eye, the little finger out. It means: I see the one who walked." He swallows. "He taught me the lines. He's on that roof because the paper had five names on it, and when they asked who knew the Malazans' door, he said he did."

"It isn't about me," he says. "The paper isn't. It's about you, all of you. I'm just on the same street." He lifts his own hand into the firelight, and makes a sign back at the ridge that nobody else in the Fourth can read. The shape on the ridge goes still.

"I told him I'm not coming back," Vell says. "He knew. He wanted me to say it."`,
      ch:[{t:'Back.', go:'b8_c6_roofwatch'}]}),
    b8_c6_quiet:()=>({sp:'The roofs', scene:'b8_c6_burning', fx:()=>{ if (!S.f.b8_c6_quietBow) { S.f.b8_c6_quietBow = 1; gain('b8_c6_guildbow'); } }, txt:
`You watch anyway, until the Gadrobi fire burns down and the moon's pieces go on hanging, and nobody comes.

Toward the end of it, ${b86Say({vasso:'Vasso goes up the drainpipe to the ridge across the street, where the Guild\'s watcher knelt all winter, and comes back down with', ellis:'Ellis goes up to the ridge across the street, where the Guild\'s watcher knelt all winter, and comes back down with', vell:'Vell goes up to the ridge across the street, where the Guild\'s watcher knelt all winter, and comes back down with', _:'somebody goes up to the ridge across the street, where the Guild\'s watcher knelt all winter, and comes back down with'})} a crossbow in an oilcloth: blackened, the stock wrapped in cord, the quarrels in their quiver. Left there some nights ago, by the dust on the cloth. A post given up.

"They forgot us," ${b86Say({kettle:'Kettle says, turning it over. "They forgot their crossbow too."', _:'somebody says. "They forgot their crossbow too."'})}`,
      ch:[{t:'Inside, to the fire.', go:'b8_c6_burst'}]}),
    b8_c6_roofs_ok:()=>({sp:'The Gadrobi roofs', scene:'b8_c6_burning', fx:()=>{ if (!S.f.b8_c6_wayOut) { S.f.b8_c6_wayOut = 'roofs'; S.f.b8_c6_ph = 4; gain('b8_c6_guildbow'); } }, txt:
`Out of the back shutter, up the Fourth's own chimney, onto the ridge, and east. ${by({vasso:'Vasso goes first, testing every slate, and the Fourth goes where he goes.', vell:'Vell goes first, testing every slate, and the Fourth goes where he goes.', ellis:'Ellis goes first, without a sound, and the Fourth goes where she goes.', _:'{who} goes first, and the Fourth goes after, roof to roof, toward the burning.'})} Behind, on the ridge over the Fourth's door, the shapes turn to look at a street with nobody in it.

East, the roofs are hot underfoot and the smoke is thick enough to hide a squad. No knife follows a squad into that. By the time the Fourth comes down a drainpipe three streets over, into a lane full of people with buckets, the ridge behind is empty.

On the last roof, where a Guild watcher had knelt and left in a hurry, there is a crossbow, blackened, with its quiver. ${b86Say({kettle:'Kettle takes it. "Fair\'s fair," she says.', _:'It comes with the Fourth.'})}`,
      ch:[{t:'Back to the door, by the long way.', go:'b8_c6_burst'}]}),
    b8_c6_roofs_no:()=>({sp:'The Gadrobi roofs', scene:'b8_c6_burning', txt:
`Out of the back shutter, up the chimney, onto the ridge, and the first slate goes under ${b86Nm(b86Who())} with a crack like a bone, and every head on the ridge across the street turns.

There is no going east now. The knives are already coming down. Whoever falls here stays down.`,
      ch:[{t:'Back down into the street. (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b8_c6_knives_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_word_ok:()=>({sp:'The roofs', scene:'b8_c6_burning', fx:()=>{ if (!S.f.b8_c6_wayOut) { S.f.b8_c6_wayOut = 'word'; S.f.b8_c6_ph = 4; gain('b8_c6_guildbow'); b86L('vasso', 1); } }, txt:
`Vasso goes up the drainpipe across the street with his hands empty and open where the ridge can see them, and is gone a long time.

The Fourth stands in the street and watches the ridge, and the ridge watches the Fourth. Up there, two shapes are close together, and one of them is Vasso. Hands move between them, small: palm, fingers, palm. Then one of the shapes lifts its arm and makes a sign to the others, and they go, ridge to ridge, west, away, and are not there.

Vasso comes back down with a crossbow on his shoulder that is not his. "He said that's for the paper," he says. "So he can say he left something." He sits down on the Fourth's step very suddenly. "He said they'll come back another night. He said not tonight." He looks up at the empty ridge. "That's all a word is, in the Guild. Not tonight."`,
      ch:[{t:'Inside, to the fire.', go:'b8_c6_burst'}]}),
    b8_c6_word_no:()=>({sp:'The roofs', scene:'b8_c6_burning', txt:
`Vasso goes up the drainpipe across the street with his hands empty and open, and is gone a short time, and comes back down a great deal faster than he went up.

"He wouldn't," he says. "He said the paper's paid." He has a cut across the back of one hand that was not there before, very neat. "He said he was sorry. I think he was." He draws his knife. "They're coming."

Whoever falls here stays down.`,
      ch:[{t:'"Fourth. On me." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b8_c6_knives_start'},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_knives_start:()=>({sp:'The Fourth\'s street', scene:'b8_c6_burning', txt:
`The Fourth stands in its own street, in front of its own door, with the Gadrobi District burning behind the roofs and the moon in pieces over them, and waits.

${b86Scouted() ? `The road west taught the Fourth how the Guild comes at a squad: it was there for the knives on the Lamatath. ${b86Say({kettle:'Kettle has a sharper in each hand before the first of them moves.', _:'The squad is set before the first of them moves.'})}` : `The Fourth came in fast off the road, ahead of the knives on it. It has never seen how the Guild comes at a squad in the open. It is about to.`}

Whoever falls here stays down.`,
      ch:[{t:'"Fourth. Here." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, fx:()=>{ S.f.b8_c6_wayOut = S.f.b8_c6_wayOut || 'fought'; }, go:()=>startBattle('b8_c6_knives', b86Scouted() ? {surprise:'p'} : {})},
          {t:'Not now.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_knives_after:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
      return {sp:'The Fourth\'s street', scene:'b8_c6_burning', fx:()=>{ if (!S.f.b8_c6_knivesDown) { S.f.b8_c6_knivesDown = 1; S.f.b8_c6_wayOut = 'fought'; S.f.b8_c6_ph = 4; gain('b8_c6_guildbow'); } }, txt:
`The last of them goes down in the gutter in front of the Fourth's door, and the street is quiet, and up on the ridges there is nobody at all. A crossbow lies on the cobbles where it fell off a roof, blackened, with its quiver.

${fell.length ? `${b86And(fell.map(NAME))} did not get up.\n\n${b86Say({ohl:`Ohl kneels by ${fell.length > 1 ? 'them' : 'the body'} with his hands already moving, and then his hands stop, and he stays there. After a while he takes out the oilcloth with the list in it, and a stub of pencil, and writes, slowly, in the light from the burning roofs. The first new ${fell.length > 1 ? 'names' : 'name'} in years.`, brisk:`Brisk kneels by ${fell.length > 1 ? 'them' : 'the body'} with her shield still on her arm, and touches two fingers to her brow, and holds them there, and nothing answers, and she holds them there anyway.`, _:'The squad stands round in the street a while, in the light from the roofs.'})}` : `Everyone in the Fourth got up. You count them twice, in the firelight, and get the same number both times, and let your breath go.`}${S.f.sgtScar ? `\n\nThere is a new cut across your face, from the brow down, that you did not feel go in. It will be a scar. You have room for it.` : ''}${b86If('vasso', `\n\nVasso is standing over one of the knives, looking down. "I knew him," he says. "Not well." That is all.`)}${b86If('vell', `\n\nVell stands over the one who made his clan's mark from the ridge, and takes the cord off the man's wrist, and puts it in his pocket. He does not say why.`)}

Behind the door, the neighbours lift the bar.`,
        ch:[{t:'Inside, to the fire.', go:'b8_c6_burst'}]}; },

    /* ======== phase 4: toward morning ======== */
    b8_c6_burst:()=>({sp:'The Fourth\'s street', scene:'b8_c6_burning', fx:()=>{ S.f.b8_c6_burst = 1; S.f.b8_c6_ph = 4; }, txt:
`Toward morning, with the fire on the roofs burning down and the squad sitting on its own step because nobody wants to go in yet, the moon goes.

The pieces of it that have hung over the city all night do not fall. They burst, all at once, without a sound, and the whole of Darujhistan is white for a breath, every street and roof and face, brighter than noon, and every shadow in the city is thrown the same way. Then the light goes up and out and east, in pieces, trailing, over the plain, and is gone, and the sky where the moon was is only sky.

The street is very quiet. No one in the Fourth can say why, and no one tries.${b86Say({brisk:`\n\nBrisk has two fingers at her brow. She takes them down. "Death didn't answer," she says. "All night. Not once." She looks at the white place in the sky. "Someone'll have to, in the end."`, ohl:`\n\nOhl has his list in his lap. "Death didn't answer tonight," he says. "Not for anybody." He folds the oilcloth. "Someone'll have to."`, _:`\n\nYou find two fingers at your brow again. Death didn't answer, all night. Someone will have to, in the end.`})}${b86If('tuft', `\n\nTuft has her eyes shut. "Something warm," she says. "Far off. East." She opens them. "I don't know what it is. I'm not going to ask."`)}${b86If('edrem', `\n\nEdrem looks east, after the light, toward the old Domin, toward the barrow, and keeps whatever he thinks to himself.`)}`,
      ch:[{t:'Inside, to the fire.', go:'b8_c6_fire'}]}),
    /* the well at the bottom of the street, where the neighbours stand and look up */
    b8_c6_moon:()=>({sp:'The well', scene:b86Ph() === 1 ? 'b8_c6_fete' : 'b8_c6_burning', txt:
b86Ph() === 1 ? `At the bottom of the street, round the well, the neighbours have come out with cups to look at the moon. The crack goes right across it, clean, like a plate dropped on a stone floor and not yet come apart, and a sliver of it at one edge stands a little away from the rest.

"It's for the Fete," the dyer's widow from the corner says, with great confidence. "It's a sign. Good harvest." No one argues. No one has a better idea.${b86Say({tuft:`

Tuft does not look at it for long. "It isn't a sign," she says, very low, so the neighbours do not hear. "Signs are for somebody. That's just something happening."`, ohl:`

Ohl looks at it a long time. "I set a collarbone once that looked like that," he says. "It held."`, _:''})}`
  : b86Ph() <= 3 ? `The well at the bottom of the street has a bucket line going from it to the end of the row, where a roof is smouldering, and nobody is looking up any more. When they do, the moon is in pieces, hanging apart from each other over the city, still bright, as if nobody has told them yet.${b86If('edrem', `

Edrem takes a place in the bucket line without being asked, and passes buckets, one after another, and never once looks at the sky.`)}`
  : `The well at the bottom of the street. The bucket line is done. Where the moon was, the sky is white at one edge and grey everywhere else, and the neighbours stand round the well and do not say anything about it, and neither does the Fourth.`,
      ch:[{t:'Back up the street.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_neighbours:()=>({sp:'The neighbours', scene:'b8_c6_burning', fx:()=>{ S.f.b8_c6_neighbours = 1; }, txt:
`The neighbours are sitting on their own steps up and down the street, in the grey, in whatever they ran out in: the dyer's widow from the corner with three children asleep on her and the goat tied to the boot-scraper, the old man from the attic with his bird, the baker's girls with a basket.

${S.f.b8_c6_key === 'street' ? `The baker's girls come over with the basket and put it on the Fourth's step without a word: the morning's bread, which they baked anyway, because it was the morning. ${S.f.b8_c6_streetIn ? 'The dyer\'s widow says, "You had a child sitting on your book." She means it for thanks.' : 'The dyer\'s widow looks at the Fourth a long time, and nods, once.'}` : `They saw the Fourth go east toward the wall when the noise started, and come back. The dyer's widow says, "We heard the wall held. Some of it." She means it for thanks.`}${b86Fell().length ? `

They have heard about the Fourth's dead. The old man from the attic takes off his cap and holds it, and the bird is quiet in its cage.` : ''}${b86If('vasso', `

Vasso sits down on the step beside the baker's girls, who knew him when he was the tanner's boy, and eats the bread, and for a while looks his age.`)}`,
      ch:[{t:'Back up the street.', go:()=>startExplore('b8_c6_lane')}]}),
    b8_c6_buckets:()=>({sp:'The dyers\' row', scene:'b8_c6_burning', fx:()=>{ S.f.b8_c6_buckets = 1; }, txt:
`Halfway down the dyers' row a roof is going, and the row has made a line from the tavern's pump to the door under it, buckets going up hand to hand, the dyers in their aprons and the tavern's landlord and a man in a cat's mask who has not thought to take it off.

${b86Say({brisk:'Brisk puts herself in the line where the buckets are heaviest, without being asked, and the line goes faster.', edrem:'Edrem puts himself in the line where the buckets are heaviest, without being asked, and the line goes faster.', _:'The Fourth puts itself in the line where the buckets are heaviest, for a while, and the line goes faster.'})} The roof comes down anyway, in the end, inward, the way a roof should. The ones on either side do not catch.

"That'll do," the landlord says, wiping his face. "That'll do. Under the sign, at least." Over his door the two painted women look down at the wet street, unbothered.`,
      ch:[{t:'Back to the lane.', go:()=>startExplore('b8_c6_lanes')}]}),
    b8_c6_onward:()=>({sp:'The Fourth\'s street', scene:'b8_c6_burning', txt:
`It is not morning yet. It is the grey before it, with the smoke lying over the Gadrobi District and the lanterns burned down to their strings and the street full of neighbours sitting on their own steps, looking at the sky where the moon was.

${b86Fell().length ? `The Fourth has its dead in the room behind the door, under its own blankets, with the bar across. In the morning there will be a great deal to do.` : `The Fourth is all here. The ledger is on the table, with a child's footprint on it.`} ${S.f.b8_c6_knivesDown ? 'The Guild came, and the Guild has counted its dead now as well as the Fourth\'s.' : S.f.b8_c6_wayOut === 'quiet' ? 'The Guild did not come. Quiet is not the same as gone.' : 'The Guild came, and went somewhere else. Not tonight is not the same as never.'}

Up on the hill, somewhere, a bell begins.`,
      ch:[{t:'Morning.', onward:true, go:()=>chapterEnd(6, b86Key() || B8KEY0[6])},
          {t:'Not yet.', go:()=>startExplore('b8_c6_lane')}]}),
  },
};
