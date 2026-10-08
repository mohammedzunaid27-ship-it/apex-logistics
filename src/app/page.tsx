import type { Metadata } from 'next'
import Link from 'next/link'
import { faqs, industries, process, products, reasons, services } from '@/lib/content'
import { primaryPhone, site, whatsappLink } from '@/lib/site'
import { faqSchema, localBusinessSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { SteelPhoto } from '@/components/SteelPhoto'
import { ArrowRight, PhoneIcon, ServiceIcon, WhatsAppIcon } from '@/components/Icons'
import { Container, Faq, ProductRows, QuoteBand, SectionHead } from '@/components/ui'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const tickerItems = [
  'Universal beams',
  'IPE sections',
  'Angle iron',
  'Channels',
  'Treadplate',
  'IBR sheeting',
  'Stainless tube',
  'Aluminium plate',
  'Copper busbar',
  'Brass bar',
  'Phosphor bronze PB1',
  'Aluminium bronze AB2',
  'Cast iron bar',
  'EN19 Condition T',
  'EN24',
  'K110 tool steel',
  'Hardox',
  'Schedule pipe',
  'Expanded metal',
  'Palisades',
]

const rangeWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

export default function HomePage() {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), faqSchema(faqs)]} />

      {/* ── Hero ── */}
      <section className="relative pb-14 pt-[112px] md:pb-20 md:pt-[150px]">
        <Container>
          <div className="flex items-center justify-between gap-6 border-b border-line pb-4">
            <p className="label">
              <span className="text-molten">●</span>&nbsp; Steel &amp; metal merchants · {site.address.locality}
            </p>
            <p className="label hidden sm:block">{site.yearsInTrade} years in the trade</p>
          </div>

          <h1 className="mt-8 md:mt-12">
            <span className="sr-only">Steel and metal supplier in Johannesburg: </span>
            <span className="display-xl block">Steel,</span>
            <span className="display-xl block">
              cut to <span className="text-molten">size</span>
            </span>
            <span className="display-xl block text-steel">&amp; delivered.</span>
          </h1>

          <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
            <div className="max-w-xl lg:col-span-5 lg:max-w-none">
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                Mild and stainless steel, aluminium, copper, brass, bronze, engineering steels and Hardox from one{' '}
                {site.address.locality} merchant. Cut to your sizes and delivered anywhere in South Africa.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/contact#quote" className="btn btn-molten">
                  Request a quote <ArrowRight />
                </Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  <WhatsAppIcon size={16} className="text-[#25d366]" /> WhatsApp
                </a>
              </div>
              <a
                href={`tel:${primaryPhone.tel}`}
                className="label mt-4 inline-flex min-h-[44px] items-center gap-2 hover:text-fg"
              >
                <PhoneIcon size={13} /> Or call {primaryPhone.display}
              </a>
            </div>

            <div className="lg:col-span-7">
              <figure className="ticks relative aspect-[4/3] overflow-hidden border border-line bg-raised sm:aspect-[16/10]">
                <SteelPhoto photo="weldSparks" priority sizes="(min-width: 1024px) 58vw, 100vw" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:p-5 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
                  <span className="label text-fg">In stock</span>
                  <span className="label text-steel lg:text-right">
                    {products.map((p) => p.tag).join(' · ')}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Ticker ── */}
      <div className="overflow-hidden border-y border-line bg-base/70 py-4" aria-hidden>
        <div className="ticker-track flex w-max">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0">
              {tickerItems.map((t) => (
                <li key={t} className="label flex items-center whitespace-nowrap px-6 text-steel">
                  {t}
                  <span className="ml-12 inline-block h-1.5 w-1.5 bg-molten" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ── Products ── */}
      <section id="products" className="py-24 md:py-36">
        <Container>
          <SectionHead
            index="01"
            label="What we stock"
            title={
              <>
                {rangeWords[products.length] ?? products.length} ranges.
                <br />
                One call.
              </>
            }
            intro={
              <p>
                Ferrous and non-ferrous, from mild steel angle to phosphor bronze hollow bar. Full lengths or cut to
                your list, delivered nationwide.
              </p>
            }
          />
          <div className="mt-14 md:mt-20">
            <ProductRows />
          </div>
        </Container>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <figure className="ticks relative aspect-[16/10] overflow-hidden border border-line bg-raised lg:aspect-[4/5]" data-reveal>
                  <SteelPhoto photo="weldMask" sizes="(min-width: 1024px) 40vw, 100vw" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 to-transparent" />
                </figure>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div data-reveal>
                <div className="seam" />
                <p className="label mt-4 flex gap-4">
                  <span className="text-molten">02</span>
                  <span>Services</span>
                </p>
                <h2 className="display-lg mt-8">
                  We do the cutting. You do the work.
                </h2>
              </div>
              <ul className="mt-12 border-t border-line">
                {services.map((s) => (
                  <li key={s.id} className="grid grid-cols-[auto_1fr] gap-6 border-b border-line py-8" data-reveal>
                    <ServiceIcon name={s.icon} size={44} className="text-molten" />
                    <div>
                      <h3 className="font-display text-2xl font-extrabold uppercase leading-none md:text-3xl">{s.name}</h3>
                      <p className="mt-3 text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn btn-line mt-10" data-reveal>
                More on our services <ArrowRight />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 20 years ── */}
      <section className="relative overflow-hidden border-y border-line bg-base/80 py-24 md:py-32">
        <Container>
          <div className="grid items-end gap-10 md:grid-cols-12">
            <p
              aria-hidden
              className="font-display text-[11rem] font-extrabold leading-[0.75] text-molten md:col-span-5 md:text-[19rem]"
              data-reveal
            >
              {site.yearsInTrade}
            </p>
            <div className="md:col-span-7" data-reveal>
              <h2 className="display-md">
                {site.yearsInTrade} years supplying engineers, fabricators and mines from{' '}
                {site.address.locality}
              </h2>
              <p className="mt-6 max-w-xl text-muted">
                Long enough to know which grade a job needs, which substitutes are safe, and exactly what a workshop
                foreman means by &ldquo;urgent&rdquo;.
              </p>
            </div>
          </div>

          <ul className="mt-20 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <li key={r.title} className="border-b border-r border-line p-7 md:p-9" data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}>
                <p className="label text-molten">0{i + 1}</p>
                <h3 className="mt-6 font-display text-3xl font-extrabold uppercase leading-none">{r.title}</h3>
                <p className="mt-4 text-sm text-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Who we supply ── */}
      <section className="py-24 md:py-36">
        <Container>
          <SectionHead
            index="03"
            label="Who buys from us"
            title="From the lathe to the mine"
            intro={<p>Machine shops, fabricators, mines, builders and plants. The same metal, cut and delivered the same way.</p>}
          />
          <ul className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
            {industries.map((ind) => (
              <li key={ind.name} className="group border-b border-r border-line p-7 transition-colors hover:bg-white/[0.02] md:p-10" data-reveal>
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none transition-colors group-hover:text-molten">
                  {ind.name}
                </h3>
                <p className="mt-4 text-sm text-muted">{ind.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Photo strip ── */}
      <section aria-label="Steel in our range" className="pb-24 md:pb-36">
        <Container>
          <div className="grid gap-4 md:grid-cols-12">
            <figure className="relative aspect-[4/3] overflow-hidden border border-line bg-raised md:col-span-7" data-reveal>
              <SteelPhoto photo="girders" sizes="(min-width: 768px) 58vw, 100vw" />
              <figcaption className="label absolute bottom-0 left-0 bg-base/85 px-4 py-3 text-fg">Mild steel sections</figcaption>
            </figure>
            <div className="grid gap-4 md:col-span-5">
              <figure className="relative aspect-[16/10] overflow-hidden border border-line bg-raised md:aspect-auto" data-reveal>
                <SteelPhoto photo="pipes" sizes="(min-width: 768px) 40vw, 100vw" />
                <figcaption className="label absolute bottom-0 left-0 bg-base/85 px-4 py-3 text-fg">Schedule pipe</figcaption>
              </figure>
              <figure className="relative aspect-[16/10] overflow-hidden border border-line bg-raised md:aspect-auto" data-reveal>
                <SteelPhoto photo="weldDark" sizes="(min-width: 768px) 40vw, 100vw" />
                <figcaption className="label absolute bottom-0 left-0 bg-base/85 px-4 py-3 text-fg">Non-ferrous and EN steels</figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How ordering works ── */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHead index="04" label="How ordering works" title="List in, metal out" />
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-0">
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-line-strong lg:block" />
            {process.map((step, i) => (
              <li key={step.title} className="relative lg:pr-10" data-reveal style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}>
                <span aria-hidden className="relative z-10 block h-[15px] w-[15px] border border-molten bg-base">
                  <span className="absolute inset-[3px] bg-molten" />
                </span>
                <p className="label mt-6 text-molten">Step 0{i + 1}</p>
                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none">{step.title}</h3>
                <p className="mt-4 text-sm text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 md:grid-cols-12">
            <div className="md:col-span-4">
              <div data-reveal>
                <div className="seam" />
                <p className="label mt-4 flex gap-4">
                  <span className="text-molten">05</span>
                  <span>Questions</span>
                </p>
                <h2 className="display-lg mt-8">Before you order</h2>
                <p className="mt-6 text-muted">
                  Anything else, call{' '}
                  <a href={`tel:${primaryPhone.tel}`} className="text-fg underline decoration-molten underline-offset-4">
                    {primaryPhone.display}
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="md:col-span-8">
              <Faq items={faqs} />
            </div>
          </div>
        </Container>
      </section>

      <QuoteBand />
    </>
  )
}
