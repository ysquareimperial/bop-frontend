import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PHOTOS } from '../data/menu'

const ease = [0.2, 0.7, 0.1, 1]

export default function About() {
  return (
    <div className="about">
      <header className="page-head wrap">
        <motion.h1 className="h1" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          Two sisters, four cuisines, one kitchen in Kano
        </motion.h1>
      </header>

      <section className="wrap about__grid">
        <motion.figure
          className="about__photo"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1, delay: 0.15, ease }}
        >
          <img src={PHOTOS.owners} alt="Hajiya and Hajjo, the owners of Bites of Paradise" />
          <figcaption>Hajiya and Hajjo</figcaption>
        </motion.figure>

        <div className="prose">
          <p className="prose__lead">
            Bites of Paradise is a family-owned restaurant in Kano. We cook traditional and continental recipes and serve them with a
            modern touch.
          </p>
          <p>
            The restaurant was started by two Kano sisters, Hajiya and Hajjo, who wanted a place where the food is memorable and the
            service makes you want to return.
          </p>
          <p>
            Hajiya writes the menu. She draws on family recipes and on her years working as a chef in Italy, which is why you will find
            a proper bolognese on the same page as jollof rice.
          </p>
          <p>
            Hajjo runs the marketing, and she led the push to take the menu past local classics. Today the kitchen cooks from Hausa,
            Arabian, Italian and English traditions, with something to eat at every hour we are open.
          </p>
          <p>The room is rustic and relaxed and the prices are moderate, so it works for a quick breakfast as well as a long family dinner.</p>
        </div>
      </section>

      <section className="wrap about__strip" aria-label="Inside the restaurant">
        <img src={PHOTOS.chef} alt="A chef plating salad at the pass" loading="lazy" />
        <img src={PHOTOS.interior} alt="The dining room" loading="lazy" />
        <img src={PHOTOS.team} alt="Two chefs talking in the kitchen" loading="lazy" />
      </section>

      <section className="wrap about__cta">
        <h2 className="h2">Hungry yet?</h2>
        <div className="hero__ctas">
          <Link to="/reserve" className="btn btn--dark">
            Book a table
          </Link>
          <Link to="/menu" className="btn btn--line">
            See the menu
          </Link>
        </div>
      </section>
    </div>
  )
}
