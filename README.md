# Apex Metals

Website for Apex Metals, a steel merchant in Johannesburg. Built with Next.js 16 (App Router), Tailwind CSS 4 and React Three Fiber.

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
| Products, sizes, services, FAQs, photo choices | `src/lib/content.ts` |
| Structured data for Google (LocalBusiness, FAQ, breadcrumbs) | `src/lib/schema.ts` |
| Intro animation (steel blocks slamming together) | `src/components/intro/` |
| Background sphere and circuit lines | `src/components/QuantumBackground.tsx`, `src/components/DataLines.tsx` |
| Colours, type and component styles | `src/app/globals.css` |
| Privacy Policy and Terms & Conditions | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The live domain, e.g. `https://www.apexmetals.co.za`. Used for canonical URLs, the sitemap and structured data. On Vercel it falls back to the project's production URL. |
| `RESEND_API_KEY` | Optional. When set, the quote form emails requests through [Resend](https://resend.com). Without it the form hands the visitor a pre-filled WhatsApp message or email instead. |
| `QUOTE_TO_EMAIL` | Optional. Where quote emails go. Defaults to the address in `site.ts`. |
| `QUOTE_FROM_EMAIL` | Optional. Verified sender address on Resend. |

## Photos

Product and workshop photos are loaded from Unsplash (free Unsplash License) by id, listed in `src/lib/content.ts`. Replace them with photographs of the yard and stock when available: real photos help both customers and search rankings.

## After launch

1. Set `NEXT_PUBLIC_SITE_URL` to the final domain.
2. Add the site to Google Search Console and submit `/sitemap.xml`.
3. Create or claim the Google Business Profile with the same name, phone numbers and area as `site.ts`.
