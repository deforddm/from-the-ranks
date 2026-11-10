/* ============ Book Ten, Chapter 1: Missing Is Not Dead (the Third) ============ */
/* The Third, with the Bonehunters' heavies, in the retreat camp after the short-tails (tcg-canon chapter table, Ch 1; WC3, WC7). Burying
   and counting; the allies' columns coming in (the Grey Helms, the Bolkando, the Khundryl who are left: seen, never met); news, never a
   scene: "the Adjunct is on her feet", and at dusk "two of the missing walked back in, with a handful of the dead Imass" (the mage and the
   captain who went in alone; never named; Book Nine's "missing is not dead" comes true). The officers' parley is lamps in a big tent, seen
   from the fires; after it, camp word: east into the glass, the Letherii and the rest south ("she means to free the chained god", once).
   Phase 1 (S.f.b10_c1_ph), day: the burial lines (the first halt: the clerk's slate folds Pruss into the Third, b10Join('pruss'); the
   upturned water barrel and the reading, B10READ[1]; the sappers' spade cart; the heavies' sergeant calling the roll over a trench, the trick,
   Every Name; the field-strippers at the edge of the burial ground, b10_c1_strippers, main, stage 2, the Third's first fight) and the camp
   (Thallo, not eating now; the heavies' captain seen; the old marine; the surgeons' long tents; the rise where the allies come in; the
   heavies sparring, b10_c1_spar, optional; the fire). Phase 2, night: the lamps in the big tent, the camp word (the chapter's one Witness
   "yes, but"), and the key from Thallo, S.f.b10_c1_key: 'names' (stand the last burial lines tonight and say every name; robbers at the
   trenches, b10_c1_graves; b10Witness(1, 'every name said'); Haddat and Marrow +1; S.f.b10_c1_names) or 'water' (the water detail at the
   sappers' wells all night, every skin and barrel for the crossing; Tangle and Pruss +1; S.f.b10_c1_water). Phase 3, after: the fire and the
   Witness beat (c1: "Why are we still here?"), then at dusk the first night march to the glass's edge ('adjunct') or across the camp to
   the Letherii wagons ('south': a few heavies lent to the Commander's column as drill-sergeants). No thirst in this chapter (the brief).
   Never: the Adjunct's tent, Deadsmell, the captain made of the sergeant on the hill, the grieving sapper, anyone walking in seen, the
   parley's words, the Unbound's rider, the allies' offers, the High Mage (still "missing"), the assassin. Notes: docs/tcg-ch1-notes.md. */
/* FOR THE ARTIST (181b): names this file uses.
   Items: ART['item/b10_c1_scale'], ['item/b10_c1_spade'], ['item/b10_c1_slate'].
   Figures: pruss (180's simple sprite, replaced in 181b), b9_c1_thallo (161b's Thallo), b2soldier (the clerks, the old marine, the heavies'
   captain, the heavies' sergeant, the sappers, the surgeon, the sparring heavies), b6_bandit (the strippers, the robbers).
   Backdrops: b10_camp, b10_camp_night, b10_burial (180's, yours), and two this file adds: b10_c1_linesn (the burial lines at night, a lamp at
   the clerk's table) and b10_c1_wells (the sappers' wells in a dry wash at night, a chain of hands, barrels on a flat wagon).
   Ground (TILEX): b10_c1_camp (on Book Nine's wastes ground: '=' a burial trench, 'u' a spoil heap, 'k' a clerk's trestle, 'B' the
   upturned water barrel, 'L' a surgeons' long tent, 'P' the officers' big tent, 'O' a sappers' well). Battle 't' is low cover. */

/* ---- small helpers (b101: Book Ten, Chapter One) ---- */
const b101L = (id, n) => { if (b10In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b101Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b10In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b101If = (id, s) => b10In(id) ? (typeof s === 'function' ? s() : s) : '';
const b101Who = () => (ROLL() && ROLL().who) || 'sgt';
const b101Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b101Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b101V = (id, you, they) => id === 'sgt' ? you : they;
const b101And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b101Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the day (the burial lines and the camp), 2 the night of the lamps (before the key), 3 the night after the key */
const b101Ph = () => S.f.b10_c1_ph || 1;
const b101Key = () => S.f.b10_c1_key || null;
const b101Names = () => S.f.b10_c1_key === 'names';
const b101South = () => b10TRoad() === 'south';
const b101Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b10In(id));
const b101PrussSettled = () => S.f.b10_prussDone != null;
const b101DayDone = () => !!S.f.b10_c1_stripDone && !!S.f.b10_c1_news;
const b101NightDone = () => b101Names() ? !!S.f.b10_c1_named : !!S.f.b10_c1_waterDone;
const b101Night = () => b101Ph() >= 2;

/* ---- Every Name: the heavies' way of calling the roll over a grave, every name answered by the soldier beside, the living answering for
   the dead and then for themselves. It copies the Khundryl Paint (b2_paint): a call that steadies the bearer's neighbours and checks the
   enemy close by. Not sorcery. v10.3: it strikes nobody, so it is free. ---- */
Object.assign(TRICKS, {
  b10_c1_roll:{name:'Every Name', ch:1, use:'fight', ab:'t_b10_c1_roll', where:'the burial lines in the camp after the short-tails, from a sergeant of the heavies',
    lore:'The heavies call the roll over a trench before the earth goes in: every name of the squad that is in it, and for each one the soldier beside answers "here", because somebody has to. Then the names of the living, and each answers for themselves. The old hands say the dead hear the first half and the living need the second. In a fight, the bearer calls the squad\'s names the same way, and every soldier within reach of a shoulder answers, and the line remembers it is a line.',
    get fx(){ return `Once a fight: the bearer calls the roll, and the squad beside them answers. The bearer and squadmates next to them are +2 to hit until the bearer's next turn; enemies within 2 of the bearer are −3 to hit this round, and ${lvT() >= 2 ? 'the nearest of them loses its nerve for a turn' : 'falter'}. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b10_c1_roll:{name:TRICKS.b10_c1_roll.name, trick:'b10_c1_roll', self:true, free:true, desc:()=>TRICKS.b10_c1_roll.fx,
    run(u){ AUDIO.play('sword'); shakeMap();
      const us = party().filter(p => !p.ally && cheb(p, u) <= 1), them = foes().filter(f => cheb(f, u) <= 2);
      us.forEach(p => { p.rallyUntil = Math.max(p.rallyUntil || 0, B.round + 1); float(p, 'here', '#cfd8e8'); sparks(p.x, p.y, 6, '#cfd8e8', .4); });
      them.forEach(f => { f.dazzleUntil = Math.max(f.dazzleUntil || 0, B.round); float(f, 'falters', '#cfc8b8'); });
      const near = lvT() >= 2 && them.sort((a, b) => cheb(a, u) - cheb(b, u))[0]; if (near) { near.slowTurn = true; }
      blog(`${u.name} calls the roll the heavies' way, name after name, not loud. ${us.length > 1 ? `${us.filter(p => p !== u).map(p => p.name).join(' and ')} answer${us.length > 2 ? '' : 's'} "here", and close${us.length > 2 ? '' : 's'} up.` : 'There is nobody beside to answer. The names go out anyway.'} ${them.length ? 'The nearest of the enemy hesitate, as if more voices had answered than there are soldiers.' : ''}`); }},
});

/* ---- the reading at the burial lines (B10READ[1], 180c's worked example, kept for the night; by day the barrel stands in the sun) ---- */
{ const night = B10READ[1];
  B10READ[1] = {where:night.where, back:night.back, backT:night.backT, say:night.say,
    get scene(){ return S && S.f && b101Night() ? 'b10_c1_linesn' : 'b10_burial'; },
    get set(){ return S && S.f && b101Night() ? night.set : 'Afternoon at the burial lines, the spades stopped for a mouthful, a barrel turned over for a table, and the allies\' dust coming up on the horizon.'; }}; }

/* ---- borrowed pictures until the artist's file (181b) replaces them: two scenes, three items ---- */
{ const like = {b10_c1_linesn:'b10_camp_night', b10_c1_wells:'b10_camp_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b10_c1_camp ??= (...a) => (TILEX.b9_c4_wastes || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b10_c1_scale', 'b9_c1_heavyscale'], ['b10_c1_spade', 'b9_c1_gutterknife'], ['b10_c1_slate', 'b9_c1_messtin']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Ten's glossary ---- */
GLOSSX.tcg.push(
  [1, 'The burial lines', 'Long trenches dug in rows at the edge of the camp after the short-tails, a clerk with a slate at each. Every name is written before the earth goes in. The heavies call a roll over theirs.', ()=>!!(S && S.f && S.f.b10_c1_ph)],
  [1, 'Field-strippers', 'Camp followers and worse who come in after a battle for the boots and buckles of the dead. The army has always had them. It has never liked them.', ()=>!!(S && S.f && S.f.b10_c1_stripDone)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[1] = ['b10_c1_fire'];

/* ---- the squad at the fire: a line by day and a line by night for every soldier the Third can field ---- */
const B101TALK = {
  haddat:[()=>`Haddat has been at the trenches since first light, and has the dirt to show it. "My mother said you bury the dead facing home," she says. "I asked the clerk which way home is from here." She wipes her hands. "He did not know either."`,
          ()=>`Haddat says the names at the fire, the long list, and the new ones at the end of it take longer than the old ones. "I do not know all of them," she says. "I say the company's. The company will know which ones are which."`],
  sathi:[()=>`Sathi is sitting on a spoil heap with her filed teeth showing, watching the allies come in. "Grey knights," she says. "Very clean. I could get a lot for that armour, in the right town."`,
         ()=>`Sathi is lying on her back looking at the stars. "The Weasels buried their dead in the wind," she says. "On a high place. Let the birds have them." She considers the trenches. "Here there are no birds. I have looked."`],
  tangle:[()=>`Tangle has the satchel open in his lap. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}. Everything else went on the stretch." He shuts it. "There's no more being issued. I asked. The quartermaster laughed."`,
          ()=>`Tangle has his Kanese bead between finger and thumb, turning it. "I keep counting the squad instead of the satchel," he says. "Gets the same answer every time. I keep doing it anyway."`],
  marrow:[()=>`Marrow is sitting in the sun with her eyes shut and her knotted string in her lap. "Missing is not dead, child," she says, to nobody in particular. "I said it on the trail. I will say it until somebody tells me otherwise with their own mouth."`,
          ()=>`Marrow has her hands open on her knees. "Two of them walked back in," she says. "I said so." She is not smug about it. She is very tired. "Soliel keeps her door a little open tonight. I can feel the draught."`],
  mirrel:[()=>`Mirrel has been in the long tents since dawn and has come out for water. "The surgeons are good," she says. "There are not enough of them, and there is not enough water to wash with." She drinks half a mouthful, and caps the skin.`,
          ()=>`Mirrel is doing the squad's feet by the fire, one pair after another. "Wherever we go next," she says, "we walk there." She binds a heel. "Feet first. Always feet first."`],
  doss:[()=>`Doss has his sleeves rolled up from the trenches. "On the holding we dug for the factor's dead and our own," he says. "Ours went in quicker. Less to write down." He looks at the clerks with their slates. "This lot write everybody down. I don't know if that's better."`,
        ()=>`Doss is eating slowly, to make it last. "The Letherii are going south, they say," he says. "Home's south and west of south." He chews. "Not that way, though. Further."`],
  wenna:[()=>`Wenna has been out past the lines with the sappers looking for water, and has found some. "There's water under this," she says. "Deep, and slow, and not much of it. The sappers knew where to dig. I didn't think Malazans could hear ground."`,
         ()=>`Wenna has her ear to the earth by the fire. "Quiet," she says. "East is very quiet." She sits up. "The Shore's quiet too. I don't like the Shore quiet."`],
  mehet:[()=>`Mehet is turning his ring of keys over. "Clerks have locked boxes," he says. "For the slates. Every box is a lock." He does not try any of them. "Some boxes you leave shut."`,
         ()=>`Mehet is watching the big tent's lamps across the camp. "In Y'Ghatan," he says, "when the officers sat late, the street knew the answer by morning, and it was always worse than the question." He shrugs. "I'll wait for morning."`],
  ottar:[()=>`Ottar has been on the rise watching the grey knights come in, and has come back quiet. "Today's word," he says at last, "is <em>column</em>. Theirs is very straight." He looks at his own grey plate. "I used to march in one. It is easier to be straight with nobody dead in it."`,
         ()=>`Ottar is cleaning the grey plate in the firelight. "Today's word," he says, "is <em>parley</em>." He tries it. "A word for officers. It means everybody talks and the soldiers hear about it afterwards." He nods. "A good word. Precise."`],
  tallow:[()=>`Tallow has his grandmother's deck in its oilcloth, and is not opening it. "She said never read over the dead," he says. "They hear the cards. They want to know their own." He puts it away. "Later."`,
          ()=>`Tallow is turning one card over and over on his knee without looking at it. "Grandmother would have known what's said in that tent before they came out," he says. "I just know my feet hurt." He puts the card back. "That's a reading too."`],
  hessa:[()=>`Hessa is leaning on her spear at the trench's end. "D'rek takes the dead in the end," she says. "Down into the earth. Slowly." She looks at the dry ground. "This earth is very slow. She will be patient."`,
         ()=>`Hessa sits straight with the spear across her knees. "I prayed for them," she says, of the trenches. "D'rek did not say anything back. She is listening. That is different."`],
  tebbet:[()=>`Tebbet is re-fletching arrows from a bundle the quartermaster did not quite give him. "The heavies don't use them," he says. "They should. You can't hit a short-tail with a sword from far enough away to be happy about it."`,
          ()=>`Tebbet has his bow across his knees, unstrung. "No wind tonight," he says. "Good shooting. Nothing to shoot." He seems content with that, for once.`],
  darrut:[()=>`Darrut has his helm off on his knee. "The Aren Guard buried its own in the old cemetery by the gate," he says. "Stones with the names cut in. Here it's chalk on a slate." He looks at the clerks. "Chalk is honest. It knows it won't last."`,
          ()=>`Darrut is watching the allies' fires on the horizon. "Grey knights, Bolkando, horse-folk," he says. "In Aren we would have called that an army." He looks at the camp. "Here we call it the allies, as if we were the main thing."`],
  yorin:[()=>`Yorin has his copper wind-vane out. It points east, and will not be talked out of it. "Serc has an opinion," he says. "I'd rather it kept it to itself."`,
         ()=>`Yorin's wind-vane is lying flat on his palm, still. "No wind at all," he says. "The first night there hasn't been." He does not put it away. "I'll watch it anyway."`],
  rasp:[()=>`Rasp has been down at the sappers' wells and come back with an opinion. "They're digging it right," she says. "Shored and stepped. Marine sappers' way." She sounds almost proud of somebody else. "Wells are just tunnels that went the wrong way and found something."`,
        ()=>`Rasp is checking the squad's munitions by the fire, one by one, by feel. "Less than I'd like," she says. "Less than anybody'd like." She closes the satchel. "Whatever's said in that tent, it'll be said to people with almost nothing left to throw."`],
  orvas:[()=>`Orvas has been on the rise too, watching the horse-folk come in. "My people," he says. "What is left of them." He is quiet a while. "Fewer horses than there were. Fewer riders than horses. That is how you know."`,
         ()=>`Orvas is watching the Khundryl fires on the horizon. "The old women will be keening tonight," he says. "You will not hear it from here." He listens anyway. "I hear it."`],
  redblade:[()=>`Ramin has his scale off and is scraping the dust out of it. "The Red Blades buried their own with their swords," he says. "Here the quartermaster takes the swords back." He shrugs. "The Red Blades are gone. The quartermaster isn't."`,
            ()=>`Ramin is sitting with his back to a wagon wheel, watching the lamps. "Officers," he says. "Talking." He means it kindly. "It has to be done. I'm glad it isn't me doing it."`],
  warlock:[()=>`Keth is eating, and the grandmother is quiet. Then: "*Trenches,*" she says out of his mouth. "*In my day we burned them. Smoke goes somewhere. Earth just waits.*" Keth swallows. "Sorry."`,
           ()=>`Keth sits close to the fire. "*Lamps in a tent,*" the grandmother says, out of his mouth. "*Somebody is deciding something, boy. Stay away from that tent.*" Keth nods. "She's said that before. About a different tent."`],
  brask:[()=>`Brask has his tally-stick out and is filing a new notch flat, slowly, with his thumbnail. "One from the stretch," he says. He puts it away. "Rest of you are still on it. Good."`,
         ()=>`Brask is sharpening the heavy sword, though there is nothing left to use it on tonight. "Old squad dug for the 9th at the river," he says. "This is bigger." He tests the edge. "Digging's the same."`],
  tegra:[()=>`Tegra has been out past the lines, listening to the ground with her palm flat on it. "There is water," she says. "Not much. The sappers found it. Good sappers." She wipes her hand on her leg. "East of here, I do not think there is any."`,
         ()=>`Tegra is watching the stars come out over the east. "My people say the dead walk east," she says. "Toward the light." She looks at the dark. "Then the dead are going where we are going. That is either good or very bad."`],
  pruss:[()=>`Pruss is sitting a little apart with his old sergeant's helm on his knee, turning it. "Sergeant said the beasts always die first," he says. "Then the carters. Then the soldiers." He sets the helm down. "Got that wrong, didn't he. Went soldiers first, this time."`,
         ()=>`Pruss has his boots off and his feet to the fire. "My da could hear a cracked axle at a hundred paces," he says. "I keep listening to the wagons." He shakes his head. "They're all sound. It's the beasts that sound wrong. Thin."`],
};

const B10CH1 = {
  title:B10CH[1], number:'One',
  intro:{loc:'The Wastes\' edge', sub:'The camp after the short-tails · the burial lines', scene:'b10_burial', cap:'Long trenches in the dry ground, spades going, spoil heaps in rows, a clerk with a slate at each trench, and far off on the horizon the dust of the allies\' columns coming in.',
    paras:[
`The camp after the short-tails. There is no better name for it yet. Tents in their rows, with gaps in the rows where there were tents. The long tents of the surgeons, full. And at the camp's edge, the burial lines: trenches dug long and straight in the dry ground, because the army does everything in lines, even this.`,
()=>{ const v = b101Mates().map(id => NAME(id)), gone = Object.keys(S.dead || {}).filter(id => TPL[id]), rl = b10RationLine();
  return `You are Sergeant {sgt}, Third squad, with the heavies. ${v.length ? `${b101And(v)} ${v.length > 1 ? 'are' : 'is'} the Third, still.` : 'The Third, still, is you.'}${gone.length ? ` The rest are names ${b10In('haddat') ? 'Haddat says at night' : 'the squad says at night'}.` : ''}${rl ? ' ' + rl : ''}`; },
`The Third is on the burial detail today. Some squad has to be. The clerks are writing every name down before the earth goes in, and the earth is slow.`],
    go:'To the burial lines', node:'b10_c1_start'},

  areas:[
    /* 16 x 12 (b10_c1_camp, day). The burial lines. . dry ground  # scrub  = a trench  u a spoil heap  k a clerk's trestle  B the upturned
       water barrel  c the sappers' spade cart  < back to the camp  X the edge of the burial ground (the strippers) */
    { id:'b10_c1_lines', title:'The Wastes\' edge · the burial lines', sub:'Day · spades going', hint:'Tap ground to move · tap a figure to talk · the camp is west, the burial ground\'s edge east', decor:'b10_c1_camp',
      map:[ "################",
            "#..u===u.u===u.#",
            "#..k.......k...#",
            "#..............#",
            "#.u===u..u===u.#",
            "<......B.......X",
            "#..............#",
            "#.u===u..u===..#",
            "#............c.#",
            "#.....k........#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{B:'b10_c1_barrel', k:'b10_c1_table', c:'b10_c1_spadecart', '<':'b10_c1_tocamp', X:'b10_c1_edge'}, start:{x:1, y:5},
      quest:()=> !b101PrussSettled() ? 'The clerk at the first trench. There is a heavy waiting by him with his kit.' : !S.f.b10_c1_orders ? 'Thallo, by the trenches. He has the captain\'s word.' : !S.f.b10_c1_stripDone ? 'The edge of the burial ground, east. Strippers.' : !S.f.b10_c1_news ? 'Back to the camp. Thallo has gone to find the captain.' : 'The camp, and the fire. The light is going.',
      npcs:[
        {id:'clerk', name:'A clerk with a slate', kind:'b2soldier', x:4, y:3, node:()=>'b10_c1_clerk', fresh:()=>!S.f.b10_c1_clerk},
        {id:'pruss', name:'A heavy with his kit', kind:'pruss', x:5, y:2, node:()=>'b10_c1_pruss', show:()=>!!S.f.b10_c1_clerk && (S.f.b10_prussDone == null || S.f.b10_prussDone === 2), fresh:()=>S.f.b10_prussDone == null},
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:8, y:6, node:()=>'b10_c1_thallo', show:()=>!S.f.b10_c1_stripDone, fresh:()=>!S.f.b10_c1_orders},
        {id:'sergeant', name:'A sergeant of the heavies', kind:'b2soldier', x:11, y:3, node:()=>'b10_c1_roll', fresh:()=>!S.f.b10_c1_rollTried} ] },

    /* 16 x 12 (b10_c1_camp, day). The camp. T tents  L the surgeons' long tents  w wagons  o water barrels  F the Third's fire  r the rise at
       the camp's edge (the allies coming in)  > to the burial lines */
    { id:'b10_c1_camp', title:'The Wastes\' edge · the camp', sub:'Day · gaps in the rows', hint:'Tap ground to move · tap a figure to talk · the burial lines are east, the rise north-east', decor:'b10_c1_camp',
      map:[ "################",
            "#.T..T..L..L...#",
            "#.............r#",
            "#..T...........#",
            "#.....w...o....#",
            "#.......F......>",
            "#..T...........#",
            "#........w..T..#",
            "#.T............#",
            "#.....T....o...#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b10_c1_fire', L:'b10_c1_longtent', r:'b10_c1_rise', '>':'b10_c1_tolines'}, start:{x:14, y:5},
      quest:()=> !S.f.b10_c1_stripDone ? 'The burial lines, east. The Third is on the detail.' : !S.f.b10_c1_news ? 'Thallo, by the heavies\' wagons. He has been to the captain.' : 'The fire. The light is going.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:7, y:3, node:()=>'b10_c1_thallo_news', show:()=>!!S.f.b10_c1_stripDone, fresh:()=>!S.f.b10_c1_news},
        {id:'captain', name:'The heavies\' captain', kind:'b2soldier', x:5, y:2, node:()=>'b10_c1_captain', fresh:()=>!S.f.b10_c1_captain},
        {id:'old', name:'An old marine by the cook-wagon', kind:'b2soldier', x:12, y:8, node:()=>'b10_c1_oldmarine', fresh:()=>!S.f.b10_c1_old},
        {id:'spar', name:'Heavies sparring', kind:'b2soldier', x:4, y:7, node:()=>'b10_c1_spar', fresh:()=>!S.f.b10_c1_sparDone} ] },

    /* 16 x 12 (b10_c1_camp, night). The camp by night: the burial lines west, the sappers' wells east, the big tent north. = trenches
       u spoil heaps  k the clerk's trestle at the lines  P the officers' tent, lit  O the wells  T tents  o barrels  w a wagon  F the fire
       > east: the march */
    { id:'b10_c1_night', title:'The Wastes\' edge · the camp', sub:'Night · lamps in the big tent', hint:'Tap ground to move · tap a figure to talk · the burial lines are west, the wells east, the big tent north', decor:'b10_c1_camp', dark:true,
      map:[ "################",
            "#u===u...PP....#",
            "#..........T...#",
            "#u===u.........#",
            "#..k......o..O.#",
            "#u===u..F....O.>",
            "#..............#",
            "#u===u....T..o.#",
            "#..............#",
            "#.T....w.......#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b10_c1_fire', P:'b10_c1_tent', O:'b10_c1_wells', k:'b10_c1_nightlines', '>':'b10_c1_east'}, start:{x:8, y:6},
      quest:()=> b101Ph() === 2 ? (!S.f.b10_c1_word ? 'The big tent\'s lamps, north. The officers are sitting late.' : 'Thallo, at the fire. He has the captain\'s word for the night.')
        : b101Names() ? (!S.f.b10_c1_gravesDone ? 'The burial lines, west. Shapes among the trenches.' : !S.f.b10_c1_named ? 'The clerk\'s trestle at the lines. The names.' : 'The fire. Then east, at dusk.')
        : (!S.f.b10_c1_waterDone ? 'The wells, east. The water detail.' : 'The fire. Then east, at dusk.'),
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:7, y:4, node:()=>'b10_c1_thallo_night', fresh:()=>b101Ph() === 2 && !!S.f.b10_c1_word},
        {id:'old', name:'The old marine', kind:'b2soldier', x:4, y:9, node:()=>'b10_c1_oldmarine', fresh:()=>false},
        {id:'robbers', name:'Shapes among the trenches', kind:'b6_bandit', x:3, y:2, node:()=>'b10_c1_nightlines', show:()=>b101Ph() === 3 && b101Names() && !S.f.b10_c1_gravesDone, fresh:()=>true} ] } ],

  battles:{
    /* the field-strippers at the edge of the burial ground: the Third's first fight (near certain), two grounds: the open edge, then the
       strippers' camp in a dry wash behind it */
    b10_c1_strippers:{title:'The edge of the burial ground', style:'b10_c1_camp', warrenText:'Day at the Wastes\' edge · dust, spoil heaps, the smell of the trenches · the warrens thin and tired', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t..t..","........","#......#","........","...t....","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b10_regular',1,8]],
      foes:[['b10_scav',2,1],['b10_scav',5,1],['b10_scav',4,2],['b10_scavbow',3,0]], xp:380, after:'b10_c1_strippers_after',
      preText:()=>`They straighten up from what they were doing when they see the shields, and drop what they were holding, boots mostly, and pick up what they came with instead. Knives, and a sling, and the look of people who thought nobody would be watching this end of the lines.`,
      stage2:{title:'The wash behind', xp:170,
        text:()=>`The edge is the Third's. Behind it a dry wash runs down toward the plain, and in it the strippers have a camp: a handcart full of boots, a pile of buckles, and a broad man with a heavy's sword he did not earn, telling the ones who ran to come back and finish it.${b101If('pruss', `\n\nPruss looks at the handcart for a moment. Then he goes down into the wash first, sideways, with his shield up. "That's a heavy's sword," he says. "He'll want to put it down."`)}`,
        map:["#......#","..t..t..","........","........","...tt...","........",".t....t.","........","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b10_scavchief',3,1],['b10_scav',5,2]]} },
    /* on 'names': robbers at the burial lines by night, after the boots of the last trench before the earth goes in */
    b10_c1_graves:{title:'The burial lines by night', style:'b10_c1_camp', dark:true, warrenText:'Night at the burial lines · a clerk\'s lamp, the open trenches · the warrens quiet', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t..t..","........","...tt...","........","........",".t....t.","........","........","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b10_scav',2,0],['b10_scav',5,0],['b10_scavbow',4,2]], xp:100, after:'b10_c1_graves_after',
      preText:()=>`Three of them, down in the last open trench with a shuttered lamp, working fast. They had the same idea as the ones by day, and later. They come up out of the trench with the knives they brought for buckles.`},
    /* the heavies sparring behind the wagons: optional, a survive fight with wooden swords; death checks still run (the engine's rule) */
    b10_c1_spar:{title:'The heavies\' square', style:'b10_c1_camp', warrenText:'Afternoon behind the heavies\' wagons · a ring of watching heavies · warrens thin', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold four rounds against the sparring heavies. Wooden swords. They still hurt.'},
      map:["........","........","..t..t..","........","........","........","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_c1_sparrer',2,1],['b10_c1_sparrer',5,1],['b10_c1_sparrer',4,2]], xp:120, after:'b10_c1_spar_after',
      waves:[{round:2, foes:[['b10_c1_sparrer',1,0],['b10_c1_sparrer',6,0]], text:'The heavies\' sergeant sends in the next file, which has been waiting its go and is impatient about it.'}],
      preText:()=>`The heavies come across the trodden ground at a walk with wooden swords and their real shields, the way heavies do everything, and no hurry in it at all. They are not trying to hurt anybody. They are trying to remember they can still stand in a line.`} },

  foes:{
    /* a sparring heavy behind the wagons: wooden sword, real shield, a heavy's patience */
    b10_c1_sparrer:{name:'Sparring heavy', sig:'h', kind:'b2soldier', hp:46, ac:16, atk:12, dmg:[1,4,2], rng:1, mv:4, init:1, verb:'cracks a wooden sword across'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b10_c1_scale:{name:'A stripped heavy\'s scale', slot:'armour', role:'mail', who:null, ac:3, hp:5,
      line:'A long shirt of Malazan heavy scale, rolled in a blanket in the strippers\' handcart, with the leather underneath still shaped to somebody else\'s shoulders. The clerks found no name for it. The quartermaster says the living wear what the dead leave, and the Third should stop looking at it like that and put it on.'},
    b10_c1_spade:{name:'A sapper\'s spade', slot:'weapon', role:'heavyweapon', who:null, atk:1, dmg:[1,10,4],
      line:'A short-handled sapper\'s spade with the blade filed to an edge along one side, the way sappers keep them for roots and anything else. A sapper at the burial lines handed it over because they have more spades than sappers now. It digs. It also does the other thing.'},
    b10_c1_slate:{name:'A clerk\'s slate of names', slot:'trinket', role:'any', who:null, hp:2, stat:{wits:1},
      line:'A slate in a wooden frame, chalked edge to edge in a clerk\'s small hand: one squad\'s names, copied into the rolls and then not wiped. The clerk could not make himself do it. Whoever carries it reads the names at a halt, and finds it easier afterwards to keep count of everything else.'} },

  scenes:{
    b10_c1_linesn:{loc:'The Wastes\' edge', sub:'The burial lines · night', cap:'Open trenches in rows under the stars, spoil heaps black beside them, and one clerk\'s lamp on a trestle at the end of the last line.', amb:'explore'},
    b10_c1_wells:{loc:'The Wastes\' edge', sub:'The sappers\' wells · night', cap:'A dry wash with timber-shored wells sunk in its bed, a chain of soldiers passing buckets up out of the dark, and barrels lashed on a flat wagon under a lamp.', amb:'explore'} },

  end:{
    names:['Every name said', 'In the camp after the short-tails the Third buried the army\'s dead in long lines, and cleared the strippers off the edge of the burial ground. The night the officers sat late in the big tent, the Third stood the last of the lines, put down the robbers who came for the boots, and said every name on the clerk\'s slate over the last trench before the earth went in. Two of the missing had walked back in. Nobody told the army why it was going east. It went anyway, at dusk, toward the glass.'],
    water:['Every skin filled', 'In the camp after the short-tails the Third buried the army\'s dead in long lines, and cleared the strippers off the edge of the burial ground. The night the officers sat late in the big tent, the Third stood in the chain at the sappers\' wells and passed buckets up out of the dark until every skin and barrel it could reach was full. Two of the missing had walked back in. The army was not told why it was going east. It went anyway, at dusk, toward the glass.'] },
  endScene:'b10_camp_night',
  endCap:()=> b101South() ? 'The camp at dusk, the column forming up to go east, and the Third walking the other way, across the camp to the Letherii wagons.' : b101Names() ? 'The burial lines at dusk, the last trench filled, and beyond them the column going east without a lamp.' : 'The water-wagons at dusk, every barrel full and lashed, rolling out east behind the column without a lamp.',
  tease:'Next: the Letherii. The parting at the glass\'s edge, the long way round to the south, and a train of thin horses that know more about the road than the officers do.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b10_c1_key === 'names') x.push(`The Third stood the last burial lines the night of the lamps${f.b10_c1_named ? ', and said every name before the earth went in' : ''}.`);
    if (f.b10_c1_key === 'water') x.push('The Third stood in the chain at the sappers\' wells all night, and every skin and barrel it could reach went east full.');
    if (f.b10_prussDone === 1) x.push(b10In('pruss') ? 'Pruss, a carter\'s son whose squad held a stretch of the rearguard without him, walks with the Third.' : 'Pruss, a heavy, walks with the Third.');
    if (f.b10_prussDone === 2) x.push('Pruss, a heavy whose squad is in the burial lines, waits at the heavies\' baggage, if the Third will have him.');
    if (f.b10_c1_rollOk) x.push('A sergeant of the heavies taught the Third to call the roll over a grave: every name.');
    if (f.b10_c1_stripDone) x.push('The strippers at the edge of the burial ground met the Third, and the dead kept their boots.');
    if (f.b10_c1_sparDone) x.push('The Third held its square against the heavies behind the wagons, wooden swords and all.');
    if (f.b10_c1_word === 'heard') x.push('The Third heard the camp word from a clerk at the tent\'s flap: east, into the glass.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b10_c1_named && 'Every name on the clerk\'s slate said over the last trench, and somebody answered for each one.',
    f.b10_c1_waterDone && 'A night at the sappers\' wells in the wash, in the chain, passing buckets up out of the dark.',
    f.b10_c1_word && 'Camp word after the lamps went out: east, into the glass. The Letherii and the rest go south. Nobody said why.',
    f.b10_c1_missing && 'Two of the missing walked back in at dusk, the mage and the captain who went in alone, with a handful of the dead Imass behind them.',
    f.b10_c1_news && 'The Adjunct is on her feet. That is all anybody knows, and everybody knows it.',
    f.b10_c1_allies && 'The allies came in: grey knights in very straight columns, the Bolkando with their banners, and the horse-folk, fewer than there were.',
    f.b10_c1_stripDone && 'Strippers at the edge of the burial ground, and a broad man with a heavy\'s sword he had not earned.',
    f.b10_prussDone != null && 'A clerk\'s slate folded a heavy named Pruss into the Third. His squad is in the burial lines. He was the one sent back for water.',
    'The Third, with the heavies, in the camp after the short-tails.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the burial lines by day (the first halt) ======== */
    b10_c1_start:()=>({sp:'The burial lines', scene:'b10_burial', fx:()=>{ S.f.b10_c1_ph = S.f.b10_c1_ph || 1; }, again:()=>'The burial lines, the spades going, a clerk at every trench.', txt:
`The trenches run in long lines toward the edge of the camp, each one as deep as a heavy is tall, and the spoil heaps beside them are already crusting in the sun. Spades go in and come out. There is not much talk. At the head of every trench there is a clerk with a slate and a stub of chalk, and nothing goes into the ground until the clerk has written it down.

Far off on the horizon to the south and west, there is dust. A lot of it, coming this way, slowly. The allies, the heavies say. The ones who were not here.

${b101Say({haddat:'Haddat has a spade in her hands and her shield on her back, because she will not put it down. "We dig," she says. "Then we say them. That is the order of it."', tangle:'Tangle is looking at the trenches with a sapper\'s eye. "Straight," he says. "Someone measured." He does not sound as if he approves or disapproves. He sounds tired.', _:'The Third stands at the first trench with the spades and looks at the line of them going away.'})}${b101If('marrow', `\n\nMarrow has sat down on a spoil heap. "Two of them are not in these, child," she says, to the trenches. "Not yet. I keep saying it. I will keep saying it."`)}

At the first trench, a clerk with a slate is looking at the Third the way clerks look at the next line on a list.`,
      ch:[{t:'The clerk with the slate.', go:'b10_c1_clerk'},
          b10ReadChoice(1),
          {t:'Walk the lines.', go:()=>startExplore()}]}),
    b10_c1_read:()=>b10ReadOffer(1),
    b10_c1_card:()=>b10ReadCard(1),

    /* the clerk's slate: Pruss (the first halt) */
    b10_c1_clerk:()=>({sp:'A clerk with a slate', scene:'b10_burial', fx:()=>{ S.f.b10_c1_clerk = 1; }, again:()=> b101PrussSettled() ? 'The clerk, at his trench, chalking.' : 'The clerk, with his slate, waiting.', txt: b101PrussSettled() ?
`The clerk is back at his trench with a fresh slate, writing. He looks up once when the Third goes past, and nods, the Third being on his list too.${b101If('pruss', ' He looks at Pruss a moment longer, and then back at the slate.')}` :
`He is one of the Adjunct's clerks, by his collar: a young man gone grey at the temples in the last little while, with chalk to the wrists and a slate in a wooden frame he has filled edge to edge.

"Third squad, with the heavies," he reads off a scrap of paper, not the slate. "Good. One transferred in." He tips his head at the trench behind him without looking at it. "His squad's in there. Held a stretch of the rearguard on the day. He was the one sent back for water when it broke." He wipes chalk off his thumb. "So he's the one left. The list says you."

A big heavy in patched scale is standing by the spoil heap with his kit on his back, and an old sergeant's helm tied to the pack by its strap, waiting to be told which end of the camp is his.`,
      ch: b101PrussSettled() ? [{t:'Back to the lines.', go:()=>startExplore()}] :
        [{t:'The heavy with the kit.', go:'b10_c1_pruss'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_pruss:()=>{ const d = S.f.b10_prussDone;
      if (d === 2) return {sp:'Pruss', scene:'b10_burial', txt:
`Pruss is sitting on his kit by the spoil heap, with the old sergeant's helm in his lap. He looks up when you come over, and waits.`,
        ch:[{t:'"Walk with us, Pruss."', fx:()=>{ b10Join('pruss'); }, go:'b10_c1_pruss_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A heavy with his kit', scene:'b10_burial', again:()=>'Pruss, by the spoil heap, waiting to be told where the weight goes.', txt:
`He is young for a heavy and built like the back end of a wagon, with a broad sunburned face and his hair cropped to the skull. The scale is patched at one side with somebody else's, a different colour. There is a strap across his chest that is not army issue: a trace-strap, the kind carters use, worn smooth.

"Pruss," he says. "Unta. Four years in the heavies." He looks the Third over, slowly. "My da hauled for the army at Unta. Said the beasts always die first." He looks at the trench. "I thought he meant oxen."

He hitches the pack. "Where do you want the weight carried, Sergeant?"`,
        ch:[{t:'"Walk with us, Pruss."', fx:()=>{ b10Join('pruss'); }, go:'b10_c1_pruss_join'},
            {t:'"Your squad. Tell me."', req:()=>!S.f.b10_c1_prussSquad, go:'b10_c1_pruss_squad'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c1_pruss_squad:()=>({sp:'Pruss', scene:'b10_burial', fx:()=>{ S.f.b10_c1_prussSquad = 1; }, txt:
`He unties the old helm from the pack and holds it by the strap. It is a sergeant's, with a crest-socket and no crest.

"Held a stretch by a dry wash," he says. "Short-tails came out of the dust at it about midday. Sergeant sent me back for water at the wagons, because I'm the one who can carry four skins and run." He turns the helm. "Came back with the water. Stretch was gone. Wash was full of them." He ties the helm back on. "Found this on the way out. Carried it. Don't know why."

He says six names, one after another, quickly, as if he had practised.${b101If('haddat', `\n\nHaddat is listening. "Say them again," she says. "Slower. I will say them with ours at night." He looks at her, and then he says them again, slower.`)}`,
      ch:[{t:'"Walk with us, Pruss."', fx:()=>{ b10Join('pruss'); }, go:'b10_c1_pruss_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_pruss_join:()=>({sp:'Pruss', scene:'b10_burial', txt:
`${b10In('pruss') ? `He nods, once, and puts his kit down at the Third's end of the trench, and picks up a spade without being asked.

"Which end of the line's mine?" he asks. He is told. "Good," he says. "Heavy end. Suits."${b101If('tangle', ` Tangle looks at the size of him and the patched scale, and moves the satchel to the far side, which from Tangle is a welcome.`)}` : `He nods, and shoulders the kit again. Six walk with the Third already, and a carter's son can count a load. "I'll be at the heavies' baggage," he says. "When there's room."`}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the clerk's trestle: the slate (once Pruss is settled) */
    b10_c1_table:()=>({sp:'A clerk\'s trestle', scene:'b10_burial', fx:()=>{ if (b101PrussSettled() && !S.f.b10_c1_slate) { S.f.b10_c1_slate = 1; gain('b10_c1_slate'); } }, again:()=>'A clerk\'s trestle by the trenches, slates stacked on it, chalk dust on everything.', txt: !b101PrussSettled() ?
`A trestle by the trenches with slates stacked on it face down, each one full. A clerk is copying them into a big ledger one line at a time and wiping each slate when he is done. His chalk keeps moving.` :
`The clerk from the first trench has come to the trestle to copy his slate into the ledger, line by line. When he is done, he picks up the rag to wipe it, and stops.

He looks at the slate a while. Then he puts the rag down and holds the slate out to the Third, frame first.

"It's in the book," he says. "All of it. I don't need it." He does not let go straight away. "I can't wipe it. Take it. It wants carrying a while."${b101If('pruss', `\n\nPruss looks at the names on it, and does not take it himself. "Six of those are mine," he says. "Rest are somebody's."`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* Thallo by day: the captain's word on the strippers */
    b10_c1_thallo:()=>({sp:'Thallo', scene:'b10_burial', fx:()=>{ S.f.b10_c1_orders = 1; }, again:()=>'Thallo, by the trenches, with no bread. "The east edge, Sergeant. They\'re still there."', txt:
`Thallo, the drill sergeant's corporal, as big as a door and as bent as one that has been kicked, with his broken nose and his scale and his ring of keys. He is not eating. In all the time anybody has known him, he has not been seen not eating.

"Third," he says. "Good. You're alive. I'm keeping a list." He jerks his head east, toward the far end of the lines. "Captain's word. Strippers at the edge of the burial ground. Camp followers, and some who weren't anything, and a few deserters who came back when the shouting stopped. They're at the ones waiting their turn for the trench. Boots, buckles, rings." He spits, carefully, away from the trench. "Captain says clear them off. I say clear them off hard."

He looks at his empty hands. "Ration's cut again. I've give my bread to the long tents." He seems surprised to hear himself say it.${b101If('pruss', `\n\nPruss looks east. "Boots," he says. "My lot had good boots." His voice has gone very level.`)}`,
      ch:[{t:'"Why the long tents, Thallo?"', req:()=>!S.f.b10_c1_bread, fx:()=>{ S.f.b10_c1_bread = 1; }, go:'b10_c1_thallo_bread'},
          {t:'"The east edge, then."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_thallo_bread:()=>({sp:'Thallo', scene:'b10_burial', txt:
`"Drill sergeant's in there," he says. "My drill sergeant. Took a short-tail's arm across the back on the stretch." He rubs his broken nose. "Surgeons say he'll walk. Says he won't eat. So I'm not eating either, so he can't say I'm eating his." He considers this. "It made more sense when I thought of it."${b101If('mirrel', `\n\nMirrel nods slowly. "He will eat," she says. "In a little while. Then you eat too." Thallo looks at her as if she had given him an order, and seems relieved.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the heavies' sergeant at a trench: the roll over a grave, the trick */
    b10_c1_roll:()=>({sp:'A sergeant of the heavies', scene:'b10_burial', again:()=> S.f.b10_c1_rollOk ? 'The heavies\' sergeant at his trench, calling another roll. Every name. Every one answered.' : 'The heavies\' sergeant at his trench, calling names.', txt:
`A grey sergeant of the heavies stands at the head of a trench with his helm under his arm, calling a roll. He has no slate. He says a name, and the heavy beside him says "here", for the soldier who is in the trench. Then the next name, and the next heavy. When the dead are done he starts again with the living, and each of them answers for themselves, and steps up into the gap the last one left.

${S.f.b10_c1_rollTried ? `He sees the Third watching. "Again at the next one," he says. "Every trench. Every name."` : `He sees the Third watching, and finishes before he speaks. "Every name," he says. "Old heavies' way. The dead hear the first half. The living need the second." He looks at the Third. "You lot know a roll?"`}${b101If('pruss', `\n\nPruss is mouthing names, a beat ahead of the sergeant. Not these names.`)}`,
      ch:[{t:'Learn the heavies\' roll over a grave: the dead answered for, then the living.', check:['wits', 21], trick:'b10_c1_roll', req:()=>!S.f.b10_c1_rollTried, fx:()=>{ S.f.b10_c1_rollTried = 1; },
            edges:id=>[(trickBy('b9_c1_rollcall') === id || (id === 'sgt' && !!trickBy('b9_c1_rollcall'))) && ['the Roll at the Gate in Letheras: the Third has answered the heavies\' roll before', 2], id === 'sgt' && ['the Fourteenth\'s musters: you have called a roll over the living and the dead', 1], id === 'pruss' && ['four years of answering this roll, and six names he knows by heart', 2], id === 'brask' && ['the heavies\' roll is his whole old life', 2], id === 'haddat' && ['she says the names of the dead every night, in order', 1], id === 'tangle' && ['a roll is a count, and he counts', 1], id === 'ottar' && ['the Perish sing their dead by name', 1], id === 'sathi' && ['the Weasels did not keep names; the wind kept them', -1], id === 'tallow' && ['he answers for the man beside him, and then forgets his own', -1]],
            go:'b10_c1_roll_ok', fail:'b10_c1_roll_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_roll_ok:()=>({sp:'A sergeant of the heavies', scene:'b10_burial', fx:()=>{ S.f.b10_c1_rollOk = 1; }, txt:
`By the third trench ${by({sgt:'you can', pruss:'Pruss is calling it with him, and', brask:'Brask is calling it with him, and', _:'{who} can'})} call the Third's roll the heavies' way: the names of the dead first, each answered "here" by the one beside, then the living, each for themselves, and the squad stepping up into the gaps until the file is closed and no order was given.

The sergeant listens to it once without turning round. "That'll do," he says, to the trench. "Do it in a fight. They answer quicker in a fight."${b101If('haddat', `\n\nHaddat answers to her name as if it were a prayer. It might be one.`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b10_c1_roll_no:()=>({sp:'A sergeant of the heavies', scene:'b10_burial', txt:
`It goes well through the dead, and then somebody answers for a living soldier who has not been called yet, and two people step into the same gap, and the file comes apart like a bad seam.

The sergeant does not turn round. "Takes a year," he says. "Takes longer, out here." He calls the next name.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the sappers' spade cart */
    b10_c1_spadecart:()=>({sp:'The sappers\' cart', scene:'b10_burial', fx:()=>{ if (!S.f.b10_c1_spade) { S.f.b10_c1_spade = 1; gain('b10_c1_spade'); } }, again:()=>'The sappers\' cart, spades in it like arrows in a quiver.', txt:
`A handcart of spades, short-handled, sappers' issue, with a sapper sitting on the shafts drinking a mouthful of water very slowly. He looks at the Third, and then at the spades, and pulls one out and holds it up. The blade is filed to an edge along one side.

"Keep it," he says. "We've more spades than sappers now." He drinks the rest of the mouthful. "Sharp side's for roots. Use your judgement."${b101Say({tangle:`\n\nTangle looks at the cart, and the sapper, and does not ask where the other sappers are.`, pruss:`\n\nPruss weighs the spade in one hand, the way a carter weighs a tool. "Good ash," he says. "This was looked after."`, _:''})}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the upturned water barrel: the reading's place by day */
    b10_c1_barrel:()=>({sp:'An upturned barrel', scene:b101Night() ? 'b10_c1_linesn' : 'b10_burial', again:()=>'The upturned water barrel at the burial lines, a clerk\'s table when there is no table.', txt:
`A water barrel, empty, turned over at the head of the middle line for a table. A soldier's game has been scratched into the top of it with a knife point, and somebody else has put a mug on it upside down, to keep the dust out of nothing.${b101Say({marrow:'\n\nMarrow pats the barrel\'s head. "A good table, child," she says. "Cards like a barrel. They know it was full once."', _:''})}`,
      ch:[b10ReadChoice(1),
          {t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the edge of the burial ground: the strippers */
    b10_c1_edge:()=>{ const done = !!S.f.b10_c1_stripDone;
      if (done) return {sp:'The edge of the burial ground', scene:'b10_burial', txt:
`The east edge of the burial ground is quiet. The dead who were waiting there have their boots on, and the clerks are writing them down, one by one, without hurrying.`,
        ch:[{t:'Back to the lines.', go:()=>startExplore()}]};
      if (!S.f.b10_c1_orders) return {sp:'The edge of the burial ground', scene:'b10_burial', txt:
`The east edge of the burial ground, where the dead wait in rows under blankets for their turn at the trench. There are people moving among the rows who are not clerks and not soldiers. Thallo, back by the trenches, has been looking this way and frowning.`,
        ch:[{t:'Back to the lines. Thallo first.', go:()=>startExplore()}]};
      return {sp:'The edge of the burial ground', scene:'b10_burial', txt:
`The east edge of the burial ground, where the dead wait in rows under blankets for their turn at the trench. A dozen people are moving among the rows, bent over, quick: camp followers in rags, and a few in army coats with the badges cut off. Boots are going into sacks. A sling-man stands on a spoil heap to watch the lines.

Behind them a dry wash runs down toward the plain, and something has been dragged into it.

A regular from the next detail has come up beside the Third with a spade in one hand and a sword in the other. "I'm with you," he says. "Been wanting to all morning."${b101If('pruss', `\n\nPruss has put the spade down and has the heavy sword in his hand. His jaw is working.`)}`,
        ch:[{t:'"Third! Off them!" Straight in, shields up.', go:()=>startBattle('b10_c1_strippers', {})},
            {t:'Come at them along the spoil heaps, low, and be among them before the sling-man sees.', check:['guile', 19],
              edges:id=>[id === 'sathi' && ['she came at Odhan camps along the dry washes for the Weasels', 2], id === 'mehet' && ['he grew up keeping out of sight in Y\'Ghatan', 1], id === 'tegra' && ['her people hunt along the folds of the ground', 2], id === 'wenna' && ['she reads the ground for its low places', 1], id === 'pruss' && ['heavy scale on a spoil heap sounds like a wagon on gravel', -1], id === 'ottar' && ['grey plate on a spoil heap is louder', -2]],
              near:{t:()=>`Yes, but the spoil heap gives under ${b101Nm(b101Who())}, and ${b101Nm(b101Who())} ${b101V(b101Who(), 'come', 'comes')} off the end of it on a knee in the loose earth. ${b101Nmc(b101Who())}'ll carry that into the fight.`, fx:()=>bruise(b101Who(), bruiseN())},
              go:()=>startBattle('b10_c1_strippers', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c1_edge_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c1_edge_seen:()=>({sp:'The edge of the burial ground', scene:'b10_burial', txt:
`The sling-man on the spoil heap shouts, and every bent back among the rows straightens at once, and the sacks go down and the knives come up.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c1_strippers', {surprise:'e'})}]}),
    b10_c1_strippers_after:()=>({sp:'The wash behind', scene:'b10_burial', fx:()=>{ if (!S.f.b10_c1_stripDone) { S.f.b10_c1_stripDone = 1; gain('b10_c1_scale'); } }, txt:
`The strippers who could run have run, out down the wash toward the plain, and will not stop running before dark. The broad man with the heavy's sword is down in the wash by his handcart, and the sword is beside him, and the regular from the next detail picks it up and holds it a while and then carries it back to the clerks, because somebody will know whose it was.

In the handcart, under the boots, there is a heavy's scale shirt rolled up in a blanket. The clerks find no name for it. The quartermaster, when he comes, looks at it and at the Third. "Living wear what the dead leave," he says. "Put it on. Stop looking at it like that." It goes in the kit.${b101Say({pruss:`\n\nPruss is taking the boots out of the handcart and setting them in pairs on the edge of the wash, every pair together. "So the clerks can match them," he says. It takes him a while. The Third waits.`, haddat:`\n\nHaddat kneels in the wash by the broad man, as she does by every dead soldier, and says a word. He was a soldier once, maybe. Then he was this.`, _:''})}

Back across the lines, Thallo has gone off toward the camp at something near a run, which for Thallo is news in itself.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    b10_c1_tocamp:()=>({sp:'The burial lines', scene:'b10_burial', txt:
`West, back up through the rows of tents with gaps in them, to the camp.${!S.f.b10_c1_stripDone && S.f.b10_c1_orders ? ' Thallo will want the edge cleared first.' : ''}`,
      ch:[{t:'To the camp.', onward:true, go:()=>{ startExplore('b10_c1_camp'); if (!S.f.b10_c1_campSeen) talk('b10_c1_camp_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 1: the camp by day ======== */
    b10_c1_camp_arrive:()=>({sp:'The camp', scene:'b10_camp', fx:()=>{ S.f.b10_c1_campSeen = 1; }, again:()=>'The camp, the rows with gaps in them, the long tents full.', txt:
`The camp after the short-tails is quiet as a hospital is quiet. Tents in rows, and gaps in the rows where tents stood, and nobody has closed the gaps up yet because nobody has had the heart or the order. The surgeons' long tents at the north end have their sides rolled up for the air, and the rows inside go back a long way.

Out past the north-east corner there is a low rise, and soldiers standing on it in ones and twos, watching the allies' dust come on.${b101Say({mirrel:'\n\nMirrel looks at the long tents, and then at you. "Later," she says. "I will go later. They will need hands at night more."', marrow:'\n\nMarrow looks at the long tents for a long breath. "Later, child," she says. "When they have stopped needing the surgeons and need the rest of us."', _:''})}`,
      ch:[{t:'Walk the camp.', go:()=>startExplore()}]}),
    b10_c1_tolines:()=>({sp:'The camp', scene:'b10_camp', txt:
`East, down through the last rows of tents, to the burial lines and the spades.`,
      ch:[{t:'To the burial lines.', onward:true, go:()=>startExplore('b10_c1_lines')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the rise: the allies coming in (seen, never met) */
    b10_c1_rise:()=>({sp:'The rise', scene:'b10_camp', fx:()=>{ S.f.b10_c1_allies = 1; }, again:()=>'The rise at the camp\'s edge, the allies\' camps going up on the plain below.', txt:
`From the rise the plain runs away south and west, flat and brown, and across it the allies are coming in.

Grey knights first, in columns so straight they look ruled on the ground, grey cloaks, grey shields, a forest of lances, not one of them out of step. Behind them a long loose army under bright banners, the Bolkando, with carts and camp followers and a great deal of dust. And off to one side, on their own, horse-folk with painted faces, riding slowly. Fewer horses than there should be for that many saddles. Fewer riders than horses.

The soldiers on the rise watch them come without saying much. ${b101Say({orvas:'Orvas is very still beside you. "Khundryl," he says. "My people." He counts something under his breath and stops counting.', ottar:'Ottar is watching the grey knights. "Very straight," he says, and his voice is careful. "They have not met the short-tails."', darrut:'Darrut shades his eyes. "That is an army," he says. "We were one." He stops himself. "Before."', pruss:'Pruss is watching the Bolkando carts. "Their beasts are fat," he says, wondering. "Look at them. Fat."', _:'A regular on the rise says the allies are a day late for everything. The one beside him says that is unfair. Neither of them sounds as if they care which.'})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the surgeons' long tents: a hand with the carrying (a check, its "yes, but") */
    b10_c1_longtent:()=>({sp:'The long tents', scene:'b10_camp', again:()=> S.f.b10_c1_carried ? 'The long tents, the rows inside quieter than they were.' : 'The long tents, the sides rolled up, the rows going back.', txt: S.f.b10_c1_carried ?
`The long tents. The rows inside are quieter than they were. The surgeon with the shaved head nods to the Third from the far end and goes back to work.` :
`The surgeons' long tents, sides rolled up for the air, and inside them the wounded in rows on blankets, a long way back. Surgeons and their orderlies going down the rows with water and linen. The water is in very small cups.

A surgeon with a shaved head and a stained apron straightens up at the end of a row and sees the Third standing at the tent's side. "You," she says. "Strong backs. The far rows need moving into the shade before the sun comes round. Gently. Can you do gently?"${b101If('mirrel', `\n\nMirrel is already rolling her sleeves up.`)}${b101If('pruss', `\n\nPruss looks at the far rows, and then at the surgeon. "I can do gently," he says. "Did it for my da's horses."`)}`,
      ch: S.f.b10_c1_carried ? [{t:'Back to the camp.', go:()=>startExplore()}] :
        [{t:'Move the far rows into the shade, two to a blanket, slowly.', check:['might', 19], req:()=>!S.f.b10_c1_carryTried, fx:()=>{ S.f.b10_c1_carryTried = 1; },
            edges:id=>[id === 'pruss' && ['a carter\'s son knows how to lift without jolting', 2], id === 'mirrel' && ['she has carried the sick in Li Heng', 2], id === 'marrow' && ['she knows where not to hold a wounded man', 1], id === 'brask' && ['heavies carry what nobody else will', 1], id === 'haddat' && ['she will not let it be done badly', 1], id === 'sathi' && ['she carries a wounded soldier like a sack of loot', -1], id === 'mehet' && ['a townsman, and slight', -1]],
            near:{t:()=>`Yes, but the last blanket is a big heavy who will not stop apologising, and ${b101Nm(b101Who())} ${b101V(b101Who(), 'wrench', 'wrenches')} something in the back setting him down slowly. ${b101Nmc(b101Who())}'ll feel it in the next fight.`, fx:()=>bruise(b101Who(), bruiseN())},
            go:'b10_c1_longtent_ok', fail:'b10_c1_longtent_no'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_longtent_ok:()=>({sp:'The long tents', scene:'b10_camp', fx:()=>{ S.f.b10_c1_carried = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('A salve, from the surgeon.', 'good'); }, txt:
`It takes most of the afternoon and every back in the squad. The far rows go into the shade one blanket at a time, slowly enough that none of them cry out, or not much.

When it is done the surgeon with the shaved head comes down the row and puts a salve into the nearest soldier's hand without a word, and then, because that was not enough, says one. "Good," she says. "Gently. Most people can't."${b101If('mirrel', `\n\nMirrel stays behind a little to change a dressing, and comes back with her hands clean and her face closed.`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b10_c1_longtent_no:()=>({sp:'The long tents', scene:'b10_camp', fx:()=>{ S.f.b10_c1_carried = 1; }, txt:
`It goes well until the third row, when a blanket slips and a wounded heavy comes down hard on the ground and shouts, and an orderly comes running, and the surgeon sends the Third to carry water instead, which it does, all afternoon, in very small cups.

"Better than nothing," the surgeon says at the end, not unkindly. "Most things are."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the heavies' captain: seen, unnamed */
    b10_c1_captain:()=>({sp:'The heavies\' captain', scene:'b10_camp', fx:()=>{ S.f.b10_c1_captain = 1; }, again:()=>'The heavies\' captain, across the camp, walking the rows.', txt:
`The captain of the heavies' company is walking the rows with a clerk at his elbow and a list he is not reading: a grey, square man with a bandage round one hand, stopping at every tent that is still a tent and at every gap where one was. At the gaps he stops longer.

He looks over at the Third once, and nods, and goes on down the row. It is the whole of the conversation, and it is enough.${b101If('pruss', `\n\nPruss watches him go. "He stopped at our gap," he says. "This morning. Stood there a while."`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the old marine: the Deck's third reader */
    b10_c1_oldmarine:()=>({sp:'An old marine', scene:b101Night() ? 'b10_camp_night' : 'b10_camp', fx:()=>{ S.f.b10_c1_old = 1; }, again:()=>'The old marine, with his cup and his cards.', txt: b101Night() ?
`The old marine is sitting on his crate by a dung-fire with his cup and his deck, watching the big tent's lamps across the camp. "Officers," he says. "Talking." He shuffles one-handed. "Every army I've been in, the officers talked the night before something. Never once did it make the something smaller." He drinks. "Sit, if you like. The cards don't mind the dark."` :
`An old marine on a crate by the cook-wagon, with a cup in his hand and a soldier's deck in his lap, out of the sun under the wagon's tilt. He has been in the army so long it has forgotten to retire him, and he walked off the stretch and the trail behind it like everybody else, more slowly.

"Still here," he says, when he sees the Third. "Both of us." He looks pleased about it in a careful way. "Heard the latest? The Adjunct's on her feet, they say." He drinks. "Never saw her off them, myself. Sit down if you want a card. The Deck's been quiet. It'll talk, for a barrel."`,
      ch:[b10ReadChoice(1),
          {t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the heavies sparring behind the wagons: the optional fight */
    b10_c1_spar:()=>({sp:'Heavies sparring', scene:'b10_camp', again:()=> S.f.b10_c1_sparDone ? 'The heavies, sparring behind the wagons, slower now.' : 'Behind the heavies\' wagons, wooden swords and real shields.', txt: S.f.b10_c1_sparDone ?
`The heavies are still at it behind the wagons, slower now, more of them sitting in the ring than standing in it. One of them raises a wooden sword to the Third as it goes by, which is a heavy's salute.` :
`Behind the heavies' wagons a square of ground has been trodden flat, and heavies are on it with wooden swords and real shields, file against file, at a walk. Not hard. Not to hurt. A sergeant at the side calls the steps.

"Arms go stiff if you don't use them," he says, when he sees the Third watching. "Minds go stiff quicker." He looks the squad over. "Want a go? One square. Hold four of my files. We're not trying to hurt anybody." He considers. "Much."${b101If('pruss', `\n\nPruss is already looking at the shields. "My lot used to spar on rest days," he says. "I always lost. Too slow." He picks up a wooden sword anyway.`)}`,
      ch: S.f.b10_c1_sparDone ? [{t:'Back to the camp.', go:()=>startExplore()}] :
        [{t:'"One square, Sergeant."', go:()=>startBattle('b10_c1_spar', {})},
         {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_spar_after:()=>({sp:'Heavies sparring', scene:'b10_camp', fx:()=>{ S.f.b10_c1_sparDone = 1; }, txt:
`The sergeant calls it, and the files step back and lower the wooden swords, and everybody stands about breathing hard and rubbing the places the swords went. None of it is worse than bruises.

"Held," the sergeant says. "Held fine." He looks at the Third as at something useful he has found out. "When it comes again, whatever it is, I'll want you next to my lot." He sits down in the dust. "Not today. Today we bury."${b101Say({pruss:`\n\nPruss is sitting on the ground with a wooden sword across his legs, grinning, which is new. "Didn't lose," he says. "First time."`, haddat:`\n\nHaddat sets the blue shield down and flexes her arm. "Good," she says. "I had forgotten I could still be tired from something else."`, _:''})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* Thallo after the strippers: the news, and the officers sitting tonight */
    b10_c1_thallo_news:()=>({sp:'Thallo', scene:'b10_camp', fx:()=>{ S.f.b10_c1_news = 1; }, again:()=>'Thallo, by the heavies\' wagons. "Officers sit tonight, Sergeant. Big tent."', txt:
`Thallo is standing by the heavies' wagons breathing hard, with news on his face and no idea yet whether it is good.

"Captain says thanks for the edge," he says. "Then he says two things." He holds up one thick finger. "The Adjunct's on her feet. Walked out of her tent this morning and looked at the camp. That's all. Didn't say anything to anybody I know." Another finger. "Officers sit tonight. All of them, ours and the allies', in the big tent. Grey knights, Bolkando, horse-folk. Lamps till late, he says."

He puts the hand down. "Then we find out where we're going." He looks at the long tents, and seems to remember he is hungry, and decides against it.${b101Say({haddat:`\n\nHaddat lets out a breath. "On her feet," she says. "Good." Then: "My mother said a general on her feet is worth a battalion lying down." She frowns. "She did not say what one is worth who will not tell you why."`, tangle:`\n\nTangle is counting on his fingers. "Ours, and three lots of theirs," he says. "That's a lot of officers in one tent. That's a lot of opinions."`, _:''})}${b101If('pruss', `\n\nPruss nods, slowly. "On her feet," he says. "Good. One of us should be."`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ======== the fire: by phase. 1 the day, 2 the night of the lamps, 3 after the key (the beat). The games pass wraps this node: keep the id ======== */
    b10_c1_fire:()=>{ const ph = b101Ph(), night = ph >= 2, rk = night ? 'b10_c1_rest2' : 'b10_c1_rest1', beatOpen = ph === 3 && b101NightDone() && !b10BeatOf(1);
      return {sp:'The Third\'s fire', scene:night ? 'b10_camp_night' : 'b10_camp', html:witnessHTML(),
        again:()=> night ? 'The Third\'s dung-fire, small, the big tent\'s lamps across the camp.' : 'The Third\'s cook-fire among the tents, a pot on it with not much in the pot.', txt:
`${!night ? `The Third's fire by day is a cook-fire among the tents with a pot on it, and not much in the pot. The ration has been cut again. Everybody knows it and nobody has been told it.${b101DayDone() ? ' The light is going. Across the camp, the big tent has its first lamps lit.' : ''}` : ph === 2 ? `The Third's fire at night is a small dung-fire with the squad round it close. Across the camp the big tent glows like a lantern, and shapes move on its canvas, and out on the plain the allies' fires have come up in their hundreds.` : b101NightDone() ? `The Third's fire, late, nearly out. ${b101Names() ? 'The burial lines are quiet behind the squad, the last trench filled.' : 'Every skin the squad owns hangs full and heavy from the wagon tilt beside it.'} The big tent's lamps are out. Somewhere in the dark the column is already being sorted into the order it will march in.` : `The Third's fire, banked low. ${b101Names() ? 'The burial lines are west, and a clerk\'s lamp is burning at the last trench.' : 'East, down in the wash, the sappers\' lamps are lit at the wells and the chain is forming.'}`}${b101If('pruss', night ? `\n\nPruss sits a little back from the fire on his own kit, with the old sergeant's helm by his boot.` : '')}`,
        ch:[...(ph === 1 ? [b10ReadChoice(1)] : []),
            ...(beatOpen ? [{t:'"Why are we still here?" Ask it, at the fire.', go:'b10_c1_beat'}] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(night ? 'The squad sits an hour by the dung-fire in the dark. Wounds close, mostly.' : 'The squad sits an hour by the cook-fire. Wounds close, most of them.'); }, go:'b10_c1_fire_rest'},
            {t:'Talk with the squad.', go:'b10_c1_fire_talk'},
            {t:'Dusk. Let the day go.', req:()=>ph === 1 && b101DayDone(), onward:true, fx:()=>{ S.f.b10_c1_ph = 2; }, go:()=>{ startExplore('b10_c1_night'); talk('b10_c1_night_arrive'); }},
            {t:b101South() ? 'Dusk again. Across the camp to the Letherii wagons.' : 'Dusk again. East, with the column, to the glass\'s edge.', req:()=>ph === 3 && b101NightDone(), onward:true, go:'b10_c1_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c1_fire_rest:()=>({sp:'The Third\'s fire', scene:b101Night() ? 'b10_camp_night' : 'b10_camp', txt:
`${b101Night() ? 'An hour, then, by a small fire in the dark, with the camp murmuring all round and the allies\' fires out on the plain.' : 'An hour, then, among the tents, with the spades still going at the lines and the heat lying on everything.'}

${b101Say({mirrel:`Mirrel goes round the squad with the water skin, one mouthful each, and watches each one swallow. "Drink. Good."`, marrow:`Marrow goes round the squad with her hands, and stops at each of them long enough to frown. She closes a cut anyway.`, _:'Some of them sleep. The rest watch the camp.'})}${b101If('haddat', `\n\nHaddat says the names of the dead under her breath, the long list, and ${b10In('pruss') && S.f.b10_c1_prussSquad ? 'six new ones at the end of it, that Pruss gave her.' : 'has not run out.'}`)}${b101If('pruss', `\n\nPruss sleeps sitting up with his back to a wagon wheel and the helm in his lap, the way carters sleep on a long road.`)}`,
      ch:[{t:'Back to the fire.', go:'b10_c1_fire'}]}),
    b10_c1_fire_talk:()=>{ const night = b101Night(), ln = [];
      Object.keys(B101TALK).forEach(id => { if (b10In(id)) ln.push(B101TALK[id][night ? 1 : 0]()); });
      return {sp:'The Third\'s fire', scene:night ? 'b10_camp_night' : 'b10_camp', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b10_c1_fire'}]}; },

    /* ======== phase 2: the night of the lamps ======== */
    b10_c1_night_arrive:()=>({sp:'The camp at night', scene:'b10_camp_night', fx:()=>{ S.f.b10_c1_missing = 1; }, again:()=>'The camp at night, the big tent lit across it, the allies\' fires on the plain.', txt:
`Night comes down on the camp quickly, as it does at the Wastes' edge, and with it the cold. The fires are small: dung and the last of the wagon-boards. Out on the plain the allies' fires have come up in their hundreds, more than the camp has seen in a long while, and across the camp the big tent glows from inside like a lantern, with shapes going back and forth on its canvas.

At dusk, word came round the fires faster than a runner. Two of the missing have walked back into the camp: the mage and the captain who went in alone. And with them, the soldiers who saw it say, a handful of the dead Imass, walking, and then standing at the camp's edge like posts nobody had put there.

${b101Say({marrow:`Marrow is still for a breath. Then she laughs, once, short, and wipes her eyes with the back of her hand. "Missing is not dead, child," she says. "I said. Did I not say?" She did. Everybody heard her.`, haddat:`Haddat stops in the middle of the long list, and goes back, and takes two names off the end of it, carefully, as if they might break. "Not those," she says. "Not yet."`, _:'The Third hears it at the fire, and somebody says "missing is not dead" in an old marine\'s voice, and the laugh it gets is not quite a laugh.'})}${b101If('pruss', `\n\nPruss is looking east. "Walked back in," he says. He sounds as if he is trying the words out, to see if they would fit anybody else.`)}`,
      ch:[{t:'Walk the camp.', go:()=>startExplore()}]}),

    /* the big tent: lamps, and the camp word after (the chapter's Witness "yes, but") */
    b10_c1_tent:()=>({sp:'The big tent', scene:'b10_camp_night', again:()=> S.f.b10_c1_word ? 'The big tent, dark now, the guards gone from its door.' : 'The big tent, lit, the guards at its door, the shapes on its canvas.', txt: S.f.b10_c1_word ?
`The big tent is dark now. The guards have gone from its door. Here and there across the camp, at the fires, soldiers are saying the same few words to each other, and then not saying anything for a while.` :
`The big tent stands at the head of the camp with lamps lit inside it, a dozen at least, so that the canvas glows and the shapes of the people inside go back and forth across it, tall and short, sitting and standing. A guard of heavies at the door with their backs to it. Horses of the allies picketed outside, fat and well kept, looking at the camp's thin mules.

You cannot hear anything from here. No soldier can. The soldiers who have drifted over from the fires stand at a distance with their arms folded and watch the shapes on the canvas as if they could read them.

Late, very late, the lamps go out one by one, and the officers come out in twos and threes and go off to their own lines without stopping, and one of the Adjunct's clerks comes out last with a satchel and stands in the door, breathing the cold, as if he had been holding his breath in there.${b101If('pruss', `\n\nPruss is standing at the back of the watching soldiers. "Long talk," he says. "Long road, then. Always is."`)}`,
      ch: S.f.b10_c1_word ? [{t:'Back to the fire.', go:()=>startExplore()}] :
        [{t:'Catch the clerk at the door before he goes, and ask him straight what was said.', check:['wits', 19], req:()=>!S.f.b10_c1_wordTried, fx:()=>{ S.f.b10_c1_wordTried = 1; },
            edges:id=>[id === 'sgt' && ['you have had the camp word out of a clerk before', 1], id === 'mehet' && ['a townsman knows how to ask a tired man a question', 2], id === 'doss' && ['he talks to a clerk as an Indebted talks to a factor\'s man: carefully', 1], id === 'haddat' && ['she asks politely, and he is not used to it', 1], id === 'pruss' && ['the clerks put his name on the Third\'s slate today; he asks after it', 1], id === 'sathi' && ['her teeth put him off his answer', -1], id === 'ottar' && ['a Perish in grey plate asking what was said in a tent with the Perish in it', -2]],
            near:{t:'Yes, but what he gives you is the plan and not one word of why, and he gives it with the face of a man who was not told why either. The Third carries that back to the fire with the rest.', fx:()=>{ b10Witness(-1, 'the plan, and no why'); }},
            go:'b10_c1_word_ok', fail:'b10_c1_word_no'},
         {t:'Back to the fire. Camp word will come.', fx:()=>{ S.f.b10_c1_word = 'later'; }, go:'b10_c1_word_later'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_word_ok:()=>({sp:'The Adjunct\'s clerk', scene:'b10_camp_night', fx:()=>{ S.f.b10_c1_word = 'heard'; }, txt:
`He looks at the Third a long breath before he answers, and then, perhaps because it is dark, and nobody else is asking, he does.

"East," he says. "The army goes east. Into the glass. The Glass Desert, the allies' officers called it. Straight across, where there is no road." He hitches the satchel. "The allies go south, round the long way. The Letherii, the Bolkando, the grey knights. The horse-folk come with us." He looks at the dark east. "She means to free the chained god. That is the long and the short of it, and nobody in that tent liked it."

He goes off toward the clerks' lines without another word. Behind him the camp is already starting to say it, fire to fire: <em>east, into the glass</em>.${b101Say({tangle:`\n\nTangle has stopped walking. "Across," he says. "Not round." He touches the Kanese bead. "Right."`, haddat:`\n\nHaddat says it under her breath, once: <em>the chained god</em>. Once is enough for her.`, _:''})}${b101If('pruss', `\n\nPruss is looking east into the dark. "No road," he says. "Then the wagons go on what's there." He sounds like a man already working out the load.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c1_word_no:()=>({sp:'The big tent', scene:'b10_camp_night', fx:()=>{ S.f.b10_c1_word = 'later'; }, txt:
`He shakes his head before the question is finished. "Ask your captain," he says. "Ask anybody." He goes off toward the clerks' lines with the satchel held against him, quickly, the way a man carries a thing that might go off.

It comes round the fires anyway, a little after, in pieces: east. The army goes east. Into the glass. The allies go south. Not one fire has the why.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c1_word_later:()=>({sp:'The big tent', scene:'b10_camp_night', txt:
`The Third goes back to its fire, and the word comes round after it a little later, in pieces, the way word does: east. The army goes east, into the glass. The allies go south, the long way round. Nobody says why.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* Thallo at night: the captain's word, and the key */
    b10_c1_thallo_night:()=>{ const ph = b101Ph();
      if (ph === 3) return {sp:'Thallo', scene:'b10_camp_night', txt:
`Thallo is sitting on the wagon-tongue with a heel of bread in his fist, eating it, slowly. "Drill sergeant ate," he says, with enormous relief. "So I can." He chews. "${b101Names() ? 'Lines want you. Go on.' : 'Wells want you. Go on.'}"`,
        ch:[{t:'Back to it.', go:()=>startExplore()}]};
      if (!S.f.b10_c1_word) return {sp:'Thallo', scene:'b10_camp_night', txt:
`Thallo is standing by the wagons watching the big tent's lamps, with his arms folded over his empty belly. "Officers," he says. "Talking." He does not look away from the canvas. "Captain'll have the word for us when they come out. Not before."`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'Thallo', scene:'b10_camp_night', html:witnessHTML(), again:()=>'Thallo, by the fire, with the captain\'s word. "Lines or wells, Sergeant."', txt:
`Thallo comes to the Third's fire with the captain's word, and squats down on his heels by it, which for a man his size is an undertaking.

"East," he says. "You've heard. Column marches at dusk, and it marches by night from here on, because the days out there will kill you." He looks at the fire. "Captain's word for tonight. Two details want hands, and he says the Third can pick, because the Third did the edge.

"The burial lines. Last trenches close tonight, before the column goes. A squad stands them till the earth's in, and says the names over the last one. Clerk's got the slate. There've been robbers at the lines after dark, too, the same sort as the edge." He holds up the other hand. "Or the water detail. Sappers' wells down in the wash. Every skin and every barrel filled by dusk, for the glass, and it's a chain of hands all night, bucket by bucket. Water's what we'll want out there. Everybody says."

He stands up, slowly. "Can't do both. I'll take the other with my lot. Your call."${b101South() ? `\n\n"And another thing." He rubs his broken nose. "Captain's word, for the Third. You're lent out. The Letherii are going south with their Commander, round the long way, and they want a few heavies to teach drill on the road. The Third's on the list." He looks at the fire. "Tonight's work first."` : ''}${b101If('pruss', `\n\nPruss looks up from the helm in his lap. "Water," he says, as if somebody had asked. "My da always said: fill everything." Then he looks west at the lines, and his mouth goes tight. "Or the names. They should get said."`)}${b101If('haddat', `\n\nHaddat is already looking west, toward the lines.`)}${b101If('tangle', `\n\nTangle is looking east, toward the wells. "Water's arithmetic," he says. "Names aren't."`)}`,
        ch:[{t:'"The burial lines. We stand them, and the names get said."', fx:()=>{ S.f.b10_c1_key = 'names'; S.f.b10_c1_names = 1; S.f.b10_c1_ph = 3; b101L('haddat', 1); b101L('marrow', 1); }, go:'b10_c1_key_names'},
            {t:'"The water. Every skin, every barrel."', fx:()=>{ S.f.b10_c1_key = 'water'; S.f.b10_c1_water = 1; S.f.b10_c1_ph = 3; b101L('tangle', 1); b101L('pruss', 1); }, go:'b10_c1_key_water'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b10_c1_key_names:()=>({sp:'Thallo', scene:'b10_camp_night', txt:
`Thallo nods. It is the answer he would have given, and would have been sorry to. "Lines, then," he says. "My lot'll do the wells. Clerk's at the last trench with a lamp." He goes off toward the wash.

The Third takes up its spades and goes west, between the dark tents, toward the one lamp at the end of the burial lines.${b101If('marrow', `\n\nMarrow walks with her hand on Haddat's shoulder. "Every name, child," she says. "Even the ones nobody knows. Especially those."`)}${b101If('pruss', `\n\nPruss walks with the old helm under his arm, not tied to the pack.`)}`,
      ch:[{t:'To the burial lines.', go:()=>startExplore()}]}),
    b10_c1_key_water:()=>({sp:'Thallo', scene:'b10_camp_night', txt:
`Thallo nods. "Wells, then," he says. "My lot'll stand the lines." He looks west toward the clerk's lamp a moment, and goes.

The Third takes every skin it owns and goes east, down into the wash, where the sappers' lamps are lit over the wells and a line of soldiers is already forming up the bank.${b101If('tangle', `\n\nTangle has the squad's skins over his shoulder in a bundle and is counting them as he walks.`)}${b101If('pruss', `\n\nPruss has borrowed two more skins from somewhere and has them across his back on the trace-strap. "Fill everything," he says.`)}`,
      ch:[{t:'To the wells.', go:()=>startExplore()}]}),

    /* ======== phase 3, 'names': the burial lines by night ======== */
    b10_c1_nightlines:()=>{ const ph = b101Ph();
      if (ph < 3 || !b101Names()) return {sp:'The burial lines', scene:'b10_c1_linesn', txt:
`The burial lines by night: open trenches in rows under the stars, and a clerk's lamp burning on a trestle at the end of the last one. ${ph < 3 ? 'The Third\'s business is at the fire until the captain\'s word comes.' : 'Thallo\'s heavies are standing the lines tonight, with their shields grounded and their backs to the camp.'}`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      if (!S.f.b10_c1_gravesDone) return {sp:'The burial lines', scene:'b10_c1_linesn', txt:
`The last line of trenches is open in the dark, with the dead laid in it under their blankets, waiting for the earth. The clerk's lamp is on the trestle at the end of it. The clerk is not.

Down at the far end, in the last trench, there is a shuttered lamp moving, and the sound of somebody working fast, and the clink of a buckle going into a sack.${b101If('pruss', `\n\nPruss has stopped. "In the trench," he says.`)}`,
        ch:[{t:'"Third. Up out of there." Straight down the line at them.', go:()=>startBattle('b10_c1_graves', {})},
            {t:'Along the spoil heaps in the dark, and be at the trench\'s edge before they look up.', check:['guile', 19],
              edges:id=>[id === 'sathi' && ['she has come at worse in the dark for the Weasels', 2], id === 'mehet' && ['he grew up in the dark in Y\'Ghatan', 1], id === 'tegra' && ['her people move at night', 2], id === 'tebbet' && ['a bowman knows how to wait', 1], id === 'pruss' && ['heavy scale in the dark is a bell', -1], id === 'ottar' && ['grey plate in the dark is a bigger bell', -2]],
              near:{t:()=>`Yes, but the edge of the trench is soft in the dark, and ${b101Nm(b101Who())} ${b101V(b101Who(), 'go', 'goes')} down to the hip in loose spoil getting there. ${b101Nmc(b101Who())}'ll feel it in the fight.`, fx:()=>bruise(b101Who(), bruiseN())},
              go:()=>startBattle('b10_c1_graves', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c1_graves_seen'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (!S.f.b10_c1_named) return {sp:'The burial lines', scene:'b10_c1_linesn', html:witnessHTML(), txt:
`The clerk has come back out of the dark, where he went when the robbers came, and he is ashamed of it, and nobody mentions it. He sets the lamp on the trestle, and holds the slate up to it, and waits.

The last trench is the long one. The slate is full both sides.${b101If('haddat', `\n\nHaddat has already set her shield down at the trench's head.`)}${b101If('pruss', `\n\nPruss stands at the end of the trench with the old sergeant's helm in both hands. His six are in the line before this one. He knows which.`)}`,
        ch:[{t:'Say every name on the slate over the trench, and answer for each, the heavies\' way.', check:['wits', 19], witness:true, req:()=>!S.f.b10_c1_sayTried, fx:()=>{ S.f.b10_c1_sayTried = 1; },
              edges:id=>[S.f.b10_c1_rollOk && id === 'sgt' && ['the heavies\' roll over a grave: you learned it today', 2], id === 'haddat' && ['she says the names of the dead every night', 2], id === 'pruss' && ['he answered this roll for four years', 1], id === 'marrow' && ['she has sat with a great many dying, child, and remembers', 1], id === 'tallow' && ['he loses his place in a long list', -1]],
              near:{t:()=>`Yes, but the slate is long and the dust is in everybody's throat, and ${b101Nm(b101Who())} ${b101V(b101Who(), 'finish', 'finishes')} the last names in a voice that has nearly gone. ${b101Nmc(b101Who())} will carry the quiet of it a while: rattled.`, fx:()=>b101Rattle(b101Who())},
              go:'b10_c1_named_ok', fail:'b10_c1_named_no'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The burial lines', scene:'b10_c1_linesn', txt:
`The last trench is filled, and tamped, and the clerk has gone with his lamp and his slate. The burial lines are long low mounds in rows under the stars now, and nothing else.`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]}; },
    b10_c1_graves_seen:()=>({sp:'The burial lines', scene:'b10_c1_linesn', txt:
`The spoil slides under a boot, and the shuttered lamp in the trench goes dark at once, and three shapes come up out of the trench with knives in their hands instead of buckles.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c1_graves', {surprise:'e'})}]}),
    b10_c1_graves_after:()=>({sp:'The burial lines', scene:'b10_c1_linesn', fx:()=>{ S.f.b10_c1_gravesDone = 1; }, txt:
`The lines are quiet again. The robbers who could run have gone off into the dark toward the plain, and the one who could not is face down on a spoil heap, and stays there.

The Third goes down into the last trench with the shuttered lamp and puts back what was taken: a buckle, a ring, a pair of boots, the small things. It takes a while in the dark. ${b101Say({pruss:'Pruss does it with great care, matching each thing to its owner by the marks on the blanket, and does not get one wrong.', haddat:'Haddat does it with great care, and says a word to each of the dead as she puts their things back.', _:'Every soldier in the Third does it with more care than the robbers did.'})}

Up at the trestle, the clerk's lamp is burning again.`,
      ch:[{t:'The clerk, and the names.', go:'b10_c1_nightlines'}]}),
    b10_c1_named_ok:()=>({sp:'The burial lines', scene:'b10_c1_linesn', fx:()=>{ b101Named('said'); }, txt:
`${by({sgt:'You read', haddat:'Haddat reads', pruss:'Pruss reads', _:'{who} reads'})} from the slate by the clerk's lamp, every name, slowly, and for each one somebody in the Third says "here", because somebody has to. Then the Third's own names, and each answers for themselves. Then the earth goes in.

It takes most of what is left of the night. It is not hurried. When it is done, the clerk wipes his eyes with a chalky hand, and puts the slate in his satchel unwiped.${b101If('pruss', `\n\nAt the end, without being asked, Pruss says six more names, quietly, and answers for each of them himself. Then he ties the old helm back on his pack.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c1_named_no:()=>({sp:'The burial lines', scene:'b10_c1_linesn', fx:()=>{ b101Named('clerk'); }, txt:
`It goes wrong on the far side of the slate, where the chalk has smeared and the names run together in the lamplight, and nobody can read them, and the clerk takes the slate back gently and reads them himself, from memory, every one. The Third answers "here" for each.

Then the earth goes in. It takes most of what is left of the night.${b101If('pruss', `\n\nPruss says six more names at the end, quietly, and answers for them himself.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* ======== phase 3, 'water': the sappers' wells ======== */
    b10_c1_wells:()=>{ const ph = b101Ph();
      if (ph < 3 || b101Names()) return {sp:'The wells', scene:'b10_c1_wells', txt:
`Down in the dry wash east of the camp the sappers have sunk wells, shored with wagon-boards and stepped, and a lamp hangs over each. ${ph < 3 ? 'Sappers are still at them, digging deeper, in the dark.' : 'Thallo\'s heavies are in the chain tonight, passing buckets up the bank, and Thallo is at the top of it, counting.'}`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      if (!S.f.b10_c1_waterDone) return {sp:'The wells', scene:'b10_c1_wells', html:witnessHTML(), txt:
`The wells are in the bed of the wash, three of them, shored with wagon-boards and stepped down into the dark, with a sapper at the bottom of each filling buckets from a seep that comes in slower than anyone would like. A chain of soldiers runs up from each well to the bank, where the barrels are lashed on flat wagons and the skins hang in rows. Bucket up, bucket down, all night.

A sapper sergeant at the top of the middle chain sees the Third and points down. "Bottom of the chain," she says. "Where the weight is. Who's got the arms?"${b101If('pruss', `\n\nPruss is already climbing down the shoring. "Me," he says. "Bottom's mine."`)}${b101If('tangle', `\n\nTangle is looking at the wagons. "I'll count barrels," he says. "Someone should know how many." The squad lets him.`)}`,
        ch:[{t:'Take the bottom of the chain, where the bucket comes up full, and keep it coming all night.', check:['might', 19], req:()=>!S.f.b10_c1_chainTried, fx:()=>{ S.f.b10_c1_chainTried = 1; },
              edges:id=>[id === 'pruss' && ['four skins and a run, for a living', 2], id === 'brask' && ['heavies carry what nobody else will', 2], id === 'tegra' && ['her people have hauled water up out of the ground all their lives', 1], id === 'wenna' && ['she knows the rhythm of water drawn from a slow seep', 1], id === 'haddat' && ['she will not let it be done badly', 1], id === 'marrow' && ['she is not built for a well, child', -2], id === 'mehet' && ['a townsman, and slight', -1]],
              near:{t:()=>`Yes, but somewhere after midnight a full bucket comes up wrong on the rope, and ${b101Nm(b101Who())} ${b101V(b101Who(), 'take', 'takes')} it on the shoulder and the shoring both. ${b101Nmc(b101Who())}'ll feel that a while.`, fx:()=>bruise(b101Who(), bruiseN())},
              go:'b10_c1_wells_ok', fail:'b10_c1_wells_no'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The wells', scene:'b10_c1_wells', txt:
`The wells are quiet. The sappers have climbed out, and the chain has gone, and the barrels on the flat wagons are full and lashed, and the skins hang heavy in rows. A lamp still burns over the middle well, for nobody in particular.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]}; },
    b10_c1_wells_ok:()=>({sp:'The wells', scene:'b10_c1_wells', fx:()=>{ b101Water('kept'); }, txt:
`The bucket comes up full, and goes up the chain, and comes back empty, and goes down, and comes up full. It does that all night. ${by({sgt:'You keep it coming', pruss:'Pruss keeps it coming', brask:'Brask keeps it coming', _:'{who} keeps it coming'})} at the bottom of the middle well with the seep at your ankles, and the chain above never once has to wait.

By grey light every barrel on the middle wagon is full, and every skin on the Third's own rack, and two more that nobody claims. The sapper sergeant looks down the well. "Didn't stop," she says. "Not once." She writes something on a board. It might be the Third's name.${b101If('tangle', `\n\nTangle has counted every barrel on all three wagons twice. "Enough," he says, and then, more honestly: "For a while."`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c1_wells_no:()=>({sp:'The wells', scene:'b10_c1_wells', fx:()=>{ b101Water('slow'); }, txt:
`It goes well for an hour, and then the bottom of the chain falls behind, and the buckets come up half full, and the chain above stands waiting with its hands out. The sapper sergeant swaps the Third up the bank and puts two of her own at the bottom, and the Third passes buckets in the middle of the chain all night instead, which is harder than it sounds.

By grey light the barrels are full anyway. It took longer.${b101If('pruss', `\n\nPruss climbs out of the well last, soaked to the waist. "Should've been faster," he says, and nobody can talk him out of it.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* the way east at the night area's edge */
    b10_c1_east:()=>({sp:'The camp\'s edge', scene:'b10_camp_night', txt: b101Ph() === 3 && b101NightDone() ?
`The east edge of the camp, and beyond it the plain going away flat into the dark. ${b101South() ? 'The column will go out this way at dusk. The Third will not be in it: the Letherii wagons are at the south end of the camp.' : 'At dusk the column goes out this way, and does not come back.'}` :
`The east edge of the camp, and beyond it the plain going away flat into the dark, with nothing on it at all.${b101Ph() === 3 ? ' The Third has the night\'s work first.' : ''}`,
      ch: b101Ph() === 3 && b101NightDone() ? [{t:b101South() ? 'Dusk. Across the camp to the Letherii wagons.' : 'Dusk. East, with the column.', onward:true, go:'b10_c1_onward'},
                                               {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* ======== the Witness beat: at the fire after the night's work ======== */
    b10_c1_beat:()=>({sp:'The Third\'s fire', scene:'b10_camp_night', html:witnessHTML(), txt:
`The fire is nearly out, and nobody gets up to feed it. ${b101Names() ? 'Behind the squad the burial lines are long low mounds in the dark.' : 'Every skin the squad owns hangs full and heavy from the wagon tilt.'} East, past the camp's edge, there is nothing at all. The column marches into it at dusk.

${b101Say({haddat:'Haddat is looking at you across the embers. "Ask it," she says. "You are the sergeant."', tangle:'Tangle looks up from the satchel. "Go on," he says. "Ask it. I want to hear what I say."', pruss:'Pruss looks up from the helm. "Old sergeant used to ask it," he says. "Night before a long road. Go on."', _:'Somebody in the Third looks at you, waiting.'})}

Why are we still here?`,
      ch:[{t:'"Each other. That\'s why. Same as the stretch."', fx:()=>{ b10Beat('kept', 'for each other, at the burial lines'); S.f.b10_c1_beat = 'each'; }, go:'b10_c1_beat_done'},
          {t:'"Because she\'s on her feet, and she gave her word, whatever it is."', fx:()=>{ b10Beat('kept', 'the Adjunct\'s word, whatever it is'); S.f.b10_c1_beat = 'word'; }, go:'b10_c1_beat_done'},
          {t:'"Nobody\'s said. So nothing. We\'re here because the column is."', fx:()=>{ b10Beat('doubt', 'nobody has said'); S.f.b10_c1_beat = 'nothing'; }, go:'b10_c1_beat_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c1_beat_done:()=>{ const w = S.f.b10_c1_beat;
      return {sp:'The Third\'s fire', scene:'b10_camp_night', html:witnessHTML(), txt:
`${w === 'each' ? b101Say({haddat:'Haddat nods, once. "Each other," she says. "My mother would say that is enough. She said it about less."', marrow:'Marrow puts her hand on the nearest shoulder. "Each other, child," she says. "Always was."', pruss:'Pruss looks round the fire at the Third, one face at a time, as if learning a load. "Each other," he says. "All right. I can carry that."', _:'The Third shifts a little closer round the embers. Not much. Enough.'})
  : w === 'word' ? b101Say({tangle:'Tangle nods slowly. "Her word," he says. "Whatever it is." He thinks about it. "I\'ll take a word I don\'t know over no word at all. Mostly."', haddat:'Haddat nods. "Her word," she says. "My mother followed a general once on less." She does not say how that ended.', pruss:'Pruss nods. "She\'s on her feet," he says. "My da said: follow the one who gets up." He frowns. "He said it about a horse."', _:'Somebody at the fire says "her word" back, quietly, as if testing whether it would hold weight.'})
  : b101Say({tangle:'Tangle nods. "Honest," he says. "Here because the column is." He looks east. "Column\'s going a long way, though."', mirrel:'Mirrel goes on binding a foot that does not need binding.', pruss:'Pruss looks at the fire. "My lot said that," he says. "On the stretch."', _:'Somebody at the fire laughs, short, at a thing that is true and not funny.'})}${b101If('pruss', w !== 'nothing' ? `\n\nPruss sets the old helm down by the fire between his boots, and leaves it there, like one more of them sitting at the fire.` : '')}

The fire goes out. It can.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]}; },

    /* ======== the end: dusk, and the first night march ======== */
    b10_c1_onward:()=>({sp:b101South() ? 'The Letherii wagons' : 'The glass\'s edge', scene:b101South() ? 'b10_train' : 'b10_glass_night', html:witnessHTML(), txt: b101South() ?
`At dusk the camp comes apart into its two halves. The column forms up along the east edge without a lamp, the heavies with it, the wagons with their water, and somewhere out ahead of it, the soldiers say, the dead Imass. The allies' camps out on the plain are striking their tents and turning south.

The Third walks the other way. Across the camp, between the tents with gaps in their rows, to the Letherii wagons at the south end, where a Letherii officer with a ledger is waiting for the drill-sergeants he was promised and looks at the Third as if he had been promised more. ${b101Names() ? 'Behind it, the burial lines are long low mounds in rows, every name said.' : 'Every skin on the Third\'s backs is full, and the Letherii quartermaster looks at them with real envy.'}

Thallo walks with the Third as far as the last tent, and stops. "Long way round," he says. "Mind your feet." He holds out a thick hand, and then, because it seems wrong, takes it back and slaps the nearest shoulder instead.${b101If('pruss', `\n\nPruss looks back once at the column going east. "Long way round," he says. "Wagons, then. I know wagons."`)}${b101Say({haddat:'\n\nHaddat says the names of the dead under her breath as she walks, and at the end of them, a new word: <em>south</em>.', _:''})}` :
`At dusk the column moves. No lamps. The heavies march with it in their files, and the wagons roll with their barrels lashed, and somewhere out ahead of it, the soldiers say, walk the dead Imass, and the horse-folk come behind with their thin horses, and behind them the camp after the short-tails goes dark tent by tent, and the burial lines are long low mounds in the last of the light, every name on them written down.

The Third marches east with the heavies through the first night. The ground underfoot goes from dust to grit to something harder, and toward the end of the night the starlight starts to come back up off it.

At grey light the column halts on the edge of the glass. It goes away east, flat and pale and without a mark on it, to the end of the world. There is nothing to say about it that it does not say better.${b101If('pruss', `\n\nPruss stands at the edge of it with the old helm tied to his pack and looks at the wagons, and then at the beasts in their traces, and then at the glass. "Beasts die first," he says, very quietly. Then he goes to help with the traces.`)}${b101Say({haddat:'\n\nHaddat says the names of the dead under her breath, the long list, and at the end of it, a new word: <em>glass</em>.', marrow:'\n\nMarrow looks east at the glass with her knotted string in her fist. "Missing is not dead, child," she says. "Remember that out there."', _:''})}`,
      ch:[{t:b101South() ? 'South, the long way round.' : 'Into the glass.', onward:true, go:()=>chapterEnd(1, b101Key() || 'names')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* the names said, once, by either road through the check: the key's Witness (the brief: 'every name said') */
function b101Named(how){ if (S.f.b10_c1_named) return; S.f.b10_c1_named = how; b10Witness(1, 'every name said'); save(); }
/* the water detail done, once */
function b101Water(how){ if (S.f.b10_c1_waterDone) return; S.f.b10_c1_waterDone = how; save(); }
