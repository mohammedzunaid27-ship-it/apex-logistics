import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/content'
import { getItem, itemBySlug, items } from '@/lib/items'
import { guidesForItem } from '@/lib/guides'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { faqSchema, itemSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { GuideLinks } from '@/components/GuideBody'
import { ArrowRight, ArrowUpRight, ProfileIcon } from '@/components/Icons'
import { Breadcrumbs, Container, Faq, QuoteBand } from '@/components/ui'

interface Props {
  params: Promise<{ slug: string; item: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.range, item: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item } = await params
  const it = getItem(slug, item)
  if (!it) return {}
  const meta = pageMeta({
    title: it.title,
    description: it.description,
    path: `/products/${it.range}/${it.slug}`,
    keywords: it.keywords,
    ownImage: true,
  })
  // share image of the parent range
  const image = { url: `/products/${it.range}/opengraph-image`, width: 1200, height: 630, alt: `${it.name} from ${site.name}` }
  return { ...meta, openGraph: { ...meta.openGraph, images: [image] }, twitter: { ...meta.twitter, images: [image.url] } }
}

export default async function ItemPage({ params }: Props) {
  const { slug, item } = await params
  const it = getItem(slug, item)
  const range = getProduct(slug)
  if (!it || !range) notFound()

  const related = it.related.map(itemBySlug).filter((r) => r !== undefined)

  return (
    <>
      <JsonLd data={[itemSchema(it, range.name), faqSchema(it.faqs)]} />

      <section className="pb-12 pt-[128px] md:pb-16 md:pt-[168px]">
        <Container>
          <Breadcrumbs
            trail={[
              { name: 'Products', path: '/products' },
              { name: range.name, path: `/products/${range.slug}` },
              { name: it.name, path: `/products/${range.slug}/${it.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="label text-molten">{range.name}</p>
              <h1 className="mt-5">
                <span className="display-xl block">{it.name}</span>
                <span className="mt-4 block font-body text-xl font-normal normal-case tracking-normal text-muted md:text-2xl">
                  Supplier in {site.address.locality}. Cut to size, delivered nationwide.
                </span>
              </h1>
            </div>
            <div className="hidden items-end justify-end md:col-span-4 md:flex">
              <ProfileIcon name={range.profile} size={150} className="text-line-strong" />
            </div>
          </div>
          <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-muted md:col-span-6 md:text-xl">{it.intro}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:col-span-5 md:col-start-8 md:flex-col md:items-stretch">
              <Link href={`/contact?product=${encodeURIComponent(range.name)}#quote`} className="btn btn-molten">
                Request a quote <ArrowRight />
              </Link>
              <a href={`tel:${site.phones[0].tel}`} className="btn btn-line">
                Call {site.phones[0].display}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">At a glance</h2>
              <p className="mt-5 text-sm text-faint">
                Reference values. We confirm the exact grade and condition on every quote.
              </p>
            </div>
            <dl className="border-t border-line-strong md:col-span-7 md:col-start-6" data-reveal>
              {it.facts.map((f) => (
                <div key={f.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6 sm:py-5">
                  <dt className="label text-fg">{f.label}</dt>
                  <dd className="text-muted">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">Used for</h2>
              <ul className="mt-8 border-t border-line">
                {it.uses.map((u) => (
                  <li key={u} className="flex items-center gap-4 border-b border-line py-4">
                    <span className="h-1.5 w-1.5 shrink-0 bg-molten" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-6 md:col-start-7" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">Good to know</h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                {it.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
                <p>
                  Part of our{' '}
                  <Link href={`/products/${range.slug}`} className="text-fg underline decoration-molten underline-offset-4">
                    {range.name.toLowerCase()} range
                  </Link>
                  . Cut to size in {site.address.locality} and{' '}
                  <Link href="/services#delivery" className="text-fg underline decoration-molten underline-offset-4">
                    delivered anywhere in South Africa
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">{it.name} questions</h2>
            </div>
            <div className="md:col-span-8">
              <Faq items={it.faqs} />
            </div>
          </div>
        </Container>
      </section>

      <GuideLinks guides={guidesForItem(it.slug)} />

      {related.length > 0 && (
        <section className="py-12 md:py-20">
          <Container>
            <div className="seam" />
            <h2 className="display-md mt-6" data-reveal>
              Related
            </h2>
            <ul className="mt-10 grid border-l border-t border-line sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="border-b border-r border-line">
                  <Link href={`/products/${r.range}/${r.slug}`} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-white/[0.02]">
                    <span className="flex items-start justify-between gap-4">
                      <span className="font-display text-2xl font-extrabold uppercase leading-none">{r.name}</span>
                      <ArrowUpRight className="shrink-0 text-muted transition-colors group-hover:text-molten" />
                    </span>
                    <span className="text-sm text-muted">{r.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <QuoteBand title={`Need ${it.name}?`} />
    </>
  )
}
