'use client'

import { useSyncExternalStore } from 'react'

function subscribe(cb: () => void) {
  window.addEventListener('resize', cb)
  return () => window.removeEventListener('resize', cb)
}

function getSnapshot(breakpoint: number) {
  return window.innerWidth < breakpoint
}

function getServerSnapshot() {
  // Server: return false (assume desktop) so fadeUp animations get initial: opacity 0
  // This ensures whileInView works correctly after hydration
  return false
}

export function useIsMobile(breakpoint = 768) {
  return useSyncExternalStore(
    subscribe,
    () => getSnapshot(breakpoint),
    () => getServerSnapshot(),
  )
}
