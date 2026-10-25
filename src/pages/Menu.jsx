import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES } from '../data/menu'
import { money } from '../lib/format'
import AddButton from '../components/AddButton'
import OpenStatus from '../components/OpenStatus'
import { CloseIcon, SearchIcon } from '../components/Icons'

const TAGS = { veg: 'Vegetarian', signature: 'House favourite' }

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// Memoised so a tab change doesn't re-render (and re-measure the layout of) every dish
const Dish = memo(function Dish({ item }) {
  return (
    <motion.li
      className="dish"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img className="dish__img" src={item.image} alt="" loading="lazy" width="96" height="96" />
      <div className="dish__body">
        <div className="dish__top">
          <h3 className="dish__name">{item.name}</h3>
          <span className="dish__leader" aria-hidden="true" />
          <span className="price">
            {money(item.price)}
            {item.unit && <small> {item.unit}</small>}
          </span>
        </div>
        <p className="dish__desc">{item.description}</p>
        <div className="dish__foot">
          <div className="dish__tags">
            {item.tags?.map((t) => (
              <span key={t} className={`tag tag--${t}`}>
                {TAGS[t]}
              </span>
            ))}
          </div>
          <AddButton item={item} />
        </div>
      </div>
    </motion.li>
  )
})

export default function Menu() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(category || CATEGORIES[0].id)
  const sectionRefs = useRef({})
  const tabsRef = useRef(null)
  const barRef = useRef(null)
  const clickScrolling = useRef(false)

  const q = norm(query.trim())
  const filtered = useMemo(() => {
    if (!q) return CATEGORIES
    return CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter((i) => norm(`${i.name} ${i.description} ${c.title}`).includes(q)),
    })).filter((c) => c.items.length)
  }, [q])
  const resultCount = filtered.reduce((s, c) => s + c.items.length, 0)

  // Bottom edge of the sticky menu bar once it's stuck
  const barOffset = () => {
    const bar = barRef.current
    if (!bar) return 150
    return (parseFloat(getComputedStyle(bar).top) || 0) + bar.offsetHeight
  }

  const scrollTo = (id, smooth = true) => {
    const el = sectionRefs.current[id]
    if (!el) return
    clickScrolling.current = true
    const top = el.getBoundingClientRect().top + window.scrollY - barOffset() - 16
    const release = () => {
      clickScrolling.current = false
      window.removeEventListener('scrollend', release)
      clearTimeout(timer)
    }
    const timer = setTimeout(release, smooth ? 1200 : 50)
    if (smooth && 'onscrollend' in window) window.addEventListener('scrollend', release)
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' })
  }

  // Deep link: /menu/pasta scrolls to pasta. Unknown categories fall back to /menu.
  useEffect(() => {
    if (!category) return
    if (!CATEGORIES.some((c) => c.id === category)) {
      navigate('/menu', { replace: true })
      return
    }
    setActive(category)
    requestAnimationFrame(() => scrollTo(category, false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll spy: the active section is the last one whose top has passed just below the menu bar
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      if (clickScrolling.current) return
      const line = barOffset() + 48
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = filtered[0]?.id
      for (const c of filtered) {
        const el = sectionRefs.current[c.id]
        if (el && el.getBoundingClientRect().top <= line) current = c.id
      }
      if (atBottom && filtered.length) current = filtered[filtered.length - 1].id
      if (current) setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [filtered])

  // Keep the active tab centred in the horizontal rail. Scroll the rail itself rather than using
  // scrollIntoView, which can cancel the page's own (smooth) scroll in Chromium.
  useEffect(() => {
    const rail = tabsRef.current
    const tab = rail?.querySelector(`[data-tab="${active}"]`)
    if (!tab) return
    const r = rail.getBoundingClientRect()
    const t = tab.getBoundingClientRect()
    const left = rail.scrollLeft + (t.left - r.left) - (rail.clientWidth - t.width) / 2
    rail.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  const pick = (id) => {
    setActive(id)
    window.history.replaceState(null, '', `/menu/${id}`)
    scrollTo(id)
  }

  return (
    <div className="menu-page">
      <header className="page-head wrap">
        <h1 className="h1">The menu</h1>
        <p className="page-head__lede">Everything is cooked to order. Add dishes as you go and send the whole order in one message.</p>
        <OpenStatus />
      </header>

      <div className="menu-bar" ref={barRef}>
        <div className="wrap menu-bar__inner">
          <label className="search">
            <SearchIcon />
            <span className="sr-only">Search the menu</span>
            <input
              type="search"
              placeholder="Search dishes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search">
                <CloseIcon width={18} height={18} />
              </button>
            )}
          </label>
          <nav className="tabs" ref={tabsRef} aria-label="Menu sections">
            {/* Own presence scope: otherwise a pill that has moved via layoutId registers with the
                page's exit animation and the route transition never completes. */}
            <AnimatePresence initial={false}>
            {filtered.map((c) => (
              <button
                key={c.id}
                data-tab={c.id}
                className={`tab ${active === c.id ? 'is-active' : ''}`}
                onClick={() => pick(c.id)}
                aria-current={active === c.id ? 'true' : undefined}
              >
                {active === c.id && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="tab__label">{c.title}</span>
              </button>
            ))}
            </AnimatePresence>
          </nav>
        </div>
      </div>

      <div className="wrap menu-body">
        {q && (
          <p className="menu-results" aria-live="polite">
            {resultCount ? `${resultCount} dish${resultCount === 1 ? '' : 'es'} match “${query.trim()}”` : ''}
          </p>
        )}
        {filtered.length === 0 && (
          <div className="empty">
            <p>No dishes match “{query.trim()}”. Try “rice”, “chicken” or “soup”.</p>
            <button className="btn btn--dark" onClick={() => setQuery('')}>
              Show the full menu
            </button>
          </div>
        )}
        {filtered.map((c) => (
          <section
            key={c.id}
            className="menu-sec"
            data-id={c.id}
            id={c.id}
            ref={(el) => (sectionRefs.current[c.id] = el)}
            aria-labelledby={`h-${c.id}`}
          >
            <div className="menu-sec__head">
              <div className="menu-sec__cover">
                <img src={c.cover} alt="" loading="lazy" />
              </div>
              <div>
                <h2 id={`h-${c.id}`} className="h2">
                  {c.title}
                </h2>
                <p>{c.blurb}</p>
              </div>
            </div>
            <ul className="dishes">
              {c.items.map((item) => (
                <Dish key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ))}
        <p className="menu-note">Tell us about any allergies when you order.</p>
      </div>
    </div>
  )
}
