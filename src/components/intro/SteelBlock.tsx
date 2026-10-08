import { HALF_H, STAGE_W, VIEWBOX, apexBlock, metalsBlock } from './geometry'

type BlockDef = typeof apexBlock | typeof metalsBlock

interface Props {
  block: BlockDef
  id: string
  // lite: gradient and lettering only, for the zoom-blur copies
  lite?: boolean
  glintRef?: React.Ref<SVGRectElement>
}

const FACE_STOPS: [number, string][] = [
  [0, '#59616a'],
  [0.07, '#a3acb4'],
  [0.2, '#dde3e8'],
  [0.33, '#8f989f'],
  [0.56, '#4b5258'],
  [0.82, '#2c3135'],
  [1, '#1b1e21'],
]

export function SteelDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-face`} x1="0" y1={-HALF_H} x2="0" y2={HALF_H} gradientUnits="userSpaceOnUse">
        {FACE_STOPS.map(([o, c]) => (
          <stop key={o} offset={o} stopColor={c} />
        ))}
      </linearGradient>
      <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0.32" />
        <stop offset="0.35" stopColor="#fff" stopOpacity="0.06" />
        <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.38" />
      </linearGradient>
      <linearGradient id={`${id}-bevel`} x1="0" y1={-HALF_H} x2="0" y2={HALF_H} gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
        <stop offset="0.15" stopColor="#fff" stopOpacity="0.15" />
        <stop offset="0.85" stopColor="#000" stopOpacity="0.2" />
        <stop offset="1" stopColor="#000" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id={`${id}-ink`} x1="0" y1="-50" x2="0" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0f1113" />
        <stop offset="1" stopColor="#30353a" />
      </linearGradient>
      <linearGradient id={`${id}-glint`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`}>
        <stop offset="0" stopColor="#000" stopOpacity="0.85" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      {/* Brushed finish: two line patterns with different periods so the
          streaks never visibly repeat. Pure vector, so it costs nothing to move. */}
      <pattern id={`${id}-brush-a`} width="260" height="7" patternUnits="userSpaceOnUse">
        <path d="M0 0.6H260" stroke="#fff" strokeOpacity="0.09" strokeWidth="0.6" />
        <path d="M0 2.4H150" stroke="#000" strokeOpacity="0.12" strokeWidth="0.5" />
        <path d="M70 4.1H260" stroke="#fff" strokeOpacity="0.06" strokeWidth="0.5" />
        <path d="M0 5.8H95M130 5.8H260" stroke="#000" strokeOpacity="0.1" strokeWidth="0.6" />
      </pattern>
      <pattern id={`${id}-brush-b`} width="410" height="11" patternUnits="userSpaceOnUse">
        <path d="M40 1.5H410" stroke="#fff" strokeOpacity="0.05" strokeWidth="0.8" />
        <path d="M0 4.5H230" stroke="#000" strokeOpacity="0.09" strokeWidth="0.7" />
        <path d="M120 8.2H380" stroke="#fff" strokeOpacity="0.07" strokeWidth="0.5" />
      </pattern>
    </defs>
  )
}

export function SteelBlockShape({ block, id, lite = false, glintRef }: Props) {
  const fontStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontVariationSettings: "'opsz' 72",
  } as const

  return (
    <g>
      {!lite && (
        <ellipse
          cx={block.shadowCx}
          cy={HALF_H + 16}
          rx={block.shadowRx * 1.02}
          ry="11"
          fill={`url(#${id}-shadow)`}
        />
      )}
      <clipPath id={`${id}-clip-${block.word}`}>
        <path d={block.path} />
      </clipPath>
      <g clipPath={`url(#${id}-clip-${block.word})`}>
        <rect x={-STAGE_W / 2} y={-HALF_H} width={STAGE_W} height={HALF_H * 2} fill={`url(#${id}-face)`} />
        {!lite && (
          <>
            <rect x={-STAGE_W / 2} y={-HALF_H} width={STAGE_W} height={HALF_H * 2} fill={`url(#${id}-brush-a)`} />
            <rect x={-STAGE_W / 2} y={-HALF_H} width={STAGE_W} height={HALF_H * 2} fill={`url(#${id}-brush-b)`} />
          </>
        )}
        <rect
          x={block.minX}
          y={-HALF_H}
          width={block.maxX - block.minX}
          height={HALF_H * 2}
          fill={`url(#${id}-sheen)`}
        />
        {/* Stamped lettering: a catch-light under a recessed dark face. */}
        {!lite && (
          <text
            x={block.textX}
            y="47.5"
            textAnchor="middle"
            textLength={block.textWidth}
            lengthAdjust="spacingAndGlyphs"
            fontSize="128"
            fill="#fff"
            fillOpacity="0.28"
            style={fontStyle}
          >
            {block.word}
          </text>
        )}
        <text
          x={block.textX}
          y="46"
          textAnchor="middle"
          textLength={block.textWidth}
          lengthAdjust="spacingAndGlyphs"
          fontSize="128"
          fill={`url(#${id}-ink)`}
          style={fontStyle}
        >
          {block.word}
        </text>
        {!lite && (
          <>
            <text
              x={block.stampX}
              y={HALF_H - 13}
              textAnchor={block.stampAnchor}
              fontSize="10"
              letterSpacing="2.5"
              fill="#000"
              fillOpacity="0.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {block.stamp}
            </text>
            <rect
              ref={glintRef}
              x="-900"
              y={-HALF_H - 20}
              width="140"
              height={HALF_H * 2 + 40}
              fill={`url(#${id}-glint)`}
              transform="skewX(-22)"
              style={{ mixBlendMode: 'overlay' }}
            />
          </>
        )}
      </g>
      <path d={block.path} fill="none" stroke={`url(#${id}-bevel)`} strokeWidth="2" />
    </g>
  )
}

export function BlockSvg(props: Props) {
  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="xMidYMid meet" aria-hidden focusable="false">
      <SteelDefs id={props.id} />
      <SteelBlockShape {...props} />
    </svg>
  )
}

export function AssembledSvg({ id }: { id: string }) {
  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="xMidYMid meet" aria-hidden focusable="false">
      <SteelDefs id={id} />
      <SteelBlockShape block={apexBlock} id={id} lite />
      <SteelBlockShape block={metalsBlock} id={id} lite />
    </svg>
  )
}
