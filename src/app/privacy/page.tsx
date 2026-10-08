import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { LegalPage, type LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects personal information under the Protection of Personal Information Act (POPIA).`,
  path: '/privacy',
})

const contact = (
  <>
    <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phones[0].display}
  </>
)

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a steel merchant based in {site.address.locality},{' '}
          {site.address.countryName}. We are the responsible party for the personal information described in this
          policy.
        </p>
        <p>
          Our Information Officer can be reached at {contact}. Questions, requests and complaints about your
          personal information go to the same address.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: (
      <>
        <p>We only collect what we need to quote, sell and deliver steel:</p>
        <ul>
          <li>
            <strong>Contact details</strong> such as your name, company, phone number and email address.
          </li>
          <li>
            <strong>Order details</strong> such as the products, sizes and quantities you ask for, cutting lists,
            delivery addresses and site contact names.
          </li>
          <li>
            <strong>Billing details</strong> such as invoice names, VAT and company registration numbers, and, for
            trade accounts, the information on your credit application.
          </li>
          <li>
            <strong>Messages</strong> you send us by WhatsApp, email, phone or the quote form on this website.
          </li>
          <li>
            <strong>Technical data</strong> our hosting provider records when you visit this site, such as your IP
            address, browser type and the pages requested. We use it to keep the site secure and working.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    body: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>prepare quotes and answer your questions;</li>
          <li>process, cut, deliver and invoice your orders;</li>
          <li>open and manage trade accounts;</li>
          <li>keep the records the law requires, including tax records;</li>
          <li>protect this website against abuse and spam.</li>
        </ul>
        <p>
          We process it because it is needed to carry out a contract with you or take steps you asked for, to
          comply with the law, or for our legitimate interest in running the business, as section 11 of POPIA
          allows.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and browser storage',
    body: (
      <>
        <p>
          This website does not use advertising or analytics cookies and does not track you across other sites.
        </p>
        <p>
          It stores one small value in your browser&apos;s session storage to remember that the opening animation
          has played, so it does not repeat on every page. It is deleted when you close the browser tab.
        </p>
        <p>
          Photographs on this site are loaded from the Unsplash image service (images.unsplash.com), so your browser
          connects to Unsplash to fetch them and Unsplash receives your IP address in the process.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: (
      <>
        <p>We do not sell or rent personal information. We share it only where needed with:</p>
        <ul>
          <li>service providers who host this website or deliver our email;</li>
          <li>WhatsApp (Meta), when you choose to contact us on WhatsApp;</li>
          <li>our bank, accountants and auditors, for payments and financial records;</li>
          <li>credit bureaus, if you apply for a trade account;</li>
          <li>the South African Revenue Service or other authorities where the law requires it.</li>
        </ul>
        <p>Anyone who processes information on our behalf must keep it confidential and secure.</p>
      </>
    ),
  },
  {
    id: 'cross-border',
    title: 'Information stored outside South Africa',
    body: (
      <p>
        Some of our service providers, including our website host and email provider, store data on servers
        outside South Africa. We only use providers that are bound by laws or agreements that give a level of
        protection similar to POPIA, as section 72 of POPIA requires.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: (
      <p>
        Quote requests that do not lead to an order are deleted after 12 months. Invoices, delivery notes and
        account records are kept for at least five years, as South African tax law requires, and then deleted or
        anonymised.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        This website uses encrypted connections (HTTPS). Access to customer records is limited to staff who need it.
        If we become aware of a breach that affects your information, we will tell you and the Information
        Regulator as POPIA requires.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under POPIA you may:</p>
        <ul>
          <li>ask what personal information we hold about you and get a copy of it;</li>
          <li>ask us to correct or delete information that is wrong, out of date or no longer needed;</li>
          <li>object to us processing your information, including for direct marketing;</li>
          <li>complain to the Information Regulator at inforeg.org.za.</li>
        </ul>
        <p>
          To use any of these rights, contact us at {contact}. We may ask you to confirm your identity before we act
          on a request.
        </p>
      </>
    ),
  },
  {
    id: 'marketing',
    title: 'Marketing',
    body: (
      <p>
        We do not send marketing messages unless you have asked for them or are an existing customer, and every
        message tells you how to opt out.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy. The date at the top shows when it last changed. Please also read our{' '}
        <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="8 October 2026"
      intro={
        <p>
          This policy explains what personal information {site.name} collects, why, and what you can ask us to do
          with it. It follows the Protection of Personal Information Act 4 of 2013 (POPIA).
        </p>
      }
      sections={sections}
    />
  )
}
