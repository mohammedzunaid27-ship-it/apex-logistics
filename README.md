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
| Structured data for Google (LocalBusiness, FAQ, breadcrumbs) | `src/lib/schema.ts` |
| Intro animation (steel blocks slamming together) | `src/components/intro/` |
| Background sphere and circuit lines | `src/components/QuantumBackground.tsx`, `src/components/DataLines.tsx` |
| Colours, type and component styles | `src/app/globals.css` |
| Privacy Policy and Terms & Conditions | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Optional. Overrides the live domain (`https://apexmetals.co.za`) used for canonical URLs, the sitemap and structured data. |
| `RESEND_API_KEY` | Optional. When set, the quote form emails requests through [Resend](https://resend.com). Without it the form hands the visitor a pre-filled WhatsApp message or email instead. |
| `QUOTE_TO_EMAIL` | Optional. Where quote emails go. Defaults to the address in `site.ts`. |
| `QUOTE_FROM_EMAIL` | Optional. Verified sender address on Resend. |

## Photos

Stock photos (Pexels and Unsplash, both free for commercial use) are listed in `src/lib/photo-sources.json`. Before every build, `scripts/fetch-photos.mjs` downloads the first working source for each slot into `public/stock-cache/`, and the site serves them from its own domain through Next.js image optimisation. If no source works, that slot shows a plain steel panel instead of a broken image. Check the Vercel build log for `[photos]` lines to see what was fetched.

To use your own photo, add it as `public/photos/<slot>.jpg` (slots: `weldSparks`, `weldMask`, `weldDark`, `weldSite`, `girders`, `pipes`, `pipesPile`). Real photos of the yard and stock are better for customers and for search.

## After launch

1. Set `NEXT_PUBLIC_SITE_URL` to the final domain.
2. Add the site to Google Search Console and submit `/sitemap.xml`.
3. Create or claim the Google Business Profile with the same name, phone numbers and area as `site.ts`.
