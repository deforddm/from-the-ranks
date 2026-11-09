/* ============ Book Eight: the Deck of Dragons, read for the Fourth by Book Three's reader (v11.0, 140c) ============
   The reader is Book Three's chain (60, VISREADER under S.book 'moi'): Tuft while she walks, else Sohra (bones and smoke) if she came
   across, else old Benna. In Book Eight Benna is not the Host's laundress any more: she left the army when the Fourth did and does Daru
   washing now, and goes along with the caravan in Chapters 2 to 5 because it pays (Claude's call). b8As(fn) runs fn with S.book set to
   'moi' for a moment, synchronously, so the reader chain and the card screen's captions are Book Three's, unchanged; the once-a-book
   words, the "again" words and every card line are Book Eight's own (B8RD, B8SAY), so nothing says the Host or the road south.
   The bug rule (Nov 6): compute the squad and anything else from the live state before switching book state; b8As switches only for the
   reader and the captions.

   How a chapter uses it (Book Seven's pattern, 120c):
     - fill B8READ[n] from the chapter's file: {scene, where, set, back, backT, say:{tuft, sohra, benna}}
     - put b8ReadChoice(n) among the chapter's first halt choices;
     - register two nodes:  b8_c<n>_read: () => b8ReadOffer(n),  b8_c<n>_card: () => b8ReadCard(n).
   "Let her draw" (or "throw") sets S.f.b8_c<n>_drawn = 1 and S.f.b8_c<n>_reader; "Not now" sets S.f.b8_c<n>_noCard = 1.
   b8_c<n>_card is what 36b's cardNodeName() returns in Book Eight. The cards are canon Deck cards the earlier books already hold; their
   effects are engine-wide, keyed on S.card. */

function b8As(fn){ if (!b8On()) return fn(); const was = S.book; S.book = 'moi';
  try { return fn(); } finally { S.book = was; } }
{ const _vr = VISREADER; VISREADER = () => b8On() ? b8As(() => _vr ? _vr() : null) : (_vr ? _vr() : null); }
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => b8On() ? b8As(() => _cb.txt(id)) : _cb.txt(id),
    cap(t, self, second){ return b8On() ? b8As(() => _cb.cap(t, self, second)) : _cb.cap(t, self, second); },
  };
  ['square', 'done', 'look'].forEach(k => { if (_cb && typeof _cb[k] === 'function') CARDBOOK[k] = (...a) => b8On() ? b8As(() => _cb[k](...a)) : _cb[k](...a); }); }

/* each chapter's pool leans to one card (three of it), with two others */
const B8POOL = {
  1:['assassin', 'assassin', 'assassin', 'b3c_gate', 'b3c_knight'],            // the winter before the Fete: a knife on the roof
  2:['b3c_leper', 'b3c_leper', 'b3c_leper', 'b3c_lifesoldier', 'oponn'],        // the scarecrow fields: walk through the bad country and catch nothing
  3:['b3c_knight', 'b3c_knight', 'b3c_knight', 'b3c_lifesoldier', 'b3c_gate'],  // Black Coral: the Son of Darkness's city
  4:['b3c_lifesoldier', 'b3c_lifesoldier', 'b3c_lifesoldier', 'b3c_consort', 'b3c_leper'], // the camp: somebody takes the weight
  5:['hounds', 'hounds', 'hounds', 'b3c_mason', 'oponn'],                        // the Lamatath: something running through the grass
  6:['b3c_gate', 'b3c_gate', 'b3c_gate', 'b2c_soldier', 'b3c_knight'],           // the last night: the door, and who stands in it
  7:['b2c_king', 'b2c_king', 'b2c_king', 'b2c_soldier', 'b3c_mason'],            // the morning after: the seat, and the long stone for the long hole
};
const b8Pool = n => (B8POOL[n] || B8POOL[1]).filter(id => CARDS[id]);
const b8Rd = () => visReader();
const b8RdObj = () => b8Rd().he ? 'him' : 'her';
/* the once-a-book words, and the "again" words */
const B8RD = {
  tuft:{deck:'Tuft has the Deck out: the wooden one, the paint gone off the House of Shadow altogether now, that she carried under the Pale and into Coral and through the years since. She reads for the squad the way she always has. She still holds each card a moment before she turns it, as if somebody might answer.', again:'Tuft has the Deck out, the wooden one.'},
  sohra:{deck:'Sohra still does not use cards. A pinch of something in a bone cup, a handful of knucklebones into the smoke, and the bones fall in the shape of a card from the Deck. Years in a city have not changed the bones. They have changed the smoke: it smells of the lake now.', again:'Sohra has the bone cup out, and the knucklebones.'},
  benna:{deck:'Old Benna left the Host when the Fourth did, and does Daru washing now, two doors down, and reads the Deck for coppers at her tubs: the same greasy soldier\'s deck, the Herald still missing. She has read for Malazans for longer than some of them have been alive, and has still never once been surprised.', again:'Old Benna has the deck out, and her hand out for the copper.'},
};
const b8RdWords = (id, again) => B8RD[id] ? (again ? B8RD[id].again : B8RD[id].deck) : '';
/* every card the pools hold, said by each reader: the card's description (its earlier book's), then the reader's line */
const B8SAY = {
  assassin:{d:'A figure half in shadow, rope and knives.',
    tuft:`"The Rope," Tuft says, and she does not grin the way she did at Pale. "Somebody on a roof, with a knife and a reason." She lays it face up. "The reason isn't ours. The knife might be."`,
    sohra:`The bones fall in a line, and one of them rolls off the edge and keeps going. "Someone walking above you," Sohra says. "On the roofs. You will strike first, the bones say. They do not say who is striking you."`,
    benna:`"Rope and knives," says Benna. "In this city? That's not a reading, Sergeant, that's the weather." She taps it. "Your blows land true. So do theirs."`},
  b3c_gate:{d:B3SAY.b3c_gate.d,
    tuft:`"Hood's gate," Tuft says. "Open." She looks at it longer than she needs to. "One of us gets up again who shouldn't. I'd like it to be one of us."`,
    sohra:`Two lines and a bar across. Sohra is quiet a while. "A door," she says. "The dead stand in it. Many of them, and close." She does not look up. "Once, they will decide for you."`,
    benna:`"The door," says Benna. "One of you goes down and gets back up." She sniffs. "Don't ask me which. I've never done which."`},
  b3c_knight:{d:B3SAY.b3c_knight.d,
    tuft:()=>(S.chapter || 0) >= 3 ? `"High House Dark," Tuft says, very low, and glances at the walls, at the night that will not lift. "He's close now. His city." She turns the card away from her. "Hit hard the first time. That's what he does."` : `"High House Dark," Tuft says. "He was over Pale. Over Coral." She looks east, where Coral is, under its other name now. "He's still looking at something we can't see. Hit hard, the first time."`,
    sohra:`"The tall one with the sword," Sohra says. "The bones say he is near, and not looking at you." She shrugs. "Good. They also say you strike hard. They are allowed two things."`,
    benna:`"Him," says Benna. "Came up every week at Pale." She looks at the card a long time. "First blow lands hard. After that you're on your own."`},
  b3c_leper:{d:B3SAY.b3c_leper.d,
    tuft:`"The Leper," Tuft says. "House of Chains. Walks through bad country and catches nothing." She looks out at the fields and the shapes on their poles, and stops looking. "The warrens won't burn us out here. They won't give as much, either."`,
    sohra:`"Someone walking alone through sickness," Sohra says, "and not sickening." She does not breathe the smoke this time. "Your mages will walk clean through this. Thinner. The bones say both."`,
    benna:`"The bell man," says Benna. "So you know he's coming." She looks at the green rows and spits, which is manners. "Your mages'll be all right. Won't give much, mind."`},
  b3c_lifesoldier:{d:B3SAY.b3c_lifesoldier.d,
    tuft:()=>(S.chapter || 0) >= 3 ? `"Soldier of High House Life," Tuft says. "Kneeling over someone." She looks toward the barrow, and the people on their knees in front of it. "We saw him do that, once. He's still doing it." She lays the card down gently. "Healing takes, this chapter."` : `"Soldier of High House Life," Tuft says. "Kneeling over somebody we can't see." She almost smiles. "There's mending. The Deck says it takes."`,
    sohra:`"Someone kneeling," Sohra says. "Holding someone else's weight." She lets the bones lie. "Your healing will go further. Someone else is paying for it."`,
    benna:`"The kneeling one," says Benna. "Healers heal more." She pours a drop of something on the ground for him. "Tell yours."`},
  b3c_consort:{d:B3SAY.b3c_consort.d,
    tuft:`"Chains again," Tuft says. "The one beside the King, smiling." She puts it face down fast. "There's a smile like that in this camp. Watch the ones who step in close."`,
    sohra:`"Someone fond," Sohra says. "Too close, and fond." She wrinkles her nose at the smell over the camp. "Sweet. The bones do not like sweet."`,
    benna:`"The Consort," says Benna. "Means the ones who swing at your back miss." She looks down the rows of tents. "Stand together. Stand upwind."`},
  oponn:{d:'The jesters of chance, back to back.',
    tuft:`"The Twins," Tuft says. "Back to back. The Lady pulls." She leaves it face up. "Don't thank them. Don't spend it before it lands."`,
    sohra:`The bones fall in two heaps, back to back. Sohra laughs. "Luck," she says. "Yours, this time. The bones are surprised too."`,
    benna:`"Luck," says Benna. "Push or pull." She shrugs. "I've had both in one week. Twice."`},
  hounds:{d:'The Hounds of Shadow, running, seven of them, and the card is cold to hold.',
    tuft:`Tuft turns it and goes still. "The Hounds," she says. "Running." She does not look out at the grass, very deliberately. "Not for us. Not this time. We'll be quick on our feet, the Deck says. I'd like to be quicker."`,
    sohra:`The bones scatter, all of them, as if something had run through the smoke. Sohra puts the cup down. "Something running," she says. "Many. Not after you." She listens to the grass. "You will be fast. Be fast."`,
    benna:`Benna looks at it and puts her copper back in her own purse. "Not that one," she says. "I'll not take money for that one." Then, because she is Benna: "You'll be light on your feet. Go."`},
  b3c_mason:{d:B3SAY.b3c_mason.d,
    tuft:()=>(S.chapter || 0) >= 7 ? `"The Mason," Tuft says. "A long stone, for a long hole." She looks at the road out of the city, full of people walking. "It's being cut today." She does not say who for.` : `"The Mason," Tuft says. "High House Death, cutting a long stone to fit a long hole." She puts it down carefully. "Kettle will like it. Munitions hit harder. I don't like who it's cutting for."`,
    sohra:`"Someone building a grave," Sohra says. "Slowly, and well." She looks at Kettle's satchel. "What you throw will bite deeper. The bones are not pleased about it."`,
    benna:`"The stone-cutter," says Benna. "Your sapper's lucky week." She looks at the card a moment longer. "Not everyone's."`},
  b2c_soldier:{d:'A soldier in grey armour with no badge on it, standing at a gate with the shield up, and behind the visor something that is not quite a face.',
    tuft:()=>(S.chapter || 0) >= 7 ? `"Soldier of High House Death," Tuft says. "At the gate." She looks at it a long time. "There are more of them at the gate this morning. Not his. Somebody's." Brisk, across the fire, salutes no one in particular.` : `"Soldier of High House Death," Tuft says. "Armour, and a gate behind it." She glances at the wall. "Armour, then. Stand where you're put."`,
    sohra:`"A soldier at a door," Sohra says. "Grey, and standing." She nods at the squad. "Like you. The bones say you will stand harder."`,
    benna:`"The grey soldier," says Benna. "Means you stand where you're put." She looks round the Fourth. "You always did."`},
  b2c_king:{d:'A hooded figure on a grey seat with no back to it, hands folded, and behind it a gate the size of the world.',
    tuft:`Tuft looks at it a long time before she says anything. "The King of High House Death," she says. "His seat." She does not touch it. "It's empty, this morning. I've never seen it empty." She turns it face down. "Hit what's already falling."`,
    sohra:`The bones fall round an empty space, and nothing rolls into it. Sohra stares. "A seat," she says. "No one in it." She sweeps the bones up quickly. "Finish what falls. Do not ask who is not there."`,
    benna:`"Hood's own," says Benna, and for once she does not take the copper. "Means the dead are close." She looks at the card. "Funny. He's not on it."`},
};
const b8CardSay = id => { const s = B8SAY[id], r = b8Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]);
  return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); };

/* per chapter: the writers fill 2..7. Chapter 1 (the winter before the Fete, at the Fourth's door) is the worked example. */
const B8READ = {
  1:{scene:'b8_door', where:'the table by the fire, between the cups', set:'A winter night at the Fourth\'s door in the Gadrobi District, the bar across the door and something on the roof that is not the wind.', back:'b8_c1_fire', backT:'Back to the fire.',
     say:{tuft:'"I know," Tuft says, before anyone has said anything. "I heard it too. Sit down. One card."', sohra:'"The bones do not like this roof," Sohra says. "Sit. Do not breathe on the smoke."',
          benna:'"Copper for the reading," says Benna, "and the bar stays across the door while I do it."'}},
};

function b8ReadChoice(n){ const r = b8Rd();
  return {t:r.id === 'sohra' ? 'Sit with Sohra and the bones.' : `Sit with ${r.mid || r.name} and the Deck.`, deck:true, req:()=>!S.f[`b8_c${n}_drawn`] && !S.f[`b8_c${n}_noCard`], go:`b8_c${n}_read`}; }
function b8ReadOffer(n, card = `b8_c${n}_card`){ const D = B8READ[n] || B8READ[1], r = b8Rd(), seen = S.f['b8_rd_' + r.id];
  return {sp:r.id === 'benna' ? 'Old Benna · a Daru washerwoman' : r.name, scene:D.scene, fx:()=>{ S.f['b8_rd_' + r.id] = 1; }, txt:
`${b8RdWords(r.id, seen)}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:r.id === 'sohra' ? 'Let her throw.' : `Let ${b8RdObj()} draw.`, deck:true, fx:()=>{ S.f[`b8_c${n}_drawn`] = 1; S.f[`b8_c${n}_reader`] = r.id; S.card = dealCard(b8Pool(n)); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b8_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b8ReadCard(n){ const D = B8READ[n] || B8READ[1], r = b8Rd(), pool = b8Pool(n), id = S.card && CARDS[S.card] ? S.card : pool[0], c = CARDS[id];
  return {sp:'The Deck of Dragons', scene:D.scene, txt:r.id === 'sohra' ? `Sohra reads the bones on ${D.where}. Two throws she sweeps away without a word. The third she lets lie.` : `${r.name} lays the reading out on ${D.where}. ${readRefuseLine(b8RdObj())}`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b8CardSay(id), ch:[{t:D.backT, go:D.back}]}; }

/* ---- the tables (21b): one per chapter's reading place ----
   1 the table at the Fourth's door, winter; 2 a wagon's tailboard by the caravan fire; 3 a stone sill in Black Coral under the lamps;
   4 a pilgrim's mat at the camp's edge; 5 the grass of the Lamatath at dusk; 6 a doorstep in the Gadrobi streets, the last night;
   7 the shingle by the lake, the morning after. */
Object.assign(READTABLE, {
  'tth:1':{surf:'wood', p:{base:'#4a3a2a', dark:'#1c140c', planks:4}, light:'fire', lp:[.9, .9], lc:'#ffa050', air:'none', dark:'#0a0806', props:[['cup', .12, .14, 12], ['jug', .86, .84, 14]]},
  'tth:2':{surf:'wood', p:{base:'#5a4a36', dark:'#241c12', planks:3}, light:'fire', lp:[.5, .96], lc:'#ff8a40', air:'sparks', dark:'#0a0806', props:[]},
  'tth:3':{surf:'stone', p:{base:'#2e3038', dark:'#0e1014', cracks:2}, light:'lantern', lp:[.12, .1], lc:'#9ab8ff', air:'none', dark:'#04050a', props:[['lantern', .12, .1, 14]]},
  'tth:4':{surf:'cloth', p:{base:'#5a4a3a', dark:'#241a12', under:{base:'#3a3020', dark:'#18120a', stones:14}, rot:.05, stains:3, stain:'#3a2418', folds:3}, light:'coals', lp:[.5, .96], lc:'#ff6a30', air:'mist', dark:'#08060a', props:[]},
  'tth:5':{surf:'ground', p:{base:'#6a6040', dark:'#2a2414', stones:8, grass:120, grassCol:'#6a6a3a'}, light:'dusk', lp:[.5, 0], lc:'#d09070', air:'dust', dark:'#0e0c0a', props:[]},
  'tth:6':{surf:'stone', p:{base:'#3a3c44', dark:'#121318', cracks:6, edge:1}, light:'fire', lp:[.5, 0], lc:'#ffb060', air:'ash', dark:'#08080a', props:[['knife', .86, .14, 13, .3]]},
  'tth:7':{surf:'ground', p:{base:'#7a7468', dark:'#3a3630', stones:40}, light:'dawn', lp:[.92, .12], lc:'#c8c0c8', air:'mist', dark:'#0a0a0c', props:[]},
});
