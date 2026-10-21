/* ============ v6.9.2 the gods' sigils for Books Two and Three ============
   The painted set's six sigils (patrons/brisk, kettle, tuft, ohl, ellis, sgt) are drawn on the Patrons board (docs/art/Patrons.dc.html
   → 19c). The gods who answer only in Books Two to Four are drawn here, in the same frame: a dark disc, the gold ring, a black
   silhouette, pale accents, red eyes. Keyed by the squadmate whose god it is (PATRONS[id].sig or the id itself, 31_battle.js lose()). */
{
  const frame = (label, bg, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="${label}">
<circle cx="100" cy="100" r="98" fill="${bg}"></circle>
<circle cx="100" cy="100" r="92" fill="none" stroke="#c9a15a" stroke-opacity="0.55" stroke-width="1.5"></circle>
${body}</svg>`;
  /* Treach, the Tiger of Summer: the sergeant's god in Book Three (Fener does not answer this year) */
  ART['patrons/treach'] = frame('Sigil of Treach', '#1c1608', `
<path d="M100 44 L66 26 L58 72 Q40 96 50 130 Q66 164 100 170 Q134 164 150 130 Q160 96 142 72 L134 26 Z" fill="#0a0706"></path>
<path d="M72 40 L66 60 L80 56 Z" fill="#3a2418"></path><path d="M128 40 L134 60 L120 56 Z" fill="#3a2418"></path>
<g fill="#e8dcc2" opacity="0.85">
<path d="M100 66 L92 86 L100 82 L108 86 Z"></path>
<path d="M84 74 L72 96 L82 92 Z"></path><path d="M116 74 L128 96 L118 92 Z"></path>
<path d="M56 118 L72 122 L70 128 L58 126 Z"></path><path d="M144 118 L128 122 L130 128 L142 126 Z"></path>
<path d="M62 134 L76 134 L74 140 L64 140 Z"></path><path d="M138 134 L124 134 L126 140 L136 140 Z"></path>
</g>
<path d="M84 140 Q100 132 116 140 Q114 156 100 158 Q86 156 84 140 Z" fill="#e8dcc2" opacity="0.9"></path>
<path d="M94 140 Q100 136 106 140 L100 148 Z" fill="#2a1a14"></path>
<g class="pt-eyes" fill="#e0a030"><path d="M70 106 Q82 98 92 106 Q82 112 70 106 Z"></path><path d="M130 106 Q118 98 108 106 Q118 112 130 106 Z"></path></g>
<circle cx="81" cy="106" r="2.2" fill="#0a0706"></circle><circle cx="119" cy="106" r="2.2" fill="#0a0706"></circle>`);
  /* the spirits of the Wickan plains (Sathi): a horse of the clans over the grass, and the cold that comes up out of the earth */
  ART['patrons/sathi'] = frame('Sigil of the Wickan spirits', '#171410', `
<circle class="pt-pulse" cx="100" cy="104" r="62" fill="#bfe8ff" opacity="0.08"></circle>
<path d="M44 108 L62 96 L92 84 L118 74 L124 54 L132 70 L144 60 L146 80 Q154 96 150 114 L148 166 L104 166 L100 134 Q90 126 72 128 L56 128 Q42 122 44 108 Z" fill="#0a0706"></path>
<path d="M118 74 Q140 70 150 100 Q144 86 130 84 Z" fill="#2a2420"></path>
<path d="M48 112 Q52 118 58 116 Q54 110 48 112 Z" fill="#2a1a14"></path>
<g class="pt-eyes"><circle cx="110" cy="94" r="3.4" fill="#c94a2a"></circle></g>
<g stroke="#e8dcc2" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="round" fill="none">
<path d="M34 164 L38 148"></path><path d="M48 166 L54 146"></path><path d="M164 162 L160 148"></path><path d="M172 158 L170 150"></path>
</g>
<path d="M28 168 Q100 174 172 168" stroke="#e8dcc2" stroke-opacity="0.5" stroke-width="2" fill="none"></path>`);
  /* the Queen of Dreams (Ramin): a closed eye under a thin moon; the fight goes far away */
  ART['patrons/redblade'] = frame('Sigil of the Queen of Dreams', '#0e0c1c', `
<circle class="pt-pulse" cx="100" cy="110" r="54" fill="#7a8ae0" opacity="0.12"></circle>
<path d="M126 44 Q154 52 156 84 Q152 66 130 58 Q118 56 108 62 Q112 48 126 44 Z" fill="#c9d4ff" opacity="0.5"></path>
<path d="M46 108 Q100 150 154 108" stroke="#c9d4ff" stroke-width="5" stroke-linecap="round" fill="none"></path>
<g stroke="#c9d4ff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9">
<path d="M62 118 L56 130"></path><path d="M78 130 L75 143"></path><path d="M100 136 L100 150"></path><path d="M122 130 L125 143"></path><path d="M138 118 L144 130"></path>
</g>
<g class="pt-eyes" fill="#c9d4ff" opacity="0.5"><circle cx="70" cy="74" r="1.6"></circle><circle cx="92" cy="60" r="1.2"></circle><circle cx="58" cy="92" r="1.2"></circle><circle cx="150" cy="130" r="1.4"></circle></g>`);
  /* the grandmother, the dead of the Foolish Dog (Keth): a dog of the clan, and two fingers put to the ground */
  ART['patrons/warlock'] = frame('Sigil of the dead of the Foolish Dog', '#141210', `
<path d="M46 92 L58 84 L82 76 L86 54 L98 72 L106 58 L110 78 Q120 86 114 100 L104 106 Q116 118 122 136 Q128 148 136 138 Q142 126 136 116 Q150 124 148 146 Q144 164 126 164 L116 164 L112 150 L104 164 L74 164 L70 128 Q62 118 60 106 L48 102 Z" fill="#0a0706"></path>
<path d="M48 96 Q54 100 60 98 Q56 92 48 96 Z" fill="#2a1a14"></path>
<g class="pt-eyes"><circle cx="90" cy="86" r="3.2" fill="#c94a2a"></circle></g>
<g fill="#e8dcc2" opacity="0.85"><ellipse cx="36" cy="162" rx="5" ry="2.6"></ellipse><ellipse cx="48" cy="164" rx="5" ry="2.6"></ellipse></g>
<path d="M26 170 Q100 178 174 170" stroke="#e8dcc2" stroke-opacity="0.45" stroke-width="2" fill="none"></path>`);
  /* the spirits of the Rhivi herds (Sohra): the bhederin, horned, over the plain's grass */
  ART['patrons/sohra'] = frame('Sigil of the Rhivi spirits', '#141a10', `
<path d="M60 88 Q58 56 100 52 Q142 56 140 88 Q150 110 140 134 Q128 158 100 164 Q72 158 60 134 Q50 110 60 88 Z" fill="#0a0706"></path>
<path d="M62 86 Q44 80 36 62 Q40 84 56 96 Z" fill="#0a0706"></path><path d="M138 86 Q156 80 164 62 Q160 84 144 96 Z" fill="#0a0706"></path>
<path d="M36 62 Q42 54 50 58 Q44 60 44 68 Z" fill="#e8dcc2" opacity="0.85"></path><path d="M164 62 Q158 54 150 58 Q156 60 156 68 Z" fill="#e8dcc2" opacity="0.85"></path>
<path d="M78 66 Q100 50 122 66 Q118 74 100 70 Q82 74 78 66 Z" fill="#2a2420"></path>
<path d="M84 138 Q100 132 116 138 Q114 154 100 158 Q86 154 84 138 Z" fill="#2a2420"></path>
<g class="pt-eyes"><circle cx="80" cy="104" r="3.4" fill="#c94a2a"></circle><circle cx="120" cy="104" r="3.4" fill="#c94a2a"></circle></g>
<g stroke="#e8dcc2" stroke-opacity="0.75" stroke-width="2.5" stroke-linecap="round" fill="none">
<path d="M36 164 L42 148"></path><path d="M50 168 L54 154"></path><path d="M150 168 L146 154"></path><path d="M162 164 L158 150"></path>
</g>`);
  /* Togg and Fanderay, the Wolves of Winter (Dannet): two wolves, and the one star of the cold */
  ART['patrons/greysword'] = frame('Sigil of Togg and Fanderay', '#0c1018', `
<circle class="pt-pulse" cx="100" cy="52" r="24" fill="#c9d4ff" opacity="0.12"></circle>
<path d="M100 36 L104 48 L116 50 L106 58 L109 70 L100 63 L91 70 L94 58 L84 50 L96 48 Z" fill="#e8dcc2" opacity="0.9"></path>
<path d="M36 156 L42 100 L54 78 L50 56 L66 74 L82 80 L100 98 L98 110 L82 114 L72 124 L66 156 Z" fill="#0a0706"></path>
<path d="M164 156 L158 100 L146 78 L150 56 L134 74 L118 80 L100 98 L102 110 L118 114 L128 124 L134 156 Z" fill="#0a0706"></path>
<path d="M96 100 L100 98 L98 106 Z" fill="#2a2420"></path><path d="M104 100 L100 98 L102 106 Z" fill="#2a2420"></path>
<g class="pt-eyes" fill="#c9d4ff"><ellipse cx="68" cy="90" rx="4.2" ry="2.4"></ellipse><ellipse cx="132" cy="90" rx="4.2" ry="2.4"></ellipse></g>
<path d="M28 162 Q100 170 172 162" stroke="#c9d4ff" stroke-opacity="0.35" stroke-width="2" fill="none"></path>`);
  /* v7.0, Book Four. D'rek, the Worm of Autumn (Hessa): the worm coiled through a fallen leaf, turned earth under it */
  ART['patrons/hessa'] = frame('Sigil of D\'rek, the Worm of Autumn', '#16130c', `
<circle class="pt-pulse" cx="100" cy="104" r="58" fill="#c9a050" opacity="0.08"></circle>
<path d="M100 40 Q148 58 152 104 Q150 142 108 166 L100 172 L92 166 Q50 142 48 104 Q52 58 100 40 Z" fill="#0a0706"></path>
<path d="M100 48 L100 164" stroke="#2a2418" stroke-width="3"></path>
<g stroke="#2a2418" stroke-width="2" fill="none"><path d="M100 76 L126 62"></path><path d="M100 98 L136 86"></path><path d="M100 120 L134 112"></path><path d="M100 76 L74 62"></path><path d="M100 98 L64 86"></path><path d="M100 120 L66 112"></path></g>
<path d="M60 130 Q70 104 96 110 Q122 116 118 92 Q114 70 90 76 Q70 82 78 98" stroke="#e8dcc2" stroke-opacity="0.88" stroke-width="7" stroke-linecap="round" fill="none"></path>
<path d="M60 130 Q70 104 96 110 Q122 116 118 92 Q114 70 90 76 Q70 82 78 98" stroke="#0a0706" stroke-opacity="0.5" stroke-width="1.2" stroke-dasharray="2 4" fill="none"></path>
<g class="pt-eyes"><circle cx="80" cy="98" r="2.6" fill="#c94a2a"></circle></g>
<g fill="#e8dcc2" opacity="0.55"><ellipse cx="44" cy="170" rx="6" ry="2"></ellipse><ellipse cx="62" cy="174" rx="4" ry="1.6"></ellipse><ellipse cx="148" cy="172" rx="5" ry="1.8"></ellipse></g>
<path d="M26 176 Q100 182 174 176" stroke="#e8dcc2" stroke-opacity="0.4" stroke-width="2" fill="none"></path>`);
  /* the dead of the Khundryl Burned Tears (Orvas): a black tear under an eye that is not there, and a rider's horse-tail behind it */
  ART['patrons/orvas'] = frame('Sigil of the Khundryl dead', '#14100e', `
<circle class="pt-pulse" cx="100" cy="100" r="60" fill="#c94a2a" opacity="0.07"></circle>
<path d="M136 40 Q158 70 150 110 Q146 136 160 160 Q138 150 132 118 Q128 84 136 40 Z" fill="#2a2420"></path>
<path d="M58 78 Q100 58 142 78 Q100 92 58 78 Z" fill="#0a0706"></path>
<g class="pt-eyes"><ellipse cx="100" cy="77" rx="9" ry="3" fill="#c94a2a"></ellipse></g>
<path d="M100 92 Q122 126 118 146 Q114 168 100 170 Q86 168 82 146 Q78 126 100 92 Z" fill="#0a0706"></path>
<path d="M92 132 Q90 148 98 160" stroke="#e8dcc2" stroke-opacity="0.55" stroke-width="2.5" stroke-linecap="round" fill="none"></path>
<g stroke="#e8dcc2" stroke-opacity="0.7" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M60 92 L56 108"></path><path d="M72 96 L70 114"></path><path d="M140 92 L144 108"></path></g>
<path d="M28 168 Q100 176 172 168" stroke="#e8dcc2" stroke-opacity="0.4" stroke-width="2" fill="none"></path>`);
}
