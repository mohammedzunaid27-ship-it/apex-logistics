import type { Metadata } from 'next'
import { Suspense } from 'react'
import { site, whatsappLink } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { faqs } from '@/lib/content'
import { localBusinessSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { QuoteForm, QuoteFormFromParams } from '@/components/QuoteForm'
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/Icons'
import { Container, Faq, PageHero } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: 'Contact & Quotes',
  description: `Get a steel quote from ${site.name} in ${site.address.locality}. Call ${site.phones[0].display}, WhatsApp or email ${site.email} with your sizes and quantities.`,
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        trail={[{ name: 'Contact', path: '/contact' }]}
        label="Quotes · Orders · Questions"
        title="Get a quote"
        intro={
          <p>
            Quotations, prices, new orders or a delivery question. Send the material, sizes, quantities and where it
            needs to go. WhatsApp or a call is quickest, and the form below works just as well.
          </p>
        }
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <ul className="border-t border-line">
                {site.phones.map((p, i) => (
                  <li key={p.tel} className="border-b border-line">
                    <a href={`tel:${p.tel}`} className="group flex items-center justify-between gap-4 py-6">
                      <span>
                        <span className="label block">Phone {i + 1}</span>
                        <span className="mt-2 block font-display text-4xl font-extrabold leading-none transition-colors group-hover:text-molten">
                          {p.display}
                        </span>
                      </span>
                      <PhoneIcon size={18} className="text-muted" />
                    </a>
                  </li>
                ))}
                <li className="border-b border-line">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-6">
                    <span>
                      <span className="label block">WhatsApp</span>
                      <span className="mt-2 block font-display text-4xl font-extrabold leading-none transition-colors group-hover:text-[#25d366]">
                        {site.phones[0].display}
                      </span>
                    </span>
                    <WhatsAppIcon size={20} className="text-[#25d366]" />
                  </a>
                </li>
                <li className="border-b border-line">
                  <a href={`mailto:${site.email}`} className="group flex items-center justify-between gap-4 py-6">
                    <span className="min-w-0">
                      <span className="label block">Email</span>
                      <span className="mt-2 block truncate text-xl transition-colors group-hover:text-molten">{site.email}</span>
                    </span>
                    <MailIcon size={18} className="shrink-0 text-muted" />
                  </a>
                </li>
                <li className="border-b border-line py-6">
                  <span className="label flex items-center gap-2">
                    <PinIcon size={13} /> Yard
                  </span>
                  <address className="mt-2 not-italic text-xl">
                    {site.address.locality}, {site.address.region}
                  </address>
                  <p className="mt-2 text-sm text-muted">Delivering nationwide.</p>
                </li>
              </ul>
            </aside>

            <div id="quote" className="scroll-mt-28 lg:col-span-8">
              <Suspense fallback={<QuoteForm />}>
                <QuoteFormFromParams />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="seam" />
              <h2 className="display-md mt-6">Common questions</h2>
            </div>
            <div className="md:col-span-8">
              <Faq items={faqs.slice(0, 4)} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
