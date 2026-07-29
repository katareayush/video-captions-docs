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

// Brand marks. Claude Code + Gemini CLI carry real brand colour; the rest are
// monochrome brands (OpenAI, Copilot, Cursor, Windsurf, opencode, Zed are black
// by design), so they inherit currentColor and flip with the theme.
// Sources: lobehub/lobe-icons (MIT), simple-icons (CC0).
var LOGOS = {
  claude: { color: true, svg: '<path clip-rule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fill="#D97757" fill-rule="evenodd"></path>' },
  openai: { color: false, svg: '<path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"></path>' },
  gemini: { color: true, svg: '<path d="M0 4.391A4.391 4.391 0 014.391 0h15.217A4.391 4.391 0 0124 4.391v15.217A4.391 4.391 0 0119.608 24H4.391A4.391 4.391 0 010 19.608V4.391z" fill="url(#vc-gemini-g)"></path><path clip-rule="evenodd" d="M19.74 1.444a2.816 2.816 0 012.816 2.816v15.48a2.816 2.816 0 01-2.816 2.816H4.26a2.816 2.816 0 01-2.816-2.816V4.26A2.816 2.816 0 014.26 1.444h15.48zM7.236 8.564l7.752 3.728-7.752 3.727v2.802l9.557-4.596v-3.866L7.236 5.763v2.801z" fill="#1E1E2E" fill-rule="evenodd"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="vc-gemini-g" x1="24" x2="0" y1="6.587" y2="16.494"><stop stop-color="#EE4D5D"></stop><stop offset=".328" stop-color="#B381DD"></stop><stop offset=".476" stop-color="#207CFE"></stop></linearGradient></defs>' },
  copilot: { color: false, svg: '<path d="M19.245 5.364c1.322 1.36 1.877 3.216 2.11 5.817.622 0 1.2.135 1.592.654l.73.964c.21.278.323.61.323.955v2.62c0 .339-.173.669-.453.868C20.239 19.602 16.157 21.5 12 21.5c-4.6 0-9.205-2.583-11.547-4.258-.28-.2-.452-.53-.453-.868v-2.62c0-.345.113-.679.321-.956l.73-.963c.392-.517.974-.654 1.593-.654l.029-.297c.25-2.446.81-4.213 2.082-5.52 2.461-2.54 5.71-2.851 7.146-2.864h.198c1.436.013 4.685.323 7.146 2.864zm-7.244 4.328c-.284 0-.613.016-.962.05-.123.447-.305.85-.57 1.108-1.05 1.023-2.316 1.18-2.994 1.18-.638 0-1.306-.13-1.851-.464-.516.165-1.012.403-1.044.996a65.882 65.882 0 00-.063 2.884l-.002.48c-.002.563-.005 1.126-.013 1.69.002.326.204.63.51.765 2.482 1.102 4.83 1.657 6.99 1.657 2.156 0 4.504-.555 6.985-1.657a.854.854 0 00.51-.766c.03-1.682.006-3.372-.076-5.053-.031-.596-.528-.83-1.046-.996-.546.333-1.212.464-1.85.464-.677 0-1.942-.157-2.993-1.18-.266-.258-.447-.661-.57-1.108-.32-.032-.64-.049-.96-.05zm-2.525 4.013c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zm5 0c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zM7.635 5.087c-1.05.102-1.935.438-2.385.906-.975 1.037-.765 3.668-.21 4.224.405.394 1.17.657 1.995.657h.09c.649-.013 1.785-.176 2.73-1.11.435-.41.705-1.433.675-2.47-.03-.834-.27-1.52-.63-1.813-.39-.336-1.275-.482-2.265-.394zm6.465.394c-.36.292-.6.98-.63 1.813-.03 1.037.24 2.06.675 2.47.968.957 2.136 1.104 2.776 1.11h.044c.825 0 1.59-.263 1.995-.657.555-.556.765-3.187-.21-4.224-.45-.468-1.335-.804-2.385-.906-.99-.088-1.875.058-2.265.394zM12 7.615c-.24 0-.525.015-.84.044.03.16.045.336.06.526l-.001.159a2.94 2.94 0 01-.014.25c.225-.022.425-.027.612-.028h.366c.187 0 .387.006.612.028-.015-.146-.015-.277-.015-.409.015-.19.03-.365.06-.526a9.29 9.29 0 00-.84-.044z"></path>' },
  cursor: { color: false, svg: '<path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"></path>' },
  windsurf: { color: false, svg: '<path clip-rule="evenodd" d="M23.78 5.004h-.228a2.187 2.187 0 00-2.18 2.196v4.912c0 .98-.804 1.775-1.76 1.775a1.818 1.818 0 01-1.472-.773L13.168 5.95a2.197 2.197 0 00-1.81-.95c-1.134 0-2.154.972-2.154 2.173v4.94c0 .98-.797 1.775-1.76 1.775-.57 0-1.136-.289-1.472-.773L.408 5.098C.282 4.918 0 5.007 0 5.228v4.284c0 .216.066.426.188.604l5.475 7.889c.324.466.8.812 1.351.938 1.377.316 2.645-.754 2.645-2.117V11.89c0-.98.787-1.775 1.76-1.775h.002c.586 0 1.135.288 1.472.773l4.972 7.163a2.15 2.15 0 001.81.95c1.158 0 2.151-.973 2.151-2.173v-4.939c0-.98.787-1.775 1.76-1.775h.194c.122 0 .22-.1.22-.222V5.225a.221.221 0 00-.22-.222z"></path>' },
  opencode: { color: false, svg: '<path d="M16 6H8v12h8V6zm4 16H4V2h16v20z"></path>' },
  zed: { color: true, svg: '<path fill="#084CCF" d="M2.25 1.5a.75.75 0 0 0-.75.75v16.5H0V2.25A2.25 2.25 0 0 1 2.25 0h20.095c1.002 0 1.504 1.212.795 1.92L10.764 14.298h3.486V12.75h1.5v1.922a1.125 1.125 0 0 1-1.125 1.125H9.264l-2.578 2.578h11.689V9h1.5v9.375a1.5 1.5 0 0 1-1.5 1.5H5.185L2.562 22.5H21.75a.75.75 0 0 0 .75-.75V5.25H24v16.5A2.25 2.25 0 0 1 21.75 24H1.655C.653 24 .151 22.788.86 22.08L13.19 9.75H9.75v1.5h-1.5V9.375A1.125 1.125 0 0 1 9.375 8.25h5.314l2.625-2.625H5.625V15h-1.5V5.625a1.5 1.5 0 0 1 1.5-1.5h13.19L21.438 1.5z"/>' },
};

// Agents this runs in. Each `logo` is a LOGOS key.
var SUPPORTED = [
  { name: 'Claude Code', logo: 'claude' },
  { name: 'Codex',       logo: 'openai' },
  { name: 'Gemini CLI',  logo: 'gemini' },
  { name: 'Copilot',     logo: 'copilot' },
  { name: 'Cursor',      logo: 'cursor' },
  { name: 'Windsurf',    logo: 'windsurf' },
  { name: 'OpenCode',    logo: 'opencode' },
  { name: 'Zed',         logo: 'zed' }
];

var INSTALL = 'curl -fsSL https://raw.githubusercontent.com/katareayush/video-captions/main/install.py | python3';

// Only the cases the hero command does not already cover.
var VARIANTS = [
  { id: 'claude', name: 'Claude Code', title: 'inside Claude Code', glyph: '\u276f',
    cmd: '/plugin marketplace add katareayush/video-captions\n/plugin install video-captions@katareayush',
    note: 'Optional. Installs as a plugin instead, so it updates with the marketplace.' },

  { id: 'gemini', name: 'Gemini CLI', title: 'bash', glyph: '$',
    cmd: 'gemini extensions install https://github.com/katareayush/video-captions',
    note: 'Installs as a native Gemini extension and adds /captions to the slash menu.' },

  { id: 'mcp', name: 'MCP hosts', title: 'bash', glyph: '$',
    cmd: INSTALL + ' - --mcp',
    note: 'For Zed, ChatGPT desktop, n8n and LM Studio. Prints a config block to paste.' },

  { id: 'project', name: 'One repo only', title: 'bash', glyph: '$',
    cmd: INSTALL + ' - --project',
    note: 'Writes ./.agents/skills so the skill travels with the repo. Commit it and your team gets it.' }
];

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

(function () {
  var row = document.getElementById('logos');
  if (row) {
    SUPPORTED.forEach(function (a) {
      var mark = LOGOS[a.logo];
      var item = document.createElement('span');
      item.className = 'logo' + (mark.color ? ' logo-color' : '');
      item.title = a.name;
      item.innerHTML =
        '<svg viewBox="0 0 24 24" role="img" aria-label="' + escapeHtml(a.name) + '">' +
        mark.svg + '</svg>';
      row.appendChild(item);
    });
  }

  var tabs = document.getElementById('install-tabs');
  var panels = document.getElementById('install-panels');
  if (!tabs || !panels) return;

  function select(id) {
    VARIANTS.forEach(function (v) {
      var on = v.id === id;
      document.getElementById('tab-' + v.id).setAttribute('aria-selected', on ? 'true' : 'false');
      document.getElementById('panel-' + v.id).hidden = !on;
    });
  }

  VARIANTS.forEach(function (v, i) {
    var tab = document.createElement('button');
    tab.className = 'tab';
    tab.type = 'button';
    tab.id = 'tab-' + v.id;
    tab.textContent = v.name;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'panel-' + v.id);
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.addEventListener('click', function () { select(v.id); });
    tabs.appendChild(tab);

    var lines = v.cmd.split('\n').map(function (line) {
      return '<span class="prompt">' + v.glyph + '</span> <span class="cmd">' + escapeHtml(line) + '</span>';
    }).join('\n');

    var panel = document.createElement('div');
    panel.className = 'panel';
    panel.id = 'panel-' + v.id;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-' + v.id);
    panel.hidden = i !== 0;
    panel.innerHTML =
      '<div class="term" data-copy>' +
        '<div class="term-bar">' +
          '<span class="dot"></span><span class="dot"></span><span class="dot"></span>' +
          '<span class="title">' + escapeHtml(v.title) + '</span>' +
          '<button class="copy">Copy</button>' +
        '</div>' +
        '<div class="term-body"><pre>' + lines + '</pre></div>' +
      '</div>' +
      '<p class="note">' + escapeHtml(v.note) + '</p>';
    panels.appendChild(panel);
  });
})();

// ── Copy buttons ──────────────────────────────────────────────────────────
// Delegated, so the panels built above are covered without re-binding.
document.addEventListener('click', function (e) {
  var btn = e.target.closest('[data-copy] .copy');
  if (!btn) return;
  var block = btn.closest('[data-copy]');
  var pre = block && block.querySelector('pre');
  if (!pre) return;

  // Copy what you would actually type: prompt glyphs stripped, sample output
  // left behind. Blocks with no prompt (plain snippets) copy whole.
  var commands = pre.innerText.split('\n').filter(function (line) {
    return /^\s*[$❯]\s/.test(line);
  });
  var text = commands.length
    ? commands.map(function (l) { return l.replace(/^\s*[$❯]\s?/, ''); }).join('\n')
    : pre.innerText;

  navigator.clipboard.writeText(text.trim()).then(function () {
    btn.textContent = 'Copied';
    setTimeout(function () { btn.textContent = 'Copy'; }, 1400);
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
