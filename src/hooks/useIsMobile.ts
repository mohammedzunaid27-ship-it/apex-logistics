'use client'

import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 768) {
  // Default true (mobile-first) so content is always visible on first paint
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}
