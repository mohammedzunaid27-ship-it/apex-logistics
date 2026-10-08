'use client'

import { useEffect } from 'react'

// Content is server-rendered and fully visible without JavaScript. With JS,
// anything marked data-reveal starts slightly lowered and settles into place
// the first time it scrolls into view.
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    }
    scan()

    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
