/* ============ Book Eight: the seven visions of Time Served ============
   One per chapter, played when Book Eight's reader turns a card (or throws the bones) and looks into it. Book Eight reads through Book
   Three's chain (140c's b8As wraps VISREADER): Tuft while she walks, else Sohra (bones and smoke), else Old Benna. visReader() (36b) gives
   the right one, and 36b's visionFor finds these by book 'tth' (visionFor runs outside b8As, so S.book is 'tth' there).
   Each vision is a scene the Fourth cannot stand in (tth-canon §4), through the eyes of a canon character the Fourth never speaks with.
   Choices change words, never outcomes (S.f.b8v*_ keys; nothing else reads them). The last step of each is the reader, back at the
   chapter's reading place (B8READ[n]): its sp, fig and txt are getters/functions of visReader(), so visAgain (36b) still matches it on a
   replay.
   How it hooks on: 21's card screen offers "✦ Look into the card" whenever visionFor(chapter, card) finds one; the vision comes back to
   b8_c<n>_card (36b's cardNodeName, 'b8_c' for 'tth'), whose one button goes to B8READ[n].back. No chapter file changes.
   Canon basis: docs/tth-canon.md §9, bound by §4, §5 and series-canon §(a), rules 70-83 above all. Picker's walk (Ch 1) is a vision of
   what is coming (fix A); who paid is never said (70). Nimander is named only as the vision's eyes; his kin, the stranger with them and
   the Eleint blood are not (77); no Bastion, no body (78). The Seerdomin is never given an end, the priestess no name (78). The young
   woman in Spinnock's tavern is unnamed in the text. The crossroads stops as the swords come out (83). Karsa is a giant at a wall; the
   one who has arrived is never named (74, 79); the swordsman is a swordsman (73); the moon is never explained (81). Iskar Jarak's place
   is "a place that is ending": no sword, no wagon, no chains, no god at the head of the dead (72, 74, 75, 76); never his old name (7).
   Backdrops are VISBG b8v_* and b8deck, the new figures FIGX b8v_* (148b, which loads after this file; both are read only when a
   vision plays). Notes: docs/tth-visions-notes.md. */

/* ---------------- the reader, at the end of each vision ---------------- */
const b8vP = r => r.he ? {S:'He', s:'he', H:'His', h:'his'} : {S:'She', s:'she', H:'Her', h:'her'};
const b8vWho = r => ['tuft', 'sohra', 'benna'].includes(r.id) ? r.id : 'other';
const b8vFig = () => { const r = visReader(); return r.id === 'tuft' || r.id === 'sohra' ? r.id : r.id === 'benna' ? 'b3v_benna' : FIGX[r.id] ? r.id : r.he ? 'b3_c5_villager' : 'b3v_benna'; };
/* o = {tuft:(r, p) => text, sohra:..., benna:..., other:...}: 60's readers, as Book Eight keeps them (140c); other is the fallback */
const b8vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b8vFig(); }, bg:'b8deck',
  txt:() => { const r = visReader(), p = b8vP(r); return (o[b8vWho(r)] || o.other)(r, p); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: the winter before the Fete. Across the city, a retired marine walking home from the market, and a man behind her. ---- */
  b8v1:{book:'tth', ch:1, who:'Picker', where:'A Daru street', fig:'b8v_picker', bg:'b8v_market', cap:'A crowded Daru street at dusk, the blue lamps coming on along it, and a lane going off between blind walls toward the lake.', steps:[
    {txt:
`Picker walks back from the market with a basket on her arm and a list in her head, and every item on the list is somebody else's errand.

Blend should be doing this. Blend has a sprained ankle. Blend has had a sprained ankle for some days now, and keeps it up on a stool at the bar, and has never once been seen to wince when she forgets which one it is.

The streets are full. The city is in a mood to celebrate something, and has hung it from every balcony. Picker shoulders through. She has been retired long enough to stop saluting, and not nearly long enough to stop counting the exits.`},
    {txt:
`He picked her up three streets back, at the fishmonger's.

Not close. Never close. A man in a plain brown cloak who stops when she stops, and finds something else very interesting whenever she turns her head. He is good. In a crowd like this one, good is nearly enough.

She thinks about the bar, because it is easier than thinking about him. About Mallet upstairs, who has taken to retirement like a man taking to his bed with a fever. About Antsy, who will want to shout. About the old historian, who will want to write it all down.`,
     ch:[{t:'"Not a cutpurse."', set:['b8v1_read','purse']},
         {t:'"Guild."', set:['b8v1_read','guild']}]},
    {txt:()=>`${S.f.b8v1_read === 'guild' ? `Guild. She knows that walk now. It belongs to a man who is paid by the job, and is thinking about the job and not about her, which is his mistake.` : `Not a cutpurse. A cutpurse would have tried by now, and been sorry by now. This one is waiting for somewhere quiet.`}

Somewhere quiet is coming. The lane past the tannery runs between blind walls down to the lake road, and she always takes it, and he will know that she always takes it. That is what he has been paid to know.

She shifts the basket to her left arm.`},
    {txt:
`Picker has been a soldier for most of her life, and a fair part of that life she has spent being followed by people who wanted her dead. She has a rule about it. It is not a complicated rule.

She doesn't hurry. She doesn't look back. She turns into the lane past the tannery the way she always does, and three steps in, where the wall makes a corner and the lamp doesn't reach, she stops being a woman walking home.`,
     ch:[{t:'Set the basket down.', set:['b8v1_basket','down']},
         {t:'Keep hold of the basket.', set:['b8v1_basket','keep']}]},
    {go:'Walk home.', txt:()=>`${S.f.b8v1_basket === 'keep' ? `She keeps the basket. It is a good basket, and he will be looking at it.` : `She sets the basket down by the wall, carefully, because the eggs were dear.`}

He comes round the corner quickly, a blade already out and low along his leg, and finds her there, which is not where he was told she would be.

It is over in the time it takes a lamp to gutter. Picker is not proud of it. She is not anything about it yet. Later, maybe.

She looks at him a moment: the hands, the knife, the plain good cloak. A professional, and not a cheap one. Somebody is spending real money on old Malazans.

She picks up the basket and walks the rest of the way a good deal faster than she walked the first part. Ahead, the lamp over the bar's door is already lit.`},
    b8vEnd({
      tuft:() => `Tuft lets the card go. "A woman with a basket," she says, "and a man who thought she'd be easy." She looks up at the ceiling, at the roof, where something is not the wind. "That hasn't happened yet, Sergeant. It will." She lays the card face down between the cups. "She saw him three streets off. I'd like us to be that good." Her hands are cold.`,
      sohra:() => `Sohra sweeps the bones together with the side of her hand. "A woman walking home with eggs," she says, "and a knife behind her." She listens to the roof a moment. "She turned round first. The bones liked that. It has not happened yet." Her hands are cold.`,
      benna:() => `Old Benna puts the card down and wipes her fingers on her apron. "Marine," she says. "You can tell by the walk. Retired, and nobody's told her feet." She glances at the bar across the door. "Whoever follows that one home will wish he'd picked another basket. Not yet. Soon." Her hands are cold.`,
      other:(r, p) => `${r.name} lets the card go. "A woman walking home," ${p.s} says, "and a knife behind her. Not yet."`})]},

  /* ---- Chapter 2: the old Domin road. Far ahead of the caravan, young Tiste Andii come over a rise to the scarecrow fields. ---- */
  b8v2:{book:'tth', ch:2, who:'Nimander', where:'The scarecrow fields', fig:'b8v_nimander', bg:'b8v_fields', cap:'Low green rows under a pale sky, and on poles among them, as far as the land goes, shapes wrapped in rags.', steps:[
    {txt:
`Nimander walks at the front because the others expect it of him, and because at the front there is no one to watch his face.

The road has been empty for days. Old Domin country: walls that were farms once, ditches nobody clears, a sky the colour of thin milk. Then, over a low rise, the fields begin, and his kin stop talking.

Green. After so much grey, so much green it hurts to look at. Rows of it, planted straight, the plants low and broad-leaved, each one sitting on a swollen root as big as a head, set out in lines as neat as children waiting to be counted.`},
    {txt:
`And on poles among the rows, the scarecrows.

They are not straw. He sees that at the first one, and makes himself go on seeing it. Shapes wrapped in rags, bound upright, and from the hem of each a dark stain runs down the pole into the ground at its foot. The green is thickest there.

There are thousands. Field after field of them, to where the land meets the sky.

Behind him one of his cousins says something low and sharp. Another only breathes out, slowly.`,
     ch:[{t:'Keep walking.', set:['b8v2_walk','walk']},
         {t:'Stop, and look properly.', set:['b8v2_walk','look']}]},
    {txt:()=>`${S.f.b8v2_walk === 'look' ? `He stops, and looks properly, because someone should. It is the least he can give them, whoever they were. It is not much.` : `He keeps walking. If he stops they will all stop, and then they will have to decide something, and he is not ready to be the one who decides.`}

The voices come then, as they do when he is tired or afraid. The dead he carries have opinions about the fields. He doesn't answer them. He learned long ago not to answer them out loud.

Instead he thinks, as he has been thinking all down this road, about gods: how many there are, and how few of them are any use. If there is one true god, he decides, it is not any of the ones with temples. It is time. Time takes everything, and asks nobody's leave, and never once pretends to be kind.`},
    {txt:
`At the far side of the fields there is a town, or the start of one: new walls going up on old foundations, smoke, people at work. A man comes out to meet them on the road in a robe the colour of the leaves, smiling as if he had been told to.

He is a priest, and very glad to see them. Traders, he supposes, come from Black Coral to see the old cities rise. The towns of the Pannion are waking, he tells them, in a new age, and the fields feed them.

He talks of a god. A dying god, who gives. The fields are the god's gift. Everything here is the god's gift.`,
     ch:[{t:'"We are traders."', set:['b8v2_said','trade']},
         {t:'Let him think it.', set:['b8v2_said','quiet']}]},
    {go:'Walk on.', txt:()=>`${S.f.b8v2_said === 'trade' ? `"We are traders," Nimander says. It is the first lie he has told on this road. It will not be the last, and he finds he minds that more than the lie.` : `Nimander lets him think it. A priest who has already decided what you are saves you the trouble of saying.`}

The priest walks them to the edge of his town, talking all the way, and leaves them there with a blessing Nimander does not want and cannot give back.

From the next rise he looks back once. The green, and the poles, and the shapes on them, going on and on under the pale sky. Somewhere ahead is whatever all of this is feeding. He would like very much to turn aside before they find it.`},
    b8vEnd({
      tuft:() => `Tuft lets the card go. "Fields," she says. "East of here, on this road." She doesn't look out past the wagons. "Andii, a handful of them, young, and walking the way we're going." She wipes her palm on her knee. "We'll see that green, Sergeant. When we do, breathe through your sleeve."`,
      sohra:() => `Sohra sweeps the bones together. "Green that drinks," she says. "And young Andii walking through it, who did not like what they saw." She throws a pinch of something on the fire and watches it burn. "The bones say we walk the same road. Not on the same day."`,
      benna:() => `Old Benna puts the card down. "Scarecrows," she says. "Not the straw kind." She looks east past the wagons, then back at her own red hands. "I've washed for the dead before. Not that many. Never that many."`,
      other:(r, p) => `${r.name} lets the card go. "Fields of green," ${p.s} says, "fed on the dead. East, on this road."`})]},

  /* ---- Chapter 3: Black Coral. Outside the city, at the Great Barrow, a man who wore the Pannion's iron kneels and asks for nothing. ---- */
  b8v3:{book:'tth', ch:3, who:'The Seerdomin', where:'The Great Barrow', fig:'b8v_seerdomin', bg:'b8v_barrow', cap:'A long mound outside a city under a night that does not lift, heaped with offerings, and a big man on his knees a little apart from the rest.', steps:[
    {txt:
`He comes every day. That is the whole of it, and he does not pretend it is more.

Black Coral is behind him with its lamps lit at what ought to be noon. The night here does not lift; the city has stopped expecting it to. Ahead is the barrow, a long hill of earth raised over a man who took more sorrow into himself than any one man should, and did not give it back.

Pilgrims kneel all along its sides. The offerings are heaped against it: coins and trinkets, cloth and small carved things. The poorer the giver, he has noticed, the more the gift seems to cost.`},
    {txt:
`He was a Seerdomin once. He wore the Pannion's iron and did what the Pannion asked, and some of what it asked he will carry until he dies. He knows that. He does not come here to put it down.

He kneels where he always kneels, a little apart. He does not ask to be forgiven. Redemption, he has decided, is a dream for the deluded, and he has been a great many things but never that.

What he offers instead is what he has: his company. It is a poor gift, and he knows it. But the one under this hill took in more grief than anyone can count, and it seems to the Seerdomin that such a one must be very much alone in there.`,
     ch:[{t:'"I am here again."', set:['b8v3_pray','here']},
         {t:'Say it without words.', set:['b8v3_pray','silent']}]},
    {txt:()=>`${S.f.b8v3_pray === 'silent' ? `He says it without words, as he has most days. A soldier learns to report without opening his mouth.` : `"I am here again," he says, under his breath. It is not a prayer, quite. It is a soldier reporting for duty.`}

Then the other thing, the only thing he ever asks: peace for them. For the ones on their knees along the mound, come from every corner of the land with their offerings and their sickness and their hope. Let them have peace. Whatever else.

No answer comes. None ever has. He finds he doesn't mind. It was never the answer he came for.`},
    {txt:
`When he gets up there is a young woman in a priestess's plain robe standing between him and the road, as if she has been waiting for some while.

"Benighted," she says, and he stiffens, until he understands she means it kindly: it is a title, she tells him, and a mark of respect. The Redeemer has seen him here, she says, day after day. There is a thing to be done, and he has been chosen for it.`,
     ch:[{t:'"No."', set:['b8v3_no','no']},
         {t:'"Find someone else."', set:['b8v3_no','else']}]},
    {go:'Walk back.', txt:()=>`${S.f.b8v3_no === 'else' ? `"Find someone else," he says. "Anyone else."` : `"No," he says.`}

She does not argue. That is worse. She only looks at him with a young face that is far too sure of itself, and steps aside to let him by.

He walks back toward the city under the lamps. On either side of the road the pilgrims' camp spreads out, bigger every time he passes, and there is a sweet smell over parts of it now that he does not like.

Some stains, he thinks, never wash out. He believes it. He has built what is left of his life on believing it. He walks a little faster all the same.`},
    b8vEnd({
      tuft:() => `Tuft lets the card go. "The man on his knees at the barrow," she says. "Every day, and not asking for anything." She looks out of the window at the lamps, toward the barrow. "We stood there when they raised it, Sergeant. I never thought anyone would kneel to it like that."`,
      sohra:() => `Sohra sweeps the bones together. "A soldier of the Pannion," she says, "keeping company with the one under the hill, and not believing anything will come of it." She pinches the smoke out. "The bones believe it for him. He does not have to."`,
      benna:() => `Old Benna puts the card down. "Pannion," she says. "I'd know those shoulders anywhere. Washed enough of their blood out of our coats at Coral." She sniffs. "He's still wearing it. Under everything."`,
      other:(r, p) => `${r.name} lets the card go. "A man at the barrow," ${p.s} says, "asking for nothing for himself."`})]},

  /* ---- Chapter 4: Black Coral, another night. An Andii at a game in a tavern; his friend yields; a young woman from the camp comes in. ---- */
  b8v4:{book:'tth', ch:4, who:'Spinnock Durav', where:'A tavern in Black Coral', fig:'b8v_spinnock', bg:'b8v_tavern', cap:'A low tavern in Black Coral, a lamp on every table, a game board between two cups, and the door standing open on the night.', steps:[
    {txt:
`Spinnock Durav has been alive for a very long time, and has found that the trick of it is to have somewhere to be on certain evenings.

This is one. A tavern in the city, low-beamed, where the human drinkers have stopped staring at the Tiste Andii in the corner because he has been coming for so long. Across the board from him sits his friend: big, grey, careful, once a Seerdomin of the Pannion, who plays as if every piece were a soldier he would have to answer for.

Spinnock likes him. It surprised him, at first, how much.`},
    {txt:
`The city is changing, and he can watch it from the corner table. Kelyk has come into Black Coral like water into a hull, slow and then everywhere, and he has begun to see its stains on everything: on sleeves, at the corners of mouths, in the glaze of a man's eyes at the next table.

He moves a piece. His friend studies the board.`,
     ch:[{t:'Press the attack.', set:['b8v4_play','press']},
         {t:'Play it slow.', set:['b8v4_play','slow']}]},
    {txt:()=>`${S.f.b8v4_play === 'slow' ? `Spinnock plays it slow. They have all night, and he has had a great many nights, and has learned to spend them carefully.` : `Spinnock presses, because he is curious what the big man will do with a hard position. Usually something clever, and slow, and annoying.`}

Then his friend says, quietly, that he yields.

Spinnock looks at the board. The position was not lost. It was nowhere near lost. Three moves, four, and the Seerdomin would have had him, and they both know it.

"Why?" Spinnock asks.

His friend gives no reason. He only sits back and looks at the board as if it belonged to someone else.`},
    {txt:
`The door opens.

A young woman comes in from the street, slight, in plain pilgrim's clothes with the dust of the camp still on them, and comes straight to their table. She knows the big man; that much is plain from his face, which goes first white and then dark.

This is his refuge, he tells her. His one place. She should not have come here.

She does not leave. She waits, very calmly, for him to finish.`,
     ch:[{t:'Stay where you are.', set:['b8v4_go','stay']},
         {t:'Go and wait outside.', set:['b8v4_go','out']}]},
    {go:'Go out into the night.', txt:()=>`${S.f.b8v4_go === 'stay' ? `Spinnock means to stay. Then his friend looks at him, once, and Spinnock gets up and goes out, because that look was one soldier asking another for room.` : `Spinnock gets up and goes out to give them room. A friend should know when he has become furniture.`}

He waits in the street under the lamps, in the night that does not end.

After a while the door opens and she comes out alone. On her way past she looks up at him, briefly, as if she had known him a long while and was glad to find him unchanged, and then she goes on down the street toward the camp.

Something in Spinnock that has slept for a very long time opens one eye.

It surprises him so much that he almost laughs. He stands there in the lamplight feeling ridiculous, and old, and for the first time in longer than he can easily count, not bored at all.`},
    b8vEnd({
      tuft:() => `Tuft lets the card go. "An Andii in a tavern," she says, "and a man from the Pannion who gave a game away." She looks down the rows toward the sweet smell. "And a girl from this camp. From here." She puts the card face down on the mat. "He liked her. I don't think he meant to."`,
      sohra:() => `Sohra sweeps the bones together. "The tall dark one," she says, "older than the hills here, and tired of all of it. Then he was not tired." She almost smiles. "The bones like him. They do not like the smell in this camp."`,
      benna:() => `Old Benna puts the card down. "One of their Andii," she says, "sat in a tavern like a man." She shakes her head. "And some girl walks in off the road and he goes soft as wet bread. Older than the city." She sniffs. "They're all the same in the end, Sergeant."`,
      other:(r, p) => `${r.name} lets the card go. "An Andii at a game," ${p.s} says, "and a girl from this camp."`})]},

  /* ---- Chapter 5: the Lamatath. At a crossroads, four torches on poles and an Andii waiting; a tall old man comes out of the dark. ---- */
  b8v5:{book:'tth', ch:5, who:'Spinnock Durav', where:'A crossroads', fig:'b8v_spinnock', bg:'b8v_crossroads', cap:'A crossroads in open grass at night, four torches on tall poles at its corners, and a figure waiting where the roads meet.', steps:[
    {txt:
`Spinnock Durav has set four torches on tall poles at the corners of the crossroads, and lit them, so that whoever comes down the road will see him from far off and know that he is meant to be seen.

He was asked to come here, and wait. So he has come, and he waits.

The grass goes away on every side under the dark. The wind moves in it and nothing else does. He has brought a jug of wine, which seemed only courteous.`},
    {txt:
`The old man comes out of the dark on the far road a little after midnight.

He is tall, and grey, and walks like someone who has been walking since before there were roads. Plain armour, much mended. A great two-handed sword on his back. His face is the face of every king who outlived his kingdom, and he has outlived a good many.

He stops at the edge of the torchlight and looks at Spinnock, and at the torches, and Spinnock watches him understand all of it at once.`,
     ch:[{t:'Offer the wine.', set:['b8v5_wine','offer']},
         {t:'Hold the jug, and wait.', set:['b8v5_wine','wait']}]},
    {txt:()=>`${S.f.b8v5_wine === 'wait' ? `Spinnock holds the jug and waits. The old man looks at it, and at him, and Spinnock understands that no one will be drinking any wine tonight.` : `Spinnock holds out the jug. "It is a long road," he says. "Drink, at least." The old man looks at the jug for a while, and does not take it.`}

Then Spinnock tells him, gently, because there is no use in being anything else. The city is not for him. He cannot pass.

"Step aside," says the old man. It is not a threat. It is a tired man asking for a door to be held.`},
    {txt:
`He means it. Spinnock can see that he means it. He would walk round, if there were a way round; he would rather not do this. For a moment the old man tries every way there is not to do this, and Spinnock watches him try, and is sorry for him, a little.

There is no way round, and they both know it. In the end the old man reaches back over his shoulder, slowly, and draws.

Spinnock sets the jug down at the foot of a torch pole, where it will not be broken. Then he draws too.`,
     ch:[{t:'"I am sorry for this."', set:['b8v5_last','sorry']},
         {t:'Say nothing more.', set:['b8v5_last','none']}]},
    {go:'Look away.', txt:()=>`${S.f.b8v5_last === 'none' ? `Spinnock says nothing more. Everything that would make any difference has been said.` : `"I am sorry for this," Spinnock says, and is.`}

Four torches. Two shadows, long on the trampled grass. The wind has dropped.

The card shows no more than that: the old king's blade coming up, and the Andii stepping in to meet it, and the torchlight shaking on the poles.`},
    b8vEnd({
      tuft:() => `Tuft lets the card go, quickly. "Four torches on poles," she says, "where two roads cross. An Andii with a jug, and an old man with a sword as long as a door." She looks out across the grass, west, where the light is going. "That's not tonight. It's soon." She puts the deck away. "If we see those torches, Sergeant, we go round."`,
      sohra:() => `Sohra sweeps the bones together. "Four fires on sticks," she says, "and two old ones who did not want to fight, fighting." She looks into the grass a while. "The bones went still. They do not do that."`,
      benna:() => `Old Benna puts the card down and taps the old man with the sword. "Him," she says. "I saw that face once, at Pale, on the far side of the field." She pockets the copper. "The Andii's brave. Brave and stupid are cousins, Sergeant."`,
      other:(r, p) => `${r.name} lets the card go. "Four torches at a crossroads," ${p.s} says, "and two who did not want to fight."`})]},

  /* ---- Chapter 6: the Fete's last night. At a broken stretch of the wall, a giant tells a witch to build walls in her mind. ---- */
  b8v6:{book:'tth', ch:6, who:'Karsa Orlong', where:'The broken wall', fig:'b4_c7_karsa', bg:'b8v_wall', cap:'A city wall broken open at night, rubble down into the street, fires beyond it, and over everything the moon in pieces.', steps:[
    {txt:
`Karsa Orlong stands in the gap where the wall used to be, with rubble to his knees and the stone sword over his shoulder, and breathes in the city.

It smells of smoke. Of fear. Of a festival gone wrong in the middle of its last night, with the masks still on. Something with paws the size of shields came through this wall ahead of him, more than one of them, and the broken stone still remembers it.

Beside him, Samar Dev is holding her head in both hands.`},
    {txt:
`She is a witch of Ugarat, and clever, and she feels things he does not trouble to feel. Tonight that cleverness is hurting her. Something has come into the city. Not through the wall: into it, all at once and everywhere, like cold into a room when a door is opened. And it is pressing on her mind like a thumb on a bruise.

Karsa feels it too. It does not frighten him. Very little does. But he can see what it is doing to her.`,
     ch:[{t:'"Look at me, witch."', set:['b8v6_say','look']},
         {t:'Take her by the shoulder.', set:['b8v6_say','hold']}]},
    {txt:()=>`${S.f.b8v6_say === 'hold' ? `He takes her by the shoulder, which steadies her, mostly because it is like being held up by a building.` : `"Look at me, witch," he says. She does, after a moment, with tears running out of her eyes from the pressure.`}

Build walls, he tells her. In your mind. Stone on stone, the way his people build. Make them high, make them thick, and put the one who has arrived on the outside of them.

"It is not that simple," she says through her teeth.

"It is exactly that simple," says Karsa.`},
    {txt:
`She does it. He watches her face while she does: the jaw setting, the breathing slowing, the wall going up course by course behind her eyes. When it is done she lets go of her head, stands up straight, and swears at him comprehensively in three languages.

Karsa grins. He can still feel the one who has come, out there in the burning city, vast and cold and somehow blazing. Let it blaze. It has not come for him.

Ahead, the swordsman they have travelled with has already gone on into the streets without a word. He does that.`},
    {go:'Look up.', txt:
`They go after him. At the top of the rubble Samar Dev stops, and Karsa stops beside her, because she has looked up and made a small sound he has never heard her make.

The moon is in pieces.

Not cracked, not clouded. Broken, like a dropped plate, the pieces hanging apart from one another in the black with the light still coming off every one of them. As they watch, one piece begins, very slowly, to slide east.

"Well," says Karsa, after a while. "That is new."

Then he hitches up the stone sword and goes down into the city, and Samar Dev, because there is nothing else to be done, goes with him.`},
    b8vEnd({
      tuft:() => `Tuft lets the card go and looks straight up, past the lanterns, at the moon with the crack across it. "Tonight," she says. "In pieces." She puts the card face down on the step. "A giant in a broken wall, and a witch with him. Whatever came into the city with them, Sergeant, it isn't here for us. That's the only good news in it."`,
      sohra:() => `Sohra sweeps the bones together. "The moon," she says, "broken like a pot." She looks up at it, at the thin dark line across it, and away. "A giant at a broken wall, telling a witch to build walls of her own." She ties the pouch shut. "That is good advice. Take it, Sergeant."`,
      benna:() => `Old Benna puts the card down and looks up at the moon over the roofs. "Cracked tonight," she says. "Broken, that card says." She folds her arms. "I've seen a lot of nights I didn't like, Sergeant. I'll not pretend I like this one."`,
      other:(r, p) => `${r.name} lets the card go. "A giant at a broken wall," ${p.s} says, "and the moon in pieces. Tonight."`})]},

  /* ---- Chapter 7: the morning after. In a place that is ending, the dead stand in their lines under a lame captain. ---- */
  b8v7:{book:'tth', ch:7, who:'Iskar Jarak', where:'A place that is ending', fig:'b8v_iskar', bg:'b8v_dead', cap:'A grey plain going soft at its edges, a storm the colour of nothing on the far side of it, and coming across it in good order, an army of the dead.', steps:[
    {txt:
`Iskar Jarak walks at the head of the dead, and limps a little, because he limped before, and the dead keep what they were.

The ground under him is grey and cracked and going soft at the edges, like a page left out in the rain. The sky is worse. Over the far side of everything a storm is coming that has no colour and makes no sound, and where it passes there is nothing left at all. This place is ending. He was told so. He came anyway.

Behind him they come too. Thousands. Soldiers, all of them, from more wars than he has names for.`},
    {txt:
`No one ordered them here. He wants that clear, in his own head at least. They were asked, and they came of their own free will, every one, and he will not forget it.

At the point of the column, closest to him, walk his own. A company he led a long time ago and lost piece by piece, in tunnels under one city and on the walls of another. They march the way they always marched, as if the ground owed them money. Somebody at the back is complaining. Somebody always is. He would worry if they stopped.`,
     ch:[{t:'"Close it up back there."', set:['b8v7_order','close']},
         {t:'Let them complain.', set:['b8v7_order','let']}]},
    {txt:()=>`${S.f.b8v7_order === 'let' ? `He lets them complain. A soldier who has stopped complaining has stopped hoping, and he needs every scrap of hope these ones have left.` : `"Close it up back there," he says, not loudly. The complaining stops. The column closes up. Some things death doesn't change, and he is glad of every one of them.`}

On his left walks a big man in grey armour, the Grey Swords' old commander, Brukhalian, his face as calm as a field before harvest. They have not spoken much. They have not needed to. Each knows what the other is for.

Further back come the others: riders, marines, pikemen, men in armour nobody has forged in a thousand years.`},
    {txt:
`The storm reaches the far edge of the grey plain and does not stop.

He sets them in their lines. His own at the point, because that is where they have always been. Brukhalian's on a flank, because there is nothing anywhere that will move Brukhalian once he has decided to stand. The rest where they can do the most good and last the longest.

Then he walks the front of the line once, the way he used to before a fight, and stops at the end of it.

"Anything else," says Iskar Jarak, "ask it now."

No one does. They know him.`,
     ch:[{t:'"Hold."', set:['b8v7_word','hold']},
         {t:'"With me."', set:['b8v7_word','with']}]},
    {go:'Stand.', txt:()=>`${S.f.b8v7_word === 'with' ? `"With me," says Iskar Jarak, and all down the line, the dead come with him.` : `"Hold," says Iskar Jarak, and all down the line, the dead hold.`}

The storm comes in. The card shows no more than the first of it: grey light breaking on a line of shields, and the line not breaking. The very old dead, the ones with hardly anything left, go down like dry grass. Not his. His stand. Brukhalian, at the flank, does not move at all.

Somewhere a long way from here, in a city by a lake, the bells are beginning.`},
    b8vEnd({
      tuft:() => `Tuft lets the card go. For a while there is only the bells, all the way across the water. "That was him," she says at last. "Sergeant. You heard. That voice." She turns the card over, slowly, face down on the shingle. "Wherever they were, they stood. All of them." Her hands are cold.`,
      sohra:() => `Sohra sweeps the bones together, slowly. "The dead," she says, "in their lines, under a sky that was breaking. A lame man at the front." She listens to the bells. "You knew him, Sergeant. I saw it in your face." She closes her hand on the bones. Her hands are cold.`,
      benna:() => `Old Benna puts the card down and leaves her hand on it. "I washed his shirts," she says. "At Pale. Him and his lot, up out of the tunnels, mud to the eyebrows." She does not take the copper. "Still at the front, then." The bells go on. Her hands are cold.`,
      other:(r, p) => `${r.name} lets the card go. "The dead in their lines," ${p.s} says, "and a voice you knew, Sergeant."`})]},
});
