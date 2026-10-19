/* ============ Book Three: the Deck of Dragons on the road south ============
   A reading in every chapter, at the chapter's first halt. The reader is VISREADER (60): Tuft, else Sohra (bones and smoke, the Rhivi
   way; the same cards come up), else Old Benna, a Host laundress who reads for coppers.

   How a chapter uses it (Book Two's pattern, 47c):
     - fill B3DECK[n] from the chapter's own file: {scene, where, set, back, backT, say:{tuft, sohra, benna}}
         scene  a SCENES key for the backdrop; where  what the cards are laid out on ("an upturned shield by the cook-fire");
         set    one sentence of time and place; back  where the start node was going (a node id, or a function); backT  its button;
         say    each reader's own words when offering the reading.
     - put b3DeckChoice(n) among the chapter's first halt choices;
     - register two nodes:  b3_c<n>_deck: () => b3DeckOffer(n),  b3_c<n>_card: () => b3DeckCard(n).
   "Let her draw" sets S.f.b3_c<n>_drawn = 1 and S.f.b3_c<n>_reader = the reader's id, deals from B3POOL[n] and plays the card screen;
   "Not now" sets S.f.b3_c<n>_noCard = 1. The card's node id b3_c<n>_card is what 36b's cardNodeName() returns in Book Three.
   B3DECK[1] below is the worked example; Chapter One's writer may replace it.

   The cards (B3CARDS, b3c_*; the art is the title artist's, 60b/60d) work engine-wide while S.card is theirs, in any fight of the
   chapter. The House of Chains is new in the Deck this year (Chapters 4 to 7): Tuft has never seen it. */

const B3CARDS = {
  b3c_knight:{name:'Knight of High House Dark', house:'High House Dark', hue:'#7d7fc9',
    txt:'A tall figure in black with a sword over his shoulder, standing at the edge of the sea with his back to you, looking at something under the water.',
    fx:'The squad\'s first hit in each fight does +3 damage.'},
  b3c_lifesoldier:{name:'Soldier of High House Life', house:'High House Life', hue:'#d8b4c4',
    txt:'A soldier in plain mail with a shield on one arm and a bandage in the other hand, kneeling over somebody you cannot see.',
    fx:'Every healing on the squad\'s side heals 2 more.'},
  b3c_gate:{name:'The Gate', house:'High House Death', hue:'#b8c0b0',
    txt:'Hood\'s gate: two grey posts, a lintel, and a light behind it from nowhere. Something stands in the opening, and has not decided whether to step aside.',
    fx:'The first squadmate to go down in each fight stands back up at 1 health.'},
  b3c_obelisk:{name:'Obelisk', house:'Unaligned', hue:'#bdb3a3',
    txt:'A standing stone, unaligned and older than anyone\'s gods, with frost on the side away from the sun.',
    fx:'Dread rises by 1 less each time it rises this chapter.'},
  b3c_mason:{name:'Mason of High House Death', house:'High House Death', hue:'#c0a07a',
    txt:'A broad, bent figure in a dusty apron with a mallet and chisel, cutting a long stone to fit a long hole.',
    fx:'Munitions the squad throws do +2 damage to every enemy they catch.'},
  b3c_kingchains:{name:'The King in Chains', house:'High House Chains', hue:'#9a6a52',
    txt:'A figure on a throne, bound to it at wrist and ankle and throat, the chains running off the card\'s edges to somewhere else. Its head is bowed. It is not resting.',
    fx:'Enemies get +1 to hit, but every enemy that falls heals the squadmate who felled it by 2.'},
  b3c_consort:{name:'The Consort', house:'High House Chains', hue:'#a07058',
    txt:'A figure in fine clothes at the King\'s side, one hand on the chains as if they were a lover\'s arm, smiling at you.',
    fx:'The squad\'s free swings hit +2, and the enemy\'s free swings hit −2.'},
  b3c_leper:{name:'The Leper', house:'High House Chains', hue:'#8a7a62',
    txt:'A figure in grey rags with a bell, walking a road alone, and where it has walked the road has gone pale.',
    fx:'The warrens never burn a caster, but every spell heals or harms 1 less.'},
};
Object.assign(CARDS, B3CARDS);

/* each chapter's pool leans to one card (three of it), with two others */
const B3POOL = {
  1:['b3c_knight', 'b3c_knight', 'b3c_knight', 'b3c_obelisk', 'b3c_lifesoldier'],          // Pale: the Andii's lord is elsewhere, and watching
  2:['b3c_obelisk', 'b3c_obelisk', 'b3c_obelisk', 'b3c_gate', 'b3c_knight'],               // the Plain: something endures
  3:['b3c_mason', 'b3c_mason', 'b3c_mason', 'b3c_knight', 'b3c_gate'],                     // Capustan relieved: the munitions break the siege
  4:['b3c_kingchains', 'b3c_kingchains', 'b3c_kingchains', 'b3c_lifesoldier', 'b3c_obelisk'], // the prisoners: a new House in the Deck
  5:['b3c_consort', 'b3c_consort', 'b3c_consort', 'b3c_leper', 'b3c_mason'],               // south of the Catlin
  6:['b3c_leper', 'b3c_leper', 'b3c_leper', 'b3c_knight', 'b3c_kingchains'],               // the night lifts, or the barges
  7:['b3c_gate', 'b3c_gate', 'b3c_gate', 'b3c_consort', 'b3c_kingchains'],                 // Coral
};

/* ---- the effects: engine-wide, keyed on S.card ---- */
const b3Card = k => !!(S && S.card === k && B);
const b3Mine = u => !!(u && u.side === 'p' && !u.ally);
/* Soldier of High House Life: every healing on the squad's side heals 2 more */
{ const _heal = heal; heal = function(u, n){ return _heal(u, b3Card('b3c_lifesoldier') && u && u.side === 'p' && n > 0 ? n + 2 : n); }; }
/* Mason of High House Death: a blast the squad sets off hits every enemy in it for 2 more */
{ const _blast = blast;
  blast = function(pt, dice, col){
    if (!(b3Card('b3c_mason') && B.cur && b3Mine(B.cur))) return _blast(pt, dice, col);
    const _hurt = hurt; hurt = function(u, n, crit){ return _hurt(u, u && u.side === 'e' ? n + 2 : n, crit); };
    try { return _blast(pt, dice, col); } finally { hurt = _hurt; } }; }
/* Knight of High House Dark: the squad's first hit in a fight does +3 */
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (!(b3Card('b3c_knight') && !B.used.b3knight && b3Mine(a) && t && t.side === 'e')) return _attack(a, t, o);
    const dd = o.dmg || a.dmg, r = _attack(a, t, Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 3]}));
    if (r && r.hit) { B.used.b3knight = 1; blog(`<em>The Knight of High House Dark:</em> the first blow lands hard (+3).`); }
    return r; }; }
/* The Gate: the first squadmate down in a fight stands back up at 1 health. The King in Chains: an enemy that falls heals whoever felled it by 2 */
{ const _hurt = hurt;
  hurt = function(u, n, crit){ const before = u ? u.hp : 0, by = B && B.cur; _hurt(u, n, crit);
    if (!u || before <= 0 || u.hp > 0) return;
    if (b3Card('b3c_gate') && b3Mine(u) && !B.used.b3gate) { B.used.b3gate = 1; u.hp = 1; u.deadAt = null; float(u, 'not yet', '#c8d0c0'); blog(`<em>The Gate stands open, and something in it shakes its head.</em> ${u.name} gets back up, at 1 health.`); }
    else if (b3Card('b3c_kingchains') && u.side === 'e' && b3Mine(by) && by.hp > 0) { heal(by, 2); blog(`<em>The chains give something back.</em> ${by.name} takes 2 health off ${u.name}.`); } }; }
/* The King in Chains: enemies hit +1. The Consort: the squad's free swings +2, the enemy's −2 */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (!S || !B || !a) return c;
    if (S.card === 'b3c_kingchains' && a.side === 'e') c.bonus += 1;
    if (S.card === 'b3c_consort' && o.aoo) c.bonus += b3Mine(a) ? 2 : a.side === 'e' ? -2 : 0;
    return c; }; }
/* The Leper: a squadmate's spell (anything that costs strain) heals or harms 1 less; the warrens never burn (60 reads the card) */
{ const _useAb = useAb;
  useAb = function(k, x, y){ const u = B && B.cur, a = AB[k];
    if (!(b3Card('b3c_leper') && a && a.strain && b3Mine(u))) return _useAb(k, x, y);
    const _h = heal, _x = hurt;
    heal = function(t, n){ return _h(t, t && t.side === 'p' && n > 0 ? Math.max(0, n - 1) : n); };
    hurt = function(t, n, crit){ return _x(t, t && t.side === 'e' && n > 0 ? Math.max(1, n - 1) : n, crit); };
    try { return _useAb(k, x, y); } finally { heal = _h; hurt = _x; } }; }
/* a fight opens with the card's word in the log, so the player can see it working */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (S && S.book === 'moi' && B && B.log && CARDS[S.card] && String(S.card).startsWith('b3c_')) blog(`<em>${CARDS[S.card].name}:</em> ${CARDS[S.card].fx}`);
    return r; }; }

/* ---- the readers ---- */
const b3Rd = () => visReader();
const b3RdObj = () => b3Rd().he ? 'him' : 'her';
const B3RD_DECK = {
  tuft:`Tuft has the Deck out: the wooden one, the paint worn off the House of Shadow, that she carried under the Pale and through Darujhistan. She reads for the squad the way she always has, and this spring she holds each card a moment longer before she turns it, as if listening for something.`,
  sohra:`Sohra does not use cards. She burns a pinch of something in a bone cup, throws a handful of knucklebones into the smoke, and reads where they fall; and when the squad leans in to look, the bones have fallen in the shape of a card from the Deck. She says the Deck is only a Malazan way of writing down what the bones already know.`,
  benna:`Old Benna does laundry for the Host two lines over, and reads the Deck for coppers by the wash-tubs: a soldier's deck, greasy, with the Herald missing, which she says is no loss. She has read for marines for thirty years and has never once been surprised.`,
};
/* per chapter: the scene, where the cards are laid out, a line of time and place, where the start node was going (back/backT), and each reader's offer.
   Chapter writers fill B3DECK[2..7] from their own files; this is Chapter One's, as the worked example. */
const B3DECK = {
  1:{scene:'b3_pale_camp', where:'an upturned shield by the cook-fire', set:'First light outside Pale, the mud gone hard overnight and the whole camp coughing.',
    back:()=>startExplore(), backT:'Back to the lines.',
    say:{tuft:`"Two armies in one field," she says. "The Deck likes that. It likes anything that shouldn't be happening." She shuffles. "One card, Sergeant. For the road south."`,
      sohra:`"The Mhybe says to read for the Malazans," she says, "so I will know what you are." She shakes the bones in her fist. "Sit. Don't breathe on the smoke."`,
      benna:`"Marines," she says, as if the word were a smell. "Sit down, then. Copper for the reading, copper for the washing, and I don't do blood out of wool."`}},
};
/* each card, said by each reader */
const B3SAY = {
  b3c_knight:{d:B3CARDS.b3c_knight.txt,
    tuft:`"High House Dark," Tuft says. "He was over Pale, and then over Darujhistan." She turns the card a little toward the light. "He's not looking at us. He's looking at something under the water." She puts it down carefully. "I'd like to know what."`,
    sohra:`"The tall one with the sword," Sohra says. "The Andii's lord. The bones say he is near, and also not near." She frowns at them. "The bones are not usually so rude."`,
    benna:`"Him," says Benna. "Had him come up every week at Pale, before the sky fell. Hits hard, the first time. After that you're on your own." She takes her copper.`},
  b3c_lifesoldier:{d:B3CARDS.b3c_lifesoldier.txt,
    tuft:()=>`"High House Life," Tuft says, surprised. "I don't draw it much. Nobody does, in the marines."${b3In('ohl') ? ` She looks at Ohl, who is pretending not to listen.` : ''} "It means things mend. Better than they should."`,
    sohra:`The bones fall in a ring. "Someone kneels," Sohra says. "Someone binds. The herds call that a good year." She sweeps them up quickly, before the luck can notice.`,
    benna:`"Life's soldier," says Benna. "That's a healer's card. You've a healer? Tell him to earn his keep this month, the Deck says he will."`},
  b3c_gate:{d:B3CARDS.b3c_gate.txt,
    tuft:`Tuft looks at it a long time. "Hood's gate," she says. "Open. Somebody in the doorway, deciding." She lays her hand flat over it, the way Tattersail used to. "Not deciding against us. Not yet."`,
    sohra:`The bones fall in two lines and a bar across them. Sohra goes still. "A door," she says. "The dead stand in it. They have not decided whether to let you through." She looks up. "They will decide in your favour once. Once."`,
    benna:`"Hood's door," says Benna, flat. "Comes up for marines a lot. Means one of you goes down and gets up again." She looks round the squad. "Don't ask which. I don't do which."`},
  b3c_obelisk:{d:B3CARDS.b3c_obelisk.txt,
    tuft:`"Obelisk," Tuft says. "Something endures." She touches the frost painted on its side. "That's new. It never used to have frost on it." She says it lightly, and then she does not say anything else for a while.`,
    sohra:`"A standing stone," Sohra says. "The old ones on the plain. You can lean on them in a wind." She sets one bone upright in the dirt and leaves it there. "For the bad dreams. You will have some."`,
    benna:`"The stone," says Benna. "Means you'll last. Means you'll sleep, after. That's worth more than the copper, down where you're going." She takes the copper anyway.`},
  b3c_mason:{d:B3CARDS.b3c_mason.txt,
    tuft:()=>b3In('kettle') ? `"The Mason," Tuft says. "High House Death's builder." She slides the card across to Kettle without a word, and Kettle looks at it, and grins, and puts it back.` : `"The Mason," Tuft says. "High House Death's builder. He makes the barrows." She taps the mallet. "What we throw lands heavy, this month."`,
    sohra:`"A builder of graves," Sohra says, watching the smoke. "The bones say what you throw will land heavy." She glances at the sapper's satchel. "I do not need bones to tell me that."`,
    benna:`"Mason," says Benna. "Builds the house for the dead. You've a sapper? Course you have. Tell her it's her week."`},
  b3c_kingchains:{d:B3CARDS.b3c_kingchains.txt,
    tuft:`Tuft doesn't touch it. "I don't know this one," she says. "I know every card in this deck. I've known them since I was ten." She looks at the chains running off the edge of the card. "It's a House. A whole new House. Somebody's put a new House in the Deck, and it's *chained*." Her voice is very steady, which is how you know it isn't.`,
    sohra:`The bones fall in a line that runs out of the smoke and keeps going, off the hide, onto the dirt, toward the south. Sohra watches it for a long moment. "Something bound," she says. "It is bound and it is not resting. The herds would run from this. We are walking toward it."`,
    benna:`Benna looks at the card a long time. "Never had that one," she says. "Thirty years." She turns it over, and back. "Deck's been changing since the winter. New cards. Nobody prints them. They just turn up." She doesn't take the copper.`},
  b3c_consort:{d:B3CARDS.b3c_consort.txt,
    tuft:`"Chains again," Tuft says. "The one beside the King. Smiling." She puts the card face down quickly. "It means the people who come at you sideways get it wrong, and we don't. That's what it means. I don't like the way it's smiling."`,
    sohra:`"Someone at the bound one's side," Sohra says. "Close. Fond." She wrinkles her nose at the smoke. "The bones say: watch the ones who step in close. And step in close yourselves."`,
    benna:`"The Consort," says Benna, and sniffs. "New House, that. Chains. It means the ones who swing at your back miss and you don't. Stand together, the Deck says." She shrugs. "The Deck always says that."`},
  b3c_leper:{d:B3CARDS.b3c_leper.txt,
    tuft:()=>`"The Leper," Tuft says. "House of Chains." She looks at the pale road behind the figure. "It walks through the bad places and doesn't catch anything. Doesn't give much, either." ${b3In('ohl') ? 'She glances at Ohl.' : 'She looks at her own hands.'} "The warrens won't bite, this month. They won't give as much, either."`,
    sohra:`"Someone walking alone through sickness," Sohra says, "and not sickening." She shakes the bones once more, listening. "Your mages will be safe in the poisoned places. Safe, and thinner. The bones say both."`,
    benna:`"Leper," says Benna. "Rings a bell so you'll know he's coming." She taps the card. "Your mages want to hear this. Warren won't bite them. Won't give them much either. Fair trade."`},
};
const b3CardSay = id => { const s = B3SAY[id], r = b3Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]); return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); };
/* the card screen in Book Three: the reader's captions and the card's words (21). Book Two's reader keeps Book Two's (47c). */
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => { if (!(S && S.book === 'moi')) return _cb ? _cb.txt(id) : ((CARDS[id] && CARDS[id].txt) || ''); const s = B3SAY[id]; return s ? s.d : ((CARDS[id] && CARDS[id].txt) || ''); },
    cap(t, self, second){ if (!(S && S.book === 'moi')) return _cb ? _cb.cap(t, self, second) : '';
      const r = b3Rd(), n = r.name;
      const first = {tuft:'Tuft shuffles without looking at her hands.', sohra:'Sohra breathes on the bones and throws them into the smoke.', benna:'Old Benna shuffles like she is wringing out a shirt.'}[r.id] || `${n} shuffles.`;
      const three = {tuft:'Three cards.', sohra:'The bones roll, and settle, and roll again.', benna:'Three cards, and a copper on the shield.'}[r.id] || 'Three cards.';
      if (second) return t < 1500 ? `${n} gathers it back in.` : t < 2900 ? `Again. It lets ${b3RdObj()}, mostly.` : t < 4900 ? '' : t < 5800 ? 'Another comes up.' : '';
      return t < 1500 ? first : t < 2900 ? three : t < 3900 ? `The first refuses ${b3RdObj()}.` : t < 4900 ? `The second refuses ${b3RdObj()}.` : t < 5800 ? 'The third does not.' : ''; },
  }; }

/* ---- the chapter's reading: a choice on the chapter's first halt, the offer, and the card ---- */
function b3DeckChoice(n){ const r = b3Rd();
  return {t:r.id === 'sohra' ? `Sit with Sohra and the bones.` : `Sit with ${r.mid || r.name} and the Deck.`, deck:true, req:()=>!S.f[`b3_c${n}_drawn`] && !S.f[`b3_c${n}_noCard`], go:`b3_c${n}_deck`}; }
const B3RD_AGAIN = {tuft:'Tuft has the Deck out, the wooden one.', sohra:'Sohra has the bone cup out, and the knucklebones.', benna:'Old Benna has the deck out, and her hand out for the copper.'}; // the deck described once a book, then this (v6.12.0)
function b3DeckOffer(n, card = `b3_c${n}_card`){ const D = B3DECK[n] || B3DECK[1], r = b3Rd(), seen = S.f['b3_rd_' + r.id];
  return {sp:r.id === 'benna' ? 'Old Benna · a Host laundress' : r.name, scene:D.scene, fx:()=>{ S.f['b3_rd_' + r.id] = 1; }, txt:
`${(seen ? B3RD_AGAIN[r.id] : B3RD_DECK[r.id]) || ''}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:r.id === 'sohra' ? 'Let her throw.' : `Let ${b3RdObj()} draw.`, deck:true, fx:()=>{ S.f[`b3_c${n}_drawn`] = 1; S.f[`b3_c${n}_reader`] = r.id; S.card = dealCard(B3POOL[n] || B3POOL[1]); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b3_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b3DeckCard(n){ const D = B3DECK[n] || B3DECK[1], r = b3Rd(), pool = B3POOL[n] || B3POOL[1], id = S.card && CARDS[S.card] ? S.card : pool[0], c = CARDS[id];
  return {sp:'The Deck of Dragons', scene:D.scene, txt:r.id === 'sohra'
    ? `Sohra reads the bones on ${D.where}. Two throws she sweeps away without a word. The third she lets lie.`
    : `${r.name} lays the reading out on ${D.where}. Two cards refuse ${b3RdObj()}. The third does not.`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b3CardSay(id),
    ch:[{t:D.backT, go:D.back}]}; }
