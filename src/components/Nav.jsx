import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/logo.webp'
import { useOrder } from '../context/Order'
import { PROMO } from '../config'
import { BagIcon } from './Icons'

const LINKS = [
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'Our story' },
  { to: '/reserve', label: 'Book a table' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const { count, setOpen, lastAdded } = useOrder()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const onHero = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      {PROMO.enabled && (
        <Link to={PROMO.to} className="promo">
          {PROMO.text}
        </Link>
      )}
      <header className={`nav ${scrolled ? 'is-solid' : ''} ${onHero && !scrolled ? 'is-hero' : ''} ${menuOpen ? 'is-menu' : ''}`}>
        <div className="nav__inner wrap">
          <Link to="/" className="nav__brand" aria-label="Bites of Paradise home">
            <img src={logo} alt="" width="44" height="44" />
            <span>Bites of Paradise</span>
          </Link>

          <nav className="nav__links" aria-label="Main">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <motion.span layoutId="nav-underline" className="nav__underline" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <motion.button
              key={lastAdded?.at || 'bag'}
              className="bag-btn"
              onClick={() => setOpen(true)}
              aria-label={`Your order, ${count} item${count === 1 ? '' : 's'}`}
              animate={lastAdded ? { scale: [1, 1.18, 1] } : undefined}
              transition={{ duration: 0.35 }}
            >
              <BagIcon />
              {count > 0 && <span className="bag-btn__count">{count}</span>}
            </motion.button>
            <button
              className={`burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="sheet-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
          >
            <nav aria-label="Mobile">
              {[{ to: '/', label: 'Home' }, ...LINKS].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <NavLink to={l.to} end className="sheet-menu__link">
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
