# Project context — magnetic-creator

## Host integration

- **Stack:** Next.js App Router, Tailwind, shared `EbookLanding` + section components under `src/components/landings/ebook/`.
- **Route:** `/[lang]/magnetic-creator` via `src/app/[lang]/[landingSlug]/page.tsx` and `ALLOWED_LANDING_SLUGS`.
- **Copy:** `src/dictionaries/landings/magnetic-creator/{en,es}.json` loaded by `ebookLandingCopy.ts`.
- **Env triplet:** `NEXT_PUBLIC_LAUNCH_MAGNETIC_CREATOR_CHECKOUT_URL`, `NEXT_PUBLIC_LAUNCH_MAGNETIC_CREATOR_PRICE_USD`, `NEXT_PUBLIC_LAUNCH_MAGNETIC_CREATOR_TIME_TO_RESULT`.
- **Assets:** `public/launch-assets/magnetic-creator/` (initially duplicated from `discover-your-character` for placeholders; replace with Creadora Magnética–specific art when ready).
- **Theme:** Scoped CSS in `src/styles/globals.css` under `[data-landing-slug="magnetic-creator"]` — Cherry / Vanilla / Butter / Columbia (see `launches/magnetic-creator/brief.md`).
- **Palette reference image:** `launches/magnetic-creator/assets/palette-pinterest-2025-moodboard.png` (design QA only; not required by runtime components).

## Reuse vs custom

- **Reuse:** All ebook section components (`EbookHeroSection`, `EbookProblemSection`, …), analytics wrapper, `launchEnv` helpers, sticky CTA pattern (`ebook-catch-surface` hooks shared with `catch-the-attention`).
- **Custom:** Copy JSON per locale; optional `NEXT_PUBLIC_LAUNCH_MAGNETIC_CREATOR_HERO_VISUAL` for portrait vs mockup; replace `public/launch-assets/magnetic-creator/*` when final creatives exist.

## Deliverables from launch-core-run

- `landing-bundle.json` — structural contract + hooks + tracking events.
- Integrated slug + dictionaries + theme + public assets.
