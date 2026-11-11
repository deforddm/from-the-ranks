/* ============ Book Ten, Chapter 3: Night Marches (the Third) ============ */
/* The Third, with the heavies, in the crossing's first nights (tcg-canon chapter table, Ch 3; W Tavore Paran; R17 S1, S7): the column marches
   by night without a lamp and lies up by day under its cloaks; the water is counted at every halt; the beasts die; heavies go into the traces.
   A dead city far off to the north, never named and never entered. Dust far off at the last lie-up, small, going into the glass; never said
   whose. The wear (−1, 'nobody says why') is the engine's, at the chapter's start.
   Phase 1 (S.f.b10_c3_ph), the first lie-up by day: the first halt at grey light (the reading, B10READ[3], the glass under the stars going out);
   Thallo's word (the Third has the company's water wagon this lie-up); the water counted at the tailboard; the oxen, and the trick, Into the
   Traces (Pruss teaches, else Thallo); the old marine; the heavies' captain seen; at noon stragglers from another company, mad with thirst,
   come for the wagon (b10_c3_wagon, main, stage 2; fought down, never killed in words; the glass knife). Phase 2, the night march: the dead
   city far off (the chapter's one Witness "yes, but"), the rearguard (the one line of the Letherii), and at the water wagon the last ox goes
   down: the key from Thallo, S.f.b10_c3_key: 'haul' (the Third takes the traces; stragglers at the slow wagon, b10_c3_traces, survive 4; a
   shelf of glass; the thirst unless b10_c1_water; b10Witness(1, 'the wagon came through'); Pruss +1; S.f.b10_c3_hauled) or 'cut' (cut it
   loose and carry what can be carried; b10Witness(-1, 'left it in the glass'); Tangle +1). Phase 3 is the key's work in the dark. Phase 4,
   the second lie-up by day: the squad's circle and the Witness beat (c3: "What are we marching for?"); Thallo's cloak; the dust far off; at
   dusk, on east.
   The 'south' road (the Third lent to the Commander's column as drill-sergeants, Ch 1): the southern march, dry, with water in it somewhere;
   the Letherii wagon-master of the Twelfth for Thallo; the oxen dying more slowly; 'haul' a supply wagon with a broken team; the stragglers
   Bolkando and Letherii carters gone thirsty (the same ids); the glass's edge far to the north instead of the dead city; the grey knights'
   dust ahead and the big ones along the flank, far off.
   Never: the dead city's name or its gate, the walking dead Imass close, the reserve water or the Fist who kept it, the water fight of the
   marines' sergeant, the sappers' beasts, the Adjunct with her captain or her priest, the grey knights' commander's ride (dust far off at
   most). Notes: docs/tcg-ch3-notes.md. */
/* FOR THE ARTIST (183b): names this file uses.
   Items: ART['item/b10_c3_glassknife'], ['item/b10_c3_nightcloak'], ['item/b10_c3_tracestrap'].
   Figures: pruss (181b), b9_c1_thallo (161b), b5_letherii (the wagon-master on 'south'), b2soldier (the old marine, the clerk, the
   stragglers' sergeant, the stragglers, the engine's).
   Backdrops: b10_glass, b10_glass_night, b10_traces (180's, yours), and one this file adds: b10_c3_city (the night glass with a dead city far
   off on the northern horizon). On 'south' the chapter uses b10_south (182b's) and b10_south_night (180's, Ch 4's).
   Ground (TILEX): b10_c3_ground (the glass; on 'south' Book Nine's road ground): 'c' a cloak propped on a spear-shaft with soldiers under
   it, 'W' the water wagon (on the second lie-up only if hauled), 'w' another wagon, 'x' oxen at a picket, 'F' the squad's circle (no fire),
   'v' a lookout over the far ground, 'r' the rearguard. Battle 't' is a glass shard (or on 'south' a stone). */

/* ---- small helpers (b103: Book Ten, Chapter Three) ---- */
const b103L = (id, n) => { if (b10In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b103Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b10In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b103If = (id, s) => b10In(id) ? (typeof s === 'function' ? s() : s) : '';
const b103Who = () => (ROLL() && ROLL().who) || 'sgt';
const b103Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b103Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b103V = (id, you, they) => id === 'sgt' ? you : they;
const b103Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the first lie-up by day, 2 the night march before the key, 3 the key's work in the dark, 4 the second lie-up by day */
const b103Ph = () => S.f.b10_c3_ph || 1;
const b103Key = () => S.f.b10_c3_key || null;
const b103Haul = () => S.f.b10_c3_key === 'haul';
const b103South = () => b10TRoad() === 'south';
const b103S = (glass, south) => b103South() ? south : glass;
const b103Night = () => [2, 3].includes(b103Ph());
const b103Ready = () => !!S.f.b10_c3_orders && !!S.f.b10_c3_counted;
const b103NightDone = () => b103Haul() ? !!S.f.b10_c3_through : !!S.f.b10_c3_carried;
const b103Scene = night => b103South() ? (night ? 'b10_south_night' : 'b10_south') : (night ? 'b10_glass_night' : 'b10_glass');
/* who gives the Third its orders: Thallo, or on 'south' the Twelfth's wagon-master (a Letherii, unnamed) */
const b103Boss = () => b103S('Thallo', 'the wagon-master');
const b103BossC = () => b103S('Thallo', 'The wagon-master');
/* who teaches the traces: Pruss, else Thallo, else on 'south' a Letherii carter */
const b103Teacher = () => b10In('pruss') ? 'Pruss' : b103S('Thallo', 'a Letherii carter');
/* the one line of the other squad a chapter (camp talk): the Letherii's Chapter 2 key, by both roads */
const b103Rumour = () => { const lk = b10Key(2) || 'watch', ladj = b10LRoad() === 'adjunct';
  if (!b103South()) return ladj
    ? (lk === 'count' ? 'A clerk walking with the rearguard says the few Letherii at the column\'s tail counted their water twice at the glass\'s edge before they came on. "Twice," he says. He sounds like a man copying down a recipe.' : 'A file of the rearguard says the few Letherii at the column\'s tail stood at the glass\'s edge at dusk and watched their own brigades go away south over the rise, until there was nothing left to watch. Then they came on.')
    : (lk === 'count' ? 'A clerk walking with the rearguard says the Letherii counted their water twice before they turned south. "Twice," he says, with something like longing.' : 'A file of the rearguard says somebody stood on the rise at dusk, the night the army went in, and watched the column go out onto the glass. Letherii, by the spears. Still standing there when the dark came down.');
  return ladj
    ? (lk === 'count' ? 'A Letherii carter at the tail says a few of their own went east with the foreigners into the glass, and counted their water twice at the edge before they went. He says it as if they had gone into the sea.' : 'A Letherii carter at the tail says a few of their own went east with the foreigners into the glass, and stood at the edge at dusk watching the brigades come south without them.')
    : (lk === 'count' ? 'Three wagons back, a Letherii company has its barrels out at the halt and is counting them again. "Twice a halt," the carter says. "Their quartermaster\'s way. Since the parting."' : 'Three wagons back is a Letherii company that stood on the rise at the parting and watched the foreigners walk into the glass. The carter says they talk about it at night. "Like a funeral," he says, "only they weren\'t sure whose."'); };

/* ---- Into the Traces: how a carter's son leans into a load and takes a squadmate with him. It copies the Rope-Man's Haul (Book Five's
   b5_c1_haul): the bearer gets a hand on a squadmate's strap and the two of them change places. Not sorcery. v10.3: it strikes nobody, so it
   is free. ---- */
Object.assign(TRICKS, {
  b10_c3_harness:{name:'Into the Traces', ch:3, use:'fight', ab:'t_b10_c3_harness', where:'the oxen\'s picket at a lie-up in the crossing, from a carter\'s son',
    lore:'A carter does not pull a stuck wagon with his arms. He leans into the strap with his whole weight, low, and lets the load come to him, and when the soldier beside him is going down he hooks a hand in that one\'s strap and takes them along too. Pruss learned it on the Unta roads before he could lift a sack. In a fight it is the same lean: a hand on a squadmate\'s strap, and the two of you are each where the other was.',
    get fx(){ return `Once a fight: the bearer gets a hand on a squadmate's strap within ${5 + lvT()} and leans into it, the carter's way. The two of them change places. No free swings. Grows with level. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b10_c3_harness:{name:TRICKS.b10_c3_harness.name, trick:'b10_c3_harness', free:true, desc:()=>TRICKS.b10_c3_harness.fx,
    tiles:u=>party().filter(p => p !== u && !p.ally && cheb(u, p) <= 5 + lvT()),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const ux = u.x, uy = u.y; sparks(ux, uy, 10, '#b8c4d8', .4); sparks(t.x, t.y, 10, '#b8c4d8', .4);
      u.x = t.x; u.y = t.y; t.x = ux; t.y = uy; AUDIO.play('sword', .5); B.moved = true; float(t, 'in the traces', '#c8d4e8');
      blog(`${u.name} hooks a hand in ${t.name}'s strap and leans into it low, the carter's way, and the weight comes across. They are each where the other was.`); }},
});

/* ---- the reading: the glass under the stars, at grey light at the first lie-up (on 'south', the hard ground of the road) ---- */
B10READ[3] = {back:'b10_c3_fire', backT:'Back to the circle.',
  get where(){ return S && S.f && b103South() ? 'the hard ground of the southern road, under the last of the stars' : 'the glass under the stars'; },
  get scene(){ return S && S.f ? b103Scene(false) : 'b10_glass'; },
  get set(){ return S && S.f && b103South() ? 'Grey light at the lie-up on the long way round, the brigades\' wagons drawn up along the road, and the stars going out one by one over the dry country.' : 'Grey light at the first lie-up in the glass, the stars going out overhead and in the ground underfoot at the same moment, as if somebody were pinching both sets of wicks.'; },
  say:{marrow:'"Sit, child," Marrow says. "Before the sun gets up and makes a mirror of everything. The Deck does not like a mirror. It likes to be the only thing showing you yourself."',
       tallow:'"Grandmother read at grey light on a long road," Tallow says. "She said the cards are honest when you are too tired to lie to them." He shuffles. "I am very tired."',
       get oldninth(){ return S && S.f && b103South() ? '"Lent south with you," the old marine says. "The clerks forgot to un-lend me." He shuffles. "The cards came too. They never ask where."' : '"Still walking," the old marine says. "Both of us. Sit before the glass gets bright. Cards don\'t like being looked at twice."'; }}};

/* ---- borrowed pictures until the artist's file (183b) replaces them ---- */
SCENEX.b10_c3_city ??= (cv, t) => (SCENEX.b10_glass_night || ((c, tt) => drawCamp(c, tt, true)))(cv, t);
if (typeof TILEX !== 'undefined') TILEX.b10_c3_ground ??= (...a) => (TILEX.b9_c4_wastes || TILEX.b9_c3_road || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b10_c3_glassknife', 'b9_c1_gutterknife'], ['b10_c3_nightcloak', 'b9_c2_carterscoat'], ['b10_c3_tracestrap', 'b9_c2_tallystick']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Ten's glossary ---- */
GLOSSX.tcg.push(
  [3, 'The lie-up', 'The day\'s halt in the crossing: the column marches by night and lies up through the heat under cloaks propped on spear-shafts, and the water is counted before anyone sleeps.', ()=>!!(S && S.f && S.f.b10_c3_ph)],
  [3, 'The traces', 'The straps a draught beast pulls a wagon by. When the oxen die, the heavies take them, two to a strap, and the wagon comes on slower.', ()=>!!(S && S.f && S.f.b10_c3_key)]);

/* the fire is a roster fire (38c): in the glass it is no fire, only the squad's circle */
ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[3] = ['b10_c3_fire'];

/* ---- the squad in the circle: a line at the first lie-up and a line at the second for every soldier the Third can field ---- */
const B103TALK = {
  haddat:[()=>`Haddat has her shield propped over her head for shade and her eyes open under it. "My mother crossed the salt flats once with my father," she says. "She said the trick is to stop expecting the far side." She shuts her eyes. "I have not learned it."`,
          ()=>`Haddat is saying the names under her breath, the long list, and stops in the middle of it. "I said one twice," she says. "I think I said it twice." She starts again from the top. The squad waits.`],
  sathi:[()=>`Sathi is lying flat under her cloak with only her filed teeth showing. "The Weasels crossed bad country by night too," she says. "We took somebody else's water to do it." She looks at the wagon. "I am only saying how it was done."`,
         ()=>`Sathi has a pebble of glass in her mouth. "Old trick," she says round it. "Keeps the spit coming." She takes it out and looks at it. "Does not keep anything else coming."`],
  tangle:[()=>`Tangle has the satchel open and is counting the munitions, and then the water skins, and then the munitions again. "Satchel's lighter than it was," he says. "Skins are lighter too." He shuts it. "Only one of those I want lighter."`,
          ()=>`Tangle is doing sums in the glass with a fingertip, and the glass will not take them, so he does them in the air. ${S.f.b10_c3_key === 'cut' ? '"We carried what we could," he says. "The sum says it was right." He wipes the air clean. "The sum isn\'t thirsty."' : '"Barrels on a wagon go further than barrels on backs," he says. "That\'s just true." He looks at his blistered hands. "Didn\'t say it was cheap."'}`],
  marrow:[()=>`Marrow is sitting with her knees up and her knotted string in her hands, not counting it. "Soliel is very far off out here, child," she says. "I reach, and there is a long way between my hand and hers." She sets the string down. "She is still there. It is the walking that is long."`,
          ()=>`Marrow has her hand on the nearest forehead in the squad, whichever it is, and keeps it there. "Out here the Lady mends slowly," she says. "But she mends." She does not take the hand away.`],
  mirrel:[()=>`Mirrel is going round the squad looking at lips and tongues like a horse-trader at a fair. "Split is fine," she says. "Split means there is still something to split." She caps her own skin without drinking from it.`,
          ()=>`Mirrel is wetting a rag with a capful of water and laying it on the back of a neck, then wringing it back into the skin. "Nothing wasted," she says. "The neck had it on loan."`],
  doss:[()=>`Doss is lying under the cloak with his arms folded. "On the holding the factor's oxen got water before we did," he says. "Seemed wrong then." He looks at the picket line, where the beasts are standing with their heads down. "Seems different now."`,
        ()=>`Doss has his boots off and is looking at his feet. "Walked the length of Lether twice for the factor," he says. "Never walked on anything that rang." He taps the glass with a heel. "Ground shouldn't ring."`],
  wenna:[()=>`Wenna has her palm flat on the glass, the way she does with ground. She takes it away quickly. "There is nothing under it," she says. "No water. No roots. Nothing." She wipes her hand. "It is the first ground I have touched that does not know I am here."`,
         ()=>`Wenna is facing west, toward a shore a very long way off. "I said the words to the Shore," she says. "It did not answer. It has not answered since the glass." She shrugs. "It is busy. I am thirsty. We will both get over it."`],
  mehet:[()=>`Mehet is turning his ring of keys over in the shade. "There's a lock for everything in Y'Ghatan," he says. "Water too. Wells had grilles." He looks out at the glass. "Out here there's nothing to lock. That's worse."`,
         ()=>`Mehet is asleep sitting up with his keys in his fist. When you sit down he says, without opening his eyes, "I was dreaming about a fountain. Very dull fountain. Best dream I've had."`],
  ottar:[()=>`Ottar has the grey plate off and stacked under the cloak for once. "Today's word," he says, "is <em>lie-up</em>." He considers it. "An honest word. It does what it says. We lie, and we are up, and nothing else is promised."`,
         ()=>`Ottar is cleaning the grey plate with a dry rag, because there is nothing wet to clean it with. "Today's word," he says, "is <em>traces</em>." He thinks. "Also the marks a thing leaves when it has gone." He nods. "The language is very efficient out here."`],
  tallow:[()=>`Tallow has his grandmother's deck in its oilcloth against his chest, under his tunic, out of the light. "She said cards fade in the sun," he says. "Like people." He pats it. "I'm keeping us both in the shade."`,
          ()=>`Tallow is turning one card over on his knee and not looking at it. "Grandmother said a long road reads itself," he says. "You don't need the Deck for it. You just need to keep walking." He puts the card away. "She never walked this one."`],
  hessa:[()=>`Hessa has her spear planted and her cloak over it for shade, which makes her the centre pole of her own small tent. "D'rek is under everything," she says. "Even this." She frowns at the glass. "She is very far down here. I can still feel her turning over."`,
         ()=>`Hessa sits very straight in the shade of her spear. "I prayed for water," she says. "D'rek is not a goddess of water." She shrugs. "She listened anyway. That is something, from her."`],
  tebbet:[()=>`Tebbet has his bow unstrung and wrapped against the heat. "Gut goes slack in this," he says. "Then it goes brittle. Then it goes." He holds it like a sick animal. "I'm keeping it out of the sun. Same as everybody."`,
          ()=>`Tebbet is squinting out at the glare. "Can't judge a distance out here," he says. "Everything's either close or a hundred leagues, and you can't tell which." He shakes his head. "Bad country for a bowman. Good country for a liar."`],
  darrut:[()=>`Darrut has his helm off on his knee and is looking at the dent in it. "Aren had a desert on its doorstep," he says. "We never went into it. We knew better." He looks at the column lying up under its cloaks. "Here we are, knowing better, in it."`,
          ()=>`Darrut is eating the crumbs of his ration one at a time. "In the Guard we'd have called this a bad posting," he says. "Then we'd have asked for a transfer." He looks round at the glass. "And who would we ask."`],
  yorin:[()=>`Yorin has his copper wind-vane out on his palm. It is perfectly still. "No wind," he says. "Not a breath." He watches it anyway. "Serc has gone very quiet out here. I think even Serc is thirsty."`,
         ()=>`Yorin's wind-vane turns, once, a quarter, and stops. He stares at it. "Did you see that?" he says. The squad did not. He puts it away very carefully, as if it had told him a secret.`],
  rasp:[()=>`Rasp has been checking the squad's munitions one by one in the shade, by feel. "Heat's no good for them," she says. "Not dangerous. Just sulky." She wraps them in a wet rag, and then, after a moment, a dry one. "Can't spare the wet."`,
        ()=>`Rasp is looking at the wagons with a sapper's eye. "Axles are holding," she says. "Wheels are holding. It's the beasts and the backs that go." She flexes her own shoulders. "Mine included."`],
  orvas:[()=>`Orvas is watching the horse-folk lie up at the column's flank, the horses in the middle of their ring. "They will give the horses water before themselves," he says. "Until there is not enough for the horses. Then they will decide." He looks away. "I am glad I am not there to decide."`,
         ()=>`Orvas has his cheek against the glass, his eyes closed. "My grandmother said the plain remembers every hoof," he says. "This does not remember anything." He sits up. "It is restful. I hate it."`],
  redblade:[()=>`Ramin has his scale off and is lying on it, which he says is cooler than wearing it. "The Red Blades fought in the desert near Ehrlitan," he says. "Raraku's edge. We said nothing could be worse." He looks at the glass. "We should have been more careful what we said."`,
            ()=>`Ramin is scraping the glass grit out of the joints of his scale with a knife point. "Gets in everything," he says. "Sharp, too." He holds up a bleeding thumb. "Like it means it."`],
  warlock:[()=>`Keth is lying under the cloak with his eyes shut. "*Glass,*" the grandmother says out of his mouth, sour. "*Something burned here. Something big. A long time ago.*" Keth opens one eye. "She won't say what. I don't think she knows."`,
           ()=>`Keth is sipping at his skin in tiny sips. "*Drink it all,*" the grandmother says. "*Hoarding is for misers and the dead.*" Keth caps the skin. "She's wrong about that. I hope she's wrong about that."`],
  brask:[()=>`Brask has his tally-stick out and is not filing anything off it. "Old squad pulled the 9th's guns at the river when the mules drowned," he says. "Heavies in the traces." He puts it away. "Same strap. Different ground."`,
         ()=>`Brask is rubbing the strap-burn on his shoulder with a thumb, slowly. ${S.f.b10_c3_key === 'haul' ? '"Wagon came through," he says. "Heavies\' wagon." He seems to think that is the whole of a sentence, and it is.' : '"Left it," he says. "Right to." He looks east. "Didn\'t like it. Right to."'}`],
  tegra:[()=>`Tegra is lying with her ear to the glass, listening. "There is no water under this," she says. "My people would turn round." She sits up. "I am not my people now. I am this." She waves at the Third. "I hope this knows where it is going."`,
         ()=>`Tegra is watching the edge of the shade move across the glass, a finger's width at a time. "When it reaches my foot, I move," she says. "That is all the plan I need today." It reaches her foot. She moves.`],
  pruss:[()=>`Pruss is sitting with his back to the water wagon's wheel and his old sergeant's helm in his lap. "Listen to them," he says, of the oxen at the picket. He does not have to say what he hears. Their breathing is wrong: short, and dry, and too fast for beasts standing still.`,
         ()=>`Pruss has his shirt off and is looking at the trace-strap's mark across his chest and shoulder. ${S.f.b10_c3_key === 'haul' ? '"My da\'d be proud," he says. "Then he\'d say I was leaning wrong." He grins, which splits his lip. He keeps grinning.' : '"Should\'ve hauled it," he says. Then: "Couldn\'t have. Not all of it." He ties the helm back on his pack. "Wanted to."'}`],
};

const B10CH3 = {
  title:B10CH[3], number:'Three',
  intro:{ get loc(){ return S && S.f && b103South() ? 'South of the glass' : 'The Glass Desert'; }, get sub(){ return S && S.f && b103South() ? 'The long way round · the night marches' : 'The crossing · the night marches'; }, get scene(){ return S && S.f ? b103Scene(true) : 'b10_glass_night'; },
    get cap(){ return S && S.f && b103South() ? 'A column of wagons and thin horses walking south in the dark without a lamp, the dry country black on both sides, and far to the north a paleness on the horizon that is the glass.' : 'Stars overhead and the same stars underfoot in the glass, and the column walking between them without a lamp.'; },
    paras:[
()=> b103South() ? `The long way round. The Commander's column walks south by night now, on the Commander's word, because the horses die slower in the dark and so do the carters. By day it lies up beside the road in what shade the wagons make.` : `The glass. By night the column walks on it without a lamp, and the stars are overhead and underfoot both, and the only sound is boots and wheels and the beasts breathing. By day it lies up under its cloaks and waits for the dark to come back.`,
()=>{ const v = (S.squad || []).filter(id => id !== 'sgt' && b10In(id)).map(id => NAME(id));
  return `You are Sergeant {sgt}, Third squad, with the heavies${b103South() ? ', lent to the Letherii as drill-sergeants, which out here means guarding a wagon' : ''}. ${v.length ? `${v.length > 1 ? v.slice(0, -1).join(', ') + ' and ' + v[v.length - 1] + ' are' : v[0] + ' is'} the Third, still.` : 'The Third, still, is you.'}`; },
`The water is counted at every halt. The beasts are dying. The army has not been told why it is out here, and it has stopped expecting to be.`],
    go:'To the lie-up', node:'b10_c3_start'},

  areas:[
    /* 16 x 12 (b10_c3_ground, day). The first lie-up. . the glass (or the road's dry ground)  c a cloak on a spear-shaft, soldiers under it
       W the company's water wagon  x the oxen at their picket  F the squad's circle  < west: the column lying up  X east: the open glass */
    { id:'b10_c3_lieup', title:'Night marches · the lie-up', sub:'Day · under the cloaks', hint:'Tap ground to move · tap a figure to talk · the column lies up west, the open ground east', decor:'b10_c3_ground',
      map:[ "################",
            "#..c..c...c..c.#",
            "#..............#",
            "#.c....xx....c.#",
            "#......WW......#",
            "<..............X",
            "#..c...O....c..#",
            "#..............#",
            "#.c...c...c..c.#",
            "#..............#",
            "#....c....c....#",
            "################" ],
      walk:'.', triggers:{W:'b10_c3_wagon', x:'b10_c3_oxen', O:'b10_c3_fire', '<':'b10_c3_west', X:'b10_c3_edge'}, start:{x:1, y:5},
      quest:()=> !S.f.b10_c3_orders ? `${b103BossC()}, by the water wagon. The Third has the day watch.` : !S.f.b10_c3_counted ? 'The water wagon\'s tailboard. The water is counted at every halt.' : !S.f.b10_c3_wagonDone ? 'Shapes on the open ground, east, coming for the wagon.' : 'The circle, and dusk. The column goes on in the dark.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:9, y:5, node:()=>'b10_c3_thallo', show:()=>!b103South(), fresh:()=>!S.f.b10_c3_orders},
        {id:'master', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:9, y:5, node:()=>'b10_c3_thallo', show:()=>b103South(), fresh:()=>!S.f.b10_c3_orders},
        {id:'old', name:'The old marine', kind:'b2soldier', x:11, y:7, node:()=>'b10_c3_oldmarine', fresh:()=>!S.f.b10_c3_old},
        {id:'strag', name:'Shapes coming across the open ground', kind:'b2soldier', x:13, y:5, node:()=>'b10_c3_strag', show:()=>b103Ready() && !S.f.b10_c3_wagonDone, fresh:()=>true} ] },

    /* 16 x 12 (b10_c3_ground, night). The night march: the column walking east. w the column's other wagons  W the company's water wagon
       v a rise of glass to the north (the far ground)  r west: the rearguard  > east: on, to the next lie-up */
    { id:'b10_c3_march', title:'Night marches · the column', sub:'Night · no lamps', hint:'Tap ground to move · tap a figure to talk · the rearguard is west, the far ground north, the way on east', decor:'b10_c3_ground', dark:true,
      map:[ "################",
            "#.....v........#",
            "#..............#",
            "#..w....w...w..#",
            "#..............#",
            "r...........W..>",
            "#..............#",
            "#..............#",
            "#..w.....w.....#",
            "#..............#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{W:'b10_c3_wagonn', v:'b10_c3_city', r:'b10_c3_rear', '>':'b10_c3_east'}, start:{x:2, y:5},
      quest:()=> b103Ph() === 2 ? 'The water wagon, ahead east. Its oxen are failing.'
        : b103Haul() ? (!S.f.b10_c3_tracesDone ? 'The water wagon, in the traces. Shapes in the dark behind it.' : !S.f.b10_c3_through ? 'The wagon. A shelf in the ground across the line of march.' : 'East, with the wagon, to the next lie-up at grey light.')
        : (!S.f.b10_c3_carried ? 'The water wagon. Carry what can be carried.' : 'East, to the next lie-up at grey light.'),
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:11, y:4, node:()=>'b10_c3_wagonn', show:()=>!b103South(), fresh:()=>b103Ph() === 2},
        {id:'master', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:11, y:4, node:()=>'b10_c3_wagonn', show:()=>b103South(), fresh:()=>b103Ph() === 2} ] },

    /* 16 x 12 (b10_c3_ground, day). The second lie-up. c cloaks  W the water wagon (if it came through; else the skins and barrels carried)
       F the squad's circle  v a lookout south and west over the far ground  > east: on, at dusk */
    { id:'b10_c3_lieup2', title:'Night marches · the next lie-up', sub:'Day · under the cloaks again', hint:'Tap ground to move · tap a figure to talk · the far ground is south-west, the way on east', decor:'b10_c3_ground',
      map:[ "################",
            "#..c....c...c..#",
            "#..............#",
            "#.c..W......c..#",
            "#..............#",
            "#.....O........>",
            "#..............#",
            "#..c.....c..c..#",
            "#..............#",
            "#v.....c.......#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{W:'b10_c3_wagon2', O:'b10_c3_fire', v:'b10_c3_dust', '>':'b10_c3_dusk2'}, start:{x:8, y:5},
      quest:()=> !S.f.b10_c3_cloak ? `${b103BossC()}, by the ${b103Haul() ? 'wagon' : 'skins'}. He has something for the Third.` : !b10BeatOf(3) ? 'The circle, under the cloaks. The squad is awake.' : 'Dusk, and on east.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:8, y:3, node:()=>'b10_c3_thallo2', show:()=>!b103South(), fresh:()=>!S.f.b10_c3_cloak},
        {id:'master', name:'The Twelfth\'s wagon-master', kind:'b5_letherii', x:8, y:3, node:()=>'b10_c3_thallo2', show:()=>b103South(), fresh:()=>!S.f.b10_c3_cloak},
        {id:'old', name:'The old marine', kind:'b2soldier', x:11, y:8, node:()=>'b10_c3_oldmarine', fresh:()=>false} ] } ],

  battles:{
    /* the stragglers at the water wagon, at noon at the first lie-up: two grounds, the open edge of the lie-up, then among the cloaks */
    b10_c3_wagon:{title:'The water wagon', style:'b10_c3_ground', get warrenText(){ return S && S.f && b103South() ? 'Noon on the southern road · heat, dust, the wagon\'s shade · the warrens thin' : 'Noon on the glass · glare off everything, no shade but the cloaks · the warrens thin and dry'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["........","........","..t..t..","........","...tt...","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_straggler',1,0],['b10_straggler',6,0],['b10_straggler',3,1],['b10_straggler',4,0]], xp:380, after:'b10_c3_wagon_after',
      preText:()=> b103South() ? `Carters, by their coats: Bolkando and Letherii both, from some wagon further up the road whose barrels went dry first. They walk wrong, too fast and then too slow, and they have stopped seeing the soldiers in front of the wagon. They see the barrels.` : `Soldiers, by their kit, from the next company's lie-up: Malazans. They walk wrong, too fast and then too slow, and they have stopped seeing the soldiers in front of the wagon. They see the barrels.`,
      stage2:{title:'Among the cloaks', xp:170,
        text:()=>`The first of them are down on the ${b103S('glass', 'road')} and staying there. The rest have gone round the far side of the wagon, in among the cloaks, where the sleeping soldiers are waking up and shouting, and one of them, a corporal by the stripe, has a knife in his fist that glitters wrong in the sun.${b103If('pruss', `\n\nPruss goes after them with his shield, not his sword. "Not the barrels," he says. "Not the barrels, friend."`)}`,
        map:["#......#","..t..t..","........","........","........","...t....","........",".t....t.","........","#......#"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b10_ringleader',3,1],['b10_straggler',5,2]]} },
    /* on 'haul': the traces by night, the wagon dragged on while more stragglers come in out of the dark; a survive fight */
    b10_c3_traces:{title:'The traces', style:'b10_c3_ground', dark:true, get warrenText(){ return S && S.f && b103South() ? 'Night on the southern road · no lamps, the wagon creaking on · the warrens far off' : 'Night on the glass · stars above and below · the warrens very far off'; }, warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold four rounds while the wagon is dragged on. They want the water. They will stop wanting it eventually.'},
      map:["........","........","........",".t....t.","........","........","...tt...","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_straggler',1,0],['b10_straggler',6,0]], xp:120, after:'b10_c3_traces_after',
      waves:[{round:2, foes:[['b10_straggler',0,1],['b10_straggler',7,1]], text:'More of them come in out of the dark behind the wagon, walking fast, the way the thirsty walk toward a sound like water slopping in a barrel.'}],
      preText:()=>`They come up out of the dark behind the wagon, where the column has gone on and left the slow thing behind: two at first, walking fast, and the sound of more behind them. Not soldiers now. Thirst, wearing soldiers.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b10_c3_glassknife:{name:'A knife knapped from the glass', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,8,4],
      line:'A blade knapped out of the desert glass the way the old hands have taken to doing at the halts, flaked to an edge on a stone and bound to a stick with gut. It is sharper than anything the armourers ever issued, and one day it will break. The straggler who made it will not want it back.'},
    b10_c3_nightcloak:{name:'A lie-up cloak', slot:'armour', role:'light', who:null, ac:1, hp:4,
      line:'A long cloak, dark outside for the night marches and chalked pale inside, to be turned and thrown over a spear-shaft at a lie-up so the sun has something to hit that is not you. Worn, it turns a blade badly and the heat better.'},
    b10_c3_tracestrap:{name:'A trace-strap', slot:'trinket', role:'any', who:null, hp:2, stat:{might:1},
      line:'A carter\'s trace-strap of oiled leather, worn smooth and dark where a shoulder leaned into it, from a harness the beasts no longer need. Worn across the chest it makes any load sit easier, and reminds the one wearing it who pulled last.'} },

  scenes:{
    b10_c3_city:{loc:'The Glass Desert', sub:'The night march · the far ground', cap:'The night glass running away north under the stars, and on the horizon, very far off, a line too straight to be ground.', amb:'explore'} },

  end:{
    haul:['The wagon came through', 'In the crossing\'s first nights the Third lay up by day under its cloaks and marched by night without a lamp, and counted the water at every halt. It kept its company\'s water wagon from the thirsty at a noon lie-up. When the oxen died in the dark, the Third took the traces itself, two to a strap, and fought off the ones who came for the slow wagon, and dragged it over the glass to the next lie-up by grey light. It cost the squad the skin off its shoulders. The wagon came through.'],
    cut:['Left in the glass', 'In the crossing\'s first nights the Third lay up by day under its cloaks and marched by night without a lamp, and counted the water at every halt. It kept its company\'s water wagon from the thirsty at a noon lie-up. When the oxen died in the dark, the Third cut the wagon loose, filled every skin it could carry from the barrels, and walked on. The wagon is still standing out there in the glass, with the stars on its tilt.'] },
  get endScene(){ return S && S.f && b103South() ? 'b10_south' : 'b10_glass'; },
  endCap:()=> b103South() ? 'The road south at dusk, the column getting up out of the shade of its wagons, and far to the north the glass going pale and then dark.' : b103Haul() ? 'The glass at dusk, the column getting up from under its cloaks, and a water wagon with heavies in its traces where the oxen were.' : 'The glass at dusk, the column getting up from under its cloaks, every soldier in the Third heavy with skins.',
  tease:'Next: the Letherii. The long way round to the south, the horses failing one by one, and a hungry country at the road\'s edge watching the column go by.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b10_c3_key === 'haul') x.push(`When the oxen died the Third took the wagon's traces itself${f.b10_c3_through ? ', and the wagon came through to the next lie-up' : ''}.`);
    if (f.b10_c3_key === 'cut') x.push('When the oxen died the Third cut the wagon loose and carried what could be carried.');
    if (f.b10_c3_wagonDone) x.push('Stragglers came for the company\'s water at a noon lie-up. The Third sent them back to their own.');
    if (f.b10_c3_harnessOk) x.push(`${b10In('pruss') ? 'Pruss' : 'A carter\'s son'} taught the Third to lean into a strap and take a squadmate with it.`);
    if (f.b10_c3_city) x.push(b103South() ? 'The Third looked north from the road at the glass the army is crossing without it.' : 'The Third saw a dead city far off to the north, and the column did not go near it.');
    if (f.b10_c3_thirst && f.b10_c3_thirst !== 'none' && f.b10_c3_thirst !== 'waived' && TPL[f.b10_c3_thirst]) x.push(`${NAME(f.b10_c3_thirst)} gave a mouthful to the traces, and carried the thirst after.`);
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b10_c3_through && 'The wagon came through to the lie-up at grey light, with the Third in its traces where the oxen were.',
    f.b10_c3_carried && 'The wagon left standing in the glass, the stars on its tilt, every skin the Third owns filled from it.',
    f.b10_c3_dust && 'Dust, far off at the last lie-up, small, going into the glass. Riders, maybe. Whose, the Third never heard.',
    f.b10_c3_city && (b103South() ? 'The glass, far to the north, pale on the horizon, with the army somewhere on it.' : 'A dead city, far off to the north on the night glass. The column did not go near it.'),
    f.b10_c3_rear && 'Word from the rearguard about the Letherii.',
    f.b10_c3_wagonDone && 'Stragglers at the water wagon at noon, mad with thirst. Their sergeant came for them after.',
    f.b10_c3_counted && 'The water counted at the tailboard, to the line and no more.',
    b103South() ? 'The Third, lent to the Letherii, on the long way round.' : 'The Third, with the heavies, in the glass.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the first lie-up (the first halt) ======== */
    b10_c3_start:()=>({sp:b103S('The lie-up', 'The road\'s edge'), scene:b103Scene(false), fx:()=>{ S.f.b10_c3_ph = S.f.b10_c3_ph || 1; }, again:()=>b103S('The lie-up, the cloaks going up on their spear-shafts, the glass going bright.', 'The lie-up beside the road, the wagons drawn up, the heat coming.'), txt: b103South() ?
`Grey light, and the column halts where it stands, at the edge of a road that is mostly an idea. The brigades draw their wagons up along it and put their backs to them, and the carters unhitch the teams and lead them to a picket where there is nothing to graze. The oxen go slowly. They go slower every morning.

Far ahead to the south there is a straight line of dust where the grey knights are already moving. Further off to the east, if you look, something big walks along the column's flank and does not come closer: the big ones, the carters call them, and leave it at that.

${b103Say({tangle:'Tangle is counting the Twelfth\'s barrels before anybody asks him to. "Same as last halt, less a bit," he says. "Always less a bit."', haddat:'Haddat puts her shield against a wheel and sits down in its shade without a word. She has learned to save words, out here, the way she saves water.', _:'The Third finds the shade of the Twelfth\'s supply wagon and gets into it.'})}

The Twelfth's wagon-master is at the tailboard with a ledger, looking for the drill-sergeants he was promised.` :
`Grey light, and the column halts where it stands. Up and down its length the soldiers drive their spear-shafts into the cracks of the glass and throw their cloaks over them, and crawl underneath, and the column becomes a long low village of cloth on a floor that is turning, as the light comes, from black to grey to a white too bright to look at.

The stars go out overhead and in the glass underfoot at the same moment.

${b103Say({tangle:'Tangle is already counting the skins. "Same as last halt, less a bit," he says. "Always less a bit."', haddat:'Haddat drives her spear in and hangs the blue shield from it for shade, and sits down under it without a word. She saves words now, out here, the way she saves water.', _:'The Third gets its cloaks up and gets under them.'})}${b103If('pruss', `\n\nPruss stands by the company's water wagon with a hand on the near ox's neck, feeling its breathing. He does not like what he feels.`)}

By the water wagon, Thallo is waiting with the captain's word.`,
      ch:[{t:`${b103BossC()}, by the wagon.`, go:'b10_c3_thallo'},
          b10ReadChoice(3),
          {t:'Walk the lie-up.', go:()=>startExplore()}]}),
    b10_c3_read:()=>b10ReadOffer(3),
    b10_c3_card:()=>b10ReadCard(3),

    /* Thallo (or the wagon-master): the day watch on the water wagon */
    b10_c3_thallo:()=>({sp:b103S('Thallo', 'The Twelfth\'s wagon-master'), scene:b103Scene(false), fx:()=>{ S.f.b10_c3_orders = 1; }, again:()=>`${b103BossC()}, by the wagon. "Day watch, Sergeant. Nothing near the barrels that isn't on the list."`, txt: b103South() ?
`A Letherii wagon-master with a burnt neck and a ledger under his arm, who has decided the Third are his drill-sergeants whether there is any drill or not. "Sergeant," he says, in careful Malazan. "The Twelfth has the day watch on its own wagon. The Twelfth is asleep." He looks at the Third. "So you have it."

He opens the ledger. "Barrels, here. The count at every halt, to the line. No drinking off the list." He shuts it. "Up the road, a Bolkando wagon went dry at the last halt. Its carters have been walking back along the column all morning, looking at other people's barrels." He shrugs. "Thirsty men look. Then they do more than look."

The oxen at the picket breathe short and fast. He listens to them too. "Slower than the horses," he says. "But they go."` :
`Thallo, as big as a door, sitting on the wagon-tongue in the last of the grey with a heel of bread the size of a thumb, eating it in crumbs to make it last. He is eating again. The whole company has noticed and not said so, and is relieved.

"Third," he says. "Captain's word. You've the company's water wagon this lie-up. Day watch." He jerks a thumb at the barrels. "The count's at the tailboard, to the line, and nobody drinks off the list. Clerk's coming." He chews a crumb. "And keep your eyes on the open ground. Word down the column is somebody's company went short at the last halt, and short makes people stupid."

He looks at the oxen at the picket, standing with their heads down. "Them too," he says quietly. "Few more nights in them. Not many."${b103If('pruss', `\n\nPruss is listening to the oxen, not to Thallo. "Fewer than that," he says.`)}`,
      ch:[{t:'"The water, then."', go:'b10_c3_wagon'},
          {t:'Back to the lie-up.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the water wagon by day: the count at the tailboard (a check, its "yes, but") */
    b10_c3_wagon:()=>{ const done = !!S.f.b10_c3_counted;
      if (!S.f.b10_c3_orders) return {sp:'The water wagon', scene:b103Scene(false), txt:
`The company's water wagon: barrels lashed in rows on a flat bed, a tilt over them for the sun, and two oxen at the picket beside it with their heads down. ${b103BossC()} is by it, waiting to give the Third the watch.`,
        ch:[{t:`${b103BossC()}.`, go:'b10_c3_thallo'}, {t:'Back to the lie-up.', go:()=>startExplore()}]};
      if (done) return {sp:'The water wagon', scene:b103Scene(false), txt:
`The water wagon, the barrels lashed, the tilt pulled down over them against the sun. The clerk has gone back to his own cloak with the slate. The count is done, to the line.${S.f.b10_c3_wagonDone ? ' There are scuffs in the dust round the wheels where the stragglers came, and nothing else to show for it.' : ''}`,
        ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]};
      return {sp:'The water wagon', scene:b103Scene(false), again:()=>'The tailboard, the clerk, the ladle and the line.', txt:
`At the tailboard a clerk has a ladle, a slate, and a stick notched with a line, and he is doling out the company's ration by the line on the stick: so much a skin, no more, in the order on the slate. The soldiers come up one at a time and hold out their skins and watch the ladle like dogs at a table.

He is slow. He is very tired. He looks at the Third. "Can one of you do the slate?" he says. "I keep losing the line."${b103If('tangle', `\n\nTangle has his hand out for the slate before the clerk has finished asking.`)}${b103If('pruss', `\n\nPruss knocks on a barrel with a knuckle, and another, listening. "That one's lower than it looks," he says.`)}`,
        ch:[{t:'Take the ladle and the slate, and measure every skin to the line, no more and no less.', check:['wits', 19], req:()=>!S.f.b10_c3_countTried, fx:()=>{ S.f.b10_c3_countTried = 1; },
              edges:id=>[id === 'tangle' && ['he counts everything, and counts it again', 2], id === 'pruss' && ['a carter knows a barrel by its knock', 1], id === 'mirrel' && ['she measures doses for a living', 1], id === 'tegra' && ['her people measure water by the mouthful', 1], id === 'wenna' && ['she knows water by its weight', 1], id === 'sathi' && ['she would measure in the Weasels\' favour', -1], id === 'tallow' && ['he loses his place in a long list', -1]],
              near:{t:()=>`Yes, but the ladle slips at the very end, and a mouthful goes into the ${b103S('glass', 'dust')} and is gone, and every soldier in reach watches it go. ${b103Nmc(b103Who())} will carry that look a while: rattled.`, fx:()=>b103Rattle(b103Who())},
              go:'b10_c3_count_ok', fail:'b10_c3_count_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c3_count_ok:()=>({sp:'The water wagon', scene:b103Scene(false), fx:()=>{ S.f.b10_c3_counted = 'true'; }, txt:
`${by({sgt:'You take', tangle:'Tangle takes', pruss:'Pruss takes', _:'{who} takes'})} the slate and the ladle, and every skin goes to the line on the stick and no further, in the order on the slate, one after another down the company. A few of them try to hold their skins a little lower. It does not help them. The line is the line.

At the end, the clerk checks the barrels against the slate and finds them agree, which he says has not happened since the glass began. He writes it down, in case it never happens again.`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c3_count_no:()=>({sp:'The water wagon', scene:b103Scene(false), fx:()=>{ S.f.b10_c3_counted = 'slow'; }, txt:
`It goes wrong somewhere in the middle of the slate, where two names are smudged into one and a skin gets the ladle twice, and the line after it argues, and the clerk has to take the slate back and do the last of it himself, slowly, by the stick.

The count comes out right in the end. It takes longer, and everybody stood in the sun for it.`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the oxen at the picket: the trick, Into the Traces */
    b10_c3_oxen:()=>({sp:'The picket', scene:b103Scene(false), again:()=> S.f.b10_c3_harnessOk ? 'The oxen at the picket, heads down. The spare traces coiled by them.' : 'The oxen at the picket, heads down, breathing short.', txt:
`Two oxen at the picket, the company's last pair, standing with their heads down and their ribs showing like barrel-staves. They have been given their water. It was not enough, and it was more than the soldiers got. Spare traces hang coiled on the picket-post: the harness of the pairs that are gone.

${b10In('pruss') ? `Pruss is between them, with a hand on each neck. He has taken a spare trace down and is turning it in his hands, testing the leather. "They'll go in the night," he says. "Not tonight, maybe. Soon." He looks at the Third. "When they go, somebody leans into this. Want to know how?"` : b103South() ? `A Letherii carter is sitting with them, an old man with arms like rope, mending a trace with an awl. "When they go, somebody leans into this," he says, without looking up. "Soldiers lean wrong. Want to see right?"` : `Thallo comes over and looks at the beasts, and then at the coiled traces, and takes one down. "My da drove a dray in Malaz," he says. "Before the Empire was the Empire. When the horse went, he leaned." He holds the strap out. "Want to see how?"`}`,
      ch:[{t:'Learn to lean into a strap the carter\'s way, and take a squadmate with you when they go down.', check:['might', 21], trick:'b10_c3_harness', req:()=>!S.f.b10_c3_harnessTried, fx:()=>{ S.f.b10_c3_harnessTried = 1; },
            edges:id=>[id === 'pruss' && ['a carter\'s son: he has leaned into a load since before he could lift one', 2], id === 'brask' && ['the heavies\' line is a load leaned into, and he pulled the 9th\'s guns when the mules drowned', 2], id === 'sgt' && ['you marched behind the Fourteenth\'s wagons through a holy desert, and pushed them out of the sand', 1], id === 'tegra' && ['her people haul water up out of the ground on a strap', 1], id === 'doss' && ['on the holding he pulled the plough when the factor\'s ox died', 1], id === 'haddat' && ['she will not let go of a load once it is hers', 1], id === 'marrow' && ['she is not built for a strap, child', -1], id === 'mehet' && ['a townsman, and slight', -1]],
            go:'b10_c3_harness_ok', fail:'b10_c3_harness_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c3_harness_ok:()=>({sp:'The picket', scene:b103Scene(false), fx:()=>{ S.f.b10_c3_harnessOk = 1; gain('b10_c3_tracestrap'); }, txt:
`It is not the arms. ${b103Teacher()} shows it twice, and then ${by({sgt:'you have', pruss:'Pruss has it already, and', brask:'Brask has', _:'{who} has'})} it: the strap low across the chest, the weight leaned into it from the feet, not pulled, the load coming to you because you went to it first. And when the one beside you stumbles, a hand hooked in their strap, and the same lean, and they come up with you instead of going down.

${b10In('pruss') ? `"That's it," Pruss says. "Da'd say you lean like a Genabackan." He thinks about it. "That's a compliment, from him." He hands over the spare trace. "Keep it. They won't need it."` : `"That's it," says ${b103Boss()}. "You'll do." The spare trace goes into the Third's kit. "They won't need it," with a nod at the oxen.`}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c3_harness_no:()=>({sp:'The picket', scene:b103Scene(false), txt:
`It goes into the arms every time, and the arms go before the load does. ${b103Teacher()} watches it twice and shakes his head.

"You're pulling," ${b10In('pruss') ? 'Pruss says' : b103South() ? 'the carter says' : 'Thallo says'}. "Pulling's for people with time." The trace goes back on the post.`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the old marine: the Deck's third reader; words by phase */
    b10_c3_oldmarine:()=>({sp:'The old marine', scene:b103Scene(false), fx:()=>{ S.f.b10_c3_old = 1; }, again:()=>'The old marine, under his cloak, with his cup and his cards.', txt: b103Ph() >= 4 ?
`The old marine is under his cloak with his cup upside down beside him, to keep the dust out of nothing. "${b103Haul() ? 'Saw you come in at grey light, in the traces,' : 'Saw you come in at grey light, heavy with skins,'}" he says. "Saw worse. Not often." He settles his head on his pack. "Wake me at dusk. Or don't. I'll know."` :
`The old marine has his cloak up on a spear-shaft he did not carry and his deck in his lap, out of the light. ${b103South() ? `"Lent south with you," he says, when he sees the Third. "The clerks forgot to un-lend me." He seems content about it. "The long way round's still a way."` : `"Still walking," he says, when he sees the Third. "Both of us." He looks out at the glare. "Fifty years in the army, and I never once crossed anything the short way. Seems I'm making up for it."`}

He turns the cup over. Nothing in it. He turns it back. "Cards, if you want them. Before it's too bright to see the faces."`,
      ch:[...(b103Ph() === 1 ? [b10ReadChoice(3)] : []),
          {t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the west edge: the column lying up (the heavies' captain seen; or the brigades on 'south') */
    b10_c3_west:()=>({sp:b103S('The column', 'The brigades'), scene:b103Scene(false), fx:()=>{ S.f.b10_c3_west = 1; }, again:()=>b103S('The column lying up westward under its cloaks, as far as the glare lets you see.', 'The brigades lying up along the road, wagon after wagon.'), txt: b103South() ?
`West and south along the road the brigades are lying up wagon by wagon, a long broken line of shade with people in it. Somewhere far down it, small, there is a banner on a pole that the carters say is the Commander's. Nothing near it is moving.

A Letherii sergeant asleep under a cart has his boots off and his feet in the sun, which the Third's experience says he will regret.` :
`West, the column lies up under its cloaks as far as the glare lets anybody see: a long low village of cloth on the white floor, and between the cloaks the wagons, and between the wagons the beasts at their pickets with their heads down.

The heavies' captain is walking the line, slowly, stopping at every cloak to look at feet. He looks at the Third's, and nods, and goes on. Further off, the horse-folk have their horses in the middle of a ring of riders, and are giving the horses water from their own skins.${b103If('pruss', `\n\nPruss watches the horse-folk a while. "Horses first," he says. "Right. Da would say right."`)}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the east edge: the open ground; the stragglers' way in */
    b10_c3_edge:()=>{ if (b103Ready() && !S.f.b10_c3_wagonDone) return DLG.b10_c3_strag();
      return {sp:'The open ground', scene:b103Scene(false), txt: b103South() ?
`East of the road the dry country runs away flat and brown, with a line of thorn far off that might mean water or might mean thorn. ${S.f.b10_c3_wagonDone ? 'The carters who came for the barrels went back up the road this way, and are gone.' : 'Up the road, a long way off, a few figures are walking back along the column from a wagon that has stopped.'}` :
`East, the glass goes away flat and white to the end of the world, and the air above it wobbles. There is nothing on it. ${S.f.b10_c3_wagonDone ? 'The stragglers\' sergeant took them back across it to their own company, and they are under their own cloaks now.' : 'Off to the north-east, where the next company is lying up, a few figures are standing in the sun when everybody sane is under a cloak.'}`,
        ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}; },

    /* the stragglers: they come for the water wagon at noon */
    b10_c3_strag:()=>({sp:b103S('Stragglers', 'Thirsty carters'), scene:b103Scene(false), fx:()=>{ S.f.b10_c3_stragSeen = 1; }, again:()=>'The shapes on the open ground, closer, walking wrong.', txt:
`Noon, or near it. The glare is so bright that the shapes on the open ground seem to swim, and for a while nobody is sure they are walking toward the wagon. Then everybody is.

${b103South() ? 'A handful of carters, Bolkando and Letherii both, from the wagon up the road that went dry.' : 'Six or seven soldiers from the next company\'s lie-up, in Malazan kit, with no officer.'} They walk wrong: too fast, then too slow, then too fast. One of them has a stave. One has a knife that flashes in the sun like a signal. They are not looking at the Third. They are looking at the barrels.${b103Say({haddat:'\n\nHaddat stands up out of the shade with her shield. "They are ours," she says. "That is the worst of it."', tangle:'\n\nTangle stands up and looks at the barrels and then at them. "The count says no," he says, very quietly. "I hate that the count says no."', _:''})}${b103If('pruss', `\n\nPruss has put himself between the barrels and the open ground without anyone telling him to.`)}`,
      ch:[{t:'"Third. Up. Between them and the wagon." Shields up, and meet them.', go:()=>startBattle('b10_c3_wagon', {})},
          {t:'Get round them along the cloaks, low, and be at the wagon\'s far side before they see you.', check:['guile', 19],
            edges:id=>[id === 'sathi' && ['she came at Odhan camps this way for the Weasels', 2], id === 'tegra' && ['her people hunt across open ground', 2], id === 'mehet' && ['he grew up out of sight in Y\'Ghatan', 1], id === 'wenna' && ['she reads the ground for its low places', 1], id === 'pruss' && ['heavy scale in the glare is a mirror', -1], id === 'ottar' && ['grey plate in the glare is a bigger mirror', -2]],
            near:{t:()=>`Yes, but the ${b103S('glass', 'road')} is hot enough to burn through a glove, and ${b103Nm(b103Who())} ${b103V(b103Who(), 'go', 'goes')} down on a knee on it getting there. ${b103Nmc(b103Who())}'ll carry that into the fight.`, fx:()=>bruise(b103Who(), bruiseN())},
            go:()=>startBattle('b10_c3_wagon', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c3_strag_seen'},
          {t:b103South() ? 'Call to them by their wagons. They are carters, not raiders.' : 'Call to them by their company. They are soldiers, and somebody should remind them.', check:['wits', 19], witness:true, req:()=>!S.f.b10_c3_callTried, fx:()=>{ S.f.b10_c3_callTried = 1; },
            edges:id=>[id === 'haddat' && ['she says the names of the dead every night; she can say the names of the living', 2], id === 'sgt' && ['you have called a frightened line back to itself before', 1], id === 'pruss' && ['he answered a roll for four years; he knows how a name lands', 1], id === 'marrow' && ['she talks to the fevered, child, and they hear her', 1], id === 'ottar' && ['the Perish taught him how to address the lost', 1], id === 'sathi' && ['her voice does not calm anybody', -1]],
            near:{t:()=>`Yes, but one of them does not hear it, and comes on anyway, and is on ${b103Nm(b103Who())} with the stave before ${b103V(b103Who(), 'you can', 'anyone can')} close. ${b103Nmc(b103Who())}'ll feel that in the fight.`, fx:()=>bruise(b103Who(), bruiseN())},
            go:'b10_c3_call_ok', fail:'b10_c3_call_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c3_strag_seen:()=>({sp:b103S('Stragglers', 'Thirsty carters'), scene:b103Scene(false), txt:
`The knife-man sees the movement among the cloaks and shouts, a dry cracked sound, and they come on at a run, all of them, straight for the barrels.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c3_wagon', {surprise:'e'})}]}),
    b10_c3_call_ok:()=>({sp:b103S('Stragglers', 'Thirsty carters'), scene:b103Scene(false), fx:()=>{ S.f.b10_c3_called = 'sat'; }, txt:
`${by({sgt:'You call it', haddat:'Haddat calls it', pruss:'Pruss calls it', _:'{who} calls it'})} across the open ground, not loud: ${b103South() ? 'the names of their wagons, their brigade, their trade, the way the train calls the carters to the teams at dusk' : 'their company\'s number, and their captain\'s name, and then the army\'s name, the way a sergeant says it at a muster'}.

One of them stops. Just stops, in the glare, and looks down at the stave in his hand as if somebody had given it to him, and sits down where he is and puts his face in his hands. The rest come on. Fewer.`,
      ch:[{t:'Shields up. Meet the rest.', go:()=>startBattle('b10_c3_wagon', {drop:[3]})}]}),
    b10_c3_call_no:()=>({sp:b103S('Stragglers', 'Thirsty carters'), scene:b103Scene(false), fx:()=>{ S.f.b10_c3_called = 'no'; }, txt:
`It goes out across the open ground and comes back with nothing on it. They do not hear. They are not anyone's ${b103S('company', 'carters')} just now. They are thirst, walking.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c3_wagon', {})}]}),
    b10_c3_wagon_after:()=>({sp:'The water wagon', scene:b103Scene(false), fx:()=>{ if (!S.f.b10_c3_wagonDone) { S.f.b10_c3_wagonDone = 1; gain('b10_c3_glassknife'); } }, txt:
`They are down, all of them, on the ${b103S('glass', 'road')} round the wagon, and they stay down: not because they cannot get up, mostly, but because there is nothing left in them to get up with. The corporal with the glittering knife is sitting against a wheel with his hands open on his knees.

${b103South() ? 'A Bolkando foreman comes down the road at a run with two of his own, and stands over his carters and says something in his own tongue that sounds like an apology to them and to the Third at the same time. They go back up the road between his two, slowly.' : 'Their sergeant comes across the glass at a run, a grey woman with her helm off, and stands over them and does not shout. "They\'re mine," she says. "They\'re Bonehunters. Same as you." She looks at the wagon. "They weren\'t, just now." Her people go back with her between two of her corporals, slowly.'}

The knife stays where the corporal dropped it: a blade knapped out of the glass, bound to a stick with gut, wickedly sharp. ${b103South() ? 'The foreman' : 'The sergeant'} looks at it and away. "Keep it," ${b103South() ? 'he' : 'she'} says. "He'll only make another."${b103Say({pruss:`\n\nPruss is checking the barrels' lashings, one by one, all the way down the wagon. All of them hold. He checks them again.`, haddat:`\n\nHaddat watches them go. "We will have to say their names one day," she says. "I would rather not have to."`, _:''})}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* ======== the circle: by phase. 1 the first lie-up, 4 the second (the beat). The games pass wraps this node: keep the id ======== */
    b10_c3_fire:()=>{ const ph = b103Ph(), later = ph >= 4, rk = later ? 'b10_c3_rest2' : 'b10_c3_rest1', beatOpen = later && !b10BeatOf(3);
      if (b103Night()) return {sp:'The column', scene:b103Scene(true), html:witnessHTML(), txt:
`There is no circle while the column walks. The Third is wherever it is, close together in the dark, and that will have to do until grey light.`,
        ch:[{t:'Walk on.', go:()=>startExplore()}]};
      return {sp:'The Third\'s circle', scene:b103Scene(false), html:witnessHTML(),
        again:()=>'The Third\'s circle under the cloaks. No fire. Nothing to burn and nothing to cook.', txt:
`${b103South() ? 'There is no fire at a lie-up on the long way round either: no wood, and no wish to make the day hotter. The Third\'s fire is its circle, in the shade of the Twelfth\'s wagon, knees nearly touching.' : 'There is no fire in the glass. Nothing to burn, and nothing to cook, and nobody wants to be any warmer. The Third\'s fire is its circle: the cloaks propped close together, and the squad under them in a ring, knees nearly touching.'}${!later ? (S.f.b10_c3_wagonDone ? ' The sun is going over. When the shade of the cloaks starts to lengthen, the column gets up.' : '') : ` ${b103Haul() ? 'The wagon stands in the middle of the lie-up with the Third\'s strap-marks on it, and the company drawing its ration from it at the tailboard.' : 'The skins the Third carried hang from the spear-shafts, lighter than they were at grey light.'}`}${b103If('pruss', `\n\nPruss sits with his back to ${later && !b103Haul() ? 'a barrel he rolled the last stretch himself' : 'a wagon wheel'}, his old sergeant's helm by his boot.`)}`,
        ch:[...(ph === 1 ? [b10ReadChoice(3)] : []),
            ...(beatOpen ? [{t:'"What are we marching for?" Ask it, in the circle.', go:'b10_c3_beat'}] : []),
            {t:'Lie up an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(later ? 'The squad lies up an hour in the circle. Wounds close, mostly. A mouthful saved for the worst of them.' : 'The squad lies up an hour under the cloaks. Wounds close, most of them.'); }, go:'b10_c3_fire_rest'},
            {t:'Talk with the squad.', go:'b10_c3_fire_talk'},
            {t:'Dusk. Up, and on.', req:()=>ph === 1 && !!S.f.b10_c3_wagonDone, onward:true, fx:()=>{ S.f.b10_c3_ph = 2; }, go:()=>{ startExplore('b10_c3_march'); talk('b10_c3_dusk'); }},
            {t:'Dusk again. Up, and on east.', req:()=>later, onward:true, go:'b10_c3_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c3_fire_rest:()=>({sp:'The Third\'s circle', scene:b103Scene(false), txt:
`An hour, then, under the cloaks, with the heat lying on the cloth like a hand and the light coming through it ${b103S('white', 'brown')}.

${b103Say({mirrel:'Mirrel goes round the circle with her skin and gives each of them one mouthful, and watches each one swallow it, and does not take one herself until the end. Then she takes half.', marrow:'Marrow goes round the circle with her hands, and stops at each of them long enough to frown. She closes a cut anyway, slowly. The Lady is far off out here.', _:'Some of them sleep. The rest lie still and pretend to.'})}${S.f.b10_c3_thirst && TPL[S.f.b10_c3_thirst] && b10In(S.f.b10_c3_thirst) ? `\n\n${NAME(S.f.b10_c3_thirst)} gets a mouthful saved by the rest of the circle, without being asked, and does not argue about it. The cracked lips do not close. The slowness goes, mostly.` : ''}${b103If('pruss', `\n\nPruss sleeps sitting up against the wheel with the helm in his lap, the way carters sleep on a long road.`)}`,
      ch:[{t:'Back to the circle.', go:'b10_c3_fire'}]}),
    b10_c3_fire_talk:()=>{ const later = b103Ph() >= 4, ln = [];
      Object.keys(B103TALK).forEach(id => { if (b10In(id)) ln.push(B103TALK[id][later ? 1 : 0]()); });
      return {sp:'The Third\'s circle', scene:b103Scene(false), txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You lie in the circle with it, and that is the talk.`,
        ch:[{t:'Back to the circle.', go:'b10_c3_fire'}]}; },

    /* ======== phase 2: the night march ======== */
    b10_c3_dusk:()=>({sp:b103S('The night march', 'The road south'), scene:b103Scene(true), again:()=>'The column walking east in the dark, no lamps, the stars above and below.', txt: b103South() ?
`At dusk the brigades get up out of the shade of their wagons and the carters put the teams to, and the column goes on south in the dark without a lamp. The road is grey under the stars, and the dry country black on both sides of it, and far to the north, where the sky meets the ground, there is a paleness that does not move: the glass, with the army on it somewhere.

The Twelfth's supply wagon rolls in the middle of the line with its team leaning into the yokes. The oxen are slower than they were at grey light. They were slower at grey light than the dusk before.${b103If('pruss', `\n\nPruss walks at the near ox's head with his hand on its neck, and talks to it under his breath, the way his da did.`)}` :
`At dusk the column gets up out of its cloaks and folds them, and the wagons roll, and the heavies fall into their files, and it goes on east in the dark without a lamp. Overhead the stars come out. Underfoot, a breath later, they come out again, the same stars, thrown back by the glass, so that the column walks between two skies and the only sound is boots and wheels and the beasts breathing.

The company's water wagon rolls in the middle of the line. Its oxen lean into the yokes. They are slower than they were at grey light, and they were slower at grey light than the dusk before.${b103If('pruss', `\n\nPruss walks at the near ox's head with his hand on its neck, and talks to it under his breath, the way his da did.`)}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    /* the far ground to the north: the dead city far off (or, on 'south', the glass's edge); the chapter's one Witness "yes, but" */
    b10_c3_city:()=>({sp:'The far ground', scene:b103South() ? b103Scene(true) : 'b10_c3_city', again:()=>b103S('The far ground to the north, and the straight line on the horizon.', 'The paleness on the northern horizon that is the glass.'), txt: b103South() ?
`From a low rise beside the road you can see north a long way under the stars. The dry country goes away dark, and then, where the sky comes down, it goes pale: a long thin paleness on the horizon from one side of the world to the other, that does not move and does not end.

The glass. The army is somewhere on it, walking east in the dark without a lamp, with the heavies in its files. The Third is not.${S.f.b10_c3_cityTried ? '' : '\n\nIf you looked long enough, you might tell yourself you could see them.'}` :
`From a long low rise in the glass you can see north a long way under the stars. The glass goes away dark and glittering, and then, on the horizon, very far off, there is a line that is too straight to be ground: a long level edge with notches in it, and here and there something standing up from it that might be a tower. Nothing moves on it. No light.

The column does not turn toward it. The column is not that kind of fool.${S.f.b10_c3_cityTried ? '' : '\n\nIf you looked long enough, you might be able to tell what it is.'}${b103If('pruss', `\n\nPruss looks at it and then away, quickly, as a carter looks away from a dead beast by the road.`)}`,
      ch:[{t:b103South() ? 'Look north until you can tell yourself what you are seeing.' : 'Look until you can tell what it is.', check:['wits', 19], req:()=>!S.f.b10_c3_cityTried, fx:()=>{ S.f.b10_c3_cityTried = 1; },
            edges:id=>[id === 'tebbet' && ['a bowman\'s eye for a far mark', 2], id === 'tegra' && ['her people read the far ground by starlight', 2], id === 'wenna' && ['she reads ground', 1], id === 'yorin' && ['he watches horizons for a living', 1], id === 'tallow' && ['he sees what he expects to', -1]],
            near:{t:()=> b103South() ? `Yes, but the longer ${b103Nm(b103Who())} ${b103V(b103Who(), 'look', 'looks')}, the plainer it is that the army is out there on it and the Third is here, on the long way round, lent out like a spare spade. The squad carries that back to the road with it.` : `Yes, but the longer ${b103Nm(b103Who())} ${b103V(b103Who(), 'look', 'looks')}, the plainer it is that a city stood out here once, a big one, and the glass came anyway. The squad carries that back to the column with it.`, fx:()=>{ b10Witness(-1, b103South() ? 'the army out there without us' : 'a city died out here'); }},
            go:'b10_c3_city_ok', fail:'b10_c3_city_no'},
          {t:'Back to the column.', go:()=>startExplore()}]}),
    b10_c3_city_ok:()=>({sp:'The far ground', scene:b103South() ? b103Scene(true) : 'b10_c3_city', fx:()=>{ S.f.b10_c3_city = 1; }, txt: b103South() ?
`${by({sgt:'You look', tebbet:'Tebbet looks', tegra:'Tegra looks', _:'{who} looks'})} until the eyes water, and the paleness stays a paleness, and nobody can see an army on it. But it is there. The soldiers on the road say the army is going straight across. You can believe that, looking at it. It is all straight across.

Then the road bends, and the rise is behind, and the glass is only a paleness again.` :
`${by({sgt:'You look', tebbet:'Tebbet looks', tegra:'Tegra looks', _:'{who} looks'})} until the eyes water. Walls. A long city wall, broken in places, and towers along it, some standing, some not. A city, once, out here where nothing is. Whoever lived in it is a long time gone, and the glass came up to its gates and stopped, or did not stop.

The column walks on east, not toward it. Its name, if it has one, is not one the soldiers know.`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    b10_c3_city_no:()=>({sp:'The far ground', scene:b103South() ? b103Scene(true) : 'b10_c3_city', fx:()=>{ S.f.b10_c3_city = 1; }, txt:
`The stars and the glitter and the dark run together, and the longer you look the less it is anything: a line, a shadow, a trick of the starlight on ${b103S('the glass', 'a long way of nothing')}. Then the column has moved on, and the rise is behind it.`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),

    /* the rearguard (or the train's tail on 'south'): the one line of the Letherii */
    b10_c3_rear:()=>({sp:b103S('The rearguard', 'The train\'s tail'), scene:b103Scene(true), fx:()=>{ S.f.b10_c3_rear = 1; }, again:()=>b103S('The rearguard, walking backwards half the time.', 'The tail of the train, the wagons strung out.'), txt:
`${b103South() ? 'West, the train strings out down the road behind the Twelfth: wagon after wagon, the teams with their heads low, the carters walking at their heads.' : 'West, the column\'s rearguard walks a file\'s length behind the last wagon, turning every few steps to look back at the empty glass, as if something might be following that would care to.'}

${b103Rumour()}${b103If('haddat', `\n\nHaddat listens, and nods. Later, under her breath, among the names, there is one more word: <em>Letherii</em>.`)}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),

    /* the water wagon at night: the last ox goes down, and the key */
    b10_c3_wagonn:()=>{ const ph = b103Ph();
      if (ph === 3) { if (b103Haul()) return !S.f.b10_c3_tracesDone ? DLG.b10_c3_traces() : !S.f.b10_c3_through ? DLG.b10_c3_shelf() : {sp:'The wagon', scene:b103S('b10_traces', 'b10_south_night'), txt:
`The wagon rolls on east with the Third in its traces, two to a strap, leaning. It is slower than the column. It is not stopping.`,
          ch:[{t:'Back to it.', go:()=>startExplore()}]};
        return !S.f.b10_c3_carried ? DLG.b10_c3_cutloose() : {sp:'The wagon', scene:b103Scene(true), txt:
`Behind the column now, the wagon stands where the Third left it, small and getting smaller, with the starlight on its tilt and its traces lying on the ${b103S('glass', 'road')}.`,
          ch:[{t:'Back to the column.', go:()=>startExplore()}]}; }
      return {sp:b103S('Thallo', 'The Twelfth\'s wagon-master'), scene:b103Scene(true), html:witnessHTML(), again:()=>`The water wagon, stopped, the oxen down in the traces. ${b103BossC()} waiting.`, txt:
`Somewhere in the middle of the night the near ox stops. It does not fall. It stands, and its legs fold under it slowly, the way a tired man sits, and it kneels in the traces with its head down, and does not get up. The other stands over it a while, breathing short. Then it kneels too.${b103South() ? ' The team was failing slower than the glass oxen did, the carters say. It got here anyway.' : ''}

The wagon stops. The column does not. It walks on past in the dark, file after file, not looking.

${b103South() ? `The wagon-master stands at the oxen's heads with his ledger shut. "Team's done," he says. "Supply wagon of the Twelfth: barrels, and the company's biscuit, and the spares." He looks at the Third. "Either it comes with us, or it stays. The brigades won't wait for one wagon. The Commander can't afford to." He holds the ledger against his chest. "You're my drill-sergeants. Drill something."` : `Thallo comes back down the line at a heavy trot and looks at the oxen and then at the wagon. "Captain's word," he says. "Beasts are done all down the column. Every wagon whose team goes, the heavies take the traces or the wagon stays." He jerks his head at the barrels. "This one's the company's water. Your call, Sergeant. You had it at noon."

He looks at the coiled traces on the tailboard. "I'll take a strap if you take it."`}${b103If('pruss', `\n\nPruss is kneeling by the near ox with his hand on its neck. He stays there a moment after it has stopped breathing. Then he stands up and picks up the trace. "Beasts die first," he says. "Then the carters." He looks at the Third. "I'm a carter."`)}${b103If('tangle', `\n\nTangle is looking at the barrels. "Eleven," he says. "We can carry three on our backs, filled into skins. Maybe four." He doesn't say the rest. He doesn't have to.`)}`,
        ch:[{t:'"We take the traces. The wagon comes with us."', fx:()=>{ S.f.b10_c3_key = 'haul'; S.f.b10_c3_hauled = 1; S.f.b10_c3_ph = 3; b103L('pruss', 1); }, go:'b10_c3_key_haul'},
            {t:'"Cut it loose. Fill every skin, and carry what we can."', fx:()=>{ S.f.b10_c3_key = 'cut'; S.f.b10_c3_ph = 3; b10Witness(-1, 'left it in the glass'); b103L('tangle', 1); }, go:'b10_c3_key_cut'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b10_c3_key_haul:()=>({sp:'The traces', scene:b103S('b10_traces', 'b10_south_night'), txt:
`The dead oxen come out of the yokes, which takes six of the Third and longer than anyone would like. Then the traces go across shoulders, two to a strap, the way ${b103Teacher()} shows: low, across the chest, leaned into from the feet.${b103South() ? ' The wagon-master takes the tongue himself and steers.' : ' Thallo takes the near strap beside Pruss, and the two biggest soldiers in the company lean together.'}

On the word, the wagon moves. It moves slowly, and it moves less than the column does, and the column walks away from it into the dark. But it moves.${b103If('pruss', `\n\n"That's it," Pruss says through his teeth. "That's it. Let it come to you."`)}${b103If('haddat', `\n\nHaddat has the strap over the blue shield where it is slung, and leans into both.`)}`,
      ch:[{t:'Lean into it.', go:'b10_c3_traces'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c3_key_cut:()=>({sp:'The water wagon', scene:b103Scene(true), txt:
`${b103BossC()} nods. It is the answer half the column is giving tonight. "${b103South() ? 'Carry what you can, then,' : 'Fill what you can, then,'}" ${b103South() ? 'he' : 'he'} says. "I'll get the rest of the company's skins down the line to you." ${b103South() ? 'He opens the ledger and draws a line through something.' : 'He goes off up the column at a heavy trot.'}

The Third cuts the traces from the dead oxen with the glass knife, because it is the sharpest thing anyone has, and the barrels' bungs come out one by one.${b103If('tangle', `\n\nTangle is already working out the weight per back. "Three barrels' worth," he says. "And a bit. If nobody drinks it on the way." Everybody looks at him. "I'm only saying the sum."`)}${b103If('pruss', `\n\nPruss coils the cut trace and puts it in his pack. He does not say why.`)}`,
      ch:[{t:'Fill every skin. Carry what can be carried.', go:'b10_c3_cutloose'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 3, 'haul': the traces ======== */
    b10_c3_traces:()=>({sp:'The traces', scene:b103S('b10_traces', 'b10_south_night'), txt:
`The column is a sound ahead in the dark now, and then not even that. The wagon creaks on alone with the Third in its traces.

Behind it, out of the dark, something is walking fast: the slap of feet, a cracked voice saying something over and over that might be the word for water. More than one. They heard the barrels slopping.${b103If('pruss', `\n\nPruss does not stop leaning. "Keep it rolling," he says. "You lot turn round."`)}`,
      ch:[{t:'"Half of you out of the straps. Shields on the tailboard. The rest keep it rolling."', go:()=>startBattle('b10_c3_traces', {})},
          {t:'Out of the straps quietly, and wait for them in the dark beside the wheels.', check:['guile', 19],
            edges:id=>[id === 'sathi' && ['she has waited in the dark for worse', 2], id === 'tegra' && ['her people wait by night', 2], id === 'tebbet' && ['a bowman knows how to wait', 1], id === 'mehet' && ['he grew up in the dark in Y\'Ghatan', 1], id === 'pruss' && ['he will not let go of the strap', -1], id === 'ottar' && ['grey plate in the starlight', -2]],
            near:{t:()=>`Yes, but the strap comes off ${b103Nm(b103Who())} badly in the dark and takes skin with it. ${b103Nmc(b103Who())}'ll carry that into the fight.`, fx:()=>bruise(b103Who(), bruiseN())},
            go:()=>startBattle('b10_c3_traces', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c3_traces_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c3_traces_seen:()=>({sp:'The traces', scene:b103S('b10_traces', 'b10_south_night'), txt:
`A buckle rings on the wagon's iron, and the walking stops, and then it starts again, faster.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c3_traces', {surprise:'e'})}]}),
    b10_c3_traces_after:()=>({sp:'The traces', scene:b103S('b10_traces', 'b10_south_night'), fx:()=>{ b103TracesDone(); }, txt:
`They stop wanting it, in the end, the way the thirsty do: not all at once, but one by one, sitting down on the ${b103S('glass', 'road')} where they are and not getting up, and the wagon creaks on away from them. Their own will find them by grey light. The Third leaves them a skin between them, which nobody argues about and everybody feels.

Then it is back into the traces, and the lean, and the long dark.${(() => { const th = b103ThirstWho(); return th === 'waived' ? `\n\nThe skins the Third filled at the sappers' wells, the night before the glass, are still heavy enough to go round. The traces go round on them.` : th && TPL[th] ? `\n\nSomewhere in the middle of the night ${NAME(th)} gives a mouthful to the one beside in the traces, and then another, and has the thirst after: lips split, and a slowness in everything.` : ''; })()}

Ahead, across the line of march, the starlight shows a shelf in the ${b103S('glass', 'road')}: knee-high, ragged, the kind of thing the oxen would have pulled the wagon over without noticing.`,
      ch:[{t:'The shelf.', go:'b10_c3_shelf'}]}),
    b10_c3_shelf:()=>({sp:'The shelf', scene:b103S('b10_traces', 'b10_south_night'), txt:
`A shelf ${b103S('in the glass, where something long ago cooled in a ridge', 'across the road, where the dry ground has broken in a ledge')}, knee-high and ragged, running away into the dark on both sides as far as anybody can see. The column's tracks go over it. The column did not have a wagon.

${b103Say({pruss:'Pruss looks at it, and at the wheels, and spits, which out here is generous. "Front wheels first," he says. "All of us. Then the back. Don\'t stop between."', tangle:'Tangle looks at it and does a sum he does not like. "It goes over," he says. "Or it goes round. Round is long."', _:'The Third looks at it, and at the wagon, and at each other.'})}`,
      ch:[{t:'Everybody in the traces, and lift it over: front wheels, then back, and no stopping between.', check:['might', 19], req:()=>!S.f.b10_c3_shelfTried, fx:()=>{ S.f.b10_c3_shelfTried = 1; },
            edges:id=>[S.f.b10_c3_harnessOk && ['the carter\'s lean: the squad learned it at the picket', 1], id === 'pruss' && ['a carter\'s son: wheels over a ledge is his whole trade', 2], id === 'brask' && ['heavies carry what nobody else will', 2], id === 'haddat' && ['she will not let a load go', 1], id === 'doss' && ['he has pulled a plough out of a ditch', 1], id === 'marrow' && ['she is not built for this, child', -2], id === 'mehet' && ['a townsman, and slight', -1]],
            near:{t:()=>`Yes, but the back wheels drop off the far side of the shelf with all the weight of the barrels behind them, and the strap goes across ${b103Nm(b103Who())} like a whip. ${b103Nmc(b103Who())}'ll feel that a while.`, fx:()=>bruise(b103Who(), bruiseN())},
            go:'b10_c3_shelf_ok', fail:'b10_c3_shelf_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c3_shelf_ok:()=>({sp:'The shelf', scene:b103S('b10_traces', 'b10_south_night'), fx:()=>{ b103Through('over'); }, txt:
`On the word, the whole Third leans at once. The front wheels go up onto the shelf with a crack like a branch breaking, and nobody stops, and the back wheels come up after them grinding, and then the whole wagon drops off the far side with a slop of water in every barrel, and is over.

There is no cheering. There is not enough spit in the squad to cheer with. ${by({sgt:'You', pruss:'Pruss', brask:'Brask', _:'{who}'})} ${by({sgt:'stand', _:'stands'})} with ${by({sgt:'your', pruss:'his', brask:'his', _:'a'})} hands on knees for a while, breathing. Then back into the straps.

By grey light the wagon comes up to the lie-up behind the column with the Third in its traces where the oxen were, and the company comes out from under its first cloaks to look at it.`,
      ch:[{t:'On, to the lie-up.', go:()=>startExplore()}]}),
    b10_c3_shelf_no:()=>({sp:'The shelf', scene:b103S('b10_traces', 'b10_south_night'), fx:()=>{ b103Through('round'); }, txt:
`The front wheels go up and the back wheels will not, and the wagon hangs on the shelf's edge with the barrels sloshing, and the straps go slack, and it rolls back. Twice.

So it goes round. Along the foot of the shelf in the dark until the shelf runs down into the ${b103S('glass', 'ground')} again, a long way, and back to the column's tracks, a long way. By grey light the wagon comes up to the lie-up behind the column with the Third in its traces, late, and the company is already under its cloaks. Some of them come out again to look.`,
      ch:[{t:'On, to the lie-up.', go:()=>startExplore()}]}),

    /* ======== phase 3, 'cut': carry what can be carried ======== */
    b10_c3_cutloose:()=>({sp:'The water wagon', scene:b103Scene(true), txt:
`The barrels are open. Skins come down the line from the rest of the company, and go back up it full, and the Third's own are filled last, and then everything the Third owns that will hold water: the squad's two cook-pots with their lids lashed, a helm with a cloth over it, Tangle's satchel lined with an oilskin, emptied of everything but munitions.

What is left in the barrels, the Third cannot carry. It has to be said aloud, and is.${b103If('pruss', `\n\nPruss has two full skins on the trace-strap across his back and is reaching for a third.`)}`,
      ch:[{t:'Shoulder it all, every skin and pot, and walk on after the column without spilling.', check:['might', 19], req:()=>!S.f.b10_c3_carryTried, fx:()=>{ S.f.b10_c3_carryTried = 1; },
            edges:id=>[S.f.b10_c3_harnessOk && ['the carter\'s lean: a load sits better leaned into', 1], id === 'pruss' && ['four skins and a run, for a living', 2], id === 'brask' && ['heavies carry what nobody else will', 2], id === 'tegra' && ['her people carry water a long way', 1], id === 'haddat' && ['she will not let a load go', 1], id === 'marrow' && ['she is not built for this, child', -2], id === 'mehet' && ['a townsman, and slight', -1]],
            near:{t:()=>`Yes, but the straps of ${b103Nm(b103Who())}'s load cut in deeper with every step, and by grey light there are raw red lines across ${b103V(b103Who(), 'your', 'both')} shoulders. ${b103Nmc(b103Who())}'ll feel that in a fight.`, fx:()=>bruise(b103Who(), bruiseN())},
            go:'b10_c3_carry_ok', fail:'b10_c3_carry_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c3_carry_ok:()=>({sp:'The water wagon', scene:b103Scene(true), fx:()=>{ b103Carried('all'); }, txt:
`The Third walks after the column heavy as a mule train, every skin full and every pot lashed, and nothing spilled, and nobody drinks on the way though everybody wants to.

Behind it the wagon stands where it stopped, small and getting smaller, with the starlight on its tilt and the dead oxen in front of it, and what was left in the barrels still in them. ${b103South() ? 'The wagon-master looks back at it once and draws a second line in the ledger.' : 'Somebody in another company will find it at grey light, and do the same, and leave it again.'}

By grey light the Third comes up to the lie-up behind the column with its backs bent, and puts the skins down in the circle, and counts them, and they are all there.${b103If('pruss', `\n\nPruss sets his skins down in a row, the way he set the boots out by the wash in the camp after the short-tails. "All there," he says. He does not look back.`)}`,
      ch:[{t:'On, to the lie-up.', go:()=>startExplore()}]}),
    b10_c3_carry_no:()=>({sp:'The water wagon', scene:b103Scene(true), fx:()=>{ b103Carried('most'); }, txt:
`It goes well for a while. Then a lashing slips in the dark and a cook-pot goes over, and then a skin's stopper works loose on somebody's back and nobody notices until it is half gone into the ${b103S('glass', 'dust')}.

By grey light the Third comes up to the lie-up behind the column with most of what it carried. Most. Behind it the wagon stands where it stopped, small and getting smaller, with the starlight on its tilt.`,
      ch:[{t:'On, to the lie-up.', go:()=>startExplore()}]}),

    /* the way east at the night area's edge */
    b10_c3_east:()=>({sp:b103S('The column', 'The road'), scene:b103Scene(true), txt: b103Ph() === 3 && b103NightDone() ?
`East, the column has already halted, a long way ahead, and the first cloaks are going up on their spear-shafts against a sky going grey. ${b103Haul() ? 'The wagon creaks toward it behind the Third.' : 'The Third walks toward it heavy with skins.'}` :
`East, the column walks on into the dark. ${b103Ph() === 3 ? 'The Third has the wagon\'s business first.' : 'The company\'s water wagon is somewhere in the middle of it, its oxen leaning, slowing.'}`,
      ch: b103Ph() === 3 && b103NightDone() ? [{t:'Grey light. On, to the lie-up.', onward:true, fx:()=>{ S.f.b10_c3_ph = 4; }, go:()=>{ startExplore('b10_c3_lieup2'); talk('b10_c3_grey'); }},
                                                 {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the column.', go:()=>startExplore()}]}),

    /* ======== phase 4: the second lie-up ======== */
    b10_c3_grey:()=>({sp:b103S('The lie-up', 'The road\'s edge'), scene:b103Scene(false), fx:()=>{ S.f.b10_c3_grey = 1; }, again:()=>'The lie-up, the cloaks up, the glare coming.', txt:
`Grey light again, and the cloaks go up again, and the ${b103S('glass', 'dry country')} goes white again. It is the same lie-up as the last and the one before it. Only the soldiers under the cloaks are not quite the same.

${b103Haul() ? `The wagon stands in the middle of the lie-up where the Third dragged it, with the dead oxen's yokes still on the tongue and the strap-marks on every shoulder in the squad. The company comes to the tailboard for its ration and looks at the Third on the way past. ${b103South() ? 'The Twelfth\'s carters' : 'A few of them'} nod. One puts a hand on Pruss's arm without stopping.` : `The skins the Third carried hang from the spear-shafts in a row. Somewhere far back in the dark there is a wagon standing in the ${b103S('glass', 'road')} with its barrels still half full, and every soldier in the Third knows exactly how far back.`}${(() => { const th = S.f.b10_c3_thirst; return th && TPL[th] && b10In(th) ? `\n\n${NAME(th)} lies up in the shade with cracked lips and a slowness, and the circle is careful of it.` : ''; })()}`,
      ch:[{t:'Walk the lie-up.', go:()=>startExplore()}]}),
    b10_c3_wagon2:()=>({sp:b103Haul() ? 'The wagon' : 'The skins', scene:b103Scene(false), fx:()=>{ S.f.b10_c3_wagon2 = 1; }, txt: b103Haul() ?
`The wagon, at rest, with the clerk at the tailboard doling the company's ration to the line on his stick. The barrels are lower. They are all there. ${b103If('tangle', 'Tangle has counted them, and counts them again for you, and they come out the same. ')}The near trace has a dark smear on it where somebody's shoulder bled into the leather in the night.

${b103South() ? 'The wagon-master writes something in his ledger, a long line, and shows it to nobody.' : 'The heavies\' captain stops by it on his walk along the line, and puts his hand flat on a barrel a moment, and goes on.'}` :
`Where the wagon would be, there is a row of skins hanging from spear-shafts and the squad's two cook-pots under a cloth, and the company's clerk going along the row with his stick, doling the ration from what the Third carried. It goes round. Less of it than there would have been. It goes round.${b103If('tangle', `\n\nTangle is watching the stick go into each skin. "The sum was right," he says. "The sum was right." He says it twice. It is a sum he does not like.`)}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    /* Thallo (or the wagon-master) at the second lie-up: the cloak */
    b10_c3_thallo2:()=>({sp:b103S('Thallo', 'The Twelfth\'s wagon-master'), scene:b103Scene(false), fx:()=>{ if (!S.f.b10_c3_cloak) { S.f.b10_c3_cloak = 1; gain('b10_c3_nightcloak'); } }, again:()=>`${b103BossC()}, under his cloak.`, txt: b103South() ?
`The wagon-master is sitting in the wagon's shade with his ledger on his knee and a cloak over his head like a widow. When he sees the Third he takes it off and holds it out: long, dark outside and chalked pale inside.

"A carter's lie-up cloak," he says. "Dark for the night, pale for the day. Turn it and throw it over a shaft, and the sun hits that instead of you." He puts the ledger back on his knee. "${b103Haul() ? 'The Twelfth has its wagon. The Twelfth can do without a cloak.' : 'You carried what you could. I am writing it down as more.'}"` :
`Thallo is under his cloak with his drill sergeant's cloak folded beside him, and when he sees the Third he holds it out. Long, dark outside for the night marches, chalked pale inside where somebody has rubbed it with lime for the lie-ups.

"Drill sergeant's," he says. "He's walking. Says he's got two cloaks and one back, and the Third should have the other." He considers. "He says the Third did ${b103Haul() ? 'a heavy\'s work in the traces' : 'right by the wagon'}. I'd have said it shorter." He takes a crumb of bread out of a fold of his tunic, looks at it, and puts it back for later.${b103Haul() ? `\n\nHe rolls his own shoulder where the strap was. "Pruss leans like an ox," he says. "Meant kindly."` : `\n\nHe looks back west, the way they came. "Should've been my lot cutting it," he says. "Not yours. Captain's word went round after; half the column did the same."`}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the far ground south-west: dust, small, going into the glass (never said whose) */
    b10_c3_dust:()=>({sp:'The far ground', scene:b103Scene(false), again:()=>'The far ground south and west, the glare on it.', txt:
`From the lie-up's edge you can see a long way ${b103S('back south and west across the glass', 'north across the dry country toward the glass')}, while the glare lets you. Far off, very small, there is a smudge of dust low on the ${b103S('glass', 'horizon')} that was not there at grey light${b103South() ? ', going away north from the grey knights\' long straight dust toward the paleness' : ', moving'}. It is a long way off. It is going into the glass.${S.f.b10_c3_dustTried ? '' : '\n\nIf you shaded your eyes and waited, you might make it out.'}`,
      ch:[{t:'Shade your eyes and wait until you can make it out.', check:['wits', 19], req:()=>!S.f.b10_c3_dustTried, fx:()=>{ S.f.b10_c3_dustTried = 1; },
            edges:id=>[id === 'tebbet' && ['a bowman\'s eye for a far mark', 2], id === 'orvas' && ['the Khundryl read dust on the plain like a letter', 2], id === 'tegra' && ['her people read far ground', 1], id === 'yorin' && ['he watches horizons', 1], id === 'tallow' && ['he sees what he expects to', -1]],
            near:{t:()=>`Yes, but the glare gets into ${b103Nm(b103Who())}'s eyes and stays there, white, and for an hour after ${b103V(b103Who(), 'you see', 'everything is seen')} through a bright smear. ${b103Nmc(b103Who())} will carry it a while: rattled.`, fx:()=>b103Rattle(b103Who())},
            go:'b10_c3_dust_ok', fail:'b10_c3_dust_no'},
          {t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c3_dust_ok:()=>({sp:'The far ground', scene:b103Scene(false), fx:()=>{ S.f.b10_c3_dust = 1; }, txt:
`Riders. ${by({sgt:'You make', tebbet:'Tebbet makes', orvas:'Orvas makes', _:'{who} makes'})} them out at last through the shaking air: a handful of riders on big horses, going fast, into the glass, with the dust coming up behind them. Then the glare takes them, and there is only the dust, and then not even that.

Whose, nobody can say. Where to, nobody can say either, except that it is the way the army went.${b103If('orvas', `\n\nOrvas watches the place where they went. "Heavy horses," he says. "Ridden too hard for this ground. Whoever they are, they are in a hurry to reach the army." He does not guess who.`)}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c3_dust_no:()=>({sp:'The far ground', scene:b103Scene(false), fx:()=>{ S.f.b10_c3_dust = 1; }, txt:
`The air shakes, and the dust swims in it, and it might be riders or a wind or the glare playing a joke. Then it is gone. Whatever it was, it went into the glass.`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b10_c3_dusk2:()=>({sp:b103S('The lie-up', 'The road\'s edge'), scene:b103Scene(false), txt:
`East, the ${b103S('glass', 'road')} goes on. The column will go on with it at dusk.`,
      ch:[{t:'Dusk. Up, and on east.', onward:true, go:'b10_c3_onward'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== the Witness beat: under the cloaks at the second lie-up ======== */
    b10_c3_beat:()=>({sp:'The Third\'s circle', scene:b103Scene(false), html:witnessHTML(), txt:
`The circle under the cloaks, in the worst of the heat, when nobody can sleep and nobody can do anything else. The light comes through the cloth ${b103S('white', 'brown')}. ${b103Haul() ? 'Every shoulder in the squad has a strap-mark across it.' : 'The skins hang from the shafts above them, lighter than at grey light.'}

${b103Say({haddat:'Haddat looks at you across the circle. "Ask it," she says. "You are the sergeant. It is your turn to be foolish."', tangle:'Tangle opens one eye. "Go on," he says. "Ask it. I want to know what I think."', pruss:'Pruss is turning the helm in his lap. "Old sergeant asked it on the long hauls," he says. "Go on."', _:'Somebody in the circle looks at you, waiting.'})}

What are we marching for?`,
      ch:[{t:'"Each other. The one in the next strap."', fx:()=>{ b10Beat('kept', 'for each other, in the traces'); S.f.b10_c3_beat = 'each'; }, go:'b10_c3_beat_done'},
          {t:'"She knows. Whatever it is, she knows, and that will have to be enough."', fx:()=>{ b10Beat('kept', 'she knows'); S.f.b10_c3_beat = 'knows'; }, go:'b10_c3_beat_done'},
          {t:'"The column\'s walking. So we walk."', fx:()=>{ b10Beat('doubt', 'the column is walking'); S.f.b10_c3_beat = 'walking'; }, go:'b10_c3_beat_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c3_beat_done:()=>{ const w = S.f.b10_c3_beat;
      return {sp:'The Third\'s circle', scene:b103Scene(false), html:witnessHTML(), txt:
`${w === 'each' ? b103Say({haddat:'Haddat nods, once. "The next strap," she says. "My mother would have liked that. She said a rope is only as good as the knot next to it."', pruss:'Pruss looks round the circle, one face at a time, the way he looks at a load. "The next strap," he says. "I can lean on that."', marrow:'Marrow puts her hand on the nearest knee. "The next strap, child," she says. "Always was."', _:'The circle shifts a little closer under the cloaks. There is no room to. It manages.'})
  : w === 'knows' ? b103Say({tangle:'Tangle thinks about it for a long breath. "She knows," he says. "All right." He shuts his eye. "I\'ll take a sum I can\'t see over no sum at all. Today."', haddat:'Haddat nods slowly. "She knows," she says. "My mother followed a man across the salt because he knew." How that ended, she keeps to herself. She does not make it sound bad.', pruss:'Pruss nods. "One of us has to know where the road goes," he says. "My da never did. He just knew the horse."', _:'Somebody says "she knows" back, quietly, testing it, the way you test a strap before you lean.'})
  : b103Say({tangle:'Tangle nods. "Honest," he says. "The column\'s walking." He looks at his hands. "It\'s a long way to walk for honest."', mirrel:'Mirrel goes on wetting a rag and laying it on a neck, and says nothing to it either way.', pruss:'Pruss looks at the helm. "My lot said that," he says. "On the stretch." He puts it down.', _:'Somebody in the circle laughs, short and dry, at something true and not funny.'})}${b103If('pruss', w !== 'walking' ? `\n\nPruss sets the old sergeant's helm down in the middle of the circle, in the shade, and leaves it there.` : '')}

The light moves on the cloth. The squad does not. ${b103S('The glass ticks', 'The wagon creaks')} in the heat.`,
        ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}; },

    /* ======== the end: dusk, and on east ======== */
    b10_c3_onward:()=>({sp:b103S('The glass', 'The road south'), scene:b103Scene(true), html:witnessHTML(), txt: b103South() ?
`At dusk the brigades get up out of the shade, and the carters put the teams to, those that are left, and the column goes on south in the dark without a lamp. ${b103Haul() ? 'The Twelfth\'s wagon rolls in the line with the Third in its traces and a borrowed Letherii mule in the lead, which the wagon-master found somewhere and will not say where.' : 'The Third walks in the line heavy with skins, and the Twelfth walks beside it, and the place where its wagon was is a gap in the line nobody closes.'}

Far to the north the paleness of the glass goes grey, and then dark, and then it is only a place where the stars come down to the ground.${b103If('pruss', `\n\nPruss walks at the head of the line with his old sergeant's helm tied to his pack and his hand on nothing, out of habit, where an ox's neck would be.`)}${b103Say({haddat:'\n\nHaddat says the names under her breath as she walks, the long list, and at the end of it, the word she added at the parting: <em>south</em>.', _:''})}` :
`At dusk the column gets up out of its cloaks and folds them, and goes on east in the dark. ${b103Haul() ? 'The water wagon rolls in the middle of it with the Third in its traces, two to a strap, leaning, and the company walking close round it, close as a village round its well.' : 'The Third walks in its file heavy with skins, and somewhere behind it, too far back now to see, a wagon stands in the glass with the starlight on its tilt.'}

The stars come out overhead, and then underfoot. Somewhere off to the north, the dead city is a straight line on the horizon, and then it is behind.${b103If('pruss', `\n\nPruss ${b103Haul() ? 'leans into the near strap with his old sergeant\'s helm tied to his pack, and talks under his breath to nothing, the way his da talked to the horse' : 'walks with his hand on nothing, out of habit, where an ox\'s neck would be'}.`)}${b103Say({haddat:'\n\nHaddat says the names under her breath as she walks, the long list, and at the end of it, a new word: <em>traces</em>.', marrow:'\n\nMarrow walks with her knotted string in her fist. "Missing is not dead, child," she says, to nobody in particular. "Thirsty is not dead either. Remember that out here."', _:''})}`,
      ch:[{t:b103South() ? 'South, the long way round.' : 'East, into the glass.', onward:true, go:()=>chapterEnd(3, b103Key() || 'haul')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* who carries the thirst from the traces: already given, or (before the after-node's fx runs) who it will be */
const b103ThirstWho = () => S.f.b10_c3_thirst || (S.f.b10_c1_water ? 'waived' : (b10ThirstPick() || 'none'));
/* the traces done, once: the thirst on 'haul' unless the Third filled every skin at the wells (b10_c1_water); the trace-strap if not had */
function b103TracesDone(){ if (S.f.b10_c3_tracesDone) return; S.f.b10_c3_tracesDone = 1;
  if (S.f.b10_c1_water) S.f.b10_c3_thirst = 'waived';
  else { const id = b10ThirstPick(); S.f.b10_c3_thirst = id && b10Thirst(id) ? id : 'none'; }
  if (!S.kit.includes('b10_c3_tracestrap') && !S.f.b10_c3_harnessOk) gain('b10_c3_tracestrap'); save(); }
/* the wagon through to the lie-up, once, by either road over the shelf: the key's Witness (the brief: 'the wagon came through') */
function b103Through(how){ if (S.f.b10_c3_through) return; S.f.b10_c3_through = how; b10Witness(1, 'the wagon came through'); save(); }
/* the skins carried, once ('cut'): the trace cut from the dead oxen goes in the kit if it is not there */
function b103Carried(how){ if (S.f.b10_c3_carried) return; S.f.b10_c3_carried = how; if (!S.kit.includes('b10_c3_tracestrap') && !S.f.b10_c3_harnessOk) gain('b10_c3_tracestrap'); save(); }
