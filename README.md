# video-captions — docs site

Landing / documentation page for the [**video-captions**](https://github.com/katareayush/video-captions)
Claude Code plugin. Plain static site (no build step), styled to match
[katareayush.com](https://katareayush.com).

- `index.html` — the page
- `styles.css` — design tokens + styles (mirrors the portfolio: Cormorant Garamond headings,
  Space Grotesk body, JetBrains/Fira Mono labels, light/dark)
- `app.js` — theme toggle, scroll effects, copy buttons

## Preview locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Vercel

1. Push this repo to GitHub (done: `katareayush/video-captions-docs`).
2. In Vercel → **Add New → Project → Import** this repo.
3. Framework Preset: **Other**. Build Command: *(empty)*. Output Directory: *(empty / `.`)*.
   It's static, so there's nothing to build.
4. Deploy.

## Custom subdomain

1. Vercel → Project → **Settings → Domains → Add** `video-captions.katareayush.com`
   (or any subdomain you prefer).
2. In your DNS (wherever `katareayush.com` is managed), add the record Vercel shows —
   typically a **CNAME** `video-captions` → `cname.vercel-dns.com`.
3. Once it verifies, the page is live at your subdomain. Use that URL as the plugin's
   **homepage** in the community-marketplace submission.

> If you pick a different subdomain, update the homepage URL in the plugin's
> `plugin.json` / `marketplace.json` to match.
