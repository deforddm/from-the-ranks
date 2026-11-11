/* ============ Book Ten: the seven visions of Witnessed ============
   One per chapter, played when Book Ten's reader turns a card or lays a tile and looks into it. Book Ten reads through each squad's own
   reader (180c, by b10As): the Third (chapters 1, 3, 5, 7) reads the Deck through Book Four's chain, Marrow, else Tallow, else the old
   marine of the heavies' lines; the Letherii (2, 4, 6) cast the Tiles through Book Five's, Perrit, else the tile-woman of the supply
   train. visReader() (36b, wrapped by 180c, which also names the old marine) gives the right one, and 36b's visTiles() says "Through the
   Tiles" for the Letherii.
   Each vision is a scene neither squad can stand in (tcg-canon §4), through the eyes of a canon character neither squad speaks with,
   from tcg-canon §9. Choices change words, never outcomes (S.f.b10v*_ keys; nothing else reads them). The last step of each is the
   reader, back at the chapter's reading place (B10READ[n]): its sp, fig and txt are getters/functions of visReader(), so visAgain (36b)
   still matches it on a replay.
   How it hooks on: 21's card screen offers "✦ Look into the card" (or the tile) whenever visionFor(chapter, card) finds one (36b, by book
   'tcg'); the vision comes back to b10_c<n>_card (36b's cardNodeName, b10_c for 'tcg'), whose one button goes to B10READ[n].back. No
   chapter or engine file changes.
   Canon basis: docs/tcg-canon.md §9, bound by §4, §5 (rules 98-111) and series-canon §(a). Vision 1 stops before Bottle walks in.
   Vision 2 is the march order and the Grey Helms' pace, nothing of the Empty Hold or the three strangers. Vision 3 has no child in the
   traces: the soldier beside Shortnose is a woman, unnamed. Vision 4 stops at grey light, before any rider. Vision 5 is the Witness
   vision of the crossing, and names neither the gate nor the dead city. Vision 6 is headline: never the Gilk's orders or Spax's end.
   Vision 7 is the series' Witness vision and the one place the narration names the Crippled God (rule 98): never his body, the heart,
   his bonds or what happens to them; he names no one; it ends on the book being opened. The readers say "the Fallen One", as soldiers.
   Backdrops are VISBG b10v_* and b10deck, the new figures FIGX b10v_* (188b, which loads after this file; both are read only when a
   vision plays). Notes: docs/tcg-visions-notes.md. */

/* ---------------- the reader, at the end of each vision ---------------- */
const b10vP = r => r.he ? {S:'He', s:'he', H:'His', h:'his'} : {S:'She', s:'she', H:'Her', h:'her'};
const B10V_READERS = ['marrow', 'tallow', 'oldninth', 'perrit', 'tilewoman'];
const b10vWho = r => B10V_READERS.includes(r.id) ? r.id : 'other';
const b10vFig = () => { const r = visReader(); return ({marrow:'marrow', tallow:'tallow', oldninth:'b4v_oldninth', perrit:'perrit', tilewoman:'b5_c1_tilewoman'})[r.id] || (FIGX[r.id] ? r.id : r.he ? 'b4v_oldninth' : 'b5_c1_tilewoman'); };
/* the playing squad is in the glass (its default road for the Third; the 'adjunct' road for the Letherii) */
const b10vGlass = () => !!(S && S.f && b10Crossing());
/* o = {<reader id>:(r, p) => text, ..., other:...}: the chapter's squad's readers; other is the fallback */
const b10vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b10vFig(); }, bg:'b10deck',
  txt:() => { const r = visReader(), p = b10vP(r); return (o[b10vWho(r)] || o.other)(r, p); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: the camp after the short-tails. Across the camp, at a fire, a sapper grieving a mage who is only missing. ---- */
  b10v1:{book:'tcg', ch:1, who:'Cuttle', where:'A fire across the camp', fig:'b10v_cuttle', bg:'b10v_cuttle', cap:'A small fire in a battered camp at night, a ring of shapes round it with one place in the ring left empty, and past them the dark between the tents where people come and go.', steps:[
    {txt:
`Cuttle sits at a fire that is mostly smoke, in a camp that is mostly wounded, and does not eat what is in his bowl.

The short-tails are gone. The army is not, which surprises everyone in it. The surgeons have not stopped since. The burial lines have not stopped either.

He is a sapper. He has buried a great many people. He has never been much good at the part after.`},
    {txt:
`Round the fire the others sit where the squad always sits. There is a gap in the ring on the left, where a thin young mage used to sit with something small and alive in his lap: a rat, a lizard, whatever had wandered into his hands lately.

The gap has not been filled. The squad leaves it alone, the way a sapper leaves a fuse alone.`,
     ch:[{t:'Say his name.', set:['b10v1_name','say']},
         {t:'Leave it.', set:['b10v1_name','leave']}]},
    {txt:()=>`${S.f.b10v1_name === 'say' ? `"Bottle," Cuttle says, to the fire. It comes out rough. The fire spits. The others look at their bowls.` : `He leaves it. You say a name over a fire once, properly, and the squad has not had the stomach for properly yet.`}

He thinks about the lad. Too young for a squad mage, too odd for anything else. Always knowing things he should not have known, and saying them at the wrong moment, and being right. He went off into the dark in the worst of it, and did not come back.

Missing, the clerks wrote. Cuttle has been a soldier long enough to know what the clerks mean by missing.`,
     ch:[{t:'Look for the sergeant.', set:['b10v1_sgt','look']},
         {t:'Look at the fire.', set:['b10v1_sgt','fire']}]},
    {go:'Pick up the bowl.', txt:()=>`${S.f.b10v1_sgt === 'look' ? `The sergeant is not at the fire. He is off with the officers again. He has been off with the officers a good deal, since, and his face is shut when he returns.` : `He looks at the fire. It is easier than looking at the gap.`}

He will say something about the lad when this is over. Something short. A sapper's sort of thing: he did his job, he was odd, he was ours.

Out past the fires the camp moves the way a camp moves at night: a sentry calling, feet going to the latrine trench and coming back, a laugh from somewhere that still sounds wrong.

The card shows no more than that: a sapper at a fire, an empty place in the ring, and the dark between the tents, where people are always walking.`},
    b10vEnd({
      marrow:() => `Marrow lets the card go. "A sapper," she says. "At a fire like ours, across the camp. Grieving a lad who went into the dark." She lays the card face down on the barrel and keeps her palm flat on it. "Missing is not dead, child. I said it before. I'd say it to him, if I ever met him." She looks along the burial lines. Her hands are cold.`,
      tallow:() => `Tallow puts the card face down on the barrel. "A sapper with an empty place at his fire," he says. "Grandmother kept a place laid for my grandfather when his boat was late. Every night. He came in one evening and sat in it, and asked what was for supper." He wraps the deck. "I'm only saying it happens, Sergeant."`,
      oldninth:() => `The old marine lets the card go and turns the empty cup round in his hand. "Cuttle," he says. "Fiddler's sapper. Doesn't laugh much." He looks across the camp. "Lost his mage. Or thinks he has." He sets the cup down. "Thinks. That's the word to hang on to, Sergeant."`,
      other:(r, p) => `${r.name} lets the card go. "A sapper at a fire," ${p.s} says, "grieving somebody only missing."`})]},

  /* ---- Chapter 2: the southern march. At the back of the Letherii column, the Atri-Ceda, minding the Grey Helms' pace. ---- */
  b10v2:{book:'tcg', ch:2, who:'Aranict', where:'The back of the southern column', fig:'b9v_aranict', bg:'b10v_march', cap:'A long column on a dry road by day, wagons and tired horses at its tail, and far ahead of it two walls of dust, one grey and one brown, leaning away.', steps:[
    {txt:
`Aranict rides near the back of the Letherii column, with a stick of rustleaf going and the dust of three armies in her teeth.

The order of march has settled itself, the way water settles. The Grey Helms first, far ahead, their dust a grey wall on the horizon. Then the Bolkando, trying to keep up with them. Then Lether, last, trying to keep up with the Bolkando, and not trying very hard.`},
    {txt:
`She does not mind being last. Last is where you see everything.

What she minds is the pace. The grey knights set it, and they are setting it as if something were chasing them, or as if they were chasing something, and she cannot decide which is worse.`,
     ch:[{t:'Watch the dust ahead.', set:['b10v2_dust','ahead']},
         {t:'Watch the column behind.', set:['b10v2_dust','behind']}]},
    {txt:()=>`${S.f.b10v2_dust === 'ahead' ? `She watches the grey dust ahead a long while. A whole army does not march like that without a reason. Someone in their command wants very badly to arrive first. She would like to know where, and before what.` : `She turns in the saddle and watches the column behind her: the brigades, the train, the horses with their heads down, the water-carts swaying. It is a long, tired thing. It is also, she thinks, hers, in a way she has not decided how to say.`}

The Commander rides up beside her for a while, as he does, and says nothing about the pace, as he does. She knows he has noticed it. He notices everything and complains about none of it, which she has found much harder to ride beside than the other way round.`,
     ch:[{t:'Ask him about the Grey Helms.', set:['b10v2_ask','ask']},
         {t:'Offer him a stick.', set:['b10v2_ask','smoke']}]},
    {go:'Ride on.', txt:()=>`${S.f.b10v2_ask === 'ask' ? `"They are in a hurry," she says. He agrees that they are. She waits. He agrees again, in a different way, and that is all she gets, and it is, she realises, all he has.` : `She offers him a stick of rustleaf. He declines it, as he always does, and thanks her, as he always does. It is a small ceremony. She would miss it.`}

He rides on up the column. She stays where she is, at the back, where you see everything.

Ahead, the grey dust leans a little further away, and the Bolkando's brown dust leans after it, and the gap between Lether and the rest of the world grows by a hand's width at a time.`},
    b10vEnd({
      perrit:() => `Perrit turns the tile face down on the tailboard and keeps her fingers on it. "The Atri-Ceda," she says. "Riding at the back, where we will be." She looks south, along the road the brigades will take. "She thinks the grey knights are in too much of a hurry. So do I." A breath. "I will write that down, Sergeant. It ought to be written somewhere." Her hands are cold.`,
      tilewoman:() => `The tile-woman puts her hand over the tile. "The Atri-Ceda," she says, and spits to one side, for manners. "Smoking at the back, minding the pace." She tucks the tile away in its cloth. "The grey ones are in a hurry, soldier. Never trust a hurry you didn't start." Her hands are cold.`,
      other:(r, p) => `${r.name} turns the tile face down. "The Atri-Ceda at the back of the column," ${p.s} says, "minding the pace."`})]},

  /* ---- Chapter 3: the crossing, by night. In the traces of a supply wagon, a heavy whose oxen died, remembering home. ---- */
  b10v3:{book:'tcg', ch:3, who:'Shortnose', where:'The traces, in the dark', fig:'b10v_shortnose', bg:'b10v_traces', cap:'Night on a flat glassy plain, stars above and the same stars in the ground below, and a supply wagon dragged through it by soldiers leaning in the traces where the oxen should be.', steps:[
    {txt:
`Shortnose is in the traces of a supply wagon, in the dark, on the glass, because the oxen died and the wagon did not.

He is a heavy. He is very large. He has been told, many times, that he is not very clever, and he has decided that this is mostly other people's problem.

The strap across his chest goes wet with sweat and dry again, over and over, as the night goes.`},
    {txt:
`The wagon is heavy. That is fine. Heavy is a thing he understands. You lean, and it comes, and you lean again.

Beside him in the traces is a soldier he does not know well, a woman, breathing the way he is breathing. Behind them the wheels grind on the glass with a sound like teeth.`,
     ch:[{t:'Lean into it.', set:['b10v3_lean','lean']},
         {t:'Talk, to pass the dark.', set:['b10v3_lean','talk']}]},
    {txt:()=>`${S.f.b10v3_lean === 'lean' ? `He leans. The wagon comes. He leans again. After a while the leaning is the whole of the world, and that is restful, in its way.` : `He talks a little, to pass the dark. The woman beside him does not answer much. He does not mind. He is mostly talking to himself, about home.`}

Home comes up out of the dark the way things do when you are tired enough.

The hungry years. His da coming in late with scraps for the little ones. His ma going out after dark and coming back with food, and none of them asking how, because asking would have meant knowing.`,
     ch:[{t:'Remember it.', set:['b10v3_home','remember']},
         {t:'Put it away.', set:['b10v3_home','away']}]},
    {go:'Lean.', txt:()=>`${S.f.b10v3_home === 'remember' ? `He lets himself remember it. It was bad. It was also the last time he can remember everybody he loved being in one room, which is a strange thing to find in the dark in the middle of a desert.` : `He puts it away. There is a time for that, and it is not in the traces. He has a wagon.`}

"They did what they had to," he says out loud, to the woman beside him, who has no idea what he means.

"Yes," she says anyway.

The wagon comes. The wheels grind. Ahead the column goes on into the dark, and the stars go on in the ground under it, and Shortnose leans.`},
    b10vEnd({
      marrow:() => `Marrow lets the card go. "A heavy in the traces," she says. "Last night, ${b10vGlass() ? 'up the column' : 'out in the glass, with the Adjunct\'s column'}. Thinking about his mother." She lays the card face down${b10vGlass() ? ' on the glass' : ''}. "They all do, in the traces, child. It's the leaning. It shakes it loose."`,
      tallow:() => `Tallow puts the card face down. "A big man in a wagon's straps," he says. "Talking to whoever was beside him." He looks at the wagons. "Grandmother said a load is lighter if you tell it something. I always thought she meant the load."`,
      oldninth:() => `The old marine lets the card go. "Shortnose," he says. "Heavy. Big as a wagon himself. Not clever, they say." He turns the empty cup over. "Hauled all night with no ox in front of him. I'll take that sort of not clever."`,
      other:(r, p) => `${r.name} lets the card go. "A heavy in the traces," ${p.s} says, "in the dark, thinking about home."`})]},

  /* ---- Chapter 4: the southern road, by night. Riding with the lizard-folk, a foreign sergeant wakes from an old road. ---- */
  b10v4:{book:'tcg', ch:4, who:'Gesler', where:'A camp with the lizard-folk', fig:'gesler', bg:'b10v_night', cap:'A dark camp on dry ground under hard stars, a man sitting up in his blankets with a scarred dog pressed against him, and beyond them long rows of tall shapes standing very still.', steps:[
    {txt:
`Gesler wakes with his pulse going like a drum and the taste of smoke in his mouth that is not there.

The dream again. He has had it often enough now that he knows the road in it better than any road he ever walked awake.

The Aren Way. The trees along it, and what the trees held, and the crows.`},
    {txt:
`Something warm shoves at his hand.

Bent. The Wickan cattle-dog, scarred and lopsided and ugly as sin, pressing his whole weight against Gesler's side, as he does when the dream comes. The dog knows that road. He has never said so, being a dog. He knows it.`,
     ch:[{t:'Put a hand on the dog.', set:['b10v4_dog','hand']},
         {t:'Sit up.', set:['b10v4_dog','up']}]},
    {txt:()=>`${S.f.b10v4_dog === 'hand' ? `He puts a hand on the dog's back and leaves it there, and the drum in his chest slows to a march.` : `He sits up. The dog sits up with him, and leans, and the lean is worth more than anything a healer ever gave him.`}

Round him the camp is dark. Stormy snores somewhere close, like a landslide that has found somewhere comfortable. Past them, in long rows, the big lizards stand in the starlight, still as stones, doing whatever it is they do instead of sleeping.`,
     ch:[{t:'Think about the road.', set:['b10v4_road','road']},
         {t:'Think about nothing.', set:['b10v4_road','nothing']}]},
    {go:'Wait for grey light.', txt:()=>`${S.f.b10v4_road === 'road' ? `He thinks about the road, because it is there and will not go. An army that walked a nation's worth of the frightened to the gates of a city, and was left outside them. A long time ago, now. Not long enough.` : `He tries to think about nothing. He was always better at it than Stormy. Tonight he is not much good at it either.`}

Bent sighs, a long dog's sigh, and puts his ruined muzzle across Gesler's knee.

"I know," Gesler says. "Me too."

He does not go back to sleep. He sits with the dog until the sky goes grey in the east, and the lizards begin to move, and the long road south begins again.`},
    b10vEnd({
      perrit:() => `Perrit turns the tile face down on the blanket, slowly. "It showed me something," she says. "The first in a while." She keeps her fingers on it. "A foreign sergeant, with the lizard-folk, ${b10vGlass() ? 'far south of us, on the long way round' : 'up the column'}. Awake all night with a dog." She looks at the horse-lines. "Bad dreams. An old road. I will not write that one down."`,
      tilewoman:() => `The tile-woman puts her hand over the tile, and frowns, because it is warm. "Huh," she says. "Thought they'd stopped." She looks at it a while. "A foreign sergeant and an ugly dog, up all night. The dog was the better of the two, if you ask me." She folds it away. "Get some sleep, soldier. While it's somebody else having the dreams."`,
      other:(r, p) => `${r.name} turns the tile face down. "A foreign sergeant awake all night," ${p.s} says, "with a dog."`})]},

  /* ---- Chapter 5: the crossing's worst. At the edge of a halt, a young mage asks one of the dead a favour. ---- */
  b10v5:{book:'tcg', ch:5, who:'Bottle', where:'The edge of a halt on the glass', fig:'b10v_bottle', bg:'b10v_dust', cap:'The edge of a halt on the glass at night, the column lying in dark heaps behind, a young man sitting alone, and beside him a shape of old hide and dust, sitting down the way the living do.', steps:[
    {txt:
`Bottle sits on the glass at the edge of the halt, away from the circles that have no fires, and waits for the dead woman to come and talk to him.

She comes. She always does, lately. Nom Kala, of the Imass: old hide and dust and a stone weapon she has no need to hold, sitting down beside him as a living woman would, out of courtesy, or habit.`},
    {txt:
`"What is it like," he asks her, "being dust?"

He is not asking idly. The army is dying, a little more of it every night. He would like to know where it is going.`,
     ch:[{t:'Wait for her answer.', set:['b10v5_wait','wait']},
         {t:'Ask it another way.', set:['b10v5_wait','again']}]},
    {txt:()=>`${S.f.b10v5_wait === 'again' ? `"I mean," he says, "is there anything left. After." She looks at him as if he had asked the same thing twice, which he has.` : `He waits. The Imass are never in a hurry to answer; they have had a very long time to get out of the habit.`}

You will not be dust, she tells him. Not as we are. You will have nothing to call you back.

He says he has strings. Things that pull. She looks, the way the dead look, and says she sees none. He is cut off, she says, from everything but what lives inside him.

That would explain the loneliness, he says. She does not argue.`,
     ch:[{t:'Ask her the thing.', set:['b10v5_ask','ask']},
         {t:'Sit with her a while first.', set:['b10v5_ask','sit']}]},
    {go:'Walk on.', txt:()=>`${S.f.b10v5_ask === 'sit' ? `He sits with her a while first, on the glass, under the stars above and the stars below. It is the closest thing to company he has had in a good while.` : `He asks her before he can lose his nerve.`}

When we die out here, he says, all of us, don't fall to dust. Keep walking. All of you. Walk to the far side.

So the world knows, he says. So it knows the desert can be crossed.

Nom Kala is quiet. Then she says yes.

In return, she says, she will ask one more march of him. He does not ask what for. He is too tired, and too grateful, and the stars are very bright.`},
    b10vEnd({
      marrow:() => `Marrow lets the card go, and does not lay it down at once. "A mage," she says, "and one of the dead Imass. Talking." Her voice is as dry as the cards. "${b10vGlass() ? '' : 'Out in the glass, with the Adjunct\'s column. '}He asked them to keep walking, child. After us. To the far side." She puts the card face down. "So the world would know it could be done." She looks round at the squad. "Our own witness. Even if it has to be the dead."`,
      tallow:() => `Tallow puts the card face down. "A young mage," he says, "and a woman made of dust." He swallows; there is nothing to swallow. "He asked them to keep walking when we can't." He looks east. "Grandmother said a road is only a road once somebody has been to the end of it."`,
      oldninth:() => `The old marine lets the card go. "Bottle," he says. "Fiddler's mage. The one who came back." He looks at the empty cup a while. "Asked the dead to finish the walk for us, if it comes to it." He sets the cup upright. "Good lad. Hope it doesn't."`,
      other:(r, p) => `${r.name} lets the card go. "A mage and one of the dead," ${p.s} says. "He asked them to keep walking, after us."`})]},

  /* ---- Chapter 6: the allied field before the city. A Barghast warchief, slower than he was, sees the enemy stop and walk away. ---- */
  b10v6:{book:'tcg', ch:6, who:'Spax', where:'The field before the city', fig:'b10v_spax', bg:'b10v_field', cap:'A wide field by day under a pale sky, painted warriors running into a line of thin grey figures, and beyond them a city and a far white tower, toward which whole ranks of the grey figures are turning to walk.', steps:[
    {txt:
`Spax of the Gilk runs, and is passed.

He is not old. He tells himself so, between breaths. He is a warchief of the Barghast in the full of his years, and there is a stitch in his side like a spear-point and a cramp in his calf like a second one, and young warriors who were not born when he first went to war are going by him on both sides.`},
    {txt:
`Ahead, the Teblor, huge, in front of everyone, as Teblor always are. Round him the Gilk in their shell armour, howling.

And beyond them the enemy line: the thin men and women of this starved country, more of them than anyone told him, coming on.`,
     ch:[{t:'Wave them on past.', set:['b10v6_wave','wave']},
         {t:'Keep running.', set:['b10v6_wave','run']}]},
    {txt:()=>`${S.f.b10v6_wave === 'wave' ? `He waves them on past him, as a chief should, as if that had been the plan all along, and they go.` : `He keeps running. Running is the only argument he has left with his own knees.`}

The lines meet. He is in it then, for a while, and it is what it always is, loud and close and stupid, and he is too busy to be old.

When he can look up again, something has changed.`,
     ch:[{t:'Look.', set:['b10v6_look','look']},
         {t:'Hold where you are.', set:['b10v6_look','hold']}]},
    {go:'Watch them go.', txt:()=>`${S.f.b10v6_look === 'hold' ? `He holds where he is for a breath, and then he has to look, because everyone round him is looking.` : `He looks.`}

The Kolansii have stopped fighting.

Not broken. Not run. Stopped, whole stretches of them at once, and turned their backs on the battle as if it were nothing to do with them, and begun to walk. Away. Toward the tower over the city, the Spire, white and far.

"We didn't even slow them," Spax says, to the air, and spits, and his side hurts.

The big lizards will have to hold them now, if anything can. Not the Gilk. He watches them go, thousands of them, walking, and finds he has no idea at all what it means.`},
    b10vEnd({
      perrit:() => `Perrit turns the tile face down on the crate, quickly, and presses it flat. "Today," she says. "Later today. The field." She looks ${b10vGlass() ? 'out at the line forming on the open ground' : 'along the beach toward the road inland'}. "A Barghast chief, running, slower than the young ones. And the Kolansii stopping, all at once, and walking away toward the far tower." Her voice stays level. "I do not know what it means, Sergeant. The tile was warm. That is all I know." Her hands are cold.`,
      tilewoman:() => `The tile-woman puts her hand flat over the tile and leaves it there. "Today," she says. "The big painted ones running. And the hungry ones stop, and walk off to the tower like they'd been called." She does not spit. "Stand where they put you, soldier. And if the other lot walk away, let them." Her hands are cold.`,
      other:(r, p) => `${r.name} turns the tile face down. "The field, later today," ${p.s} says. "The Kolansii stopping, and walking away."`})]},

  /* ---- Chapter 7: the last battle. Far from the hill, the god the army fights for hears soldiers laugh, and resolves to write them down. ---- */
  b10v7:{book:'tcg', ch:7, who:'The Crippled God', where:'Far from the hill', fig:'', bg:'b10v_god', cap:'A dark without walls, lit dimly from somewhere below like a banked fire, a far sound of laughter coming in from very far off, and in the middle of the dark a great book lying open on nothing, its pages blank.', steps:[
    {txt:
`The Crippled God has been in pain for so long that the pain has become a country, and he lives in it.

He was pulled down out of the sky a long time ago, and broken in the fall, and the world he fell into has hated him for it ever since. He hated it back, for a long age. That is over, mostly. Hate takes strength.`},
    {txt:
`Today, far off, there is a battle. There is always a battle; he has started a few. He does not watch this one. He listens.

On a hill, somewhere, soldiers are dying for him. Not for him: for the idea that he should be let go. He did not ask them to. He has stopped trying to understand why they do.`,
     ch:[{t:'Listen.', set:['b10v7_listen','listen']},
         {t:'Turn away.', set:['b10v7_listen','away']}]},
    {txt:()=>`${S.f.b10v7_listen === 'away' ? `He turns away, as he has turned from everything, and the sound follows him anyway, as sounds do.` : `He listens.`}

On the hill, between one assault and the next, a soldier asks who it is they are fighting for, again.

Another answers him: everyone.

And the first says, well, no wonder we're losing.

And then they laugh. The whole hill of them, thirsty and broken and nearly done, laughing, one setting off the next, as laughter goes through tired people.`,
     ch:[{t:'Keep listening.', set:['b10v7_laugh','keep']},
         {t:'Remember your own.', set:['b10v7_laugh','own']}]},
    {txt:()=>`${S.f.b10v7_laugh === 'own' ? `He tries to remember the last time he laughed, and cannot, and finds he does not mind, today.` : `He keeps listening, long after it stops.`}

It is the most human sound he has ever heard. All of it laid out in the open: the fear, the joke against the fear, the not giving in.

The world forgets the ones who fall. He knows how the world works. It forgets the ones who stand over them a little after.

Very well, he thinks. Then he will not.

He has never hidden what he is: a fallen thing, a crippled thing. Who else is fit to keep the tally of the fallen? There will be a book. He will write it in his own hand, every one of them, and it will be the only holy thing he ever makes.`,
     ch:[{t:'Begin.', set:['b10v7_begin','begin']},
         {t:'Wait for the first of them.', set:['b10v7_begin','wait']}]},
    {go:'Open the book.', txt:()=>`${S.f.b10v7_begin === 'wait' ? `He waits, and listens, and the first of them begins to come of its own accord, as water comes up through wet ground.` : `He begins.`}

He names no one yet. The pages are empty, and there are very many of them.

The card shows no more than that: a god in a country of pain, listening to soldiers laugh on a hill, and a book, opened.`},
    b10vEnd({
      marrow:() => `Marrow lets the card go and does not lay it down. "Tomorrow," she says. "Not tonight. Somewhere on this field, soldiers laughing." She looks east, toward ${S && S.f && b107South() ? 'the tower' : 'the ridge'}. "And the Fallen One, listening." She lays the card face down on the shield, gently, as if it might wake. "There was a book, child. Open. I couldn't see what was in it." Her hands are cold.`,
      tallow:() => `Tallow puts the card face down on the shield. "Laughing," he says. "Tomorrow, people laughing, and something very old listening to them." He swallows. "And a book. Open." He wraps the deck in its oilcloth. "Grandmother said you never know who's keeping the tally. She said that was the point of behaving."`,
      oldninth:() => `The old marine lets the card go and sets the empty cup on the shield, upside down. "The Fallen One," he says. "Listening to soldiers." He shakes his head slowly. "Never thought I'd feel sorry for that one." He rights the cup. "Book was open, Sergeant. Didn't see what was in it. Don't want to. Get some sleep."`,
      other:(r, p) => `${r.name} lets the card go. "Tomorrow," ${p.s} says. "Soldiers laughing, and the Fallen One listening. And a book, open."`})]},
});
