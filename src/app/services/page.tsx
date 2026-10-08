import type { Metadata } from 'next'
import { process, services } from '@/lib/content'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { SteelPhoto } from '@/components/SteelPhoto'
import { ServiceIcon } from '@/components/Icons'
import { Container, PageHero, QuoteBand, SectionHead } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: 'Steel Cutting, Folding & Delivery in Johannesburg',
  description: `Steel cut to length, sheet guillotined and folded, and delivery across Gauteng on our own trucks. ${site.name}, ${site.address.locality}.`,
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        trail={[{ name: 'Services', path: '/services' }]}
        label="Cutting · Folding · Delivery"
        title="Steel, ready to use"
        intro={
          <p>
            Buying steel is half the job. Cutting it, folding it and getting it to site is the other half. We do all
            of it from our {site.address.locality} yard, so what arrives is what you asked for.
          </p>
        }
      />

      <section className="pb-20">
        <Container>
          <figure className="ticks relative aspect-[16/9] overflow-hidden border border-line bg-raised md:aspect-[21/8]" data-reveal>
            <SteelPhoto photo="weldSite" priority sizes="100vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
          </figure>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <ul className="grid border-l border-t border-line md:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                className={`border-b border-r border-line p-8 md:p-12 ${i === services.length - 1 && services.length % 2 ? 'md:col-span-2' : ''}`}
                data-reveal
              >
                <div className="flex items-start justify-between gap-6">
                  <ServiceIcon name={s.icon} size={56} className="text-molten" />
                  <span className="label">0{i + 1}</span>
                </div>
                <h2 className="mt-10 font-display text-4xl font-extrabold uppercase leading-none md:text-5xl">{s.name}</h2>
                <p className="mt-5 max-w-lg text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead index="01" label="How ordering works" title="List in, steel out" />
          <ol className="mt-14 grid gap-px border border-line bg-line md:mt-20 md:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="bg-base p-8" data-reveal>
                <p className="font-display text-7xl font-extrabold leading-none text-molten">0{i + 1}</p>
                <h3 className="mt-6 font-display text-3xl font-extrabold uppercase leading-none">{step.title}</h3>
                <p className="mt-4 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHead
            index="02"
            label="Delivery areas"
            title="Where our trucks go"
            intro={
              <p>
                Regular runs across {site.address.region}. Further afield by arrangement, so ask if your town is not
                listed.
              </p>
            }
          />
          <ul className="mt-14 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4">
            {site.serviceAreas.map((a) => (
              <li key={a} className="border-b border-r border-line px-5 py-4 font-display text-xl font-extrabold uppercase md:text-2xl">
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <QuoteBand />
    </>
  )
}
