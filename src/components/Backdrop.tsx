'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

// The steel sphere and the circuit lines behind every page. Both are
// client-only and loaded after the content so they never block first paint.
// The sphere (and the three.js code behind it) is only requested on screens
// wide enough to show it, so phones never download it.
const QuantumBackground = dynamic(() => import('./QuantumBackground'), { ssr: false })
const DataLines = dynamic(() => import('./DataLines'), { ssr: false })

const motionQuery = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(motionQuery)
  window.addEventListener('resize', onChange)
  mq.addEventListener('change', onChange)
  return () => {
    window.removeEventListener('resize', onChange)
    mq.removeEventListener('change', onChange)
  }
}

const wantsSphere = () => window.innerWidth >= 768 && !window.matchMedia(motionQuery).matches

export function Backdrop() {
  const sphere = useSyncExternalStore(subscribe, wantsSphere, () => false)

  return (
    <>
      {sphere && <QuantumBackground />}
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 -z-[5] hidden h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-molten/[0.07] blur-[150px] md:block"
      />
      <DataLines />
    </>
  )
}
