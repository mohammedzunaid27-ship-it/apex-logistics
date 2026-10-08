import type { Metadata } from 'next'
import { industries, reasons } from '@/lib/content'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { SteelPhoto } from '@/components/SteelPhoto'
import { Container, PageHero, QuoteBand, SectionHead } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: `About Us: ${site.yearsInTrade} Years in Johannesburg Steel`,
  description: `${site.name} has supplied steel to builders, fabricators and engineers in ${site.address.locality} for ${site.yearsInTrade} years. Who we are and how we work.`,
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        trail={[{ name: 'About', path: '/about' }]}
        label={`${site.yearsInTrade} years in steel`}
        title={`${site.address.locality} steel people`}
        intro={
          <p>
            {site.name} is a steel merchant in {site.address.locality}. For {site.yearsInTrade} years the people
            behind it have sold structural steel, sheet, tube and bar to the builders, fabricators, engineers and
            farmers of {site.address.region}.
          </p>
        }
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-12">
            <figure className="relative aspect-[4/3] overflow-hidden border border-line bg-raised md:col-span-8" data-reveal>
              <SteelPhoto photo="weldDark" priority sizes="(min-width: 768px) 66vw, 100vw" />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden border border-line bg-raised md:col-span-4 md:aspect-auto" data-reveal>
              <SteelPhoto photo="pipesPile" sizes="(min-width: 768px) 33vw, 100vw" />
            </figure>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">How we work</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted md:col-span-7 md:col-start-6" data-reveal>
              <p>
                Most steel orders are simple. Someone needs a few lengths of tube for a gate, a beam for a lintel or
                a stack of plate for a job that starts on Monday. What they need from a merchant is the right size,
                cut properly, at a fair price, delivered when we said it would be.
              </p>
              <p>
                That is the whole business. We keep the common sizes in stock, cut and fold in the yard, and run our
                own trucks so deliveries are in our hands. When a size is out we say so and offer the closest one we
                have.
              </p>
              <p>
                After twenty years that is still the whole job, whether the order comes from a one-man welding
                shop or a contractor buying every week. Small orders are as welcome as big ones.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <li key={r.title} className="border-b border-r border-line p-7 md:p-9" data-reveal>
                <p className="label text-molten">0{i + 1}</p>
                <h3 className="mt-6 font-display text-3xl font-extrabold uppercase leading-none">{r.title}</h3>
                <p className="mt-4 text-sm text-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead index="01" label="Who we supply" title="Our customers" />
          <ul className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <li key={ind.name} className="border-b border-r border-line p-7 md:p-10" data-reveal>
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
