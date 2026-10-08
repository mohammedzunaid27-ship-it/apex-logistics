'use client'

import dynamic from 'next/dynamic'

// The steel sphere and the circuit lines behind every page. Both are
// client-only and loaded after the content so they never block first paint.
const QuantumBackground = dynamic(() => import('./QuantumBackground'), { ssr: false })
const DataLines = dynamic(() => import('./DataLines'), { ssr: false })

export function Backdrop() {
  return (
    <>
      <QuantumBackground />
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 -z-[5] hidden h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-molten/[0.07] blur-[150px] md:block"
      />
      <DataLines />
    </>
  )
}
