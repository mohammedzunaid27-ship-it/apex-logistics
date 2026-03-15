'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Truck, Package, Shield, ArrowRight, Brain, Route, Lock, Gauge, Cpu, Satellite } from 'lucide-react'
import { heading } from '@/lib/fonts'
import { useIsMobile } from '@/hooks/useIsMobile'

const QuantumBackground = dynamic(() => import('@/components/QuantumBackground'), {
  ssr: false,
})

const DataLines = dynamic(() => import('@/components/DataLines'), {
  ssr: false,
})

const ease = [0.22, 1, 0.36, 1] as const

/* Card class: blur on desktop, solid bg on mobile */
const card = 'glass-card-perf rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]'

export default function Page() {
  const mobile = useIsMobile()

  // On mobile: no JS animations, everything renders instantly
  const fadeUp = mobile
    ? {}
    : {
        initial: { opacity: 0, y: 40 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: '-60px' } as const,
        transition: { duration: 0.6, ease },
      }

  const liftCard = mobile
    ? {}
    : {
        whileHover: {
          y: -12,
          scale: 1.02,
          transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
        },
      }

  const heroAnim = mobile
    ? {}
    : { initial: { opacity: 0, y: 30 } as const, animate: { opacity: 1, y: 0 } as const }

  return (
    <>
      {/* WebGL sphere — always rendered, static on mobile */}
      <QuantumBackground />

      {/* Warm ambient glow orb — smaller on mobile */}
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-[#D4AF37]/10 blur-[80px] md:blur-[150px] rounded-full -z-[5]" />

      <div className="relative min-h-screen">
        {/* Animated circuit data lines — fewer on mobile */}
        <DataLines />

        {/* ── Hero ── */}
        <section className="flex min-h-[100svh] flex-col items-center justify-center px-4 pt-24 sm:pt-28 pb-16 sm:pb-20">
          <motion.h1
            className={`${heading.className} shimmer-text max-w-4xl text-center text-3xl sm:text-5xl font-bold leading-tight tracking-widest md:text-7xl md:leading-tight uppercase`}
            {...heroAnim}
            transition={{ duration: 0.8, ease }}
          >
            MOVING SOUTH AFRICA FORWARD
          </motion.h1>
          <motion.p
            className="mt-4 sm:mt-6 max-w-xl text-center text-base sm:text-lg text-[#8a8580] px-2"
            {...(mobile ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.8, delay: mobile ? 0 : 0.15, ease }}
          >
            Premium dispatch and route visibility for high-value commodities.
          </motion.p>

          <motion.div
            className="mt-8 sm:mt-10 flex gap-6 sm:gap-10 text-center text-xs sm:text-sm text-[#8a8580]"
            {...(mobile ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.8, delay: mobile ? 0 : 0.3, ease }}
          >
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#e8e4e0]">10+</p>
              <p className="mt-1">Years Experience</p>
            </div>
            <div className="h-10 sm:h-12 w-px bg-[#D4AF37]/20" />
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#e8e4e0]">2,500+</p>
              <p className="mt-1">Deliveries</p>
            </div>
            <div className="h-10 sm:h-12 w-px bg-[#D4AF37]/20" />
            <div>
              <p className="text-2xl sm:text-3xl font-semibold text-[#e8e4e0]">99.2%</p>
              <p className="mt-1">Success Rate</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            {...(mobile ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.8, delay: mobile ? 0 : 0.45, ease }}
          >
            <a
              href="#track"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#F3E5AB]"
            >
              Track Shipment
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="rounded-xl border border-[#D4AF37]/25 px-8 py-4 text-sm font-medium text-[#e8e4e0] transition hover:border-[#D4AF37]/50 hover:bg-white/5 text-center"
            >
              Explore Services
            </a>
          </motion.div>
        </section>

        {/* ── Tracking ── */}
        <section id="track" className="px-4 py-16 sm:py-28">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className={`${card} p-6 sm:p-10`}
              {...fadeUp}
              {...liftCard}
            >
              <h2 className="text-center text-2xl sm:text-3xl text-[#e8e4e0] md:text-4xl">
                Track Your Cargo
              </h2>
              <p className="mt-3 text-center text-sm text-[#8a8580]">
                Enter your APX tracking code to view live milestone updates.
              </p>
              <form
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3"
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
        <section id="services" className="px-4 py-16 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              className="text-center text-2xl sm:text-3xl text-[#e8e4e0] md:text-4xl"
              {...fadeUp}
            >
              Our Services
            </motion.h2>
            <motion.p
              className="mx-auto mt-3 sm:mt-4 max-w-lg text-center text-sm text-[#8a8580]"
              {...fadeUp}
            >
              Nationwide logistics specialising in high-value and time-sensitive cargo.
            </motion.p>

            <div className="mt-8 sm:mt-14 grid gap-4 sm:gap-6 md:grid-cols-3">
              {[
                { Icon: Truck, title: 'Furniture Transport', desc: 'Secure handling and delivery of residential & commercial furniture nationwide.' },
                { Icon: Package, title: 'Wholesale Delivery', desc: 'Bulk distribution for retail and wholesale clients across all provinces.' },
                { Icon: Shield, title: 'Commodities & Metals', desc: 'Specialised transport for metals, minerals, and natural resources.' },
              ].map((svc, i) => (
                <motion.div
                  key={svc.title}
                  className={`${card} group p-6 sm:p-8`}
                  {...fadeUp}
                  {...(!mobile && i > 0 ? { transition: { ...fadeUp.transition, delay: i * 0.1 } } : {})}
                  {...liftCard}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                    <svc.Icon size={22} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 text-lg font-semibold text-[#e8e4e0]">{svc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">{svc.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Trust Apex ── */}
        <section id="technology" className="px-4 py-16 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.div className="text-center" {...fadeUp}>
              <p className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase mb-3">
                Proprietary Intelligence
              </p>
              <h2 className="text-2xl sm:text-3xl text-[#e8e4e0] md:text-4xl">
                Why Trust Apex Logistics
              </h2>
              <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm leading-relaxed text-[#8a8580] px-2">
                We don&apos;t rely on consumer-grade navigation. Our proprietary dispatch platform integrates
                machine learning route optimisation, real-time telematics, and predictive risk modelling
                to deliver cargo faster and safer than any standard GPS solution.
              </p>
            </motion.div>

            {[
              [
                { Icon: Brain, title: 'AI-Powered Route Engine', desc: "Our neural-network route planner analyses live traffic telemetry, weather forecasts, road surface data, and historical incident patterns to calculate the optimal corridor for every shipment — routes that Waze and Google Maps simply don't factor in for heavy-freight logistics." },
                { Icon: Satellite, title: 'Real-Time Telematics & GPS', desc: 'Every vehicle in our fleet transmits live GPS coordinates, speed, fuel levels, and cargo-bay temperature via our proprietary IoT telematics unit. Our operations centre monitors each shipment 24/7, enabling instant rerouting if conditions change en route.' },
                { Icon: Lock, title: 'Predictive Risk & Security', desc: 'Our risk-scoring algorithm evaluates route segments against crime heatmaps, time-of-day threat levels, and provincial incident databases. High-value loads are automatically assigned armoured corridors and convoy protocols — security built into every dispatch.' },
              ],
              [
                { Icon: Gauge, title: 'Dynamic ETA Forecasting', desc: 'Forget static delivery windows. Our system recalculates ETAs every 60 seconds using live vehicle telemetry and downstream traffic conditions, giving you minute-level accuracy on when your cargo will arrive.' },
                { Icon: Cpu, title: 'Proprietary Dispatch OS', desc: 'Built in-house, our dispatch operating system replaces fragmented third-party tools with a single command layer: fleet allocation, load optimisation, compliance checks, and proof-of-delivery — all orchestrated through one intelligent platform.' },
                { Icon: Route, title: 'Heavy-Freight Corridor Mapping', desc: 'Consumer navigation apps optimise for cars. Our corridor database accounts for bridge weight limits, axle restrictions, low-clearance overpasses, and fuel-stop logistics — eliminating costly detours and compliance violations.' },
              ],
            ].map((row, ri) => (
              <div key={ri} className={`${ri === 0 ? 'mt-10 sm:mt-16' : 'mt-4 sm:mt-6'} grid gap-4 sm:gap-6 md:grid-cols-3`}>
                {row.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className={`${card} p-6 sm:p-8`}
                    {...fadeUp}
                    {...(!mobile && i > 0 ? { transition: { ...fadeUp.transition, delay: i * 0.1 } } : {})}
                    {...liftCard}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                      <item.Icon size={22} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="mt-4 sm:mt-5 text-lg font-semibold text-[#e8e4e0]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#8a8580]">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="px-4 py-16 sm:py-28">
          <div className="mx-auto max-w-2xl">
            <motion.div
              className={`${card} p-6 sm:p-10`}
              {...fadeUp}
              {...liftCard}
            >
              <h2 className="text-center text-2xl sm:text-3xl text-[#e8e4e0] md:text-4xl">
                Contact Operations
              </h2>
              <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-[#8a8580]">
                <a href="tel:0615456926" className="transition-colors hover:text-[#D4AF37]">
                  061 545 6926
                </a>
                <a href="tel:0714907858" className="transition-colors hover:text-[#D4AF37]">
                  071 490 7858
                </a>
                <a href="mailto:ApexLogistics@gmail.com" className="transition-colors hover:text-[#D4AF37]">
                  ApexLogistics@gmail.com
                </a>
              </div>

              <form className="mt-6 sm:mt-8 space-y-4">
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
