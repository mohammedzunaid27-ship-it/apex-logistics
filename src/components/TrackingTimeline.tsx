'use client'

import { motion } from 'framer-motion'
import { Package, Truck, MapPin, CheckCircle, Clock, type LucideIcon } from 'lucide-react'
import type { Shipment, ShipmentStatus } from '@/lib/mockData'

const EASE = [0.22, 1, 0.36, 1] as const

const STEPS: { status: ShipmentStatus; label: string; Icon: LucideIcon }[] = [
  { status: 'PENDING', label: 'Dispatched', Icon: Package },
  { status: 'TRANSIT', label: 'In Transit', Icon: Truck },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', Icon: MapPin },
  { status: 'DELIVERED', label: 'Delivered', Icon: CheckCircle },
]

const STATUS_ORDER: ShipmentStatus[] = ['PENDING', 'TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED']

function stepIndex(status: ShipmentStatus) {
  return STATUS_ORDER.indexOf(status)
}

function statusLabel(status: ShipmentStatus) {
  return STEPS.find((s) => s.status === status)?.label ?? status
}

export function TrackingTimeline({ shipment }: { shipment: Shipment }) {
  const currentIdx = stepIndex(shipment.status)

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <p className="text-[10px] tracking-[0.25em] text-[#8a8580] uppercase mb-1">
          Tracking Code
        </p>
        <h1
          className="text-4xl font-heading text-[#e8e4e0] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {shipment.trackingCode}
        </h1>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[10px] tracking-[0.15em] text-[#8a8580] uppercase mb-1">
              From
            </p>
            <p className="text-[#e8e4e0]">{shipment.origin}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.15em] text-[#8a8580] uppercase mb-1">
              To
            </p>
            <p className="text-[#e8e4e0]">{shipment.destination}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.15em] text-[#8a8580] uppercase mb-1">
              Cargo
            </p>
            <p className="text-[#e8e4e0]">{shipment.cargoType}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.15em] text-[#8a8580] uppercase mb-1">
              Status
            </p>
            <span className="inline-flex items-center gap-1.5 text-[#e8e4e0] font-medium">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  shipment.status === 'DELIVERED'
                    ? 'bg-[#D4AF37]'
                    : 'bg-[#F3E5AB]'
                }`}
              />
              {statusLabel(shipment.status)}
            </span>
          </div>
        </div>

        {shipment.status !== 'DELIVERED' && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-[10px] tracking-[0.15em] text-[#8a8580] uppercase mb-1">
              Estimated Delivery
            </p>
            <p className="text-[#e8e4e0] font-medium">
              {new Date(shipment.estimatedDelivery).toLocaleDateString('en-ZA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        )}
      </motion.div>

      {/* Timeline */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
        <p className="text-[10px] tracking-[0.25em] text-[#8a8580] uppercase mb-6">
          Shipment History
        </p>

        <div className="relative">
          {STEPS.map((step, i) => {
            const completed = i <= currentIdx
            const isCurrent = i === currentIdx
            const event = shipment.events.find((e) => e.status === step.status)
            const { Icon } = step

            return (
              <motion.div
                key={step.status}
                className="flex gap-4 relative"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: completed ? 1 : 0.35, x: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
              >
                {/* Vertical line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-5 top-10 w-px h-[calc(100%-16px)] bg-white/10">
                    <motion.div
                      className="w-full bg-[#D4AF37]"
                      initial={{ height: 0 }}
                      animate={{
                        height: i < currentIdx ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.12 + 0.3 }}
                    />
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                    completed
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-white/5 border border-white/10 text-[#8a8580]'
                  }`}
                >
                  <Icon size={17} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-2 pt-1.5 mb-1">
                    <span
                      className={`text-sm font-medium ${completed ? 'text-[#e8e4e0]' : 'text-[#8a8580]'}`}
                    >
                      {step.label}
                    </span>
                    {isCurrent && (
                      <motion.span
                        className="text-[10px] bg-[#D4AF37] text-black px-2 py-0.5 rounded-full tracking-wide font-semibold"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        Current
                      </motion.span>
                    )}
                  </div>

                  {event && (
                    <div>
                      <p className="text-sm text-[#8a8580]">{event.description}</p>
                      <p className="text-xs text-[#555] mt-1 flex items-center gap-1">
                        <Clock size={11} />
                        {new Date(event.timestamp).toLocaleString('en-ZA', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                        {' · '}
                        {event.location}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
