import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { LegalPage, type LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = pageMeta({
  title: 'Terms & Conditions',
  description: `Terms and conditions for quotes, orders, cutting, delivery and returns when buying steel from ${site.name}, ${site.address.locality}.`,
  path: '/terms',
})

const sections: LegalSection[] = [
  {
    id: 'about',
    title: 'About these terms',
    body: (
      <>
        <p>
          These terms apply to your use of this website and to every quote, order, sale, cutting job and delivery by{' '}
          {site.name}, {site.address.locality} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By placing an order you accept
          them. Anything we agree with you in writing for a specific order takes priority over these terms.
        </p>
        <p>
          If the Consumer Protection Act 68 of 2008 applies to you, nothing in these terms limits the rights it
          gives you.
        </p>
      </>
    ),
  },
  {
    id: 'website',
    title: 'Information on this website',
    body: (
      <p>
        Product ranges and sizes on this website show what we usually stock. They are not a promise that a
        particular item is available on a particular day, and the website does not show prices. Photographs are for
        illustration. Always confirm availability and price with us before ordering.
      </p>
    ),
  },
  {
    id: 'quotes',
    title: 'Quotes',
    body: (
      <p>
        Steel prices move with the market, so a quote is valid for 7 days unless it says otherwise, and is subject to
        stock being available when you order. Quotes are based on the sizes and quantities you give us. If we make
        an obvious pricing or typing error we may correct it before the order is confirmed.
      </p>
    ),
  },
  {
    id: 'orders',
    title: 'Orders',
    body: (
      <p>
        An order is confirmed when we accept it in writing (including by email or WhatsApp) or when we receive your
        payment, whichever comes first. Please check sizes, quantities and cutting lists carefully, because we cut to
        what you give us.
      </p>
    ),
  },
  {
    id: 'payment',
    title: 'Prices and payment',
    body: (
      <>
        <p>
          Prices are in South African rand. Your quote and invoice show whether VAT is included. Unless you have an
          approved trade account, payment is due before collection or delivery.
        </p>
        <p>
          Goods stay our property until they are paid in full. Risk in the goods passes to you when they are
          delivered or collected.
        </p>
      </>
    ),
  },
  {
    id: 'tolerances',
    title: 'Sizes, weights and finish',
    body: (
      <>
        <p>
          Steel is supplied within the manufacturer&apos;s standard tolerances for dimensions, weight, straightness
          and flatness. Where we sell by weight, we may use the published theoretical mass of the section.
        </p>
        <p>
          Light surface rust and mill scale on uncoated (black) steel is normal and is not a defect. Saw-cut and
          guillotined edges may have burrs.
        </p>
      </>
    ),
  },
  {
    id: 'cutting',
    title: 'Cutting and folding',
    body: (
      <p>
        Items we cut, guillotine or fold are made to your instructions. They cannot be returned unless they do not
        match the dimensions you gave us. Offcuts belong to you unless you ask us to keep them.
      </p>
    ),
  },
  {
    id: 'suitability',
    title: 'Choosing the right steel',
    body: (
      <p>
        We are happy to tell you what is available and what is commonly used, but we do not provide engineering
        design. Choosing sections, grades and sizes for a structure is your responsibility or that of your
        engineer.
      </p>
    ),
  },
  {
    id: 'delivery',
    title: 'Delivery',
    body: (
      <>
        <p>
          Delivery times we give are our best estimate and may be affected by traffic, weather, load-shedding or
          other events outside our control.
        </p>
        <p>
          You must give our vehicle safe access to the delivery point and arrange offloading, including a crane or
          enough people for heavy items, unless we have agreed otherwise. Someone must be on site to receive and sign
          for the goods. We may charge for waiting time or a second trip if a delivery cannot be completed for these
          reasons.
        </p>
      </>
    ),
  },
  {
    id: 'collection',
    title: 'Collection',
    body: (
      <p>
        If you collect, please bring a vehicle that can legally and safely carry the load. We will help load it, but
        the driver is responsible for securing the load before leaving the yard.
      </p>
    ),
  },
  {
    id: 'checking',
    title: 'Checking your order',
    body: (
      <p>
        Please check goods when they are delivered or collected and note any shortage or visible damage on the
        delivery note. Tell us about anything else that is wrong within 2 business days so we can put it right.
      </p>
    ),
  },
  {
    id: 'returns',
    title: 'Returns',
    body: (
      <p>
        Uncut stock items in resaleable condition may be returned within 7 days by arrangement, and a handling fee
        may apply. Cut, folded or specially ordered items cannot be returned unless they are defective or not what
        you ordered. This does not affect your rights under the Consumer Protection Act, including the right to
        return defective goods within six months.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    body: (
      <p>
        As far as the law allows, our liability for any order is limited to the price paid for the goods concerned,
        and we are not liable for indirect losses such as lost profit or delays to your project. This does not
        limit liability that cannot be excluded by law.
      </p>
    ),
  },
  {
    id: 'accounts',
    title: 'Trade accounts',
    body: (
      <p>
        Trade accounts are subject to a credit application and approval, and to the payment terms agreed on that
        application.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: (
      <p>
        We handle your personal information as described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of the Republic of South Africa. You agree that the Magistrate&apos;s
        Court with jurisdiction may hear any dispute, even if the amount would otherwise exceed its limit.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a> or{' '}
        <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].display}</a>.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms"
      updated="8 October 2026"
      intro={
        <p>
          The terms below cover buying steel from {site.name}: quotes, orders, cutting, delivery and returns. They
          are written in plain language.
        </p>
      }
      sections={sections}
    />
  )
}
