/* ============ Book Six: Through the Deck, the seven visions of Bones in the Walls ============
   One per chapter, played when Book Six's reader turns a card and looks into it. Book Six reads through each squad's own reader (100c):
   the Third (chapters 1, 3, 5, 7) through Book Four's chain, Marrow, else Tallow, else the old soldier of the 9th; the Fourth (2, 4, 6)
   through Book Three's, Tuft, else Sohra, else old Benna. visReader() (36b) is wrapped by 100c's b6As, so it gives the right one.
   Each vision is a scene the squads cannot stand in, through the eyes of a canon character neither squad meets. Choices change words,
   never outcomes (S.f.b6v*_ keys; nothing else reads them). The last step of each is the reader, back at the chapter's reading place
   (B6DECK[n]): its sp, fig and txt are getters/functions of visReader(), so visAgain (36b) still matches it on a replay.
   How it hooks on: 21's card screen offers "✦ Look into the card" whenever visionFor(chapter, card) finds one (36b, by book 'bh'); the
   vision comes back to b6_c<n>_card (36b's cardNodeName). Nothing in the chapter files changes.
   Canon basis: docs/bh-canon.md §12, bound by §5, §6, §7 and series-canon §(a) (rules 13, 18, 21, 23, 25 above all). The fire at
   Y'Ghatan and the plague are headline only. The Empress is never named, nor the Master of the Deck; the falling lights are never
   explained; Leoman's road through the temple door is never followed. Notes: docs/bh-visions-notes.md.
   Backdrops are VISBG b6v_* and b6deck, the new figures FIGX b6v_* (108b, which loads after this file; both are read only when a vision plays). */

/* ---------------- the reader, at the end of each vision ---------------- */
const b6vP = r => r.he ? {S:'He', s:'he', H:'His', h:'his'} : {S:'She', s:'she', H:'Her', h:'her'};
const B6V_READERS = ['marrow', 'tallow', 'oldninth', 'tuft', 'sohra', 'benna'];
const b6vWho = r => B6V_READERS.includes(r.id) ? r.id : 'other';
const b6vFig = () => { const r = visReader(); return ['marrow', 'tallow', 'tuft', 'sohra'].includes(r.id) ? r.id : r.id === 'oldninth' ? 'b4v_oldninth' : r.id === 'benna' ? 'b3v_benna' : FIGX[r.id] ? r.id : r.he ? 'b4v_oldninth' : 'b3v_benna'; };
/* o = {<reader id>:(r, p) => text, ..., other:...}: the chapter's squad's three readers; other is the fallback */
const b6vEnd = o => ({get sp(){ return visReader().name; }, get fig(){ return b6vFig(); }, bg:'b6deck',
  txt:() => { const r = visReader(), p = b6vP(r); return (o[b6vWho(r)] || o.other)(r, p); }});

Object.assign(VISIONS, {
  /* ---- Chapter 1: the Lato Odhan. Somewhere ahead of the Fourteenth, Leoman sits on a well with the Book in his lap. ---- */
  b6v1:{book:'bh', ch:1, who:'Leoman', where:'A well on the Lato Odhan', fig:'leoman', bg:'b6v_well', cap:'A ring of old stones in the flat of the Odhan at dusk, a rope going down into the dark, and what is left of an army lying in the scrub around it.', steps:[
    {txt:
`Leoman of the Flails sits on the lip of a well in the Lato Odhan, with the Holy Book of Dryjhna in his lap, and curses it.

Quietly, for now. The army is close enough to hear.

What is left of the army. They came out of Raraku under a storm that hid them for days, and they have been riding ever since, and behind them, never far enough behind, the Malazans come on. An army that does not stop. Leoman has fought a great many things. He has never fought anything as patient as that.`},
    {txt:
`The book is heavy. It was always heavy. The leather has cracked along the spine and there is sand between every page, and it smells of the oasis, and of the woman who read from it.

He has a list. He goes through it most nights.

Fire, first, because fire is honest. Then the well under him, a long drop and a small splash. Then the horse lines, and what the horses would do to it, which he favours on the bad nights.

A little way off, Corabb Bhilan Thenu'alas sits in the scrub with his knees up, chewing.`,
     ch:[{t:'"What are you eating?"', set:['b6v1_toad','ask']},
         {t:'Watch him, and let him eat.', set:['b6v1_toad','watch']}]},
    {txt:()=>`${S.f.b6v1_toad === 'watch' ? `Leoman watches him. Corabb chews with great care, the way he does everything, and swallows, and Leoman sees a small grey leg go with it.` : `"A toad, Leoman," says Corabb, with his mouth full.`}

"You will have strange dreams," Leoman tells him.

"I already do." Corabb wipes his mouth. "The men talk, Leoman. They say you were chosen to carry the book. To lead the Apocalypse." He frowns, working it out. "They say it is as much a time as it is anything else."

Leoman looks down at the book in his lap. Chosen.`,
     ch:[{t:'"I could send them home."', set:['b6v1_home','say']},
         {t:'Keep that thought to yourself.', set:['b6v1_home','keep']}]},
    {txt:()=>`${S.f.b6v1_home === 'say' ? `"I could send them home," Leoman says. "Tell them it is finished. Let them go back to their villages and their goats." Corabb stares at him, appalled, and then decides he is joking, and laughs.` : `He keeps it to himself: that he has thought of sending them home. Telling them it is finished. Letting them go back to their villages, and their goats, and their lives.`}

He has thought it every night since Raraku. And every night he thinks of something else after it.

One victory. One impossible victory, somewhere. That might be enough.

Corabb has stopped laughing. He is looking at the stars with great interest, and talking to one of them. The toad, then. Leoman lets him. His own thoughts have gone off sideways, as they do this late, to meer-rats, and how they dig, and how no hawk ever catches one that is already underground.`},
    {go:'Wrap the book.', txt:
`After a time Corabb gets up and wanders off toward the fires, telling the stars goodnight.

Leoman hears him down among the men, earnest and loud. "He is praying," Corabb tells them. "To Dryjhna. Every night. Those are prayers, if you listen." And the men listen, and nod, and are comforted, because Corabb has never told a lie in his life and would not know how to begin.

Leoman laughs once, under his breath.

He does not drop the book down the well. He wraps it in its cloth again, and ties it, and sits with it across his knees in the dark, listening to the Odhan, and to the horses, and to nothing at all behind him that he can hear.`},
    b6vEnd({
      marrow:() => `Marrow lets the card go. "Leoman," she says. "Sitting on a well, cursing his own holy book." She turns the card face down on the stone. "I nursed men in Aren who died for that book, child." She looks out past the fire into the dark of the Odhan, where the army is going. "He's ahead of us. Not far. And he's as tired of it as we are."`,
      tallow:() => `Tallow puts the card face down. "That was him," he says. "Leoman of the Flails. On a well, like anyone." He turns the thought over. "Gran said a man who curses his god every night is still talking to it." He looks at the card. "So he's still talking to it, Sergeant."`,
      oldninth:() => `The old soldier lets the card go and reaches for his cup. "Leoman," he says. "And his big lad eating toads." He drinks. "Cursing the book. I'd curse it too, after the summer he's had." He sets the cup down on the stone. "Don't mistake it, though. A tired man with a plan is worse than a fresh one without."`,
      other:(r, p) => `${r.name} lets the card go. "Leoman on a well on the Odhan," ${p.s} says, "cursing the book."`})]},

  /* ---- Chapter 2: the north coast. Along the bay from the Host's camp, in Ehrlitan, a woman walks into the shadows. ---- */
  b6v2:{book:'bh', ch:2, who:'Apsalar', where:'Ehrlitan', fig:'b6v_apsalar', bg:'b6v_ehrlitan', cap:'A port city of flat roofs and old broken hills under a night sky, lamps in its windows, and in the lanes between them shadows deeper than the lamps allow.', steps:[
    {txt:
`Apsalar walks into Ehrlitan alone, with her hood up, and finds a tavern.

The keeper looks her over and asks whether she is one of Dujek's army. She says no. The tail of it is still in the city, he tells her, the rest gone on along the coast. He says it as a warning, or a complaint. She does not ask which.

She drinks more than she means to. Then she goes up the stairs to sleep it off, and a man at a table gets up to follow her, and at the top of the stairs she turns, and her knife goes across his face, quick and shallow.

He goes back down holding it. The room finds other things to watch.`},
    {txt:
`The room is small and smells of other people's lamps. She does not sleep.

She thinks of a young man she made stay behind, a long way from here. He wanted to come. She would not let him. It was the kindest thing she has done in a year, and she is not sure he will ever see it that way.`,
     ch:[{t:'Let yourself weep for him.', set:['b6v2_grief','weep']},
         {t:'Put him away, and get up.', set:['b6v2_grief','away']}]},
    {txt:()=>`${S.f.b6v2_grief === 'weep' ? `She weeps for him, a little, quietly, with her face to the wall. Then she stops, because there is work, and she has always been able to stop.` : `She puts him away, the way she puts a knife away, and gets up. There is work.`}

She goes down the back stair, past the kitchen, into the lane, and steps into a shadow there that is deeper than it ought to be.

And through it.

Shadow is grey, and cold, and full of chains. She has walked in it before. Chains run across the grey ground in every direction, and in some places there are things at the ends of them. Here, two bodies lie shackled, long dead, tall and dark-skinned. As she passes, two thin shapes rise out of them, like breath on a cold morning, and begin to argue.`,
     ch:[{t:'"Follow, then. Quietly."', set:['b6v2_shades','quiet']},
         {t:'"If you talk, I leave you here."', set:['b6v2_shades','talk']}]},
    {txt:()=>`They speak an old tongue, and she knows it. Telorast, says one. Curdle, says the other. Each says the other tried to rob Shadowkeep and got them both caught. A demon lord with seven heads put them here, they say, and they would very much like to leave, and is she by any chance going to a gate.

${S.f.b6v2_shades === 'talk' ? `"If you talk, I leave you here," she tells them. They are quiet for nearly twenty paces, which she suspects is a record.` : `"Follow, then," she says. "Quietly." They follow. They are not quiet.`}

She brings them out into Ehrlitan again, in the old city: Jen'rahb, the broken hill where the first Ehrlitan lies under the second. She tells the two shades to wait outside, and goes in.

The work is a task for the god of Shadow. A man here sold him, and the god does not forget.`},
    {go:'Wipe the knives.', txt:
`The man she came for is already dead when she finds him. Someone has been before her.

Then the dark in the corners moves, and there are men in it, and they come at her.

It is quick. She is quicker. When it is over she looks at them in the light from the door, and knows the marks on them: priests of the Nameless Ones, who keep no temples anyone would choose to visit.

Outside, the two shades are waiting, which surprises her. They have talked it over, they say. They will stay with her. For now. Somewhere along the way, they say, they intend to cheat everybody.

Apsalar looks out along the bay, at the lamps of the Host's camp in the rain, and thinks of the god who set her to this. Cotillion understood her. He gave her work that suited her. She has begun to notice that it does not suit her as well as it did.`},
    b6vEnd({
      tuft:() => `Tuft lets the card go. "Shadow," she says, very quietly, in case the word carries. "She walks in it like a street she lives on." She looks along the bay at Ehrlitan's lamps. "That's tonight, Sergeant. That's down there." She puts the deck back in her sleeve and keeps her hand on it.`,
      sohra:() => `Sohra sweeps the bones together. "A woman with knives," she says, "and two thin spirits following her like dogs that have not yet decided to be dogs." She looks across the bay at the lamps. "The bones did not like her master. They liked her well enough."`,
      benna:() => `Old Benna puts the card down, face down, quick. "Knife-work," she says. "In the old city, down there." She nods at the lamps along the bay. "Thirty years following this army, and I know when not to ask a card more questions." She holds out her palm. "Copper."`,
      other:(r, p) => `${r.name} lets the card go. "A woman with knives, in Ehrlitan," ${p.s} says, "walking in the shadows."`})]},

  /* ---- Chapter 3: Y'Ghatan. Inside the burning city, in a temple of pale stone, Leoman's oldest friend learns what he is for. ---- */
  b6v3:{book:'bh', ch:3, who:'Corabb Bhilan Thenu\'alas', where:'The Queen of Dreams\' temple, Y\'Ghatan', fig:'b6v_corabb', bg:'b6v_temple', cap:'A temple of pale stone with its doors shut against the night, firelight in every high window, and smoke gathering along the ceiling.', steps:[
    {txt:
`Corabb Bhilan Thenu'alas stands in the temple of the Queen of Dreams, in the middle of Y'Ghatan, while the city burns.

It burns because Leoman meant it to. The oil was in the walls and under the floors long before the Malazans came through the breach, and now the fire is everywhere at once, and the roar of it comes through the temple doors like surf.

The floor is warm under his sandals. The high windows are orange. Smoke has begun to gather along the ceiling, in a slow brown sheet.`},
    {txt:
`Leoman brought him here through the burning streets, with Dunsparrow, while the faithful fought and died behind them. Corabb did not understand why, at first.

He understands now. There is a bargain. He does not know its terms. He knows whose temple this is, and that Leoman walked into it as a man walks into a house where he is expected.

"How can you leave them?" Corabb says. "They are dying for you. Out there. All of them."

Leoman does not turn round. "Hood take Dryjhna," he says.`,
     ch:[{t:'"They believed in you."', set:['b6v3_ask','believed']},
         {t:'Ask nothing more.', set:['b6v3_ask','quiet']}]},
    {txt:()=>`${S.f.b6v3_ask === 'believed' ? `"They believed in you," Corabb says. "I believed in you."\n\nLeoman turns then. His pale eyes are red from the smoke, or from something. "I know," he says.` : `Corabb asks nothing more. He has asked his questions all his life, and Leoman has answered them all his life, and he finds tonight he does not want the answers.`}

Dunsparrow stands by the inner door with her arms folded, watching them both. She knew. Corabb sees that she knew all along, and the seeing goes into him like a splinter.

"There is a way out," Leoman says. "For you too, old friend. Come."`,
     ch:[{t:'"I stay."', set:['b6v3_stay','stay']},
         {t:'"Go, Leoman. Just go."', set:['b6v3_stay','go']}]},
    {txt:()=>`${S.f.b6v3_stay === 'go' ? `"Go, Leoman," Corabb says. "Just go."` : `"I stay," Corabb says.`}

He means to die in the name of something greater than himself. He has always meant to. He had thought the something was Leoman.

Leoman looks at him a moment longer. Then he goes to the inner door, and Dunsparrow goes with him, and there is a light beyond it that is not firelight.

Corabb turns his back. He hears the door close. When he looks again there is no light under it.

Then he hears the other sound. Small, and close, behind the altar. Children. A handful of them, the temple's or the street's, left behind when the city emptied, crouched in the dark with their hands over their mouths.`},
    {go:'Pick up the smallest.', txt:
`Corabb picks up the smallest. She weighs nothing. The others come out from behind the altar and stand round his legs, and he stands there with them while the roof groans overhead.

The side door bangs open on smoke.

Soldiers come through it. Malazans, a handful, in the grey-green of the Fourteenth, or what is left of it, burned and black-faced, most of them out of their armour. The enemy.

They stop. They look at him, a big man with a child on his hip and more round his knees. He looks at them.

Not one of them draws a weapon. The fire is louder than any of them, and it is coming.`},
    b6vEnd({
      marrow:() => `Marrow lets the card go and keeps her palm over it. "Inside," she says. "While we stood on the line. A temple, and children, and his own man left behind." She looks at the city, still smoking past the barrows. "Leoman went out by some door of his own, child. I don't know where. I don't think the card does." She does not name the card.`,
      tallow:() => `Tallow puts the card face down. "The big one," he says. "Leoman's man. He stayed." He looks at the long new barrow, and then at the city. "Gran said you know a man by what he won't leave." He doesn't finish. "There were children in there, Sergeant."`,
      oldninth:() => `The old soldier lets the card go. "Leoman walked," he says. "Out the back, through some temple door, while his own burned for him." He looks into his cup and leaves it. "And the big lad stayed with the little ones." A breath. "There's one of him in every army. I hope ours got out."`,
      other:(r, p) => `${r.name} lets the card go. "A temple in the fire," ${p.s} says, "and Leoman's man staying with the children."`})]},

  /* ---- Chapter 4: G'danisban. In the field hospital, the High Fist's outrider sits up with him in the rain. ---- */
  b6v4:{book:'bh', ch:4, who:'Hurlochel', where:'The field hospital before G\'danisban', fig:'hurlochel', bg:'b6v_hospital', cap:'A long tent in the rain, lamps down its length, cots in rows, and at the far end one cot with a screen drawn round it.', steps:[
    {txt:
`Hurlochel, outrider to the High Fist, sits by Dujek Onearm's cot in the field hospital before G'danisban, with the rain loud on the canvas.

The High Fist has the fever. He has had it for days. It is sweat, and shaking, and a cup held to a mouth that cannot keep the water down, and it is the same in every cot down the length of the tent.

The Host's chief cutter, Noto Boil, comes and goes. Fist Rythe Bude stands at the foot of the cot whenever duty allows, and sometimes when it doesn't.`},
    {txt:
`Toward evening Dujek is awake for a while, and clear.

"Where's the captain?" he says.

"Gone into the city, High Fist." Hurlochel does not say what for. He is not sure himself. The man went out into the rain with the look of someone who has decided a thing and does not want to be talked out of it.

"He'll do it, then," Dujek says. "Whatever it is." He moves the stump of his arm under the blanket. "The logs. Are they up to date?"`,
     ch:[{t:'"Every day of them, High Fist."', set:['b6v4_logs','all']},
         {t:'"Near enough. I\'ll finish them tonight."', set:['b6v4_logs','near']}]},
    {txt:()=>`${S.f.b6v4_logs === 'near' ? `"Near enough," Hurlochel says. "I'll finish them tonight." Dujek grunts. "Finish them. Someone will want to read them."` : `"Every day of them," Hurlochel says. Dujek grunts. "Good. Someone will want to read them."`}

Hurlochel thinks of the man in the rain, two days ago, who knocked Captain Sweetcreek flat and walked into the command tent like he owned it, and was taken for a deserter, and was not one. Hurlochel asked him to take command. He said yes.

He goes by Captain Kindly in this camp. Every soldier in the Host knows the name and not one of them has met the man. Hurlochel knows his real one, and keeps it.

Dujek's eyes have closed again. His breathing has changed.`,
     ch:[{t:'Send for Rythe Bude.', set:['b6v4_fist','send']},
         {t:'Let the Fist sleep. Sit with him yourself.', set:['b6v4_fist','sit']}]},
    {txt:()=>`${S.f.b6v4_fist === 'send' ? `He sends a boy for Rythe Bude. The Fist comes in out of the rain still cloaked and stands at the foot of the cot, and does not sit, and does not leave.` : `He lets Rythe Bude sleep. The Fist has had little enough of it. He sits with the High Fist himself, and the lamp, and the rain.`}

Noto Boil comes down the row and looks, and touches the High Fist's wrist, and shakes his head once, and goes on to the next cot, because there is always a next cot.

The night goes on. The rain does not let up. Somewhere in the city there is a sound like a great many dogs, and then there isn't.`},
    {go:'Write the hour.', txt:
`Dujek Onearm dies two bells before the captain comes back from the city.

It is quiet. There is nothing to it at all. He is breathing, and then he is not, and the rain goes on on the canvas the same as before.

Hurlochel takes the log out of its oilcloth and writes the hour in it, in a good clear hand, because that is what the log is for, and someone will want to read it.

Outside, someone begins to ring the bell. Hurlochel goes out through the flap and stands in the mud for a while with his face turned up to the rain. All down the lines, under the canvas and out of it, the Host is listening.`},
    b6vEnd({
      tuft:() => `Tuft lets the card go. "The High Fist," she says, very low. "In there." She keeps her face turned from the surgeons' tents, a few paces off through the rain. "I've seen him twice. Once at Pale." She squares the cards against the crate. "There's going to be a bell, Sergeant. Soon."`,
      sohra:() => `Sohra sweeps the bones together and holds them in her shut hand. "An old chief, dying," she says, "and a rider who will not leave him." She looks at the tents. "The herd-mothers say the dying hear the rain the longest. I hope it is so."`,
      benna:() => `Old Benna puts the card down and does not take her copper. "Onearm," she says. "I washed his shirts at Pale. One sleeve each, and he tipped." She wipes her eyes on her apron, briskly, as if the rain had got in them. "Go on back to your lines, Sergeant. There'll be a bell for him."`,
      other:(r, p) => `${r.name} lets the card go. "The High Fist, in there," ${p.s} says, "and the rain on the canvas."`})]},

  /* ---- Chapter 5: the Kokakal shore. On the beach below, a Fist listens to a little boy. ---- */
  b6v5:{book:'bh', ch:5, who:'Keneb', where:'The Kokakal shore', fig:'keneb', bg:'b6v_kokakal', cap:'A long grey beach under a high pale sky, transports at anchor offshore, boats going out loaded, and an army waiting its turn in the sand.', steps:[
    {txt:
`Fist Keneb stands on the Kokakal shore and watches his soldiers load Admiral Nok's transports.

It goes slowly, the way loading goes. Boats out, full; boats back, empty. Nets of gear swung up the sides. Horses that do not want to go, going. Two days, and the fleet sails.

Behind them the Sotka road runs back into the heat, and behind that, Y'Ghatan. The army marched from it the next night, with the plague on its heels. It left a great deal in the ashes. Some of it had names Keneb knew.`},
    {txt:
`Grub comes and stands beside him. He does that, without a sound, the way he has since Aren.

"Don't go in two days," Grub says.

"We sail in two days."

"Wait one." The boy is looking at the ships, not at him. "If we go in two days, we drown. All of us. Two days past Sepik."`,
     ch:[{t:'"How do you know that?"', set:['b6v5_ask','how']},
         {t:'"Who told you that?"', set:['b6v5_ask','who']}]},
    {txt:()=>`${S.f.b6v5_ask === 'who' ? `"Who told you that?" Keneb says.\n\nGrub shrugs. "No one. I just know it."` : `"How do you know that?" Keneb says.\n\nGrub shrugs, which is all the answer he ever gives.`} He goes off down the beach to look at a dead crab.

Keneb stands there with it. A Fist, holding a fleet on a child's word. Nok will be furious. The Adjunct will ask why, and he will have to tell her.

He looks at the boats going out, full of his soldiers. He looks at the boy, crouched over the crab.

He has stopped asking himself how Grub knows things. He finds he has also stopped ignoring them.`,
     ch:[{t:'"Tell the captains the truth. A day\'s delay."', set:['b6v5_why','truth']},
         {t:'"Tell the captains the water casks are foul."', set:['b6v5_why','casks']}]},
    {txt:()=>`${S.f.b6v5_why === 'casks' ? `He tells his captains the water casks are foul and must be broached and checked, every one, and his soldiers come off the ships to do it. The captains look at each other. Not one of them believes a word of it, and not one argues.` : `He tells his captains the truth, or most of it: a day's delay, his order, his responsibility. His soldiers come off the ships. The captains look at each other, and do not argue.`}

The boats come back to the beach full. The transports ride high and light at their anchors. Keneb's part of the army sits in the sand for a day with nothing to do, which soldiers are better at than anything.

The sun goes over. Keneb waits for someone to come and ask him what in Hood's name he thinks he is doing.`},
    {go:'Go and meet them.', txt:
`Late in the day, there is dust on the Sotka road.

Figures, walking in out of the desert. A handful, then more. Thin, burned, in rags of grey-green, with no armour on them at all. Marines. The ones the army counted among the dead in Y'Ghatan, walking down to the sea as if they had only been delayed.

Keneb watches them come. At their head a sergeant of marines he never expected to see again, Fiddler, and beside him faces that make the soldiers on the beach get up out of the sand one after another and start to shout.

Keneb thinks he will tell the Adjunct whose word it was, after all. He finds he does not mind.`},
    b6vEnd({
      marrow:() => `Marrow lets the card go. "Those ships," she says, and nods down at the lanterns. "We go out to them, child, and then we come back off them again for a day, on a little boy's word." She looks at the card a while longer. "And the marines. The ones we left. Walking in." She stops there, and lets the card lie.`,
      tallow:() => `Tallow puts the card face down. "A Fist on the beach," he says, "and a little boy telling him what to do." He thinks about that. "And he did it." He looks down at the lanterns. "Gran would have liked that boy. She'd have been scared of him too."`,
      oldninth:() => `The old soldier lets the card go and looks down at the ships. "Two days past Sepik," he says. "Wherever that is." He pours a finger of rum over the bluff's edge, for the sea. "I'll take the extra day. I'll take any day anybody offers." Then, quieter: "And they walk in. Hood's breath. They walk in."`,
      other:(r, p) => `${r.name} lets the card go. "A Fist on the beach and a boy's warning," ${p.s} says, "and the marines walking in."`})]},

  /* ---- Chapter 6: north-east of G'danisban. Up the halted column, the Host's chief cutter looks at the sky. ---- */
  b6v6:{book:'bh', ch:6, who:'Noto Boil', where:'North-east of G\'danisban', fig:'b6v_noto', bg:'b6v_lights', cap:'A long column halted on a plain, a pale moon low over it, and below the moon a curve of small bright lights, coming down.', steps:[
    {txt:
`Noto Boil, chief cutter of Onearm's Host, walks beside a wagon with a bag over his shoulder that clinks, and complains about his feet.

He has walked a long way on them. Korel, before Genabackis, before any of this. He learned his trade on the Stormwall's side of the world, under a man called Ipshank, and has been cutting soldiers ever since, and sewing them, and mostly being cursed for it.

Soldiers touch his sleeve as he passes. They have done it since the night his fever broke in the field hospital. He has stopped telling them not to.`},
    {txt:
`Up the column, Captain Sweetcreek is complaining about the new High Fist, loudly, in a Falari accent that makes everything sound like an insult and usually is.

Fist Rythe Bude tells her to stop. Sweetcreek does not stop. Rythe Bude tells her again, in a voice with less in it.

Noto Boil enjoys this. It is the best thing that has happened on this road in a week.`,
     ch:[{t:'Listen, and enjoy it.', set:['b6v6_talk','listen']},
         {t:'Put a word in.', set:['b6v6_talk','word']}]},
    {txt:()=>`${S.f.b6v6_talk === 'word' ? `"He came back from that city," Noto Boil says, to the air in general. "Which is more than the goddess in it did." Sweetcreek turns in her saddle to glare at him. He smiles at her, which she hates.` : `He listens, and enjoys it, and keeps his mouth shut for once, which takes some doing.`}

Then someone up ahead stops talking and points.

Noto looks up.

The moon is up, white and high. Below it, strung out in a curve, are lights. Small and very bright. Suns, nearly, each one bright enough to leave a spot burned in the eye when he looks away. He counts them, because he counts everything. Twelve.

They are coming down.`,
     ch:[{t:'"High Fist. The sky is falling."', set:['b6v6_say','plain']},
         {t:'"I\'ve seen this before. Not here."', set:['b6v6_say','korel']}]},
    {txt:()=>`${S.f.b6v6_say === 'korel' ? `"I've seen this before," Noto Boil says, when the High Fist rides back down the column. "Not here. In Korel." He has stopped looking at the lights. "The sky is falling, High Fist."` : `"High Fist," Noto Boil says, when the High Fist rides back down the column. "The sky is falling." He heard the stories in Korel. He has seen what was left, after, when the stories were true.`}

The High Fist does not laugh at him. He looks up for a long breath, and then down, and orders the column to halt.

All down the road the Host stops. Wagons, horses, heavies, the baggage, the camp followers, every face turned up.

The High Fist is calling for Ormulogun. Noto Boil knows Ormulogun: the Host's painter, a man with paint under his nails and a toad that follows him about. The High Fist wants to know if the cards are finished. Noto cannot think what a painter's cards have to do with the sky.`},
    {go:'Wait.', txt:
`The painter comes up the column at a run, with something in his hands wrapped in cloth. The High Fist takes one card from him. Noto sees him look at it.

Then the High Fist rides off the road with a handful at his back, toward nothing Noto can see, and is lost to sight past the head of the column. There are only the lights, and the moon.

The column waits.

Noto Boil sits down on the wagon tongue and opens his bag, and lays out what is in it on a clean cloth, one thing at a time. Whatever comes down out of that sky, and wherever, there will be work after it. There always is.`},
    b6vEnd({
      tuft:() => `Tuft lets the card go. "The cutter," she says. "He's seen this before. Somewhere else." She looks up, and then down again quickly at the shield. "He's not frightened of it. He's frightened of after." She gathers the cards. "So am I, now."`,
      sohra:() => `Sohra sweeps the bones together. "The cutter they all touch for luck," she says, "looking up, the same as the rest of us." She glances at the lights and away. "The bones say the sky is not angry. I do not know whether that is better."`,
      benna:() => `Old Benna puts the card down. "Noto Boil," she says, and snorts. "Owes me for six shirts." She looks up at the lights, and keeps looking. "He's opened his bag. When the cutter opens his bag before anything's happened, Sergeant, you find your helmet."`,
      other:(r, p) => `${r.name} lets the card go. "The cutter, looking up," ${p.s} says, "and twelve lights coming down."`})]},

  /* ---- Chapter 7: Malaz City. Days ahead of the transport, on a jetty in the harbour, a Fist decides whose army this is. ---- */
  b6v7:{book:'bh', ch:7, who:'Keneb', where:'Malaz City', fig:'keneb', bg:'b6v_jetty', cap:'A harbour under a grey sky, a rock with a keep on it black against the cloud, a jetty crowded with soldiers, and at its landward end a crowd with torches.', steps:[
    {txt:
`Fist Keneb comes down onto the jetty at Malaz City, where a squad of marines stands across it facing the city, and asks where their sergeant's friends are.

"Scouting," says Sergeant Balm.

Keneb lets that go. Behind him the transports are pulling out of arrow range, one by one. The Froth Wolf stays moored, and the black ship beside her, because the Perish Destriant has given his word that neither will burn. The marines on this jetty are on their own, with the Froth Wolf's ballista at their backs.

At the landward end, the crowd. It has been growing all afternoon. It wants the Wickans.`},
    {txt:
`The city has turned on its Wickans. Keneb heard it from the first boat in, and did not believe it, and believes it now.

Burning arrows come up out of the crowd and arc over the jetty at the Froth Wolf. They hiss into her side and go out, every one. The marines answer with munitions, and the crowd surges down the jetty at them, and the marines put it back where it came from.

A marine with a bow, Koryk, says, to the jetty at large, that they are killing their own people now. No one answers him.`,
     ch:[{t:'"Hold the jetty. Nothing more."', set:['b6v7_order','hold']},
         {t:'"Don\'t chase them into the streets."', set:['b6v7_order','chase']}]},
    {txt:()=>`${S.f.b6v7_order === 'chase' ? `"Don't chase them into the streets," Keneb says, and Balm nods without turning round. No one on this jetty had any intention of going into those streets.` : `"Hold the jetty," Keneb says. "Nothing more." Balm nods without turning round.`}

On the Froth Wolf's deck he finds the man he came for: Captain Rynag, of the Untan Palace Guard, who came aboard to talk.

There were soldiers in that crowd, Keneb tells him. Out of uniform. Keneb saw how they moved.

Rynag knows nothing about it. The mob wants the Wickans, he says. There is a pogrom. An army is marching for the Wickan Plains. It is the Empire's business and none of the Fourteenth's.`,
     ch:[{t:'"Get off this ship."', set:['b6v7_rynag','off']},
         {t:'"Then I land the Fourteenth. Tell your Fist so."', set:['b6v7_rynag','land']}]},
    {txt:()=>`${S.f.b6v7_rynag === 'land' ? `"Then I land the Fourteenth," Keneb says, "and stop it myself. Tell your Fist so. Now get off this ship."` : `"Get off this ship," Keneb says. "Or I land the Fourteenth and stop it myself."`}

Rynag turns for the rail.

An arrow takes him before he reaches it, and he goes down on the deck and does not get up.

"Who did that?" Keneb says.

Koryk lowers his bow. "Me, sir."

"That was a captain of the Untan Palace Guard," Keneb says.

Koryk waits to be arrested. Keneb looks at him, and at the man on the deck, and at the crowd gathering again at the foot of the jetty, and lets it lie.`},
    {go:'Hold.', txt:
`The Destriant of the Perish comes and stands beside him at the rail and asks what is happening.

"Betrayal," Keneb says.

He tells him the rest. The squads are holding the jetty. The ships are staying. They are waiting for the Adjunct, who has gone up to the Hold and not come down.

"This army is hers," Keneb says. "Not the Empire's. Not any more." He finds the words come easily, now they have come at all. "And the Empire can go to Hood."

The Destriant smiles, and bows.

Above the roofs, on its rock, Mock's Hold stands black against the cloud. Keneb keeps his back to it. He watches the jetty, and the marines on it, and the torches coming down the street toward them again.`},
    b6vEnd({
      marrow:() => `Marrow lets the card go. "Malaz City," she says. "I've never seen it, child. Now I have, and I wish I hadn't." She holds the card flat on the hatch with two fingers. "The city turns on its Wickans. And a Fist on a jetty says the army is the Adjunct's now." She puts it away. "That's ahead of us. Days."`,
      tallow:() => `Tallow puts the card face down. "Home," he says. "That's meant to be home." He looks out at the grey water ahead of the bow. "Gran said the Deck lies about home. Every reader says that." He wets his lips. "I hope she was right, Sergeant."`,
      oldninth:() => `The old soldier lets the card go and drinks, all of it. "I came out of that harbour," he says, "on a ship like this one." He looks at the card. "They'll throw stones at us. Our own." He pours another finger, for the sea, and leaves his own cup empty. "The Fist had the right of it. Remember that, when it comes."`,
      other:(r, p) => `${r.name} lets the card go. "Malaz City," ${p.s} says, "and a Fist on a jetty, and the army turning."`})]},
});
