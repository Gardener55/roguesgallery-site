/* The Rogue's Gallery — site interactions
   Progressive enhancement only: the site is fully usable without this file.
   See WEBSITE_THEME.md ("Motion & Interaction"). */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal — fade + rise elements tagged .reveal as they enter view,
  // with a light stagger between siblings in the same container.
  (function () {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var counters = new Map();
    items.forEach(function (el) {
      var p = el.parentElement;
      var i = counters.get(p) || 0;
      counters.set(p, i + 1);
      el.style.transitionDelay = Math.min(i * 55, 330) + 'ms';
    });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();

  // Cursor-following spotlight on game tiles — sets --mx/--my consumed by CSS.
  (function () {
    document.querySelectorAll('.games-grid .game-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '0%');
      });
    });
  })();
})();
