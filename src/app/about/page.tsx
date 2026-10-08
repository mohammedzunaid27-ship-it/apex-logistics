import type { Metadata } from 'next'
import Link from 'next/link'
import { industries, products } from '@/lib/content'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { SteelPhoto } from '@/components/SteelPhoto'
import { ArrowUpRight, ProfileIcon } from '@/components/Icons'
import { Container, PageHero, QuoteBand, SectionHead } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: `About Us: ${site.yearsInTrade} Years in the Metal Trade`,
  description: `${site.name} supplies ferrous and non-ferrous metals from ${site.address.locality} to workshops, fabricators, mines and plants across South Africa. ${site.yearsInTrade} years in the trade.`,
  path: '/about',
})

// What a customer can hold us to. Written as plain commitments rather than
// slogans, so each one is something we either did or did not do.
const commitments = [
  {
    title: 'A straight answer',
    body: 'If something is not in stock we say so, and tell you what we can offer instead or when it will be in.',
  },
  {
    title: 'The grade on the order',
    body: 'You get the material you ordered. If a substitute makes sense, we ask you before it is cut.',
  },
  {
    title: 'Cut to your sizes',
    body: 'Pieces are cut to your list, so they arrive ready to machine, weld or fit.',
  },
  {
    title: 'Handled safely',
    body: 'Heavy metal is cut, lifted and loaded properly, for our team and for whoever receives it.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        trail={[{ name: 'About', path: '/about' }]}
        label={`About ${site.name}`}
        title={`${site.yearsInTrade} years in metal`}
        intro={
          <p>
            {site.name} is a metal merchant in {site.address.locality}. We supply mild and stainless steel, aluminium,
            copper, brass, bronze, cast iron, engineering steels and wear plate to workshops, fabricators, mines and
            plants across {site.address.countryName}, cut to size and delivered.
          </p>
        }
      />

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-12">
            <figure className="relative aspect-[4/3] overflow-hidden border border-line bg-raised md:col-span-8" data-reveal>
              <SteelPhoto photo="weldDark" priority sizes="(min-width: 768px) 66vw, 100vw" />
            </figure>
            <figure className="relative aspect-[16/10] overflow-hidden border border-line bg-raised md:col-span-4 md:aspect-auto" data-reveal>
              <SteelPhoto photo="pipesPile" sizes="(min-width: 768px) 33vw, 100vw" />
            </figure>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">Who we are</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted md:col-span-7 md:col-start-6" data-reveal>
              <p>
                The team behind {site.name} has spent {site.yearsInTrade} years in the {site.address.locality} metal
                trade. We keep a broad range under one roof, so a workshop can get its EN24 shaft, its bronze bushes
                and its mild steel brackets on one order, from one supplier, on one delivery.
              </p>
              <p>
                Most of the job is simple. Confirm what is in stock, cut it to the sizes on the list, and get it to
                the customer. We would rather do that properly every time than make big promises.
              </p>
              <p>
                A single length of brass rod gets the same attention as a load of beams: the right metal, the right
                sizes, and a phone that gets answered.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-24">
        <Container>
          <SectionHead index="01" label="What you can expect" title="Four things we hold ourselves to" />
          <ul className="mt-12 grid border-l border-t border-line sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {commitments.map((c, i) => (
              <li key={c.title} className="border-b border-r border-line p-6 sm:p-8" data-reveal>
                <p className="label text-molten">0{i + 1}</p>
                <h3 className="mt-6 font-display text-3xl font-extrabold uppercase leading-none">{c.title}</h3>
                <p className="mt-4 text-sm text-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12 md:py-24">
        <Container>
          <SectionHead
            index="02"
            label="What we stock"
            title="Ferrous and non-ferrous"
            intro={<p>Full lengths or cut to size. Open a range for the products and grades.</p>}
          />
          <ul className="mt-12 grid border-l border-t border-line sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.slug} className="border-b border-r border-line">
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full min-h-[96px] items-center gap-4 p-5 transition-colors hover:bg-white/[0.02] sm:p-6"
                >
                  <ProfileIcon name={p.profile} size={40} className="shrink-0 text-steel transition-colors group-hover:text-molten" />
                  <span className="font-display text-2xl font-extrabold uppercase leading-none">{p.name}</span>
                  <ArrowUpRight className="ml-auto shrink-0 text-muted transition-colors group-hover:text-molten" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12 md:py-24">
        <Container>
          <SectionHead index="03" label="Who we supply" title="Our customers" />
          <ul className="mt-12 grid border-l border-t border-line sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {industries.map((ind) => (
              <li key={ind.name} className="border-b border-r border-line p-6 sm:p-8 md:p-10" data-reveal>
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none">{ind.name}</h3>
                <p className="mt-4 text-sm text-muted">{ind.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <QuoteBand />
    </>
  )
}
