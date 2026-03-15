'use client'

import dynamic from 'next/dynamic'
import type { Shipment } from '@/lib/mockData'

const TrackingMap = dynamic(() => import('@/components/TrackingMap'), { ssr: false })

export function TrackingMapWrapper({ shipment }: { shipment: Shipment }) {
  return <TrackingMap shipment={shipment} />
}
