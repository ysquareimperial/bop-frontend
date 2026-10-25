import { useId } from 'react'

// The scalloped cloud from the Bites of Paradise sign, as a clip path.
function cloudPath(bumps = 11, rx = 0.43, ry = 0.43, depth = 1.16) {
  const cx = 0.5
  const cy = 0.5
  const pts = Array.from({ length: bumps }, (_, i) => {
    const a = (i / bumps) * Math.PI * 2 - Math.PI / 2
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]
  })
  let d = `M${pts[0][0].toFixed(4)},${pts[0][1].toFixed(4)}`
  for (let i = 0; i < bumps; i++) {
    const a = ((i + 0.5) / bumps) * Math.PI * 2 - Math.PI / 2
    const ctrl = [cx + rx * depth * 1.04 * Math.cos(a), cy + ry * depth * 1.04 * Math.sin(a)]
    const next = pts[(i + 1) % bumps]
    d += ` Q${ctrl[0].toFixed(4)},${ctrl[1].toFixed(4)} ${next[0].toFixed(4)},${next[1].toFixed(4)}`
  }
  return d + 'Z'
}

export const CLOUD_D = cloudPath()

/** Renders children (an <img> or motion element) clipped to the cloud, with a bite out of the top right. */
export default function Cloud({ children, className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`cloud ${className}`}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={`c${id}`} clipPathUnits="objectBoundingBox">
            <path d={CLOUD_D} />
          </clipPath>
        </defs>
      </svg>
      <div className="cloud__clip" style={{ clipPath: `url(#c${id})` }}>
        {children}
      </div>
      <span className="cloud__bite" aria-hidden="true" />
    </div>
  )
}
