import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/content'
import { getGuide, guides, readingMinutes } from '@/lib/guides'
import { itemBySlug } from '@/lib/items'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { articleSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { GuideBlock } from '@/components/GuideBody'
import { ArrowUpRight, PlusIcon } from '@/components/Icons'
import { Breadcrumbs, Container, QuoteBand } from '@/components/ui'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const g = getGuide(slug)
  if (!g) return {}
  const meta = pageMeta({ title: g.metaTitle, description: g.description, path: `/guides/${g.slug}`, keywords: g.keywords, ownImage: true })
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: g.published, modifiedTime: g.updated, authors: [site.name] },
  }
}

const dateFormat = new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const g = getGuide(slug)
  if (!g) notFound()

  const stock = [
    ...g.items.map(itemBySlug).filter((i) => i !== undefined).map((i) => ({ name: i.name, short: i.short, path: `/products/${i.range}/${i.slug}` })),
    ...g.ranges.map(getProduct).filter((p) => p !== undefined).map((p) => ({ name: p.name, short: p.short, path: `/products/${p.slug}` })),
  ].slice(0, 6)
  const more = guides.filter((o) => o.slug !== g.slug)

  return (
    <>
      <JsonLd data={articleSchema(g)} />

      <section className="pb-16 pt-[128px] md:pt-[168px]">
        <Container>
          <Breadcrumbs
            trail={[
              { name: 'Guides', path: '/guides' },
              { name: g.title, path: `/guides/${g.slug}` },
            ]}
          />
          <h1 className="display-lg mt-10 max-w-5xl">{g.title}</h1>
          <p className="label mt-6">
            {site.name} · Updated <time dateTime={g.updated}>{dateFormat.format(new Date(g.updated))}</time> · {readingMinutes(g)} min read
          </p>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{g.intro}</p>

          <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
            <details className="group border-y border-line lg:hidden">
              <summary className="label flex min-h-[48px] items-center justify-between text-fg">
                In this guide
                <PlusIcon size={14} className="faq-plus transition-transform duration-300" />
              </summary>
              <ol className="pb-4 text-sm text-muted">
                {g.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block py-2.5 hover:text-fg">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <nav aria-label="In this guide" className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <p className="label mb-4 text-fg">In this guide</p>
                <ol className="border-l border-line text-sm text-muted">
                  {g.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 hover:border-molten hover:text-fg">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article className="prose-steel min-w-0 max-w-3xl lg:col-span-8 lg:col-start-5">
              {g.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2>{s.heading}</h2>
                  {s.body.map((b, i) => (
                    <GuideBlock key={i} block={b} />
                  ))}
                </section>
              ))}
            </article>
          </div>
        </Container>
      </section>

      {stock.length > 0 && (
        <section className="py-12 md:py-16">
          <Container>
            <div className="seam" />
            <h2 className="display-md mt-6" data-reveal>
              In stock with us
            </h2>
            <ul className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {stock.map((s) => (
                <li key={s.path} className="border-b border-r border-line">
                  <Link href={s.path} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-white/[0.02]">
                    <span className="flex items-start justify-between gap-4">
                      <span className="font-display text-2xl font-extrabold uppercase leading-none">{s.name}</span>
                      <ArrowUpRight className="shrink-0 text-muted transition-colors group-hover:text-molten" />
                    </span>
                    <span className="text-sm text-muted">{s.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="py-12 md:py-16">
        <Container>
          <div className="seam" />
          <h2 className="display-md mt-6" data-reveal>
            More guides
          </h2>
          <ul className="mt-8 border-t border-line">
            {more.map((o) => (
              <li key={o.slug} className="border-b border-line">
                <Link href={`/guides/${o.slug}`} className="group flex min-h-[56px] items-center justify-between gap-4 py-4 hover:text-fg">
                  <span className="text-lg">{o.title}</span>
                  <ArrowUpRight className="shrink-0 text-muted transition-colors group-hover:text-molten" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <QuoteBand />
    </>
  )
}
