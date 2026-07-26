# Keerthi Kodithuwakku website

## Current live site (legacy WordPress export)

The repository root still contains a **static WordPress export** (Astra/Spectra HTML). Keep it as an archive / fallback copy — do **not** deploy it together with the Next.js app.

Production deploys must use **Root Directory = `web`** so only the new site is published.

## New site (production)

A full rebuild lives in **[`web/`](web/)** — Next.js 15 App Router, light professional UI, curated media.

See [`web/README.md`](web/README.md) for local setup, content editing, and Vercel cutover steps.

### Quick start (new site)

```bash
cd web
npm install
npm run dev
```

### Production cutover (after approval)

1. Set Vercel **Root Directory** to `web`
2. Remove or ignore the root static `vercel.json` for that project (Next.js uses its own build)
3. Redeploy and attach `keerthikodithuwakku.com`
