# Keerthi Kodithuwakku — Next.js site

Professional MedTech founder portfolio rebuilt with **Next.js 15 (App Router)**, TypeScript, Tailwind CSS 4, Framer Motion, and Lucide icons.

## Why this exists

The previous WordPress static export had outdated media, duplicates, and third-party hotlinked images. This app:

- Uses a **light / white** design system with brand orange `#f18200`
- Ships **curated** images only under `public/media/`
- Keeps the same core IA: Home, About, Services, Achievements, Blog, Contact

## Local development

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and add:
- Brevo keys for contact-form delivery
- `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/apikey) for the floating site assistant
to test locally.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Content

- Page copy: `src/lib/content.ts`, `src/lib/site.ts`
- Blog posts (MDX): `content/blog/*.mdx`
- Images: `public/media/{brand,portraits,gallery,news,awards,products}/`

## Media rules (quality bar)

- Do **not** add `i.ibb.co` or other hotlinks
- Do **not** dump raw WhatsApp / screenshot files without review
- Prefer HQ portraits and event photos already curated in `public/media`

## Vercel preview (for Rasindu)

1. In the Vercel project (or a new preview project), set **Root Directory** to `web`
2. Framework: Next.js (auto)
3. Add the Brevo and Gemini environment variables listed in `.env.example` to Preview and Production
4. Deploy — share the preview URL for approval
5. Submit one test inquiry and confirm delivery to `keerthi@jendoinnovations.com`
6. Open the floating “Ask Keerthi” chat and send a test question
7. After approval, point the production domain at this Next.js deployment

Until cutover, the repo root static WordPress export can remain the live site.

## Cutover checklist

- [ ] Rasindu visual + content approval
- [ ] Confirm contact email / phone / social URLs
- [ ] Verify the Brevo sender and configure `BREVO_API_KEY` / `BREVO_SENDER_EMAIL`
- [ ] Confirm a form submission reaches `keerthi@jendoinnovations.com`
- [ ] Add `GEMINI_API_KEY` (and optional `GEMINI_MODEL`) for the site chatbot
- [ ] Smoke-test the floating chat on mobile and desktop
- [ ] Set Vercel Root Directory → `web`
- [ ] DNS / domain switch
- [ ] Smoke-test all routes on production

## Brand tokens

```
--kk-bg: #ffffff
--kk-surface: #f7f7f7
--kk-ink: #0c0e0a
--kk-muted: #5b5b5b
--kk-accent: #f18200
--kk-accent-hover: #ff9c27
```
