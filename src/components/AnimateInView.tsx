'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

interface AnimateInViewProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'none'
}

export function AnimateInView({
  children,
  delay = 0,
  className,
  direction = 'up',
}: AnimateInViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  const initial =
    direction === 'up'
      ? { opacity: 0, y: 32 }
      : direction === 'left'
        ? { opacity: 0, x: -24 }
        : { opacity: 0 }

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
