// Shared coordinates for the intro stage. The stage is 1040 × 320 units with
// the origin in the middle. The two blocks meet on a dovetail seam at SEAM_X,
// shifted left so the wider METALS block keeps the pair visually centred.

export const STAGE_W = 1040
export const STAGE_H = 320
export const VIEWBOX = `${-STAGE_W / 2} ${-STAGE_H / 2} ${STAGE_W} ${STAGE_H}`

export const SEAM_X = -60
export const HALF_H = 75
const LEFT = -460
const RIGHT = 460
const CHAMFER = 10

// Seam profile from top to bottom: a tab from APEX into METALS, then a tab
// from METALS back into APEX, so the pieces only fit one way.
const seamProfile: [number, number][] = [
  [0, -HALF_H],
  [0, -50],
  [34, -58],
  [34, -14],
  [0, -22],
  [0, 22],
  [-34, 14],
  [-34, 58],
  [0, 50],
  [0, HALF_H],
]

export const seamPoints = seamProfile.map(([x, y]) => [x + SEAM_X, y] as [number, number])

const toPath = (pts: [number, number][]) => pts.map(([x, y]) => `${x} ${y}`).join(' L')

export const seamPath = `M${toPath(seamPoints)}`

export const apexPath =
  `M${LEFT + CHAMFER} ${-HALF_H} L${toPath(seamPoints)} ` +
  `L${LEFT + CHAMFER} ${HALF_H} L${LEFT} ${HALF_H - CHAMFER} L${LEFT} ${-HALF_H + CHAMFER} Z`

export const metalsPath =
  `M${toPath(seamPoints)} L${RIGHT - CHAMFER} ${HALF_H} L${RIGHT} ${HALF_H - CHAMFER} ` +
  `L${RIGHT} ${-HALF_H + CHAMFER} L${RIGHT - CHAMFER} ${-HALF_H} Z`

export const apexBlock = {
  path: apexPath,
  word: 'APEX',
  // text box clear of the socket on the right
  textX: -272,
  textWidth: 280,
  stamp: 'JHB · ZA',
  stampX: LEFT + 22,
  stampAnchor: 'start' as const,
  shadowCx: (LEFT + SEAM_X) / 2,
  shadowRx: (SEAM_X - LEFT) / 2,
  // full horizontal extent including the dovetail tab
  minX: LEFT,
  maxX: SEAM_X + 34,
}

export const metalsBlock = {
  path: metalsPath,
  word: 'METALS',
  textX: 215,
  textWidth: 390,
  stamp: `20 YRS IN METAL`,
  stampX: RIGHT - 22,
  stampAnchor: 'end' as const,
  shadowCx: (RIGHT + SEAM_X) / 2,
  shadowRx: (RIGHT - SEAM_X) / 2,
  minX: SEAM_X - 34,
  maxX: RIGHT,
}

// Points sparks are thrown from when the blocks meet (top and bottom of the
// seam, and the dovetail corners where the steel actually grinds).
export const sparkOrigins: { x: number; y: number; dir: 'up' | 'down' | 'burst' }[] = [
  { x: SEAM_X, y: -HALF_H, dir: 'up' },
  { x: SEAM_X + 34, y: -58, dir: 'burst' },
  { x: SEAM_X, y: -22, dir: 'burst' },
  { x: SEAM_X, y: 22, dir: 'burst' },
  { x: SEAM_X - 34, y: 58, dir: 'burst' },
  { x: SEAM_X, y: HALF_H, dir: 'down' },
]

// transform-origin for the zoom blur, as a percentage of the stage box
export const SEAM_ORIGIN_PCT = `${(((SEAM_X + STAGE_W / 2) / STAGE_W) * 100).toFixed(2)}% 50%`
