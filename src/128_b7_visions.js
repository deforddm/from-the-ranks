/* ============ Book Seven: the seven visions of Unwitnessed ============
   One per chapter, played when Book Seven's reader turns a card or lays a tile and looks into it. Book Seven reads through each squad's own
   reader (120c's b7As): the Third (chapters 1, 3, 5, 7) reads the Deck through Book Four's chain, Marrow, else Tallow, else the old soldier
   (the 9th's in Chapter 1; from Chapter 3 an old marine of the column, rg-ch3-notes); the Letherii (2, 4, 6) cast the Tiles through Book
   Five's, Perrit, else the tile-woman. visReader() (36b) is wrapped by 120c, so it gives the right one, and 36b's visTiles() says
   "Through the Tiles" for the Letherii.
   Each vision is a scene neither squad can stand in (rg-canon §6), through the eyes of a canon character neither squad speaks with.
   Choices change words, never outcomes (S.f.b7v*_ keys; nothing else reads them). The last step of each is the reader, back at the
   chapter's reading place (B7READ[n]): its sp, fig and txt are getters/functions of visReader(), so visAgain (36b) still matches it on a
   replay.
   How it hooks on: 21's card screen offers "✦ Look into the card" (or the tile) whenever visionFor(chapter, card) finds one (36b, by book
   'rg'); the vision comes back to b7_c<n>_card (36b's cardNodeName), whose one button goes to B7READ[n].back. No chapter file changes.
   Canon basis: docs/rg-canon.md §12 with its plan corrections (Lostara Yil, not Tavore; Bruthen Trana, not Brys; Hanradi Khalag, not the
   Shake's shore), bound by §5, §6, §7 (rules 55-69) and series-canon §(a). Tavore's thoughts are never given; Bugg is a manservant with
   news; the treasury is nobody's in the narration; Beak is a light that holds and goes out, and nothing after; Brys's name is found and
   the vision stops. Notes: docs/rg-visions-notes.md.
   Backdrops are VISBG b7v_* and b7deck, the new figures FIGX b7v_* (128b, which loads after this file; both are read only when a vision plays). */

/* ---------------- the reader, at the end of each vision ---------------- */
const b7vP = r => r.he ? {S:'He', s:'he', H:'His', h:'his'} : {S:'She', s:'she', H:'Her', h:'her'};
const B7V_READERS = ['marrow', 'tallow', 'oldninth', 'perrit', 'tilewoman'];
const b7vWho = r => B7V_READERS.includes(r.id) ? r.id : 'other';
const b7vFig = () => { const r = visReader(); return ({marrow:'marrow', tallow:'tallow', oldninth:'b4v_oldninth', perrit:'perrit', tilewoman:'b5_c1_tilewoman'})[r.id] || (FIGX[r.id] ? r.id : r.he ? 'b4v_oldninth' : 'b5_c1_tilewoman'); };
/* o = {<reader id>:(r, p) => text, ..., other:...}: the chapter's squad's readers; other is the fallback */
const b7vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b7vFig(); }, bg:'b7deck',
  txt:() => { const r = visReader(), p = b7vP(r); return (o[b7vWho(r)] || o.other)(r, p); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: the north-west coast. The night the transports burn, the Fist who has to send the marines inland. ---- */
  b7v1:{book:'rg', ch:1, who:'Keneb', where:'The coast of Lether', fig:'keneb', bg:'b7v_beach', cap:'A long grey beach at night, the bay behind it full of burning hulls, and on the sand a column of soldiers with their backs to the fire.', steps:[
    {txt:
`Fist Keneb stands on the beach with his back to the sea, because if he turns round he will watch, and he has watched enough.

Behind him the transports are burning. All of them. The light of it comes up the sand past his boots and throws his shadow inland, long and thin, pointing the way he is about to send everyone.

No way back. That was the point. He understands the point. He has understood it since the order was given, and he still doesn't like the sound the masts make when they go.`},
    {txt:
`On the Froth Wolf, before the landing, the Adjunct gathered her officers and spoke to them. Not long. She is never long.

What they did here, she said, might go unwitnessed by the Empire. Not by themselves.

Keneb turned the word over all the way to the beach. *Unwitnessed*. He has served a long time. He has never before been told so plainly that nobody back home will hear how it went, and he finds he can't decide whether it was a comfort or a warning.

He doesn't know what she wants. He knows what she has asked for, which is not the same. He has stopped expecting to be told the rest.`},
    {txt:
`Out on the water a sergeant of marines has waded back to a burning hull for something, and is coming ashore again up to her waist, with a cask on her shoulder and a big silent corporal behind her carrying another.

Rum. Keneb can smell it from here, over the smoke.

The quartermaster is looking at him.`,
     ch:[{t:'"I didn\'t see that."', set:['b7v1_rum','blind']},
         {t:'"Have it counted with the stores."', set:['b7v1_rum','count']}]},
    {txt:()=>`${S.f.b7v1_rum === 'count' ? `"Have it counted with the stores," Keneb says. The quartermaster goes off to count it, and comes back a while later with a number that is smaller than two casks, and a face that dares him to ask.` : `"I didn't see that," Keneb says. The quartermaster nods slowly, as if filing it, and goes off to not see it too.`}

Up the beach the squads are coming off the sand and forming in the dunes. A month on the ships they slept by day and woke at dusk, every one of them, and now they move in the dark the way other soldiers move at noon. The squad mages go among them muttering, and where they have been, the eye slides off a man and finds a bush instead. Mockra. It hides the smell of them from dogs as well.

It will be weeks, inland. Months, perhaps. Keneb keeps that to himself.`},
    {txt:
`Captain Faradan Sort finds him at the top of the beach. She is a narrow woman who never seems out of breath, and she wants something; she always comes straight at it.

She wants a mage. Beak, from one of the squads. A slow-spoken man who can find every mage in the column in the dark, she says, and so every squad that has one. She means to walk among the hidden squads at night, and she means to be able to find them.

Keneb looks down the line of squads going into the dunes.`,
     ch:[{t:'"Take him."', set:['b7v1_beak','take']},
         {t:'"Take him. Bring him back."', set:['b7v1_beak','back']}]},
    {go:'Give the order.', txt:()=>`${S.f.b7v1_beak === 'back' ? `"Take him," Keneb says. "Bring him back." Sort looks at him as if he had said something odd, and then nods.` : `"Take him," Keneb says. Sort is gone before he has finished the second word.`}

He turns, at last, and looks.

The hulls are low in the water now, burning to the waterline, the bay lit end to end. One goes down as he watches, with a long hiss that reaches the beach a moment after. All that sea behind it, and the Empire at the far end of it, hearing nothing.

He turns his back on it again and gives the order. Inland.

All along the dunes, sergeants say it after him, quietly, an order going down a line in the dark. Then the column begins to move, and the sand takes its footprints, and the tide will take the sand.`},
    b7vEnd({
      marrow:() => `Marrow lets the card go. "The Fist," she says. "Fist Keneb, on the sand, with his back to the ships." She lays the card face down on the stone. "He didn't want to watch them burn either, child." She looks inland, into the dark past the dunes. "He's sending us that way. He doesn't know what's in it. None of us do."`,
      tallow:() => `Tallow puts the card face down. "That was the Fist," he says. "Keneb." He looks back at the water, where the last hulls are still going down. "Gran said a man who burns his boats is either very brave or very sure." He wets his lips. "He didn't look sure, Sergeant."`,
      oldninth:() => `The old soldier lets the card go and drinks. "Keneb," he says. "Good officer. Worries." He looks along the tide line at the last pinnace, the only boat left on this coast. "I'm going back on that before dawn. You're not." He pours a second finger and leaves it on the stone. "That one's for the walk."`,
      other:(r, p) => `${r.name} lets the card go. "The Fist on the beach," ${p.s} says, "and the ships burning behind him."`})]},

  /* ---- Chapter 2: Letheras, the summer come early. On a roof across the city from the barracks, a ruined man and his manservant. ---- */
  b7v2:{book:'rg', ch:2, who:'Tehol Beddict', where:'A roof in Letheras', fig:'b7v_tehol', bg:'b7v_roof', cap:'A flat roof over a poor street at dusk, a bed under a sagging net, and the smoke of the whole city going up into a summer that came early.', steps:[
    {txt:
`Tehol Beddict lies abed on his roof under the netting, which is where a man of his means does his best thinking, and very nearly all of his sleeping.

Summer came early to Letheras this year. No one consulted him. The heat sits on the city like a fat man on a stool, and the insects of four districts have come up to his roof to find out whether he is edible. They bounce off the netting. He finds this restful.

Below, the street does what streets do at dusk. Someone is frying something that may once have been a fish.`},
    {txt:
`The ladder creaks. Bugg comes up it with the air of a man carrying news, and possibly a turnip.

"Good evening, master."

"Bugg. What has the city done today?"

Bugg considers. He is an old man, round-shouldered, a builder by trade and Tehol's manservant by long habit. He gives the day's troubles in order, as a grain-factor gives prices.

Coin is short. No one in the market can find any, and the money-changers are charging to look. The Patriotists took another dozen from the canal streets for saying things. The Rat Catchers' Guild has been outlawed, and has accordingly gone below, which is where rat catchers are happiest anyway. And another champion has come in off the Edur fleets to fight the Emperor.`,
     ch:[{t:'"Tell me about the coin."', set:['b7v2_ask','coin']},
         {t:'"Tell me about the champion."', set:['b7v2_ask','champ']}]},
    {txt:()=>`${S.f.b7v2_ask === 'champ' ? `"The champion," Tehol says. "Tall?"

"Very, master. From a long way off. He had a great many opinions about his sword."

"And?"

"And the Azath grounds have a new mound, master." Bugg says it with no satisfaction at all. "The Emperor will be up again by the week's end. He always is."

Tehol lies back and looks at the netting. "They keep coming," he says. "From further and further away, to die in our city. You'd think word would get round."` : `"The coin," Tehol says. "Where has it gone?"

"No one knows, master. It is the talk of every counting house in the city."

"How very strange," says Tehol, gravely. He has never in his life had any to lose track of. "Coin. Gone. It was here only last year. I distinctly remember seeing some."

"So do I, master."

"Do let me know," says Tehol, "if it turns up."`}`},
    {txt:
`The light goes out of the sky the way it does in Letheras in summer: slowly, reluctantly, red at the edges.

Across the roofs, lamps come up in windows. Further off, by the canals, a few go out. Tehol has lived in this city all his life and he can read it by its lamps, as a farmer reads a field. Tonight the field is uneasy.

A patrol goes down the street below: four Letherii and a tall Edur walking behind them, looking at nothing. The fish-fryer's shutter comes down very quietly. Tehol lies still under his netting, a man of no account whatever, which is the best thing to be in a street like this one.`,
     ch:[{t:'"Bugg. Are we watched?"', set:['b7v2_watch','ask']},
         {t:'Wave to the patrol.', set:['b7v2_watch','wave']}]},
    {go:'Sleep.', txt:()=>`${S.f.b7v2_watch === 'wave' ? `Tehol lifts one hand above the netting and waves to the patrol, cheerfully, as a man waves to a neighbour. None of them looks up. Bugg sighs, very faintly, the sigh of a servant who has seen a great many waves and expects to see a great many more.` : `"Bugg," Tehol says, when the patrol has gone. "Are we watched?"

"Everyone is watched, master." Bugg is folding something that was a shirt this morning. "It is the fashion. You would be insulted if you were not."`}

"Goodnight, Bugg."

"Goodnight, master."

The ladder creaks again, going down. Tehol lies on his roof under the netting and the first stars, with the city's whole summer pressing on it, and listens to Letheras make up its mind about something. It is taking its time. Tehol, as it happens, has plenty.`},
    b7vEnd({
      perrit:() => `Perrit turns the tile face down. "Tehol Beddict," she says. "On his roof." She squares the tile with the edge of the flagstone, exactly. "He was the richest man in Letheras once. The school taught us the sums of how he lost it, as a warning." She glances at the gate and the grey shapes in it. "His servant knows more about this city than the Patriotists do, Sergeant. I would not put that in anybody's file."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "The Beddict boy," she says, and spits to one side, for manners. "Lying on a roof in this heat with next to nothing on." She tucks the tile back into its cloth. "Every year someone tells me he's finished. Every year he's still up there, Sergeant. I've stopped taking bets."`,
      other:(r, p) => `${r.name} turns the tile face down. "Tehol Beddict on his roof," ${p.s} says, "and the city's troubles, counted out by his man."`})]},

  /* ---- Chapter 3: inland, the night raids. On a road the Third will never walk, a sapper sets a trap the marines already have a name for. ---- */
  b7v3:{book:'rg', ch:3, who:'Fiddler', where:'A road inland', fig:'b7v_fiddler', bg:'b7v_road', cap:'A cart road between hedges in the dark, a man on his knees in the middle of it, and a long way down the road, the lights of a farm.', steps:[
    {txt:
`Fiddler kneels in the middle of a Letherii cart road in the dark with a cusser in both hands, which is as close to prayer as sappers get.

The hole is dug. He dug it himself, a hand's width at a time, putting the earth on a cloak so the road would show nothing in the morning. Now the cusser goes in. Slowly. You don't hurry a cusser. You don't hurry anything that can take your face off and the faces of everyone you've ever met.

The marines have a name for this one already. The Drum. He doesn't ask who started it. Someone always does.`},
    {txt:
`At the end of the path, where it leaves the road for the hedge, Cuttle is crouched with his crossbow across his knees, keeping watch down the road.

He is praying. Under his breath, steady, the words too low to make out.

Fiddler has known Cuttle for years. He has seen Cuttle cheerful, and sour, and very drunk, and once, in a tunnel, frightened enough to laugh. He has never heard him pray.`,
     ch:[{t:'Ask him who he\'s praying to.', set:['b7v3_pray','ask']},
         {t:'Leave him to it.', set:['b7v3_pray','leave']}]},
    {txt:()=>`${S.f.b7v3_pray === 'ask' ? `"Who are you talking to?" Fiddler says, low.

"Whoever's listening," says Cuttle. "There's got to be one god on this continent that likes sappers."

"Find out its name," Fiddler says. "I'll want to thank it."` : `He leaves him to it. A man's prayers are his own business, and so is a man's god, and Fiddler has enough of his own to be getting on with.`}

The sharpers go in round the cusser, packed in straw, each one placed by feel. Then the trigger, which is a cord, and a stake, and a thing he does with his thumbs that he has never once managed to teach anybody. Then the earth back over all of it, and the cloak shaken out, and the road a road again.

Behind the hedge, the squad's mage has them all wrapped in Mockra. A man walking this road would look straight at them and see brambles, and think about his supper.`},
    {txt:
`He sits back on his heels in the hedge and wipes his hands.

Weeks of this, now. Nights of it. Ambushes and smokes and running, and the Letherii still fighting beside the Edur, every time. The captain says the plan won't work: the people here won't rise for a foreign army that burns their roads.

The Adjunct needs the farmers, he thinks. The swineherds. The people who own the roads. He said as much to the squad, early, and they looked at him as if he'd grown a second head.`,
     ch:[{t:'Think about the farmers.', set:['b7v3_think','farm']},
         {t:'Think about nothing but the road.', set:['b7v3_think','road']}]},
    {go:'Wait for it.', txt:()=>`${S.f.b7v3_think === 'road' ? `He puts it away. A sapper with his head full of farmers is a sapper with no head. He thinks about the road, and the cord, and the stake, and nothing else at all.` : `He thinks about the farm whose lights are down the road. They'll hear this. Everybody for a league will hear it. Some of them will hate the marines for it, and some will be glad, and he will never know which, and it matters more than the trap does.`}

Down the road a light comes round the bend. A lantern on a pole, swinging. Then horses, a good many of them, at a walk.

Cuttle has stopped praying. Fiddler puts his palms over his ears and opens his mouth, the old trick, and on the other side of the hedge the whole squad does the same, and he begins, very quietly, to count.`},
    b7vEnd({
      marrow:() => `Marrow lets the card go. "A sapper on his knees in a road," she says, "and his friend at the end of the path, praying." She keeps her palm flat on the boards. "I've buried sappers, child. They all pray. They just don't call it that." She listens to the dark beyond the shutters. "That road isn't far from here."`,
      tallow:() => `Tallow puts the card face down. "A sergeant of marines," he says, "setting a cusser in the dark like he was laying a table." He shakes his head slowly. "Gran said never sit near a man who's calm about fire." He looks at the shutters. "There are a lot of calm men out there tonight, Sergeant."`,
      oldninth:() => `The old soldier lets the card go and reaches for the rum. "Fiddler," he says. "Every marine in this column knows that walk." He drinks. "Keep off his roads, Sergeant. He doesn't put up signs, and he doesn't take them down after."`,
      other:(r, p) => `${r.name} lets the card go. "A sapper in a road," ${p.s} says, "and the Drum under it."`})]},

  /* ---- Chapter 4: the muster below Kravos Hill. Far below anything the army can see, an Edur who was the Patriotists' enemy goes looking for a name. ---- */
  b7v4:{book:'rg', ch:4, who:'Bruthen Trana', where:'The floor of the sea', fig:'b7v_bruthen', bg:'b7v_seafloor', cap:'Black water pressing down, a plain of silt and old broken hulls, and far off in the dark a pale column standing up out of the sea floor.', steps:[
    {txt:
`Bruthen Trana walks on the floor of the sea, and the sea lets him.

There is no light here, and he can see. There is no air, and he has stopped missing it. The water presses on him from every side, the whole weight of it, and he walks under it as he once walked under the sky over the Edur villages in the north: as though it belonged to him.

Silt rises round his feet at every step and hangs, and does not settle.`},
    {txt:
`He remembers Letheras. Not all of it. Pieces.

The Chancellor's door, and the Chancellor's guards in front of it, and the Chancellor's voice telling him, every time, that the Emperor was not receiving. He was the Edur set to watch the Patriotists, and he could not get a word to his own Emperor past one Letherii in a good robe.

The Patriotists themselves. Their charter of the loyal and the disloyal. The First Concubine, taken in the night and dead in their keeping.`,
     ch:[{t:'Remember the Invigilator.', set:['b7v4_mem','karos']},
         {t:'Remember the Chancellor\'s hand.', set:['b7v4_mem','gnol']}]},
    {txt:()=>`${S.f.b7v4_mem === 'gnol' ? `He remembers the Chancellor's hand in his, and the sound it made. There was a war begun in that room. He knew it as he walked out, and he did not slow down.` : `He remembers the Invigilator on the floor of his own fine office, and his own fists, and how little it changed. Karos Invictad got up again. Men like that always do.`}

And he remembers the end, though only as a cold. Hannan Mosag wanted a death to bless a temple with, and chose his. That is all of it he will keep.

He walks. Hulls lie on their sides in the silt, old ships of every make he knows and some he doesn't, their ribs furred with weed. He does not stop. He is not here for them.`},
    {txt:
`Ahead, out of the dark, a pillar.

It stands up from the sea floor taller than any tower in Letheras, pale as bone, and as he comes nearer he sees that it is covered, every hand's breadth of it, top to bottom, with names. Cut into the stone. Thousands. More than he could read in the rest of whatever he has instead of a life.

He knows, as he knows he can see, that one of them is the name he was sent for. He does not know who sent him. He has stopped expecting to.`,
     ch:[{t:'Read from the bottom.', set:['b7v4_read','low']},
         {t:'Let your hand find it.', set:['b7v4_read','hand']}]},
    {go:'Touch the name.', txt:()=>`${S.f.b7v4_read === 'hand' ? `He lays his palm on the stone and lets it go where it will, and it goes up, and to the left, and stops.` : `He reads from the bottom, name by name, and it takes the time it takes, and down here that is no time at all.`}

*Brys Beddict.*

He knows the name. Everyone who was in Letheras when the Edur came knows it: the King's Champion, the swordsman, the one the city still talks of in low voices in the Emperor's own streets.

Bruthen Trana stands at the foot of the pillar with the sea on his shoulders and his hand on the cut letters of a Letherii's name, and he finds, for the first time since the cold, that he is in a hurry.`},
    b7vEnd({
      perrit:() => `Perrit turns the tile face down, and keeps her hand on it. "Bruthen Trana," she says, very low, because tents leak sound. "The Edur who broke the Chancellor's hand." She looks at the canvas wall as if it might be listening. "He walked on the bottom of the sea, Sergeant. I don't think the living do that." A breath. "The school has no tile for what he was walking toward."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "A grey man walking where the sea's deepest," she says, and spits to one side, for manners, and the blanket takes it. "Reading names off a stone." She pulls her shawl round her, though the tent is warm. "Mind you stay out of the canals, Sergeant. The Drownings keep a list too."`,
      other:(r, p) => `${r.name} turns the tile face down. "An Edur on the sea floor," ${p.s} says, "looking for a name."`})]},

  /* ---- Chapter 5: the river villages. The same day as the Third's own, in another village up the funnel, a sergeant who drinks. ---- */
  b7v5:{book:'rg', ch:5, who:'Hellian', where:'A village tavern', fig:'b7v_hellian', bg:'b7v_tavern', cap:'A low tavern room with its shutters open on a village street, a table at the back with something on it under a cloth, and beyond the last houses a line of trees going dark.', steps:[
    {txt:
`Sergeant Hellian sits in the best chair in the village tavern with a jug, which is what liberating people is mostly for.

This is how it goes, every village. Her squad comes in at dusk. They find the officials, and the money-lenders, and the advocates, and they deal with them. Then they tell the people to take what they want and run, and the people do. And afterwards, in the next village, somebody always finds them in the dark to say where the Edur are.

It works. She hadn't expected it to. She hadn't expected much of anything, coming ashore, except a lot of walking and not enough rum.`},
    {txt:
`On the end table, under a cloth, is what the villagers wanted done to their tax-man, their money-lender and their advocate. Hellian has put her back to that table. It isn't squeamishness. It's manners.

Urb stands at the door, filling most of it. He is her corporal and he says very little, and he watches the street, and every so often he watches her instead, when he thinks she can't tell.

The rafters are low and dark and full of corners.`,
     ch:[{t:'Drink.', set:['b7v5_look','drink']},
         {t:'Check the rafters for spiders.', set:['b7v5_look','spiders']}]},
    {txt:()=>`${S.f.b7v5_look === 'spiders' ? `She checks the rafters for spiders. Corner by corner, slowly, the jug held ready in case she has to throw it. There is a web over the door. Urb, without a word, reaches up and takes it down, and wipes his hand on his breeches, and goes back to watching the street.` : `She drinks. The village's wine is thin and sour and she drinks it with the steady dedication of a professional, and the room grows warmer and kinder round the edges, which is what rooms are for.`}

A boy comes in off the street. He is out of breath and too frightened to remember he should be frightened of her.

"In the trees," he says. "Grey men. Lots."`},
    {txt:
`Urb has already turned to the shutter. Hellian gets up, which takes longer than she would like, and goes to stand beside him.

Beyond the last houses of the village the fields run out to a line of trees, black against the last of the light. And out of the trees, walking, not hurrying, come the Edur. Tall and grey, with their long swords and their spears. A line of them. Then another line behind it. Then more than she can be bothered to count.

Hundreds.

Her head has gone very clear, which is a terrible waste of a good jug.`,
     ch:[{t:'"Wake everyone."', set:['b7v5_order','wake']},
         {t:'"Finish the jug first."', set:['b7v5_order','jug']}]},
    {go:'Pick up the crossbow.', txt:()=>`${S.f.b7v5_order === 'jug' ? `"Finish the jug first," she says, and does, in one long pull, and puts it down empty on the sill. Urb is already going out of the door bellowing for the squad. That's the thing about Urb. He hears what she means.` : `"Wake everyone," she says. Urb goes out of the door bellowing for the squad, and down the street doors open and men come out with their boots in their hands.`}

She stands at the shutter a moment longer.

Somewhere up the river, she thinks, there are other villages with other squads in them, watching the same trees. She hopes they found better wine.

Out in the street, the first door slams. Hellian picks up her crossbow and goes to find out where she left her helmet.`},
    b7vEnd({
      marrow:() => `Marrow lets the card go. "A sergeant who drinks," she says, "and a big quiet man at her door." She glances up at the trapdoor, at the thin line of daylight round its edge. "Up the river, child. Today. The same trees as ours." She puts the card away slowly. "They're coming out for her, and they're coming out for us."`,
      tallow:() => `Tallow puts the card face down. "That was another village," he says. "Up the river. The same day as this one." He looks at the barrels and the ladder. "Gran said trouble comes to a district all at once, like a fair." He swallows. "It's here, Sergeant. It's in the trees."`,
      oldninth:() => `The old soldier lets the card go and drinks, all of it. "Hellian," he says. "Drinks more than I do. Fights better than I do." He sets the cup down on the barrel-head. "If she's got Edur on her doorstep, so have we." He corks his flask. "Rum after, Sergeant. If there's an after."`,
      other:(r, p) => `${r.name} lets the card go. "A sergeant in a tavern," ${p.s} says, "and the Edur coming out of the trees."`})]},

  /* ---- Chapter 6: the killing field. Across the plain from the Letherii line, the Edur chief standing nearest the foreigners' ring. ---- */
  b7v6:{book:'rg', ch:6, who:'Hanradi Khalag', where:'The plain before Letheras', fig:'b7v_hanradi', bg:'b7v_field', cap:'A cleared plain under a hard pale sky, a ring of foreign soldiers in the middle of it, and on a ridge to the west a line of robed figures with their arms raised.', steps:[
    {txt:
`Hanradi Khalag stands with his warriors on the plain a day from Letheras, and watches the Letherii on their ridge, and despises them.

He told them so at Kravos Hill. Their commanders, and the Patriotist lieutenant with the Chancellor's orders in his sleeve, and the rest of the army's fine officers in their tent. He did not trouble to lower his voice. The Edur took this empire. The Letherii only live in it.

Now the officers are up on the ridge, safe, with their mages in a long line in front of them. And down here on the plain, between the ridge and the enemy, stand the Edur.`},
    {txt:
`The enemy is in the middle of the plain. Foreign soldiers, a thousand or fewer, in a ring, their shields out, their crossbows ready. They have been burning their way across Lether all summer by night, and now, at last, they are in the open where they can be seen, and they do not look as if they mind.

Hanradi's warriors are closest to them. Close enough to make out faces.

Behind him, on the ridge, the Letherii mages have begun.

He feels it before he hears it: a pressure behind the eyes, a weight coming up out of the ground. It has been building for days. A week, perhaps. It is very large. It is not aimed only at the ring.`,
     ch:[{t:'Call your warriors back.', set:['b7v6_call','back']},
         {t:'Keep walking toward the ring.', set:['b7v6_call','on']}]},
    {txt:()=>`${S.f.b7v6_call === 'back' ? `He shouts for his warriors to fall back. They turn. There is nowhere to fall back to: the ridge is behind them, and it is the ridge that is coming.` : `He keeps walking toward the ring, because there is nowhere else to walk. Whatever the ridge is making, it is coming for everything on this plain, and he will not be seen to run from Letherii.`}

He understands it all at once, as a man understands a fall: too late to matter. The Chancellor's orders. The fine officers on the ridge. Kill the foreigners, and the Edur with them, and let Letheras grieve for its masters in public.

The sorcery comes down off the ridge.`},
    {txt:
`It comes as a wave. There is no other word for it. A wall of something with no colour he has a name for, rolling down over the grass, and the grass lies flat in front of it, and the air screams.

His warriors stand. He will remember that, after. Not one of them runs.

Then, out of the middle of the foreigners' ring, light.

Silver, pale and hard, going up like a dome of fire, wide, and wider, faster than the wave. It takes in the ring. It takes in the grass round the ring. It takes in Hanradi Khalag and his warriors, and closes over them, and the wave breaks against it.`},
    {txt:
`The noise of it is past hearing. The silver shudders, and holds. It shudders again, and holds. Somewhere in the middle of the foreign soldiers, someone is holding it up, and Hanradi can feel what it costs, as heat is felt through a door.

He stands under the dome with his sword in his hand among the enemy, and none of them looks at him. They are all looking up.

Then the wave is spent, and the light goes out. All at once. Whoever held it is not holding it any more.

The plain is very quiet.

A few paces from him a Malazan sergeant with grey in his beard is getting up off one knee, with a crossbow. He looks at Hanradi. Hanradi looks at him.`,
     ch:[{t:'Lower your sword.', set:['b7v6_truce','lower']},
         {t:'Nod, once.', set:['b7v6_truce','nod']}]},
    {go:'Walk home.', txt:()=>`${S.f.b7v6_truce === 'lower' ? `Hanradi lowers his sword. After a moment, the sergeant lowers his crossbow.` : `Hanradi nods, once. After a moment, the sergeant nods back.`} Neither of them says anything. There is nothing either of them could say that the plain has not said already.

Hanradi Khalag turns to his warriors. They are waiting. They saw the ridge, and they saw the light.

"Home," he says.

He leads them north, off the plain, away from the ridge and away from the city, toward the villages they came from before any of them had heard of an empire. Behind him the Letherii can have it, and keep it, and see how they like it.`},
    b7vEnd({
      perrit:() => `Perrit turns the tile face down, quickly, and presses it flat against the shield. "That is the ridge," she says. "Up there. Today." She keeps her face from it. "Our own mages, Sergeant, and the Edur under it with the foreigners." Her voice is quite level. "And a light that held. I do not know whose." A breath. "Whatever comes down off that ridge, don't be under it."`,
      tilewoman:() => `The tile-woman puts her hand flat over the tile and leaves it there. "An Edur chief," she says. She does not spit. "Walking home." She looks up at the ridge, at the robed shapes moving on it in the grey. "I'll take my dock now, Sergeant. I mean to be back at the surgeon's cart before noon."`,
      other:(r, p) => `${r.name} turns the tile face down. "The ridge," ${p.s} says, "and a silver light over the foreigners. That is today."`})]},

  /* ---- Chapter 7: the river below Letheras, days before the city. The Adjunct's own battle, after, through the eyes of the woman beside her. ---- */
  b7v7:{book:'rg', ch:7, who:'Lostara Yil', where:'The Lether River', fig:'b7v_lostara', bg:'b7v_river', cap:'A river bank at dusk after a battle, smoke lying on the water, ships drawn up on the mud, and on the bank above them a woman in grey watching the field.', steps:[
    {txt:
`Lostara Yil stands a pace behind the Adjunct on the river bank, which is where she stands, and watches the field.

It did not take long. The Letherii army marched to the river to stop the landing, and the landing was the Adjunct's whole army coming off the ships at once, and the Letherii broke. Lostara has seen armies break before. This one did it all at once, in the middle, like a plank.

Now the field is smoke and running men, and the light going.`},
    {txt:
`The Adjunct has not called her soldiers back.

They are out across the field after the broken Letherii, and they are killing them. The ones who run. The ones who have stopped running. Lostara watches it, because it is her duty to watch what the Adjunct watches, and she does not look away, because the Adjunct does not.

She knows why. She thinks she knows. The Adjunct is not doing this out of anger. Lostara has never once seen her angry.

*She hardens them.*`,
     ch:[{t:'"Adjunct. They\'re running."', set:['b7v7_say','say']},
         {t:'Keep it to yourself.', set:['b7v7_say','keep']}]},
    {txt:()=>`${S.f.b7v7_say === 'say' ? `"Adjunct," Lostara says. "They're running."

"I know," says the Adjunct, and nothing more, and does not turn her head.` : `She keeps it to herself. Whatever she might say, the Adjunct already knows it, and has already weighed it, and has chosen. Lostara has served her long enough to be sure of that much, and of nothing else.`}

Down on the mud, by the ships, Fist Blistig is complaining to an officer about something, as he has complained since the fleet sailed, and will until it sails again. Further off, the ex-priest Banaschar sits on an upturned boat with a jug, watching the field with the face of someone at a funeral he was not invited to.

The Adjunct's face shows nothing. It never does. Lostara has watched it across two continents, and she has learned only that there is a great deal behind it, and that none of it is hers.`},
    {txt:
`The light goes. Out on the field the killing slows, and stops, and the soldiers come back in twos and threes, quiet, carrying their own. They do not look the same as the soldiers who went out. That, Lostara thinks, was the point.

Fires along the bank. The smell of the river, and smoke, and the other smell.

The Adjunct speaks at last, to the officers gathered below her on the bank. Not long. She is never long.

They march at dawn.`,
     ch:[{t:'"For the city, Adjunct?"', set:['b7v7_ask','city']},
         {t:'Say nothing. Go and give the orders.', set:['b7v7_ask','orders']}]},
    {go:'Follow her.', txt:()=>`${S.f.b7v7_ask === 'city' ? `"For the city, Adjunct?" Lostara asks.

"For the city," says the Adjunct.` : `Lostara goes down among the officers and gives the orders, and the orders go out along the bank into the dark, from fire to fire.`}

Later, when the camp is quiet, she stands on the bank again and looks upriver, where the smoke goes, toward Letheras.

Somewhere ahead of them, past the smoke, the marines have been walking for weeks with no one to see them do it. Burning their roads, emptying their villages, dying in fields nobody will ever name for them. Unwitnessed, the Adjunct said.

Not quite, Lostara thinks. Not after tomorrow.`},
    b7vEnd({
      marrow:() => `Marrow lets the card go. "The Adjunct," she says. "By the river, with the Pardu woman a pace behind her." She looks up the street toward the shouting. "She won hers, child. Days ago, while we were walking." She puts the card away. "She's coming. Whatever this city is about to be, she'll be here for it."`,
      tallow:() => `Tallow puts the card face down. "The Adjunct's own battle," he says. "And we never even heard it." He looks up at the smoke over the towers. "Gran said the big ones are always somewhere else." He almost smiles. "She was right about that one, Sergeant."`,
      oldninth:() => `The old soldier lets the card go and drinks. "Hardens them," he says. "That's what the Pardu thought. Hardens them." He turns the cup in his hands. "I've served under a few who did that. Most of them were right to." He sets the cup on the step, empty. "Doesn't mean I liked them."`,
      other:(r, p) => `${r.name} lets the card go. "The Adjunct by the river," ${p.s} says, "and the Letherii army broken behind her."`})]},
});
