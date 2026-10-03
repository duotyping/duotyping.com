# duotyping.com

The website for [DuoTyping](https://duotyping.com), the private writing assistant for Mac — and
the two files the app itself reads from this origin.

Vue 3, Tailwind CSS 4 and Vite 8, prerendered to static HTML by `vite-ssg` and served by
Cloudflare Workers static assets. No analytics, no cookies, no third-party requests: the fonts
are self-hosted.

## Develop

```sh
npm install
npm run dev       # Vite dev server
npm test          # the appcast parser's check
npm run typecheck # vue-tsc over every .ts and .vue file, templates included
npm run build     # type-check, then prerender to dist/
npm run preview   # build, then serve dist/ with Cloudflare's own runtime (wrangler dev)
```

Where things are:

- `src/pages/Home.vue` — the page's head and search data, then its sections in order.
- `src/utils/` — `site.ts` (the site's URLs and the appcast reader), `head.ts` (every page's
  meta tags), `motion.ts` (Reduce Motion and `v-loop`).
- `src/sections/` — one file per section of the home page, with its copy, from the design canvas
  ("DuoTyping Landing"): 1440 px desktop and 390 px phone boards, fluid in between.
- `src/style.css` — the brand tokens (colours, type), the fluid type scale, and the legal, FAQ
  and menu rules; it imports `src/styles/`: the shared components, the hero demo, and the figure
  loops' keyframes.
- `src/components/demo/HeroDemo.vue`, `HeroDemoPhone.vue` — the hero motion, timed to the
  "Hero motion" board. Reduced motion shows each one's final frame.
- The figure loops (marks, Rewrite, Whole selection, writing profile, the privacy flow, the FAQ
  drawing) are CSS keyframes in `src/styles/loops.css`, timed to the desktop boards; `src/utils/motion.ts`
  (`v-loop`) starts each one as it scrolls into view and pauses it off screen.
- `src/components/demo/` — the Mac UI the illustrations draw, in the system font.
- `src/components/brand/` — the pencils, the lockup, the app icon and the menu-bar mark.
- `src/pages/Privacy.vue`, `Terms.vue` — linked from every Settings tab in the app.

## What the app reads from here

Two files in `public/` are part of the app, not the site. Both must stay at their exact URLs,
return 200 with no redirect, and never sit behind a bot challenge (Bot Fight Mode, Under Attack
mode, a WAF challenge rule) — the app is not a browser and can't solve one.

| URL | Written by | Notes |
|---|---|---|
| `/models.json` | copied from `catalog/models.json` in the app repo | The signed model catalog. The app refuses it once `payload.expiresAt` passes, so re-sign and copy it here before then. |
| `/appcast.xml` | `make release` in the app repo | The Sparkle update feed. The Download button reads the latest disk image from it at build time. |

Before the first release there is no appcast, and the Download button falls back to this repo's
releases page. Release disk images are attached to this repo's GitHub releases, so the repo has to
be public for visitors to download them.

## Deploy

`wrangler.jsonc` serves `dist/` on the `duotyping.com` custom domain (the zone must be in the same
Cloudflare account); workers.dev is off so there's only one origin.

- **On every push (recommended):** connect this repo in Cloudflare → Workers & Pages → the
  `duotyping-com` Worker → Settings → Builds, with build command `npm run build` and deploy command
  `npx wrangler deploy`. The app's release pipeline pushes `public/appcast.xml` here, so a release
  only goes live if pushes deploy.
- **By hand:** `npx wrangler login` once, then `npm run deploy`.
- **www:** add a proxied `www` DNS record and a Redirect Rule from `www.duotyping.com/*` to
  `https://duotyping.com/${1}` (the dashboard's "Redirect from WWW to root" template).

`public/_headers` sets the security headers, caches `/assets/*` for a year (Vite fingerprints
them) and makes `/models.json` and `/appcast.xml` revalidate on every fetch.
