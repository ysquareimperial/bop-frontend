import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { HOURS, RESTAURANT } from '../config'
import { fmtRange } from '../lib/time'

export default function Footer() {
  const weekday = HOURS.find((h) => h.day === 1)
  const sat = HOURS.find((h) => h.day === 6)
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <img src={logo} alt="Bites of Paradise logo" width="72" height="72" loading="lazy" />
          <p>{RESTAURANT.tagline}</p>
        </div>
        <div>
          <h3>Visit</h3>
          <p>{RESTAURANT.city}</p>
          <a href={RESTAURANT.directions} target="_blank" rel="noreferrer">
            Get directions
          </a>
          {RESTAURANT.phone && <a href={`tel:${RESTAURANT.phone.replace(/\s/g, '')}`}>{RESTAURANT.phone}</a>}
          {RESTAURANT.instagram && (
            <a href={`https://instagram.com/${RESTAURANT.instagram}`} target="_blank" rel="noreferrer">
              Instagram
            </a>
          )}
        </div>
        <div>
          <h3>Hours</h3>
          <p>Sunday to Friday, {fmtRange(weekday)}</p>
          <p>Saturday, {fmtRange(sat)}</p>
          <p>Open on public holidays</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/menu">Menu</Link>
          <Link to="/about">Our story</Link>
          <Link to="/reserve">Book a table</Link>
        </div>
      </div>
      <div className="wrap footer__base">
        <p>© {new Date().getFullYear()} Bites of Paradise</p>
        <p>Site by Mcferri</p>
      </div>
    </footer>
  )
}
