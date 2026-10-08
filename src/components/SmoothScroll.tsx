'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -88 },
    })

    // hold the page still while the intro plays
    const html = document.documentElement
    if (html.classList.contains('intro-play')) lenis.stop()
    const resume = () => lenis.start()
    window.addEventListener('apex:intro-done', resume)

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('apex:intro-done', resume)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
