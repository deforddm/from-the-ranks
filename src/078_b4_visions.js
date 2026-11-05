/* ============ Book Four: Through the Deck, the seven visions of Unblooded ============
   One per chapter, played when Book Four's reader (visReader(), 36b; Marrow, else Tallow, else the old soldier of the 9th: 70) turns a
   card and looks into it. Each is a scene somewhere the Third cannot see, through the eyes of a canon character the squad never meets.
   Choices change words, never outcomes (S.f.b4v*_ keys; nothing else reads them). The last step of each is the reader, back at the
   chapter's reading place: its sp, fig and txt are getters/functions of visReader(), so visAgain (36b) still matches it on a replay.
   Canon basis: docs/hoc-canon.md §12 (viewpoint, moment, novel chapter, source, stop before), bound by §5, §10 and series-canon §(a)
   rules 1-30. The darker canon is headline only. Notes: docs/hoc-visions-notes.md. Backdrops are VISBG b4v_* and b4deck, the new
   figures FIGX b4v_* (78b, which loads after this file; both are only read when a vision plays). */

/* ---------------- the reader, at the end of each vision ---------------- */
const b4vP = r => r.he ? {S:'He', s:'he', H:'His', h:'his'} : {S:'She', s:'she', H:'Her', h:'her'};
const b4vWho = r => ['marrow', 'tallow', 'oldninth'].includes(r.id) ? r.id : 'other';
const b4vFig = () => { const r = visReader(); return r.id === 'marrow' || r.id === 'tallow' ? r.id : r.id === 'oldninth' ? 'b4v_oldninth' : FIGX[r.id] ? r.id : r.he ? 'b2soldier' : 'b4v_oldninth'; };
/* o = {marrow:(r, p) => text, tallow:..., oldninth:..., other:...}: 70's three readers; other is the fallback */
const b4vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b4vFig(); }, bg:'b4deck',
  txt:() => { const r = visReader(), p = b4vP(r); return (o[b4vWho(r)] || o.other)(r, p); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: the muster in Aren. Somewhere no map reaches, a man chained in a wall waits for the sea. ---- */
  b4v1:{book:'hoc', ch:1, who:'Trull Sengar', where:'The Nascent', fig:'b4v_trull', bg:'b4v_nascent', cap:'Grey water to every edge, a low sky, and a long wall standing out of the sea with a man chained in its face.', steps:[
    {fig:'', txt:
`Trull Sengar hangs in chains in the face of a wall, and the sea is coming up to meet him.

It has been coming for days. He has counted them, for want of anything else to count: the light going grey, the light going black, and the water a hand higher each time the grey comes back. It is at his waist now. It is warm, which he had not expected, and it smells of nothing.

The wall runs out of sight both ways, straight as a spear-shaft, older than any people he knows the name of. Other things are set into its face along its length. He stopped looking at them on the second day.`},
    {fig:'', txt:
`His hair is gone. They cut it before they chained him. Among the Tiste Edur there is a word for that, and he has been trying, with some success, not to think it.

He talks instead. To the wall, to the water, to the things along the wall that do not answer. A man who is going to drown, he has decided, might as well keep his voice in practice.

Then the stone above him shifts, and grit comes down into his eyes, and he hears footsteps. Slow ones, along the top of the wall. Something is walking there, going somewhere, and it is about to go past.`,
     ch:[{t:'Call out to it.', set:['b4v1_call','call']},
         {t:'Keep still. Let it pass.', set:['b4v1_call','still']}]},
    {fig:'', txt:()=>`${S.f.b4v1_call === 'still' ? `Trull keeps still. It makes no difference. The footsteps stop above him anyway, as if whatever made them had smelled him, or heard his heart.` : `"You up there," Trull says. His voice comes out like a crow's. "If you're going far, I'd take the company."`}

It comes down a broken place in the wall and stands on a ledge over his head. Short and broad, hide over bone, the skin gone to leather on the skull. A sword of stone at its hip. A great deal of it missing: one arm set wrong, the jaw held on with what might be sinew. Two dim points of light where the eyes were.

T'lan Imass. Trull knows the shape from his people's oldest songs, in which it is never the hero.

"I am Onrack," it says, in a voice like stones turning over in a stream. "I am passing. What are you?"`,
     ch:[{t:'Tell it plainly.', set:['b4v1_said','plain']},
         {t:'Make light of it first.', set:['b4v1_said','light']}]},
    {fig:'', txt:()=>`${S.f.b4v1_said === 'light' ? `"A man with a poor view and a rising sea," Trull says. The Imass waits. It has, he suspects, a great deal of practice at waiting. "Tiste Edur," he says then. "I was once among enemies."` : `"Tiste Edur," Trull says. "I was once among enemies."`}

The water laps at his ribs. Onrack is quiet for so long that Trull begins to think it has gone on without him, standing there.

"Among enemies," it says at last. "And now among stones." It looks along the wall, the way it was going. "I too."

Then it draws the stone sword and brings it down on the chain at his left wrist, and the chain parts. Then the right. Then, leaning into the water, the ones at his ankles, by feel.

Trull falls into the sea. His legs have been dead for days. They do not come back because he asks them to.

A hand closes on his harness and hauls him out.`},
    {fig:'', go:'Along the wall.', txt:
`Onrack carries him on its back along the top of the wall, the way it was already walking. It does not ask whether he can walk. It has seen.

The Imass is lighter than he thought, and harder, and there is nothing warm in it anywhere. Trull hangs over its shoulder with his cheek against old hide and watches the sea go by below, grey and flat and empty of ships, and the things in the wall going past one after another. He has no wish to see them.

"Why?" he says, after a while.

"You spoke," says Onrack. "No other has, along this wall, in all the time I have walked it."

Trull laughs at that. It hurts, everywhere, and he goes on laughing anyway, out over the empty water, until the Imass shifts its grip on him and walks on.`},
    b4vEnd({
      marrow:() => `Marrow lets the card go. "A man chained in a wall," she says, "and one of the old dead took him down and carried him." She rubs her thumb over the card's face. "I've seen the dead do a great many things, child. Not often that." She looks round the barracks yard, at the recruits who cannot sleep. "I don't know that country. I doubt anyone living does."`,
      tallow:() => `Tallow puts the card face down. "There's a sea in it," he says, "and no boats." That seems to trouble him more than the rest. "Gran said the Deck shows you the drowned, sometimes, so you remember them." He frowns at the card. "She never said they'd get carried off."`,
      oldninth:() => `The old soldier lets the card go and reaches for his cup. "Grey-skin in chains," he says, "and one of the old dead carrying him off on its back." He turns the cup in his fingers. "Not ours, either of them. Not our war." He drinks. "That's the rum, by the way. You can owe me."`,
      other:(r, p) => `${r.name} lets the card go. "A man chained in a wall over a sea," ${p.s} says, "and the dead took him down."`})]},

  /* ---- Chapter 2: the Aren Way. In the Imperial Warren, two travellers cross the ash and find what lies in a pit. ---- */
  b4v2:{book:'hoc', ch:2, who:'Lostara Yil', where:'The Imperial Warren', fig:'lostara', bg:'b4v_impwarren', cap:'Ash to every edge under a sky the colour of ash, the stumps of old walls, and a pit that goes down a long way.', steps:[
    {txt:
`Lostara Yil walks across ash with Pearl beside her, and is not talking to him, which he appears to be enjoying.

The Imperial Warren is grey. Ash under the boots, ash in the air, ash drifted against the stumps of walls that were a city once and are now a guess. The sky is the colour of the ground. There is no sun in it, and yet there is light, from everywhere at once, flat and patient.

The Empire uses this road, Pearl says, when it is in a hurry and does not mind what it walks on. He says a great many things. She has learned to keep the useful ones and let the rest go by.`},
    {txt:
`They come to the lip of a pit, and stop.

It is wide enough to drop a town into, and deep, and the ash has slid down its sides in long grey tongues. At the bottom, filling it, lies a dragon.

It is pinned out on its back on the floor of the pit, wings spread and spiked through to the rock, every limb nailed down with iron as thick as a mast. Its scales have gone the colour of the ash. Its head lies to one side on a neck longer than a ship.

It has been there a long time. It should be dead. She is not sure that it is.`,
     ch:[{t:'"What is it, Pearl?"', set:['b4v2_ask','ask']},
         {t:'Keep quiet. Look.', set:['b4v2_ask','look']}]},
    {txt:()=>`${S.f.b4v2_ask === 'ask' ? `"What is it, Pearl?" she says. For once in their acquaintance he has no answer, and does not pretend to one. It does not suit him. She finds she is not enjoying it either.` : `She keeps quiet, and looks. Beside her Pearl is silent too, which is rarer than dragons.`}

Pearl lifts a hand, the small careless gesture he makes before he opens a warren, and nothing happens. He tries again. His face changes.

Lostara knows what it must be, because only one thing in the world does that to a mage: the flat dead taste in the air that every mage she has ever met would cross a desert to avoid. Otataral. Here, in the bottom of a pit, in a thing with wings.

The dragon's eye opens.

It is as big as a cart-wheel, and it is not looking at them. It looks through them, at something a long way behind them, or a long time ago. Then the lid comes down over it again, slowly, like a door closed softly on a sickroom.`,
     ch:[{t:'Walk on. Now.', set:['b4v2_stay','go']},
         {t:'Stay a moment longer.', set:['b4v2_stay','stay']}]},
    {txt:()=>`${S.f.b4v2_stay === 'stay' ? `She stays a moment longer, because something in her will not leave it yet. The great sides rise and fall, once, a breath that takes a long count of heartbeats. Then she goes.` : `"Walk on," she says, and Pearl, for once, does not argue.`}

Further on the ground climbs, and there is a shelf of rock above the path, and on the shelf, impossibly, there is sun: one patch of yellow light falling out of the grey sky onto bare stone, as if someone had cut a hole in the warren to let it in.

In the light, set upright on the stone, is a man's head. Eyes closed. The face calm. Placed there with care, for the view.

Pearl stops.

"Olar Shayn," he says.

That is all he says. Lostara does not ask who Olar Shayn was. She can see from Pearl's face that he knew the man, and that he is deciding, very carefully, not to say anything more about it.`},
    {go:'Walk on.', txt:
`"Someone put him in the sun," she says.

"Someone," says Pearl, "has a sense of humour."

They walk on. She watches him not look back. She looks back herself, once, from the top of the next rise: the patch of light on the ledge is already fading, and behind it the lip of the pit is only a darker line in the grey.

She was a Red Blade before she was anything else. Red Blades are good at deciding things. She decides she will not dream about the dragon, or the head in the sun, and she walks on across the ash beside a man she does not trust, and finds that she is walking closer to him than she was.`},
    b4vEnd({
      marrow:() => `Marrow lets the card go. "A dragon," she says, "nailed out in a pit, and still alive." Her mouth tightens, a healer's look at a wound she cannot reach. "And a man's head set in the sun." She looks along the Way toward Aren, toward the hill with its braids. "Whatever road that is, child, I'm glad it isn't ours."`,
      tallow:() => `Tallow puts the card face down. "It opened its eye," he says. "It looked right through them." He wipes his palms on his knees. "Gran's deck never had a dragon in it, not that she showed me." He looks at the card. "I'm going to tell myself it still doesn't."`,
      oldninth:() => `The old soldier lets the card go. "A Red Blade," he says, "walking with a man who doesn't say what he is." He snorts into his cup. "I know the sort." Then, quieter, looking at the card: "And they found something down there neither of them was paid to find."`,
      other:(r, p) => `${r.name} lets the card go. "A dragon nailed out in a pit," ${p.s} says, "and a head set in the sun."`})]},

  /* ---- Chapter 3: the Khundryl. Far off on the Jhag Odhan, a giant on foot meets a herd. ---- */
  b4v3:{book:'hoc', ch:3, who:'Karsa Orlong', where:'The Jhag Odhan', fig:'toblakai', bg:'b4v_jhag', cap:'A plain of grey-gold grass under an enormous sky, and a dust on the horizon that is coming closer.', steps:[
    {txt:
`Karsa Orlong walks across the Jhag Odhan, because the Odhan is in his way, and he has never in his life gone round a thing that was in his way.

The grass is short and grey-gold and goes on to the edge of the world. The sky is larger than any sky in the mountains of his people. The children of the lowlands say nothing lives out here. The children say all manner of things. He has stopped listening to most of them.

His sword is on his back. His feet are bare and hard. The heat sits on the plain like a hand, and he walks through it.`},
    {txt:
`On the third day there is dust on the horizon, and a sound in the ground.

He feels it through his feet before he hears it: a long low trembling, as of a river under stone. Then the dust stands up along the whole edge of the sky, and under the dust, horses. Not tens. Not hundreds.

Thousands, coming toward him across the Odhan at a run.`,
     ch:[{t:'Stand. Let them come.', set:['b4v3_stand','stand']},
         {t:'Draw the sword.', set:['b4v3_stand','sword']}]},
    {txt:()=>`${S.f.b4v3_stand === 'sword' ? `Karsa draws the sword, and holds it, and then sheathes it again. A sword is no use against a herd, and he has no wish to kill horses. He stands.` : `Karsa stands. He folds his arms. He is a Teblor, and he has been run at before.`}

They are not lowland horses. They are huge and rangy and long-headed, scarred, the oldest-looking beasts he has ever seen, as if the plain had made them out of its own bones and set them running. Jhag horses. The children whisper of them too.

They do not run him down. They part round him, a hundred paces off, and wheel, and come round again, closer, the ground shaking under them, their heads turned toward him all the while.

He knows why. He can feel it rising in him, the old heat, the blood-oil of his people, waking at the smell and sound of them. They feel it too. They answer it. They come to it as cattle come to salt.`},
    {txt:
`He walks in among them.

They let him. The old stallions watch him with white-ringed eyes and do not strike. Mares shoulder past him. A foal stops dead and stares up at him, astonished, and is shoved on by its mother.

Karsa looks for one. He does not hurry. He has never hurried a choice that mattered.

He finds it at the edge of the herd: a young stallion, dun-coated, long in the leg, with a mane as white as snow on a high pass. It stands with its legs braced and its ears back and watches him come, and does not run.

He puts his hand flat on its neck. Under his palm the great muscles shiver, and are still.`,
     ch:[{t:'Speak to it.', set:['b4v3_speak','speak']},
         {t:'Say nothing to it.', set:['b4v3_speak','silent']}]},
    {fig:'', go:'Ride.', txt:()=>`${S.f.b4v3_speak === 'speak' ? `"You are mine," he tells it, "because I have chosen you. It is a better reason than most." The stallion blows through its nose at him. He takes that as agreement.` : `He keeps his words. The horse keeps its own. That suits them both.`}

"Havok," he says then. "Your name is Havok."

The herd goes on without them, back into its own dust, and the sound goes out of the ground a little at a time until there is only the wind in the grass.

Karsa Orlong swings up onto the stallion's back. It goes up on its hind legs under him, once, to see whether he means it. He does. It comes down. It runs.

The Odhan is very large. For the first time since he came down out of the mountains, it does not feel large enough.`},
    b4vEnd({
      marrow:() => `Marrow lets the card go. "The giant," she says. "Thousands of horses, and they came to him like dogs to a whistle." She glances along the feast fires at the Khundryl, at their horses picketed beyond the light. "Don't tell them, child. Every Burned Tear here would ride out tonight to look for that herd."`,
      tallow:() => `Tallow puts the card face down. "He named it," he says, and he sounds pleased, the first pleased thing he has said all night. "Havok." He tries the word again, quietly, to himself. "That's a good name for a horse that size. Orvas would say so."`,
      oldninth:() => `The old soldier lets the card go. "Big lad," he says. "Bigger horse." He holds his cup out toward the Khundryl drinking round their fires. "Thank the gods he's not riding with that lot. Or with us." He considers the card. "Or against us. I'd want to know which, before I sat down."`,
      other:(r, p) => `${r.name} lets the card go. "A giant on the plain," ${p.s} says, "and a herd that came to him, and a horse he named Havok."`})]},

  /* ---- Chapter 4: Leoman's raids. The night the Third lived through on the wagon line, seen from the other side of the dark. ---- */
  b4v4:{book:'hoc', ch:4, who:'Leoman', where:'Outside the Malazan Camp', fig:'leoman', bg:'b4v_camp', cap:'A ring of wagons on a dark plain, cook-fires inside it, and riders waiting in a fold of ground beyond the light.', steps:[
    {txt:
`Leoman of the Flails sits his horse in a fold of the ground a long bowshot from the Malazan camp, with two hundred riders behind him, and watches the enemy cook their supper.

They have made a ring of their wagons. Foot inside it, the horse inside that, pickets out, fires lit. It is a good camp, a careful one, the kind a commander makes when she has been told what the desert does to armies that are not careful.

So the Adjunct learns. He files that away, with the other things he knows about her, which are few. He would like to know more. He suspects he will.`},
    {txt:
`Behind him the riders wait in the dark, quiet, the horses' mouths bound. Every rider carries two clay lamps of oil on a length of cord, the wicks wrapped and dry. A covered pot of coals goes along the line, hand to hand.

"We are not here to kill them," Leoman says, not loudly. He has said it before. It bears saying again, to men who have waited all summer to kill Malazans. "We are here to burn their wagons, and to make their horse come out after us. Nothing more. Whoever stays to fight stays for good."`,
     ch:[{t:'"No one stays. Say it back to me."', set:['b4v4_order','back']},
         {t:'Leave it there. They heard.', set:['b4v4_order','heard']}]},
    {txt:()=>`${S.f.b4v4_order === 'back' ? `"No one stays," he says. "Say it back to me." They say it back, along the line, in a mutter. It will not save the fools among them. It will save some.` : `He leaves it there. They heard him. Whether they listened is a thing he will find out in an hour.`}

The wicks catch from the coals, one after another, little sparks down the length of the fold. Then they go.

Out of the dark at the gallop, with no war-cry, nothing but hooves. The pickets see them too late and shout. The riders reach the wagons, and swing the cords twice round their heads, and let go.

The lamps go out over the camp in the dark, two by two, turning over and over on their cords like seeds off a tree. They wrap round wagon-tongues and tent-poles and canvas, and break, and the oil goes up.

A dozen wagons are burning before the first Malazan horn sounds. More after.`},
    {txt:
`He spares the soldiers in the firelight no more than a glance. There is no profit in them. Somewhere in that ring of light men are running with buckets, and sergeants are shouting, and recruits who have never seen a fight are seeing one, and none of it is his business tonight.

His business is the horse.

It comes. Out of the inner ring, past the burning wagons, lances up, a great dark wave of it, half the column's horse, angry and fast and in no order at all, after the riders who are already turning away into the night.

As he meant.

"Now," says Leoman, to nobody in particular, and turns his own horse, and runs.`,
     ch:[{t:'Lead them on, further.', set:['b4v4_lead','far']},
         {t:'Let them go. Scatter.', set:['b4v4_lead','scatter']}]},
    {go:'Into the dark.', txt:()=>`${S.f.b4v4_lead === 'far' ? `He leads them on, further than he needs to, across broken ground, through gullies he walked in daylight a week ago, until the Malazan horse is strung out over a league of desert and blown, and only then does he whistle the scatter.` : `At the first dry wash he whistles the scatter, and his riders break apart into the dark like a handful of thrown gravel, and the Malazan horse charges on into nothing at all.`}

By dawn they are back together in the hills, most of them. Behind them, far off over the plain, the smoke from the wagons goes up in a thin grey column into a clean sky.

The riders are laughing. Leoman lets them. He sits his horse a little apart and looks at the smoke.

A war leader does not beat an enemy who learns, he thinks. He only makes the learning expensive. He would like very much to know how much this one is willing to pay.`},
    b4vEnd({
      marrow:() => `Marrow lets the card go. "That was the raid," she says, "from their side of it." She looks past the Seti in their blankets, at the black hulks of the wagons still smoking at the edge of the camp. "He didn't want us. He wanted the horse." She pulls a blanket straighter over the nearest of the wounded. "And he got it, child."`,
      tallow:() => `Tallow puts the card face down. "We were there," he says. "Those were our wagons." He looks at his hands as if he expects to find oil on them. "He wasn't even looking at us, Sergeant. We were just what was in the way."`,
      oldninth:() => `The old soldier lets the card go. "Clever," he says, and there is something in it close to respect. "Two hundred, and he had the whole column dancing." He looks at the burnt wagons and drinks. "I hope the Adjunct's watching him as close as he's watching her."`,
      other:(r, p) => `${r.name} lets the card go. "The raid," ${p.s} says, "from their side. He wanted the horse, not us."`})]},

  /* ---- Chapter 5: the Wall. Inside the Whirlwind, an old man has been given something to smoke, and dreams. ---- */
  b4v5:{book:'hoc', ch:5, who:'Heboric', where:'Raraku', fig:'heboric', bg:'b4v_raraku_dream', cap:'Night in the Holy Desert, a lamp in a tent, and beyond the tent a dream with no sky in it.', steps:[
    {txt:
`Heboric, who was a priest of the Boar once and is nothing in particular now, has been given something to smoke, and has smoked it, and is beginning to regret it.

The tent is close and hot. The lamp has a halo round it the size of a cartwheel. Outside, the camp of the Whirlwind goes about its night, voices, a dog, someone laughing too long.

His arms end at the wrists. They have for years. And yet he has hands, of a sort, that nobody else can see, and that have touched things in the desert he would much rather they had not. Tonight they ache, as a tooth aches before a storm, and he holds them in his lap and waits for the smoke to let him go.

It does not.`},
    {txt:
`The tent goes away.

There is no sky where he is. No ground. There is a grey light without a source, and in it, on every side, as far as he can see, giants. Figures of jade, green and translucent, taller than towers, perfect and sexless, every one of them carved with the same care, as if a single hand had made them all and never once grown tired.

Their mouths are open. Every one. Screaming terrified mouths, and no sound at all.

They are moving. Falling, or walking, he cannot tell which, in a long procession through the grey, all one way. Ahead of them, far ahead, something is going down before them, and they are following it in. A god, he thinks, and knows it the way you know things in dreams. A god that fell.`,
     ch:[{t:'Reach out to them.', set:['b4v5_reach','reach']},
         {t:'Turn away.', set:['b4v5_reach','turn']}]},
    {txt:()=>`${S.f.b4v5_reach === 'reach' ? `He reaches out with the hands nobody sees, as he did once in another desert, and touches the nearest of them. It is cold past cold. Under the jade, very faintly, something presses back against his palm. He snatches the hand away, and it goes on aching.` : `He turns away. It does no good. They are on every side, and turning only shows him more of them, going on and on into the grey, all their mouths open.`}

Then something comes through the procession toward him, unhurried, and the giants do not see it.

A tiger. Larger than any beast has a right to be, the colour of dry grass and old gold, barred with black. It walks out of the grey on great soft feet and stops in front of him and looks at him with eyes like lamps.

He knows it. Any priest would. The Tiger of Summer. Treach.

"No," says Heboric. "I've had a god. Look what it got me."`,
     ch:[{t:'"Go and find someone younger."', set:['b4v5_tiger','younger']},
         {t:'"What do you want with me?"', set:['b4v5_tiger','want']}]},
    {fig:'b4v_heboric_jade', go:'Wake.', txt:()=>`${S.f.b4v5_tiger === 'want' ? `"What do you want with me?" he says. The tiger does not answer. Gods seldom do, in his experience, until it is far too late to argue.` : `"Go and find someone younger," he tells it. "Someone with hands." The tiger regards him as if this were the best joke it had heard in an age.`}

It comes forward, and the stripes go over him like shadows of bars, and he wakes.

The tent. The lamp. Sweat cold on him, and the smoke gone sour in his mouth. He lies there and breathes, and then he lifts his arms to look at them, as he has done every morning for years, out of habit.

There are stripes on them. Dark bars, across the skin, from shoulder to wrist, the colour of the tiger's.

And at the ends of his wrists, where there has been nothing to see for a very long time, there are hands. Green. Translucent. Jade, with a faint light moving in them, like water under ice. He can see them. Anyone could.

"Gods below," says Heboric, softly, to the empty tent. "Not again."`},
    b4vEnd({
      marrow:() => `Marrow lets the card go. "The old priest," she says. "Hands like green glass, and a tiger's stripes on him." She looks out at the Wall, a mile off, louder than the fire. "He's in there, behind that." Then, to the sergeant, more gently: "That was your Tiger. He's choosing people in there, it seems."`,
      tallow:() => `Tallow puts the card face down. "Statues," he says. "Screaming." He hugs his knees. "Gran said you shouldn't look into the Deck tired. I'm tired." Then, after a moment, to the sergeant: "The tiger, though. That's yours, isn't it? The Tiger of Summer."`,
      oldninth:() => `The old soldier lets the card go. "Stripes," he says. "Treach's mark, that." He glances at the sergeant over his cup. "Your god's been busy in the Holy Desert." He drinks, and looks at the Wall, and drinks again. "Wish him luck in there. He'll need it, with that lot."`,
      other:(r, p) => `${r.name} lets the card go. "An old man dreaming of jade giants," ${p.s} says, "and he woke with a tiger's stripes on him."`})]},

  /* ---- Chapter 6: Pan'arak. On the night before, in the great tent across the basin, the Whirlwind's prophetess looks at her armour. ---- */
  b4v6:{book:'hoc', ch:6, who:'Sha\'ik', where:'Her Tent', fig:'shaik', bg:'b4v_tent', cap:'Lamplight inside a great tent, an armour stand in the shadows, and on it a helm with a web of chain where the eyes should be.', steps:[
    {txt:
`Sha'ik sits alone in her tent on the last night, and listens to her camp get ready.

It is loud, out there. Hammering, and horses, and men singing to keep their courage up, badly. Inside the tent it is quiet. One lamp. Cushions. Rugs from cities that do not exist any more. The smell of sand, which gets into everything, and which she has stopped noticing except on nights like this.

The goddess is quiet too, for once. Coiled somewhere at the back of her, waiting. She does not trust it when it is quiet. She has learned not to trust most things.`},
    {txt:
`The armour stands on its frame in the shadow beyond the lamp, where it has stood since she came to this tent.

It was made for the woman who was Sha'ik before her, who died in a hollow of the desert before dawn, a long way from here. Scale, dark and close-fitted. Gauntlets. And the helm, on top of the frame like a head: a visored helm with a web of fine chain hung over the eye-slits, so that whoever wears it sees out, and nobody sees in.

She has never put it on. She has looked at it most nights.`,
     ch:[{t:'Touch it.', set:['b4v6_touch','touch']},
         {t:'Leave it where it stands.', set:['b4v6_touch','leave']}]},
    {txt:()=>`${S.f.b4v6_touch === 'touch' ? `She gets up and goes to it and lays her fingers on the scale. It is cool, and smooth, and smaller than she remembered. Her predecessor was a small woman. So is she.` : `She leaves it where it stands, and looks at it from the cushions, the way she has looked at it every night. It looks back, out of the dark behind its chain.`}

She thinks of her sister.

She promised herself she would not, tonight of all nights. She does anyway. A face in a doorway, a long time ago, not turning round. That is all she will let herself have of it. She puts it away again, where she keeps it, under everything else.

The goddess stirs at the back of her, interested. She ignores it.`},
    {fig:'b4v_shaik_armour', txt:
`In the end she puts it on, because it is the last night, and because it is hers.

The scale goes over her head and settles on her shoulders, and it weighs nothing. Nothing at all. Light as it was made to be, by whatever was done to it long ago. The gauntlets close on her hands like gloves. She lifts the helm off the frame and holds it a moment, and then she puts it on, and the world goes small and dark and full of fine links.

The goddess uncoils. It is pleased. She can feel it being pleased, all through her, like warmth.

She sits down on the cushions again in her dead predecessor's armour and looks at the lamp through the chain, and asks herself, quite calmly, whether she has a choice.`,
     ch:[{t:'Lower the visor.', set:['b4v6_visor','down']},
         {t:'Leave it up a moment longer.', set:['b4v6_visor','up']}]},
    {fig:'b4v_shaik_armour', go:'Wait for the light.', txt:()=>`${S.f.b4v6_visor === 'up' ? `She leaves the visor up a moment longer, and lets the lamplight reach her face, as if it might tell her something. It does not. Then she lowers it.` : `She lowers the visor. The chain swings, and settles.`}

No answer comes. Not from the goddess, who is pleased and has no need to answer anything. Not from the girl she used to be, who has gone very quiet, somewhere a long way down.

Outside, the singing goes on, badly. A man laughs. A horse complains.

Sha'ik sits in the dark of the helm with her gauntleted hands in her lap, and waits for the light.`},
    b4vEnd({
      marrow:() => `Marrow lets the card go. "Sha'ik," she says. "The Whirlwind's own." She looks across the basin at the trenches and the dark mass of the oasis beyond them. "She's young, child. Younger than I'd have thought." She turns the card face down, gently. "She put that helm on like it hurt her."`,
      tallow:() => `Tallow puts the card face down. "She's frightened," he says, as if he can't quite believe it. He looks across the basin. "She asked if she had a choice." He holds his hands out over the shield, as he would over a fire. "I'd like to know what the cards told her."`,
      oldninth:() => `The old soldier lets the card go. "So that's her," he says. "The Whirlwind's own." He looks across at the trenches, at the lights of the oasis, and turns his cup round and round. "Little thing. They usually are, the ones everyone else dies for."`,
      other:(r, p) => `${r.name} lets the card go. "The witch in her tent," ${p.s} says, "putting on her armour. She asked herself if she had a choice."`})]},

  /* ---- Chapter 7: the convergence. On the night, an old Fist wakes in his armour, among company he did not expect. ---- */
  b4v7:{book:'hoc', ch:7, who:'Gamet', where:'The Ramps', fig:'b4v_gamet', bg:'b4v_ramps', cap:'The trenches before the oasis at night, the ramps going down into them, and a pale cloud of wings over all of it.', steps:[
    {txt:
`Gamet wakes, and he is in his armour.

That is wrong. He does not remember putting it on. He remembers the lamp in his tent, and a pain behind his eyes that grew and grew until it was the whole of the world. The pain is gone now. Everything is very clear and very quiet.

He is standing in the dark at the edge of the Malazan lines, and there are crowds of people standing round him, and none of them are breathing.

He understands, then. It does not surprise him as much as he would have expected.`},
    {txt:
`They are all round him in the dark, the dead. Soldiers in old Malazan armour, armour he wore as a young man. Wickans, braided, lean, with their horses. Desert people, a few. They stand quiet, waiting, as soldiers wait for an order.

Riders, nearer. A clan of them, on horses that make no sound, with black tears on their faces. At their head a woman, dark-skinned, with eyes as blue as a winter sky, who looks at him as if she had been told to expect him and is not yet sure he will do.

And at his knee, a small boy, with a finger bone on a thong round his neck.

"Grub," says Gamet.

"Up the main ramp, Fist," says the boy. "With her. They're waiting."`,
     ch:[{t:'"How are you here, lad?"', set:['b4v7_ask','how']},
         {t:'Do as he says.', set:['b4v7_ask','go']}]},
    {txt:()=>`${S.f.b4v7_ask === 'how' ? `"How are you here, lad?" Gamet says. The boy only looks up at him, and then away at the trenches, and says, "Hurry, Fist."` : `Gamet does as he is told. He was a soldier long before he was a Fist, and he knows an order when he hears one, whoever gives it.`}

But first he turns, once, and looks back at the Malazan lines.

There is a lamp in the command tent. There usually is. He can see it from here, a small steady yellow light in all that dark, and he knows who is sitting under it, not sleeping, as she does not sleep.

He was not much use to her, at the end. He knows it. He hopes she knows that he tried.`,
     ch:[{t:'Say goodbye aloud.', set:['b4v7_bye','aloud']},
         {t:'Say it to yourself.', set:['b4v7_bye','quiet']}]},
    {txt:()=>`${S.f.b4v7_bye === 'aloud' ? `"Goodbye, Adjunct," he says, aloud, there being no one left to mind. The lamp does not flicker. He had not thought it would.` : `Goodbye, Adjunct, he says, inside, where he has said most of the things that mattered. The lamp burns on.`}

Then he goes up the main ramp beside the woman with the blue eyes, and the dead come with them.

There is a sound a league off, out across the basin: low, and long, and getting nearer, like surf on a shore that is not there.

And over the trenches, in the dark, there are butterflies. Thousands of them. Pale wings over the ditches and the stakes and the sleeping enemy, rising and settling and rising, as if the night itself had come apart into white flakes.

The woman glances at him. She is almost smiling.`},
    {go:'Ride down.', txt:
`Then they ride down.

What the dead do in the trenches before the oasis that night belongs to the dead, and the dead do not tell it.

Gamet rides with them. His horse makes no sound. His armour weighs nothing. Beside him the woman with the black tears rides with her head up, and behind them come the others, the old Malazan armour and the Wickan braids and all the rest, more than he can count, more than he would have believed.

He finds, a little to his own surprise, that he is not afraid at all.

He has not been able to say that in years. It is a good thing, he thinks, to be able to say it now.`},
    b4vEnd({
      marrow:() => `Marrow lets the card go. "The old Fist," she says, very quietly. "Gamet." She looks out over the new water, at the morning lying on it. "He went up with them. With the dead." She smooths the card flat on the coral. "I'm glad someone went with him, child. I'd not have wanted him to go alone."`,
      tallow:() => `Tallow puts the card face down. "The Fist," he says. "We heard he died in his bed." He swallows. He looks out at the water, at the sea where the desert was. "He didn't stay in it."`,
      oldninth:() => `The old soldier lets the card go, and tips the last of his rum out onto the coral, slowly, the whole finger of it. "Fist," he says. "Old soldier. Like me." He sets the cup down empty and leaves it there. "That's his. He's welcome to it."`,
      other:(r, p) => `${r.name} lets the card go. "The old Fist," ${p.s} says, "went up the ramp with the dead, and wasn't afraid."`})]},
});
