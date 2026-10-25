import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Cloud from '../components/Cloud'
import OpenStatus from '../components/OpenStatus'
import AddButton from '../components/AddButton'
import { ITEM_BY_ID, PHOTOS, SIGNATURES } from '../data/menu'
import { HOURS, RESTAURANT } from '../config'
import { money } from '../lib/format'
import { fmtRange, nowInKano } from '../lib/time'

const HERO_SLIDES = [
  { src: PHOTOS.tawook, item: 'shish-tawook' },
  { src: PHOTOS.rice, item: 'fried-rice' },
  { src: PHOTOS.wedges, item: 'herbed-potatoes' },
  { src: PHOTOS.pasta, item: 'spaghetti-bolognese' },
]

const KITCHENS = [
  { name: 'Hausa', line: 'Jollof, fried yam and the food we grew up on.', to: '/menu/lunch', img: PHOTOS.rice },
  { name: 'Arabian', line: 'Mandi rice and shish tawook off the grill.', to: '/menu/grills', img: PHOTOS.tawook },
  { name: 'Italian', line: 'Pasta from Hajiya’s years cooking in Italy.', to: '/menu/pasta', img: PHOTOS.pasta },
  { name: 'English', line: 'A proper breakfast, toast to baked beans.', to: '/menu/english-breakfast', img: PHOTOS.breakfast },
]

const ease = [0.2, 0.7, 0.1, 1]

function Hero() {
  const [i, setI] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 12])

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % HERO_SLIDES.length), 4800)
    return () => clearInterval(t)
  }, [])

  const slide = HERO_SLIDES[i]
  const item = ITEM_BY_ID[slide.item]
  const lines = ['One taste', 'and you keep', 'coming back.']

  return (
    <section className="hero" ref={ref}>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title" aria-label={RESTAURANT.tagline}>
            {lines.map((l, n) => (
              <span className="hero__line" key={l} aria-hidden="true">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + n * 0.12, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            <p className="hero__lede">
              A family kitchen in Kano cooking Hausa, Arabian, Italian and English favourites, from first breakfast to late dinner.
            </p>
            <div className="hero__ctas">
              <Link to="/reserve" className="btn btn--dark">
                Book a table
              </Link>
              <Link to="/menu" className="btn btn--line">
                Order from the menu
              </Link>
            </div>
            <OpenStatus />
          </motion.div>
        </div>

        <motion.div
          className="hero__art"
          style={{ y }}
          initial={{ scale: 0.6, rotate: -25, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        >
          <motion.div style={{ rotate }}>
            <Cloud>
              <AnimatePresence initial={false}>
                <motion.img
                  key={slide.src}
                  src={slide.src}
                  alt={item.name}
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease }}
                  fetchpriority={i === 0 ? 'high' : undefined}
                />
              </AnimatePresence>
            </Cloud>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className="hero__tag"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <p className="hero__tag-name">{item.name}</p>
                <p className="hero__tag-price">{money(item.price)}</p>
              </div>
              <AddButton item={item} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function Favourites() {
  return (
    <section className="section favs">
      <div className="wrap section__head">
        <h2 className="h2">What people come back for</h2>
        <Link to="/menu" className="link">
          Full menu
        </Link>
      </div>
      <div className="favs__rail" role="list">
        {SIGNATURES.map((d) => (
          <article className="fav" key={d.id} role="listitem">
            <div className="fav__img">
              <img src={d.image} alt={d.name} loading="lazy" />
            </div>
            <h3>{d.name}</h3>
            <p className="fav__desc">{d.description}</p>
            <div className="fav__foot">
              <span className="price">{money(d.price)}</span>
              <AddButton item={d} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Kitchens() {
  const [active, setActive] = useState(0)
  return (
    <section className="section kitchens">
      <div className="wrap kitchens__grid">
        <div>
          <h2 className="h2">Four kitchens, one table</h2>
          <ul className="kitchens__list">
            {KITCHENS.map((k, n) => (
              <li key={k.name}>
                <Link
                  to={k.to}
                  className={`kitchen ${active === n ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(n)}
                  onFocus={() => setActive(n)}
                >
                  <span className="kitchen__name">{k.name}</span>
                  <span className="kitchen__line">{k.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="kitchens__frame">
          <AnimatePresence initial={false}>
            <motion.img
              key={active}
              src={KITCHENS[active].img}
              alt=""
              loading="lazy"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="section story">
      <div className="wrap story__grid">
        <figure className="story__photo">
          <img src={PHOTOS.owners} alt="Hajiya and Hajjo, the sisters who own Bites of Paradise" loading="lazy" />
        </figure>
        <div className="story__copy">
          <h2 className="h2">Run by two sisters from Kano</h2>
          <p>
            Hajiya writes the menu from family recipes and the years she spent cooking in Italy. Hajjo runs the marketing and pushed the
            menu past local classics into Arabian, Italian and English cooking.
          </p>
          <p>The room is relaxed, the prices are fair, and there is something on the menu at any hour we are open.</p>
          <Link to="/about" className="link">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const today = nowInKano().day
  const ordered = [...HOURS.slice(1), HOURS[0]]
  return (
    <section className="section visit">
      <div className="wrap visit__grid">
        <div>
          <h2 className="h2">Come and eat</h2>
          <OpenStatus className="status--light" />
          <table className="hours">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {ordered.map((h) => (
                <tr key={h.day} className={h.day === today ? 'is-today' : ''}>
                  <th scope="row">{h.label}</th>
                  <td>{fmtRange(h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="visit__note">Open every day, public holidays included.</p>
          <div className="hero__ctas">
            <Link to="/reserve" className="btn btn--saffron">
              Book a table
            </Link>
            <a href={RESTAURANT.directions} target="_blank" rel="noreferrer" className="btn btn--line-light">
              Get directions
            </a>
          </div>
        </div>
        <div className="visit__map">
          <iframe title="Map showing Bites of Paradise in Kano" src={RESTAURANT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Favourites />
      <Kitchens />
      <Story />
      <Visit />
    </>
  )
}
