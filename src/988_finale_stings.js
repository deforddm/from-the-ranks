/* ============ the finale's stingers (series polish §4, the sound pass) ============ */
/* Every book from Six on wraps showFinale in its own file; this wraps them all (it loads after Book Ten), so it sees every page that
   opens. A book's finale opening from anywhere else plays the finale sting (the theme's last four notes and a bell); Book Ten's last
   page, "The end of the series", plays the coda (the whole theme, slowly, Book Ten's voice with Book One's flute answering). */
{ const _sf = showFinale;
  showFinale = function(i = 0){ const was = view, before = S ? S.finPage : null, r = _sf(i);
    try { if (view === 'finale' && S) { const pg = finPages()[S.finPage] || {};
      if (pg.k === 'b10credits') { if (was !== 'finale' || before !== S.finPage) AUDIO.play('coda'); }
      else if (was !== 'finale') AUDIO.play('finale'); } } catch(e) {}
    return r; }; }
