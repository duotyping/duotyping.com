# duotyping.com — Agent Instructions

Shared instructions for any AI coding tool working in this repo. This file is the canonical source — tool-specific entry files (`CLAUDE.md`, `.github/copilot-instructions.md`, etc.) point here rather than forking this content.

## duotyping.com

The public website for DuoTyping, a writing assistant: Vue 3, Tailwind CSS 4 and Vite 8, prerendered to static HTML by `vite-ssg` and served as Cloudflare Workers static assets on the `duotyping.com` custom domain. It also serves the one file the Mac app reads from this origin, `/appcast.xml`. `README.md` says where everything is and how to deploy.

## Policy

- Never commit API tokens, deploy credentials or anything a visitor sent.
- `/appcast.xml` is part of the Mac app, not the site: it stays at that exact URL, answers 200 with no redirect, and never sits behind a bot challenge. The Mac's `make release` writes it.
- The privacy page, terms, promises and FAQ say only what the apps and the API actually do. They follow `duotyping-specs`' `product/mac-prd.md` and the specs they name, and change when those do.
- Keep `duotyping-specs` in step with the code: a change that alters what a document there describes updates it in the same piece of work -- `specs/site-analytics-consent.md` for analytics and consent, or the spec whose promise the copy states (its body, its Status line, and its row in that repo's `README.md`). Commit it to `duotyping-specs`, naming the commit it reflects.

## Where things are

- Pages: `src/pages/` (`Home.vue`, `Privacy.vue`, `Terms.vue`); the home page's sections: `src/sections/`, drawn from the design canvas ("DuoTyping Landing").
- `src/utils/site.ts`: the site's URLs and the appcast reader; `head.ts`: meta tags; `motion.ts`: Reduce Motion and `v-loop`; `consent.ts`: the analytics counters and the banner flag (`duotyping-specs/specs/site-analytics-consent.md`).
- `src/style.css` and `src/styles/`: brand tokens, type scale, components, the hero demo and the loops' keyframes.
- `public/_headers`: security headers and caching; `wrangler.jsonc`: the static-assets Worker.
- Plans, the product record and design boards: `duotyping-specs` (its `README.md` is the index).

## Running and verifying

- `npm install`, then `npm run dev`.
- `npm test`, `npm run typecheck` and `npm run build` must pass before a commit; `npm run preview` serves `dist/` with Cloudflare's own runtime.

## Conventions that differ from defaults

- No third-party requests except what `site-analytics-consent.md` allows: Cloudflare Web Analytics for everyone, Google Analytics only after Accept. Fonts stay self-hosted.
- Honour Reduce Motion: every loop and the hero demo show their final frame when motion is reduced.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>[optional scope]: <description>`, with the scope `site` as the log uses it.

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

- Description: imperative mood, lowercase, no trailing period.
- Breaking change: append `!` after type/scope (e.g. `feat!:`) and/or a `BREAKING CHANGE:` footer.
- Body (optional): explain why, not what.
