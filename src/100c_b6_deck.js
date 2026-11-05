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
const b6CardSay = id => b6As(() => { const s = (b6Thread() === 'r' ? B4SAY : B3SAY)[id], r = b6Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]);
  return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); });

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
