/* ============ Book Ten, Chapter 6: The Feint (the Letherii) ============ */
/* The Sixth Company's last chapter (tcg-canon correction 1, fix A; David's decisions 3 and 5). The Grey Helms gone east (WC21); the King's
   ships at the coast with supplies and very large passengers, seen from the shore and never met (WC21); the allied attack before Kolanse
   City, a feint (WC23; R23.2), on a stretch of the Letherii line canon never names. THE LETHERII'S MORTAL FIGHT (b10_c6_line): whoever falls
   there stays down. Far off and unexplained: the bay going white, something cut in half in the sky over the far tower (rule 107), the dead
   turning a fight at the tower. News after, as headline: the Grey Helms turned on their masters, their leaders are dead, the Commander fell
   and got up (rules 97, 105). Then the Sixth's road out (S.f.b10_lethRoad: letheras / kolanse / free) and the last Witness beat.
   Phases (S.f.b10_c6_ph): 1 first light on the beach (on 'adjunct' the regulars' camp); 2 the Sixth's stretch, before the line; 3 after
   the line: the key S.f.b10_c6_key ('hold': hold the stretch as ordered while the Kolansii break for the far tower, Thegg and Tobet +1;
   'carry': out into the open ground for the wounded, b10Witness(1, 'went back for them'), Ammet and Tirren +1, the open-ground fight);
   4 dusk behind the line: the news, the road, the beat, the end.
   Ch 4 read: b10_c4_horses (the Sixth still has the train's horses: Tirren's line; +2 on setting the stretch, the one check before the
   line) or b10_c4_pace (first down to the King's ships: the scale offered first). Ch 2 read: b10_c2_watched (a line at dusk).
   The 'adjunct' road (correction 4): the regulars' field, its morning, on a stretch of its own; no beach (the ships are rumour). The same
   fight ids and foes. The Third's Chapter 7 is that afternoon on another stretch: never one stretch, never a scene together.
   Never: the commander's ride and the Voice, the forgotten names, the seawater cloud, the Grey Helms' centre and their leaders, the
   Bolkando queen and her old soldier with the Gilk, the giants' fight, the trenches the hill-folk storm, the relief out of the north-east,
   the far tower and anything on it; on 'adjunct' the Adjunct, the plains people's charge, the hill and who held it. Notes:
   docs/tcg-ch6-notes.md. B10CH6.fates holds the Sixth's road page and a fate page per soldier for Chapter 7's finale (Book Nine's shape,
   B9CH6.fates). */
/* FOR THE ARTIST (186b): names this file uses.
   Items: ART['item/b10_c6_shipscale'], ['item/b10_c6_pike'], ['item/b10_c6_kingstally'].
   Figures: tirren (182b), b5_c1_ennic, b5_c1_clerk (Yelt), b9_c2_orla, b9_c2_saffa, b5_c1_tilewoman, b2soldier (a foreign quartermaster on
   'adjunct'); the kinds b10_kolansii (the Kolansii body; with pike, bow and officer variants) and b10_shriven are yours.
   Backdrops: b10_coast (the beach and the King's ships at first light), b10_field (the Sixth's stretch: by day, after the line, at dusk;
   road-aware), b10_battle (the fight at a distance; the bay white and the thing in the sky after the line, 'escort' only), b10_kolanse
   (185b's; the regulars' camp on 'adjunct').
   Ground (TILEX): b10_c6_coast (sand; '~' the sea, 'b' a boat at the waterline, 'C' the King's crates, 'R' a crate for the reading, 'D'
   the drill on the sand, 'H' the horse-lines, 'c' Orla's cart, 'Y' Yelt's tailboard, 'X' the landing's far end, 'T' tents, 'w' wagons);
   b10_c6_field (trodden dry ground; ';' the open ground in front, 'L' the shield line, 'W' / 'E' the stretch's ends, 'S' stakes, 'b' water
   barrels, 'h' the horses, 'Q' a foreign quartermaster's wagon, 'R' a crate, 'D' the drill, 'X' the camp's ditch, 'Y' the paymaster's
   tailboard, 'T' tents, 'w' wagons). Battle 't' is a crate (coast) or a bundle of stakes (field). */

/* ---- small helpers (b106: Book Ten, Chapter Six) ---- */
const b106L = (id, n) => { if (b10In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b106Here = id => b10In(id) || (!!(S.camp || []).includes(id) && !(S.dead && S.dead[id]));
const b106Lc = (id, n) => { if (b106Here(id) && S.loy && S.loy[id] != null) loy(id, n); }; // walking, or with the train
const b106Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b10In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b106If = (id, s) => b10In(id) ? (typeof s === 'function' ? s() : s) : '';
const b106Who = () => (ROLL() && ROLL().who) || 'sgt';
const b106Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b106Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b106V = (id, you, they) => id === 'sgt' ? you : they;
const b106Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b106And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b106Pay = n => { const p = Math.min(n, S.silver || 0); S.silver = (S.silver || 0) - p; if (typeof updSilver === 'function') updSilver(); return p; };
/* the phase: 1 first light (the beach; the regulars' camp), 2 the stretch before the line, 3 after the line (the key), 4 dusk */
const b106Ph = () => { const p = S && S.f && S.f.b10_c6_ph; return [1, 2, 3, 4].includes(p) ? p : 1; };
const b106Key = () => ['hold', 'carry'].includes(S && S.f && S.f.b10_c6_key) ? S.f.b10_c6_key : null;
const b106Adj = () => b10LRoad() === 'adjunct';
const b106A = (road, glass) => b106Adj() ? glass : road;
const b106T = () => b10In('tirren');
/* Chapter Four's key (shared flags first; the default is canon's 'horses') */
const b106Pace = () => !!(S && S.f && (S.f.b10_c4_pace === 1 || (!S.f.b10_c4_horses && b10Key(4) === 'pace')));
const b106Horses = () => !b106Pace();
/* Chapter Two's key: 'watch' (the default) */
const b106Watched = () => !!(S && S.f && (S.f.b10_c2_watched === 1 || (!S.f.b10_c2_counted && (b10Key(2) || 'watch') === 'watch')));
const b106Fell = () => (S && S.f && Array.isArray(S.f.b10_c6_fell) ? S.f.b10_c6_fell : []).filter(id => TPL[id]);
const b106Road = () => b10LethRoad();
const b106Tier = () => b10WitTier();
const b106Low = () => ['hollow', 'doubt'].includes(b106Tier());
const b106High = () => ['kept', 'witnessed'].includes(b106Tier());
const b106Ennic = () => B5_FINADD.short;
const b106LineDone = () => !!(S && S.f && S.f.b10_c6_lineDone);
const b106WorkDone = () => b106Key() === 'carry' ? !!S.f.b10_c6_carried : b106Key() === 'hold' ? !!S.f.b10_c6_held : false;
const b106Scene1 = () => b106Adj() ? 'b10_kolanse' : 'b10_coast';
/* where the stretch is, in the squad's words */
const b106Stretch = () => b106Adj() ? 'a stretch of the foreigners\' line, far from anybody\'s banner' : 'a stretch of the Letherii line before Kolanse City, between a dry ditch and a dead tree';

/* ---- the one line of the other squad a chapter (camp talk; b10OtherName is not used). Its place: at the stretch's east end when the
   two squads stand in one battle (seen at a distance, three stretches off, never on one), else at dusk as news. The Third's Ch 5 key
   rides in it as rumour ('give': their last water to another company's youngest; 'hold': kept it). ---- */
const b106ThirdAt = () => (b106Adj() ? b10TRoad() !== 'south' : b10TRoad() === 'south') ? 'east' : 'dusk';
const b106Third = () => { const give = (b10Key(5) || 'give') !== 'hold', ts = b10TRoad() === 'south';
  if (b106Adj()) return ts
    ? 'Nobody on this field has heard what became of the foreign heavies who were lent to the brigades and went south. "Before Kolanse City, if anywhere," the Finadd says. "Doing this. Somewhere else."'
    : `Far down the line to the east, three stretches off and more, there is a block of foreign heavies standing at the back of a regulars' company as file-closers, big as doors, very still. ${give ? 'Word along the line is that on the last night in the glass they gave their last water to another company\'s youngest.' : 'Word along the line is that on the last night in the glass they kept their last water for themselves, and nobody blames them.'} They do not look round. They will have their own stretch, later.`;
  if (ts) return `Three stretches down the line to the east, at the back of the Twelfth's line, there is a row of foreign heavies standing as file-closers: the ones who drilled the Twelfth on the long way round. ${give ? 'The Twelfth\'s carters say they gave their last water to a carter\'s boy, the night the ration was cut.' : 'The Twelfth\'s carters say they kept their last water, the night the ration was cut, and said so.'} From here they are a grey line of helms. The Twelfth is not the Sixth. Their stretch is their own.`;
  return `A rider off the coast road says the foreigners came out of the glass. All of them that were left. ${give ? 'Word is they were giving each other the last of their water at the end, company to company.' : 'Word is they were down to the last mouthful each at the end, and held it.'} And then, he says, the ground went wet under them. He does not know how. He asked. They did not know either.`; };

/* ---- The Letherii Square: the old brigades' square, called by the sergeant, the spears facing out; it copies Hold the Square (Book
   Seven's b7_c5_square): twice a chapter, a 3×3 within 4, 2d6 and reeling. It strikes, so it uses the action. Not sorcery. ---- */
Object.assign(TRICKS, {
  b10_c6_square:{name:'The Letherii Square', ch:6, use:'chapter', n:2, ab:'t_b10_c6_square', where:'the sand by the King\'s ships at first light, before the feint',
    lore:'The old brigades fought in a square before there were Edur in Letheras: spears out on all four faces, the corners locked, the sergeant in the middle calling it. The brigades stopped drilling it when the Edur came, because the Edur did not fight in the open. An old drill-sergeant or two still remember. On the word the square does not wait to be hit. All four faces take one step out together, spears level, and whatever is closest finds every point at once.',
    get fx(){ return `${trickTimes('b10_c6_square')} a chapter: call the square, range 4. 2d6${lvDmg() ? '+' + lvDmg() : ''} to everything in a 3×3, squad included (stand clear of it), and everything caught is reeling: −3 to hit through the next exchange. It uses the action. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b10_c6_square:{name:TRICKS.b10_c6_square.name, trick:'b10_c6_square', aoe:1, range:4, desc:()=>TRICKS.b10_c6_square.fx,
    run(u, x, y){ const pt = {x, y}; AUDIO.play('sword'); shakeMap();
      later(() => { const caught = B.units.filter(v => v.hp > 0 && cheb(v, pt) <= 1); caught.forEach(v => { v.dazzleUntil = B.round + 1; });
        blast(pt, [[2, 6, lvDmg()], [2, 6, lvDmg()]], '#b8b0a0'); sparks(pt.x, pt.y, 24, '#d8d0c0', .7); }, REDUCE() ? 1 : 260);
      blog(`${u.name} calls the old brigades' square. Four faces step out at once, spears level, and what was nearest meets every point together.`); }},
});

/* ---- the reading: a crate from the King's ships at dawn (on 'adjunct', a crate off the last cart at the regulars' camp) ---- */
B10READ[6] = {back:'b10_c6_fire', backT:'Back to the fire.',
  get scene(){ return S && S.f && b106Adj() ? 'b10_kolanse' : 'b10_coast'; },
  get where(){ return S && S.f && b106Adj() ? 'the lid of a crate off the last cart, at the camp\'s edge' : 'the lid of a crate off the King\'s ships, on the sand'; },
  get set(){ return S && S.f && b106Adj() ? 'First light at the foreigners\' camp, the line forming out on the open ground, and a crate off the last cart standing on its end because it was the only flat thing.' : 'First light on a grey beach, the King\'s ships at anchor, boats coming in loaded, and a crate stencilled with Lether\'s mark standing on the sand with its lid nailed down.'; },
  say:{perrit:'Perrit sits on the sand by the crate and takes the tiles out one at a time, and holds each a moment before she lays it. "Cold," she says. "Still. I wrote it down at every halt. I will write it down here." She lays them anyway. A clerk does not stop keeping the book.',
       tilewoman:'"A dock, soldier," the old woman says, and holds out her hand, and the coin goes in it. "Ships came. I said they would." She shakes the bag. "I did not say what else came with them. I do not know. The tiles have stopped telling me things." She lays them anyway.'}};

/* ---- borrowed pictures until the artist's file (186b) replaces them: the ground and three items ---- */
if (typeof TILEX !== 'undefined') { TILEX.b10_c6_coast ??= (...a) => (TILEX.b10_c2_ground || (() => {}))(...a); TILEX.b10_c6_field ??= (...a) => (TILEX.b9_c6_field || TILEX.b10_c2_ground || (() => {}))(...a); }
if (typeof ART !== 'undefined') [['b10_c6_shipscale', 'b10_c1_scale'], ['b10_c6_pike', 'b10_c2_spear'], ['b10_c6_kingstally', 'b10_c2_tally']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Ten's glossary ---- */
GLOSSX.tcg.push(
  [6, 'The King\'s ships', 'Ships out of Lether, sent round by sea to the coast of Kolanse with water, food, pikes, scale, and passengers bigger than anybody on the beach. Every crate has Lether\'s mark on it. Some of them also have a joke on them, in a clerk\'s hand.', ()=>!!(S && S.book === 'tcg' && S.f && S.f.b10_c6_start && S.f.b10_lRoad !== 'adjunct')],
  [6, 'The feint', 'What the officers called the allies\' attack before Kolanse City, afterwards. At the time the order said only: hold them in front of you. It did not say why, and the Sixth held them.', ()=>!!(S && S.f && S.f.b10_c6_lineDone)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[6] = ['b10_c6_fire'];

/* ---- the squad at the fire: a line at first light and a line at dusk for every soldier the Letherii can field (g: the 'adjunct' road) ---- */
const B106TALK = {
  tobet:[g=>`Tobet has his arrows out on a cloth and is counting them, which he does at every halt, and then counting them again. "${g ? 'The foreigners\' quartermaster gave me twenty' : 'The King\'s ships brought arrows'}," he says. "Real ones. Fletched." He holds one up. "I had forgotten what they were supposed to look like."`,
         g=>`Tobet is sitting with the bow across his knees and the quiver empty beside him. "All of them," he says. "Every one." He looks at the empty quiver. "I counted them out. I will not count them back."`],
  thegg:[g=>`Thegg is eating, slowly, a whole loaf ${g ? 'off the foreigners\' last cart' : 'off the King\'s ships'}, with the face of a man at a funeral that he is enjoying anyway. "My mother's dead say eat before a fight," he says. "They say eat after, too. They are very simple people."`,
         g=>`Thegg is talking to his mother's dead in her tongue, low, at length. When you sit he finishes the sentence first. "I told them who stood next to me," he says. "They wanted all the names. I gave them all the names."`],
  perrit:[g=>`Perrit has the tile-pouch shut on her knee and her hand flat on it. "Cold," she says, before you ask. "I asked them about today. They said what they always say." She looks ${g ? 'out at the line forming' : 'at the ships'}. "I think it is me they are not talking to. Not the day."`,
          g=>`Perrit is writing on the back of a ration chit by the fire, the small hand, the date left off on purpose. "What happened," she says. "Where we stood. Who was beside us." She does not look up. "Somebody should write the true one. The other one will be written by people who were not there."`],
  ammet:[g=>`Ammet is rolling bandages, new ones, ${g ? 'off the foreigners\' surgeons\' cart' : 'off the King\'s ships'}, clean linen still creased from the bale. "More than I have had since Letheras," she says. "That is not a good sign." She keeps rolling.`,
         g=>`Ammet has her hands in a bucket of water, scrubbing, and has been for a while. "It comes off," she says. "It always comes off." She keeps scrubbing anyway. "The rest of it does not come off. That is what the water is for."`],
  ilsa:[g=>`Ilsa is reading the stencil on the side of a crate, upside down, from where she sits. "'Dried fish. With His compliments,'" she reads. "${g ? 'The foreigners\' crates do not say anything at all. I find I miss it.' : 'Somebody in the King\'s stores has a sense of humour. I hope they are not punished for it.'}"`,
        g=>`Ilsa has the little book open and is writing names in a column, very small, with nothing after them. "Not a file," she says. "Never a file." She closes it on her finger. "Only so they are written somewhere a clerk did not decide."`],
  sorvan:[g=>`Sorvan is polishing his scale with sand, the cavalry way. "Open ground," he says. "${g ? 'Flat as a table' : 'Good footing'}. In Bluerose we would ride a field like that and pray they had no pikes." He looks at the ${g ? 'line' : 'pikes on the sand'}. "We have pikes. I find I am glad of it."`,
          g=>`Sorvan is sitting where he can see ${g ? 'what horses the camp has left' : 'the horse-lines'}, as always. "Bluerose ride home," he says. "That was the promise, when you joined. You ride home." He looks at his boots. "I walked here. I think I would like to ride home."`],
  ruuk:[g=>`Ruuk is standing up, eating, looking at the ${g ? 'ridge' : 'sea'}. "My grandmother said the sea was a field nobody could plough," he says. "${g ? 'That ridge is the same, I think.' : 'She never saw it. I will tell her it is grey.'}" He chews. "She will be disappointed. She wanted blue."`,
        g=>`Ruuk is lying on his back looking up. "Birds," he says. "${g ? 'Black ones, over the field.' : 'White ones, over the bay.'} A lot of them." He does not say what they are for. Everybody knows what they are for.`],
  brune:[g=>`Brune has her boots off and her feet ${g ? 'on the bare ground, facing west' : 'in the edge of the sea'}, and her eyes shut. "${g ? 'Further from the Shore than ever' : 'The Shore'}," she says. "It is very quiet." She opens her eyes. "Quiet is not the same as gone. I keep telling myself."`,
         g=>`Brune has said the evening words, facing ${g ? 'west, toward a sea a long way off' : 'the bay'}, and is sitting with her hands open on her knees. "I said the names," she says. "Ours. I do not know if the Shore takes soldiers. I asked it to make room."`],
  pessa:[g=>`Pessa is lying on her back with the boathook across her chest, ${g ? 'on a groundsheet' : 'on the sand'}. "${g ? 'No water at all, here. Not a canal for a thousand leagues.' : 'Real water. Salt, but real.'}" She shuts her eyes. "Wake me if it comes to boathooks."`,
         g=>`Pessa is sitting up, which is unusual, with the boathook upright between her knees. "I hooked one," she says. "By the collar, off the end of a pike. Like a barge-rope." She looks at the hook. "I did not know I could do that. I do not know if I want to know it."`],
  brennet:[g=>`Brennet has grease to the elbow from ${g ? 'a foreign cart\'s axle' : 'a handcart the King\'s ships sent with the stores'}. "Good axle," he says. "There's still a man in Lether who can turn an axle." He wipes his hands, which makes them worse. "I nearly wept. I will not tell anybody that."`,
           g=>`Brennet is sitting on a wagon-tongue in the dusk, where he can see the ${g ? 'carts' : 'train'}. "Every wagon rolled today," he says. "Every one. Up to the line and back." He thinks. "That is the only sum I have any feelings about tonight."`],
  kaedra:[g=>`Kaedra has been out at the ${g ? 'camp\'s edge' : 'end of the beach'} with her bow and come back. "${g ? 'They are coming over the ridge already. Thin. A great many.' : 'The giants are camped at the far end. They are bigger close. I did not go close.'}" She sits. "I wanted to look at something that was not a fight, first."`,
          g=>`Kaedra will not sleep under canvas and has her blanket out in the open, as always, and is not lying on it. "I keep counting the line," she says. "Our stretch. I keep getting a number." She looks at the dark. "It is the right number. I keep counting anyway."`],
  tirren:[g=>`Tirren is at the horse-lines with a hoof in her lap, rasping. "${b106Horses() ? 'They got here,' : 'The ones that are left got here,'}" she says. "${g ? 'All the way across.' : 'All the way round.'}" She sets the hoof down and picks up the next. "I said they would. The Finadd didn't believe me. I didn't either, some days."`,
          g=>`Tirren is with the horses, as always, with her hand flat on a neck and the same few words, low. The horses are not hurt. She is saying them for herself. When she sees you looking she does not stop.`],
};

/* ---- the Letherii's fate pages, for Chapter 7's finale (B10CH6.fates; Book Nine's B9CH6.fates shape). The Letherii's half of the save is
   S while they play and S.th.l while the Third does. Each line reads right on all three roads; the road's paragraph and the sergeant's
   line read the Witness tier. B10_ENDW's titles are kept. ---- */
const b106Half = () => !S ? null : (S.book === 'tcg' && (S.thread || 't') === 'l') ? S : ((S.th && S.th.l) || null);
const b106RoadOf = () => b10LethRoad() || 'letheras';
const b106TierOf = () => { const h = b106Half(); const n = h && h.b10w && typeof h.b10w.n === 'number' ? h.b10w.n : b10WitOf('l'); return b10WitTier(n); };
const B106_FATE = {
  tobet:{letheras:'Tobet goes home to Letheras on the King\'s ships and walks out to the field his grandfather borrowed against, and stands at the edge of it a while, and goes in.', kolanse:'Tobet stays in Kolanse and hunts for the wells\' crews, birds and hares, and counts every arrow back into the quiver at night.', free:'Tobet comes out of the army at the coast with his bow and his tally-stick, and finds he cannot stop counting things, and takes work as a tally-man at a dock.'},
  thegg:{letheras:'Thegg goes home to Letheras and tells his mother\'s dead about Kolanse, in her tongue, at length, every name.', kolanse:'Thegg stays in Kolanse, where a man who can lift a well-cap by himself is worth a company, and is fed accordingly.', free:'Thegg comes out of the army at the coast and walks along the shore northward, toward wherever Tarthenal go, to ask his mother\'s people what comes next.'},
  perrit:{letheras:'Perrit goes home to Letheras with a calfskin full of cold tiles and a stack of ration chits written small, and gives the chits to the Commander\'s clerk, and keeps the tiles.', kolanse:'Perrit stays in Kolanse and lays the tiles for anyone who asks, and tells them the truth: that the tiles are quiet, and that she is listening anyway.', free:'Perrit comes out of the army at the coast, and sits on the sand with the tiles, and waits for them to say something, and they do not, and she goes anyway.'},
  ammet:{letheras:'Ammet goes home to Letheras and hangs a needle on a board by a canal bridge, and takes what people can pay, and sometimes what they cannot.', kolanse:'Ammet stays in Kolanse with the King\'s linen and a bucket of clean water, because the cure is water and time, and Kolanse is short of both.', free:'Ammet comes out of the army at the coast and goes down the beach to the King\'s ships, where somebody needs a surgeon who does not shake.'},
  ilsa:{letheras:'Ilsa goes home to Letheras and walks the canals in a coat that is not grey, and never files anything again, and keeps the little book.', kolanse:'Ilsa stays in Kolanse and writes down the names of the wells as they are dug, in a hand the files would have known, in a book that is not a file.', free:'Ilsa comes out of the army at the coast, and burns nothing, and reads every crate\'s stencil on the beach before she goes, for the jokes.'},
  sorvan:{letheras:'Sorvan goes home to Letheras on the King\'s ships, and asks for a horse at the quay, and rides it home, as Bluerose were promised.', kolanse:'Sorvan stays in Kolanse with what horses are left, and finds himself in charge of all of them, and does not mind.', free:'Sorvan comes out of the army at the coast, and buys the worst horse on the beach, and rides it north, slowly, toward the horse country.'},
  ruuk:{letheras:'Ruuk goes home to Letheras on the King\'s ships and tells everybody on board the name of every bird in Faraed, and is put ashore early.', kolanse:'Ruuk stays in Kolanse, because it is somewhere he has not been, which he says is reason enough, and names its birds.', free:'Ruuk comes out of the army at the coast and walks off inland without saying goodbye, and sends word, much later, that he is fine.'},
  brune:{letheras:'Brune goes home to Letheras on a ship, which is the nearest she has been to the Shore in a long time, and says the evening words at the rail.', kolanse:'Brune stays in Kolanse and fishes the bay with the fish-spear when the ice goes off it, and asks the Shore, politely, for nothing.', free:'Brune comes out of the army at the coast with her fish-spear, and finds a boat with nobody in it, and asks the Shore to tell her whose it was.'},
  pessa:{letheras:'Pessa goes home to Letheras and finds a barge whose owner did not come back, and poles it north, and asks nobody.', kolanse:'Pessa stays in Kolanse, where there are no canals, and starts one, with a spade and the boathook and three Kolansii who think she is mad.', free:'Pessa comes out of the army at the coast, unwraps the boathook, and gets a berth on the first boat going anywhere, as the one who fends off.'},
  brennet:{letheras:'Brennet goes home to Letheras on the tailboard of the last wagon down to the ships, with his own name, as he meant to, and every wagon rolling.', kolanse:'Brennet stays in Kolanse with the carts, because wells need hauling to, and a carter goes where the load is.', free:'Brennet comes out of the army at the coast and takes a handcart the King\'s ships left on the sand, and wheels it off inland to see who needs one.'},
  kaedra:{letheras:'Kaedra goes home on the King\'s ships, and at Letheras keeps walking, west, to her old fort, and looks at its gate, and keeps walking.', kolanse:'Kaedra stays in Kolanse and reads the ground for the well-diggers, where the water was, once, and where it might be again.', free:'Kaedra comes out of the army at the coast and walks off east along the shore, past every edge of every map, to see what the middle looks like.'},
  tirren:{letheras:'Tirren goes home to Letheras on the King\'s ships with the horses that are left, and one of them is hers, and she has told it so.', kolanse:'Tirren stays in Kolanse with the horses, because there is nobody else here who knows that a horse that has stopped has only decided.', free:'Tirren comes out of the army at the coast with one horse on a lead-rein and a rasp at her belt, and goes to find a river town with a forge.'}};
const b106FateDefault = (id, r) => `${TPL[id] ? TPL[id].name : 'They'} ${r === 'free' ? 'comes out of the army at the coast with the rest of the Sixth who wanted it' : r === 'kolanse' ? 'stays in Kolanse with the rest of the Sixth when the brigades sail' : 'goes home to Letheras on the King\'s ships, with the rest of the Sixth'}.`;
const b106SgtFate = (r, tier) => { const low = ['hollow', 'doubt'].includes(tier), high = ['kept', 'witnessed'].includes(tier);
  if (r === 'kolanse') return `You keep the Sixth in Kolanse when the brigades sail, ${high ? 'every one of them who stood with you, and nobody has to be asked twice' : 'every one of them who will stay'}, and the Finadd writes it down and stays as well.`;
  if (r === 'free') return low ? 'You take the Sixth out of the army at the coast, every name off the list, and nobody at the fire asks what for. The Finadd writes the names, and then writes nothing after them.' : 'You take the Sixth out of the army at the coast, every name off the list, and stand on the sand while they go their own ways, and the Finadd writes each name, and what each one meant to do.';
  return low ? 'You take the Sixth home to Letheras on the King\'s ships because there is nothing else to do, and the Finadd writes the names, and you all look at the sea.' : high ? 'You take the Sixth home to Letheras on the King\'s ships, all of it that is left, and on the quay you call the roll once more out loud, and every name answers or is answered for.' : 'You take the Sixth home to Letheras on the King\'s ships, every one of them who stood, and the Finadd writes the names in his own hand.'; };
/* the road's own page: [title, paragraph]; the titles are B10_ENDW's */
const b106RoadPage = (r = b106RoadOf(), tier = b106TierOf()) => { const W = B10_ENDW.l[r] || B10_ENDW.l.letheras, low = ['hollow', 'doubt'].includes(tier), high = ['kept', 'witnessed'].includes(tier);
  const P = {letheras:`The Sixth Company held a stretch in the feint and went home with the Commander's brigades, on the King's ships, to a city that had not decided what to make of them. ${high ? 'They went home as the ones who stood, and said so on the quay, and meant it.' : low ? 'They went home because the ships were going, and did not say much on the way.' : 'They went home, and did not have to explain it to anyone who was there.'}`,
    kolanse:`The Sixth Company held a stretch in the feint and stayed in Kolanse when the brigades sailed, with the horses that were left and a country that needed them. ${high ? 'Nobody had to be asked twice.' : 'It was enough of them to matter.'}`,
    free:`The Sixth Company held a stretch in the feint and came out of the army at the coast, every name on the list, and went its own ways. ${low ? 'What it had been for, they did not say. They did not have to.' : 'Each of them said, at the end, what it had been for. They did not all say the same thing.'}`};
  return [W[0], P[r] || P.letheras]; };
const B106FATES = {
  half:() => b106Half(),
  road:() => b106RoadOf(),
  key:() => (S && S.f && S.f.b10_c6_key) === 'carry' ? 'carry' : 'hold',
  fell:() => b106Fell(),
  roadPage:() => b106RoadPage(),
  /* one squadmate's line (also for the waiting); the sergeant's line for 'sgt' */
  line(id){ const r = b106RoadOf(); return id === 'sgt' ? b106SgtFate(r, b106TierOf()) : (B106_FATE[id] ? B106_FATE[id][r] : b106FateDefault(id, r)); },
  /* every page, in order: walking, waiting, the fallen in Book Ten (today's first), the sergeant last. Each {id, k:'fate'|'gone', label, txt} */
  pages(){ const h = b106Half(); if (!h) return []; const dead = h.dead || {}, today = b106Fell(), adj = (S && S.f && S.f.b10_lRoad) === 'adjunct';
    const walking = (h.squad || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id]), camp = (h.camp || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id] && !walking.includes(id));
    const fell = Object.keys(dead).filter(id => id !== 'sgt' && TPL[id] && !dead[id].from).sort((a, b) => (today.includes(b) ? 1 : 0) - (today.includes(a) ? 1 : 0));
    return [...walking.map(id => ({id, k:'fate', label:'The Sixth', txt:this.line(id)})), ...camp.map(id => ({id, k:'fate', label:'Waiting', txt:this.line(id)})),
      ...fell.map(id => ({id, k:'gone', label:'The fallen', txt: today.includes(id)
        ? `${TPL[id].name} fell on the Sixth's stretch ${adj ? 'of the foreigners\' line, in the morning' : 'before Kolanse City, in the feint'}, holding it. Whoever fell there stayed down. The squad said the name at the fire that night, and on the ${adj ? 'last morning' : 'ships'}, and after.`
        : `${TPL[id].name} did not come to the end of the long way round with the Sixth${dead[id].where ? `: ${dead[id].where}` : ''}. The squad said the name at every fire after.`})),
      {id:'sgt', k:'fate', label:'The sergeant', name:h.name || '', txt:b106SgtFate(b106RoadOf(), b106TierOf())}]; },
};

const B10CH6 = {
  title:B10CH[6], number:'Six',
  get area(){ return (typeof AREAS !== 'undefined' && AREAS[S && S.f && b106Adj() ? 'b10_c6_camp' : 'b10_c6_coast']) || this.areas[0]; },
  intro:{ get loc(){ return S && S.f && b106Adj() ? 'Kolanse' : 'The Kolanse coast'; }, get sub(){ return S && S.f && b106Adj() ? 'The foreigners\' camp · first light' : 'The King\'s ships · first light'; }, get scene(){ return S && S.f && b106Adj() ? 'b10_kolanse' : 'b10_coast'; },
    get cap(){ return S && S.f && b106Adj() ? 'First light out of the glass: thin fields, the foreigners\' camp, and out on the open ground a line forming with a ridge beyond it.' : 'A grey beach at first light, the King\'s ships at anchor, boats coming in low in the water, and a line of crates on the sand longer than the column.'; },
    paras:[
()=> b106Adj() ? `The foreigners came out of the glass, and the few Letherii at the column's tail came out with them. The ground went wet under the column at the end, and then there were thin fields, and empty granaries, and people at the field-edges watching an army walk out of a desert that nobody crosses.` :
`The long way round ends at the sea. The Grey Helms are gone: one morning their dust bent away east off the road and did not come back, and nobody sent word why. The Bolkando went on ahead. The brigades came down to the coast behind them, to a grey beach where the King's ships were already at anchor.`,
()=>`You are Sergeant {sgt}, Sixth Company. ${b106Adj() ? 'A few Letherii who would not turn back, in an army that does not ask anybody why they do anything.' : b106Pace() ? 'The Sixth kept up on the long way round, and was first down to the water.' : 'The Sixth walked its horses the long way round and came down to the coast last, with every horse it had left.'}`,
()=> b106Adj() ? `At first light the foreigners are forming a line across open ground. On the far side of it there is a ridge, and coming over the ridge, the Kolansii. The Sixth has been given a stretch of it.` : `Kolanse City is inland, past the dust. Word is the allies mean to stand in front of it. Word is also that there is water first, and bread, and that the King has sent something else besides.`],
    go:'First light', node:'b10_c6_start'},

  areas:[
    /* 16 x 12 (b10_c6_coast, dawn; 'escort'). The beach: ~ the sea  b a boat at the waterline  C the King's crates  D the drill on the sand
       F the squad's fire  H the horse-lines  R a crate for the reading  Y Yelt's tailboard  c Orla's cart  X the landing's far end, east
       T tents  w wagons  > up to the line */
    { id:'b10_c6_coast', title:'The Kolanse coast · the beach', sub:'First light · the King\'s ships', hint:'Tap ground to move · tap a figure to talk · the sea is north, the landing east, the road to the line south', decor:'b10_c6_coast',
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~b~~~~~~~b~~~~",
            "#..............#",
            "#.CCC....D.....X",
            "#..............#",
            "#..C...F...H...#",
            "#..............#",
            "#.Y....R....c..#",
            "#..............#",
            "#..T..w....T...#",
            "#..............#",
            "#######>########" ],
      walk:'.', triggers:{b:'b10_c6_boats', D:'b10_c6_drill', F:'b10_c6_fire', H:'b10_c6_horses', R:'b10_c6_crate', Y:'b10_c6_yelt', c:'b10_c6_orla', X:'b10_c6_landing', '>':'b10_c6_up'}, start:{x:7, y:6},
      quest:()=> !S.f.b10_c6_orders ? 'The Finadd. He has the morning\'s orders.' : !S.f.b10_c6_scaleGot && !S.f.b10_c6_scaleLate ? 'Yelt, at his tailboard. The ships\' stores are being handed out.' : 'The fire. Then up the road to the line.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=>'b10_c6_ennic', fresh:()=>!S.f.b10_c6_orders},
        {id:'saffa', name:'Saffa, the field cook', kind:'b9_c2_saffa', x:5, y:8, node:()=>'b10_c6_saffa', fresh:()=>!S.f.b10_c6_saffa},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:9, y:8, node:()=>'b10_c6_crate', fresh:()=>false} ] },

    /* 16 x 12 (b10_c6_field, dawn; 'adjunct'). The foreigners' camp out of the glass: T tents  w carts  D the drill  R a crate for the
       reading  F the squad's fire  Q a foreign quartermaster's wagon  X the camp's ditch, east  > out to the line */
    { id:'b10_c6_camp', title:'Kolanse · the foreigners\' camp', sub:'First light · out of the glass', hint:'Tap ground to move · tap a figure to talk · the ditch is east, the line south', decor:'b10_c6_field',
      map:[ "################",
            "#..T....T....T.#",
            "#..............#",
            "#.w....D.......X",
            "#..............#",
            "#..R...F...Q...#",
            "#..............#",
            "#.T....w....T..#",
            "#..............#",
            "#....T....T....#",
            "#..............#",
            "#######>########" ],
      walk:'.', triggers:{D:'b10_c6_drill', F:'b10_c6_fire', R:'b10_c6_crate', Q:'b10_c6_yelt', X:'b10_c6_landing', '>':'b10_c6_up'}, start:{x:7, y:6},
      quest:()=> !S.f.b10_c6_orders ? 'The Finadd. He has the morning\'s orders.' : !S.f.b10_c6_scaleGot ? 'The foreign quartermaster\'s wagon. He is handing out the dead\'s kit.' : 'The fire. Then out to the line.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=>'b10_c6_ennic', fresh:()=>!S.f.b10_c6_orders} ] },

    /* 16 x 12 (b10_c6_field, day; both roads). The Sixth's stretch: ; the open ground in front (no walking)  L the shield line (the mortal
       fight)  W the stretch's west end (the next company)  E its east end (the far sights)  S stakes  b water barrels  h the horses (or
       the stretch's back)  w carts  , the track behind the line  > back to the rear */
    { id:'b10_c6_field', title:'Kolanse · the Sixth\'s stretch', sub:'The line · far from anybody\'s banner', hint:'Tap ground to move · tap a figure to talk · the line is north, the rear south', decor:'b10_c6_field',
      map:[ ";;;;;;;;;;;;;;;;",
            ";;;;;;;;;;;;;;;;",
            "WLLLLLLLLLLLLLLE",
            "#..............#",
            "#..S....,......#",
            "#.......,......#",
            "#..b....,...h..#",
            "#.......,......#",
            "#..w....,....w.#",
            "#.......,......#",
            "#.......,......#",
            "########>#######" ],
      walk:'.,', triggers:{L:'b10_c6_line', W:'b10_c6_west', E:'b10_c6_east', S:'b10_c6_stakes', b:'b10_c6_barrels', h:'b10_c6_back', '>':'b10_c6_todusk'}, start:{x:8, y:9},
      quest:()=> !S.f.b10_c6_fieldOrders ? 'The Finadd, behind the line. He has the order for the day.' : !b106LineDone() ? 'The line, north. They are coming.' : !b106Key() ? 'The Finadd. Something is happening in front of the stretch.' : !b106WorkDone() ? (b106Key() === 'carry' ? 'The line, north. Out into the open ground for the wounded.' : 'The line, north. Hold the stretch.') : 'South, to the rear. The day is going.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=> !S.f.b10_c6_fieldOrders ? 'b10_c6_order' : (b106LineDone() && !b106Key()) ? 'b10_c6_key' : 'b10_c6_ennic', fresh:()=>!S.f.b10_c6_fieldOrders || (b106LineDone() && !b106Key())} ] },

    /* 16 x 12 (b10_c6_field, dusk; both roads). Behind the line at dusk: L the line, still standing (the field after)  E the east end (the
       far sights at dusk)  F the squad's fire  Y the paymaster's tailboard (the King's tallies)  h the horses  w carts  T tents  > the end */
    { id:'b10_c6_dusk', title:'Kolanse · behind the line', sub:'Dusk · the feint over', hint:'Tap ground to move · tap a figure to talk · the line is north, the fire west', decor:'b10_c6_field', dark:true,
      map:[ ";;;;;;;;;;;;;;;;",
            ";;;;;;;;;;;;;;;;",
            "#LLLLLLLLLLLLLLE",
            "#..............#",
            "#.......,......#",
            "#..F....,...Y..#",
            "#.......,......#",
            "#..w....,....h.#",
            "#.......,......#",
            "#..T....,...T..#",
            "#.......,......#",
            "########>#######" ],
      walk:'.,', triggers:{L:'b10_c6_dlook', E:'b10_c6_deast', F:'b10_c6_fire', Y:'b10_c6_tally', h:'b10_c6_back', '>':'b10_c6_onroad'}, start:{x:8, y:8},
      quest:()=> !S.f.b10_c6_news ? 'The Finadd. He has the word from along the line.' : !b106Road() ? 'The Finadd. The staff is asking every sergeant something.' : !b10BeatOf(6) ? 'The fire. One more thing to say.' : 'South, when the squad is ready. The end of it.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=> !S.f.b10_c6_news ? 'b10_c6_news' : !b106Road() ? 'b10_c6_road' : 'b10_c6_ennic', fresh:()=>!S.f.b10_c6_news || !b106Road()} ] } ],

  battles:{
    /* Kolansii at the landing (optional, before the line): starved, driven, come down for the crates; on 'adjunct', in the dry ditch at
       the camp's edge. Not mortal: death checks run. */
    b10_c6_beach:{get title(){ return b106Adj() ? 'The camp\'s ditch' : 'The landing'; }, get style(){ return b106Adj() ? 'b10_c6_field' : 'b10_c6_coast'; },
      get warrenText(){ return b106Adj() ? 'First light at the camp\'s edge · thin fields, dust · the warrens quiet' : 'First light at the waterline · crates, wet sand, the boats coming in · the warrens quiet'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t...t.","........","....t...","........",".t......","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_lkolansii',3,1],['b10_lkolansii',5,1],['b10_lkolbow',2,0],['b10_lkolbow',5,0]], xp:120, after:'b10_c6_beach_after',
      preText:()=> b106Adj() ? `Four of them in the dry ditch at the camp's edge, come down off the ridge in the dark to watch the camp, or to take what they could from it. Kolansii: men and women, thin as rakes, in quilted coats too big for them now. Two have bows. None of them looks as if they chose to be here.`
        : `Four of them at the end of the landing, where the crates are stacked highest: Kolansii, men and women in quilted coats too big for them now, thin as rakes, two with bows. They did not come for the soldiers. They came for the bread. They will go through the soldiers for it, because something behind them has told them to.`},
    /* THE LETHERII'S MORTAL FIGHT. The Kolansii come across the open ground onto the Sixth's stretch; then an officer with two Shriven.
       Death checks do not run here: whoever falls stays down. */
    b10_c6_line:{title:'The Sixth\'s stretch', style:'b10_c6_field', mortal:true,
      get warrenText(){ return b106Adj() ? 'Morning on the foreigners\' line · whoever falls here stays down · the warrens quiet, as if something were holding its breath' : 'Before Kolanse City · whoever falls here stays down · the warrens quiet, as if something were holding its breath'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t..t..","........",".t....t.","........","....t...","........","........","........","##....##"],
      party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]], allies:[['b10_lspear',1,7],['b10_lspear',6,7]],
      foes:[['b10_lkolansii',2,0],['b10_lkolansii',5,0],['b10_lkolansii',3,1],['b10_lkolpike',4,0],['b10_lkolbow',6,0]], xp:400, after:'b10_c6_line_after',
      preText:()=>`They come across the open ground at a walk, and then not at a walk: Kolansii, a great many of them, in quilted coats and old helms, thin, grey in the face, with pikes and blades and nothing in their eyes at all. There is no shouting. They are not being driven by anybody you can see. They are being driven anyway.${b106Say({thegg:'\n\nThegg sets his feet. "Starving," he says. "All of them." He does not lower the shield.', tobet:'\n\nTobet has an arrow on the string and is looking for an officer. There is none in front. There is no officer to shoot.', _:''})}\n\nWhoever falls here stays down.`,
      stage2:{title:'The stretch, the second rush', xp:180, keepAllies:true,
        text:()=>`The first of them are down, or gone back across the open ground, slowly, as if it did not matter much either way. And behind where they were, coming on, an officer with a plumed helm and two who are not starving: tall, in pale cloth over mail, walking as if the ground belonged to them.${b106Adj() ? '' : '\n\nFar off down the line to the west, in the Kolansii centre, the grey ranks that were standing with the Kolansii all morning fold the wrong way, and the noise from there changes.'}${b106Say({ammet:'\n\nAmmet ties off a bandage with her teeth and picks up her blade. "Those two," she says. "They eat."', perrit:'\n\nPerrit reaches for the Holds and finds them where they were, far and cold. "Those two are something else," she says. "Do not let them reach us."', _:''})}\n\nWhoever falls here stays down.`,
        map:["##....##","...tt...","........",".t....t.","........","........","..t..t..","........","........","##....##"],
        party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]],
        foes:[['b10_lkofficer',3,0],['b10_lshriven',2,1],['b10_lshriven',5,1]]} },
    /* 'carry': the open ground after, carrying the wounded back while the last of the Kolansii come on. Survive 4. Not mortal. */
    b10_c6_open:{title:'The open ground', style:'b10_c6_field', warrenText:'The open ground in front of the stretch · the wounded, the dust · the warrens quiet', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold the open ground until the wounded are back behind the shields.'},
      map:["........","...t....","........",".t....t.","........","........","...t....","........","........","##....##"],
      party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]],
      foes:[['b10_lkolansii',2,0],['b10_lkolansii',5,0]], xp:160, after:'b10_c6_open_after',
      waves:[{round:2, foes:[['b10_lkolansii',4,0]], text:'One more comes out of the dust, not toward the far tower but toward the squad, as if nobody had told him.'},
             {round:3, foes:[['b10_lkolbow',6,0]], text:'An archer, kneeling in the open ground, who has not been told either.'}],
      preText:()=>`The open ground in front of the stretch, where the line's own wounded are lying ${b106Adj() ? 'among the dead of both sides' : 'among the dead of both sides, and past them the Kolansii going away toward the far tower in a stream'}. Not all of the Kolansii have gone. A few are still coming, the ones nobody turned.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b10_c6_shipscale:{name:'A scale shirt', slot:'armour', role:'mail', who:null, ac:2, hp:4,
      get line(){ return S && S.f && b106Adj() ? 'A shirt of foreign scale, the small square kind, off a regular who did not come out of the glass. The quartermaster gave it to the Letherii because it fitted one of them and none of his own. It sits heavy and rides well, and the leather under it is still shaped to somebody else.' : 'A long shirt of new scale, out of a crate off the King\'s ships, the leather under it still smelling of the tannery and the rivets still bright. The crate it came in was stencilled with Lether\'s mark and a clerk\'s joke. The scale is not a joke. It turns a pike-point, which is what it was sent for.'; }},
    b10_c6_pike:{name:'A brigade pike', slot:'weapon', role:'reach', who:null, atk:1, dmg:[1,10,3], rng:2,
      get line(){ return S && S.f && b106Adj() ? 'A long ash pike with a leaf head and an iron shoe, of the old brigades\' pattern, that the Finadd had carried across the glass in a cart for no reason he could give. It is too long for anything but a square. That is what it is for.' : 'A long ash pike with a leaf head and an iron shoe, of the old brigades\' pattern, out of a bundle the King\'s ships brought by the hundred. The brigades have not drilled with one since the Edur came. A clerk in Letheras remembered, and sent them anyway.'; }},
    b10_c6_kingstally:{name:'A King\'s tally', slot:'trinket', role:'any', who:null, hp:2, stat:{guile:1},
      get line(){ return S && S.f && b106Adj() ? 'A pay chit in the Finadd\'s hand, for every dock Lether owes the Sixth since the parting, payable on the King\'s ships if anybody ever sees one. It is worth nothing out here. Whoever carries it finds people believe what they say a little more, because they are carrying a promise and look as if they mean to collect.' : 'A notched tally of hard wood with the King\'s mark burned in, one for every soldier, for every dock Lether owes the Sixth since the parting, payable in Letheras. A clerk in the King\'s stores has cut a small smiling face beside the mark. Whoever carries it finds people believe what they say a little more.'; }} },

  scenes:{},

  end:{
    get hold(){ return ['Held', b106Adj() ? 'On the foreigners\' line, far from anybody\'s banner, the Sixth held a stretch in the morning against Kolansii and their pale-cloaked masters. Whoever fell there stayed down. When the Kolansii pulled back across the open ground, the Sixth held where it was told to hold, and was still holding when the order came to stand down.' : 'Before Kolanse City, on a stretch of the Letherii line between a dry ditch and a dead tree, the Sixth held in the feint against Kolansii and their pale-cloaked masters. Whoever fell there stayed down. When the Kolansii broke for the far tower, the Sixth held where it was told to hold, and let them go.']; },
    get carry(){ return ['Went back for them', b106Adj() ? 'On the foreigners\' line, far from anybody\'s banner, the Sixth held a stretch in the morning against Kolansii and their pale-cloaked masters. Whoever fell there stayed down. When the Kolansii pulled back across the open ground, the Sixth went out into it after the line\'s wounded, and brought them in.' : 'Before Kolanse City, on a stretch of the Letherii line between a dry ditch and a dead tree, the Sixth held in the feint against Kolansii and their pale-cloaked masters. Whoever fell there stayed down. When the Kolansii broke for the far tower, the Sixth went out into the open ground after the line\'s wounded, and brought them in.']; } },
  get endScene(){ return 'b10_field'; },
  endCap:()=> b106Adj() ? 'Dusk on the foreigners\' field, the open ground quiet, and behind the line the Sixth at a small fire of its own.' : 'Dusk before Kolanse City, the bay white far off, the open ground quiet, and behind the line the Sixth at a small fire of its own.',
  tease:'Next: the Third, for the last time. A stretch of the regulars\' line, a ridge, and whatever comes over it.',
  fates:B106FATES,

  extras:()=>{ const f = S.f, x = [], fell = b106Fell();
    if (f.b10_c6_lineDone) x.push(fell.length ? `The Kolansii came onto the Sixth's stretch. ${b106And(fell.map(NAME))} fell there.` : 'The Kolansii came onto the Sixth\'s stretch. Every one of the Sixth who stood there walked off it.');
    if (b106Key() === 'hold') x.push(b106Adj() ? 'When the Kolansii pulled back, the Sixth held its stretch as ordered.' : 'When the Kolansii broke for the far tower, the Sixth held its stretch as ordered, and let them go.');
    if (b106Key() === 'carry') x.push('The Sixth went out into the open ground after the line\'s wounded, and brought them in.');
    if (f.b10_c6_squareOk) x.push('An old hand taught the Sixth the brigades\' square, which Lether had forgotten.');
    if (f.b10_c6_beachDone) x.push(b106Adj() ? 'Kolansii in the camp\'s ditch at first light, and the squad put them out of it.' : 'Kolansii at the landing at first light, after the King\'s bread, and the squad put them off it.');
    if (b106Road()) x.push(`At dusk, the Sixth's road out: ${(B10_ENDW.l[b106Road()] || [''])[0]}.`);
    return x; },

  journal:()=>{ const f = S.f, adj = b106Adj(), fell = b106Fell(); return [
    b10BeatOf(6) && 'At the last fire, the squad said what it had all been for.',
    b106Road() && `Chose the road out: ${(B10_ENDW.l[b106Road()] || [''])[0]}.`,
    f.b10_c6_news && (adj ? 'Word at dusk: a Malazan Host came over the ridge, and the Kolansii went down on their knees.' : 'Word at dusk: the Grey Helms turned on their masters, their leaders are dead, and the Commander fell, and got up.'),
    f.b10_c6_carried && 'Went out into the open ground after the line\'s wounded.',
    f.b10_c6_held && 'Held the stretch as ordered.',
    f.b10_c6_lineDone && (fell.length ? `Held the stretch. ${b106And(fell.map(NAME))} did not walk off it.` : 'Held the stretch. Everybody walked off it.'),
    !adj && f.b10_c6_start && 'The King\'s ships at the coast, with bread, scale, pikes, and giants.',
    adj ? 'The Sixth Company, a few Letherii with the foreigners, out of the glass.' : 'The Sixth Company, in the Commander\'s brigades, before Kolanse City.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: first light (the first halt) ======== */
    b10_c6_start:()=>({sp:b106A('The beach', 'The camp'), scene:b106Scene1(), fx:()=>{ S.f.b10_c6_ph = S.f.b10_c6_ph || 1; S.f.b10_c6_start = 1; }, again:()=> b106Adj() ? 'The foreigners\' camp at first light, the line forming out on the open ground.' : 'The beach at first light, the boats coming in loaded.', txt: b106Adj() ?
`The foreigners' camp at first light is fewer tents than there were, pitched anyhow on thin fields that have not grown anything in years. Out on the open ground past the last tents, companies are walking out in their files and forming a line, quietly, the way they do everything. On the far side of the open ground there is a ridge. Things are moving on it.

${b106Ennic()} is at the camp's edge with his slate under his arm, waiting for the Sixth.${b106Say({tirren:`\n\nTirren has the last of the horses on a picket behind the tents. "${b106Horses() ? 'All here,' : 'What\'s left is here,'}" she says. "They know. Look at their ears."`, perrit:'\n\nPerrit looks at the ridge a long while and puts her hand on the tile-pouch.', _:''})}` :
`The beach is grey sand and grey water, and on the water, at anchor, the King's ships: more of them than anybody in the Sixth has seen in one place, with Lether's colours at the mastheads. Boats are coming in low in the water and going out high. On the sand there is a line of crates longer than the column, and clerks walking along it with slates.

Far down the beach to the east, past the crates, a boat is unloading passengers. They are a long way off, and they are still too big.${b106Pace() ? '\n\nThe Sixth is first down. There is nobody ahead of it at the crates but the clerks, which has never happened to the Sixth before.' : `\n\nThe Sixth is last down, with the train's horses, and the other companies are already at the crates.${b106If('tirren', ' Tirren is leading the grey mare at the front of them, lame in the near hind, still walking.')}`}`,
      ch:[{t:b106Adj() ? 'The Finadd.' : 'The beach.', go:()=>startExplore(b106Adj() ? 'b10_c6_camp' : 'b10_c6_coast')},
          b10ReadChoice(6),
          {t:'Not now.', go:()=>startExplore(b106Adj() ? 'b10_c6_camp' : 'b10_c6_coast')}]}),
    b10_c6_read:()=>b10ReadOffer(6),
    b10_c6_card:()=>b10ReadCard(6),

    /* the crate for the reading (and the tile-woman beside it on 'escort') */
    b10_c6_crate:()=>({sp:b106Adj() ? 'A crate' : 'A crate off the ships', scene:b106Scene1(), txt: b106Adj() ?
`A crate off the last cart, standing on its end at the camp's edge because it is the only flat thing. It has been a table already this morning. There are rings on the lid where cups were.` :
`A crate off the King's ships, standing on the sand, with Lether's mark stencilled on its side and under it, in a clerk's hand: DRIED FISH. WITH HIS COMPLIMENTS. Beside it a small fish has been drawn, smiling.${!S.f.b10_c6_drawn && !S.f.b10_c6_noCard ? '\n\nThe tile-woman is sitting by it on an upturned bucket with her bag on her knees, waiting for custom, as she has at every halt since Letheras.' : ''}`,
      ch:[b10ReadChoice(6), {t:'Back to the beach.', go:()=>startExplore()}]}),

    /* Finadd Ennic: by phase. 1 the morning's orders; 2 the order for the day; 3 the key; 4 the news and the road */
    b10_c6_ennic:()=>{ const ph = b106Ph(), adj = b106Adj();
      if (ph === 4) { if (!S.f.b10_c6_news || !b106Road()) return {sp:B5_FINADD.name, scene:'b10_field', txt:`${b106Ennic()} is coming back along the line with the slate under his arm.`, ch:[{t:'"Finadd."', go:!S.f.b10_c6_news ? 'b10_c6_news' : 'b10_c6_road'}]};
        return {sp:B5_FINADD.name, scene:'b10_field', txt:`${b106Ennic()} is sitting on a crate by the fire with the slate on his knee, writing the Sixth's road under the Sixth's names, in his own hand. "${b106Road() === 'kolanse' ? 'Staying,' : b106Road() === 'free' ? 'Out,' : 'Home,'}" he says, without looking up. "Written."`, ch:[{t:'Back.', go:()=>startExplore()}]}; }
      if (ph === 3) { if (!b106Key()) return {sp:B5_FINADD.name, scene:'b10_battle', txt:`${b106Ennic()} is at the line, watching the open ground.`, ch:[{t:'"Finadd."', go:'b10_c6_key'}]};
        return {sp:B5_FINADD.name, scene:'b10_battle', txt:`${b106Ennic()} is behind the line with his sword out and nobody to use it on. "${b106WorkDone() ? 'Back to the rear when you are ready, Sergeant. The day is going.' : b106Key() === 'carry' ? 'The open ground, Sergeant. Bring them in.' : 'Hold the stretch, Sergeant. That is all of it.'}"`, ch:[{t:'Back.', go:()=>startExplore()}]}; }
      if (ph === 2) { if (!S.f.b10_c6_fieldOrders) return {sp:B5_FINADD.name, scene:'b10_field', txt:`${b106Ennic()} has come back along the line with one line written on his slate.`, ch:[{t:'"Finadd."', go:'b10_c6_order'}]};
        return {sp:B5_FINADD.name, scene:'b10_field', txt:`${b106Ennic()} is walking the back of the stretch with the slate under his arm. "Hold them in front of us, Sergeant. As long as it takes."`, ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}; }
      if (S.f.b10_c6_orders) return {sp:B5_FINADD.name, scene:b106Scene1(), txt:
`${b106Ennic()} is writing on the slate${adj ? ', watching the line form out on the open ground' : ', watching the boats come in'}. "${adj ? 'When you are ready, Sergeant. Out to the line.' : 'The stores first, Sergeant. Then up the road. The line forms before the city.'}"`,
        ch:[{t:'"What else is the column saying?"', req:()=>!S.f.b10_c6_word, go:'b10_c6_ennic_word'},
            {t:'Back.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:b106Scene1(), fx:()=>{ S.f.b10_c6_orders = 1; }, again:()=>`${b106Ennic()}, with his slate. "The stores, Sergeant. Then the line."`, txt: adj ?
`${b106Ennic()} has his slate under his arm and the glass's dust still in the lines of his face. He has not shaved since the glass. None of them has.

"Sergeant." He nods out at the open ground. "The foreigners' officers have given us a stretch. Ours. Far down the line, a long way from their Adjunct and their banners, between two companies of their regulars who do not know us. They will learn." He looks at the ridge. "The Kolansii are coming over that. All morning, by the look. The order is to hold the stretch. That is the whole of the order.

"Their quartermaster has the dead's kit out. Take what fits. Then the line."${b106If('thegg', '\n\nThegg looks at the ridge. "A great many," he says. Ennic says, "Yes."')}` :
`${b106Ennic()} has his slate under his arm and for the first time since the parting there is no dust in the lines of his face. He has washed. He looks younger, and does not like it.

"Sergeant." He nods at the crates. "The King has sent water, bread, scale, pikes, and something else, which you can see from here and which we are not to stare at. The stores are being handed out by company. Yelt has ours.

"Then up the road. The allies form a line before the city, all of us, the brigades included, and the Commander's staff has given the Sixth a stretch of it." He looks inland, at the dust. "I do not know why today. I know where. I will tell you the rest when I am told it."${b106If('perrit', '\n\nPerrit looks at the slate. "You washed," she says. "I washed," Ennic says. "It seemed the time."')}`,
        ch:[{t:'"What else is the column saying?"', req:()=>!S.f.b10_c6_word, go:'b10_c6_ennic_word'},
            {t:adj ? '"The quartermaster, then."' : '"The stores, then."', go:()=>startExplore()},
            {t:'Not now.', go:()=>startExplore()}]}; },
    /* the column's word: where the grey knights went; the lizard-folk gone in the night */
    b10_c6_ennic_word:()=>({sp:B5_FINADD.name, scene:b106Scene1(), fx:()=>{ S.f.b10_c6_word = 1; }, txt: b106Adj() ?
`"That the Kolansii thought this army died in the glass." He says it carefully, the way he says everything he does not yet believe. "That they have been told otherwise this morning, and have come to see." He looks at the ridge. "And that the foreigners' sergeants are not afraid of that, which I find I believe, and do not understand."` :
`"That the Grey Helms went east, off the road, the morning their dust turned, and are somewhere ahead of us now. In front of the city. No word whose side." He says it flatly. "And that the lizard-folk left the column in the night. All of them. Going north, toward a tower nobody will name." He tucks the slate away. "I wrote both down. I do not know what to do with either."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* Yelt and the ships' stores (on 'adjunct', a foreign quartermaster at his wagon): the scale. On Ch 4's 'pace', offered first. */
    b10_c6_yelt:()=>{ const adj = b106Adj();
      if (S.f.b10_c6_scaleGot) return {sp:adj ? 'A foreign quartermaster' : 'Yelt', scene:b106Scene1(), txt: adj ? `The foreign quartermaster is handing out the dead's kit to his own regulars now, a piece at a time, writing each one down.` : `Yelt is at his tailboard with the King's manifest and two pencils, ticking crates off as they go up the road on backs and handcarts. "${b106Pace() ? 'First to the crates,' : 'Last to the crates,'}" he says. "Written."`, ch:[{t:'Back.', go:()=>startExplore()}]};
      if (adj) return {sp:'A foreign quartermaster', scene:'b10_kolanse', fx:()=>{ S.f.b10_c6_scaleGot = 1; gain('b10_c6_shipscale'); }, txt:
`The foreigners' quartermaster is a bald man with a burnt neck, standing at the tailboard of his wagon with a heap of kit beside him: scale, helms, boots, belts, all of it a little too good to be issued and a little too worn to be new. The dead's kit, from the glass.

He looks the Letherii up and down, and holds up a shirt of small square scale against ${b106Say({thegg:'Thegg, and shakes his head, and then against', _:''})} somebody in the Sixth it fits. "Yours," he says. "Fits nobody of mine that's left." He writes it down. "Bring it back if you're done with it. Or don't."`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      if (b106Pace()) return {sp:'Yelt', scene:'b10_coast', fx:()=>{ S.f.b10_c6_scaleGot = 1; gain('b10_c6_shipscale'); }, txt:
`Yelt has the King's manifest open on his tailboard and two pencils behind his ear, and the crates for the brigades stacked behind him by company, the Sixth's first, because the Sixth was first down.

"Scale," he says, and hands it over himself, a long shirt of new scale out of a crate with Lether's mark on it. "One shirt to a squad, the manifest says, until it runs out. It runs out by the fourth company." He ticks it off. "First down gets first pick. I have never once written that sentence about the Sixth. I wrote it twice, to be sure."${b106If('tirren', '\n\nTirren is not looking at the scale. She is looking back up the road at the horses that were left behind it, and saying nothing about them.')}`,
        ch:[{t:'Back to the beach.', go:()=>startExplore()}]};
      if (S.f.b10_c6_scaleLate) return {sp:'Yelt', scene:'b10_coast', txt:`Yelt is ticking crates off the manifest. "The purser's second boat," he says, before you ask. "By dusk. I have written that it will come. It will come."`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'Yelt', scene:'b10_coast', txt:
`Yelt has the King's manifest open on his tailboard and two pencils behind his ear. The crates for the brigades are stacked behind him by company, and the Sixth's are at the end, because the Sixth came down last, with the horses.

"The scale is gone," he says, before you ask. "One shirt to a squad, the manifest says, until it runs out. It ran out at the fourth company." He looks down the beach. "There is a purser on the second boat with a second manifest. Pursers keep things back. It is what pursers are for."${b106If('tirren', '\n\nTirren has the horses on a picket behind the tailboard, every one that started the long way round. "It was worth it," she says, to nobody. "It was."')}`,
        ch:[{t:'Go down to the boats and talk the purser out of the last shirt of scale.', check:['guile', 18], req:()=>!S.f.b10_c6_purserTried, fx:()=>{ S.f.b10_c6_purserTried = 1; },
              edges:id=>[id === 'ilsa' && ['she can read a manifest upside down from across a tailboard', 2], id === 'pessa' && ['canal folk haggle with pursers from the cradle', 1], id === 'brennet' && ['a carter knows what a purser keeps under the tarp', 1], id === 'sgt' && ['you have talked a quartermaster round before', 1], id === 'thegg' && ['pursers do not haggle with Tarthenal; they hide', -1], id === 'sorvan' && ['Bluerose do not haggle', -1]],
              near:{t:()=>`Yes, but the purser wants something for his trouble, and ${b106Nm(b106Who())} ${b106V(b106Who(), 'pay', 'pays')} it out of the squad's docks: three, and a look that says it was cheap.`, fx:()=>b106Pay(3)},
              go:'b10_c6_purser_ok', fail:'b10_c6_purser_no'},
            {t:'Back to the beach.', go:()=>startExplore()}]}; },
    b10_c6_purser_ok:()=>({sp:'The purser', scene:'b10_coast', fx:()=>{ S.f.b10_c6_scaleGot = 1; gain('b10_c6_shipscale'); }, txt:
`The purser is a small man in a big coat on the second boat's thwart, with a manifest of his own and a tarp over something in the stern. ${by({ilsa:'Ilsa reads his manifest upside down, and reads it back to him, and asks politely what is under the tarp.', pessa:'Pessa sits on the gunwale and talks canal cant at him until he gives in to make her stop.', _:'It takes a while, and some patience, and at the end of it the tarp comes back.'})}

Under it there is a shirt of new scale, the last, with Lether's mark on the leather. "Kept it for an officer," the purser says. "Officers are slow down to the boats." He hands it over. "Tell your quartermaster I gave it you. He will write it down. They always do."`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),
    b10_c6_purser_no:()=>({sp:'The purser', scene:'b10_coast', fx:()=>{ S.f.b10_c6_scaleLate = 1; }, txt:
`The purser is a small man in a big coat who has been talked at by every sergeant on the beach this morning, and has a face for it. He says there is no scale. He says it several times.

Yelt, when he hears, writes something in the manifest's margin and underlines it. "The second boat goes out and comes back by dusk," he says. "I will be on the sand when it does. There will be scale on it, or the purser will have to explain to me why not, in writing." He believes this. So, after a moment, does the squad.`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),

    /* the boats at the waterline: the very large passengers, seen from the shore and never met */
    b10_c6_boats:()=>({sp:'The waterline', scene:'b10_coast', fx:()=>{ S.f.b10_c6_giants = 1; }, again:()=>'The boats coming in and going out, and far down the beach the giants\' fire.', txt:
`The boats come in on the swell and ground on the sand, and the crews go over the side into the water to their waists and run the crates up the beach in a chain. They are Letherii, and they are cheerful, which is strange to see.

Far down the beach to the east, one boat is not carrying crates. It is carrying passengers, and it sits so low in the water that the oars only just clear. The passengers wade ashore without waiting for it to ground. They are a long way off. Even from here they are taller than anybody has a right to be, a tall man's height and half as much again, with long hair and long swords, and they walk up the beach as if it had been put there for them.

The brigades do not go down that end. The King's clerks go round them.${b106Say({ruuk:'\n\nRuuk watches them with deep interest. "My grandmother told me about people like that," he says. "From the north of everywhere." He considers. "She said they ate soldiers. I think she was making a point."', thegg:'\n\nThegg looks down the beach a while. "My father was big," he says at last. "Not like that."', tobet:'\n\nTobet does not count them. He starts to, and stops.', _:'\n\nThe squad watches them a while, and then goes back to the crates.'})}`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),

    /* the drill: the trick. An old drill-sergeant of the brigades on the sand (on 'adjunct', the Finadd himself) */
    b10_c6_drill:()=>{ const adj = b106Adj(), tried = !!S.f.b10_c6_squareTried, te = adj ? 'The Finadd' : 'The old drill-sergeant';
      return {sp:adj ? B5_FINADD.name : 'The drill on the sand', scene:b106Scene1(), fx:()=>{ if (!S.f.b10_c6_pikeGot) { S.f.b10_c6_pikeGot = 1; gain('b10_c6_pike'); } }, again:()=> S.f.b10_c6_squareOk ? 'The sand where the Sixth learned the square.' : 'The drill, the pikes, the old word.', txt: tried ?
`${S.f.b10_c6_squareOk ? `The Sixth has the square. ${te} has gone on to the next squad and is shouting at them instead.` : `${te} has gone on to the next squad. The Sixth has most of the square. Most is a word sergeants do not like.`}` :
`${adj ? `${b106Ennic()} has a long pike out of the Sixth's cart, an old one, the brigades' pattern, and is standing in an open space between the tents with it upright. "I carried a bundle of these across the glass," he says. "Do not ask me why. I think I knew." He grounds it.` : `On a flat stretch of sand above the waterline an old drill-sergeant of the brigades, white-moustached, with a voice like a door, has a bundle of new pikes off the ships and a squad at a time in front of him.`}

"The square," ${adj ? 'he' : 'the old man'} says. "The old brigades fought in a square before the Edur came. Spears out on all four faces, corners locked, the sergeant in the middle calling it. We stopped drilling it because the Edur would not fight in the open." ${adj ? 'He' : 'He'} looks ${adj ? 'out at the open ground' : 'inland, at the dust'}. "These people will. So. On the word, the square does not wait. All four faces take one step out, together, spears level. Whatever is closest meets every point at once.

"Sergeant in the middle. You call it." ${adj ? 'He holds out the pike.' : 'He holds out a pike, off the bundle.'} "Everybody gets one of these. Keep it."${b106If('thegg', '\n\nThegg takes a pike and holds it as if it might break. It will not. It is a good pike.')}`,
        ch:[{t:'Drill the square on the word until the four faces step as one.', check:['wits', 20], trick:'b10_c6_square', req:()=>!S.f.b10_c6_squareTried, fx:()=>{ S.f.b10_c6_squareTried = 1; },
              edges:id=>[id === 'sgt' && ['you were a brigade soldier before you were a sergeant: the square was the first drill', 2], id === 'sorvan' && ['a Bluerose lancer knows exactly what a square does to horse', 2], id === 'thegg' && ['the corner of a square is where they put the biggest', 1], id === 'ilsa' && ['she has read the old drill-book in the files', 1], id === 'brennet' && ['the train makes the same square with its wagons', 1], id === 'tirren' && ['a horse will not go into a hedge of points; she knows why', 1], id === 'pessa' && ['canal folk do not stand in squares; they get out of the way', -1], id === 'ruuk' && ['Faraed fight loose, and do not like being in the middle', -1]],
              go:'b10_c6_drill_ok', fail:'b10_c6_drill_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c6_drill_ok:()=>({sp:'The square', scene:b106Scene1(), fx:()=>{ S.f.b10_c6_squareOk = 1; }, txt:
`${by({sgt:'You stand in the middle', sorvan:'Sorvan stands at the front face, where the horse would come', thegg:'Thegg takes the near corner', _:'{who} takes a face'})}, and the four faces turn outward, and the pikes come level, and the old word goes out.

The first time it is a mess. The third time it is a square. The sixth time all four faces step at once, one pace, spears level, on the word, and ${b106Adj() ? 'Ennic' : 'the old drill-sergeant'} keeps quiet, which from ${b106Adj() ? 'him' : 'a drill-sergeant'} is the highest praise there is.

"Again," ${b106Adj() ? 'he says' : 'the old man says'}, anyway. And then, more quietly: "Lether forgot that. Good. Now Lether remembers."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b10_c6_drill_no:()=>({sp:'The square', scene:b106Scene1(), txt:
`The four faces turn outward, and the pikes come level, and the old word goes out, and the front face steps and the back face does not, and for a moment the Sixth is a rectangle with opinions.

They get it in the end, nearly. ${b106Adj() ? 'Ennic' : 'The old drill-sergeant'} looks at the result for a while. "In the open, against people who do not know it, that will do," ${b106Adj() ? 'he says' : 'he says, which is not praise'}. "Keep the pikes. Practise on the march."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* the horse-lines on the beach: Tirren and the horses (Ch 4's key) */
    b10_c6_horses:()=>({sp:b106T() ? 'Tirren' : 'The horse-lines', scene:'b10_coast', fx:()=>{ S.f.b10_c6_horsesSeen = 1; }, again:()=>'The horse-lines on the sand, the horses drinking.', txt: b106Horses() ?
`The train's horses are on a picket above the waterline, drinking from a trough the King's crews filled with fresh water out of a cask, and every horse that started the long way round is there. Thin. Lame, some. Alive.${b106T() ? `\n\nTirren has her arms round the grey mare's neck and her face in the mane. When she looks up she is not crying, quite. "Ash," she says. "Ash made it. Lame in the near hind the whole way, and she made it." She wipes her face. "They'll carry the stakes up to the line. I asked. The Finadd said yes."` : '\n\nThe train\'s old farrier is going down the picket with a rasp, doing feet. "They\'ll carry the stakes up to the line," he says. "Earned their keep, this lot."'}` :
`The train's horses are on a picket above the waterline, drinking from a trough the King's crews filled with fresh water out of a cask. There is a good deal of room on the picket.${b106T() ? `\n\nTirren is going down the line of them with her hand on each neck, and she stops at each one, and says something low, and goes on. At the end of the line there is an empty peg. She stands by it a while. "We kept up," she says. "I know. I was there."` : '\n\nThe train\'s old farrier is going down the picket with a rasp. "We kept up," he says. "These are what keeping up costs. Count them, if you like. I have."'}`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),

    /* Orla, with water to spare for once */
    b10_c6_orla:()=>({sp:'Orla, at her water-cart', scene:'b10_coast', fx:()=>{ S.f.b10_c6_orla = 1; }, again:()=>'Orla at her cart, full, for once.', txt:
`Orla's water-cart is full. She keeps looking at it. "Fresh," she says. "Off the ships. Casks of it." She fills ${b106Say({ammet:'Ammet\'s skins', tobet:'Tobet\'s skin', _:'every skin the squad holds out'})} without counting, which is the first time anybody in the Sixth has seen her do anything without counting.

"I counted every barrel from Letheras," she says. "Twice. Every one." She looks at the full cart. "I do not know what to do with my hands."`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),
    /* Saffa, with bread */
    b10_c6_saffa:()=>({sp:'Saffa, the field cook', scene:'b10_coast', fx:()=>{ S.f.b10_c6_saffa = 1; }, again:()=>'Saffa at her pots, with bread for once.', txt:
`Saffa has bread. Real bread, off the ships, a day old and only a little hard, and she is breaking it and handing it out with a face like somebody handing out medals. "Eat it now," she says. "Before the line. You fight better with bread in you, and if you don't come back, at least you had the bread."${b106Say({pessa:'\n\nPessa takes two pieces and is not stopped.', thegg:'\n\nThegg takes his and holds it a moment before he eats it, as if it might be taken back.', _:''})}`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),

    /* the landing's far end (on 'adjunct', the camp's ditch): Kolansii, optional */
    b10_c6_landing:()=>{ const adj = b106Adj();
      if (S.f.b10_c6_beachDone || S.f.b10_c6_beachLeft) return {sp:adj ? 'The ditch' : 'The landing', scene:b106Scene1(), txt: S.f.b10_c6_beachDone ? (adj ? 'The ditch at the camp\'s edge, empty now.' : 'The end of the landing, the crates restacked, the ships\' guards on them now.') : (adj ? 'The ditch at the camp\'s edge. The foreigners\' pickets have it.' : 'The end of the landing. The ships\' guards have it.'), ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:adj ? 'The camp\'s ditch' : 'The landing', scene:b106Scene1(), txt: adj ?
`East of the last tents a dry ditch runs along the camp's edge, an old field-drain with nothing in it. Something is moving in it, low. Four of them, come down off the ridge in the dark: Kolansii, in quilted coats too big for them, thin as the fields. Two have bows.

They have not seen the Sixth yet. They are watching the camp the way hungry people watch a kitchen.${b106If('kaedra', '\n\nKaedra has an arrow on the string. "They are not scouts," she says. "Look at them. Somebody sent them, and they came."')}` :
`At the east end of the landing, where the crates are stacked highest, four figures have come out of the scrub above the beach and are standing among the crates. Kolansii: men and women in quilted coats too big for them now, thin as rakes. Two have bows. One has a crate open and is eating out of it with both hands.

The ships' guards are down at the boats. The rest of the beach has not seen them yet.${b106If('kaedra', '\n\nKaedra has an arrow on the string and is not drawing it. "They are eating," she says. "Look at them eat."')}`,
        ch:[{t:adj ? 'Put them out of the ditch.' : 'Put them off the crates.', go:()=>startBattle('b10_c6_beach', {})},
            {t:adj ? 'Down the ditch from the north end, and on them before the bows come round.' : 'Round behind the crates, and on them before the bows come round.', check:['guile', 18],
              edges:id=>[id === 'kaedra' && ['she has stalked worse ground than this on the border', 2], id === 'ruuk' && ['he walks ahead quietly for a living', 1], id === 'pessa' && ['canal folk move between stacked cargo without a sound', 1], id === 'tirren' && ['the calm one in the horse-lines is the one nobody watches', 1], id === 'thegg' && ['there is no crate big enough for him', -1], id === 'sorvan' && ['blue scale at dawn is a lantern', -1]],
              near:{t:()=>`Yes, but ${adj ? 'the ditch is full of old thorn' : 'a crate shifts under a boot'}, and ${b106Nm(b106Who())} ${b106V(b106Who(), 'come', 'comes')} out of it ${adj ? 'scratched from wrist to shoulder' : 'with a barked shin and a bruised hand'}. ${b106Nmc(b106Who())}'ll carry that into the fight.`, fx:()=>bruise(b106Who(), bruiseN())},
              go:()=>startBattle('b10_c6_beach', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c6_landing_seen'},
            {t:adj ? 'Leave them to the pickets.' : 'Leave them to the ships\' guards.', fx:()=>{ S.f.b10_c6_beachLeft = 1; }, go:'b10_c6_landing_left'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c6_landing_seen:()=>({sp:b106A('The landing', 'The ditch'), scene:b106Scene1(), txt:
`One of the archers turns, and sees, and says something short, and the other three are up and facing, with the bread still in their hands.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c6_beach', {surprise:'e'})}]}),
    b10_c6_landing_left:()=>({sp:b106A('The landing', 'The ditch'), scene:b106Scene1(), txt: b106Adj() ?
`A foreign corporal with a picket comes along the ditch's lip a little later, and looks down into it, and the four in it go back up toward the ridge without a fight, because there are too many soldiers and not enough of them. The corporal lets them go. They were thin.` :
`The ships' guards come up from the boats a little later at a run, and the four go back into the scrub without a fight, with as much bread as they can carry. The guards do not follow. The bread was going to Kolanse anyway, one of them says. Just not like that.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b10_c6_beach_after:()=>({sp:b106A('The landing', 'The ditch'), scene:b106Scene1(), fx:()=>{ S.f.b10_c6_beachDone = 1; }, txt:
`The two who could still walk have walked, back ${b106Adj() ? 'up toward the ridge' : 'into the scrub'}, slowly, without looking round. The other two are down and do not get up.${b106Adj() ? '' : ' One of them still has bread in his fist.'}

${b106Say({ammet:'Ammet kneels by them and looks, and stands. "Starved," she says. "Before anybody touched them." She goes to see to the squad\'s cuts instead.', kaedra:'Kaedra stands over them with the bow down. "That was what they sent," she says. "Thin people with bread in their hands."', thegg:'Thegg looks at them, and then at the crates, and puts a loaf down on the sand beside them, and leaves it there.', _:'The squad stands a moment. Then the ships\' guards come up and the crates are restacked, and the morning goes on.'})}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* ======== the fire: by phase. 1 first light (the beach; the camp); 2 and 3 the line (no fire); 4 dusk behind the line. The games
       pass wraps this node: keep the id ======== */
    b10_c6_fire:()=>{ const ph = b106Ph(), adj = b106Adj(), rk = ph >= 4 ? 'b10_c6_rest4' : 'b10_c6_rest1', sc = ph >= 4 ? 'b10_field' : b106Scene1();
      if (ph === 2 || ph === 3) return {sp:'The squad', scene:'b10_field', txt:'There is no fire on the line. There will be one tonight, or there will not.', ch:[{t:'Back.', go:()=>startExplore()}]};
      const beatOpen = ph >= 4 && !!b106Road() && !b10BeatOf(6);
      return {sp:'The squad\'s fire', scene:sc, html:witnessHTML(),
        again:()=> ph >= 4 ? 'The squad\'s fire behind the line, small, the field quiet past it.' : (adj ? 'The squad\'s fire at the camp\'s edge, the line forming beyond it.' : 'The squad\'s fire on the sand, driftwood, the ships beyond it.'), txt:
`${ph >= 4 ? `The squad's fire behind the line at dusk, small, of broken pike-shafts and a crate's lid. Past the line the open ground is quiet. ${adj ? 'Far off on the ridge, other fires.' : 'Far off to the north the bay is white, which nobody can explain, and beyond the city the far tower stands up black against the last of the light.'}${b106Fell().length ? `\n\nThere is room round the fire that there was not this morning. The squad leaves it.` : '\n\nEvery one of the Sixth who stood on the stretch this morning is at the fire. The squad keeps looking round to check.'}` :
  adj ? `The squad's fire at the camp's edge is a few broken cart-boards in a ring of stones, with a pot on it. Out on the open ground the line is forming in its files. On the ridge beyond, things are moving.` :
  `The squad's fire on the sand is driftwood, which burns blue and smells of salt, with a pot on it full of something off the ships. The sea comes in and goes out. The Sixth has not been this close to the sea since Letheras.`}${b106If('tirren', ph >= 4 ? '\n\nTirren sits a little back from the fire, where she can see the horses.' : '')}`,
        ch:[...(ph === 1 ? [b10ReadChoice(6)] : []),
            ...(ph >= 4 && !b106Road() ? [{t:'"The Finadd is asking every sergeant something." Go and hear it.', go:'b10_c6_road'}] : []),
            ...(beatOpen ? [{t:'"What was it for, then?" Ask it, at the fire.', go:'b10_c6_beat'}] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(ph >= 4 ? 'The squad sits an hour at the fire behind the line. Wounds close, mostly. Some do not.' : 'The squad sits an hour at the fire. Water, and bread, and nobody counting either. Wounds close, mostly.'); }, go:'b10_c6_fire_rest'},
            {t:'Talk with the squad.', go:'b10_c6_fire_talk'},
            {t:adj ? 'Out to the line.' : 'Up the road to the line.', req:()=>ph === 1 && !!S.f.b10_c6_orders, onward:true, go:'b10_c6_up'},
            {t:'The end of it.', req:()=>ph >= 4 && !!b106Road(), onward:true, go:'b10_c6_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c6_fire_rest:()=>({sp:'The squad\'s fire', scene:b106Ph() >= 4 ? 'b10_field' : b106Scene1(), txt:
`${b106Ph() >= 4 ? 'An hour, then, at the fire behind the line, with the dark coming up out of the open ground and the noise of the field going quiet a piece at a time.' : (b106Adj() ? 'An hour, then, at the camp\'s edge, with the line forming out on the open ground and the light coming up behind the ridge.' : 'An hour, then, on the sand, with the sea coming in and going out and the boats going to and fro.')}

${b106Say({ammet:'Ammet goes round the squad with the new linen and the needle, and says "still" to each of them, and each of them is.', tirren:'Tirren does the squad\'s feet, one pair after another, the way she does the horses\'.', perrit:'Perrit sits with her eyes shut and her hand on the tile-pouch. "Far," she says. "Cold." She does not take her hand away.', _:'Some of them sleep. The rest watch the fire.'})}`,
      ch:[{t:'Back to the fire.', go:'b10_c6_fire'}]}),
    b10_c6_fire_talk:()=>{ const ph = b106Ph(), g = b106Adj(), ln = [];
      Object.keys(B106TALK).forEach(id => { if (b10In(id)) ln.push(ph >= 4 ? B106TALK[id][1](g) : B106TALK[id][0](g)); });
      return {sp:'The squad\'s fire', scene:ph >= 4 ? 'b10_field' : b106Scene1(), txt:ln.length ? ln.join('\n\n') : 'The squad is quiet. You sit with it, and that is the talk.',
        ch:[{t:'Back to the fire.', go:'b10_c6_fire'}]}; },

    /* the way up to the line (the road south off the beach; out of the camp) */
    b10_c6_up:()=>{ const ready = !!S.f.b10_c6_orders, adj = b106Adj();
      return {sp:adj ? 'Out to the line' : 'The road to the line', scene:adj ? 'b10_field' : 'b10_coast', txt: !ready ? 'The Finadd first. He has the morning\'s orders.' : adj ?
`Out of the camp and across the thin fields, in file, to where the foreigners' regulars are standing in their line with a gap in it the width of a squad and a little more. The gap is the Sixth's. ${b106Horses() ? 'The last of the horses come behind with the stakes on their backs.' : 'The squad carries its own stakes.'}` :
`Up off the beach and inland, with the King's bread inside the squad and the King's water on its back, along a road through thin fields to where the allies are forming a line across open ground before Kolanse City. ${b106Horses() ? 'The train\'s horses come behind, carrying the stakes and the water.' : 'The squad carries its own stakes, and the water.'}`,
        ch: ready ? [{t:adj ? 'To the stretch.' : 'Up the road. To the line.', onward:true, fx:()=>{ S.f.b10_c6_ph = 2; }, go:()=>{ startExplore('b10_c6_field'); talk('b10_c6_field_arrive'); }}, {t:'Not now.', go:()=>startExplore()}]
          : [{t:'Back.', go:()=>startExplore()}]}; },

    /* ======== phase 2: the Sixth's stretch, before the line ======== */
    b10_c6_field_arrive:()=>({sp:'The Sixth\'s stretch', scene:'b10_field', again:()=>'The Sixth\'s stretch, the open ground in front, the enemy across it.', txt: b106Adj() ?
`The Sixth's stretch is ${b106Stretch()}: a gap between two companies of regulars who look at the Letherii once and then look back out at the open ground, which is the right place to look.

Across the open ground the Kolansii are coming down off the ridge in their companies, and forming, and forming, more of them than the eye will count. Far off to the east the line goes on out of sight. Somewhere along it is the Adjunct, and her banners. Not here.${b106If('thegg', '\n\nThegg takes his place at the near end without being told, where the biggest goes.')}` :
`The Sixth's stretch is ${b106Stretch()}: forty paces of open ground with a company of the brigades on either side, and the allied line going away left and right further than anybody can see, in the dust.

Across the open ground, the Kolansii line, and in front of it, trenches. Beyond them, Kolanse City, low and brown and bigger than it looks. Beyond the city, far off, a tower, standing up out of everything else, black, very tall. The officers do not name it.${b106If('tirren', b106Horses() ? '\n\nTirren unloads the horses behind the stretch, one stake-bundle at a time, and leads them back down the line to the train, and comes back without them, at a run.' : '')}`,
      ch:[{t:'The stretch.', go:()=>startExplore()}]}),
    /* the order for the day (the feint, as the Sixth hears it) */
    b10_c6_order:()=>({sp:B5_FINADD.name, scene:'b10_field', html:witnessHTML(), fx:()=>{ S.f.b10_c6_fieldOrders = 1; }, txt: b106Adj() ?
`${b106Ennic()} has come back along the stretch from the regulars' captain on the left, and has his slate under his arm and nothing written on it.

"The order," he says. "Hold the stretch. That is all of it. The captain says the Kolansii mean to come at the whole line at once, all morning, and the line is to be there at the end of the morning." He looks at the ridge. "He says it plainly. He says everybody's stretch is a long way from somebody else's, today, and that nobody is coming to help anybody until it is over." He tucks the slate away. "I told him the Sixth was used to that."` :
`${b106Ennic()} has come back along the line from the brigade's officers, and has his slate under his arm and one line written on it.

"The order," he says. "Hold them in front of us. Not beat them. Hold them. As long as it takes." He looks at the city, and past it, at the far tower. "I asked how long that was. The answer was: until it does not matter. I asked when that was. The answer was: you will know." He taps the slate. "I have written that down. It is the strangest order I have ever been given, and I believe it is an honest one."

He nods west, down the line, where the dust is thickest. "And the Grey Helms are over there. In the Kolansii centre. Standing with them." He says it with no expression at all. "Do not look for long. There is nothing to be done about it from here."${b106If('tobet', '\n\nTobet looks anyway. "Grey," he says. "All the way down the long way round, ahead of us." He looks away. "Grey."')}`,
      ch:[{t:'"Then we hold them."', go:()=>startExplore()}]}),
    /* the stretch's west end: the next company */
    b10_c6_west:()=>({sp:'The west end', scene:'b10_field', fx:()=>{ S.f.b10_c6_west = 1; }, again:()=>'The west end of the stretch, the next company\'s shields.', txt: b106Adj() ?
`At the stretch's west end the Sixth's last shield meets the first shield of a regulars' company: a woman with a burned hand and a corporal's knot, who looks at the Letherii shield beside hers and nods, once. "Don't step back," she says. "We won't." That is the whole of the conversation.` :
`At the stretch's west end the Sixth's last shield meets the first shield of the next company of the brigades, the Ninth, whose sergeant is a thin man with a scar through one eyebrow. "Sixth," he says. "Heard you walked your horses. Or kept up. One or the other." He grins. "Don't give ground. I'll be watching." He means it kindly, more or less.${b106If('sorvan', '\n\nSorvan and the Ninth\'s sergeant look at each other. "Bluerose," the sergeant says. "Once," says Sorvan. They leave it there.')}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    /* the stretch's east end: the far sights; the one line of the other squad when both stand in one battle */
    b10_c6_east:()=>{ const third = b106ThirdAt() === 'east';
      return {sp:'The east end', scene:'b10_field', fx:()=>{ S.f.b10_c6_east = 1; if (third) S.f.b10_c6_thirdSaid = 1; }, again:()=>'The east end of the stretch, the line going on out of sight.', txt:
`${b106Adj() ? 'At the stretch\'s east end the line goes on, company after company, out of sight into the dust. The ridge across the open ground is black with Kolansii. They have stopped coming over it. They are all over it now.' : 'At the stretch\'s east end the allied line goes on toward the coast, company after company, the brigades and then the Bolkando in their bright coats. Far off to the north, past the city, there is the bay, grey, with ships on it that are not the King\'s.'}${third ? `\n\n${b106Third()}` : ''}${b106Say({kaedra:'\n\nKaedra stands at the end and looks along the line both ways, counting. "Long," she says. "Thin. Long."', ruuk:'\n\nRuuk looks at the sky over the far side. "Birds," he says. "Waiting." He does not say which side they are waiting on.', _:''})}`,
        ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}; },
    /* the water barrels behind the stretch */
    b10_c6_barrels:()=>({sp:'The barrels', scene:'b10_field', again:()=>'The water barrels behind the stretch.', txt: b106Ph() >= 3 ?
`The barrels behind the stretch are lower than they were. ${b106Say({ammet:'Ammet has one of them open and is using it for the wounded, a cup at a time, and nobody argues.', _:'The wounded have had most of it. The squad does not mind.'})}` :
`${b106Adj() ? 'Two barrels off the foreigners\' carts, filled from the wet ground at the glass\'s edge.' : 'Two barrels off the King\'s ships, full, with Lether\'s mark on the staves.'} A cup hangs on each. What goes out of them is not being counted. It is the first time since the parting that nobody is counting.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    /* the back of the stretch (and at dusk): the horses, Tirren */
    b10_c6_back:()=>{ const ph = b106Ph();
      return {sp:b106T() ? 'Tirren' : 'Behind the stretch', scene:'b10_field', again:()=>'Behind the stretch, where the horses were.', txt: ph >= 4 ?
`${b106Horses() ? 'The train\'s horses have been brought back up behind the line, to carry the wounded down to the surgeons\' carts in the dark.' : 'The few horses the train has left have been brought up behind the line, to carry the wounded down to the surgeons\' carts.'}${b106T() ? ` Tirren is with them, as she always is, with her hand flat on a neck.${b106Horses() ? ' The grey mare is at the front of the line, lame in the near hind, carrying a wounded spearman from the Ninth very carefully.' : ''}` : ''}` :
`Behind the stretch, where the track runs along the line's back, ${b106Horses() ? 'the stakes are stacked where the horses set them down. The horses have gone back to the train. They did their part.' : 'the squad stacked the stakes it carried up itself. It was a long carry.'}${b106T() ? `\n\nTirren is at the stretch's back with her hammer in her belt and a pike in her hands, which she holds the way she holds a horse's lead: firmly, and with an apology. "I'm a farrier," she says. "I know." She does not put it down.` : ''}`,
        ch:[{t:'Back.', go:()=>startExplore()}]}; },
    /* the stakes: setting the stretch (the one check before the line; the horses +2) */
    b10_c6_stakes:()=>{ if (S.f.b10_c6_set || b106LineDone()) return {sp:'The stakes', scene:'b10_field', txt: S.f.b10_c6_set === 'set' ? 'The stakes are in, slanted, in two rows across the front of the stretch. They will not stop anyone. They will slow everyone.' : b106LineDone() ? 'The stakes, what is left of them, broken and trampled.' : 'Some of the stakes are in. Some are lying where they fell. It will have to do.', ch:[{t:'Back to the stretch.', go:()=>startExplore()}]};
      return {sp:'The stakes', scene:'b10_field', txt:
`The stakes are stacked behind the stretch: sharpened poles, a bundle to a squad, ${b106Horses() ? (b106Adj() ? 'carried up from the camp on the last horses\' backs' : 'carried up from the beach on the train\'s horses') : 'carried up on the squad\'s own backs'}. Set in two slanted rows across the front of the stretch, in the hard ground, they will not stop a rush. They will slow it, and spread it, and the Sixth will meet it a few at a time instead of all at once.

The ground is hard. There is not much time.`,
        ch:[{t:'Set the stakes across the front of the stretch, two rows, slanted, before they come.', check:['might', 18],
              edges:id=>[b106Horses() && [b106Adj() ? 'the last horses carried the stakes up, so the squad\'s backs are fresh' : 'the train\'s horses carried the stakes up from the beach, so the squad\'s backs are fresh', 2], id === 'thegg' && ['Tarthenal drive stakes with their hands', 2], id === 'brennet' && ['a carter knows how to set a post in hard ground', 1], id === 'sorvan' && ['a lancer knows exactly where a stake hurts', 1], id === 'sgt' && ['you have set a stretch before, on the Wastes, the day the dust came', 1], id === 'ilsa' && ['she has the arms of a clerk, still', -1], id === 'perrit' && ['the Holds do not drive stakes', -1]],
              near:{t:()=>`Yes, but the mallet glances off a stake-head and takes ${b106Nm(b106Who())} across the hand. ${b106Nmc(b106Who())}'ll carry that into the line.`, fx:()=>bruise(b106Who(), bruiseN())},
              go:'b10_c6_stakes_ok', fail:'b10_c6_stakes_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c6_stakes_ok:()=>({sp:'The stakes', scene:'b10_field', fx:()=>{ S.f.b10_c6_set = 'set'; }, txt:
`${by({thegg:'Thegg drives them with his hands, mostly, and the mallet when the ground argues', sgt:'You call the rows, and the squad drives them', _:'{who} sets the line of them, and the squad drives them'})}: two rows across the front of the stretch, slanted outward, the points at the height of a man's belly.

When it is done the ${b106Adj() ? 'regulars\' corporal at the west end' : 'Ninth\'s sergeant at the west end'} looks along them and nods. That is the whole of the inspection. It is enough.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b10_c6_stakes_no:()=>({sp:'The stakes', scene:'b10_field', fx:()=>{ S.f.b10_c6_set = 'loose'; }, txt:
`The ground is harder than it looks, and the stakes go in crooked and shallow, and half the second row is still lying on the ground when the noise across the open ground changes and everybody stops to look.

It will have to do. It does not look as if it will do.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the line: THE MORTAL FIGHT, signposted on every step into it */
    b10_c6_line:()=>{ const ph = b106Ph();
      if (!S.f.b10_c6_fieldOrders) return {sp:'The line', scene:'b10_field', txt:'The Finadd first. He has the order for the day.', ch:[{t:'Back.', go:()=>startExplore()}]};
      if (ph >= 3) { if (!b106Key()) return {sp:'The line', scene:'b10_battle', txt:'The line holds. In front of it, the Kolansii are doing something the Finadd will want to see.', ch:[{t:'The Finadd.', go:'b10_c6_key'}, {t:'Back.', go:()=>startExplore()}]};
        if (b106WorkDone()) return {sp:'The line', scene:'b10_battle', txt:'The line, quiet now. The open ground in front of it is quiet too, the way open ground is after.', ch:[{t:'Back.', go:()=>startExplore()}]};
        return b106Key() === 'carry' ? DLG.b10_c6_carry() : DLG.b10_c6_hold(); }
      return {sp:'The line', scene:'b10_field', html:witnessHTML(), txt:
`The Sixth's shields are in the line, rim to rim with the companies on either side.${S.f.b10_c6_set === 'set' ? ' The stakes are in front, two slanted rows.' : S.f.b10_c6_set === 'loose' ? ' Some of the stakes are in front.' : ''} Across the open ground the Kolansii are moving. Not running yet. Walking, all together, a great many of them, and the sound of it comes across the ground before they do.

${b106Say({perrit:'Perrit reaches for the Holds one more time. "Still there," she says. "Far." She takes her hand off the pouch and puts it on her blade.', ammet:'Ammet ties her hair back and looks along the squad once, at each of them, a surgeon\'s look. Then she picks up her shield.', thegg:'Thegg sets the big shield at the near end and says something to his mother\'s dead, short.', _:'The squad looks along itself once. Then out.'})}${b106If('tirren', '\n\nTirren is in the line with a pike. Her hands are steady. She has checked.')}

Whoever falls here stays down.`,
        ch:[{t:'"Sixth. Hold." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:()=>startBattle('b10_c6_line', S.f.b10_c6_set === 'set' ? {surprise:'p'} : {})},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b10_c6_line_after:()=>{ const fell = (Array.isArray(S.f.lastFallen) ? S.f.lastFallen : []).filter(id => TPL[id]), adj = b106Adj();
      return {sp:'The stretch', scene:'b10_battle', fx:()=>{ if (!S.f.b10_c6_lineDone) { S.f.b10_c6_lineDone = 1; S.f.b10_c6_fell = fell.slice(); S.f.b10_c6_ph = 3; } if (S.f.sgtScar) S.f.b10_c6_scarSaid = 1; }, txt:
`The second rush goes back across the open ground, what is left of it, and does not come again. The officer with the plumed helm is down in front of the stakes. The two in pale cloth are down. ${adj ? 'Along the line, left and right, the regulars\' companies are still standing.' : 'Along the line, left and right, the brigades are still standing.'}

${fell.length ? `${b106And(fell.map(NAME))} did not get up.\n\n${b106Say({ammet:`Ammet kneels by ${fell.length > 1 ? 'them' : 'the body'} with her bag open, and does not open anything in it, and closes it again.`, perrit:`Perrit kneels and puts her hand flat on ${fell.length > 1 ? 'each of them' : 'the shoulder'}, and reaches for the Holds, and there is nothing there that can help, and she stays a moment anyway.`, thegg:`Thegg stands over ${fell.length > 1 ? 'them' : 'the place'} with the big shield still on his arm and says the ${fell.length > 1 ? 'names' : 'name'} to his mother's dead, so they will know who is coming.`, _:'The Sixth stands a moment where it is.'})}\n\nThe ${fell.length > 1 ? 'fallen are' : 'fallen is'} carried back behind the line and laid down with a cloak over. There is no time for more yet. There will be, tonight.` : `Everybody in the Sixth is standing. Everybody. ${b106Say({tobet:'Tobet counts it, out loud, twice, and gets the same number both times, and does not believe it, and counts again.', ilsa:'Ilsa says the names of the living under her breath, all of them, which she has never done before.', _:'The squad counts itself, twice, and gets the same number both times.'})}`}${S.f.sgtScar && !S.f.b10_c6_scarSaid ? '\n\nThere is blood on your face that is your own. Something opened your cheek and you did not feel it. You feel it now.' : ''}

Then, in front of the stretch, the Kolansii do something nobody expected.`,
        ch:[{t:'The Finadd.', go:'b10_c6_key'}]}; },

    /* the key: the Kolansii break for the far tower (on 'adjunct', pull back across the open ground); hold as ordered, or carry */
    b10_c6_key:()=>{ const adj = b106Adj();
      if (b106Key()) return {sp:B5_FINADD.name, scene:'b10_battle', txt:`${b106Ennic()} is behind the line. "${b106Key() === 'carry' ? 'The open ground, Sergeant.' : 'Hold, Sergeant.'}"`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b10_battle', html:witnessHTML(), fx:()=>{ S.f.b10_c6_keySeen = 1; }, again:()=>`${b106Ennic()}, behind the line. "Hold, or the open ground, Sergeant."`, txt:`${adj ?
`The Kolansii in front of the stretch stop coming. They stand in the open ground a moment, all of them at once, the way birds stop, and then they go back. Not running. Walking back across the open ground toward the ridge, to form again, leaving their dead and ours lying where they fell between the lines.

Some of ours, out there, are moving.

${b106Ennic()} is at your shoulder. "The order is to hold the stretch," he says. "It says nothing about the open ground." He looks out at it. "They will come again. Not yet. There are spears of the line out there who went forward in the first rush and did not come back, and some of them are still alive. Ours to decide, Sergeant. Hold the stretch as ordered. Or go out for them before the Kolansii come again."` :
`The Kolansii in front of the stretch stop. All of them at once, in the middle of the open ground, like a flock turning. Then they turn, and go: not back, and not at the Sixth. Away north, all of them, at a run, toward the far tower beyond the city, as if somebody had called them. They go past the Sixth's front close enough to touch, and do not look at it.

All along the line it is the same. The Kolansii are streaming away toward the tower, and the trenches are emptying, and between the lines the dead and the wounded of both sides are lying in the open ground. Some of ours, out there, are moving.

${b106Ennic()} is at your shoulder. "The order," he says, "is to hold them in front of us." He watches them go. "They are not in front of us. I think that means the order is done, and I think it means nobody knows what comes next." He looks at the open ground. "The stretch holds where it is, as ordered, and lets them go. Or the Sixth goes out for ours, before something else comes. Ours to decide, Sergeant."`}${b106If('thegg', `\n\nThegg is watching the ${adj ? 'ridge' : 'Kolansii go'}. "Hold," he says. "We were told hold."`)}${b106If('ammet', '\n\nAmmet already has her bag on her shoulder. "Some of them are breathing," she says. "I can see them breathing from here."')}${b106If('tirren', '\n\nTirren looks at the open ground the way she looked at the horse that lay down. "Not finished," she says. "Some of them. Only deciding."')}`,
        ch:[{t:'"The Sixth holds. As ordered."', fx:()=>{ S.f.b10_c6_key = 'hold'; b106L('thegg', 1); b106L('tobet', 1); }, go:'b10_c6_hold'},
            {t:'"The Sixth goes out for them."', fx:()=>{ S.f.b10_c6_key = 'carry'; b106L('ammet', 1); b106L('tirren', 1); }, go:'b10_c6_carry'},
            {t:'Not yet.', go:()=>startExplore()}]}; },

    /* 'hold': hold the frightened line while they go past (a Witness check) */
    b10_c6_hold:()=>({sp:'The stretch', scene:'b10_battle', html:witnessHTML(), again:()=>'The stretch, holding, while the open ground empties.', txt: b106Adj() ?
`The Sixth holds the stretch. Out in the open ground the Kolansii are walking back toward the ridge, and some of them are not walking back: they stand, in ones and twos, looking at the line as if they were deciding. The line has to stand still and be looked at. It is harder than the fight was.` :
`The Sixth holds the stretch, and the Kolansii go past it toward the far tower, a few paces off, a stream of them, thin, grey in the face, running. Any one of them could turn into the stretch. The line has to stand still and let them go past, close enough to smell, and not break, and not chase. It is harder than the fight was.`,
      ch:[{t:'Hold. Shields locked. Not a step out, not a step back.', check:['might', 18], witness:true, req:()=>!S.f.b10_c6_held,
            edges:id=>[id === 'thegg' && ['Tarthenal: a wall does not run, and does not chase', 2], id === 'tobet' && ['he can put down the one who turns in, from the second rank', 1], id === 'sgt' && ['the Sixth has held a stretch before, on the Wastes', 1], id === 'sorvan' && ['a lancer knows what a running enemy wants you to do', 1], S.f.b10_c6_squareOk && ['the square, called once: the four faces lock', 1], id === 'pessa' && ['canal folk get out of the way of things bigger than them', -1], id === 'ruuk' && ['every Faraed bone in him says chase', -1]],
            near:{t:()=>`Yes, but one of them does turn into the stretch, at the last, and goes down on the stakes, and ${b106Nm(b106Who())} ${b106V(b106Who(), 'are', 'is')} the one who has to finish it, close. ${b106Nmc(b106Who())} will be a while getting that out of ${b106V(b106Who(), 'your', 'their')} head.`, fx:()=>b106Rattle(b106Who())},
            go:'b10_c6_hold_ok', fail:'b10_c6_hold_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c6_hold_ok:()=>({sp:'The stretch', scene:'b10_battle', fx:()=>{ b106Held('firm'); }, txt:
`The stretch holds. Not a file steps out, and not a file steps back, and ${b106Adj() ? 'the last of the Kolansii in the open ground turn, and walk back to the ridge, and the open ground is empty except for the dead' : 'the stream goes past and thins and is gone, and the open ground in front of the stretch is empty except for the dead and the wounded, and the dust'}.

${b106Say({thegg:'Thegg lowers the shield an inch, no more. "Held," he says, to his mother\'s dead.', tobet:'Tobet lowers the bow. He did not loose. "None of them turned," he says. "I had one picked. Not one turned."', _:'The line breathes out, all along, one long breath.'})}

${b106Sights()}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b10_c6_hold_no:()=>({sp:'The stretch', scene:'b10_battle', fx:()=>{ b106Held('bent'); }, txt:
`The stretch bends. A file at the east end steps back when ${b106Adj() ? 'three of the Kolansii walk straight at it and stop' : 'a knot of them swerves toward it'}, and for a moment there is a gap, and then ${b106Say({thegg:'Thegg is in it, with the big shield, and the gap is gone', sgt:'you are in it, with your shield, and the gap is gone', _:'somebody is in it, and the gap is gone'})}. ${b106Adj() ? 'The Kolansii look at it, and walk back to the ridge.' : 'The knot goes on past, toward the tower, without stopping.'}

It held, in the end. It did not hold well. Everybody on the stretch knows the difference.

${b106Sights()}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* 'carry': out into the open ground (a Witness check, then the fight) */
    b10_c6_carry:()=>({sp:'The open ground', scene:'b10_battle', html:witnessHTML(), again:()=>'The open ground in front of the stretch, the wounded in it.', txt:
`The open ground in front of the stretch is churned and dark, with the dead lying in it, theirs and ours, and among them the line's wounded: spears of ${b106Adj() ? 'the regulars\' companies' : 'the brigades'} who went forward in the first rush and did not come back. Some of them are moving. One is calling, not loudly.

${b106Adj() ? 'The Kolansii are walking back to the ridge. Not all of them. A few in the open ground have not been told, or have not listened.' : 'The Kolansii are streaming away toward the far tower. Not all of them. A few in the open ground have not been turned, and are still coming.'}${b106If('ammet', '\n\nAmmet is at the stakes already, bag on her shoulder. "Pairs," she says. "One carries, one covers. I go where I am needed."')}`,
      ch:[{t:'Out, in pairs, shields on the far side, and bring back every one who is breathing.', check:['wits', 18], witness:true, req:()=>!S.f.b10_c6_carried,
            edges:id=>[id === 'ammet' && ['a surgeon knows who can be moved, and how', 2], id === 'tirren' && ['the farrier\'s hand: she gets the downed ones up', 2], id === 'thegg' && ['he can carry two', 1], id === 'kaedra' && ['she reads the open ground for who is still alive', 1], id === 'pessa' && ['the boathook drags a man by the belt like a barge-rope', 1], id === 'ilsa' && ['she has never carried anybody', -1], id === 'perrit' && ['she is small, and the Holds will not lift', -1]],
            near:{t:()=>`Yes, but the first one ${b106Nm(b106Who())} ${b106V(b106Who(), 'lift', 'lifts')} is heavier than anybody should be, and the ground is churned, and ${b106Nm(b106Who())} ${b106V(b106Who(), 'go', 'goes')} down on one knee on something sharp. ${b106Nmc(b106Who())}'ll carry that.`, fx:()=>bruise(b106Who(), bruiseN())},
            go:()=>startBattle('b10_c6_open', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c6_carry_seen'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b10_c6_carry_seen:()=>({sp:'The open ground', scene:'b10_battle', txt:
`The pairs go out ragged, not together, and the few Kolansii still in the open ground see them come and turn toward them, with nothing in their faces at all.`,
      ch:[{t:'Shields up. Get them in.', go:()=>startBattle('b10_c6_open', {})}]}),
    b10_c6_open_after:()=>({sp:'The open ground', scene:'b10_battle', fx:()=>{ b106Carried(); }, txt:
`The last pair comes back over the stakes with the last of them, a spearman of ${b106Adj() ? 'the regulars' : 'the Ninth'} with his leg strapped to a pike-shaft, swearing in a steady low voice that is the best sound anybody has heard all day. Behind the line the wounded are laid in a row, ${b106Adj() ? 'six of them' : 'seven of them'}, and and ${b10In('ammet') ? 'Ammet goes down it' : 'a surgeon off the brigade\'s carts goes down it'}.

${b106Say({ammet:'"Breathing," Ammet says, at the end of the row. "All of them." She sits down very suddenly on the ground and stays there.', tirren:'Tirren goes down the row with her hand flat on each one, and the same few words, low. "Not finished," she says. "Only deciding."', thegg:'Thegg sets down the last man he carried as if he were glass.', _:'The squad stands at the end of the row and looks at it.'})}${b106Adj() ? '' : `\n\nThe Ninth's sergeant comes along the line and looks at the row, and at the Sixth, and for once has nothing clever ready. He shakes hands with each of the Sixth, one after another, all the way along.`}

${b106Sights()}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the way back to the rear, when the key's work is done: dusk */
    b10_c6_todusk:()=>{ const ready = b106WorkDone();
      return {sp:'The rear', scene:'b10_field', txt: !b106LineDone() ? 'Not yet. The line first.' : !ready ? (b106Key() ? 'The work on the stretch first.' : 'The Finadd first. Something is happening in front of the stretch.') :
`The order comes along the line in the late afternoon, from company to company, the way orders do: stand down, but stay where you are. The line stays where it is, and sits down behind its shields, and the light goes.`,
        ch: ready && b106LineDone() ? [{t:'Dusk.', onward:true, fx:()=>{ S.f.b10_c6_ph = 4; }, go:()=>{ startExplore('b10_c6_dusk'); talk('b10_c6_dusk_arrive'); }}, {t:'Not now.', go:()=>startExplore()}]
          : [{t:'Back.', go:()=>startExplore()}]}; },

    /* ======== phase 4: dusk behind the line ======== */
    b10_c6_dusk_arrive:()=>({sp:'Behind the line', scene:'b10_field', again:()=>'Behind the line at dusk, the field quiet.', txt: b106Adj() ?
`Dusk on the foreigners' field. The line is still standing where it stood in the morning, sitting down behind its shields now. In front of it the open ground is quiet, and there are shapes in it that do not move. The Sixth keeps its eyes off them. There will be time.

Fires are coming up all along the back of the line. One is lit on the Sixth's stretch already, small, out of broken pike-shafts.` :
`Dusk before Kolanse City. The line is still standing where it stood at dawn, sitting down behind its shields now. In front of it the open ground is quiet, and the trenches beyond are empty, and there are shapes in the open ground that do not move. The Sixth does not look at them for long. There will be time.

Far off to the north, past the city, the bay is white. Not foam. White, flat, all the way across, as if it had frozen, which it cannot have. Beyond the city the far tower stands black against the last of the light, and there is no noise from it now at all.`,
      ch:[{t:'Behind the line.', go:()=>startExplore()}]}),
    /* the news: what happened along the line (headline only); the one line of the Third when it falls here; Ch 2's watched line */
    b10_c6_news:()=>({sp:B5_FINADD.name, scene:'b10_field', html:witnessHTML(), fx:()=>{ S.f.b10_c6_news = 1; if (b106ThirdAt() === 'dusk') S.f.b10_c6_thirdSaid = 1; }, txt: b106Adj() ?
`${b106Ennic()} comes back along the line in the dusk with the slate under his arm and the look of a man carrying more than the slate.

"Word down the line," he says. "In the afternoon, after we stood down, a Host came over the ridge behind the Kolansii. A Malazan Host, out of nowhere, the regulars say, and nobody here knew it was coming. And the Kolansii went down on their knees, all of them, across the whole field." He shakes his head. "I am told that is true. I have written it down. I would like somebody else to have seen it as well."${b106ThirdAt() === 'dusk' ? `\n\n${b106Third()}` : ''}${b106Watched() ? `\n\n${b106Say({tobet:'Tobet is looking south, the way the brigades went at the parting. "We watched them go," he says. "South, the long way round. I wonder if they are standing somewhere tonight, the same as us."', perrit:'Perrit is looking south. "We watched the brigades go, at the parting," she says. "I wonder where they stood today."', _:'Somebody says the brigades must be somewhere tonight too, standing in a line. Where, the squad cannot say.'})}` : ''}` :
`${b106Ennic()} comes back along the line in the dusk with the slate under his arm and the look of a man carrying more than the slate.

"Word along the line," he says. He reads it off the slate, because he does not trust himself to remember it right. "The Grey Helms turned on their masters, in the middle of it. In the Kolansii centre, all at once, and that was the end of the centre." He looks up. "Their leaders are dead. All of them, the word is. Not how."

He looks at the slate a while. "And the Commander fell. Out in front of the centre, where the Grey Helms were. He fell." He lets it sit. "And got up. The word is, he got up." He puts the slate under his arm. "I have written it down exactly as it was said to me. I do not understand it. I am very glad of it."${b106ThirdAt() === 'dusk' ? `\n\n${b106Third()}` : ''}${b106Watched() ? `\n\n${b106Say({tobet:'Tobet is looking east, into the dark. "We watched them walk into the glass," he says. "At the parting. Until there was nothing to watch." He is quiet. "I am glad they came out. I did not think they would."', perrit:'Perrit is looking east. "We watched them walk into the glass," she says. "I wrote down that I did not think they would come out." She takes out the chit, and crosses it through, carefully.', _:'Somebody says they watched the foreigners walk into the glass, at the parting, and thought that was the last anybody would see of them. The squad does not argue.'})}` : ''}`,
      ch:[{t:'"And now?"', go:'b10_c6_road'}, {t:'Not now.', go:()=>startExplore()}]}),
    /* the Sixth's ending (S.f.b10_lethRoad): letheras / kolanse (needs b10RoadOpen) / free */
    b10_c6_road:()=>{ const adj = b106Adj(), open = b10RoadOpen('kolanse'), low = b106Low(), high = b106High();
      if (b106Road()) return DLG.b10_c6_road_done();
      return {sp:B5_FINADD.name, scene:'b10_field', html:witnessHTML(), txt:
`"The Commander's staff is asking every sergeant tonight," ${b106Ennic()} says${adj ? ', "or the foreigners are asking it for him, which comes to the same thing,"' : ','} "because there is a decision to be made and the staff would like to know what the soldiers think before it is made for them. Which I have never known a staff to do.

"${adj ? 'The King\'s ships are at the coast, far down, with the brigades. There is a way home, if we walk to it.' : 'The King\'s ships sail for Letheras when the brigades are fed and the wounded are aboard. That is home, for anyone who wants it.'} Kolanse is starving, and will go on starving, and somebody is going to stay and dig wells and plant fields and keep the horses alive. And anyone whose time is served, or who says it is, may come out of the army at the coast, with the King's tally in their hand, and go where they like.

"Home. Stay. Out." He looks at the fire. "The Sixth's answer, Sergeant."

${low ? 'The squad is quiet a long while. Then somebody says, "Home," testing it, as if it might not hold.' : high ? 'The squad looks round the fire at each other first, the way it does now.' : 'The squad looks at the fire, and then at you.'}${b106If('tirren', `\n\nTirren is looking at the horses. "Whatever we say," she says, "the horses need somebody."`)}`,
        ch:[{t:adj ? '"Home. Walk to the ships, and home to Letheras."' : '"Home. Letheras, on the King\'s ships."', fx:()=>{ b106SetRoad('letheras'); b106L('thegg', 1); b106L('sorvan', 1); }, go:'b10_c6_road_done'},
            open ? {t:'"We stay. Kolanse needs hands more than Lether does."', fx:()=>{ b106SetRoad('kolanse'); b106L('ammet', 1); b106L('tirren', 1); }, go:'b10_c6_road_done'}
                 : {t:'"We stay in Kolanse." (closed: the squad has not got it in it tonight)', tag:'closed', go:'b10_c6_road_closed'},
            {t:'"Out. Every name off the list, here, at the coast."', fx:()=>{ b106SetRoad('free'); b106L('pessa', 1); b106L('ruuk', 1); }, go:'b10_c6_road_done'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c6_road_closed:()=>({sp:'The squad\'s fire', scene:'b10_field', html:witnessHTML(), txt:
`You say it, and the squad looks at the fire, and the answer does not come. Not because they disagree. Because there is nothing left in them tonight to build anything on, and they know it, and so do you.

${b106Say({ammet:'"Ask me in a year," Ammet says quietly. "Not tonight."', thegg:'Thegg looks at his hands. "I could dig," he says. "I do not know what for." He stops.', _:'Somebody says "maybe," and does not finish it.'})}

Staying takes believing something. The Sixth is marching because the column does. It will have to be home, or out.`,
      ch:[{t:'Back to the question.', go:'b10_c6_road'}]}),
    b10_c6_road_done:()=>{ const r = b106Road() || 'letheras', adj = b106Adj(), low = b106Low(), high = b106High();
      return {sp:B5_FINADD.name, scene:'b10_field', txt:
`${r === 'letheras' ? `"Home," ${b106Ennic()} says, and writes it. "${adj ? 'We walk to the ships. It is a long way. It is a long way in the right direction.' : 'On the ships. I will tell them.'}"${low ? ' He does not ask anything else. The squad does not offer anything.' : ''}`
  : r === 'kolanse' ? `"Staying," ${b106Ennic()} says, and writes it, and then looks at what he has written for a while. "I will stay as well," he says. "Somebody will need to keep the book." ${high ? 'Round the fire, nobody has to be asked twice.' : 'Round the fire, it is enough of them to matter.'}`
  : `"Out," ${b106Ennic()} says, and writes it, slowly, every name. "Every name off the list, at the coast, with the tally." He looks up. "${low ? 'I will not ask what for. You would not know. I would not either.' : 'I will write, after each name, what each one means to do. If they tell me.'}"`}${b106If('tirren', () => `\n\n${b106TirrenHorse(r)}`)}${b106Say({perrit:'\n\nPerrit has the tile-pouch in her lap and has not opened it. "I do not need to ask them," she says. "We decided. That is what the tiles were always for. To make us decide."', thegg:'\n\nThegg nods slowly. "My mother\'s dead will want to know," he says. "I will tell them."', _:''})}

${b106Ennic()} looks at the fire, and then at you. "One more thing they ask every sergeant tonight. Not for the slate."`,
        ch:[{t:'"Ask it."', req:()=>!b10BeatOf(6), go:'b10_c6_beat'},
            {t:'Back to the fire.', go:()=>startExplore()}]}; },
    /* the Witness beat (c6): the last time, as the ending's words fall */
    b10_c6_beat:()=>{ const r = b106Road() || 'letheras';
      return {sp:'The squad\'s fire', scene:'b10_field', html:witnessHTML(), txt:
`"What was it for?" ${b106Say({ilsa:'Ilsa asks it, very quietly, with the little book shut on her knee.', perrit:'Perrit asks it, with her hand on the tile-pouch.', tobet:'Tobet asks it, looking at the fire.', _:'Somebody asks it, at the fire.'})} "All of it. The parting, the long way round, the horses, the line. ${r === 'kolanse' ? 'Staying.' : r === 'free' ? 'And now, out.' : 'And now, home.'} What was it for?"

Round the fire, the squad waits for the answer. It is the last time anybody will ask.`,
        ch:[{t:'"Each other. To the end of it. That is what it was."', fx:()=>{ b10Beat('kept', 'each other, to the end'); S.f.b10_c6_beat = 'each'; }, go:'b10_c6_beat_done'},
            {t:'"So it was seen. We were here. We saw it, and we will say so."', fx:()=>{ b10Beat('kept', 'we were here'); S.f.b10_c6_beat = 'seen'; }, go:'b10_c6_beat_done'},
            {t:'"Nothing. We stood in a line because we were told to."', fx:()=>{ b10Beat('doubt', 'because we were told'); S.f.b10_c6_beat = 'told'; }, go:'b10_c6_beat_done'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c6_beat_done:()=>{ const w = S.f.b10_c6_beat, r = b106Road() || 'letheras';
      return {sp:'The squad\'s fire', scene:'b10_field', html:witnessHTML(), txt:
`${w === 'each' ? b106Say({thegg:'Thegg nods. "Each other," he says. "My mother\'s dead say the same thing. They are simple people. They are right."', ammet:'Ammet nods, and looks round the fire at each of them, the surgeon\'s look, and this time it is not counting wounds.', tobet:'Tobet nods. "Each other," he says, and leaves the tally-stick in his belt.', _:'The squad says it back, one after another, round the fire. "Each other." It holds.'})
  : w === 'seen' ? b106Say({ilsa:'Ilsa opens the little book and writes a line in it, and turns it round so the fire can light it. We were here. "Not a file," she says. "Never a file."', perrit:'Perrit nods slowly. "The foreigners have a saying," she says. "About being their own witness." She looks at the fire. "I think it was ours as well, all along."', _:'"We were here," somebody says, and the squad says it back, quietly. The foreigners have a saying like that. The Sixth has one now.'})
  : b106Say({pessa:'Pessa laughs, short. "Told to," she says. "Good. I know where I am with told to." She laughs alone, and stops.', sorvan:'Sorvan nods. "Told to," he says. "Bluerose ride where they are told." He does not sound as if it helps.', _:'A laugh, short, at a thing that is not funny. It does not catch.'})}${b106If('tirren', w === 'told' ? '\n\nTirren is looking at the horses. "They don\'t ask what for," she says. "They just carry it." It is not much. She says it anyway.' : '\n\nTirren is looking at the horses, and then back at the fire, and nods.')}

${r === 'letheras' ? 'Down the line, somebody is singing, badly, a song about Letheras.' : r === 'kolanse' ? 'Out past the line, in the dark, Kolanse is very quiet, and very large, and needs everything.' : 'Down at the coast, if you listen, you can hear the sea.'}`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]}; },

    /* the line at dusk: the field after (headline only) */
    b10_c6_dlook:()=>({sp:'The line at dusk', scene:'b10_field', again:()=>'The line at dusk, the open ground quiet.', txt:
`The line is sitting down behind its shields. In front of it, the open ground is dark and quiet, and the shapes in it are where they fell. Details are for the burial details in the morning. ${b106Fell().length ? `The Sixth's own are not out there. They were carried back. They are behind the line, under cloaks, and somebody sits with them.` : 'None of the Sixth is out there. The Sixth keeps saying so, to itself.'}${b106Say({kaedra:'\n\nKaedra stands at the line and looks out at the open ground a long while, and then turns her back on it, deliberately, and walks to the fire.', _:''})}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    /* the east end at dusk: the far sights */
    b10_c6_deast:()=>({sp:'The east end', scene:'b10_field', again:()=>'The east end at dusk.', txt: b106Adj() ?
`From the stretch's east end, at dusk, the field goes on out of sight in the half-dark, and on the ridge where the Kolansii stood there are other fires now, a great many, and they are not Kolansii fires. Far off east, past the end of the line, a long way, there is a low hill, and over it a little smoke, going straight up, and nothing else.` :
`From the stretch's east end, at dusk, there is the city, dark, and past it the far tower, black, and past that the bay, white all the way across in the last light, flat and still and wrong. Ships are stuck in it, far off, at angles.

Earlier, while the Kolansii were going, everybody on the stretch saw the other thing, high over the tower: something very big, cut in half in the sky, falling in two pieces. What it was, the stretch could not see. The Sixth has not said since. The Sixth has decided, without discussing it, not to.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    /* the paymaster at dusk: the King's tallies (and the purser's scale, if it came on the second boat) */
    b10_c6_tally:()=>{ const adj = b106Adj();
      return {sp:adj ? B5_FINADD.name : 'Yelt', scene:'b10_field', fx:()=>{ if (!S.f.b10_c6_tallyGot) { S.f.b10_c6_tallyGot = 1; gain('b10_c6_kingstally'); } if (!adj && S.f.b10_c6_scaleLate && !S.f.b10_c6_scaleGot) { S.f.b10_c6_scaleGot = 1; gain('b10_c6_shipscale'); } }, again:()=> adj ? 'The Finadd\'s chits, written.' : 'Yelt at his tailboard, paying out tallies.', txt: adj ?
`${b106Ennic()} has set his slate on a cart's tailboard and is writing chits, one for each of the Sixth, in his own hand: every dock Lether owes each of them since the parting, payable on the King's ships, if anybody ever sees one.

"It is worth nothing out here," he says, and hands them out anyway. "It is a promise. Lether keeps those, now and then. I would like you to have one in your pocket when it does."` :
`Yelt has come up behind the line with the King's paymaster's chest on a handcart, which he has guarded himself all the way from the beach, and is paying the brigades by company at his tailboard, by lamplight, in tallies: a stick of hard wood for each soldier with the King's mark burned in, notched for every dock Lether owes them since the parting. Somebody in the King's stores has cut a small smiling face beside every mark.

"Payable in Letheras," Yelt says. "I have checked the sums twice. They are right. It is the first time on this whole road the sums have gone the other way."${S.f.b10_c6_scaleLate && !S.f.b10_c6_scaleGot ? '\n\nThen he reaches under the chest and brings out a shirt of new scale, with Lether\'s mark on the leather. "The purser\'s second boat," he says. "I said it would come. I wrote it down."' : ''}`,
        ch:[{t:'Back.', go:()=>startExplore()}]}; },

    /* the way on from dusk: the end */
    b10_c6_onroad:()=>{ const ready = !!b106Road();
      return {sp:'Behind the line', scene:'b10_field', txt: ready ? `The fires along the line are going down. ${b106Road() === 'letheras' ? 'In the morning, the coast, and the ships.' : b106Road() === 'kolanse' ? 'In the morning, the brigades will start for the coast, and the Sixth will not.' : 'In the morning, the coast, and the list, and every name off it.'}` : 'The Finadd first. The staff is asking every sergeant something tonight.',
        ch: ready ? [{t:'The end of it.', onward:true, go:'b10_c6_onward'}, {t:'Not now.', go:()=>startExplore()}] : [{t:'Back.', go:()=>startExplore()}]}; },
    /* ======== the end ======== */
    b10_c6_onward:()=>{ const r = b106Road() || 'letheras', adj = b106Adj(), fell = b106Fell();
      return {sp:(B10_ENDW.l[r] || B10_ENDW.l.letheras)[0], scene:'b10_field', html:witnessHTML(), txt:
`${b106RoadPage(r, b106Tier())[1]}

${fell.length ? `${b106And(fell.map(NAME))} did not walk off the stretch. The Sixth says the ${fell.length > 1 ? 'names' : 'name'} at the fire, and will go on saying ${fell.length > 1 ? 'them' : 'it'}.` : 'Every one of the Sixth who stood on the stretch walked off it. The Sixth says so at the fire, and does not quite believe it.'}${b106If('tirren', () => `\n\n${b106TirrenHorse(r, true)}`)}${b106Say({perrit:'\n\nPerrit lays one tile on the ground by the fire, face up, and leaves it there. It is cold. She leaves it anyway.', _:''})}

${adj ? 'Far off on the ridge, the fires that are not Kolansii fires burn all night.' : 'Far off, the bay is white under the stars, and the far tower is dark, and nothing on this side of the city is fighting any more.'}`,
        ch:[{t:'The end of it.', onward:true, go:()=>chapterEnd(6, b106Key() || 'hold')},
            {t:'Not yet.', go:()=>startExplore()}]}; },
  },
};

/* the afternoon's far sights, once the key's work is done ('escort': the bay going white, the thing in the sky, the dead at the tower;
   'adjunct': the regulars stood down; the hill far off, a little smoke) */
function b106Sights(){ if (b106Adj()) return 'Toward noon a regulars\' company comes along the back of the line and takes over the stretch, and the Sixth is sent back behind the line, to the water. Far off east, past the end of the line, a long way, there is a low hill with a little smoke over it. The Sixth does not know what is on it, and does not ask.';
  return `Then, while the stream is still going, things happen far off that nobody on the stretch can explain. North past the city, the bay goes white, from the shore outward, all the way across, as if a hand had passed over it. High over the far tower something very big is in the sky, and then it is in two pieces, falling. And at the foot of the tower, far off and small, there is a fight, and new figures come up into it from the white bay, grey, a great many, walking wrong, and the fight there turns.${b106Say({perrit:'\n\nPerrit has her hand on the tile-pouch and her face is white. "The dead," she says. "Those are the dead." The squad does not ask how she knows.', ruuk:'\n\nRuuk watches with his mouth open. "My grandmother," he says, and does not finish.', _:'\n\nWhat any of it was, the stretch cannot say. It does not know.'})}`; }
/* 'hold' done, once */
function b106Held(how){ if (S.f.b10_c6_held) return; S.f.b10_c6_held = how; save(); }
/* 'carry' done, once: the key's Witness (the brief: 'went back for them') */
function b106Carried(){ if (S.f.b10_c6_carried) return; S.f.b10_c6_carried = 1; b10Witness(1, 'went back for them'); save(); }
/* the ending, once chosen: set; it does not change */
function b106SetRoad(r){ if (b10LethRoad()) return; if (!B10_LETHROADS.includes(r)) return; S.f.b10_lethRoad = r; save(); }
/* Tirren closes it: which horse she means to bring home (Ch 2 and Ch 4 left it open) */
function b106TirrenHorse(r, end){ const ash = b106Horses();
  if (end) return r === 'kolanse' ? 'Tirren is at the horse-lines, with her hand on the grey mare\'s neck. She is staying where the horses are. It was never a question.' : `Tirren is at the horse-lines, with her hand on ${ash ? 'the grey mare\'s neck. Ash. That is the one. She has told her so.' : 'a horse\'s neck, the one at the end of the picket. She has told it so.'}`;
  if (r === 'kolanse') return `Tirren has gone over to the horses. "Then I stay with them," she says. "All of them. That was always the answer. I just didn't have to say it before."`;
  return ash ? `Tirren has gone over to the horses, and stops by the grey mare, lame in the near hind, who walked the whole of the long way round. "Ash," she says. "That's the one I'm bringing home. I decided at the parting. I didn't want to say it in case." She does not say in case what.`
    : `Tirren has gone over to the horses, and stops at the end of the picket, where there is one horse left beside an empty peg. "Whichever one is left at the end," she says. "That's the one. I stopped giving them names on the road." She puts her hand on its neck. "This one. I'll give it a name on the ship."`; }
