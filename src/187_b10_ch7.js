/* ============ Book Ten, Chapter 7: Over the Ridge (the Third, the last battle, and the end of the series' last book) ============ */
/* The Third's last chapter and its mortal fight (David's decisions 3, 6, 7, 11; tcg-canon corrections 2 and 3, fix A). Out of the glass
   into Kolanse. The Third is already lent to Captain Sedge's company of the regulars as file-closers (Chapter 5 said so, once; it is not
   said again). The night before, on the first fields: Sedge, the heavies' fire, an empty granary and Kolansii pickets (b10_c7_picket,
   optional), the reading on a shield laid on the ground, the fire. Before light an order goes round the heavies' fires and never reaches
   the Third (said once, plainly, in b10_c7_dawn; never where the heavies went). The day: Sedge's stretch at the far west end of the
   regulars' line, a long way from the Adjunct, the plains-folk and the hill. The first rush (b10_c7_morning, survive 4). Far off east the
   Khundryl go in; a hill with smoke over it and the munitions' thunder (rule 108). THE THIRD'S MORTAL FIGHT (b10_c7_line): Kolansii, then
   two Shriven and ONE Assail (decision 11); in its second ground a Malazan Host comes over the ridge (rule 106), and with it Book Eight's
   Fourth, onto the Third's stretch (b10FourthAllies; Witness +1, 'somebody came'). The Kolansii go down on their knees. After: Rolle, a
   sergeant of the Host; the Fourth's sergeant; the Fourth's road in one page of its own words (rule 109); Rim to Rim, the Fourth's old
   trick (Book One's first). The barrows (Epilogue I; rule 110): the edge, Thallo, Bredd asked after once, the Third's ending (S.f.b10_c7_key:
   colours / kolanse / home; kolanse needs Witness holding or better), the Fourth's (S.f.b10_fourthRoad), the last beat (c7), the end.
   Phases (S.f.b10_c7_ph): 1 the night before, 2 the stretch by day, 3 after the line, 4 the barrows.
   The 'south' road (a Third that went south in Book Nine): the night before is the brigades' camp; the stretch is the Twelfth's, at the
   back of a Letherii line before Kolanse City, the same fight ids and foes, no Fourth in it (the Kolansii turn away for the far tower);
   the Fourth walks up at the barrows (Witness +1 there), and a regular at the barrows' camp teaches the trick. The hill is never seen.
   Never: Fiddler's hill or who held it; the god on it, the chains, the ring; the Adjunct's charge; the plains-folk's warleader seen; the
   Voice; the Snake's children; the four named regulars; the High Fist on the ridge, his card, the portal; the Adjunct and the High Fist;
   the barrow speeches. Notes: docs/tcg-ch7-notes.md. The finale (B10CH7.finale, 037's pages) and the extra pages through B10FIN.extra
   (the Sixth's road and pages, the Fourth's page, Where the books meet) are at the end of this file; the engine's coda follows them. */
/* FOR THE ARTIST (187b): names this file uses.
   Items: ART['item/b10_c7_knot'], ['item/b10_c7_ridgecloak'], ['item/b10_c7_roll'].
   Figures: the kind b10_assail (yours); b9_c1_thallo (161b), pruss (181b), b2soldier (Sedge, Rolle, the Fourth's sergeant, the old marine,
   regulars), b5_letherii (the Twelfth's finadd and wagon-master on 'south').
   Backdrops: b10_ridge and b10_barrows (180's placeholders, yours), b10_c7_eve (the first fields at dusk, the night before), b10_c7_road,
   b10_c7_fourth, b10_c7_sixth (the finale's road pages, by the Third's key, the Fourth's road and the Sixth's).
   Ground (TILEX): b10_c7_field (Kolanse's dry dirt, as 186b's b10_c6_field, plus: 'R' a shield laid on the ground, 'G' an empty granary,
   'H' the heavies' fire, 'c' the surgeons' cart, 'M' a barrow, 'e' the barrows' edge, 'X' a spear stood at the edge, 'B' a knot of soldiers,
   'r' a regular's pack and spear). Battle 't': a low field-wall of dry stones. */

/* ---- small helpers (b107: Book Ten, Chapter Seven) ---- */
const b107L = (id, n) => { if (b10In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b107Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b10In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b107If = (id, s) => b10In(id) ? (typeof s === 'function' ? s() : s) : '';
const b107Who = () => (ROLL() && ROLL().who) || 'sgt';
const b107Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b107Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b107V = (id, you, they) => id === 'sgt' ? you : they;
const b107Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b107And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const B107SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'wenna', 'hessa', 'rasp', 'tegra', 'brisk', 'kettle', 'tuft', 'sohra', 'dannet', 'ellis', 'ressa', 'perrit', 'ammet', 'ilsa', 'brune', 'pessa', 'kaedra', 'tirren'];
const b107He = id => id === 'sgt' ? 'you' : B107SHE.includes(id) ? 'she' : 'he';
const b107Him = id => id === 'sgt' ? 'you' : B107SHE.includes(id) ? 'her' : 'him';
const b107Cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
/* the phase: 1 the night before, 2 the stretch by day, 3 after the line, 4 the barrows */
const b107Ph = () => { const p = S && S.f && S.f.b10_c7_ph; return [1, 2, 3, 4].includes(p) ? p : 1; };
const b107Key = () => ['colours', 'kolanse', 'home'].includes(S && S.f && S.f.b10_c7_key) ? S.f.b10_c7_key : null;
const b107South = () => b10TRoad() === 'south';
const b107S = (adj, south) => b107South() ? south : adj;
/* the earlier keys, each with canon's default */
const b107Names = () => (b10Key(1) || 'names') !== 'water';
const b107Hauled = () => (b10Key(3) || 'haul') !== 'cut';
const b107Give = () => (b10Key(5) || 'give') !== 'hold';
const b107Fell = () => (S && S.f && Array.isArray(S.f.b10_c7_fell) ? S.f.b10_c7_fell : []).filter(id => TPL[id]);
const b107RushDone = () => !!(S && S.f && S.f.b10_c7_rushDone);
const b107LineDone = () => !!(S && S.f && S.f.b10_c7_lineDone);
const b107Tier = () => b10WitTier();
const b107Low = () => ['hollow', 'doubt'].includes(b107Tier());
const b107High = () => ['kept', 'witnessed'].includes(b107Tier());
/* who gives the Third its orders: Captain Sedge (the regulars) or, on 'south', the Twelfth's finadd */
const b107Boss = () => b107S('Sedge', 'the Twelfth\'s finadd');
const b107BossC = () => b107S('Sedge', 'The Twelfth\'s finadd');
const b107BossN = () => b107S('Captain Sedge', 'The Twelfth\'s finadd');
/* the Fourth (S.b10f; a canon-default Fourth when there is no Book Eight save) */
const b107F = () => (S && S.b10f) || b10FourthHalf(null);
const b107FMates = () => { const f = b107F(), d = f.dead || {}; return (f.squad || []).filter(k => k !== 'sgt' && TPL[k] && !d[k]); };
const b107FCamp = () => { const f = b107F(), d = f.dead || {}; return (f.camp || []).filter(k => k !== 'sgt' && TPL[k] && !d[k]); };
const b107FDead = () => { const f = b107F(); return Object.keys(f.dead || {}).filter(k => TPL[k]); };
const b107FIn = id => b107FMates().includes(id);
const b107FSgt = () => { const f = b107F(); return f.name ? `Sergeant ${esc(f.name)}` : 'the Fourth\'s sergeant'; };
const b107FSgtC = () => b107Cap(b107FSgt());
const b107FSay = m => { for (const k of Object.keys(m)) if (k !== '_' && b107FIn(k)) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b107FNames = () => b107FMates().map(NAME);
const b107FMet = () => !!(S && S.f && S.f.b10_c7_fourthMet);
/* the scene behind a node, by phase and road */
const b107Scene = () => { const p = b107Ph(); return p === 1 ? 'b10_c7_eve' : p === 4 ? 'b10_barrows' : 'b10_ridge'; };
/* where the stretch is, in the squad's words */
const b107Stretch = () => b107S('Sedge\'s stretch, at the far west end of the regulars\' line', 'the Twelfth\'s stretch, at the back of a Letherii line before Kolanse City');

/* ---- the one line of the Letherii a chapter (camp talk; b10OtherName is not used). On 'south' with the Letherii on 'escort' the two
   squads stand in one battle: the Sixth is seen at a distance, three stretches west, never on one stretch. Both in the glass: the few
   Letherii held a stretch in the morning, word along the line. Otherwise word at the barrows. Chapter Six's key rides in it as rumour. ---- */
const b107SixthAt = () => b107South() ? (b10LRoad() === 'escort' ? 'west' : 'barrows') : (b10LRoad() === 'adjunct' ? 'east' : 'barrows');
const b107Sixth = () => { const carry = (b10Key(6) || 'hold') === 'carry', at = b107SixthAt(), horses = (b10Key(4) || 'horses') !== 'pace';
  if (at === 'west') return `Three stretches down the line to the west there is a Letherii company in blue-grey, with long pikes stood up at its corners like a hedge. The Sixth, a carter of the Twelfth says: the ones who ${horses ? 'walked their horses the whole long way round, and came in last with every one' : 'kept pace with the Bolkando the whole long way round, and left their horses along the road doing it'}. From here they are a grey line of helms. The Twelfth is not the Sixth. Their stretch is their own.`;
  if (at === 'east') return `${b107Boss() === 'Sedge' ? 'Sedge' : 'A corporal'} says a few Letherii who crossed the glass with the army held a stretch far down the line this morning, and were taken off it toward noon. ${carry ? 'Word is they went out into the open ground after the wounded before they came off it.' : 'Word is they held exactly where they were put, and not a step more.'} The Third has not seen them. From this stretch the Third has not seen anybody.`;
  if (b10LRoad() === 'adjunct') return 'A regular at the edge says a few Letherii crossed the glass with the army and held a stretch of the line in the morning. Somewhere in all this, then. He cannot point to where.';
  return `There are Letherii at the barrows' edge too, come up from the south with the Commander's brigades: blue-grey cloaks, the last of their horses on a picket. One of them, a corporal in a new scale shirt, says the brigades held a stretch before Kolanse City. ${carry ? '"One of our companies went out after the wounded when it was done," he says. "The Sixth. Brought them in."' : '"One of our companies held where it was put while the whole Kolansii line went past it," he says. "The Sixth. Let them go."'} He says it like a thing he means to keep.`; };

/* ---- Rim to Rim: the Fourth's old trick, shields locked rim to rim across a gap with something on the other side. It copies the Line
   (Book One's first trick, line, t_line): B.line, so 31's armour and flanking rules do the rest. Not sorcery. v10.3: it strikes nobody,
   so it is free. ---- */
Object.assign(TRICKS, {
  b10_c7_rim:{name:'Rim to Rim', ch:7, use:'fight', ab:'t_b10_c7_rim', get where(){ return S && S.f && b107South() ? 'the barrows\' camp, from a regular of the line, after' : 'the Third\'s stretch, after the ridge, from the Fourth\'s sergeant'; },
    lore:'The oldest thing the Fourth knows: shields locked rim to rim across a gap, with something on the other side that wants through. An officer of theirs remembered it once, the night the Hounds came to a tent row, and the shields remembered it with him. The Fourth has been doing it ever since. It is not clever. It is only a squad deciding, all at once, to be a wall.',
    get fx(){ return `Once a fight: the bearer calls it, and the bearer and every squadmate beside them lock shields rim to rim. They take +${3 + lvT()} armour and cannot be flanked until the bearer's next turn. Grows with level. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b10_c7_rim:{name:TRICKS.b10_c7_rim.name, trick:'b10_c7_rim', self:true, free:true, desc:()=>TRICKS.b10_c7_rim.fx,
    run(u){ B.line = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => lineCovers(p)); in_.forEach(p => { float(p, 'rim to rim', '#d8c890'); sparks(p.x, p.y, 8, '#d8c890', .4); });
      blog(`${u.name}: "Rim to rim." ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} lock${in_.length > 2 ? '' : 's'} in beside them, the Fourth's old way, and the gap is a wall.` : 'One shield. It is a wall anyway, a small one.'}`); }},
});

/* ---- the reading: a shield laid on the ground behind the line, the light going ---- */
B10READ[7] = {back:'b10_c7_fire', backT:'Back to the fire.',
  get scene(){ return 'b10_c7_eve'; },
  get where(){ return S && S.f && b107South() ? 'a Letherii shield laid face up on the dirt behind the Twelfth\'s fires' : 'a regular\'s shield laid face up on the dirt behind the line'; },
  get set(){ return S && S.f && b107South() ? 'Dusk in the brigades\' camp on the thin fields, the city low and brown in the east and a tower past it, and a shield laid flat on the dirt for a table because it was the only flat thing.' : 'Dusk on the first fields of Kolanse, the light going behind the army, the regulars\' fires coming up one by one, and a shield laid flat on the dirt for a table because it was the only flat thing.'; },
  say:{marrow:'"Sit, child," Marrow says. "There is water now. The Lady has had a drink. She may even be listening." She shuffles slowly, the way she does when she would rather not know, and does anyway.',
       tallow:'"Grandmother said never read the night before," Tallow says. He shuffles. "She said you only believe it." He looks at the fires across the fields. "I\'ll risk it. I want to believe something."',
       get oldninth(){ return S && S.f && b107South() ? '"Lent south to the end," the old marine says. "The clerks never did un-lend me." He shuffles with his dry old hands. "Last one, I think. Feels like a last one."' : '"Out of the glass," the old marine says. "Both of us. Didn\'t think I\'d say that." He shuffles with his dry old hands. "Last one, I think. Feels like a last one."'; }}};

/* ---- borrowed pictures until the artist's file (187b) replaces them ---- */
{ const like = {b10_c7_eve:'b10_kolanse', b10_c7_road:'b10_kolanse', b10_c7_fourth:'b10_kolanse', b10_c7_sixth:'b10_coast'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b10_c7_field ??= (...a) => (TILEX.b10_c6_field || TILEX.b10_c2_ground || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b10_c7_knot', 'b10_c3_tracestrap'], ['b10_c7_ridgecloak', 'b10_c3_nightcloak'], ['b10_c7_roll', 'b10_c1_slate']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the scene captions, by road and phase (180 set them flat) ---- */
SCENES.b10_ridge = {get loc(){ return S && S.f && b107South() ? 'Before Kolanse City' : 'Kolanse'; },
  get sub(){ return S && S.f && b107South() ? 'The Twelfth\'s stretch' : 'The regulars\' line'; },
  get cap(){ if (!(S && S.f && S.book === 'tcg')) return 'A stretch of the line far from anyone\'s banner, a ridge behind the enemy, and a hill far off with smoke over it.';
    const p = b107Ph(); if (b107South()) return p >= 3 ? 'The open ground in front of the Twelfth\'s stretch, empty, and the Kolansii going away across it toward a far tower.' : 'A Letherii line on open ground, the Kolansii line and its trenches across from it, and Kolanse City low and brown beyond.';
    return p >= 3 ? 'The open ground in front of the stretch, the Kolansii kneeling in it, and on the ridge beyond them a Malazan Host.' : 'A stretch of the line far from anyone\'s banner, a ridge behind the enemy, and a hill far off with smoke over it.'; }, amb:'battle'};

/* ---- the words this chapter adds to Book Ten's glossary ---- */
GLOSSX.tcg.push(
  [7, 'The far end', 'Where a company short of everything stands in a long line: the end of it, a long way from any banner, where nobody comes to help and nobody is asked to go anywhere. The Third stood there.', ()=>!!(S && S.f && S.f.b10_c7_orders)],
  [7, 'Rim to rim', 'Shields locked edge to edge across a gap, so that a squad is a wall for as long as it decides to be. The Fourth\'s oldest trick, and the first one anybody taught it.', ()=>!!(S && S.f && (S.f.b10_c7_rimOk || S.f.b10_c7_rimTried))]);

/* the fire is a roster fire (38c): the first fields the night before; the barrows' camp at the end */
ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[7] = ['b10_c7_fire'];

/* ---- the Third at the fire: a line the night before and a line at the barrows for every soldier it can field ---- */
const B107TALK = {
  haddat:[()=>`Haddat has the blue shield across her knees and is going over its straps one at a time, the way she says the names. "Tomorrow," she says. "Every name tomorrow, too." She pulls a strap tight. "Somebody has to be standing up to say them."`,
          ()=>`Haddat stood at the barrows' edge a long time, saying the names, the old list and the new, in two languages. When she comes back to the fire her voice is gone. She does not seem to mind.`],
  sathi:[()=>`Sathi is sharpening a knife that is already sharp and grinning at the dark where the Kolansii fires are. "They've got horses over there," she says. "Thin ones. Still horses." The Weasels never could leave a horse alone.`,
         ()=>`Sathi sits on her heels with her filed teeth showing. "Weasels used to say nobody remembers a stretch of line," she says. "Only the charge." She looks at the long mounds. "Weasels were idiots about most things."`],
  tangle:[()=>`Tangle has the satchel open and is counting by feel in the dark: what is left of the column's issue, and something at the bottom he will not name. "Enough," he says. "For the once. Not for twice."`,
          ()=>`Tangle has the satchel across his knees and keeps putting his hand into it and finding not much. "Spent," he says. "Most of it. On the stretch." He seems to find that restful.`],
  marrow:[()=>`Marrow has her knotted string out and is tying a knot for each of the Third at the fire, slowly. "The Lady likes to be told who to look for, child," she says. "So I am telling her. Every one."`,
          ()=>`Marrow sits with the string in her lap, every knot in it, and does not untie any. "Missing is not dead," she says. "I said that. Dead is dead, child. I know the difference. I have only never had to know it this many times."`],
  mirrel:[()=>`Mirrel is going down the squad's feet with what is left of her salve, and has an opinion about every pair. "You'll stand on these all day tomorrow," she says. "Show me."`,
          ()=>`Mirrel washes her hands at the fire a good while, in water nobody counts, and then sits down beside you. "That's the last of them," she says. "The ones I could do anything for." She looks at her hands. "Most of them."`],
  doss:[()=>`Doss is looking at the thin fields in the last of the light. "Holding land," he says. "All of it, once. Some family's." He takes a pinch of the dirt and lets it go. "No one's, now. That's worse."`,
        ()=>`Doss has the flail across his knees. "On the holding, when somebody died, the factor wrote it in the book and drew a line," he says. "Here everybody stands round the hole." He thinks about it. "Better."`],
  wenna:[()=>`Wenna has her ear to the ground at the field's edge. "Water under here," she says. "Deep. More than there was." She sits up. "The Shore is still quiet. I listen anyway."`,
         ()=>`Wenna sits facing away from the barrows, toward where the sea must be. "I'll tell the Shore every one of them," she says. "Whether it answers or not. The sea should know."`],
  mehet:[()=>`Mehet is turning his ring of keys. "Every granary out there has a lock," he says. "Somebody locked them when there was still something in them. Then it ran out, and they locked them anyway." He looks at the keys. "I understand that."`,
         ()=>`Mehet has his keys in his fist. "No locks on a barrow," he says. "No door." He puts the keys away. "Good. It stays shut."`],
  ottar:[()=>`Ottar has his grey plate laid out to oil, piece by piece. "Today's word," he says, "is <em>tomorrow</em>." He considers it. "The Malazans say it as if it were a promise."`,
         ()=>`Ottar stands at the edge of the barrows with his helm under his arm. "Today's word," he says at last, "is <em>remembered</em>." He tries it again, quietly. "It is a heavier word than it looks."`],
  tallow:[()=>`Tallow has his grandmother's deck inside his shirt and his hand flat over it. "She said the night before is when you're most tempted," he says. "And least able to bear it." He keeps his hand there.`,
          ()=>`Tallow lays one card face down on the ground by the fire and does not turn it. "For the barrows," he says. "Grandmother did that. One for the dead, face down, so they can choose."`],
  hessa:[()=>`Hessa sits very straight with her spear across her knees. "D'rek is restless under this country," she says. "Turning over." She frowns. "I do not know what she wants. I will stand where I am put."`,
         ()=>`Hessa has her palm flat on the ground. "Quiet now," she says. "Under everything. Something ended today, or began." She takes her hand away. "The worm does not explain."`],
  tebbet:[()=>`Tebbet has his bow restrung with gut off a Kolansii outrider's saddle. "Better than mine," he says, not happily. "Everything of theirs is thin except their gear."`,
          ()=>`Tebbet has been out past the barrows with his bow and come back with nothing. "Nothing to shoot," he says. "Nothing at all." He sits down. "I'll get used to it."`],
  darrut:[()=>`Darrut has his big shield face down and is beating the worst of the dents out of it with a stone. "Aren Guard had a word for the night before," he says. "Don't." He keeps beating. "Never said don't what."`,
          ()=>`Darrut sits with his dented helm on his knee. "Wall held," he says. That is all of it. He says it again later, to nobody.`],
  yorin:[()=>`Yorin has his copper vane on his palm, and for the first time since the glass it moves. "West wind," he says. "Off the glass, at our backs." He smiles a little. "Serc's awake again."`,
         ()=>`Yorin's vane points at the barrows and will not come off them. He puts it away inside his shirt. "Serc's being polite," he says.`],
  rasp:[()=>`Rasp has the squad's munitions out on a cloak and is unwrapping each one to look at it, and wrapping it again. "Tomorrow," she tells a cusser, gently. "Lovely."`,
        ()=>`Rasp sits with her satchel mostly empty. "Heard thunder all day off east," she says. "Munitions. A lot of them." She sounds a little jealous. "Busy day, over there."`],
  orvas:[()=>`Orvas is facing east, down the army, toward where the plains-folk have their horse-lines. "My people are there," he says. "What is left of them." He puts his hand over the black tears on his face, and takes it away.`,
         ()=>`Orvas is weeping, loudly, as is right, for the horsemen who went in. "The warleader fell," he says, when he can. "They say. I did not see it." He wipes his face. "I weep for the ones I did not see as well. It is no trouble."`],
  redblade:[()=>`Ramin has his red scale on and is sitting in it, which is not comfortable. "Red Blades sleep armoured the night before," he says. "I always thought it was for show." He shifts. "It is not for comfort, at least."`,
            ()=>`Ramin has his red scale off at last and is sitting beside it. "Red Blades bury their own with their blades," he says. "Here everybody goes in together." He looks at the mounds. "I think I prefer this."`],
  warlock:[()=>`Keth sits with his eyes shut. "*Thin country,*" the grandmother says out of his mouth. "*Thin people. Somebody has kept them hungry on purpose.*" Keth opens his eyes and does not ask her who.`,
           ()=>`Keth sits by the fire with the grandmother quiet in him for once. "She's counting the barrows," he says. "The old way, on her fingers." He holds up his hands. "Mine."`],
  brask:[()=>`Brask has his tally-stick out and is cutting a new notch at the very end of it, small. "For tomorrow," he says. "Whatever it is." He puts the knife away. "Old squad never cut one ahead. I'm not them."`,
         ()=>`Brask has the tally-stick in his fist and dirt to the elbows. "Heavies eat last," he says. "Dig last, too." He was not told to dig at the barrows. He dug.`],
  tegra:[()=>`Tegra sits on her heels looking at the thin fields. "My people would say this ground has been asked too much," she says. "You do not ask a horse to run forever." She lets a handful of the dirt run out. "Somebody did."`,
         ()=>`Tegra stands at the barrows' edge with her arms folded. "Among my people the dead watch," she says. "Here there are too many to watch anything." She thinks. "They will watch each other. That will do."`],
  pruss:[()=>`Pruss has his old sergeant's helm on his knee, full of water from the barrels, and is not drinking it. "Old squad's names," he says. "Six. Said them every night since the Wastes." He looks round the Third. "Might need a longer list." He drinks.`,
         ()=>`Pruss sits by the fire turning his old sergeant's helm in his hands. "Carted my old squad's names all this way," he says. "Thought I'd set them down at the end." He puts the helm on his head instead. "Not yet."`],
};

const B10CH7 = {
  title:B10CH[7], number:'Seven',
  intro:{ get loc(){ return S && S.f && b107South() ? 'Before Kolanse City' : 'Kolanse'; }, get sub(){ return S && S.f && b107South() ? 'The brigades\' camp · the night before' : 'The first fields · the night before'; }, scene:'b10_c7_eve',
    get cap(){ return S && S.f && b107South() ? 'Dusk on thin fields, the brigades\' fires coming up in long rows, and in the east a city low and brown with a tower standing past it.' : 'Dusk on the first fields of Kolanse, empty granaries, the regulars\' fires coming up in rows, and far across the fields a dark line of ridge.'; },
    paras:[
()=> b107South() ? `The long way round ends in front of a city. The brigades came up from the coast with the King's bread in them and the King's water on their backs, and now they are camped on thin fields in sight of Kolanse City, low and brown, with a tower standing up past it that nobody names.` : `The army came out of the glass with its skins full, and walked east into Kolanse, into thin fields and empty granaries and people standing at the field-edges watching it go by. Tonight it is camped on the first fields. Across them, far off, there is a ridge. There are fires on the ridge too.`,
()=>{ const v = (S.squad || []).filter(id => id !== 'sgt' && b10In(id)).map(id => NAME(id));
  return `You are Sergeant {sgt}, Third squad, ${b107S('lent to Captain Sedge\'s company of the regulars as file-closers', 'lent to the Twelfth as file-closers, at the back of a Letherii line')}. ${v.length ? `${b107And(v)} ${v.length > 1 ? 'are' : 'is'} the Third, still.` : 'The Third, still, is you.'}`; },
()=> b107South() ? `Tomorrow the allies stand in front of the city. The Twelfth has a stretch. The Third will be at the back of it.` : `Tomorrow the army stands in front of the ridge. Sedge's company has a stretch of it. The Third will be at the back of it.`],
    go:'The first fields', node:'b10_c7_start'},

  areas:[
    /* 16 x 12 (b10_c7_field, dusk). The first fields the night before: G an empty granary at the field's edge (the pickets)  F the squad's
       fire  R a shield laid on the ground (the reading)  H the heavies' fire (Thallo; on 'south' the Twelfth's wagons)  T tents  w wagons
       > east, toward the line, at first light */
    { id:'b10_c7_camp', title:'Kolanse · the first fields', sub:'The night before', hint:'Tap ground to move · tap a figure to talk · the line is east, the granary north', decor:'b10_c7_field', dark:true,
      map:[ "################",
            "#....G.........#",
            "#..............#",
            "#.T....T....T..#",
            "#..............#",
            "#..H....F...R..#",
            "#..............#",
            "#.w.........w..>",
            "#..............#",
            "#..T.......T...#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{G:'b10_c7_granary', F:'b10_c7_fire', R:'b10_c7_shield', H:'b10_c7_heavies', '>':'b10_c7_night'}, start:{x:8, y:7},
      quest:()=> !S.f.b10_c7_boss1 ? `${b107BossN()}, walking the lines. The order for tomorrow.` : 'The fire. Then sleep, if anybody can. The line is east, at first light.',
      npcs:[
        {id:'sedge', name:'Captain Sedge', kind:'b2soldier', x:9, y:3, node:()=>'b10_c7_sedge', show:()=>!b107South(), fresh:()=>!S.f.b10_c7_boss1},
        {id:'finadd', name:'The Twelfth\'s finadd', kind:'b5_letherii', x:9, y:3, node:()=>'b10_c7_sedge', show:()=>b107South(), fresh:()=>!S.f.b10_c7_boss1} ] },

    /* 16 x 12 (b10_c7_field, day; phases 2 and 3). The stretch: ; the open ground in front (no walking)  L the shield line (the first rush;
       the mortal fight; after, the field)  W its west end (the end of the line; on 'south' the Sixth, three stretches off)  E its east end
       (the far sights)  b water barrels  c the surgeons' cart  w wagons  , the track behind the line  > back, and later south to the barrows */
    { id:'b10_c7_line', get title(){ return S && S.f && b107South() ? 'Before Kolanse City · the Twelfth\'s stretch' : 'Kolanse · the far end of the line'; }, sub:'The stretch · far from anybody\'s banner', hint:'Tap ground to move · tap a figure to talk · the line is north, the rear south', decor:'b10_c7_field',
      map:[ ";;;;;;;;;;;;;;;;",
            ";;;;;;;;;;;;;;;;",
            "WLLLLLLLLLLLLLLE",
            "#..............#",
            "#..b....,......#",
            "#.......,...c..#",
            "#.......,......#",
            "#.......,......#",
            "#..w....,....w.#",
            "#.......,......#",
            "#.......,......#",
            "########>#######" ],
      walk:'.,', triggers:{L:'b10_c7_line', W:'b10_c7_west', E:'b10_c7_east', b:'b10_c7_barrels', c:'b10_c7_cart', '>':'b10_c7_tobarrows'}, start:{x:8, y:9},
      quest:()=>{ const p = b107Ph();
        if (p === 2) return !S.f.b10_c7_orders ? `${b107BossN()}, behind the line. The order for the day.` : !b107RushDone() ? 'The line, north. The first of them are coming.' : !b107LineDone() ? 'The line, north. The rest of them are coming now.' : 'The line.';
        if (b107South()) return !S.f.b10_c7_march ? 'The Twelfth\'s finadd. There is word along the line.' : 'South, when the squad is ready. North, the army says, to the foreigners\' field.';
        return !S.f.b10_c7_rolle ? 'A sergeant of the Host, coming along the back of the line with somebody.' : !b107FMet() ? 'The Fourth\'s sergeant, behind the stretch.' : 'South, when the squad is ready. The army is gathering.'; },
      npcs:[
        {id:'sedge', name:'Captain Sedge', kind:'b2soldier', x:9, y:4, node:()=>'b10_c7_sedge', show:()=>!b107South(), fresh:()=>(b107Ph() === 2 && !S.f.b10_c7_orders)},
        {id:'finadd', name:'The Twelfth\'s finadd', kind:'b5_letherii', x:9, y:4, node:()=>'b10_c7_sedge', show:()=>b107South(), fresh:()=>(b107Ph() === 2 && !S.f.b10_c7_orders) || (b107Ph() === 3 && !S.f.b10_c7_march)},
        {id:'rolle', name:'Rolle, a sergeant of the Host', kind:'b2soldier', x:5, y:6, node:()=>'b10_c7_rolle', show:()=>!b107South() && b107Ph() === 3, fresh:()=>!S.f.b10_c7_rolle},
        {id:'fourth', name:'The Fourth\'s sergeant', kind:'b2soldier', x:11, y:7, node:()=>'b10_c7_fourth', show:()=>!b107South() && b107Ph() === 3 && !!S.f.b10_c7_rolle, fresh:()=>!b107FMet()} ] },

    /* 16 x 12 (b10_c7_field, evening; phase 4). The barrows: M the long mounds (no walking)  e the edge where the army stands  X a spear
       stood at the Third's place on the edge (the names)  B a knot of soldiers asking after somebody  r a regular's pack and spear  F the
       squad's fire  T tents  w wagons  > the end */
    { id:'b10_c7_barrows', title:'Kolanse · the barrows', sub:'Evening · after', hint:'Tap ground to move · tap a figure to talk · the barrows are north, the road south', decor:'b10_c7_field', dark:true,
      map:[ "MMMMMMMMMMMMMMMM",
            "MMMMMMMMMMMMMMMM",
            "#eeeeeeXeeeeeee#",
            "#..............#",
            "#..B........r..#",
            "#.......,......#",
            "#..F....,......#",
            "#.......,...w..#",
            "#..T....,......#",
            "#.......,...T..#",
            "#..............#",
            "########>#######" ],
      walk:'.,e', triggers:{X:'b10_c7_edge', B:'b10_c7_bredd', r:'b10_c7_regular', F:'b10_c7_fire', '>':'b10_c7_onroad'}, start:{x:8, y:9},
      quest:()=> !S.f.b10_c7_edge ? 'The edge of the barrows, north.' : !b107Key() ? 'Thallo. He has slates.' : !b10FourthRoad() ? 'The Fourth\'s sergeant wants a word.' : !b10BeatOf(7) ? 'The fire. One more thing to say.' : 'South, when the squad is ready. The end of it.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:5, y:5, node:()=>'b10_c7_thallo', fresh:()=>!S.f.b10_c7_thallo || !b107Key()},
        {id:'sedge', name:'Captain Sedge', kind:'b2soldier', x:11, y:3, node:()=>'b10_c7_sedge', show:()=>!b107South(), fresh:()=>!S.f.b10_c7_boss4},
        {id:'finadd', name:'The Twelfth\'s finadd', kind:'b5_letherii', x:11, y:3, node:()=>'b10_c7_sedge', show:()=>b107South(), fresh:()=>!S.f.b10_c7_boss4},
        {id:'fourth', name:'The Fourth\'s sergeant', kind:'b2soldier', x:10, y:8, node:()=>'b10_c7_fourth', fresh:()=>!b107FMet() || (!!b107Key() && !b10FourthRoad())} ] } ],

  foes:{
    /* on the Twelfth's stretch ('south'): a spear of the Twelfth at the Third's scale, as the regulars are */
    b10_c7_twelfth:{name:'Spear of the Twelfth', kind:'b5_letherii', sig:'e', hp:40, ac:17, atk:16, dmg:[1,10,5], rng:1, mv:4, init:1, verb:'drives a spear at'} },

  battles:{
    /* Kolansii pickets at the empty granary the night before: thin, sent to count the army's fires. Optional; not mortal. */
    b10_c7_picket:{title:'The empty granary', style:'b10_c7_field', dark:true, warrenText:'Dusk on the first fields · dry stalks, a broken wall · the warrens quiet', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t...t.","........","....t...","........",".t......","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,7],[4,7]],
      foes:[['b10_kolansii',3,1],['b10_kolansii',5,1],['b10_kolbow',2,0],['b10_kolbow',5,0]], xp:120, after:'b10_c7_picket_after',
      preText:()=>`Four of them behind the granary's broken wall, where they can see the army's fires and count them: Kolansii, in quilted coats too big for them now, two with bows. They have been told to count. Now they have been seen, and something has told them what to do about that too.`},
    /* the first rush, in the morning: survive four. Not mortal: death checks run. The regulars (on 'south', the Twelfth's spears) beside. */
    b10_c7_morning:{get title(){ return b107South() ? 'The Twelfth\'s stretch, the first rush' : 'The far end, the first rush'; }, style:'b10_c7_field', get warrenText(){ return b107South() ? 'Morning before Kolanse City · dust, trenches, the city beyond · the warrens quiet' : 'Morning on the regulars\' line · dust, the ridge beyond · the warrens quiet'; }, warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Keep the front rank where it is until the first rush breaks.'},
      map:["........","..t..t..","........",".t....t.","........","........","........","........","........","##....##"],
      party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]], get allies(){ const k = b107South() ? 'b10_c7_twelfth' : 'b10_regular'; return [[k,1,7],[k,6,7]]; },
      foes:[['b10_kolansii',2,0],['b10_kolansii',5,0]], xp:160, after:'b10_c7_morning_after',
      waves:[{round:2, foes:[['b10_kolansii',3,0],['b10_kolansii',6,0]], text:'More of them out of the dust, at a run, not looking at the ones already down.'},
             {round:3, foes:[['b10_kolbow',4,0]], text:'An archer kneels in the open ground and starts to shoot, very carefully, with arms like sticks.'}],
      preText:()=>`The first of them come across the open ground at a run: Kolansii, thin, grey in the face, in quilted coats and old helms, with pikes and short blades and nothing in their eyes at all. Not the whole of them. The first rush, sent to find out where the line is soft.\n\n${b107BossC()}'s front rank shifts. A face in it looks back. That is what file-closers are for.`},
    /* THE THIRD'S MORTAL FIGHT. Kolansii onto the stretch; then two Shriven and one Assail with a last Kolansii. In the second ground, on
       the regulars' field, a Malazan Host comes over the ridge and Book Eight's Fourth comes onto the stretch (b10FourthAllies). On 'south'
       the Twelfth's spears stand beside the Third and no Host comes. Death checks do not run here: whoever falls stays down. */
    b10_c7_line:{get title(){ return b107South() ? 'The Twelfth\'s stretch' : 'The Third\'s stretch'; }, style:'b10_c7_field', mortal:true,
      get warrenText(){ return b107South() ? 'Before Kolanse City · whoever falls here stays down · the warrens quiet, as if something were holding its breath' : 'The far end of the regulars\' line · whoever falls here stays down · the warrens quiet, as if something were holding its breath'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t..t..","........",".t....t.","........","....t...","........","........","........","##....##"],
      party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]], get allies(){ const k = b107South() ? 'b10_c7_twelfth' : 'b10_regular'; return [[k,1,7],[k,6,7]]; },
      foes:[['b10_kolansii',2,0],['b10_kolansii',5,0],['b10_kolansii',3,1],['b10_kolpike',4,0],['b10_kolbow',6,0]], xp:400, after:'b10_c7_line_after',
      preText:()=>`They come across the open ground all together this time, walking, and then not walking: Kolansii, a great many of them, more than the eye will count, and every one of them thin. No shouting. There is no one you can see driving them. They are being driven anyway.${b107Say({haddat:'\n\nHaddat sets the blue shield and says one name under her breath, the first one on the list, the way she starts every night.', pruss:'\n\nPruss sets his feet at the back of the line the way a carter sets them behind a stuck wheel. "Push," he says, to nobody, to the front rank, to himself.', brask:'\n\nBrask sets his shoulder to the back of the man in front. "Heavies don\'t move," he says. "Today the regulars don\'t either."', _:''})}\n\nWhoever falls here stays down.`,
      stage2:{get title(){ return b107South() ? 'The Twelfth\'s stretch, the second rush' : 'The Third\'s stretch, over the ridge'; }, xp:180,
        get allies(){ const k = b107South() ? 'b10_c7_twelfth' : 'b10_regular', a = [[k,1,7],[k,6,7]]; return b107South() ? a : [...a, ...b10FourthAllies(0, 0)]; },
        text:()=> b107South()
          ? `The first of them are down, or gone back across the open ground, slowly. And behind where they were, walking as if the ground were theirs: two in pale cloth over mail, well fed, upright, and between them one taller than either, pale and long-limbed and bare-handed, who does not hurry at all.\n\nThe Assail. The Twelfth does not say the word. Everybody in the Third does.${b107Say({marrow:'\n\nMarrow reaches for the Lady and finds her very far away. "That one," she says. "Do not let it touch you, child. Any of you."', _:''})}\n\nWhoever falls here stays down.`
          : `The first of them are down, or gone back across the open ground, slowly. And behind where they were, walking as if the ground were theirs: two in pale cloth over mail, well fed, upright, and between them one taller than either, pale and long-limbed and bare-handed, who does not hurry at all.\n\nThe Assail. It looks along the stretch the way the heavies' captain looks at feet.\n\nThen the ground shakes, a long way back, and every head on the stretch comes up. On the ridge behind the Kolansii, all along it, there are soldiers. Thousands. Malazan colours. A Malazan Host, coming over the ridge at a run, and a Fist on the ridge under a standard nobody on the stretch knows. And the first of it down the near slope and into the back of the Assail's knot, onto your stretch, is a squad nobody in the Third has ever seen, with a sergeant at its head shouting a squad's name you have only heard in stories.\n\n"Fourth," the sergeant is shouting. "Fourth, on me."${b107FSay({kettle:'\n\nOne of them has a crossbow and is already shooting.', ohl:'\n\nOne of them is old, with a healer\'s bag, and a sword, and is using the sword.', _:''})}\n\nWhoever falls here stays down.`,
        map:["........","........",".t....t.","........","...t....","........","........","........","........","##....##"],
        party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]],
        foes:[['b10_assail',4,1],['b10_shriven',3,2],['b10_shriven',5,2],['b10_kolansii',6,1]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b10_c7_knot:{name:'A file-closer\'s knot', slot:'trinket', role:'any', who:null, hp:2, stat:{might:1},
      get line(){ return S && S.f && b107South() ? 'A knot of blue cord the Twelfth\'s file-closers wear on the left shoulder, so the front rank knows whose hand is in its back. The finadd tied it himself. Whoever wears it pushes, and is pushed back against, and stands.' : 'A knot of red cord the regulars\' file-closers wear on the left shoulder, so the front rank knows whose hand is in its back. Sedge handed them out herself, one to each of the Third, without a speech. Whoever wears it pushes, and is pushed back against, and stands.'; }},
    b10_c7_ridgecloak:{name:'A Host cloak', slot:'armour', role:'light', who:null, ac:1, hp:5,
      get line(){ return S && S.f && b107South() ? 'A long grey cloak of the Host that came over the ridge on the regulars\' field, with a hood and a leather yoke across the shoulders. The Fourth\'s sergeant handed it over at the barrows. It has been over a ridge and through a pass, and it is the colour of every road in between.' : 'A long grey cloak of the Host that came over the ridge, with a hood and a leather yoke across the shoulders. Rolle took it off his own back and handed it over without a word. It has been over a ridge and through a pass, and it is the colour of every road in between.'; }},
    b10_c7_roll:{name:'The Third\'s last roll', slot:'trinket', role:'any', who:null, hp:2, stat:{wits:1},
      line:'A strip of hide cut from a ration sack, with the Third\'s names scratched into it with a knife point, every one since Aren, the living and the dead, and a line under the last. It is not a slate. It will not wipe. Whoever carries it remembers things a little better than they used to.'} },

  scenes:{
    b10_c7_eve:{get loc(){ return S && S.f && b107South() ? 'Before Kolanse City' : 'Kolanse'; }, get sub(){ return S && S.f && b107South() ? 'The brigades\' camp · the night before' : 'The first fields · the night before'; }, get cap(){ return S && S.f && b107South() ? 'Dusk on thin fields, the brigades\' fires in long rows, and the city low and brown in the east.' : 'Dusk on the first fields, empty granaries, the regulars\' fires in rows, and fires on the ridge across the fields.'; }, amb:'explore'},
    b10_c7_road:{loc:'Kolanse', sub:'The Third\'s road', cap:'The road out of the barrows, and the Third on it.', amb:'explore'},
    b10_c7_fourth:{loc:'Kolanse', sub:'The Fourth\'s road', cap:'The road out of the barrows, and the Fourth on it.', amb:'explore'},
    b10_c7_sixth:{loc:'Kolanse', sub:'The Sixth\'s road', cap:'The road out of the battle, and the Sixth on it.', amb:'explore'} },

  end:{
    get colours(){ return [B10_ENDW.t.colours[0], `${b107Ends()} At the barrows it stood at the edge. Then it stayed with what was left of the army, wherever it goes now.`]; },
    get kolanse(){ return [B10_ENDW.t.kolanse[0], `${b107Ends()} At the barrows it stood at the edge. Then it stayed in Kolanse when the army left, to dig wells in a country that had forgotten what rain was for.`]; },
    get home(){ return [B10_ENDW.t.home[0], `${b107Ends()} At the barrows it stood at the edge. Then it put its names on the time-served list, and went down to the coast for a ship home.`]; } },
  get endScene(){ return 'b10_barrows'; },
  endCap:()=> 'Evening at the barrows, long mounds of new earth in rows, and the army standing at the edge of them.',
  tease:'There is no Chapter Eight, and no Book Eleven. There is the epilogue, a page for every soldier, and then the roll.',

  extras:()=>{ const f = S.f, x = [], fell = b107Fell();
    if (f.b10_c7_pickDone) x.push('Kolansii pickets behind an empty granary, the night before. The Third put them off the wall.');
    if (f.b10_c7_rushDone) x.push(`The first rush came onto ${b107S('Sedge\'s', 'the Twelfth\'s')} front rank, and the front rank stayed where it was, because the Third was behind it.`);
    if (f.b10_c7_lineDone) x.push(fell.length ? `The Kolansii, and two Shriven, and an Assail, came onto the Third's stretch. ${b107And(fell.map(NAME))} fell there.` : 'The Kolansii, and two Shriven, and an Assail, came onto the Third\'s stretch. Every one of the Third who stood there walked off it.');
    if (f.b10_c7_came) x.push(b107South() ? 'At the barrows the Fourth walked up out of the crowd and said its name.' : 'A Malazan Host came over the ridge, and the Fourth came onto the Third\'s stretch with it.');
    if (f.b10_c7_rimOk) x.push('The Fourth\'s old trick: rim to rim.');
    if (b107Key()) x.push(`The Third's road: ${B10_ENDW.t[b107Key()][0]}.`);
    if (b10FourthRoad()) x.push(`The Fourth's road: ${B10_ENDW.f[b10FourthRoad()][0]}.`);
    return x; },

  journal:()=>{ const f = S.f, fell = b107Fell(); return [
    b10BeatOf(7) && 'At the barrows, the squad said what it had all been for, the last time.',
    b10FourthRoad() && `The Fourth's road: ${B10_ENDW.f[b10FourthRoad()][0]}.`,
    b107Key() && `The Third's road: ${B10_ENDW.t[b107Key()][0]}.`,
    f.b10_c7_bredd && 'At the barrows, somebody asked after a soldier nobody could place.',
    f.b10_c7_fourthRoad && 'The Fourth told how it got here, in its own words.',
    f.b10_c7_came && (b107South() ? 'The Fourth found the Third at the barrows.' : 'A Malazan Host came over the ridge, and the Fourth with it.'),
    f.b10_c7_lineDone && (fell.length ? `Held the stretch. ${b107And(fell.map(NAME))} did not walk off it.` : 'Held the stretch. Everybody walked off it.'),
    f.b10_c7_rushDone && 'Held the front rank in the first rush.',
    f.b10_c7_dawn && !b107South() && 'Before light the heavies were called away. The call never reached the Third.',
    b107South() ? 'The Third, at the back of the Twelfth\'s line, before Kolanse City.' : 'The Third, file-closers in Captain Sedge\'s company, at the far end of the regulars\' line.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the night before (the first halt) ======== */
    b10_c7_start:()=>({sp:b107S('The first fields', 'The brigades\' camp'), scene:'b10_c7_eve', fx:()=>{ S.f.b10_c7_ph = S.f.b10_c7_ph || 1; S.f.b10_c7_start = 1; }, again:()=>b107S('The first fields at dusk, the regulars\' fires coming up in rows.', 'The brigades\' camp at dusk, the city low in the east.'), txt: b107South() ?
`The brigades' camp is long rows of fires on thin fields that have not grown anything in years, and in the east, close now, Kolanse City: a wall, low brown roofs, more of them than it looks, and past the roofs a tower standing up out of everything, black, very tall. The officers do not name it.

The Twelfth's fires are near the camp's east edge. The Third has a fire among them, and the Twelfth's carters have left it a pot, which they did not have to do.${b107Say({tangle:'\n\nTangle looks at the tower a long time and does not say what he would need to bring it down. That is new.', haddat:'\n\nHaddat sets the blue shield against a wagon wheel and sits by it, saving her words for tomorrow.', _:''})}${b107If('pruss', '\n\nPruss stands looking at the Twelfth\'s wagons with his hand on a wheel, as if checking a horse he used to own.')}` :
`The first fields of Kolanse are dust with stubble in it, and stubble with dust in it, and here and there an empty granary with its door hanging. The regulars have their fires in long rows across them. Past the last row the fields go on, flat, to a ridge, a long way off. There are fires on the ridge too. More of them than anybody likes.

Sedge's company has its fires at the far west end of the rows, where the fields run out into nothing much. The Third has a fire among them, lent, with the regulars' cords in its packs and the regulars' names on its slate.${b107Say({tangle:'\n\nTangle looks at the ridge and counts its fires, under his breath, and stops counting.', haddat:'\n\nHaddat sets the blue shield against a cart wheel and sits by it, saving her words for tomorrow.', _:''})}${b107If('pruss', '\n\nPruss is standing at the back of the Third\'s fire looking at the regulars\' lines the way a carter looks at a road he will have to haul up.')}`,
      ch:[{t:'The lines.', go:()=>startExplore('b10_c7_camp')},
          b10ReadChoice(7),
          {t:'Not now.', go:()=>startExplore('b10_c7_camp')}]}),
    b10_c7_read:()=>b10ReadOffer(7),
    b10_c7_card:()=>b10ReadCard(7),

    /* the shield laid on the ground, for the reading */
    b10_c7_shield:()=>({sp:'A shield on the ground', scene:'b10_c7_eve', txt:
`A ${b107S('regular\'s', 'Letherii')} shield laid face up on the dirt behind the fires, because it was the only flat thing on the fields. There has been a game of stones on it, given up.${!S.f.b10_c7_drawn && !S.f.b10_c7_noCard ? `\n\nThe old marine is sitting cross-legged by it with the Deck in his lap, watching the light go, the way he does at every halt. He looks up. He does not ask.` : ''}`,
      ch:[b10ReadChoice(7), {t:'Back to the fire.', go:()=>startExplore()}]}),

    /* Captain Sedge (on 'south', the Twelfth's finadd): by phase. 1 tomorrow, and the knots; 2 the order for the day; 3 after the line;
       4 at the barrows */
    b10_c7_sedge:()=>{ const ph = b107Ph(), sth = b107South(), nm = b107BossN();
      if (ph === 1) { if (!S.f.b10_c7_boss1) return {sp:nm, scene:'b10_c7_eve', txt: sth ?
`The Twelfth's finadd comes down the fires with a lamp and a slate, stopping at each, a thin Letherii with a careful moustache who has learned to say the Third's name properly, which most Letherii do not bother with.

"Tomorrow, before the city," he says. "The allies stand in a line and hold the Kolansii in front of them. The Twelfth has a stretch of it. You are at the back of it, as we said." He looks at the tower. "I asked the brigade's officers why. The answer was: until it does not matter. I have written that down."

He takes cords out of his belt, blue, knotted. "The Twelfth's file-closers wear these on the shoulder," he says. "So the front rank knows whose hand is in its back." He ties the first one himself.${b107If('pruss', '\n\nPruss holds his shoulder still for the knot like a horse being harnessed, and says thank you, which surprises the finadd.')}` :
`Captain Sedge comes down her company's fires at dusk with her helm on her hip, stopping at each one. She stops at the Third's. The burn on her cheek is pale in the firelight.

"Tomorrow," she says. "They're forming on the ridge. The Kolansii, and the ones who drive them. The army stands in front of them in one long line." She nods east along the rows of fires, which go on further than anybody can see. "My company's at the far end of it. The west end. A long way from anybody's banner." She looks at the Third. "Which is where file-closers earn their bread. So."

She takes cords out of her belt, red, knotted, and hands them round without a speech. "Left shoulder," she says. "So the front rank knows whose hand is in its back."${b107Give() ? `\n\nAt the next fire a young regular is sitting with a bandage on his lip and his corporal beside him. The young one from the next cloak, in the glass. He sees the Third and looks away, and then looks back, and nods.` : ''}${b107If('pruss', '\n\nPruss holds still for his like a horse being harnessed. "Back of the line," he says. Sedge almost smiles. "Where carters walk," she says. She remembers.')}`,
        ch:[{t:b107S('"The Third\'s at the back of your line, Captain."', '"The Third\'s at the back of the Twelfth, Finadd."'), fx:()=>{ S.f.b10_c7_boss1 = 1; if (!S.kit.includes('b10_c7_knot')) gain('b10_c7_knot'); }, go:()=>startExplore()}]};
        return {sp:nm, scene:'b10_c7_eve', txt:`${b107BossC()} is ${sth ? 'at the next fire, writing on the slate by lamplight' : 'at the next fire, with her helm on her knee, not sleeping either'}. "${sth ? 'Sleep, Sergeant, if you can. I am told it helps.' : 'Get some sleep, Sergeant. Or don\'t. I won\'t.'}"`, ch:[{t:'Back.', go:()=>startExplore()}]}; }
      if (ph === 2) { if (!S.f.b10_c7_orders) return DLG.b10_c7_order();
        return {sp:nm, scene:'b10_ridge', txt:`${b107BossC()} is walking the back of the stretch. "${sth ? 'Hold them in front of us, Sergeant. As long as it takes.' : 'Hold the stretch, Sergeant. That\'s all of it.'}"`, ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}; }
      if (ph === 3) { if (sth) { if (!S.f.b10_c7_march) return {sp:nm, scene:'b10_ridge', txt:
`The Twelfth's finadd comes back along the stretch at a walk, with his slate under his arm and his sword still out, which he notices, and sheathes.

"It is over here," he says. "Whatever it was. The word along the line is that the brigades march north tomorrow, all of them, to the foreigners' army, wherever it stood." He looks at the slate. "There was a battle there too, the word says. Larger. A Malazan Host came over a ridge at the end of it, and the Kolansii there went down on their knees." He tucks the slate away. "I have written it down. I do not understand it yet."${b107Fell().length ? `\n\nHe looks at the cloaks laid by the wagons. "I wrote your names down too, Sergeant," he says. "With ours."` : ''}`,
          ch:[{t:'"North, then."', fx:()=>{ S.f.b10_c7_march = 1; }, go:()=>startExplore()}]};
        return {sp:nm, scene:'b10_ridge', txt:'The Twelfth\'s finadd is writing the Twelfth\'s dead on his slate, carefully, in his small hand. "North tomorrow, Sergeant," he says, without looking up. "When the squad is ready."', ch:[{t:'Back.', go:()=>startExplore()}]}; }
        return {sp:nm, scene:'b10_ridge', txt:`Sedge is sitting on an upturned barrel behind the stretch with her helm on the ground beside her, looking at the open ground and the Kolansii kneeling in it. "Held," she says. "My company. Your Third." She looks along the line. "${b107Fell().length ? 'Not all of it walked off. Most of it did.' : 'All of it walked off. I don\'t know how.'}" She does not get up. "Go on. Your new friends are waiting."`, ch:[{t:'Back.', go:()=>startExplore()}]}; }
      /* ph 4: the barrows */
      return {sp:nm, scene:'b10_barrows', txt: sth ?
`The Twelfth's finadd has come up to the barrows' edge with the brigades, and stands a little apart from the Malazans, the way Letherii do here, with his slate.

"The Twelfth goes back to the coast," he says. "The King's ships. Home, for those who want it." He holds out the slate. On it, under the Twelfth's names, in his small careful hand, are the Third's. "You were at the back of our line," he says. "I put you in our book. I hope you do not mind."${b107If('pruss', '\n\nPruss looks at his name in the Letherii book a long time. "Carters," he says. "Never been in a book before."')}` :
`Sedge is at the barrows' edge with what is left of her company, her helm on her hip. She stands a while. Then she comes along the edge to the Third.

"Lent's over," she says. "Heavies want you back, I expect, whatever's left of the heavies." She looks at the Third, each of them, the way she looked at them in the scrub. "Best file-closers I ever had. Don't tell the heavies." She holds out her hand for the knots, and then does not take them. "Keep them," she says.${b107Give() ? '\n\nBehind her the young one from the next cloak in the glass stands with his corporal, a bandage round his head, alive. He nods to the Third, once. That is all he does. It is plenty.' : ''}`,
        ch:[{t:'Back.', fx:()=>{ S.f.b10_c7_boss4 = 1; }, go:()=>startExplore()}]}; },

    /* the heavies' fire (Thallo), the night before; on 'south' the Twelfth's wagons */
    b10_c7_heavies:()=>({sp:b107S('Thallo', 'The Twelfth\'s wagons'), scene:'b10_c7_eve', fx:()=>{ S.f.b10_c7_thallo1 = 1; }, again:()=>b107S('The heavies\' fire, Thallo at it, eating.', 'The Twelfth\'s wagons, the carters asleep under them.'), txt: b107South() ?
`The Twelfth's wagons are drawn up in a row at the camp's edge, and for the first time since Letheras there is something in all of them: the King's bread, the King's water, scale and pikes out of crates. The wagon-master is sitting on a tailboard with his ledger shut on his knee.

"Full," he says. "Every wagon. I keep opening the book to write it and finding there's nothing to write." He looks at the Third. "Thirty years carting. First time I've been sorry a road ended."${b107If('pruss', '\n\nPruss sits on the tailboard beside him for a while, and the two of them talk about axles, which is a kind of prayer.')}` :
`The heavies have their fire a few rows back, a big one, with the heavies round it in their scale like a ring of boulders. Thallo is at it, eating. Not crumbs: a whole loaf, slowly, with both hands, the way he ate before the glass.

"Sergeant," he says, with his mouth full. "Lent, eh. Back of the regulars." He swallows. "Heavies stand to before light. Captain hasn't said what for." He tears the loaf and holds half of it out. "Eat. You'll want it."${b107If('pruss', '\n\nPruss takes the half, breaks it again, and gives half of that to Haddat or whoever is nearest. Carters share loads.')}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* the empty granary at the field's edge: people watching; Kolansii pickets behind its wall (optional) */
    b10_c7_granary:()=>{ if (S.f.b10_c7_pickDone || S.f.b10_c7_pickLeft) return {sp:'The granary', scene:'b10_c7_eve', txt: S.f.b10_c7_pickDone ? 'The empty granary, its door hanging, and behind it the broken wall with nobody behind it now.' : `The empty granary. The pickets have gone back across the fields toward the ${b107S('ridge', 'city')}, counting.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'An empty granary', scene:'b10_c7_eve', txt:
`At the field's edge there is a granary, stone, with its door hanging off one hinge. Inside there is nothing, swept, and a lock on the floor that somebody broke to get in and found nothing to get. Past it, at the next field's edge, there are people standing in the dusk: a man, a woman, an old woman with a stick, watching the army's fires. They do not come closer. They do not go away.

Behind the granary, along a broken field-wall, there are four more who are not watching the fires so much as counting them. Kolansii: quilted coats too big for them, thin as the stubble. Two have bows.${b107If('tebbet', '\n\nTebbet has an arrow on the string. "Pickets," he says. "Sent to count us." He does not draw. "Let them count, or don\'t. Your call, Sergeant."')}`,
        ch:[{t:'Put them off the wall.', go:()=>startBattle('b10_c7_picket', {})},
            {t:'Round behind the granary, and onto them before the bows come round.', check:['guile', 19],
              edges:id=>[id === 'tegra' && ['she has stalked worse ground than stubble', 2], id === 'tebbet' && ['an archer knows where an archer looks', 1], id === 'mehet' && ['a granary is a building, and he knows buildings', 1], id === 'sathi' && ['the Weasels did this every night of the Wickan war', 1], id === 'pruss' && ['there is no wall big enough for him', -1], id === 'brask' && ['doubled scale in the dark is a bell', -1]],
              near:{t:()=>`Yes, but the granary's broken door swings on its last hinge as ${b107Nm(b107Who())} ${b107V(b107Who(), 'go', 'goes')} past it and catches ${b107V(b107Who(), 'you', b107Him(b107Who()))} across the shoulder. ${b107Nmc(b107Who())}'ll carry that into the fight.`, fx:()=>bruise(b107Who(), bruiseN())},
              go:()=>startBattle('b10_c7_picket', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c7_granary_seen'},
            {t:'Leave them. Let them count.', fx:()=>{ S.f.b10_c7_pickLeft = 1; }, go:'b10_c7_granary_left'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c7_granary_seen:()=>({sp:'The granary wall', scene:'b10_c7_eve', txt:
`A bowstring creaks, too early. One of them has turned and seen, and says one word, and the other three come up off the wall with their weapons, slowly, as if they had been expecting this all their lives.`,
      ch:[{t:'Shields.', go:()=>startBattle('b10_c7_picket', {surprise:'e'})}]}),
    b10_c7_granary_left:()=>({sp:'The granary', scene:'b10_c7_eve', txt:
`The Third goes back to its fire. Later, when the fires burn down, the four behind the wall are gone, back across the fields toward the ${b107S('ridge', 'city')}, with a number in their heads.

The people at the field-edge are still there. The old woman with the stick has sat down on the ground to watch. She is still watching when the Third stops looking.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b10_c7_picket_after:()=>({sp:'The granary wall', scene:'b10_c7_eve', fx:()=>{ S.f.b10_c7_pickDone = 1; }, txt:
`Two of them get up and go back across the fields toward the ${b107S('ridge', 'city')}, slowly, not looking round. The other two stay where they went down behind the wall.

${b107Say({mirrel:'Mirrel kneels by them a moment and stands. "Hungry before we ever touched them," she says. "Years of it." She goes to see to the squad\'s scrapes instead.', haddat:'Haddat does not know their names. She stands by the wall a moment anyway, with her mouth moving.', tebbet:'Tebbet unstrings the dead archer\'s bow and looks at the gut, and leaves it.', _:'The Third stands by the wall a moment. Then it goes back to its fire.'})}

At the next field's edge the old woman with the stick has not moved. She watched all of it. She does not look away now either.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* ======== the fire: by phase. 1 the first fields the night before; 2 and 3 the line (no fire); 4 the barrows' camp. The games pass
       wraps this node: keep the id ======== */
    b10_c7_fire:()=>{ const ph = b107Ph(), sth = b107South();
      if (ph === 2 || ph === 3) return {sp:'The squad', scene:'b10_ridge', txt:'There is no fire on the line. There will be one tonight, wherever the Third is.', ch:[{t:'Back.', go:()=>startExplore()}]};
      if (ph === 4) { const key = b107Key(), rd = b10FourthRoad(), beatOpen = !!key && !b10BeatOf(7);
        return {sp:'The squad\'s fire', scene:'b10_barrows', html:witnessHTML(), again:()=>'The squad\'s fire at the barrows\' camp, small.', txt:
`The Third's fire at the barrows' camp is small, of ${sth ? 'a broken Letherii wagon\'s boards' : 'a broken granary door and somebody\'s spear-shaft'}, with the long mounds dark behind it and the whole army's fires going away along their edge.${b107Fell().length ? '\n\nThere is room at the fire that there was not last night. The squad leaves it.' : '\n\nEvery one of the Third who stood on the stretch is at the fire. The squad keeps looking round to check.'}${b107If('pruss', '\n\nPruss sits at the back of the fire, where carters sit, with his old sergeant\'s helm on his knee.')}`,
          ch:[...(!key ? [{t:'Thallo has slates. Go and hear it.', go:'b10_c7_thallo'}] : []),
              ...(key && !rd ? [{t:'The Fourth\'s sergeant wants a word.', go:'b10_c7_fourth_ask'}] : []),
              ...(beatOpen ? [{t:'"What was it for, then?" Ask it, at the fire, the last time.', go:'b10_c7_beat'}] : []),
              {t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b10_c7_rest4, fx:()=>{ S.f.b10_c7_rest4 = 1; rest('The squad sits an hour at the fire by the barrows. Wounds close, mostly. Some do not.'); }, go:'b10_c7_fire_rest'},
              {t:'Talk with the squad.', go:'b10_c7_fire_talk'},
              {t:'The end of it.', req:()=>!!key && !!rd, onward:true, go:'b10_c7_onward'},
              {t:'Not now.', go:()=>startExplore()}]}; }
      return {sp:'The squad\'s fire', scene:'b10_c7_eve', html:witnessHTML(), again:()=>'The squad\'s fire on the first fields, small, the rows of fires going away past it.', txt:
`The Third's fire on the first fields is dry stalks and ${sth ? 'a Letherii wagon\'s broken tailboard' : 'a granary\'s broken shutter'}, with a pot on it of something ${sth ? 'off the King\'s ships' : 'out of the regulars\' stores'} that is mostly water and is hot, which is enough. The skins are full. The Third does not count them. Some of the squad keep touching them anyway.

${sth ? 'East, the city\'s few lamps. Past them, the tower, black against the last of the light.' : 'East across the fields the ridge is dark now, and its fires are many.'}`,
        ch:[b10ReadChoice(7),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b10_c7_rest1, fx:()=>{ S.f.b10_c7_rest1 = 1; rest('The squad sits an hour at the fire on the first fields, with water nobody counts. Wounds close, mostly.'); }, go:'b10_c7_fire_rest'},
            {t:'Talk with the squad.', go:'b10_c7_fire_talk'},
            {t:'Sleep, if anybody can. Then first light, and the line.', req:()=>!!S.f.b10_c7_boss1, onward:true, go:'b10_c7_night'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c7_fire_rest:()=>({sp:'The squad\'s fire', scene:b107Ph() >= 4 ? 'b10_barrows' : 'b10_c7_eve', txt:
`${b107Ph() >= 4 ? 'An hour, then, by the barrows, with the army\'s fires going away along the edge of the long mounds and the dark coming up out of them.' : 'An hour, then, on the first fields, with the regulars\' fires going down one by one and the ridge\'s fires not going down at all.'}

${b107Say({marrow:'Marrow goes round the squad with her bag and her string, and touches each of them on the forehead, and says "child", and moves on.', mirrel:'Mirrel goes round the squad\'s feet, one pair after another, and does not say anything about any of them, and that is how they know they will do.', haddat:'Haddat sits with the blue shield on her knees and says the names, very quietly, so as not to wake anybody.', _:'Some of them sleep. The rest watch the fire.'})}`,
      ch:[{t:'Back to the fire.', go:'b10_c7_fire'}]}),
    b10_c7_fire_talk:()=>{ const late = b107Ph() >= 4, ln = [];
      Object.keys(B107TALK).forEach(id => { if (b10In(id)) ln.push(late ? B107TALK[id][1]() : B107TALK[id][0]()); });
      return {sp:'The squad\'s fire', scene:late ? 'b10_barrows' : 'b10_c7_eve', txt:ln.length ? ln.join('\n\n') : 'The squad is quiet. You sit with it, and that is the talk.',
        ch:[{t:'Back to the fire.', go:'b10_c7_fire'}]}; },

    /* the way to the line: sleep, and first light */
    b10_c7_night:()=>{ const ready = !!S.f.b10_c7_boss1;
      return {sp:'The night', scene:'b10_c7_eve', txt: !ready ? `${b107BossN()} first. There is an order for tomorrow.` : `The fires go down. The Third lies down by its own with its boots on and its shields where a hand can find them, and some of it sleeps.${b107South() ? '' : '\n\nOn the ridge, the fires do not go down.'}`,
        ch: ready ? [{t:'Sleep. Then first light, and the line.', onward:true, fx:()=>{ S.f.b10_c7_ph = 2; }, go:()=>{ startExplore('b10_c7_line'); talk('b10_c7_dawn'); }}, {t:'Not now.', go:()=>startExplore()}]
          : [{t:'Back.', go:()=>startExplore()}]}; },
    /* first light. On the regulars' field: the order that never reached the Third (said once, plainly; never where the heavies went) */
    b10_c7_dawn:()=>({sp:b107S('First light', 'First light'), scene:'b10_ridge', fx:()=>{ S.f.b10_c7_dawn = 1; }, again:()=>`${b107S('The far end of the line', 'The Twelfth\'s stretch')} at first light.`, txt: b107South() ?
`Before light the brigades' drums go, quietly, and the camp gets up off the thin fields and walks out toward the city in its companies, and the Twelfth walks out with them, and the Third walks at the back of the Twelfth.

The line forms across open ground in front of Kolanse City. Across from it the Kolansii line, and trenches, and the city's wall, and the tower. The Twelfth's stretch is forty paces of dirt with a Letherii company on either side and the allied line going away left and right into the dust.${b107If('pruss', '\n\nPruss takes his place at the very back without being told, where carters walk.')}` :
`Some time in the night an order went round the heavies' fires. The Third did not hear it. A runner came down the lines in the dark with a list, looking for heavies, and found them, and the heavies got up out of their blankets and went off in the dark with their big swords on their shoulders, quietly, Thallo with them. The runner had a list. The Third was not on it. The Third was at the back of Sedge's company with the regulars' cords on its shoulders, lent, and nobody thought to look there. By the time anybody might have thought, the heavies were gone, and the Third was where it was.

At first light Sedge's company walks out across the fields in its files to the far west end of the army's line, and the Third walks behind it.

The stretch is forty paces of dirt at the very end of everything. West of it the line stops, and the fields go on, flat, to nothing. East of it the line goes on out of sight. Across the open ground in front, the ridge is black with Kolansii.${b107If('pruss', '\n\nPruss takes his place at the very back without being told, where carters walk.')}`,
      ch:[{t:'The stretch.', go:()=>startExplore()}]}),

    /* ======== phase 2: the stretch by day ======== */
    /* the order for the day (Sedge; on 'south' the Twelfth's finadd) */
    b10_c7_order:()=>({sp:b107BossN(), scene:'b10_ridge', html:witnessHTML(), txt: b107South() ?
`The Twelfth's finadd comes back along the stretch from the brigade's officers with one line written on his slate.

"The order," he says. "Hold them in front of us. Not beat them. Hold them, as long as it takes." He looks at the tower. "I asked how long. I was told: until it does not matter. I asked when that was. I was told I would know." He taps the slate. "I believe it is an honest order. I do not like it."

He nods to the Third. "Back of the line, Sergeant. Push."` :
`Sedge comes back along the line from wherever captains go before a fight, with nothing in her hands.

"Hold the stretch," she says. "That's the order. All of it. They come across the open ground, we're here when they arrive, we're still here when they stop." She looks east along the line, where it goes away into the dust. "The Adjunct's down there somewhere, a long way. The plains-folk with her. Nobody's coming this far west to help anybody today. Nobody's asking us to go anywhere, either."

She looks at the Third, at the red knots. "File-closers," she says. "Back of my line. Push."`,
      ch:[{t:'"Then we push."', fx:()=>{ S.f.b10_c7_orders = 1; }, go:()=>startExplore()}]}),
    /* the west end: the end of the line (on 'south' the Sixth, three stretches off) */
    b10_c7_west:()=>{ const six = b107SixthAt() === 'west' && b107Ph() === 2;
      return {sp:'The west end', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_west = 1; if (six) S.f.b10_c7_sixthSaid = 1; }, again:()=>'The west end of the stretch.', txt: b107South() ?
`${b107Ph() >= 3 ? 'At the west end the next Letherii company is sitting down where it stood, all of it, as if somebody had cut its strings.' : 'At the stretch\'s west end the Twelfth\'s last shield meets the first shield of the next Letherii company, and its sergeant looks along at the Third behind the Twelfth\'s line and raises his eyebrows at the size of them.'}${six ? `\n\n${b107Sixth()}` : ''}` :
`${b107Ph() >= 3 ? 'At the west end the line just stops, the way it did this morning. Past the last shield the fields go on, flat and empty, with nobody in them. Nothing came round the end. Nothing tried.' : 'At the stretch\'s west end the line just stops. The last shield is a regular\'s, a corporal with a burned hand, and past her there is nothing but thin fields going away flat into the morning. No one on the left. No one coming.'}${b107Say({tegra:'\n\nTegra looks out along the empty fields. "If they come round," she says, "they come round here." She stays a while, watching.', darrut:'\n\nDarrut looks at the last shield, and then at the nothing past it. "Aren Guard put its oldest on the end," he says. "You don\'t want to be the end." He stays a while anyway.', _:''})}`,
        ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}; },
    /* the east end: the far sights, by the hour (rules 107, 108); the one Letherii line when both squads crossed the glass */
    b10_c7_east:()=>{ const ph = b107Ph(), sth = b107South(), rush = b107RushDone(), line = b107LineDone(), six = !sth && b107SixthAt() === 'east';
      let t;
      if (sth) t = ph >= 3 ? `East along the line the allied companies are standing down one after another. Out past the city the tower stands up black, and round its foot there is fighting still, far off, small, under smoke. The Twelfth does not look at it long. It is not the Twelfth's.` : `East along the line the allied companies go on toward the coast, the brigades and then the Bolkando in their bright coats. Past the city, far off, the bay is grey. The tower stands up over all of it.`;
      else if (ph >= 3) t = `East along the line the regulars' companies are standing where they stood, a long way, out of sight. Far off past the end of everything, there is a low hill. All day there was smoke over it, and the thunder of munitions from that way, flat and late. Toward the end there was a glare from it that made every soldier on the stretch look away. Now it is quiet. What was on it, the stretch does not know, and does not ask.\n\nHigh over the east the sky is full of dragons: small, a great many, very high, wheeling. The stretch has no word for that either.`;
      else if (line) t = 'East, the line.';
      else if (rush) t = `East along the line, far off, the dust has changed. Horsemen, a great many, are going in at the gallop on the Kolansii's flank, all of them at once, the way the plains-folk do, and the dust takes them. The Khundryl, a regular says. The stretch does not see them come out.\n\nFar off past the end of everything, there is a low hill with smoke going up over it. Every so often the thunder of munitions comes from that way, flat, a long time after the smoke.${b107If('orvas', '\n\nOrvas puts his hand over the black tears on his face and keeps it there.')}`;
      else t = `East, the line goes on, company after company, out of sight into the dust. Somewhere down there, very far, there are standards. The Adjunct's will be one of them. Here there is no banner at all.\n\nAcross the open ground the ridge is black with Kolansii, and they are coming down off it.`;
      return {sp:'The east end', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_east = 1; if (six) S.f.b10_c7_sixthSaid = 1; }, again:()=>'The east end of the stretch, the line going away out of sight.', txt:`${t}${six ? `\n\n${b107Sixth()}` : ''}`,
        ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}; },
    /* the water barrels behind the stretch */
    b10_c7_barrels:()=>({sp:'The barrels', scene:'b10_ridge', again:()=>'The water barrels behind the stretch.', txt: b107Ph() >= 3 ?
`The barrels are low. ${b107Say({mirrel:'Mirrel has one open for the wounded, a cup at a time.', marrow:'Marrow has one open for the wounded, a cup at a time, calling each of them child.', _:'The wounded have had most of it. The squad does not mind.'})}` :
`Two barrels behind the stretch, ${b107S('filled from the wet ground at the glass\'s edge', 'off the King\'s ships, with Lether\'s mark on the staves')}. A cup hangs on each. What goes out of them is not being counted. The Third says nothing about it, and notices every cup.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    /* the surgeons' cart: after the first rush, the wounded carried back (might 19; a salve) */
    b10_c7_cart:()=>{ const ph = b107Ph();
      if (ph >= 3) return {sp:'The surgeons\' cart', scene:'b10_ridge', txt:'The surgeons\' cart is full, and a second one has come up behind it, and the surgeons have stopped saying anything to anybody except "next".', ch:[{t:'Back.', go:()=>startExplore()}]};
      if (!b107RushDone() || S.f.b10_c7_cart) return {sp:'The surgeons\' cart', scene:'b10_ridge', txt: S.f.b10_c7_cart ? 'The surgeons\' cart, the morning\'s wounded on it, a surgeon on the tailboard with her sleeves rolled.' : 'The surgeons\' cart behind the stretch, empty, a surgeon sitting on its tailboard with her sleeves already rolled.', ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'The surgeons\' cart', scene:'b10_ridge', txt:
`The first rush left ${b107S('Sedge\'s', 'the Twelfth\'s')} front rank with wounded in it who cannot walk back to the cart, and the cart cannot come up to the line. They have to be carried, now, before the next of it.`,
        ch:[{t:'Carry them back to the cart, two to a soldier, and come back to the line.', check:['might', 19],
              edges:id=>[id === 'pruss' && ['he has carried heavier, further, uphill', 2], id === 'brask' && ['heavies carry their own', 1], id === 'mirrel' && ['she knows how to lift a wound without opening it', 1], id === 'marrow' && ['the Lady steadies her hands', 1], id === 'thegg' && ['he is very large', 1], id === 'tallow' && ['he is not', -1], id === 'mehet' && ['locks are light', -1]],
              near:{t:()=>`Yes, but the last of them is a big regular in full scale, and ${b107Nm(b107Who())} ${b107V(b107Who(), 'come', 'comes')} back to the line with a wrenched back. ${b107Nmc(b107Who())}'ll feel it in the next of it.`, fx:()=>bruise(b107Who(), bruiseN())},
              go:'b10_c7_cart_ok', fail:'b10_c7_cart_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c7_cart_ok:()=>({sp:'The surgeons\' cart', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_cart = 'ok'; S.inv.salve = (S.inv.salve || 0) + 1; note('A salve, from the surgeon.', 'good'); }, txt:
`${by({pruss:'Pruss takes two at a time and does not seem to notice the weight', mirrel:'Mirrel goes first and shows the others how to lift a wound', _:'{who} goes first, and the squad follows'})}, and the wounded go back to the cart one after another without being dropped, and the Third is back on the line before anybody in the front rank has finished looking round for it.

The surgeon on the tailboard puts a salve in the last pair of hands without a word, and then, because that was not enough, says one. "Quick," she says. "Good."`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b10_c7_cart_no:()=>({sp:'The surgeons\' cart', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_cart = 'no'; }, txt:
`It is further than it looks, and the wounded are heavier than they look, and by the time the last of them is on the cart the Third is spread out across the back of the stretch in ones and twos, and has to run to get back.

Not one of them is dropped. That is the most that can be said, and it is not nothing.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the line: the first rush (survive), then THE MORTAL FIGHT, signposted on every step into it; after it, the field */
    b10_c7_line:()=>{ const ph = b107Ph(), sth = b107South();
      if (ph >= 3) return DLG.b10_c7_field();
      if (!S.f.b10_c7_orders) return {sp:'The line', scene:'b10_ridge', txt:`${b107BossN()} first. There is an order for the day.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      if (!b107RushDone()) return {sp:'The line', scene:'b10_ridge', html:witnessHTML(), txt:
`${b107S('Sedge\'s', 'The Twelfth\'s')} company is in the line, rim to rim, the front rank kneeling behind its shields and the second standing. The Third is behind both, where file-closers go, with a hand on each back in front of it.

Across the open ground the first of them are coming, at a run: not all of them, not yet. A rush sent to find out where the line is soft. ${sth ? 'A young Letherii' : 'A young regular'} in the front rank looks back over his shoulder at the Third.${b107If('pruss', '\n\nPruss puts a hand flat on the young one\'s back. "Here," he says. That is all. It works.')}`,
        ch:[{t:'"File-closers. Push."', onward:true, go:()=>startBattle('b10_c7_morning', {})},
            {t:'Not yet.', go:()=>startExplore()}]};
      const tried = !!S.f.b10_c7_closeTried;
      return {sp:'The line', scene:'b10_ridge', html:witnessHTML(), txt:
`The front rank is still there. ${S.f.b10_c7_closed === 'locked' ? 'The Third is behind it, a hand on every back, and the front rank knows it.' : S.f.b10_c7_closed === 'loose' ? 'It is shaking. The Third is behind it, mostly.' : 'It has been there since first light and it is shaking now, a little, all along.'}

Across the open ground the rest of them are coming. All of them. Off the ${sth ? 'trenches' : 'ridge'} and across the ground at a walk, and then not at a walk, more than the eye will count. Behind the first of them, taller than any of them, something pale is walking too, and does not hurry.

${b107Say({haddat:'Haddat sets the blue shield against the back in front of her and starts the names, under her breath, from the top.', marrow:'Marrow ties one more knot in her string, and puts it away, and picks up her shield.', tangle:'Tangle has the last of the munitions in his hands and is not counting them.', _:'The Third looks along itself once. Then out.'})}${b107If('pruss', '\n\nPruss sets his feet at the very back of the line, wide, braced, a carter behind a stuck wheel.')}

Whoever falls here stays down.`,
        ch:[...(!tried ? [{t:'Get the file-closers behind the front rank and keep it there, every hand on a back.', check:['might', 19], witness:true,
              edges:id=>[id === 'pruss' && ['a carter\'s whole trade is pushing what does not want to move', 2], id === 'brask' && ['the heavies\' line is made of exactly this', 2], id === 'haddat' && ['she has held a frightened shield line before', 1], id === 'darrut' && ['the Aren Guard closed its own files', 1], id === 'sgt' && ['you have closed a file before, at the back of worse', 1], id === 'tebbet' && ['an archer stands behind the line, not in its back', -1], id === 'tallow' && ['he is thinking about cards', -1]],
              near:{t:()=>`Yes, but the front rank's fear goes back down the hands into the Third. ${b107Nmc(b107Who())} ${b107V(b107Who(), 'feel', 'feels')} it come up the arm, and ${b107V(b107Who(), 'are', 'is')} shaken going in.`, fx:()=>b107Rattle(b107Who())},
              fx:()=>{ S.f.b10_c7_closeTried = 1; }, go:'b10_c7_closers_ok', fail:'b10_c7_closers_no'}] : []),
            {t:'"Third. Push." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:()=>startBattle('b10_c7_line', S.f.b10_c7_closed === 'locked' ? {surprise:'p'} : {})},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b10_c7_closers_ok:()=>({sp:'The file-closers', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_closed = 'locked'; }, txt:
`${by({pruss:'Pruss leans into the back in front of him like a carter into a load', brask:'Brask sets his shoulder where the heavies set it', haddat:'Haddat puts the blue shield flat against the back in front of her', sgt:'You go down the back of the line with a hand on every back', _:'{who} goes down the back of the line with a hand on every back'})}, and the rest of the Third does the same, and all along ${b107S('Sedge\'s', 'the Twelfth\'s')} front rank the shaking stops, because every one of them can feel a hand there now, and the hand is not going anywhere.

The front rank does not look back again. It does not need to.`,
      ch:[{t:'"Third. Push." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:()=>startBattle('b10_c7_line', {surprise:'p'})},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b10_c7_closers_no:()=>({sp:'The file-closers', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_closed = 'loose'; }, txt:
`The Third goes down the back of the line with a hand on every back, and the front rank shakes anyway. There are too many backs and not enough hands, and the thing walking behind the Kolansii is very tall.

It will have to do. The line is still a line.`,
      ch:[{t:'"Third. Push." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:()=>startBattle('b10_c7_line', {})},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b10_c7_morning_after:()=>({sp:'The line', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_rushDone = 1; }, txt:
`The first rush goes back across the open ground, what is left of it, slowly, without looking round. The front rank is still there. ${b107Say({pruss:'Pruss takes his hand off the young one\'s back, and puts it back again, in case.', haddat:'Haddat counts the front rank under her breath, and gets the same number twice.', _:'The Third counts it, twice.'})}

It is not yet noon. Across the open ground the rest of them have not started to move. They are only standing there, a great many of them, waiting for something.${b107South() ? '' : '\n\nEast along the line, a long way off, the dust is changing.'}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b10_c7_line_after:()=>{ const fell = (Array.isArray(S.f.lastFallen) ? S.f.lastFallen : []).filter(id => TPL[id]), sth = b107South();
      return {sp:'The stretch', scene:'b10_ridge', fx:()=>{ if (!S.f.b10_c7_lineDone) { S.f.b10_c7_lineDone = 1; S.f.b10_c7_fell = fell.slice(); S.f.b10_c7_ph = 3; }
          if (!sth && !S.f.b10_c7_came) { S.f.b10_c7_came = 1; b10Witness(1, 'somebody came'); } if (S.f.sgtScar) S.f.b10_c7_scarSaid = 1; }, txt:
`The tall one goes down in the end, and does not get up, and the two in pale cloth are down, and the last of the Kolansii who came onto the stretch are down or gone.${sth ? `

Then, in front of the stretch and all along the line as far as the Third can see, the Kolansii stop. All at once, the way birds stop. And they turn, and go away across the open ground, past their own trenches, past the city, toward the far tower, in a stream, as if somebody had called them and they could not help it. The line does not follow. It was not told to.` : `

Then, in front of the stretch, out in the open ground and all along it as far as the Third can see, the Kolansii stop. They lower their pikes, and their blades. And they go down on their knees, all of them, in the dirt, and stay there. Some of them are weeping. Some of them are only very tired. On the ridge behind them the Host stands in its long lines, and does not come any further, because it does not need to.

The stretch is very quiet. Somewhere down the line a regular starts to laugh, and stops.`}

${fell.length ? `${b107And(fell.map(NAME))} did not get up.\n\n${b107Say({marrow:`Marrow kneels by ${fell.length > 1 ? 'them' : 'the body'} and reaches for the Lady, and the Lady is there, and it is too late, and Marrow stays anyway.`, haddat:`Haddat kneels and says the ${fell.length > 1 ? 'names' : 'name'}, once, out loud, and then puts ${fell.length > 1 ? 'them' : 'it'} at the end of the list.`, pruss:`Pruss lifts ${fell.length > 1 ? 'them, one at a time,' : 'the body'} the way a carter lifts the load he was trusted with, and carries ${fell.length > 1 ? 'them' : 'it'} back behind the line.`, _:'The Third stands a moment where it is.'})}\n\nThe ${fell.length > 1 ? 'fallen are' : 'fallen is'} laid behind the line with a cloak over. There will be time tonight. There will be a great deal of time.` : `Everybody in the Third is standing. Everybody. ${b107Say({haddat:'Haddat says the names of the living under her breath, all of them, which she has never done before.', tangle:'Tangle counts the Third out loud, twice, and gets the same number both times, and does not believe it, and counts again.', _:'The squad counts itself, twice, and gets the same number both times.'})}`}${S.f.sgtScar && !S.f.b10_c7_scarSaid ? '\n\nThere is blood on your face that is your own. Something opened your cheek and you did not feel it. You feel it now.' : ''}`,
        ch:[{t:sth ? 'The Twelfth\'s finadd.' : 'Look round. The Host. The squad that came down onto the stretch.', go:()=>startExplore()}]}; },

    /* ======== phase 3: after the line ======== */
    /* the field after, from the line: headline only (no bodies close) */
    b10_c7_field:()=>({sp:'The open ground', scene:'b10_ridge', again:()=>'The open ground in front of the stretch.', txt: b107South() ?
`The open ground in front of the stretch is empty now except for what lies in it, and the last of the Kolansii going away across it toward the tower. The Twelfth's line stands where it stood, and goes on standing, and then all of it sits down at once.` :
`The open ground in front of the stretch is full of kneeling Kolansii, thin, grey, very still, with their weapons laid down in front of them. Regulars are walking out among them now with water, because nobody told them not to, and the Kolansii drink it with both hands.${b107Say({mirrel:'\n\nMirrel goes out with them, with a skin, and does not come back until it is nearly dark.', doss:'\n\nDoss watches a regular give a skin to a kneeling Kolansii boy. "Indebted," he says quietly. "All of them. To somebody." He goes out with his own skin.', _:''})}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    /* Rolle, a sergeant of the Host, with the Fourth's sergeant (the regulars' field) */
    b10_c7_rolle:()=>({sp:'Rolle, of the Host', scene:'b10_ridge', fx:()=>{ S.f.b10_c7_rolle = 1; if (!S.kit.includes('b10_c7_ridgecloak')) gain('b10_c7_ridgecloak'); }, again:()=>'Rolle, of the Host, sitting on his heels behind the stretch.', txt:
`A sergeant of the Host comes along the back of the stretch in a long grey cloak with the hood back, a broad, slow, unhurried man with a broken tooth, looking at everything. He stops at the Third.

"Rolle," he says. "Sergeant. The Host." He looks along the stretch, and at the open ground, and at the Third. "You held the end. All day, they say, with nobody on your left." He nods. "Good end."

He jerks his head back the way he came. "Brought you some company. They asked for this stretch. Said they'd heard of you." He considers. "They hadn't. They just wanted to be at an end of something. I know the feeling."

Then he takes off the long grey cloak, and holds it out, because ${b107Say({pruss:'Pruss has nothing on his back but dust and a helm', brask:'Brask\'s cloak is in rags', _:'one of the Third has nothing on its back but dust'})}. "Take it," he says. "Been over a ridge and through a pass. It'll do one more road."`,
      ch:[{t:'"The Fourth."', go:'b10_c7_fourth'}, {t:'Back.', go:()=>startExplore()}]}),
    /* the Fourth's sergeant: the meeting (on 'south', at the barrows: Witness +1 when the Fourth walks up); its road; the trick; the
       Fourth's own road at the end */
    b10_c7_fourth:()=>{ const ph = b107Ph(), sth = b107South(), met = b107FMet(), names = b107FNames(), first = !met;
      const fx = () => { if (!S.f.b10_c7_fourthMet) { S.f.b10_c7_fourthMet = 1; if (sth && !S.f.b10_c7_came) { S.f.b10_c7_came = 1; b10Witness(1, 'somebody came'); } if (sth && !S.kit.includes('b10_c7_ridgecloak')) gain('b10_c7_ridgecloak'); } };
      const intro = sth ?
`Somebody is walking along the barrows' edge looking at faces, as people do here, and stops at the Third's: a sergeant you have never seen, in a long grey cloak of the Host, with ${names.length ? `${b107And(names)} behind` : 'nobody behind'}.

"Third squad?" the sergeant says. "Ninth Legion? With the heavies?" A nod at your face. "Fourth. Seventh Company, once. Somebody told us there was a Third out here that did the same sort of thing we do." A long look along the Third. "We came over a ridge on the other field. We thought you'd be on it. You weren't." The sergeant sits down at the Third's edge as if it had been agreed. "So we came looking."

Somebody, years back, said the Fourth and the Third would never meet. Somebody was wrong about that.

${b107FSgtC()} takes off the long grey cloak and holds it out. "Spare," the sergeant says. "The Host had more of everything than it should have. Take it."` :
`${b107FSgtC()} is sitting on an upturned shield behind the stretch with the Fourth round about: ${names.length ? `${b107And(names)}, all of them` : 'nobody else; the Fourth is one sergeant today'}, in the Host's long grey cloaks with the dust of a ridge on them.

"Third squad," the sergeant says, before you can say anything. "Ninth Legion. The heavies' lot." A long look along the Third, the way one sergeant looks at another sergeant's squad. "Fourth. Seventh Company, once, and some other things since. We came over that ridge to the first stretch that looked like it needed somebody." A nod at the open ground. "It did."

Somebody, years back, said the Fourth and the Third would never meet. Somebody was wrong about that.`;
      const lines = names.length ? b107FSay({kettle:`\n\n${b10In('tangle') ? 'Kettle sits down next to Tangle and looks at his satchel with professional interest. "What\'ve you got left?" she says. He does not tell her. She approves.' : 'Kettle has a crossbow over her shoulder and a satchel that clinks, and looks at the Third\'s satchel with professional interest. Nobody tells her what is in it.'}`, ohl:`\n\nOhl is already among the Third's cuts with his needle and his opinions. "Who did this one?" he says of a dressing. ${b10In('mirrel') ? 'Mirrel says she did. "Hm," says Ohl. "Good."' : '"Hm," he says. "Good."'}`, brisk:'\n\nBrisk sits down first and stands up again first. "Fourth," she says to the Third, as if that settled everything. It does, mostly.', tuft:'\n\nTuft keeps looking east, past the end of the line, where the smoke was, and then not looking. "Don\'t ask," she says, to nobody who had asked.', _:''}) : '';
      const darrut = b10In('darrut') ? `\n\nDarrut hears "Aren" somewhere in it and looks up. "How's the harbour?" he says. "Still stinks," says ${b107FSgt()}. Darrut nods, satisfied.` : '';
      if (ph === 4 && met && b107Key() && !b10FourthRoad()) return DLG.b10_c7_fourth_ask();
      return {sp:sth ? 'A sergeant of the Host' : 'The Fourth\'s sergeant', scene:sth ? 'b10_barrows' : 'b10_ridge', fx, again:()=>`${b107FSgtC()}, with the Fourth.`,
        txt: first ? `${intro}${lines}${darrut}` : `${b107FSgtC()} is with the Fourth, ${sth ? 'at the Third\'s edge of the barrows' : 'behind the stretch'}, saying not much. "Sergeant," the sergeant says.`,
        ch:[{t:'"How did the Fourth get here?"', go:'b10_c7_fourth_road'},
            ...(!sth && !S.f.b10_c7_rimTried ? [{t:'"That thing you did on the stretch. With the shields. Show us."', check:['wits', 21], trick:'b10_c7_rim', fx:()=>{ S.f.b10_c7_rimTried = 1; },
              edges:id=>[id === 'haddat' && ['the Hissari shield-wall is the same lock, older', 2], id === 'brask' && ['the heavies\' line is this, with more scale', 2], id === 'darrut' && ['the Aren Guard locked rims on the gate', 1], id === 'pruss' && ['a carter\'s shoulder to the wheel is the same push', 1], id === 'sgt' && (typeof trickBy === 'function' && trickBy('b9_c1_rollcall') === 'sgt' ? ['you already call the heavies\' roll at the gate; this is the lock under it', 2] : ['you have stood in a shield line since Aren', 1]), id === 'tangle' && ['a sapper goes under a line, not along it', -1], id === 'tebbet' && ['an archer stands behind the shields, not in them', -1]],
              go:'b10_c7_rim_ok', fail:'b10_c7_rim_no'}] : []),
            ...(ph === 4 && b107Key() && !b10FourthRoad() ? [{t:'"Where does the Fourth go now?"', go:'b10_c7_fourth_ask'}] : []),
            {t:'Back.', go:()=>startExplore()}]}; },
    /* the Fourth's road, in one page of its own words (rule 109): Darujhistan, a ship, Aren, the old Host, a keep, a pass, the sappers */
    b10_c7_fourth_road:()=>({sp:b107FSgtC(), scene:b107Ph() >= 4 ? 'b10_barrows' : 'b10_ridge', fx:()=>{ S.f.b10_c7_fourthRoad = 1; }, again:()=>`${b107FSgtC()}, telling it again, shorter.`, txt:
`"Out of Darujhistan," ${b107FSgt()} says. "On a lake boat, the morning after the bells. Then a coast, and a ship, and a long time on it. I won't say how long. Long enough to stop being sick, and start again."

"Aren. Our old Host was in the streets there, getting ready to go somewhere and not saying where. They had our names on a list from before. Took us back as veterans, papers and all. Nobody asked why we'd come. Soldiers don't."

"Then we went out of Aren, all of us, and don't ask me how, because I couldn't tell you. A road that wasn't a road. The mages said don't look at the sides. We didn't."

"Then a keep, in hill country, with the Assail sitting round it. We had it off them. Then south a long way, to a pass, with them in it." A shrug. "The sappers did the rest. The Host had munitions, more than it should have, and nobody would say from where."${b107FIn('kettle') ? '\n\nKettle grins and pats her satchel, and says nothing at all.' : ''}

"Your High Mage is alive, by the way. Saw him once, at a distance. Shouting at somebody. Then he wasn't with us any more, and nobody would say where he'd gone."

"Then that ridge," ${b107FSgt()} says. "And here you are."${b107FDead().length ? `\n\nThe sergeant does not say the names the Fourth left behind before Aren: ${b107And(b107FDead().map(NAME))}. The Fourth says them anyway, at night. You can tell.` : ''}`,
      ch:[{t:'Back.', go:'b10_c7_fourth'}]}),
    b10_c7_rim_ok:()=>({sp:'Rim to rim', scene:b107Ph() >= 4 ? 'b10_barrows' : 'b10_ridge', fx:()=>{ S.f.b10_c7_rimOk = 1; }, txt:
`${b107South() ? 'The regular' : b107FSgtC()} stands the Third up in a row, shield to shield, and walks down it knocking each rim against the next with a fist until they ring together. "Rim to rim," ${b107South() ? 'he' : 'the sergeant'} says. "Not overlapped. Locked. So nothing gets a blade in the gap, and nobody steps back without the whole row knowing." ${b107South() ? 'He' : 'The sergeant'} shoves the end of the row. It does not move.

"That's all it is," ${b107South() ? 'he' : 'the sergeant'} says. "An officer remembered it once, the night the Hounds came. The shields remembered it with him." ${b107South() ? 'He' : 'The sergeant'} looks along the Third. "First thing the Fourth ever learned. Last thing I'll teach anybody, probably." It does not sound sad.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b10_c7_rim_no:()=>({sp:'Rim to rim', scene:b107Ph() >= 4 ? 'b10_barrows' : 'b10_ridge', txt:
`The Third locks its shields rim to rim, and ${b107South() ? 'the regular' : b107FSgt()} walks down the row knocking them together with a fist, and at the third shield the row gives a little, and at the fifth it gives a lot.

"Close," ${b107South() ? 'he' : 'the sergeant'} says. "It took the Fourth a war. You've had an afternoon." A shrug. "You'll do it when you need it. Everybody does."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    /* south off the stretch, to the barrows (phase 3 to 4); before the line, the rear is not a way out */
    b10_c7_tobarrows:()=>{ const ph = b107Ph(), sth = b107South();
      if (ph === 2) return {sp:'Behind the line', scene:'b10_ridge', txt:'Behind the stretch the track runs back to the wagons. Nobody is going back down it today, not while there is a front rank in front of the Third.', ch:[{t:'Back to the stretch.', go:()=>startExplore()}]};
      const ready = sth ? !!S.f.b10_c7_march : b107FMet();
      return {sp:sth ? 'North' : 'The army gathering', scene:'b10_ridge', txt: !ready ? (sth ? 'The Twelfth\'s finadd first. There is word along the line.' : 'The squad that came down onto the stretch first. Its sergeant is waiting behind the line.') : sth ?
`The brigades march north the next day, all of them, the Twelfth with them and the Third at the back of the Twelfth, out of sight of the city and the tower, across thin fields, toward the foreigners' army and wherever it stood.

They find it burying its dead.` :
`The army gathers on the field the next day, all of it that is left, company by company, the regulars and the plains-folk and the Host that came over the ridge, and what is left of the heavies, and starts to bury its dead in long mounds of new earth in rows.

The Third digs with everybody else.`,
        ch: ready ? [{t:'To the barrows.', onward:true, fx:()=>{ S.f.b10_c7_ph = 4; }, go:()=>{ startExplore('b10_c7_barrows'); talk('b10_c7_barrows_arrive'); }}, {t:'Not now.', go:()=>startExplore()}]
          : [{t:'Back.', go:()=>startExplore()}]}; },

    /* ======== phase 4: the barrows (Epilogue I; rule 110) ======== */
    b10_c7_barrows_arrive:()=>({sp:'The barrows', scene:'b10_barrows', again:()=>'The barrows at evening, the army at the edge of them.', txt:
`The barrows are long mounds of new earth in rows, a great many rows, on a field in Kolanse that has no name the Third knows. In the evening the whole army stands at the edge of them: the regulars, the plains-folk, ${b107South() ? 'the Letherii brigades come up from the south, ' : ''}the Host that came over the ridge, and what is left of everybody else. Nobody talks much. There are officers at the far end, a long way off, and somebody speaking, very far away. The Third cannot hear what is said. It does not try.

${b107Fell().length ? `${b107And(b107Fell().map(NAME))} ${b107Fell().length > 1 ? 'are' : 'is'} in the third row from the west, with ${b107S('Sedge\'s', 'the Twelfth\'s')} dead. The Third dug that row.` : 'The Third\'s own are all standing. The Third dug a row anyway, for Sedge\'s company. It seemed right.'}${b107SixthAt() === 'barrows' ? `\n\n${b107Sixth()}` : ''}`,
      fx:()=>{ if (b107SixthAt() === 'barrows') S.f.b10_c7_sixthSaid = 1; },
      ch:[{t:'The edge.', go:()=>startExplore()}]}),
    /* the edge: the Third's place at it; saying the names (a Witness check: speaking for the dead), and the Third's last roll */
    b10_c7_edge:()=>{ if (S.f.b10_c7_edge) return {sp:'The edge', scene:'b10_barrows', txt:'The edge of the barrows, a spear stood upright at the Third\'s place on it. The long mounds go away into the dark.', ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'The edge', scene:'b10_barrows', html:witnessHTML(), txt:
`The Third's place on the edge is where somebody stood a spear upright in the dirt, so a squad could find its way back to it. The long mounds go away in front of it, row after row, into the evening.

All along the edge, squads are standing in their files and saying their names, quietly, each squad to itself, so that the sound of it goes along the edge like wind in stubble. Nobody ordered it. Nobody needs to.${b107Say({haddat:'\n\nHaddat is already saying hers. She has been saying them since the Wastes. She looks at you, and waits.', _:''})}`,
        ch:[{t:'Say the Third\'s names at the edge, every one since Aren, the living and the dead.', check:['wits', 19], witness:true,
              edges:id=>[id === 'haddat' && ['she has said every one of them every night since Hissar', 2], id === 'marrow' && ['the string has a knot for each', 1], id === 'pruss' && ['he has carried six names further than this', 1], id === 'brask' && ['four names nobody calls; he knows how', 1], id === 'sgt' && ['the slate has had your hand on it since Aren', 1], id === 'tebbet' && ['he never learned half of them', -1]],
              near:{t:()=>`Yes, but halfway down the list ${b107Nm(b107Who())} ${b107V(b107Who(), 'lose', 'loses')} a name, and ${b107V(b107Who(), 'have', 'has')} to stand there in front of the barrows until somebody else gives it back. ${b107Nmc(b107Who())} ${b107V(b107Who(), 'are', 'is')} shaken by it a long time after.`, fx:()=>b107Rattle(b107Who())},
              fx:()=>{ S.f.b10_c7_edge = 1; }, go:'b10_c7_names_ok', fail:'b10_c7_names_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c7_names_ok:()=>({sp:'The names', scene:'b10_barrows', fx:()=>{ S.f.b10_c7_named = 'said'; if (!S.kit.includes('b10_c7_roll')) gain('b10_c7_roll'); }, txt:
`${by({haddat:'Haddat starts it, and the Third follows her', sgt:'You start it, and the Third follows', _:'{who} starts it, and the Third follows'})}: every name since Aren, in the order they came, the living and the dead, each one answered by the one beside, or, where there is nobody beside, by all of them together.

At the end of it ${b107Say({pruss:'Pruss adds six more, his old squad\'s, quietly, and the Third answers those too', _:'there is a silence, and the next squad along the edge starts theirs'})}.

Afterward ${b107Say({tangle:'Tangle', mehet:'Mehet', _:'somebody'})} cuts a strip of hide from a ration sack and scratches every name onto it with a knife point, and draws a line under the last. It is not a slate. Nobody can wipe it.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b10_c7_names_no:()=>({sp:'The names', scene:'b10_barrows', fx:()=>{ S.f.b10_c7_named = 'halting'; if (!S.kit.includes('b10_c7_roll')) gain('b10_c7_roll'); }, txt:
`The Third says its names at the edge, every one since Aren, and somewhere in the middle of the list it loses its place, and has to start a stretch of it again, and the squad on the left waits for it, politely, without looking.

It gets to the end. That is what matters. Afterward somebody cuts a strip of hide from a ration sack and scratches every name onto it with a knife point, so nobody has to remember them in order again.`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    /* Thallo at the barrows, eating; then the slates (the Third's ending) */
    b10_c7_thallo:()=>{ const first = !S.f.b10_c7_thallo;
      if (b107Key()) return {sp:'Thallo', scene:'b10_barrows', txt:`Thallo is sitting at the Third's fire with his slates on his knee, eating. "${b107Key() === 'kolanse' ? 'Wells,' : b107Key() === 'home' ? 'Home,' : 'Colours,'}" he says, with his mouth full. "Written."`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'Thallo', scene:'b10_barrows', fx:()=>{ S.f.b10_c7_thallo = 1; }, again:()=>'Thallo, with his slates.', txt:
`${first ? `Thallo finds the Third at the barrows' edge. He is eating. He breaks what he is eating in half and holds it out, which he has never done in his life, and the Third takes it.

${b107South() ? '"Lent south, all the way round," he says. "Heard you were at the back of a Letherii line. Heard it held." He chews. "Good."' : 'He does not say where the heavies went in the night. The Third does not ask. Nobody at the barrows is saying where anybody was.'}

` : ''}He has three slates under his arm, the way he had them in the Wastes, after the short-tails.

"Clerks want every squad's names on one of these by morning," he says. "Army's going on, what's left of it, wherever it goes now. That's the first. Some are staying here, in Kolanse, to dig wells for people who haven't seen rain in years. That's the second. And the time-served list. Ship home from the coast. That's the third." He holds them out. "Your names, Sergeant. Your call."`,
        ch:[b107South() && !S.f.b10_c7_fourthMet ? {t:'Not yet. Somebody is walking the barrows\' edge looking at faces.', go:()=>startExplore()} : {t:'Take the slates.', go:'b10_c7_key'}, {t:'Not yet.', go:()=>startExplore()}]}; }, // continuity read (Nov 10): on south the Fourth walks up before the slates, so its +1 counts toward the ending
    /* the key: the Third's ending (colours / kolanse / home); kolanse needs Witness holding or better; words by tier */
    b10_c7_key:()=>{ if (b107Key()) return DLG.b10_c7_key_done();
      const open = b10RoadOpen('kolanse'), low = b107Low(), high = b107High();
      return {sp:'Three slates', scene:'b10_barrows', html:witnessHTML(), again:()=>'Thallo\'s three slates, and a stub of chalk.', txt:
`${low ? `The squad looks at the three slates a while, and nobody says anything. Then somebody says "home" out loud, flatly, to see what it sounds like. It sounds like a word.` : high ? `The squad looks at the three slates, and then, before anybody says anything, round at each other. That takes a while. Nobody hurries it.` : `The squad looks at the three slates. Then at you.`}

${b107Say({haddat:'"The colours," Haddat says. "Wherever it goes. Somebody has to say the names where the army can hear them."', brask:'"The colours," Brask says. "Heavies stay. That\'s what heavies are for."', _:''})}${b107If('tegra', `\n\n"Here," Tegra says. "This ground has been asked too much. Somebody should ask it less."`)}${b107If('pruss', `\n\n"Wherever the load is," Pruss says. "Carters go where the load is." He looks at the second slate, and does not say which load he means. He does not have to.`)}${b107If('mirrel', `\n\n"Home," Mirrel says. "Some of us have earned it." She says it gently. She means it.`)}`,
        ch:[{t:'"The colours. Put the Third on the first slate."', fx:()=>{ S.f.b10_c7_key = 'colours'; b107L('haddat', 1); b107L('brask', 1); b107L('marrow', 1); }, go:'b10_c7_key_done'},
            open ? {t:'"Kolanse. Put the Third on the wells."', fx:()=>{ S.f.b10_c7_key = 'kolanse'; b107L('tegra', 1); b107L('pruss', 1); b107L('wenna', 1); b107L('tangle', 1); }, go:'b10_c7_key_done'}
                 : {t:'"Kolanse. The wells." (closed: the squad has not got it in it tonight)', tag:'closed', go:'b10_c7_key_closed'},
            {t:low ? '"Home. Say it plainly: home."' : '"Home. The time-served list."', fx:()=>{ S.f.b10_c7_key = 'home'; b107L('mirrel', 1); b107L('doss', 1); b107L('mehet', 1); }, go:'b10_c7_key_done'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b10_c7_key_closed:()=>({sp:'The second slate', scene:'b10_barrows', html:witnessHTML(), txt:
`You pick up the second slate, and look at the squad, and the squad looks at the barrows.

Staying in a starved country to dig wells for strangers is a thing a squad does when it still believes it is for something. Tonight the Third does not have that in it. Nobody says so. Nobody has to. Thallo takes the slate back, gently.`,
      ch:[{t:'Back to the slates.', go:'b10_c7_key'}]}),
    b10_c7_key_done:()=>{ const k = b107Key() || 'colours', low = b107Low(), high = b107High();
      return {sp:'The slates', scene:'b10_barrows', html:witnessHTML(), txt:
`${k === 'kolanse' ? `You chalk the Third's names on the second slate. Wells.` : k === 'home' ? `You chalk the Third's names on the time-served slate. Home.` : `You chalk the Third's names on the first slate. The colours.`} Thallo takes it and looks at it and puts it under his arm with the others.

${k === 'kolanse' ? (high ? 'Nobody in the Third had to be asked twice.' : 'Enough of the Third wanted it to make it the Third\'s.') : k === 'home' ? (low ? 'Nobody says anything. Nobody has to.' : 'The Third looks at the word for a while. Then everybody looks somewhere else, smiling a little, in case.') : (high ? 'The Third looks round at itself, and nobody is surprised.' : low ? 'It is where the column goes. The Third goes with it.' : 'It is where the army is. The Third has been the army a long time.')}${b107If('pruss', k === 'kolanse' ? '\n\n"Wells need hauling to," Pruss says, pleased.' : k === 'home' ? '\n\n"Da\'s cart," Pruss says. "He\'ll want a hand with it."' : '\n\n"Back of the line," Pruss says. "Where carters walk."')}`,
        ch:[...(!b10FourthRoad() ? [{t:'The Fourth\'s sergeant is waiting for a word.', go:'b10_c7_fourth_ask'}] : []),
            ...(!b10BeatOf(7) ? [{t:'"What was it for, then?" Ask it, the last time.', go:'b10_c7_beat'}] : []),
            {t:'Back.', go:()=>startExplore()}]}; },
    /* the Fourth's own road (S.f.b10_fourthRoad), its sergeant's choice told to the Third, asked of the Third's sergeant */
    b10_c7_fourth_ask:()=>{ if (b10FourthRoad()) return DLG.b10_c7_fourth_done();
      if (!b107Key()) return {sp:b107FSgtC(), scene:'b10_barrows', txt:`${b107FSgtC()} is waiting until the Third has its own answer. "Yours first, Sergeant," the sergeant says. "Then mine."`, ch:[{t:'Back.', go:()=>startExplore()}]};
      const k = b107Key();
      return {sp:b107FSgtC(), scene:'b10_barrows', fx:()=>{ if (!S.f.b10_c7_fourthMet) { S.f.b10_c7_fourthMet = 1; if (b107South() && !S.f.b10_c7_came) { S.f.b10_c7_came = 1; b10Witness(1, 'somebody came'); } if (!S.kit.includes('b10_c7_ridgecloak')) gain('b10_c7_ridgecloak'); } }, txt:
`${b107FSgtC()} comes and sits down by the Third's fire without asking, the way the Fourth does everything.

"The Host wants us back," the sergeant says. "Rolle came round asking. Veterans, papers, all that." A look at the fire. "Or there's the Third. ${k === 'kolanse' ? 'Digging wells, I hear.' : k === 'home' ? 'Going home, I hear.' : 'Staying with the colours, I hear.'} Or there's home. We were going home once. Darujhistan. A door, and bread at the price it is." The sergeant turns a stick in the fire. "I've been sergeant of the Fourth a long time, and I've never once asked another sergeant what to do." A look up at you. "Asking."${b107FSay({brisk:'\n\nBrisk is listening, and pretending not to.', tuft:'\n\nTuft is listening, and does not pretend.', _:''})}`,
        ch:[{t:'"Go back to the Host. It came over a ridge for you."', fx:()=>{ S.f.b10_fourthRoad = 'host'; }, go:'b10_c7_fourth_done'},
            {t:'"Stay with the Third."', fx:()=>{ S.f.b10_fourthRoad = 'third'; }, go:'b10_c7_fourth_done'},
            {t:'"Go home. You\'ve earned it twice."', fx:()=>{ S.f.b10_fourthRoad = 'home'; }, go:'b10_c7_fourth_done'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c7_fourth_done:()=>{ const r = b10FourthRoad() || 'host', k = b107Key() || 'colours';
      return {sp:b107FSgtC(), scene:'b10_barrows', txt:
`${r === 'third' ? `${b107FSgtC()} nods slowly, as if it had already been decided somewhere and this was only the paperwork. "The Third, then," the sergeant says. "${k === 'kolanse' ? 'Wells. I can dig.' : k === 'home' ? 'Home with you, as far as the coast. After that we\'ll see whose home.' : 'The colours. Somebody has to keep an eye on you lot.'}" Nobody planned it. Nobody argues with it.` : r === 'home' ? `${b107FSgtC()} looks at the fire a long while. "Home," the sergeant says. "Again. This time we mean it." A short laugh. "We meant it last time too."` : `${b107FSgtC()} nods. "The Host," the sergeant says. "It came over a ridge. Least we can do is go where it goes." A look at the Third. "We'll know where to find you. Ends of things."`}${b107FSay({kettle:'\n\nKettle looks pleased whichever way it goes. Kettle generally does.', ohl:'\n\nOhl says he has seen worse decisions, and names some.', _:''})}`,
        ch:[...(!b10BeatOf(7) && b107Key() ? [{t:'"What was it for, then?" Ask it, at the fire, the last time.', go:'b10_c7_beat'}] : []),
            {t:'Back.', go:()=>startExplore()}]}; },
    /* Nefarias Bredd, asked after once; nobody can say (rule 110; R24.4 S9) */
    b10_c7_bredd:()=>({sp:'Soldiers at the edge', scene:'b10_barrows', fx:()=>{ S.f.b10_c7_bredd = 1; }, again:()=>'A knot of soldiers at the edge, still arguing quietly.', txt: S.f.b10_c7_bredd ?
`The knot of soldiers is still arguing about it, quietly. Somebody says he was at the Wastes. Somebody else says he was at the hill. Somebody says there never was any such soldier, and the others tell him to shut up, and nobody can prove anything.` :
`A knot of soldiers from three companies is going along the edge of the barrows asking the same question at every squad.

"Nefarias Bredd," one of them says to the Third. "Seen him? Big. Killed a few hundred at the last battle, they say, and the one before." The Third has not seen him. Nobody has. "He was here," the soldier says. "Somebody saw him." He looks along the edge. "Somebody always sees him."

They go on to the next squad. You can hear them asking all the way down the edge, a long time.${b107If('mehet', '\n\nMehet watches them go. "Every army has one," he says. "Somebody nobody can find. Helps, somehow."')}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    /* a regular at the barrows' camp: on 'south', the one who teaches the trick; on the regulars' field, Sedge's corporal */
    b10_c7_regular:()=>{ const sth = b107South();
      if (sth) { const tried = !!S.f.b10_c7_rimTried;
        return {sp:'A regular of the line', scene:'b10_barrows', again:()=>'The grey regular, at his pack.', txt: tried ? `The grey regular is sitting by his pack, mending a strap. ${S.f.b10_c7_rimOk ? '"Rim to rim," he says, without looking up. "Don\'t forget it."' : '"You\'ll get it," he says. "Everybody does, when it matters."'}` :
`A grey regular is sitting by his pack at the barrows' camp with a shield on his knees, a big man with a voice like gravel, who stood on the regulars' line yesterday all day.

"Lent south, were you," he says. "Missed it." He knocks his shield's rim with his knuckle. "Squad came down onto our stretch off the ridge at the end, with the Host. Old lot. Their sergeant showed my file a thing, after." He stands up with the shield. "Rim to rim. Want it? It's not mine. I'm only passing it on."`,
          ch:[...(!tried ? [{t:'"Show us."', check:['wits', 21], trick:'b10_c7_rim', fx:()=>{ S.f.b10_c7_rimTried = 1; },
                edges:id=>[id === 'haddat' && ['the Hissari shield-wall is the same lock, older', 2], id === 'brask' && ['the heavies\' line is this, with more scale', 2], id === 'darrut' && ['the Aren Guard locked rims on the gate', 1], id === 'pruss' && ['a carter\'s shoulder to the wheel is the same push', 1], id === 'sgt' && (typeof trickBy === 'function' && trickBy('b9_c1_rollcall') === 'sgt' ? ['you already call the heavies\' roll at the gate; this is the lock under it', 2] : ['you have stood in a shield line since Aren', 1]), id === 'tangle' && ['a sapper goes under a line, not along it', -1], id === 'tebbet' && ['an archer stands behind the shields, not in them', -1]],
                go:'b10_c7_rim_ok', fail:'b10_c7_rim_no'}] : []),
              {t:'Back.', go:()=>startExplore()}]}; }
      return {sp:'A corporal of Sedge\'s', scene:'b10_barrows', fx:()=>{ S.f.b10_c7_corporal = 1; }, again:()=>'Sedge\'s corporal, at her pack.', txt:
`A corporal of Sedge's company is sitting by her pack with a burned hand wrapped in linen: the one who had the last shield at the west end, with nothing past her but fields.

"Nobody came round the end," she says. "All day I was waiting for it. Nobody came." She flexes the hand. "I'll be waiting for it the rest of my life, I expect."${b107Give() ? ' She nods at a young regular asleep against the next pack with a bandage round his head. "He was in my file in the glass. The next cloak over." She does not say anything else about it. She does not need to.' : ''}`,
        ch:[{t:'Back.', go:()=>startExplore()}]}; },
    /* the last beat (c7): what was it for (after the Third's ending is chosen) */
    b10_c7_beat:()=>{ if (b10BeatOf(7)) return DLG.b10_c7_beat_done();
      const k = b107Key() || 'colours';
      return {sp:'The squad\'s fire', scene:'b10_barrows', html:witnessHTML(), txt:
`Late, at the fire, with the barrows dark behind it and the slates gone off with Thallo, ${b107Say({haddat:'Haddat', marrow:'Marrow', tangle:'Tangle', _:'somebody'})} asks it, the last time. Not loudly. "What was it for, then?" A pause. "${k === 'home' ? 'Before we go home and nobody asks.' : k === 'kolanse' ? 'Before we start digging and forget to ask.' : 'Before the army walks off and we go with it.'}"

Nobody told the army why, all the way across the glass. Nobody is going to tell it now.${b107Say({pruss:'\n\nPruss turns his old sergeant\'s helm in his hands, waiting to hear.', _:''})}`,
        ch:[{t:'"Each other. All the way. That\'s what it was."', fx:()=>{ S.f.b10_c7_beat = 'each'; b10Beat('kept', 'each other'); }, go:'b10_c7_beat_done'},
            {t:'"So it was seen. We were here. Somebody saw it, even if it was only us."', fx:()=>{ S.f.b10_c7_beat = 'seen'; b10Beat('kept', 'our own witness'); }, go:'b10_c7_beat_done'},
            {t:'"Nothing. We walked because the column walked."', fx:()=>{ S.f.b10_c7_beat = 'nothing'; b10Beat('doubt', 'because the column walked'); }, go:'b10_c7_beat_done'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c7_beat_done:()=>{ const w = S.f.b10_c7_beat || 'each';
      return {sp:'The squad\'s fire', scene:'b10_barrows', html:witnessHTML(), txt:
`${w === 'nothing' ? `It is said plainly, and nobody argues with it, and nobody agrees with it either. The fire burns down. Somewhere along the edge somebody is still saying names.` : w === 'seen' ? `"We shall be our own witness," ${b107Say({haddat:'Haddat', marrow:'Marrow', _:'somebody'})} says, the old saying, the one an officer said once in a tent, they say. "That has to be enough." Then, quieter: "It was. It is."` : `Nobody says anything after that for a while. Then ${b107Say({tangle:'Tangle counts the Third out loud', haddat:'Haddat says the names of the living', _:'somebody counts the Third out loud'})}, once, and gets the right number, and that is the end of the talking.`}${b107If('pruss', `\n\nPruss puts his old sergeant's helm down by the fire, at last, among the Third's packs, where it can stay.`)}`,
        ch:[{t:'Back to the fire.', go:'b10_c7_fire'}]}; },
    /* the road south from the barrows: the end */
    b10_c7_onroad:()=>{ const ready = !!b107Key() && !!b10FourthRoad();
      return {sp:'The road', scene:'b10_barrows', txt: ready ? 'The road out of the barrows, south and west, toward the coast and everywhere else.' : !b107Key() ? 'Thallo first. He has slates.' : 'The Fourth\'s sergeant is waiting for a word first.',
        ch: ready ? [{t:'The end of it.', onward:true, go:'b10_c7_onward'}, {t:'Not now.', go:()=>startExplore()}] : [{t:'Back.', go:()=>startExplore()}]}; },
    b10_c7_onward:()=>{ const k = b107Key() || 'colours', r = b10FourthRoad() || 'host', fell = b107Fell();
      return {sp:B10_ENDW.t[k][0], scene:'b10_barrows', html:witnessHTML(), txt:
`In the morning the army goes on from the barrows, ${k === 'colours' ? 'and the Third goes with it, with what is left of the colours, wherever the army goes now' : k === 'kolanse' ? 'and the Third does not go with it. It stays, with a few others who asked, on the thin fields, with spades, looking for water' : 'and the Third goes the other way, down toward the coast with the time-served and the wounded who can travel, toward a ship'}.

${r === 'third' ? 'The Fourth goes with the Third, which was never the plan.' : r === 'home' ? 'The Fourth goes home, again, and this time means it.' : 'The Fourth goes back to the Host that brought it over the ridge.'}${fell.length ? ` ${b107And(fell.map(NAME))} ${fell.length > 1 ? 'stay' : 'stays'} in the third row from the west.` : ''}${b107If('pruss', `\n\nPruss walks at the back, where carters walk, with his old sergeant's helm tied to his pack.`)}${b107Say({haddat:'\n\nHaddat says the names as she walks, the long list, and at the end of it, the last new word: <em>here</em>.', _:''})}`,
        ch:[{t:'The end of it.', onward:true, go:()=>chapterEnd(7, b107Key() || 'colours')},
            {t:'Not yet.', go:()=>startExplore()}]}; },
  },
};

/* the back half of every ending's paragraph: where the Third stood, and how it ended (read by B10CH7.end and the coda) */
function b107Ends(){ const sth = !!(S && S.f && b107South());
  return sth ? 'Before Kolanse City, at the back of the Twelfth\'s line, the Third held against the Kolansii and the tall pale thing that drove them, until the Kolansii turned away for the far tower. Whoever fell there stayed down.'
    : 'On Captain Sedge\'s stretch, at the far west end of the regulars\' line, a long way from any banner, the Third held against the Kolansii and the tall pale thing that drove them, until a Malazan Host came over the ridge and the Kolansii went down on their knees. Whoever fell there stayed down.'; }
/* the Twelfth's spears grow with the squad, as the regulars do (180's rule, for this chapter's own ally) */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
    if (k === 'b10_c7_twelfth') { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); u.b10reg = true; } return u; }; }

/* ============ the end of Book Ten: the Third (037's pages), then the Sixth, the Fourth and Where the books meet (B10FIN.extra), then the
   engine's series coda ============ */
const B107FIN = {};
B107FIN.KEYS = ['colours', 'kolanse', 'home'];
B107FIN.key = k => B107FIN.KEYS.includes(k) ? k : (b107Key() || 'colours');
B107FIN.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B107FIN.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
B107FIN.wit = h => { const n = h && h.b10w && typeof h.b10w.n === 'number' ? h.b10w.n : B10_WIT0; return `${n} of ${B10_WITMAX}, ${B10_WITW[b10WitTier(n)]}`; };
B107FIN.mates = () => (S.squad || []).filter(id => id !== 'sgt' && TPL[id] && !(S.dead && S.dead[id]));
/* the soldier's Book Ten in a sentence a chapter: Ch 1 names/water, Ch 3 haul/cut, Ch 5 give/hold, Ch 7 the stretch (each with a default) */
B107FIN.book = (id, stretch = true) => { const w = id === 'sgt' ? 'you' : b107He(id), sth = b107South();
  return [b107Names() ? `At the camp after the short-tails, ${w} stood the burial lines and said every name.` : `At the camp after the short-tails, ${w} filled skins at the sappers' wells for the crossing.`,
    sth ? (b107Hauled() ? `On the long way round ${w} took the traces of a wagon with a broken team.` : `On the long way round ${w} cut a wagon loose and carried what could be carried.`)
        : (b107Hauled() ? `In the glass ${w} took a water wagon's traces when the oxen died.` : `In the glass ${w} cut the water wagon loose and carried what could be carried.`),
    b107Give() ? `At the last water ${w} gave the squad's last of it to ${sth ? 'a carter\'s boy of the Twelfth' : 'the next cloak over'}.` : `At the last water ${w} kept the squad's last of it for the squad.`,
    stretch && S.f.b10_c7_lineDone ? (sth ? `Before Kolanse City ${w} stood at the back of the Twelfth's line until the Kolansii turned away.` : `At the end ${w} stood on Sedge's stretch at the far west end of the regulars' line until the Host came over the ridge.`) : ''].filter(Boolean).join(' '); };

/* the Third's road page (037's 'road'): the key's title (B10_ENDW's) and its paragraphs, by the Witness tier */
B107FIN.ending = key => { const T = B10_ENDW.t[key] || B10_ENDW.t.colours, out = {title:T[0], scene:'b10_c7_road', paras:[]};
  if (typeof S === 'undefined' || !S || !S.f) return out;
  try { const mates = B107FIN.mates().map(NAME), n = mates.length + 1, tier = b10WitTier(), high = ['kept', 'witnessed'].includes(tier), low = ['hollow', 'doubt'].includes(tier);
    const with_ = v => mates.length ? `${b107And(mates)} ${mates.length > 1 ? v[0] : v[1]} with you.` : v[2];
    if (key === 'kolanse') out.paras = [
`When the army goes on from the barrows, the Third stays, with a few others who asked, on the thin fields of a country that had forgotten what rain was for. There is water under Kolanse. It has to be dug for.`,
`${with_(['stay', 'stays', 'You stay alone, and the people at the field-edges come and stand by you, and after a while they pick up spades.'])} The first well comes up wet on a morning nobody expected it to, and the people at the field-edges come closer than they have since the army came, and do not say anything, and drink.`];
    else if (key === 'home') out.paras = [
`The Third puts its names on the time-served list and walks down to the coast with the wounded who can travel, to a ship. Behind it the barrows, and somewhere in front of them a stretch of dirt at the end of a line. Ahead, a long way off, home, whatever home turns out to be.`,
`${with_(['walk', 'walks', 'You walk alone, and a regular with one arm walks with you as far as the coast, so it looks like a squad.'])} At every halt the Third counts itself, out of habit, and gets ${numw(n)}, and checks it.`];
    else out.paras = [
`The army goes on from the barrows, what is left of it, wherever it goes now. It is not told where. It is not told why. It goes anyway, and the Third goes with it, with what is left of the colours.`,
`${with_(['go', 'goes', 'You go alone, and the regulars put two of theirs beside you so that it looks like a squad.'])} At every halt the Third counts itself, and gets ${numw(n)}, and checks it.`];
    out.paras.push(`The Third, at the end: ${B10_WITW[tier]}.${high ? ' It says so, at the fire, to anybody who asks.' : low ? ' It does not say so. It walks anyway.' : ''}`,
      'There is no Book Eleven. Whatever road the Third is on after this, it walks it unwritten.');
    return out; } catch(e) { return out; } };

/* a road line per soldier per ending, and a warm closing line (the cold and middle ones are shared) */
B107FIN.T = {
  haddat:{title:'The names', colours:'Haddat stays with the colours, the blue shield on her arm, and the list she says at night is longer by a desert and a field, and she says all of it.', kolanse:'Haddat stays in Kolanse to dig wells, and says the names at every well-head as the water comes up, so the water knows who paid for it.', home:'Haddat takes ship for home with the blue shield on her back, and says the names every night of the voyage, to the sea, which does not argue.', warm:'"You stood," she tells you. "I will say that with the names. All the way to the end of them."'},
  sathi:{title:'The Weasels\' way', colours:'Sathi stays with the colours because the army is still the fastest thing in this country, and she means to be at the front of it.', kolanse:'Sathi stays in Kolanse, steals the thinnest horse in the country, feeds it until it is not thin, and rides it laughing.', home:'Sathi takes ship for home and spends the voyage grinning at the sea, the first thing she has met that is wider than the plains.', warm:'"Next time," she tells you, "we charge."'},
  tangle:{title:'The count', colours:'Tangle stays with the colours and the mostly empty satchel, and the first thing he does is go looking for whoever had munitions, more than they should have.', kolanse:'Tangle stays in Kolanse and digs wells the way a sapper digs under a wall, counting every spadeful, and the wells come up wet.', home:'Tangle takes ship for home with the satchel, and counts the straps every morning out of habit.', warm:'"Still here," he tells you. He means you. It is the best thing he knows how to say.'},
  marrow:{title:'The string', colours:'Marrow stays with the colours and the surgeons, and ties a knot in her string for every one who walks off a field on their own feet.', kolanse:'Marrow stays in Kolanse, where everyone is thin and the Lady has a great deal to do, and calls every one of them child, and they are.', home:'Marrow takes ship for home with the wounded who can travel, calling every one of them child, and ties a knot at every dawn nobody died.', warm:'"You kept them alive, child," she tells you. "Most of them. Most is what the job is."'},
  mirrel:{title:'Three, and up', colours:'Mirrel stays with the colours, counting the sick in threes at every halt, and for once the count goes up.', kolanse:'Mirrel stays in Kolanse with her herbs and finds the country has its own, thin and bitter, and learns every one of them.', home:'Mirrel takes ship for home and counts the sick on board in threes every morning, and the count stays the same all the way, which is the best thing a count can do.', warm:'"Feet," she tells you. "Show me." She means it kindly.'},
  doss:{title:'The book', colours:'Doss stays with the colours, further from the holding than any Indebted ever walked, and nobody asks him what he owes.', kolanse:'Doss stays in Kolanse and works the thin fields with people who owe nobody, because there is nobody left to owe, and finds he likes it.', home:'Doss takes ship for home and walks past the factor\'s door without stopping, to see what it feels like. It feels like the glass, he says. You walk.', warm:'"You never asked what I owed," he tells you. "Nobody ever didn\'t ask before."'},
  wenna:{title:'The sea', colours:'Wenna stays with the colours, because the army is going toward the sea, she says, eventually. There is always sea.', kolanse:'Wenna stays in Kolanse and finds the water under the fields with her ear to the ground, deep, and tells the diggers where.', home:'Wenna takes ship for home, barefoot on the deck, and talks to the Shore every night of the voyage whether it answers or not.', warm:'"I\'ll tell the Shore about you," she tells you. "It listens, even now."'},
  mehet:{title:'The keys', colours:'Mehet stays with the colours with his ring of keys, and the first locked door the army comes to, he opens before anybody asks.', kolanse:'Mehet stays in Kolanse and opens every empty granary in the district with his keys, and fills them, slowly, with whatever grows.', home:'Mehet takes ship for home toward cities, any city, and names the streets of one every night of the voyage, to keep them.', warm:'"Next door we come to," he tells you, "I\'ll open it for you."'},
  ottar:{title:'The word', colours:'Ottar stays with the colours in his grey plate, and learns a word of the Malazans\' every day, and today\'s is <em>stayed</em>.', kolanse:'Ottar stays in Kolanse and does not say why, and walks out alone some evenings toward the east, and comes back.', home:'Ottar takes ship with the Third as far as the first port, and there he goes ashore alone with his helm under his arm, and does not say where.', warm:'"Today\'s word," he tells you, "is <em>sergeant</em>. It means the one who stayed."'},
  tallow:{title:'Mostly they came back', colours:'Tallow stays with the colours with his grandmother\'s cards in his shirt, and reads for the regulars at night, and never for himself.', kolanse:'Tallow stays in Kolanse and reads the Deck on an upturned bucket by a new well for anyone who asks, and everybody draws something kind.', home:'Tallow takes ship for home and reads the Deck on deck for the sailors, who bring their own luck to argue with it.', warm:'"Grandmother would\'ve liked you," he tells you. "She liked people who came back."'},
  hessa:{title:'The door', colours:'Hessa stays with the colours with her spear upright, and at every halt she stands between the Third and the dark like a temple door.', kolanse:'Hessa stays in Kolanse and says the worm is closer here than anywhere, under the thin soil, and kneels to it every morning.', home:'Hessa takes ship for home and stands at the rail at night with her spear, and says the sea has a worm too, and so does she.', warm:'"You held the door," she tells you. "That is all a temple is."'},
  tebbet:{title:'A long way off', colours:'Tebbet stays with the colours out on the flank, further out than anyone, looking for something to shoot, and finds the horizon.', kolanse:'Tebbet stays in Kolanse and hunts for the wells\' crews, birds and hares, which come back to the fields slowly once there is water.', home:'Tebbet takes ship for home and stands at the bow all day looking for something to shoot, and finds the horizon again.', warm:'"Next time," he tells you, "I\'ll see them coming further off."'},
  darrut:{title:'The wall', colours:'Darrut stays with the colours with his big shield, and keeps the stretch to himself, the Aren Guard\'s way of saying a thing was bad.', kolanse:'Darrut stays in Kolanse and builds a wall round the first well, dry stone, waist high, and says the Aren Guard would have approved.', home:'Darrut takes ship for home, and at Aren he goes ashore and stands a while at the gate where he once stood guard, and then goes in.', warm:'"A wall\'s a wall," he tells you. "We were one."'},
  yorin:{title:'Clear tomorrow', colours:'Yorin stays with the colours and tells the quartermasters what the sky will do each morning, and they listen, which is new.', kolanse:'Yorin stays in Kolanse and watches the sky for rain with his copper vane every morning, and one morning it points the right way.', home:'Yorin takes ship for home, and the vane points home every morning of the voyage, which he says is Serc agreeing.', warm:'"Clear tomorrow," he tells you. "I checked."'},
  rasp:{title:'Lovely', colours:'Rasp stays with the colours and goes looking for whoever had munitions, more than they should have, to ask where from.', kolanse:'Rasp stays in Kolanse and opens the first well-shafts through the rock with what is left in her satchel, and calls every one of them lovely.', home:'Rasp takes ship for home toward the Malaz waterfront and a cusser she means to throw into the harbour, she says, just to hear it.', warm:'"Lovely work, Sergeant," she tells you. "Lovely."'},
  orvas:{title:'The tears', colours:'Orvas stays with the colours and rides with what is left of his people, and weeps for the ones who went in, loudly, as is right.', kolanse:'Orvas stays in Kolanse with a horse and the black tears on his face, and teaches the well-diggers\' children to ride, and weeps when they fall, and laughs when they get up.', home:'Orvas takes ship with the Third and weeps at the rail every evening for the plains, loudly, as is right.', warm:'"You weep for none of them," he tells you. "So I weep for you as well. It is no trouble."'},
  redblade:{title:'The red scale', colours:'Ramin stays with the colours in his red scale, very straight, and has stopped asking whether the Red Blades would approve.', kolanse:'Ramin stays in Kolanse and stands guard all night over the first granary that has anything in it, in his red scale, and is not asked to.', home:'Ramin takes ship for home in his red scale, and does not say whether he means to go back to the Red Blades or to find out why he left.', warm:'"You did not run," he tells you. "I have served officers who did."'},
  warlock:{title:'The grandmother', colours:'Keth stays with the colours, and the grandmother complains about it every morning, out of his mouth, and stays too.', kolanse:'Keth stays in Kolanse, and the grandmother says she likes it here, where old women are listened to, even ones who live in boys.', home:'Keth takes ship for home, and the grandmother says it is about time, out of his mouth, every morning of the voyage.', warm:'"*Good sergeant,*" the grandmother tells you, out of his mouth. "*For a foreigner.*"'},
  brask:{title:'Four names, and more', colours:'Brask stays with the colours, doubled scale and the heavy sword, and the notch he cut the night before at the end of his tally-stick he does not file flat.', kolanse:'Brask stays in Kolanse and digs, because heavies dig last and he has decided that means until it is done.', home:'Brask takes ship for home with the tally-stick in his belt, and at the first port he files the old notches clean and new, and keeps the rest.', warm:'"Heavies eat last," he tells you. "You ate last too. I noticed."'},
  tegra:{title:'The ground', colours:'Tegra stays with the colours as its guide, out ahead, reading a country nobody else can read, and is paid in water, which she says is fair.', kolanse:'Tegra stays in Kolanse, where the ground has been asked too much, and teaches it to the people who will ask it less.', home:'Tegra walks with the Third as far as the coast, and there she stops, and looks back the long way toward the plains, and goes.', warm:'"Among my people the dead watch," she tells you. "Among yours, you do. I have decided I prefer yours."'},
  pruss:{title:'The traces', colours:'Pruss stays with the colours, at the back of the line where carters walk, his old sergeant\'s helm tied to his pack, saying his old squad\'s six names at night and the Third\'s after them.', kolanse:'Pruss stays in Kolanse and hauls for the well-diggers, stone and water and anything that wants hauling, because when the beasts die the carters take the traces.', home:'Pruss takes ship for home to a road outside Unta and his da\'s cart, and tells his da about the glass, and his da does not believe a word of it, and Pruss does not mind.', warm:'"Back of the line," he tells you. "Where carters walk. Good place. You can see everybody from there."'},
};
/* a page for a soldier of the Third who walks to the end */
B107FIN.fate = (id, key) => {
  key = B107FIN.key(key); if (id === 'sgt') return B107FIN.sgt(key);
  const t = B107FIN.T[id], nm = NAME(id);
  const tr = Object.entries(S.tricks || {}).filter(([k, v]) => v.who === id && TRICKS[k] && /^b10_/.test(k)).map(([k]) => `${b107Cap(b107He(id))} carries a trick out of Book Ten: ${TRICKS[k].name}.`)[0] || '';
  if (!t) return {title:TPL[id] ? TPL[id].role : '', txt:B107FIN.join([B107FIN.book(id), `${nm} ${key === 'home' ? 'takes ship for home with the Third, time served' : key === 'kolanse' ? 'stays in Kolanse with the Third, to dig wells' : 'stays with the colours, with the Third'}.`])};
  return {title:t.title, txt:B107FIN.join([t[key], B107FIN.book(id), tr, B107FIN.loy(id, t.warm, `${nm} walks a little apart from you now, and you both know why.`, `${nm} walks with you as ${b107He(id)} has since the glass.`)])};
};
/* a page for someone of the Third not walking at the end: the fallen on the stretch, the fallen earlier in Book Ten, the fallen before
   it, a soldier waiting, a recruit sent away */
B107FIN.gone = (id, key) => {
  key = B107FIN.key(key); const sth = b107South(), He = b107Cap(b107He(id));
  if (S.dead && S.dead[id]) { const d = S.dead[id];
    if (d.ch === 7 && !d.from) return {title:'Fallen', txt:B107FIN.join([
      sth ? `${NAME(id)} fell on the Twelfth's stretch before Kolanse City, at the back of a Letherii line, holding it until the Kolansii turned away for the far tower. Whoever fell there stayed down.` : `${NAME(id)} fell on Sedge's stretch at the far west end of the regulars' line, holding it until a Malazan Host came over the ridge and the Kolansii went down on their knees. Whoever fell there stayed down.`,
      `${He} is in the barrows, in the third row from the west, with ${b107S('Sedge\'s', 'the Twelfth\'s')} dead. The Third dug that row, and stood at the edge, and said the name, and says it at every fire since.`,
      B107FIN.book(id, false)])};
    if (!d.from) return {title:'Fallen', txt:B107FIN.join([`${NAME(id)} did not come to the end of it${d.where ? `: ${d.where}` : ''}.`, `The Third carried the name the rest of the way, ${sth ? 'the long way round' : 'across the glass'}, and said it at the barrows' edge with the others.`])};
    return {title:'Fallen', txt:B107FIN.join([`${NAME(id)} fell before this book${d.where ? `, at ${d.where}` : ''}, and did not come ${sth ? 'the long way round' : 'into the glass'}.`, 'The Third carried the name out of the Wastes, and said it at the barrows\' edge with the others.'])}; }
  const done = B10_DONE[id] ? S.f[B10_DONE[id]] : null, waits = (S.camp || []).includes(id) || done === 2;
  if (waits) return {label:'Waiting', title:'With the baggage', txt:`${NAME(id)} waited with ${B10_HOME[id] || 'the heavies\' baggage'} while six of the Third stood on the stretch, and walked to the barrows with it after. ${He} ${key === 'home' ? 'takes ship for home with the Third, time served' : key === 'kolanse' ? 'stays in Kolanse with the Third, with a spade' : 'stays with the colours, with the Third'}.`};
  if (done === 0) return {label:'Sent away', title:'Another road', txt:`${NAME(id)} went another way when the Third would not take ${b107Him(id)}. Word of the barrows reached ${b107Him(id)} wherever that was, the way word does, a long time after.`};
  return null;
};
/* the Third's sergeant */
B107FIN.sgt = key => { const fell = b107Fell();
  return {title:'Third squad', txt:B107FIN.join([
    key === 'kolanse' ? 'You stay in Kolanse with what is left of the Third, Third squad, 9th Legion, lent to nobody now, with a spade. When the people at the field-edges ask what the stretch was like, you tell them about a corporal with a burned hand who waited all day for somebody to come round the end of the line, and nobody came, and they nod, because they have been waiting for things too.'
    : key === 'home' ? 'You take ship for home with what is left of the Third, time served. Somewhere in a clerk\'s box there is a slate with your names on it and the word <em>home</em>. At night on the deck you count the Third, out of habit, and check it.'
    : 'You stay with the colours, Third squad, 9th Legion, the heavies\' lot again now the lending is over. When the regulars ask what the far end of the line was like, you tell them: nobody came round it, all day. Then a Host came over a ridge. They do not believe the second part. You do not blame them.',
    `${B107FIN.book('sgt')} ${fell.length ? `It cost ${b107And(fell.map(NAME))}.` : 'Everybody who stood on the stretch with you walked off it.'}`,
    typeof trickBy === 'function' && trickBy('b10_c7_rim') === 'sgt' ? 'You know how to lock a shield rim to rim. The Fourth taught you. You will teach somebody, some day.' : '',
    S.f.sgtScar ? 'There is a scar on your cheek from the stretch. You do not look at it.' : '',
    `Witness, at the end: ${B107FIN.wit(S)}.`])}; };
/* 037's end page: the book, the squads' parts, Witness */
B107FIN.coda = key => { const fell = b107Fell(), sth = b107South(), h = (S.th && S.th.l) || null, ladj = b10LRoad() === 'adjunct';
  const lfell = h ? Object.keys(h.dead || {}).filter(id => h.dead[id] && !h.dead[id].from && h.dead[id].ch === 6 && TPL[id]) : [];
  return [
    sth ? 'The army went east into a desert made of glass without being told why. The Third went the other way, the long way round, with the Letherii, on a water ration that kept being cut, behind grey knights who turned off east one morning and did not come back. Then there was a battle before a city, and the Kolansii turned away from it for a far tower. Afterward the allies went north, and found the army burying its dead.'
        : 'The army went east into a desert made of glass without being told why, on water that ran out, and came out of it because the ground went wet under it. Then there was a battle on a field of thin dirt, and a Malazan Host came over a ridge at the end of it, and the Kolansii went down on their knees. Afterward the army buried its dead in long mounds and stood at the edge.',
    `The Third was there, on ${sth ? 'the Twelfth\'s stretch, at the back of a Letherii line' : 'Sedge\'s stretch, at the far west end of the regulars\' line'}. ${fell.length ? `${b107And(fell.map(NAME))} did not walk off it.` : 'Every one of the Third who stood on it walked off it.'} The Sixth was there too, ${ladj ? 'on the foreigners\' line in the morning' : 'before Kolanse City, between a dry ditch and a dead tree'}. ${lfell.length ? `${b107And(lfell.map(NAME))} did not come off it.` : 'Every one of the Sixth came off it.'} The Fourth ${sth ? 'came over a ridge on the other field, and found the Third at the barrows after' : 'came over the ridge with the Host, onto the Third\'s stretch'}. That is each squad's part. It is small. It is the only part anybody will tell right.`,
    `Witness at the end: the Third ${B107FIN.wit(S)}; the Sixth ${h ? B107FIN.wit(h) : 'not counted'}.`]; };

B10CH7.finale = {
  ids:()=>[...new Set(['haddat', 'sathi', 'tangle', 'marrow', 'mirrel', 'doss', 'wenna', 'mehet', 'ottar', 'tallow', 'hessa', 'tebbet', 'darrut', 'yorin', 'rasp', 'orvas', 'redblade', 'warlock', 'brask', 'tegra', 'pruss',
    ...Object.keys((S && S.dead) || {}), ...((S && S.camp) || [])].filter(id => id !== 'sgt' && TPL[id]))],
  labels:{epi:'Epilogue', squad:'The Third', fallen:'The fallen', away:'Not at the barrows', sgtRole:'Sergeant · Third squad, with the heavies', road:'The road', prologue:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length + (S && S.th && S.th.l ? Object.keys(S.th.l.dead || {}).length : 0) + b107FDead().length} names, three squads`], noDead:'None of the Third. Every one of them walked off the stretch.', paper:false,
    endline:'The End of <em>Witnessed</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for The Crippled God, the glass, the last water, the far end of the line and the barrows, and to Ian C. Esslemont for the world they built together; the Third, the Sixth and the Fourth only walked beside it.'},
  endings:{ get colours(){ return B107FIN.ending('colours'); }, get kolanse(){ return B107FIN.ending('kolanse'); }, get home(){ return B107FIN.ending('home'); } },
  fate:(id, key)=>B107FIN.fate(id, key),
  gone:(id, key)=>B107FIN.gone(id, key),
  coda:(key)=>B107FIN.coda(key) };

/* ---- the Sixth's pages: Chapter 6's B10CH6.fates (read defensively, from S.th.l), and a short fallback here if it is missing ---- */
B107FIN.lethHalf = () => (S && S.th && S.th.l) || null;
B107FIN.lethFates = () => { try { const F = typeof B10CH6 !== 'undefined' && B10CH6 && B10CH6.fates; return F && typeof F.pages === 'function' ? F : null; } catch(e) { return null; } };
B107FIN.lethRoad = () => { const F = B107FIN.lethFates(), r = b10LethRoad() || 'letheras', h = B107FIN.lethHalf(), W = B10_ENDW.l[r] || B10_ENDW.l.letheras;
  let page = null; try { page = F && typeof F.roadPage === 'function' ? F.roadPage() : null; } catch(e) { page = null; }
  return {title:(page && page[0]) || W[0], paras:[(page && page[1]) || W[1],
    h && h.name ? `Sergeant ${esc(h.name)}, Sixth Company, the Whitefinder Battalion. Witness, at the end: ${B107FIN.wit(h)}.` : '',
    'There is no Book Eleven. Whatever road the Sixth is on after this, it walks it unwritten.'].filter(Boolean)}; };
B107FIN.lethPages = () => { const h = B107FIN.lethHalf(); if (!h) return []; const F = B107FIN.lethFates(), r = b10LethRoad() || 'letheras', dead = h.dead || {};
  const ttl = pg => pg.id === 'sgt' ? 'The Sixth\'s sergeant' : pg.k === 'gone' ? 'Fallen' : pg.label === 'Waiting' ? 'Waiting' : (B10_ENDW.l[r] || B10_ENDW.l.letheras)[0];
  let P = [];
  try { if (F) { const Q = F.pages(); if (Array.isArray(Q)) P = Q.map(pg => Object.assign({}, pg, {title:ttl(pg), loy:(h.loy && h.loy[pg.id]) || 0})); } } catch(e) { console.warn('finale', e); P = []; }
  if (!P.length) { const walking = (h.squad || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id]);
    P = [...walking.map(id => ({id, k:'fate', label:'The Sixth', title:ttl({id}), txt:`${TPL[id].name} came to the end of the long way round with the Sixth.`, loy:(h.loy && h.loy[id]) || 0})),
      {id:'sgt', k:'fate', label:'The sergeant', title:'The Sixth\'s sergeant', txt:'You came to the end of the long way round at the head of the Sixth.', loy:0, name:h.name || ''}]; }
  /* the Sixth's fallen from before this book (Chapter 6's pages leave them out): before the sergeant */
  const before = Object.keys(dead).filter(id => id !== 'sgt' && TPL[id] && dead[id].from && !P.some(p => p.id === id))
    .map(id => ({id, k:'gone', label:'The fallen', title:'Fallen', txt:`${TPL[id].name} fell before this book${dead[id].where ? `, at ${dead[id].where}` : ''}, and did not come out of the Wastes with the Sixth. The squad said the name at the last fire, with the others.`}));
  const si = P.findIndex(p => p.id === 'sgt'); if (si < 0) P.push(...before); else P.splice(si, 0, ...before);
  return P; };
/* ---- the Fourth's page: its road (S.f.b10_fourthRoad; B10_ENDW's titles), its sergeant and its soldiers in one page ---- */
B107FIN.fourth = () => { const f = b107F(), r = b10FourthRoad() || 'host', W = B10_ENDW.f[r] || B10_ENDW.f.host, k = b107Key() || 'colours', sth = b107South();
  const mates = b107FMates().map(NAME), camp = b107FCamp().map(NAME), dead = b107FDead().map(NAME);
  return {title:W[0], paras:[W[1],
    `${f.name ? `Sergeant ${esc(f.name)}'s Fourth` : 'The Fourth'}: ${mates.length ? b107And(mates) : 'the sergeant, and nobody else'}${camp.length ? `, and ${b107And(camp)} with the baggage` : ''}. Out of Darujhistan on a lake boat, a ship, Aren, the old Host taking it back as veterans; a keep, a pass, a ridge. ${sth ? 'It came over the ridge on the regulars\' field, and found the Third at the barrows after.' : 'It came over the ridge with the Host onto the Third\'s stretch, at the very end of the line, because it was the first stretch it saw that looked as if it needed somebody.'}`,
    dead.length ? `${b107And(dead)} did not come out of Darujhistan with it. The Fourth says the names at night. It always has.` : '',
    r === 'third' ? (k === 'kolanse' ? 'It stays in Kolanse with the Third, and digs.' : k === 'home' ? 'It goes down to the coast with the Third, and onto the same ship, and argues all the way about whose home.' : 'It stays with the colours, beside the Third.') : r === 'home' ? 'It goes home to Darujhistan, to a door and a mended rent jar and bread at the price it is.' : 'It goes back to the Host, which goes where it goes.',
    `${f.name ? `Sergeant ${esc(f.name)}` : 'Its sergeant'} asked another sergeant what to do, once, at the barrows, which the Fourth had never seen happen, and listened to the answer.`].filter(Boolean)}; };
/* ---- where the books meet ---- */
B107FIN.meet = () => [
`Book Ten ran beside *The Crippled God*, the last of the ten, after Book Nine. The Third came into it from Book Nine's road ${b107South() ? 'south with the Letherii' : 'east behind the Adjunct'}; the Sixth Company from Book Nine's road ${b10LRoad() === 'adjunct' ? 'east with the foreigners' : 'with the Commander\'s brigades'}. Book Eight's Fourth came last of all, from a lake shore in Darujhistan, by way of Aren and a ridge.`,
`The Third and the Sixth have marched beside each other since Letheras, in the same army or the same column or the same battle, a few stretches apart, and never stood on one stretch. In Book Six the Fourth and the Third shared a book and never met. In this one they did, at the very end of it.`,
`Ten books, one beside each novel, in order. The roads end here, in Kolanse, at the edge of the barrows. Whatever comes after, for whoever went, nobody wrote it down. Nearly nobody.`];

/* ---- the finale for three squads (Book Ten only, guarded by b10On): 037's pages for the Third; then, through B10FIN.extra (180 puts them in
   before 037's end page), the Sixth's road and a page per Letherii soldier, the Fourth's page, and Where the books meet. The extra kinds
   (b107…) are drawn here in 037's shape; 180's wrapper draws the coda's (b10c…). Book Nine's 167 did the same for b9On(). ---- */
B10FIN.extra = () => { if (!b10On()) return []; const add = [];
  try { if (B107FIN.lethHalf()) { add.push({k:'b107road'}); B107FIN.lethPages().forEach(pg => add.push({k:'b107leth', id:pg.id, pg})); } } catch(e) { console.warn('finale', e); }
  add.push({k:'b107fourth'}, {k:'b107meet'}); return add; };
{ const _sf = showFinale;
  const mine = k => /^b107/.test(k);
  /* the Letherii sergeant's portrait: painted once in Book Five's look (S.thread 'l'), then lent to 19's cache for each frame */
  let b107SgtL = null;
  const sgtLLayer = () => { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, was = S.thread;
    try { b10SgtFor('l'); S.thread = 'l'; PORTRAIT_CACHE.delete(key); const cv = document.createElement('canvas'); cv.width = 400; cv.height = 520; drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, 0); b107SgtL = PORTRAIT_CACHE.get(key) || null; PORTRAIT_CACHE.delete(key); }
    catch(e) { b107SgtL = null; }
    finally { S.thread = was; b10SgtFor(b10Thread()); } return key; };
  showFinale = function(i = 0){ if (!b10On()) return _sf(i);
    const P = finPages(); i = clamp(i | 0, 0, P.length - 1); const pg = P[i]; if (!pg || !mine(pg.k)) return _sf(i);
    S.scene = 'finale'; S.finPage = i; S.node = null; save();
    view = 'finale'; $('#sheet').hidden = true; B = null; titleAnim = null; finAnim = null; AUDIO.setScene('end');
    let body = '';
    if (pg.k === 'b107road') { const R = B107FIN.lethRoad(); G.sceneKind = 'b10_c7_sixth';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">The Sixth Company</div><h1 class="fin-title">${esc(R.title)}</h1><div class="narr">${R.paras.map(p => fmt(p)).join('')}</div>`; }
    else if (pg.k === 'b107fourth') { const R = B107FIN.fourth(); G.sceneKind = 'b10_c7_fourth';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">The Fourth</div><h1 class="fin-title">${esc(R.title)}</h1><div class="narr">${R.paras.map(p => fmt(p)).join('')}</div>`; }
    else if (pg.k === 'b107meet') { G.sceneKind = 'b10_barrows';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">Where the books meet</div><h1 class="fin-title">At the barrows</h1><div class="narr">${B107FIN.meet().map(p => fmt(p)).join('')}</div>${typeof worldSVG === 'function' ? `<div class="gloss meet">${(() => { try { return worldSVG(); } catch(e) { return ''; } })()}</div>` : ''}`; }
    else { const L = pg.pg || {}, id = pg.id, sgt = id === 'sgt', gone = L.k === 'gone', h = B107FIN.lethHalf() || {};
      const nm = sgt ? (L.name || h.name || 'The sergeant') : (TPL[id] ? TPL[id].name : id), role = sgt ? 'Sergeant · Sixth Company, the Whitefinder Battalion' : (TPL[id] ? TPL[id].role : '');
      const where = gone && h.dead && h.dead[id] ? [h.dead[id].where, h.dead[id].from ? '' : (h.dead[id].ch ? `Chapter ${h.dead[id].ch}` : '')].filter(Boolean).join(' · ') : '';
      if (sgt) sgtLLayer();
      body = `<div class="fin-k">${sgt ? 'The Sixth\'s sergeant' : gone ? 'The Sixth · the fallen' : L.label === 'Waiting' ? 'The Sixth · waiting' : 'The Sixth'}</div>
      <div class="fin-card"><div class="fin-por ${gone ? 'gone' : ''}"><canvas id="fpc" width="400" height="520" aria-hidden="true"></canvas>${gone ? '<span class="fin-mark">†</span>' : ''}</div>
        <div class="fin-who"><h2>${esc(nm)}</h2><div class="r">${esc(role)}</div>${sgt ? '' : gone ? (where ? `<div class="pips">${esc(where)}</div>` : '') : `<div class="pips">${loyLabel(L.loy || 0)}</div>`}</div></div>
      <h3 class="fin-h">${esc(L.title || '')}</h3><div class="narr fin-txt">${fmt(L.txt || '')}</div>`;
      finAnim = t => { const cv = $('#fpc'); if (!cv) { finAnim = null; return; }
        if (sgt && b107SgtL) { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, own = PORTRAIT_CACHE.get(key); PORTRAIT_CACHE.set(key, b107SgtL); try { drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, t); } finally { if (own) PORTRAIT_CACHE.set(key, own); else PORTRAIT_CACHE.delete(key); } }
        else drawPortrait(cv.getContext('2d'), id, 400, 520, t); }; }
    const last = i === P.length - 1;
    toTop(); $('#app').innerHTML = `<div class="fin" id="fin">${body}
    <div class="fin-nav ${last ? 'last' : ''}"><button class="btn" id="fBack">Back</button><span class="fin-pg">${i + 1} / ${P.length}</span>${last ? `<button class="btn" id="fSq">The squad</button><button class="btn primary" id="fTitle">Title</button>` : `<button class="btn primary" id="fNext">Next</button>`}</div></div>`;
    window.scrollTo(0, 0);
    $('#fBack').onclick = () => { AUDIO.play('click'); finGo(-1); };
    if (last) { $('#fSq').onclick = () => { AUDIO.play('click'); openChars(0); }; $('#fTitle').onclick = () => { AUDIO.play('click'); showTitle(); }; }
    else $('#fNext').onclick = () => { AUDIO.play('click'); finGo(1); };
    let sx = null, sy = null; const el = $('#fin'); el.ontouchstart = e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    el.ontouchend = e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) { AUDIO.play('flip'); finGo(dx < 0 ? 1 : -1); } }; }; }
