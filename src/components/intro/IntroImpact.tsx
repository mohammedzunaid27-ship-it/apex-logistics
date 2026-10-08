'use client'

import { useEffect, useRef, useState } from 'react'
import { AssembledSvg, BlockSvg } from './SteelBlock'
import { SEAM_ORIGIN_PCT, SEAM_X, STAGE_W, VIEWBOX, apexBlock, metalsBlock, seamPath, sparkOrigins } from './geometry'

// ─── Timeline (ms) ───────────────────────────────────────────────
// The blocks are craned into place, pulled back, then slammed together.
// Everything that sells the hit (hit-stop, shake, radial blur, flash,
// sparks, shockwave) is keyed to the same IMPACT frame so the eye reads
// one event, and the brain supplies the sound.
const ENTER_START = 80
const ENTER_END = 440
const WINDUP_END = 600
const IMPACT = 820
const HIT_STOP = 70
const SHAKE_FOR = 460
const BLUR_FOR = 190
const SETTLE = 1180
const LEAVE = 1900
const DONE = LEAVE + 800

const READY_GAP = 150 // stage units each block waits from the seam
const WINDUP_GAP = 178
const OFFSTAGE = 1250

const SEEN_KEY = 'apex-intro-seen'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
// steep ease-in: the blocks are still accelerating when they meet
const easeInHeavy = (t: number) => Math.pow(t, 3.4)

function gapAt(t: number) {
  if (t < ENTER_START) return OFFSTAGE
  if (t < ENTER_END) {
    const p = easeOutQuart(clamp01((t - ENTER_START) / (ENTER_END - ENTER_START)))
    return OFFSTAGE + (READY_GAP - OFFSTAGE) * p
  }
  if (t < WINDUP_END) {
    const p = easeInOutSine(clamp01((t - ENTER_END) / (WINDUP_END - ENTER_END)))
    return READY_GAP + (WINDUP_GAP - READY_GAP) * p
  }
  if (t < IMPACT) {
    const p = easeInHeavy(clamp01((t - WINDUP_END) / (IMPACT - WINDUP_END)))
    return WINDUP_GAP * (1 - p)
  }
  // hit-stop: frozen in contact
  if (t < IMPACT + HIT_STOP) return 0
  // a few units of recoil, heavily damped. Steel this size barely bounces.
  const r = t - IMPACT - HIT_STOP
  return 6 * Math.exp(-r / 70) * Math.sin((Math.PI * r) / 95) * (r < 400 ? 1 : 0)
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  age: number
  width: number
}

interface Dust {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  life: number
  age: number
}

function sparkColor(f: number, alpha: number) {
  // white-hot to orange to dull red as the spark cools
  if (f < 0.15) return `rgba(255,250,236,${alpha})`
  if (f < 0.4) return `rgba(255,206,130,${alpha})`
  if (f < 0.7) return `rgba(255,122,44,${alpha})`
  return `rgba(176,48,10,${alpha})`
}

export function IntroImpact() {
  const [mounted, setMounted] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const apexRef = useRef<HTMLDivElement>(null)
  const metalsRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const zoomCopies = useRef<(HTMLDivElement | null)[]>([])
  const hotWhiteRef = useRef<HTMLDivElement>(null)
  const hotOrangeRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const dustPuffRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glintA = useRef<SVGRectElement>(null)
  const glintM = useRef<SVGRectElement>(null)

  useEffect(() => {
    const html = document.documentElement
    // Already seen this session: the overlay stays display:none via CSS.
    if (!html.classList.contains('intro-play')) return
    // The script is alive: cancel the no-JS fallbacks so a slow device still
    // sees the whole animation.
    html.classList.add('intro-running')
    window.clearTimeout((window as Window & { __introFailsafe?: number }).__introFailsafe)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {}

    const root = rootRef.current!
    const camera = cameraRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // ?slowmo=25 in development plays the intro 25× slower for frame checks
    const slowmo =
      process.env.NODE_ENV !== 'production'
        ? Math.max(1, Number(new URLSearchParams(window.location.search).get('slowmo')) || 1)
        : 1
    const small = window.innerWidth < 768

    let raf = 0
    let start = 0
    let last = 0
    let impacted = false
    let leaving = false
    let finished = false
    let k = 1 // px per stage unit
    let ox = 0 // seam origin in canvas px
    let oy = 0
    let dpr = 1
    const sparks: Spark[] = []
    const dust: Dust[] = []

    // random phases so the shake never looks canned
    const ph = Array.from({ length: 6 }, () => Math.random() * Math.PI * 2)

    function measure() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cam = camera.getBoundingClientRect()
      const st = stage.getBoundingClientRect()
      k = st.width / STAGE_W
      ox = st.left - cam.left + st.width / 2
      oy = st.top - cam.top + st.height / 2
      canvas.width = Math.round(cam.width * dpr)
      canvas.height = Math.round(cam.height * dpr)
      canvas.style.width = `${cam.width}px`
      canvas.style.height = `${cam.height}px`
    }

    function placeBlocks(gap: number) {
      apexRef.current!.style.transform = `translate3d(${-gap * k}px,0,0)`
      metalsRef.current!.style.transform = `translate3d(${gap * k}px,0,0)`
    }

    function spawnImpact() {
      const count = small ? 46 : 90
      for (let i = 0; i < count; i++) {
        const o = sparkOrigins[i % sparkOrigins.length]
        let angle: number
        let speed: number
        let life: number
        if (o.dir === 'up') {
          angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.9
          speed = 700 + Math.random() * 1300
          life = 450 + Math.random() * 550
        } else if (o.dir === 'down') {
          angle = Math.PI / 2 + (Math.random() - 0.5) * 2.4
          speed = 500 + Math.random() * 900
          life = 300 + Math.random() * 450
        } else {
          // thrown toward the camera: read as a fast radial burst
          angle = Math.random() * Math.PI * 2
          speed = 900 + Math.random() * 1600
          life = 140 + Math.random() * 260
        }
        const scale = Math.max(0.55, k)
        sparks.push({
          x: ox + o.x * k,
          y: oy + o.y * k,
          vx: Math.cos(angle) * speed * scale,
          vy: Math.sin(angle) * speed * scale,
          life,
          age: 0,
          width: 1 + Math.random() * 1.6,
        })
      }
      const floorY = oy + 75 * k + 8
      for (let i = 0; i < (small ? 10 : 22); i++) {
        const dir = Math.random() > 0.5 ? 1 : -1
        dust.push({
          x: ox + SEAM_X * k + (Math.random() - 0.5) * 40 * k,
          y: floorY - Math.random() * 10,
          vx: dir * (60 + Math.random() * 260) * k,
          vy: -(10 + Math.random() * 60) * k,
          r: (10 + Math.random() * 26) * k,
          life: 900 + Math.random() * 700,
          age: 0,
        })
      }
    }

    function drawParticles(dt: number) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const g = 2600 * Math.max(0.55, k)

      ctx.globalCompositeOperation = 'source-over'
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i]
        d.age += dt * 1000
        if (d.age > d.life) {
          dust.splice(i, 1)
          continue
        }
        d.vx *= Math.pow(0.12, dt)
        d.vy *= Math.pow(0.3, dt)
        d.x += d.vx * dt
        d.y += d.vy * dt
        const f = d.age / d.life
        const r = d.r * (1 + f * 1.6)
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r)
        grad.addColorStop(0, `rgba(150,156,162,${0.1 * (1 - f)})`)
        grad.addColorStop(1, 'rgba(150,156,162,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.age += dt * 1000
        if (s.age > s.life) {
          sparks.splice(i, 1)
          continue
        }
        s.vx *= Math.pow(0.35, dt)
        s.vy = s.vy * Math.pow(0.35, dt) + g * dt
        s.x += s.vx * dt
        s.y += s.vy * dt
        const f = s.age / s.life
        const alpha = f < 0.8 ? 1 : 1 - (f - 0.8) / 0.2
        const trail = 0.022
        ctx.strokeStyle = sparkColor(f, alpha)
        ctx.lineWidth = s.width
        ctx.beginPath()
        ctx.moveTo(s.x - s.vx * trail, s.y - s.vy * trail)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    function setOpacity(el: HTMLElement | null, v: number) {
      if (el) el.style.opacity = String(v)
    }

    function frame(now: number) {
      if (!start) start = now
      const t = (now - start) / slowmo
      const dt = (last ? Math.min(0.05, (now - last) / 1000) : 1 / 60) / slowmo
      last = now

      if (reduced) {
        placeBlocks(0)
        if (t > 120 && !impacted) {
          impacted = true
          root.classList.add('is-settled')
          setOpacity(hotOrangeRef.current, 0.8)
        }
        if (impacted) setOpacity(hotOrangeRef.current, Math.max(0, 0.8 - (t - 120) / 900))
        if (t > 1100 && !leaving) leave()
        if (!finished) raf = requestAnimationFrame(frame)
        return
      }

      placeBlocks(gapAt(t))

      // ── the hit ──
      if (!impacted && t >= IMPACT) {
        impacted = true
        spawnImpact()
      }

      if (impacted) {
        const s = t - IMPACT

        // Camera shake: tight, high frequency, decaying fast. First frame
        // kicks the camera down, as if the floor took the weight.
        if (s < SHAKE_FOR) {
          const decay = Math.pow(1 - s / SHAKE_FOR, 2.2)
          const amp = (small ? 9 : 15) * decay
          const x =
            amp * (0.62 * Math.sin(s * 0.19 + ph[0]) + 0.38 * Math.sin(s * 0.47 + ph[1]))
          const y =
            (s < 34 ? amp * 0.9 : 0) +
            amp * 0.7 * (0.6 * Math.sin(s * 0.23 + ph[2]) + 0.4 * Math.sin(s * 0.53 + ph[3]))
          const rot = 0.55 * decay * Math.sin(s * 0.17 + ph[4])
          const punch = 1 + 0.045 * Math.exp(-s / 70)
          camera.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${rot.toFixed(3)}deg) scale(${punch.toFixed(4)})`
        } else {
          camera.style.transform = ''
        }

        // Radial blur: stacked copies scaled out from the seam, gone in a
        // blink. Combined with the shake it reads as a pressure wave.
        if (s < BLUR_FOR) {
          const f = s / BLUR_FOR
          setOpacity(zoomRef.current, 1 - easeOutQuart(f))
          zoomCopies.current.forEach((el, i) => {
            if (!el) return
            const spread = (i + 1) * (0.022 + 0.05 * f)
            el.style.transform = `scale(${(1 + spread).toFixed(4)})`
          })
        } else {
          setOpacity(zoomRef.current, 0)
        }

        setOpacity(flashRef.current, s < 60 ? 0.22 * (1 - s / 60) : 0)
        setOpacity(hotWhiteRef.current, s < 260 ? 1 - s / 260 : 0)
        setOpacity(hotOrangeRef.current, s < 1300 ? Math.pow(1 - s / 1300, 1.4) : 0)

        // shockwave rings
        const ringT = clamp01(s / 480)
        if (ringRef.current) {
          ringRef.current.setAttribute('r', String(20 + easeOutQuart(ringT) * 640))
          ringRef.current.setAttribute('stroke-width', String(Math.max(0, 3 * (1 - ringT))))
          ringRef.current.setAttribute('stroke-opacity', String(0.4 * (1 - ringT) * (1 - ringT)))
        }
        const waveT = clamp01(s / 700)
        if (waveRef.current) {
          waveRef.current.style.transform = `translate(-50%,-50%) scale(${(0.15 + easeOutQuart(waveT) * 2.4).toFixed(3)})`
          waveRef.current.style.opacity = String(1 - waveT)
        }

        if (dustPuffRef.current) {
          const p = clamp01(s / 900)
          dustPuffRef.current.style.transform = `translate(-50%,-50%) scale(${(0.2 + easeOutQuart(p) * 1.8).toFixed(3)},1)`
          dustPuffRef.current.style.opacity = String(0.5 * (1 - p))
        }

        // light catching the steel once it settles
        if (t > SETTLE && t < SETTLE + 700) {
          const p = easeInOutSine((t - SETTLE) / 700)
          glintA.current?.setAttribute('x', String(-700 + p * 1500))
          glintM.current?.setAttribute('x', String(-600 + p * 1500))
        }
        if (t > SETTLE - 120) root.classList.add('is-settled')
      }

      if (sparks.length || dust.length) drawParticles(dt)
      else if (impacted) ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (t >= LEAVE && !leaving) leave()
      if (!finished) raf = requestAnimationFrame(frame)
    }

    function leave() {
      leaving = true
      root.classList.add('is-leaving')
      window.setTimeout(finish, reduced ? 350 : DONE - LEAVE)
    }

    function finish() {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      html.classList.remove('intro-play', 'intro-running')
      window.dispatchEvent(new Event('apex:intro-done'))
      setMounted(false)
    }

    function skip() {
      if (!leaving) leave()
    }

    measure()
    placeBlocks(OFFSTAGE)

    let cancelled = false
    // Wait for the display face so the stamped letters never swap mid-flight,
    // but never hold the page for more than 700 ms.
    Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 700))]).then(() => {
      if (cancelled) return
      raf = requestAnimationFrame(frame)
    })

    window.addEventListener('resize', measure)
    window.addEventListener('keydown', skip)
    root.addEventListener('pointerdown', skip)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      window.removeEventListener('keydown', skip)
      root.removeEventListener('pointerdown', skip)
    }
  }, [])

  if (!mounted) return null

  return (
    <div ref={rootRef} className="intro fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      <div className="intro-panel top" />
      <div className="intro-panel bottom" />

      <div ref={cameraRef} className="intro-camera">
        <div className="intro-grid" />
        <div className="intro-floor" />

        <div ref={stageRef} className="intro-stage">
          <div
            ref={dustPuffRef}
            className="pointer-events-none absolute"
            style={{
              left: `${((SEAM_X + STAGE_W / 2) / STAGE_W) * 100}%`,
              top: '74%',
              width: '60%',
              height: '22%',
              opacity: 0,
              background: 'radial-gradient(ellipse at center, rgba(160,166,172,0.35), rgba(160,166,172,0) 70%)',
              transform: 'translate(-50%,-50%) scale(0.2,1)',
            }}
          />

          {/* soft pressure wave expanding from the seam */}
          <div
            ref={waveRef}
            className="pointer-events-none absolute aspect-square rounded-full"
            style={{
              left: SEAM_ORIGIN_PCT.split(' ')[0],
              top: '50%',
              width: '62%',
              opacity: 0,
              transform: 'translate(-50%,-50%) scale(0.15)',
              background:
                'radial-gradient(circle, rgba(255,240,228,0) 56%, rgba(255,226,200,0.09) 64%, rgba(255,255,255,0.03) 68%, rgba(255,255,255,0) 72%)',
              willChange: 'transform, opacity',
            }}
          />

          <div ref={apexRef} className="intro-layer" style={{ transform: 'translate3d(-130%,0,0)' }}>
            <BlockSvg block={apexBlock} id="ia" glintRef={glintA} />
          </div>
          <div ref={metalsRef} className="intro-layer" style={{ transform: 'translate3d(130%,0,0)' }}>
            <BlockSvg block={metalsBlock} id="im" glintRef={glintM} />
          </div>

          <div ref={zoomRef} className="intro-zoom" style={{ willChange: 'opacity' }}>
            {[0.3, 0.2, 0.13, 0.08, 0.05].map((o, i) => (
              <div
                key={i}
                ref={(el) => {
                  zoomCopies.current[i] = el
                }}
                style={{ opacity: o, transformOrigin: SEAM_ORIGIN_PCT, willChange: 'transform' }}
              >
                <AssembledSvg id={`iz${i}`} />
              </div>
            ))}
          </div>

          <div ref={hotOrangeRef} className="intro-layer" style={{ opacity: 0 }}>
            <svg viewBox={VIEWBOX} aria-hidden>
              <defs>
                <filter id="seam-glow" x="-200%" y="-20%" width="500%" height="140%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <path d={seamPath} fill="none" stroke="#ff6a1f" strokeWidth="12" filter="url(#seam-glow)" />
              <path d={seamPath} fill="none" stroke="#ff8f4a" strokeWidth="2.5" />
            </svg>
          </div>
          <div ref={hotWhiteRef} className="intro-layer" style={{ opacity: 0 }}>
            <svg viewBox={VIEWBOX} aria-hidden>
              <path d={seamPath} fill="none" stroke="#fff3e2" strokeWidth="9" filter="url(#seam-glow)" />
              <path d={seamPath} fill="none" stroke="#ffffff" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="intro-layer pointer-events-none">
            <svg viewBox={VIEWBOX} aria-hidden>
              <circle ref={ringRef} cx={SEAM_X} cy="0" r="0" fill="none" stroke="#ffd8b8" strokeOpacity="0" />
            </svg>
          </div>
        </div>

        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />

        <p className="intro-caption label">Steel &amp; metal · Cut to size · Delivered nationwide</p>
      </div>

      <div ref={flashRef} className="intro-flash" />

      <button type="button" className="intro-skip label hover:text-fg" tabIndex={-1}>
        Skip
      </button>
    </div>
  )
}
