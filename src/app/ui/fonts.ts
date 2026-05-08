/**
 * Google Fonts class names — stylesheets are loaded via `<link>` in `src/app/[lang]/layout.tsx`.
 *
 * Do not use `next/font/google` here: it fetches fonts.googleapis.com during Node compilation,
 * which fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` when TLS inspection / corp proxy / AV
 * replaces certificates Node does not trust.
 */
export const inter = { className: "font-inter" };

export const montserrat = { className: "font-montserrat" };
