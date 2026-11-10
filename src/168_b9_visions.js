/* ============ Book Nine: the seven visions of Dust on the Boots ============
   One per chapter, played when Book Nine's reader turns a card or lays a tile and looks into it. Book Nine reads through each squad's own
   reader (160c, by b9As): the Third (chapters 1, 3, 5, 7) reads the Deck through Book Four's chain, Marrow, else Tallow, else the old
   marine of the heavies' lines; the Letherii (2, 4, 6) cast the Tiles through Book Five's, Perrit, else the tile-woman who rides the
   escort's supply train. visReader() (36b, wrapped by 160c) gives the right one, and 36b's visTiles() says "Through the Tiles" for the
   Letherii. Here the old marine is given his Book Nine name (below), so the closing step's speaker, 36b's replay line and the journal say
   "the old marine", never "of the 9th" (v12.0 notes).
   Each vision is a scene neither squad can stand in (dod-canon §4), through the eyes of a canon character neither squad speaks with.
   Choices change words, never outcomes (S.f.b9v*_ keys; nothing else reads them). The last step of each is the reader, back at the
   chapter's reading place (B9READ[n]): its sp, fig and txt are getters/functions of visReader(), so visAgain (36b) still matches it on a
   replay.
   How it hooks on: 21's card screen offers "✦ Look into the card" (or the tile) whenever visionFor(chapter, card) finds one (36b, by book
   'dod'); the vision comes back to b9_c<n>_card (36b's cardNodeName), whose one button goes to B9READ[n].back. No chapter file changes.
   Canon basis: docs/dod-canon.md §9, bound by §4, §5 (rules 84-97) and series-canon §(a). Vision 1 is the one place a card is dealt to
   anyone (rule 92): the Magus of Dark to Quick Ben, nothing to the Adjunct (WC3); the King's brother waits for his and the vision stops
   there, before the card, the Errant and the attack. Brys is never shown dead or waking (92) and nothing of his part in the battle (97).
   Koryk's fever is the army's, the cure the Letherii's (R11 S13). Aranict is "the Atri-Ceda". Keneb's ride stops at the Adjunct's
   summons; nothing of what she wants (55, 84) and nothing after (86). Henar's stories are folk-tale, naming no people (87). Gu'Rull is a
   hunter high over the field; never who sent him, never the Che'Malle, the Matron or Kalyth (88); the Nah'ruk are "the short-tails"; the
   field is headline (bones heaped, a crater, a charge broken, a trail away); no one on it is found (86).
   Backdrops are VISBG b9v_* and b9deck, the new figures FIGX b9v_* (168b, which loads after this file; both are read only when a vision
   plays). Notes: docs/dod-visions-notes.md. */

/* the old marine is Book Four's oldninth (70: "The old soldier"); in Book Nine he is the old marine of the heavies' lines */
{ const _vr = VISREADER; VISREADER = () => { const r = _vr ? _vr() : null; return r && b9On() && r.id === 'oldninth' ? Object.assign({}, r, {name:'The old marine', mid:'the old marine'}) : r; }; }

/* ---------------- the reader, at the end of each vision ---------------- */
const b9vP = r => r.he ? {S:'He', s:'he', H:'His', h:'his'} : {S:'She', s:'she', H:'Her', h:'her'};
const B9V_READERS = ['marrow', 'tallow', 'oldninth', 'perrit', 'tilewoman'];
const b9vWho = r => B9V_READERS.includes(r.id) ? r.id : 'other';
const b9vFig = () => { const r = visReader(); return ({marrow:'marrow', tallow:'tallow', oldninth:'b4v_oldninth', perrit:'perrit', tilewoman:'b5_c1_tilewoman'})[r.id] || (FIGX[r.id] ? r.id : r.he ? 'b4v_oldninth' : 'b5_c1_tilewoman'); };
/* o = {<reader id>:(r, p) => text, ..., other:...}: the chapter's squad's readers; other is the fallback */
const b9vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b9vFig(); }, bg:'b9deck',
  txt:() => { const r = visReader(), p = b9vP(r); return (o[b9vWho(r)] || o.other)(r, p); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: Letheras, the night the barracks emptied. In a room across the city, a sergeant of marines deals the Deck. ---- */
  b9v1:{book:'dod', ch:1, who:'Fiddler', where:'A room in Letheras', fig:'b7v_fiddler', bg:'b9v_reading', cap:'A low room at night, one lamp on a table, cards laid out on it in a cross, faces round it in the dark, and through the shutters a city where the dogs will not settle.', steps:[
    {txt:
`Fiddler sits at a table he didn't want, with a deck he didn't want to touch, in front of people he didn't ask.

The barracks emptied hours ago. Every soldier with sense found a reason to be somewhere else tonight: a tavern, a woman, a long walk to the far side of the river. Fiddler would like to be with them. He has done this before. He knows what the Deck is like when it has been kept waiting.

It has been kept waiting a long time.`},
    {txt:
`The lamp is the only light. Round the table, faces.

Quick Ben across from him, thin and dark and too interested. The Adjunct at the end, plain as a nail, her hands folded. A tall Letherii with a soldier's quiet, the King's brother, who came when he was asked and sat where he was put. Others along the wall, holding their breath and pretending not to.

The cards are warm. Cards should not be warm.`,
     ch:[{t:'Deal.', set:['b9v1_deal','deal']},
         {t:'Shuffle once more.', set:['b9v1_deal','shuffle']}]},
    {txt:()=>`${S.f.b9v1_deal === 'shuffle' ? `He shuffles once more, for luck, or for time. The deck doesn't care for it. A card tries to come out of the middle on its own, and he slaps it back, and the room hears him do it.` : `He deals. No ceremony. A sapper puts the charge where it goes and stands back.`}

The first one lands in front of Quick Ben. The Magus of Dark.

Fiddler names it, as a reader must. Quick Ben looks down at it and grins, and it is not a grin Fiddler likes. They have known each other a long time. It is a grin that says: well, of course.`},
    {txt:
`After that the cards come faster than his hands.

He names them as they land. He hears his own voice doing it, flat as a roll call, and somewhere under the floor and out past the shutters, the city starts to answer. Dogs, all at once, across every quarter. Then other things. Out there in the dark, things that were lying still are not lying still any more. He can feel it the way you feel a mine take before it goes.

He deals to the Adjunct's place. The deck gives her nothing. Not a card, not a blank. Nothing.

Fiddler keeps his face on the cards.`,
     ch:[{t:'Keep dealing.', set:['b9v1_stop','keep']},
         {t:'Try to stop.', set:['b9v1_stop','try']}]},
    {go:'Turn the next card.', txt:()=>`${S.f.b9v1_stop === 'try' ? `He tries to stop. His hands won't. Stopping now, some old part of him knows, would be worse than finishing: like pulling a fuse with the fire already in it.` : `He keeps dealing. There's no stopping a thing like this halfway. A sapper knows that better than anyone.`}

Far off across the roofs a long low sound rolls in, a roof going in somewhere, and the lamp leans with it, and the faces round the table lean too.

The King's brother sits very still, waiting for his.

Fiddler's hand is on the next card. The card shows no more than that: a sergeant's hand on the deck, a lamp leaning, and a city outside that will not lie down.`},
    b9vEnd({
      marrow:() => `Marrow lets the card go. "Tonight," she says. "Now, child. Across the city." She listens to the dark beyond the yard, where the dogs are still at it. "A sergeant of marines, dealing for the Adjunct, and the Deck all the way open." She lays the card face down on the kit-crate and keeps her palm on it. "That's what we felt. That's where everyone went to get away from." Her hands are cold.`,
      tallow:() => `Tallow puts the card face down on the crate. "Grandmother said a full reading wakes the drowned," he says. He looks toward the roofs, where the long sound came from. "I thought she meant it as a saying." He wraps the deck in its oilcloth, tight. "I'd stay in, Sergeant. All night. I'd stay right here."`,
      oldninth:() => `The old marine lets the card go and drinks. "Fiddler," he says. "Knew it'd be him. No one else in this army could hold the cards that long." He pours a finger more, slowly. "That's the whole Deck out, Sergeant, and the city hearing it." He tips the cup at the dark. "Stay in. I'm staying in."`,
      other:(r, p) => `${r.name} lets the card go. "A sergeant dealing the Deck," ${p.s} says, "across the city. Tonight."`})]},

  /* ---- Chapter 2: the night before the march. Alone in his tent outside the city, the Commander of the escort. ---- */
  b9v2:{book:'dod', ch:2, who:'Brys Beddict', where:'The Commander\'s tent', fig:'b9v_brys', bg:'b9v_tent', cap:'A plain field tent at night, a lamp on a camp table among folded maps, a sword in its scabbard against the pole, and outside the canvas the lights of an army asleep.', steps:[
    {txt:
`Brys Beddict sits alone in his tent the night before the march, with a lamp and the brigade lists, and does not sleep.

He has been reshaping an army. What the Edur left of it, and what the city left after that: regiments with no officers, officers with no regiments, men who served three masters in a year and expect a fourth. He has broken it down and put it back together, the way his old master of arms made him break down a cut and put it back, slow, a piece at a time.

It is better than it was. It is not yet anything.`},
    {txt:
`The Malazans laugh at his soldiers. He has heard them at it in the drill yards, the heavies with their wooden swords and their opinions, marching the Letherii until they fall down, and asking very politely where they were when the city was taken.

His officers want it stopped. Brys does not.

Let them be mocked, he thinks. Let his soldiers hate it. Hate is a thing an army can stand on, at the start, if it is pointed the right way. One day, if the gods are kind, the two of them will look round and find they have become one army without anyone deciding it.`,
     ch:[{t:'Read the lists again.', set:['b9v2_list','again']},
         {t:'Put the lists away.', set:['b9v2_list','away']}]},
    {txt:()=>`${S.f.b9v2_list === 'again' ? `He reads the lists again. Names and numbers, brigade by brigade, the carters and cooks of the train at the bottom in a clerk's small hand. He knows a fair number of them now. He means to know more before this is over.` : `He puts the lists away. He knows what is in them. Reading them a fifth time will not put one more barrel of water on a wagon.`}

The march frightens him a little, and he is honest enough to say so to himself. East, into the Wastes, where no Letherii army has gone and come back to talk about it. Thin water. Thin game. Old stories, and nobody left who knows which of them are true.

Something else, too, which he has been noticing lately. He is further from people than he used to be. Not colder. Further. He notices it the way a swordsman notices a change in his own footwork: without alarm, and without being able to leave it alone.`},
    {txt:
`Outside, the camp. A cook-pot being scoured. A soldier singing, badly, a song about a girl in Fent Reach. A sentry's challenge, and the tired answer.

His brother would make a joke of all this. His brother makes a joke of everything, and means every one of them, and has given Brys an army and a road east and a hand on the shoulder at the gate, and not one word of advice. Brys has decided to take that as a compliment.`,
     ch:[{t:'Go out among them.', set:['b9v2_out','out']},
         {t:'Stay in.', set:['b9v2_out','in']}]},
    {go:'Put out the lamp.', txt:()=>`${S.f.b9v2_out === 'out' ? `He goes out among them for a while, without his cloak, so that he is only a tall man walking. At one fire they offer him tea before they see who he is, and keep offering it after. He drinks it. It is terrible. He thanks them, and means it.` : `He stays in. They have a long road tomorrow and do not need their Commander standing over their fires tonight.`}

Back at the table he turns the lamp down and sits a moment in the dark with his hands on his knees.

An army is a promise, he thinks. Every man in it made one, and so did he. Tomorrow they begin keeping them.

He puts out the lamp.`},
    b9vEnd({
      perrit:() => `Perrit turns the tile face down. "The Commander," she says. "Alone, in his tent, the night before we go." She squares the tile with the edge of the tailboard, exactly. "He is not afraid of the Malazans laughing at us, Sergeant. He wants them to." She looks along the loaded wagons. "The school would call that a sum. I think it is a good one." Her hands are cold.`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "The tall one," she says, and spits to one side, for manners. "Sat up all night with his lists like a clerk." She tucks the tile away in its cloth. "Drank bad tea with some lads at a fire, didn't he. That's a good sign in a commander, soldier. The bad tea." Her hands are cold.`,
      other:(r, p) => `${r.name} turns the tile face down. "The Commander in his tent," ${p.s} says, "the night before the march."`})]},

  /* ---- Chapter 3: the road east. In a fever-cart up the column, a marine who hates being carried, and the cure that works. ---- */
  b9v3:{book:'dod', ch:3, who:'Koryk', where:'A fever-cart on the road east', fig:'b9v_koryk', bg:'b9v_carts', cap:'A line of open carts on a dusty road east, the sick laid in them under blankets, the column going on ahead in its own dust, and the last farms falling away behind.', steps:[
    {txt:
`Koryk lies in the bed of a cart with his teeth chattering and the sun in his eyes, and hates every part of it.

Half the army has this fever. That is no comfort. He is a big man and a strong one, and the fever has made him into a sack of wet sand that shakes. The finger bones knotted into his belt and his hair rattle every time the cart hits a rut, which is always. It sounds like somebody laughing at him.

He would rather walk. He tried. He got about eleven steps.`},
    {txt:
`Smiles walks beside the cart, in no hurry, with the expression of a woman who has found the day's entertainment.

She tells him he looks terrible. She tells him the rest of the squad is taking bets on whether he lasts to the Wastes, and what the odds are, and who has his boots if he doesn't. She tells him all this kindly, which is the worst part.`,
     ch:[{t:'"Go away."', set:['b9v3_smiles','away']},
         {t:'"Water."', set:['b9v3_smiles','water']}]},
    {txt:()=>`${S.f.b9v3_smiles === 'water' ? `"Water," he says. She looks at him a moment, and the smile goes away, and she gives him her own skin. It is warm and tastes of leather, and he drinks half of it before she takes it back.` : `"Go away," he tells her. She doesn't. She walks beside the cart for another mile, humming, so that he knows she isn't going anywhere.`}

At dusk the carts stop and a Letherii healer comes down the line with a bucket and a ladle. A grey woman in an apron, with the Commander's order behind her and no patience for anybody's pride.

Boiled water, she says, with salt in it, and something bitter she doesn't name. All of it. Every ladle. And again at midnight, and again at dawn.

Koryk drinks it because he is too weak to argue.`},
    {txt:
`At dawn he wakes, and the sky is the right colour, and the cart is not moving under him.

He sits up. His head stays where he left it. The shaking has gone out of his hands. All down the line men are sitting up in the carts and looking at their own hands the same way, as if someone had given them back.

Bottle comes along the carts with his hands in his pockets and sits on the tail of Koryk's, swinging his feet. The squad mage. Young, and odd, and always knowing things he shouldn't.

Fid's got that look, Bottle says. The one he gets. He thinks there's a bad fight coming, somewhere out there.`,
     ch:[{t:'"When?"', set:['b9v3_when','when']},
         {t:'"Good."', set:['b9v3_when','good']}]},
    {go:'Get down and walk.', txt:()=>`${S.f.b9v3_when === 'good' ? `"Good," says Koryk. Bottle looks at him sideways, the way you look at a man still a little feverish, and doesn't argue.` : `"When?" Koryk asks. Bottle shrugs. Fid doesn't know when. Fid never knows when. He just gets the look.`}

Koryk climbs down out of the cart. His legs hold. Up the road the column is moving off into its own dust, east, with the last farms falling away behind it and nothing much ahead.

He picks up his kit, which someone has been carrying for him, and shoulders it, and starts walking. He is not going to ask who.`},
    b9vEnd({
      marrow:() => `Marrow lets the card go. "The same fever," she says. "Up the column, in the marines' carts." She looks along the sick laid out by the stone, at the skins and the boiling pots. "And the Letherii cure. It took, child. All down the line." She lays the card face down. "Keep them drinking. All night. That's the whole of the reading."`,
      tallow:() => `Tallow puts the card face down. "A marine in a cart," he says, "and a healer with a ladle." He looks at the brown water in the pot, beginning to boil. "Grandmother said salt in the water for the shakes. I thought she meant for the taste." He feeds the fire. "It works, Sergeant. The card says it works."`,
      oldninth:() => `The old marine lets the card go and drinks, from the boiled pot this time. "Koryk," he says. "Fiddler's lot. Big lad, bones in his hair." He wipes his mouth. "Up and walking by morning, him and all his cart." He looks east. "And Fiddler with the look. Don't like that part, Sergeant."`,
      other:(r, p) => `${r.name} lets the card go. "A marine with the fever," ${p.s} says, "and the cure that works."`})]},

  /* ---- Chapter 4: the escort's camp in the Wastes. Beside the Commander as he walks the lines at night, the Atri-Ceda. ---- */
  b9v4:{book:'dod', ch:4, who:'Aranict', where:'The escort\'s camp', fig:'b9v_aranict', bg:'b9v_lines', cap:'Rows of tents on a dark plain, small dung-fires at the ends of the rows, sentries leaning on spears, and two figures walking slowly between the lines, one with a thread of smoke going up.', steps:[
    {txt:
`Aranict walks beside the Commander through the escort's lines at night, a stick of rustleaf between her fingers, and lets him talk.

She is the Atri-Ceda. It is a large title for what she can do out here, which is less every night. The Holds are a long way down in the Wastes. She reaches for them the way you reach for a stair in the dark and find it a step lower than it was, and then lower again.

She has told no one how much lower. She is telling no one now.`},
    {txt:
`He stops at every fire. Not long. A word, a name if he has it, a question about boots or water or someone's brother in another brigade. The soldiers stand up, and then, when he waves them down, sit, and look at each other after he has gone.

Between fires he talks to her, low, as if thinking aloud. Every soldier needs a stone to stand on, he says. A stone of loyalty. To his brigade, his friend, his sergeant, his own pride, it hardly matters which. Something under his feet that won't move when the ground does.`,
     ch:[{t:'Ask him what his is.', set:['b9v4_ask','ask']},
         {t:'Smoke, and listen.', set:['b9v4_ask','listen']}]},
    {txt:()=>`${S.f.b9v4_ask === 'ask' ? `"And yours?" she asks. He thinks about it, seriously, the way he thinks about everything, for the length of three tents. Then he says he will tell her when he finds it. She cannot tell if it is a joke.` : `She smokes, and listens. He does not need answering. He needs someone beside him while he works it out, and she has found that she does not mind being that.`}

At one fire the talk stops when they come up, and doesn't start again quickly enough. A soldier is frightened, and too proud to say so, and his friends have been feeding it.

The foreigners' mages have fallen, the soldier says at last. Everybody knows it. The Malazans' own mages, gone sick and quiet, and if theirs have gone, what about ours.`},
    {txt:
`The Commander answers him. Aranict hardly hears what he says. She is watching his face in the firelight, the way it goes still and kind and very attentive, and she is thinking something she has been thinking for some weeks now, and has decided not to think.

It is not a good time. There is no good time on a road like this. She knows exactly how foolish it is, and she is not a foolish woman, and none of that has helped at all.`,
     ch:[{t:'Say it.', set:['b9v4_say','say']},
         {t:'Not tonight.', set:['b9v4_say','not']}]},
    {go:'Walk on.', txt:()=>`${S.f.b9v4_say === 'say' ? `When they walk on she opens her mouth to say it, and what comes out is something about the water barrels on the third wagon. He agrees that it is a problem. She agrees that he agrees. It is not her finest hour.` : `Not tonight. She lights another stick from the end of the last and walks on beside him.`}

At the end of the lines the camp stops and the dark begins, all of it, the whole width of the Wastes. He stands looking out at it a while. So does she.

The soldier at the fire behind them is laughing now, at something one of his friends said. The Commander hears it, and almost smiles. She sees that too.`},
    b9vEnd({
      perrit:() => `Perrit turns the tile face down, and keeps her hand on it. "The Atri-Ceda," she says. "Walking the lines tonight, beside the Commander." She glances along the wagons toward the brigades' fires. "She feels the Holds going down, Sergeant, the same as I do. Further than I do." A breath. "She has told no one. I will not either."`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "The Atri-Ceda," she says, "smoking like a chimney, and walking beside him all night." She spits to one side, for manners. "And not a word out of her about it, soldier. Not one." She folds the tile into its cloth. "Some things the tiles show you that are none of your business. This is one."`,
      other:(r, p) => `${r.name} turns the tile face down. "The Atri-Ceda walking the lines," ${p.s} says, "beside the Commander, tonight."`})]},

  /* ---- Chapter 5: deep in the Wastes. A Fist rides out alone to look at the country, until the Adjunct sends for him. ---- */
  b9v5:{book:'dod', ch:5, who:'Keneb', where:'A rise in the Wastes', fig:'keneb', bg:'b9v_rise', cap:'A low rise on a pale empty plain under a high white sky, a horse cropping thin grass, and far behind it the dust of an army on the march.', steps:[
    {txt:
`Fist Keneb rides out from the column alone, because he wants to look at the country, and because for an hour nobody can ask him anything.

The Wastes go on. Pale ground, pale grass, a sky so high and white it hurts to look into. Behind him the army's dust stands up off the plain like a wall. Ahead of him there is nothing at all, and he rides toward it at a walk.

He has been a soldier a long time. He has never seen country so empty that it seemed to be waiting.`},
    {txt:
`He counts, because counting is what he does when he is worried, and he is always worried.

Blistig will not fight her openly. Blistig will only let the doubt run downhill through his officers, like water finding its way, and call it honesty. That is one.

He himself cannot tell the soldiers what the Adjunct wants, because he does not know. That is two. He has stopped expecting to be told.

And the boy has gone off on his own, the boy he took in, and Keneb lets himself think about that for exactly as long as it takes the horse to climb the next rise. Then he puts it away.`,
     ch:[{t:'Ride on.', set:['b9v5_ride','on']},
         {t:'Stop here.', set:['b9v5_ride','stop']}]},
    {txt:()=>`${S.f.b9v5_ride === 'on' ? `He rides on to the next rise, and the one after, because each looks as if it might show him something. None does. At the third he gives up and gets down.` : `He stops at the top of the rise and gets down, to give the horse a rest it hasn't earned and himself one he has.`}

The horse crops at the thin grass. Far off to the south a line of dark shapes moves along a fold in the ground: bhederin, a few of them, more than he expected and fewer than he'd like.

The wind blows. There is no other sound. He finds he is holding his breath, and lets it go.`},
    {txt:
`Then dust, coming from the column. A single rider, riding hard.

Keneb watches it come for a while before he admits to himself what it is. A runner from the Adjunct's command, a young woman on a tired horse, pulling up a polite distance off and saluting.

The Adjunct asks for the Fist, she says. At his convenience. Which means now.`,
     ch:[{t:'"Tell her I\'m coming."', set:['b9v5_back','coming']},
         {t:'Take one more look first.', set:['b9v5_back','look']}]},
    {go:'Ride back.', txt:()=>`${S.f.b9v5_back === 'look' ? `He takes one more look first. The runner waits. The plain waits. It is the kind of country that will wait for anyone, he thinks, for as long as it takes.` : `"Tell her I'm coming," Keneb says. The runner wheels and goes, and her dust goes after her.`}

He gets back into the saddle, stiffly, and turns the horse's head toward the army.

The card shows no more than that: a Fist riding back to his column, a long way out on an empty plain, at a walk that is not quite as quick as it ought to be.`},
    b9vEnd({
      marrow:() => `Marrow lets the card go. "The Fist," she says. "Fist Keneb, out on his own, looking at all this." She looks round at the bare ground, the low fire, the dark on every side. "Counting what he can't fix, child. I know that face." She lays the card down in the dust. "And then the Adjunct sends for him, and he goes."`,
      tallow:() => `Tallow puts the card face down on the bare ground. "That was the Fist," he says. "Riding out to look at it." He looks east, where there is nothing to see. "Grandmother said you look at the sea before you go out on it. So it knows you've seen it." He pauses. "I don't think this place cares who looks at it, Sergeant."`,
      oldninth:() => `The old marine lets the card go. "Keneb," he says, and drinks, and is quiet a while. "Fist's got the whole army on his back and Blistig sitting on top of it." He turns the cup in his hands. "Rides out to breathe. Can't blame him." He holds the cup out to the dark, a little, and then drinks it himself.`,
      other:(r, p) => `${r.name} lets the card go. "The Fist riding out alone," ${p.s} says, "until the Adjunct sends for him."`})]},

  /* ---- Chapter 6: the night before the battle. The tallest soldier in the escort is called to the Commander's tent and asked for stories. ---- */
  b9v6:{book:'dod', ch:6, who:'Henar Vygulf', where:'The Commander\'s tent', fig:'b9v_henar', bg:'b9v_stories', cap:'The Commander\'s tent at night, a lamp low on the camp table, a woman smoking in the corner, and a very tall soldier bent nearly double under the ridge-pole.', steps:[
    {txt:
`Henar Vygulf is the tallest soldier in the escort, and the Commander's tent was not made for him.

He ducks at the flap and still catches the ridge-pole with the top of his head, and the whole tent shivers, and the lamp on the table swings. No one laughs. He would rather they had.

He has been sent for at night, by name, to the Commander. He has spent the walk over going through everything he might have done. It is a long list. None of it seemed worth this.`},
    {txt:
`The Commander is sitting at the table in his shirt, with no papers in front of him. In the corner the Atri-Ceda sits on a camp stool with a stick of rustleaf, watching, the smoke going up straight.

Sit, the Commander says. Henar folds himself onto a stool that is much too low.

Then the Commander asks him a strange thing. Not about the march. Not about his brigade. About stories. The old stories of the Wastes, the ones grandmothers tell, the ones nobody believes. He has been asking soldiers all down the column, he says. Someone said Henar's family had a good many.`,
     ch:[{t:'Tell the one about the wind.', set:['b9v6_tale','wind']},
         {t:'Say you know none worth hearing.', set:['b9v6_tale','none']}]},
    {txt:()=>`${S.f.b9v6_tale === 'none' ? `"None worth hearing, sir," Henar says. The Commander waits. He has a way of waiting. In the end Henar tells him the one about the wind anyway, because it is easier than sitting in that silence.` : `Henar tells the one about the wind, because it was his grandmother's favourite, and because it is the first one that comes.`}

The wind in the Wastes knows your name, the story goes, and calls it after dark in your mother's voice. You never answer. You never sleep with your feet to the east. Out there the land was something else once, before it was empty, and the something is not all the way gone.

He tells two more. They are worse. He has never said them aloud in front of an officer, and they sound thinner here, and older.

The Commander listens to all of it very carefully, and asks small careful questions, and writes nothing down.`},
    {txt:
`When it is done the Commander sits back.

He thanks Henar. He means it; Henar can hear that he means it, which is unsettling in an officer. Then he says, in the same voice, that Henar is promoted.

Henar is so surprised that he does not properly hear to what. Something with more men under it than he has now. The Atri-Ceda, in her corner, blows out a long thread of smoke and looks at the roof of the tent.`,
     ch:[{t:'"Sir."', set:['b9v6_sir','sir']},
         {t:'Ask why.', set:['b9v6_sir','why']}]},
    {go:'Duck out.', txt:()=>`${S.f.b9v6_sir === 'why' ? `"Why, sir?" he asks, before he can stop himself. The Commander considers this. "Because you came when you were sent for," he says, "and told me the truth, and did not pretend the stories were silly." That seems to be the whole answer.` : `"Sir," says Henar, which is all he can find. It seems to be enough.`}

He gets up. He hits the ridge-pole again on the way out. This time the Atri-Ceda laughs, quietly, and so after a moment does the Commander.

Outside the night is huge and cold and full of stars, and the escort asleep in its rows, and far off in the dark to the north, though Henar does not know it yet, something is already coming.`},
    b9vEnd({
      perrit:() => `Perrit turns the tile face down, quickly, and presses it flat against the shield. "Last night," she says. "In the Commander's tent. A soldier telling him the old stories." She looks north, at the brown smear on the sky, and away. "The Commander was listening for something in them, Sergeant. I do not know what." Her voice stays level. "Whatever it was, it is coming." Her hands are cold.`,
      tilewoman:() => `The tile-woman puts her hand flat over the tile and leaves it there. "The wind that knows your name," she says. "My mother told that one." She does not spit. She looks north, where the dust is. "Feet to the west tonight, soldier, if there's a tonight. I mean it." She folds the tile away. "Dock's paid. Go and stand where they put you." Her hands are cold.`,
      other:(r, p) => `${r.name} turns the tile face down. "A soldier telling the Commander old stories," ${p.s} says, "last night."`})]},

  /* ---- Chapter 7: after. High over the field when the short-tails are gone, a hunter on the wind, looking down. ---- */
  b9v7:{book:'dod', ch:7, who:'Gu\'Rull', where:'High over the plain', fig:'b9v_gurull', bg:'b9v_field', cap:'A plain seen from very high up, pale and wide, a dark ring pressed into it, something white heaped near its middle, and a broad scuffed trail going away across it to the edge of sight.', steps:[
    {txt:
`Gu'Rull rides the cold air higher than any bird, so high the plain below is a pale cloth with marks on it, and the wind up here has no smell at all.

He has come a long way to look at this. He looks at most things from up here. It is the only distance at which most things are worth looking at.

The short-tails have gone. Their great dust has moved on and away, and the plain they fought on lies open under the sky for anyone who cares to see it.`},
    {txt:
`He circles once, wide, and reads the field as a hunter reads a kill.

A heap of something white near the middle, white even from here. Bones, picked clean already, heaped where they fell on each other. Near it, a great dark ring pressed into the ground, black at the rim, as if a fist had come down out of the sky and struck the plain.

He does not know what made it. He finds that he would like to.`,
     ch:[{t:'Go lower.', set:['b9v7_low','low']},
         {t:'Stay high.', set:['b9v7_low','high']}]},
    {txt:()=>`${S.f.b9v7_low === 'low' ? `He goes lower, slowly, in long falling turns, until the marks on the cloth become things, and the things become what they were.` : `He stays high. From up here the field keeps its shape. Lower down it would only be wreckage, and wreckage tells you less than shape does.`}

Out on one flank, a long spray of dark shapes where a charge of horsemen went in, late and fast, and did not come out. Horses and riders lie along it in a fan, the way a wave leaves weed on a beach.

Brave, he thinks. Stupid, and brave. The two are often found together among the soft ones.`},
    {txt:
`And then the thing he came to see, though he did not know it until now.

A trail. Wide, untidy, scuffed into the pale ground by a great many feet, going away across the plain to the edge of sight. Wagons in it, some. Litters. The marks of those who carried and those who were carried.

They were beaten here. He can read that plainly. They were broken and driven and they bled. And then the ones who were left picked up the ones who could not walk, and turned, and walked away.

The short-tails who stayed to stop them are the bones.`,
     ch:[{t:'Follow the trail.', set:['b9v7_trail','follow']},
         {t:'Hold where you are.', set:['b9v7_trail','hold']}]},
    {go:'Climb.', txt:()=>`${S.f.b9v7_trail === 'follow' ? `He follows the trail a while, high and slow, a shadow nobody below will ever see, until it bends out of the country he came to look at.` : `He holds where he is, riding the same slow circle over the field, and looks at the trail until he has it by heart.`}

He had thought them soft. He had thought them small, quarrelling, short-lived things, that break when you look at them hard.

He climbs back into the cold, where the wind has no smell, and finds that something has changed in him and will not change back.

No one saw them do it. Now someone has.`},
    b9vEnd({
      marrow:() => `Marrow lets the card go. "After," she says. "Not tonight. Days after, child." She looks out past the burning wagons, into the dark where the short-tails are. "Something up very high, looking down at this place when it's empty." She lays the card face down on the ground, slowly. "It saw a trail. A lot of feet, walking away from here." She keeps her palm flat on the card. "That's us, child. Some of us. Walking." Her hands are cold.`,
      tallow:() => `Tallow puts the card face down. "A bird," he says. "Or something like a bird. Very high." He looks up, at the smoke going over the wagons. "Grandmother said the gulls know where the boats come in before the boats do." He swallows. "It saw a trail going away from here, Sergeant. It saw people walk out."`,
      oldninth:() => `The old marine lets the card go and turns his empty cup upside down on the ground. "After," he says. "Something up high, looking at what's left." He looks along the line at the shields in the wagon-light. "Saw us walk out. Some of us." He rights the cup again. "That's the only reading I want. Back on your feet, Sergeant."`,
      other:(r, p) => `${r.name} lets the card go. "Something high over the field," ${p.s} says, "after. And a trail, walking away."`})]},
});
