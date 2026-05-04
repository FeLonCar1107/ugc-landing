# Sales campaign pack — discover-your-character

Operational brief for organic (and optional paid) traffic to the ebook landing. Aligns with `scale.channels.priorityOutline` and `scale.messagingAngles` in `launches/discover-your-character/brief.md`.

## North star

- **KPI:** `ventas_ebook_individual` (checkout completions on external platform).
- **Weekly optimization metric:** `checkout_conversion_rate` (clicks landing → paid orders).

## Destination URLs

Base landing (no UTMs for “clean” bookmarks only):

- Spanish: `{NEXT_PUBLIC_BASE_URL}/es/discover-your-character`
- English: `{NEXT_PUBLIC_BASE_URL}/en/discover-your-character`

Replace `{NEXT_PUBLIC_BASE_URL}` with production host (e.g. `https://www.isabellalizarralde.com`).

## UTM convention

Use lowercase values. Pattern:

`?utm_source={platform}&utm_medium={type}&utm_campaign={campaign}&utm_content={creative}&utm_term={angle}`

| Parameter      | Examples |
|----------------|----------|
| `utm_source`   | `instagram`, `tiktok` |
| `utm_medium`   | `organic`, `story`, `reel`, `bio`, `paid_social` |
| `utm_campaign` | `dyc_launch_2026` (fixed per launch window) |
| `utm_content`  | `reel_01_story`, `carousel_grid_02`, `tt_hook_A` |
| `utm_term`     | optional; reuse messaging angle slug (see below) |

**Example (IG reel, angle “sin rumbo”):**

`https://www.isabellalizarralde.com/es/discover-your-character?utm_source=instagram&utm_medium=reel&utm_campaign=dyc_launch_2026&utm_content=reel_01&utm_term=deja_de_crear_sin_rumbo`

Put the **same full URL** in link-in-bio tools, swipe-ups (if applicable), and ad destinations.

## Messaging angles → assets

Map each asset to one angle from `scale.messagingAngles`:

| Angle slug | Español (hook direction) |
|------------|---------------------------|
| `deja_de_crear_sin_rumbo` | Frustración por dispersión / feed sin dirección |
| `encuentra_tu_identidad` | Claridad visual + voz reconocible |
| `conviertete_en_protagonista` | Aspiration — ser memorable, “dueña” del contenido |

**Formats (`scale.hooks.priorityFormats`):**

1. **Reel storytelling personal** — problema vivido → pivote → CTA “link en perfil”.
2. **Reel antes vs después** — caótico vs ordenado (mensaje/feed); sin prometer números que no tengas.

## Channel matrix (MVP)

| Channel    | Placement        | Frequency (launch window 14d) | Primary CTA |
|-----------|------------------|---------------------------------|-------------|
| Instagram | Reels            | 4–6 / ventana                   | Bio link → landing + UTMs |
| Instagram | Stories (chunks) | 2–3 series × ventana           | Sticker link mismo URL |
| TikTok    | Short hooks      | 3–5 / ventana                   | Bio → mismo landing |

## Analytics strategy (organic now → paid later)

**Today (sin publicidad de pago):** **GA4** en la propia landing es la opción más adecuada: ves volumen, idioma, profundidad de lectura, interés en FAQ/oferta y qué CTAs convierten a clic. Lo implementado usa `gtag` + Measurement ID (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) — es el stack estándar de Google, no algo paralelo.

**Cuando entren ads (Meta, Google Ads, etc.):** el siguiente paso habitual es **Google Tag Manager (GTM)** como capa encima: mismo GA4, pero los píxeles de conversión y tags de campaña se activan o pausan **desde la UI** sin redeploy por cada prueba. Opcional: **Meta Pixel** + CAPI para atribución de pago; GA4 sigue siendo el sitio de verdad para comportamiento *on-site*.

## Measurement mapping

Events implemented on the Next landing (when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set):

| Event name | When | Useful params |
|------------|------|----------------|
| `landing_view` | Page load (launch routes only) | `landing_slug`, `locale` |
| `landing_scroll_depth` | User reaches 25 / 50 / 75 / 100 % of scrollable height (once each per load) | `landing_slug`, `locale`, `depth_percent` |
| `offer_section_view` | `#offer` enters viewport (~20 %+ visible), once | `landing_slug`, `locale` |
| `faq_item_expand` | User opens an FAQ row (not the default first open on load) | `landing_slug`, `locale`, `faq_index`, `faq_question` (truncated) |
| `cta_checkout_click` | Primary CTA toward checkout when URL is set | `landing_slug`, `locale`, `cta_placement` |

**`cta_placement` values:** `hero`, `problem`, `solution_top`, `solution_bottom`, `offer`, `faq`, `close`, `sticky_mobile`.

**GA4 setup:** Admin → Custom definitions → custom dimensions (event scope) for `landing_slug`, `locale`, `cta_placement`, `depth_percent`, `faq_index` (and `faq_question` only if you accept question text in reports).

**How to read behavior (organic):**

- Muchos `landing_view` y pocos `offer_section_view` → gente no baja o rebota antes de la oferta.
- `offer_section_view` alto y pocos `cta_checkout_click` → revisar precio, urgencia o copy de oferta.
- Muchos `faq_item_expand` antes del checkout → posibles objeciones; refinar FAQ o oferta.

### `purchase_success`

Not fired from this repo (checkout is external). Options:

1. **Platform:** Enable GA4 / pixel integration on Hotmart (or your PSP) so purchases appear as conversions.
2. **Manual:** Compare daily orders in Hotmart vs `cta_checkout_click` in GA4 for funnel sanity.

## Compliance

- Do not invent scarcity or fake testimonials (`market.proof.collectionPlan`: collect real reader quotes post‑purchase).
- Keep claims aligned with ebook contents; sensitive earnings claims belong in `market.compliance.resultsDisclaimer` when applicable.

## Experiment backlog (growth-optimizer handoff)

1. Hero portrait vs mockup (`NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_HERO_VISUAL`).
2. Primary CTA label: “Empezar ahora” vs outcome-led variant (e.g. “Quiero el ebook + bonuses”).
3. Angle × reel hook: which `utm_term` drives more `cta_checkout_click` per `landing_view`.
