# Apex Metals

Website for Apex Metals, a ferrous and non-ferrous metal merchant in Johannesburg. Built with Next.js 16 (App Router), Tailwind CSS 4 and React Three Fiber.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, every page is statically generated
npm run lint
```

Append `?slowmo=25` to any URL in development to play the intro animation 25× slower. The intro plays once per browser session; open a new tab or private window to see it again.

## Where things live

| What | File |
| --- | --- |
| Phone numbers, email, WhatsApp, service areas, years in trade | `src/lib/site.ts` |
| Product ranges and grades, services, FAQs, photo choices | `src/lib/content.ts` |
| Grade and product pages (EN19, Hardox, copper busbar…) | `src/lib/items.ts` |
| Buying guides (EN19 vs EN24, 304 vs 316, pipe sizes…) | `src/lib/guides.ts` |
| Structured data for Google (LocalBusiness, FAQ, breadcrumbs, articles) | `src/lib/schema.ts` |
| Security headers and Content Security Policy | `next.config.ts` |
| Quote form endpoint (validation, rate limits, email) | `src/app/api/quote/route.ts` |
| Intro animation (steel blocks slamming together) | `src/components/intro/` |
| Background sphere and circuit lines | `src/components/QuantumBackground.tsx`, `src/components/DataLines.tsx` |
| Colours, type and component styles | `src/app/globals.css` |
| Privacy Policy and Terms & Conditions | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional. Overrides the live domain (`https://apexmetals.co.za`) used for canonical URLs, the sitemap and structured data. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional. The code from Google Search Console's HTML tag method, if you verify that way instead of by DNS. |
| `RESEND_API_KEY` | Optional. When set, the quote form emails requests through [Resend](https://resend.com). Without it the form hands the visitor a pre-filled WhatsApp message or email instead. |
| `QUOTE_TO_EMAIL` | Optional. Where quote emails go. Defaults to the address in `site.ts`. |
| `QUOTE_FROM_EMAIL` | Optional. Verified sender address on Resend. |

## Search and AI crawlers

- `/sitemap.xml` and `/robots.txt` are generated from the content files, so new ranges, grades and guides are listed automatically. Bump the date in `src/app/sitemap.ts` when copy changes; guides carry their own `updated` date.
- `/llms.txt` is a plain-text summary of the site for AI assistants, also generated from the content files.
- Search engine crawlers skip the intro animation (the content is the same; only the animation is skipped).

## Security

- Headers (CSP, HSTS, frame, referrer and permissions policies) are set for every response in `next.config.ts`. The site loads nothing from other domains; if you add a third-party script, chat widget or analytics, its domain has to be added to the CSP or the browser will block it.
- The quote endpoint only accepts same-origin JSON from the site's own form, validates every field and rate limits per IP. Bots that fill the hidden field or submit instantly get a fake success.
- `/.well-known/security.txt` gives a contact for reporting security problems. Its expiry renews on every deploy, so deploy at least once a year.
- Run `npm audit --omit=dev` now and then and keep `next` on the latest patch release.

## Photos

Stock photos (Pexels and Unsplash, both free for commercial use) are listed in `src/lib/photo-sources.json`. Before every build, `scripts/fetch-photos.mjs` downloads the first working source for each slot into `public/stock-cache/`, and the site serves them from its own domain through Next.js image optimisation. If no source works, that slot shows a plain steel panel instead of a broken image. Check the Vercel build log for `[photos]` lines to see what was fetched.

To use your own photo, add it as `public/photos/<slot>.jpg` (slots: `weldSparks`, `weldMask`, `weldDark`, `weldSite`, `girders`, `pipes`, `pipesPile`). Real photos of the yard and stock are better for customers and for search.

## After launch

1. Set `NEXT_PUBLIC_SITE_URL` to the final domain.
2. Add the site to Google Search Console and submit `/sitemap.xml`.
3. Create or claim the Google Business Profile with the same name, phone numbers and area as `site.ts`.
