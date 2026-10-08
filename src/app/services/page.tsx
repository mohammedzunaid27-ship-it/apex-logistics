import type { Metadata } from 'next'
import { enquiryTypes, process, services } from '@/lib/content'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { SteelPhoto } from '@/components/SteelPhoto'
import { ServiceIcon } from '@/components/Icons'
import { Container, PageHero, QuoteBand, SectionHead } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: 'Metal Cut to Size & Nationwide Delivery',
  description: `Steel, stainless, aluminium, bronze, EN steels and Hardox cut to size in ${site.address.locality} and delivered anywhere in South Africa by ${site.name}.`,
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <PageHero
        trail={[{ name: 'Services', path: '/services' }]}
        label="Cut to size · Nationwide delivery"
        title="Metal, ready to use"
        intro={
          <p>
            Buying the metal is half the job. Getting it cut to the right sizes and delivered to the right place is the
            other half. We do both from {site.address.locality}, for customers anywhere in {site.address.countryName}.
          </p>
        }
      />

      <section className="pb-16 md:pb-20">
        <Container>
          <figure className="ticks relative aspect-[4/3] overflow-hidden border border-line bg-raised sm:aspect-[16/9] md:aspect-[21/8]" data-reveal>
            <SteelPhoto photo="weldSite" priority sizes="100vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
          </figure>
        </Container>
      </section>

      <section className="py-12 md:py-24">
        <Container>
          <ul className="grid border-l border-t border-line md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.id} id={s.id} className="scroll-mt-28 border-b border-r border-line p-6 sm:p-8 md:p-12" data-reveal>
                <div className="flex items-start justify-between gap-6">
                  <ServiceIcon name={s.icon} size={52} className="text-molten" />
                  <span className="label">0{i + 1}</span>
                </div>
                <h2 className="mt-8 font-display text-4xl font-extrabold uppercase leading-none md:mt-10 md:text-5xl">
                  {s.name}
                </h2>
                <p className="mt-5 max-w-lg text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-32">
        <Container>
          <SectionHead index="01" label="How ordering works" title="List in, metal out" />
          <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="bg-base p-6 sm:p-8" data-reveal>
                <p className="font-display text-6xl font-extrabold leading-none text-molten md:text-7xl">0{i + 1}</p>
                <h3 className="mt-6 font-display text-3xl font-extrabold uppercase leading-none">{step.title}</h3>
                <p className="mt-4 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 md:py-32">
        <Container>
          <SectionHead
            index="02"
            label="What you can ask us"
            title="Four kinds of enquiry"
            intro={<p>Pick one on the quote form, or just tell us on the phone or WhatsApp.</p>}
          />
          <ul className="mt-12 grid grid-cols-2 border-l border-t border-line md:mt-16 md:grid-cols-4">
            {enquiryTypes.map((t, i) => (
              <li key={t} className="border-b border-r border-line p-5 sm:p-7">
                <span className="label text-molten">0{i + 1}</span>
                <p className="mt-4 font-display text-2xl font-extrabold uppercase leading-none sm:text-3xl">{t}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-32">
        <Container>
          <SectionHead
            index="03"
            label="Delivery"
            title="Anywhere in South Africa"
            intro={
              <p>
                We deliver nationwide from {site.address.locality}. These are some of the centres we deliver to. If
                your town is not listed, ask.
              </p>
            }
          />
          <ul className="mt-12 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 md:mt-16 lg:grid-cols-4">
            {site.serviceAreas.map((a) => (
              <li
                key={a}
                className="border-b border-r border-line px-4 py-4 font-display text-lg font-extrabold uppercase sm:px-5 sm:text-xl md:text-2xl"
              >
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
