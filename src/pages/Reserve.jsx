import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { RESTAURANT } from '../config'
import { addDays, fmtTime, prettyDate, slotsFor, todayInKano } from '../lib/time'
import { copyText, storage, waLink } from '../lib/format'
import { CheckIcon, MinusIcon, PinIcon, PlusIcon, WhatsAppIcon } from '../components/Icons'

const OCCASIONS = ['None', 'Birthday', 'Anniversary', 'Business', 'Family gathering']
const MAX_GUESTS = 20

function dayChips() {
  const today = todayInKano()
  return Array.from({ length: 14 }, (_, n) => {
    const iso = addDays(today, n)
    const [y, m, d] = iso.split('-').map(Number)
    const dt = new Date(Date.UTC(y, m - 1, d))
    return {
      iso,
      top: n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : dt.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' }),
      day: d,
      month: dt.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }),
    }
  })
}

function icsFile(r) {
  const [y, m, d] = r.date.split('-')
  const hh = String(Math.floor(r.time / 60)).padStart(2, '0')
  const mm = String(r.time % 60).padStart(2, '0')
  const endMin = r.time + 90
  const eh = String(Math.floor(endMin / 60)).padStart(2, '0')
  const em = String(endMin % 60).padStart(2, '0')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bites of Paradise//Reservations//EN',
    'BEGIN:VEVENT',
    `UID:${r.ref}@bitesofparadise`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Africa/Lagos:${y}${m}${d}T${hh}${mm}00`,
    `DTEND;TZID=Africa/Lagos:${y}${m}${d}T${eh}${em}00`,
    `SUMMARY:Table for ${r.guests} at Bites of Paradise`,
    `LOCATION:Bites of Paradise\\, ${RESTAURANT.city.replace(',', '\\,')}`,
    `DESCRIPTION:Booking request ${r.ref}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export default function Reserve() {
  const days = useMemo(dayChips, [])
  const saved = storage.get('bop.contact', {})
  const [f, setF] = useState({
    date: days[0].iso,
    time: null,
    guests: 2,
    name: saved.name || '',
    phone: saved.phone || '',
    email: '',
    occasion: 'None',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)
  const [copied, setCopied] = useState(false)

  const slots = useMemo(() => slotsFor(f.date), [f.date])

  // If today has no slots left, start on tomorrow.
  useEffect(() => {
    if (f.date === days[0].iso && slotsFor(days[0].iso).length === 0) setF((s) => ({ ...s, date: days[1].iso }))
  }, [days, f.date])

  // Drop a chosen time that isn't valid for the new date.
  useEffect(() => {
    if (f.time !== null && !slots.some((s) => s.value === f.time)) setF((s) => ({ ...s, time: null }))
  }, [slots, f.time])

  const set = (k, v) => {
    setF((s) => ({ ...s, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (f.time === null) e.time = 'Pick a time.'
    if (!f.name.trim()) e.name = 'Add the name for the booking.'
    if (!/^\+?[\d\s-]{10,15}$/.test(f.phone.trim())) e.phone = 'Add a phone number, e.g. 0801 234 5678.'
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Check the email address.'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      document.querySelector(`[data-field="${Object.keys(e)[0]}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    storage.set('bop.contact', { ...storage.get('bop.contact', {}), name: f.name.trim(), phone: f.phone.trim() })
    const ref = 'BOP-' + Math.random().toString(36).slice(2, 7).toUpperCase()
    setDone({ ...f, ref })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const message = (r) =>
    [
      `Hello ${RESTAURANT.name}, I'd like to book a table.`,
      '',
      `Date: ${prettyDate(r.date)}`,
      `Time: ${fmtTime(r.time)}`,
      `Guests: ${r.guests}`,
      `Name: ${r.name.trim()}`,
      `Phone: ${r.phone.trim()}`,
      r.email ? `Email: ${r.email.trim()}` : null,
      r.occasion !== 'None' ? `Occasion: ${r.occasion}` : null,
      r.notes.trim() ? `Notes: ${r.notes.trim()}` : null,
      `Ref: ${r.ref}`,
    ]
      .filter(Boolean)
      .join('\n')

  const downloadIcs = () => {
    const blob = new Blob([icsFile(done)], { type: 'text/calendar' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `bites-of-paradise-${done.date}.ics`
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  return (
    <div className="reserve">
      <header className="page-head wrap">
        <h1 className="h1">Book a table</h1>
        <p className="page-head__lede">Tables for 1 to {MAX_GUESTS}. For larger groups or private events, mention it in the notes.</p>
      </header>

      <div className="wrap reserve__grid">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.section
              key="done"
              className="panel confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              aria-live="polite"
            >
              <motion.div className="confirm__badge" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}>
                <CheckIcon width={34} height={34} />
              </motion.div>
              <h2 className="h2">
                {RESTAURANT.whatsapp ? 'One step left: send your request' : 'Your request is ready'}
              </h2>
              <p>
                {RESTAURANT.whatsapp
                  ? 'Send it to us on WhatsApp and we’ll confirm your table by message.'
                  : 'Copy the details and send them to the restaurant, or quote your reference when you call.'}
              </p>
              <dl className="summary">
                <div><dt>Date</dt><dd>{prettyDate(done.date)}</dd></div>
                <div><dt>Time</dt><dd>{fmtTime(done.time)}</dd></div>
                <div><dt>Guests</dt><dd>{done.guests}</dd></div>
                <div><dt>Name</dt><dd>{done.name}</dd></div>
                {done.occasion !== 'None' && <div><dt>Occasion</dt><dd>{done.occasion}</dd></div>}
                <div><dt>Reference</dt><dd>{done.ref}</dd></div>
              </dl>
              <div className="confirm__actions">
                {RESTAURANT.whatsapp ? (
                  <a className="btn btn--saffron" href={waLink(RESTAURANT.whatsapp, message(done))} target="_blank" rel="noreferrer">
                    <WhatsAppIcon /> Send on WhatsApp
                  </a>
                ) : (
                  <button
                    className="btn btn--saffron"
                    onClick={async () => {
                      setCopied(await copyText(message(done)))
                      setTimeout(() => setCopied(false), 2500)
                    }}
                  >
                    {copied ? 'Details copied' : 'Copy details'}
                  </button>
                )}
                <button className="btn btn--line" onClick={downloadIcs}>
                  Add to calendar
                </button>
              </div>
              <button className="text-btn" onClick={() => setDone(null)}>
                Change booking
              </button>
            </motion.section>
          ) : (
            <motion.form key="form" className="panel form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
              <fieldset data-field="date">
                <legend>Day</legend>
                <div className="chips chips--days">
                  {days.map((d) => {
                    const full = slotsFor(d.iso).length === 0
                    return (
                      <button
                        type="button"
                        key={d.iso}
                        className={`daychip ${f.date === d.iso ? 'is-on' : ''}`}
                        onClick={() => set('date', d.iso)}
                        disabled={full}
                        aria-pressed={f.date === d.iso}
                        aria-label={`${prettyDate(d.iso)}${full ? ', no times left' : ''}`}
                      >
                        <span>{d.top}</span>
                        <strong>{d.day}</strong>
                        <span>{d.month}</span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <fieldset data-field="time">
                <legend>Time</legend>
                <div className="chips">
                  {slots.map((s) => (
                    <button
                      type="button"
                      key={s.value}
                      className={`chip ${f.time === s.value ? 'is-on' : ''}`}
                      onClick={() => set('time', s.value)}
                      aria-pressed={f.time === s.value}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="error">{errors.time}</p>}
              </fieldset>

              <fieldset>
                <legend>Guests</legend>
                <div className="stepper">
                  <button type="button" onClick={() => set('guests', Math.max(1, f.guests - 1))} disabled={f.guests <= 1} aria-label="One fewer guest">
                    <MinusIcon />
                  </button>
                  <motion.output key={f.guests} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} aria-live="polite">
                    {f.guests}
                  </motion.output>
                  <button type="button" onClick={() => set('guests', Math.min(MAX_GUESTS, f.guests + 1))} disabled={f.guests >= MAX_GUESTS} aria-label="One more guest">
                    <PlusIcon />
                  </button>
                  <span className="stepper__label">{f.guests === 1 ? 'guest' : 'guests'}</span>
                </div>
              </fieldset>

              <div className="field-grid">
                <label className={`field ${errors.name ? 'has-error' : ''}`} data-field="name">
                  <span>Name for the booking</span>
                  <input value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />
                  {errors.name && <em className="error">{errors.name}</em>}
                </label>
                <label className={`field ${errors.phone ? 'has-error' : ''}`} data-field="phone">
                  <span>Phone</span>
                  <input value={f.phone} onChange={(e) => set('phone', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} />
                  {errors.phone && <em className="error">{errors.phone}</em>}
                </label>
                <label className={`field field--full ${errors.email ? 'has-error' : ''}`} data-field="email">
                  <span>Email (optional)</span>
                  <input type="email" value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email} />
                  {errors.email && <em className="error">{errors.email}</em>}
                </label>
              </div>

              <fieldset>
                <legend>Occasion</legend>
                <div className="chips">
                  {OCCASIONS.map((o) => (
                    <button type="button" key={o} className={`chip ${f.occasion === o ? 'is-on' : ''}`} onClick={() => set('occasion', o)} aria-pressed={f.occasion === o}>
                      {o}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="field field--full">
                <span>Notes (optional)</span>
                <textarea rows={3} value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder="High chair, seating preference, allergies…" />
              </label>

              <button type="submit" className="btn btn--dark btn--block">
                Request this table
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <aside className="reserve__side">
          <div className="ticket">
            <p className="ticket__label">Your table</p>
            <p className="ticket__big">
              {(done || f).guests} {(done || f).guests === 1 ? 'guest' : 'guests'}
            </p>
            <p>{prettyDate((done || f).date)}</p>
            <p>{(done || f).time !== null ? fmtTime((done || f).time) : 'Pick a time'}</p>
          </div>
          <div className="reserve__map">
            <iframe title="Map showing Bites of Paradise in Kano" src={RESTAURANT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <a className="link link--icon" href={RESTAURANT.directions} target="_blank" rel="noreferrer">
            <PinIcon /> Get directions
          </a>
          <p className="hint">
            Want to order ahead? <Link to="/menu">Pick from the menu</Link> and send it with your booking.
          </p>
        </aside>
      </div>
    </div>
  )
}
