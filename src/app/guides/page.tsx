import type { Metadata } from 'next'
import Link from 'next/link'
import { guides, readingMinutes } from '@/lib/guides'
import { itemListSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { JsonLd } from '@/components/JsonLd'
import { ArrowUpRight } from '@/components/Icons'
import { Container, PageHero, QuoteBand } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: 'Metal Buying Guides: Grades, Sizes and Ordering',
  description:
    'Plain answers before you order: EN19 vs EN24, 304 vs 316 stainless, Hardox grades, schedule pipe sizes in mm and how to write a cutting list.',
  path: '/guides',
})

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={itemListSchema('Metal buying guides', guides.map((g) => ({ name: g.title, path: `/guides/${g.slug}` })))} />
      <PageHero
        trail={[{ name: 'Guides', path: '/guides' }]}
        label={`${guides.length} guides`}
        title="Metal buying guides"
        intro="The questions we answer on the phone every week, written down: which grade, which size, and what to put on the order."
      />

      <section className="py-12 md:py-16">
        <Container>
          <ul className="grid border-l border-t border-line md:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug} className="border-b border-r border-line" data-reveal>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-white/[0.02] md:p-9">
                  <span className="label">{readingMinutes(g)} min read</span>
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display text-3xl font-extrabold uppercase leading-[0.95] md:text-4xl">{g.title}</span>
                    <ArrowUpRight className="mt-1 shrink-0 text-muted transition-colors group-hover:text-molten" />
                  </span>
                  <span className="text-muted">{g.description}</span>
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
