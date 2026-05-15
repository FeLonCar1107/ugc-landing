# Project Context Snapshot — catch-the-attention

## Project Presence
project.exists: true
project.type: web-app
project.summary: Next.js 14 App Router; ebook landings share `EbookLanding` and section components under `src/components/landings/ebook/`. Copy + env per slug live in `src/dictionaries/landings/<slug>/` and `public/launch-assets/<slug>/`.

## Stack
project.stack.frameworks:
- Next.js 14.1.4
- React 18
- Tailwind CSS 3.4.x

## Structure and Routes
project.structure.keyDirectories:
- src/app/[lang]/[landingSlug]/page.tsx — dynamic landing; slug allowlist `ALLOWED_LANDING_SLUGS` includes `catch-the-attention`
- src/dictionaries/landings/catch-the-attention/ — ES/EN copy (`EbookLandingCopy`)
- public/launch-assets/catch-the-attention/ — hero, proof timeline, offer mockups (v1 duplicated from discover-your-character assets until custom art)

project.routes.recommendedLaunchRoute: /[lang]/catch-the-attention

## Integrations
project.integrations.payments: external checkout via `NEXT_PUBLIC_LAUNCH_CATCH_THE_ATTENTION_CHECKOUT_URL`

## Reuse
project.reuse.uiComponents: same as discover — `EbookLanding`, `EbookHeroSection`, problem/solution/proof/faq/close, `OfferSection`, `StickyLaunchCta`, analytics root.

## Launch Core
project.launchContext.readiness: READY
project.launchContext.nextAction: set env triplet for CATCH_THE_ATTENTION; replace duplicated PNGs when ebook-specific art exists
