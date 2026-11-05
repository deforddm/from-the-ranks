/* ============ Book Six, Chapter 6: The Falling Sky (the Fourth) ============ */
/* Onearm's Host marches north-east of G'danisban under its new High Fist (The Bonehunters ch 20-21; bh-canon §3, §5, §6, §8). Phase 1,
   the night road: the Host marches by night out of the heat; a dozen lights fall in a curve below the moon and the column halts (the
   first halt: the Deck is read there, b6DeckChoice(6)); the High Fist rides out ahead with a handful and the column waits (never his
   gate, never what he does out there); Tuft remembers Tattersail's fold (the trick, ✦ Wits 17; without Tuft, Ohl's version); something
   knocked loose by the night: bandits who have shadowed the column hit the baggage at the tail while it stands, and plague-marked
   followers come out of the dark running toward the lights (b6_c6_night, main, stage2; never a god). Phase 2, the day camp and the dusk
   after: the fire (b6_c6_fire: rest, talk, fever, roster, the way on); camp news through canvas (Sweetcreek complaining, Rythe Bude
   answering, at a distance; the Fourteenth as rumour); Sweetcreek's Falari water party overdue at the last well (b6_c6_wells,
   optional). Phase 3, Hanar Ara, the City of the Fallen: the Host drawn up on the plain; Mathok's rebels come out and surrender and are
   let go, seen from the line (the High Fist's eye passes along it: Ch4's key); the Seventh on picket at the city's edge at dusk, where
   the city's cult comes out at the picket (b6_c6_cult, feverRisk; stage2); the key, S.f.b6_c6_key: 'letgo' (the surrender stands as the
   High Fist gave it) or 'report' (the squad names the cult to its captain, who writes it and sends it up; nothing comes of it in this
   book). Phase 4: the Fourth's road, S.f.b6_fourthRoad: 'highfist' (on with the Host), 'hanarara' (the picket left on the Hanar Ara road
   a while), 'home' (the time-served list, to the coast and a ship west). This is the Fourth's last chapter: B6CH6.fates holds its fate
   pages for Ch7's finale (shape documented in docs/bh-ch6-notes.md). Never Paran's gate, Felisin Younger, Kulat, the city's centre;
   never speaks with Paran, Mathok, Sweetcreek, Rythe Bude. Notes: docs/bh-ch6-notes.md. */
/* FOR THE ARTIST (106b): names this file uses.
   Items: ART['item/b6_c6_starstone'], ['item/b6_c6_hanararobe'] (a plain placeholder is registered below, after load, only if 106b has none).
   Backdrops (SCENEX, the brief's): b6_sky (the column halted under the lights), b6_hanar_ara (outside the City of the Fallen); also used:
   the engine's b6_camp_night. Figures reused: b2soldier (the captain, the Falari, the picket), b3_c5_villager (a carrier), b3v_benna (old
   Benna), b4_c7_fleer / b4_c7_fleerbow / b4_c5_rider (the engine's borrowed foe bodies), brannoc and ressa (Ch2's and Ch4's art).
   Ground (TILEX, the shelf's): b4_c4_camp (the column on the Odhan: . earth , trampled grass W wagon h horse lines f cook fire = tent;
   in a fight # a wagon, t crates), odhan (Hanar Ara's plain: . hardpan , scrub x dead thorn r stones = a tent). */

/* ---- small helpers (b66: Book Six, Chapter Six) ---- */
const b66L = (id, n) => { if (b6In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b66Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b6In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b66If = (id, s) => b6In(id) ? (typeof s === 'function' ? s() : s) : '';
const b66Who = () => (ROLL() && ROLL().who) || 'sgt';
const b66Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b66Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b66V = (id, you, they) => id === 'sgt' ? you : they;
const b66Ph = () => (S && S.f && S.f.b6_c6_ph) || 1;
const b66Key = () => (S && S.f && S.f.b6_c6_key) || null;
const b66Here = () => ((S && S.squad) || []).filter(id => id !== 'sgt' && b6In(id));
const b66And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b66Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the earlier keys, each read with a default (a --from=6 save may have taken either; an unset key reads as the quieter road) */
const b66Voted = () => !!(S && S.f && S.f.b6_c4_key === 'vote');      // Ch4 'vote': the squad stood for the High Fist from the back of the ranks
const b66Out = () => !!(S && S.f && S.f.b6_c4_key === 'out');         // Ch4 'out': on picket; "Captain Kindly" to them still, now and then
const b66Burned = () => !!(S && S.f && S.f.b6_c2_key === 'burn');     // Ch2 'burn': the plague village fired on orders
const b66Passed = () => !!(S && S.f && S.f.b6_c2_key === 'pass');     // Ch2 'pass': the squad went round, and a family kept its roofs
/* the High Fist, as the Fourth says it: on Ch4 'out' the old joke name comes out when nobody from the command is near */
const b66HF = (cap) => `${cap ? 'The' : 'the'} High Fist${b66Out() ? `, Captain Kindly as was` : ''}`;
/* fever, said short */
const b66Fev = () => b6FeverList().map(id => id === 'sgt' ? 'you' : NAME(id));
const b66CureAll = how => { b6FeverList().forEach(id => b6Cure(id, how)); };
let b66NearFev = false; // the edge's "yes, but": set by its fx, read by its words (fx runs first, 16 settleRoll)

/* ---- The Fold Remembered: Tattersail's Fold (fold), as the Fourth carries it. A chapter trick. The card screen (21) asks for
   trickLeft('fold') and spends spendTrick('fold'); in Book Six these also count and spend this one, so the bearer folds the turned card
   back and draws again, keeping either. Not sorcery: a reader's hands. Tuft learned the fold from Tattersail before Pale; without her,
   Ohl knows a version from the Second's cadre tent (Claude's call). The fold has no battle half, so neither has this. ---- */
Object.assign(TRICKS, {
  b6_c6_fold:{name:'The Fold Remembered', ch:6, use:'chapter', n:1, where:'the Host\'s column halted under the falling lights, north-east of G\'danisban',
    lore:'Tattersail\'s fold, as the Fourth carries it now she is gone: when a card turns that the reader does not like, fold it back into the spread without looking and let another come up. Tuft learned it from her in a single watching, before Pale. Ohl watched her do it in the Second\'s cadre tent for two years and could never do it, until one night under a falling sky he could, a little.',
    get fx(){ return `${trickTimes('b6_c6_fold')} a chapter: when the chapter's card turns, fold it back into the spread and draw again, and keep either (it works through the card screen's own fold). One more use from level 5. Not sorcery.`; }},
});
{ const _tl = trickLeft, _sp = spendTrick;
  trickLeft = function(k){ const n = _tl(k); return k === 'fold' && b6On() ? n + _tl('b6_c6_fold') : n; };
  spendTrick = function(k){ if (k === 'fold' && b6On() && _tl('fold') <= 0 && _tl('b6_c6_fold') > 0) return _sp('b6_c6_fold'); return _sp(k); }; }

/* ---- the words this chapter adds to Book Six's glossary ---- */
GLOSSX.bh.push(
  [6, 'Hanar Ara', 'The City of the Fallen, north-east of G\'danisban: a city of tents and shrines on a plain, where those the plague marked and did not take have been going. Mathok\'s rebels came out of it to meet the Host.', ()=>(S.chapter || 0) >= 6],
  [6, 'The lights below the moon', 'A row of lights that came down out of the night sky north-east of G\'danisban, in a curve below the moon, while the Host marched. The column halted. The ranks do not agree what they were.', ()=>!!(S.f && S.f.b6_c6_lights)],
  [6, 'The carriers', 'Soldiers who had the fever and lived. Since G\'danisban a touch from one of them breaks it in others, and the camp has stopped asking why and started asking where they are.', ()=>!!(S.f && S.f.b6_soliel)]);

/* ---- the reading: the column halted on the night road, every face turned up to the lights (bh:6; the Gate leans, B6POOL[6]) ---- */
B6DECK[6] = {scene:'b6_sky', where:'a shield laid face up on the road, its rim still warm from a shoulder',
  set:'The Host\'s column halted on the night road north-east of G\'danisban, every face in it turned up to the lights coming down below the moon.',
  back:'b6_c6_start', backT:'Back to the halt.',
  say:{tuft:'Tuft has the cards out before the column has stopped, and lays them on Brisk\'s shield on the road, because it is the only flat thing for a league. "Tattersail read under a sky like this once," she says. "She didn\'t like what came up either." She keeps her face down, over the cards.',
       sohra:'Sohra crouches by the shield with her bones and a pinch of something that smokes, and keeps her back to the sky. "When the sky drops things," she says, "the spirits of the grass get loud. Be quiet with me a moment."',
       benna:'Old Benna has come up from the laundry carts at the tail with her greasy soldier\'s deck in her apron pocket, the way she always does when the column stops for something it shouldn\'t. "Coppers after," she says, and spreads them on a shield. "Look at that sky. I\'ve never been surprised in thirty years and I\'m not starting tonight."'}};

/* the fire is a roster fire (38c): the Fourth's fire in the Host's day camp on the march */
ROSTER_FIRES.bh = ROSTER_FIRES.bh || {};
ROSTER_FIRES.bh[6] = ['b6_c6_fire'];

/* ---- the Fourth's fate pages, for Ch7's finale (B6CH6.fates; shape in docs/bh-ch6-notes.md). The Fourth's half of the save is S while
   the Fourth plays and S.th.h while the Third does; every page reads that half, never S directly. ---- */
const b66H = () => !S ? null : (S.book === 'bh' && (S.thread || 'r') === 'h') ? S : ((S.th && S.th.h) || null);
const b66RoadOf = () => { const r = S && S.f && S.f.b6_fourthRoad; return ['highfist', 'hanarara', 'home'].includes(r) ? r : 'highfist'; };
const b66KeyOf = () => (S && S.f && S.f.b6_c6_key) === 'report' ? 'report' : 'letgo';
const B66_ROAD = {
  highfist:{title:'With the High Fist', scene:'b6_hanar_ara'},
  hanarara:{title:'The Hanar Ara road', scene:'b6_hanar_ara'},
  home:{title:'Time served', scene:'b6_sky'}};
/* each squadmate's page: (road, key, loyalty) → {title, txt}. Every one reads right on all three roads and both keys. */
const B66_FATE = {
  brisk:(r, k, l) => ({title:'The wall', txt:
    r === 'highfist' ? `Brisk marches on with the High Fist's Host at the front of the Fourth, shield up, and counts the rations aloud every night as if the Host might be short a biscuit and nobody else would notice. A new soldier in the Seventh asks her what the Host is for, now the rebellion is over. "Marching," Brisk says. It is the longest answer anyone in the company has had from her all season.${l >= 2 ? ' She walks on your open side. She has never said why, and you have stopped expecting her to.' : ''}`
    : r === 'hanarara' ? `Brisk stands the picket on the Hanar Ara road every day the Fourth is left there, and nobody sees her sit down in any of them. When the Fourth comes back to the Host the captain asks her what happened on the road. "Nothing," Brisk says, and it was true, and she makes it sound like a thing she did on purpose.${k === 'report' ? ' The captain does not ask about the city. Brisk does not offer.' : ''}`
    : `Brisk takes the ship west with the shield slung and an unreasonable quantity of hardtack in her pack. On the jetty at the coast she lifts two fingers to her brow, to Hood, out of habit, and then to the sea, which she has decided is the same thing with more water.${l >= 2 ? ' She asks you, at the rail, where you will be. It is the first question she has asked you in years.' : ''}`}),
  kettle:(r, k, l) => ({title:'The sapper', txt:
    r === 'highfist' ? `Kettle counts the satchel every morning on the march, two sharpers, a burner, and the cusser at the bottom she will not throw at anything that doesn't matter. She has stopped being able to say what would. Sweetcreek's Falari have found out she is Falari and give her the end of every song, and she sings it, badly, louder than they do.`
    : r === 'hanarara' ? `Kettle strings trip-cord round the picket on the Hanar Ara road the first night, with a tin cup on each line, and the cups ring at goats, at the wind, at a stray dog, and never once at anything that matters. She writes each ring in the munitions ledger. "So there's a record," she says. "Of nothing. The Moranth would want a record."`
    : `The ship west calls at Falar, the master says, or near it. Kettle has not decided whether she will get off. She sits on the deck with the munitions ledger on her knees and counts the satchel twice a day, and the sailors give her a great deal of room, which she says is the first sensible thing anyone has done since Pale.`}),
  tuft:(r, k, l) => ({title:'The reader', txt:
    r === 'highfist' ? `Tuft reads the Deck for the Seventh on the march now, when it asks, at a copper a card, and never draws for herself. Somewhere across the sea, on Genabackis, there is someone Tuft does not talk about. She does not talk about her now. Some nights she keeps the lamp lit and holds the worn card from the House of Shadow in her fingers, and the Fourth lets her.`
    : r === 'hanarara' ? `Tuft keeps the lamp lit on the picket every night the Fourth is left on the Hanar Ara road, and keeps her back to the shrines on the city's edge. When Kettle asks her what the cards say about the city, Tuft says, "Nothing I'd read aloud," and puts them away, and does not take them out again until the road goes back to the Host.`
    : `Tuft goes west with the time-served. West is toward Genabackis, she says, if a ship would only go that far, and none of them does. She sits at the stern with her back to Seven Cities and the Deck in her sleeve, and when the coast has gone she lays one card on the deck, face down, and leaves it there.`}),
  ohl:(r, k, l) => ({title:'The list', txt:
    r === 'highfist' ? `Ohl marches on with the Host through his own country, which is burning less now, and keeps the list, oilcloth, every name. He lights a lamp to Soliel every night, a small one, and argues with Hood after it, in Ehrlii, the way he always has. "She answered," he says, when Brisk asks him why the lamp. "Twenty-two years. One of us should say thank you."`
    : r === 'hanarara' ? `Ohl walks out from the picket to the shrines at the edge of Hanar Ara every morning the Fourth is left there, with his bag, and comes back at noon, and nobody asks him what he does out there. He adds no names to the list. ${k === 'report' ? 'He knows the squad named the cult to the captain. He says it was right, and that it will not change anything, and that both are true.' : 'He says the people out there are sick and frightened and very sure of things, and that he has been all three.'}`
    : `Ohl does not take the ship. Ehrlitan is along the coast from the jetty, and he was born there, and the Host's healers were never short of an old man. He walks the Fourth down to the boats, and checks Kettle's hand one last time, and goes up the coast road with the list in his robe. "I will read your names in the right order," he says. "I have not had to add one. I mean to keep it that way."`}),
  brannoc:(r, k, l) => ({title:'The Falari', txt:
    r === 'highfist' ? `Brannoc goes back to Sweetcreek's Falari when the Seventh has its numbers, and comes over to the Fourth's fire every second night with the tin whistle, and plays it badly, and sings worse. Captain Sweetcreek says he talks too much. He says she says that to everyone. The Fourth has stopped arguing with either of them.`
    : r === 'hanarara' ? `Brannoc stays with the Fourth on the Hanar Ara road, because Sweetcreek's line has gone on with the Host and he says a Falari does not leave a squad on a picket by itself. He whistles on watch until Brisk takes the whistle off him, and then he hums.`
    : `Brannoc walks the Fourth to the jetty and does not get on the ship. "Falar," he says, "is full of my mother. And Sweetcreek still has a war." He plays the Fourth out of the harbour on the tin whistle, from the end of the jetty, until the sound is gone under the gulls.`}),
  ressa:(r, k, l) => ({title:'The survivor', txt:
    r === 'highfist' ? `Ressa marches with the Host because the Host is going away from G'danisban, and that was all she asked of it. She sleeps sitting up. The dyer's blue on her fingers has not washed out and will not. She says less about the fever than anyone in the Seventh, and has had it longer.`
    : r === 'hanarara' ? `Ressa stands the picket on the Hanar Ara road with her back to the city every day the Fourth is left there. The people at the shrines call to her across the scrub, as one of theirs. She does not answer. On the last morning she says, "They think it chose them," and goes back to sharpening her knives, and that is all she says about it.`
    : `Ressa takes the ship west with the Fourth, because the Fourth is going and she has no street left to go back to. She stands at the rail with her blue fingers on the wood and watches Seven Cities go, and does not wave, and does not look away either.`}),
  sohra:(r, k, l) => ({title:'The rider', txt:
    r === 'home' ? `Sohra goes west with the Fourth as far as the coast, and there she stops, and looks at the ships, and laughs. "Rhivi do not cross water that does not end," she says. She finds the Host's horse lines instead, and a mare nobody can ride, and is gone up the coast road on it by noon.`
    : `Sohra rides the Host's flanks ${r === 'hanarara' ? 'round the picket on the Hanar Ara road' : 'on the march'}, singing to the spirits of grass that is not her grass, and says they answer anyway, more slowly, in an accent.`}),
  greysword:(r, k, l) => ({title:'The Grey Sword', txt:
    r === 'home' ? `Dannet goes west with the Fourth. The Grey Swords' wolves, she says, are not Seven Cities' wolves, and she would like to see what howls across the sea. She stands at the bow the whole voyage, listening.`
    : `Dannet stands beside Brisk ${r === 'hanarara' ? 'on the picket' : 'in the ranks'}, the same way, shield up. They have still not said much to each other. Neither of them thinks it needs saying.`}),
  ellis:(r, k, l) => ({title:'The scout', txt:
    r === 'home' ? `Ellis goes west, and at the coast she walks the jetty end to end, twice, looking at faces, and does not find the one she looks for. She never does. She gets on the ship anyway.`
    : `Ellis scouts ${r === 'hanarara' ? 'the scrub round the Hanar Ara picket' : 'ahead of the Seventh on the march'}, and reads tracks, and does not say whose she is always looking for. She has not found them. She has not stopped.`}),
  vell:(r, k, l) => ({title:'The rope man', txt:
    r === 'home' ? `Vell takes the ship west with a coil of Darujhistan rope over his shoulder, and is up the mast before the harbour is out of sight, because it is the nearest thing to a roof. The master shouts at him for a day and then gives him a watch.`
    : `Vell rigs a line ${r === 'hanarara' ? 'between two dead thorn trees by the picket' : 'between two wagons at every halt'} and sleeps on it, which the Seventh has stopped finding strange and started charging the other companies to watch.`}),
};
/* a squadmate with no page of their own above */
const b66FateDefault = (id, r) => ({title:TPL[id] ? TPL[id].role : 'One of the Fourth', txt:`${TPL[id] ? TPL[id].name : 'They'} ${r === 'home' ? 'goes west with the time-served, to the coast and a ship' : r === 'hanarara' ? 'stands the picket on the Hanar Ara road with the rest of the Fourth' : 'marches on with the High Fist\'s Host'}.`});
const b66SgtFate = (r, k) => ({title:'The sergeant', txt:
  (r === 'highfist' ? `You march on with the High Fist's Host, north and east, at the head of the Fourth, wherever the Host goes next. The captain has stopped asking whether the Fourth wants anything. The Fourth has stopped answering, which the captain takes for yes.`
   : r === 'hanarara' ? `You hold the picket on the Hanar Ara road for as long as the order says, with the city's shrines on one side and the empty road on the other, and then you take the Fourth back to the Host, and report, and are told nothing in return. That is the army. You have stopped minding.`
   : `Your name was on the time-served list, and you took it. You walk the Fourth down to the boats at the coast, and count it aboard, and count it again at the rail, and the sea takes the coast away behind you.`)
  + (k === 'report' ? `\n\nSomewhere in the Host's papers there is a line in the captain's hand about a cult at the edge of Hanar Ara, with your name under it. Nothing came of it. You would put your name to it again.` : `\n\nAt Hanar Ara the High Fist let a rebel army walk away, and the Fourth stood in the line and let it. You think about that some nights. You think it was the right thing, and that it will cost someone something, and that both can be true.`)});
const b66Fallen = (id, h) => { const d = (h && h.dead && h.dead[id]) || {}; return {title:'Fallen', txt:`${TPL[id] ? TPL[id].name : 'They'} did not come up the road out of Seven Cities with the Fourth${d.where ? `: ${d.where}` : ''}. The squad carried the name the rest of the way, and Ohl's list, for the first time, is one longer.`}; };
const B66FATES = {
  /* the Fourth's half of the save, wherever it is now (S while the Fourth plays; S.th.h while the Third does) */
  half:() => b66H(),
  /* the Fourth's road (highfist / hanarara / home) and the city key (letgo / report), each with a default */
  road:() => b66RoadOf(),
  key:() => b66KeyOf(),
  /* the road page: {title, scene, paras[]} */
  roadPage(){ const r = b66RoadOf(), k = b66KeyOf(), h = b66H(), R = B66_ROAD[r];
    const paras = [
      `The Fourth marched north-east of G'danisban with Onearm's Host under its new High Fist, and halted on the night road when the sky dropped a row of lights below the moon. At Hanar Ara, the City of the Fallen, Mathok's rebels came out and laid down what they carried, and the High Fist let them go.`,
      k === 'report' ? `The Fourth named the cult at the city's edge to its captain, who wrote it down and sent it up. Nothing came of it.` : `The Fourth let the surrender stand as the High Fist gave it, and said nothing of the cult at the city's edge.`,
      r === 'highfist' ? `Then it went on with the Host, as it always has: whatever the Host is called now, and wherever it goes next, which in this army is always more of it.`
        : r === 'hanarara' ? `Then it stayed behind on the Hanar Ara road as the picket the High Fist left, a few days, a few more, and came back to the Host when it was sent for.`
        : `Then its names went on the time-served list, and it went down to the coast and onto a ship west, away from Seven Cities, with its war done.`];
    if (h && h.name) paras.push(`Sergeant ${h.name}, Fourth Squad, Seventh Company.`);
    return {title:R.title, scene:R.scene, paras}; },
  /* one squadmate's page {title, txt} (also for the waiting) */
  page(id){ const h = b66H(), r = b66RoadOf(), k = b66KeyOf(), l = (h && h.loy && h.loy[id]) || 0;
    return id === 'sgt' ? b66SgtFate(r, k) : (B66_FATE[id] ? B66_FATE[id](r, k, l) : b66FateDefault(id, r)); },
  /* every page, in order: walking squadmates, those waiting at the company's camp, those fallen in Book Six, the sergeant last.
     Each: {id, k:'fate'|'gone', label, title, txt, loy}. The dead from earlier books (dead[id].from set) get no page here. */
  pages(){ const h = b66H(); if (!h) return []; const dead = h.dead || {}, r = b66RoadOf();
    const walking = (h.squad || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id]);
    const camp = (h.camp || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id] && !walking.includes(id));
    const fell = Object.keys(dead).filter(id => id !== 'sgt' && TPL[id] && !dead[id].from);
    const loyOf = id => (h.loy && h.loy[id]) || 0;
    return [...walking.map(id => Object.assign({id, k:'fate', label:'The Fourth', loy:loyOf(id)}, this.page(id))),
      ...camp.map(id => Object.assign({id, k:'fate', label:'With the company', loy:loyOf(id)}, this.page(id))),
      ...fell.map(id => Object.assign({id, k:'gone', label:'The fallen', loy:loyOf(id)}, b66Fallen(id, h))),
      Object.assign({id:'sgt', k:'fate', label:'The sergeant', loy:0, name:h.name || ''}, b66SgtFate(r, b66KeyOf()))]; },
};

/* ---- a plain placeholder for this chapter's item art, only if the artist's file (106b) has not drawn it by the time the page has
   loaded (the files are one script; this runs right after it). The artist's art always wins. ---- */
queueMicrotask(() => { if (typeof ART === 'undefined') return;
  [['b6_c6_starstone', 'A black stone from the night road', '<ellipse cx="120" cy="96" rx="22" ry="16" fill="#1a1a20"/><ellipse cx="114" cy="90" rx="6" ry="3" fill="#6a6a80" opacity=".5"/>'],
   ['b6_c6_hanararobe', 'A pilgrim\'s robe from Hanar Ara', '<path d="M96 40 L144 40 L160 110 L80 110 Z" fill="#a89a80"/><path d="M120 40 L120 110" stroke="#6a5e4a" stroke-width="2"/>']].forEach(([k, label, body]) => {
    if (ART['item/' + k]) return;
    ART['item/' + k] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 130" role="img" aria-label="${label}"><rect width="240" height="130" rx="3" fill="#2a2620"/><rect x="3" y="3" width="234" height="124" rx="2" fill="none" stroke="#8a7650" stroke-width="1"/>${body}</svg>`;
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] = [240, 130]; }); });

const B6CH6 = {
  title:'The Falling Sky', number:'Six',
  intro:{loc:'North-east of G\'danisban', sub:'Onearm\'s Host on the march · by night', scene:'b6_sky', cap:'The Host\'s column strung out on a night road across the scrub, a moon low over it, and the sky very clear.',
    paras:[
`The Host marches north-east out of G'danisban with a painted tomb behind it, outside the walls, and a new High Fist at its head. It marches by night now. The days are too hot for anything but lying under canvas and listening to the fever-sick in the next tent get better, which most of them are doing, and nobody in the Host pretends to understand why.`,
()=>`You are Sergeant {sgt}, Fourth Squad, Seventh Company. ${b66Voted() ? 'The Fourth stood at the back of the ranks the morning the army chose its High Fist, and stood for him.' : b66Out() ? 'The Fourth was on picket the morning the army chose its High Fist. It heard the shout from a long way off.' : 'The army chose its High Fist in the rain before G\'danisban, and the Fourth was there for it.'} Captain Sweetcreek's Falari are next in the line, and Captain Sweetcreek has been complaining about the High Fist to anyone with ears since the second night. The camp says Fist Rythe Bude has told her to stop. The camp says she hasn't.`,
()=>{ const v = b66Here().map(id => TPL[id].name);
  return `${v.length ? `${b66And(v)} ${v.length > 1 ? 'are' : 'is'} with you.` : 'The squad, tonight, is you.'} The road goes on north-east under a low moon, and the sky over it is very clear.`; }],
    go:'Onto the night road', node:'b6_c6_start'},

  areas:[
    /* 16 x 12 (b4_c4_camp, night). The column halted on the night road: . the road's earth  , trampled scrub  W a baggage wagon
       h the Falari horse lines  ^ the road ahead, where the High Fist rode  v the tail of the column, the baggage */
    { id:'b6_c6_road', title:'The night road · the column halted', sub:'North-east of G\'danisban · night', hint:'Tap ground to move · tap a figure to talk · the baggage is at the tail, south', decor:'b4_c4_camp', dark:true,
      map:[ ",,,,,,,^^,,,,,,,",
            ",,,,,,....,,,,,,",
            ",,W,,,....,,,W,,",
            ",,,,,,....,,,,,,",
            ",hhh,,....,,,,,,",
            ",hhh,,....,,W,,,",
            ",,,,,,....,,,,,,",
            ",,W,,,....,,,,,,",
            ",,,,,,....,,hhh,",
            ",,,,,,....,,,,,,",
            ",,,W,,....,,W,,,",
            ",,,,,,,vv,,,,,,," ],
      walk:'.,', triggers:{W:'b6_c6_wagon', h:'b6_c6_horses', '^':'b6_c6_ahead', v:'b6_c6_tail'}, start:{x:7, y:6},
      quest:()=> !S.f.b6_c6_lights ? 'The sky. Everybody is looking up.' : !S.f.b6_c6_nightDone ? 'The column waits. The drovers at the tail are shouting.' : 'Dawn. The column moves.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b2soldier', x:8, y:4, node:()=>'b6_c6_captain', fresh:()=>!S.f.b6_c6_captain},
        {id:'falari', name:'Sweetcreek\'s Falari', kind:'b2soldier', x:11, y:6, node:()=>'b6_c6_falari', fresh:()=>!S.f.b6_c6_falari},
        {id:'carrier', name:'A carrier', kind:'b3_c5_villager', x:4, y:9, node:()=>'b6_c6_carriers', fresh:()=>b6FeverList().length > 0},
        {id:'benna', name:'Old Benna', kind:'b3v_benna', x:6, y:3, node:()=>'b6_c6_deck', show:()=>b6Rd().id === 'benna' && !S.f.b6_c6_drawn && !S.f.b6_c6_noCard, fresh:()=>!S.f.b6_c6_drawn && !S.f.b6_c6_noCard},
        {id:'drovers', name:'The drovers', kind:'b2soldier', x:9, y:10, node:()=>'b6_c6_drovers', fresh:()=>!S.f.b6_c6_drovers},
        {id:'marked', name:'The marked, by the wagons', kind:'b3_c5_villager', x:5, y:10, node:()=>'b6_c6_marked', show:()=>!!S.f.b6_c6_nightDone, fresh:()=>!!S.f.b6_c6_nightDone && !S.f.b6_c6_marked} ] },

    /* 16 x 12 (b4_c4_camp, dusk). The Host's day camp on the march, waking for the next night: . earth  = tents  W wagons
       h horse lines  f the Fourth's fire  < back down the road to the last well  > on, the night's march to Hanar Ara */
    { id:'b6_c6_camp', title:'The Host\'s camp · dusk', sub:'A day north-east of the halt · waking for the night\'s march', hint:'Tap ground to move · tap a figure to talk · the fire is in the middle', decor:'b4_c4_camp', dark:true,
      map:[ ",,=,,,=,,,=,,=,,",
            "................",
            ".=..W.....W..=..",
            "................",
            "<......f.......>",
            "................",
            "..=.......=..W..",
            "................",
            "hhh....=.....=..",
            "hhh.............",
            "...=..W....=....",
            "................" ],
      walk:'.,', triggers:{f:'b6_c6_fire', '<':'b6_c6_wells', '>':'b6_c6_tomarch', '=':'b6_c6_canvas', W:'b6_c6_wagon', h:'b6_c6_horses'}, start:{x:7, y:6},
      quest:()=> !S.f.b6_c6_wellsDone && S.f.b6_c6_wellsAsked ? 'The Falari water party. West, to the last well.' : 'The fire, then the night\'s march, east.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b2soldier', x:9, y:5, node:()=>'b6_c6_captain_camp', fresh:()=>!S.f.b6_c6_captainCamp},
        {id:'falari', name:'Sweetcreek\'s Falari', kind:'b2soldier', x:4, y:5, node:()=>S.f.b6_c6_wellsDone ? 'b6_c6_falari_after' : 'b6_c6_wells_ask', fresh:()=>!S.f.b6_c6_wellsAsked},
        {id:'carrier', name:'A carrier', kind:'b3_c5_villager', x:12, y:7, node:()=>'b6_c6_carriers', fresh:()=>b6FeverList().length > 0},
        {id:'benna', name:'Old Benna', kind:'b3v_benna', x:4, y:9, node:()=>'b6_c6_benna', fresh:()=>false} ] },

    /* 16 x 12 (odhan, day into dusk). The plain before Hanar Ara: . hardpan  , scrub  x a dead thorn  = the city's outer tents
       ^ the city's edge, where the picket goes  r the Seventh's place in the Host's line  v back to the Host's camp */
    { id:'b6_c6_hanar', title:'Before Hanar Ara', sub:'The City of the Fallen · the Host drawn up on the plain', hint:'Tap ground to move · tap a figure to talk · the Seventh\'s place is the stones in the line', decor:'odhan',
      map:[ "=,=,,=,^^,=,,=,=",
            ",,,,x,,....,,x,,",
            ",,,,,,,....,,,,,",
            ",,x,,,,....,,,,,",
            ",,,,,,,....,,,,,",
            "................",
            ",,,,,,,,rr,,,,,,",
            ",,,,,,,....,,,,,",
            ",,,,x,,....,,,x,",
            ",,,,,,,....,,,,,",
            ",,,,,,,....,,,,,",
            ",,,,,,,....,,,,v" ],
      walk:'.,', triggers:{'=':'b6_c6_edge', '^':'b6_c6_edge', r:'b6_c6_line', v:'b6_c6_away'}, start:{x:8, y:9},
      quest:()=> !S.f.b6_c6_surr ? 'The Seventh\'s place in the line. Something is coming out of the city.' : !S.f.b6_c6_cultDone ? 'The picket at the city\'s edge, at dusk.' : !b66Key() ? 'The captain. What the squad saw at the edge.' : 'Back to the Host\'s camp. The road from here.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b2soldier', x:9, y:7, node:()=>S.f.b6_c6_cultDone && !b66Key() ? 'b6_c6_key' : 'b6_c6_captain_hanar', fresh:()=>!S.f.b6_c6_captainHanar || (!!S.f.b6_c6_cultDone && !b66Key())},
        {id:'picket', name:'Heavy infantry of the line', kind:'b2soldier', x:4, y:5, node:()=>'b6_c6_heavies', fresh:()=>!S.f.b6_c6_heavies},
        {id:'rebels', name:'Mathok\'s rebels, going', kind:'b4_c7_fleer', x:12, y:3, node:()=>'b6_c6_rebels', show:()=>!!S.f.b6_c6_surr && !S.f.b6_c6_cultDone, fresh:()=>!!S.f.b6_c6_surr && !S.f.b6_c6_rebels},
        {id:'carrier', name:'A carrier', kind:'b3_c5_villager', x:3, y:9, node:()=>'b6_c6_carriers', fresh:()=>b6FeverList().length > 0},
        {id:'keeper', name:'A shrine-keeper', kind:'b3_c5_villager', x:2, y:2, node:()=>'b6_c6_keeper', show:()=>!!S.f.b6_c6_surr, fresh:()=>!!S.f.b6_c6_surr && !S.f.b6_c6_keeper} ] } ],

  battles:{
    /* the night: bandits who have shadowed the column for days hit the baggage at the tail while the column stands staring at the sky;
       then out past the lamps, plague-marked followers running toward the lights, with the last of the bandits among them. Never a god. */
    b6_c6_night:{title:'The baggage at the tail', style:'b4_c4_camp', dark:true, warrenText:'The night road · the warrens are thick with the plague, and something above them is very loud', warren:{meanas:.85, denul:.85}, music:'battle',
      map:["..#..#..","........",".t....t.","........","#..##..#","........","..t..t..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b6_regular',1,7]],
      foes:[['b6_c6_raidchief',3,1],['b6_bandit',1,1],['b6_bandit',6,1],['b6_c6_banditbow',4,0],['b6_bandit',5,3]], xp:230, after:'b6_c6_night_after',
      waves:[{round:2, foes:[['b6_cultist',0,3],['b6_cultist',7,3]], text:'Two more come in out of the dark from either side, not at the wagons: at the light. They are shouting something about the sky, and they have knives.'}],
      preText:()=>`The drovers have their mules by the heads and the lamps are swinging, and out past the lamps, among the wagons at the tail, there are men who are not drovers: ragged, quick, with their faces wrapped, cutting at the wagon ropes. They have been behind the column for days, the drovers say after. Tonight the column stopped to look at the sky, and they came.${b66If('brisk', ' Brisk sets her shield on the road between the nearest wagon and the dark without a word.')}${b66If('brannoc', ' Brannoc has the Falari axe off his back and is grinning, which is not reassuring to anyone.')}`,
      stage2:{title:'Past the lamps', xp:110,
        text:()=>`The bandits break, and run, and some of them run out past the lamps into the scrub. And out there, in the dark under the lights, there are others: people walking toward the lights from wherever they were, ragged, singing, some of them, and when they see soldiers between them and the sky they stop singing. They have been marked by the fever and not taken, and they think the sky has opened for them, and they have decided the Host is in the way.\n\nThe last of the bandits are among them, using them for cover.${b66Say({ohl:'\n\nOhl says something in Ehrlii, low, that is not a prayer. "They are sick," he says. "Remember that, after."', tuft:'\n\nTuft looks up once, at the lights, and then down at her boots, and stays there.', _:''})}`,
        map:["........","..t..t..","........","........","..#..#..","........",".t....t.","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_cultist',2,1],['b6_cultist',5,1],['b6_cultist',3,2],['b6_bandit',6,3],['b6_bandit',1,3]],
        waves:[{round:2, foes:[['b6_cultist',4,0]], text:'One more comes out of the dark at a run, arms wide, face up to the sky, and only sees the squad at the last.'}]} },
    /* phase 2, optional: Sweetcreek's Falari water party at the last well, held off it by plague-road bandits */
    b6_c6_wells:{title:'The last well', style:'odhan', warrenText:'The Odhan at dusk · the warrens fouled with the plague, and they may give back mud', warren:{meanas:.85, denul:.85}, music:'battle',
      map:["........","..t.....","........","....t...","........","..#..#..","........","......t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b6_c6_falari',6,7]],
      foes:[['b6_bandit',2,1],['b6_bandit',5,1],['b6_c6_banditbow',4,0],['b6_bandit',3,3]], xp:160, after:'b6_c6_wells_after',
      waves:[{round:3, foes:[['b6_bandit',7,2]], text:'Another comes up out of the dry wash beyond the well, late, with a stolen Falari water-skin over his shoulder.'}],
      preText:()=>`The Falari water party is pinned behind its own carts at the well, two wounded, the mules gone, and the bandits who drove them off are on the low ground round the well-head with their faces wrapped.${b66If('kettle', ' Kettle looks at the carts. "Falari," she says. "Of course they stopped to argue about who drew first."')}`},
    /* phase 3: the city's cult comes out at the Seventh's picket on Hanar Ara's edge at dusk; it spreads the fever (the engine gives it
       to one walking soldier when it ends). Then among the outer shrines. Never into the city; never its centre. */
    b6_c6_cult:{title:'The city\'s edge', style:'odhan', feverRisk:'the edge of Hanar Ara', warrenText:'Hanar Ara at dusk · every warren here smells of fever, and Denul flinches from it', warren:{meanas:.85, denul:.7}, music:'battle',
      map:["..t..t..","........","........","...t....","........","t......t","........","....t...","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_c6_marked',3,1],['b6_cultist',1,1],['b6_cultist',6,1],['b6_cultist',2,3],['b6_cultist',5,3]], xp:210, after:'b6_c6_cult_after',
      waves:[{round:2, foes:[['b6_cultist',0,4],['b6_cultist',7,4]], text:'Two more come out from between the tents, faces turned to the squad as if it owed them something, and walk straight at the spears.'}],
      preText:()=>`They come out from between the outer tents as the light goes, a crowd of them, robed and bare-footed, and the one at the front is talking: about the fever that chose them, and the city that called them, and the soldiers who have come to take it away. Then the talking stops, and the knives come out from the robes.${b66If('ressa', ' Ressa has both knives out and her face is very still. "They\'re calling me," she says. "By the blue. They think I\'m theirs."')}`,
      stage2:{title:'The outer shrines', xp:100, feverRisk:null, // the fever is caught once, at the first ground's end (100's endBeat hook runs per ground; stage2 would inherit it)
        text:()=>`The crowd breaks back among the tents, and the squad goes after it as far as the first shrines and no further: little heaps of stones and rags and offerings along the city's edge, and the people who tend them, who have not run.\n\nThey do not want the soldiers here. They make that plain.${b66Say({brisk:'\n\n"No further than the shrines," Brisk says, to nobody, to the squad. "Orders."', kettle:'\n\nKettle has a sharper in her hand and puts it back. "Not here," she says. "Not with all this lot."', _:''})}`,
        map:["t..t...t","........","...t....","........","t.......","........","....t..t","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_cultist',2,1],['b6_cultist',5,1],['b6_c6_banditbow',4,0],['b6_cultist',1,3],['b6_cultist',6,3]]} } },

  foes:{
    b6_c6_raidchief:{name:'Bandit captain', sig:'C', kind:'b4_c5_rider', hp:60, ac:15, atk:11, dmg:[1,10,4], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a tulwar down on'},
    b6_c6_banditbow:{name:'Bandit with a bow', sig:'b', kind:'b4_c7_fleerbow', hp:22, ac:13, atk:10, dmg:[1,8,2], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
    b6_c6_marked:{name:'One of the marked, preaching', sig:'P', kind:'b4_c7_fleer', hp:52, ac:14, atk:10, dmg:[1,8,4], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'stabs at'},
    b6_c6_falari:{name:'A Falari water-carrier', kind:'b2soldier', sig:'n', hp:22, ac:14, atk:8, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'swings an axe at'},
  },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b6_c6_starstone:{name:'A black stone from the night road', slot:'trinket', role:'any', who:null, stat:{wits:1},
      line:'A small black stone, glassy on one side and rough on the other, still warm the morning after. The bandit captain wore it on a thong round his neck and the marked tried to take it off him, and nobody in the Fourth knows what it is. Tuft will not hold it. Kettle says it is a stone. It is a good weight in the hand on a night watch, and the hand stays awake.'},
    b6_c6_hanararobe:{name:'A pilgrim\'s robe from Hanar Ara', slot:'armour', role:'light', who:null, ac:1,
      line:'A heavy undyed robe of the kind the city\'s pilgrims wear, with small charms sewn into the hem: a copper, a bead, a twist of hair. It came off the ground at the outer shrines. It keeps the sun off by day and the cold off by night, and it turns a knife better than it has any right to, and whoever wears it gets looked at by every pilgrim on the road.'} },

  scenes:{},

  end:{
    letgo:['The surrender stands', 'The Host marched north-east of G\'danisban under its new High Fist, and halted on the night road while a row of lights came down below the moon. Somewhere ahead in the dark the High Fist rode out with a handful and came back, and nobody in the ranks was told what for. At Hanar Ara, the City of the Fallen, Mathok\'s rebels came out and surrendered, and the High Fist let them go. The Fourth stood its picket at the city\'s edge, met the cult there, and let the surrender stand as it was given.'],
    report:['A line in the captain\'s hand', 'The Host marched north-east of G\'danisban under its new High Fist, and halted on the night road while a row of lights came down below the moon. Somewhere ahead in the dark the High Fist rode out with a handful and came back, and nobody in the ranks was told what for. At Hanar Ara, the City of the Fallen, Mathok\'s rebels came out and surrendered, and the High Fist let them go. The Fourth stood its picket at the city\'s edge, met the cult there, and named it to its captain, who wrote it down and sent it up. Nothing came of it.'] },
  endScene:'b6_hanar_ara',
  endCap:()=>{ const r = S.f.b6_fourthRoad; return r === 'home' ? 'The coast road at dawn, the Fourth on it with its packs, and a ship\'s mast somewhere ahead over the scrub.' : r === 'hanarara' ? 'The Hanar Ara road at evening: a picket fire, the city\'s shrines on one side and the Host\'s dust going away on the other.' : 'The Host on the march again under a clear sky, the City of the Fallen behind it, and the Fourth in the column where it belongs.'; },
  tease:'Next: the Third, at sea with the Fourteenth, and Malaz City at the end of it.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b6_c6_lights) x.push('The Fourth saw the lights come down below the moon, and the column halt for them.');
    if (f.b6_c6_foldOk) x.push(`${f.b6_c6_foldBy === 'ohl' ? 'Ohl' : 'Tuft'} remembered Tattersail's fold under the falling sky.`);
    if (f.b6_c6_nightDone) x.push('The Fourth drove the bandits off the baggage at the tail, and the marked who came out of the dark after the lights.');
    if (f.b6_c6_wellsDone) x.push('The Fourth brought Sweetcreek\'s Falari water party in from the last well.');
    if (f.b6_c6_surr) x.push(`The Fourth saw Mathok's rebels surrender at Hanar Ara, and the High Fist let them go.${f.b6_c6_eye ? ' His eye stopped on the Fourth, for a moment, as it passed along the line.' : ''}`);
    if (f.b6_c6_cultDone) x.push('The cult came out at the picket on the city\'s edge, and the Fourth held it at the outer shrines.');
    if (f.b6_c6_key === 'report') x.push('The Fourth named the cult to its captain. He wrote it down. Nothing came of it.');
    if (f.b6_c6_key === 'letgo') x.push('The Fourth let the surrender stand as the High Fist gave it.');
    if (f.b6_fourthRoad === 'highfist') x.push('The Fourth goes on with the High Fist\'s Host.');
    if (f.b6_fourthRoad === 'hanarara') x.push('The Fourth stays behind on the Hanar Ara road, as the High Fist\'s picket.');
    if (f.b6_fourthRoad === 'home') x.push('The Fourth\'s names went on the time-served list. It goes down to the coast, and west.');
    if (b6In('brannoc')) x.push('Brannoc came through it whistling.');
    if (b6In('ressa')) x.push('Ressa came through Hanar Ara with the city calling her one of its own, and did not answer.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b6_fourthRoad === 'home' && 'The Fourth is on the time-served list, going down to the coast for a ship west.',
    f.b6_fourthRoad === 'hanarara' && 'The Fourth is left on the Hanar Ara road as a picket, for a while.',
    f.b6_fourthRoad === 'highfist' && 'The Fourth goes on with the High Fist\'s Host.',
    f.b6_c6_key === 'report' && 'You named the cult at Hanar Ara\'s edge to the captain. He wrote it down and sent it up.',
    f.b6_c6_key === 'letgo' && 'You let the surrender at Hanar Ara stand as the High Fist gave it.',
    f.b6_c6_surr && 'Mathok\'s rebels came out of Hanar Ara and surrendered. The High Fist let them go.',
    f.b6_c6_lights && 'A row of lights came down below the moon on the night road, and the Host halted. The High Fist rode out ahead and came back. The ranks were not told what for.',
    'The Fourth is marching north-east of G\'danisban with Onearm\'s Host, under its new High Fist.'].filter(Boolean); },

  /* the Fourth's fate pages, for Ch7's finale (shape: docs/bh-ch6-notes.md) */
  fates:B66FATES,

  dlg:{
    /* ---- phase 1: the night road, the lights, the halt (the first halt: the Deck is offered here) ---- */
    b6_c6_start:()=>({sp:'The night road', scene:'b6_sky', fx:()=>{ S.f.b6_c6_ph ??= 1; },
      again:()=>`The column stands on the night road with every face in it turned up, and the lights still coming down below the moon.`, txt:
`The Host is an hour past moonrise on the night road, marching, when the first light comes down.

It comes down out of the clear sky to the north-east, below the moon, slowly, the way nothing falls. Then another beside it. Then more, in a curve, like beads on a string somebody is lowering. The column does not so much halt as stop walking, company by company, from the front back, until the whole Host is standing on the road with its face turned up.

Then the horns come down the line, late, and make it an order: halt.${b66Say({kettle:`\n\nKettle is counting under her breath. "Ten. Eleven. Twelve." She stops. "Twelve. That's not a number anything comes down in."`, brisk:'\n\nBrisk counts them too, out loud, which nobody has heard her do with anything but rations.', _:''})}`,
      ch:[{t:'Watch the lights.', req:()=>!S.f.b6_c6_lights, go:'b6_c6_lights'},
          b6DeckChoice(6),
          {t:'Tuft has the Deck out, and her face has gone strange.', req:()=>b6In('tuft') && !S.f.b6_c6_foldTried, go:'b6_c6_fold'},
          {t:'Ohl is watching the lights, and moving his fingers as if he were dealing.', req:()=>!b6In('tuft') && b6In('ohl') && !S.f.b6_c6_foldTried, go:'b6_c6_fold'},
          {t:'The captain is coming down the line.', req:()=>!S.f.b6_c6_captain, go:'b6_c6_captain'},
          {t:'Walk the halted column.', go:()=>startExplore()}]}),

    b6_c6_lights:()=>({sp:'The lights', scene:'b6_sky', fx:()=>{ S.f.b6_c6_lights = 1; },
      again:()=>`The lights below the moon, coming down, and the column standing under them.`, txt:
`Twelve lights, in a curve below the moon, coming down so slowly that for a while they seem not to move at all, and then you look away and back and they are lower. They are very bright. They throw no shadows on the road. Out on the scrub the night-birds have stopped.

Up the column, a long way ahead, a knot of riders goes out off the road at a canter, toward the lights, with a standard among them and then without it, as somebody thinks better of the standard. ${b66HF(true)} and a handful. The column watches them go and does not move, because nobody has told it to.

The talk goes up and down the line in whispers. A sign. Another god falling. The Empress's mages. Poliel's ghost. A drover's cousin saw it at sea once, and it meant fish.${b66If('ohl', `\n\nOhl stands with his face up and his lips moving, in Ehrlii, and when Brisk asks him what he is saying he says, "Nothing you'd like," and keeps saying it.`)}${b66If('tuft', `\n\nTuft gives the sky a moment, no more. She watches the riders going, and then at her own hands.`)}${b66If('brannoc', `\n\nBrannoc has his tin whistle halfway to his mouth, out of habit, and lowers it. "Falari sailors say lights at sea are drowned men looking for a ship," he says. "We're not at sea." He thinks. "That's worse, isn't it."`)}${b66If('ressa', `\n\nRessa watches without any expression at all. "In G'danisban," she says, "the priests would have had a name for it by now. And a price."`)}`,
      ch:[{t:'Back to the halt.', go:'b6_c6_start'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the trick: The Fold Remembered (Tuft, or Ohl's version without her), ✦ Wits 17 ---- */
    b6_c6_fold:()=>({sp:b6In('tuft') ? 'Tuft' : 'Ohl', scene:'b6_sky', again:()=>b6In('tuft') ? `Tuft with the Deck in her hands under the falling lights.` : `Ohl, dealing nothing, under the falling lights.`, txt: b6In('tuft') ?
`Tuft is sitting on the road's edge with her Deck in her hands, not laying it out, only holding it, and her face has gone young and strange.

"Tattersail could fold a card," she says, when you crouch beside her. "Back into the spread, without looking, and another came up. I watched her do it once, the night before Pale, and I could do it after. I haven't since." She looks up at the lights and away. "She'd have folded tonight. Whatever turned. She'd have folded it back and made the Deck think again." She turns the top card over in her fingers, face down. "I want to remember how."` :
`Ohl is standing on the road's edge watching the lights, and his fingers are moving at his side as if he were dealing a hand of cards he does not have.

"In the Second's cadre tent," he says, when you come up, "there was a woman who could fold a card back into the Deck without looking. Tattersail. I watched her do it a hundred nights. I never could." His fingers stop. "Tuft could. I am not Tuft." He looks at the sky. "Tonight I think I could. Old men think foolish things under skies like this. Sit with me a moment."`,
      ch:[{t:'"Show me." (The Fold Remembered)', check:['wits', 17, 'tuft'], trick:'b6_c6_fold', req:()=>b6In('tuft') && !S.f.b6_c6_foldTried, fx:()=>{ S.f.b6_c6_foldTried = 1; },
            edges:id=>[id === 'tuft' && ['she watched Tattersail do it, once, and did it after', 3]],
            near:{t:()=>`Yes, but it comes back to Tuft whole, and so does the night before Pale with it, and she sits on the road with her arms round her knees until the lights are gone: rattled.`, fx:()=>b66Rattle('tuft')},
            go:'b6_c6_fold_ok', fail:'b6_c6_fold_no'},
          {t:'"Try." (The Fold Remembered, Ohl\'s way)', check:['wits', 17, 'ohl'], trick:'b6_c6_fold', req:()=>!b6In('tuft') && b6In('ohl') && !S.f.b6_c6_foldTried, fx:()=>{ S.f.b6_c6_foldTried = 1; },
            edges:id=>[id === 'ohl' && ['two years of watching her hands in the Second\'s cadre tent', 2]],
            near:{t:()=>`Yes, but Ohl's hands remember it and his knees do not, and he is an hour getting up off the road afterwards, and stiff all the next night: bruised.`, fx:()=>bruise('ohl', bruiseN())},
            go:'b6_c6_fold_ok', fail:'b6_c6_fold_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_fold_ok:()=>({sp:'The Fold Remembered', scene:'b6_sky', fx:()=>{ S.f.b6_c6_foldOk = 1; S.f.b6_c6_foldBy = b66Who() === 'ohl' ? 'ohl' : 'tuft'; }, txt: b66Who() === 'ohl' ?
`Ohl lays the cards he has borrowed from nobody on the road in front of him, and turns one, and does not like it, and his old hands do something quick and sideways, and it is gone back into the spread and another is up in its place.

He looks at it for a while. "Well," he says. "Twenty years late." He gathers them up. "Don't tell Tattersail. She would be insufferable." Then he remembers, and his face changes, and he says something in Ehrlii to the road, and gets up.` :
`Tuft turns the top card, and looks at it, and her hands do the thing: quick, sideways, without looking, and the card is back in the spread and another is up in its place, and she has not looked down once.

She lets out a breath. "There," she says. "She's still in the hands." She shuffles, and puts the Deck away in her sleeve, and for a moment she looks up at the lights without flinching. "If anything turns tonight that we don't like, Sergeant, tell me. I'll fold it."`,
      ch:[{t:'Back to the halt.', go:'b6_c6_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_fold_no:()=>({sp:b6In('tuft') ? 'Tuft' : 'Ohl', scene:'b6_sky', txt: b6In('tuft') ?
`The card turns, and Tuft's hands go to fold it, and stop, and it stays where it is. She tries again. The cards slide off each other onto the road.

She picks them up one by one. "Not tonight," she says. "She's not in the hands tonight." She does not say where she is.` :
`Ohl's fingers go to do it and the cards go everywhere, onto the road, under a drover's feet, and a mule steps on the Queen.

"Twenty years," Ohl says, picking them up. "And still no." He sounds almost pleased about it.`,
      ch:[{t:'Back to the halt.', go:'b6_c6_start'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the Deck, by the squad's reader (100c) */
    b6_c6_deck:()=>b6DeckOffer(6),
    b6_c6_card:()=>b6DeckCard(6),

    /* ---- the captain at the halt ---- */
    b6_c6_captain:()=>({sp:'The captain', scene:'b6_sky', fx:()=>{ S.f.b6_c6_captain = 1; },
      again:()=>`The captain, walking the Seventh's stretch of the halted column with his helmet under his arm.`, txt:
`The Seventh's captain comes down the halted column on foot with his helmet under his arm, the way he does when he does not know anything and wants to be seen not knowing it calmly.

"Halt holds," he says. "The column stays put. ${b66HF(true)} has gone up the road with a few, and the column waits on the road until he comes back or sends." He looks at the sky and away, as though the sky were another company's problem. "And keep your people together. The baggage at the tail is jumpy. The drovers say there's been something following us for three nights, and tonight's the night everybody's looking up."

He puts his helmet on. "That's all I know, Sergeant. It's more than I knew an hour ago."`,
      ch:[{t:'"The tail. We\'ll go and look."', go:'b6_c6_tail'},
          {t:'Back to the Fourth\'s stretch of road.', req:()=>b66Ph() < 2, go:'b6_c6_start'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the road ahead: the Host's own heavy infantry, and the High Fist gone out of sight. Never the gate; never what he does out there. */
    b6_c6_ahead:()=>({sp:'The road ahead', scene:'b6_sky', again:()=>`The road ahead, and the heavies across it, and nothing past them but the dark.`, txt:
`Up the road, past the head of the Seventh, a line of the Host's heavy infantry has been put across it, shields grounded, and they turn back everybody who comes up, sergeants included, politely and not at all.

"The High Fist's orders," says the one in the middle. "Nobody past." Past them the road goes on north-east into the dark, empty, toward where the lights are coming down, and somewhere out there, out of sight, a handful of riders went. ${S.f.b6_c6_nightDone ? 'They came back before dawn, the heavies say, and nobody said what for.' : 'Nobody has come back yet.'}${b66If('ellis', `\n\nEllis looks at the ground past the heavies' boots. "Seven horses went out," she says. "That's all the road will tell me." She does not try to make it tell her more.`)}`,
      ch:[{t:'On, with the column. Dawn.', req:()=>!!S.f.b6_c6_nightDone && b66Ph() < 2, onward:true, go:'b6_c6_dawn'},
          {t:'Back down the column.', go:()=>startExplore()}]}),

    /* Sweetcreek's Falari, next in the line */
    b6_c6_falari:()=>({sp:'Sweetcreek\'s Falari', scene:'b6_sky', fx:()=>{ S.f.b6_c6_falari = 1; },
      again:()=>`Sweetcreek's Falari, red-bearded and loud, arguing about the sky.`, txt:
`Captain Sweetcreek's Falari are the next company in the line, red-bearded, loud, and of the opinion, all of them at once, that the lights are a sign, though they cannot agree of what. Their captain is up the road somewhere with the officers, complaining. They are not surprised.

"She's been at the High Fist since the second night," one of them says. "Marches by night, halts for lights, who is he, where's he from." He spits. "She'll stop when Bude makes her. Bude won't."${b66Say({brannoc:`\n\nBrannoc is among them, of course, and has to be fetched back. "My lads," he says, coming. "They think it's the islands' gods come to see what we're doing so far from home." He grins. "I told them the islands' gods would have sent rain."`, kettle:`\n\nKettle answers one of them in Falari, short, and the whole company laughs, and the one she answered goes red to the beard. She will not say what she said.`, _:''})}`,
      ch:[{t:'Back to the Fourth\'s stretch of road.', req:()=>b66Ph() < 2, go:'b6_c6_start'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* a baggage wagon, any phase */
    b6_c6_wagon:()=>({sp:'A baggage wagon', scene:b66Ph() >= 2 ? 'b6_camp_night' : 'b6_sky', again:()=>`A wagon of the Host's baggage.`, txt: b66Ph() >= 2 ?
`A wagon of the Host's baggage, with its canvas rolled up for the heat and the drovers asleep underneath it in the one strip of shade.` :
`A wagon of the Host's baggage, stopped on the road with its mules standing. The drover is sitting on the shaft with his face turned up to the sky, and when you go past he says, without looking down, "Twelve. Isn't it. I keep making it twelve."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the horse lines */
    b6_c6_horses:()=>({sp:'The horse lines', scene:b66Ph() >= 2 ? 'b6_camp_night' : 'b6_sky', again:()=>`The Falari horse lines.`, txt: b66Ph() >= 2 ?
`The Falari horse lines, the horses dozing in the heat with their heads low and their tails going at the flies.${b66If('sohra', ' Sohra is among them, talking to a mare in Rhivi. The mare seems to agree with her.')}` :
`The Falari horse lines, strung out along the roadside, and every horse on them is awake, ears forward, looking at the same piece of sky. They are not afraid. They are attending, the way horses attend to a stranger coming up the road.${b66If('sohra', ' Sohra goes along the line with her hand on each neck in turn, and sings under her breath, and the horses let her.')}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the carriers: Soliel heals through those who had it and lived (bh-canon §8; after Ch4, S.f.b6_soliel). Headline only. */
    b6_c6_carriers:()=>{ const f = b66Fev();
      return {sp:'A carrier', scene:b66Ph() >= 3 ? 'b6_hanar_ara' : b66Ph() >= 2 ? 'b6_camp_night' : 'b6_sky', html:feverHTML(), again:()=>`A carrier, one of the ones who had it and lived.`, txt:
`One of the Host's carriers is walking the line, a soldier of the Third Regiment who had the fever at G'danisban and lived. Since that morning a touch from one of them breaks it in others, and nobody in the Host knows why, and the carriers know least of all. This one is a thin, embarrassed man who would rather be anywhere else.

${f.length ? `"Who's got it?" he says, and then looks, and sees for himself.` : `"Anyone?" he says. The Fourth is clean of it. He looks relieved, and moves on along the line.`}${b66If('ohl', `\n\nOhl watches him the way he watches any healer who is not him. "Soliel," he says, under his breath. "Through him. Of all people." He does not sound unhappy about it.`)}`,
        ch:[{t:'"Here. See to them."', req:()=>b6FeverList().length > 0 && b6CanCure(), fx:()=>{ b66CureAll('a carrier\'s touch'); S.f.b6_c6_carried = 1; }, go:'b6_c6_carried'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c6_carried:()=>({sp:'A carrier', scene:b66Ph() >= 3 ? 'b6_hanar_ara' : b66Ph() >= 2 ? 'b6_camp_night' : 'b6_sky', html:feverHTML(), txt:
`The carrier puts his hand on each fevered forehead in turn, for no longer than you would to see if a child is hot, and takes it away, and wipes it on his trousers out of habit.

That is all. The sweat stops within the hour. The shaking stops after it. By the next halt they are keeping water down and complaining about the water, which Ohl says is how you can tell.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the tail: the baggage, and something knocked loose by the night ---- */
    b6_c6_tail:()=>({sp:'The tail of the column', scene:'b6_sky', again:()=>`The baggage at the tail of the column, and the lamps, and the dark past them.`, txt: S.f.b6_c6_nightDone ?
`The tail of the column, the baggage wagons standing, the drovers picking up what was cut loose and cursing the dark it went into.` :
`At the tail of the column the baggage is standing on the road in a long line of wagons with the drovers at the mules' heads and the lamps lit, and the drovers are not looking at the sky. They are looking at the dark beside the road, where something has been moving for three nights.

There is a sound out there, close, of a rope being cut.${b66If('kettle', `\n\nKettle has her crossbow off her shoulder already. "Thieves on the munitions wagon," she says. "Over my dead body. Theirs."`)}`,
      ch:[{t:'Dawn. The column moves.', req:()=>!!S.f.b6_c6_nightDone && b66Ph() < 2, onward:true, go:'b6_c6_dawn'},
          {t:'Shields. To the wagons.', req:()=>!S.f.b6_c6_nightDone, go:()=>startBattle('b6_c6_night', {})},
          {t:'Out past the lamps, wide, quiet, and in at them from the dark side.', check:['guile', 16], req:()=>!S.f.b6_c6_nightDone && !S.f.b6_c6_wideTried, fx:()=>{ S.f.b6_c6_wideTried = 1; },
            edges:id=>[id === 'ellis' && ['six years of not being where the sentry looked', 2], id === 'tuft' && ['a Meanas veil is made for a night like this', 2], id === 'ressa' && ['she walked out of G\'danisban past three pickets', 1], id === 'brisk' && ['quiet was never in the shield-drill', -2], id === 'brannoc' && ['he hums when he creeps, and does not know he does it', -2]],
            near:{t:()=>{ const w = b66Who(); return `Yes, but ${b66Nm(w)} ${b66V(w, 'go', 'goes')} out past the lamps into a thorn bush in the dark, the whole of it, and ${b66V(w, 'come', 'comes')} out of the far side torn from shoulder to knee: bruised.`; }, fx:()=>bruise(b66Who(), bruiseN())},
            go:()=>startBattle('b6_c6_night', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c6_tail_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_tail_seen:()=>({sp:'The tail of the column', scene:'b6_sky', txt:
`A drover's dog finds the squad in the dark before the bandits do, and says so at length. Out past the lamps every wrapped face turns at once.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c6_night', {surprise:'e'})}]}),
    b6_c6_night_after:()=>({sp:'The tail of the column', scene:'b6_sky', fx:()=>{ if (S.f.b6_c6_nightDone) return; S.f.b6_c6_nightDone = 1; gain('b6_c6_starstone'); }, txt:
`The bandits are gone into the scrub, those who can still go, and the marked who came out of the dark with them have gone back into it, or are lying on the road and do not get up, or are sitting in the dirt by the wagons, very quietly, looking at the sky. The drovers come out from behind their mules.

The bandit captain lies by the munitions wagon${b66If('kettle', ', which Kettle mentions, more than once')}. On a thong round his neck there is a small black stone, glassy on one side, and still warm. The marked had been trying to take it off him when the squad came. ${b6In('tuft') ? 'Tuft will not touch it.' : 'Nobody is in a hurry to touch it.'}${b66Say({kettle:' Kettle picks it up. "It\'s a stone," she says, and keeps it.', brisk:' Brisk picks it up and puts it in her pack without comment.', _:' You put it in your pack.'})}

Up the road, a long way ahead, the lights have gone. None of the Host saw them land. Some time before dawn a knot of riders comes back down the road at a walk and goes past the Seventh without a word, ${b66HF()} among them, and nobody in the ranks can say what he went out to do, or whether he did it.${b66Say({ohl:`\n\nOhl goes among the marked sitting by the wagons with his bag, and sits with one who will not stop shaking. "Hold still," he says. "No. It is not the sky. It is only the fever, and it is leaving. Hold still."`, _:''})}`,
      ch:[{t:'Dawn. The column moves.', onward:true, go:'b6_c6_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 2: the day camp, and the dusk after ---- */
    b6_c6_dawn:()=>({sp:'The march', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_ph = Math.max(2, b66Ph()); }, txt:
`The column moves at first light, two hours north-east, and makes camp before the heat: canvas up, horses picketed, everybody under shade by the second bell and pretending to sleep.

At dusk the camp wakes. The talk is all of the lights, and of the High Fist riding out, and of Hanar Ara, which is a day ahead, where Mathok's army is, the last rebel army in Seven Cities, and where the fever's leavings have been going all summer. The Fourth has a fire, and an hour before the night's march.`,
      ch:[{t:'To the Fourth\'s fire.', onward:true, go:()=>{ startExplore('b6_c6_camp'); talk('b6_c6_fire'); }},
          {t:'Walk the camp.', go:()=>startExplore('b6_c6_camp')}]}),

    /* ---- the fire (the games pass may wrap it; keep the id) ---- */
    b6_c6_fire:()=>({sp:'The Fourth\'s fire', scene:'b6_camp_night', html:feverHTML(), again:()=>`The Fourth's fire in the Host's camp at dusk, an hour before the night's march.`, txt:
`The Fourth's fire is a small one, because the night will be warm and the march long, and it is mostly for the tea, which Ohl is making, and which is technically medicine.

The Host's fires go away in rows all round it, and past them the scrub, and the sky going from red to dark, empty and very clear. Every so often somebody at every fire looks up at it, and then looks down, and pretends not to have.${b66If('brannoc', `\n\nBrannoc sits with his back to a wagon wheel, playing the tin whistle very softly, a Falari tune with too many notes in it, and getting most of them.`)}${b66If('ressa', `\n\nRessa sits up against her pack with her knives across her knees, and will sleep that way later, sitting up.`)}${b66If('sohra', `\n\nSohra sits with her face to the north-east, where the lights came down, and sings to the grass under her breath.`)}`,
      ch:[{t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b6_c6_rest, fx:()=>{ S.f.b6_c6_rest = 1; rest('The Fourth sits an hour by its own fire in the Host\'s camp. Wounds close, mostly.'); }, go:'b6_c6_fire_rest'},
          {t:'Talk with the squad.', go:'b6_c6_fire_talk'},
          {t:'Camp news.', go:'b6_c6_news'},
          {t:'Ohl has a small lamp lit, apart from the fire.', req:()=>b6In('ohl') && !S.f.b6_c6_lamp, go:'b6_c6_lamp'},
          {t:'Brannoc wants to teach somebody the whistle.', req:()=>b6In('brannoc') && !S.f.b6_c6_whistle, go:'b6_c6_whistle'},
          {t:'Ressa is scrubbing at her fingers with sand.', req:()=>b6In('ressa') && !S.f.b6_c6_blue, go:'b6_c6_blue'},
          {t:'Brisk is counting the rations aloud. Again.', req:()=>b6In('brisk') && !S.f.b6_c6_rations, go:'b6_c6_rations'},
          {t:'Kettle has the satchel open on a blanket.', req:()=>b6In('kettle') && !S.f.b6_c6_satchel, go:'b6_c6_satchel'},
          {t:'Look at the sky a while.', go:'b6_c6_skywatch'},
          {t:'The fever. Who has it?', req:()=>b6FeverList().length > 0, go:'b6_c6_carriers'},
          {t:'The night\'s march. East, to Hanar Ara.', req:()=>b66Ph() === 2, onward:true, go:'b6_c6_tomarch'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_fire_rest:()=>({sp:'The Fourth\'s fire', scene:'b6_camp_night', txt:
`An hour by the fire. The camp goes about its waking round it: water carts, horses, a sergeant two fires over shouting for a missing boot.

${b66Say({ohl:'Ohl goes round the squad with the tea and makes everyone drink it, and looks at hands, and feet, and eyes, the way he always does before a march, and says "Drink" to anyone who argues.', brisk:'Brisk sits with her shield across her knees and her eyes shut, and is not asleep, and nobody tests it.', _:'One of them sleeps. The rest watch the sky.'})}${b66If('kettle', `\n\nKettle counts the satchel out on a blanket: two sharpers, a burner, the cusser at the bottom. She counts them twice and puts them back the same way, and looks happier.`)}${b66If('tuft', `\n\nTuft keeps the lamp lit, though the fire is enough, and holds her Deck in her lap without opening it.`)}`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),
    /* one short line each: what they make of the lights, and of the war ending */
    b6_c6_fire_talk:()=>{ const ln = [];
      if (b6In('brisk')) ln.push(`Brisk is sharpening the spear, which does not need it. "Mathok's the last of them," she says. "After Hanar Ara, there's no rebellion left to put down." She tests the edge. "Then what's the Host for." It is not a question. She goes back to sharpening.`);
      if (b6In('kettle')) ln.push(`Kettle has the munitions ledger open on her knee. "If the war's over," she says, "I'll have to account for every sharper I didn't throw. Do you know how the Moranth feel about munitions coming back unused?" She shudders. "Insulted."`);
      if (b6In('tuft')) ln.push(`Tuft holds the Deck without opening it. "The cards have been loud all week," she says. "Since G'danisban. Everything about a gate. Doors, and things opening." She puts it away. "I'd like them to stop."`);
      if (b6In('ohl')) ln.push(`Ohl stirs the tea. "This is my country," he says. "I was born in Ehrlitan, and the Host came ashore within a march of it. I have walked through it with the Host all summer, and it has been burning, and now it has the fever, and I have mended perhaps a dozen of it." He pours. "The carriers have mended thousands. Soliel's work. I have prayed to her for twenty-two years and she answered by way of a man from the Third Regiment who cannot spell his name." He drinks. "I am trying to be grateful. It is harder than it sounds."`);
      if (b6In('brannoc')) ln.push(`Brannoc stops playing. "Sweetcreek says when the war ends she's going home to Falar and marrying somebody rich," he says. "She says that every war." He plays a few notes. "I'll go home when there's nobody left to fight who sings worse than me. Could be years."`);
      if (b6In('ressa')) ln.push(`Ressa looks at the fire. "Hanar Ara," she says. "Where the marked go. The ones it didn't take." She turns her blue fingers over. "They'll think I'm one of them. They'll be right." Then she settles against her pack, sitting up, and that is the end of it.`);
      if (b6In('sohra')) ln.push(`Sohra is singing to the grass, and stops. "The spirits here are old and tired," she says. "Like Ohl. They say the sky has been doing that for ages, somewhere, and nobody listened."`);
      if (b6In('greysword')) ln.push(`Dannet has her sword across her knees. "In Capustan we would have called the lights a sign from the Wolves," she says. "Here they will call it a sign from something else." She shrugs. "Everybody wants the sky to be talking to them."`);
      if (b6In('ellis')) ln.push(`Ellis is oiling a bowstring. "Seven horses went out last night," she says. "Seven came back. That's all anybody knows, and all anybody's going to." She seems content with that.`);
      if (b6In('vell')) ln.push(`Vell is splicing a rope. "In Darujhistan," he says, "anything strange in the sky was the Moon. Here there isn't a Moon to blame." He thinks about it. "I miss the Moon."`);
      return {sp:'The Fourth\'s fire', scene:'b6_camp_night', txt:ln.length ? ln.join('\n\n') : `The squad is you tonight, and the fire. You sit with it, and watch the sky go dark over the scrub, and think about the end of a war, which is a thing you have never yet seen.`,
        ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}; },
    /* camp news: the High Fist, Sweetcreek and Bude at a distance, and the Fourteenth as rumour */
    b6_c6_news:()=>({sp:'Camp news', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_news = 1; }, again:()=>`The camp's news, going round the fires.`, txt:
`The news goes round the fires the way it always does, faster than runners and less true.

${b66HF(true)} came back before dawn and went into his tent and said nothing anyone has heard. The riders who went with him say nothing either, which the camp finds more alarming than anything they could have said. Some say the lights were the Empress's doing. Some say a god's. A Falari swears the lights were his grandmother, and is laughed at, and does not mind.

Out west, the talk says, the Adjunct's army burned at Y'Ghatan and came out again, some of it, and has gone down to the coast for ships. Not one soldier at the fire knows anyone in the Fourteenth. Every one of them knows somebody who does.${S.f.b6_c5_key === 'wait' ? ' The ships waited a day for something, the story goes, and the story does not say what.' : ''}`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),
    /* through a tent wall: Sweetcreek and Fist Rythe Bude, heard, never met (bh-canon §3, ch 20) */
    b6_c6_canvas:()=>({sp:'A tent wall', scene:'b6_camp_night', fx:()=>{ if (b66Ph() >= 2) S.f.b6_c6_canvas = 1; }, again:()=>`A tent of the Host, its walls rolled down.`, txt: b66Ph() >= 2 && !S.f.b6_c6_tomarch ?
`One of the officers' tents is near enough to the Fourth's ground that what is said in it carries, and tonight what is said in it is loud.

A woman's voice, Falari in its vowels, saying that a High Fist who halts an army in the middle of the night to ride out and look at the sky is not a High Fist she was asked about. A man's voice, older and tired, saying that the army was asked, and the army answered, and that is an end of it. The woman's voice says something about Captain Kindly that the Fourth does not quite catch. The man's voice says, "Enough, Captain."

It is not enough. It goes on. The Fourth moves its fire a little further off, out of tact, and listens anyway.` :
`A tent of the Host, with its walls rolled down and somebody snoring inside.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    /* the captain in camp: Hanar Ara tomorrow */
    b6_c6_captain_camp:()=>({sp:'The captain', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_captainCamp = 1; }, again:()=>`The captain, eating standing up.`, txt:
`The captain is eating standing up by his tent, out of a bowl, which he says is the only way to eat in this country without the flies getting it first.

"Hanar Ara tomorrow," he says. "The City of the Fallen, they call it. Tents and shrines on a plain, and Mathok's army camped round it, and every soul the fever marked and didn't take, walking there from all over Seven Cities." He scrapes the bowl. "The Host draws up in front of it. What happens then is the High Fist's business. The Seventh's business is standing where it's put." He looks at you. "You'll have heard about last night. The baggage. Well done. The drovers asked who."${S.f.b6_c6_wellsAsked && !S.f.b6_c6_wellsDone ? `\n\n"And Sweetcreek's water party isn't back," he adds. "Her Falari are asking for help, and she's busy shouting at Bude. If the Fourth's minded, it's that way." He points west with the spoon.` : ''}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    /* old Benna at the laundry carts (the reader when Tuft and Sohra are gone; otherwise she is there, and says so) */
    b6_c6_benna:()=>({sp:'Old Benna · a Host laundress', scene:'b6_camp_night', again:()=>`Old Benna at the wash-tubs, sleeves rolled.`, txt:
`Old Benna is at the wash-tubs by the laundry carts with her sleeves rolled to the shoulder, though there is barely water enough to wash a shirt in this country and she says so to every shirt.

"Lights," she says, without looking up. "Thirty years with marines. I've seen fish fall out of a clear sky at Nathilog. I've seen a Moon hang over a city like a lid." She wrings something out. "I've never once been surprised, and last night I was very nearly, and I'll thank the sky not to do it again."${S.f.b6_c6_drawn ? '' : b6Rd().id === 'benna' ? '\n\nShe pats her apron pocket, where the greasy soldier\'s deck lives. "Coppers, if you want them read. Not here. On the road, under the sky, if it does it again."' : ''}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the last well (optional): Sweetcreek's Falari water party ---- */
    b6_c6_wells_ask:()=>({sp:'Sweetcreek\'s Falari', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_wellsAsked = 1; }, again:()=>`Sweetcreek's Falari, looking west down the road for their water party.`, txt:
`A knot of Sweetcreek's Falari is standing at the west edge of the camp looking back down the road, and not arguing, which in Falari is serious.

"Water party," one of them says. "Six of ours and two carts, back to the last well at noon to fill the skins. Should've been back by now." He looks at the dusk. "The captain's in with Bude, shouting. We asked the Seventh's captain. He said ask you."${b66If('brannoc', `\n\nBrannoc knows them all, of course. "My cousin's with them," he says. "He can't find a well in a bucket. Sergeant, please."`)}${b66If('kettle', `\n\nKettle says something to them in Falari, and they look at her, and then at you, and nod.`)}`,
      ch:[{t:'"Show us the road."', req:()=>!S.f.b6_c6_wellsDone, go:'b6_c6_wells'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_wells:()=>({sp:'The road west', scene:'b6_camp_night', again:()=>`The road back west, toward the last well.`, txt: S.f.b6_c6_wellsDone ?
`The road back west toward the last well, empty now in the dusk.` : b66Ph() >= 3 ?
`The road back west. The Host is past it now.` : !S.f.b6_c6_wellsAsked ?
`The road back west, the way the Host came, toward the last well. The road is empty.` :
`A mile back down the road, the last well: a stone ring in a dip in the scrub, and two Falari carts behind it tipped on their sides for cover, and on the low ground round the well-head, men with their faces wrapped. An arrow goes into a cart's side as you watch.`,
      ch:[{t:'In at them. Shields.', req:()=>!!S.f.b6_c6_wellsAsked && !S.f.b6_c6_wellsDone && b66Ph() < 3, go:()=>startBattle('b6_c6_wells', {})},
          {t:'Down the dry wash and up behind the well-head.', check:['wits', 16], req:()=>!!S.f.b6_c6_wellsAsked && !S.f.b6_c6_wellsDone && b66Ph() < 3 && !S.f.b6_c6_washTried, fx:()=>{ S.f.b6_c6_washTried = 1; },
            edges:id=>[id === 'ellis' && ['she reads ground, and a dry wash is ground', 2], id === 'sohra' && ['she has ridden washes like this since she could sit a horse', 2], id === 'kettle' && ['she ran contraband up dry gullies for a living', 1], id === 'brisk' && ['the wash was not made for heavy infantry', -2]],
            near:{t:()=>{ const w = b66Who(); return `Yes, but the wash is longer than it looks and ${b66Nm(w)} ${b66V(w, 'come', 'comes')} up out of it last, out of breath, with a turned ankle: bruised.`; }, fx:()=>bruise(b66Who(), bruiseN())},
            go:()=>startBattle('b6_c6_wells', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c6_wells_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_wells_seen:()=>({sp:'The last well', scene:'b6_camp_night', txt:
`A stone goes rattling down the wash under somebody's boot, and up on the well-head every wrapped face turns at once.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c6_wells', {surprise:'e'})}]}),
    b6_c6_wells_after:()=>({sp:'The last well', scene:'b6_camp_night', fx:()=>{ if (S.f.b6_c6_wellsDone) return; S.f.b6_c6_wellsDone = 1; b66L('brannoc', 1); b66L('kettle', 1); }, txt:
`The bandits go off down the wash in the dark, those who can. The Falari come out from behind their carts, six of them, two bleeding, all of them talking at once.

Nobody drinks from the well until ${b66Say({ohl:'Ohl has looked at it, and smelled it, and put a cup of it on his tongue and spat it out, and said it will do', _:'somebody has looked at it, and smelled it, and decided it will do'})}. Then everybody does.${b66If('brannoc', `\n\nBrannoc finds his cousin, who is unhurt and ashamed of it, and hits him on the shoulder hard enough to sit him down. "Bucket," Brannoc says. His cousin does not argue.`)}

The Falari right the carts and fill the skins and walk back to the camp with the Fourth, singing, and the song is about the Fourth by the end of the first mile, and none of it is true.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore('b6_c6_camp')}]}),
    b6_c6_falari_after:()=>({sp:'Sweetcreek\'s Falari', scene:'b6_camp_night', again:()=>`Sweetcreek's Falari, singing about the Fourth, inaccurately.`, txt:
`Sweetcreek's Falari are singing the song about the Fourth again. It has more verses now. In the newest one the Fourth fought thirty bandits at the well with its bare hands, and Brisk${b6In('brisk') ? '' : ', whoever that is,'} carried both carts home on her back.${b66If('brisk', ' Brisk has heard it, and has said nothing, which the Falari take for approval.')}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the squad's own scenes at the fire ---- */
    b6_c6_lamp:()=>({sp:'Ohl\'s lamp', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_lamp = 1; b66L('ohl', 1); }, txt:
`Ohl has a small clay lamp lit on a flat stone a little way from the fire, the kind they sell outside temples, and he is sitting in front of it with his hands on his knees.

"Soliel," he says, when you sit down by him, before you can ask. "Twenty-two years I have asked her for things, and mostly she has had other things to do. At G'danisban she answered. Not to me. Through a boy from the Third Regiment who had the fever and lived, and through a thousand like him." He looks at the little flame. "I am not jealous. I tell myself so every night. I light the lamp so that I have to tell myself so."

He is quiet a while. "My list is two hundred and eleven names. It has not got longer since Pale. I would like you to know that I know whose doing that is, partly." He does not say whose. He means you, and Soliel, and a fair amount of luck, and he would not say any of it aloud for anything.`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),
    b6_c6_whistle:()=>({sp:'Brannoc\'s whistle', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_whistle = 1; b66L('brannoc', 1); }, txt:
`Brannoc holds out the tin whistle to whoever is nearest, which is ${b66Say({kettle:'Kettle', tuft:'Tuft', brisk:'Brisk', _:'you'})}. "Falari tune," he says. "Every Falari child learns it before they can walk. It's about a girl who drowns." He considers. "Most Falari tunes are."

${b66Say({kettle:`Kettle takes it, because she is Falari and has been waiting all season for someone to ask, and plays the tune through, clean, with all the notes in it, and hands it back. Brannoc stares at her. "You never said," he says. "You never asked," Kettle says.`, brisk:`Brisk looks at the whistle as if it might go off. Then she takes it, and blows one note, loud and flat, and hands it back, and that is Brisk's music lesson, and Brannoc says it was the best note he's heard all year.`, tuft:`Tuft takes it, and turns it over, and gives it back. "In the Mouse," she says, "a whistle meant run." Brannoc is quiet, for once, and plays something slower.`, _:`You try. It is not good. Brannoc says it is the bravest thing he has seen a sergeant do, and plays the tune himself, badly, all the way through.`})}

The whistle goes back in Brannoc's shirt. The Falari at the next fire have been listening, and one of them shouts across that he is still flat on the third note, and Brannoc shouts back that the third note is flat on purpose, in honour of the girl.`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),
    b6_c6_blue:()=>({sp:'Ressa', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_blue = 1; b66L('ressa', 1); }, txt:
`Ressa is scrubbing at her fingers with a handful of sand, hard, the way you would scrub a pot.

The blue does not come off. It never has. It is dyer's blue, from the vats on her street in G'danisban, and it is in the skin now. "Tomorrow," she says, without looking up, "in Hanar Ara, they will see the blue and the marks and think I'm one of theirs. The fever took my street and left me. They will say it chose me." She scrubs. "It didn't choose anything. It just walked down the street and missed one house."

She throws the sand away and looks at her hands. Still blue. "My mother's hands were this colour," she says. "All her life." She does not scrub again.`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),
    b6_c6_rations:()=>({sp:'Brisk', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_rations = 1; b66L('brisk', 1); }, txt:
`Brisk has the Fourth's rations laid out on a cloak by the fire in rows, biscuit, dried meat, a bag of dates from the last town, and is counting them aloud, the way she does every night, and has done every night since before Pale.

"Eleven days," she says, when she has finished. "Twelve if Kettle stops eating the dates." She looks up. "After Hanar Ara there's nobody left to fight in this country. The Host'll still want feeding." She starts putting the rows back in the sack, in order. "Wars end, Sergeant. Rations don't."

It is the most she has said at one time all season. She seems to know it, and keeps quiet until the sack is tied, and then only, "Eleven."`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),
    b6_c6_satchel:()=>({sp:'Kettle', scene:'b6_camp_night', fx:()=>{ S.f.b6_c6_satchel = 1; b66L('kettle', 1); }, txt:
`Kettle has the satchel's contents out on a blanket in a row, and is counting them with her finger, the way a priest counts beads: two sharpers, a burner, a smoker, and at the end of the row, by itself, the cusser.

"Maud," she says, of the cusser, as if introducing someone. "She's come all the way from the Moranth, and across a sea, and through a plague, and nobody's had to throw her." She touches it, very lightly. "If the war ends at Hanar Ara tomorrow, she'll never go off. I can't tell if that's the best thing that's ever happened to her or the saddest."

She packs it all back, the cusser last, at the bottom, padded. "Don't tell Brisk I talk to it."${b66If('brisk', ' Brisk, three feet away, keeps her back turned, very deliberately.')}`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),
    b6_c6_skywatch:()=>({sp:'The sky', scene:'b6_sky', again:()=>`The sky over the camp, clear and empty, and the camp pretending not to look at it.`, txt:
`You lie back on the ground by the fire and look at the sky a while. It is very clear, the way it is in this country after the heat goes, and full of stars, and empty of anything that moves.

${S.f.b6_c6_lights ? `Last night twelve lights came down out of it, just there, below where the moon will rise. Tonight there is nothing. Somewhere out on the scrub to the north-east they came down, or did not; nobody in the Host has gone to look, and nobody has been told to.` : `The camp says lights came down out of it last night, below the moon. You missed most of it, looking at other things. Tonight there is nothing.`}${b66Say({tuft:`

Tuft lies down beside you, without asking, and looks up too. "She used to say the sky was the Deck nobody can read," she says. Tattersail. "I never knew if she meant it." After a while she gets up and goes back to the lamp.`, sohra:`

Sohra lies down beside you and names the stars in Rhivi, one after another, until you stop listening and only hear the names.`, _:''})}`,
      ch:[{t:'Back to the fire.', go:'b6_c6_fire'}]}),

    /* the drovers at the tail (phase 1), and the marked by the wagons after */
    b6_c6_drovers:()=>({sp:'The drovers', scene:'b6_sky', fx:()=>{ S.f.b6_c6_drovers = 1; }, again:()=>`The drovers at the tail, at their mules' heads.`, txt: S.f.b6_c6_nightDone ?
`The drovers are re-tying the ropes that were cut, and counting sacks. "Two short," the head drover says, "and the munitions wagon whole. I'd call that a good night, if it hadn't been such a bad one." He touches his forehead to you, which drovers do not do for soldiers.` :
`The drovers at the tail have their mules by the heads and their eyes on the dark beside the road, not the sky.

"Three nights," the head drover says. "Something behind us on the road, three nights. Fires out in the scrub that go out when you look. A rope cut, the first night, and we thought it was rats." He spits. "Tonight the whole column's stood still looking up. If I was a thief, Sergeant, tonight's the night I'd come."`,
      ch:[{t:'"Then we\'ll stand with you."', req:()=>!S.f.b6_c6_nightDone, go:'b6_c6_tail'},
          {t:'Dawn. The column moves.', req:()=>!!S.f.b6_c6_nightDone && b66Ph() < 2, onward:true, go:'b6_c6_dawn'},
          {t:'Back to the Fourth\'s stretch of road.', req:()=>b66Ph() < 2, go:'b6_c6_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_marked:()=>({sp:'The marked, by the wagons', scene:'b6_sky', fx:()=>{ S.f.b6_c6_marked = 1; }, again:()=>`The marked, sitting by the wagons, looking at the sky.`, txt:
`Three of the ones who came out of the dark after the lights are sitting in the road by the last wagon with their hands in their laps. The captain has not decided what to do with them. They have the fever's pale marks on their faces and hands, old ones, healed, the marks of people it touched and did not take.

One of them, a woman, looks up at you. "It opened," she says. "The sky. It opened for us, and you were in the way." She is not angry. She says it the way you would say it had rained. "They said in Hanar Ara it would open. They said we were chosen." She looks back up. "It's closed again now."${b66Say({ohl:`

Ohl sits down in the road beside her and takes her wrist, and counts, and lets it go. "You are well," he says, in Ehrlii, gently. "Whatever chose you, it has finished. Go home." She does not know where that is. He does not have an answer for that either.`, ressa:`

Ressa crouches in front of her, blue fingers showing. The woman looks at them, and at Ressa's face, and smiles, as at a sister. Ressa stands up and walks away and does not come back for a while.`, _:''})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    /* a shrine-keeper on the plain, after the surrender */
    b6_c6_keeper:()=>({sp:'A shrine-keeper', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_keeper = 1; }, again:()=>`The old shrine-keeper, tending stones on the plain.`, txt:
`Out on the plain, in front of the Host's line where nobody told her not to be, an old woman is tending a shrine: a heap of stones, a strip of cloth, a cup with something in it, a few small bones of birds. She has the fever's marks on her hands, faded nearly white.

"For the ones who walked here and didn't get here," she says, when you stop. "The road's long. Not everybody it chose was strong." She sets a stone on the heap. "You'll be going. The armies always go." She looks at the city behind her. "We stay. We're the ones it left."${b66If('ohl', `

Ohl puts a copper in her cup. She looks at it and at him. "Soliel's healer," she says, knowing it somehow. "Your goddess came late." Ohl says, "She does."`)}${b66If('kettle', `

Kettle looks at the bird bones and away, and keeps her hand off the satchel.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the night's march, onward */
    b6_c6_tomarch:()=>({sp:'The night\'s march', scene:'b6_camp_night', txt: b66Ph() >= 3 ?
`The road east, and the Host gone on along it.` :
`The horns go at full dark, and the Host strikes its canvas and gets onto the road, and walks east all night under the clear sky, and the sky does nothing at all. At dawn, on the plain ahead, there is a city that is not a city: tents and shrines and smoke going up from cook-fires, a great many of them, and round it, in their lines, an army.

Hanar Ara.`,
      ch:[{t:'Draw up on the plain.', req:()=>b66Ph() < 3, onward:true, fx:()=>{ S.f.b6_c6_tomarch = 1; }, go:'b6_c6_hanar_arrive'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 3: Hanar Ara ---- */
    b6_c6_hanar_arrive:()=>({sp:'Before Hanar Ara', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_ph = Math.max(3, b66Ph()); }, txt:
`The Host draws up on the plain before Hanar Ara in the morning, regiment by regiment, in a line a mile long, and stands.

The City of the Fallen is a city of tents and shrines, mostly, low and pale and very many, going back from the plain further than the eye goes, with a few older walls in the middle of it that nobody in the Host can see properly. Round its edge, in their own lines, are Mathok's people: the last rebel army in Seven Cities, horse and foot, drawn up in front of the city as the Host is drawn up in front of them.

Nobody moves. The sun climbs. The Seventh has its place in the line by a cairn of stones, and stands in it.${b66If('ressa', `\n\nRessa studies the shrines. "It took them all and left them," she says. "Like me. And they came here." She looks away. "I walked the other way."`)}`,
      ch:[{t:'To the Seventh\'s place in the line.', onward:true, go:()=>{ startExplore('b6_c6_hanar'); talk('b6_c6_line'); }},
          {t:'Walk the line.', go:()=>startExplore('b6_c6_hanar')}]}),
    b6_c6_line:()=>({sp:'The Seventh\'s place', scene:'b6_hanar_ara', again:()=>`The Seventh's place in the Host's line, by the cairn.`, txt: S.f.b6_c6_surr ?
`The Seventh's place in the line by the cairn, and the plain in front of it, empty now where Mathok's army stood.` :
`The Seventh's place in the Host's line, by a cairn of old stones somebody built here for a reason nobody remembers. The line stands. In front of it, across the plain, Mathok's line stands.

Then, at noon, a stir in Mathok's line, and a gap opening in it, and riders coming out of the gap toward the Host at a walk, under no standard at all.`,
      ch:[{t:'Watch.', req:()=>!S.f.b6_c6_surr, go:'b6_c6_surrender'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_surrender:()=>({sp:'The surrender', scene:'b6_hanar_ara', fx:()=>{ if (S.f.b6_c6_surr) return; S.f.b6_c6_surr = 1; if (b66Voted()) S.f.b6_c6_eye = 1; }, txt:
`It takes all afternoon, and the Fourth sees it from the line, a long way off, the way soldiers see everything that matters.

The riders from Mathok's line meet the High Fist's riders on the plain between the armies, under the High Fist's standard. They talk for a long time. Then Mathok's army comes out from in front of the city, company by company, and the weapons go down on the ground in front of the standard: spears, tulwars, bows, in heaps, glinting. Mathok is the big man at the front of the riders, the soldiers say. He is too far off to have a face.

Then, late in the afternoon, an order comes down the Host's line from the centre, company to company, in the captains' voices, and it is not the order anybody expected. *Let them go.*

And they go. Mathok's people walk away across the plain to the east and the south, in their thousands, slowly, and the Host stands in its line and lets them.

${S.f.b6_c6_eye ? `When it is done, the High Fist rides back along the line with a handful, at a walk, looking at his army. He is a young man, younger than you thought, and tired. His eye goes along the Seventh as he passes, and stops on the Fourth for a moment, at the back of the ranks, where you stood the morning he was chosen. Then it moves on. A High Fist does not stop to talk to sergeants, and he does not.` : `When it is done, the High Fist rides back along the line with a handful, at a walk, looking at his army. He is a young man, younger than you thought, and tired. His eye goes along the Seventh as he passes, and over the Fourth, and on.`}${b66Say({brisk:`\n\nBrisk watches them go. "A whole rebellion," she says. "And they walk home." She does not say whether that is good.`, kettle:`\n\nKettle watches them go. "No munitions," she says. "A whole war's end and no munitions." She sounds like she cannot decide how she feels.`, _:''})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_rebels:()=>({sp:'Mathok\'s rebels, going', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_rebels = 1; }, again:()=>`Mathok's people, walking away across the plain.`, txt:
`A company of Mathok's foot passes along the front of the Seventh on its way east, close enough to talk, walking without weapons. They do not look at the Host. One of them does, an old soldier with a scarred face, and stops, and looks at the Fourth a while.

"I fought Malazans in the Whirlwind," he says. "Not you. Others like you." He looks at the shrines behind him, and back. "Now that is what's left of the Apocalypse." He spits. "Go home, Malazan. We are."

He walks on.${b66If('ohl', `\n\nOhl says something after him in Ehrlii. The old soldier stops, and looks back, and nods, once, and goes. Ohl does not translate it.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_heavies:()=>({sp:'Heavy infantry of the line', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_heavies = 1; }, again:()=>`The Host's heavies, standing in their line.`, txt:
`A file of the Host's heavy infantry stands next along from the Seventh in full mail in the sun, which they have stood in all day without complaint, because heavy infantry have been bred for it.

"The High Fist let them go," one of them says to you, from inside his helm, in the tone of a man reporting the time. "My old sergeant would've had a seizure." He thinks about it. "My old sergeant had a lot of seizures."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_captain_hanar:()=>({sp:'The captain', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_captainHanar = 1; }, again:()=>`The captain, in the Seventh's place.`, txt: !S.f.b6_c6_surr ?
`The captain stands in front of the Seventh with his helmet on, looking across the plain at Mathok's line. "We stand," he says. "Until we're told. That's the whole of it, Sergeant." He does not take his eyes off the plain.` : S.f.b6_c6_cultDone ?
`The captain has the Seventh's picket report in his hand, and is reading it again.` :
`The captain takes his helmet off now the rebels are going, and wipes his face. "The Seventh has the picket at the city's edge tonight," he says. "Not in. The edge. The High Fist wants the Host between the city and the road while Mathok's people get clear, and the Seventh has drawn the stretch by the outer tents." He looks at the shrines. "The people in there are not soldiers. Some of them are sick. All of them are sure of something. Don't go past the shrines, Sergeant. Whatever they shout."`,
      ch:[{t:'To the city\'s edge.', req:()=>!!S.f.b6_c6_surr && !S.f.b6_c6_cultDone, go:'b6_c6_edge'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the edge of the city: the picket, the shrines, and those who tend them. Never past the outer shrines; never the city's centre. */
    b6_c6_edge:()=>({sp:'The city\'s edge', scene:'b6_hanar_ara', again:()=>`The edge of Hanar Ara: the outer tents, the shrines, and the people tending them.`, txt: S.f.b6_c6_cultDone ?
`The city's edge, the outer tents and the first shrines, and the people who tend them going about it as if the fight had not happened, which may be how they bear it.` : !S.f.b6_c6_surr ?
`The outer tents of Hanar Ara are a long bowshot off, past Mathok's line. The Host stands where it is until it is told otherwise.` :
`The edge of the City of the Fallen: low pale tents, and between them, every few paces, a shrine, a heap of stones and rags and offerings, with somebody sitting by it. The people here are thin, and many of them are marked, faces and hands, with the pale scars the fever leaves on the ones it does not take. They watch the Seventh take up the picket with no expression at all.

Then, as the light starts to go, they begin to gather, between the tents, a few and then many, and one of them begins to talk.${b66Burned() ? `\n\n${b66Say({kettle:'Kettle looks at the tents. "We burned a village like this on the coast," she says, low. "On orders." That is all.', _:'The squad remembers a village on the coast, burned on orders.'})}` : b66Passed() ? `\n\n${b66Say({brisk:'Brisk looks at the tents. "We left a family its roofs on the coast," she says. "In a village like this." Whether it was right, she keeps to herself.', _:'The squad remembers a village on the coast, and a family that kept its roofs.'})}` : ''}`,
      ch:[{t:'Hold the picket.', req:()=>!!S.f.b6_c6_surr && !S.f.b6_c6_cultDone, go:'b6_c6_dusk'},
          {t:'Go in among the tents a little way and see who is stirring them up.', check:['guile', 16], req:()=>!!S.f.b6_c6_surr && !S.f.b6_c6_cultDone && !S.f.b6_c6_lookTried, fx:()=>{ S.f.b6_c6_lookTried = 1; },
            edges:id=>[id === 'ressa' && ['they think she is one of them, and she knows how they talk', 3], id === 'ohl' && ['he speaks Ehrlii, and he is old, and nobody fears him', 2], id === 'tuft' && ['a Meanas veil, thin, because the warren here is foul', 1], id === 'brisk' && ['nobody has ever taken Brisk for a pilgrim', -2], id === 'brannoc' && ['a red Falari beard in a city of the marked', -2]],
            near:{t:()=>{ const w = b66Who(); return b66NearFev ? `Yes, but ${b66Nm(w)} ${b66V(w, 'go', 'goes')} in close enough among them to breathe what they breathe, and by the time the light is gone ${b66V(w, 'you are', 'is')} sweating and shaking with it: the fever.` : `Yes, but ${b66Nm(w)} ${b66V(w, 'come', 'comes')} back out from among them with a dozen pairs of eyes on ${b66V(w, 'your', 'the')} back, and ${b66V(w, 'feel', 'feels')} them all night: rattled.`; },
              fx:()=>{ const w = b66Who(); b66NearFev = !S.f.b6_c6_nearFever && b6Catch(w, 'the edge of Hanar Ara'); if (b66NearFev) S.f.b6_c6_nearFever = 1; else b66Rattle(w); }},
            go:'b6_c6_edge_look', fail:'b6_c6_edge_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_edge_look:()=>({sp:'Among the tents', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_looked = 1; }, txt:
`${by({ressa:'Ressa goes in among the tents with her blue fingers showing and her knives out of sight, and the people there make room for her, and call her sister.', ohl:'Ohl goes in among the tents in his robe, an old man with a bag, and nobody stops an old man with a bag.', sgt:'You go in among the tents a little way, quietly, and nobody stops you.', _:'{who} goes in among the tents a little way, quietly, and nobody stops {who}.'})} The one talking is a tall woman with the fever's pale marks across her face like a map, standing on a cart, and she is telling them that the fever chose them, and the city called them, and the soldiers have come to scatter what was chosen. She says the sky opened two nights ago for them. She says it is time.

She does not say who told her so. She has a knife in her sleeve. So do a great many of them.

There is time to get back to the picket and get the shields up before they come. It is not much time.`,
      ch:[{t:'Back to the picket. Shields.', go:()=>startBattle('b6_c6_cult', {surprise:'p'})}]}),
    b6_c6_edge_seen:()=>({sp:'Among the tents', scene:'b6_hanar_ara', txt:
`Somebody between the tents points, and shouts, and the crowd turns all at once, and the talking stops. They have seen a soldier where a soldier should not be. They come.`,
      ch:[{t:'Back to the picket. Shields.', go:()=>startBattle('b6_c6_cult', {surprise:'e'})}]}),
    b6_c6_dusk:()=>({sp:'The picket', scene:'b6_hanar_ara', txt:
`The light goes red, and then grey. Between the outer tents the crowd has grown, and the one talking is louder, and the Seventh's picket stands with its shields grounded and its orders in its head: not past the shrines, whatever they shout.

They shout a great deal. Then the shouting stops.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c6_cult', {})}]}),
    b6_c6_cult_after:()=>({sp:'The city\'s edge', scene:'b6_hanar_ara', html:feverHTML(), fx:()=>{ if (S.f.b6_c6_cultDone) return; S.f.b6_c6_cultDone = 1; gain('b6_c6_hanararobe'); }, txt:
`It is over quickly, once it is over. The crowd goes back among the tents and is not a crowd any more, only people, some of them hurt, sitting by their shrines. The tall woman with the marked face is gone. The Seventh's picket stands at the outer shrines and goes no further.

On the ground at the first shrine there is a heavy undyed robe with small charms sewn into its hem, dropped by somebody who ran. ${b66Say({ressa:'Ressa picks it up, and looks at it, and gives it to you without a word.', _:'You pick it up. It is a good robe. Whoever dropped it will not come back for it.'})}${b6FeverList().length ? `\n\nThen, before full dark, ${b66And(b66Fev())} ${b66Fev().length > 1 ? 'are' : 'is'} sweating, and then shaking, and cannot keep water down. The edge of Hanar Ara. Everybody knew it might.${b6CanCure() ? (b6In('ohl') ? ' Ohl already has his bag open.' : ' A carrier walks the picket line every few hours.') : ' Nobody here can treat it.'}` : ''}${b66If('ressa', `\n\nRessa sits by the first shrine a while, where they called her sister. Then she gets up and comes back to the picket. "They're wrong," she says. "It didn't choose me. It just missed."`)}

The captain is coming along the picket line in the dark, asking each squad what it saw.`,
      ch:[{t:b6In('ohl') ? 'Ohl sees to the fever.' : 'Send for a carrier.', req:()=>b6FeverList().length > 0 && b6CanCure(), fx:()=>{ b66CureAll(b6In('ohl') ? 'Ohl\'s Denul, slow and foul in this place, and enough' : 'a carrier\'s touch'); S.f.b6_c6_cured = 1; }, go:'b6_c6_cured'},
          {t:'The captain. What the Fourth saw.', onward:true, go:'b6_c6_key'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_cured:()=>({sp:'The picket', scene:'b6_hanar_ara', html:feverHTML(), txt: b6In('ohl') ?
`Ohl kneels by them on the picket line with his hands flat, one on each, and reaches for Denul, and his face changes as he does, the way a man's face changes going into cold water. The warren here is foul with the fever. He goes in anyway.

It takes an hour. At the end of it the sweat has stopped and Ohl is grey and shaking himself, and drinks his own tea, and makes a face. "Soliel's carriers do it with a touch," he says. "I do it with an hour and a headache. I like to think mine is more thorough." He does not believe it either.` :
`A carrier comes along the picket line in the dark, a thin man of the Third Regiment who had it at G'danisban, and puts his hand on each fevered forehead for no longer than you would to see if a child is hot, and goes on to the next squad.

Within the hour the sweat stops. The Host has stopped asking why.`,
      ch:[{t:'The captain. What the Fourth saw.', onward:true, go:'b6_c6_key'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the key: the city ---- */
    b6_c6_key:()=>({sp:'The captain', scene:'b6_hanar_ara', again:()=>`The captain on the picket line, waiting for the Fourth's word.`, txt: b66Key() ?
`The captain has gone on along the picket line. ${b66Key() === 'report' ? 'Your words are in his book.' : 'He has nothing from the Fourth in his book, and nothing more to ask.'}` :
`The captain comes along the picket line in the dark with a lantern and a book, asking each squad what it saw, and writing.

"The edge," he says, when he reaches the Fourth. "They came out at you. I heard. Everybody heard." He waits with the pen. "The High Fist let Mathok's army go this afternoon, Sergeant, and the surrender stands as he gave it: the city is the city's, and the Host is not here to sort it. That's the order." He looks at the tents. "But if the Fourth saw something at that edge that the High Fist should know, I'll write it, and send it up, and you can put your name under it. Your call."${b66Say({ohl:`\n\nOhl, behind you, says quietly, "They are sick, and frightened, and very sure. Writing it down will not make them less of any of those."`, brisk:`\n\nBrisk, behind you, says, "Someone told that woman what to say." That is all she says.`, _:''})}${b66If('ressa', `\n\nRessa looks at you and then away, and does not say which she wants.`)}${b66If('brannoc', `\n\nBrannoc, for once, has nothing to say, and says so.`)}`,
      ch:[{t:'"Nothing that changes the order, Captain. Let it stand."', req:()=>!b66Key(), fx:()=>{ S.f.b6_c6_key = 'letgo'; b66L('ohl', 1); b66L('ressa', 1); b66L('brisk', -1); }, go:'b6_c6_letgo'},
          {t:'"Write it down. A cult at the edge, a woman preaching, knives. My name under it."', req:()=>!b66Key(), fx:()=>{ S.f.b6_c6_key = 'report'; b66L('brisk', 1); b66L('kettle', 1); b66L('ohl', -1); }, go:'b6_c6_report'},
          {t:'Back to the picket.', req:()=>!!b66Key(), go:()=>startExplore()},
          {t:'Not yet.', req:()=>!b66Key(), go:()=>startExplore()}]}),
    b6_c6_letgo:()=>({sp:'The captain', scene:'b6_hanar_ara', txt:
`The captain closes his book on nothing. "Let it stand," he says. "Good. The High Fist let a whole army walk away today. I'd not like to be the captain who sent up a page saying he shouldn't have." He lifts the lantern. "Sleep if you can. The Host moves when it moves."

He goes on along the picket.${b66Say({ohl:`\n\nOhl lets out a breath. "Thank you," he says, which he has not said to a sergeant in twenty-two years, and seems surprised to have said it now.`, _:''})}${b66If('brisk', `\n\nBrisk looks at the tents a while longer. "Someone told her what to say," she says again, and leaves it.`)}${b66If('ressa', `\n\nRessa sits down against her pack, sitting up, and closes her eyes, and is asleep almost at once, which she never is.`)}`,
      ch:[{t:'The night, and the road from here.', onward:true, go:'b6_c6_roads'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c6_report:()=>({sp:'The captain', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_reported = 1; }, txt:
`The captain writes it: the edge, the crowd, the woman on the cart with the marked face, what she said, the knives. He writes it in a fair hand, slowly, and turns the book for you to sign, and you sign.

"It'll go up," he says. "To the regiment, and the regiment's Fist, and maybe the High Fist's tent, if anybody up there is reading pages from captains this week." He shuts the book. "And nothing will come of it, Sergeant. The surrender stands, and the High Fist doesn't take back what he gives. But it's written. One day a clerk will find it and know the Fourth said so."

He goes on along the picket.${b66Say({brisk:`\n\nBrisk nods, once, to nobody. "Written," she says. That seems to be enough for her.`, _:''})}${b66If('ohl', `\n\nOhl is quiet a while. Then: "It will not hurt them. Paper never hurts anyone until somebody reads it." He goes to sleep with his back to you, which is the nearest thing to a quarrel the Fourth has had all summer.`)}${b66If('kettle', `\n\nKettle approves. "Records," she says. "Good. Records."`)}`,
      ch:[{t:'The night, and the road from here.', onward:true, go:'b6_c6_roads'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* back toward the Host's camp from the plain */
    b6_c6_away:()=>({sp:'The Host\'s camp', scene:'b6_hanar_ara', txt: b66Key() ?
`Back toward the Host's camp behind the line, where the captain has the company's orders for whatever comes after Hanar Ara.` :
`Back toward the Host's camp behind the line. Not yet: the Seventh is still where it was put.`,
      ch:[{t:'The road from here.', req:()=>!!b66Key(), onward:true, go:'b6_c6_roads'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 4: the Fourth's road (S.f.b6_fourthRoad), read by Ch7's finale ---- */
    b6_c6_roads:()=>({sp:'The Fourth\'s road', scene:'b6_hanar_ara', fx:()=>{ S.f.b6_c6_ph = Math.max(4, b66Ph()); }, again:()=>`The captain's three roads, and the Fourth's to choose.`, txt:
`In the morning, before the Host moves, the captain calls the Seventh's sergeants to his tent, one by one, and when it is your turn he has three papers on the table in front of him.

"The war's done, near enough," he says. "Mathok was the last. So the Host is doing what armies do when a war is done: sorting itself." He touches the first paper. "The Host goes on, wherever the High Fist takes it next, and the Seventh with it." The second. "The High Fist wants a picket left on the Hanar Ara road a while, to see Mathok's people clear and the city quiet, and then come on after." The third. "And the time-served list. The Host's sending its sick and its old hands down to the coast for ships west. ${b66Here().length >= 3 ? 'Half the Fourth\'s been in since before Pale.' : 'The Fourth has been in since before Pale.'} Your names would go on it, if you asked."

He sits back. "One of them's the Fourth's, Sergeant. I'd like to know which by noon."${b66Say({brisk:`\n\nBrisk, outside the tent, has guessed. "Wherever you go," she says, when you come out, "the shield goes." It is as close as she has ever come to saying anything else.`, _:''})}${b66If('ohl', `\n\nOhl, when you tell the squad, looks south-west, toward the coast, toward Ehrlitan, and then at you, and keeps his own counsel, for now.`)}${b66If('brannoc', `\n\nBrannoc, when you tell the squad, says, "Whichever. I'll follow the whistle." He holds up the whistle, as if that explained it.`)}${b66If('ressa', `\n\nRessa, when you tell the squad, says only, "Not back to the city. Any of the others."`)}`,
      ch:[{t:'"On with the Host. The Seventh goes, the Fourth goes."', req:()=>!S.f.b6_fourthRoad, fx:()=>{ S.f.b6_fourthRoad = 'highfist'; b66L('brisk', 1); b66L('brannoc', 1); }, go:'b6_c6_road_highfist'},
          {t:'"The picket on the Hanar Ara road. We\'ll see them clear."', req:()=>!S.f.b6_fourthRoad, fx:()=>{ S.f.b6_fourthRoad = 'hanarara'; b66L('ohl', 1); b66L('ressa', -1); }, go:'b6_c6_road_hanarara'},
          {t:'"Put our names on the list. Time served."', req:()=>!S.f.b6_fourthRoad, fx:()=>{ S.f.b6_fourthRoad = 'home'; b66L('ohl', 1); b66L('kettle', 1); b66L('brisk', -1); }, go:'b6_c6_road_home'},
          {t:'On.', req:()=>!!S.f.b6_fourthRoad, go:'b6_c6_end'},
          {t:'Not yet.', req:()=>!S.f.b6_fourthRoad, go:()=>startExplore()}]}),
    b6_c6_road_highfist:()=>({sp:'With the High Fist', scene:'b6_hanar_ara', txt:
`The captain takes the first paper and writes the Fourth on it, under the Seventh, where it has always been. "Good," he says. "I'd have been short a squad, and you're the one I'd have missed." It is not warmly said. It does not need to be.

The Host strikes its camp at noon and marches, away from Hanar Ara, under a clear sky that does nothing at all, and the Fourth goes with it, in its place, as it has gone with this army since before the Host was the whole of it.${b66If('brannoc', `\n\nBrannoc plays the march on the tin whistle, badly, until the Falari take it up and drown him out, which is what he wanted.`)}${b66If('kettle', `\n\nKettle counts the satchel at the first halt. Same as yesterday. She seems relieved.`)}`,
      ch:[{t:'On.', onward:true, go:'b6_c6_end'}]}),
    b6_c6_road_hanarara:()=>({sp:'The Hanar Ara road', scene:'b6_hanar_ara', txt:
`The captain takes the second paper and writes the Fourth on it. "A few days," he says. "Maybe more. See them clear, keep the road quiet, don't go past the shrines, and come on after when you're sent for." He hands it over. "${b66Key() === 'report' ? 'You named the cult. You can keep an eye on it. From the road.' : 'The High Fist let them go. Make sure they go.'}"

The Host marches at noon and its dust goes away north-east, and the Fourth stays behind on the road with a picket fire and a water cart, between the city's shrines on one side and the empty plain on the other.${b66If('ohl', `\n\nOhl looks at the shrines. "I can be useful here," he says. "A little. For a few days." He opens his bag.`)}${b66If('ressa', `\n\nRessa looks at the shrines too, and then turns her back on them, and sits down facing the road. She will sit that way, it turns out, every day the Fourth is there.`)}`,
      ch:[{t:'On.', onward:true, go:'b6_c6_end'}]}),
    b6_c6_road_home:()=>({sp:'Time served', scene:'b6_hanar_ara', txt:
`The captain takes the third paper and writes the Fourth's names on it, one by one, slowly, and looks at the list when it is done. "Before Pale," he says. "Most of you. That's long enough for anyone." He signs it. "The coast in eight days, and a ship, and west. Where you get off is your business."

The Host marches at noon, north-east. The time-served go the other way, south-west, toward the coast, a long straggle of carts and walkers and the sick getting better, and the Fourth goes with it, and nobody marches in step, because nobody has to.${b66If('ohl', `\n\nOhl walks at the front, for once, setting the pace. "Ehrlitan is along the coast from the ships," he says. "I was born there." He does not say yet what he means to do about it.`)}${b66If('brannoc', `\n\nBrannoc walks with the Fourth as far as the edge of the camp, and then stops. "Sweetcreek's still got a war," he says. "I'll see you to the coast another time." He plays you out of the camp on the tin whistle.`)}`,
      ch:[{t:'On.', onward:true, go:'b6_c6_end'}]}),

    b6_c6_end:()=>{ const k = b66Key() || 'letgo', r = S.f.b6_fourthRoad || 'highfist';
      return {sp:'After Hanar Ara', scene:r === 'home' ? 'b6_sky' : 'b6_hanar_ara', txt:
`${r === 'home' ? 'On the coast road, the first night, you count the Fourth.' : r === 'hanarara' ? 'At the picket fire on the Hanar Ara road, the first night, you count the Fourth.' : 'At the first halt on the night road, you count the Fourth.'} ${b66Here().length ? `It comes out at ${numw(b66Here().length + 1)}, with you. You count twice.` : 'It comes out at one: you. You count twice anyway.'}

${b66Say({brisk:'Brisk counts the rations aloud, the whole of them, to nobody, and then once more.', kettle:'Kettle counts the satchel, the same as yesterday.', tuft:'Tuft keeps the lamp lit.', ohl:'Ohl reads his list by the fire, his lips moving. It is no longer than it was.', _:'The fire burns down.'})}${b66If('brannoc', ' Brannoc plays something on the tin whistle that might be a Falari lament or might be a drinking song. With Brannoc it can be both.')}${b66If('ressa', ' Ressa sleeps sitting up.')}

Overhead the sky is clear, and stays clear, and drops nothing at all.`,
        ch:[{t:r === 'home' ? 'West, to the coast.' : r === 'hanarara' ? 'The picket, and the days after.' : 'On, with the Host.', onward:true, go:()=>chapterEnd(6, k)},
            {t:'Not yet.', go:()=>startExplore()}]}; },
  },
};
