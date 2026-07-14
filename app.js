// ── Theme toggle ──────────────────────────────────────────────────────────
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');

  var SUN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';

  function paint() { btn.innerHTML = root.classList.contains('dark') ? SUN : MOON; }

  function set(theme) {
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    paint();
  }

  paint();
  btn.addEventListener('click', function () {
    set(root.classList.contains('dark') ? 'light' : 'dark');
  });
})();

// ── Navbar shadow on scroll ───────────────────────────────────────────────
(function () {
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 20); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── Copy buttons ──────────────────────────────────────────────────────────
document.querySelectorAll('.code[data-copy]').forEach(function (block) {
  var btn = block.querySelector('.copy');
  var pre = block.querySelector('pre');
  if (!btn || !pre) return;
  btn.addEventListener('click', function () {
    navigator.clipboard.writeText(pre.innerText.trim()).then(function () {
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
    });
  });
});

// ── Reveal on scroll ──────────────────────────────────────────────────────
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// ── Year ──────────────────────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
