/* ============ Book Ten, Chapter 5: The Last Water (the Third) ============ */
/* The Third, with the heavies, at the crossing's worst (tcg-canon chapter table, Ch 5; R17 S3; WT ch 20): the water gone; children in the
   column, from somewhere east (one sentence, far off; rule 101); "a Fist tried to take the water" (rumour, rule 100); the squad's last
   water; the fire with no fire; the ground going wet under the column (rule 102). After the water, the first scrub of Kolanse at the
   glass's far edge, and Kolansii outriders who see the army and never ride back (the Assail thought the army dead, GR21; headline only).
   The wear (−1, 'nobody says why') is the engine's, at the chapter's start.
   Phase 1 (S.f.b10_c5_ph), the last lie-up by day: first light (the reading, B10READ[5], the glass at first light); Thallo's word (the
   company's barrels are dry; the Third has its last water: on b10_c3_hauled the last barrel of the wagon it hauled, else its last skin);
   the empty tailboard and the clerk (the rumour); the next cloak over, a file of the regulars with its youngest failing; stragglers come
   for that file's last skin (b10_c5_stragglers, optional); the old marine and the trick, The Last Mouthful; the rise west (the chapter's
   one Witness "yes, but"); the key at the last water, S.f.b10_c5_key: 'give' (to the youngest of the next cloak; b10Witness(2, 'gave the
   last of it'); Haddat and Mirrel +1; the thirst unless b10_c1_water) or 'hold' (b10Witness(-1, 'held it back'); Haddat −1). Phase 2, the
   night march: the children far off; the halt in the night (the fire with no fire, the beat c5); the rearguard (the one Letherii line).
   Phase 3, grey light: the ground goes wet under the column, then it is water (b10Witness(1, 'water under the column'), fixed). Phase 4,
   the glass's far edge: the first scrub of Kolanse; the Third sent forward as a picket; Kolansii outriders (b10_c5_outriders, main, stage
   2); Sedge, the regulars' captain, asks for file-closers: the Third is lent to her company (said once, plainly); the first fire since the
   glass; on.
   The 'south' road (the Third lent to the Commander's column, Ch 1): still by night on the Commander's word (Ch 3's choice kept); the
   Twelfth's wagon-master for Thallo; the column's water ration cut; the grey knights' dust turning away east; the King's ships rumoured at
   the coast; no children, no lake: at grey light the first well in Kolanse (b10Witness(1, 'the first well in Kolanse')); the outriders at
   the edge of Kolanse's farmland; the Twelfth asks for the Third as file-closers.
   Never: the Snake close, by name or what it ate; the Fist by name, his barrels, the mutiny, the knife; the Adjunct and the water; how the
   water came; the marines' captain and the child; the small cairns; the crystal mounds over children; the marines' water fight. Notes:
   docs/tcg-ch5-notes.md. */
/* FOR THE ARTIST (185b): names this file uses.
   Items: ART['item/b10_c5_kolansiiblade'], ['item/b10_c5_emptyskin'], ['item/b10_c5_lakestone'].
   Figures: pruss (181b), b9_c1_thallo (161b), b5_letherii (the wagon-master on 'south'; the outriders), b2soldier (the old marine, the
   clerk, the regulars, Sedge, the stragglers).
   Backdrops: b10_lake and b10_kolanse (180's, yours), and one this file adds: b10_c5_dawn (the glass at first light). The night march uses
   b10_glass_night (183b); on 'south' b10_south (182b) and b10_south_night (184b).
   Ground (TILEX): b10_c5_ground (the lie-up and the night march: the glass, or on 'south' Book Nine's road ground): 'c' a cloak on a
   spear-shaft, 'W' the last water (the hauled wagon's last barrel, or a skin hung on a shaft), 'r' the next cloak over (the regulars),
   'w' another wagon, 'T' the empty tailboard, 'O' the circle (no fire: 030 burns every 'F'), 'v' a rise of glass. b10_c5_wet (grey light: the glass gone dark and wet; on 'south' the first
   Kolansii village): 'L' the water (on 'south' the well and its trough). b10_c5_scrub (the glass's far edge, the first scrub of Kolanse):
   's' a thorn-bush, 'F' a real fire, 'g' a field's edge. Battle 't' is a glass shard (b10_c5_ground) or a thorn-bush (b10_c5_scrub). */

/* ---- small helpers (b105: Book Ten, Chapter Five) ---- */
const b105L = (id, n) => { if (b10In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b105Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b10In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b105If = (id, s) => b10In(id) ? (typeof s === 'function' ? s() : s) : '';
const b105Who = () => (ROLL() && ROLL().who) || 'sgt';
const b105Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b105Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b105V = (id, you, they) => id === 'sgt' ? you : they;
const b105Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the last lie-up by day, 2 the night march, 3 grey light and the water, 4 the glass's far edge */
const b105Ph = () => S.f.b10_c5_ph || 1;
const b105Key = () => S.f.b10_c5_key || null;
const b105Give = () => S.f.b10_c5_key === 'give';
const b105South = () => b10TRoad() === 'south';
const b105S = (glass, south) => b105South() ? south : glass;
const b105Hauled = () => !!S.f.b10_c3_hauled;
/* the key is done: chosen, and on 'give' the water carried across */
const b105KeyDone = () => b105Key() === 'hold' || (b105Give() && !!S.f.b10_c5_gave);
const b105Scene = night => b105South() ? (night ? 'b10_south_night' : 'b10_south') : (night ? 'b10_glass_night' : 'b10_glass');
const b105Wet = () => b105South() ? 'b10_kolanse' : 'b10_lake';
const b105Boss = () => b105S('Thallo', 'the wagon-master');
const b105BossC = () => b105S('Thallo', 'The wagon-master');
/* what the last water is: the last barrel of the wagon the Third hauled (b10_c3_hauled), else the Third's last skin */
const b105What = () => b105Hauled() ? b105S('the last barrel on the wagon the Third hauled', 'the last barrel on the Twelfth\'s wagon, the one the Third hauled') : 'the Third\'s last skin';
const b105It = () => b105Hauled() ? 'the barrel' : 'the skin';
/* who teaches the Last Mouthful: the old marine (the old hands' trick) */
/* the one line of the other squad a chapter: the Letherii's Chapter 4 key (horses or pace), by both roads */
const b105Rumour = () => { const lk = b10Key(4) || 'horses', ladj = b10LRoad() === 'adjunct', h = lk !== 'pace';
  if (!b105South()) return ladj
    ? (h ? 'A clerk walking with the rearguard says the few Letherii at the column\'s tail came in late again at grey light, with every horse they started with, walking at the horses\' heads. "Every one," he says. "Out here." He sounds as if he has been told about a miracle and does not hold with them.' : 'A clerk walking with the rearguard says the few Letherii at the column\'s tail kept up, and left horses lying on the glass behind them to do it. "Had to," he says. "Out here you keep up or you don\'t."')
    : (h ? 'The old marine, walking with the rearguard, says he has seen Letherii brigades on a long road before. "Somewhere south of here they\'ll have walked their horses," he says, "and fallen behind, and not minded. Letherii are fond of a horse." It is a guess. He says it like a card he has turned.' : 'The old marine, walking with the rearguard, says he has seen Letherii brigades on a long road before. "Somewhere south of here they\'ll have kept up," he says, "and run the horses into the ground doing it. Letherii hate being last." It is a guess. He says it like a card he has turned.');
  return ladj
    ? 'A Letherii carter at the tail says a few of their own went into the glass with the foreigners at the parting, and nobody on this road has heard a word of them since. "Not a word," he says, and looks north, as if a word might come walking.'
    : (h ? 'A carter at the tail says a Letherii company back down the road walked its horses all the way, and fell behind, and came in after dark with every one of them. "Their farrier," he says. "A girl. Talks to them."' : 'A carter at the tail says a Letherii company back down the road kept pace with the Bolkando, and left its horses along the road one by one doing it. "Kept up, though," he says. "Have to give them that."'); };

/* ---- The Last Mouthful: how the old hands hold one mouthful in the cheek and breathe round it until it matters. It copies Squint's
   Breath (Book Two's b2_squint): the bearer goes still, and the next blow or shot is truer. Not sorcery. v10.3: it strikes nobody, so
   it is free. ---- */
Object.assign(TRICKS, {
  b10_c5_mouthful:{name:'The Last Mouthful', ch:5, use:'fight', ab:'t_b10_c5_mouthful', where:'the last lie-up in the glass, from the old marine',
    lore:'The old hands keep one mouthful back. Not in a skin: in the cheek. They breathe round it through the nose, slow, and do not swallow, and the mouth stays wet, and the head stays clear. When it matters they swallow it, and for a breath everything is very sharp and very still. The old marine says he has carried the same mouthful across three deserts. The Third does not believe him, quite.',
    get fx(){ return `Once a fight: the bearer swallows the mouthful they have been holding and goes very still. Their next blow or shot is +4 to hit and +2 damage${lvT() >= 2 ? ', and a shot reaches two tiles further' : ''}. Grows with level. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b10_c5_mouthful:{name:TRICKS.b10_c5_mouthful.name, trick:'b10_c5_mouthful', self:true, free:true, desc:()=>TRICKS.b10_c5_mouthful.fx,
    run(u){ AUDIO.play('click'); u.steady = true; u.rallyUntil = Math.max(u.rallyUntil || 0, B.round + 1);
      if (lvT() >= 2 && u.rng > 1 && !u.mouthRng) { u.mouthRng = true; u.rng += 2; }
      sparks(u.x, u.y, 8, '#c8d8f0', .35); float(u, 'still', '#cfe0f0');
      blog(`${u.name} swallows the mouthful held back since the last halt, the old hands' way, and for a breath the whole fight is very sharp and very still.`); }},
});

/* ---- the reading: the glass at first light (on 'south', the road's edge at first light) ---- */
B10READ[5] = {back:'b10_c5_fire', backT:'Back to the circle.',
  get where(){ return S && S.f && b105South() ? 'the hard ground of the road\'s edge at first light' : 'the glass at first light'; },
  get scene(){ return S && S.f && b105South() ? 'b10_south' : 'b10_c5_dawn'; },
  get set(){ return S && S.f && b105South() ? 'First light at the lie-up on the long way round, the wagons drawn up along the road, and the dry country going from grey to brown while you watch.' : 'First light at the last lie-up, the stars going out in the glass one by one, and the glass going grey, then rose, then a white that hurts.'; },
  say:{marrow:'"Sit, child," Marrow says. "Before it is bright. Lady knows there is nothing to drink, so we may as well look at pictures." She shuffles slowly. Her hands are as dry as the cards.',
       tallow:'"Grandmother said you read at first light when you want the truth and at dusk when you want comfort," Tallow says. He looks at the glass going rose. "I don\'t know which this is." He shuffles anyway.',
       get oldninth(){ return S && S.f && b105South() ? '"Still lent south," the old marine says. "Still forgot." He shuffles. "Cards don\'t drink. That\'s one thing in their favour."' : '"Still walking," the old marine says. "Both of us. Fewer of us than there were." He shuffles with a dry rasp of card on card. "Cards don\'t drink. That\'s one thing in their favour."'; }}};

/* ---- borrowed pictures until the artist's file (185b) replaces them ---- */
SCENEX.b10_c5_dawn ??= (cv, t) => (SCENEX.b10_glass || ((c, tt) => drawCamp(c, tt, true)))(cv, t);
if (typeof TILEX !== 'undefined') { TILEX.b10_c5_ground ??= (...a) => (TILEX.b10_c3_ground || (() => {}))(...a); TILEX.b10_c5_wet ??= (...a) => (TILEX.b10_c3_ground || (() => {}))(...a); TILEX.b10_c5_scrub ??= (...a) => (TILEX.b9_c3_road || (() => {}))(...a); }
if (typeof ART !== 'undefined') [['b10_c5_kolansiiblade', 'b10_c3_glassknife'], ['b10_c5_emptyskin', 'b10_c3_tracestrap'], ['b10_c5_lakestone', 'b10_c3_tracestrap']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Ten's glossary ---- */
GLOSSX.tcg.push(
  [5, 'The last water', 'What a squad has left when the column\'s barrels are dry: a skin, or a barrel, or a mouthful. What it does with it is the squad\'s business, and everybody watches.', ()=>!!(S && S.f && S.f.b10_c5_orders)],
  [5, 'File-closers', 'The soldiers at the back of a line who keep it a line: they push the ones in front forward, fill the gaps, and catch whoever falls back. A company short of sergeants borrows them.', ()=>!!(S && S.f && S.f.b10_c5_lent)]);

/* the fire is a roster fire (38c): in the glass it is no fire, only the squad's circle; at the glass's far edge it is a fire again */
ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[5] = ['b10_c5_fire'];

/* ---- the squad in the circle: a line at the last lie-up and a line at the glass's far edge for every soldier the Third can field ---- */
const B105TALK = {
  haddat:[()=>`Haddat has the blue shield over her head for shade and is saying the names under her breath, the long list, without voice. She gets to the end. "I can say them without spit," she says. "I did not know that." She starts again.`,
          ()=>`Haddat has her boots off and her feet on ground that has dirt in it. Real dirt. She keeps pressing her toes into it. "My mother said the far side comes when you stop expecting it," she says. "She was right. I hate that she was right."`],
  sathi:[()=>`Sathi has a pebble of glass in her mouth again. She takes it out to talk and thinks better of it and puts it back. She points at it, and at her mouth, and shrugs. It is a whole speech.`,
         ()=>`Sathi is sitting by the fire with her filed teeth showing in what might be a smile. "The Weasels said there was no such thing as too much water," she says. "We were wrong about most things. Not that."`],
  tangle:[()=>`Tangle is not counting. That is how the squad knows how bad it is. He sits with the satchel shut on his knees and his hands flat on it. "Nothing to count," he says. "I counted it last night. It came out nothing."`,
          ()=>`Tangle is counting again, the skins, all of them full, twice, and the munitions, and the skins a third time for the pleasure of it. "Full," he says. "Every one." He counts them again, and the squad lets him.`],
  marrow:[()=>`Marrow has her knotted string in her lap and her eyes shut. "The Lady mends the body, child," she says. "She does not make water out of nothing. I have asked." She opens her eyes. "I will ask again tonight."`,
          ()=>`Marrow is going round the squad with a wet rag, washing the cracks at the corners of mouths, one face at a time. "There," she says to each. "There." It is not a blessing. It is close.`],
  mirrel:[()=>`Mirrel goes round the squad looking at tongues and does not say what she sees. She has nothing to give them. She looks anyway, every one, the way she looks at a wound she cannot close, so it knows somebody is watching it.`,
          ()=>`Mirrel has her herbs out of their oilskin for the first time since the glass began and is wetting them, one bundle at a time, as if they too had been thirsty. "They'll come back," she says. "Most things do, if you give them water."`],
  doss:[()=>`Doss is lying on his back under the cloak. "On the holding, in the dry year, we dug the well deeper," he says. "Every morning, a hand deeper." He holds up his hand. "Nothing to dig here. That is the worst of it. Nothing to do."`,
        ()=>`Doss is looking at the thin fields at the scrub's edge with a farmer's face. "Overworked," he says. "Ploughed to dust and ploughed again." He shakes his head. "They should let it lie a year." He does not say who would tell them.`],
  wenna:[()=>`Wenna has her palm on the glass and leaves it there this time. "Still nothing under it," she says. "But it is not as dead as it was. Something has moved, down there. Or I am mad." She considers. "One or the other."`,
         ()=>`Wenna is lying on her front with her ear to the dirt at the scrub's edge, smiling. "Water," she says. "A long way down, and not much. But it knows I'm here." She does not get up for a while.`],
  mehet:[()=>`Mehet has his ring of keys in his fist and is not turning it. "In Y'Ghatan when the wells went dry, people sold the keys to them," he says. "Keys to dry wells. People bought them." He looks at his ring. "I understand that now."`,
         ()=>`Mehet has found a door at the scrub's edge, in a field-hut with no roof, and is trying keys in it out of habit. None of them fit. He seems happier than he has in a long time.`],
  ottar:[()=>`Ottar has his grey plate off and stacked. "Today's word," he says, very quietly, to save spit, "is <em>last</em>." He considers it. "A word that does not like to be used more than once."`,
         ()=>`Ottar is scrubbing the grey plate with sand and water, real water, and humming. "Today's word," he says, "is <em>scrub</em>." He scrubs. "Both meanings. The country has a sense of humour."`],
  tallow:[()=>`Tallow has his grandmother's deck against his chest under his tunic. "She said cards fade in the sun," he says. "So do I. I've decided not to." He shuts his eyes. "It's going well so far."`,
          ()=>`Tallow is laying out his grandmother's deck on a flat stone to air it, every card face up in the sun. "She said they need light now and then," he says. "Like people." He does not turn any of them over to look.`],
  hessa:[()=>`Hessa sits very straight under the cloak with her spear across her knees. "D'rek is under everything," she says. "Even this." She frowns. "This morning she turned over. I felt it in my teeth." She does not say what it means. She may not know.`,
         ()=>`Hessa has her spear planted in the dirt at the scrub's edge, and her hand on it, and her eyes shut. "She was down there," she says. "All the way across. Turning over." She opens them. "I will not say I told you so."`],
  tebbet:[()=>`Tebbet has his bow wrapped against his chest like a sick dog. "Gut's gone brittle," he says. "One more day of this and it'll go when I draw." He looks east. "One more day of this and so will I."`,
          ()=>`Tebbet has his bowstring off and soaking in a helm of water, and is watching it like a man watching bread rise. "Comes back," he says. "Gut forgives you. Eventually."`],
  darrut:[()=>`Darrut has his dented helm on his knee. "Aren Guard had a rule," he says. "Never drink the last of it. Keep a mouthful, always." He turns the helm. "Never said what for. I think I know what for now."`,
          ()=>`Darrut has his helm full of water at his feet and keeps looking at it instead of drinking it. "Habit," he says. "Takes a while to believe it'll still be there." He drinks. It is still there.`],
  yorin:[()=>`Yorin has his copper wind-vane on his palm. It does not move. He watches it anyway. "Serc has gone so quiet out here," he says, "I think even the wind died of thirst."`,
         ()=>`Yorin's wind-vane is spinning on his palm in the scrub's dry wind, round and round, and he is laughing at it. "Wind," he says. "Dust in it. Smells of a field." He sniffs. "A poor field."`],
  rasp:[()=>`Rasp is going over the squad's munitions by feel under the cloak. "They don't need water," she says. "Only thing in the column that doesn't." She wraps them. "I've never envied a cusser before."`,
        ()=>`Rasp is checking the munitions again, now there is a fire near them, with a sapper's frown. She moves them twice, further from it. "Not dangerous," she says. "Just careful." She moves them a third time.`],
  orvas:[()=>`Orvas is watching the horse-folk at the column's flank. There are fewer horses than there were. "They gave the horses their own water," he says, "until there was none. Then they walked beside them." He looks away. "Then they walked."`,
         ()=>`Orvas is watching the horse-folk lead what horses they have left down to the water at the scrub's edge. "Not many," he says. "Enough to remember what they were." He watches until the last one drinks.`],
  redblade:[()=>`Ramin has his scale off and is lying on it. "Red Blades used to say a soldier is a skin of water with a sword," he says. "Take away the water." He holds up the sword, which is shaking a little. "Not much of a soldier."`,
            ()=>`Ramin has washed his face, and his hands, and his scale, in that order, and is looking at his reflection in a helm of water. "I'd forgotten I had a face," he says. "It's a good one. I'd forgotten that too."`],
  warlock:[()=>`Keth is lying very still with his eyes shut. "*Drink it,*" the grandmother says out of his mouth, cracked. "*Whatever you are keeping, drink it.*" Keth swallows nothing. "She's thirsty too," he says. "I didn't know the dead could be."`,
           ()=>`Keth is drinking slowly, a sip at a time. "*Greedy,*" the grandmother says out of his mouth, pleased. "*Good. Be greedy. You earned it.*" Keth wipes his mouth. "She's in a better mood," he says. "So am I."`],
  brask:[()=>`Brask has his tally-stick out and is turning it over and over. "Old squad crossed the salt once with the 9th," he says. "Got to the last skin. Sergeant gave it to the ones who could still walk." He puts it away. "Right to. Didn't like it."`,
         ()=>`Brask is sitting with his back to a thorn-bush, which nobody else would choose, and does not seem to notice. ${S.f.b10_c5_key === 'give' ? '"Gave it," he says. "Right to." He nods once. "Liked that one."' : '"Kept it," he says. "Right to, maybe." He looks at his hands. "Didn\'t like it."'}`],
  tegra:[()=>`Tegra is lying with her ear to the glass, listening. "My people say the ground drinks before the sky gives," she says. "Here the ground does not drink." She sits up. "So the sky will not give. That is how my people would read it." She lies back down. "My people are not always right."`,
         ()=>`Tegra is digging with her hands at the foot of a thorn-bush, slowly, and at a forearm's depth the sand comes up dark. She shows it to nobody in particular. "There," she says. "The ground remembers." She fills the hole back in, carefully, as if it mattered.`],
  pruss:[()=>`Pruss is sitting with his back to ${b105Hauled() ? 'the wagon wheel' : 'his pack'} and his old sergeant's helm in his lap. "Da used to say a carter's last water goes to the horse," he says. "Then the carter walks." He looks at the empty pickets where the oxen were. "No horse."`,
         ()=>`Pruss has his old sergeant's helm full of water and is not drinking from it. He is just holding it. ${S.f.b10_c5_key === 'give' ? '"That lad\'s up and walking," he says. "Saw him at the water." He drinks, at last. "Good."' : '"Should have given it," he says, after a while. Then: "Maybe." He drinks, at last, slowly.'}`],
};

const B10CH5 = {
  title:B10CH[5], number:'Five',
  intro:{ get loc(){ return S && S.f && b105South() ? 'South of the glass' : 'The Glass Desert'; }, get sub(){ return S && S.f && b105South() ? 'The long way round · the water ration cut' : 'The crossing · the last water'; }, get scene(){ return S && S.f ? (b105South() ? 'b10_south_night' : 'b10_glass_night') : 'b10_glass_night'; },
    get cap(){ return S && S.f && b105South() ? 'The column walking south by night, slower than it did, and the wagons lighter, and the barrels on them lighter still.' : 'Stars overhead and the same stars underfoot in the glass, and the column walking between them slower than it did.'; },
    paras:[
()=> b105South() ? `The long way round. The column still walks by night on the Commander's word, for the horses that are left, and lies up by day beside the road. The road has begun, very slightly, to smell of somewhere.` : `The glass. The column still walks by night without a lamp and lies up by day under its cloaks. It walks slower than it did. It lies up longer. There are gaps in the files where nobody closes up.`,
()=>{ const v = (S.squad || []).filter(id => id !== 'sgt' && b10In(id)).map(id => NAME(id));
  return `You are Sergeant {sgt}, Third squad, with the heavies${b105South() ? ', lent to the Letherii, guarding a wagon that is mostly empty now' : ''}. ${v.length ? `${v.length > 1 ? v.slice(0, -1).join(', ') + ' and ' + v[v.length - 1] + ' are' : v[0] + ' is'} the Third, still.` : 'The Third, still, is you.'}`; },
()=> b105South() ? `The Commander's word came down the line at the last halt: the water ration is cut. The word did not say by how much. Everybody can tell.` : `The company's barrels went dry at the last halt. The captain has not said what comes next. Everybody has a guess, and keeps it.`],
    go:'To the lie-up', node:'b10_c5_start'},

  areas:[
    /* 16 x 12 (b10_c5_ground, day). The last lie-up. c a cloak on a spear-shaft  W the last water  r the next cloak over (the regulars)
       O the squad's circle (no fire)  v a rise of glass, west  T the empty tailboard  < west: the column lying up */
    { id:'b10_c5_lieup', title:'The last water · the lie-up', sub:'Day · under the cloaks', hint:'Tap ground to move · tap a figure to talk · the column lies up west, the next cloak east', decor:'b10_c5_ground',
      map:[ "################",
            "#..c....c...c..#",
            "#v.............#",
            "#..c..T.....c..#",
            "#.......W......#",
            "<..............#",
            "#..c...O....r..#",
            "#..............#",
            "#.c...c...c..c.#",
            "#..............#",
            "#....c....c....#",
            "################" ],
      walk:'.', triggers:{W:'b10_c5_last', T:'b10_c5_tail', r:'b10_c5_next', O:'b10_c5_fire', v:'b10_c5_look', '<':'b10_c5_west'}, start:{x:1, y:5},
      quest:()=> !S.f.b10_c5_orders ? `${b105BossC()}, by the last water. The Third has what it has.` : !b105Key() ? 'The last water. The next cloak over, east: one of theirs is failing.' : !b105KeyDone() ? 'The next cloak over, with the water.' : 'The circle, and dusk. The column goes on in the dark.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:9, y:4, node:()=>'b10_c5_thallo', show:()=>!b105South(), fresh:()=>!S.f.b10_c5_orders},
        {id:'master', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:9, y:4, node:()=>'b10_c5_thallo', show:()=>b105South(), fresh:()=>!S.f.b10_c5_orders},
        {id:'old', name:'The old marine', kind:'b2soldier', x:4, y:7, node:()=>'b10_c5_oldmarine', fresh:()=>!S.f.b10_c5_old},
        {id:'strag', name:'Shapes by the next cloak', kind:'b2soldier', x:13, y:5, node:()=>'b10_c5_next', show:()=>!!S.f.b10_c5_orders && !S.f.b10_c5_stragDone && !S.f.b10_c5_stragLeft, fresh:()=>true} ] },

    /* 16 x 12 (b10_c5_ground, night). The night march. w the column's wagons  O the halt in the night (the fire with no fire)
       r west: the rearguard  > east: on, toward grey light */
    { id:'b10_c5_march', title:'The last water · the column', sub:'Night · no lamps', hint:'Tap ground to move · tap a figure to talk · the rearguard is west, the halt in the middle, the way on east', decor:'b10_c5_ground', dark:true,
      map:[ "################",
            "#..............#",
            "#..w.....w.....#",
            "#..............#",
            "#..............#",
            "r......O.......>",
            "#..............#",
            "#..............#",
            "#...w.....w....#",
            "#..............#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{O:'b10_c5_fire', r:'b10_c5_rear', '>':'b10_c5_east'}, start:{x:2, y:5},
      quest:()=> !S.f.b10_c5_halt ? 'The halt in the night. The column stops where it stands.' : 'East, toward grey light.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:11, y:4, node:()=>'b10_c5_thallo2', show:()=>!b105South(), fresh:()=>!S.f.b10_c5_thallo2},
        {id:'master', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:11, y:4, node:()=>'b10_c5_thallo2', show:()=>b105South(), fresh:()=>!S.f.b10_c5_thallo2} ] },

    /* 16 x 12 (b10_c5_wet, grey light). The ground gone wet (on 'south', the first Kolansii village and its well). L the water
       (or the well and its trough)  > east: on, to the glass's far edge */
    { id:'b10_c5_lake', title:'The last water · grey light', sub:'Grey light · wet ground', hint:'Tap ground to move · tap a figure to talk · the water is in front of you, the way on east', decor:'b10_c5_wet',
      map:[ "################",
            "#..............#",
            "#..............#",
            "#....LLLLLL....#",
            "#...LLLLLLLL...#",
            "<...LLLLLLLL...>",
            "#....LLLLLL....#",
            "#..............#",
            "#..............#",
            "#..............#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{L:'b10_c5_water', '<':'b10_c5_lakewest', '>':'b10_c5_lakeeast'}, start:{x:2, y:8},
      quest:()=> !S.f.b10_c5_drank ? b105S('The water. Get the squad to it.', 'The well. Get the squad to it.') : 'East, to the far edge.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:12, y:8, node:()=>'b10_c5_thallo3', show:()=>!b105South(), fresh:()=>!S.f.b10_c5_thallo3},
        {id:'master', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:12, y:8, node:()=>'b10_c5_thallo3', show:()=>b105South(), fresh:()=>!S.f.b10_c5_thallo3},
        {id:'old', name:'The old marine', kind:'b2soldier', x:6, y:9, node:()=>'b10_c5_oldmarine', fresh:()=>false} ] },

    /* 16 x 12 (b10_c5_scrub, day). The glass's far edge: the first scrub of Kolanse (on 'south', the edge of Kolanse's farmland).
       s a thorn-bush  g a field's edge  F a real fire  > east: on  < west: the glass, behind */
    { id:'b10_c5_scrub', title:'The last water · the far edge', sub:'Day · the first scrub', hint:'Tap ground to move · tap a figure to talk · the picket is east, the fire in the middle, the way on east', decor:'b10_c5_scrub',
      map:[ "################",
            "#..s....s...ggg#",
            "#.......s...ggg#",
            "#..s.........gg#",
            "#.....s........#",
            "<......F.......>",
            "#..............#",
            "#..s.....s.....#",
            "#.........s..gg#",
            "#..s.........gg#",
            "#.....s.....ggg#",
            "################" ],
      walk:'.', triggers:{F:'b10_c5_fire', '<':'b10_c5_scrubwest', '>':'b10_c5_edge'}, start:{x:1, y:5},
      quest:()=> !S.f.b10_c5_picket ? `${b105BossC()}. The captain's word for the Third.` : !S.f.b10_c5_ridersDone ? 'Riders, east, at the scrub\'s edge.' : !S.f.b10_c5_lent ? 'An officer of the regulars, looking for the Third.' : 'The fire, and on.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:4, y:6, node:()=>'b10_c5_thallo4', show:()=>!b105South(), fresh:()=>!S.f.b10_c5_picket},
        {id:'master', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:4, y:6, node:()=>'b10_c5_thallo4', show:()=>b105South(), fresh:()=>!S.f.b10_c5_picket},
        {id:'riders', name:'Riders at the scrub\'s edge', kind:'b5_letherii', x:12, y:5, node:()=>'b10_c5_riders', show:()=>!!S.f.b10_c5_picket && !S.f.b10_c5_ridersDone, fresh:()=>true},
        {id:'sedge', name:'Captain Sedge', kind:'b2soldier', x:9, y:6, node:()=>'b10_c5_sedge', show:()=>!b105South() && !!S.f.b10_c5_ridersDone, fresh:()=>!S.f.b10_c5_lent},
        {id:'finadd', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:9, y:6, node:()=>'b10_c5_sedge', show:()=>b105South() && !!S.f.b10_c5_ridersDone, fresh:()=>!S.f.b10_c5_lent} ] } ],

  battles:{
    /* optional: stragglers come for the next cloak's last skin at noon on the last lie-up */
    b10_c5_stragglers:{title:'The next cloak', style:'b10_c5_ground', get warrenText(){ return S && S.f && b105South() ? 'Noon on the southern road · heat, dust · the warrens thin' : 'Noon on the glass · glare off everything · the warrens thin and dry'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["........","........","..t.....","........",".....t..","........","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_straggler',2,0],['b10_straggler',5,1],['b10_ringleader',3,1]], xp:120, after:'b10_c5_strag_after',
      preText:()=>`${b105South() ? 'Carters, Bolkando by their coats, from a wagon up the road that went dry before the ration was cut.' : 'Soldiers from somewhere up the column, Malazans, three of them, and one big enough to be trouble.'} They are not looking at the Third. They are looking at the one skin the next cloak has left, and at the soldier holding it, who is too far gone to hold it hard.`},
    /* the Kolansii outriders at the glass's far edge (on 'south', the edge of the farmland): main; then the wash they came up */
    b10_c5_outriders:{title:'The scrub\'s edge', style:'b10_c5_scrub', get warrenText(){ return 'Morning at the glass\'s edge · dry wind, dust, thorn · the warrens stirring'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t.....","......t.","........","...t....","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_outrider',1,0],['b10_outrider',4,0],['b10_outrider',6,1],['b10_kolbow',3,2]], xp:380, after:'b10_c5_riders_after',
      preText:()=>`Four riders on horses so thin their hips show through the hide. They have seen the Third at the scrub's edge, and behind the Third, ${b105South() ? 'coming up out of the dry country, the whole southern column' : 'coming up out of the glass, the whole army'}. Their faces say they did not expect that. The horses will not gallop. The riders come off them and come on afoot, fast, because the only way home is through the picket.`,
      stage2:{title:'The wash', xp:170,
        text:()=>`The first of them are down in the thorn, and staying down. Up the dry wash behind them comes one more, with an officer's sash and a long blade, and a rider beside him who has turned back for him. The officer is shouting something in a tongue the Third does not have. It sounds like orders. It sounds afraid.${b105If('pruss', `\n\nPruss plants his shield in the mouth of the wash. "Not that way," he says. "Sorry, friend."`)}`,
        map:["#......#","..t.....","........","....t...","........","........","..t..t..","........","........","#......#"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b10_kofficer',3,1],['b10_outrider',5,1]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b10_c5_kolansiiblade:{name:'A Kolansii outrider\'s blade', slot:'weapon', role:'blade', who:null, atk:1, dmg:[1,10,4],
      line:'A long, slightly curved blade from a Kolansii outrider, made for cutting down from a saddle and good enough on foot. The steel is better than the man who carried it had been fed. A forge in Kolanse still burns, somewhere.'},
    b10_c5_emptyskin:{name:'The empty skin', slot:'trinket', role:'any', who:null, hp:3,
      line:'The skin the Third\'s last water came out of in the glass. It has been full since, more than once. The squad calls it the empty skin and will not throw it away.'},
    b10_c5_lakestone:{name:'A stone from the wet ground', slot:'trinket', role:'any', who:null, hp:1, stat:{wits:1},
      line:'A plain dark stone picked up from the place where the glass went wet under the column, still cool in the hand long after it should have warmed. It is only a stone. The soldier who carries it turns it over at every halt anyway.'} },

  scenes:{
    b10_c5_dawn:{loc:'The Glass Desert', sub:'The last lie-up · first light', cap:'The glass at first light, the stars going out in it, and the column putting its cloaks up for what may be the last time.', amb:'explore'} },

  end:{
    give:['Gave the last of it', 'At the crossing\'s worst, when the barrels were dry, the Third had one water left, and gave it to the next cloak over, where one of the regulars was failing. It cost the squad its own. That night the ground went wet under the column, and then it was water, and the Third drank with everybody else. At the glass\'s far edge it held a picket in the first scrub of Kolanse, and none of the riders who saw the army rode back to say so.'],
    hold:['Held it back', 'At the crossing\'s worst, when the barrels were dry, the Third had one water left, and kept it for the squad, with one of the regulars failing at the next cloak over. That night the ground went wet under the column, and then it was water, and the Third drank with everybody else, and did not talk about the skin. At the glass\'s far edge it held a picket in the first scrub of Kolanse, and none of the riders who saw the army rode back to say so.'] },
  get endScene(){ return 'b10_kolanse'; },
  endCap:()=> b105South() ? 'The edge of Kolanse\'s farmland at evening, thin fields and an empty granary, and the southern column coming up the road behind the Third.' : 'The glass\'s far edge at evening, the first thorn-scrub of Kolanse, and the army coming up out of the glass behind the Third with its skins full.',
  tease:'Next: the Letherii. A grey beach, the King\'s ships, and a long line on open ground before a city that has been waiting for them.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b10_c5_key === 'give') x.push(`At the crossing's worst the Third gave its last water to the next cloak over${f.b10_c5_gave === 'kept' ? ', and saw it go down and stay down' : ''}.`);
    if (f.b10_c5_key === 'hold') x.push('At the crossing\'s worst the Third kept its last water for itself.');
    if (f.b10_c5_lake) x.push(b105South() ? 'The Third drank from the first well in Kolanse.' : 'The ground went wet under the column, and the Third drank.');
    if (f.b10_c5_ridersDone) x.push('Kolansii outriders saw the army at the glass\'s far edge. None of them rode back.');
    if (f.b10_c5_stragDone) x.push('Stragglers came for the next cloak\'s last skin. The Third stood between.');
    if (f.b10_c5_mouthfulOk) x.push('The old marine taught the Third to hold the last mouthful in the cheek until it matters.');
    if (f.b10_c5_lent) x.push(f.b10_c5_lent === 'sedge' ? 'Captain Sedge of the regulars asked for file-closers. The heavies lent her the Third.' : 'The Twelfth asked for the Third as file-closers for whatever waits at the end of the road.');
    if (f.b10_c5_thirst && !['none', 'waived'].includes(f.b10_c5_thirst) && TPL[f.b10_c5_thirst]) x.push(`${NAME(f.b10_c5_thirst)} carried the thirst after the last water went.`);
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b10_c5_lent && (f.b10_c5_lent === 'sedge' ? 'Lent to Captain Sedge\'s company of the regulars, as file-closers.' : 'Asked for by the Twelfth, as file-closers.'),
    f.b10_c5_ridersDone && 'Kolansii outriders at the scrub\'s edge. None rode back.',
    f.b10_c5_lake && (b105South() ? 'The first well in Kolanse, at grey light.' : 'Grey light, and the ground wet under the column, and then water.'),
    f.b10_c5_key === 'give' && 'The last water, given to the next cloak over.',
    f.b10_c5_key === 'hold' && 'The last water, kept.',
    f.b10_c5_rumour && (b105South() ? 'Word that the King\'s ships are at the coast.' : 'Word that a Fist tried to take the water.'),
    f.b10_c5_rear && 'Word from the rearguard about the Letherii.',
    b105South() ? 'The Third, lent to the Letherii, on the long way round.' : 'The Third, with the heavies, at the end of the glass.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the last lie-up (the first halt) ======== */
    b10_c5_start:()=>({sp:b105S('The last lie-up', 'The road\'s edge'), scene:b105S('b10_c5_dawn', 'b10_south'), fx:()=>{ S.f.b10_c5_ph = S.f.b10_c5_ph || 1; }, again:()=>b105S('The lie-up at first light, the cloaks going up slowly.', 'The road\'s edge at first light, the wagons drawn up.'), txt: b105South() ?
`First light, and the column halts at the road's edge, and the carters unhitch what is left of the teams, slowly. There is nothing to hurry toward but shade.

Far ahead to the south the grey knights' dust is a long straight line, as it always is. This morning it is bending, slowly, away east, off the road, toward nothing anybody can see.

${b105Say({tangle:'Tangle looks at the Twelfth\'s barrels and does not count them. He looks away.', haddat:'Haddat sits in the shade of a wheel with her shield across her knees, saving her words.', _:'The Third finds the wagon\'s shade and gets into it.'})}${b105If('pruss', `\n\nPruss stands by the Twelfth's wagon with his hand on a barrel, feeling for the slosh. There is not much of it.`)}

The wagon-master is at the tailboard, waiting for the Third.` :
`First light, and the column halts where it stands. The spear-shafts go into the cracks of the glass, and the cloaks go over them, slower than they did, and some of them do not go up at all: soldiers lying down where they stopped, too tired to put a cloak over anything.

The stars go out in the glass one by one. The glass goes grey, and rose, and then white.

${b105Say({tangle:'Tangle does not count the skins. He knows.', haddat:'Haddat drives her spear in and hangs the blue shield from it, and sits down under it, saving her words.', _:'The Third gets its cloaks up and gets under them.'})}${b105If('pruss', `\n\nPruss is by ${b105Hauled() ? 'the wagon the Third hauled, with his hand flat on its last barrel' : 'the Third\'s packs, with his hand on its last skin'}, as if it might wander off.`)}

${b105Hauled() ? 'By the wagon' : 'By the packs'}, Thallo is waiting. He is not eating.`,
      ch:[{t:`${b105BossC()}.`, go:'b10_c5_thallo'},
          b10ReadChoice(5),
          {t:'Walk the lie-up.', go:()=>startExplore()}]}),
    b10_c5_read:()=>b10ReadOffer(5),
    b10_c5_card:()=>b10ReadCard(5),

    /* Thallo (or the wagon-master): the barrels dry, the last water the Third's own */
    b10_c5_thallo:()=>({sp:b105S('Thallo', 'The Twelfth\'s wagon-master'), scene:b105S('b10_glass', 'b10_south'), fx:()=>{ S.f.b10_c5_orders = 1; }, again:()=>`${b105BossC()}. "What you have is what there is, Sergeant."`, txt: b105South() ?
`The wagon-master has his ledger open on the tailboard and is not writing in it. "The Commander's word," he says. "Ration's cut. The Twelfth draws half, from tonight." He looks at the barrels. "Half of not much."

${b105Hauled() ? `He knocks on the last full barrel. "This one's yours," he says. "The one you dragged. The Twelfth says the haulers drink last from it and first, both. I don't understand that. The carters do." He shuts the ledger.` : `He looks at the Third's skins. "What you carried is yours," he says. "I wrote it as more. It isn't." He shuts the ledger.`}

"There's a lad of ours at the next wagon," he says, and nods east. "Carter's boy. Gone quiet since the last halt. The quiet ones are the ones you watch."` :
`Thallo, as big as a door, sitting on ${b105Hauled() ? 'the wagon-tongue' : 'his pack'} with nothing in his hands. He is not eating. There is nothing to wash it down with, and he has stopped pretending.

"Third," he says. His voice has gone to gravel. "Captain's word. Company's barrels are dry. Clerk gave out the last at grey light." He looks at ${b105Hauled() ? 'the wagon behind him. "Except that one. Last barrel on the wagon you hauled. Captain says it\'s the Third\'s, since you dragged it here."' : 'the Third\'s packs. "What you carried is yours. Captain says."'}

He looks east, at the next cloak over, where a file of the regulars is lying up. "Their youngest went down at the halt," he says. "Got up. Went down again." He stands, slowly. "Your water, Sergeant. Your call."${b105If('pruss', `\n\nPruss is looking east too.`)}`,
      ch:[{t:'"The last water, then."', go:'b10_c5_last'},
          {t:'Back to the lie-up.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the last water, and the key */
    b10_c5_last:()=>{ const k = b105Key();
      if (!S.f.b10_c5_orders) return {sp:'The last water', scene:b105S('b10_glass', 'b10_south'), txt:
`${b105Hauled() ? 'The wagon the Third hauled, with one barrel on it that still sloshes.' : 'The Third\'s last skin, hung from a spear-shaft in the shade.'} ${b105BossC()} is by it, waiting.`,
        ch:[{t:`${b105BossC()}.`, go:'b10_c5_thallo'}, {t:'Back to the lie-up.', go:()=>startExplore()}]};
      if (k === 'give' && !S.f.b10_c5_gave) return DLG.b10_c5_key_give();
      if (k) return {sp:'The last water', scene:b105S('b10_glass', 'b10_south'), txt: k === 'give' ?
`Where the last water was, there is ${b105Hauled() ? 'a barrel standing open and dry, with a dipper in it' : 'an empty skin hanging from a spear-shaft, turning a little in no wind'}. The Third keeps its eyes off it.` :
`${b105Hauled() ? 'The last barrel, its bung hammered home, with Haddat\'s shield leaning against it.' : 'The last skin, hung from a spear-shaft, with Haddat\'s shield leaning against the shaft.'} It is the Third's. Everybody in the lie-up knows it is the Third's.`,
        ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]};
      return {sp:'The last water', scene:b105S('b10_glass', 'b10_south'), html:witnessHTML(), again:()=>'The last water, and the next cloak over.', txt:
`${b105Hauled() ? `The last barrel on the wagon the Third hauled. Tangle knocks on it and listens. "A fifth," he says. "Maybe less." Enough for the squad, a mouthful each, twice, if nobody is greedy.` : `The Third's last skin. Tangle weighs it on his palm. "Two mouthfuls each," he says. "Maybe less." Enough for the squad, if nobody is greedy.`}

${b105South() ? `East, in the next wagon's shade, the Twelfth's carters are lying close round their boy, who has stopped moving much. His lips are split and grey. Their own skin is flat and empty in the dust between them. The foreman looks over at the Third's water, and then looks away, very carefully, as a carter does when he is trying not to ask.` : `East, under the next cloak over, the regulars' file is lying close round their youngest, who has stopped moving much. His lips are split and grey. Their own skin is flat and empty on the glass between them. One of them looks over at the Third's water, and then looks away, very carefully, as a soldier does when he is trying not to ask.`}

${b105Say({haddat:'Haddat looks at the water, and east, and back. "We know their names," she says. "I say them at night. With ours."', mirrel:'Mirrel has already looked at the youngest from here, the way she looks at a wound. "Tonight," she says. "If nothing. Maybe sooner."', _:'The Third looks at the water, and east, and at each other.'})}${b105If('pruss', `\n\nPruss turns his old sergeant's helm over in his hands. "My lot gave our water to the next squad once," he says. "On the stretch. Then the next squad held and we didn't." He puts the helm down. "I don't know what that tells you."`)}${b105If('tangle', `\n\nTangle does the sum aloud, very quietly. "One of them, or six of us a little," he says. "That's the whole sum." He shuts his mouth on the rest of it.`)}`,
        ch:[{t:`"Take it across. All of it. To their youngest."`, fx:()=>{ S.f.b10_c5_key = 'give'; b10Witness(2, 'gave the last of it'); b105L('haddat', 1); b105L('mirrel', 1); }, go:'b10_c5_key_give'},
            {t:'"It\'s ours. We keep it. The Third needs every mouthful."', fx:()=>{ S.f.b10_c5_key = 'hold'; S.f.b10_c5_held = 1; b10Witness(-1, 'held it back'); b105L('haddat', -1); }, go:'b10_c5_key_hold'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    /* 'give': carry it across and see it into him, slowly (a Witness check: giving the last of something) */
    b10_c5_key_give:()=>({sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), html:witnessHTML(), again:()=>'The next cloak over, the youngest, the water.', txt:
`${by({sgt:'You carry', mirrel:'Mirrel carries', haddat:'Haddat carries', pruss:'Pruss carries', _:'{who} carries'})} ${b105It()}'s water across the glare in ${b105Hauled() ? 'the dipper and a skin' : 'the skin'}, and the whole lie-up watches it go. ${b105S('The regulars', 'The carters')} move aside without being asked.

The youngest is on his back with his eyes half open. He does not know anyone is there. It has to go in slowly, a mouthful at a time, or it comes back up and is gone into the ${b105S('glass', 'dust')}.${b105If('pruss', `\n\nPruss kneels and gets a hand under the young one's head without being asked, the way you lift a beast's head to a bucket.`)}`,
      ch:[{t:'Kneel, and see it into him a mouthful at a time, however long it takes.', check:['wits', 19], witness:true, req:()=>!S.f.b10_c5_giveTried, fx:()=>{ S.f.b10_c5_giveTried = 1; },
            edges:id=>[id === 'mirrel' && ['she has given water to the fevered all her life', 2], id === 'marrow' && ['she sits with the dying, child, and they drink for her', 2], id === 'pruss' && ['he has watered a failing beast a mouthful at a time', 1], id === 'haddat' && ['she will not let him go', 1], id === 'tegra' && ['her people give water by the mouthful', 1], id === 'sathi' && ['patience is not her gift', -1], id === 'tangle' && ['his hands shake when he is not counting', -1]],
            near:{t:()=>`Yes, but his hand finds the skin and closes on it and will not let go, and it takes two of the Third to get it back with anything left in it. ${b105Nmc(b105Who())} will carry that face a while: rattled.`, fx:()=>b105Rattle(b105Who())},
            go:'b10_c5_give_ok', fail:'b10_c5_give_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c5_give_ok:()=>({sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), fx:()=>{ b105Gave('kept'); }, txt:
`It goes in a mouthful at a time, and ${by({sgt:'you wait', mirrel:'Mirrel waits', haddat:'Haddat waits', pruss:'Pruss waits', _:'{who} waits'})} between each, and it stays down, every one. By the end of it the youngest's eyes have someone behind them again. He looks at the Third, and does not understand, and then does.

${b105S('His file\'s corporal', 'The carters\' foreman')} gives the empty ${b105Hauled() ? 'dipper' : 'skin'} back. "We'll remember the Third," ${b105S('she', 'he')} says. It is a thing people say. She says it as if she means to.${b105Thirst()}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c5_give_no:()=>({sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), fx:()=>{ b105Gave('slow'); }, txt:
`Too fast, the first time, and it comes back up and is gone into the ${b105S('glass', 'dust')}, and the whole file makes a sound. Slower after that. Most of it stays down. Most.

By the end of it the youngest is breathing better and looking at nothing in particular, which is better than before. ${b105S('His file\'s corporal', 'The carters\' foreman')} gives the empty ${b105Hauled() ? 'dipper' : 'skin'} back, and nods.${b105Thirst()}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    /* 'hold': keep it for the squad */
    b10_c5_key_hold:()=>({sp:'The last water', scene:b105S('b10_glass', 'b10_south'), html:witnessHTML(), txt:
`${b105Hauled() ? 'The bung goes back into the barrel, and Haddat hammers it home with the edge of her shield.' : 'The skin goes back on its spear-shaft in the shade, and Haddat leans her shield against the shaft.'} She does it without a word, and does not look east.

The regulars under the next cloak do not look at the Third either. That is worse than if they had.${b105Say({mirrel:'\n\nMirrel goes across anyway, with nothing in her hands, and sits with their youngest a while and wets his lips with her own spit, and comes back. "Tonight," she says. "If nothing." She sits down. She does not take her mouthful when it comes round.', tangle:'\n\nTangle says the sum again under his breath. "Six of us a little," he says. "That\'s the sum." He does not sound sure it is a good one.', _:''})}${b105If('pruss', `\n\nPruss sits with his back to the water and his old sergeant's helm in his lap. "Right to, maybe," he says. "Maybe."`)}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the empty tailboard: the clerk; the chapter's one rumour */
    b10_c5_tail:()=>({sp:'The tailboard', scene:b105S('b10_glass', 'b10_south'), fx:()=>{ S.f.b10_c5_rumour = 1; }, again:()=>'The empty tailboard, the clerk asleep on it.', txt: b105South() ?
`The Twelfth's tailboard, with the ladle hung up on its nail and the line on the measuring stick showing dry. A Letherii clerk is sitting on it with his slate on his knee, not writing.

"The King's ships are at the coast," he says, when he sees the Third. "Word came down the line from the staff. Ships, and supplies, and water." He looks at the slate. "If it's true." He looks at the road south. "It had better be true."` :
`The company's tailboard, with the ladle hung up and the notched stick that measured the line lying across the empty barrels. The clerk is asleep on it, sitting up, with his slate in his lap.

He wakes when the Third comes near and says, before anyone can ask, "Word up the column is a Fist tried to take the water." He shuts his eyes again. "Word doesn't say what happened after. Word never does." Then he is asleep again, or pretending.${b105Say({haddat:'\n\nHaddat looks up the column a long while. "That is not a name I will say," she says. "Whoever he is."', tangle:'\n\nTangle looks at the empty barrels. "Take it where?" he says. "There isn\'t any."', _:''})}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the next cloak over: the regulars' file, the youngest failing; stragglers come for their last skin (the optional fight) */
    b10_c5_next:()=>{ if (S.f.b10_c5_stragDone || S.f.b10_c5_stragLeft || !S.f.b10_c5_orders) return {sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), txt:
`${b105South() ? 'The next wagon over, the Twelfth\'s carters lying in its shade round a boy who has gone quiet.' : 'The next cloak over: a file of the regulars, lying close round their youngest, who has gone quiet.'}${S.f.b10_c5_gave ? ' He is sitting up now. He watches the Third go by.' : b105Key() === 'hold' ? ' None of them looks up.' : ''}`,
        ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]};
      return {sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), again:()=>'The next cloak over, and the shapes coming across the glass toward it.', txt:
`${b105South() ? 'The next wagon over, the Twelfth\'s carters in its shade round a boy who has gone quiet, and one skin between them, flat.' : 'The next cloak over: a file of the regulars, five of them, lying close round their youngest, and one skin between them with a little in it.'}

Coming across the ${b105S('glass', 'road')} toward it, not quickly, are three ${b105S('soldiers from somewhere up the column, with no officer', 'Bolkando carters, from a wagon that went dry')}. They walk wrong, too fast and then too slow. One is big, and has a tent-pole. They are looking at the skin. The file under the cloak is too far gone to stand up.${b105Say({haddat:'\n\nHaddat is already on her feet. "That is not their water," she says.', pruss:'\n\nPruss is already on his feet. "That\'s not theirs," he says.', _:''})}`,
        ch:[{t:'"Third. Up. Between them and that skin."', go:()=>startBattle('b10_c5_stragglers', {})},
            {t:'Get there first, along the cloaks, low, and be standing over the skin when they arrive.', check:['guile', 19],
              edges:id=>[id === 'sathi' && ['she came at Odhan camps this way for the Weasels', 2], id === 'tegra' && ['her people hunt across open ground', 2], id === 'mehet' && ['he grew up out of sight in Y\'Ghatan', 1], id === 'wenna' && ['she reads the ground for its low places', 1], id === 'pruss' && ['heavy scale in the glare is a mirror', -1], id === 'ottar' && ['grey plate in the glare is a bigger mirror', -2]],
              near:{t:()=>`Yes, but the ${b105S('glass', 'road')} is hot enough to burn through a glove, and ${b105Nm(b105Who())} ${b105V(b105Who(), 'go', 'goes')} down on a hand on it getting there. ${b105Nmc(b105Who())}'ll carry that into the fight.`, fx:()=>bruise(b105Who(), bruiseN())},
              go:()=>startBattle('b10_c5_stragglers', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c5_strag_seen'},
            {t:'"Not our water. Leave it." Their own company can see to them.', fx:()=>{ S.f.b10_c5_stragLeft = 1; }, go:'b10_c5_strag_left'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c5_strag_seen:()=>({sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), txt:
`The big one sees the Third coming along the cloaks and swings the tent-pole round, and they come on at a run.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c5_stragglers', {surprise:'e'})}]}),
    b10_c5_strag_left:()=>({sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), txt:
`The Third stays under its cloaks. Across the ${b105S('glass', 'road')}, a sergeant of the regulars comes out from under a cloak further along with a stave in her hand and her helm off, and stands over the skin, and the three of them look at her and stop, and after a while turn round and go back the way they came.

It worked out. It could have not. The Third watched it either way.`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c5_strag_after:()=>({sp:b105S('The next cloak', 'The next wagon'), scene:b105S('b10_glass', 'b10_south'), fx:()=>{ S.f.b10_c5_stragDone = 1; }, txt:
`They are down, all three, and they stay down, the big one sitting with the tent-pole across his knees and his head hanging. None of them is killed. The Third had not the spit for it.

${b105South() ? 'A Bolkando foreman comes along the road and takes them back with him, one at a time, without a word to anyone.' : 'A sergeant of their own comes for them, a long way down the column, and takes them back between two of her corporals. She looks at the Third, and at the file under the cloak, and nods once.'}

The file's skin is where it was, with a little in it. One of the regulars puts a hand on it and leaves it there.${b105If('pruss', `\n\nPruss sits down by the next cloak a moment, as if to rest. He is between them and the open glass, in case.`)}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the old marine: the Deck's third reader, and the trick, The Last Mouthful (a Witness check: holding on) */
    b10_c5_oldmarine:()=>{ const ph = b105Ph();
      if (ph >= 3) return {sp:'The old marine', scene:b105Wet(), again:()=>'The old marine, by the water, with his cup full.', txt:
`The old marine is sitting by the ${b105S('water', 'trough')} with his cup full for the first time anyone can remember, and he is not drinking it. He is looking at it. "Fifty years," he says. "Three deserts. Never seen ${b105S('the ground do that', 'a well that sweet')}." He drinks, then, all of it, and fills it again. "Don't ask me what it means. I only read the cards."`,
        ch:[{t:'Back to the water.', go:()=>startExplore()}]};
      return {sp:'The old marine', scene:b105S('b10_glass', 'b10_south'), fx:()=>{ S.f.b10_c5_old = 1; }, again:()=>'The old marine, under his cloak, with his cards and his cup.', txt:
`The old marine is under a cloak with his deck in his lap and his cup upside down beside him. He is breathing through his nose, slow, and his mouth is shut. When he talks it comes out a little thick, as if round something.

"${b105South() ? 'Lent south,' : 'Still walking,'}" he says. "Fewer of us." He taps his cheek. "Old hands' trick. One mouthful, never swallowed. Breathe round it. Mouth stays wet, head stays clear." He shrugs. "Fifty years, three deserts. Same mouthful, I tell people." He does not smile. "Want to see? Most can't. Most swallow."${S.f.b10_c5_mouthfulOk ? '\n\nThe Third has it already. He nods at it.' : ''}`,
        ch:[...(ph === 1 ? [b10ReadChoice(5)] : []),
            {t:'Learn to hold the last mouthful and breathe round it until it matters.', check:['wits', 21], trick:'b10_c5_mouthful', witness:true, req:()=>!S.f.b10_c5_mouthTried, fx:()=>{ S.f.b10_c5_mouthTried = 1; },
              edges:id=>[id === 'mirrel' && ['she knows thirst better than anyone in the Third', 2], id === 'tegra' && ['her people carry water in the mouth across the dry country', 2], id === 'sgt' && ['you marched behind the Fourteenth\'s wagons through a holy desert', 1], id === 'darrut' && ['the Aren Guard\'s rule: never drink the last of it', 1], id === 'sathi' && ['the Weasels crossed bad country by night', 1], id === 'wenna' && ['she knows water by its weight', 1], id === 'tallow' && ['he swallows when he is nervous', -1], id === 'mehet' && ['a townsman, used to wells', -1]],
              go:'b10_c5_mouthful_ok', fail:'b10_c5_mouthful_no'},
            {t:'Back to the lie-up.', go:()=>startExplore()}]}; },
    b10_c5_mouthful_ok:()=>({sp:'The old marine', scene:b105S('b10_glass', 'b10_south'), fx:()=>{ S.f.b10_c5_mouthfulOk = 1; }, txt:
`${by({sgt:'You take', mirrel:'Mirrel takes', tegra:'Tegra takes', _:'{who} takes'})} the one mouthful, and does not swallow it. It wants to go down. Everything in the throat wants it to go down. Breathe round it, through the nose, slow. The want goes on. The mouthful stays.

After a while the head is clearer than it has been since the glass began. Not better. Clearer.

"There," says the old marine. "Now you carry it until it matters. You'll know when." He turns his cup over. "Most people swallow it the first night. Don't be most people."`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c5_mouthful_no:()=>({sp:'The old marine', scene:b105S('b10_glass', 'b10_south'), txt:
`It goes down. It goes down before anyone decides to let it, and is gone, and the mouth is dry again at once, drier than before.

"Most swallow," says the old marine, without unkindness. "That's why it's an old hands' trick. You have to be old first."`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the rise to the west: look back the way the army came (the chapter's one Witness "yes, but") */
    b10_c5_look:()=>({sp:'The rise', scene:b105S('b10_glass', 'b10_south'), again:()=>b105S('The rise of glass, and the long way back west.', 'The rise by the road, and the dry country north.'), txt: b105South() ?
`From a rise beside the road you can see north across the dry country to where the glass is a paleness on the horizon, the army somewhere on it. And south and east, the grey knights' dust, bending away from the road, going off east on its own, as if the knights had remembered an appointment.${S.f.b10_c5_lookTried ? '' : '\n\nIf you looked long enough you might tell yourself what you are seeing.'}` :
`From a low rise of glass at the lie-up's west edge you can see back the way the army came. The track runs straight to the end of the world, a long scuffed line in the glare, and here and there along it something dark that is not moving: a wagon left, a beast down, a pack set by someone who meant to come back for it.${S.f.b10_c5_lookTried ? '' : '\n\nIf you looked long enough you might see how far it is.'}`,
      ch:[{t:b105South() ? 'Look until you can tell yourself what you are seeing.' : 'Look back until you can see how far the army has come.', check:['wits', 19], req:()=>!S.f.b10_c5_lookTried, fx:()=>{ S.f.b10_c5_lookTried = 1; },
            edges:id=>[id === 'tebbet' && ['a bowman\'s eye for a far mark', 2], id === 'tegra' && ['her people read the far ground', 2], id === 'orvas' && ['the Khundryl read distance on the plain', 1], id === 'yorin' && ['he watches horizons', 1], id === 'tallow' && ['he sees what he expects to', -1]],
            near:{t:()=> b105South() ? `Yes, but the longer ${b105Nm(b105Who())} ${b105V(b105Who(), 'look', 'looks')}, the plainer it is that the grey knights are going their own way and the army is going its own, and the long way round is long for nobody but the ones on it. The squad carries that back to the road.` : `Yes, but the longer ${b105Nm(b105Who())} ${b105V(b105Who(), 'look', 'looks')}, the plainer it is that there is no going back now: the way back is longer than the way on, and there is nothing back there either. The squad carries that back under the cloaks.`, fx:()=>{ b10Witness(-1, 'no way back'); }},
            go:'b10_c5_look_ok', fail:'b10_c5_look_no'},
          {t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c5_look_ok:()=>({sp:'The rise', scene:b105S('b10_glass', 'b10_south'), fx:()=>{ S.f.b10_c5_look = 1; }, txt: b105South() ?
`${by({sgt:'You look', tebbet:'Tebbet looks', tegra:'Tegra looks', _:'{who} looks'})} until the eyes water. The paleness to the north stays a paleness. The dust to the east goes on bending away, and does not come back. The grey knights have gone off on their own road. Whatever they are marching for now, it is not this.` :
`${by({sgt:'You look', tebbet:'Tebbet looks', tegra:'Tegra looks', _:'{who} looks'})} until the eyes water, and it is a long way. Further than anyone in the Third would have said they could walk on what they had. They walked it.

The Third turns its back on it and goes back under the cloaks. East is shorter. East has to be shorter.`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c5_look_no:()=>({sp:'The rise', scene:b105S('b10_glass', 'b10_south'), fx:()=>{ S.f.b10_c5_look = 1; }, txt:
`The glare comes up off ${b105S('the glass', 'the dry country')} and swims, and the far ground goes to white, and after a while there is nothing to see but the inside of your own eyelids, bright. Back under the cloaks.`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the west edge: the column lying up (the heavies' captain seen; or the brigades on 'south') */
    b10_c5_west:()=>({sp:b105S('The column', 'The brigades'), scene:b105S('b10_glass', 'b10_south'), again:()=>b105S('The column lying up west under its cloaks.', 'The brigades along the road.'), txt: b105South() ?
`West and south along the road the brigades lie up wagon by wagon. There are fewer horses on the pickets than there were. There are more carters asleep in the open, too tired to find shade.

Far down the line, small, the Commander's banner hangs on its pole without any wind to lift it.` :
`West, the column lies up under its cloaks as far as the glare lets anybody see, and there are more gaps in it than there were: places where the cloaks did not go up.

The heavies' captain is walking the line slowly, stopping at every cloak. He stops at the Third's, and looks at each of them, and nods, and goes on. He is not carrying a skin.${b105If('pruss', `\n\nPruss watches the captain go. "He gave his," he says. "Saw him at the halt." He does not say who to.`)}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* ======== the circle: by phase. 1 the lie-up, 2 the halt in the night (the fire with no fire; the beat), 3 the water,
       4 the glass's far edge (a real fire). The games pass wraps this node: keep the id ======== */
    b10_c5_fire:()=>{ const ph = b105Ph(), beatOpen = (ph === 2 || ph === 4) && !b10BeatOf(5);
      if (ph === 3) return {sp:'The water', scene:b105Wet(), html:witnessHTML(), txt:
`There is no circle at the water. The Third is wherever it is along the ${b105S('edge', 'trough')}, drinking, and that will have to do.`,
        ch:[{t:'Back to the water.', go:()=>startExplore()}]};
      if (ph === 2) return {sp:'The halt', scene:b105Scene(true), html:witnessHTML(), fx:()=>{ S.f.b10_c5_halt = 1; }, again:()=>'The halt in the night. No fire. No water. The squad in a ring on the ground.', txt:
`Somewhere in the middle of the night the column stops. No word comes down the line. It just stops, the way a tired thing stops, and the files sit down where they stand.

The fire with no fire: the Third in a ring on the ${b105S('glass', 'road')}, knees nearly touching, with nothing in the middle. ${S.f.b10_c5_key === 'hold' ? `${b105Hauled() ? 'The last of the barrel, drawn off into a skin at dusk,' : 'The skin'} goes round, the last of it, a mouthful each, and comes back empty, and Haddat hangs it on her belt.` : 'Nothing goes round. There is nothing to go round.'} ${b10Hollow() || b10WitTier() === 'doubt' ? 'Nobody talks much. There is not the spit for it.' : 'They talk a little, low, in the dark, about nothing, so each of them can hear the others are still there.'}${b105If('pruss', `\n\nPruss sits with his old sergeant's helm in the middle of the ring, upside down, empty, where a fire would be.`)}`,
        ch:[...(beatOpen ? [{t:'"What are we marching for?" Ask it, here, with nothing in the middle.', go:'b10_c5_beat'}] : []),
            {t:'Walk on.', go:()=>startExplore()}]};
      const later = ph >= 4, rk = later ? 'b10_c5_rest4' : 'b10_c5_rest1';
      return {sp:later ? 'The Third\'s fire' : 'The Third\'s circle', scene:later ? 'b10_kolanse' : b105S('b10_glass', 'b10_south'), html:witnessHTML(),
        again:()=> later ? 'The Third\'s fire, in the scrub. A real one.' : 'The Third\'s circle under the cloaks. No fire.', txt: later ?
`A fire. A real one, of thorn and dead scrub, the first since the glass, small and smoky and crackling, and the Third sitting round it closer than it needs to, for the look of it. ${S.f.b10_c5_ridersDone ? 'Out past the scrub, the outriders\' horses are standing with their heads down at a helm of water, and nobody is sure what to do with them.' : 'East, at the scrub\'s edge, the picket line, and beyond it the dust of a dry country.'}${b105If('pruss', `\n\nPruss sits with his back to a thorn-bush and his old sergeant's helm by his boot, full of water, which he keeps looking at.`)}` :
`${b105South() ? 'No fire at a lie-up on the long way round: no wood, and nobody wants the day any hotter. The Third\'s fire is its circle in the wagon\'s shade.' : 'There is no fire in the glass. Nothing to burn, and nothing to cook, and nothing to drink. The Third\'s fire is its circle under the cloaks, knees nearly touching.'}${b105KeyDone() ? ' When the shade of the cloaks starts to lengthen, the column will get up, or it will not.' : ''}${b105If('pruss', `\n\nPruss sits with his back to ${b105Hauled() ? 'the wagon wheel' : 'his pack'}, his old sergeant's helm by his boot.`)}`,
        ch:[...(ph === 1 ? [b10ReadChoice(5)] : []),
            ...(beatOpen ? [{t:'"What are we marching for?" Ask it again, at a real fire.', go:'b10_c5_beat'}] : []),
            {t:later ? 'Sit by the fire an hour. Let the squad rest.' : 'Lie up an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(later ? 'The squad sits by the fire an hour with full skins. Wounds close. The thirst goes, the way thirst goes, all at once and then for good.' : 'The squad lies up an hour under the cloaks. Wounds close, slowly.'); }, go:'b10_c5_fire_rest'},
            {t:'Talk with the squad.', go:'b10_c5_fire_talk'},
            {t:'Dusk. Up, and on.', req:()=>ph === 1 && b105KeyDone(), onward:true, fx:()=>{ S.f.b10_c5_ph = 2; }, go:()=>{ startExplore('b10_c5_march'); talk('b10_c5_dusk'); }},
            {t:'On. Up out of the scrub.', req:()=>later && !!S.f.b10_c5_lent, onward:true, go:'b10_c5_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c5_fire_rest:()=>{ const later = b105Ph() >= 4;
      return {sp:later ? 'The Third\'s fire' : 'The Third\'s circle', scene:later ? 'b10_kolanse' : b105S('b10_glass', 'b10_south'), txt: later ?
`An hour by the fire, then, with full skins and nothing to do, which nobody in the Third can remember having.

${b105Say({marrow:'Marrow goes round with her hands, and this time the Lady is close, and the cuts close quickly under them. "There," Marrow says. "She was only waiting for us to have water."', mirrel:'Mirrel goes round with her herbs wetted and green again, and binds what needs binding, and hums.', _:'Some of them sleep. Some of them drink, and sleep, and wake, and drink again.'})}${b105If('pruss', `\n\nPruss sleeps sitting up against the thorn-bush, the way carters sleep on a long road, with his hand round the helm full of water.`)}` :
`An hour, then, under the cloaks, with the heat on the cloth like a hand.

${b105Say({marrow:'Marrow goes round with her hands, and the Lady is very far off, and the cuts close slowly, and some of them not at all.', mirrel:'Mirrel goes round with nothing in her hands and looks at every one of them, which is something.', _:'Some of them sleep. The rest lie still.'})}`,
        ch:[{t:'Back to the fire.', go:'b10_c5_fire'}]}; },
    b10_c5_fire_talk:()=>{ const later = b105Ph() >= 3, ln = [];
      Object.keys(B105TALK).forEach(id => { if (b10In(id)) ln.push(B105TALK[id][later ? 1 : 0]()); });
      return {sp:later ? 'The Third\'s fire' : b105Ph() === 2 ? 'The halt' : 'The Third\'s circle', scene:later ? 'b10_kolanse' : b105Scene(b105Ph() === 2), txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b10_c5_fire'}]}; },

    /* ======== phase 2: the night march ======== */
    b10_c5_dusk:()=>({sp:b105S('The night march', 'The road south'), scene:b105Scene(true), fx:()=>{ if (!b105South()) S.f.b10_c5_children = 1; }, again:()=>'The column walking in the dark, slow, no lamps.', txt: b105South() ?
`At dusk the brigades get up out of the shade, and the carters put to what teams are left, and the column goes on south in the dark without a lamp. It is slower than it was. The road under it has begun, here and there, to have grass on it: dry, dead, but grass.

The Twelfth's wagon rolls ${b105Hauled() ? 'with its last barrel and the Third walking beside it' : 'light, and the Third walks beside it, light'}.${b105If('pruss', `\n\nPruss walks with his hand on the wagon's side, where an ox's neck would be.`)}` :
`At dusk the column gets up out of its cloaks, most of it, and goes on east in the dark. The stars come out overhead and then underfoot. It walks slower than it did. Files stop and start again. A soldier ahead is singing under his breath, the same three notes over and over, and is let be.

Far off along the column's flank, as the light goes, there are children walking with it, from somewhere east, and nobody near the Third knows how they came to be there.

${b105Say({haddat:'Haddat walks with her eyes on the back in front of her and her lips moving.', tangle:'Tangle walks with his hand on the satchel strap, not counting.', _:'The Third walks.'})}${b105If('pruss', `\n\nPruss walks at the back of the Third, where a file-closer walks, and puts a hand on any back that slows.`)}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    /* Thallo (or the wagon-master) in the dark */
    b10_c5_thallo2:()=>({sp:b105S('Thallo', 'The Twelfth\'s wagon-master'), scene:b105Scene(true), fx:()=>{ S.f.b10_c5_thallo2 = 1; }, again:()=>`${b105BossC()}, walking, saving his words.`, txt: b105South() ?
`The wagon-master is walking at the wagon's tongue with his ledger under his arm and his eyes shut, steering by the creak. "Not far to the coast now, the carters say," he says. "I don't believe carters." He opens one eye. "The Commander believes them. So." He shuts it again.` :
`Thallo walks out of the dark beside the Third, very big and very slow. He has his own skin on his belt, flat. He tips it to show the Third. Empty. He has not had it full since the last halt, and the Third did not see where it went.

"Captain's walking," he says, in the gravel voice. "Officers too, all the way up. On foot, same as us." He walks a while. "Keep walking, Third."${b105If('pruss', `\n\nPruss falls in beside him, step for step. Neither of them says anything else.`)}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    /* the rearguard: the one line of the Letherii */
    b10_c5_rear:()=>({sp:b105S('The rearguard', 'The train\'s tail'), scene:b105Scene(true), fx:()=>{ S.f.b10_c5_rear = 1; }, again:()=>b105S('The rearguard, walking slow.', 'The tail of the train.'), txt:
`${b105South() ? 'West, the train strings out down the road behind the Twelfth, wagon after wagon, the carters at the teams\' heads.' : 'West, the rearguard walks behind the last wagon, slower than the column, picking up whoever sits down and getting them up again.'}

${b105Rumour()}${b105If('haddat', `\n\nHaddat listens, and adds a word to the names under her breath: <em>Letherii</em>, again.`)}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),

    /* the Witness beat: the fire with no fire, the water gone, before the ground goes wet (or, on 'Not now', at the far edge's fire) */
    b10_c5_beat:()=>({sp:b105Ph() >= 4 ? 'The Third\'s fire' : 'The halt', scene:b105Ph() >= 4 ? 'b10_kolanse' : b105Scene(true), html:witnessHTML(), txt:
`${b105Ph() >= 4 ? 'The fire, small and smoky, and the Third close round it.' : 'The ring in the dark, nothing in the middle, the stars above and below. Somewhere along the column a soldier is crying without any water to do it with, a dry sound, and stops.'}

${b105Say({haddat:'Haddat looks at you across the ring. "Ask it again," she says. "Harder. It is harder now."', tangle:'Tangle says, "Go on. Ask. I need to hear what I say."', pruss:'Pruss turns the empty helm in the middle of the ring. "Old sergeant asked it at the last," he says. "Go on."', _:'Somebody in the ring is waiting for you to ask.'})}

What are we marching for?`,
      ch:[{t:'"Our own witness. We see it. We were here. That has to be enough."', fx:()=>{ b10Beat('kept', 'our own witness'); S.f.b10_c5_beat = 'own'; }, go:'b10_c5_beat_done'},
          {t:'"Nothing. Nobody will ever know we were here."', fx:()=>{ b10Beat('doubt', 'nobody will ever know we were here'); S.f.b10_c5_beat = 'nobody'; }, go:'b10_c5_beat_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c5_beat_done:()=>{ const w = S.f.b10_c5_beat;
      return {sp:b105Ph() >= 4 ? 'The Third\'s fire' : 'The halt', scene:b105Ph() >= 4 ? 'b10_kolanse' : b105Scene(true), html:witnessHTML(), txt:
`${w === 'own' ? b105Say({haddat:'Haddat nods. "Our own witness," she says. She says it again, slowly, the way you say a name you mean to keep. "An officer said that once, in a tent, they say. I did not believe it then."', pruss:'Pruss looks round the ring, every face. "We were here," he says. "I saw you. That\'ll do me."', marrow:'Marrow puts her hand on the nearest knee. "We see it, child," she says. "We see each other. The Lady does not ask for more."', _:'Somebody says it back, "our own witness", the old saying, and somebody else says it, and it goes round the ring like the skin used to.'})
  : b105Say({tangle:'Tangle nods slowly. "Honest," he says. "It\'s honest." He looks at his hands in the dark. "I hate honest."', mirrel:'Mirrel puts her hand on the nearest back, and leaves it there.', pruss:'Pruss looks at the empty helm. "My lot said that too," he says. "On the stretch. They were right, mostly." He picks it up.', _:'The ring does not argue. It has not the spit.'})}${b105If('pruss', w === 'own' ? `\n\nPruss sets the empty helm back down in the middle of the ring, upside down, and leaves it there.` : '')}

${b105Ph() >= 4 ? 'The fire cracks. The Third sits close to it.' : 'Up the column a word comes down the line, and the files get up, slowly, all of them, and go on.'}`,
        ch:[{t:b105Ph() >= 4 ? 'Back to the fire.' : 'Walk on.', go:()=> b105Ph() >= 4 ? talk('b10_c5_fire') : startExplore()}]}; },

    /* the way east at the night area's edge: after the halt, the ground going wet */
    b10_c5_east:()=>({sp:b105S('The column', 'The road'), scene:b105Scene(true), txt: S.f.b10_c5_halt ?
`East, the column is walking again, toward a sky that is beginning, very faintly, to be grey. ${b105South() ? 'The road under it smells of dust, and of something else under the dust.' : 'The glass under it is cold, and something about the sound of the boots on it has changed.'}` :
`East, the column walks on into the dark, slower and slower. Somewhere ahead it is going to stop.`,
      ch: S.f.b10_c5_halt ? [{t:'On, toward grey light.', onward:true, fx:()=>{ S.f.b10_c5_ph = 3; }, go:()=>{ startExplore('b10_c5_lake'); talk('b10_c5_wet'); }},
                             {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the column.', go:()=>startExplore()}]}),

    /* ======== phase 3: grey light, and the water (on 'south', the first well in Kolanse) ======== */
    b10_c5_wet:()=>({sp:b105S('The wet ground', 'The first well'), scene:b105Wet(), html:witnessHTML(), fx:()=>{ b105Lake(); }, again:()=>b105S('The glass gone wet underfoot, and the water in front of the column.', 'The first well in Kolanse, and the trough beside it.'), txt: b105South() ?
`Grey light, and the road comes over a low rise, and there below it is a village: a dozen houses of dried mud with no roofs to speak of, a field gone to dust, an empty granary with its door open. And in the middle of it a well, with a stone lip and a rope and a bucket.

The carters get to it first. Then the Twelfth. Then the Third. The rope comes up wet, and the bucket comes up full, and it is cold, and it is sweet, and the only sound while it goes round is swallowing.

The first well in Kolanse. ${b105Say({haddat:'Haddat drinks, and passes it, and says the names, all of them, aloud, with spit in her mouth to say them.', tangle:'Tangle drinks, and counts the bucket as it goes round, and laughs, because there is no point counting it.', _:'The Third drinks.'})}${b105If('pruss', `\n\nPruss holds the bucket for the carters' boy from the next wagon before he drinks himself.`)}` :
`Grey light, and somewhere ahead of the Third the column has stopped again. Not the tired stop. Something else: a noise going down the line, not words, and the files bunching.

Then the glass underfoot goes dark. Not the dark of night. Wet. The boots are wet. The glass is wet, and then it is not glass, it is mud, and then a little further on it is water, standing, spreading, cold, under the whole column at once, and nobody near the Third saw where it started.

Everybody is on their knees. ${b105Say({haddat:'Haddat is on her knees with her face in it, and comes up, and says the names, all of them, aloud, with water running off her chin.', tangle:'Tangle is on his knees with both hands in it, not drinking yet, just holding them there, as if it might be counted.', _:'The Third is on its knees with everybody else.'})}${b105If('pruss', `\n\nPruss kneels, and fills his old sergeant's helm, and holds it a moment before he drinks, the way you hold a cup at a burial.`)}`,
      ch:[{t:b105S('Get the squad to the water.', 'Get the squad to the well.'), go:'b10_c5_water'},
          {t:'Look about you.', go:()=>startExplore()}]}),
    b10_c5_water:()=>{ if (S.f.b10_c5_drank) return {sp:b105S('The water', 'The well'), scene:b105Wet(), txt:
`${b105South() ? 'The well, and the trough, and the column queued at both, quiet, patient, with full skins on every back.' : 'The water, spreading still, the column along its edge filling everything that will hold it, and the light coming up over it.'} The Third's skins are full. ${S.f.b10_c5_drank === 'first' ? 'Every one.' : 'Most.'}`,
        ch:[{t:'Back to it.', go:()=>startExplore()}]};
      return {sp:b105S('The water', 'The well'), scene:b105Wet(), again:()=>'The water, and the press of the column at its edge.', txt:
`The whole column is coming to the ${b105S('water', 'well')} at once, and the ${b105S('edge', 'trough')} is a press of bodies and skins and helms and hands, and the ones at the back pushing, and the ones at the front in no hurry to move. It is good-natured. It is very nearly not.

${b105Say({tangle:'Tangle has every skin the Third owns over his shoulder. "Every one," he says. "Full. All of them."', pruss:'Pruss looks at the press and squares his shoulders. "Wedge," he says. "Like a wagon through a crowd."', _:'The Third has its empty skins, and its helms, and the press in front of it.'})}`,
        ch:[{t:'Through the press, a wedge of shields, and fill every skin the Third owns before the rest come down.', check:['might', 19], req:()=>!S.f.b10_c5_waterTried, fx:()=>{ S.f.b10_c5_waterTried = 1; },
              edges:id=>[id === 'pruss' && ['a carter\'s son: he has put a wagon through a market', 2], id === 'brask' && ['heavies push; it is the job', 2], id === 'haddat' && ['the blue shield, and her shoulder behind it', 1], id === 'ottar' && ['grey plate parts a crowd', 1], id === 'marrow' && ['she is not built for a press, child', -1], id === 'mehet' && ['a townsman, and slight', -1]],
              near:{t:()=>`Yes, but somebody's elbow in the press catches ${b105Nm(b105Who())} under the ribs, hard, and the breath goes out and does not come back for a while. ${b105Nmc(b105Who())}'ll feel that a while.`, fx:()=>bruise(b105Who(), bruiseN())},
              go:'b10_c5_water_ok', fail:'b10_c5_water_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c5_water_ok:()=>({sp:b105S('The water', 'The well'), scene:b105Wet(), fx:()=>{ b105Drank('first'); }, txt:
`The shields go up in a wedge, and the Third goes into the press like a wagon into a market, slowly, politely, not stopping, and comes out at the ${b105S('water\'s edge', 'trough')} with every skin it owns.

They fill. Every one. ${by({sgt:'You', tangle:'Tangle', pruss:'Pruss', _:'{who}'})} ${by({sgt:'stoop', _:'stoops'})} to fill the last, and the hand comes up with a stone in it, dark and plain and cold, ${b105S('from the wet ground under the water', 'from the bottom of the trough')}, and it goes in a pocket without anyone quite deciding to keep it.`,
      ch:[{t:'Back to it.', go:()=>startExplore()}]}),
    b10_c5_water_no:()=>({sp:b105S('The water', 'The well'), scene:b105Wet(), fx:()=>{ b105Drank('press'); }, txt:
`The press closes, and opens, and closes again, and the Third gets to the ${b105S('water', 'trough')} in the end with everybody else, and fills most of what it carries, slowly, with elbows in its back.

A stone comes up out of the ${b105S('wet', 'trough')} in somebody's hand to make room, dark and plain and cold, and ends up in a Third pocket. Whose idea that was, the squad never settles.`,
      ch:[{t:'Back to it.', go:()=>startExplore()}]}),
    /* Thallo (or the wagon-master) at the water */
    b10_c5_thallo3:()=>({sp:b105S('Thallo', 'The Twelfth\'s wagon-master'), scene:b105Wet(), fx:()=>{ S.f.b10_c5_thallo3 = 1; }, again:()=>`${b105BossC()}, sitting by the water.`, txt: b105South() ?
`The wagon-master is sitting on the well's lip with his ledger open, writing in it at last, a long line. He shows it to the Third: a column of figures, and at the bottom of it, in Letherii, a word.

"Water," he says. "I don't need to write it. I wanted to." He shuts the ledger. "The Twelfth will be asking for you, Sergeant. When we get where we're going." He does not say what for.` :
`Thallo is sitting in the wet with his legs out in front of him like somebody at the sea's edge, and he is eating. A heel of bread from somewhere, the size of a fist, all at once, and water after it, and more bread.

"Didn't ask," he says, with his mouth full, before anyone can. "Didn't see. Up front, the ground went wet. That's all I've got." He drinks. "That's all anybody's got." He laughs, which nobody has heard him do since the camp after the short-tails. "Drink, Third."${b105If('pruss', `\n\nPruss sits down beside him in the wet. They do not say anything. They drink.`)}`,
      ch:[{t:'Back to the water.', go:()=>startExplore()}]}),
    b10_c5_lakewest:()=>({sp:b105S('The way back', 'The road back'), scene:b105Wet(), txt:
`West, ${b105S('the glass goes back to the end of the world, pale in the grey light, and nobody in the column is looking at it', 'the road goes back north and west toward the paleness of the glass, and nobody is looking at it')}.`,
      ch:[{t:'Back to the water.', go:()=>startExplore()}]}),
    b10_c5_lakeeast:()=>({sp:b105S('The far edge', 'The road on'), scene:b105Wet(), txt: S.f.b10_c5_drank ?
`East, ${b105S('the glass runs on, but not far now: on the horizon there is a line of something that is not glass, low and dark and ragged. Scrub. Thorn. Ground that grows things.', 'the road runs on toward thin fields and a scatter of mud houses, Kolanse proper.')}` :
`East, the ${b105S('glass', 'road')} runs on. The Third has water to get first.`,
      ch: S.f.b10_c5_drank ? [{t:'On, to the far edge.', onward:true, fx:()=>{ S.f.b10_c5_ph = 4; }, go:()=>{ startExplore('b10_c5_scrub'); talk('b10_c5_scrubarrive'); }},
                              {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the water.', go:()=>startExplore()}]}),

    /* ======== phase 4: the glass's far edge, the first scrub of Kolanse ======== */
    b10_c5_scrubarrive:()=>({sp:b105S('The far edge', 'Kolanse'), scene:'b10_kolanse', again:()=>'The first scrub of Kolanse, thorn and dust and thin fields beyond.', txt: b105South() ?
`By full day the column is at the edge of Kolanse's farmland: thin fields ploughed to dust, a granary with its door hanging open and nothing inside it, a ditch that was for water once. People at the field-edges, far off, thin, watching the column come up the road, not moving.

The brigades halt in what shade there is. The wagon-master is looking for the Third.` :
`By full day the column comes up out of the glass. Not all at once: the glass gets thinner, and duller, and has sand in it, and then there is a thorn-bush, grey and ragged and alive, and then another, and then the scrub, low and dry and going on east to a line of thin fields and a granary with its door hanging open.

Kolanse. ${b105Say({haddat:'Haddat stops at the first thorn-bush and puts her hand on it, very carefully, and takes it away with a scratch, and looks at the scratch like a gift.', tangle:'Tangle stops at the first thorn-bush and counts its thorns until somebody pushes him on.', _:'The Third walks into the scrub and does not quite believe it.'})}

Behind the Third the army is coming up out of the glass with full skins. Thallo is looking for the Third.`,
      ch:[{t:`${b105BossC()}.`, go:'b10_c5_thallo4'},
          {t:'Look about you.', go:()=>startExplore()}]}),
    /* Thallo (or the wagon-master): the picket */
    b10_c5_thallo4:()=>({sp:b105S('Thallo', 'The Twelfth\'s wagon-master'), scene:'b10_kolanse', fx:()=>{ S.f.b10_c5_picket = 1; }, again:()=>`${b105BossC()}. "The picket, Third. East, at the scrub's edge."`, txt: b105South() ?
`"The Commander wants pickets out at the field-edges," the wagon-master says. "Every company with a sergeant to spare." He looks at the Third. "I have drill-sergeants. So." He points east, past the last thorn, to where a dry wash comes up out of the fields. "Riders have been seen. Kolansii. The officers want none of them going home to say how many we are."` :
`Thallo has eaten again and looks a size larger for it. "Captain's word," he says. "Pickets out at the scrub's edge, heavies first. Third's got the wash." He points east, past the last thorns, where a dry wash comes up out of the fields toward the scrub.

"Word is the Assail think we died in the glass," he says. "Word is nobody's told them different. Captain would like it to stay that way." He looks at the Third. "Anyone sees us, they don't ride back. That's the word."${b105If('pruss', `\n\nPruss nods slowly. "Riders," he says. "They'll have horses." He sounds sorry for the horses.`)}`,
      ch:[{t:'"The wash, then."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* the outriders: the main fight */
    b10_c5_riders:()=>({sp:'Riders', scene:'b10_kolanse', again:()=>'The riders at the scrub\'s edge, closer, slowing.', txt:
`They come up the wash out of the fields at a walk, because their horses cannot do better: four riders, Kolansii by their long coats and their round shields, on horses so thin the hip-bones show. Outriders, sent out to look at the glass and see nothing on it. They are looking at the scrub.

They see the Third. Then, behind the Third, they see ${b105South() ? 'the southern column on the road' : 'the army coming up out of the glass'}. Every face goes the same way at once. It is not a face that expected to see anything alive.

One of them reaches for the reins to turn.${b105Say({haddat:'\n\nHaddat sets the blue shield. "Thin," she says. "Thinner than us." She does not lower it.', tangle:'\n\nTangle has a sharper in his hand and does not throw it yet. "They\'re starving," he says. "Same as everyone out here."', _:''})}`,
      ch:[{t:'"Third. Across the wash. Nobody goes home."', go:()=>startBattle('b10_c5_outriders', {})},
          {t:'Down in the thorn, all of you, and let them come up the wash into you.', check:['guile', 19],
            edges:id=>[id === 'sathi' && ['she has lain in thorn for the Weasels', 2], id === 'tegra' && ['her people hunt from cover', 2], id === 'tebbet' && ['a bowman knows how to wait in a bush', 1], id === 'orvas' && ['he knows how a rider looks, and where he doesn\'t', 1], id === 'pruss' && ['big, and his scale rattles', -1], id === 'ottar' && ['grey plate does not hide in a thorn-bush', -2]],
            near:{t:()=>`Yes, but the thorn is the real thing, long and hooked, and ${b105Nm(b105Who())} ${b105V(b105Who(), 'come', 'comes')} out of it bleeding in a dozen small places. ${b105Nmc(b105Who())}'ll feel that in the fight.`, fx:()=>bruise(b105Who(), bruiseN())},
            go:()=>startBattle('b10_c5_outriders', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c5_riders_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c5_riders_seen:()=>({sp:'Riders', scene:'b10_kolanse', txt:
`A horse smells the Third in the thorn before its rider sees anything, and throws its head up, and the riders are off their horses with blades out and coming.`,
      ch:[{t:'Up, and at them.', go:()=>startBattle('b10_c5_outriders', {surprise:'e'})}]}),
    b10_c5_riders_after:()=>({sp:'The wash', scene:'b10_kolanse', fx:()=>{ if (!S.f.b10_c5_ridersDone) { S.f.b10_c5_ridersDone = 1; gain('b10_c5_kolansiiblade'); } }, txt:
`None of them rides back.

That was the word, and it is done, in the dry wash at the scrub's edge, and the Third stands a while afterwards breathing hard with full skins on its backs. The outriders were thin. All of them. The officer had a crust of bread in his saddlebag, and nothing else, and a good blade.

The horses have not run. They could not have. They stand in the wash with their heads down. ${b105Say({pruss:'Pruss goes to them first, slowly, and gives them water out of his old sergeant\'s helm, one after another, talking under his breath the way his da did.', orvas:'Orvas goes to them first, slowly, and gives them water from his own skin, and talks to them in Khundryl, which they do not understand and do not mind.', _:'One of the Third goes to them with a helm of water, and the rest let it happen.'})}

The officer's blade goes to the Third. It is better steel than anything the man was fed on.${b105If('haddat', `\n\nHaddat does not say any names for them. She does not know any. She stands by the wash a moment anyway.`)}`,
      ch:[{t:'Back to the scrub.', go:()=>startExplore()}]}),

    /* Sedge (on 'south', the wagon-master): the Third lent as file-closers (said once, plainly) */
    b10_c5_sedge:()=>({sp:b105S('Captain Sedge', 'The Twelfth\'s wagon-master'), scene:'b10_kolanse', fx:()=>{ if (!S.f.b10_c5_lent) S.f.b10_c5_lent = b105S('sedge', 'twelfth'); }, again:()=>b105S('Captain Sedge, of the regulars, walking her line.', 'The wagon-master, with his ledger.'), txt: b105South() ?
`The wagon-master finds the Third by the fire with its skins full and its blades cleaned. "The Twelfth's finadd sends his word," he says. "When it comes to a fight at the end of this road, and it will, the Twelfth wants its drill-sergeants at the back of its line. File-closers." He looks at the Third. "I told him you'd say yes. I wrote it down."${b105If('pruss', `\n\nPruss shrugs. "Back of the line," he says. "Where carters walk."`)}` :
`A captain of the regulars comes along the scrub's edge looking at the heavies' pickets, and stops at the Third's. A thin woman, grey at the temples, with her helm on her hip and a burn across one cheek from some fire a long way back. She looks at the Third, and at the wash behind it.

"Sedge," she says. "Captain. Regulars." She nods east, toward the thin fields. "My company's short of sergeants. Short of most things. I asked the heavies for file-closers for the rest of it, and the captain says the Third." She looks at each of them, the way the heavies' captain looks at feet. "So the Third's lent to my company. File-closers, at the back of my line, from here to whatever's at the end of it."

${b105Give() ? `Then she looks at you a moment longer. "The next cloak over, in the glass," she says. "That was my file. The young one's walking." That is all she says about it.` : `Then she looks at you a moment longer. "The next cloak over, in the glass," she says. "That was my file." That is all she says about it.`}${b105If('pruss', `\n\nPruss looks at her and nods. "Back of the line," he says. "Where carters walk." She almost smiles.`)}`,
      ch:[{t:'"The Third\'s yours, Captain."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the edges of the scrub */
    b10_c5_scrubwest:()=>({sp:b105S('The glass', 'The road back'), scene:'b10_kolanse', txt:
`West, ${b105S('the glass, pale and bright and done with. The army is still coming up out of it, file after file, with full skins.', 'the road back, and the brigades still coming up it, wagon after wagon.')}`,
      ch:[{t:'Back to the scrub.', go:()=>startExplore()}]}),
    b10_c5_edge:()=>({sp:'Kolanse', scene:'b10_kolanse', txt: S.f.b10_c5_lent ?
`East, the thin fields of Kolanse, and the dust, and people at the field-edges watching. Somewhere past them, the army is going.` :
`East, the thin fields, and the wash, and the dust. ${!S.f.b10_c5_picket ? `${b105BossC()} has the Third's word first.` : !S.f.b10_c5_ridersDone ? 'Riders, at the scrub\'s edge.' : 'An officer of the regulars is walking the pickets, looking for the Third.'}`,
      ch: S.f.b10_c5_lent ? [{t:'On. Into Kolanse.', onward:true, go:'b10_c5_onward'},
                             {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the scrub.', go:()=>startExplore()}]}),

    /* ======== the end ======== */
    b10_c5_onward:()=>({sp:'Kolanse', scene:'b10_kolanse', html:witnessHTML(), txt: b105South() ?
`In the evening the brigades go on along the edge of Kolanse's farmland, toward the coast and whatever the King's ships have brought, and the Third goes with the Twelfth, at the back of its line, where file-closers walk. The people at the field-edges watch them go by, and do not wave.${b105If('pruss', `\n\nPruss walks at the very back, with his old sergeant's helm tied to his pack, full of water.`)}${b105Say({haddat:'\n\nHaddat says the names under her breath as she walks, the long list, and at the end of it, a new word: <em>well</em>.', _:''})}` :
`In the evening the army goes on east out of the scrub, into Kolanse, with full skins and its dead behind it in the glass, and the Third goes at the back of Captain Sedge's company, where file-closers walk. The people at the field-edges watch it go by. They do not wave. They do not run, either.

Behind it the glass goes pale, and then grey, and then it is only a brightness on the horizon where the sun goes down.${b105If('pruss', `\n\nPruss walks at the very back, with his old sergeant's helm tied to his pack, full of water, and his hand on the back in front of him when it slows.`)}${b105Say({haddat:'\n\nHaddat says the names under her breath as she walks, the long list, and at the end of it, a new word: <em>water</em>.', marrow:'\n\nMarrow walks with her knotted string in her fist. "Missing is not dead, child," she says. "Thirsty is not dead. We are not dead." She sounds surprised.', _:''})}`,
      ch:[{t:b105South() ? 'On, toward the coast.' : 'East, into Kolanse.', onward:true, go:()=>chapterEnd(5, b105Key() || 'give')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* the thirst on 'give', once, unless the Third filled every skin at the wells before the glass (b10_c1_water): its words for the after-node */
const b105ThirstWho = () => S.f.b10_c5_thirst || (S.f.b10_c1_water ? 'waived' : (b10ThirstPick() || 'none'));
const b105Thirst = () => { const th = b105ThirstWho(); return th === 'waived' ? `\n\nAt the bottom of ${b10In('tangle') ? 'Tangle\'s satchel, under the munitions' : 'a pack nobody has opened since the camp'}, there is one skin from the sappers' wells the night before the glass that nobody ever counted. It goes round the Third a mouthful each. It is enough. Just.` : th && TPL[th] ? `\n\n${NAME(th)} has the thirst after, worst of the Third: lips split, and a slowness in everything, and a careful way of not looking at anyone else's skin.` : ''; };
/* the water given, once: the thirst on 'give' unless b10_c1_water */
function b105Gave(how){ if (S.f.b10_c5_gave) return; S.f.b10_c5_gave = how;
  if (S.f.b10_c1_water) S.f.b10_c5_thirst = 'waived';
  else { const id = b10ThirstPick(); S.f.b10_c5_thirst = id && b10Thirst(id) ? id : 'none'; }
  save(); }
/* the water under the column (or the first well in Kolanse), once: the fixed +1, and the empty skin */
function b105Lake(){ if (S.f.b10_c5_lake) return; S.f.b10_c5_lake = 1; b10Witness(1, b105South() ? 'the first well in Kolanse' : 'water under the column'); if (!S.kit.includes('b10_c5_emptyskin')) gain('b10_c5_emptyskin'); save(); }
/* the skins filled, once: the stone from the wet ground */
function b105Drank(how){ if (S.f.b10_c5_drank) return; S.f.b10_c5_drank = how; if (!S.kit.includes('b10_c5_lakestone')) gain('b10_c5_lakestone'); save(); }
