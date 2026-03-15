import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Apex Logistics',
  description: 'Terms and conditions governing the use of Apex Logistics freight and delivery services.',
}

export default function TermsPage() {
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
          <h1 className="text-3xl font-semibold text-[#e8e4e0] mb-2">Terms of Service</h1>
          <p className="text-xs text-[#555] mb-10">Last updated: 15 March 2026</p>

          <div className="space-y-8 text-sm leading-relaxed text-[#8a8580]">
            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">1. Acceptance of Terms</h2>
              <p>
                By engaging Apex Logistics (Pty) Ltd (&quot;Apex&quot;, &quot;we&quot;, &quot;us&quot;), a subsidiary of Apex Metals, for any freight, delivery, or logistics services, you agree to be bound by these Terms of Service. If you do not agree, you must not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">2. Services</h2>
              <p>
                Apex provides road-freight logistics services across South Africa, including but not limited to furniture transport, wholesale delivery, and commodities &amp; metals haulage. All services are subject to availability, route feasibility, and applicable regulatory requirements.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">3. Booking &amp; Dispatch</h2>
              <p>
                A booking is confirmed only upon written acknowledgement (email, SMS, or WhatsApp) from our dispatch team. Estimated collection and delivery times are provided in good faith but are not guaranteed. Apex reserves the right to decline any booking at its sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">4. Cargo Responsibility</h2>
              <p>
                Clients must ensure all cargo is accurately described, lawfully possessed, and properly packaged. Apex is not liable for damage arising from inadequate packaging, inaccurate cargo declarations, or undisclosed hazardous materials. Clients are encouraged to maintain their own supplementary cargo insurance in addition to coverage provided by Apex.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">5. Transit Insurance &amp; Goods Protection</h2>
              <p className="mb-3">
                Apex Logistics maintains comprehensive transit insurance covering all goods from the point of collection to final delivery. Our standard coverage includes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mb-3">
                <li><span className="text-[#e8e4e0]">All-risk coverage:</span> protection against loss, theft, accidental damage, fire, and natural disasters while goods are in Apex custody</li>
                <li><span className="text-[#e8e4e0]">Door-to-door protection:</span> coverage applies from the moment goods are loaded at the collection address until offloaded at the delivery destination</li>
                <li><span className="text-[#e8e4e0]">Loading &amp; unloading:</span> goods are insured during the loading and unloading process when performed by Apex personnel</li>
                <li><span className="text-[#e8e4e0]">Warehousing:</span> goods temporarily held in Apex facilities are covered under warehouse-to-warehouse transit insurance</li>
              </ul>
              <p className="mb-3">
                Standard coverage is limited to the declared value of goods or R50,000 per shipment, whichever is lower. Clients transporting high-value cargo (metals, machinery, electronics, fine furniture) may request enhanced coverage by contacting our operations team prior to dispatch. Enhanced coverage premiums are quoted on a per-shipment basis.
              </p>
              <p>
                In the event of a claim, clients must notify Apex in writing within 7 days of delivery (or expected delivery date), providing photographic evidence of damage and a description of the loss. Claims are processed within 7 business days of receipt of complete documentation. Apex will not accept claims for pre-existing damage, normal wear and tear, or damage caused by improper packaging by the client.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">6. Prohibited Items</h2>
              <p>
                The following may not be shipped: explosives, firearms, illegal substances, perishable goods without prior arrangement, live animals, and any item prohibited under South African law. Apex reserves the right to inspect cargo at any point.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">7. Pricing &amp; Payment</h2>
              <p>
                Quotes are valid for 7 calendar days unless otherwise stated. Payment terms are strictly COD (Cash on Delivery) or pre-payment via EFT, unless a credit facility has been approved in writing. Late payments attract interest at 2% per month on outstanding balances.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">8. Liability &amp; Claims</h2>
              <p>
                Apex&apos;s total liability for any single shipment shall not exceed the declared value of the cargo or R50,000, whichever is lower. Claims must be submitted in writing within 7 days of delivery (or expected delivery date). Apex is not liable for delays caused by force majeure, road closures, strikes, or government action.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">9. Tracking &amp; Data</h2>
              <p>
                Tracking information is provided for convenience and may not reflect real-time position. Our proprietary dispatch platform collects telemetry data solely for operational optimisation and security purposes, in accordance with our <Link href="/privacy" className="text-[#D4AF37] underline underline-offset-2 hover:text-[#F3E5AB]">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">10. Cancellations</h2>
              <p>
                Cancellations made more than 24 hours before scheduled collection incur no fee. Cancellations within 24 hours are subject to a cancellation fee of 25% of the quoted price. No refund is available once a vehicle has been dispatched.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">11. Governing Law</h2>
              <p>
                These terms are governed by the laws of the Republic of South Africa. Any disputes shall be subject to the jurisdiction of the Gauteng Division of the High Court of South Africa.
              </p>
            </section>

            <section>
              <h2 className="text-lg text-[#e8e4e0] mb-3">12. Contact</h2>
              <p>
                For questions regarding these terms, contact us at{' '}
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
