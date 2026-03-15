'use client'

import { motion } from 'framer-motion'
import { Sofa, Package, Gem, Truck } from 'lucide-react'
import { AnimateInView } from './AnimateInView'

const EASE = [0.22, 1, 0.36, 1] as const

const services = [
  {
    icon: Sofa,
    title: 'Furniture Transport',
    description:
      'Specialised handling and nationwide delivery of residential and commercial furniture. Fully padded vehicles, careful loading, damage-free guarantee.',
    tag: 'Residential & Commercial',
  },
  {
    icon: Package,
    title: 'Wholesale Delivery',
    description:
      'High-volume, time-critical wholesale logistics. We move bulk orders for retailers and distributors across all nine provinces with precision scheduling.',
    tag: 'High Volume',
  },
  {
    icon: Gem,
    title: 'Commodities & Metals',
    description:
      'Secure transportation of all metal types and physical natural resources — steel, copper, aluminium, and beyond. Part of the Apex Metals heritage.',
    tag: 'Apex Metals Heritage',
  },
  {
    icon: Truck,
    title: 'General Road Freight',
    description:
      'Flexible road freight solutions for any cargo type. Dedicated vehicles or shared loads available, with real-time APX tracking throughout.',
    tag: 'Nationwide',
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimateInView>
          <p className="text-xs tracking-[0.25em] text-[#4a4a4a] uppercase mb-4 text-center">
            What We Move
          </p>
          <h2
            className="text-4xl md:text-5xl font-heading text-[#1a1a1a] text-center mb-16 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Services
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <AnimateInView key={service.title} delay={i * 0.08}>
                <motion.div
                  className="glass-card rounded-2xl p-8 h-full flex flex-col gap-4 group cursor-default"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#2a2a2a] transition-colors">
                      <Icon size={22} className="text-[#e5dad6]" />
                    </div>
                    <span className="text-[10px] tracking-[0.15em] text-[#9a9490] uppercase pt-1">
                      {service.tag}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-heading text-[#1a1a1a]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#4a4a4a] leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
