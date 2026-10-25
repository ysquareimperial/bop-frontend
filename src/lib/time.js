import { HOURS, LAST_SEATING_BEFORE_CLOSE, RESTAURANT } from '../config'

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const fmtTime = (mins) => {
  const h = Math.floor(mins / 60) % 24
  const m = mins % 60
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

export const fmtRange = (h) => `${fmtTime(toMin(h.open))} – ${fmtTime(toMin(h.close))}`

/** Current day/minute in Kano, regardless of the visitor's own time zone. */
export function nowInKano(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: RESTAURANT.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t) => parts.find((p) => p.type === t)?.value
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return {
    day: days.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    iso: `${get('year')}-${get('month')}-${get('day')}`,
  }
}

export function openStatus(date = new Date()) {
  const { day, minutes } = nowInKano(date)
  const today = HOURS.find((h) => h.day === day)
  const open = toMin(today.open)
  const close = toMin(today.close)
  if (minutes >= open && minutes < close) {
    const left = close - minutes
    return { open: true, text: left <= 60 ? `Open, closing at ${fmtTime(close)}` : `Open now until ${fmtTime(close)}` }
  }
  if (minutes < open) return { open: false, text: `Closed, opens today at ${fmtTime(open)}` }
  const tomorrow = HOURS.find((h) => h.day === (day + 1) % 7)
  return { open: false, text: `Closed, opens tomorrow at ${fmtTime(toMin(tomorrow.open))}` }
}

/** 30-minute booking slots for a YYYY-MM-DD date, skipping times already past in Kano. */
export function slotsFor(isoDate) {
  if (!isoDate) return []
  const [y, m, d] = isoDate.split('-').map(Number)
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  const hours = HOURS.find((h) => h.day === weekday)
  const start = toMin(hours.open)
  const last = toMin(hours.close) - LAST_SEATING_BEFORE_CLOSE
  const now = nowInKano()
  const earliest = isoDate === now.iso ? now.minutes + 30 : 0
  const out = []
  for (let t = start; t <= last; t += 30) if (t >= earliest) out.push({ value: t, label: fmtTime(t) })
  return out
}

export const todayInKano = () => nowInKano().iso

export function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + n))
  return dt.toISOString().slice(0, 10)
}

export function prettyDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}
