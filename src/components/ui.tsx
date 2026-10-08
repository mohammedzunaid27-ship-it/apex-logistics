import Link from 'next/link'
import { products, type Product } from '@/lib/content'
import { primaryPhone, whatsappLink } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/schema'
import { ArrowRight, ArrowUpRight, PhoneIcon, PlusIcon, ProfileIcon, WhatsAppIcon } from './Icons'
import { JsonLd } from './JsonLd'

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 ${className}`}>{children}</div>
}

export function SectionHead({
  index,
  label,
  title,
  intro,
  className = '',
}: {
  index: string
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`grid gap-8 md:grid-cols-12 ${className}`} data-reveal>
      <div className="md:col-span-12">
        <div className="seam" />
        <p className="label mt-4 flex gap-4">
          <span className="text-molten">{index}</span>
          <span>{label}</span>
        </p>
      </div>
      <h2 className="display-lg md:col-span-7">{title}</h2>
      {intro ? <div className="self-end text-muted md:col-span-4 md:col-start-9">{intro}</div> : null}
    </div>
  )
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const all = [{ name: 'Home', path: '/' }, ...trail]
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb">
        <ol className="label flex flex-wrap items-center gap-2">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span className="text-faint">/</span>}
              {i < all.length - 1 ? (
                <Link href={c.path} className="inline-flex min-h-[40px] min-w-[40px] items-center hover:text-fg">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-fg">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export function PageHero({
  trail,
  label,
  title,
  intro,
  children,
}: {
  trail: { name: string; path: string }[]
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="pb-16 pt-[128px] md:pb-24 md:pt-[168px]">
      <Container>
        <Breadcrumbs trail={trail} />
        <p className="label mt-10 text-molten">{label}</p>
        <h1 className="display-xl mt-4 max-w-[14ch]">{title}</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          {intro ? <div className="text-lg text-muted md:col-span-6">{intro}</div> : null}
          {children ? <div className="md:col-span-5 md:col-start-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  )
}

export function ProductRows({ items = products }: { items?: Product[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((p) => {
        const n = products.indexOf(p) + 1
        return (
          <li key={p.slug} className="border-b border-line" data-reveal>
            <Link
              href={`/products/${p.slug}`}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-6 transition-colors sm:py-7 hover:bg-white/[0.02] lg:grid-cols-12 lg:gap-x-8 lg:py-9"
            >
              <span className="label hidden lg:col-span-1 lg:block">0{n}</span>
              <ProfileIcon
                name={p.profile}
                size={52}
                className="text-steel transition-colors duration-300 group-hover:text-molten lg:col-span-1"
              />
              <div className="lg:col-span-4">
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none lg:text-[2.75rem]">
                  {p.name}
                </h3>
              </div>
              <span className="flex h-11 w-11 items-center justify-center border border-line-strong transition-colors group-hover:border-molten group-hover:bg-molten group-hover:text-base lg:order-last lg:col-span-1 lg:justify-self-end">
                <ArrowUpRight />
              </span>
              <p className="col-span-3 text-sm text-muted sm:pl-[72px] lg:col-span-3 lg:pl-0">{p.short}</p>
              <p className="label col-span-3 hidden lg:col-span-2 lg:block">
                {p.items
                  .slice(0, 3)
                  .map((i) => i.name)
                  .join(' · ')}
              </p>
              <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-molten transition-[width] duration-500 group-hover:w-full" />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line" data-reveal>
          <summary className="flex items-start justify-between gap-6 py-6">
            <h3 className="font-body text-lg font-medium normal-case leading-snug tracking-normal md:text-xl">
              {f.q}
            </h3>
            <PlusIcon size={18} className="faq-plus mt-1 shrink-0 text-muted transition-transform duration-300" />
          </summary>
          <p className="max-w-3xl pb-7 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function QuoteBand({ title = 'Send us your cutting list' }: { title?: string }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="panel ticks relative overflow-hidden px-5 py-12 sm:px-8 md:px-14 md:py-20" data-reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-molten">Phone, WhatsApp or email</p>
              <h2 className="display-lg mt-5">{title}</h2>
              <p className="mt-6 max-w-xl text-muted">
                Sizes, quantities and where it needs to go. A photo of a handwritten list is fine. We reply with a
                written price.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-4 lg:col-start-9 lg:flex-col">
              <Link href="/contact#quote" className="btn btn-molten w-full sm:w-auto lg:w-full">
                Request a quote <ArrowRight />
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-line w-full sm:w-auto lg:w-full">
                <WhatsAppIcon size={16} className="text-[#25d366]" /> Send it on WhatsApp
              </a>
              <a href={`tel:${primaryPhone.tel}`} className="btn btn-line w-full sm:w-auto lg:w-full">
                <PhoneIcon size={14} /> {primaryPhone.display}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
