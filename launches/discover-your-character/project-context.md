# Project Context Snapshot

Use this file only when the destination repository already contains an existing product/codebase.
If there is no existing implementation, set `project.exists: false` and keep unknown sections as `none`.

## Project Presence
project.exists: true
project.type: web-app
project.summary: Next.js 14 App Router site with bilingual routing (`/[lang]`, ES default via middleware), Tailwind CSS, and a portfolio-style home assembled from section components. Backend touches include Firebase Realtime Database (reviews/collabs API reads), Resend-backed email (`/api/send-email`), and ancillary API routes for media and user payload; client analytics via Firebase is present but commented out.

## Stack
project.stack.languages:
- TypeScript
project.stack.frameworks:
- Next.js 14.1.4
- React 18
- Tailwind CSS 3.4.x
project.stack.runtime:
- Node.js (Next.js server/runtime)
project.stack.packageManagers:
- npm

## Structure and Routes
project.structure.entryPoints:
- package.json → `next dev` / `next build` / `next start`
- src/app/[lang]/page.tsx → localized marketing home
project.structure.keyDirectories:
- src/app → App Router layouts, localized pages, route handlers
- src/app/[lang]/[landingSlug]/ → dynamic ebook landing per brief (`landingSlug` matches launch slug; this launch → `discover-your-character`)
- src/components → reusable UI, views (Home, CustomerReviews, Contact, etc.)
- src/dictionaries → locale JSON copy (e.g. en.json)
- src/i18n → locale config and helpers
- src/utils → Firebase client bootstrap
- src/_mock_ → mock JSON for reviews and related fixtures
project.routes.existing:
- /[lang]/ → primary UI (en, es)
- /api/send-email → transactional email (Resend)
- /api/reviews → Firebase-backed reviews fetch
- /api/collabs → Firebase-backed collaborations fetch
- /api/content-media → content/media helper
- /api/user → user-related payload
- /[lang]/[landingSlug]/ → planned dynamic landing route; this launch resolves e.g. `/es/discover-your-character`
project.routes.recommendedLaunchRoute: /[lang]/[landingSlug]

## Integrations and Data
project.integrations.analytics:
- Firebase Analytics (initialized in firebase utils but `getAnalytics` commented out; brief targets `analytics_web` placeholder)
project.integrations.payments:
- none
project.integrations.emailCrm:
- Resend (via src/app/api/send-email/route.ts)
project.data.entities:
- reviews (Firebase Realtime Database)
- collaborations (Firebase Realtime Database)
- contact/intake flows tied to email API

## Constraints
project.constraints.deployment:
- Requires env vars for Firebase (`REACT_APP_FIREBASE_*`) and deploy base URL usage (`NEXT_PUBLIC_BASE_URL` in metadata)
project.constraints.security:
- Secrets via environment variables; API routes expose server-side integrations only
project.constraints.compliance:
- none
project.constraints.performance:
- Locomotive Scroll and remote image domains configured in next.config.mjs (Wix static, Instagram CDN, Firebase Storage)

## Reuse Opportunities
project.reuse.uiComponents:
- src/components/ui/Main.tsx, Header.tsx, Navbar.tsx, Footer.tsx
- src/components/views/* section patterns (hero-adjacent blocks, CustomerReviews, ContactForm)
- src/components/buttons/*
project.reuse.copyAssets:
- src/dictionaries/en.json, src/dictionaries/es.json (locale copy pattern for new launch strings)
- src/_mock_/reviews.json (testimonial-style data shape reference)
project.reuse.tracking:
- none wired end-to-end; brief specifies minimum events landing_view, cta_checkout_click, purchase_success

## Risks and Assumptions
project.risks:
- Middleware forces locale prefix on non-API paths; new landing must match `/[lang]/...` or matcher exclusions updated deliberately
- Brief checkout URL and some commercial fields marked STANDBY may need resolution before publish
project.assumptions:
- Brief `technology.integration.dynamicRoutes` + `routePattern: "[lang]/[landingSlug]"`; implement `src/app/[lang]/[landingSlug]/page.tsx` with slug allowlist or bundle lookup; `technology.integration.preferredRoute` supplies `landingSlug` for this launch (`discover-your-character`)

## Decision for Launch Core
project.launchContext.readiness: READY
project.launchContext.missingCriticalInfo:
- none
project.launchContext.nextAction: launch-core-validate-brief launches/discover-your-character/brief.md
