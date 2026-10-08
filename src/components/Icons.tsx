import type { ProfileKey, ServiceIconKey } from '@/lib/content'

// Hand-drawn line set in the style of a steel section drawing. Square caps and
// mitred joins keep the edges hard, like cut steel.

type SvgProps = { className?: string; size?: number; title?: string }

function Frame({
  children,
  className,
  size = 48,
  title,
  strokeWidth = 1.5,
}: SvgProps & { children: React.ReactNode; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

const profiles: Record<ProfileKey, React.ReactNode> = {
  ibeam: (
    <>
      <path d="M12 8H40V13H28.5V35H40V40H12V35H23.5V13H12Z" />
      <path d="M6 8V40M4.5 8H7.5M4.5 40H7.5" strokeWidth={1} />
    </>
  ),
  plate: (
    <>
      <path d="M8 22L24 14L40 22L24 30Z" />
      <path d="M8 22V26L24 34L40 26V22M24 30V34" />
      <path d="M8 30L24 38L40 30M8 26V30M40 26V30M24 34V38" />
    </>
  ),
  tube: (
    <>
      <rect x="6" y="15" width="18" height="18" />
      <rect x="9.5" y="18.5" width="11" height="11" />
      <circle cx="34" cy="24" r="8.5" />
      <circle cx="34" cy="24" r="5.5" />
    </>
  ),
  bar: (
    <>
      <circle cx="14" cy="16" r="6" />
      <rect x="27" y="10" width="12" height="12" />
      <rect x="7" y="30" width="34" height="6" />
    </>
  ),
  ingot: (
    <>
      <path d="M8 36H40L35 22H13Z" />
      <path d="M13 22L17 15H31L35 22" />
      <path d="M20 29H28" strokeWidth={1} />
    </>
  ),
  hollow: (
    <>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="8" />
      <path d="M24 4V9M24 39V44M4 24H9M39 24H44" strokeWidth={1} />
    </>
  ),
  pipe: (
    <>
      <ellipse cx="13" cy="24" rx="5" ry="11" />
      <ellipse cx="13" cy="24" rx="2.5" ry="7" />
      <path d="M13 13H37M13 35H37" />
      <path d="M37 13A5 11 0 0 1 37 35" />
    </>
  ),
  wear: (
    <>
      <path d="M6 28L24 19L42 28L24 37Z" />
      <path d="M6 28V33L24 42L42 33V28M24 37V42" />
      <path d="M15 28L24 23.5L33 28L24 32.5Z" strokeWidth={1} />
      <path d="M24 6V15M20 11L24 15L28 11" strokeWidth={1} />
    </>
  ),
}

export function ProfileIcon({ name, ...props }: SvgProps & { name: ProfileKey }) {
  return <Frame {...props}>{profiles[name]}</Frame>
}

const sawTeeth = Array.from({ length: 18 }, (_, i) => {
  const a1 = (i / 18) * Math.PI * 2
  const a2 = ((i + 0.6) / 18) * Math.PI * 2
  const p = (a: number, r: number) => `${(24 + Math.cos(a) * r).toFixed(2)} ${(24 + Math.sin(a) * r).toFixed(2)}`
  return `${i === 0 ? 'M' : 'L'}${p(a1, 11)} L${p(a2, 15)}`
}).join(' ') + 'Z'

const serviceIcons: Record<ServiceIconKey, React.ReactNode> = {
  cut: (
    <>
      <path d={sawTeeth} />
      <circle cx="24" cy="24" r="3.5" />
    </>
  ),
  truck: (
    <>
      <path d="M4 33H31V19H38L44 26V33H41" />
      <path d="M31 26H44" strokeWidth={1} />
      <circle cx="12" cy="35" r="3" />
      <circle cx="37" cy="35" r="3" />
      <rect x="6" y="27" width="22" height="3" />
      <rect x="8" y="23" width="18" height="4" />
    </>
  ),
  yard: (
    <>
      <circle cx="15" cy="34" r="5" />
      <circle cx="25" cy="34" r="5" />
      <circle cx="35" cy="34" r="5" />
      <circle cx="20" cy="25.5" r="5" />
      <circle cx="30" cy="25.5" r="5" />
      <circle cx="25" cy="17" r="5" />
      <path d="M9 41H41" strokeWidth={1} />
    </>
  ),
  ledger: (
    <>
      <path d="M12 6H30L37 13V42H12Z" />
      <path d="M30 6V13H37" />
      <path d="M17 21H32M17 27H32M17 33H26" strokeWidth={1} />
    </>
  ),
}

export function ServiceIcon({ name, ...props }: SvgProps & { name: ServiceIconKey }) {
  return <Frame {...props}>{serviceIcons[name]}</Frame>
}

function Small({ children, className, size = 16 }: SvgProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p: SvgProps) => (
  <Small {...p}>
    <path d="M2 8H13M9 4L13 8L9 12" />
  </Small>
)

export const ArrowUpRight = (p: SvgProps) => (
  <Small {...p}>
    <path d="M4 12L12 4M5.5 4H12V10.5" />
  </Small>
)

export const PhoneIcon = (p: SvgProps) => (
  <Small {...p}>
    <path d="M3 2.5H6L7.5 6L5.75 7.25C6.5 8.75 7.25 9.5 8.75 10.25L10 8.5L13.5 10V13C13.5 13.5 13 14 12.5 14C7 13.5 2.5 9 2 3.5C2 3 2.5 2.5 3 2.5Z" />
  </Small>
)

export const MailIcon = (p: SvgProps) => (
  <Small {...p}>
    <rect x="2" y="3.5" width="12" height="9" />
    <path d="M2 4L8 9L14 4" />
  </Small>
)

export const PinIcon = (p: SvgProps) => (
  <Small {...p}>
    <path d="M8 14.5C8 14.5 3 9.75 3 6.25C3 3.5 5.25 1.5 8 1.5C10.75 1.5 13 3.5 13 6.25C13 9.75 8 14.5 8 14.5Z" />
    <rect x="6.5" y="5" width="3" height="3" />
  </Small>
)

export const MenuIcon = (p: SvgProps) => (
  <Small {...p}>
    <path d="M1.5 5H14.5M1.5 11H14.5" />
  </Small>
)

export const CloseIcon = (p: SvgProps) => (
  <Small {...p}>
    <path d="M3 3L13 13M13 3L3 13" />
  </Small>
)

export const PlusIcon = (p: SvgProps) => (
  <Small {...p}>
    <path d="M8 2V14M2 8H14" />
  </Small>
)

// Official WhatsApp glyph, used only to link to WhatsApp.
export const WhatsAppIcon = ({ className, size = 20 }: SvgProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.44 9.44 0 0 1-1.45-5.04c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.69L.55 23.6l6.03-1.58a11.35 11.35 0 0 0 5.45 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.19-5.9-3.33-8.05z" />
  </svg>
)

// The brand mark: two steel blocks locked together on a dovetail seam,
// the same joint the intro animation slams shut.
export function LogoMark({ className, size = 36 }: SvgProps) {
  return (
    <svg viewBox="0 0 48 28" width={size} height={(size * 28) / 48} className={className} aria-hidden>
      <path d="M1 1H22V6L26 5V12L22 11V17L18 16V23L22 22V27H1Z" fill="currentColor" opacity="0.9" />
      <path
        d="M47 1H22V6L26 5V12L22 11V17L18 16V23L22 22V27H47Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path d="M22 1V6L26 5V12L22 11V17L18 16V23L22 22V27" fill="none" stroke="var(--molten)" strokeWidth="1.25" />
    </svg>
  )
}
