import { useEffect, useState } from 'react'
import { openStatus } from '../lib/time'

export default function OpenStatus({ className = '' }) {
  const [s, setS] = useState(openStatus)
  useEffect(() => {
    const t = setInterval(() => setS(openStatus()), 60_000)
    return () => clearInterval(t)
  }, [])
  return (
    <p className={`status ${s.open ? 'is-open' : 'is-closed'} ${className}`}>
      <span className="status__dot" aria-hidden="true" />
      {s.text}
    </p>
  )
}
