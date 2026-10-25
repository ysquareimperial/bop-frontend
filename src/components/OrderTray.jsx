import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useOrder } from '../context/Order'
import { RESTAURANT } from '../config'
import { copyText, money, storage, waLink } from '../lib/format'
import { openStatus } from '../lib/time'
import AddButton from './AddButton'
import { BagIcon, CloseIcon, WhatsAppIcon } from './Icons'

const MODES = [
  { id: 'pickup', label: 'Pick up' },
  { id: 'dine-in', label: 'Dine in' },
  { id: 'delivery', label: 'Delivery' },
]

export default function OrderTray() {
  const { items, count, total, open, setOpen, clear } = useOrder()
  const { pathname } = useLocation()
  const [mode, setMode] = useState('pickup')
  const [form, setForm] = useState(() => storage.get('bop.contact', { name: '', phone: '', address: '', note: '' }))
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => storage.set('bop.contact', { ...form, note: '' }), [form])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    setTimeout(() => panelRef.current?.focus(), 50)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen])

  useEffect(() => setOpen(false), [pathname, setOpen])

  const message = () =>
    [
      `Hello ${RESTAURANT.name}, I'd like to order (${MODES.find((m) => m.id === mode).label.toLowerCase()}):`,
      '',
      ...items.map((i) => `${i.qty} × ${i.name} — ${money(i.qty * i.price)}`),
      '',
      `Total: ${money(total)}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      mode === 'delivery' ? `Address: ${form.address.trim()}` : null,
      form.note.trim() ? `Note: ${form.note.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n')

  const validate = () => {
    if (!form.name.trim()) return 'Add your name so we know whose order it is.'
    if (!/^\+?[\d\s-]{10,15}$/.test(form.phone.trim())) return 'Add a phone number we can call, e.g. 0801 234 5678.'
    if (mode === 'delivery' && form.address.trim().length < 6) return 'Add a delivery address.'
    return ''
  }

  const send = async () => {
    const err = validate()
    setError(err)
    if (err) return
    if (RESTAURANT.whatsapp) {
      window.open(waLink(RESTAURANT.whatsapp, message()), '_blank', 'noopener')
    } else {
      const ok = await copyText(message())
      setCopied(ok)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const status = openStatus()
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <AnimatePresence>
        {count > 0 && !open && pathname.startsWith('/menu') && (
          <motion.button
            className="tray-fab"
            onClick={() => setOpen(true)}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <BagIcon />
            <span>
              View order ({count})
            </span>
            <strong>{money(total)}</strong>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="scrim"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              ref={panelRef}
              tabIndex={-1}
              className="tray"
              role="dialog"
              aria-modal="true"
              aria-labelledby="tray-title"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="tray__head">
                <h2 id="tray-title">Your order</h2>
                <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close order">
                  <CloseIcon />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="tray__empty">
                  <p>Nothing here yet. Add dishes from the menu and send your order in one message.</p>
                  <Link to="/menu" className="btn btn--dark">
                    Browse the menu
                  </Link>
                </div>
              ) : (
                <>
                  <div className="tray__body">
                    <ul className="tray__list">
                      <AnimatePresence initial={false}>
                        {items.map((i) => (
                          <motion.li
                            key={i.id}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <img src={i.image} alt="" />
                            <div>
                              <p className="tray__name">{i.name}</p>
                              <p className="tray__price">{money(i.price * i.qty)}</p>
                            </div>
                            <AddButton item={i} />
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                    <button className="text-btn" onClick={clear}>
                      Clear order
                    </button>

                    <fieldset className="seg-field">
                      <legend>How would you like it?</legend>
                      <div className="segmented">
                        {MODES.map((m) => (
                          <label key={m.id} className={mode === m.id ? 'is-on' : ''}>
                            <input type="radio" name="mode" value={m.id} checked={mode === m.id} onChange={() => setMode(m.id)} />
                            {mode === m.id && <motion.span layoutId="seg" className="segmented__pill" />}
                            <span className="segmented__txt">{m.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="field-grid">
                      <label className="field">
                        <span>Your name</span>
                        <input value={form.name} onChange={set('name')} autoComplete="name" />
                      </label>
                      <label className="field">
                        <span>Phone</span>
                        <input value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
                      </label>
                      {mode === 'delivery' && (
                        <label className="field field--full">
                          <span>Delivery address</span>
                          <input value={form.address} onChange={set('address')} autoComplete="street-address" />
                        </label>
                      )}
                      <label className="field field--full">
                        <span>Note for the kitchen (optional)</span>
                        <input value={form.note} onChange={set('note')} placeholder="Less pepper, extra sauce…" />
                      </label>
                    </div>
                    {mode === 'delivery' && <p className="hint">Delivery fee is confirmed when we call you back.</p>}
                  </div>

                  <div className="tray__foot">
                    {!status.open && <p className="hint">{status.text}. We’ll prepare it once we open.</p>}
                    {error && (
                      <p className="error" role="alert">
                        {error}
                      </p>
                    )}
                    <div className="tray__total">
                      <span>Total</span>
                      <strong>{money(total)}</strong>
                    </div>
                    <button className="btn btn--saffron btn--block" onClick={send}>
                      {RESTAURANT.whatsapp ? (
                        <>
                          <WhatsAppIcon /> Send order on WhatsApp
                        </>
                      ) : copied ? (
                        'Order copied'
                      ) : (
                        'Copy order'
                      )}
                    </button>
                    {!RESTAURANT.whatsapp && <p className="hint">Paste it into a message to the restaurant, or show it at the counter.</p>}
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
