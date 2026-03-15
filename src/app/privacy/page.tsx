import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Apex Logistics',
  description: 'How Apex Logistics collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm text-[#8a8580] hover:text-[#D4AF37] transition-colors mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 md:p-12">
          <h1 className="text-3xl font-semibold text-[#e8e4e0] mb-2">Privacy Policy</h1>
          <p className="text-xs text-[#555] mb-10">Last updated: 15 March 2026</p>

          <div className="space-y-8 text-sm leading-relaxed text-[#8a8580]">
            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">1. Introduction</h2>
              <p>
                Apex Logistics (Pty) Ltd (&quot;Apex&quot;, &quot;we&quot;, &quot;us&quot;), a subsidiary of Apex Metals, is committed to protecting your personal information in compliance with the Protection of Personal Information Act, 2013 (POPIA) and other applicable South African legislation.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect the following categories of personal information:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><span className="text-[#e8e4e0]">Contact details:</span> name, email address, phone number, physical address</li>
                <li><span className="text-[#e8e4e0]">Shipment data:</span> cargo descriptions, origin/destination addresses, tracking interactions</li>
                <li><span className="text-[#e8e4e0]">Website analytics:</span> IP address, browser type, pages visited, session duration (via cookies)</li>
                <li><span className="text-[#e8e4e0]">Communication records:</span> emails, WhatsApp messages, and call logs related to service enquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Processing and fulfilling logistics bookings</li>
                <li>Providing real-time shipment tracking and delivery notifications</li>
                <li>Optimising routes via our proprietary AI dispatch platform</li>
                <li>Communicating service updates, invoices, and operational alerts</li>
                <li>Improving our website, services, and customer experience</li>
                <li>Complying with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">4. AI &amp; Telematics Data</h2>
              <p>
                Our proprietary dispatch platform processes vehicle telemetry data (GPS coordinates, speed, fuel consumption) and environmental data (traffic patterns, weather, road conditions) to optimise delivery routes. This data is processed algorithmically and is not linked to the personal identity of individual drivers or clients. All telematics data is encrypted in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">5. Insurance &amp; Claims Data</h2>
              <p className="mb-3">
                When you make use of our transit insurance coverage or submit a claim, we collect and process additional information including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mb-3">
                <li><span className="text-[#e8e4e0]">Cargo details:</span> declared value, item descriptions, photographs of goods before and after transit</li>
                <li><span className="text-[#e8e4e0]">Incident data:</span> date, location, and nature of any loss, theft, or damage</li>
                <li><span className="text-[#e8e4e0]">Supporting documents:</span> invoices, receipts, proof of ownership, and any police report references</li>
                <li><span className="text-[#e8e4e0]">Banking details:</span> required solely for processing claim payouts via EFT</li>
              </ul>
              <p>
                Insurance-related data is shared only with our underwriting partners for the purpose of processing and settling claims. This data is retained for a minimum of 5 years in compliance with South African insurance and financial regulation. All insurance data is encrypted and access-controlled to authorised personnel only.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">6. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience and analyse traffic. You can manage cookie preferences through your browser settings or via our cookie consent banner. We use:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li><span className="text-[#e8e4e0]">Essential cookies:</span> required for site functionality (session management, security)</li>
                <li><span className="text-[#e8e4e0]">Analytics cookies:</span> help us understand how visitors interact with our site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">7. Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share data with trusted third parties solely for service delivery (e.g., insurance providers, subcontracted carriers). All third parties are contractually bound to protect your data in accordance with POPIA.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">8. Data Security</h2>
              <p>
                We employ industry-standard security measures including TLS encryption, access controls, and regular security audits to protect your personal information against unauthorised access, alteration, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">9. Data Retention</h2>
              <p>
                Personal information is retained only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Shipment records are retained for a minimum of 5 years in compliance with South African tax and commercial legislation.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">10. Your Rights</h2>
              <p>Under POPIA, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction or deletion of your personal information</li>
                <li>Object to the processing of your personal information</li>
                <li>Lodge a complaint with the Information Regulator of South Africa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">11. Contact</h2>
              <p>
                For privacy-related enquiries or to exercise your rights, contact our Information Officer at{' '}
                <a href="mailto:ApexLogistics@gmail.com" className="text-[#D4AF37] hover:text-[#F3E5AB]">ApexLogistics@gmail.com</a>
                {' '}or call{' '}
                <a href="tel:0615456926" className="text-[#D4AF37] hover:text-[#F3E5AB]">061 545 6926</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
