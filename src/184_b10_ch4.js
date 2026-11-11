/* ============ Book Ten, Chapter 4: The Long Way Round (the Letherii) ============ */
/* The Sixth Company on the southern march (tcg-canon chapter table, Ch 4; R13 S1): the Grey Helms pulling ahead, the Bolkando trying to keep
   up with them, the Letherii last; the horses failing; a hungry country at the road's edge. Three sunburned strangers at the column's rear,
   seen far off and taken in by somebody else (never met, never named). "The grey knights' commander rode off into the glass" as rumour.
   No mountains and no pass (David's decision 5). The wear (−1, 'nobody says why') is the engine's, at the chapter's start; Lether's luck is
   quiet from here (the engine), and Perrit's tiles feel it, never told why.
   Phase 1 (S.f.b10_c4_ph), dusk at the train's horse-lines: the first halt is a horse that has gone down (the reading, B10READ[4], on a
   horse-blanket; the trick, The Farrier's Hand, Tirren's way with a horse that has stopped, done for a soldier); Ennic's word (the rumour);
   Yelt's water; Orla (the dust veil); Saffa (the one line of the Third); the tile-woman; at the picket's far end, in the last of the light,
   starving foragers come for the horses (b10_c4_foragers, main, stage 2; people of a hungry country, not soldiers; the horse-bow). Phase 2,
   the road south by day: the strangers at the rear; dogs at the carcasses in a wash (b10_c4_dogs, optional); the lookout (the chapter's one
   Witness "yes, but"); the key from Ennic, S.f.b10_c4_key: 'horses' (walk them, Tirren's way, and fall behind; Tirren +1; at dusk the walk
   in, b10Witness(1, 'the horses lived') once, and the thirst unless b10_c2_counted; S.f.b10_c4_horses) or 'pace' (keep up with the Bolkando
   and drive them until they drop; Thegg +1, Tirren −1; S.f.b10_c4_pace). Phase 3, dusk and night at the horse-lines: the key's work; on
   'horses' thieves at the horse-lines in the dark (b10_c4_night); the Witness beat at the train's fire, Yelt's ledger shut, a horse lost that
   day (c4: what Lether sent them out here for); on, south.
   The 'adjunct' road (a few Letherii who crossed with the foreigners; never beside Henar): the middle of the crossing. Phase 1 is the lie-up
   on the glass at the end of the day, the Sixth's last horses on a picket at the column's tail; the foragers are stragglers (the same id;
   fought down, never killed in words). Phase 2 is the night march (no strangers, no dogs: nothing lives in the glass). 'horses' is the last
   of the Letherii's horses, led at their own pace behind the column's tail; 'pace' keeps up with the column. Phase 3 is the halt at the end
   of the march before grey light; the night thieves are stragglers too. Yelt, Orla, Saffa and the tile-woman went south with the brigades.
   Never: the three strangers met or named, the staff's wagons close, the Commander's consort and her Hold, the Bolkando queen and her
   daughter, the Grey Helms' camp or their commander's ride (dust far off at most), the old Bolkando king. Notes: docs/tcg-ch4-notes.md. */
/* FOR THE ARTIST (184b): names this file uses.
   Items: ART['item/b10_c4_horsebow'], ['item/b10_c4_rasp'], ['item/b10_c4_veil'].
   Figures: tirren (182b), b5_c1_ennic (Ennic), b5_c1_clerk (Yelt), b9_c2_orla, b9_c2_saffa, b5_c1_tilewoman, b2soldier (the foreigners'
   water-sergeant on 'adjunct'; the stragglers, the engine's), b6_bandit (the foragers, the engine's), b5_c7_greatwolf (the dogs).
   Backdrops: b10_south (182b's), b10_south_night (180's placeholder: yours), b10_glass and b10_glass_night (183b's), and one this file adds:
   b10_c4_dusk (the train's horse-lines at dusk on the southern road, a horse-blanket on the ground; on 'adjunct' the column's tail on the
   glass at the day's end, the last Letherii horses on a picket).
   Ground (TILEX): b10_c4_ground (Ch 2's b10_c2_ground on the road; on 'adjunct' the glass): 'k' a horse down, 'W' the water wagon (or the
   Sixth's carts), 'c' a water-cart, 'X' the picket's far end, 'H' the horse-lines (a trigger), 'R' the column's rear, 'v' a lookout, 's' a
   dry wash with carcasses. Battle 't' is a pack-saddle on the ground. */

/* ---- small helpers (b104: Book Ten, Chapter Four) ---- */
const b104L = (id, n) => { if (b10In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b104Here = id => b10In(id) || (!!(S.camp || []).includes(id) && !(S.dead && S.dead[id]));
const b104Lc = (id, n) => { if (b104Here(id) && S.loy && S.loy[id] != null) loy(id, n); }; // walking, or with the train
const b104Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b10In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b104If = (id, s) => b10In(id) ? (typeof s === 'function' ? s() : s) : '';
const b104Who = () => (ROLL() && ROLL().who) || 'sgt';
const b104Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b104Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b104V = (id, you, they) => id === 'sgt' ? you : they;
const b104Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 dusk at the horse-lines (on 'adjunct' the lie-up at the day's end), 2 the road south by day (the night march), 3 the key's
   evening and night at the horse-lines (the halt before grey light) */
const b104Ph = () => S.f.b10_c4_ph || 1;
const b104Key = () => S.f.b10_c4_key || null;
const b104Horses = () => S.f.b10_c4_key === 'horses';
const b104Adj = () => b10LRoad() === 'adjunct';
const b104A = (road, glass) => b104Adj() ? glass : road;
const b104T = () => b10In('tirren');
/* who knows horses when Tirren is not walking: the train's old farrier (on 'adjunct', the Sixth's own: an old carter who shod horses once) */
const b104Old = () => b104Adj() ? 'the Sixth\'s old carter' : 'the train\'s old farrier';
const b104PhaseOne = () => !!S.f.b10_c4_orders && !!S.f.b10_c4_downSeen;
const b104KeyReady = () => !!S.f.b10_c4_lookDone && (b104Adj() || !!S.f.b10_c4_strangers);
const b104WorkDone = () => b104Horses() ? !!S.f.b10_c4_walked : !!S.f.b10_c4_kept;
const b104NightDone = () => b104WorkDone() && (!b104Horses() || !!S.f.b10_c4_nightDone);
const b104Ennic = () => B5_FINADD.short;
const b104Scene1 = () => 'b10_c4_dusk';
const b104Scene2 = () => b104Adj() ? 'b10_glass_night' : 'b10_south';
const b104Scene3 = () => b104Adj() ? 'b10_glass_night' : 'b10_south_night';
/* the one line of the other squad a chapter (camp talk; b10OtherName is not used): the Third's Chapter 3 key, or on its 'south' road the
   Twelfth's supply wagon on this same road; on a shared crossing, the heavies up the column */
const b104Rumour = () => { const k = b10Key(3) || 'haul', ts = b10TRoad() === 'south';
  if (b104Adj()) return ts
    ? 'Word at the tail is that the foreign heavies who were lent to the Commander went south with the brigades. "Our heavies, their road," the sergeant says. "Your lot, our road. The army upstairs thinks that is funny."'
    : k === 'cut' ? 'Word up the column is that a squad of our heavies cut a water wagon loose when its oxen died, and carried what they could on their backs. Left the wagon standing out there with nothing in it. "Right to," the sergeant says. "Hated it. Right to."'
    : 'Word up the column is that a squad of our heavies took a water wagon\'s traces themselves when its oxen died, and dragged it all night. "Heavies," the sergeant says, with something like love. "Too stupid to stop."';
  if (ts) return k === 'cut' ? 'The foreign heavies drilling the Twelfth left the Twelfth\'s supply wagon standing by the road on a bad night back up the road, when the team broke, and carried what they could. The Twelfth\'s carters are still talking about it. One of them cried.' : 'The foreign heavies drilling the Twelfth put themselves in the traces of the Twelfth\'s supply wagon when its team broke, and dragged it to the next halt. The Twelfth\'s carters are still talking about it. "Like oxen," one of them said. "Only rude."';
  return k === 'cut' ? 'A Bolkando carter says he heard from a rider off the glass\'s edge that the foreigners are cutting their wagons loose out there, when the beasts die, and carrying the water on their backs. He thinks they are mad. He has said so to everybody.' : 'A Bolkando carter says he heard from a rider off the glass\'s edge that the foreigners\' heavies are in the traces themselves out there, where the oxen died, dragging the water wagons by night. He thinks they are mad. He also thinks he would like to see it.'; };

/* ---- The Farrier's Hand: what Tirren does for a horse that has stopped, done for a soldier. It copies the Water-Song (Book Eight's
   b8_c4_hymn): a group heal, a full turn (v10.3: group heals keep the action), a plain heal, so no ward. People's craft, no god's. ---- */
Object.assign(TRICKS, {
  b10_c4_farrier:{name:'The Farrier\'s Hand', ch:4, use:'fight', ab:'t_b10_c4_farrier', where:'the train\'s horse-lines at dusk on the long way round, over a horse that had stopped',
    lore:'A horse that has stopped is not finished, a farrier says. It has only decided. You do not argue with it. You put a hand flat on its neck where the big vein is and talk low, the same few words, and wet its mouth, and lift one foot and set it down, so it remembers it has feet. Then you wait, and let it decide again. Tirren learned it in her father\'s yard. The squad learned that it works on soldiers, who are not so different.',
    get fx(){ return `Once a fight: the bearer goes down the line with a hand on each neck and the same few words, low. Every squadmate within 4 heals 1d6+2, and 1 more for each squad level past the first, wakes from any daze, and steps out of any fire under them. It uses the action, and leaves no ward. Grows with level. Not sorcery, and no god's.`; }},
});
Object.assign(AB, {
  t_b10_c4_farrier:{name:TRICKS.b10_c4_farrier.name, trick:'b10_c4_farrier', self:true, desc:()=>TRICKS.b10_c4_farrier.fx,
    run(u){ AUDIO.play('heal'); const near = party().filter(p => !p.ally && cheb(p, u) <= 4);
      near.forEach(p => { heal(p, roll(1, 6, 2 + lvB())); if (p.stun) { p.stun = false; float(p, 'steadied', '#c8b89a'); } B.fires = B.fires.filter(f => !(f.x === p.x && f.y === p.y)); putOut(p); sparks(p.x, p.y, 10, '#c8b89a', .35); });
      blog(`${u.name} goes down the line with a hand flat on each neck and the same few words, low, the farrier's way, ${near.length > 1 ? 'one soldier and then the next' : 'to nobody but themselves'}. Not finished. They had only decided.`); }},
});

/* ---- the reading: a horse-blanket on the ground at dusk, by the horse-lines (on 'adjunct', on the glass at the column's tail) ---- */
B10READ[4] = {back:'b10_c4_fire', backT:'Back to the fire.', scene:'b10_c4_dusk',
  get where(){ return S && S.f && b104Adj() ? 'a horse-blanket spread on the glass at the column\'s tail' : 'a horse-blanket on the ground by the horse-lines'; },
  get set(){ return S && S.f && b104Adj() ? 'The day\'s end at the lie-up in the glass, the heat going out of the ground, and the last of the Sixth\'s horses on their picket at the column\'s tail with their heads down.' : 'Dusk on the long way round, the train drawn up along the road, the horse-lines quiet, and somebody\'s horse-blanket spread on the ground because there was nothing else flat.'; },
  say:{perrit:'"Sit, Sergeant." Perrit has the calfskin open on the blanket and her hand on the tiles inside it, and does not take them out at once. "They are cold tonight," she says. "Colder than they were. I will lay them anyway. A clerk does not stop keeping the book because nobody reads it."',
       tilewoman:'"A dock, soldier," the old woman says, and holds out a hand, and closes it on the coin without looking. "Sit on the blanket. The horse it came off won\'t mind." She shakes the bag. It sounds the same as ever. She frowns at it anyway.'}};

/* ---- borrowed pictures until the artist's file (184b) replaces them: one scene, the ground, three items ---- */
SCENEX.b10_c4_dusk ??= (cv, t) => (SCENEX.b10_train || ((c, tt) => drawCamp(c, tt, true)))(cv, t);
if (typeof TILEX !== 'undefined') TILEX.b10_c4_ground ??= (...a) => (TILEX.b10_c2_ground || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b10_c4_horsebow', 'b2_horsebow'], ['b10_c4_rasp', 'b10_c2_tally'], ['b10_c4_veil', 'b10_c2_coat']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Ten's glossary ---- */
GLOSSX.tcg.push(
  [4, 'The long way round', 'What the brigades call the southern road to Kolanse: round the glass instead of across it, behind the Bolkando, who are behind the Grey Helms. There is water on it, somewhere, and every horse on it is dying slowly.', ()=>!!(S && S.book === 'tcg' && (S.chapter || 0) >= 4 && S.th && S.f && S.f.b10_lRoad !== 'adjunct')],
  [4, 'A horse that has stopped', 'A farrier\'s words for a horse that has lain down and is deciding whether to get up. Not finished, Tirren says. Only deciding. The squad found the same is true of soldiers.', ()=>!!(S && S.f && S.f.b10_c4_downSeen)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[4] = ['b10_c4_fire'];

/* ---- the squad at the fire: a line at dusk and a line at night for every soldier the Letherii can field (g: the 'adjunct' road, on the
   glass) ---- */
const B104TALK = {
  tobet:[g=>`Tobet is sitting on an upturned bucket with his tally-stick, cutting a notch, which he has not done since the river. "Horses," he says, when you look. "Not ours. Everybody's. I said I would count something useful." He looks at the stick. "This is not useful."`,
         g=>`Tobet has his bow across his knees and is watching ${g ? 'the dark up the column, where the foreigners are' : 'the dark past the horse-lines'}. "They came out of nowhere," he says, of the foragers. "Thin as rakes. I could have put one down from here." He does not say that he did not. He does not have to.`],
  thegg:[g=>`Thegg has a horse's head against his chest, which the horse seems to have decided on by itself. He has not moved for a while. "It is tired," he says. "So I am a wall. Walls are restful." The horse breathes. Thegg breathes. Neither of them says anything else.`,
         g=>`Thegg is talking low to his mother's dead, in her tongue. When you sit he stops. "I told them about the horses," he says. "They said Tarthenal eat horses." He looks at the picket. "I said not these. They are friends of the squad."`],
  perrit:[g=>`Perrit has the tile-pouch in her lap and her hand inside it, not taking anything out. "Lether used to answer," she says. "Not much. A little warmth when you reached. A coin turning somewhere." She takes her hand out and looks at it. "Now I reach and there is a room, and nobody in it."`,
          g=>`Perrit is writing in her small hand on the back of an old ration chit: the tiles laid since the parting, and what each said. "The answers are the same as ever," she says. "The tiles are not. They are colder." She folds the chit. "I am writing that down too. Somebody should."`],
  ammet:[g=>`Ammet is doing feet, as usual, by ${g ? 'the last of the light off the glass' : 'the last of the light'}. "${b104T() ? 'Tirren does the horses\' feet and I do yours,' : 'The farrier does the horses\' feet and I do yours,'}" she says. "We have agreed it is the same work." She tests a blister with the needle. "It is not. Horses complain less."`,
         g=>`Ammet is sitting with her bag shut on her knees, which is unusual. "Nothing to do," she says. "Everybody's mended. Tired, but mended." She looks at the horse-lines. "I could do the horses. ${b104T() ? 'Tirren won\'t let me. She says' : 'The farrier won\'t let me. Says'} my hands are too quick."`],
  ilsa:[g=>`Ilsa has her little book out and is writing the names of the horses the train has lost, in a column, very small. "There should be a list that is not a file," she says. "I said that about people. It turns out I meant it about everything."`,
        g=>`Ilsa is reading over what she has written, by ${g ? 'starlight, which on the glass is nearly enough' : 'the fire'}. "Copper," she says. "Wren. Plum." She looks up. "The farrier named them. Only the farrier. I find that matters to me more than it should."`],
  sorvan:[g=>`Sorvan has been down the picket with ${b104T() ? 'Tirren' : 'the farrier'} and come back quiet, which for Sorvan is worse than angry. "${b104T() ? 'She\'s' : 'The farrier\'s'} right about them," he says. "All of it." He rubs his scale with the rag. "Bluerose would have left the weak ones at the river. I said so. I was wrong. They'd have died sooner."`,
          g=>`Sorvan is sitting where he can see the horses, as always. "Bluerose ride a horse until it drops and then take another," he says. "There is no other, out here." He looks at the picket. "So we walk. Lancers walking. My father would laugh himself sick."`],
  ruuk:[g=>`Ruuk is standing up eating, and looking ${g ? 'up the column, east' : 'back north, along the road'}. "Birds today," he says. "Three. Vultures." He thinks about it. "My grandmother would say that is good news, for the vultures."`,
        g=>`Ruuk is lying on his back looking at the stars. "My grandmother said the stars are the Holds' fires," he says. "Perrit says they are not." He considers. "Perrit has not met my grandmother."`],
  brune:[g=>`Brune has her boots off and her feet on ${g ? 'the glass, which is still warm' : 'the dry ground'}, which she says is the nearest she will get to the Shore for a long while. "It is quiet," she says. "Further than ever." She shrugs. "It will be there. Things that are held stay held."`,
         g=>`Brune has said the evening words to the Shore, facing west, and is sitting with her hands open on her knees. "Nothing," she says. "Not even the tide." She closes her hands. "I asked anyway. It is polite to ask."`],
  pessa:[g=>`Pessa is lying on her back with the boathook across her chest. "On the canal," she says, "when a barge horse goes lame, you put it in the barge and pole it home." She looks at the horses. "Not a barge between here and Kolanse. I've looked."`,
         g=>`Pessa has found the flattest ground at the halt, as always, and is lying on it. "${g ? 'Glass is level, I\'ll give it that' : 'Flat'}," she says. "Wake me if a horse needs poling."`],
  brennet:[g=>`Brennet has grease to the elbow from somebody's axle. "Wagons are fine," he says. "Wagons are always fine." He wipes his hands, which makes them worse. "It's what pulls them. I can fix an axle. I can't fix a horse." He looks at the picket. "${b104T() ? 'Tirren can' : 'The farrier can'}. Some of the time."`,
           g=>`Brennet is sitting on a wagon-tongue in the dark, where he can see the ${g ? 'Sixth\'s two carts' : 'train'}. "Short a team on the third wagon," he says. "We'll put the oxen from the fifth on it, and the fifth goes on half a team." He thinks. "And then nobody pulls the fifth. And then we leave it."`],
  kaedra:[g=>`Kaedra has been out along the road's edge with her bow and come back with nothing in her hand and dust to the knee. "Nothing to shoot," she says. "Hares are gone. Birds are gone. The people out here got them first." She sits. "I don't blame them. I'd have done it."`,
          g=>`Kaedra will not sleep under canvas and has her blanket out in the open, as always. "${g ? 'Stars above and stars below. I keep thinking I\'ll fall up.' : 'Somebody is out there, past the horse-lines,'}" she says. "${g ? 'Then I don\'t.' : 'Watching. Not soldiers. Hungry.'}"`],
  tirren:[g=>`Tirren is sitting with her back to a wagon wheel and a hoof in her lap, rasping. "${g ? 'The glass wears their feet like a file' : 'This road wears their feet like a file'}," she says. "I keep them level. That's all I can do." She does not look up. "The rest is water, and there isn't any."`,
          g=>`Tirren has been down the horse-lines with a lamp and come back. She takes the chalk out of her apron and makes a mark on the inside of it, low down, with the others. ${S.f.b10_c4_key === 'horses' ? 'Then she looks at the mark a while and rubs half of it out with her thumb. "Nearly," she says.' : 'She does not say anything about it. She has stopped saying anything about it.'}`],
};

const B10CH4 = {
  title:B10CH[4], number:'Four',
  intro:{ get loc(){ return S && S.f && b104Adj() ? 'The Glass Desert' : 'South of the glass'; }, get sub(){ return S && S.f && b104Adj() ? 'The middle of the crossing · the column\'s tail' : 'The long way round · the train\'s horse-lines'; }, scene:'b10_c4_dusk',
    get cap(){ return S && S.f && b104Adj() ? 'The glass at the day\'s end, the column lying up under its cloaks, and at its tail a few Letherii carts and a picket of thin horses with their heads down.' : 'The train drawn up along the road at dusk, the horse-lines quiet, every head on the picket down, and far to the south the brigades\' fires coming up one by one.'; },
    paras:[
()=> b104Adj() ? `The crossing goes on. The column marches by night without a lamp and lies up by day under its cloaks, and the glass goes on, east, the same in every direction. The Sixth walks at the tail of it, a few Letherii with two carts and a picket of horses, behind an army that has stopped turning round to see if they are still there.` :
`The long way round goes on south. The Grey Helms march ahead and pull further ahead every day, straight as a ruled line. The Bolkando try to keep up with the Grey Helms. The brigades of Lether try to keep up with the Bolkando. The train comes last, and the Sixth with it.`,
()=>`You are Sergeant {sgt}, Sixth Company. The column has not been told why it is going where it is going, and has stopped asking. ${b104Adj() ? 'Every night there are fewer of the Sixth\'s horses at the tail.' : 'Every night there are fewer horses on the picket.'}`,
()=> b104Adj() ? `At the day's end, before the march, one of the Sixth's last horses has lain down on the glass at the picket's end.` : `At dusk, at the halt, a horse on the train's picket has lain down in the traces and not got up.`],
    go:'To the horse-lines', node:'b10_c4_start'},

  areas:[
    /* 16 x 12 (b10_c4_ground, dusk). The horse-lines at the halt (on 'adjunct' the column's tail on the glass). . open ground  # scrub and
       stone (the dark beyond)  h the picket  k the horse that has gone down  w wagons  T tents (cloaks on 'adjunct')  W the water wagon
       (Yelt; on 'adjunct' the Sixth's carts)  c a water-cart (Orla; the foreigners' water-sergeant)  F the squad's fire  X the picket's far
       end, east */
    { id:'b10_c4_lines', title:'The long way round · the horse-lines', sub:'Dusk · the train halted', hint:'Tap ground to move · tap a figure to talk · the picket is north, its far end east', decor:'b10_c4_ground',
      map:[ "################",
            "#.hhhhhhh..T...#",
            "#..............#",
            "#.k....w....W..#",
            "#..............#",
            "#......F.......X",
            "#..............#",
            "#..c.......w...#",
            "#..............#",
            "#..T..w....T...#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b10_c4_fire', k:'b10_c4_down', W:'b10_c4_yelt', c:'b10_c4_cart', X:'b10_c4_picket'}, start:{x:3, y:4},
      quest:()=> !S.f.b10_c4_downSeen ? 'The horse that has gone down, at the picket\'s west end.' : !S.f.b10_c4_orders ? 'The Finadd. He has the column\'s word.' : !S.f.b10_c4_forDone ? 'The picket\'s far end, east. Something is moving out past the horses.' : 'The fire. Then the road.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:2, node:()=>'b10_c4_ennic', fresh:()=>!S.f.b10_c4_orders},
        {id:'saffa', name:'Saffa, the field cook', kind:'b9_c2_saffa', x:8, y:6, node:()=>'b10_c4_saffa', show:()=>!b104Adj(), fresh:()=>!S.f.b10_c4_saffa},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:13, y:8, node:()=>'b10_c4_tile', show:()=>!b104Adj(), fresh:()=>false} ] },

    /* 16 x 12 (b10_c4_ground, day; 'escort' only). The road south: , the track  w wagons  h horses on the march  R the column's rear,
       north  v the lookout on the east side (the Grey Helms' dust)  s a dry wash with carcasses in it  > on south */
    { id:'b10_c4_road', title:'The long way round · the road', sub:'Noon · the column on the march', hint:'Tap ground to move · tap a figure to talk · the rear is north, the wash west, the dust east', decor:'b10_c4_ground',
      map:[ "################",
            "#.....,R,......#",
            "#..w..,,,..h...#",
            "#.....,,,......#",
            "#..h..,,,......v",
            "#.....,,,..w...#",
            "s.....,,,......#",
            "#..w..,,,..h...#",
            "#.....,,,......#",
            "#..h..,,,......#",
            "#.....,,,......#",
            "#######>########" ],
      walk:'.,', triggers:{R:'b10_c4_rear', v:'b10_c4_look', s:'b10_c4_wash', '>':'b10_c4_onkey'}, start:{x:7, y:3},
      quest:()=> !S.f.b10_c4_strangers ? 'The column\'s rear, north. Kaedra has seen something on the road.' : !S.f.b10_c4_lookDone ? 'The east side of the road. The Bolkando are pulling away.' : 'The Finadd. The Bolkando want the column to keep up.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:5, node:()=>'b10_c4_ennic', fresh:()=>b104KeyReady() && !S.f.b10_c4_key}] },

    /* 16 x 12 (b10_c4_ground, night; 'adjunct' only). The night march on the glass: w the column's carts going on ahead  h the Sixth's
       horses on lead-reins  v the column's tail, east (keeping it in sight)  > on east */
    { id:'b10_c4_march', title:'The crossing · the night march', sub:'Night · the column\'s tail', hint:'Tap ground to move · tap a figure to talk · the column\'s tail is east', decor:'b10_c4_ground', dark:true,
      map:[ "################",
            "#..............#",
            "#..w.......w...#",
            "#..............#",
            "#..h...........v",
            "#......h.......#",
            "#..............#",
            "#..h.......w...#",
            "#..............#",
            "#.....h........#",
            "#..............>",
            "################" ],
      walk:'.', triggers:{v:'b10_c4_look', '>':'b10_c4_onkey'}, start:{x:3, y:6},
      quest:()=> !S.f.b10_c4_lookDone ? 'The column\'s tail, east. It is getting further ahead.' : 'The Finadd. The foreigners\' sergeant wants the tail to keep up.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:8, y:6, node:()=>'b10_c4_ennic', fresh:()=>b104KeyReady() && !S.f.b10_c4_key}] },

    /* 16 x 12 (b10_c4_ground, night). The horse-lines at the key's halt (on 'horses' at the column's tail, alone; on 'pace' at the edge of
       the Bolkando's camp; on 'adjunct' the halt on the glass before grey light): H the horse-lines (the key's work)  W the water wagon (Yelt,
       the ledger shut; the Sixth's carts)  F the fire  X the picket's far end  > on south (on east) */
    { id:'b10_c4_night', title:'The long way round · the halt', sub:'Night · the horse-lines', hint:'Tap ground to move · tap a figure to talk · the horses are north, the picket\'s end east', decor:'b10_c4_ground', dark:true,
      map:[ "################",
            "#.hhhhH........#",
            "#..............#",
            "#..w....W...w..#",
            "#..............#",
            "#......F.......X",
            "#..............#",
            "#..w.......w...#",
            "#..............#",
            "#....T.....T...#",
            "#..............#",
            "#######>########" ],
      walk:'.', triggers:{F:'b10_c4_fire', H:'b10_c4_horselines', W:'b10_c4_yelt', X:'b10_c4_thieves', '>':'b10_c4_onroad'}, start:{x:7, y:6},
      quest:()=> !b104WorkDone() ? 'The horse-lines, north. The horses first.' : (b104Horses() && !S.f.b10_c4_nightDone) ? 'The picket\'s far end, east. Somebody is out there in the dark.' : !b10BeatOf(4) ? (b104Adj() ? 'The circle. The squad has something to ask.' : 'The fire. Yelt has shut the ledger.') : 'On, at first light.',
      npcs:[] } ],

  battles:{
    /* the foragers at the picket's far end, in the last of the light: people of a hungry country, not soldiers; on 'adjunct', stragglers
       from up the column who want the horses' water (fought down, never killed in words). The same id, two grounds. */
    b10_c4_foragers:{get title(){ return b104Adj() ? 'The horses\' water' : 'The horse-lines'; }, style:'b10_c4_ground',
      get warrenText(){ return b104Adj() ? 'The day\'s end on the glass · the heat going out of the ground · the warrens quiet' : 'Dusk at the horse-lines · dust, the horses pulling at their ropes · the warrens thin and far'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t...t.","........","#......#","........","...t....","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b10_lspear',1,8]],
      get foes(){ return b104Adj() ? [['b10_lstraggler',2,1],['b10_lstraggler',5,1],['b10_lstraggler',3,0],['b10_lstraggler',4,0]] : [['b10_lforager',2,1],['b10_lforager',5,1],['b10_lforager',3,0],['b10_lforager',4,0]]; },
      xp:380, after:'b10_c4_foragers_after',
      preText:()=> b104Adj() ? `They come down the column's tail in the last of the light, five or six of them in the foreigners' kit with empty skins and their faces set. Not for the Sixth's water. For the horses'. A horse drinks what a soldier drinks in a day at one go, and these have decided that is a waste.`
        : `They come out of the scrub past the picket's end in the last of the light: men and women in rags the colour of the ground, thin as the horses, with hooks and knives and a rope, and no hurry at all, because they have been watching the train since noon and know how many guards it has. They want a horse. They do not much mind which.`,
      stage2:{get title(){ return b104Adj() ? 'Up the tail' : 'In the scrub'; }, xp:170,
        text:()=> b104Adj() ? `The horses are the Sixth's. A little way up the dark column the rest have stopped round a big one with a corporal's knot, who is telling them a horse is only a horse, and the water in it is only water, and nobody up the column will care.${b104If('tirren', `\n\nTirren has a horse's halter in one hand and her hammer in the other. "Not these," she says. "These are going home."`)}`
          : `The horses are the train's. Back in the scrub the rest of them have one off the picket already, a grey with its head down, and a grey-bearded man with a hook and a headman's string of beads round his neck is telling them to go, now, with what they have.${b104If('tirren', `\n\nTirren has gone white round the mouth. "That's Ash," she says. "She's lame in the near hind. She won't go a mile." She goes into the scrub first, with the hammer.`)}`,
        map:["#......#","..t..t..","........","........","...tt...","........",".t....t.","........","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        get foes(){ return b104Adj() ? [['b10_lringleader',3,0],['b10_lstraggler',5,2]] : [['b10_lforagerchief',3,0],['b10_lforager',5,2]]; }} },
    /* thieves at the horse-lines in the dark ('horses' only): more of the hungry country; on 'adjunct', stragglers */
    b10_c4_night:{title:'The picket in the dark', style:'b10_c4_ground', dark:true, get warrenText(){ return b104Adj() ? 'Before grey light on the glass · stars above and below · the warrens quiet' : 'Night at the tail of the column · no fires near, the horse-lines quiet · the warrens quiet'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t.....","........","....t...","........",".t....t.","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      get foes(){ return b104Adj() ? [['b10_lstraggler',2,0],['b10_lstraggler',5,0],['b10_lstraggler',3,1]] : [['b10_lforager',2,0],['b10_lforager',5,0],['b10_lforager',3,1]]; }, xp:120, after:'b10_c4_thieves_after',
      preText:()=> b104Adj() ? `Three of them, coming down the halted column in the dark toward the Sixth's picket, low and quiet, with a knife for the ropes. They are not thinking about the Sixth at all. They are thinking about the water in a horse.`
        : `Three of them, out of the dark beyond the tail, low and quiet, with a knife for the ropes. The column's fires are a long way ahead. Out here at the tail there is the Sixth, and the horses, and them.`},
    /* half-wild dogs at the carcasses in a dry wash off the road (optional; 'escort' only: nothing lives in the glass) */
    b10_c4_dogs:{title:'The wash', style:'b10_c4_ground', warrenText:'Noon in a dry wash off the road · white stones, carcasses, flies · the warrens thin and far', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t.....","........","....t...","........",".t....t.","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_ldog',2,0],['b10_ldog',5,0],['b10_ldog',3,1],['b10_ldog',6,1]], xp:100, after:'b10_c4_dogs_after',
      preText:()=>`Four of them in the wash, lean and grey-brown, among the carcasses the column has left along the road since the parting. They have been following the column since the parting, or near it. They have stopped being afraid of it.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b10_c4_horsebow:{name:'A horse-bow', slot:'weapon', role:'ranged', who:null, atk:1, rng:1, dmg:[1,8,2],
      get line(){ return S && S.f && b104Adj() ? 'A short horse-bow of horn and sinew, doubled back on itself, of the plains people who crossed with the foreigners. Its horse died somewhere up the column, and the one who carried it after could not say why he had. It is a bow for shooting from a saddle. It works well enough on foot, and nobody out here has a saddle that is not on a dead horse.' : 'A short horse-bow of horn and sinew, Bolkando make, doubled back on itself. It came off a dead outrider\'s saddle somewhere on the long way round and was carried after, for no reason anybody could give. It is a bow for shooting from a horse. It works well enough on foot, and on foot is how everybody out here will be soon.'; }},
    b10_c4_rasp:{name:'A farrier\'s rasp', slot:'trinket', role:'any', who:null, hp:2, stat:{might:1},
      line:'A farrier\'s spare rasp, worn thin as a leaf in the middle and still sharp at the ends, on a thong to hang at the belt. Tirren keeps two. Whoever carries the other finds themselves looking at feet first, horses\' and soldiers\', and seeing what is wrong with them.'},
    b10_c4_veil:{name:'A dust veil', slot:'trinket', role:'any', who:null, hp:2, stat:{guile:1},
      get line(){ return S && S.f && b104Adj() ? 'A long strip of loose-woven cloth, dark on one side and chalked pale on the other, of the kind the foreigners wear on the glass by day across the mouth and eyes. It keeps the glare out and the breath in. Whoever wears it is harder to see, and harder to read, and does not mind either.' : 'A long strip of loose-woven cloth the colour of the road, of the kind the water-carters wind round their heads on the long way round. It keeps the dust out of the mouth and the sun off the eyes. Whoever wears it is harder to see, and harder to read, and does not mind either.'; }} },

  scenes:{
    b10_c4_dusk:{get loc(){ return S && S.f && b104Adj() ? 'The Glass Desert' : 'South of the glass'; }, get sub(){ return S && S.f && b104Adj() ? 'The column\'s tail · the day\'s end' : 'The horse-lines · dusk'; },
      cap:'The horse-lines at dusk, every head on the picket down, a horse lying at the near end with a blanket beside it, and the light going.', amb:'explore'} },

  end:{
    get horses(){ return ['The horses lived', b104Adj() ? 'In the middle of the crossing, the Sixth put stragglers off its horses\' water and learned a farrier\'s hand for a soldier gone down. When the foreigners\' sergeant said keep up, the Sixth walked the last of Lether\'s horses at their own pace behind the column\'s tail instead, and came in to the halt late, with every horse it had.' : 'On the long way round, the Sixth put the hungry country off the train\'s horses and learned a farrier\'s hand for a soldier gone down. When the Bolkando said keep up, the Sixth walked the horses Tirren\'s way instead, and fell behind, and came in to the halt at the column\'s tail long after dark, with the horses.']; },
    get pace(){ return ['Kept up', b104Adj() ? 'In the middle of the crossing, the Sixth put stragglers off its horses\' water and learned a farrier\'s hand for a soldier gone down. When the foreigners\' sergeant said keep up, the Sixth kept up, and drove the last of Lether\'s horses until they dropped, and did not lose the column.' : 'On the long way round, the Sixth put the hungry country off the train\'s horses and learned a farrier\'s hand for a soldier gone down. When the Bolkando said keep up, the Sixth kept up, and drove the horses until they dropped, and made the Bolkando\'s camp by dark with fewer than it started with.']; } },
  get endScene(){ return S && S.f && b104Adj() ? 'b10_glass_night' : 'b10_south'; },
  endCap:()=> b104Adj() ? 'The glass before grey light, the column getting up to march, and at its tail a few Letherii carts and a picket of thin horses.' : 'The road south at first light, the Grey Helms\' dust far ahead, the Bolkando behind it, and the train last, with its horses.',
  tease:'Next: the Third. The crossing\'s worst nights, the water gone, and something under the glass that nobody expected.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b10_c4_key === 'horses') x.push(b104Adj() ? 'The Sixth walked the last of its horses at their own pace behind the column, and came in late with all of them.' : 'The Sixth walked the train\'s horses Tirren\'s way and fell behind the Bolkando, and the horses lived.');
    if (f.b10_c4_key === 'pace') x.push(b104Adj() ? 'The Sixth kept up with the column, and drove its last horses until they dropped.' : 'The Sixth kept up with the Bolkando, and drove the horses until they dropped.');
    if (f.b10_c4_farrierOk) x.push(`${b10In('tirren') ? 'Tirren' : 'A farrier'} taught the squad to get a soldier up the way she gets a horse up.`);
    if (f.b10_c4_forDone) x.push(b104Adj() ? 'Stragglers came for the horses\' water at the day\'s end, and went back up the column without it.' : 'Starving foragers came for the horses at dusk, and went back into the scrub without them.');
    if (f.b10_c4_nightDone) x.push('Thieves at the picket in the dark, and the squad put them off it.');
    if (f.b10_c4_dogsDone) x.push('Half-wild dogs in a wash off the road, and the squad put them off the carcasses.');
    if (f.b10_c4_strangers) x.push('Three sunburned strangers walked up out of the west at the column\'s rear, and somebody else took them in.');
    return x; },

  journal:()=>{ const f = S.f, adj = b104Adj(); return [
    f.b10_c4_beat && 'Yelt shut the ledger at the fire, and the squad said what Lether sent it out here for.',
    f.b10_c4_walked && (adj ? 'Walked the last of the horses behind the column\'s tail at their own pace. Came in late. All of them.' : 'Walked the horses Tirren\'s way and fell behind the Bolkando. Came in at the tail long after dark, with the horses.'),
    f.b10_c4_kept && (adj ? 'Kept up with the column and drove the horses until they dropped.' : 'Kept up with the Bolkando and drove the horses until they dropped.'),
    f.b10_c4_thirst && f.b10_c4_thirst !== 'none' && f.b10_c4_thirst !== 'waived' && 'The horses drank first. The thirst came after.',
    f.b10_c4_strangers && 'Three sunburned strangers walked up the road out of the west at the column\'s rear. Riders from the staff went back for them.',
    f.b10_c4_forDone && (adj ? 'Stragglers from up the column, after the horses\' water.' : 'Starving people out of the scrub, after the horses.'),
    f.b10_c4_downSeen && 'A horse lay down at the picket and decided whether to get up.',
    adj ? 'The Sixth Company, a few Letherii at the tail of the foreigners\' column, in the middle of the crossing.' : 'The Sixth Company, in the Commander\'s brigades, on the long way round.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: dusk at the horse-lines (the first halt: the horse that has gone down) ======== */
    b10_c4_start:()=>({sp:'The horse-lines', scene:'b10_c4_dusk', fx:()=>{ S.f.b10_c4_ph = S.f.b10_c4_ph || 1; S.f.b10_c4_downSeen = 1; }, again:()=>'The horse-lines at dusk, every head on the picket down.', txt:
`${b104Adj() ? 'The Sixth\'s picket is a rope pegged into cracks in the glass at the column\'s tail, with what is left of Lether\'s horses on it.' : 'The train\'s picket runs along the road\'s edge, a long rope between pegs with the horses on it, and every head on it is down.'} They stand the way horses stand when they have stopped expecting anything: hip-shot, tails still, ears out sideways.

At the near end a horse has lain down. Not fallen: lain down, carefully, the way a tired old soldier sits. ${b104T() ? 'Tirren is on her knees at its head with one hand flat on its neck, talking to it, low.' : `${b104Old().replace(/^t/, 'T')} is standing over it with his arms folded, looking at it the way a clerk looks at a bad sum.`}

${b104Say({tirren:'"She\'s not finished," Tirren says, without looking up. "She\'s deciding."', sorvan:'Sorvan looks at the horse, and then away. "Bluerose would cut her throat," he says. "Kinder." The squad lets that lie.', tobet:'Tobet looks along the picket and counts it without meaning to, and stops counting.', _:'The squad stands at the end of the picket and looks at the horse, and the horse looks at nothing.'})}`,
      ch:[{t:'The horse.', go:'b10_c4_down'},
          b10ReadChoice(4),
          {t:'Walk the train.', go:()=>startExplore()}]}),
    b10_c4_read:()=>b10ReadOffer(4),
    b10_c4_card:()=>b10ReadCard(4),

    /* the horse that has gone down: the trick */
    b10_c4_down:()=>{ const tried = !!S.f.b10_c4_farrierTried;
      return {sp:b104T() ? 'Tirren' : 'The horse-lines', scene:'b10_c4_dusk', again:()=> S.f.b10_c4_farrierOk ? 'The grey mare at the picket\'s end, on her feet, a wet cloth over her eyes.' : 'The horse at the picket\'s end, lying down, deciding.', txt: tried ?
`${S.f.b10_c4_farrierOk ? 'The mare is up, on four feet, with her head low and a wet cloth tied over her eyes against the last of the glare. She has decided. For tonight.' : 'The mare is up, in the end, swaying, with her head low. She decided by herself, after a while. The squad may have helped.'}${b104If('tirren', '\n\nTirren is beside her with the rasp, doing her feet, as if nothing had happened. It is Tirren\'s way of saying thank you.')}` :
`${b104T() ? 'Tirren has her hand flat on the mare\'s neck, low, where the big vein is.' : `${b104Old().replace(/^t/, 'T')} kneels, with a grunt, and puts a hand flat on the mare's neck, low, where the big vein is.`} "You don't argue with them," ${b104T() ? 'she' : 'he'} says. "A horse that's stopped has only decided. You talk to it, the same few words. Wet its mouth. Lift one foot and set it down, so it remembers it has feet. Then you wait, and let it decide again." ${b104T() ? 'She' : 'He'} looks up at the squad. "${b104T() ? 'Works on people. My da did it to me, the winter I had the fever.' : 'Works on people. Did it to my own son, the winter he had the fever.'} Want to learn?"${b104If('ammet', `\n\nAmmet has crouched at the mare's other side, watching the hand on the neck. "That is how I hold a soldier who is going," she says quietly. "I did not know anybody else knew it."`)}`,
        ch:[{t:'Learn it: the hand on the neck, the words, the foot lifted and set down, and the waiting.', check:['wits', 20], trick:'b10_c4_farrier', req:()=>!S.f.b10_c4_farrierTried, fx:()=>{ S.f.b10_c4_farrierTried = 1; },
              edges:id=>[id === 'tirren' && ['a farrier\'s daughter: she has done it in her father\'s yard since she could stand', 2], id === 'ammet' && ['a surgeon\'s calm hands: she holds the dying the same way', 2], id === 'sorvan' && ['a Bluerose lancer has sat up all night with a horse', 1], id === 'brennet' && ['he has talked a team up a bad hill in the rain', 1], id === 'thegg' && ['the horse already leans on him', 1], id === 'sgt' && ['you have got a squad up off the ground on the Wastes, with words', 1], id === 'ilsa' && ['she would rather read about it', -1], id === 'pessa' && ['she pushes things with a boathook; she does not wait for them', -1]],
              go:'b10_c4_down_ok', fail:'b10_c4_down_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c4_down_ok:()=>({sp:b104T() ? 'Tirren' : 'The horse-lines', scene:'b10_c4_dusk', fx:()=>{ S.f.b10_c4_farrierOk = 1; if (!S.kit.includes('b10_c4_rasp')) gain('b10_c4_rasp'); }, txt:
`${by({sgt:'You put your hand where the hand was', tirren:'Tirren takes her hand away and puts yours where it was', ammet:'Ammet puts her hand where the farrier\'s was', _:'{who} puts a hand where the farrier\'s was'})}, flat and low, and says the words, the same few, over and over, and wets the mare's mouth from a rag, and lifts the near fore and sets it down.

Then the waiting. It is longer than anybody likes. The mare breathes out, very long, and puts her front feet under her, and stands up in two movements, swaying, and stays up.

${b104T() ? '"There," Tirren says. "Now you know." She unhooks a rasp from her belt, the thinner of two, and holds it out. "Spare. Keep their feet level and they\'ll go further. Yours too."' : '"There," the farrier says. "Now you know." A spare rasp comes off a belt and is held out. "Keep their feet level and they\'ll go further. Yours too."'}`,
      ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]}),
    b10_c4_down_no:()=>({sp:b104T() ? 'Tirren' : 'The horse-lines', scene:'b10_c4_dusk', fx:()=>{ if (!S.kit.includes('b10_c4_rasp')) gain('b10_c4_rasp'); }, txt:
`The hand goes in the wrong place, and then the right one, and the words come out like orders, which is wrong, and the mare lays her ears back and does not get up for anybody.

After a while she gets up anyway, by herself, swaying, because she had decided to before anybody spoke. ${b104T() ? 'Tirren pats her neck. "She was always going to," she says. "You were in the way, a bit." She hands over the thinner of her two rasps. "Practise on feet. Feet don\'t mind."' : 'The farrier pats her neck, and hands over a spare rasp. "Practise on feet," comes the advice. "Feet don\'t mind."'}`,
      ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]}),

    /* Finadd Ennic: the column's word (phase 1); the key (phase 2); later, short */
    b10_c4_ennic:()=>{ const ph = b104Ph();
      if (ph >= 3) return {sp:B5_FINADD.name, scene:b104Scene3(), txt:
`${b104Ennic()} is sitting on a wagon-tongue with his slate on his knee, writing by ${b104Adj() ? 'starlight' : 'the light of somebody else\'s fire'}. "${b104Horses() ? 'The horses, Sergeant. I wrote it down.' : 'We kept up. I wrote it down. I wrote down what it cost as well.'}"`,
        ch:[{t:'Back.', go:()=>startExplore()}]};
      if (ph === 2 && b104KeyReady()) return {sp:B5_FINADD.name, scene:b104Scene2(), html:witnessHTML(), again:()=>`${b104Ennic()}, with his slate, looking ${b104Adj() ? 'up the column' : 'south after the Bolkando'}. "The horses or the pace, Sergeant."`, txt: b104Adj() ?
`${b104Ennic()} is walking at the tail with his horse on a lead-rein, because it can no longer carry him. A foreign sergeant has dropped back down the column to him, and has said something, and gone back up.

"The foreigners' word," he says. "The tail is falling behind. The column does not wait, and they will not send back for anyone who cannot keep up. They are not being cruel. They cannot spare the water to be kind." He looks at the Sixth's horses, strung out behind on their lead-reins, heads low. "These are the last of Lether's horses on the glass, Sergeant. Ours to decide.

"We can walk them at their own pace, the farrier's way, and let the column go on ahead, and come in to the halt late, if we come in. Or we keep up. Drive them. And when one drops, we leave it and take its load."${b104If('tirren', `\n\nTirren has stopped walking. "Walk them," she says. "They'll get there. Not fast. They'll get there."`)}${b104If('thegg', `\n\nThegg looks up the column, at the dark where the foreigners are. "If we lose the column," he says slowly, "we lose the water."`)}` :
`${b104Ennic()} is standing in the road with his slate under his arm, watching a Bolkando officer ride away south at a canter on a horse that should not be cantering. Ahead, the Bolkando's dust is pulling away from the brigades. Ahead of that, the Grey Helms' dust, very straight, pulling away from everybody.

"The Bolkando's word," he says. "The column keeps up. Their queen will not wait, and the Grey Helms will not wait for her, and nobody means to arrive at Kolanse last." He looks at the train's horses, heads low in the traces. "The Commander's word is that the column keeps together. Which is not the same thing, and the Bolkando know it.

"The Sixth has the train's rearguard. We can walk the horses at their own pace, the farrier's way, and fall behind, and come in to the halt at the tail long after dark. Or we keep up. Drive them. And when one drops, we leave it and put its load on the next."${b104If('tirren', `\n\nTirren has stopped walking. "Walk them," she says. "Please. They'll get there. Not fast. They'll get there."`)}${b104If('thegg', `\n\nThegg looks south after the Bolkando dust. "If we fall behind," he says slowly, "we are last of the last. There is nobody behind last."`)}`,
        ch:[{t:b104T() ? '"We walk them. Tirren\'s way."' : '"We walk them. The farrier\'s way."', fx:()=>{ S.f.b10_c4_key = 'horses'; S.f.b10_c4_horses = 1; S.f.b10_c4_ph = 3; b104Lc('tirren', 1); }, go:'b10_c4_key_horses'},
            {t:'"We keep up. Drive them."', fx:()=>{ S.f.b10_c4_key = 'pace'; S.f.b10_c4_pace = 1; S.f.b10_c4_ph = 3; b104L('thegg', 1); b104Lc('tirren', -1); }, go:'b10_c4_key_pace'},
            {t:'Not yet.', go:()=>startExplore()}]};
      if (ph === 2) return {sp:B5_FINADD.name, scene:b104Scene2(), txt:
`${b104Ennic()} is walking with his slate under his arm and his horse led behind him. "${b104Adj() ? 'Keep the column in sight, Sergeant. That is the whole of tonight\'s order. I will find you when it changes.' : 'The rear first, Sergeant. Kaedra has seen something on the road. Then keep an eye on the Bolkando. I will find you when they want something.'}"`,
        ch:[{t:'Back to the column.', go:()=>startExplore()}]};
      if (S.f.b10_c4_orders) return {sp:B5_FINADD.name, scene:'b10_c4_dusk', txt:
`${b104Ennic()} is writing on his slate in the last of the light. "${S.f.b10_c4_forDone ? 'Good. Sleep, if you can.' : 'The picket\'s far end, Sergeant. Something has been moving out there since noon.'}" He does not look up.`,
        ch:[{t:'"What else is the column saying?"', req:()=>!S.f.b10_c4_ride, go:'b10_c4_ennic_ride'},
            {t:'Back to the horse-lines.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b10_c4_dusk', fx:()=>{ S.f.b10_c4_orders = 1; }, again:()=>`${b104Ennic()}, with his slate. "The picket's far end, Sergeant."`, txt:
`${b104Ennic()} has his slate under his arm and dust in the lines of his face. There are more lines through names on the slate than there were at the parting. He has stopped mentioning it.

"Sergeant." He nods ${b104Adj() ? 'up the column, at the foreigners lying up under their cloaks' : 'south, after the brigades\' fires'}. "${b104Adj() ? 'The column marches at full dark. The foreigners have asked that the tail keep up, politely, the way they ask everything. The water is counted to the mouthful. Ours as well. Their clerks came down and counted it for us.' : 'The column marches at first light. By day again, on the Commander\'s word: the ground on this stretch is too broken to walk blind. The Bolkando have asked, again, that the brigades keep up. The Grey Helms have not asked anything. Their dust is a long way ahead and getting further.'}

"And keep near the horses tonight." He looks east, past the picket's end, where the ground goes ${b104Adj() ? 'away flat and pale into the dark' : 'into scrub and stones and the dark'}. "${b104Adj() ? 'A few up the column have been looking at them all day. Not us. Thirsty ones.' : 'There are people out there. Not soldiers. This country has been hungry a long time, and a horse is a great deal of food.'}"${b104If('perrit', `\n\nPerrit looks at the slate. "You are still keeping it," she says. "Yes," Ennic says. "It wants keeping."`)}${b104If('tirren', `\n\nTirren is looking past the picket into the dark. "They've been watching since noon," she says. "The horses know."`)}`,
        ch:[{t:'"What else is the column saying?"', req:()=>!S.f.b10_c4_ride, go:'b10_c4_ennic_ride'},
            {t:'"The picket, then."', go:()=>startExplore()},
            {t:'Not now.', go:()=>startExplore()}]}; },
    /* the chapter's one rumour: the grey knights' commander rode off into the glass */
    b10_c4_ennic_ride:()=>({sp:B5_FINADD.name, scene:'b10_c4_dusk', fx:()=>{ S.f.b10_c4_ride = 1; }, txt: b104Adj() ?
`"That there were riders on the glass to the south, earlier, small, coming this way." He shrugs. "A foreign sergeant says it was the grey knights' commander, riding to find their Adjunct. Another says it was nobody, and the glass makes riders out of heat." He tucks the slate away. "I did not see them. I am told that is no proof of anything, out here."` :
`"That the grey knights' commander rode off into the glass." He says it the way he says everything he does not believe yet, carefully. "With a few of her own, they say, a while back, to find the foreigners' Adjunct. The Grey Helms did not stop marching. Why she went, or whether she came back, the column cannot say." He looks north, where the glass is, beyond a long way of nothing. "I wrote it down. I do not know what to do with it, so it is on the slate with everything else."`,
      ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]}),

    /* Yelt at the water wagon (on 'adjunct' the Sixth's carts): phase 1 the horses' water, phase 3 the ledger shut */
    b10_c4_yelt:()=>{ const ph = b104Ph();
      if (b104Adj()) return {sp:'The Sixth\'s carts', scene:ph >= 3 ? b104Scene3() : 'b10_c4_dusk', fx:()=>{ S.f.b10_c4_carts = 1; }, txt:
`The Sixth's two carts are roped and covered at the picket's end, ${ph >= 3 ? 'and a soldier of the squad sits on the tongue of the nearer one, awake.' : `with the barrels chalked on the staves in Yelt's hand from the parting${S.f.b10_c2_counted ? ', counted twice' : ''}, and fewer of them than there were.`}${b104If('brennet', `\n\nBrennet knocks a stave with a knuckle and listens. "${ph >= 3 ? 'Lighter' : 'Half'}," he says. That is all he says.`)}`,
        ch:[{t:'Back.', go:()=>startExplore()}]};
      if (ph >= 3) return {sp:'Yelt', scene:b104Scene3(), fx:()=>{ S.f.b10_c4_ledger = 1; }, txt:
`Yelt has shut the ledger and is sitting with both hands flat on the cover, at the tailboard of the water wagon, by a lamp turned very low. ${b104Horses() ? 'He came back down the column on foot to the tail, to count the train\'s water where it was, which is not a thing quartermasters do.' : 'The water wagon made the Bolkando\'s camp with the column. The horse that pulled it did not make it far past.'}

"A horse today," he says. "${b104Horses() ? 'Not one of ours. The Bolkando lost three. I wrote theirs down too.' : 'And another. And the grey that the farrier got up. I wrote them in the book.'}" He looks at the cover. "It is the first book I have kept where the sums only go one way."`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      return {sp:'Yelt', scene:'b10_c4_dusk', fx:()=>{ S.f.b10_c4_yelt = 1; }, again:()=>'Yelt at the water wagon\'s tailboard, the book open, counting.', txt:
`Yelt is at the water wagon's tailboard with the book open and a lamp not yet lit, counting barrels the way he counts them, twice. The book is fatter than it was at the parting, and the barrels are fewer.

"The horses' water," he says, without being asked, and turns the book round to show a page. ${S.f.b10_c2_counted ? 'It is in Tirren\'s chalk and his ink both, every barrel the horses have had since the parting. "Counted the night the army split," he says. "It is the only page in the book that is right."' : 'It is mostly crossings-out. "It was not counted at the parting," he says. "Everyone was watching the foreigners go. I do not blame them. I was watching too. Now I do not know what the horses have drunk, only that it was a great deal."'}

He shuts the book on his finger. "A horse drinks what a soldier drinks in a day at one go. Every day we keep them, we choose that. I would like it written that I said so."${b104If('tirren', `\n\nTirren reads the page upside down. "They'll need more tomorrow," she says. "They always need more tomorrow."`)}`,
        ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]}; },

    /* Orla at her water-cart: the dust veil (on 'adjunct', the foreigners' water-sergeant at the tail: the veil and the one line of the Third) */
    b10_c4_cart:()=>{ const adj = b104Adj();
      if (adj) return {sp:'A foreign water-sergeant', scene:'b10_c4_dusk', fx:()=>{ if (!S.f.b10_c4_veilGot) { S.f.b10_c4_veilGot = 1; gain('b10_c4_veil'); } S.f.b10_c4_saffa = 1; }, again:()=>'The foreigners\' water-sergeant at the tail, with his tally and his cudgel.', txt:
`A foreign water-sergeant comes down the tail at the day's end with a tally-board and a cudgel, counting the Sixth's skins against his board, which he does every halt and does not apologise for. He is burned black by the glare and has a long strip of chalked cloth wound round his head and face against it.

"${b104Rumour()}"

He looks at the Sixth's faces, red and peeling, and unwinds a spare strip of cloth from his belt and holds it out. "Dark side out by night, pale side out by day," he says. "Across the eyes and mouth. Keeps the breath in. Your lot will be blind by the far side without one." He goes back up the column without waiting to be thanked.${b104If('kaedra', `\n\nKaedra watches him go. "He counted us twice," she says. "Same as Yelt. They must teach it somewhere."`)}`,
        ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]};
      return {sp:'Orla', scene:'b10_c4_dusk', fx:()=>{ if (!S.f.b10_c4_veilGot) { S.f.b10_c4_veilGot = 1; gain('b10_c4_veil'); } }, again:()=>'Orla on her water-cart\'s shaft, the tap tied shut with a rag, her face wound in cloth.', txt: S.f.b10_c4_veilGot ?
`Orla is on the shaft of her water-cart with the cudgel across her knees and a strip of cloth round her face up to the eyes. "Still some," she says, through it. "I'll tell you when there isn't. You'll hear me."` :
`Orla's water-cart is at the end of the row with a wet sack over its barrel, and Orla on the shaft with a long strip of road-coloured cloth wound round her head and face, so only her eyes show. The cudgel is across her knees. Two of the train's carters drift past the cart, and look at the barrel, and look at the cudgel, and drift on.

"Sixth," she says, through the cloth. She unwinds a second strip from round her wrist and holds it out. "Dust veil. Round the head, over the mouth. You lot breathe the road all day and wonder why you're thirsty." She looks at the squad's cracked lips. "I'd give you water. I can give you that."${b104If('brennet', `\n\nShe nods at Brennet. "Your axle on the third wagon's squeaking again," she says. He looks pained.`)}`,
        ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]}; },

    /* Saffa, the field cook: the one line of the Third ('escort') */
    b10_c4_saffa:()=>({sp:'Saffa', scene:'b10_c4_dusk', fx:()=>{ S.f.b10_c4_saffa = 1; }, again:()=>'Saffa at her pot, which is less full every night.', txt:
`Saffa has the big pot on a fire of dung and wagon-scraps in a trench, and is stirring something that has met an onion once and has not been allowed to forget it. "Second bell," she says. "If there's a second bell."

She stirs. "${b104Rumour()}"

She taps the ladle on the rim. "Horse tomorrow, I expect," she says, not looking at the picket. "Somebody's. I'm not asking whose."${b104If('tirren', `\n\nTirren has gone very still. "Not the grey," she says. Saffa looks at her, and nods, once, as one professional to another.`)}`,
      ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]}),

    /* the tile-woman on a horse-blanket ('escort'; the reading's place) */
    b10_c4_tile:()=>({sp:'The tile-woman', scene:'b10_c4_dusk', again:()=>'The tile-woman on a horse-blanket by the wagons, her bone tiles in an oiled bag.', txt:
`The old tile-woman is sitting on a horse-blanket spread on the ground by a wagon, because the wagon she came out on ran out of horses and the one she is on now is running out too. She has the oiled bag on her knee and does not open it.

"Cold," she says, of the bag. "Been cold since the parting." She shakes it. It sounds the same as ever. "Tiles don't change. Something behind them has." She sniffs. "I'm not paid to know what."${b104If('perrit', `\n\nShe looks at Perrit. "You feel it too, cadre girl." Perrit does not answer. That is an answer.`)}`,
      ch:[b10ReadChoice(4),
          {t:'Back to the horse-lines.', go:()=>startExplore()}]}),

    /* the picket's far end: the foragers (on 'adjunct', the stragglers) */
    b10_c4_picket:()=>{ const adj = b104Adj();
      if (S.f.b10_c4_forDone) return {sp:'The picket\'s end', scene:'b10_c4_dusk', txt:
`${adj ? 'The picket\'s end is quiet. A soldier of the squad sits on the glass by the last peg, awake.' : 'The picket\'s end is quiet. The scrub past it is dark and empty, and a soldier of the squad sits on the last peg with a spear across the knees.'}`,
        ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]};
      if (!b104PhaseOne()) return {sp:'The picket\'s end', scene:'b10_c4_dusk', txt:
`The far end of the picket, where the last horses stand. ${adj ? 'Up the column, a few figures in the foreigners\' kit are sitting on the glass looking this way.' : 'Past it, scrub and stones and the light going. Something moved out there a moment ago. Or nothing did.'}`,
        ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]};
      return {sp:'The picket\'s end', scene:'b10_c4_dusk', txt: adj ?
`In the last of the light, figures are coming down the column's tail toward the Sixth's picket: five or six of the foreigners, walking quickly and not together, with empty skins on their shoulders and their faces set. They do not go to their own company's carts. They come for the horses.

A big one at their front has a cudgel and a corporal's knot.${b104If('tirren', `\n\nTirren is up, between them and the horses, with the hammer. "They want the water in them," she says. "That's what they're thinking. I can see it."`)}` :
`In the last of the light, the scrub past the picket's end gets up and walks. Men and women in rags the colour of the ground, a dozen or so, thin as the horses, with hooks and knives and a coil of rope. Not soldiers. No army's. A hungry country, come to the edge of the road to see what the road has.

They want a horse. The horses on the picket know it, and are pulling at their ropes.${b104If('tirren', `\n\nTirren is already at the picket with a hand on a halter. "Not the horses," she says. She does not say it to the squad.`)}${b104If('kaedra', `\n\nKaedra has an arrow on the string and is not drawing it. "They're starving," she says. "Look at them." She does not lower the bow either.`)}`,
        ch:[{t:adj ? '"Sixth. On the picket." Stand in front of the horses.' : '"Sixth. On the picket." Stand between them and the horses.', go:()=>startBattle('b10_c4_foragers', {})},
            {t:adj ? 'Go up the dark side of the column and be on their flank before the big one sees.' : 'Go out round the picket\'s end through the scrub and be among them before the ones with the rope see you.', check:['guile', 17],
              edges:id=>[id === 'kaedra' && ['she has crossed scrub at dusk all her life, on the border', 2], id === 'ruuk' && ['he walks ahead and waits, quietly, for a living', 1], id === 'pessa' && ['canal folk move at dusk without a lamp', 1], id === 'tobet' && ['he shot the holder\'s birds from cover for years', 1], id === 'tirren' && ['in the horse-lines, the calm one is the one nobody notices', 1], id === 'thegg' && ['there is no scrub big enough for him', -1], id === 'sorvan' && ['blue scale at dusk is a lantern', -1]],
              near:{t:()=>`Yes, but ${adj ? 'the glass is slick with the first of the night\'s cold' : 'the scrub is thorn, all of it'}, and ${b104Nm(b104Who())} ${b104V(b104Who(), 'come', 'comes')} out of it ${adj ? 'on one knee, hard' : 'bleeding from a dozen small places'}. ${b104Nmc(b104Who())}'ll carry that into the fight.`, fx:()=>bruise(b104Who(), bruiseN())},
              go:()=>startBattle('b10_c4_foragers', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c4_picket_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c4_picket_seen:()=>({sp:'The picket\'s end', scene:'b10_c4_dusk', txt:
`${b104Adj() ? 'The big one sees the squad coming against the last of the light, and says something short, and the others spread out on the glass.' : 'A low whistle comes out of the scrub, and the ones with the rope drop it, and the hooks come round.'}`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c4_foragers', {surprise:'e'})}]}),
    b10_c4_foragers_after:()=>{ const adj = b104Adj();
      return {sp:adj ? 'The picket\'s end' : 'In the scrub', scene:'b10_c4_dusk', fx:()=>{ if (!S.f.b10_c4_forDone) { S.f.b10_c4_forDone = 1; gain('b10_c4_horsebow'); } }, txt: adj ?
`The ones who could walk have walked, back up the darkening column toward their own company, with their skins as empty as they came. The big corporal is sitting on the glass with his head in his hands, and stays down. His own sergeant comes down the tail for him after a while, and looks at the Letherii, and at the horses, and says two words too low to carry, and hauls him up by the collar and takes him back to his company.

One of them dropped a short horse-bow by the picket, horn and sinew, of the plains people who crossed with the foreigners. Its horse died somewhere up the column. It goes in the kit.${b104If('tirren', `\n\nTirren goes down the picket with her hand flat on each neck. "All here," she says. "They're frightened. Not hurt." She stays with them a while.`)}` :
`The ones who could run have gone back into the scrub, without the grey and without the rope. The grey-bearded one with the headman's beads is down at the picket's end, and does not get up, and after a while two of the others come back for him, slowly, with their hands open where the squad can see them, and the squad lets them, and they carry him off into the dark.

Nobody says anything about it for a while. ${b104Say({kaedra:'Then Kaedra says, "That was somebody\'s father," and nobody answers, because it was.', ammet:'Then Ammet says, "He was too thin to fight," and goes to see to the squad\'s cuts, because those she can do something about.', _:'Then somebody says the horses are all there, and that is true, and it helps a little.'})}

In the scrub there is a short horse-bow of Bolkando make, horn and sinew, that one of them had taken off a dead outrider's saddle somewhere on the road. It goes in the kit.${b104If('tirren', `\n\nTirren leads the grey back to the picket herself, talking to her. "Ash," she says. "Her name's Ash." She ties her in at the end, and stands with her a while.`)}`,
        ch:[{t:'Back to the horse-lines.', go:()=>startExplore()}]}; },

    /* ======== the fire: by phase. 1 dusk, 3 the key's night. The games pass wraps this node: keep the id ======== */
    b10_c4_fire:()=>{ const ph = b104Ph(), adj = b104Adj(), rk = ph >= 3 ? 'b10_c4_rest3' : 'b10_c4_rest1', beatOpen = ph >= 3 && !b10BeatOf(4) && b104WorkDone();
      const sc = ph >= 3 ? b104Scene3() : 'b10_c4_dusk';
      if (ph === 2) return {sp:'The squad', scene:b104Scene2(), txt:`There is no fire while the column ${adj ? 'walks' : 'is on the road'}.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:adj ? 'The Sixth\'s circle' : 'The squad\'s fire', scene:sc, html:witnessHTML(),
        again:()=> ph >= 3 ? (adj ? 'The Sixth\'s circle on the glass, no fire, the horses close.' : 'The squad\'s fire at the horse-lines, small, the picket quiet behind it.') : (adj ? 'The Sixth\'s circle at the tail, no fire, the horses on their picket.' : 'The squad\'s fire at the horse-lines, a pot on it with not much in the pot.'), txt:
`${ph === 1 ? (adj ? `There is no fire. There is nothing on the glass to burn. The Sixth sits in a circle at the column's tail with its carts behind it and its horses on their picket, while the heat goes out of the ground and the column under its cloaks begins, here and there, to stir.` : `The squad's fire is a few sticks of scrub and some dried dung in a ring of stones, with a pot on it that nobody is in a hurry to eat. Along the road the train's other fires come up one by one. To the north, where the glass is, there is no light at all.`)
  : adj ? `The halt, somewhere past midnight, the column sitting down where it stood. There is no fire. The Sixth sits in its circle with the horses close, closer than they have been, because ${b104Horses() ? 'the squad walked in with them and will not leave them now' : 'there are fewer of them, and the squad has stopped pretending not to look'}.`
  : b104Horses() ? `The tail of the column, long after dark. The brigades' fires are a long line going away south, and the nearest is a long way off. The Sixth has a fire of its own at the horse-lines, small, with the train's horses on the picket behind it, every one of them that started the day.` : `The edge of the Bolkando's camp, long after dark. The Sixth made it, with the train, and has a fire at the horse-lines. There is more room on the picket than there was this morning.`}${b104If('tirren', ph >= 3 ? `\n\nTirren sits a little back from the fire where she can see the picket, with the lamp beside her.` : '')}${ph >= 3 && S.f.b10_c4_thirst && !['none', 'waived'].includes(S.f.b10_c4_thirst) && b10In(S.f.b10_c4_thirst) ? `\n\n${NAME(S.f.b10_c4_thirst)} has the thirst: split lips, and a mouthful from the skin that does nothing. The horses had the rest.` : ''}`,
        ch:[...(ph === 1 ? [b10ReadChoice(4)] : []),
            ...(beatOpen ? [{t:'"What did Lether send us out here for?" Ask it, at the fire.', go:'b10_c4_beat'}] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(ph >= 3 ? (adj ? 'The squad sits an hour in its circle on the glass with the horses close. A mouthful each, and a mouthful saved. Wounds close, mostly.' : 'The squad sits an hour by the fire at the horse-lines. A mouthful each, and a mouthful saved. Wounds close, mostly.') : 'The squad sits an hour at the horse-lines while the light goes. Wounds close, mostly.'); }, go:'b10_c4_fire_rest'},
            {t:'Talk with the squad.', go:'b10_c4_fire_talk'},
            {t:adj ? 'Full dark. The march.' : 'First light. The road south.', req:()=>ph === 1 && !!S.f.b10_c4_forDone, onward:true, go:'b10_c4_dawn'},
            {t:adj ? 'On. The column is getting up.' : 'First light. On south.', req:()=>ph >= 3 && b104NightDone(), onward:true, go:'b10_c4_onroad'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c4_fire_rest:()=>({sp:'The squad\'s fire', scene:b104Ph() >= 3 ? b104Scene3() : 'b10_c4_dusk', txt:
`${b104Ph() >= 3 ? (b104Adj() ? 'An hour, then, on the glass, sitting close for the warmth, with the horses\' breath going up white in the starlight.' : 'An hour, then, at the horse-lines, with the picket shifting behind the fire and the dark all round.') : 'An hour, then, while the light goes, with the horses shifting on the picket and the dust settling.'}

${b104Say({ammet:'Ammet goes round the squad with the needle and the herbs, and says "still" to each of them, and each of them is.', tirren:'Tirren does the squad\'s feet, one pair after another, the way she does the horses\', and says the same things to both.', perrit:'Perrit sits with her eyes shut and her hand on the tile-pouch, reaching for the Holds. "Far," she says, after a while. "And cold."', _:'Some of them sleep. The rest watch the horses.'})}`,
      ch:[{t:'Back to the fire.', go:'b10_c4_fire'}]}),
    b10_c4_fire_talk:()=>{ const ph = b104Ph(), g = b104Adj(), ln = [];
      Object.keys(B104TALK).forEach(id => { if (b10In(id)) ln.push(ph >= 3 ? B104TALK[id][1](g) : B104TALK[id][0](g)); });
      return {sp:'The squad\'s fire', scene:ph >= 3 ? b104Scene3() : 'b10_c4_dusk', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b10_c4_fire'}]}; },

    /* the way on from the first dusk: the road south by day ('escort'), or the night march ('adjunct') */
    b10_c4_dawn:()=>({sp:b104Adj() ? 'The march' : 'The road south', scene:'b10_c4_dusk', txt: b104Adj() ?
`Up the column the foreigners' sergeants are calling the step, low, and the column is getting up off the glass in its files and going east into the dark. The Sixth unpegs its picket and takes its horses on lead-reins, and the carts creak, and the tail goes after the column.` :
`The train will march at first light behind the brigades, and the brigades behind the Bolkando, and the Bolkando behind the Grey Helms' dust. The horses are on their feet on the picket. All of them, tonight.`,
      ch:[{t:b104Adj() ? 'East, behind the column.' : 'First light. South.', onward:true, fx:()=>{ S.f.b10_c4_ph = 2; }, go:()=>{ if (b104Adj()) { startExplore('b10_c4_march'); talk('b10_c4_march_arrive'); } else { startExplore('b10_c4_road'); talk('b10_c4_road_arrive'); } }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 2 ('escort'): the road south by day ======== */
    b10_c4_road_arrive:()=>({sp:'The road south', scene:'b10_south', fx:()=>{ S.f.b10_c4_onRoad = 1; }, again:()=>'The column on the road south, the horses\' heads down in the traces.', txt:
`South, then, through the morning and into the heat, at the pace of the slowest horse in the train, which is slower than yesterday's. The road is a line of trodden grit going away through dry country with scrub on it and stones, and white bones here and there off to the sides where the column ahead of the column ahead has left something.

Far ahead, the Grey Helms' dust, very straight. Behind it, the Bolkando's, trying to keep up. Behind that, the brigades. The train last. The Sixth at the train's rear.${b104If('kaedra', `\n\nKaedra has dropped back to the very end of the train and is walking backwards, looking north up the road. "There's somebody on the road behind us," she says. "Walking."`)}${b104If('tirren', `\n\nTirren walks at the horse-lines with her hand on a neck. She does not look at the road. She looks at their feet.`)}`,
      ch:[{t:'The column.', go:()=>startExplore()}]}),
    /* the column's rear: the three strangers, seen far off and taken in by somebody else (never met, never named) */
    b10_c4_rear:()=>({sp:'The column\'s rear', scene:'b10_south', fx:()=>{ S.f.b10_c4_strangers = 1; }, again:()=>'The road north, behind the train, empty now.', txt: S.f.b10_c4_strangers ?
`The road north, behind the train, is empty again. The dust of the two riders going back up the column has settled.` :
`Back up the road, where the column's dust is thinnest, three figures are walking south out of the north-west, out of nowhere, across country that has no road on it.

They are a long way off. Even from here you can see they are burned: red as brick, the three of them, the way only somebody who has never been under this sun burns. They walk like people who have been walking a long time and did not expect to be. One of them is waving.

The Sixth does not go. Before it has to decide, two riders come back down the column from the staff's wagons at a trot, and reach them, and there is talking, and the three go up the column with the riders, slowly, and are lost in the dust round the staff's wagons. The Sixth does not see them again.${b104Say({kaedra:'\n\nKaedra watches them go. "No kit," she says. "No water. No road." She shakes her head. "Wherever they came from, it wasn\'t here."', ruuk:'\n\nRuuk watches them go with deep interest. "My grandmother would have had questions," he says. "I have the same questions. They will not be answered."', tobet:'\n\nTobet counts them. "Three," he says. Then, after a while: "Where from?" No answer comes.', _:'\n\nOne of the squad says they looked like sailors. Why, is not clear.'})}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    /* the wash off the road: dogs at the carcasses (optional, 'escort') */
    b10_c4_wash:()=>{ if (S.f.b10_c4_dogsDone || S.f.b10_c4_dogsLeft) return {sp:'The wash', scene:'b10_south', txt:
`The dry wash off the road, white stones and old bones. ${S.f.b10_c4_dogsDone ? 'Nothing is in it now but the flies.' : 'The dogs are still at the carcasses. The squad leaves them to it.'}`, ch:[{t:'Back to the column.', go:()=>startExplore()}]};
      return {sp:'The wash', scene:'b10_south', txt:
`West of the road a dry wash runs alongside it, white stones in a bed that has not seen water in a long time. The column has been leaving its dead horses in it since the parting, because it is there. Four dogs are at them: lean, grey-brown, more wolf than dog, followed the column from somewhere for exactly this.

They watch the train's horses go by. The horses on the near side of the road are pulling sideways in the traces.${b104If('tirren', `\n\nTirren has a hand on the nearest halter. "If they follow us tonight, we'll lose the picket," she says.`)}`,
        ch:[{t:'Put them off the carcasses.', go:()=>startBattle('b10_c4_dogs', {})},
            {t:'Leave them to it. It\'s only meat now.', fx:()=>{ S.f.b10_c4_dogsLeft = 1; }, go:'b10_c4_dogs_left'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c4_dogs_left:()=>({sp:'The wash', scene:'b10_south', txt:
`The train goes on by. The dogs stay with the carcasses, which is what dogs do, and the horses on the near side stop pulling once the wash is behind them. It is only meat now. Everybody says so.`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    b10_c4_dogs_after:()=>({sp:'The wash', scene:'b10_south', fx:()=>{ S.f.b10_c4_dogsDone = 1; }, txt:
`The dogs go off down the wash, low and quick, the ones that can, and do not come back while the column is passing. The horses on the near side stop pulling.${b104Say({tirren:'\n\nTirren goes down the wash and stands by the carcasses a while, looking at the brands. She takes the chalk out and makes a mark on the inside of her apron, low down, for each one she knows.', sorvan:'\n\nSorvan stands over the carcasses a while. "Bluerose burned theirs," he says. There is nothing out here to burn.', _:''})}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),

    /* ======== phase 2 ('adjunct'): the night march ======== */
    b10_c4_march_arrive:()=>({sp:'The night march', scene:'b10_glass_night', fx:()=>{ S.f.b10_c4_onRoad = 1; }, again:()=>'The column\'s tail on the glass at night, the horses on lead-reins.', txt:
`East through the dark. The column goes ahead without a lamp, a long dark shape against the stars that are left at the bottom of the sky, and the stars underfoot go with it. The Sixth's horses walk on lead-reins behind the carts with their heads low and their feet finding the glass carefully, the way old men walk on ice.

The tail is slower than the column. Not much. Enough. Every hour the dark shape ahead is a little further off.${b104If('tirren', `\n\nTirren walks at the head of the horses with her hand on the first one's neck. "Their feet are going," she says. "The glass is a file. I can't keep up with it."`)}`,
      ch:[{t:'The tail.', go:()=>startExplore()}]}),

    /* the lookout: keep the column ahead in sight (the chapter's one Witness "yes, but") */
    b10_c4_look:()=>{ const adj = b104Adj();
      if (S.f.b10_c4_lookDone) return {sp:adj ? 'The column\'s tail' : 'The east side of the road', scene:b104Scene2(), txt:
`${adj ? 'The column is a dark shape ahead, against the stars at the bottom of the sky.' : 'Ahead, the Bolkando\'s dust, and far ahead of it the Grey Helms\', very straight, very small.'} ${S.f.b10_c4_lookDone === 'seen' ? 'Still in sight.' : 'Further off than it was.'}`,
        ch:[{t:'Back to the column.', go:()=>startExplore()}]};
      return {sp:adj ? 'The column\'s tail' : 'The east side of the road', scene:b104Scene2(), html:witnessHTML(), txt: adj ?
`From the east side of the tail you can see the column ahead: a long dark shape walking against the stars at the bottom of the sky, and getting smaller. Not fast. A little, every hour. The foreigners do not look back. They have not looked back since the parting.

If the tail loses the column in the dark, it loses the water, and the halt, and the way.${b104If('ruuk', `\n\nRuuk is walking ahead of the carts with his head up. "I can see them," he says. "I can still see them."`)}` :
`From the east side of the road you can see the whole of the column ahead in the noon glare: the brigades, then a gap, then the Bolkando's dust, then a longer gap, then the Grey Helms', very straight, going away. The gaps are wider than they were this morning.

The Bolkando are pulling away from the brigades. If the train loses sight of them in the heat, it loses the road.${b104If('kaedra', `\n\nKaedra has a hand up to shade her eyes. "They're not waiting," she says. "The grey knights. They've never waited."`)}`,
        ch:[{t:adj ? 'Keep the column in sight, every hour, whatever the horses are doing.' : 'Keep the Bolkando\'s tail in sight through the glare, so the train does not lose the road.', check:['wits', 17], req:()=>!S.f.b10_c4_lookTried, fx:()=>{ S.f.b10_c4_lookTried = 1; },
              edges:id=>[id === 'kaedra' && ['a scout keeps the column in sight; that is the work', 2], id === 'tobet' && ['he watched the holder\'s birds out of sight for years', 2], id === 'ruuk' && ['he walks ahead and looks, for a living', 1], id === 'sorvan' && ['a Bluerose outrider rides by the dust of the main body', 1], id === 'perrit' && ['she has her eyes on a page more than on a road', -1], id === 'pessa' && ['she looks at the ground; it is the flattest thing out here', -1]],
              near:{t:()=> adj ? `Yes, but by grey light the column is a smudge ahead, going away, and ${b104Nm(b104Who())} ${b104V(b104Who(), 'say', 'says')} what everybody is thinking: they are not slowing for anybody. Witness −1.` : `Yes, but by the time ${b104Nm(b104Who())} ${b104V(b104Who(), 'have', 'has')} the Bolkando's tail, the Grey Helms' dust is a smudge, going away, and somebody says what everybody is thinking: nobody up there is waiting for Lether. Witness −1.`, fx:()=>b10Witness(-1, adj ? 'the column did not wait' : 'nobody waited for Lether')},
              go:'b10_c4_look_ok', fail:'b10_c4_look_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c4_look_ok:()=>({sp:b104Adj() ? 'The column\'s tail' : 'The east side of the road', scene:b104Scene2(), fx:()=>{ b104Looked('seen'); }, txt: b104Adj() ?
`${by({sgt:'You keep', ruuk:'Ruuk keeps', kaedra:'Kaedra keeps', tobet:'Tobet keeps', _:'{who} keeps'})} the column in sight, hour by hour, calling it back to the tail: "There. Left a little. There." The dark shape stays a dark shape. It does not get closer. It does not get further off.` :
`${by({sgt:'You keep', kaedra:'Kaedra keeps', tobet:'Tobet keeps', _:'{who} keeps'})} the Bolkando's tail in sight through the glare, calling it back to the train: "There. South a little. There." The train holds the road. The Grey Helms' dust goes on getting smaller, because it always does.`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    b10_c4_look_no:()=>({sp:b104Adj() ? 'The column\'s tail' : 'The east side of the road', scene:b104Scene2(), fx:()=>{ b104Looked('lost'); }, txt: b104Adj() ?
`The column goes into a fold of dark where the stars thin out, and the tail loses it, and for a long, quiet while the Sixth walks east on nothing but faith and the feel of the glass. Then a foreign voice ahead, low, calling the step. Found. Further off than it was.` :
`The glare takes the Bolkando's tail and gives it back and takes it again, and for a while the train is following its own idea of the road. Then the Bolkando's dust, off to the east, further than it should be. The train turns toward it. Found. Further off than it was.`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),

    /* the key's two roads */
    b10_c4_key_horses:()=>({sp:B5_FINADD.name, scene:b104Scene2(), txt:
`Ennic nods, and writes it on the slate, and does not rub it out. "The horses, then," he says. "I will tell ${b104Adj() ? 'the foreigners\' sergeant the tail will come in when it comes in' : 'the Bolkando the Sixth has the rearguard, which is true, and that the rearguard is slow, which is also true'}."

${b104Adj() ? 'The column goes on ahead into the dark. The Sixth slows to the pace of its slowest horse, and lets it go.' : 'The train goes on ahead after the Bolkando. The Sixth and the horses slow to the pace of the slowest of them, and let it go.'}${b104If('tirren', `\n\nTirren does not say anything. She goes to the head of the horses and puts her hand on the first neck, and they come with her.`)}${b104If('thegg', `\n\nThegg falls in at the very back, between the horses and whatever is behind. "Last of the last," he says. "Somebody should be."`)}`,
      ch:[{t:'At their pace.', go:()=>{ startExplore('b10_c4_night'); talk('b10_c4_night_arrive'); }}]}),
    b10_c4_key_pace:()=>({sp:B5_FINADD.name, scene:b104Scene2(), txt:
`Ennic nods, and writes it on the slate. "The pace, then," he says. "I will tell ${b104Adj() ? 'the foreigners\' sergeant the tail will keep up' : 'the Bolkando the brigades will keep up'}. I would like it written that I said the horses would not."

The Sixth gets behind the horses, and drives them.${b104If('tirren', `\n\nTirren does not look at you. She goes to the head of the horses and puts her hand on the first neck, and talks to it low, and when the driving starts she keeps talking. It is not to the squad.`)}${b104If('thegg', `\n\nThegg puts his shoulder to the back of the last cart. "Then we keep up," he says, simply, and they do.`)}`,
      ch:[{t:'Keep up.', go:()=>{ startExplore('b10_c4_night'); talk('b10_c4_night_arrive'); }}]}),
    /* the way on from phase 2, before the key: shut */
    b10_c4_onkey:()=>({sp:b104Adj() ? 'The column ahead' : 'The road south', scene:b104Scene2(), txt:
`${b104Adj() ? 'The column ahead.' : 'The road on south.'} ${b104KeyReady() ? 'The Finadd has the column\'s word first.' : 'The column has not finished with the Sixth yet.'}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),

    /* ======== phase 3: the key's evening (on 'adjunct' the halt before grey light) ======== */
    b10_c4_night_arrive:()=>({sp:b104Adj() ? 'The halt' : 'The horse-lines', scene:b104Scene3(), fx:()=>{ S.f.b10_c4_nightIn = 1; }, again:()=>'The horse-lines at the halt in the dark.', txt:
`${b104Horses() ?
(b104Adj() ? `The Sixth comes in to the halt long after the column has sat down on the glass, with every horse it had. Up the column, not a head turns. A foreign sergeant comes down the tail, counts the horses, counts the squad, and goes back without a word. From the foreigners, that is praise.` :
`The Sixth comes in to the column's tail long after dark, on a road gone black, with the train's horses walking behind it at their own pace, every one of them that started the day. The brigades' fires are a long line going away south, and the nearest is a long way off. Out here at the tail there is the Sixth, and the horses, and the dark.

The horses are on their feet. They are also very thirsty, and so is the squad, and there is one water barrel on the last cart.`) :
(b104Adj() ? `The Sixth comes in to the halt with the column, which is something. It did not come in with all its horses. Two lie on the glass somewhere back along the march where they went down, with their loads taken off them, and nobody went back.` :
`The Sixth makes the Bolkando's camp by dark, with the train, as the Bolkando wanted. Not with all of it. Three of the train's horses lie by the road somewhere back along the day where they went down in the traces, with their loads put on the next, and nobody went back.

The Bolkando officer who asked the brigades to keep up rides by the Sixth's horse-lines at dusk, and looks at the picket, and nods, very correct, and rides on.`)}${b104If('tirren', b104Horses() ? `\n\nTirren goes down the picket in the dark with her hand flat on each neck. "All of them," she says. "All of them." She says it twice, Yelt's way.` : `\n\nTirren goes down the picket in the dark with her hand flat on each neck, and stops at the gaps, and stands in each one a while.`)}`,
      ch:[{t:'The horse-lines.', go:()=>startExplore()}]}),
    /* the horse-lines in the dark: the key's work ('horses': the walk in and the water; 'pace': the ones that are left) */
    b10_c4_horselines:()=>{ const done = b104WorkDone(), h = b104Horses();
      if (done) return {sp:'The horse-lines', scene:b104Scene3(), txt: h ?
`The horses are on the picket, every one, heads low, ${S.f.b10_c4_walked === 'all' ? 'drinking the last of the water from a bucket going down the line' : 'standing, which is what is left to them tonight'}. ${b104If('tirren', 'Tirren is with them. Of course she is.') || 'A soldier of the squad is with them.'}` :
`The picket, with gaps in it. The horses that are left are standing very still, the way horses stand when they have stopped expecting anything.${b104If('tirren', ' Tirren is with them, doing feet, in the dark, by feel.')}`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      if (h) return {sp:'The horse-lines', scene:b104Scene3(), html:witnessHTML(), txt:
`The horses are on the picket, every one, and every one of them is looking at the last water barrel on the last cart.

A horse drinks what a soldier drinks in a day at one go. There is one barrel. There is the squad, and there are the horses, and there is the march tomorrow.${b104If('tirren', `\n\n"Them first," Tirren says. "Half a bucket each, and walk them after so it stays down. They carried it. It's theirs."`)}${b104If('ammet', `\n\nAmmet looks at the squad's lips, and at the barrel, and says nothing at all, which from Ammet is a great deal.`)}`,
        ch:[{t:'The horses first. A half-bucket each down the line, and walk each one after, the farrier\'s way, so it stays down.', check:['wits', 17], witness:true, req:()=>!S.f.b10_c4_walkTried, fx:()=>{ S.f.b10_c4_walkTried = 1; },
              edges:id=>[S.f.b10_c4_farrierOk && trickBy('b10_c4_farrier') === id && ['the farrier\'s hand: the squad learned it at the picket', 2], id === 'tirren' && ['the horses know her voice before they know their thirst', 2], id === 'sorvan' && ['a Bluerose lancer waters his horse before himself; that is the first thing they teach', 2], id === 'brennet' && ['he has watered a team on a bad road', 1], id === 'thegg' && ['he is patient, and the horses lean on him', 1], id === 'ilsa' && ['a clerk does not know which end drinks', -1], id === 'perrit' && ['she counts the water, and cannot stop counting it', -1]],
              near:{t:()=>`Yes, but a big bay smells the bucket and comes through the line for it, and ${b104Nm(b104Who())} ${b104V(b104Who(), 'are', 'is')} in the way, and ${b104V(b104Who(), 'get', 'gets')} a hoof on the foot for it. ${b104Nmc(b104Who())}'ll walk on that tomorrow.`, fx:()=>bruise(b104Who(), bruiseN())},
              go:'b10_c4_horselines_ok', fail:'b10_c4_horselines_no'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The horse-lines', scene:b104Scene3(), html:witnessHTML(), txt:
`The horses that are left are on the picket. There are gaps in it, and every horse has the load of the one that is not there, and every horse is standing with its legs spread and its head down, the way a horse stands when it is deciding.

If they are not up and walking at first light, ${b104Adj() ? 'the tail will not keep up with the column' : 'the train will not keep up with the Bolkando'}, and today was for nothing.${b104If('tirren', `\n\nTirren is at the picket. She does not ask for help. She does not need to.`)}${b104If('thegg', `\n\nThegg puts his shoulder against the nearest horse, which leans on him. "Keep up," he says, quietly. "We said we would."`)}`,
        ch:[{t:'Go down the picket in the dark and get every horse that is left on its feet and eating, so they will go at first light.', check:['might', 17], req:()=>!S.f.b10_c4_keptTried, fx:()=>{ S.f.b10_c4_keptTried = 1; },
              edges:id=>[S.f.b10_c4_farrierOk && trickBy('b10_c4_farrier') === id && ['the farrier\'s hand: the squad learned it at the picket', 2], id === 'thegg' && ['he is heavier than most horses, and they lean on him', 2], id === 'tirren' && ['she will not leave one of them, whatever she thinks of the day', 1], id === 'sorvan' && ['a Bluerose lancer has kept a horse on its feet all night', 1], id === 'brennet' && ['he has kept a team going on a bad road', 1], id === 'perrit' && ['she is built for sums, not horses', -1], id === 'ilsa' && ['a clerk holds paper', -1]],
              near:{t:()=>`Yes, but it takes all night, and ${b104Nm(b104Who())} ${b104V(b104Who(), 'go', 'goes')} into the march at first light without having slept, with the gaps in the picket in ${b104V(b104Who(), 'your', 'their')} eyes: rattled.`, fx:()=>b104Rattle(b104Who())},
              go:'b10_c4_horselines_kept', fail:'b10_c4_horselines_late'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c4_horselines_ok:()=>({sp:'The horse-lines', scene:b104Scene3(), fx:()=>{ b104Walked('all'); }, txt:
`Down the line with the bucket, half to each, and a hand on the neck while it drinks, and then a slow turn up and down the picket so it stays down. ${by({sgt:'You do', tirren:'Tirren does', sorvan:'Sorvan does', thegg:'Thegg does', _:'{who} does'})} the first, and then the squad does the rest the same way, every horse, in the dark, without hurry.

When it is done the barrel is nearly empty and every horse on the picket has its head up, which none of them had at dusk.

What is left in the barrel goes round the squad. It is not much. ${b104ThirstLine()}${b104If('tirren', `\n\nTirren rubs half of a chalk mark off the inside of her apron with her thumb. "Nearly," she says. "Nearly one."`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c4_horselines_no:()=>({sp:'The horse-lines', scene:b104Scene3(), fx:()=>{ b104Walked('most'); }, txt:
`It goes wrong halfway down the line, where two horses get at the same bucket and it goes over on the ground and into the dust, and that is a bucket nobody gets. The rest of the line is done slower, with the squad holding heads, in the dark, until every horse has had something.

Every horse has had something. Not the half-bucket. Something. They are on their feet, every one.

What is left in the barrel goes round the squad. It is not much. ${b104ThirstLine()}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c4_horselines_kept:()=>({sp:'The horse-lines', scene:b104Scene3(), fx:()=>{ b104Kept('kept'); }, txt:
`Down the picket in the dark, horse by horse: a hand on the neck, the feet looked at by feel, the nosebag held up until it is eaten, a shoulder against the ones that sway. ${by({sgt:'You do', thegg:'Thegg does', tirren:'Tirren does', _:'{who} does'})} the hard ones.

By grey light every horse that is left is on its feet and has eaten something. They will go. ${b104Adj() ? 'The tail will keep up with the column.' : 'The train will keep up with the Bolkando.'} That is what the day was for.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c4_horselines_late:()=>({sp:'The horse-lines', scene:b104Scene3(), fx:()=>{ b104Kept('late'); }, txt:
`One of them lies down in the night and will not get up for anybody, and by the time the squad has given up on it there is not much night left for the others.

At grey light the rest are on their feet. They will go. Not all of them will go far.${b104If('tirren', '\n\nTirren sits by the one that lay down until the column is moving. Then she gets up and comes.')}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* the picket's far end in the dark: thieves ('horses' only) */
    b10_c4_thieves:()=>{ const h = b104Horses();
      if (!h) return {sp:'The picket\'s end', scene:b104Scene3(), txt:
`${b104Adj() ? 'The picket\'s end, on the glass. The column is all round, sitting where it halted. Tonight the tail is left alone.' : 'The picket\'s end, at the edge of the Bolkando\'s camp. Bolkando sentries walk past it every little while, with lamps. The dark stays empty.'}`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      if (S.f.b10_c4_nightDone) return {sp:'The picket\'s end', scene:b104Scene3(), txt:
`The picket's end is quiet. A soldier of the squad sits on the last peg, awake, and will be till grey light.`, ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      if (!b104WorkDone()) return {sp:'The picket\'s end', scene:b104Scene3(), txt:
`The picket's far end, in the dark. ${b104Adj() ? 'The glass goes away pale under the stars.' : 'Past it, the dark, and the scrub, and nothing to see.'} The horses first.`, ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      return {sp:'The picket\'s end', scene:b104Scene3(), txt:
`${b104Adj() ? 'Down the halted column in the dark, three shapes are coming toward the picket, low and quiet, not together.' : 'Out past the picket\'s end, in the dark where the column\'s fires do not reach, something is moving. Three shapes, low and quiet, coming in toward the ropes.'} One has a knife out. Not for the squad. For the ropes.${b104If('tirren', `\n\nTirren is on her feet with the hammer. "They're at the end," she says. "The grey's at the end."`)}`,
        ch:[{t:'Put them off the picket.', go:()=>startBattle('b10_c4_night', {})},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c4_thieves_after:()=>({sp:'The picket\'s end', scene:b104Scene3(), fx:()=>{ S.f.b10_c4_nightDone = 1; }, txt: b104Adj() ?
`They go back up the dark column the way they came, the ones that can, and the one that cannot is carried back to his company by the other two, and stays down when they put him there. Up the column, in the morning, not a word is said about it.${b104If('tirren', `\n\nTirren cuts a new peg for the end of the picket and drives it into a crack in the glass with the hammer, and ties the grey in shorter.`)}` :
`They go back into the dark the way they came, the ones that can, and the one that cannot is helped away by the other two, slowly, and the squad lets them go. The squad does not follow. There is nowhere out there to follow them to.

The horses on the picket stop pulling at their ropes. After a while some of them lie down, which tonight is a good sign.${b104If('tirren', `\n\nTirren ties the grey in shorter at the picket's end, and sits by her a while. "This is what falling behind costs," she says. "It's not the water. It's being the last ones on the road." She does not say it was the wrong choice.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* ======== the Witness beat: the train's fire, Yelt's ledger shut, a horse lost that day ======== */
    b10_c4_beat:()=>({sp:b104Adj() ? 'The Sixth\'s circle' : 'The squad\'s fire', scene:b104Scene3(), html:witnessHTML(), txt:
`${b104Adj() ? 'Ennic has shut his slate. There is no fire, and no Yelt; the Sixth\'s own book is two carts and what is chalked on them. Somewhere back along the march a horse lies on the glass.' : 'Yelt has shut the ledger and gone to sleep sitting up on the water wagon with both hands flat on the cover. Somewhere back along the road today a horse lies in the dust.'} The fire is small, and stays small.

${b104Say({ilsa:'Ilsa has her little book shut on her knee. "I have been writing down the horses," she says. "And then I thought: I should write down what we are for. So the list makes sense, later." She looks at you. "What did Lether send us out here for, Sergeant?"', perrit:'Perrit has her hand on the tile-pouch and is not reaching. "The tiles do not answer that one," she says. "They never did. I used to think they would." She looks at you. "What did Lether send us out here for?"', tobet:'Tobet is turning the tally-stick over. "Sergeant," he says, half a step behind, the way he says everything. "What did Lether send us out here for?"', _:'Somebody in the squad looks at you across the fire. "What did Lether send us out here for, Sergeant?"'})}`,
      ch:[{t:'"Each other. That\'s what it sent. Look round."', fx:()=>{ b10Beat('kept', 'each other'); S.f.b10_c4_beat = 'each'; }, go:'b10_c4_beat_done'},
          {t:'"The Commander. He asked, and he\'s out here too."', fx:()=>{ b10Beat('kept', 'the Commander'); S.f.b10_c4_beat = 'commander'; }, go:'b10_c4_beat_done'},
          {t:'"Nothing anyone will remember."', fx:()=>{ b10Beat('doubt', 'nothing anyone will remember'); S.f.b10_c4_beat = 'nothing'; }, go:'b10_c4_beat_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c4_beat_done:()=>{ const w = S.f.b10_c4_beat;
      return {sp:b104Adj() ? 'The Sixth\'s circle' : 'The squad\'s fire', scene:b104Scene3(), html:witnessHTML(), txt:
`${w === 'each' ? b104Say({tirren:'Tirren is looking at the squad round the fire, one face after another, the way she looks down a picket. "Each other," she says. "And the horses," she adds, and nobody argues.', tobet:'Tobet looks round the fire, slowly, the way he counts. "Each other," he says. He does not count out loud. He does not need to.', thegg:'Thegg nods, once, slowly. "Each other," he says. "My mother would have said that is what a road is for." He thinks. "She would also have said eat the horses."', _:'The squad looks round the fire at itself, and moves a little closer. That is the answer.'})
  : w === 'commander' ? b104Say({thegg:'Thegg nods. "He is out here too," he says. "On the same road. Walking." That seems to settle it for Thegg.', ilsa:'Ilsa nods slowly. "He walks the same road," she says. "I have read a great many orders from men who did not." She writes something in the little book.', sorvan:'Sorvan nods. "He rides at the front," he says. "Bluerose follow the one at the front."', _:'Somebody says "the Commander" back, quietly, testing whether it will hold weight. It does, tonight.'})
  : b104Say({pessa:'Pessa laughs, short. "Nothing," she says. "Good. I know where I am with nothing." She lies back. She laughs alone.', tobet:'Tobet nods. "Nothing," he says. He does not sound sure. He looks at the tally-stick anyway.', perrit:'Perrit nods, and does not reach for the tiles. "Nothing anyone will remember," she says. "That is what they said, the last time I asked them." She is quiet. "I did not want to believe them either."', _:'A laugh at the fire, short, at a thing that is not funny.'})}${b104If('tirren', w !== 'nothing' ? '' : `\n\nTirren is looking at the horse-lines. "The horses will remember," she says. "For a while. Horses remember who fed them." It is not much. She says it anyway.`)}

${b104Adj() ? 'Up the column, the stars at the bottom of the sky are going pale. Grey light soon.' : 'The fire goes down. Along the road to the south, the brigades\' fires go out one by one.'}`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]}; },

    /* the way on from the night: the end */
    b10_c4_onroad:()=>{ const ready = b104NightDone();
      return {sp:b104Adj() ? 'The glass' : 'The road south', scene:b104Scene3(), txt: ready ?
(b104Adj() ? `Up the column the step is being called, low, and the foreigners are getting up off the glass in their files. Grey light is coming up behind the column. The Sixth unpegs the picket.` : `South of the horse-lines the road goes on into the dark, toward first light and the Bolkando and the Grey Helms' dust. The train will march at dawn.`) :
`${b104WorkDone() ? 'The picket\'s end first. There is something out there.' : 'The horses first.'}`,
        ch: ready ? [{t:b104Adj() ? 'On, east, behind the column.' : 'First light. On south.', onward:true, go:'b10_c4_onward'}, {t:'Not now.', go:()=>startExplore()}] :
          [{t:'Back to the fire.', go:()=>startExplore()}]}; },

    /* ======== the end ======== */
    b10_c4_onward:()=>({sp:b104Adj() ? 'The crossing' : 'The long way round', scene:b104Adj() ? 'b10_glass_night' : 'b10_south', html:witnessHTML(), txt: b104Adj() ?
`The column goes on east into the grey light, and the Sixth walks at its tail with its carts and ${b104Horses() ? 'every horse it has, on lead-reins, at their own pace, a little behind' : 'the horses that are left, keeping up'}. Up the column, not one head turns to see if the tail is still there. It is.

The glass goes on. The stars go out above and below at the same moment, and then the glare comes up off the ground, and the column lies up under its cloaks, and the Sixth counts its water, twice.${b104If('tirren', `\n\nTirren walks at the head of the horses with her hand on the first one's neck. She has not said which one she means to bring home. ${b104Horses() ? 'She talks to all of them the same.' : 'There are fewer to choose from.'}`)}${b104Say({perrit:'\n\nPerrit walks with her hand on the tile-pouch. "Quiet," she says, once. "Very quiet." She does not say what.', tobet:'\n\nTobet walks half a step behind, as always, and looks back west now and then, where there is nothing to see.', _:''})}` :
`The column goes on south through the dry country, the Grey Helms' dust very straight and very far ahead, the Bolkando's behind it, the brigades behind them, the train last. ${b104Horses() ? 'The Sixth walks at the very back of the train with the horses, at their pace, and catches up at every halt, late.' : 'The Sixth walks with the train, in its place, keeping up, and the horses that are left keep up with it.'}

Somewhere at the head of it, too far off to be more than a colour, the Commander's banner. Somewhere far to the north and east, on the glass, the foreigners. The road between has water in it somewhere, and every horse on it is dying slowly${b104Horses() ? ', but not today' : ''}.${b104If('tirren', `\n\nTirren walks at the horse-lines with her hand on a neck. She has not said which one she means to bring home. ${b104Horses() ? 'She talks to all of them the same.' : 'There are fewer to choose from. She talks to them the same anyway.'}`)}${b104Say({tobet:'\n\nTobet walks half a step behind, as always, and looks back north now and then, where there is nothing to see.', thegg:'\n\nThegg walks at the back, between the horses and whatever is behind them, without being asked.', _:''})}`,
      ch:[{t:b104Adj() ? 'East, through the glass.' : 'South, the long way round.', onward:true, go:()=>chapterEnd(4, b104Key() || 'horses')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* the column kept in sight, or lost and found, once */
function b104Looked(how){ if (S.f.b10_c4_lookDone) return; S.f.b10_c4_lookDone = how; save(); }
/* 'horses': the walk in and the water, once: the key's Witness (the brief: 'the horses lived'), and the thirst unless Ch 2 counted the
   horses' water (b10_c2_counted) */
function b104Walked(how){ if (S.f.b10_c4_walked) return; S.f.b10_c4_walked = how; b10Witness(1, 'the horses lived');
  if (S.f.b10_c2_counted) S.f.b10_c4_thirst = 'waived'; else { const id = b10ThirstPick(); S.f.b10_c4_thirst = id && b10Thirst(id) ? id : 'none'; } save(); }
/* the thirst's words after the horses' water */
function b104ThirstLine(){ const t = S.f.b10_c4_thirst;
  if (t === 'waived') return 'It is enough, just: the horses\' water was in Yelt\'s book from the night the army split, counted twice, and he had kept a little back for this, and says so, and writes it down.';
  if (t && t !== 'none' && b10In(t)) return `${NAME(t)} gives the mouthful to the one beside, without a word, and has the thirst by the time the fire is lit: split lips, and a slowness.`;
  return 'Everybody has a mouthful, and not one has two.'; }
/* 'pace': the horses that are left got up for the morning, once */
function b104Kept(how){ if (S.f.b10_c4_kept) return; S.f.b10_c4_kept = how; save(); }
