import { notFound } from 'next/navigation'
import { mockShipments } from '@/lib/mockData'
import { TrackingTimeline } from '@/components/TrackingTimeline'
import { TrackingMapWrapper } from '@/components/TrackingMapWrapper'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const shipment = mockShipments[id]

  if (!shipment) {
    return { title: 'Shipment Not Found | Apex Logistics' }
  }

  return {
    title: `${shipment.trackingCode} — ${shipment.status.replace(/_/g, ' ')} | Apex Logistics`,
    description: `Track APX shipment ${shipment.trackingCode}. Currently: ${shipment.currentLocation}.`,
  }
}

export default async function TrackPage({ params }: Props) {
  const { id } = await params

  if (!/^\d{4}$/.test(id)) {
    notFound()
  }

  const shipment = mockShipments[id]

  if (!shipment) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/#track"
          className="inline-flex items-center gap-2 text-sm text-[#8a8580] hover:text-[#D4AF37] transition-colors mb-8 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to tracking
        </Link>

        {/* Live Route Map */}
        <div className="mb-6">
          <TrackingMapWrapper shipment={shipment} />
        </div>

        <TrackingTimeline shipment={shipment} />
      </div>
    </main>
  )
}
