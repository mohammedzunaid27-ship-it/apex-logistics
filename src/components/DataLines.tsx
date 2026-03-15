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
  const staticRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const staticCanvas = staticRef.current
    const animCanvas = animRef.current
    if (!staticCanvas) return
    const staticCtx = staticCanvas.getContext('2d')
    if (!staticCtx) return

    const isMobile = window.innerWidth < 768
    const animCtx = !isMobile && animCanvas ? animCanvas.getContext('2d') : null

    let animId: number
    let traces: Trace[] = []
    let travelers: Traveler[] = []
    let lastTime = 0

    const GRID = 45
    const SPHERE_RADIUS = 190

    function snap(v: number) {
      return Math.round(v / GRID) * GRID
    }

    function sizeCanvas(cvs: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      const dpr = window.devicePixelRatio || 1
      cvs.width = window.innerWidth * dpr
      cvs.height = document.documentElement.scrollHeight * dpr
      cvs.style.width = `${window.innerWidth}px`
      cvs.style.height = `${document.documentElement.scrollHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function resize() {
      sizeCanvas(staticCanvas!, staticCtx!)
      if (animCtx && animCanvas) sizeCanvas(animCanvas, animCtx)
      buildCircuit()
      drawStatic()
    }

    function buildCircuit() {
      const rng = mulberry32(77)
      const w = window.innerWidth
      const h = document.documentElement.scrollHeight
      traces = []
      travelers = []

      const xPositions: number[] = []
      if (isMobile) {
        // 4-5 widely spaced traces on mobile
        const count = 4 + Math.floor(rng() * 2)
        const spacing = w / (count + 1)
        for (let m = 0; m < count; m++) {
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
            const steps = 1 + Math.floor(rng() * 3)
            const dir = rng() > 0.5 ? 1 : -1
            const nx = Math.max(25, Math.min(w - 25, x + dir * GRID * steps))
            y += Math.abs(nx - x)
            points.push({ x: nx, y })
            x = nx
            const drop = GRID * (1 + Math.floor(rng() * 3))
            y += drop
            points.push({ x, y })
          } else if (roll < 0.38) {
            const turnDist = GRID * (1 + Math.floor(rng() * 4))
            const dir = rng() > 0.5 ? 1 : -1
            const nx = Math.max(25, Math.min(w - 25, x + dir * turnDist))
            points.push({ x: nx, y })
            x = nx
            const drop = GRID * (1 + Math.floor(rng() * 4))
            y += drop
            points.push({ x, y })
          } else if (roll < 0.52) {
            const jog = (rng() > 0.5 ? 1 : -1) * GRID
            const nx = Math.max(25, Math.min(w - 25, x + jog))
            points.push({ x: nx, y })
            x = nx
            y += GRID * (1 + Math.floor(rng() * 2))
            points.push({ x, y })
          } else if (roll < 0.58) {
            for (let s = 0; s < 2; s++) {
              const dir = rng() > 0.5 ? 1 : -1
              const nx = Math.max(25, Math.min(w - 25, x + dir * GRID))
              y += GRID
              points.push({ x: nx, y })
              x = nx
            }
          } else {
            const drop = GRID * (1 + Math.floor(rng() * 6))
            y += drop
            points.push({ x, y })
          }
        }

        const lengths: number[] = [0]
        let total = 0
        for (let j = 1; j < points.length; j++) {
          const dx = points[j].x - points[j - 1].x
          const dy = points[j].y - points[j - 1].y
          total += Math.sqrt(dx * dx + dy * dy)
          lengths.push(total)
        }
        traces.push({ points, lengths, totalLen: total })

        // Desktop only: travelers
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
        }
      }
    }

    /** Draw static lines + junction dots ONCE onto the static canvas */
    function drawStatic() {
      const w = window.innerWidth
      const h = document.documentElement.scrollHeight
      staticCtx!.clearRect(0, 0, w, h)

      for (const trace of traces) {
        const { points } = trace

        // Batch all segments into one path per trace
        staticCtx!.beginPath()
        for (let i = 0; i < points.length - 1; i++) {
          staticCtx!.moveTo(points[i].x, points[i].y)
          staticCtx!.lineTo(points[i + 1].x, points[i + 1].y)
        }
        staticCtx!.strokeStyle = 'rgba(160, 130, 40, 0.14)'
        staticCtx!.lineWidth = 1
        staticCtx!.stroke()

        // Junction dots
        for (const pt of points) {
          staticCtx!.beginPath()
          staticCtx!.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2)
          staticCtx!.fillStyle = 'rgba(180, 150, 50, 0.2)'
          staticCtx!.fill()
        }
      }
    }

    // ── Desktop-only: animated traveler overlay ──
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

    function segAtDist(trace: Trace, dist: number): number {
      for (let i = 1; i < trace.lengths.length; i++) {
        if (dist <= trace.lengths[i]) return i - 1
      }
      return trace.lengths.length - 2
    }

    function drawAnimated(time: number) {
      if (!animCtx) return
      const dt = lastTime ? (time - lastTime) / 1000 : 0.016
      lastTime = time

      const w = window.innerWidth
      const h = document.documentElement.scrollHeight
      animCtx.clearRect(0, 0, w, h)

      const scrollY = window.scrollY
      const cx = w / 2
      const cy = scrollY + window.innerHeight / 2

      // Update traveler positions
      const positions: { pos: Pt; dist: number; traceIdx: number }[] = []
      for (const t of travelers) {
        const trace = traces[t.traceIdx]
        if (!trace) continue
        t.dist += t.speed * t.direction * dt
        if (t.dist >= trace.totalLen) { t.dist = trace.totalLen; t.direction = -1 }
        else if (t.dist <= 0) { t.dist = 0; t.direction = 1 }
        positions.push({ pos: posAtDist(trace, t.dist), dist: t.dist, traceIdx: t.traceIdx })
      }

      // Draw glow on segments near travelers
      for (let ti = 0; ti < traces.length; ti++) {
        const trace = traces[ti]
        const myTravelers = positions.filter(tp => tp.traceIdx === ti)
        if (myTravelers.length === 0) continue

        for (let i = 0; i < trace.points.length - 1; i++) {
          const p1 = trace.points[i]
          const p2 = trace.points[i + 1]

          let hotGlow = 0
          for (const tp of myTravelers) {
            const si = segAtDist(trace, tp.dist)
            const segDist = Math.abs(si - i)
            if (segDist === 0) hotGlow = Math.max(hotGlow, 1)
            else if (segDist <= 2) hotGlow = Math.max(hotGlow, 0.5 / segDist)
            else if (segDist <= 4) hotGlow = Math.max(hotGlow, 0.1 / segDist)
          }

          if (hotGlow > 0.01) {
            const midX = (p1.x + p2.x) / 2
            const midY = (p1.y + p2.y) / 2
            const dx = midX - cx, dy = midY - cy
            const d = Math.sqrt(dx * dx + dy * dy)
            const dim = d < SPHERE_RADIUS ? Math.pow(d / SPHERE_RADIUS, 2) * 0.25 : 1

            // Soft glow
            animCtx.beginPath()
            animCtx.moveTo(p1.x, p1.y)
            animCtx.lineTo(p2.x, p2.y)
            animCtx.strokeStyle = `rgba(212, 175, 55, ${0.15 * hotGlow * dim})`
            animCtx.lineWidth = 5
            animCtx.stroke()

            // Hot core
            animCtx.beginPath()
            animCtx.moveTo(p1.x, p1.y)
            animCtx.lineTo(p2.x, p2.y)
            animCtx.strokeStyle = `rgba(243, 229, 171, ${0.35 * hotGlow * dim})`
            animCtx.lineWidth = 1.5
            animCtx.stroke()
          }
        }

        // Glowing junctions near travelers
        for (const pt of trace.points) {
          for (const tp of myTravelers) {
            const dx = tp.pos.x - pt.x, dy = tp.pos.y - pt.y
            if (dx * dx + dy * dy < 70 * 70) {
              const dd = Math.sqrt((pt.x - cx) ** 2 + (pt.y - cy) ** 2)
              const dim = dd < SPHERE_RADIUS ? Math.pow(dd / SPHERE_RADIUS, 2) * 0.25 : 1
              const jGrad = animCtx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 7)
              jGrad.addColorStop(0, `rgba(243, 229, 171, ${0.5 * dim})`)
              jGrad.addColorStop(1, 'rgba(212, 175, 55, 0)')
              animCtx.beginPath()
              animCtx.arc(pt.x, pt.y, 7, 0, Math.PI * 2)
              animCtx.fillStyle = jGrad
              animCtx.fill()
              break
            }
          }
        }
      }

      // Draw traveler nodes
      for (const tp of positions) {
        const dx = tp.pos.x - cx, dy = tp.pos.y - cy
        const d = Math.sqrt(dx * dx + dy * dy)
        const dim = d < SPHERE_RADIUS ? Math.pow(d / SPHERE_RADIUS, 2) * 0.25 : 1
        if (dim < 0.02) continue

        const grad = animCtx.createRadialGradient(tp.pos.x, tp.pos.y, 0, tp.pos.x, tp.pos.y, 30)
        grad.addColorStop(0, `rgba(212, 175, 55, ${0.3 * dim})`)
        grad.addColorStop(0.4, `rgba(212, 175, 55, ${0.08 * dim})`)
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)')
        animCtx.beginPath()
        animCtx.arc(tp.pos.x, tp.pos.y, 30, 0, Math.PI * 2)
        animCtx.fillStyle = grad
        animCtx.fill()

        animCtx.beginPath()
        animCtx.arc(tp.pos.x, tp.pos.y, 2.5, 0, Math.PI * 2)
        animCtx.fillStyle = `rgba(255, 240, 190, ${0.9 * dim})`
        animCtx.fill()
      }

      animId = requestAnimationFrame(drawAnimated)
    }

    resize()

    // Only start animation loop on desktop
    if (!isMobile && animCtx) {
      animId = requestAnimationFrame(drawAnimated)
    }

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {/* Static layer: lines + junctions, drawn once */}
      <canvas
        ref={staticRef}
        className="pointer-events-none absolute inset-0 -z-[8]"
        aria-hidden="true"
      />
      {/* Animated layer: travelers + glow, desktop only */}
      <canvas
        ref={animRef}
        className="pointer-events-none absolute inset-0 -z-[7] hidden md:block"
        aria-hidden="true"
      />
    </>
  )
}
