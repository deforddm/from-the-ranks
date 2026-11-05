/* ============ Book Three: Through the Deck, the seven visions of The Fair Exchange ============
   One per chapter, played when Book Three's reader (visReader(), 36b; Tuft, else Sohra, else Old Benna: 60) turns a card and looks into it.
   Each is a scene somewhere the Fourth cannot see, at the same point of the story, through the eyes of a canon character the squad never
   meets up close. Choices change words, never outcomes (S.f.b3v*_ keys; nothing else reads them). The last step of each is the reader,
   back at the Fourth's fire: its sp, fig and txt are getters/functions of visReader(), so visAgain (36b) still matches it on a replay.
   Canon basis: docs/moi-canon.md, "Visions". The darker material of Memories of Ice is headline only here, never detail. Backdrops are
   VISBG entries b3v_* and the new figures FIGX b3v_* (68b, which loads after this file; both are only read when a vision plays). */

/* ---------------- the reader, at the end of each vision ---------------- */
const b3vP = r => r.he ? {S:'He', s:'he', H:'His', h:'his'} : {S:'She', s:'she', H:'Her', h:'her'};
const b3vWho = r => ['tuft', 'sohra', 'benna'].includes(r.id) ? r.id : 'other';
const b3vFig = () => { const r = visReader(); return r.id === 'tuft' || r.id === 'sohra' ? r.id : r.id === 'benna' ? 'b3v_benna' : FIGX[r.id] ? r.id : r.he ? 'b3_c5_villager' : 'b3v_benna'; };
/* o = {tuft:(r, p) => text, sohra:..., benna:..., other:...}: Tuft, Sohra and Old Benna are 60's readers; other is the fallback */
const b3vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b3vFig(); }, bg:'b3deck',
  txt:() => { const r = visReader(), p = b3vP(r); return (o[b3vWho(r)] || o.other)(r, p); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: the parley at Pale. Far to the south-east, a caravan captain wakes under the wall of a river town. ---- */
  b3v1:{book:'moi', ch:1, who:'Gruntle', where:'Under Saltoan\'s Wall', fig:'b3v_gruntle', bg:'b3v_saltoan', cap:'A river town gone soft at the edges, a caravan camp under its wall, and the trader road going east.', steps:[
    {txt:
`Gruntle wakes under a wagon with his head full of last night's wine and the sound of somebody else's sword practice, and lies there a while deciding whether to be alive.

He is a caravan captain. He has spent his life walking beside other people's money, and he is good at it, when he is sober, which is often enough. This season the money is one man: a merchant called Keruli, soft-spoken, who pays well, asks little, and keeps the curtains of his carriage drawn on the brightest days.

The sword practice is Stonny Menackis, with her rapier, in the dew, killing a fence post with great precision. She has been killing it since dawn. She would like him to notice.`},
    {txt:
`Saltoan sits on its river like an old drunk on a bench: walls that were handsome once, gangs that own the streets after dark, and a harbour nobody dredges. Three nights the caravan has lain under its wall. In those three nights there have been killings in the lanes, and the town says strangers did them, as towns do.

Harllo is at the fire, burning the porridge and talking. Harllo is always talking. This morning it is the Domin, south and east, past the river: what the Seer's people do, what they are said to do, how many of them there are. He has heard it from a boatman, who heard it from a man who was there.

"Is it true, Captain?" says Harllo. "What they say they do?"`,
     ch:[{t:'"Shut up and eat."', set:['b3v1_said','eat']},
         {t:'"True enough. We\'re paid to go anyway."', set:['b3v1_said','paid']}]},
    {txt:()=>`${S.f.b3v1_said === 'paid' ? `"True enough," Gruntle says. "We're paid to go anyway." Harllo thinks about that, and nods, and eats, which is the thing Gruntle likes best about him.` : `"Shut up and eat," Gruntle says. Harllo eats, and goes on talking with his mouth full, which is about what Gruntle expected.`}

Then Keruli's driver comes for him. The merchant would like a word.

Inside the carriage it is dim and smells of oil and old paper. Keruli is a quiet man with a face that gives nothing away, the kind you forget while you are still looking at it. He asks about the road. Gruntle tells him: east along the trader road to the Catlin; a bridge that was there last year and may not be this year; a ford, and mud; Capustan on the far bank, and past Capustan, the Domin, which is the part of the map nobody has drawn lately.

"Roads remember the feet that walked them," says Keruli, as if that were an answer. "Some of them, Captain, remember a great deal."`,
     ch:[{t:'Ask him what he\'s carrying.', set:['b3v1_ask','ask']},
         {t:'Don\'t ask. You\'re paid not to.', set:['b3v1_ask','no']}]},
    {txt:()=>`${S.f.b3v1_ask === 'ask' ? `"What are you carrying, sir?" Gruntle says. Keruli smiles, very slightly. "Friends," he says. "Or I hope to be." Gruntle decides that is the last question he will ask this season.` : `Gruntle doesn't ask. A man who keeps his curtains drawn has a reason, and the reason is not Gruntle's business, and the business pays.`}

They are on the road by mid-morning. Stonny rides beside him and tells him he snores, and that Harllo cheats at dice, and that she means to be in Capustan before the month is out and drink something that has never seen a barrel in Saltoan. The wagons creak. The river goes along beside them, brown and full.

Then the people start coming the other way.`},
    {go:'East.', txt:
`Families, mostly. A cart with a grandmother on it, sitting very straight. Men with their tools on their backs. Children who don't look at the caravan at all. They come in ones and tens out of the east, walking west toward Saltoan and anywhere past it, and none of them stops to talk, and nobody needs to ask.

Gruntle counts his people without meaning to. Stonny, sour and splendid. Harllo, talking. The lads on the wagons. He has guarded a lot of roads. He has buried people on some of them, and liked most of them, and never once known ahead which.

He puts that away where he keeps it. He looks east. The sky over the east is a colour he doesn't like, and he looks at it anyway, because he is paid to.`},
    b3vEnd({
      tuft:() => `Tuft lets the card go. "A caravan," she says, "going east. Toward where we're going." She turns the card over and back, as if the people on the road might still be on it. "They were walking the other way, Sergeant. All of them." Her hands are cold.`,
      sohra:() => `Sohra sweeps the bones together with the side of her hand. "A man who walks beside other people's wagons," she says, "toward the river, and the city on it." She looks south-east, past the herds. "The bones liked him. They did not like his road." Her hands are cold.`,
      benna:() => `Old Benna puts the card down and wipes her fingers on her apron. "Caravan guard," she says. "Married one, once. Thirty years he walked beside other folks' goods, and came home every time, until he didn't." She sniffs. "That one's going the wrong way." Her hands are cold.`,
      other:(r, p) => `${r.name} lets the card go. "A caravan," ${p.s} says, "going east, toward the river. And everyone else coming the other way."`})]},

  /* ---- Chapter 2: the Rhivi Plain. North of Capustan, a Grey Sword patrol meets what has been leaving the strides in the grass. ---- */
  b3v2:{book:'moi', ch:2, who:'Itkovian', where:'North of Capustan', fig:'b3v_itkovian', bg:'b3v_capplain', cap:'Grey grass to every edge, a low sky, and a ridge with nothing on it yet.', steps:[
    {txt:
`Itkovian, Shield Anvil of the Grey Swords, rides at the head of sixty lancers a day north of Capustan, and listens to the silence where his god used to be.

Fener has fallen. Karnadas the Destriant says so, and Itkovian believes him, and the company rides on as it has always ridden, in good order, because order is what remains. He is the Shield Anvil. It is his to take into himself the pain of those who fall, so that they may go on without it. He has not yet asked where the pain goes, now that there is no god to give it to.

The grass is grey-green and wet. The sky sits low. Somewhere to the south, the Domin's army is coming up from the Catlin's far side, and the Mortal Sword wishes to know how fast.`},
    {txt:
`Sidlis, the outrider, comes back at a canter and holds his report until the horse has stopped. That tells Itkovian enough.

Tracks. He goes to see. In a hollow where the grass is long, a line of prints, each as long as a man's arm, three-toed, pressed deep and far apart, as if whatever made them had been running and saw no reason to stop. They are not fresh. They are not old. Around one of them the grass has gone grey and brittle, the way grass goes where something dead has stood.

"Sir," says Sidlis, very evenly. "What walks like that?"`,
     ch:[{t:'"Close the files. We go on."', set:['b3v2_order','on']},
         {t:'"Two riders to the Mortal Sword. Now."', set:['b3v2_order','send']}]},
    {txt:()=>`${S.f.b3v2_order === 'send' ? `Two riders go south at the gallop with the word for the Mortal Sword. Itkovian watches them out of sight. It is the right order. It does not help.` : `The files close. The company goes on, at a walk, lances up, in good order. He does not tell them what he thinks. He is not certain yet, and certainty is the only thing he has ever been able to give them.`}

It comes out of the long grass in the middle of the afternoon, and it is very fast.

Grey. Taller than a mounted man. Two legs and a long tail held straight out behind for balance, and where its hands should be, swords, long as a lance is long, part of it. It is dry, and old, and its eyes are dull, and it has been dead a great while and does not know it.

The first troopers to ride at it are not in their saddles any more. Itkovian does not let himself count them yet.

"Ropes," he says.`},
    {txt:
`The Grey Swords have trained for a great many things, and this was never one of them, and they do it anyway. Riders circle it, wide. Ropes go over its neck, its arms, its tail, and horses dig in against it, and it drags them, and more ropes go on, and then, slowly, the thing goes down into the grass like a felled tree, and the lances go in, again and again, until it stops.

Afterwards Itkovian walks among the fallen. He kneels by each of them, and takes what they cannot carry: the fear at the end, the pain, the last thought of home. It goes into him and stays. That is what he is for.

The survivors are watching him. They want something from him.`,
     ch:[{t:'"Their names will be said in Capustan. Every one."', set:['b3v2_word','names']},
         {t:'Say nothing. Let them see you stand.', set:['b3v2_word','stand']}]},
    {txt:()=>`${S.f.b3v2_word === 'stand' ? `He stands, and lets them see him standing, and that is enough to straighten their backs, for now.` : `"Their names will be said in Capustan," he tells them. "Every one." It is a small thing to promise. He has learned that small things are the ones that hold.`}

Then Sidlis says, "Sir," very quietly, and points to the ridge.

Four more. Standing along the skyline against the low grey sky, quite still, the way a heron stands at the edge of water. Then they come down the slope, and there is no going back to Capustan, and Itkovian knows it, and orders the line.

And the ground in front of the line begins to smoke.

Dust. It comes up out of the grass in a dozen places, in a hundred, and stands up, and is figures: shapes of hide and bone and old sinew, with swords of stone, by the hundred, between the Grey Swords and the dead things coming down the hill. They make no sound at all. They walk into the K'ell Hunters as if into a wind.`},
    {go:'Ride south.', txt:
`It is not quick. The stone swords break, and the figures that hold them break, more of them than Itkovian will ever be able to forget, and get up, some of them, and some do not. But at the end of it there are four grey shapes lying in the grass, and the dust is settling, and it is very quiet.

One of them comes to him. A tall thing of leather and bone, with a face like a dry riverbed and two pale points of light where its eyes were.

"I am Pran Chole," it says, "of the Kron. We are summoned, and pass by." It looks at the dead in the grass, his and its own, without anything that could be called expression. "These were old when we were young. Something has woken them."

"Then I thank you," says Itkovian, "and I am in your debt."

"No," says the Bonecaster. "You are going home to a siege. We have seen it." And it is dust, and gone.

He rides south, and the Grey Swords ride behind him in good order, and he carries what he carries, and on the southern horizon there is a brown smudge across the sky the width of the world.`},
    b3vEnd({
      tuft:() => `Tuft lets the card go. "They rope them," she says, and nods, filing it away. "That's how. Ropes." Then, more quietly: "He takes it into himself. The dying. All of it." She pulls her sleeve down over her fingers.`,
      sohra:() => `Sohra sweeps the bones together. "The grey runners," she says. "The ones that leave the dead grass." She is quiet for a moment. "And the dust that stood up. The herds' old stories say the dust walks, south of the river. I did not believe the stories."`,
      benna:() => `Old Benna puts the card down, face down. "Grey Swords," she says. "Mercenaries. Paid to hold a city, and holding it." She sniffs. "And something walked out of the grass at them that no copper ever paid for."`,
      other:(r, p) => `${r.name} lets the card go. "Something grey in the grass," ${p.s} says, "and dust that stood up and fought it." ${p.S} looks south, toward Capustan.`})]},

  /* ---- Chapter 3: Capustan, the night before the relief. On a roof inside the burning city, the Bridgeburners wait for morning. ---- */
  b3v3:{book:'moi', ch:3, who:'Picker', where:'A Roof in Capustan', fig:'b3v_picker', bg:'b3v_caproof', cap:'Domes against a red sky, smoke going up in pillars, and a flat roof with a stair-head and a lot of people on it.', steps:[
    {txt:
`Picker lies flat on a roof in the middle of Capustan with a crossbow under her chin and her back against a chimney, and the whole city is on fire, and her arms itch.

They came in at dusk, through the North Gate, which is not there any more. The sappers saw to that: a few of the good munitions, and the gate went up in pieces, and what was behind it went with it, and the Bridgeburners went through the smoke at a run into streets they had never seen, because that was the job. Then the streets filled up behind them, and in front of them, and here they are.

Up a stair, on a flat roof, with a door that holds, so far.`},
    {txt:
`The itch is the torcs. Two of them, bronze, on her upper arms, bought on the Divide road from a man who swore they came off. They didn't. They've been warm for days now. Tonight they're hot.

There are more people on the roof than Bridgeburners. A few Capan, townsmen with cudgels and a fire-bucket, who came up the stair ahead of them. And a big man with a short beard and two cutlasses, sitting with his back to the parapet, who came up the stair behind them, through whatever was on it, and has not said a word since.

There are stripes on him. Dark bars, across his cheeks and down his bare arms, like paint, except they aren't paint. His eyes, when the firelight catches them, are the colour of old amber.`,
     ch:[{t:'"Who in Hood\'s name are you?"', set:['b3v3_said','who']},
         {t:'"Nice cutlasses."', set:['b3v3_said','blades']}]},
    {txt:()=>`${S.f.b3v3_said === 'blades' ? `"Nice cutlasses," says Picker. He looks down at them as if he'd forgotten they were there.` : `"Who in Hood's name are you?" says Picker. He looks at her as if the question were a long way off.`}

"Caravan guard," he says at last. "Captain of one. Or I was." He frowns at his arms. "I don't know what I am now."

The torcs are burning. Picker hisses and pulls at the left one, out of habit, the way she's pulled at it every night since the Divide, and it slides down her arm and off her wrist as if it had never once been tight. The other follows. She sits there holding two warm rings of bronze and looking at a stranger with a tiger's stripes on him.

It isn't hard to work out. She holds them out. "Here," she says. "I think these are yours."

He takes them. He doesn't ask. Neither does she.`},
    {txt:
`The night goes on a long time.

Below, the streets are full. Not with soldiers. With people the Seer has driven ahead of his army, more of them than anyone could count, and Picker does not look over the edge more than she has to, and when she does, she doesn't look long. That is all she will ever say about the streets of Capustan, to anyone.

Twice they come up the stair. Twice the door holds, and the big man is there when it doesn't quite, with the cutlasses, moving like something that hunts. Spindle drops a sharper down the stairwell the second time, and swears afterwards, at length, about what he had been saving it for.

Somebody counts the quarrels left, out loud, and then stops counting out loud.`},
    {go:'Morning.', txt:
`At dawn the Barghast come.

Picker hears them before she sees them: a sound out of the north streets like surf, and then white faces, hundreds of them, painted for war, filling the lanes, coming through the city street by street. Whatever is in the streets runs, south and out, and the Barghast go after it.

From the roof she can see over the wall to the plain. The Pannion army is coming out of the southern gates, pushed, a whole army backing out of a city it thought it had taken. And on the hills to the north, in the grey light, there are standards. The Host's. Brood's. Lines of men coming down the slope to meet it in the open, with the sun behind them.

"Well," says Picker, to nobody, and then sits down, because her legs have decided it for her. "Look who turned up."

Beside her the big man is turning the torcs over in his hands, looking at the stripes on his arms. He is not looking at a gift. He is looking at news, and still deciding whether to believe it.`},
    b3vEnd({
      tuft:() => `Tuft lets the card go. "Bridgeburners," she says, and something in her face goes careful, the way it does at that word. "In the city all night, on a roof." She looks north-east, where the light is coming. "That's us on the hills, at the end. That's tomorrow."`,
      sohra:() => `Sohra sweeps the bones together. "A striped man," she says, "and a woman who gave him back what was his." She frowns at the smoke over the city. "The Tiger walked in Capustan tonight. The bones are sure."`,
      benna:() => `Old Benna puts the card down. "Bridgeburners," she says. "On a roof all night, waiting for the rest of us to turn up and take the credit." She almost smiles. "That's marines for you."`,
      other:(r, p) => `${r.name} lets the card go. "They held a roof all night," ${p.s} says, "and at dawn the white faces came, and we were on the hills."`})]},

  /* ---- Chapter 4: the prisoners. West of Capustan the Fourth watch dust stand on the horizon; under it, the Second Gathering. ---- */
  b3v4:{book:'moi', ch:4, who:'Kruppe', where:'The Second Gathering', fig:'kruppe', bg:'b3v_gathering', cap:'A shallow valley on a cold plain, the dust standing in it like smoke, and a small figure in red in the middle of it all.', steps:[
    {txt:
`Kruppe has been riding a borrowed mule for three days, and the mule and Kruppe have come to an understanding, which is that neither of them will mention the other's weight.

Ahead rides a child. Ten, perhaps, or older; it is hard to say, and gets harder by the week. A girl in red wool, on a Rhivi pony, who does not look back. Behind Kruppe ride two Malazan marines, women, quiet and watchful, who were sent to guard her and have plainly decided that guarding Kruppe is a separate duty for which they are not paid.

The plain is cold. Colder than it should be, this far into the year. Kruppe's breath smokes. He has not been warm since the second morning.

"Kruppe wonders," says Kruppe, to the back of the child's head, "whether one might know where we are going?"

"To witness," says Silverfox, without turning round. "Who else will witness it, if not you?"`},
    {txt:
`They come over a fold in the ground, and Kruppe stops.

The valley below is full. Not of men: of dust, standing in the air like smoke over a burned town, and in the dust, figures. Rows of them, ranks, clans, more than he can count and more beyond that. Short, broad, wrapped in rotted hide, with weapons of stone, and faces worn down to bone and leather by more years than Kruppe has the numbers for. They do not move. They have not moved for a very long time.

The T'lan Imass. Come to the summons of a child.

Silverfox rides down into them, and they part for her pony like grass. Kruppe follows, because a witness who stays on the ridge is not much of one. He finds he is very aware of the marines behind him, and grateful for them, and also that they cannot possibly help.`,
     ch:[{t:'Offer the nearest Imass a pastry.', set:['b3v4_kruppe','pastry']},
         {t:'Kruppe holds his tongue, for once.', set:['b3v4_kruppe','quiet']}]},
    {txt:()=>`${S.f.b3v4_kruppe === 'pastry' ? `Kruppe, from long habit, offers the nearest one a pastry from his sleeve. It regards the pastry for some time out of two pinpricks of light. Kruppe eats it himself, as a courtesy to them both.` : `Kruppe holds his tongue. It is not a thing he does often, and he is surprised at how loud the silence is when he does.`}

The child stops in the middle of them. A figure comes out of the ranks to meet her, and then another, and then a great many. Bonecasters, Kruppe thinks: their shamans, if dead things have shamans. They kneel.

He leans toward her. "Kruppe might advise, perhaps, a little gentleness…"

"No advice," says Silverfox. She is not looking at him. She is looking at them. "This is my Gathering, Kruppe. Leave me to it."

So he does.`},
    {txt:
`What they want is very simple. They have kept a Vow for longer than there have been cities, a war against an enemy long since dead, and they are tired. They have been summoned by a Bonecaster of flesh and blood, the first in an age of the world, and they ask her, all of them together, in one voice like wind over stones, to let them go.

"No," says Silverfox.

Kruppe has heard many sounds in his life. He has heard the Fete, and a dragon over Darujhistan, and a tyrant waking under a garden. He has never heard anything like the sound that goes up from that valley. It goes on a long time. He does not put his hands over his ears, because the child does not, and she is ten, or older.

When it is over, one clan withdraws its asking, very formally, and the dust begins to settle, and the ranks begin, one by one, to sink back into the ground they came out of.`},
    {go:'Ride back.', txt:
`They ride back in silence. The child in front, not looking round. Kruppe on his mule. The two marines behind, saying nothing, which Kruppe has come to think is their way of saying a great deal.

Kruppe thinks about the child. About the people said to look out of that small face: a Malazan sorceress who died on the plain in a pillar of fire, and an older dead woman, and the Rhivi girl who was going to be somebody else. He thinks it is too much to put into one child. He thinks nobody asked her.

On the second day they meet riders, coming out from the armies to look for them, and Kruppe hails them with the whole of his relief.

"By chance," he calls, "would you gentlemen be riding to our fair armies? Kruppe wonders if he might impose."

Behind him one of the marines laughs, once, quietly. It is the first sound either of them has made in three days. Kruppe treasures it.`},
    b3vEnd({
      tuft:() => `Tuft lets the card go. "That's the dust," she says, and points with her chin to the horizon, where it stands. "That's what's under it." She squares the cards against her knee. "She said no to all of them. She's ten."`,
      sohra:() => `Sohra sweeps the bones together and does not throw them again. "The Mhybe's daughter," she says. "The dead came to her across the whole world, and knelt, and asked, and she said no." She looks at the dust on the horizon. "The Rhivi will sing about this. I do not know yet what the song will say."`,
      benna:() => `Old Benna puts the card down. "Two of ours riding guard on her," she says. "Marines." She taps the card, once. "Nobody'll ever thank them. Nobody ever does." She smooths the cloth on the table flat.`,
      other:(r, p) => `${r.name} lets the card go. "The dead came," ${p.s} says, "and asked the child to let them go, and she said no." ${p.S} looks at the dust on the horizon.`})]},

  /* ---- Chapter 5: south of the Catlin. At Brood's fire, Kallor says out loud what the camp has been whispering. ---- */
  b3v5:{book:'moi', ch:5, who:'Korlat', where:'Brood\'s Fire', fig:'korlat', bg:'b3v_broodfire', cap:'A command fire on a stripped plain, hide tents beyond it, and a great deal of dark that one of them can see through.', steps:[
    {txt:
`Korlat sits at Brood's fire south of the Catlin, and watches the humans try to see one another's faces in the dark.

She sees them well enough. Tiste Andii were made for the night. Brood, enormous on his log, the hammer leaning beside him. Kallor, standing, because he will not sit at another man's fire. And across from her, his bad leg out straight before him as if it belonged to someone else, the Malazan, Whiskeyjack, whom she has been finding reasons to sit across from for some weeks now.

Her lord is elsewhere. She speaks for the Andii in his absence. Tonight she has not yet had to say anything, and would prefer to keep it so.`},
    {txt:
`Kallor is talking. Kallor is very good at talking. He was a king once, of somewhere that is not there any more, and he speaks to Brood the way one old king speaks to another, as if the rest of them were furniture.

The Malazans, he says, are marching on Coral for their Empire. The outlawing is a fiction, a story for children. Whoever holds Coral at the end holds the south, and Onearm knows it, and the Empress knows it, and only the warlord, it seems, does not.

He does not look at Whiskeyjack once while he says it. That is how Korlat knows it is meant for him.`,
     ch:[{t:'Speak: "My lord would want to hear this from you himself, Kallor."', set:['b3v5_said','lord']},
         {t:'Say nothing. Watch his hands.', set:['b3v5_said','hands']}]},
    {txt:()=>`${S.f.b3v5_said === 'lord' ? `"My lord would want to hear this from you himself, Kallor," she says, quite pleasantly. Kallor looks at her for the first time. It is not a look anyone would want twice. Then he goes on as if she had not spoken, which is its own answer.` : `She says nothing, and watches his hands. They are still. A man who lies with his mouth often tells the truth with his hands. Kallor's hands have been lying for longer than she has been alive.`}

When he is done Brood looks at Whiskeyjack. Only that.

Whiskeyjack shrugs, and it costs him something, with the leg. "We're marching on Coral," he says. "So are you. If you want to get there first, Warlord, I'd start walking." He waits. "That's all I've got. I'm a soldier. I leave the plotting to people with the time."

Brood makes a sound deep in his chest that might be a laugh, in a smaller man. "We march," he says. That is all.

Kallor goes. On his way out of the firelight his eyes go, just once, to the Rhivi tents, where the child sleeps. Korlat sees it. She is the only one who can.`},
    {txt:
`Later she walks the Malazan back toward his lines, because it is dark and he cannot see the ground, and because she wants to.

He limps. He tries not to, and it makes it worse. Every step costs him something he is pretending not to pay. She has watched men die of wounds for a very long time, and she knows the colour of the skin round this one, even by starlight, and she knows what it means.

"Let your healer see to it," she says. "Tonight."

"Mallet's away with the Bridgeburners," says Whiskeyjack. "After Coral."`,
     ch:[{t:'Insist.', set:['b3v5_leg','insist']},
         {t:'Let it be. He has decided.', set:['b3v5_leg','let']}]},
    {go:'Stand in the dark.', txt:()=>`${S.f.b3v5_leg === 'insist' ? `"Now," she says. "There are other healers." He stops, and looks at her, as if he could see her face. "After Coral," he says again, very gently, and that is the end of it, and she lets it be the end, because she has lived long enough to know a wall when she walks into one.` : `She lets it be. He has decided, and she has lived long enough among humans to know that they decide such things the way rivers decide where the sea is.`}

At the edge of the Malazan lines he thanks her, formally, the way he thanks everybody, and goes in among his soldiers, and she can see him for a long time after they can.

Korlat stands in the dark. Overhead something big and black goes across the stars with a raven's untidy wingbeat, south, toward Coral, toward her lord.

She thinks about how short their lives are. She thinks that she has never minded it before.`},
    b3vEnd({
      tuft:() => `Tuft lets the card go. "It's the old king saying it," she says. "Out loud, at Brood's own fire." She looks at the Host's lines, at the command tent where a lamp is still burning. "And the Commander's leg." She doesn't finish. She turns the lamp down instead.`,
      sohra:() => `Sohra sweeps the bones together. "The Andii woman," she says. "She sees in the dark. She saw him look at the child's tent." Her mouth goes thin. "I see in the dark too, when it is the Mhybe's daughter." She drops the bones in their pouch and pulls the cord tight.`,
      benna:() => `Old Benna puts the card down. "Leg," she says. "I've washed the shirts of a lot of men who said *after*." She folds her hands in her apron. "Somebody ought to sit on him."`,
      other:(r, p) => `${r.name} lets the card go. "The old king said it out loud," ${p.s} says, "at Brood's fire. And the Commander's leg is worse."`})]},

  /* ---- Chapter 6: the night lift. While the quorls carry the Host away in the dark, a man stands over the sea and looks at what lies under it. ---- */
  b3v6:{book:'moi', ch:6, who:'Anomander Rake', where:'Ortnal\'s Cut', fig:'rake', bg:'b3v_cut', cap:'A black headland over a black sea, stars, and something under the water that is darker than the water.', steps:[
    {txt:
`Anomander Rake stands on a headland of black rock above the sea with the wind in his hair and his sword on his back, and looks down into the water.

It is there. It has been there since he set it down. A darkness under the darkness, longer than a city, cracked and tilted on the bed of the Cut, the swell going over it as it goes over any reef. Moon's Spawn. His home, for longer than the humans have had a word for home. No light in it now. Fish swim through its halls.

He has been away from the war for a season. He has not been idle.`},
    {txt:
`Something lands on the rock beside him with a great deal of noise and no grace at all.

"My lord," says the Crone. "*My lord.* You will not believe the night I have had."

He has had this conversation with her a thousand times over a thousand years, and he lets her have it again. The armies are south of the Catlin, she says. Brood marches. Kallor whispers. The child is back from her Gathering and in a temper. And the Malazan, Onearm, is doing something very clever and very quiet with the Moranth and their insects, every night, and is telling nobody, not even Brood.`,
     ch:[{t:'"Let him."', set:['b3v6_said','let']},
         {t:'"Does Brood know?"', set:['b3v6_said','brood']}]},
    {txt:()=>`${S.f.b3v6_said === 'brood' ? `"Does Brood know?" he asks. "Brood," says the Crone, offended on the warlord's behalf, "knows everything he chooses to." Rake accepts that. It is, he reflects, the best description of Caladan Brood he has ever heard.` : `"Let him," says Rake. The Crone opens her beak to argue, and thinks better of it, which she does perhaps once a century.`}

He looks up.

Far off, inland, over the dark hills, the stars are going out and coming back in a long slow line, a little at a time, the way stars do when something passes in front of them. Many somethings. Flying low, north to south, toward the mountains above the city. One company a night, the Crone says. Whole companies, taken away in the dark from a road that will go on being marched by fewer and fewer men, at a predictable pace, for the Seer's spies to count.

Rake watches them pass. He has fought these soldiers for ten years. He finds, a little to his surprise, that he likes them.`},
    {txt:
`South along the coast, a few leagues off, Coral sits on its bay. He can feel it from here the way you feel a draught under a door: a cold, and something old in the cold that is not what it says it is, and under that, a long way down, something chained, that will not stop screaming.

On his back, in the sword, the chains answer. They always do.

"You have that look," says the Crone. "The one before you do something enormous."

He does not answer. He looks down into the water again, at the long dark shape on the bed of the Cut, and thinks that it has carried his people over half the world, and been hurt, and been sunk, and has one more thing still to do. One more. Then it can rest.`},
    {go:'Wait for dawn.', txt:
`The Crone goes, at last, in a clatter of wings, south, toward the warlord's fires with whatever she has decided to make of his silence.

Rake stays. The wind drops. The last of the lights crosses the stars inland and goes down behind the mountains, and the line does not come back.

He sits on the rock, his sword across his knees, the way he sat once on a temple roof over another city, and waits for the light, and listens to the sea go over the place where his home lies. In a few days he will need it.

Under the water, very faintly, a crack in the dark stone gleams, as if something in there had remembered how to hold a light.`},
    b3vEnd({
      tuft:() => `Tuft lets the card go, very slowly. "He's there," she says. "The Knight. At the edge of the sea, looking at something under the water." She turns the card face down, carefully. "It's the Spawn, Sergeant. That's what's under the water. It's been there all along."`,
      sohra:() => `Sohra sweeps the bones together. "The tall one with the sword," she says. "He watches the sky, and the sea, and he is not angry." She looks at the dark where the quorls go. "That frightens me more than if he were." She watches the fire's smoke go straight up into the dark.`,
      benna:() => `Old Benna puts the card down. "Him again," she says. "Stood over Pale, stood over Darujhistan, now he's stood over the sea." She shakes her head. "Whatever's under that water, I'd not want to be under it when it comes up."`,
      other:(r, p) => `${r.name} lets the card go. "He stands over the sea," ${p.s} says, "and watches our quorls go over, and waits."`})]},

  /* ---- Chapter 7: Coral. While the Fourth go to their own fight, the Bridgeburners go down out of the night sky into the city. ---- */
  b3v7:{book:'moi', ch:7, who:'Quick Ben', where:'Into Coral', fig:'qb', bg:'b3v_coral', cap:'A city on a bay at night, a black keep with cold light in its windows, and the wind of a quorl\'s wings.', steps:[
    {txt:
`Quick Ben rides behind a Black Moranth on the back of a quorl, a thousand feet above Coral in the dark, with the wind trying to pull his teeth out, and every one of the souls he carries agrees that this is a terrible idea.

He told them to be quiet. They aren't. They seldom are.

Around him in the night, the other quorls: the Bridgeburners, what's left of them, a soldier behind every rider, munitions strapped wherever munitions will strap. He can't see them. He can hear the wings. Behind them on the mountain, Dujek and the rest of the Host, dug into the cedars, waiting for the signal. Before them, the city, on its bay. And in the middle of the city, the keep.`},
    {txt:
`It sits on its rise like a black tooth. Cold light in its high windows, blue-white, not lamplight. He has spent two days on that mountain trading sorcery with the men in that keep, the Seer's mages, all grey and patience, and he knows the taste of what is inside it now. Ice. Old ice. And under the ice, faint and rotten, the same chained thing that has been poisoning every warren in the south.

Something comes up off the keep's towers. Big birds. Too big. Wrong in the way they fly, as if something else were moving their wings for them. The Moranth riders see them at the same moment, and the quorls tilt, and the Condors come up into the flight with a sound like tearing sailcloth.`,
     ch:[{t:'Burn them out of the sky.', set:['b3v7_fight','burn']},
         {t:'Hide the flight. Get down first, fight after.', set:['b3v7_fight','hide']}]},
    {txt:()=>`${S.f.b3v7_fight === 'hide' ? `He folds the dark round the flight like a cloak, as much of it as he can hold, and the Condors go through the place where the quorls were and find air. Not all of them. Enough.` : `He opens a warren, a little one, a door left ajar, and lets what is behind it out at the nearest Condor. It falls burning toward the bay. The thing that was riding it shrieks all the way down. There are more.`}

A quorl goes past him, falling, its wings gone wrong, its rider still holding the reins. He doesn't see where it lands. He doesn't look.

Then they are down. A street in Coral, close by the keep's wall, paving stones and shut doors and the wet smell of the sea, and the Bridgeburners coming off the quorls before the quorls have landed, the way they always do, as if gravity were a sergeant they had stopped listening to years ago. Picker shouting. The sappers already at the wall with their satchels.`},
    {txt:
`The Captain is beside him. Paran, grey-faced, sick the way he has been sick all summer, with something at his heel in the shadow of a doorway that might be a Hound if you looked straight at it, which Quick Ben doesn't. A Condor comes down out of the dark at them, and Paran turns to it with the shadow going ahead of him, and Quick Ben leaves him to it, because there isn't time for anything else.

The sappers run back. The wall goes up. Stone and dust and a noise like the end of the world, and when it settles, a hole in the keep of the Pannion Seer, and darkness inside it, and cold coming out of the darkness like breath.

He thinks, for no reason at all, of Whiskeyjack out on the hill with the rest of them, on that leg.`,
     ch:[{t:'"Don\'t die, Captain. It\'s untidy."', set:['b3v7_said','untidy']},
         {t:'Say nothing. Go.', set:['b3v7_said','go']}]},
    {go:'Go in.', txt:()=>`${S.f.b3v7_said === 'untidy' ? `"Don't die, Captain," he says over his shoulder. "It's untidy." Paran doesn't answer. Paran is busy. Quick Ben takes that as a promise.` : `He goes. There is nothing to say that every soldier in this street doesn't already know.`}

He stands at the edge of the breach and looks back once, up, past the roofs, out over the bay.

The stars over the sea are going out. Not a few at a time, the way they go behind a quorl. All of them, in a great black edge, moving inland, slow and enormous and silent, a mountain in the air.

Quick Ben grins in the dark. He can't help it.

Then he goes in.`},
    b3vEnd({
      tuft:() => `Tuft lets the card go. "Quick Ben," she says, and for a moment she almost smiles. Then she looks out toward the sea. "The stars were going out over the water, Sergeant. All of them." Her hands are cold.`,
      sohra:() => `Sohra sweeps the bones together, and her hands are not steady. "The little dark one with many souls," she says. "He went into the cold place. Something very big was coming in from the sea behind him." She closes her fist on the bones. "Today. It is all today." Her hands are cold.`,
      benna:() => `Old Benna puts the card down, and for once she doesn't say anything clever. "Bridgeburners," she says at last. "Going in first. Always first." She looks at the squad, one after another. "Go on, then. Your turn." Her hands are cold.`,
      other:(r, p) => `${r.name} lets the card go. "They came down out of the night into the city," ${p.s} says, "and something came in from the sea behind them."`})]},
});

/* ---- the glossary: two places only a vision shows ---- */
GLOSSX.moi.push(
  [1, 'Saltoan', 'A river city west of Capustan on the same trader road, gone to seed: handsome walls, gangs in the streets after dark, a harbour nobody dredges. Caravans bound east stop there.', ()=>!!(S && (S.seenVisions || []).includes('b3v1'))],
  [6, 'Ortnal\'s Cut', 'A stretch of deep water by Coral. The fishermen there have stopped putting out over it this year, and will not say why.', ()=>!!(S && (S.seenVisions || []).includes('b3v6'))],
);
