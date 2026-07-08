# toolkit

toolkit.alexischao.com — a personal cheat sheet of security tools and commands, built up during CySA+ study and beyond.

Static Vite + React site. No backend, no database, no auth — just a card list of tools/commands read from a JSON file at build time.

## How the data pipeline works

Tools live as a markdown table in my Obsidian vault at `~/vault/Toolkit.md`, with columns:

```
tool | category | command | description | example | tags
```

The shared `vault-sync` script (in the sibling `vault-sync/` repo) has a `toolkit` job configured in `sync.config.json` that reads that table and overwrites `src/data/toolkit.json` in this repo. Empty cells become `null`.

`vault-sync` has no array column type, so `tags` always arrives as a comma-separated string (e.g. `"nmap,scanning,recon"`) or `null`. The frontend (`src/App.jsx`) splits it into an array — don't try to write JSON arrays into the vault table.

**To add a tool:** add a row to the table in `Toolkit.md` in Obsidian, then run the vault-sync `toolkit` job. It will overwrite `src/data/toolkit.json`. Commit and push the resulting diff.

## How deploy works

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the Vite app and publishes `dist/` to GitHub Pages. The custom domain is pinned via `public/CNAME` (`toolkit.alexischao.com`), which Vite copies into `dist/` on build.

## Local development

```bash
npm install
npm run dev
```

## Design system

This site links the shared theme stylesheet from `https://alexischao.com/theme.css` rather than bundling a local copy — it defines the rose color scale (`--c1`–`--c9`), fonts, radii, and shadows used across all `*.alexischao.com` sites. No hardcoded colors in this repo; everything references the shared CSS custom properties.
