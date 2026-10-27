/* ============ Book Four: the Deck of Dragons on the march to Raraku ============
   A reading in every chapter, at the chapter's first halt. The reader is VISREADER (70): Marrow while she is with the squad; else Tallow,
   from his grandmother's deck; else an old soldier of the 9th who reads for the legion and whose name nobody has.
   The novel has no formal reading, so every reading is the squad's own (hoc-canon §12).

   How a chapter uses it (Book Three's pattern, 60c):
     - fill B4DECK[n] from the chapter's own file: {scene, where, set, back, backT, say:{marrow, tallow, oldninth}}
         scene  a SCENES key for the backdrop (70 registers one per reading place: b4_aren_yard, b4_road_fire, b4_feast, b4_seti_fire,
                b4_wall_fire, b4_picket, b4_coral); where  what the cards are laid out on; set  one sentence of time and place;
         back   where the start node was going (a node id, or a function); backT  its button; say  each reader's offer.
     - put b4DeckChoice(n) among the chapter's first halt choices;
     - register two nodes:  b4_c<n>_deck: () => b4DeckOffer(n),  b4_c<n>_card: () => b4DeckCard(n).
   "Let him/her draw" sets S.f.b4_c<n>_drawn = 1 and S.f.b4_c<n>_reader, deals from B4POOL[n] and plays the card screen; "Not now" sets
   S.f.b4_c<n>_noCard = 1. b4_c<n>_card is what 36b's cardNodeName() returns in Book Four.

   The cards are canon Deck cards Books One to Three already hold (their effects are engine-wide and keyed on S.card), and, new this book,
   two of High House Chains: the Knight of Chains and the Leper, both faceless (hoc-canon §10 rule 8: the only Chains cards a reader may lay). */

const B4CARDS = {
  b4c_knightchains:{name:'The Knight of Chains', house:'High House Chains', hue:'#a0705a',
    txt:'A tall figure in a chain hauberk, standing alone on a plain with a broken chain hanging from each wrist. There is no face under the helm. It has not decided whose it is.',
    fx:'A squadmate with no other squadmate beside them hits +2.'},
  b4c_leper:{name:'The Leper', house:'High House Chains', hue:'#8a7a62',
    txt:'A figure in grey rags and bandages, walking a pale road alone with a bell in its hand. There is no face under the wrappings, only the road behind it going pale.',
    fx:'Sorcery never sputters in the dust, but every spell heals or harms 1 less.'},
};
Object.assign(CARDS, B4CARDS);

/* each chapter's pool leans to one card (three of it), with two others (canon Deck cards; the House of Chains only as the Knight and the Leper) */
const B4POOL = {
  1:['b2c_soldier', 'b2c_soldier', 'b2c_soldier', 'oponn', 'obelisk'],                 // Aren: a whole army putting on the dead's bones
  2:['b2c_king', 'b2c_king', 'b2c_king', 'hounds', 'oponn'],                         // Coltaine's Fall: the hill of the dead
  3:['b4c_knightchains', 'b4c_knightchains', 'b4c_knightchains', 'oponn', 'b3c_lifesoldier'], // the Khundryl: the riders who came back
  4:['b2c_queen', 'b2c_queen', 'b2c_queen', 'assassin', 'b2c_mason'],                // the Seti wounded: somebody mends
  5:['assassin', 'assassin', 'assassin', 'obelisk', 'b4c_leper'],                    // the Wall: the Rope is close (Bottle's doll, R22)
  6:['b4c_leper', 'b4c_leper', 'b4c_leper', 'b2c_soldier', 'herald'],                // Pan'arak: the eve
  7:['herald', 'herald', 'herald', 'b4c_knightchains', 'b4c_leper'],                 // Raraku: the door held open for the dead
};

/* ---- the two new cards' effects: engine-wide, keyed on S.card ---- */
const b4Card = k => !!(S && S.card === k && B);
/* the Knight of Chains: a squadmate who fights alone (no other squadmate beside them) hits +2 */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o);
    if (b4Card('b4c_knightchains') && a && a.side === 'p' && !a.ally && !B.units.some(b => b !== a && b.side === 'p' && !b.ally && b.hp > 0 && cheb(a, b) === 1)) c.bonus += 2;
    return c; }; }
/* the Leper: a squadmate's spell (anything that costs strain) heals or harms 1 less; the dust never makes it sputter (70 reads the card) */
{ const _useAb = useAb;
  useAb = function(k, x, y){ const u = B && B.cur, a = AB[k];
    if (!(b4Card('b4c_leper') && a && a.strain && u && u.side === 'p' && !u.ally)) return _useAb(k, x, y);
    const _h = heal, _x = hurt;
    heal = function(t, n){ return _h(t, t && t.side === 'p' && n > 0 ? Math.max(0, n - 1) : n); };
    hurt = function(t, n, crit){ return _x(t, t && t.side === 'e' && n > 0 ? Math.max(1, n - 1) : n, crit); };
    try { return _useAb(k, x, y); } finally { heal = _h; hurt = _x; } }; }
/* a Book Four fight opens with the card's word in the log, whichever card it is */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (S && S.book === 'hoc' && B && B.log && CARDS[S.card] && CARDS[S.card].fx) blog(`<em>${CARDS[S.card].name}:</em> ${CARDS[S.card].fx}`);
    return r; }; }

/* ---- the readers ---- */
const b4Rd = () => visReader();
const b4RdObj = () => b4Rd().he ? 'him' : 'her';
const B4RD_DECK = {
  marrow:`Marrow has her Deck out: the temple deck from Nap, the paint soft at the corners from other people's fingers, that she carried the length of the Chain and never once explained. She reads for the squad at the first halt of a road, as she always has. This year she holds each card a moment before she turns it.`,
  tallow:`Tallow has his grandmother's deck out of its oilcloth: fishing-village cards cut from thin board, the paint worn off the corners by sixty years of thumbs. He lays them the way she did, two down and one up, and his hands are not quite steady, and the squad pretends not to see.`,
  oldninth:`An old soldier of the 9th reads for the legion behind the cook-lines for a finger of rum: a grey man with a soldier's deck that has been to more wars than he has. Nobody knows his name. He has been asked. He says the cards know it, and that is enough people.`,
};
const B4RD_AGAIN = {marrow:'Marrow has the temple deck out.', tallow:'Tallow has the old woman\'s deck out of its oilcloth.', oldninth:'The old soldier has his deck out, and his cup out for the rum.'}; // the deck described once a book, then this
/* per chapter: the scene, where the cards are laid out, a line of time and place, where the start node was going (back/backT), and each reader's offer.
   Chapter writers fill B4DECK[2..7] from their own files (READTABLE['hoc:n'] already has the table for each place); this is Chapter One's, as the worked example. */
const B4DECK = {
  1:{scene:'b4_aren_yard', where:'an upturned crate in the barracks yard', set:'Night in Aren, two days before the march, and the yard full of recruits who cannot sleep.',
    back:()=>startExplore(), backT:'Back to the yard.',
    say:{marrow:`"A new army," she says. "I read for the old one from Hissar to here. Sit, child. One card, for a road we've walked once already."`,
      tallow:`"My grandmother read for the boats the night before they went out," he says. "I don't know if it's the same for armies." He shuffles badly. "One card, Sergeant?"`,
      oldninth:`"Third squad," the old soldier says. "The Chain lot. Sit, then. Rum after, if you've any. One card. The Deck's kind to the ones who've already paid."`}},
};
/* each card, said by each reader */
const B4SAY = {
  b2c_soldier:{d:'A soldier in grey armour with no badge on it, standing at a gate with the shield up, and behind the visor something that is not quite a face.',
    marrow:`"Soldier of High House Death," Marrow says. "I drew him on the Chain, child, more than once." She taps the visor. "Every one of them wearing a dead man's bone this week. The Deck's noticed."`,
    tallow:`"Grandmother said this one came up before a storm," Tallow says. "She'd tell them to tie everything down." He looks at the finger bone on his own thong. "I think we're tied down."`,
    oldninth:`"Death's soldier," says the old man. "Armour, Sergeant. It means armour. The whole legion's got a dead man round its neck, and the Deck says that's a kind of mail." He drinks.`},
  oponn:{d:'The jesters of chance, back to back, and a coin in the air between them.',
    marrow:`"The Twins," Marrow says. "The Lady's pulling, for now." She leaves the card face up. "Don't thank her, child. She hears."`,
    tallow:`"It's always the Twins," Tallow says, too quickly. "That's what she used to say. When you need them and when you don't." He looks at the coin a long breath, and then puts it down.`,
    oldninth:`"Luck," says the old soldier. "Twins. I had them before my first battle and I'm still here." He shrugs. "So's half my company. The other half had them too."`},
  obelisk:{d:'A standing stone, unaligned and older than anyone\'s gods.',
    marrow:`"Something endures," Marrow says. "The priests said that one meant the patient would live, and not to be too pleased about it."`,
    tallow:`"The stone," Tallow says. "She'd give that one to the old men. It means you'll last." He puts it down carefully, like something heavy.`,
    oldninth:`"Obelisk. You'll last," the old soldier says. "Don't know about the rest of them." He nods at the yard full of recruits. "You'll last."`},
  b2c_king:{d:'A hooded figure on a grey seat with no back to it, hands folded, and behind it a gate with the dead walking through, unhurried.',
    marrow:`Marrow looks at it for a while. "The King of High House Death," she says. "On a hill with his dead round him." She does not turn toward the Fall. "We know the hill, child."`,
    tallow:`"The hooded man," Tallow says. "Grandmother turned this one face down and wouldn't read it." He doesn't turn it face down. He has decided to be braver than her, tonight.`,
    oldninth:`"Hood's own," the old soldier says, and touches his bone. "Means the dead are close. Means hit what's already falling." He looks up the road at the hill. "They're close, all right."`},
  hounds:{d:'Seven shapes running under a moon that isn\'t there.',
    marrow:`"Shadow's dogs," Marrow says. "They ran through Seven Cities last summer. The Wickans saw the tracks." She puts the card away quickly. "Walk quick on the road, child."`,
    tallow:`"Dogs," Tallow says, and looks at the dark past the fire. "Grandmother said they came for the ones who were lost at sea." He laughs. "We're not at sea."`,
    oldninth:`"Hounds," the old man says. "Keep moving, that one means. It always means keep moving." He drinks. "The Adjunct's already got us moving."`},
  b4c_knightchains:{d:B4CARDS.b4c_knightchains.txt,
    marrow:()=>`Marrow holds it a while before she turns it to the squad. "I don't know this one, child," she says. "Chains. A House I've never laid." She runs her thumb along the broken chain at the wrist. "A knight who stands on his own. Whoever he is, he hasn't said yes to it."`,
    tallow:`Tallow stares at it. "This wasn't in her deck," he says. "I know every card in her deck." He turns it over. The back is the same as all the others. "It wasn't," he says again, quieter.`,
    oldninth:`The old soldier puts his cup down. "Never had that," he says. "Forty years." He looks at the empty helm. "Something new in the Deck. Fights alone, by the look." He doesn't take the rum.`},
  b3c_lifesoldier:{d:'A soldier in plain mail with a shield on one arm and a bandage in the other hand, kneeling over somebody you cannot see.',
    marrow:`"High House Life," Marrow says, surprised and trying not to be. "Things mend, this road. Better than they should." She ties a knot in her string, for luck, which she has never done.`,
    tallow:`"The kneeling soldier," Tallow says. "That's a good one. She'd give that to the boats that had a sick man aboard." He looks at Marrow, if she is there, and then at his own hands.`,
    oldninth:`"Life's soldier," says the old man. "Healer's card. You've a healer? Tell them the Deck says they'll be busy."`},
  b2c_queen:{d:'A woman seated in a garden at night, her face veiled, a cup overflowing in her lap, and the water running into dry ground that goes green where it touches.',
    marrow:`"The Queen of High House Life," Marrow says. "Water in a dry place." She looks over at the wounded under their blankets. "There's mending to do here, child. The Deck agrees."`,
    tallow:`"The veiled lady with the cup," Tallow says. "Grandmother said it meant a good catch." He frowns. "I don't know what it means in a desert. Water, maybe."`,
    oldninth:`"The Queen with the cup," the old soldier says. "Heals heal more. The Seti could use her." He pours a drop of rum on the ground for them, which is generous.`},
  assassin:{d:'A figure half in shadow, rope and knives, at the edge of the card.',
    marrow:`"High House Shadow's Assassin," Marrow says. "The Rope." She looks out at the Wall. "Somebody close is walking where we can't see him." She lays the card face down. "Watch the gaps, child."`,
    tallow:`"The rope man," Tallow says. "She hated this one. She said it meant someone in the boat you didn't know." He looks round the squad, slowly, as if counting.`,
    oldninth:`"Shadow's knife," says the old man. "Hit hard, hit where it hurts. You'll get your blows in clean, this one says." He grins. "So will they, if they've drawn it too."`},
  b2c_mason:{d:'A broad, bent figure in a dusty apron with a mallet and a chisel, cutting a long stone to fit a long hole.',
    marrow:()=>b4In('tangle') ? `"The Mason," Marrow says, and slides the card across the fire to Tangle without a word. Tangle looks at it, and hums his four notes, and stops.` : `"The Mason of High House Death," Marrow says. "What we throw lands heavy this road."`,
    tallow:`"The mason," Tallow says. "He builds the houses for the dead." He looks at the sapper's satchel. "Is that us?"`,
    oldninth:`"Mason," says the old soldier. "You've a sapper? Course you have. Tell him it's his road."`},
  b4c_leper:{d:B4CARDS.b4c_leper.txt,
    marrow:()=>`"Chains again," Marrow says. "The Leper. Walks through the bad places and catches nothing." She holds her own hand up to the dust in the air. "The warren won't choke on the sand, child. It won't give as much, either. A fair trade, the priests would say."`,
    tallow:`"The bell," Tallow says. "He rings it so you know he's coming." He listens, for a moment, to the dust hissing past the fire. "I can't hear it."`,
    oldninth:`"New one, that," the old man says. "Leper. Chains." He taps the bandaged head. "Your mages want to hear it. Sand won't foul them. Won't give them much either." He drinks, then, a lot.`},
  herald:{d:'A grey figure with its face turned away, holding a door open for somebody you cannot see.',
    marrow:`"The Herald," Marrow says. "High House Death, holding the door." She looks out over the dark toward the trenches. "Somebody is coming through it tonight, child. Not us. Not if I can help it."`,
    tallow:`"The door man," Tallow says. "She said that one means the dead come home." He tries to say it lightly. It does not come out lightly.`,
    oldninth:`"Herald," says the old soldier, and he is not drinking now. "The door's open. One of you goes down and gets up again." He looks round the squad. "Don't ask me which. I never know which."`},
};
const b4CardSay = id => { const s = B4SAY[id], r = b4Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]); return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); };
/* the card screen in Book Four: the reader's captions and the card's words (21). The other books keep theirs (47c, 60c). */
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => { if (!(S && S.book === 'hoc')) return _cb ? _cb.txt(id) : ((CARDS[id] && CARDS[id].txt) || ''); const s = B4SAY[id]; return s ? s.d : ((CARDS[id] && CARDS[id].txt) || ''); },
    cap(t, self, second){ if (!(S && S.book === 'hoc')) return _cb ? _cb.cap(t, self, second) : '';
      const r = b4Rd(), n = r.name;
      const first = {marrow:'Marrow shuffles the temple deck, slowly.', tallow:'Tallow shuffles the way his grandmother did, badly.', oldninth:'The old soldier shuffles one-handed.'}[r.id] || `${n} shuffles.`;
      const three = {marrow:'The temple cross, and the card in the middle.', tallow:'Two down, one up.', oldninth:'Three cards, and the rum beside them.'}[r.id] || 'Three cards.';
      if (second) return t < 1500 ? `${n} gathers it back in.` : t < 2900 ? `Again. It lets ${b4RdObj()}, mostly.` : t < 4900 ? '' : t < 5800 ? 'Another comes up.' : '';
      return t < 1500 ? first : t < 2900 ? three : t < 3900 ? `The first refuses ${b4RdObj()}.` : t < 4900 ? `The second refuses ${b4RdObj()}.` : t < 5800 ? 'The third does not.' : ''; },
  }; }

/* ---- the chapter's reading: a choice on the chapter's first halt, the offer, and the card ---- */
function b4DeckChoice(n){ const r = b4Rd();
  return {t:`Sit with ${r.mid || r.name} and the Deck.`, deck:true, req:()=>!S.f[`b4_c${n}_drawn`] && !S.f[`b4_c${n}_noCard`], go:`b4_c${n}_deck`}; }
function b4DeckOffer(n, card = `b4_c${n}_card`){ const D = B4DECK[n] || B4DECK[1], r = b4Rd(), seen = S.f['b4_rd_' + r.id];
  return {sp:r.id === 'oldninth' ? 'The old soldier · the 9th' : r.name, scene:D.scene, fx:()=>{ S.f['b4_rd_' + r.id] = 1; }, txt:
`${(seen ? B4RD_AGAIN[r.id] : B4RD_DECK[r.id]) || ''}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:`Let ${b4RdObj()} draw.`, deck:true, fx:()=>{ S.f[`b4_c${n}_drawn`] = 1; S.f[`b4_c${n}_reader`] = r.id; S.card = dealCard(B4POOL[n] || B4POOL[1]); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b4_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b4DeckCard(n){ const D = B4DECK[n] || B4DECK[1], r = b4Rd(), pool = B4POOL[n] || B4POOL[1], id = S.card && CARDS[S.card] ? S.card : pool[0], c = CARDS[id];
  return {sp:'The Deck of Dragons', scene:D.scene, txt:`${r.name} lays the reading out on ${D.where}. Two cards refuse ${b4RdObj()}. The third does not.`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b4CardSay(id),
    ch:[{t:D.backT, go:D.back}]}; }

/* ---- the tables (21b): one per chapter's reading place ----
   1 the 9th Legion's barracks yard in Aren at night; 2 a fire off the Aren Way below Coltaine's Fall; 3 the Khundryl feast fires in the
   road to the Vathar; 4 the wounded Seti's fire in the column's camp; 5 a fire short of the Whirlwind Wall; 6 the picket line before Pan'arak;
   7 the coral island after the flood. */
Object.assign(READTABLE, {
  'hoc:1':{surf:'stone', p:{base:'#5a5248', dark:'#2a2620', flags:1}, light:'lantern', lp:[.12, .1], lc:'#ffc070', air:'none', dark:'#0a0908', props:[['lantern', .12, .1, 14], ['cup', .86, .16, 12]]},
  'hoc:2':{surf:'ground', p:{base:'#6a5a40', dark:'#2e2618', stones:30, ash:140, cracks:4}, light:'fire', lp:[.9, .92], lc:'#ff9a40', air:'sparks', dark:'#0e0a06', props:[]},
  'hoc:3':{surf:'hide', p:{base:'#7a5a3a', dark:'#3a2818', under:{base:'#4a4030', dark:'#221c12', stones:30}}, light:'fire', lp:[.1, .9], lc:'#ff8a30', air:'sparks', dark:'#0c0806', props:[['winecup', .86, .14, 14], ['jug', .9, .82, 16]]},
  'hoc:4':{surf:'cloth', p:{base:'#4a4038', dark:'#201a14', under:{base:'#5a4e3c', dark:'#2a2418', stones:20}, rot:.05, stains:6, stain:'#4a1a14', folds:3}, light:'coals', lp:[.5, .96], lc:'#ff6a30', air:'ash', dark:'#0a0806', props:[['helm', .88, .18, 16]]},
  'hoc:5':{surf:'ground', p:{base:'#8a7650', dark:'#4a3a24', stones:12, cracks:2}, light:'fire', lp:[.1, .12], lc:'#ffa050', air:'dust', dark:'#120e08', props:[]},
  'hoc:6':{surf:'shield', p:{base:'#5a5044', dark:'#2a2420', under:{base:'#7a6a4a', dark:'#3a3020', stones:20}}, light:'dusk', lp:[.5, 0], lc:'#c08060', air:'dust', dark:'#0e0a08', props:[]},
  'hoc:7':{surf:'stone', p:{base:'#b8a898', dark:'#5a5048', cracks:5, lichen:14}, light:'dawn', lp:[.9, .1], lc:'#d8c8c0', air:'mist', dark:'#0e0c0c', props:[]},
});
/* the decks' backs: Tallow's grandmother's fishing-village deck; the old soldier's deck that has been to more wars than he has */
Object.assign(DECKBACK, {
  tallow(ctx, W, H){ // thin board, a faded sea-blue wash, a hand-drawn boat and two fish, the corners worn to the wood
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#5a7a86'); g.addColorStop(1, '#3a5662'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    [[0, 0], [W, 0], [0, H], [W, H]].forEach(([x, y], i) => glow(ctx, x, y, W * (.28 + hash(i, 1, 111) * .12), '#c8b48a', .55)); // the wood showing through at the corners
    ctx.strokeStyle = 'rgba(230,220,190,.55)'; ctx.lineWidth = W * .014; ctx.strokeRect(W * .08, H * .055, W * .84, H * .89);
    const cx = W / 2, cy = H * .5, s = W * .26; ctx.strokeStyle = '#e8dcc0'; ctx.lineWidth = W * .02; ctx.beginPath(); ctx.moveTo(cx - s, cy); ctx.quadraticCurveTo(cx, cy + s * .55, cx + s, cy); ctx.stroke(); // the hull
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - s * 1.2); ctx.stroke(); poly(ctx, [[cx + W * .01, cy - s * 1.1], [cx + s * .8, cy - s * .2], [cx + W * .01, cy - s * .2]], 'rgba(232,220,192,.8)'); // mast and sail
    for (let i = 0; i < 2; i++) { const fy = H * (.76 + i * .07), fx = cx + (i ? s * .4 : -s * .4); ell(ctx, fx, fy, W * .07, W * .025, 'rgba(232,220,192,.7)'); poly(ctx, [[fx + W * .06, fy], [fx + W * .1, fy - W * .03], [fx + W * .1, fy + W * .03]], 'rgba(232,220,192,.7)'); } // two fish
    ctx.strokeStyle = 'rgba(232,220,192,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(W * .12, H * (.2 + i * .03)); ctx.quadraticCurveTo(W * .5, H * (.18 + i * .03), W * .88, H * (.2 + i * .03)); ctx.stroke(); } }, // the sea, in four brush lines
  oldninth(ctx, W, H){ // a soldier's deck: sand-bleached leather brown, a cracked varnish, a finger bone burnt into the middle
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#7a6448'); g.addColorStop(1, '#4a3a28'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 26; i++) { ctx.strokeStyle = 'rgba(30,20,10,.35)'; ctx.lineWidth = .8; const x = hash(i, 1, 112) * W, y = hash(i, 2, 112) * H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (hash(i, 3, 112) - .5) * W * .3, y + (hash(i, 4, 112) - .5) * H * .2); ctx.stroke(); } // the varnish, cracked
    ctx.strokeStyle = '#2a1e12'; ctx.lineWidth = W * .025; ctx.strokeRect(W * .07, H * .05, W * .86, H * .9);
    const cx = W / 2, cy = H / 2; ell(ctx, cx, cy, W * .24, W * .24, 'rgba(30,20,10,.45)');
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.5); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-W * .03, -W * .17, W * .06, W * .34); ell(ctx, 0, -W * .17, W * .05, W * .04, '#d8ccb0'); ell(ctx, 0, W * .17, W * .05, W * .04, '#d8ccb0'); ctx.restore(); // the bone
    ctx.strokeStyle = '#2a1e12'; ctx.lineWidth = W * .012; ctx.beginPath(); ctx.moveTo(cx - W * .2, cy - W * .2); ctx.quadraticCurveTo(cx, cy - W * .32, cx + W * .2, cy - W * .2); ctx.stroke(); }, // its thong
});
Object.assign(SPREADS, {
  step3:{slots:[{dx:-1.1, yy:.3, rot:-.06, flip:2900}, {dx:-1.1, yy:.62, rot:.05, flip:3900}, {dx:.6, yy:.44, rot:0, ans:1}]},   // Tallow: two down the left, the one that answers beside them, as the old woman laid them
  pair3:{slots:[{dx:-.3, yy:.6, rot:-.45, flip:2900}, {dx:.3, yy:.6, rot:.45, flip:3900}, {dx:0, yy:.3, rot:0, ans:1}]},       // the old soldier: two crossed on the ground, the answer above
});
Object.assign(READER_SPREAD, {tallow:'step3', oldninth:'pair3'});
Object.assign(TBL_KIT, {
  tallow(ctx, x, y, CW){ TBL_PROP.sacking(ctx, x + CW * .5, y - CW * .7, CW * .9); }, // the oilcloth the deck lives in
  oldninth(ctx, x, y, CW){ TBL_PROP.cup(ctx, x - CW * .9, y - CW * .3, CW * .22); }, // the rum
});
