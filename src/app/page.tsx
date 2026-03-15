'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Truck, Package, Shield, ArrowRight, Brain, Route, Lock, Gauge, Cpu, Satellite } from 'lucide-react'
import { heading } from '@/lib/fonts'
import DataLines from '@/components/DataLines'

const QuantumBackground = dynamic(() => import('@/components/QuantumBackground'), {
  ssr: false,
})

const springTransition = { type: 'spring' as const, stiffness: 300, damping: 20 }

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease },
}

const liftCard = {
  whileHover: { y: -12, scale: 1.02, transition: springTransition },
}

export default function Page() {
  return (
    <>
      {/* Isolated WebGL background */}
      <QuantumBackground />

      {/* Warm ambient glow orb */}
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 blur-[150px] rounded-full -z-[5]" />

      <div className="relative min-h-screen">
        {/* Animated circuit data lines — behind sphere, behind content */}
        <DataLines />

        {/* ── Hero ── */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-20">
          <motion.h1
            className={`${heading.className} shimmer-text max-w-4xl text-center text-5xl font-bold leading-tight tracking-widest md:text-7xl md:leading-tight uppercase`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            MOVING SOUTH AFRICA FORWARD.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-center text-lg text-[#8a8580]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            Premium dispatch and route visibility for high-value commodities.
          </motion.p>

          <motion.div
            className="mt-10 flex gap-10 text-center text-sm text-[#8a8580]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <div>
              <p className="text-3xl font-semibold text-[#e8e4e0]">10+</p>
              <p className="mt-1">Years Experience</p>
            </div>
            <div className="h-12 w-px bg-[#D4AF37]/20" />
            <div>
              <p className="text-3xl font-semibold text-[#e8e4e0]">2,500+</p>
              <p className="mt-1">Deliveries</p>
            </div>
            <div className="h-12 w-px bg-[#D4AF37]/20" />
            <div>
              <p className="text-3xl font-semibold text-[#e8e4e0]">99.2%</p>
              <p className="mt-1">Success Rate</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
          >
            <a
              href="#track"
              className="flex items-center gap-2 rounded-xl bg-[#D4AF37] px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#F3E5AB]"
            >
              Track Shipment
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="rounded-xl border border-[#D4AF37]/25 px-8 py-4 text-sm font-medium text-[#e8e4e0] transition hover:border-[#D4AF37]/50 hover:bg-white/5"
            >
              Explore Services
            </a>
          </motion.div>
        </section>

        {/* ── Tracking ── */}
        <section id="track" className="px-4 py-28">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-10 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              {...fadeUp}
              {...liftCard}
            >
              <h2 className="text-center text-3xl text-[#e8e4e0] md:text-4xl">
                Track Your Cargo
              </h2>
              <p className="mt-3 text-center text-sm text-[#8a8580]">
                Enter your APX tracking code to view live milestone updates.
              </p>
              <form
                className="mt-8 flex gap-3"
                action="/track"
                method="GET"
              >
                <input
                  name="id"
                  placeholder="APX-####"
                  className="h-14 flex-1 rounded-xl border border-white/10 bg-white/5 px-5 text-lg text-[#e8e4e0] placeholder-[#555] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <button
                  type="submit"
                  className="h-14 rounded-xl bg-[#D4AF37] px-8 text-sm font-semibold text-black transition hover:bg-[#F3E5AB]"
                >
                  Track
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-[#555]">
                e.g. APX-1001, APX-2048, APX-4096
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="px-4 py-28">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              className="text-center text-3xl text-[#e8e4e0] md:text-4xl"
              {...fadeUp}
            >
              Our Services
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-lg text-center text-sm text-[#8a8580]"
              {...fadeUp}
            >
              Nationwide logistics specialising in high-value and time-sensitive cargo.
            </motion.p>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] group p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Truck size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Furniture Transport
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Secure handling and delivery of residential &amp; commercial
                  furniture nationwide.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] group p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Package size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Wholesale Delivery
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Bulk distribution for retail and wholesale clients across all
                  provinces.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] group p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Shield size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Commodities &amp; Metals
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Specialised transport for metals, minerals, and natural
                  resources.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why Trust Apex ── */}
        <section id="technology" className="px-4 py-28">
          <div className="mx-auto max-w-5xl">
            <motion.div className="text-center" {...fadeUp}>
              <p className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase mb-3">
                Proprietary Intelligence
              </p>
              <h2 className="text-3xl text-[#e8e4e0] md:text-4xl">
                Why Trust Apex Logistics
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#8a8580]">
                We don&apos;t rely on consumer-grade navigation. Our proprietary dispatch platform integrates
                machine learning route optimisation, real-time telematics, and predictive risk modelling
                to deliver cargo faster and safer than any standard GPS solution.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Brain size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  AI-Powered Route Engine
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Our neural-network route planner analyses live traffic telemetry, weather forecasts,
                  road surface data, and historical incident patterns to calculate the optimal corridor
                  for every shipment — routes that Waze and Google Maps simply don&apos;t factor in for
                  heavy-freight logistics.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Satellite size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Real-Time Telematics & GPS
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Every vehicle in our fleet transmits live GPS coordinates, speed, fuel levels, and
                  cargo-bay temperature via our proprietary IoT telematics unit. Our operations centre
                  monitors each shipment 24/7, enabling instant rerouting if conditions change en route.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Lock size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Predictive Risk & Security
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Our risk-scoring algorithm evaluates route segments against crime heatmaps, time-of-day
                  threat levels, and provincial incident databases. High-value loads are automatically
                  assigned armoured corridors and convoy protocols — security built into every dispatch.
                </p>
              </motion.div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Gauge size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Dynamic ETA Forecasting
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Forget static delivery windows. Our system recalculates ETAs every 60 seconds using
                  live vehicle telemetry and downstream traffic conditions, giving you minute-level
                  accuracy on when your cargo will arrive.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Cpu size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Proprietary Dispatch OS
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Built in-house, our dispatch operating system replaces fragmented third-party tools
                  with a single command layer: fleet allocation, load optimisation, compliance checks,
                  and proof-of-delivery — all orchestrated through one intelligent platform.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                {...liftCard}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                  <Route size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#e8e4e0]">
                  Heavy-Freight Corridor Mapping
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">
                  Consumer navigation apps optimise for cars. Our corridor database accounts for
                  bridge weight limits, axle restrictions, low-clearance overpasses, and fuel-stop
                  logistics — eliminating costly detours and compliance violations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="px-4 py-28">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-10 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
              {...fadeUp}
              {...liftCard}
            >
              <h2 className="text-center text-3xl text-[#e8e4e0] md:text-4xl">
                Contact Operations
              </h2>
              <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-[#8a8580]">
                <a
                  href="tel:0615456926"
                  className="transition-colors hover:text-[#D4AF37]"
                >
                  061 545 6926
                </a>
                <a
                  href="tel:0714907858"
                  className="transition-colors hover:text-[#D4AF37]"
                >
                  071 490 7858
                </a>
                <a
                  href="mailto:ApexLogistics@gmail.com"
                  className="transition-colors hover:text-[#D4AF37]"
                >
                  ApexLogistics@gmail.com
                </a>
              </div>

              <form className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-[#e8e4e0] placeholder-[#555] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-[#e8e4e0] placeholder-[#555] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <textarea
                  placeholder="Describe your route or cargo requirements"
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-[#e8e4e0] placeholder-[#555] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <button
                  type="submit"
                  className="h-14 w-full rounded-xl bg-[#D4AF37] text-sm font-semibold text-black transition hover:bg-[#F3E5AB]"
                >
                  Send Request
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
