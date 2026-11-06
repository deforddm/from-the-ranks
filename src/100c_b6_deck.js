/* ============ Book Six: the Deck of Dragons, read by each squad's own reader (v9.0, 100c) ============
   The Third reads as in Book Four (70c): Marrow while she walks, else Tallow, else the old soldier of the 9th. The Fourth reads as in
   Book Three (60c): Tuft, else Sohra, else old Benna. b6As(fn) runs fn with S.book set to the squad's own book for a moment, so the reader
   chain (VISREADER), the card screen's captions (CARDBOOK) and the cards' words (B3SAY, B4SAY) are each book's own, unchanged.
   The cards are canon Deck cards the earlier books already hold; their effects are engine-wide and keyed on S.card.

   How a chapter uses it (Book Four's pattern):
     - fill B6DECK[n] from the chapter's file: {scene, where, set, back, backT, say:{<reader id>:'…'}}
     - put b6DeckChoice(n) among the chapter's first halt choices;
     - register two nodes:  b6_c<n>_deck: () => b6DeckOffer(n),  b6_c<n>_card: () => b6DeckCard(n).
   "Let him/her draw" sets S.f.b6_c<n>_drawn = 1 and S.f.b6_c<n>_reader; "Not now" sets S.f.b6_c<n>_noCard = 1. */

function b6As(fn){ if (!b6On()) return fn(); const was = S.book; S.book = B6_TH[b6Thread()].book;
  try { return fn(); } finally { S.book = was; } }
{ const _vr = VISREADER; VISREADER = () => b6On() ? b6As(() => _vr ? _vr() : null) : (_vr ? _vr() : null); }
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => b6On() ? b6As(() => _cb.txt(id)) : _cb.txt(id),
    cap(t, self, second){ return b6On() ? b6As(() => _cb.cap(t, self, second)) : _cb.cap(t, self, second); },
  };
  ['square', 'done', 'look'].forEach(k => { if (_cb && typeof _cb[k] === 'function') CARDBOOK[k] = (...a) => b6On() ? b6As(() => _cb[k](...a)) : _cb[k](...a); }); }

/* each chapter's pool leans to one card (three of it), with two others. The Third's chapters draw from Book Four's deck, the Fourth's from Book Three's. */
const B6POOL = {
  1:['b2c_soldier', 'b2c_soldier', 'b2c_soldier', 'oponn', 'herald'],            // the Lato Odhan: an army on the march to an old city of the dead
  2:['b3c_leper', 'b3c_leper', 'b3c_leper', 'b3c_obelisk', 'b3c_knight'],         // the north coast: the plague walks the roads
  3:['herald', 'herald', 'herald', 'b4c_knightchains', 'b2c_soldier'],            // Y'Ghatan: the door held open
  4:['b3c_consort', 'b3c_consort', 'b3c_consort', 'b3c_leper', 'b3c_gate'],       // G'danisban: a goddess in the city
  5:['b2c_queen', 'b2c_queen', 'b2c_queen', 'oponn', 'b4c_leper'],                // the Kokakal shore: somebody mends; the survivors walk in
  6:['b3c_gate', 'b3c_gate', 'b3c_gate', 'b3c_obelisk', 'b3c_kingchains'],        // the falling sky
  7:['b4c_knightchains', 'b4c_knightchains', 'b4c_knightchains', 'assassin', 'b2c_king'], // Malaz City
};
const b6Pool = n => (B6POOL[n] || B6POOL[1]).filter(id => CARDS[id]);
const b6Rd = () => visReader();
const b6RdObj = () => b6Rd().he ? 'him' : 'her';
const b6RdWords = (id, again) => b6Thread() === 'r' ? ((again ? B4RD_AGAIN : B4RD_DECK)[id]) : ((again ? B3RD_AGAIN : B3RD_DECK)[id]);
/* Book Six's own card words (Nov 6, David: the readers spoke of Raraku and of Pale). The descriptions stay their books';
   the lines are new, for the Lato Odhan, Y'Ghatan, the Kokakal shore and the sea (the Third), and the north coast, G'danisban and the
   night road to Hanar Ara (the Fourth). 'oldninth' is the 9th's old soldier; 'benna' is old Benna, who came along with the Host's baggage. */
const B6SAY_R = {
  b2c_soldier:{d:B4SAY.b2c_soldier.d,
    marrow:`"Soldier of High House Death," Marrow says. "Armour, child, with a dead man's bone hung on it." She looks at the bones on the squad's own thongs, and then away. "The Deck's noticed what we wear now."`,
    tallow:`"The grey soldier," Tallow says. "Grandmother said he came up before a long watch." He looks along the column, at the dust, at the old city somewhere under it. "It's a long watch."`,
    oldninth:`"Death's soldier," says the old man. "Means you stand where you're put and you don't burn." He drinks. "Mind the second part."`},
  oponn:{d:B4SAY.oponn.d,
    marrow:()=>(S.chapter || 0) >= 5 ? `"The Twins," Marrow says. "The coin's in the air." She leaves the card face up. "Somebody walked out of the ground who shouldn't have, child. Don't spend that kind of luck twice."` : `"The Twins," Marrow says. "The coin's in the air, and Leoman's under it with us." She leaves the card face up. "Don't thank them, child. They hear."`,
    tallow:()=>(S.chapter || 0) >= 5 ? `"It's always the Twins," Tallow says. "When you need them and when you don't." He looks at the sea. "We needed them."` : `"It's always the Twins," Tallow says, too quickly. "When you need them and when you don't." He looks down the road into the dust. "We'll need them."`,
    oldninth:()=>(S.chapter || 0) >= 5 ? `"Luck," the old soldier says. "Had it at Y'Ghatan. So did the ones who came up out of the ground." He shrugs. "Some of the ones under it had it too, once."` : `"Luck," the old soldier says. "Twins. Had them before my first siege and I'm still here." He shrugs. "So's half my company."`},
  herald:{d:B4SAY.herald.d,
    marrow:()=>(S.chapter || 0) >= 3 ? `"The Herald," Marrow says. "High House Death, holding the door." She looks at the smoke where the city's walls were. "Somebody went through it in there, child. More than somebody."` : `"The Herald," Marrow says. "High House Death, holding the door." She looks down the road toward the old city. "It's open where we're going, child. I'd rather it shut."`,
    tallow:()=>(S.chapter || 0) >= 3 ? `"The door man," Tallow says. "She said that one means the dead come home." He looks at the new barrow, and does not say anything else.` : `"The door man," Tallow says. "She said that one means the dead come home." He tries to say it lightly. It does not come out lightly.`,
    oldninth:()=>(S.chapter || 0) >= 3 ? `"Herald," says the old man, and he isn't drinking now. "Door's open. One of you goes down and gets up again." He looks at the smoke. "Somebody in there got up. Don't ask me who."` : `"Herald," says the old man, and he isn't drinking now. "Door's open. One of you goes down and gets up again." He looks round the squad. "Never know which."`},
  b4c_knightchains:{d:B4SAY.b4c_knightchains.d,
    marrow:()=>`Marrow holds it a while. "Chains again," she says. "A knight on his own, and I still don't know the House." She turns it to the squad. "Whoever he is, child, he's closer than he was at Raraku."`,
    tallow:`"The one that wasn't in her deck," Tallow says. He turns it over and back. "It keeps coming up." It isn't a question, and nobody answers it.`,
    oldninth:()=>(S.chapter || 0) >= 7 ? `"That new one," the old man says. "Fights alone." He looks out at the grey water. "Not much choice about that, out here."` : `"That new one," the old man says. "Fights alone." He looks at the barrows. "Some of them in there did."`},
  b2c_queen:{d:B4SAY.b2c_queen.d,
    marrow:`"The Queen of High House Life," Marrow says. "Water into dry ground." She looks at the burned ones laid out on the sand, and at the healers moving between them. "There's mending, child. The Deck says it takes."`,
    tallow:`"The lady with the cup," Tallow says. "A good catch, Grandmother said." He looks down the beach at the ones who walked in. "Best catch I've seen."`,
    oldninth:`"Queen with the cup," the old soldier says. "Healers heal more." He pours a drop on the sand for them. "They'll be busy. Tell them so."`},
  b4c_leper:{d:B4SAY.b4c_leper.d,
    marrow:()=>`"The Leper," Marrow says. "Walks through the bad places and catches nothing." She looks inland, toward the sickness on the roads. "Your mages walk clean, child. Not as far."`,
    tallow:`"The bell," Tallow says. "So you know he's coming." He listens to the surf a while. "I'd rather hear him than not."`,
    oldninth:`"Leper," the old man says. "Chains." He taps his temple. "Mages walk clean, but they walk short." He drinks, a lot.`},
  assassin:{d:B4SAY.assassin.d,
    marrow:`"The Rope," Marrow says. "Somebody walking where nobody sees him." She looks west, where the old capital is, somewhere past the grey. "Where we're going, child, that's everybody. Watch the gaps."`,
    tallow:`"The rope man," Tallow says. "A stranger in the boat." He looks round the squad, slowly, counting, and gets the right number, and looks relieved.`,
    oldninth:`"Shadow's knife," says the old man. "We're for Malaz City. Course it is." He grins without much in it. "Back to a wall and purse in your boot, when we land."`},
  b2c_king:{d:B4SAY.b2c_king.d,
    marrow:`Marrow looks at it a while. "The King of High House Death," she says. "On his seat, with his dead round him." She looks at the fleet strung out behind. "We've given him enough this year, child. Let him wait."`,
    tallow:`"The hooded man," Tallow says. "She wouldn't read him." He reads him. "He means somebody's done," he says. "Not who."`,
    oldninth:`"Hood's own," the old man says, and touches his bone. "Means the dead are close." He looks over the side. "Close enough. It's a deep sea."`},
};
const B6SAY_F = {
  b3c_leper:{d:B3SAY.b3c_leper.d,
    tuft:()=>`"The Leper," Tuft says. "House of Chains." She looks out at the rain and the roads with the sick on them. "It walks through the bad places and doesn't catch anything." ${b3In('ohl') ? 'She glances at Ohl.' : 'She looks at her own hands.'} "The warrens won't fail us in this, then. They won't give as much, either."`,
    sohra:`"Someone walking alone through sickness," Sohra says, "and not sickening." She sniffs the wet air, and makes a face. "Your mages will walk through this. Thinner. The bones say both."`,
    benna:`"Leper," says Benna. "Rings a bell so you'll know he's coming." She looks at the surgeons' tents. "Half the country's ringing one. Your mages'll be all right. Won't give much, mind."`},
  b3c_obelisk:{d:B3SAY.b3c_obelisk.d,
    tuft:()=>(S.chapter || 0) >= 6 ? `"Obelisk," Tuft says. "Something endures." She touches the frost painted on its side, then looks up at the lights coming down. "Something. I'd like to know what."` : `"Obelisk," Tuft says. "Something endures." She touches the frost painted on its side, and looks out at the rain on the sea. "Something. I'd like to know what."`,
    sohra:`"A standing stone," Sohra says. "On a strange plain it is still a stone. You can still lean on it." She sets one bone upright in the dirt and leaves it there. "For the bad nights."`,
    benna:`"The stone," says Benna. "Means you'll last." She looks at the long column behind. "Long way from Pale to last in. You'll do it anyway."`},
  b3c_knight:{d:B3SAY.b3c_knight.d,
    tuft:`"High House Dark," Tuft says. "He was over Pale, and then over Darujhistan." She turns the card to the grey sea. "He's a long way from here now. He's still looking at something we can't see."`,
    sohra:`"The tall one with the sword," Sohra says. "The bones say he is far, over the water." She frowns at them. "They also say you will hit hard. They are allowed two things."`,
    benna:`"Him," says Benna. "Had him come up every week at Pale. Hits hard, the first time." She looks at the rain. "After that you're on your own. Same as at home."`},
  b3c_consort:{d:B3SAY.b3c_consort.d,
    tuft:`"Chains again," Tuft says. "The one beside the King. Smiling." She puts it face down quickly, and looks at the city's walls in the rain. "Somebody close to that one is close to here. I don't like the way it smiles."`,
    sohra:`"Someone at the bound one's side," Sohra says. "Close. Fond." She wrinkles her nose at the smell off the city. "She is near, the bones say. Watch the ones who step in close."`,
    benna:`"The Consort," says Benna, and sniffs. "Chains. Means the ones who swing at your back miss." She looks at the walls. "Stand together. Stand upwind, too, if you can."`},
  b3c_gate:{d:B3SAY.b3c_gate.d,
    tuft:`Tuft looks at it a long time. "Hood's gate," she says. "Open. A figure in the doorway, deciding." She lays her hand flat over it. "This country keeps him busy. Not deciding against us. Not yet."`,
    sohra:`The bones fall in two lines and a bar across them. Sohra goes still. "A door," she says. "The dead stand in it. Many of them, here." She looks up. "They will decide for you once. Once."`,
    benna:`"Hood's door," says Benna, flat. "One of you goes down and gets up again." She looks round the squad. "Don't ask which. I don't do which."`},
  b3c_kingchains:{d:B3SAY.b3c_kingchains.d,
    tuft:`Tuft still doesn't touch it. "The King in Chains," she says. "A year ago I didn't know this card." She looks at the lights falling slow across the sky. "Now it comes up more than the ones I grew up with."`,
    sohra:`The bones fall in a line that runs off the hide and keeps going, toward the lights in the sky. Sohra watches it go. "Bound," she says. "Bound, and not resting. And far from where we left him." She does not like that.`,
    benna:`Benna looks at the card a long time. "That one again," she says. "Followed us across the sea." She doesn't take the copper.`},
};
const b6CardSay = id => { const r6 = b6Thread() === 'r'; return b6As(() => { const s = (r6 ? (B6SAY_R[id] || B4SAY[id]) : (B6SAY_F[id] || B3SAY[id])), r = b6Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]);
  return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); }); };

/* per chapter: the writers fill 2..7 (Chapter 1's is the worked example, the Lato Odhan's first night) */
const B6DECK = {
  1:{scene:'b6_odhan_night', where:'a flat stone by the cook-fire', set:'The Fourteenth\'s first night camp on the Lato Odhan, with Leoman somewhere ahead of it.', back:'b6_c1_fire', backT:'Back to the fire.',
     say:{marrow:'"Y\'Ghatan," Marrow says, before she has turned a card. "I know. Sit down."', tallow:'"My grandmother said never read on the road to a city of the dead," Tallow says. "She said a lot of things."',
          oldninth:'"One finger of rum," the old soldier says. "Two if it\'s Y\'Ghatan. It\'s Y\'Ghatan."'}},
};

function b6DeckChoice(n){ const r = b6Rd();
  return {t:`Sit with ${r.mid || r.name} and the Deck.`, deck:true, req:()=>!S.f[`b6_c${n}_drawn`] && !S.f[`b6_c${n}_noCard`], go:`b6_c${n}_deck`}; }
function b6DeckOffer(n, card = `b6_c${n}_card`){ const D = B6DECK[n] || B6DECK[1], r = b6Rd(), seen = S.f['b6_rd_' + r.id];
  return {sp:r.mid ? r.name : r.name, scene:D.scene, fx:()=>{ S.f['b6_rd_' + r.id] = 1; }, txt:
`${b6RdWords(r.id, seen) || ''}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:`Let ${b6RdObj()} draw.`, deck:true, fx:()=>{ S.f[`b6_c${n}_drawn`] = 1; S.f[`b6_c${n}_reader`] = r.id; S.card = dealCard(b6Pool(n)); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b6_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b6DeckCard(n){ const D = B6DECK[n] || B6DECK[1], r = b6Rd(), pool = b6Pool(n), id = S.card && CARDS[S.card] ? S.card : pool[0], c = CARDS[id];
  return {sp:'The Deck of Dragons', scene:D.scene, txt:`${r.name} lays the reading out on ${D.where}. ${readRefuseLine(b6RdObj())}`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b6CardSay(id), ch:[{t:D.backT, go:D.back}]}; }
/* a Book Six fight opens with the card's word in the log */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (b6On() && B && B.log && CARDS[S.card] && CARDS[S.card].fx) blog(`<em>${CARDS[S.card].name}:</em> ${CARDS[S.card].fx}`);
    return r; }; }

/* ---- the tables (21b): one per chapter's reading place ----
   1 a fire on the Lato Odhan; 2 a wet camp on the north coast; 3 the barrow field outside Y'Ghatan the night after; 4 a tent before G'danisban in
   the rain; 5 the Kokakal shore by the transports; 6 the Host's column halted under a burning sky; 7 a transport's deck at sea. */
Object.assign(READTABLE, {
  'bh:1':{surf:'ground', p:{base:'#8a7650', dark:'#4a3a24', stones:24, cracks:3}, light:'fire', lp:[.9, .9], lc:'#ffa050', air:'sparks', dark:'#100c08', props:[['cup', .12, .14, 12]]},
  'bh:2':{surf:'cloth', p:{base:'#4a4a44', dark:'#22221e', under:{base:'#4a4436', dark:'#201c14', stones:16}, rot:.04, folds:3}, light:'lantern', lp:[.12, .1], lc:'#ffc070', air:'mist', dark:'#0a0a0a', props:[['lantern', .12, .1, 14]]},
  'bh:3':{surf:'ground', p:{base:'#5a4a3a', dark:'#2a2018', stones:30, ash:200, cracks:5}, light:'coals', lp:[.5, .96], lc:'#ff6a30', air:'ash', dark:'#0a0806', props:[]},
  'bh:4':{surf:'cloth', p:{base:'#3e4038', dark:'#1c1e1a', under:{base:'#3a3a30', dark:'#1a1a14', stones:10}, rot:.06, stains:4, stain:'#2a2a20', folds:4}, light:'lantern', lp:[.88, .12], lc:'#ffc070', air:'none', dark:'#08090a', props:[['lantern', .88, .12, 14], ['helm', .12, .84, 16]]},
  'bh:5':{surf:'ground', p:{base:'#a89a7a', dark:'#5a5040', stones:10}, light:'dusk', lp:[.5, 0], lc:'#d09070', air:'dust', dark:'#120e0c', props:[]},
  'bh:6':{surf:'shield', p:{base:'#5a5044', dark:'#2a2420', under:{base:'#5a4e3a', dark:'#2a2418', stones:18}}, light:'fire', lp:[.5, 0], lc:'#ffb060', air:'sparks', dark:'#0c0806', props:[]},
  'bh:7':{surf:'stone', p:{base:'#6a5a46', dark:'#2e261c', cracks:2}, light:'lantern', lp:[.12, .1], lc:'#ffc070', air:'mist', dark:'#0a0a0c', props:[['lantern', .12, .1, 14], ['jug', .88, .84, 14]]},
});
