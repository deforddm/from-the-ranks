/* ============ Book Five: Through the Tiles, the seven visions of Indebted ============
   One per chapter, played when Book Five's reader (visReader(), 36b; Perrit while she walks and lives, else the tile-woman: 80) turns a
   tile and looks into it. Each is a scene somewhere the Sixth cannot stand, through the eyes of a canon character the squad never meets.
   Choices change words, never outcomes (S.f.b5v*_ keys; nothing else reads them). The last step of each is the reader, back at the
   chapter's reading place (B5READ[n]): its sp, fig and txt are getters/functions of visReader(), so visAgain (36b) still matches it.
   How it hooks on: 21's tile screen offers "✦ Look into the tile" whenever visionFor(chapter, tile) finds one (36b, by book); the vision
   comes back to b5_c<n>_card (36b's cardNodeName). Nothing in the chapter files changes.
   Canon basis: docs/mt-canon.md §12 (viewpoint, scene, sources, stop before), bound by §9, §10 (series-canon §(a) rules 31-44) and rule 13.
   The tiles never name a being; the Warlock King's power is never named; the darkest canon is headline only. Notes: docs/mt-visions-notes.md.
   Backdrops are VISBG b5v_* and b5tiles, the new figures FIGX b5v_* (88b, which loads after this file; both are read only when a vision plays). */

/* ---------------- the reader, at the end of each vision ---------------- */
const b5vWho = r => ['perrit', 'tilewoman'].includes(r.id) ? r.id : 'other';
const b5vFig = () => { const r = visReader(); return r.id === 'perrit' ? 'perrit' : r.id === 'tilewoman' ? 'b5_c1_tilewoman' : FIGX[r.id] ? r.id : 'b5_c1_tilewoman'; };
/* o = {perrit:(r) => text, tilewoman:..., other:...}: 80's two readers; other is the fallback */
const b5vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b5vFig(); }, bg:'b5tiles',
  txt:() => { const r = visReader(); return (o[b5vWho(r)] || o.other)(r); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: Letheras, the eve of the festival. Far to the north, in a fog the Warlock King made, the poachers' ships go quiet. ---- */
  b5v1:{book:'mt', ch:1, who:'Trull Sengar', where:'Calach Bay', fig:'b5v_trull', bg:'b5v_calach', cap:'A bank of fog on a flat grey bay, four black longboats sitting still in it, and somewhere out in the white, the masts of other ships.', steps:[
    {txt:
`Trull Sengar sits in the Warlock King's own longboat, in a fog that should not be there, on a sea with no wind on it.

There are four boats. Long, black, high in the prow, four hundred warriors of the tribes at the oars with the oars shipped. No one rows. The fog came up off the water at the Warlock King's word, and it has a weight to it, wet and close, like a cloak hung over a door.

His brother Fear sits beside him on the thwart with his spear across his knees. Between the warriors, crowded along the gunwales, stand the shadow wraiths, more of them than Trull has ever seen in one place. They make no sound. They lean toward the fog.`},
    {txt:
`He hears the Letherii before he sees them.

A block creaking. A man calling a name, and another man laughing at him. The slap of a slack sail against a mast, again and again, because there is no wind to fill it. The Warlock King has seen to the wind.

They are seal-hunters, out of Trate, in the Edur's own waters, as they come every year, in more ships every year. A Beneda warrior washed up on the strand at the bay's mouth not long ago, dead of Letherii sorcery. So they have brought mages with them this time.

Out in the white, a darker shape. A hull. Then another beyond it.`,
     ch:[{t:'Watch the ships.', set:['b5v1_look','ships']},
         {t:'Watch your brother.', set:['b5v1_look','fear']}]},
    {txt:()=>`${S.f.b5v1_look === 'fear' ? `Trull watches Fear instead. His brother's face is set, the way it sets before a hunt, and his knuckles are pale on the spear. Fear has said, more than once, that the Letherii must be answered. He does not look as if he is enjoying the answer.` : `Trull watches the ships. Three-masted, broad in the beam, built to carry a great many seals and not to run from anything. A lamp on a stern, yellow in the fog. Someone aboard is cooking.`}

In the bow of the lead boat, Hannan Mosag rises to his feet.

He lifts one hand, and lets it fall.

The longboat rocks under Trull, once, as something passes beneath it in the water. He does not see what. He looks at the fog in front of him, only at the fog, and is glad, all his life, that he did.`,
     ch:[{t:'Cover your ears.', set:['b5v1_ears','cover']},
         {t:'Keep your hands on the gunwale.', set:['b5v1_ears','hold']}]},
    {txt:()=>`${S.f.b5v1_ears === 'hold' ? `Trull keeps his hands on the gunwale, because a warrior does, and so he hears all of it.` : `Trull puts his hands over his ears, and all along the boat the warriors are doing the same, and it is not enough.`}

The screaming comes out of the fog from every side at once. It goes on longer than seems possible.

Then it stops.

The quiet after it is worse. The slack sails have stopped slapping. The block has stopped creaking. There is no voice anywhere on the water, and the fog begins, slowly, to thin.`},
    {go:'Row for home.', txt:
`The Letherii ships sit on the flat sea, burned out and wallowing, their masts black, nothing moving on their decks.

The shadow wraiths go over the side. They cross the water without touching it, and climb aboard, and the dead hulls turn, one by one, and their scorched sails fill with a wind that touches nothing else, and they go south. Toward Lether. With their crews still aboard.

"An answer," Fear says, when the oars are out again. "They will read it."

"They read everything," says Trull. "That is what worries me."

Neither of them speaks again the whole way back to the village. Trull finds, when they beach the boat, that he cannot remember the last time he was afraid of his own side.`},
    b5vEnd({
      perrit:() => `Perrit turns the tile face down. "Edur," she says. "And ships of ours in a fog, a long way north." She squares the tile with the edge of the flagstone, exactly. "The school says the tiles show what is, not what will be. I have always found that a comfort." She moves along the flagstone, a hand's width, so that the canal wall is not quite behind her. "They were sailing south, Sergeant."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "Grey men in black boats," she says, and spits to one side, for manners. "And our ships coming home with nobody at the oars." She tucks the tile back in its cloth. "That's far north, Sergeant. It won't stay there."`,
      other:(r) => `${r.name} turns the tile face down. "Edur in a fog," she says, "and our ships going quiet."`})]},

  /* ---- Chapter 2: Trate after the wave. On the day it came, an old man in Letheras watched it come, through a tile. ---- */
  b5v2:{book:'mt', ch:2, who:'Kuru Qan', where:'The Cedance', fig:'b5v_kuruqan', bg:'b5v_cedance', cap:'A dark chamber deep under the palace, a floor of tiles, and in one of them the harbour at Trate, bright with afternoon sun.', steps:[
    {txt:
`Kuru Qan, Ceda to the King of Lether, stands in the dark of the Cedance with his hands in his sleeves, and looks down at the floor.

The floor is tiles. Every one of them a window, if you know how to open it, and he has spent a long life learning how. Most of them he keeps shut. Today he has opened one.

It answers to a tower of black basalt out on its rocks in the south of Trate harbour, leagues to the north and west, with no door and no window in it, and a ring of tiles on its top that sees what he asks it to see. Today he has asked it to watch the sea.`},
    {txt:
`It is a fine day in Trate. Sun on the water, warm on the quays, gulls over the fish market. A flower dancer on the waterfront, for the crowd. Carts. Children on the harbour wall. A city getting on with its business, which is business.

Out past the breakwater, three ships, coming in.

The pilot scow puts out to meet them, as it should, oars rising and falling, its little flag up. The Ceda has watched that done a thousand times through this tile. He watches it now.`,
     ch:[{t:'Look closer at the ships.', set:['b5v2_look','ships']},
         {t:'Look at the harbour.', set:['b5v2_look','harbour']}]},
    {txt:()=>`${S.f.b5v2_look === 'harbour' ? `He looks at the harbour, because the harbour is what the tile is for. The crowds on the quays. The fishing boats tied three deep. The lighthouse over the front. And then the ships draw his eye anyway, because they are wrong.` : `He brings the tile closer to the ships, and closer, until he can see the rigging. Harvest ships, out of Trate, the seal fleet. They should not be coming home this early in the year. They should not be coming home this fast with no wind in their sails.`}

The pilot scow stops. Its oars falter, and then it is backing water as hard as its crew can pull.

There are shapes in the rigging. Dark, and many, and moving the way no sailor moves.

On the harbour wall a bell begins to ring.`,
     ch:[{t:'Reach through the tile.', set:['b5v2_reach','reach']},
         {t:'Keep still, and watch.', set:['b5v2_reach','still']}]},
    {txt:()=>`${S.f.b5v2_reach === 'reach' ? `He reaches, down through the tile and along the long thread to the tower on its rocks, as far as the Holds will let him. They will not let him far enough. Whatever he might do, from here, he would do too late.` : `He keeps still. He is a long way off, and old, and wise enough to know when a thing is beyond him. He can watch. Someone in Lether must.`}

Under the ships the sea is swelling.

Not a wave, at first. A rising, as of something very large coming up toward the warm light from somewhere very deep. Something old, and bound, and hungry. The sun is on it now, and it grows in the sun, and it lifts the three ships on its back as a man lifts a tray.

Then the whole bay stands up and comes in over Trate.`},
    {go:'Close the tile.', txt:
`The water comes down on the ships and the quays and the crowds together. What it does there, the Ceda will read in the reports. He sees enough from here.

Then it goes back. The sea draws off the stones, and what was lifted is set down wherever it falls: the ships on the waterfront, fish in the streets, boats in the market square. The bell has stopped.

Kuru Qan stands in the dark with the bright tile at his feet and his hands still in his sleeves.

The Edur have answered, then. He will have to tell the King. He tries the words over to himself, and does not like any of them, and closes the tile.`},
    b5vEnd({
      perrit:() => `Perrit turns the tile face down. "The Ceda," she says, and even she is careful with the word. "He saw it come in, from Letheras." She looks out at the harbour in front of her, at what the water left. "So it was watched. Every moment of it, by the best eyes in Lether." She sets the tile square. "It did not help, Sergeant. Write that down somewhere."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "The old man under the palace," she says, and spits to one side, for manners. "Watching. They always are, that sort." She looks at the quay, at the planks still dark with salt. "Didn't stop it coming, did it."`,
      other:(r) => `${r.name} turns the tile face down. "The Ceda saw it come in," she says. "From Letheras."`})]},

  /* ---- Chapter 3: Kraig's Landing. On the northern coast, the Atri-Preda at Fent Reach stands on her wall and counts. ---- */
  b5v3:{book:'mt', ch:3, who:'Yan Tovis', where:'Fent Reach', fig:'b5v_yantovis', bg:'b5v_fent', cap:'A grey northern sea under a low sky, a wall over a little harbour, and sails on the water, more of them every time you look.', steps:[
    {txt:
`Atri-Preda Yan Tovis stands on the wall at Fent Reach with her helm under her arm, and counts sails.

It is what an officer does. Counts, and writes the count down, and sends it south. Lether runs on counts. The Preda in Letheras will want a number, and a Letherii officer who cannot give a number is no officer at all.

Her garrison is twice the size it was a month ago. The Preda ordered the unfinished fort up the coast at First Maiden emptied, and its soldiers came to her, and they are on her walls now, watching the same sea.`},
    {txt:
`The first count came by runner at dawn: a fleet off First Maiden Fort, five thousand Edur put ashore at a fort with no one left in it. She wrote that down.

Now there are sails off the Reach. She counts them, and loses the count, and counts again.

The ships are black, high in the prow, close-packed, and their decks are dark with warriors standing shoulder to shoulder. The water round them is dark too, darker than the sky can account for, as if they were riding something just under the surface of the sea.`,
     ch:[{t:'Keep counting.', set:['b5v3_count','count']},
         {t:'Send for the officers.', set:['b5v3_count','send']}]},
    {txt:()=>`${S.f.b5v3_count === 'send' ? `She sends for her officers. They come up onto the wall one after another, and each of them stops at the top of the stair and looks out, and then looks at her. None of them offers a number.` : `She keeps counting. She is very good at it. Her lips move. She reaches a figure, and checks it, and the figure does not change, and she writes it down.`}

A rider comes in from the south gate, lathered. A third fleet, he says, off the coast below them, between the Reach and Trate.

So there is no road south by sea, and the road south by land runs past five thousand Edur at First Maiden.

She looks at the figure she has written. Three hundred thousand. She looks at it again, in case she has added wrong. She has not.`,
     ch:[{t:'Ask the officers what they think.', set:['b5v3_ask','ask']},
         {t:'Decide it yourself.', set:['b5v3_ask','alone']}]},
    {txt:()=>`${S.f.b5v3_ask === 'ask' ? `"Well?" she says. Her officers look at the sea, and at each other, and the eldest of them says, quietly, "It is your sum, Atri-Preda. It comes out the same however we hold it."` : `She does not ask them. It is her wall, and her sum, and she will not hand either of them to someone else to carry.`}

She knows the walls. She knows the stores, to the sack. She knows how long two garrisons can hold a little coastal fort against three hundred thousand, and the answer is not long enough to matter to anyone.

There is no ledger in Lether in which this comes out in her favour. She has looked for one, all morning. There isn't.`},
    {go:'Strike the colours.', txt:
`"Strike the colours," says Yan Tovis.

They hear it all along the wall, and nobody moves, and then the flag-sergeant does, because somebody has to. The standard of Lether comes down the pole at Fent Reach, a hand at a time.

Out on the water, the black ships do not cheer. They only come on.

She puts her helm on, so that the garrison can see an officer and not a face, and goes down the stair to open the gate. Every soldier on that wall will live to curse her for this. That is the point of it. She would rather be cursed by the living.`},
    b5vEnd({
      perrit:() => `Perrit turns the tile face down. "Fent Reach," she says. "The Atri-Preda." She does the sum herself, aloud, because she cannot help it, and stops halfway. "Three hundred thousand." She looks along the barge at the regiment's fires on the bank. "There is no school in Lether that teaches you what to do with that number, Sergeant. I would have struck the colours too."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "A woman on a wall," she says, and spits over the side, for manners. "Counting." She sniffs. "She counted right, mind. More than the King's lot will." She tucks the tile away. "She'll be called a coward in Letheras by men who never saw a sail."`,
      other:(r) => `${r.name} turns the tile face down. "The Atri-Preda at Fent Reach," she says, "counting sails, and striking her colours."`})]},

  /* ---- Chapter 4: High Fort. The night the Sixth sits on the rampart, Trate's sorceress climbs her lighthouse. ---- */
  b5v4:{book:'mt', ch:4, who:'Nekal Bara', where:'The Trate Lighthouse', fig:'b5v_nekal', bg:'b5v_lighthouse', cap:'The top of a lighthouse over a harbour at night, its great lamp lit, and out on the black water, ships waiting with no lights at all.', steps:[
    {txt:
`Nekal Bara, sorceress of the Trate Legion, stands at the top of the lighthouse beside the great lamp, and worries.

She has been worrying for days. It is the thing she does best, and she is very good at the other things. The Edur fleet lies off the harbour mouth in the dark, no lamps, waiting. Behind it, under it, in the water, is the thing that brought the harvest ships in on the wave. She has felt it out there every night since she came back from the Landing.

She has a theory about it. She has been over the theory a hundred times. A creature, she thinks, bonded to the Edur, as a hound is bonded to its master. Kill the hound, and the man has to walk.`},
    {txt:
`Arahathan, the Cold Clay's mage, is down on the harbour wall with his staff, where she can see the small light of him. He is to draw it. She is to kill it. Between them they have done harder things. She is fairly sure they have done harder things.

The lamp roars at her back. Below, the harbour is black and flat, and the town behind it has put out its lights, street by street, as if that would help.

Out past the breakwater, the water lifts, very slightly, and settles.`,
     ch:[{t:'"Begin."', set:['b5v4_start','now']},
         {t:'Wait for Arahathan\'s signal.', set:['b5v4_start','wait']}]},
    {txt:()=>`${S.f.b5v4_start === 'wait' ? `She waits for his signal, as they agreed. It comes: a flare of white on the harbour wall, and a long line of fire laid out across the water toward the fleet.` : `"Begin," she says, under her breath, and down on the wall Arahathan hears her anyway, or guesses, and lays a long line of white fire out across the water toward the fleet.`}

The sea answers it.

The water heaves up in a slow black hill beyond the breakwater and turns, the whole weight of it, toward the light on the wall. Toward Arahathan. Just as she planned.

Nekal Bara draws on the Holds, all of it, everything the cadre ever taught her and a few things it never did, until the air round the lamp hums and the glass of it cracks. She gathers it. She aims it at the heart of the black hill.`,
     ch:[{t:'Strike with everything.', set:['b5v4_strike','all']},
         {t:'Strike, and keep something back.', set:['b5v4_strike','keep']}]},
    {txt:()=>`${S.f.b5v4_strike === 'keep' ? `She strikes, and keeps a little back, as the school taught, for the second blow. There is no second blow.` : `She strikes with everything she has. It goes out of her like breath going out of a body, and she sways against the rail.`}

The sorcery goes into the sea, and the sea takes it, and is not hurt.

She has it wrong. She understands it all in the time it takes to understand it. Not a creature. Not a hound. Something older than the town's oldest wall: a spirit of this water, that Trate itself once prayed to and then forgot, a long time ago. Hungry, all that time. And someone has fed it.

It is not interested in Arahathan.

It turns toward the lighthouse.`},
    {go:'Let the lamp go.', txt:
`Nekal Bara has time to do one thing. She does not run. She reaches south, along the long cold thread every cadre mage carries to the Cedance in Letheras, and calls the Ceda's name.

Then the sea comes up the lighthouse.

The great lamp goes out.

Out on the black water, where the fleet has been waiting all this while, oars run out along every hull, and the ships begin to come in.`},
    b5vEnd({
      perrit:() => `Perrit turns the tile face down, and holds it down. "Nekal Bara," she says. "She was at the Landing. We saw her tents." She looks out over the rampart toward the north, toward a coast a long way off. "She called the Ceda. Every cadre mage would." Her voice is quite level. "He will have heard her, Sergeant. From Letheras. That is the arrangement."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "The witch in the lighthouse," she says, and spits to one side, for manners, and the rampart takes it. "Trate's gone, then." She looks at the fires across the pasture. "We were there in the summer. Strange to think of it."`,
      other:(r) => `${r.name} turns the tile face down. "Trate's sorceress," she says, "on the lighthouse. Trate's gone."`})]},

  /* ---- Chapter 5: the road south. Somewhere ahead of the Sixth, among the disarmed, a Finadd limps toward the capital. ---- */
  b5v5:{book:'mt', ch:5, who:'Moroch Nevath', where:'The Road South', fig:'b5v_moroch', bg:'b5v_road', cap:'A long road south under a hot white sky, black fields to either side, and on it a column of soldiers with no weapons, walking.', steps:[
    {txt:
`Finadd Moroch Nevath walks south with no sword, and with one leg that will not do what he tells it.

He felt the tendon go at High Fort, in the charge, when the sorcery came down round him and the ground went out from under the Prince's Guard. He has bound it since with a strip of somebody's cloak. It holds him up, mostly.

The Prince was his to guard. The Prince is in Edur hands now, and so is the Queen. An Edur messenger told him so, quite politely, on the field. The fort had surrendered, the messenger said, as had the entire frontier. Then the Edur took his sword and told him to go home.`},
    {txt:
`So he is going home, with everyone else.

The column is thousands long. Garrison men, Grass Jackets, the Queen's Battalion, the Prince's own, mixed together in no order at all, with their weapons on a pile a long way behind them. No one calls the step, or carries a standard. Men walk in twos and threes, and stop when they need to, and start again when someone near them starts.

The road is white with dust. His boot leaves a print, and the bad leg drags a line beside it.`,
     ch:[{t:'Cut a stick from the hedge.', set:['b5v5_stick','stick']},
         {t:'Walk without one.', set:['b5v5_stick','none']}]},
    {txt:()=>`${S.f.b5v5_stick === 'stick' ? `He cuts a stick from the hedge with a borrowed knife and leans on it. It is not a soldier's look. He finds he has stopped caring how he looks, which is new.` : `He walks without a stick. A Finadd of the Prince's Guard does not limp into Letheras on a hedge-stick, he tells himself, and goes on telling himself for a league or two, until the leg stops listening.`}

The days go by the same. Dust, heat, the leg. At night the column lies down in the fields wherever it is.

Then the fields go black.

Farm after farm, burned to the hedges. Their own army did it, falling back ahead of them, so the Edur would find nothing to eat. It was the right thing to do. He keeps telling himself that, too.

Men have begun to walk near him. Then to ask him things. He is the only officer most of them can put a name to.`,
     ch:[{t:'"Walk to Letheras. Report to your units."', set:['b5v5_tell','report']},
         {t:'"Go home, if you have one."', set:['b5v5_tell','home']}]},
    {txt:()=>`${S.f.b5v5_tell === 'home' ? `"Go home," he tells them, "if you have one to go to." Some of them do, there and then, turning off down the farm tracks into the black. More stay. He finds he is glad of it, and does not know why.` : `"Walk to Letheras," he tells them. "Find your units. Report." He has no idea whether their units exist. They nod as if he had given them an order, and walk on, and that is something.`}

He thinks, as he walks, about what he will say. To the Preda. To the King. That he lost the Prince. That he lost his sword. That the frontier went in a day, and all the sorcery in Lether did not stop it.

He tries different words for it, league after league. None of them makes it come out any better.`},
    {go:'To the gates.', txt:
`And then, one hot afternoon, there is Letheras.

The towers first, over the haze. Then the walls, and the gates standing open, and the crowds round them, come out to look at the army walking home without its weapons. A man is shouting questions. A woman is selling water.

Moroch stops at the edge of the crowd and leans on his leg, or his stick, and looks at the city.

It looks exactly as it did when he left. He had not expected that, somehow. He straightens his back, as well as he can, and limps in through the gates.`},
    b5vEnd({
      perrit:() => `Perrit turns the tile face down. "Moroch Nevath," she says. "The Prince's man." She brushes ash off the edge of the tile with her thumb. "He was on this road. Ahead of us somewhere, by a day or two." She looks down the road, at the black fields on either side. "He thought the right thing, about the farms. I would have thought it too. I find I don't, any more, Sergeant."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "A Finadd with a bad leg," she says, and spits to one side, for manners, and the ash takes it. "Walked the whole way." She nods, once. "Most of them do, in the end. It's the walking back that finds out who you are."`,
      other:(r) => `${r.name} turns the tile face down. "A Finadd on this road," she says, "limping home without his sword."`})]},

  /* ---- Chapter 6: Brans Keep. On the morning the Sixth reads its tiles, the Preda looks out over the whole of her army. ---- */
  b5v6:{book:'mt', ch:6, who:'Unnutal Hebaz', where:'Brans Keep', fig:'b5v_preda', bg:'b5v_brans', cap:'A wide field below a keep built against a cliff, a lake on one side, the army of Lether drawn up in its lines, and beyond the field, columns of darkness standing up out of the ground.', steps:[
    {txt:
`Preda Unnutal Hebaz, who commands the army of Lether, stands with the King's Battalion on the field before Brans Keep and looks at what is left of it.

She stands taller than most women, nearly as tall as a man, fair, in her fortieth year. She has commanded this army for years. She knows its every battalion by its standard and most of its Finadds by name. She ordered this stand, with the King. She does not regret it. There is nowhere left to fall back to that is not the city.

The keep is at her back, against its cliff. The lake to one side. Two towers on the corners, and the army's mages in them, the best that are left.

Across the dry channel, far out on the right, she can see the white fingertips on the shields of the Whitefinder Battalion, come in from the south at last.`},
    {txt:
`The Edur come over the far ground in the morning light.

Shadow wraiths first, in their thousands, a grey tide of them, flung forward to be spent. The towers answer. White fire goes out from the corners of the keep in long sheets and the wraiths go down before it, hundreds at a time, and the King's Battalion cheers.

She does not cheer. She counts. The Edur are spending wraiths as a rich man spends coppers, to see where the holes are.`,
     ch:[{t:'Order the next volley.', set:['b5v6_order','volley']},
         {t:'Hold the towers back. Wait.', set:['b5v6_order','wait']}]},
    {txt:()=>`${S.f.b5v6_order === 'wait' ? `"Hold," she sends to the towers. "Let them come closer." The mages hold. The wraiths come on, and the white fire, when it goes out at last, takes them in a single burning line.` : `"Again," she sends to the towers, and the white fire goes out again, and again, until the field in front of the left and centre smokes from end to end.`}

Then, beyond the Edur lines, the ground begins to rise.

Not the ground. Darkness, coming up out of it. Columns of it, turning slowly as they climb, black and wide as towers, then taller than towers, taller than the keep, until they stand over the far end of the field like the pillars of some great hall with no roof.

The cheering stops all along the line.`,
     ch:[{t:'Send a runner to the towers.', set:['b5v6_runner','send']},
         {t:'Watch. There is no time for runners.', set:['b5v6_runner','watch']}]},
    {txt:()=>`${S.f.b5v6_runner === 'send' ? `She sends a runner to the near tower. He is halfway there when it happens.` : `She does not send anyone. There is no time, and she knows it, and she will not spend a runner's life to tell the mages what they can already see.`}

The two sorceries meet over the field.

For a moment it is only light. Then both towers on the corners of the keep go up at once, and the mages in them with them, and what the mages were holding goes loose across the sky.

The pillars lean.

The nearest of them is moving now, across the field, toward the left and the centre. Toward her. The ground shakes under the King's Battalion. Somewhere behind her a horse is screaming.`},
    {go:'Hold.', txt:
`Unnutal Hebaz has seen a great many fields, and she knows exactly what she is looking at.

She draws her sword, because an army should see its Preda's sword drawn at the end, and lifts it.

"Hold," she says.

Around her, the King's Battalion holds.

Far out on the right, across the dry channel, the Whitefinders are still fighting, hand to hand, against Edur who have no sorcery with them at all. She watches them for the space of a breath. It is, she finds, a good thing to have watched.`},
    b5vEnd({
      perrit:() => `Perrit turns the tile face down, quickly, which she has never done. "That is today," she says. "That is this field." She holds the tile against the shield with her whole palm. "The school says the tiles show what is. The school was wrong, Sergeant." Then, quite calmly, because she is Perrit: "Stay on the right. Whatever happens on the left, stay on the right."`,
      tilewoman:() => `The tile-woman puts her hand flat over the tile and leaves it there. "Black pillars," she says. She does not spit. "That hasn't happened yet." She looks past the shield, at the dust coming up to the north. "It will by noon, Sergeant." She holds out her palm. "Pay me now. There's no settling up after a day like this one."`,
      other:(r) => `${r.name} turns the tile face down. "The Preda," she says, "and pillars of black over this field. That is today."`})]},

  /* ---- Chapter 7: Letheras falls. Tomorrow, on another bridge over another canal, a Finadd stands across the Emperor's road. ---- */
  b5v7:{book:'mt', ch:7, who:'Moroch Nevath', where:'Main Canal', fig:'b5v_moroch', bg:'b5v_bridge', cap:'A broad bridge over a canal in a burning city, a wall of shields across it, and at the far end a figure coming on that catches the light.', steps:[
    {txt:
`Finadd Moroch Nevath stands on the principal bridge over Main Canal with a sword in his hand again, and seventy-three soldiers behind him.

They are the best of his company, what is left of it, and they have locked their shields across the bridge from rail to rail. He chose them himself. He chose this bridge himself. It is on the way to the palace, and anyone going to the palace today will have to cross it.

His leg is bound tight under the greave. It aches. He has stopped attending to it.

Behind him the city is burning in more places than he can count, and somewhere off toward the river, the wolves are howling in the streets.`},
    {txt:
`They come up the far street in the middle of the day.

Edur, a few score, walking. At their head, a little ahead of them, alone, the one the whole city has been whispering about for a week. The Emperor.

He is young. He walks as if every step hurts him. And he shines: his skin is covered in coins, gold coins set into it everywhere like scales, so that he flashes in the sun with every step, and leaves no doubt at all who he is.

Behind Moroch the soldiers begin to shout. "The King's Champion," they shout, across the canal. "Here is the King's Champion."

They know he is not. So does he.`,
     ch:[{t:'Let them shout.', set:['b5v7_shout','let']},
         {t:'"Quiet, there."', set:['b5v7_shout','quiet']}]},
    {txt:()=>`${S.f.b5v7_shout === 'quiet' ? `"Quiet, there," he says, without turning round, and the shouting stops. He would rather the Emperor heard nothing from this bridge but what he has to say himself.` : `He lets them shout. It is a good lie, and they need it more than he does, and the Emperor, at the far end of the bridge, has heard it. He has stopped walking.`}

Moroch has heard the stories, as everyone has. That this Emperor has been killed, and killed again, and gets up each time. That every death costs him, and that he comes back screaming.

He has not believed them. He finds, looking down the bridge at the young man in his coat of coins, that he believes them now.

It makes no difference to what he is going to do.`,
     ch:[{t:'Step out of the wall, alone.', set:['b5v7_step','alone']},
         {t:'"Hold the wall. I go alone."', set:['b5v7_step','order']}]},
    {go:'Step out.', txt:()=>`${S.f.b5v7_step === 'order' ? `"Hold the wall," he says. "Whatever happens. I go alone." Seventy-three shields stay locked behind him.` : `He steps out of the wall without a word, and the shields close behind him.`}

He walks out to the middle of the bridge, on the bad leg, not hurrying. Main Canal is green and slow beneath him. Smoke goes over.

"I am Finadd Moroch Nevath," he says, loud enough for both ends of the bridge, "and this bridge is held. If you want to cross it, Emperor, you will cross it past me."

The Emperor looks at him for a little while, and the coins on his face catch the light.

Then he comes on.

Behind Moroch, seventy-three soldiers hold their shields across the bridge, and watch.`},
    b5vEnd({
      perrit:() => `Perrit turns the tile face down and puts the dock and the knife back on top of it, exactly where they were. "Another bridge," she says. "Not ours." She looks out at the Quillas Canal in front of her, black under the torch. "That is tomorrow, Sergeant. That is somebody in the Prince's Guard, tomorrow, on Main Canal." A breath. "The tiles have stopped telling me what is. They only tell me what will be, now."`,
      tilewoman:() => `The tile-woman puts her hand over the tile, and the dock and the knife with it. "A Finadd on a bridge," she says, and spits to one side, for manners. "Seventy-three behind him. I counted." She looks at the barricade, at the canal. "Brave man. The city will want to know his name, after. Mind you remember it, Sergeant."`,
      other:(r) => `${r.name} turns the tile face down. "A Finadd on a bridge over Main Canal," she says, "and the Emperor coming. Tomorrow."`})]},
});
