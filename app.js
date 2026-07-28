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

// ── Agents ────────────────────────────────────────────────────────────────
// One list drives both the coverage grid and the install tabs, so the two can
// never drift apart. `via` names the mechanism — the first thing people ask is
// which of these is a real integration and which is a copied file.
var AGENTS = [
  { id: 'claude', name: 'Claude Code', via: 'Plugin marketplace',
    cmd: '/plugin marketplace add katareayush/video-captions\n/plugin install video-captions@katareayush',
    note: 'Run both lines inside Claude Code. Installs as a plugin, so it updates with the marketplace.' },

  { id: 'codex', name: 'Codex CLI', via: 'Agent Skills',
    cmd: 'python3 install.py --only agents',
    note: 'Lands in ~/.agents/skills, which Codex reads natively — it deprecated its own prompts format in favour of this standard.' },

  { id: 'gemini', name: 'Gemini CLI', via: 'Extension',
    cmd: 'gemini extensions install https://github.com/katareayush/video-captions',
    note: 'Installs as a native Gemini extension, and adds /captions to the slash menu.' },

  { id: 'copilot', name: 'GitHub Copilot', via: 'Agent Skills',
    cmd: 'python3 install.py --only agents',
    note: 'Shares the ~/.agents/skills directory with Codex, Cursor and OpenCode — install once, all four pick it up.' },

  { id: 'cursor', name: 'Cursor', via: 'Agent Skills',
    cmd: 'python3 install.py --only agents',
    note: 'Same shared directory. Ask in plain words; there is no rule file to configure.' },

  { id: 'windsurf', name: 'Windsurf', via: 'Agent Skills',
    cmd: 'python3 install.py --only windsurf',
    note: 'Windsurf keeps skills outside the shared directory, so it gets its own target.' },

  { id: 'opencode', name: 'OpenCode', via: 'Agent Skills',
    cmd: 'python3 install.py --only agents',
    note: 'Same shared ~/.agents/skills directory.' },

  { id: 'mcp', name: 'MCP hosts', via: 'MCP server',
    cmd: 'python3 install.py --mcp',
    note: 'For Zed, ChatGPT desktop, n8n and LM Studio — anything that speaks MCP but has no skills support. Prints a config block to paste, wired to a dependency-free stdio server.' },

  { id: 'project', name: 'One repo only', via: 'Project scope',
    cmd: 'python3 install.py --project',
    note: 'Writes ./.agents/skills so the skill travels with the repo instead of the machine. Commit it and your whole team gets it.' },

  { id: 'cli', name: 'No agent', via: 'Plain CLI',
    cmd: 'video-captions demo.mp4 --preset',
    note: 'Setup puts a launcher on your PATH, so it works standalone in any terminal.' }
];

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function pad(s, n) {
  while (s.length < n) s += ' ';
  return s;
}

(function () {
  // Coverage reads as one `install.py --list` run rather than ten cards — the
  // section is answering "which hosts, and by what mechanism", which is a listing.
  var out = document.getElementById('coverage-out');
  if (out) {
    var width = AGENTS.reduce(function (w, a) { return Math.max(w, a.name.length); }, 0) + 4;
    var rows = AGENTS.map(function (a) {
      return '  <span class="em">' + escapeHtml(pad(a.name, width)) + '</span>' +
             '<span class="out">' + escapeHtml(a.via) + '</span>';
    }).join('\n');
    out.innerHTML =
      '<span class="prompt">$</span> <span class="cmd">python3 install.py --list</span>\n\n' +
      '<span class="out">Supported agents:</span>\n\n' + rows + '\n\n' +
      '<span class="out">One SKILL.md serves every host above.</span>';
  }

  var tabs = document.getElementById('install-tabs');
  var panels = document.getElementById('install-panels');
  if (!tabs || !panels) return;

  function select(id) {
    AGENTS.forEach(function (a) {
      var on = a.id === id;
      document.getElementById('tab-' + a.id).setAttribute('aria-selected', on ? 'true' : 'false');
      document.getElementById('panel-' + a.id).hidden = !on;
    });
  }

  AGENTS.forEach(function (a, i) {
    var tab = document.createElement('button');
    tab.className = 'tab';
    tab.type = 'button';
    tab.id = 'tab-' + a.id;
    tab.textContent = a.name;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'panel-' + a.id);
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.addEventListener('click', function () { select(a.id); });
    tabs.appendChild(tab);

    var panel = document.createElement('div');
    panel.className = 'panel';
    panel.id = 'panel-' + a.id;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-' + a.id);
    panel.hidden = i !== 0;
    var lines = a.cmd.split('\n').map(function (line) {
      return '<span class="prompt">' + (a.id === 'claude' ? '❯' : '$') + '</span> ' +
             '<span class="cmd">' + escapeHtml(line) + '</span>';
    }).join('\n');

    panel.innerHTML =
      '<div class="term" data-copy>' +
        '<div class="term-bar">' +
          '<span class="dot"></span><span class="dot"></span><span class="dot"></span>' +
          '<span class="title">' + escapeHtml(a.name + ' · ' + a.via) + '</span>' +
          '<button class="copy">Copy</button>' +
        '</div>' +
        '<div class="term-body"><pre>' + lines + '</pre></div>' +
      '</div>' +
      '<p class="note">' + escapeHtml(a.note) + '</p>';
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
