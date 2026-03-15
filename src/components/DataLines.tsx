'use client'

import { useEffect, useRef } from 'react'

/* ── Seeded PRNG (mulberry32) — deterministic but random-looking ── */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Pt { x: number; y: number }

interface Trace {
  points: Pt[]
  lengths: number[]
  totalLen: number
}

interface Traveler {
  traceIdx: number
  dist: number
  speed: number
  direction: 1 | -1
}

export default function DataLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let traces: Trace[] = []
    let travelers: Traveler[] = []
    let lastTime = 0

    const GRID = 45
    const SPHERE_RADIUS = 190

    function snap(v: number) {
      return Math.round(v / GRID) * GRID
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = window.innerWidth * dpr
      canvas!.height = document.documentElement.scrollHeight * dpr
      canvas!.style.width = `${window.innerWidth}px`
      canvas!.style.height = `${document.documentElement.scrollHeight}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildCircuit()
    }

    function buildCircuit() {
      const rng = mulberry32(77)
      const w = window.innerWidth
      const h = document.documentElement.scrollHeight
      traces = []
      travelers = []

      // Fewer traces on mobile — just 4-5 with wide spacing
      const isMobile = w < 768
      const xPositions: number[] = []
      if (isMobile) {
        const mobileCount = 4 + Math.floor(rng() * 2) // 4 or 5
        const spacing = w / (mobileCount + 1)
        for (let m = 0; m < mobileCount; m++) {
          xPositions.push(snap(spacing * (m + 1) + (rng() - 0.5) * 20))
        }
      } else {
        let cursor = 30 + rng() * 40
        while (cursor < w - 30) {
          xPositions.push(snap(cursor))
          cursor += rng() < 0.4 ? 30 + rng() * 35 : 90 + rng() * 100
        }
      }

      for (let i = 0; i < xPositions.length; i++) {
        const points: Pt[] = []
        let x = xPositions[i]
        let y = snap(rng() * 80)
        points.push({ x, y })

        while (y < h + 50) {
          const roll = rng()

          if (roll < 0.18) {
            // 45° diagonal — circuit board chamfer
            const steps = 1 + Math.floor(rng() * 3)
            const dir = rng() > 0.5 ? 1 : -1
            const diag = GRID * steps
            const nx = Math.max(25, Math.min(w - 25, x + dir * diag))
            const actualDx = nx - x
            y += Math.abs(actualDx)
            points.push({ x: nx, y })
            x = nx

            // Continue straight down after diagonal
            const drop = GRID * (1 + Math.floor(rng() * 3))
            y += drop
            points.push({ x, y })
          } else if (roll < 0.38) {
            // Right-angle turn: horizontal then vertical
            const turnDist = GRID * (1 + Math.floor(rng() * 4))
            const dir = rng() > 0.5 ? 1 : -1
            const nx = Math.max(25, Math.min(w - 25, x + dir * turnDist))
            points.push({ x: nx, y })
            x = nx

            const drop = GRID * (1 + Math.floor(rng() * 4))
            y += drop
            points.push({ x, y })
          } else if (roll < 0.52) {
            // Small jog sideways
            const jog = (rng() > 0.5 ? 1 : -1) * GRID
            const nx = Math.max(25, Math.min(w - 25, x + jog))
            points.push({ x: nx, y })
            x = nx
            y += GRID * (1 + Math.floor(rng() * 2))
            points.push({ x, y })
          } else if (roll < 0.58) {
            // Staircase: two small diagonal steps
            for (let s = 0; s < 2; s++) {
              const dir = rng() > 0.5 ? 1 : -1
              const nx = Math.max(25, Math.min(w - 25, x + dir * GRID))
              y += GRID
              points.push({ x: nx, y })
              x = nx
            }
          } else {
            // Straight down — varied length
            const drop = GRID * (1 + Math.floor(rng() * 6))
            y += drop
            points.push({ x, y })
          }
        }

        // Cumulative lengths
        const lengths: number[] = [0]
        let total = 0
        for (let j = 1; j < points.length; j++) {
          const dx = points[j].x - points[j - 1].x
          const dy = points[j].y - points[j - 1].y
          total += Math.sqrt(dx * dx + dy * dy)
          lengths.push(total)
        }
        traces.push({ points, lengths, totalLen: total })

        // Mobile: only 3 travelers TOTAL across all traces, desktop: 2-5 per trace
        if (!isMobile) {
          const tCount = 2 + Math.floor(rng() * 4)
          for (let t = 0; t < tCount; t++) {
            travelers.push({
              traceIdx: i,
              dist: rng() * total,
              speed: 25 + rng() * 70,
              direction: rng() > 0.5 ? 1 : -1,
            })
          }
        } else if (travelers.length < 3) {
          travelers.push({
            traceIdx: i,
            dist: rng() * total,
            speed: 20 + rng() * 40,
            direction: rng() > 0.5 ? 1 : -1,
          })
        }
      }
    }

    function posAtDist(trace: Trace, dist: number): Pt {
      const { points, lengths } = trace
      if (dist <= 0) return points[0]
      if (dist >= trace.totalLen) return points[points.length - 1]
      for (let i = 1; i < lengths.length; i++) {
        if (dist <= lengths[i]) {
          const segLen = lengths[i] - lengths[i - 1]
          const t = segLen > 0 ? (dist - lengths[i - 1]) / segLen : 0
          return {
            x: points[i - 1].x + (points[i].x - points[i - 1].x) * t,
            y: points[i - 1].y + (points[i].y - points[i - 1].y) * t,
          }
        }
      }
      return points[points.length - 1]
    }

    /** Find the segment index that contains a given cumulative distance */
    function segAtDist(trace: Trace, dist: number): number {
      for (let i = 1; i < trace.lengths.length; i++) {
        if (dist <= trace.lengths[i]) return i - 1
      }
      return trace.lengths.length - 2
    }

    function dimForPos(px: number, py: number, cx: number, cy: number): number {
      const dx = px - cx
      const dy = py - cy
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < SPHERE_RADIUS) return Math.pow(d / SPHERE_RADIUS, 2) * 0.25
      return 1
    }

    const isMobileView = window.innerWidth < 768
    const FRAME_INTERVAL = isMobileView ? 50 : 0 // ~20fps on mobile, uncapped on desktop

    function draw(time: number) {
      if (FRAME_INTERVAL && lastTime && time - lastTime < FRAME_INTERVAL) {
        animId = requestAnimationFrame(draw)
        return
      }
      const dt = lastTime ? (time - lastTime) / 1000 : 0.016
      lastTime = time

      const w = window.innerWidth
      const h = document.documentElement.scrollHeight
      ctx!.clearRect(0, 0, w, h)

      const scrollY = window.scrollY
      const cx = w / 2
      const cy = scrollY + window.innerHeight / 2

      // ── Pre-compute traveler positions for glow lookup ──
      const travelerPositions: { pos: Pt; dist: number; traceIdx: number }[] = []
      for (const t of travelers) {
        const trace = traces[t.traceIdx]
        if (!trace) continue
        t.dist += t.speed * t.direction * dt
        if (t.dist >= trace.totalLen) { t.dist = trace.totalLen; t.direction = -1 }
        else if (t.dist <= 0) { t.dist = 0; t.direction = 1 }
        travelerPositions.push({
          pos: posAtDist(trace, t.dist),
          dist: t.dist,
          traceIdx: t.traceIdx,
        })
      }

      // ── Draw traces ──
      for (let ti = 0; ti < traces.length; ti++) {
        const trace = traces[ti]
        const { points } = trace

        // Find closest traveler distance for this trace for glow intensity
        const myTravelers = travelerPositions.filter(tp => tp.traceIdx === ti)

        // Draw each segment individually so we can modulate brightness
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          const midX = (p1.x + p2.x) / 2
          const midY = (p1.y + p2.y) / 2

          // Sphere dimming at segment midpoint
          const dim = dimForPos(midX, midY, cx, cy)

          // Check if any traveler is on or near this segment
          let hotGlow = 0
          for (const tp of myTravelers) {
            const si = segAtDist(trace, tp.dist)
            const segDist = Math.abs(si - i)
            if (segDist === 0) hotGlow = Math.max(hotGlow, 1)
            else if (segDist <= 2) hotGlow = Math.max(hotGlow, 0.5 / segDist)
            else if (segDist <= 5) hotGlow = Math.max(hotGlow, 0.15 / segDist)
          }

          // Base line — visible
          const baseAlpha = 0.14 * dim
          ctx!.beginPath()
          ctx!.moveTo(p1.x, p1.y)
          ctx!.lineTo(p2.x, p2.y)
          ctx!.strokeStyle = `rgba(160, 130, 40, ${baseAlpha})`
          ctx!.lineWidth = 1
          ctx!.stroke()

          // Hot glow layer — bright where travelers are
          if (hotGlow > 0.01) {
            // Wide soft glow
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = `rgba(212, 175, 55, ${0.12 * hotGlow * dim})`
            ctx!.lineWidth = 6
            ctx!.stroke()

            // Medium glow
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = `rgba(230, 200, 80, ${0.25 * hotGlow * dim})`
            ctx!.lineWidth = 2.5
            ctx!.stroke()

            // Hot core
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = `rgba(243, 229, 171, ${0.4 * hotGlow * dim})`
            ctx!.lineWidth = 1.2
            ctx!.stroke()
          }
        }

        // Junction dots at corners
        for (const pt of points) {
          const dim = dimForPos(pt.x, pt.y, cx, cy)

          // Check if traveler is near this junction
          let near = false
          for (const tp of myTravelers) {
            const dx = tp.pos.x - pt.x
            const dy = tp.pos.y - pt.y
            if (dx * dx + dy * dy < 80 * 80) { near = true; break }
          }

          if (near) {
            // Bright glowing junction
            const jGrad = ctx!.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 8)
            jGrad.addColorStop(0, `rgba(243, 229, 171, ${0.6 * dim})`)
            jGrad.addColorStop(0.5, `rgba(212, 175, 55, ${0.2 * dim})`)
            jGrad.addColorStop(1, 'rgba(212, 175, 55, 0)')
            ctx!.beginPath()
            ctx!.arc(pt.x, pt.y, 8, 0, Math.PI * 2)
            ctx!.fillStyle = jGrad
            ctx!.fill()
          }

          // Base junction dot
          ctx!.beginPath()
          ctx!.arc(pt.x, pt.y, near ? 2.5 : 1.8, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(180, 150, 50, ${(near ? 0.5 : 0.2) * dim})`
          ctx!.fill()
        }
      }

      // ── Draw traveler nodes ──
      for (const tp of travelerPositions) {
        const dim = dimForPos(tp.pos.x, tp.pos.y, cx, cy)
        if (dim < 0.02) continue

        // Large outer glow
        const grad = ctx!.createRadialGradient(tp.pos.x, tp.pos.y, 0, tp.pos.x, tp.pos.y, 35)
        grad.addColorStop(0, `rgba(212, 175, 55, ${0.35 * dim})`)
        grad.addColorStop(0.3, `rgba(212, 175, 55, ${0.12 * dim})`)
        grad.addColorStop(0.7, `rgba(212, 175, 55, ${0.03 * dim})`)
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)')
        ctx!.beginPath()
        ctx!.arc(tp.pos.x, tp.pos.y, 35, 0, Math.PI * 2)
        ctx!.fillStyle = grad
        ctx!.fill()

        // Bright core
        ctx!.beginPath()
        ctx!.arc(tp.pos.x, tp.pos.y, 2.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255, 240, 190, ${0.9 * dim})`
        ctx!.fill()

        // Inner halo
        ctx!.beginPath()
        ctx!.arc(tp.pos.x, tp.pos.y, 4, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(243, 229, 171, ${0.3 * dim})`
        ctx!.lineWidth = 1
        ctx!.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-[8]"
      aria-hidden="true"
    />
  )
}
